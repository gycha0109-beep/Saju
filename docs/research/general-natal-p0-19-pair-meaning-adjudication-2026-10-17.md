# P0-NATAL 19개 고유 충돌 쌍 — 의미 반복 원인 및 source-bound 판정 (2026-10-17)

**상태: Research return / Bridge review HOLD / Engine consumer meaning HOLD.** 기존 Runtime/Registry/Admission/Preview/Production을 수정하지 않는다. 구현 스모크/테스트 통과 = 명리학 의미 승인 아님.

## 1. 고정된 실제 실행 근거 (추측·샘플 작성 아님)

- 원본: [PR #2538](https://github.com/gycha0109-beep/Saju/pull/2538), [N10 CI #38704297365](https://github.com/gycha0109-beep/Saju/actions/runs/38704297365), 아티팩트 `natal-n3-audit-38704297365` (11957901379). 사용 파일 `natal-baseline.n10-triage.json` SHA-256 `6b32b5d53289e7664197a1e9e0fbf61096bb5da7d4acc5702ab4dcd44dbcd2ee`; `natal-baseline.rules.json` SHA-256 `9e43274e008208e03a6495c322d0efb3781a76be309823fae1648b46edfe9e58`; `natal-baseline.context.json` SHA-256 `ee09debd4ed4895e99ea52e60cf7f9ddbe6628fc9b9c3a94d114ec2e8e09037f`.
- 실제 35 HTTP 입력, `delivered=33`, `partial_evidence=2`; 다른 표시 명식인데 같은 해석 문구 **20 사례쌍**, 동일 2024-03-10 12:30 대조 입력 재사용으로 **고유 표시 명식쌍 19**. 분석은 **N10 시점의 고정 스냅샷**이며 현재 N24의 제품 품질 수치와 동일하다고 단정하지 않는다.
- N10 고유 분류: `same_family_different_channel=3`, `changed_family_or_mixture=8`, `added_or_missing_research_theme=5`, `same_rules_different_chart=3`. 전체 명식의 family set을 비교하니 **19/19 모두 다섯 계열의 존재 집합이 동일**했다. N10 `changed_family_or_mixture`의 원문 변수는 `leftOnlyThemeClaimTypes`/`rightOnlyThemeClaimTypes` 즉 **차분(차집합)**이므로 이를 **전체 명식 family 구성의 변화**로 해석한 설명은 잘못이다.
- 평가 차원: `JUSTIFIED_SAME_MEANING`은 오직 기존 **계열 수준의 추상적 주제 문장** 공유를 뜻한다. 개인별 총풀이가 동등하다는 보증이 아니다. `METHODOLOGY_CONFLICT`인 #17은 **실행된 T8의 적용 차이는 확인**되지만 출처의 敗財/劫財 용어범위와 比肩 관계의 맥락 제약이 다르므로 개인별 다른 해석은 미승인이라는 판정이다. 나머지 `MISSING_CONTEXT`는 출력의 허위 차별화가 아니라 더 엄격한 독립 의미 문헌·계절·통근·복합 관계·방법론 검증이 필요하다는 판정이다.

## 2. 고유 19쌍 전수 판정

`ST`=천간(`visible_stems`), `BR`=지지(`branches`). 화살표 좌우는 **차분 Claim**이며 다른 family가 각 명식 전체에서 없다는 뜻이 아니다.

| # | 실제 출생 입력 쌍 | N10 진단 | 좌우에만 있는 Research 테마 | 연구 판정 |
|---:|---|---|---|---|
| 1 | `1984-01-07-00:30` ↔ `1984-01-07-12:30` | `same_family_different_channel` | `OFFICER_ST` → `OFFICER_BR` | `MISSING_CONTEXT` |
| 2 | `1984-01-07-00:30` ↔ `1984-01-07-19:30` | `same_rules_different_chart` | `—` → `—` | `JUSTIFIED_SAME_MEANING` |
| 3 | `1984-01-07-12:30` ↔ `1984-01-07-19:30` | `same_family_different_channel` | `OFFICER_BR` → `OFFICER_ST` | `MISSING_CONTEXT` |
| 4 | `1989-09-08-00:30` ↔ `1989-09-08-19:30` | `added_or_missing_research_theme` | `OUTPUT_BR` → `—` | `MISSING_CONTEXT` |
| 5 | `1989-09-08-05:30` ↔ `1989-09-08-12:30` | `changed_family_or_mixture` | `PEER_ST,WEALTH_BR` → `WEALTH_ST` | `MISSING_CONTEXT` |
| 6 | `1992-01-12-00:30` ↔ `1992-01-12-19:30` | `same_rules_different_chart` | `—` → `—` | `JUSTIFIED_SAME_MEANING` |
| 7 | `1992-01-12-00:30` ↔ `2018-07-14-00:30` | `added_or_missing_research_theme` | `—` → `OUTPUT_ST` | `MISSING_CONTEXT` |
| 8 | `1992-01-12-19:30` ↔ `2018-07-14-00:30` | `added_or_missing_research_theme` | `—` → `OUTPUT_ST` | `MISSING_CONTEXT` |
| 9 | `1996-01-09-00:30` ↔ `1996-01-09-05:30` | `changed_family_or_mixture` | `OUTPUT_ST` → `PEER_BR` | `MISSING_CONTEXT` |
| 10 | `1996-01-09-00:30` ↔ `1996-01-09-12:30` | `changed_family_or_mixture` | `OUTPUT_ST` → `RESOURCE_ST` | `MISSING_CONTEXT` |
| 11 | `1996-01-09-00:30` ↔ `1996-01-09-19:30` | `same_rules_different_chart` | `—` → `—` | `JUSTIFIED_SAME_MEANING` |
| 12 | `1996-01-09-05:30` ↔ `1996-01-09-12:30` | `changed_family_or_mixture` | `PEER_BR` → `RESOURCE_ST` | `MISSING_CONTEXT` |
| 13 | `1996-01-09-05:30` ↔ `1996-01-09-19:30` | `changed_family_or_mixture` | `PEER_BR` → `OUTPUT_ST` | `MISSING_CONTEXT` |
| 14 | `1996-01-09-12:30` ↔ `1996-01-09-19:30` | `changed_family_or_mixture` | `RESOURCE_ST` → `OUTPUT_ST` | `MISSING_CONTEXT` |
| 15 | `2001-06-21-00:30` ↔ `2001-06-21-12:30` | `changed_family_or_mixture` | `OUTPUT_ST,RESOURCE_BR` → `RESOURCE_ST` | `MISSING_CONTEXT` |
| 16 | `2001-06-21-05:30` ↔ `2001-06-21-19:30` | `changed_family_or_mixture` | `WEALTH_ST` → `OUTPUT_ST,WEALTH_BR` | `MISSING_CONTEXT` |
| 17 | `2010-02-03-05:30` ↔ `2010-02-03-19:30` | `same_family_different_channel` | `PEER_BR` → `PEER_ST` | `METHODOLOGY_CONFLICT` |
| 18 | `2024-03-10-00:30` ↔ `2024-03-10-19:30` | `added_or_missing_research_theme` | `PEER_BR` → `—` | `MISSING_CONTEXT` |
| 19 | `2024-03-10-05:30` ↔ `2024-03-10-12:30` | `added_or_missing_research_theme` | `—` → `OFFICER_ST,WEALTH_BR` | `MISSING_CONTEXT` |

**계수:** `JUSTIFIED_SAME_MEANING=3`, `JUSTIFIED_DIFFERENT_MEANING=0`, `MISSING_CONTEXT=15`, `METHODOLOGY_CONFLICT=1`; `UNSUPPORTED_INTERPRETATION=0`, `UNRESOLVED=0`의 **주 판정**, 단 모든 사례의 개인적 운세·성격 결론은 미승인이다. 이 0은 관련 영역에 무근거 표현이나 이견이 없다는 뜻이 아니다. N15는 이미 과잉 결론을 차단했다.

## 3. 왜 반복되는가 — 원인과 우선순위

1. **최우선: Claim 발생과 의미의 정보량 차이.** `src/research/general-natal-useful-reading-candidate.ts`의 `FAMILY_MEANING[family]`가 `visible_stems`와 `branches`에 동일 `headline/summary`를 지정한다. T5/T8 선택과 전달은 일부 다르지만 **글자 자체에는 채널·세부 십신·실제 연월일시의 전통적 의미 차이가 인코딩되어 있지 않다** (N8). 뚜렷한 구조 근거가 없다면 같은 계열 주제 문구를 유지하는 것이 오히려 올바르다.
2. **중요: 진단 지표의 오독 위험.** 19쌍의 *전체 family presence*는 같으므로 N10의 8개 'changed family'을 'A는 식상이 있고 B는 없다'라고 사용하면 사실과 다르다. `added_or_missing`도 **해당 채널 Claim의 차분**이지 십신 family 존재의 절대 차이가 아니다.
3. **의미 깊이의 실제 빈틈.** T5 두 개가 있다는 사실과 관계를 기술하는 T8 `source_bounded_relation`을 구별해야 한다. N12/N13/N14/N15/N19/N20에서 이미 두 개의 별개 upstream T5, 동일 snapshot/scenario, 정확한 subtype, 출처·방법론을 검증하는 연구 경로가 있다. 새로운 병렬 엔진이나 전 계열 공통 '천간 외부/지지 내부' 템플릿 추가를 금한다.
4. **법적·운영 권한 결손도 독립.** 현재 테마는 `research`/`secondary_only`/`unreviewed`; Preview semantic admission과 소비자 소유 Claim은 별도 권한이다. Claim의 존재/CI 테스트 성공/문장 변형만으로 소비자 의미 승인 불가.

## 4. 우선순위 1 — 관성의 천간·지지 관측 차이: '같은 의미여도 됨'의 경계

**실제 사례:** 1984-01-07 00:30 `癸亥·乙丑·庚子·丙子` ↔ 12:30 `癸亥·乙丑·庚子·壬午`. 전자는 **시주 천간 丙(편관)**, 후자는 **시주 지지 午(정관)**. 두 경우 모두 관성이라는 추상적 계열은 있고 다른 관측 십신들 또한 존재한다. 따라서 '**관성이 관측된다**'라는 제한된 T5 의미의 동일성은 정당하다. 그러나 변한 것은 채널만이 아니라 **편관/정관 subtype**과 시주 간지·기타 시주 사실까지 포함된다. 단순히 `visible_stems`라서 외향적이고 `branches`라서 내향적이라는 개인 추론은 **부당한 도약**이다.

**Claim 후보:** 새 독립 의미 Claim 없음. 기존 `TEN_GOD_OFFICER_VISIBLE_STEMS_THEME` / `TEN_GOD_OFFICER_BRANCHES_THEME` 및 `GENERAL_NATAL_OFFICER_*_THEME`의 관측 channel/정확한 subtype/위치 **observation/qualifier 후보**만 연구용으로 반환. `M-TEN-GOD-CONSUMER-THEME-YUANHAI@0.1.0-research`, `SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE` (`淵海子平` `論日為主/論性情/十神`, [고정되지 않은 공개 전사](https://zh.wikisource.org/zh-hant/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3)). 원목판 표적 직접 대조 아님. **불확실성**: 근본적 채널 의미, 월령·투간·통근·합충 조합의 별도 적용이 미검증. **반례:** 1984-01-07 00:30 ↔ 19:30은 `丙子↔丙戌` 시지는 달라도 같은 관성 천간·같은 Research 규칙 집합이어서 관성 의미를 억지로 달리하면 안 된다. 금지: 성격, 책임감, 직업, 길흉, 질병, 연도 예측. **판정:** `NARROW_OR_REPLACE` (관측 qualifier를 별도로 제시하고 개인 의미 격상은 HOLD). **Bridge:** source/version/snapshot에 결박된 observation만 독립 심사. **Engine:** 허가 전에는 관성 headline의 복제 방지를 목표로 달리 쓴 문구를 만들지 않는다.

## 5. 우선순위 2 — 정확한 겁재와 비견: 기존 T8 구조 관계의 제한적 비동일성

**실제 사례:** 2010-02-03 05:30 `己丑·丁丑·甲申·丁卯` ↔ 19:30 `己丑·丁丑·甲申·甲戌`. 공통: 갑일간·축월; 연간 `己(정재)`와 연·월 지지 `丑(정재)`로 **재성 family 관측**. 05:30 시지 `卯(겁재)` vs 19:30 시간 `甲(비견)`, 다른 시지 `戌(편재)`; N10 T5 subtype/위치 자료에서 **05:30은 `겁재`가 존재하지만 19:30은 관측된 7개 대표 slot에 `겁재`가 없다**.

**실제 재사용 규칙:** `src/research/general-natal-conclusion-source-bounded-candidate.ts`의 `RULE-GENERAL-NATAL-SOURCE-BOUNDED-PEER-TO-WEALTH-ADVERSE@0.2.0-research`, T8 Claim `GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE`, methodology `M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1`. 선행 별도 T5 Claim `GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_PEER_PRESENT` + `GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_WEALTH_PRESENT` 및 **정확한 `겁재`**의 원국 사실을 필수로 한다. 비견만 있으면 T8의 정확한 조건이 불성립한다.

**고전 전사·방법론 경계:** `SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE` ([『淵海子平』 「論劫財」 전사](https://zh.wikisource.org/zh-hant/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3)); `SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS` ([『三命通會』 卷五 「論古人立印食官財名義」 전사](https://zh.wikisource.org/zh/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B705)); peer taxonomy `SRC-SAMYEONG-TONGHOE-V7-FOUR-LIBRARIES-PEER-TAXONOMY` ([卷七 「兄弟」 전사](https://zh.wikisource.org/w/index.php?title=%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)%2F%E5%8D%B707&oldid=2082208)). 모두 **등록된 전자 전사 출처**이지 직접 확인한 인쇄면이라는 주장 아님. Quality=`secondary_only`/`unreviewed`/`contested`.

**지금 정당화되는 정확한 다른 의미:** 05:30은 `劫財→財` **Research T8 구조 관계의 발행 조건을 만족할 수 있고**, 19:30은 **현재 정의된 대표 slot 기준으로 그 조건을 충족하지 않는다**. 이는 **T8 규칙 적용 적격성**에 대한 명제일 뿐, N10 integrated research runtime이 실제 이 T8을 발행했다는 뜻이 아니다. N13 registry를 같은 T0 snapshot에서 재실행하고 실제 T8 및 **두 개의 구별된 upstream T5 Claim ID**를 확인한 후에만 Research structural reading으로 확정한다. 실제 재산 손실/경쟁/인격/직장/일시·규칙 가중치 주장은 불가. `劫財` 부재는 지장간·대체 방법론 전체에서의 보편적 부재 증명이 아니다. **반례:** 19:30에는 비견과 재성이 함께 있지만 정확한 `겁재`가 없어 `劫財→財`를 발행하면 안 된다. **판정:** `APPLICABLE_BOUNDED` (연구 조건 후보 수준), 소비자 admission HOLD.

**수준 분리:** ① 재성·비겁 동시 존재 = T5 사실 → ② source-bound `劫財→財` 적격성 차이 = 연구 관계 후보 → ③ 실제 동일 스냅샷 N13 T8 실행/독립 Claim 검증 = 연구 구조 증거 → ④ 경쟁·손실 등 개인 예측 = 현재 미허가. 특히 기존 N20 `食傷→財`와 `劫財→財`가 나란히 보이더라도 생성과 견제 중 무엇이 우세한지는 미입증이다.

## 6. 검토한 변수별 근거/권한 판정

| 차원 | 현재 근거에서 할 수 있는 일 | 독립 개인 의미 차등 가능 여부 |
|---|---|---|
| 일간/오행 | T0 일간의 관측·전통 기본축; 요소가 같은 두 명식에 동일 baseline 가능 | **불가**: 개별 기질 결론 미검증 |
| 월령/계절/T2 | 절기/월지 사실, N18A 월지 구조 Claim | **보류**: 1989-09-08 00:30 `壬申` vs 19:30 `癸酉`의 T2 변경 자체를 운세 우열로 볼 수 없음 |
| 정관·편관, 비견·겁재 등 subtype | 실제 T0/T5 분류와 **정확한 겁재 조건** 구분 가능 | 관계 조건이 등록된 경우 **연구 구조**만 |
| 천간·지지 channel/연월일시 위치 | T5 실제 observed slot·channel·T6/T8 근거 위치 | channel→성격 공식을 전계열에 적용 금지 |
| 통근/투간 | 독립 근거·데이터 정의와 정확한 장간 처리 필요 | **보류** |
| 생극제화 | 등록된 source-bound T8 다섯 개 관계(일부 정확한 subtype 필수) | **Research 구조 차이만**; 사건·개인 결론 불가 |
| 합충형파해 | 범위·상호우선권·전승 권한 검증 필요 | **보류**, 연운 통합 우선순위 승인 0/14 |
| 복수 십신·상반된 구조 | N13/N14/N19/N20: 동일 snapshot, 별도 Claim, 공유 upstream, provenance 조건 검증 | 상쇄·우세·강약·최종 결과 **불가** |
| 반례·조건·예외 | 2010-02-03 비견+財는 겁재+財 조건의 반례; 전체 계열은 19/19 동일 | 기존 연구 조건의 엄격한 범위에서만 |

## 7. 실행 인계(브릿지/엔진), 안전 가드

**Bridge — 문서 판정 후 소비 권한 심사:** `src/preview/preview-semantic-admission.ts`의 기존 claim-scoped 계약에서 `GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE`의 `claim/observation/qualifier/hold` 선택을 **해당 method/version/sourceRefs/quality와 묶어** 독립적으로 심사한다. 현재 `research`, `secondary_only`, `unreviewed`이므로 **승격 안 됨**. 제한적 `observation`을 검토하더라도 **승인 명세 없이는 소비자용 문장 삽입 금지**. N15의 소비자형 과잉결론 차단을 보존한다. `visible_stems`와 `branches`가 달라졌다는 이유로 별도 의미를 자동 허가하면 안 된다.

**Engine — 기존 경로 활용:** `src/research/general-natal-conclusion-source-bounded-candidate.ts` Registry → `src/research/general-natal-t8-structural-reading-draft.ts` N13 실제 T8 확인 → N14/N19/N20 기존 연속·충돌 규칙 검토 → 기존 Claim→Canonical semantic bundle→Official Reading Plan→renderer/HTTP 경로 사용. `scripts/natal-personalization-audit.mjs` / N8 trace에서 동일 출생 입력 두 쌍을 **동일 계산 정책·snapshot**으로 연구 shadow 재실행한다. `T8 emitted` 여부, 정확한 겁재, source/version·two distinct upstream IDs, 채널·정편 subtype·월지 같은 필드를 별도로 로깅. `meaningFingerprint`와 `positionalFactFingerprint`를 구별하고 N10 동일문구 경고를 무조건 '해석 실패'로 세지 않는다. 결과가 동일하면 적법하게 동일하다고 기록한다. **기존 소비자 다섯 영역 문장을 기계적으로 다양화하는 작업 금지**.

**Fail-closed:** 누락·모호한 출생시간, 실제 T5 2종 Claim 미발행, 서로 다른 snapshot/scenario, source locator/quality 누락, `겁재` 없이 비견만 관측, 같은 upstream Claim 중복, 전사 교감 미완료, Bridge 의미 심사 미승인, 인쇄 원본 미검증 → 해당 단계 이상의 의미 생성 보류. 출력하지 않는 것은 제품 전체 개발 중단을 뜻하지 않는다. **새 독립 semantic authority/계산엔진 없음**.

**최종 세 질문:** ① 반복의 직접 원인은 5개 `FAMILY_MEANING`이 세부 channel/subtype을 의미 문장으로 연결하지 않는 설계와 T8 consumer admission 차단이다. ② 3쌍은 계열 주제 의미 공유가 정당하고, 15쌍은 단순 문구 분기가 무근거이며 추가 조건 검증 필요, 1쌍은 실제 겁재 T8 발행 차이는 확인됐지만 고전 명칭·적용 범위가 다투어져 `METHODOLOGY_CONFLICT`로 보류한다. ③ Engine은 기존 T8을 정확한 조건으로 실행·증거를 남겨야 하며, Bridge는 **Claim 단위** semantic admission을 별도 심사해야 한다.

**완료 수준:** 19/19 source-audit triage 완료, 두 패턴의 구체적 연구 후보·반례·트랙 인계 완료. **1582/1600/1634 고서 독립 판본 등 다른 Research Freeze 무변경**. `usefulComplete=0`, Production/Official Reading/LLM/Commerce/payment 의미 승인 0.


## 8. 실제 N13 재실행 회귀 테스트 (Research-only 후속 검증)

- 재현 코드: `test/general-natal-p0-n13-real-pair-replay.test.ts`. 기존 N10과 같은 `2026-10-15T00:00:00.000Z`, 출생시간 05:30/19:30, `sexForTraditionalCalculation:'unspecified'`, `calculateAuthorizedMyeonghwaProductionSnapshot`을 사용한다. 인위적 `derivedFacts.tenGods` 수정이나 fixture 주입 없이 **각 실제 Canonical Snapshot**을 계산한다.
- 각 snapshot에 기존 `createGeneralNatalSourceBoundedRegistry`와 `runInterpretation`을 적용하고 N13 `buildNatalN13StructuralResearchReading`으로 동일 snapshot·두 T5 upstream Claim·출처 locator를 검사한다. 05:30은 **정확한 겁재+財를 갖는 T8 Claim 한 건**, 19:30은 **비견+財 존재에도 정확한 겁재가 없어 해당 T8 Claim 0건**이어야 테스트 통과한다. 실제 규칙이 조건과 다르게 실행되면 테스트가 실패하도록 설정했다.
- 검증 성공의 의미: **Registry가 이미 표현한 연구용 관계의 적용 차이를 실제 원국에 대해 재현**. 검증 성공으로 고전 출처의 직접 인쇄 판면, 차별화된 소비자 의미, 특정 사람의 실제 재물 손실·우세가 증명되는 것은 아니다. `research_only` 및 Consumer/Production false 가드를 동시에 검사한다. 전체 CI와 정확한 commit 결과는 해당 PR Workflow에서 별도 확인한다.

## 9. 직접 디지털 원문 대조에서 새로 발견된 방법론 경계 — #17 주 판정 보정

**새 증거의 성격:** [『淵海子平』 공개 전사](https://zh.wikisource.org/zh-hant/淵海子平)는 편집 가능한 문서로서 실제 인쇄본의 물리적 판면·전사 저본이 확인되지 않았다. 같은 전사의 **「基礎」**는 `以甲為例 ... 見乙：為劫財、敗財`로 양 용어를 병기하지만, **「論劫財」**의 상세 구분은 `五陽見五陰為敗財`, `五陰見五陽為劫財`이다. 또 `卯宮乙木獨相逢`(「又地支藏遁歌」). 즉 2010년 **甲 일간·卯(乙) 대표**를 오늘의 T5 `겁재`라 부르는 체계와 고전의 좁은 `敗財` 명칭 사이에는 **해석 대상·명칭 수준을 결정하는 교감 작업**이 필요하다. 이는 서로 다른 고전 판본 두 개를 검증했다는 뜻도, 현대 겁재 분류가 계산 오류라는 뜻도 아니다.

**『三命通會』 전사 교차 검증:** [卷五 「論古人立印食官財名義」](https://zh.wikisource.org/zh-hant/三命通會/卷五)는 `財怕劫，被劫則分`이라고 하나 **재성·겁재가 원국 어디든 함께 있으면 반드시 특정 개인 결과가 생긴다**고 직접 보증하지 않는다. [四庫全書本 卷七 「兄弟引例章」](https://zh.wikisource.org/wiki/三命通會_(四庫全書本)/卷07)에서는 `兄弟者即刼財比肩甲見乙乙見甲之類`로 **비견·겁재 양쪽을 peer의 범주**에 둔다. 더욱 중요하게는 같은 卷七 「妻妾引例章」에 `若甲申甲戌日生甲寅乙夘月日主大旺雖有妻以比肩分奪`처럼 **비견 관련 分奪의 조건부 고전 사례**가 있다. 2010년 19:30 원국은 甲申일이지만 **丁丑월**, 즉 이 사례의 `甲寅/乙夘月·日主大旺` 완전 조건을 충족한다고 볼 수 없다. 그 사례를 이 사람의 재물·결혼·성격 의미로 사용하는 일도 금한다.

**실행 결과와 의미의 엄격한 분리:** [실제 두 명식 N13 재실행 CI](https://github.com/gycha0109-beep/Saju/actions/runs/39017251624)는 05:30의 정확한 기존 `PEER-TO-WEALTH-ADVERSE` Claim **1건**, 19:30의 동일 Claim **0건**을 검증했다. 이는 **기존 Registry가 작성한 규칙의 조건 차이**이지 `비견은 財 견제의 어떤 고전 의미도 갖지 않는다`, `겁재+財는 반드시 경쟁·돈 문제를 일으킨다`의 증거가 아니다. 05:30의 卯지지 대표가 乙인 사실부터 원전에서 **실제 교호 제약 및 양적 강약**으로 이어지는 논증도 미성립이다.

**연구 판정 변경:** N10 #17의 `JUSTIFIED_DIFFERENT_MEANING`(이전에는 T8 적격성 차이의 약칭)을 **`METHODOLOGY_CONFLICT`로 보정**한다. 분류는 **동일 T5 추상 의미 3 / 추가 맥락 15 / 방법론 명칭·관계 범위 미합의 1 / 독립 소비자 의미 차이 승인 0**. T8 실행 적격성의 실제 차이는 삭제하지 않고 **독립 실행 사실 필드에 보관**했다. 이는 당초 해석이 잘못이라는 최종 단정이 아니라, 서로 다른 분류 체계/조건 설명이 공존하기에 의미 권한을 아직 판정할 수 없다는 연구 HOLD다.

**Bridge의 명시적 필수 확인:** (1) 『淵海子平』`甲見乙=劫財/敗財` 적용 판본·저본·교정 여부, (2) 지지 卯藏乙와 천간乙의 동일한 관계 판정 가능 범위, (3) 출처가 말하는 **비견→財 조건부 예외**의 반례와 월령·왕쇠 조건, (4) 同居 T5 두 계열에서 실제 개별 생극·제화 관계로 가는 근거, (5) 독립 방법론/신뢰·리뷰 및 Claim별 admission. 이 다섯 조건이 미해결이면 `claim`, `observation`, `qualifier` 모두 **소비자 투영 HOLD**. 새 T8/semantic authority/해석 문구/Production 적용 없음.

*증거 등급:* 인용 문장은 **해당 온라인 전사 직접 확인(C)**, **해당 시대 판본의 실제 인쇄면 판독(A) 아님**. 서로 다른 사이트의 복제 전사를 독립 목판으로 계수하지 않음.

## 10. 卷次 교정 — 『三命通會』（四庫全書本）卷五의 比肩·財 조건부 전사 (2026-10-17 추가 대조)

**확인한 전사 위치:** [『三命通會（四庫全書本）/卷05』](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05)에 **「論正財」·「論偏財」·「時上偏財」 세 조항이 모두 순서대로 명시**되어 있다. 기존 [일반 『三命通會/卷六』](https://zh.wikisource.org/zh-hant/三命通會/卷六)에는 같은 제목과 상당한 겹침이 있으나 그 페이지는 앞머리 말미에 `（以下內容與書不合）` 편집 경고를 둔다. 앞서 `四庫全書本/卷06`을 찾아 조항이 없다고 경고했던 **권차 불일치를 해결**했다. 정확한 교감 경로는 **四庫全書本 卷五 ↔ 일반 편집판 卷六**, *같은 저작의 두 온라인 전사*다. 이를 독립 원전 둘이나 실제 인쇄본 대조로 계산하지 않는다.

**四庫 전사의 위치·문자 검증(물리 scan·folio는 별도 미검증):**

- 「論正財」: `〈忌身弱 比肩 羊刃 空絶衝合〉`, `又曰身弱財多喜兄弟羊刃為助`, `又雲財旺者遇比無妨`, `財生身旺兩相停不喜再見比肩`, `財多如何不發財只因身弱少培栽運到比肩身旺地`가 **동일 조항에 함께 존재**한다. 정확한 일주 강약·재성 왕쇠·재성의 원국/행운 구별 없이는 비견의 항상 부정 또는 항상 긍정을 주장할 수 없다.
- 「論偏財」: `若見刑衝破害比刼分奪`, `最怕刼敗比肩`, `偏財非是自己財最怕比肩同位來` 등 **비견·겁재를 둘 다 언급**한다. 여기서 `刼`은 현행 일반 전사 `劫`과 **문자 표기의 차이**다. 「偏財」 문맥의 조건을 전체 원국 모든 재성으로 곧바로 일반화하지 않는다.
- 「時上偏財」: `時上偏財怕逢兄弟如甲日見戊辰或甲戌時之例`, `柱中不宜再見戊巳`, `只要一位不宜多逢`이 **四庫卷五 직접 전사에 공존**한다. `巳`는 원문 전사의 형태이므로 이를 `己`로 치환하는 작업은 교감 없이 확정할 수 없다. 2010-02-03 19:30의 `甲申日/甲戌時` 글자 일치는 일부 조건의 **형식적 부합**일 뿐: 年干 `己` 및 여러 財 슬롯, 강약·月令·官印·刑衝 등 미확정 조건이 격식 성립을 막는다.

**증거 수준 변경:** '이 세 구절이 특정 고전의 어느 권에 속하는지 미확인'에서 **『四庫全書本』 권五라는 검증 가능한 온라인 전사 위치 확보(C-graded transcription corroboration)**로 진전했다. 그러나 Wikisource 자체 편집·인쇄 원본 스캔, 실제 물리 판면·개별 folio, 서로 다른 판본 계통/원문 문자·구두점 정합성은 **미검증**이다. 일반본 卷六의 편집 경고도 철회하지 않는다. 새 승격된 생산용 SourceReference, ReviewAttestation, independent witness count는 **0**이다.

**2010년 구조적 적용:** 05:30 `卯(乙)` 기반 정확한 기존 `겁재` T8 1건과 19:30 `甲(비견)`의 해당 T8 0건은 실제 N13 Research 실행 관측 그대로다. 卷五는 비견과 재성의 관계가 맥락에 따라 **조건부로 명시될 수 있음**을 입증할 온라인 문헌 근거지만, 2010 甲申日 / 丁丑月 두 명식에 각각의 旺衰·正偏財·元局/行運·중복 조건을 **확정하지 못하므로** 추가 비견 규칙이나 개인 재물·직업·운세 의미를 부여하지 않는다.

**다음 Research 검증:** 四庫卷五 조항의 해당 물리 스캔·folios·底本/revision과 일반 卷六의 편집 경고 범위/계보; 甲/乙 敗財·劫財 명칭 분기; 卯藏乙 vs visible 甲 구별; `甲戌時`의 정확한 偏財 슬롯·`己`/판독형 `巳`·복수 財 조건; 계산된 월령과 별도의 governed 強弱 방법론, 大運 적용 여부; 양·음·적용 불가 chart 반례.

**판정 유지:** #17 `METHODOLOGY_CONFLICT`, 19쌍 `JUSTIFIED_SAME_MEANING=3 / MISSING_CONTEXT=15 / METHODOLOGY_CONFLICT=1 / JUSTIFIED_DIFFERENT_MEANING=0`; 기존 N13 연구 한정 Rule 및 Bridge/Preview/Official/Production HOLD. 물리 검증과 의미 승인 없이 소비자 문장 변형·新比肩→財 Rule을 금한다.

## 11. 리뷰 대기와 독립한 실제 명식 source-condition Research shadow

`src/research/general-natal-p0-n27-bijeon-wealth-shadow.ts`는 **실제 Canonical snapshot만** 입력으로 읽고 『四庫全書本』 卷五 「時上偏財」의 `甲日+甲戌時` **문자상 일치** 여부를 판정한다. 2010-02-03 19:30의 `甲日/甲戌時`와 年干 `己`, 月支 `丑`, 해당 표준 십신 `비견`·`財`를 개별 관측으로 남긴다. 05:30은 해당 시간 구절과 **불일치**, 미상 시각은 `HOUR_UNRESOLVED`로 구분한다. 강약·재성 유일성·`戊巳` 글자 판독·원 인쇄면·실제 금전 결과는 **여전히 미판정**이다.

`test/general-natal-p0-n27-bijeon-wealth-shadow.test.ts`에서 승인된 T0 계산 경로의 두 실제 명식과 미상 시각을 재실행해 `MATCHED_LEXICAL_FRAGMENT_ONLY`와 미승인/미출력, 불일치/미상 시각 방어를 검사한다. 연구 텍스트 수집과 계산 사실 대조는 reviewer 승인 없이 계속할 수 있으나 **T8 연구 룰의 확장·사용자 해석 발행은 이 shadow가 하지 않는다**. Bridge #2557 HOLD와 19쌍의 3/15/1 판정은 유지한다.

## 12. 권5 인쇄본 후보 식별과 실제 명식 재성·강약 게이트 분해

**인쇄본 탐색 진전 / 직접 판독 미완료:** Wikimedia Commons에서 四庫全書·術數類 권五의 스캔 파일 두 건을 식별했다.
- [CADAL06056481, 230 이미지면](https://commons.wikimedia.org/wiki/File:CADAL06056481_三命通會·卷五.djvu) — CADAL 고유 파일 후보.
- [CADAL06066041, 226 이미지면](https://commons.wikimedia.org/wiki/File:CADAL06066041_三命通會·卷五.djvu) — 다른 CADAL 파일 후보, 현 단계에서 두 인쇄 바탕 판본이 독립인지 알 수 없음.
- [中國哲學書電子化計劃 欽定四庫全書 12권 스캔 도서관](https://ctext.org/library.pl?if=gb&res=6109) — 浙江大學圖書館 원본/CADAL 스캔 출처 설명. [같은 플랫폼의 卷五 OCR](https://ctext.org/wiki.pl?chapter=864968&if=gb)은 자동 인식된 파생 텍스트이므로 인쇄면 직접 판독의 대체물이 **아니다**.

아직 PDF/DjVu 중 어느 소스에서도 *「論正財」「論偏財」「時上偏財」의 구절이 찍힌 실제 이미지면의 번호·folio·字形을 직접 확인하지 못했다*. 따라서 `printedFolioOrScanVerified=false`를 유지하고, 원 이미지 자료의 단순 존재를 원문 integrity 증거로 승격하지 않았다. 論正財의 `比肩`과 時上偏財의 `戊巳/戊己` 중 인쇄 字形의 교감은 미해결이다.

**실제 두 2010 Canonical 명식의 계산-사실 정밀화:** 기존 `buildGeneralNatalN27BijeonWealthShadow(snapshot)` v2는 원래 T0 정책을 유지하면서 (1) `정재`와 `편재` 별 관측 슬롯 수, (2) 노출 천간과 지지 **대표** 슬롯 수, (3) 4지지 지장간 배열의 *실제 계산 결과*, (4) `시상편재`의 고전 `只要一位` 성립 여부를 별도 상태로 보관한다. **복수 재성 대표 슬롯 관측은 사실이나, 고전의 財 한 자리/時上格 유일 조건과 동일한 측정값이 아니므로** `NOT_ADJUDICATED`다.

**강약 판정 권한 고정:** `GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY`에 따르면 `旺衰`와 `強弱`의 구별은 출처상 관찰로 인정하지만 원국 전체 `chartLevelWangShuaiClassifierAuthorized=false`, `chartLevelQiangRuoClassifierAuthorized=false`. 실제 `丁丑月`을 계산해도 `甲木`이 최종 신강/신약이라고 결론지을 수 없다. v2 Shadow는 `UNCLASSIFIED`를 반환하고 원국별 강약·시상편재 격 부여를 계속 금지한다.

**이탈 방지:** 실제 05:30/19:30/미상시각 fixture 재실행을 기존 테스트에서 강화. 원본 스캔 후보 발견=source integrity 통과/독립 reviewer approval, 재성 복수=고전 유일조건 불충족 확정, 월지 丑=강약 최종 분류로 점프하는 **세 가지 과잉 결론을 모두 거부**한다. #17 `METHODOLOGY_CONFLICT`, 19쌍 3/15/1, N13 기존 T8 1 vs 0, Bridge #2557 다섯 Claim HOLD는 변경하지 않는다.

## 13. 실제 전사 구절의 다자 문자교감: 『四庫全書本』 巳 ↔ 『識典古籍』 己

**이번에 직접 확인한 읽기 위치와 문자(원본 인쇄면이 아님):**

| 온라인 전사 | 편명/볼륨 | 「時上偏財」 관련 절 | 끝 글자 | 증거 상태 |
|---|---|---|---|---|
| [維基文庫 『三命通會（四庫全書本）/卷05』](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05) | 卷五 | `柱中不宜再見戊巳` | **巳** (지지 뱀 사) | 온라인 C 등급 |
| [識典古籍 『三命通會卷之五』](https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8) | 卷之五 | `柱中不宜再見戊己` | **己** (천간 기) | 온라인 C 등급 |
| [維基文庫 일반 『三命通會/卷六』](https://zh.wikisource.org/zh-hant/三命通會/卷六) | 卷六 (편집 경고 `以下內容與書不合`) | `柱中不宜再見戊己` | **己** | 경고 뒤 전사, 저본 불명 |

**직접 인쇄면 판독 시도 및 미완료 사유:** 공개 Wikimedia Commons/CADAL 卷五 DjVu 원본 파일은 메타데이터와 2개 후보 ID는 확인되었으나, 현 실행 환경에서 원 이미지 바이너리를 내려받아 대상 면을 추출하는 데 실패했다. 따라서 ‘인쇄본에 己가 맞다’와 ‘巳는 오식이다’를 주장하지 않는다. 두 사이트 이상이 己라고 적었다는 **투표로 교감 확정 금지**. 실제 이미지면의 folio, 원본 서지계통, OCR이 아닌 눈으로 읽은 인쇄 字形, 판독 검증을 남겨야 한다.

**실제 원국 조건 분리 v3:** 두 Canonical 2010 T0 명식에서 `甲` 일간의 `戊/己`로 기록되는 실제 천간과 4지지 지장간 관측을 별도 필드로 추적한다. 19:30 명식의 年干 `己`, 日支 `申`에 숨은 `戊`, 時支 `戌`에 숨은 `戊`는 데이터 레벨 구조적 사실이다. 그러나 세 항목이 「時上偏財」의 원문 `柱中不宜再見戊己`나 `只要一位`에 **어떤 규칙과 가중치로 해당되는지는 아직 고전 판면·방법론 모두 불명**이다. 지장간 존재 → 별도 편재격 성립/불성립, 복수 위치 → 강약/운세로 확대 금지.

검증 구현: `src/research/general-natal-p0-n27-bijeon-wealth-shadow.ts` v3 및 동일한 실제 T0 snapshot 회귀 테스트. `digitalCollation.correctOriginalPrintGlyph=UNRESOLVED`, `applyingJiProhibitionToThisChartAuthorized=false`, `researchStrengthBoundary.result=UNCLASSIFIED`, `classicalHourWealthSingletonEvidence.status=NOT_ADJUDICATED`. 기존 N13 T8 1 대 0, #17 `METHODOLOGY_CONFLICT`, Bridge HOLD 및 Product/Official/Production 의미 승인 0 유지.

## 14. 신규 판본 소장처 추적 — Harvard 보각본·NLC 刻本 원본 스캔 (2026-10-17)

**새 후보 인쇄판의 소장 서지 확인:** 기존 CADAL `06056481/06066041` 四庫全書卷五 파일에만 의존하지 않고, 서로 다른 물리 서지 형식을 가진 권五 자료를 추가 검색했다.

| 서지 후보 | 스캔 파일 | 직접 확인한 catalog metadata | 대상 「時上偏財」 실물면 판독 |
|---|---|---|---|
| 하버드 옌칭도서관 | [Harvard drs:53262215 / 卷之五](https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf) | 청 雍正13년(1735?) **補刊本**, 十行二〇字, **99 PDF 이미지면**, 출판 연대 추정에 물음표 유지 | **아니오** |
| 중국국가도서관 | [NLC 第9冊 / 卷之五上](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf) | **刻本**, 十行二二字·白口·四周雙邊, 45 이미지면 | **아니오** |
| 중국국가도서관 | [NLC 第10冊 / 卷之五下](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67241_三命通會_第10冊.pdf) | **위와 같은 NLC 책의 하권** 49 이미지면, 상·하권 **2개의 독립 판본이 아니다** | **아니오** |

**실제 신뢰 단계 구분:** ① 두 가지 서로 다른 **소장처/판식 후보**는 확인. ② 동일 《三命通會》 구절이 각 파일의 **어느 면에 찍혔는지 특정 못함**. ③ `巳`/ `己`의 원판문자를 판독하지 못함. ④ 따라서 각 후보에서 구절이 존재하는지, 후대 교정·이체자 차이가 있는지, 원문 레퍼런스가 텍스트 계통상 독립적인지 **아직 증명되지 않음**. 이 셋을 뒤섞지 않는다.

**다운로드 제약:** 본 실행의 원본 URL 직접 가져오기는 웹/실행 환경 측 바이너리 응답 제한으로 실패했으며 PDF/DjVu 이미지 자체를 성공적으로 열고 판독한 증거를 생성하지 못했다. PDF 및 DjVu의 **이미지면 존재를 확인하는 것과 원문을 실제 읽은 것은 다르다**. 다음 대조 단위는 후보 페이지 내 「時上偏財」 *제목*과 `柱中不宜再見戊{巳|己}`의 좌우 인접 칸을 포함하는 이미지면·pageIndex, 실제 찍힌 글자, 판본/소장 ID, 전사 변경 사유, 이미지 또는 파일 checksum이다.

코드 계약: `buildGeneralNatalN27BijeonWealthShadow` v4에서 3개 소장 파일을 2개 *가능성 있는* printing group으로 구분하고 각 `originalPrintedClauseRead=false`, `physicallyInspectedTargetPrintings=0`를 고정한다. **Printing group 2개 ≠ 원문 독립확인 2건**. 기존 CI의 연구 조건 검사, 강약 미승인, N13 겁재 조건 및 Bridge 5 HOLD 불변.


## 15. 직접 인쇄면 판독을 위한 반복 실행 가능한 PDF 조사 도구 (N27 Research-only)

**실제 원본 판독 상태:** 실행 환경에서는 하버드 PDF `Harvard_drs_53262215_三命通會_v.5卷之五.pdf` 91.33 MB에 대한 외부 다운로드가 제한되어, 대상 원본 이미지면과 `巳/己` 글자를 **직접 판독하지 못했다**. 검증된 음성 결과를 억지로 성공으로 바꾸지 않는다. [출처 서지](https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf).

**대안 — 실제 판독을 위한 실행 코드:** `scripts/research/inspect-n27-volume-five-print.mjs`를 추가했다. 원본 PDF 파일을 로컬에 받은 뒤 Poppler `pdfinfo`/`pdftoppm`이 있는 환경에서 아래처럼 수행한다. 이 도구는 OCR 기반으로 원문을 상상하거나 자동 보정하지 않고, 모든 스캔면을 실제 이미지로 렌더링한다.

```bash
node scripts/research/inspect-n27-volume-five-print.mjs \
  --pdf "./Harvard_drs_53262215_三命通會_v.5卷之五.pdf" \
  --source-id HARVARD_DRS_53262215_VOL_5 \
  --out "./evidence/n27-harvard-volume-five" --pages all
```

- 생성 결과: `index.html` (면별 열람 갤러리), `pages/page-0001.png` 등 실 이미지, `manifest.json` (원본 PDF 및 면별 렌더 SHA256), `reading-template.json` (`UNREVIEWED`).
- `--pages 1-25,40-60`처럼 **연속 범위 재추출** 가능. NLC 상·하권은 개별 파일이지만 같은 `candidatePrintingGroup`에 속한다.
- 원본 판독을 선언하려면 최소 **파일 해시 / PDF 면 번호 / 책 원문 folio 표기 / 제목 「時上偏財」와 양옆 문맥 / 실물 인쇄 字形의 巳·己 판독 / 해당 면 이미지 SHA256**를 채운다. 별개의 편집 전사·OCR 결과를 원본 판독 증거로 사용하지 않는다.
- 현재 기본 출력은 `originalFolioLocated=false`, `originalPrintGlyphVerified=false`, `independentHistoricalWitnessCertified=false`, `interpretationAdmitted=false`, `productionAuthorized=false`; 출력 파일만 생성되어도 이 상태가 **자동으로 true로 바뀌지 않는다**.
- PDF 파일이 존재하지 않거나 `source-id`가 미등록이면 즉시 거부. `node scripts/research/inspect-n27-volume-five-print.mjs --self-test`는 외부 다운로드 없이 동작하고 실제 로컬 PDF로 한 번 더 수동 실행해야 이미지 확보가 증명된다.

**검증 경계:** 이 스크립트와 테스트의 CI PASS는 이미지-입수/면번호/인쇄글자 검증 완료를 뜻하지 않는다. #17 `METHODOLOGY_CONFLICT`, 다섯 Claim HOLD, 2010 N13 실측 1-vs-0, 강약 `UNCLASSIFIED`, `只要一位` `NOT_ADJUDICATED` 유지.

## 16. 직접 인쇄면 검증 완료 — Harvard 『三命通會』 권五 45면의 `戊己` (2026-10-17)

**이전 §12–15의 '원본 스캔 접근 불가'는 당시 상태의 기록**이며, **본 섹션이 그 후속 검증 결과를 대체**한다. GitHub Actions read-only 워크플로를 통해 Harvard-Yenching 원본 권五 PDF를 다운로드하고 99 PDF 면을 Poppler로 이미지 변환했다. 특히 PDF **1-based 45면 오른쪽 인쇄면**에서 「**時上偏財**」 제목과 문장 `柱中不宜再見戊己若身太旺`의 실물 글자를 고해상도로 직접 읽었다. 끝 글자는 **천간 己**, 지지 巳가 아니다. 이 판독은 **Harvard 소장 補刊本 후보 한 판본에 한정**된다.

**재현 가능한 체인:**

| 식별/검사 | 결과 |
|---|---|
| 원본 소장 | Harvard-Yenching Library, [Harvard_drs_53262215_三命通會_v.5卷之五.pdf](https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf), 卷之五, 99 PDF 이미지면 |
| 파일 다운로드 및 렌더 | [GitHub Actions run #39037912192](https://github.com/gycha0109-beep/Saju/actions/runs/39037912192), SUCCESS; 아티팩트 `12103320492`, `n27-harvard-volume-five-printed-folio-candidates` |
| 원본 PDF SHA-256 | `ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831` |
| 조사한 스캔 | PDF **45면** (1부터 셈), **오른쪽 인쇄면**, 「時上偏財」. 책에 실제 적힌 별도 **folio 번호는 아직 판독하지 못함** |
| PDF 45면 3200px 렌더 SHA-256 | `b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12` |
| 해당 문장 확대 PNG SHA-256 | `fc3063d2608720b13cfca0f7e43e89f3a898aca38d3810de290b835f600e5582` |
| 원본 판독 | `柱中不宜再見戊己` (**己**) |
| 온라인 이문 | 四庫全書本 卷05 위키문헌 `戊巳`, 識典古籍 卷五/일반 위키문헌 卷六 `戊己`; **Harvard 인쇄면이 후자의 표기와 일치** |
| 미검증 범위 | 四庫全書本 *그 판본*의 해당 인쇄면, NLC 별개 刻本, 판본 계통 독립성과 원 판면 교정史, 지장간/다른 주에서의 규칙 적용 |

**증거 판정:** `physicallyInspectedTargetPrintings=1` (Harvard 한 본), `harvardPrintedClauseVerification.status=ONE_PRINTED_WITNESS_DIRECTLY_READ`, `printedDisputedGlyph=己`. 일반적인 `correctOriginalPrintGlyph=UNRESOLVED`은 유지한다. 이는 새 Harvard 원전 이미지 한 건에 대한 실제 문자 대조를 뜻하며, **특정 四庫 소장본의 글자를 읽었거나 위키문헌의 巳를 확정된 오자라고 입증한 것은 아니다.** 서로 다른 두 물리 판본을 직접 대조했다거나 원전의 내용 의미가 승인된 것도 아니다.

2010년 계산 관측 `年干己` / `申藏戊` / `戌藏戊`와 역사적 `柱中不宜再見戊己` 사이에는 적용한 위치·유일성·월령·강약 규칙의 비약 문제가 여전히 남아 있다. `只要一位=NOT_ADJUDICATED`, `強弱=UNCLASSIFIED`, `#17 METHODOLOGY_CONFLICT`, 기존 N13 정확한 겁재 1-vs-0 유지. Bridge #2557 다섯 Claim HOLD, no new semantic admission / Production unchanged.
