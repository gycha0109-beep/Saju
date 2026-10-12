import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildAnnualPrintedTopologyEvidence,
} from './general-annual-printed-case-topology-reproduction.js';
import {
  buildAnnualThreeLayerClassicalSourceBridge,
} from './general-annual-three-layer-classical-source-bridge.js';

/**
 * 『淵海子平』卷二「論羊刃」 supplies an unusually explicit six-pillar
 * illustration. Digital textual witnesses disagree about 未/木 and the
 * person's name; none of these digital transcriptions verifies a woodblock.
 *
 * This module does NOT read a canonical modern snapshot or execute a rule.
 */
export const YUANHAI_THREE_LAYER_WITNESS_VERSION =
  'sa7d-yuanhai-six-pillar-clash-combination-digital-collation-v1' as const;

export const YUANHAI_DIGITAL_WITNESSES = Object.freeze([
  Object.freeze({
    id: 'YS-WIKISOURCE-ZH-HANT',
    url: 'https://zh.wikisource.org/zh-hant/淵海子平' as const,
    section: '論陽刃' as const,
    bookVolumeIdentifiedInText: false as const,
    figureNamePresent: true as const,
    figureName: '岳飛' as const,
    triplePhrase: '亥卯未合起陽刃' as const,
    annualClashPhrase: '辛酉年，辛金又旺於酉，衝起卯刃' as const,
    closingWarning: '不可一合一衝也' as const,
    sourceCarrier: 'web_transcription' as const,
    facsimileGlyphsVerified: false as const,
    independentEditionEstablished: false as const,
  }),
  Object.freeze({
    id: 'YS-SAJUMANIA-CH2',
    url: 'https://sajumania.com/ebook/to01-06/to01-06-02-14.htm' as const,
    section: '論羊刃' as const,
    bookVolumeIdentifiedInText: true as const,
    figureNamePresent: false as const,
    figureName: null,
    triplePhrase: '亥卯未合起羊刃' as const,
    annualClashPhrase: '辛酉年，辛金又旺於酉，沖起卯刃' as const,
    closingWarning: '不可一合一沖也' as const,
    sourceCarrier: 'web_transcription' as const,
    facsimileGlyphsVerified: false as const,
    independentEditionEstablished: false as const,
  }),
  Object.freeze({
    id: 'YS-YUCESHU-CH2',
    url: 'https://www.yuceshu.cn/book/bazi/3_1_1_2_14.html' as const,
    section: '论羊刃' as const,
    bookVolumeIdentifiedInText: true as const,
    figureNamePresent: false as const,
    figureName: null,
    triplePhrase: '亥卯未合起羊刃' as const,
    annualClashPhrase: '辛酉年，辛金又旺於酉，冲起卯刃' as const,
    closingWarning: '不可一合一冲也' as const,
    sourceCarrier: 'web_transcription' as const,
    facsimileGlyphsVerified: false as const,
    independentEditionEstablished: false as const,
  }),
  Object.freeze({
    id: 'YS-SHIDIAN-NLC-MING-PRINT-DIGITIZATION',
    url: 'https://www.shidianguji.com/zh/book/NGJ892411999032112149610/chapter/1lqsbrh19ji9f' as const,
    section: '論羊刃' as const,
    bookVolumeIdentifiedInText: true as const,
    figureNamePresent: false as const,
    figureName: null,
    triplePhrase: '亥卯木合起羊刃' as const,
    annualClashPhrase: '辛酉年辛金又旺於酉，冲起卯刃' as const,
    closingWarning: '不可一合一冲也' as const,
    sourceCarrier: 'print_based_unverified_OCR_transcription' as const,
    facsimileGlyphsVerified: false as const,
    independentEditionEstablished: false as const,
  }),
]);

