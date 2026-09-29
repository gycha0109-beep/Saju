# FR104 U3.2.1 — Compensated output coordinate frame semantics audit

Issue: #1810
Watchtower-Track: face-observation-engine

## Study type

This is an explicit retrospective coordinate-frame audit over the already admitted U3.2 result.

No new anatomical ground truth is introduced.

## Predecessor authority

The analyzer may consume only a live-replayed U3.2 result whose serialized SHA-256 is exactly:

```text
9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c
```

The U3.2 headless runner verifies that digest first, then writes the exact serialized result to:

```text
.cache/face-geometry/fr104-u3-2-result.json
```

The file is ephemeral CI state and is not committed.

## Coordinate-frame hypotheses

For each compensated provider eye pair:

```text
H1 canonical_output_frame
   identity

H2 original_input_image_frame
   inverse physical input rotation

H3 opposite_rotated_output_frame
   physical input rotation
```

The same exact FR104 cardinal point transform is reused.

## Decision metric

Frame choice is label-independent.

For each hypothesis:

```text
sameLabelCost
crossLabelCost

unorderedPairCost =
min(sameLabelCost, crossLabelCost)

pairMidpointError
interEyeDistanceAbsoluteDifference
```

The primary frame metric is `unorderedPairCost`.

Provider LEFT/RIGHT relation is inspected only after the frame choice.

No numeric acceptance threshold is authorized.

## Quarter-turn decision

Cases:

```text
R90
R270
M90
M270
```

`original_input_image_frame` requires strict per-case dominance:

```text
H2 unorderedPairCost < H1 unorderedPairCost
AND
H2 unorderedPairCost < H3 unorderedPairCost
```

for every quarter-turn case.

## Half-turn control

Cases:

```text
R180
M180
```

At 180 degrees:

```text
H2 == H3
```

by construction, so sign cannot be distinguished.

These cases only test whether the identity/canonical-output hypothesis is rejected:

```text
H2 unorderedPairCost < H1 unorderedPairCost
```

## Aggregate

The six rotated cases also record aggregate unordered-pair cost for H1/H2/H3.

Aggregate is supporting evidence and does not replace the per-case rule.

## Interpretation boundary

Always:

```text
anatomicalGroundTruthUsed = false
anatomicalSideSemanticsUsed = false
providerLabelsUsedToChooseFrame = false
exactFixtureRuntimeOnly = true
retrospectiveStudyExplicit = true
```

## Authority before admission

```text
providerCompensatedOutputFrameAudited = false
providerCompensatedOutputFrame = unresolved
composedProviderOrientationNormalizationAvailableForExactFixture = false

providerLabelMappedToAnatomicalSide = false
globalProviderAnatomicalSemanticsEstablished = false
anatomicalReferenceAdmitted = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

## Admission sequence

Pass 1:

1. live-replay the entire U3.2 empirical result;
2. require exact predecessor digest;
3. deterministically derive H1/H2/H3 geometry for every case;
4. emit derived result + SHA-256.

Pass 2:

1. add fail-closed result intake;
2. add empirical evidence artifact;
3. pin the exact derived-result SHA-256;
4. rerun U3.2 + U3.2.1 and require exact replay;
5. merge only after all regression workflows pass.

## Next gate

If the bounded result supports `original_input_image_frame`, the next research gate is prospective rather than anatomical:

```text
FR104 U3.3 — Prospective Composed Orientation Normalization Validation
```

No U4 anatomical mapping review is authorized from this retrospective audit alone.
