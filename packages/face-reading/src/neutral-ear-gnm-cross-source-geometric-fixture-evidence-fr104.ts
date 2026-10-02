export const NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-gnm-cross-source-geometric-fixture-evidence-v1' as const,
    authorityState:
      'u5b_gnm_rendered_fixture_digest_pinned_no_provider_execution' as const,

    preregistrationMergeSha:
      'dca237437d170ef03f8d15d370726a82c68345c3' as const,
    firstRenderExecutionHeadSha:
      'bd9618c826f6c4c51007614f0cb9d59370bc297f' as const,
    firstRenderWorkflowRunId: 37005790974 as const,
    firstRenderCandidateResultSha256:
      'a994a3708cb4247d93f2a9ddda46129a55c3a9ba0e3d9f86853fab4d53469528' as const,

    source: Object.freeze({
      repository: 'google/GNM' as const,
      upstreamCommit:
        'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690' as const,
      sourcePath:
        'gnm/shape/data/versions/v3_0/gnm_head.npz' as const,
      gitBlobSha:
        'ae49903ad7d50ce1d64e464a0407441f2781873c' as const,
      byteLength: 53_305_389 as const,
      versionNormalized: '3.0' as const,
      variantNormalized: 'head' as const,
      vertexCount: 17_821 as const,
      triangleCount: 35_324 as const,
      stagedVerticesSha256:
        '8dce4419d465a79a13ecc6286d75891ce5730d8292bfbedae977bda004cdbf45' as const,
      stagedTrianglesSha256:
        '8340922b49e0a8a5520748e4f42e02a48ed5ab3c8441d0f1d4c06893cf30dd0d' as const,
    }),

    renderedFixture: Object.freeze({
      pngSha256:
        '1af28c1677375f5551e3613bbc7e0d78bfba83e74df2438c0819a343252cc325' as const,
      width: 1024 as const,
      height: 1024 as const,
      repeatRenderByteEqual: true as const,
      repeatRenderSha256Equal: true as const,
      rasterizedTriangleCount: 35_324 as const,
      foregroundPixelCount: 305_582 as const,
      repositoryPersisted: false as const,
    }),

    camera: Object.freeze({
      centerRule:
        'full_gnm_template_xyz_bounds_midpoint' as const,
      projectionModel: 'orthographic' as const,
      spanRule:
        'max(full_template_span_y_times_1_24,full_template_span_x_times_1_34)' as const,
      bounds: Object.freeze({
        min: Object.freeze([
          -0.12777356803417206,
          0.06556179374456406,
          -0.09221039712429047,
        ] as const),
        max: Object.freeze([
          0.127635657787323,
          0.40711015462875366,
          0.14650166034698486,
        ] as const),
        center: Object.freeze([
          -0.00006895512342453003,
          0.23633597418665886,
          0.0271456316113472,
        ] as const),
        span: Object.freeze([
          0.25540922582149506,
          0.3415483608841896,
          0.23871205747127533,
        ] as const),
      }),
      orthographicSpan: 0.4235199674963951 as const,
      screenRightAxis: '+X' as const,
      screenUpAxis: '+Y' as const,
      cameraLookDirection: '-Z' as const,
    }),

    anatomicalGroundTruth: Object.freeze({
      anatomicalLeftEye: Object.freeze({
        sourceJoint: 'left_eye' as const,
        sourceJointIndex: 2 as const,
        sourcePoint: Object.freeze([
          0.030839037150144577,
          0.30316492915153503,
          0.09888789802789688,
        ] as const),
        normalizedImageCoordinate: Object.freeze({
          x: 0.5729788313318006 as const,
          y: 0.34220589324293194 as const,
        }),
      }),
      anatomicalRightEye: Object.freeze({
        sourceJoint: 'right_eye' as const,
        sourceJointIndex: 3 as const,
        sourcePoint: Object.freeze([
          -0.030866222456097603,
          0.3031134307384491,
          0.09897840023040771,
        ] as const),
        normalizedImageCoordinate: Object.freeze({
          x: 0.4272826083862617 as const,
          y: 0.342327489429743 as const,
        }),
      }),
      sameCameraMatrixAsRenderedFixture: true as const,
      directVsMatrixProjectionMaximumError:
        5.551115123125783e-17 as const,
      semanticAuthority:
        'direct_gnm_source_joint_names_only' as const,
      providerLandmarkDerived: false as const,
      providerLabelDerived: false as const,
      imageSpaceXSignDefinesAnatomicalSide: false as const,
      gnmAxisOrderingDefinesAnatomicalSide: false as const,
    }),

    execution: Object.freeze({
      renderExecuted: true as const,
      providerExecuted: false as const,
      providerPackageImported: false as const,
      providerResultObserved: false as const,
      renderDigestAdmitted: true as const,
    }),

    independence: Object.freeze({
      sourceFamilyIndependentFromU4aAndU4bMakeHuman:
        true as const,
      sourceFamilyIndependentFromMediaPipe:
        true as const,
      providerObservationStillRequired:
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

    authority: Object.freeze({
      gnmCrossSourceSemanticWitnessAudited: true as const,
      gnmCrossSourceFixtureDigestPinned: true as const,
      gnmCrossSourceGeometricValidationExecuted:
        false as const,
      gnmCrossSourceGeometricMappingValidated:
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
      'U5B_C_FIRST_MEDIAPIPE_EIGHT_CASE_OBSERVATION_ON_PINNED_GNM_FIXTURE_ONLY_AFTER_U5B_B_MERGE' as const,
  });
