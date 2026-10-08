# FR312G12 — Actual Public Release Manifest / Exact Neutral Mouth Axis Suitability

Issue #2426 · Watchtower-Track: face-research · Review: 2026-10-08 (KST)
Previously approved: FR312G11 #2424 (19 dataset families) and FR312G8/FR312G6 guards.
Requested work: investigate the **actual public file structures** of two new candidates, not re-review AST, RAP3DF or MINDS-Libras/UL-DD. No face image, mesh, participant-level dataset rows, zip bytes or biometric extractor outputs downloaded. This is inspection of source-published release metadata and filename examples only.

## 1. Verdict table

| Dataset | Confirmed released metadata | Critical *actual* technical finding | Admissible next action | FR312F/FR312G |
|---|---|---|---|---|
| **HSRD-100** | Hugging Face CC BY 4.0 dataset card; 10 people, 100 **body poses**, Wavefront OBJ LOD zipped scans, RealityCapture photos/project archives, subject/pose manifests; root reports ~**246 GB** | README default config names non-existent **`manifest/files.parquet`**, actual directory has **`files.csv`**. Representative CSV file rows show **size `0` and blank SHA256**, and published file paths conflict between `poses.jsonl` and `files.csv` for exactly the same pose | **Metadata-only candidate** for 3D pipeline; owner/file-specific rights and archive integrity/unit/face region needed before any facial extraction | **HOLD: no temporal neutral 2×2 captures, mouth contours, FR82 canonical alignment or 8 exact-axis repeat stats** |
| **FairFace** | Author's **README.md-only code repository** references external Google Drive train/val cropped-image sets, padding 0.25 and 1.25 with `dlib.get_face_chip()`, and train/val labels; CC BY 4.0 stated | No 3D geometry, metric intrinsics, original images-to-crop affine transforms, repeat participant/session identifiers, independent capture timestamps or per-axis neutral labels published in source README | **Metadata-only 2D crop/robustness candidate**; seek upstream photo-rights and original alignment information if genuine production use is later proposed | **HOLD: single-image diversity dataset, not repeated-capture variance study** |

**Neither dataset fixes FR312G's exact eight neutral mouth-axis external evidence gap.** A published licence label is not sufficient evidence of contributor-level personal rights, authorized commercial biometric interpretation or exact measurement equivalence.

## 2. HSRD-100: source-verified *specific* manifest defects

