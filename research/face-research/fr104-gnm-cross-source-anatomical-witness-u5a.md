# FR104 U5A — GNM cross-source anatomical witness audit

Issue: #1810  
Watchtower-Track: face-observation-engine

## Purpose

U4B-C established a bounded prospective result on a second MakeHuman geometry:

    prospectiveIndependentGeometryValidationExecuted = true
    prospectiveIndependentGeometryMappingValidated = true

That result still belongs to the MakeHuman source family.

U5A begins the next gate:

> identify and audit a left/right anatomical witness from a source family
> independent from both MakeHuman and MediaPipe.

The selected source is the Google GNM Head model already pinned and governed by FR100.

U5A does not authorize runtime subject-photo anatomical laterality.

## Existing governed GNM asset

FR100 already pins:

    repository
    google/GNM

    upstream commit
    fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690

    asset
    gnm/shape/data/versions/v3_0/gnm_head.npz

    git blob
    ae49903ad7d50ce1d64e464a0407441f2781873c

    expected bytes
    53305389

    license
    Apache-2.0

This source family is independent from:

- MakeHuman;
- MediaPipe FaceLandmarker.

The existing FR100 GNM ear reference remains provider-derived and is not silently reclassified as provider-independent.

## Direct source semantic witnesses

U5A uses source naming rather than image-space orientation.

Pinned Google GNM source witnesses at the exact FR100 commit:

### Data schema

    gnm/shape/gnm_data_schema.py
    blob 7e6caa3532a4b71ec8e41d02c67d4daf9ab8c38e

The schema declares model attributes including:

- joint_names;
- template_joint_positions;
- vertex_group_names.

### NumPy implementation tests

    gnm/shape/gnm_numpy_test.py
    blob a2a68e526bbe071c94bd4fdb240c837d36e13b85

For the GNM Head variant the source directly identifies the eye joints as:

    left_eye
    right_eye

These names are treated only as a direct source semantic witness candidate.

No MediaPipe LEFT/RIGHT label participates in this source naming.

### Data loader

    gnm/shape/gnm_data_loader.py
    blob f00429a7afacccaa1ce123d66e98dcc21690e2db

The loader treats joint_names and vertex_group_names as standardized GNM model attributes.

## U5A-A preregistration

This PR freezes the live NPZ audit before the NPZ is fetched for U5A.

U5A-A must not:

- download gnm_head.npz;
- observe the actual left_eye/right_eye joint indices;
- observe the actual template joint coordinates;
- use GNM X-axis ordering to assign semantic side;
- run MediaPipe;
- render a GNM fixture;
- compare GNM geometry to the U4B provider result.

Current authority state:

    preregistered_source_witness_audit_not_executed

## Frozen U5A-B live audit

After U5A-A merges, U5A-B may fetch only the already-pinned FR100 NPZ.

The live audit requires these NPZ keys:

    version
    variant
    joint_names
    template_joint_positions
    vertex_group_names

Required normalized variant:

    head

Required joint names:

    left_eye
    right_eye

Each required eye joint must occur exactly once.

The matching template joint positions must:

- contain exactly three coordinates;
- contain only finite values;
- be distinct from one another.

For compatibility with the existing FR100 reference context, these provider groups must also exist:

    ears
    left
    right

The provider-group names do not define left/right joint semantics.

## Scientific states

The preregistered live-audit states are:

- gnm_direct_left_right_joint_witness_supported
- gnm_direct_left_right_joint_witness_refuted
- gnm_direct_left_right_joint_witness_unresolved

Supported requires the full frozen witness contract.

An explicit contradiction is refutation.

Missing/unreadable evidence without contradiction is unresolved.

No post-observation retuning is permitted.

## Semantic-authority boundary

The following are forbidden as semantic-side authority:

    image-space X sign
    GNM joint X ordering
    MediaPipe provider LEFT/RIGHT labels

The only U5A semantic-side witness under audit is:

    exact Google GNM source naming
    left_eye / right_eye

Any observed X ordering may be recorded diagnostically only.

## U5A-A CI boundary

CI may:

- typecheck/build Face Reading;
- run synthetic U5A protocol/assessor tests;
- Python-compile the future live auditor.

CI must not:

- run fetch_gnm_head.py for U5A;
- invoke audit_fr104_gnm_anatomical_witness.py on a live NPZ;
- emit a live U5A result digest.

## Authority

U5A-A keeps all new authority false:

    gnmCrossSourceSemanticWitnessAudited = false
    gnmCrossSourceGeometricValidationExecuted = false
    providerLabelMappedToAnatomicalSide = false
    globalProviderAnatomicalSemanticsEstablished = false
    anatomicalReferenceAdmitted = false
    anatomicalLateralityAuthorized = false
    validatedExternalEarObservationAuthorized = false
    traditionalBindingAuthorized = false
    productionAuthorization = false

## Next gate

After U5A-A merges:

    U5A-B
    = fetch exact FR100 GNM Head NPZ
    → verify byte length and git blob
    → audit exact joint_names/template_joint_positions
    → record direct-source left/right witness candidate
    → admit only bounded GNM cross-source semantic witness if supported

Even a successful U5A-B does not authorize subject-photo laterality.

A later cross-source geometric validation must still test the already-frozen mapping against a deterministic GNM-derived controlled fixture.
