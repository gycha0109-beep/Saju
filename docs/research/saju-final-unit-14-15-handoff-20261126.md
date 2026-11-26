# 명하 Saju Unit 14–15 이관 프롬프트

**기준일:** 2026-11-26  
**목적:** 새 대화에서 현재 구현 지점부터 사주 트랙을 이어서 진행한다. 이미 완료한 구현·검증을 반복하지 말고, 승인된 로드맵 밖의 작업을 만들지 않는다.

---

## 새 세션 시작 지시

명하 Saju 저장소 `gycha0109-beep/Saju`의 Unit 14–15 작업을 이어서 진행한다.

먼저 아래 브랜치·PR·문서를 실제 GitHub 상태로 다시 확인하고, 확인한 최신 HEAD를 기준으로 작업한다. 이관문에 적힌 SHA는 2026-11-26 확인값이며, 이후 갱신됐을 수 있다.

### 1. 현재 저장소와 PR 상태

- `main`: 마지막 확인 HEAD `9e9231b181b4c848b26be6eec1ef4a55a17debf9`
- Unit 08 기반 브랜치 `saju-final-unit-08-role-semantics`: `8e188b185d461aca90d59e3130686c3d34cfeb0c`
- Unit 14 브랜치 `saju-final-unit-14-relationship-semantic-coverage`: `abbb2c32d8e4d9dd96b1d3cc1e7f778bc2b455c5`
- Unit 15 브랜치 `saju-final-unit-15-temporal-scenario-coverage`: `aa2f164c8ce4131f8f1b186811f6f0b089c762c1`

