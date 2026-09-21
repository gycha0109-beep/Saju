import {
  assertConsumerPreviewEngineResultFE004,
  type FE004ConsumerPreviewEngineResult,
} from './consumer-preview-engine-facade-fe004.js';
import type {
  FE003NeutralMetric,
  FE003RegionAvailability,
} from './consumer-safe-preview-output-fe003.js';
import type {
  FE010BrowserBlobAnalysisRequest,
  FE010BrowserBlobPreviewEngineConfig,
} from './browser-blob-preview-engine-fe010.js';
import {
  FE011_CONTRACT_VERSION,
  openHostSafeBrowserPreviewFaceEngineFE011,
  type FE011HostSafeBrowserPreviewEngine,
  type FE011PreviewRejection,
  type FE011PreviewRejectionCode,
  type FE011PreviewRejectionStage,
} from './host-safe-browser-preview-engine-fe011.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE017_CONTRACT_VERSION =
  'FE017-REUSABLE-PRODUCT-SAFE-BROWSER-PREVIEW-SESSION-v1' as const;

export interface FE017NeutralMetricTransport {
  readonly regionKey: FE003NeutralMetric['regionKey'];
  readonly metricRef: string;
  readonly value: number;
  readonly unit: FE003NeutralMetric['unit'];
}

export interface FE017RegionAvailabilityTransport {
  readonly regionKey: FE003RegionAvailability['regionKey'];
  readonly state: FE003RegionAvailability['state'];
  readonly unavailableSurfaces: readonly string[];
}

export interface FE017TransportReceipt {
  readonly sourceContractVersion: typeof FE011_CONTRACT_VERSION;
  readonly sourceConsumerProjectionSchemaVersion:
    | 'fe003-consumer-safe-preview-output-v1'
    | null;
  readonly providerRunRefOmitted: true;
  readonly canonicalAssetDigestOmitted: true;
  readonly fe004ExecutionReceiptOmitted: true;
  readonly rawInternalErrorsOmitted: true;
  readonly rawProviderPayloadOmitted: true;
  readonly rawGeometryOmitted: true;
  readonly jsonSafePlainDataOnly: true;
}

