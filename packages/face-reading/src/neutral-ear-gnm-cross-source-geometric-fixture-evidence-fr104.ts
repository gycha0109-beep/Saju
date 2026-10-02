export const NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-gnm-cross-source-geometric-fixture-evidence-v1' as const,
    authorityState:
      'u5b_rendered_fixture_digest_pinned_no_provider_execution' as const,

    preregistrationMergeSha:
      'dca237437d170ef03f8d15d370726a82c68345c3' as const,
    firstRenderExecutionHeadSha:
      '0c39be93bad5fbc8cb08a99d3a9f41fed9786710' as const,
    firstRenderWorkflowRunId: 37001698584 as const,

    source: Object.freeze({
      repository: 'google/GNM' as const,
      upstreamCommit:
        'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690' as const,
      sourcePath:
        'gnm/shape/data/versions/v3_0/gnm_head.npz' as const,
      gitBlobSha:
        'ae49903ad7d50ce1d64e464a0407441f2781873c' as const,
      byteLength: 53_305_389 as const,
      variantNormalized: 'head' as const,
      sourceFamily: 'google_gnm_head' as const,
      sourceFamilyDistinctFromMakeHuman: true as const,
      sourceFamilyDistinctFromMediaPipe: true as const,
    }),

    geometry: Object.freeze({
      vertexCount: 17_821 as const,
      triangleCount: 35_324 as const,
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
    }),

    renderedFixture: Object.freeze({
      pngSha256:
        '1af28c1677375f5551e3613bbc7e0d78bfba83e74df2438c0819a343252cc325' as const,
      width: 1024 as const,
      height: 1024 as const,
      repeatRenderByteEqual: true as const,
      repeatRenderSha256Equal: true as const,
      repositoryPersisted: false as const,
    }),

    camera: Object.freeze({
      projectionModel: 'orthographic' as const,
      centerRule:
        'full_gnm_template_xyz_bounds_midpoint' as const,
      center: Object.freeze([
        -0.00006895512342453003,
        0.23633597418665886,
        0.0271456316113472,
      ] as const),
      spanRule:
        'max(full_template_span_y_times_1_24,full_template_span_x_times_1_34)' as const,
      span: 0.4235199674963951 as const,
      halfSpan: 0.21175998374819754 as const,
      viewDirection: Object.freeze([0, 0, -1] as const),
      screenRightAxis: Object.freeze([1, 0, 0] as const),
      screenUpAxis: Object.freeze([0, 1, 0] as const),
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
      providerLandmarkDerived: false as const,
      providerLabelDerived: false as const,
      imageSpaceXSignDefinesAnatomicalSide: false as const,
      gnmAxisOrderingDefinesAnatomicalSide: false as const,
    }),

    execution: Object.freeze({
      geometryPreparationExecuted: true as const,
      renderExecuted: true as const,
      providerExecuted: false as const,
      providerResultObserved: false as const,
      renderDigestAdmitted: true as const,
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
      providerLabelMappedToAnatomicalSide:
        false as const,
      globalProviderAnatomicalSemanticsEstablished:
        false as const,
      anatomicalReferenceAdmitted:
        false as const,
      anatomicalLateralityAuthorized:
        false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized:
        false as const,
      productionAuthorization: false as const,
    }),

    nextGate:
      'U5B_C_FIRST_PROVIDER_OBSERVATION_ON_PINNED_GNM_FIXTURE_ONLY_AFTER_U5B_B_MERGE' as const,
  });
