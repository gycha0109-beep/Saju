# FR193 — Bounded Coverage-Gap Selection

## Status

Governance-only selection artifact. This note creates no face geometry, provider mapping, traditional interpretation, calibration, classifier, capture-view requirement, Production authority, or Commerce authority.

## Baseline

```text
main = 739baee761a776586a38c34ca587e19ce968c0a1
upstream = FR192 Master Region / Coverage Skeleton
frontier = select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice
```

FR192 records exactly three physical / observable targets as `coverage_target_unverified`:

```text
forehead
ear
cheek_mid_face
```

FR193 compares those three targets without pre-selecting one and without converting traditional methodology into physical geometry.

## Fresh repository check

Before selection, the default branch was searched for generic physical/provider authority that could safely support an immediate component slice. No independent repository authority was located for:

```text
face oval
face contour
FACE_OVAL
FaceMesh
provider-independent whole-face outline
```

This negative result is used only as a repository-state blocker. It is not a claim about what MediaPipe or any external provider can support in general.

## Candidate audit

### 1. Forehead

FR192 state:

```text
coverage_target_unverified
```

Current blockers:

```text
no_general_physical_forehead_observation_authority
no_provider_independent_whole_face_outline_authority
hairline_or_upper_face_boundary_not_governed
```

Traditional 三停 and 十二宮 sources may reference upper-face locations, but those are methodology / locator authority. FR193 does not turn them into a neutral physical forehead boundary.

Result:

```text
blocked_pending_prerequisite
```

### 2. Ear

FR192 state:

```text
coverage_target_unverified
```

Current blockers:

```text
no_independent_physical_ear_observation_or_geometry_authority
no_governed_ear_provider_landmark_binding
fr191_profile_view_does_not_declare_universal_ear_capture_sufficiency
```

五官 research can mention the ear, but this does not establish neutral ear geometry. FR191's side-agnostic profile capture role also does not claim universal ear-specific sufficiency.

Result:

```text
blocked_pending_prerequisite
```

### 3. Cheek / mid-face

FR192 state:

```text
coverage_target_unverified
```

Current blockers:

```text
no_independent_physical_cheek_mid_face_geometry_authority
no_provider_independent_whole_face_outline_authority
six_fus_is_traditional_methodology_not_neutral_physical_geometry
```

六府 is retained as source-lineage-specific traditional methodology authority. It cannot be used to create a neutral cheek / mid-face geometry map.

Result:

```text
blocked_pending_prerequisite
```

## Selection

No physical candidate is selected as an immediately governed slice.

The bounded workflow prerequisite is:

```text
establish_provider_independent_whole_face_neutral_outline_support_before_selecting_unverified_component_slice
```

This prerequisite is selected because it is shared by the blocked forehead and cheek/mid-face paths and can be investigated without importing traditional semantics. It does **not** resolve the ear blockers; the contract explicitly keeps `ear` independently blocked.

This is sequencing authority only. It does not define the outline itself.

## Authority firewall

FR193 keeps all of the following false:

```text
geometry authority
capture sufficiency authority
provider landmark binding authority
traditional semantic authority
metric authority
threshold authority
calibration authority
classifier authority
participant / expert collection authority
Production activation
Commerce activation
```

Disallowed shortcuts are explicit:

```text
三停 / 十二宮 -> neutral forehead geometry
六府 -> neutral cheek / mid-face geometry
五官 -> neutral ear geometry
FR191 frontal/profile contract -> universal component capture sufficiency
```

## Deterministic validation

The runtime-free governance contract pins:

- exact candidate membership and order,
- exact FR192 state,
- exact empty neutral-authority refs for all three candidates,
- exact traditional shortcut refs,
- exact blockers,
- `blocked_pending_prerequisite` for every candidate,
- prerequisite mode with no selected physical candidate,
- unlock targets `forehead` and `cheek_mid_face`,
- independently blocked target `ear`,
- closed authority boundaries,
- issued-instance identity through `WeakSet`.

Arbitrary refs cannot make a candidate selectable.

## Next frontier

```text
establish_provider_independent_whole_face_neutral_outline_support_without_promoting_component_or_traditional_semantics
```

A later slice may reconsider `forehead` or `cheek_mid_face` only after bounded neutral-outline support exists. `ear` requires its own independent prerequisite evidence.
