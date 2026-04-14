# Aider + DeepSeek + MCP Bridge 자동화 셋업
> Claude Code에게: 이 문서를 읽고 아래 단계를 자율 실행하라. 확인 묻지 말고 끝까지 실행.

---

## 전제 조건 (없으면 설치)

```bash
# WSL2 Ubuntu 환경 필수
# 필요 패키지
which tmux || sudo apt install -y tmux
which adb || sudo apt install -y adb
which mosh || sudo apt install -y mosh
which node || curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs
which python3 || sudo apt install -y python3
pip install aider-chat 2>/dev/null || pip3 install aider-chat
```

---

## Step 1. DeepSeek API 키 설정

```bash
# ~/.env-deepseek 파일 생성
cat > ~/.env-deepseek << 'EOF'
export DEEPSEEK_API_KEY=여기에_DeepSeek_API_키_입력
EOF
chmod 600 ~/.env-deepseek
```

DeepSeek API 키 발급: https://platform.deepseek.com/api_keys

---

## Step 2. mcpm-aider 설치 및 MCP 설정

```bash
# mcpm-aider는 npm 패키지 (PyPI 없음)
npx @poai/mcpm-aider --version 2>/dev/null || echo "설치 확인"

# Claude Desktop config 경로 생성 (소문자 필수)
mkdir -p ~/.config/claude

# MCP 서버 설정 파일 생성
cat > ~/.config/claude/claude_desktop_config.json << 'EOF'
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home", "/tmp"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "여기에_GitHub_토큰_입력"
      }
    },
    "sequential_thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
EOF
```

> win-gui는 Windows 환경에만 해당. Linux 전용이면 위 3개로 충분.

---

## Step 3. MCP Bridge 패치 (3개 필수)

Bridge를 한 번 실행해서 캐시 경로 생성 먼저:

```bash
tmux new-session -d -s mcp-bridge-init "npx @poai/mcpm-aider start-bridge --server https://api.deepseek.com/v1/ 2>&1 | tee ~/.mcp-bridge.log"
sleep 20
tmux kill-session -t mcp-bridge-init 2>/dev/null
```

캐시 경로 찾기:

```bash
BRIDGE_PATH=$(find ~/.npm/_npx -name "chatCompletion.py" 2>/dev/null | head -1 | xargs dirname | xargs dirname)
echo "Bridge 경로: $BRIDGE_PATH"
```

### 패치 1: service_tier 파싱 오류 수정

```python
# $BRIDGE_PATH/openai_clients/chatCompletion.py
# try: response = CreateChatCompletionResponse.model_validate_json(text)
# except: 블록 찾아서 아래로 교체
```

Claude Code가 직접 파일 읽고 수정:

```bash
# chatCompletion.py의 except Exception as e: 블록을 찾아서
# 다음 내용으로 교체 (service_tier pop 후 재파싱)
python3 << 'PYEOF'
import re, os, sys

path = None
for root, dirs, files in os.walk(os.path.expanduser("~/.npm/_npx")):
    if "chatCompletion.py" in files:
        path = os.path.join(root, "chatCompletion.py")
        break

if not path:
    print("ERROR: chatCompletion.py not found")
    sys.exit(1)

with open(path) as f:
    content = f.read()

old = '''        except Exception as e:
            logger.error(f"Error parsing response: {text}")
            logger.error(e)
            return'''

new = '''        except Exception as e:
            logger.warning(f"Strict parse failed, trying with warnings: {e}")
            try:
                import json as _json
                raw = _json.loads(text)
                raw.pop("service_tier", None)
                response = CreateChatCompletionResponse.model_validate(raw)
            except Exception as e2:
                logger.error(f"Error parsing response: {text}")
                logger.error(e2)
                return'''

if old in content:
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)
    print(f"패치 1 완료: {path}")
else:
    print("이미 패치됨 or 패턴 불일치 — 수동 확인 필요")
PYEOF
```

### 패치 2: incoming_messages AttributeError 수정

