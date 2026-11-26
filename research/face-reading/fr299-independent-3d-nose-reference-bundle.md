# FR299 — Independent 3D nose reference bundle

Watchtower-Track: face-engine

## 1. Purpose

FR298 freezes the neutral scalar definition for `nose.tip_bridge_relative_projection`, but a formula is not a real benchmark reference.

FR299 defines the fail-closed bundle required to turn independently acquired 3D evidence into one traceable descriptive reference artifact.

The bundle binds:

1. independent 3D source provenance;
2. external canonical-registration provenance;
3. RGB/reference correspondence provenance;
4. a frozen FR266 nasal-apex annotation;
5. a frozen FR297 nasal bridge-root annotation;
6. the FR298 scalar derived only after those checks.

FR299 does not manufacture a subject sample.

## 2. Registration authority audit

The repository was audited before defining the bundle.

### FR77 / FR257

The existing `canonical_aligned_right_handed_metric_3d` runtime geometry is derived from the MediaPipe geometry pipeline.

That path is useful for candidate-side governed geometry, but it cannot become the independent 3D benchmark truth or the authority that registers benchmark truth into the canonical frame.

Using it for both candidate and truth would violate the provider-independence boundary.

### FR264 / FR265

FR264 records that cross-frame conversion/registration authority was not issued.

FR265 later issues a full-face neutral canonical metric 3D -> XY projection rule. It does not issue an external independent-3D -> canonical 3D registration transform.

### FR272

FR272 is explicit:

- independent 3D source preflight does not issue a canonical registration transform;
- source accuracy and repeatability remain to be validated;
- a post-freeze registration bridge is required before the independent reference can enter the existing canonical frame.

Therefore FR299 cannot responsibly invent a transform.

## 3. FR299 decision

FR299 requires an **external validated canonical-registration receipt** as input.

The receipt must bind the exact independent 3D source artifact and must contain:

- source artifact reference and SHA-256 digest;
- source coordinate-frame reference;
- target frame `canonical_aligned_right_handed_metric_3d`;
- target unit `centimeter`;
- registration method reference;
- registration artifact SHA-256 digest;
- registration validation reference;
- verified metric-scale preservation/calibration;
- candidate-provider independence;
- no candidate-provider output or indices used during registration;
- no traditional labels used during registration;
- registration frozen before reference derivation and before RGB candidate scoring.

FR299 validates this receipt. It does not generate the registration transform.

## 4. Independent 3D source provenance

The source class must remain inside the FR295 reference lane:

- `independent_calibrated_3d`, or
- `independent_validated_depth`.

The source must have:

- dataset reference;
- subject reference;
- capture reference;
- 3D artifact reference;
- SHA-256 artifact digest;
- verified metric scale;
- independence from the future RGB candidate provider.

Candidate-provider output and indices cannot be used as the independent reference.

## 5. RGB/reference correspondence

A future RGB candidate must be compared against the correct independent 3D reference.

FR299 therefore freezes an RGB/reference correspondence receipt before candidate scoring.

It requires:

- an opaque RGB observation reference;
- a correspondence-validation reference;
- either same-capture binding or validated registration binding;
- verified correspondence;
- candidate output hidden during binding;
- traditional labels hidden during binding.

This does not issue an RGB candidate. It only makes the future comparison traceable.

## 6. Frozen annotations

The bundle constructor receives two frozen annotation artifacts.

### Tip

The tip must satisfy FR266:

`most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d`

### Bridge root

The bridge root must satisfy FR297:

`point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end`

Both annotations must bind the exact subject and exact independent 3D capture declared by the bundle source.

FR299 deliberately narrows the first executable bundle to one 3D source capture for both points. It does not use FR298's broader cross-capture option for the two landmark points.

## 7. Reference derivation

Only after source, registration, correspondence, annotation provenance, subject, capture, and freeze checks pass does FR299 call the FR298 derivation.

The persisted descriptive scalar remains:

`abs(tip.z - bridgeRoot.z) / euclideanDistance3D(tip, bridgeRoot)`

with:

- output unit `ratio`;
- range `[0,1]`;
- no anatomical positive-Z sign claim;
- no physical millimeter product-output claim.

## 8. Persistence/privacy boundary

A materialized FR299 bundle persists:

- opaque source references;
- source 3D artifact digest;
- registration references/digest;
- RGB observation reference;
- annotation artifact references/digests;
- the derived FR298 scalar.

It does not persist inside the bundle:

- raw 3D mesh;
- raw RGB image;
- raw tip/root coordinates.

The annotation coordinates are consumed ephemerally by the constructor and remain governed by their own frozen annotation artifacts.

## 9. Fail-closed cases

The bundle is rejected when, among other cases:

- a digest is invalid;
- the registration receipt does not bind the exact 3D artifact;
- registration is not externally validated;
- metric scale is not verified;
- candidate-provider output or indices entered registration/reference construction;
- RGB/reference correspondence is neither same-capture nor validated-registration bound;
- tip/root subject differs from the source subject;
- tip/root capture differs from the source 3D capture;
- the FR266 or FR297 annotation contract is violated;
- the reference is not frozen before candidate scoring.

## 10. Authority boundary

FR299 issues no:

- external registration transform;
- real subject evidence from static code;
- RGB candidate;
- benchmark winner;
- acceptance threshold;
- calibration;
- classifier;
- traditional interpretation;
- product-column materialization;
- Production activation;
- Commerce activation.

The product matrix remains 18/29.

## 11. Next frontier

FR299 makes the next blocker concrete.

FR300 should qualify and ingest a **real independent RGB + 3D source sample**, produce the external registration receipt and frozen annotation artifacts outside the candidate-provider path, then execute the FR299 constructor to materialize the first real reference bundle.

The first FR300 cohort should validate the reference-manufacturing pipeline before any large benchmark:

1. source provenance and licensing;
2. RGB/3D correspondence;
3. canonical registration;
4. provider-blind annotation;
5. repeat annotation on a small subset;
6. FR299 bundle materialization;
7. deterministic FR298 scalar reproduction.

No RGB estimator should be admitted before this reference pipeline is demonstrated with real evidence.

Watchtower-Track: face-engine
