export const R020_CROSS_SCHOOL_STRENGTH_VERSION = '0.1.0-research' as const;

export interface R020TraditionSurface {
  id: 'XU_ZIPING_PINGZHU' | 'REN_DITIAN_SUI_CHANWEI' | 'MINGLI_TANYUAN_CANDIDATE';
  sourceStratum: string;
  directlyVerified: boolean;
  primitives: readonly string[];
  independenceStatus:
    | 'TEXTUAL_DEPENDENCY_RISK_HIGH'
    | 'PRIMARY_TEXT_VERIFICATION_OPEN';
}

export const R020_TRADITION_SURFACES: readonly R020TraditionSurface[] = Object.freeze([
  {
    id: 'XU_ZIPING_PINGZHU',
    sourceStratum: '民國徐樂吾評註 / 論十干得時不旺失時不弱',
    directlyVerified: true,
    primitives: ['得時/失時', '旺/衰', '黨眾/助寡', '強/弱', '比劫/印綬/通根扶助'],
    independenceStatus: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
  },
  {
    id: 'REN_DITIAN_SUI_CHANWEI',
    sourceStratum: '任鐵樵註 / 滴天髓闡微 / 衰旺',
    directlyVerified: true,
    primitives: ['月令休囚', '四柱有根', '長生祿旺', '墓庫餘氣', '比肩 vs 通根'],
    independenceStatus: 'TEXTUAL_DEPENDENCY_RISK_HIGH',
  },
  {
    id: 'MINGLI_TANYUAN_CANDIDATE',
    sourceStratum: '命理探源 / strength chapter candidate',
    directlyVerified: false,
    primitives: ['得時/失令 candidate', 'whole-chart correction candidate'],
    independenceStatus: 'PRIMARY_TEXT_VERIFICATION_OPEN',
  },
]);

export const R020_TEXTUAL_OVERLAP = Object.freeze({
  sharedScaffoldObserved: true,
  sharedSpringWoodAutumnWoodExamples: true,
  sharedHeavyLightRootParagraph: true,
  exactIdentity: false,
  materialVariant: {
    context: 'spring Wood heavy Metal branch pair',
    xuReading: '支酉丑',
    renReading: '支申酉',
  },
  implication:
    'Xu and Ren surfaces must not be counted as independent corroborating votes until textual lineage/reuse is resolved.',
});

export const R020_PRIMITIVE_COMPARISON = Object.freeze({
  xuExplicitTwoAxisWangShuaiQiangRuo: true,
  renExplicitAntiMonthOnlyRule: true,
  renExplicitRootCorrection: true,
  universalNumericStrengthScoreSupported: false,
  crossSchoolMajorityVoteSupported: false,
  sharedPhraseCountAsIndependentConfidenceSupported: false,
});

export const R020_AUTHORITY = Object.freeze({
  status: 'DIVERGENT_WITH_TEXTUAL_DEPENDENCY_RISK' as const,
  crossSchoolPrimitiveComparisonStarted: true,
  independentTraditionCountSettled: false,
  generalizedStrengthClassifierAuthorized: false,
  productionAuthorityPromoted: false,
});
