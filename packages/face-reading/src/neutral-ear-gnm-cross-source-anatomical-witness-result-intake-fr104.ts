import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarGnmCrossSourceWitnessEvidenceFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-gnm-cross-source-anatomical-witness-evidence-v1';
    authorityState:
      'gnm_direct_left_right_joint_witness_supported_admitted';
    resultSha256:
      '7eac8cb7b030fed200cf6d4b7d8406901449f130deb3b44c7ef2b98a79b6cd21';
    state:
      'gnm_direct_left_right_joint_witness_supported';
    gnmCrossSourceSemanticWitnessAudited: true;
    gnmCrossSourceGeometricValidationExecuted: false;
    providerLabelMappedToAnatomicalSide: false;
    globalProviderAnatomicalSemanticsEstablished: false;
    anatomicalReferenceAdmitted: false;
    anatomicalLateralityAuthorized: false;
    validatedExternalEarObservationAuthorized: false;
    traditionalBindingAuthorized: false;
    productionAuthorization: false;
  }>;

const EXPECTED_RESULT_SHA256 =
  '7eac8cb7b030fed200cf6d4b7d8406901449f130deb3b44c7ef2b98a79b6cd21' as const;

const EXPECTED_LEFT_POSITION = Object.freeze([
  0.030839037150144577,
  0.30316492915153503,
  0.09888789802789688,
] as const);

const EXPECTED_RIGHT_POSITION = Object.freeze([
  -0.030866222456097603,
  0.3031134307384491,
  0.09897840023040771,
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 U5A-B2 admission ${message}`,
  );
}

function object(
  value: unknown,
  label: string,
): Record<string, unknown> {
  if (
    typeof value !== 'object'
    || value === null
    || Array.isArray(value)
  ) {
    fail(`${label} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function exact(
  actual: unknown,
  expected: string | number | boolean | null,
  label: string,
): void {
  if (!Object.is(actual, expected)) {
    fail(`${label} mismatch.`);
  }
}

function exactArray(
  actual: unknown,
  expected: readonly unknown[],
  label: string,
): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail(`${label} mismatch.`);
  }
}

