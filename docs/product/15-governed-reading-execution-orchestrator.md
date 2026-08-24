# Governed Reading Execution Orchestrator

## Purpose

This contract closes the product execution path after Product Reading preparation without creating a second narrative runtime or a second ReadingArtifact assembler.

```text
Consumer Reading Input
→ prepareProductReading()
→ delivery eligibility
→ generateGroundedNarrative()
→ existing grounding validation / one-repair policy / deterministic fallback
→ assembleReadingArtifact()
→ GovernedReadingExecutionResult
```

The orchestrator coordinates existing authorities. It is not calculation authority, interpretation authority, profile authorization authority, evidence authority, or narrative grounding authority.

## Runtime entry point

```ts
executeProductReading(
  snapshot,
  interpretation,
  registry,
  input,
  adapter,
  narrativePolicy,
  options,
)
```

The supplied `NarrativePolicy` is converted to the exact `narrativePolicyRef` used by `prepareProductReading()`. Callers cannot provide a separate policy reference that silently disagrees with the policy used for generation.

## Execution states

The orchestrator preserves every blocked Product Reading preparation state:

```text
input_ambiguous
input_unsupported
input_invalid
partial_coverage
insufficient_evidence
unsupported_intent
invariant_blocked
```

Successful execution adds:

```text
completed
completed_with_fallback
```

`completed_with_fallback` means the existing narrative runtime exhausted its allowed provider/repair path and produced its validated deterministic fallback. It does not mean evidence coverage was relaxed.

## Zero-call fail-closed boundary

If `prepareProductReading()` does not return `ready_for_narrative`, the orchestrator returns immediately.

For every blocked preparation:

```text
modelCalls = 0
narrative  = absent
artifact   = absent
```

This remains true even when a `partial_coverage` composition contains a partial `NarrativeEvidenceBundle` for inspection. Partial evidence is not permission to ask an LLM to fill the missing requirements.

## Allowed execution path

A model call can occur only when all of the following are already true:

1. consumer normalization is resolved;
2. a validated `ReadingRequest` exists;
3. the exact Reading Profile content is selection-authorized;
4. evidence coverage is `complete`;
5. the existing Evidence Selector produced a `NarrativeEvidenceBundle`;
6. Product Reading preparation emitted a `GroundedNarrativeRequest` and marked narrative generation `allowed`.

The orchestrator then delegates to the existing `generateGroundedNarrative()` implementation. It does not add retries or bypass grounding validation.

## Narrative runtime inheritance

Existing narrative behavior is preserved:

```text
valid first pass
→ accept

invalid first pass
→ one constrained repair
→ accept if grounded

provider failure
→ deterministic grounded fallback

failed repair
→ deterministic grounded fallback
```

The execution layer cannot perform a third model call beyond the existing runtime policy.

## ReadingArtifact boundary

`ReadingArtifact` and `assembleReadingArtifact()` remain unchanged.

Artifact assembly occurs only after `generateGroundedNarrative()` returns a grounded `NarrativeGenerationResult` or the runtime's validated deterministic fallback.

Therefore:

```text
Preparation != Narrative
Narrative != ReadingArtifact
Partial Evidence != Artifact Authorization
Provider Failure != Evidence Relaxation
```

## Deterministic identity

`executionId` is content-derived from:

```text
orchestratorVersion
preparationId
narrativeRunId, when present
narrativeOutcome, when present
readingId, when present
modelCalls
reasonCodes
frozen execution constraints
```

Audit timestamps are intentionally excluded from execution identity. The same evidence, provider output, contract versions, and reading content therefore retain the same execution identity across audit-time changes.

## Authority constraints

The execution result freezes:

```text
mayInvokeModelWhenPreparationBlocked = false
mayAssembleArtifactWithoutGroundedNarrative = false
mayBypassGroundingValidation = false
mayRetryBeyondNarrativeRuntimePolicy = false
mayFillMissingEvidenceWithLLM = false
mayPromoteResearchAuthority = false
```

This Stage does not create or authorize:

- interpretation rules;
- domain meanings;
- Shinsal rules;
- pillar-domain projection semantics;
- numeric fortune scoring;
- parent/child/spouse heuristics;
- unsupported-intent fallback;
- methodology winner selection;
- evidence supplementation by LLM;
- research/provenance promotion.

Existing I132 provenance independence, I232 hidden-stem HOLD, Qu Wei 2001 HOLD, Li 1998 `SUSPENDED_NOT_RETIRED`, I248 Yuding HOLD, v2 immutability, and production interpretation authorization remain unchanged.