```bash
python3 << 'PYEOF'
import os, sys

path = None
for root, dirs, files in os.walk(os.path.expanduser("~/.npm/_npx")):
    if "session.py" in files and "mcp_clients" in root:
        path = os.path.join(root, "session.py")
        break

if not path:
    print("ERROR: session.py not found")
    sys.exit(1)

with open(path) as f:
    content = f.read()

old = '''    async def __aenter__(self):
        session = await super().__aenter__()
        self._task_group.start_soon(self._consume_messages)
        return session

    async def _consume_messages(self):
        try:
            async for message in self.incoming_messages:
                try:
                    if isinstance(message, Exception):
                        logger.error(f"Received exception in message stream: {message}")
                    elif isinstance(message, RequestResponder):
                        logger.debug(f"Received request: {message.request}")
                    elif isinstance(message, types.ServerNotification):
                        if isinstance(message.root, types.LoggingMessageNotification):
                            logger.debug(f"Received notification from server: {message.root.params}")
                        else:
                            logger.debug(f"Received notification from server: {message}")
                    else:
                        logger.debug(f"Received notification: {message}")
                except Exception as e:
                    logger.exception(f"Error processing message: {e}")
        except Exception as e:
            logger.exception(f"Message consumer task failed: {e}")'''

new = '''    async def __aenter__(self):
        session = await super().__aenter__()
        return session'''

if old in content:
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)
    print(f"패치 2 완료: {path}")
else:
    print("이미 패치됨 or 패턴 불일치 — 수동 확인 필요")
PYEOF
```

### 패치 3: 중복 툴 이름 + MCP 항상 ON

```bash
python3 << 'PYEOF'
import os, sys

path = None
for root, dirs, files in os.walk(os.path.expanduser("~/.npm/_npx")):
    if "utils.py" in files and "openai_clients" in root:
        path = os.path.join(root, "utils.py")
        break

if not path:
    print("ERROR: utils.py not found")
    sys.exit(1)

with open(path) as f:
    content = f.read()

# 3-A: 중복 툴 제거
old_tools = '''    logger.info("> using #MCP tools ")
    request.tools = []

    for _, session in ClientManager.get_clients():
        # if session is None, then the client is not running
        if session.session is None:
            logger.error(f"session is `None` for {session.name}")
            continue

        tools = await session.session.list_tools()
        for tool in tools.tools:
            request.tools.append(mcp2openai(tool))'''

new_tools = '''    logger.info("> using #MCP tools ")
    request.tools = []
    seen_tool_names = set()

    for _, session in ClientManager.get_clients():
        if session.session is None:
            logger.error(f"session is `None` for {session.name}")
            continue

        tools = await session.session.list_tools()
        for tool in tools.tools:
            if tool.name in seen_tool_names:
                logger.warning(f"Duplicate tool name '{tool.name}' skipped")
                continue
            seen_tool_names.add(tool.name)
            request.tools.append(mcp2openai(tool))'''

# 3-B: MCP 항상 ON
old_on = '''    if not should_add_tools:
        return request'''

new_on = '''    # MCP 항상 ON (디폴트)
    should_add_tools = True
    if not should_add_tools:
        return request'''

changed = False
if old_tools in content:
    content = content.replace(old_tools, new_tools)
    changed = True
if old_on in content:
    content = content.replace(old_on, new_on)
    changed = True

if changed:
    with open(path, 'w') as f:
        f.write(content)
    print(f"패치 3 완료: {path}")
else:
    print("이미 패치됨 or 패턴 불일치 — 수동 확인 필요")
PYEOF
```

---

## Step 4. aider 전역 설정

```bash
cat > ~/.aider.conf.yml << 'EOF'
# UI
pretty: false
stream: true
dark-mode: true

# 모델
model: openai/deepseek-chat

# repo-map
map-tokens: 8000
map-refresh: always

# git
no-auto-commits: true
gitignore: false

# 자동 승인
yes-always: true

# 기타
no-suggest-shell-commands: true
EOF
```

작업 레포에 `.aiderignore` 생성:

```bash
cat > ~/your-repo/.aiderignore << 'EOF'
node_modules/
dist/
build/
.next/
.nuxt/
out/
coverage/
.cache/
*.min.js
*.min.css
*.map
*.lock
*.log
EOF
```

---

## Step 5. 런처 스크립트 생성

```bash
# aider-phone
cat > ~/.local/bin/aider-phone << 'EOF'
#!/bin/bash
SESSION="phone_aider"
if ! tmux has-session -t mcp-bridge 2>/dev/null; then
    tmux new-session -d -s mcp-bridge "npx @poai/mcpm-aider start-bridge --server https://api.deepseek.com/v1/ 2>&1 | tee ~/.mcp-bridge.log"
    sleep 12
fi
if ! tmux has-session -t "$SESSION" 2>/dev/null; then
    tmux new-session -d -s "$SESSION" -c ~/your-repo
    tmux send-keys -t "$SESSION" "source ~/.env-deepseek && aider --no-auto-commits --openai-api-base http://localhost:8000/v1 --openai-api-key \$DEEPSEEK_API_KEY --model openai/deepseek-chat" Enter
fi
exec tmux attach -t "$SESSION"
EOF
chmod +x ~/.local/bin/aider-phone

# aider-tab (탭 전용 세션)
cat > ~/.local/bin/aider-tab << 'EOF'
#!/bin/bash
SESSION="tab_aider"
if ! tmux has-session -t mcp-bridge 2>/dev/null; then
    tmux new-session -d -s mcp-bridge "npx @poai/mcpm-aider start-bridge --server https://api.deepseek.com/v1/ 2>&1 | tee ~/.mcp-bridge.log"
    sleep 12
fi
if ! tmux has-session -t "$SESSION" 2>/dev/null; then
    tmux new-session -d -s "$SESSION" -c ~/your-repo
    tmux send-keys -t "$SESSION" "source ~/.env-deepseek && aider --no-auto-commits --openai-api-base http://localhost:8000/v1 --openai-api-key \$DEEPSEEK_API_KEY --model openai/deepseek-chat" Enter
fi
exec tmux attach -t "$SESSION"
EOF
chmod +x ~/.local/bin/aider-tab
```

