import type { MethodologyDefinition, SourceReference } from '../contracts/interpretation.js';

export const INTERPRETATION_METHODOLOGY_CATALOG_VERSION = 'myeonghwa-methodology-catalog-v1';

export type ResearchMethodologySemanticId =
  | 'M-GEJU-MONTH-ORDER'
  | 'M-STRENGTH-FUYI'
  | 'M-CLIMATE-TIAOHOU'
  | 'M-FLOW-TONGGUAN'
  | 'M-SPECIAL-FOLLOW';

export interface ResearchMethodologySemanticDefinition extends MethodologyDefinition {
  methodologyId: ResearchMethodologySemanticId;
  semanticQuestion: string;
  allowedClaimTypes: readonly string[];
  forbiddenClaimTypes: readonly string[];
  sourceLayerNotes: readonly string[];
}

export const INTERPRETATION_METHODOLOGY_SOURCES = Object.freeze({
  zipingZhenquanCommented: {
    sourceId: 'SRC-METHOD-ZIPING-ZHENQUAN-COMMENTED-CTEXT',
    sourceType: 'classical_text',
    title: '子平真詮評注',
    language: 'zh-Hant',
    locator: {
      section: '論用神 / 論用神成敗救應及取用法評注',
    },
    url: 'https://ctext.org/wiki.pl?chapter=974137&if=gb',
    accessedAt: '2026-08-19',
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    },
    notes:
      'Research transcription containing base-work text and later commentary. Myeonghwa does not collapse the base month-order/geju use semantics with the commentary synthesis of 扶抑、病藥、調候、專旺、通關.',
  } satisfies SourceReference,
  ditianSuiChanwei: {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    sourceType: 'classical_text',
    title: '滴天髓闡微',
    language: 'zh-Hant',
    locator: {
      section: '月令 / 衰旺 / 源流 / 通隔',
    },
    url: 'https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93%E9%97%A1%E5%BE%AE',
    accessedAt: '2026-08-19',
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'public_domain',
      reusePolicy: 'metadata_only',
    },
    notes:
      'Research transcription. Used to distinguish month-order importance from whole-chart strength assessment and to identify flow/mediation as a separate semantic problem.',
  } satisfies SourceReference,
  qiongtongBaojian: {
    sourceId: 'SRC-METHOD-QIONGTONG-BAOJIAN-WIKISOURCE',
    sourceType: 'classical_text',
    title: '窮通寶鑑',
    language: 'zh-Hant',
    locator: {
      section: 'ten stems by seasonal month, including 三冬甲木',
    },
    url: 'https://zh.wikisource.org/zh-hant/%E7%A9%B7%E9%80%9A%E5%AE%9D%E9%89%B4',
    accessedAt: '2026-08-19',
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'public_domain',
      reusePolicy: 'metadata_only',
    },
    notes:
      'Research transcription for season/climate-oriented selection semantics. Not treated as a synonym for day-master strength balancing.',
  } satisfies SourceReference,
  yuanhaiZiping: {
    sourceId: 'SRC-METHOD-YUANHAI-ZIPING-WIKISOURCE',
    sourceType: 'classical_text',
    title: '淵海子平',
    language: 'zh-Hant',
    locator: {
      section: '論日為主 / 論月令',
    },
    url: 'https://zh.wikisource.org/wiki/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E5%A4%A7%E5%85%A8',
    accessedAt: '2026-08-19',
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'public_domain',
      reusePolicy: 'metadata_only',
    },
    notes:
      'Research transcription supporting day-stem-centered analysis with month-order as a major organizing context while requiring whole-chart inspection.',
  } satisfies SourceReference,
});

const COMMON_FORBIDDEN_CLAIMS = [
  'YONGSHIN',
  'GLOBAL_GOOD_ELEMENT',
  'GLOBAL_BAD_ELEMENT',
  'LIFE_SUCCESS_SCORE',
  'PREDICTION_ACCURACY_SCORE',
] as const;

