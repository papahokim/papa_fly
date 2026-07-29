#!/usr/bin/env python3
"""
papafly-bot.py — PAPAFLY 1:1 회의실 봇
@papafly_bot — Boss ↔ PAPAFLY 직접 소통 채널

실행: python3 papafly-bot.py
환경: TG_TOKEN 환경변수 또는 config.json
"""

import os
import sys
import json
import logging
from pathlib import Path
from datetime import datetime, timezone

try:
    from telegram import Update, BotCommand
    from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
except ImportError:
    print("[ERROR] python-telegram-bot 미설치. pip install python-telegram-bot==20.7")
    sys.exit(1)

# === 설정 ===
SCRIPT_DIR = Path(__file__).parent
REPO_DIR = SCRIPT_DIR.parent
CONFIG_FILE = SCRIPT_DIR / "config.json"
LOG_FILE = SCRIPT_DIR / "papafly-bot.log"

# config 로드
config = {}
if CONFIG_FILE.exists():
    with open(CONFIG_FILE) as f:
        config = json.load(f)

BOT_TOKEN = os.getenv("TG_TOKEN") or config.get("bot_token", "")
BOT_NAME = config.get("bot_name", "papafly_bot")
DISPLAY_NAME = config.get("display_name", "PAPAFLY — 1:1 회의실")

# 로깅
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.FileHandler(LOG_FILE, encoding="utf-8"), logging.StreamHandler()],
)
logger = logging.getLogger("papafly-bot")

# === 상수 ===
LIVE_PAGES = {
    "파파플라이": "https://papahokim.github.io/papa_fly/",
    "호야당": "https://papahokim.github.io/papa_hoyadang/",
    "레포": "https://github.com/papahokim/papa_fly",
}

MEETING_GREETING = """🦅 *PAPAFLY — 1:1 회의실*에 오신 것을 환영합니다.

재패니즈 패치 — 80년대 일본 빈티지 큐레이션

📋 *명령어*
/start — 회의 시작
/status — 시스템 상태
/log — 작업 로그
/deploy — 배포 확인
/page — 라이브 페이지
/health — 건강 검진
/help — 도움말

무엇을 도와드릴까요?"""

HELP_TEXT = """🦅 *PAPAFLY 회의실 — 도움말*

이 봇은 Boss ↔ PAPAFLY 간 1:1 회의록 및 모니터링 채널입니다.

*명령어 목록*
• `/start` — 회의실 입장 인사
• `/status` — 레포·페이지·액션 상태 요약
• `/log` — 최근 devlog/작업 기록
• `/deploy` — GitHub Pages 배포 상태
• `/page` — 라이브 페이지 URL
• `/health` — 시스템 건강 검진 실행
• `/help` — 이 도움말

*회의록* — 모든 DM은 자동 저장됩니다.
*알림* — 배포·장애 발생 시 즉시 보고됩니다.

📡 Live: https://papahokim.github.io/papa_fly/
📦 Repo: https://github.com/papahokim/papa_fly"""


# === 핸들러 ===
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """회의 시작"""
    user = update.effective_user
    logger.info(f"회의 시작: {user.full_name} (@{user.username})")
    await update.message.reply_text(
        f"안녕하세요, {user.full_name}님!\n\n{MEETING_GREETING}",
        parse_mode="Markdown",
    )


async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """도움말"""
    await update.message.reply_text(HELP_TEXT, parse_mode="Markdown")


async def status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """시스템 상태"""
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    msg = f"""📊 *PAPAFLY 시스템 상태*
🕐 {now}

📦 *레포지토리*
• papa_fly: [github.com/papahokim/papa_fly](https://github.com/papahokim/papa_fly)
• papa_hoyadang: [github.com/papahokim/papa_hoyadang](https://github.com/papahokim/papa_hoyadang)
• papa_log: [github.com/papahokim/papa_log](https://github.com/papahokim/papa_log)

🌐 *라이브 페이지*
• papa_fly: {LIVE_PAGES['파파플라이']}
• hoyadang: {LIVE_PAGES['호야당']}

🔧 *액션*
• Playwright Check: 활성
• Deploy: GitHub Pages (legacy)
• Discord Notify: 대기 중

📋 *상태*: ✅ 운영 중"""

    await update.message.reply_text(msg, parse_mode="Markdown", disable_web_page_preview=True)


