import { describe, it, expect } from 'vitest';
import {
  projectPrivatePhotoReadiness,
  LOCAL_READINESS_VIEW_VERSION,
} from '../tools/face-reading/two-view/private-readiness-view.mjs';
const keys = Array.from({ length: 29 }, (_, n) => 'region.feature_' + n);
const source = {
  metricMethodVersion: 'metric@1',
  parsingMethodVersion: 'parsing@1',
  savedMetricsValidation: true,
  savedParsingValidation: true,
  uniqueOriginalImagesRehashed: 1,
  previousAggregateCrossChecked: true,
};
const v = { metric: 'metric@1', parsing: 'parsing@1' };
const captures = [{ captureRef: 'capture-01', viewRole: 'frontal' as const }];
function report() {
  const f = (featureKey: string, n: number) => ({
    featureKey,
    regionKey: 'region',
    state: n === 0 ? 'candidate_only' : n === 1 ? 'calculation_only' : 'unavailable',
    reason:
      n === 0
        ? 'ENGINEERING_PROXY_NOT_CANONICAL'
        : n === 1
          ? 'CANONICAL_CALCULATOR_WITHOUT_VERIFIED_PHOTO_INPUT'
          : 'CURRENT_RGB_AUTHORITY_UNAVAILABLE',
    canonicalCalculatorMaterialized: n <= 1,
    engineeringProxyMatched: n === 0,
    singleReviewerLabelPresent: false,
    independentHumanGroundTruthPresent: false,
    canonicalObservationAdmitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
  });
  return {
    schemaVersion: 'local-whole-face-per-capture-readiness@0.1.0',
    lifecycle: 'private_local_research_only',
    photoCount: 1,
    canonicalFeatureCount: 29,
    canonicalCalculatorCount: 18,
    canonicalHardGapCount: 11,
    statusCounts: {
      not_evaluated: 0,
      calculation_only: 1,
      candidate_only: 1,
      partial: 0,
      observed: 0,
      unavailable: 27,
    },
    independentAccuracyValidated: false,
    admittedCanonicalMeasurements: 0,
    traditionalBindingAuthorized: false,
    productionAuthorized: false,
    containsRawBiometricMeasurements: false,
    captures: [
      {
        captureRef: 'capture-01',
        viewRole: 'frontal',
        hasPersistedExecutionEvidence: true,
        canonicalFeatureCount: 29,
        features: keys.map(f),
      },
    ],
    sources: { ...source },
  };
}
describe('private whole-face readiness viewer projection', () => {
  it('projects 29 state labels and no raw image or metric data', () => {
    const x = projectPrivatePhotoReadiness(report(), captures, keys, v);
    expect(x).toMatchObject({
      schemaVersion: LOCAL_READINESS_VIEW_VERSION,
      status: 'available',
      captureCount: 1,
      independentAccuracyValidated: false,
      canonicalPhotoMeasurementVerified: false,
    });
    expect(x.captures['capture-01']!.features).toHaveLength(29);
    const serialized = JSON.stringify(x);
    for (const token of ['sourcePath', 'sourceSha256', 'rawCoordinates', 'sourceDigest', 'value'])
      expect(serialized).not.toContain(token);
  });
  it('rejects version drift, forged authority and shape changes', () => {
    expect(() =>
      projectPrivatePhotoReadiness(report(), captures, keys, { ...v, metric: 'other' }),
    ).toThrow();
    expect(() =>
      projectPrivatePhotoReadiness(
        {
          ...report(),
          productionAuthorized: true,
        },
        captures,
        keys,
        v,
      ),
    ).toThrow();
    expect(() =>
      projectPrivatePhotoReadiness({ ...report(), sourcePath: 'photo.jpg' }, captures, keys, v),
    ).toThrow();
  });
  it('rejects a duplicate, wrong or increased key count', () => {
    const duplicate = report();
    duplicate.captures[0]!.features[1]!.featureKey = keys[0]!;
    expect(() => projectPrivatePhotoReadiness(duplicate, captures, keys, v)).toThrow();
    expect(() => projectPrivatePhotoReadiness(report(), captures, keys.slice(1), v)).toThrow();
  });
  it('rejects falsely marked observed or proxy-authorized entries', () => {
    const observed = report();
    observed.captures[0]!.features[0]!.state = 'observed';
    expect(() => projectPrivatePhotoReadiness(observed, captures, keys, v)).toThrow();
    const proxy = report();
    proxy.captures[0]!.features[1]!.engineeringProxyMatched = true;
    expect(() => projectPrivatePhotoReadiness(proxy, captures, keys, v)).toThrow();
  });
  it('refuses stale capture references and total mismatches', () => {
    expect(() =>
      projectPrivatePhotoReadiness(
        report(),
        [{ captureRef: 'capture-02', viewRole: 'frontal' }],
        keys,
        v,
      ),
    ).toThrow();
    const mismatched = report();
    mismatched.statusCounts.candidate_only = 2;
    expect(() => projectPrivatePhotoReadiness(mismatched, captures, keys, v)).toThrow();
  });
});
