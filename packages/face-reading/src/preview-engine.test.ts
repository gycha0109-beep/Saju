import { describe, expect, it } from 'vitest';
import * as previewEngine from './preview-engine.js';

describe('preview-engine public entrypoint', () => {
  it('pins the runtime value export surface', () => {
    expect(Object.keys(previewEngine).sort()).toEqual([
      'FE004_CONTRACT_VERSION',
      'FE006_CONTRACT_VERSION',
      'FE007_CONTRACT_VERSION',
      'FE009_CONTRACT_VERSION',
      'assertBoundConsumerPreviewFaceEngineFE006',
      'assertConsumerPreviewEngineResultFE004',
      'assertManagedConsumerPreviewFaceEngineFE007',
      'assertReleaseManagedConsumerPreviewFaceEngineFE009',
      'createBoundConsumerPreviewFaceEngineFE006',
      'createManagedConsumerPreviewFaceEngineFE007',
      'createReleaseManagedConsumerPreviewFaceEngineFE009',
      'runConsumerPreviewFaceEngineFE004',
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

  it('exposes stable FE004, FE006, FE007, and FE009 contract versions', () => {
    expect(previewEngine.FE004_CONTRACT_VERSION)
      .toBe('FE004-CONSUMER-PREVIEW-ENGINE-FACADE-v1');
    expect(previewEngine.FE006_CONTRACT_VERSION)
      .toBe('FE006-BOUND-CONSUMER-PREVIEW-ENGINE-v1');
    expect(previewEngine.FE007_CONTRACT_VERSION)
      .toBe('FE007-MANAGED-CONSUMER-PREVIEW-ENGINE-SESSION-v1');
    expect(previewEngine.FE009_CONTRACT_VERSION)
      .toBe('FE009-RELEASE-ASSET-MANAGED-PREVIEW-ENGINE-v1');
  });
});
