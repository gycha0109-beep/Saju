# FR312B — 직접 규칙 관찰 연구 후보 선별

## 목적

FR312A는 전통 직접 규칙 230건을 모두 `conditional_binding_candidate`로 남겼다.

FR312B는 이 230건을 실제 중립 관찰 연구 관점에서 다시 분류한다.

이번 단계에서 자동 전통 의미 연결은 승인하지 않는다.

## 분류

### single_region_surface_candidate

다음 조건을 모두 만족한다.

- 원문 규칙 certainty가 direct_clear
- observation kind가 명시적으로 morphology
- 단일 부위 규칙
- 같은 부위에 FR293 canonical extractor가 실제 구현된 중립 관찰면이 하나 이상 존재
- FR311Q 영구 미지원 제품 추론 대상이 아님

이 상태는 **동치성이 입증됐다는 뜻이 아니다.**

후속 단계에서 원문 전통 조건과 중립 관찰 정의를 비교할 수 있는 연구 후보라는 뜻이다.

### construct_mapping_required

현재 같은 부위에 구현된 neutral observation은 있지만, 전통 규칙의 observation kind가 구조화되어 있지 않다.

주로 기존 eyebrow / eye / nose 계층처럼 이전 단계에서 직접 규칙 의미는 정리됐지만 관찰 구성 종류가 별도 필드로 동결되지 않은 경우다.

이 규칙들은 먼저 전통 표현의 관찰 구성 자체를 구조화해야 한다.

### observation_surface_gap

전통 규칙의 관찰 종류는 알려져 있지만, 현재 FR293에서 대응 연구를 시작할 수 있는 구현된 중립 관찰면이 없다.

예:

- 색
- 표면 흔적
- 주름/선
- 귀의 가시 경계
- 귀 상대 위치
- 귀 털
- 아직 미구현된 appearance/visibility surface

같은 경우가 여기에 포함될 수 있다.

### manual_context_or_behavior_only

cross-region context 또는 dynamic behavior처럼 단일 정지 이미지 중립 형상값으로 자동 후보화하지 않는 규칙이다.

관계/행동을 독립적인 morphology 값들로 합성하지 않는다.

### phrase_uncertain_manual_only

원문 문구 경계가 불확실한 규칙이다.

관찰면이 있어도 수동 검토가 먼저다.

### binding_prohibited

FR311Q에서 제품 조회/추론 경로를 영구 미지원으로 판정한 의미 근거가 포함된 규칙이다.

FR312B가 이 경계를 재개방하지 않는다.

## 전수 분류 결과

230건의 직접 규칙을 구조적으로 분류한 결과:

| 판정 | 수량 |
|---|---:|
| 단일부위 관찰면 연구 후보 | 68 |
| 관찰 구성 매핑 선행 필요 | 46 |
| 현재 관찰면 부족 | 81 |
| 문맥/행동 수동 전용 | 6 |
| 불확실 문구 수동 전용 | 29 |
| 직접 연결 금지 | 0 |
| 합계 | 230 |

따라서 FR312C로 넘길 수 있는 **실증 연구 후보 풀은 68건**이다.

이 68건도 자동 전통 의미 연결이 승인된 것이 아니다. 단지 현재 구현된 중립 관찰면을 사용해 원문 조건과의 동치성 연구를 설계할 수 있는 최소 구조 조건을 충족한 것이다.

`binding_prohibited = 0`인 이유는 FR311Q의 영구 미지원 18건이 현재 230개 direct rule 집합에는 포함되지 않기 때문이다. FR311Q에 존재하는 direct-rule gap은 별도 복합 주제 처리 대상이며, 이번 shortlist가 민감 추론 경계를 재개방하지 않는다.

## 중립 관찰 후보 매핑 원칙

FR312A의 동일 부위 neutral feature 후보를 재사용한다.

단, observation kind에 따라 후보를 좁힌다.

- morphology: 동일 부위 관찰면
- color: color 관찰면만
- hair: hair/density 관찰면만
- front_visibility: visible-boundary 관찰면만
- surface mark / wrinkle / dynamic behavior / cross-region context / relative position: 현재 자동 후보 없음

동일 부위에 관찰면이 있다는 사실은 전통 개념과의 동치 증거가 아니다.

## 임계값

FR312B는 원문 문장을 보고 임의로 다음과 같은 판단을 하지 않는다.

- 크다/작다 → ratio threshold 필요
- 길다/짧다 → percentile 필요
- 높다/낮다 → population norm 필요

따라서 모든 규칙에 대해:

- thresholdNeedAdjudicated = false
- metricThresholdAuthorized = false
- populationNormAuthorized = false

를 유지한다.

실제 임계값 필요 여부는 shortlist 중 개별 규칙을 원문·측정 정의 단위로 검토하는 후속 단계에서만 판정한다.

## shortlist 의미

`FR312B_SHORTLIST`는 자동 판정기 후보 목록이 아니다.

다음 단계에서 확인할 수 있는 연구 대기열이다.

각 항목은 계속 다음을 요구한다.

- source-grounded equivalence definition
- observation validation evidence
- 별도 threshold 필요 여부 판정
- automaticTraditionalBindingAuthorized = false

## 유지 경계

FR312B에서 계속 금지:

- provider landmark → 전통 용어 직접 연결
- 명명형 자동 분류
- direct rule 자동 추론
- cross-region 자동 합성
- dynamic behavior 자동 추론
- 임의 threshold
- threshold tuning
- population norm
- score/rank
- Product interpretation
- 현대 과학 사실화

## 종료 조건

A. 직접 규칙 230건 전수 분류  
B. 분류 누락/중복 0  
C. 자동 직접 연결 승인 0  
D. shortlist는 direct-clear + morphology + 구현 관찰면 조건만 허용  
E. observation kind 미구조화 규칙 자동 shortlist 0  
F. context/dynamic/uncertain/영구미지원 경계 유지  
G. threshold 필요 여부 추정 0  
H. FR312A 및 FR311P/Q 기준선 무변경  
I. 표준 CI + Face Reading CI + 통합 검증 PASS
