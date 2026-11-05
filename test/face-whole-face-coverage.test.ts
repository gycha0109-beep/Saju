import { describe, it, expect } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from '../packages/face-reading/src/rgb-selfie-product-column-map-fr293.js';
import {
  summarizeWholeFaceCoverage,
  COVERAGE_VERSION,
} from '../tools/face-reading/two-view/feature-coverage.mjs';
import {
  METHOD_VERSION,
  METRIC_DEFINITIONS,
} from '../tools/face-reading/two-view/frontal-metrics.mjs';
import { PARSING_VERSION } from '../tools/face-reading/two-view/parsing-contract.mjs';
import { unavailableMorphology } from '../tools/face-reading/two-view/morphology-geometry.mjs';
import { unavailableEyeDirection } from '../tools/face-reading/two-view/eye-direction.mjs';

const feature = (report: ReturnType<typeof summarizeWholeFaceCoverage>, key: string) =>
  report.features.find((entry: { featureKey: string }) => entry.featureKey === key);

function metrics(captureRef: string) {
  return METRIC_DEFINITIONS.map((entry) => ({
    metricKey: 'engineering.frontal.' + entry.id,
    captureRef,
    viewRole: 'frontal',
    candidateOnly: true,
    methodVersion: METHOD_VERSION,
    status: 'available',
    value: 0.3,
    unit: 'ratio',
  }));
}
function parsing() {
  return {
    methodVersion: PARSING_VERSION,
    candidateOnly: true,
    status: 'completed',
    counts: [512 * 512, ...Array(18).fill(0)],
    interfacePixels: 0,
    earRefinement: { status: 'unavailable', reason: 'NO_SINGLE_FACE', pixels: 0 },
    instanceRefinement: { status: 'unavailable', reason: 'NO_FACES' },
    regionScreening: {
      backgroundRemoved: 0,
      regions: Object.fromEntries(
        ['skin', 'nose', 'lips', 'brows', 'ears'].map((id) => [
          id,
          { status: 'unchecked', removedPixels: 0 },
        ]),
      ),
    },
    profile: { status: 'not_requested' },
    eyeDirection: unavailableEyeDirection('NO_SINGLE_FACE'),
    morphology: unavailableMorphology('NO_SINGLE_FACE'),
  };
}

