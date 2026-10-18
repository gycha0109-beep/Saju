# Saju Engine — 실행 로드맵

> 범위: 이 저장소의 **사주 계산 → 명식 → 해석 → Official Reading → 제품 실행**. 관상/캐릭터/결제 트랙의 자체 로드맵을 대체하지 않는다.  
> 개정 기준: **2026-10-18 KST**, 편집 출발점 `main` = `7d07a7e85c4f6d9b73a0efd838593ababa23a778`. 본 문서는 제품 의미·품질 우선순위를 정하며 `main` 상태는 매 작업 시작 시 재확인한다. 과거 PR/CI 증거는 각 이력에 남긴다. 이번 **문서 개정만으로 해석 구현/품질이 개선되었다고 주장하지 않는다.**  
> 상태: **작업 우선순위 문서**. 새로운 명리 의미·Production·공개·저장·판매 권한을 발행하지 않는다.  
> 담당 트랙: `saju`; 의미 판정/독립 review는 기존 Research / Bridge의 소유권을 존중한다.

## 최상위 제품 목표 — 2026-10-18 의미 중심 실행 로드맵 개정

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
| 프로젝트 첨부 `Myeonghwa_Personalized_Interpretation_Architecture_v1.3_THIRD_REVIEW` | T0/T5/T6/T8 의미 계층, schema·input contract, MUR, deterministic Narrative, 실제 개인화 테스트의 설계 기준. 저장소 main의 별도 구현 완료 증거는 아님. |
| 프로젝트 첨부 `MyeongHa_Saju_Product_Interpretation_Architecture_v1.2_FINAL_REVIEWED` | 기존 ReadingIntent/DomainReadingProfile/EvidenceSelector/Narrative 재사용 및 제품별 authority 경계. |

## 1. 기준 제품/엔진 상태 — 검증 사실과 허용 경계

- 계산 계층: Governed Production 계산 정책, Canonical Saju Snapshot, 음력/윤달, 절기, 출생시간 미상 시나리오, 버전/식별자/출처 보존 경로가 존재한다. 계산 결과 자체는 명리 해석 authority가 아니다.
- Preview Natal: `general:natal`, `career:natal`, `wealth:natal`, `business:natal`, `relationship:natal:general` 다섯 영역에 bounded Official Reading/Preview 경로가 존재한다. 이를 **전체 Production 해석 허가**로 표현하지 않는다.
- Spouse Natal: `relationship:natal:spouse`는 **일지의 전통적 배우자궁 위치(position-only)**라는 정확한 의미 범위에서 SA-7B의 `ACTIVE_BOUNDED` Production Official Reading 경로가 존재한다. 배우자의 성격·외모·직업·결혼 결과는 허용되지 않는다. 공개 일반 제공·persistence·commerce는 별도 허가가 필요하다.
- SA-7C 배우자 detailed 파일럿은 별도 문서와 실행 코드/테스트 증거를 기준으로 확인한다. 상세 문구 존재 자체가 새 semantic authority나 public GA를 뜻하지 않는다.
- Annual/Monthly: 연간/월간 계산·temporal facts·Research 후보 및 일부 E2E가 존재하지만 **Official Reading의 해당 도메인별 Production semantic authority는 일반화되지 않았다**. 특히 General Annual은 SA-7D 기준 `RETURN_TO_RESEARCH` / `Production HOLD`다.
- 형상·강약/용신 확장: `saju-r*` 연구 결과는 해당 범위에서만 유효하다. partial structural support/합충 연구를 최종 강약·用神 또는 일상적 개인 예측에 바로 연결하지 않는다.

## 2. 실행 백로그 — 현재 실행 순위 P0-NATAL → P1-NATAL-QUALITY → P3-A

### P0-NATAL — **의미 있는 개인별 원국 종합풀이 완성** (ACTIVE · 제품 최우선)

