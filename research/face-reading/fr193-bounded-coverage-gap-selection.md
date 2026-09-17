# FR193 — Corrected Bounded Coverage-Gap Selection

## Status

Governance-only selection artifact for issue #742. This note creates no component geometry, provider landmark binding, capture sufficiency, traditional interpretation, metric, threshold, calibration, classifier, Production authority, or Commerce authority.

## Fresh baseline

```text
main = b92a0f1d98e7bddd4554432f1c79191a92b728c8
upstream = FR192 Master Region / Coverage Skeleton
repository provider pin = @mediapipe/tasks-vision 0.10.35
```

FR192 leaves exactly three physical / observable targets as `coverage_target_unverified`:

```text
forehead
ear
cheek_mid_face
```

## Why the previous FR193 was superseded

Issue #735 and PR #736 selected a generic provider-independent whole-face neutral outline as a shared prerequisite for forehead and cheek/mid-face. Fresh provider review does not justify that dependency.

MediaPipe publishes a dense facial-surface mesh and a named face-oval topology. Those facts establish provider surface/topology availability, not anatomical component semantics. In particular:

```text
face oval != forehead hairline boundary
facial surface mesh != cheek/mid-face component authority
provider topology != ear geometry authority
```

Therefore a generic whole-face outline must not be inserted as a fabricated prerequisite.

## Current provider-version check

As of 2026-09-17, npm lists `@mediapipe/tasks-vision` latest as `1.0.1`; this repository remains pinned to `0.10.35`.

FR193 does not upgrade the package. The selection contract pins the repository version so later provider evidence can be checked against the exact runtime dependency before any mapping is admitted.

External provider references reviewed for sequencing only:

- Google MediaPipe Face Mesh / Face Geometry documentation: 468-landmark facial-surface mesh and canonical face topology.
- Google AI Edge `FaceLandmarksConnections`: published `FACE_LANDMARKS_FACE_OVAL` connections.
- npm `@mediapipe/tasks-vision` version history: current latest versus repository pin.

These external sources are feasibility evidence only. They are not MyeongHa cheek anatomy or landmark-index authority.

## Candidate comparison

### Forehead

State remains:

```text
coverage_target_unverified
blocked_pending_candidate_specific_prerequisite
```

Blockers:

```text
no_general_physical_forehead_observation_authority
hairline_or_upper_face_boundary_not_governed
published_face_oval_is_not_forehead_hairline_authority
```

三停 and 十二宮 remain traditional methodology. Neither provider face oval nor traditional upper-face locators may be silently converted into a neutral forehead boundary.

### Ear

State remains:

```text
coverage_target_unverified
blocked_pending_candidate_specific_prerequisite
```

Blockers:

```text
no_independent_physical_ear_observation_or_geometry_authority
no_governed_ear_provider_landmark_binding
fr191_profile_view_does_not_declare_universal_ear_capture_sufficiency
```

五官 is not neutral ear geometry, and FR191 does not grant ear-specific capture sufficiency.

### Cheek / mid-face

State remains:

```text
coverage_target_unverified
selected_bounded_research_frontier
```

Blockers remain explicit:

```text
no_neutral_cheek_mid_face_anatomical_target_model
no_governed_provider_to_cheek_mid_face_mapping
six_fus_is_traditional_methodology_not_neutral_physical_geometry
```

Selection means only that a bounded next audit is evidence-productive: neutral anatomy / morphometrics can define the target independently, while the exact pinned provider can be checked for surface/topology feasibility. It does not mean a cheek polygon, index set, metric, or traditional mapping exists.

## Corrected selection

```text
mode = bounded_research_frontier
selectedPhysicalCandidate = cheek_mid_face
selectedCandidateCoverageStateRemains = coverage_target_unverified
selectionPromotesCoverage = false
providerIndicesMayBeAssigned = false
componentGeometryMayBeIssued = false
```

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

It also pins:

```text
facial surface mesh != cheek authority
face oval != forehead hairline authority
provider topology != ear authority
```

## Next frontier

```text
establish_cheek_mid_face_neutral_target_model_and_pinned_provider_surface_feasibility_without_assigning_provider_indices
```

The next bounded track should admit neutral anatomical / morphometric target evidence and inspect the exact `@mediapipe/tasks-vision@0.10.35` surface/topology capability. It must remain fail-closed on provider indices and geometry until an explicit mapping authority exists.
