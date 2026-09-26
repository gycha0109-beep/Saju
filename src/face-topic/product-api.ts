import type {
  FaceDisplayValueV1,
} from './display-facts.js';
import {
  buildFaceAuthorityCoverageSnapshot,
  type FaceTopicAuthoritySourceReceipt,
} from './authority.js';
import {
  buildFaceHistoryEntry,
  buildFaceResultSnapshot,
  assertFaceResultSnapshot,
  type FaceHistoryEntryV1,
  type FaceResultSnapshotV1,
} from './result-history.js';
import {
  FACE_NEUTRAL_ANALYSIS_PROGRESS_KEYS,
  mapFaceTopicReadinessToUiAvailability,
} from './reader.js';
import {
  FACE_TOPIC_REGISTRY,
} from './registry.js';
import {
  evaluateFaceTopicDefinitionReadiness,
} from './readiness.js';
import type {
  FaceTopicRuntimeHostV1,
} from './runtime.js';

export const FACE_PRODUCT_API_SCHEMA_VERSION =
  'face-product-api-v1' as const;

export const FACE_PRODUCT_CATALOG_SCHEMA_VERSION =
  'face-product-catalog-v1' as const;

export const FACE_PRODUCT_CAPTURE_REQUEST_SCHEMA_VERSION =
  'face-product-capture-request-v1' as const;

export const FACE_PRODUCT_ANALYSIS_RESPONSE_SCHEMA_VERSION =
  'face-product-analysis-response-v1' as const;

export const FACE_PRODUCT_READER_RESULT_SCHEMA_VERSION =
  'face-product-reader-result-v1' as const;

export const FACE_PRODUCT_HISTORY_LIST_SCHEMA_VERSION =
  'face-product-history-list-v1' as const;

export const FACE_PRODUCT_HISTORY_DETAIL_SCHEMA_VERSION =
  'face-product-history-detail-v1' as const;

export type FaceProductAvailabilityV1 =
  | 'available'
  | 'partial'
  | 'coming_soon';

export interface FaceProductCatalogItemV1 {
  readonly topicKey: string;
  readonly titleKey: string;
  readonly availability: FaceProductAvailabilityV1;
  readonly captureEnabled: boolean;
  readonly executionEnabled: boolean;
  readonly unavailableSectionKeys: readonly string[];
}

export interface FaceProductCatalogV1 {
  readonly schemaVersion:
    typeof FACE_PRODUCT_CATALOG_SCHEMA_VERSION;
  readonly items: readonly FaceProductCatalogItemV1[];
}

export interface FaceProductCaptureRequestV1 {
  readonly schemaVersion:
    typeof FACE_PRODUCT_CAPTURE_REQUEST_SCHEMA_VERSION;
  readonly topicKey: string;
  readonly state:
    | 'capture_ready'
    | 'unavailable';
  readonly inputKind: 'rgb_selfie';
  readonly subjectPolicy: 'single_face_only';
  readonly nextAction:
    | 'capture_selfie'
    | 'none';
}

export interface FaceProductAnalysisRequestV1 {
  readonly topicKey: string;
  readonly observationArtifactRef: string;
  readonly requestId: string;
}

export interface FaceProductReaderItemV1 {
  readonly itemKey: string;
  readonly labelKey: string;
  readonly displayValue: FaceDisplayValueV1;
  readonly qualifiers: readonly string[];
}

export interface FaceProductReaderSectionV1 {
  readonly sectionKey: string;
  readonly titleKey: string;
  readonly status:
    | 'available'
    | 'unavailable';
  readonly items: readonly FaceProductReaderItemV1[];
}

export interface FaceProductReaderResultV1 {
  readonly schemaVersion:
    typeof FACE_PRODUCT_READER_RESULT_SCHEMA_VERSION;
  readonly resultRef: string;
  readonly topicKey: string;
  readonly readinessState:
    | 'available'
    | 'partial';
  readonly header: {
    readonly titleKey: string;
    readonly subtitleKey: string;
  };
  readonly sections: readonly FaceProductReaderSectionV1[];
  readonly unavailableSectionKeys: readonly string[];
  readonly createdAt: string;
}

