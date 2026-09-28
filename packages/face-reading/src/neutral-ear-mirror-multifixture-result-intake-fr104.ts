import {
  NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104,
} from './neutral-ear-mirror-multifixture-protocol-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarMultiFixtureCloserPatternFR104V1 =
  | 'same_label_reflection_closer'
  | 'cross_label_reflection_closer'
  | 'equal';

export type NeutralEarMultiFixtureUnavailableStateFR104V1 =
  | 'unavailable_fixture_fetch_failed'
  | 'unavailable_invalid_decoded_dimensions'
  | 'unavailable_runtime_error_fail_closed'
  | 'unavailable_pair';

export interface NeutralEarMultiFixtureScalarEvidenceFR104V1 {
  readonly fixtureRef: string;
  readonly status: 'paired_scalar_evidence';
  readonly fileName: string;
  readonly evidenceRole: string;
  readonly sha256: string;
  readonly width: number;
  readonly height: number;
  readonly scalarEvidence: {
    readonly original: {
      readonly leftEyeCentroidX: number;
      readonly rightEyeCentroidX: number;
    };
    readonly mirrored: {
      readonly leftEyeCentroidX: number;
      readonly rightEyeCentroidX: number;
    };
    readonly sameLabelReflectionTotalAbsoluteError: number;
    readonly crossLabelReflectionTotalAbsoluteError: number;
    readonly closerPattern:
      NeutralEarMultiFixtureCloserPatternFR104V1;
  };
}

export interface NeutralEarMultiFixtureUnavailableEvidenceFR104V1 {
  readonly fixtureRef: string;
  readonly status: NeutralEarMultiFixtureUnavailableStateFR104V1;
  readonly digestVerified:
    | true
    | false;
  readonly originalFaceCount?: number;
  readonly mirroredFaceCount?: number;
}

