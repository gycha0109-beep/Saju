# FR312G — Neutral Metric Reliability Study Design

## 1. 목적

FR312G는 FR312H morphology equivalence에 들어가기 전에 **neutral metric 자체가 반복 촬영에서 얼마나 안정적인지** 평가할 연구 계약을 고정한다.

이 단계는 전통 morphology label과 neutral metric의 관계를 평가하지 않는다.

핵심 질문:

> 동일 participant의 허용된 반복 촬영에서 neutral metric이 안정적으로 재현되는가?

---

## 2. upstream

FR312G는 다음 authority를 소비한다.

- FR312F pilot dataset & capture protocol
- FR293 product column map
- FR291 visible philtrum geometry
- FR293 visible lip-band fullness
- FR80 neutral mouth contour metric
- FR82 neutral mouth relative-size metric
- FR212 visible mouth-corner orientation

FR312F collection prerequisite는 그대로 유지한다.

현재 actual participant collection은 승인되지 않았다.

---

## 3. comparator family 4개

FR312F comparator family:

1. `mouth.philtrum_length_width`
2. `mouth.width_and_relative_size`
3. `mouth.corner_orientation`
4. `mouth.visible_lip_fullness`

FR293 product column map에서 네 feature 모두 `canonical_extractor_materialized` 상태여야 FR312G가 유효하다.

---

## 4. neutral metric axis 8개

### 4.1 philtrum — 2 axes

`mouth.philtrum_length_width`

- `neutral.mouth.visible_central_groove.axis_length_to_mouth_width_ratio@0.1.0`
- `neutral.mouth.visible_central_groove.corridor_width_to_mouth_width_ratio@0.1.0`

source: FR291

둘 다 visible neutral geometry이며 전통 인중 형태와의 equivalence를 의미하지 않는다.

### 4.2 mouth width / relative size — 2 axes

`mouth.width_and_relative_size`

- `neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0`
- `neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0`

source: FR80 / FR82

첫 번째는 visible mouth contour shape ratio, 두 번째는 mouth span relative-size ratio다.

둘을 하나의 traditional “small/short” 판정으로 자동 합치지 않는다.

### 4.3 mouth corner orientation — 1 axis

`mouth.corner_orientation`

- `neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0`

source: FR212 / FR208

이 axis는 signed ratio다.

양·음 방향의 의미는 neutral coordinate convention이며 traditional semantic meaning이 아니다.

### 4.4 visible lip fullness — 3 axes

`mouth.visible_lip_fullness`

- upper visible lip-band vertical span / mouth width
- lower visible lip-band vertical span / mouth width
- combined visible lip-band area / mouth width²

source: FR293

세 axis 모두 visible lip-band geometry다.

physical lip thickness 또는 traditional lip category를 직접 의미하지 않는다.

---

## 5. reliability unit

FR312F repeat structure를 그대로 사용한다.

```text
participant
  session A
    accepted capture A1
    accepted capture A2

  session B
    accepted capture B1
    accepted capture B2
```

FR312G는 이 구조를 이용해 다음 두 종류의 variation을 분리한다.

### within-session

같은 session의 accepted capture 두 개 비교.

### between-session

각 session의 accepted capture 평균을 구한 뒤 session A와 B 차이를 비교.

추가로 participant 내 전체 accepted capture range를 기록한다.

---

## 6. development partition only

FR312G reliability analysis는 **development partition만** 대상으로 설계한다.

FR312G에서 열지 않는 것:

- calibration
- holdout

이유:

neutral metric 안정성 검토 단계에서 calibration/holdout을 소모할 필요가 없고, FR312H/FR312I의 독립성을 보존해야 한다.

---

## 7. morphology annotation blind

FR312G는 morphology annotation을 읽지 않는다.

금지:

- present/absent label과 metric 비교
- adjudicated morphology label과 metric 비교
- traditional source predicate별 metric separation
- metric → morphology classifier
- traditional semantic consequence 검증

그 관계는 FR312H의 역할이다.

---

## 8. descriptive repeatability evidence

