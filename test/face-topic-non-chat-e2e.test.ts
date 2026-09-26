import {
  describe,
  expect,
  it,
} from 'vitest';
import type {
  FaceProductAnalysisRequestV1,
  FaceResultSnapshotV1,
} from '../src/index.js';
import {
  collectNormalizedKeys,
  createTopicFaceE2EHarness,
  e2eObservationRef,
  receiptFacts,
  updateCoverageFromFacts,
  type TopicFaceE2EReceipt,
} from './support/topic-face-e2e-harness.js';

const STRUCTURE_TOPIC =
  'face.discover.structure';
const EXTENDED_TOPIC =
  'face.discover.extended';
const THREE_DIVISIONS_TOPIC =
  'face.reading.three_divisions';

const STRUCTURE_ARTIFACT =
  'face-observation-artifact:topic-face-004e:structure';

const PROTECTED_HASH_KEYS = [
  'executionPlanHash',
  'sourceResultHash',
  'projectionHash',
  'groundingHash',
  'displayFactsHash',
  'readerDeliveryHash',
] as const;

function request(
  topicKey: string,
  observationArtifactRef: string,
  requestId: string,
): FaceProductAnalysisRequestV1 {
  return Object.freeze({
    topicKey,
    observationArtifactRef,
    requestId,
  });
}

function factByFeature(
  receipt: TopicFaceE2EReceipt,
  featureKey: string,
): Record<string, unknown> {
  const fact = receiptFacts(receipt).find(
    (candidate) =>
      candidate.featureKey === featureKey,
  );
  if (fact === undefined) {
    throw new Error(
      `TOPIC_FACE_004E_FACT_NOT_FOUND:${featureKey}`,
    );
  }
  return fact;
}

function totalReaderItems(
  result: {
    readonly sections: readonly {
      readonly items: readonly unknown[];
    }[];
  },
): number {
  return result.sections.reduce(
    (sum, section) =>
      sum + section.items.length,
    0,
  );
}

function expectFailedProductState(
  value: unknown,
): void {
  expect(value).toEqual(
    expect.objectContaining({
      state: 'failed',
      failureCode: 'analysis_failed',
    }),
  );
}

function expectProtectedHashesEqual(
  left: FaceResultSnapshotV1,
  right: FaceResultSnapshotV1,
): void {
  for (const key of PROTECTED_HASH_KEYS) {
    expect(left[key]).toBe(right[key]);
  }
  expect(left.resultRef).toBe(
    right.resultRef,
  );
  expect(left.snapshotHash).toBe(
    right.snapshotHash,
  );
}

