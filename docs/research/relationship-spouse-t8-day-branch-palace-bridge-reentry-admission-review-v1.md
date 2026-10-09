# Relationship / Spouse T8 SA-5D — Day-Branch spouse-palace 2.0 Bridge Re-entry Admission Review

Issue: #1857

## Purpose

SA-5D answers one bounded question:

> May the exact content-addressed 2.0.0 Day-Branch spouse-palace research bundle re-enter the `relationship:natal:spouse` Bridge research lineage?

This phase is an admission review only.

It does not execute the candidate through a new Bridge runtime and does not promote lifecycle state.

## Upstream lineage

The reviewed candidate must bind exactly to:

- SA-5A selector redesign;
- SA-5B Day-Branch spouse-palace provenance acquisition;
- SA-5C 2.0.0 claim/source/registry materialization.

SA-5C must report:

```text
candidateMaterialized       true
bridgeReentryReadyForReview true
semanticVersion             2.0.0
nextDisposition             RUN_SA_5D_BRIDGE_REENTRY_ADMISSION_REVIEW
```

The admission artifact creates a deterministic candidate reference from:

```text
SA-5C materializationId
+ semantic family/version
+ exact registrySnapshotId
+ exact packRef
```

No loosely matching candidate is admitted.

## Admission dimensions

SA-5D checks all of the following.

### 1. Semantic scope

The only allowed semantic is:

```text
resolved natal Day Branch
→ traditional spouse-palace position
```

Claim value remains:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

No spouse-star, partner characteristic, marriage event, timing, outcome, favorable/unfavorable judgment, Yongsin/Jisin, broader Gung-Seong semantics, or compatibility is admitted.

### 2. Canonical input sufficiency

The candidate may consume only:

```text
pillars.day
```

with status:

```text
resolved
```

and condition:

```text
branch.value exists
```

No demographic or second-chart input is allowed.

### 3. Provenance exactness

The candidate must contain exactly the SA-5B counted independent direct-basis pair:

1. Jung Sua 2025 — `scholarly_secondary`
2. Saju Atelier 2026 — `cross_reference`

Both rule source links remain `direct_basis`.

`multi_source_supported` applies only to this 2.0.0 candidate.

### 4. Registry integrity

The exact candidate must remain:

```text
1 claim schema
1 claim type
1 methodology
1 rule
2 sources
0 ReviewAttestations
1 research pack
```

and pass `verifyResolvedRegistryContentIntegrity(...)`.

### 5. Fail-close

Dynamic admission verification preserves:

```text
resolved Day Pillar + branch.value -> exactly one claim
ambiguous Day Pillar               -> zero claim
unavailable Day Pillar             -> zero claim
missing Day Pillar                 -> zero claim
```

All twelve Earthly Branch values produce the same position-only semantic.

### 6. Demographic invariance

For the same resolved chart position:

```text
male
female
unspecified
```

must produce the same semantic projection.

This proves only that spouse-palace position determination is sex-independent.

### 7. Legacy isolation

The old 1.1.0 staging lineage remains untouched:

```text
methodology = reviewed
rules       = reviewed
pack        = staging
provenance  = unknown
reviewer    = unreviewed
```

No same-claim `supersedes` relation is introduced between 1.1.0 and 2.0.0.

### 8. Consumer and reviewer isolation

SA-5D does not create:

- ReviewAttestation;
- ReviewerTrustGrant;
- `domain_reviewed`;
- narrative consumer activation;
- Preview activation;
- Official Reading authority;
- Production authority.

## PASS meaning

PASS means only:

```text
bridgeReentryAdmissionAuthorized = true
```

It does not mean:

```text
isolatedResearchExecutionAuthorized = true
stagingAuthorized                  = true
shadowExecutionAuthorized          = true
Production                         = authorized
```

Those remain false/HOLD.

## Next disposition

On PASS:

```text
BUILD_SA_5E_ISOLATED_RESEARCH_EXECUTION
```

SA-5E must create a separate isolated execution path for this exact admitted candidate and prove source-bound runtime / fixture parity without activating consumers or Production.

Watchtower-Track: saju-bridge
