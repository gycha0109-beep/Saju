export const NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-prospective-independent-geometry-fixture-evidence-v1' as const,
    authorityState:
      'u4b_rendered_fixture_digest_pinned_no_provider_execution' as const,

    preregistrationMergeSha:
      'bec91cd06b682e26ad9d0f7d6721591235031a34' as const,
    firstRenderExecutionHeadSha:
      '686a328caadfe3ceed5241cb6b9f2c2d41844a7b' as const,
    firstRenderWorkflowRunId: 36833595821 as const,

    source: Object.freeze({
      repository: 'makehumancommunity/makehuman' as const,
      commit:
        'a8bc2d54ff0ac92e78ff71431b1023eda42bf482' as const,
      baseMeshBlobSha1:
        'd26635e9326e3cca30778fd7b9c00062b03cce09' as const,
      morphTargetPath:
        'makehuman/data/targets/head/head-scale-horiz-incr.target' as const,
      morphTargetBlobSha1:
        '9a32e90f7bd4d0a90092052d89137a365e272a67' as const,
      targetRuntimeBlobSha1:
        'eaaf4e9c3d9c67d374a3fe8761812929f2c0f81e' as const,
      targetWeight: 1 as const,
      targetEntryCount: 5240 as const,
    }),

    renderedFixture: Object.freeze({
      pngSha256:
        '91a481011618f7a74aed7380185d640c604dcde587eff69b6f44654c97585b33' as const,
      width: 1024 as const,
      height: 1024 as const,
      repeatRenderByteEqual: true as const,
      repeatRenderSha256Equal: true as const,
      repositoryPersisted: false as const,
    }),

    anatomicalGroundTruth: Object.freeze({
      anatomicalLeftEye: Object.freeze({
        sourceJoint: 'eye.L____head' as const,
        sourcePoint: Object.freeze([
          0.36575,
          7.284149999999999,
          1.24535,
        ] as const),
        normalizedImageCoordinate: Object.freeze({
          x: 0.6081000875693314 as const,
          y: 0.5 as const,
        }),
      }),
      anatomicalRightEye: Object.freeze({
        sourceJoint: 'eye.R____head' as const,
        sourcePoint: Object.freeze([
          -0.36575,
          7.284149999999999,
          1.24535,
        ] as const),
        normalizedImageCoordinate: Object.freeze({
          x: 0.3918999124306686 as const,
          y: 0.5 as const,
        }),
      }),
      sameCameraMatrixAsRenderedFixture: true as const,
      directVsMatrixProjectionMaximumError: 0 as const,
      providerLandmarkDerived: false as const,
      providerLabelDerived: false as const,
      florencePromptSideDerived: false as const,
      imageSpaceXSignDefinesAnatomicalSide: false as const,
    }),

    camera: Object.freeze({
      centerRule:
        'morphed_makehuman_eye_midpoint' as const,
      projectionModel: 'orthographic' as const,
      spanRule:
        '3_times_morphed_eye_midpoint_to_head_distance' as const,
      span: 3.3834385172483907 as const,
      halfSpan: 1.6917192586241954 as const,
    }),

    execution: Object.freeze({
      renderExecuted: true as const,
      providerExecuted: false as const,
      providerResultObserved: false as const,
      renderDigestAdmitted: true as const,
    }),

    independence: Object.freeze({
      geometryUsedInU4a: false as const,
      sameSourceFamilyAsU4a: true as const,
      independentSourceFamily: false as const,
      crossSourceFamilyValidationStillRequired: true as const,
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

    authority: Object.freeze({
      u4bFixtureDigestPinned: true as const,
      prospectiveIndependentGeometryValidationExecuted:
        false as const,
      prospectiveIndependentGeometryMappingValidated:
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
      'U4B_C_FIRST_PROVIDER_OBSERVATION_ON_PINNED_FIXTURE_ONLY_AFTER_U4B_B_MERGE' as const,
  });
