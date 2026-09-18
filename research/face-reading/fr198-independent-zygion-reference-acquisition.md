# FR198 — Independent zygion reference acquisition audit

Issue: #885

## Purpose

FR197 defined how provider-to-neutral zygion correspondence must be validated without circular labels and without a repeated user/product-operator capture campaign.

FR198 performs the acquisition audit and records a newly identified public synthetic execution lane. It does **not** claim that independent zygion reference coordinates or provider correspondence have already been produced.

## Upstream authority

```text
FR197 authorityState
= independent_zygion_validation_protocol_defined_execution_evidence_absent

provider candidate
= MediaPipe v0.10.35 / @mediapipe/tasks-vision 0.10.35
= [234, 454]

providerIndexAdmissionAuthorized
= false
```

## Exact provider-source audit

The reviewed official MediaPipe materials establish:

- the canonical face model follows the face-landmark topology;
- face mesh vertex IDs correspond to face landmark IDs;
- the official connection set places indices 234 and 454 in `FACE_LANDMARKS_FACE_OVAL`.

Reviewed official sources do **not** provide a source-governed semantic statement that 234 or 454 is anthropometric zygion.

Therefore:

```text
official face-oval topology membership
!=
direct zygion semantic mapping
!=
provider index admission
```

References:

- https://github.com/google-ai-edge/mediapipe/releases/tag/v0.10.35
- https://github.com/google-ai-edge/mediapipe/blob/v0.10.35/mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts
- https://github.com/google-ai-edge/mediapipe/blob/v0.10.35/mediapipe/modules/face_geometry/protos/face_geometry.proto
- https://github.com/google-ai-edge/mediapipe/blob/v0.10.35/mediapipe/modules/face_geometry/data/canonical_face_model.obj

## Preferred independent-reference lane — NIOSH NPPTL survey

The NIOSH 2003 head-and-face anthropometric survey is the strongest currently identified acquisition lane.

Published and government-hosted descriptions report that a large participant subset had:

- surface scans; and
- 26 three-dimensional anatomical landmark locations.

The published landmark set explicitly includes bilateral **Zygion**.

This is independent from the MediaPipe candidate assignment and therefore satisfies the *origin* requirement for a neutral reference candidate.

However, the current execution state is:

```text
raw same-sample scan + landmark asset acquired
= false

access state
= controlled / data-use-agreement path

provider/reference correspondence executed
= false
```

References:

- https://stacks.cdc.gov/view/cdc/223510
- https://archive.cdc.gov/www_cdc_gov/niosh/npptl/topics/respirators/headforms/default.html
- https://stacks.cdc.gov/view/cdc/188017

## Djordjevic et al. 2016

The peer-reviewed 3D twin study reports manual placement of 37 anthropometric landmarks and explicitly includes right/left zygion.

That establishes an independent 3D zygion annotation methodology candidate.

The currently reviewed public material does not establish an openly obtainable same-sample surface + landmark-coordinate package suitable for executing FR197, so it remains:

```text
PUBLIC_METHOD_ONLY_NO_EXECUTABLE_SAME_SAMPLE_ASSET
```

References:

- https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0162250
- https://figshare.com/articles/dataset/Definitions_of_anthropometric_landmarks_identified_on_3D_facial_images_/3802275

## FaceBase 3D Facial Norms

FaceBase provides a valuable negative boundary.

The 3DFN paper records maximum facial width as direct caliper measurement:

```text
Right Zygion (zy_r) - Left Zygion (zy_l)
```

but the standard 24 3D surface landmark set does not include zygion.

Therefore scalar zy-zy width cannot be promoted into endpoint-coordinate correspondence for provider landmarks 234/454.

References:

- https://www.facebase.org/resources/human/facial_norms/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC4841760/

## Immediate public execution lane — open synthetic 3D face assets

A second external audit identified a public no-user-capture execution lane from the research-digitized-rhinoplasty project.

The 2024 open synthetic dataset publishes 20 base synthetic identities split across male/female repositories. For each base identity, the repository exposes matching identifiers across:

- a 3D `.obj` facial surface;
- a 2D facial image; and
- a landmark metadata JSON.

The male repository contains 10 matching tuples and the female repository contains 10 matching tuples, for 20 public same-ID tuples total.

The supplied landmark JSON does **not** contain zygion coordinates. Therefore those JSON files cannot be treated as the independent zygion reference.

A separate 2023 peer-reviewed/open-source implementation from the same research program defines and computes bilateral zygion on oriented 3D meshes without using MediaPipe provider indices. Its public notebook defines zygion as a lateral zygomatic-arch target and derives the coordinates from 3D mesh geometry after locating pronasale.

This method is independent from the MediaPipe `[234,454]` candidate assignment, but it is not treated as perfect ground truth. The published validation against manual markings reports a mean left-zygion Euclidean error of **8.08 mm** over 111 3D facial scans. That observed error is evidence metadata only; it is **not** an FR198 acceptance threshold.

Current state:

```text
public same-ID image + 3D surface assets available
= true

public same-ID tuple count
= 20

zygion coordinates already published for those 20 assets
= false

independent zygion derivation executable without MediaPipe candidate visibility
= true

provider/reference correspondence executed
= false

provider index admission
= false
```

The next execution must preserve ordering:

```text
public OBJ
→ derive bilateral zygion using the independent 3D method
→ freeze reference output
→ only then run MediaPipe v0.10.35 on the corresponding same-ID image
→ descriptive correspondence review
```

The reference-derivation stage must not inspect indices 234/454 or any provider result.

References:

- https://github.com/research-digitized-rhinoplasty/3D-face-morph
- https://github.com/research-digitized-rhinoplasty/3D-face-morph-dataset-male
- https://github.com/research-digitized-rhinoplasty/3D-face-morph-dataset-female
- https://github.com/research-digitized-rhinoplasty/3D-Facial-Landmark-Detection
- https://doi.org/10.1109/ACCESS.2023.3255099
- https://doi.org/10.1089/fpsam.2023.0030

## Evidence-state rule

FR198 distinguishes:

```text
candidate source found
!=
public same-ID image/surface lane found
!=
independent zygion reference coordinates derived
!=
same-sample provider correspondence executed
!=
provider index admitted
```

A controlled-access catalog entry or peer-reviewed methods section is not executable correspondence evidence by itself.

## User burden

No additional repeated user capture is required.

The old MESH-DATA-02 repeated same-face campaign is superseded for this frontier by the independent-reference path. Existing capture artifacts remain descriptive/E2E evidence only.

## Authority boundary

Still false:

- 234 = zygion
- 454 = zygion
- provider-side anatomical assignment
- provider index admission
- bizygomatic metric authorization
- threshold
- calibration
- classifier
- traditional 六府 projection
- Production
- Commerce

## Next executable gate

```text
derive bilateral zygion on a public synthetic OBJ
without MediaPipe candidate visibility
→ freeze the independent reference result
→ run pinned MediaPipe v0.10.35 on the corresponding same-ID public image
→ descriptive FR197 correspondence analysis
```

No sample-size mandate or acceptance threshold is created here.

## Updated frontier

```text
authorityState
= public_synthetic_same_sample_lane_registered_reference_derivation_pending

nextRequiredGate
= execute_public_synthetic_reference_derivation_without_provider_visibility

nextFrontier
= execute_public_synthetic_independent_zygion_reference_derivation_without_provider_visibility_then_run_fr197_correspondence
```

This route removes the current need for participant recruitment, repeated user capture, or waiting on NIOSH controlled-access material for the first descriptive execution. NIOSH remains a higher-authority human anthropometric acquisition lane for later corroboration.
