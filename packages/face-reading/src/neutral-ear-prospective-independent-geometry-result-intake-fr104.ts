import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_FR104,
} from './neutral-ear-prospective-independent-geometry-validation-fr104.js';
import {
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104,
} from './neutral-ear-prospective-independent-geometry-fixture-evidence-fr104.js';

export type NeutralEarProspectiveIndependentGeometryEvidenceFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-prospective-independent-geometry-provider-evidence-v1';
    authorityState:
      'prospective_independent_geometry_mapping_supported_admitted';
    resultSha256:
      'e601205ccdad7ec66900d953ed6f742e04dbd37e6074ccc4bb36bf21dd3b16a8';
    state:
      'prospective_independent_geometry_mapping_supported';
    prospectiveIndependentGeometryValidationExecuted: true;
    prospectiveIndependentGeometryMappingValidated: true;
    providerLabelMappedToAnatomicalSide: false;
    globalProviderAnatomicalSemanticsEstablished: false;
    anatomicalReferenceAdmitted: false;
    anatomicalLateralityAuthorized: false;
    validatedExternalEarObservationAuthorized: false;
    traditionalBindingAuthorized: false;
    productionAuthorization: false;
  }>;

const EXPECTED_RESULT_SHA256 =
  'e601205ccdad7ec66900d953ed6f742e04dbd37e6074ccc4bb36bf21dd3b16a8' as const;

const CASES = Object.freeze({
  R0:Object.freeze({
    family:'non_mirrored', reflectionParity:'orientation_preserving',
    rotation:0, compensation:0,
    transformedRgbaSha256:'ce342bbcb32400dff14ee4d6c3ea88df9b944f42d9699d789007e3a79c086e3b',
    directCost:0.027928257825205603, swappedCost:0.4250445225028384,
    relation:'direct_assignment_closer',
  }),
  R90:Object.freeze({
    family:'non_mirrored', reflectionParity:'orientation_preserving',
    rotation:90, compensation:270,
    transformedRgbaSha256:'f00620e47be708aa407345708617929d3fc279fd20f6a7f42798bbd8ca367e57',
    directCost:0.029718198041168414, swappedCost:0.4243093468638832,
    relation:'direct_assignment_closer',
  }),
  R180:Object.freeze({
    family:'non_mirrored', reflectionParity:'orientation_preserving',
    rotation:180, compensation:180,
    transformedRgbaSha256:'42a2af28737f9e0bd46a68acc9406b794a8e9c5f2ec3114e4a172e8ebe2ba354',
    directCost:0.02890459634878363, swappedCost:0.4285892132847949,
    relation:'direct_assignment_closer',
  }),
  R270:Object.freeze({
    family:'non_mirrored', reflectionParity:'orientation_preserving',
    rotation:270, compensation:90,
    transformedRgbaSha256:'3fd03835d63960f206736d39352cda8d477f1c83d4d0d5a03f60249f307e19a3',
    directCost:0.027013495539828767, swappedCost:0.427821617867851,
    relation:'direct_assignment_closer',
  }),
  M0:Object.freeze({
    family:'mirrored', reflectionParity:'orientation_reversing',
    rotation:0, compensation:0,
    transformedRgbaSha256:'e1145dbfc731fbffd537364578e682b0d9399cd3cab295b57281dc160c800c8c',
    directCost:0.42772041164106067, swappedCost:0.02697392168748674,
    relation:'swapped_assignment_closer',
  }),
  M90:Object.freeze({
    family:'mirrored', reflectionParity:'orientation_reversing',
    rotation:90, compensation:270,
    transformedRgbaSha256:'bac6477f5f69b6b9411cdd803bdecd263e6a69fd550f8933e1bede880365a630',
    directCost:0.4285124926745898, swappedCost:0.028820229662936306,
    relation:'swapped_assignment_closer',
  }),
  M180:Object.freeze({
    family:'mirrored', reflectionParity:'orientation_reversing',
    rotation:180, compensation:180,
    transformedRgbaSha256:'4eb5a34ff3b791c703d41636c9dd8c1997c798760fc0af6a44307b70a6afa457',
    directCost:0.4265415151981318, swappedCost:0.029106096735218745,
    relation:'swapped_assignment_closer',
  }),
  M270:Object.freeze({
    family:'mirrored', reflectionParity:'orientation_reversing',
    rotation:270, compensation:90,
    transformedRgbaSha256:'7d9ec7319a21e9416a3d1b376a08dbe3e09f85e36abf5ea5bf852dc8a847fd3c',
    directCost:0.4253760585961517, swappedCost:0.029034204988878376,
    relation:'swapped_assignment_closer',
  }),
} as const);

