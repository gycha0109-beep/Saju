# FR178 — Eye-Pair Geometric Y-Span Runtime

## Status

Research-only neutral-geometry runtime implementing the two FR177-authorized geometric measurements over issued FR77 canonical-aligned metric 3D geometry.

FR178 issues runtime metric definitions and values for geometric Y-span and Y/X span ratio only. It does **not** issue physiological eyelid aperture, eye-height semantics, upper/lower lid roles, anatomical laterality, individual-eye asymmetry, physical anthropometry, morphology, thresholds, calibration, criterion states, structured semantic claims, traditional unit mapping, or production rules.

Production remains HOLD.

## Authority chain

FR178 requires all of the following to remain true:

1. the input is an actually issued FR77 `canonical_aligned_right_handed_metric_3d` artifact,
2. the provider package remains `@mediapipe/tasks-vision@0.10.35`,
3. the governed geometry surface remains 468 landmarks from the 478-landmark provider result with iris landmarks excluded,
4. the Eye topology witness remains exactly two release-pinned 16-point closed cycles from FR24,
5. FR177 remains issued with verdict `NEUTRAL_GEOMETRY_METHODOLOGY_FEASIBLE_RUNTIME_NOT_ISSUED`,
6. FR177 continues to authorize only the methodology candidate and to reject semantic binding, thresholds, calibration, classifiers, and production rules.

FR178 does not reinterpret provider topology symbols as anatomical side labels.

## Runtime metrics

### 1. Mean cycle geometric Y-span / full-mesh X-span

`neutral.eye_pair.metric_3d.mean_cycle_y_span_to_full_mesh_x_span_ratio@0.1.0`

For each exact 16-point Eye cycle:

```text
cycle_y_span = max(y_i) - min(y_i)
```

Then:

```text
mean_cycle_y_span_to_full_mesh_x_span_ratio =
  mean(cycle_y_span_A, cycle_y_span_B) / full_mesh_x_span
```

The full-mesh X span is measured over all 468 FR77 metric landmarks.

This is a canonical-geometry relative span. It is not physiological eyelid aperture and is not a physical soft-tissue anthropometric measurement.

### 2. Mean cycle geometric Y/X span ratio

`neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0`

For each exact 16-point Eye cycle:

```text
cycle_x_span = max(x_i) - min(x_i)
cycle_y_to_x_span_ratio = cycle_y_span / cycle_x_span
```

Then:

```text
mean_cycle_y_to_x_span_ratio =
  mean(cycle_y_to_x_span_ratio_A, cycle_y_to_x_span_ratio_B)
```

Only the role-invariant pair aggregate is exposed. FR178 does not expose per-eye values or an asymmetry output.

## Exact fail-closed denominator policy

FR178 preserves the FR177 denominator contract exactly:

- every consumed X/Y operand must be finite,
- `full_mesh_x_span` must be finite and strictly positive,
- each per-cycle `cycle_x_span` must be finite and strictly positive,
- no epsilon is invented,
- no clamp is applied to a denominator,
- no imputation is performed,
- no fallback denominator is substituted.

A zero geometric Y-span is not itself rejected; the Y-span is a neutral coordinate extent and the reviewed fail-closed rule concerns non-finite operands and invalid denominators.

## Semantic boundary

FR178 does **not** authorize any of the following shortcuts:

```text
geometric Y-span -> physiological eyelid aperture
geometric Y-span -> eye height semantic label
Y/X span ratio -> 細
X-span -> 長
Y/X span ratio + X-span -> 細長
metric extent -> 寸
new metric value -> 細長極寸
new metric value -> traditional criterion state
```

The repeated source-backed need in FR175/FR176 motivated the neutral geometry review, but traditional source semantics did not define the metric formulas and are not bound by FR178.

## Role-invariance and topology boundary

- Both Eye cycles use the exact pinned FR24 topology vertex sets.
- Provider topology symbols select vertex sets only.
- No anatomical left/right role is assigned.
- No upper/lower lid point role is assigned.
- The two cycles are aggregated symmetrically.
- No individual-eye value is emitted.

## Projection boundary

All calculations remain in FR77 `canonical_aligned_right_handed_metric_3d` coordinates.

FR178 does not drop Z to create a new reviewed-2D claim, and it does not introduce image-normalized 2D geometry as a substitute. The Y-span operation uses the Y coordinate of the governed canonical metric frame without claiming an anatomical vertical aperture.

## Verification contract

The exact-release verifier must:

1. fetch the same pinned MediaPipe release fixtures used by FR158,
2. verify their Git blob identities,
3. construct the governed FR66 -> FR76 -> FR77 path,
4. issue FR178 from the resulting FR77 geometry,
5. independently recompute both FR178 formulas directly from the FR77 metric landmarks and FR24 Eye topology vertex sets,
6. compare runtime and independent values deterministically,
7. verify both metric references and pair-only aggregation,
8. verify that no laterality, asymmetry, aperture semantic, threshold, calibration, classifier, identity, biometric, morphology, traditional-unit, traditional-semantic, or production authority is promoted.

Deterministic fixture agreement is implementation verification only. It is not empirical validation of a traditional morphology criterion.

## Privacy

FR178 persists none of the following:

- participant/source image,
- raw provider response,
- landmark set,
- derived full-face metric geometry,
- FR178 metric values,
- face embedding,
- identity template.

FR178 performs no identity matching or same-person inference.

## Authority state

```yaml
authorityState: role_invariant_eye_pair_geometric_y_span_metrics_research_only
researchNeutralMetricDefinitionsIssued: 2
researchNeutralMetricValuesIssued: 2
productionNeutralObservationIssued: false
upperLowerLidRolesIssued: false
anatomicalLateralityResolved: false
individualEyeAsymmetryIssued: false
physiologicalApertureIssued: false
eyeHeightSemanticLabelIssued: false
classificationIssued: false
calibrationIssued: false
thresholdsIssued: false
morphologyProduced: false
traditionalUnitMappingIssued: false
traditionalBinding: unresolved
traditionalSemanticAuthority: false
```

## Next frontier

`reassess_direct_source_eye_pair_morphology_representability_with_new_neutral_y_span_metrics_without_threshold_or_traditional_unit_binding`

That reassessment must be a separate governed phase. FR178 itself does not bind `細 / 長 / 細長極寸` and does not map `寸`.