# FR102 — Local Florence-2 Ear Empirical Runner

> Track: `face-observation-engine`  
> Issue: #1702  
> Upstream: FR101 / PR #1700  
> Status: local empirical harness / no runtime observation authority

## Purpose

FR101 selected concrete candidate models.

FR102 makes the primary Florence-2 path runnable without turning candidate output into a validated ear observation.

## Pinned model

```text
microsoft/Florence-2-base
revision = 5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac
task = <REFERRING_EXPRESSION_SEGMENTATION>
```

The local runner follows the official Florence-2 inference shape:

```text
image + task token + side-specific text
→ generate
→ post_process_generation
→ polygon candidate
```

## Side policy

The runner invokes separate requests:

```text
left external ear
right external ear
```

Requested-side provenance is always retained.

Front-camera mirror state is explicit metadata. The runner never silently swaps or flips laterality.

## Output contract

Each record stores:

- source image SHA-256;
- dimensions;
- capture-case label;
- mirror provenance;
- requested side;
- exact model revision;
- generated text;
- raw parsed output;
- normalized pixel polygons;
- candidate/unavailable state;
- local runtime versions;
- fail-closed authority flags.

No threshold converts a polygon into an accepted observation.

## Privacy

Default output lives under:

```text
.cache/face-reading/ear-fr102/
```

The repository already ignores `.cache/face-reading/`.

User images and image-derived overlays/bundles are not repository artifacts and are not CI inputs.

## CI

Standard PR CI runs only:

```bash
python tools/face-reading/ear/run_florence2_ear_empirical.py --self-test
```

and the static FR102 authority test.

CI does not install the research ML requirements and does not download Florence-2 weights.

## Authority

```text
runner implemented = YES
candidate polygon parsing = YES
real-image empirical evidence = NOT YET

validated neutral ear observation = NO
traditional binding = NO
numeric acceptance threshold = NO
Production = NO
```

## Next gate

The runner is now specific enough for the first bounded real-capture bundle.

The next evidence must characterize actual failure modes before any acceptance threshold or runtime observation contract is proposed.
