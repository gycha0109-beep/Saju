# Strength Classification Methodology Review v1

- Stage: I18
- Status: **RESEARCH REVIEW COMPLETE / CLASSIFIER IMPLEMENTATION BLOCKED**
- Date: 2026-08-20
- Methodology namespace: `M-STRENGTH-FUYI`
- Production authority: **NOT AUTHORIZED**
- Numeric scoring: **NOT AUTHORIZED**

## 1. 목적

I13/I14에서 수집한 강약 관련 evidence를 바로 `신강/신약` 결과로 집계하지 않고, 실제 분류기를 구현하기 전에 필요한 방법론 조건과 누락 증거를 감사한다.

이번 단계의 terminal decision은 다음과 같다.

```text
I14 evidence matrix exists
!=
strength classifier is ready
```

```text
CLASSIFIER_IMPLEMENTATION_BLOCKED
```

이 결정은 명리 해석의 실제 미래예측 정확도를 주장하는 것이 아니다. 오직 특정 전통적 해석 방법을 소프트웨어에서 재현 가능하고 감사 가능하게 구현할 준비가 되었는지를 판단한다.

---

## 2. 검토한 주요 source layer

### 2.1 《滴天髓闡微》 — 月令 / 衰旺 / 從象

Reference:

- https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93%E9%97%A1%E5%BE%AE

연구상 중요한 포인트:

1. 월령은 매우 중요한 축이지만 월령만으로 최종 왕쇠를 고정하는 방식은 경계된다.
2. 년·일·시의 증감과 통근이 계절상 예상되는 강약을 뒤집을 수 있다.
3. 통근은 단순 boolean이 아니라 근의 상태에 따라 효과 차이가 있는 것으로 설명된다.
4. 천간의 도움과 지지의 근을 동일한 단위로 세는 방식은 이 자료의 논리와 맞지 않는다.
5. 從象은 일반 강약의 단순 극단값이 아니라 별도 조건을 요구한다.

따라서 다음은 금지한다.

```text
월지가 나를 생한다 -> 신강
월지가 나를 극한다 -> 신약
```

그리고 다음 역시 금지한다.

```text
지원 evidence 5개
도전 evidence 3개
=> 5 - 3 = +2
=> 신강
```

### 2.2 《淵海子平》 — 論日為主 / 論月令

Reference:

- https://zh.wikisource.org/wiki/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E5%A4%A7%E5%85%A8

연구상 중요한 포인트:

- 일간을 분석의 중심으로 둔다.
- 신왕/신약을 보되 지지 구조, 오행 분포, 월령, 나머지 사주의 손익을 함께 살핀다.
- 한 요소에 고착되는 분석을 경계한다.

따라서 `M-STRENGTH-FUYI`는 whole-chart methodology로 유지한다.

### 2.3 《滴天髓》 / 從化 계열

Reference:

- https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93

일주가 매우 약해 보이는 경우에도 곧바로 ordinary `weak` 결과를 내기 전에 從/化 조건을 별도로 검토해야 한다는 연구 근거가 존재한다.

명화에서는 이를 다음처럼 분리한다.

```text
ordinary strength classification
!=
special follow / transform classification
```

`M-SPECIAL-FOLLOW`가 ordinary strength classifier의 숫자 threshold 안으로 흡수되어서는 안 된다.

---

## 3. I14 evidence matrix의 현재 장점

현재 Matrix는 다음을 안전하게 제공한다.

```text
seasonal positive support signal
visible stem relation evidence
hidden same-element root membership
hidden resource-support membership
scope guards
scenario-specific evaluation traces
```

그리고 다음을 강제로 유지한다.

```text
classificationAuthorized = false
numericScoringAuthorized = false
```

이 구조는 강약 분류의 입력 기반으로 유용하지만 분류 결과를 만들기에는 아직 불완전하다.

---

## 4. 현재 확인된 classifier blockers

### B1. Month-order challenging semantics가 없음

현재 I7 seasonal layer는:

```text
same element support
generating element support
```

를 명시적으로 기록한다.

그러나 지원 신호가 없다는 사실을 곧바로:

```text
leakage
wealth expenditure
control
```

중 하나로 변환할 수는 없다.

```text
not supporting
!=
explicitly challenging
```

따라서 월령의 비지원/도전/중립 상태를 source-backed methodology로 별도 모델링해야 한다.

### B2. Hidden challenging evidence가 비대칭

I13은 지지에서:

```text
same-element root
resource support
```

를 추출하지만 hidden:

```text
output
wealth
officer/control
```

관계를 strength evidence로 대칭적으로 수집하지 않는다.

이 상태에서 전체 chart evidence를 집계하면 지지 evidence가 지원 방향으로 편향될 수 있다.

### B3. Root quality/effect가 없음

현재 hidden-stem model은 membership을 정확히 보존하지만:

```text
root exists
```

까지만 말한다.

아직 다음은 모델링하지 않는다.

```text
root category / quality
root effectiveness
month-order relationship
root damaged / preserved state
```

이를 숫자 weight로 바로 바꾸지 않는다.

먼저 ordinal 또는 named-state 방식의 source-backed taxonomy가 필요하다.

### B4. Structural relation의 실제 효과가 없음

현재 명화는 천간합·지지합·충·삼합 등의 **관계 후보 존재**를 deterministic structural fact로 감지할 수 있다.

