import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104,
} from './neutral-ear-mirror-pair-protocol-fr104.js';
import {
  admitNeutralEarControlledMirrorPairResultFR104,
} from './neutral-ear-mirror-pair-result-intake-fr104.js';

function result(overrides: Record<string, unknown> = {}) {
  const original = Object.freeze({
    leftEyeCentroidX: 0.3,
    rightEyeCentroidX: 0.7,
  });
  const mirrored = Object.freeze({
    leftEyeCentroidX: 0.7,
    rightEyeCentroidX: 0.3,
  });
  const same =
    Math.abs((1 - original.leftEyeCentroidX) - mirrored.leftEyeCentroidX)
    + Math.abs((1 - original.rightEyeCentroidX) - mirrored.rightEyeCentroidX);
  const cross =
    Math.abs((1 - original.leftEyeCentroidX) - mirrored.rightEyeCentroidX)
    + Math.abs((1 - original.rightEyeCentroidX) - mirrored.leftEyeCentroidX);

  return {
    schemaVersion:
      'fr104-controlled-provider-mirror-pair-result-v1',
    authorityState:
      'single_public_fixture_scalar_evidence_only_no_anatomical_mapping',
    fixture: {
      sourceClass:
        'mediapipe_public_test_asset_non_user_fixture',
      fileName: 'portrait.jpg',
      expectedSha256:
        NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.fixture.sha256,
      observedSha256:
        NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.fixture.sha256,
      digestVerified: true,
      width: 512,
      height: 512,
      rawFixturePersisted: false,
    },
    runtime: {
      packageName: '@mediapipe/tasks-vision',
      packageVersion: '0.10.35',
      wasmRoot:
        NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.runtime.wasmRoot,
      modelAssetRef:
        NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.runtime.modelAssetRef,
      runtimeAssetByteDigestVerified: false,
      modelAssetByteDigestVerified: false,
    },
    transformation: {
      pair: ['original', 'horizontal_mirror'],
      resizeApplied: false,
      cropApplied: false,
      rotationApplied: false,
    },
    scalarEvidence: {
      original,
      mirrored,
      sameLabelReflectionTotalAbsoluteError: same,
      crossLabelReflectionTotalAbsoluteError: cross,
      closerPattern: 'same_label_reflection_closer',
      numericAcceptanceThresholdApplied: false,
    },
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
      closerPatternMayBeCalledGeneralProviderMirrorSemantics: false,
      providerLabelMayBeCalledAnatomicalSide: false,
      anatomicalLateralityAuthorized: false,
      validatedExternalEarObservationAuthorized: false,
      traditionalBindingAuthorized: false,
      productionAuthorization: false,
    },
    ...overrides,
  };
}

describe('FR104 controlled mirror-pair result intake', () => {
  it('admits a scalar-only single-fixture relation without generalizing mirror semantics', () => {
    const evidence =
      admitNeutralEarControlledMirrorPairResultFR104(result());

    expect(evidence.scalarEvidence.closerPattern)
      .toBe('same_label_reflection_closer');
    expect(evidence.integrity).toEqual({
      sourceResultRecomputed: true,
      fixtureDigestMatchedPinnedProtocol: true,
      transformationMatchedPinnedProtocol: true,
      privacyBoundaryMatchedPinnedProtocol: true,
      authorityBoundaryMatchedPinnedProtocol: true,
    });
    expect(
      evidence.interpretationBoundary
        .closerPatternMayBeCalledGeneralProviderMirrorSemantics,
    ).toBe(false);
    expect(
      evidence.interpretationBoundary
        .providerLabelMayBeCalledAnatomicalSide,
    ).toBe(false);
    expect(evidence.interpretationBoundary.anatomicalLateralityAuthorized)
      .toBe(false);
  });

  it('rejects fixture digest drift', () => {
    const base = result();
    expect(() => admitNeutralEarControlledMirrorPairResultFR104({
      ...base,
      fixture: {
        ...(base.fixture as Record<string, unknown>),
        observedSha256: '0'.repeat(64),
      },
    })).toThrow(/observedSha256/i);
  });

  it('rejects scalar-error drift instead of trusting copied summary values', () => {
    const base = result();
    expect(() => admitNeutralEarControlledMirrorPairResultFR104({
      ...base,
      scalarEvidence: {
        ...(base.scalarEvidence as Record<string, unknown>),
        sameLabelReflectionTotalAbsoluteError: 0.5,
      },
    })).toThrow(/must exactly recompute/i);
  });

  it('rejects a closer-pattern label that does not match the scalar relation', () => {
    const base = result();
    expect(() => admitNeutralEarControlledMirrorPairResultFR104({
      ...base,
      scalarEvidence: {
        ...(base.scalarEvidence as Record<string, unknown>),
        closerPattern: 'cross_label_reflection_closer',
      },
    })).toThrow(/closerPattern must recompute/i);
  });

  it('rejects any raw-landmark persistence or anatomical authority widening', () => {
    const base = result();
    expect(() => admitNeutralEarControlledMirrorPairResultFR104({
      ...base,
      privacy: {
        ...(base.privacy as Record<string, unknown>),
        rawLandmarksPersisted: true,
      },
    })).toThrow(/privacy.rawLandmarksPersisted/i);

    expect(() => admitNeutralEarControlledMirrorPairResultFR104({
      ...base,
      authority: {
        ...(base.authority as Record<string, unknown>),
        anatomicalLateralityAuthorized: true,
      },
    })).toThrow(/authority.anatomicalLateralityAuthorized/i);
  });

  it('admits cross-label-closer mechanics as descriptive evidence only', () => {
    const original = {
      leftEyeCentroidX: 0.3,
      rightEyeCentroidX: 0.7,
    };
    const mirrored = {
      leftEyeCentroidX: 0.3,
      rightEyeCentroidX: 0.7,
    };
    const same =
      Math.abs((1 - original.leftEyeCentroidX) - mirrored.leftEyeCentroidX)
      + Math.abs((1 - original.rightEyeCentroidX) - mirrored.rightEyeCentroidX);
    const cross =
      Math.abs((1 - original.leftEyeCentroidX) - mirrored.rightEyeCentroidX)
      + Math.abs((1 - original.rightEyeCentroidX) - mirrored.leftEyeCentroidX);
    const base = result();

    const evidence = admitNeutralEarControlledMirrorPairResultFR104({
      ...base,
      scalarEvidence: {
        original,
        mirrored,
        sameLabelReflectionTotalAbsoluteError: same,
        crossLabelReflectionTotalAbsoluteError: cross,
        closerPattern: 'cross_label_reflection_closer',
        numericAcceptanceThresholdApplied: false,
      },
    });

    expect(evidence.scalarEvidence.closerPattern)
      .toBe('cross_label_reflection_closer');
    expect(
      evidence.interpretationBoundary
        .closerPatternMayBeCalledGeneralProviderMirrorSemantics,
    ).toBe(false);
    expect(evidence.interpretationBoundary.anatomicalLateralityAuthorized)
      .toBe(false);
  });
});
