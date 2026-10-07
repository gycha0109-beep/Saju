import { describe, expect, it, vi } from 'vitest';

import {
  createFaceGovernedHandoffRuntimeHostV1,
  executeFaceGovernedHandoffRuntimeV1,
  FACE_GOVERNED_HANDOFF_ENGINE_REQUEST_SCHEMA_VERSION_V1,
  type FaceGovernedHandoffRuntimeDependenciesV1,
} from '../src/face-topic/governed-handoff-runtime.js';
import {
  buildFaceGovernedInterpretationHandoffV1,
} from '../src/face-topic/governed-interpretation-handoff.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';
import {
  syntheticGovernedFaceSource,
} from './support/topic-face-governed-synthetic.js';

const BLOCKED_REQUEST = Object.freeze({
  topicKey: 'face.reading.three_divisions',
  observationArtifactRef: 'face-observation-artifact:005m-a:blocked',
  requestId: 'request:005m-a:blocked',
});

function blockedDependencies(
  events: string[] = [],
): FaceGovernedHandoffRuntimeDependenciesV1 {
  return {
    authorityProvider: {
      async loadAuthorityReceipt() {
        events.push('authority');
        return buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
      },
    },
    traditionalResultProvider: {
      async loadExecutionResultReceipt() {
        events.push('engine');
        throw new Error('blocked path must never execute engine');
      },
    },
  };
}

function syntheticDependencies(
  options: {
    engineThrows?: boolean;
    malformedReceipt?: boolean;
    captureRequest?: (value: unknown) => void;
  } = {},
): FaceGovernedHandoffRuntimeDependenciesV1 {
  const source = syntheticGovernedFaceSource();
  return {
    authorityProvider: {
      async loadAuthorityReceipt() {
        return source.authorityReceipt;
      },
    },
    traditionalResultProvider: {
      async loadExecutionResultReceipt(request) {
        options.captureRequest?.(request);
        if (options.engineThrows) {
          throw new Error('synthetic engine transport failed');
        }
        if (options.malformedReceipt) {
          return { schemaVersion: 'forged' };
        }
        return source.receipt;
      },
    },
  };
}

