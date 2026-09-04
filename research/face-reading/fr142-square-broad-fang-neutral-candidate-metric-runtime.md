# FR142 — Square-broad 方 neutral candidate metric runtime

Status: neutral research geometry only. No traditional metric binding, construct-validity claim, calibration, threshold, criterion state, structured claim, bounded narrative, or human semantic collection authorization.

## 1. Predecessor

FR142 consumes FR141 after the source-lineage conflict was recorded without collapsing `四字口`, `方口`, and `方` into a single traditional definition.

The governed target remains:

```text
criterion = criterion.intake.square_broad
sourceConcept = 方大
activeConstructScope = fang_shape_candidate_features_only
source passage = passage.shenxiang.five_officers.intake.nlc_1925
```

FR141 kept three candidate families for further neutral measurement:

1. structural regularity / alignment
2. rectilinear-segment persistence
3. localized corner distinctness as supporting later-commentary hypothesis

FR142 operationalizes neutral **candidate measurements** for these families. It does not declare that any candidate is `方`.

## 2. Geometry authority

Input is exactly the issued FR79 surface:

```text
neutral.face.lips_contour_set
two 20-point closed cycles
pose_normalized_face_2d
contourConsumptionState = unordered_set_no_outer_inner_role
anatomicalRole = null
traditionalRole = null
```

The cycle traversal originates from graph topology. Provider vertex identity and component order are not semantic authority.

Therefore every FR142 metric is required to be invariant to:

- cyclic starting-point rotation
- cycle traversal reversal
- swapping the two contour components

FR142 never names a provider vertex as a mouth corner and never assigns outer/inner lip roles.

## 3. Candidate metric A — horizontal reflection nearest-set residual ratio

Metric ref:

`neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0`

Purpose: continuous neutral candidate for `structural_regularity_and_alignment`.

Per cycle:

1. compute the arithmetic centroid
2. reflect every point across the **geometric horizontal line through the cycle centroid**
3. for each reflected point, measure Euclidean distance to the nearest point in the original cycle point set
4. average those nearest-set distances
5. divide by the cycle RMS radius about its centroid
6. average the two cycle values

This is dimensionless and scale/translation invariant. The canonical FR79 coordinate frame gives a stable horizontal direction after pose compensation.

Boundary:

`geometric upper/lower correspondence != anatomical upper/lower lip assignment != traditional 方`

A smaller or larger value has no traditional meaning in FR142; no cutoff is defined.

## 4. Candidate metric B — orthogonal edge orientation concentration

Metric ref:

`neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0`

Purpose: continuous neutral surrogate for the FR141 `rectilinear_segment_persistence` family.

For each closed-cycle edge with angle `theta` and edge-length weight `w`:

```text
C = |sum(w * exp(i * 4 * theta))| / sum(w)
```

The fourth angular harmonic measures whether edge orientation mass concentrates around two orthogonal axes, while the complex magnitude makes the value invariant to global rotation. Reversing an edge adds pi to its angle and therefore leaves `exp(i*4*theta)` unchanged.

The final metric is the mean of the two cycle concentrations.

Boundary:

- this is an orientation-concentration surrogate, not a proof that persistent straight traditional mouth segments exist
- `high orthogonal concentration != 方`
- no classification cutoff is introduced

## 5. Candidate metric C — turning-angle concentration index

Metric ref:

`neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0`

Purpose: continuous neutral candidate for localized direction-change concentration, motivated only as a research hypothesis by later `方棱` commentary.

Per cycle:

1. compute absolute turning angle `a_i` at every one of the 20 vertices from adjacent edge directions
2. normalize into shares `p_i = a_i / sum(a)`
3. compute the normalized Herfindahl concentration:

```text
H = (n * sum(p_i^2) - 1) / (n - 1), n = 20
```

4. average the two cycle values

`H = 0` corresponds to uniform turning-angle shares; concentration rises as direction change becomes more localized.

Crucially, FR142 does **not** select four vertices, does not assign named mouth corners, and does not assert that localized turning equals `上下四角有方棱` or traditional `方`.

## 6. Why no four-corner detector

Although later commentary supplies `上下四角有方棱`, FR141 explicitly recorded that this is not the primary governed definition of the target NLC passage and that source taxonomies conflict.

A detector that chose exactly four provider vertices and called them traditional corners would therefore introduce two unjustified assumptions:

1. provider vertex identity -> traditional named mouth corner
2. later four-corner commentary -> governing operational definition of `方`

FR142 avoids both shortcuts. Turning-angle concentration is intentionally location-agnostic.

## 7. Existing FR134 metrics remain intact

FR142 does not mutate:

- `neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0`
- `neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0`

They remain neutral, unbound FR134 candidates. FR142 adds three separate candidate metrics after FR141 refinement.

## 8. No arbitrary threshold

All three metrics are continuous descriptive geometry values.

FR142 issues:

```text
newNeutralMetricDefinitionsIssued = 3
newNeutralMetricValuesIssued = 3
traditionalMetricBindingsIssued = 0
calibrationProtocolsIssued = 0
thresholdsIssued = 0
criterionStatesIssued = 0
structuredClaimsIssued = 0
boundedNarrativesIssued = 0
traditionalSemanticAuthority = false
```

No human reviewer count, quorum, consensus threshold, annotation threshold, or product criterion threshold is introduced.

## 9. Human review remains deferred

The project currently has no concrete independent human reviewer for the `方` construct. FR142 does not manufacture one and does not reopen semantic collection.

The metric runtime can still progress because these outputs are neutral mathematical measurements rather than traditional semantic labels.

## 10. Next frontier

`square_broad_fang_neutral_candidate_metric_repeatability_and_synthetic_geometry_discrimination_without_traditional_binding`

The next stage should first verify deterministic invariance and synthetic-geometry discrimination/redundancy of the three candidate metrics. This evidence is engineering/measurement evidence only and must not be misrepresented as traditional construct validity.