const IDS = Object.freeze([
  'R0','R90','R180','R270','M0','M90','M180','M270',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 U4B-C admission ${message}`,
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

export function admitNeutralEarProspectiveIndependentGeometryResultFR104(
  input: unknown,
  resultSha256: string,
): NeutralEarProspectiveIndependentGeometryEvidenceFR104V1 {
  exact(resultSha256, EXPECTED_RESULT_SHA256, 'resultSha256');

  const protocol =
    NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_FR104;
  const fixtureEvidence =
    NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104;
  const root = object(input, 'result');

  exact(
    root.schemaVersion,
    'fr104-prospective-independent-geometry-provider-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'prospective_candidate_result_not_admitted',
    'authorityState',
  );
  exact(root.studyKind, protocol.studyKind, 'studyKind');

  const fixture = object(root.fixture, 'fixture');
  exact(
    fixture.fixtureRef,
    protocol.prospectiveFixture.fixtureRef,
    'fixture.fixtureRef',
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
  exact(runtime.packageName, '@mediapipe/tasks-vision', 'runtime.packageName');
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
    'prospective_independent_geometry_mapping_supported',
    'assessment.state',
  );
  arrayExact(assessment.evaluatedCaseIds, IDS, 'assessment.evaluatedCaseIds');
  arrayExact(assessment.unavailableCaseIds, [], 'assessment.unavailableCaseIds');
  arrayExact(assessment.failedCaseIds, [], 'assessment.failedCaseIds');
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
  exact(assessment.allEightCasesAvailable, true, 'assessment.allEightCasesAvailable');
  exact(
    assessment.numericAcceptanceThresholdApplied,
    false,
    'assessment.numericAcceptanceThresholdApplied',
  );

  const boundary = object(root.interpretationBoundary, 'interpretationBoundary');
  exact(
    boundary.prospectiveGeometryFixtureIndependentFromU4a,
    true,
    'boundary.prospectiveGeometryFixtureIndependentFromU4a',
  );
  exact(
    boundary.sourceFamilyIndependentFromU4a,
    false,
    'boundary.sourceFamilyIndependentFromU4a',
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
    boundary.crossSourceFamilyValidationStillRequired,
    true,
    'boundary.crossSourceFamilyValidationStillRequired',
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
  exact(execution.allEightCasesAttempted, true, 'execution.allEightCasesAttempted');
  exact(execution.providerExecuted, true, 'execution.providerExecuted');
  exact(execution.empiricalResultAdmitted, false, 'execution.empiricalResultAdmitted');
  exact(execution.resultDigestPinned, false, 'execution.resultDigestPinned');
  exact(execution.ruleRetunedAfterObservation, false, 'execution.ruleRetunedAfterObservation');

  const authority = object(root.authority, 'authority');
  exact(authority.u4bFixtureDigestPinned, true, 'authority.u4bFixtureDigestPinned');
  for (const key of [
    'prospectiveIndependentGeometryValidationExecuted',
    'prospectiveIndependentGeometryMappingValidated',
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
      'fr104-prospective-independent-geometry-provider-evidence-v1' as const,
    authorityState:
      'prospective_independent_geometry_mapping_supported_admitted' as const,
    resultSha256:EXPECTED_RESULT_SHA256,
    state:
      'prospective_independent_geometry_mapping_supported' as const,
    prospectiveIndependentGeometryValidationExecuted:true as const,
    prospectiveIndependentGeometryMappingValidated:true as const,
    providerLabelMappedToAnatomicalSide:false as const,
    globalProviderAnatomicalSemanticsEstablished:false as const,
    anatomicalReferenceAdmitted:false as const,
    anatomicalLateralityAuthorized:false as const,
    validatedExternalEarObservationAuthorized:false as const,
    traditionalBindingAuthorized:false as const,
    productionAuthorization:false as const,
  });
}