export const RESEARCH_INTERPRETATION_METHODOLOGIES: readonly ResearchMethodologySemanticDefinition[] = Object.freeze([
  {
    methodologyId: 'M-GEJU-MONTH-ORDER',
    version: '0.1.0-research',
    family: 'gyeokguk',
    name: 'Month-order / Gyeokguk structural use',
    description:
      'Research namespace for month-order-centered structural pattern formation, transformation, success/failure, and functional use. It does not share a global yongshin result with balancing or climate methods.',
    semanticQuestion:
      'Given the month-order structure and the full chart, what structural pattern is formed and what functional element/role completes or rescues that pattern?',
    assumptions: [
      'Month-order is a primary structural organizer rather than the sole input.',
      'Visible stems, branch combinations, transformations, damage, rescue, and the rest of the chart can alter the structural result.',
      'A pattern candidate and an established pattern are different states.',
    ],
    requiredFactTypes: ['pillars.year', 'pillars.month', 'pillars.day', 'pillars.hour', 'derivedFacts.tenGods'],
    optionalFactTypes: ['stem_branch_relations', 'hidden_stems', 'month_command'],
    sourceIds: [
      INTERPRETATION_METHODOLOGY_SOURCES.zipingZhenquanCommented.sourceId,
      INTERPRETATION_METHODOLOGY_SOURCES.yuanhaiZiping.sourceId,
    ],
    allowedClaimTypes: [
      'GEJU_CANDIDATE',
      'GEJU_ESTABLISHMENT_STATE',
      'GEJU_TRANSFORMATION_STATE',
      'GEJU_FUNCTIONAL_USE',
    ],
    forbiddenClaimTypes: COMMON_FORBIDDEN_CLAIMS,
    sourceLayerNotes: [
      '子平真詮 base-work month-order/geju semantics must not be conflated with later commentary that groups several distinct selection methods under 用神.',
    ],
    status: 'research',
  },
  {
    methodologyId: 'M-STRENGTH-FUYI',
    version: '0.1.0-research',
    family: 'day_master_strength',
    name: 'Whole-chart strength / Fuyi balancing',
    description:
      'Research namespace for determining day-master strength from month-order, roots, support, control, leakage, and whole-chart structure before any balancing-use claim is emitted.',
    semanticQuestion:
      'Considering season, roots, support, control, leakage, and the whole chart, what is the day-master strength state and what balancing relation follows within this methodology?',
    assumptions: [
      'Month-order matters but cannot by itself determine final strength.',
      'Roots and the remaining pillars can reverse a naive seasonal classification.',
      'No numeric pseudo-confidence score is implied by a categorical strength result.',
    ],
    requiredFactTypes: [
      'pillars.year',
      'pillars.month',
      'pillars.day',
      'pillars.hour',
      'derivedFacts.dayMaster',
      'derivedFacts.tenGods',
    ],
    optionalFactTypes: ['hidden_stems', 'root_strength', 'stem_branch_relations'],
    sourceIds: [
      INTERPRETATION_METHODOLOGY_SOURCES.ditianSuiChanwei.sourceId,
      INTERPRETATION_METHODOLOGY_SOURCES.yuanhaiZiping.sourceId,
      INTERPRETATION_METHODOLOGY_SOURCES.zipingZhenquanCommented.sourceId,
    ],
    allowedClaimTypes: ['DAY_MASTER_STRENGTH_CLASSIFICATION', 'FUYI_BALANCING_USE'],
    forbiddenClaimTypes: COMMON_FORBIDDEN_CLAIMS,
    sourceLayerNotes: [
      'The 滴天髓闡微 strength commentary explicitly warns against treating seasonal command alone as a final strong/weak classification.',
      'The 扶抑 five-method summary in 子平真詮評注 is treated as commentary-layer synthesis rather than silently projected onto every base-work use of 用神.',
    ],
    status: 'research',
  },
  {
    methodologyId: 'M-CLIMATE-TIAOHOU',
    version: '0.1.0-research',
    family: 'yongshin',
    name: 'Seasonal climate / Tiaohou',
    description:
      'Research namespace for cold/heat/dryness/moisture-oriented seasonal needs. Its output is climate-qualified and is not a synonym for day-master strength.',
    semanticQuestion:
      'What seasonal climate imbalance or requirement is identified for this day stem and month context, and what climate-balancing relation is called for?',
    assumptions: [
      'Season and day-stem identity are central inputs.',
      'Climate balancing can disagree with a strength-balancing selection without being a logical contradiction.',
      'Historical text predictions attached to element selection are not automatically authorized as modern user-life claims.',
    ],
    requiredFactTypes: ['pillars.month', 'pillars.day', 'derivedFacts.dayMaster'],
    optionalFactTypes: ['pillars.year', 'pillars.hour', 'hidden_stems', 'five_element_distribution'],
    sourceIds: [
      INTERPRETATION_METHODOLOGY_SOURCES.qiongtongBaojian.sourceId,
      INTERPRETATION_METHODOLOGY_SOURCES.zipingZhenquanCommented.sourceId,
    ],
    allowedClaimTypes: ['CLIMATE_BALANCE_NEED', 'TIAOHOU_CLIMATE_USE'],
    forbiddenClaimTypes: COMMON_FORBIDDEN_CLAIMS,
    sourceLayerNotes: [
      '窮通寶鑑 is used for climate-selection structure only; status/wealth/health statements embedded in historical examples are not automatically imported.',
    ],
    status: 'research',
  },
  {
    methodologyId: 'M-FLOW-TONGGUAN',
    version: '0.1.0-research',
    family: 'yongshin',
    name: 'Elemental flow / Tongguan mediation',
    description:
      'Research namespace for identifying blocking or opposing elemental flows and a mediating relation that connects them.',
    semanticQuestion:
      'Where is the chart flow blocked or opposed, and which mediating relation connects the competing element flows within this methodology?',
    assumptions: [
      'Flow mediation is a relational chart question rather than a synonym for categorical day-master strength.',
      'A mediator selected here may differ from a climate or strength selection without constituting an engine conflict.',
    ],
    requiredFactTypes: ['pillars.year', 'pillars.month', 'pillars.day', 'pillars.hour'],
    optionalFactTypes: ['five_element_distribution', 'stem_branch_relations'],
    sourceIds: [
      INTERPRETATION_METHODOLOGY_SOURCES.ditianSuiChanwei.sourceId,
      INTERPRETATION_METHODOLOGY_SOURCES.zipingZhenquanCommented.sourceId,
    ],
    allowedClaimTypes: ['FLOW_BLOCKAGE', 'FLOW_MEDIATOR', 'TONGGUAN_MEDIATOR_USE'],
    forbiddenClaimTypes: COMMON_FORBIDDEN_CLAIMS,
    sourceLayerNotes: [
      '通隔/源流 discussions and later 通關 summaries are kept methodology-qualified instead of becoming a global element preference.',
    ],
    status: 'research',
  },
  {
    methodologyId: 'M-SPECIAL-FOLLOW',
    version: '0.1.0-research',
    family: 'yongshin',
    name: 'Special follow / transform structure',
    description:
      'Research namespace for charts whose dominant structure may require following or transformation logic instead of ordinary balancing assumptions.',
    semanticQuestion:
      'Does the chart satisfy a narrowly defined follow/transform special structure, and if so what use follows from that specific structure?',
    assumptions: [
      'Special-pattern classification requires stricter preconditions than ordinary strength balancing.',
      'Failure of the special-pattern gate returns to other methodologies rather than forcing a special result.',
    ],
    requiredFactTypes: ['pillars.year', 'pillars.month', 'pillars.day', 'pillars.hour'],
    optionalFactTypes: ['hidden_stems', 'root_strength', 'stem_branch_relations'],
    sourceIds: [
      INTERPRETATION_METHODOLOGY_SOURCES.ditianSuiChanwei.sourceId,
      INTERPRETATION_METHODOLOGY_SOURCES.zipingZhenquanCommented.sourceId,
    ],
    allowedClaimTypes: ['SPECIAL_PATTERN_CANDIDATE', 'SPECIAL_PATTERN_STATE', 'SPECIAL_PATTERN_USE'],
    forbiddenClaimTypes: COMMON_FORBIDDEN_CLAIMS,
    sourceLayerNotes: [
      '專旺/從/化 logic is not treated as a fallback label for every strongly imbalanced chart.',
    ],
    status: 'research',
  },
]);

export function getResearchInterpretationMethodology(
  methodologyId: ResearchMethodologySemanticId,
): ResearchMethodologySemanticDefinition {
  const methodology = RESEARCH_INTERPRETATION_METHODOLOGIES.find(
    (candidate) => candidate.methodologyId === methodologyId,
  );
  if (methodology === undefined) {
    throw new Error(`Unknown research methodology: ${methodologyId}`);
  }
  return methodology;
}