하지만:

```text
합 존재
!=
합화 성립
```

```text
충 존재
!=
root destroyed
```

이다.

Strength methodology가 관계 때문에 어떤 support/root가 실제로 약화·보존·변환됐다고 판단하려면 별도의 methodology-qualified relation-effect layer가 필요하다.

### B5. Special-pattern routing이 없음

ordinary strong/weak classifier 전에 최소한:

```text
ordinary path eligible
special-pattern review required
indeterminate
```

를 구분하는 gate가 필요하다.

從/化/專旺 같은 구조를 ordinary `very strong` / `very weak`로 강제 환원하지 않는다.

---

## 5. 금지되는 classifier 구현

다음 방식은 현재 단계에서 금지한다.

### 5.1 오행 개수 합산

```text
木 3
水 2
金 1
...
=> strong
```

오행 count는 구조 FACT일 수 있지만 그 자체가 strength methodology가 아니다.

### 5.2 모든 evidence 동일 가중치

```text
month support = +1
visible peer = +1
hidden root = +1
officer = -1
```

출처가 요구하는 효과 차이를 지워버리므로 금지한다.

### 5.3 임의 percentage

```text
strength = 73%
```

통계적 확률 의미나 검증 기준이 없으므로 금지한다.

### 5.4 월령 단독 shortcut

```text
得令 -> strong
失令 -> weak
```

연구 source와 충돌한다.

### 5.5 special pattern을 극단 score로 처리

```text
score < -80 -> 從弱
```

별도 구조 조건 없이 이러한 threshold를 만들지 않는다.

---

## 6. Proposed pre-classification state machine

아직 신강/신약을 내는 classifier가 아니다.

먼저 다음 routing layer만 연구한다.

```text
Canonical + scenario facts
        ↓
Strength evidence completeness
        ↓
Special-pattern eligibility review
        ↓
Relation-effect resolution
        ↓
Root-effect resolution
        ↓
Ordinary-classification eligibility
```

가능한 routing 결과 후보:

```text
ORDINARY_REVIEW_ELIGIBLE
SPECIAL_PATTERN_REVIEW_REQUIRED
INDETERMINATE
```

이 상태들은 `strong / weak / balanced`가 아니다.

---

## 7. 다음 구현 순서

### I18A — Month-order evidence completion

- positive support
- explicit challenge/leak/control relation
- neutral/indeterminate case
- no single-factor classification

### I18B — Hidden branch evidence symmetry

- peer/root
- resource
- output
- wealth
- officer/control

단, 모든 지장간을 같은 weight로 세지 않는다.

### I18C — Root-effect taxonomy

예시 연구 shape:

```text
ROOT_EFFECT
  state = effective | limited | disrupted | unresolved
  basis = named source-backed condition set
```

실제 상태명은 source review 후 확정한다.

### I18D — Relation-effect layer

```text
RELATION_EFFECT
  relation candidate
  -> transformed / damaged / preserved / unresolved
```

합·충 존재 자체와 결과를 분리한다.

### I18E — Special-pattern eligibility gate

`M-SPECIAL-FOLLOW`를 별도 research pack으로 구현한다.

ordinary strength classifier와 독립적으로 테스트한다.

### I18F — Ordinary classifier review

위의 prerequisite가 모두 존재한 뒤에만:

```text
strong
weak
balanced
indeterminate
```

같은 label set 자체를 다시 review한다.

---

## 8. Required fixture matrix before classifier implementation

최소한 다음 fixture 유형이 필요하다.

```text
得令 but weak candidate
失令 but strong candidate
strong visible support but weak roots
few visible supporters but strong roots
root under clash candidate
combination candidate that does not transform
combination candidate whose effect is unresolved
special-follow positive candidate
special-follow near miss
known-time ordinary chart
unknown-time scenarios with invariant evidence
unknown-time scenarios with divergent routing
```

fixture는 역사 인물의 사후 결과를 맞췄다는 이유로 정답화하지 않는다.

목적은 methodology implementation consistency를 검증하는 것이다.

---

## 9. Production authorization rule

Strength classifier는 다음을 모두 통과하기 전 production rule이 될 수 없다.

```text
[ ] explicit methodology/version
[ ] source layers identified
[ ] month-order semantics complete
[ ] hidden evidence symmetry complete
[ ] root-effect model reviewed
[ ] relation-effect model reviewed
[ ] special-pattern routing implemented
[ ] positive fixtures
[ ] negative fixtures
[ ] ambiguous fixtures
[ ] scenario behavior tested
[ ] no numeric pseudo-confidence
[ ] exact-content domain review attestation
[ ] trusted attestation hash pinned by external trust policy
```

I15-I17 authorization infrastructure가 이 마지막 승격을 fail-closed로 통제한다.

---

## 10. Current terminal decision

```text
STRENGTH_EVIDENCE_SUBSTRATE = CLOSED / RESEARCH ONLY
STRENGTH_CLASSIFICATION_REVIEW = COMPLETE
CLASSIFIER_IMPLEMENTATION = BLOCKED
PRODUCTION_STRENGTH_CLASSIFICATION = NOT AUTHORIZED
```

다음 단계는 `strong / weak` 결과 구현이 아니라 **I18A Month-order evidence completion**이다.
