export const NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_EMPIRICAL_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-controlled-anatomical-side-mapping-empirical-evidence-v1' as const,
    authorityState:
      'reflection_parity_conditional_mapping_supported_on_exact_fixture_admitted' as const,

    auditHeadSha:
      'a69a07b872a2bedb3bfe5611c4d383c5c2ff8325' as const,
    auditWorkflowRunId: 36813396882 as const,
    auditMergeSha:
      '2964d334bb6264517872e9d540ed40b7e034d614' as const,
    u3_2CompensationResultSha256:
      '9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c' as const,
    u3_3ProspectiveResultSha256:
      '793b1059308242d11c176300bd141b70a49c2fa681a49bc6e38e1abddf4aaab4' as const,
    u4aDerivedResultSha256:
      '863b1909b2bb33437496c990fd97529d986b2fca1564addb6e1591d232b7f2cf' as const,

    controlledReference: Object.freeze({
      fixturePngSha256:
        'f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb' as const,
      canonicalRgbaSha256:
        'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364' as const,
      anatomicalLeftEyeSource:
        'MakeHuman eye.L____head projected by exact render camera' as const,
      anatomicalRightEyeSource:
        'MakeHuman eye.R____head projected by exact render camera' as const,
      providerLandmarkDerived: false as const,
      providerLabelDerived: false as const,
    }),

    summary: Object.freeze({
      state:
        'reflection_parity_conditional_mapping_supported' as const,
      evaluatedCaseIds: Object.freeze([
        'R0','R90','R180','R270',
        'M0','M90','M180','M270',
      ] as const),
      unavailableCaseIds: Object.freeze([] as const),
      failedCaseIds: Object.freeze([] as const),
      orientationPreservingDirectForEveryAvailableCase:
        true as const,
      orientationReversingSwappedForEveryAvailableCase:
        true as const,
      allEightCasesAvailable: true as const,
      numericAcceptanceThresholdApplied: false as const,
      providerPublishedSideNamesUsedAsAnatomicalAuthority:
        false as const,
      imageSpaceXSignUsedAsAnatomicalAuthority:
        false as const,
    }),

    directSwappedCosts: Object.freeze({
      R0: Object.freeze({
        direct:0.02456967216060714,
        swapped:0.35972525227214214,
        relation:'direct_assignment_closer' as const,
      }),
      R90: Object.freeze({
        direct:0.0251961315461134,
        swapped:0.35952807254254904,
        relation:'direct_assignment_closer' as const,
      }),
      R180: Object.freeze({
        direct:0.028621665163675758,
        swapped:0.3584955007831722,
        relation:'direct_assignment_closer' as const,
      }),
      R270: Object.freeze({
        direct:0.025449295833505033,
        swapped:0.35839249708583565,
        relation:'direct_assignment_closer' as const,
      }),
      M0: Object.freeze({
        direct:0.35788482319576975,
        swapped:0.025677951082069113,
        relation:'swapped_assignment_closer' as const,
      }),
      M90: Object.freeze({
        direct:0.358415418424448,
        swapped:0.028792761353791618,
        relation:'swapped_assignment_closer' as const,
      }),
      M180: Object.freeze({
        direct:0.35806848399131674,
        swapped:0.0266075804281148,
        relation:'swapped_assignment_closer' as const,
      }),
      M270: Object.freeze({
        direct:0.3601669572278045,
        swapped:0.02616992462873194,
        relation:'swapped_assignment_closer' as const,
      }),
    }),

    interpretation: Object.freeze({
      controlledAnatomicalMappingAudited: true as const,
      reflectionParityConditionalMappingSupportedOnExactFixture:
        true as const,
      controlledAnatomicalReferenceAdmittedForExactFixture:
        true as const,
      validationScope:
        'retrospective_exact_controlled_makehuman_fixture_exact_tested_runtime' as const,
      sourceSemanticConflictDeclaredResolved: false as const,
      prospectiveIndependentAnatomicalValidationStillRequired:
        true as const,
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
      'design_and_preregister_prospective_independent_anatomical_reference_validation_before_runtime_subject_photo_laterality' as const,
  });
