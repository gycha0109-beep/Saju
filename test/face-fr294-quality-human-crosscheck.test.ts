import { describe, it, expect } from 'vitest';
import {
  crosscheckFr294QualityAndHumanReview,
  withheldFr294QualityHumanCrosscheck,
  FR294_QUALITY_HUMAN_CROSSCHECK_VERSION,
} from '../tools/face-reading/two-view/fr294-quality-human-crosscheck.mjs';
const keys = [
  'forehead.visible_width_shape',
  'forehead.visible_hairline_boundary',
  'eyebrow.visible_hair_density_texture',
  'eye.eyelid_crease_or_hooded_category',
  'mouth.visible_lip_color',
  'ear.visible_boundary_height_shape',
];
const paths = [
  'no_dedicated_human_review',
  'no_dedicated_human_review',
  'no_dedicated_human_review',
  'eye_fold_and_lid_contour',
  'no_dedicated_human_review',
  'ear_outline_review',
];
const screens = [
  ['unspecific_region_proxy', 'skin_class_candidate_only'],
  ['unspecific_region_proxy', 'hair_skin_contact_candidate_only'],
  ['screened_region_proxy', 'region_screened_candidate_only'],
  ['unspecific_region_proxy', 'eye_class_candidate_only'],
  ['screened_region_proxy', 'region_screened_candidate_only'],
  ['screened_region_proxy', 'region_screened_candidate_only'],
];
function fixture(n = 1) {
  const captures = Object.fromEntries(
    Array.from({ length: n }, (_, j) => {
      const ref = 'capture-' + String(j + 1).padStart(2, '0');
      return [
        ref,
        keys.map((featureKey, i) => ({
          featureKey,
          modelRegionScreening: screens[i]![0],
          modelRegionEvidence: screens[i]![1],
          anatomicalFeatureVisibilityVerified: false,
          independentHumanReferenceValidated: false,
          canonicalF0Admitted: false,
        })),
      ];
    }),
  );
  const human = Object.fromEntries(
    Object.entries(captures).map(([ref]) => [
      ref,
      keys.map((featureKey, i) => ({
        featureKey,
        reviewPath: paths[i],
        recordedHumanReview: false,
        visibleSingleReviewerAnnotation: false,
        independentHumanReferenceValidated: false,
        repeatCaptureAgreementValidated: false,
        canonicalObservationAdmitted: false,
      })),
    ]),
  );
  return {
    quality: {
      schemaVersion: 'local-fr294-parsing-region-quality@0.2.0',
      modelRegionScreeningOnly: true,
      anatomicalFeatureVisibilityVerified: false,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      productInterpretationAuthorized: false,
      mappedFeatureCount: 6,
      captureCount: n,
      captures,
    },
    human: {
      schemaVersion: 'local-fr294-human-evidence-readiness@0.1.0',
      status: 'available',
      captureCount: n,
      captures: human,
      independentHumanReferenceValidated: false,
      repeatCaptureAgreementValidated: false,
      canonicalObservationAdmitted: false,
    },
  };
}
const compute = (f: ReturnType<typeof fixture>) =>
  crosscheckFr294QualityAndHumanReview(f.quality, f.human);
