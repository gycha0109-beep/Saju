# FR308 — Bounded first visible-hairline capture bundle

Status: protocol/intake ready, real capture not yet collected

Watchtower-Track: face-observation-engine

## Purpose

FR307 provides a local Florence-2 runner. FR308 limits the first real empirical run to four high-signal cases instead of attempting the full ten-case frontier immediately.

This phase tests visible-boundary behavior and failure modes. It does not admit a runtime provider.

## Required first bundle

Run exactly these four capture cases:

1. `clear_unobstructed_central_hairline`
2. `partial_bangs_occlusion`
3. `heavy_bangs_hairline_substantially_hidden`
4. `cropped_upper_forehead`

Use at least one ordinary RGB image per case.

## Local-only execution

Example:

```bash
python tools/face-reading/hairline/run_florence2_hairline_empirical.py \
  --input /local/path/to/clear-case.jpg \
  --capture-case clear_unobstructed_central_hairline \
  --qa-overlay
```

Repeat with the other three case labels.

All source images, overlays, raw polygons and source-image digests remain under the local gitignored cache path.

Do not attach them to GitHub issues, pull requests or Actions artifacts.

## Manual review target

For each case, record only deidentified aggregate findings:

- whether `visible hair` produced a candidate polygon;
- whether `forehead skin` produced a candidate polygon;
- whether diagnostic `visible hairline` produced a candidate polygon;
- whether obvious gross mislocalization occurred;
- whether hidden-segment completion was observed;
- whether out-of-frame completion was observed;
- whether a visible hair/skin interface candidate was visually present;
- direct-prompt behavior:
  - useful candidate;
  - leakage;
  - hallucination;
  - unavailable;
  - ambiguous;
- one disposition:
  - `supports_further_evaluation`;
  - `inconclusive`;
  - `rejects_current_candidate_behavior`.

Do not persist raw coordinates or image-derived identifiers in the repository summary.

## Fail-closed rules

A substantially hidden case that shows hidden completion cannot be marked as supporting further evaluation.

A cropped case that shows out-of-frame completion cannot be marked as supporting further evaluation.

Even a fully completed four-case bundle only proves that bounded empirical evidence exists.

It does not:

- admit a hairline provider;
- issue an FR305 model-admission receipt;
- authorize a neutral runtime hairline observation;
- bind 髮際;
- enable Three-Divisions spans;
- change Product 18/29;
- activate Production or Commerce.

## Current state

Until the operator actually runs the four cases and submits only the deidentified aggregate findings:

- real-capture evidence collected: false;
- admitted hairline runtime providers: 0;
- FR305 admission receipt: false;
- #1521 readiness: 6 / 7;
- traditional bindings: 0.

## Next

After the four-case aggregate findings exist, run a separate adjudication step.

That adjudication may conclude:

- reject Florence-2 behavior;
- keep the candidate under further evaluation;
- or permit a narrowly scoped FR305 model-admission review.

No outcome is automatic.
