# I6 — Claim Graph / Interpretation Run Orchestration Status

- Date: 2026-08-19
- Branch: `agent/architecture-foundation`
- Status: **STRICT CLOSED**

## Scope

I6 closes the deterministic runtime path from an I5 execution plan to an auditable interpretation result graph.

No real Saju interpretation methodology is asserted in this stage. All runtime rules used by I6 tests are synthetic infrastructure fixtures.

Implemented runtime path:

```text
CanonicalSajuSnapshot
-> RuleRegistrySnapshot
-> InterpretationExecutionPlan
-> staged RuleEvaluation
-> InterpretationClaim
-> ClaimRelation graph
-> integrity validation
-> ExecutionCompleteness
-> InterpretationRun
-> EvidenceIndex
```

---

## Runtime Orchestrator

Implemented:

```text
src/interpretation/interpretation-engine.ts
```

Capabilities:

- executes deterministic DAG stages
- prevents same-stage claims from becoming undeclared dependencies
- propagates prior-stage claims only
- executes `scenario_preserving` rules once per observed CalculationScenario
- supplies only the matching scenario's fact overrides
- sorts evaluations and claims deterministically
- builds a content-stable run hash independent of audit timestamps
- produces immutable `InterpretationRun` metadata

---

## Claim Graph

Implemented:

```text
src/interpretation/claim-graph.ts
```

Supported relation construction:

```text
depends_on
contradicts
supersedes
```

Conflict behavior:

- contradictory claims are preserved rather than averaged or deleted
- symmetric conflict declarations resolve to one canonical contradiction relation per claim pair
- conflict relation identity is deterministic
- scenario-specific claims are related only when scenario-compatible
- opposite scenarios do not create cross-scenario contradiction edges

Source-rule relation metadata is resolved by exact `ruleId@version`, not `ruleId` alone.

This prevents an unselected historical rule version from injecting conflict or dependency metadata into the active graph.

---

## Scenario Isolation

A rule executing without a scenario context can consume only non-scenario claims.

```text
base evaluation
!=
implicit aggregation of all scenario claims
```

When a downstream rule wants scenario-specific upstream claims, it must itself execute with `scenario_preserving` semantics.

This prevents candidate scenarios from being silently collapsed into an invented combined interpretation.

---

## Registry / Version Hardening

I6 strengthened the I5 foundation with additional fail-closed gates.

### Deprecated pack

```text
PACK_NOT_EXECUTABLE
```

A deprecated InterpretationPack cannot execute.

### Ambiguous selected rule version

```text
RULE_VERSION_SELECTION_AMBIGUOUS
```

If an enabled pack resolves more than one version of the same `ruleId`, planning stops instead of selecting an arbitrary version.

Historical versions may remain in the registry when they are outside the enabled rule sets. They cannot affect the active relation graph or execution completeness.

### Source content addressing

`RuleRegistrySnapshot` identity includes content hashes for:

- rules
- methodologies
- InterpretationPack
- SourceReference records

Changing source metadata therefore changes the registry snapshot identity.

Missing rule or methodology source references fail before execution.

---

## Claim Graph Integrity Gate

The runtime verifies:

- duplicate Evaluation IDs
- duplicate Claim IDs
- snapshot references
- exact rule references
- methodology references
- Evaluation -> Claim consistency
- Claim -> Evaluation consistency
- fact-path existence
- upstream Claim existence
- source reference existence
- relation endpoint existence
- relation self-reference
- duplicate relation IDs

The resulting `EvidenceIndex` provides Claim-level reverse traceability to:

```text
facts
upstream claims
sources
rules
methodology
```

---

## Execution Completeness

Non-terminal evaluation states are not silently presented as a complete run.

Examples:

```text
skipped_missing_input
skipped_ambiguous_input
skipped_dependency_unresolved
error
```

They block the exact selected rule set and produce:

```text
ExecutionCompleteness.state = partial
InterpretationRun.status = partial
```

Claim-graph integrity failure produces `failed`.

Completeness attribution uses exact `ruleId@version`; an unselected historical version cannot redirect failure attribution to another rule set.

Completeness is execution metadata, **not prediction accuracy or confidence**.

---

## Deterministic Identity

Stable identity covers:

- Registry Snapshot
- Execution Plan
- Rule Evaluation
- Interpretation Claim
- Claim Relation
- Interpretation Run

Rule and pack content hashes are included in Evaluation/Claim identity material so changing content without a version bump cannot silently reuse the previous identity.

Audit timestamps remain outside deterministic identity.

---

## Tests

Primary tests:

```text
test/interpretation-engine.test.ts
test/interpretation-version-isolation.test.ts
test/interpretation-planner.test.ts
test/rule-evaluator.test.ts
```

Verified:

- DAG orchestration
- upstream Claim consumption
- conflict preservation
- symmetric conflict deduplication
- same-scenario conflict isolation
- scenario-specific Claim isolation from base evaluations
- evaluator error -> partial completeness
- deterministic Run / Claim / Relation identity
- EvidenceIndex construction
- source content change -> Registry identity change
- missing source fail-closed
- deprecated pack fail-closed
- multiple selected versions of one Rule ID fail-closed
- historical unselected version cannot inject relations
- historical unselected version cannot alter completeness attribution

Hosted code close gate:

```text
CI run number: 146
run id:        32208801278
npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        PASS
build:         PASS
job:           SUCCESS
```

---

## Explicit non-scope

I6 does **not** introduce production Saju interpretation content.

Not yet included:

- source-backed day-master strength methodology corpus
- source-backed gyeokguk rules
- source-backed yongshin rules
- shinsal production allowlist
- real natal domain synthesis
- NarrativeEvidenceBundle selector implementation
- LLM adapter
- user-facing prediction claims

Those begin with I7 source-backed research packs and later Narrative stages.

---

## Closure

```text
DETERMINISTIC_INTERPRETATION_RUN = VERIFIED
CLAIM_GRAPH_INTEGRITY = VERIFIED
CONFLICT_PRESERVATION = VERIFIED
SYMMETRIC_CONFLICT_DEDUP = VERIFIED
SCENARIO_ISOLATION = VERIFIED
EXACT_RULE_VERSION_BINDING = VERIFIED
SOURCE_CONTENT_ADDRESSING = VERIFIED
PACK_FAIL_CLOSED = VERIFIED
RULE_VERSION_AMBIGUITY_FAIL_CLOSED = VERIFIED
COMPLETENESS_PROPAGATION = VERIFIED
EVIDENCE_INDEX = VERIFIED
RUN_ID_REPRODUCIBILITY = VERIFIED

I6 = STRICT CLOSED
```
