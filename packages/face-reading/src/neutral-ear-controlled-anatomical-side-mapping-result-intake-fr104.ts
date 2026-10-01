import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_AUDIT_FR104,
} from './neutral-ear-controlled-anatomical-side-mapping-audit-fr104.js';

export type NeutralEarControlledAnatomicalMappingEvidenceFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-controlled-anatomical-side-mapping-evidence-v1';
    authorityState:
      'reflection_parity_conditional_mapping_supported_on_exact_fixture_admitted';
    resultSha256:
      '863b1909b2bb33437496c990fd97529d986b2fca1564addb6e1591d232b7f2cf';
    state:
      'reflection_parity_conditional_mapping_supported';
    evaluatedCaseIds:
      readonly ['R0','R90','R180','R270','M0','M90','M180','M270'];
    unavailableCaseIds: readonly [];
    failedCaseIds: readonly [];
    controlledAnatomicalMappingAudited: true;
    reflectionParityConditionalMappingSupportedOnExactFixture: true;
    controlledAnatomicalReferenceAdmittedForExactFixture: true;
    providerLabelMappedToAnatomicalSide: false;
    globalProviderAnatomicalSemanticsEstablished: false;
    anatomicalReferenceAdmitted: false;
    anatomicalLateralityAuthorized: false;
    validatedExternalEarObservationAuthorized: false;
    traditionalBindingAuthorized: false;
    productionAuthorization: false;
  }>;

const EXPECTED_RESULT_SHA256 =
  '863b1909b2bb33437496c990fd97529d986b2fca1564addb6e1591d232b7f2cf' as const;

