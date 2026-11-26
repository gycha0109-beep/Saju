# I32 Challenge Target Clash Dependency Methodology Review v1

## Purpose

I32 audits whether the existing I20/I20B/I20C/I20D clash-related research substrate can be reused for a challenge-target intrinsic root candidate routed by I31.

The review separates generic structural calculations from report contracts tied to the day-master/root pipeline.

It does **not** emit relative branch force, clash winner, target post-relation root state, effective mechanism force, usefulness/harmfulness, day-master strength, or numeric scoring.

## Source and code audit

### 1. Seasonal element phase is generic structural evidence

I20 derives `旺/相/休/囚/死` from only:

```text
month-command element
participant element
```

The source relation is not inherently a day-master-only identity.

Therefore:

```text
seasonalElementPhase = REUSE_AS_GENERIC_STRUCTURAL_SUBSTRATE
```

It remains evidence, not a final force verdict.

### 2. Positional support locators are reusable as named channels

I20/I20C preserve separate positional channels for:

```text
visible same-element stems
visible resource stems
same-element branches
resource branches
```

These locators can be adapted for each clash participant under a challenge-specific namespace.

They must not be counted, summed, or converted to a support-effect verdict.

### 3. Seasonal advantage is a candidate, not a clash winner

I20B compares the source-backed seasonal phase ordering and emits only a seasonal advantage candidate.

I32 authorizes the same limited comparison for challenge-target clash dependency evidence.

```text
seasonal advantage != complete relative force
seasonal advantage != clash winner
```

### 4. Rescue topology is reusable as candidate routing

I20D identifies six- or three-combination relations sharing a clash participant.

That topology is generic structural evidence and can be adapted.

However the source requires the rescue influence to have effective force before it can settle or redirect a clash.

Therefore:

```text
rescue candidate exists != rescue effective
rescue candidate exists != clash settled
```

### 5. I20-series report contracts are not directly reusable

I20B/I20C/I20D are chained through report IDs and root-review identities belonging to the existing day-master/root pipeline.

Challenge-target evidence has a different subject identity anchored by:

```text
I29 challenge target root candidate
I31 relation participation
```

Therefore the lower-level calculations may be adapted, but the existing report contracts and subject bindings must not be reused directly.

### 6. Hidden-only and earth boundaries remain fail-closed

A hidden-only target has no I29 root subject, so clash evidence cannot manufacture a root-effect subject.

An earth target may receive structural seasonal/support/rescue observations, but earth root-effect closure remains blocked by the unresolved earth convention.

## Methodology decision

```text
CHALLENGE_SPECIFIC_CLASH_DEPENDENCY_ADAPTER_REQUIRED
```

Authorized candidate substrate:

```text
seasonalElementPhase
positional same-element/resource support locators
seasonal phase advantage candidate
clash rescue relation topology
```

Not authorized:

```text
I20/I20B/I20C/I20D report contract reuse
support effect verdict
relative branch force verdict
clash winner
rescue strength/effect
clash settlement
root-effect verdict
effective mechanism force
usefulness/harmfulness
numeric scoring
strong/weak classification
```

## Required implementation guards

```text
ALIGN_WITH_I31_ROOT_CANDIDATE_CLASH_AND_SAME_PILLARS
SEASONAL_PHASE_AS_EVIDENCE_ONLY
POSITIONAL_SUPPORT_CHANNELS_NOT_ADDITIVE
SEASONAL_ADVANTAGE_NOT_CLASH_WINNER
RESCUE_TOPOLOGY_NOT_SETTLEMENT
NO_I20_SERIES_REPORT_ID_REUSE
HIDDEN_ONLY_ROOT_EFFECT_NOT_AUTHORIZED
EARTH_ROOT_EFFECT_REMAINS_BLOCKED
POST_RELATION_ROOT_STATE_NOT_INFERRED
EFFECTIVE_MECHANISM_FORCE_NOT_INFERRED
USEFULNESS_HARMFULNESS_NOT_INFERRED
NUMERIC_SCORING_NOT_AUTHORIZED
STRENGTH_CLASSIFICATION_NOT_AUTHORIZED
```

## Implementation

- `src/research/i32-challenge-target-clash-dependency-methodology-review.ts`
- `src/research/index.ts`
- `test/i32-challenge-target-clash-dependency-methodology-review.test.ts`

## Verification

```text
HEAD:          207097b1f60c7725a058def115a38b8b1242ad76
CI run number: 488
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        70 files / 378 tests PASS
build:         PASS
```

The I32 regression suite contains 5 passing tests covering:

- rejection of direct I20-series report contract reuse,
- authorization of generic seasonal/support substrate,
- seasonal advantage without clash-winner authorization,
- rescue topology without clash settlement,
- target identity, hidden-only, and earth boundaries,
- downstream verdict/classification/scoring guards and deterministic identity.

## Result

```text
GENERIC_SEASONAL_PHASE_SUBSTRATE            = REUSABLE
POSITIONAL_SUPPORT_LOCATORS                 = ADAPTABLE
SEASONAL_ADVANTAGE_CANDIDATE                = ADAPTABLE
RESCUE_RELATION_TOPOLOGY                    = ADAPTABLE
I20_SERIES_REPORT_CONTRACTS                 = NOT DIRECTLY REUSABLE
RELATIVE_BRANCH_FORCE                       = NOT DETERMINED
CLASH_WINNER                                = NOT DETERMINED
TARGET_POST_RELATION_ROOT_STATE             = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE                   = NOT DETERMINED
RELATION_SPECIFIC_USEFULNESS_HARMFULNESS    = NOT DETERMINED
STRENGTH_CLASSIFICATION                     = NOT AUTHORIZED
NUMERIC_SCORING                             = NOT AUTHORIZED
```

## Next gate

```text
I33 — Challenge Target Clash Dependency Evidence Adapter
```

I33 may materialize seasonal phase, positional support channels, seasonal-advantage candidates, and rescue topology only for I31 root-candidate clashes aligned to the same pillar material.

It must not resolve relative branch force, clash winner, rescue effect, target post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.
