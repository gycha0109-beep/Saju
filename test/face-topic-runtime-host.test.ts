import {
  describe,
  expect,
  it,
} from 'vitest';
import {
  FACE_TOPIC_RUNTIME_ENGINE_REQUEST_SCHEMA_VERSION,
  createFaceTopicRuntimeHost,
  executeFaceTopicRuntime,
  type FaceTopicRuntimeDependenciesV1,
  type FaceTopicRuntimeEngineRequestV1,
} from '../src/index.js';
import {
  buildFR293ProductDisplayReceiptForTopicFaceTest,
} from './support/topic-face-fr293-display-receipt.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';

const STRUCTURE_REQUEST = Object.freeze({
  topicKey: 'face.discover.structure',
  observationArtifactRef:
    'face-observation-artifact:topic-face-004b:001',
  requestId: 'request:topic-face-004b:001',
});

function dependencies(
  options: {
    readonly events?: string[];
    readonly mutateEngineReceipt?: (
      receipt: Record<string, unknown>,
    ) => unknown;
    readonly engineThrows?: boolean;
    readonly authorityThrows?: boolean;
  } = {},
): FaceTopicRuntimeDependenciesV1 {
  return {
    authorityProvider: {
      async loadAuthorityReceipt() {
        options.events?.push('authority');
        if (options.authorityThrows) {
          throw new Error('provider unavailable');
        }
        return buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
      },
    },
    engineProvider: {
      async loadProductDisplayReceipt(
        request: FaceTopicRuntimeEngineRequestV1,
      ) {
        options.events?.push('engine');
        if (options.engineThrows) {
          throw new Error('engine unavailable');
        }
        const receipt =
          buildFR293ProductDisplayReceiptForTopicFaceTest(
            request.observationArtifactRef,
          );
        return options.mutateEngineReceipt?.(
          receipt,
        ) ?? receipt;
      },
    },
  };
}

