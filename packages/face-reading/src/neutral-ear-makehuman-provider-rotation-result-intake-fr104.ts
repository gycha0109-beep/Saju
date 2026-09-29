import {
  classifyNeutralEarProviderLabelRelationFR104,
  inverseNeutralEarProviderRotationDegreesFR104,
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104,
  rotateNeutralEarProviderPointFR104,
} from './neutral-ear-makehuman-provider-rotation-dependence-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarProviderRotationDependenceEvidenceFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-provider-rotation-dependence-evidence-v1';
    authorityState:
      'exact_fixture_provider_rotation_dependence_admitted_no_anatomical_mapping';
    fixture: Readonly<{
      pngSha256: string;
      canonicalRgbaSha256: string;
      width: 1024;
      height: 1024;
    }>;
    cases: readonly Readonly<{
      id: string;
      family: string;
      nativeState: string;
      relation: string | null;
      nativeRgbaSha256: string;
      controlRgbaSha256: string;
      exactFamilyBaselineProviderScalarsRecovered: true;
    }>[];
    summary: Readonly<{
      state: 'exact_fixture_rotation_dependence_observed';
      providerRotationEquivarianceRefutedForExactFixture: true;
      crossLabelCaseIds: readonly string[];
      nativeUnavailableControlRecoveredCaseIds:
        readonly string[];
      anatomicalInterpretationUsed: false;
      detectorStageFailureClaimed: false;
      anatomicalMappingReviewOutcome: 'hold';
    }>;
    authority: Readonly<{
      providerRotationDependenceInvestigated: true;
      providerRotationEquivarianceRefutedForExactFixture: true;
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
    `FR-104 provider rotation dependence ${message}`,
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
  return Object.freeze({ x: item.x, y: item.y });
}