export interface FE017AuthorityBoundary {
  readonly consumesUpstreamNeutralObservationOnly: true;
  readonly performsResearchDecision: false;
  readonly performsValidationDecision: false;
  readonly classificationIssued: false;
  readonly scoreIssued: false;
  readonly rankIssued: false;
  readonly traditionalInterpretationIssued: false;
  readonly physiognomyClaimIssued: false;
  readonly fortuneClaimIssued: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export interface FE017ProductSafePreviewAttemptSuccess {
  readonly schemaVersion: 'fe017-product-safe-preview-attempt-success-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE017_CONTRACT_VERSION;
  readonly status: 'ok';
  readonly preview: {
    readonly metrics: readonly FE017NeutralMetricTransport[];
    readonly regions: readonly FE017RegionAvailabilityTransport[];
  };
  readonly transportReceipt: FE017TransportReceipt & {
    readonly sourceConsumerProjectionSchemaVersion:
      'fe003-consumer-safe-preview-output-v1';
  };
  readonly authorityBoundary: FE017AuthorityBoundary;
}

export interface FE017ProductSafePreviewAttemptRejected {
  readonly schemaVersion: 'fe017-product-safe-preview-attempt-rejected-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE017_CONTRACT_VERSION;
  readonly status: 'rejected';
  readonly rejection: {
    readonly code: FE011PreviewRejectionCode;
    readonly stage: FE011PreviewRejectionStage;
  };
  readonly transportReceipt: FE017TransportReceipt & {
    readonly sourceConsumerProjectionSchemaVersion: null;
  };
  readonly authorityBoundary: FE017AuthorityBoundary;
}

export type FE017ProductSafePreviewAttempt =
  | FE017ProductSafePreviewAttemptSuccess
  | FE017ProductSafePreviewAttemptRejected;

export type FE017ProductSafeSessionCloseResult =
  | Readonly<{ status: 'closed' }>
  | Readonly<{
      status: 'rejected';
      rejection: {
        readonly code: FE011PreviewRejectionCode;
        readonly stage: FE011PreviewRejectionStage;
      };
    }>;

export interface FE017ProductSafeBrowserPreviewSession {
  readonly schemaVersion: 'fe017-product-safe-browser-preview-session-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE017_CONTRACT_VERSION;
  readonly sessionState: 'preview_product_safe_reusable_session_only';
  readonly sessionReceipt: {
    readonly sourceContractVersion: typeof FE011_CONTRACT_VERSION;
    readonly runtimeOpenedOncePerSession: true;
    readonly runtimeReusedAcrossAttempts: true;
    readonly underlyingAnalysesSerialized: true;
    readonly closeSingleFlight: true;
    readonly newAnalysisRejectedAfterCloseBegins: true;
    readonly traceIdentityExposed: false;
    readonly rawGeometryExposed: false;
  };
  readonly authorityBoundary: FE017AuthorityBoundary;
  readonly analyzeBlob: (
    request: FE010BrowserBlobAnalysisRequest,
  ) => Promise<FE017ProductSafePreviewAttempt>;
  readonly close: () => Promise<FE017ProductSafeSessionCloseResult>;
}

export interface FE017ProductSafeBrowserPreviewOpenSuccess {
  readonly status: 'ready';
  readonly session: FE017ProductSafeBrowserPreviewSession;
}

export interface FE017ProductSafeBrowserPreviewOpenRejected {
  readonly status: 'rejected';
  readonly rejection: {
    readonly code: FE011PreviewRejectionCode;
    readonly stage: FE011PreviewRejectionStage;
  };
}

export type FE017ProductSafeBrowserPreviewOpenResult =
  | FE017ProductSafeBrowserPreviewOpenSuccess
  | FE017ProductSafeBrowserPreviewOpenRejected;

const AUTHORITY_BOUNDARY: FE017AuthorityBoundary = Object.freeze({
  consumesUpstreamNeutralObservationOnly: true as const,
  performsResearchDecision: false as const,
  performsValidationDecision: false as const,
  classificationIssued: false as const,
  scoreIssued: false as const,
  rankIssued: false as const,
  traditionalInterpretationIssued: false as const,
  physiognomyClaimIssued: false as const,
  fortuneClaimIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

const SESSION_RECEIPT = Object.freeze({
  sourceContractVersion: FE011_CONTRACT_VERSION,
  runtimeOpenedOncePerSession: true as const,
  runtimeReusedAcrossAttempts: true as const,
  underlyingAnalysesSerialized: true as const,
  closeSingleFlight: true as const,
  newAnalysisRejectedAfterCloseBegins: true as const,
  traceIdentityExposed: false as const,
  rawGeometryExposed: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-017 ${message}`);
}

function exactKeys(
  value: object,
  allowed: readonly string[],
  path: string,
): void {
  const allowedSet = new Set(allowed);
  const unexpected = Object.keys(value).find((key) => !allowedSet.has(key));
  if (unexpected !== undefined) {
    fail(`${path} contains unauthorized field: ${unexpected}.`);
  }
}

function transportReceipt(
  sourceConsumerProjectionSchemaVersion:
    | 'fe003-consumer-safe-preview-output-v1'
    | null,
): FE017TransportReceipt {
  return Object.freeze({
    sourceContractVersion: FE011_CONTRACT_VERSION,
    sourceConsumerProjectionSchemaVersion,
    providerRunRefOmitted: true as const,
    canonicalAssetDigestOmitted: true as const,
    fe004ExecutionReceiptOmitted: true as const,
    rawInternalErrorsOmitted: true as const,
    rawProviderPayloadOmitted: true as const,
    rawGeometryOmitted: true as const,
    jsonSafePlainDataOnly: true as const,
  });
}

function projectMetric(
  entry: FE003NeutralMetric,
): FE017NeutralMetricTransport {
  return Object.freeze({
    regionKey: entry.regionKey,
    metricRef: entry.metricRef,
    value: entry.value,
    unit: entry.unit,
  });
}

function projectRegion(
  entry: FE003RegionAvailability,
): FE017RegionAvailabilityTransport {
  return Object.freeze({
    regionKey: entry.regionKey,
    state: entry.state,
    unavailableSurfaces: Object.freeze([...entry.unavailableSurfaces]),
  });
}

function projectSuccess(
  result: FE004ConsumerPreviewEngineResult,
): FE017ProductSafePreviewAttemptSuccess {
  assertConsumerPreviewEngineResultFE004(result);
  const attempt: FE017ProductSafePreviewAttemptSuccess = Object.freeze({
    schemaVersion: 'fe017-product-safe-preview-attempt-success-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE017_CONTRACT_VERSION,
    status: 'ok' as const,
    preview: Object.freeze({
      metrics: Object.freeze(result.output.metrics.map(projectMetric)),
      regions: Object.freeze(result.output.regions.map(projectRegion)),
    }),
    transportReceipt: transportReceipt(
      result.output.schemaVersion,
    ) as FE017ProductSafePreviewAttemptSuccess['transportReceipt'],
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertProductSafeBrowserPreviewAttemptFE017(attempt);
  return attempt;
}

function projectRejected(
  rejection: Pick<FE011PreviewRejection, 'code' | 'stage'>,
): FE017ProductSafePreviewAttemptRejected {
  const attempt: FE017ProductSafePreviewAttemptRejected = Object.freeze({
    schemaVersion: 'fe017-product-safe-preview-attempt-rejected-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE017_CONTRACT_VERSION,
    status: 'rejected' as const,
    rejection: Object.freeze({
      code: rejection.code,
      stage: rejection.stage,
    }),
    transportReceipt:
      transportReceipt(null) as FE017ProductSafePreviewAttemptRejected['transportReceipt'],
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertProductSafeBrowserPreviewAttemptFE017(attempt);
  return attempt;
}

function runtimeRejected(
  stage: FE011PreviewRejectionStage,
): FE017ProductSafePreviewAttemptRejected {
  return projectRejected({
    code: 'ENGINE_RUNTIME_FAILED',
    stage,
  });
}

function closedRejected(): FE017ProductSafePreviewAttemptRejected {
  return projectRejected({
    code: 'SESSION_CLOSED',
    stage: 'lifecycle',
  });
}

function wrapSession(
  inner: FE011HostSafeBrowserPreviewEngine,
): FE017ProductSafeBrowserPreviewSession {
  let lifecycle: 'open' | 'closing' | 'closed' = 'open';
  let closePromise: Promise<FE017ProductSafeSessionCloseResult> | null = null;

  const session: FE017ProductSafeBrowserPreviewSession = Object.freeze({
    schemaVersion: 'fe017-product-safe-browser-preview-session-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE017_CONTRACT_VERSION,
    sessionState: 'preview_product_safe_reusable_session_only' as const,
    sessionReceipt: SESSION_RECEIPT,
    authorityBoundary: AUTHORITY_BOUNDARY,
    async analyzeBlob(
      request: FE010BrowserBlobAnalysisRequest,
    ): Promise<FE017ProductSafePreviewAttempt> {
      if (lifecycle !== 'open') {
        return closedRejected();
      }
      try {
        const attempt = await inner.analyzeBlob(request);
        return attempt.status === 'ok'
          ? projectSuccess(attempt.result)
          : projectRejected(attempt.rejection);
      } catch {
        return runtimeRejected('analysis');
      }
    },
    close(): Promise<FE017ProductSafeSessionCloseResult> {
      if (closePromise !== null) return closePromise;
      lifecycle = 'closing';
      closePromise = (async () => {
        try {
          const result = await inner.close();
          if (result.status === 'closed') {
            return Object.freeze({ status: 'closed' as const });
          }
          return Object.freeze({
            status: 'rejected' as const,
            rejection: Object.freeze({
              code: result.rejection.code,
              stage: result.rejection.stage,
            }),
          });
        } catch {
          return Object.freeze({
            status: 'rejected' as const,
            rejection: Object.freeze({
              code: 'ENGINE_RUNTIME_FAILED' as const,
              stage: 'lifecycle' as const,
            }),
          });
        } finally {
          lifecycle = 'closed';
        }
      })();
      return closePromise;
    },
  });

  assertProductSafeBrowserPreviewSessionFE017(session);
  return session;
}

export async function openProductSafeBrowserPreviewSessionFE017(
  config: FE010BrowserBlobPreviewEngineConfig = {
    schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
  },
): Promise<FE017ProductSafeBrowserPreviewOpenResult> {
  try {
    const opened = await openHostSafeBrowserPreviewFaceEngineFE011(config);
    if (opened.status === 'rejected') {
      return Object.freeze({
        status: 'rejected' as const,
        rejection: Object.freeze({
          code: opened.rejection.code,
          stage: opened.rejection.stage,
        }),
      });
    }
    return Object.freeze({
      status: 'ready' as const,
      session: wrapSession(opened.engine),
    });
  } catch {
    return Object.freeze({
      status: 'rejected' as const,
      rejection: Object.freeze({
        code: 'ENGINE_INITIALIZATION_FAILED' as const,
        stage: 'open' as const,
      }),
    });
  }
}

export function assertProductSafeBrowserPreviewSessionFE017(
  session: FE017ProductSafeBrowserPreviewSession,
): void {
  exactKeys(
    session,
    [
      'schemaVersion',
      'artifactVersion',
      'contractVersion',
      'sessionState',
      'sessionReceipt',
      'authorityBoundary',
      'analyzeBlob',
      'close',
    ],
    'session',
  );
  exactKeys(
    session.sessionReceipt,
    [
      'sourceContractVersion',
      'runtimeOpenedOncePerSession',
      'runtimeReusedAcrossAttempts',
      'underlyingAnalysesSerialized',
      'closeSingleFlight',
      'newAnalysisRejectedAfterCloseBegins',
      'traceIdentityExposed',
      'rawGeometryExposed',
    ],
    'sessionReceipt',
  );
  exactKeys(
    session.authorityBoundary,
    [
      'consumesUpstreamNeutralObservationOnly',
      'performsResearchDecision',
      'performsValidationDecision',
      'classificationIssued',
      'scoreIssued',
      'rankIssued',
      'traditionalInterpretationIssued',
      'physiognomyClaimIssued',
      'fortuneClaimIssued',
      'productionActivated',
      'commerceActivated',
    ],
    'authorityBoundary',
  );

  if (
    session.schemaVersion !== 'fe017-product-safe-browser-preview-session-v1' ||
    session.artifactVersion !== '0.1.0' ||
    session.contractVersion !== FE017_CONTRACT_VERSION ||
    session.sessionState !== 'preview_product_safe_reusable_session_only' ||
    typeof session.analyzeBlob !== 'function' ||
    typeof session.close !== 'function'
  ) {
    fail('session identity drift.');
  }

  if (
    session.sessionReceipt.sourceContractVersion !== FE011_CONTRACT_VERSION ||
    session.sessionReceipt.runtimeOpenedOncePerSession !== true ||
    session.sessionReceipt.runtimeReusedAcrossAttempts !== true ||
    session.sessionReceipt.underlyingAnalysesSerialized !== true ||
    session.sessionReceipt.closeSingleFlight !== true ||
    session.sessionReceipt.newAnalysisRejectedAfterCloseBegins !== true ||
    session.sessionReceipt.traceIdentityExposed !== false ||
    session.sessionReceipt.rawGeometryExposed !== false
  ) {
    fail('session receipt drift.');
  }

  if (
    session.authorityBoundary.consumesUpstreamNeutralObservationOnly !== true ||
    Object.entries(session.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamNeutralObservationOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('session authority widened.');
  }
}

export function assertProductSafeBrowserPreviewAttemptFE017(
  attempt: FE017ProductSafePreviewAttempt,
): void {
  exactKeys(
    attempt,
    attempt.status === 'ok'
      ? [
          'schemaVersion',
          'artifactVersion',
          'contractVersion',
          'status',
          'preview',
          'transportReceipt',
          'authorityBoundary',
        ]
      : [
          'schemaVersion',
          'artifactVersion',
          'contractVersion',
          'status',
          'rejection',
          'transportReceipt',
          'authorityBoundary',
        ],
    'attempt',
  );
  exactKeys(
    attempt.transportReceipt,
    [
      'sourceContractVersion',
      'sourceConsumerProjectionSchemaVersion',
      'providerRunRefOmitted',
      'canonicalAssetDigestOmitted',
      'fe004ExecutionReceiptOmitted',
      'rawInternalErrorsOmitted',
      'rawProviderPayloadOmitted',
      'rawGeometryOmitted',
      'jsonSafePlainDataOnly',
    ],
    'transportReceipt',
  );
  exactKeys(
    attempt.authorityBoundary,
    [
      'consumesUpstreamNeutralObservationOnly',
      'performsResearchDecision',
      'performsValidationDecision',
      'classificationIssued',
      'scoreIssued',
      'rankIssued',
      'traditionalInterpretationIssued',
      'physiognomyClaimIssued',
      'fortuneClaimIssued',
      'productionActivated',
      'commerceActivated',
    ],
    'authorityBoundary',
  );

  if (
    attempt.artifactVersion !== '0.1.0' ||
    attempt.contractVersion !== FE017_CONTRACT_VERSION ||
    attempt.transportReceipt.sourceContractVersion !== FE011_CONTRACT_VERSION ||
    attempt.transportReceipt.providerRunRefOmitted !== true ||
    attempt.transportReceipt.canonicalAssetDigestOmitted !== true ||
    attempt.transportReceipt.fe004ExecutionReceiptOmitted !== true ||
    attempt.transportReceipt.rawInternalErrorsOmitted !== true ||
    attempt.transportReceipt.rawProviderPayloadOmitted !== true ||
    attempt.transportReceipt.rawGeometryOmitted !== true ||
    attempt.transportReceipt.jsonSafePlainDataOnly !== true
  ) {
    fail('attempt identity or transport receipt drift.');
  }

  if (
    attempt.authorityBoundary.consumesUpstreamNeutralObservationOnly !== true ||
    Object.entries(attempt.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamNeutralObservationOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('attempt authority widened.');
  }

  if (attempt.status === 'ok') {
    exactKeys(attempt.preview, ['metrics', 'regions'], 'preview');
    attempt.preview.metrics.forEach((entry, index) =>
      exactKeys(
        entry,
        ['regionKey', 'metricRef', 'value', 'unit'],
        `preview.metrics[${index}]`,
      ),
    );
    attempt.preview.regions.forEach((entry, index) =>
      exactKeys(
        entry,
        ['regionKey', 'state', 'unavailableSurfaces'],
        `preview.regions[${index}]`,
      ),
    );
    if (
      attempt.schemaVersion !== 'fe017-product-safe-preview-attempt-success-v1' ||
      attempt.transportReceipt.sourceConsumerProjectionSchemaVersion !==
        'fe003-consumer-safe-preview-output-v1'
    ) {
      fail('success attempt identity drift.');
    }
    const refs = attempt.preview.metrics.map((entry) => entry.metricRef);
    if (
      new Set(refs).size !== refs.length ||
      attempt.preview.metrics.some(
        (entry) =>
          entry.metricRef.trim().length === 0 ||
          !Number.isFinite(entry.value) ||
          !['ratio', 'degree', 'radian'].includes(entry.unit),
      )
    ) {
      fail('success attempt contains invalid neutral metric data.');
    }
    const expectedRegionOrder = [
      'eye_pair',
      'cheek_mid_face',
      'mouth_lips',
      'chin_lower_face',
    ] as const;
    if (
      attempt.preview.regions.length !== expectedRegionOrder.length ||
      attempt.preview.regions.some(
        (entry, index) => entry.regionKey !== expectedRegionOrder[index],
      ) ||
      attempt.preview.regions.some(
        (entry) =>
          entry.state !==
          (entry.unavailableSurfaces.length === 0 ? 'available' : 'partial'),
      )
    ) {
      fail('success attempt region availability drift.');
    }
  } else {
    exactKeys(attempt.rejection, ['code', 'stage'], 'rejection');
    if (
      attempt.schemaVersion !== 'fe017-product-safe-preview-attempt-rejected-v1' ||
      attempt.transportReceipt.sourceConsumerProjectionSchemaVersion !== null
    ) {
      fail('rejected attempt identity drift.');
    }
  }

  const serialized = JSON.stringify(attempt);
  if (
    /"(?:providerRunRef|canonicalAssetDigest|executionReceipt)"\s*:/u.test(serialized) ||
    serialized.includes('sha256:')
  ) {
    fail('attempt leaked trace identity or input digest.');
  }
}
