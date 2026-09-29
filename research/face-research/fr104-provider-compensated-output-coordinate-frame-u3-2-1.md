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

## Empirical result

First governed derived execution:

```text
predecessor U3.2 result SHA-256
9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c

U3.2.1 derived result SHA-256
732268b973592f70f606000ffcbd0219e67afcc20b920e57906d14978f5cbb05
```

The exact U3.2 result was replayed live before analysis.

Observed aggregate unordered-pair cost over the six rotated cases:

```text
canonical_output_frame
= 1.1000092040019644

original_input_image_frame
= 0.017798602734814976

opposite_rotated_output_frame
= 0.2062558418317363
```

Quarter-turn result:

```text
R90  H2 < H1 and H2 < H3
R270 H2 < H1 and H2 < H3
M90  H2 < H1 and H2 < H3
M270 H2 < H1 and H2 < H3
```

Half-turn result:

```text
R180 H2 == H3 < H1
M180 H2 == H3 < H1
```

Therefore:

```text
state = original_input_frame_supported

selectedHypothesis =
original_input_image_frame

quarterTurnOriginalInputFrameStrictDominance = true
halfTurnIdentityRejected = true
```

After selecting that frame, provider label continuity becomes:

```text
same-label:
R0 R90 R180 R270
M0 M90 M180 M270

cross-label:
none
```

Frame selection itself did not use provider LEFT/RIGHT labels; the primary metric was unordered geometry.

## Admission

Admitted bounded authority:

```text
providerCompensatedOutputFrameAudited = true

providerCompensatedOutputFrame =
original_input_image_frame

composedProviderOrientationNormalizationAvailableForExactFixture =
true
```

This means the exact fixture/runtime supports the composed operation:

```text
provider rotationDegrees compensation
+
explicit inverse rotation of returned provider coordinates
```

as a canonical provider-coordinate normalization procedure.

It does **not** establish anatomical LEFT/RIGHT semantics.

Still false:

```text
providerLabelMappedToAnatomicalSide = false
globalProviderAnatomicalSemanticsEstablished = false
anatomicalReferenceAdmitted = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

## Next gate

This audit is retrospective, so U4 remains HOLD.

Next:

```text
FR104 U3.3 — Prospective Composed Orientation Normalization Validation
```

The composed normalization rule must be frozen first and then applied prospectively to an independent fixture without retuning before any anatomical mapping review is considered.