describe('FR294 model region and local single-human review crosscheck', () => {
  it('does not invent review evidence from 18 previously screened photos', () => {
    const r = compute(fixture(18));
    expect(r).toMatchObject({
      schemaVersion: FR294_QUALITY_HUMAN_CROSSCHECK_VERSION,
      status: 'available',
      captureCount: 18,
      mappedFeatureCount: 6,
      modelHumanAgreementValidated: false,
      independentHumanReferenceValidated: false,
      anatomicalFeatureVisibilityVerified: false,
      canonicalF0Admitted: false,
      productInterpretationAuthorized: false,
    });
    if (r.status !== 'available') throw Error('unexpected withheld');
    expect(r.summary[keys[5]!]!.review_pending_model_screened).toBe(18);
    expect(r.summary[keys[3]!]!.review_pending_model_not_screened).toBe(18);
    expect(r.summary[keys[2]!]!.no_direct_human_review_path).toBe(18);
    expect(
      Object.values(r.captures).every(
        (rows) => rows.length === 6 && rows.every((row) => row.singleHumanReviewRecorded === false),
      ),
    ).toBe(true);
  });
  it('records screened model and single review in parallel, never agreement', () => {
    const f = fixture();
    f.human.captures['capture-01']![5]!.recordedHumanReview = true;
    f.human.captures['capture-01']![5]!.visibleSingleReviewerAnnotation = true;
    const r = compute(f);
    if (r.status !== 'available') throw Error('unexpected withheld');
    expect(r.summary[keys[5]!]!.single_review_model_screened).toBe(1);
    expect(r.captures['capture-01']![5]).toMatchObject({
      singleHumanReviewRecorded: true,
      visibleSingleReviewerAnnotation: true,
      modelHumanAgreementValidated: false,
      independentHumanReferenceValidated: false,
    });
    expect(JSON.stringify(r)).not.toMatch(/rawPoints|segments|sourceSha256|reviewerRef|sourcePath/);
  });
  it('records human review alongside unscreened model proxy, not disagreement', () => {
    const f = fixture();
    f.quality.captures['capture-01']![5]!.modelRegionScreening = 'unscreened_region_proxy';
    f.quality.captures['capture-01']![5]!.modelRegionEvidence = 'region_screening_unchecked';
    f.human.captures['capture-01']![5]!.recordedHumanReview = true;
    const r = compute(f);
    if (r.status !== 'available') throw Error('unexpected withheld');
    expect(r.summary[keys[5]!]!.single_review_model_not_screened).toBe(1);
    expect(r.modelHumanAgreementValidated).toBe(false);
  });
  it('rejects unknown capture refs, missing rows and mismatched feature keys', () => {
    const f = fixture();
    f.human.captures['capture-01']![0]!.featureKey = 'forehead.unknown';
    expect(() => compute(f)).toThrow('FR294_QUALITY_HUMAN_CROSSCHECK_INVALID');
    const g = fixture();
    delete (g.human.captures as Record<string, unknown>)['capture-01'];
    expect(() => compute(g)).toThrow();
    const h = fixture();
    h.quality.captures['capture-01']!.pop();
    expect(() => compute(h)).toThrow();
  });
  it('rejects forged geometry promotion or invented independent truth', () => {
    const f = fixture();
    f.quality.canonicalF0Admitted = true;
    expect(() => compute(f)).toThrow();
    const g = fixture();
    g.human.independentHumanReferenceValidated = true;
    expect(() => compute(g)).toThrow();
    const h = fixture();
    h.human.captures['capture-01']![5]!.canonicalObservationAdmitted = true;
    expect(() => compute(h)).toThrow();
  });
  it('rejects impossible visible annotations and made-up direct review paths', () => {
    const f = fixture();
    f.human.captures['capture-01']![3]!.visibleSingleReviewerAnnotation = true;
    expect(() => compute(f)).toThrow();
    const g = fixture();
    g.human.captures['capture-01']![2]!.recordedHumanReview = true;
    expect(() => compute(g)).toThrow();
    const h = fixture();
    h.human.captures['capture-01']![2]!.reviewPath = 'eye_fold_and_lid_contour';
    expect(() => compute(h)).toThrow();
  });
  it('rejects impossible model screening evidence pairs', () => {
    const f = fixture();
    f.quality.captures['capture-01']![5]!.modelRegionEvidence = 'region_screening_suppressed';
    expect(() => compute(f)).toThrow();
    const g = fixture();
    g.quality.captures['capture-01']![2]!.modelRegionScreening = 'observed';
    expect(() => compute(g)).toThrow();
  });
  it('withholds an incomplete source instead of guessing joint confidence', () => {
    for (const reason of [
      'MODEL_QUALITY_UNAVAILABLE',
      'HUMAN_REVIEW_UNAVAILABLE',
      'SOURCE_EVIDENCE_MISMATCH',
      'HUMAN_REVIEW_UPDATED_RELOAD_REQUIRED',
    ] as const) {
      const r = withheldFr294QualityHumanCrosscheck(reason);
      expect(r).toMatchObject({
        status: 'withheld',
        reason,
        modelHumanAgreementValidated: false,
        canonicalF0Admitted: false,
        productInterpretationAuthorized: false,
      });
    }
    expect(() =>
      withheldFr294QualityHumanCrosscheck('accuracy_validated' as 'MODEL_QUALITY_UNAVAILABLE'),
    ).toThrow();
  });
});
