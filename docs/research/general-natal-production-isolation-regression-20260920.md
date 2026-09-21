# R099 — regression contract blocking silent research → Production changes

Date: 2026-09-22  
Issue: #1053  
Status: FAIL-CLOSED PRODUCTION-ISOLATION REGRESSION CONTRACT DEFINED

## Purpose

Define repository-level regression invariants proving that research-only evidence changes cannot silently mutate governed Production calculation, interpretation, authority, or commerce behavior.

R099 is a research-only test contract first. It does not mutate CI, PIE, PCC, Production registries, or lifecycle authority.

## Threat model

The prohibited event is **silent authority drift**:

> a change whose declared scope is research-only, but whose observable effect changes a governed Production surface without an explicit authorized lifecycle/authority change for the exact candidate version.

A green test caused only by replacing the expected snapshot with the new output is not sufficient evidence of authorization.

## Ten invariant families

1. `RESEARCH_IMPORT_ISOLATION`
2. `REGISTRY_STATUS_ISOLATION`
3. `CONTENT_HASH_STABILITY`
4. `CALCULATION_OUTPUT_STABILITY`
5. `INTERPRETATION_OUTPUT_STABILITY`
6. `UNKNOWN_FAIL_CLOSED`
7. `PREVIEW_SHADOW_SEPARATION`
8. `COMMERCE_ENTITLEMENT_SEPARATION`
9. `AUTHORITY_DIFF_REQUIRED`
10. `SUPERSESSION_TRACEABILITY`

## Executable regression oracle

Each invariant family must define an executable oracle record with:

- `invariantFamily`
- `protectedSurfaceRef`
- `baselineRef`
- `observationRef`
- `comparisonMode`
- `allowedDeltaPolicyRef`
- `authorityDiffReceiptRef` when a Production delta is intended
- `result`
- `failureReasonRef` when failed

Allowed results:

- `PASS_STABLE`
- `PASS_AUTHORIZED_DELTA`
- `FAIL_SILENT_DRIFT`
- `FAIL_MISSING_BASELINE`
- `FAIL_MISSING_AUTHORITY_DIFF`
- `FAIL_UNTRACEABLE_SUPERSESSION`

Missing baseline or missing authority evidence fails closed. It is not converted into a skip/pass.

## Invariant semantics

### 1. RESEARCH_IMPORT_ISOLATION

Production entrypoints must not acquire a direct dependency on research-only artifacts except through a separately governed adapter explicitly authorized for the target lifecycle.

A new research import into a Production entrypoint is a failure unless the exact authority diff records the governed boundary change.

### 2. REGISTRY_STATUS_ISOLATION

Research/review-only statuses cannot become Production-enabled pack membership merely because a research registry or evidence record changed.

Pack membership and lifecycle status are protected observations.

### 3. CONTENT_HASH_STABILITY

A research-only change must not mutate governed Production rule, methodology, registry, or authority content hashes.

If a Production hash changes, the suite requires an explicit authority/lifecycle diff for the exact old/new hashes.

### 4. CALCULATION_OUTPUT_STABILITY

Canonical Production calculation fixtures must remain byte- or semantic-stable according to the fixture's declared comparison mode.

Research changes cannot silently alter canonical pillars, derived calculations, time conventions, or other governed calculation outputs.

### 5. INTERPRETATION_OUTPUT_STABILITY

Governed Production interpretation fixtures must remain stable for the declared fixture scope.

Changing expected interpretation text/output does not authorize the delta.

### 6. UNKNOWN_FAIL_CLOSED

Unknown, unresolved, divergent, or execution-pending research predicates cannot become guessed/defaulted Production values.

A research state label from R096 is evidence metadata, not a Production fallback value.

### 7. PREVIEW_SHADOW_SEPARATION

Preview/PIE/shadow observations are read-only with respect to Production authority.

A successful shadow result cannot write or promote Production authority by itself.

### 8. COMMERCE_ENTITLEMENT_SEPARATION

Research-only changes cannot alter SKU, payment, entitlement, purchase-gating, or access behavior.

Commerce behavior is observed only as a protected boundary; R099 does not redefine commerce policy.

