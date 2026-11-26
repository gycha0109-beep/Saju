# FR296 — Nose tip-bridge relative-projection reference readiness

Watchtower-Track: face-engine

## Trigger

FR295 freezes a provider-neutral benchmark protocol for the four remaining RGB relative-3D targets.

Before a candidate can be scored, FR295 requires a separately frozen neutral reference-axis definition and an independent reference bound by same-capture evidence or validated registration.

FR296 audits the strongest existing predecessor path: `nose.tip_bridge_relative_projection`.

It does not define a new depth axis merely because the feature name contains “projection”.

## Audit result

The target remains blocked. Existing authority supplies only one side of the future reference definition.

### Tip side

FR266 defines the provider-independent research annotation target `most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d`.

The annotation protocol is provider-output blind, provider-index blind, traditional-label blind, and frozen before provider scoring.

This is useful as the neutral **tip-side definition predecessor**. It is not proof that a real independent 3D annotation has already been acquired. FR296 therefore does not fabricate an annotation instance and does not claim that FR266 acquisition has been completed.

### Bridge side

The current governed bridge metric is `neutral.nose.bridge.centerline_rms_deviation@0.1.0` in `pose_normalized_face_2d`.

It measures 2D bridge-centerline shape deviation. It does not define a provider-independent 3D bridge reference point, line, or surface; a depth coordinate for the bridge; a tip-to-bridge projection direction; or an independent 3D benchmark reference.

Therefore it cannot be promoted into the missing 3D bridge reference.

## Why the axis is not defined in FR296

A relative projection needs more than a tip point. At minimum the governed reference must still establish:

1. a provider-independent 3D bridge reference definition;
2. real provider-blind independent tip/bridge reference evidence;
3. same-capture binding or validated registration;
4. a frozen neutral relative-projection axis before candidate scoring.

The repository currently does not provide those four facts as face-engine authority. Defining a depth formula now would therefore encode an unsupported anatomical/reference choice.

## Explicitly prohibited shortcuts

FR296 freezes these as invalid:

- reuse the 2D bridge-centerline deviation metric as a 3D projection reference;
- reuse candidate-provider Z as benchmark ground truth;
- infer bridge depth from 2D centerline shape;
- infer traditional nose semantics from relative projection.

The FR266/FR267 research precedent is particularly important here: candidate geometry and independent reference must remain separate.

## Relationship to FR272/FR273

FR272 documents that independent 3D acquisition and registration remain real evidence problems. FR273 provides a capability probe for one possible hardware-depth path.

Neither artifact means that a real independent tip/bridge reference has been collected, validated, registered, or admitted for this product-neutral feature.

FR296 consumes no FR273 device result and creates no new workflow.

## Product state

- canonical FR282 columns = 29
- FR293 materialized = 18
- remaining gaps = 11
- nose relative-projection materialized = no

FR296 issues no RGB relative-3D candidate, reference-axis definition, independent 3D reference instance, candidate winner, numeric threshold, calibration, classifier, physical depth product output, traditional binding, Production activation, or Commerce activation.

## Next executable frontier

The next evidence-bearing step for this target is to **govern a provider-independent neutral 3D bridge reference definition**.

Only after that definition exists should the project bind real independent tip/bridge evidence and freeze a neutral relative-projection axis for FR295 benchmark construction.

Watchtower-Track: face-engine
