import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { FR293_PRODUCT_COLUMN_MAP } from '../packages/face-reading/src/rgb-selfie-product-column-map-fr293.js';
import { FR294_HARD_GAP_FRONTIER } from '../packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.js';
import { traceFr294PhotoHardGaps } from '../tools/face-reading/two-view/fr294-photo-gap-bridge.mjs';
import { PARSING_VERSION } from '../tools/face-reading/two-view/parsing-contract.mjs';
import {
  FR294_REGION_QUALITY_VERSION,
  traceFr294ImageRegionQuality,
} from '../tools/face-reading/two-view/fr294-image-region-quality.mjs';

const source = readFileSync(
  'packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.ts',
  'utf8',
);
const keys = FR293_PRODUCT_COLUMN_MAP.map((x) => x.featureKey);
const hardKeys = new Set(FR294_HARD_GAP_FRONTIER.map((x) => x.featureKey));
const featureNames = [
  'forehead.visible_width_shape',
  'forehead.visible_hairline_boundary',
  'eyebrow.visible_hair_density_texture',
  'eye.eyelid_crease_or_hooded_category',
  'mouth.visible_lip_color',
  'ear.visible_boundary_height_shape',
];
function sampleParsing() {
  const counts = Array(19).fill(0);
  counts[1] = 900;
  counts[2] = 50;
  counts[3] = 40;
  counts[4] = 25;
  counts[5] = 26;
  counts[7] = 10;
  counts[8] = 12;
  counts[10] = 100;
  counts[12] = 40;
  counts[13] = 42;
  counts[0] = 512 * 512 - counts.reduce((n, v) => n + v, 0);
  return {
    methodVersion: PARSING_VERSION,
    candidateOnly: true,
    status: 'completed',
    counts,
    interfacePixels: 20,
    regionScreening: {
      regions: Object.fromEntries(
        ['skin', 'nose', 'lips', 'brows', 'ears'].map((x) => [
          x,
          { status: 'screened', removedPixels: 0 },
        ]),
      ),
    },
    accuracyValidated: false,
    canonicalReceiptIssued: false,
  };
}
function fixture(n = 1, role: 'frontal' | 'profile' = 'frontal') {
  const captures = Array.from({ length: n }, (_, i) => ({
    captureRef: 'capture-' + String(i + 1).padStart(2, '0'),
    viewRole: role,
  }));
  const ready = {
    status: 'available',
    captureCount: n,
    canonicalPhotoMeasurementVerified: false,
    independentAccuracyValidated: false,
    captures: Object.fromEntries(
      captures.map((x) => [
        x.captureRef,
        {
          viewRole: role,
          features: keys.map((key) => ({
            featureKey: key,
            state: hardKeys.has(key) ? 'unavailable' : 'calculation_only',
            reason: hardKeys.has(key)
              ? 'CURRENT_RGB_AUTHORITY_UNAVAILABLE'
              : 'CANONICAL_CALCULATOR_WITHOUT_VERIFIED_PHOTO_INPUT',
          })),
        },
      ]),
    ),
  };
  const gaps = traceFr294PhotoHardGaps(source, ready, keys);
  const parsing = captures.map((x) => ({ captureRef: x.captureRef, parsing: sampleParsing() }));
  return { gaps, captures, parsing };
}
const project = (fixtureData: ReturnType<typeof fixture>) =>
  traceFr294ImageRegionQuality(fixtureData.gaps, fixtureData.captures, fixtureData.parsing);
