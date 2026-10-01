# FR104 U4B — Prospective independent-geometry anatomical mapping validation

Issue: #1810  
Watchtower-Track: face-observation-engine

## Purpose

U4A established one bounded result:

    controlledAnatomicalMappingAudited = true
    reflectionParityConditionalMappingSupportedOnExactFixture = true
    controlledAnatomicalReferenceAdmittedForExactFixture = true

That result is retrospective and exact-fixture bounded.

U4B tests whether the same frozen reflection-parity conditional mapping reproduces prospectively on geometry that was not used in U4A.

U4B does not claim cross-source-family validation.

The prospective geometry remains in the MakeHuman source family, so success cannot establish universal provider anatomical semantics or runtime subject-photo laterality.

## Stage separation

U4B is intentionally split into three irreversible stages.

### U4B-A — preregistration

This stage freezes:

- exact source repository and commit;
- exact base mesh;
- exact morph target and blob;
- exact morph weight;
- exact MakeHuman target runtime semantics witness;
- deterministic renderer contract;
- anatomical ground-truth derivation;
- provider runtime;
- transform order;
- eight-case matrix;
- decision rule;
- interpretation and authority boundaries.

U4B-A must not:

- render the prospective fixture;
- observe the prospective fixture digest;
- run FaceLandmarker on the prospective fixture;
- observe any prospective provider result;
- tune the target, target weight, transform rule, or acceptance rule after observation.

Current authority state:

    preregistered_no_u4b_fixture_render_or_provider_result_observed_or_admitted

### U4B-B — render-only digest pin

Only after U4B-A merges may U4B-B execute the deterministic morph renderer.

U4B-B may observe and pin:

- rendered PNG SHA-256;
- deterministic repeat-render equality;
- recomputed MakeHuman anatomical eye ground truth;
- render/camera provenance.

U4B-B must not run FaceLandmarker or any other provider inference.

This creates a provider-blind prospective fixture digest.

### U4B-C — first provider observation

Only after the U4B-B fixture digest is merged on main may U4B-C execute MediaPipe FaceLandmarker.

The first provider observation must use the already-frozen:

- fixture bytes;
- provider runtime;
- orientation compensation;
- coordinate normalization;
- reflection-parity conditional decision rule.

No post-observation retuning is permitted.

## U4A predecessor

Pinned U4A admitted result:

    result SHA-256
    863b1909b2bb33437496c990fd97529d986b2fca1564addb6e1591d232b7f2cf

    admission merge
    f2ada1d90ef5fac4c61b7f359a85cd52d601184c

U4A state:

    reflection_parity_conditional_mapping_supported

## Prospective geometry

Pinned MakeHuman source:

    repository
    makehumancommunity/makehuman

    commit
    a8bc2d54ff0ac92e78ff71431b1023eda42bf482

Base mesh:

    path
    makehuman/data/3dobjs/base.obj

    blob
    d26635e9326e3cca30778fd7b9c00062b03cce09

Prospective morph target:

    path
    makehuman/data/targets/head/head-scale-horiz-incr.target

    blob
    9a32e90f7bd4d0a90092052d89137a365e272a67

    weight
    1.0

The target was not used in U4A.

It is a head-shape target rather than a demographic macro target or an asymmetric per-side target.

The target and weight are frozen before any U4B fixture render or provider observation.

## Target runtime semantics

Pinned runtime witness:

    path
    makehuman/core/algos3d.py

    blob
    eaaf4e9c3d9c67d374a3fe8761812929f2c0f81e

Text target format:

    vertex_index delta_x delta_y delta_z

Pinned application semantics:

    coord[target_vertex]
    += target_vector * morphFactor

U4B fixes:

    morphFactor = 1.0

The bounded builder independently reproduces only this pinned target application behavior before reusing the existing deterministic FR104 renderer.

## Anatomical ground truth

After target application, anatomical anchors are recomputed from the morphed base geometry using the same pinned skeleton joint definitions:

    anatomical left eye
    eye.L____head

    anatomical right eye
    eye.R____head

    head reference
    head____head

The camera is then recomputed from the morphed anchors.

Provider landmarks, provider labels, image-space X sign, and Florence prompt side do not define the anatomical ground truth.

## Renderer contract

U4B reuses the bounded deterministic CPU rasterization design from U1.2 with only the pinned morph-target application added before skeleton/proxy/camera construction.

Frozen output:

    format = PNG
    width = 1024
    height = 1024

Frozen camera:

    center = morphed MakeHuman eye midpoint
    projection = orthographic
    span = 3 * distance(morphed eye midpoint, morphed head anchor)

Frozen appearance:

    body RGB = 198 151 127
    eye RGB = 220 220 220
    background RGB = 32 32 32
    ambient = 0.35
    diffuse = 0.65

No crop, resize, EXIF transform, post-render rotation, or post-render mirror is permitted.

U4B-A intentionally contains:

    renderedFixtureSha256 = null

The builder exists in U4B-A but CI may syntax-check it only.

## Provider runtime

Frozen prospective provider:

    @mediapipe/tasks-vision@0.10.35
    runningMode = IMAGE
    numFaces = 1
    expected landmarks = 478

Provider execution is prohibited in U4B-A and U4B-B.

