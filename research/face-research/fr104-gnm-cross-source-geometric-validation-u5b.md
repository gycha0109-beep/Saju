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
