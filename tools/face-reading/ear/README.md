# FR102/FR103 Florence-2 External-Ear Empirical Runner

This directory contains a **local research harness** for the FR101 primary candidate and the corrected FR103 candidate-validation flow.

It is not a Production runtime and it does not create 柳莊 semantic authority.

## Model pin

```text
model    = microsoft/Florence-2-base
revision = 5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac
task     = <REFERRING_EXPRESSION_SEGMENTATION>
```

## FR103 prompt policy

The primary empirical strategy is a **dual side-prompt pair**:

```text
left external ear
right external ear
```

These prompt labels are **not** anatomical laterality. The operator pass showed that both prompts can converge on the same visible ear.

The pair is used only as two localization probes. The runner records pairwise geometry evidence such as bbox overlap / IoU and centroid distance, but does not auto-accept a consensus candidate.

The generic prompt:

```text
external ear
```

is diagnostic-only. In the bounded operator pass it produced substantial cheek/neck leakage on a clear visible-ear image and still hallucinated a central-face polygon when no ear was visible.

Anatomical laterality and visible-ear plausibility remain deferred to a governed face-geometry / pose gate.

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

The self-test verifies:

- normal polygon parsing;
- exact-degeneracy rejection;
- dual-prompt pair-metric generation;
- no automatic consensus acceptance;
- no face-geometry plausibility authority.

## Run one image

Primary FR103 dual-prompt mode:

```bash
python tools/face-reading/ear/run_florence2_ear_empirical.py \
  --input /path/to/photo.jpg \
  --capture-case mild_three_quarter_near_ear \
  --qa-overlay
```

This produces local `left.json`, `right.json`, and `pair-summary.json` records.

Generic diagnostic comparison only:

```bash
python tools/face-reading/ear/run_florence2_ear_empirical.py \
  --input /path/to/photo.jpg \
  --capture-case generic_prompt_diagnostic \
  --prompt-mode generic-diagnostic \
  --qa-overlay
```

Single-side diagnostic mode is also available:

```bash
python tools/face-reading/ear/run_florence2_ear_empirical.py \
  --input /path/to/photo.jpg \
  --capture-case single_side_diagnostic \
  --prompt-mode single-side-diagnostic \
  --side left \
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

Each side-prompt record contains:

- image SHA-256;
- original pixel dimensions;
- capture-case label;
- mirror provenance;
- requested prompt side with explicit non-authoritative side semantics;
- exact model id/revision/task;
- raw generated text;
- raw parsed Florence-2 output;
- normalized polygon points;
- bounding box, centroid, polygon area, and image-relative geometry;
- exact-degeneracy rejection evidence;
- explicit `candidate_polygon` or `unavailable` state;
- runtime package/device versions;
- fail-closed authority flags.

The dual-prompt `pair-summary.json` additionally records:

- left/right candidate counts and statuses;
- bbox intersection / union / IoU when exactly one candidate exists per prompt;
- centroid distance;
- polygon area ratios;
- `automaticConsensusAcceptanceAuthorized=false`;
- `faceGeometryPlausibilityGateImplemented=false`;
- `anatomicalLateralityAssigned=false`.

## Exact degeneracy gate

FR103 may automatically reject only exact structural degeneracy:

- bounding-box width is exactly zero;
- bounding-box height is exactly zero;
- polygon area is exactly zero.

If every returned polygon for a prompt is structurally degenerate, that prompt result is `unavailable`.

This is **not** an accuracy threshold.

## Pairwise evidence is not consensus authority

High bbox overlap or a short centroid distance may be useful empirical evidence that both probes localized the same region. FR103 does not define a threshold for either metric.

Therefore:

```text
dual-prompt overlap
!= validated ear consensus
!= visible-ear plausibility pass
!= anatomical laterality
```

The next gate must validate the candidate against governed face geometry / pose and reject central-face hallucinations or implausible lateral placement before neutral runtime observation can be reconsidered.

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

FR103 declares no numeric acceptance threshold, no automatic consensus authority, no automatic anatomical side authority, no 官成 state, and no Production authority.
