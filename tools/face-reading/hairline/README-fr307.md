# FR307 visible-hairline empirical runner

Local/offline candidate-evidence runner for the FR306 primary model.

## Install local runtime dependencies

Reuse the pinned FR102/FR103 local dependency set:

```bash
python -m pip install -r tools/face-reading/ear/requirements-fr102.txt
```

Normal PR CI does **not** install these ML dependencies and does not download Florence-2.

## Self-test

```bash
python tools/face-reading/hairline/run_florence2_hairline_empirical.py --self-test
```

The self-test uses synthetic parser fixtures only.

## Real local run

```bash
python tools/face-reading/hairline/run_florence2_hairline_empirical.py \
  --input /local/path/to/image-or-directory \
  --capture-case clear_unobstructed_central_hairline \
  --qa-overlay
```

Default output:

```text
.cache/face-reading/hairline-fr307/
```

That directory is covered by the repository's `.cache/face-reading/` ignore rule.

## Per-image prompts

The runner invokes the exact pinned Florence-2 revision with:

1. `visible hair`
2. `forehead skin`
3. `visible hairline` — diagnostic only

The output records candidate polygons and descriptive geometry.

It does **not** decide that any polygon or polygon pair is a valid hairline.

## Authority boundary

The runner cannot authorize:

- a neutral runtime hairline observation;
- hidden-hairline completion;
- MediaPipe face-oval/top-mesh substitution;
- a numeric acceptance threshold;
- an FR305 model-admission receipt;
- 髮際 binding;
- Three-Divisions spans;
- Product materialization;
- Production or Commerce.

Real operator images, QA overlays, raw polygon bundles and private image digests remain local.
