import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104,
} from './neutral-ear-mirror-multifixture-protocol-fr104.js';
import {
  admitNeutralEarControlledMultiFixtureMirrorResultFR104,
} from './neutral-ear-mirror-multifixture-result-intake-fr104.js';

function success(
  fixture:
    typeof NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
      .fixtures[number],
  mode:
    | 'cross'
    | 'same' = 'cross',
) {
  const original = {
    leftEyeCentroidX: 0.3,
    rightEyeCentroidX: 0.7,
  };
  const mirrored = mode === 'cross'
    ? {
        leftEyeCentroidX: 0.3,
        rightEyeCentroidX: 0.7,
      }
    : {
        leftEyeCentroidX: 0.7,
        rightEyeCentroidX: 0.3,
      };
  const same =
    Math.abs(
      (1 - original.leftEyeCentroidX)
        - mirrored.leftEyeCentroidX,
    )
    + Math.abs(
      (1 - original.rightEyeCentroidX)
        - mirrored.rightEyeCentroidX,
    );
  const cross =
    Math.abs(
      (1 - original.leftEyeCentroidX)
        - mirrored.rightEyeCentroidX,
    )
    + Math.abs(
      (1 - original.rightEyeCentroidX)
        - mirrored.leftEyeCentroidX,
    );

  return {
    fixtureRef: fixture.fixtureRef,
    fileName: fixture.fileName,
    evidenceRole: fixture.evidenceRole,
    expectedSha256: fixture.sha256,
    observedSha256: fixture.sha256,
    digestVerified: true,
    width: 640,
    height: 480,
    rawFixturePersisted: false,
    pair: {
      status: 'paired_scalar_evidence',
      original,
      mirrored,
      sameLabelReflectionTotalAbsoluteError: same,
      crossLabelReflectionTotalAbsoluteError: cross,
      closerPattern:
        cross < same
          ? 'cross_label_reflection_closer'
          : same < cross
            ? 'same_label_reflection_closer'
            : 'equal',
      numericAcceptanceThresholdApplied: false,
    },
  };
}

function unavailable(
  fixture:
    typeof NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
      .fixtures[number],
) {
  return {
    fixtureRef: fixture.fixtureRef,
    fileName: fixture.fileName,
    evidenceRole: fixture.evidenceRole,
    expectedSha256: fixture.sha256,
    observedSha256: fixture.sha256,
    digestVerified: true,
    width: 640,
    height: 480,
    rawFixturePersisted: false,
    pair: {
      status: 'unavailable_pair',
      originalStatus:
        'unavailable_exactly_one_face_required',
      mirroredStatus:
        'unavailable_exactly_one_face_required',
      originalFaceCount: 0,
      mirroredFaceCount: 0,
    },
  };
}

function root(
  fixtureResults: readonly Record<string, unknown>[],
) {
  const successful = fixtureResults.filter(
    (result) =>
      (result.pair as Record<string, unknown> | undefined)
        ?.status === 'paired_scalar_evidence',
  );
  const counts = {
    same_label_reflection_closer: 0,
    cross_label_reflection_closer: 0,
    equal: 0,
  };
  for (const result of successful) {
    const pair = result.pair as Record<string, unknown>;
    counts[
      pair.closerPattern as keyof typeof counts
    ] += 1;
  }

  return {
    schemaVersion:
      'fr104-controlled-provider-multifixture-mirror-result-v1',
    authorityState:
      'multi_public_fixture_scalar_evidence_only_no_general_semantics',
    upstreamRelease:
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
        .upstreamRelease,
    runtime: {
      packageName: '@mediapipe/tasks-vision',
      packageVersion: '0.10.35',
      wasmRoot:
        NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
          .runtime.wasmRoot,
      modelAssetRef:
        NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
          .runtime.modelAssetRef,
      runtimeAssetByteDigestVerified: false,
      modelAssetByteDigestVerified: false,
    },
    transformation: {
      pairPerFixture: [
        'original',
        'horizontal_mirror',
      ],
      resizeBetweenPairMembers: false,
      cropBetweenPairMembers: false,
      rotationBetweenPairMembers: false,
      taskImageProcessingRotationDegrees: 0,
    },
    fixtureResults,
    aggregate: {
      fixtureCount: fixtureResults.length,
      successfulFixtureCount: successful.length,
      unavailableFixtureCount:
        fixtureResults.length - successful.length,
      closerPatternCounts: counts,
      aggregateMayBeCalledGeneralProviderMirrorSemantics:
        false,
      anatomicalLateralityAuthorized: false,
    },
    privacy: {
      userImageConsumed: false,
      cameraAccessed: false,
      sourceImagesPersisted: false,
      rawLandmarksReturned: false,
      rawLandmarksPersisted: false,
      embeddingProduced: false,
      identityTemplateProduced: false,
    },
    authority: {
      repeatedPatternMayBeCalledGeneralProviderMirrorSemantics:
        false,
      providerLabelMayBeCalledAnatomicalSide: false,
      anatomicalLateralityAuthorized: false,
      validatedExternalEarObservationAuthorized: false,
      traditionalBindingAuthorized: false,
      productionAuthorization: false,
    },
  };
}