export interface FaceProductHistoryListItemV1 {
  readonly resultRef: string;
  readonly topicKey: string;
  readonly readinessState:
    | 'available'
    | 'partial';
  readonly header: {
    readonly titleKey: string;
    readonly subtitleKey: string;
  };
  readonly unavailableSectionKeys: readonly string[];
  readonly createdAt: string;
}

export interface FaceProductHistoryListV1 {
  readonly schemaVersion:
    typeof FACE_PRODUCT_HISTORY_LIST_SCHEMA_VERSION;
  readonly items: readonly FaceProductHistoryListItemV1[];
}

export interface FaceProductHistoryDetailV1 {
  readonly schemaVersion:
    typeof FACE_PRODUCT_HISTORY_DETAIL_SCHEMA_VERSION;
  readonly result: FaceProductReaderResultV1;
}

export type FaceProductAnalysisResponseV1 =
  | {
      readonly schemaVersion:
        typeof FACE_PRODUCT_ANALYSIS_RESPONSE_SCHEMA_VERSION;
      readonly state: 'ready' | 'partial';
      readonly topicKey: string;
      readonly progressKeys:
        typeof FACE_NEUTRAL_ANALYSIS_PROGRESS_KEYS;
      readonly result: FaceProductReaderResultV1;
    }
  | {
      readonly schemaVersion:
        typeof FACE_PRODUCT_ANALYSIS_RESPONSE_SCHEMA_VERSION;
      readonly state: 'blocked';
      readonly topicKey: string;
      readonly availability: 'coming_soon';
      readonly captureEnabled: false;
      readonly executionEnabled: false;
    }
  | {
      readonly schemaVersion:
        typeof FACE_PRODUCT_ANALYSIS_RESPONSE_SCHEMA_VERSION;
      readonly state: 'failed';
      readonly topicKey: string;
      readonly failureCode: 'analysis_failed';
    };

export interface FaceProductHistoryStoreV1 {
  save(
    snapshot: FaceResultSnapshotV1,
    entry: FaceHistoryEntryV1,
  ): Promise<void>;
  list(): Promise<readonly FaceHistoryEntryV1[]>;
  load(
    resultRef: string,
  ): Promise<FaceResultSnapshotV1 | undefined>;
}

export interface FaceProductApiDependenciesV1 {
  readonly runtimeHost: FaceTopicRuntimeHostV1;
  readonly authorityProvider: {
    loadAuthorityReceipt():
      Promise<FaceTopicAuthoritySourceReceipt>;
  };
  readonly historyStore: FaceProductHistoryStoreV1;
  readonly now: () => string;
}

export interface FaceProductApiV1 {
  getCatalog(): Promise<FaceProductCatalogV1>;
  requestCapture(
    topicKey: string,
  ): Promise<FaceProductCaptureRequestV1>;
  analyze(
    request: FaceProductAnalysisRequestV1,
  ): Promise<FaceProductAnalysisResponseV1>;
  listHistory(): Promise<FaceProductHistoryListV1>;
  getHistoryDetail(
    resultRef: string,
  ): Promise<FaceProductHistoryDetailV1 | undefined>;
}

const ANALYSIS_REQUEST_KEYS = new Set([
  'topicKey',
  'observationArtifactRef',
  'requestId',
]);

const OPTIONAL_SECTION_KEYS =
  new Map<string, string>([
    [
      'observation:forehead.visible_width_shape',
      'forehead',
    ],
  ]);

function assertNonEmpty(
  value: string,
  code: string,
): void {
  if (value.trim().length === 0) {
    throw new Error(code);
  }
}

