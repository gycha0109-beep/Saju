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

## 10. 후속 직접 디지털 전사 대조 — 『三命通會』 卷六의 조건부 比肩·財 및 甲戌時 (추가 Research evidence)

**판본·급수/locator 보정 및 편집 경고:** 「論正財」·「論偏財」·「時上偏財」의 해당 구절은 [일반 『三命通會/卷六』 온라인 전사](https://zh.wikisource.org/zh-hant/三命通會/卷六)에서 직접 확인된다. 이전에 인용한 [『三命通會（四庫全書本）/卷06』](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷06)은 이 세 조항이 현재 그 페이지에서 일치 확인되지 **않으므로**, 해당 구절의 동일 전사·독립 교감 증거로 사용할 수 없다. 두 페이지를 자동으로 같은 卷六 텍스트라 취급했던 기술은 철회한다. 더욱이 동일한 일반 전사 페이지에서 `論正財` 시작 **바로 앞**의 「十干十二年生大貴人例」 말미에 편집 경고 `（以下內容與書不合）`가 노출된다. 따라서 이후 표적 세 장의 표기가 해당 저작/권6의 정본 문장이라는 **bibliographic attribution은 불성립**하며, 해석의 실제 고전 출처로 승격하지 않는다. 현재 인정되는 사실은 '해당 경고 뒤 온라인 페이지에 이 문장들이 존재한다'는 것뿐이다. 일반 전사의 전사 저본·판본·인쇄 판면/folio, 편집 변경이력은 미검증(C: editable transcription; attribution contested). 『欽定古今圖書集成』 등 2차 재수록은 계통 감정 전 독립 증거로 세지 않는다.

- **「論正財」의 양방향 조건:** 전사에는 `財生身旺兩相停，不喜再見比肩`이라는 비견 경계와, 이어 `財多如何不發財，只因身弱少培栽，運到比肩身旺地，富貴榮華次第來`라는 **재다·신약·운행 조건의 상반 방향 사례**가 함께 존재한다. 따라서 `比肩 + 財`의 단순 동시 존재는 언제나 재성에 불리하다는 단일 규칙으로 환원 불가. 후자는 **대운** 서술이므로 두 2010 **원국**의 개인·운세 결론에 전이할 수 없다.
- **「論偏財」의 포함 범위:** `若見刑衝破害，比劫分奪` 및 `最怕劫敗比肩`은 비견·겁재를 재성 맥락의 심사 대상으로 함께 열지만, 재성의 왕쇠·일주 강약·원국 위치·격국 조건을 생략하고 모든 경우에 분재가 확정된다고 허가하지 않는다. 특히 이 문단은 **偏財** 논의이므로 다른 재성 전체로 무조건 일반화할 수 없다.
- **「時上偏財」의 형식상 가까운 사례:** `時上偏財，怕逢兄弟，如甲日見戊辰或甲戌時之例`라는 **甲日+甲戌時** 명시 예시가 2010년 19:30의 **甲申日/甲戌時**와 일부 문자 수준에서 일치한다. 이것은 앞선 卷七의 `甲寅/乙卯月·日主大旺` 조건과 **다른 사례 계열**이다. 그러나 같은 단락은 `柱中不宜再見戊己`, `只要一位，不宜多逢`, 강약·관인·충파 등의 조건을 요구한다. 2010년 19:30은 **연간 己** 및 복수 재성 관측을 가진다. 그러므로 `甲戌` 문자 일치만으로 `時上偏財` 격 또는 비견 견제 의미를 부여할 수 **없다**.
- **적용 결론(서지 HOLD):** 이 경고 뒤의 「論偏財」「論正財」「時上偏財」는 비견·재성 관계를 검토할 **문헌 검색 단서**로만 남으며, 판본 귀속 자체가 미검증이므로 독립적으로 검증된 고전 근거로 **계수하지 않는다**. 기왕의 卷七 조건부 비견 사례와 함께 배제/허가를 유보할 사유일 뿐이며, 동시에 원국/대운·正財/偏財·강약·월령·복수 財 조건 간의 범위 충돌을 입증한다. **현행 겁재 한정 T8은 정확히 그 source-bound Research 실행 규칙으로 유지**한다. 미발행=고전 관계 보편 부재라는 추론, 새 `比肩→財` Rule, 기존 source ID/품질 승격, 소비자 해석 차등은 전부 금지한다.
- **추가 검수 최소 단위:** 일반 『三命通會/卷六』의 `以下內容與書不合` 편집 주석이 적용되는 범위·원인 및 실제 수록 권차의 서지적 재식별, 정확한 底本·revision·scan/folio 확인과 『四庫全書本/卷06』와의 조항 대응/편차 해소; 「時上偏財」의 위치·숨은 戊·`己` 중복·`只要一位` 판정; 卷七 「妻妾引例章」 조건과 분리된 현대 적용 계약; 신강/신약에 관한 독립 governed Claim 유무; 긍정·부정 예외 및 문헌 의존성 genealogy; Bridge #2557의 claim-scoped HOLD 결과 확인.

**#17 주판정은 계속 `METHODOLOGY_CONFLICT`, 19쌍 계수는 3/15/1 유지.** 새 근거는 이전 T8 1-vs-0 재실행 사실을 변경하지 않는다. 서지·의미론 독립 검증/Bridge admission 이전에는 문구 변형이나 추가 엔진 규칙 없이 Research HOLD.
