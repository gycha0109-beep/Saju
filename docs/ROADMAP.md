# Saju Engine — 실행 로드맵

> 범위: 이 저장소의 **사주 계산 → 명식 → 해석 → Official Reading → 제품 실행**. 관상/캐릭터/결제 트랙의 자체 로드맵을 대체하지 않는다.  
> 기준 스냅샷: 2026-10-17 KST, `main` = `96a826fb16ce6d05bf6cdf30ea11bedf63956bbb`. N24 #2552, N25 #2554, N25b #2555, N26 #2556까지 각각 exact-HEAD SHA-pinned Integration 20/20 뒤 병합 완료; **N26 병합 후 main** CI Quality/16 shards/CI Verify 및 Production Container PASS (run #39020638955 / #39020639008). 이는 소비자 개인별 종합해석 품질 승인과 다르다.  
> 상태: **작업 우선순위 문서**. 새로운 명리 의미·Production·공개·저장·판매 권한을 발행하지 않는다.  
> 담당 트랙: `saju`; 의미 판정/독립 review는 기존 Research / Bridge의 소유권을 존중한다.

## 최상위 제품 목표 — 2026-10-14 우선순위 재설정

**사용자가 생년월일·출생시각(분 포함, 양/음력·윤달·시간대·출생시각 미상 처리)을 입력하면 → 하나의 검증 가능한 명식(연·월·일·시주, 오행·십신·지장간·구조 관계)을 계산하고 → 그 사람의 실제 명식 근거에 따라 서로 달라지는 읽을 만한 종합 사주풀이를 받는다.**

- 핵심 성공 기준은 **사용자에게 전달된 개인별 해석의 실제 내용·차별성·근거·일관성**이다. CI 통과, 계산 분류 수, 연구 규칙 수, PR 병합 수, 승인 문서 수는 필요할 수 있으나 목표 달성의 대체 지표가 아니다.
- 현재 진실: **입력/Canonical 명식 계산 = 구현**, **범위가 제한된 General/Career/Wealth/Business/Relationship Natal Preview/Official Reading 경로 = 구현**, **다양한 명식에서 깊이 있고 다층적인 원국 종합해석의 품질·일관성 = 미완료**. 단일 통합 샘플의 `delivered` 성공만으로 완성을 주장하지 않는다.
- 출생일이 다르더라도 동일한 명식·근거 조합이면 같거나 유사한 해석은 자연스럽다. **억지로 모든 사용자에게 서로 다른 문장을 찍는 것이 아니라, 의미 있는 명식 차이가 실제 해석 차이로 연결돼야 한다.**
- **현재 최우선 미완료 작업은 P0-NATAL**이다. 완료 이력 P0/P1/P2와 P3-A 연운 미리보기의 기존 이름은 보존하되, **새 기능 실행 우선순위는 P0-NATAL → P1-NATAL-QUALITY → P3-A 연운 UX**다. P3-B/P4–P6의 공식 승인/HOLD는 별도 관리한다.
- 연구 미비는 관련 Research/Bridge 작업으로 분리하고, **연구가 필요한 해석 주장만** 제한한다. 확보된 계산 사실과 기존 범위의 근거를 활용한 **내부 개인화 해석 시제품·품질 검증 전체를 중단하지 않는다**. 반대로 미승인 연구 주장을 Official/Production/판매 권한으로 포장하지 않는다.

## 0. 진실의 우선순위와 문서 참조

작업 시작 때마다 **GitHub의 현재 `main`, 열린 PR, 실제 CI 결과를 먼저 조회**한다. 아래 SHA와 PR은 이 문서 작성 당시의 스냅샷이지 항상 최신이라는 보증이 아니다. 완료 판정은 병합된 코드와 해당 커밋의 통과한 검사에 근거한다.

| 문서 | 역할 |
| --- | --- |
| `README.md` | 코어 원칙 및 초기 엔진 범위. 일부 '현재 상태' 숫자는 과거 스냅샷이다. |
| `docs/implementation/12-mvp-scope-and-implementation-plan.md` | I0–I10 Engine MVP 기초 구현 순서. 현행 우선순위와 구분한다. |
| `docs/implementation/saju-engine-capability-inventory-v1.md` | 21 capability의 최초 증거/권한 분류; 오래된 행은 이후 결정을 우선한다. |
| `docs/implementation/saju-engine-capability-frontier-g2b.md` | `ADMITTED` 아닌 Research를 Engine 실행 권한으로 오해하지 않기 위한 frontier. |
| `docs/implementation/sa7a-official-reading-detailed-expansion-roadmap-audit-v1.md` | spouse → annual → monthly 상세 확장 순서의 근거. SA-7B 이후 상태가 일부 갱신됐다. |
| `docs/implementation/sa7b-spouse-standard-official-reading-authority-closure-v1.md` | 배우자 position-only `ACTIVE_BOUNDED` Production 허용의 정확한 범위. |
| `docs/implementation/sa7c-spouse-position-only-detailed-official-reading-pilot-v1.md` | 승인된 spouse position-only 상세 material/표현 파일럿; 새 의미 추가 불가. |
| `docs/implementation/sa7d-annual-standard-official-reading-authority-audit-v1.md` | 연운은 계산 경로가 있으나 **연운 고유 semantic source authority 부족(Case C)**. |
| `docs/implementation/saju-refresh-post-r37-product-boundary-audit-2026-10-09.md` | 강약·support-source 효과/경쟁 정산의 미해결 경계. |
| `docs/product/22-production-interpretation-authority-audit.md` | 일반 Production 내용 승인과 Runtime 가능성의 분리; 과거 감사이므로 최신 bounded spouse 판정과 혼동 금지. |
| `docs/ops/MAIN_BRANCH_PROTECTION_EVIDENCE.md` | 병합·보호·CI 근거. |

## 1. 기준 제품/엔진 상태 — 검증 사실과 허용 경계

