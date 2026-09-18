# MESH-DATA-02 — Same-condition repeated-session acquisition protocol

Issue: #873

MESH-DATA-02 is a prospective empirical campaign for observing between-session variation after MESH-DATA-01 established only that one real repeated-sweep dataset could be collected and reviewed.

## Timing gate

Only sessions captured after #873 was created are eligible.

The MESH-DATA-01 source artifact from #855 is historical context and does not count toward the five-session target. This avoids retrospective inclusion after observing its values.

## Acquisition target

Collect five independent MESH6J.3 sessions under the same operator-defined baseline condition.

Each session uses:

```text
3 sweeps × 5 explicit frames = 15 frames
```

Campaign total:

```text
5 sessions
15 sweeps
75 explicit frames
```

No automatic capture, frame selection, or value-based discard is allowed.

## Local private-artifact review tool

The participant-derived JSON stays local. Review one session with:

```bash
node scripts/review-face-geometry-mesh-data-02-session.mjs \
  <private-artifact.json> \
  --session-ref mesh-data-02:session:01 \
  --operator-real-capture-attested \
  --post-data02-preregistration-attested
```

The command writes a privacy-bounded receipt to stdout. It does not rewrite or upload the private source artifact.

The receipt retains:

- source artifact SHA-256;
- protocol-local session/grouping refs;
- non-participant geometry/adapter provenance identity;
- 3-sweep / 15-frame structural counts;
- frozen 13-field coverage;
- finite-value review boolean;
- privacy and authority review booleans.

It does **not** retain the participant-derived primary numeric evidence values.

## No value-based selection

A numeric value of zero is not itself an exclusion condition.

The local reviewer requires finite values and the frozen field set, but does not require values to be non-zero and does not define acceptable ranges. This prevents the review tool from silently becoming a capture-selection or threshold mechanism.

## Same-condition intent

Across the five sessions, keep the following as stable as reasonably practical:

- device/camera;
- camera orientation;
- camera-to-face distance;
- lighting arrangement;
- neutral facial state;
- MESH6J.3 3 × 5 acquisition shape;
- baseline condition ref;
- protocol-local grouping policy.

These are operator protocol controls, not validated capture-quality thresholds.

## Privacy and authority boundary

MESH-DATA-02 does not authorize repository storage of source participant JSON or numeric morphology values.

It also does not issue:

- empirical repeatability;
- repeatability pass/fail;
- pose acceptance;
- capture-quality validity;
- confidence;
- population norms;
- calibration coefficients;
- numeric thresholds;
- production morphology admission;
- identity matching;
- anatomical, beauty, or traditional physiognomy interpretation.

Only after all five prospectively eligible sessions have been reviewed may a separate descriptive cross-session review be produced.
