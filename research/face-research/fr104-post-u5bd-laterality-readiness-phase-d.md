# FR104 Phase D — post-U5B-D laterality readiness reconciliation

Issue: #1810

## Purpose

U5B-D changed the laterality evidence state materially.

Before U5B-D, the anatomical mapping skeleton remained blocked because the
exact MediaPipe release did not provide an admissible direct subject-anatomical
meaning for its published LEFT/RIGHT topology names.

U5B-D does not make those provider names anatomical authority.

Instead, it admits an independent cross-source result:

- direct anatomical semantics from the pinned Google GNM source names
  `left_eye` and `right_eye`;
- a provider-blind deterministic GNM fixture;
- an exact eight-case reflection-parity experiment on
  `@mediapipe/tasks-vision@0.10.35`;
- exact replay of the supported result.

The admitted U5B-D result is:

    result SHA-256
    7c284cad3b467676e20c44ebf63a7aee3dc66c5d22534363286ef532ba3852fe

    state
    gnm_cross_source_geometric_mapping_supported

    merge
    0faa31580d0d472f6728da25d5c65c659c0abefa

## What is now cleared

The following blockers are no longer current:

- no independent anatomical semantic witness;
- no independent cross-source provider/anatomy geometric validation;
- no bounded provider mirror evidence.

The exact MediaPipe source-label conflict remains historically real, but it no
longer needs to be resolved by declaring provider LEFT/RIGHT names anatomical.

Provider-published side names therefore remain non-authoritative.

## What is still blocked

Runtime anatomical laterality is still unavailable.

The remaining problem is capture provenance, not cross-source geometry.

A runtime subject image must still establish:

1. the exact reviewed MediaPipe runtime;
2. a governed capture-transform receipt;
3. known EXIF application state;
4. the same consumer frame for Florence and FaceLandmarker;
5. independent same-pixel verification;
6. resolved consumer-frame reflection parity;
7. subject-relative source-pixel mirror provenance;
8. a verified controlled-capture profile or equivalent governed evidence.

Ordinary file upload cannot satisfy item 7 merely from the decoded pixels,
preview appearance, EXIF absence, image-space X sign, or provider side names.

## Why the mapping skeleton still returns unknown

The mapping skeleton now consumes U5B-D as the admitted provider/anatomy
cross-source evidence.

Therefore it no longer emits:

    anatomical_semantic_witness_not_admitted

when U5B-D is present.

It still returns:

    anatomicalSide = unknown

because the active runtime request does not yet carry verified
subject-relative source-pixel mirror provenance.

The current explicit blocker is:

    subject_relative_capture_mirror_provenance_unavailable

and the mapping remains unadmitted for runtime use.

## Controlled capture boundary

FR21b already defines the correct evidence model:

- deterministic asymmetric calibration target;
- front/rear camera facing;
- preview/raw/encoded/canonical stages;
- saved-pixel mirror policy;
- canonicalization transform;
- final subject-anatomical laterality assertion.

However its current repository authority remains:

    controlledCaptureState = not_implemented
    calibrationState = design_only
    anatomicalLateralityState = blocked
    productionReady = false

No file upload may impersonate a controlled-capture profile.

## Current authority

Admitted:

    gnmCrossSourceSemanticWitnessAudited = true
    gnmCrossSourceFixtureDigestPinned = true
    gnmCrossSourceGeometricValidationExecuted = true
    gnmCrossSourceGeometricMappingValidated = true

Still false:

    providerLabelMappedToAnatomicalSide
    globalProviderAnatomicalSemanticsEstablished
    anatomicalReferenceAdmitted
    anatomicalLateralityAuthorized
    validatedExternalEarObservationAuthorized
    traditionalBindingAuthorized
    productionAuthorization

## Next gate

    FR104_PHASE_D_CONTROLLED_CAPTURE_MIRROR_PROVENANCE

Implement and verify a subject-relative controlled-capture mirror provenance
path, then bind that verified result to the admitted U5B-D cross-source
mapping.

Unknown or ordinary-file-upload provenance must continue to fail closed.

Watchtower-Track: face-observation-engine