### 9. AUTHORITY_DIFF_REQUIRED

Any intended Production delta requires an explicit authority/lifecycle diff bound to the exact changed candidate.

The receipt must identify:

- old content hash/version;
- new content hash/version;
- governed promotion evidence;
- authority actor/decision ref;
- affected protected surfaces;
- declared expected fixture/output deltas.

### 10. SUPERSESSION_TRACEABILITY

An authorized promoted change must preserve old → new lineage.

Deleting or overwriting the old identity so that the transition cannot be reconstructed is a failure.

## Mutation-probe contract

The eventual executable suite must prove that its detector is live, not merely present.

For representative invariant families, controlled negative probes should demonstrate that:

- injecting a research import into a protected Production boundary is detected;
- changing a protected Production fingerprint without an authority receipt is detected;
- changing canonical calculation/interpretation output under a research-only declaration is detected;
- defaulting an unresolved research value into Production is detected;
- allowing shadow evidence to mutate authority is detected.

These probes are test harness mutations only. They do not authorize or persist Production changes.

## Baseline and fingerprint rules

Protected baselines must be content-addressed or otherwise reproducibly pinned.

A baseline update requires one of two explanations:

1. no protected Production semantics changed, with reproducible evidence; or
2. an intended Production change occurred, with the exact authorized authority/lifecycle diff.

A baseline cannot be regenerated solely to make CI green.

## Research-only change declaration

A research-only candidate is expected to preserve all protected Production observations.

If any protected observation differs, the default result is `FAIL_SILENT_DRIFT` until an exact authorized Production change receipt is supplied.

The suite must not infer authorization from:
- branch name;
- PR title;
- merge status;
- test pass;
- reviewer count;
- source count;
- R096 evidence state;
- R098 readiness state alone.

## R098 relationship

R098 defines fail-closed promotion eligibility evidence.

R099 consumes explicit authority/lifecycle evidence when evaluating an intended Production delta, but:

- `PROMOTION_ELIGIBLE` is not `PROMOTED`;
- a checklist result alone is not an authority mutation receipt;
- lifecycle mutation must remain separately recorded;
- candidate hash/version changes require reevaluation.

## Existing execution surfaces

Implementation may reuse existing:

- CI;
- Production Calculation Container (PCC);
- PIE / shadow boundaries.

R099 does not create a parallel workflow and does not modify those workflow definitions in this research-contract change.

## Required failure classes

The suite must distinguish at least:

- silent import-boundary drift;
- silent registry/lifecycle drift;
- protected hash drift;
- calculation output drift;
- interpretation output drift;
- unknown/default coercion;
- shadow authority write;
- commerce/entitlement drift;
- missing authority receipt;
- broken supersession lineage.

## Rejected shortcuts

- `UPDATED_SNAPSHOT_EQUALS_AUTHORIZED_CHANGE`
- `RESEARCH_STATUS_RULE_IN_PRODUCTION_PACK`
- `SHADOW_WRITE_PROMOTES_AUTHORITY`
- `UNKNOWN_RESEARCH_VALUE_DEFAULTED_IN_PRODUCTION`
- `COMMERCE_CHANGE_HIDDEN_IN_RESEARCH_DIFF`
- `GREEN_TESTS_IMPLY_AUTHORIZATION`
- `PR_MERGE_IMPLIES_AUTHORIZATION`
- `R098_ELIGIBLE_IMPLIES_LIFECYCLE_MUTATED`
- `MISSING_BASELINE_SKIPPED_AS_PASS`
- `MISSING_AUTHORITY_RECEIPT_SKIPPED_AS_PASS`
- `OLD_VERSION_DELETED_WITHOUT_SUPERSESSION_LINEAGE`
- `TEST_FILE_EXISTENCE_COUNTS_AS_DRIFT_PROTECTION`

## Authority boundary

R099 defines the regression contract and failure semantics.

It does not:
- promote research evidence;
- mutate Production lifecycle;
- authorize a Production delta;
- alter commerce policy;
- create a new CI workflow.

No Production behavior change is authorized by R099 itself.
