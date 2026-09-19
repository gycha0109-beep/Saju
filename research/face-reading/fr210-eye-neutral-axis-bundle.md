# FR210 — Eye neutral axis bundle

Issue: #1035  
Stacked on: FR209 / PR #1032

## Decision

Do not start another Eye-Pair anatomy or dataset campaign.

The repository already has enough neutral geometry to expose a compact continuous Eye-Pair observation bundle. FR210 composes those existing values and adds the FR209 outer-corner orientation primitive.

## Reused axes

| Axis | Existing source | Meaning allowed in FR210 |
| --- | --- | --- |
| relative horizontal span | FR158 | mean closed eye-cycle X span / full mesh X span |
| geometric vertical-to-horizontal ratio | FR178 | mean closed eye-cycle Y span / X span |
| centroid separation | FR158 | distance between the two closed-cycle centroids / full mesh X span |
| closed-cycle turning angle | FR158 | mean absolute 3D turning angle of the two closed cycles |
| outer-corner tilt | FR209 → FR208 | bilateral mean visible-corner orientation in canonical XY |

These are geometry axes only.

## What FR210 deliberately does not do

FR210 does not convert the axes into:

- almond / round / narrow;
- upturned / downturned;
- close-set / wide-set;
- hooded;
- monolid / double eyelid;
- bright / dull eye quality;
- traditional physiognomy states.

The first three require an explicit product/source-bound decision rule before labels can be emitted. The latter three are image/texture constructs that FR207 already marks as outside the current landmark-geometry surface.

## Resolved FR207 delta

FR207 listed `eye_tail_orientation_angle` as a smallest missing Eye-Pair primitive.

FR209 supplies a neutral geometric version of that primitive as mean outer-corner tilt, so FR210 consumes it directly. FR207 itself is not rewritten retroactively; FR210 records the delta.

The remaining product-surface gap is:

- `product_individual_eye_asymmetry_surface`.

This does not block the bilateral neutral bundle.

## No new anatomical research

FR207 explicitly states:

`eye_pair.mayProceedWithoutNewAnatomicalResearch = true`

FR210 enforces that boundary. It does not require:

- external face datasets;
- 3D scans;
- provider-index anatomical validation;
- calibration to hidden anatomy;
- a new capture campaign.

## Authority

FR210 does not authorize thresholds, classifiers, traditional bindings, Production activation, or Commerce activation.
