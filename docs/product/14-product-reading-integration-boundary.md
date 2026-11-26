# Product Reading Integration Boundary v1

## Purpose

This boundary connects the already-governed consumer request normalization and reading evidence selection layers without creating any new Saju interpretation semantics.

```text
Consumer Reading Text
→ Consumer Reading Request Adapter
→ validated ReadingRequest
→ authorized DomainReadingProfile
→ existing Claim Graph / Evidence Selector
→ coverage decision
→ GroundedNarrativeRequest eligibility
```

The boundary decides whether the product may invoke grounded narrative generation. It does not interpret Saju, create claims, repair missing evidence, select a methodology winner, or authorize new domain meaning.

## Runtime contract

`prepareProductReading()` returns one deterministic preparation state:

```text
ready_for_narrative
input_ambiguous
input_unsupported
input_invalid
partial_coverage
insufficient_evidence
unsupported_intent
invariant_blocked
```

Only `ready_for_narrative` may emit a `GroundedNarrativeRequest`.

A request can become `ready_for_narrative` only when all of the following are true:

1. consumer input normalization is `resolved`;
2. a validated `ReadingRequest` exists;
3. the exact reading profile content is selection-authorized;
4. reading evidence selection coverage is `complete`;
5. the existing Evidence Selector produced a `NarrativeEvidenceBundle`.

## Coverage policy

### complete

`complete` may proceed to grounded narrative generation. The narrative request contains the exact existing evidence bundle and does not grant the model any calculation or interpretation authority.

### partial_coverage

Partial evidence is preserved for inspection, but v1 does not invoke the narrative model. Missing required selector groups must remain visible to the product.

### insufficient_evidence

No narrative model invocation is allowed. The product must surface the missing evidence state rather than generate a fallback fortune reading.

### unsupported_intent

No narrative model invocation is allowed. The product must not convert the request to `general` or another supported intent.

## Input policy

`ambiguous`, `unsupported`, and `invalid` normalization states stop before evidence composition.

The product must not:

- choose one domain when multiple domains were detected;
- choose annual or monthly when both temporal scopes were detected;
- silently convert arbitrary free text to question-specific reading;
- replace unsupported input with a generic Saju reading.

## Conflict and ambiguity preservation

The integration layer reuses the existing claim graph and evidence selector.

It therefore must not:

- resolve contradictory methodology claims;
- collapse unknown-time scenarios;
- synthesize missing claims;
- use an LLM to infer evidence that is absent from the interpretation run.

## Narrative request identity

A ready preparation emits a content-addressed narrative request reference derived from the exact `GroundedNarrativeRequest`.

The product preparation identity is deterministic over:

- normalization identity;
- evidence selection identity;
- narrative request identity;
- integration version;
- delivery state and reason codes.

## Delivery eligibility

The result exposes separate narrative and artifact eligibility.

```text
ready_for_narrative
  narrativeGeneration = allowed
  artifactAssembly = allowed_after_grounded_narrative

input failure
  narrativeGeneration = blocked_input
  artifactAssembly = blocked_input

coverage failure
  narrativeGeneration = blocked_coverage
  artifactAssembly = blocked_coverage

invariant failure
  narrativeGeneration = blocked_invariant
  artifactAssembly = blocked_invariant
```

`ReadingArtifact` is not duplicated or redefined. Existing `assembleReadingArtifact()` remains authoritative after a validated grounded narrative has actually been generated.

## Authority boundary

```text
new interpretation rule created             = NO
new production domain meaning authorized    = NO
new shinsal rule activated                   = NO
pillar-domain projection activated           = NO
existing provenance gate weakened            = NO
LLM missing-evidence supplementation         = NO
unsupported-intent fallback to general       = NO
methodology conflict winner selection        = NO
numeric fortune scoring                      = NO
```

The integration boundary explicitly freezes:

```text
mayFillMissingEvidenceWithLLM        = false
mayFallbackUnsupportedIntentToGeneral = false
mayCollapseAmbiguity                 = false
mayGenerateInterpretationClaims      = false
mayResolveMethodologyConflicts       = false
mayPromoteResearchAuthority          = false
```

I132 provenance independence, I232 hidden-stem HOLD, Qu Wei 2001 HOLD, Li 1998 `SUSPENDED_NOT_RETIRED`, I248 Yuding Suijinlu HOLD, the current immutable v2 package/candidate set, and existing production interpretation authorization remain unchanged.
