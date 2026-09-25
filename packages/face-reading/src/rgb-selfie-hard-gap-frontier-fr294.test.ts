import { describe, expect, it } from 'vitest';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR294_HARD_GAP_COUNTS,
  FR294_HARD_GAP_FRONTIER,
  assertFR294HardGapFrontier,
} from './rgb-selfie-hard-gap-frontier-fr294.js';

describe('FR294 hard-gap execution frontier', () => {
  it('exactly covers the 11 remaining FR293 gaps', () => {
    const gaps = FR293_PRODUCT_COLUMN_MAP.filter(
      (candidate) =>
        candidate.implementationState !==
          'canonical_extractor_materialized',
    );
    const gapKeys = gaps
      .map((candidate) => candidate.featureKey)
      .sort();
    const ledgerKeys = FR294_HARD_GAP_FRONTIER
      .map((candidate) => candidate.featureKey)
      .sort();

    expect(gaps).toHaveLength(11);
    expect(ledgerKeys).toEqual(gapKeys);
    expect(FR294_HARD_GAP_COUNTS).toEqual({
      total: 11,
      newImageModel: 5,
      rgbRelative3DBenchmark: 4,
      earVisibilityThenImageModel: 1,
      remainUnavailable: 1,
    });
  });

  it('leaves no reusable-now or partial-gap column unresolved', () => {
    const matrix = new Map(
      FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
        .featureEntries
        .map((candidate) => [
          candidate.featureKey,
          candidate,
        ]),
    );

    for (const candidate of FR294_HARD_GAP_FRONTIER) {
      const authority = matrix.get(candidate.featureKey);
      expect(authority).toBeDefined();
      expect(authority?.readiness).not.toBe('reusable_now');
      expect(authority?.readiness).not.toBe('partial_gap');
      expect(candidate.canonicalMaterializationAllowedNow)
        .toBe(false);
    }
  });

  it('routes every gap to an evidence-bearing lane with explicit shortcut bans', () => {
    for (const candidate of FR294_HARD_GAP_FRONTIER) {
      expect(candidate.nextEvidenceRequirement.trim().length)
        .toBeGreaterThan(0);
      expect(candidate.prohibitedShortcuts.length)
        .toBeGreaterThan(0);
      expect(
        new Set(candidate.prohibitedShortcuts).size,
      ).toBe(candidate.prohibitedShortcuts.length);
    }

    expect(
      FR294_HARD_GAP_FRONTIER.filter(
        (candidate) =>
          candidate.lane === 'new_image_model',
      ),
    ).toHaveLength(5);
    expect(
      FR294_HARD_GAP_FRONTIER.filter(
        (candidate) =>
          candidate.lane === 'rgb_relative_3d_benchmark',
      ),
    ).toHaveLength(4);
    expect(
      FR294_HARD_GAP_FRONTIER.filter(
        (candidate) =>
          candidate.lane ===
            'ear_visibility_then_image_model',
      ),
    ).toHaveLength(1);
    expect(
      FR294_HARD_GAP_FRONTIER.filter(
        (candidate) =>
          candidate.lane === 'remain_unavailable',
      ),
    ).toHaveLength(1);
  });

  it('does not promote any additional product column', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState ===
            'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);

    expect(() => assertFR294HardGapFrontier())
      .not.toThrow();
  });
});
