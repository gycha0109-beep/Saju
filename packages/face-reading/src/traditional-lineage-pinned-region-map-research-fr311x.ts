import {
  FIVE_MOUNTAINS_FR311S,
  FIVE_OFFICERS_FR311S,
  FIVE_STARS_SIX_LUMINARIES_FR311S,
  FOUR_WATERWAYS_FR311S,
  SIX_MINISTRIES_FR311S,
  THIRTEEN_PARTS_FR311S,
  THREE_DIVISIONS_GUJIN631_FR311S,
  THREE_DIVISIONS_GUJIN632_FR311S,
  TWELVE_PALACES_FR311S,
  type StaticMethodologyDefinitionFR311S,
} from './traditional-static-structure-methodology-fr311s.js';
import {
  FR311V_METHODOLOGY_AUDIT,
  FR311V_RULE_AUDIT,
} from './traditional-expanded-static-observation-gap-audit-fr311v.js';

export type TraditionalRegionLocatorKindFR311X =
  | 'broad_region_label'
  | 'ordered_axial_label'
  | 'source_range'
  | 'paired_source_range'
  | 'semantic_alias'
  | 'source_anchor'
  | 'unresolved_named_subregion';

export type TraditionalRegionMapKindFR311X =
  | 'semantic_region_set'
  | 'broad_region_set'
  | 'paired_range_set'
  | 'vertical_range_partition'
  | 'mixed_range_and_anchor_set'
  | 'ordered_axial_labels'
  | 'semantic_palace_locator_set'
  | 'source_anchor_triplet'
  | 'named_subregion_set';

export interface TraditionalRegionNodeFR311X {
  readonly nodeId: string;
  readonly traditionalLabel: string;
  readonly sourceLocatorExpression: string;
  readonly locatorKind: TraditionalRegionLocatorKindFR311X;
  readonly sourceBoundaryPrecision:
    | 'broad_region_only'
    | 'named_anchor_only'
    | 'source_range_only'
    | 'unresolved';
  readonly neutralGeometryCoordinatesIssued: false;
  readonly providerLandmarkAliasAuthorized: false;
}

export interface LineagePinnedRegionMapFR311X {
  readonly mapId: string;
  readonly lineageId: string;
  readonly sourceSection: string;
  readonly mapKind: TraditionalRegionMapKindFR311X;
  readonly sourceRefs: readonly string[];
  readonly nodes: readonly TraditionalRegionNodeFR311X[];
  readonly lineagePinned: true;
  readonly sourceTextOnlyNoCoordinates: true;
  readonly crossLineageMergeAuthorized: false;
  readonly neutralGeometryOperationalized: false;
  readonly providerLandmarkMappingAuthorized: false;
  readonly productionRegionMapAuthorized: false;
  readonly automaticTraditionalBindingAuthorized: false;
}

