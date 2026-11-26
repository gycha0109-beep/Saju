# FR260 — Visible Lower-Face Inferior Vertical Reference

Watchtower-Track: face-research

## 1. Purpose

FR260 issues one new product-neutral scalar observation from an already available FR216 visible lower-face contour.

The primitive is:

`neutral.face.visible_lower_face.inferior_vertical_coordinate@0.1.0`

It is not a traditional physiognomy classification.

## 2. Input authority

FR260 consumes only an FR216 result that passes the existing FR216 structural authority assertion.

FR216 itself is restricted to:

`canonical_visible_soft_tissue_lower_face_contour_only`

Its contour is not:

- mandibular bone;
- anatomical chin;
- gonion;
- 地閣;
- a traditional Three-Divisions boundary.

FR260 preserves those restrictions.

## 3. Derivation

For an available FR216 contour:

1. preserve the FR216 canonical metric XY frame;
2. preserve centimeter units;
3. use the inherited canonical +Y-up axis witness;
4. take the minimum Y value across the available contour.

The result is therefore only the inferior-most visible soft-tissue lower-face Y coordinate in the governed canonical metric frame.

No threshold, calibration, classifier, ranking, or traditional meaning is applied.

## 4. Unavailable behavior

If FR216 is unavailable, FR260 is also unavailable.

It preserves the FR216 unavailable reason and issues no fallback point.

## 5. FR35 compatibility boundary

FR35's historical Three-Divisions neutral surface contract uses:

`canonical_image_normalized_2d`

FR260 uses:

`canonical_aligned_right_handed_metric_xy`

Therefore FR260 explicitly does **not** claim:

- coordinate-frame equivalence;
- direct replacement of `neutral.face.chin_inferior_contour`;
- satisfaction of the FR36 地閣-context vertical-reference derivation.

A separate coordinate-bridge review would be required before any such use.

## 6. Traditional boundary

The following remain false:

- anatomical chin identity;
- mandibular boundary;
- 地閣 equivalence;
- Three-Divisions boundary identity;
- F1 claim;
- F6 claim;
- Production activation;
- Commerce activation.

The fact that FR259 selected the lower-face path as the smallest observable gap does not change this authority boundary.

## 7. Research value

FR260 closes one purely geometric gap:

> a deterministic inferior vertical reference can now be obtained from the already governed visible lower-face contour without introducing new provider indices or another capture workflow.

This gives later Three-Divisions research a concrete neutral quantity to test rather than forcing it to invent a provider landmark or reuse an unrelated shape metric.

## 8. Next frontier

`evaluate_fr260_repeatability_and_coordinate_bridge_requirements_before_any_three_divisions_dependency_admission`

The next phase must decide whether this neutral scalar is stable enough and whether any governed coordinate bridge is appropriate.

Neither empirical stability nor 地閣 equivalence is established by FR260.
