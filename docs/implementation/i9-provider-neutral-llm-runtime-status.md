# I9 — Provider-Neutral LLM Runtime Status

- Date: 2026-08-19
- Branch: `agent/architecture-foundation`
- Status:
  - **I9A Provider-Neutral LLM Runtime: STRICT CLOSED**
  - **I9B Production Provider Adapter: USER DECISION REQUIRED**

## Purpose

I9A establishes the complete model-governance runtime **without choosing a commercial LLM provider**.

Implemented path:

```text
NarrativeEvidenceBundle
-> GroundedNarrativeRequest
-> Prompt Compiler
-> provider-neutral NarrativeModelAdapter
-> untrusted structured provider output
-> runtime NarrativeDraft parser
-> deterministic Grounding Validator
-> at most one constrained repair call
-> deterministic fallback if still invalid
-> NarrativeRun audit record
```

This means provider selection can be deferred without weakening calculation, interpretation, or narrative authority boundaries.

---

## Provider-Neutral Adapter

Implemented:

```text
src/llm/model-adapter.ts
```

Contract:

```ts
interface NarrativeModelAdapter {
  readonly metadata: {
    provider: string;
    modelId: string;
    modelRevision?: string;
  };

  generateStructured(
    prompt: CompiledNarrativePrompt,
    params?: NarrativeGenerationParams,
  ): Promise<unknown>;
}
```

The provider returns `unknown` by design.

No provider response is trusted as a `NarrativeDraft` until runtime parsing and grounding validation succeed.

---

## Prompt Compiler

Implemented:

```text
src/llm/prompt-compiler.ts
```

Current compiler:

```text
myeonghwa-prompt-compiler-v1
```

Supported output schema:

```text
myeonghwa-narrative-draft-v1
```

Configuration fails before model execution on:

```text
REQUEST_ID_MISMATCH
PURPOSE_MISMATCH
POLICY_REF_MISMATCH
POLICY_VERSION_MISMATCH
OUTPUT_SCHEMA_UNSUPPORTED
EVIDENCE_CONSTRAINTS_INVALID
```

Authority instructions explicitly prohibit:

- recalculating Saju,
- inventing rules or sources,
- inventing evidence references,
- inventing certainty scores,
- collapsing ambiguity,
- silently choosing between conflicting methods,
- expanding narrow claims into broad life predictions.

User text, source metadata, source summaries, Claim values, and all Evidence Bundle strings are explicitly treated as **data, not instructions**.

User questions remain in a separate `userRequest` field and are not interpolated into the authority instruction list.

---

## Untrusted Output Parser

Implemented:

```text
src/llm/narrative-draft-parser.ts
```

The parser reconstructs a trusted `NarrativeDraft` from provider `unknown` output.

It does not use a TypeScript cast as a validation boundary.

It validates:

- root object,
- schemaVersion,
- requestId,
- non-empty sections,
- non-empty section blocks,
- assertion fields,
- evidence references,
- methodology references,
- comparison perspectives,
- disclosure types and refs,
- transitions,
- unresolved-question enums.

Structurally empty model responses are rejected.

---

## Epistemic Hardening

The I8 Grounding Validator was strengthened during I9.

### Deterministic fact boundary

```text
DETERMINISTIC_ASSERTION_WITH_CLAIM
```

An interpretation Claim cannot be relabeled as a deterministic fact.

### Future tendency boundary

```text
FUTURE_TENDENCY_WITHOUT_TIME_DYNAMIC_CLAIM
```

A `future_tendency` assertion requires at least one selected T9 time-dynamic Claim.

The current I7 T2 research pack therefore cannot authorize future-tendency language.

---

## Repair Policy

Implemented in:

```text
src/llm/narrative-orchestrator.ts
```

Maximum provider calls:

```text
2
```

Flow:

```text
first generation
  -> valid
     -> accept

  -> parse / grounding invalid
     -> exactly one repair call
        -> valid
           -> accept repaired output
        -> invalid
           -> deterministic fallback

  -> provider exception
     -> deterministic fallback immediately
```

