# FR104 U5B — GNM cross-source geometric validation

Issue: #1810  
Watchtower-Track: face-observation-engine

## Purpose

U4A and U4B established the frozen reflection-parity mapping rule on the
MakeHuman source family.

U5A then admitted a direct left/right semantic witness from an independent
source family:

    google/GNM
    gnm_head.npz
    left_eye
    right_eye

U5B tests whether the already-frozen provider mapping rule survives a
controlled fixture whose semantic ground truth and geometry come from GNM
rather than MakeHuman.

U5B-A is preregistration only.

No U5B GNM render and no MediaPipe observation may be used before this
preregistration is merged.

## Predecessor

The U5A-B2 admitted evidence candidate is pinned as:

    result SHA-256
    7eac8cb7b030fed200cf6d4b7d8406901449f130deb3b44c7ef2b98a79b6cd21

    state
    gnm_direct_left_right_joint_witness_supported

Direct source-named anchors:

    left_eye
    index 2
    [0.030839037150144577,
     0.30316492915153503,
     0.09888789802789688]

    right_eye
    index 3
    [-0.030866222456097603,
      0.3031134307384491,
      0.09897840023040771]

The semantic authority is the exact GNM source naming.

The observed GNM X ordering is diagnostic only.

## Exact GNM source

    repository
    google/GNM

    upstream commit
    fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690

    asset
    gnm/shape/data/versions/v3_0/gnm_head.npz

    git blob
    ae49903ad7d50ce1d64e464a0407441f2781873c

    byte length
    53305389

Required arrays for the future U5B-B render:

    template_vertex_positions
    triangles
    joint_names
    template_joint_positions

GNM coordinate convention remains:

    right-handed
    +Y up
    +Z forward
    meter

## U5B-A observation embargo

U5B-A must not:

- fetch the live GNM NPZ for the U5B experiment;
- render the U5B fixture;
- observe the future fixture PNG digest;
- observe projected U5B left_eye/right_eye image coordinates;
- execute MediaPipe on a U5B fixture;
- observe any U5B directCost or swappedCost;
- tune camera framing from provider detectability;
- tune lighting/material from provider detectability;
- tune any numeric acceptance threshold.

Current state:

    preregistered_no_u5b_gnm_render_or_provider_result_observed_or_admitted

## Frozen provider-blind render protocol

U5B-B will use a deterministic bounded CPU triangle rasterizer.

Output:

    PNG
    RGB8
    1024 x 1024

Geometry:

    exact template_vertex_positions
    exact triangles array order

No texture and no user image are used.

The camera geometry is frozen from a pre-existing provider-blind GNM
inspection surface rather than chosen after U5B observation:

    tools/face-geometry/gnm/build_gnm_region_ontology_scene.py
    git blob 0050da03e9534cf31962d5fe2d9c851b3012fde5

Frozen camera rules:

    bounds center
    = exact template axis-aligned bounds midpoint

    front camera side
    = canonical +Z

    front distance
    = max(0.65, spanZ * 2.8)

    orthographic scale
    = max(spanY * 1.24, spanX * 1.34)

    screen up
    = canonical +Y

    roll
    = 0 degrees

The camera looks from canonical +Z toward the exact bounds center.

The future CPU renderer additionally freezes:

- exact NPZ triangle order;
- z-buffering;
- pixel-center sampling at x+0.5/y+0.5;
- edge inclusion tolerance 1e-12;
- one neutral surface material;
- constant RGB(32,32,32) background;
- symmetric camera-frontal flat Lambert lighting;
- ambient 0.35;
- diffuse 0.65;
- no crop;
- no resize;
- no post-render rotation;
- no post-render mirror.

U5B-B must render the same canonical input at least twice and require exact
byte equality before a fixture digest can be pinned.

## Frozen anatomical ground truth

The future fixture ground truth is created by projecting the already-audited
GNM source-named 3D eye joints through the exact same camera used to render
the fixture.

