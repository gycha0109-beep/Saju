# Local two-view job and visible metric preview

Issues: #2452 (P0/P1), #2454 (P2), #2457 (additional captures), #2605 (face-local experiment), #2606 (full-frame preservation), #2607 (instance routing), #2608 (region screening/profile ratios), #2698 (source-linked eye observation), #2729 (multi-region morphology assessment), #2743 (explicitly fictional experience). Watchtower-Track: face-observation-engine.

This implements P0/P1 and the P2 parsing comparison of the two-view design. Users can select a frontal and a
profile image, execute the supported jobs together, cancel work, and inspect
every existing local engineering capture in one batch. The profile slot is
managed and parsed, with separate engineering visible-class ratios for profile slots.

## Run

### Fictional entertainment flow

The experience can run without the private photo inventory or model assets:

```powershell
node tools/face-reading/two-view/experience-server.mjs
```

Open `http://127.0.0.1:8769/two-view/experience`. This static-only server binds
to loopback, verifies Host, accepts GET only, serves an exact asset allowlist
and has no photo/model/data dependency. Both servers reuse `experienceAssets()`;
there is no duplicate route definition. This separation was required after the
old private review server failed startup with a missing local prerequisite.
Its privacy/pin/inventory guards were preserved rather than relaxed. Existing
full review runtime restoration must be checked separately when those private
prerequisites are available.

`/two-view/experience` is a separate, explicitly fictional prototype: select a
topic and story direction → build authored scenario → show a title, composite
narrative and two story scenes. `experience.mjs` accepts exactly `topic` and
`direction`; photo/metric/identity fields and unknown selections reject. Nine
curated scenarios are authored fiction, not attributed to traditional source
rules, model analysis or future events. The disclosure appears before input
and inside the result. No invented analysis progress or inference animation is
shown. This experience is not a completed personal physiognomy reading.

The optional photograph is a browser-only object URL preview, explicitly
unrelated to the result. It never enters the builder, server, model, network
payload, source catalogue, saved observation batch or storage. Page exit,
replacement, removal and decode error revoke the URL. CSP blocks connection
requests from this page. No API key, paid API, payment flow, database or
authority change is added. Existing observation routes, masks, schemas and
source-rule flags remain unchanged. New topic/direction selections are only
local fiction inputs, not canonical semantic categories or aliases.

The end-to-end story is form input → pure selection-only builder → DOM result.
The server serves static assets only for this new route. There is no result
API or persistence path. Verification must cover all nine combinations,
clear result provenance, photo independence, invalid-image recovery/reset,
responsive rendering, and zero upload/storage requests. The original
observation page links to the experience without merging either data path.

Local verification for #2743: 14 targeted tests, TypeScript, scoped ESLint,
Prettier and diff checks passed. The actual standalone browser flow rendered
all nine scenarios at three widths (27 result views), with zero page errors.
Photo replacement/removal, decode/type rejection, reset/reload, selection
invalidation and photo-independent results passed. Browser storage stayed
empty; no upload, model or result API requests occurred. Host/method/asset/
malformed-URL guards returned 403/405/404/400 respectively. The full private
review integration is **IMPLEMENTED_UNVERIFIED** because its existing startup
returned `ENOENT`; its private prerequisite checks were not bypassed. This does
not affect the independently verified static experience.

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

In these original eight values, disconnected lips cycles stay unordered. The combined envelope does not assign
outer/inner lip roles, visible upper/lower bands or thickness. Model oval width
is not forehead width, bone width or a verified skin outline. The lower-band
intersection is a defined interpolation on the model oval, not completion of a
hidden subject boundary. Eyebrow curves can be drawn, but no brow semantic
measurement is issued by this original calculator. Revision 0.7's separate
visible-morphology observation below adds paired brow spans and a lip section.

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
landmarks or reconstructing them from PNGs. Anatomical profile contour, validated forehead,
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
with CPU WASM, one thread and a dedicated owned classic worker. Dynamic ESM
imports allow this worker to share the pinned MediaPipe localization loader's
`importScripts` requirement. The author's baseline preprocessing
is RGB, full-image 512×512 bilinear stretch, channel-major float32 and ImageNet
mean `[0.485, 0.456, 0.406]` / std `[0.229, 0.224, 0.225]`. The first of three model
outputs must have shape `[1,19,512,512]`; non-finite logits or shape drift fail.
The exact provider label order is in `parsing-contract.mjs`. Ear labels 7/8 are
combined for display, while jewellery/accessory label 9 is excluded. Provider
l/r labels are not anatomical left/right authority.

