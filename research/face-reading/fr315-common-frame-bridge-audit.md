# FR315 — Common-frame bridge audit

Status: FR303 bridge implemented; hairline image-to-metric bridge intentionally not issued

Watchtower-Track: face-observation-engine

## Purpose

FR315 audits the seven governed neutral vertical-reference capabilities against the successor common frame selected by FR264:

- frame: `canonical_aligned_right_handed_metric_xy`
- unit: `centimeter`

The phase issues only the bridge already justified by existing coordinate provenance.

It does not invent an image-normalized-to-metric scale for the hairline.

## Seven-reference audit

### Already in canonical metric XY

The following references are already expressed in the selected common frame:

- lower-face inferior reference;
- brow vertical reference;
- interbrow vertical reference;
- nasal apex vertical reference;
- nasal bridge-root vertical reference.

### FR303 central groove

FR303 is labeled `pose_normalized_face_2d`, unit centimeter.

That label originates from the FR79 canonical metric projection path.

FR79 establishes:

- source canonical aligned metric 3D;
- canonical inverse pose alignment;
- `x2d=x3d; y2d=y3d`;
- centimeter retained;
- canonical x-right / y-up axes retained;
- no recentering;
- no rescaling;
- no perspective reprojection;
- no screen-coordinate reconstruction.

FR265 independently reviewed the same coordinate projection for generic neutral metric geometry and targets canonical metric XY.

FR291 additionally requires its visible central-groove geometry and FR79 mouth reference to share the same capture, canonical asset digest, coordinate frame and unit.

FR315 therefore issues a narrow scalar bridge for the FR303 vertical reference:

`y_metric_xy = y_pose_normalized`

This bridge is specific to the governed FR303 provenance. It is not authority to relabel arbitrary 2D coordinates.

## Hairline remains blocked

FR305 is fundamentally different:

- frame: `canonical_image_normalized_2d`;
- unit: `normalized_ratio`.

No reviewed mapping currently converts that subject/capture-specific normalized image coordinate into canonical metric XY centimeters.

A valid future bridge requires exact same-capture registration plus metric scale authority.

FR315 explicitly rejects the following substitutes:

- multiplying normalized Y by an assumed face height;
- estimating scale from the face box;
- estimating scale from a face oval;
- using average human face dimensions;
- relabeling provider normalized landmarks as metric;
- reusing unrelated AST RGB↔3D registration evidence.

## Readiness after FR315

At the capability level:

- already metric XY: 5 / 7;
- explicitly bridgeable through FR315: 1 / 7;
- still blocked: hairline 1 / 7;
- metric-frame-ready capabilities: 6 / 7.

The common frame is therefore not complete.

Mixed-frame subtraction remains prohibited.

Three-Divisions span execution remains prohibited.

## Current repository state

Real hairline model admission and real FR314 materialization have not occurred.

Therefore the actual neutral-reference handoff state remains:

- actual neutral-reference capability: 6 / 7;
- remaining neutral-reference capability: 1;
- hairline image-to-metric bridge: not issued;
- common frame complete: false;
- traditional bindings: 0;
- Product: 18 / 29;
- Production: false;
- Commerce: false.

## Next

FR316 should define the evidence contract for an exact same-capture mapping between:

`canonical_image_normalized_2d`

and

`canonical_aligned_right_handed_metric_xy`

for the admitted visible hairline observation.

That contract must include scale and registration authority and must fail closed when either is missing.
