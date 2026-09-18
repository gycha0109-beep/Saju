# MESH6J.3 — Camera-style mobile multi-frame capture

MESH6J.3 changes the mobile operator surface and the explicit trigger grouping used by the existing MESH6H → MESH6I → MESH6G → MESH6F research path.

## Operator flow

The mobile UI has three views.

### Preparation

The operator:

1. confirms the fresh-capture attestation;
2. confirms the same-participant-series attestation;
3. optionally reviews advanced research counts/references;
4. presses **촬영 시작**.

The camera is opened only after this explicit action.

### Capture

The browser switches to a dedicated fixed viewport:

- camera preview fills the screen;
- capture progress is overlaid at the top;
- a circular shutter is fixed at the bottom;
- no page scrolling is required to reach the shutter.

The default prospective acquisition shape is:

```text
3 sweeps × 5 explicit frames per sweep
```

Every shutter press emits exactly one trigger to the currently active sweep.

A sweep queue is not closed until all configured explicit frames for that sweep have been consumed. After closure, the next sweep becomes active. Analysis is awaited only after the last explicit frame of the last sweep.

### Result

After analysis finishes:

- the camera is released;
- the bounded descriptive result is rendered as JSON;
- the operator can download the JSON;
- the operator can start another capture session.

## Why multi-frame sweeps are required

A one-frame sweep mechanically yields zero for within-sweep statistics such as span, MAD, and robust P10–P90 span. Those zeros do not establish repeatability.

MESH6J.3 therefore prevents the primary UI from configuring one frame per sweep. The default five explicit frames provide actual within-sweep variation for descriptive inspection.

This does not establish any acceptance threshold or calibration.

## Authority boundary

MESH6J.3 does not add:

- automatic capture or timer-driven triggers;
- requestAnimationFrame/requestVideoFrameCallback capture;
- raw image/video persistence or upload;
- raw provider response or landmark persistence;
- frame scoring or automatic selection;
- identity matching;
- candidate-selection reuse;
- pose, quality, confidence, or repeatability thresholds;
- calibration;
- production morphology admission;
- anatomical, beauty, or traditional physiognomy interpretation authority.

The capture surface remains a prospective descriptive research tool.
