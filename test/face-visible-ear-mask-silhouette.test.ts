import { describe, it, expect } from 'vitest';
import {
  earBinaryFromOverlayRGBA,
  measureVisibleEarMaskSilhouette,
} from '../tools/face-reading/two-view/visible-ear-mask-silhouette.mjs';

const width = 28,
  height = 18;
function image(
  rects: [number, number, number, number][] = [
    [3, 2, 6, 11],
    [21, 3, 24, 12],
  ],
) {
  const mask = new Uint8Array(width * height);
  for (const [minX, minY, maxX, maxY] of rects) {
    for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) mask[y * width + x] = 1;
  }
  return mask;
}
describe('visible whole-ear segmentation candidate only', () => {
  it('measures a pair of separated whole-ear silhouette regions without assigning true laterality', () => {
    const result = measureVisibleEarMaskSilhouette(image(), width, height);
    expect(result.status).toBe('available');
    expect(result.regions).toHaveLength(2);
    expect(result.regions[0]?.visibleMaskWidthToImageWidth).toBeCloseTo(4 / width);
    expect(result.regions[0]?.visibleMaskHeightToImageHeight).toBeCloseTo(10 / height);
    expect(result.regions[1]?.centerXToImageWidth).toBeGreaterThan(0.5);
    expect(result).toMatchObject({
      candidateOnly: true,
      anatomicalLateralityAssigned: false,
      helixIdentified: false,
      lobeIdentified: false,
      attachmentIdentified: false,
      projectionMeasured: false,
      thicknessMeasured: false,
      independentAccuracyValidated: false,
      traditionalBindingAuthorized: false,
    });
  });
  it('reports a single visible segment as one region, not a fabricated second ear', () => {
    const result = measureVisibleEarMaskSilhouette(image([[3, 2, 6, 11]]), width, height);
    expect(result.regions).toHaveLength(1);
    expect(result.regions[0]?.imageOrder).toBe(1);
  });
  it('marks only clipping-related uncertainty when a region meets the image boundary', () => {
    const result = measureVisibleEarMaskSilhouette(
      image([
        [0, 2, 3, 11],
        [21, 3, 24, 12],
      ]),
      width,
      height,
    );
    expect(result.status).toBe('partial');
    expect(result.regions[0]).toMatchObject({
      status: 'partial',
      reason: 'IMAGE_EDGE_CLIPPED',
    });
    expect(result.regions[1]?.status).toBe('available');
  });
  it('abstains on empty or fragmented masks rather than selecting arbitrary blobs', () => {
    expect(measureVisibleEarMaskSilhouette(image([]), width, height)).toMatchObject({
      status: 'unavailable',
      reason: 'NO_EAR_MASK_REGION',
    });
    expect(
      measureVisibleEarMaskSilhouette(
        image([
          [3, 2, 6, 11],
          [14, 4, 17, 8],
          [21, 3, 24, 12],
        ]),
        width,
        height,
      ),
    ).toMatchObject({ status: 'unavailable', reason: 'FRAGMENTED_OR_MULTIPLE_EAR_REGIONS' });
  });
  it('rejects nonbinary masks and malformed geometry', () => {
    const mask = image();
    mask[0] = 2;
    expect(() => measureVisibleEarMaskSilhouette(mask, width, height)).toThrow('EAR_MASK_INVALID');
    expect(() =>
      measureVisibleEarMaskSilhouette(image(), width, height, { imageWidth: 0 }),
    ).toThrow('EAR_MASK_INVALID');
  });
  it('recognizes only the pinned ear overlay color and transparent background', () => {
    const rgba = new Uint8Array(2 * 2 * 4);
    rgba.set([255, 190, 65, 255], 0);
    expect([...earBinaryFromOverlayRGBA(rgba, 2, 2)]).toEqual([1, 0, 0, 0]);
    rgba[4] = 100;
    expect(() => earBinaryFromOverlayRGBA(rgba, 2, 2)).toThrow('EAR_OVERLAY_INVALID');
  });
});
