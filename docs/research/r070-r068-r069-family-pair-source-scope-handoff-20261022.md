# R068/R069/R070 가족·궁합 — 실제 명식 기반 Source Scope 인계 (2026-10-22)

**소유:** Saju Research / Methodology. **수신:** Saju 엔진(기존 ReadingIntent→ClaimGraph→EvidenceSelector→Renderer).  
**기준:** Saju 최신 `main` 및 R068 [#1004], R069, R070 [#1008] 기존 소스 코퍼스; 12메뉴 [로드맵 작업 브랜치 PR #2679](https://github.com/gycha0109-beep/Saju/blob/docs/myeongha-roadmap-alignment-20261022/docs/ROADMAP.md), [통합 인계 브랜치 PR #2437](https://github.com/gycha0109-beep/MyeongHa/blob/docs/master-track-roadmap-gpt14-20261022/docs/roadmaps/MYEONGHA_GPT_TRACK_MASTER_ROADMAP_20261022.md). 로드맵 문서 자체는 새로운 근거·승인·배포 권한이 아니다.

## 구현된 연구 반환 계약

`src/research/family-pair-source-scope-handoff.ts`

- `evaluateFamilySourceScopeV1(CanonicalSajuSnapshot, 'parents'|'children')`: **현행 R070의 원문 표면만** 실제 성별 계산 입력 및 확정된 원국 기둥에 결속한다. `sourceLayerId`, `sourceSurface`, `originalSexScope`, `observedFactPath`, `observedPillar`, `missingPrerequisites`를 반환한다.
- `evaluatePairwiseSourceScopeV1({personRef,snapshot}, {personRef,snapshot})`: **두 명식의 독립 snapshotId/hash/정책/시각미상 여부**를 유지하고 동일 기둥 위치에서 실제 관측한 값의 `same/different/incomplete`만 제공한다. `R068` 사회·친족 문구와 `R069` 역사적 성별·배우자 문구의 **T10 직접 적용 불가 이유**를 각 원문별로 반환한다.
- `APPLICABLE_BOUNDED`: 해당 역사적 **문구의 원국 위치 관찰**에 한해서만 적용 가능한 조건이다. `INCONCLUSIVE`: 실제 관측값/방법론 선택/원전 적용조건이 부족하다. `NARROW_OR_REPLACE`: 현재 요청 범위나 역사 성별과 맞지 않아 별도 범위 한정이 필요하다. `REJECTED`: 해당 문구를 T10 상호관계 주장으로 변환할 수 없다.
- 반환 결과는 항상 `familyT8Admitted=false` 또는 `pairwiseT10Admitted=false`, `researchOnly=true`, `mayGrantOfficialAuthority=false`, `mayMarkMenuAvailable=false`, `mayPersist=false`, `mayPublish=false`, `maySell=false`. Source Authority 또는 Production/Commerce 허가가 아니다.

## 부모와 자녀의 차이: 정확한 기존 R070 원문

| 메뉴 | 정확한 현행 원문·층위 | 계산 입력과 적용 가능 범위 | 미충족·금지된 확대 |
| --- | --- | --- | --- |
| 부모 | `月為父母兄弟門戶` — PILLAR-DOMAIN-GENERAL | 자신의 `pillars.month` 확정 시 원문 배속 범위의 관찰만 가능 | 월주=부모의 성격/수명/양육 관계로 단정 금지 |
| 부모 | `年為父` — PILLAR-DOMAIN-MALE-ALTERNATE | **역사적 남성 명식** + `pillars.year` 확정 시 해당 원문의 제한된 관찰 | 일반 중립 성별 가족 공식으로 전용 금지 |
| 부모 | `胎為母` — PILLAR-DOMAIN-MALE-ALTERNATE | 해당 역사적 문구는 현행 Canonical의 별도 태(胎) 계산 사실을 가지지 않음 | 연·월주로 태를 대신 생성 금지 |
| 부모 | `父以偏財論`, `母以印綬論` — TEN-GOD-FAMILY-RELATIONS | R070의 **특정 장·맥락에서의 친족 배속**임은 알 수 있으나 방법 선택 미확정 | 편재/인성 십신 존재→부모 존재/성격/관계 결과 금지 |
| 자녀 | `時為子息` — PILLAR-DOMAIN-GENERAL | 자신의 `pillars.hour` 확정 시 제한된 위치 문구 관찰 가능 | 출생시각 미상인데 시주를 만들거나 자녀의 미래 단정 금지 |
| 자녀 | `時為子孫` — PILLAR-DOMAIN-MALE-ALTERNATE | 역사적 남성 명식 범위 + 확정 시주에서만 위치 관찰 | 중립 성별의 절대 자녀 판단 규칙으로 전용 금지 |
| 자녀 | `子嗣者即官星也` — TEN-GOD-FAMILY-RELATIONS | 특정 장·맥락의 친족 역할 문구, 무조건적 공식 미확정 | 관살/관성 존재=자녀 존재·결과 금지 |
| 자녀 | `我生者為子` — FEMALE-CHILD-RELATION | 역사적 여성 명식 문맥에서 등장한 문구, 구체 별·구성 해석 조건 미확정 | 모든 성별·구성에 자동 치환 금지 |

각 표의 원문은 **기존** `R070_CLAIM_LAYERS`에 이미 등록된 표면이다. 새로운 고전 문구·판본·독립 출처·판단 권위를 만들지 않는다. R070의 대안 방법을 점수화하거나 하나로 강제 선택하지 않는다.

### T5 계산 사실이 있어도 별 배속 방법을 선택할 수 없는 이유

R070의 `父以偏財論`, `母以印綬論`, `子嗣者即官星也`, 여성 문맥 `我生者為子`에는 `tenGodObservation`을 추가했습니다. **기존 명식의 `derivedFacts.tenGods`에서 실제 계산이 확정된 천간과 지지 대표 십신의 값/경로만** 원문별로 보존합니다.

| R070 문구 | 관찰에 사용한 T5 계열 | 해석으로 승격하지 않는 이유 |
| --- | --- | --- |
| `父以偏財論` | 편재 계산값 | 해당 장의 부친 별 배속 방법 선택 및 다른 배속과의 조정이 안 됨 |
| `母以印綬論` | 인성 계열(편인·정인) 관찰값 | 인수와 현대 세부 십신을 1:1로 고정하거나 특정 어머니의 존재·성격으로 연결할 근거가 없음 |
| `子嗣者即官星也` | 관성 계열(편관·정관) 관찰값 | 원문 장·성별 맥락 및 여성 문구와 충돌 해결 없이 자녀 공식으로 선택 불가 |
| `我生者為子` | 식상 계열(식신·상관) 관찰값 | 여성 명식의 역사적 문맥만 알 수 있으며 현대 자녀 운명으로 환산 불가 |

이것은 **기존 십신 용어를 탐색하기 위한 T5 관찰 그룹**이지 `印綬=편인·정인`의 문헌상 정밀 등가나 부모·자녀 분류 공식이 아닙니다. 실제 `TenGodChartFact`의 확정된 위치만 `observedPositions`에 저장하고, 미상/모호 위치는 `unresolvedFactPaths`에 기록합니다. 단일 출생시간의 시주가 미상인 경우 다른 위치에 관측된 십신이 있더라도 관찰 상태는 `incomplete_input`으로 남습니다. 여기서 `not_observed_in_resolved_positions`는 **실제로 계산된 표면에서 못 봤다는 뜻일 뿐, 가족 구성원이 없다는 뜻이 아닙니다.** 지장간·구조 구성·旺衰의 독립 적용 근거가 아직 없으므로 각 원문 자체의 의미 판정은 여전히 `INCONCLUSIVE`입니다.

### 함께 계산되지만 선택할 수 없는 역사적 방법

동일한 **남성 명식**에서 연주와 월주가 모두 계산되어 `月為父母兄弟門戶`와 `年為父`가 각각 `APPLICABLE_BOUNDED`일 수 있습니다. 이는 두 방법이 서로 증명하거나, 더 강한 방법이 선택되었다는 뜻이 아닙니다. R070에서 별도 선택·우선순위의 근거가 없으므로 `methodCoexistences`에 두 원문, 정확한 관측 경로(`pillars.month`, `pillars.year`), 미충족 `FAMILY_METHOD_SELECTION`·`PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION`을 저장하고 `methodSelectionAuthorized=false`로 둡니다.

자녀도 남성 명식에서 `時為子息`과 `時為子孫`이 함께 시주 사실로 관찰될 수 있습니다. **같은 시주를 사용한 두 역사적 문구가 독립 해석 근거 2개로 증폭되는 것은 아닙니다.** 계산이 가능한 경우조차 가족 의미 T8은 `INCONCLUSIVE`이고, 시주 미상이라면 그마저 성립하지 않습니다.

### R070 구성 판단 다섯 원문의 현재 관찰 범위

`R070_CLAIM_LAYERS`의 `CONFIGURATION-OUTCOME`은 정확히 `旺衰`, `生旺死絕`, `刑沖破害`, `官煞混雜`, `財印` 다섯 문구를 소유합니다. 어느 문구도 부모·자녀 중 특정 대상의 결과로 연결하는 방법론이 확정되지 않았으므로, 별도 `unassignedConfigurationInputs`에 **원문 그대로** 반환합니다. 두 가족 범위에서 동일한 자료가 보이는 것은 연구상 미분류 상태이지 서로 다른 가족운의 T8 근거 두 개가 아닙니다.

현재 Canonical `derivedFacts.structuralRelations`가 확정된 경우에만 `刑沖破害` 원문 아래 **`branch_clash` 구조 후보의 기존 ID**를 부분 관찰로 보존할 수 있습니다. 이는 `沖`에 해당하는 구조적 후보 1종일 뿐, `刑`·`破`·`害` 및 조합 우선순위·형충 효과는 계산 완료나 의미 승인으로 표시하지 않습니다. `旺衰`·`生旺死絕`은 승인된 강약/12운성 판단을 만들지 않으며, `官煞混雜`·`財印`도 단순 십신 존재를 부모/자녀 운명 결과로 변환하지 않습니다. 반환 상태는 다섯 원문 모두 `INCONCLUSIVE`, `familyScopeResolved=false`, `familyOutcomeAuthorized=false`입니다.

### R070 刑沖破害 — 부모·자녀 기둥의 실제 지지충 참여/비참여 입력 인계

이번 구현은 **기존 R070 Source Layer `CONFIGURATION-OUTCOME`의 정확한 원문 `刑沖破害`**와 기존 기둥 배속 출처를 계산 위치에 한정해 다시 연결한다. 새 전통이나 가족 결과는 도입하지 않는다. `刑沖破害` 중 현재 Canonical에서 추적할 수 있는 것은 `derivedFacts.structuralRelations`의 **`kind=branch_clash`** 후보뿐이다. 이 후보는 해당 명식 안의 두 지지 충에 관한 구조적 일치일 뿐이다. `刑`·`破`·`害`의 전체 규칙이나 `沖`의 실제 작동 결과, 상대 가족의 상황을 나타내지 않는다.

`evaluateFamilySourceScopeV1(snapshot, 'parents'|'children').branchClashPillarObservations`는 **기존 `methodCandidates` 중 요청 범위·원래 성별 조건에 해당하는 기둥 방법**만 개별적으로 대조한다. 부모는 `月為父母兄弟門戶` / `pillars.month.branch`, 역사적 남성 명식일 때만 추가 `年為父` / `pillars.year.branch`다. 자녀는 `時為子息` / `pillars.hour.branch`, 역사적 남성 명식일 때만 `時為子孫` / `pillars.hour.branch`를 각각 유지한다. `胎為母`처럼 정확한 현재 기둥 입력이 없는 방법 및 해당 성별이 아닌 `年為父`·`時為子孫`은 이 배열에 추가하지 않는다.

| 반환 상태 | 기존 계산 사실에 대한 정확한 뜻 | 금지하는 새 가족 의미 |
| --- | --- | --- |
| `REFERENCED_PILLAR_PARTICIPATES_IN_CLASH` | 확정된 R070 참조 기둥의 지지가 하나 이상의 실제 `branch_clash` 후보 참여자 | 충이 해당 부모·자녀의 문제/갈등/사건을 발생시킨다는 인과 |
| `CLASH_ONLY_OUTSIDE_REFERENCED_PILLAR` | 확정 후보가 있으나 참조 기둥의 지지는 참여하지 않음 | 다른 지지의 충을 부모·자녀 결과에 전용 |
| `NO_CLASH_CANDIDATE_IN_RESOLVED_CHART` | 현재 계산 완료된 관계 후보 안에 `branch_clash`가 관찰되지 않음 | 형·파·해 또는 가족 영향이 아예 없다는 단정 |
| `STRUCTURAL_CLASH_CANDIDATES_UNRESOLVED` | 참조 기둥은 확인 가능하지만 구조 관계 계산은 미완전 | 미상 후보를 임의 충으로 확정 |
| `REFERENCED_PILLAR_UNRESOLVED` | 출생시각 미상 등으로 요청 대상의 기준 기둥 자체가 확정되지 않음 | 다른 기둥으로 시주를 대체하거나 결과를 생성 |

각 후보의 원래 `relationId`·`participants`·`sourceIds`·`semantics.structuralMatchOnly=true` 및 `transformationEstablished=false`를 `participatingClashes` / `outsideClashes`에 변경 없이 전달한다. `relationId`를 부모·자녀 방법 간 중복 관찰했다고 **서로 독립적인 두 가족 Claim으로 세지 않는다**(`independentlyAdmittedFamilyClaims=0`). 부모의 연·월주가 각기 다른 기둥이므로 같은 충도 한쪽 방법에서는 참여/다른 쪽에서는 외부 후보가 될 수 있다. 남성 자녀 원문의 두 시주 방법은 **동일한 계산 시주를 재사용할 뿐** 독립 근거를 두 배 생성하지 않는다.

**기존 소스에서 해결되지 않는 부분:** `CONFIGURATION_OUTCOME_SETTLEMENT`, `FAMILY_CONFIGURATION_TO_RELATIVE_METHOD_SELECTION_NOT_ESTABLISHED`, `XING_PO_HAI_AND_CONFIGURATION_INTERACTION_NOT_SETTLED`, `R070_BRANCH_CLASH_PILLAR_TO_FAMILY_EFFECT_NOT_SOURCED`가 모든 항목에 남는다. 위치 외 후보만 있는 경우 `R070_OUTSIDE_PILLAR_CLASH_IS_NOT_FAMILY_EFFECT_EVIDENCE`, 구조 후보가 없는 경우 `R070_NO_CLASH_CANDIDATE_IS_NOT_FAMILY_OUTCOME_ABSENCE`, 참조 기둥이나 계산 자체가 미확정이면 각 Canonical 부족 사유를 더한다. 새로운 의미 우선순위·충의 강도·부모/자녀 결과는 발행하지 않는다.

**실제 계산 회귀:** 양력 1987~2005년 중 11개 연도, 각 월 5·15·25일 14:30 남성 명식을 기존 계산 정책으로 얻어 **실제 충 후보 참여 기둥과 그 외 기둥의 차이**를 확인한다. 각 사실의 참여자·출처 ID와 `derivedFacts.structuralRelations` 원본을 일치시키며, 남성 부모의 월/연주 및 남성 자녀의 두 시주 배속이 별개 근거로 증폭되지 않는지 확인한다. 1997-05-15 여성 명식의 시각 미상 반례에서는 **자녀 시주 불확정, 부모 월주 방법 존속, 남성 전용 방법 배제**를 각기 처리한다.

**엔진 인계와 금지:** `branchClashPillarObservations`는 `methodCandidates`와 `unassignedConfigurationInputs` 아래에서 출처 경계와 동일 계산 근거를 제공하는 **연구용 입력 계약**이다. `unassignedConfigurationInputs[].familyScopeResolved=false`를 바꾸지 않는다. 연구자는 T6 구조적 후보를 가족 T8 방법론으로 확정하지 않으며 `familyT8Admitted=false`, `configurationOutcomeAuthorized=false`, `mayGrantOfficialAuthority=false`, `mayMarkMenuAvailable=false`, `mayPersist=false`, `mayPublish=false`, `maySell=false`를 유지한다. 원전의 실제 가족 구성 조건, 충돌 선택·결과 규칙, 승인된 현대 가족 해석이 등록되기 전에는 **부모·자녀 의미 해석 둘 다 `INCONCLUSIVE/HOLD`**다.

### R070 官煞混雜·財印의 T5 조회용 관찰 (효과·방법 미승인)

`官煞混雜`은 원문에 있는 `官`·`煞`의 각각에 대해 현행 Canonical T5의 **정관·편관 계산값을 찾아본 경로**만 기록한다. 두 관성이 관찰되더라도 그것을 고전적 `混雜`의 성립, 길흉, 부모·자녀의 상태로 확정하지 않는다. 이 원문이 요구할 수 있는 지장간·강약·구조·충돌 기준과 방법론 선택은 미확정이다.

`財印`도 현행 T5의 편재·정재(財), 편인·정인(印)에 대한 **관찰값·불명확 경로**만 `tenGodSearchTerms`에 기록한다. 계산된 두 계열이 동시에 있음을 `財印` 구성의 작동 효과로 판단하거나 재성=부친·인성=모친으로 전용하지 않는다. 두 문구 모두 `canonicalObservationCoverage=visible_t5_search_categories_only`일 때도 `configurationMeaningAuthorized=false`, `familyOutcomeAuthorized=false`, `familyScopeResolved=false`, `disposition=INCONCLUSIVE`를 고정한다. `旺衰`와 `生旺死絕`는 현재 해석 가능 계산 입력이 없어 `none`으로 유지한다.

### R070 官煞混雜·財印 — 두 T5 조회 그룹의 실제 위치 대조와 구성 미성립 경계

기존 `CONFIGURATION-OUTCOME` 레이어의 **원래 문구** `官煞混雜`와 `財印`만을 사용하며, 별도 전통·원문이나 실행 가능한 원전 규칙을 창작하지 않는다. 반환 `unassignedConfigurationInputs[]`의 해당 두 항목에만 `tenGodGroupContrast`를 추가했다. 각각 기존 `tenGodSearchTerms`의 **두 항목**을 재사용한다. `官`→현행 `정관`, `煞`→현행 `편관`; `財`→현행 `편재/정재`, `印`→현행 `편인/정인`은 **T5 탐색 어휘**이며 이 대응만으로 고전의 정확한 적용 범위나 의미 동등성을 승인하지 않는다.

각 그룹의 원래 `derivedFacts.tenGods.{year|month|day|hour}.{stem|branch}` 관찰 위치를 동일하게 유지한다. `day.stem`은 기준 일간이라 원래 관찰에서 제외한다. `sharedPillarSlots`는 두 서로 다른 그룹의 관찰값이 **동일한 기둥**의 (별도) 천간 또는 지지 대표 채널에 보일 때만 기록한다. `firstGroupOnlyPillarSlots` / `secondGroupOnlyPillarSlots`는 다른 그룹 관찰이 **없는 기둥 위치**만 표시한다. 이는 위치 비교이지 길흉·경쟁·왕쇠·상극 효과가 아니다.

| `observationState` | 계산 T5에서만 말할 수 있는 것 | 원전상 아직 말할 수 없는 것 |
| --- | --- | --- |
| `BOTH_GROUPS_OBSERVED_IN_AT_LEAST_ONE_SHARED_PILLAR` | 두 현대 십신 탐색 그룹이 하나 이상의 동일 기둥에서 관찰 | `官煞混雜`의 **혼잡 성립** 또는 `財印`의 충돌·효과 확정 |
| `BOTH_GROUPS_OBSERVED_ONLY_IN_DISTINCT_PILLARS` | 두 그룹이 관찰되나 같은 기둥에는 함께 나타나지 않음 | 기둥 사이의 허용·불허·우선순위 추정 |
| `ONLY_ONE_GROUP_OBSERVED_IN_VISIBLE_T5` | 현재 확인된 조회 표면에서 둘 중 하나만 관찰 | 다른 그룹의 원국·지장간·구성상 **부재 판정** |
| `NEITHER_GROUP_OBSERVED_IN_VISIBLE_T5` | 현재 조회 표면에서 두 그룹 모두 미관찰 | 두 고전 구성이나 해당 가족 관계 자체가 없다는 판정 |

`observedGroupCount`는 계산 그룹 **0/1/2개 관측 여부**만 세며 Claim 수나 의미 점수가 아니다. `inputCoverage=PARTIAL_VISIBLE_T5`이면 미상 경로를 `unresolvedFactPaths`에 모아 `CANONICAL_T5_CONFIGURATION_GROUPS_PARTIAL`을 표시하고, 동시에 일부 십신이 확인되더라도 원국 전체 확정으로 승격하지 않는다. `RESOLVED_VISIBLE_T5`여도 지장간·고전 조합조건·강약·우선순위까지 해소된 것은 아니다. `observedGroupCount < 2`이면 `R070_UNOBSERVED_VISIBLE_T5_GROUP_IS_NOT_NEGATIVE_CONFIGURATION_EVIDENCE`를 반환한다.

**필수 보류 조건:** `R070_TEN_GOD_COEXISTENCE_METHOD_NOT_ESTABLISHED`, `R070_VISIBLE_T5_COOBSERVATION_IS_NOT_CLASSICAL_CONFIGURATION`, `R070_CONFIGURATION_INTERACTION_AND_PRIORITY_NOT_SOURCED`, `R070_CONFIGURATION_TO_FAMILY_EFFECT_NOT_SOURCED`, `HIDDEN_VS_VISIBLE_STAR_HANDLING`을 두 원문 모두에 남긴다. 이 중 하나라도 빠진 조건을 **별 관측만으로 충족했다고 처리하지 않는다.** `originalConfigurationConditionEstablished=false`, `configurationInteractionOrPriorityEstablished=false`, `familyRelativeEffectAuthorized=false`, `familyT8Admitted=false`이다.

실계산 회귀는 양력 1988·1990·1993·1997·2001·2005년 5월의 특정 6개 출생 입력을 사용해 모든 그룹의 관측 경로/실제 현대 십신/기둥 중복·단독/미결 경로를 원본 Canonical과 대조한다. 여성 1997-05-15 시각 미상에서는 `derivedFacts.tenGods.hour.stem|branch`를 미상으로 보존하고 부모·자녀 반환 모두 해석을 보류한다. 부모/자녀 두 메뉴에서 동일 구성 관찰을 **독립적인 두 가족 결과로 중복 채택하지 않는다.**

**기존 엔진 인계:** `tenGodGroupContrast`는 `unassignedConfigurationInputs` 아래 있는 계산 입력 증거일 뿐 새 `MethodologyDefinition`·`RuleDefinition`·Claim 또는 Official/Production/Reader 권한이 아니다. 계속 `familyScopeResolved=false`, `disposition=INCONCLUSIVE`, `familyOutcomeAuthorized=false`, `familyT8Admitted=false`, `researchOnly=true`, `mayGrantOfficialAuthority=false`, `mayMarkMenuAvailable=false`, `mayPersist=false`, `mayPublish=false`, `maySell=false`를 유지한다.

### R070 지장간 소속 입력 vs 현재 T5 십신 조회 — 서로 다른 계산 사실을 혼합하지 않음

이전 `官煞混雜`·`財印`의 두 그룹 비교는 **`derivedFacts.tenGods`의 천간·지지 대표 십신 계산값**에서만 이루어졌다. 그와 별도로 Canonical에는 이미 `derivedFacts.hiddenStems.{year|month|day|hour}`의 기둥 지지별 **지장간 천간 소속 목록**이 있다. 이 자료는 `src/calculation/hidden-stems.ts`의 등록된 `淵海子平 — 又地支藏遁歌` 자료에 기초한 **소속 집합**일 뿐이다. 현재의 정렬 순서는 저장 형식이며 본기·중기·여기, 월령 시간 비율, 세력·가중치·우선순위가 아니다. R070의 `CONFIGURATION-OUTCOME` 구성 판단과 혼합할 승인 규칙도 없다.

이번 변경은 두 구성 원문의 기존 `unassignedConfigurationInputs[].tenGodGroupContrast` 아래에만 `hiddenStemMembershipContrast`를 추가한다. `sourceFactPath=derivedFacts.hiddenStems`, `visibleT5FactPath=derivedFacts.tenGods`를 **각기 보존**한다. `pillarObservations[]`의 각 항목은 원본 `pillarSlot`, `membershipFactPath`, `branchFactPath`, 원본 지지가 확정된 경우의 `observedBranch`, `status`, 그리고 **소속이 확정된 경우에만** `rawMembershipPositions`(`stem`, `storageIndex`)를 반환한다. `storageIndex`는 저장 순서의 번호일 뿐 강약이나 역할 서열이 아니다.

| 소속 자료 상태 | 처리 | 허용하지 않는 추론 |
| --- | --- | --- |
| `RESOLVED_MEMBERSHIP_ONLY` | 네 기둥의 **지장간 소속 천간**을 원본 그대로 관찰 | 소속만으로 `정관/편관/재성/인성` T5 지장간 값을 생성하거나 구성 성립 판정 |
| `PARTIAL_MEMBERSHIP` | `unavailable`·`ambiguous` 기둥의 `membershipFactPath`를 `unresolvedMembershipFactPaths`에 유지하고 **후보를 하나로 합치지 않음** | 모호한 시간·기둥의 지장간을 단일 확정값으로 보충 |
| `MEMBERSHIP_FACTS_NOT_PROVIDED` | 선택적 `derivedFacts.hiddenStems` 필드 자체가 없다면 네 기둥 모두 `not_provided`로 기록 | 지지 이름만 보고 데이터 필드를 임의로 생성했다고 보고 |

지장간에는 여기서 계산된 독립 `TenGod` 분류 필드가 없고, 원문이 요구할 수 있는 혼잡·재인 상호작용/강약·지장간 역할 선택법도 미승인이다. `hiddenStemT5ClassificationAuthorized=false`, `hiddenStemContributionToObservedT5GroupCount=0`, `canonicalStorageOrderIsStrengthPriority=false`, `historicalConfigurationConditionEstablished=false`, `hiddenStemRelativeRoleAuthorized=false`를 항상 고정한다. **지장간의 천간 글자가 이미 보이는 천간 글자와 같더라도**, 이를 추가 십신 관찰, `observedGroupCount` 증가 또는 별도 독립 가족 근거로 승격하지 않는다. `day` 기둥의 지장간 소속은 그대로 관찰하지만, 기존 십신 조회에서 제외한 `day.stem`(일간)을 숨은 십신으로 재해석하지 않는다.

**미충족 조건:** `R070_HIDDEN_STEM_MEMBERSHIP_IS_NOT_HIDDEN_T5_CLASSIFICATION`, `R070_HIDDEN_STEM_STRENGTH_AND_PRIORITY_NOT_SETTLED`, `R070_HIDDEN_STEM_CONFIGURATION_METHOD_NOT_SOURCED`가 두 구성 항목에 항상 남고, 기둥 자료가 미확정/미제공이면 `CANONICAL_HIDDEN_STEM_MEMBERSHIP_PARTIAL_OR_UNAVAILABLE`을 추가한다. 기존 `HIDDEN_VS_VISIBLE_STAR_HANDLING`, `R070_TEN_GOD_COEXISTENCE_METHOD_NOT_ESTABLISHED`, `CONFIGURATION_OUTCOME_SETTLEMENT`도 해결되지 않는다. 이러한 항목의 `missingPrerequisites`는 최상위 가족 인계에도 합산하되 연구/공식 결과 권한을 높이지 않는다.

**실계산 회귀:** 출생시각을 제공한 1988·1990·1997년 명식에서 각 지장간 소속 목록이 Canonical과 위치·저장 순서까지 정확히 일치하는지 확인한다. 1997-05-15 여성의 **시각 미상** 사례에서는 `derivedFacts.hiddenStems.hour`가 `unavailable`이고, 나머지 확정 기둥의 소속만 읽으며 기존 `derivedFacts.tenGods.hour.stem|branch`의 미해결도 별도로 남긴다. 선택적 `hiddenStems` 자체가 없는 입력은 네 기둥을 `not_provided`로 명시하고 T5 조회 결과를 바꾸지 않는다. 모든 경우 기존 부모·자녀 `familyT8Admitted=false`, `researchOnly=true`, Official/공개/저장/판매 `false`는 그대로다.

### R070 부모·자녀 역사적 십신 배속 원문별 지장간 소속 인계 — 별도 계산 근거 유지

이번 작업은 `CONFIGURATION-OUTCOME`의 `官煞混雜`·`財印`과 구별하여, 이미 있는 **R070 친족 별 배속 원문 네 개 각각**에 `methodCandidates[].relativeStarHiddenStemBoundary`를 붙였다. 이 값은 동일한 `CanonicalSajuSnapshot` 안의 실제 계산을 출처별로 구분해 엔진에 전달하는 **연구용 사실 인계**다. 원문 선택·가족 예측·새 MethodologyDefinition/RuleDefinition이 아니다.

| 가족 메뉴 | 원래 Source Layer / 정확한 문구 | 현재 조회 가능한 T5 | 원문의 역사적 적용 범위 |
| --- | --- | --- | --- |
| 부모 | `TEN-GOD-FAMILY-RELATIONS` / `父以偏財論` | `편재` 관찰 | `SECTION_SCOPED` — 장·맥락에 따른 부친 배속 방법론 미선정 |
| 부모 | `TEN-GOD-FAMILY-RELATIONS` / `母以印綬論` | `편인/정인` 조회 그룹 | `SECTION_SCOPED` — `印綬`와 현대 인성 세부 분류의 역사적 등가·방법론 미선정 |
| 자녀 | `TEN-GOD-FAMILY-RELATIONS` / `子嗣者即官星也` | `편관/정관` 조회 그룹 | `SECTION_SCOPED` — 고전의 자식/관성 문맥과 성별·구성 선택 미확정 |
| 자녀 | `FEMALE-CHILD-RELATION` / `我生者為子` | `식신/상관` 조회 그룹 | `FEMALE_CHART` — **역사적 여성 명식에만** 입력 대조, 남성/미지정 명식은 원래 후보를 `NARROW_OR_REPLACE`로 유지 |

`relativeStarHiddenStemBoundary`는 **원래 문구·원래 소스 ID·`originalSexScope`·`historicalSex`·`requestedScope`**를 그대로 보존한다. 참조 입력은 `visibleT5FactPath=derivedFacts.tenGods`와 `hiddenStemFactPath=derivedFacts.hiddenStems`로 분리한다. 원래 `tenGodObservation`의 `observedPositions` 및 `unresolvedFactPaths`를 네 기둥(`year/month/day/hour`)에 한정해 분할할 뿐 실제 십신 값을 다시 분류하지 않는다. `pillarObservations[]`의 `visibleT5Positions`는 원래 확정 T5 경로·천간/대표 지지 채널·십신 값을, `unresolvedVisibleT5FactPaths`는 미확정 T5 경로를 그대로 기록한다.

각 기둥에 동봉하는 `rawMembershipPositions`는 기존 `derivedFacts.hiddenStems.{slot}`의 **천간 글자 소속 목록과 저장 순서**이고 `status`·`membershipFactPath`·`branchFactPath`를 유지한다. 이는 T5 십신 종류, `印綬`·`官星`·`我生`의 역사적 판정, 지장간의 세력·본중여기·유효 순위가 **아니다**. 같은 글자가 보이는 천간에도 있거나 같은 기둥에 놓였다는 이유로 `편재/정인/정관/식상` 등을 지장간의 확정 십신으로 생성하지 않는다. 네 원문의 T5 기존 관찰 개수와 가족 Claim 수는 변하지 않는다.

입력 미확정의 처리: 출생시각 미상일 때 `derivedFacts.hiddenStems.hour`의 소속/지지가 미확정이며, 원래 `derivedFacts.tenGods.hour.stem|branch` 부족 경로도 동시에 유지한다. 지장간이 부분적으로만 확정되면 `hiddenStemMembershipCoverage=PARTIAL_MEMBERSHIP`이고, 선택적 필드 전체가 없으면 `MEMBERSHIP_FACTS_NOT_PROVIDED`로 네 기둥 부족 경로를 반환한다. 어떤 경우에도 알고 있는 다른 기둥의 지장간으로 시주를 대체하지 않는다. 남성 또는 성별 미지정 명식의 `我生者為子` 후보는 경계 자료를 만들지 않으며 성별 미스매치를 T5/지장간 계산 관찰로 덮지 않는다.

각 반환에 `R070_FAMILY_STAR_HIDDEN_STEM_T5_CLASSIFICATION_NOT_ESTABLISHED`, `R070_FAMILY_STAR_HIDDEN_STEM_RELATIVE_ROLE_METHOD_NOT_SOURCED`, `SECTION_SCOPED_STAR_RELATION_METHOD_NOT_SELECTED`, `HIDDEN_VS_VISIBLE_STAR_HANDLING`, `HISTORICAL_TO_MODERN_FAMILY_TRANSLATION_NOT_ESTABLISHED`를 남긴다. T5 미완전 시 `TEN_GOD_CANONICAL_FACTS_NOT_FULLY_RESOLVED`, 지장간 불완전 시 `CANONICAL_HIDDEN_STEM_MEMBERSHIP_PARTIAL_OR_UNAVAILABLE`을 추가한다. 이 코드는 원전이 검증했다는 뜻이 아니라 **승인되지 않은 연결을 막는 미충족 사유**다. 후보의 `missingPrerequisites`와 최상위 가족 연구 보고에도 유지한다.

**실계산 회귀:** 1997-05-08 남·여·성별 미지정 명식의 부모·자녀 원문별 관측값과 각 계산 경로를 비교하고, 1997-05-15 여성 명식의 시각 미상 상황에서 부모·자녀 각각 시주 T5/지장간 부족을 유지한다. 지장간 자료 필드를 제거한 명식에서도 기존 십신 조회값을 바꾸거나 빈 배열을 가족 구성원 부재로 간주하지 않는다. `hiddenStemTenGodClassificationAuthorized=false`, `visibleAndHiddenStarMethodReconciled=false`, `historicalRelativeRoleAuthorized=false`, `independentlyAdmittedFamilyClaims=0`, `familyT8Admitted=false`다. 기존 `researchOnly=true`, `mayGrantOfficialAuthority=false`, `mayMarkMenuAvailable=false`, `mayPersist=false`, `mayPublish=false`, `maySell=false`도 유지한다.

### R070 부모·자녀 메뉴의 구체적 미지원 사유 — 연구용 반환 계약, 메뉴 활성화 아님

기존 `interpretationBlockers`에서 이미 구분한 원문 적용·계산 입력·방법론 선택·구성 미승인을 부모(`parents`) 또는 자녀(`children`)라는 **정확한 요청 메뉴의 미지원 사유**로 인계한다. `evaluateFamilySourceScopeV1(...).menuSupportHandoff`를 추가했으나 이는 R070 연구 보고 내부의 **불가 사유 계약**이며 서비스 메뉴 상태를 갱신하거나 `Official`·`Reader`·`Product`에서 호출하도록 승인하는 기능이 아니다. `supportState=UNAVAILABLE_RESEARCH_ONLY`는 상수이며 `mayEnableMenu=false`, `mayDisplayFamilyInterpretation=false`, `familyT8Admitted=false`이다.

`unsupportedReasons[]`에는 기존 `interpretationBlockers.sourceConditionHolds`의 **실제로 범위 안에 있는 원문**과 `methodSelectionHolds`만 들어간다. 각 원인의 원래 `sourceLayerIds[]`, `sourceSurfaces[]`, `observedFactPaths[]`, `unresolvedFactPaths[]`, `missingPrerequisites[]`를 **그대로 보존**하여 최종 미지원 상태가 어떤 계산 사실 또는 방법론 결핍 때문에 발생했는지 식별한다. 첫 항목 `R070_MENU_OFFICIAL_FAMILY_T8_NOT_ADMITTED`은 두 메뉴 공통의 공식 가족 T8 불허 경계를 명시한다. 이 식별자들은 원전 문구가 아닌 **연구용 보류 사유 코드**다.

| 반환 `reasonCode` | 실제 범위 및 관측 | 인계해야 하는 미지원 사유 |
| --- | --- | --- |
| `R070_MENU_OFFICIAL_FAMILY_T8_NOT_ADMITTED` | 부모·자녀 전체 | 가족 T8에 공식적으로 승인된 실행 방법론·결과 권한이 없음 |
| `R070_MENU_PILLAR_POSITION_NOT_FAMILY_INTERPRETATION` | 실제 월주·연주·시주 위치가 확정된 원문 | 가족 대상 기둥 위치만으로 친족 사건·상태·관계를 해석할 방법이 없음 |
| `R070_MENU_SOURCE_CONTEXT_METHOD_NOT_SELECTED` | 원래 부모의 `父以偏財論`·`母以印綬論`, 자녀의 `子嗣者即官星也`·역사 여성 명식의 `我生者為子` | 현재 현대 T5/지장간 소속값은 원전의 친족 역할 배속 방법·효과와 동등하게 승인되지 않음 |
| `R070_MENU_CANONICAL_REFERENCE_INPUT_UNRESOLVED` | 역사적 기둥 원문의 필수 위치가 미확정(예: 자녀 시주 출생시각 미상) | 해당 기둥 계산 근거가 없어서 위치 적용 자체를 확정할 수 없음 |
| `R070_MENU_CANONICAL_CONCEPT_NOT_AVAILABLE` | 역사 남성 명식 `胎為母` | Canonical에 독립 태주 계산 사실 자체가 없음 |
| `R070_MENU_HISTORICAL_METHODS_NOT_RECONCILED` | **실제로 현재 범위에 공존하는** 연주/월주 배속, 기둥/별 배속, 역사 여성 자녀 별 배속 두 원문 | 어떤 방식을 선택/조정할지 기존 원전에 따른 규칙이 부족함. 동시 등장 = 원전의 실제 모순 판정이 아님 |

`excludedHistoricalSources[]`는 별도로 반환한다. 예컨대 여성·성별 미지정 부모 명식에 남성 전용 `年為父`·`胎為母`를 적용하지 않으며, 남성 자녀 명식의 `我生者為子`는 **본래 여성 명식 한정**으로 제외한다. 각 제외는 `exclusionIsMenuUnavailabilityReason=false`이다. **범위에서 제외된 원문 자체가 해당 메뉴 전체의 미지원 근거로 재활용되거나 방법론 대조에 추가되지 않는다.** 성별 미지정도 남성/여성 범위를 임의로 만족시켰다고 보지 않는다.

`unassignedConfigurationSources[]`에는 여전히 가족 대상에 연결할 규칙이 없는 `CONFIGURATION-OUTCOME`의 다섯 원문 `旺衰`·`生旺死絕`·`刑沖破害`·`官煞混雜`·`財印`를 원형 그대로 둔다. 이들은 역사적 가족 메뉴의 추가 허가를 위한 개별 필수 규칙으로 가정하지 않으며, **미배속 구성 연구 자료**로만 전달한다. `missingPrerequisites[]`는 범위 안 미지원 사유와 미배속 구성 조건의 코드들을 중복 제거해 모은다. `admittedFamilyClaimCount=0`이고 저장/공개/판매 권한도 모두 `false`이다.

**실계산 회귀:** 양력 1990-05-15 기준 남성·여성·성별 미지정 명식에서 부모/자녀 메뉴별 각 원전 미지원 사유 수·방법 쌍 수·성별 제외 목록·실제 경로를 대조한다. 여성 1997-05-15 출생시각 미상에서는 부모 월주 방법을 남겨 두고 자녀의 `時為子息` 필수 시주 경로만 `R070_MENU_CANONICAL_REFERENCE_INPUT_UNRESOLVED`로 보고한다. 역사 남성 명식의 `胎為母`에는 별개 `R070_MENU_CANONICAL_CONCEPT_NOT_AVAILABLE`을 표시한다. **연구용 미지원 설명은 가족운 출력이나 메뉴 지원 활성화로 변환하지 않는다.**

### R070 미배속 구성 조건의 출처 색인 및 메뉴 조건과 겹치는 코드의 별도 인계

앞선 두 분리 배열에서 이제 **구성 연구 조건의 원문별 출처**까지 보존한다. `menuSupportHandoff.unassignedConfigurationPrerequisiteTrace[]`는 `unassignedConfigurationPrerequisites`에 속한 각 코드를 **한 번씩** 반환하고, 그 코드가 원래 등록된 `CONFIGURATION-OUTCOME` 다섯 원문 중 어디에서 왔는지를 `origins[]`의 `sourceLayerId=CONFIGURATION-OUTCOME`, `sourceSurface`, `canonicalObservationCoverage`로 정확히 식별한다. `旺衰`·`生旺死絕`·`刑沖破害`·`官煞混雜`·`財印`의 중복 코드를 같은 메뉴의 독립 근거 여러 개로 세지 않는다. `configurationIsFamilyMeaningAuthorized=false`, `repeatedSourceIsIndependentFamilyEvidence=false`다.

`crossLanePrerequisiteOverlaps[]`는 **문자열 코드가 동일한 경우에만** `menuBlockingPrerequisites`와 `unassignedConfigurationPrerequisites`의 교집합을 반환한다. 각 항목은 `prerequisiteCode`, 원래 메뉴 차단 사유에 딸린 `menuOrigins`, 그리고 미배속 구성 출처 `unassignedConfigurationOrigins`를 **별도 배열로** 보존한다. 특정 명식에서 교집합이 없다면 빈 배열을 그대로 반환한다. 동일한 결핍 코드가 나타난다는 사실은 두 역사 방법을 조정했다는 뜻도, 미배속 구성을 부모·자녀 메뉴에 배정했다는 뜻도 아니다. 따라서 `menuAndConfigurationMethodsReconciled=false`와 `independentlyAdmittedFamilyClaims=0`을 고정한다.

`engineTransferBoundary`에도 이 두 출처 배열을 원형대로 연결한다. 기존 `prerequisiteTrace`는 계속 **메뉴 직접 차단 사유만** 인덱싱하고, `unassignedConfigurationPrerequisiteTrace`는 **미배속 구성 조건만** 인덱싱한다. `missingPrerequisites`의 옛 합집합 동작은 바꾸지 않는다. 새로운 R070 해석 방법론·우선순위·출처 승인 및 T8/제품/판매 권한을 생성하지 않는다.

**실계산 회귀:** 1990년 남성·여성·성별 미지정 및 1997년 여성 시각 미상 명식의 부모/자녀에 대해 구성 원문별 참조와 원래 상태를 대조한다. 메뉴/구성 두 목록 간의 교집합 및 출처 2계층 분리, 허가 플래그의 불변 여부를 확인한다. 이 자료는 수신 엔진의 **연구용 미충족 조건 출처 추적**에만 사용한다.

### R070 엔진 인계 수신: 같은 메뉴·같은 명식·같은 계산 정책 결과만 선택

기존 `engineTransferBoundary`는 원국의 `snapshotId`·`calculationHash`와 `parents|children` 범위를 보존하지만, 다른 메뉴 또는 다른 명식의 연구 결과를 수신자가 실수로 재사용하지 않도록 별도 선택 경로가 필요하다. 이번 구현은 기존 연구용 전달 자료를 다시 계산하거나 새 의미 Claim을 만들지 않고, 공개 함수 `selectR070FamilyResearchTransferForContext(report, expected)`를 추가한다.

`expected`에는 실제 수신 문맥의 `scope`, `snapshotId`, `calculationHash`를 제공한다. 함수는 **외부 요청값과 반환된 R070 원본 보고, 내부 `engineTransferBoundary`의 범위/명식 식별자가 세 곳 모두 일치**할 때에만 동일한 연구용 전달 객체를 반환한다. 다른 인물 명식, 부모 결과의 자녀 메뉴 전용, 동일 명식 ID에 다른 계산 해시 연결은 `TypeError`로 중단한다.

원본 보고가 `researchOnly=true`, `familyT8Admitted=false`, `mayGrantOfficialAuthority=false`, `mayMarkMenuAvailable=false`, `mayPersist=false`, `mayPublish=false`, `maySell=false`인 상태와 내부 전달 객체의 `route=R070_RESEARCH_ONLY_NOT_EXECUTABLE`, `canSelectHistoricalMethod=false`, `canGrantFamilyT8Authority=false`, `canEnableMenu=false`, `canPublishOrSell=false` 경계도 확인한다. 권한 상태가 다르면 **침묵하고 승인 가능한 데이터를 반환하지 않는다**. 반환하는 객체는 기존 `engineTransferBoundary` 그 자체이고 새 source authority, 별도 기둥 선택 정책, T8 규칙 또는 UX 결과가 아니다.

**실계산 회귀:** 남성·여성·성별 미지정, 출생시각 제공·미상 실제 명식에 대해 두 메뉴의 동일 문맥 정상 선택, 메뉴 오연결, 다른 명식 ID, 다른 계산 해시, 외부/내부 권한 플래그 변경의 실패를 다룬다. 선택에 성공해도 `menuBlockingPrerequisites`와 `unassignedConfigurationPrerequisites`의 원래 구분 및 개인별 결핍 경로가 보존된다. 별도의 Production/Official/Reader/Product/Commerce 승인은 발생하지 않는다.

### R070 메뉴 직접 차단 조건과 미배속 구성 연구 조건의 분리

기존 `menuSupportHandoff.missingPrerequisites`는 과거 연구 수신 호환성을 위해 **원문·방법론·공식 권한 차단 조건과 가족 대상이 아직 정해지지 않은 구성 연구 조건을 합친 배열**이었다. 수신 측에서 이것을 모두 메뉴 활성화의 직접 선행조건으로 받아들이면 `CONFIGURATION-OUTCOME`의 `旺衰`·`生旺死絕`·`刑沖破害`·`官煞混雜`·`財印` 전체를 특정 부모/자녀 메뉴에 잘못 결속하게 된다. 그 해석을 막기 위해 다음 두 경로를 별도 반환한다.

- `menuBlockingPrerequisites`: **요청 부모·자녀 메뉴에 이미 결속된** `unsupportedReasons[].missingPrerequisites`의 중복 제거 값만. `R070_FAMILY_T8_OFFICIAL_METHOD_NOT_ADMITTED`을 반드시 포함하고, 원문 적용 성별에서 제외된 후보의 부족 조건은 메뉴 차단 조건으로 재사용하지 않는다. `prerequisiteTrace`는 정확히 이 배열만 인덱싱한다.
- `unassignedConfigurationPrerequisites`: 아직 가족 의미·대상이 선택되지 않은 `unassignedConfigurationSources[].missingPrerequisites`의 중복 제거 값만. 구성 연구에 부족한 조건을 표시할 뿐 특정 부모·자녀 메뉴의 독립적 활성화 요건이라는 뜻은 아니다.

두 배열에 같은 코드가 존재할 가능성은 허용하되 **출처의 귀속 차이**를 유지한다. 기존 `missingPrerequisites`는 이전과 동일하게 두 배열의 순서 있는 집합 합집합으로 남겨 구 연구 소비자에게 호환성을 제공한다. 이 합집합은 **메뉴 승인 체크리스트가 아니다.** `engineTransferBoundary`에도 두 배열을 그대로 전달하며 `route=R070_RESEARCH_ONLY_NOT_EXECUTABLE` 및 모든 `can* = false`를 유지한다.

**회귀:** 부모·자녀, 남성·여성·성별 미지정 및 출생시각 미상 실제 명식에서 두 배열이 각각 원래 `unsupportedReasons`, `unassignedConfigurationSources`의 코드와 정확히 일치하는지, 기존 합집합 및 `prerequisiteTrace`가 보존되는지 확인하는 사례를 추가했다. `CONFIGURATION_OUTCOME_SETTLEMENT` 같은 미배속 연구 조건은 `unassignedConfigurationPrerequisites`에 기록하되 `R070_FAMILY_T8_OFFICIAL_METHOD_NOT_ADMITTED`을 그쪽 조건으로 재분류하지 않는다. 이 변경은 Source Authority, Methodology, T8 가족 해석, 메뉴 제공 및 상거래 허가를 생성하지 않는다.

### R070 엔진 전달 경계 — 계산 입력 부족과 해석 권한 부족을 혼합하지 않음

`evaluateFamilySourceScopeV1(...).engineTransferBoundary`는 이미 존재하는 `menuSupportHandoff`의 연구용 반환값을 **수신 엔진이 오해 없이 구분해서 읽도록** 분류한 인계 표면이다. 새로운 T8 규칙 계산기, 서비스 메뉴 제공 계약 또는 실행 가능한 가족 ClaimGraph 입력이 아니며 `route=R070_RESEARCH_ONLY_NOT_EXECUTABLE`로 고정한다. `sourceSnapshotId`와 `sourceCalculationHash`는 정확히 기존 계산 명식의 `snapshotId`·`calculationHash`를 보존하고, `requestedScope`는 부모·자녀 중 실제 요청한 범위로 남긴다.

| 반환 키 | 기존 정보 출처 | 엔진 전달 시 의미와 금지선 |
| --- | --- | --- |
| `unresolvedCanonicalInputs` | `menuSupportHandoff.unresolvedCanonicalInputs` | 실제로 존재하는 `pillars.*`, `derivedFacts.tenGods.*`, `derivedFacts.hiddenStems.*`의 미해결 경로를 원문별로 중복 제거한 인계. **다른 기둥으로 대체하거나 미상 값을 생성하지 않음** |
| `canonicalInputAndConceptHolds` | `unsupportedReasons` 중 `category=CANONICAL_INPUT` | 미상 시주와 `胎為母`의 태(胎) 계산 개념 미정의를 함께 포착하되 서로 동일한 결핍으로 취급하지 않음. 존재하지 않는 태 계산 경로를 발명하지 않음 |
| `sourceAndMethodHolds` | `SOURCE_APPLICABILITY`, `SOURCE_CONTEXT`, `METHOD_SELECTION` 범주 | 실제 기둥 관측만 허용된 원문, 별 배속 문맥 미확정, 복수 역사적 방법의 선택 미완료. **T5 조회 성공이나 기둥 위치 존재는 가족운 판단으로 승격되지 않음** |
| `officialAuthorityHold` | `R070_MENU_OFFICIAL_FAMILY_T8_NOT_ADMITTED` | 부모·자녀 메뉴에 공통으로 반드시 존재하는 **단일 공식 T8 허가 부재 사유**. 다른 입력이 충족되어도 제거하거나 통과로 해석하지 않음 |
| `excludedHistoricalSources` | `menuSupportHandoff.excludedHistoricalSources` | 현재 명식의 역사적 성별에 적용할 수 없는 원문을 보존. **다른 원문의 필수 계산 입력 부족/메뉴 미지원 근거로 전용하지 않음** |
| `unassignedConfigurationSources` | `menuSupportHandoff.unassignedConfigurationSources` | `旺衰`·`生旺死絕`·`刑沖破害`·`官煞混雜`·`財印`의 가족 해석 미배속 상태. 특정 부모·자녀 의미로 결속하지 않음 |
| `prerequisiteTrace` | `menuSupportHandoff.prerequisiteTrace` | 동일 미충족 코드가 등장한 원문·방법론·계산 경로의 기존 추적 색인. **다수 등장 횟수를 독립 EvidenceSelector 근거로 가산하지 않음** |

이 자료에서 `researchEvidenceMayBecomeFamilyClaim=false`, `canSelectHistoricalMethod=false`, `canGrantFamilyT8Authority=false`, `canEnableMenu=false`, `canPublishOrSell=false`는 모두 **고정된 차단 상태**다. `FamilySourceScopeHandoff` 전체의 `researchOnly=true`, `familyT8Admitted=false`, `mayGrantOfficialAuthority=false`, `mayMarkMenuAvailable=false`, `mayPersist=false`, `mayPublish=false`, `maySell=false`도 유지한다. 연구 자료의 수신·표시는 Production/Commerce/UX·Reader의 메뉴 개방 승인과 무관하다.

**회귀 범위:** 1988·1990·1993년 시각 제공 명식의 부모·자녀 및 1997년 여성 시각 미상 명식에서 각 분류 배열이 원본 `menuSupportHandoff`의 해당 항목과 정확히 일치해야 한다. 역사 남성 명식에서 태(胎) 계산 개념이 없는 경우 `CANONICAL_INPUT` 부족 사유에는 남지만 가짜 `pillars.fetus` 경로는 만들지 않는다. 여성 자녀 시각 미상일 때 `pillars.hour`와 T5/지장간의 각 미확정 경로를 별개 기록하고, 여성 명식에서 적용할 수 없는 `時為子孫`은 제외 목록에만 남긴다. `hiddenStems` 필드 전체가 누락된 경우 연월일시 네 소속 경로를 유지하되 방법론 차단과 합쳐 하나의 승격 판단을 내리지 않는다.

### R070 메뉴 미충족 조건의 원문·방법론 출처 역추적 — 중복 조건은 하나의 코드

`menuSupportHandoff.prerequisiteTrace[]`는 기존 `unsupportedReasons[].missingPrerequisites`의 **실제 코드**를 한 번씩만 반환하고, `origins[]`에 그 코드를 반환한 원래 보류 사유의 `reasonCode`, `category`, `sourceLayerIds`, `sourceSurfaces`, 확정 계산 경로와 미해결 계산 경로를 함께 보존한다. 원문을 새로 채택하거나 미해결 연구 조건에 공식 우선순위를 부여하지 않는다. 동일한 원전 문구나 원국 계산 입력이 여러 방법 대조에 등장해도 `repetitionIsIndependentEvidence=false`이며 `familyMeaningAuthorized=false`다.

이 인덱스는 **실제로 메뉴 요청 범위에 들어온 Source/Methodology/Official 보류 사유**로만 구성한다. 역사적 성별 조건이 맞지 않는 문구는 기존 `excludedHistoricalSources[]`에 남고, 해당 제외 사유는 메뉴를 차단하는 필수 조건으로 간주되지 않는다. `旺衰`·`生旺死絕`·`刑沖破害`·`官煞混雜`·`財印`의 가족 배속 미완료 사항은 기존 `unassignedConfigurationSources[]`로 구분하여 유지하며, 부모/자녀 메뉴 인덱스에 개별 가족 원문처럼 새로 배속하지 않는다.

`R070_FAMILY_T8_OFFICIAL_METHOD_NOT_ADMITTED`은 정확히 하나의 `OFFICIAL_AUTHORITY` 출처를 가져 명식 입력이 완전해도 메뉴가 공식적으로 지원되지 않음을 보존한다. `SECTION_SCOPED_STAR_RELATION_METHOD_NOT_SELECTED`는 부모 원문의 부친/모친 또는 여성 자녀 원문 두 개가 공통으로 사용하는 **미선정 규칙**이지만 원문별 `origins[]`가 그대로 남는다. `CANONICAL_HIDDEN_STEM_MEMBERSHIP_PARTIAL_OR_UNAVAILABLE`은 여성 자녀 시각 미상일 때 각각의 별 원문이 미상 지장간 경로를 참고했다는 것까지만 기록하며, 누락된 지장간을 복구하거나 그 십신을 산출한 것으로 표시하지 않는다.

**회귀:** 1990년 남성·여성·성별 미지정 부모/자녀 명식 및 1997년 여성 시각 미상 명식에서 각 코드의 유일성, 실제 원문·방법 쌍과 확정/미상 경로의 일치, 제외된 원문의 미혼입, 공식 보류의 단일 출처를 대조한다. `prerequisiteTrace`는 `unresolvedCanonicalInputs` 및 `interpretationBlockers`를 대체하지 않는 **검색용 출처 색인**이다. 가족 T8 Claim, Reader 결과, 메뉴 활성화, 저장·공개·판매 권한은 변하지 않는다.

### R070 메뉴 미지원 사유의 계산 입력 누락 경로 — 원문별 중복 제거 인계

`menuSupportHandoff.unresolvedCanonicalInputs[]`는 이미 반환하는 `interpretationBlockers.sourceConditionHolds[]` 가운데 **요청 메뉴의 역사적 적용 범위 안에 있는 원문만** 사용하여 미해결 Canonical 계산 사실을 경로별로 묶는다. 중복된 `unresolvedFactPaths`는 문자열 경로당 한 번만 기록하고, `affectedOriginalSources[]`에 실제 해당 경로를 요구하는 원문별 `sourceLayerId`·`sourceSurface`를 보존한다. 여러 부모/자녀 문구가 동일한 미상 시주를 가리켜도 그것은 **계산 경로 하나를 여러 곳에서 참조한 것**이지 별도의 가족 Claim 여러 건이 아니다.

- `canonicalInputKind=pillar`: `pillars.{slot}`에서 확정되지 않은 기둥. 예: 시각 미상의 `pillars.hour`.
- `canonicalInputKind=visible_t5`: `derivedFacts.tenGods.{slot}.{stem|branch}`의 미해결 현대 T5 조회값.
- `canonicalInputKind=hidden_stem_membership`: `derivedFacts.hiddenStems.{slot}`의 미해결 지장간 **소속 목록**. 분류된 지장간 십신 사실이라는 뜻이 아니다.

`HISTORICAL_SEX_SCOPE_NOT_APPLICABLE`로 제외된 원문은 이 목록의 `affectedOriginalSources`에 포함하지 않는다. `胎為母`처럼 현재 Canonical에 **계산 개념 자체가 없는** 경우에는 존재하지 않는 `pillars.fetus` 등의 허구 경로를 만들지 않고 기존 `R070_MENU_CANONICAL_CONCEPT_NOT_AVAILABLE` 사유에만 남긴다. `substituteAnotherPillarAuthorized=false`, `familyMeaningAuthorized=false`로 고정하며, 누락 입력 경로만 따로 수집했다고 해서 보류된 방법론·역사적 역할 배속·가족운 효과가 승인되는 일은 없다.

**회귀 범위:** 남성·여성·성별 미지정 부모/자녀 명식에서 각 경로와 그 원문 참조 목록을 직접 원래의 `sourceConditionHolds.unresolvedFactPaths`에 대조한다. 출생시각 미상 여성 자녀 명식에서는 `pillars.hour`을 `時為子息`에, 시주 지장간/십신 미해결 경로를 `子嗣者即官星也`·`我生者為子`에 각각 결속하되 성별 범위 밖 `時為子孫`은 제외한다. 선택적 `hiddenStems` 자체가 없는 명식에서는 연·월·일·시 소속 목록의 네 경로를 각자 한 번만 반환한다. 이 인계는 **엔진 연구용 미지원 설명**이지 엔진 계산의 대체 입력이나 메뉴 활성화 신호가 아니다.

### R070 부모·자녀의 실제 해석 차단 사유 — 원문 조건과 방법 선택의 분리

기존 `evaluateFamilySourceScopeV1(snapshot, 'parents'|'children')`는 이미 원전의 정확한 문구·성별 범위·계산 기둥·현대 T5 탐색·지장간 소속·지지충 구조적 후보 및 3중 위치 관찰을 구분한다. 하지만 이 계산 사실만으로 가족 T8의 역할 배속·결과·우선순위를 인정할 근거는 없다. 이번 변경은 **기존 R070 코퍼스와 이미 작성된 methodCandidates/methodCoexistences/crossLayerMethodComparisons/unassignedConfigurationInputs를 재사용**하여 `interpretationBlockers`를 반환한다. 새로운 원전, 의미 Claim, 판정 방법론, 승인 플래그는 만들지 않는다.

`sourceConditionHolds`는 부모의 `月為父母兄弟門戶`, `年為父`, `胎為母`, `父以偏財論`, `母以印綬論` 및 자녀의 `時為子息`, `時為子孫`, `子嗣者即官星也`, `我生者為子` 각각에 대해 **원래 sourceLayerId/sourceSurface/originalSexScope/disposition**을 보존하고 아래 부족 유형을 하나씩 명시한다. 별 관찰을 한 문구는 원래의 T5 확정 경로와 미상 경로를, 지장간 인계가 있는 경우에는 **별도 계산된 지장간 소속 경로**를 기록한다. 미상 시주 등의 기둥 입력도 별개 부족 경로에 포함한다. 경로들이 한 문구에 등장하더라도 가족 의미 근거 수가 늘지는 않는다.

| `blockerKind` | 적용되는 기존 경계 | 이 상태에서 금지되는 승격 |
| --- | --- | --- |
| `HISTORICAL_SEX_SCOPE_NOT_APPLICABLE` | 해당 원문의 남성/여성 역사적 성별 범위가 현재 명식과 불일치·미지정되어 `NARROW_OR_REPLACE` | 별 계산으로 성별 조건을 우회 |
| `CANONICAL_CONCEPT_NOT_AVAILABLE` | 역사적 남성 명식 `胎為母`의 독립 태(胎) 계산 사실이 현재 Canonical에 없음 | 연주·월주로 태를 대체 |
| `REFERENCE_PILLAR_INPUT_UNRESOLVED` | 원문은 기둥을 요구하지만 시각 미상 등으로 그 기둥을 확정하지 못함 | 다른 기둥이나 별 관측으로 해당 기둥 확정 |
| `SOURCE_CONTEXT_METHOD_NOT_SELECTED` | `父以偏財論`·`母以印綬論`·`子嗣者即官星也`·역사 여성 명식의 `我生者為子` 등 실제 T5가 있더라도 특정 장·문맥의 별 배속 방법이 미선정 | 원문 역할 배속·친족 존재/상태/미래 예측 |
| `CALCULATED_PILLAR_POSITION_ONLY` | `月為父母兄弟門戶`·`年為父`·`時為子息`·`時為子孫`의 기둥 계산 위치는 확정 | 기둥 위치를 곧 가족 결과 규칙으로 승인 |

`methodSelectionHolds`는 **관찰 사실의 중복 여부와 별개로 해결되지 않은 원문 방법 선택**을 기록한다. `ALTERNATIVE_PILLAR_DOMAIN_WORDINGS`는 기존 남성 명식의 부모 연주/월주 병용과 자녀 시주 문구 병용을 기존 `methodCoexistences`에서 가져온다. `PILLAR_DOMAIN_VS_STAR_RELATION`은 기존 동일 대상 기둥 배속·별 배속의 교차 방법을 `crossLayerMethodComparisons`에서 가져온다. `FEMALE_CHILD_STAR_RELATION_ALTERNATIVES`는 **역사 여성 명식에서만** `子嗣者即官星也`와 `我生者為子` 둘이 현재 원문 검토 범위에 있을 때 발생한다. 이것은 두 방식의 승패·역사적 모순이 검증되었다는 뜻이 아니라, 현재 원전 문맥에서 **선택/조정 근거가 아직 연결되지 않았다**는 뜻이다. 남성·성별 미지정 명식에 여성 전용 문구를 적용하지 않으며, 시간 미상으로 시주 교차가 불가능한 경우 기둥-별 교차가 없는 상태를 유지한다. 서로 다른 원문을 통해 같은 계산 경로가 여러 번 등장해도 독립 근거를 가산하지 않는다.

`configurationHolds`는 기존 구성 레이어의 정확한 다섯 원문 `旺衰`·`生旺死絕`·`刑沖破害`·`官煞混雜`·`財印`를 **가족 관계 미배속 상태 그대로** 보존한다. 이미 구분한 지지충 구조 후보, 두 T5 조회 그룹의 위치 대조, 지장간 소속 목록을 구성의 고전적 성립·효과로 승격하지 않으며 `familyScopeResolved=false`와 `familyOutcomeAuthorized=false`를 유지한다.

모든 인계 항목은 원래 `missingPrerequisites`를 포함한다. 기존 기둥 사실만 관측된 항목에는 `R070_PILLAR_LOCATION_IS_NOT_FAMILY_OUTCOME_RULE`을, 여성 자녀의 별 배속 복수 원문이 함께 검토되는 항목에는 `R070_CHILD_STAR_RELATION_ALTERNATIVES_NOT_RECONCILED`을 **승인 불가 사유**로 덧붙인다. 이 추가 코드는 원전 문구가 아니라 보류 상태를 설명하는 내부 식별자다. `interpretationBlockers.missingPrerequisites`를 최상위 가족 보고의 부족 조건에 전파한다. `originalTextContradictionEstablished=false`, `interpretationMethodSelected=false`, `independentlyAdmittedFamilyClaims=0`, `familyT8Admitted=false`이다.

**실계산 회귀:** 출생시각을 제공한 남성·여성·성별 미지정 명식의 부모/자녀 메뉴에서 원문 5개 또는 4개와 기존 교차 방법의 갯수 및 범위를 대조한다. 1997-05-15 여성 명식의 출생시각 미상에서는 부모의 월주 위치가 남아 있는 반면 자녀 시주는 확정되지 않고, 자녀의 두 별 배속 원문은 방법 선택이 미해결인 상태로 남는다. 출생시각 미상임에도 자녀의 원문을 승인하거나 상대 가족 구성원의 속성을 새로 생성하는 경로는 없다. 이 자료는 **T8 Official, Reader, Product availability, 저장·공개·판매 허가가 아닌 연구용 인계**다.

### R070 기둥·십신·지지충의 동일 기둥 참조 — 중복 근거 0으로 고정

기존 원문 범위를 유지하면서 `crossLayerMethodComparisons[]`의 **기둥-십신** 두 원문 대조 결과를 `branchClashPillarObservations[]` 중 **같은 기둥 원문·동일 Source Layer ID·같은 기둥 위치**를 가진 실제 `刑沖破害`의 `branch_clash` 입력에 결속한다. `pillarStarClashOverlaps[]`의 각 항목은 다음 **기존 세 원문**을 한 명식의 계산 경로에서 읽는 연구용 자료다. 이 원문들이 동일한 가족 결과를 주장하거나 서로 독립적으로 확증한다는 뜻은 아니다.

- 기둥 원문: 부모의 `月為父母兄弟門戶`(월주), 역사 남성 명식의 `年為父`(연주); 자녀의 `時為子息`(시주), 역사 남성 명식의 `時為子孫`(같은 시주).
- 별 배속 원문: 부모의 `父以偏財論` / `母以印綬論`, 자녀의 `子嗣者即官星也` / 역사 여성 명식의 `我生者為子`. 현대 T5 조회 용어와 원문 적용 규칙의 등가성을 주장하지 않는다.
- 구조 원문: `CONFIGURATION-OUTCOME`의 정확한 `刑沖破害` 중 Canonical에 이미 있는 `kind=branch_clash` 후보만 본다. `刑`·`破`·`害` 또는 충의 영향·강도·해소는 계산한 것으로 표시하지 않는다.

각 항목은 `sourceLayerIds`·`sourceSurfaces` **3개**와 `pillarSlot`·`pillarFactPath`, `visibleT5FactPath=derivedFacts.tenGods`, `structuralFactPath=derivedFacts.structuralRelations`를 갖는다. `observedT5PositionsInPillar`는 원래 `starPillarPositionContrast.inReferencedPillar`의 **실제 확정값/경로**만, `unresolvedT5FactPathsInPillar`는 원래 미확정 경로만 전달한다. `participatingClashes`는 해당 기둥 지지가 직접 참여한 원래 `branch_clash` 후보의 ID·참여자·출처·`semantics.structuralMatchOnly=true`를 유지한다. `outsideClashRelationIds`는 같은 원국에서 다른 기둥에만 걸린 충 후보의 원래 ID를 보존한다. 따라서 기둥 바깥의 지지충은 해당 부모·자녀 문구에 자동 배속하지 않는다.

| `factOverlapState` | 계산 사실의 한정 관찰 | 금지되는 판단 |
| --- | --- | --- |
| `VISIBLE_T5_AND_BRANCH_CLASH_COLOCATED` | 확정된 해당 기둥의 현대 T5 별 그룹과 지지충 후보 참여가 함께 관찰 | 같은 위치니까 부모·자녀 사건·관계/갈등이 발생한다는 가족 T8 |
| `VISIBLE_T5_WITHOUT_REFERENCE_BRANCH_CLASH` | 그 기둥에는 별 조회값이 있으나 충 참여 후보는 미관찰 | 좋은 가족운/충이 없다는 전면 단정 |
| `REFERENCE_BRANCH_CLASH_WITHOUT_VISIBLE_T5` | 그 기둥 지지는 충 후보에 참여하나 해당 현대 별 조회는 미관찰 | 친족 별·친족 관계의 부재/악화 |
| `NO_VISIBLE_T5_OR_REFERENCE_BRANCH_CLASH` | 현재 확정된 조회 표면에는 둘 다 미관찰 | 모든 형충파해·지장간·가족 사건이 없다는 결론 |
| `INCOMPLETE_FACT_INPUTS` | T5 해당 기둥의 값 또는 구조 관계 후보가 미확정 | 부족한 값을 다른 기둥으로 대체해 확정 판정 |

원래 교차 대조가 만들어진 경우에만 3중 관찰을 생성한다. 즉, 시주가 미상인 자녀 명식에서는 시주 기둥의 역사 원문+T5 교차 자체가 성립하지 않아 해당 자녀 3중 관찰은 **빈 배열**이다. 시주 미상으로 T5가 전체 미해결이더라도 월주가 확정된 부모 방법의 기둥-별 대조는 미해결 경로를 유지하며 `INCOMPLETE_FACT_INPUTS`로 남는다. 역사적 성별 범위를 벗어난 원문은 새로운 3중 관찰로 추가하지 않는다.

`tripleLayerFactReuse`는 계산 사실을 `uniqueVisibleT5FactPaths`와 `uniqueBranchClashRelationIds`로 **원래 경로·ID 기준 중복 제거**한다. 같은 값이 서로 다른 역사 원문쌍에 중복 등장하면 `repeatedVisibleT5FactPaths`와 `repeatedBranchClashRelationIds`에 별도 기록한다. 동일한 시주를 `時為子息`과 `時為子孫`이 함께 조회하거나, 연월 지지충을 여러 부모 원문이 관찰하더라도 **서로 다른 독립 근거 2건이 되지 않는다.** 목록의 `unique`는 계산 참조 중복 제거일 뿐 의미 Claim 승인이나 T8 EvidenceSelector 가중치가 아니다.

모든 3중 항목의 `crossLayerMethodReconciled=false`, `configurationEffectAuthorized=false`, `independentFamilyEvidenceWeightAssigned=false`, `independentlyAdmittedFamilyClaims=0`, `familyT8Admitted=false`이며, 중복 요약도 `distinctHistoricalSourceCountIsEvidenceWeight=false`, `independentlyAdmittedFamilyClaims=0`이다. 결핍은 `R070_PILLAR_STAR_CLASH_TRIPLE_SYNTHESIS_NOT_SOURCED`, `R070_SHARED_CALCULATION_FACT_IS_NOT_MULTIPLE_FAMILY_CLAIMS`, `FAMILY_METHOD_SELECTION`, `CONFIGURATION_OUTCOME_SETTLEMENT`을 포함한다. 입력 일부가 미해결이면 `R070_TRIPLE_LAYER_CANONICAL_INPUTS_PARTIAL`을 추가하고 원래 기둥-십신/지지충 개별 미충족 코드도 남긴다.

**실계산 회귀:** 1988·1990·1993·1997·2001년 5월의 실제 계산 명식에서 각 3중 항목의 세 원문, 원본 T5 위치·지지충 참여자/ID, 중복 제거된 경로·ID가 원래 두 관찰과 정확히 일치하는지 검사한다. 1997-05-15 여성 시각 미상 명식은 부모의 월주 부분 관찰과 자녀 시주의 교차 미생성을 대조한다. **원전에서 승인된 삼중 합성 규칙은 없음**을 명시하며, 모든 경우 `interpretationDisposition=INCONCLUSIVE`, `researchOnly=true`, Official/메뉴 제공/보관/공개/판매 `false`를 보존한다.

### R070 기둥 배속과 십신 배속의 교차 적용 범위 — 근거 이중계산 금지

`crossLayerMethodComparisons`는 **이미 연구용으로 등록된 원문 2개를 실제 자기 명식의 서로 다른 계산 입력에 연결**하지만, 두 방법이 같은 가족 주장을 지지하거나 서로 충돌한다는 새로운 고전적 결론을 만들지 않는다. 대상별 정확한 원문쌍은 다음과 같다.

| 가족 대상 | 기둥 원문 / 확인 경로 | 별 배속 원문 / 현대 T5 조회 경로 | 비교 자체의 경계 |
| --- | --- | --- | --- |
| 부모 | `月為父母兄弟門戶` / `pillars.month` | `父以偏財論`, `母以印綬論` / `derivedFacts.tenGods` | 어느 특정 부·모의 성격·관계·존재도 결론 내리지 않음 |
| 부모, 역사적 남성 명식만 | `年為父` / `pillars.year` | `父以偏財論` / `derivedFacts.tenGods` | 연주와 편재를 같은 부친 판단의 상호 확증으로 계산하지 않음 |
| 자녀 | `時為子息` / `pillars.hour` | `子嗣者即官星也` / `derivedFacts.tenGods` | 자녀 수·성별·미래 결과로 추론하지 않음 |
| 자녀, 역사적 여성 명식만 | `時為子息` / `pillars.hour` | `我生者為子` / `derivedFacts.tenGods` | 관성 방법과 식상 방법 사이 승자나 우선순위를 가정하지 않음 |
| 자녀, 역사적 남성 명식만 | `時為子孫` / `pillars.hour` | `子嗣者即官星也` / `derivedFacts.tenGods` | 같은 시주 사실 및 별 배속 원문을 여러 가족 Claim으로 중복 계산하지 않음 |

비교는 **기둥 입력이 확정되고, 별 배속 원문이 해당 역사적 성별 맥락에서 배제되지 않았을 때만** 만들어진다. 십신 계산이 미완전하더라도 기존 확인된 별 사실과 `unresolvedFactPaths`는 보존하고, `TEN_GOD_CANONICAL_FACTS_NOT_FULLY_RESOLVED`를 반환한다. 미상 시각으로 시주가 확정되지 않으면 자녀 교차 비교는 생성하지 않고 원래 각 방법의 입력 부족 사유를 유지한다.

각 교차 항목의 `sourceLayerIds`·`sourceSurfaces`·`pillarObservation`·`starObservation`은 기존 R070 코퍼스 및 Canonical fact-path를 그대로 가리킨다. `independentlyAdmittedFamilyClaims=0`, `methodSelectionAuthorized=false`, `familyMeaningAuthorized=false`, `state=PILLAR_AND_STAR_METHODS_NOT_RECONCILED`이며, 계속 필요한 최소 조건은 `FAMILY_METHOD_SELECTION`, `PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION`, `HIDDEN_VS_VISIBLE_STAR_HANDLING`, `HISTORICAL_TO_MODERN_FAMILY_TRANSLATION_NOT_ESTABLISHED`이다. 별이 보이는 경로에서 관찰되지 않는 경우는 가족 구성원 부재의 증거가 아니다.

### R070 같은 가족 대상의 기둥·십신 **위치 일치 여부** — 계산 가능한 반례를 인계

기존 R070 원문 **그대로** `PILLAR-DOMAIN-GENERAL`(`月為父母兄弟門戶` / `時為子息`), `PILLAR-DOMAIN-MALE-ALTERNATE`(`年為父` / `時為子孫`), `TEN-GOD-FAMILY-RELATIONS`(`父以偏財論` / `母以印綬論` / `子嗣者即官星也`), `FEMALE-CHILD-RELATION`(`我生者為子`)을 사용한다. **기존 Source Layer ID는 새 source가 아니고**, 이들 원문에는 '가족 기둥 내부에 해당 십신이 있으면 가족 T8 의미가 성립한다'거나 '기둥 외부면 성립하지 않는다'는 위치 결합·선택·상충 해소 규칙이 등록되어 있지 않다. 따라서 직접 가족 Claim을 만드는 대신 **계산 위치 대조와 방법론 결핍을 분리**한다.

`crossLayerMethodComparisons[].starPillarPositionContrast`는 원래 비교의 `pillarObservation.factPath`가 `pillars.year|month|hour` 중 어느 것인지 확인한 후, 같은 명식의 기존 `starObservation.observedPositions`를 그 기둥 안(`inReferencedPillar`)과 다른 기둥(`outsideReferencedPillar`)으로 **값을 바꾸지 않고 분할**한다. `unresolvedReferencedPillarPaths`는 동일한 기둥의 `derivedFacts.tenGods.{slot}.stem|branch` 경로 중 미확정 값이다. 각 위치의 정확한 별 이름·채널·기둥과 `calculationHash`는 원래 결과를 유지한다.

| 계산 대조 상태 | 엔진에 전달하는 사실 | 아직 발행할 수 없는 주장 |
| --- | --- | --- |
| `STAR_OBSERVED_IN_REFERENCED_PILLAR` | 그 기둥의 **천간·지지 대표** T5 조회 범위에 해당 현대 십신이 실제 존재 | 같은 위치라는 이유로 R070 기둥 배속과 친족 별 배속을 합성한 가족 T8 |
| `STAR_OBSERVED_ONLY_OUTSIDE_REFERENCED_PILLAR` | 해당 기둥에는 관측되지 않고 **다른 기둥의 확정 위치**에 관찰 | 기둥 바깥 십신만 있다는 이유로 부모·자녀의 부재·불화 등 음성 판정 |
| `REFERENCED_PILLAR_T5_UNRESOLVED` | 해당 기둥의 T5 채널 미해결, 해석용 위치 대조 자체가 불완전 | 누락 경로를 임의 보충하거나 다른 기둥의 관찰로 대체 |
| `STAR_NOT_OBSERVED_IN_RESOLVED_T5_SURFACE` | 확인한 현행 T5 조회 표면에는 해당 계열 미관찰 | **지장간 포함 부재 판정**, 가족 구성원·관계의 부재 주장 |

이 네 상태는 **R070 원전이 정한 의미 등급이 아니라 현재 계산 사실의 위치 상태**다. 현재 T5 조회는 **visible stems + representative branch**에만 해당하므로 `locationBasedFamilyInferenceAuthorized=false`다. 같은 기둥의 관찰값이 있어도 `R070_PILLAR_STAR_LOCATION_SYNTHESIS_RULE_NOT_SOURCED`가 반드시 남고, 기둥 외부에서만 보이면 `R070_OUTSIDE_PILLAR_T5_IS_NOT_NEGATIVE_FAMILY_EVIDENCE`, 전혀 관찰되지 않으면 `R070_UNOBSERVED_T5_IS_NOT_RELATIVE_ABSENCE`, 참조 기둥 T5가 미확정이면 `R070_REFERENCED_PILLAR_T5_POSITION_UNRESOLVED`를 추가한다. 각 결핍은 원래 개별 교차 비교와 최상위 `missingPrerequisites`에 제공되며, **기존** `FAMILY_METHOD_SELECTION`, `SEX_SCOPE_SELECTION`, `PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION`, `HIDDEN_VS_VISIBLE_STAR_HANDLING`, `CONFIGURATION_OUTCOME_SETTLEMENT`, `HISTORICAL_TO_MODERN_FAMILY_TRANSLATION`의 권한을 해소하지 않는다.

**실제 명식 반례:** 기존 계산 엔진의 양력 1990-05-15 남성, 1997-05-08 여성, 2001-05-24 미지정, 1988-05-11 여성 명식(14:30, 현재 테스트 정책)에서 R070의 부모·자녀 비교별로 참조 기둥 안/밖에 실제 십신 계산값이 위치하는 경우를 각각 검사한다. 역사적 남성 `年為父`와 일반 `月為父母兄弟門戶`는 **서로 다른 연·월주**이므로 동일한 별 관찰도 각각 별개로 대조한다. 여성 `我生者為子`는 여성 범위에서만 시주와 대조한다. 1997-05-15 여성 명식의 **시각 미상** 반례에서는 `時為子息` 시주 미확정이므로 자녀 교차 비교는 생성하지 않지만 부모의 **월주 대조는 유지**하며, 전체 T5 미완전 원인인 `derivedFacts.tenGods.hour.stem|branch`도 삭제하지 않는다.

**엔진 연결:** `evaluateFamilySourceScopeV1(snapshot, 'parents'|'children')`의 기존 `methodCandidates → crossLayerMethodComparisons` 결과 아래 위치 대조를 그대로 read-only 소비할 수 있다. `sourceLayerIds`·`sourceSurfaces`·`snapshotId`·`calculationHash`·원본 T5 fact path로 기존 Registry/ClaimGraph/EvidenceSelector에 **추후 승인된 규칙의 입력 자료**만 인계한다. 현재 **결론**은 `state=PILLAR_AND_STAR_METHODS_NOT_RECONCILED`, `independentlyAdmittedFamilyClaims=0`, `familyT8Admitted=false`, `researchOnly=true`, Official/메뉴 available/저장/공개/판매 모두 `false`이며, 새 원전/MethodologyDefinition/RuleDefinition/Production 권한을 발행하지 않는다.

### 형제 관련 원문은 부모·자녀 방법으로 변환하지 않음

기존 R070의 `月為兄弟`는 `PILLAR-DOMAIN-MALE-ALTERNATE`에, `兄弟者即劫財比肩`는 `TEN-GOD-FAMILY-RELATIONS`에 있는 **형제 관련 원문**이다. 이 둘은 같은 R070 안에 있더라도 현재 사용자 메뉴의 `family:parents` 또는 `family:children` 의미 근거로 사용하지 않는다. 연구 반환 `excludedSiblingSourceSurfaces`는 두 원문·레이어 ID·원본 성별 범위와 `admittedAsParentsOrChildrenSource=false`를 명시한다.

월주 원문 `月為父母兄弟門戶`에 `兄弟`가 함께 들어 있다는 사실도 부모 관계의 형제 운세를 승인하지 않는다. 형제라는 별도 대상의 독립 ReadingIntent/출처·방법론·입력이 없는 상태에서 이를 부모·자녀 결과 문장으로 확장하거나 가족 구성원의 특성으로 단정하지 않는다.

### 부모·자녀 T8 엔진 인계

**엔진에서 사용할 수 있는 것:** 요청 범위별 위의 조건부 원문 대응, 정확한 원국 사실 경로, 시각 미상·남성/여성/미지정 스코프별 부적합 사유. 계산 위치와 원문을 소비자에게 설명하더라도 **연구용 배속 관찰**이라는 경계만 유지한다.

**추가 근거가 없으면 보류할 것:** R070 `FAMILY_METHOD_SELECTION`, `SEX_SCOPE_SELECTION`, `PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION`, `HIDDEN_VS_VISIBLE_STAR_HANDLING`, `CONFIGURATION_OUTCOME_SETTLEMENT`, `HISTORICAL_TO_MODERN_FAMILY_TRANSLATION`. 이 조건들을 충족하는 직접 소스·조건부 적용 규칙·충돌 해결 근거가 없으면 `family:parents`와 `family:children`의 **의미 T8는 각 범위에서 INCONCLUSIVE/HOLD**다. 한 범위의 사실을 다른 가족 구성원의 풀이로 전용하지 않는다.

## 두 명식 T10: 현재 R068/R069로 가능한 것과 불가능한 것

- R068의 `三合六合相和，友善五湖四海`는 기존 문서에서 **사회·친교** 주제로 묶이며, `羊刃逢傷官七煞，骨肉親友傷情`도 특정 친족/친구 조건의 문구다. `六合/三合`의 결과는 `相生/相剋` 및 `吉神/凶神`에 따라 달라지므로 두 명식 간 고정 길흉·배우자 궁합 점수로 환산할 수 없다.
- R069의 `日為己身妻妾`, `四柱內有我克者為妻`, `克我者為夫`는 **역사 성별을 가진 한 사람 명식의 배우자 논의**다. 직접 **두 사람을 비교한 적합도·결혼 결과**를 승인하지 않는다.
- 연구 입력으로 두 사람의 원국 `year/month/day/hour` 동일 위치 계산값을 비교해 `same/different/incomplete`를 반환하지만, 이는 **T0 계산 사실의 값 비교**다. 합·충 관계, 우열·궁합 의미, 길흉·결혼·이혼·자녀·외모·성격·시기를 도출하지 않는다. 서로 다른 사람의 계산 hash가 동일할 수도 있으며 점수로 사용하지 않는다.
- T10로 실제 옮기려면 **상대 두 사람을 대상으로 하는 직접 source 문구·짝별 적용조건·상호작용 규칙 및 우선순위/충돌 처리·미상시각 시나리오·원전 성별/관계 범위·대칭성 요구 여부**가 각각 결박된 독립적 방법론과 반례가 필요하다. 현행 R068/R069에는 이런 source-qualified 규칙이 없다.
- 결론: 이번 연구 자료의 T10 판정은 `INCONCLUSIVE`, `pairwiseT10Admitted=false`. 두 개별 T8 관계풀이를 병치하는 화면은 상대 **서로에 대한** 궁합풀이로 승격되지 않는다.

### 원문별 T10 미충족 조건 인계

`comparedSourceSurfaces`는 기존 R068/R069의 **원래 `claim.id`**, 정확한 원문, 원래 도메인, R069의 역사적 성별 범위, 조항별로 필요한 기존 연구 공백 코드를 보존합니다. R068 사회·친구/친족 문구에는 `SOCIAL_VS_KIN_SCOPE`, `ROMANCE_TRANSFER_EVIDENCE`가 부족하며, 구성 효과의 조건부 문구에는 추가로 `CONTEXT_EFFECT_SETTLEMENT`, `MULTI_RELATION_CONFLICT`가 빠져 있습니다. R069은 한 명식에 관한 `HISTORICAL_GENDER_SCOPE`, `MODERN_PARTNER_TRANSLATION`, `PAIRWISE_COMPATIBILITY_BRIDGE`가 충족되지 않으며 구성 판정에 `SPOUSE_STAR_CONTEXT_SETTLEMENT`이 추가됩니다.

이 코드들은 **R068/R069에 이미 있는 실행 공백**이며, 독자적 두 사람 궁합 규칙을 만들었다는 뜻이 아닙니다. 임의 점수·혼인·이혼·좋고 나쁨으로 변환하지 않습니다. 두 사람 입력 순서를 바꾼 회귀에서도 비교의 T0 동일성만 유지하고 T10은 양방향 모두 `INCONCLUSIVE`입니다. 두 사람의 원본 `snapshot.scenarios[].scenarioId`, `completeness.ambiguousPaths`, `completeness.unavailablePaths`는 각각 `subject`와 `target` 아래 별개 배열로 넘깁니다. 대상 순서가 바뀌면 각자의 배열 소속만 바뀌며, 그 시나리오들의 교차 조합을 자동 생성하거나 하나의 확정 궁합 판정으로 합치지 않습니다.

### R068: 기존 三合六合 구조가 있어도 두 명식 사이의 합은 아니다

기존 R068의 `SOCIAL-FRIENDLINESS-SANHE-LIUHE`와 `COMBINATION-CONTEXT-VARIANCE` 원문에 한하여 `singleChartCombinationObservations`를 추가했습니다. 각 인물의 `derivedFacts.structuralRelations`가 `resolved`일 때 그 인물 **자신의 원국 내부에서 계산된** `branch_six_combination`·`branch_three_combination` 후보 ID, kind 및 기존 sourceIds를 그대로 반환합니다. 이 배열은 항상 `subject`와 `target`을 나눈 고정 길이 두 개로 구성되며, 서로 다른 명식의 지지 사이에 임의 합 관계를 계산하거나 사실로 주장하지 않습니다.

`SOCIAL-FRIENDLINESS-SANHE-LIUHE`는 사회적 교류에 관한 문구이며 두 사람의 연애 궁합으로 승격되지 않습니다. `COMBINATION-CONTEXT-VARIANCE`에는 오행 생극·길흉 맥락이 필요하지만 기존 개별 명식의 합 구조 후보만으로 그 효과가 확정되지 않습니다. `KIN-FRIEND-BOND-HARM-CONFIGURATION`에는 별도의 `羊刃`·`傷官`·`七煞` 및 친족/친구 해석 조건이 필요하므로 임의의 `singleChartCombinationObservations`를 결속하지 않습니다. 모든 관찰은 `socialOutcomeAuthorized=false`, `pairwiseMeaningAuthorized=false`입니다.

### R068: 羊刃逢傷官七煞 조건의 부분 관찰과 명확한 중단점

`KIN-FRIEND-BOND-HARM-CONFIGURATION`의 기존 정확한 문구는 `羊刃逢傷官七煞，骨肉親友傷情`이다. 이것은 **羊刃·傷官·七煞 세 용어와 서로의 조건부 배치 및 친족·친구라는 역사 문맥**을 요구한다. 현재 Canonical에는 이 문구의 양인(羊刃) 검출을 승인한 계산 사실이나 세 조건의 결합 방법론이 없다. **상관·편관 계산값이 단독 또는 동시에 관측돼도 원문의 조건 충족, 친족 관계 손상, 인간관계 결과를 단정하지 않는다.**

이번 연구는 `singleChartKinConditionObservations`에 각 인물의 **자기 명식 내부** `derivedFacts.tenGods`만 두 원문 탐색어별로 보존한다. `傷官`은 현재 계산상 `상관`, `七煞`은 `편관`의 **현대 T5 조회용 레이블**로 연결하되, 이것만으로 고전 용어의 역사적 적용 조건이나 원래 판단 방법의 등가성을 승인하지 않는다. 관측된 천간·지지 대표 십신 경로와 미상 경로를 기록하고, 다른 방법·지장간 및 세부 맥락은 여전히 미확정으로 남긴다. `yangrenInput=not_defined_by_canonical`, `conjunctionOfTermsEstablished=false`, `historicalKinFriendContextEstablished=false`, `natalKinOutcomeAuthorized=false`, `pairwiseMeaningAuthorized=false`를 고정한다.

부족 조건: `YANGREN_CANONICAL_INPUT_NOT_DEFINED`·`R068_THREE_TERM_CONJUNCTION_METHOD_NOT_SELECTED`·`KIN_FRIEND_CONTEXT_AND_POLARITY_NOT_SETTLED`·`SOCIAL_VS_KIN_SCOPE` 및 시각 미상 등의 `R068_TEN_GOD_OBSERVATIONS_PARTIAL`. 한 사람 안에서의 상관·편관 관찰은 다른 사람과의 친밀감·갈등·궁합 해석으로 복사하지 않는다.

### R069: 실제 두 인물의 역사적 성별을 개별 원문 조건에 적용

기존 R069은 남성 명식의 `日為己身妻妾`·`四柱內有我克者為妻`, 여성 명식의 `克我者為夫`, 그리고 남성 명식의 `日坐財 / 財旺` 계열에 속하는 **한 사람 명식**의 원문이다. 이를 두 인물에게 적용할 때 어느 사람의 명식에서 원문상 범위가 맞는지 구분하기 위해 `comparedSourceSurfaces[].oneChartScopeObservations`에 **subject와 target을 따로** 기록한다.

- `historicalScopeMatch`: `matched` / `mismatched` / `unspecified`. 실제 자기 명식의 `input.sexForTraditionalCalculation`와 해당 **R069 원문**의 역사 성별 표지만 비교한다. 두 사람의 연애 성별이나 관계 유형을 추정하지 않는다.
- `DAY_DOMAIN`은 범위가 맞고 `pillars.day`가 확정된 경우 `BOUNDED_FACT_OBSERVED`와 관측 경로만 반환한다. 이 사실은 `배우자궁의 개인적 의미`가 아니다.
- 남성 `四柱內有我克者為妻`의 계산용 관찰 그룹은 재성(`편재/정재`), 여성 `克我者為夫`의 관찰 그룹은 관성(`편관/정관`)의 **현재 Canonical T5 분류**를 조회한다. 실제 계산된 `derivedFacts.tenGods.{pillar}.{stem|branch}` 값과 경로만 수집한다. 당사자의 부부 관계나 상대 명식 적합도 판정 근거는 아니다.
- `CONFIGURATION_LEVEL`은 `旺衰`·일지/재성 구성 방법론이 아직 승인되지 않았으므로 성별이 맞더라도 `INCONCLUSIVE`로만 반환한다. 확정된 시주 입력이 없거나 별의 입력 경로가 하나라도 미상인 경우 `R069_TEN_GOD_INPUT_PARTIAL`을 남긴다. 관찰되지 않은 별은 배우자 부재를 뜻하지 않는다.
- **모든 원문에서 `oneChartSpouseMeaningAuthorized=false`, `pairwiseMeaningAuthorized=false`이다.** `historicalScopeMatch=matched` 또는 `BOUNDED_FACT_OBSERVED`는 원문 배속·명식 계산이 대응한다는 한정 관찰이지 공식 배우자 운세나 현대 연애·궁합 T10의 승인 신호가 아니다. 남성↔여성 입력 순서를 바꾸면 역사적 범위 결과가 자기 인물에 따라 함께 옮겨질 뿐, 두 사람에게 관계 결론을 적용하는 교차 합성 규칙은 발생하지 않는다.

## 실제 명식 회귀·책임 범위

`test/family-pair-source-scope-handoff.test.ts`는 실계산 명식에 대해 미지정·남성·여성의 부모/자녀 source surface 차이, 태 계산 부재, 시간 미상으로 시주 판단이 멈추는 조건, 서로 다른 두 출생값과 동일 명식 두 인물 비교, 출처의 T10 변환 거부, 정책/동일 인물 입력 오류 및 반복 실행 재현성을 검증한다.

**Research 반환 결과:** `APPLICABLE_BOUNDED`는 명식·원문 **위치 관찰에 한정**, 자녀의 여자 명식 별 배속·부모의 별 배속은 `INCONCLUSIVE`, 역사 성별 불일치는 `NARROW_OR_REPLACE`, R069 한 명식 결론→두 명식 T10 전용은 `REJECTED`. **새 의미 T8/T10이 승인됐다고 하지 않는다.**

**Saju 엔진 수신 작업:** 이미 열려 있는 #2669(부모/자녀 별 화면), #2671(두 사람의 각자 관계풀이), #2675(관계 다중 근거 표시)를 수정·덮어쓰지 않는다. 엔진은 필요하면 위 반환값을 기존 Source/Methodology·ClaimGraph·EvidenceSelector 계약에 재사용하되, 근거 없는 의미 T8/T10를 발행하지 않고 개인별 부족 사유만 반영한다. Reader/Commerce/Bridge·Production 권한은 기존 소유 트랙에서 별도 판단한다.