const EXPECTED_CASES = Object.freeze({
  R0: Object.freeze({
    family:'non_mirrored',
    reflectionParity:'orientation_preserving',
    physicalClockwiseRotationDegrees:0,
    compensationDegrees:0,
    transformedRgbaSha256:
      'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364',
    directCost:0.02456967216060714,
    swappedCost:0.35972525227214214,
    relation:'direct_assignment_closer',
  }),
  R90: Object.freeze({
    family:'non_mirrored',
    reflectionParity:'orientation_preserving',
    physicalClockwiseRotationDegrees:90,
    compensationDegrees:270,
    transformedRgbaSha256:
      '5a8da29746625ed14da6580b84d8ebf0116939a7bfe7d7369ea46f19aeac84ed',
    directCost:0.0251961315461134,
    swappedCost:0.35952807254254904,
    relation:'direct_assignment_closer',
  }),
  R180: Object.freeze({
    family:'non_mirrored',
    reflectionParity:'orientation_preserving',
    physicalClockwiseRotationDegrees:180,
    compensationDegrees:180,
    transformedRgbaSha256:
      '8d725e503a41e01f8e7e48f1466ff54d88c2cd7d3ab9a1df66332625bc7586fc',
    directCost:0.028621665163675758,
    swappedCost:0.3584955007831722,
    relation:'direct_assignment_closer',
  }),
  R270: Object.freeze({
    family:'non_mirrored',
    reflectionParity:'orientation_preserving',
    physicalClockwiseRotationDegrees:270,
    compensationDegrees:90,
    transformedRgbaSha256:
      'b6d87e6c433f971d167a5c35b8751d351c0047abbf7a1e63f959ce83bc2bcead',
    directCost:0.025449295833505033,
    swappedCost:0.35839249708583565,
    relation:'direct_assignment_closer',
  }),
  M0: Object.freeze({
    family:'mirrored',
    reflectionParity:'orientation_reversing',
    physicalClockwiseRotationDegrees:0,
    compensationDegrees:0,
    transformedRgbaSha256:
      '5f3b92f9a50d5913d5ba97ff9c5edf9d14e10bdd8a6f8be526cccb32b5f0c0d8',
    directCost:0.35788482319576975,
    swappedCost:0.025677951082069113,
    relation:'swapped_assignment_closer',
  }),
  M90: Object.freeze({
    family:'mirrored',
    reflectionParity:'orientation_reversing',
    physicalClockwiseRotationDegrees:90,
    compensationDegrees:270,
    transformedRgbaSha256:
      'a0ac410ac805bee1a367df7cb41684376d30eab35c149ab73d81e7d00a9227c4',
    directCost:0.358415418424448,
    swappedCost:0.028792761353791618,
    relation:'swapped_assignment_closer',
  }),
  M180: Object.freeze({
    family:'mirrored',
    reflectionParity:'orientation_reversing',
    physicalClockwiseRotationDegrees:180,
    compensationDegrees:180,
    transformedRgbaSha256:
      '5e37e4df33d3457988e7780479fa8c8cf97b5d721b56e5a3298caf23d09e4c9f',
    directCost:0.35806848399131674,
    swappedCost:0.0266075804281148,
    relation:'swapped_assignment_closer',
  }),
  M270: Object.freeze({
    family:'mirrored',
    reflectionParity:'orientation_reversing',
    physicalClockwiseRotationDegrees:270,
    compensationDegrees:90,
    transformedRgbaSha256:
      '73fef262ba0e9aa7d56ce03297e66437596a0e4f6b7da32d4541569e42e5b51b',
    directCost:0.3601669572278045,
    swappedCost:0.02616992462873194,
    relation:'swapped_assignment_closer',
  }),
} as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 U4A controlled anatomical mapping admission ${message}`,
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
    fail(`${label} must equal the admitted U4A value.`);
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

export function admitNeutralEarControlledAnatomicalMappingResultFR104(
  input: unknown,
  resultSha256: string,
): NeutralEarControlledAnatomicalMappingEvidenceFR104V1 {
  exact(resultSha256, EXPECTED_RESULT_SHA256, 'resultSha256');

  const protocol =
    NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_AUDIT_FR104;
  const root = object(input, 'result');

  exact(
    root.schemaVersion,
    'fr104-controlled-anatomical-side-mapping-audit-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'retrospective_controlled_mapping_candidate_not_admitted',
    'authorityState',
  );
  exact(root.studyKind, protocol.studyKind, 'studyKind');

  const predecessors = object(root.predecessors, 'predecessors');
  exact(
    predecessors.u3_2CompensationResultSha256,
    protocol.predecessors.u3_2CompensationResultSha256,
    'predecessors.u3_2CompensationResultSha256',
  );
  exact(
    predecessors.u3_2LiveReplayVerified,
    true,
    'predecessors.u3_2LiveReplayVerified',
  );
  exact(
    predecessors.u3_3ProspectiveResultSha256,
    protocol.predecessors.u3_3ProspectiveResultSha256,
    'predecessors.u3_3ProspectiveResultSha256',
  );
  exact(
    predecessors.u3_3ProspectiveComposedNormalizationValidated,
    true,
    'predecessors.u3_3ProspectiveComposedNormalizationValidated',
  );
  exact(
    predecessors.providerCompensatedOutputFrameProspectivelyValidated,
    true,
    'predecessors.providerCompensatedOutputFrameProspectivelyValidated',
  );

  const reference = object(root.controlledReference, 'controlledReference');
  exact(
    reference.fixturePngSha256,
    protocol.controlledReference.fixturePngSha256,
    'controlledReference.fixturePngSha256',
  );
  exact(
    reference.canonicalRgbaSha256,
    protocol.controlledReference.canonicalRgbaSha256,
    'controlledReference.canonicalRgbaSha256',
  );
  exact(
    reference.independentAnatomicalGroundTruthSource,
    protocol.controlledReference.independentAnatomicalGroundTruthSource,
    'controlledReference.independentAnatomicalGroundTruthSource',
  );
  exact(
    reference.providerLandmarkDerived,
    false,
    'controlledReference.providerLandmarkDerived',
  );
  exact(
    reference.providerLabelDerived,
    false,
    'controlledReference.providerLabelDerived',
  );

  const normalization = object(root.normalization, 'normalization');
  for (const key of [
    'providerInferenceCompensation',
    'returnedProviderCoordinateNormalization',
    'anatomicalGroundTruthCoordinateNormalization',
    'mirrorFamilyPreservedDuringRotationNormalization',
    'parallelPoseNormalizationStackAuthorized',
  ] as const) {
    exact(
      normalization[key],
      protocol.normalization[key],
      `normalization.${key}`,
    );
  }

  if (!Array.isArray(root.cases) || root.cases.length !== 8) {
    fail('cases must contain exactly eight entries.');
  }

  const ids = [
    'R0','R90','R180','R270',
    'M0','M90','M180','M270',
  ] as const;
  for (const [index, id] of ids.entries()) {
    const item = object(root.cases[index], `cases[${index}]`);
    const expected = EXPECTED_CASES[id];

    exact(item.id, id, `${id}.id`);
    exact(item.family, expected.family, `${id}.family`);
    exact(
      item.reflectionParity,
      expected.reflectionParity,
      `${id}.reflectionParity`,
    );
    exact(
      item.physicalClockwiseRotationDegrees,
      expected.physicalClockwiseRotationDegrees,
      `${id}.physicalClockwiseRotationDegrees`,
    );
    exact(
      item.compensationDegrees,
      expected.compensationDegrees,
      `${id}.compensationDegrees`,
    );
    exact(
      item.transformedRgbaSha256,
      expected.transformedRgbaSha256,
      `${id}.transformedRgbaSha256`,
    );
    exact(item.available, true, `${id}.available`);
    exact(item.directCost, expected.directCost, `${id}.directCost`);
    exact(item.swappedCost, expected.swappedCost, `${id}.swappedCost`);
    exact(item.relation, expected.relation, `${id}.relation`);
  }

  const assessment = object(root.assessment, 'assessment');
  exact(
    assessment.state,
    'reflection_parity_conditional_mapping_supported',
    'assessment.state',
  );
  exactArray(
    assessment.evaluatedCaseIds,
    ids,
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
    assessment.providerPublishedSideNamesUsedAsAnatomicalAuthority,
    false,
    'assessment.providerPublishedSideNamesUsedAsAnatomicalAuthority',
  );
  exact(
    assessment.imageSpaceXSignUsedAsAnatomicalAuthority,
    false,
    'assessment.imageSpaceXSignUsedAsAnatomicalAuthority',
  );

  const boundary = object(
    root.interpretationBoundary,
    'interpretationBoundary',
  );
  exact(
    boundary.exactControlledFixtureRuntimeOnly,
    true,
    'interpretationBoundary.exactControlledFixtureRuntimeOnly',
  );
  for (const key of [
    'providerPublishedSideNamesUsedAsAnatomicalAuthority',
    'imageSpaceXSignUsedAsAnatomicalAuthority',
    'florencePromptSideUsedAsAnatomicalAuthority',
    'sourceSemanticConflictDeclaredResolved',
    'globalProviderAnatomicalSemanticsMayBeEstablished',
  ] as const) {
    exact(boundary[key], false, `interpretationBoundary.${key}`);
  }
  exact(
    boundary.prospectiveIndependentAnatomicalValidationStillRequired,
    true,
    'interpretationBoundary.prospectiveIndependentAnatomicalValidationStillRequired',
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

  const sourceAuthority = object(root.authority, 'authority');
  for (const key of [
    'controlledAnatomicalMappingAudited',
    'reflectionParityConditionalMappingSupportedOnExactFixture',
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
      'fr104-controlled-anatomical-side-mapping-evidence-v1' as const,
    authorityState:
      'reflection_parity_conditional_mapping_supported_on_exact_fixture_admitted' as const,
    resultSha256: EXPECTED_RESULT_SHA256,
    state:
      'reflection_parity_conditional_mapping_supported' as const,
    evaluatedCaseIds: Object.freeze(ids),
    unavailableCaseIds: Object.freeze([] as const),
    failedCaseIds: Object.freeze([] as const),
    controlledAnatomicalMappingAudited: true as const,
    reflectionParityConditionalMappingSupportedOnExactFixture:
      true as const,
    controlledAnatomicalReferenceAdmittedForExactFixture:
      true as const,
    providerLabelMappedToAnatomicalSide: false as const,
    globalProviderAnatomicalSemanticsEstablished:
      false as const,
    anatomicalReferenceAdmitted: false as const,
    anatomicalLateralityAuthorized: false as const,
    validatedExternalEarObservationAuthorized:
      false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });
}
