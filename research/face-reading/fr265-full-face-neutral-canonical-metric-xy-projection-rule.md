# FR265 — Full-Face Neutral Canonical Metric XY Projection Rule

Watchtower-Track: face-research

## 1. Purpose

FR264 selected:

`canonical_aligned_right_handed_metric_xy`

as the research successor target frame for the 麻衣 contiguous Three-Divisions path.

FR265 issues the missing **generic neutral coordinate projection rule** that can be reused by later anchor-specific geometry.

This phase does not issue any traditional anchor or anatomy.

## 2. Source and target frames

Source:

`canonical_aligned_right_handed_metric_3d`

Target:

`canonical_aligned_right_handed_metric_xy`

Unit is preserved as centimeters.

## 3. Projection rule

The reviewed rule is:

```text
x2d = x3d
y2d = y3d
```

Z is dropped only after the source geometry has already been aligned to the canonical metric face frame through the upstream canonical inverse-pose process.

The projection performs no:

- recentering;
- rescaling;
- perspective reprojection;
- screen-coordinate reconstruction.

Canonical +X right and +Y up are retained.

## 4. Why this is independent from FR79

FR79 already reviews the same orthographic mathematics inside the lips-specific geometry contract.

That is evidence that the mathematics is appropriate after canonical pose alignment.

But FR79 authority is not silently reused as a full-face authority.

FR265 independently issues the generic coordinate-only rule.

FR79 remains only a mathematical/provenance witness.

## 5. What "full-face" means here

"Full-face" does not mean:

- all 468 provider vertices are semantically exposed;
- provider indices become anatomy;
- every face region is automatically available;
- traditional anchor labels are assigned.

It means only that the projection rule is not limited to the lips surface.

Any already governed neutral face geometry expressed in the canonical metric 3D frame may use the rule.

The rule itself does not decide what a point or surface represents.

## 6. Runtime projection contract

FR265 accepts:

- a canonical metric 3D source frame;
- centimeter units;
- explicit confirmation that canonical inverse-pose alignment is already applied;
- a non-empty source geometry reference;
- one or more finite XYZ points.

It returns:

- canonical metric XY points;
- centimeter units;
- preserved point ordering;
- no Z coordinate.

The projected result contains no:

- provider index;
- anatomy role;
- traditional anchor role;
- morphology metric;
- semantic claim.

## 7. Relationship to the four Three-Divisions anchors

FR265 does not solve the four anchor requirements.

Their state remains:

### Hairline

No governed hairline surface has been registered into the canonical metric face frame.

### Brow

A neutral brow curve remains unauthorized.

### Zhuntou

No exact neutral nose-tip vertical reference has been admitted.

### Dige

FR260 provides a metric-XY lower-face candidate, but 地閣 equivalence remains unissued.

FR265 merely ensures that future governed 3D neutral geometry can enter one common XY coordinate frame without reusing lips-specific authority.

## 8. Authority boundary

FR265 authorizes coordinate projection only.

It does not issue:

- a full provider mesh product;
- provider vertex indices;
- provider-index semantics;
- anatomical roles;
- traditional anchor identities;
- traditional-neutral equivalence;
- hairline/brow/zhuntou/dige derivations;
- metric definitions;
- thresholds;
- calibration;
- classifiers;
- F1/F6 claims;
- fortune claims;
- Production authority;
- Commerce authority.

Plane centimeter coordinates must not be advertised as direct physical anthropometric measurements.

## 9. Next frontier

`audit_four_anchor_metric_xy_derivation_readiness_and_select_first_nonsemantic_anchor_frontier`

The next phase should revisit hairline / brow / zhuntou / dige under the newly selected and projected metric-XY frame and select the smallest anchor-specific neutral frontier that can advance without semantic shortcuts.
