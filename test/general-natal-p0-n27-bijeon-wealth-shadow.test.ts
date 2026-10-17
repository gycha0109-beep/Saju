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
      originalTargetFolioInspected: true,
      harvardPrintedWitnessReads: '己',
      harvardPrintedWitnessImagePageInspected: true,
      siKuOriginalPrintedGlyphDirectlyInspected: true,
      inspectedSiKuSourceId: 'CADAL06056481',
      printedSourceGlyphAgreement: '己',
      siKuSpecificEditableTranscriptionDiffersFromScannedPrint: true,
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
    expect(shadow.rareBookCollationCandidates[0]).toMatchObject({
      targetPageIdentified: true,
      targetPdfPageOneBased: 45,
      originalPrintedClauseRead: true,
      exactPrintedCharacterVerified: true,
      printedCharacter: '己',
      passageRead: '柱中不宜再見戊己',
      acquisitionRunId: 39037912192,
      acquisitionArtifactId: 12103320492,
      printEditionLineageIndependentlyAuthenticated: false,
    });
    expect(shadow.rareBookCollationCandidates[1]).toMatchObject({
      targetPageIdentified: true,
      targetPdfPageOneBased: 43,
      originalPrintedClauseRead: true,
      exactPrintedCharacterVerified: true,
      printedCharacter: '己',
      passageRead: '柱中不宜再見戊己',
      sourcePdfSha256: '0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1',
      page43RasterSha256: '7f9b25f6c420044e5edc3d55f12dbb66b779a552b8181adfbc0deae8dfe5f005',
    });
    expect(shadow.rareBookCollationCandidates[2]).toMatchObject({
      targetPageIdentified: false,
      originalPrintedClauseRead: false,
      exactPrintedCharacterVerified: false,
    });
    expect(shadow.physicallyInspectedTargetPrintings).toBe(3);
    expect(shadow.physicallyInspectedTargetSourceIds).toEqual([
      'HARVARD_DRS_53262215_VOL_5',
      'CADAL06056481',
      'NLC_411999029701_VOL_5_UPPER',
    ]);
    expect(shadow.crossPrintCollation).toMatchObject({
      status: 'THREE_PRINTED_SCAN_CLAUSE_READINGS_AGREE',
      observedGlyphInAllThree: '己',
      primaryEditionPrintedTargetImagesDirectlyRead: 3,
      digitalSiKuWikisourceDiffersFromInspectedCadal: true,
      digitalTranscriptionErrorLikelyAtThisLocus: true,
      twoIndependentHistoricalTextLineagesProven: false,
      readerClaimAuthorityChanged: false,
      productionAuthorized: false,
    });
    expect(shadow.harvardPrintedClauseVerification).toMatchObject({
      status: 'ONE_PRINTED_WITNESS_DIRECTLY_READ',
      pdfPageOneBased: 45,
      printedClause: '柱中不宜再見戊己',
      printedDisputedGlyph: '己',
      sourcePdfSha256: 'ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831',
      pageRasterHighResSha256: 'b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12',
      researchCropSha256: 'fc3063d2608720b13cfca0f7e43e89f3a898aca38d3810de290b835f600e5582',
      printedFolioMarkRead: false,
      sourceOriginalLineageFullyVerified: false,
      provesSikuWikisourceIsATypo: false,
      independentSecondPrintedEditionCorroborated: false,
      admissionAuthorityCreated: false,
    });
    expect(shadow.rareBookCollationCandidates[0]?.physicalLayout).toBe('十行二〇字');
    expect(shadow.rareBookCollationCandidates[1]?.physicalLayout).toBe(
      '十行二二字; 白口; 四周雙邊',
    );
    expect(shadow.scanCandidates.map((x) => x.identifier)).toEqual([
      'CADAL06056481', 'CADAL06066041',
    ]);
    expect(shadow.scanCandidates[0]).toMatchObject({
      targetPageOrFolioIdentified: true,
      targetImagePageOneBased: 104,
      directPrintCharacterVerification: true,
      observedPrintedGlyph: '己',
      observedPrintedClause: '柱中不宜再見戊己',
      scannedDjvuSha256: '4f273322b3fd4339789e1408e0bbb4ea15a7956e5e508c6f99fced264e0b53ee',
      page104RasterSha256: 'e20a1ce67daac2fc30eb914e8288d85f41cf2ab0ec14ba3156e630c2d5a91ac4',
      sameEditionJiSiReferencePage: 106,
      verifiedComparedToSameEditionKnownJiSiPair: true,
      SiKuPrintedEditionLineageFullyAuthenticated: false,
    });
    expect(shadow.scanCandidates[1]).toMatchObject({
      targetPageOrFolioIdentified: false,
      directPrintCharacterVerification: false,
    });
    expect(shadow.literalPassageMatch).toBe('MATCHED_LEXICAL_FRAGMENT_ONLY');
    expect(shadow.candidateTraditionalHourWealthPatternEstablished).toBe(false);
    expect(shadow.sourceConditionsNotResolved).toContain('NO_GOVERNED_WANGSHUAI_STRENGTH_VERDICT');
    expect(shadow.sourceConditionsNotResolved).toContain('NO_CRITICAL_EDITION_GENEALOGY_FOR_SIKU_WIKISOURCE_EDIT');
    expect(shadow.sourceConditionsNotResolved).toContain('NO_INDEPENDENT_HISTORICAL_WITNESS_LINEAGE_OR_PRINTED_FOLIO_MARK');
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
    expect(a.version).toBe('saju-n27-bijeon-wealth-source-condition-shadow-v6');
    expect(a.sourceConditionsNotResolved).toHaveLength(6);
  });
});
