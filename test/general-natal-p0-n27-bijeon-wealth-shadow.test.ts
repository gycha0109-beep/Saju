import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import {
  buildGeneralNatalN27BijeonWealthShadow,
} from '../src/research/general-natal-p0-n27-bijeon-wealth-shadow.js';

const NOW = new Date('2026-10-15T00:00:00.000Z');
function actual2010(hour: number | null) {
  return calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year: 2010, month: 2, day: 3 },
    time: hour === null ? { known: false } : { known: true, hour, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: NOW }).snapshot;
}

describe('N27 authentic 2010 snapshots: BiJian wealth literal text shadow', () => {
  it('19:30 has 甲戌時 literal and year 己, but NOT source-qualified wealth pattern or personal outcome', () => {
    const shadow = buildGeneralNatalN27BijeonWealthShadow(actual2010(19));
    expect(shadow.source).toMatchObject({
      work: '三命通會（四庫全書本）卷五',
      locator: '時上偏財',
      manuscriptOrPrintAuthentication: false,
    });
    expect(shadow.facts).toMatchObject({
      allPillarsResolved: true,
      hourKnown: true,
      dayStem: '갑',
      monthBranch: '축',
      yearStem: '기',
      hourStem: '갑',
      hourBranch: '술',
      literalJiaXuMatched: true,
      additionalYearJiVisible: true,
      exactGyeopJaeObserved: false,
      bijeonObserved: true,
    });
    expect(shadow.facts.wealthPositions.length).toBeGreaterThan(1);
    expect(shadow.facts.wealthRepresentativeSlotCount).toBe(
      shadow.facts.wealthPositions.length,
    );
    expect(shadow.facts.multipleRepresentativeWealthSlotsObserved).toBe(true);
    expect(shadow.facts.wealthBySubtype.regular).toBeGreaterThan(0);
    expect(shadow.facts.wealthByChannel.visibleStem).toBeGreaterThan(0);
    expect(shadow.facts.wealthByChannel.representativeBranch).toBeGreaterThan(0);
    expect(shadow.facts.hiddenStemsFullyObserved).toBe(true);
    expect(shadow.facts.hiddenStemObservations).toHaveLength(4);
    expect(shadow.facts.otherPillarWuJiVisibleStems).toContainEqual(
      expect.objectContaining({ slot: 'year', stem: '기' }),
    );
    // Actual canonical 甲申 day: 申藏戊, while 戌 hour also hides 戊.
    expect(shadow.facts.otherPillarHiddenWuJi).toContainEqual(
      expect.objectContaining({ slot: 'day', stem: '무' }),
    );
    expect(shadow.facts.hourHiddenWu).toBe(true);
    expect(shadow.facts.otherPillarWuJiObserved).toBe(true);
    expect(shadow.digitalCollation).toMatchObject({
      conflictingDigitalCharactersObserved: true,
      terminalCharacters: ['巳', '己'],
      correctOriginalPrintGlyph: 'UNRESOLVED',
      originalTargetFolioInspected: false,
      independentPrintWitnessesEstablished: 0,
      applyingJiProhibitionToThisChartAuthorized: false,
    });
    expect(shadow.digitalCollation.textWitnessVariants).toMatchObject([
      { witnessKey: 'WIKISOURCE_SIKU_VOLUME_FIVE', terminalCharacter: '巳' },
      { witnessKey: 'SHIDIAN_GUJI_VOLUME_FIVE', terminalCharacter: '己' },
      { witnessKey: 'WIKISOURCE_GENERAL_VOLUME_SIX', terminalCharacter: '己' },
    ]);
    expect(shadow.classicalHourWealthSingletonEvidence).toMatchObject({
      status: 'NOT_ADJUDICATED',
      representativeSlotMultiplicityObserved: true,
      countIsNotClassicalOccurrenceCount: true,
      conditionSatisfied: false,
    });
    expect(shadow.researchStrengthBoundary).toMatchObject({
      sourceObservationOnly: true,
      chartLevelWangShuaiClassifierAuthorized: false,
      chartLevelQiangRuoClassifierAuthorized: false,
      result: 'UNCLASSIFIED',
    });
    expect(shadow.rareBookCollationCandidates.map((c) => c.sourceId)).toEqual([
      'HARVARD_DRS_53262215_VOL_5',
      'NLC_411999029701_VOL_5_UPPER',
      'NLC_411999029701_VOL_5_LOWER',
    ]);
    expect(shadow.physicalPrintingGroups).toEqual([
      'HARVARD_1735_CATALOGUE',
      'NLC_411999029701_ENGRAVED_EDITION',
    ]);
    expect(shadow.rareBookCollationCandidates.every((c) =>
      !c.targetPageIdentified && !c.originalPrintedClauseRead &&
      !c.exactPrintedCharacterVerified
    )).toBe(true);
    expect(shadow.physicallyInspectedTargetPrintings).toBe(0);
    expect(shadow.rareBookCollationCandidates[0]?.physicalLayout).toBe('十行二〇字');
    expect(shadow.rareBookCollationCandidates[1]?.physicalLayout).toBe(
      '十行二二字; 白口; 四周雙邊',
    );
    expect(shadow.scanCandidates.map((x) => x.identifier)).toEqual([
      'CADAL06056481', 'CADAL06066041',
    ]);
    expect(shadow.scanCandidates.every((x) =>
      x.candidateScanLocated &&
      !x.targetPageOrFolioIdentified &&
      !x.directPrintCharacterVerification
    )).toBe(true);
    expect(shadow.literalPassageMatch).toBe('MATCHED_LEXICAL_FRAGMENT_ONLY');
    expect(shadow.candidateTraditionalHourWealthPatternEstablished).toBe(false);
    expect(shadow.sourceConditionsNotResolved).toContain('NO_GOVERNED_WANGSHUAI_STRENGTH_VERDICT');
    expect(shadow.sourceConditionsNotResolved).toContain('NO_VERIFIED_SIKU_WU_SI_VS_WU_JI_CHARACTER_COLLATION');
    expect(shadow.producesNewInterpretationClaim).toBe(false);
    expect(shadow.readerMeaningEligible).toBe(false);
    expect(shadow.productionAuthorized).toBe(false);
  });

  it('05:30 is a different real hour, so does not inherit 時上偏財 lexical example', () => {
    const shadow = buildGeneralNatalN27BijeonWealthShadow(actual2010(5));
    expect(shadow.facts.hourStem).toBe('정');
    expect(shadow.facts.hourBranch).toBe('묘');
    expect(shadow.facts.exactGyeopJaeObserved).toBe(true);
    expect(shadow.facts.literalJiaXuMatched).toBe(false);
    expect(shadow.literalPassageMatch).toBe('NO_LITERAL_MATCH');
    expect(shadow.facts.hourHiddenWu).toBe(false);
    expect(shadow.facts.otherPillarWuJiObserved).toBe(true);
    expect(shadow.digitalCollation.correctOriginalPrintGlyph).toBe('UNRESOLVED');
    expect(shadow.facts.wealthRepresentativeSlotCount).toBeGreaterThan(0);
    expect(shadow.researchStrengthBoundary.result).toBe('UNCLASSIFIED');
    expect(shadow.candidateTraditionalHourWealthPatternEstablished).toBe(false);
    expect(shadow.readerMeaningEligible).toBe(false);
  });

  it('unknown birth hour does not claim the 甲戌時 passage and never publishes', () => {
    const shadow = buildGeneralNatalN27BijeonWealthShadow(actual2010(null));
    expect(shadow.facts.hourKnown).toBe(false);
    expect(shadow.literalPassageMatch).toBe('HOUR_UNRESOLVED');
    expect(shadow.facts.literalJiaXuMatched).toBe(false);
    expect(shadow.readerMeaningEligible).toBe(false);
    expect(shadow.previewAdmissionGranted).toBe(false);
    expect(shadow.classicalHourWealthSingletonEvidence.status).toBe('NOT_ADJUDICATED');
  });

  it('is deterministic for same actual canonical snapshot and has no self-promoting output', () => {
    const snapshot = actual2010(19);
    const a = buildGeneralNatalN27BijeonWealthShadow(snapshot);
    const b = buildGeneralNatalN27BijeonWealthShadow(snapshot);
    expect(a.evidenceHash).toBe(b.evidenceHash);
    expect(a.evidenceHash).toMatch(/^[a-f0-9]{64}$/);
    expect(a.status).toBe('RESEARCH_SHADOW_ONLY');
    expect(a.version).toBe('saju-n27-bijeon-wealth-source-condition-shadow-v4');
    expect(a.sourceConditionsNotResolved).toHaveLength(6);
  });
});
