# FR300-R2B-PAR — AST-Face Public Authority Resolution

Watchtower-Track: face-engine

## Decision

Public authority has been exhausted for the three remaining AST-Face pre-acquisition questions.

Canonical disposition:

```text
public_authority_exhausted_controlled_intake_may_resolve
```

AST remains scientifically promising, but controlled access is neither scientifically justified **yet** nor operationally authorized.

## DUA authority

Official AST repository states:
- OSF-hosted DUA is authoritative.
- GitHub DUA is only a convenience mirror.

Prior inspection bound the GitHub mirror blob SHA:

`5ab05af1b97cf6f1728e6c4a363414e804a650d7`

The mirror permits bounded academic/industrial internal analysis and evaluation while forbidding biometric identification, verification, surveillance, controlled-file redistribution, and similar identity uses.

This stage could not verify the authoritative OSF bytes or semantic equivalence against the mirror.

Therefore:

```text
authoritative rights gate = unresolved
DUA state = public_evidence_exhausted
```

The mirror is not promoted to authoritative identity.

## Raw metric authority

Scientific Data documents:
- commercially available structured-light scanning equipment;
- a high-precision 3D face scanner;
- original raw scans under controlled access.

The public sources do **not** bind:
- scanner make/model;
- scanner calibration;
- scanner accuracy;
- raw OBJ physical coordinate unit;
- raw OBJ export-scale semantics.

AST `01_icp.py` additionally proves that the processing pipeline:
1. parses source and target OBJ vertices;
2. normalizes both point clouds to unit spheres;
3. optionally estimates similarity scale;
4. denormalizes aligned output into target scale.

This processing logic cannot prove raw physical scale.

The upstream FLAME fitting default `scan_unit='m'` is not AST raw-unit evidence because AST's own Step 03 documentation does not source-bind that default to the raw controlled artifacts.

Metric authority:

```text
M1_device_class_metric_capable
M2 = false
M3 = false
FR299 metricScaleVerified = false
```

## RGB ↔ raw-3D pairing

Scientific Data documents:
- baseline neutral 3D scan and synchronized multi-view RGB acquired together;
- frontal/left/right RGB captured simultaneously;
- scanner and RGB rigs at standardized positions and angles;
- spatial alignment across modalities;
- unified file naming convention.

Public sources do not expose:
- controlled artifact filenames;
- controlled manifest;
- scanner↔RGB extrinsics;
- exact per-file 3D↔RGB binding receipt.

Therefore:

```text
P2_same_neutral_acquisition_condition
P3 = false
FR299 correspondenceVerified = false
```

Temporal synchronization, same subject, and unified naming do not independently establish exact spatial correspondence.

## Registration feasibility

Candidate-independent registration remains technically feasible after controlled intake, but it has not been executed or validated.

No AST dataset landmark may become FR266 or FR297 truth.

## Minimum pilot intake contract

If a later stage is explicitly authorized, the minimum useful pilot requires:
- neutral raw 3D OBJ;
- corresponding frontal RGB;
- subject/capture manifest or equivalent pairing metadata;
- scanner export-unit or metric-scale metadata.

Optional:
- left/right RGB;
- scanner↔RGB extrinsics;
- textured neutral mesh.

Raw controlled facial artifacts may not enter Git or Git LFS.

## Access readiness

```text
scientificallyPromising = true
controlledIntakeMayResolveRemainingTechnicalAuthority = true
controlledAccessScientificallyJustifiedNow = false
controlledAccessOperationallyAuthorized = false
```

Why not justified yet:
- authoritative DUA terms remain unverified;
- metric authority is only M1, not M3;
- pairing authority is only P2, not P3.

## Public search exhaustion

Inspected:
- Scientific Data article;
- official AST repository README/tree;
- Step 01 ICP implementation;
- Step 03 FLAME-fitting documentation;
- pipeline overview;
- GitHub DUA mirror metadata;
- public searches for scanner model, physical units, export scale, controlled manifest, extrinsics, and exact pairing.

No public source closed the missing M3/P3 or authoritative-DUA identity.

## Current authority boundary

```text
controlled access requested = false
DUA signed/submitted = false
external contact = false
participant artifact download/inspection = false
paid spend = 0

FR299 = 0
FR300-R2 = 0
Product = 18/29
production = inactive
commerce = inactive
```

## Next action

Without new external authorization, the remaining useful action is limited to reviewing the **authoritative OSF DUA** if it becomes obtainable without submission.

Otherwise AST remains HOLD until explicit controlled-access authorization.

A later authorized intake should use the minimum pilot contract above, not download the full dataset.

Watchtower-Track: face-engine