**판정 원칙:** 사용자가 실제 출생정보를 입력했을 때 자기 명식의 다중 근거를 반영한 한국어 종합풀이를 받아야 한다. **계산 사실·기둥 위치·연구 문장 단순 나열, Claim/원문 대조표, CI/PR 개수, `delivered` 응답 자체는 제품 완성의 대체물이 아니다.** 구조는 전통 명리의 근거가 허용하는 *해석 후보*로만 설명하며 실제 삶의 성격·금전·사건을 단정하지 않는다.

**2026-10-18 실제 기준선(제품 미완료):**
- Canonical 계산, 십신·기둥 근거, 다섯 Natal Preview/Official 경로, 기존 Claim/Source/Rule 위치 연결, 내부 HTML은 존재한다. 일반 HTTP 35건 중 33건 `delivered`, 2건 부분 근거 사례이며 이는 **응답 전달 사실**이지 유효 종합풀이 합격률이 아니다.
- `src/preview/natal-n30b-five-domain-verified-reader.ts`는 `createsNewInterpretation:false`, `usefulComplete:false`; `src/preview/natal-n32-expanded-domain-research-reading.ts`도 `researchOnly:true`, `createsNewMeaning:false`다. **기존 문장 표시는 종합 해석 생산과 다르다.**
- 새로 근거·범위가 검증되어 제품의 개인별 다중 근거 종합을 충족한 T8 Claim **0개(현행 감사 기준)**. 따라서 `usefulComplete=false`; 제품 전체 완성률을 근거 없이 퍼센트로 주장하지 않는다.
- 이전 N0~N6, N28/N29/N30의 미체크 상태는 소비자 품질 미완료를 뜻한다. 아래 **S1~S6가 앞으로의 실제 실행 순서와 완료 판정 기준**이며 기존 N25~N35 기술 이력은 바로 다음 절에 보존한다.

**구현 기준 아키텍처:** 프로젝트 `Myeonghwa_Personalized_Interpretation_Architecture_v1.3_THIRD_REVIEW` 및 `MyeongHa_Saju_Product_Interpretation_Architecture_v1.2_FINAL_REVIEWED`. 기존 `Canonical Snapshot → Registry T5/T6/T8 → Claim Graph → ReadingIntent/DomainReadingProfile → EvidenceSelector → Narrative → ProductReadingResponse`를 사용한다. 별도 해석 엔진/병렬 Product Mapper/숨은 LLM 의미 권한은 만들지 않는다.

#### S1 — 실제 의미 재료·빠진 조합 관계 확인 (첫 구현 PR의 출발점)

- [ ] **S1-1 재사용 가능 범위 전수 목록:** 다섯 분야의 실행되는 Claim/Rule/Methodology/Source/Production 또는 Preview 권한을 `T0 계산 사실 / T5 맥락 십신 / T6 관계·상호작용 / T8 분야별 다중 근거 종합 / 소비자용 원문`으로 분리한다. 정확한 원국·경로, 입력 누락, 시각 미상, conflicting/blocked 상태를 기록한다.
- [ ] **S1-2 결핍 판정:** Career의 단일 십신 T8 또는 동일-family 표현을 진정한 다중 근거 T8로 잘못 세지 않는다. 재사용할 T5/T6, source-qualified 다중 근거 조합, 빠진 구조 의미와 판단 불가 범위를 산출한다. 기존 `src/research/career-natal-reading-candidate.ts`의 exact Ten-God 규칙은 **legacy research**로 분리한다.
- **완료 산출물:** *실행 가능한* 입력→실제 근거→가능/보류되는 결론 목록과 **다음 구현에 사용할 최소 1개 근거 있는 Career 결합 사례**. 새 감사 표만 만들고 멈추는 것을 S1 완료로 계산하지 않는다.

#### S2 — T5/T6 개인화 기반과 의미 계약 확립