export function admitNeutralEarGnmCrossSourceWitnessResultFR104(
  input: unknown,
  resultSha256: string,
): NeutralEarGnmCrossSourceWitnessEvidenceFR104V1 {
  exact(resultSha256, EXPECTED_RESULT_SHA256, 'resultSha256');

  const root = object(input, 'result');

  exact(
    root.schemaVersion,
    'fr104-gnm-cross-source-anatomical-witness-live-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'live_candidate_not_admitted',
    'authorityState',
  );
  exact(
    root.studyKind,
    'cross_source_family_direct_source_semantic_witness_audit',
    'studyKind',
  );

  const assessment = object(root.assessment, 'assessment');
  exact(
    assessment.state,
    'gnm_direct_left_right_joint_witness_supported',
    'assessment.state',
  );
  exact(
    assessment.directSourceLeftEyeJointWitnessPresent,
    true,
    'assessment.directSourceLeftEyeJointWitnessPresent',
  );
  exact(
    assessment.directSourceRightEyeJointWitnessPresent,
    true,
    'assessment.directSourceRightEyeJointWitnessPresent',
  );
  exact(
    assessment.jointPositionsUsableAsControlledAnchors,
    true,
    'assessment.jointPositionsUsableAsControlledAnchors',
  );
  exact(
    assessment.providerGroupsAvailableForReferenceContext,
    true,
    'assessment.providerGroupsAvailableForReferenceContext',
  );

  const asset = object(root.asset, 'asset');
  exact(asset.repository, 'google/GNM', 'asset.repository');
  exact(
    asset.upstreamCommit,
    'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690',
    'asset.upstreamCommit',
  );
  exact(
    asset.sourcePath,
    'gnm/shape/data/versions/v3_0/gnm_head.npz',
    'asset.sourcePath',
  );
  exact(
    asset.expectedGitBlobSha,
    'ae49903ad7d50ce1d64e464a0407441f2781873c',
    'asset.expectedGitBlobSha',
  );
  exact(
    asset.observedGitBlobSha,
    'ae49903ad7d50ce1d64e464a0407441f2781873c',
    'asset.observedGitBlobSha',
  );
  exact(asset.expectedByteLength, 53305389, 'asset.expectedByteLength');
  exact(asset.observedByteLength, 53305389, 'asset.observedByteLength');
  exact(asset.assetVerified, true, 'asset.assetVerified');
  exact(asset.versionNormalized, '3.0', 'asset.versionNormalized');
  exact(asset.variantNormalized, 'head', 'asset.variantNormalized');

  const witness = object(
    root.directSourceSemanticWitness,
    'directSourceSemanticWitness',
  );
  exact(
    witness.leftEyeJointName,
    'left_eye',
    'witness.leftEyeJointName',
  );
  exact(
    witness.rightEyeJointName,
    'right_eye',
    'witness.rightEyeJointName',
  );
  exact(witness.leftEyeJointCount, 1, 'witness.leftEyeJointCount');
  exact(witness.rightEyeJointCount, 1, 'witness.rightEyeJointCount');
  exact(witness.leftEyeJointIndex, 2, 'witness.leftEyeJointIndex');
  exact(witness.rightEyeJointIndex, 3, 'witness.rightEyeJointIndex');
  exact(
    witness.leftEyePositionFinite,
    true,
    'witness.leftEyePositionFinite',
  );
  exact(
    witness.rightEyePositionFinite,
    true,
    'witness.rightEyePositionFinite',
  );
  exact(
    witness.leftRightPositionsDistinct,
    true,
    'witness.leftRightPositionsDistinct',
  );
  exactArray(
    witness.leftEyeTemplateJointPosition,
    EXPECTED_LEFT_POSITION,
    'witness.leftEyeTemplateJointPosition',
  );
  exactArray(
    witness.rightEyeTemplateJointPosition,
    EXPECTED_RIGHT_POSITION,
    'witness.rightEyeTemplateJointPosition',
  );
  exactArray(
    witness.requiredProviderGroups,
    ['ears', 'left', 'right'],
    'witness.requiredProviderGroups',
  );
  exact(
    witness.requiredProviderGroupsPresent,
    true,
    'witness.requiredProviderGroupsPresent',
  );

  const diagnostics = object(root.diagnostics, 'diagnostics');
  exact(
    diagnostics.leftEyeX,
    EXPECTED_LEFT_POSITION[0],
    'diagnostics.leftEyeX',
  );
  exact(
    diagnostics.rightEyeX,
    EXPECTED_RIGHT_POSITION[0],
    'diagnostics.rightEyeX',
  );
  exact(
    diagnostics.xOrdering,
    'left_greater_than_right',
    'diagnostics.xOrdering',
  );
  exact(
    diagnostics.imageSpaceXSignUsedAsSemanticAuthority,
    false,
    'diagnostics.imageSpaceXSignUsedAsSemanticAuthority',
  );
  exact(
    diagnostics.gnmAxisOrderingUsedAsSemanticAuthority,
    false,
    'diagnostics.gnmAxisOrderingUsedAsSemanticAuthority',
  );
  exact(
    diagnostics.mediaPipeProviderLabelsUsedAsSemanticAuthority,
    false,
    'diagnostics.mediaPipeProviderLabelsUsedAsSemanticAuthority',
  );

  const boundary = object(
    root.interpretationBoundary,
    'interpretationBoundary',
  );
  exact(
    boundary.sourceFamilyDistinctFromMakeHuman,
    true,
    'boundary.sourceFamilyDistinctFromMakeHuman',
  );
  exact(
    boundary.sourceFamilyDistinctFromMediaPipe,
    true,
    'boundary.sourceFamilyDistinctFromMediaPipe',
  );
  exact(
    boundary.crossSourceFamilySemanticWitnessCandidate,
    true,
    'boundary.crossSourceFamilySemanticWitnessCandidate',
  );
  exact(
    boundary.crossSourceFamilyGeometricValidationExecuted,
    false,
    'boundary.crossSourceFamilyGeometricValidationExecuted',
  );
  exact(
    boundary.gnmJointNamingAlreadyAdmittedAsRuntimeMapping,
    false,
    'boundary.gnmJointNamingAlreadyAdmittedAsRuntimeMapping',
  );
  exact(
    boundary.globalProviderAnatomicalSemanticsMayBeEstablished,
    false,
    'boundary.globalProviderAnatomicalSemanticsMayBeEstablished',
  );
  exact(
    boundary.runtimeSubjectPhotoLateralityMayBeAuthorized,
    false,
    'boundary.runtimeSubjectPhotoLateralityMayBeAuthorized',
  );

  const privacy = object(root.privacy, 'privacy');
  for (const key of [
    'userImageConsumed',
    'cameraAccessed',
    'rawProviderLandmarksReturned',
    'rawProviderLandmarksPersisted',
    'transformedRasterPersisted',
    'biometricEmbeddingProduced',
    'identityTemplateProduced',
  ] as const) {
    exact(privacy[key], false, `privacy.${key}`);
  }

  const authority = object(root.authority, 'authority');
  for (const key of [
    'gnmCrossSourceSemanticWitnessAudited',
    'gnmCrossSourceGeometricValidationExecuted',
    'providerLabelMappedToAnatomicalSide',
    'globalProviderAnatomicalSemanticsEstablished',
    'anatomicalReferenceAdmitted',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ] as const) {
    exact(authority[key], false, `authority.${key}`);
  }

  return Object.freeze({
    schemaVersion:
      'fr104-gnm-cross-source-anatomical-witness-evidence-v1' as const,
    authorityState:
      'gnm_direct_left_right_joint_witness_supported_admitted' as const,
    resultSha256: EXPECTED_RESULT_SHA256,
    state:
      'gnm_direct_left_right_joint_witness_supported' as const,
    gnmCrossSourceSemanticWitnessAudited: true as const,
    gnmCrossSourceGeometricValidationExecuted: false as const,
    providerLabelMappedToAnatomicalSide: false as const,
    globalProviderAnatomicalSemanticsEstablished: false as const,
    anatomicalReferenceAdmitted: false as const,
    anatomicalLateralityAuthorized: false as const,
    validatedExternalEarObservationAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });
}
