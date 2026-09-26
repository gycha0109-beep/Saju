import {
  describe,
  expect,
  it,
} from 'vitest';
import {
  createFaceProductApi,
  createFaceTopicRuntimeHost,
  type FaceHistoryEntryV1,
  type FaceProductAnalysisRequestV1,
  type FaceProductHistoryStoreV1,
  type FaceResultSnapshotV1,
} from '../src/index.js';
import {
  buildFR293ProductDisplayReceiptForTopicFaceTest,
} from './support/topic-face-fr293-display-receipt.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';

class MemoryHistoryStore
  implements FaceProductHistoryStoreV1
{
  readonly snapshots =
    new Map<string, FaceResultSnapshotV1>();
  readonly entries =
    new Map<string, FaceHistoryEntryV1>();

  async save(
    snapshot: FaceResultSnapshotV1,
    entry: FaceHistoryEntryV1,
  ): Promise<void> {
    this.snapshots.set(
      snapshot.resultRef,
      snapshot,
    );
    this.entries.set(
      entry.resultRef,
      entry,
    );
  }

  async list(): Promise<
    readonly FaceHistoryEntryV1[]
  > {
    return [...this.entries.values()];
  }

  async load(
    resultRef: string,
  ): Promise<
    FaceResultSnapshotV1 | undefined
  > {
    return this.snapshots.get(resultRef);
  }
}

function collectKeys(
  value: unknown,
  keys = new Set<string>(),
): ReadonlySet<string> {
  if (Array.isArray(value)) {
    for (const child of value) {
      collectKeys(child, keys);
    }
    return keys;
  }
  if (
    value === null ||
    typeof value !== 'object'
  ) {
    return keys;
  }
  for (const [key, child] of Object.entries(
    value,
  )) {
    keys.add(
      key
        .toLowerCase()
        .replace(/[^a-z0-9]/gu, ''),
    );
    collectKeys(child, keys);
  }
  return keys;
}

function harness() {
  const historyStore =
    new MemoryHistoryStore();
  let engineCalls = 0;
  let failEngine = false;

  const authorityProvider = {
    async loadAuthorityReceipt() {
      return buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
    },
  };
  const runtimeHost =
    createFaceTopicRuntimeHost({
      authorityProvider,
      engineProvider: {
        async loadProductDisplayReceipt(
          request,
        ) {
          engineCalls += 1;
          if (failEngine) {
            throw new Error(
              'simulated transport failure',
            );
          }
          return buildFR293ProductDisplayReceiptForTopicFaceTest(
            request.observationArtifactRef,
          );
        },
      },
    });
  const api = createFaceProductApi({
    runtimeHost,
    authorityProvider,
    historyStore,
    now: () =>
      '2026-09-26T01:00:00.000Z',
  });

  return {
    api,
    historyStore,
    engineCalls: () => engineCalls,
    failEngine: () => {
      failEngine = true;
    },
  };
}