- [ ] 구조적 주장과 계산값을 분리한다. 단순 위치는 T0, 위치·맥락의 제한된 해석은 T5, source-qualified 관계는 T6, 여러 근거를 합성한 직업 결론은 T8에만 둔다. 미확립 강약·용신·격국·결과 예측을 도출하지 않는다.
- [ ] 개인화용 `ClaimTypeDefinition` 및 구조화된 value 계약, `MethodologyDefinition.inputContract` 또는 동등한 실제 스키마 검증을 갖춘다. RuleOutputTemplate↔Claim 타입, Rule 입력↔Methodology 입력을 검증한다. 정확한 사실 경로·필요 시 결정론적 입력 selector와 cardinality를 사용한다.
- [ ] 출생시각 미상/복수 계산 시나리오에서 `missing`, `not_applicable`, `insufficient`를 구분한다. 한 시나리오의 Claim으로 다른 시나리오까지 유효하다고 판정하지 않는다.
- **완료 산출물:** 실제 계산 명식 두 개에서 서로 다른 **구조적 입력 근거가 재현되는 테스트**와, 이를 실제 T8 규칙에 안전하게 전달할 수 있는 계약. '규칙 개수 증가'만으로 완료 선언 금지.

#### S3 — 첫 번째 **진짜 다중 근거 Career T8** 구현 (현재 가장 중요한 기능 작업)

- [ ] 기존 Career 단일 십신 T8 규칙을 별도 legacy pack에 격리하고, **개인화 Career 연구 pack**에서 혼용하지 않는다.
- [ ] 출처와 Methodology가 실제로 뒷받침하는 **서로 다른 2개 이상 정밀 근거(T5/T6 또는 명시적 방법론의 T0 복수 사실)**를 소비하는 구조화된 T8 claim을 구현한다. `upstreamClaimRefs`/의존·모순 관계를 기존 Claim Graph로 보존한다. 단순 동시 존재에서 인과·직업 적성·성공을 창작하지 않는다.
- [ ] `core`와 실행·의사결정·환경·책임·협업 등의 **적용 가능한 보조 해석 축**을 분리한다. 동일 원국/동일 semantic signature는 같은 결론, 다른 근거 패턴은 뒷받침되는 범위에서 다른 의미를 도출한다. 충돌은 순서/숫자 가중치로 임의 승패를 정하지 않는다.
- **완료 산출물:** 실제 서로 다른 두 명식에서 **서로 다른 근거→서로 다른 T8 의미 결론**이 실행되고, 동일 원국 대조에서는 같으며, 실제 Claim provenance가 모두 연결된다. 이 조건을 충족하지 못하면 S3는 미완료다.

#### S4 — Career 최소 유효 풀이(MUR) + 한국어 보고서

- [ ] 한 개의 얕은 T8이나 단어만 바꾼 문장으로 `complete`를 반환하지 못하게 **Domain Minimum Useful Reading**을 도입한다. Career 첫 목표: **핵심 종합 패턴 1개 + 서로 구별되는 실질적 보조 해석 축 2개 + 적용 근거/범위·한계**(정확한 Evidence 정책은 source coverage와 함께 고정); 충분한 근거가 없으면 **partial / insufficient**로 분류한다. tension은 모든 사람에게 강제하지 않는다.
- [ ] 기존 `ClaimNarrativeProfile` 개념과 결정론적 renderer를 활용한다. `핵심 결론 → 근거와 연결 이유 → 보조·상충 요인 → 실용적 해석 범위 → 모르는 부분`을 **읽을 만한 한국어 문단**으로 구성한다. headline은 claimId/hash/Registry 순서가 아니라 narrative policy가 선택한다.
- [ ] **실제 birth input → canonical → Career interpretation → Evidence → HTML/Preview 응답** 한 경로에서 생성된 결과를 열람·대조한다. LLM/Presentation은 T8 의미를 만들어내거나 보강하지 않는다.
- **완료 산출물:** 실제 명식별 한국어 Career 보고서 최소 두 건 및 MUR complete/partial/insufficient 테스트. '긴 글'이나 '문장 개수' 자체는 합격 조건이 아니다.

#### S5 — 동일 원국 기반 5개 분야의 깊이 있는 종합 확장