Revision `engineering.face-parsing.yakhyo-resnet18@0.3.0` always executes the full-image
baseline. Hair, skin, brows, lips, nose and hair-skin contact use only that full
frame. A second face-local pass can replace only the ear display layer. Its
localization/frame/agreement failures leave all baseline layers available; they
do not suppress a photo or turn unseen areas into background in non-ear layers.
These are still model candidates, not accepted accuracy or whole-ear visibility.

Revision `@0.2.0` is rejected historical experiment evidence. It replaced every
layer with a small face crop and suppressed whole captures on localization
failure. Actual user review exposed rectangular hair truncation and lost results;
registration/execution tests had not caught that regression. Revision 0.3 restores
the original full-frame source of truth, without tuning the crop parameters.

Only the optional ear-refinement input is a square centred on the decoded-pixel model-point envelope, with
side `1.6 * max(envelope width, envelope height)`. Padding outside the original is
neutral RGB 128; it is never rendered as observed source geometry. Eye and lip
topology anchors independently require matching class pixels within radius 12 in
the 512 crop for at least 25% of each combined anchor set. Otherwise the result is
unavailable for refinement. Connected ear-label components smaller than 64 crop pixels are
removed; jewellery label 9 never counts as an ear. These fixed engineering
screening heuristics are not calibrated accuracy, anatomical visibility, whole-ear
coverage, canonical admission thresholds, or changes to frozen hairline 0.4.0.
No parameter search was performed on the reported photos.

Categorical nearest sampling projects the refined ears into the original-image
display frame. The full-frame `counts` and `interfacePixels` retain their original
baseline meaning and match revision 0.1; they are not totals from the refined ear
layer. A separate `earRefinement` records applied/unavailable, the projected ear
pixel count, and either agreement checks or a bounded reason. An applied ear
layer may overlap another baseline class, so it must never be interpreted as a
new mutually exclusive 19-class anatomical segmentation. The UI makes refinement
availability explicit and never calls a few baseline ear pixels recognition.
Source coordinates, transforms and landmarks stay inside the worker. No source
file is cropped, copied or modified.

The previous full-image method `@0.1.0` is read-only comparison evidence. Both
0.1 and rejected 0.2 remain readable without relabelling their methods. The 0.1
summary is not relabelled as the new method, and writers reject legacy summaries.
The first new run preserves the validated legacy pointer in `previous.json`;
only validated current/previous run IDs can serve masks. The comparison control
is labelled as the earlier full-image result. Refinement-unavailable captures
keep baseline masks; the failed refinement is not silently presented as applied.
Existing numerical rows are reused when their metric
method matches; rerunning the parser does not retune or recompute those metrics.

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

Both supported frontal and profile roles receive full-frame parsing. The
optional ear pass requires single-face localization and agreement. Frontal and parser
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
Only the validated current and read-only previous run's allowlisted masks can be fetched. Numeric runs and
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
npx vitest run test/face-parsing-frame.test.ts
npx vitest run test/face-parsing-instance.test.ts
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

Refinement tests cover square decoded-pixel frames, categorical inverse projection,
anchor disagreement, connected ear fragments, strict method-specific summaries and
legacy isolation. Regression acceptance additionally compares all six non-ear mask
layers and full-frame class counts to the preserved revision 0.1 output for every
one of the 23 captures. This catches the actual truncation/whole-capture regression
instead of only testing registration or execution. Anatomical accuracy still needs
actual human review; a larger ear mask is not by itself acceptance. The previously
unlocalized profile's inaccurate baseline was unresolved in revision 0.3.

## Revision 0.4: bounded instance candidates

Historical instance-only method is `engineering.face-parsing.yakhyo-resnet18@0.4.0`.
The baseline and optional ear pass stay unchanged. Only `MULTIPLE_FACES` or
`NO_SINGLE_FACE` from that pass enable a further detector. All other captures
must retain byte-identical seven-layer output from 0.3. Historical 0.1/0.2/0.3
summaries remain readable under their original versions; current writers reject
them. Baseline `counts` and `interfacePixels` still describe the full-image pass.