export const YUANHAI_SOURCE_CHART = Object.freeze({
  // Quoted four pillars and both temporals; NOT a historically authenticated
  // birth record, not a real-date calculation in the current annual engine.
  natal: Object.freeze({
    year: '癸未' as const,
    month: '乙卯' as const,
    day: '甲子' as const,
    hour: '己巳' as const,
  }),
  dayun: '辛亥' as const,
  annual: '辛酉' as const,
  possibleHistoricalFigureLabel: '岳飛' as const,
  independentHistoricalFigureAuthentication: false as const,
  originalPrintedTextIdenticallyVerified: false as const,
  historicalCalendarAndDayunCalculationRecomputed: false as const,
  // Canonical six-slot names, not branch-value-only aliases.
  branches: Object.freeze({
    'natal:year': '未' as const,
    'natal:month': '卯' as const,
    'natal:day': '子' as const,
    'natal:hour': '巳' as const,
    dayun: '亥' as const,
    annual: '酉' as const,
  }),
});

export const YUANHAI_SOURCE_TOPOLOGY = Object.freeze({
  tripleSlots: Object.freeze(['dayun', 'natal:year', 'natal:month'] as const),
  tripleBranches: Object.freeze(['亥', '未', '卯'] as const),
  narratedTriple: '亥卯未' as const,
  clashSlots: Object.freeze(['annual', 'natal:month'] as const),
  clashBranches: Object.freeze(['酉', '卯'] as const),
  narratedClash: '卯酉' as const,
  sharedSlot: 'natal:month' as const,
  // Explicitly no interpretation that the narrated clash breaks/erases triple.
  threeTemporalLayersNamed: true as const,
  natalAndLuckChartIsFullySpecifiedInDigitalText: true as const,
  anyRuleWinnerExplainedBySource: false as const,
  textSaysTripleAutomaticallyCancelsClash: false as const,
  textSaysClashAlwaysDestroysTriple: false as const,
});

export const YUANHAI_SOURCE_CONFLICTS = Object.freeze([
  Object.freeze({
    id: 'HE_MAO_WEI_LAST_GLYPH',
    disagreement: '亥卯未 in three digital records; 亥卯木 in Ming-print-derived OCR' as const,
    branchCompletenessDependsOnGlyph: true as const,
    MingPrintImageConfirmedAsWei: false as const,
    MingPrintImageConfirmedAsMu: false as const,
    autoFixOrMajorityVoteAuthorized: false as const,
  }),
  Object.freeze({
    id: 'HISTORICAL_NAME_ATTRIBUTION',
    disagreement: '岳飛 is present in Wikisource and absent in the other three witnesses' as const,
    historicalPersonVerifiedAsChartOwner: false as const,
    figureAttributionApproved: false as const,
    autoFixOrMajorityVoteAuthorized: false as const,
  }),
  Object.freeze({
    id: 'ANG_YANG_AND_CLASH_GLYPHS',
    disagreement: '陽刃 / 羊刃; 衝 / 沖 / 冲; editorial punctuation varies' as const,
    classicalIdentityFullyCollated: false as const,
    modernRuleNormalizationAuthorized: false as const,
    autoFixOrMajorityVoteAuthorized: false as const,
  }),
]);

export const YUANHAI_SOURCE_UNRESOLVED = Object.freeze([
  'SOURCE_MING_PRINT_PAGE_COLUMN_FOR_WEI_OR_MU_GLYPH_NOT_VERIFIED',
  'FOUR_WEB_TRANSCRIPTIONS_ARE_NOT_FOUR_INDEPENDENT_PRINT_EDITIONS',
  'YUE_FEI_ATTRIBUTION_NOT_INDEPENDENTLY_AUTHENTICATED',
  'COMPLETE_TRIAD_IN_THREE_DIGITAL_TEXTS_DOES_NOT_SETTLE_MING_PRINT_OCR',
  'THE_HISTORICAL_TEXT_DESCRIBES_COMBINATION_AND_CLASH_WITHOUT_A_GENERAL_WINNER_RULE',
  'NATAL_DAYUN_ANNUAL_COEXISTENCE_IS_NOT_AN_EXECUTABLE_CAUSAL_FORECAST',
  'MODERN_ANNUAL_E1_FOR_HISTORICAL_1141_NOT_COMPUTED_OR_AUTHORIZED',
] as const);