- 계산 계층: Governed Production 계산 정책, Canonical Saju Snapshot, 음력/윤달, 절기, 출생시간 미상 시나리오, 버전/식별자/출처 보존 경로가 존재한다. 계산 결과 자체는 명리 해석 authority가 아니다.
- Preview Natal: `general:natal`, `career:natal`, `wealth:natal`, `business:natal`, `relationship:natal:general` 다섯 영역에 bounded Official Reading/Preview 경로가 존재한다. 이를 **전체 Production 해석 허가**로 표현하지 않는다.
- Spouse Natal: `relationship:natal:spouse`는 **일지의 전통적 배우자궁 위치(position-only)**라는 정확한 의미 범위에서 SA-7B의 `ACTIVE_BOUNDED` Production Official Reading 경로가 존재한다. 배우자의 성격·외모·직업·결혼 결과는 허용되지 않는다. 공개 일반 제공·persistence·commerce는 별도 허가가 필요하다.
- SA-7C 배우자 detailed 파일럿은 별도 문서와 실행 코드/테스트 증거를 기준으로 확인한다. 상세 문구 존재 자체가 새 semantic authority나 public GA를 뜻하지 않는다.
- Annual/Monthly: 연간/월간 계산·temporal facts·Research 후보 및 일부 E2E가 존재하지만 **Official Reading의 해당 도메인별 Production semantic authority는 일반화되지 않았다**. 특히 General Annual은 SA-7D 기준 `RETURN_TO_RESEARCH` / `Production HOLD`다.
- 형상·강약/용신 확장: `saju-r*` 연구 결과는 해당 범위에서만 유효하다. partial structural support/합충 연구를 최종 강약·用神 또는 일상적 개인 예측에 바로 연결하지 않는다.

## 2. 실행 백로그 — 현재 실행 순위 P0-NATAL → P1-NATAL-QUALITY → P3-A

### P0-NATAL — 개인별 원국 종합 사주풀이 **완성 우선** (ACTIVE · 현행 최상위)

**목표:** 샘플 명식 한 개의 응답 성공이 아니라, 실제 입력이 서로 다른 사용자들이 자기 명식의 근거를 확인하면서 일반·직업·재물·사업·관계의 상호 연관성을 읽을 수 있는 **일관된 결과물**을 생성한다. 기존 소스/승인 범위 밖의 인생 사건 예측·의학/재정 단정은 포함하지 않는다.

- [ ] **N0 진단/베이스라인:** 실제 `calculateCanonicalSajuSnapshot` → `runInterpretation` → `runProductReadingInternals` / `createMyeonghwaProductHost` → `OfficialReadingPlan/renderer` 경로를 추적한다. 실행 가능한 근거 규칙 목록, 연구-only·Preview·bounded Production 각각의 provenance/authority, 누락된 T8 conclusion, `insufficient_evidence` / `blocked_coverage` 원인, Narrative fallback 및 모델 호출 여부를 **하나의 감사 테이블**로 분류한다. `test/general-natal-product-vertical-slice.test.ts`와 `test/saju-refresh-canonical-product-boundary-smoke.test.ts`를 출발점으로 삼되, **하나의 성공 fixture와 연구 차단 fixture를 제품 완성 증거로 오해하지 않는다**.
- [ ] **N1 Canonical 명식→개인화 근거 추출:** 연·월·일·시(분은 정확한 기둥·경계 결정에 사용), 일간·오행·십신·지장간·투간/통근·관계 신호 등 **현재 엔진이 실제로 산출하고 검증할 수 있는 값만** immutable snapshot과 결합한다. 계산 정책/시간대/출생시간 미상/양력·음력/윤달 경계를 보존하고, 미상 정보에서 시주 관련 사실을 발명하지 않는다. 형식적 오행 비율만으로 강약·용신·격국을 단정하지 않는다.
- [ ] **N2 근거 있는 복합 해석 조합기:** 단편 문구 나열이 아니라 **핵심 명식 구조 → 서로 보강/충돌하는 관찰 → 일반 성향 및 기존 승인된 도메인별 해석 → 한계·불확실성** 순서로 결과를 구성한다. 모든 문장은 원본 snapshot fact, 허용된 rule/claim/evidence 및 scope에 역추적 가능해야 한다. T8 합성 근거가 부족하면 해당 *주장만* 보류하고, 확인된 부분의 내부 시제품 서술은 이어간다. 새 연구 candidate를 자동 승인하거나 LLM에 없는 전통 의미를 만들어 내게 하지 않는다.
- [ ] **N3 한 사람→하나의 명식→여러 해석 섹션:** `general:natal`을 첫 완성 수직 슬라이스로 하고 `career:natal`, `wealth:natal`, `business:natal`, `relationship:natal:general`을 순차 확장한다. 모두 동일한 canonical snapshot/hash와 동일한 허용 사실을 참조한다. 이미 구현된 Preview/Official renderer·evidence·source proof·Host를 재사용하며 중복 엔진을 만들지 않는다.
- [ ] **N4 실제 개인화 품질 회귀:** 실제 계산에 기반한 **최소 30개 명식** 평가 세트를 만든다(일간/십신 조합, 계절/절기 근처, 출생시간 확정/미상, 음력/윤달, 관계 신호 유무, 애매한 근거). 최소 10쌍은 입력 차이가 계산 사실·해석 근거·문구에 어떤 차이를 만드는지, 나머지 동일·유사 명식은 왜 같게 나오는지 비교한다. 같은 정책+같은 입력의 결정성, 허구/무근거 문구 0건, 금지 claims 0건, unknown-hour 오판 0건, 범위별 올바른 fallback을 필수로 검증한다. **단어만 바꾼 가짜 개인화는 FAIL.**
- [ ] **N5 내부 소비자 보고서·실사용 테스트:** 실제 birth input → 명식 요약 → 중심 해석 → 직업/재물/관계 연결 → 적용 근거/해석 불가 설명을 **열어볼 수 있는 내부 HTML 또는 Preview/Host E2E**로 확인한다. 30개 세트에서 각 결과의 delivered/partial/insufficient 분포를 기록하고, 대표 10개 샘플을 사람이 **개인화 적절성·내용 중복·불일치·가독성** 기준으로 리뷰한다. 화면·API 실제 확인 없이 '사용자 풀이 완성' 선언 금지.
- [ ] **N6 제품 품질 게이트:** 제품이 현재 지원하는 주장 범위, 아직 부분 지원인 영역, 차단 이유, 사용자에게 제공되는 fallback을 테스트/문서로 명시한다. 목표 달성 여부는 **계산→실제 개인화 해석→보고서/HTTP 전달→샘플 비교**의 종단 검증으로 판단한다. 연구 증거와 합법적인 Production admission은 각각 별도의 승인 경로로 남긴다.

**P0-NATAL 종료 조건:** (1) 고정되지 않은 실제 입력 다수에서 일반 원국 종합풀이가 출생정보·snapshot에 충실하게 출력되고, (2) 근거 차이가 읽히는 차이로 확인되며, (3) 부분 근거/미상·모순을 안전하게 다루고, (4) 내부 UX·회귀·사람 리뷰 근거가 남아야 한다. 위 조건을 달성하지 못하면 **미완료**다. 새 연구가 필요한 일부 명제를 억지 채우지 말고 Research handoff를 발행한다.

