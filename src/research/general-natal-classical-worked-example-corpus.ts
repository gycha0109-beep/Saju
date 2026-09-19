export const R081_CLASSICAL_WORKED_EXAMPLE_CORPUS_VERSION = '0.1.0-research' as const;

export const R081_PRIMARY_SOURCE = Object.freeze({
  title: '子平真詮評註',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
  authorityUse: 'SOURCE_LOCAL_INTERPRETATION_ONLY',
});

export const R081_EXAMPLES = Object.freeze([
  {
    id: 'WU-TINGFANG-FOLLOW-KILL',
    kind: 'NAMED_COMMENTARY_EXAMPLE',
    person: '伍廷芳',
    chart: ['壬寅', '丁未', '己卯', '乙亥'] as const,
    mechanismTags: ['HAI_MAO_WEI_WOOD_MEETING', 'DING_REN_TRANSFORMATION_CLAIM', 'FOLLOW_KILL'] as const,
    sourceConclusion: '從煞格成',
    independentlyHistoricallyVerified: false,
    engineGroundTruth: false,
    executable: false,
  },
  {
    id: 'WANG-KEMIN-WATER-MEETING',
    kind: 'NAMED_COMMENTARY_EXAMPLE',
    person: '王克敏',
    chart: ['丙子', '壬辰', '壬申', '乙巳'] as const,
    mechanismTags: ['SHEN_ZI_CHEN_WATER_MEETING', 'STRUCTURAL_CHANGE', 'HURTING_OFFICER_GENERATES_WEALTH'] as const,
    sourceConclusion: '變為傷官生財格',
    independentlyHistoricallyVerified: false,
    engineGroundTruth: false,
    executable: false,
  },
  {
    id: 'XIAO-YAONAN-BLADE-KILL',
    kind: 'NAMED_COMMENTARY_EXAMPLE',
    person: '蕭耀南',
    chart: ['乙亥', '己卯', '甲申', '乙亥'] as const,
    mechanismTags: ['YANG_BLADE', 'SHEN_METAL_CONTROL', 'BLADE_KILL'] as const,
    sourceConclusion: '煞刃格成',
    independentlyHistoricallyVerified: false,
    engineGroundTruth: false,
    executable: false,
  },
  {
    id: 'ZHANG-ZAIYANG-RESCUE',
    kind: 'NAMED_COMMENTARY_EXAMPLE',
    person: '張載陽',
    chart: ['癸酉', '乙丑', '庚寅', '丙子'] as const,
    mechanismTags: ['HURTING_CONTROLS_KILL', 'WEALTH_FEEDS_KILL_CONTAMINATION', 'YI_GENG_COMBINATION_RESCUE'] as const,
    sourceConclusion: '以本身之合為救應',
    independentlyHistoricallyVerified: false,
    engineGroundTruth: false,
    executable: false,
  },
  {
    id: 'JIA-CHEN-GUI-SHEN-ZI',
    kind: 'SCHEMATIC_WORKED_EXAMPLE',
    person: null,
    chart: null,
    schematicInput: '甲生辰月 + 透癸 + 會子申',
    mechanismTags: ['TRANSPARENCY', 'SHEN_ZI_CHEN_WATER_MEETING', 'WEALTH_TO_SEAL_CHANGE'] as const,
    sourceConclusion: '印綬之格成; further whole-chart needs remain',
    independentlyHistoricallyVerified: false,
    engineGroundTruth: false,
    executable: false,
  },
  {
    id: 'REN-WEI-JI-HAI-MAO',
    kind: 'SCHEMATIC_WORKED_EXAMPLE',
    person: null,
    chart: null,
    schematicInput: '壬生未月 + 透己 + 會亥卯',
    mechanismTags: ['OFFICER_EXPOSED', 'HAI_MAO_WEI_WOOD_MEETING', 'CONFLICT', 'RESCUE_OPTIONS'] as const,
    sourceConclusion: '合而無情; 印或財可依條件救應',
    independentlyHistoricallyVerified: false,
    engineGroundTruth: false,
    executable: false,
  },
] as const);

export const R081_REJECTED_SHORTCUTS = Object.freeze([
  'SOURCE_EXAMPLE_EQUALS_INDEPENDENT_HISTORY',
  'SOURCE_EXAMPLE_EQUALS_ENGINE_GROUND_TRUTH',
  'SINGLE_EXAMPLE_PROVES_UNIVERSAL_RULE',
  'NAMED_PERSON_OUTCOME_ACCEPTED_WITHOUT_INDEPENDENT_CHRONOLOGY',
  'SOURCE_ROW_AUTO_PROMOTES_PRODUCTION_AUTHORITY',
] as const);

export const R081_AUTHORITY = Object.freeze({
  status: 'VERIFIED_SOURCE_BOUNDED_WORKED_EXAMPLE_CORPUS' as const,
  exampleCount: 6,
  namedExampleCount: 4,
  schematicExampleCount: 2,
  engineGroundTruthAuthorized: false,
  historicalOutcomeAuthorityAuthorized: false,
  productionAuthorityPromoted: false,
});
