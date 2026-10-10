# Local two-view job and frontal metric preview

Issues: #2452 (P0/P1), #2454 (P2), #2457 (additional captures). Watchtower-Track: face-observation-engine.

This implements P0/P1 and the P2 parsing comparison of the two-view design. Users can select a frontal and a
profile image, execute the supported jobs together, cancel work, and inspect
every existing local engineering capture in one batch. The profile slot is
managed and parsed, but profile metric measurement is explicitly unavailable in this stage.

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
legacy static viewer assets, and the pinned Face Landmarker model. The optional
parser asset is described below. Source
mappings, user photos and overlays are not repository fixtures. The model byte
hash is checked against the existing pinned asset; no source-image hash is
created. No model or dependency is downloaded automatically.

An optional ignored `additional-inventory.json` accepts separately supplied local
captures with unique opaque `recordId`, private `sourcePath` and an explicit
existing `viewRole` (`frontal` or `profile`). This is engineering input routing,
not automatic pose admission or freshness/independence attestation. The original
inventory and its capture order remain unchanged; additions appear after it.
Original files are read from their supplied locations, never copied. Invalid
additional inventory fails startup rather than silently dropping captures.

A complete saved base batch can be restored while additions are pending. Unknown,
duplicate or arbitrarily partial saved batches remain invalid. The batch action
executes pending captures first, then saves the complete combined batch, reusing
previous numerical rows and validated mask bytes without repeating base inference.
New run directories preserve previous outputs. Explicit profile entries persist
empty frontal metric rows and continue to receive parser candidates. Photo counts
follow the inventory instead of assuming 18. A fully completed batch can still be
rerun by the existing batch action.

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
landmarks or reconstructing them from PNGs. Profile contour, validated forehead,
ear, nose semantic measurements and official admission are later stages. P2
parsing masks are separate candidates, not those validated semantic measurements.

## P2 parsing provider and local outputs

The parser is pinned to [yakhyo/face-parsing](https://github.com/yakhyo/face-parsing)
source revision `8a4729d95118d0e97c44185f9bdef3d6bfeaaf99`, release
[`v0.0.2/resnet18.onnx`](https://github.com/yakhyo/face-parsing/releases/tag/v0.0.2),
SHA-256 `0d9bd318e46987c3bdbfacae9e2c0f461cae1c6ac6ea6d43bbe541a91727e33f`.
Its static model checksum is not a user-image digest. Place the manually acquired
asset at `.cache/face-reading/fr2337-intake/assets/parsing-resnet18-v0.0.2.onnx`.
No automatic model download is performed. An unavailable/mismatched asset disables
only the parser; frontal numerical measurement remains usable.

ONNX Runtime Web is locked at `1.23.2`, served from the local installed dependency,
with CPU WASM, one thread and a dedicated module worker. The author's preprocessing
is RGB, full-image 512×512 bilinear stretch, channel-major float32 and ImageNet
mean `[0.485, 0.456, 0.406]` / std `[0.229, 0.224, 0.225]`. The first of three model
outputs must have shape `[1,19,512,512]`; non-finite logits or shape drift fail.
The exact provider label order is in `parsing-contract.mjs`. Ear labels 7/8 are
combined for display, while jewellery/accessory label 9 is excluded. Provider
l/r labels are not anatomical left/right authority.

The inverse display transform stretches the square mask back to the decoded
original aspect within the same object-fit viewport. This is a mask display
transform, not a perspective/pose correction or a source-file modification.
The base image fills that viewport absolutely; its intrinsic image height must
not enlarge a grid track and move the image centre away from the mask centre.
Browser alignment checks cover position as well as extent across photo changes,
reload and narrow/wide viewports. This display correction does not rerun inference
or alter saved masks, method versions, original assets or numerical results.
Skin includes more than forehead. Hair includes fringe and external hair extent.
Red pixels are skin pixels with a direct four-neighbour hair neighbour; no gaps
are bridged, missing hairlines completed, or resulting forehead scalar issued.
No hair class means model non-detection, not a baldness finding. Ear class pixels
mean model candidates, not verified visibility or whole-ear geometry. Segmentation
success and class counts are execution evidence, not accepted accuracy.

The author publishes a [MIT code license](https://github.com/yakhyo/face-parsing/blob/8a4729d95118d0e97c44185f9bdef3d6bfeaaf99/LICENSE)
and describes training on CelebAMask-HQ. This work uses the weights for local
engineering comparison only. Code license is not treated as independent evidence
of commercial clearance for weights/training data; Product/Production adoption is
not granted here. No training dataset or upstream user-face image is downloaded.

Both supported frontal and profile input roles are parsed. Frontal and parser
jobs have separate 30/60-second deadlines and failure states, so a parser failure
preserves frontal metrics, and a frontal failure preserves parser candidates.
The per-capture scheduler has a 95-second outer deadline. Failed parser workers
are terminated before retry; cancellation owns only this page's workers. Source
photos are decoded in browser memory and never posted to the server.

Seven transparent label masks per engineering capture can be saved locally to
new ignored `parsing-runs/<opaque-run>/` directories. The same-origin token route
requires the complete allowlisted batch and version, validates bounded summaries,
PNG dimensions/CRC/filter data and group-specific opaque label colours with
zero-colour transparent background. It rejects source-colour pixels, unknown
layers and text/metadata chunks. Source file metadata is rechecked before save;
old mask directories and original assets are not overwritten. Masks contain only
classification colours, not original RGB, landmarks or reconstructed geometry.
Only the latest active run's allowlisted masks can be fetched. Numeric runs and
canonical/old review receipts remain separate. Uploaded-image candidates stay
in this page and are not persisted by the existing engineering batch route.
The active mask pointer is replaced atomically only after all masks and summaries
are written. Invalid optional parser restoration is reported independently and
does not prevent the original/numeric viewer from starting.

Safe local persistence rebuilds allowlisted numeric rows and stores every
capture's completed/unavailable/failed outcome. It rejects incomplete batches,
capture mismatches, duplicate feature keys, version drift and non-finite values.
Source-file metadata is checked before saving; original image bytes are never
hashed or modified. New numeric runs do not overwrite prior run outputs or the
old rendered artifacts. Logs contain only bounded startup/error codes.

## Verification

```powershell
npx vitest run test/face-two-view-preview.test.ts
npx vitest run test/face-parsing-preview.test.ts
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

P2 direct tests cover exact labels/RGB tensor layout, output shape and non-finite
drift, direct contacts/no wrap or hidden completion, bounded summaries, complete
batch identity, failed-capture isolation and mask privacy/CRC rejection. Private
browser verification runs all 18 and checks all 126 saved layers, original toggle,
region toggle, reload, profile parser, cancellation, parser failure with retained
frontal metrics and retry. Aggregate evidence is recorded in the PR; no user
photos/masks are test fixtures or Actions artifacts.

## Architecture Check

- Docs updated: yes, local engine entry point and coordinate/authority contracts.
- Ghost-code risk: new CLI → loopback server → UI → worker → calculator has direct
  unit and private browser verification. Product receipt consumers are untouched.
- Notes: an engineering metric namespace and eye-pair-relative image-plane frame
  are explicitly introduced because the existing canonical frame has different
  inputs/authority. No public API/DB, anatomical laterality, implicit
  normalization fallback or legacy Product branch is added.
  P2 additionally pins the browser ONNX runtime and parsing method, with an
  independent ignored mask store and explicit restore/failure state. These are
  local engineering routes; Product contracts and Production dependencies are
  unchanged. Segmentation labels are not alias-normalized into canonical inputs.
