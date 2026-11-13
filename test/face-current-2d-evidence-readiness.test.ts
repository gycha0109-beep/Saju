import { describe, expect, it } from 'vitest';
import {
  CURRENT_2D_EVIDENCE_VERSION,
  CURRENT_2D_BATCH_EVIDENCE_VERSION,
  summarizeCurrent2dPhotoEvidence,
  summarizeCurrent2dSessionCoverage,
} from '../tools/face-reading/two-view/current-2d-evidence-readiness.mjs';
import { PARSING_VERSION } from '../tools/face-reading/two-view/parsing-contract.mjs';

const flags = {
  candidateOnly: true,
  independentAccuracyValidated: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
};
const line = (x: number) => ({
  status: 'marked',
  segments: [[[x, 0.32], [x + 0.10, 0.31], [x + 0.18, 0.32]]],
});
function eyelidReview() {
  return {
    humanReviewed: true,
    actualAnatomicalContourValidated: false,
    anatomicalLateralityAssigned: false,
    eyelidProjectionMeasured: false,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    modelTrainingAuthorized: false,
    imageLeft: {
      upperLidMargin: line(0.11),
      creaseLine: line(0.11),
      hoodingBoundary: line(0.11),
    },
    imageRight: {
      upperLidMargin: line(0.61),
      creaseLine: line(0.61),
      hoodingBoundary: line(0.61),
    },
  };
}
const forehead = {
  ...flags, methodVersion: 'engineering.visible-forehead-skin-band@0.1.0',
  anatomicalForeheadBoundaryValidated: false,
  anatomicalHairlineAuthorized: false,
  status: 'available',
  modelContacts: Array.from({ length: 3 }, () => ({ status: 'available' })),
};
const texture = {
  ...flags, methodVersion: 'engineering.visible-brow-pixel-texture@0.1.0',
  individualHairFibresIdentified: false,
  hairDensityMeasured: false,
  status: 'available',
};
const lip = {
  ...flags, methodVersion: 'engineering.visible-lip-pixel-color@0.1.0',
  colorCalibrated: false, whiteBalanceVerified: false,
  illuminationControlled: false, makeupExcluded: false,
  trueAnatomicalLipColorValidated: false,
  status: 'available',
};
const earMask = {
  candidateOnly: true, independentAccuracyValidated: false,
  anatomicalLateralityAssigned: false, status: 'available',
};
const earCurve = {
  ...flags, methodVersion: 'engineering.ear-rim-class-boundary-curve@0.1.0',
  drawingCoverageCertified: false,
  anatomicalOuterRimValidated: false,
  status: 'available',
};
const ready = (more: Record<string, unknown> = {}) =>
  summarizeCurrent2dPhotoEvidence({
    viewRole: 'frontal',
    parsing: { status: 'completed', methodVersion: PARSING_VERSION },
    foreheadSkinCandidate: forehead,
    browPixelTextureCandidate: texture,
    lipPixelColorCandidate: lip,
    earMaskCandidate: earMask,
    earRimCurveComparison: { revision: 2, status: 'completed', value: earCurve },
    currentEarRevision: 2,
    eyelidReview: eyelidReview(),
    ...more,
  });
const states = (summary: ReturnType<typeof ready>) =>
  Object.fromEntries(summary.features.map(({ featureKey, state }) => [featureKey, state]));