export interface NeutralEarMultiFixtureMirrorEvidenceFR104V1 {
  readonly schemaVersion:
    'fr104-controlled-provider-multifixture-mirror-evidence-v1';
  readonly authorityState:
    'multi_public_fixture_scalar_evidence_admitted_no_general_semantics';
  readonly successfulFixtures:
    readonly NeutralEarMultiFixtureScalarEvidenceFR104V1[];
  readonly unavailableFixtures:
    readonly NeutralEarMultiFixtureUnavailableEvidenceFR104V1[];
  readonly aggregate: {
    readonly fixtureCount: number;
    readonly successfulFixtureCount: number;
    readonly unavailableFixtureCount: number;
    readonly closerPatternCounts: Readonly<{
      same_label_reflection_closer: number;
      cross_label_reflection_closer: number;
      equal: number;
    }>;
  };
  readonly integrity: {
    readonly exactProtocolFixtureSetMatched: true;
    readonly successfulScalarErrorsRecomputed: true;
    readonly aggregateRecomputed: true;
    readonly privacyBoundaryMatched: true;
    readonly authorityBoundaryMatched: true;
  };
  readonly interpretationBoundary: {
    readonly repeatedPatternMayBeCalledGeneralProviderMirrorSemantics:
      false;
    readonly providerLabelMayBeCalledAnatomicalSide: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-104 ${message}`);
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
  expected: string | boolean | number,
  label: string,
): void {
  if (actual !== expected) {
    fail(`${label} must equal the pinned protocol value.`);
  }
}

function finiteUnit(value: unknown, label: string): number {
  if (
    typeof value !== 'number'
    || !Number.isFinite(value)
    || value < 0
    || value > 1
  ) {
    fail(`${label} must be finite within [0,1].`);
  }
  return value;
}

function finiteNonNegative(
  value: unknown,
  label: string,
): number {
  if (
    typeof value !== 'number'
    || !Number.isFinite(value)
    || value < 0
  ) {
    fail(`${label} must be finite and non-negative.`);
  }
  return value;
}

function nonNegativeInteger(
  value: unknown,
  label: string,
): number {
  if (
    typeof value !== 'number'
    || !Number.isInteger(value)
    || value < 0
  ) {
    fail(`${label} must be a non-negative integer.`);
  }
  return value;
}

function positiveInteger(value: unknown, label: string): number {
  const result = nonNegativeInteger(value, label);
  if (result <= 0) {
    fail(`${label} must be positive.`);
  }
  return result;
}

function scalarPair(
  value: unknown,
  label: string,
): Readonly<{
  leftEyeCentroidX: number;
  rightEyeCentroidX: number;
}> {
  const candidate = object(value, label);
  return Object.freeze({
    leftEyeCentroidX: finiteUnit(
      candidate.leftEyeCentroidX,
      `${label}.leftEyeCentroidX`,
    ),
    rightEyeCentroidX: finiteUnit(
      candidate.rightEyeCentroidX,
      `${label}.rightEyeCentroidX`,
    ),
  });
}

function closerPattern(
  sameLabelError: number,
  crossLabelError: number,
): NeutralEarMultiFixtureCloserPatternFR104V1 {
  if (sameLabelError < crossLabelError) {
    return 'same_label_reflection_closer';
  }
  if (crossLabelError < sameLabelError) {
    return 'cross_label_reflection_closer';
  }
  return 'equal';
}

function validateRootBoundary(root: Record<string, unknown>): void {
  exact(
    root.schemaVersion,
    'fr104-controlled-provider-multifixture-mirror-result-v1',
    'result.schemaVersion',
  );
  exact(
    root.authorityState,
    'multi_public_fixture_scalar_evidence_only_no_general_semantics',
    'result.authorityState',
  );

  const release = object(
    root.upstreamRelease,
    'result.upstreamRelease',
  );
  exact(
    release.repository,
    NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
      .upstreamRelease.repository,
    'upstreamRelease.repository',
  );
  exact(
    release.releaseTag,
    NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
      .upstreamRelease.releaseTag,
    'upstreamRelease.releaseTag',
  );
  exact(
    release.releaseCommit,
    NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
      .upstreamRelease.releaseCommit,
    'upstreamRelease.releaseCommit',
  );

  const runtime = object(root.runtime, 'result.runtime');
  exact(
    runtime.packageName,
    NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
      .runtime.packageName,
    'runtime.packageName',
  );
  exact(
    runtime.packageVersion,
    NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
      .runtime.packageVersion,
    'runtime.packageVersion',
  );
  exact(
    runtime.wasmRoot,
    NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
      .runtime.wasmRoot,
    'runtime.wasmRoot',
  );
  exact(
    runtime.modelAssetRef,
    NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
      .runtime.modelAssetRef,
    'runtime.modelAssetRef',
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

  const transform = object(
    root.transformation,
    'result.transformation',
  );
  if (
    !Array.isArray(transform.pairPerFixture)
    || transform.pairPerFixture.length !== 2
    || transform.pairPerFixture[0] !== 'original'
    || transform.pairPerFixture[1] !== 'horizontal_mirror'
  ) {
    fail('transformation.pairPerFixture must match the pinned pair.');
  }
  exact(
    transform.resizeBetweenPairMembers,
    false,
    'transformation.resizeBetweenPairMembers',
  );
  exact(
    transform.cropBetweenPairMembers,
    false,
    'transformation.cropBetweenPairMembers',
  );
  exact(
    transform.rotationBetweenPairMembers,
    false,
    'transformation.rotationBetweenPairMembers',
  );
  exact(
    transform.taskImageProcessingRotationDegrees,
    0,
    'transformation.taskImageProcessingRotationDegrees',
  );

  const privacy = object(root.privacy, 'result.privacy');
  for (const key of [
    'userImageConsumed',
    'cameraAccessed',
    'sourceImagesPersisted',
    'rawLandmarksReturned',
    'rawLandmarksPersisted',
    'embeddingProduced',
    'identityTemplateProduced',
  ] as const) {
    exact(privacy[key], false, `privacy.${key}`);
  }

  const authority = object(root.authority, 'result.authority');
  for (const key of [
    'repeatedPatternMayBeCalledGeneralProviderMirrorSemantics',
    'providerLabelMayBeCalledAnatomicalSide',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ] as const) {
    exact(authority[key], false, `authority.${key}`);
  }
}

function validateSuccessfulFixture(
  result: Record<string, unknown>,
  fixture: typeof NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
    .fixtures[number],
): NeutralEarMultiFixtureScalarEvidenceFR104V1 {
  exact(result.fileName, fixture.fileName, 'fixture.fileName');
  exact(
    result.evidenceRole,
    fixture.evidenceRole,
    'fixture.evidenceRole',
  );
  exact(
    result.expectedSha256,
    fixture.sha256,
    'fixture.expectedSha256',
  );
  exact(
    result.observedSha256,
    fixture.sha256,
    'fixture.observedSha256',
  );
  exact(result.digestVerified, true, 'fixture.digestVerified');
  exact(
    result.rawFixturePersisted,
    false,
    'fixture.rawFixturePersisted',
  );
  const width = positiveInteger(result.width, 'fixture.width');
  const height = positiveInteger(result.height, 'fixture.height');

  const pair = object(result.pair, 'fixture.pair');
  exact(
    pair.status,
    'paired_scalar_evidence',
    'fixture.pair.status',
  );
  const original = scalarPair(
    pair.original,
    'fixture.pair.original',
  );
  const mirrored = scalarPair(
    pair.mirrored,
    'fixture.pair.mirrored',
  );
  const observedSame = finiteNonNegative(
    pair.sameLabelReflectionTotalAbsoluteError,
    'fixture.pair.sameLabelReflectionTotalAbsoluteError',
  );
  const observedCross = finiteNonNegative(
    pair.crossLabelReflectionTotalAbsoluteError,
    'fixture.pair.crossLabelReflectionTotalAbsoluteError',
  );
  const recomputedSame =
    Math.abs(
      (1 - original.leftEyeCentroidX)
        - mirrored.leftEyeCentroidX,
    )
    + Math.abs(
      (1 - original.rightEyeCentroidX)
        - mirrored.rightEyeCentroidX,
    );
  const recomputedCross =
    Math.abs(
      (1 - original.leftEyeCentroidX)
        - mirrored.rightEyeCentroidX,
    )
    + Math.abs(
      (1 - original.rightEyeCentroidX)
        - mirrored.leftEyeCentroidX,
    );

  if (
    !Object.is(observedSame, recomputedSame)
    || !Object.is(observedCross, recomputedCross)
  ) {
    fail(
      `${fixture.fixtureRef} reflection errors must exactly recompute.`,
    );
  }
  const pattern = closerPattern(
    recomputedSame,
    recomputedCross,
  );
  if (pair.closerPattern !== pattern) {
    fail(
      `${fixture.fixtureRef} closerPattern must exactly recompute.`,
    );
  }
  exact(
    pair.numericAcceptanceThresholdApplied,
    false,
    'fixture.pair.numericAcceptanceThresholdApplied',
  );

  return Object.freeze({
    fixtureRef: fixture.fixtureRef,
    status: 'paired_scalar_evidence' as const,
    fileName: fixture.fileName,
    evidenceRole: fixture.evidenceRole,
    sha256: fixture.sha256,
    width,
    height,
    scalarEvidence: Object.freeze({
      original,
      mirrored,
      sameLabelReflectionTotalAbsoluteError: recomputedSame,
      crossLabelReflectionTotalAbsoluteError: recomputedCross,
      closerPattern: pattern,
    }),
  });
}

function validateUnavailableFixture(
  result: Record<string, unknown>,
  fixture: typeof NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
    .fixtures[number],
): NeutralEarMultiFixtureUnavailableEvidenceFR104V1 {
  const topStatus = result.status;

  if (topStatus === 'unavailable_fixture_digest_mismatch') {
    fail(
      `${fixture.fixtureRef} fixture digest mismatch invalidates the controlled fixture.`,
    );
  }

  if (
    topStatus === 'unavailable_fixture_fetch_failed'
    || topStatus === 'unavailable_invalid_decoded_dimensions'
    || topStatus === 'unavailable_runtime_error_fail_closed'
  ) {
    return Object.freeze({
      fixtureRef: fixture.fixtureRef,
      status: topStatus,
      digestVerified: false as const,
    });
  }

  if (
    result.fileName !== fixture.fileName
    || result.evidenceRole !== fixture.evidenceRole
    || result.expectedSha256 !== fixture.sha256
    || result.observedSha256 !== fixture.sha256
    || result.digestVerified !== true
    || result.rawFixturePersisted !== false
  ) {
    fail(
      `${fixture.fixtureRef} unavailable-pair fixture provenance drift.`,
    );
  }

  const pair = object(result.pair, 'fixture.pair');
  exact(pair.status, 'unavailable_pair', 'fixture.pair.status');

  const allowedMemberStates = new Set([
    'candidate_scalar_evidence',
    'unavailable_exactly_one_face_required',
    'unavailable_provider_landmark_count_mismatch',
  ]);
  if (
    typeof pair.originalStatus !== 'string'
    || !allowedMemberStates.has(pair.originalStatus)
    || typeof pair.mirroredStatus !== 'string'
    || !allowedMemberStates.has(pair.mirroredStatus)
  ) {
    fail(
      `${fixture.fixtureRef} unavailable pair member status is invalid.`,
    );
  }
  if (
    pair.originalStatus === 'candidate_scalar_evidence'
    && pair.mirroredStatus === 'candidate_scalar_evidence'
  ) {
    fail(
      `${fixture.fixtureRef} unavailable pair cannot contain two successful members.`,
    );
  }

  return Object.freeze({
    fixtureRef: fixture.fixtureRef,
    status: 'unavailable_pair' as const,
    digestVerified: true as const,
    originalFaceCount: nonNegativeInteger(
      pair.originalFaceCount,
      'fixture.pair.originalFaceCount',
    ),
    mirroredFaceCount: nonNegativeInteger(
      pair.mirroredFaceCount,
      'fixture.pair.mirroredFaceCount',
    ),
  });
}

export function admitNeutralEarControlledMultiFixtureMirrorResultFR104(
  input: unknown,
): NeutralEarMultiFixtureMirrorEvidenceFR104V1 {
  const root = object(input, 'multiFixtureResult');
  validateRootBoundary(root);

  if (!Array.isArray(root.fixtureResults)) {
    fail('fixtureResults must be an array.');
  }
  if (
    root.fixtureResults.length
      !== NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
        .fixtures.length
  ) {
    fail('fixtureResults must contain the exact protocol fixture count.');
  }

  const byRef = new Map<string, Record<string, unknown>>();
  for (const raw of root.fixtureResults) {
    const result = object(raw, 'fixtureResult');
    if (
      typeof result.fixtureRef !== 'string'
      || byRef.has(result.fixtureRef)
    ) {
      fail('fixtureResults must contain unique string fixtureRefs.');
    }
    byRef.set(result.fixtureRef, result);
  }

  const successful: NeutralEarMultiFixtureScalarEvidenceFR104V1[] =
    [];
  const unavailable:
    NeutralEarMultiFixtureUnavailableEvidenceFR104V1[] = [];

  for (
    const fixture
    of NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.fixtures
  ) {
    const result = byRef.get(fixture.fixtureRef);
    if (result === undefined) {
      fail(`missing fixture result: ${fixture.fixtureRef}.`);
    }

    const pair =
      typeof result.pair === 'object'
      && result.pair !== null
      && !Array.isArray(result.pair)
        ? result.pair as Record<string, unknown>
        : null;

    if (pair?.status === 'paired_scalar_evidence') {
      successful.push(
        validateSuccessfulFixture(result, fixture),
      );
    } else {
      unavailable.push(
        validateUnavailableFixture(result, fixture),
      );
    }
  }

  if (byRef.size !==
    NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.fixtures.length
  ) {
    fail('fixtureResults contain an unknown fixtureRef.');
  }

  const counts = {
    same_label_reflection_closer: 0,
    cross_label_reflection_closer: 0,
    equal: 0,
  };
  for (const result of successful) {
    counts[result.scalarEvidence.closerPattern] += 1;
  }

  const aggregate = object(root.aggregate, 'result.aggregate');
  exact(
    aggregate.fixtureCount,
    NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
      .fixtures.length,
    'aggregate.fixtureCount',
  );
  exact(
    aggregate.successfulFixtureCount,
    successful.length,
    'aggregate.successfulFixtureCount',
  );
  exact(
    aggregate.unavailableFixtureCount,
    unavailable.length,
    'aggregate.unavailableFixtureCount',
  );
  const suppliedCounts = object(
    aggregate.closerPatternCounts,
    'aggregate.closerPatternCounts',
  );
  for (const key of [
    'same_label_reflection_closer',
    'cross_label_reflection_closer',
    'equal',
  ] as const) {
    exact(
      suppliedCounts[key],
      counts[key],
      `aggregate.closerPatternCounts.${key}`,
    );
  }
  exact(
    aggregate.aggregateMayBeCalledGeneralProviderMirrorSemantics,
    false,
    'aggregate.aggregateMayBeCalledGeneralProviderMirrorSemantics',
  );
  exact(
    aggregate.anatomicalLateralityAuthorized,
    false,
    'aggregate.anatomicalLateralityAuthorized',
  );

  return Object.freeze({
    schemaVersion:
      'fr104-controlled-provider-multifixture-mirror-evidence-v1' as const,
    authorityState:
      'multi_public_fixture_scalar_evidence_admitted_no_general_semantics' as const,
    successfulFixtures: Object.freeze(successful),
    unavailableFixtures: Object.freeze(unavailable),
    aggregate: Object.freeze({
      fixtureCount:
        NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
          .fixtures.length,
      successfulFixtureCount: successful.length,
      unavailableFixtureCount: unavailable.length,
      closerPatternCounts: Object.freeze(counts),
    }),
    integrity: Object.freeze({
      exactProtocolFixtureSetMatched: true as const,
      successfulScalarErrorsRecomputed: true as const,
      aggregateRecomputed: true as const,
      privacyBoundaryMatched: true as const,
      authorityBoundaryMatched: true as const,
    }),
    interpretationBoundary: Object.freeze({
      repeatedPatternMayBeCalledGeneralProviderMirrorSemantics:
        false as const,
      providerLabelMayBeCalledAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}