### P0-NATAL 개인화 의미 손실 개선 실행 계획 — 2026-10-17 (N25–N30)

**실제 품질 한계:** General Natal 실제 HTTP 35건 중 33건 delivered, 2건 partial evidence. 20개 중복 해석 사례조합은 동일 표시 명식 대조군 1개를 제거하면 고유 표시 명식 쌍 **19개**다. 새 승인된 개인별 다중 근거 종합 T8 Claim = **0개**; N12 `usefulComplete:false`, P0-NATAL은 **미완료**다. 문장 수·계산 사실 표시·검사 통과는 품질 달성 지표가 아니다.

**운영 권한:** Engine은 기존 Canonical → Registry/T5/T6/T8 → Canonical Semantics → Official Plan/Renderer → Product/HTTP 실행·근거 보존 책임이다. Research는 명식·Claim·출처·반례 기반 의미 재료를 제공한다. **외부 전문가·TrustGrant 필수 승인 정책은 P0-NATAL 일반 독해에서 폐지한다.** 기존 허용 의미의 결정론적 재배열 및 계산 위치 연결은 자율 CI 검증 경로로 진행하고, 경합·불충분 주장만 범위별 HOLD 처리한다. 일반 Preview 실험 권한과 Production·Commerce 배포 권한은 구분한다.