- [ ] Career에서 **실질적 의미 종합 + MUR + 보고서**가 확인된 다음 General → Wealth → Business → Relationship (general) 순으로 각 분야의 고유한 source-qualified T8 결론과 coverage 요구를 구현한다. 각 단계는 **1개 실제 명식 입력부터 소비자 문장까지** 같은 수직 슬라이스를 사용한다.
- [ ] 다섯 결과가 정확히 같은 Canonical snapshot/hash를 공유하며, 동일 근거가 어떤 분야에 쓰이는지 설명하되 General 주제를 다른 분야의 새 성격/금전/결혼 결과로 무단 전환하지 않는다. 분야별 얕은 claim, 내용 충돌, 원문 재탕을 표시한다.
- **완료 산출물:** **다섯 분야 모두** 내부 소비자 보고서에서 출처가 있는 별도의 의미 있는 설명과 적정 fallback을 제공한다. Career 한 분야만 합격했다면 P0 전체 완료 아님.

#### S6 — 개인별 해석의 **실제 가치** 회귀 및 제품 완료 판정

- [ ] synthetic 또는 비개인 출처의 **30개 이상** 명식(십신·계절/절기·출생시간 확정/미상·양음력/윤달·관계 신호·근거 부족 포함)과 **10쌍 이상** 차별 판정 사례를 검사한다. 기존 35개 HTTP / 고유 19쌍 비교를 재사용하되 서로 다른 세트의 수치를 섞어 성공률을 조작하지 않는다. 아키텍처 v1.3의 **100 consumed fingerprint** 확대 검증은 Core 종합풀이가 실행된 후 별도의 성숙도 검사로 수행한다.
- [ ] 판정: ① 같은 사실/semantic signature→같은 결정론적 결론, ② 달라야 할 입력/의미→실제 의미 차이, ③ 근거 없는 다변화 0, ④ 근거 없는 결과·출생시각 미상 오판 0, ⑤ 설명 불가 의미 충돌 0, ⑥ 5개 분야 MUR complete/partial/insufficient와 근거·원인 정확.
- [ ] 각 단계의 사용자에게 보이는 실제 한국어 출력 파일(내부 HTML/HTTP), Claim source/Rule/Methodology/정확한 fact-path, 여러 사례의 결과·실패 이유를 함께 기록한다. **외부 전문가 승인/사람 검수 10건을 무조건적인 선행조건으로 재도입하지 않는다.** 필요하면 별도 사용자 조사로 취급한다.
- **완료 산출물:** 5분야 결과 샘플과 재현 가능한 품질 평가. 위 요건을 충족해야만 내부 제품의 `usefulComplete`를 **검증된 범위에서** true로 판단한다. 이 플래그는 Production/Public/Persistence/Commerce 허가와 별도다.

#### 모든 PR에 적용할 제품 진척 규약 (P0-NATAL)

- **보고 항목:** `실제 사용자용 한국어 결과가 전보다 무엇이 달라졌는가 / 새로운 다중 근거 T8의 정확한 출처·입력은 무엇인가 / 어떤 명식에서 달라졌는가 / MUR complete·partial·insufficient 및 미해결 의미 공백 / 다음 최소 제품 기능`.
- **진척 인정 금지:** 문서·출처 표기·Claim 복사문·비교 HTML·감사 로그·추가 fixture 수·CI PASS·PR 병합만으로 P0 제품 완성도를 올리지 않는다. 검증은 필요하나 **이미 검증할 해석 의미가 생긴 뒤** 이를 입증하는 수단이다.
- **권한·품질 분리:** 내부 연구 Preview에서 새 source-qualified 후보를 실험하는 것은 가능하지만 `researchOnly`, `mayPublish=false`, `maySell=false`를 유지한다. Production/Official/공개·저장·결제 전환은 해당 체계의 별도 권한이다.
- **완료 조건:** 실제 출생입력→명식→다중 근거 T8→일관된 한국어 풀이→5개 분야→차별/안전 품질 회귀의 전체 체인이 증명되어야 한다. S1~S6 체크는 **제품 산출물이 존재할 때만** 완료한다.

#### 즉시 착수할 첫 **기능 PR**의 Definition of Done

**목적:** 기존 분석 코드를 또 감사하는 것이 아니라 **첫 source-qualified Career 다중 근거 T8 → 한국어 소비자 보고서의 얇지만 완전한 수직 경로**를 실제 구현한다. 필요한 claim/input 계약과 T5/T6는 **같은 목표에 필요한 최소 범위로** 포함한다.