function byFeature(
  rows: readonly { featureKey: string; modelRegionScreening: string }[],
  key: string,
) {
  return rows.find((x) => x.featureKey === key)?.modelRegionScreening;
}
describe('FR294 existing parser quality is only a noncanonical candidate', () => {
  it('maps the exact 6 source hard-gaps without inferring density/colour/crease', () => {
    const r = project(fixture());
    expect(r).toMatchObject({
      schemaVersion: FR294_REGION_QUALITY_VERSION,
      captureCount: 1,
      mappedFeatureCount: 6,
      modelRegionScreeningOnly: true,
      anatomicalFeatureVisibilityVerified: false,
      colorCalibrationValidated: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      productInterpretationAuthorized: false,
    });
    const rows = r.captures['capture-01']!;
    expect(rows.map((x) => x.featureKey)).toEqual(featureNames);
    for (const feature of featureNames) {
      expect(byFeature(rows, feature)).toBe(
        [
          'forehead.visible_width_shape',
          'forehead.visible_hairline_boundary',
          'eye.eyelid_crease_or_hooded_category',
        ].includes(feature)
          ? 'unspecific_region_proxy'
          : 'screened_region_proxy',
      );
    }
    expect(
      rows.every(
        (x) =>
          x.anatomicalFeatureVisibilityVerified === false &&
          x.independentHumanReferenceValidated === false &&
          x.canonicalF0Admitted === false,
      ),
    ).toBe(true);
  });
  it('does not treat unanchored candidate or suppressed segmentation as screened', () => {
    const x = fixture();
    x.parsing[0]!.parsing.regionScreening.regions.brows!.status = 'unchecked';
    x.parsing[0]!.parsing.regionScreening.regions.lips!.status = 'suppressed';
    x.parsing[0]!.parsing.counts[7] = 0;
    x.parsing[0]!.parsing.counts[8] = 0;
    x.parsing[0]!.parsing.counts[0] += 22;
    x.parsing[0]!.parsing.interfacePixels = 0;
    const report = project(x);
    const rows = report.captures['capture-01']!;
    expect(byFeature(rows, 'eyebrow.visible_hair_density_texture')).toBe('unscreened_region_proxy');
    expect(byFeature(rows, 'mouth.visible_lip_color')).toBe('unscreened_region_proxy');
    expect(byFeature(rows, 'ear.visible_boundary_height_shape')).toBe('no_region_proxy');
    expect(byFeature(rows, 'forehead.visible_hairline_boundary')).toBe('no_region_proxy');
  });
  it('does not admit profile as frontal detail evidence', () => {
    const report = project(fixture(1, 'profile'));
    const rows = report.captures['capture-01']!;
    expect(
      rows.filter((x) => x.modelRegionScreening === 'profile_not_frontal_evidence'),
    ).toHaveLength(5);
    expect(byFeature(rows, 'ear.visible_boundary_height_shape')).toBe('screened_region_proxy');
    expect(report.anatomicalFeatureVisibilityVerified).toBe(false);
  });
  it('keeps all six features pending if parsing did not finish', () => {
    const x = fixture();
    x.parsing[0]!.parsing = {
      methodVersion: PARSING_VERSION,
      candidateOnly: true,
      status: 'failed',
      reason: 'PARSING_TIMEOUT',
    } as unknown as ReturnType<typeof sampleParsing>;
    const result = project(x);
    expect(
      result.captures['capture-01']!.every(
        (row) => row.modelRegionScreening === 'parsing_unavailable',
      ),
    ).toBe(true);
  });
  it('fails closed on source capture mismatch, parsing drift and forged accuracy', () => {
    const x = fixture();
    x.parsing[0]!.captureRef = 'capture-99';
    expect(() => project(x)).toThrow('FR294_REGION_QUALITY_INVALID');
    const y = fixture();
    y.parsing[0]!.parsing.candidateOnly = false;
    expect(() => project(y)).toThrow('FR294_REGION_QUALITY_INVALID');
    const z = fixture();
    z.parsing[0]!.parsing.accuracyValidated = true;
    expect(() => project(z)).toThrow('FR294_REGION_QUALITY_INVALID');
    const a = fixture();
    a.parsing[0]!.parsing.regionScreening.regions.brows!.status = 'certified';
    expect(() => project(a)).toThrow('FR294_REGION_QUALITY_INVALID');
    const b = fixture();
    b.parsing[0]!.parsing.counts[0]++;
    expect(() => project(b)).toThrow('FR294_REGION_QUALITY_INVALID');
  });
  it('projects 18×6 technical states only, no biometric counts or source paths', () => {
    const report = project(fixture(18));
    expect(report.captureCount).toBe(18);
    expect(
      Object.values(report.aggregate).every(
        (status) => Object.values(status).reduce((sum, n) => sum + n, 0) === 18,
      ),
    ).toBe(true);
    expect(Object.values(report.captures).every((rows) => rows.length === 6)).toBe(true);
    expect(JSON.stringify(report)).not.toMatch(
      /sourceSha256|sourcePath|coordinates|pixelCounts|interfacePixels|segments|landmarks/,
    );
  });
});

