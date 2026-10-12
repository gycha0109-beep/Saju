import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  YUANHAI_THREE_LAYER_WITNESS_VERSION,
  YUANHAI_DIGITAL_WITNESSES,
  YUANHAI_SOURCE_CHART,
  YUANHAI_SOURCE_TOPOLOGY,
  YUANHAI_SOURCE_CONFLICTS,
  YUANHAI_SOURCE_UNRESOLVED,
  buildYuanHaiSixPillarDigitalCase,
} from '../src/research/general-annual-yuanhai-six-pillar-witness.js';

describe('Yuanhai Chapter 2: a full historical natal + Dayun + annual written case', () => {
  test('the witness declares all six complete textual pillars without generating a birth date', () => {
    expect(YUANHAI_THREE_LAYER_WITNESS_VERSION).toContain('v1');
    expect(YUANHAI_SOURCE_CHART).toMatchObject({
      natal: { year: '癸未', month: '乙卯', day: '甲子', hour: '己巳' },
      dayun: '辛亥',
      annual: '辛酉',
      possibleHistoricalFigureLabel: '岳飛',
      independentHistoricalFigureAuthentication: false,
      originalPrintedTextIdenticallyVerified: false,
      historicalCalendarAndDayunCalculationRecomputed: false,
    });
    expect(YUANHAI_SOURCE_CHART.branches).toEqual({
      'natal:year': '未',
      'natal:month': '卯',
      'natal:day': '子',
      'natal:hour': '巳',
      dayun: '亥',
      annual: '酉',
    });
  });

  test('named 亥卯未/卯酉 opposition shares precisely natal month 卯', () => {
    expect(YUANHAI_SOURCE_TOPOLOGY).toMatchObject({
      tripleSlots: ['dayun', 'natal:year', 'natal:month'],
      tripleBranches: ['亥', '未', '卯'],
      narratedTriple: '亥卯未',
      clashSlots: ['annual', 'natal:month'],
      clashBranches: ['酉', '卯'],
      narratedClash: '卯酉',
      sharedSlot: 'natal:month',
      threeTemporalLayersNamed: true,
      natalAndLuckChartIsFullySpecifiedInDigitalText: true,
      anyRuleWinnerExplainedBySource: false,
      textSaysTripleAutomaticallyCancelsClash: false,
      textSaysClashAlwaysDestroysTriple: false,
    });
    const casebook = buildYuanHaiSixPillarDigitalCase();
    expect(casebook.sharedPillarSlotFromWrittenChart).toBe('natal:month');
    expect(casebook.historicalCombinedTripleAndClashNarrated).toBe(true);
    expect(casebook.directHistoricalRuleWinnerEstablished).toBe(false);
    expect(casebook.winningRelation).toBeNull();
    expect(casebook.actualTripleTransformation).toBeNull();
    expect(casebook.clashCancellation).toBeNull();
  });

  test('print-based OCR 木 is not silently normalized to the 未 earthly branch', () => {
    expect(YUANHAI_DIGITAL_WITNESSES).toHaveLength(4);
    expect(YUANHAI_DIGITAL_WITNESSES.map((w) => w.triplePhrase)).toEqual([
      '亥卯未合起陽刃',
      '亥卯未合起羊刃',
      '亥卯未合起羊刃',
      '亥卯木合起羊刃',
    ]);
    expect(YUANHAI_DIGITAL_WITNESSES.filter((w) => w.figureNamePresent))
      .toHaveLength(1);
    expect(YUANHAI_DIGITAL_WITNESSES.every((w) =>
      w.facsimileGlyphsVerified === false &&
      w.independentEditionEstablished === false,
    )).toBe(true);
    expect(YUANHAI_DIGITAL_WITNESSES[3]?.sourceCarrier)
      .toBe('print_based_unverified_OCR_transcription');
    expect(YUANHAI_SOURCE_CONFLICTS).toHaveLength(3);
    expect(YUANHAI_SOURCE_CONFLICTS[0]).toMatchObject({
      id: 'HE_MAO_WEI_LAST_GLYPH',
      branchCompletenessDependsOnGlyph: true,
      MingPrintImageConfirmedAsWei: false,
      MingPrintImageConfirmedAsMu: false,
      autoFixOrMajorityVoteAuthorized: false,
    });
    expect(YUANHAI_SOURCE_CONFLICTS[1]).toMatchObject({
      id: 'HISTORICAL_NAME_ATTRIBUTION',
      historicalPersonVerifiedAsChartOwner: false,
      figureAttributionApproved: false,
    });
  });

  test('source collation and all derived hashes are deterministic and research-only', () => {
    const output = buildYuanHaiSixPillarDigitalCase();
    expect(output.status)
      .toBe('digital_full_six_pillar_case_but_print_glyph_unresolved');
    expect(output.variants).toBe(YUANHAI_SOURCE_CONFLICTS);
    expect(output.witnesses).toBe(YUANHAI_DIGITAL_WITNESSES);
    expect(output.unresolved).toBe(YUANHAI_SOURCE_UNRESOLVED);
    expect(output.printedOriginalCollationUnresolved).toBe(true);
    expect(output.originalSixPillarConfigurationKnownAtDigitalTextTier).toBe(true);
    expect(output.authority).toMatchObject({
      digitalWitnessNarratesNatalDayunAnnual: true,
      actualMingPrintTripleGlyphVerified: false,
      printEditionIndependenceEstablished: false,
      historicalPersonFactVerified: false,
      globalTripleClashPriorityAuthorized: false,
      annualThreeLayerInterpretationAuthorized: false,
      individualOutcomeAuthorized: false,
      officialReadingAuthorized: false,
      productionAuthorized: false,
    });
    expect(output.realWorldEventOrSeverity).toBeNull();
    expect(output.personalAnnualReading).toBeNull();
    const { witnessHash, ...material } = output;
    expect(witnessHash).toBe(deterministicContentHash(material));
    expect(buildYuanHaiSixPillarDigitalCase()).toEqual(output);
  });

  test('the old 2026/2027 E1 annual fixtures are not retroactively used as 辛酉', () => {
    expect(YUANHAI_SOURCE_CHART.annual).toBe('辛酉');
    expect(YUANHAI_SOURCE_CHART.branches.annual).toBe('酉');
    expect(YUANHAI_SOURCE_CHART.historicalCalendarAndDayunCalculationRecomputed)
      .toBe(false);
    expect(YUANHAI_SOURCE_UNRESOLVED)
      .toContain('MODERN_ANNUAL_E1_FOR_HISTORICAL_1141_NOT_COMPUTED_OR_AUTHORIZED');
    expect(YUANHAI_SOURCE_UNRESOLVED)
      .toContain('SOURCE_MING_PRINT_PAGE_COLUMN_FOR_WEI_OR_MU_GLYPH_NOT_VERIFIED');
  });
});
