import {
  NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104,
} from './neutral-ear-mirror-pair-protocol-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarMirrorCloserPatternFR104V1 =
  | 'same_label_reflection_closer'
  | 'cross_label_reflection_closer'
  | 'equal';

export interface NeutralEarControlledMirrorPairEvidenceFR104V1 {
  readonly schemaVersion:
    'fr104-controlled-provider-mirror-pair-evidence-v1';
  readonly authorityState:
    'single_public_fixture_scalar_evidence_admitted_no_general_mirror_semantics';
  readonly fixture: {
    readonly sourceClass:
      'mediapipe_public_test_asset_non_user_fixture';
    readonly fileName: 'portrait.jpg';
    readonly sha256: string;
    readonly digestVerified: true;
    readonly width: number;
    readonly height: number;
  };
  readonly runtime: {
    readonly packageName: '@mediapipe/tasks-vision';
    readonly packageVersion: '0.10.35';
    readonly runtimeAssetByteDigestVerified: false;
    readonly modelAssetByteDigestVerified: false;
  };
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
    readonly closerPattern: NeutralEarMirrorCloserPatternFR104V1;
  };
  readonly integrity: {
    readonly sourceResultRecomputed: true;
    readonly fixtureDigestMatchedPinnedProtocol: true;
    readonly transformationMatchedPinnedProtocol: true;
    readonly privacyBoundaryMatchedPinnedProtocol: true;
    readonly authorityBoundaryMatchedPinnedProtocol: true;
  };
  readonly interpretationBoundary: {
    readonly boundedSingleFixtureRelationObserved: true;
    readonly closerPatternMayBeCalledGeneralProviderMirrorSemantics: false;
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

function object(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    fail(`${label} must be an object.`);
  }
  return value as Record<string, unknown>;
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

function finiteNonNegative(value: unknown, label: string): number {
  if (
    typeof value !== 'number'
    || !Number.isFinite(value)
    || value < 0
  ) {
    fail(`${label} must be finite and non-negative.`);
  }
  return value;
}

function positiveInteger(value: unknown, label: string): number {
  if (
    typeof value !== 'number'
    || !Number.isInteger(value)
    || value <= 0
  ) {
    fail(`${label} must be a positive integer.`);
  }
  return value;
}

function exact(
  actual: unknown,
  expected: string | boolean,
  label: string,
): void {
  if (actual !== expected) {
    fail(`${label} must equal the pinned protocol value.`);
  }
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
): NeutralEarMirrorCloserPatternFR104V1 {
  if (sameLabelError < crossLabelError) {
    return 'same_label_reflection_closer';
  }
  if (crossLabelError < sameLabelError) {
    return 'cross_label_reflection_closer';
  }
  return 'equal';
}

export function admitNeutralEarControlledMirrorPairResultFR104(
  input: unknown,
): NeutralEarControlledMirrorPairEvidenceFR104V1 {
  const root = object(input, 'mirrorPairResult');
  exact(
    root.schemaVersion,
    'fr104-controlled-provider-mirror-pair-result-v1',
    'mirrorPairResult.schemaVersion',
  );
  exact(
    root.authorityState,
    'single_public_fixture_scalar_evidence_only_no_anatomical_mapping',
    'mirrorPairResult.authorityState',
  );

  const fixture = object(root.fixture, 'mirrorPairResult.fixture');
  exact(
    fixture.sourceClass,
    'mediapipe_public_test_asset_non_user_fixture',
    'fixture.sourceClass',
  );
  exact(
    fixture.fileName,
    NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.fixture.fileName,
    'fixture.fileName',
  );
  exact(
    fixture.expectedSha256,
    NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.fixture.sha256,
    'fixture.expectedSha256',
  );
  exact(
    fixture.observedSha256,
    NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.fixture.sha256,
    'fixture.observedSha256',
  );
  exact(fixture.digestVerified, true, 'fixture.digestVerified');
  exact(
    fixture.rawFixturePersisted,
    false,
    'fixture.rawFixturePersisted',
  );
  const width = positiveInteger(fixture.width, 'fixture.width');
  const height = positiveInteger(fixture.height, 'fixture.height');

  const runtime = object(root.runtime, 'mirrorPairResult.runtime');
  exact(
    runtime.packageName,
    NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.runtime.packageName,
    'runtime.packageName',
  );
  exact(
    runtime.packageVersion,
    NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.runtime.packageVersion,
    'runtime.packageVersion',
  );
  exact(
    runtime.wasmRoot,
    NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.runtime.wasmRoot,
    'runtime.wasmRoot',
  );
  exact(
    runtime.modelAssetRef,
    NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.runtime.modelAssetRef,
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

  const transformation = object(
    root.transformation,
    'mirrorPairResult.transformation',
  );
  if (
    !Array.isArray(transformation.pair)
    || transformation.pair.length !== 2
    || transformation.pair[0] !== 'original'
    || transformation.pair[1] !== 'horizontal_mirror'
  ) {
    fail('transformation.pair must equal the pinned original/horizontal_mirror pair.');
  }
  exact(
    transformation.resizeApplied,
    false,
    'transformation.resizeApplied',
  );
  exact(
    transformation.cropApplied,
    false,
    'transformation.cropApplied',
  );
  exact(
    transformation.rotationApplied,
    false,
    'transformation.rotationApplied',
  );

  const scalar = object(
    root.scalarEvidence,
    'mirrorPairResult.scalarEvidence',
  );
  const original = scalarPair(
    scalar.original,
    'scalarEvidence.original',
  );
  const mirrored = scalarPair(
    scalar.mirrored,
    'scalarEvidence.mirrored',
  );
  const observedSame = finiteNonNegative(
    scalar.sameLabelReflectionTotalAbsoluteError,
    'scalarEvidence.sameLabelReflectionTotalAbsoluteError',
  );
  const observedCross = finiteNonNegative(
    scalar.crossLabelReflectionTotalAbsoluteError,
    'scalarEvidence.crossLabelReflectionTotalAbsoluteError',
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
    fail('scalar reflection errors must exactly recompute from the supplied centroids.');
  }

  const recomputedPattern = closerPattern(
    recomputedSame,
    recomputedCross,
  );
  if (scalar.closerPattern !== recomputedPattern) {
    fail('scalar closerPattern must recompute from the supplied errors.');
  }
  exact(
    scalar.numericAcceptanceThresholdApplied,
    false,
    'scalarEvidence.numericAcceptanceThresholdApplied',
  );

  const privacy = object(root.privacy, 'mirrorPairResult.privacy');
  for (const key of [
    'userImageConsumed',
    'cameraAccessed',
    'sourceImagePersisted',
    'rawLandmarksReturned',
    'rawLandmarksPersisted',
    'embeddingProduced',
    'identityTemplateProduced',
  ] as const) {
    exact(privacy[key], false, `privacy.${key}`);
  }

  const authority = object(
    root.authority,
    'mirrorPairResult.authority',
  );
  for (const key of [
    'closerPatternMayBeCalledGeneralProviderMirrorSemantics',
    'providerLabelMayBeCalledAnatomicalSide',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ] as const) {
    exact(authority[key], false, `authority.${key}`);
  }

  return Object.freeze({
    schemaVersion:
      'fr104-controlled-provider-mirror-pair-evidence-v1' as const,
    authorityState:
      'single_public_fixture_scalar_evidence_admitted_no_general_mirror_semantics' as const,
    fixture: Object.freeze({
      sourceClass:
        'mediapipe_public_test_asset_non_user_fixture' as const,
      fileName: 'portrait.jpg' as const,
      sha256: NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.fixture.sha256,
      digestVerified: true as const,
      width,
      height,
    }),
    runtime: Object.freeze({
      packageName: '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      runtimeAssetByteDigestVerified: false as const,
      modelAssetByteDigestVerified: false as const,
    }),
    scalarEvidence: Object.freeze({
      original,
      mirrored,
      sameLabelReflectionTotalAbsoluteError: recomputedSame,
      crossLabelReflectionTotalAbsoluteError: recomputedCross,
      closerPattern: recomputedPattern,
    }),
    integrity: Object.freeze({
      sourceResultRecomputed: true as const,
      fixtureDigestMatchedPinnedProtocol: true as const,
      transformationMatchedPinnedProtocol: true as const,
      privacyBoundaryMatchedPinnedProtocol: true as const,
      authorityBoundaryMatchedPinnedProtocol: true as const,
    }),
    interpretationBoundary: Object.freeze({
      boundedSingleFixtureRelationObserved: true as const,
      closerPatternMayBeCalledGeneralProviderMirrorSemantics: false as const,
      providerLabelMayBeCalledAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}
