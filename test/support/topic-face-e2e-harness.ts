import {
  createFaceProductApi,
  createFaceTopicRuntimeHost,
  type FaceHistoryEntryV1,
  type FaceProductApiV1,
  type FaceProductHistoryStoreV1,
  type FaceResultSnapshotV1,
  type FaceTopicRuntimeEngineRequestV1,
  type FaceTopicRuntimeHostV1,
} from '../../src/index.js';
import {
  buildFR293ProductDisplayReceiptForTopicFaceTest,
} from './topic-face-fr293-display-receipt.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './topic-face-live-authority-source.js';

export type TopicFaceE2EReceipt =
  Record<string, unknown>;

export type TopicFaceE2EReceiptMutator = (
  receipt: TopicFaceE2EReceipt,
  request: FaceTopicRuntimeEngineRequestV1,
) => unknown;

export class TopicFaceE2EHistoryStore
  implements FaceProductHistoryStoreV1
{
  readonly snapshots =
    new Map<string, FaceResultSnapshotV1>();

  readonly entries =
    new Map<string, FaceHistoryEntryV1>();

  readonly savedSnapshots:
    FaceResultSnapshotV1[] = [];

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
    this.savedSnapshots.push(snapshot);
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

  replaceSnapshot(
    resultRef: string,
    snapshot: FaceResultSnapshotV1,
  ): void {
    this.snapshots.set(
      resultRef,
      snapshot,
    );
  }
}

export interface TopicFaceE2EHarness {
  readonly api: FaceProductApiV1;
  readonly runtimeHost:
    FaceTopicRuntimeHostV1;
  readonly historyStore:
    TopicFaceE2EHistoryStore;
  readonly engineCalls: () => number;
  readonly engineRequests: () =>
    readonly FaceTopicRuntimeEngineRequestV1[];
  readonly engineReceipts: () =>
    readonly TopicFaceE2EReceipt[];
}

export function createTopicFaceE2EHarness(
  options: {
    readonly mutateReceipt?:
      TopicFaceE2EReceiptMutator;
    readonly now?: () => string;
  } = {},
): TopicFaceE2EHarness {
  const historyStore =
    new TopicFaceE2EHistoryStore();
  const requests:
    FaceTopicRuntimeEngineRequestV1[] = [];
  const receipts:
    TopicFaceE2EReceipt[] = [];

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
          requests.push(request);
          const receipt =
            buildFR293ProductDisplayReceiptForTopicFaceTest(
              request.observationArtifactRef,
            );
          receipts.push(receipt);
          return options.mutateReceipt ===
            undefined
            ? receipt
            : options.mutateReceipt(
                structuredClone(receipt),
                request,
              );
        },
      },
    });

  const api = createFaceProductApi({
    runtimeHost,
    authorityProvider,
    historyStore,
    now:
      options.now ??
      (() =>
        '2026-09-26T03:00:00.000Z'),
  });

  return Object.freeze({
    api,
    runtimeHost,
    historyStore,
    engineCalls: () => requests.length,
    engineRequests: () =>
      Object.freeze([...requests]),
    engineReceipts: () =>
      Object.freeze([...receipts]),
  });
}

export function e2eObservationRef(
  artifactRef: string,
  featureKey: string,
): string {
  return [
    'face-neutral-observation:v1',
    encodeURIComponent(artifactRef),
    encodeURIComponent(featureKey),
  ].join(':');
}

export function receiptFacts(
  receipt: TopicFaceE2EReceipt,
): Record<string, unknown>[] {
  if (!Array.isArray(receipt.facts)) {
    throw new Error(
      'TOPIC_FACE_004E_RECEIPT_FACTS_INVALID',
    );
  }
  return receipt.facts as Record<
    string,
    unknown
  >[];
}

export function updateCoverageFromFacts(
  receipt: TopicFaceE2EReceipt,
): void {
  const facts = receiptFacts(receipt);
  const available = facts.filter(
    (fact) => fact.status === 'available',
  ).length;

  receipt.coverage = {
    representedFeatureCount: 29,
    canonicalExtractorMaterializedCount: 18,
    extractorOrAuthorityGapCount: 11,
    availableDisplayFactCount: available,
    unavailableDisplayFactCount:
      29 - available,
  };
}

export function collectNormalizedKeys(
  value: unknown,
  keys = new Set<string>(),
): ReadonlySet<string> {
  if (Array.isArray(value)) {
    for (const child of value) {
      collectNormalizedKeys(child, keys);
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
    collectNormalizedKeys(child, keys);
  }
  return keys;
}
