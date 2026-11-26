# FR312A — 중립 관찰값 ↔ 전통 의미 연결 권한 감사

## 1. 목적

FR311Q까지 전통 관상 의미 연구 계층은 다음 기준선으로 닫혔다.

- 명명형 119종
- 명명형 의미 주장 348건
- 직접 규칙 230건
- 관계 키 24개
- 조합 키 20개
- canonical evidence 621건
- 기존 주제 렌즈 21개
- FR311Q 렌즈 공백 판정 28건

한편 얼굴 관찰 계층에는 FR282 기준 29개 중립 특징이 있고, FR293 기준으로 18개는 canonical extractor가 구현되어 있으며 11개는 추출기 또는 권한 공백 상태다.

FR312A의 목적은 이 두 계층 사이에서 **관찰값이 존재한다는 이유만으로 전통 용어가 자동 성립하는 것을 막고**, 향후 어떤 연결이 연구 대상으로 검토될 수 있는지 권한 상태를 명시적으로 분류하는 것이다.

이번 단계는 실제 자동 관상 판별기를 구현하지 않는다.

## 2. 기본 구조

허용되는 구조:

```
이미지
→ 중립 관찰 계층(FR282/FR293)
→ FR312 연결 권한
→ 명시적으로 승인된 전통 조건
→ FR311 전통 의미 조회
```

금지되는 구조:

```
provider landmark
→ 전통 용어
→ 전통 의미
```

또는:

```
중립 비율 값
→ 임의 threshold
→ 전통 명명형 자동 판정
→ 의미 출력
```

이다.

## 3. 현재 중립 관찰 기준선

FR282 RGB selfie feature inventory:

- 총 29개
- 8개 얼굴 영역
  - forehead
  - eyebrow
  - eye_pair
  - nose
  - mouth_lips
  - ear
  - cheek_mid_face
  - chin_lower_face

FR293 Product column map:

- 총 29개 표현
- canonical extractor 구현: 18
- extractor 또는 authority gap: 11

중요한 점은 FR282/FR293가 모두 다음 권한을 발급하지 않는다는 것이다.

- traditional binding
- traditional classification
- traditional threshold
- traditional interpretation

따라서 “관찰 가능함”과 “전통 조건과 동일함”은 서로 다른 문제다.

## 4. FR312A 판정 상태

### direct_binding_authorized

관찰값에서 전통 조건으로 바로 자동 연결할 수 있는 상태.

**현재 0건.**

FR312A는 어떠한 직접 자동 연결도 승인하지 않는다.

### conditional_binding_candidate

향후 별도 연구를 통해 연결 가능성을 검토할 수 있지만 현재 자동 연결은 불가능한 상태.

필수 조건:

- 원문 전통 표현과 중립 관찰 정의 사이의 명시적 equivalence 정의
- 측정 대상과 관찰 범위의 일치
- 필요한 경우 독립적인 관찰 검증
- 임계값이 필요하다면 별도 근거와 사전 등록
- provider landmark index 자체를 전통 개념으로 사용하지 않음

### manual_input_only

전통 key를 사용자가 명시하거나 별도 검토 단계에서 확정했을 때만 조회 가능한 상태.

자동 classifier 또는 자동 synthesis를 만들지 않는다.

### binding_prohibited

관찰값을 이용한 제품 조회/추론 경로를 열지 않는 상태.

FR311Q가 영구 미지원으로 판정한 intelligence / ability / sexuality / longevity_mortality 관련 18개 의미 근거가 해당한다.

### semantic_only_no_observation_binding

관찰 대상이 아니라 이미 선택된 전통 조건에 붙는 역사적 의미 근거.

명명형 claim 대부분이 여기에 속한다.

## 5. 전통 대상 741건 전수 분류

총합:

| 대상 | 수량 | FR312A 기본 상태 |
|---|---:|---|
| 명명형 | 119 | manual_input_only |
| 명명형 의미 주장 | 348 | semantic-only 또는 binding prohibited |
| 직접 규칙 | 230 | conditional_binding_candidate |
| 관계 키 | 24 | conditional_binding_candidate |
| 조합 키 | 20 | manual_input_only |
| 합계 | 741 | — |

상태별:

- direct binding authorized: 0
- conditional binding candidate: 254
- manual input only: 139
- binding prohibited: 18
- semantic only / no observation binding: 330

총 741건이다.

## 6. 명명형 119종

모든 명명형은 `manual_input_only`다.

이유:

현재 FR311 계층은 명명형의 원문 정의와 의미는 보유하지만, 사진 관찰값으로 해당 명명형을 판별하는 classifier 권한을 발급하지 않았다.

예를 들어:

```
중립 눈 비율
→ 특정 전통 눈 명명형
```

또는:

```
코 contour geometry
→ 특정 전통 코 명명형
```

같은 연결은 아직 허용되지 않는다.

각 명명형에는 동일 얼굴 영역의 FR282 neutral feature key를 **후보 관찰면**으로만 붙인다.

후보 관찰면은 equivalence proof가 아니다.

## 7. 명명형 의미 주장 348건

명명형 claim은 독립적인 얼굴 관찰 대상이 아니다.

구조는 다음과 같다.

```
명시적으로 선택된 formKey
→ 그 form에 속한 historical claim
```

따라서 대부분:

`semantic_only_no_observation_binding`

