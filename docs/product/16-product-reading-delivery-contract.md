# Product Reading Delivery Contract

## 1. Purpose

This stage defines the final product-facing boundary for governed reading execution.

The authoritative path is:

```text
Consumer Reading Text
→ Consumer Reading Request Adapter
→ ReadingIntent / authorized DomainReadingProfile
→ governed evidence composition
→ Product Reading Integration Boundary
→ Governed Reading Execution Orchestrator
→ Product Reading Delivery Contract
→ API / UI
```

The delivery layer does not calculate Saju facts, create interpretation claims, resolve methodology conflicts, select research authority, generate narrative text, or assemble a new ReadingArtifact.

It translates an already-governed execution result into a small consumer-safe state contract.

## 2. Primary invariant

```text
Internal execution state != consumer fortune meaning
Evidence coverage state != positive/negative fortune judgment
Research authority state != consumer message
```

The delivery layer must never reinterpret technical absence, HOLD state, unsupported intent, or partial evidence as good luck, bad luck, danger, opportunity, weakness, strength, or future tendency.

## 3. Public delivery states

```text
delivered
delivered_with_fallback
clarification_required
unsupported_request
invalid_request
partial_evidence
insufficient_evidence
unsupported_intent
temporarily_unavailable
```

### delivered

An existing governed `ReadingArtifact` is available.

### delivered_with_fallback

An existing governed `ReadingArtifact` is available, but the existing narrative runtime used its validated deterministic fallback after provider failure or failed constrained repair.

This is a narrative delivery status only. It does not create new interpretation authority.

### clarification_required

The request is ambiguous and no reading intent is selected by the system.

The delivery contract distinguishes:

- `domain`
- `temporal_scope`
- `request`

Domain options may be exposed only when the adapter already produced a complete multi-domain candidate set. Temporal ambiguity does not expose incomplete candidate intents as selectable options.

### unsupported_request

The raw consumer phrase is outside the frozen request grammar or otherwise cannot be normalized into an authorized request.

There is no fallback to a general reading.

### invalid_request

Required request context is missing or structurally invalid, such as a compatibility request without `targetPersonRef`.

### partial_evidence

Some required evidence exists but not all required evidence groups are satisfied.

The consumer contract exposes only aggregate coverage information:

```text
hasAvailableEvidence
missingRequirementCount
```

It does not expose internal claim IDs, requirement IDs, methodology IDs, research state, or raw authority diagnostics.

### insufficient_evidence

No required evidence group is satisfied for the requested reading profile.

This means evidence is insufficient for the requested reading. It does not mean the chart itself is negative, weak, dangerous, unlucky, or empty.

### unsupported_intent

The request shape reached the governed reading layer but no supported authorized selection contract is available.

### temporarily_unavailable

A runtime invariant required for safe delivery was not satisfied.

This is an availability state, not a fortune result.

## 4. Message codes

UI/API surfaces stable message codes instead of internal engine reason codes:

```text
READING_DELIVERED
READING_DELIVERED_WITH_GROUNDED_FALLBACK
READING_REQUEST_CLARIFICATION_REQUIRED
READING_REQUEST_NOT_SUPPORTED
READING_REQUEST_INVALID
READING_EVIDENCE_PARTIAL
READING_EVIDENCE_INSUFFICIENT
READING_INTENT_NOT_AVAILABLE
READING_TEMPORARILY_UNAVAILABLE
```

Localization and user-facing copy belong outside the engine contract.

## 5. Consumer-safe diagnostics

Only a narrow allowlist may leave the engine:

```text
target_person_required
request_text_required
question_text_required
request_not_recognized
```

Raw internal reason codes are not exposed.

Unknown internal reason codes fail closed by producing no consumer diagnostic rather than leaking internal governance semantics.

## 6. Coverage minimization

The product delivery layer may expose:

```text
coverage.state
coverage.hasAvailableEvidence
coverage.missingRequirementCount
```

It must not expose through this contract:

```text
selectedClaimIds
omittedClaimIds
missingRequirements
conflictRelationIds
profile authorization internals
research HOLD / suspension records
source admissibility decisions
```

The existing `ReadingArtifact.explainability` contract remains unchanged for successfully delivered readings. This stage does not broaden it.

## 7. Clarification safety

A candidate intent is not a selected intent.

```text
candidate intent != authorization to execute that reading
```

For `MULTIPLE_READING_DOMAINS_DETECTED`, complete domain candidate options may be returned for UI clarification.

For `MULTIPLE_TEMPORAL_SCOPES_DETECTED`, the current adapter does not guarantee a complete candidate set across all temporal possibilities. Therefore the delivery contract exposes only:

```text
clarification.kind = temporal_scope
```

and does not manufacture options.

## 8. Delivery identity

`deliveryId` is deterministic over governed execution identity plus delivery-state material.

Audit timestamps are not used as semantic delivery identity.

The delivery object retains only:

```text
audit.executionId
audit.preparationId
```

for traceability.

## 9. Frozen constraints

```text
mayExposeInternalClaimIds = false
mayExposeRawInternalReasonCodes = false
mayExposeResearchAuthorityStateAsConsumerMeaning = false
mayRenderCoverageAsFortuneJudgment = false
maySynthesizeMissingReadingText = false
mayTreatClarificationCandidateAsSelectedIntent = false
mayTreatFallbackAsNewInterpretationAuthority = false
```

## 10. Authority result

This stage authorizes only a consumer delivery representation of already-governed execution results.

It does not authorize:

- new interpretation rules;
- new domain semantics;
- parent / child / spouse heuristics;
- pillar-domain projection;
- Shinsal activation;
- numeric fortune scoring;
- missing claim synthesis;
- methodology winner selection;
- research authority promotion;
- provenance gate bypass;
- unsupported-request fallback to general reading.

I132 provenance independence, I232 hidden-stem HOLD, Qu Wei 2001 HOLD, Li 1998 `SUSPENDED_NOT_RETIRED`, I248 Yuding HOLD, current v2 immutability, and existing production interpretation authorization remain untouched.
