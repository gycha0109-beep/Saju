export const NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_FR104 =
  Object.freeze({
    schemaVersion:
      'fr104-mediapipe-rotation-api-audit-protocol-v1' as const,
    phase:
      'FR104_MEDIAPIPE_ROTATION_API_AUDIT_U3_2A' as const,
    authorityState:
      'exact_installed_0_10_35_artifacts_and_runtime_rotation_behavior_audited' as const,

    packageIdentity: Object.freeze({
      packageName: '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      lockfileExactVersionRequired: true as const,
      installedPackageExactVersionRequired: true as const,
    }),

    installedArtifactContract: Object.freeze({
      packageJsonRelativePath: 'package.json' as const,
      declarationRelativePath: 'vision.d.ts' as const,
      runtimeEntryResolvedFromImportMeta: true as const,
      packageJsonSha256Required: true as const,
      declarationSha256Required: true as const,
      runtimeEntrySha256Required: true as const,
      artifactBytesCommittedToRepository: false as const,
    }),

    declarationContract: Object.freeze({
      faceLandmarkerDetectAcceptsImageProcessingOptions:
        true as const,
      rotationDegreesPropertyRequired: true as const,
      rotationDegreesType: 'number_optional' as const,
      publicClockwiseSemanticsEvidenceRequired: true as const,
    }),

    runtimeProbeContract: Object.freeze({
      zeroDegreesVsUndefinedProbeRequired: true as const,
      signedEquivalentProbe: Object.freeze({
        physicalCaseId: 'R90' as const,
        positiveDegrees: 270 as const,
        signedDegrees: -90 as const,
      }),
      invalidRotationProbe: Object.freeze({
        degrees: 45 as const,
        mustThrow: true as const,
        resultMustNotBeProduced: true as const,
      }),
      oppositeDirectionProbe: Object.freeze({
        physicalCaseId: 'R90' as const,
        compensationDegrees: 270 as const,
        oppositeDegrees: 90 as const,
      }),
    }),

    interpretationBoundary: Object.freeze({
      upstreamMasterMayDefineExactPackageSemantics:
        false as const,
      exactInstalledArtifactIsPrimaryAuthority: true as const,
      runtimeProbeIsBehavioralAuthority: true as const,
      anatomicalSemanticsUsed: false as const,
    }),

    authority: Object.freeze({
      providerRotationCompensationSemanticsAudited:
        true as const,
      providerRotationCompensationEffectiveForExactFixture:
        false as const,
      canonicalProviderOrientationNormalizationAvailable:
        false as const,
      anatomicalLateralityAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),

    empiricalEvidenceRef:
      'NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_EVIDENCE_FR104' as const,

    nextGate:
      'consume_exact_audited_rotation_api_contract_in_bounded_compensation_evidence_only' as const,
  });
