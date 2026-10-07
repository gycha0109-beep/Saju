import { describe, expect, it } from 'vitest';
import {
  ARCHITECTURE_EXCLUDED_RESEARCH_AREAS_FR311T,
  FR311T_STATIC_RESEARCH_AUTHORITY_BOUNDARY,
  FR311T_STATIC_RESEARCH_CLOSURE,
  STATIC_FACE_RESEARCH_COVERAGE_FR311T,
  assertStaticFaceResearchClosureFR311T,
} from './traditional-static-face-research-coverage-fr311t.js';

describe('FR311T V1 static traditional face-research closure', () => {
  it('closes every declared static core research area before empirical validation', () => {
    assertStaticFaceResearchClosureFR311T();

    expect(FR311T_STATIC_RESEARCH_CLOSURE).toMatchObject({
      staticCoreAreas: 23,
      staticCoreResearchComplete: 23,
      staticCoreResearchMissing: 0,
      explicitArchitectureExclusions: 2,
      missingTraditionalRegions: 0,
      empiricalValidationStarted: false,
      automaticTraditionalBindingsAuthorized: 0,
      metricThresholdsAuthorized: 0,
      populationNormsAuthorized: 0,
      productInterpretationsAuthorized: 0,
    });

    expect(STATIC_FACE_RESEARCH_COVERAGE_FR311T).toHaveLength(23);
  });

  it('makes the previously missing forehead, cheekbone, chin/lower-face and whole-face areas explicit', () => {
    const byKey = new Map(
      STATIC_FACE_RESEARCH_COVERAGE_FR311T
        .map((item) => [item.areaKey, item] as const),
    );

    for (const key of [
      'forehead',
      'cheekbones',
      'chin_lower_face',
      'whole_face',
    ] as const) {
      const item = byKey.get(key);
      expect(item, key).toBeDefined();
      expect(item?.sourceBackedRecordCount, key).toBeGreaterThan(0);
      expect(item?.researchState, key).toBe('static_source_research_complete');
    }
  });

  it('requires the structural systems to be source-researched before validation', () => {
    const required = [
      'five_officers',
      'five_mountains',
      'four_waterways',
      'six_ministries',
      'three_divisions',
      'thirteen_parts',
      'twelve_palaces',
      'five_stars_six_luminaries',
      'study_halls',
      'five_element_forms',
      'ten_observations',
      'five_methods',
      'three_masters',
      'three_pillars',
    ];

    const completed = new Set(
      STATIC_FACE_RESEARCH_COVERAGE_FR311T
        .filter((item) =>
          item.researchState === 'static_source_research_complete')
        .map((item) => item.areaKey),
    );

    for (const key of required) {
      expect(completed.has(key as never), key).toBe(true);
    }
  });

  it('does not hide architecture-disabled dynamic work as a static research gap', () => {
    expect(ARCHITECTURE_EXCLUDED_RESEARCH_AREAS_FR311T).toEqual([
      expect.objectContaining({
        areaKey: 'dynamic_color_appearance_f5',
        state: 'architecture_disabled_outside_v1_static_research',
        productionAuthorized: false,
      }),
      expect.objectContaining({
        areaKey: 'full_100_year_age_map',
        state: 'architecture_disabled_outside_v1_static_research',
        productionAuthorized: false,
      }),
    ]);
  });

  it('keeps empirical validation and every promotion authority closed', () => {
    for (const item of STATIC_FACE_RESEARCH_COVERAGE_FR311T) {
      expect(item.empiricalValidationStarted, item.areaKey).toBe(false);
      expect(item.automaticTraditionalBindingAuthorized, item.areaKey)
        .toBe(false);
      expect(item.productInterpretationAuthorized, item.areaKey).toBe(false);
    }

    for (const [key, value] of Object.entries(
      FR311T_STATIC_RESEARCH_AUTHORITY_BOUNDARY,
    )) {
      expect(value, key).toBe(false);
    }
  });
});
