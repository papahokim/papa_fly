# GitHub 레포지토리 협업 가이드

> 보일러플레이트 공유 + 개별 작업 병행을 위한 설정 백서

---

## 목적

| 역할 | 하는 일 |
|------|---------|
| **리더 (나)** | 프레임워크/템플릿 개발 및 지속 업데이트 |
| **지인** | Fork해서 본인 콘텐츠(글, 이미지, 데이터) 작업 |

**목표**: 리더 업데이트를 받으면서 + 지인 작업물도 보존

---

## 방식 비교

| 방식 | 설명 | 동기화 | 지인 작업 보존 | Private 지원 |
|------|------|--------|----------------|--------------|
| **Transfer** | 레포 통째로 넘김 | ❌ | - | ✅ |
| **Template** | 새 레포 생성만 | ❌ | - | ✅ |
| **Fork** | 복사 + 연결 유지 | ✅ | ✅ | ⚠️ 조건부 |

**결론**: 지속적 협업엔 **Fork** 방식이 유일한 정답

---

## Fork 동작 원리

```
[리더 레포]                    [지인 레포]
     │                              │
     ├─ 새 기능 추가                 ├─ 본인 글 작성
     ├─ 버그 수정                    ├─ 이미지 업로드
     ├─ 템플릿 개선                  ├─ 데이터 추가
     │                              │
     └────── merge ────────────────→│
                                    │
                              [둘 다 합쳐짐]
```

### 복사되는 것

- ✅ 모든 코드 (HTML, CSS, JS)
- ✅ 모든 이미지
- ✅ 모든 데이터 (JSON 등)
- ✅ 폴더 구조 전체
- ✅ 커밋 히스토리

### 복사 안 되는 것

- ❌ Issues, Pull Requests
- ❌ Settings, Secrets

---

## Private 레포 제약사항

| 상황 | Fork 가능 여부 |
|------|---------------|
| Public 레포 | ✅ 누구나 |
| Private 레포 (외부인) | ❌ 불가 |
| Private 레포 (Collaborator) | ✅ 가능 |

**문제**: Private 상태면 Fork도, 이후 동기화도 안 됨

---

## 최종 추천: Collaborator 방식

### 설정 절차

```
1. 리더: Settings → Collaborators → Add people
2. 리더: 지인 GitHub username 입력 → Read 권한 부여
3. 지인: 초대 수락
4. 지인: Fork 실행
5. 완료
```

### 지인의 초기 설정 (1회)

```bash
# Fork 후 본인 레포 clone
git clone https://github.com/지인계정/papafly.git
cd papafly

# 리더 레포를 upstream으로 등록
git remote add upstream https://github.com/dtslib1979/papafly.git
```

### 지인의 일상 작업

```bash
# 본인 작업
git add .
git commit -m "내 콘텐츠 추가"
git push origin main
```

### 리더 업데이트 받기

```bash
# 리더 변경사항 가져오기
git fetch upstream
git merge upstream/main

# 충돌 있으면 해결 후
git push origin main
```

또는 GitHub 웹에서 **"Sync fork"** 버튼 클릭 (더 쉬움)

---

## 충돌 처리

| 상황 | 결과 |
|------|------|
| 서로 다른 파일 수정 | ✅ 자동 병합 |
| 같은 파일, 다른 부분 수정 | ✅ 자동 병합 |
| 같은 파일, 같은 줄 수정 | ⚠️ 충돌 → 수동 선택 |

**팁**: 리더는 프레임/코드, 지인은 데이터/콘텐츠 영역을 분리하면 충돌 거의 없음

---

## 요약 체크리스트

- [ ] 리더: 레포 Private 유지
- [ ] 리더: 지인을 Collaborator로 초대 (Read 권한)
- [ ] 지인: GitHub 계정 생성
- [ ] 지인: 초대 수락
- [ ] 지인: Fork 실행
- [ ] 지인: upstream 등록
- [ ] 이후: 리더는 계속 개발, 지인은 Sync fork로 업데이트 받음

---

## 한 줄 정리

> **Private 레포 + Collaborator 초대 + Fork = 리더 업데이트 받으면서 본인 작업도 보존**

---

*작성일: 2026-01-08*