describe(
  'TOPIC-FACE-004E non-chat Face Discover vertical slice',
  () => {
    it('1. closes the normal structure path with exactly four Reader items', async () => {
      const harness =
        createTopicFaceE2EHarness();

      const catalog =
        await harness.api.getCatalog();
      expect(
        catalog.items.find(
          (item) =>
            item.topicKey ===
            STRUCTURE_TOPIC,
        ),
      ).toEqual(
        expect.objectContaining({
          availability: 'available',
          captureEnabled: true,
          executionEnabled: true,
        }),
      );

      await expect(
        harness.api.requestCapture(
          STRUCTURE_TOPIC,
        ),
      ).resolves.toEqual(
        expect.objectContaining({
          state: 'capture_ready',
          inputKind: 'rgb_selfie',
          subjectPolicy:
            'single_face_only',
          nextAction: 'capture_selfie',
        }),
      );

      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:structure',
          ),
        );

      expect(response.state).toBe('ready');
      if (response.state !== 'ready') {
        throw new Error(
          'TOPIC_FACE_004E_EXPECTED_READY',
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
        totalReaderItems(response.result),
      ).toBe(4);
      expect(harness.engineCalls()).toBe(1);
      expect(
        harness.historyStore.savedSnapshots,
      ).toHaveLength(1);
    });

    it('2. admits only four topic-authorized observations from the 29-feature FR293 superset', async () => {
      const harness =
        createTopicFaceE2EHarness();

      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:superset',
          ),
        );

      expect(response.state).toBe('ready');
      if (response.state !== 'ready') {
        throw new Error(
          'TOPIC_FACE_004E_EXPECTED_READY',
        );
      }

      const [receipt] =
        harness.engineReceipts();
      expect(receipt).toBeDefined();
      expect(
        receiptFacts(
          receipt as TopicFaceE2EReceipt,
        ),
      ).toHaveLength(29);

      const itemKeys =
        response.result.sections.flatMap(
          (section) =>
            section.items.map(
              (item) => item.itemKey,
            ),
        );

      expect(itemKeys.sort()).toEqual(
        [
          'eye.width_height_ratio',
          'nose.alar_width_and_nostril_geometry',
          'mouth.width_and_relative_size',
          'chin_lower_face.visible_width_ratio',
        ].sort(),
      );
      expect(itemKeys).toHaveLength(4);
    });

    it('3. keeps extended PARTIAL with forehead explicitly unavailable', async () => {
      const harness =
        createTopicFaceE2EHarness();

      const response =
        await harness.api.analyze(
          request(
            EXTENDED_TOPIC,
            'face-observation-artifact:topic-face-004e:extended',
            'request:topic-face-004e:extended',
          ),
        );

      expect(response.state).toBe(
        'partial',
      );
      if (response.state !== 'partial') {
        throw new Error(
          'TOPIC_FACE_004E_EXPECTED_PARTIAL',
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

    it('4. blocks Three-Divisions before engine execution', async () => {
      const harness =
        createTopicFaceE2EHarness();

      const capture =
        await harness.api.requestCapture(
          THREE_DIVISIONS_TOPIC,
        );
      expect(capture).toEqual(
        expect.objectContaining({
          state: 'unavailable',
          nextAction: 'none',
        }),
      );

      const response =
        await harness.api.analyze(
          request(
            THREE_DIVISIONS_TOPIC,
            'face-observation-artifact:topic-face-004e:blocked',
            'request:topic-face-004e:blocked',
          ),
        );

      expect(response).toEqual({
        schemaVersion:
          'face-product-analysis-response-v1',
        state: 'blocked',
        topicKey:
          THREE_DIVISIONS_TOPIC,
        availability: 'coming_soon',
        captureEnabled: false,
        executionEnabled: false,
      });
      expect(harness.engineCalls()).toBe(0);
      expect(
        harness.historyStore.savedSnapshots,
      ).toHaveLength(0);
    });

    it('5. rejects a missing required observation', async () => {
      const harness =
        createTopicFaceE2EHarness({
          mutateReceipt(receipt) {
            const fact = factByFeature(
              receipt,
              'eye.width_height_ratio',
            );
            fact.featureKey =
              'eye.synthetic_extra';
            fact.observationRef =
              e2eObservationRef(
                String(
                  receipt.observationArtifactRef,
                ),
                'eye.synthetic_extra',
              );
            return receipt;
          },
        });

      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:missing-required',
          ),
        );

      expectFailedProductState(response);
      expect(harness.engineCalls()).toBe(1);
      expect(
        harness.historyStore.savedSnapshots,
      ).toHaveLength(0);
    });

    it('6. rejects an unavailable required observation', async () => {
      const harness =
        createTopicFaceE2EHarness({
          mutateReceipt(receipt) {
            const fact = factByFeature(
              receipt,
              'eye.width_height_ratio',
            );
            delete fact.value;
            fact.status = 'unavailable';
            fact.reason =
              'source_feature_unavailable';
            fact.sourceReason =
              'e2e_required_unavailable';
            fact.fallbackInvented = false;
            updateCoverageFromFacts(receipt);
            return receipt;
          },
        });

      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:unavailable-required',
          ),
        );

      expectFailedProductState(response);
      expect(
        harness.historyStore.savedSnapshots,
      ).toHaveLength(0);
    });

    it('7. rejects an observationArtifactRef mismatch', async () => {
      const harness =
        createTopicFaceE2EHarness({
          mutateReceipt(receipt) {
            const forgedArtifact =
              'face-observation-artifact:topic-face-004e:forged';
            receipt.observationArtifactRef =
              forgedArtifact;
            for (const fact of receiptFacts(
              receipt,
            )) {
              fact.observationRef =
                e2eObservationRef(
                  forgedArtifact,
                  String(fact.featureKey),
                );
            }
            return receipt;
          },
        });

      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:artifact-mismatch',
          ),
        );

      expectFailedProductState(response);
    });

    it('8. rejects an observationRef mismatch', async () => {
      const harness =
        createTopicFaceE2EHarness({
          mutateReceipt(receipt) {
            factByFeature(
              receipt,
              'eye.width_height_ratio',
            ).observationRef =
              'face-neutral-observation:v1:forged';
            return receipt;
          },
        });

      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:observation-ref-mismatch',
          ),
        );

      expectFailedProductState(response);
    });

    it('9. rejects Face Engine authority and source-contract drift', async () => {
      for (const mutateReceipt of [
        (receipt: TopicFaceE2EReceipt) => {
          receipt.authorityRef =
            'face-engine.forged@1';
          return receipt;
        },
        (receipt: TopicFaceE2EReceipt) => {
          receipt.sourceContractVersion =
            'FORGED-FR293-CONTRACT';
          return receipt;
        },
      ]) {
        const harness =
          createTopicFaceE2EHarness({
            mutateReceipt,
          });

        const response =
          await harness.api.analyze(
            request(
              STRUCTURE_TOPIC,
              STRUCTURE_ARTIFACT,
              'request:topic-face-004e:authority-drift',
            ),
          );

        expectFailedProductState(response);
        expect(
          harness.historyStore
            .savedSnapshots,
        ).toHaveLength(0);
      }
    });

    it('10. rejects raw landmark injection', async () => {
      const harness =
        createTopicFaceE2EHarness({
          mutateReceipt(receipt) {
            receipt.rawLandmarks = [
              [0.1, 0.2, 0.3],
            ];
            return receipt;
          },
        });

      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:raw-landmark',
          ),
        );

      expectFailedProductState(response);
    });

    it('11. rejects raw image payload injection', async () => {
      const harness =
        createTopicFaceE2EHarness({
          mutateReceipt(receipt) {
            receipt.rawImage =
              'data:image/jpeg;base64,forbidden';
            return receipt;
          },
        });

      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:raw-image',
          ),
        );

      expectFailedProductState(response);
    });

    it('12. rejects semantic claim injection into a neutral topic', async () => {
      const harness =
        createTopicFaceE2EHarness({
          mutateReceipt(receipt) {
            receipt.semanticClaims = [
              {
                claimRef:
                  'face-claim:forged',
                inferenceKeys: [
                  'objective_personality_diagnosis',
                ],
              },
            ];
            return receipt;
          },
        });

      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:semantic-claim',
          ),
        );

      expectFailedProductState(response);
    });

    it('13. rejects Character metadata before runtime execution', async () => {
      const harness =
        createTopicFaceE2EHarness();
      const widened = {
        ...request(
          STRUCTURE_TOPIC,
          STRUCTURE_ARTIFACT,
          'request:topic-face-004e:character',
        ),
        characterId:
          'character:forbidden',
        relationshipState:
          'forbidden',
      } as unknown as FaceProductAnalysisRequestV1;

      await expect(
        harness.api.analyze(widened),
      ).rejects.toThrow(
        'FACE_PRODUCT_ANALYSIS_REQUEST_SCOPE_VIOLATION',
      );
      expect(harness.engineCalls()).toBe(0);
    });

    it('14. rejects price, offer, and entitlement widening before runtime execution', async () => {
      const harness =
        createTopicFaceE2EHarness();
      const widened = {
        ...request(
          STRUCTURE_TOPIC,
          STRUCTURE_ARTIFACT,
          'request:topic-face-004e:commerce',
        ),
        price: 9900,
        offer: 'forbidden',
        entitlement: true,
      } as unknown as FaceProductAnalysisRequestV1;

      await expect(
        harness.api.analyze(widened),
      ).rejects.toThrow(
        'FACE_PRODUCT_ANALYSIS_REQUEST_SCOPE_VIOLATION',
      );
      expect(harness.engineCalls()).toBe(0);
    });

    it('15. keeps every protected semantic hash stable for identical semantic input', async () => {
      const harness =
        createTopicFaceE2EHarness();

      for (const run of ['a', 'b']) {
        const response =
          await harness.api.analyze(
            request(
              STRUCTURE_TOPIC,
              STRUCTURE_ARTIFACT,
              'request:topic-face-004e:stable',
            ),
          );
        expect(response.state).toBe(
          'ready',
        );
        expect(run).toMatch(/^[ab]$/u);
      }

      const [first, second] =
        harness.historyStore
          .savedSnapshots;
      expect(first).toBeDefined();
      expect(second).toBeDefined();
      expectProtectedHashesEqual(
        first as FaceResultSnapshotV1,
        second as FaceResultSnapshotV1,
      );
    });

    it('16. keeps requestId-only differences out of protected semantic identity', async () => {
      const harness =
        createTopicFaceE2EHarness();

      const firstResponse =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:req-a',
          ),
        );
      const secondResponse =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:req-b',
          ),
        );

      expect(firstResponse.state).toBe(
        'ready',
      );
      expect(secondResponse.state).toBe(
        'ready',
      );

      const [first, second] =
        harness.historyStore
          .savedSnapshots;
      expectProtectedHashesEqual(
        first as FaceResultSnapshotV1,
        second as FaceResultSnapshotV1,
      );

      const engineRequests =
        harness.engineRequests();
      expect(
        engineRequests[0]?.requestId,
      ).not.toBe(
        engineRequests[1]?.requestId,
      );
    });

    it('17. reloads the persisted immutable Reader result without engine re-execution', async () => {
      const harness =
        createTopicFaceE2EHarness();
      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:history',
          ),
        );

      expect(response.state).toBe('ready');
      if (response.state !== 'ready') {
        throw new Error(
          'TOPIC_FACE_004E_EXPECTED_READY',
        );
      }
      expect(harness.engineCalls()).toBe(1);

      const history =
        await harness.api.listHistory();
      const detail =
        await harness.api.getHistoryDetail(
          response.result.resultRef,
        );

      expect(history.items).toEqual([
        expect.objectContaining({
          resultRef:
            response.result.resultRef,
        }),
      ]);
      expect(detail?.result).toEqual(
        response.result,
      );
      expect(harness.engineCalls()).toBe(1);
    });

    it('18. persists no original photo, raw landmarks, embedding, Character, or Commerce payload', async () => {
      const harness =
        createTopicFaceE2EHarness();
      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:privacy',
          ),
        );
      expect(response.state).toBe('ready');

      const snapshot =
        harness.historyStore
          .savedSnapshots[0];
      const entry =
        (
          await harness.historyStore.list()
        )[0];
      const keys = collectNormalizedKeys({
        snapshot,
        entry,
      });

      for (const forbidden of [
        'rawimage',
        'rawphoto',
        'rawjpeg',
        'rawlandmark',
        'landmarkindex',
        'mediapipe',
        'posematrix',
        'faceembedding',
        'identitytemplate',
        'highresolutioncrop',
        'hirescrop',
        'characterid',
        'relationshipstate',
        'price',
        'offer',
        'entitlement',
        'payment',
      ]) {
        expect(
          [...keys].some((key) =>
            key.includes(forbidden),
          ),
        ).toBe(false);
      }

      expect(
        JSON.stringify({
          snapshot,
          entry,
        }),
      ).not.toContain(
        'data:image/jpeg;base64',
      );
    });

    it('19. rejects a tampered persisted snapshot on history reopen', async () => {
      const harness =
        createTopicFaceE2EHarness();
      const response =
        await harness.api.analyze(
          request(
            STRUCTURE_TOPIC,
            STRUCTURE_ARTIFACT,
            'request:topic-face-004e:tamper',
          ),
        );
      if (response.state !== 'ready') {
        throw new Error(
          'TOPIC_FACE_004E_EXPECTED_READY',
        );
      }

      const original =
        harness.historyStore.snapshots.get(
          response.result.resultRef,
        );
      expect(original).toBeDefined();

      const tampered = {
        ...(original as FaceResultSnapshotV1),
        prohibitedInferences: [
          ...(original as FaceResultSnapshotV1)
            .prohibitedInferences,
          'forged_inference',
        ],
      } as FaceResultSnapshotV1;

      harness.historyStore.replaceSnapshot(
        response.result.resultRef,
        tampered,
      );

      await expect(
        harness.api.getHistoryDetail(
          response.result.resultRef,
        ),
      ).rejects.toThrow(
        'FACE_RESULT_SNAPSHOT_HASH_MISMATCH',
      );
      expect(harness.engineCalls()).toBe(1);
    });
  },
);
