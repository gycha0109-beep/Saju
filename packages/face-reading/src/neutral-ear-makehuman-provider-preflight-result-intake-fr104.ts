import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104,
} from './neutral-ear-makehuman-provider-preflight-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarMakeHumanProviderPreflightEvidenceFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-makehuman-provider-preflight-evidence-v1';
    authorityState:
      'exact_pinned_fixture_face_detectability_admitted_direct_relation_observed_no_global_anatomical_semantics';
    fixture: Readonly<{
      sha256:
        'f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb';
      width: 1024;
      height: 1024;
    }>;
    runtime: Readonly<{
      packageName: '@mediapipe/tasks-vision';
      packageVersion: '0.10.35';
      runningMode: 'IMAGE';
      numFaces: 1;
    }>;
    providerEligibility: Readonly<{
      faceCount: 1;
      landmarkCount: 478;
      exactlyOneFaceVerified: true;
    }>;
    providerEyeCentroids: Readonly<{
      providerLeft: Readonly<{ x: number; y: number }>;
      providerRight: Readonly<{ x: number; y: number }>;
      topologyLabelAuthority:
        'provider_label_only_no_anatomical_meaning';
    }>;
    independentAnatomicalGroundTruth: Readonly<{
      anatomicalLeftEye: Readonly<{ x: number; y: number }>;
      anatomicalRightEye: Readonly<{ x: number; y: number }>;
      providerLandmarkDerived: false;
      providerLabelDerived: false;
      imageSpaceXSignDefinesAnatomicalSide: false;
    }>;
    comparison: Readonly<{
      directCost: number;
      swappedCost: number;
      relation: 'direct_assignment_closer';
      numericAcceptanceThresholdApplied: false;
    }>;
    authority: Readonly<{
      providerFaceDetectabilityVerifiedForExactPinnedFixture: true;
      providerLabelMappedToAnatomicalSide: false;
      globalProviderAnatomicalSemanticsEstablished: false;
      anatomicalReferenceAdmitted: false;
      anatomicalLateralityAuthorized: false;
      validatedExternalEarObservationAuthorized: false;
      traditionalBindingAuthorized: false;
      productionAuthorization: false;
    }>;
  }>;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 MakeHuman provider preflight ${message}`,
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
  expected: string | number | boolean,
  label: string,
): void {
  if (actual !== expected) {
    fail(`${label} must equal the pinned value.`);
  }
}

function point(
  value: unknown,
  label: string,
): Readonly<{ x: number; y: number }> {
  const item = object(value, label);
  const x = item.x;
  const y = item.y;
  if (
    typeof x !== 'number'
    || !Number.isFinite(x)
    || x < 0
    || x > 1
    || typeof y !== 'number'
    || !Number.isFinite(y)
    || y < 0
    || y > 1
  ) {
    fail(`${label} must be finite within [0,1].`);
  }
  return Object.freeze({ x, y });
}

function distance(
  left: Readonly<{ x: number; y: number }>,
  right: Readonly<{ x: number; y: number }>,
): number {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

export function admitNeutralEarMakeHumanProviderPreflightResultFR104(
  input: unknown,
): NeutralEarMakeHumanProviderPreflightEvidenceFR104V1 {
  const root = object(input, 'result');
  const protocol =
    NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104;

  exact(
    root.schemaVersion,
    'fr104-makehuman-provider-preflight-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'candidate_scalar_evidence_only_no_anatomical_mapping',
    'authorityState',
  );

  const fixture = object(root.fixture, 'fixture');
  exact(
    fixture.expectedSha256,
    protocol.fixture.expectedSha256,
    'fixture.expectedSha256',
  );
  exact(
    fixture.observedSha256,
    protocol.fixture.expectedSha256,
    'fixture.observedSha256',
  );
  exact(fixture.digestVerified, true, 'fixture.digestVerified');
  exact(fixture.width, protocol.fixture.width, 'fixture.width');
  exact(fixture.height, protocol.fixture.height, 'fixture.height');
  exact(
    fixture.repositoryPersistence,
    false,
    'fixture.repositoryPersistence',
  );
  exact(
    fixture.ephemeralMaterializationForProviderPreflight,
    true,
    'fixture.ephemeralMaterializationForProviderPreflight',
  );

  const runtime = object(root.runtime, 'runtime');
  exact(
    runtime.packageName,
    protocol.runtime.packageName,
    'runtime.packageName',
  );
  exact(
    runtime.packageVersion,
    protocol.runtime.packageVersion,
    'runtime.packageVersion',
  );
  exact(
    runtime.wasmRoot,
    protocol.runtime.wasmRoot,
    'runtime.wasmRoot',
  );
  exact(
    runtime.modelAssetRef,
    protocol.runtime.modelAssetRef,
    'runtime.modelAssetRef',
  );
  exact(
    runtime.runningMode,
    protocol.runtime.runningMode,
    'runtime.runningMode',
  );
  exact(
    runtime.numFaces,
    protocol.runtime.numFaces,
    'runtime.numFaces',
  );
  exact(
    runtime.runtimeAssetByteDigestVerified,
    false,
    'runtime.runtimeAssetByteDigestVerified',
  );
  exact(
    runtime.modelAssetByteDigestVerified,
    false,
    'runtime.modelAssetByteDigestVerified',
  );

  const execution = object(root.execution, 'execution');
  exact(
    execution.providerPreflightExecuted,
    true,
    'execution.providerPreflightExecuted',
  );
  exact(
    execution.providerFaceDetectabilityObserved,
    true,
    'execution.providerFaceDetectabilityObserved',
  );
  exact(
    execution.empiricalResultAdmitted,
    false,
    'execution.empiricalResultAdmitted',
  );

  const privacy = object(root.privacy, 'privacy');
  for (const key of [
    'userImageConsumed',
    'cameraAccessed',
    'rawProviderLandmarksReturned',
    'rawProviderLandmarksPersisted',
    'biometricEmbeddingProduced',
    'identityTemplateProduced',
  ] as const) {
    exact(privacy[key], false, `privacy.${key}`);
  }

  const sourceAuthority = object(root.authority, 'authority');
  for (const key of [
    'providerFaceDetectabilityVerified',
    'providerLabelMappedToAnatomicalSide',
    'anatomicalReferenceAdmitted',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ] as const) {
    exact(sourceAuthority[key], false, `authority.${key}`);
  }

  const eligibility = object(
    root.providerEligibility,
    'providerEligibility',
  );
  exact(
    eligibility.state,
    'exact_one_face_478_landmarks_observed',
    'providerEligibility.state',
  );
  exact(eligibility.faceCount, 1, 'providerEligibility.faceCount');
  exact(
    eligibility.landmarkCount,
    478,
    'providerEligibility.landmarkCount',
  );
  exact(
    eligibility.exactlyOneFaceVerified,
    true,
    'providerEligibility.exactlyOneFaceVerified',
  );
  exact(
    eligibility.expectedLandmarkCount,
    478,
    'providerEligibility.expectedLandmarkCount',
  );

  const provider = object(
    root.providerEyeCentroids,
    'providerEyeCentroids',
  );
  const providerLeft = point(
    provider.providerLeft,
    'providerEyeCentroids.providerLeft',
  );
  const providerRight = point(
    provider.providerRight,
    'providerEyeCentroids.providerRight',
  );
  exact(
    provider.topologyLabelAuthority,
    'provider_label_only_no_anatomical_meaning',
    'providerEyeCentroids.topologyLabelAuthority',
  );

  const groundTruth = object(
    root.independentAnatomicalGroundTruth,
    'independentAnatomicalGroundTruth',
  );
  exact(
    groundTruth.coordinateFrame,
    protocol.independentAnatomicalGroundTruth.coordinateFrame,
    'independentAnatomicalGroundTruth.coordinateFrame',
  );
  const anatomicalLeft = point(
    groundTruth.anatomicalLeftEye,
    'independentAnatomicalGroundTruth.anatomicalLeftEye',
  );
  const anatomicalRight = point(
    groundTruth.anatomicalRightEye,
    'independentAnatomicalGroundTruth.anatomicalRightEye',
  );
  exact(
    anatomicalLeft.x,
    protocol.independentAnatomicalGroundTruth.anatomicalLeftEye.x,
    'independentAnatomicalGroundTruth.anatomicalLeftEye.x',
  );
  exact(
    anatomicalLeft.y,
    protocol.independentAnatomicalGroundTruth.anatomicalLeftEye.y,
    'independentAnatomicalGroundTruth.anatomicalLeftEye.y',
  );
  exact(
    anatomicalRight.x,
    protocol.independentAnatomicalGroundTruth.anatomicalRightEye.x,
    'independentAnatomicalGroundTruth.anatomicalRightEye.x',
  );
  exact(
    anatomicalRight.y,
    protocol.independentAnatomicalGroundTruth.anatomicalRightEye.y,
    'independentAnatomicalGroundTruth.anatomicalRightEye.y',
  );
  exact(
    groundTruth.providerLandmarkDerived,
    false,
    'independentAnatomicalGroundTruth.providerLandmarkDerived',
  );
  exact(
    groundTruth.providerLabelDerived,
    false,
    'independentAnatomicalGroundTruth.providerLabelDerived',
  );
  exact(
    groundTruth.imageSpaceXSignDefinesAnatomicalSide,
    false,
    'independentAnatomicalGroundTruth.imageSpaceXSignDefinesAnatomicalSide',
  );

  const comparison = object(root.comparison, 'comparison');
  const directCost = comparison.directCost;
  const swappedCost = comparison.swappedCost;
  if (
    typeof directCost !== 'number'
    || !Number.isFinite(directCost)
    || directCost < 0
    || typeof swappedCost !== 'number'
    || !Number.isFinite(swappedCost)
    || swappedCost < 0
  ) {
    fail('comparison costs must be finite and non-negative.');
  }
  exact(
    comparison.numericAcceptanceThresholdApplied,
    false,
    'comparison.numericAcceptanceThresholdApplied',
  );

  const recomputedDirect =
    distance(providerLeft, anatomicalLeft)
    + distance(providerRight, anatomicalRight);
  const recomputedSwapped =
    distance(providerLeft, anatomicalRight)
    + distance(providerRight, anatomicalLeft);
  const recomputedRelation =
    recomputedDirect < recomputedSwapped
      ? 'direct_assignment_closer'
      : recomputedSwapped < recomputedDirect
        ? 'swapped_assignment_closer'
        : 'equal_or_unresolved';

  exact(
    comparison.relation,
    recomputedRelation,
    'comparison.relation',
  );
  exact(
    comparison.relation,
    'direct_assignment_closer',
    'comparison.relation',
  );
  if (!(directCost < swappedCost)) {
    fail(
      'reported direct/swapped costs must preserve the admitted direct ordering.',
    );
  }

  return Object.freeze({
    schemaVersion:
      'fr104-makehuman-provider-preflight-evidence-v1' as const,
    authorityState:
      'exact_pinned_fixture_face_detectability_admitted_direct_relation_observed_no_global_anatomical_semantics' as const,
    fixture: Object.freeze({
      sha256: protocol.fixture.expectedSha256,
      width: protocol.fixture.width,
      height: protocol.fixture.height,
    }),
    runtime: Object.freeze({
      packageName: protocol.runtime.packageName,
      packageVersion: protocol.runtime.packageVersion,
      runningMode: protocol.runtime.runningMode,
      numFaces: protocol.runtime.numFaces,
    }),
    providerEligibility: Object.freeze({
      faceCount: 1 as const,
      landmarkCount: 478 as const,
      exactlyOneFaceVerified: true as const,
    }),
    providerEyeCentroids: Object.freeze({
      providerLeft,
      providerRight,
      topologyLabelAuthority:
        'provider_label_only_no_anatomical_meaning' as const,
    }),
    independentAnatomicalGroundTruth: Object.freeze({
      anatomicalLeftEye: anatomicalLeft,
      anatomicalRightEye: anatomicalRight,
      providerLandmarkDerived: false as const,
      providerLabelDerived: false as const,
      imageSpaceXSignDefinesAnatomicalSide: false as const,
    }),
    comparison: Object.freeze({
      directCost,
      swappedCost,
      relation: 'direct_assignment_closer' as const,
      numericAcceptanceThresholdApplied: false as const,
    }),
    authority: Object.freeze({
      providerFaceDetectabilityVerifiedForExactPinnedFixture:
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
