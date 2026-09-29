import {
  admitNeutralEarMakeHumanTransformDiagnosticResultFR104,
} from './neutral-ear-makehuman-transform-result-intake-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104,
} from './neutral-ear-makehuman-transform-diagnostics-fr104.js';

export const NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-makehuman-transform-diagnostic-result-v1' as const,
    authorityState:
      'bounded_transform_scalar_evidence_candidate_no_anatomical_mapping' as const,
    canonicalFixture: Object.freeze({
      pngSha256:
        'f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb' as const,
      canonicalRgbaSha256:
        'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364' as const,
      width: 1024 as const,
      height: 1024 as const,
      repositoryPersistence: false as const,
    }),
    runtime: Object.freeze({
      packageName: '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      wasmRoot:
        NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104.runtime.wasmRoot,
      modelAssetRef:
        NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104.runtime.modelAssetRef,
      runningMode: 'IMAGE' as const,
      numFaces: 1 as const,
    }),
    transformContract: Object.freeze({
      order:
        'horizontal_mirror_then_clockwise_rotation' as const,
      interpolationApplied: false as const,
      resizeApplied: false as const,
      cropApplied: false as const,
      exifTransformApplied: false as const,
      cssTransformApplied: false as const,
      taskImageProcessingRotationDegrees: 0 as const,
    }),
    baselineControl: Object.freeze({
      caseId: 'R0' as const,
      exactU2ScalarReproduced: true as const,
    }),
    cases: Object.freeze([
      Object.freeze({
        id: 'R0' as const,
        horizontalMirror: false as const,
        clockwiseRotationDegrees: 0 as const,
        transformOrder:
          'horizontal_mirror_then_clockwise_rotation' as const,
        reflectionParity: 'orientation_preserving' as const,
        expectedRelationHypothesis:
          'direct_assignment_closer' as const,
        transformedRgbaSha256:
          'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364' as const,
        transformedAnatomicalGroundTruth: Object.freeze({
          anatomicalLeftEye: Object.freeze({
            x: 0.5909577633614812,
            y: 0.5,
          }),
          anatomicalRightEye: Object.freeze({
            x: 0.4090422366385188,
            y: 0.5,
          }),
          anatomicalIdentityPreserved: true as const,
        }),
        providerEligibility: Object.freeze({
          state:
            'exact_one_face_478_landmarks_observed' as const,
          faceCount: 1 as const,
          landmarkCount: 478 as const,
          exactlyOneFaceVerified: true as const,
        }),
        providerEyeCentroids: Object.freeze({
          providerLeft: Object.freeze({
            x: 0.5904278568923473,
            y: 0.512873537838459,
          }),
          providerRight: Object.freeze({
            x: 0.4134050067514181,
            y: 0.5108402445912361,
          }),
          topologyLabelAuthority:
            'provider_label_only_no_anatomical_meaning' as const,
        }),
        comparison: Object.freeze({
          directCost: 0.02456967216060714,
          swappedCost: 0.35972525227214214,
          relation: 'direct_assignment_closer' as const,
          numericAcceptanceThresholdApplied: false as const,
        }),
        matchesExpectedRelationHypothesis: true as const,
      }),
      Object.freeze({
        id: 'R90' as const,
        horizontalMirror: false as const,
        clockwiseRotationDegrees: 90 as const,
        transformOrder:
          'horizontal_mirror_then_clockwise_rotation' as const,
        reflectionParity: 'orientation_preserving' as const,
        expectedRelationHypothesis:
          'direct_assignment_closer' as const,
        transformedRgbaSha256:
          '5a8da29746625ed14da6580b84d8ebf0116939a7bfe7d7369ea46f19aeac84ed' as const,
        transformedAnatomicalGroundTruth: Object.freeze({
          anatomicalLeftEye: Object.freeze({
            x: 0.5,
            y: 0.5909577633614812,
          }),
          anatomicalRightEye: Object.freeze({
            x: 0.5,
            y: 0.4090422366385188,
          }),
          anatomicalIdentityPreserved: true as const,
        }),
        providerEligibility: Object.freeze({
          state:
            'exact_one_face_478_landmarks_observed' as const,
          faceCount: 1 as const,
          landmarkCount: 478 as const,
          exactlyOneFaceVerified: true as const,
        }),
        providerEyeCentroids: Object.freeze({
          providerLeft: Object.freeze({
            x: 0.49426842108368874,
            y: 0.5987073518335819,
          }),
          providerRight: Object.freeze({
            x: 0.4799642749130726,
            y: 0.41570754908025265,
          }),
          topologyLabelAuthority:
            'provider_label_only_no_anatomical_meaning' as const,
        }),
        comparison: Object.freeze({
          directCost: 0.03075415223551789,
          swappedCost: 0.3661435002714385,
          relation: 'direct_assignment_closer' as const,
          numericAcceptanceThresholdApplied: false as const,
        }),
        matchesExpectedRelationHypothesis: true as const,
      }),
      Object.freeze({
        id: 'R180' as const,
        horizontalMirror: false as const,
        clockwiseRotationDegrees: 180 as const,
        transformOrder:
          'horizontal_mirror_then_clockwise_rotation' as const,
        reflectionParity: 'orientation_preserving' as const,
        expectedRelationHypothesis:
          'direct_assignment_closer' as const,
        transformedRgbaSha256:
          '8d725e503a41e01f8e7e48f1466ff54d88c2cd7d3ab9a1df66332625bc7586fc' as const,
        transformedAnatomicalGroundTruth: Object.freeze({
          anatomicalLeftEye: Object.freeze({
            x: 0.4090422366385188,
            y: 0.5,
          }),
          anatomicalRightEye: Object.freeze({
            x: 0.5909577633614812,
            y: 0.5,
          }),
          anatomicalIdentityPreserved: true as const,
        }),
        providerEligibility: Object.freeze({
          state:
            'exact_one_face_478_landmarks_observed' as const,
          faceCount: 1 as const,
          landmarkCount: 478 as const,
          exactlyOneFaceVerified: true as const,
        }),
        providerEyeCentroids: Object.freeze({
          providerLeft: Object.freeze({
            x: 0.5856674797832966,
            y: 0.49590877816081047,
          }),
          providerRight: Object.freeze({
            x: 0.4143181871622801,
            y: 0.46882157400250435,
          }),
          topologyLabelAuthority:
            'provider_label_only_no_anatomical_meaning' as const,
        }),
        comparison: Object.freeze({
          directCost: 0.3560427236439567,
          swappedCost: 0.03830935815007686,
          relation: 'swapped_assignment_closer' as const,
          numericAcceptanceThresholdApplied: false as const,
        }),
        matchesExpectedRelationHypothesis: false as const,
      }),
      Object.freeze({
        id: 'R270' as const,
        horizontalMirror: false as const,
        clockwiseRotationDegrees: 270 as const,
        transformOrder:
          'horizontal_mirror_then_clockwise_rotation' as const,
        reflectionParity: 'orientation_preserving' as const,
        expectedRelationHypothesis:
          'direct_assignment_closer' as const,
        transformedRgbaSha256:
          'b6d87e6c433f971d167a5c35b8751d351c0047abbf7a1e63f959ce83bc2bcead' as const,
        transformedAnatomicalGroundTruth: Object.freeze({
          anatomicalLeftEye: Object.freeze({
            x: 0.5,
            y: 0.4090422366385188,
          }),
          anatomicalRightEye: Object.freeze({
            x: 0.5,
            y: 0.5909577633614812,
          }),
          anatomicalIdentityPreserved: true as const,
        }),
        providerEligibility: Object.freeze({
          state: 'provider_cannot_detect_face' as const,
          faceCount: 0 as const,
          landmarkCount: null,
          exactlyOneFaceVerified: false as const,
        }),
        providerEyeCentroids: null,
        comparison: null,
        matchesExpectedRelationHypothesis: null,
      }),
      Object.freeze({
        id: 'M0' as const,
        horizontalMirror: true as const,
        clockwiseRotationDegrees: 0 as const,
        transformOrder:
          'horizontal_mirror_then_clockwise_rotation' as const,
        reflectionParity: 'orientation_reversing' as const,
        expectedRelationHypothesis:
          'swapped_assignment_closer' as const,
        transformedRgbaSha256:
          '5f3b92f9a50d5913d5ba97ff9c5edf9d14e10bdd8a6f8be526cccb32b5f0c0d8' as const,
        transformedAnatomicalGroundTruth: Object.freeze({
          anatomicalLeftEye: Object.freeze({
            x: 0.4090422366385188,
            y: 0.5,
          }),
          anatomicalRightEye: Object.freeze({
            x: 0.5909577633614812,
            y: 0.5,
          }),
          anatomicalIdentityPreserved: true as const,
        }),
        providerEligibility: Object.freeze({
          state:
            'exact_one_face_478_landmarks_observed' as const,
          faceCount: 1 as const,
          landmarkCount: 478 as const,
          exactlyOneFaceVerified: true as const,
        }),
        providerEyeCentroids: Object.freeze({
          providerLeft: Object.freeze({
            x: 0.5907390266656876,
            y: 0.5128671005368233,
          }),
          providerRight: Object.freeze({
            x: 0.4155706539750099,
            y: 0.5110204368829727,
          }),
          topologyLabelAuthority:
            'provider_label_only_no_anatomical_meaning' as const,
        }),
        comparison: Object.freeze({
          directCost: 0.35788482319576975,
          swappedCost: 0.025677951082069113,
          relation: 'swapped_assignment_closer' as const,
          numericAcceptanceThresholdApplied: false as const,
        }),
        matchesExpectedRelationHypothesis: true as const,
      }),
      Object.freeze({
        id: 'M90' as const,
        horizontalMirror: true as const,
        clockwiseRotationDegrees: 90 as const,
        transformOrder:
          'horizontal_mirror_then_clockwise_rotation' as const,
        reflectionParity: 'orientation_reversing' as const,
        expectedRelationHypothesis:
          'swapped_assignment_closer' as const,
        transformedRgbaSha256:
          'a0ac410ac805bee1a367df7cb41684376d30eab35c149ab73d81e7d00a9227c4' as const,
        transformedAnatomicalGroundTruth: Object.freeze({
          anatomicalLeftEye: Object.freeze({
            x: 0.5,
            y: 0.4090422366385188,
          }),
          anatomicalRightEye: Object.freeze({
            x: 0.5,
            y: 0.5909577633614812,
          }),
          anatomicalIdentityPreserved: true as const,
        }),
        providerEligibility: Object.freeze({
          state:
            'exact_one_face_478_landmarks_observed' as const,
          faceCount: 1 as const,
          landmarkCount: 478 as const,
          exactlyOneFaceVerified: true as const,
        }),
        providerEyeCentroids: Object.freeze({
          providerLeft: Object.freeze({
            x: 0.5088829230517149,
            y: 0.605926588177681,
          }),
          providerRight: Object.freeze({
            x: 0.4753927644342184,
            y: 0.422412047162652,
          }),
          topologyLabelAuthority:
            'provider_label_only_no_anatomical_meaning' as const,
        }),
        comparison: Object.freeze({
          directCost: 0.3674171780611054,
          swappedCost: 0.04541087507380516,
          relation: 'swapped_assignment_closer' as const,
          numericAcceptanceThresholdApplied: false as const,
        }),
        matchesExpectedRelationHypothesis: true as const,
      }),
      Object.freeze({
        id: 'M180' as const,
        horizontalMirror: true as const,
        clockwiseRotationDegrees: 180 as const,
        transformOrder:
          'horizontal_mirror_then_clockwise_rotation' as const,
        reflectionParity: 'orientation_reversing' as const,
        expectedRelationHypothesis:
          'swapped_assignment_closer' as const,
        transformedRgbaSha256:
          '5e37e4df33d3457988e7780479fa8c8cf97b5d721b56e5a3298caf23d09e4c9f' as const,
        transformedAnatomicalGroundTruth: Object.freeze({
          anatomicalLeftEye: Object.freeze({
            x: 0.5909577633614812,
            y: 0.5,
          }),
          anatomicalRightEye: Object.freeze({
            x: 0.4090422366385188,
            y: 0.5,
          }),
          anatomicalIdentityPreserved: true as const,
        }),
        providerEligibility: Object.freeze({
          state: 'provider_cannot_detect_face' as const,
          faceCount: 0 as const,
          landmarkCount: null,
          exactlyOneFaceVerified: false as const,
        }),
        providerEyeCentroids: null,
        comparison: null,
        matchesExpectedRelationHypothesis: null,
      }),
      Object.freeze({
        id: 'M270' as const,
        horizontalMirror: true as const,
        clockwiseRotationDegrees: 270 as const,
        transformOrder:
          'horizontal_mirror_then_clockwise_rotation' as const,
        reflectionParity: 'orientation_reversing' as const,
        expectedRelationHypothesis:
          'swapped_assignment_closer' as const,
        transformedRgbaSha256:
          '73fef262ba0e9aa7d56ce03297e66437596a0e4f6b7da32d4541569e42e5b51b' as const,
        transformedAnatomicalGroundTruth: Object.freeze({
          anatomicalLeftEye: Object.freeze({
            x: 0.5,
            y: 0.5909577633614812,
          }),
          anatomicalRightEye: Object.freeze({
            x: 0.5,
            y: 0.4090422366385188,
          }),
          anatomicalIdentityPreserved: true as const,
        }),
        providerEligibility: Object.freeze({
          state: 'provider_cannot_detect_face' as const,
          faceCount: 0 as const,
          landmarkCount: null,
          exactlyOneFaceVerified: false as const,
        }),
        providerEyeCentroids: null,
        comparison: null,
        matchesExpectedRelationHypothesis: null,
      }),
    ]),
    diagnosticSummary: Object.freeze({
      state: 'incomplete_provider_coverage' as const,
      unavailableCaseIds: Object.freeze([
        'R270',
        'M180',
        'M270',
      ] as const),
      unresolvedCaseIds: Object.freeze([] as const),
      hypothesisMismatchCaseIds: Object.freeze([
        'R180',
      ] as const),
      scientificOutcomeMayFailHypothesisWithoutHarnessFailure:
        true as const,
    }),
    privacy: Object.freeze({
      userImageConsumed: false as const,
      cameraAccessed: false as const,
      rawProviderLandmarksReturned: false as const,
      rawProviderLandmarksPersisted: false as const,
      transformedRasterPersisted: false as const,
      biometricEmbeddingProduced: false as const,
      identityTemplateProduced: false as const,
    }),
    execution: Object.freeze({
      allEightCasesExecuted: true as const,
      empiricalResultAdmitted: false as const,
    }),
    authority: Object.freeze({
      exactMakeHumanFixtureTransformDiagnosticsExecuted:
        false as const,
      parityConditionedAssignmentPatternObserved:
        false as const,
      providerLabelMappedToAnatomicalSide: false as const,
      globalProviderAnatomicalSemanticsEstablished:
        false as const,
      anatomicalReferenceAdmitted: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });

