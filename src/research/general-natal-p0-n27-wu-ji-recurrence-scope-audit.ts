/**
 * N27 alternative recurrence-scope audit for 三命通會 卷五 時上偏財.
 *
 * Models of what an *observer might count* are counterfactual hypotheses,
 * NOT historical evidence that any one of them governs 再見 or 只要一位.
 * Inputs are calculated canonical facts, never candidate fortune predictions.
 */
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalN27HourWealthConditionMatrix } from './general-natal-p0-n27-hour-wealth-condition-matrix.js';

export const GENERAL_NATAL_N27_RECURRENCE_SCOPE_AUDIT_VERSION =
  'saju-n27-wu-ji-recurrence-scope-sensitivity-v2' as const;

export function buildGeneralNatalN27WuJiRecurrenceScopeAudit(
  snapshot: CanonicalSajuSnapshot,
) {
  const matrix = buildGeneralNatalN27HourWealthConditionMatrix(snapshot);
  const o = matrix.observations;
  const hourExampleStatus = o.literalExampleStatus;
  const contextStatus = !o.hourKnown
    ? 'HOUR_UNRESOLVED' as const
    : !o.dayStemIsJia
      ? 'DIFFERENT_DAY_STEM' as const
      : hourExampleStatus !== 'MATCHED_LEXICAL_EXAMPLE_ONLY'
        ? 'NOT_THE_PRINTED_EXAMPLE' as const
        : 'SOURCE_EXAMPLE_ONLY' as const;
  // Explicitly distinguish named source glyphs, ten-god subtypes,
  // visible stems and hidden stems, and other pillars vs the hour itself.
  const visibleWu = o.otherVisibleStemWuCount;
  const visibleJi = o.otherVisibleStemJiCount;
  const hiddenWu = o.otherHiddenWuCount;
  const hiddenJi = o.otherHiddenJiCount;
  // Count three different units independently. No unit is licensed as the
  // classical 位: a hidden and a visible stem may belong to ONE pillar.
  const otherPillarPositions = Object.freeze([
    ...o.otherPillarVisibleWu.map((p) => Object.freeze({
      slot: p.slot, channel: 'visible_stem' as const, glyph: '戊' as const,
    })),
    ...o.otherPillarVisibleJi.map((p) => Object.freeze({
      slot: p.slot, channel: 'visible_stem' as const, glyph: '己' as const,
    })),
    ...o.otherPillarHiddenWu.map((p) => Object.freeze({
      slot: p.slot, channel: 'hidden_stem' as const, glyph: '戊' as const,
    })),
    ...o.otherPillarHiddenJi.map((p) => Object.freeze({
      slot: p.slot, channel: 'hidden_stem' as const, glyph: '己' as const,
    })),
  ]);
  const otherPillarUnitAudit = Object.freeze({
    // These are observed channels, not prohibitions or approved 宮 definitions.
    positions: otherPillarPositions,
    occurrenceUnitCount: otherPillarPositions.length,
    distinctPillarUnitCount: new Set(otherPillarPositions.map((p) => p.slot)).size,
    distinctGlyphUnitCount: new Set(otherPillarPositions.map((p) => p.glyph)).size,
    yearMonthOnlyOccurrenceCount: otherPillarPositions.filter(
      (p) => p.slot === 'year' || p.slot === 'month',
    ).length,
    dayPillarOccurrenceCount: otherPillarPositions.filter(
      (p) => p.slot === 'day',
    ).length,
    yearMonthDayOccurrenceCount: otherPillarPositions.length,
    pillarsWithBothVisibleAndHiddenCount: new Set(
      otherPillarPositions.filter((p) =>
        otherPillarPositions.some((q) => q.slot === p.slot && q.channel !== p.channel)
      ).map((p) => p.slot),
    ).size,
    // An observed hour branch 戊 is the reference hour, not "another pillar".
    hourReference: Object.freeze({
      hourStem: o.hourStem,
      hourBranch: o.hourBranch,
      hourVisibleWu: o.indirectWealthWuVisibleInHourStem,
      hourHiddenWu: o.indirectWealthWuHiddenInHourBranch,
      includedInOtherPillarOccurrenceCount: false as const,
    }),
    otherPillarsMeanYearMonthDayByConstruction: true as const,
    whetherClassicalBieGongIncludesDayPillar: 'UNADJUDICATED' as const,
    whetherTwoChannelsInOnePillarAreTwoWei: 'UNADJUDICATED' as const,
    whetherHistoricalWeiMeansStemGlyphOrPillarOrLocation: 'UNADJUDICATED' as const,
  });
  const totalVisible = visibleWu + visibleJi;
  const totalWu = visibleWu + hiddenWu;
  const totalAll = totalVisible + hiddenWu + hiddenJi;
  const scopeHypotheses = Object.freeze([
    Object.freeze({
      key: 'VISIBLE_WU_ONLY' as const,
      otherPillarOccurrenceCount: visibleWu,
      includesHiddenStems: false as const,
      includesVisibleRegularWealthJi: false as const,
      literalClauseAdequacy: 'OMITS_EXPLICIT_JI_IN_WU_JI_CLAUSE' as const,
    }),
    Object.freeze({
      key: 'VISIBLE_WU_AND_JI' as const,
      otherPillarOccurrenceCount: totalVisible,
      includesHiddenStems: false as const,
      includesVisibleRegularWealthJi: true as const,
      literalClauseAdequacy: 'NAMES_BOTH_STEMS_BUT_HIDDEN_SCOPE_OPEN' as const,
    }),
    Object.freeze({
      key: 'VISIBLE_AND_HIDDEN_WU_ONLY' as const,
      otherPillarOccurrenceCount: totalWu,
      includesHiddenStems: true as const,
      includesVisibleRegularWealthJi: false as const,
      literalClauseAdequacy: 'OMITS_EXPLICIT_JI_IN_WU_JI_CLAUSE' as const,
    }),
    Object.freeze({
      key: 'VISIBLE_AND_HIDDEN_WU_AND_JI' as const,
      otherPillarOccurrenceCount: totalAll,
      includesHiddenStems: true as const,
      includesVisibleRegularWealthJi: true as const,
      literalClauseAdequacy: 'HIDDEN_SCOPE_NOT_SOURCE_ADJUDICATED' as const,
    }),
  ].map((h) => Object.freeze({
    ...h,
    // A count is an observable counterfactual, not the verdict for the text.
    observerWouldCountAnOtherPillarOccurrence:
      contextStatus === 'SOURCE_EXAMPLE_ONLY' &&
      h.otherPillarOccurrenceCount > 0,
    classicalProhibitionVerdict: 'UNADJUDICATED' as const,
    classicalOnePositionVerdict: 'UNADJUDICATED' as const,
  })));
  const material = Object.freeze({
    version: GENERAL_NATAL_N27_RECURRENCE_SCOPE_AUDIT_VERSION,
    matrixVersion: matrix.version,
    calculationHash: o.sourceCalculationHash,
    contextStatus,
    printedExampleKind: o.printedExampleKind,
    actualObservationChannels: Object.freeze({
      otherPillarVisibleWu: visibleWu,
      otherPillarVisibleJi: visibleJi,
      otherPillarHiddenWu: hiddenWu,
      otherPillarHiddenJi: hiddenJi,
      // For 甲日, 戊 is 偏財 and 己 is 正財, not synonyms.
      jiaDayWuTenGod: '偏財' as const,
      jiaDayJiTenGod: '正財' as const,
      sourceClauseNamesBothWuAndJi: true as const,
      knownOriginalHourlyWealthChannel: o.hourWealthObservationChannel,
    }),
    scopeHypotheses,
    otherPillarUnitAudit,
    quantitativeModelSensitivity: Object.freeze({
      totalVisible,
      totalWu,
      totalAll,
      wouldDropVisibleJiIfWuOnly: visibleJi > 0,
      hiddenCountingChangesOccurrenceCount: totalAll > totalVisible,
      competingHypothesesHaveDifferentOccurrenceCounts:
        new Set(scopeHypotheses.map((x) => x.otherPillarOccurrenceCount)).size > 1,
      // No quantitative interpretation is suitable for a consumer Claim.
      candidateOccurrenceCountsAreNotClassicalWeiCounts: true as const,
    }),
    provenance: Object.freeze({
      workAndChapter: '三命通會 卷五 時上偏財' as const,
      explicitlyNamedClause: '柱中不宜再見戊己' as const,
      printedHarvardPdfPage: 45 as const,
      printedSiKuCadalImagePage: 104 as const,
      printedNlcPdfPage: 43 as const,
      nearbyVerse: '別無透出方為貴' as const,
      competingVisibilityText: '天元透出為妙支內所藏次之' as const,
      sameVolumeAnalogyChapter: '三命通會 卷五 時上一位貴' as const,
      sameVolumeAnalogyQuote: '時上偏官要幹上透出只一位為妙年月日重見' as const,
      sameVolumeAnalogyExplicitlyMentionsYearMonthDay: true as const,
      sameVolumeAnalogyIsAboutHourOfficerNotHourWealth: true as const,
      transferringOfficerCountingRuleToHourWealthAuthorized: false as const,
      historicalScopeOfZaiJianCertified: false as const,
      historicalMeaningOfYiWeiCertified: false as const,
    }),
    // This audit is a witness that different assumptions give different
    // counts, not a rule that picks which assumption is correct.
    sourceQualifiedRecurrenceVerdict: 'UNADJUDICATED' as const,
    sourceQualifiedSingletonVerdict: 'UNADJUDICATED' as const,
    chartStrengthVerdict: 'UNCLASSIFIED' as const,
    licensedHistoricalInterpretation: false as const,
    consumerClaimEligible: false as const,
    previewAdmissionGranted: false as const,
    officialAdmissionGranted: false as const,
    productionAuthorized: false as const,
    status: 'HYPOTHESIS_SENSITIVITY_RESEARCH_ONLY' as const,
  });
  return Object.freeze({ ...material, evidenceHash: deterministicContentHash(material) });
}
