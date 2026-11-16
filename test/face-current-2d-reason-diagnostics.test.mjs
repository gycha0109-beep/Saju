import { describe, expect, it } from 'vitest';
import {
  CURRENT_2D_REASON_DIAGNOSTIC_VERSION,
  diagnoseCurrent2dSessionEvidence,
  summarizeCurrent2dPhotoEvidence,
} from '../tools/face-reading/two-view/current-2d-evidence-readiness.mjs';
import { PARSING_VERSION } from '../tools/face-reading/two-view/parsing-contract.mjs';

const photo = (extra = {}) =>
  summarizeCurrent2dPhotoEvidence({
    viewRole: 'frontal',
    parsing: { status: 'completed', methodVersion: PARSING_VERSION },
    ...extra,
  });

describe('per-feature photo evidence failure and pending diagnostics', () => {
  it('separates unexecuted preview, missing human review, and wrong view', () => {
    const report = diagnoseCurrent2dSessionEvidence([photo(), photo({ viewRole: 'profile' })]);
    expect(report).toMatchObject({
      schemaVersion: CURRENT_2D_REASON_DIAGNOSTIC_VERSION,
      status: 'research_only_unverified_reason_counts',
      includedPhotoCount: 2,
      totalPhotoFeatureEntries: 12,
      statusCounts: {
        candidate_only: 0,
        partial: 0,
        unavailable: 7,
        not_evaluated: 5,
      },
      independentHumanReferenceValidated: false,
      independentRepeatabilityValidated: false,
      independentlyReviewedPose: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      rawSourcePersistedOrEmitted: false,
    });
    expect(Object.fromEntries(report.categories.map((x) => [x.category, x.count]))).toEqual({
      manual_review_required: 1,
      preview_not_run_or_loading: 5,
      view_requirement: 6,
    });
    expect(
      report.features.find((x) => x.featureKey === 'eye.eyelid_crease_or_hooded_category')?.causes,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          reason: 'HUMAN_EYELID_LINE_REVIEW_REQUIRED',
          category: 'manual_review_required',
          count: 1,
        }),
      ]),
    );
  });

  it('keeps a model proxy separate from an unseen follicle boundary', () => {
    const flags = {
      candidateOnly: true,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      anatomicalForeheadBoundaryValidated: false,
      anatomicalHairlineAuthorized: false,
    };
    const foreheadSkinCandidate = {
      ...flags,
      methodVersion: 'engineering.visible-forehead-skin-band@0.1.0',
      status: 'available',
      modelContacts: [{ status: 'partial' }],
    };
    const report = diagnoseCurrent2dSessionEvidence([photo({ foreheadSkinCandidate })]);
    expect(report.features[0]).toMatchObject({
      featureKey: 'forehead.visible_width_shape',
      causes: [
        expect.objectContaining({
          category: 'proxy_requires_independent_reference',
          count: 1,
        }),
      ],
    });
    expect(report.features[1]).toMatchObject({
      featureKey: 'forehead.visible_hairline_boundary',
      causes: [
        expect.objectContaining({
          reason: 'NO_VISIBLE_MODEL_HAIR_SKIN_CONTACT',
          category: 'model_or_visibility_blocked',
          count: 1,
        }),
      ],
    });
    expect(JSON.stringify(report)).not.toMatch(
      /captureRef|sourcePath|sourceSha256|segments|landmarks|imageBytes|rawMask/,
    );
  });

  it('rejects fabricated reasons or attempts to grant F0 authority', () => {
    const source = photo();
    const changed = (row) => ({
      ...source,
      features: [{ ...source.features[0], ...row }, ...source.features.slice(1)],
    });
    expect(() =>
      diagnoseCurrent2dSessionEvidence([
        changed({
          reason: 'NO_VISIBLE_MODEL_HAIR_SKIN_CONTACT',
        }),
      ]),
    ).toThrow('CURRENT_2D_DIAGNOSTIC_REASON_INVALID');
    expect(() =>
      diagnoseCurrent2dSessionEvidence([
        changed({
          canonicalF0Admitted: true,
        }),
      ]),
    ).toThrow('CURRENT_2D_SESSION_AUTHORITY_INVALID');
    expect(() =>
      diagnoseCurrent2dSessionEvidence([
        changed({
          reason: 'INVENTED_UNKNOWN_REASON',
        }),
      ]),
    ).toThrow('CURRENT_2D_DIAGNOSTIC_REASON_INVALID');
  });

  it('does not infer evidence from an empty batch', () => {
    const report = diagnoseCurrent2dSessionEvidence([]);
    expect(report.includedPhotoCount).toBe(0);
    expect(report.categories).toEqual([]);
    expect(report.features).toHaveLength(6);
  });
});