현재 numeric acceptance threshold가 없으므로 FR312G는 descriptive evidence만 허용한다.

허용:

- capture count
- available count
- unavailable count
- missingness rate
- within-session absolute pair difference
- between-session absolute session-mean difference
- within-participant range
- unavailable reason count

FR312G는 위 숫자를 이용해 자동 PASS/FAIL을 만들지 않는다.

---

## 9. missingness

`unavailable`은 숫자 0이 아니다.

금지:

- zero substitution
- mean/median imputation
- last-observation carry-forward
- fallback metric invention

unavailable reason은 별도로 보존한다.

metric axis와 comparator family 단위로 missingness를 보고한다.

높은 missingness 자체가 reliability 문제일 수 있지만, 현재 단계에서 허용 cutoff는 없다.

---

## 10. capture sensitivity

FR312G는 FR312F capture admission을 통과한 범위 안에서만 sensitivity를 본다.

검토 축:

- pose variation
- neutral-expression variation
- framing variation
- image-quality variation
- session variation
- capture sequence variation

단:

- 새로운 pose degree threshold를 만들지 않는다.
- expression numeric threshold를 만들지 않는다.
- framing pixel threshold를 만들지 않는다.
- image-quality numeric threshold를 만들지 않는다.

out-of-protocol capture를 primary reliability 값으로 사용하지 않는다.

---

## 11. axis-level reliability gate

FR312G는 comparator family를 단일 score로 합치지 않는다.

각 neutral metric axis는 독립적으로 review되어야 한다.

향후 가능한 review outcome:

- `insufficient_evidence`
- `reliability_concern`
- `eligible_for_fr312h_review`

현재는 모든 axis:

`not_executed`

상태다.

FR312H는 `eligible_for_fr312h_review`를 별도로 받은 axis만 사용할 수 있다.

한 axis가 통과했다고 같은 comparator family의 다른 axis까지 자동 승격하지 않는다.

---

## 12. aggregate score 금지

예를 들어 visible lip fullness의 세 axis를:

```text
upper + lower + area
→ lip reliability score
```

처럼 임의 합산하지 않는다.

mouth width/relative size의 FR80/FR82 두 axis도 동일하다.

axis별 failure mode와 안정성을 먼저 보존한다.

---

## 13. collection prerequisite

FR312G protocol을 정의했다고 실제 participant collection을 시작할 수 있는 것은 아니다.

FR312F에서 아직 닫혀 있는 항목:

- finite review-image retention policy
- consent / withdrawal procedure
- participant count authority
- partition ratio authority
- actual participant collection authority

따라서 FR312G current execution state는:

`not_executed`

이다.

---

## 14. FR312G에서 승인하지 않는 것

- actual participant collection
- calibration partition use
- holdout partition use
- morphology label association
- traditional semantic validation
- reliability acceptance cutoff
- missingness cutoff
- sensitivity cutoff
- threshold discovery/value
- population norm
- automatic traditional binding
- aggregate reliability score
- product interpretation
- prohibited person-level inference

---

## 15. FR312H 진입 조건

FR312H는 다음 조건을 만족한 neutral axis만 morphology equivalence 후보로 사용할 수 있다.

1. FR312G collection prerequisite가 별도 승인됨
2. governed reliability execution 완료
3. missingness/failure-mode review 완료
4. repeatability evidence review 완료
5. 해당 axis에 `eligible_for_fr312h_review` outcome 발행

FR312G 설계 자체는 이 outcome을 발행하지 않는다.

---

## 16. 종료 조건

- FR312F comparator family 4/4 regression 연결
- FR293 canonical materialization 4/4 확인
- neutral metric axis 8개 고정
- within-session / between-session reliability contract 고정
- missingness / unavailable reason contract 고정
- no imputation / no invented fallback
- capture sensitivity descriptive-only
- development-only reliability analysis
- calibration / holdout sealed
- morphology annotation association 0
- threshold search 0
- current study state = not executed
- FR312H axis-level gate 정의
- standard CI + Face Reading CI + Integration CI PASS 후 squash merge
