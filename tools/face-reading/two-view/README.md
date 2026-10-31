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
