# FR191 — Frontal + Profile Product Capture-View Contract

## Status

Research/application authority artifact only. Participant capture execution and Production activation remain blocked.

## Problem

The repository already contains two different capture-related authority layers:

- FR19 governs pixel orientation normalization and explicitly fails closed on unresolved anatomical mirroring/laterality.
- FR188 defines an Eye-Pair Xi/Chang research protocol whose capture role is `single_frontal` and whose repeat-capture/session semantics are specific to that study.

Neither artifact defines the minimal product-level view bundle that a future Face Reading entry flow should acquire once before organ-specific interpretation work branches.

Without that upper contract, two failures are possible:

1. every eye/nose/mouth/ear/forehead method pack independently reinvents user capture UX; or
2. one organ's study-specific protocol is incorrectly generalized as authority for the whole face.

## FR191 decision

FR191 defines exactly two shared product input roles:

```text
frontal × 1
profile × 1
```

The `profile` role means only one side-view image. It is intentionally side-agnostic.

FR191 does **not** require both left and right profiles and does **not** introduce 45-degree/oblique views.

## Why `profile` is side-agnostic

FR19 currently establishes EXIF-described pixel orientation normalization but explicitly leaves source-pixel mirror state unresolved. It does not allow the image X-axis or provider side labels to establish anatomical left/right in Production.

Therefore FR191 may require a profile image as a product view role, but it may not relabel that image as authoritative anatomical `left_profile` or `right_profile`.

If a future ear, nose, asymmetry, or other method pack needs anatomical laterality, that requirement must be issued independently after its own capture/laterality authority exists.

## Shared acquisition is not shared measurement authority

FR191 deliberately separates product acquisition from organ-specific interpretation authority.

The two shared images do not imply that eyes, nose, mouth, ears, forehead, and lower face use the same:

- landmarks;
- geometry;
- metrics;
- quality criteria;
- confound controls;
- repeatability criteria;
- expert operationalization;
- calibration;
- traditional region mapping.

Each organ/method pack may consume the shared views only under its own governed authority. If those views are insufficient for a particular future method, that method must fail closed or obtain a separately governed additional-view requirement. FR191 does not pre-authorize such a requirement.

## FR188 preservation

FR188 remains an Eye-Pair Xi/Chang study-specific repeat-capture/dataset-split protocol. Its `single_frontal` research semantics are not changed, widened, or superseded by FR191.

Product acquisition and research evidence collection are separate layers.

## Reference-image boundary

External/reference face-reading diagrams may reveal coverage gaps or useful terminology to investigate, but FR191 does not treat them as canonical region, geometry, traditional-semantic, or source authority. No region or interpretation mapping is admitted from reference images in this phase.

## Explicitly not issued

FR191 does not issue:

- bilateral profile capture;
- 45-degree/oblique capture;
- numeric yaw/pitch/roll tolerances;
- lighting/distance/lens/expression thresholds;
- organ-specific capture-quality or sufficiency authority;
- organ-specific landmarks, metrics, or confound models;
- participant capture execution;
- evidence collection;
- traditional region mapping;
- traditional semantic promotion;
- threshold/calibration/classifier authority;
- biometric identity matching;
- Production activation.

## Verdict

```text
FRONTAL_PLUS_PROFILE_PRODUCT_CAPTURE_VIEW_CONTRACT_DEFINED_ORGAN_SPECIFIC_SUFFICIENCY_AND_PRODUCTION_NOT_ADMITTED
```

## Next frontier

The structural gap exposed by the product-view review is broader than the Xi/Chang vertical slice. Before additional narrow organ/concept expansion, inventory and define a governed Face Reading master region/coverage skeleton so the repository can state which face regions and traditional map systems exist, where their source authority comes from, and which ones are merely unverified coverage candidates.

```text
inventory_and_define_governed_face_reading_master_region_coverage_skeleton_before_additional_vertical_slice_expansion
```
