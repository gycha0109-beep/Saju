import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  assessProductionNeutralObservationPublicationFR61,
  runProductionNeutralObservationProviderFR61,
  sanitizeMediaPipeProviderObservationFR61,
} from './production-neutral-observation-provider-fr61.js';

const DIGEST = `sha256:${'a'.repeat(64)}`;

function request(image: unknown = Object.freeze({ image: true })) {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr61:test-run',
    canonicalAssetDigest: DIGEST,
    image,
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [[
      { x: 0.2, y: 0.3, z: -0.01, visibility: 0.9 },
      { x: 0.4, y: 0.5, z: 0.02 },
    ]],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
}

function factoryFor(
  result: MediaPipeFaceLandmarkerResultFR25V1,
  onClose: () => void = () => undefined,
): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      return {
        detect() {
          return result;
        },
        close() {
          onClose();
        },
      };
    },
  };
}

describe('FR61 production-neutral observation provider candidate', () => {
  it('sanitizes full provider landmark order to normalized 2D and discards depth/visibility', async () => {
    const raw = validResult();
    const rawSnapshot = JSON.stringify(raw);
    let closeCount = 0;

    const run = await runProductionNeutralObservationProviderFR61(
      request(),
      factoryFor(raw, () => {
        closeCount += 1;
      }),
    );

    expect(run.authorityState).toBe('provider_observation_candidate_only');
    expect(run.frame.providerOrderedPoints).toEqual([
      { x: 0.2, y: 0.3 },
      { x: 0.4, y: 0.5 },
    ]);
    expect(Object.keys(run.frame.providerOrderedPoints[0] ?? {})).toEqual(['x', 'y']);
    expect(run.frame.providerOrderingAuthority).toBe(
      'internal_provider_order_only_not_fr15_output',
    );
    expect(run.frame.validatedThenDiscardedProviderFields).toEqual([
      'faceLandmarks[].z',
      'faceLandmarks[].visibility',
    ]);
    expect(run.frame.rawProviderResponsePersisted).toBe(false);
    expect(run.frame.providerDepthPersisted).toBe(false);
    expect(run.productionNeutralObservationIssued).toBe(false);
    expect(run.anatomicalLateralityResolved).toBe(false);
    expect(run.traditionalSemanticAuthority).toBe(false);
    expect(closeCount).toBe(1);
    expect(JSON.stringify(raw)).toBe(rawSnapshot);
  });

  it('keeps publication and provider activation fail-closed under current FR14/FR22/FR26 authority', () => {
    const gate = assessProductionNeutralObservationPublicationFR61();

    expect(gate.providerObservationCandidateReady).toBe(true);
    expect(gate.fr26RuntimeExecutionReady).toBe(true);
    expect(gate.fr14BindingReady).toBe(false);
    expect(gate.fr22ActivationReady).toBe(false);
    expect(gate.productionNeutralObservationAllowed).toBe(false);
    expect(gate.providerActivationAllowed).toBe(false);
    expect(gate.blockers.some((entry) => entry.startsWith('FR-14:'))).toBe(true);
    expect(gate.blockers.some((entry) => entry.startsWith('FR-22:'))).toBe(true);
    expect(gate.blockers.some((entry) => entry.startsWith('FR-26:'))).toBe(true);
  });

  it('does not expose FR15 observations, morphology, claims, or narrative fields', async () => {
    const run = await runProductionNeutralObservationProviderFR61(
      request(),
      factoryFor(validResult()),
    );
    const serialized = JSON.stringify(run);

    expect(serialized).not.toContain('"observations"');
    expect(serialized).not.toContain('"morphology"');
    expect(serialized).not.toContain('"claims"');
    expect(serialized).not.toContain('"narrative"');
    expect(serialized).not.toContain('"consumerSlot"');
    expect(serialized).not.toContain('"anchorRef"');
  });

  it.each([
    ['zero faces', { ...validResult(), faceLandmarks: [] }],
    [
      'multiple faces',
      {
        ...validResult(),
        faceLandmarks: [validResult().faceLandmarks[0]!, validResult().faceLandmarks[0]!],
      },
    ],
    [
      'out-of-range x',
      {
        ...validResult(),
        faceLandmarks: [[{ x: 1.01, y: 0.2, z: 0 }]],
      },
    ],
    [
      'non-finite y',
      {
        ...validResult(),
        faceLandmarks: [[{ x: 0.2, y: Number.NaN, z: 0 }]],
      },
    ],
    [
      'non-finite z',
      {
        ...validResult(),
        faceLandmarks: [[{ x: 0.2, y: 0.3, z: Number.POSITIVE_INFINITY }]],
      },
    ],
    [
      'non-finite visibility',
      {
        ...validResult(),
        faceLandmarks: [[{ x: 0.2, y: 0.3, z: 0, visibility: Number.NaN }]],
      },
    ],
  ] as const)('rejects invalid provider result: %s', (_label, raw) => {
    expect(() =>
      sanitizeMediaPipeProviderObservationFR61(raw, {
        providerRunRef: 'fr61:test-run',
        canonicalAssetDigest: DIGEST,
      }),
    ).toThrow();
  });

  it('rejects unexpected provider fields rather than widening the observation contract', () => {
    const raw = {
      ...validResult(),
      faceLandmarks: [[{ x: 0.2, y: 0.3, z: 0, score: 0.99 }]],
    } as unknown as MediaPipeFaceLandmarkerResultFR25V1;

    expect(() =>
      sanitizeMediaPipeProviderObservationFR61(raw, {
        providerRunRef: 'fr61:test-run',
        canonicalAssetDigest: DIGEST,
      }),
    ).toThrow(/unauthorized field/);
  });

  it('closes the runtime when sanitization fails', async () => {
    let closeCount = 0;
    const invalid = {
      ...validResult(),
      faceLandmarks: [],
    };

    await expect(
      runProductionNeutralObservationProviderFR61(
        request(),
        factoryFor(invalid, () => {
          closeCount += 1;
        }),
      ),
    ).rejects.toThrow(/exactly one detected face/);
    expect(closeCount).toBe(1);
  });

  it('rejects invalid request provenance before creating a runtime', async () => {
    let createCount = 0;
    const factory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 = {
      async create() {
        createCount += 1;
        return {
          detect() {
            return validResult();
          },
          close() {},
        };
      },
    };

    await expect(
      runProductionNeutralObservationProviderFR61(
        {
          ...request(),
          canonicalAssetDigest: 'sha256:bad',
        },
        factory,
      ),
    ).rejects.toThrow(/canonicalAssetDigest/);
    expect(createCount).toBe(0);
  });
});
