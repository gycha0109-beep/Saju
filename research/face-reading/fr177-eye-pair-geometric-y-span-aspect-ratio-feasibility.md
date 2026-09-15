# FR177 — Eye-Pair geometric Y-span / aspect-ratio neutral metric feasibility

Status: **feasibility methodology authorized; runtime not issued**

Issue: #573

## 1. Question

FR175 and FR176 independently exposed the same observation gap while remaining fail-closed:

- FR175 direct passage contains `或細長極寸`.
- FR176 selected witness clause contains `細而長`.

Neither clause is currently bindable to the existing Eye-Pair neutral metric surface. FR177 asks a narrower question only: can the already-governed Eye-Pair geometry support a deterministic neutral vertical-span / aspect-ratio observation candidate without importing the traditional semantics into the geometry definition?

FR177 does **not** decide what `細`, `長`, or `細長` means numerically.

## 2. Inherited authority

FR177 inherits, and does not expand, the reviewed Eye-Pair geometry boundary:

- provider package: `@mediapipe/tasks-vision@0.10.35`
- provider landmarks: 478
- governed metric geometry: 468 landmarks
- coordinate frame: `canonical_aligned_right_handed_metric_3d`
- exactly two release-pinned Eye closed cycles
- 16 points per Eye cycle
- role-invariant aggregation over the two Eye cycles
- anatomical laterality unresolved
- no individual-eye asymmetry output authority

Existing issued metric references remain unchanged:

1. `neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`
2. `neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0`
3. `neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0`
4. `neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0`

## 3. Feasible neutral geometry candidates

The canonical aligned metric frame already gives deterministic coordinate axes. Therefore a coordinate-extrema span over the exact release-pinned cycle does not require assigning upper/lower eyelid roles, anatomical left/right, or any traditional morphology label.

### 3.1 Cycle geometric Y-span

Candidate definition:

```text
cycle_y_span = max(y_i) - min(y_i)
```

where `i` ranges over the exact release-pinned 16 points of one closed Eye cycle.

This is a **geometric bounding span only**. It is not authorized to be called:

- physiological eyelid aperture,
- eye height as an anatomical/semantic measurement,
- upper/lower-lid separation,
- thinness,
- `細`.

### 3.2 Mean cycle Y-span normalized by full-mesh X-span

Candidate definition:

```text
mean(cycle_y_span_A, cycle_y_span_B) / full_mesh_x_span
```

Fail closed unless every operand is finite and `full_mesh_x_span > 0`.

Candidate-only reference:

```text
candidate:neutral.eye_pair.metric_3d.mean_cycle_y_span_to_full_mesh_x_span_ratio@fr177-feasibility
```

### 3.3 Mean per-cycle Y:X span ratio

For each Eye cycle:

```text
cycle_x_span = max(x_i) - min(x_i)
cycle_y_to_x_span_ratio = cycle_y_span / cycle_x_span
```

Then aggregate role-invariantly:

```text
mean(cycle_y_to_x_span_ratio_A, cycle_y_to_x_span_ratio_B)
```

Fail closed unless every operand is finite and each per-cycle `cycle_x_span > 0`.

Candidate-only reference:

```text
candidate:neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@fr177-feasibility
```

No epsilon, clamp, imputation, fallback denominator, or hidden calibration is authorized by FR177.

## 4. Why the method is feasible

The two candidates require only operations already neutral at the geometry layer:

- read canonical aligned metric coordinates from the already-governed Eye cycles,
- take axis extrema,
- subtract spans,
- normalize using already-defined positive geometric spans,
- aggregate over the two cycles without resolving anatomical laterality.

No point needs to be named as an upper lid, lower lid, medial/lateral canthus, eye tail, or anatomical left/right Eye. Therefore the candidate definitions do not add a new topological or anatomical role assignment.

## 5. Explicit non-authority

FR177 does **not** issue or authorize any of the following:

- runtime metric registration or production output,
- a new observation primitive in the active runtime/schema,
- traditional semantic binding to `細`, `長`, `細長`, or `極寸`,
- threshold, score, rank, calibration, classifier, or category,
- conversion between normalized geometry and `寸`,
- individual-eye asymmetry output,
- anatomical laterality,
- eye-tail orientation,
- ocular radiance/contrast/gaze inference,
- biometric identity matching,
- new persistence of participant photos, provider responses, landmarks, full-face metric geometry, embeddings, or identity templates.

The FR175/FR176 source clauses motivate review priority only; they do not define these geometric formulas.

## 6. C2PA / provenance boundary

C2PA is not required for this neutral geometry feasibility review. FR177 performs no same-person inference, historical participant continuity inference, or biometric identity matching.

## 7. Verdict

```text
NEUTRAL_GEOMETRY_METHODOLOGY_FEASIBLE_RUNTIME_NOT_ISSUED
```

The geometry methodology is feasible under the inherited coordinate/topology authority, but candidate metric registration and runtime issuance remain closed.

## 8. Next frontier

A separate task may implement the two release-pinned candidates in the Eye-Pair runtime using exactly the FR177 denominator/finiteness rules and then verify deterministic regression behavior. That runtime task must still avoid semantic thresholds or traditional interpretation binding.