export const NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_EVIDENCE_FR104 =
  admitNeutralEarMakeHumanTransformDiagnosticResultFR104(
    NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104,
  );

export const NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_DECISION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-makehuman-transform-empirical-decision-v1' as const,
    evidenceRef:
      'NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_EVIDENCE_FR104' as const,
    observed: Object.freeze({
      diagnosticState:
        'incomplete_provider_coverage' as const,
      unavailableCaseIds: Object.freeze([
        'R270',
        'M180',
        'M270',
      ] as const),
      hypothesisMismatchCaseIds: Object.freeze([
        'R180',
      ] as const),
      availableRelations: Object.freeze({
        R0: 'direct_assignment_closer' as const,
        R90: 'direct_assignment_closer' as const,
        R180: 'swapped_assignment_closer' as const,
        M0: 'swapped_assignment_closer' as const,
        M90: 'swapped_assignment_closer' as const,
      }),
    }),
    interpretation: Object.freeze({
      exactMakeHumanFixtureTransformDiagnosticsExecuted:
        true as const,
      orientationCoverageComplete: false as const,
      parityConditionedHypothesisSatisfied:
        false as const,
      providerRotationDependenceObserved:
        true as const,
      providerLabelMayBeCalledAnatomicalSide:
        false as const,
      anatomicalMappingReviewOutcome: 'hold' as const,
    }),
    nextGate:
      'investigate_same_fixture_provider_rotation_dependence_before_any_anatomical_mapping_admission' as const,
    authority: Object.freeze({
      anatomicalReferenceAdmitted: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
