# FR104 Phase E — Anatomical laterality source audit

Issue: #1810

## Purpose

Phase D made image-space side evidence explicit but kept anatomical laterality unknown.

Phase E asks a narrower question:

> Does the exact pinned provider/source surface already justify mapping image-space or provider-side labels to subject anatomical left/right?

Current answer: **not yet**.

## Exact pinned witnesses

MediaPipe release:

- tag: `v0.10.35`
- commit: `f8ef212d5c962c0e853db7e59d217056b187084b`

Exact inspected blobs:

1. `mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts`
   - blob: `644de9d8c7cd90880d92b2393b4913fa93ace927`
   - publishes `FACE_LANDMARKS_LEFT_EYE` and `FACE_LANDMARKS_RIGHT_EYE`.

2. `mediapipe/tasks/web/vision/core/image_processing_options.d.ts`
   - blob: `9d463591a7579086458f9ac4028f3848c3e725df`
   - exposes ROI and `rotationDegrees`;
   - does not expose a horizontal-mirror / selfie-mode option in this pinned interface.

3. `mediapipe/framework/formats/landmark.proto`
   - blob: `151dff2360e93b7c4c0cedf5bddabe3093e709d1`
   - defines normalized landmark coordinates;
   - carries no anatomical-side, mirror, or EXIF provenance field.

## What the exact sources establish

The pinned FaceLandmarker connection surface literally publishes left/right eye topology names.

That proves that the provider publishes side-labeled topology symbols.

It does **not**, by itself, establish all of the following:

- that those labels are safe to consume as anatomical side authority in this project;
- whether a horizontally mirrored input causes labels to remain subject-anatomical, swap, or otherwise transform;
- whether the input pixels were externally mirrored before the task received them;
- whether EXIF orientation had already been applied by the host image decoder;
- how a Florence polygon should be mapped to those provider side labels.

The project already records the same limitation at FR24:

```text
sideAuthority = provider_label_only
pairConsumptionState = unordered_provider_labeled_pair_only
anatomicalLateralityReady = false
```

Phase E preserves that boundary.

## Important negative finding

The pinned Web image-processing interface supports rotation but no horizontal-mirror option.

This is **not** evidence that the pixels were not mirrored.

The host can supply already-mirrored pixels before FaceLandmarker sees them.

Therefore:

```text
no mirror option in task API
!=
input is known unmirrored
```

## Rejected shortcuts

Phase E explicitly rejects:

- literal provider `LEFT` / `RIGHT` -> anatomical side without a semantic/mirror witness;
- normalized X sign -> anatomical side without verified orientation/mirror provenance;
- rotation support -> horizontal-mirror proof;
- absence of a mirror option -> proof of unmirrored input;
- another MediaPipe solution's side labels -> FaceLandmarker mirror semantics;
- GNM reference-side groups -> subject-photo laterality.

## Required next evidence

The smallest useful next experiment is a controlled exact-runtime mirror pair:

1. take one non-user, license-safe exact runtime fixture suitable for FaceLandmarker;
2. run the original pixels through the pinned v0.10.35 runtime;
3. run an explicit horizontal pixel mirror of the same fixture;
4. persist only bounded scalar/topology-side summaries;
5. do not persist raw image, raw landmarks, embeddings, or identity artifacts;
6. determine empirically whether provider left/right topology behavior is invariant, swapped, or otherwise unsuitable under mirroring.

Separately, the product capture path needs an independently generated transform receipt recording:

- decoded pixel orientation;
- EXIF application;
- rotation applied before both pipelines;
- horizontal mirror applied before both pipelines.

Only after those two evidence gaps are closed should a reviewed anatomical-side mapping be proposed.

## Authority boundary

Phase E does not authorize:

- anatomical laterality;
- visible-ear plausibility classification;
- numeric thresholds;
- validated neutral ear observation;
- traditional binding;
- Production.

Watchtower-Track: face-observation-engine
