# Support Effect and Precedence Methodology Review v1

- Stage: I21
- Status: **PARTIAL PRECEDENCE CLOSED / TOTAL SUPPORT EFFECT BLOCKED**
- Date: 2026-08-20
- Methodology namespace: `M-STRENGTH-FUYI`
- Production authority: **NOT AUTHORIZED**
- Numeric scoring: **NOT AUTHORIZED**

## 1. Purpose

I20 records support presence but deliberately does not assign effect or numeric magnitude.

I21 asks which support comparisons are directly source-bounded enough to represent as a partial order without inventing a point system.

## 2. Source finding

《滴天髓闡微》 distinguishes day-master rooting from visible peer assistance.

The commentary states, in substance:

- longsheng / lu / wang roots are heavier roots,
- storage / residual roots are lighter roots,
- one visible peer is less substantial than one residual/storage root,
- even two visible peers can be less substantial than one longsheng/lu/wang root,
- visible peers are compared to friends helping, while branch roots are compared to a household/foundation one can rely on.

Reference:

- https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93%E9%97%A1%E5%BE%AE

This supports a limited qualitative ordering for **day-master same-element support only**.

## 3. Authorized partial order

```text
strong_birth_lu_wang_candidate
  > residual_storage_candidate
  > visible_peer_support
```

The code stores these as explicit pairwise precedence relations with:

```text
numericMagnitude = not_assigned
```

This is a partial order, not a score table.

## 4. Explicitly excluded from the order

The source review does not justify inserting the following into the same global ordering:

```text
earth_root_class_unresolved
visible_resource_support
resource_branch_support
post_relation_root_state
```

Reasons:

- earth root stage remains methodology-contested,
- resource support is supportive but not given a universal precedence against root/peer support in the audited rule,
- post-relation root state is still unresolved by I19/I20,
- the cited comparisons are day-master-specific and must not be generalized to arbitrary clash participants.

## 5. Repetition / aggregation guard

The stage does not authorize:

```text
peer + peer = 2 points
root = 3 points
resource = 1.5 points
```

Even where the source gives concrete comparisons, they do not establish an additive scale or universal cardinal magnitude.

Therefore:

```text
repeatedEvidenceAggregation = not_authorized
numericScoringAuthorized = false
```

## 6. Terminal decision

```text
DAY_MASTER_SUPPORT_PARTIAL_ORDER = CLOSED / RESEARCH ONLY
TOTAL_SUPPORT_EFFECT = BLOCKED
RESOURCE_SUPPORT_PRECEDENCE = UNRESOLVED
EARTH_ROOT_PRECEDENCE = UNRESOLVED
POST_RELATION_ROOT_PRECEDENCE = UNRESOLVED
RELATIVE_FORCE_VERDICT = NOT AUTHORIZED
PRODUCTION_STRENGTH_CLASSIFIER = NOT IMPLEMENTED
```

## 7. Next gate

```text
I22 — Resource Support and Evidence Composition Review
```

I22 must determine whether resource support and multiple simultaneous support signals can be composed with a source-backed decision graph. If the source does not justify a total order, the implementation must preserve partial ordering and `indeterminate` states rather than invent weights.
