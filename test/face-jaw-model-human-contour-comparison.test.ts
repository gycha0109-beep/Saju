import { describe, expect, it } from 'vitest';
import {
  sampleModelLowerOvalEnvelope,
  compareModelJawEnvelopeWithHumanContour,
  JAW_MODEL_ENVELOPE_VERSION,
  JAW_MODEL_HUMAN_COMPARISON_VERSION,
} from '../tools/face-reading/two-view/jaw-model-human-contour-comparison.mjs';
import { createJawContourReviewRecord } from '../tools/face-reading/two-view/jaw-contour-human-review.mjs';
type Pixel = readonly [number, number];
const circleEdges = (indices: number[]) =>
  indices.map((start, i) => ({ start, end: indices[(i + 1) % indices.length]! }));
function frame() {
  const landmarks = Array.from({ length: 478 }, () => ({ x: 0.5, y: 0.5 }));
  const oval: Pixel[] = [
    [0.2, 0.2],
    [0.8, 0.2],
    [0.8, 0.8],
    [0.2, 0.8],
  ];
  const mouth: Pixel[] = [
    [0.44, 0.5],
    [0.56, 0.5],
    [0.56, 0.55],
    [0.44, 0.55],
  ];
  for (const [i, [x, y]] of oval.entries()) landmarks[i] = { x, y };
  for (const [i, [x, y]] of mouth.entries()) landmarks[i + 4] = { x, y };
  return {
    landmarks,
    topology: { oval: circleEdges([0, 1, 2, 3]), mouth: circleEdges([4, 5, 6, 7]) },
    width: 600,
    height: 800,
    viewRole: 'frontal' as const,
  };
}
function human(
  points: Pixel[] = [
    [0.3, 0.82],
    [0.5, 0.82],
    [0.7, 0.82],
  ],
  status: 'marked' | 'partial' = 'marked',
) {
  return createJawContourReviewRecord(
    { visibleLowerFaceOutline: { status, segments: [points] } },
    {
      captureRef: 'capture-01',
      sourceSha256: 'a'.repeat(64),
      revision: 1,
      reviewedAt: '2026-11-11T10:00:00Z',
    },
  );
}
const model = () => sampleModelLowerOvalEnvelope(frame());