describe('same-photo current research 2D gap evidence', () => {
  it('reports precisely six FR294 image and ear-visibility hard gaps without release authority', () => {
    const report = ready();
    expect(report).toMatchObject({
      methodVersion: CURRENT_2D_EVIDENCE_VERSION,
      featureCount: 6,
      empiricalValidationCompleted: false,
      canonicalFeatureCountUnchanged: 29,
      unresolvedHardGapsUnchanged: 11,
      rawSourcePersistedOrEmitted: false,
    });
    expect(new Set(report.features.map((row) => row.featureKey)).size).toBe(6);
    expect(Object.values(states(report)).every((state) => state === 'candidate_only')).toBe(true);
    expect(report.features.every((row) =>
      row.independentAccuracyValidated === false &&
      row.canonicalF0Admitted === false &&
      row.traditionalBindingAuthorized === false &&
      row.productInterpretationAuthorized === false,
    )).toBe(true);
    expect(JSON.stringify(report)).not.toMatch(/sourceSha|captureRef|segments|rawMask|landmarks|meanEncodedSrgbChannels|coordinates|revision/);
  });

  it('does not turn forehead skin pixels into a hairline without visible contacts', () => {
    const report = ready({
      foreheadSkinCandidate: { ...forehead, modelContacts: [{ status: 'partial' }] },
    });
    expect(states(report)['forehead.visible_width_shape']).toBe('candidate_only');
    expect(states(report)['forehead.visible_hairline_boundary']).toBe('unavailable');
  });

  it('preserves partial and absent evidence per feature without rejecting the whole photo', () => {
    const report = ready({
      browPixelTextureCandidate: { ...texture, status: 'partial' },
      lipPixelColorCandidate: null,
      eyelidReview: null,
      earMaskCandidate: earMask,
      earRimCurveComparison: { revision: 1, status: 'completed', value: earCurve },
    });
    expect(states(report)).toMatchObject({
      'eyebrow.visible_hair_density_texture': 'partial',
      'eye.eyelid_crease_or_hooded_category': 'unavailable',
      'mouth.visible_lip_color': 'not_evaluated',
      'ear.visible_boundary_height_shape': 'partial',
      'forehead.visible_width_shape': 'candidate_only',
    });
  });

  it('blocks fabricated F0 or version authority and old parsing previews', () => {
    const report = ready({
      lipPixelColorCandidate: { ...lip, canonicalF0Admitted: true },
    });
    expect(states(report)['mouth.visible_lip_color']).toBe('unavailable');
    expect(report.features.find((f) => f.featureKey === 'mouth.visible_lip_color')?.reason)
      .toBe('CANDIDATE_AUTHORITY_OR_VERSION_INVALID');
    const previous = ready({ previous: true });
    expect(Object.values(states(previous)).every((state) => state === 'not_evaluated')).toBe(true);
    expect(Object.values(states(ready({ viewRole: 'profile' }))).every((state) => state === 'unavailable')).toBe(true);
    expect(Object.values(states(ready({
      parsing: { status: 'completed', methodVersion: 'old-version' },
    }))).every((state) => state === 'not_evaluated')).toBe(true);
  });

  it('refuses to interpret an unreviewed eyelid model eye class as a crease category', () => {
    const report = ready({ eyelidReview: null });
    expect(states(report)['eye.eyelid_crease_or_hooded_category']).toBe('unavailable');
    expect(report.features.find((f) => f.featureKey === 'eye.eyelid_crease_or_hooded_category')?.reason)
      .toBe('HUMAN_EYELID_LINE_REVIEW_REQUIRED');
  });
});


describe('source-free aggregate of already computed current 2D photo statuses', () => {
  it('counts six status buckets across two photos without treating candidate counts as accuracy', () => {
    const first = ready();
    const second = ready({
      eyelidReview: null,
      lipPixelColorCandidate: null,
      browPixelTextureCandidate: { ...texture, status: 'partial' },
    });
    const aggregate = summarizeCurrent2dSessionCoverage([first, second]);
    expect(aggregate).toMatchObject({
      methodVersion: CURRENT_2D_BATCH_EVIDENCE_VERSION,
      status: 'unverified_local_preview_coverage_only',
      includedPhotoCount: 2,
      featureCount: 6,
      totalPhotoFeatureEntries: 12,
      independentAccuracyValidated: false,
      independentRepeatabilityValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      rawSourcePersistedOrEmitted: false,
      statusCounts: {
        candidate_only: 9,
        partial: 1,
        unavailable: 1,
        not_evaluated: 1,
      },
    });
    expect(aggregate.features.find((r) => r.featureKey === 'mouth.visible_lip_color'))
      .toMatchObject({ candidate_only: 1, not_evaluated: 1 });
    expect(JSON.stringify(aggregate)).not.toMatch(
      /captureRef|sourceSha|sourcePath|segments|imageBytes|landmarks|pixel|coordinates|reviewedAt/,
    );
  });

  it('keeps missing analysis as not-evaluated, with zero evidence counted as accuracy', () => {
    const report = summarizeCurrent2dSessionCoverage([
      ready({ parsing: { status: 'failed' } }),
      ready({ viewRole: 'profile' }),
    ]);
    expect(report.includedPhotoCount).toBe(2);
    expect(report.statusCounts).toMatchObject({
      not_evaluated: 6,
      unavailable: 6,
      candidate_only: 0,
      partial: 0,
    });
    expect(report.independentAccuracyValidated).toBe(false);
    const empty = summarizeCurrent2dSessionCoverage([]);
    expect(empty.includedPhotoCount).toBe(0);
    expect(empty.totalPhotoFeatureEntries).toBe(0);
  });

  it('rejects invented authority, unknown states and mismatched feature records', () => {
    const source = ready();
    const row = source.features[0];
    const fabricated = {
      ...source,
      features: [
        { ...row, canonicalF0Admitted: true },
        ...source.features.slice(1),
      ],
    };
    expect(() => summarizeCurrent2dSessionCoverage([
      fabricated as unknown as ReturnType<typeof ready>,
    ])).toThrow('CURRENT_2D_SESSION_AUTHORITY_INVALID');
    const reordered = { ...source, features: [...source.features].reverse() };
    expect(() => summarizeCurrent2dSessionCoverage([reordered]))
      .toThrow('CURRENT_2D_SESSION_AUTHORITY_INVALID');
    const bad = { ...source, rawSourcePersistedOrEmitted: true };
    expect(() => summarizeCurrent2dSessionCoverage([
      bad as unknown as ReturnType<typeof ready>,
    ])).toThrow('CURRENT_2D_SESSION_SOURCE_INVALID');
    expect(() => summarizeCurrent2dSessionCoverage(null as never))
      .toThrow('CURRENT_2D_SESSION_INPUT_INVALID');
  });
});