Semantic identity is therefore:

    GNM source joint name
    -> exact 3D template joint
    -> exact render-camera projection

It is not:

    image-space X sign -> left/right

It is not:

    GNM X ordering -> left/right

It is not:

    MediaPipe FACE_LANDMARKS_LEFT_EYE/RIGHT_EYE
    -> anatomical side

## Frozen MediaPipe observation

Provider runtime remains:

    @mediapipe/tasks-vision
    0.10.35
    runningMode IMAGE
    numFaces 1
    expected landmarks 478

Provider eye points reuse the already-governed FR24 eye topology witness:

    FACE_LANDMARKS_LEFT_EYE
    FACE_LANDMARKS_RIGHT_EYE

For each provider eye symbol:

    unique topology vertices
    -> ascending vertex order
    -> normalized XY centroid

The provider labels remain provider labels only.
They do not provide anatomical semantics.

## Frozen transform matrix

Execution cases remain exactly:

    R0
    R90
    R180
    R270
    M0
    M90
    M180
    M270

Transform order:

    horizontal mirror
    -> clockwise physical rotation

Rotation compensation:

    0   -> 0
    90  -> 270
    180 -> 180
    270 -> 90

After provider inference, explicit inverse physical rotation returns provider
coordinates to the canonical family frame.

The same inverse physical rotation is used for projected anatomical ground
truth.

Mirror parity remains intentionally present.

## Frozen mapping hypothesis

For orientation-preserving R cases:

    directCost < swappedCost

For orientation-reversing M cases:

    swappedCost < directCost

where:

    directCost
    =
    d(providerLeft, gnmAnatomicalLeft)
    +
    d(providerRight, gnmAnatomicalRight)

and:

    swappedCost
    =
    d(providerLeft, gnmAnatomicalRight)
    +
    d(providerRight, gnmAnatomicalLeft)

No numeric acceptance threshold is authorized.

No aggregate score may override a failing individual case.

All eight cases are required for a supported state.

## Preregistered scientific states

    gnm_cross_source_geometric_mapping_supported
    gnm_cross_source_geometric_mapping_refuted
    gnm_cross_source_geometric_mapping_unresolved

Supported requires all eight cases to be available and every case to satisfy
its preregistered reflection-parity relation.

Any available case that contradicts its required relation is refutation.

Unavailable provider evidence without a contradictory available case is
unresolved.

No rule, renderer, camera, material, threshold, or case set may be retuned
after U5B observation.

## CI boundary

U5B-A CI may:

- typecheck/build Face Reading;
- run synthetic protocol/assessor tests;
- verify all authority and privacy boundaries remain frozen.

U5B-A CI must not:

- fetch gnm_head.npz for U5B;
- render the GNM U5B fixture;
- execute MediaPipe for U5B;
- emit a U5B fixture digest;
- emit U5B projected eye coordinates;
- emit U5B provider costs or an empirical U5B state.

## Authority

U5B-A preserves the U5A semantic-witness admission:

    gnmCrossSourceSemanticWitnessAudited = true

It does not promote any U5B result.

These remain false:

    gnmCrossSourceGeometricValidationExecuted
    gnmCrossSourceGeometricMappingValidated
    u5bFixtureDigestPinned
    providerLabelMappedToAnatomicalSide
    globalProviderAnatomicalSemanticsEstablished
    anatomicalReferenceAdmitted
    anatomicalLateralityAuthorized
    validatedExternalEarObservationAuthorized
    traditionalBindingAuthorized
    productionAuthorization

## Next gate

After U5B-A is merged:

    U5B-B
    = fetch exact pinned GNM NPZ
    -> verify provenance
    -> execute deterministic provider-blind render only
    -> project exact source-named eye joints through the same camera
    -> require repeated render byte equality
    -> pin exact PNG digest and projected ground truth
    -> keep MediaPipe execution prohibited

Only after the U5B-B fixture pin is merged may U5B-C execute MediaPipe on the
eight frozen cases.
