# MESH6B — Zygomatic Raw Morphology Observables

MESH6B is the first research-only morphology vertical slice built on the shared face-geometry stack. It does not issue a cheekbone score, beauty judgment, physiognomy interpretation, anatomical measurement, or production classifier result.

## Inputs

MESH6B consumes two explicit inputs:

1. an actively issued `Mesh6AObservationFrameV1`, preserving FR77 canonical-aligned right-handed metric 3D without another pose-normalization pass;
2. a MESH5.1-compatible weighted MediaPipe 468 region adapter with overlapping memberships and no anatomical left/right semantics.

Required region ids are:

```text
zygomatic_negative_x
zygomatic_positive_x
temple_negative_x
temple_positive_x
cheek_negative_x
cheek_positive_x
```

The region adapter remains an offline authoring candidate. MESH6B does not promote its authoring thresholds into production thresholds.

## Robust geometry kernel

Each regional coordinate is summarized with a weighted median. Raw extrema and unweighted vertex means are intentionally avoided because a single noisy landmark and non-uniform mesh sampling density can distort them.

A translation-invariant RMS radius over all 468 canonical-aligned points is used as the normalization scale. Therefore the ratio observables are designed to remain invariant to global translation and uniform scale.

The initial lateral observables are:

```text
zygomaticSpanRatio
zygomaticTemporalFlareRatio
zygomaticCheekLateralReliefRatio
bilateralZygomaticAsymmetryRatio
```

They describe relative geometry only. They do not mean `strong cheekbone`, `wide face`, `good`, `bad`, or any traditional face-reading category.

## Depth channel

`zygomaticRelativeDepthRatio` compares the weighted-median canonical Z of the bilateral zygomatic patches with a cheek/temple reference. It is explicitly emitted under:

```text
authority = research_diagnostic_only
limitation = provider_estimated_single_view_relative_depth_not_anatomical
```

The value is not an anatomical millimeter measurement and does not establish literal bony projection.

## Synthetic directional verification

The dedicated verifier checks the shared math kernel independently from the issuance gate:

- global translation leaves all ratio observables unchanged;
- uniform scaling leaves all ratio observables unchanged;
- bilateral outward zygomatic X deformation increases zygomatic span and temple-relative flare;
- positive canonical-Z zygomatic deformation increases the relative-depth diagnostic;
- positive canonical-Z cheek deformation decreases the zygomatic-vs-reference depth diagnostic;
- unilateral zygomatic X deformation increases the bilateral asymmetry diagnostic.

The runtime-facing builder separately requires an issued MESH6A frame, preventing synthetic test geometry from bypassing the observation-frame authority boundary.

## Fail-closed boundary

MESH6B intentionally keeps all of the following false or absent:

```text
productRuntimeMorphologyAllowed = false
productionMetricAllowed = false
scoreOrClassificationIssued = false
anatomicalZygionClaimed = false
subjectSpecific3DReconstructionClaimed = false
beautyInterpretationIssued = false
traditionalPhysiognomyInterpretationIssued = false
compositeCheekboneScoreIssued = false
claimsIssued = 0
```

Calibration of capture quality, population norms, product thresholds, confidence, and composite morphology scores belongs to later gates.
