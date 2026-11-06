import { describe, expect, it } from 'vitest';
import {
  compareHairlineBoundary,
  summarizeHairlineComparisons,
} from '../tools/face-reading/two-view/hairline-boundary-reference.mjs';

const digest = 'a'.repeat(64);
const imageWidth = 100,
  imageHeight = 100;
const annotation = (
  status = 'marked',
  segments = [
    [
      [10, 20],
      [30, 20],
    ],
  ],
) => ({
  sourceSha256: digest,
  mode: 'hairline',
  width: imageWidth,
  height: imageHeight,
  status,
  segments,
  humanReviewed: status !== 'unreviewed',
  anatomicalHairlineAuthorized: false,
});
const candidate = (
  points = [
    [10, 24],
    [30, 24],
  ],
) => ({
  candidateBoundaryExposed: true,
  engineeringPreviewState: 'visible_interface_candidate',
  boundaryPoints: points,
  automaticAdmissionAuthorized: false,
  neutralRuntimeHairlineObservationAuthorized: false,
});
const privateAnnotations = (records = {}) => ({
  schemaVersion: 'myeongha-human-geometry-annotation-v1',
  records,
});

describe('local human-reviewed hairline vs model-visible boundary', () => {
  it('computes only directed vertex-to-polyline distance from matching source bytes', () => {
    const row = compareHairlineBoundary(annotation(), candidate(), digest);
    expect(row).toMatchObject({
      state: 'provisional_visible_boundary_comparison',
      comparedHumanVertices: 2,
      comparedHumanStrokes: 1,
      meanHumanVertexToModelPolylinePx: 4,
      maxHumanVertexToModelPolylinePx: 4,
      annotationCompleteness: 'marked',
      independentAnatomicalAccuracyValidated: false,
    });
    expect(row.meanDistanceRelativeToImageDiagonal).toBeCloseTo(4 / Math.hypot(100, 100));
    expect(JSON.stringify(row)).not.toMatch(/sourceSha256|boundaryPoints|segments|recordId/);
  });

  it('measures visible strokes independently and never bridges occluded gaps', () => {
    const gt = annotation('partial', [
      [
        [10, 20],
        [20, 20],
      ],
      [
        [70, 30],
        [80, 30],
      ],
    ]);
    const model = candidate([
      [10, 24],
      [80, 24],
    ]);
    const out = compareHairlineBoundary(gt, model, digest);
    expect(out.comparedHumanVertices).toBe(4);
    expect(out.comparedHumanStrokes).toBe(2);
    expect(out.meanHumanVertexToModelPolylinePx).toBe(5);
  });

  it('rejects source mismatch, invalid annotations, invalid candidate geometry and authority forgery', () => {
    expect(() => compareHairlineBoundary(annotation(), candidate(), 'b'.repeat(64))).toThrow(
      'HAIRLINE_SOURCE_DIGEST_MISMATCH',
    );
    const forgedHuman = { ...annotation(), anatomicalHairlineAuthorized: true };
    expect(() => compareHairlineBoundary(forgedHuman, candidate(), digest)).toThrow(
      'HAIRLINE_HUMAN_ANNOTATION_INVALID',
    );
    const forgedModel = { ...candidate(), automaticAdmissionAuthorized: true };
    expect(() => compareHairlineBoundary(annotation(), forgedModel, digest)).toThrow(
      'HAIRLINE_CANDIDATE_INVALID',
    );
    const invalidPoint = candidate([
      [10, 24],
      [101, 24],
    ]);
    expect(() => compareHairlineBoundary(annotation(), invalidPoint, digest)).toThrow(
      'HAIRLINE_CANDIDATE_INVALID',
    );
    expect(() => compareHairlineBoundary(annotation('marked', []), candidate(), digest)).toThrow(
      'HAIRLINE_HUMAN_ANNOTATION_INVALID',
    );
  });

  it('does not score a human-undrawn boundary or a withheld model path', () => {
    const undecided = annotation('unreviewed', []);
    expect(compareHairlineBoundary(undecided, candidate(), digest).state).toBe(
      'human_visible_boundary_not_annotated',
    );
    const withheld = {
      ...candidate([]),
      candidateBoundaryExposed: false,
      engineeringPreviewState: 'partially_visible_or_occluded',
      diagnosticBoundaryPoints: [
        [10, 24],
        [30, 24],
      ],
    };
    expect(compareHairlineBoundary(annotation(), withheld, digest).state).toBe(
      'model_candidate_withheld',
    );
    const unsafe = {
      ...withheld,
      boundaryPoints: [
        [10, 24],
        [30, 24],
      ],
    };
    expect(() => compareHairlineBoundary(annotation(), unsafe, digest)).toThrow(
      'HAIRLINE_CANDIDATE_INVALID',
    );
  });

  it('aggregates only source-hash-matched provisional comparisons without leaking photo identities', () => {
    const annotations = privateAnnotations({
      'private-face-a': annotation(),
      'private-face-b': { ...annotation('unreviewed', []), sourceSha256: 'b'.repeat(64) },
    });
    const result = summarizeHairlineComparisons(annotations, [
      { candidate: candidate(), verifiedSourceSha256: digest },
      { candidate: candidate(), verifiedSourceSha256: 'b'.repeat(64) },
      { candidate: candidate(), verifiedSourceSha256: 'c'.repeat(64) },
      { sourceUnreadable: true },
    ]);
    expect(result).toMatchObject({
      existingHumanRecords: 2,
      humanVisibleBoundaryAnnotations: 1,
      inspectedModelCandidateFiles: 4,
      modelSourceMatchedHumanRecord: 2,
      modelSourceUnmatched: 1,
      unreadableModelSources: 1,
      matchedWithoutHumanBoundary: 1,
      provisionalComparisons: 1,
      populationAccuracyValidated: false,
      identifyingImagesOrGeometryEmitted: false,
    });
    expect(JSON.stringify(result)).not.toMatch(/private-face|boundaryPoints|sourceSha256/);
  });

  it('rejects multiple human references to the same source and never fabricates a score when no GT is drawn', () => {
    const none = summarizeHairlineComparisons(
      privateAnnotations({
        'private-one': annotation('unreviewed', []),
      }),
      [{ candidate: candidate(), verifiedSourceSha256: digest }],
    );
    expect(none.provisionalComparisons).toBe(0);
    expect(none.meanPerPhotoVertexDistanceRelativeToImageDiagonal).toBeNull();
    expect(() =>
      summarizeHairlineComparisons(
        privateAnnotations({
          one: annotation(),
          two: { ...annotation(), status: 'partial' },
        }),
        [],
      ),
    ).toThrow('HAIRLINE_REFERENCE_DUPLICATE_SOURCE');
  });
});