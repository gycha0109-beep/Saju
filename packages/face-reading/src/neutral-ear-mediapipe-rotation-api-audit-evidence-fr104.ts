export const NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_EVIDENCE_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-mediapipe-rotation-api-audit-evidence-v1' as const,
    authorityState:
      'exact_installed_0_10_35_rotation_api_artifacts_and_behavior_audited' as const,

    package: Object.freeze({
      name: '@mediapipe/tasks-vision' as const,
      version: '0.10.35' as const,
    }),

    artifacts: Object.freeze({
      packageJson: Object.freeze({
        relativePath: 'package.json' as const,
        sizeBytes: 1084 as const,
        sha256:
          '5c96247445e57a2d087758114b116fed7d46eb401342aee19b1acc56d36fe707' as const,
      }),
      declaration: Object.freeze({
        relativePath: 'vision.d.ts' as const,
        sizeBytes: 116918 as const,
        sha256:
          '3825dba564fc06720dc0934b72a22711ac6b7491ae8662e573ac205699ea016b' as const,
      }),
      runtimeEntry: Object.freeze({
        relativePath: 'vision_bundle.mjs' as const,
        sizeBytes: 136993 as const,
        sha256:
          '55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe' as const,
      }),
    }),

    declarationEvidence: Object.freeze({
      faceLandmarkerDetectAcceptsImageProcessingOptions:
        true as const,
      imageProcessingOptionsDeclared: true as const,
      rotationDegreesProperty: true as const,
      clockwiseTextObserved: true as const,
      multipleOf90TextObserved: true as const,
    }),

    runtimeBehavioralEvidence: Object.freeze({
      zeroDegreesVsUndefinedExactForR0: true as const,
      zeroDegreesVsUndefinedExactForM0: true as const,
      signedProbe: Object.freeze({
        positiveDegrees: 270 as const,
        signedDegrees: -90 as const,
        signedDegreesThrows: false as const,
        exactProviderResultEqual: false as const,
        canonicalRepresentation:
          'positive_0_90_180_270_only' as const,
      }),
      invalidRotation: Object.freeze({
        degrees: 45 as const,
        throws: true as const,
        resultProduced: false as const,
      }),
      oppositeDirectionProbeExecuted: true as const,
    }),

    interpretationBoundary: Object.freeze({
      exactInstalledArtifactIsPrimaryAuthority: true as const,
      upstreamMasterUsedAsExactPackageAuthority:
        false as const,
      anatomicalSemanticsUsed: false as const,
    }),

    authority: Object.freeze({
      providerRotationCompensationSemanticsAudited:
        true as const,
      providerLabelMappedToAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