- [x] **N25/N25b — 전체 반복 사례의 Claim/Consumer 원인 분류 및 추적 (감사 구현 완료, 의미 해소 아님):**
  - [N25 #2554](https://github.com/gycha0109-beep/Saju/pull/2554): 실제 내부 Service 5개 입력 → Official Explainability → Product 원문 35 atom(25 unique, 10 ambiguous, 0 unproven). 반복 원문에 가짜 단일 Claim 정체성을 부여하지 않는다.
  - [N25b #2555](https://github.com/gycha0109-beep/Saju/pull/2555): 고유 19쌍에 해당하는 **25개 실제 내부 서비스 실행 / 187 atom** 확인; 19쌍의 Consumer 원문 추적 불가 atom이 포함된 쌍은 0. 차이 원인 후보는 `동일 matched 규칙 3 / 상이한 Research Claim의 같은 원문 6 / 서로 다른 Claim 원문인데 HTTP 의미 동일 5 / 한쪽에만 테마 차분 5`.
  - **중요 분류 제한:** 위 Research 테마의 차분은 *전체 원국의 십신 family 부재*가 아니다. 19/19쌍의 전체 5-family 존재 집합은 동일. 각 타입·채널 차이의 인간적 의미를 새로 승인한 것 아님.
- [x] **N26 — 실제 HTTP 의미 전달 보존 검증 완료 (승인 의미 누락 버그 재현 없음):**
  - [N26 #2556](https://github.com/gycha0109-beep/Saju/pull/2556): 별개 요청의 reading ID 동일성은 주장하지 않고, **동일 출생·표시 명식 기준** 내부 Product와 live HTTP Preview를 대조. N5/N7 규격의 계산 사실 제거 및 정확한 N9 same-block 중복 압축(33건에서 49개 literal key-point copy 제거)만 허용했을 때 **33/33 의미 본문 exact parity**, 미확인/변형 0. 2개 partial evidence 사례는 동일 해석 성공으로 세지 않았다.
  - 이 결과는 *허용된 본문 전달 무결성*의 증거다. 의미 자체가 얕고 범용적이라는 제품 문제는 미해결. 신규 의미 문구, Admission, Product 계약, Production 권한은 변경하지 않는다.
- [x] **N27 — 전문가 없는 자동 증거 기반 명식별 독해(Preview 단계 구현 및 출처 회귀 완료):**
  - **운영 결정: 외부 명리 전문가, ReviewerTrustGrant, 사람 검수 10건을 P0-NATAL 완료의 필수 선행조건에서 제거한다.** 대신 계산 정확성, 각 실제 Claim/rule/source version/hash, 반례, 명식별 재현성, 미상시각 fail-closed, 자동 CI 및 과잉 추론 금지를 코드로 강제한다. 사람이 실제로 검토하지 않았는데 리뷰를 완료했다고 기재하지 않는다.
  - **N27a 구현 [#2563](https://github.com/gycha0109-beep/Saju/pull/2563) 병합·main 사후 CI/Container PASS:** `src/preview/natal-n27-self-service-evidence-reading.ts` / `createGeneralNatalIntegratedPreviewProductHost({enableAutonomousEvidenceReading:true})`. 정확히 동일한 Canonical 명식에서 발행된 기존 T8 테마 Claim + 계산된 십신 정/편/천간·지지 대표 위치 + **기존 Official Detailed Source Profile 문장**을 선택·결합한 전통적 주제 연결을 Preview 실험 화면에서 제공한다. 외부 검수자 없이 작동하고 기존 Preview 응답 기본값은 회귀를 위해 유지한다. 부의 규모·운세 사건·강약·격국 등 신규 원인/결과 주장을 추가하지 않는다.
  - [x] **N27b 자율 검증 확대 [#2564](https://github.com/gycha0109-beep/Saju/pull/2564) 병합·SHA 고정 통합 20/20 PASS:** 실제 35개 HTTP 명식 / 19개 고유 동일 원문 쌍에 대해 기존 Claim 증거와 실행된 실험 독해의 출생시간·십신 위치 차이를 재현하고, **문장의 다양성이 아니라 실제 위치·subtype 근거가 설명되는지** 자동 채점한다. 서로 다른 정/편관, 겁재/비견의 차이는 *구조*로 설명할 수 있으나 신분·돈·성격 결과를 추정하지 않는다.
  - **경합 중인 고전 결론 별도 격리:** Research [PR #2553](https://github.com/gycha0109-beep/Saju/pull/2553)의 `GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE@0.2.0-research`는 劫財/敗財·比肩分奪 해석·출처 무결성 충돌 중이다. 이 특정 관계의 결과 해석을 자동 채택하지 않는다. [#2557](https://github.com/gycha0109-beep/Saju/issues/2557)과 [#2560](https://github.com/gycha0109-beep/Saju/pull/2560)은 **선택적 고위험/경합 Claim 재검토 기록**, General Natal 전체 개발의 전역 차단기가 아니다. 전문가 없는 사실 기반 기본 독해의 출시 가능성을 심사 완료와 연결하지 않는다.
  - **자율 릴리스 원칙:** 검증된 구조·기존 허용 주제·보수적 전통적 해석 표현은 코드 리뷰/CI/소스 버전 고정으로 운영한다. 새 인과관계·결과 예측은 출처 및 독립 반례 검증을 추가로 통과해야 하며, 통과 불가 시 해당 *문장만 제외*한다. 사용자 Preview/Production/Commerce 배포 권한은 별도 기존 배포 계약을 따른다.
- [ ] **N28 — 실제 General Natal 종합 보고서 연결:**
  - [x] **N28a — 사용자 보고서 우선 배치 ([#2565](https://github.com/gycha0109-beep/Saju/pull/2565) 병합 완료):** `enableAutonomousReportComposition:true`인 일반 명식 Preview에서 실제 Canonical→Official→Product의 원래 읽기 섹션과 명식 값은 그대로 두고, N27b에서 확인된 기존 T8 Claim·정편 십신 위치·기존 상세 출처 문장을 하나의 `내 명식에서 먼저 읽을 핵심 구조` 섹션으로 묶어 **`주요 해석` 직전**에 표시. 35건 실제 HTTP 사례 중 확정시각 33건, 미상시각 2건, 서로 다른 원국 반복 쌍 20개를 자동 검증. 원래 풀이 원문 변조, 출처 결박 실패, 허위 예측을 차단한다. 기본 Preview 동작은 그대로 유지한다.
  - [x] **N28b — Canonical Semantic Bundle → Official Plan/Renderer/Artifact의 계산 사실 Qualifier 연결 ([#2566](https://github.com/gycha0109-beep/Saju/pull/2566) 병합·HEAD 고정 Integration 20/20 PASS):** N28a는 **Official 렌더링 후 Preview Product 표시 구성 단계**이지 새 Canonical Primary Unit을 허가하거나 Official Artifact에 의미를 추가한 상태가 아니다. 실제 단위 결박을 통해 원본 계획/설명가능성 체계 내부에 출처를 노출하려면 별도 내부 모델 편입 및 전 구간 회귀가 필요하다.
  - 소스 판본 충돌이 있는 개별 관계만 보류하고 다른 유효 구조 풀이의 개발을 막지 않는다. `usefulComplete`는 실제 다중 근거 의미와 소비자 독해 조건 충족 전까지 false이다. 실험 Preview와 Production/Commerce의 배포 승인은 구별한다.
- [ ] **N29 — 사용자 가치 자동 품질 판정 (외부 전문가 의존 제거):**
  - [x] N29a [#2567](https://github.com/gycha0109-beep/Saju/pull/2567) 실제 35건 HTTP·고유 19쌍의 Claim/원국/보고서 간 자동 교차 검증: 정확한 HEAD `4f8744e7a1aa2949ad76a933a993602c022c8931`의 [통합 20/20](https://github.com/gycha0109-beep/Saju/actions/runs/39045628181) PASS 뒤 squash merge `81091389b2db95f49bd1a210d0e806c0b94376fe` 완료. 명식/출처/소비자 전달 결박을 검증했으나 실제 개인화 의미의 충분성은 아직 미입증.
  - [x] N29 검수 자료 PR [#2559](https://github.com/gycha0109-beep/Saju/pull/2559) 병합 / main 검증 완료: 35개 HTTP 명식, 19개 반복 쌍, 실제 5쌍/10명식 비교 패킷.
  - [ ] N27의 실행 가능한 두 출생시각 이상 대조 실험으로 **근거 누락, 잘못된 구조 구분, 근거 없는 개인적 행동/금전 단정, 같은 chart의 불안정 문구, 미상시각 과신** 여부를 CI에서 판정한다. 제품 적합성은 실제 회귀 지표와 UX 기준으로 판단한다.
  - 독립 사람 검수는 원하면 추가할 수 있는 **선택적 사용자 조사**이고 출시 또는 의미 실험의 필수 승인이 아니다. 과거 [#2562](https://github.com/gycha0109-beep/Saju/issues/2562)는 종전 필수 승인 계획을 보관하는 기록으로 취급한다.
- [ ] **N30 — 5개 Natal 영역 개인화 종합 확장:**
  - [ ] **N30a — 도메인 종합 독해의 동일 원국 표시 무결성:** N16/N21 5영역 소비자 자료에서 Canonical의 모든 확정 기둥이 Product 각 영역에 그대로 표시되는지 확인한다. 확정 기둥의 누락/미확정 강등, 출생시각 미상에서 가짜 시각, delivered이면서 본문 없는 응답은 fail-closed. 기존 Claim/도메인 의미/Production 범위는 변경하지 않는다. 검증·병합 전 완료 처리 금지.
  - General에서 검증된 원국 근거·분야별 의미 사용 범위만 일반/직업/재물/사업/관계로 확장. 도메인 의미 권한과 temporal scope를 혼합하지 않는다.

**지속 통합 계약:** PR별 `Watchtower-Track: saju` → CI Quality + 16개 샤드 + CI Verify, PIE, Production Container → **정확한 HEAD SHA 고정** Integration 20/20 → `expected_head_sha` squash merge → 새 `main` CI/Container 검증. 이 실험은 외부 전문가 승인을 요구하지 않는다. 다만 불확실·충돌 관계의 결과 예측, 부정확한 출처·계산, 별도 Production/Commerce 권한 우회는 허용하지 않는다.

### P1-NATAL-QUALITY — 개인화 품질 심화 및 도메인 확장 (P0-NATAL 수직 슬라이스 이후)

- [ ] 독립 도메인 문장들의 충돌/반복/추론 범위를 줄이고, 같은 핵심 사실이 직업·재물·관계에서 어떻게 다른 해석으로 투영되는지 확인한다.
- [ ] 구조적 관찰만으로는 판단할 수 없는 최종 신강·신약/왕쇠·격국·용신은 **별도 연구 결과가 source-qualified 되어 돌아오는 경우에만** 해당 rule/fact 범위로 연결한다.
- [ ] 개인화 리포트 설명력, 사용자 피드백, 오해하기 쉬운 결정론적 표현과 과도한 반복을 실제 샘플 기준으로 개선한다. 템플릿 개수나 섹션 길이를 품질의 대체 지표로 삼지 않는다.

### 기존 완료 이력 — P0/P1/P2 (제품 목표 완료와 다름)

다음 과거 P0/P1/P2는 요청 시각·경로 무결성·bounded spouse 파일럿의 **제한된 완료 이력**이다. **P0-NATAL 제품 종합해석이 완성되었다는 뜻이 아니다.** 아래 원래 기술 검증 기록과 SHA/CI 증거는 보존한다.

### P0 — Production spouse 요청 시각 문제 정리 (완료)

**병합 완료: PR #2517** — `fix/saju/production-spouse-request-provenance`, SHA `114ed409db77ef86f0ce33e4476d9c2ec281d047`.

- [x] 최신 PR HEAD·base·mergeability·표준 CI·PIE·Production Container를 **실시간 재확인**한다.
- [x] 제출 HEAD의 일반 CI Quality + full regression 16/16 + CI Verify가 성공했고 컨테이너/PIE도 성공했다면 `ci-integration-ready`로 **해당 HEAD에 고정된 Integration 실행**을 요청한다. 다른 SHA의 결과를 재사용하지 않는다.
- [x] integration admission / full Quality / 16개 full test / full Verify / CI Integration Verify가 전부 성공하면 exact expected HEAD로 **squash merge**한다.
- [x] 병합 후 `main` SHA와 `main` CI Quality / 16개 테스트 / CI Verify / Production Container를 검증한다.
- [x] PR #2517의 의도: bounded **Production 배우자운**의 명식 `createdAt`·공식 해석 결과물 `generatedAt`·Narrative clock을 **각 요청 시각**에 맞추되, 기존 semantic/consumer authority resolver와 spouse-only scope를 유지한다.
- 실패 시 원칙: 정확한 샤드 로그를 분석해 최소 수정 → 새 SHA에서 처음부터 검증한다. 16-shard 워커 부하로 인한 장시간 Full Interpretation 테스트를 새 단위 테스트에 중복 생성하지 않는다.

PR #2517이 이미 병합/대체/폐기됐다면 위 체크리스트를 그 현재 결과에 맞게 갱신하고 **미완료 선행 PR부터** 처리한다.

**2026-10-13 실제 실행 근거**

- 로드맵 선행 PR [#2518](https://github.com/gycha0109-beep/Saju/pull/2518): SHA `62f2e0d803a2748d6ceb156c477de6894ef68df9` 통합 20개 job PASS, squash merge `e53556e3cfd2e2d53a1104acb2fcb8162a854b92`. 해당 `main`의 CI Quality + 16/16 + Verify + Production Container PASS.
- Production spouse 요청 시각 수정 [#2517](https://github.com/gycha0109-beep/Saju/pull/2517): 정확한 HEAD `114ed409db77ef86f0ce33e4476d9c2ec281d047`, 일반 CI / PIE / Production Container 및 [SHA-pinned Integration](https://github.com/gycha0109-beep/Saju/actions/runs/38354513635) admission + Quality + 16/16 + Verify + Integration Verify PASS; squash merge `257a7d0caa59f0f86847ef21e614ca2de40533a3`.
- #2517 병합 후 `main` 검증: [CI](https://github.com/gycha0109-beep/Saju/actions/runs/38355835988)의 Quality + 16/16 + CI Verify **모두 PASS**, [Production Container](https://github.com/gycha0109-beep/Saju/actions/runs/38355836024) **PASS**. P0 완료.

### P1 — 현행 Natal/Spouse 제품 경로의 실행 무결성 (완료 — 기존 승인 범위)

**목표:** ONE PERSON → ONE CANONICAL NATAL BASIS → MANY BOUNDED READINGS의 런타임 불일치 없이 소비자 응답까지 전달.

- [x] 5개 Natal Preview + spouse position-only Production/Preview + Source Proof의 **같은 출생정보·같은 계산 정책에 대한 명식 ID/시간 미상 처리/증거/해석 범위**를 확인한다. (5개 Preview HTTP는 출생시간 확정 사례; spouse Production·Preview·Source Proof 간 출생시간 확정/미상은 별도 Host regression)
- [x] 일반 Natal과 spouse의 정확한 registry/admission을 유지한다. Source Proof가 더 넓은 Research registry 의미로 조용히 이동하지 않도록 regression을 유지한다. (Preview admission / official reading fidelity / Source Proof mismatch 차단 tests)
- [x] 각 요청의 `requestedAt`, snapshot `createdAt`, report `generatedAt`, 재현성·도메인 격리·HOLD/no-sell을 검증한다. (Preview + Production request-clock / Source Proof HOLD tests)
- [x] **검증에서 실제 관측된 결함만** 작은 PR로 보완한다. #2519/#2520은 검증 증거만 추가했고 계산·캐시·의미·권한 구현은 변경하지 않는다.
- 완료 기준: 허용된 범위의 HTTP/Host E2E 및 실패/unknown-time 사례 PASS, unadmitted cross-domain 의미 없음, 기존 Production/Preview/Source Proof 권한 변경 없음.

**P1 완료 근거 / 검증 범위 (2026-10-14)**

- `test/preview-e2e-runtime.test.ts`는 5개 Natal Preview 실제 HTTP 요청의 pillars / fiveElements / tenGods 표시값 동등성에 더해, #2520에서 **실제 governed 계산 함수가 반환한 내부 `snapshotId`의 5개 도메인 간 동일성(출생시간 확정)**을 검증한다. 소비자 응답에 내부 ID를 노출하거나 새로운 계산·권한 경로를 추가하지 않는다.
- `test/preview-calculation-request-clock.test.ts`와 `test/preview-reading-artifact-request-clock.test.ts`는 Preview 시각 정합성, `test/production-spouse-official-request-clock.test.ts`는 bounded Production spouse의 snapshot / narrative / artifact 요청 시각 및 spouse-only gate를 검증한다.
- `test/source-reading-proof-readiness.test.ts`는 snapshot/registry/interpretation/evidence/artifact identity mismatch 차단을 검증한다. Source Proof는 **HOLD**이고 `canExecute / canPublish / canSell = false`; Proof metadata 또는 transport 무결성은 의미 승인이나 판매 허가가 아니다.
- 새 경량 테스트 [#2519](https://github.com/gycha0109-beep/Saju/pull/2519)는 출생시간 확정/미상에서 Production spouse, Preview spouse, Source Proof 계산 경계의 내부 `snapshotId` 직접 일치를 검증한다. HEAD `b45662ef5b3224382d2f7f2194709592c55e948b`는 일반 CI / 16개 샤드 / PIE / Container 및 [SHA 고정 Integration 20/20](https://github.com/gycha0109-beep/Saju/actions/runs/38491557892) PASS, squash merge `7fa4a3bd1d2a2d5cadde8c725f6ef6fe919ee6ad`. 병합 후 [`main` CI](https://github.com/gycha0109-beep/Saju/actions/runs/38494172239)의 Quality / 16개 회귀 샤드 / CI Verify PASS, [Container](https://github.com/gycha0109-beep/Saju/actions/runs/38494172274) PASS.
- [#2520](https://github.com/gycha0109-beep/Saju/pull/2520)은 기존 5개 Natal Preview HTTP E2E에서 실제 governed 계산 경계의 내부 `snapshotId`를 관측·비교하는 추가 regression이다. HEAD `320960ec0686f546b9c0d7f1d61b952ed986744e` 일반 CI/16개 샤드/PIE/Container, [SHA 고정 Integration 20/20](https://github.com/gycha0109-beep/Saju/actions/runs/38496226631) PASS; squash merge `4da989a58b9409b4e8d6d38f6f6c4877a1b3daf8`. 병합 후 [`main` CI](https://github.com/gycha0109-beep/Saju/actions/runs/38497642814) Quality / 16개 회귀 샤드 / CI Verify PASS, [Container](https://github.com/gycha0109-beep/Saju/actions/runs/38497642811) PASS.
- **P1 종료 판정 B:** 확인된 중요 불일치 없음. 다만 이 판정은 위에서 실행한 고정 입력의 승인된 Natal/Spouse 경로에 대한 회귀 증거이고, 모든 생년월일 조합의 정확성·Research 의미 승인·public GA/persistence/commerce 허가를 뜻하지 않는다.
- 기존 승인된 registry/semantic/authority 경로에서 결함 확정 전까지 해석 의미, 캐시, 계산 방식, public/persistence/commerce를 변경하지 않는다.

### P2 — Spouse standard/detailed 파일럿의 현재 상태 확정

- [x] SA-7B가 승인한 **bounded Production standard**와 SA-7C **position-only detailed** 코드를 실제 Production host/renderer/contract test로 확인한다.
- [x] standard/detailed canonical meaning, source semantic hash, plan/evidence/disclosure 보존과 `modelCalls=0`, 미허용 의미 표현 0건, material mismatch 전체 standard fallback을 확인한다.
- [x] 이미 입증된 구현은 중복 구현하지 않는다. 결함이 확인될 때만 보완한다.
- **금지:** 배우자 외모·성격·특정 인물·혼인 결과 예측, public GA/persistence/commerce 자동 승인.

**P2 기존 증거 확인 — 감사 완료, 재구현 없음 (2026-10-14)**

- `docs/implementation/sa7b-spouse-standard-official-reading-authority-closure-v1.md`는 Production standard의 `ACTIVE_BOUNDED`(position-only)를 명시한다.
- `test/official-reading-detailed-spouse-pilot.test.ts`는 standard/detailed 동일 canonical semantic hash·plan hash·disclosures·explainability, `modelCalls=0`, 제한 문구 미노출 및 stale material의 **whole-response standard fallback**을 검증한다. 해당 파일럿은 기존 통합 회귀에서 PASS됐지만 새 공개·판매 권한을 뜻하지 않는다.
- `test/relationship-spouse-t8-day-branch-palace-production-delivery-activation-implementation.test.ts`는 실제 `/api/readings` HTTP 활성화, 비허용 Production 요청 10건 차단, bounded 의미와 `modelCalls=0`, broader authority false를 검증한다. #2519의 일반/통합 16개 샤드에서 회귀 성공을 확인했다.
- P2는 **기존 bounded 구현 감사 기준 완료**다. 추가 구현은 실제 위반이 재현될 때만 별도 작업으로 연다. SA-7D의 General Annual은 `RETURN_TO_RESEARCH`, `Production HOLD`를 유지한다.

### P3-A — General Annual 소비자 경험 **내부 미리보기 개발** (기반 구현 완료 · P0-NATAL 이후 후속)

**우선순위(2026-10-14):** #2525의 내부 연운 데모·리포트는 병합되었으나 **다음 최우선 작업이 아니다**. P0-NATAL 실제 개인별 종합풀이 품질 작업을 우선하고, 이 내부 시제품의 추가 UX 실험은 그 후에 진행한다.

**실행 원칙 변경(2026-10-14):** 고전 원문 직접 판독·독립 심사는 **Official Reading의 주장/승격 승인에만** 필요하다. 내부 상품 UX 시제품의 작성, 개인화 문구 조합, 사용자 테스트, 품질 실험은 그 완료를 기다릴 필요가 없다. 새로운 문헌 연구를 이 트랙의 선행 작업으로 요청하지 않는다.

- [x] 기존 `buildAnnualInterpretationFacts`와 연운 테마/충 관계 14개 연구 문구를 **별도 내부 소비자 미리보기 보고서**에서 재사용한다. 십신별 중심 메시지와 실제 관측된 충 신호만 출력하며, 미상 기둥은 억지로 해석하지 않는다.
- [x] `src/preview/general-annual-exploration-report.ts`와 `src/preview/index.ts`에 **독립 리포트 조합 경로**를 둔다. `test/general-annual-exploration-report.test.ts`는 10십신, 연도 변화, 출생시간 미상, 충 관계 및 권한 차단을 검증한다.
- [x] `npm run preview:annual:demo -- 2026 annual-exploration-preview.html`로 **실제 계산 샘플→연운 해석 문구→열 수 있는 HTML 리포트**를 작성하는 로컬 명령을 추가한다. 테스트 결과가 아닌 구현 항목 체크이며, 이 브랜치의 CI 결과는 해당 PR에서 별도 확인한다.
- [ ] 다음 제품 작업: 연운 허브→세부 문구→월별 연결의 UX 및 카피 비교, 실제 샘플 품질평가, 내부 데모의 사용자 피드백 반영. HTTP·회원/저장·공개/판매 경로는 별도 검토한다.
- **입력 사실 구분:** 현재 `annualSexagenaryPillar(year)`는 서울 **달력 연도**에 따른 연주이다. 입춘 순간 기준 年柱 효력이라고 주장하지 않는다. 세부 예측·금액·질병·확정 사건 등 검증되지 않은 내용은 만들지 않는다.
- **권한 구분:** `internal_exploration` / `not_official_reading` / `mayPublish=false` / `maySell=false`; 현재 Official/Bridge/Production 경로 및 그 권한을 바꾸지 않는다.

**P3-A 완료 판단은 내부 미리보기 품질 및 기능 사용성으로 한다.** 원전 수집 건수, #2462 종료, Bridge ADMITTED를 이 시제품의 선행조건이나 완료 지표로 다시 추가하지 않는다.

### P3-B — SA-7D: Annual standard **Official Reading 승격 전용** (BLOCKED: Research/Bridge)

**선후관계:** 연운 Engine/렌더러 신규 제작보다 **연운 고유 source-qualified semantic prerequisite**가 먼저다. [독립 근거 심사 #2462](https://github.com/gycha0109-beep/Saju/issues/2462)는 10개 현대 십신 연운 테마 및 4개 지지충돌 tension 규칙의 직접 source authority가 미확립됐음을 기록한다. 이는 이미 승인됐다는 증거가 아니며 Research/Bridge HOLD를 유지한다.

1. [ ] General Annual의 출처 원문, 정확한 locator, 명제, exception/counterexample, scope, provenance, domain review와 bridge disposition을 확보한다.
2. [ ] 실제 Bridge decision이 `ADMITTED`를 명시할 때에만 exact annual semantic producer의 Engine 경로·해당 scope/rule/claim 테스트를 연다.
3. [ ] 이후 승인 가능한 범위에서 `general:annual` Official Reading authority resolver + semantic projection + model-free default product cutover를 검증한다(`modelCalls=0`).
4. [ ] **각각 독립 판정**: `career:annual` → `wealth:annual` → `relationship:annual:general` → `business:annual`.

기존 R194–R200 annual temporal calculation, impact bundle, timing renderer 및 R199 자동 연결은 **재사용**한다. fallback 성공·Profile 선택·Research 후보 실행을 semantic authority라고 부르지 않는다.

**P3 진입 전 검증·결함 수리 완료 증거 (2026-10-14, 의미 승인과 분리)**

- [#2521](https://github.com/gycha0109-beep/Saju/pull/2521): P1 natal parity·P2 bounded spouse audit의 완료/차단 범위를 로드맵에 확정. exact HEAD `662e212f7087a79bc8ea6d50da451667d2c4e29c` [Integration 20/20 PASS](https://github.com/gycha0109-beep/Saju/actions/runs/38503930370), squash `36c1ff08230d4008a526bdcf57d127b138a434ec`; [main CI 18/18 PASS](https://github.com/gycha0109-beep/Saju/actions/runs/38507050469), [Container PASS](https://github.com/gycha0109-beep/Saju/actions/runs/38507050570).
- [#2522](https://github.com/gycha0109-beep/Saju/pull/2522): `deriveAnnualStemTenGod`의 **일간 10 × 비교 연간 10 = 100개 현대 계산 분류**에 독립 리터럴 기대값 회귀를 추가. `internal_research / unreviewed` 14개 Annual 규칙과 `RETURN_TO_RESEARCH / Production HOLD` 차단 회귀 유지. exact HEAD `43d65efc3cadf672beb2e597b5486385407ea95f` [Integration 20/20 PASS](https://github.com/gycha0109-beep/Saju/actions/runs/38509324549), squash `feefd74fb6e2112e52e33cade2e42e6ef1c42b8f`; [main CI 18/18 PASS](https://github.com/gycha0109-beep/Saju/actions/runs/38510473839), [Container PASS](https://github.com/gycha0109-beep/Saju/actions/runs/38510473809).
- [#2523](https://github.com/gycha0109-beep/Saju/pull/2523): 상대 Annual/Monthly `referenceDateTime`에서 존재하지 않는 그레고리력 날짜를 `Date`가 조용히 보정하던 입력 결함을 수정. UTC/수치 offset 명시·윤년·월말/시간/오프셋 음성 검증 추가; **입춘 효력 年柱 정책 및 기존 의미·권한은 미변경**. exact HEAD `721f423b61cc46ad8a3f07792e583a3bba451d3a` [Integration 20/20 PASS](https://github.com/gycha0109-beep/Saju/actions/runs/38514827639), squash `225728a0ab2017b3218bb0a03ee46c734c18e702`; [main CI 18/18 PASS](https://github.com/gycha0109-beep/Saju/actions/runs/38516557294), [Container PASS](https://github.com/gycha0109-beep/Saju/actions/runs/38516557310).
- **경계:** 계산 분류 100쌍 PASS / 입력 오류 수정 PASS는 **역사 십신 표기 직접 증거, 연운 10개 현대 해석 테마 + 지지충돌 4개 tension의 Annual-specific semantic authority, D2 공적 입춘 원문/초 정밀도, 실재 reviewer attestation/Bridge ADMITTED**를 생성하지 않는다. #2462는 Open, 연구 Draft #2441·#2461·#2468과 후속 쌓인 Draft는 미병합 유지. P3 `RETURN_TO_RESEARCH`, Production `HOLD`; P4~P6 자동 승격 금지.

### P4 — SA-7E: Annual detailed 확대 (P3의 개별 도메인 승인 후)

- [ ] **Standard Official Reading이 승인·실행되는 정확한 annual domain만** detailed material, source semantic hash/plan/evidence parity 및 fail-closed fallback을 구현한다.
- [ ] 단순 더 긴 문구 또는 LLM 출력을 근거 없이 승인된 material로 승격하지 않는다.

### P5 — SA-7F: Monthly standard Official Reading (P3 선행)

- [ ] Annual context/temporal layer precedence, 절기 전후 구간, 도메인별 source/authority를 확정한다.
- [ ] Annual 승인 상태의 해당 context를 상속한다고 해서 월운 자체가 자동 승인되지는 않는다.
- [ ] General부터 도메인별 별도 admission/Official reading cutover/0-model 검증.
- **금지:** annual 맥락 부재 시 standalone monthly oracle.

### P6 — SA-7G: Monthly detailed (P5 도메인별 승인 후)

- [ ] 각 monthly standard 권한이 닫힌 domain에 한해 detailed material/표현/검증을 별도 승인한다.
- [ ] 기존 natal/annual 상세 material을 근거 없이 재사용하지 않는다.

### 병렬 Research handoff — 엔진 개발 중단과 분리

연구 미비를 발견한 엔진 담당은 해당 범위에 대해 **부족한 판정 조건 / 기존 원문·rule / 반례·테스트 / 반환 계약 / 관련 이슈**를 기록하고 Research 소유 이슈로 이관한다. Research 답변은 `APPLICABLE_BOUNDED / NARROW_OR_REPLACE / INCONCLUSIVE / REJECTED` 등 근거가 있는 결과와 적용 범위를 반환한다. **연구 미해결 = 해당 의미 주장 HOLD이지 P0-NATAL 내부 구현 전체 HOLD가 아니다.**

| 공백 | 연구/Bridge 원장 | P0-NATAL에서의 처리 |
| --- | --- | --- |
| General Natal T8 원문 무결성 및 종합 결론 | [#1518](https://github.com/gycha0109-beep/Saju/issues/1518) | 검증된 bounded claim만 사용; T8 근거 누락 시 부분 출력을 명시 |
| 최종 强弱/旺衰·格局·用神/喜忌: support-source activation, contest settlement, 다학파 충돌 | [R37 감사](./implementation/saju-refresh-post-r37-product-boundary-audit-2026-10-09.md), [#908](https://github.com/gycha0109-beep/Saju/issues/908) | 아직 미승인 판단을 가상 수치/강약/용신 결론으로 채우지 않음 |
| 연운 십신 10+지지충 4 의미 검증 | [#2462](https://github.com/gycha0109-beep/Saju/issues/2462) | P3-B Official HOLD, P3-A 내부 exploration 유지 |
| 입춘 원본/절입시각 및 월운 독립 의미 | [#2460](https://github.com/gycha0109-beep/Saju/issues/2460), [#2466](https://github.com/gycha0109-beep/Saju/issues/2466), [#1531](https://github.com/gycha0109-beep/Saju/issues/1531) | civil-year 결과와 입춘 유효 年柱 구분, 미확립 temporal 판단 금지 |
| Family / Compatibility / Life-stage / Question-specific | [#908](https://github.com/gycha0109-beep/Saju/issues/908), [capability inventory](./implementation/saju-engine-capability-inventory-v1.md) | 미확립 도메인은 추가 구현/공식 지원으로 선언하지 않음 |

**Bridge/Production 조건 불변:** 연구 결과·단위테스트 통과는 자동 `ADMITTED`가 아니다. 기존 Preview/Research/Production scope, content hash, independent review, public GA/저장/판매 권한은 엄격히 구분한다. 다만 그 승인 절차를 **내부 제품 사용성 개발의 선행 단계로 잘못 요구하지 않는다**.

### 병렬 Research frontier — 의미 권한이 생기기 전까지 HOLD

- `docs/implementation/saju-refresh-post-r37-product-boundary-audit-2026-10-09.md`의 **support-source activation / contest settlement** 등 미충족 source-backed 조건을 연구한다.
- `saju-r38`–`r41`처럼 source-exact 구조 연구는 정해진 사례/범위 내에서만 평가한다. 구조적 관찰을 최종 強弱/旺衰/用神, 격국, 상대 강도, 연운 결과에 자동 연결하지 않는다.
- Family/Compatibility/Life-stage/Question-specific는 별도 source authority/Engine intake가 생길 때까지 임의로 제품 지원 선언하지 않는다.
- 증거·review가 추가되지 않으면 판정을 `HOLD_RESEARCH` 또는 `HOLD_AUTHORITY`로 기록하고 **억지 구현하지 않는다**.

## 3. PR 작업 규약 / Definition of Done

1. **현황:** `main` SHA, 열린 PR, 정확한 files/contracts, test/GitHub Actions 상태를 읽는다. 과거 채팅이나 README 상태 숫자만으로 완료 판단 금지.
2. **범위:** 현행 최우선 미완료 작업은 P0-NATAL이고 후속은 P1-NATAL-QUALITY, 이후 P3-A다. 사용자별 실제 풀이 차별성과 품질을 산출하는 **구현/검증 수직 슬라이스 하나**를 선정한다. 단순 권한 문서·CI 증거 갱신만으로 이 단계를 완료시키지 않는다. Research/Bridge/Production admission과 내부 제품 UX는 분리한다.
3. **구현:** 코드+경량 focused regression+필요한 문서. fixture와 실제 source provenance는 구분. 스냅샷/Rule/Plan 식별자 불변성 확인.
4. **일반 검증:** lockfile install, lint, typecheck, build, full regression 16/16, CI Verify, Production Container, PIE. 이름만 비슷한 다른 run은 혼동 금지.
5. **통합 검증:** SHA 고정 admission → full Quality → full regression 16/16 → full Verify → CI Integration Verify. 모두 성공해야 HEAD SHA를 지정하여 squash merge.
6. **병합 후 검증:** 해당 `main` SHA에서 CI Quality, full regression 16/16, CI Verify, Production Container 확인.
7. **검증 대기:** 3–5분 내 끝나는 정상 CI는 한 차례 확인하고 진행; 장기 실행/이상은 중단 보고. **진행 중 CI를 성공으로 선언하거나 미검증 PR을 병합하지 않는다.**
8. **기록:** 각 phase/PR마다 목적, 변경 파일, 일반 CI, SHA 고정 CI, 병합 SHA, 남은 blocker와 다음 작업을 PR/관련 docs에 기록. 문서의 날짜·상태도 갱신.

종료 판정: **A** 실질 수정 없음 / **B** 중요 이슈 없음(선택적 개선만 잔존) / **C** 새 원자료·review·외부 실행 또는 장기 CI 필요. 각 종료 시 해당 원인과 남은 리스크를 명시한다.

## 4. 다음 세션 시작 위치 — 제품 목표 기준 (2026-10-14)

1. GitHub `main`, 열린 PR, 정확한 CI/Container, 규칙·Profile·소비자 코드를 확인한다. #2525(연운 내부 데모)까지 병합됐다. 이후 로드맵 작업도 현재 PR/CI 기준으로 별도 확인한다.
2. **바로 시작할 작업은 P0-NATAL N0**: `general:natal` 실제 birth input → canonical snapshot → 후보·승인 구분된 T8 claims → renderer/Host 반환을 **서로 다른 실제 명식 여러 개**로 실행하며, 정상 해석/부분 해석/차단 상태와 이유를 대조한다. `test/general-natal-product-vertical-slice.test.ts`, `test/saju-refresh-canonical-product-boundary-smoke.test.ts`, `src/research/general-natal-useful-reading-candidate.ts`, `src/reading/reading-intent-composition.ts`가 우선 진입점이다.
3. 재현된 핵심 결함/부족한 조합기부터 **작은 기능 PR + 실제 샘플 비교 테스트**로 구현한다. 연구-only 근거는 허가된 내부 미리보기 범위를 넘어 쓰지 않는다. N1 → N2 → N3를 거쳐 사용자에게 실제로 보이는 결과를 최우선으로 개선한다.
4. **연구 공백은 병렬 핸드오프**: #1518, R37 effect 조건/#908, #2462, #2460/#2466, #1531의 상태를 참조한다. 새 blocker 발견 시 입력/규칙/필요한 원문·판정/다음 reviewer와 엔진에서 허용할 임시 범위를 정확하게 남긴다. 연구가 없어도 구현 가능한 검증된 구조는 계속 제품 시제품에 반영한다.
5. **P0-NATAL N4–N6 품질 게이트를 통과하기 전에는** CI 성공, 연구 문서 누적, 단일 fixture `delivered`, 연운 P3-A HTML 데모 완료를 들어 '개인별 종합 사주풀이 엔진 완성'이라고 보고하지 않는다. 제품 내부 시제품 완성과 Production/공개/판매 허가는 별개다.
6. 다음 큰 기능 우선순위: P0-NATAL → P1-NATAL-QUALITY → P3-A 사용자 UX → P3-B research-admitted Official 연운 → P4–P6. 기존 출처/Bridge/HOLD의 진실과 사후 CI 규정은 그대로 보존한다.
