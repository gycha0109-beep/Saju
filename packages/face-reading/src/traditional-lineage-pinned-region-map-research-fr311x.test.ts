import { describe, expect, it } from 'vitest';
import {
  FR311V_METHODOLOGY_AUDIT,
  FR311V_RULE_AUDIT,
} from './traditional-expanded-static-observation-gap-audit-fr311v.js';
import {
  FR311X_AUTHORITY_BOUNDARY,
  FR311X_GUJIN631_TEN_OBSERVATIONS_FIVE_MOUNTAINS,
  FR311X_GUJIN631_TEN_OBSERVATIONS_THREE_STOPS,
  FR311X_LINEAGE_PINNED_REGION_MAPS,
  FR311X_REGION_MAP_TARGET_RESOLUTIONS,
  FR311X_RESEARCH_SUMMARY,
  FR311X_THREE_DIVISIONS_631_MAP,
  FR311X_THREE_DIVISIONS_632_MAP,
  assertLineagePinnedRegionMapResearchFR311X,
} from './traditional-lineage-pinned-region-map-research-fr311x.js';

describe('FR311X lineage-pinned traditional region-map research', () => {
  it('covers all 17 FR311V region-map targets exactly once', () => {
    assertLineagePinnedRegionMapResearchFR311X();

    const expected = [
      ...FR311V_RULE_AUDIT
        .filter((item) => item.nextResearchLane === 'region_map_research')
        .map((item) => item.targetId),
      ...FR311V_METHODOLOGY_AUDIT
        .filter((item) => item.nextResearchLane === 'region_map_research')
        .map((item) => item.targetId),
    ].sort();

    expect(expected).toHaveLength(17);
    expect(
      FR311X_REGION_MAP_TARGET_RESOLUTIONS
        .map((item) => item.targetId)
        .sort(),
    ).toEqual(expected);
  });

  it('freezes 13 lineage- and section-pinned source maps without coordinates', () => {
    expect(FR311X_RESEARCH_SUMMARY).toMatchObject({
      auditedTargets: 17,
      mapDefinitions: 13,
      unresolvedNamedSubregionTargets: 4,
      compositeReferenceTargets: 1,
      sourceTextOnlyMapTargets: 12,
      neutralGeometryOperationalizedTargets: 0,
      empiricalValidationEligibleTargets: 0,
      crossLineageCanonicalMapsAuthorized: 0,
      providerLandmarkMappingsAuthorized: 0,
      automaticTraditionalBindingsAuthorized: 0,
      thresholdsAuthorized: 0,
      productInterpretationsAuthorized: 0,
    });

    expect(FR311X_LINEAGE_PINNED_REGION_MAPS).toHaveLength(13);

    for (const map of FR311X_LINEAGE_PINNED_REGION_MAPS) {
      expect(map.lineagePinned, map.mapId).toBe(true);
      expect(map.sourceTextOnlyNoCoordinates, map.mapId).toBe(true);
      expect(map.crossLineageMergeAuthorized, map.mapId).toBe(false);
      expect(map.neutralGeometryOperationalized, map.mapId).toBe(false);
      expect(map.providerLandmarkMappingAuthorized, map.mapId).toBe(false);
      expect(map.productionRegionMapAuthorized, map.mapId).toBe(false);
    }
  });

  it('keeps the two 631 Three-Stops formulations separate', () => {
    expect(
      FR311X_GUJIN631_TEN_OBSERVATIONS_THREE_STOPS.mapId,
    ).not.toBe(FR311X_THREE_DIVISIONS_631_MAP.mapId);

    expect(
      FR311X_GUJIN631_TEN_OBSERVATIONS_THREE_STOPS.nodes
        .map((item) => item.traditionalLabel),
    ).toEqual(['額門', '準頭', '地角']);

    expect(
      FR311X_THREE_DIVISIONS_631_MAP.nodes
        .map((item) => item.sourceLocatorExpression),
    ).toEqual([
      '自髮際下至眉間',
      '自眉間下至鼻',
      '自準下人中至頦',
    ]);
  });

  it('keeps 631 and 632 Three-Divisions lineages separate', () => {
    expect(FR311X_THREE_DIVISIONS_631_MAP.lineageId)
      .not.toBe(FR311X_THREE_DIVISIONS_632_MAP.lineageId);

    expect(
      FR311X_THREE_DIVISIONS_631_MAP.nodes
        .map((item) => item.sourceLocatorExpression),
    ).not.toEqual(
      FR311X_THREE_DIVISIONS_632_MAP.nodes
        .map((item) => item.sourceLocatorExpression),
    );
  });

  it('uses the 631 Ten-Observations Five-Mountains map for 631 rules', () => {
    const map = FR311X_GUJIN631_TEN_OBSERVATIONS_FIVE_MOUNTAINS;
    expect(map.nodes.map((item) => item.sourceLocatorExpression)).toEqual([
      '左顴爲東岳',
      '額爲南岳',
      '右顴爲西岳',
      '地閣爲北岳',
      '土星爲中岳',
    ]);

    const left = FR311X_REGION_MAP_TARGET_RESOLUTIONS.find(
      (item) => item.targetId === 'fr311r.cheekbone.left_east_mountain',
    );
    const whole = FR311X_REGION_MAP_TARGET_RESOLUTIONS.find(
      (item) =>
        item.targetId ===
        'fr311r.whole_face.five_mountains_three_divisions',
    );

    expect(left?.requiredMapIds).toContain(map.mapId);
    expect(whole?.requiredMapIds).toContain(map.mapId);
    expect(
      whole?.requiredMapIds,
    ).toContain(FR311X_GUJIN631_TEN_OBSERVATIONS_THREE_STOPS.mapId);
  });

  it('preserves unresolved lower-face named subregions instead of inventing polygons', () => {
    const ids = [
      'fr311r.lower_face.di_ge_full_bone',
      'fr311r.lower_face.chengjiang_full',
      'fr311r.lower_face.xuanbi_full',
      'fr311r.lower_face.yanhan_raised',
    ];

    for (const id of ids) {
      const target = FR311X_REGION_MAP_TARGET_RESOLUTIONS.find(
        (item) => item.targetId === id,
      );
      expect(target?.researchResolution, id)
        .toBe('named_subregion_preserved_unresolved');
      expect(target?.neutralGeometryOperationalized, id).toBe(false);
      expect(target?.empiricalValidationEligible, id).toBe(false);
    }
  });

  it('keeps every region map and promotion gate closed', () => {
    for (const target of FR311X_REGION_MAP_TARGET_RESOLUTIONS) {
      expect(target.regionMapResearchComplete, target.targetId).toBe(true);
      expect(target.neutralGeometryOperationalized, target.targetId)
        .toBe(false);
      expect(target.empiricalValidationEligible, target.targetId).toBe(false);
      expect(target.automaticTraditionalBindingAuthorized, target.targetId)
        .toBe(false);
      expect(target.thresholdAuthorized, target.targetId).toBe(false);
      expect(target.productInterpretationAuthorized, target.targetId)
        .toBe(false);
    }

    for (const [key, value] of Object.entries(FR311X_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
