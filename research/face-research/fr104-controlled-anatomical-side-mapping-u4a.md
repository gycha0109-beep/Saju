# FR104 U4A — Controlled anatomical-side mapping audit

Issue: #1810
Watchtower-Track: face-observation-engine

## Purpose

U4A reviews whether the already-admitted composed orientation normalization can support a reflection-parity-conditional provider-to-anatomical mapping on the exact controlled MakeHuman anatomical reference.

This is a retrospective controlled-reference audit.

It does not treat MediaPipe published LEFT/RIGHT names as anatomical authority, and it does not resolve the known exact-release semantic-source conflict by convention.

## Preconditions

U4A requires the following already-admitted evidence:

    U3.2 compensated provider result SHA-256
    9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c

    U3.3 prospective composed-normalization result SHA-256
    793b1059308242d11c176300bd141b70a49c2fa681a49bc6e38e1abddf4aaab4

    prospectiveComposedNormalizationValidated = true
    providerCompensatedOutputFrameProspectivelyValidated = true

The controlled anatomical reference remains the deterministic MakeHuman fixture:

    PNG SHA-256
    f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb

    decoded RGBA SHA-256
    fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364

    dimensions
    1024 x 1024

Independent anatomical anchors:

- anatomical left eye: eye.L____head
- anatomical right eye: eye.R____head

These anchors are projected through the same deterministic render camera and are not provider-landmark-derived, provider-label-derived, Florence-prompt-derived, or image-X-sign-derived.

## Coordinate normalization

For each of:

    R0 R90 R180 R270 M0 M90 M180 M270

the live U3.2 compensated provider output is normalized by explicit inverse physical rotation.

The transformed MakeHuman anatomical ground-truth eye points are normalized by the same inverse physical rotation.

This creates a family-canonical frame while preserving reflection family:

- R* → orientation preserving
- M* → orientation reversing

No separate pose-normalization stack is introduced.

## Frozen mapping hypothesis

For orientation-preserving cases:

- provider LEFT should be closer to anatomical LEFT
- provider RIGHT should be closer to anatomical RIGHT

Primary comparison:

    directCost =
    d(providerLeft, anatomicalLeft)
    + d(providerRight, anatomicalRight)

Required:

    directCost < swappedCost

For orientation-reversing cases:

- provider LEFT should be closer to anatomical RIGHT
- provider RIGHT should be closer to anatomical LEFT

Primary comparison:

    swappedCost =
    d(providerLeft, anatomicalRight)
    + d(providerRight, anatomicalLeft)

Required:

    swappedCost < directCost

No numeric acceptance threshold is authorized.

Every available case must satisfy its reflection-parity rule. There is no aggregate override.

## Scientific states

- reflection_parity_conditional_mapping_supported
- reflection_parity_conditional_mapping_refuted
- reflection_parity_conditional_mapping_unresolved

Refuted is a valid scientific result and must not be relabeled as a harness failure.

Unresolved applies when the full controlled case surface is unavailable without a direct contradiction.

## Interpretation boundary

Even if U4A supports the hypothesis, it may establish only a bounded statement:

On the exact controlled MakeHuman anatomical reference and tested runtime, after the admitted composed orientation normalization, provider eye labels follow a reflection-parity-conditional mapping relative to independent anatomical eye ground truth.

It may not establish:

- universal provider anatomical semantics;
- subject-photo anatomical laterality;
- anatomical side from provider labels alone;
- anatomical side from screen-left/screen-right alone;
- Florence prompt-side authority;
- automatic GNM-reference-to-subject registration;
- validated external-ear observation;
- traditional physiognomy binding;
- Production authorization.

The exact FaceLandmarker source semantic conflict remains recorded as ambiguous. U4A uses independent controlled anatomical ground truth instead of pretending that conflict is resolved textually.

## Privacy

