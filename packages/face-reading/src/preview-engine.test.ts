import { describe, expect, it } from 'vitest';
import * as previewEngine from './preview-engine.js';

describe('FE005 preview-engine public entrypoint', () => {
  it('pins the runtime value export surface', () => {
    expect(Object.keys(previewEngine).sort()).toEqual([
      'FE004_CONTRACT_VERSION',
      'assertConsumerPreviewEngineResultFE004',
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

  it('exposes the FE004 preview contract version unchanged', () => {
    expect(previewEngine.FE004_CONTRACT_VERSION)
      .toBe('FE004-CONSUMER-PREVIEW-ENGINE-FACADE-v1');
  });
});