describe(
  'TOPIC-FACE-004B non-chat runtime host',
  () => {
    it('executes AVAILABLE structure through the governed Reader path', async () => {
      const events: string[] = [];
      let engineRequest:
        | FaceTopicRuntimeEngineRequestV1
        | undefined;

      const deps =
        dependencies({ events });
      const wrapped: FaceTopicRuntimeDependenciesV1 = {
        ...deps,
        engineProvider: {
          async loadProductDisplayReceipt(request) {
            engineRequest = request;
            return deps.engineProvider
              .loadProductDisplayReceipt(request);
          },
        },
      };

      const result =
        await executeFaceTopicRuntime(
          STRUCTURE_REQUEST,
          wrapped,
        );

      expect(events).toEqual([
        'authority',
        'engine',
      ]);
      expect(result.state).toBe('ready');
      if (result.state !== 'ready') {
        throw new Error('expected ready');
      }

      expect(
        result.readerDelivery.sections.flatMap(
          (section) => section.items,
        ),
      ).toHaveLength(4);
      expect(
        result.readerDelivery.readinessState,
      ).toBe('available');
      expect(result.readerDeliveryHash).toBe(
        result.readerDelivery.readerDeliveryHash,
      );
      expect(result.projectionHash).toBe(
        result.readerDelivery.projectionHash,
      );

      expect(engineRequest).toEqual(
        expect.objectContaining({
          schemaVersion:
            FACE_TOPIC_RUNTIME_ENGINE_REQUEST_SCHEMA_VERSION,
          requestId:
            STRUCTURE_REQUEST.requestId,
          topicKey:
            STRUCTURE_REQUEST.topicKey,
          observationArtifactRef:
            STRUCTURE_REQUEST.observationArtifactRef,
          authoritySnapshotId:
            result.authoritySnapshotId,
          executionPlanHash:
            result.executionPlanHash,
        }),
      );
    });

    it('preserves PARTIAL as a product runtime state with explicit unavailable Reader content', async () => {
      const result =
        await executeFaceTopicRuntime(
          {
            ...STRUCTURE_REQUEST,
            topicKey:
              'face.discover.extended',
            requestId:
              'request:topic-face-004b:partial',
          },
          dependencies(),
        );

      expect(result.state).toBe('partial');
      if (result.state !== 'partial') {
        throw new Error('expected partial');
      }

      expect(
        result.readerDelivery.unavailableSections,
      ).toContain(
        'observation:forehead.visible_width_shape',
      );
      expect(
        result.readerDelivery.sections.find(
          (section) =>
            section.sectionKey === 'forehead',
        )?.status,
      ).toBe('unavailable');
    });

    it('short-circuits BLOCKED before the Face Engine provider is called', async () => {
      const events: string[] = [];
      const result =
        await executeFaceTopicRuntime(
          {
            ...STRUCTURE_REQUEST,
            topicKey:
              'face.reading.three_divisions',
            requestId:
              'request:topic-face-004b:blocked',
          },
          dependencies({ events }),
        );

      expect(events).toEqual(['authority']);
      expect(result.state).toBe('blocked');
      if (result.state !== 'blocked') {
        throw new Error('expected blocked');
      }
      expect(result.readiness.state).toBe(
        'blocked',
      );
      expect(
        result.readiness.blockers.length,
      ).toBeGreaterThan(0);
    });

    it('rejects caller scope widening before any provider call', async () => {
      const events: string[] = [];
      const result =
        await executeFaceTopicRuntime(
          {
            ...STRUCTURE_REQUEST,
            methodologyRefs: [
              'method.forged',
            ],
          },
          dependencies({ events }),
        );

      expect(events).toEqual([]);
      expect(result).toEqual(
        expect.objectContaining({
          state: 'failed',
          stage: 'request',
          errorCode:
            'FACE_TOPIC_RUNTIME_REQUEST_SCOPE_VIOLATION',
        }),
      );
    });

    it('keeps authority-provider failure distinct from semantic BLOCKED', async () => {
      const events: string[] = [];
      const result =
        await executeFaceTopicRuntime(
          STRUCTURE_REQUEST,
          dependencies({
            events,
            authorityThrows: true,
          }),
        );

      expect(events).toEqual(['authority']);
      expect(result).toEqual(
        expect.objectContaining({
          state: 'failed',
          stage: 'authority',
          errorCode:
            'FACE_TOPIC_RUNTIME_AUTHORITY_PROVIDER_FAILED',
        }),
      );
    });

    it('keeps engine transport failure distinct from result admission failure', async () => {
      const transport =
        await executeFaceTopicRuntime(
          STRUCTURE_REQUEST,
          dependencies({
            engineThrows: true,
          }),
        );
      expect(transport).toEqual(
        expect.objectContaining({
          state: 'failed',
          stage: 'engine',
          errorCode:
            'FACE_TOPIC_RUNTIME_ENGINE_PROVIDER_FAILED',
        }),
      );

      const admission =
        await executeFaceTopicRuntime(
          STRUCTURE_REQUEST,
          dependencies({
            mutateEngineReceipt: (
              receipt,
            ) => ({
              ...receipt,
              authorityRef:
                'face-engine.fr293.product-display-facts@forged',
            }),
          }),
        );
      expect(admission).toEqual(
        expect.objectContaining({
          state: 'failed',
          stage: 'admission',
          errorCode:
            'FACE_LIVE_FR293_AUTHORITY_IDENTITY_MISMATCH',
        }),
      );
    });

    it('rejects caller attempts to inject server-owned authority and readiness fields before providers', async () => {
      const forbiddenInputs = [
        { readinessState: 'available' },
        { requiredObservationCapabilities: ['forged'] },
        { optionalObservationCapabilities: ['forged'] },
        { methodologyRefs: ['method.forged'] },
        { semanticClaimFamilies: ['claim.forged'] },
        { bindingGroupRefs: ['binding.forged'] },
        { traditionalClaims: ['claim.forged'] },
        { prohibitedInferenceKeys: [] },
        { characterId: 'character:forged' },
        { price: 1000 },
        { entitlement: 'entitlement:forged' },
      ] as const;

      for (const injected of forbiddenInputs) {
        const events: string[] = [];
        const result =
          await executeFaceTopicRuntime(
            {
              ...STRUCTURE_REQUEST,
              ...injected,
            },
            dependencies({ events }),
          );

        expect(events).toEqual([]);
        expect(result).toEqual(
          expect.objectContaining({
            state: 'failed',
            stage: 'request',
            errorCode:
              'FACE_TOPIC_RUNTIME_REQUEST_SCOPE_VIOLATION',
          }),
        );
      }
    });

    it('fails closed on forbidden raw, biometric, Character and Commerce engine payloads', async () => {
      const forbiddenPayloads = [
        { rawImage: 'data:image/jpeg;base64,forged' },
        { rawLandmarks: [{ x: 0, y: 0 }] },
        { mediaPipeLandmarks: [{ x: 0, y: 0 }] },
        { identityTemplate: 'identity:forged' },
        { faceEmbedding: [0.1, 0.2] },
        { characterId: 'character:forged' },
        { relationshipState: 'forged' },
        { price: 1000 },
        { entitlement: 'entitlement:forged' },
      ] as const;

      for (const injected of forbiddenPayloads) {
        const result =
          await executeFaceTopicRuntime(
            STRUCTURE_REQUEST,
            dependencies({
              mutateEngineReceipt: (receipt) => ({
                ...receipt,
                ...injected,
              }),
            }),
          );

        expect(result).toEqual(
          expect.objectContaining({
            state: 'failed',
            stage: 'admission',
            errorCode:
              'FACE_LIVE_FR293_FORBIDDEN_PAYLOAD',
          }),
        );
      }
    });

    it('fails closed when engine payloads try to add semantic claims or weaken prohibited inference policy', async () => {
      for (const injected of [
        {
          semanticClaims: [
            { claimFamily: 'face.claim.forged' },
          ],
        },
        {
          prohibitedInferences: [],
        },
      ]) {
        const result =
          await executeFaceTopicRuntime(
            STRUCTURE_REQUEST,
            dependencies({
              mutateEngineReceipt: (receipt) => ({
                ...receipt,
                ...injected,
              }),
            }),
          );

        expect(result).toEqual(
          expect.objectContaining({
            state: 'failed',
            stage: 'admission',
            errorCode:
              'FACE_LIVE_FR293_RECEIPT_SCOPE_VIOLATION',
          }),
        );
      }
    });

    it('exposes a reusable host without adding Character or Commerce inputs', async () => {
      const host =
        createFaceTopicRuntimeHost(
          dependencies(),
        );
      const result =
        await host.execute(
          STRUCTURE_REQUEST,
        );

      expect(result.state).toBe('ready');
      expect(
        Object.keys(STRUCTURE_REQUEST).sort(),
      ).toEqual([
        'observationArtifactRef',
        'requestId',
        'topicKey',
      ]);
    });
  },
);
