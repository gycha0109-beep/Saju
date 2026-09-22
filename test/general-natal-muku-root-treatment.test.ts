import { describe, expect, it } from 'vitest';
import {
  R014_AUTHORITY,
  R014_DIRECT_VISUAL_SOURCE,
  R014_ELEMENT_MUKU_MAP,
  R014_EXACT_EXCLUSION_BOUNDARY,
  R014_MUKU_ROOT_VERSION,
  R014_REJECTED_SHORTCUTS,
  R014_SEASONAL_BOUNDARY,
  R014_SOURCE_STRATUM_TENSION,
  R014_STEM_BRANCH_MATRIX,
  R014_UPSTREAM_TONGGEN_BOUNDARY,
} from '../src/research/general-natal-muku-root-treatment.js';

describe('R014 Muku root treatment by stem and season', () => {
  it('pins the direct visual source and exact four-element Muku map', () => {
    expect(R014_MUKU_ROOT_VERSION).toBe('0.2.0-research');
    expect(R014_DIRECT_VISUAL_SOURCE).toMatchObject({
      scanId: 'NLC416-11jh010455-35296',
      printedPage: '十四',
      evidenceMode: 'DIRECT_VISUAL_SCAN',
    });
    expect(R014_ELEMENT_MUKU_MAP).toEqual([
      { element: 'WOOD', branch: '未' },
      { element: 'FIRE', branch: '戌' },
      { element: 'METAL', branch: '丑' },
      { element: 'WATER', branch: '辰' },
    ]);
  });

  it('builds all 40 stem x storehouse-branch rows without inventing Earth Muku', () => {
    expect(R014_STEM_BRANCH_MATRIX).toHaveLength(40);
    expect(
      R014_STEM_BRANCH_MATRIX.filter(
        (row) => row.disposition === 'EARTH_BOUNDARY_UNRESOLVED',
      ),
    ).toHaveLength(8);
    expect(
      R014_STEM_BRANCH_MATRIX.some(
        (row) => row.element === 'EARTH' && row.muku !== null,
      ),
    ).toBe(false);
  });

  it('keeps Yang own-Muku support and Yin own-Muku tension distinct', () => {
    expect(R014_STEM_BRANCH_MATRIX).toContainEqual(
      expect.objectContaining({
        sourceStem: '丙',
        branch: '戌',
        disposition: 'BASE_TEXT_ROOT_SUPPORTED_COMMENTARY_APPLICABLE',
      }),
    );
    expect(R014_STEM_BRANCH_MATRIX).toContainEqual(
      expect.objectContaining({
        sourceStem: '丁',
        branch: '戌',
        disposition: 'SOURCE_INTERNAL_TENSION_YIN',
      }),
    );
    expect(R014_SOURCE_STRATUM_TENSION.resolution).toBe('PRESERVE_DISAGREEMENT');
    expect(R014_AUTHORITY.yinYangTreatmentResolved).toBe(false);
  });

  it('preserves exact exclusions without turning every nonmatch into global not-Tonggen', () => {
    expect(R014_EXACT_EXCLUSION_BOUNDARY).toEqual([
      { stem: '乙', branch: '戌', disposition: 'SELECTED_SOURCE_TONGGEN_EXCLUDED' },
      { stem: '丁', branch: '丑', disposition: 'SELECTED_SOURCE_TONGGEN_EXCLUDED' },
    ]);
    expect(R014_REJECTED_SHORTCUTS).toContain(
      'NONMATCHING_MUKU_ROW_EQUALS_GLOBAL_NOT_TONGGEN',
    );
    expect(R014_UPSTREAM_TONGGEN_BOUNDARY.generalizedRootToTonggenEquivalenceAuthorized).toBe(
      false,
    );
  });

  it('keeps Yuqi temporal observation from mutating Muku applicability', () => {
    expect(R014_SEASONAL_BOUNDARY.yuqiTemporalVariabilityObserved).toBe(true);
    expect(R014_SEASONAL_BOUNDARY.qingmingRuntimeRepresentabilityIsSemanticAuthority).toBe(
      false,
    );
    expect(R014_SEASONAL_BOUNDARY.mukuSeasonalMultiplierEstablished).toBe(false);
    expect(R014_SEASONAL_BOUNDARY.mukuApplicabilityChangesAtQingmingPlus12Days).toBe(false);
    expect(
      R014_SEASONAL_BOUNDARY.mukuApplicabilityChangesAfterUnresolvedTuwangBoundary,
    ).toBe(false);
    expect(R014_SEASONAL_BOUNDARY.tuwangAfterBoundaryGoverned).toBe(false);
  });

  it('does not require clash to open root in the selected-source scope', () => {
    expect(R014_AUTHORITY.clashRequiredToOpenRoot).toBe(false);
    expect(R014_REJECTED_SHORTCUTS).toContain('MUKU_REQUIRES_CLASH_TO_OPEN_ROOT');
  });

  it('closes only bounded research authority', () => {
    expect(R014_AUTHORITY).toEqual({
      status: 'VERIFIED_BOUNDED_MUKU_APPLICABILITY_MATRIX',
      matrixRowCount: 40,
      directVisualGlyphClosureComplete: true,
      anyMukuRootsAnyStem: false,
      applicableElementMukuCanRoot: 'SUPPORTED_BOUNDED',
      clashRequiredToOpenRoot: false,
      yinYangTreatmentResolved: false,
      earthMukuResolved: false,
      mukuYuqiCollapsed: false,
      mukuSeasonalEvaluatorCreated: false,
      numericMukuWeightAuthorized: false,
      finalStrengthClassifierAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
