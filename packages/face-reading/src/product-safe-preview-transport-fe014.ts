import {
  assertConsumerPreviewEngineResultFE004,
} from './consumer-preview-engine-facade-fe004.js';
import type {
  FE003NeutralMetric,
  FE003RegionAvailability,
} from './consumer-safe-preview-output-fe003.js';
import type {
  FE011PreviewRejectionCode,
  FE011PreviewRejectionStage,
} from './host-safe-browser-preview-engine-fe011.js';
import {
  assertOneShotHostSafeBrowserPreviewResultFE013,
  type FE013OneShotBrowserPreviewResult,
} from './one-shot-browser-preview-engine-fe013.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE014_CONTRACT_VERSION =
  'FE014-PRODUCT-SAFE-NEUTRAL-PREVIEW-TRANSPORT-v1' as const;

export interface FE014NeutralMetricTransport {
  readonly regionKey: FE003NeutralMetric['regionKey'];
  readonly metricRef: string;
  readonly value: number;
  readonly unit: FE003NeutralMetric['unit'];
}

export interface FE014RegionAvailabilityTransport {
  readonly regionKey: FE003RegionAvailability['regionKey'];
  readonly state: FE003RegionAvailability['state'];
  readonly unavailableSurfaces: readonly string[];
}

export interface FE014TransportReceipt {
  readonly sourceContractVersion: typeof import('./one-shot-browser-preview-engine-fe013.js').FE013_CONTRACT_VERSION;
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

export interface FE014AuthorityBoundary {
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

export interface FE014ProductSafePreviewTransportSuccess {
  readonly schemaVersion: 'fe014-product-safe-preview-transport-success-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE014_CONTRACT_VERSION;
  readonly status: 'ok';
  readonly preview: {
    readonly metrics: readonly FE014NeutralMetricTransport[];
    readonly regions: readonly FE014RegionAvailabilityTransport[];
  };
  readonly transportReceipt: FE014TransportReceipt & {
    readonly sourceConsumerProjectionSchemaVersion:
      'fe003-consumer-safe-preview-output-v1';
  };
  readonly authorityBoundary: FE014AuthorityBoundary;
}

export interface FE014ProductSafePreviewTransportRejected {
  readonly schemaVersion: 'fe014-product-safe-preview-transport-rejected-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE014_CONTRACT_VERSION;
  readonly status: 'rejected';
  readonly rejection: {
    readonly code: FE011PreviewRejectionCode;
    readonly stage: FE011PreviewRejectionStage;
    readonly primaryPhase: 'open' | 'analysis' | 'lifecycle' | 'close';
    readonly cleanupFailureSuppressed: boolean;
  };
  readonly transportReceipt: FE014TransportReceipt & {
    readonly sourceConsumerProjectionSchemaVersion: null;
  };
  readonly authorityBoundary: FE014AuthorityBoundary;
}

export type FE014ProductSafePreviewTransport =
  | FE014ProductSafePreviewTransportSuccess
  | FE014ProductSafePreviewTransportRejected;

const AUTHORITY_BOUNDARY: FE014AuthorityBoundary = Object.freeze({
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

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-014 ${message}`);
}

function receipt(
  sourceConsumerProjectionSchemaVersion:
    | 'fe003-consumer-safe-preview-output-v1'
    | null,
): FE014TransportReceipt {
  return Object.freeze({
    sourceContractVersion:
      'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1' as const,
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
): FE014NeutralMetricTransport {
  return Object.freeze({
    regionKey: entry.regionKey,
    metricRef: entry.metricRef,
    value: entry.value,
    unit: entry.unit,
  });
}

function projectRegion(
  entry: FE003RegionAvailability,
): FE014RegionAvailabilityTransport {
  return Object.freeze({
    regionKey: entry.regionKey,
    state: entry.state,
    unavailableSurfaces: Object.freeze([...entry.unavailableSurfaces]),
  });
}

export function projectProductSafeBrowserPreviewTransportFE014(
  result: FE013OneShotBrowserPreviewResult,
): FE014ProductSafePreviewTransport {
  assertOneShotHostSafeBrowserPreviewResultFE013(result);

  if (result.status === 'ok') {
    assertConsumerPreviewEngineResultFE004(result.result);
    const transport: FE014ProductSafePreviewTransportSuccess = Object.freeze({
      schemaVersion: 'fe014-product-safe-preview-transport-success-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FE014_CONTRACT_VERSION,
      status: 'ok' as const,
      preview: Object.freeze({
        metrics: Object.freeze(result.result.output.metrics.map(projectMetric)),
        regions: Object.freeze(result.result.output.regions.map(projectRegion)),
      }),
      transportReceipt: receipt(
        result.result.output.schemaVersion,
      ) as FE014ProductSafePreviewTransportSuccess['transportReceipt'],
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
    assertProductSafeBrowserPreviewTransportFE014(transport);
    return transport;
  }

  const transport: FE014ProductSafePreviewTransportRejected = Object.freeze({
    schemaVersion: 'fe014-product-safe-preview-transport-rejected-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE014_CONTRACT_VERSION,
    status: 'rejected' as const,
    rejection: Object.freeze({
      code: result.rejection.code,
      stage: result.rejection.stage,
      primaryPhase: result.primaryPhase,
      cleanupFailureSuppressed: result.lifecycle.cleanupFailureSuppressed,
    }),
    transportReceipt:
      receipt(null) as FE014ProductSafePreviewTransportRejected['transportReceipt'],
    authorityBoundary: AUTHORITY_BOUNDARY,
  });
  assertProductSafeBrowserPreviewTransportFE014(transport);
  return transport;
}

export function assertProductSafeBrowserPreviewTransportFE014(
  transport: FE014ProductSafePreviewTransport,
): void {
  if (
    transport.artifactVersion !== '0.1.0' ||
    transport.contractVersion !== FE014_CONTRACT_VERSION
  ) {
    fail('transport identity drift.');
  }

  const receiptValue = transport.transportReceipt;
  if (
    receiptValue.sourceContractVersion !==
      'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1' ||
    receiptValue.providerRunRefOmitted !== true ||
    receiptValue.canonicalAssetDigestOmitted !== true ||
    receiptValue.fe004ExecutionReceiptOmitted !== true ||
    receiptValue.rawInternalErrorsOmitted !== true ||
    receiptValue.rawProviderPayloadOmitted !== true ||
    receiptValue.rawGeometryOmitted !== true ||
    receiptValue.jsonSafePlainDataOnly !== true
  ) {
    fail('transport receipt drift.');
  }

  if (
    transport.authorityBoundary.consumesUpstreamNeutralObservationOnly !== true ||
    Object.entries(transport.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamNeutralObservationOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('transport authority widened.');
  }

  if (transport.status === 'ok') {
    if (
      transport.schemaVersion !==
        'fe014-product-safe-preview-transport-success-v1' ||
      transport.transportReceipt.sourceConsumerProjectionSchemaVersion !==
        'fe003-consumer-safe-preview-output-v1'
    ) {
      fail('success transport identity drift.');
    }
    const refs = transport.preview.metrics.map((entry) => entry.metricRef);
    if (new Set(refs).size !== refs.length) {
      fail('success transport contains duplicate metric refs.');
    }
    for (const metric of transport.preview.metrics) {
      if (
        metric.metricRef.trim().length === 0 ||
        !Number.isFinite(metric.value) ||
        !['ratio', 'degree', 'radian'].includes(metric.unit)
      ) {
        fail('success transport contains invalid neutral metric data.');
      }
    }
    if (
      transport.preview.regions.some(
        (entry) =>
          entry.state !==
          (entry.unavailableSurfaces.length === 0 ? 'available' : 'partial'),
      )
    ) {
      fail('success transport region availability drift.');
    }
  } else if (
    transport.schemaVersion !==
      'fe014-product-safe-preview-transport-rejected-v1' ||
    transport.transportReceipt.sourceConsumerProjectionSchemaVersion !== null
  ) {
    fail('rejected transport identity drift.');
  }

  const serialized = JSON.stringify(transport);
  if (
    serialized.includes('providerRunRef') ||
    serialized.includes('canonicalAssetDigest') ||
    serialized.includes('executionReceipt') ||
    serialized.includes('sha256:')
  ) {
    fail('transport leaked trace identity or input digest.');
  }
}

export function serializeProductSafeBrowserPreviewTransportFE014(
  transport: FE014ProductSafePreviewTransport,
): string {
  assertProductSafeBrowserPreviewTransportFE014(transport);
  return JSON.stringify(transport);
}
