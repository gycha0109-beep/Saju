# FR104 U5B-A — Google GNM cross-source geometric validation preregistration

## Scope

U5B-A freezes the independent source-family geometric validation protocol before any new Google GNM render or MediaPipe observation is used for the mapping test.

This stage is preregistration only.

U5B-A MUST NOT:

- execute the target GNM render;
- observe a target render digest;
- execute MediaPipe against the target GNM render;
- observe provider landmark outputs or case costs;
- retune the camera, provider landmark selection, transform matrix, cost rule, or acceptance rule from U5B observations;
- promote anatomical laterality, traditional binding, or production authority.

The intended sequence is:

    U5A-B2 semantic witness admission
    -> U5B-A protocol freeze
    -> U5B-B render-only deterministic fixture/digest and projected-anchor pin
    -> U5B-C first eight-case MediaPipe observation
    -> U5B-D exact replay and bounded admission

## Predecessor

U5A-B2 merged as:

    PR #1954
    merge 1abdec05f7c0204d25503b4400fdd487a187d548

The admitted candidate result is:

    SHA-256
    7eac8cb7b030fed200cf6d4b7d8406901449f130deb3b44c7ef2b98a79b6cd21

    state
    gnm_direct_left_right_joint_witness_supported

The only newly admitted authority from U5A-B2 is:

    gnmCrossSourceSemanticWitnessAudited = true

The exact direct-source semantic anchors are:

    left_eye
    joint index 2
    [0.030839037150144577,
     0.30316492915153503,
     0.09888789802789688]

    right_eye
    joint index 3
    [-0.030866222456097603,
      0.3031134307384491,
      0.09897840023040771]

Semantic side authority comes from the direct GNM source joint names only.

GNM X sign/order, image X sign, and MediaPipe LEFT/RIGHT symbols do not establish anatomical side.

## Frozen source asset

U5B uses the exact already-pinned FR100/U5A asset:

    repository
    google/GNM

    commit
    fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690

    path
    gnm/shape/data/versions/v3_0/gnm_head.npz

    git blob
    ae49903ad7d50ce1d64e464a0407441f2781873c

    byte length
    53305389

    variant
    head

Geometry arrays:

    template_vertex_positions
    triangles

Semantic-anchor arrays:

    joint_names
    template_joint_positions

The governed coordinate convention remains:

    right-handed
    +Y up
    +Z forward
    meter

## Renderer and camera preregistration

U5B-B will implement a deterministic bounded CPU triangle rasterizer over the exact GNM template geometry.

Frozen output:

    PNG
    RGB8
    1024 x 1024

Frozen material/background values reuse the U4B deterministic rasterizer:

    material RGB [198,151,127]
    background RGB [32,32,32]

Lighting also reuses U4B:

    symmetric camera-frontal flat Lambert
    ambient 0.35
    diffuse 0.65

No crop, resize, EXIF transform, post-render rotation, or post-render mirror is allowed.

### Camera

The camera is not tuned from U5B output.

U5B reuses the existing GNM full-head framing convention already present in:

    tools/face-geometry/gnm/build_gnm_head_scene.py

The camera center is the midpoint of the complete GNM template XYZ bounds.

The view is frontal with the camera on positive Z looking toward the bounds center.

Screen axes are:

    right = +X
    up = +Y

Orthographic span is frozen as:

    max(full_template_span_y * 1.24,
        full_template_span_x * 1.34)

This replaces the earlier design candidate of introducing a new 1.05 padding constant. No new padding constant is introduced after inspecting the existing repository framing convention.

If the frozen framing later fails provider eligibility, U5B-C remains unresolved. The camera MUST NOT be retuned after provider observation.

## Ground-truth projection

The exact U5A left_eye and right_eye 3D anchors must be projected through the exact same camera used for the rendered fixture.

Required invariants:

- same camera matrix as rendered fixture;
- direct projection and matrix projection must agree;
- projected anchors must be finite and inside the normalized image frame;
- provider landmarks do not derive the ground truth;
- provider labels do not derive the ground truth;
- image-space X sign does not derive semantic side;
- GNM X ordering does not derive semantic side.

## Provider extraction

MediaPipe remains frozen to:

    @mediapipe/tasks-vision 0.10.35
    running mode IMAGE
    numFaces 1
    expected landmark count 478

U5B reuses the U4B provider-eye extraction unchanged:

    FR24_EYE_TOPOLOGY_WITNESS_EDGES
    FACE_LANDMARKS_LEFT_EYE
    FACE_LANDMARKS_RIGHT_EYE

Each provider eye point is the mean XY of the unique vertices in the existing eye edge set.

No new landmark selection is authorized.

The provider symbol names remain provider labels only and are not anatomical authority.

## Frozen transform matrix

Transform order:

    horizontal mirror
    then clockwise physical rotation

Cases:

| id | mirror | physical rotation | provider compensation | parity |
| --- | --- | ---: | ---: | --- |
| R0 | false | 0 | 0 | orientation_preserving |
| R90 | false | 90 | 270 | orientation_preserving |
| R180 | false | 180 | 180 | orientation_preserving |
| R270 | false | 270 | 90 | orientation_preserving |
| M0 | true | 0 | 0 | orientation_reversing |
| M90 | true | 90 | 270 | orientation_reversing |
| M180 | true | 180 | 180 | orientation_reversing |
| M270 | true | 270 | 90 | orientation_reversing |

Returned provider coordinates and anatomical ground truth are explicitly inverse-rotated back to the canonical frame.

A mirror changes screen coordinates but does not swap anatomical semantic identity.

## Frozen cost and decision rule

For each available case:

    directCost =
      d(providerLeft, anatomicalLeft)
      + d(providerRight, anatomicalRight)

    swappedCost =
      d(providerLeft, anatomicalRight)
      + d(providerRight, anatomicalLeft)

Orientation-preserving cases require:

    directCost < swappedCost

Orientation-reversing cases require:

    swappedCost < directCost

There is:

- no numeric acceptance threshold;
- no aggregate override;
- no post-observation retuning.

Decision states are frozen as:

    gnm_cross_source_geometric_mapping_supported
    gnm_cross_source_geometric_mapping_refuted
    gnm_cross_source_geometric_mapping_unresolved

Rules:

- any explicit failed available case -> refuted;
- no failed case but at least one unavailable case -> unresolved;
- all eight available and passing -> supported;
- a tie fails the strict inequality and therefore refutes the available case.

## Fail-closed conditions

U5B must fail closed on:

- pinned asset provenance or digest drift;
- variant other than head;
- malformed or non-finite geometry;
- triangle index outside the vertex array;
- drift of the exact U5A semantic eye anchors;
- degenerate complete-template bounds;
- projected semantic anchor outside the normalized frame;
- repeated render byte mismatch;
- pinned PNG digest mismatch after U5B-B admission;
- provider face count other than exactly one;
- provider landmark count other than 478;
- invalid normalized provider point;
- unknown transform;
- missing or duplicate eight-case entry;
- reflection parity drift;
- unavailable case carrying numeric costs;
- post-observation camera or rule retuning.

## Authority boundary after U5B-A

The predecessor semantic witness remains admitted:

    gnmCrossSourceSemanticWitnessAudited = true

The following remain false:

    gnmCrossSourceGeometricValidationExecuted
    gnmCrossSourceGeometricMappingValidated
    providerLabelMappedToAnatomicalSide
    globalProviderAnatomicalSemanticsEstablished
    anatomicalReferenceAdmitted
    anatomicalLateralityAuthorized
    validatedExternalEarObservationAuthorized
    traditionalBindingAuthorized
    productionAuthorization

U5B-A therefore does not authorize any user-photo laterality, traditional physiognomy interpretation, or production behavior.

## Next gate

    U5B-B
    RENDER_ONLY_PIN_GNM_CROSS_SOURCE_FIXTURE_DIGEST_WITHOUT_PROVIDER_EXECUTION

U5B-B may render the exact frozen target and pin its deterministic digest and projected semantic anchors.

MediaPipe execution remains forbidden until U5B-C.


## U5B-B first render-only execution and fixture admission

The first prospective U5B-B render-only execution ran from:

    PR #1986
    head bd9618c826f6c4c51007614f0cb9d59370bc297f
    workflow run 37005790974

The exact staged GNM geometry was:

    vertex count
    17821

    triangle count
    35324

    staged vertex SHA-256
    8dce4419d465a79a13ecc6286d75891ce5730d8292bfbedae977bda004cdbf45

    staged triangle SHA-256
    8340922b49e0a8a5520748e4f42e02a48ed5ab3c8441d0f1d4c06893cf30dd0d

The observed complete-template bounds were:

    min
    [-0.12777356803417206,
      0.06556179374456406,
     -0.09221039712429047]

    max
    [0.127635657787323,
     0.40711015462875366,
     0.14650166034698486]

The frozen framing rule therefore produced orthographic span:

    0.4235199674963951

The first provider-blind render reproduced byte-for-byte within the same execution.

Pinned PNG SHA-256:

    1af28c1677375f5551e3613bbc7e0d78bfba83e74df2438c0819a343252cc325

First render-only candidate result SHA-256:

    a994a3708cb4247d93f2a9ddda46129a55c3a9ba0e3d9f86853fab4d53469528

After pinning the PNG digest, exact replay produced result SHA-256:

    528b4756abad1af67849b0fb6eafe8c5bc2e8cd952044b6f7a151df41ae3f427

Raster diagnostics:

    rasterized triangles
    35324

    foreground pixels
    305582

The exact same-camera projected semantic anchors are:

    anatomical left_eye
    x = 0.5729788313318006
    y = 0.34220589324293194

    anatomical right_eye
    x = 0.4272826083862617
    y = 0.342327489429743

The maximum direct-vs-matrix projection discrepancy is:

    5.551115123125783e-17

This discrepancy is below the preregistered projection-consistency rejection bound of 1e-12 and arises only from floating-point evaluation order. It is not a fitted tolerance and does not alter the frozen geometric mapping rule.

