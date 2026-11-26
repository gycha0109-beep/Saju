# FR104 Phase U0 — controlled anatomical reference asset audit

Issue: #1810

## Goal

Select an anatomical ground-truth source that is independent from the MediaPipe provider labels before any provider LEFT/RIGHT -> subject anatomical side mapping is attempted.

No candidate is admitted by this phase.

## Candidate 1 — MakeHuman default human

Pinned source:

- repository: `makehumancommunity/makehuman`
- commit: `a8bc2d54ff0ac92e78ff71431b1023eda42bf482`
- base mesh blob: `d26635e9326e3cca30778fd7b9c00062b03cce09`

License witness:

- `LICENSE.md`
- blob `5d1a49d31ebdaa46b06c52eae2c005c678a63ffa`
- bundled graphical assets, including the base mesh, are released under CC0 1.0

Anatomical-side witnesses:

- default skeleton blob `b02cbecae00143856410d7561adf006d83bf9b3e`
  - defines `eye.L` and `eye.R`
- POV-Ray head-orientation helper blob `c017181d4d6d948833952fe6523e8798cc2c39c2`
  - defines the left-right vector as
    `vnormalize(MakeHuman_joint_r_eye-MakeHuman_joint_l_eye)`
- high-poly eye asset is pinned independently from the base mesh

This is the strongest independent candidate because the anatomical eye anchors and left-right head vector are supplied by a non-MediaPipe asset family.

It is **not admitted yet** because:

- the deterministic render pipeline has not been executed;
- the rendered fixture digest is not pinned;
- exactly-one-face detectability under the exact FaceLandmarker 0.10.35 runtime is not verified.

Current state: `usable_for_diagnostic_only`.

## Candidate 2 — Khronos CesiumMan

Pinned source:

- repository: `KhronosGroup/glTF-Sample-Assets`
- commit: `f36bfdabd1031c3cf6689a50570b8cdf3678b49c`
- glTF blob: `f474e54a73329809726566a139861ac65884b830`
- metadata license: CC-BY-4.0, with separate Cesium legal-mark terms

The rig contains explicit L/R arm and leg joint names.

However, this audit did not find a pinned eye-center joint pair or a direct head left-right axis definition suitable for the eye-based mapping protocol.

Current state: `source_axis_ambiguous`.

## Candidate 3 — MediaPipe canonical face model

Pinned exact provider-family source:

- MediaPipe v0.10.35 commit `f8ef212d5c962c0e853db7e59d217056b187084b`
- canonical OBJ blob `0e666d1c4e75949d1639c2bcf347a38da4834164`
- BUILD/license witness blob `a7085f3dbecdf04ec3042855e20dfe52b417ab48`
- Apache-2.0

The model is useful as a provider-family reference, but it is not independent anatomical truth. Phase R also preserved an exact-release left/right semantic conflict rather than resolving it by convention.

Current state: `usable_for_diagnostic_only`.

## Candidate 4 — Khronos BrainStem / Poser asset

The asset is governed by `LicenseRef-Poser-EULA` rather than a permissive fixture license.

Under this project's canonical-evidence policy it is not admitted as a controlled anatomical reference.

Current state: `license_not_admissible`.

This is a project evidence-policy decision, not a general legal conclusion.

## Decision

No anatomical reference is admitted.

The primary **preflight** candidate is MakeHuman because it combines:

- independent source family;
- CC0 bundled graphical assets;
- explicit left/right eye joints;
- a direct left-right head vector definition.

The next gate is deterministic rendering plus exact FaceLandmarker detectability verification.

Until that succeeds:

- anatomical reference admitted: false
- anatomical laterality: false
- validated external-ear observation: false
- traditional binding: false
- Production: false

Watchtower-Track: face-observation-engine
