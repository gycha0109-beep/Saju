# Relationship / Spouse T8 — SA-5J Governed Staging Consumer Evidence Admission

Issue: #1912  
Track: `saju-bridge`

## Purpose

SA-5J reviews whether the exact SA-5I shadow-staging-validated Spouse T8
Day-Branch spouse-palace 2.0.0 claim may enter the existing governed Reading
evidence-selection pipeline.

This phase admits only evidence selection. It does not authorize narrative
generation, reading artifact assembly, Preview, Official Reading, public
semantic authority, or Production.

## Exact lineage

```text
SA-5C research claim contract
  -> SA-5D Bridge re-entry
  -> SA-5E isolated research execution
  -> SA-5F staging eligibility
  -> SA-5G explicit staging governance
  -> SA-5H staging lifecycle materialization
  -> SA-5I isolated shadow staging execution
  -> SA-5J governed consumer evidence selection
```

SA-5J binds to the exact SA-5I:

- `reviewId`
- upstream SA-5H materialization identity
- execution authority ref
- staging registry snapshot id
- staging pack ref
- Gate 14 `SATISFIED`
- `requiredShadowStagingEvidenceComplete = true`

The SA-5I review content hash is recomputed before admission. A stale or
rehashed-but-different SA-5I review fails closed.

## Existing spouse Reading Profile reuse

SA-5J does not create a new profile.

It reuses:

```text
myeonghwa-reading-profile-relationship-spouse-natal-v1
```

The existing profile authorization must resolve as:

```text
decision = authorized_for_selection
scope = reading_evidence_selection_only
```

The authorization explicitly does not allow:

- interpretation-rule authorization
- claim generation
- domain-semantic authorization
- research-authority promotion
- interpretation-authorization override

## Staging execution

SA-5J runs the exact SA-5I source-adjudicated staging wrapper against a
deterministic canonical fixture.

The run must:

- use the exact SA-5H staging registry
- record the exact SA-5I source-adjudication execution authority
- emit exactly one active claim
- emit only
  `relationship.spouse.traditional_spouse_palace_position`
- reference only `pillars.day`

## Product Reading preparation

The exact staging execution is passed to the existing
`prepareProductReading` pipeline with the spouse request `배우자운`.

The preparation must resolve:

- domain: `relationship`
- temporal scope: `natal`
- relationship scope: `spouse`
- coverage: `complete`
- exactly one target claim
- exactly one selected claim
- no missing requirements
- governed evidence bundle present

The governed evidence bundle must contain:

- exactly the selected 2.0 position-only claim
- exactly the canonical `pillars.day` fact
- the exact staging registry identity
- source metadata for the exact two-source staging provenance set

## Important authority distinction

The generic Product Reading integration reports:

```text
readingExecution = allowed
artifactAssembly = allowed_after_authority_execution
```

These are generic preparation-state outputs. SA-5J does **not** treat them as
an authorization to create or deliver a user-facing artifact.

SA-5J's own authority boundary is narrower:

```text
consumerAdmissionScope =
  governed_reading_evidence_selection_only

narrativeGenerationAuthorized = false
artifactAssemblyAuthorized = false
previewAuthorityAuthorized = false
officialReadingAuthorityAuthorized = false
publicSemanticAuthorityAuthorized = false
productionAuthorityAuthorized = false
```

## Semantic and review boundary

The admitted claim remains exactly:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

The phase preserves:

- `materialForNarrative = false`
- `provenanceQuality = multi_source_supported`
- `reviewerStatus = unreviewed`
- zero `ReviewAttestation`
- zero `ReviewerTrustGrant`
- Production `HOLD`

SA-5J does not authorize spouse-star selection, partner personality or
identity, marriage timing or outcome, favorable/unfavorable palace judgment,
Yongsin/Jisin semantics, or second-chart compatibility.

## PASS

PASS establishes only:

- exact SA-5I staging authority preserved
- existing spouse Reading Profile selection authorized
- exact 2.0 staging claim selected
- governed Reading evidence bundle constructed
- evidence-selection consumer admission established

## Next disposition

PASS:

```text
RUN_SA_5K_NARRATIVE_ELIGIBILITY_AND_DELIVERY_AUTHORITY_REVIEW
```

FAIL:

```text
HOLD_AND_REPAIR_SA_5J_CONSUMER_EVIDENCE_ADMISSION
```

SA-5K must separately decide whether this claim may ever become
narrative-material or a delivered Reading artifact. SA-5J itself does not make
that decision.
