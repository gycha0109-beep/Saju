export const NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-provider-rotation-compensation-empirical-evidence-v1' as const,
    authorityState:
      'partial_availability_recovery_without_coordinate_canonicalization' as const,

    resultSha256:
      '9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c' as const,

    runtime: Object.freeze({
      packageName: '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      rotationRepresentation:
        'positive_0_90_180_270_only' as const,
    }),

    apiBehavioralProbes: Object.freeze({
      zeroDegreesVsUndefinedExact: Object.freeze({
        R0: true as const,
        M0: true as const,
      }),
      signedEquivalent: Object.freeze({
        positiveDegrees: 270 as const,
        signedDegrees: -90 as const,
        signedDegreesThrows: false as const,
        exactProviderResultEqual: false as const,
      }),
      invalidRotation: Object.freeze({
        degrees: 45 as const,
        throws: true as const,
        resultProduced: false as const,
      }),
    }),

    cases: Object.freeze({
      R0: Object.freeze({
        compensatedRelation:
          'provider_same_label_closer' as const,
        sameLabelCost: 0,
        crossLabelCost: 0.3540690540188288,
        exactBaselineProviderScalarsRecovered:
          true as const,
        availabilityRecovered: false as const,
      }),
      R90: Object.freeze({
        compensatedRelation:
          'provider_same_label_closer' as const,
        sameLabelCost: 0.2508118937817105,
        crossLabelCost: 0.2520675373218478,
        exactBaselineProviderScalarsRecovered:
          false as const,
        availabilityRecovered: false as const,
      }),
      R180: Object.freeze({
        compensatedRelation:
          'provider_cross_label_closer' as const,
        sameLabelCost: 0.3562492451686251,
        crossLabelCost: 0.05188939610706061,
        exactBaselineProviderScalarsRecovered:
          false as const,
        availabilityRecovered: false as const,
        predecessorCrossLabelResolved: false as const,
      }),
      R270: Object.freeze({
        compensatedRelation:
          'provider_cross_label_closer' as const,
        sameLabelCost: 0.2525103191934329,
        crossLabelCost: 0.2488957677597124,
        exactBaselineProviderScalarsRecovered:
          false as const,
        availabilityRecovered: true as const,
      }),
      M0: Object.freeze({
        compensatedRelation:
          'provider_same_label_closer' as const,
        sameLabelCost: 0,
        crossLabelCost: 0.35035621277637186,
        exactBaselineProviderScalarsRecovered:
          true as const,
        availabilityRecovered: false as const,
      }),
      M90: Object.freeze({
        compensatedRelation:
          'provider_cross_label_closer' as const,
        sameLabelCost: 0.25069652899493167,
        crossLabelCost: 0.24820791504887477,
        exactBaselineProviderScalarsRecovered:
          false as const,
        availabilityRecovered: false as const,
      }),
      M180: Object.freeze({
        compensatedRelation:
          'provider_cross_label_closer' as const,
        sameLabelCost: 0.35382618510708697,
        crossLabelCost: 0.05050724548816174,
        exactBaselineProviderScalarsRecovered:
          false as const,
        availabilityRecovered: true as const,
      }),
      M270: Object.freeze({
        compensatedRelation:
          'provider_cross_label_closer' as const,
        sameLabelCost: 0.25158258204355527,
        crossLabelCost: 0.24969698581644456,
        exactBaselineProviderScalarsRecovered:
          false as const,
        availabilityRecovered: true as const,
      }),
    }),

    summary: Object.freeze({
      state:
        'provider_rotation_compensation_partially_effective' as const,
      compensatedAvailableCaseIds: Object.freeze([
        'R0','R90','R180','R270',
        'M0','M90','M180','M270',
      ] as const),
      availabilityRecoveredCaseIds: Object.freeze([
        'R270','M180','M270',
      ] as const),
      sameLabelCompensatedCaseIds: Object.freeze([
        'R0','R90','M0',
      ] as const),
      crossLabelCompensatedCaseIds: Object.freeze([
        'R180','R270','M90','M180','M270',
      ] as const),
      unresolvedCompensatedCaseIds:
        Object.freeze([] as const),
      r180CrossLabelResolved: false as const,
    }),

    interpretation: Object.freeze({
      providerRotationCompensationSemanticsAudited:
        true as const,
      providerAvailabilityRecoveryObserved:
        true as const,
      providerCoordinateCanonicalizationEstablished:
        false as const,
      providerRotationCompensationEffectiveForExactFixture:
        false as const,
      canonicalProviderOrientationNormalizationAvailable:
        false as const,
      anatomicalMappingReviewOutcome: 'hold' as const,
    }),

    nextGate:
      'audit_compensated_output_coordinate_frame_semantics_before_any_anatomical_mapping_review' as const,

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
