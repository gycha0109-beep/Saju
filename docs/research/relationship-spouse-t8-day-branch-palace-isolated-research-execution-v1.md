# Relationship / Spouse T8 SA-5E — Day-Branch spouse-palace 2.0 Isolated Research Execution

Issue: #1862

## Purpose

SA-5E executes only the exact SA-5D-admitted 2.0.0 Day-Branch spouse-palace candidate in an isolated research runtime.

This phase proves that the admitted content-addressed candidate can be executed without changing its semantic surface, source binding, lifecycle, reviewer authority, or consumer exposure.

## Upstream requirement

SA-5D must report:

```text
bridgeReentryAdmissionAuthorized = true
semanticVersion                  = 2.0.0
nextDisposition                  = BUILD_SA_5E_ISOLATED_RESEARCH_EXECUTION
```

SA-5E binds execution to the exact:

- SA-5D review hash;
- SA-5D candidate reference;
- registrySnapshotId;
- packRef.

Any drift invalidates the execution authority.

## Registry reuse

SA-5E does not create:

- a new claim schema;
- a new claim type;
- a new methodology;
- a new rule;
- a new source manifest;
- a new pack;
- a new registry.

It reuses:

```text
RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
```

exactly as admitted by SA-5D.

## Isolated execution authority

The local execution authority is content-addressed and has:

```text
authorityClass = bridge_reentry_isolated_research_execution
capabilityKey  = relationship:natal:spouse
semanticVersion = 2.0.0
```

It authorizes only isolated Research execution.

It explicitly does not authorize:

- lifecycle promotion;
- staging;
- shadow execution;
- narrative consumption;
- Preview;
- Official Reading;
- Production.

## Exact source binding

The reused registry must contain exactly:

1. Jung Sua 2025
   - scholarly_secondary
   - direct_basis

2. Saju Atelier 2026
   - cross_reference
   - direct_basis

The methodology source IDs and rule source refs must bind to the same exact pair.

LEI, OpenFate, and the historical 子平真詮 witness remain outside the runtime candidate.

## Execution wrapper

The isolated wrapper:

```text
runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution(...)
```

performs the following sequence:

```text
SA-5D exact admission check
        ↓
exact execution authority build
        ↓
authority validation
        ↓
registry / pack / source binding validation
        ↓
runInterpretation(
  exact SA-5C registry candidate
)
```

Callers may not supply:

```text
promotionAuthorityContext
reviewerTrustContext
```

The wrapper owns its research-only execution boundary.

## Runtime parity

For the same snapshot, these two paths must have identical semantic projections:

```text
runInterpretation(snapshot, exact 2.0.0 registry)

runRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution(snapshot)
```

The wrapper must not add, remove, or transform claims.

## Twelve-branch fixture matrix

Each resolved Earthly Branch:

```text
자 축 인 묘 진 사 오 미 신 유 술 해
```

must produce exactly one claim:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

with:

```text
claimType = relationship.spouse.traditional_spouse_palace_position
polarity  = neutral
factRefs  = ["pillars.day"]
```

The actual Earthly Branch value is not copied into the claim value.

## Fail-close parity

The isolated wrapper must preserve:

```text
resolved Day Pillar + branch.value -> one claim
ambiguous Day Pillar               -> zero claim
unavailable Day Pillar             -> zero claim
missing Day Pillar                 -> zero claim
```

No Day Master, T5, T6, other-pillar, or demographic fallback is allowed.

## Demographic invariance

For the same resolved chart position:

```text
male
female
unspecified
```

must produce the same semantic projection.

This proves only that spouse-palace position determination is independent of the traditional sex input.

It does not establish gender-neutrality for all spouse interpretation.

## Legacy 1.1.0 isolation

The existing spouse-star staging lineage remains unchanged:

```text
version      = 1.1.0
methodology  = reviewed
rules        = reviewed
pack         = staging
provenance   = unknown
reviewer     = unreviewed
```

The SA-5E isolated 2.0.0 result must not emit the legacy:

```text
relationship.spouse.role_neutral_spouse_star_marker
```

claim.

## Reviewer authority

SA-5E creates no:

- ReviewAttestation;
- ReviewerTrustGrant;
- reviewerStatus promotion;
- human domain review claim.

The 2.0.0 rule remains:

```text
reviewerStatus = unreviewed
```

## Successful SA-5E state

```text
bridgeReentryAdmissionAuthorized    = true
isolatedResearchExecutionAuthorized = true

newRegistryCreated                  = false
lifecycleMutationAuthorized         = false
stagingAuthorized                   = false
shadowExecutionAuthorized           = false
narrativeConsumerActivated          = false
previewAuthorityAuthorized          = false
officialReadingAuthorityAuthorized  = false
productionAuthorityAuthorized       = false

Production                          = HOLD
```

## Next disposition

On PASS:

```text
RUN_SA_5F_STAGING_LIFECYCLE_ELIGIBILITY_REVIEW
```

SA-5F must decide whether this exact, source-bound, isolated Research execution has sufficient lifecycle evidence to become a staging candidate.

Watchtower-Track: saju-bridge