이다.

FR311Q가 제품 조회 영구 미지원으로 판정한 18개 evidence는:

`binding_prohibited`

로 유지한다.

이는 intelligence, ability, sexuality, longevity_mortality 관련 전통 주장을 얼굴 관찰값에서 제품 추론으로 다시 열지 않기 위한 경계다.

## 8. 직접 규칙 230건

모든 direct rule은 현재:

`conditional_binding_candidate`

다.

이는 “곧 자동화 가능”이라는 의미가 아니다.

단지 named-form 전체 분류와 달리 direct rule은 특정 전통 관찰 조건을 직접 기술하므로 향후 **조건 하나씩** equivalence 연구를 수행할 수 있다는 뜻이다.

현재는 다음이 모두 false다.

- 자동 rule 선택
- neutral feature → rule 자동 binding
- threshold
- population norm
- score
- Product interpretation

전통 규칙이 “크다/작다/길다/짧다/높다/낮다”라고 표현되어도 현재 neutral ratio에 임의 숫자를 붙여 threshold로 만들지 않는다.

## 9. 관계 키 24개

관계 key는 모두:

`conditional_binding_candidate`

이다.

단, 추가 조건으로:

`requiresExplicitParticipantMapping = true`

를 요구한다.

독립적인 두 neutral feature가 관찰됐다는 것만으로 관계 key를 생성하지 않는다.

예:

```
귀 관찰 있음
+
입 관찰 있음
≠
ear_mouth 관계 자동 성립
```

이다.

FR311에서 직접 원문으로 승인된 관계 의미와, FR312에서 실제 사진 관찰로 그 관계를 판정하는 문제는 분리한다.

## 10. 조합 키 20개

모든 combination key는:

`manual_input_only`

이다.

이유:

조합은 여러 전통 participant가 동시에 성립해야 하며, 현재 각 participant 자체의 자동 binding도 승인되지 않았다.

따라서 독립 neutral observation을 모아서 자동으로 전통 조합을 synthesis하지 않는다.

## 11. FR282 영역 후보 연결

FR312A는 전통 단독 부위와 동일 얼굴 영역의 FR282 feature를 후보로 열거한다.

예:

- eyebrow → FR282 eyebrow feature
- eye → FR282 eye_pair features
- nose → FR282 nose features
- mouth / lips / philtrum → FR282 mouth_lips features
- ear → FR282 ear features

그러나 모든 후보에는:

`candidateNeutralFeaturesAreEquivalenceProof = false`

를 고정한다.

즉 같은 부위를 측정한다는 사실만으로 동일 전통 개념이라는 결론을 내리지 않는다.

## 12. 현재 직접 연결 0건의 의미

FR293에는 이미 18개 canonical extractor가 구현되어 있다.

예를 들어:

- eye.width_height_ratio
- eye.inter_eye_spacing_ratio
- eye.outer_corner_tilt
- nose.bridge_centerline_deviation
- mouth.width_and_relative_size
- mouth.corner_orientation
- chin_lower_face.visible_width_ratio

등이다.

그러나 이 값들은 **중립 관찰값**이다.

FR312A는 다음을 명시적으로 금지한다.

```
eye.outer_corner_tilt > 임의 각도
→ 전통 눈형
```

```
mouth.width ratio < 임의 값
→ 小口
```

```
nose ratio > 임의 값
→ 高鼻 / 大鼻
```

원문 의미와 관찰 정의의 대응, 기준척도, threshold 정당화가 별도 연구로 확보되기 전에는 전통 key를 생성하지 않는다.

## 13. 권한 경계

FR312A에서 모두 false:

- automatic traditional binding
- provider landmark direct binding
- named-form classifier
- traditional-rule inference
- relation inference
- combination inference
- arbitrary metric threshold
- threshold tuning
- population norm
- score
- rank
- neutral feature == traditional meaning equivalence
- Product interpretation
- modern scientific fact
- modern psychology fact
- health diagnosis
- lifespan prediction
- mortality prediction
- intelligence inference
- ability inference
- sexuality inference

## 14. 종료 조건

A. FR311 target 741건 전수 분류  
B. 명명형 119건 manual-only  
C. 명명형 claim 348건 semantic-only/prohibited 분리  
D. direct rule 230건 conditional candidate, 자동 binding 0  
E. relation 24건 participant mapping 필요  
F. combination 20건 manual-only  
G. FR311Q 영구 미지원 18건 재개방 0  
H. FR282 29 / FR293 18+11 기준선 무변경  
I. 임의 threshold / classifier / score / population norm 0  
J. 표준 CI + Face Reading CI + 통합 검증 PASS

## 15. 후속

FR312A가 닫히면 다음 단계는 모든 254개 conditional candidate를 한 번에 구현하는 것이 아니다.

후속 FR312B에서는 **실제로 neutral observation과 전통 조건 사이의 의미 대응을 검증할 수 있는 소수의 direct rule 후보만 선별**해야 한다.

선별 기준은:

- 현재 neutral observation이 실제 구현되어 있음
- 전통 표현이 복합 명명형이 아니라 단일 관찰 조건에 가까움
- 임의 threshold 없이도 연구 설계를 정의할 수 있음
- 민감 추론/영구 미지원 경계를 건드리지 않음
- 관계/조합 자동 합성을 요구하지 않음

이다.
