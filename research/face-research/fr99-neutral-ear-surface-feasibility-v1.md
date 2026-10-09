# FR99 — Neutral External-Ear Surface Feasibility

> Track: `face-observation-engine`  
> Issue: #1689  
> Upstream: 柳莊 T7 readiness audit #1688  
> Result: direct named provider ear topology not found / no ear surface candidate issued

## Question

Can the currently pinned neutral observation provider supply a source-supported external-ear geometry surface without inventing provider semantics?

## Provider pin

The audited chain is already pinned to:

- `@mediapipe/tasks-vision@0.10.35`
- official MediaPipe tag `v0.10.35`
- release commit `f8ef212d5c962c0e853db7e59d217056b187084b`
- topology source `face_landmarks_connections.ts`
- release topology blob `644de9d8c7cd90880d92b2393b4913fa93ace927`

## Current neutral contract

FR14/FR15 currently admits:

- pose quality;
- brow regions;
- brow midline;
- eye regions;
- nose region.

It has no ear consumer slot and no ear capability.

## Published named topology result

The pinned FaceLandmarker named topology surface includes:

- lips;
- left/right eyes;
- left/right eyebrows;
- left/right irises;
- face oval;
- contours;
- tessellation.

There is no ear-specific named topology.

This is a **negative direct-named-topology result**, not proof that ear extraction is impossible.

## What is forbidden

The following shortcuts remain invalid:

```text
FACE_OVAL subset -> ear
CONTOURS subset -> ear
TESSELLATION subset -> ear
provider landmark index -> ear role
neutral ear -> 採聽官
neutral ear region -> 命門
2D ear geometry -> 貼肉/敦厚
uncontrolled RGB -> 色明
```

FR37 already establishes the general rule that generic provider topology surfaces are search surfaces only; arbitrary subgraph selection is not provider binding authority.

## Result

```text
direct named ear topology = NO
current ear consumer slot = NO
current ear capability = NO
provider landmark refs issued = 0
neutral ear surface candidate = NOT ISSUED
traditional semantic authority = NO
Production = NO
```

## Next evidence required

A later ear-surface candidate needs, at minimum:

1. a provider-independent neutral external-ear target definition;
2. reviewed extraction/segmentation evidence;
3. source/provenance for any proposed provider component or landmark set;
4. crop/visibility/occlusion handling;
5. laterality policy;
6. separate controlled appearance protocol for color/appearance;
7. separate depth or multi-view evidence before attachment/projection/fullness.

## 柳莊 consequence

This keeps the five `採聽官成` T7 rows blocked exactly as intended.

The blocker has now been narrowed from “ear evidence missing” to a concrete next gate:

```text
provider-independent neutral external-ear target
+
reviewed extraction evidence
```

No 柳莊 semantic binding is attempted in FR99.