export interface RegionMapTargetResolutionFR311X {
  readonly targetId: string;
  readonly targetKind: 'rule' | 'methodology';
  readonly requiredMapIds: readonly string[];
  readonly requiredNodeIds: readonly string[];
  readonly researchResolution:
    | 'map_defined_source_text_only'
    | 'map_reference_composite_only'
    | 'named_subregion_preserved_unresolved';
  readonly regionMapResearchComplete: true;
  readonly neutralGeometryOperationalized: false;
  readonly empiricalValidationEligible: false;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

const GUJIN_631 = 'witness.gujin473.art631.wikisource';
const GUJIN_642 = 'witness.gujin473.art642.wikisource';

function node(
  nodeId: string,
  traditionalLabel: string,
  sourceLocatorExpression: string,
  locatorKind: TraditionalRegionLocatorKindFR311X,
  sourceBoundaryPrecision:
    TraditionalRegionNodeFR311X['sourceBoundaryPrecision'],
): TraditionalRegionNodeFR311X {
  return Object.freeze({
    nodeId,
    traditionalLabel,
    sourceLocatorExpression,
    locatorKind,
    sourceBoundaryPrecision,
    neutralGeometryCoordinatesIssued: false as const,
    providerLandmarkAliasAuthorized: false as const,
  });
}

function mapFromMethodology(
  methodology: StaticMethodologyDefinitionFR311S,
  mapKind: TraditionalRegionMapKindFR311X,
  locatorKind: TraditionalRegionLocatorKindFR311X,
  sourceBoundaryPrecision:
    TraditionalRegionNodeFR311X['sourceBoundaryPrecision'],
): LineagePinnedRegionMapFR311X {
  return Object.freeze({
    mapId: 'fr311x.map.' + methodology.methodologyId,
    lineageId: methodology.lineageId,
    sourceSection: methodology.sourceSection,
    mapKind,
    sourceRefs: Object.freeze([...methodology.sourceRefs]),
    nodes: Object.freeze(
      methodology.members.map((member) =>
        node(
          methodology.methodologyId + '.' + member.memberKey,
          member.traditionalLabel,
          member.sourceLocatorExpression,
          locatorKind,
          sourceBoundaryPrecision,
        ),
      ),
    ),
    lineagePinned: true as const,
    sourceTextOnlyNoCoordinates: true as const,
    crossLineageMergeAuthorized: false as const,
    neutralGeometryOperationalized: false as const,
    providerLandmarkMappingAuthorized: false as const,
    productionRegionMapAuthorized: false as const,
    automaticTraditionalBindingAuthorized: false as const,
  });
}

export const FR311X_GUJIN642_FOREHEAD_FIVE_POSITIONS:
LineagePinnedRegionMapFR311X = Object.freeze({
  mapId: 'fr311x.map.gujin642.forehead_five_positions',
  lineageId: 'shenxiang_quanbian.gujin642.forehead_section',
  sourceSection: '神相全編十二.額部相',
  mapKind: 'ordered_axial_labels',
  sourceRefs: Object.freeze([GUJIN_642]),
  nodes: Object.freeze([
    node('gujin642.forehead.tianzhong', '天中', '天中', 'ordered_axial_label', 'named_anchor_only'),
    node('gujin642.forehead.tianting', '天庭', '天庭', 'ordered_axial_label', 'named_anchor_only'),
    node('gujin642.forehead.sikong', '司空', '司空', 'ordered_axial_label', 'named_anchor_only'),
    node('gujin642.forehead.zhongzheng', '中正', '中正', 'ordered_axial_label', 'named_anchor_only'),
    node('gujin642.forehead.yintang', '印堂', '印堂', 'ordered_axial_label', 'named_anchor_only'),
  ]),
  lineagePinned: true,
  sourceTextOnlyNoCoordinates: true,
  crossLineageMergeAuthorized: false,
  neutralGeometryOperationalized: false,
  providerLandmarkMappingAuthorized: false,
  productionRegionMapAuthorized: false,
  automaticTraditionalBindingAuthorized: false,
});

export const FR311X_GUJIN631_TEN_OBSERVATIONS_FIVE_MOUNTAINS:
LineagePinnedRegionMapFR311X = Object.freeze({
  mapId: 'fr311x.map.gujin631.ten_observations.five_mountains',
  lineageId: 'shenxiang_quanbian.gujin631.ten_observations',
  sourceSection: '神相全編一.十觀',
  mapKind: 'broad_region_set',
  sourceRefs: Object.freeze([GUJIN_631]),
  nodes: Object.freeze([
    node(
      'gujin631.ten_observations.east_mountain',
      '東岳',
      '左顴爲東岳',
      'semantic_alias',
      'broad_region_only',
    ),
    node(
      'gujin631.ten_observations.south_mountain',
      '南岳',
      '額爲南岳',
      'semantic_alias',
      'broad_region_only',
    ),
    node(
      'gujin631.ten_observations.west_mountain',
      '西岳',
      '右顴爲西岳',
      'semantic_alias',
      'broad_region_only',
    ),
    node(
      'gujin631.ten_observations.north_mountain',
      '北岳',
      '地閣爲北岳',
      'semantic_alias',
      'broad_region_only',
    ),
    node(
      'gujin631.ten_observations.center_mountain',
      '中岳',
      '土星爲中岳',
      'semantic_alias',
      'broad_region_only',
    ),
  ]),
  lineagePinned: true,
  sourceTextOnlyNoCoordinates: true,
  crossLineageMergeAuthorized: false,
  neutralGeometryOperationalized: false,
  providerLandmarkMappingAuthorized: false,
  productionRegionMapAuthorized: false,
  automaticTraditionalBindingAuthorized: false,
});

export const FR311X_GUJIN631_TEN_OBSERVATIONS_THREE_STOPS:
LineagePinnedRegionMapFR311X = Object.freeze({
  mapId: 'fr311x.map.gujin631.ten_observations.three_stops_anchor_triplet',
  lineageId: 'shenxiang_quanbian.gujin631.ten_observations',
  sourceSection: '神相全編一.十觀',
  mapKind: 'source_anchor_triplet',
  sourceRefs: Object.freeze([GUJIN_631]),
  nodes: Object.freeze([
    node(
      'gujin631.ten_observations.three_stops.forehead_gate',
      '額門',
      '三停者，額門、準頭、地角',
      'source_anchor',
      'named_anchor_only',
    ),
    node(
      'gujin631.ten_observations.three_stops.nose_tip',
      '準頭',
      '三停者，額門、準頭、地角',
      'source_anchor',
      'named_anchor_only',
    ),
    node(
      'gujin631.ten_observations.three_stops.earth_corner',
      '地角',
      '三停者，額門、準頭、地角',
      'source_anchor',
      'named_anchor_only',
    ),
  ]),
  lineagePinned: true,
  sourceTextOnlyNoCoordinates: true,
  crossLineageMergeAuthorized: false,
  neutralGeometryOperationalized: false,
  providerLandmarkMappingAuthorized: false,
  productionRegionMapAuthorized: false,
  automaticTraditionalBindingAuthorized: false,
});

export const FR311X_GUJIN642_LOWER_FACE_SUBREGIONS:
LineagePinnedRegionMapFR311X = Object.freeze({
  mapId: 'fr311x.map.gujin642.lower_face_named_subregions',
  lineageId: 'shenxiang_quanbian.gujin642.lower_face_bone_structure',
  sourceSection: '神相全編十二.相面部骨格',
  mapKind: 'named_subregion_set',
  sourceRefs: Object.freeze([GUJIN_642]),
  nodes: Object.freeze([
    node(
      'gujin642.lower_face.dige',
      '地閣',
      '地閣骨滿',
      'unresolved_named_subregion',
      'unresolved',
    ),
    node(
      'gujin642.lower_face.chengjiang',
      '承漿',
      '承漿豐滿',
      'unresolved_named_subregion',
      'unresolved',
    ),
    node(
      'gujin642.lower_face.xuanbi',
      '懸壁',
      '懸壁骨起，及肉滿',
      'unresolved_named_subregion',
      'unresolved',
    ),
    node(
      'gujin642.lower_face.yanhan',
      '燕頷',
      '燕頷骨起',
      'unresolved_named_subregion',
      'unresolved',
    ),
  ]),
  lineagePinned: true,
  sourceTextOnlyNoCoordinates: true,
  crossLineageMergeAuthorized: false,
  neutralGeometryOperationalized: false,
  providerLandmarkMappingAuthorized: false,
  productionRegionMapAuthorized: false,
  automaticTraditionalBindingAuthorized: false,
});

export const FR311X_FIVE_OFFICERS_MAP = mapFromMethodology(
  FIVE_OFFICERS_FR311S,
  'semantic_region_set',
  'semantic_alias',
  'broad_region_only',
);

export const FR311X_FIVE_MOUNTAINS_632_MAP = mapFromMethodology(
  FIVE_MOUNTAINS_FR311S,
  'broad_region_set',
  'semantic_alias',
  'broad_region_only',
);

export const FR311X_FOUR_WATERWAYS_MAP = mapFromMethodology(
  FOUR_WATERWAYS_FR311S,
  'semantic_region_set',
  'semantic_alias',
  'broad_region_only',
);

export const FR311X_SIX_MINISTRIES_MAP = mapFromMethodology(
  SIX_MINISTRIES_FR311S,
  'paired_range_set',
  'paired_source_range',
  'source_range_only',
);

export const FR311X_THREE_DIVISIONS_631_MAP = mapFromMethodology(
  THREE_DIVISIONS_GUJIN631_FR311S,
  'vertical_range_partition',
  'source_range',
  'source_range_only',
);

export const FR311X_THREE_DIVISIONS_632_MAP = mapFromMethodology(
  THREE_DIVISIONS_GUJIN632_FR311S,
  'mixed_range_and_anchor_set',
  'source_range',
  'source_range_only',
);

export const FR311X_THIRTEEN_PARTS_MAP = mapFromMethodology(
  THIRTEEN_PARTS_FR311S,
  'ordered_axial_labels',
  'ordered_axial_label',
  'named_anchor_only',
);

export const FR311X_TWELVE_PALACES_MAP = mapFromMethodology(
  TWELVE_PALACES_FR311S,
  'semantic_palace_locator_set',
  'source_range',
  'source_range_only',
);

export const FR311X_FIVE_STARS_SIX_LUMINARIES_MAP = mapFromMethodology(
  FIVE_STARS_SIX_LUMINARIES_FR311S,
  'semantic_region_set',
  'semantic_alias',
  'broad_region_only',
);

export const FR311X_LINEAGE_PINNED_REGION_MAPS:
readonly LineagePinnedRegionMapFR311X[] = Object.freeze([
  FR311X_GUJIN642_FOREHEAD_FIVE_POSITIONS,
  FR311X_GUJIN631_TEN_OBSERVATIONS_FIVE_MOUNTAINS,
  FR311X_GUJIN631_TEN_OBSERVATIONS_THREE_STOPS,
  FR311X_GUJIN642_LOWER_FACE_SUBREGIONS,
  FR311X_FIVE_OFFICERS_MAP,
  FR311X_FIVE_MOUNTAINS_632_MAP,
  FR311X_FOUR_WATERWAYS_MAP,
  FR311X_SIX_MINISTRIES_MAP,
  FR311X_THREE_DIVISIONS_631_MAP,
  FR311X_THREE_DIVISIONS_632_MAP,
  FR311X_THIRTEEN_PARTS_MAP,
  FR311X_TWELVE_PALACES_MAP,
  FR311X_FIVE_STARS_SIX_LUMINARIES_MAP,
]);

const MAP_BY_ID = new Map(
  FR311X_LINEAGE_PINNED_REGION_MAPS.map((item) => [item.mapId, item] as const),
);

function resolution(
  targetId: string,
  targetKind: RegionMapTargetResolutionFR311X['targetKind'],
  requiredMapIds: readonly string[],
  requiredNodeIds: readonly string[],
  researchResolution: RegionMapTargetResolutionFR311X['researchResolution'],
): RegionMapTargetResolutionFR311X {
  return Object.freeze({
    targetId,
    targetKind,
    requiredMapIds: Object.freeze([...requiredMapIds]),
    requiredNodeIds: Object.freeze([...requiredNodeIds]),
    researchResolution,
    regionMapResearchComplete: true as const,
    neutralGeometryOperationalized: false as const,
    empiricalValidationEligible: false as const,
    automaticTraditionalBindingAuthorized: false as const,
    thresholdAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

const M = {
  foreheadFive:
    FR311X_GUJIN642_FOREHEAD_FIVE_POSITIONS.mapId,
  fiveMountains631:
    FR311X_GUJIN631_TEN_OBSERVATIONS_FIVE_MOUNTAINS.mapId,
  threeStops631:
    FR311X_GUJIN631_TEN_OBSERVATIONS_THREE_STOPS.mapId,
  lower642:
    FR311X_GUJIN642_LOWER_FACE_SUBREGIONS.mapId,
  fiveOfficers:
    FR311X_FIVE_OFFICERS_MAP.mapId,
  fiveMountains632:
    FR311X_FIVE_MOUNTAINS_632_MAP.mapId,
  fourWaterways:
    FR311X_FOUR_WATERWAYS_MAP.mapId,
  sixMinistries:
    FR311X_SIX_MINISTRIES_MAP.mapId,
  threeDivisions631:
    FR311X_THREE_DIVISIONS_631_MAP.mapId,
  threeDivisions632:
    FR311X_THREE_DIVISIONS_632_MAP.mapId,
  thirteenParts:
    FR311X_THIRTEEN_PARTS_MAP.mapId,
  twelvePalaces:
    FR311X_TWELVE_PALACES_MAP.mapId,
  fiveStars:
    FR311X_FIVE_STARS_SIX_LUMINARIES_MAP.mapId,
} as const;

export const FR311X_REGION_MAP_TARGET_RESOLUTIONS:
readonly RegionMapTargetResolutionFR311X[] = Object.freeze([
  resolution(
    'fr311r.forehead.five_positions_upright_clear',
    'rule',
    [M.foreheadFive],
    [
      'gujin642.forehead.tianzhong',
      'gujin642.forehead.tianting',
      'gujin642.forehead.sikong',
      'gujin642.forehead.zhongzheng',
      'gujin642.forehead.yintang',
    ],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311r.cheekbone.left_east_mountain',
    'rule',
    [M.fiveMountains631],
    ['gujin631.ten_observations.east_mountain'],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311r.cheekbone.right_west_mountain',
    'rule',
    [M.fiveMountains631],
    ['gujin631.ten_observations.west_mountain'],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311r.lower_face.di_ge_full_bone',
    'rule',
    [M.lower642],
    ['gujin642.lower_face.dige'],
    'named_subregion_preserved_unresolved',
  ),
  resolution(
    'fr311r.lower_face.chengjiang_full',
    'rule',
    [M.lower642],
    ['gujin642.lower_face.chengjiang'],
    'named_subregion_preserved_unresolved',
  ),
  resolution(
    'fr311r.lower_face.xuanbi_full',
    'rule',
    [M.lower642],
    ['gujin642.lower_face.xuanbi'],
    'named_subregion_preserved_unresolved',
  ),
  resolution(
    'fr311r.lower_face.yanhan_raised',
    'rule',
    [M.lower642],
    ['gujin642.lower_face.yanhan'],
    'named_subregion_preserved_unresolved',
  ),
  resolution(
    'fr311r.whole_face.five_mountains_three_divisions',
    'rule',
    [M.fiveMountains631, M.threeStops631],
    [],
    'map_reference_composite_only',
  ),

  resolution(
    'fr311s.gujin632.five_officers',
    'methodology',
    [M.fiveOfficers],
    [],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311s.gujin632.five_mountains',
    'methodology',
    [M.fiveMountains632],
    [],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311s.gujin632.four_waterways',
    'methodology',
    [M.fourWaterways],
    [],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311s.gujin632.six_ministries',
    'methodology',
    [M.sixMinistries],
    [],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311s.gujin631.face_three_divisions',
    'methodology',
    [M.threeDivisions631],
    [],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311s.gujin632.three_talents_three_divisions',
    'methodology',
    [M.threeDivisions632],
    [],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311s.gujin631.thirteen_parts',
    'methodology',
    [M.thirteenParts],
    [],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311s.gujin631.twelve_palaces',
    'methodology',
    [M.twelvePalaces],
    [],
    'map_defined_source_text_only',
  ),
  resolution(
    'fr311s.gujin632.five_stars_six_luminaries',
    'methodology',
    [M.fiveStars],
    [],
    'map_defined_source_text_only',
  ),
]);

export const FR311X_RESEARCH_SUMMARY = Object.freeze({
  auditedTargets: FR311X_REGION_MAP_TARGET_RESOLUTIONS.length,
  mapDefinitions: FR311X_LINEAGE_PINNED_REGION_MAPS.length,
  unresolvedNamedSubregionTargets:
    FR311X_REGION_MAP_TARGET_RESOLUTIONS
      .filter((item) =>
        item.researchResolution === 'named_subregion_preserved_unresolved')
      .length,
  compositeReferenceTargets:
    FR311X_REGION_MAP_TARGET_RESOLUTIONS
      .filter((item) =>
        item.researchResolution === 'map_reference_composite_only')
      .length,
  sourceTextOnlyMapTargets:
    FR311X_REGION_MAP_TARGET_RESOLUTIONS
      .filter((item) =>
        item.researchResolution === 'map_defined_source_text_only')
      .length,
  neutralGeometryOperationalizedTargets:
    FR311X_REGION_MAP_TARGET_RESOLUTIONS
      .filter((item) => item.neutralGeometryOperationalized).length,
  empiricalValidationEligibleTargets:
    FR311X_REGION_MAP_TARGET_RESOLUTIONS
      .filter((item) => item.empiricalValidationEligible).length,
  crossLineageCanonicalMapsAuthorized: 0,
  providerLandmarkMappingsAuthorized: 0,
  automaticTraditionalBindingsAuthorized: 0,
  thresholdsAuthorized: 0,
  productInterpretationsAuthorized: 0,
});

export const FR311X_AUTHORITY_BOUNDARY = Object.freeze({
  sourceTextMayBeMadeMorePreciseThanWitness: false as const,
  crossLineageCanonicalMergeAuthorized: false as const,
  providerLandmarkDirectAliasAuthorized: false as const,
  screenSideMayStandForAnatomicalSide: false as const,
  inventedCoordinatesAuthorized: false as const,
  inventedPolygonAuthorized: false as const,
  neutralGeometryOperationalized: false as const,
  empiricalValidationAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  thresholdAuthorized: false as const,
  populationNormAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export function assertLineagePinnedRegionMapResearchFR311X(): void {
  const expectedRuleTargets = FR311V_RULE_AUDIT
    .filter((item) => item.nextResearchLane === 'region_map_research')
    .map((item) => item.targetId);
  const expectedMethodTargets = FR311V_METHODOLOGY_AUDIT
    .filter((item) => item.nextResearchLane === 'region_map_research')
    .map((item) => item.targetId);
  const expected = [...expectedRuleTargets, ...expectedMethodTargets].sort();
  const actual = FR311X_REGION_MAP_TARGET_RESOLUTIONS
    .map((item) => item.targetId)
    .sort();

  if (
    expected.length !== 17 ||
    actual.length !== 17 ||
    JSON.stringify(expected) !== JSON.stringify(actual)
  ) {
    throw new Error('fr311x_target_coverage_drift');
  }

  const mapIds = FR311X_LINEAGE_PINNED_REGION_MAPS.map((item) => item.mapId);
  if (new Set(mapIds).size !== mapIds.length) {
    throw new Error('fr311x_duplicate_map_id');
  }

  for (const map of FR311X_LINEAGE_PINNED_REGION_MAPS) {
    if (
      map.sourceRefs.length === 0 ||
      map.nodes.length === 0 ||
      map.lineagePinned !== true ||
      map.sourceTextOnlyNoCoordinates !== true ||
      map.crossLineageMergeAuthorized !== false ||
      map.neutralGeometryOperationalized !== false ||
      map.providerLandmarkMappingAuthorized !== false ||
      map.productionRegionMapAuthorized !== false ||
      map.automaticTraditionalBindingAuthorized !== false
    ) {
      throw new Error('fr311x_map_authority_drift:' + map.mapId);
    }

    for (const member of map.nodes) {
      if (
        member.traditionalLabel.trim().length === 0 ||
        member.sourceLocatorExpression.trim().length === 0 ||
        member.neutralGeometryCoordinatesIssued !== false ||
        member.providerLandmarkAliasAuthorized !== false
      ) {
        throw new Error(
          'fr311x_invalid_node:' + map.mapId + ':' + member.nodeId,
        );
      }
    }
  }

  if (
    FR311X_THREE_DIVISIONS_631_MAP.lineageId ===
      FR311X_THREE_DIVISIONS_632_MAP.lineageId ||
    FR311X_GUJIN631_TEN_OBSERVATIONS_THREE_STOPS.mapId ===
      FR311X_THREE_DIVISIONS_631_MAP.mapId
  ) {
    throw new Error('fr311x_three_divisions_lineage_or_section_collapsed');
  }

  for (const target of FR311X_REGION_MAP_TARGET_RESOLUTIONS) {
    for (const mapId of target.requiredMapIds) {
      if (!MAP_BY_ID.has(mapId)) {
        throw new Error('fr311x_unknown_required_map:' + target.targetId);
      }
    }

    const availableNodeIds = new Set(
      target.requiredMapIds.flatMap((mapId) =>
        MAP_BY_ID.get(mapId)?.nodes.map((item) => item.nodeId) ?? []),
    );
    for (const nodeId of target.requiredNodeIds) {
      if (!availableNodeIds.has(nodeId)) {
        throw new Error(
          'fr311x_unknown_required_node:' + target.targetId + ':' + nodeId,
        );
      }
    }

    if (
      target.regionMapResearchComplete !== true ||
      target.neutralGeometryOperationalized !== false ||
      target.empiricalValidationEligible !== false ||
      target.automaticTraditionalBindingAuthorized !== false ||
      target.thresholdAuthorized !== false ||
      target.productInterpretationAuthorized !== false
    ) {
      throw new Error('fr311x_target_authority_drift:' + target.targetId);
    }
  }

  if (
    FR311X_RESEARCH_SUMMARY.auditedTargets !== 17 ||
    FR311X_RESEARCH_SUMMARY.neutralGeometryOperationalizedTargets !== 0 ||
    FR311X_RESEARCH_SUMMARY.empiricalValidationEligibleTargets !== 0
  ) {
    throw new Error('fr311x_summary_drift');
  }

  for (const [key, value] of Object.entries(FR311X_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr311x_global_authority_widening:' + key);
    }
  }
}
