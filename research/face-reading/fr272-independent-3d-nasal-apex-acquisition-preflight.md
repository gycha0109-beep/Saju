# FR272 — Independent 3D Nasal-Apex Acquisition Preflight

Watchtower-Track: face-research

## Purpose

FR271 is blocked at the acquisition boundary.

FR266 requires a provider-independent 3D nasal-apex annotation in `canonical_aligned_right_handed_metric_3d`, frozen before provider scoring. FR251/FR257 only provide MediaPipe-derived canonical metric geometry, so they cannot be reused as the independent annotation source.

FR272 materializes a fail-closed preflight for an external depth/3D source. It does not collect evidence and does not issue an FR266 annotation.

A repository audit also confirms that the existing MESH6H/FR251 browser lane requests `facingMode: user`. This matters because ARCore Raw Depth is documented as primarily using world-facing cameras, so ARCore Raw Depth cannot be silently treated as a same-capture drop-in for the current FR251 lane.

## Source classes

FR272 distinguishes four source classes:

1. `android_camera2_calibrated_hardware_depth`
2. `arcore_raw_depth`
3. `external_calibrated_3d_scan`
4. `mediapipe_or_fr257_derived_geometry`

The fourth class is always blocked as an independent annotation source.

## Android Camera2 evidence

Android documents `DEPTH_OUTPUT` as a camera capability for depth measurement. A depth-capable camera must support DEPTH16 and expose calibration metadata including lens pose, intrinsic calibration and distortion. DEPTH_POINT_CLOUD may also be supported.

This makes Camera2 calibrated hardware depth a plausible independent source candidate when a concrete device actually exposes the required capability and RGB/depth correspondence.

FR272 does not infer device support from model name.

## ARCore Raw Depth evidence

ARCore exposes raw depth plus a matching confidence image on devices that support Depth. Google documents raw depth as sparse and primarily estimated from world-facing camera motion, with hardware depth sensors used when available.

Therefore:

- ARCore Raw Depth is independent of MediaPipe and may enter source validation;
- ARCore Raw Depth is not same-capture compatible with the current user-facing FR251 lane and remains blocked for FR271 as currently structured;
- ARCore support alone does not establish ground truth;
- raw-depth coverage at the selected nasal-apex pixel must be observed;
- confidence and current-frame binding must be reviewed;
- source accuracy and repeatability remain unvalidated until measured.

FR272 deliberately does not create a confidence threshold.

## Common source-validation requirements

A source cannot pass independent-source preflight unless it has:

- explicit independence from MediaPipe;
- metric scale;
- an RGB observation on which the provider-blind annotation can be made;
- RGB/depth correspondence;
- camera intrinsics;
- camera extrinsics or pose;
- provider output hidden during annotation;
- provider indices hidden during annotation;
- traditional labels hidden during annotation;
- a plan to freeze the annotation before any FR267 scoring.

## Current FR271 lane requirements

In addition to source validation, FR271 currently requires:

- same-capture binding to the geometry evaluated by FR267;
- compatibility with the existing FR251 user-facing camera lane.

A source may therefore be valid for independent source research while still being blocked for the current FR271 lane.

## Source-specific requirements

### Camera2 calibrated hardware depth

Requires:

- Camera2 DEPTH_OUTPUT capability;
- confirmed hardware depth sensor.

For the current FR271 lane, the concrete depth source must also be available on the same user-facing capture path.

### ARCore Raw Depth

Requires for source validation:

- raw depth availability;
- raw depth confidence availability;
- world-facing acquisition.

Because the current FR251 lane is user-facing, this source class is explicitly blocked from the current FR271 same-capture lane.

### External calibrated 3D scan

Requires:

- verified metric calibration.

It remains blocked from FR271 until same-capture compatibility with the evaluated geometry is proven.

## What a pass means

A full current-lane pass means only:

`independent_3d_source_and_current_fr271_lane_preflight_passed_validation_and_registration_still_required`

It does not mean:

- the source is accurate enough;
- the source is repeatable enough;
- an FR266 annotation exists;
- registration into the FR266 canonical frame exists;
- FR271 collection is authorized.

## Post-preflight sequence

After a concrete source passes:

1. validate source accuracy without using MediaPipe as ground truth;
2. validate source repeatability;
3. perform provider-blind RGB annotation and freeze it;
4. materialize a post-freeze registration bridge into the FR266 canonical frame;
5. only then allow FR267 evaluation and immediate FR268 minimization.

For ARCore Raw Depth source research, additionally verify selected-pixel coverage, confidence evidence and current-frame depth binding.

## Privacy boundary

FR272 persists no:

- face image;
- depth map;
- point cloud;
- nasal-apex coordinate;
- MediaPipe landmarks;
- registration transform;
- biometric embedding.

The artifact contains only source capability/provenance facts and blockers.

## Authority boundary

FR272 issues no:

- FR266 annotation;
- canonical registration transform;
- source accuracy/repeatability validation;
- FR271 collection authority;
- candidate winner;
- threshold;
- traditional 準頭 equivalence;
- Production or Commerce authority.

## Next frontier

`probe_user_facing_calibrated_depth_or_external_same_capture_source_then_materialize_post_freeze_registration_bridge_before_fr271_collection`
