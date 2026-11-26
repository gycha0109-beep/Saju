# FR270 Controlled Same-Frame Eye-Tilt Divergence Protocol

> Watchtower-Track: face-reading  
> Status: research-only controlled collection analysis contract  
> Depends on: FR251 capture surface, FR257 same-frame capture geometry, FR269 same-frame screen-vs-FR76 eye-tilt diagnostic

## Goal

FR269 showed a strong low-angle sensitivity signal in the frozen eye metric, while FR76 metric geometry is already inverse-pose aligned.

FR270 does not add another camera workflow, calibration, pose correction, or replacement metric.

It prepares the exact scalar-only analysis needed to distinguish the following descriptive patterns after the next minimal controlled collection:

- screen-space eye tilt and FR76 eye tilt move together;
- screen-space eye tilt is relatively stable while FR76 eye tilt moves more;
- both move, but by materially different amounts.

These patterns are observations, not causal classifications.

## Existing capture path

Reuse:

```text
/fr251/
→ FR251 execution
→ FR257 geometry sidecar
→ FR269 eye-tilt diagnostic sidecar
```

No new camera workflow is created.

## Minimal controlled collection

Exactly three operator-labelled conditions:

1. `baseline_eye_level`
2. `low_angle`
3. `high_angle`

Each condition is one FR251 execution:

```text
Session 1 Capture 1
Session 1 Capture 2
Session 2 Capture 1
Session 2 Capture 2
```

That is four shutter frames per condition and twelve total shutter frames.

No numeric pitch, distance, or face-box target is introduced.

## Required files per condition

Keep the two sidecars produced by the same completed FR251 execution:

- `myeongha-fr257-capture-geometry-<timestamp>.json`
- `myeongha-fr269-eye-tilt-diagnostic-<timestamp>.json`

The two files are a valid pair only when their `generatedAt` values are identical and every slot is aligned in this exact order:

```text
1:1
1:2
2:1
2:2
```

FR251 sanitized JSON may be retained under the existing privacy contract, but FR270 analysis does not require it.

## Pair validation

FR270 must reject analysis when any of the following occurs:

- FR257 and FR269 `generatedAt` differ;
- either bundle does not contain exactly four slots;
- slot order differs;
- any controlled slot is rejected or incomplete;
- FR257 frozen metric and FR269 frozen metric differ;
- FR269 frozen metric and its FR76 diagnostic differ;
- `screenMinusFr76Degrees` does not equal screen-space minus FR76 within deterministic numeric tolerance;
- either sidecar widens its existing privacy or authority boundary.

This is mechanical evidence completeness, not a morphology acceptance threshold.

## Scalars analyzed per capture

- frozen FR76 eye outer-corner tilt mean degrees
- screen-space eye outer-corner tilt mean degrees
- screen minus FR76 degrees
- vertical orientation radians
- lateral orientation radians
- in-plane lateral-axis orientation radians
- screen face-box area fraction

## Descriptive summaries

Per condition:

- mean
- min
- max
- span

Baseline-relative mean contrasts:

- delta frozen FR76 eye tilt
- delta screen-space eye tilt
- delta screen-minus-FR76
- delta vertical orientation
- delta lateral orientation
- delta in-plane orientation
- delta face-box area

## Interpretation boundary

FR270 does not automatically label a result as Case A, B, or C.

It does not issue:

- pose or distance thresholds;
- calibration coefficients;
- correction formulas;
- pass/fail repeatability criteria;
- confidence grades;
- causal attribution;
- frozen metric replacement;
- Production or Commerce authority;
- traditional face-reading interpretation authority.

The report supports a later human-governed decision about whether the next research frontier should prioritize capture guidance, FR76 reconstruction investigation, or metric redesign.

## Privacy boundary

Persist only sanitized scalar sidecars and scalar analysis.

Do not persist:

- raw photo or video;
- image digest;
- raw provider response;
- screen landmarks;
- metric landmarks;
- pose transformation matrix;
- providerRunRef;
- participant/operator identifiers;
- embeddings or identity templates.

## Next action

After FR270 implementation and CI are green, perform only the three controlled FR251 executions described above and provide the six paired sidecar files for analysis.