No provider package was imported or executed. No provider landmarks, provider side labels, direct/swapped costs, or eight-case outcome were observed in U5B-B.

### U5B-B bounded authority

U5B-B admits only:

    gnmCrossSourceSemanticWitnessAudited = true
    gnmCrossSourceFixtureDigestPinned = true

The following remain false:

    gnmCrossSourceGeometricValidationExecuted
    gnmCrossSourceGeometricMappingValidated
    providerLabelMappedToAnatomicalSide
    globalProviderAnatomicalSemanticsEstablished
    anatomicalReferenceAdmitted
    anatomicalLateralityAuthorized
    validatedExternalEarObservationAuthorized
    traditionalBindingAuthorized
    productionAuthorization

The next gate after U5B-B merge is:

    U5B-C
    FIRST_MEDIAPIPE_EIGHT_CASE_OBSERVATION_ON_PINNED_GNM_FIXTURE


## U5B-C first MediaPipe eight-case observation

The first prospective provider observation ran from:

    PR #1995
    head 36e35a50ab7503a47ed7bb6a1b3abdc4819c5dba
    workflow run 37084191246

An earlier run on head `fea6e7123af80542fde49e398f04ce50f4158761`
failed before provider observation because the browser operator still referenced
the U4B compiled-module paths. The fixture/materialization/runtime stages had
already passed. The import paths were corrected without changing the frozen
fixture, provider topology, transform matrix, ground truth, cost rule, or
acceptance rule.

The corrected first complete observation produced:

    candidate result SHA-256
    7c284cad3b467676e20c44ebf63a7aee3dc66c5d22534363286ef532ba3852fe

    candidate state
    gnm_cross_source_geometric_mapping_supported

All eight cases observed exactly one face and 478 landmarks.

| case | transformed RGBA SHA-256 | directCost | swappedCost | relation |
| --- | --- | ---: | ---: | --- |
| R0 | 45e5d55d6d179cc906f23597e6456763dc38e92f8d82662b0547dcda7327b897 | 0.012882031198933767 | 0.2859449713275122 | direct_assignment_closer |
| R90 | a93687aa1f8652e51c40333acef87885852910fca8d3ee81f1a22bc836dc20ce | 0.01439847854266454 | 0.28563923801751523 | direct_assignment_closer |
| R180 | c6519a12f9e98e5caa6687057c159776095e7acf18ba4563423ecdb541184ea5 | 0.014967380835671621 | 0.28673710470008695 | direct_assignment_closer |
| R270 | db399de883e866a520e0d3e940288b685e38e1c1f0ed1c9ba943bda2ab92571b | 0.013149344314935387 | 0.2883262973150461 | direct_assignment_closer |
| M0 | 36071374d0e60d3f03d170fcc3e211363fcfbcb2ad7cd4efc00db99bd99257c2 | 0.28979418849201966 | 0.01253495018132203 | swapped_assignment_closer |
| M90 | 8e0a23684fe06cb84cd16d6e06681fa5dec663127b1cb14b7aa397d3e6968572 | 0.28756890003625524 | 0.015743050990045394 | swapped_assignment_closer |
| M180 | faf0d3eff9ba7713d7b65cc6ac85765356f0797b476f2ef6989fe2091a280ee3 | 0.2883129305537383 | 0.015266341568986312 | swapped_assignment_closer |
| M270 | 5c8f02999dc7789218f5e5bac79d16e2de76e43f774a8ffe67209ebddc2311ff | 0.2870139936542212 | 0.014249632206525012 | swapped_assignment_closer |

Assessment:

    evaluatedCaseIds
    [R0,R90,R180,R270,M0,M90,M180,M270]

    unavailableCaseIds
    []

    failedCaseIds
    []

    orientationPreservingDirectForEveryAvailableCase
    true

    orientationReversingSwappedForEveryAvailableCase
    true

    allEightCasesAvailable
    true

    numericAcceptanceThresholdApplied
    false

    aggregateOverrideApplied
    false

Semantic-authority diagnostics remained false:

    providerPublishedSideNamesUsedAsAnatomicalAuthority
    imageSpaceXSignUsedAsAnatomicalAuthority
    gnmAxisOrderingUsedAsAnatomicalAuthority

The U5B-C result remains a prospective candidate and is not admitted in this
stage.

Authority therefore remains:

    gnmCrossSourceSemanticWitnessAudited = true
    gnmCrossSourceFixtureDigestPinned = true

    gnmCrossSourceGeometricValidationExecuted = false
    gnmCrossSourceGeometricMappingValidated = false
    providerLabelMappedToAnatomicalSide = false
    globalProviderAnatomicalSemanticsEstablished = false
    anatomicalReferenceAdmitted = false
    anatomicalLateralityAuthorized = false
    validatedExternalEarObservationAuthorized = false
    traditionalBindingAuthorized = false
    productionAuthorization = false

The next gate is:

    U5B-D
    exact result digest replay + bounded admission
