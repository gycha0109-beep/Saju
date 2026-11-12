import { describe, expect, it } from 'vitest';
import {
  summarizeCurrent2dPhotoEvidence,
  diagnoseCurrent2dSessionEvidence,
} from '../tools/face-reading/two-view/current-2d-evidence-readiness.mjs';
import { PARSING_VERSION } from '../tools/face-reading/two-view/parsing-contract.mjs';

const model = (brows, lips, lipBalance, instance) => ({
  methodVersion: PARSING_VERSION,
  status: 'completed',
  regionScreening: {
    regions: {
      brows: { status: brows },
      lips: { status: lips },
    },
  },
  instanceRefinement: instance,
  morphology: { lipBalance: { status: lipBalance } },
});

describe('saved parser model missing areas vs unexecuted transient preview', () => {
  const get = (parsing) => summarizeCurrent2dPhotoEvidence({ viewRole: 'frontal', parsing });
  const feature = (summary, key) => summary.features.find((row) => row.featureKey === key);

  it('withholds all face-anchor-dependent areas when the face is not found', () => {
    const summary = get(
      model('unchecked', 'unchecked', 'unavailable', {
        status: 'unavailable',
        reason: 'MODEL_UNAVAILABLE',
      }),
    );
    for (const key of ['forehead.visible_width_shape', 'forehead.visible_hairline_boundary']) {
      expect(feature(summary, key)).toMatchObject({
        state: 'unavailable',
        reason: 'MODEL_FACE_ANCHOR_UNAVAILABLE',
      });
    }
    expect(feature(summary, 'eyebrow.visible_hair_density_texture')).toMatchObject({
      state: 'unavailable',
      reason: 'BROW_REGION_NOT_SCREENED',
    });
    expect(feature(summary, 'mouth.visible_lip_color')).toMatchObject({
      state: 'unavailable',
      reason: 'LIP_GEOMETRY_OR_REGION_UNAVAILABLE',
    });
  });

  it('does not count a rejected brow screen as an unexecuted candidate', () => {
    const summary = get(
      model('suppressed', 'screened', 'available', {
        status: 'not_requested',
      }),
    );
    expect(feature(summary, 'eyebrow.visible_hair_density_texture')).toMatchObject({
      state: 'unavailable',
      reason: 'BROW_REGION_NOT_SCREENED',
    });
    expect(feature(summary, 'mouth.visible_lip_color')).toMatchObject({
      state: 'not_evaluated',
      reason: 'CURRENT_PREVIEW_NOT_AVAILABLE',
    });
    const diagnostic = diagnoseCurrent2dSessionEvidence([summary]);
    expect(diagnostic.categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ category: 'model_or_visibility_blocked', count: 1 }),
      ]),
    );
  });

  it('does not turn a missing temporary lip candidate into intrinsic lip color', () => {
    const summary = get(
      model('screened', 'screened', 'unavailable', {
        status: 'not_requested',
      }),
    );
    expect(feature(summary, 'mouth.visible_lip_color')).toMatchObject({
      state: 'unavailable',
      reason: 'LIP_GEOMETRY_OR_REGION_UNAVAILABLE',
      independentAccuracyValidated: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
    });
  });
});
