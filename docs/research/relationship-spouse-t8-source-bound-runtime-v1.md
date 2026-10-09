# Saju Bridge — Relationship / Spouse T8 Source-Bound Research Runtime

Issue: #1651

Watchtower-Track: saju-bridge

Follows: #1647 / merged PR #1648

## Result

```text
historical runtime = 1.0.0, preserved
source-bound runtime = 1.0.1

sourceBindingMaterialized = true
registeredSourceCount = 2
methodologySourceCount = 2
ruleSourceBindingCount = 2

runtimeScope = isolated_research_only
lifecycle = research

productionSourceTierEligibility = true
Production = HOLD
```

## Historical integrity

The existing `relationship-spouse-t8-runtime-admission.ts` 1.0.0 artifact is not edited.

That preserves the exact content-addressed historical state consumed by prior Bridge, post-admission, and promotion-readiness reviews.

The source-bound runtime is a successor artifact, not a retroactive rewrite.

## Materialized sources

The 1.0.1 registry registers exactly two reviewed source records.

### Whisper 2026

```text
sourceId = SRC-RELATIONSHIP-SPOUSE-T8-WHISPER-2026-DAY-MASTER-POLARITY
provenanceTier = cross_reference
```

Runtime role:

- methodology source;
- direct basis for the Yang selector rule;
- direct basis for the Yin selector rule.

### Lee Youngeun 2025

```text
sourceId = SRC-RELATIONSHIP-SPOUSE-T8-LEE-YOUNGEUN-2025-MODERN-SPOUSE-REMAP
provenanceTier = scholarly_secondary
```

Runtime role:

- methodology-level independent modern normative context only.

Lee is intentionally absent from both selector-rule source-reference arrays.

## Methodology binding

The source-bound methodology contains:

```text
sourceIds = [
  Whisper,
  Lee Youngeun
]
```

Its input contract is unchanged from 1.0.0:

```text
derivedFacts.dayMaster
resolved only
```

No T5 reconstruction or demographic input is introduced.

## Rule binding

Both rules remain semantically identical to 1.0.0.

```text
Yang Day Master
  -> INDIRECT_WEALTH / 편재 / 偏財
  -> Whisper / direct_basis

Yin Day Master
  -> INDIRECT_POWER / 편관 / 偏官
  -> Whisper / direct_basis
```

The source binding changes provenance linkage, not the Saju proposition.

## Semantic invariance

Regression coverage compares the source-bound 1.0.1 runtime against historical 1.0.0 for both governed resolved states.

The comparison covers:

- claim type;
- taxonomy;
- subject;
- predicate;
- value;
- polarity;
- emphasis.

The source-bound runtime must therefore emit the same governed semantic result even though its rule and methodology content addresses differ because provenance has now been attached.

Fail-closed behavior is also preserved for:

- ambiguous Day Master;
- unavailable Day Master;
- pending Day Master;
- missing Day Master.

## Production boundary

Source binding now satisfies the existing Production source-tier classification gate.

The registered tiers remain:

```text
Whisper      = cross_reference
Lee Youngeun = scholarly_secondary
```

The governed Spouse T8 Production source-tier policy accepts:

```text
primary
scholarly_secondary
cross_reference
```

Therefore:

```text
productionSourceTierEligibility = true
```

Whisper remains `cross_reference`; no tier promotion is performed. Passing this one gate does not imply Production readiness because reviewer trust, domain review, lifecycle, and other promotion requirements remain unsatisfied.

## Still closed

The source-bound runtime does not establish:

- reviewer trust;
- domain review attestation;
- lifecycle promotion;
- P0/P1/P2 consumer authorization;
- narrative activation;
- compatibility activation;
- preview/default-route activation;
- Official Reading authority;
- Production admission.

Rule reviewer status remains `unreviewed`.

Pack and rule lifecycle remain `research`.

Production remains HOLD.

## Next governance frontier

After this source-bound runtime passes CI, the next review is not another semantic rewrite.

The next review must evaluate the source-tier / promotion boundary against the newly materialized runtime:

```text
source binding materialized
        |
        v
runtime provenance present
        |
        v
Promotion provenance / reviewer-authority review
        |
        +-- source registration + source-tier gate are now satisfied
        |
        +-- reviewer trust / attestation / lifecycle blockers remain -> HOLD
```

No tier inflation is authorized by this artifact.