---

## Step 6. bashrc 자동시작 블록 추가

```bash
cat >> ~/.bashrc << 'EOF'

# MCP Bridge 자동 시작
if ! tmux has-session -t mcp-bridge 2>/dev/null; then
    tmux new-session -d -s mcp-bridge "npx @poai/mcpm-aider start-bridge --server https://api.deepseek.com/v1/ 2>&1 | tee ~/.mcp-bridge.log" 2>/dev/null
fi
EOF
```

---

## Step 7. 동작 검증

```bash
# 1. Bridge 시작
tmux new-session -d -s mcp-bridge "npx @poai/mcpm-aider start-bridge --server https://api.deepseek.com/v1/ 2>&1 | tee ~/.mcp-bridge.log"
sleep 18

# 2. Bridge 응답 확인
source ~/.env-deepseek
RESULT=$(curl -s http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"hi"}],"max_tokens":5}' 2>&1)
echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print('✅ Bridge OK:', d['choices'][0]['message']['content'])" 2>/dev/null || echo "❌ Bridge 실패 — 로그 확인: cat ~/.mcp-bridge.log"

# 3. MCP tool_call 확인
RESULT2=$(curl -s http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d "{\"model\":\"deepseek-chat\",\"messages\":[{\"role\":\"user\",\"content\":\"Use read_file or read_text_file tool to read $HOME/.env-deepseek\"}],\"max_tokens\":200}" 2>&1)
cat ~/.mcp-bridge.log | grep "tool call:" | tail -3 && echo "✅ MCP tool_call 작동" || echo "⚠️ tool_call 미확인"

# 4. aider 직접 실행 테스트
echo "aider 실행 테스트 (Ctrl+C로 종료):"
source ~/.env-deepseek && aider --no-auto-commits \
  --openai-api-base http://localhost:8000/v1 \
  --openai-api-key $DEEPSEEK_API_KEY \
  --model openai/deepseek-chat \
  --message "안녕. 지금 MCP 툴 사용 가능한지 확인해줘" \
  --no-git 2>&1 | tail -10
```

---

## Termux 위젯 설정 (선택, 모바일 자동연결)

폰/탭 Termux에서:

```bash
mkdir -p ~/.shortcuts

# PC Aider 위젯
cat > ~/.shortcuts/PC-Aider.sh << 'EOF'
#!/data/data/com.termux/files/usr/bin/bash
export PATH="/data/data/com.termux/files/usr/bin:$PATH"
termux-wake-lock 2>/dev/null
pgrep -x sshd > /dev/null || sshd 2>/dev/null
mosh pc -- aider-phone
EOF
chmod +x ~/.shortcuts/PC-Aider.sh
```

`~/.ssh/config` (Termux):
```
Host pc
  HostName PC의_Tailscale_IP
  User 사용자명
  Port 22
```

---

## 알려진 이슈

| 문제 | 원인 | 해결 |
|------|------|------|
| `LLM Provider NOT provided` | `openai/` 프리픽스 누락 | `--model openai/deepseek-chat` |
| 404 Not Found | base URL에 `/v1` 없음 | `--openai-api-base http://localhost:8000/v1` |
| `incoming_messages` AttributeError | MCP 1.27.0 API 변경 | 패치 2 적용 |
| `Tool names must be unique` | 중복 툴 등록 | 패치 3 적용 |
| `service_tier` ValidationError | DeepSeek 응답 스키마 | 패치 1 적용 |
| npx 캐시 초기화 시 패치 날아감 | npx 재다운로드 | 패치 스크립트 재실행 |

---

## 모니터링

- Aider native MCP PR: https://github.com/Aider-AI/aider/pull/3937
  - 머지되면 mcpm-aider 브릿지 전체 제거하고 native로 교체
- Bridge 상태: `cat ~/.mcp-bridge.log | tail -5`
- 세션 확인: `tmux ls`
