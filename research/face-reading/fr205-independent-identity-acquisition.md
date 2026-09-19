# FR205 — Independent Identity Acquisition Gate

Status: `gate_pending`

Issue: #980

## Frozen candidate

FR205 does not choose a new measurement.

It carries forward exactly one candidate selected after FR204:

- measurement: roll-normalized MediaPipe full official face-oval X envelope;
- multiplicative factor: `0.8185802384926992`;
- factor refit: forbidden.

## Required evidence

The preferred validation requires identities unused in FR199–FR204 with both:

1. a 3D scan from which the independent facial-width reference can be derived without MediaPipe;
2. a corresponding frontal RGB image on which the frozen MediaPipe candidate can run.

## AST-Face candidate

Pinned repository:

- `zhaopu99/AST-face`
- commit `02132155adda9fba6853f0c154cc33b57b31fed9`

The repository exposes a public demo containing mesh, texture, and 84 XYZ landmarks, which is useful for pipeline-shape verification.

For the actual cohort, the public tier provides anonymized standardized meshes and landmarks, while raw scans and synchronized RGB/textures for the consenting subset require controlled access through an OSF account and signed DUA.

The public 84-point landmark convention must not be silently redefined as anthropometric zygion. The independent reference must remain separately justified.

## Research oracle boundary

### MICA

Pinned commit: `af22e7a5810d474bc28a1433db533723d6bd2b07`

MICA's repository license restricts the model/software to non-commercial scientific research and explicitly prohibits use in a commercial product/service without separate licensing. It also requires separately obtained FLAME material.

Therefore MICA is research-oracle-only in this track.

### 3DDFA_V2

Pinned commit: `1b6c67601abffc1e9f248b291708aef0e43b55ae`

The repository code is MIT, but the bundled modified BFM2009 asset is documented as academic-only and requires a commercial BFM license for commercial use.

Therefore the current bundled runtime is research-oracle-only.

## Gate

The executable receipt must verify the pinned source/access/license statements before FR205 claims that an independent validation path is runnable.

Until controlled paired RGB + scan access exists:

```text
independentIdentityValidationComplete=false
calibrationAuthorized=false
productionAuthorized=false
commerceAuthorized=false
```
