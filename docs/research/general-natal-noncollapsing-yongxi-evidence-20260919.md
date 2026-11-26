# R040 — School-aware, non-collapsing Yong/Xi evidence envelope

Date: 2026-09-19  
Issue: #977  
Status: RESEARCH_EVIDENCE_MODEL_DEFINED / SEMANTIC RESOLUTION BLOCKED

## Purpose

R040 defines how research evidence should be preserved when multiple 用神/喜神/忌神-related methodology families coexist.

It does not decide which method is correct for a chart.

## Upstream constraints

The model exists because prior frontiers established:

```text
R031  methodology families remain distinct
R032  喜神 != 用神
R033  忌神 is contextual
R034  climate requirement != automatic final 用神
R035  扶抑 depends on unresolved strength/applicability predicates
R036  格局 candidate selection != establishment
R037  通關 is a distinct bounded family
R038  病/藥 roles are relational
R039  multi-method differences may coexist without contradiction
```

## Evidence item

Each evidence item preserves:

```text
methodologyFamily
sourceStratum
sourceRef
role
value
applicabilityState
authorityState
evidenceRefs
scenarioRef? / methodologyVersion?
```

No field named `finalYongShen` exists.

## Collection relation

A collection may be:

```text
COEXISTING_DIFFERENT_ROLES
TRUE_CONFLICT_UNRESOLVED
METHOD_NOT_APPLICABLE
INDETERMINATE
```

The collection relation is descriptive evidence state, not winner logic.

## Explicit non-collapse

Forbidden:

```text
array order -> winner
method count -> confidence winner
climate-required -> primary use
喜神 -> final 用神
忌神 -> fixed bad element
TRUE_CONFLICT_UNRESOLVED -> automatic tie-break
```

## Authority boundary

This envelope is a research/governance structure only.

It does not:
- assign chart roles;
- evaluate method applicability;
- calculate final strength;
- choose one method;
- emit Production claims;
- authorize SKU or Commerce behavior.
