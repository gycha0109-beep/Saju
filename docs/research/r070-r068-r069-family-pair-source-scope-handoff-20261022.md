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

### R070 官煞混雜·財印의 T5 조회용 관찰 (효과·방법 미승인)

`官煞混雜`은 원문에 있는 `官`·`煞`의 각각에 대해 현행 Canonical T5의 **정관·편관 계산값을 찾아본 경로**만 기록한다. 두 관성이 관찰되더라도 그것을 고전적 `混雜`의 성립, 길흉, 부모·자녀의 상태로 확정하지 않는다. 이 원문이 요구할 수 있는 지장간·강약·구조·충돌 기준과 방법론 선택은 미확정이다.

`財印`도 현행 T5의 편재·정재(財), 편인·정인(印)에 대한 **관찰값·불명확 경로**만 `tenGodSearchTerms`에 기록한다. 계산된 두 계열이 동시에 있음을 `財印` 구성의 작동 효과로 판단하거나 재성=부친·인성=모친으로 전용하지 않는다. 두 문구 모두 `canonicalObservationCoverage=visible_t5_search_categories_only`일 때도 `configurationMeaningAuthorized=false`, `familyOutcomeAuthorized=false`, `familyScopeResolved=false`, `disposition=INCONCLUSIVE`를 고정한다. `旺衰`와 `生旺死絕`는 현재 해석 가능 계산 입력이 없어 `none`으로 유지한다.

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
