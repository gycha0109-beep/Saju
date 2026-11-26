# Strength Classification Methodology Review v2

- Stage: I18
- Status: **RESEARCH REVIEW CLOSED / CLASSIFIER IMPLEMENTATION BLOCKED**
- Date: 2026-08-20
- Methodology namespace: `M-STRENGTH-FUYI`
- Production authority: **NOT AUTHORIZED**
- Numeric scoring: **NOT AUTHORIZED**
- Review contract: `myeonghwa-strength-classification-review-v4`

## 1. 목적

I18 v1에서 확인한 strength-classifier blocker를 source-backed research capability로 하나씩 축소하고, 어떤 blocker가 실제로 남아 있는지 machine-readable review contract로 고정한다.

이번 review가 닫혔다는 것은 다음을 의미하지 않는다.

```text
I18 closed
!=
strong/weak classifier implemented
!=
production interpretation authorized
```

현재 terminal decision은 계속 다음과 같다.

```text
CLASSIFIER_IMPLEMENTATION_BLOCKED
```

## 2. 완료된 research capability

### I18A — Month-branch relation evidence

월지와 일간의 오행 관계를 다음 다섯 계열로 모두 명시한다.

```text
peer
resource
output
wealth
officer
```

지원 관계가 없다는 사실을 임의의 하나의 도전 의미로 치환하지 않는다.

Hard guards:

```text
weight = not_assigned
overallStrength = not_determined
classificationAuthorized = false
numericScoringAuthorized = false
```

### I18B — Hidden challenging membership evidence

기존 hidden peer/resource evidence에 대응하여 다음 membership을 별도 기록한다.

```text
output
wealth
officer
```

지장간 membership은 관계 존재 evidence일 뿐이며 모든 지장간을 같은 힘으로 합산하지 않는다.

### I18C — Intrinsic root-class evidence

same-element root membership을 하나의 boolean으로 끝내지 않고 source-bounded intrinsic class candidate로 분리한다.

현재 연구 상태:

```text
strong_birth_lu_wang_candidate
residual_storage_candidate
earth_root_class_unresolved
```

목·화·금·수에 대해서는 source-bounded named class candidate를 기록한다.

토 일간은 전통적 birth-stage convention 차이를 임의로 해소하지 않고:

```text
earth_root_class_unresolved
```

로 유지한다.

또한 intrinsic class는 relation 이후의 실제 root effect가 아니다.

### I18D — Root relation review routing

same-element root가 존재하는 지지에 구조적 관계 후보가 닿는 경우 다음 review requirement로 라우팅한다.

```text
CLASH_EFFECT_REVIEW_REQUIRED
SIX_COMBINATION_EFFECT_REVIEW_REQUIRED
THREE_COMBINATION_EFFECT_REVIEW_REQUIRED
```

하지만 다음은 절대로 자동 확정하지 않는다.

```text
root destroyed
root preserved
root strengthened
combination transformed
```

Structural relation presence와 effective result를 분리한다.

### I18E — Special-pattern review routing

ordinary strength path 앞에서 다음 baseline signal을 탐지한다.

```text
FOLLOW_STYLE_NO_SUPPORT_CANDIDATE
DAY_STEM_COMBINATION_CANDIDATE
THREE_COMBINATION_CANDIDATE
```

가능한 router 상태:

```text
SPECIAL_PATTERN_REVIEW_REQUIRED
NO_BASELINE_SPECIAL_SIGNAL
INDETERMINATE_SCENARIO
INDETERMINATE_INPUT
```

이 router는 從格·化格·專旺 등 최종 특수격 판정기가 아니다.

특히:

```text
NO_BASELINE_SPECIAL_SIGNAL
!=
ordinary classifier authorized
```

이다.

## 3. Review v4 capability state

`buildI18StrengthClassificationReviewV4()`는 다음 다섯 capability를 research-only로 기록한다.

```text
MONTH_BRANCH_RELATION_EVIDENCE
HIDDEN_CHALLENGE_MEMBERSHIP_EVIDENCE
INTRINSIC_ROOT_CLASS_EVIDENCE
ROOT_RELATION_REVIEW_ROUTING
SPECIAL_PATTERN_REVIEW_ROUTING
```

모든 capability는 다음을 유지한다.

```text
status = implemented_research_only
classificationAuthorized = false
numericScoringAuthorized = false
```

## 4. 남은 classifier blockers