describe(
  'TOPIC-FACE-004D Product API / UI handoff',
  () => {
    it('projects Product-safe catalog states without internal blocker details', async () => {
      const { api } = harness();
      const catalog =
        await api.getCatalog();

      expect(catalog.items).toEqual([
        expect.objectContaining({
          topicKey:
            'face.discover.structure',
          availability: 'available',
          captureEnabled: true,
          executionEnabled: true,
          unavailableSectionKeys: [],
        }),
        expect.objectContaining({
          topicKey:
            'face.discover.extended',
          availability: 'partial',
          captureEnabled: true,
          executionEnabled: true,
          unavailableSectionKeys: [
            'forehead',
          ],
        }),
        expect.objectContaining({
          topicKey:
            'face.reading.three_divisions',
          availability: 'coming_soon',
          captureEnabled: false,
          executionEnabled: false,
          unavailableSectionKeys: [],
        }),
      ]);

      const serialized =
        JSON.stringify(catalog);
      expect(serialized).not.toContain(
        'admittedBindingCount',
      );
      expect(serialized).not.toContain(
        'minimumAdmittedBindings',
      );
      expect(serialized).not.toContain(
        'face-bridge.frb005',
      );
    });

    it('hands off capture intent without accepting or storing a photo payload', async () => {
      const { api } = harness();

      await expect(
        api.requestCapture(
          'face.discover.structure',
        ),
      ).resolves.toEqual({
        schemaVersion:
          'face-product-capture-request-v1',
        topicKey:
          'face.discover.structure',
        state: 'capture_ready',
        inputKind: 'rgb_selfie',
        subjectPolicy: 'single_face_only',
        nextAction: 'capture_selfie',
      });

      await expect(
        api.requestCapture(
          'face.reading.three_divisions',
        ),
      ).resolves.toEqual({
        schemaVersion:
          'face-product-capture-request-v1',
        topicKey:
          'face.reading.three_divisions',
        state: 'unavailable',
        inputKind: 'rgb_selfie',
        subjectPolicy: 'single_face_only',
        nextAction: 'none',
      });
    });

    it('returns a four-section Reader DTO and persists the immutable snapshot for structure', async () => {
      const {
        api,
        historyStore,
        engineCalls,
      } = harness();
      const response =
        await api.analyze({
          topicKey:
            'face.discover.structure',
          observationArtifactRef:
            'face-observation-artifact:topic-face-004d:structure',
          requestId:
            'request:topic-face-004d:structure',
        });

      expect(response.state).toBe('ready');
      if (response.state !== 'ready') {
        throw new Error(
          'expected ready response',
        );
      }
      expect(
        response.result.sections.map(
          (section) => section.sectionKey,
        ),
      ).toEqual([
        'eye',
        'nose',
        'mouth',
        'chin_lower_face',
      ]);
      expect(
        response.result.sections.every(
          (section) =>
            section.status === 'available' &&
            section.items.length === 1,
        ),
      ).toBe(true);
      expect(engineCalls()).toBe(1);
      expect(
        historyStore.snapshots.has(
          response.result.resultRef,
        ),
      ).toBe(true);
    });

    it('keeps the extended forehead gap explicit and Product-safe', async () => {
      const { api } = harness();
      const response =
        await api.analyze({
          topicKey:
            'face.discover.extended',
          observationArtifactRef:
            'face-observation-artifact:topic-face-004d:extended',
          requestId:
            'request:topic-face-004d:extended',
        });

      expect(response.state).toBe(
        'partial',
      );
      if (response.state !== 'partial') {
        throw new Error(
          'expected partial response',
        );
      }
      expect(
        response.result
          .unavailableSectionKeys,
      ).toEqual(['forehead']);
      expect(
        response.result.sections.find(
          (section) =>
            section.sectionKey ===
            'forehead',
        ),
      ).toEqual(
        expect.objectContaining({
          status: 'unavailable',
          items: [],
        }),
      );
    });

    it('keeps blocked topics pre-engine and hides authority blocker jargon', async () => {
      const {
        api,
        engineCalls,
      } = harness();
      const response =
        await api.analyze({
          topicKey:
            'face.reading.three_divisions',
          observationArtifactRef:
            'face-observation-artifact:topic-face-004d:blocked',
          requestId:
            'request:topic-face-004d:blocked',
        });

      expect(response).toEqual({
        schemaVersion:
          'face-product-analysis-response-v1',
        state: 'blocked',
        topicKey:
          'face.reading.three_divisions',
        availability: 'coming_soon',
        captureEnabled: false,
        executionEnabled: false,
      });
      expect(engineCalls()).toBe(0);
      expect(
        JSON.stringify(response),
      ).not.toContain('FRB005');
    });

    it('projects execution failures as a generic failed Product state', async () => {
      const {
        api,
        failEngine,
      } = harness();
      failEngine();

      const response =
        await api.analyze({
          topicKey:
            'face.discover.structure',
          observationArtifactRef:
            'face-observation-artifact:topic-face-004d:failed',
          requestId:
            'request:topic-face-004d:failed',
        });

      expect(response).toEqual({
        schemaVersion:
          'face-product-analysis-response-v1',
        state: 'failed',
        topicKey:
          'face.discover.structure',
        failureCode:
          'analysis_failed',
      });
    });

    it('rejects caller attempts to widen the Product analysis request before runtime execution', async () => {
      const {
        api,
        engineCalls,
      } = harness();
      const widened = {
        topicKey:
          'face.discover.structure',
        observationArtifactRef:
          'face-observation-artifact:topic-face-004d:widened',
        requestId:
          'request:topic-face-004d:widened',
        characterId: 'forbidden',
        price: 1000,
        entitlement: true,
        rawImage: 'forbidden',
      } as unknown as FaceProductAnalysisRequestV1;

      await expect(
        api.analyze(widened),
      ).rejects.toThrow(
        'FACE_PRODUCT_ANALYSIS_REQUEST_SCOPE_VIOLATION',
      );
      expect(engineCalls()).toBe(0);
    });

    it('reopens history from the stored immutable Reader snapshot without re-running Face Engine', async () => {
      const {
        api,
        engineCalls,
      } = harness();
      const response =
        await api.analyze({
          topicKey:
            'face.discover.extended',
          observationArtifactRef:
            'face-observation-artifact:topic-face-004d:history',
          requestId:
            'request:topic-face-004d:history',
        });
      if (response.state !== 'partial') {
        throw new Error(
          'expected partial response',
        );
      }
      expect(engineCalls()).toBe(1);

      const list =
        await api.listHistory();
      const detail =
        await api.getHistoryDetail(
          response.result.resultRef,
        );

      expect(list.items).toEqual([
        expect.objectContaining({
          resultRef:
            response.result.resultRef,
          unavailableSectionKeys: [
            'forehead',
          ],
        }),
      ]);
      expect(detail?.result).toEqual(
        response.result,
      );
      expect(engineCalls()).toBe(1);
    });

    it('keeps requestId-only transport changes out of Product result identity', async () => {
      const { api } = harness();
      const first =
        await api.analyze({
          topicKey:
            'face.discover.structure',
          observationArtifactRef:
            'face-observation-artifact:topic-face-004d:stable',
          requestId:
            'request:topic-face-004d:a',
        });
      const second =
        await api.analyze({
          topicKey:
            'face.discover.structure',
          observationArtifactRef:
            'face-observation-artifact:topic-face-004d:stable',
          requestId:
            'request:topic-face-004d:b',
        });

      if (
        first.state !== 'ready' ||
        second.state !== 'ready'
      ) {
        throw new Error(
          'expected ready responses',
        );
      }
      expect(first.result.resultRef).toBe(
        second.result.resultRef,
      );
    });

    it('does not expose raw face, Character, Commerce, or authority-internal fields in consumer DTOs', async () => {
      const { api } = harness();
      const catalog =
        await api.getCatalog();
      const response =
        await api.analyze({
          topicKey:
            'face.discover.structure',
          observationArtifactRef:
            'face-observation-artifact:topic-face-004d:safe',
          requestId:
            'request:topic-face-004d:safe',
        });
      const history =
        await api.listHistory();
      const keys = collectKeys({
        catalog,
        response,
        history,
      });

      for (const forbidden of [
        'rawimage',
        'rawphoto',
        'rawjpeg',
        'rawlandmark',
        'landmarkindex',
        'mediapipe',
        'faceembedding',
        'identitytemplate',
        'characterid',
        'relationshipstate',
        'price',
        'offer',
        'entitlement',
        'payment',
        'blockers',
        'admittedbindingcount',
        'minimumadmittedbindings',
        'authoritysnapshotid',
        'executionplanhash',
        'sourceresulthash',
        'projectionhash',
        'groundinghash',
        'displayfactshash',
        'readerdeliveryhash',
      ]) {
        expect(
          [...keys].some((key) =>
            key.includes(forbidden),
          ),
        ).toBe(false);
      }
    });
  },
);
