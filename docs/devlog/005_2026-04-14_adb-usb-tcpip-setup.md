# ADB USB → tcpip 무선 전환 솔루션 (2026-04-14 확정)

## 문제 상황

폰 재부팅 후 `adb devices`에서 폰이 사라짐.
WSL2는 USB 직접 접근 불가 → `adb devices` 항상 빈 값.
Windows ADB도 못 잡는 이유: `wslrelay.exe`가 포트 5037을 점유해서
Windows ADB가 WSL 데몬에 연결 → USB 못 봄.

## 해결 절차 (USB 꽂고 1회만 실행)

### Step 1. USB 케이블 연결
- 폰 알림창 → USB 모드 → **파일 전송** 선택
- 폰 화면 "USB 디버깅 허용?" 팝업 → **허용**

### Step 2. Windows ADB로 폰 확인 (WSL 우회)

```bash
/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe -Command \
  "& 'C:\platform-tools\adb.exe' kill-server; Start-Sleep 2; & 'C:\platform-tools\adb.exe' devices"
```

→ `R3CY609RRAR  device` 확인

### Step 3. tcpip 모드 전환

```bash
/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe -Command \
  "& 'C:\platform-tools\adb.exe' -s R3CY609RRAR tcpip 5555"
```

→ `restarting in TCP mode port: 5555` 확인

### Step 4. WSL ADB로 무선 연결

```bash
PHONE_IP=$(cat ~/.phone_ip)
adb connect ${PHONE_IP}:5555
adb devices -l
```

→ `100.103.250.45:5555  device  SM_S938N` 확인

### Step 5. USB 뽑기

이후 재부팅 전까지 Tailscale 무선으로 유지됨.

---

## 디바이스 정보

| 기기 | 모델 | Serial | ADB 주소 |
|------|------|--------|----------|
| 폰 | SM-S938N (S25 Ultra) | R3CY609RRAR | `100.103.250.45:5555` |
| 태블릿 | SM-X716N (Tab S9) | — | `100.74.21.77:5555` |

## 핵심 원인 요약

- WSL2 = USB 직접 접근 불가 (구조적 한계)
- `wslrelay.exe`가 포트 5037 선점 → Windows ADB가 WSL 데몬에 붙어버림
- 해결: **Windows PowerShell에서 `C:\platform-tools\adb.exe` 직접 실행** (WSL 릴레이 우회)
- tcpip 5555로 전환 후 Tailscale IP로 WSL ADB 무선 연결

## 커뮤니티 리서치 결과 (2026-04-14)

**결론: 현재 방식이 베스트 솔루션 맞음.**

### usbipd-win (대안) 비교

| 항목 | usbipd-win | 현재 방식 (tcpip) |
|------|-----------|-----------------|
| 설치 | winget 필요 | 추가 설치 없음 |
| Samsung 기기 | 바인딩 실패 보고 | ✅ 안정적 |
| 100MB+ APK | Windows BSOD 보고 | ✅ 무관 |
| 재연결 | 불안정 이슈 다수 | ✅ Tailscale 안정 |
| Windows 요구 | 11 Build 22000+ 필수 | 무관 |

- usbipd-win GitHub 이슈 #232 (재연결 실패), #461 (BSOD) 다수 보고
- Microsoft 공식 권장이지만 Samsung 기기 제한사항 명시
- **커뮤니티 WSL2 ADB 표준은 TCP/IP 무선 방식** (Reddit, SO, GitHub 공통)

**→ usbipd-win 도입 불필요. 현재 방식 유지.**

---

## 자동화 원클릭 (USB 꽂은 상태에서)

```bash
# ~/.local/bin/adb-phone-usb-setup
/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe -Command \
  "& 'C:\platform-tools\adb.exe' kill-server; Start-Sleep 2; \
   & 'C:\platform-tools\adb.exe' -s R3CY609RRAR tcpip 5555" 2>/dev/null
sleep 2
adb connect $(cat ~/.phone_ip):5555
adb devices -l
```
