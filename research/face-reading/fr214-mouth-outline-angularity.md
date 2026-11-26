# FR214 — Role-free visible mouth outline angularity

Issue: #1058  
Stacked on: FR213 / PR #1056

## Decision

FR207 identifies `mouth_outline_angularity_or_rectilinearity` as a small missing observable primitive.

FR214 closes the continuous geometry part of that gap without turning it into a mouth-shape classifier.

## Geometry

FR214 consumes the two issued FR79 lip contours only as an unordered pair of closed visible polylines.

For each 20-point contour:

1. At every vertex, compute the signed turning angle between the incoming and outgoing segments.
2. Take the absolute turning angle.
3. Compute RMS absolute turning angle across all 20 vertices.
4. Compute the arithmetic mean of the two contour RMS values.

The final metric is:

`neutral.mouth.outline.mean_rms_absolute_turning_angle_degrees@0.1.0`

Because the statistic uses every vertex and then symmetrically averages the two contour values, it is invariant to:

- provider contour swap;
- closed-cycle start index;
- closed-cycle orientation.

## Interpretation boundary

The value is a continuous visible-outline angularity / turning-concentration axis.

It does **not** mean:

- square mouth;
- 方大;
- 端厚;
- outer/inner lip anatomy;
- lip thickness or fullness.

Those require separate evidence and, where applicable, explicit decision rules.

## Fail closed

FR214 rejects:

- unissued/forged FR79 geometry;
- any contour other than the governed 20-point boundary;
- non-finite points;
- degenerate adjacent segments.

It does not smooth, resample, impute, calibrate, or invent thresholds.

## Authority

No classifier, threshold, calibration, traditional binding, Production activation, or Commerce activation is issued.
