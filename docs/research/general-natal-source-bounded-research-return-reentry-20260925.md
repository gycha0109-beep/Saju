# Saju Bridge — General Natal Research Return and Re-entry

Issue: #1482

Watchtower-Track: saju-bridge

## Purpose

This artifact operationalizes the RETURN_TO_RESEARCH disposition created by #1447 / PR #1449.

It does not perform traditional Saju research. It defines exactly what Research must return and how Bridge decides whether that returned evidence is sufficient to reopen Authority review.

## Flow

```text
Bridge Review #1
RETURN_TO_RESEARCH
        |
        v
content-addressed Research-return handoff
        |
        v
Research closes source-integrity gaps
        |
        v
Bridge re-entry readiness
        |
        +-- source incomplete ----------> RETURN_TO_RESEARCH
        |
        +-- candidate binding drift ---> REFRESH_BRIDGE_SUBJECT_BINDING
        |
        +-- handoff tampered ----------> INVALID_RESEARCH_RETURN_HANDOFF
        |
        '-- source complete + binding current
                                   |
                                   v
                         READY_FOR_BRIDGE_REVIEW
```

READY_FOR_BRIDGE_REVIEW is not Engine or Production admission.

## Research-owned work

The current handoff separates the Research work into explicit source-evidence obligations.

### Fixed witness mesh

Research must close or explicitly re-register the frozen witness identity problems without turning OCR corroboration into exact identity.

The current evidence still preserves:

```text
witnessCount = 16
full source integrity = false
exact physical page/folio authority = false
exact witness digest reproduction authority = false
textual-variant divergence > 0
```

The existing required-next-evidence list is carried through the handoff rather than rewritten into a new semantic rule.

### 三命通會 卷七 peer taxonomy

The current peer source already has:

```text
same-edition scan located
exact digital scan page verified
bounded proposition directly observed
direct scan image comparison completed
```

It still lacks:

```text
exact physical page/folio verification
exact witness digest reproduction
exact scan/transcription identity
full source-integrity qualification
```

Research owns those evidence questions.

## Research does not own later Authority decisions

Research return must not create:

- ReviewAttestation;
- ReviewerTrustGrant;
- provenance-quality promotion;
- lifecycle promotion;
- Engine admission;
- Official Reading admission;
- Production admission.

Those remain separate governed decisions after source evidence is sufficient.

## Candidate binding

The handoff binds the exact current:

- candidate version;
- registry snapshot ID;
- pack content hash;
- review-subject manifest hash;
- all 11 content-addressed methodology/rule subjects.

The re-entry evaluator compares the stored handoff binding with the then-current repository binding.

If the candidate or review surface changes, the previous handoff cannot silently follow the new content.

```text
candidate drift
=> REFRESH_BRIDGE_SUBJECT_BINDING
!= reuse stale review assumptions
```

The handoff itself is content-addressed. A modified handoff whose payload no longer matches its handoff ID is rejected.

## Current expected result

With the repository state at #1482 creation:

```text
handoffIntegrityValid = true
candidateBindingFresh = true
sourceIntegrityReady = false

researchReturnRequired = true
bridgeReentryReady = false
nextDisposition = RETURN_TO_RESEARCH
```

## After source closure

Even when both source-integrity families are simulated as complete, the only new state is:

```text
nextDisposition = READY_FOR_BRIDGE_REVIEW
```

The following remain false:

```text
domainReviewAuthorityEstablished
trustedDomainAttestationEstablished
provenanceQualityPromotionAuthorized
lifecyclePromotionAuthorized
engineAuthorityPromotionAuthorized
officialReadingAuthorityAuthorized
productionAdmissionAuthority
```

Production remains HOLD.

## Persistence boundary

A Research-return handoff is the baseline produced by the prior Bridge decision.

Do not regenerate a fresh handoff after Research changes and then pretend it is the original baseline. The caller must retain the content-addressed handoff it received and submit that same object for re-entry assessment.

This is what makes candidate-drift detection meaningful.

## Non-scope

No new classical proposition, source reinterpretation, direct scan research, review fabrication, trust fabrication, provenance/lifecycle mutation, Engine rule, Preview/Official/Production expansion, workflow, Gyeokguk, 強弱, 旺衰, Yongshin, SKU, or Commerce change is introduced.
