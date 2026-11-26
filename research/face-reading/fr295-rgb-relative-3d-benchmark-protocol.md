# FR295 — Provider-neutral RGB relative-3D benchmark protocol

Status: protocol freeze

Watchtower-Track: face-engine

## Trigger

FR294 leaves 11 hard gaps and proves that the reusable 2D geometry lane is exhausted.

Four of those gaps share one evidence class:

```text
forehead.relative_surface_curvature
nose.tip_bridge_relative_projection
cheek_midface.relative_3d_prominence
chin_lower_face.relative_projection
```

All four are `rgb_relative_3d_shape` features.

FR282 explicitly states for every one of them:

- special depth hardware is not a product requirement;
- metric 3D is not a product requirement;
- traditional binding is not issued.

The missing piece is benchmark evidence for an ordinary-RGB relative-shape candidate.

## Repository audit before choosing FR295

The other FR294 lanes cannot currently be advanced honestly from existing runtime authority:

- there is no ear-specific visibility evaluator;
- FR191 defines a shared side-agnostic profile role but explicitly does not prove organ-specific sufficiency;
- MediaPipe face geometry does not provide an authorized external-pinna boundary;
- there is no validated forehead/hairline/eyebrow-density/eyelid/lip-color image model in the face-engine runtime.

Therefore FR295 does not invent one.

The repository does contain a separate face-research history around independent 3D reference acquisition for nasal-apex work (FR266–FR272 and successors). That research is not promoted into product authority here. It demonstrates why candidate output and independent reference must remain separate.

## Two-lane benchmark model

### Lane 1 — product candidate

The candidate being evaluated must remain compatible with the actual FR282 product boundary:

```text
ordinary smartphone RGB front camera
RGB-only candidate input
no special depth hardware consumed
no metric-3D input consumed
unitless relative-shape output
no physical millimeter output claim
no traditional semantic binding
```

A future model may use any governed implementation that satisfies this lane. FR295 does not select a model or provider.

### Lane 2 — independent evaluation reference

The benchmark reference is not a production dependency.

It may be independently validated calibrated 3D or independently validated depth evidence, but only as an evaluation reference.

Required properties:

- independent from the candidate provider;
- candidate provider output is not used as reference truth;
- candidate provider indices are not used as reference truth;
- a separately governed feature-axis definition is frozen;
- candidate and reference are bound by the same capture or by validated registration;
- reference is frozen before candidate scoring;
- candidate output is hidden during reference construction;
- traditional labels are hidden during reference construction;
- reference use is benchmark-only;
- no production runtime dependency is created.

This allows strong validation evidence without converting depth hardware into a product requirement.

## What FR295 admits

Passing the executable admission gate means only:

```text
admitted_for_descriptive_benchmark_only
```

It does not mean:

- the candidate won;
- an error threshold exists;
- the candidate is calibrated;
- a feature-specific axis was defined by FR295;
- physical millimeter depth is a product output;
- a traditional interpretation is valid;
- a canonical product column is materialized;
- Production or Commerce is activated.

## Why MediaPipe Z cannot be the reference

FR282 explicitly forbids calling an RGB 3D model ground truth.

Using a candidate provider's own relative Z or geometry as the reference would collapse candidate and reference into the same evidence source and make the benchmark circular.

FR295 therefore blocks:

- provider self-ground-truth;
- provider-index ground-truth;
- unbound external reference;
- reference construction after seeing candidate output.

## Relationship to FR266–FR272

FR266–FR272 are useful research precedents for provider-independent reference construction and acquisition preflight.

They do not automatically satisfy FR295 because:

- they are primarily nasal-apex research;
- their independent-source validation remains a separate research authority question;
- FR295 covers four product-neutral relative-shape targets;
- each target still needs its own frozen neutral reference-axis definition before real scoring.

No FR266 nasal-apex point is silently generalized into forehead, cheek, or chin ground truth.

## Product state after FR295

FR295 changes no product materialization state:

```text
FR282 canonical feature keys        = 29
FR293 materialized                  = 18
remaining gaps                      = 11
relative-3D gaps with protocol      = 4
relative-3D gaps materialized       = 0
```

## Next executable frontier

The next relative-3D work is not another product wrapper.

It is one of:

1. freeze a neutral reference-axis definition for one of the four targets;
2. bind that axis to a validated independent reference acquisition path;
3. register one ordinary-RGB candidate implementation;
4. collect descriptive benchmark evidence without issuing a threshold.

In parallel, the image-model and ear-visibility lanes remain blocked until actual model/evaluator evidence exists.

Watchtower-Track: face-engine
