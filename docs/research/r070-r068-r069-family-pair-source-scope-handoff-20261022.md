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

## 실제 명식 회귀·책임 범위

`test/family-pair-source-scope-handoff.test.ts`는 실계산 명식에 대해 미지정·남성·여성의 부모/자녀 source surface 차이, 태 계산 부재, 시간 미상으로 시주 판단이 멈추는 조건, 서로 다른 두 출생값과 동일 명식 두 인물 비교, 출처의 T10 변환 거부, 정책/동일 인물 입력 오류 및 반복 실행 재현성을 검증한다.

**Research 반환 결과:** `APPLICABLE_BOUNDED`는 명식·원문 **위치 관찰에 한정**, 자녀의 여자 명식 별 배속·부모의 별 배속은 `INCONCLUSIVE`, 역사 성별 불일치는 `NARROW_OR_REPLACE`, R069 한 명식 결론→두 명식 T10 전용은 `REJECTED`. **새 의미 T8/T10이 승인됐다고 하지 않는다.**

**Saju 엔진 수신 작업:** 이미 열려 있는 #2669(부모/자녀 별 화면), #2671(두 사람의 각자 관계풀이), #2675(관계 다중 근거 표시)를 수정·덮어쓰지 않는다. 엔진은 필요하면 위 반환값을 기존 Source/Methodology·ClaimGraph·EvidenceSelector 계약에 재사용하되, 근거 없는 의미 T8/T10를 발행하지 않고 개인별 부족 사유만 반영한다. Reader/Commerce/Bridge·Production 권한은 기존 소유 트랙에서 별도 판단한다.
