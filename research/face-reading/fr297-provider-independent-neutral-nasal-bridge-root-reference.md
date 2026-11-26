# FR297 — Provider-independent neutral nasal bridge-root reference

Watchtower-Track: face-engine

## Trigger

FR296 proves that `nose.tip_bridge_relative_projection` cannot advance until the benchmark has a provider-independent 3D bridge-side reference definition.

FR297 defines that missing neutral reference component. It does not define the final tip-to-bridge projection axis.

## Evidence review

Three external 3D facial-anthropometry sources were reviewed before freezing the definition.

### PMCID:PMC4832301

The interdisciplinary 3D landmark review gives a curve-based sellion definition: the point of maximal curvature of the mid-line nasal profile curve at its nasal-root end. The paper also reports an empirical comparison between curvature-based and traditional manual sellion localization.

This is the primary basis for the FR297 annotation definition because it is surface-geometry based and does not depend on a candidate RGB provider index.

### PMCID:PMC8036493

This 3D scanning study defines sellion as the most posterior point of the frontonasal soft-tissue contour in the midline at the base of the nasal root.

This independently supports the same visible soft-tissue bridge-root region.

### PMCID:PMC3819161

This 3D face-landmark work treats sellion as localizable on surface mesh and explicitly distinguishes it from nasion in that method.

That distinction is important: FR297 must not silently claim `sellion == nasion`.

## Frozen neutral definition

FR297 uses the provider-independent annotation definition:

`point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end`

The annotation must be expressed in `canonical_aligned_right_handed_metric_3d` on an independently verified reference surface.

During annotation:

- RGB candidate/provider output is hidden;
- provider indices are hidden;
- traditional labels are hidden;
- the annotation is frozen before RGB candidate scoring.

## Why this is not a product feature

The derived artifact is only a benchmark-reference component.

It does not mean:

- an automated bridge-root extractor exists;
- a production RGB candidate exists;
- sellion has been promoted as a product-facing anatomical label;
- sellion is equivalent to nasion;
- any traditional physiognomy anchor is established;
- the tip-to-bridge projection axis is defined;
- a threshold, winner, classifier, or calibration exists.

## Relationship to FR266

FR266 supplies the provider-independent 3D nasal-apex definition on the tip side.

FR297 supplies a provider-independent neutral 3D bridge-root definition on the bridge side.

These two definitions are now structurally available for future independent-reference acquisition, but FR297 does not fabricate real subject annotations for either side.

## Product state

- FR282 canonical columns = 29
- FR293 materialized = 18
- remaining gaps = 11
- `nose.tip_bridge_relative_projection` remains unavailable

## Next executable frontier

With both neutral point definitions governed, the next step is to freeze the **relative-projection reference-axis construction** that relates a frozen FR266 nasal-apex annotation and a frozen FR297 bridge-root annotation.

That future axis must preserve provider independence and must not turn candidate-provider Z into ground truth.

Watchtower-Track: face-engine
