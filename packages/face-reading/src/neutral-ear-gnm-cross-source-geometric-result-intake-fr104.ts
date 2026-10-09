import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104,
} from './neutral-ear-gnm-cross-source-geometric-validation-fr104.js';
import {
  NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104,
} from './neutral-ear-gnm-cross-source-geometric-fixture-evidence-fr104.js';

export type NeutralEarGnmCrossSourceGeometryEvidenceFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-gnm-cross-source-geometric-provider-evidence-v1';
    authorityState:
      'gnm_cross_source_geometric_mapping_supported_admitted';
    resultSha256:
      '7c284cad3b467676e20c44ebf63a7aee3dc66c5d22534363286ef532ba3852fe';
    state:'gnm_cross_source_geometric_mapping_supported';
    gnmCrossSourceSemanticWitnessAudited:true;
    gnmCrossSourceFixtureDigestPinned:true;
    gnmCrossSourceGeometricValidationExecuted:true;
    gnmCrossSourceGeometricMappingValidated:true;
    providerLabelMappedToAnatomicalSide:false;
    globalProviderAnatomicalSemanticsEstablished:false;
    anatomicalReferenceAdmitted:false;
    anatomicalLateralityAuthorized:false;
    validatedExternalEarObservationAuthorized:false;
    traditionalBindingAuthorized:false;
    productionAuthorization:false;
  }>;

const EXPECTED_RESULT_SHA256 =
  '7c284cad3b467676e20c44ebf63a7aee3dc66c5d22534363286ef532ba3852fe' as const;

