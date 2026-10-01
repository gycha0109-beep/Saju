# FR104 U3.3 — Prospective composed orientation normalization

Issue: #1810
Watchtower-Track: face-observation-engine

## Study phase

This document preserves the merged U3.3A preregistration and records the later U3.3B prospective execution/admission without rewriting the preregistered rule.

    U3.2.1 retrospective discovery/audit
    → U3.3A preregistration merged
    → first prospective execution on the frozen independent fixture
    → U3.3B exact result intake / replay / admission
    → only then consider U4 anatomical mapping review

No prospective U3.3 provider result is bundled, observed, pinned, or admitted by this phase.

## Predecessor

U3.2.1 admitted:

    derived result SHA-256
    732268b973592f70f606000ffcbd0219e67afcc20b920e57906d14978f5cbb05

    selectedHypothesis
    original_input_image_frame

The exact MakeHuman fixture/runtime supported this composed procedure:

    FaceLandmarker.detect(
      physically rotated input,
      { rotationDegrees: inversePhysicalRotation }
    )
    → provider output remains in original input image coordinates
    → explicitly inverse-rotate the returned provider coordinates
    → canonical same-family provider coordinate frame

U3.3 does not reopen H1/H2/H3 model selection.

## Frozen rule

Before seeing any prospective U3.3 result:

    provider inference compensation
    =
    rotationDegrees = inverse physical rotation

    provider returned-coordinate normalization
    =
    explicit inverse physical rotation

    rule retuning after observation
    =
    forbidden

The two rotations have different roles:

    rotationDegrees
    = inference-orientation compensation

    explicit point rotation
    = returned-coordinate-frame normalization

No parallel pose-normalization stack is authorized.

## Independent validation fixture

The validation fixture is the already pinned public scikit-image astronaut asset:

    fixtureRef
    skimage_astronaut_public_domain

    source repository
    scikit-image/scikit-image

    source commit
    533b7694d2004ae84e49e2cfd0bcfc5f8e562f22

    SHA-256
    88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5

    dimensions
    512 x 512

Boundary:

    previously used for controlled FR104 mirror study = true
    novel to all FR104 work = false
    used to develop U3.2/U3.2.1 orientation rule = false
    prior mirror result may select or retune U3.3 rule = false

The claim is therefore limited to independence from the U3.2/U3.2.1 MakeHuman development fixture and orientation-rule derivation. The depicted person's identity is irrelevant to the runtime decision.

## Transform matrix

Order remains:

    horizontal mirror
    → clockwise physical rotation

Eight cases are frozen:

    R0 R90 R180 R270
    M0 M90 M180 M270

Family baselines:

    non_mirrored → R0
    mirrored     → M0

For every case:

    compensationDegrees
    =
    inverse(physicalClockwiseRotationDegrees)

No crop, resize, EXIF transform, CSS transform, or adaptive orientation rule is introduced.

## Label-independent comparison

Provider LEFT/RIGHT labels are not used to decide whether the composed rule succeeds.

    sameLabelCost
    crossLabelCost

    unorderedPairCost
    =
    min(sameLabelCost, crossLabelCost)

Supporting descriptive values may include pairMidpointError, interEyeDistanceAbsoluteDifference, and providerLabelRelation. Provider label relation is post-decision descriptive evidence only.

## Frozen controls

For every available rotated case:

    identity
    =
    returned provider coordinates unchanged

    composed
    =
    returned provider coordinates
    explicitly inverse-rotated by physical input rotation

    opposite
    =
    returned provider coordinates
    rotated in the physical input direction

These are controls. U3.3 does not choose among them after execution.

## Decision rule

No numeric acceptance threshold is authorized.

Quarter turns:

    R90
    R270
    M90
    M270

Each available quarter-turn case supports the frozen rule only if:

    composed unorderedPairCost < identity unorderedPairCost
    AND
    composed unorderedPairCost < opposite unorderedPairCost

Half turns:

    R180
    M180

At 180 degrees inverse and opposite rotations are geometrically identical, so sign cannot be distinguished. Each available half-turn case supports the frozen rule only if:

    composed unorderedPairCost < identity unorderedPairCost

Zero-degree controls R0 and M0 establish the two family baselines. With zero physical rotation, both provider compensation and explicit output-coordinate normalization are identity operations.

## Preregistered scientific states

    prospective_composed_normalization_supported
    prospective_composed_normalization_partially_supported
    prospective_composed_normalization_refuted
    prospective_composed_normalization_unresolved

Interpretation:

- supported: both family baselines available, all six rotated cases available, every case satisfies the frozen rule.
- partially_supported: both baselines available, at least one rotated case is evaluable, no evaluable case refutes the rule, but coverage is incomplete.
- refuted: both baselines are available and at least one evaluable case violates its preregistered rule.
- unresolved: the family baselines or usable prospective comparison surface are insufficient to adjudicate the frozen rule.

A refutation is a scientific result, not a harness failure. No aggregate score may override a per-case refutation.

## U3.3A implementation boundary

U3.3A contains protocol + pure decision function, protocol tests, browser execution surface, a headless runner capable of producing the first result later, existing MESH6J route integration, and syntax/smoke CI coverage.

U3.3A CI deliberately does not execute the prospective FaceLandmarker experiment.

At definition time:

    prospectiveResultObservedAtDefinitionTime = false
    empiricalResultSha256PinnedAtDefinitionTime = null
    empiricalResultValuesBundledAtDefinitionTime = 0

The headless runner becomes eligible for first scientific execution only after this preregistration is merged.

