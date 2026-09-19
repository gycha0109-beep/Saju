# FR207 — Whole-face minimum sufficient measurement inventory

Issue: #1016
Stacked on: FR206 / PR #1011

## Goal

Do not choose another facial region and repeat an anatomy-first research chain.

Inventory the whole face once and distinguish:

1. what the repository can already measure neutrally;
2. what needs only a small additional observable primitive;
3. what requires an image model because geometry is insufficient;
4. what requires controlled multi-state capture;
5. what must remain unavailable.

Minimum sufficient means the smallest method that can measure the declared visible construct without semantic overclaim.

## Inventory

| Region | Minimum method | Current state | Immediate direction |
| --- | --- | --- | --- |
| forehead | image classifier / segmentation | image model absent | segment visible hairline/forehead; do not turn 三停/十二宮 into physical geometry |
| eyebrow | landmark geometry | research geometry exists | reuse topology; add only product brow span/arch/tail primitives |
| eye pair | landmark geometry | research metrics exist | reuse X/Y/aspect/separation metrics; add tail angle; image model for eyelid crease/radiance |
| nose | contour geometry | governed neutral metrics exist | reuse bridge deviation + tip circularity; add bounded profile projection only if needed |
| mouth/lips | contour geometry | governed neutral metrics exist | reuse contour/relative-size metrics; image model for color; controlled states for 開大合小 |
| ear | image classifier / segmentation | unavailable in current landmark pipeline | build visible ear boundary model or return unavailable |
| cheek/mid-face | contour geometry | operational breadth candidate | use visible-breadth naming; add midface-width/prominence primitives; no zygion loop |
| chin/lower face | contour geometry | research geometry exists | add canonical product 2D contour/width primitive; do not call soft-tissue contour bone |

## Existing reusable assets

### Eye

FR158 already exposes neutral research metrics for eye-cycle X span, perimeter, centroid separation, and turning angle. FR178 adds Y span and Y/X ratio.

These do not automatically mean the traditional terms 細, 長, 三角, or 垂. The next missing geometry is smaller: eye-tail orientation and a product-facing per-eye asymmetry surface.

Appearance-only categories such as eyelid crease, hooding, and visible radiance require an image model or remain unavailable.

### Nose

`nose-geometry.ts` already defines bridge centerline RMS deviation and tip contour circularity.

Circularity is roundness, not fullness or projection. If a traditional rule truly needs projection, use the existing profile capture to define the smallest visible profile primitive rather than proving hidden skeletal anatomy.

### Mouth / lips

Existing reusable neutral metrics include FR80 contour aspect ratio, FR82 mouth span / full-mesh span, and FR97 role-free contour separation.

FR132 already decomposes the scan-checked source criteria 方大, 端厚, 角弓, 開大合小, 唇紅.

Implementation method differs by construct:
- static geometry for shape and relative size;
- image appearance model for visible lip color;
- controlled multi-state capture for open/close relation;
- unavailable where the source term still lacks a defensible observable definition.

### Forehead / ear

These are not reasons to begin bone/anatomy research.

- forehead needs a visible hairline/forehead segmentation surface;
- ear needs a visible ear boundary/shape model because the current face-landmark mesh does not govern ear geometry.

Until those models exist, output is unavailable.

### Cheek / mid-face

FR206 controls the semantics:

```text
visible_face_breadth != zygion
visible_face_breadth != skeletal_bizygomatic_breadth
```

The raw full face-oval breadth remains an operational candidate. Product validation targets the visible construct and representative images, not a hidden bone landmark.

### Chin / lower face

Provider-independent contour/scaffold research exists, but it is not yet a complete product 2D jaw/chin classifier.

The next useful work is a bounded product contour/width primitive, not proof that image contour equals mandibular bone.

## Sequencing rule

```text
reuse existing neutral geometry
→ close the smallest observable primitive gaps across regions
→ add appearance model only where required
→ use controlled multi-state capture only where the source construct is dynamic
→ unavailable if none is reliable
```

This supersedes the previous tendency to turn one facial feature at a time into a standalone anatomy-validation program.

## Authority boundary

FR207 does not:
- invent thresholds;
- promote traditional bindings;
- call proxies anatomy;
- claim physiognomy is scientifically predictive;
- activate Production or Commerce.

The next frontier is cross-face closure of the small missing observable primitives.
