import { describe, expect, it } from 'vitest';
import {
  admitNeutralEarIndependentPublicFixtureMirrorResultFR104,
} from './neutral-ear-mirror-independent-fixture-result-intake-fr104.js';
import {
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104,
} from './neutral-ear-mirror-independent-fixture-protocol-fr104.js';

function root(pair: Record<string, unknown>) {
  const protocol =
    NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104;
  return {
    schemaVersion:
      'fr104-controlled-provider-independent-fixture-mirror-result-v1',
    authorityState:
      'single_independent_public_fixture_scalar_evidence_only_no_general_semantics',
    runtime: {
      packageName: protocol.runtime.packageName,
      packageVersion: protocol.runtime.packageVersion,
      wasmRoot: protocol.runtime.wasmRoot,
      modelAssetRef: protocol.runtime.modelAssetRef,
      runtimeAssetByteDigestVerified: false,
      modelAssetByteDigestVerified: false,
    },
    fixture: {
      fixtureRef: protocol.fixture.fixtureRef,
      sourceRepository: protocol.fixture.sourceRepository,
      sourceCommit: protocol.fixture.sourceCommit,
      registryBlobSha: protocol.fixture.registryBlobSha,
      metadataBlobSha: protocol.fixture.metadataBlobSha,
      fileName: protocol.fixture.fileName,
      expectedSha256: protocol.fixture.sha256,
      observedSha256: protocol.fixture.sha256,
      digestVerified: true,
      width: 512,
      height: 512,
      rawFixturePersisted: false,
      sourceRepositoryDistinctFromMediaPipeFixtureSource:
        true,
    },
    transformation: {
      pair: ['original', 'horizontal_mirror'],
      resizeApplied: false,
      cropApplied: false,
      rotationApplied: false,
      taskImageProcessingRotationDegrees: 0,
    },
    pair,
    privacy: {
      userImageConsumed: false,
      cameraAccessed: false,
      sourceImagePersisted: false,
      rawLandmarksReturned: false,
      rawLandmarksPersisted: false,
      embeddingProduced: false,
      identityTemplateProduced: false,
    },
    authority: {
      resultMayBeCalledGeneralProviderMirrorSemantics: false,
      providerLabelMayBeCalledAnatomicalSide: false,
      anatomicalLateralityAuthorized: false,
      validatedExternalEarObservationAuthorized: false,
      traditionalBindingAuthorized: false,
      productionAuthorization: false,
    },
  };
}

describe('FR104 independent fixture result intake', () => {
  it('recomputes a successful scalar relation', () => {
    const original = {
      leftEyeCentroidX: 0.6,
      rightEyeCentroidX: 0.4,
    };
    const mirrored = {
      leftEyeCentroidX: 0.6,
      rightEyeCentroidX: 0.4,
    };
    const same =
      Math.abs((1 - 0.6) - 0.6)
      + Math.abs((1 - 0.4) - 0.4);
    const cross =
      Math.abs((1 - 0.6) - 0.4)
      + Math.abs((1 - 0.4) - 0.6);

    const evidence =
      admitNeutralEarIndependentPublicFixtureMirrorResultFR104(
        root({
          status: 'paired_scalar_evidence',
          original,
          mirrored,
          sameLabelReflectionTotalAbsoluteError: same,
          crossLabelReflectionTotalAbsoluteError: cross,
          closerPattern: 'cross_label_reflection_closer',
          numericAcceptanceThresholdApplied: false,
        }),
      );

    expect(evidence.status).toBe('paired_scalar_evidence');
    expect(evidence.scalarEvidence?.closerPattern)
      .toBe('cross_label_reflection_closer');
    expect(
      evidence.authority
        .generalProviderMirrorSemanticsEstablished,
    ).toBe(false);
  });

  it('retains a no-face run as unavailable only', () => {
    const evidence =
      admitNeutralEarIndependentPublicFixtureMirrorResultFR104(
        root({
          status: 'unavailable_pair',
          originalStatus:
            'unavailable_exactly_one_face_required',
          mirroredStatus:
            'unavailable_exactly_one_face_required',
          originalFaceCount: 0,
          mirroredFaceCount: 0,
        }),
      );

    expect(evidence.status).toBe('unavailable_pair');
    expect(evidence.unavailability).toMatchObject({
      originalFaceCount: 0,
      mirroredFaceCount: 0,
    });
  });

  it('rejects fixture digest drift', () => {
    const base = root({
      status: 'unavailable_pair',
      originalStatus:
        'unavailable_exactly_one_face_required',
      mirroredStatus:
        'unavailable_exactly_one_face_required',
      originalFaceCount: 0,
      mirroredFaceCount: 0,
    });

    expect(() =>
      admitNeutralEarIndependentPublicFixtureMirrorResultFR104({
        ...base,
        fixture: {
          ...(base.fixture as Record<string, unknown>),
          observedSha256: '0'.repeat(64),
        },
      }),
    ).toThrow(/fixture.observedSha256/i);
  });

  it('rejects copied reflection errors', () => {
    const original = {
      leftEyeCentroidX: 0.6,
      rightEyeCentroidX: 0.4,
    };
    const mirrored = {
      leftEyeCentroidX: 0.6,
      rightEyeCentroidX: 0.4,
    };

    expect(() =>
      admitNeutralEarIndependentPublicFixtureMirrorResultFR104(
        root({
          status: 'paired_scalar_evidence',
          original,
          mirrored,
          sameLabelReflectionTotalAbsoluteError: 0.123,
          crossLabelReflectionTotalAbsoluteError: 0,
          closerPattern: 'cross_label_reflection_closer',
          numericAcceptanceThresholdApplied: false,
        }),
      ),
    ).toThrow(/reflection errors must exactly recompute/i);
  });
});