function parseAnalysisRequest(
  input: unknown,
): FaceProductAnalysisRequestV1 {
  if (
    input === null ||
    typeof input !== 'object' ||
    Array.isArray(input)
  ) {
    throw new Error(
      'FACE_PRODUCT_ANALYSIS_REQUEST_INVALID',
    );
  }

  const record =
    input as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (!ANALYSIS_REQUEST_KEYS.has(key)) {
      throw new Error(
        'FACE_PRODUCT_ANALYSIS_REQUEST_SCOPE_VIOLATION',
      );
    }
  }

  if (
    typeof record.topicKey !== 'string' ||
    typeof record.observationArtifactRef !== 'string' ||
    typeof record.requestId !== 'string'
  ) {
    throw new Error(
      'FACE_PRODUCT_ANALYSIS_REQUEST_INVALID',
    );
  }

  assertNonEmpty(
    record.topicKey,
    'FACE_PRODUCT_ANALYSIS_REQUEST_INVALID',
  );
  assertNonEmpty(
    record.observationArtifactRef,
    'FACE_PRODUCT_ANALYSIS_REQUEST_INVALID',
  );
  assertNonEmpty(
    record.requestId,
    'FACE_PRODUCT_ANALYSIS_REQUEST_INVALID',
  );

  return Object.freeze({
    topicKey: record.topicKey,
    observationArtifactRef:
      record.observationArtifactRef,
    requestId: record.requestId,
  });
}

function titleKey(
  topicKey: string,
): string {
  return `face.product.topic.${topicKey}.title`;
}

function productUnavailableSections(
  requirements: readonly string[],
): readonly string[] {
  return Object.freeze(
    [
      ...new Set(
        requirements
          .map((requirement) =>
            OPTIONAL_SECTION_KEYS.get(requirement),
          )
          .filter(
            (value): value is string =>
              value !== undefined,
          ),
      ),
    ].sort(),
  );
}

function readerUnavailableSections(
  snapshot: FaceResultSnapshotV1,
): readonly string[] {
  return Object.freeze(
    snapshot.readerDelivery.sections
      .filter(
        (section) =>
          section.status === 'unavailable',
      )
      .map((section) => section.sectionKey)
      .sort(),
  );
}

function projectReaderResult(
  snapshot: FaceResultSnapshotV1,
): FaceProductReaderResultV1 {
  assertFaceResultSnapshot(snapshot);

  return Object.freeze({
    schemaVersion:
      FACE_PRODUCT_READER_RESULT_SCHEMA_VERSION,
    resultRef: snapshot.resultRef,
    topicKey: snapshot.topicKey,
    readinessState: snapshot.readinessState,
    header: Object.freeze({
      titleKey:
        snapshot.readerDelivery.header.titleKey,
      subtitleKey:
        snapshot.readerDelivery.header.subtitleKey,
    }),
    sections: Object.freeze(
      snapshot.readerDelivery.sections.map(
        (section) =>
          Object.freeze({
            sectionKey: section.sectionKey,
            titleKey: section.titleKey,
            status: section.status,
            items: Object.freeze(
              section.items.map((item) =>
                Object.freeze({
                  itemKey: item.itemKey,
                  labelKey: item.labelKey,
                  displayValue:
                    item.displayValue,
                  qualifiers: Object.freeze([
                    ...item.qualifiers,
                  ]),
                }),
              ),
            ),
          }),
      ),
    ),
    unavailableSectionKeys:
      readerUnavailableSections(snapshot),
    createdAt: snapshot.createdAt,
  });
}

function projectHistoryListItem(
  entry: FaceHistoryEntryV1,
): FaceProductHistoryListItemV1 {
  return Object.freeze({
    resultRef: entry.resultRef,
    topicKey: entry.topicKey,
    readinessState: entry.readinessState,
    header: Object.freeze({
      titleKey: entry.header.titleKey,
      subtitleKey: entry.header.subtitleKey,
    }),
    unavailableSectionKeys:
      productUnavailableSections(
        entry.unavailableSections,
      ),
    createdAt: entry.createdAt,
  });
}

async function buildCatalog(
  dependencies: FaceProductApiDependenciesV1,
): Promise<FaceProductCatalogV1> {
  const receipt =
    await dependencies.authorityProvider
      .loadAuthorityReceipt();
  const authority =
    buildFaceAuthorityCoverageSnapshot(receipt);

  const items = Object.freeze(
    FACE_TOPIC_REGISTRY.map((definition) => {
      const readiness =
        evaluateFaceTopicDefinitionReadiness(
          definition,
          authority,
        );
      const availability =
        mapFaceTopicReadinessToUiAvailability(
          readiness.state,
          definition.publicationState,
        );
      const enabled =
        readiness.state !== 'blocked';

      return Object.freeze({
        topicKey: definition.topicKey,
        titleKey:
          titleKey(definition.topicKey),
        availability,
        captureEnabled: enabled,
        executionEnabled: enabled,
        unavailableSectionKeys:
          productUnavailableSections(
            readiness.missingOptionalRequirements,
          ),
      });
    }),
  );

  return Object.freeze({
    schemaVersion:
      FACE_PRODUCT_CATALOG_SCHEMA_VERSION,
    items,
  });
}

