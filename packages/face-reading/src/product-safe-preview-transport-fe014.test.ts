import { describe, expect, it } from 'vitest';
import type { FE004ConsumerPreviewEngineResult } from './consumer-preview-engine-facade-fe004.js';
import type { FE013OneShotBrowserPreviewResult } from './one-shot-browser-preview-engine-fe013.js';
import {
  assertProductSafeBrowserPreviewTransportFE014,
  projectProductSafeBrowserPreviewTransportFE014,
  serializeProductSafeBrowserPreviewTransportFE014,
} from './product-safe-preview-transport-fe014.js';

function fe004(): FE004ConsumerPreviewEngineResult {
  return {
    schemaVersion: 'fe004-consumer-preview-engine-result-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE004-CONSUMER-PREVIEW-ENGINE-FACADE-v1',
    engineState: 'preview_consumer_facade_only',
    providerRunRef: 'fe010:blob:1:0123456789abcdef01234567',
    canonicalAssetDigest:
      'sha256:ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    executionReceipt: {
      internalRuntimeSchemaVersion: 'fe002-preview-engine-run-v1',
      consumerProjectionSchemaVersion: 'fe003-consumer-safe-preview-output-v1',
      failClosedUpstreamErrorsPropagated: true,
      fallbackInvented: false,
    },
    output: {
      schemaVersion: 'fe003-consumer-safe-preview-output-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FE003-CONSUMER-SAFE-PREVIEW-OUTPUT-v1',
      engineState: 'preview_consumer_projection_only',
      providerRunRef: 'fe010:blob:1:0123456789abcdef01234567',
      canonicalAssetDigest:
        'sha256:ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
      metrics: [
        {
          regionKey: 'eye_pair',
          metricRef: 'eye.relative_horizontal_span',
          value: 1.25,
          unit: 'ratio',
        },
        {
          regionKey: 'mouth_lips',
          metricRef: 'mouth.corner_orientation',
          value: -0.125,
          unit: 'radian',
        },
      ],
      regions: [
        {
          regionKey: 'eye_pair',
          state: 'available',
          unavailableSurfaces: [],
        },
        {
          regionKey: 'cheek_mid_face',
          state: 'partial',
          unavailableSurfaces: ['cheek_mid_face.visible_contour_prominence'],
        },
        {
          regionKey: 'mouth_lips',
          state: 'available',
          unavailableSurfaces: [],
        },
        {
          regionKey: 'chin_lower_face',
          state: 'partial',
          unavailableSurfaces: ['chin_lower_face.visible_width'],
        },
      ],
      dataBoundary: {
        rawLandmarksExposed: false,
        contourPointsExposed: false,
        providerVertexIndicesExposed: false,
        biometricEmbeddingExposed: false,
      },
      authorityBoundary: {
        consumesUpstreamAuthorityOnly: true,
        classificationIssued: false,
        scoreIssued: false,
        rankIssued: false,
        traditionalInterpretationIssued: false,
        physiognomyClaimIssued: false,
        fortuneClaimIssued: false,
        productionActivated: false,
        commerceActivated: false,
      },
    },
    dataBoundary: {
      internalRuntimeSnapshotExposed: false,
      internalGeometryStagesExposed: false,
      rawLandmarksExposed: false,
      contourPointsExposed: false,
      providerVertexIndicesExposed: false,
      biometricEmbeddingExposed: false,
    },
    authorityBoundary: {
      consumesUpstreamAuthorityOnly: true,
      performsResearchDecision: false,
      performsValidationDecision: false,
      classificationIssued: false,
      scoreIssued: false,
      rankIssued: false,
      traditionalInterpretationIssued: false,
      physiognomyClaimIssued: false,
      fortuneClaimIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

function success(): FE013OneShotBrowserPreviewResult {
  return {
    schemaVersion: 'fe013-one-shot-browser-preview-success-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1',
    status: 'ok',
    result: fe004(),
    lifecycle: {
      engineOpened: true,
      analysisAttempted: true,
      closeAttempted: true,
      closeSucceeded: true,
      cleanupFailureSuppressed: false,
    },
  };
}

function rejected(): FE013OneShotBrowserPreviewResult {
  return {
    schemaVersion: 'fe013-one-shot-browser-preview-rejected-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1',
    status: 'rejected',
    primaryPhase: 'analysis',
    rejection: {
      code: 'NO_FACE_DETECTED',
      stage: 'analysis',
      internalErrorMessageExposed: false,
      internalStackExposed: false,
      providerPayloadExposed: false,
      geometryExposed: false,
    },
    lifecycle: {
      engineOpened: true,
      analysisAttempted: true,
      closeAttempted: true,
      closeSucceeded: false,
      cleanupFailureSuppressed: true,
    },
  };
}

describe('FE014 product-safe neutral preview transport', () => {
  it('preserves neutral metrics/regions while removing trace identity and digest', () => {
    const source = success();
    const transport = projectProductSafeBrowserPreviewTransportFE014(source);

    expect(transport.status).toBe('ok');
    if (transport.status !== 'ok' || source.status !== 'ok') {
      throw new Error('expected success transport');
    }

    expect(transport.preview.metrics).toEqual(source.result.output.metrics);
    expect(transport.preview.regions).toEqual(source.result.output.regions);
    expect(transport.preview.metrics).not.toBe(source.result.output.metrics);
    expect(transport.preview.regions).not.toBe(source.result.output.regions);

    const serialized = serializeProductSafeBrowserPreviewTransportFE014(transport);
    expect(serialized).not.toContain('"providerRunRef":');
    expect(serialized).not.toContain('"canonicalAssetDigest":');
    expect(serialized).not.toContain('"executionReceipt":');
    expect(serialized).not.toContain('sha256:');
    expect(serialized).not.toContain('fe010:blob:');
    expect(JSON.parse(serialized)).toEqual(transport);
    expect(() => assertProductSafeBrowserPreviewTransportFE014(transport)).not.toThrow();
  });

  it('projects only bounded rejection identity and cleanup-failure state', () => {
    const transport = projectProductSafeBrowserPreviewTransportFE014(rejected());

    expect(transport).toEqual({
      schemaVersion: 'fe014-product-safe-preview-transport-rejected-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FE014-PRODUCT-SAFE-NEUTRAL-PREVIEW-TRANSPORT-v1',
      status: 'rejected',
      rejection: {
        code: 'NO_FACE_DETECTED',
        stage: 'analysis',
        primaryPhase: 'analysis',
        cleanupFailureSuppressed: true,
      },
      transportReceipt: {
        sourceContractVersion: 'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1',
        sourceConsumerProjectionSchemaVersion: null,
        providerRunRefOmitted: true,
        canonicalAssetDigestOmitted: true,
        fe004ExecutionReceiptOmitted: true,
        rawInternalErrorsOmitted: true,
        rawProviderPayloadOmitted: true,
        rawGeometryOmitted: true,
        jsonSafePlainDataOnly: true,
      },
      authorityBoundary: {
        consumesUpstreamNeutralObservationOnly: true,
        performsResearchDecision: false,
        performsValidationDecision: false,
        classificationIssued: false,
        scoreIssued: false,
        rankIssued: false,
        traditionalInterpretationIssued: false,
        physiognomyClaimIssued: false,
        fortuneClaimIssued: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });

    const serialized = serializeProductSafeBrowserPreviewTransportFE014(transport);
    expect(serialized).not.toContain('internalErrorMessageExposed');
    expect(serialized).not.toContain('internalStackExposed');
    expect(serialized).not.toContain('providerPayloadExposed');
    expect(serialized).not.toContain('geometryExposed');
  });

  it('rejects forged authority widening and trace identity leakage', () => {
    const transport = projectProductSafeBrowserPreviewTransportFE014(success());

    const widened = {
      ...transport,
      authorityBoundary: {
        ...transport.authorityBoundary,
        traditionalInterpretationIssued: true,
      },
    } as unknown as typeof transport;
    expect(() => assertProductSafeBrowserPreviewTransportFE014(widened))
      .toThrow(/authority widened/u);

    const leaked = {
      ...transport,
      providerRunRef: 'leaked-trace',
    } as unknown as typeof transport;
    expect(() => assertProductSafeBrowserPreviewTransportFE014(leaked))
      .toThrow(/unauthorized field: providerRunRef/u);
  });
});