export const NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_EMPIRICAL_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-gnm-cross-source-geometric-provider-evidence-v1' as const,
    authorityState:
      'gnm_cross_source_geometric_mapping_supported_admitted' as const,

    preregistrationMergeSha:
      'dca237437d170ef03f8d15d370726a82c68345c3' as const,
    fixturePinMergeSha:
      '61cecde20b8648909f6ae414ec8610e3f20673ac' as const,
    candidateMergeSha:
      '3424c784cbc2b15b6b0aabe39236faf5ae22c5dd' as const,

    firstObservationWorkflowRunId:
      37084191246 as const,
    exactReplayWorkflowRunId:
      37085912495 as const,

    fixturePngSha256:
      '1af28c1677375f5551e3613bbc7e0d78bfba83e74df2438c0819a343252cc325' as const,
    resultSha256:
      '7c284cad3b467676e20c44ebf63a7aee3dc66c5d22534363286ef532ba3852fe' as const,
    state:
      'gnm_cross_source_geometric_mapping_supported' as const,

    caseCosts:Object.freeze({
      R0:Object.freeze({
        direct:0.012882031198933767,
        swapped:0.2859449713275122,
        relation:'direct_assignment_closer' as const,
      }),
      R90:Object.freeze({
        direct:0.01439847854266454,
        swapped:0.28563923801751523,
        relation:'direct_assignment_closer' as const,
      }),
      R180:Object.freeze({
        direct:0.014967380835671621,
        swapped:0.28673710470008695,
        relation:'direct_assignment_closer' as const,
      }),
      R270:Object.freeze({
        direct:0.013149344314935387,
        swapped:0.2883262973150461,
        relation:'direct_assignment_closer' as const,
      }),
      M0:Object.freeze({
        direct:0.28979418849201966,
        swapped:0.01253495018132203,
        relation:'swapped_assignment_closer' as const,
      }),
      M90:Object.freeze({
        direct:0.28756890003625524,
        swapped:0.015743050990045394,
        relation:'swapped_assignment_closer' as const,
      }),
      M180:Object.freeze({
        direct:0.2883129305537383,
        swapped:0.015266341568986312,
        relation:'swapped_assignment_closer' as const,
      }),
      M270:Object.freeze({
        direct:0.2870139936542212,
        swapped:0.014249632206525012,
        relation:'swapped_assignment_closer' as const,
      }),
    }),

    summary:Object.freeze({
      evaluatedCaseIds:Object.freeze([
        'R0','R90','R180','R270',
        'M0','M90','M180','M270',
      ] as const),
      unavailableCaseIds:Object.freeze([] as const),
      failedCaseIds:Object.freeze([] as const),
      orientationPreservingDirectForEveryAvailableCase:
        true as const,
      orientationReversingSwappedForEveryAvailableCase:
        true as const,
      allEightCasesAvailable:true as const,
      numericAcceptanceThresholdApplied:false as const,
      aggregateOverrideApplied:false as const,
      providerPublishedSideNamesUsedAsAnatomicalAuthority:
        false as const,
      imageSpaceXSignUsedAsAnatomicalAuthority:
        false as const,
      gnmAxisOrderingUsedAsAnatomicalAuthority:
        false as const,
      ruleRetunedAfterObservation:false as const,
    }),

    interpretation:Object.freeze({
      sourceFamilyIndependentFromMakeHuman:true as const,
      sourceFamilyIndependentFromMediaPipe:true as const,
      crossSourceFamilyGeometricMappingSupported:
        true as const,
      providerLabelHasGlobalAnatomicalMeaning:
        false as const,
      globalProviderAnatomicalSemanticsEstablished:
        false as const,
      runtimeSubjectPhotoLateralityAuthorized:
        false as const,
      traditionalMeaningAuthorized:false as const,
    }),

    authority:Object.freeze({
      gnmCrossSourceSemanticWitnessAudited:true as const,
      gnmCrossSourceFixtureDigestPinned:true as const,
      gnmCrossSourceGeometricValidationExecuted:
        true as const,
      gnmCrossSourceGeometricMappingValidated:
        true as const,
      providerLabelMappedToAnatomicalSide:false as const,
      globalProviderAnatomicalSemanticsEstablished:
        false as const,
      anatomicalReferenceAdmitted:false as const,
      anatomicalLateralityAuthorized:false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized:false as const,
      productionAuthorization:false as const,
    }),

    nextGate:
      'FR104_PHASE_D_ORIENTATION_MIRROR_PROVENANCE_BEFORE_RUNTIME_LATERALITY' as const,
  });