| PR | 내용 | Base → Head | 상태 |
|---|---|---|---|
| [#2825](https://github.com/gycha0109-beep/Saju/pull/2825) | Unit 14 관계 사회성 T5 연구 후보 | Unit 08 → Unit 14 | OPEN, mergeable |
| [#2826](https://github.com/gycha0109-beep/Saju/pull/2826) | Unit 15 연간·월간 8개 시나리오 검증 | Unit 14 → Unit 15 | OPEN, mergeable |

두 PR은 누적 브랜치 구조다. #2826을 #2825와 무관한 독립 PR처럼 처리하지 않는다. #2825는 main이 아니라 Unit 08 브랜치를 대상으로 한다. #2824는 Unit 08 브랜치에 병합된 상태지만 main 병합을 뜻하지 않는다.

CI:
- Unit 14 HEAD의 [Whole Chart Regression run 45757062891](https://github.com/gycha0109-beep/Saju/actions/runs/45757062891): SUCCESS
- Unit 15 HEAD의 [Whole Chart Regression run 45759048762](https://github.com/gycha0109-beep/Saju/actions/runs/45759048762): SUCCESS

CI 통과는 해당 코드·테스트의 기술 검증이다. 명리 의미 권한, Production, Official Reading, 게시·판매 권한을 부여하지 않는다. 두 HEAD에서 500건·10,000건 전체 감사를 새로 실행한 것은 아니다.

### 2. Unit 14 완료 내용

구현·문서:
- `src/research/relationship-natal-sociality-t5-candidate.ts`
- `test/relationship-natal-sociality-t5-candidate.test.ts`
- `docs/research/relationship-natal-sociality-t5-methodology-evidence-v1.md`
- `docs/research/saju-final-unit-14-relationship-semantic-coverage-worklog-20261126.md`

이남연·김기승(2022) 「명리학에서 십성(十星)의 성립과 개념 확장에 관한 연구」의 공식 KoreaScience 전문 PDF를 확인했다.
- DOI: `10.21186/IPR.2022.7.1.025`
- 검토 위치: §5.1, pp.31–33
- 출처 등급: scholarly secondary
- 라이선스: CC BY-NC 3.0

이 자료는 개별 십성의 사회성 표현을 다루지만, 여러 십성을 조합하는 일반 관계 T8 종합 규칙은 제공하지 않는다. 따라서 구현은 **10개 십성 × 천간/지지 관측 경로의 20개 T5 연구 규칙**에 한정한다. 천간/지지 구분은 관측 위치의 출처 추적용이며, 출처가 별도 채널 의미·가중치·우세를 승인한다는 뜻이 아니다.

후보는 `research` 상태다. CC BY-NC 3.0에 따라 상업 제품에 사용할 수 있다고 가정하지 않는다. Product, Commerce, Preview, Official Reading, Production으로 연결하거나 승격하지 않는다.

### 3. 관계 T8의 현재 경계 — 반드시 유지

Unit 14의 T5 후보는 일반 관계 T8을 완성하지 않았다.

현재 별도로 존재하는:
- `src/research/relationship-natal-multifactor-candidate.ts`: v0.2.0 research, 일반 관계 T8 규칙 20개
- 해당 팩에는 일지 친밀도 T8 규칙 3개도 포함되지만, 이는 일반 대인관계와 다른 별도 해석 범위다.
- `src/preview/relationship-natal-multifactor-report.ts`: 연구용 Preview 소비 경로
- `docs/research/relationship-natal-general-authority-bridge-review-v1.md`: 기존 일반 십신·생극제화 출처만으로는 구체적인 관계 도메인 투영 근거가 부족하다고 판정. Bridge는 `RETURN_TO_RESEARCH`, Engine authority promotion은 false.
- `docs/research/relationship-natal-general-terminal-authority-seeking-revision-v0.7.0.md`: 이전 authority-seeking 대체 후보가 0개인 종결 기록. 닫힌 후보를 다시 열지 않는다.
- `src/research/relationship-natal-intimacy-candidate.ts`: 일지 접점의 별도 연구 후보. 일반 관계 T8의 대체 근거로 사용하지 않는다.
- 배우자 T8 source-bound runtime은 별도 범위다. 일반 관계로 가져오지 않는다.

2022 논문을 위 T8 규칙의 도메인별 근거로 승격하지 않는다. 관계 일반 T8의 권한은 계속 미확정·research-only다.

2012년 闻晨植 《五行结构论》은 출판사 서지·목차(ISBN `9787548603986`)까지만 확인했다. 공개 전문·합법적 미리보기는 확보하지 못했고, Google Books의 페이지 수와 출판사 기록도 다르다. CCTSS 접근 여부도 확인되지 않았다. 같은 검색을 반복하지 말고, 해당 본문이 실제 필수 근거가 되는 경우에만 사용자 제공 합법 원문을 요청한다. 외부 기관에 문의하지 않는다.

### 4. Unit 15 완료 내용

구현:
- `test/annual-monthly-birth-research-scenario-matrix.test.ts`
- `docs/research/saju-final-unit-15-temporal-scenario-coverage-worklog-20261126.md`

8개 실제 출생 입력:
1. 양력 입춘 전
2. 양력 입춘 후
3. 양력 시각 미상
4. 음력 평달
5. 음력 윤달
6. 음력 설날
7. 설날의 양력 대응일
8. 음력 윤달·시각 미상

Canonical snapshot/hash, 연간 후보의 근거 연결, 월간 T9 실행 Claim과 Rule/Methodology/Source/Fact Path/구간 연결, 시각 미상 및 윤달 경계를 검사했다. 새 T9 의미 규칙이나 기간 간 상호작용 규칙은 추가하지 않았다. Official Reading·판매·Production 권한도 바꾸지 않았다.

### 5. 로드맵과 워크로그

최신 문서:
- `docs/ROADMAP.md`: Unit 14/15의 실제 상태, PR, CI, 다음 순서를 갱신했다.
- `docs/research/saju-final-unit-14-relationship-semantic-coverage-worklog-20261126.md`: T5 출처·구현·권한 경계·PR/CI를 정리했다.
- `docs/research/saju-final-unit-15-temporal-scenario-coverage-worklog-20261126.md`: CI PENDING 기록을 SUCCESS로 갱신했다.

이 문서들과 실제 브랜치 상태가 다르면 최신 GitHub 상태를 우선하고, 불일치를 수정한다.

### 6. 다음 작업 순서

1. **PR 상태 확인:** #2825와 #2826의 최신 HEAD, CI, mergeability, 자동 병합 상태를 확인한다. 기존에 통과한 Whole Chart Regression을 이유 없이 재실행하지 않는다. 가능한 경우 저장소 정책에 맞춰 자동 병합을 사용하되, 스택의 base를 바꾸거나 main에 직접 병합하지 않는다.
2. **관계 T8 정확한 gap 확인:** 기존 `relationship-natal-multifactor-candidate.ts`의 각 T8 규칙과 `relationship-natal-general-authority-bridge-review-v1.md`의 네 가지 요구사항(관계별 출처, 십신→관계 도메인 매핑, 범위·반례·비함의, 학파 경계)을 대조한다. 이미 종결된 후보를 되살리거나 2022 논문을 T8 근거로 사용하지 않는다.
3. **실제 구현 가능성 결정:** 현재 governed authority로 연결 가능한 범위가 있으면 그 범위만 구현한다. 그렇지 않으면 관계 T8을 research-only로 유지하고, Refresh Master Plan의 P0/P1 기준에 따라 다음으로 큰 독립 실행 가능 gap을 선택한다. 막연한 추가 source hunting을 반복하지 않는다.
4. **검증·문서 동기화:** 실제 변경에 필요한 테스트만 실행하고, PR·워크로그·로드맵을 최신 상태로 유지한다. 여섯 메뉴 완료 증거가 모두 모이기 전에는 `ROADMAP_COMPLETE`를 선언하지 않는다.

### 7. 필수 프로젝트 규칙

- 기존 저장소의 governed authority가 우선한다. 새 병렬 엔진, Product Mapper, semantic authority를 만들지 않는다.
- T8은 단일 십신 존재나 단일 관측을 전체 분야 결론으로 승격하지 않는 종합 단계다.
- Research rule을 Preview/Official/Production/Commerce 권한으로 자동 승격하지 않는다.
- Profile 존재, CI Green, 문장 수, 연구용 complete 비율을 의미 완성 증거로 간주하지 않는다.
- 미상·충돌·방법론 차이는 임의로 하나로 합치지 않고 기존 정책대로 보존한다.
- 이미 끝난 구현·검증을 이유 없이 반복하지 않는다. 실제 로드맵에 없는 새 작업을 만들지 않는다.
- 외부 업체·기관·도서관에 문의하지 않는다. Work 모드로 전환하지 않는다.
- 사용자에게 보고할 때는 쉬운 한국어로 **한 것 / 남은 것 / 다음에 할 것 / 블로커 및 승인사항**을 각각 1~2줄로 작성한다. 확인되지 않은 진행률은 표시하지 않는다.

**새 세션은 위 상태를 다시 확인한 뒤 6항의 첫 번째 미완료 작업부터 진행한다.**
