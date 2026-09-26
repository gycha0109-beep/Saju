# FR300-R1W-ZC — Existing-hardware metric reference feasibility

Watchtower-Track: face-engine

## Decision

The zero-cost existing-hardware fallback is **conditionally feasible**, but no real FR299 source is admitted yet.

Current disposition:

```text
existing hardware
→ CONDITIONAL PASS TO DEVICE PROBE

real FR299 source
→ NOT ISSUED
```

This stage does not assume that any specific phone, depth sensor, stereo rig, LiDAR device, Kinect, ZED, RealSense, or other scanner is owned.

The next step is a runtime capability manifest followed by a **non-human known-dimension calibration probe** for the first eligible lane.

## Why this stage exists

FR300-R1R-ZC intentionally placed existing-hardware capture after the zero-cost public/request datasets and before any paid acquisition.

R1S/R1T/R1U/R1V exhausted or held the zero-cost dataset lanes without producing an FR299-eligible source.

The remaining zero-cost path is therefore to ask a narrower engineering question:

> Can hardware already available to the user produce an independent, empirically validated metric 3D source without purchasing anything?

The answer is **possibly yes**, depending on runtime device capability.

## Lane A — Android Camera2 calibrated hardware depth

Official Android Camera2 documentation states that a camera advertising:

```text
REQUEST_AVAILABLE_CAPABILITIES_DEPTH_OUTPUT
```

can produce depth measurements and must expose:

```text
DEPTH16
lens.poseTranslation
lens.poseRotation
lens.intrinsicCalibration
lens.distortion
depth.depthIsExclusive
```

This makes Camera2 hardware depth a strong candidate for an existing-hardware metric probe.

However, Android does **not** guarantee that an arbitrary device has:

- DEPTH_OUTPUT at all;
- DEPTH_OUTPUT on the front/user-facing camera;
- a color stream from the same camera;
- simultaneous color + depth capture.

The `depthIsExclusive` metadata is important:

```text
false
→ one request may target color + depth

true
→ color and depth must be interleaved
```

Therefore a future manifest must inspect the actual device rather than infer support from Android version or phone class.

### Conditional admission

Camera2 enters the non-human calibration probe only if the actual device exposes:

```text
DEPTH_OUTPUT
DEPTH16
calibration metadata
lens pose
lens distortion
color output
```

For a future direct same-capture FR299 binding, the strongest path is additionally:

```text
lensFacing = user
depthIsExclusive = false
simultaneous color + depth request verified
```

If those same-capture conditions are absent, the source may still be useful after a separately validated registration path, but R1W-ZC does not issue that registration.

## Lane B — ARCore Raw Depth

Google's official ARCore documentation establishes that Raw Depth:

- must be queried for device support at runtime;
- does not require a hardware depth sensor;
- can use available hardware depth such as ToF when present;
- produces sparse raw depth;
- exposes a matching confidence image;
- expresses raw depth in millimeters;
- binds the depth image to the current camera frame;
- is primarily estimated from motion of the world-facing camera.

This makes ARCore Raw Depth a valid **conditional metric-source probe lane**.

It does not make ARCore Raw Depth automatically suitable for the existing front-camera FR251 same-capture lane.

FR272 already identified the direction mismatch:

```text
ARCore Raw Depth
→ world-facing

FR251 RGB selfie lane
→ user-facing
```

Therefore R1W-ZC sets:

```text
sameCaptureRgb3dPotential = false
validatedRegistrationRequiredForFutureFR299 = true
```

for ARCore.

A real FR299 source still requires empirical accuracy/repeatability validation and later correspondence/registration evidence.

## Lane C — existing RGB camera + external calibrated multi-view reconstruction

An already-owned ordinary RGB camera may still be useful if it is not treated as single-frame metric truth.

COLMAP's official documentation supports:

- supplying known camera intrinsics;
- reconstructing multi-view geometry;
- applying a 3D similarity transformation into an external coordinate frame.

That is enough to justify a **conditional external-calibration lane**, but not enough to claim metric truth by default.

The scale boundary is:

```text
multi-view reconstruction
!=
verified metric reconstruction
```

The lane may enter the non-human calibration probe only when:

```text
multi-view capture exists
camera intrinsics are known or calibratable
an external scale anchor exists
the scale anchor is independent of the reconstruction
the reconstruction path is independent of the future RGB candidate provider
```

The reconstruction must then prove accuracy and repeatability on known physical geometry before any face is captured.

This lane maps conceptually to FR272's `external_calibrated_3d_scan` class after calibration is actually verified.

## Negative control — ordinary monocular RGB

A single ordinary RGB image does not provide independent physical metric scale by itself.

Therefore:

```text
ordinary_monocular_rgb_only
→ BLOCKED as FR299 metric truth
```

This prevents the project from silently turning monocular relative geometry, MediaPipe geometry, or another provider-derived shape into the independent benchmark reference.

## Non-human calibration probe

R1W-ZC deliberately prevents the first hardware experiment from using a face.

The first executable probe must use:

```text
non-human known-dimension calibration target
```

Requirements:

1. physical dimensions are known;
2. those dimensions are measured independently of the reconstruction/depth system under test;
3. source accuracy is measured empirically;
4. repeatability is measured empirically;
5. candidate-provider outputs and indices remain hidden;
6. traditional labels remain hidden;
7. no acceptance threshold is invented in this stage.

The next stage should collect descriptive error metrics first.

This stage does not decide what absolute or relative error is acceptable for FR299.

## Device ownership boundary

No concrete device model is source-bound in the project at this stage.

Therefore static code must not claim:

```text
user owns Camera2 DEPTH_OUTPUT phone
user owns ToF
user owns LiDAR
user owns stereo/depth camera
user owns a calibrated external scanner
```

The static contract only defines what must be true **if** a device is presented.

Current gate:

```text
concreteDeviceModelBound = false
runtimeHardwareManifestCollected = false
```

## Operational result

```text
existing-hardware feasibility
  = CONDITIONAL PASS TO DEVICE PROBE

human face capture
  = NO

biometric artifact collection
  = NO

new hardware purchase
  = NO

paid spend
  = 0

FR299 eligible candidate count
  = 0

FR300-R2 eligible candidate count
  = 0

Product
  = 18/29
```

## Sources

### Android Camera2

- https://developer.android.com/reference/android/hardware/camera2/CameraMetadata#REQUEST_AVAILABLE_CAPABILITIES_DEPTH_OUTPUT
- https://developer.android.com/reference/android/hardware/camera2/CameraCharacteristics#LENS_INTRINSIC_CALIBRATION
- https://developer.android.com/reference/android/hardware/camera2/CameraCharacteristics#DEPTH_DEPTH_IS_EXCLUSIVE

### Google ARCore Raw Depth

- https://developers.google.com/ar/develop/depth
- https://developers.google.com/ar/develop/unity-arf/depth/raw-depth
- https://developers.google.com/ar/reference/c/group/ar-frame

### COLMAP

- https://colmap.github.io/faq.html

## Next frontier

```text
FR300-R1X-ZC
Runtime Existing-Hardware Capability Manifest + Non-Human Metric Calibration Probe
```

The first substep is not face capture.

It is:

1. enumerate actual device capabilities;
2. choose the first eligible lane;
3. capture a known-dimension non-human target;
4. measure raw metric error and repeatability;
5. preserve all results as non-biometric calibration evidence;
6. decide only afterward whether that hardware deserves a future FR299 source-validation attempt.

Watchtower-Track: face-engine