1. `src/research/career-natal-reading-candidate.ts`의 단일 심볼/채널 관찰을 legacy research로 고정하고, 기존 Canonical/Registry/T5/T6/Claim Graph/ReadingProfile/EvidenceSelector를 사용한다. 새 병렬 runtime 금지.
2. 실제 출처가 받쳐주는 다중 입력 Career 결합 패턴을 **최소 1개 구현**하고, 그 패턴과 다른 구조를 보이는 명식 대조 사례를 만든다. 근거가 부족하면 무단 발명하지 말고 정확한 source gap·해당 Claim HOLD를 기록한 뒤 다른 source-qualified 패턴으로 진행한다.
3. **실제 계산된 차별 명식 두 개 + 동일 입력 대조 하나**에서 종합 Claim의 내용/근거 차이, 무근거/미상시각 fail-closed, 한국어 보고서가 소비자에게 어떻게 보이는지 검증한다. Career MUR는 부족하면 partial로 정확히 표시한다.
4. **PR 결과에 실제 보고서 본문 예시와 비교 근거를 첨부**한다. 구조만 구현하고 사용자가 읽을 결과가 없는 PR은 이 첫 기능 목표 미달이다.
5. 일반 CI 18/18 + PIE/Container → 정확한 HEAD pinned Integration 20/20 → squash merge → 새 main CI/Container 검증은 기존 규정 그대로 준수한다. CI/PR 완료는 제품 의미 품질의 대체물이 아니다.

