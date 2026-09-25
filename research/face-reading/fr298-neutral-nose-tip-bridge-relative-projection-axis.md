# FR298 — Neutral nose tip-bridge relative projection axis

Watchtower-Track: face-engine

## 1. Trigger

FR295 requires every RGB relative-3D benchmark target to carry a separately frozen reference-axis definition.

For `nose.tip_bridge_relative_projection`:

- FR266 already governs the provider-independent nasal-apex point definition;
- FR297 now governs the provider-independent soft-tissue nasal bridge-root point definition;
- FR296 still records `tip_bridge_relative_projection_axis_definition_missing` as a blocker.

FR298 resolves only that axis/normalization blocker. It does not fabricate a subject reference capture and it does not create an RGB candidate.

## 2. Existing repository authority

FR265 governs the canonical aligned metric 3D frame as the source of its full-face XY projection rule. Its projection explicitly drops Z as depth only after canonical inverse-pose alignment and retains X/Y for the frontal plane.

FR298 does not reinterpret FR265 as a morphology metric. It uses the existing coordinate boundary as a predecessor and separately governs one descriptive benchmark scalar.

## 3. External evidence

### PMCID: PMC3819161

A pose-normalized 3D facial-mesh landmark study states that face width is represented on X, height on Y, and depth on Z. In its nasal landmark procedure, pronasale is located at maximal Z while sellion is located as a local Z minimum on the same midline.

This supports treating the Z component as depth after pose normalization for a provider-independent nose reference.

### PMID: 17561054

A 3D laser-scanner facial soft-tissue study establishes a coordinate system with X left/right, Y superior/inferior, and Z anterior/posterior and uses linear distance ratios in 3D facial analysis.

This supports a depth-axis interpretation and the use of scale-free descriptive ratios.

Neither source establishes a traditional physiognomy binding.

## 4. Why FR298 does not assign a positive anatomical Z sign

The repository currently governs:

- canonical metric X as right in the retained XY plane;
- canonical metric Y as up;
- Z as the depth coordinate that is discarded by the FR265 frontal projection.

It does not separately issue an anatomical statement that canonical `+Z` must mean anterior for every independent reference acquisition.

FR298 therefore does not need that sign.

It uses the absolute tip/root depth separation:

`abs(tip.z - bridgeRoot.z)`

This makes the benchmark invariant to an otherwise unauthorized positive-depth sign convention.

## 5. Frozen reference scalar

The reference-axis definition is:

`neutral.nose.tip_bridge.relative_depth_component_ratio@0.1.0`

For a frozen provider-independent nasal-apex point `tip` and nasal bridge-root point `bridgeRoot` in the same canonical aligned metric 3D frame:

```text
dx = tip.x - bridgeRoot.x
dy = tip.y - bridgeRoot.y
dz = tip.z - bridgeRoot.z

tipBridgeDistance3D = sqrt(dx^2 + dy^2 + dz^2)

relativeDepthComponent =
  abs(dz) / tipBridgeDistance3D
```

The output:

- is a ratio;
- is constrained to `[0, 1]`;
- is scale-free;
- does not claim physical millimeter depth as a product output;
- measures the fraction of the provider-independent tip/root 3D separation expressed on the canonical depth axis.

The denominator must be non-zero.

This ratio is an engineered descriptive benchmark definition. FR298 does not claim that it is an established clinical anthropometric standard.

## 6. Independent-reference binding

A real FR298 reference scalar may be derived only when:

- both points belong to the same subject;
- the tip and bridge-root points are on independently verified reference surfaces;
- either same-capture binding or validated registration is established;
- provider output is hidden during reference construction;
- provider indices are hidden;
- traditional labels are hidden;
- the reference is frozen before RGB candidate scoring.

If same-capture binding is claimed, the two annotation capture IDs must match.

Cross-capture points are accepted only through an explicitly validated registration binding.

## 7. What this resolves

FR298 resolves the structural axis-definition part of the FR296 blocker:

`tip_bridge_relative_projection_axis_definition_missing`

It also freezes the scale-free normalization needed to compare a future ordinary-RGB candidate against an independent 3D reference.

It does **not** resolve the acquisition blocker merely by defining a formula. A real subject reference still requires independently acquired and bound 3D evidence.

## 8. Authority boundary

FR298 issues:

- one neutral reference-axis definition;
- one descriptive benchmark reference scalar construction.

FR298 does not issue:

- a canonical anatomical `+Z = anterior` sign;
- an RGB candidate;
- a benchmark winner;
- an acceptance threshold;
- calibration;
- a classifier;
- physical-millimeter product output;
- sellion/nasion product equivalence;
- traditional interpretation;
- product-column materialization;
- Production activation;
- Commerce activation.

The canonical product state remains 18/29 materialized.

## 9. Next executable frontier

The next work is no longer another abstract nose-point definition.

The benchmark now needs a **real independently acquired subject bundle** containing:

1. a frozen FR266 nasal-apex annotation;
2. a frozen FR297 bridge-root annotation;
3. same-capture or validated-registration evidence;
4. the FR298 reference scalar;
5. a separately frozen ordinary-smartphone-RGB candidate artifact.

Only after such bundles exist can descriptive candidate/reference error, bias, repeatability, and pose sensitivity be measured.

Watchtower-Track: face-engine
