import { createHash } from 'node:crypto';
import type { EarthlyBranch, HeavenlyStem } from '../contracts/calculation.js';

export const GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_SCOPE =
  'mingli_tanyuan_ten_stem_twelve_branch_growth_stage_mapping' as const;
export const GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const TWELVE_GROWTH_STAGE_VALUES = Object.freeze([
  '長生',
  '沐浴',
  '冠帶',
  '臨官',
  '帝旺',
  '衰',
  '病',
  '死',
  '墓',
  '絕',
  '胎',
  '養',
] as const);

export type TwelveGrowthStage = (typeof TWELVE_GROWTH_STAGE_VALUES)[number];

export const TWELVE_GROWTH_STAGE_HEAVENLY_STEMS = Object.freeze([
  '갑',
  '을',
  '병',
  '정',
  '무',
  '기',
  '경',
  '신',
  '임',
  '계',
] as const satisfies readonly HeavenlyStem[]);

export const TWELVE_GROWTH_STAGE_EARTHLY_BRANCHES = Object.freeze([
  '자',
  '축',
  '인',
  '묘',
  '진',
  '사',
  '오',
  '미',
  '신',
  '유',
  '술',
  '해',
] as const satisfies readonly EarthlyBranch[]);

export const GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_SOURCES = Object.freeze({
  primaryMapping: Object.freeze({
    title: '命理探源',
    section: '卷三強弱 / 天干生旺死絕',
    url: 'https://ctext.org/wiki.pl?chapter=827425&if=gb',
    accessedAt: '2026-09-14',
    sourceType: 'classical_transcription',
    authority:
      'Selected mapping authority. Directly enumerates the twelve stage names, the five-yang-stem table, the five-yin-stem table, and 陽乾順行／陰乾逆行.',
  }),
  systemCrossReference: Object.freeze({
    title: '三命通會',
    section: '卷二 / 五行寄生十二宮',
    url: 'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%BA%8C',
    accessedAt: '2026-09-14',
    sourceType: 'classical_transcription',
    authority:
      'Cross-reference for the twelve-stage system only. It does not replace the selected primary mapping table or authorize root-weight semantics.',
  }),
});

export const TWELVE_GROWTH_STAGE_BY_STEM_AND_BRANCH: Readonly<
  Record<HeavenlyStem, Readonly<Record<EarthlyBranch, TwelveGrowthStage>>>
> = Object.freeze({
  갑: Object.freeze({
    자: '沐浴', 축: '冠帶', 인: '臨官', 묘: '帝旺', 진: '衰', 사: '病',
    오: '死', 미: '墓', 신: '絕', 유: '胎', 술: '養', 해: '長生',
  }),
  을: Object.freeze({
    자: '病', 축: '衰', 인: '帝旺', 묘: '臨官', 진: '冠帶', 사: '沐浴',
    오: '長生', 미: '養', 신: '胎', 유: '絕', 술: '墓', 해: '死',
  }),
  병: Object.freeze({
    자: '胎', 축: '養', 인: '長生', 묘: '沐浴', 진: '冠帶', 사: '臨官',
    오: '帝旺', 미: '衰', 신: '病', 유: '死', 술: '墓', 해: '絕',
  }),
  정: Object.freeze({
    자: '絕', 축: '墓', 인: '死', 묘: '病', 진: '衰', 사: '帝旺',
    오: '臨官', 미: '冠帶', 신: '沐浴', 유: '長生', 술: '養', 해: '胎',
  }),
  무: Object.freeze({
    자: '胎', 축: '養', 인: '長生', 묘: '沐浴', 진: '冠帶', 사: '臨官',
    오: '帝旺', 미: '衰', 신: '病', 유: '死', 술: '墓', 해: '絕',
  }),
  기: Object.freeze({
    자: '絕', 축: '墓', 인: '死', 묘: '病', 진: '衰', 사: '帝旺',
    오: '臨官', 미: '冠帶', 신: '沐浴', 유: '長生', 술: '養', 해: '胎',
  }),
  경: Object.freeze({
    자: '死', 축: '墓', 인: '絕', 묘: '胎', 진: '養', 사: '長生',
    오: '沐浴', 미: '冠帶', 신: '臨官', 유: '帝旺', 술: '衰', 해: '病',
  }),
  신: Object.freeze({
    자: '長生', 축: '養', 인: '胎', 묘: '絕', 진: '墓', 사: '死',
    오: '病', 미: '衰', 신: '帝旺', 유: '臨官', 술: '冠帶', 해: '沐浴',
  }),
  임: Object.freeze({
    자: '帝旺', 축: '衰', 인: '病', 묘: '死', 진: '墓', 사: '絕',
    오: '胎', 미: '養', 신: '長生', 유: '沐浴', 술: '冠帶', 해: '臨官',
  }),
  계: Object.freeze({
    자: '臨官', 축: '冠帶', 인: '沐浴', 묘: '長生', 진: '養', 사: '胎',
    오: '絕', 미: '墓', 신: '死', 유: '病', 술: '衰', 해: '帝旺',
  }),
});

export function getTwelveGrowthStage(
  stem: HeavenlyStem,
  branch: EarthlyBranch,
): TwelveGrowthStage {
  return TWELVE_GROWTH_STAGE_BY_STEM_AND_BRANCH[stem][branch];
}

export const GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_VERSION,
      scope: GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_SCOPE,
      decision: GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DECISION,
      stages: TWELVE_GROWTH_STAGE_VALUES,
      stems: TWELVE_GROWTH_STAGE_HEAVENLY_STEMS,
      branches: TWELVE_GROWTH_STAGE_EARTHLY_BRANCHES,
      mapping: TWELVE_GROWTH_STAGE_BY_STEM_AND_BRANCH,
      primarySource: GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_SOURCES.primaryMapping,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_VERSION,
  definitionHash: GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DEFINITION_HASH,
  decision: GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DECISION,
  directSourceTwelveGrowthStageSystemObserved: true,
  directSourceTenStemTwelveBranchMappingObserved: true,
  directSourceYangForwardYinReverseObserved: true,
  canonicalHeavenlyStemInputAvailable: true,
  canonicalEarthlyBranchInputAvailable: true,
  sourceMappingExhaustive: true,
  executableTwelveGrowthStageMappingAuthorizedResearchOnly: true,
  luToLinGuanEquivalenceAuthorized: false,
  renToDiWangEquivalenceAuthorized: false,
  stageToRootWeightBindingAuthorized: false,
  tombToMuKuRootBindingAuthorized: false,
  hiddenStemToYuQiBindingAuthorized: false,
  yinChangShengToHeavyRootBindingAuthorized: false,
  numericStrengthAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  rootWeightClassifierAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  authorityBoundary:
    'The selected source directly supports a total ten-Heavenly-Stem by twelve-Earthly-Branch mapping to the twelve growth-stage labels. This research-only mapping does not establish any bridge from a stage label to root weight, 祿/刃, 墓庫/餘氣, numeric strength, ordinary strength, Gyeokguk candidate derivation, or establishment settlement.',
});
