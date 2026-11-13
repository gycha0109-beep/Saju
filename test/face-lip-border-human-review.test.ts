import { describe, expect, it } from 'vitest';
import {
  LIP_BORDER_REVIEW_SCHEMA_VERSION,
  LIP_BORDER_LINES,
  LIP_BORDER_POINTS,
  createLipBorderHumanReviewRecord,
  validateLipBorderHumanReviewStore,
  projectLipBorderHumanReviewForUi,
} from '../tools/face-reading/two-view/lip-border-human-review.mjs';

const reference = () => ({
  upperLipBorder: {
    status: 'marked' as const,
    segments: [
      [
        [0.4, 0.61],
        [0.5, 0.6],
        [0.6, 0.61],
      ],
    ],
  },
  lowerLipBorder: {
    status: 'partial' as const,
    segments: [
      [
        [0.42, 0.64],
        [0.5, 0.66],
      ],
    ],
  },
  philtrumImageLeft: { status: 'unknown' as const, segments: [] },
  philtrumImageRight: { status: 'occluded' as const, segments: [] },
  imageLeftMouthCorner: { status: 'marked' as const, point: [0.39, 0.62] },
  imageRightMouthCorner: { status: 'unknown' as const, point: null },
});
const options = {
  captureRef: 'capture-01',
  sourceSha256: 'f'.repeat(64),
  revision: 1,
  reviewedAt: '2026-11-07T11:20:00Z',
};
const create = () => createLipBorderHumanReviewRecord(reference(), options);

describe('local visible lip border human annotation contract', () => {
  it('records lip margins, both philtrum ridges and image-side mouth corners separately', () => {
    expect(LIP_BORDER_LINES).toEqual([
      'upperLipBorder',
      'lowerLipBorder',
      'philtrumImageLeft',
      'philtrumImageRight',
    ]);
    expect(LIP_BORDER_POINTS).toEqual(['imageLeftMouthCorner', 'imageRightMouthCorner']);
    expect(create()).toMatchObject({
      humanReviewed: true,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
      modelTrainingAuthorized: false,
      coordinateFrame: 'normalized_original_image_screen_sides',
      lowerLipBorder: { status: 'partial' },
      philtrumImageRight: { status: 'occluded' },
    });
  });
  it('validates missing visible segments and forbids fabricated points on withheld parts', () => {
    expect(() =>
      createLipBorderHumanReviewRecord(
        {
          ...reference(),
          upperLipBorder: { status: 'marked', segments: [] },
        },
        options,
      ),
    ).toThrow('LIP_BORDER_REVIEW_INVALID');
    expect(() =>
      createLipBorderHumanReviewRecord(
        {
          ...reference(),
          imageRightMouthCorner: { status: 'occluded', point: [0.6, 0.6] },
        },
        options,
      ),
    ).toThrow('LIP_BORDER_REVIEW_INVALID');
  });
  it('rejects bad geometry, excess or missing fields, paths and SHA values', () => {
    expect(() =>
      createLipBorderHumanReviewRecord(
        {
          ...reference(),
          upperLipBorder: {
            status: 'marked',
            segments: [
              [
                [0.4, 0.6],
                [1.4, 0.6],
              ],
            ],
          },
        },
        options,
      ),
    ).toThrow('LIP_BORDER_REVIEW_INVALID');
    expect(() =>
      createLipBorderHumanReviewRecord(reference(), {
        ...options,
        captureRef: '../capture-01',
      }),
    ).toThrow('LIP_BORDER_REVIEW_INVALID');
    expect(() =>
      createLipBorderHumanReviewRecord(reference(), {
        ...options,
        sourceSha256: 'bad',
      }),
    ).toThrow('LIP_BORDER_REVIEW_INVALID');
    expect(() =>
      createLipBorderHumanReviewRecord(
        {
          ...reference(),
          inferredType: 'large',
        } as never,
        options,
      ),
    ).toThrow('LIP_BORDER_REVIEW_INVALID');
  });
  it('supports all withheld regions without silently inferring actual anatomy', () => {
    const blank = {
      upperLipBorder: { status: 'not_visible' as const, segments: [] },
      lowerLipBorder: { status: 'occluded' as const, segments: [] },
      philtrumImageLeft: { status: 'out_of_frame' as const, segments: [] },
      philtrumImageRight: { status: 'unknown' as const, segments: [] },
      imageLeftMouthCorner: { status: 'occluded' as const, point: null },
      imageRightMouthCorner: { status: 'not_visible' as const, point: null },
    };
    const record = createLipBorderHumanReviewRecord(blank, options);
    expect(record.upperLipBorder.segments).toHaveLength(0);
    expect(record.canonicalF0Admitted).toBe(false);
  });
  it('rejects file-store authority escalation and references for other source records', () => {
    const record = create();
    const store = {
      schemaVersion: LIP_BORDER_REVIEW_SCHEMA_VERSION,
      records: { 'capture-01': record },
    };
    expect(validateLipBorderHumanReviewStore(store, ['capture-01']).records['capture-01']).toEqual(
      record,
    );
    expect(() => validateLipBorderHumanReviewStore(store, ['capture-02'])).toThrow(
      'LIP_BORDER_REVIEW_STORE_INVALID',
    );
    expect(() =>
      validateLipBorderHumanReviewStore(
        {
          schemaVersion: LIP_BORDER_REVIEW_SCHEMA_VERSION,
          records: { 'capture-01': { ...record, traditionalBindingAuthorized: true } },
        },
        ['capture-01'],
      ),
    ).toThrow('LIP_BORDER_REVIEW_STORE_INVALID');
  });
  it('returns only local annotation geometry to the viewer, not SHA or source paths', () => {
    const data = projectLipBorderHumanReviewForUi(create());
    const text = JSON.stringify(data);
    expect(text).toContain('upperLipBorder');
    expect(text).not.toContain(options.sourceSha256);
    expect(text).not.toContain('sourceSha256');
    expect(text).not.toContain('sourcePath');
    expect(data.independentAccuracyValidated).toBe(false);
  });
});
