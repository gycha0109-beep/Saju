# Multi-signal visible-hairline candidate

Local-only engineering candidate used after the pinned FR306 primary and fallback model paths failed real bounded validation.

This method is intentionally **not** a hair-color classifier and does not infer demographic attributes.

## Why this exists

Real local evidence showed:

- Florence-2 failed the partial-bangs / heavy-occlusion bounded cases and was rejected by FR310.
- Grounding DINO + SAM2.1 could load and execute, but the grounding stage grossly mislocalized the critical partial-bangs forehead region. SAM2.1 cannot repair a semantically wrong grounding box.

The next candidate therefore uses direct image evidence instead of another prompt-defined hair category.

## Signals

For each local image the runner combines:

- adaptive skin/non-skin transition;
- luminance edge;
- opponent-chroma edge;
- local texture contrast;
- edge strength;
- horizontal path continuity;
- central upper-face skin continuity;
- truncation risk;
- occlusion risk.

A weak color difference does **not** imply failure by itself. Strong edge or texture evidence may still support a visible-interface candidate.

## No-visible-hairline state

A capture may legitimately contain no visible hair/skin interface.

The engineering preview state can therefore be:

- `visible_interface_candidate`
- `partially_visible_or_occluded`
- `no_visible_hairline_candidate`
- `unavailable`

The no-visible-hairline state is an image-observation state only. It is not a medical diagnosis, demographic inference, or identity attribute.

## Hidden completion

The runner never fills a hidden or cropped hairline.

If continuity/coverage/visibility evidence is weak, the output must degrade to partial/unavailable rather than inventing a full line.

Starting with exact revision 0.3.0, every non-visible state also suppresses candidate-boundary exposure. A diagnostic path may exist privately for debugging, but downstream review must not treat it as a hairline candidate.

## Install

Actual image execution requires local OpenCV, Pillow and NumPy:

```bash
python -m pip install opencv-python-headless pillow numpy
```

Normal CI does not need these packages because `--self-check` uses only the Python standard library.

## Self-check

```bash
python3 tools/face-reading/hairline/run_multisignal_visible_hairline_candidate.py --self-check
```

This verifies:

- all four preview states;
- no hair-color classification;
- no demographic inference;
- no hidden completion;
- safe-receipt privacy guard;
- no authority promotion.

## 18-capture experiment

Copy:

```text
tools/face-reading/hairline/multisignal-18-capture-manifest.example.json
```

to a local/private path and replace only the `sourcePath` values.

The example tags describe image conditions only:

- clear visible interface;
- partial/substantial occlusion;
- upper-frame truncation;
- M / widow's-peak contour;
- side recession / asymmetry;
- low local color contrast;
- background contrast stress;
- no-visible-hairline controls;
- low-color-contrast short hair;
- long hair with visible forehead.

Do not add race, ethnicity, subject identity, or other demographic attributes to the manifest.

## Optional local face ROI

A manifest record may contain:

```json
{
  "faceRoi": [120, 60, 320, 430]
}
```

This is a local image-space rectangle only.

If omitted, the runner uses a conservative central portrait heuristic. The heuristic is not anatomical authority and cannot auto-admit a result.

## Frame truncation

If the source capture is known to be top-frame truncated, set:

```json
{
  "frameTopTruncated": true
}
```

This forces the engineering preview to fail closed as unavailable.

## Run

```bash
python3 tools/face-reading/hairline/run_multisignal_visible_hairline_candidate.py \
  --manifest /local/private/multisignal-manifest.json \
  --output .cache/face-reading/hairline-multisignal-candidate
```

Outputs:

```text
.cache/face-reading/hairline-multisignal-candidate/
  <recordId>/
    candidate.json
    overlay.jpg        # only when qaOverlay=true
  private-summary.json
  repo-safe-receipt.json
```

The detailed candidate file may contain local source paths, digests, ROI and raw boundary points. It must remain local.

QA overlay semantics:

- red line: only a `visible_interface_candidate` may expose a candidate boundary;
- `partially_visible_or_occluded`: no candidate line is drawn;
- `unavailable`: no candidate line is drawn;
- `no_visible_hairline_candidate`: no candidate line is drawn;
- green box: local face ROI;
- blue boxes: locally detected eye pair when available.

The dynamic-programming path is still retained in the private `candidate.json` as `diagnosticBoundaryPoints` for engineering review. It is never exposed as `boundaryPoints` unless the preview state is `visible_interface_candidate`.

Only `repo-safe-receipt.json` is designed to be repository-safe.

## Engineering preview thresholds

The v1 thresholds are deliberately labeled **engineering preview only**.

They may sort captures for human review but may not:

- issue FR305 admission;
- authorize a neutral runtime hairline observation;
- change repository readiness from 6/7 to 7/7;
- create traditional physiognomy semantics;
- authorize Three-Divisions spans;
- materialize Product/Production/Commerce.

Real-capture calibration must be reviewed separately before any threshold can become authority.

## Human review questions

For each capture, inspect the overlay and ask:

1. Does the candidate follow the visible skin/hair interface rather than face silhouette, shadow, eyebrow or background?
2. In low color contrast, is the path supported by edge/texture rather than merely color distance?
3. In partial occlusion, does it remain partial instead of completing hidden segments?
4. In top-frame truncation, does it fail closed?
5. In a no-visible-hairline control, does it avoid inventing an internal line?
6. For long hair or braids, does it follow the forehead interface rather than the side hair mass?

## Governed human-review handoff

After a local v3.2 run, do not hand-write FR308/FR312 JSON from preview states.

Use:

```text
tools/face-reading/hairline/README-multisignal-review-packet.md
```

The review packet requires explicit human inspection and carries the exact registered FR306 candidate identity through FR308, FR310 and FR312.

## Authority boundary

This is candidate evidence only.

It does not authorize:

- FR305 model admission;
- a production neutral hairline reference;
- hidden-hairline completion;
- face-oval / mesh-top substitution;
- 髮際 traditional binding;
- Three-Divisions spans;
- Product materialization;
- Production or Commerce.

Watchtower-Track: face-observation-engine


## v3.3 exposure-guard revision — 0.4.0

Real FR312 on v3.2 `0.3.0` rejected two expanded-validation captures for gross mislocalization: one low-local-contrast/light-hair exposure localized inside hair mass, and one asymmetric/fringe exposure localized a lower fringe edge.

Revision `0.4.0` does not reconstruct hidden hairline geometry and does not retune the original multi-signal preview thresholds. It adds a conservative publication guard after the raw preview classifier:

- ambiguous material direction: weak skin-to-hair material transition plus weak above/below texture direction downgrades a raw visible candidate to `partially_visible_or_occluded`;
- low fringe-edge risk: a raw visible candidate that sits unusually low in the face basis while path support is weak is downgraded to `partially_visible_or_occluded`;
- any downgraded state exposes no candidate boundary and no QA red line;
- the private diagnostic path remains local-only.

The rejected FR312 bundle is development/regression evidence for this revision. It is not an untouched independent holdout for v3.3 and cannot by itself establish FR312 or FR305 admission.
