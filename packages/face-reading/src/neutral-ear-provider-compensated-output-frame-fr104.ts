import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-makehuman-provider-rotation-compensation-empirical-evidence-fr104.js';

export type NeutralEarCompensatedOutputFrameHypothesisFR104V1 =
  | 'canonical_output_frame'
  | 'original_input_image_frame'
  | 'opposite_rotated_output_frame';

export const NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-provider-compensated-output-frame-protocol-v1' as const,
    phase:
      'FR104_PROVIDER_COMPENSATED_OUTPUT_FRAME_U3_2_1' as const,
    studyKind:
      'retrospective_coordinate_frame_audit' as const,
    authorityState:
      'protocol_ready_derived_empirical_result_not_yet_admitted' as const,

    predecessor: Object.freeze({
      evidenceRef:
        'NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104' as const,
      resultSha256:
        NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104
          .resultSha256,
      liveReplayRequiredBeforeAnalysis: true as const,
      liveReplayResultPath:
        '.cache/face-geometry/fr104-u3-2-result.json' as const,
      repositoryPersistence: false as const,
    }),

    hypotheses: Object.freeze({
      canonical_output_frame: Object.freeze({
        id: 'canonical_output_frame' as const,
        transform:
          'identity_provider_output_coordinates' as const,
      }),
      original_input_image_frame: Object.freeze({
        id: 'original_input_image_frame' as const,
        transform:
          'inverse_physical_input_rotation' as const,
      }),
      opposite_rotated_output_frame: Object.freeze({
        id: 'opposite_rotated_output_frame' as const,
        transform:
          'physical_input_rotation' as const,
      }),
    }),

    quarterTurnCases: Object.freeze([
      'R90',
      'R270',
      'M90',
      'M270',
    ] as const),

    halfTurnCases: Object.freeze([
      'R180',
      'M180',
    ] as const),

    decisionRule: Object.freeze({
      labelIndependentPrimaryMetric:
        'unordered_pair_cost_min_same_cross' as const,
      quarterTurnOriginalInputFrameRequiresStrictDominance:
        true as const,
      halfTurnCanRejectIdentityButCannotDisambiguateRotationSign:
        true as const,
      aggregateCostRecorded: true as const,
      numericAcceptanceThresholdAuthorized: false as const,
      providerLabelRelationEvaluatedOnlyAfterFrameChoice:
        true as const,
    }),

    scientificStates: Object.freeze([
      'original_input_frame_supported',
      'canonical_output_frame_supported',
      'opposite_rotation_frame_supported',
      'mixed_or_unresolved_output_frame',
    ] as const),

    interpretationBoundary: Object.freeze({
      anatomicalGroundTruthUsed: false as const,
      anatomicalSideSemanticsUsed: false as const,
      providerLabelsUsedToChooseFrame: false as const,
      exactFixtureRuntimeOnly: true as const,
      retrospectiveStudyExplicit: true as const,
    }),

    authority: Object.freeze({
      providerCompensatedOutputFrameAudited: false as const,
      providerCompensatedOutputFrame:
        'unresolved' as const,
      composedProviderOrientationNormalizationAvailableForExactFixture:
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

    nextGate:
      'derive_three_frame_hypotheses_from_exact_live_replayed_u3_2_result_then_admit_bounded_coordinate_frame_evidence' as const,
  });