### 기존 N25–N35 근거·전달 무결성 작업 이력 (제품 완료와 별개 · 새 실행 순서 아님)

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
  - [x] **N30a — 도메인 종합 독해의 동일 원국 표시 무결성 ([#2568](https://github.com/gycha0109-beep/Saju/pull/2568) 병합):** HEAD `0a38fb9b47677bf01ed8368309887bb4818de88c`의 SHA 고정 Integration 20/20 PASS 뒤 squash merge `b9264e66f596ac3fb720cc6a26b4c30e381fe00b`. 확정 기둥 누락/미확정 강등, 미상시각의 허위 시각, delivered 본문 누락을 fail-closed. 새 의미/Production 권한 없음.
  - [x] **N30b — General의 출처 검증 핵심 구조를 5분야 Preview에 연결 ([#2569](https://github.com/gycha0109-beep/Saju/pull/2569) 병합):** HEAD `476c7822ad16375f52e44d63267b5cf4da202737` 통합 20/20 통과 → squash main `5fea3ab3d7120bd8957996e70de141c53f6b594e`, 새 main CI 18/18 및 Container PASS. 새 도메인 의미/Production 승인 아님.
  - [x] **N31 — 4분야 기존 T8 해석·명식 자리 출처 결박 ([#2570](https://github.com/gycha0109-beep/Saju/pull/2570) 병합):** 내부 HTML 상단에 Career/Wealth/Business/Relationship 기존 연구 Claim 복사문과 Rule/Source/Canonical 자리를 표시. `main` SHA `25e46d65f342ec8fa0401f96b2c7074517e9d7a4`의 CI·Container PASS. 소비자 승인 아님.
  - [x] **N32 — 4분야 기존 T8 원문 전체 펼쳐보기 및 동일 채널 witness ([#2571](https://github.com/gycha0109-beep/Saju/pull/2571) 병합):** 해당 구현이 `main` SHA `55bc5b502ccb14eb26b073dfee6ba9008ec4a243`에 포함된 것을 확인했다. 기존 연구 원문을 새 의미로 승격하지 않으며, Production/Commerce 및 P0 완료는 여전히 HOLD.
  - [x] **N33 — 기존 4분야 연구 해석의 정확한 Claim/실행 원국·계산 근거 연결 ([#2573](https://github.com/gycha0109-beep/Saju/pull/2573) 병합):** PR HEAD `05d89259b706cb2ebc76849de6acc2c5f0ceb0d0`에서 일반 CI 18/18, PIE·Container PASS, SHA 고정 [Integration 20/20](https://github.com/gycha0109-beep/Saju/actions/runs/39117218635) PASS, squash main `7d139297c27bea5aec6c17890ccf90cf4a62d507`. 새 main [CI 18/18](https://github.com/gycha0109-beep/Saju/actions/runs/39118140743) + [Container](https://github.com/gycha0109-beep/Saju/actions/runs/39118140742) PASS 확인. Claim별 실제 matched evaluation·출처·정확한 사실 경로와 버전을 확인하며 새 의미·Production/Commerce 승인 없음.
  - [x] **N34 — 실제 35건 HTTP 근거와 네 분야 기존 원문 차이 독립 판정 ([#2574](https://github.com/gycha0109-beep/Saju/pull/2574) 병합):** 동일 Canonical 명식에 연결한 네 분야의 연구 T8 원문을 35개 실제 General HTTP 입력 및 N10의 서로 다른 명식 비교 20건(고유 명식쌍 19개)과 별도의 동일입력 대조군 1쌍에서 재실행한다. 원래 한국어 ClaimNarrativeProfile 문장 변경/같은 문장의 서로 다른 Claim 근거/같은 근거의 계산 위치 차이/근거 부족을 분리 집계하고, 위치만 달라진 결과를 독립적인 사주적 의미 차이로 과장하지 않는다. 결과 JSON과 테스트로 결정성, 출처·원국 지문, 미상시각 및 원본 5분야 HTTP 보존을 검증한다. 이 작업은 개인화 품질 문제의 정량적 *분류*이지 별도 전통 의미, 행동 결과, 체감 가치, Production/Commerce 승인이 아니다. **해석 의미 자체는 개선하지 않은 분류 결과이며 제품 완료로 세지 않는다.**
  - [ ] **N35 — 기존 연구 원문 나란히 표시 ([#2575](https://github.com/gycha0109-beep/Saju/pull/2575) 열린 PR, 2026-10-18 확인):** 내부 감사 화면/아티팩트 개선이며 **S1~S6의 의미 있는 새 T8·MUR·보고서 수직 구현에 해당하지 않음**. 기존 PR은 별도 CI 정책대로 판정하고 유사 비교 UI 작업을 신규 P0 우선순위로 복제하지 않는다.
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

## 4. 다음 세션 시작 위치 — **첫 Career 의미 수직 구현** (2026-10-18 개정)

1. GitHub 최신 `main`, 열린 PR(#2575 포함), 이전/현재 CI와 기존 Career 규칙·실제 source authority 확인. 이 문서의 SHA는 고정된 과거 스냅샷이다.
2. **S1 의미 목록→S2 필요 계약→S3 첫 source-qualified 다중 근거 Career T8→S4 소비자 한국어 결과**를 하나의 사용자가 검증할 수 있는 **기능 수직 PR**로 구현. `src/research/career-natal-reading-candidate.ts`, T5/T6, `src/contracts/interpretation.ts`, `src/interpretation/interpretation-engine.ts`, `src/reading/reading-intent-composition.ts` 및 현행 renderer/preview를 실제 확인하되 **없는 파일/계약을 추측해 만들지 않는다**.
3. 두 실제 차별 명식 + 동일 명식 대조 + 부족한 근거/미상시각 사례를 실행하고 **실제 달라진 한국어 Career 본문·Claim 조합·MUR 결과**를 PR에 기재한다. 결론을 만들 source가 없으면 별도 HOLD 후 다른 source-qualified 결합을 확인한다. N36식 추가 원문 비교 PR부터 시작하지 않는다.
4. Career 품질이 실증되면 S5 General/Wealth/Business/Relationship을 순차 수직 확장하고 S6의 30+ 명식/차별 사례 품질 검증으로 P0 종료를 판정한다.
5. **반드시 구분:** 내부 풀이 품질 통과 ≠ Production/공개/판매 admission. 기존 SHA 고정 CI/통합/병합 및 사후 검증, Research/Bridge/HOLD 경계는 유지한다.