function distance(
  left: Readonly<{ x: number; y: number }>,
  right: Readonly<{ x: number; y: number }>,
): number {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

function midpoint(
  left: Readonly<{ x: number; y: number }>,
  right: Readonly<{ x: number; y: number }>,
): Readonly<{ x: number; y: number }> {
  return Object.freeze({
    x: (left.x + right.x) / 2,
    y: (left.y + right.y) / 2,
  });
}

export function admitNeutralEarProviderRotationDependenceResultFR104(
  input: unknown,
): NeutralEarProviderRotationDependenceEvidenceFR104V1 {
  const root = object(input, 'result');
  const protocol =
    NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104;

  exact(
    root.schemaVersion,
    'fr104-provider-rotation-dependence-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'bounded_provider_rotation_dependence_candidate_no_anatomical_mapping',
    'authorityState',
  );

  const fixture = object(root.fixture, 'fixture');
  exact(
    fixture.pngSha256,
    protocol.fixture.pngSha256,
    'fixture.pngSha256',
  );
  exact(
    fixture.canonicalRgbaSha256,
    protocol.fixture.canonicalRgbaSha256,
    'fixture.canonicalRgbaSha256',
  );
  exact(fixture.width, 1024, 'fixture.width');
  exact(fixture.height, 1024, 'fixture.height');
  exact(
    fixture.repositoryPersistence,
    false,
    'fixture.repositoryPersistence',
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
  exact(
    runtime.providerSideRotationHintUsed,
    false,
    'runtime.providerSideRotationHintUsed',
  );

  const boundary = object(
    root.interpretationBoundary,
    'interpretationBoundary',
  );
  exact(
    boundary.anatomicalGroundTruthUsed,
    false,
    'interpretationBoundary.anatomicalGroundTruthUsed',
  );
  exact(
    boundary.anatomicalSideSemanticsUsed,
    false,
    'interpretationBoundary.anatomicalSideSemanticsUsed',
  );
  exact(
    boundary.detectorStageFailureMayBeClaimed,
    false,
    'interpretationBoundary.detectorStageFailureMayBeClaimed',
  );
  exact(
    boundary.boundedClaim,
    'provider_pipeline_rotation_dependence_on_exact_tested_fixture_only',
    'interpretationBoundary.boundedClaim',
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
    execution.allEightNativeCasesExecuted,
    true,
    'execution.allEightNativeCasesExecuted',
  );
  exact(
    execution.allEightRotationCanonicalizedControlsExecuted,
    true,
    'execution.allEightRotationCanonicalizedControlsExecuted',
  );
  exact(
    execution.empiricalResultAdmitted,
    false,
    'execution.empiricalResultAdmitted',
  );

  const sourceAuthority = object(root.authority, 'authority');
  for (const key of [
    'providerRotationDependenceInvestigated',
    'providerRotationEquivarianceRefutedForExactFixture',
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

  const admittedCases: Array<Readonly<{
    id: string;
    family: string;
    nativeState: string;
    relation: string | null;
    nativeRgbaSha256: string;
    controlRgbaSha256: string;
    exactFamilyBaselineProviderScalarsRecovered: true;
  }>> = [];

  for (const [index, expected] of protocol.cases.entries()) {
    const item = object(root.cases[index], `cases[${index}]`);
    exact(item.id, expected.id, `${expected.id}.id`);
    exact(
      item.family,
      expected.family,
      `${expected.id}.family`,
    );
    exact(
      item.clockwiseRotationDegrees,
      expected.clockwiseRotationDegrees,
      `${expected.id}.clockwiseRotationDegrees`,
    );

    const native = object(
      item.native,
      `${expected.id}.native`,
    );
    exact(
      native.rgbaSha256,
      expected.predecessorNativeRgbaSha256,
      `${expected.id}.native.rgbaSha256`,
    );
    if (
      typeof native.rgbaSha256 !== 'string'
      || !SHA256_PATTERN.test(native.rgbaSha256)
    ) {
      fail(`${expected.id}.native.rgbaSha256 must be SHA-256.`);
    }

    const baseline =
      protocol.familyBaselines[expected.family];
    const nativeState =
      String(native.providerEligibilityState ?? '');
    let relation: string | null = null;

    if (nativeState === 'provider_cannot_detect_face') {
      exact(native.faceCount, 0, `${expected.id}.faceCount`);
      exact(
        native.landmarkCount,
        null,
        `${expected.id}.landmarkCount`,
      );
      exact(
        native.providerEyeCentroids,
        null,
        `${expected.id}.providerEyeCentroids`,
      );
      exact(
        item.inverseRotationComparison,
        null,
        `${expected.id}.inverseRotationComparison`,
      );
    } else {
      exact(
        nativeState,
        'exact_one_face_478_landmarks_observed',
        `${expected.id}.native.state`,
      );
      exact(native.faceCount, 1, `${expected.id}.faceCount`);
      exact(
        native.landmarkCount,
        478,
        `${expected.id}.landmarkCount`,
      );
      const provider = object(
        native.providerEyeCentroids,
        `${expected.id}.providerEyeCentroids`,
      );
      const nativeLeft = point(
        provider.providerLeft,
        `${expected.id}.nativeLeft`,
      );
      const nativeRight = point(
        provider.providerRight,
        `${expected.id}.nativeRight`,
      );
      exact(
        provider.topologyLabelAuthority,
        'provider_label_only_no_anatomical_meaning',
        `${expected.id}.topologyLabelAuthority`,
      );

      const comparison = object(
        item.inverseRotationComparison,
        `${expected.id}.inverseRotationComparison`,
      );
      const inverseRotation =
        inverseNeutralEarProviderRotationDegreesFR104(
          expected.clockwiseRotationDegrees,
        );
      exact(
        comparison.inverseRotationDegrees,
        inverseRotation,
        `${expected.id}.inverseRotationDegrees`,
      );
      const mapped = object(
        comparison.inverseMappedProviderEyeCentroids,
        `${expected.id}.mappedProvider`,
      );
      const mappedLeft = point(
        mapped.providerLeft,
        `${expected.id}.mappedLeft`,
      );
      const mappedRight = point(
        mapped.providerRight,
        `${expected.id}.mappedRight`,
      );
      const recomputedLeft =
        rotateNeutralEarProviderPointFR104(
          nativeLeft,
          inverseRotation,
        );
      const recomputedRight =
        rotateNeutralEarProviderPointFR104(
          nativeRight,
          inverseRotation,
        );
      exact(
        mappedLeft.x,
        recomputedLeft.x,
        `${expected.id}.mappedLeft.x`,
      );
      exact(
        mappedLeft.y,
        recomputedLeft.y,
        `${expected.id}.mappedLeft.y`,
      );
      exact(
        mappedRight.x,
        recomputedRight.x,
        `${expected.id}.mappedRight.x`,
      );
      exact(
        mappedRight.y,
        recomputedRight.y,
        `${expected.id}.mappedRight.y`,
      );

      const sameLabelCost =
        distance(mappedLeft, baseline.providerLeft)
        + distance(mappedRight, baseline.providerRight);
      const crossLabelCost =
        distance(mappedLeft, baseline.providerRight)
        + distance(mappedRight, baseline.providerLeft);
      const expectedRelation =
        classifyNeutralEarProviderLabelRelationFR104(
          sameLabelCost,
          crossLabelCost,
        );
      const mappedMidpoint = midpoint(mappedLeft, mappedRight);
      const baselineMidpoint = midpoint(
        baseline.providerLeft,
        baseline.providerRight,
      );
      const unorderedPairCost =
        Math.min(sameLabelCost, crossLabelCost);
      const pairMidpointError =
        distance(mappedMidpoint, baselineMidpoint);
      const interEyeDistanceAbsoluteDifference =
        Math.abs(
          distance(mappedLeft, mappedRight)
          - distance(
            baseline.providerLeft,
            baseline.providerRight,
          ),
        );

      exact(
        comparison.sameLabelCost,
        sameLabelCost,
        `${expected.id}.sameLabelCost`,
      );
      exact(
        comparison.crossLabelCost,
        crossLabelCost,
        `${expected.id}.crossLabelCost`,
      );
      exact(
        comparison.relation,
        expectedRelation,
        `${expected.id}.relation`,
      );
      exact(
        comparison.unorderedPairCost,
        unorderedPairCost,
        `${expected.id}.unorderedPairCost`,
      );
      exact(
        comparison.pairMidpointError,
        pairMidpointError,
        `${expected.id}.pairMidpointError`,
      );
      exact(
        comparison.interEyeDistanceAbsoluteDifference,
        interEyeDistanceAbsoluteDifference,
        `${expected.id}.interEyeDistanceAbsoluteDifference`,
      );
      exact(
        comparison.numericAcceptanceThresholdApplied,
        false,
        `${expected.id}.numericAcceptanceThresholdApplied`,
      );
      relation = expectedRelation;
    }

    const control = object(
      item.rotationCanonicalizedControl,
      `${expected.id}.control`,
    );
    exact(
      control.inverseRotationDegrees,
      inverseNeutralEarProviderRotationDegreesFR104(
        expected.clockwiseRotationDegrees,
      ),
      `${expected.id}.control.inverseRotationDegrees`,
    );
    exact(
      control.rgbaSha256,
      baseline.rgbaSha256,
      `${expected.id}.control.rgbaSha256`,
    );
    exact(
      control.exactFamilyBaselineBytesRecovered,
      true,
      `${expected.id}.control.exactFamilyBaselineBytesRecovered`,
    );
    exact(
      control.providerEligibilityState,
      'exact_one_face_478_landmarks_observed',
      `${expected.id}.control.providerEligibilityState`,
    );
    const controlProvider = object(
      control.providerEyeCentroids,
      `${expected.id}.control.providerEyeCentroids`,
    );
    const controlLeft = point(
      controlProvider.providerLeft,
      `${expected.id}.controlLeft`,
    );
    const controlRight = point(
      controlProvider.providerRight,
      `${expected.id}.controlRight`,
    );
    exact(
      controlLeft.x,
      baseline.providerLeft.x,
      `${expected.id}.controlLeft.x`,
    );
    exact(
      controlLeft.y,
      baseline.providerLeft.y,
      `${expected.id}.controlLeft.y`,
    );
    exact(
      controlRight.x,
      baseline.providerRight.x,
      `${expected.id}.controlRight.x`,
    );
    exact(
      controlRight.y,
      baseline.providerRight.y,
      `${expected.id}.controlRight.y`,
    );
    exact(
      control.exactFamilyBaselineProviderScalarsRecovered,
      true,
      `${expected.id}.control.exactFamilyBaselineProviderScalarsRecovered`,
    );

    admittedCases.push(Object.freeze({
      id: expected.id,
      family: expected.family,
      nativeState,
      relation,
      nativeRgbaSha256: native.rgbaSha256,
      controlRgbaSha256: control.rgbaSha256 as string,
      exactFamilyBaselineProviderScalarsRecovered:
        true as const,
    }));
  }

  const crossLabelCaseIds = admittedCases
    .filter(
      (item) =>
        item.relation === 'provider_cross_label_closer',
    )
    .map((item) => item.id);
  const recoveredUnavailable = admittedCases
    .filter(
      (item) =>
        item.nativeState
          !== 'exact_one_face_478_landmarks_observed'
        && item.exactFamilyBaselineProviderScalarsRecovered,
    )
    .map((item) => item.id);
  const unresolved = admittedCases.some(
    (item) => item.relation === 'equal_or_unresolved',
  );
  const state =
    crossLabelCaseIds.length > 0
      || recoveredUnavailable.length > 0
      ? 'exact_fixture_rotation_dependence_observed'
      : unresolved
        ? 'unresolved'
        : 'no_rotation_dependence_observed';

  const summary = object(root.summary, 'summary');
  exact(
    summary.state,
    state,
    'summary.state',
  );
  exact(
    state,
    'exact_fixture_rotation_dependence_observed',
    'summary.state admission',
  );
  exact(
    summary.providerRotationEquivarianceRefutedForExactFixture,
    true,
    'summary.providerRotationEquivarianceRefutedForExactFixture',
  );
  if (
    JSON.stringify(summary.crossLabelCaseIds)
      !== JSON.stringify(crossLabelCaseIds)
  ) {
    fail('summary.crossLabelCaseIds must exactly recompute.');
  }
  if (
    JSON.stringify(
      summary.nativeUnavailableControlRecoveredCaseIds,
    )
      !== JSON.stringify(recoveredUnavailable)
  ) {
    fail(
      'summary.nativeUnavailableControlRecoveredCaseIds must exactly recompute.',
    );
  }
  exact(
    summary.anatomicalInterpretationUsed,
    false,
    'summary.anatomicalInterpretationUsed',
  );
  exact(
    summary.detectorStageFailureClaimed,
    false,
    'summary.detectorStageFailureClaimed',
  );
  exact(
    summary.anatomicalMappingReviewOutcome,
    'hold',
    'summary.anatomicalMappingReviewOutcome',
  );

  return Object.freeze({
    schemaVersion:
      'fr104-provider-rotation-dependence-evidence-v1' as const,
    authorityState:
      'exact_fixture_provider_rotation_dependence_admitted_no_anatomical_mapping' as const,
    fixture: Object.freeze({
      pngSha256: protocol.fixture.pngSha256,
      canonicalRgbaSha256:
        protocol.fixture.canonicalRgbaSha256,
      width: 1024 as const,
      height: 1024 as const,
    }),
    cases: Object.freeze(admittedCases),
    summary: Object.freeze({
      state:
        'exact_fixture_rotation_dependence_observed' as const,
      providerRotationEquivarianceRefutedForExactFixture:
        true as const,
      crossLabelCaseIds: Object.freeze(crossLabelCaseIds),
      nativeUnavailableControlRecoveredCaseIds:
        Object.freeze(recoveredUnavailable),
      anatomicalInterpretationUsed: false as const,
      detectorStageFailureClaimed: false as const,
      anatomicalMappingReviewOutcome: 'hold' as const,
    }),
    authority: Object.freeze({
      providerRotationDependenceInvestigated: true as const,
      providerRotationEquivarianceRefutedForExactFixture:
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
    }),
  });
}
