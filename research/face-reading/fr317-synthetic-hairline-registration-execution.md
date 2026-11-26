# FR317 — Synthetic same-capture hairline registration execution

Status: synthetic execution paths implemented; no real registration authority issued

Watchtower-Track: face-observation-engine

## Purpose

FR317 executes the two registration paths admitted by FR316 using deterministic synthetic same-capture fixtures.

The goal is to verify that the mapping code can recover known canonical metric XY truth without broadening authority.

Synthetic success is implementation evidence only.

It is not real-world hairline registration evidence.

## Path A — calibrated surface execution

The calibrated synthetic fixture defines:

- a canonical metric plane at known positive Z;
- exact normalized pinhole intrinsics;
- identity RGB-to-metric extrinsics;
- identity released-image transform;
- known canonical metric XY truth points.

Forward projection uses:

`u = cx + fx * x / z`

`v = cy - fy * y / z`

The sign difference preserves the source image convention `y-down` while the canonical metric frame remains `y-up`.

Execution then inverse-projects:

`x = (u - cx) * z / fx`

`y = (cy - v) * z / fy`

The recovered metric XY values must match known synthetic truth within the FR317 floating-point self-test tolerance.

Projected points outside the normalized image frame fail closed.

## Path B — independent correspondence execution

The independent synthetic fixture uses:

- exactly three non-collinear fit correspondences;
- at least two held-out correspondences;
- at least two hairline query points;
- known canonical metric XY truth.

The executor uses barycentric coordinates in the fit-source triangle.

This is a deterministic affine synthetic solver.

Held-out correspondences must:

- remain inside the validated fit envelope;
- reproduce known metric truth within synthetic tolerance.

Hairline query points must also remain inside the validated correspondence envelope.

Any extrapolation outside that envelope fails the synthetic execution.

## Synthetic numeric tolerance

FR317 uses:

`1e-9 cm`

only as a deterministic floating-point implementation self-test tolerance.

This value:

- is not a real registration acceptance threshold;
- is not a production calibration threshold;
- is not a model quality threshold;
- must not be reused to admit real evidence.

A real method must preregister acceptance criteria appropriate to its actual acquisition and registration regime.

## FR316 prerequisite

The synthetic executor accepts only an FR316 assessment that is already:

- `artifactClass = synthetic_fixture`;
- exact same-capture bound;
- exact metric scale authority complete;
- selected registration evidence complete;
- visible hairline support region verified;
- eligible for local metric mapping execution.

A real-local assessment cannot be passed into the synthetic executor.

## Repository-safe output

The synthetic execution receipt may expose only:

- method;
- synthetic-only marker;
- pass/fail;
- recovered point count;
- held-out/envelope/ground-truth validation state.

It does not expose:

- raw source points;
- recovered subject coordinates;
- intrinsics/extrinsics;
- correspondences;
- source-image digest;
- metric-support geometry.

## Authority boundary

Even when both FR317 paths pass:

- real registration authority remains false;
- real hairline metric coordinate remains unissued;
- image-to-metric bridge remains unissued;
- actual neutral-reference capability remains 6 / 7;
- common frame remains incomplete;
- mixed-frame span remains blocked;
- Three-Divisions span execution remains false;
- traditional binding remains absent;
- Product remains 18 / 29;
- Production remains false;
- Commerce remains false.

## Next

After both synthetic execution paths are validated through CI, FR318 may define a real-local execution receipt contract.

FR318 must still fail closed when actual FR313/FR314/FR316 evidence is absent and must not fabricate real registration evidence.
