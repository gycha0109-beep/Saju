import { describe, expect, it } from 'vitest';
import type { EyeFoldReviewState } from '../tools/face-reading/two-view/eye-fold-review.mjs';
import {
  createEyeFoldReviewRecord,
  EYE_FOLD_REVIEW_SCHEMA_VERSION,
  EYE_FOLD_REVIEW_STATES,
  projectEyeFoldReviewForUi,
  validateEyeFoldReviewStore,
} from '../tools/face-reading/two-view/eye-fold-review.mjs';

const sourceSha256 = 'a'.repeat(64);
const reviewedAt = '2026-11-07T00:00:00.000Z';

function create(
  imageLeft: EyeFoldReviewState = 'visible',
  imageRight: EyeFoldReviewState = 'hooded',
) {
  return createEyeFoldReviewRecord(
    { imageLeft, imageRight },
    {
      captureRef: 'capture-01',
      sourceSha256,
      revision: 1,
      reviewedAt,
    },
  );
}

describe('local human eye-fold review contract', () => {
  it('accepts visible, hooded, no-visible-crease, partial, occluded, out-of-frame and unknown labels', () => {
    expect(EYE_FOLD_REVIEW_STATES).toEqual([
      'visible',
      'hooded',
      'no_visible_crease',
      'partial',
      'occluded',
      'out_of_frame',
      'unknown',
    ]);
    for (const state of EYE_FOLD_REVIEW_STATES) {
      expect(create(state, state)).toMatchObject({
        imageLeft: state,
        imageRight: state,
        humanReviewed: true,
        independentAccuracyValidated: false,
      });
    }
  });

  it('keeps image-side labels separate from anatomical laterality and traditional meaning', () => {
    expect(create()).toMatchObject({
      coordinateFrame: 'image_left_right_not_anatomical_laterality',
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
    });
  });

  it('rejects missing, invalid or extra human labels', () => {
    expect(() =>
      createEyeFoldReviewRecord({ imageLeft: 'visible', imageRight: 'unreviewed' } as never, {
        captureRef: 'capture-01',
        sourceSha256,
        revision: 1,
        reviewedAt,
      }),
    ).toThrow('EYE_FOLD_REVIEW_INVALID');
    expect(() =>
      createEyeFoldReviewRecord(
        { imageLeft: 'visible', imageRight: 'hooded', anatomicalLeft: 'visible' } as never,
        { captureRef: 'capture-01', sourceSha256, revision: 1, reviewedAt },
      ),
    ).toThrow('EYE_FOLD_REVIEW_INVALID');
  });

  it('rejects invalid source identity, revision and capture reference', () => {
    expect(() =>
      createEyeFoldReviewRecord(
        { imageLeft: 'visible', imageRight: 'hooded' },
        { captureRef: '../capture-01', sourceSha256, revision: 1, reviewedAt },
      ),
    ).toThrow('EYE_FOLD_REVIEW_INVALID');
    expect(() =>
      createEyeFoldReviewRecord(
        { imageLeft: 'visible', imageRight: 'hooded' },
        { captureRef: 'capture-01', sourceSha256: 'not-a-digest', revision: 1, reviewedAt },
      ),
    ).toThrow('EYE_FOLD_REVIEW_INVALID');
    expect(() =>
      createEyeFoldReviewRecord(
        { imageLeft: 'visible', imageRight: 'hooded' },
        { captureRef: 'capture-01', sourceSha256, revision: 0, reviewedAt },
      ),
    ).toThrow('EYE_FOLD_REVIEW_INVALID');
  });

  it('loads only known local capture references and rejects authority escalation', () => {
    const record = create();
    const store = validateEyeFoldReviewStore(
      { schemaVersion: EYE_FOLD_REVIEW_SCHEMA_VERSION, records: { 'capture-01': record } },
      ['capture-01', 'capture-02'],
    );
    expect(store.records['capture-01']).toEqual(record);
    expect(() =>
      validateEyeFoldReviewStore(
        { schemaVersion: EYE_FOLD_REVIEW_SCHEMA_VERSION, records: { 'capture-99': record } },
        ['capture-01'],
      ),
    ).toThrow('EYE_FOLD_REVIEW_STORE_INVALID');
    expect(() =>
      validateEyeFoldReviewStore(
        {
          schemaVersion: EYE_FOLD_REVIEW_SCHEMA_VERSION,
          records: { 'capture-01': { ...record, traditionalBindingAuthorized: true } },
        },
        ['capture-01'],
      ),
    ).toThrow('EYE_FOLD_REVIEW_STORE_INVALID');
  });

  it('projects labels to the local UI without exposing source hashes or private paths', () => {
    const projection = projectEyeFoldReviewForUi(create());
    const serialized = JSON.stringify(projection);
    expect(projection).toMatchObject({
      imageLeft: 'visible',
      imageRight: 'hooded',
      humanReviewed: true,
      independentAccuracyValidated: false,
      modelTrainingAuthorized: false,
    });
    expect(serialized).not.toContain(sourceSha256);
    expect(serialized).not.toContain('sourceSha256');
    expect(serialized).not.toContain('sourcePath');
  });
});
