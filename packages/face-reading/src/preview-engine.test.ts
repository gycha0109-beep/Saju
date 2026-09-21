import { describe, expect, it } from 'vitest';
import * as previewEngine from './preview-engine.js';

describe('preview-engine public entrypoint', () => {
  it('pins the runtime value export surface', () => {
    expect(Object.keys(previewEngine).sort()).toEqual([
      'FE004_CONTRACT_VERSION',
      'FE006_CONTRACT_VERSION',
      'FE007_CONTRACT_VERSION',
      'FE009_CONTRACT_VERSION',
      'FE010_CONTRACT_VERSION',
      'FE011_CONTRACT_VERSION',
      'FE013_CONTRACT_VERSION',
      'FE014_CONTRACT_VERSION',
      'FE015_CONTRACT_VERSION',
      'FE016_CONTRACT_VERSION',
      'FE017_CONTRACT_VERSION',
      'assertBoundConsumerPreviewFaceEngineFE006',
      'assertBrowserBlobConsumerPreviewFaceEngineFE010',
      'assertConsumerPreviewEngineResultFE004',
      'assertHostBoundMediaPipeRuntimeFactoryFE016',
      'assertHostSafeBrowserPreviewFaceEngineFE011',
      'assertManagedConsumerPreviewFaceEngineFE007',
      'assertOneShotHostSafeBrowserPreviewResultFE013',
      'assertProductSafeBrowserPreviewAttemptFE017',
      'assertProductSafeBrowserPreviewSessionFE017',
      'assertProductSafeBrowserPreviewTransportFE014',
      'assertReleaseManagedConsumerPreviewFaceEngineFE009',
      'createBoundConsumerPreviewFaceEngineFE006',
      'createBrowserBlobConsumerPreviewFaceEngineFE010',
      'createHostBoundMediaPipeRuntimeFactoryFE016',
      'createManagedConsumerPreviewFaceEngineFE007',
      'createReleaseManagedConsumerPreviewFaceEngineFE009',
      'openHostSafeBrowserPreviewFaceEngineFE011',
      'openProductSafeBrowserPreviewSessionFE017',
      'projectProductSafeBrowserPreviewTransportFE014',
      'runConsumerPreviewFaceEngineFE004',
      'runOneShotHostSafeBrowserPreviewFE013',
      'runProductSafeBrowserPreviewFE015',
      'serializeProductSafeBrowserPreviewTransportFE014',
    ]);
  });

  it('does not expose internal composition, geometry, or release asset payload functions', () => {
    const keys = Object.keys(previewEngine);
    expect(keys).not.toContain('runPreviewFaceEngineFE002');
    expect(keys).not.toContain('projectConsumerSafePreviewOutputFE003');
    expect(keys).not.toContain('runPreviewObservableEngineFE001');
    expect(keys).not.toContain('runGovernedMetricGeometryFR77');
    expect(keys).not.toContain('issueMediaPipeGeometryProfileFR77');
    expect(keys).not.toContain('projectIssuedGovernedMetricGeometryToLipsSurfaceFR78');
    expect(keys).not.toContain('projectMetricLipsSurfaceToPoseNormalized2DFR79');
    expect(keys).not.toContain('MEDIAPIPE_V0_10_35_GEOMETRY_METADATA_PBTXT_FE009');
  });

  it('exposes stable FE004, FE006, FE007, FE009, FE010, FE011, FE013, FE014, FE015, FE016, and FE017 contract versions', () => {
    expect(previewEngine.FE004_CONTRACT_VERSION)
      .toBe('FE004-CONSUMER-PREVIEW-ENGINE-FACADE-v1');
    expect(previewEngine.FE006_CONTRACT_VERSION)
      .toBe('FE006-BOUND-CONSUMER-PREVIEW-ENGINE-v1');
    expect(previewEngine.FE007_CONTRACT_VERSION)
      .toBe('FE007-MANAGED-CONSUMER-PREVIEW-ENGINE-SESSION-v1');
    expect(previewEngine.FE009_CONTRACT_VERSION)
      .toBe('FE009-RELEASE-ASSET-MANAGED-PREVIEW-ENGINE-v1');
    expect(previewEngine.FE010_CONTRACT_VERSION)
      .toBe('FE010-BROWSER-BLOB-PREVIEW-INGRESS-v1');
    expect(previewEngine.FE011_CONTRACT_VERSION)
      .toBe('FE011-HOST-SAFE-BROWSER-PREVIEW-ATTEMPT-v1');
    expect(previewEngine.FE013_CONTRACT_VERSION)
      .toBe('FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1');
    expect(previewEngine.FE014_CONTRACT_VERSION)
      .toBe('FE014-PRODUCT-SAFE-NEUTRAL-PREVIEW-TRANSPORT-v1');
    expect(previewEngine.FE015_CONTRACT_VERSION)
      .toBe('FE015-ONE-CALL-PRODUCT-SAFE-BROWSER-PREVIEW-v1');
    expect(previewEngine.FE016_CONTRACT_VERSION)
      .toBe('FE016-HOST-BOUND-MEDIAPIPE-RUNTIME-ASSETS-v1');
    expect(previewEngine.FE017_CONTRACT_VERSION)
      .toBe('FE017-REUSABLE-PRODUCT-SAFE-BROWSER-PREVIEW-SESSION-v1');
  });
});