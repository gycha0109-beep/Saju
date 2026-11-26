# FR133 — 方大 Image Measurement Construct Design

Status: research-only
Date: 2026-09-04
Promotion decision: deferred

## Question

FR132 established that `方大` must not be collapsed into one aspect-ratio rule. FR133 asks the narrower engineering question: which parts of `方` and `大` are actually observable from the currently governed face geometry, and which traditional meanings remain unsupported by that geometry?

The governed direct source remains `passage.shenxiang.five_officers.intake.nlc_1925`, scan-checked text:

`口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。`

FR133 does not approve the research methodology, create a reviewed successor, define a traditional metric binding, or set a threshold.

## Current geometry capability

The existing pipeline gives more information than a raw photograph but less semantic anatomy than a traditional criterion needs.

- FR78 witnesses the release-exact MediaPipe lips topology as 40 edges forming two connected, closed 20-vertex cycles.
- FR79 projects those cycles into `pose_normalized_face_2d` after canonical inverse-pose alignment.
- The two components deliberately remain semantically unordered: the provider does not publish component role labels and the project has not authorized outer/inner anatomical assignment.
- Consequently, local cycle geometry can be studied without assigning a component meaning, but the project cannot silently select one component and call it the external mouth outline.

This distinction matters directly for `方`.

## 方 — what is measurable now

### Already implemented neutral observation

FR80 computes the bounding-box width/height ratio over the union of the two pose-normalized lip cycles. It is a valid continuous neutral envelope-proportion metric.

It does **not** establish:

- rectilinearity;
- defined edges or angularity;
- which cycle is the external lip outline;
- traditional `方`.

Therefore FR80 is useful as one descriptive covariate but cannot be the `方` metric by itself.

### Derivable neutral candidates

Because the release-exact topology is made of closed cycles and FR79 preserves pose-normalized cycle boundaries, two role-invariant research features are technically derivable without deciding which component is outer or inner:

1. **Closed-cycle edge-orientation distribution** — distribution of local segment directions relative to canonical horizontal and vertical axes.
2. **Closed-cycle turning-angle distribution** — distribution/concentration of local changes in boundary direction.

Both can be calculated per cycle and aggregated symmetrically so component order is not given semantic meaning. They are candidates for measuring neutral contour organization only. They do not prove that the traditional source intended either formula.

### Still blocked

A direct feature such as **external-outline rectilinearity** is currently blocked because the project has not governed which contour is the external mouth/lip boundary. That anatomical role must be established, or the construct must remain explicitly role-invariant.

## 大 — what is measurable now

### Already implemented neutral observation

FR82 computes:

`mouth horizontal span / full 468-landmark mesh horizontal span`

with same-provider-run and same-canonical-asset checks.

This is a valid neutral relative-mesh-span metric. Its own contract explicitly says the denominator has no anatomical face-width role. Therefore it must not be renamed or interpreted as `mouth width / anatomical face width`, and it cannot by itself establish traditional `大`.

### Still blocked

Two additional constructs remain unavailable:

1. **Anatomically governed relative mouth size** — requires an explicitly governed facial-width or other anatomical reference in the same normalized frame. No such denominator is currently authorized by FR82.
2. **Containment / 收拾 geometry** — FR132 found this only as a source-context hypothesis. The project does not yet have a source-grounded geometric definition, so FR133 deliberately does not invent one.

## Measurement decision

Under the current authority and geometry:

| Component | Neutral property | Current status | Traditional construct established? |
| --- | --- | --- | --- |
| 方 | bounding-box aspect ratio | implemented | no |
| 方 | closed-cycle edge-orientation distribution | derivable research candidate | no |
| 方 | closed-cycle turning-angle distribution | derivable research candidate | no |
| 方 | external-outline rectilinearity | blocked: outer contour role missing | no |
| 大 | mouth/full-mesh horizontal-span ratio | implemented | no |
| 大 | anatomical-face-width relative mouth span | blocked: governed anatomical denominator missing | no |
| 大 | containment geometry | blocked: source-grounded geometric definition missing | no |

So the correct current answer is:

- parts of `方` and `大` are image-measurable as **neutral geometric observables**;
- the complete traditional `方大` criterion is **not yet machine-measurable under current authority**;
- image measurability does not equal construct validity.

## Construct-validity path

Before any traditional binding or threshold, the next evidence sequence is:

1. freeze candidate neutral metric definitions before evaluation;
2. either govern an external mouth-outline role or keep the new `方` metrics explicitly role-invariant;
3. govern an anatomical relative-size reference before calling any denominator facial width;
4. establish a source-grounded definition before attempting to quantify containment;
5. evaluate repeatability and capture sensitivity under pose-normalized neutral-expression capture;
6. evaluate convergent/discriminant construct validity against semantic annotation kept independent from metric computation;
7. perform source-grounded semantic review only after the currently deferred approval is reopened;
8. consider calibration only after construct validity, and thresholds only after calibration.

FR133 specifies no sample count, reviewer count, calibration value, or numeric threshold.

## Resulting boundary

FR133 adds measurement-construct design only. It issues no new neutral metric definition, no traditional metric binding, no calibration protocol, no threshold, no criterion state, no physiognomy claim, and no narrative. Historical FR78/FR79/FR80/FR82/FR132 artifacts remain unchanged.

The next useful implementation is to define and test the two explicitly neutral, role-invariant `方` shape metrics (edge-orientation and turning-angle descriptors) and to design the construct-validity dataset protocol around them without promoting them to traditional semantics.
