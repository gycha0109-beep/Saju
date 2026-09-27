# FR102/FR103 Florence-2 External-Ear Empirical Runner

This directory contains a **local research harness** for the FR101 primary candidate and the FR103 candidate-validation gate.

It is not a Production runtime and it does not create 柳莊 semantic authority.

## Model pin

```text
model    = microsoft/Florence-2-base
revision = 5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac
task     = <REFERRING_EXPRESSION_SEGMENTATION>
```

## FR103 prompt policy

The primary empirical prompt is now side-neutral:

```text
external ear
```

Use Florence-2 only to localize an external-ear candidate. Do **not** treat model-side `left` / `right` semantics as authoritative.

Side-specific prompts remain available only for bounded diagnostic comparison:

```text
--prompt-mode diagnostic-side --side both
```

Anatomical side assignment is deferred to a later face-geometry/pose stage.

## Setup

Create an isolated Python environment, then install the local research dependencies.

```bash
python -m venv .venv-fr102

# Windows PowerShell
.\.venv-fr102\Scripts\Activate.ps1

# macOS/Linux
source .venv-fr102/bin/activate

pip install -r tools/face-reading/ear/requirements-fr102.txt
```

The dependency file pins `transformers==4.49.0` for the current Florence-2 remote-code compatibility surface and includes the required `einops` / `timm` packages.

For CUDA systems, install the PyTorch build appropriate for the local GPU before or instead of the generic `torch` requirement.

The first real run downloads the pinned Florence-2 model into the local Hugging Face cache. Normal repository CI does not download it.

## CI-safe self-test

This path requires only Python stdlib and does not load Florence-2:

```bash
python tools/face-reading/ear/run_florence2_ear_empirical.py --self-test
```

The self-test verifies both normal polygon parsing and the FR103 exact-degeneracy rejection path.

## Run one image

Primary FR103 mode:

```bash
python tools/face-reading/ear/run_florence2_ear_empirical.py \
  --input /path/to/photo.jpg \
  --capture-case mild_three_quarter_near_ear \
  --qa-overlay
```

Diagnostic side-prompt comparison only:

```bash
python tools/face-reading/ear/run_florence2_ear_empirical.py \
  --input /path/to/photo.jpg \
  --capture-case diagnostic_side_prompt_comparison \
  --prompt-mode diagnostic-side \
  --side both \
  --qa-overlay
```

Front-camera pixels that are already mirrored must be declared:

```bash
python tools/face-reading/ear/run_florence2_ear_empirical.py \
  --input /path/to/photo.jpg \
  --capture-case frontal_both_ears_if_visible \
  --front-camera-mirrored
```

The flag records provenance only. The runner does not silently flip the image.

## Output

Default local output:

```text
.cache/face-reading/ear-fr103/
```

This path is covered by the repository's `.cache/face-reading/` gitignore rule.

Each record contains:

- image SHA-256;
- original pixel dimensions;
- capture-case label;
- mirror provenance;
- generic or diagnostic prompt provenance;
- exact model id/revision/task;
- raw generated text;
- raw parsed Florence-2 output;
- normalized polygon points;
- bounding box, centroid, polygon area, and image-relative geometry;
- exact-degeneracy rejection evidence;
- explicit `candidate_polygon` or `unavailable` state;
- runtime package/device versions;
- fail-closed authority flags.

## Exact degeneracy gate

FR103 may automatically reject only exact structural degeneracy:

- bounding-box width is exactly zero;
- bounding-box height is exactly zero;
- polygon area is exactly zero.

If every returned polygon is structurally degenerate, the effective state is `unavailable`.

This is **not** an accuracy threshold. FR103 records plausibility geometry but does not authorize a numeric ear-likeness threshold or automatic plausibility classifier.

## Privacy

Do not commit:

- user images;
- overlays;
- empirical bundle output containing image-derived polygons;
- source image digests intended to link repository evidence back to a private local image.

Do not upload these artifacts into GitHub Actions.

Only de-identified failure-mode conclusions may be versioned in repository research evidence.

## Authority boundary

A returned polygon is only a candidate.

```text
candidate polygon
!= validated visible external ear
!= neutral runtime ear observation
!= 採聽官
!= 命門
!= 貼肉/敦厚
!= 色明
```

FR103 declares no numeric acceptance threshold, no automatic anatomical side authority, no 官成 state, and no Production authority.
