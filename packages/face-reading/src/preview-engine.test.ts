import { describe, expect, it } from 'vitest';
import * as previewEngine from './preview-engine.js';

describe('preview-engine public entrypoint', () => {
  it('pins the runtime value export surface', () => {
    expect(Object.keys(previewEngine).sort()).toEqual([
      'FE004_CONTRACT_VERSION',
      'FE006_CONTRACT_VERSION',
      'assertBoundConsumerPreviewFaceEngineFE006',
      'assertConsumerPreviewEngineResultFE004',
      'createBoundConsumerPreviewFaceEngineFE006',
      'runConsumerPreviewFaceEngineFE004',
    ]);
  });

  it('does not expose internal composition or geometry functions', () => {
    const keys = Object.keys(previewEngine);
    expect(keys).not.toContain('runPreviewFaceEngineFE002');
    expect(keys).not.toContain('projectConsumerSafePreviewOutputFE003');
    expect(keys).not.toContain('runPreviewObservableEngineFE001');
    expect(keys).not.toContain('runGovernedMetricGeometryFR77');
    expect(keys).not.toContain('projectIssuedGovernedMetricGeometryToLipsSurfaceFR78');
    expect(keys).not.toContain('projectMetricLipsSurfaceToPoseNormalized2DFR79');
  });

  it('exposes stable FE004 and FE006 contract versions', () => {
    expect(previewEngine.FE004_CONTRACT_VERSION)
      .toBe('FE004-CONSUMER-PREVIEW-ENGINE-FACADE-v1');
    expect(previewEngine.FE006_CONTRACT_VERSION)
      .toBe('FE006-BOUND-CONSUMER-PREVIEW-ENGINE-v1');
  });
});
