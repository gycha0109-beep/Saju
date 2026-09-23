# FR264 — Three-Divisions Successor Coordinate-Frame Adjudication

Watchtower-Track: face-research

## 1. Purpose

FR262 reduced the 1925 麻衣 contiguous Three-Divisions successor to four traditional anchor contexts:

- hairline
- brow
- zhuntou
- dige

It intentionally left the successor coordinate frame unresolved.

FR264 decides that question at **research architecture** level only.

It does not issue an executable anchor derivation.

## 2. Candidate A — historical canonical image normalized 2D

FR15, FR34 and FR35 use:

`canonical_image_normalized_2d`

This frame remains valid historical provenance.

However, the newer governed geometry and neutral-observable stack has moved toward canonical metric geometry.

Keeping normalized-image 2D as the successor would require the new metric-frame observations to be duplicated or converted back into a separate image-normalized path.

No governed cross-frame conversion authority exists.

FR264 therefore keeps this frame only as:

`historical_compatibility_not_selected`

Historical FR15/FR34/FR35 artifacts remain unchanged.

## 3. Candidate B — canonical aligned metric XY

Recent neutral geometry work already converges on the canonical metric coordinate family.

Relevant evidence:

- FR77 issues governed research metric geometry in `canonical_aligned_right_handed_metric_3d`.
- FR79 reviews an orthographic XY rule inside the lips-specific geometry path.
- FR208 defines cross-face neutral observable inputs in `canonical_aligned_right_handed_metric_xy`.
- FR216 issues lower-face visible contour geometry in canonical metric XY.
- FR260 issues the Dige-adjacent inferior vertical neutral reference in canonical metric XY.

FR264 therefore selects:

`canonical_aligned_right_handed_metric_xy`

with centimeter unit as the **research successor target frame**.

This is not an executable Three-Divisions metric.

## 4. Why FR79 cannot simply be reused globally

FR79's reviewed rule is:

`x2d=x3d; y2d=y3d`

after canonical inverse-pose alignment.

But FR79 issues that rule inside the governed **lips-specific** geometry contract.

FR77 itself explicitly keeps:

`reviewed2DProjectionRuleIssued = false`

for the full metric mesh.

Therefore FR264 does not silently generalize FR79 to every face landmark.

A new authority is required:

`full_face_neutral_canonical_metric_xy_projection_rule`

Its scope must remain coordinate projection only:

- no anatomical identity;
- no traditional anchor identity;
- no provider-index semantics;
- no morphology classification;
- no threshold/calibration;
- no traditional claim.

## 5. Candidate C — mixed coordinate frames

Rejected.

A Three-Divisions span is a vertical distance between two endpoints.

The endpoints must be expressed in one common frame and unit.

For example:

`normalized-image Y - metric-centimeter Y`

has no valid geometric meaning.

No mixed-frame span calculation is authorized.

## 6. Four-anchor readiness after frame selection

### Hairline

Still blocked.

The governed face mesh does not currently provide a hairline surface.

No authority registers an external hairline observation into the selected canonical metric XY frame.

State:

`blocked_no_metric_frame_hairline_surface_or_registration_authority`

### Brow

Still blocked.

FR209 explicitly keeps the eyebrow neutral adapter unavailable because a governed neutral brow curve is not authorized.

State:

`blocked_neutral_brow_curve_not_authorized`

### Zhuntou

Still blocked.

Existing nose geometry describes shape properties; it does not issue an exact neutral nose-tip vertical reference for this successor.

State:

`blocked_exact_neutral_nose_tip_vertical_reference_not_authorized`

### Dige

FR260 provides a neutral metric-XY candidate adjacent to the required lower reference.

It remains:

- not anatomical chin;
- not 地閣;
- not a Three-Divisions boundary.

State:

`candidate_metric_xy_reference_exists_traditional_equivalence_blocked`

## 7. Decision

FR264 selects:

```text
successor research target frame
= canonical_aligned_right_handed_metric_xy
unit = centimeter
```

but simultaneously keeps:

```text
executable projection       = NO
anchor derivations          = NO
hairline registration       = NO
brow binding                = NO
zhuntou binding             = NO
dige binding                = NO
traditional equivalence     = NO
threshold/calibration       = NO
F1/F6 claims                = NO
Production/Commerce         = NO
```

The coordinate-frame decision is therefore separated from execution authority.

## 8. Effect on historical contracts

FR264 does not mutate:

- FR15;
- FR34;
- FR35;
- FR36.

Those remain historical authority artifacts in their existing normalized-image frame.

Future Mayi-contiguous Three-Divisions successors must not silently combine those normalized coordinates with metric-XY coordinates.

## 9. Next frontier

`issue_full_face_canonical_metric_xy_projection_rule_without_anchor_anatomy_or_traditional_semantics`

The next step is to review and issue a generic neutral projection from the already governed canonical metric 3D geometry to metric XY.

Only after that should individual hairline / brow / zhuntou / dige vertical-reference derivations advance.
