# I5 — Rule Registry / DAG / Evaluator Foundation Status

- Date: 2026-08-19
- Branch: `agent/architecture-foundation`
- Status: **STRICT CLOSED**

## Scope

I5 implements the execution foundation for the Interpretation Layer **without adding real Saju interpretation rules**.

All I5 rules and methodology fixtures are synthetic infrastructure tests only.

The stage proves that Myeonghwa can load a versioned rule registry, build a deterministic dependency plan, and evaluate a restricted declarative rule while preserving traceability and failing closed on unresolved inputs.

---

## Rule Registry Snapshot

Implemented:

```text
src/interpretation/rule-registry.ts
```

Capabilities:

- rule definitions sorted independently of registration order
- methodology definitions sorted independently of registration order
- source registry uniqueness checks
- exact methodology version resolution from InterpretationPack
- SHA-256 content hash per rule/methodology/pack ref
- immutable `RuleRegistrySnapshot`
- stable `registrySnapshotId`

Configuration errors:

```text
DUPLICATE_RULE_VERSION
DUPLICATE_METHODOLOGY_VERSION
DUPLICATE_SOURCE_ID
PACK_METHODOLOGY_MISSING
PACK_METHODOLOGY_VERSION_MISMATCH
```

Registry identity is content-based, not insertion-order-based.

---

## Dependency DAG Planner

Implemented:

```text
src/interpretation/execution-plan.ts
```

The planner selects rules through:

```text
InterpretationPack.enabledRuleSets
InterpretationPack.disabledRuleIds
InterpretationPack.methodologyRefs
pack status
rule status
```

Status gate:

```text
production -> active rules only
staging    -> active / reviewed
research   -> active / reviewed / research
```

`deprecated` and `rejected` rules are never executable.

Dependency sources:

1. explicit `relations.requires`
2. required `interpretation_claim` inputs and their selected claim producers

Planner failures:

```text
RULE_NOT_EXECUTABLE_FOR_PACK
RULE_METHODOLOGY_NOT_ENABLED
RULE_DEPENDENCY_MISSING
CLAIM_DEPENDENCY_MISSING
EXECUTION_PLAN_INVALID_CYCLE
```

The planner uses deterministic topological stages. Independent rules are ordered lexically within a stage.

---

## Declarative Rule Evaluator

Implemented:

```text
src/interpretation/rule-evaluator.ts
```

Supported restricted expressions:

```text
eq
in
gt / gte / lt / lte
and
or
not
exists
```

Arbitrary JavaScript/code execution is not supported.

Input sources:

```text
canonical_fact
derived_fact
interpretation_claim
```

Fact paths are traversed only through own properties and reject prototype-related path segments.

---

## Input-state behavior

### Resolved input

Rule may evaluate normally.

### Missing required input

```text
skipped_missing_input
```

### Ambiguous input without explicit scenario override

```text
skipped_ambiguous_input
```

The evaluator does not pick one candidate.

### Missing required interpretation claim

```text
skipped_dependency_unresolved
```

### Expression type failure

```text
error
```

It is not silently converted into `not_matched`.

---

## Scenario-preserving handoff

The evaluator accepts:

```ts
scenarioRef
factOverrides
```

An explicit scenario override can resolve a canonical ambiguous fact for that evaluation while leaving the canonical snapshot itself unchanged.

This is the bridge from I4 calculation scenarios to later Interpretation Engine orchestration.

The evaluator does not independently create Cartesian candidate combinations.

---

## Evaluation / Claim traceability

Matched rules produce:

```text
RuleEvaluation
-> InterpretationClaim
```

Trace includes:

- snapshot ID
- optional scenario ref
- InterpretationPack version
- rule ID/version
- observed fact/claim input refs
- fact refs
- upstream claim refs
- source refs
- methodology ref
- evaluation ID

Evaluation IDs and claim IDs are deterministic content hashes.

`evaluatedAt` is intentionally audit metadata and is not part of the stable identity.

---

## Tests

Primary tests:

```text
test/interpretation-planner.test.ts
test/rule-evaluator.test.ts
```

Verified:

- registry order independence
- duplicate rule rejection
- methodology version mismatch rejection
- producer-before-consumer claim dependency
- stable lexical stage order
- plan identity reproducibility
- cycle rejection
- missing claim producer rejection
- production pack rejects research rules
- disabling a producer breaks its dependent plan
- matched evaluation
- not-matched evaluation
- missing required fact
- ambiguous required fact
- explicit scenario override
- upstream claim traceability
- missing upstream claim
- stable Evaluation/Claim IDs independent of audit time
- invalid numeric expression -> error

Hosted close gate:

```text
CI run number: 106
run id:        32205760082
npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        PASS
build:         PASS
job:           SUCCESS
```

---

## Explicit non-scope

I5 does **not** claim that any real Saju interpretation methodology is correct.

Not included yet:

- real day-master strength rules
- real gyeokguk rules
- real yongshin rules
- shinsal rules
- domain synthesis rules
- cross-method conflict graph orchestration
- final Interpretation Engine run coordinator
- production InterpretationPack

Those require I6 infrastructure plus I7 source-backed rule corpus research.

---

## Closure

```text
REGISTRY_CONTENT_IDENTITY = VERIFIED
PACK_VERSION_RESOLUTION = VERIFIED
DEPENDENCY_DAG = VERIFIED
CYCLE_FAIL_CLOSED = VERIFIED
RESTRICTED_RULE_EXPRESSION = IMPLEMENTED
MISSING_AMBIGUOUS_INPUT_FAIL_CLOSED = VERIFIED
RULE_EVALUATION_TRACE = VERIFIED
EVALUATION_ID_REPRODUCIBILITY = VERIFIED

I5 = STRICT CLOSED
```
