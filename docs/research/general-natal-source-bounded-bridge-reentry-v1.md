# General Natal Source-bounded Research Return / Bridge Re-entry v1

Issue: #1482  
Track: `saju-bridge`

## Purpose

PR #1449 returned the current General Natal source-bounded candidate to Research without rejecting it. This artifact turns that disposition into a deterministic handoff and a fail-closed Bridge re-entry gate.

It does not perform traditional Saju research, create new propositions, promote provenance, create review/trust identity, admit Engine authority, or expand Official/Production scope.

## State machine

```text
RETURN_TO_RESEARCH
  -> traditional Saju Research closes source-integrity work
  -> READY_FOR_BRIDGE_REREVIEW

candidate methodology/rule surface drift
  -> FRESH_REVIEW_SURFACE_REQUIRED
  -> create a new content-addressed review surface before reusing Bridge assumptions
```

`READY_FOR_BRIDGE_REREVIEW` is the highest authority this artifact can emit. It is not an admission decision.

## Research return workstreams

1. Fixed-witness source integrity: exact scan/transcription surface, physical page/folio where required, direct comparison, and full scan qualification for all fixed witnesses.
2. Exact transcription identity: preserve textual-variant divergence and never equate OCR/cross-edition corroboration with exact identity.
3. Scan-verified digest reproduction: reuse the existing exact-bounded-substring / UTF-8 / no-normalization / SHA-256 contract.
4. 三命通會 卷七 peer source integrity: complete physical page/folio, scan-derived witness hash, exact transcription identity, and full source-integrity qualification.

## Deferred governance

Research does not decide or fabricate ReviewAttestation, ReviewerTrustGrant, provenance-quality promotion, lifecycle promotion, Engine authority, Official Reading authority, or Production admission.

Even when all Research work is hypothetically complete, the re-entry evaluator keeps all of those authority flags false and returns only `READY_FOR_BRIDGE_REREVIEW`.

## Candidate freshness

The re-entry gate locks the exact #1449 content-addressed review surface:

- candidate version `0.2.0-research`;
- one pack;
- one methodology;
- ten rules;
- eleven review subjects in total.

The baseline uses the content hashes of the pack, methodology, and every rule. Any content-addressed drift produces `FRESH_REVIEW_SURFACE_REQUIRED`, even when source-integrity evidence is otherwise complete.

Research evidence hashes are intentionally not part of the frozen candidate surface. Research must be able to improve source-integrity evidence without being mistaken for a methodology/rule mutation.

## Current expected result

```text
candidateBindingFresh = true
sourceIntegrityReady = false
researchReturnRequired = true
bridgeReentryReady = false
nextDisposition = RETURN_TO_RESEARCH
```

Current Research blockers remain the fixed-witness source-integrity stream and the 三命通會 卷七 peer-source integrity stream.

## Non-scope

No new classical proposition, source reinterpretation, direct scan research, fabricated review/trust identity, provenance/lifecycle mutation, Engine rule implementation, Preview/Official/Production expansion, workflow creation, Gyeokguk, 強弱/旺衰, Yongshin, timing, SKU, or Commerce work.