describe('local canonical whole-face coverage audit', () => {
  it('uses the actual FR293 29-key map and keeps 18 calculators separate from photograph evidence', () => {
    const report = summarizeWholeFaceCoverage(FR293_PRODUCT_COLUMN_MAP, []);
    expect(report.schemaVersion).toBe(COVERAGE_VERSION);
    expect(report.canonicalFeatureCount).toBe(29);
    expect(report.canonicalCalculatorMaterializedCount).toBe(18);
    expect(report.unresolvedCanonicalCount).toBe(11);
    expect(report.featuresWithLocalPhotoProxy).toBe(0);
    expect(
      report.features.every(
        (x: { canonicalPhotoMeasurementVerified: boolean }) =>
          x.canonicalPhotoMeasurementVerified === false,
      ),
    ).toBe(true);
  });

  it('maps available image-plane metrics only to narrow research proxies, not F0 authority', () => {
    const report = summarizeWholeFaceCoverage(FR293_PRODUCT_COLUMN_MAP, [
      { captureRef: 'capture-01', viewRole: 'frontal', metrics: metrics('capture-01') },
    ]);
    expect(feature(report, 'eye.width_height_ratio')).toMatchObject({
      candidatePhotoCount: 1,
      localEvidenceState: 'partial_engineering_proxy_only',
      canonicalPhotoMeasurementVerified: false,
      traditionalBindingApplied: false,
    });
    expect(feature(report, 'eye.bilateral_shape_asymmetry')?.candidatePhotoCount).toBe(1);
    expect(feature(report, 'mouth.width_and_relative_size')?.candidatePhotoCount).toBe(1);
    expect(feature(report, 'chin_lower_face.visible_width_ratio')?.candidatePhotoCount).toBe(1);
    expect(feature(report, 'nose.tip_bridge_relative_projection')).toMatchObject({
      candidatePhotoCount: 0,
      localEvidenceState: 'no_local_photo_evidence',
    });
    expect(feature(report, 'ear.thickness_attachment_canal_boundary')).toMatchObject({
      localEvidenceState: 'unavailable_by_current_authority',
      candidatePhotoCount: 0,
    });
  });

  it('recognizes validated brow, lip and nose model *proxies* without promoting named forms', () => {
    const base = parsing();
    const report = summarizeWholeFaceCoverage(FR293_PRODUCT_COLUMN_MAP, [
      {
        captureRef: 'capture-02',
        viewRole: 'frontal',
        metrics: [],
        parsing: {
          ...base,
          morphology: {
            ...base.morphology,
            browSpan: { status: 'available', ratios: [1.1, 1.2] },
            lipBalance: { status: 'available', upper: 0.1, lower: 0.2, opening: 0.03 },
            noseExtent: { status: 'available', widthToEyeSpacing: 0.32, heightToEyeSpacing: 0.5 },
          },
        },
      },
    ]);
    for (const key of [
      'eyebrow.span_arch_tail_orientation',
      'mouth.visible_lip_fullness',
      'nose.alar_width_and_nostril_geometry',
    ])
      expect(feature(report, key)).toMatchObject({
        candidatePhotoCount: 1,
        canonicalPhotoMeasurementVerified: false,
        traditionalBindingApplied: false,
      });
    expect(feature(report, 'eyebrow.visible_hair_density_texture')?.candidatePhotoCount).toBe(0);
    expect(feature(report, 'forehead.visible_hairline_boundary')?.candidatePhotoCount).toBe(0);
  });

  it('does not accept a profile as frontal metric evidence or invent hidden anatomy', () => {
    const report = summarizeWholeFaceCoverage(FR293_PRODUCT_COLUMN_MAP, [
      { captureRef: 'capture-03', viewRole: 'profile', metrics: metrics('capture-03') },
    ]);
    expect(report.profileCaptureCount).toBe(1);
    expect(report.featuresWithLocalPhotoProxy).toBe(0);
  });

  it('fails closed on forged parser authority and duplicated capture references', () => {
    const a = {
      captureRef: 'capture-04',
      viewRole: 'frontal',
      metrics: [],
      parsing: {
        ...parsing(),
        morphology: {
          ...unavailableMorphology('NO_SINGLE_FACE'),
          traditionalBindingAuthorized: true,
        },
      },
    };
    expect(() => summarizeWholeFaceCoverage(FR293_PRODUCT_COLUMN_MAP, [a])).toThrow();
    expect(() =>
      summarizeWholeFaceCoverage(FR293_PRODUCT_COLUMN_MAP, [
        { captureRef: 'capture-04', viewRole: 'frontal', metrics: [] },
        { captureRef: 'capture-04', viewRole: 'profile', metrics: [] },
      ]),
    ).toThrow('COVERAGE_CAPTURE_INVALID');
  });

  it('never emits raw private paths, face IDs, landmarks or original saved geometry', () => {
    const privatePath = 'C:\\PRIVATE\\source-face-123.jpg';
    const report = summarizeWholeFaceCoverage(FR293_PRODUCT_COLUMN_MAP, [
      {
        captureRef: 'private-unique-01',
        viewRole: 'frontal',
        metrics: metrics('private-unique-01'),
        sourcePath: privatePath,
        rawLandmarks: [{ x: 123, y: 456 }],
      },
    ]);
    const serialized = JSON.stringify(report);
    expect(serialized).not.toContain(privatePath);
    expect(serialized).not.toContain('private-unique-01');
    expect(serialized).not.toContain('rawLandmarks');
    expect(serialized).toContain('local_research_only');
    expect(report.productionAuthorized).toBe(false);
  });
});
