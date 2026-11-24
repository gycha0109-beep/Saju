# Saju Final — Unit 01: 공통 판단 PR 체인 고정 Worklog

- 작업일: 2026-11-24
- 작업 브랜치: saju-final
- 기준 설계: docs/architecture/SAJU_SIX_MENU_INTERPRETATION_COMPLETION_DESIGN_20261124.md
- 기준 로드맵: docs/ROADMAP.md의 2026-11-24 여섯 메뉴 실행 기준
- 범위: 공통 판단 PR 체인의 누적 검증·의존 관계·병합 준비 상태 확인
- 결과: **완료 — 체인 전체가 병합 가능한 상태이며, 실제 병합은 별도 단계로 남김**

## 1. 이번 단위의 목표

여섯 메뉴가 공유할 원국·운 공통 판단의 선행 구현을 하나의 누적 체인으로 고정한다. 앞선 구현을 반복하지 않고, 최신 누적 HEAD에서 500건·10,000건·메뉴 및 발급 회귀가 통과했는지 확인한다. 관측값을 확정 명리 판단이나 공식 발급 권한으로 승격하지 않는다.

## 2. 누적 PR 체인 확인

| 순서 | PR | 기능 | Base | Head | 확인 |
|---:|---:|---|---|---|---|
| 1 | #2812 | 직업운의 천간·지지 근거 균형 | main | 50f026232c7f6c6c01cc8a3c2968b5903861347f | Open, mergeable |
| 2 | #2816 | 재물운의 월령 식상 부분 풀이 | #2812 branch | 9a4695ea30b8ce00365941b7e53ecdbd9af339f5 | Open, mergeable |
| 3 | #2814 | 입춘·대운·절입과 원국 지지 접점 | #2816 branch | 712d7c62c984f3b190bb731c59e24a8f69ca2326 | Open, mergeable |
| 4 | #2815 | 일지 기반 연애·관계 풀이 | #2814 branch | ebaeb3ad18bd67784092cb1599a1a4992c38c27e | Open, mergeable |
| 5 | #2813 | 월령 식신의 산출·교환 사업 풀이 | #2815 branch | 1adb55cbe037de3551e810aef02d42766425bfaa | Open, mergeable |
| 6 | #2817 | 여섯 메뉴 공통 원국·운 판단 | #2813 branch | befb8b3856e708a2f06b18213b2c97108ef4ca9b | Open, Ready, mergeable |
| 7 | #2818 | 연간·월간과 대운·세운·월운 연결 | #2817 branch | a13cf89302b2480374646acbe36aedad250ed53c | Open, Ready, mergeable |
| 8 | #2819 | 지장간 독립 통근 및 지원 위치 | #2818 branch | afabb40647344b5ab061ea047c80d1b3ad3d4eef | Open, Ready, mergeable |
| 9 | #2820 | 복수 월령 신호별 지원·제약·합충 접점 | #2819 branch | 2a335dec63c6bdf7c36b73d7376fef144ce139b6 | Open, Ready, mergeable |

#2817~#2820은 Draft에서 Ready for review로 전환했다. 전체 9개 PR은 모두 Open이며 GitHub mergeable=true다. 의존 관계를 보존한 누적 스택이며 main 병합은 아직 수행하지 않았다.

## 3. CI 확인

- #2812: GitGuardian Security Checks — success
- #2816: GitGuardian Security Checks — success
- #2814: GitGuardian Security Checks — success
- #2815: GitGuardian Security Checks — success
- #2813: GitGuardian Security Checks — success
- #2817: GitGuardian Security Checks — success
- #2818: GitGuardian Security Checks — success
- #2819: 500건 감사, 10,000건 감사, 메뉴·발급 회귀, GitGuardian — 4/4 success
- #2820: 500건 감사, 10,000건 감사, 메뉴·발급 회귀, GitGuardian — 4/4 success

전체 회귀 근거:
- #2819: https://github.com/gycha0109-beep/Saju/actions/runs/45307584481
- #2820: https://github.com/gycha0109-beep/Saju/actions/runs/45345809083

#2819와 #2820의 전체 회귀는 각각 해당 누적 HEAD를 검사한다. #2812~#2818의 기능이 후속 누적 체인에 포함되어 검사된 점을 확인했다. 앞선 PR의 단독 전체 회귀가 실행된 것으로 기록하지 않는다.

## 4. 코드·해석 경계 확인

현재 공통 판단 구현은 다음을 수행한다.

- 천간에 드러난 십신, 지지 대표 십신, 지장간 십신을 위치·채널별로 보존한다.
- 월령 지장간과 천간의 동일 글자, 통근, 지원·제약, 합·충·형·해·파·육합·삼합 접점을 신호별로 기록한다.
- 월령 복수 신호를 하나의 대표 격국으로 임의 압축하지 않는다.
- 통근의 생사·가중치, 최종 신강·신약, 격국 후보의 정체·성립·우선순위, 합화 및 구응의 일반 효과는 미확정 상태로 유지한다.
- 연구용 Claim과 Reader 관측 경로에 한정하며 공식 발급·판매 권한을 만들지 않는다.

따라서 이번 단위의 결과는 **공통 판단에 필요한 구조 관측 및 누적 회귀 체인의 고정**이다. 전통 명리의 T1~T6 전체 판단 규칙 채택·완료를 뜻하지 않는다.

## 5. 이번 단위에서 바꾼 것

1. #2817~#2820을 Draft에서 Ready for review로 전환했다.
2. saju-final 작업 브랜치를 #2821의 최신 설계 HEAD 0fdfc034df65b06f0d95bd7d0cb780a45288dc00에서 생성했다.
3. 이번 단위의 별도 Worklog를 추가한다.

코드 계산 규칙, 상품 카탈로그, Official 권한, Production 경로는 변경하지 않았다.

## 6. 남은 작업과 다음 단위

- PR #2812~#2820은 의존 관계를 유지한 채 병합 순서를 확정하고, 실제 병합 후 기준 브랜치와 검증 상태를 확인해야 한다.
- 다음 단위는 **공통 해석 방법의 채택 범위 확정**이다. T1 구조 균형, T2 강약, T3 격국, T4 용신·희기, T5 십신, T6 상호작용을 기존 코드·등록 규칙·방법론·출처와 대조한다.
- 이미 존재하는 조사 결과를 재사용한다. 특히 Career T6 P3 gate의 미결정 사항(효과 규칙 부재, 숨은 천간에 가시 천간 규칙을 전용할 수 없음, T5-only T8 합성 경로 미선택)을 다시 일반 문헌 탐색으로 반복하지 않고, 해당 메뉴에 실제로 필요한 판단을 기준으로 처리한다.
- 규칙마다 적용 메뉴, 필요한 입력, 실제 결론, 보류 조건을 정리하고, 내부 채택 가능한 규칙은 버전으로 고정한다. 채택 근거가 없는 효과는 관측으로 남기며 추정 규칙을 추가하지 않는다.

**단위 판정:** Unit 01 완료. Unit 02 착수 가능.
