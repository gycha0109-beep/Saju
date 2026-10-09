# FR300-R1R-ZC — zero-cost-first metric 3D qualification

Watchtower-Track: face-engine

## Decision

FR300-R1R is cost-constrained before any paid commercial-license work.

No paid dataset purchase, commercial-license purchase, or paid sample acquisition is authorized by this track.

Priority is frozen as:

```text
zero_cost_public
  > zero_cost_on_request
  > existing_hardware_only
  >>> paid_required
```

The R1Q commercial shortlist remains historically valid, but BFM 2009 and the two Nexdata candidates are deferred. They cannot consume money without separate explicit authority.

## New zero-cost screen

The zero-cost refresh found one materially stronger candidate than the R1Q paid-first frontier: **MINDS-Libras RGB-D sensor data**.

### 1. MINDS-Libras RGB-D — qualify zero-cost next

Dataset DOI: `10.5281/zenodo.4322984`.

The Zenodo-derived European Language Grid catalog record identifies the RGB-D distribution as open-access and CC BY 4.0.

Creator/thesis authority documents:

- Kinect v2 for Xbox One capture;
- RGB and depth video;
- 1,347 FaceModel XYZ points per frame;
- FaceModel coordinates referenced to the sensor center;
- FaceModel coordinate ranges explicitly expressed in meters;
- ColorFaceModel mapping the same 1,347 points into the RGB frame;
- DepthFaceModel mapping the same 1,347 points into the depth frame;
- documented face-point labels including NoseTip = 18 and NoseTop = 24.

This is substantially closer to FR299 than a generic “3D” dataset because the released representation already exposes a source-described metric face geometry plus 2D mappings.

It is **not admitted to FR299 yet**. Remaining blockers:

1. exact Zenodo artifact identity/checksum has not been frozen;
2. participant consent for commercial product-development validation is not source-bound;
3. FR299's required canonical nose-root/tip mapping has not yet been proven against the 1,347-point topology;
4. exact released bytes still need to be inspected to ensure the documented meter semantics survived packaging.

Therefore:

```text
cost = zero_cost_public
dataset_license = commercial-compatible CC BY 4.0
metric_geometry = source-bound preliminary PASS
paired_2d_mapping = source-bound preliminary PASS
participant_product_scope = unresolved

FR299 = false
FR300-R2 = false
```

The next deep qualification should target MINDS-Libras before any paid dataset.

## 2. UL-DD — zero-cost technical hold

Dataset DOI: `10.5281/zenodo.17978727`.

The Zenodo Research Use License explicitly permits bona fide commercial R&D. The 2026 Scientific Data descriptor states that participants were informed that facial/video data would be released and that only post-collection explicit-consent releases were made public.

Technically, however, the release is not yet a metric reference.

The capture used a ZED 2 3D camera, but the public/released video path is described as split left/right MP4 views resized to 440×370. The current source evidence does not bind:

- a metric depth map to the released MP4 bytes;
- device-specific stereo calibration to the released artifacts;
- a reconstruction transform that preserves physical scale;
- a same-frame FR299-compatible metric face surface.

Therefore:

```text
cost = zero_cost_on_request
commercial_R&D_right = verified
participant_public_release = verified
metric_depth_survivability = unresolved

disposition = hold_zero_cost_technical
```

UL-DD stays behind MINDS-Libras.

## 3. AST-Face — zero-cost rights/metric hold

Dataset DOI: `10.17605/OSF.IO/XK4F6`.

AST-Face is technically interesting:

- structured-light facial capture;
- public standardized OBJ meshes for 98 participants;
- raw scans under DUA;
- synchronized RGB for a consenting 52-participant subset under DUA;
- explicit participant consent for public anonymized non-textured derived data.

But the current public authority does not establish a commercial product-development license for the dataset tier.

It also does not yet establish physical metric units for the public standardized meshes. The published topology-unification pipeline uses normalized processing and regularization, so physical-scale preservation cannot be inferred merely because the source was a structured-light scan.

Therefore:

```text
cost = zero_cost_on_request
commercial_product_scope = unresolved
public_mesh_metric_contract = unresolved

disposition = hold_zero_cost_rights
```

No controlled raw scan is requested until the rights question is worth resolving.

## Paid candidates are deferred, not deleted

The following R1Q candidates remain known but are no longer the active frontier:

- BFM 2009 ten example scans;
- Nexdata 200 Vietnamese 3D Living Face;
- Nexdata 40 People 3D&2D Living Face.

Their R1Q evidence is not rewritten. R1R-ZC only changes acquisition priority.

```text
paidSpendAuthorized = false
paidPurchaseRequiresSeparateExplicitAuthority = true
```

A future technical result cannot silently flip this flag.

## Existing-hardware fallback

Existing-hardware-only capture remains the third tier after zero-cost public/request data.

R1R-ZC does not claim that an ordinary phone or current device can produce FR299-grade metric truth. That requires a separate calibration/accuracy qualification.

The fallback is therefore:

```text
existing_hardware_metric_3d_reference_feasibility
  = fallback_not_yet_qualified
```

No new hardware purchase is implied.

## Frozen authority

```text
R1Q predecessor candidates = 20
new zero-cost candidates = 3

qualify_zero_cost_next:
  - minds_libras_rgbd

hold_zero_cost_technical:
  - ul_dd_zed2

hold_zero_cost_rights:
  - ast_face_public_and_controlled

paid candidates deferred:
  - bfm2009_example_scans
  - nexdata_vietnam_200_3d_liveness
  - nexdata_40_3d_2d_liveness

paidSpendAuthorized = false

fr299EligibleCandidateCount = 0
fr300R2EligibleCandidateCount = 0
productMaterialization = 18/29
```

## Next evidence frontier

The next evidence task is intentionally narrow:

1. bind the exact MINDS-Libras RGB-D Zenodo artifact identity;
2. inspect released FaceModel bytes and confirm the documented meter-space representation survives packaging;
3. map the documented Kinect face topology to the exact FR299 nose-root/tip contract;
4. keep participant commercial product-development scope fail-closed unless source authority is found;
5. only if MINDS-Libras fails, inspect UL-DD metric survivability;
6. only after zero-cost candidates fail, evaluate existing-hardware capture feasibility;
7. paid acquisition remains out of scope.

Watchtower-Track: face-engine
