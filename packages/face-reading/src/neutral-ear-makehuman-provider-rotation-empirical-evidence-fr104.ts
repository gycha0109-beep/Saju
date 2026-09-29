import {
  admitNeutralEarProviderRotationDependenceResultFR104,
} from './neutral-ear-makehuman-provider-rotation-result-intake-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104,
} from './neutral-ear-makehuman-provider-rotation-dependence-fr104.js';

const protocol =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104;

export const NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_SOURCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-provider-rotation-dependence-result-v1' as const,
    authorityState:
      'bounded_provider_rotation_dependence_candidate_no_anatomical_mapping' as const,
    fixture: Object.freeze({
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
      wasmRoot: protocol.runtime.wasmRoot,
      modelAssetRef: protocol.runtime.modelAssetRef,
      runningMode: 'IMAGE' as const,
      numFaces: 1 as const,
      providerSideRotationHintUsed: false as const,
    }),
    interpretationBoundary: Object.freeze({
      anatomicalGroundTruthUsed: false as const,
      anatomicalSideSemanticsUsed: false as const,
      detectorStageFailureMayBeClaimed: false as const,
      boundedClaim:
        'provider_pipeline_rotation_dependence_on_exact_tested_fixture_only' as const,
    }),
    cases: Object.freeze([
      Object.freeze({
        id: 'R0' as const,
        family: 'non_mirrored' as const,
        clockwiseRotationDegrees: 0 as const,
        native: Object.freeze({
          rgbaSha256:
            'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364' as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
          faceCount: 1 as const,
          landmarkCount: 478 as const,
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
        }),
        inverseRotationComparison: Object.freeze({
          inverseRotationDegrees: 0 as const,
          inverseMappedProviderEyeCentroids: Object.freeze({
            providerLeft: Object.freeze({
              x: 0.5904278568923473,
              y: 0.512873537838459,
            }),
            providerRight: Object.freeze({
              x: 0.4134050067514181,
              y: 0.5108402445912361,
            }),
          }),
          sameLabelCost: 0,
          crossLabelCost: 0.3540690540188288,
          relation: 'provider_same_label_closer' as const,
          unorderedPairCost: 0,
          pairMidpointError: 0,
          interEyeDistanceAbsoluteDifference: 0,
          numericAcceptanceThresholdApplied: false as const,
        }),
        rotationCanonicalizedControl: Object.freeze({
          inverseRotationDegrees: 0 as const,
          rgbaSha256:
            'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364' as const,
          exactFamilyBaselineBytesRecovered: true as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
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
          exactFamilyBaselineProviderScalarsRecovered:
            true as const,
        }),
      }),
      Object.freeze({
        id: 'R90' as const,
        family: 'non_mirrored' as const,
        clockwiseRotationDegrees: 90 as const,
        native: Object.freeze({
          rgbaSha256:
            '5a8da29746625ed14da6580b84d8ebf0116939a7bfe7d7369ea46f19aeac84ed' as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
          faceCount: 1 as const,
          landmarkCount: 478 as const,
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
        }),
        inverseRotationComparison: Object.freeze({
          inverseRotationDegrees: 270 as const,
          inverseMappedProviderEyeCentroids: Object.freeze({
            providerLeft: Object.freeze({
              x: 0.5987073518335819,
              y: 0.5057315789163113,
            }),
            providerRight: Object.freeze({
              x: 0.41570754908025265,
              y: 0.5200357250869274,
            }),
          }),
          sameLabelCost: 0.020413616078024346,
          crossLabelCost: 0.36023979646756255,
          relation: 'provider_same_label_closer' as const,
          unorderedPairCost: 0.020413616078024346,
          pairMidpointError: 0.005389723175594011,
          interEyeDistanceAbsoluteDifference:
            0.006523464931627948,
          numericAcceptanceThresholdApplied: false as const,
        }),
        rotationCanonicalizedControl: Object.freeze({
          inverseRotationDegrees: 270 as const,
          rgbaSha256:
            'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364' as const,
          exactFamilyBaselineBytesRecovered: true as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
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
          exactFamilyBaselineProviderScalarsRecovered:
            true as const,
        }),
      }),
      Object.freeze({
        id: 'R180' as const,
        family: 'non_mirrored' as const,
        clockwiseRotationDegrees: 180 as const,
        native: Object.freeze({
          rgbaSha256:
            '8d725e503a41e01f8e7e48f1466ff54d88c2cd7d3ab9a1df66332625bc7586fc' as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
          faceCount: 1 as const,
          landmarkCount: 478 as const,
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
        }),
        inverseRotationComparison: Object.freeze({
          inverseRotationDegrees: 180 as const,
          inverseMappedProviderEyeCentroids: Object.freeze({
            providerLeft: Object.freeze({
              x: 0.4143325202167034,
              y: 0.5040912218391895,
            }),
            providerRight: Object.freeze({
              x: 0.5856818128377199,
              y: 0.5311784259974957,
            }),
          }),
          sameLabelCost: 0.34978736535134813,
          crossLabelCost: 0.025722610815087955,
          relation: 'provider_cross_label_closer' as const,
          unorderedPairCost: 0.025722610815087955,
          pairMidpointError: 0.006085211606144252,
          interEyeDistanceAbsoluteDifference:
            0.0035574486652236448,
          numericAcceptanceThresholdApplied: false as const,
        }),
        rotationCanonicalizedControl: Object.freeze({
          inverseRotationDegrees: 180 as const,
          rgbaSha256:
            'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364' as const,
          exactFamilyBaselineBytesRecovered: true as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
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
          exactFamilyBaselineProviderScalarsRecovered:
            true as const,
        }),
      }),
      Object.freeze({
        id: 'R270' as const,
        family: 'non_mirrored' as const,
        clockwiseRotationDegrees: 270 as const,
        native: Object.freeze({
          rgbaSha256:
            'b6d87e6c433f971d167a5c35b8751d351c0047abbf7a1e63f959ce83bc2bcead' as const,
          providerEligibilityState:
            'provider_cannot_detect_face' as const,
          faceCount: 0 as const,
          landmarkCount: null,
          providerEyeCentroids: null,
        }),
        inverseRotationComparison: null,
        rotationCanonicalizedControl: Object.freeze({
          inverseRotationDegrees: 90 as const,
          rgbaSha256:
            'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364' as const,
          exactFamilyBaselineBytesRecovered: true as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
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
          exactFamilyBaselineProviderScalarsRecovered:
            true as const,
        }),
      }),
      Object.freeze({
        id: 'M0' as const,
        family: 'mirrored' as const,
        clockwiseRotationDegrees: 0 as const,
        native: Object.freeze({
          rgbaSha256:
            '5f3b92f9a50d5913d5ba97ff9c5edf9d14e10bdd8a6f8be526cccb32b5f0c0d8' as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
          faceCount: 1 as const,
          landmarkCount: 478 as const,
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
        }),
        inverseRotationComparison: Object.freeze({
          inverseRotationDegrees: 0 as const,
          inverseMappedProviderEyeCentroids: Object.freeze({
            providerLeft: Object.freeze({
              x: 0.5907390266656876,
              y: 0.5128671005368233,
            }),
            providerRight: Object.freeze({
              x: 0.4155706539750099,
              y: 0.5110204368829727,
            }),
          }),
          sameLabelCost: 0,
          crossLabelCost: 0.35035621277637186,
          relation: 'provider_same_label_closer' as const,
          unorderedPairCost: 0,
          pairMidpointError: 0,
          interEyeDistanceAbsoluteDifference: 0,
          numericAcceptanceThresholdApplied: false as const,
        }),
        rotationCanonicalizedControl: Object.freeze({
          inverseRotationDegrees: 0 as const,
          rgbaSha256:
            '5f3b92f9a50d5913d5ba97ff9c5edf9d14e10bdd8a6f8be526cccb32b5f0c0d8' as const,
          exactFamilyBaselineBytesRecovered: true as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
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
          exactFamilyBaselineProviderScalarsRecovered:
            true as const,
        }),
      }),
      Object.freeze({
        id: 'M90' as const,
        family: 'mirrored' as const,
        clockwiseRotationDegrees: 90 as const,
        native: Object.freeze({
          rgbaSha256:
            'a0ac410ac805bee1a367df7cb41684376d30eab35c149ab73d81e7d00a9227c4' as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
          faceCount: 1 as const,
          landmarkCount: 478 as const,
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
        }),
        inverseRotationComparison: Object.freeze({
          inverseRotationDegrees: 270 as const,
          inverseMappedProviderEyeCentroids: Object.freeze({
            providerLeft: Object.freeze({
              x: 0.605926588177681,
              y: 0.4911170769482851,
            }),
            providerRight: Object.freeze({
              x: 0.422412047162652,
              y: 0.5246072355657816,
            }),
          }),
          sameLabelCost: 0.04173985276610849,
          crossLabelCost: 0.3601295365681587,
          relation: 'provider_same_label_closer' as const,
          unorderedPairCost: 0.04173985276610849,
          pairMidpointError: 0.011746415261901313,
          interEyeDistanceAbsoluteDifference:
            0.011367270097487975,
          numericAcceptanceThresholdApplied: false as const,
        }),
        rotationCanonicalizedControl: Object.freeze({
          inverseRotationDegrees: 270 as const,
          rgbaSha256:
            '5f3b92f9a50d5913d5ba97ff9c5edf9d14e10bdd8a6f8be526cccb32b5f0c0d8' as const,
          exactFamilyBaselineBytesRecovered: true as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
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
          exactFamilyBaselineProviderScalarsRecovered:
            true as const,
        }),
      }),
      Object.freeze({
        id: 'M180' as const,
        family: 'mirrored' as const,
        clockwiseRotationDegrees: 180 as const,
        native: Object.freeze({
          rgbaSha256:
            '5e37e4df33d3457988e7780479fa8c8cf97b5d721b56e5a3298caf23d09e4c9f' as const,
          providerEligibilityState:
            'provider_cannot_detect_face' as const,
          faceCount: 0 as const,
          landmarkCount: null,
          providerEyeCentroids: null,
        }),
        inverseRotationComparison: null,
        rotationCanonicalizedControl: Object.freeze({
          inverseRotationDegrees: 180 as const,
          rgbaSha256:
            '5f3b92f9a50d5913d5ba97ff9c5edf9d14e10bdd8a6f8be526cccb32b5f0c0d8' as const,
          exactFamilyBaselineBytesRecovered: true as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
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
          exactFamilyBaselineProviderScalarsRecovered:
            true as const,
        }),
      }),
      Object.freeze({
        id: 'M270' as const,
        family: 'mirrored' as const,
        clockwiseRotationDegrees: 270 as const,
        native: Object.freeze({
          rgbaSha256:
            '73fef262ba0e9aa7d56ce03297e66437596a0e4f6b7da32d4541569e42e5b51b' as const,
          providerEligibilityState:
            'provider_cannot_detect_face' as const,
          faceCount: 0 as const,
          landmarkCount: null,
          providerEyeCentroids: null,
        }),
        inverseRotationComparison: null,
        rotationCanonicalizedControl: Object.freeze({
          inverseRotationDegrees: 90 as const,
          rgbaSha256:
            '5f3b92f9a50d5913d5ba97ff9c5edf9d14e10bdd8a6f8be526cccb32b5f0c0d8' as const,
          exactFamilyBaselineBytesRecovered: true as const,
          providerEligibilityState:
            'exact_one_face_478_landmarks_observed' as const,
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
          exactFamilyBaselineProviderScalarsRecovered:
            true as const,
        }),
      }),
    ]),
    summary: Object.freeze({
      state:
        'exact_fixture_rotation_dependence_observed' as const,
      providerRotationEquivarianceRefutedForExactFixture:
        true as const,
      crossLabelCaseIds: Object.freeze(['R180'] as const),
      nativeUnavailableControlRecoveredCaseIds:
        Object.freeze(['R270', 'M180', 'M270'] as const),
      anatomicalInterpretationUsed: false as const,
      detectorStageFailureClaimed: false as const,
      anatomicalMappingReviewOutcome: 'hold' as const,
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
      allEightNativeCasesExecuted: true as const,
      allEightRotationCanonicalizedControlsExecuted:
        true as const,
      empiricalResultAdmitted: false as const,
    }),
    authority: Object.freeze({
      providerRotationDependenceInvestigated: false as const,
      providerRotationEquivarianceRefutedForExactFixture:
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

export const NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_EVIDENCE_FR104 =
  admitNeutralEarProviderRotationDependenceResultFR104(
    NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_SOURCE_FR104,
  );

export const NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_DECISION_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-provider-rotation-dependence-empirical-decision-v1' as const,
    evidenceRef:
      'NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_EVIDENCE_FR104' as const,
    observed: Object.freeze({
      state:
        'exact_fixture_rotation_dependence_observed' as const,
      providerCrossLabelCaseIds:
        Object.freeze(['R180'] as const),
      nativeUnavailableControlRecoveredCaseIds:
        Object.freeze(['R270', 'M180', 'M270'] as const),
      r180: Object.freeze({
        sameLabelCost: 0.34978736535134813,
        crossLabelCost: 0.025722610815087955,
        relation: 'provider_cross_label_closer' as const,
      }),
    }),
    interpretation: Object.freeze({
      providerRotationDependenceInvestigated:
        true as const,
      providerRotationEquivarianceRefutedForExactFixture:
        true as const,
      anatomyRequiredForObservedRotationDependence:
        false as const,
      detectorStageFailureClaimed: false as const,
      anatomicalMappingReviewOutcome: 'hold' as const,
      providerSideRotationCompensationAuditRequired:
        true as const,
    }),
    nextGate:
      'audit_exact_runtime_provider_side_rotation_compensation_semantics_before_any_anatomical_mapping_review' as const,
    authority: Object.freeze({
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
