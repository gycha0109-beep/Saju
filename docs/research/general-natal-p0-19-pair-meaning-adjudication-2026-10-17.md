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

## 17. 권五 원본 3개 소장 계통 인쇄면 대조 (2026-10-17) — 戊己로 일치, Wikisource 전사 불일치

하버드 PDF 45면 인쇄 `柱中不宜再見戊己` 확인 뒤, 이와 별개의 [GitHub Actions #39041195684](https://github.com/gycha0109-beep/Saju/actions/runs/39041195684)에서 Commons에 공개된 CADAL 四庫全書本 권五 DjVu, NLC 刻本 권五 上·下 원본 파일을 **다운로드하고 모든 이미지면을 렌더링**했다. NLC 하권은 구절이 없는 다음 부분까지 읽기 위한 후보이며 이 locus의 독립 문장 증거로 세지 않는다.

| 원본 인쇄 이미지 | 실제 구절 PDF/DjVu 이미지 면(1부터) | 직접 판독된 원문(該所) | 소스 파일 SHA-256 | 인쇄면 렌더 PNG SHA-256 |
|---|---|---|---|---|
| Harvard-Yenching `HARVARD_DRS_53262215_VOL_5` | [PDF 45면](https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf) | `柱中不宜再見戊己` | `ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831` | 고해상도 `b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12` |
| CADAL 四庫全書本 `06056481` | [DjVu 104면](https://commons.wikimedia.org/wiki/File:CADAL06056481_三命通會·卷五.djvu) | `柱中不宜再見戊己` | **원본 DjVu** `4f273322b3fd4339789e1408e0bbb4ea15a7956e5e508c6f99fced264e0b53ee` | `e20a1ce67daac2fc30eb914e8288d85f41cf2ab0ec14ba3156e630c2d5a91ac4` |
| NLC 刻本 `411999029701` 第9冊 五上 | [PDF 43면](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf) | `柱中不宜再見戊己` | `0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1` | `7f9b25f6c420044e5edc3d55f12dbb66b779a552b8181adfbc0deae8dfe5f005` |

**실제 글자 판독 보강:** CADAL DjVu 104면의 `戊` 뒤 글자 형태만 보았을 때 `巳`로 보일 여지가 있어 재검토했다. **같은 CADAL 권五 인쇄본 106면**의 명시적 예시 `甲日見己巳時`에서 **서로 다른 `己`와 `巳`의 인쇄 字形을 현장에서 직접 비교**했다. 이 인쇄본의 `己`는 마지막 가로획이 오른쪽 위로 말리고, `巳`는 오른쪽에서 거의 평평하게 끝난다. 104면 문제 글자는 106면의 `己` 쪽 형태와 일치한다. 106면 PNG SHA256 `b66c1478e4bcc31faae58fc2d3e882a79de64da697c10cc3fb64e2c4b0b6de41`. NLC 43면 인쇄 글자 역시 같은 `己` 형태로 판독했다.

각 원본 **판면을 실제 읽은 수**는 Harvard, CADAL, NLC 각 1건 = **3건**. 확인한 세 인쇄 스캔의 해당 구절은 **`戊己`로 일치**한다. 반면 [維基文庫 『四庫全書本/卷05』 편집 전사](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05)는 `戊巳`로 되어 있으므로, **이 CADAL 인쇄 개체를 기준으로 보았을 때의 전사 오류 가능성이 높다**. 이는 사이트 원문을 임의 수정하거나 모든 사본에 같은 표기가 있음을 증명하는 것은 아니다.

**상태 경계:** 물리 소장/서지 집단 3종류에서 읽었지만 교감학적 판본 계통 genealogy·독립 텍스트 lineage·실제 각 책의 별도 folio 표기는 아직 인증하지 않았다. `crossPrintCollation.status=THREE_PRINTED_SCAN_CLAUSE_READINGS_AGREE`와 동시에 `correctOriginalPrintGlyph=UNRESOLVED`(원저자 원고 정본 불명)을 유지한다. **최종 강약/時上偏財 格/只要一位 적용 결론이나 새 비견-재 관계를 이 증거 하나로 만들지 않는다.** Bridge #2557 다섯 Claim HOLD, N13 정확 겁재 T8 1-vs-0 및 Production 의미 승인 0은 계속 유지.


## 18. 「時上偏財」 원문 구절 → 2010 실제 명식의 항목별 증거행렬 (2026-10-18)

**독립 연구단위:** `src/research/general-natal-p0-n27-hour-wealth-condition-matrix.ts`는 원문을 한 문장짜리 운세 판정으로 환원하지 않고, *계산 사실 / 古文 조건 표지 / 방법론 미승인*을 구별한다. 실제 생산 계산기 `calculateAuthorizedMyeonghwaProductionSnapshot`의 2010-02-03 19:30/05:30/미상시각 명식으로 테스트한다. 정확한 원문 위치는 위 3개 인쇄본의 Harvard PDF 45면 / CADAL 卷五 DjVu 104면 / NLC 卷五上 PDF 43면. 교감 원문을 인용한 온라인 텍스트 [識典古籍 卷五](https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8), [維基文庫 四庫卷五](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05)를 보조 대상으로 사용하되 역사 판본의 독립성은 새로 승인하지 않는다.

| 문구·관련 조건 | 실제 19:30 명식의 구조 사실 | 판정 가능 범위 / 금지할 과잉 |
|---|---|---|
| `甲日見戊辰或甲戌時` | `甲申日/甲戌時` → **甲戌 사례에 글자 그대로 일치** | `MATCHED_LEXICAL_EXAMPLE_ONLY` — 格 성립 아님 |
| `時上偏財别宮忌見` | 년간 `己`, 일지藏 `戊` 등이 다른 기둥에 존재 | **다른 기둥의 위치 관측**까지만. `別宮`이 천간·지장간을 어떻게 포함하는지 미승인 |
| `柱中不宜再見戊己` | 연간 `己`는 甲일간 기준 **正財**, 일지 `申`藏 `戊`는 **偏財**, 시지 `戌`藏 `戊`는 시간측 偏財 | 세 인쇄본의 글자는 `己`이지만 `再見` 규칙이 正財/偏財·透干/藏干 각각을 동일하게 거부하는 실행가능한 predicate는 아직 없음 |
| `只要一位，不宜多逢` | T0 대표 슬롯 복수, 지장간 재성 분포 관측 | **계산상 슬롯수 ≠ 고전의 位 개수**. `UNADJUDICATED` |
| `天元透出為妙，支內所藏次之` | 時干 `甲` ≠ `戊`, 時支 `戌`藏 `戊` | 시지 지장간 관측은 **hour branch hidden**, 시주 천간 투출 아님. 순위/格 판단은 미승인 |
| `柱有官印相助，日主健旺，大怕年月衝破` | 월지 `丑` 등의 T0 사실 | 官印 관계/年月衝破 판정은 방법론 게이트, 원국 旺衰·強弱 `UNCLASSIFIED` |
| `時上偏財怕逢兄弟` | 19:30은 比肩 관측 / 정확 `겁재` 미관측. 05:30은 기존 정확 `겁재` T8 관측 | 古文 `兄弟`로 비견·겁재를 무차별 대치하거나 기존 특정 `겁재` Rule을 확대하면 안 됨 |

이 문구는 일반적인 과학적 미래 예측이나 사용자별 재정 결과 근거가 아니다. 역사 문헌의 방법론 검증에 한정한다. 새 `N27HourWealthConditionMatrix`가 `OTHER_PALACE_EXCLUSION`, `NO_ADDITIONAL_WU_JI`, `ONLY_ONE_POSITION`, `VISIBLE_VS_HIDDEN_PRIORITY`, `STRENGTH_OFFICER_SEAL_AND_BREAK` 등 **7개 source scope**를 분리하여 원본의 조건을 손실 없이 추적한다.

**판정:** 기존 문헌 검증의 *문자 계보 문제*를 분리했고, 즉시 확인할 수 있는 계산상의 hour hidden/visible 및 다른 기둥 `己` 사실을 검증한다. 그러나 **格 판정, 只要一位, 日主旺衰, 官印/衝破, 역사적 兄弟 의미의 Claim 적용**은 여전히 `UNADJUDICATED` 또는 `UNCLASSIFIED`이다. 다른 출처·체계의 가정을 몰래 끼워 넣지 않는다. 연구 Draft/Bridge Draft만 반영하고 5 Claim HOLD, #17 `METHODOLOGY_CONFLICT`, 기존 N13 실제 겁재 T8 1 vs 0, 의미 승인 0을 유지.


## 19. 再見戊己/只要一位 실제 출생시각 반례 (2026-10-18)

2010-02-03 동일한 甲일에 Authorized Canonical Calculation으로 07:30 戊辰時 및 19:30 甲戌時를 각각 생성하고 三命通會 卷五의 원문 사례 甲日見戊辰或甲戌時와 일치하는지 테스트한다. 시천간 戊 투출만을 時上偏財 고전 예시의 필수 전제라고 구현하면 문헌이 직접 나열한 甲戌 예시를 누락하므로 그 단순 규칙은 부적절하다. 두 시각은 같은 날이므로 년·월·일의 구조 데이터가 동일하고 시주의 노출/숨김 채널만 달라진다.

07:30은 甲日 戊辰時로 時干戊 노출 + 辰藏戊, 19:30은 甲日 甲戌時로 時干甲(戊 아님) + 戌藏戊. 다른 기둥의 年干己 正財 및 각 지지 지장간 戊/己 관측은 동일하다. 양 명식 모두 원문의 예시와 글자상 일치하지만 모두 格 성립 판정 미승인이며 운세 예측을 생산하지 않는다.

同卷 論偏財의 偏財好出亦不懼藏은 일반 偏財에서 투출/장간 두 채널을 언급하는 문장일 뿐 時上 편재 전문 규칙의 직접 승인에 해당하지 않는다. 時上偏財의 別無透出方為貴라는 시구와 柱中不宜再見戊己, 支干須要用搜羅를 동시에 고려해야 하므로 別宮/再見의 정확한 counting scope는 UNADJUDICATED다. 同章 比肩刼財還無遇 역시 양 십신을 명시적으로 거론하지만 기존 N13 특정 겁재 Rule을 비견으로 일반화하는 근거는 아니다.

Research condition matrix v2는 printedExampleKind, visible/hidden other-pillar 戊己 건수, source-context citations, 시간별 판독 결과 및 명시적 금지선을 구분한다. 07:30 대 19:30의 실제 계산 pair 회귀 테스트를 추가했고 기타 05:30/시간 미상의 회귀를 유지한다. 모든 결과는 RESEARCH_CONDITION_AUDIT_ONLY, 다섯 Claim HOLD, 只要一位 미판정, chart 강약 미분류, Preview/Official/Production 변경 0건이다.


## 20. 再見戊己의 counting scope 가설별 민감도 분석 (2026-10-18)

**소스 경계:** 실제 권五 인쇄본 3개에서 확인된 `柱中不宜再見戊己`는 **戊·己 두 천간을 모두 언급**한다. 그러나 같은 「時上偏財」의 `別無透出方為貴`, `天元透出為妙支內所藏次之`로부터 **지장간 재출현까지 `再見`의 위반으로 계산하는가**는 출처 검증만으로 결정할 수 없다. [四庫全書본 전사 「時上偏財」](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05) (문자 `戊巳` 이문은 인쇄본과 구별) 및 세 판면의 음영·해시 근거는 §16–19 참조.

**새 코드:** `src/research/general-natal-p0-n27-wu-ji-recurrence-scope-audit.ts`, `test/general-natal-p0-n27-wu-ji-recurrence-scope-audit.test.ts`. 기존 실제 생산 계산기를 연구 호출하여 같은 2010년 2월 3일의 07:30 戊辰時/19:30 甲戌時/05:30 비문면 사례/시간 미상 입력을 비교한다. 각 결과는 `HYPOTHESIS_SENSITIVITY_RESEARCH_ONLY`이며 어느 것도 전통적 규칙의 승인 판단이 아니다.

| **가정으로만 쓰는 counting model** | 무엇을 세는가 | 2010년 다른 기둥에서 보이는 차이 | 문헌 승인 |
|---|---|---|---|
| VISIBLE_WU_ONLY | 다른 기둥 노출 戊만 | 노출 戊=0 → **己를 누락** | 원문에 **己 명시**되어 있어 字面 scope로 부적합 |
| VISIBLE_WU_AND_JI | 다른 기둥 노출 戊/己 | 年干 **己 1건**으로 출현 감지 | 천간만 계산하는 방법론 인증 **없음** |
| VISIBLE_AND_HIDDEN_WU_ONLY | 戊의 투간+藏干 | 日支申藏戊 등 포함, 노출 己 누락 | 원문에 己 포함. 별도 조합 필요 |
| VISIBLE_AND_HIDDEN_WU_AND_JI | 戊/己의 모든 노출·藏干 | 노출 己 + 비시주 戊/己 장간으로 복수 관측 | 장간을 모두 `再見`·`只要一位`의 位로 세는 방법론 인증 **없음** |

**이 분석이 보여주는 것:** 동일한 실제 원국을 두고 채택한 counting scope에 따라 **관측 횟수 자체가 달라진다**. 단, 2010년 명식의 노출된 年干己 존재 자체와 甲日 기준 그 십신이 正財라는 사실은 가설에 무관하다. 07:30·19:30의 다른 기둥 데이터가 같은 것도 회귀 테스트로 고정한다. `只要一位`의 `位`는 위 관측 횟수와 **동치라고 가정할 수 없다**. 時辰 예시에 일치하지 않는 05:30과 시각 미상 입력은 어떤 가설에서도 적격한 출처 사례로 승격하지 않는다.

**남는 실체적 blocker:** (a) `別宮` 및 `再見`의 실제 palace 범위, (b) 透干·藏干·정재 己와 편재 戊의 반복 포함 우선순위, (c) `只要一位`와 古文 `偏正二財` 중복 사례 관계, (d) 독립 권위가 검증된 적용 방법 및 원국 월령/강약 조건. 전 항목 source-qualified `UNADJUDICATED` / `UNCLASSIFIED`. 상용·독자 해석 의미 사용 0, 5 Claim HOLD 유지.


## 21. 再見戊己: 다른 계산 단위와 실제 甲戌時 대조군 (2026-10-18)

**코드:** `src/research/general-natal-p0-n27-wu-ji-recurrence-scope-audit.ts`, version `saju-n27-wu-ji-recurrence-scope-sensitivity-v2`. 기존 4가설을 유지하고 `year/month/day × visible_stem/hidden_stem × 戊/己`를 별개의 원시 관측 위치로 보존한다.

**문헌 층위 분리.** 「時上偏財」는 직접 `柱中不宜再見戊己`, `時上偏財別宮忌見`, `只要一位不宜多逢`, `天元透出為妙支內所藏次之`, `別無透出方為貴`, `時上偏財不用多，支干須要用搜羅`라고 진술한다. 같은 조항의 `透出`/`所藏` 대별, `支干須要用搜羅`는 양 채널을 조사할 이유를 주지만 **藏干의 모든 출현을 再見 위반으로 계산하라는 실행 정의는 아니다**. 同卷 `論偏財`의 `偏財好出亦不懼藏`도 일반 편재의 문맥으로, 時上偏財의 셈법에 자동 적용하지 않는다. `只要一位`의 단위가 한 글자/한 천간/한 기둥/한 편재 위치 중 어느 것인지, `別宮`에 日柱가 포함되는지는 여전히 미증명이다.

**회귀 입력:** 모두 편집 없는 실제 `calculateAuthorizedMyeonghwaProductionSnapshot`으로 생성한다. 아래 노출 기둥은 테스트에 작성한 예상값이므로 정확 SHA의 CI 성공 확인 전까지 관측 완료로 주장하지 않는다.

| 양력 일시 | 검증 목적 | 다른 기둥 천간 예상 | source-qualified verdict |
|---|---|---|---|
| 2010-02-03 19:30 | 正財 己만 투출 | 年干己, 戊 없음 | UNADJUDICATED |
| 2010-02-13 19:30 | 偏財 戊만 투출 | 月干戊, 己 없음 | UNADJUDICATED |
| 2010-05-04 19:30 | 양쪽 투간 0 / 지장간 戊 | 戊·己 모두 노출 0 | UNADJUDICATED |
| 2010-02-04 19:30 | 비甲 일간 negative control | 원문 甲日 사례 적용 불가 | UNADJUDICATED |

**수량의 차이:** ① 글자와 채널별 `occurrenceUnitCount`, ② 다른 기둥 고유 수 `distinctPillarUnitCount`, ③ 戊/己 별개 문자 수 `distinctGlyphUnitCount`, ④ 연·월과 일주를 따로 센 수, ⑤ 같은 기둥에서 투간과 장간이 모두 나타나는 수, ⑥ 재출현 범위에서 제외한 시주 자체의 시천간·시지 藏干. 서로 다른 수치는 고전의 `位`와 동치가 아니다. 같은 기둥의 표면 글자와 숨은 글자를 두 `位`라고 부르는 것은 현재 불허한다.

**배제의 한계:** 戊만 관찰하는 두 가설은 명시된 己를 누락하므로 `戊己`의 완전한 관측 모델로 채택할 수 없다. 하지만 이를 곧바로 己 노출이 格을 파괴한다는 허가된 판정으로 바꿀 수도 없다. 장간 포함/제외, 日柱의 別宮 범위와 歷史的 一位 계산법 모두 UNADJUDICATED. 旺衰/強弱 미분류, 다섯 Claim HOLD, N13 겁재 T8 1 대 0, Consumer/Preview/Official/Production admission 0 변경.

### `21-A. 같은 책에서 찾은 비교 자료: 時上一位貴

[『三命通會』 四庫全書本 卷五 「時上一位貴」 편집 전사](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05)에는 **時上偏官**에 관해 `時上偏官要幹上透出，只一位為妙，年月日重見`라는 문구가 보인다. 「時上偏財」가 `此與時上偏官格相似`라고 연결하므로 이것은 **같은 卷 내부의 유추 근거**이며, 다른 기둥의 범위를 논할 때 **年·月·日 셋이 명시된 유사 용법**이다. 同章 「時上一位貴」의 `時上一位貴藏在支中`도 단일 `位`를 투간 하나만으로 단정하기 어렵게 한다.

**한계:** 두 인용은 時上偏官(七煞)의 기술이다. 時上偏財의 `別宮`/`再見戊己`/`只要一位`가 동일한 計數法을 채택한다는 직접 증거는 아니다. 현재는 **跨條 비교 근거**로만 기록하고 `whetherClassicalBieGongIncludesDayPillar=UNADJUDICATED` 및 모든 권한 HOLD를 유지한다. 새 인용은 온라인 원문 전사에서 확인했으며 해당 위치의 독립 인쇄 판면을 이번 단계에 새로 판독했다고 주장하지 않는다.


## 22. 隱藏/透干·別宮 범위를 독립시킨 방법론 민감도 v3 (2026-10-18)

**검증 대상:** Research v3 `src/research/general-natal-p0-n27-wu-ji-recurrence-scope-audit.ts`. 기존 戊-only / 戊己 × 천간 only / 천간+藏干 **4가지 가설은 제거하지 않는다.** 별도 `palaceAndChannelCounterfactuals`는 **別宮에 日柱 포함 여부 × 隱藏 포함 여부**를 조합해 네 가지 *비권위적 계산 대조*를 추가한다.

실제 2010-02-03 19:30 甲申日·甲戌時 Canonical 데이터에서 年干己(정재), 年支丑藏己, 月支丑藏己, 日支申藏戊가 서로 다른 `observed positions`이다. 원문 時柱의 時支戌藏戊는 '다른 기둥' 중복 수에서 분리한다. 따라서 *원시 위치를 세는 가설*에서 아래와 같은 숫자가 생긴다. **각 칸은 가설 계산 결과이지 格 성립 여부가 아니다.**

| 다른 기둥 범위 / 채널 | raw occurrence | 동일 기둥+동일 글자 중복 채널을 한 번으로 세면 | 다른 기둥 수 |
|---|---:|---:|---:|
| 年月, 투간만 | 1 | 1 | 1 |
| 年月日, 투간만 | 1 | 1 | 1 |
| 年月, 투간+藏干 | 3 | 2 | 2 |
| 年月日, 투간+藏干 | 4 | 3 | 3 |

**주의:** 年干己와 年支丑藏己는 한 기둥에서 **같은 글자**가 투간과 藏干으로 관측된 두 채널이다. 이 둘을 古文 `位` 두 개로 볼 수 없으며, 또 반드시 하나로 세는 것이 옳다고 증명된 것도 아니다. 각 방법을 다른 비교 열로만 기록했다. 같은 2010-02-03 07:30 戊辰時와 19:30 甲戌時는 다른 세 기둥이 같으므로 위 가설 비교표는 동일하지만, 時柱의 戊 노출/藏干 상태는 구분된다. 다른 실제 대조 사례 2010-02-13 19:30(노출 戊), 2010-05-04 19:30(노출 戊己 없는 藏干), 非甲 일간/시각 미상 역시 회귀에 포함한다.

### 새 『三命通會』 同卷 용례: 論正官의 지지 간 중복

同卷 「論正官」의 `支藏干透，餘位不宜再見`와 `甲生丑月，內有辛金，又值酉時`가 지장간 觀測 뒤에 다른 지지 酉를 重犯 사례로 다루며, `若天干復透辛多`를 **추가적인 투간** 상황으로 언급한다. [「論正官」 전사(識典古籍)](https://www.shidianguji.com/zh/book/SK1610/chapter/1mecpymm3qw4r), [다른 전사(國學3000)](https://guoxue3000.com/tw/books/330/chapters/77). 이는 **같은 책에서 `再見`/`重犯`의 논의가 오직 보이는 천간만을 전제하지 않는 사례**라는 *용례상 정황 근거*다.

단, **정관에 대한 설명이 곧 시상편재의 적용 규칙은 아니다.** 「時上一位貴」의 `年月日重見`도 **시상편관의 문장**이므로 시상편재의 `別宮`가 반드시 日柱까지 포함한다는 인쇄 근거 인증으로 사용할 수 없다. 해당 同卷 비교문들은 이번 작업에서 **온라인 전사 확인만** 수행했으며, 새로 물리 이미지/판면 판독·독립 판본 검증을 했다고 주장하지 않는다.

**최종 범위 제한:** 실제 명식 관측의 '위치 수 / (pillar,glyph) 쌍 / 기둥 수' 셋 모두 클래식 `位`에 해당한다고 인증할 근거가 없다. `UNADJUDICATED`, `UNCLASSIFIED`, 다섯 Claim HOLD, 정확한 겁재 T8 1:0, Preview/Official/Production 의미 승인 없음. v3 추가 회귀의 최신 정확 SHA CI 결과는 별도 확인 후 판정한다.


## 23. 同卷 「論正官」의 실제 인쇄 스캔 직접 대조 — 2종 인쇄 이미지 (2026-10-18)

**증거 채널 격상:** `22에서 「論正官」 해당 문장의 근거를 **온라인 전사만 대조**했다고 기록했던 것은 *당시 상태*다. 이번에는 **이미 저장되어 있던 GitHub Actions의 원본 PDF 렌더 아티팩트 2개를 다운로드·해제하여, 850~900px 렌더 원 이미지에서 직접 문맥과 자형을 읽었다.** 원래 PDF를 새로 내려받거나 기존 책의 서지 체계를 새로 인증한 것이라고 주장하지 않는다. 기존 아티팩트 생성 당시 원본 다운로드 성공, 렌더 및 원본 SHA는 `16~18의 이력과 함께 추적된다.

| 직접 판독한 인쇄 스캔 | 원본 PDF SHA-256 | 해당 PDF 면(1부터) | 이미지 렌더 SHA-256 | 재사용한 Actions 실행 / 아티팩트 |
|---|---|---|---|---|
| Harvard-Yenching 補刊本 `HARVARD_DRS_53262215_VOL_5` | `ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831` | **6**, **7** | 6면 `e17407b04cd2a11e402fb2105defa44e912d88e728c75496f5ac2ea8d31e9292`, 7면 `9c7a13cbd444e49487de86747b59fa52bd84ef6b16ecc60b20ffc1a3cb9a42bc` | [#39037912192](https://github.com/gycha0109-beep/Saju/actions/runs/39037912192), artifact `12103320492` |
| NLC 刻本 `NLC_411999029701_VOL_5_UPPER` | `0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1` | **5**, **6** | 5면 `4c7e7a191389421f46fef36af412277fd2e8fd6c3bdb9d2a221b8cf3efa7bfb2`, 6면 `9ec272128d7e3e313b7ce9b190cfb8ba75e997bf51c7b09912b97aeaea51fb93` | [#39041195684](https://github.com/gycha0109-beep/Saju/actions/runs/39041195684), artifact `12103659191` |

**인쇄면에서 실제 확인한 한정 문구:**

1. 「論正官」의 `正官者乃甲見辛`와 `止許一位多則不宜`; 같은 조항에서 `支藏干透餘位不宜再見`(Harvard **6면**, NLC **5면**).
2. 이어진 사례 `甲生丑月內有辛金又值酉時`, `若天干復透辛多`(Harvard **7면**, NLC **6면**). **丑 내 辛**과 별도 **酉時**가 중복 사례가 된 뒤 **天干에 辛이 다시 투출**하는 추가 조건을 기술한다. 두 판면에서 문장 순서를 확인했다. `酉時` 뒤의 '...是重犯' 직전 글자는 작은 스캔/판식의 `已·己·巳` 혼동을 일으키므로 **이번 조사에서 확정 이문으로 취급하지 않고**, 논증에 필요 없는 해당 한 글자를 생략하여 인용한다.
3. 대조되는 「時上偏財」 원문은 `此與時上偏官格相似`, `只要一位不宜多逢`, `柱中不宜再見戊己`, `時上偏財別宮忌見`이다. **직접 유사하다고 언급하는 것은 時上偏官이지 正官이 아니다.** 서로 다른 正官 구절이 日柱 범위나 藏干 셈법을 時上偏財에도 승인했다는 명시 문장은 확인하지 않았다.

**판정:** `zhengGuanPrintCrosscheck.status=TWO_PRINT_SCAN_WITNESSES_PASSAGE_DIRECTLY_READ`. 이전의 `DIGITAL_TRANSCRIPTION_ONLY` 참고자료가 물리 이미지 2건으로 **해당 正官 용례에 한해서** 보강되었다. 하지만 하버드/국가도서관 각본의 **텍스트 계통적 독립성은 인증하지 않았다**. `時上偏財`에 대한 `別宮`의 日柱 포함, `再見`의 지장간 포함, `一位`의 단위 문제는 모두 여전히 **UNADJUDICATED**이며, 정관→시상편재의 규칙 이전도 **금지**. 모델 v4는 출처 추적·검증 강화만 하며 발생 횟수 모델, 실제 Canonical 계산, 다섯 Claim HOLD, N17 METHODOLOGY_CONFLICT, N13 정확 겁재 T8 1 대 0, Preview/Official/Production 차단을 변경하지 않는다.


## 24. Harvard 補刊本 ↔ NLC 萬曆刻本 서지·본문 계통 분리 (2026-10-18, N27 v5)

**판정의 단위를 분리한다.** 전차 `23에서는 Harvard PDF 6–7면과 NLC PDF 5–6면의 「論正官」 동일 본문을 실제 인쇄 스캔으로 읽었다. 이것이 입증하는 것은 **서로 다른 소장처에 있는 별도의 물리적 인쇄 자료 두 건이 해당 구절을 지닌다**는 사실이다. 이번에는 서지의 행격(行格)과 판본 연대 표기를 추가 대조했지만 **전승 계보의 독립성**까지 입증한 것이 아니다.

| 서지 축 | Harvard-Yenching `drs:53262215`, 卷五 | 中國國家圖書館 `411999029701`, 第9冊 卷五上 |
|---|---|---|
| 원 서지 참조 | [Harvard-Yenching 원본의 Commons 서지](https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf) · [Harvard 도서관 링크](https://id.lib.harvard.edu/alma/990079334100203941/catalog) | [NLC 원본의 Commons 서지](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf) |
| 소장 / 디지털화 | Harvard-Yenching Library, drs 53262215 | National Library of China, 原件 17605 / 中華古籍資源庫 |
| 자료가 제시한 형식 | `補刋本`, **十行二〇字** | `刻本`, **10行22字, 白口, 四周雙邊** |
| 연대 표기 | **清雍正13年? (1735?)**, 서문에 근거한 추정 연대; 물음표 제거 금지 | **明萬曆[1573–1620]** 범위. 이 개체의 정확한 1578년 인쇄라고 인증하지 않음 |
| 이번 사례 인쇄 스캔 | PDF 6–7면; 3구절 확인, `23의 각 PNG 해시 | PDF 5–6면; 3구절 확인, `23의 각 PNG 해시 |

**근거 구분:** 두 소장처의 파일 SHA가 다르고 매 행 글자 수 **20 대 22**인 서지 기록으로 **같은 물리적 인쇄 블록/동일 촬영 PDF를 두 번 인용한 사례가 아니라 서로 다른 인쇄 편성이라는 강한 근거**를 얻었다. 그러나 이 사실을 **서로 독립적으로 전해진 문장 두 표**로 세면 안 된다. 1735? 補刊本이 더 이른 萬曆版의 문장을 참고·복각·전사했는지, 어느 계열의 다른 판을 중간에 거쳤는지, 공통 오각(誤刻)이나 개각 흔적이 있는지 확인하지 않았다.

**별개 명판 후보를 혼동하지 말 것:** [대만 國家圖書館 고적목록의 明萬曆六年(1578)刊本](https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=a8776bf009664f7a8de67d697186e322fDcyODE20.HwkhFZvyoK_b_gt8uDb5Xa7Nh9LYxzj5HEj4uWEtX6g_&page=2)은 **다른 소장처·다른 목록 개체**다. 그 목록의 `1578`과 10행22자 제원을 중국 NLC 제9冊의 **확정 인쇄 연대**로 빌려 쓸 수 없다. [中文古籍聯合目錄의 普林斯頓 소장 雍正十三年 蔣氏修補金陵李氏刊本](https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=2c9735937bff4bbba1095711109793f2fDEyNDM3OQ2.3YmwactxuROfMn60_6V8G0sYql1LtZILVpJsbSmsxyc_&page=)도 **Harvard의 판각 계통을 인증하는 동일 소장본이 아니다**. 공통 연대·서명만으로 직접 모본 관계를 확정하지 않는다.

**증거 단계(혼동 금지):**
1. 서로 다른 **소장/원본 PDF/촬영 자료**: 확인.
2. 서지상 **판각 행격(10×20 대 10×22)**과 雍正補刊 vs 萬曆刻본 시대 표기의 차이: 확인(하버드 서지의 연대 불확실성 포함).
3. 「論正官」 해당 locus **인쇄 자구의 일치**: `23에서 직접 읽음.
4. **동일 저본에 기대지 않은 계통적 독립성**, 1735?본의 모본, 상호 이문 계열 / 『四庫』와의 선후 및 공통 오류: **미검증**.
5. **時上偏財** `別宮` 범위 / `再見` 藏干 범위 / `只要一位` 셈 단위, 특히 日柱 산입: **UNADJUDICATED**.

이를 `sameVolumeZhengGuanPrintCrosscheck.bibliographicWitnessRelation`에 사실·서지 설명·추정 불가 사항으로 추가하고 회귀 테스트로 고정한다. v5의 변화는 **출처별 서지 판단 경계**뿐으로, 실제 Canonical 계산, 4+4 가설, 기존 다섯 Claim HOLD, N17 `METHODOLOGY_CONFLICT`, N13 정확 겁재 T8 **1 vs 0**, 모든 Preview/Official/Production 입장은 불변이다. **v5 최신 SHA CI는 별도 확인**해야 한다.


## 25. 하버드 권1 보각 서문 및 1578 明萬曆본 卷五 직접 대조 (2026-10-18, N27 v6)

이 절은 이전 `24의 미검증 내용을 **새 직접 이미지 판독으로 부분 정정**한다. 새로운 교감 결과와 여전히 미검증인 판본 계통을 엄격히 분리한다.

### A. Harvard-Yenching drs:53262215 卷一 인쇄 서문 직접 판독

[하버드 동일 drs의 권1 원본](https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.1序、卷之一、總目.pdf), [실제 원본 다운로드·인쇄면 렌더 GitHub Actions 39110932522](https://github.com/gycha0109-beep/Saju/actions/runs/39110932522), 이미지 artifact **12130326830**. 원본 PDF SHA256: `af48a02807222915574a7b03f2bcda1dea2810f69fe7112ee8c40967bc8de2d5`.

- **PDF 2면**: `補刻三命通會敘` 제목 직접 판독; PNG SHA `0fa370c44688714df45fabfa54c89f92adbb6bac2765517a9cada457c77884ab`.
- **PDF 4면**: `知雕板尚藏滄州李氏家，顧已殘失百十篇` 및 `遂求其遺帙校正，付剞劂補全之` 내용 직접 판독; PNG SHA `1688ee1e45b94b9afbeb91d35dfe39416c53768e7ed9a3606e2b7a517751f17b`.
- **PDF 6면**: 서문 말미 `雍正乙卯花朝`와 `蔣國祥` 명시 직접 판독; PNG SHA `b673ab1811624b18b1ce0d8ac61f4a8b5facf2ab720871bc8dc3c9bc5ecfbae5`.

이는 다른 온라인 판본에서 추정한 서문이 아니라 **하버드 권五 원본과 같은 drs:53262215의 권一 실물 스캔**에서 읽은 것이다. 기존 목판의 보관·결락·교정·보각 과정이 이 소장본 서문에서 직접 확인된다. 그러나 서문 연대가 **각 권의 실제 인쇄 일자**임을 확정하거나 滄州 李氏 목판과 현재 대만 1578년본의 정확한 모본 관계를 확정하지 않는다.

### B. 대만 國家圖書館 06589 — 明萬曆六年(1578) 인쇄 卷五

[공식 서지](https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=69577a07b3444caf9b20e35e84a103e0fDcyODE10.578_oDtdzxby6wX5_W8cCvt1j5rqk4Hzy3GeKFoIIHA_&page=2&sourceWhereString=&whereString=IChEYXRlX0NyZWF0ZWQgbGlrZSAnJTE1NzglJyBvciBEb2N1bWVudF9ZZWFyIGxpa2UgJyUxNTc4JScgKSA1.IuMldaBSQarjxhBn_BeTs0yAImbyvOSAYg5y7FFSAGw_)에 明萬曆戊寅(六年,1578)刊本, 10行22字, 版心 三命會通으로 기록. [Commons 직접 공개 스캔](https://commons.wikimedia.org/wiki/File:NCL-06589_1_三命通會.pdf) 1,000면을 확인. [원본 판독 이미지 추출 run 39110932522](https://github.com/gycha0109-beep/Saju/actions/runs/39110932522) artifact **12130845583**, [전체 원본 PDF 보관 run 39111407535](https://github.com/gycha0109-beep/Saju/actions/runs/39111407535) artifact **12130192745**. 원본 SHA256 **`3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd`**.

- **PDF 337면**: `三命通會卷之五` 및 `論古人立印食官財名義` 시작 직접 확인.
- **PDF 340면**: `論正官` 조항, PNG SHA `eb1b041c5dadb699e3ec7baa3728594263eee6502b485af544ffedec03ead219`.
- **PDF 341면**: `甲生丑月內有辛金又值酉時` 용례, PNG SHA `7259ed422d7fef314e3703631a09c8e3f3c19657f74f57cc79b2ac4d3f2923fd`.
- **PDF 375면**: `時上偏財` 조항 제목 직접 확인, PNG SHA `6807b6ab78cc0d2cd4bbe12d9b059dac977296134976be402ea53f6d54472afe`.
- **PDF 376면**: `如甲日見戊辰或甲戌時之例` 및 `柱中不宜再見戊己`를 직접 읽음. 問題 글자는 **戊己**의 天干 **己**(지지 巳가 아님). 인쇄 전체 PNG SHA `f43b34d006ba75a50179fc04bdcd377301bc9b25caf7cc4adc0146c8a82121e8`, 확대 판독 크롭 SHA `782d797bb8424eeb32df77b0b517897c38dbe58ff6a5f1120329cec15d74f45f`.

**확정 가능한 한계:** 원본 이미지에서 읽은 Harvard 1735? 보각본, CADAL 四庫, 中國 NLC 萬曆 범위 각본, **대만 1578 刊本** 총 네 소장 스캔에서 해당 문장 `戊己`의 字形이 일치한다. 하지만 이를 **4개의 본문 계통 독립 투표**로 세지 않는다. 특히 1578 대만본과 중국 NLC 萬曆본은 행격이 10行22字인 서지상 유사 계열이므로 판목·版心·刻工·공통 오류 대조 없이 서로 독립이라고 단정할 수 없다. Harvard 권1 보각 서문도 바로 그 1578 대만 인쇄판을 모본으로 썼다는 증거는 아니다.

**권위 경계 불변:** `再見戊己`의 정확한 문자는 강화되었지만 `再見`에 藏干 포함 여부, `別宮` 日柱 포함 여부, `一位`의 古文 counting unit은 모두 `UNADJUDICATED`. 「論正官」의 반복 계산을 「時上偏財」에 직접 이전하지 않는다. 새 consumer/Preview/Official/Production 승인 없음, 다섯 Claim HOLD, N17 `METHODOLOGY_CONFLICT`, N13 정확 劫財 T8 **1 vs 0** 유지. v6의 전체 CI는 최신 정확 SHA에서 별도 확인해야 한다.


## 26. 卷五 「時上偏財」 동일 locus의 1578 萬曆본 ↔ Harvard 補刊본 면 단위 대조 (2026-10-18, N27 v7)

**이번 대조는 새 원본 수집이 아니라 v6에서 확보·인증한 원본 PDF 렌더의 면별 병렬 재판독**이다. [대만 國家圖書館 06589 官方 목록](https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=69577a07b3444caf9b20e35e84a103e0fDcyODE10.578_oDtdzxby6wX5_W8cCvt1j5rqk4Hzy3GeKFoIIHA_&page=2&sourceWhereString=&whereString=IChEYXRlX0NyZWF0ZWQgbGlrZSAnJTE1NzglJyBvciBEb2N1bWVudF9ZZWFyIGxpa2UgJyUxNTc4JScgKSA1.IuMldaBSQarjxhBn_BeTs0yAImbyvOSAYg5y7FFSAGw_)은 1578 刊本의 **10行22字 / 雙欄 / 版心白口單魚尾 / 版心上方「三命會通」 / 하단 刻工명**을 기록한다. [Harvard-Yenching drs:53262215 卷五](https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf)는 **10行20字**의 補刊본(1735? 추정)으로 서지된다. 이 정보의 확실성은 원문 격국 판정과 구분한다.

**동일 문장 검증에 실제 사용한 이미지 식별자:**
- Harvard PDF **45면**, high-resolution original raster SHA256 `b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12`. 원본 PDF SHA256 `ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831`.
- 台灣 1578 PDF **375·376면**: 연구 v6의 원본 해시 `3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd`, 기존 375면 raster `6807b6ab78cc0d2cd4bbe12d9b059dac977296134976be402ea53f6d54472afe` / 376면 raster `f43b34d006ba75a50179fc04bdcd377301bc9b25caf7cc4adc0146c8a82121e8`.

| 원문 표본 구절 (印文字形; 현대 구두점은 비교 밖) | Harvard PDF | 대만 萬曆본 PDF | 해당 범위의 판정 |
|---|---:|---:|---|
| `時上偏財別宮忌見` | 45면 | 375면 | 표본 글자 일치 |
| `柱中不宜再見戊己` | 45면 | 376면 | 표본 글자 일치, **戊己** 유지 |
| `只要一位不宜多逢` | 45면 | 376면 | 표본 글자 일치 |
| `天元透出為妙支內所藏次之` | 45면 | 376면 | 표본 글자 일치 |
| `時上偏財不用多` | 45면 | 376면 | 표본 글자 일치 |

**판식 및 版心의 증거 한계:**
1. 비교 locus의 **행당 20자(하버드) vs 22자(1578)** 편성은 일치하지 않는다. 같은 **글자 배열을 가진 동일 판목의 직접 인쇄**라는 주장과 양립하지 않지만, 한 판본이 다른 판본의 **텍스트를 전사**했거나 공통 조상을 가졌을 가능성을 배제하지 못한다.
2. 대만본의 版心 상단「三命會通」, 白口·單魚尾, 刻工명 등은 **공식 서지 전체에 대한 기술**이다. 해당 **PDF 375–376면의 각공 실명은 이 촬영/렌더에서 판독하여 특정하지 못했으므로** 공식 목록의 刻工 명단에서 임의로 한 명을 배당하지 않는다. Harvard 같은 면의 刻工 실명도 확인하지 못했다.
3. 현재 선택된 이미지의 말단 글자 흐림·접힘을 가지고 **특정 면이 결락·재각·보각되었다고 진술할 수 없다**. Harvard 권1 `補刻三命通會敘`는 보수의 **역사적 배경**이지 제5권의 이 면들이 교체됐다는 증거가 아니다.
4. 다섯 구절 모두 **지정된 표본 위치의 글자만** 대조했다. `整篇全文逐字` 또는 `全卷無異文` 검증이 아니며, 표본 내 실질적인 이문이 관측되지 않았다는 사실만 말할 수 있다. 漢字 이체·누락, 판심 版刻, 복수 葉의 별도 대조가 끝나지 않았으므로 **본문 전승 독립성은 미인증**이다.

**판정 범주:** `hourWealthLocalLeafCollation.auditStatus=SAMPLED_PHRASE_AGREEMENT_ONLY`; `localSampleShowsSubstantiveVariant=false`은 검증한 표본에서 발견하지 못했다는 뜻이지 이문 부재의 보편 증명은 아니다. `matchingPhysicalSettingFromSameCarvedWoodblockSupported=false`, `independentTextualWitnesses=UNADJUDICATED`. 실제 명식 계산과 N27 4+4 가설, 다섯 Claim **HOLD**, N17 `METHODOLOGY_CONFLICT`, N13 劫財 T8 **1 vs 0**, Preview/Official/Production admission 없음 모두 불변. **v7 정확 HEAD CI는 별도 확인**한다.


## 27. 대만 06590 공개 원본 접근 실패와 중국 NLC ↔ 대만 06589 국소 판면 정렬 검토 (2026-10-18, N27 v8)

**목표:** 앞서 `26에서 확인한 Harvard(10×20) ↔ 대만 06589(10×22) 비교와 구별하여, 대만 동시기 별도 소장번호 **06590**을 새로운 실물 대조 자료로 삼을 수 있는지 확인하고, 이미 이미지가 확보된 **중국 NLC 卷五上 PDF 43면** ↔ **대만 06589 PDF 376면**을 시상편재의 *같은 위치*에서 재대조하였다.

### A. 06590은 실제 별도 서지 레코드이지만 원본 이미지는 미확보

[대만 國家圖書館 06590 공식 상세 기록](https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=a8776bf009664f7a8de67d697186e322fDcyODE20.HwkhFZvyoK_b_gt8uDb5Xa7Nh9LYxzj5HEj4uWEtX6g_&page=2) 및 [학술 디지털 아카이브 독립 메타데이터](https://catalog.digitalarchives.tw/item/00/19/3c/14.html)를 확인했다. 서명 三命通會/三命會通, **書號 06590**, **萬曆六年(1578)刊本**, **十二冊**, 10行22字, 白口單魚尾, 版心上方 三命會通, 刻工 이름 목록을 명시한다. 기존 직접 판독된 06589는 **서로 다른 書號의 별도 목록 개체**이며 서지의 版式과 출판 연도는 동일하게 기술되어 있다.

**접근 근거와 차단:** 06589의 공식 상세 페이지에는 `進入影像瀏覽`이 표시되고 [Wikimedia의 06589 PDF](https://commons.wikimedia.org/wiki/File:NCL-06589_1_三命通會.pdf)를 이미 직접 읽었다. 그러나 이번 06590 공개 상세 페이지에는 동일 이미지 버튼 대신 `到館調閱古籍`와 `申請數位授權` 링크가 표시되며, 탐색한 공개 검색 결과에서도 **06590의 원본 PDF·해당 면을 확인하지 못했다**. 따라서 이는 단순 **서지 후보**이며 본 조사에서 **06590의 이미지·PDF 면 번호·刻工·목판 결손 획·戊己 자형을 직접 읽지 않았다**. 이미 인쇄면을 읽은 네 소장 스캔 수에 **06590을 새 1건으로 추가하지 않는다**. 정식 열람/디지털 권한 확인 전까지 별도 판독·증거 강도 상향은 금지한다. 별개 06590 서지 ID가 독립 인쇄 계열을 증명하지도 않는다.

### B. 기존 원본 중 「時上偏財」 NLC 43면 ↔ 대만 06589 376면

기존 두 원본의 같은 항목 시작부분(`如甲日見戊辰或甲戌時之例` 포함)을 병렬 표시·판독하였다.
- [중국 NLC 刻本](https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf) **PDF 43면**, 原 PDF SHA256 `0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1`.
- [대만 06589 萬曆1578 刊本](https://commons.wikimedia.org/wiki/File:NCL-06589_1_三命通會.pdf) **PDF 376면**, 原 PDF SHA256 `3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd`.

두 판면 모두 10行22字의 서지 편성에 부합하고, 지정한 시상편재 문장의 **열 시작·연속 문장 배열이 육안으로 매우 유사하다**. 대만 촬영은 여러 원문 글자 옆에 圈點 표시가 추가로 보이고 두 디지털 이미지의 색감·확대 비율도 달라, **圈點을 고유 본문 이문이나 동일 인쇄 블록의 결손 증거로 분류하지 않는다**.

특히 本문자 획의 **동일한 결손 패턴(同版의 positive micro-defect)**, 같은 葉에 실재하는 刻工 이름, 동일 版心 실물 세부, 판목 치수·판각 흔적의 직접 일치, 기존 블록의 손상/복각 여부는 **확인하지 못했다**. 따라서 `printComparison.status=SIDE_BY_SIDE_COLUMN_ALIGNMENT_OBSERVED_NO_WOODBLOCK_VERDICT`이며 **동일 판목으로 확정할 수 없음**. 동일한 문장 배열은 공통 판식 관례나 이전 텍스트 복제만으로도 생길 수 있다. 원본 간 전승 계보, 06589↔06590 관계 모두 `UNADJUDICATED`다.

**재현과 증거 강도의 한계:** 관찰은 원본 PDF의 이미지와 보조 대조 컷의 육안 판독이며, 픽셀 특징점 매칭/이미지 중첩 정량 분석이나 현장 서지학적 조사 결과로 위장하지 않는다. 06590 원본 이미지 확보 여부가 다음 외부 의존성이다. 이번 v8 코드는 **서지 확인·열람 미확보·동일 판목 미증명**을 각각 다른 필드와 테스트로 고정했을 뿐이다.

**권한 상태 불변:** `別宮` 日柱 포함, `再見` 藏干 포함, `一位`의 역사적 位 계산 단위 = `UNADJUDICATED`. 다섯 Claim HOLD, N17 `METHODOLOGY_CONFLICT`, N13 정확 겁재 T8 **1 vs 0**, 신규 Claim/Preview/Official/Production/TrustGrant 승인 없음. 두 PR Draft/미병합; v8 최신 정확 SHA CI를 확인해야 한다.


## 28. 공개 인쇄본의 SIFT/RANSAC 판면 정합 — 국소 동일 판각 가설의 정량 증거 (2026-10-18, N27 v9)

**기관 연락·허가 신청 없이 공개 원본으로 완료.** `06590` 획득은 이번 연구의 전제 조건이 아니다. 초기 v8 `27 말미의 `06590 이미지 확보가 다음 외부 의존성`이라는 표현은 **Issue #2557의 무문의·공개자료 우선 지침으로 대체**한다. v9에서는 오직 직접 확보한 國圖 1578 `06589`와 中國 NLC 실물 스캔에 국한한다.

### A. 입력과 비교 판면 (PDF ordinal)

| 역할 | 이미지 | 출처 파일 SHA256 | 실제 비교 면 |
|---|---|---|---|
| 기준 A | 중국 NLC 第9冊 卷五上 PDF 43면 | `0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1` | 원본 렌더 850×726 px; [426,155,806,689] (x1,y1,x2,y2) |
| 대상 B | 台灣 國家圖書館 `06589` 明萬曆1578 PDF 376면 | `3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd` | 원본 고해상 재렌더 2600×1850 px; [1083,356,2015,1665] |
| 음성 대조군 C1 | 같은 NLC PDF 42면 | 위 NLC 동일 PDF | A와 동일 좌표의 오른쪽 원문면 (실제 내용 다름) |
| 음성 대조군 C2 | 같은 NLC PDF 44면 | 위 NLC 동일 PDF | A와 동일 좌표의 오른쪽 원문면 (실제 내용 다름) |
| 다른 판식 대조 C3 | Harvard 권5 PDF 45면 | `ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831` | [456,102,861,744] (10행20자) |

중국 NLC 43면 렌더 PNG SHA `7f9b25f6c420044e5edc3d55f12dbb66b779a552b8181adfbc0deae8dfe5f005`, 대만 376면 재렌더 PNG SHA `163ea1e3eebcd719b397672e99ff2112f3c47927f2452d2f1e87d63f06abe7cf`. **입력 소장본·원본 PDF와 재렌더 PNG의 해시를 혼동하지 않는다.** 촬영 화면 크기, 색감과 해상도는 다르며 대만 이미지에는 붉은 朱筆圈點과 스캔 장비 흔적이 존재한다.

### B. 동일 실행 조건의 특징점 정합·음성 대조

OpenCV SIFT: `nfeatures=8500`, `contrastThreshold=0.012`, `edgeThreshold=15`; BFMatcher L2 `knnMatch(k=2)`, Lowe ratio **0.74 미만**, `findHomography` RANSAC reprojection threshold **3.5 px** (대상 고해상 B 픽셀 기준). 하드코딩된 ROI를 쓰므로 관찰 결과는 이미지 출처와 해당 렌더에만 유효하다.

| 비교 | ratio accepted | RANSAC 기하학적 inlier | inlier 비율 |
|---|---:|---:|---:|
| **A↔B: 중국 43면 vs 대만 376면** | **406** | **245** | **60.34%** |
| A↔C1: NLC 42면 | 57 | 8 | 14.04% |
| A↔C2: NLC 44면 | 86 | 8 | 9.30% |
| A↔C3: Harvard 45면 | 22 | 5 | 22.73% |

A↔B의 **고해상 B에서의 inlier 재투영 오차 중간값 1.925 px**, 기준 A 좌표계에서 대응점 범위 x=18.0–364.8 / y=7.5–508.0으로 국소 한 글자에만 몰린 결과가 아니다. 패턴은 같은 텍스트 행 배열 수준을 넘어 여러 字劃이 공간적으로 강하게 유사함을 제시한다. 반면 음성 대조군 세 면은 동일 절차에서 inlier가 5–8개에 그쳤다. 해당 대조군의 적은 inlier는 **같은 판목인지 아닌지에 대한 통계적 귀무분포 전체의 추정이 아니다.**

### C. 가능한 해석과 금지해야 하는 판정

- **지지:** 두 소장 이미지가 **같은 인쇄면/동일 목판 설정에서 유래했을 가능성**은 이전의 육안 열 배열 비교보다 훨씬 강한 검증 대상이다. 이미지로 확인한 칼획 형상의 기하학적 대응이 존재한다.
- **불충분:** 디지털 스캔 재사용/관련 이미지 파생 여부를 서지 및 영상 수집 경로만으로 완전히 배제하지 않았고, 목판 고유의 **동일한 미세 획 결손·갈라짐·오각(誤刻)의 쌍방 독립 판독**은 완료하지 않았다. SIFT 특징점 245개 자체는 독립된 245개의 결손 증거가 아니다. 두 판본이 서로 글씨를 따라 다시 판각했거나 동일한 인쇄 판면을 전사했을 가능성도 구별할 수 없다. **물리적으로 동일한 목판 사용, 판목 계통, 본문 전승 독립은 모두 UNADJUDICATED**다.
- **규칙 차단:** 아울러 중국 NLC와 대만 06589의 일치는 서로 독립된 고전 문헌 2표가 아니다. 06590의 페이지나 이미지에 대해 판독을 주장하거나 인쇄 증거 건수를 추가하지 않는다. `別宮/再見/一位`의 명식 계산 단위 미판정, 다섯 Claim HOLD, N17 `METHODOLOGY_CONFLICT`, N13 정확 劫財 T8 **1 vs 0**, Preview/Official/Production/TrustGrant 차단 유지.

**재현성 한계:** 측정은 운영 엔진의 계산 규칙이 아니라 연구용 공개 이미지 기반 일회성 실행이다. 다른 스캔·크롭·OpenCV 버전이나 RANSAC randomness에 따라 수치 변동이 가능하다. 해당 가설을 증명하려면 **양쪽 원본의 같은 글자에서 구체적이고 재현 가능한 손상 마커** 또는 동일한 인쇄면 재사용을 독립적으로 확인해야 한다. 공개자료만을 이용하는 후속 검증으로 한정한다. v9 최신 정확 HEAD CI는 별도로 확인한다.


## 29. 동일 판목 positive microdamage 증거의 9구역 직접 점검 및 분할 정합 검증 (2026-10-18, N27 v10)

**원본 추가 취득, 기관 문의, 메일 없음.** `28의 중국 NLC 第9冊 卷五上 PDF 43면 ↔ 대만 1578年 國圖 06589 PDF 376면 고정된 **원본 파일·스캔 이미지·ROI**를 다시 사용했다. HTML 전사·비전 AI 문자 자동 분류·다른 서지 메타데이터로 실제 획 결손을 대신 판정하지 않았다. 공개 스캔에 근거한 **명시적인 고유 획 결손 positive marker는 이번 재검에서도 확보하지 못했다.** `245 SIFT inliers`를 하나라도 구체적 목판 갈라짐/결손 사례로 변환해 인용해서는 안 된다.

### A. 양쪽 원본의 해상도 제약과 실제 확대 대조

- 중국 NLC 원본 PDF 43면의 렌더는 **850×726 px**, 실제 우측 본문 ROI **380×534 px**. PNG SHA256 `7f9b25f6c420044e5edc3d55f12dbb66b779a552b8181adfbc0deae8dfe5f005`.
- 대만 06589 PDF 376면의 재렌더는 **2600×1850 px**, 해당 ROI **932×1309 px**. PNG SHA256 `163ea1e3eebcd719b397672e99ff2112f3c47927f2452d2f1e87d63f06abe7cf`.
- v9의 RANSAC 변환을 적용해 **왼쪽 NLC/가운데 대만/오른쪽 잉크 차분**으로 상·중·하 연속 띠 네 구역 및 **3×3 총 9쌍의 원문 상응 창**을 직접 비교했다. 한쪽은 농담이 짙고 다른 쪽은 먹이 옅고 圈點이 추가돼 있다. 3×3 창들의 가시적인 **자의 윤곽 일치가 고유 판각 손상 일치임을 인증할 수 없다**. 저해상 NLC에서는 몇 화소의 결손/먹 번짐을 종이 오염·스캔 보간과 분리하기 어렵다.
- 자동 픽셀 차분 이미지의 색상 차이는 붓획의 고유 결락 증거가 아니다. 現物 刻工 이름, 특정 글자 양측의 동일 磨滅·欠筆·裂痕·誤刻 지점을 **인증하지 못했다**.

### B. 정합 245개 특징점의 분포와 지역 홀드아웃

기존 OpenCV SIFT + BF KNN Lowe 0.74 + RANSAC 3.5px, 고정 난수 시드 4242로 다시 계산했다. 글로벌 후보 **406개**, 글로벌 inlier **245개**는 변하지 않았다. 그러나 단일 글로벌 변환의 점 집합이 네 모서리까지 **일관된 강체 판목 증거**인지 따로 검증할 필요가 있다.

| 영역 구획 (중국 우측 본문 ROI 기준) | 1구획 | 2구획 | 3구획 | 4구획 |
|---|---:|---:|---:|---:|
| 상→하 **Y 사분위** inliers | 68 | 26 | 95 | 56 |
| 좌→우 **X 사분위** inliers | 14 | 45 | 82 | 104 |

이는 대응점이 **전 영역에 분산**돼 있다는 사실은 지지하나 이미지 전체가 단일 무변형 판목임을 증명하지 않는다. 특히 반쪽만으로 새 H를 학습하고 다른 반쪽의 후보 대응점에 적용한 결과는 다음과 같이 불안정했다.

| 새 H 학습 영역 → 홀드아웃 영역 | 학습 후보 / 학습 inlier | 홀드아웃 후보 | 홀드아웃 오차 **3.5px 이하** |
|---|---:|---:|---:|
| 위쪽→아래쪽 | 208 / 138 | 198 | **0** |
| 아래쪽→위쪽 | 198 / 172 | 208 | **29** |
| 왼쪽→오른쪽 | 141 / 84 | 265 | **113** |
| 오른쪽→왼쪽 | 265 / 168 | 141 | **32** |

**해석:** 반쪽을 기준으로 독립 재학습한 H가 다른 반쪽의 Lowe 후보를 안정적으로 재투영하지 못한다. 이는 페이지·촬영의 비선형 변형, 글자 반복에 의한 오매칭, 부분 특징점 편향, 낮은 스캔 해상도 등의 **가능성**을 배제할 수 없다는 의미다. 원인이 무엇인지 확정하지 못하므로 **같은 판목이라는 증거가 없다**는 반증으로도 확대하면 안 된다. 동시에 글로벌 inlier 245개를 근거로 **전 장에 같은 물리 판목**임을 선언하는 것은 금지한다.

### C. 결론 및 후속 독립성

| 항목 | v10 판정 |
|---|---|
| 동일 국소 원문 글자·열 기하학 대응 | `SUPPORTED_BY_245_GLOBAL_INLIERS` |
| 다른 면 대조군 8/8/5 대비 강한 인쇄면 정합 | `SUPPORTED` |
| 특정 글자의 **두 스캔에 반복되는 고유 획 결손** | `NOT_CERTIFIED` |
| 정확히 같은 물리 목판 재인쇄 | `UNADJUDICATED` |
| 두 스캔이 서로 독립된 실물에서 별도로 취득됨 | `UNADJUDICATED` |
| 목판 텍스트 전승 계보 독립 | `UNADJUDICATED` |
| 이번 조사에서 추가된 원본 증거 소장본 수 | **0** |

독립 인쇄 서지 두 개가 동일 판목의 **두 독립 본문 투표**라는 주장은 금지한다. 06590 공개 원본 미확보는 연구를 멈추게 할 전제 조건이 아니며, **기관 메일·열람 의뢰는 후속 경로에 포함하지 않는다.** 지금 공개된 판본에 특정 손상 마커의 양측 원본 확대 컷을 제시할 수 없는 한 이 동일 목판 판정은 연구 HOLD로 관리한다. 필요하면 공개적으로 접근 가능한 **더 고해상인 다른 스캔**을 탐색할 수 있지만, 없는 그림을 확보한 것으로 기록할 수 없다.

사주 규칙의 `別宮` 日柱 포함, `再見` 藏干 포함, `一位` counting unit은 계속 `UNADJUDICATED`. 다섯 Claim HOLD, N17 `METHODOLOGY_CONFLICT`, N13 정확 劫財 T8 **1 vs 0**, TrustGrant/consumer/Preview/Official/Production 권한 변화 **없음**. 두 PR Draft/미병합. 신규 v10 정확 HEAD의 CI 성공 여부는 별도 확인.


## 30. 「喜忌篇」 시상편재 주석의 두 명식 반례 — 직접적인 해석 범위 제약 (2026-10-18, N27 v11)

### 자료·계통 구분

- [『淵海子平』 「喜忌篇」 공개 전사](https://sajumania.com/ebook/to01-06/to01-06-02-01.htm)의 `時上偏財，別宮忌見` 해설은 `用時上天元及支內人元，只要時上一位有之，始爲貴，若別位有之，便多了`라고 명시한다. **時干과 時支 藏干을 구분하며** 다른 위치의 작용을 고려하는 주석이다.
- [『神峰通考』 「喜忌篇」 공개 전사](https://zh.wikisource.org/zh-hant/神峰通考)에도 해당 설명과 두 명식이 실려 있다. 두 사이트의 글을 확인했을 뿐이며 초기 목판에서 두 계통으로 독립해 전승된 것인지는 **증명되지 않았다**. 「喜忌篇」의 권·편 배치가 매 웹 전사에서 동일하다고 가정하지 않는다.
- 첫 긍정 명식의 인물을 첫 자료는 `都統制`, 두 번째는 `邵統制`라고 적는다. 현대 전사의 오류 또는 역사적 異文 중 무엇 때문인지 알 수 없으므로 **실물 판본의 새로운 異文이라고 주장하지 않는다**.
- 앞서 검사한 NLC 明萬曆본의 동일 물리 판면을 더 높은 해상도로 **새로 확보하지 못했다**. Commons NLC PDF의 외형 해상도(1110×1741)는 해당 짝면의 획 정보를 더 풍부하게 판독한 새로운 사진이 아니다. 공개 [CADAL 四庫本 06066041](https://commons.wikimedia.org/wiki/File:CADAL06066041_三命通會·卷五.djvu)과 [06056481](https://commons.wikimedia.org/wiki/File:CADAL06056481_三命通會·卷五.djvu)는 다른 계열일 수 있으며, 해당 locus를 직접 읽은 별도 印本 수에 추가하지 않는다. 기관 문의·이메일 없이 **뜻을 직접 논하는 이미 공개된 주석**으로 연구 축을 전환했다.

### 두 명식 — 어떤 가설을 실제로 구별하는가

| 주석의 분류 | 年 | 月 | 日 | 時 | 日干→時干 偏財 | 時 이외 天干 偏財 | 판정 단서 |
|---|---|---|---|---|---|---|---|
| 긍정 (`都/邵統制` 인명 차이) | 丁酉 | 己酉 | 戊子 | 壬子 | 戊→壬 | 없음 | 日支 子藏癸는 戊의 **正財** |
| `別宮忌見` 부정 | 丁丑 | 己酉 | 丁丑 | 辛亥 | 丁→辛 | **없음** | 年支丑·月支酉·日支丑에 **藏辛**; 주석은 `月支又酉丑會局`이라고 기술 |

**긍정 명식:** 戊日의 時干壬은 偏財, 日支子藏癸는 正財이다. 주석은 이 명식을 긍정 사례로 들므로, **모든 財星(正財와 偏財)을 구별 없이 藏干 포함 합산하면 무조건 위반**이라는 단순 모델을 그대로 인증할 수 없다. 그러나 藏干 偏財도 모두 무시한다는 뜻은 아니다.

**부정 명식:** 丁日의 時干辛이 偏財인 반면 다른 곳의 천간 丁/己/丁에는 辛이 없다. 그런데 주석은 月支 酉와 丑의 작용을 들어 `別宮忌見`이라고 명시한다. 따라서 **時 이외 노출된 天干 偏財만 검사하고 지지의 藏干/會局은 항상 무시**한다는 가설과 충돌한다. 이를 `藏干이 한 번만 보여도 무조건 위반`이라는 범용 알고리즘으로 바꾸면 안 된다. 실제 원문은 **酉丑會局이라는 문맥을 명시**하며, 巳 없는 酉丑을 독자가 자동으로 완전한 巳酉丑 三合金局으로 판정해서도 안 된다.

**日柱 분리의 한계:** 부정 명식은 **年支와 日支 모두 丑**이다. 日支丑의 독립적 영향과 年支丑/ 月支酉의 영향을 분리한 쌍이 아니다. 그러므로 `別宮`에 日柱를 언제나 포함한다는 규칙, `再見`에서 모든 藏干 출현을 일률 집계하는 규칙, `一位`를 모든 상황에 적용하는 정수 단위 모두 계속 `UNADJUDICATED`이다.

### 증거 강화와 권한의 분리

**확인된 좁은 주장 2개:** (1) 時 이외 천간의 偏財만 보는 배타적 가설은 주석의 부정 사례와 양립하지 않는다. (2) 正財·偏財 藏干을 무차별 합산하는 가설은 주석의 긍정 사례와 양립하지 않는다. 이것은 **해당 편의 공개 전사·주석에 따른 반례**이지 독립 原刻 비교로 확인된 역사적 결정 규칙이 아니다. 따라서 본 v11은 국소적인 **가설 배제 근거**만 추가하고 사주 엔진 판정 로직을 변경하지 않는다.

**불변:** 다섯 Claim HOLD, N17 `METHODOLOGY_CONFLICT`, N13 정확 劫財 T8 **1 vs 0**. `別宮`의 日柱 범위, `再見`의 藏干 단위, `一位`의 정확한 셈법은 미확정. TrustGrant/Preview/Official/Production/consumer 해석 승인 없음. 두 PR Draft·미병합. v11 정확한 HEAD CI 검증은 별도 수행한다.
