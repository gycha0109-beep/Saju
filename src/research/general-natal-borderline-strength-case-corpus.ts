export const R019_BORDERLINE_CASE_CORPUS_VERSION = '0.1.0-research' as const;

export type R019SourceLabel =
  | 'DE_SHI_ER_BU_WANG'
  | 'SHI_SHI_BU_RUO'
  | 'REMAINS_WEAK_WITHOUT_TONGGEN';

export interface R019BorderlineCase {
  id: string;
  completeness: 'PARTIAL_CONFIGURATION' | 'EXACT_FOUR_PILLAR_PATTERN';
  explicitSeasonContext: string | null;
  explicitSupportContext: readonly string[];
  explicitOppositionContext: readonly string[];
  sourceLabel: R019SourceLabel;
  sourcePhrase: string;
  falsifies: readonly string[];
  missingFacts: readonly string[];
}

export const R019_BORDERLINE_CASES: readonly R019BorderlineCase[] = Object.freeze([
  {
    id: 'spring-wood-heavy-metal',
    completeness: 'PARTIAL_CONFIGURATION',
    explicitSeasonContext: '春木 / 得時',
    explicitSupportContext: [],
    explicitOppositionContext: ['干庚辛', '支酉丑', '無火制'],
    sourceLabel: 'DE_SHI_ER_BU_WANG',
    sourcePhrase: '是以得時而不旺也',
    falsifies: ['得時 => unconditional positive final strength'],
    missingFacts: ['complete four pillars', 'exact day master', 'full hidden-stem state'],
  },
  {
    id: 'autumn-wood-deep-root',
    completeness: 'PARTIAL_CONFIGURATION',
    explicitSeasonContext: '秋木 / 失時',
    explicitSupportContext: ['干甲乙', '支寅卯', '木根深'],
    explicitOppositionContext: [],
    sourceLabel: 'SHI_SHI_BU_RUO',
    sourcePhrase: '是失時不弱也',
    falsifies: ['失時 => unconditional weak result'],
    missingFacts: ['complete four pillars', 'exact day master', 'full Ten-God distribution'],
  },
  {
    id: 'four-xin-mao',
    completeness: 'EXACT_FOUR_PILLAR_PATTERN',
    explicitSeasonContext: null,
    explicitSupportContext: ['天元一氣 / four 辛 stems'],
    explicitOppositionContext: ['金不通根'],
    sourceLabel: 'REMAINS_WEAK_WITHOUT_TONGGEN',
    sourcePhrase: '四辛卯，金不通根，雖天元一氣，仍作弱論',
    falsifies: ['many same-element visible stems => strong without root'],
    missingFacts: [],
  },
  {
    id: 'four-bing-shen',
    completeness: 'EXACT_FOUR_PILLAR_PATTERN',
    explicitSeasonContext: null,
    explicitSupportContext: ['天元一氣 / four 丙 stems'],
    explicitOppositionContext: ['火不通根'],
    sourceLabel: 'REMAINS_WEAK_WITHOUT_TONGGEN',
    sourcePhrase: '四丙申，火不通根，雖天元一氣，仍作弱論',
    falsifies: ['many same-element visible stems => strong without root'],
    missingFacts: [],
  },
]);

export const R019_CORPUS_BOUNDARY = Object.freeze({
  sourceLabelsAreClassifierOutputs: false,
  missingFactsMayBeSynthesized: false,
  wangShuaiAndQiangRuoCollapsed: false,
  corpusAuthorizesFinalStrengthClassifier: false,
  corpusAuthorizesProductionFacts: false,
});