describe('FR294 parser evidence reasons remain distinct from photo diagnoses', () => {
  const evidence = (result: ReturnType<typeof project>, key: string) =>
    result.captures['capture-01']!.find((x) => x.featureKey === key)!.modelRegionEvidence;

  it('distinguishes missing class, unchecked location and explicitly suppressed location', () => {
    const brow = 'eyebrow.visible_hair_density_texture';
    const ear = 'ear.visible_boundary_height_shape';
    const lips = 'mouth.visible_lip_color';
    const a = fixture();
    a.parsing[0]!.parsing.regionScreening.regions.brows!.status = 'unchecked';
    expect(evidence(project(a), brow)).toBe('region_screening_unchecked');
    const b = fixture();
    b.parsing[0]!.parsing.regionScreening.regions.ears!.status = 'suppressed';
    expect(evidence(project(b), ear)).toBe('region_screening_suppressed');
    const c = fixture();
    c.parsing[0]!.parsing.counts[12] = 0;
    c.parsing[0]!.parsing.counts[13] = 0;
    c.parsing[0]!.parsing.counts[0] += 82;
    expect(evidence(project(c), lips)).toBe('region_class_not_returned');
    const d = project(fixture());
    expect(evidence(d, ear)).toBe('region_screened_candidate_only');
    expect(
      d.captures['capture-01']!.find((x) => x.featureKey === ear)
        ?.anatomicalFeatureVisibilityVerified,
    ).toBe(false);
  });

  it('does not infer a visible hairline from skin or a crease from eye class', () => {
    const result = project(fixture());
    expect(evidence(result, 'forehead.visible_width_shape')).toBe('skin_class_candidate_only');
    expect(evidence(result, 'forehead.visible_hairline_boundary')).toBe(
      'hair_skin_contact_candidate_only',
    );
    expect(evidence(result, 'eye.eyelid_crease_or_hooded_category')).toBe(
      'eye_class_candidate_only',
    );
    expect(result.independentAccuracyValidated).toBe(false);
    expect(result.canonicalF0Admitted).toBe(false);
  });

  it('preserves exactly 18 per-feature reasons without exporting raw pixels', () => {
    const result = project(fixture(18));
    expect(result.schemaVersion).toBe('local-fr294-parsing-region-quality@0.2.0');
    for (const [key, codes] of Object.entries(result.evidenceCounts)) {
      expect(featureNames).toContain(key);
      expect(Object.values(codes).reduce((sum, n) => sum + n, 0)).toBe(18);
    }
    const serialized = JSON.stringify(result);
    expect(serialized).not.toMatch(
      /sourceSha256|sourcePath|rawPixels|maskBuffer|landmarks|interfacePixels|segments/,
    );
    expect(result.modelRegionScreeningOnly).toBe(true);
    expect(result.anatomicalFeatureVisibilityVerified).toBe(false);
  });

  it('uses a view or parsing reason instead of treating unavailable data as anatomical absence', () => {
    const sideways = project(fixture(1, 'profile'));
    expect(evidence(sideways, 'eyebrow.visible_hair_density_texture')).toBe(
      'frontal_view_not_available',
    );
    const missing = fixture();
    missing.parsing[0]!.parsing = {
      methodVersion: PARSING_VERSION,
      candidateOnly: true,
      status: 'failed',
      reason: 'PARSING_TIMEOUT',
    } as unknown as ReturnType<typeof sampleParsing>;
    expect(evidence(project(missing), 'ear.visible_boundary_height_shape')).toBe(
      'parsing_not_completed',
    );
  });
});
