export const NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_EMPIRICAL_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-prospective-composed-orientation-normalization-empirical-evidence-v1' as const,
    authorityState:
      'prospective_composed_normalization_supported_admitted' as const,

    preregistrationMergeSha:
      '5bf66ddcfa3b6100d93f7259bd87232095c8912d' as const,
    firstValidExecutionMergeSha:
      '856ad0c19fdef2471434ed3253cf67b55850ae29' as const,
    predecessorDerivedResultSha256:
      '732268b973592f70f606000ffcbd0219e67afcc20b920e57906d14978f5cbb05' as const,
    prospectiveResultSha256:
      '793b1059308242d11c176300bd141b70a49c2fa681a49bc6e38e1abddf4aaab4' as const,

    fixture: Object.freeze({
      fixtureRef: 'skimage_astronaut_public_domain' as const,
      sourceRepository: 'scikit-image/scikit-image' as const,
      sourceCommit:
        '533b7694d2004ae84e49e2cfd0bcfc5f8e562f22' as const,
      sha256:
        '88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5' as const,
      width: 512 as const,
      height: 512 as const,
      previouslyUsedForControlledMirrorStudy: true as const,
      usedInU3_2OrU3_2_1Development: false as const,
    }),

    runtime: Object.freeze({
      packageName: '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      runningMode: 'IMAGE' as const,
      numFaces: 1 as const,
    }),

    summary: Object.freeze({
      state:
        'prospective_composed_normalization_supported' as const,
      evaluatedCaseIds: Object.freeze([
        'R90','R180','R270','M90','M180','M270',
      ] as const),
      unavailableCaseIds: Object.freeze([] as const),
      failedCaseIds: Object.freeze([] as const),
      quarterTurnStrictDominanceSatisfiedForEveryAvailableCase:
        true as const,
      halfTurnIdentityRejectedForEveryAvailableCase:
        true as const,
      allSixRotatedCasesAvailable: true as const,
      numericAcceptanceThresholdApplied: false as const,
      providerLabelsUsedForDecision: false as const,
      anatomicalInterpretationUsed: false as const,
    }),

    unorderedPairCosts: Object.freeze({
      R90: Object.freeze({
        identity: 0.8609687785387168,
        composed: 0.004019598639518765,
        opposite: 1.2180429934630648,
      }),
      R180: Object.freeze({
        identity: 1.2172198425550267,
        composed: 0.00526201305598233,
        opposite: 0.00526201305598233,
      }),
      R270: Object.freeze({
        identity: 0.8617153750658679,
        composed: 0.0034770712559623242,
        opposite: 1.221379652899968,
      }),
      M90: Object.freeze({
        identity: 0.8608039321032435,
        composed: 0.004295411288492099,
        opposite: 1.2158090456181592,
      }),
      M180: Object.freeze({
        identity: 1.2168021910668552,
        composed: 0.005500609024443177,
        opposite: 0.005500609024443177,
      }),
      M270: Object.freeze({
        identity: 0.8608660213756174,
        composed: 0.004108235954123095,
        opposite: 1.2207388445996106,
      }),
    }),

    interpretation: Object.freeze({
      prospectiveComposedNormalizationValidated: true as const,
      providerCompensatedOutputFrameProspectivelyValidated:
        true as const,
      validationScope:
        'independent_fixture_exact_tested_runtime' as const,
      ruleRetunedAfterObservation: false as const,
      anatomicalMappingReviewOutcome: 'hold' as const,
    }),

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

    nextGate:
      'FR104_U4_ANATOMICAL_MAPPING_REVIEW_MAY_BE_RECONSIDERED_WITH_SEPARATE_ANATOMICAL_GROUND_TRUTH' as const,
  });
