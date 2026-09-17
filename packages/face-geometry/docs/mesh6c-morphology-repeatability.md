# MESH6C — Morphology Repeatability and Perturbation Sensitivity

MESH6C addresses a specific weakness left open by MESH6B: a raw morphology observable can be mathematically well-defined and still be too sensitive to landmark jitter or repeated capture variation to support a later product decision.

This layer therefore measures **stability evidence**, not quality acceptance.

## Repeatability summary

`summarizeMesh6CZygomaticRepeatability()` accepts repeated MESH6B research kernels and records, for every raw observable:

```text
median
MAD (median absolute deviation)
p10
p90
robust p10-p90 span
min
max
```

Aggregation is sample-order invariant. No statistic is converted into a pass/fail, confidence score, or production threshold.

Covered observables remain the MESH6B channels:

```text
zygomaticSpanRatio
zygomaticTemporalFlareRatio
zygomaticCheekLateralReliefRatio
bilateralZygomaticAsymmetryRatio
zygomaticRelativeDepthRatio
```

The depth observable remains a separate 2.5D research diagnostic and does not become an anatomical measurement through aggregation.

## Deterministic perturbation study

`runMesh6CZygomaticPerturbationStudy()` applies deterministic, seeded synthetic XYZ perturbations to canonical-aligned 468-point geometry and recomputes the MESH6B kernel.

Two research scopes are supported:

```text
all_vertices_xyz
zygomatic_vertices_xyz
```

Perturbation amplitude is supplied as a ratio of the baseline 468-point RMS radius. The study records the corresponding synthetic amplitude in canonical centimeter coordinates only for traceability.

The supplied amplitude ratios are **experiment inputs**, not acceptable camera error, landmark error, anatomical tolerance, or product thresholds.

For each amplitude level the report records:

- repeatability statistics across deterministic replicates;
- median delta from the unperturbed baseline;
- maximum absolute delta from the unperturbed baseline.

No monotonicity requirement is imposed on random-noise drift. Larger authoring perturbations are evidence points, not a hidden admission rule.

## Verification properties

The MESH6C verifier requires:

- zero synthetic perturbation produces zero drift;
- identical seed/config/input produces byte-stable study output;
- repeatability aggregation is independent of sample order;
- translation of the entire canonical geometry does not change ratio-statistic outputs;
- uniform scaling of the entire canonical geometry, with perturbation amplitude scaled by the same RMS ratio, does not change ratio-statistic outputs;
- zygomatic-only perturbation resolves to a non-empty strict subset of the 468 vertices;
- exact MESH5.1 weighted region generation remains part of the dedicated CI path.

These checks validate implementation properties only. They do not establish real-world repeatability, camera sufficiency, or population validity.

## Fail-closed boundary

MESH6C explicitly keeps the following false:

```text
perturbationAmplitudesAreProductionThresholds = false
acceptableJitterThresholdDefined = false
captureQualityPassFailIssued = false
confidenceScoreIssued = false
populationNormDefined = false
productionMorphologyAuthorized = false
anatomicalMeasurementClaimed = false
beautyInterpretationIssued = false
traditionalPhysiognomyInterpretationIssued = false
claimsIssued = 0
```

A later calibration gate must use repeated real captures before any tolerated-drift threshold or product confidence policy can be proposed.
