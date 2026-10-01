import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104,
} from './neutral-ear-prospective-composed-orientation-validation-fr104.js';

export type NeutralEarProspectiveComposedOrientationEvidenceFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-prospective-composed-orientation-normalization-evidence-v1';
    authorityState:
      'prospective_composed_normalization_supported_admitted';
    resultSha256:
      '793b1059308242d11c176300bd141b70a49c2fa681a49bc6e38e1abddf4aaab4';
    state:
      'prospective_composed_normalization_supported';
    evaluatedCaseIds:
      readonly ['R90','R180','R270','M90','M180','M270'];
    unavailableCaseIds: readonly [];
    failedCaseIds: readonly [];
    prospectiveComposedNormalizationValidated: true;
    providerCompensatedOutputFrameProspectivelyValidated: true;
    anatomicalMappingReviewOutcome: 'hold';
    providerLabelMappedToAnatomicalSide: false;
    anatomicalLateralityAuthorized: false;
    traditionalBindingAuthorized: false;
    productionAuthorization: false;
  }>;

const EXPECTED_RESULT_SHA256 =
  '793b1059308242d11c176300bd141b70a49c2fa681a49bc6e38e1abddf4aaab4' as const;

const EXPECTED_CASES = Object.freeze({
  R0: Object.freeze({
    transformedRgbaSha256:
      '0df3c62c654dd5432e753a8d273e73ad3fb7d5826848b395afaead620b89bdd0',
    identity: 0,
    composed: 0,
    opposite: 0,
  }),
  R90: Object.freeze({
    transformedRgbaSha256:
      'a40a7a9d4ffb3c937a44faaefcd3afa4a827407706ad76be8f157c2e8fac29d0',
    identity: 0.8609687785387168,
    composed: 0.004019598639518765,
    opposite: 1.2180429934630648,
  }),
  R180: Object.freeze({
    transformedRgbaSha256:
      'cd494f0af40b1985ef7a009b51067fa817920815636ff8d77fbd11525103b553',
    identity: 1.2172198425550267,
    composed: 0.00526201305598233,
    opposite: 0.00526201305598233,
  }),
  R270: Object.freeze({
    transformedRgbaSha256:
      '67fb32aa276af5ae29597cdbb207ea38ae8a93741c54d6f7ae8798bf08c72c3b',
    identity: 0.8617153750658679,
    composed: 0.0034770712559623242,
    opposite: 1.221379652899968,
  }),
  M0: Object.freeze({
    transformedRgbaSha256:
      'e9e35ef4c252d90169cb45dfe5cdabc548afdcc88f12e45ca87c1be61606584d',
    identity: 0,
    composed: 0,
    opposite: 0,
  }),
  M90: Object.freeze({
    transformedRgbaSha256:
      'b64cfedb90ae7596e8d9dde27053e815cc4244708a928d0208d1c3240141b4d8',
    identity: 0.8608039321032435,
    composed: 0.004295411288492099,
    opposite: 1.2158090456181592,
  }),
  M180: Object.freeze({
    transformedRgbaSha256:
      '21b15542ab93e1ab8d999c8f2d5da9e6008e6c877039661e06bb2dce5c18c574',
    identity: 1.2168021910668552,
    composed: 0.005500609024443177,
    opposite: 0.005500609024443177,
  }),
  M270: Object.freeze({
    transformedRgbaSha256:
      'eb36b7499e27ee0c5c728da131de8b6afae76f29031ca196127dd2f2a4971c36',
    identity: 0.8608660213756174,
    composed: 0.004108235954123095,
    opposite: 1.2207388445996106,
  }),
} as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 U3.3 prospective composed normalization ${message}`,
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
    fail(`${label} must equal the admitted prospective value.`);
  }
}

function exactArray(
  actual: unknown,
  expected: readonly string[],
  label: string,
): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail(`${label} mismatch.`);
  }
}

export function admitNeutralEarProspectiveComposedOrientationResultFR104(
  input: unknown,
  resultSha256: string,
): NeutralEarProspectiveComposedOrientationEvidenceFR104V1 {
  exact(resultSha256, EXPECTED_RESULT_SHA256, 'resultSha256');

  const protocol =
    NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104;
  const root = object(input, 'result');

  exact(
    root.schemaVersion,
    'fr104-prospective-composed-orientation-normalization-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'prospective_candidate_result_not_admitted',
    'authorityState',
  );
  exact(root.studyKind, protocol.studyKind, 'studyKind');

  const predecessor = object(root.predecessor, 'predecessor');
  exact(
    predecessor.derivedResultSha256,
    protocol.predecessor.derivedResultSha256,
    'predecessor.derivedResultSha256',
  );
  exact(
    predecessor.selectedHypothesis,
    protocol.predecessor.selectedHypothesis,
    'predecessor.selectedHypothesis',
  );

  const fixture = object(root.fixture, 'fixture');
  exact(fixture.fixtureRef, protocol.fixture.fixtureRef, 'fixture.fixtureRef');
  exact(
    fixture.sourceRepository,
    protocol.fixture.sourceRepository,
    'fixture.sourceRepository',
  );
  exact(
    fixture.sourceCommit,
    protocol.fixture.sourceCommit,
    'fixture.sourceCommit',
  );
  exact(
    fixture.expectedSha256,
    protocol.fixture.sha256,
    'fixture.expectedSha256',
  );
  exact(
    fixture.observedSha256,
    protocol.fixture.sha256,
    'fixture.observedSha256',
  );
  exact(fixture.digestVerified, true, 'fixture.digestVerified');
  exact(fixture.width, protocol.fixture.expectedWidth, 'fixture.width');
  exact(fixture.height, protocol.fixture.expectedHeight, 'fixture.height');
  exact(fixture.sourceImagePersisted, false, 'fixture.sourceImagePersisted');
  exact(
    fixture.transformedRasterPersisted,
    false,
    'fixture.transformedRasterPersisted',
  );

  const runtime = object(root.runtime, 'runtime');
  exact(runtime.packageName, protocol.runtime.packageName, 'runtime.packageName');
  exact(
    runtime.packageVersion,
    protocol.runtime.packageVersion,
    'runtime.packageVersion',
  );
  exact(runtime.runningMode, protocol.runtime.runningMode, 'runtime.runningMode');
  exact(runtime.numFaces, protocol.runtime.numFaces, 'runtime.numFaces');
  exact(
    runtime.imageProcessingOptionsRotationDegreesUsed,
    true,
    'runtime.imageProcessingOptionsRotationDegreesUsed',
  );

  const frozenRule = object(root.frozenComposedRule, 'frozenComposedRule');
  for (const key of [
    'providerInferenceCompensation',
    'providerOutputCoordinateFrame',
    'outputCoordinateNormalization',
    'ruleMayBeRetunedAfterProspectiveObservation',
    'parallelPoseNormalizationStackAuthorized',
  ] as const) {
    exact(
      frozenRule[key],
      protocol.frozenComposedRule[key],
      `frozenComposedRule.${key}`,
    );
  }

  const zero = object(root.zeroDegreeControls, 'zeroDegreeControls');
  for (const id of ['R0','M0'] as const) {
    const control = object(zero[id], `zeroDegreeControls.${id}`);
    exact(control.available, true, `zeroDegreeControls.${id}.available`);
    exact(
      control.composedUnorderedPairCost,
      0,
      `zeroDegreeControls.${id}.composedUnorderedPairCost`,
    );
  }

  if (!Array.isArray(root.cases) || root.cases.length !== 8) {
    fail('cases must contain exactly eight entries.');
  }

  for (const [index, expectedProtocolCase] of protocol.cases.entries()) {
    const item = object(root.cases[index], `cases[${index}]`);
    const id = expectedProtocolCase.id;
    const expected = EXPECTED_CASES[id];

    exact(item.id, id, `${id}.id`);
    exact(item.family, expectedProtocolCase.family, `${id}.family`);
    exact(
      item.horizontalMirror,
      expectedProtocolCase.horizontalMirror,
      `${id}.horizontalMirror`,
    );
    exact(
      item.physicalClockwiseRotationDegrees,
      expectedProtocolCase.physicalClockwiseRotationDegrees,
      `${id}.physicalClockwiseRotationDegrees`,
    );
    exact(
      item.compensationDegrees,
      expectedProtocolCase.compensationDegrees,
      `${id}.compensationDegrees`,
    );
    exact(
      item.transformedRgbaSha256,
      expected.transformedRgbaSha256,
      `${id}.transformedRgbaSha256`,
    );

    const provider = object(item.provider, `${id}.provider`);
    exact(
      provider.eligibilityState,
      'exact_one_face_478_landmarks_observed',
      `${id}.provider.eligibilityState`,
    );
    exact(provider.faceCount, 1, `${id}.provider.faceCount`);
    exact(provider.landmarkCount, 478, `${id}.provider.landmarkCount`);

    const comparisons = object(item.comparisons, `${id}.comparisons`);
    for (const [kind, expectedCost] of [
      ['identity', expected.identity],
      ['composed', expected.composed],
      ['opposite', expected.opposite],
    ] as const) {
      const comparison = object(
        comparisons[kind],
        `${id}.comparisons.${kind}`,
      );
      exact(
        comparison.unorderedPairCost,
        expectedCost,
        `${id}.comparisons.${kind}.unorderedPairCost`,
      );
      exact(
        comparison.providerLabelRelationUsedForDecision,
        false,
        `${id}.comparisons.${kind}.providerLabelRelationUsedForDecision`,
      );
    }
  }

  const assessment = object(root.assessment, 'assessment');
  exact(
    assessment.state,
    'prospective_composed_normalization_supported',
    'assessment.state',
  );
  exactArray(
    assessment.evaluatedCaseIds,
    ['R90','R180','R270','M90','M180','M270'],
    'assessment.evaluatedCaseIds',
  );
  exactArray(
    assessment.unavailableCaseIds,
    [],
    'assessment.unavailableCaseIds',
  );
  exactArray(
    assessment.failedCaseIds,
    [],
    'assessment.failedCaseIds',
  );
  exact(
    assessment.quarterTurnStrictDominanceSatisfiedForEveryAvailableCase,
    true,
    'assessment.quarterTurnStrictDominanceSatisfiedForEveryAvailableCase',
  );
  exact(
    assessment.halfTurnIdentityRejectedForEveryAvailableCase,
    true,
    'assessment.halfTurnIdentityRejectedForEveryAvailableCase',
  );
  exact(
    assessment.allSixRotatedCasesAvailable,
    true,
    'assessment.allSixRotatedCasesAvailable',
  );
  exact(
    assessment.numericAcceptanceThresholdApplied,
    false,
    'assessment.numericAcceptanceThresholdApplied',
  );
  exact(
    assessment.providerLabelsUsedForDecision,
    false,
    'assessment.providerLabelsUsedForDecision',
  );
  exact(
    assessment.anatomicalInterpretationUsed,
    false,
    'assessment.anatomicalInterpretationUsed',
  );

  const boundary = object(
    root.interpretationBoundary,
    'interpretationBoundary',
  );
  for (const key of [
    'providerLabelsUsedForDecision',
    'anatomicalGroundTruthUsed',
    'anatomicalSideSemanticsUsed',
    'priorMirrorResultUsedToRetuneRule',
    'hypothesisFailureIsHarnessFailure',
  ] as const) {
    exact(boundary[key], false, `interpretationBoundary.${key}`);
  }

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
  exact(execution.empiricalResultAdmitted, false, 'execution.empiricalResultAdmitted');
  exact(execution.resultDigestPinned, false, 'execution.resultDigestPinned');
  exact(
    execution.ruleRetunedAfterObservation,
    false,
    'execution.ruleRetunedAfterObservation',
  );

  const sourceAuthority = object(root.authority, 'authority');
  for (const key of [
    'prospectiveComposedNormalizationValidated',
    'providerCompensatedOutputFrameProspectivelyValidated',
    'providerLabelMappedToAnatomicalSide',
    'globalProviderAnatomicalSemanticsEstablished',
    'anatomicalReferenceAdmitted',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ] as const) {
    exact(sourceAuthority[key], false, `authority.${key}`);
  }

  return Object.freeze({
    schemaVersion:
      'fr104-prospective-composed-orientation-normalization-evidence-v1' as const,
    authorityState:
      'prospective_composed_normalization_supported_admitted' as const,
    resultSha256: EXPECTED_RESULT_SHA256,
    state:
      'prospective_composed_normalization_supported' as const,
    evaluatedCaseIds: Object.freeze([
      'R90','R180','R270','M90','M180','M270',
    ] as const),
    unavailableCaseIds: Object.freeze([] as const),
    failedCaseIds: Object.freeze([] as const),
    prospectiveComposedNormalizationValidated: true as const,
    providerCompensatedOutputFrameProspectivelyValidated:
      true as const,
    anatomicalMappingReviewOutcome: 'hold' as const,
    providerLabelMappedToAnatomicalSide: false as const,
    anatomicalLateralityAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });
}
