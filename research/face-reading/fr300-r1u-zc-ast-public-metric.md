# FR300-R1U-ZC — AST-Face public standardized mesh metric qualification

Watchtower-Track: face-engine

## Decision

AST-Face's **public topology-standardized meshes are not admissible as FR299 physical metric 3D source artifacts**.

This is a terminal rejection of the public standardized-mesh lane only. It is **not** a terminal rejection of AST-Face as a whole, because the original raw 3D scans exist in a separate controlled-access tier and have not been qualified here.

Current state:

```text
public standardized mesh
→ TERMINAL REJECT for FR299 metric source

controlled raw scan
→ HOLD / unqualified
```

## Why the public mesh fails the FR299 metric requirement

The peer-reviewed dataset paper explicitly states that raw meshes are aligned to a canonical coordinate system with ICP and **normalized in scale** before the later topology-standardization stages.

The official AST-Face processing repository makes the scale operation concrete. In `01_icp.py`:

1. the source point cloud is centered and divided by its maximum radius, producing a unit-sphere representation;
2. the target point cloud is independently normalized;
3. ICP runs in normalized space;
4. the aligned source is denormalized using the **target** centroid and scale.

The source centroid/absolute source scale are therefore not the output scale authority.

That is acceptable for topology/shape standardization, but it does not satisfy FR299, which requires:

```text
source.metricScaleVerified = true
registration.metricScalePreservedOrCalibrated = true
targetUnit = centimeter
```

Therefore:

```text
public OBJ coordinate
!=
raw scanner physical unit
```

and the public standardized mesh cannot be promoted merely because it originated from a structured-light 3D scan.

## Derived geometry is still useful, just not for this authority

The public tier is useful for topology correspondence, shape modeling, expression deformation, landmarks, and other non-metric tasks.

Its rejection here is narrow:

> do not use the public standardized mesh as the independent physical metric 3D ground truth required by FR299.

No claim is made that the standardized mesh has no geometric value.

## Public vs controlled data

Public tier:

```text
topology-standardized non-textured meshes
84-point landmarks
deformation fields
AU / expression metadata
```

Controlled tier:

```text
raw 3D scans
textured meshes where consented
synchronized multi-view RGB where consented
```

The paper states that all 98 participants consented to release of anonymized non-textured derived data. Identifiable modalities require additional consent.

This does **not** by itself source-bind commercial product-development reuse rights for the public tier.

Raw scans require a DUA and controlled access. This track did not request access, sign/send a DUA, contact authors, or inspect/download participant raw geometry.

## Controlled raw scan remains a possible but unqualified lane

A raw structured-light scan could potentially provide the independent 3D geometry FR299 needs, but only after separate evidence establishes at minimum:

```text
exact raw artifact identity
physical coordinate unit / scale authority
metric-scale survivability
same-capture or validated RGB correspondence
participant / DUA / product-development rights
provider-independent FR266 tip annotation
provider-independent FR297 bridge-root annotation
external canonical registration
```

None of those are granted by the existence of the controlled tier.

## Operational result

```text
AST public mesh FR299 eligibility = NO
AST controlled raw eligibility    = unresolved / HOLD
FR299 eligible candidate count    = 0
FR300-R2 eligible count           = 0
Product                           = 18/29
paid spend                        = 0
controlled access requested       = NO
```

## Next frontier

Without requesting controlled data, the next bounded step is either:

1. review the publicly available AST-Face DUA and any raw-scan unit documentation to determine whether the controlled path is even eligible for commercial product-development validation; or
2. move to the existing-hardware metric-reference feasibility lane.

No DUA submission or author contact is authorized by this track.
