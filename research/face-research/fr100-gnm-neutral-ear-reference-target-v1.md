# FR100 — GNM Neutral External-Ear Reference Target Admission

> Track: `face-observation-engine`  
> Issue: #1695  
> Upstream: FR99 / PR #1690  
> Result: neutral reference target admitted / runtime subject observation still blocked

## Why FR100 exists

FR99 answered one narrow question correctly:

> Does the pinned MediaPipe FaceLandmarker named topology directly expose an ear surface?

Answer: **no**.

FR99 therefore refused to invent an ear by selecting arbitrary FACE_OVAL, CONTOURS, or TESSELLATION vertices.

After that merge, the shared face-geometry layer was re-audited. It already contains a different and stronger source for the **reference target** problem: Google GNM Head v3.

FR100 records that existing evidence explicitly so the next step does not waste effort redefining the external-ear target.

## Pinned shared geometry

MESH3 pins:

```text
repository = google/GNM
commit = fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690
asset = gnm/shape/data/versions/v3_0/gnm_head.npz
blob = ae49903ad7d50ce1d64e464a0407441f2781873c
license = Apache-2.0
```

The provider asset exposes:

```text
ears
left
right
```

The shared geometry layer deterministically derives:

```text
left_ear  = ears ∩ left
right_ear = ears ∩ right
```

MESH4 includes those two regions in the product-neutral GNM region ontology.

## What is admitted

FR100 admits:

```text
product-neutral external-ear reference target = YES
bilateral provider-derived ear surfaces = YES
traditional meaning = NO
runtime subject observation = NO
```

The reference target is **provider-derived**, not provider-independent.

That distinction is intentional.

## MediaPipe boundary

MESH5 already says:

```text
left_ear  -> unsupported_on_mediapipe468
right_ear -> unsupported_on_mediapipe468
```

Therefore FR100 does not try to project the GNM ears onto MediaPipe468.

No MediaPipe ear indices are issued.

## Reference target is not subject observation

GNM is a full-head authoring/reference surface.

It does not mean a user photo has been segmented or registered to that surface.

The following remains false:

```text
subject-photo ear extraction = NO
subject-specific GNM registration = NO
runtime ear observation = NO
```

## Next gate

The next bounded task is now precise:

> Find or implement a runtime subject-photo external-ear extraction/segmentation candidate with exact provenance and validate that its output corresponds to visible external ear rather than generic lateral face/head pixels.

It must include:

1. exact model/provider/version/license provenance;
2. bilateral laterality handling;
3. crop/occlusion quality gates;
4. one-ear-visible / two-ear-visible policy;
5. evidence that the extracted region is actually external ear;
6. fail-closed unavailable state.

Appearance and 3D fullness remain separate tasks.

## 柳莊 boundary

Nothing in FR100 means:

```text
ear = 採聽官
ear region = 命門
2D ear = 貼肉/敦厚
ear pixels = 色明
```

Those remain separate methodology-scoped binding questions.

## Verdict

```text
FR99 MediaPipe named ear topology
= NOT FOUND

GNM shared external-ear reference target
= FOUND / ADMITTED

provider-independent target claim
= NO

runtime subject-photo ear extraction
= NOT IMPLEMENTED

traditional binding
= NO

Production
= NO

NEXT
= runtime external-ear extraction / segmentation candidate
```
