# I8 — Narrative Foundation Status

- Date: 2026-08-19
- Branch: `agent/architecture-foundation`
- Status: **STRICT CLOSED**

## Purpose

I8 establishes the narrative authority boundary **without any LLM provider**.

The stage implements:

```text
InterpretationRun
-> Evidence Selector
-> NarrativeEvidenceBundle
-> NarrativeDraft contract
-> deterministic Grounding Validator
-> deterministic fallback
```

The LLM remains out of scope. Therefore I8 proves that narrative grounding rules can be enforced independently of model behavior.

---

## Scenario-Addressable Evidence

`SelectedFact` now carries an explicit evidence reference:

```ts
interface SelectedFact {
  ref: string;
  path: string;
  scenarioRef?: string;
  fact: FactState<unknown>;
}
```

Base canonical facts retain refs such as:

```text
pillars.day
pillars.month
```

Scenario-resolved facts use:

```text
scenario:<scenarioId>:<path>
```

This prevents a scenario-specific InterpretationClaim from being narrated using only the ambiguous base fact.

For a scenario-specific claim, the Evidence Bundle preserves both:

1. the ambiguous base fact when ambiguity exists, and
2. the exact scenario-resolved fact used by that claim.

---

## Evidence Bundle Audit Identity

`NarrativeEvidenceBundle` records:

```text
snapshotId
interpretationRunId
registrySnapshotId
requestId
purpose
narrativePolicyVersion
```

The selector fails closed on:

```text
RUN_SNAPSHOT_MISMATCH
RUN_REGISTRY_MISMATCH
```

A Narrative Bundle therefore cannot silently combine a Claim Graph with a different Calculation Snapshot or Rule Registry Snapshot.

---

## Evidence Selector

Implemented:

```text
src/narrative/evidence-selector.ts
```

### Full reading

`full_reading` selects all active claims in the current InterpretationRun.

### Targeted purposes

The following require explicit target Claim IDs:

```text
section_reading
question_answer
method_comparison
```

Missing or inactive targets fail closed.

### Context expansion

Context expansion is direction-aware.

For:

```text
depends_on
derived_from
```

selection expands only from the selected dependent claim toward its upstream dependency.

Selecting an upstream claim does **not** pull downstream consumers into the Evidence Bundle.

For:

```text
contradicts
qualifies
supports
```

both related active claims are retained because the relation itself is relevant context.

This preserves data minimization and avoids broadening a targeted reading into unrelated downstream interpretations.

---

## Source Summaries

Source summaries are optional and use registered source metadata only.

The selector does not copy classical source passages into the Narrative Bundle.

I7 research sources remain configured with:

```text
reusePolicy = metadata_only
```

External/source text is not treated as an instruction.

---

## Grounding Validator

Implemented:

```text
src/narrative/grounding-validator.ts
```

Deterministic validation rejects:

- draft / bundle request ID mismatch,
- duplicate section IDs,
- assertions without evidence,
- unknown fact references,
- unknown claim references,
- unknown disclosure references,
- inactive claim evidence,
- ambiguous facts presented as deterministic facts,
- interpretation/synthesis/future assertions without claim evidence,
- missing methodology attribution,
- methodology / claim mismatch,
- comparison claim / methodology mismatch.

### Mandatory ambiguity disclosure

Every selected base `ambiguous` fact requires a:

```text
calculation_ambiguity
```

disclosure referencing that fact.

### Mandatory conflict disclosure

Every selected `contradicts` relation requires a:

```text
methodology_difference
```

disclosure referencing that relation ID.

### Mandatory scope disclosure

Every selected `SCOPE-GUARD` claim requires a:

```text
scope_limitation
```

disclosure referencing the guard claim.

This is particularly important for the I7 seasonal-support research pack: a narrow month-order signal cannot be narrated as an overall strong/weak Day Master conclusion without violating the governed evidence structure.

---

## Deterministic Fallback

Implemented:

```text
src/narrative/deterministic-fallback.ts
```

The fallback does not attempt fluent predictive prose.

It renders:

1. mandatory ambiguity disclosures,
2. mandatory conflict disclosures,
3. mandatory scope disclosures,
4. mechanical claim assertions with exact Claim evidence and methodology attribution.

The fallback itself is passed through the same Grounding Validator.

If the deterministic fallback somehow fails validation, it raises `DeterministicFallbackError` instead of returning an ungrounded Reading.

This provides a model-independent fail-safe for later I9 LLM failures.

---

## Evidence Bundle Identity

`buildNarrativeEvidenceBundle()` returns:

```text
NarrativeEvidenceBundle
evidenceBundleHash
```

The hash is deterministic for the same selected evidence, request identity, purpose, and Narrative Policy version.

---

## Tests

Primary I8 tests:

```text
test/narrative-evidence-selector.test.ts
test/narrative-evidence-minimization.test.ts
test/narrative-grounding-validator.test.ts
```

Coverage includes:

- full-reading evidence selection,
- deterministic Evidence Bundle hash,
- target requirement enforcement,
- invalid target rejection,
- target-only selection,
- downstream-claim minimization,
- upstream dependency inclusion,
- run Snapshot identity mismatch rejection,
- run Registry identity mismatch rejection,
- Lichun + jasi scenario-addressable evidence,
- base ambiguity preservation,
- scenario-resolved evidence refs,
- source summary selection,
- unsupported fact ref rejection,
- unsupported claim ref rejection,
- ambiguous fact used as deterministic assertion rejection,
- ambiguity disclosure enforcement,
- conflict disclosure enforcement,
- scope-limitation disclosure enforcement,
- exact methodology attribution enforcement,
- unknown disclosure ref rejection,
- deterministic fallback validation,
- deterministic fallback reproducibility.

---

## Hosted Verification

```text
CI run number: 190
run id:        32210115349
npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        PASS
build:         PASS

Test files:    16 passed
Tests:         101 passed
Job:           SUCCESS
```

---

## Explicit Non-Scope

I8 does not connect an LLM.

Not included:

- provider SDK,
- prompt compiler,
- provider structured-output adapter,
- repair attempt,
- semantic phrase verifier,
- user-facing final renderer,
- production life-prediction content.

Those belong to I9 and later stages.

---

## Closure

```text
SCENARIO_ADDRESSABLE_EVIDENCE = VERIFIED
RUN_SNAPSHOT_BINDING = VERIFIED
RUN_REGISTRY_BINDING = VERIFIED
TARGETED_EVIDENCE_MINIMIZATION = VERIFIED
UPSTREAM_DEPENDENCY_SELECTION = VERIFIED
UNSUPPORTED_EVIDENCE_REJECTION = VERIFIED
AMBIGUITY_DISCLOSURE = ENFORCED
CONFLICT_DISCLOSURE = ENFORCED
SCOPE_LIMITATION_DISCLOSURE = ENFORCED
METHODOLOGY_ATTRIBUTION = ENFORCED
DETERMINISTIC_FALLBACK = VERIFIED
FALLBACK_GROUNDING_VALIDATION = VERIFIED
EVIDENCE_BUNDLE_REPRODUCIBILITY = VERIFIED

I8 = STRICT CLOSED
```
