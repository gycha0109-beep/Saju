import { GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY } from './general-natal-muku-yuqi-bounded-tonggen-authority.js';
import { GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_AUTHORITY } from './general-natal-yuqi-temporal-variability-source-observation-authority.js';

export const R014_MUKU_ROOT_VERSION = '0.2.0-research' as const;

export const R014_DIRECT_VISUAL_SOURCE = Object.freeze({
  work: '子平真詮',
  scanId: 'NLC416-11jh010455-35296',
  printedPage: '十四',
  evidenceMode: 'DIRECT_VISUAL_SCAN',
} as const);

export const R014_ELEMENT_MUKU_MAP = Object.freeze([
  { element: 'WOOD', branch: '未' },
  { element: 'FIRE', branch: '戌' },
  { element: 'METAL', branch: '丑' },
  { element: 'WATER', branch: '辰' },
] as const);

export const R014_STEM_BRANCH_MATRIX = Object.freeze(
[
  {
    "sourceStem": "甲",
    "stem": "갑",
    "element": "WOOD",
    "yinYang": "YANG",
    "muku": "未",
    "branch": "辰",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "甲",
    "stem": "갑",
    "element": "WOOD",
    "yinYang": "YANG",
    "muku": "未",
    "branch": "戌",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "甲",
    "stem": "갑",
    "element": "WOOD",
    "yinYang": "YANG",
    "muku": "未",
    "branch": "丑",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "甲",
    "stem": "갑",
    "element": "WOOD",
    "yinYang": "YANG",
    "muku": "未",
    "branch": "未",
    "disposition": "BASE_TEXT_ROOT_SUPPORTED_COMMENTARY_APPLICABLE"
  },
  {
    "sourceStem": "乙",
    "stem": "을",
    "element": "WOOD",
    "yinYang": "YIN",
    "muku": "未",
    "branch": "辰",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "乙",
    "stem": "을",
    "element": "WOOD",
    "yinYang": "YIN",
    "muku": "未",
    "branch": "戌",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "乙",
    "stem": "을",
    "element": "WOOD",
    "yinYang": "YIN",
    "muku": "未",
    "branch": "丑",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "乙",
    "stem": "을",
    "element": "WOOD",
    "yinYang": "YIN",
    "muku": "未",
    "branch": "未",
    "disposition": "SOURCE_INTERNAL_TENSION_YIN"
  },
  {
    "sourceStem": "丙",
    "stem": "병",
    "element": "FIRE",
    "yinYang": "YANG",
    "muku": "戌",
    "branch": "辰",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "丙",
    "stem": "병",
    "element": "FIRE",
    "yinYang": "YANG",
    "muku": "戌",
    "branch": "戌",
    "disposition": "BASE_TEXT_ROOT_SUPPORTED_COMMENTARY_APPLICABLE"
  },
  {
    "sourceStem": "丙",
    "stem": "병",
    "element": "FIRE",
    "yinYang": "YANG",
    "muku": "戌",
    "branch": "丑",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "丙",
    "stem": "병",
    "element": "FIRE",
    "yinYang": "YANG",
    "muku": "戌",
    "branch": "未",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "丁",
    "stem": "정",
    "element": "FIRE",
    "yinYang": "YIN",
    "muku": "戌",
    "branch": "辰",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "丁",
    "stem": "정",
    "element": "FIRE",
    "yinYang": "YIN",
    "muku": "戌",
    "branch": "戌",
    "disposition": "SOURCE_INTERNAL_TENSION_YIN"
  },
  {
    "sourceStem": "丁",
    "stem": "정",
    "element": "FIRE",
    "yinYang": "YIN",
    "muku": "戌",
    "branch": "丑",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "丁",
    "stem": "정",
    "element": "FIRE",
    "yinYang": "YIN",
    "muku": "戌",
    "branch": "未",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "戊",
    "stem": "무",
    "element": "EARTH",
    "yinYang": "YANG",
    "muku": null,
    "branch": "辰",
    "disposition": "EARTH_BOUNDARY_UNRESOLVED"
  },
  {
    "sourceStem": "戊",
    "stem": "무",
    "element": "EARTH",
    "yinYang": "YANG",
    "muku": null,
    "branch": "戌",
    "disposition": "EARTH_BOUNDARY_UNRESOLVED"
  },
  {
    "sourceStem": "戊",
    "stem": "무",
    "element": "EARTH",
    "yinYang": "YANG",
    "muku": null,
    "branch": "丑",
    "disposition": "EARTH_BOUNDARY_UNRESOLVED"
  },
  {
    "sourceStem": "戊",
    "stem": "무",
    "element": "EARTH",
    "yinYang": "YANG",
    "muku": null,
    "branch": "未",
    "disposition": "EARTH_BOUNDARY_UNRESOLVED"
  },
  {
    "sourceStem": "己",
    "stem": "기",
    "element": "EARTH",
    "yinYang": "YIN",
    "muku": null,
    "branch": "辰",
    "disposition": "EARTH_BOUNDARY_UNRESOLVED"
  },
  {
    "sourceStem": "己",
    "stem": "기",
    "element": "EARTH",
    "yinYang": "YIN",
    "muku": null,
    "branch": "戌",
    "disposition": "EARTH_BOUNDARY_UNRESOLVED"
  },
  {
    "sourceStem": "己",
    "stem": "기",
    "element": "EARTH",
    "yinYang": "YIN",
    "muku": null,
    "branch": "丑",
    "disposition": "EARTH_BOUNDARY_UNRESOLVED"
  },
  {
    "sourceStem": "己",
    "stem": "기",
    "element": "EARTH",
    "yinYang": "YIN",
    "muku": null,
    "branch": "未",
    "disposition": "EARTH_BOUNDARY_UNRESOLVED"
  },
  {
    "sourceStem": "庚",
    "stem": "경",
    "element": "METAL",
    "yinYang": "YANG",
    "muku": "丑",
    "branch": "辰",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "庚",
    "stem": "경",
    "element": "METAL",
    "yinYang": "YANG",
    "muku": "丑",
    "branch": "戌",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "庚",
    "stem": "경",
    "element": "METAL",
    "yinYang": "YANG",
    "muku": "丑",
    "branch": "丑",
    "disposition": "BASE_TEXT_ROOT_SUPPORTED_COMMENTARY_APPLICABLE"
  },
  {
    "sourceStem": "庚",
    "stem": "경",
    "element": "METAL",
    "yinYang": "YANG",
    "muku": "丑",
    "branch": "未",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "辛",
    "stem": "신",
    "element": "METAL",
    "yinYang": "YIN",
    "muku": "丑",
    "branch": "辰",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "辛",
    "stem": "신",
    "element": "METAL",
    "yinYang": "YIN",
    "muku": "丑",
    "branch": "戌",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "辛",
    "stem": "신",
    "element": "METAL",
    "yinYang": "YIN",
    "muku": "丑",
    "branch": "丑",
    "disposition": "SOURCE_INTERNAL_TENSION_YIN"
  },
  {
    "sourceStem": "辛",
    "stem": "신",
    "element": "METAL",
    "yinYang": "YIN",
    "muku": "丑",
    "branch": "未",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "壬",
    "stem": "임",
    "element": "WATER",
    "yinYang": "YANG",
    "muku": "辰",
    "branch": "辰",
    "disposition": "BASE_TEXT_ROOT_SUPPORTED_COMMENTARY_APPLICABLE"
  },
  {
    "sourceStem": "壬",
    "stem": "임",
    "element": "WATER",
    "yinYang": "YANG",
    "muku": "辰",
    "branch": "戌",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "壬",
    "stem": "임",
    "element": "WATER",
    "yinYang": "YANG",
    "muku": "辰",
    "branch": "丑",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "壬",
    "stem": "임",
    "element": "WATER",
    "yinYang": "YANG",
    "muku": "辰",
    "branch": "未",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "癸",
    "stem": "계",
    "element": "WATER",
    "yinYang": "YIN",
    "muku": "辰",
    "branch": "辰",
    "disposition": "SOURCE_INTERNAL_TENSION_YIN"
  },
  {
    "sourceStem": "癸",
    "stem": "계",
    "element": "WATER",
    "yinYang": "YIN",
    "muku": "辰",
    "branch": "戌",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "癸",
    "stem": "계",
    "element": "WATER",
    "yinYang": "YIN",
    "muku": "辰",
    "branch": "丑",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  },
  {
    "sourceStem": "癸",
    "stem": "계",
    "element": "WATER",
    "yinYang": "YIN",
    "muku": "辰",
    "branch": "未",
    "disposition": "NOT_APPLICABLE_AS_ELEMENT_MUKU"
  }
]
);