## Transform matrix

Frozen order:

    horizontal mirror
    then clockwise physical rotation

Cases:

    R0 R90 R180 R270
    M0 M90 M180 M270

Compensation remains:

    rotationDegrees = inverse physical rotation

Returned provider coordinates and anatomical ground truth are normalized by the same explicit inverse physical rotation before mapping comparison.

## Frozen decision rule

Orientation-preserving cases:

    directCost < swappedCost

Orientation-reversing cases:

    swappedCost < directCost

Where:

    directCost =
      d(providerLeft, anatomicalLeft)
      + d(providerRight, anatomicalRight)

    swappedCost =
      d(providerLeft, anatomicalRight)
      + d(providerRight, anatomicalLeft)

No numeric acceptance threshold is authorized.

Every available case must satisfy its reflection-parity rule.

There is no aggregate override.

Scientific states:

- prospective_independent_geometry_mapping_supported
- prospective_independent_geometry_mapping_refuted
- prospective_independent_geometry_mapping_unresolved

Any direct contradiction is refutation, not a harness failure and not permission to retune.

Incomplete but non-contradictory evidence is unresolved.

## Independence boundary

U4B provides:

    geometry independent from U4A = true
    same source family as U4A = true
    independent source family = false

Therefore even a successful U4B-C may establish only replication across a second preregistered MakeHuman geometry under the exact tested runtime.

It may not establish:

- universal MediaPipe provider LEFT/RIGHT anatomical semantics;
- cross-source-family anatomical validation;
- runtime user-photo anatomical laterality;
- anatomical side from provider labels alone;
- anatomical side from image X sign;
- validated external-ear observation;
- traditional physiognomy binding;
- Production authorization.

Cross-source-family validation remains a later scientific gate.

## Privacy

Always:

    userImageConsumed = false
    cameraAccessed = false
    rawProviderLandmarksReturned = false
    rawProviderLandmarksPersisted = false
    transformedRasterPersisted = false
    biometricEmbeddingProduced = false
    identityTemplateProduced = false

## U4B-A CI contract

U4B-A CI may:

- typecheck/build Face Reading;
- run synthetic protocol/assessment tests;
- syntax-check the future render-only builder.

U4B-A CI must not:

- execute the U4B builder;
- materialize the U4B fixture;
- compute a U4B fixture SHA;
- serve the U4B fixture to a browser;
- execute FaceLandmarker on U4B geometry;
- emit a U4B empirical result.

## Next gate

After U4B-A preregistration merges:

    U4B-B
    = execute render-only builder once
    → verify deterministic repeat render
    → pin prospective fixture digest and anatomical ground truth
    → no provider execution

Only after U4B-B merges may U4B-C observe provider behavior.


## U4B-B first render-only observation

U4B-A preregistration merged before any new fixture render:

    merge
    bec91cd06b682e26ad9d0f7d6721591235031a34

The first U4B-B render-only execution then ran the frozen builder without MediaPipe or browser provider inference.

Execution provenance:

    execution HEAD
    686a328caadfe3ceed5241cb6b9f2c2d41844a7b

    workflow run
    36833595821

Observed deterministic fixture:

    PNG SHA-256
    91a481011618f7a74aed7380185d640c604dcde587eff69b6f44654c97585b33

    repeatRenderByteEqual = true
    repeatRenderSha256Equal = true

Morphed independent-geometry anatomical ground truth:

    left joint
    eye.L____head

    left source point
    [0.36575, 7.284149999999999, 1.24535]

    left normalized image coordinate
    x = 0.6081000875693314
    y = 0.5

    right joint
    eye.R____head

    right source point
    [-0.36575, 7.284149999999999, 1.24535]

    right normalized image coordinate
    x = 0.3918999124306686
    y = 0.5

    directVsMatrixProjectionMaximumError = 0

Provider-blind boundary during first render:

    renderExecuted = true
    providerExecuted = false
    providerResultObserved = false

No U4B provider landmarks, provider labels, mapping costs, or mapping state were observed in U4B-B.

## U4B-B fixture admission

The exact rendered fixture evidence is now pinned separately from the frozen builder.

Admitted bounded authority:

    u4bFixtureDigestPinned = true

Still false:

    prospectiveIndependentGeometryValidationExecuted = false
    prospectiveIndependentGeometryMappingValidated = false
    providerLabelMappedToAnatomicalSide = false
    globalProviderAnatomicalSemanticsEstablished = false
    anatomicalReferenceAdmitted = false
    anatomicalLateralityAuthorized = false
    validatedExternalEarObservationAuthorized = false
    traditionalBindingAuthorized = false
    productionAuthorization = false

CI re-executes the unchanged frozen builder and requires exact equality for the pinned PNG digest and anatomical ground-truth coordinates while also requiring:

    providerExecuted = false
    providerResultObserved = false

## U4B-C gate

Only after U4B-B is merged may the pinned PNG bytes be used for the first provider observation.

U4B-C must not alter:

- source commit;
- morph target;
- morph weight;
- renderer;
- fixture digest;
- anatomical ground truth;
- provider runtime;
- transform order;
- reflection-parity decision rule.

The first MediaPipe result must be treated as prospective evidence and may support, refute, or leave unresolved the frozen mapping rule.
