# FR277 — Deterministic Still-Image Vertical Viewpoint Sensitivity

Watchtower-Track: face-research

## Purpose

FR274 made the exact still image the fixed input and emitted only bounded scalar diagnostics from the existing FR26 → FR76 → FR257 → FR269 path.

FR277 consumes two independent FR274 executions over the same six fixed still images and asks a narrower question:

> In this fixed six-image, single-participant set, how do the screen-space eye-tilt scalar, the FR76 eye-tilt scalar, and their divergence co-vary with the FR257 vertical-orientation scalar?

This is a descriptive association study only. It does not establish a causal mechanism or a correction model.

## Reproducibility gate

The two FR274 executions were produced from fresh runtime executions over the same six images:

- front × 2;
- high angle × 2;
- low angle × 2.

All persisted scalar evidence matched exactly across the two runs. `generatedAt` is deliberately excluded from the reproducibility comparison.

This establishes deterministic runtime reuse for these fixed inputs. It does **not** establish live-camera capture repeatability.

## Observed condition means

The aggregate-only condition means from the fixed-image set were:

| condition | screen eye tilt | FR76 eye tilt | screen − FR76 | vertical orientation | screen face-box area |
| --- | ---: | ---: | ---: | ---: | ---: |
| front | 9.750515° | 8.932932° | +0.817582° | -4.729731° | 0.313807 |
| high angle | 12.173120° | 9.286832° | +2.886289° | -12.766756° | 0.275096 |
| low angle | 2.706870° | 5.170771° | -2.463901° | +11.483457° | 0.307463 |

Relative to front:

- high angle: screen +2.422606°, FR76 +0.353899°, divergence +2.068707°, vertical orientation -8.037026°;
- low angle: screen -7.043645°, FR76 -3.762162°, divergence -3.281483°, vertical orientation +16.213187°.

The low-angle screen-space shift therefore remains present when the input images themselves are fixed and directly inspectable.

## Six-observation descriptive association

Across the six observations, ordinary least squares against verticalOrientationDegrees gives:

| response | slope per +1° vertical orientation | Pearson r | R² |
| --- | ---: | ---: | ---: |
| screen-space eye tilt | -0.398814° | -0.995239 | 0.990500 |
| FR76 eye tilt | -0.181956° | -0.951914 | 0.906141 |
| screen − FR76 | -0.216857° | -0.995803 | 0.991624 |

These numbers describe this deliberately pose-separated six-image set. They are **not** an admitted linear response model. The sample is one participant with two images per condition, and the condition construction itself induces strong separation in vertical orientation.

FR277 therefore does not infer that a future +1° change in vertical orientation will cause any of the tabulated response changes.

## Potential confounds retained

Across the six images:

- vertical orientation range: -14.064949° to +14.079798°;
- lateral orientation range: -2.597744° to -1.035951°;
- in-plane orientation range: -0.584066° to +1.024828°;
- screen face-box area range: 0.268376 to 0.321584.

The front and low condition means have similar face-box area (0.313807 vs 0.307463), while their screen-space eye-tilt means differ by about 7.04°. This weakens a simple face-scale-only explanation for this set, but it does not eliminate face scale or other capture variables as confounds.

## What FR277 establishes

Bounded to this fixed six-image set:

- the same still images reproduce the same scalar diagnostics across independent runtime executions;
- vertical orientation and screen-space eye tilt show a strong descriptive co-variation;
- the screen-space response magnitude is larger than the FR76 response magnitude in the low-angle contrast;
- FR76 therefore cannot be treated as the sole origin of the observed low-angle shift in this evidence set.

## What FR277 does not establish

FR277 does not establish:

- population generalization;
- a linear response law;
- vertical orientation as the causal variable;
- perspective projection as the causal mechanism;
- MediaPipe landmark inference as the causal mechanism;
- FR76 reconstruction as the causal mechanism;
- a pose or distance acceptance threshold;
- a correction formula;
- capture guidance;
- a replacement for the frozen FR237 eye metric;
- traditional interpretation authority;
- Production or Commerce authority.

## Privacy

The raw six images remain outside Git.

FR277 persists only aggregate scalar evidence. It does not persist per-image scalar rows, raw media, image digests, screen landmarks, metric geometry, pose matrices, provider run references, embeddings, or identity templates.

## Next frontier

The next useful experiment is no longer another front/high/low summary.

The same fixed-image path should transiently decompose each screen-space eye chord into scalar components before the mean angle is formed:

- per-cycle horizontal pixel span;
- per-cycle signed vertical pixel rise;
- per-cycle angle;
- bilateral mean / asymmetry summaries.

Those transient landmarks must still be discarded. Only the scalar chord decomposition may survive.

That experiment can distinguish **which part of the screen-space chord geometry moves with viewpoint** before any capture guidance, metric redesign, threshold, or correction is considered.

decompose_same_fixed_image_screen_space_eye_chords_into_horizontal_and_vertical_scalar_components_ephemerally_before_any_capture_guidance_metric_redesign_or_correction