describe('FR104 controlled multi-fixture mirror result intake', () => {
  it('recomputes successful fixture scalars and aggregate counts', () => {
    const fixtures =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.fixtures;
    const input = root([
      success(fixtures[0]!, 'cross'),
      success(fixtures[1]!, 'cross'),
      success(fixtures[2]!, 'same'),
      unavailable(fixtures[3]!),
    ]);

    const evidence =
      admitNeutralEarControlledMultiFixtureMirrorResultFR104(
        input,
      );

    expect(evidence.aggregate).toEqual({
      fixtureCount: 4,
      successfulFixtureCount: 3,
      unavailableFixtureCount: 1,
      closerPatternCounts: {
        same_label_reflection_closer: 1,
        cross_label_reflection_closer: 2,
        equal: 0,
      },
    });
    expect(evidence.integrity.successfulScalarErrorsRecomputed)
      .toBe(true);
    expect(evidence.integrity.aggregateRecomputed).toBe(true);
  });

  it('accepts a digest-verified no-face fixture as unavailable only', () => {
    const fixtures =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.fixtures;
    const evidence =
      admitNeutralEarControlledMultiFixtureMirrorResultFR104(
        root([
          success(fixtures[0]!),
          success(fixtures[1]!),
          success(fixtures[2]!),
          unavailable(fixtures[3]!),
        ]),
      );

    expect(evidence.unavailableFixtures).toEqual([
      {
        fixtureRef: 'pose_candidate',
        status: 'unavailable_pair',
        digestVerified: true,
        originalFaceCount: 0,
        mirroredFaceCount: 0,
      },
    ]);
  });

  it('rejects a digest mismatch rather than treating it as empirical unavailability', () => {
    const fixtures =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.fixtures;
    const broken = {
      fixtureRef: fixtures[3]!.fixtureRef,
      status: 'unavailable_fixture_digest_mismatch',
      expectedSha256: fixtures[3]!.sha256,
      observedSha256: '0'.repeat(64),
    };

    expect(() =>
      admitNeutralEarControlledMultiFixtureMirrorResultFR104(
        root([
          success(fixtures[0]!),
          success(fixtures[1]!),
          success(fixtures[2]!),
          broken,
        ]),
      ),
    ).toThrow(/digest mismatch invalidates/i);
  });

  it('rejects copied scalar errors that do not recompute', () => {
    const fixtures =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.fixtures;
    const first = success(fixtures[0]!);
    const broken = {
      ...first,
      pair: {
        ...first.pair,
        crossLabelReflectionTotalAbsoluteError: 0.123,
      },
    };

    expect(() =>
      admitNeutralEarControlledMultiFixtureMirrorResultFR104(
        root([
          broken,
          success(fixtures[1]!),
          success(fixtures[2]!),
          success(fixtures[3]!),
        ]),
      ),
    ).toThrow(/reflection errors must exactly recompute/i);
  });

  it('rejects aggregate drift instead of trusting copied counts', () => {
    const fixtures =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.fixtures;
    const base = root(fixtures.map((fixture) => success(fixture)));

    expect(() =>
      admitNeutralEarControlledMultiFixtureMirrorResultFR104({
        ...base,
        aggregate: {
          ...(base.aggregate as Record<string, unknown>),
          successfulFixtureCount: 3,
        },
      }),
    ).toThrow(/aggregate.successfulFixtureCount/i);
  });

  it('does not generalize repeated fixture patterns to anatomy or Production', () => {
    const fixtures =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.fixtures;
    const evidence =
      admitNeutralEarControlledMultiFixtureMirrorResultFR104(
        root(fixtures.map((fixture) => success(fixture))),
      );

    expect(
      evidence.interpretationBoundary
        .repeatedPatternMayBeCalledGeneralProviderMirrorSemantics,
    ).toBe(false);
    expect(
      evidence.interpretationBoundary
        .providerLabelMayBeCalledAnatomicalSide,
    ).toBe(false);
    expect(
      evidence.interpretationBoundary
        .anatomicalLateralityAuthorized,
    ).toBe(false);
    expect(
      evidence.interpretationBoundary
        .validatedExternalEarObservationAuthorized,
    ).toBe(false);
    expect(
      evidence.interpretationBoundary
        .traditionalBindingAuthorized,
    ).toBe(false);
    expect(
      evidence.interpretationBoundary
        .productionAuthorization,
    ).toBe(false);
  });
});
