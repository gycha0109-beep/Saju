import {
  describe,
  expect,
  it,
} from 'vitest';
import {
  assertFaceResultSnapshot,
  buildFaceHistoryEntry,
  buildFaceResultSnapshot,
  executeFaceTopicRuntime,
  type FaceResultSnapshotV1,
  type FaceTopicRuntimeResultV1,
} from '../src/index.js';
import {
  buildFR293ProductDisplayReceiptForTopicFaceTest,
} from './support/topic-face-fr293-display-receipt.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';

async function runtimeResult(
  topicKey:
    | 'face.discover.structure'
    | 'face.discover.extended'
    | 'face.reading.three_divisions',
): Promise<FaceTopicRuntimeResultV1> {
  return executeFaceTopicRuntime(
    {
      topicKey,
      observationArtifactRef:
        'face-observation-artifact:topic-face-004c:001',
      requestId:
        `request:topic-face-004c:${topicKey}`,
    },
    {
      authorityProvider: {
        async loadAuthorityReceipt() {
          return buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
        },
      },
      engineProvider: {
        async loadProductDisplayReceipt(
          request,
        ) {
          return buildFR293ProductDisplayReceiptForTopicFaceTest(
            request.observationArtifactRef,
          );
        },
      },
    },
  );
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

describe(
  'TOPIC-FACE-004C result snapshot and history',
  () => {
    it('finalizes an AVAILABLE runtime result as an immutable Product snapshot', async () => {
      const runtime =
        await runtimeResult(
          'face.discover.structure',
        );
      expect(runtime.state).toBe('ready');

      const snapshot =
        buildFaceResultSnapshot(
          runtime,
          '2026-09-26T00:00:00.000Z',
        );

      expect(snapshot.readinessState).toBe(
        'available',
      );
      expect(snapshot.topicKey).toBe(
        'face.discover.structure',
      );
      expect(
        snapshot.topicDefinitionRef.id,
      ).toBe('face.discover.structure');
      expect(snapshot.faceEngineVersion).toBe(
        'FR293-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
      );
      expect(
        snapshot.methodologyPackRefs,
      ).toEqual([]);
      expect(
        snapshot.prohibitedInferences.length,
      ).toBeGreaterThan(0);
      expect(snapshot.readerDeliveryHash).toBe(
        snapshot.readerDelivery
          .readerDeliveryHash,
      );

      expect(() =>
        assertFaceResultSnapshot(snapshot),
      ).not.toThrow();
    });

    it('preserves PARTIAL unavailable sections in both snapshot and history', async () => {
      const runtime =
        await runtimeResult(
          'face.discover.extended',
        );
      const snapshot =
        buildFaceResultSnapshot(
          runtime,
          '2026-09-26T00:01:00.000Z',
        );
      const history =
        buildFaceHistoryEntry(snapshot);

      expect(snapshot.readinessState).toBe(
        'partial',
      );
      expect(
        snapshot.unavailableSections,
      ).toContain(
        'observation:forehead.visible_width_shape',
      );
      expect(history.readinessState).toBe(
        'partial',
      );
      expect(
        history.unavailableSections,
      ).toContain(
        'observation:forehead.visible_width_shape',
      );
    });

    it('keeps persistence time out of semantic result identity', async () => {
      const runtime =
        await runtimeResult(
          'face.discover.structure',
        );
      const first =
        buildFaceResultSnapshot(
          runtime,
          '2026-09-26T00:02:00.000Z',
        );
      const second =
        buildFaceResultSnapshot(
          runtime,
          '2026-09-26T00:03:00.000Z',
        );

      expect(first.resultRef).toBe(
        second.resultRef,
      );
      expect(first.snapshotHash).toBe(
        second.snapshotHash,
      );
      expect(first.createdAt).not.toBe(
        second.createdAt,
      );
    });

    it('rejects snapshot tampering through content-addressed integrity', async () => {
      const runtime =
        await runtimeResult(
          'face.discover.structure',
        );
      const snapshot =
        buildFaceResultSnapshot(
          runtime,
          '2026-09-26T00:04:00.000Z',
        );
      const tampered = {
        ...snapshot,
        prohibitedInferences: [
          ...snapshot.prohibitedInferences,
          'forged_inference',
        ],
      } as FaceResultSnapshotV1;

      expect(() =>
        assertFaceResultSnapshot(tampered),
      ).toThrow(
        'FACE_RESULT_SNAPSHOT_HASH_MISMATCH',
      );
    });

    it('does not finalize BLOCKED or FAILED runtime outcomes as successful history', async () => {
      const blocked =
        await runtimeResult(
          'face.reading.three_divisions',
        );
      expect(blocked.state).toBe('blocked');
      expect(() =>
        buildFaceResultSnapshot(
          blocked,
          '2026-09-26T00:05:00.000Z',
        ),
      ).toThrow(
        'FACE_RESULT_SNAPSHOT_RUNTIME_NOT_FINALIZABLE',
      );

      const failed =
        await executeFaceTopicRuntime(
          {
            topicKey:
              'face.discover.structure',
            observationArtifactRef:
              'face-observation-artifact:topic-face-004c:failed',
            requestId:
              'request:topic-face-004c:failed',
            characterId: 'forbidden',
          },
          {
            authorityProvider: {
              async loadAuthorityReceipt() {
                throw new Error(
                  'must not be called',
                );
              },
            },
            engineProvider: {
              async loadProductDisplayReceipt() {
                throw new Error(
                  'must not be called',
                );
              },
            },
          },
        );
      expect(failed.state).toBe('failed');
      expect(() =>
        buildFaceResultSnapshot(
          failed,
          '2026-09-26T00:06:00.000Z',
        ),
      ).toThrow(
        'FACE_RESULT_SNAPSHOT_RUNTIME_NOT_FINALIZABLE',
      );
    });

    it('projects a minimized history-list entry instead of copying execution internals', async () => {
      const runtime =
        await runtimeResult(
          'face.discover.structure',
        );
      const snapshot =
        buildFaceResultSnapshot(
          runtime,
          '2026-09-26T00:07:00.000Z',
        );
      const history =
        buildFaceHistoryEntry(snapshot);

      expect(
        Object.keys(history).sort(),
      ).toEqual([
        'createdAt',
        'header',
        'readerDeliveryHash',
        'readinessState',
        'resultRef',
        'schemaVersion',
        'topicKey',
        'unavailableSections',
      ]);
      expect(
        'observationArtifactRef' in history,
      ).toBe(false);
      expect(
        'authoritySnapshotId' in history,
      ).toBe(false);
      expect(
        'faceEngineVersion' in history,
      ).toBe(false);
    });

    it('contains no raw face, Character, or Commerce persistence fields', async () => {
      const runtime =
        await runtimeResult(
          'face.discover.structure',
        );
      const snapshot =
        buildFaceResultSnapshot(
          runtime,
          '2026-09-26T00:08:00.000Z',
        );
      const keys = collectKeys(snapshot);

      for (const forbidden of [
        'rawimage',
        'rawphoto',
        'rawjpeg',
        'rawlandmark',
        'mediapipe',
        'faceembedding',
        'identitytemplate',
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
    });
  },
);