export function createFaceProductApi(
  dependencies: FaceProductApiDependenciesV1,
): FaceProductApiV1 {
  return Object.freeze({
    async getCatalog() {
      return buildCatalog(dependencies);
    },

    async requestCapture(topicKey) {
      assertNonEmpty(
        topicKey,
        'FACE_PRODUCT_CAPTURE_TOPIC_INVALID',
      );
      const catalog =
        await buildCatalog(dependencies);
      const topic = catalog.items.find(
        (item) => item.topicKey === topicKey,
      );
      if (topic === undefined) {
        throw new Error(
          'FACE_PRODUCT_CAPTURE_TOPIC_NOT_REGISTERED',
        );
      }

      return Object.freeze({
        schemaVersion:
          FACE_PRODUCT_CAPTURE_REQUEST_SCHEMA_VERSION,
        topicKey,
        state: topic.captureEnabled
          ? 'capture_ready'
          : 'unavailable',
        inputKind: 'rgb_selfie',
        subjectPolicy: 'single_face_only',
        nextAction: topic.captureEnabled
          ? 'capture_selfie'
          : 'none',
      });
    },

    async analyze(input) {
      const request =
        parseAnalysisRequest(input);
      const runtime =
        await dependencies.runtimeHost.execute(
          request,
        );

      if (runtime.state === 'blocked') {
        return Object.freeze({
          schemaVersion:
            FACE_PRODUCT_ANALYSIS_RESPONSE_SCHEMA_VERSION,
          state: 'blocked' as const,
          topicKey: runtime.topicKey,
          availability:
            'coming_soon' as const,
          captureEnabled: false as const,
          executionEnabled: false as const,
        });
      }

      if (runtime.state === 'failed') {
        return Object.freeze({
          schemaVersion:
            FACE_PRODUCT_ANALYSIS_RESPONSE_SCHEMA_VERSION,
          state: 'failed' as const,
          topicKey: runtime.topicKey,
          failureCode:
            'analysis_failed' as const,
        });
      }

      const snapshot =
        buildFaceResultSnapshot(
          runtime,
          dependencies.now(),
        );
      const entry =
        buildFaceHistoryEntry(snapshot);
      await dependencies.historyStore.save(
        snapshot,
        entry,
      );

      return Object.freeze({
        schemaVersion:
          FACE_PRODUCT_ANALYSIS_RESPONSE_SCHEMA_VERSION,
        state: runtime.state,
        topicKey: runtime.topicKey,
        progressKeys:
          FACE_NEUTRAL_ANALYSIS_PROGRESS_KEYS,
        result: projectReaderResult(snapshot),
      });
    },

    async listHistory() {
      const entries =
        await dependencies.historyStore.list();

      return Object.freeze({
        schemaVersion:
          FACE_PRODUCT_HISTORY_LIST_SCHEMA_VERSION,
        items: Object.freeze(
          [...entries]
            .sort((left, right) =>
              right.createdAt.localeCompare(
                left.createdAt,
              ),
            )
            .map(projectHistoryListItem),
        ),
      });
    },

    async getHistoryDetail(resultRef) {
      assertNonEmpty(
        resultRef,
        'FACE_PRODUCT_HISTORY_RESULT_REF_INVALID',
      );
      const snapshot =
        await dependencies.historyStore.load(
          resultRef,
        );
      if (snapshot === undefined) {
        return undefined;
      }

      return Object.freeze({
        schemaVersion:
          FACE_PRODUCT_HISTORY_DETAIL_SCHEMA_VERSION,
        result: projectReaderResult(snapshot),
      });
    },
  });
}