I18 v1의 blocker 중 month-branch completeness, hidden challenging symmetry, basic root-class candidate, relation review routing, special-pattern routing은 research capability로 구현됐다.

현재 methodology blocker는 두 개로 축소됐다.

### B1. `EARTH_ROOT_CLASS_UNRESOLVED`

토의 장생/근 class를 어떤 convention으로 해석할지 production methodology가 아직 선택되지 않았다.

허용되는 다음 방향은 둘 중 하나다.

1. source-backed convention 하나를 `M-STRENGTH-FUYI`의 명시적 versioned policy로 선택하거나,
2. 토 관련 affected case를 계속 `indeterminate`로 유지하는 fail-closed policy를 채택한다.

금지:

```text
tradition disagreement
-> hidden default
```

### B2. `RELATION_EFFECT_RESOLUTION_MISSING`

I18D는 관계가 근 위치를 건드리는지까지 감사 가능하게 만들었지만 실제 효과는 아직 결정하지 않는다.

아직 다음 semantics가 없다.

```text
preserved
disrupted
transformed
strengthened
unresolved
```

그리고 단순 관계 종류만으로 위 상태를 정하면 안 된다.

예:

```text
branch clash exists
!=
root destroyed
```

```text
six combination exists
!=
transformation established
```

다음 단계는 source-backed post-relation state와 precedence condition을 연구해야 한다.

## 5. Scenario policy

출생시간 미상 또는 경계조건으로 calculation scenarios가 존재할 경우:

- base snapshot에서 relation effect를 추정하지 않는다.
- base snapshot에서 special-pattern eligibility를 추정하지 않는다.
- 각 scenario를 독립 materialization/evaluation 대상으로 취급한다.
- scenario evidence가 incomplete/failed이면 classifier blocker를 유지한다.

즉:

```text
scenario divergence
-> average / majority vote 금지
```

## 6. 계속 금지되는 구현

다음은 I18 종료 후에도 허용되지 않는다.

```text
오행 count -> strength score
support count - challenge count
월령 단독 strong/weak shortcut
hidden stem 동일 weight
임의 percentage strength
relation presence -> automatic destruction/transformation
special pattern -> extreme ordinary score
LLM-generated strength verdict
```

## 7. Verification evidence

I18E repaired gate:

```text
HEAD:          68c04aba34973670803a5af99ec7d17138dd6c9e
CI run number: 396
result:        SUCCESS
Test files:    48 passed
Tests:         272 passed
build:         PASS
```

Review v4 integrated gate:

```text
HEAD:          598785118f2b6565f236b0437cdba885012fc032
CI run number: 399
result:        SUCCESS

npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        49 files / 276 tests PASS
build:         PASS
```

## 8. I18 terminal state

```text
I18 METHODOLOGY REVIEW                = CLOSED
I18A MONTH-BRANCH EVIDENCE            = IMPLEMENTED / RESEARCH ONLY
I18B HIDDEN CHALLENGE EVIDENCE        = IMPLEMENTED / RESEARCH ONLY
I18C INTRINSIC ROOT CLASS             = IMPLEMENTED / RESEARCH ONLY
I18D RELATION REVIEW ROUTING          = IMPLEMENTED / RESEARCH ONLY
I18E SPECIAL-PATTERN REVIEW ROUTING   = IMPLEMENTED / RESEARCH ONLY

PRODUCTION STRENGTH CLASSIFIER        = NOT IMPLEMENTED
PRODUCTION STRENGTH CLASSIFICATION    = NOT AUTHORIZED
NUMERIC STRENGTH SCORING              = NOT AUTHORIZED
```

## 9. Next gate

다음 작업은 classifier 구현이 아니다.

```text
I19 — Post-Relation Root Effect Methodology Review
```

목표:

1. 충·六合·三合 등의 structural candidate와 실제 effect를 분리한다.
2. `preserved / disrupted / transformed / unresolved` 같은 state set 자체를 source review 후 결정한다.
3. effect condition과 precedence를 규칙별 provenance로 고정한다.
4. positive / negative / near-miss / ambiguous fixture를 만든다.
5. 숫자 weight 없이 named-state로 시작한다.
6. 토 root convention은 별도 explicit policy decision으로 유지한다.

I19가 끝나도 곧바로 production strong/weak classification을 승인하지 않는다. 남은 methodology decision과 review/authorization gate를 다시 통과해야 한다.
