# FR198 — Independent zygion reference acquisition audit

Issue: #885

## Purpose

FR197 defined how provider-to-neutral zygion correspondence must be validated without circular labels and without a repeated user/product-operator capture campaign.

FR198 performs the first acquisition audit. It does **not** claim that the required same-sample independent reference asset has already been obtained.

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

## Evidence-state rule

FR198 distinguishes:

```text
candidate source found
!=
asset acquired
!=
same-sample correspondence executed
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
obtain independently labelled same-sample reference asset
without user recapture
→ run pinned MediaPipe v0.10.35 provider observation on the same sample
→ descriptive FR197 correspondence analysis
```

No sample-size mandate or acceptance threshold is created here.
