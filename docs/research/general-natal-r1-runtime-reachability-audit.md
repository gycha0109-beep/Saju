# General Natal SAJU-R1 — End-to-End Reading Runtime Reachability Audit

Issue: #744  
Audit base: `b92a0f1d98e7bddd4554432f1c79191a92b728c8`

## Purpose

This artifact freezes one diagnostic answer for SAJU-R1: whether the existing conclusion-oriented General Natal T8 candidate is disconnected from the governed reading pipeline after claim generation, or whether the first real user-facing break occurs at Production admission.

It creates no new interpretation semantics and authorizes no lifecycle promotion.

## Traced runtime spine

```text
Canonical Saju Snapshot
→ derivedFacts.tenGods
→ T5 Ten-God family claims
→ T8/category=general conclusion claims
→ interpretation-engine / Claim Graph
→ ReadingIntent { general, natal }
→ myeonghwa-reading-profile-general-natal-v1
→ exact profile selection authorization
→ governed evidence selection
→ NarrativeEvidenceBundle
→ grounded narrative request
→ grounded narrative orchestration
→ ReadingArtifact assembly
→ generic ProductHost
→ authorized Production Host composition
```

## Result

The downstream reading spine is already present. The current capability disposition is:

```text
GENERAL_T8_CANDIDATE                 = RESEARCH_ONLY
CLAIM_GRAPH                          = IMPLEMENTED
GENERAL_NATAL_DOMAIN_PROFILE         = IMPLEMENTED
PROFILE_SELECTION_AUTHORIZATION      = IMPLEMENTED
EVIDENCE_SELECTION                   = IMPLEMENTED
NARRATIVE_EVIDENCE_BUNDLE            = IMPLEMENTED
GROUNDED_NARRATIVE_ORCHESTRATION     = IMPLEMENTED
READING_ARTIFACT_ASSEMBLY            = IMPLEMENTED
GENERIC_PRODUCT_HOST                 = IMPLEMENTED
AUTHORIZED_PRODUCTION_HOST_ADMISSION = BLOCKED
```

The General natal profile requires an active `T8/category=general` claim through `NATAL_DOMAIN_SYNTHESIS_CLAIM_REQUIRED` and its exact content-addressed profile ref is already authorized for evidence selection.

## First actual break

The conclusion candidate pack is still:

```text
PACK-GENERAL-NATAL-CONCLUSION-SYNTHESIS-CANDIDATE
version = 0.2.0-research
status  = research
```

`inspectMyeonghwaProductionComposition(...)` therefore reports an interpretation blocker containing:

```text
INTERPRETATION_PACK_NOT_PRODUCTION
```

Accordingly the first runtime blocker is not a missing Claim Graph, profile, evidence selector, Narrative pipeline, ReadingArtifact assembler, or generic ProductHost. It is the already-governed #730 authority frontier:

```text
GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_ADMISSION_AUTHORITY
```

Production remains `HOLD`.

## Gyeokguk boundary

The conclusion-oriented candidate consumes canonical Ten-God facts into T5 family-presence claims and then T8 conclusions. This audit preserves the previously established result:

```text
GyeokgukResolverRequiredForThisCandidate = false
```

No Gyeokguk candidate, establishment state, source-condition resolver, ordinary 強弱/旺衰 classifier, or root/Tonggen completion is introduced here.

## Diagnostic implementation boundary

The runtime audit binds to the existing exported contracts/functions for:

- `runInterpretation`
- `resolveDomainReadingProfile`
- `resolveReadingProfileSelectionAuthorization`
- `buildReadingCompositionEvidence`
- `buildNarrativeEvidenceBundle`
- `generateGroundedNarrative`
- `executeProductReading`
- `createMyeonghwaProductHost`
- `inspectMyeonghwaProductionComposition`
- the current General Natal conclusion candidate registry/pack/rules

The purpose is to make future drift fail tests instead of duplicating these systems.

## Explicit non-authority

This audit performs none of the following:

```text
lifecycle promotion
Production pack creation
source/provenance upgrade
reviewer/trust/attestation invention
execution-plan weakening
new ProductHost behavior
new Narrative semantics
LLM evidence gap filling
Gyeokguk completion
強弱 / 旺衰 completion
root/Tonggen semantic promotion
SKU / Payment / Entitlement / Refund / Commerce activation
```

## Next action

```text
General downstream integration = ALREADY_USABLE
Production admission           = NEEDS_BOUNDED_RESEARCH
Governing authority frontier   = #730
```

Do not open a duplicate downstream integration blocker unless this audit later proves one of the existing bindings has actually disappeared or become unreachable.
