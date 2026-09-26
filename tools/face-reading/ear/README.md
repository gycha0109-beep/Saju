# FR102 Florence-2 External-Ear Empirical Runner

This directory contains a **local research harness** for the FR101 primary candidate.

It is not a Production runtime and it does not create 柳莊 semantic authority.

## Model pin

```text
model    = microsoft/Florence-2-base
revision = 5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac
task     = <REFERRING_EXPRESSION_SEGMENTATION>
```

The runner uses one side-specific prompt at a time:

```text
left external ear
right external ear
```

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

For CUDA systems, install the PyTorch build appropriate for the local GPU before or instead of the generic `torch` requirement.

The first real run downloads the pinned Florence-2 model into the local Hugging Face cache. Normal repository CI does not download it.

## CI-safe self-test

This path requires only Python stdlib and does not load Florence-2:

```bash
python tools/face-reading/ear/run_florence2_ear_empirical.py --self-test
```

## Run one image

```bash
python tools/face-reading/ear/run_florence2_ear_empirical.py \
  --input /path/to/photo.jpg \
  --capture-case mild_three_quarter_near_ear \
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
.cache/face-reading/ear-fr102/
```

This path is already covered by the repository's `.cache/face-reading/` gitignore rule.

Each image/side record contains:

- image SHA-256;
- original pixel dimensions;
- capture-case label;
- mirror provenance;
- requested side;
- exact model id/revision/task;
- raw generated text;
- raw parsed Florence-2 output;
- normalized polygon points;
- explicit `candidate_polygon` or `unavailable` state;
- runtime package/device versions;
- fail-closed authority flags.

Optional QA overlays are local artifacts only.

## Privacy

Do not commit:

- user images;
- overlays;
- empirical bundle output containing image-derived polygons.

Do not upload these artifacts into GitHub Actions.

Only non-image conclusions specifically approved for research versioning should later be summarized into repository evidence.

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

FR102 declares no accuracy threshold, no 官成 state, and no Production authority.
