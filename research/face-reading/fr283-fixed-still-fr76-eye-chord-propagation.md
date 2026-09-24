# FR283 — Fixed-still FR76 eye-chord propagation trace

Status: implementation complete / empirical rerun pending

Watchtower-Track: face-research

## Question

FR279 localized the low-angle screen-space eye-tilt collapse primarily to signed vertical-rise loss.

FR281 showed that FR76 attenuates that deformation substantially but leaves a same-direction residual in canonical metric geometry.

FR283 asks one narrower question:

Where inside the exact FR76 screen-to-metric reconstruction does that attenuation occur?

This is instrumentation only. It does not alter FR76 and does not issue a correction.

## Fixed input

Reuse the exact six local-only JPEGs:

1. front_1
2. front_2
3. high_1
4. high_2
5. low_1
6. low_2

The images remain local-only and are never committed.

## Traced stages

FR283 reproduces the existing FR76 algorithm with the same constants and exported weighted orthogonal solver, then records scalar eye-chord summaries at:

1. screen_pixels_y_up
2. projected_near_plane
3. first_intermediate
4. second_intermediate
5. runtime_metric_pre_pose
6. canonical_metric_post_pose

For each stage it persists only:

- bilateral mean horizontal span;
- bilateral mean signed vertical rise;
- bilateral mean eye-chord angle.

It also persists:

- firstIterationScale;
- secondIterationScale;
- totalScale.

## Exactness requirements

The trace is rejected unless all of the following hold:

- traced final metric landmarks match the existing FR76 output within floating-point tolerance;
- traced packed pose matrix matches the existing FR76 output;
- firstIterationScale / secondIterationScale / totalScale match FR76;
- same-frame final metric landmarks match the FR257 ephemeral metric geometry;
- same-frame pose matches the FR257 ephemeral pose;
- screen-stage angle matches FR279;
- canonical-stage angle matches FR281 / FR208.

The trace therefore observes the existing algorithm rather than defining a replacement implementation.

## Coordinate semantics

The screen stage converts normalized image coordinates into pixel coordinates with Y pointing upward.

The projected and intermediate stages use the exact FR76 virtual-camera projection geometry:

- vertical FOV = 63 degrees;
- near plane = 1 centimeter.

Intermediate coordinate values are not promoted into new product metrics.

Only the final canonical stage retains the existing FR76 centimeter semantics.

## Privacy boundary

Persisted:

- stage-level scalar chord summaries;
- scalar FR76 iteration scales;
- existing scalar pose/context summaries in the fixed-still report.

Not persisted:

- raw image bytes;
- image digest;
- raw provider response;
- screen landmarks;
- intermediate landmarks;
- metric landmark arrays;
- pose transform matrix;
- providerRunRef;
- embedding;
- identity template.

All raw/intermediate geometry exists only ephemerally during one analysis call.

## Authority boundary

FR283 does not issue:

- pose or distance acceptance thresholds;
- calibration;
- correction formula;
- causal classification;
- population generalization;
- frozen metric replacement;
- traditional interpretation binding;
- Production activation;
- Commerce activation.

## Empirical protocol

1. Start the existing MESH6J runtime.
2. Open /fr283/.
3. Select the exact same six JPEGs used by FR274 / FR279 / FR281.
4. Run all six.
5. Export the scalar-only FR283 JSON.
6. Restart with a fresh browser/runtime and repeat.
7. Compare all persisted scalar fields excluding generatedAt.
8. Only after scalar identity is confirmed, inspect front-relative signed-vertical-rise and angle changes at every stage.

## Adjudication target

The expected output is a descriptive propagation map:

screen -> projected -> first intermediate -> second intermediate -> runtime metric -> canonical metric

The goal is to determine at which transition the large low-angle screen-space signed-vertical-rise reduction is attenuated, and whether the final inverse-pose normalization changes it further.

No correction design follows automatically from the result.

## Stop condition

FR283 stops after:

- two scalar-identical fresh-runtime runs;
- exactness checks remain satisfied;
- the low-angle front-relative change is localized descriptively across the six stages.

The result should then be handed to the RGB feature-authority / product-column work so only affected observables consume the finding.

FR283 must not continue into a generic camera-correction subsystem.
