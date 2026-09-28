import {
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104,
} from './neutral-ear-mirror-independent-fixture-protocol-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarIndependentFixtureResultFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-controlled-provider-independent-fixture-mirror-evidence-v1';
    authorityState:
      'independent_public_fixture_scalar_evidence_admitted_no_general_semantics';
    status:
      | 'paired_scalar_evidence'
      | 'unavailable_pair';
    fixture: Readonly<{
      fixtureRef:
        'skimage_astronaut_public_domain';
      sha256:
        '88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5';
      width: 512;
      height: 512;
    }>;
    scalarEvidence?: Readonly<{
      original: Readonly<{
        leftEyeCentroidX: number;
        rightEyeCentroidX: number;
      }>;
      mirrored: Readonly<{
        leftEyeCentroidX: number;
        rightEyeCentroidX: number;
      }>;
      sameLabelReflectionTotalAbsoluteError: number;
      crossLabelReflectionTotalAbsoluteError: number;
      closerPattern:
        | 'same_label_reflection_closer'
        | 'cross_label_reflection_closer'
        | 'equal';
    }>;
    unavailability?: Readonly<{
      originalStatus: string;
      mirroredStatus: string;
      originalFaceCount: number;
      mirroredFaceCount: number;
    }>;
    authority: Readonly<{
      generalProviderMirrorSemanticsEstablished: false;
      providerLabelMayBeCalledAnatomicalSide: false;
      anatomicalLateralityAuthorized: false;
      validatedExternalEarObservationAuthorized: false;
      traditionalBindingAuthorized: false;
      productionAuthorization: false;
    }>;
  }>;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 independent fixture ${message}`,
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
  expected: string | boolean | number,
  label: string,
): void {
  if (actual !== expected) {
    fail(`${label} must equal the pinned value.`);
  }
}

function unit(value: unknown, label: string): number {
  if (
    typeof value !== 'number'
    || !Number.isFinite(value)
    || value < 0
    || value > 1
  ) {
    fail(`${label} must be finite in [0,1].`);
  }
  return value;
}

function count(value: unknown, label: string): number {
  if (
    typeof value !== 'number'
    || !Number.isInteger(value)
    || value < 0
  ) {
    fail(`${label} must be a non-negative integer.`);
  }
  return value;
}

export function admitNeutralEarIndependentPublicFixtureMirrorResultFR104(
  input: unknown,
): NeutralEarIndependentFixtureResultFR104V1 {
  const root = object(input, 'result');
  const protocol =
    NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104;

  exact(
    root.schemaVersion,
    'fr104-controlled-provider-independent-fixture-mirror-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'single_independent_public_fixture_scalar_evidence_only_no_general_semantics',
    'authorityState',
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
    runtime.runtimeAssetByteDigestVerified,
    false,
    'runtime.runtimeAssetByteDigestVerified',
  );
  exact(
    runtime.modelAssetByteDigestVerified,
    false,
    'runtime.modelAssetByteDigestVerified',
  );

  const fixture = object(root.fixture, 'fixture');
  exact(
    fixture.fixtureRef,
    protocol.fixture.fixtureRef,
    'fixture.fixtureRef',
  );
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
    fixture.registryBlobSha,
    protocol.fixture.registryBlobSha,
    'fixture.registryBlobSha',
  );
  exact(
    fixture.metadataBlobSha,
    protocol.fixture.metadataBlobSha,
    'fixture.metadataBlobSha',
  );
  exact(
    fixture.fileName,
    protocol.fixture.fileName,
    'fixture.fileName',
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
  exact(
    fixture.width,
    protocol.fixture.expectedWidth,
    'fixture.width',
  );
  exact(
    fixture.height,
    protocol.fixture.expectedHeight,
    'fixture.height',
  );
  exact(
    fixture.rawFixturePersisted,
    false,
    'fixture.rawFixturePersisted',
  );
  exact(
    fixture.sourceRepositoryDistinctFromMediaPipeFixtureSource,
    true,
    'fixture.sourceRepositoryDistinctFromMediaPipeFixtureSource',
  );

  const transform = object(
    root.transformation,
    'transformation',
  );
  if (
    !Array.isArray(transform.pair)
    || transform.pair.length !== 2
    || transform.pair[0] !== 'original'
    || transform.pair[1] !== 'horizontal_mirror'
  ) {
    fail('transformation.pair must match the pinned pair.');
  }
  exact(
    transform.resizeApplied,
    false,
    'transformation.resizeApplied',
  );
  exact(
    transform.cropApplied,
    false,
    'transformation.cropApplied',
  );
  exact(
    transform.rotationApplied,
    false,
    'transformation.rotationApplied',
  );
  exact(
    transform.taskImageProcessingRotationDegrees,
    0,
    'transformation.taskImageProcessingRotationDegrees',
  );

  const privacy = object(root.privacy, 'privacy');
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

  const authority = object(root.authority, 'authority');
  for (const key of [
    'resultMayBeCalledGeneralProviderMirrorSemantics',
    'providerLabelMayBeCalledAnatomicalSide',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ] as const) {
    exact(authority[key], false, `authority.${key}`);
  }

  const pair = object(root.pair, 'pair');

  const fixedFixture = Object.freeze({
    fixtureRef:
      'skimage_astronaut_public_domain' as const,
    sha256:
      '88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5' as const,
    width: 512 as const,
    height: 512 as const,
  });

  const fixedAuthority = Object.freeze({
    generalProviderMirrorSemanticsEstablished:
      false as const,
    providerLabelMayBeCalledAnatomicalSide:
      false as const,
    anatomicalLateralityAuthorized: false as const,
    validatedExternalEarObservationAuthorized:
      false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });

  if (pair.status === 'unavailable_pair') {
    const originalStatus = String(pair.originalStatus ?? '');
    const mirroredStatus = String(pair.mirroredStatus ?? '');
    const allowed = new Set([
      'unavailable_exactly_one_face_required',
      'unavailable_provider_landmark_count_mismatch',
      'candidate_scalar_evidence',
    ]);
    if (
      !allowed.has(originalStatus)
      || !allowed.has(mirroredStatus)
      || (
        originalStatus === 'candidate_scalar_evidence'
        && mirroredStatus === 'candidate_scalar_evidence'
      )
    ) {
      fail('unavailable pair member states are invalid.');
    }
    return Object.freeze({
      schemaVersion:
        'fr104-controlled-provider-independent-fixture-mirror-evidence-v1' as const,
      authorityState:
        'independent_public_fixture_scalar_evidence_admitted_no_general_semantics' as const,
      status: 'unavailable_pair' as const,
      fixture: fixedFixture,
      unavailability: Object.freeze({
        originalStatus,
        mirroredStatus,
        originalFaceCount:
          count(pair.originalFaceCount, 'pair.originalFaceCount'),
        mirroredFaceCount:
          count(pair.mirroredFaceCount, 'pair.mirroredFaceCount'),
      }),
      authority: fixedAuthority,
    });
  }

  exact(
    pair.status,
    'paired_scalar_evidence',
    'pair.status',
  );
  const original = object(pair.original, 'pair.original');
  const mirrored = object(pair.mirrored, 'pair.mirrored');
  const ol = unit(
    original.leftEyeCentroidX,
    'pair.original.leftEyeCentroidX',
  );
  const or = unit(
    original.rightEyeCentroidX,
    'pair.original.rightEyeCentroidX',
  );
  const ml = unit(
    mirrored.leftEyeCentroidX,
    'pair.mirrored.leftEyeCentroidX',
  );
  const mr = unit(
    mirrored.rightEyeCentroidX,
    'pair.mirrored.rightEyeCentroidX',
  );

  const same =
    Math.abs((1 - ol) - ml)
    + Math.abs((1 - or) - mr);
  const cross =
    Math.abs((1 - ol) - mr)
    + Math.abs((1 - or) - ml);

  if (
    !Object.is(
      pair.sameLabelReflectionTotalAbsoluteError,
      same,
    )
    || !Object.is(
      pair.crossLabelReflectionTotalAbsoluteError,
      cross,
    )
  ) {
    fail('reflection errors must exactly recompute.');
  }

  const pattern =
    same < cross
      ? 'same_label_reflection_closer'
      : cross < same
        ? 'cross_label_reflection_closer'
        : 'equal';

  exact(pair.closerPattern, pattern, 'pair.closerPattern');
  exact(
    pair.numericAcceptanceThresholdApplied,
    false,
    'pair.numericAcceptanceThresholdApplied',
  );

  return Object.freeze({
    schemaVersion:
      'fr104-controlled-provider-independent-fixture-mirror-evidence-v1' as const,
    authorityState:
      'independent_public_fixture_scalar_evidence_admitted_no_general_semantics' as const,
    status: 'paired_scalar_evidence' as const,
    fixture: fixedFixture,
    scalarEvidence: Object.freeze({
      original: Object.freeze({
        leftEyeCentroidX: ol,
        rightEyeCentroidX: or,
      }),
      mirrored: Object.freeze({
        leftEyeCentroidX: ml,
        rightEyeCentroidX: mr,
      }),
      sameLabelReflectionTotalAbsoluteError: same,
      crossLabelReflectionTotalAbsoluteError: cross,
      closerPattern: pattern,
    }),
    authority: fixedAuthority,
  });
}