Always:

    userImageConsumed = false
    cameraAccessed = false
    rawProviderLandmarksReturned = false
    rawProviderLandmarksPersisted = false
    transformedRasterPersisted = false
    biometricEmbeddingProduced = false
    identityTemplateProduced = false

Only bounded eye-centroid and comparison scalars may appear in the derived audit result.

## U4A execution

CI must:

1. live-replay U3.2 and require its exact predecessor digest;
2. use the already-admitted U3.3 composed-normalization authority;
3. pair each live compensated provider result with the exact MakeHuman transformed anatomical ground truth for the same case;
4. inverse-rotate both into the same family-canonical frame;
5. compute direct/swapped costs;
6. emit a derived U4A result and SHA-256;
7. keep all anatomical/runtime/Production authority false until a separate admission step.

## Next gate

If U4A supports the frozen hypothesis:

1. pin and fail-closed admit the exact derived U4A result;
2. retain globalProviderAnatomicalSemanticsEstablished = false;
3. design a separate prospective independent anatomical-reference validation before any runtime subject-photo anatomical laterality authorization.

If U4A refutes or cannot resolve the pattern, anatomical mapping remains closed and the result is admitted as such without retuning U4A post hoc.


## Observed U4A result

The retrospective controlled audit was executed after U3.3 admission.

    audit HEAD
    a69a07b872a2bedb3bfe5611c4d383c5c2ff8325

    workflow run
    36813396882

    audit merge
    2964d334bb6264517872e9d540ed40b7e034d614

    derived result SHA-256
    863b1909b2bb33437496c990fd97529d986b2fca1564addb6e1591d232b7f2cf

Observed state:

    reflection_parity_conditional_mapping_supported

Coverage:

    evaluated
    R0 R90 R180 R270 M0 M90 M180 M270

    unavailable
    none

    failed
    none

All orientation-preserving cases satisfied:

    directCost < swappedCost

All orientation-reversing cases satisfied:

    swappedCost < directCost

No numeric threshold was applied.

Provider published LEFT/RIGHT names and image-space X sign were not consumed as anatomical authority.

## U4A admission

Admission pins the exact derived result digest and fails closed over:

- U3.2 and U3.3 predecessor digests;
- live U3.2 replay confirmation;
- exact controlled MakeHuman fixture digests;
- independent anatomical ground-truth source identity;
- normalization contract;
- all eight case ids, reflection parity values, rotations, compensation degrees, transformed-raster digests, exact direct/swapped costs, and relations;
- assessment state and case sets;
- interpretation boundary;
- privacy invariants;
- candidate-side authority remaining false.

CI replays the U4A analyzer and requires:

    FR104_U4A_RESULT_SHA256
    863b1909b2bb33437496c990fd97529d986b2fca1564addb6e1591d232b7f2cf

Only after that exact replay may the fail-closed intake admit:

    controlledAnatomicalMappingAudited = true
    reflectionParityConditionalMappingSupportedOnExactFixture = true
    controlledAnatomicalReferenceAdmittedForExactFixture = true

These are exact controlled-fixture authorities only.

The following global/runtime authorities remain false:

    providerLabelMappedToAnatomicalSide = false
    globalProviderAnatomicalSemanticsEstablished = false
    anatomicalReferenceAdmitted = false
    anatomicalLateralityAuthorized = false
    validatedExternalEarObservationAuthorized = false
    traditionalBindingAuthorized = false
    productionAuthorization = false

The generic anatomicalReferenceAdmitted flag intentionally remains false so downstream runtime consumers cannot treat one retrospective controlled fixture as a general anatomical reference authority.

## Next scientific gate

The next gate must be prospectively preregistered and use an independent anatomical reference not used to derive or tune the U4A mapping rule.

Required goal:

    test whether the reflection-parity-conditional mapping
    reproduces on independent anatomical ground truth

Before that prospective gate succeeds, runtime subject-photo anatomical laterality remains unavailable.
