import { describe, expect, it } from 'vitest';
import {
  CURRENT_2D_EVIDENCE_VERSION,
  summarizeCurrent2dPhotoEvidence,
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