export const R014_EXACT_EXCLUSION_BOUNDARY = Object.freeze([
  { stem: '乙', branch: '戌', disposition: 'SELECTED_SOURCE_TONGGEN_EXCLUDED' },
  { stem: '丁', branch: '丑', disposition: 'SELECTED_SOURCE_TONGGEN_EXCLUDED' },
] as const);

export const R014_SOURCE_STRATUM_TENSION = Object.freeze({
  baseText: {
    yangStemAtOwnMuku: 'ROOT_SUPPORTED',
    yinStemAtOwnMuku: 'DIFFERENT_OR_NO_USE_DESCRIPTION',
  },
  laterCommentary: {
    critiquesYinYangSplit: true,
    fiveElementApplicabilityFraming: true,
  },
  resolution: 'PRESERVE_DISAGREEMENT',
} as const);

export const R014_SEASONAL_BOUNDARY = Object.freeze({
  upstreamYuqiTemporalObservationDecision:
    GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_AUTHORITY.decision,
  yuqiTemporalVariabilityObserved:
    GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_AUTHORITY.directSourceYuqiTemporalVariabilityObserved,
  qingmingRuntimeRepresentabilityIsSemanticAuthority:
    GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_AUTHORITY
      .qingmingRuntimeRepresentabilityIsSemanticAuthority,
  mukuSeasonalMultiplierEstablished: false,
  mukuApplicabilityChangesAtQingmingPlus12Days: false,
  mukuApplicabilityChangesAfterUnresolvedTuwangBoundary: false,
  tuwangAfterBoundaryGoverned:
    GENERAL_NATAL_YUQI_TEMPORAL_VARIABILITY_AUTHORITY.tuwangAfterBoundaryGoverned,
} as const);

