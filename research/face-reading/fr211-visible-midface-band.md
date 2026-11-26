# FR211 — Visible mid-face band without zygion

Issue: #1040  
Stacked on: FR210 / PR #1037

## Product question

The required product observation is not “recover the anatomical zygion from a selfie.”

It is:

> how wide is the visible cheek/mid-face contour, relative to the visible face contour, under the governed frontal geometry?

FR211 implements that question directly.

## Geometry

FR211 reuses:

- FR77 canonical-aligned metric face geometry;
- FR24's two closed eye cycles as a role-invariant eye-line reference;
- FR79's unordered lips contour union as a mouth-line reference;
- the 36-vertex MediaPipe FACE_OVAL topology selector already recorded in FR200 research.

The FACE_OVAL selector is used only to select visible outer-contour points. Its provider indices are not emitted in the FR211 product result and are not mapped to zygion or skeletal anatomy.

### Band

1. Compute the mean canonical Y of all points in the two eye cycles.
2. Compute the mean canonical Y of all points in the unordered lips contour union.
3. Define the visible mid-face band from the eye-line Y to the halfway point toward the lips-line Y.
4. Select FACE_OVAL contour points whose canonical Y lies inside that band.
5. Measure the X envelope of those band points.
6. Measure the full FACE_OVAL X envelope.
7. Feed those two visible envelopes to FR208:
   `neutral.midface.visible_width_to_face_width_ratio@0.1.0`.

This is a visible-contour ratio only.

## Why this replaces the zygion detour

FR206 already authorizes the operational labels:

- `visible_face_breadth`;
- `visible_midface_width`;
- `cheek_contour_prominence`.

FR206 also explicitly forbids relabeling the measurement as:

- zygion;
- bizygomatic breadth;
- true zygomatic bone width.

It further states that additional zygion validation does not block operational use of visible morphology.

FR211 therefore does not consume FR204's calibration factor and does not require a new anatomical validation campaign.

## Fail closed

FR211 does not invent a substitute when:

- eye and mouth vertical references collapse;
- the selected band contains fewer than two outer-contour points;
- the selected band has no positive horizontal envelope.

Forged/unissued FR77 or FR79 sources are rejected.

## Authority

FR211 issues no:

- zygion claim;
- skeletal bizygomatic claim;
- 234/454 anatomical binding;
- FR204 calibration;
- threshold;
- classifier;
- traditional interpretation;
- Production activation;
- Commerce activation.
