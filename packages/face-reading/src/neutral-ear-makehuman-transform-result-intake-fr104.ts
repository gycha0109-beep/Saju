import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-makehuman-provider-preflight-empirical-evidence-fr104.js';
import {
  expectedNeutralEarMakeHumanRelationFR104,
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104,
  transformNeutralEarMakeHumanPointFR104,
} from './neutral-ear-makehuman-transform-diagnostics-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarMakeHumanTransformEvidenceFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-makehuman-transform-diagnostic-evidence-v1';
    authorityState:
      'exact_transform_diagnostic_evidence_admitted_incomplete_provider_coverage_no_anatomical_mapping';
    canonicalFixture: Readonly<{
      pngSha256:
        'f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb';
      canonicalRgbaSha256: string;
      width: 1024;
      height: 1024;
    }>;
    cases: readonly Readonly<{
      id: string;
      transformedRgbaSha256: string;
      providerEligibilityState: string;
      relation: string | null;
      matchesExpectedRelationHypothesis: boolean | null;
    }>[];
    diagnosticSummary: Readonly<{
      state: 'incomplete_provider_coverage';
      unavailableCaseIds: readonly string[];
      unresolvedCaseIds: readonly string[];
      hypothesisMismatchCaseIds: readonly string[];
    }>;
    authority: Readonly<{
      exactMakeHumanFixtureTransformDiagnosticsExecuted: true;
      parityConditionedAssignmentPatternEstablished: false;
      providerLabelMappedToAnatomicalSide: false;
      globalProviderAnatomicalSemanticsEstablished: false;
      anatomicalReferenceAdmitted: false;
      anatomicalLateralityAuthorized: false;
      validatedExternalEarObservationAuthorized: false;
      traditionalBindingAuthorized: false;
      productionAuthorization: false;
    }>;
  }>;

