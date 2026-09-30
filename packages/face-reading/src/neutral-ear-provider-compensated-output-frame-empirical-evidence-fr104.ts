export const NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_EMPIRICAL_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-provider-compensated-output-frame-empirical-evidence-v1' as const,
    authorityState:
      'original_input_frame_supported_retrospective_audit_admitted' as const,

    predecessorResultSha256:
      '9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c' as const,
    derivedResultSha256:
      '732268b973592f70f606000ffcbd0219e67afcc20b920e57906d14978f5cbb05' as const,

    summary: Object.freeze({
      state: 'original_input_frame_supported' as const,
      selectedHypothesis:
        'original_input_image_frame' as const,
      quarterTurnOriginalInputFrameStrictDominance:
        true as const,
      halfTurnIdentityRejected: true as const,
      aggregateUnorderedPairCost: Object.freeze({
        canonical_output_frame: 1.1000092040019644,
        original_input_image_frame:
          0.017798602734814976,
        opposite_rotated_output_frame:
          0.2062558418317363,
      }),
      selectedSameLabelCaseIds: Object.freeze([
        'R0','R90','R180','R270',
        'M0','M90','M180','M270',
      ] as const),
      selectedCrossLabelCaseIds:
        Object.freeze([] as const),
      providerLabelsUsedToChooseFrame: false as const,
      anatomicalInterpretationUsed: false as const,
      anatomicalMappingReviewOutcome: 'hold' as const,
    }),

    interpretation: Object.freeze({
      providerCompensatedOutputFrameAudited: true as const,
      providerCompensatedOutputFrame:
        'original_input_image_frame' as const,
      composedProviderOrientationNormalizationAvailableForExactFixture:
        true as const,
      studyKind:
        'retrospective_coordinate_frame_audit' as const,
      prospectiveValidationStillRequired:
        true as const,
    }),

    nextGate:
      'FR104_U3_3_PROSPECTIVE_COMPOSED_ORIENTATION_NORMALIZATION_VALIDATION' as const,

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
