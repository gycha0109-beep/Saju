import { describe, expect, it } from 'vitest';
import { compareHairlineBoundary } from '../tools/face-reading/two-view/hairline-boundary-reference.mjs';
import { toExistingHairlineBoundaryCandidate } from '../tools/face-reading/two-view/visible-hair-skin-interface.mjs';

const w = 24,
  h = 18,
  imageW = 240,
  imageH = 180,
  sha = 'c'.repeat(64);
const mask = (parts) => {
  const out = new Uint8Array(w * h);
  for (const [start, end, y] of parts) for (let x = start; x <= end; x++) out[y * w + x] = 1;
  return out;
};
function human(candidate) {
  return {
    sourceSha256: sha,
    width: imageW,
    height: imageH,
    mode: 'hairline',
    humanReviewed: true,
    anatomicalHairlineAuthorized: false,
    status: 'marked',
    segments: [[...candidate.boundaryPoints.map((p) => [...p])]],
  };
}
describe('reuse original private hairline comparator without new admission authority', () => {
  it('bridges only contiguous unambiguous hair-skin contacts in original pixel coordinates', () => {
    const candidate = toExistingHairlineBoundaryCandidate(mask([[5, 15, 6]]), w, h, imageW, imageH);
    expect(candidate).toMatchObject({
      candidateBoundaryExposed: true,
      engineeringPreviewState: 'visible_interface_candidate',
      automaticAdmissionAuthorized: false,
      neutralRuntimeHairlineObservationAuthorized: false,
    });
    expect(candidate.boundaryPoints).toHaveLength(11);
    expect(candidate.boundaryPoints[0][0]).toBeCloseTo(54.5);
    const result = compareHairlineBoundary(human(candidate), candidate, sha);
    expect(result.state).toBe('provisional_visible_boundary_comparison');
    expect(result.meanHumanVertexToModelPolylinePx).toBeCloseTo(0);
    expect(result.independentAnatomicalAccuracyValidated).toBe(false);
  });
  it('withholds a disconnected or cropped contact rather than bridging occluded forehead', () => {
    for (const parts of [
      [
        [5, 8, 6],
        [13, 15, 6],
      ],
      [[0, 7, 6]],
    ]) {
      const candidate = toExistingHairlineBoundaryCandidate(mask(parts), w, h, imageW, imageH);
      expect(candidate).toMatchObject({
        candidateBoundaryExposed: false,
        boundaryPoints: [],
        engineeringPreviewState: 'withheld',
      });
      const approvedHuman = {
        ...human({
          boundaryPoints: [
            [70, 60],
            [80, 60],
          ],
        }),
        segments: [
          [
            [70, 60],
            [80, 60],
          ],
        ],
      };
      expect(compareHairlineBoundary(approvedHuman, candidate, sha).state).toBe(
        'model_candidate_withheld',
      );
    }
  });
  it('keeps the existing source SHA-256 guard and never estimates accuracy without matching evidence', () => {
    const candidate = toExistingHairlineBoundaryCandidate(mask([[5, 15, 6]]), w, h, imageW, imageH);
    expect(() => compareHairlineBoundary(human(candidate), candidate, 'b'.repeat(64))).toThrow(
      'HAIRLINE_SOURCE_DIGEST_MISMATCH',
    );
  });
});
