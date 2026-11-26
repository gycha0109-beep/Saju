# FR176 — Daruma Eye Morphology Source Review

## Status

`SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION`

FR176 reviews the next morphology-bearing Eye source candidate after FR175. It does not create a morphology classifier, threshold, score, rank, calibration, production semantic rule, or new neutral observation primitive.

Issue: `#563`

Fresh-main base at issue creation:

`8e6f947b07ae67c78d55aae41d685ad9fe730f34`

## Authority lineage

FR176 reuses exactly one existing lineage:

```text
work.shenxiang_quanbian
→ witness.shenxiang_quanbian.nlc_1925
→ 文明書局 民國十四年本 — NLC scan
→ 國家圖書館
→ https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf
```

Pinned source facts already governed by repository authority:

```text
publication year: 1925
PDF page count: 576
PDF SHA-256:
sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af
```

No second work or witness is admitted as semantic authority.

## Selected section and evidence mode

Section coordinate:

```text
卷三 / 達摩相眼
```

The Commons table of contents exposes the section as `達摩相眼`. Direct indexed extraction from the selected NLC PDF exposes the heading as `達磨相眼`; FR176 treats that difference as scan/OCR evidence, not as a different source identity.

The selected PDF's indexed text directly exposes these morphology-bearing clauses clearly enough to review conservatively:

```text
秀而正
細而長
目大而光
目有三角
目長一寸
目尾相垂
```

The surrounding indexed extraction contains OCR corruption. Therefore FR176 deliberately does **not** normalize or reconstruct a full authoritative passage by borrowing wording from another edition or modern transcription.

```text
direct selected-witness clauses reviewed = YES
full normalized passage claimed           = NO
exact scan page visually pinned           = NO
scan_checked passage promotion             = NO
secondary transcription used as authority = NO
```

Corroborative transcriptions were consulted only to understand section continuity and to detect obvious OCR breakage. They are not admitted into the authority chain and are not used to repair the selected NLC witness silently.

## Current FR158 neutral observation authority

FR158 exposes exactly four research-only role-invariant metrics over two 16-point eye cycles:

```text
neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0
neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0
neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0
neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0
```

Important constraints:

```text
coordinate frame                  = canonical_aligned_right_handed_metric_3d
aggregation                       = role-invariant over two eye cycles
anatomical laterality             = unresolved
individual-eye asymmetry output   = not authorized
eye aperture / height             = absent
eye aspect ratio                  = absent
categorical eye-shape classifier  = absent
eye-tail orientation metric       = absent
ocular radiance metric            = absent
traditional unit conversion       = absent
traditional threshold/calibration = absent
```

The mean turning-angle metric is only a neutral scalar summary of closed-cycle geometry. It is not a categorical triangle/square detector.

## Clause review

### `秀而正`

Classification:

```text
compound appearance-quality + form
```

Current binding:

```text
NOT DIRECTLY REPRESENTABLE
```

`秀` and `正` are joined in one source criterion. FR158 has no source-authorized operationalization for `秀`, and it has no reviewed rule that maps the neutral metric surface to `正`. Dropping `秀` and binding only a developer-chosen notion of form would decompose the source semantics.

### `細而長`

Classification:

```text
compound thin + long static morphology
```

Current binding:

```text
NOT DIRECTLY REPRESENTABLE
```

FR158 exposes mean cycle X span, but it does not expose governed aperture/height or aspect ratio. `細` cannot therefore be represented faithfully. Binding only `長` to X span would repeat the forbidden selective decomposition identified in FR175.

### `目大而光`

Classification:

```text
compound size + radiance
```

Current binding:

```text
NOT DIRECTLY REPRESENTABLE
```

`光` is outside the static geometry authority. Treating only the size-like part as the traditional criterion would again split a compound source statement without authority.

### `目有三角`

Classification:

```text
categorical eye shape: triangular
```

Current binding:

```text
NOT DIRECTLY REPRESENTABLE
```

The FR158 mean closed-cycle absolute turning angle is a neutral scalar and does not classify a contour as triangular. No direct source rule, geometric classifier, or threshold maps the scalar to `三角`. A developer-created threshold would be a new methodology rule, not a source binding.

### `目長一寸`

Classification:

```text
longitudinal extent with explicit traditional unit
```

Current binding:

```text
NOT DIRECTLY REPRESENTABLE
```

FR158's X span is normalized by full 468-landmark mesh X span. The source phrase uses `寸`. There is no governed authority that converts traditional `寸` into the canonical metric-geometry ratio. No conversion may be inferred from participant values or modern anthropometry.

### `目尾相垂`

Classification:

```text
eye-tail orientation / droop
```

Current binding:

```text
NOT DIRECTLY REPRESENTABLE
```

FR158 does not expose a reviewed eye-tail endpoint, orientation vector, or tail angle metric. Mean perimeter or turning angle cannot be repurposed as an eye-tail orientation authority.

## FR176 verdict

```text
SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION
```

This remains verdict C rather than `DIRECT_SOURCE_BINDING_CANDIDATE` because:

- source identity is resolved;
- several morphology-bearing clauses are directly visible in the selected NLC witness's indexed text;
- but every reviewed candidate requires either a missing observation dimension, a categorical classifier, a traditional-unit conversion, or selective decomposition of a compound source clause;
- the exact scan page and a scan-checked full passage are still unresolved.

No current clause can be promoted faithfully to a production semantic rule.

## Fail-closed prohibitions

FR176 explicitly forbids:

```text
細而長 → keep only 長 → X-span threshold
目有三角 → mean turning angle → triangle threshold
目長一寸 → invent 寸-to-normalized-ratio conversion
目大而光 → drop 光 → size-only semantic rule
目尾相垂 → repurpose perimeter/turning angle as tail angle
```

These are implementation-derived semantics, not source-derived authority.

## Privacy and provenance

FR176 uses no participant material.

```text
raw participant image             = NO
provider response                 = NO
landmark set                      = NO
participant metric values         = NO
face embedding / identity template= NO
biometric identity matching       = NO
C2PA reopened as blocker          = NO
```

## Repeated source-backed observation gap

FR175 already encountered `或細長極寸`, where the absence of eye aperture/height or aspect ratio prevented faithful binding. FR176 independently encounters `細而長` in the next dedicated Eye section and reaches the same neutral-observation gap.

This repetition is enough to justify reviewing whether a **neutral** eye aperture/aspect-ratio primitive is geometrically and architecturally admissible. It is **not** enough to authorize any traditional threshold or semantic classification.

## Authority boundary after FR176

```text
source identity resolved                         = YES
direct selected-witness morphology clauses       = YES
full normalized selected-witness passage          = NO
exact scan page visually pinned                   = NO
scan_checked passage                              = NO
current observation directly compatible           = NO
direct binding candidate count                    = 0
new neutral observation primitive issued          = NO
threshold / score / rank                          = NONE
calibration                                       = NONE
production rule                                   = NONE
structured semantic claim                         = NONE
traditional semantic authority promoted           = NO
participant-derived material used                 = NO
identity matching                                 = NO
```

## Next frontier

Review a governed **role-invariant eye aperture / aspect-ratio neutral metric feasibility** artifact using the existing FR24 eye topology plus FR77 canonical metric geometry. The next artifact must remain neutral geometry only: no `細`, `長`, fortune, personality, threshold, or traditional semantic label may be emitted merely because the source-backed observation gap exists.