The optional [OpenCV Zoo YuNet model](https://github.com/opencv/opencv_zoo/tree/f12e12798e8314f7c074a6656816c048dcc95b7a/models/face_detection_yunet)
is pinned to commit `f12e12798e8314f7c074a6656816c048dcc95b7a`, asset
`face_detection_yunet_2023mar.onnx`, SHA-256
`8f2383e4dd3cfbb4553ea8718107fc0423210dc964f9f4280604804ed2552fa4`.
Place it at the existing ignored intake's `assets/yunet-2023mar.onnx`; a missing
or mismatched optional asset leaves all baseline layers available. Its
[MIT license](https://github.com/opencv/opencv_zoo/blob/f12e12798e8314f7c074a6656816c048dcc95b7a/models/face_detection_yunet/LICENSE)
applies to the upstream model. No new dependency, recognition/identity model,
automatic download, training dataset or source-image copy is introduced.

The exact ONNX input is `[1,3,640,640]`, raw BGR 0–255 with aspect-preserving
resize and bottom/right black padding. Decode strides 8/16/32 and five points;
score is the square root of clamped class/object confidence product. The pinned
Python wrapper's default score 0.6, NMS 0.3 and top-5000 candidates are fixed.
NMS uses float-box IoU, so no byte-equivalence to OpenCV integer-box NMS is claimed.
Padding-centred boxes are discarded; a fifth retained face stops refinement.
The initial diagnostic used the CLI's 0.9 default and missed the profile; changing
to the wrapper's 0.6 is recorded diagnostic history, not a calibrated accuracy claim.

Each instance uses the SAME ResNet18 parser in a square context of twice its box's
maximum extent. Its eye-midpoint to mouth-midpoint direction defines an upright
input rotation, not anatomical pose correction. Source-exterior padding is RGB128.
Nose-class support near the detector nose (radius 24/512) is required to route
that instance. Lip-class support near the mouth midpoint is screened separately.
An unsupported lip label cannot replace baseline labels; the UI reports partial
lip checks. This replaced the initial all-or-nothing NEW-stage policy after the
profile's isolated lip disagreement. Existing 0.3 ear checks are not weakened.
Neither check validates hair, skin, ears, hidden contours or anatomical accuracy.

Class labels are inversely projected into source space with nearest sampling.
Within overlapping contexts, nearest normalized box-centre distance owns each
pixel; this is transient routing, not persistent person identity. Only positive
labels supplement/replace baseline labels, so crop background cannot truncate
full-frame hair. The result may retain incorrect baseline pixels where a crop
has no positive label; this is not a fully corrected segmentation guarantee.
`instanceRefinement` stores only not-requested/unavailable/applied, bounded reason,
face count, passed lip-check count and separate merged class/contact counts.
Boxes, points, crop transforms and source RGB remain inside the worker. Multiple
people do not receive merged scalar measurements; profiles still have no frontal
scalar rows. Frozen hairline revision 0.4.0 and canonical receipts are unchanged.

Private diagnostics also evaluated the author's ResNet34 alternative once; its
browser crashed and it is not integrated. No per-image threshold search is used.
Verification covers strict outputs/padding, duplicate NMS/dense sentinel,
inverse rotation, independent feature checks, background preservation, lip-label
suppression, method-specific persistence, real runtime failure/retry and unchanged
non-triggered layers. Operational checks do not establish human visual acceptance.

## Revision 0.5: region screening and visible profile ratios

Historical screened method is `engineering.face-parsing.yakhyo-resnet18@0.5.0`.
Versions 0.1–0.4 remain readable under their original schemas. This request
intentionally changes screened face-part masks, while baseline counts, frontal
scalar rows, previous mask directories and the frozen hairline candidate remain
unchanged. Hair is never removed by background/component screening. Pixelwise
regression checks require all prior hair foreground to remain; changed groups
are reported explicitly rather than calling a changed mask unchanged.

For instance routing, the existing twice-box context receives one fixed
three-times-box context witness with the same upright rotation. Only where BOTH
raw parses classify background, inside the detector box and inside original
image support away from crop/source borders, may a baseline face-part label be
cleared. Hair/hat/clothing/neck/accessory labels are excluded from this deletion.
The two scales use the same model and are not independent accuracy evidence.
This extra pass is not enabled on otherwise non-triggered captures. In the current
private 23-capture run it removed zero pixels; synthetic fixtures establish its
bounded behavior, not demonstrated correction of a real background error.

`region-quality.mjs` screens connected nose/lip/brow components against available
anchors. Single-face MediaPipe uses its named lip/brow topology and eye/lip face
seeds, with the existing radius 12 in its crop. The pinned JS provider exports no
named nose topology; no nose landmark index is invented, so its nose remains
unchecked. YuNet uses explicit nose, mouth midpoint and eye-adjacent brow anchors,
radius 24 in its crop. Source projection retains that circular support as an
ellipse in the stretched full-frame mask. These uncalibrated rules may also
reject a true but poorly aligned feature; screened never means accepted accuracy.

Skin components must connect to a face component supported by those face seeds.
When no face component reaches a seed, skin remains unchecked and is retained.
Ear adjacency uses 12 four-neighbour full-mask steps to the retained face. Distant
ear fragments are removed only when another adjacent ear component survives;
otherwise the whole candidate remains unchecked. The refined ear overlay owns
its ear pixels: baseline ear pixels cannot be reintroduced or manufacture a
corroborating component. The first private screen erased a previously usable
ear and was rejected; that run remains preserved as diagnostic history.
This adjacency test does not establish whole-ear visibility, distinguish every
earring, or verify anatomy. Missing anchors leave a group unchecked. A
failed group is withheld independently, never by suppressing an entire photo.
Crop-screened instances are projected before merging; a final full-frame screen
also removes unsupported old fragments. The optional ear overlay is screened
against the current face before display. Original `earRefinement` counts/checks
remain pre-screen pass evidence, not a claim that every ear pixel is displayed.

Current completed summaries require allowlisted `regionScreening` statuses and
removed-pixel counts (five groups plus bounded background removals) and `profile`.
Region counts describe final full-frame screening and the separate ear-overlay
screen, not every intermediate crop rejection. Existing `counts`/`interfacePixels`
still describe the original full-image pass; `instanceRefinement` counts describe
the merge before final screening. Raw coordinates, context frames, source RGB and
reconstructed contour arrays are not stored. Profile output is bound to the
server inventory's view role on both save and restore, independently of browser
role strings. The inventory role map explicitly includes the original frontal
captures and all declared additions; there is no implicit absent-role bypass.
An injected wrong-role save exposed that omission during verification; the test
run is preserved separately, the known valid active run was restored, and both
directions of role mismatch now reject without changing the active pointer.
Historical method readers do not receive new profile values.

`engineering.profile.visible-class-extents@0.1.0` computes four engineering ratios
on uniform-scale square crops after component screening:

| Candidate            | Formula                                          |
| -------------------- | ------------------------------------------------ |
| Visible face aspect  | Face-class union Y span / X span                 |
| Nose region width    | Nose-class X span / face-class union Y span      |
| Lip region width     | Lip-class X span / face-class union Y span       |
| Ear candidate height | Ear-class union Y span / face-class union Y span |

Spans include occupied pixels (`max-min+1`). Face classes are skin, brows, eyes,
nose, mouth and lips; hair, ears, glasses, neck and clothing are excluded from
that reference. A MediaPipe reference requires existing eye/lip agreement; a
YuNet reference requires nose agreement. Lip availability is independent of
other ratios. Missing/degenerate parts, absent reference and crop/source clipping
withhold values instead of inventing a contour. Multiple detected people cannot
produce a combined profile ratio. Explicit frontal slots receive `not_requested`.
The UI labels class extents and renders unavailable reasons per card.

These are not physical nose protrusion, measured chin/forehead slope, bone shape,
3D, pose admission, or whole-ear length. Those measurements remain unimplemented;
this revision adds the bounded visible-profile measurement foundation. No new
model, dependency, authority receipt or source-image copy/upload is introduced.
Direct verification covers background corroboration/hair protection, detached
regions, multiple anchored components, partial measurements, source clipping,
role binding, historical isolation and safe scalar-only persistence.

## Architecture Check

Revision 0.6 added a source-morphology review card before the raw values. See
[READING-PLAN.md](./READING-PLAN.md) for the item-first roadmap, source owner,
formula, endpoint-role gap and actual completion criteria. Current writer method
is now `engineering.face-parsing.yakhyo-resnet18@0.7.0`; 0.1–0.6 remain read-only.
The eye direction field contains scalar ratios/angles, image-position labels,
source term identity and status only. Its shared image-pair frame preserves the
original eight frontal metrics. Existing masks/profile ratios are unchanged.
Node24 directly imports the existing source morphology term server-side; the UI
does not maintain a copied traditional meaning catalogue or apply historical
outcome rules to a supplied person. No source binding or claim flag is promoted.
The 0.5 revision section above describes that historical schema; 0.6
requires its screened/profile fields plus eye direction; 0.7 also requires
allowlisted morphology evidence. A profile input receives
`PROFILE_VIEW`; multi-face inputs cannot generate a combined eye explanation.

Revision 0.7 adds `morphology-geometry.mjs` → scalar-only private summary →
`morphology-assessment.mjs` → eight item cards. See the current contracts in
[READING-PLAN.md](./READING-PLAN.md). It preserves the full-image parser and
ear/instance/region/profile outputs. Model boundaries and class agreement supply
paired brow spans, a nested-lip central section, and the nose class's extent in
the existing shared eye frame. No new detector, package or source-image storage
is introduced. All derived card classifications are recalculated, never saved
as source-condition matches. Source imports project neutral FR311/FR311F/FR311I/
FR311L morphology/region records only; missing forehead/cheek/chin definitions
are explicit. No copied traditional outcome rules, named-form thresholds or
new canonical/semantic authority path is added.

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
  Revision 0.3 explicitly separates the primary full-frame pass from optional
  ear-only refinement and its availability. Historical 0.2 is read-only. The
  original-image display frame remains the storage frame. No source transform,
  anatomical normalization or legacy authority fallback is implied.
  Revision 0.5 adds explicit region screening, a same-model multi-scale background
  witness and a separate visible-profile scalar namespace in the private parser
  summary. Inventory role checks govern save/restore. Historical versions remain
  read-only, frontal rows stay unchanged, and no canonical normalization is added.


## 29개 정규 관측 항목 점검 (로컬·읽기 전용)

기존 얼굴 관측 엔진의 **29개 정규 항목과 18개 계산기/11개 미해결 상태**를 실제 코드에서 읽고, 이미 저장된 비공개 분석 결과가 있으면 **사진별 모델 후보가 존재하는 항목 수**만 집계할 수 있습니다.

```powershell
npm run face:coverage -- --schema-only
npm run face:coverage -- --intake .cache/face-reading/fr2337-intake
```

- 첫 명령은 정규 계산기 목록만 검사합니다. **사진 0장은 모델 정확도 0점이나 관측 가능 0개라는 의미가 아닙니다.**
- 둘째 명령은 기존 `two-view-runs` / `parsing-runs` 저장 결과의 **검증된 스칼라 요약**을 읽습니다. 기존 브라우저 분석이나 사진 추론을 다시 실행하지 않습니다.
- 정면 측정 기록과 얼굴 분할 기록은 서로 독립적으로 점검합니다. 한 종류의 저장 실행 기록만 있거나 아직 분석하지 않은 사진 목록만 있어도 전체 점검은 중단하지 않으며, `frontalMetricsSavedAndValidated`, `parsingSavedAndValidated`, `evidenceSource`에 근거 확보 상태를 표시합니다.
- 출력은 특징별 전체 후보 건수뿐입니다. **원본 이미지·경로·촬영 ID·마스크·원시 좌표·얼굴 식별자**를 출력하거나 저장하지 않습니다.
- `partial_engineering_proxy_only`는 눈꼬리 모델 극점·눈썹 가로폭·입술 중앙 단면·코 class 폭 등 **해당 정규 특징과 동일하지 않은 연구 후보**를 뜻합니다.
- `canonicalCalculatorMaterialized=true`는 계산 코드가 있다는 의미이지 **사진에서 자동 관측되어 정확도가 입증됐다는 의미가 아닙니다.** `canonicalPhotoMeasurementVerified`, `traditionalBindingApplied`, `productionAuthorized`는 항상 false입니다.
- 모델/가중치 학습권, 사용자 사진 동의, 실측 정확도, 2026-10-29 입술 수정 뒤 23장 재실행은 이 도구로 증명되지 않습니다.

실행 파일: `scripts/face-reading/whole-face-coverage.mjs`. 기존 FR293 목록을 읽고 기존 로컬 저장 검증 계약을 재사용하며, 새 모델·저장소 형식·공개 API·관상 분류기를 추가하지 않습니다.

## 눈썹 가시 영역 두께 후보 (로컬 실험, 2026-11-05)

- 기존 `yakhyo-resnet18@0.7.0`의 **눈썹 RGBA 분할 마스크**를 브라우저에서 읽고, 사진 왼쪽·오른쪽의 별도 연결 영역 두 개에서 **눈썹 마스크 면적 / 길이²**로 정의한 겉보기 띠 두께 비율을 구한다. 원본 사진의 가로·세로 크기를 반영하여 512×512 마스크 왜곡을 역보정한다.
- 이 비율은 **개별 모발의 굵기·밀도·윤곽의 진짜 수직 두께를 측정하지 않는다.** 눈썹산·눈썹꼬리·좌우 실제 해부학적 역할, 문헌 관상 형태를 확정하지 않는다. 모델 마스크 픽셀 선택에 종속된 중립 연구 후보이며, 독립 사람 정답 대비 정확도는 `not_evaluated`이다.
- 마스크 분리 실패/추가 조각/서로 붙음/이미지 경계 절단/불안정 축/측면 사진/오래된 분할 버전에서는 `unavailable` 처리한다. 경험적으로 검증되지 않은 소음 제거 임계값이나 복원된 부분 경계를 새로 만들지 않는다.
- 새 값은 **선택된 사진의 브라우저 메모리에서만 계산 및 표시**한다. 기존 8개 source 카드, 원래 관상 정규 FR293 29개, 저장된 0.1~0.7 parser summary, PNG 원본 및 저장/복원 API를 변경하지 않는다. 새 모델·훈련 데이터·라이선스 승격·Product/Production 권한도 없다.
- 코드: `visible-brow-mask-envelope.mjs`와 `review.mjs`의 별도 실험 영역. 사진별 독립 정확도/실촬영 재현성/촬영 23장 검증은 아직 미완료다.


## 눈썹 사이 모델 분할 간격 후보 (로컬 실험 확장, 2026-11-05)

- 기존 `visible-brow-mask-envelope.mjs`의 분리·경계·축 검증을 통과한 **두 눈썹 마스크 연결 영역**에서만 사진상 안쪽 클래스 경계의 가로 간격을 산출합니다. 정의: 두 영역 사이의 **비어 있는 픽셀 열 수 / 두 영역의 평균 마스크 가로폭(픽셀 열 수)**. 가로 방향 동일 좌표계이므로 원본 이미지 확대 및 512×512 마스크 표시 비율과 무관한 무차원 값입니다.
- 이것은 **마스크가 그린 두 눈썹 영역의 상대 간격 후보**입니다. 피부에서 사람이 표시한 실제 눈썹 모근/털 시작점, 미간 해부학적 너비, 눈 사이 거리, 눈썹 털 밀도나 전통 관상형을 확인한 결과가 아닙니다. 한쪽 누락·결합·조각·경계 절단이면 띠 두께와 간격 모두 보류합니다.
- 결과는 기존 브라우저 한시 메모리의 단일 실험 영역에만 표시합니다. FR282/FR293의 29개 정규 키, 18/11 상태, 0.1~0.7 원래 parsing summary, 기존 8개 소스 카드, 저장/복원 및 전통 의미 권한을 변경하지 않습니다. 23장 최신 재실행·사람 안쪽 경계 정답 대비 오차/재현성은 `not_evaluated`입니다.

## 29개 관측 항목의 코드·사진·판독 연결 추적 (2026-11-05)

기존 `npm run face:coverage -- --schema-only` 및 비공개 `--intake` 명령의 JSON에
`sourceTrace`를 추가합니다. FR293의 실제 29개 키·계산 상태와 FR282의 관측 분류·가시성 요구를
**실행 시 교차 검증**한 뒤, 항목별 소스 경로, 원래 필요한 추출기, 현재 사진 후보 건수와
다음에 빠진 근거를 표시합니다. 정규 키·계산기·촬영 규격을 새로 정의하지 않습니다.

- `calculation_only`: 코드의 계산기만 존재하며 실제 사진→정규 관측 입력 연결은 확인되지 않았습니다.
- `candidate_only`: 기존 분석 기록에서 좁은 범위의 모델 수치 후보가 발견됐습니다. 해당 정규
  관측이 사진에서 정확히 추출되었다는 증거는 **아닙니다**.
- `not_observed`: 현재 자료에서 해당 항목에 연결된 검증 가능한 사진 후보를 확인하지 못했습니다.
- `unavailable`: 현 RGB 계약상 관측 근거가 없어 보류되어야 합니다.

각 행의 `traditionalSourcePredicateMapped=false`는 전통 원문이 전혀 없다는 뜻이 아니라
**그 원문의 구체적인 형태 조건을 해당 사진 정규 특징에 검증해 결속하지 않았음**을 뜻합니다.
문헌 출처 검토·실사진 사람 정답·입체 참조·23장 최신 재실행은 별도 남은 작업입니다.
출력에는 정규 소스의 상대 경로와 사진 후보 **건수만** 포함하며 사진 파일명·캡처 ID·원시
점·마스크·이미지 또는 얼굴 특징값을 노출하지 않습니다. 이 추적은 로드맵 1~2단계의
누락 진단 수단이며 1단계 전체 완료/전통 판독 허용을 뜻하지 않습니다.

## 세부 관상 관측 요구 18개 추적 (2026-11-05)

동일한 점검 JSON의 `extensionRequirements`에는 기존
`research/face-reading/whole-face-feature-mapping-20261105.md`의 **3절과 부록 C의
18개 요구를 문서에서 직접 읽어 서로 대조한 결과**가 포함됩니다. 새 정규 featureKey를
도입하지 않습니다. 기존 29개 키에 대한 연결 후보, 적용 검토 기술, 빠진 실제 관측 증거와
독립 사람 정답 요구가 함께 표시됩니다. 두 표의 요구명·순서·개수가 달라지거나 정규 키
집합이 바뀌면 조용히 잘못된 보고서를 만들지 않고 실행을 중단합니다.

`extension_candidate_not_admitted`는 기술 선정/정확도/전통 형태/제품 적용이 미승인임을
의미합니다. 모든 항목의 정확도는 독립 평가 전 `not_evaluated`입니다.

## 눈썹 분할 중앙선의 위·아래 굽음·기울기 후보 (2026-11-05)

기존 브라우저 내 눈썹 분할 마스크의 **두 개 연결 영역**을 검증한 후 각 이미지 X열의
마스크 중심 Y를 계산합니다. 양쪽 끝 열의 중심을 잇는 직선에 대한 중앙선의
최대 위쪽/아래쪽 벗어남과 위치, 양 끝 사이 기울기를 원본 RGB 이미지의
가로·세로 비율로 보정해 표시합니다. 단순히 마스크가 크다는 것을 눈썹산으로
해석하지 않으며, 양쪽 사진 위치는 **해부학적 좌우나 눈썹 머리/꼬리 역할이 아닙니다**.

- 영역이 끊김·합쳐짐·사진 경계 절단·주축 불안정/미관측 상태면 전부 보류.
- 측정은 모델 분할 마스크의 **평면 중앙선**에 한정되며 실제 털·모근·눈썹산,
  전통적인 눈썹 형태 분류, 사람 정답 검증 또는 FR293 승격이 아님.
- 모든 결과는 기존 로컬 검토 화면의 메모리에서만 사용하고 저장·전송하지 않음.
  기존 파서 0.7 요약과 얼굴 전체 29개 정규 측정·출처 카드·전통 권한 불변.
- 테스트는 합성 곡선/직선/기울기·원본 비율 보정만 확인. 23장 재실행과
  사람 수동 경계 대비 오차, 얼굴 회전과 실제 촬영 반복성은 미완료.