describe('TOPIC-FACE-005M-A governed Face handoff source runtime', () => {
  it('keeps the actual blocked Three-Divisions source fail-closed before engine execution', async () => {
    const events: string[] = [];
    const result = await executeFaceGovernedHandoffRuntimeV1(
      BLOCKED_REQUEST,
      blockedDependencies(events),
    );

    expect(events).toEqual(['authority']);
    expect(result).toEqual(
      expect.objectContaining({
        state: 'not_eligible',
        reason: 'source_blocked',
        topicKey: 'face.reading.three_divisions',
      }),
    );
    expect(result).not.toHaveProperty('handoff');
    expect(result).not.toHaveProperty('executionPlanHash');
  });

  it('never promotes a neutral topic into the governed traditional engine path', async () => {
    const events: string[] = [];
    const result = await executeFaceGovernedHandoffRuntimeV1(
      {
        topicKey: 'face.discover.structure',
        observationArtifactRef: 'face-observation-artifact:005m-a:neutral',
        requestId: 'request:005m-a:neutral',
      },
      blockedDependencies(events),
    );

    expect(events).toEqual(['authority']);
    expect(result).toEqual(
      expect.objectContaining({
        state: 'not_eligible',
        reason: 'neutral_topic',
      }),
    );
  });

  it('rejects caller attempts to inject authority, semantics, publication or Character fields before providers', async () => {
    for (const injected of [
      { authorityReceipt: {} },
      { executionPlan: {} },
      { semanticClaims: [] },
      { direction: 'favorable' },
      { lensKey: 'wealth' },
      { characterPublicationDecision: {} },
      { characterId: 'seyeon' },
      { protectedMeaningText: 'forged' },
    ] as const) {
      const authorityProvider = {
        loadAuthorityReceipt: vi.fn(async () =>
          buildRepositoryFaceAuthorityReceiptForTopicFaceTest()),
      };
      const engineProvider = {
        loadExecutionResultReceipt: vi.fn(async () => ({})),
      };
      const result = await executeFaceGovernedHandoffRuntimeV1(
        { ...BLOCKED_REQUEST, ...injected },
        {
          authorityProvider,
          traditionalResultProvider: engineProvider,
        },
      );

      expect(result).toEqual(
        expect.objectContaining({
          state: 'failed',
          stage: 'request',
          errorCode: 'FACE_GOVERNED_HANDOFF_REQUEST_SCOPE_VIOLATION',
        }),
      );
      expect(authorityProvider.loadAuthorityReceipt).not.toHaveBeenCalled();
      expect(engineProvider.loadExecutionResultReceipt).not.toHaveBeenCalled();
    }
  });

  it('emits the exact existing governed handoff for a TEST ONLY authorized source', async () => {
    const source = syntheticGovernedFaceSource();
    const expected = buildFaceGovernedInterpretationHandoffV1(source);
    if (expected.state !== 'eligible') {
      throw new Error('expected synthetic eligible handoff');
    }

    let engineRequest: unknown;
    const result = await executeFaceGovernedHandoffRuntimeV1(
      {
        topicKey: source.plan.topicKey,
        observationArtifactRef: source.plan.observationArtifactRef,
        requestId: source.plan.requestId,
      },
      syntheticDependencies({
        captureRequest(value) {
          engineRequest = value;
        },
      }),
    );

    expect(engineRequest).toEqual({
      schemaVersion: FACE_GOVERNED_HANDOFF_ENGINE_REQUEST_SCHEMA_VERSION_V1,
      requestId: source.plan.requestId,
      topicKey: source.plan.topicKey,
      observationArtifactRef: source.plan.observationArtifactRef,
      authoritySnapshotId: source.plan.authoritySnapshotId,
      executionPlanHash: source.plan.executionPlanHash,
    });

    expect(result).toEqual(
      expect.objectContaining({
        state: 'eligible',
        authoritySnapshotId: source.plan.authoritySnapshotId,
        executionPlanHash: source.plan.executionPlanHash,
        handoff: expected.handoff,
        sourceBinding: {
          sourceContractVersion: expected.handoff.sourceContractVersion,
          sourceAuthorityRef: expected.handoff.sourceAuthorityRef,
          sourceResultHash: expected.handoff.sourceResultHash,
          topicKey: expected.handoff.topicKey,
          authorizationReceiptRef: expected.handoff.authorizationReceiptRef,
        },
      }),
    );
  });

  it('keeps engine transport failure distinct from source admission failure', async () => {
    const source = syntheticGovernedFaceSource();
    const request = {
      topicKey: source.plan.topicKey,
      observationArtifactRef: source.plan.observationArtifactRef,
      requestId: source.plan.requestId,
    };

    const transport = await executeFaceGovernedHandoffRuntimeV1(
      request,
      syntheticDependencies({ engineThrows: true }),
    );
    expect(transport).toEqual(
      expect.objectContaining({
        state: 'failed',
        stage: 'engine',
        errorCode: 'FACE_GOVERNED_HANDOFF_ENGINE_PROVIDER_FAILED',
      }),
    );

    const admission = await executeFaceGovernedHandoffRuntimeV1(
      request,
      syntheticDependencies({ malformedReceipt: true }),
    );
    expect(admission).toEqual(
      expect.objectContaining({
        state: 'failed',
        stage: 'admission',
      }),
    );
  });

  it('exposes a reusable host without widening the request surface', async () => {
    const events: string[] = [];
    const host = createFaceGovernedHandoffRuntimeHostV1(
      blockedDependencies(events),
    );
    const result = await host.execute(BLOCKED_REQUEST);

    expect(result.state).toBe('not_eligible');
    expect(events).toEqual(['authority']);
    expect(Object.keys(BLOCKED_REQUEST).sort()).toEqual([
      'observationArtifactRef',
      'requestId',
      'topicKey',
    ]);
  });
});
