# FR300-R1V-ZC — AST-Face controlled raw metric preflight

Watchtower-Track: face-engine

## Decision

AST-Face's controlled raw-scan lane remains a technically plausible zero-cost reference source, but it is **not admissible to FR299 yet**.

Current disposition:

```text
AST public standardized mesh
→ TERMINAL REJECT for FR299 metric source (R1U-ZC remains authoritative)

AST controlled raw scan
→ HOLD_EXTERNAL_AUTHORITY
```

The hold is narrow. The public evidence supports a controlled raw, pre-topology-standardization 3D source and a synchronized RGB subset, and the inspected GitHub DUA mirror permits academic or industrial R&D when limited to internal analysis and evaluation. The public evidence does **not** source-bind the exact physical unit/export scale of the raw OBJ or an FR299-grade 3D↔RGB correspondence receipt.

No controlled access was requested.

## Sources reviewed

### Peer-reviewed data descriptor

```text
Zhao et al.
A Topology Standardized 3D Facial Dataset with Emotion and Action Unit Diversity for East Asians
Scientific Data (2026)
https://doi.org/10.1038/s41597-026-07098-2
```

Source-bound facts relevant to this preflight include:

- high-resolution facial geometry was acquired with structured-light scanning;
- controlled raw scans are original 3D meshes prior to topology standardization;
- controlled raw geometry is distributed as OBJ;
- synchronized frontal/left/right RGB is available for the 52 participants who provided the additional consent for identifiable modalities;
- the capture setup uses standardized camera/scanner positions and angles and records synchronized multi-view RGB.

The paper does **not** source-bind:

```text
exact scanner model
exact scanner calibration
raw OBJ physical coordinate unit
raw OBJ export-scale semantics
scanner metric accuracy
exact scanner↔RGB extrinsics
exact per-capture 3D↔RGB registration receipt
```

A structured-light origin or a description such as high precision cannot substitute those missing artifact-level facts.

### Official AST-Face repository

```text
https://github.com/zhaopu99/AST-face
```

The official README separates:

```text
public tier
→ topology-standardized, non-textured derived geometry and annotations

controlled tier
→ raw 3D scans
→ textures where consented
→ synchronized multi-view RGB where consented
```

The README also states that the OSF-hosted DUA is the authoritative version and the GitHub copy is a convenience mirror.

### GitHub-mirrored DUA

Inspected repository object:

```text
path:
Data Usage Agreement (DUA) .pdf

blob SHA:
5ab05af1b97cf6f1728e6c4a363414e804a650d7
```

The mirror defines the controlled scope as including raw 3D facial scans and, for the consenting subset, identifiable modalities including textures and synchronized multi-view RGB.

The mirror permits controlled data for legitimate R&D purposes, academic or industrial, when strictly limited to internal analysis and evaluation.

It also prohibits or constrains at least the following relevant activities:

```text
participant re-identification
biometric identification / verification
surveillance
identity-oriented profiling / tracking
training or evaluation of identity-recognition systems
redistribution of controlled files
redistribution of identifiable derivatives
```

Non-identifying aggregate outputs may be published subject to the DUA conditions.

This preflight does **not** convert that bounded internal R&D permission into broad production-runtime reuse authority.

The official README says the OSF-hosted DUA is authoritative. The authoritative OSF file was not byte-compared to the inspected GitHub mirror in this stage, so the rights finding is recorded as:

```text
industrial internal R&D / analysis / evaluation
→ permitted on inspected GitHub mirror

authoritative OSF DUA exact-version equivalence
→ not byte verified
```

## Metric authority gate

FR299 requires an independent 3D source with:

```text
metricScaleVerified = true
```

and later requires registration with:

```text
targetCoordinateFrame = canonical_aligned_right_handed_metric_3d
targetUnit = centimeter
metricScalePreservedOrCalibrated = true
registrationValidated = true
```

AST controlled raw scans being pre-topology-standardization geometry is important because the public standardized-mesh scale-normalization failure from R1U-ZC does not automatically apply to those raw artifacts.

However:

```text
raw / pre-standardization OBJ
!=
verified physical metric OBJ
```

No public source reviewed here binds the exact OBJ coordinates to millimeters, centimeters, meters, or another verified physical unit, and no public source binds an export transform/calibration receipt to the exact controlled artifact.

Therefore:

```text
FR299 metricScaleVerified
= false
```

for this preflight.

This is a HOLD, not a terminal rejection.

## RGB correspondence gate

The synchronized three-view RGB subset is promising because it provides a controlled cross-modal path for 52 additionally consenting participants.

But:

```text
synchronized RGB exists
!=
FR299 correspondenceVerified
```

FR299 requires a verified correspondence receipt with either:

```text
sameCaptureBindingEstablished = true
or
validatedRegistrationBindingEstablished = true
```

The public article establishes synchronized capture and standardized rig geometry, but it does not expose the exact subject/capture-level artifact binding, scanner↔RGB extrinsics, or a validated registration receipt required to set either FR299 binding flag to true.

Therefore the preflight keeps:

```text
sameCaptureBindingEstablishedForFR299 = false
validatedRegistrationBindingEstablishedForFR299 = false
correspondenceVerifiedForFR299 = false
```

## Provider-independent annotation boundary

AST-Face landmarks remain useful for topology/debugging/correspondence research, but they do not become independent FR266 or FR297 truth.

Still forbidden:

```text
AST provider landmark
→ FR266 nasal apex truth

AST provider landmark
→ FR297 nasal bridge-root truth
```

If a controlled raw source later becomes eligible, FR266/FR297 annotations must still be generated through the provider-independent frozen-reference process.

## Operational boundary

This stage performed none of the following:

```text
DUA signature
DUA submission
restricted OSF access request
author contact
controlled raw scan download
controlled RGB download
participant facial artifact inspection
paid spend
production activation
commerce activation
```

Current counters remain:

```text
FR299 eligible candidate count = 0
FR300-R2 eligible count        = 0
Product                         = 18/29
paid spend                      = 0
```

## Reopen conditions

The AST controlled lane may be reopened only when evidence establishes the missing authority, for example:

1. the authoritative OSF DUA version is confirmed for the intended bounded internal validation use;
2. exact raw OBJ physical unit or equivalent artifact-bound metric-scale authority becomes source-bound;
3. scanner/export documentation binds that scale to the exact controlled raw artifact;
4. exact subject/capture-level 3D↔RGB binding or a validated registration receipt is available; and
5. controlled access is separately authorized before any participant artifact is requested or downloaded.

## Next frontier

Without new external authorization, this lane stops here.

Next zero-cost frontier:

```text
FR300-R1W-ZC
Existing-Hardware Metric Reference Feasibility
```

That stage should begin with a non-human known-dimension calibration target and hardware capability inventory, not with facial subject capture.
