# Relationship / Spouse T8 — Day-Branch Spouse-Palace 2.0 Materialization

Issue: #1849

Watchtower-Track: saju-bridge

## Purpose

SA-5C materializes the narrow Day-Branch spouse-palace proposition established
by SA-5B as a new, executable **research-only** 2.0.0 claim contract.

This phase does not modify the closed 1.1.0 spouse-star selector runtime.

## Semantic successor

Old closed lineage:

```text
1.1.0
Yang Day Master -> 偏財
Yin Day Master  -> 偏官
role-neutral spouse-star marker
Production provenance path CLOSED / HOLD
```

New candidate:

```text
2.0.0
resolved natal Day Branch
-> traditional spouse-palace position
```

These are different semantics. The new rule does not declare
`relations.supersedes` against the old rules.

## Registered claim contract

Claim type:

```text
relationship.spouse.traditional_spouse_palace_position
```

Value:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

The actual Earthly Branch value is not copied into the claim. It remains
canonical fact data under `pillars.day` and is linked through `factRefs`.

The claim type is:

- natal scope;
- T8-only;
- exclusive;
- scenario-insensitive;
- not material for narrative.

## Methodology

Methodology family:

```text
domain_synthesis
```

This deliberately does not inherit the old `ten_gods` methodology family.

Required fact:

```text
pillars.day
```

The rule consumes only a resolved canonical Day Pillar.

Condition:

```text
relationship_spouse_day_pillar.branch.value exists
```

No T5/T6 reconstruction or demographic fallback exists.

## Fail-close contract

```text
resolved Day Pillar with branch.value -> one claim
ambiguous Day Pillar                  -> zero claim
unavailable Day Pillar                -> zero claim
missing Day Pillar                    -> zero claim
```

The same positional claim must be emitted for all twelve Earthly Branch values.

## Sex-input invariance

The positional determination does not consume
`sexForTraditionalCalculation`.

For the same resolved chart position:

```text
male
female
unspecified
```

must produce the same claim semantics.

This establishes only that **locating the spouse-palace position is
sex-independent**. It does not establish that all spouse interpretation is
gender-neutral.

## Source manifest candidate

Only the two sources actually counted by SA-5B for the multi-source route are
registered in the 2.0.0 candidate:

1. Jung Sua 2025
   - graduate thesis
   - `scholarly_secondary`
   - direct basis

2. Saju Atelier 2026
   - fully traversed public methodology/editorial body
   - `cross_reference`
   - independent direct basis

LEI and OpenFate remain Research corroboration only.

The historical `日支爲妻宮` witness remains a historical precursor only and is
not registered as universal modern partner authority.

Source bodies are not copied into the runtime candidate. Rights handling is
metadata-only with unknown copyright status.

## Provenance quality

SA-5B established:

```text
primary_supported       false
multi_source_supported  true
```

Therefore the **new 2.0.0 candidate rule only** carries:

```text
provenanceQuality = multi_source_supported
```

The existing 1.1.0 rules remain:

```text
provenanceQuality = unknown
reviewerStatus     = unreviewed
```

No retroactive provenance promotion occurs.

## Review and lifecycle

The new candidate remains:

```text
methodology = research
rule        = research
pack        = research
reviewerStatus = unreviewed
ReviewAttestations = 0
```

No ReviewerTrustGrant is created.

## Registered registry candidate

SA-5C builds a real `RuleRegistrySnapshot` containing:

- one claim schema;
- one claim type;
- one methodology;
- one rule;
- two direct-basis sources;
- zero review attestations;
- one research pack.

The registry must pass
`verifyResolvedRegistryContentIntegrity(...)`.

This proves the contract is machine-valid. It does **not** mean the bundle is
Bridge-admitted or staging-authorized.

## Forbidden expansion

The 2.0.0 positional marker does not authorize:

- spouse-star selection;
- partner identity;
- partner appearance or personality;
- partner sex, gender identity or orientation;
- marriage guarantee;
- marriage timing;
- divorce or relationship outcome;
- favorable/unfavorable spouse-palace judgment;
- Yongsin/Jisin semantics;
- broader Gung-Seong semantics;
- second-chart compatibility.

## Legacy preservation

The existing 1.1.0 staging lineage remains unchanged:

```text
version       1.1.0
methodology   reviewed
rules         reviewed
pack          staging
provenance    unknown
reviewer      unreviewed
```

SA-5C creates a parallel research candidate rather than mutating that runtime.

## SA-5C result

Expected successful materialization:

```text
semanticVersion                       2.0.0
claimContractMaterialized             true
sourceManifestCandidateMaterialized   true
registryIntegrityVerified             true
candidate provenanceQuality           multi_source_supported
candidate reviewerStatus              unreviewed

Bridge admission                      false
staging                               false
Preview                               false
Official Reading                      false
Production                            HOLD
```

## Next disposition

```text
RUN_SA_5D_BRIDGE_REENTRY_ADMISSION_REVIEW
```

SA-5D must review this exact content-addressed 2.0.0 bundle for Bridge
re-entry. SA-5C itself does not authorize execution as an admitted capability.