Source:
- [Hugging Face root](https://huggingface.co/datasets/digitalrealitylab/HSRD-100/tree/main): `data/`, `manifest/`, `preview/`, README, git attributes, repository ~246 GB.
- [README.md](https://huggingface.co/datasets/digitalrealitylab/HSRD-100/blob/main/README.md): CC BY 4.0, original high-resolution 3D body scans + LOD0/LOD1/LOD2 mesh ZIPs, 112-camera image sets, 10 subjects × 10 poses.
- [Live manifest directory](https://huggingface.co/datasets/digitalrealitylab/HSRD-100/tree/main/manifest): **`files.csv`, `persons.jsonl`, `poses.jsonl`**, no listed `files.parquet`.
- [Official pose manifest](https://huggingface.co/datasets/digitalrealitylab/HSRD-100/blob/main/manifest/poses.jsonl) and [official file inventory](https://huggingface.co/datasets/digitalrealitylab/HSRD-100/blob/main/manifest/files.csv). All examples below are *non-biometric release names/metadata only*.

**Defect D1: invalid dataset config.** README metadata `configs.default.data_files` is the literal string `manifest/persons.jsonl manifest/poses.jsonl manifest/files.parquet`; published directory has `files.csv` instead of `files.parquet`. The Hub viewer also reports a missing/unsupported data-file error. Consequence: automated `datasets.load_dataset` cannot be assumed to work from this config; do not fabricate a successful public dataset load.

**Defect D2: published file identity mismatch for identical pose `HSR0040-Body-004`.**

| Field | `poses.jsonl` | `files.csv` |
|---|---|---|
| original scan ZIP | `data/HSR0040/HSR0040-Body-004/scans/HSR0040-Body-004-Scan.zip` | `data/HSR0040/HSR0040-Body-004/source/HSR0040-Body-004-Scan.zip` |
| high-res LOD0 | `.../scans/HSR0040-Body-004-Scan-LOD0.zip` | `.../scans/HSR0040-Body-004-Scan-Lod0.zip` |
| capture project | `.../source/HSR0040-Body-004-RealityCapture.zip` | `.../source/HSR0040-Body-004-Reality_Capture.zip` |

The CSV uses other equivalent case/underscore variants in the sampled rows. These are **not just cosmetic** on a case-sensitive download/build system. No ZIP was opened to select a correct path; evidence is limited to published manifest disagreement.

**Defect D3: inventory provides no sample integrity receipts.** In the observed `files.csv` rows, `size=0` and `sha256` blank. These are **manifest field values**, NOT proof the actual repository ZIP files are zero bytes or corrupt. The actual Xet/LFS artifact lengths and hashes must be independently bound *if* later permitted to process.

**Defect D4: claims about 10 people and 100 body poses cannot become 100 independent face subjects.** `persons.jsonl` lists 10 source persons with `license: "Commercial"`, but that field is not a signed subject consent/biometric-use release. Sample `poses.jsonl` rows include **empty `pose_type`, `activity`, `clothing`, `status`**. They do not establish a verified neutral facial expression, accepted frontal captures, capture times or distinct temporally separated sessions. Full-body OBJ polygon counts/16K textures also do not provide visible lip segmentation or a MediaPipe-compatible 468 canonical face span.

**Operational decision:** avoid indiscriminate 246GB acquisition. Future genuinely actionable test needs (i) current allowed per-file licence/consent and privacy review; (ii) a uniquely named, digest-bound permitted asset; (iii) actual geometry/texture face-region quality and coordinate unit review; (iv) session-level 2×2 accepted neutral captures or a downgrade to non-empirical rendering-only work. Until then use metadata only. Do not claim raw archive contents have been audited.

## 3. FairFace: source-verified actual release form

- [Original authors' repo](https://github.com/joojs/fairface) contains a README with **Google Drive image archives**, two crop padding settings **0.25 / 1.25**, separate train and validation **label CSV** links, and pretrained model links.
- The README describes `dlib.get_face_chip()` for aligned face crops; it **does not expose** a public mapping from original image pixel coordinates to canonical physical 3D mesh or original acquisition cameras.
- The author notes CC BY 4.0, but the original collection comprises photos of individuals, and this statement does not independently resolve third-party image provenance, portrait/consent, sensitive inference or cloud processing rights for MyeongHa.
- No documented participant identity-based splitting for neutral reliability, repeated sessions, accepted two fresh captures per session or per-axis unavailable reasons. The `train`/`validation` split is an **ML split**, not FR312F's governed participant-level development/calibration/holdout protocol.
- A second padding view **of the same source photo** is not a second independently acquired face photo. Cropped images cannot supply absolute 3D geometry or FR82 aligned canonical metric full-mesh width by themselves.

**Operational decision:** do not download real faces solely to discover the exact eight-axis longitudinal dataset is missing. Keep as 2D robustness-documentation candidate pending rights and deliberately designed independent capture protocol.

## 4. Eight exact-axis disposition

Metric ids with `@0.1.0` refer to FR312G. Results for **both HSRD and FairFace**:
- FR291 visible central groove axis length / mouth width: **not proven**. No verified visible philtrum groove annotations.
- FR291 visible corridor width / mouth width: **not proven**. No exact endpoints or denominator.
- FR80 lips contour union aspect: **not proven**. Neither source publishes equivalent contours + pose-aligned construction.
- FR82 projected lips span / 468 canonical 3D full-mesh span: **not proven**. HSRD body OBJ ≠ canonical 468 mesh; FairFace is 2D only.
- FR212 signed neutral corner elevation / mouth width: **not proven**. No accepted independent neutral captures.
- FR293 upper visible lip band vertical span / mouth width: **not proven**. No exact visible-band segmentation.
- FR293 lower visible lip band vertical span / mouth width: **not proven**. Same.
- FR293 combined lip visible area / squared mouth width: **not proven**. No equivalent exact area.

The independent statistical unit is the **participant**, not a pose, video frame, image crop or photograph. No validated within-/between-session absolute differences, unavailable-reason frequencies or per-axis variances exist for these metrics in the inspected publisher metadata.

## 5. Executable source-bound negative audit

Files:
- `packages/face-reading/src/traditional-neutral-public-manifest-audit-fr312g12.ts`
- `packages/face-reading/src/traditional-neutral-public-manifest-audit-fr312g12.test.ts`

The audit pins the three *representative* filename disagreements and checks that the README-specified `files.parquet` is absent from the published manifest listing. It checks the publisher's `CC BY` claim as a statement of **copyright licensing only**, not consent or scientifically valid numerical evidence. It intentionally accepts no raw records or external network data and does not claim to validate the contents of 246GB of Xet blobs.

Do not widen `fr312g12` to grant access or runtime permissions based on caller self-assertions; actual owner permission, method equivalence and FR312G6 review would be separate requirements.

## Exit conditions

A — Actual public README, manifest folder, representative pose/inventory name differences and FairFace distributed structure checked, with exactly limited scientific consequence. B — HSRD pose count is not independent N, CC BY not biometric-product consent, all 8 exact axes and empirical runtime remain **HOLD**, FR312G6 numeric participant count and allocation null. C — PR checks, Integration CI, squash merge and Issue closure verified separately. No data download or licence/purchase submitted.

Watchtower-Track: face-research
