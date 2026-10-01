export const NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_EMPIRICAL_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-prospective-independent-geometry-provider-evidence-v1' as const,
    authorityState:
      'prospective_independent_geometry_mapping_supported_admitted' as const,

    preregistrationMergeSha:
      'bec91cd06b682e26ad9d0f7d6721591235031a34' as const,
    fixturePinMergeSha:
      'c81c65d6aa7dedc5fd492df663d97dd5ff1ccf93' as const,
    candidateMergeSha:
      '19095a89773d517c2b6d69c45544525b9262459a' as const,

    firstObservationWorkflowRunId:
      36852342085 as const,
    exactReplayWorkflowRunId:
      36852599487 as const,

    fixturePngSha256:
      '91a481011618f7a74aed7380185d640c604dcde587eff69b6f44654c97585b33' as const,
    resultSha256:
      'e601205ccdad7ec66900d953ed6f742e04dbd37e6074ccc4bb36bf21dd3b16a8' as const,
    state:
      'prospective_independent_geometry_mapping_supported' as const,

    caseCosts:Object.freeze({
      R0:Object.freeze({
        direct:0.027928257825205603,
        swapped:0.4250445225028384,
        relation:'direct_assignment_closer' as const,
      }),
      R90:Object.freeze({
        direct:0.029718198041168414,
        swapped:0.4243093468638832,
        relation:'direct_assignment_closer' as const,
      }),
      R180:Object.freeze({
        direct:0.02890459634878363,
        swapped:0.4285892132847949,
        relation:'direct_assignment_closer' as const,
      }),
      R270:Object.freeze({
        direct:0.027013495539828767,
        swapped:0.427821617867851,
        relation:'direct_assignment_closer' as const,
      }),
      M0:Object.freeze({
        direct:0.42772041164106067,
        swapped:0.02697392168748674,
        relation:'swapped_assignment_closer' as const,
      }),
      M90:Object.freeze({
        direct:0.4285124926745898,
        swapped:0.028820229662936306,
        relation:'swapped_assignment_closer' as const,
      }),
      M180:Object.freeze({
        direct:0.4265415151981318,
        swapped:0.029106096735218745,
        relation:'swapped_assignment_closer' as const,
      }),
      M270:Object.freeze({
        direct:0.4253760585961517,
        swapped:0.029034204988878376,
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
      providerPublishedSideNamesUsedAsAnatomicalAuthority:
        false as const,
      imageSpaceXSignUsedAsAnatomicalAuthority:
        false as const,
      ruleRetunedAfterObservation:false as const,
    }),

    interpretation:Object.freeze({
      prospectiveGeometryFixtureIndependentFromU4a:
        true as const,
      sourceFamilyIndependentFromU4a:
        false as const,
      sameSourceFamilyReplicationSupported:
        true as const,
      crossSourceFamilyValidationStillRequired:
        true as const,
      globalProviderAnatomicalSemanticsEstablished:
        false as const,
      runtimeSubjectPhotoLateralityAuthorized:
        false as const,
    }),

    authority:Object.freeze({
      u4bFixtureDigestPinned:true as const,
      prospectiveIndependentGeometryValidationExecuted:
        true as const,
      prospectiveIndependentGeometryMappingValidated:
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
      'cross_source_family_anatomical_reference_validation_before_runtime_subject_photo_laterality' as const,
  });
