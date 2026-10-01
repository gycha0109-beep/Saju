# Relationship / Spouse T8 — SA-5M Prospective Trusted Human-Domain Materialization Contract

Issue: #1941  
Track: `saju-bridge`

## Purpose

This contract freezes the only authority mutations that a later SA-5M materialization record review may consider for the Day-Branch spouse-palace 2.0.0 semantic line.

It does **not** materialize authority.

## Current state

The current repository state remains:

```text
ReviewAttestations = []
reviewerStatus = unreviewed
materialForNarrative = false
methodology lifecycle = reviewed
rule lifecycle = reviewed
pack lifecycle = staging
provenanceQuality = multi_source_supported
Production = HOLD
```

The current SA-5M readiness gate is intentionally blocked because no real external human/domain submission exists.

## Future validation pipeline

A later authority-changing gate must require this exact sequence:

1. real external human/domain submission is supplied
2. existing SA-5L submission validator passes
3. SA-5M readiness gate passes with that exact submission
4. a separate SA-5M materialization record review is run

Repository-controlled test data, CI success, owner approval, generic user approval, or synthetic fixtures cannot replace steps 1–3.

## Only prospective mutation candidates

Exactly three mutations may be considered later:

### 1. ReviewAttestation registration

- current count: `0`
- future target count: `2`
- subjects: exact current methodology ref + exact current rule ref
- level: `domain`
- decision: `approved`
- attestations must be externally supplied
- separately governed trust context must pin the exact attestation hashes

This contract creates no attestation.

### 2. Reviewer status

Prospective target only:

```text
unreviewed -> domain_reviewed
```

This contract does not apply the change.

### 3. Narrative materiality

Prospective target only:

```text
claimType = relationship.spouse.traditional_spouse_palace_position
semanticScope = position_only
materialForNarrative = false -> true
```

Allowed proposition remains exactly:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

The following extensions remain prohibited:

- spouse_star_selection
- partner_personality
- partner_identity
- marriage_timing
- marriage_outcome
- relationship_outcome
- favorable_unfavorable_palace_judgment
- yongshin_jisin_semantics
- second_chart_compatibility
- sex_scoped_spouse_role_expansion

## Invariants that must remain unchanged

Even if a future external submission passes validation, this prospective contract itself never authorizes:

```text
ReviewerTrustContext creation
ReviewerTrustGrant creation
ReviewAttestation registration
reviewerStatus promotion
materialForNarrative mutation
ClaimNarrativeProfile creation
narrative generation
artifact assembly
delivery authority
Preview authority
Official Reading authority
public semantic authority
Production authority
```

`Production = HOLD` remains mandatory.

## Synthetic fixtures

Synthetic reviewers and synthetic trust packages may be used only to test validators.

They may never satisfy authority.

## Next disposition

Until real external human/domain inputs exist:

```text
AWAIT_REAL_EXTERNAL_HUMAN_DOMAIN_SUBMISSION_THEN_RUN_SEPARATE_SA_5M_MATERIALIZATION_RECORD_REVIEW
```
