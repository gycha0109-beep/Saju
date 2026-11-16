import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { FR293_PRODUCT_COLUMN_MAP } from '../packages/face-reading/src/rgb-selfie-product-column-map-fr293.js';
import {
  FR294_HARD_GAP_FRONTIER,
  FR294_HARD_GAP_COUNTS,
} from '../packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.js';
import {
  traceFr294PhotoHardGaps,
  HARD_GAP_BRIDGE_VERSION,
} from '../tools/face-reading/two-view/fr294-photo-gap-bridge.mjs';

const source = readFileSync(
  'packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.ts',
  'utf8',
);
const keys = FR293_PRODUCT_COLUMN_MAP.map((c) => c.featureKey);
const official = new Map(FR294_HARD_GAP_FRONTIER.map((g) => [g.featureKey, g]));
function readiness(photos = 1) {
  return {
    status: 'available',
    captureCount: photos,
    canonicalPhotoMeasurementVerified: false,
    independentAccuracyValidated: false,
    captures: Object.fromEntries(
      Array.from({ length: photos }, (_, n) => [
        'capture-' + String(n + 1).padStart(2, '0'),
        {
          viewRole: 'frontal',
          features: keys.map((key) => ({
            featureKey: key,
            state: official.has(key) ? 'unavailable' : 'calculation_only',
            reason: official.has(key)
              ? 'CURRENT_RGB_AUTHORITY_UNAVAILABLE'
              : 'CANONICAL_CALCULATOR_WITHOUT_VERIFIED_PHOTO_INPUT',
          })),
        },
      ]),
    ),
  };
}
describe('FR294 authoritative ledger to private photo readiness', () => {
  it('reflects FR294 exact 11 keys and 5/4/1/1 without creating extra canonical keys', () => {
    const report = traceFr294PhotoHardGaps(source, readiness(), keys);
    expect(report).toMatchObject({
      schemaVersion: HARD_GAP_BRIDGE_VERSION,
      captureCount: 1,
      canonicalHardGapCount: FR294_HARD_GAP_COUNTS.total,
      laneCount: {
        new_image_model: 5,
        rgb_relative_3d_benchmark: 4,
        ear_visibility_then_image_model: 1,
        remain_unavailable: 1,
      },
      unresolvedNonFr294UnavailableCount: 0,
      canonicalObservationAdmitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
    });
    const items = report.captures['capture-01']!;
    expect(items.map((x) => x.featureKey).sort()).toEqual([...official.keys()].sort());
    for (const item of items) {
      expect(item.lane).toBe(official.get(item.featureKey)?.lane);
      expect(item.nextEvidenceRequirement).toBe(
        official.get(item.featureKey)?.nextEvidenceRequirement,
      );
      expect(item.status).toBe('unavailable');
    }
  });
  it('does not turn a model candidate into an approved eye or ear observation', () => {
    const r = readiness();
    const ear = r.captures['capture-01']!.features.find(
      (x) => x.featureKey === 'ear.visible_boundary_height_shape',
    )!;
    ear.state = 'candidate_only';
    const result = traceFr294PhotoHardGaps(source, r, keys);
    expect(result.statusByLane.ear_visibility_then_image_model).toEqual({
      unavailable: 0,
      candidate_only: 1,
      partial: 0,
      not_evaluated: 0,
    });
    expect(result.canonicalObservationAdmitted).toBe(false);
  });
  it('maps 18 private captures to 198 unadmitted hard-gap statuses', () => {
    const r = traceFr294PhotoHardGaps(source, readiness(18), keys);
    expect(
      Object.values(r.statusByLane).reduce(
        (count, lane) => count + Object.values(lane).reduce((sum, v) => sum + v, 0),
        0,
      ),
    ).toBe(198);
    expect(JSON.stringify(r)).not.toMatch(/sourcePath|sourceSha256|landmarks|maskBuffer/);
  });
  it('fails closed on canonical source drift and forged observations', () => {
    expect(() =>
      traceFr294PhotoHardGaps(
        source.replace("lane: 'new_image_model'", "lane: 'new_invented_model'"),
        readiness(),
        keys,
      ),
    ).toThrow('FR294_PHOTO_GAP_BRIDGE_INVALID');
    expect(() =>
      traceFr294PhotoHardGaps(
        source.replace(
          "featureKey: 'forehead.visible_width_shape'",
          "featureKey: 'forehead.fake_width_shape'",
        ),
        readiness(),
        keys,
      ),
    ).toThrow('FR294_PHOTO_GAP_BRIDGE_INVALID');
    const r = readiness();
    r.captures['capture-01']!.features.find(
      (x) => x.featureKey === 'forehead.relative_surface_curvature',
    )!.state = 'observed';
    expect(() => traceFr294PhotoHardGaps(source, r, keys)).toThrow(
      'FR294_PHOTO_GAP_BRIDGE_INVALID',
    );
  });
  it('rejects an unknown hard gap status and an unavailable feature outside FR294', () => {
    const r = readiness();
    r.captures['capture-01']!.features.find(
      (x) => x.featureKey === 'eye.width_height_ratio',
    )!.state = 'unavailable';
    expect(() => traceFr294PhotoHardGaps(source, r, keys)).toThrow(
      'FR294_PHOTO_GAP_BRIDGE_INVALID',
    );
    expect(() => traceFr294PhotoHardGaps(source, readiness(), keys.slice(0, 28))).toThrow(
      'FR294_PHOTO_GAP_BRIDGE_INVALID',
    );
  });
});