A provider call that succeeds technically but returns an invalid/empty payload, including `undefined`, is treated as an invalid model output and receives the single repair attempt.

There is never an unbounded repair loop.

---

## Repair Prompt Constraints

Repair mode receives:

```text
previousOutput
violations[]
```

and is instructed to:

- repair only listed parser/grounding violations,
- add no new evidence,
- broaden no substantive Claim,
- preserve the original Evidence Bundle authority boundary.

---

## Deterministic Fallback

If repair still fails, I9 reuses the I8 deterministic fallback.

The fallback itself is validated by the same Grounding Validator.

Provider failure therefore does not convert into an ungrounded free-text answer.

---

## NarrativeRun Audit Record

`NarrativeRun` records:

```text
NarrativeRun ID
requestId
InterpretationRun ID
Evidence Bundle hash
provider
model ID
model revision (if supplied)
prompt compiler version
Narrative Policy ref
output schema version
generation params
first-pass validation status
repairAttempted
final status
violation list
createdAt
```

NarrativeRun identity is deterministic for identical:

- evidence,
- request identity,
- provider/model identity,
- generation parameters,
- final draft,
- validation outcome.

Audit timestamp does not alter the deterministic run ID.

---

## Provider Injection Test

Synthetic provider tests include a user request containing an instruction such as:

```text
IGNORE ALL PREVIOUS INSTRUCTIONS ...
```

The test verifies that this text remains only under `userRequest` and is never copied into the prompt authority instruction list.

This is not a claim that prompt injection is solved generally; it verifies the intended structural boundary in the prompt compiler.

---

## Tests

Primary I9 tests:

```text
test/llm-narrative-orchestrator.test.ts
test/llm-runtime-edgecases.test.ts
```

Coverage includes:

- provider-neutral adapter contract,
- prompt-policy identity checks,
- user text separation from authority instructions,
- valid first-pass structured output,
- grounding-invalid first pass,
- one constrained repair,
- repair success,
- repair failure -> deterministic fallback,
- provider exception -> deterministic fallback,
- no third model call,
- parse-invalid output repair,
- undefined provider payload repair,
- structurally empty NarrativeDraft rejection,
- deterministic NarrativeRun identity across audit timestamps,
- interpretation Claim cannot masquerade as deterministic fact,
- T2 research Claim cannot authorize future tendency.

---

## Hosted Verification

Latest provider-neutral I9 code gate:

```text
CI run number: 216
run id:        32210690410
npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        PASS
build:         PASS

Test files:    18 passed
Tests:         113 passed
Job:           SUCCESS
```

---

## I9B — Remaining Production Provider Work

No production provider SDK or API key is currently connected.

I9B requires an explicit provider/model decision because it introduces:

- external API dependency,
- recurring model cost,
- credential handling,
- provider data-retention/privacy terms,
- model-specific structured-output capabilities,
- latency / quota behavior.

The provider-neutral boundary means this decision can be made without changing the deterministic calculation or interpretation engines.

Candidate providers must be compared using current official documentation before selection.

---

## Explicit Non-Claims

I9A does not mean a production LLM has been selected or called.

It does not authorize production interpretation content beyond the existing I7 research-only corpus.

It does not establish real-world predictive accuracy.

---

## Closure

```text
PROVIDER_NEUTRAL_ADAPTER = VERIFIED
PROMPT_AUTHORITY_BOUNDARY = VERIFIED
UNTRUSTED_OUTPUT_PARSER = VERIFIED
GROUNDING_VALIDATION_CHAIN = VERIFIED
DETERMINISTIC_FACT_AUTHORITY = ENFORCED
FUTURE_TENDENCY_T9_GATE = ENFORCED
SINGLE_REPAIR_POLICY = VERIFIED
NO_UNBOUNDED_REPAIR_LOOP = VERIFIED
PROVIDER_FAILURE_FALLBACK = VERIFIED
INVALID_PAYLOAD_REPAIR = VERIFIED
NARRATIVE_RUN_REPRODUCIBILITY = VERIFIED

I9A = STRICT CLOSED
I9B = USER DECISION REQUIRED
```
