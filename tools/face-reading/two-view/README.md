# Local two-view job and frontal metric preview

Issue: #2452. Watchtower-Track: face-observation-engine.

This implements P0/P1 of the two-view design. Users can select a frontal and a
profile image, execute the supported jobs together, cancel work, and inspect
every existing local engineering capture in one batch. The profile slot is
managed, but profile measurement is explicitly unavailable in this stage.

## Run

From the repository root, with locked dependencies installed and an existing
private intake/render inventory:

```powershell
node tools/face-reading/two-view/server.mjs
```

Open `http://127.0.0.1:8768/two-view`. The root page retains the existing static
all-region viewer. The server binds only to loopback and verifies Host; saving
local numeric candidates also requires the same Origin and an ephemeral token.
It accepts no source paths over HTTP. Original files are read only from the
previous private inventory. Uploaded photos remain browser File/ImageBitmap
handles; they are not uploaded or copied by this feature.

The private prerequisites are under the already ignored
`.cache/face-reading/fr2337-intake`: inventory, existing combined render pointer,
legacy static viewer assets, and the pinned Face Landmarker model. Source
mappings, user photos and overlays are not repository fixtures. The model byte
hash is checked against the existing pinned asset; no source-image hash is
created. No model or dependency is downloaded automatically.

The owning browser executes model inference in a classic worker. MediaPipe
0.10.35's WASM loader calls `importScripts`; a module worker cannot execute that
loader. ESM provider/calculator modules are dynamically imported inside the
classic worker. A 30-second task deadline aborts owned worker work and reaches a
terminal failure state; the next capture can still execute. This is a runtime
deadline, not an accuracy or pose threshold.

## Measurements

`frontal-metrics.mjs` issues eight **image-plane model geometry candidates**:

| Candidate               | Definition                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Eye aperture ratio      | Mean of each closed eye cycle's Y span / X span                                                                   |
| Eye span ratio          | Mean eye X span / model oval X span                                                                               |
| Eye spacing ratio       | Distance between eye-cycle vertex centroids / model oval X span                                                   |
| Eye span difference     | Absolute eye X-span difference / mean eye X span                                                                  |
| Eye aperture difference | Absolute difference between the two eye span ratios                                                               |
| Mouth span ratio        | Combined unordered lip-component X envelope / model oval X span                                                   |
| Oval aspect ratio       | Model oval Y span / X span                                                                                        |
| Lower oval band ratio   | Two oval intersections halfway between the mouth-set centroid and oval inferior extent, normalized by oval X span |

Coordinates are decoded-image pixels projected onto a pair-relative eye axis.
The axis is a defined geometric reference, not a camera correction or an
anatomical coordinate system. Values preserve translation, uniform scale,
upright-image rotation and eye-pair/reflection invariants covered by tests.
They do not remove perspective, yaw/pitch, expression or occlusion effects.
The batch's frontal role is a requested engineering input role, not automatic
pose admission.

Disconnected lips cycles stay unordered. The combined envelope does not assign
outer/inner lip roles, visible upper/lower bands or thickness. Model oval width
is not forehead width, bone width or a verified skin outline. The lower-band
intersection is a defined interpolation on the model oval, not completion of a
hidden subject boundary. Eyebrow curves can be drawn, but no brow semantic
measurement is issued in this stage.

Malformed topology, collapsed references and clipped relevant boundaries return
unavailable or reject the input. Per-feature dependencies preserve independent
eye values when only the mouth boundary is clipped. Face count/landmark shape
checks reject missing/ambiguous provider output; they do not establish accuracy.

## Source and authority boundary

The namespace is `engineering.frontal.*`, method version
`frontal-image-plane-model-geometry@0.1.0`. These values are not the existing
canonical metric-frame FR293 features. No Product receipt is issued or changed.
The canonical FR77/FR79 same-runtime issuance, source identity and explicit
semantic-input requirements are preserved. No dummy image digest, casted
authority object, provider-index semantic shortcut or profile-to-relative-3D
replacement is used.

Hairline 0.4.0 thresholds/guards and prior receipt/pointer files stay unchanged.
The existing overlays are available through a clearly labelled comparison
control. A browser-local fresh inference overlay is shown during a numeric run;
numeric results survive reopening through separate private run directories.
Reopening retains the original and prior overlay comparison, without saving raw
landmarks or reconstructing them from PNGs. Profile contour, parsing, forehead,
ear, nose semantic measurements and official admission are later stages.

Safe local persistence rebuilds allowlisted numeric rows and stores every
capture's completed/unavailable/failed outcome. It rejects incomplete batches,
capture mismatches, duplicate feature keys, version drift and non-finite values.
Source-file metadata is checked before saving; original image bytes are never
hashed or modified. New numeric runs do not overwrite prior run outputs or the
old rendered artifacts. Logs contain only bounded startup/error codes.

## Verification

```powershell
npx vitest run test/face-two-view-preview.test.ts
npx eslint tools/face-reading/two-view test/face-two-view-preview.test.ts
npx prettier --check tools/face-reading/two-view test/face-two-view-preview.test.ts
```

Unit coverage includes scale/translation/rotation/reflection invariants, pixel
aspect, unordered lips, malformed/collapsed/cropped input, safe persistence,
all-capture scheduling, failure isolation, deadlines, cancellation and late
generation rejection. Real-photo/browser checks run privately with the user's
existing files. Only aggregate operational results can be recorded publicly;
rendering/measurement execution is not human visual acceptance or formal fresh
validation.

## Architecture Check

- Docs updated: yes, local engine entry point and coordinate/authority contracts.
- Ghost-code risk: new CLI → loopback server → UI → worker → calculator has direct
  unit and private browser verification. Product receipt consumers are untouched.
- Notes: an engineering metric namespace and eye-pair-relative image-plane frame
  are explicitly introduced because the existing canonical frame has different
  inputs/authority. No public API/DB, anatomical laterality, implicit
  normalization fallback or legacy Product branch is added.