describe('transient model oval lower-face line and marked original image jaw contour', () => {
  it('generates only five lower silhouette samples from valid pinned oval topology', () => {
    const result = model();
    expect(result).toMatchObject({
      methodVersion: JAW_MODEL_ENVELOPE_VERSION,
      status: 'available',
      source: 'pinned_face_landmarker_face_oval',
      candidateOnly: true,
      anatomicalJawValidated: false,
      boneShapeInferred: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      modelTrainingAuthorized: false,
    });
    if (result.status !== 'available') throw Error('SYNTHETIC_ENVELOPE_REQUIRED');
    expect(result.points).toHaveLength(5);
    expect(result.points.every((p) => Math.abs(p[1] - 0.8) < 1e-9)).toBe(true);
    expect(JSON.stringify(result)).not.toMatch(
      /sourceSha256|captureRef|landmarks|topology|rawPixels/,
    );
  });
  it('computes a sample-only image-height distance, never bone or traditional form', () => {
    const result = compareModelJawEnvelopeWithHumanContour(model(), human());
    expect(result).toMatchObject({
      methodVersion: JAW_MODEL_HUMAN_COMPARISON_VERSION,
      status: 'available',
      comparedSampleCount: 5,
      totalModelSampleCount: 5,
      humanFullModelCoverageConfirmed: true,
      candidateOnly: true,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
    });
    if (result.status !== 'available') throw Error('SYNTHETIC_COMPARISON_REQUIRED');
    expect(result.signedMeanHumanMinusModelToImageHeight).toBeCloseTo(0.02);
    expect(result.meanAbsoluteOffsetToImageHeight).toBeCloseTo(0.02);
    expect(result.maximumAbsoluteOffsetToImageHeight).toBeCloseTo(0.02);
    expect(JSON.stringify(result)).not.toMatch(/sourceSha256|captureRef|segments|points/);
  });
  it('supports reverse line direction and partial horizontal coverage without extrapolation', () => {
    expect(
      compareModelJawEnvelopeWithHumanContour(
        model(),
        human([
          [0.7, 0.82],
          [0.5, 0.82],
          [0.3, 0.82],
        ]),
      ).status,
    ).toBe('available');
    expect(
      compareModelJawEnvelopeWithHumanContour(
        model(),
        human(
          [
            [0.4, 0.82],
            [0.5, 0.82],
            [0.6, 0.82],
          ],
          'partial',
        ),
      ),
    ).toMatchObject({
      status: 'partial',
      comparedSampleCount: 3,
      humanFullModelCoverageConfirmed: false,
    });
    expect(
      compareModelJawEnvelopeWithHumanContour(
        model(),
        human(
          [
            [0.44, 0.82],
            [0.49, 0.82],
          ],
          'partial',
        ),
      ),
    ).toMatchObject({ status: 'unavailable', reason: 'INSUFFICIENT_SHARED_X_COVERAGE' });
  });
  it('withholds profile, missing landmarks, clipped oval and invalid model crossings', () => {
    const data = frame();
    expect(sampleModelLowerOvalEnvelope({ ...data, viewRole: 'profile' })).toMatchObject({
      status: 'unavailable',
      reason: 'FRONTAL_CAPTURE_REQUIRED',
    });
    expect(sampleModelLowerOvalEnvelope({ ...data, landmarks: [] })).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_LANDMARKS_UNAVAILABLE',
    });
    const unrelated = frame();
    unrelated.landmarks[12] = { x: 1.2, y: 0.5 };
    expect(sampleModelLowerOvalEnvelope(unrelated).status).toBe('available');
    const clipped = frame();
    clipped.landmarks[0] = { x: 0, y: 0.2 };
    expect(sampleModelLowerOvalEnvelope(clipped).status).toBe('unavailable');
    const invalid = frame();
    invalid.topology.oval = [{ start: 0, end: 1 }];
    expect(sampleModelLowerOvalEnvelope(invalid)).toMatchObject({
      status: 'unavailable',
      reason: 'MODEL_OVAL_TOPOLOGY_INVALID',
    });
  });
  it('rejects incomplete or forged human evidence and a tampered model candidate', () => {
    const recorded = human();
    expect(compareModelJawEnvelopeWithHumanContour(model(), null)).toMatchObject({
      status: 'unavailable',
      reason: 'HUMAN_JAW_CONTOUR_NOT_RECORDED',
    });
    for (const fake of [
      { ...recorded, independentAccuracyValidated: true },
      { ...recorded, canonicalF0Admitted: true },
      { ...recorded, boneShapeInferred: true },
    ])
      expect(compareModelJawEnvelopeWithHumanContour(model(), fake)).toMatchObject({
        status: 'unavailable',
        reason: 'HUMAN_AUTHORITY_INVALID',
      });
    expect(
      compareModelJawEnvelopeWithHumanContour(model(), {
        ...recorded,
        visibleLowerFaceOutline: { status: 'occluded', segments: [] },
      }),
    ).toMatchObject({
      status: 'unavailable',
      reason: 'SINGLE_VISIBLE_HUMAN_STROKE_REQUIRED',
    });
    expect(
      compareModelJawEnvelopeWithHumanContour({ ...model(), canonicalF0Admitted: true }, recorded),
    ).toMatchObject({ status: 'unavailable', reason: 'MODEL_ENVELOPE_UNAVAILABLE_OR_INVALID' });
  });
  it('withholds malformed contour coordinates and nonmonotonic human strokes', () => {
    const recorded = human();
    for (const line of [
      [
        [0.3, 0.82],
        [0.3, 0.83],
      ],
      [
        [0.3, 0.82],
        [0.5, 0.82],
        [0.4, 0.8],
      ],
      [
        [0.3, 0.82],
        [2, 0.83],
      ],
    ]) {
      expect(
        compareModelJawEnvelopeWithHumanContour(model(), {
          ...recorded,
          visibleLowerFaceOutline: { status: 'marked', segments: [line] },
        }).status,
      ).toBe('unavailable');
    }
  });
});