export const R014_UPSTREAM_TONGGEN_BOUNDARY = Object.freeze({
  decision: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY.decision,
  nonEarthMukuToBoundedTonggenAuthorizedResearchOnly:
    GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY
      .governedNonEarthMukuToBoundedTonggenAuthorizedResearchOnly,
  earthTonggenResolved:
    GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY.earthTonggenResolved,
  generalizedRootToTonggenEquivalenceAuthorized:
    GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY
      .generalizedRootToTonggenEquivalenceAuthorized,
} as const);

export const R014_REJECTED_SHORTCUTS = Object.freeze([
  'ANY_CHEN_XU_CHOU_WEI_ROOTS_ANY_STEM',
  'NONMATCHING_MUKU_ROW_EQUALS_GLOBAL_NOT_TONGGEN',
  'YIN_YANG_DISAGREEMENT_SILENTLY_RECONCILED',
  'EARTH_ASSIGNED_A_FIFTH_MUKU',
  'MUKU_EQUALS_YUQI',
  'YUQI_TEMPORAL_VARIABILITY_EQUALS_MUKU_SEASONAL_MULTIPLIER',
  'QINGMING_ELAPSED_TIME_EQUALS_MUKU_WEIGHT',
  'MUKU_REQUIRES_CLASH_TO_OPEN_ROOT',
  'MUKU_ROOT_EQUALS_NUMERIC_STRENGTH',
  'MUKU_ROOT_EQUALS_FINAL_QIANG_RUO',
] as const);

export const R014_AUTHORITY = Object.freeze({
  status: 'VERIFIED_BOUNDED_MUKU_APPLICABILITY_MATRIX' as const,
  matrixRowCount: 40,
  directVisualGlyphClosureComplete: true,
  anyMukuRootsAnyStem: false,
  applicableElementMukuCanRoot: 'SUPPORTED_BOUNDED' as const,
  clashRequiredToOpenRoot: false,
  yinYangTreatmentResolved: false,
  earthMukuResolved: false,
  mukuYuqiCollapsed: false,
  mukuSeasonalEvaluatorCreated: false,
  numericMukuWeightAuthorized: false,
  finalStrengthClassifierAuthorized: false,
  productionAuthorityPromoted: false,
});