export function buildYuanHaiSixPillarDigitalCase() {
  const earlier = buildAnnualPrintedTopologyEvidence();
  const temporal = buildAnnualThreeLayerClassicalSourceBridge();
  const source = YUANHAI_SOURCE_CHART;
  const topology = YUANHAI_SOURCE_TOPOLOGY;
  const sources = YUANHAI_DIGITAL_WITNESSES;
  const conflicts = YUANHAI_SOURCE_CONFLICTS;

  const chartBranches = source.branches;
  const exactTripleFromChart = topology.tripleSlots.map((slot) => chartBranches[slot]);
  const exactClashFromChart = topology.clashSlots.map((slot) => chartBranches[slot]);
  const observedSharedSlots = topology.tripleSlots.filter((slot) =>
    topology.clashSlots.some((clashSlot) => clashSlot === slot));
  if (
    earlier.authority.productionAuthorized ||
    earlier.authority.globalTripleClashWinnerAuthorized ||
    temporal.authority.productionAuthorized ||
    sources.length !== 4 || new Set(sources.map((x) => x.url)).size !== 4 ||
    conflicts.length !== 3 ||
    sources.some((x) => x.facsimileGlyphsVerified || x.independentEditionEstablished) ||
    sources.filter((x) => x.triplePhrase.includes('亥卯未')).length !== 3 ||
    sources.filter((x) => x.triplePhrase.includes('亥卯木')).length !== 1 ||
    sources.filter((x) => x.figureNamePresent).length !== 1 ||
    exactTripleFromChart.join('|') !== topology.tripleBranches.join('|') ||
    exactClashFromChart.join('|') !== topology.clashBranches.join('|') ||
    observedSharedSlots.length !== 1 ||
    observedSharedSlots[0] !== topology.sharedSlot ||
    topology.anyRuleWinnerExplainedBySource ||
    source.independentHistoricalFigureAuthentication ||
    source.originalPrintedTextIdenticallyVerified
  ) throw new Error('Yuanhai digital witness / narrow topology evidence drifted');

  const material = {
    status: 'digital_full_six_pillar_case_but_print_glyph_unresolved' as const,
    version: YUANHAI_THREE_LAYER_WITNESS_VERSION,
    previousPrintedNatalTopologyHash: earlier.patternEvidenceHash,
    earlierThreeLayerPrintBridgeHash: temporal.evidenceHash,
    sourceChart: source,
    sourceTopology: topology,
    witnesses: sources,
    variants: conflicts,
    printedOriginalCollationUnresolved: true as const,
    sharedPillarSlotFromWrittenChart: topology.sharedSlot,
    directHistoricalRuleWinnerEstablished: false as const,
    historicalCombinedTripleAndClashNarrated: true as const,
    originalSixPillarConfigurationKnownAtDigitalTextTier: true as const,
    unresolved: YUANHAI_SOURCE_UNRESOLVED,
    authority: Object.freeze({
      digitalWitnessNarratesNatalDayunAnnual: true as const,
      actualMingPrintTripleGlyphVerified: false as const,
      printEditionIndependenceEstablished: false as const,
      historicalPersonFactVerified: false as const,
      globalTripleClashPriorityAuthorized: false as const,
      annualThreeLayerInterpretationAuthorized: false as const,
      individualOutcomeAuthorized: false as const,
      officialReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
    winningRelation: null,
    actualTripleTransformation: null,
    clashCancellation: null,
    realWorldEventOrSeverity: null,
    personalAnnualReading: null,
  };
  return Object.freeze({ ...material, witnessHash: deterministicContentHash(material) });
}
