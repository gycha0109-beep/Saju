# FR212 — Visible mouth-corner orientation

Issue: #1048  
Stacked on: FR211 / PR #1045

## Decision

Do not reopen outer/inner-lip anatomy to obtain a product-level mouth-corner orientation signal.

FR79 already supplies two pose-normalized lip contour components with an explicit rule that they must be consumed as an unordered set. FR212 therefore works on the union only.

## Derivation

1. Flatten both FR79 contour boundaries into one unordered visible contour point set.
2. Find the minimum and maximum canonical X coordinates.
3. If either horizontal extremum has more than one exact Y value, return unavailable rather than selecting a point by provider/component order.
4. Define the visible mouth center as the bounding-box center of the full union.
5. Feed the two horizontal extrema and bounding-box center into FR208 mouth-corner elevation.
6. Expose only FR208's role-invariant mean elevation axis.

The result is visible contour geometry, not an anatomical Cheilion claim.

## Why bounding-box center

The current FR79 contract intentionally does not authorize outer/inner lip roles or cross-component semantic correspondence. A union bounding box can be computed without choosing a provider component, vertex role, or anatomical lip boundary.

It is therefore a conservative neutral reference for the visible contour axis. It is not called the anatomical oral commissure center or stomion.

## Fail closed

FR212 returns unavailable for:

- collapsed horizontal extent;
- collapsed vertical extent;
- multiple exact vertical values at the left horizontal extremum;
- multiple exact vertical values at the right horizontal extremum.

No tolerance, semantic tie-break, or provider-order fallback is invented.

## Authority

FR212 does not issue:

- outer/inner lip roles;
- Cheilion anatomy;
- lip thickness/fullness;
- 方大 / 端厚 or any traditional state;
- thresholds/classifiers/calibration;
- Production activation;
- Commerce activation.
