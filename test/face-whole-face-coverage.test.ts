import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { FR293_PRODUCT_COLUMN_MAP } from '../packages/face-reading/src/rgb-selfie-product-column-map-fr293.js';
import { FR282_RGB_SELFIE_FEATURE_ENTRIES } from '../packages/face-reading/src/rgb-selfie-feature-authority-matrix-fr282.js';
import {
  summarizeWholeFaceCoverage,
  COVERAGE_VERSION,
  traceWholeFaceSourceGaps,
  SOURCE_TRACE_VERSION,
  traceWholeFaceExtensionRequirements,
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
      viewRole: 'frontal' as const,
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

describe('human review evidence in whole-face coverage', () => {
  const capture = { captureRef: 'reviewed-01', viewRole: 'frontal' as const, metrics: [] };
  const review = {
    captureRef: 'reviewed-01',
    imageLeft: 'visible',
    imageRight: 'no_visible_crease',
    humanReviewed: true,
    independentAccuracyValidated: false,
    modelTrainingAuthorized: false,
  };

  it('connects one local eyelid review to the existing canonical feature without accuracy promotion', () => {
    const report = summarizeWholeFaceCoverage(FR293_PRODUCT_COLUMN_MAP, [capture], [review]);
    const eye = feature(report, 'eye.eyelid_crease_or_hooded_category');
    expect(eye).toMatchObject({
      humanReviewPhotoCount: 1,
      humanReviewState: 'single_reviewer_unverified',
      humanReviewLabelCounts: {
        imageLeft: { visible: 1 },
        imageRight: { no_visible_crease: 1 },
      },
      humanReviewAccuracyValidated: false,
      canonicalPhotoMeasurementVerified: false,
      traditionalBindingApplied: false,
      productInterpretationAuthorized: false,
    });
    expect(report.humanReviewedCaptureCount).toBe(1);
    expect(report.humanReviewFeatureCount).toBe(1);
    expect(report.humanReviewAccuracyValidated).toBe(false);
    expect(report.actualHumanAccuracyVerified).toBe(false);
    expect(JSON.stringify(report)).not.toContain('reviewed-01');
  });

  it('keeps human labels distinct from model candidates and exposes the next independent review requirement', () => {
    const trace = traceWholeFaceSourceGaps(
      FR293_PRODUCT_COLUMN_MAP,
      FR282_RGB_SELFIE_FEATURE_ENTRIES,
      [capture],
      [review],
    );
    const eye = trace.features.find(
      (row) => row.featureKey === 'eye.eyelid_crease_or_hooded_category',
    );
    expect(eye).toMatchObject({
      localPhotoProxyCount: 0,
      localHumanReviewCount: 1,
      humanReviewState: 'single_reviewer_unverified',
      humanReviewAccuracyValidated: false,
      independentAccuracyState: 'not_evaluated',
      traditionalBindingIssued: false,
      interpretationAuthorized: false,
    });
    expect(eye?.nextMissingEvidence).toBe(
      'independent_second_reviewer_and_repeat_capture_validation',
    );
    expect(trace.humanReviewedCaptureCount).toBe(1);
    expect(trace.humanReviewAccuracyValidated).toBe(false);
    expect(JSON.stringify(trace)).not.toContain('reviewed-01');
  });

  it('rejects profile, duplicate, invalid and authority-elevated human review labels', () => {
    expect(() =>
      summarizeWholeFaceCoverage(
        FR293_PRODUCT_COLUMN_MAP,
        [{ ...capture, viewRole: 'profile' }],
        [review],
      ),
    ).toThrow('COVERAGE_HUMAN_REVIEW_INVALID');
    expect(() =>
      summarizeWholeFaceCoverage(FR293_PRODUCT_COLUMN_MAP, [capture], [review, review]),
    ).toThrow('COVERAGE_HUMAN_REVIEW_INVALID');
    expect(() =>
      summarizeWholeFaceCoverage(
        FR293_PRODUCT_COLUMN_MAP,
        [capture],
        [{ ...review, imageLeft: 'not_a_review_state' }],
      ),
    ).toThrow('COVERAGE_HUMAN_REVIEW_INVALID');
    expect(() =>
      summarizeWholeFaceCoverage(
        FR293_PRODUCT_COLUMN_MAP,
        [capture],
        [{ ...review, independentAccuracyValidated: true }],
      ),
    ).toThrow('COVERAGE_HUMAN_REVIEW_INVALID');
  });
});

describe('source-derived whole-face execution trace', () => {
  it('ties every FR293 calculator to the matching FR282 observation and evidence gap', () => {
    const trace = traceWholeFaceSourceGaps(
      FR293_PRODUCT_COLUMN_MAP,
      FR282_RGB_SELFIE_FEATURE_ENTRIES,
      [],
    );
    expect(trace.schemaVersion).toBe(SOURCE_TRACE_VERSION);
    expect(trace.canonicalFeatureCount).toBe(29);
    expect(trace.calculatedOnlyOrUnverifiedCount).toBe(18);
    expect(trace.featuresWithLocalEngineeringProxy).toBe(0);
    expect(trace.sourcePredicateMappingsAdmitted).toBe(0);
    expect(trace.features.every((row) => row.independentAccuracyState === 'not_evaluated')).toBe(
      true,
    );
    const eye = trace.features.find((row) => row.featureKey === 'eye.width_height_ratio');
    expect(eye).toMatchObject({
      photoEvidenceState: 'calculation_only',
      canonicalPhotoMeasurementVerified: false,
      traditionalBindingIssued: false,
      nextMissingEvidence: 'actual_photo_extraction_and_independent_human_reference',
    });
    expect(eye?.implementationSourcePaths.length).toBeGreaterThan(0);
    expect(
      trace.features.find((row) => row.featureKey === 'ear.thickness_attachment_canal_boundary'),
    ).toMatchObject({
      photoEvidenceState: 'unavailable',
      nextMissingEvidence: 'current_rgb_authority_unavailable',
    });
  });

  it('exposes a local engineering photo proxy without promoting a canonical measurement', () => {
    const trace = traceWholeFaceSourceGaps(
      FR293_PRODUCT_COLUMN_MAP,
      FR282_RGB_SELFIE_FEATURE_ENTRIES,
      [{ captureRef: 'capture-21', viewRole: 'frontal', metrics: metrics('capture-21') }],
    );
    expect(trace.features.find((row) => row.featureKey === 'eye.width_height_ratio')).toMatchObject(
      {
        photoEvidenceState: 'candidate_only',
        localPhotoProxyCount: 1,
        canonicalPhotoMeasurementVerified: false,
        traditionalSourcePredicateMapped: false,
        interpretationAuthorized: false,
        nextMissingEvidence: 'canonical_input_binding_and_independent_human_reference',
      },
    );
    expect(JSON.stringify(trace)).not.toContain('capture-21');
  });

  it('rejects mismatched, partial or authority-elevated FR282 input', () => {
    const a = [...FR282_RGB_SELFIE_FEATURE_ENTRIES];
    expect(() => traceWholeFaceSourceGaps(FR293_PRODUCT_COLUMN_MAP, a.slice(1), [])).toThrow(
      'COVERAGE_AUTHORITY_DRIFT',
    );
    const mismatched = a.map((entry, index) =>
      index === 0 ? { ...entry, regionKey: 'eye_pair' } : entry,
    );
    expect(() => traceWholeFaceSourceGaps(FR293_PRODUCT_COLUMN_MAP, mismatched, [])).toThrow(
      'COVERAGE_AUTHORITY_DRIFT',
    );
    const elevated = a.map((entry, index) =>
      index === 0 ? { ...entry, traditionalBindingIssued: true } : entry,
    );
    expect(() =>
      traceWholeFaceSourceGaps(
        FR293_PRODUCT_COLUMN_MAP,
        elevated as unknown as typeof FR282_RGB_SELFIE_FEATURE_ENTRIES,
        [],
      ),
    ).toThrow('COVERAGE_AUTHORITY_DRIFT');
  });
});

describe('document-driven extension requirement trace', () => {
  const source = readFileSync(
    new URL('../research/face-reading/whole-face-feature-mapping-20261105.md', import.meta.url),
    'utf8',
  );
  const keys = FR293_PRODUCT_COLUMN_MAP.map((entry) => entry.featureKey);

  it('cross-checks all 18 noncanonical requirements against their two source tables', () => {
    const trace = traceWholeFaceExtensionRequirements(source, keys);
    expect(trace.extensionRequirementCount).toBe(18);
    expect(trace.canonicalKeyCountUnchanged).toBe(29);
    expect(trace.allExtensionsUnapproved).toBe(true);
    expect(
      trace.features.find((item) => item.requirement === '미간 실제 눈썹 사이 거리'),
    ).toMatchObject({
      existingCanonicalFeatureKeys: [
        'eyebrow.span_arch_tail_orientation',
        'eye.inter_eye_spacing_ratio',
      ],
      traditionalBindingIssued: false,
      independentAccuracyState: 'not_evaluated',
    });
    expect(trace.features.every((item) => item.productInterpretationAuthorized === false)).toBe(
      true,
    );
  });

  it('accepts LF and Windows CRLF without weakening source table drift checks', () => {
    const lf = source.replace(/\r\n/g, '\n');
    const crlf = lf.replace(/\n/g, '\r\n');
    const first = traceWholeFaceExtensionRequirements(lf, keys);
    const second = traceWholeFaceExtensionRequirements(crlf, keys);
    expect(second).toEqual(first);
    expect(second.extensionRequirementCount).toBe(18);
  });

  it('rejects missing or reordered extension source rows and duplicate canonical keys', () => {
    expect(() =>
      traceWholeFaceExtensionRequirements(
        source.replace('미간 실제 눈썹 사이 거리', 'REMOVED'),
        keys,
      ),
    ).toThrow('COVERAGE_EXTENSION_SOURCE_DRIFT');
    expect(() => traceWholeFaceExtensionRequirements(source, [...keys.slice(1), keys[1]!])).toThrow(
      'COVERAGE_EXTENSION_SOURCE_DRIFT',
    );
  });
});