const SHA256_PATTERN = /^[0-9a-f]{64}$/u;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 MakeHuman transform diagnostics ${message}`,
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
    fail(`${label} must equal the governed value.`);
  }
}

function point(
  value: unknown,
  label: string,
): Readonly<{ x: number; y: number }> {
  const item = object(value, label);
  if (
    typeof item.x !== 'number'
    || !Number.isFinite(item.x)
    || item.x < 0
    || item.x > 1
    || typeof item.y !== 'number'
    || !Number.isFinite(item.y)
    || item.y < 0
    || item.y > 1
  ) {
    fail(`${label} must be finite within [0,1].`);
  }
  return Object.freeze({
    x: item.x,
    y: item.y,
  });
}

function distance(
  left: Readonly<{ x: number; y: number }>,
  right: Readonly<{ x: number; y: number }>,
): number {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

function recomputeSummary(
  cases: readonly Readonly<{
    id: string;
    providerEligibilityState: string;
    relation: string | null;
    matchesExpectedRelationHypothesis: boolean | null;
  }>[],
): Readonly<{
  state:
    | 'transform_consistent_with_parity_conditioned_hypothesis'
    | 'transform_inconsistent'
    | 'incomplete_provider_coverage'
    | 'equal_or_unresolved';
  unavailableCaseIds: readonly string[];
  unresolvedCaseIds: readonly string[];
  hypothesisMismatchCaseIds: readonly string[];
}> {
  const unavailableCaseIds = cases
    .filter(
      (item) =>
        item.providerEligibilityState
          !== 'exact_one_face_478_landmarks_observed',
    )
    .map((item) => item.id);
  const unresolvedCaseIds = cases
    .filter(
      (item) =>
        item.relation === 'equal_or_unresolved',
    )
    .map((item) => item.id);
  const hypothesisMismatchCaseIds = cases
    .filter(
      (item) =>
        item.matchesExpectedRelationHypothesis === false,
    )
    .map((item) => item.id);

  let state:
    | 'transform_consistent_with_parity_conditioned_hypothesis'
    | 'transform_inconsistent'
    | 'incomplete_provider_coverage'
    | 'equal_or_unresolved' =
      'transform_consistent_with_parity_conditioned_hypothesis';
  if (unavailableCaseIds.length > 0) {
    state = 'incomplete_provider_coverage';
  } else if (unresolvedCaseIds.length > 0) {
    state = 'equal_or_unresolved';
  } else if (hypothesisMismatchCaseIds.length > 0) {
    state = 'transform_inconsistent';
  }

  return Object.freeze({
    state,
    unavailableCaseIds: Object.freeze(unavailableCaseIds),
    unresolvedCaseIds: Object.freeze(unresolvedCaseIds),
    hypothesisMismatchCaseIds:
      Object.freeze(hypothesisMismatchCaseIds),
  });
}

export function admitNeutralEarMakeHumanTransformDiagnosticResultFR104(
  input: unknown,
): NeutralEarMakeHumanTransformEvidenceFR104V1 {
  const root = object(input, 'result');
  const protocol =
    NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104;
  const u2 =
    NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104;

  exact(
    root.schemaVersion,
    'fr104-makehuman-transform-diagnostic-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'bounded_transform_scalar_evidence_candidate_no_anatomical_mapping',
    'authorityState',
  );

  const fixture = object(
    root.canonicalFixture,
    'canonicalFixture',
  );
  exact(
    fixture.pngSha256,
    protocol.canonicalFixture.pngSha256,
    'canonicalFixture.pngSha256',
  );
  if (
    typeof fixture.canonicalRgbaSha256 !== 'string'
    || !SHA256_PATTERN.test(fixture.canonicalRgbaSha256)
  ) {
    fail('canonicalFixture.canonicalRgbaSha256 must be SHA-256.');
  }
  exact(
    fixture.width,
    protocol.canonicalFixture.width,
    'canonicalFixture.width',
  );
  exact(
    fixture.height,
    protocol.canonicalFixture.height,
    'canonicalFixture.height',
  );
  exact(
    fixture.repositoryPersistence,
    false,
    'canonicalFixture.repositoryPersistence',
  );

  const runtime = object(root.runtime, 'runtime');
  for (const key of [
    'packageName',
    'packageVersion',
    'wasmRoot',
    'modelAssetRef',
    'runningMode',
    'numFaces',
  ] as const) {
    exact(
      runtime[key],
      protocol.runtime[key],
      `runtime.${key}`,
    );
  }

  const transform = object(
    root.transformContract,
    'transformContract',
  );
  exact(
    transform.order,
    protocol.transformOrder,
    'transformContract.order',
  );
  for (const key of [
    'interpolationApplied',
    'resizeApplied',
    'cropApplied',
    'exifTransformApplied',
    'cssTransformApplied',
  ] as const) {
    exact(
      transform[key],
      false,
      `transformContract.${key}`,
    );
  }
  exact(
    transform.taskImageProcessingRotationDegrees,
    0,
    'transformContract.taskImageProcessingRotationDegrees',
  );

  const baseline = object(
    root.baselineControl,
    'baselineControl',
  );
  exact(baseline.caseId, 'R0', 'baselineControl.caseId');
  exact(
    baseline.exactU2ScalarReproduced,
    true,
    'baselineControl.exactU2ScalarReproduced',
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
    execution.allEightCasesExecuted,
    true,
    'execution.allEightCasesExecuted',
  );
  exact(
    execution.empiricalResultAdmitted,
    false,
    'execution.empiricalResultAdmitted',
  );

  const sourceAuthority = object(root.authority, 'authority');
  for (const key of [
    'exactMakeHumanFixtureTransformDiagnosticsExecuted',
    'parityConditionedAssignmentPatternObserved',
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

  if (!Array.isArray(root.cases) || root.cases.length !== 8) {
    fail('cases must contain exactly eight entries.');
  }

  const admittedCases = [];
  for (let index = 0; index < protocol.cases.length; index += 1) {
    const expected = protocol.cases[index];
    const item = object(root.cases[index], `cases[${index}]`);

    exact(item.id, expected.id, `${expected.id}.id`);
    exact(
      item.horizontalMirror,
      expected.horizontalMirror,
      `${expected.id}.horizontalMirror`,
    );
    exact(
      item.clockwiseRotationDegrees,
      expected.clockwiseRotationDegrees,
      `${expected.id}.clockwiseRotationDegrees`,
    );
    exact(
      item.transformOrder,
      expected.transformOrder,
      `${expected.id}.transformOrder`,
    );
    exact(
      item.reflectionParity,
      expected.reflectionParity,
      `${expected.id}.reflectionParity`,
    );
    exact(
      item.expectedRelationHypothesis,
      expectedNeutralEarMakeHumanRelationFR104(
        expected.reflectionParity,
      ),
      `${expected.id}.expectedRelationHypothesis`,
    );

    if (
      typeof item.transformedRgbaSha256 !== 'string'
      || !SHA256_PATTERN.test(item.transformedRgbaSha256)
    ) {
      fail(`${expected.id}.transformedRgbaSha256 must be SHA-256.`);
    }

    const groundTruth = object(
      item.transformedAnatomicalGroundTruth,
      `${expected.id}.transformedAnatomicalGroundTruth`,
    );
    const left = point(
      groundTruth.anatomicalLeftEye,
      `${expected.id}.anatomicalLeftEye`,
    );
    const right = point(
      groundTruth.anatomicalRightEye,
      `${expected.id}.anatomicalRightEye`,
    );
    const expectedLeft =
      transformNeutralEarMakeHumanPointFR104(
        protocol.independentAnatomicalGroundTruth.anatomicalLeftEye,
        expected,
      );
    const expectedRight =
      transformNeutralEarMakeHumanPointFR104(
        protocol.independentAnatomicalGroundTruth.anatomicalRightEye,
        expected,
      );
    exact(left.x, expectedLeft.x, `${expected.id}.left.x`);
    exact(left.y, expectedLeft.y, `${expected.id}.left.y`);
    exact(right.x, expectedRight.x, `${expected.id}.right.x`);
    exact(right.y, expectedRight.y, `${expected.id}.right.y`);
    exact(
      groundTruth.anatomicalIdentityPreserved,
      true,
      `${expected.id}.anatomicalIdentityPreserved`,
    );

    const eligibility = object(
      item.providerEligibility,
      `${expected.id}.providerEligibility`,
    );
    const state = String(eligibility.state ?? '');
    let relationValue: string | null = null;
    let matchValue: boolean | null = null;

    if (state === 'provider_cannot_detect_face') {
      if (
        eligibility.faceCount === 1
        || eligibility.landmarkCount !== null
        || eligibility.exactlyOneFaceVerified !== false
      ) {
        fail(`${expected.id} no-face state is inconsistent.`);
      }
      exact(
        item.providerEyeCentroids,
        null,
        `${expected.id}.providerEyeCentroids`,
      );
      exact(
        item.comparison,
        null,
        `${expected.id}.comparison`,
      );
      exact(
        item.matchesExpectedRelationHypothesis,
        null,
        `${expected.id}.matchesExpectedRelationHypothesis`,
      );
    } else {
      exact(
        state,
        'exact_one_face_478_landmarks_observed',
        `${expected.id}.providerEligibility.state`,
      );
      exact(
        eligibility.faceCount,
        1,
        `${expected.id}.faceCount`,
      );
      exact(
        eligibility.landmarkCount,
        478,
        `${expected.id}.landmarkCount`,
      );
      exact(
        eligibility.exactlyOneFaceVerified,
        true,
        `${expected.id}.exactlyOneFaceVerified`,
      );

      const provider = object(
        item.providerEyeCentroids,
        `${expected.id}.providerEyeCentroids`,
      );
      const providerLeft = point(
        provider.providerLeft,
        `${expected.id}.providerLeft`,
      );
      const providerRight = point(
        provider.providerRight,
        `${expected.id}.providerRight`,
      );
      exact(
        provider.topologyLabelAuthority,
        'provider_label_only_no_anatomical_meaning',
        `${expected.id}.topologyLabelAuthority`,
      );

      const comparison = object(
        item.comparison,
        `${expected.id}.comparison`,
      );
      const directCost =
        distance(providerLeft, left)
        + distance(providerRight, right);
      const swappedCost =
        distance(providerLeft, right)
        + distance(providerRight, left);
      const recomputedRelation =
        directCost < swappedCost
          ? 'direct_assignment_closer'
          : swappedCost < directCost
            ? 'swapped_assignment_closer'
            : 'equal_or_unresolved';

      exact(
        comparison.directCost,
        directCost,
        `${expected.id}.directCost`,
      );
      exact(
        comparison.swappedCost,
        swappedCost,
        `${expected.id}.swappedCost`,
      );
      exact(
        comparison.relation,
        recomputedRelation,
        `${expected.id}.relation`,
      );
      exact(
        comparison.numericAcceptanceThresholdApplied,
        false,
        `${expected.id}.numericAcceptanceThresholdApplied`,
      );
      const matches =
        recomputedRelation === expected.expectedRelationHypothesis;
      exact(
        item.matchesExpectedRelationHypothesis,
        matches,
        `${expected.id}.matchesExpectedRelationHypothesis`,
      );
      relationValue = recomputedRelation;
      matchValue = matches;

      if (expected.id === 'R0') {
        exact(
          providerLeft.x,
          u2.providerEyeCentroids.providerLeft.x,
          'R0.providerLeft.x',
        );
        exact(
          providerLeft.y,
          u2.providerEyeCentroids.providerLeft.y,
          'R0.providerLeft.y',
        );
        exact(
          providerRight.x,
          u2.providerEyeCentroids.providerRight.x,
          'R0.providerRight.x',
        );
        exact(
          providerRight.y,
          u2.providerEyeCentroids.providerRight.y,
          'R0.providerRight.y',
        );
        exact(
          directCost,
          u2.comparison.directCost,
          'R0.directCost',
        );
        exact(
          swappedCost,
          u2.comparison.swappedCost,
          'R0.swappedCost',
        );
      }
    }

    admittedCases.push(Object.freeze({
      id: expected.id,
      transformedRgbaSha256: item.transformedRgbaSha256,
      providerEligibilityState: state,
      relation: relationValue,
      matchesExpectedRelationHypothesis: matchValue,
    }));
  }

  exact(
    admittedCases[0]?.transformedRgbaSha256,
    fixture.canonicalRgbaSha256,
    'R0 transformed RGBA SHA',
  );

  const recomputedSummary =
    recomputeSummary(admittedCases);
  const summary = object(
    root.diagnosticSummary,
    'diagnosticSummary',
  );
  exact(
    summary.state,
    recomputedSummary.state,
    'diagnosticSummary.state',
  );
  for (const key of [
    'unavailableCaseIds',
    'unresolvedCaseIds',
    'hypothesisMismatchCaseIds',
  ] as const) {
    if (
      JSON.stringify(summary[key])
      !== JSON.stringify(recomputedSummary[key])
    ) {
      fail(`diagnosticSummary.${key} must exactly recompute.`);
    }
  }
  exact(
    summary.scientificOutcomeMayFailHypothesisWithoutHarnessFailure,
    true,
    'diagnosticSummary.scientificOutcomeMayFailHypothesisWithoutHarnessFailure',
  );
  exact(
    recomputedSummary.state,
    'incomplete_provider_coverage',
    'diagnosticSummary.state admission',
  );

  return Object.freeze({
    schemaVersion:
      'fr104-makehuman-transform-diagnostic-evidence-v1' as const,
    authorityState:
      'exact_transform_diagnostic_evidence_admitted_incomplete_provider_coverage_no_anatomical_mapping' as const,
    canonicalFixture: Object.freeze({
      pngSha256: protocol.canonicalFixture.pngSha256,
      canonicalRgbaSha256:
        fixture.canonicalRgbaSha256 as string,
      width: protocol.canonicalFixture.width,
      height: protocol.canonicalFixture.height,
    }),
    cases: Object.freeze(admittedCases),
    diagnosticSummary: Object.freeze({
      state: 'incomplete_provider_coverage' as const,
      unavailableCaseIds:
        recomputedSummary.unavailableCaseIds,
      unresolvedCaseIds:
        recomputedSummary.unresolvedCaseIds,
      hypothesisMismatchCaseIds:
        recomputedSummary.hypothesisMismatchCaseIds,
    }),
    authority: Object.freeze({
      exactMakeHumanFixtureTransformDiagnosticsExecuted:
        true as const,
      parityConditionedAssignmentPatternEstablished:
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
  });
}