## U3.3B admission requirement

After U3.3A is merged:

1. execute the frozen headless runner without changing protocol, fixture, runtime, transform matrix, or decision rule;
2. serialize the exact bounded result;
3. compute its SHA-256;
4. create a separate U3.3B intake that recomputes the decision from the bounded scalars;
5. pin the exact result digest;
6. live-replay the exact experiment in CI;
7. admit the result whether it supports, partially supports, refutes, or leaves the rule unresolved.

No post-hoc retuning is allowed inside U3.3.

## Privacy boundary

Always:

    userImageConsumed = false
    cameraAccessed = false
    rawProviderLandmarksReturned = false
    rawProviderLandmarksPersisted = false
    transformedRasterPersisted = false
    biometricEmbeddingProduced = false
    identityTemplateProduced = false

The browser may hold fixture bytes, transformed rasters, and provider landmarks ephemerally in memory only. The bounded result may contain provider-eye centroids and descriptive scalar comparisons, not the raw 478-landmark set.

## Authority before prospective admission

Still false:

    prospectiveComposedNormalizationValidated = false
    providerCompensatedOutputFrameProspectivelyValidated = false
    providerLabelMappedToAnatomicalSide = false
    globalProviderAnatomicalSemanticsEstablished = false
    anatomicalReferenceAdmitted = false
    anatomicalLateralityAuthorized = false
    validatedExternalEarObservationAuthorized = false
    traditionalBindingAuthorized = false
    productionAuthorization = false

Even a successful U3.3 result cannot by itself establish that provider LEFT/RIGHT equals subject anatomical LEFT/RIGHT.

## U3.3B first valid prospective execution

U3.3A preregistration merged first:

    merge SHA
    5bf66ddcfa3b6100d93f7259bd87232095c8912d

The first execution attempt after preregistration failed before any case observation was produced:

    U3_3_CASE_MISSING R0

Cause:

    working execution entries stored the case id at item.id
    while the lookup checked candidate.id only

Only that execution-harness lookup was corrected. The frozen protocol, fixture, runtime, transform matrix, comparison metrics, and decision rule were not retuned.

The first valid prospective execution then completed on the frozen independent fixture:

    workflow run
    36798788804

    execution HEAD
    092fbae2ab0e8958e6a93a52afa9ea95a95ea6f9

    execution merge
    856ad0c19fdef2471434ed3253cf67b55850ae29

    result SHA-256
    793b1059308242d11c176300bd141b70a49c2fa681a49bc6e38e1abddf4aaab4

Observed preregistered state:

    prospective_composed_normalization_supported

Coverage:

    evaluated
    R90 R180 R270 M90 M180 M270

    unavailable
    none

    failed
    none

    allSixRotatedCasesAvailable
    true

Quarter-turn controls:

    R90
    composed  = 0.004019598639518765
    identity  = 0.8609687785387168
    opposite  = 1.2180429934630648

    R270
    composed  = 0.0034770712559623242
    identity  = 0.8617153750658679
    opposite  = 1.221379652899968

    M90
    composed  = 0.004295411288492099
    identity  = 0.8608039321032435
    opposite  = 1.2158090456181592

    M270
    composed  = 0.004108235954123095
    identity  = 0.8608660213756174
    opposite  = 1.2207388445996106

Every quarter turn satisfies the preregistered strict dominance rule.

Half-turn controls:

    R180
    composed  = 0.00526201305598233
    identity  = 1.2172198425550267
    opposite  = 0.00526201305598233

    M180
    composed  = 0.005500609024443177
    identity  = 1.2168021910668552
    opposite  = 0.005500609024443177

Both half turns reject identity exactly as preregistered. Inverse and opposite remain geometrically identical at 180 degrees.

Zero-degree controls:

    R0 composed unorderedPairCost = 0
    M0 composed unorderedPairCost = 0

Decision-boundary flags remained:

    numericAcceptanceThresholdApplied = false
    providerLabelsUsedForDecision = false
    anatomicalInterpretationUsed = false
    ruleRetunedAfterObservation = false

## U3.3B admission

The admitted result digest is fixed to:

    793b1059308242d11c176300bd141b70a49c2fa681a49bc6e38e1abddf4aaab4

Admission is fail-closed over:

- predecessor digest and selected frame hypothesis;
- pinned fixture source, commit, digest, and dimensions;
- exact runtime package/version/mode;
- frozen composed rule;
- all eight case identities and transformed-raster digests;
- exact unordered-pair comparison costs;
- preregistered assessment state and case sets;
- privacy invariants;
- candidate-side authority remaining false.

CI then live-replays the browser experiment and requires the serialized result SHA-256 to equal the pinned digest before the intake may admit it.

Admitted bounded authority:

    prospectiveComposedNormalizationValidated = true
    providerCompensatedOutputFrameProspectivelyValidated = true

Scope:

    independent fixture
    exact tested runtime
    frozen U3.3 rule only

Still false:

    providerLabelMappedToAnatomicalSide = false
    globalProviderAnatomicalSemanticsEstablished = false
    anatomicalReferenceAdmitted = false
    anatomicalLateralityAuthorized = false
    validatedExternalEarObservationAuthorized = false
    traditionalBindingAuthorized = false
    productionAuthorization = false

## Next gate

U3.3 may now close after exact-replay CI passes.

The next scientific question is separate:

    U4 anatomical mapping review

U4 requires independent anatomical ground truth and must not infer anatomical LEFT/RIGHT semantics from provider labels, screen position, mirror behavior, or the U3.3 orientation-normalization result alone.