async def deploy_status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """배포 상태 확인"""
    import subprocess

    pages_check = []
    for name, url in LIVE_PAGES.items():
        try:
            import urllib.request
            req = urllib.request.Request(url)
            res = urllib.request.urlopen(req, timeout=10)
            pages_check.append(f"✅ {name}: HTTP {res.status}")
        except Exception as e:
            pages_check.append(f"❌ {name}: {e}")

    msg = "🚀 *배포 상태*\n\n" + "\n".join(pages_check)
    await update.message.reply_text(msg, parse_mode="Markdown")


async def page_urls(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """라이브 페이지 URL"""
    msg = "🌐 *PAPAFLY 라이브 페이지*\n\n"
    for name, url in LIVE_PAGES.items():
        msg += f"• *{name}*: {url}\n"
    await update.message.reply_text(msg, parse_mode="Markdown")


async def work_log(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """최근 작업 로그"""
    devlog_dir = REPO_DIR / "docs" / "devlog"
    logs = []

    if devlog_dir.exists():
        for f in sorted(devlog_dir.glob("*.md"), reverse=True)[:5]:
            logs.append(f"📝 {f.name}")

    if not logs:
        logs.append("📝 로그 없음")

    msg = "📋 *최근 작업 로그*\n\n" + "\n".join(logs)
    await update.message.reply_text(msg, parse_mode="Markdown")


async def health_check(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """건강 검진"""
    health_script = REPO_DIR / "phone-health.sh"

    msg_parts = ["🏥 *PAPAFLY 건강 검진*\n"]

    if health_script.exists():
        try:
            import subprocess
            result = subprocess.run(
                ["bash", str(health_script)],
                capture_output=True, text=True, timeout=30, cwd=str(REPO_DIR)
            )
            if result.returncode == 0:
                msg_parts.append("✅ 시스템 정상")
                if result.stdout:
                    # 요약만
                    for line in result.stdout.strip().split("\n")[-10:]:
                        msg_parts.append(line)
            else:
                msg_parts.append(f"⚠️ 검진 실패: {result.stderr[:200]}")
        except Exception as e:
            msg_parts.append(f"❌ 검진 오류: {e}")
    else:
        msg_parts.append("⚠️ phone-health.sh 없음")

    await update.message.reply_text("\n".join(msg_parts), parse_mode="Markdown")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """일반 메시지 → 회의록 저장 + 응답"""
    user = update.effective_user
    text = update.message.text or ""

    # 회의록 저장
    meeting_log = SCRIPT_DIR / "meetings"
    meeting_log.mkdir(exist_ok=True)
    today = datetime.now().strftime("%Y-%m-%d")
    log_file = meeting_log / f"meeting-{today}.md"
    timestamp = datetime.now().strftime("%H:%M")
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(f"\n**{timestamp} — {user.full_name}:**\n{text}\n")

    logger.info(f"DM from {user.full_name}: {text[:100]}")

    # 기본 응답
    reply = f"📝 *회의록 저장 완료* ({timestamp})\n\n"
    reply += "도움이 필요하시면 /help 를 입력하세요.\n"
    reply += "현재 자동응답 모드입니다 — 곧 AI 연동 예정."

    await update.message.reply_text(reply, parse_mode="Markdown")


async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE):
    """에러 처리"""
    logger.error(f"Error: {context.error}")


# === 메인 ===
def main():
    if not BOT_TOKEN:
        print("❌ TG_TOKEN 환경변수 또는 config.json에 bot_token이 필요합니다.")
        sys.exit(1)

    logger.info(f"🦅 {DISPLAY_NAME} 시작 중...")
    logger.info(f"   Bot: @{BOT_NAME}")

    app = Application.builder().token(BOT_TOKEN).build()

    # 명령어 등록
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_cmd))
    app.add_handler(CommandHandler("status", status))
    app.add_handler(CommandHandler("deploy", deploy_status))
    app.add_handler(CommandHandler("page", page_urls))
    app.add_handler(CommandHandler("log", work_log))
    app.add_handler(CommandHandler("health", health_check))

    # DM 핸들러 (회의록)
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    # 에러
    app.add_error_handler(error_handler)

    # 봇 명령어 메뉴 설정
    async def set_commands(app):
        commands = [
            BotCommand("start", "회의 시작"),
            BotCommand("status", "시스템 상태"),
            BotCommand("log", "작업 로그"),
            BotCommand("deploy", "배포 확인"),
            BotCommand("page", "라이브 페이지"),
            BotCommand("health", "건강 검진"),
            BotCommand("help", "도움말"),
        ]
        await app.bot.set_my_commands(commands)

    app.post_init = set_commands

    logger.info("✅ 봇 시작! Ctrl+C로 종료")
    app.run_polling()


if __name__ == "__main__":
    main()