const IDS = Object.freeze([
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const);

const CASES = Object.freeze({
  R0:Object.freeze({
    family:'non_mirrored' as const,
    reflectionParity:'orientation_preserving' as const,
    horizontalMirror:false,
    rotation:0,
    compensation:0,
    transformedRgbaSha256:'45e5d55d6d179cc906f23597e6456763dc38e92f8d82662b0547dcda7327b897' as const,
    directCost:0.012882031198933767,
    swappedCost:0.2859449713275122,
    relation:'direct_assignment_closer' as const,
  }),
  R90:Object.freeze({
    family:'non_mirrored' as const,
    reflectionParity:'orientation_preserving' as const,
    horizontalMirror:false,
    rotation:90,
    compensation:270,
    transformedRgbaSha256:'a93687aa1f8652e51c40333acef87885852910fca8d3ee81f1a22bc836dc20ce' as const,
    directCost:0.01439847854266454,
    swappedCost:0.28563923801751523,
    relation:'direct_assignment_closer' as const,
  }),
  R180:Object.freeze({
    family:'non_mirrored' as const,
    reflectionParity:'orientation_preserving' as const,
    horizontalMirror:false,
    rotation:180,
    compensation:180,
    transformedRgbaSha256:'c6519a12f9e98e5caa6687057c159776095e7acf18ba4563423ecdb541184ea5' as const,
    directCost:0.014967380835671621,
    swappedCost:0.28673710470008695,
    relation:'direct_assignment_closer' as const,
  }),
  R270:Object.freeze({
    family:'non_mirrored' as const,
    reflectionParity:'orientation_preserving' as const,
    horizontalMirror:false,
    rotation:270,
    compensation:90,
    transformedRgbaSha256:'db399de883e866a520e0d3e940288b685e38e1c1f0ed1c9ba943bda2ab92571b' as const,
    directCost:0.013149344314935387,
    swappedCost:0.2883262973150461,
    relation:'direct_assignment_closer' as const,
  }),
  M0:Object.freeze({
    family:'mirrored' as const,
    reflectionParity:'orientation_reversing' as const,
    horizontalMirror:true,
    rotation:0,
    compensation:0,
    transformedRgbaSha256:'36071374d0e60d3f03d170fcc3e211363fcfbcb2ad7cd4efc00db99bd99257c2' as const,
    directCost:0.28979418849201966,
    swappedCost:0.01253495018132203,
    relation:'swapped_assignment_closer' as const,
  }),
  M90:Object.freeze({
    family:'mirrored' as const,
    reflectionParity:'orientation_reversing' as const,
    horizontalMirror:true,
    rotation:90,
    compensation:270,
    transformedRgbaSha256:'8e0a23684fe06cb84cd16d6e06681fa5dec663127b1cb14b7aa397d3e6968572' as const,
    directCost:0.28756890003625524,
    swappedCost:0.015743050990045394,
    relation:'swapped_assignment_closer' as const,
  }),
  M180:Object.freeze({
    family:'mirrored' as const,
    reflectionParity:'orientation_reversing' as const,
    horizontalMirror:true,
    rotation:180,
    compensation:180,
    transformedRgbaSha256:'faf0d3eff9ba7713d7b65cc6ac85765356f0797b476f2ef6989fe2091a280ee3' as const,
    directCost:0.2883129305537383,
    swappedCost:0.015266341568986312,
    relation:'swapped_assignment_closer' as const,
  }),
  M270:Object.freeze({
    family:'mirrored' as const,
    reflectionParity:'orientation_reversing' as const,
    horizontalMirror:true,
    rotation:270,
    compensation:90,
    transformedRgbaSha256:'5c8f02999dc7789218f5e5bac79d16e2de76e43f774a8ffe67209ebddc2311ff' as const,
    directCost:0.2870139936542212,
    swappedCost:0.014249632206525012,
    relation:'swapped_assignment_closer' as const,
  }),
} as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 U5B-D admission ${message}`,
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

function arrayExact(
  actual: unknown,
  expected: readonly string[],
  label: string,
): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail(`${label} mismatch.`);
  }
}

export function admitNeutralEarGnmCrossSourceGeometryResultFR104(
  input: unknown,
  resultSha256: string,
): NeutralEarGnmCrossSourceGeometryEvidenceFR104V1 {
  exact(resultSha256, EXPECTED_RESULT_SHA256, 'resultSha256');

  const protocol =
    NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104;
  const fixtureEvidence =
    NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104;
  const root = object(input, 'result');

  exact(
    root.schemaVersion,
    'fr104-gnm-cross-source-geometric-provider-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'prospective_candidate_result_not_admitted',
    'authorityState',
  );
  exact(root.studyKind, protocol.studyKind, 'studyKind');

  const preregistration =
    object(root.preregistration, 'preregistration');
  exact(
    preregistration.preregistrationMergeSha,
    fixtureEvidence.preregistrationMergeSha,
    'preregistration.preregistrationMergeSha',
  );
  exact(
    preregistration.fixturePinMergeRequiredBeforeExecution,
    true,
    'preregistration.fixturePinMergeRequiredBeforeExecution',
  );
  exact(
    JSON.stringify(preregistration.frozenRule),
    JSON.stringify(protocol.frozenRule),
    'preregistration.frozenRule',
  );

  const fixture = object(root.fixture, 'fixture');
  exact(
    fixture.fixtureId,
    'google_gnm_head_v3_u5b',
    'fixture.fixtureId',
  );
  exact(
    fixture.expectedPngSha256,
    fixtureEvidence.renderedFixture.pngSha256,
    'fixture.expectedPngSha256',
  );
  exact(
    fixture.observedPngSha256,
    fixtureEvidence.renderedFixture.pngSha256,
    'fixture.observedPngSha256',
  );
  exact(fixture.digestVerified, true, 'fixture.digestVerified');
  exact(fixture.width, 1024, 'fixture.width');
  exact(fixture.height, 1024, 'fixture.height');

  const runtime = object(root.runtime, 'runtime');
  exact(
    runtime.packageName,
    '@mediapipe/tasks-vision',
    'runtime.packageName',
  );
  exact(runtime.packageVersion, '0.10.35', 'runtime.packageVersion');
  exact(runtime.runningMode, 'IMAGE', 'runtime.runningMode');
  exact(runtime.numFaces, 1, 'runtime.numFaces');
  exact(runtime.expectedLandmarkCount, 478, 'runtime.expectedLandmarkCount');
  exact(
    runtime.imageProcessingOptionsRotationDegreesUsed,
    true,
    'runtime.imageProcessingOptionsRotationDegreesUsed',
  );

  if (!Array.isArray(root.cases) || root.cases.length !== 8) {
    fail('cases must contain exactly eight entries.');
  }

  for (const [index, id] of IDS.entries()) {
    const item = object(root.cases[index], `cases[${index}]`);
    const expected = CASES[id];
    exact(item.id, id, `${id}.id`);
    exact(item.family, expected.family, `${id}.family`);
    exact(
      item.reflectionParity,
      expected.reflectionParity,
      `${id}.reflectionParity`,
    );
    exact(
      item.horizontalMirror,
      expected.horizontalMirror,
      `${id}.horizontalMirror`,
    );
    exact(
      item.physicalClockwiseRotationDegrees,
      expected.rotation,
      `${id}.rotation`,
    );
    exact(
      item.compensationDegrees,
      expected.compensation,
      `${id}.compensation`,
    );
    exact(
      item.transformedRgbaSha256,
      expected.transformedRgbaSha256,
      `${id}.transformedRgbaSha256`,
    );
    exact(item.directCost, expected.directCost, `${id}.directCost`);
    exact(item.swappedCost, expected.swappedCost, `${id}.swappedCost`);
    exact(item.relation, expected.relation, `${id}.relation`);

    const provider = object(item.provider, `${id}.provider`);
    exact(
      provider.eligibilityState,
      'exact_one_face_478_landmarks_observed',
      `${id}.provider.eligibilityState`,
    );
    exact(provider.faceCount, 1, `${id}.provider.faceCount`);
    exact(provider.landmarkCount, 478, `${id}.provider.landmarkCount`);
  }

  const assessment = object(root.assessment, 'assessment');
  exact(
    assessment.state,
    'gnm_cross_source_geometric_mapping_supported',
    'assessment.state',
  );
  arrayExact(
    assessment.evaluatedCaseIds,
    IDS,
    'assessment.evaluatedCaseIds',
  );
  arrayExact(
    assessment.unavailableCaseIds,
    [],
    'assessment.unavailableCaseIds',
  );
  arrayExact(
    assessment.failedCaseIds,
    [],
    'assessment.failedCaseIds',
  );
  exact(
    assessment.orientationPreservingDirectForEveryAvailableCase,
    true,
    'assessment.orientationPreservingDirectForEveryAvailableCase',
  );
  exact(
    assessment.orientationReversingSwappedForEveryAvailableCase,
    true,
    'assessment.orientationReversingSwappedForEveryAvailableCase',
  );
  exact(
    assessment.allEightCasesAvailable,
    true,
    'assessment.allEightCasesAvailable',
  );
  exact(
    assessment.numericAcceptanceThresholdApplied,
    false,
    'assessment.numericAcceptanceThresholdApplied',
  );
  exact(
    assessment.aggregateOverrideApplied,
    false,
    'assessment.aggregateOverrideApplied',
  );
  exact(
    assessment.providerPublishedSideNamesUsedAsAnatomicalAuthority,
    false,
    'assessment.providerPublishedSideNamesUsedAsAnatomicalAuthority',
  );
  exact(
    assessment.imageSpaceXSignUsedAsAnatomicalAuthority,
    false,
    'assessment.imageSpaceXSignUsedAsAnatomicalAuthority',
  );
  exact(
    assessment.gnmAxisOrderingUsedAsAnatomicalAuthority,
    false,
    'assessment.gnmAxisOrderingUsedAsAnatomicalAuthority',
  );

  const boundary =
    object(root.interpretationBoundary, 'interpretationBoundary');
  exact(
    boundary.sourceFamilyIndependentFromMakeHuman,
    true,
    'boundary.sourceFamilyIndependentFromMakeHuman',
  );
  exact(
    boundary.sourceFamilyIndependentFromMediaPipe,
    true,
    'boundary.sourceFamilyIndependentFromMediaPipe',
  );
  exact(
    boundary.providerPublishedSideNamesUsedAsAnatomicalAuthority,
    false,
    'boundary.providerPublishedSideNamesUsedAsAnatomicalAuthority',
  );
  exact(
    boundary.imageSpaceXSignUsedAsAnatomicalAuthority,
    false,
    'boundary.imageSpaceXSignUsedAsAnatomicalAuthority',
  );
  exact(
    boundary.gnmAxisOrderingUsedAsAnatomicalAuthority,
    false,
    'boundary.gnmAxisOrderingUsedAsAnatomicalAuthority',
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
  exact(
    boundary.traditionalMeaningMayBeInferred,
    false,
    'boundary.traditionalMeaningMayBeInferred',
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

  const execution = object(root.execution, 'execution');
  exact(
    execution.allEightCasesAttempted,
    true,
    'execution.allEightCasesAttempted',
  );
  exact(execution.providerExecuted, true, 'execution.providerExecuted');
  exact(
    execution.empiricalResultAdmitted,
    false,
    'execution.empiricalResultAdmitted',
  );
  exact(
    execution.resultDigestPinned,
    false,
    'execution.resultDigestPinned',
  );
  exact(
    execution.ruleRetunedAfterObservation,
    false,
    'execution.ruleRetunedAfterObservation',
  );

  const authority = object(root.authority, 'authority');
  exact(
    authority.gnmCrossSourceSemanticWitnessAudited,
    true,
    'authority.gnmCrossSourceSemanticWitnessAudited',
  );
  exact(
    authority.gnmCrossSourceFixtureDigestPinned,
    true,
    'authority.gnmCrossSourceFixtureDigestPinned',
  );
  for (const key of [
    'gnmCrossSourceGeometricValidationExecuted',
    'gnmCrossSourceGeometricMappingValidated',
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
      'fr104-gnm-cross-source-geometric-provider-evidence-v1' as const,
    authorityState:
      'gnm_cross_source_geometric_mapping_supported_admitted' as const,
    resultSha256:EXPECTED_RESULT_SHA256,
    state:'gnm_cross_source_geometric_mapping_supported' as const,
    gnmCrossSourceSemanticWitnessAudited:true as const,
    gnmCrossSourceFixtureDigestPinned:true as const,
    gnmCrossSourceGeometricValidationExecuted:true as const,
    gnmCrossSourceGeometricMappingValidated:true as const,
    providerLabelMappedToAnatomicalSide:false as const,
    globalProviderAnatomicalSemanticsEstablished:false as const,
    anatomicalReferenceAdmitted:false as const,
    anatomicalLateralityAuthorized:false as const,
    validatedExternalEarObservationAuthorized:false as const,
    traditionalBindingAuthorized:false as const,
    productionAuthorization:false as const,
  });
}
