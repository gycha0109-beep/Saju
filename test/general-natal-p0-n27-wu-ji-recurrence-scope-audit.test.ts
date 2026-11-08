import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildGeneralNatalN27WuJiRecurrenceScopeAudit } from '../src/research/general-natal-p0-n27-wu-ji-recurrence-scope-audit.js';

const NOW = new Date('2026-10-15T00:00:00.000Z');
function actual2010(hour: number | null) {
  return calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year: 2010, month: 2, day: 3 },
    time: hour === null ? { known: false } : { known: true, hour, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: NOW }).snapshot;
}
const byKey = (
  audit: ReturnType<typeof buildGeneralNatalN27WuJiRecurrenceScopeAudit>,
  key: string,
) => audit.scopeHypotheses.find((h) => h.key === key);

describe('N27 再見戊己 research sensitivity: scope is NOT a source-qualified predicate', () => {
  it('19:30: visible 己 changes counts under 戊-only vs 戊己 hypotheses', () => {
    const x = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    expect(x.contextStatus).toBe('SOURCE_EXAMPLE_ONLY');
    expect(x.printedExampleKind).toBe('JIA_JIA_XU_HIDDEN_WU');
    expect(x.actualObservationChannels).toMatchObject({
      otherPillarVisibleWu: 0,
      otherPillarVisibleJi: 1,
      sourceClauseNamesBothWuAndJi: true,
      jiaDayWuTenGod: '偏財',
      jiaDayJiTenGod: '正財',
      knownOriginalHourlyWealthChannel: 'HOUR_BRANCH_WU_HIDDEN_ONLY',
    });
    expect(x.actualObservationChannels.otherPillarHiddenWu).toBeGreaterThan(0);
    expect(x.actualObservationChannels.otherPillarHiddenJi).toBeGreaterThan(0);
    expect(byKey(x, 'VISIBLE_WU_ONLY')).toMatchObject({
      otherPillarOccurrenceCount: 0,
      observerWouldCountAnOtherPillarOccurrence: false,
      includesVisibleRegularWealthJi: false,
      literalClauseAdequacy: 'OMITS_EXPLICIT_JI_IN_WU_JI_CLAUSE',
      classicalProhibitionVerdict: 'UNADJUDICATED',
    });
    expect(byKey(x, 'VISIBLE_WU_AND_JI')).toMatchObject({
      otherPillarOccurrenceCount: 1,
      observerWouldCountAnOtherPillarOccurrence: true,
      includesHiddenStems: false,
      classicalProhibitionVerdict: 'UNADJUDICATED',
    });
    expect(byKey(x, 'VISIBLE_AND_HIDDEN_WU_AND_JI')?.otherPillarOccurrenceCount)
      .toBeGreaterThan(byKey(x, 'VISIBLE_WU_AND_JI')?.otherPillarOccurrenceCount ?? 0);
    expect(x.quantitativeModelSensitivity).toMatchObject({
      totalVisible: 1,
      wouldDropVisibleJiIfWuOnly: true,
      hiddenCountingChangesOccurrenceCount: true,
      competingHypothesesHaveDifferentOccurrenceCounts: true,
      candidateOccurrenceCountsAreNotClassicalWeiCounts: true,
    });
    expect(x.sourceQualifiedRecurrenceVerdict).toBe('UNADJUDICATED');
    expect(x.sourceQualifiedSingletonVerdict).toBe('UNADJUDICATED');
    expect(x.productionAuthorized).toBe(false);
  });

  it('07:30 and 19:30 same other pillars: assumption changes numbers, not historical admission', () => {
    const visible = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(7));
    const hidden = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    expect(visible.printedExampleKind).toBe('JIA_WU_CHEN_VISIBLE_WU');
    expect(hidden.printedExampleKind).toBe('JIA_JIA_XU_HIDDEN_WU');
    expect(visible.actualObservationChannels.knownOriginalHourlyWealthChannel)
      .toBe('HOUR_STEM_WU_VISIBLE');
    expect(hidden.actualObservationChannels.knownOriginalHourlyWealthChannel)
      .toBe('HOUR_BRANCH_WU_HIDDEN_ONLY');
    expect(visible.actualObservationChannels.otherPillarVisibleJi).toBe(1);
    expect(visible.actualObservationChannels).toMatchObject({
      otherPillarVisibleWu: hidden.actualObservationChannels.otherPillarVisibleWu,
      otherPillarVisibleJi: hidden.actualObservationChannels.otherPillarVisibleJi,
      otherPillarHiddenWu: hidden.actualObservationChannels.otherPillarHiddenWu,
      otherPillarHiddenJi: hidden.actualObservationChannels.otherPillarHiddenJi,
    });
    expect(visible.scopeHypotheses.map((s) => s.otherPillarOccurrenceCount))
      .toEqual(hidden.scopeHypotheses.map((s) => s.otherPillarOccurrenceCount));
    expect(visible.scopeHypotheses.every((s) => s.classicalProhibitionVerdict === 'UNADJUDICATED'))
      .toBe(true);
  });

  it('05:30 no printed hour example and unknown birth hour cannot qualify a scope', () => {
    const notExample = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(5));
    const unknown = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(null));
    expect(notExample.contextStatus).toBe('NOT_THE_PRINTED_EXAMPLE');
    expect(unknown.contextStatus).toBe('HOUR_UNRESOLVED');
    for (const audit of [notExample, unknown]) {
      expect(audit.scopeHypotheses.every((h) =>
        !h.observerWouldCountAnOtherPillarOccurrence &&
        h.classicalProhibitionVerdict === 'UNADJUDICATED'
      )).toBe(true);
      expect(audit.consumerClaimEligible).toBe(false);
      expect(audit.productionAuthorized).toBe(false);
    }
  });

  it('stable digest / exact four quantitative counterfactuals / no admission', () => {
    const a = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    const b = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    expect(a.evidenceHash).toBe(b.evidenceHash);
    expect(a.evidenceHash).toMatch(/^[0-9a-f]{64}$/);
    expect(a.scopeHypotheses.map((x) => x.key)).toEqual([
      'VISIBLE_WU_ONLY', 'VISIBLE_WU_AND_JI',
      'VISIBLE_AND_HIDDEN_WU_ONLY', 'VISIBLE_AND_HIDDEN_WU_AND_JI',
    ]);
    expect(a.provenance.sameVolumeAnalogyQuote).toContain('年月日重見');
    expect(a.provenance.sameVolumeAnalogyIsAboutHourOfficerNotHourWealth).toBe(true);
    expect(a.provenance.transferringOfficerCountingRuleToHourWealthAuthorized).toBe(false);
    expect(a.provenance.historicalScopeOfZaiJianCertified).toBe(false);
    expect(a.provenance.historicalMeaningOfYiWeiCertified).toBe(false);
    expect(a.status).toBe('HYPOTHESIS_SENSITIVITY_RESEARCH_ONLY');
    expect(a.previewAdmissionGranted).toBe(false);
    expect(a.officialAdmissionGranted).toBe(false);
    expect(a.licensedHistoricalInterpretation).toBe(false);
  });
  it('actual 甲戌 charts isolate other-pillar visible 己, visible 戊, and hidden-only exposure', () => {
    // Real calculated charts, NOT edited fixture stems. All dates are 甲 days
    // ten-day multiples after 2010-02-03, each evaluated at 19:30.
    const jiOnly = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    const snapshotWu = calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType: 'solar', date: { year: 2010, month: 2, day: 13 },
      time: { known: true, hour: 19, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    }, { now: NOW }).snapshot;
    const snapshotHidden = calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType: 'solar', date: { year: 2010, month: 5, day: 4 },
      time: { known: true, hour: 19, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    }, { now: NOW }).snapshot;
    const wuOnly = buildGeneralNatalN27WuJiRecurrenceScopeAudit(snapshotWu);
    const hiddenOnly = buildGeneralNatalN27WuJiRecurrenceScopeAudit(snapshotHidden);
    for (const audit of [jiOnly, wuOnly, hiddenOnly]) {
      expect(audit.contextStatus).toBe('SOURCE_EXAMPLE_ONLY');
      expect(audit.printedExampleKind).toBe('JIA_JIA_XU_HIDDEN_WU');
      expect(audit.sourceQualifiedRecurrenceVerdict).toBe('UNADJUDICATED');
      expect(audit.sourceQualifiedSingletonVerdict).toBe('UNADJUDICATED');
      expect(audit.productionAuthorized).toBe(false);
    }
    expect([jiOnly.actualObservationChannels.otherPillarVisibleWu,
      jiOnly.actualObservationChannels.otherPillarVisibleJi]).toEqual([0, 1]);
    expect([wuOnly.actualObservationChannels.otherPillarVisibleWu,
      wuOnly.actualObservationChannels.otherPillarVisibleJi]).toEqual([1, 0]);
    expect([hiddenOnly.actualObservationChannels.otherPillarVisibleWu,
      hiddenOnly.actualObservationChannels.otherPillarVisibleJi]).toEqual([0, 0]);
    expect(hiddenOnly.actualObservationChannels.otherPillarHiddenWu).toBeGreaterThan(0);
    expect(byKey(wuOnly, 'VISIBLE_WU_ONLY')?.otherPillarOccurrenceCount).toBe(1);
    expect(byKey(hiddenOnly, 'VISIBLE_WU_AND_JI')?.otherPillarOccurrenceCount).toBe(0);
    expect(byKey(hiddenOnly, 'VISIBLE_AND_HIDDEN_WU_AND_JI')?.otherPillarOccurrenceCount)
      .toBeGreaterThan(0);
  });

  it('does not equate separate stem/hidden occurrences with pillars or a classical 位', () => {
    const x = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    const unit = x.otherPillarUnitAudit;
    expect(unit.occurrenceUnitCount).toBe(
      x.actualObservationChannels.otherPillarVisibleWu +
      x.actualObservationChannels.otherPillarVisibleJi +
      x.actualObservationChannels.otherPillarHiddenWu +
      x.actualObservationChannels.otherPillarHiddenJi,
    );
    expect(unit.occurrenceUnitCount).toBeGreaterThan(unit.distinctPillarUnitCount);
    expect(unit.pillarsWithBothVisibleAndHiddenCount).toBeGreaterThan(0);
    expect(unit.yearMonthOnlyOccurrenceCount + unit.dayPillarOccurrenceCount)
      .toBe(unit.yearMonthDayOccurrenceCount);
    expect(unit.dayPillarOccurrenceCount).toBeGreaterThan(0);
    expect(unit.hourReference).toMatchObject({
      hourStem: '갑', hourBranch: '술', hourVisibleWu: false, hourHiddenWu: true,
      includedInOtherPillarOccurrenceCount: false,
    });
    expect(unit.whetherClassicalBieGongIncludesDayPillar).toBe('UNADJUDICATED');
    expect(unit.whetherTwoChannelsInOnePillarAreTwoWei).toBe('UNADJUDICATED');
    expect(unit.whetherHistoricalWeiMeansStemGlyphOrPillarOrLocation).toBe('UNADJUDICATED');
  });

  it('non-甲 day is a negative control even when another-pillar stems can be observed', () => {
    const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType: 'solar', date: { year: 2010, month: 2, day: 4 },
      time: { known: true, hour: 19, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    }, { now: NOW }).snapshot;
    const nonJia = buildGeneralNatalN27WuJiRecurrenceScopeAudit(snapshot);
    expect(nonJia.contextStatus).toBe('DIFFERENT_DAY_STEM');
    expect(nonJia.scopeHypotheses.every((h) =>
      h.observerWouldCountAnOtherPillarOccurrence === false &&
      h.classicalProhibitionVerdict === 'UNADJUDICATED'
    )).toBe(true);
    expect(nonJia.productionAuthorized).toBe(false);
  });

  it('v3 actual Jia-Xu hour: year 己 counted twice by channel is ONE pillar+glyph', () => {
    const x = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    const units = x.otherPillarUnitAudit;
    expect(x.version).toBe('saju-n27-wu-ji-recurrence-scope-sensitivity-v30');
    // 2010-02-03: 年干己 and 年支丑藏己 represent two observations
    // of the *same* glyph in the *same* pillar, not two pillars.
    expect(units.crossChannelDuplicatePillarGlyphs).toContainEqual({
      slot: 'year', glyph: '己',
    });
    expect(units.samePillarGlyphAcrossChannelsCanInflateOccurrenceCount).toBe(true);
    const models = units.palaceAndChannelCounterfactuals;
    expect(models.map((p) => p.key)).toEqual([
      'YEAR_MONTH_VISIBLE', 'YEAR_MONTH_DAY_VISIBLE',
      'YEAR_MONTH_VISIBLE_HIDDEN', 'YEAR_MONTH_DAY_VISIBLE_HIDDEN',
    ]);
    expect(models.map((p) => p.observedOccurrenceCount)).toEqual([1, 1, 3, 4]);
    expect(models.map((p) => p.distinctPillarGlyphPairCount)).toEqual([1, 1, 2, 3]);
    expect(models.map((p) => p.samePillarSameGlyphTwoChannelExcess)).toEqual([0, 0, 1, 1]);
    expect(models.map((p) => p.distinctPillarCount)).toEqual([1, 1, 2, 3]);
    expect(models.every((p) =>
      p.namedWuJiCovered &&
      p.classicalBieGongVerdict === 'UNADJUDICATED' &&
      p.classicalZaiJianVerdict === 'UNADJUDICATED' &&
      !p.classicalWeiCountAuthorized
    )).toBe(true);
    expect(x.yearMonthVsDayAndVisibleVsHiddenScopeAdjudicated).toBe(false);
    expect(x.provenance.sameVolumeAnalogySecondVerse).toBe('時上一位貴藏在支中');
    expect(x.provenance.sameVolumeAnalogyIsDigitallyTranscribedNotNewPrintAttestation)
      .toBe(true);
    expect(x.provenance.classicalBieGongDayInclusionNotDerivedFromAnalogy).toBe(true);
    expect(x.provenance.sameVolumeZhengGuanPhrase).toContain('丑月內有辛金');
    expect(x.provenance.sameVolumeZhengGuanLaterVisiblePhrase).toContain('天干復透辛多');
    expect(x.provenance.sameVolumeZhengGuanHiddenBranchRepetitionDescribed).toBe(true);
    expect(x.provenance.sameVolumeZhengGuanSourceChannel).toBe('DIGITAL_TRANSCRIPTION_ONLY');
    expect(x.provenance.zhengGuanRecurrenceRuleApplicableToHourWealth).toBe(false);
    const printed = x.provenance.sameVolumeZhengGuanPrintCrosscheck;
    expect(printed.status).toBe('TWO_PRINT_SCAN_WITNESSES_PASSAGE_DIRECTLY_READ');
    expect(printed.printWitnesses).toHaveLength(2);
    expect(printed.printWitnesses.map((p) => p.sourceId)).toEqual([
      'HARVARD_DRS_53262215_VOL_5', 'NLC_411999029701_VOL_5_UPPER',
    ]);
    expect(printed.printWitnesses.map((p) => p.ordinalPdfPages)).toEqual([
      [6, 7], [5, 6],
    ]);
    expect(printed.printWitnesses[0]).toMatchObject({
      sourceId: 'HARVARD_DRS_53262215_VOL_5',
      page7RasterSha256: '9c7a13cbd444e49487de86747b59fa52bd84ef6b16ecc60b20ffc1a3cb9a42bc',
    });
    expect(printed.printWitnesses[1]).toMatchObject({
      sourceId: 'NLC_411999029701_VOL_5_UPPER',
      page6RasterSha256: '9ec272128d7e3e313b7ce9b190cfb8ba75e997bf51c7b09912b97aeaea51fb93',
    });
    expect(printed.printedZhengGuanOnlyPhrase).toBe('支藏干透餘位不宜再見');
    expect(printed.printedHiddenThenBranchExample).toBe('甲生丑月內有辛金又值酉時');
    expect(printed.printedAdditionalVisibleStemExample).toBe('若天干復透辛多');
    expect(printed.debatedYiJiSiGlyphBeforeShiZhongFanResolved).toBe(false);
    expect(printed.priorOriginalRenderedArtifactsReopenedAndRead).toBe(true);
    expect(printed.twoDistinctHoldingPrintScansRead).toBe(true);
    expect(printed.printLineageIndependenceCertified).toBe(false);
    expect(printed.taiwanWanli1578ZhengGuanPrintedLocus).toMatchObject({
      sourceId: 'TAIWAN_NCL_06589_1578',
      catalogedExactPublicationYear: 1578,
      originalPdfPages: [337, 340, 341],
      originalZhengGuanHeadingOnPage340: true,
      directPrintedBranchExampleOnPage341: '甲生丑月內有辛金又值酉時',
      independentTextualLineageCertified: false,
      automaticallyApplyToHourWealth: false,
    });
    expect(printed.taiwanWanli1578HourWealthPrintedLocus).toMatchObject({
      pageHourWealthHeading: 375,
      pageDirectPrintedWuJiClause: 376,
      printedDisputedGlyph: '己',
      originalPrintedClause: '柱中不宜再見戊己',
      directlyReadPrintedHoldingGroupsNowFour: 4,
      fourPrintingsAreGenealogicallyIndependent: false,
      originalAuthorialManuscriptGlyphCertified: false,
      printedGlyphDoesNotDefineZaiJianCountingScope: true,
    });
    const leaf = printed.hourWealthLocalLeafCollation;
    expect(leaf).toMatchObject({
      version: 'n27-harvard-taiwan-local-leaf-collation-v1',
      auditStatus: 'SAMPLED_PHRASE_AGREEMENT_ONLY',
      harvardHoldingId: 'HARVARD_DRS_53262215_VOL_5',
      harvardHourWealthPdfPage: 45,
      harvardHighResPage45Sha256:
        'b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12',
      taiwanHoldingId: 'TAIWAN_NCL_06589_1578',
      taiwanHourWealthPdfPages: [375, 376],
      sampledAgreementsArePunctuationNormalized: true,
      entireChapterVerbatimCollationCompleted: false,
      localSampleShowsSubstantiveVariant: false,
      noVariantAnywhereInVolumeCertified: false,
      catalogHarvardCharactersPerLine: 20,
      catalogTaiwanCharactersPerLine: 22,
      matchingPhysicalSettingFromSameCarvedWoodblockSupported: false,
      nonidenticalPrintedSettingSupported: true,
      taiwanCatalogPlateHeartTitle: '三命會通',
      taiwanCatalogSingleFishtail: true,
      taiwanCatalogListsEngraverNames: true,
      namedEngraverAtExactComparedLeafRead: false,
      engravedNameAtExactLeaf: 'UNREADABLE',
      actualLeafRecarvingOrReplacementProven: false,
      actualLeafLossProven: false,
      commonTextualAncestor: 'UNADJUDICATED',
      independentTextualWitnesses: 'UNADJUDICATED',
      sampleAgreementCanAuthorizeBieGongDayScope: false,
      sampleAgreementCanAuthorizeZaiJianHiddenCount: false,
      sampleAgreementCanAuthorizeYiWeiUnit: false,
      sourceOnlyNoConsumerPromotion: true,
    });
    expect(leaf.sampledPrintedPhraseAgreements).toEqual([
      { text: '時上偏財別宮忌見', harvardPage: 45, taiwanPage: 375 },
      { text: '柱中不宜再見戊己', harvardPage: 45, taiwanPage: 376 },
      { text: '只要一位不宜多逢', harvardPage: 45, taiwanPage: 376 },
      { text: '天元透出為妙支內所藏次之', harvardPage: 45, taiwanPage: 376 },
      { text: '時上偏財不用多', harvardPage: 45, taiwanPage: 376 },
    ]);
    expect(leaf.harvardOriginalPdfSha256)
      .toBe(printed.printWitnesses[0]?.originalPdfSha256);
    expect(leaf.taiwanOriginalPdfSha256)
      .toBe(printed.taiwanWanli1578HourWealthPrintedLocus.originalPdfSha256);
    expect(printed.taiwanWanliCopy06590AccessibilityAudit).toMatchObject({
      status: 'CATALOG_CONFIRMED_ORIGINAL_SCAN_NOT_ACCESSED',
      accessionNumber: '06590',
      comparedAccessibleCopyAccessionNumber: '06589',
      twoSeparateCatalogRecordsVerified: true,
      editionAsCataloged: '明萬曆戊寅六年1578刊本',
      sameCatalogedYear1578: true,
      volumes: 12,
      catalogedLinesPerHalfLeaf: 10,
      catalogedCharactersPerLine: 22,
      catalogedPlateHeartTitle: '三命會通',
      catalogIndicatesPermissionApplication: true,
      accessibleOriginalPdfLocatedInReviewedPublicSources: false,
      printedImagesOf06590Reviewed: false,
      hourWealthPdfPageNumberFor06590Known: false,
      exactHourWealthLeafInscriptionReviewed: false,
      characterStrokeLossComparedBetween06589And06590: false,
      specificEngraverSameInTwoCopies: 'UNADJUDICATED',
      exactSamePrintingBlock: 'UNADJUDICATED',
      textualIndependentTraditions: 'UNADJUDICATED',
      independentNewPrintWitnessCountIncrement: 0,
      candidateOnlyNeverClassicalAuthorization: true,
    });
    expect(printed.taiwanWanliCopy06590AccessibilityAudit.catalogSource)
      .toContain('rbook.ncl.edu.tw');
    expect(printed.taiwanWanliCopy06590AccessibilityAudit.secondaryCatalogSource)
      .toContain('catalog.digitalarchives.tw');
    expect(printed.mainlandNlcVsTaiwan06589SameLocusPrintComparison).toMatchObject({
      status: 'SIDE_BY_SIDE_COLUMN_ALIGNMENT_OBSERVED_NO_WOODBLOCK_VERDICT',
      mainlandOriginalHolding: 'NLC_411999029701_VOL_5_UPPER',
      mainlandPdfPage: 43,
      taiwanOriginalHolding: 'TAIWAN_NCL_06589_1578',
      taiwanPdfPage: 376,
      bothCatalogedTenLinesTwentyTwoCharacters: true,
      visiblySimilarColumnBeginningsAtHourWealthLocus: true,
      visuallyComparedRepeatedText: '如甲日見戊辰或甲戌時之例',
      physicalStrokeChipOrSharedDefectEstablished: false,
      sameEngraverMarkAtBothLeavesRead: false,
      imageScalesAndInkingDiffer: true,
      supplementaryReadingMarksNotTreatedAsOriginalTextVariants: true,
      plateHeartFishtailOnBothExactLeavesFullyRead: false,
      candidateSameSettingRequiresPositiveMicrodefectEvidence: true,
      commonPrintingBlocks: 'UNADJUDICATED',
      manuscriptFamilyOrTextualGenealogy: 'UNADJUDICATED',
      independentVotesFromTextAgreementAuthorized: false,
      cannotUseToDecideBieGongZaiJianOrYiWei: true,
    });
    const registration = printed.mainlandNlcTaiwan06589SiftRegistrationAudit;
    expect(registration).toMatchObject({
      status: 'STRONG_SPATIAL_REGISTRATION_NO_POSITIVE_SHARED_BLOCK_DEFECT',
      mainlandPdfPage: 43,
      taiwanPdfPage: 376,
      mainlandHoldingId: 'NLC_411999029701_VOL_5_UPPER',
      taiwanHoldingId: 'TAIWAN_NCL_06589_1578',
      algorithm: 'OpenCV_SIFT_BF_KNN_RANSAC_HOMOGRAPHY',
      detectorMaxFeatures: 8500,
      detectorContrastThreshold: 0.012,
      detectorEdgeThreshold: 15,
      knnRatioThreshold: 0.74,
      ransacDestinationThresholdPixels: 3.5,
      originalRoiPixelBounds: {
        mainland: [426, 155, 806, 689],
        taiwan: [1083, 356, 2015, 1665],
      },
      mainlandP43Taiwan1578P376: {
        siftRatioAccepted: 406,
        homographyInliers: 245,
        inlierFraction: 0.6034,
        medianInlierReprojectionPixelsInTaiwanRaster: 1.925,
        inliersDistributedAcrossMostOfComparedPrintedLeaf: true,
      },
      automatedMatchingStrengthVersusControls: 'SUBSTANTIALLY_HIGHER',
      metricSensitiveToRoiRenderingAlgorithmAndThresholds: true,
      identicalSourcePdfOrScanReuseCertifiedExcluded: false,
      sharedUniqueGlyphChipDefectLocatedAndVisuallyCertified: false,
      exactEngraverSameAtLeaf: 'UNADJUDICATED',
      identicalCarvedPhysicalWoodblock: 'UNADJUDICATED',
      lineageIndependence: 'UNADJUDICATED',
      physicalPrintingIdentityPromoted: false,
      interpretationCountingRuleChanged: false,
      originalPrintWitnessCountIncrement: 0,
      noInstitutionalOutreachRequired: true,
      nextAllowedEvidencePath: 'PUBLIC_SCAN_GLYPH_DAMAGE_FINGERPRINT_ONLY',
    });
    expect(registration.negativeControls).toEqual([
      { comparedWith: 'MAINLAND_NLC_P42', siftRatioAccepted: 57, homographyInliers: 8 },
      { comparedWith: 'MAINLAND_NLC_P44', siftRatioAccepted: 86, homographyInliers: 8 },
      { comparedWith: 'HARVARD_REPRINT_P45', siftRatioAccepted: 22, homographyInliers: 5 },
    ]);
    expect(registration.mainlandOriginalPdfSha256)
      .toBe(printed.printWitnesses[1]?.originalPdfSha256);
    expect(registration.taiwanOriginalPdfSha256)
      .toBe(printed.taiwanWanli1578HourWealthPrintedLocus.originalPdfSha256);
    const chipAudit = printed.publicPrintedGlyphMicrodefectAudit;
    expect(chipAudit).toMatchObject({
      version: 'n27-public-printed-glyph-microdefect-inspection-v1',
      status: 'NO_CERTIFIED_SHARED_UNIQUE_CHIP_WITH_AVAILABLE_PUBLIC_RASTERS',
      mainlandNlcPage: 43,
      taiwan06589Page: 376,
      mainlandFullPageRasterPixels: [850, 726],
      taiwanFullPageRasterPixels: [2600, 1850],
      pairedPrintRoiPixels: {
        mainland: [380, 534],
        taiwan: [932, 1309],
      },
      previouslyConfirmedSiftGlobalInliers: 245,
      inlierCoverageYQuartilesTopToBottom: [68, 26, 95, 56],
      inlierCoverageXQuartilesLeftToRight: [14, 45, 82, 104],
      allFourVerticalAndHorizontalQuartilesHaveInliers: true,
      visualInspectionMethod: 'SOURCE_ROI_HOMOGRAPHY_ALIGNED_STRIPS_AND_THREE_BY_THREE_CELLS',
      pairedCellsReviewed: 9,
      highResolutionOriginalTaiwanInkAndMainlandLowResolutionInkClearlyDiffer: true,
      twSourceContainsAdditionalCircleAnnotations: true,
      tinyChipMayBeLostByMainlandRasterSampling: true,
      independentSameGlyphSharedChipOrCrackCertified: false,
      candidateDamageFeaturesCannotBeSeparatedFromScanOrInkingEffects: true,
      heldoutRefitMayReflectPageWarpOrRepeatedGlyphAmbiguity: true,
      splitInstabilityCannotProveSeparateBlocks: true,
      global245InliersCannotProveIdenticalPhysicalBlock: true,
      exactEngraverOrUniqueCarvedDefect: 'UNADJUDICATED',
      samePhysicalCarvedBlock: 'UNADJUDICATED',
      sourceImageDescentIndependent: 'UNADJUDICATED',
      newTextualWitnessCountIncrement: 0,
      noOffsiteInstitutionalContact: true,
      noHistoricalCountingRuleChanged: true,
      noConsumerPreviewOfficialProductionAdmission: true,
    });
    expect(chipAudit.heldoutHomographyFitsFromSeparateSpatialHalves).toEqual([
      { split: 'UPPER_TO_LOWER', ratioAcceptedTraining: 208, trainingInliers: 138, heldoutCandidates: 198, heldoutWithin3Point5Px: 0 },
      { split: 'LOWER_TO_UPPER', ratioAcceptedTraining: 198, trainingInliers: 172, heldoutCandidates: 208, heldoutWithin3Point5Px: 29 },
      { split: 'LEFT_TO_RIGHT', ratioAcceptedTraining: 141, trainingInliers: 84, heldoutCandidates: 265, heldoutWithin3Point5Px: 113 },
      { split: 'RIGHT_TO_LEFT', ratioAcceptedTraining: 265, trainingInliers: 168, heldoutCandidates: 141, heldoutWithin3Point5Px: 32 },
    ]);
    expect(chipAudit.previouslyConfirmedSiftGlobalInliers)
      .toBe(registration.mainlandP43Taiwan1578P376.homographyInliers);
    const xiji = printed.yuanhaiXijiHourWealthCommentaryCases;
    expect(xiji).toMatchObject({
      status: 'TRANSCRIBED_CLASSICAL_COMMENTARY_WITH_EXPLICIT_NON_VISIBLE_CASE',
      passage: '時上偏財別宮忌見',
      firstSourceAttributedTitle: '淵海子平 卷二 喜忌篇',
      secondSourceAttributedTitle: '神峰通考 喜忌篇',
      firstSourceBookAndChapterNumberingUniversallyStable: false,
      exactIndependentOldPrintSourcesCompared: false,
      twoIndependentlyTransmittedHistoricalAccountsProven: false,
      otherBranchesOrCombinationsCanBeMaterial: true,
      allHiddenStemsAutomaticallyCountAsRecurrenceCertified: false,
      dayBranchIndependentlyIsolatedByExample: false,
      favorableExampleCommanderNameSource1: '都統制',
      favorableExampleCommanderNameSource2: '邵統制',
      nameDiscrepancyVisibleAcrossTranscriptions: true,
      nameDiscrepancyProvesAncientPrintVariant: false,
      narrowEvidenceAgainstStrictVisibleOnlyElsewhere: true,
      automaticAnyHiddenCountRuleAuthorized: false,
      zhengCaiAndPianCaiPoolingAuthorized: false,
      ruleForSeparateDayPalaceAuthorized: false,
      productionOrTrustGrantFromCommentary: false,
      noFreshPrintedWitnessCountIncrement: true,
      remainingBieGongDayPillarScope: 'UNADJUDICATED',
      remainingZaiJianHiddenStemCountingScope: 'UNADJUDICATED',
      remainingYiWeiCountingUnit: 'UNADJUDICATED',
    });
    expect(xiji.primaryTranscriptionSource).toContain('sajumania.com');
    expect(xiji.comparativeTranscriptionSource).toContain('wikisource.org');
    expect(xiji.twoContrastedExamples).toEqual([
      {
        label: 'COMMENTARY_FAVORABLE_HOUR_WEALTH',
        yearPillar: '丁酉',
        monthPillar: '己酉',
        dayPillar: '戊子',
        hourPillar: '壬子',
        dayMaster: '戊',
        hourVisibleIndirectWealthStem: '壬',
        nonHourVisibleIndirectWealthStems: [],
        otherPillarBranchWithHiddenDirectWealth: '日支子藏癸',
        allOtherPillarWealthOfEitherPolarityMustBeAbsent: false,
        commentaryClassification: 'FAVORABLE_EXAMPLE',
        classificationIsNotVerifiedBiographicalOutcome: true,
      },
      {
        label: 'COMMENTARY_OTHER_PALACE_ILLUSTRATION',
        yearPillar: '丁丑',
        monthPillar: '己酉',
        dayPillar: '丁丑',
        hourPillar: '辛亥',
        dayMaster: '丁',
        hourVisibleIndirectWealthStem: '辛',
        nonHourVisibleIndirectWealthStems: [],
        yearBranchHiddenIndirectWealth: '丑藏辛',
        monthBranchHiddenIndirectWealth: '酉藏辛',
        dayBranchHiddenIndirectWealth: '丑藏辛',
        explicitCommentaryTrigger: '月支又酉丑會局，所謂別宮忌見也',
        monthAndChouCombinationClaimInTranscription: true,
        fullThreeBranchMetalCombinationProvedPresent: false,
        individualHiddenStemVersusCombinedBranchCauseSeparable: false,
        dayBranchNecessaryCauseIsolated: false,
        commentaryClassification: 'OTHER_PALACE_CONFLICT_EXAMPLE',
        classificationIsNotVerifiedBiographicalOutcome: true,
      },
    ]);
    const three = printed.threeNonHourPillarsCommentaryScopeAudit;
    expect(three).toMatchObject({
      status: 'ONE_1926_PRINT_WITNESS_CONFIRMS_THREE_PLACES_COUNTING_UNIT_UNDECIDED',
      yuanhaiSourceTitle: '淵海子平 內十八格 時上偏財格',
      yuanhaiTranscribedRule: '只要時上一位，不要多。而三處不要再見財',
      shenfengSourceTitle: '神峰通考 時上偏財格 附月偏財格',
      shenfengTranscribedRule: '只要一位貴，不要多，而三處不要再見財',
      sameShenfengSeparateHourNobleGloss: '若年月日又有，收為辛苦勞碌之命也',
      separateHourNobleGlossIsSevenKillingNotHourWealth: true,
      sameWordsInSeparateRuleNotAutomaticCrossRuleAuthority: true,
      threePlacesCanReferToYearMonthDayPillars: true,
      yearMonthDayAreDistinctFromHourPillar: true,
      explicitlySpecifiesStemAndHiddenStemOccurrenceCounting: false,
      explicitlyDecidesDayBranchAsOneIndependentHiddenRepeat: false,
      commons1926FileDeclaredPages: 167,
      commons1926CatalogPrintedYear: 1926,
      commons1926PrintPdfRetrievedSuccessfully: false,
      commons1926TargetFolioImageDirectlyRead: false,
      independentAncientWoodblockTextVerified: false,
      exactDayPillarScopeHistoricalVerdict: 'UNADJUDICATED',
      exactHiddenStemCountingHistoricalVerdict: 'UNADJUDICATED',
      exactYiWeiUnitHistoricalVerdict: 'UNADJUDICATED',
      printedWitnessIncrement: 1,
      ruleEngineOrConsumerAdmission: false,
      requiresNoInstitutionalContact: true,
    });
    expect(three.shenfeng1926SecondFileDirectPrintedLocus).toMatchObject({
      sourceFile: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001619-43305_神峰通考.pdf',
      publisherAsCataloged: '上海文明書局',
      publicationYearAsCataloged: 1926,
      scanPdfTotalPages: 169,
      earlierDifferentFileHadPages: 167,
      chapterTitlePdfPage: 66,
      supplementAndThreePlacesPdfPage: 67,
      xiwenHeadingAndChartPdfPage: 68,
      originalPrintedFolioNumbers: [6, 7, 8],
      sourceIsPhysicalPrintedScanNotDigitalTranscription: true,
      targetPageDirectlyReadViaPublicPdfRendering: true,
      targetPageViewStatus: 'WEB_PDF_PAGE_SCREENSHOT_DIRECT_VISUAL_READING',
      originalPdfBytesDownloadedLocally: false,
      originalFileSha256Calculated: false,
      printedLocusHasExplicitSupplementHeading: true,
      actualPrintedRuleWithoutModernPunctuation: '只要一位貴不要多而三處不要再見財',
      xiwenHeadingAndChartPrinted: true,
      threePlacesIsExplicitCountOfHiddenStemOccurrences: false,
      dayBranchAloneIndependentlyIsolated: false,
      supplementComposerIdentityCertified: false,
      directReadPrintedWitnessIncrement: 1,
      independentHistoricalTextualLineageCountIncrement: 0,
      sourceStillCannotAuthorizeRecurrenceRule: true,
    });
    expect(three.shenfengXiwenHourMonthClusterCase).toMatchObject({
      evidenceChannel: 'TRANSCRIPTION_PLUS_1926_PRINTED_HEADING_AND_CHART',
      heading: '希文自造時月偏財類聚之格',
      chart: ['己酉', '丙子', '壬寅', '乙巳'],
      dayMaster: '壬',
      monthStemVisiblePianCai: '丙',
      dayBranchHiddenPianCai: '寅藏丙',
      hourBranchHiddenPianCai: '巳藏丙',
      hourStemIsNotPianCai: true,
      sourceSectionHasFavorableClusterWording: true,
      single1926PrintHeadingAndChartRead: true,
      wikiTranscriptionHasPianCaiTypo: '騙財',
      variantCertifiedAsHistoricalPrinting: false,
      caseIsSeparatelyLabeledHourMonthCluster: true,
      doesNotProveUniversalExtraWealthTolerance: true,
      doesNotIsolateDayHiddenStemIndependentEffect: true,
      classicalCountUnitApproved: false,
      transcribedAutobiographicalPassage: '予修淨土人也，亦不事此術，為繼家君之志，而編此書',
      transcribedFinalAttribution: '予據先人成說，更稽先人遺訓',
      sourceNarratorSaysOwnChart: '予命正合書云',
      firstPersonClaimsToCompileFathersWork: true,
      firstPersonAppearsInSameSectionAfterXiwenHeading: true,
      distinctFromFatherIntroducedNanYue: true,
      locCatalogRecordsCompilerSonNamedXiwen: true,
      bibliographicNameAndSelfNarrationConsistent: true,
      namedXiwenBiographicalIdentityIndependentlyAuthenticated: false,
      inferredSonCompilerAttributionIsNotPrintLocusAuthentication: true,
      caseIsIndependentThirdPartyOutcomeEvidence: false,
      caseProvesPureHourOnePositionException: false,
      caseMaySynthesizeEditorsInterpretiveView: true,
      issuerIdentityBeyondHeadingVerified: false,
    });
    expect(three.seventeenthCenturyBibliographicPriorPrintAudit).toMatchObject({
      tohokuCatalogPlace: '江戸',
      tohokuCatalogPublisher: '沢村寛',
      tohokuCatalogYear: 1647,
      tohokuContradictingCatalog: 'https://touda.tohoku.ac.jp/portal/item/10010000025881',
      tohokuContradictingCatalogYear: 1850,
      tohoku1647CatalogRecordId: '10010000025889',
      tohoku1850CatalogRecordId: '10010000025881',
      sharedDepartmentIdInTwoCatalogs: 'TT22201642',
      sharedShelfMarkInTwoCatalogs: '2/3802/6',
      catalogsReferToTwoDistinctPhysicalCopies: 'UNADJUDICATED',
      historicallyCertain1647PrintYear: false,
      tohokuPrintYearResolution: 'CONFLICTING_CATALOG_DATES_NO_PRINT_IMAGE',
      tohokuOriginalVolumes: 6,
      tohokuHolding: '東北大学 狩野文庫',
      tohokuImagesAvailable: false,
      tohokuChapterTwoLocusDirectlyRead: false,
      locImprintPhrase: '文光堂甲午重鐫',
      locQingShunzhiDateEstimated: true,
      locJiaWu1654ConsistentWithinShunzhiInferenceOnly: true,
      locJiaWuActualGregorianYearPrintCertified: false,
      directFolioAgreementWith1926: 'CORE_PHRASE_GLYPHS_MATCH_LOC_JUAN2_IMAGE_8',
      editorialSupplementPresentIn1647: 'UNADJUDICATED',
      printedLocusCountAdded: 1,
      historicalStemCountingAllowed: false,
    });
    expect(three.shenfeng1929UpperVolumeDirectLocus).toMatchObject({
      originalFileSha256: '2e19b8a05fdc4ad204eb4822c3b1ffbb2487dafac707e283c1358845f873c12c',
      originalFileBytes: 7012009,
      originalFilePages: 170,
      acquiredOriginalPdfViaRunner: true,
      verifiedHashAgainstLocalOriginalBytes: true,
      renderedPageNumbers: [66,67,68],
      printedFolioNumbers: [6,7,8],
      page66Section: '時上偏財格 附月偏財格',
      page67AttributionLabel: '補曰',
      page67PrintWithoutAddedPunctuation: '只要一位貴不要多而三處不要再見財',
      page67ExamplesForHourPianCai: ['庚日見甲干或寅支','辛日見乙干或卯支'],
      page68SelfChart: ['己酉','丙子','壬寅','乙巳'],
      printedPage67CorePhraseMatchesRead1926PrintedPage67: true,
      twoHistoricalTextualLineagesIndependentlyCertified: false,
      shenfengSupplementAuthorOrEditionOfOriginIdentified: false,
      provesGeneralHiddenStemCountingMethod: false,
      historicallyAdjudicatesSeparateDayBranchOccurrence: false,
      newlyDirectlyReadPrintedLoci: 1,
      allowsSemanticClaimPromotion: false,
    });
    expect(three.shenfeng1924QiangingtangSellerDatedImprintNonGrant).toMatchObject({
      retrievalArtifactId: 12248510151,
      publicJpegCountAcquired: 4,
      allFourPublicJpegResponseCode: 200,
      sellerClaimsEditionYear: 1924,
      sellerClaimsPhysicalBookCount: 4,
      firstPhotoSha256: '23f63b45dfc6c99564e487e2dfa1b9993fce6b7e65f05236704c76276fa17cbe',
      fourthPhotoSha256: 'c6a4c8418dea4fbec22c88ead3d48c1ba8d9bfafb1b4470554479cef13ac8e96',
      fourthPhotoOriginalPrintedReprintDate: '中華民國十三年重刊',
      year1924DirectlyReadOnPhotographedImprint: true,
      originalTrademarkOnFourthPhoto: '千頃堂書局商標',
      yulgokOfficialPreviewAcquisitionArtifactId: 12236515723,
      yulgokOfficialPhotoShowsSameTradeEmblemDesign: true,
      yulgokOfficialPhotoSameVisiblePrefaceOpening: true,
      dated1924ArcVisibleOnYulgokTrademarkPage: false,
      yulgokPhysicalCopyPrintedIn1924Certified: false,
      twoPhotographedPhysicalCopiesTextualDescentCertified: false,
      sameCarvedOrLithographicPrintingPlateCertified: false,
      newHourWealthSupplementTargetFolioRead: false,
      independentHistoricalTextualLineageCountAdded: 0,
      exactBieGongZaiJianYiWeiMeaning: 'UNADJUDICATED',
      researchClaimsHold: true,
      productionSemanticGrant: false,
    });
    expect(three.shenfeng1926ComplementaryPrintedVolumeBoundary).toMatchObject({
      former167PagePreviewArtifactId: 12245160822,
      former167PageOfficialPreviewImagesAcquired: 7,
      former167PagePdfOriginalBytesAcquired: false,
      former167PagePhysicalPrintedJuanStartsOnPdfPage2: 4,
      former167PagePdfPage2PreviewSha256: '60302a1758d5c368a89c786d1af121f3d8c759627d32a2d8bbcb2a9879a03dbb',
      former167PagePdfPage166PrintedColophonFirstDate: '中華民國十五年一月出版',
      former167PagePdfPage166PrintedColophonReleaseDate: '中華民國十五年一月發行',
      former167PagePdfPage166PreviewSha256: 'aa1f155e8d8ec9fe7128c20fa7187a32e887b4577912b34ad99948d22db3627f',
      prior169PagePreviewArtifactId: 12245355973,
      prior169PageOfficialPreviewImagesAcquired: 8,
      prior169PagePdfPage166EndOfPrintedJuan: 3,
      prior169PagePdfPage166PreviewSha256: '1d6b683036d2635e520002b6203eb981ecea09c7c483c34b9d2784e710809aac',
      adjacentPrintedJuanBoundaryPhysicallyRead: true,
      scansFromDistinctNlcCatalogueIdentifiers: true,
      samePhysicalTwoBookSetCertified: false,
      sharedPublisherAndComplementaryTextualContentsSupported: true,
      corresponding1926And1929Juan4OpeningLayoutLocallySimilar: true,
      completePlateIdentityProven: false,
      newSupplementTargetPrintedLociFromThesePageFrames: 0,
      newIndependentClassicalTextualLineages: 0,
      allFiveClaimDisposition: 'HOLD',
      productionMeaningAdmissionAllowed: false,
    });
    expect(three.shenfeng1929LowerVolumePrintedColophon).toMatchObject({
      acquisitionArtifactId: 12242733882,
      originalPdfBytes: 6708084,
      originalPdfSha256: 'ccb21cf1215a1e487fe79497839f9343534af42a2e3af6c1e7dd04f3faea9289',
      originalPdfPageCount: 168,
      firstPrintedJuanPdfPageOneBased: 3,
      firstPrintedJuan: 4,
      exactPrintedJuanHeading: '神峰通考卷四',
      printedColophonPdfPageOneBased: 167,
      printedInitialEditionText: '中華民國十五年一月初版',
      printedReprintText: '中華民國十八年十二月再版',
      initialEditionYearMonth: '1926-01',
      reprintYearMonth: '1929-12',
      commonsMetadataPublicationYearMonth: '1929-11',
      metadataYearMonthConflictsWithPrintedReprintMonth: true,
      publisherAcknowledges1926FirstAnd1929Reprint: true,
      samePlatesAcross1926And1929Proven: false,
      newHourWealthSupplementPrintedPagesRead: 0,
      newIndependentTextualLineageCount: 0,
      nineteenTwentySixSingle167PagePdfAcquired: false,
      nineteenTwentySixSingle167PageLatestHttpStatus: 429,
      nineteenTwentySixSingle167PageOriginalJuan: 4,
      anyClaimPromotionAuthorized: false,
    });
    expect(three.locEarlyPrintJuanTwoPartialAcquisition).toMatchObject({
      collectionImageCount: 59,
      successfullyRetrievedImages: 25,
      imagesNotRetrieved: 34,
      serviceRateLimitEncountered: true,
      targetHourWealthSupplementFolioCertified: true,
      targetSupplementPhraseVisuallyRead: true,
      targetImageOneBased: 8,
      targetImageBytes: 132360,
      targetImageSha256: 'e4b6771c98c8f9547ab9e3ac531ff8e34bd67eb6e380810843fc4a186e371c08',
      labelOnPrintedPage: '補曰',
      printedUnpunctuatedCoreGlyphs: '只要一位貴不要多而三處不要再見財',
      matches1926And1929AtExactCoreGlyphSequence: true,
      physicallyReadPreviewOfEarlierWoodblockPrint: true,
      additionalMissingOnlyRetrieval: {
        previouslyMissingTargetCount: 34,
        firstRunRecovered: 32,
        laterRecoveredPage: 58,
        laterPage58OfficialImageId: '57b000',
        laterPage58PreviewSha256: '1c8644f44fdb7ceca722651bda6cb851c24fed9442a7e125e6ddccc40c9f1408',
        totalRecoveredOfPreviouslyMissing: 33,
        totalDownloadedPreviewImagesAcrossRuns: 58,
        remainingUnacquiredPageAfterSecondRun: 59,
        page59OfficialMetadataTimedOutInSecondRun: true,
        page59AbsenceOfPrintProven: false,
        targetPhraseWasAlreadyInInitialPage8: true,
        finalOfficialMetadataRecovery: {
          metadataRequestStatus: 'HTTP_200',
          lastOrdinal: 59,
          actualImageId: 'cover2',
          previewBytes: 53722,
          previewSha256: 'c6ee8531aeece3634c181dbf4254fdc9ba28901a6ad9551fc2bc4f892f8e7dc8',
          verifiedJpegDimensions: [764, 736],
          actualImageContent: 'BACK_COVER_WITH_HANDWRITTEN_SHENFENG_TONGKAO_JUAN_2_AND_CONTENT_LABELS',
          recoveredMissingOrdinal: true,
          totalRetrievedOfCatalogued: 59,
          stillUnacquiredCount: 0,
          completeJuanCharacterByCharacterCollation: false,
          newlyReadSupplementLociFromPage59: 0,
          newlyIndependentPrintWitnesses: 0,
        },
      },
      imageNumberIsNotOriginalPrintedFolioNumber: true,
      entireJuanOrEditorialGenealogyCollated: false,
      independentAncientTextualWitnessIncrement: 0,
    });
    expect(three.additional1906KoreanCatalogueLead).toMatchObject({
      publicWorkId: 'G905-9086005',
      sourceLibraryNamed: '국회도서관',
      creationYearListed: 1906,
      pdfFileListed: '新鐫神峰張先生通攷闢謬命理正宗大全.pdf',
      shaoxingCatalogDescribes: '1906 上海書局石印本 2冊',
      koreanPdfOriginalBytesAcquired: false,
      printedSupplementLocusDirectlyRead: false,
      samePhysicalEditionAsShaoxingCatalog: 'UNADJUDICATED',
      independenceFrom1926And1929: 'UNADJUDICATED',
      independentlyCollatedOriginalPassages: 0,
      permitsPromotingAnyClaim: false,
    });
    expect(three.yulgokNationalAcademyTwoSeparateHoldingsLead).toMatchObject({
      sourceInstitution: '율곡연구원 한국학 아카이브',
      provenanceNotSameAsNationalAssemblyPdfVerified: true,
      firstHolding: {
        catalogueId: 'B005_01_B00330_001',
        printedBibliographyId: 'YG015-01-481',
        reportedVolumes: 4,
        volumeMarkers: '1~4',
        physicalFormat: '석인본',
        physicalDimensionCm: '14.9×8.9',
        namedPublisherPresent: false,
        printingYearRecorded: false,
        actualPrintingYear: 'UNADJUDICATED',
      },
      secondHolding: {
        catalogueId: 'B005_01_B00442_001',
        printedBibliographyId: 'YG015-01-490',
        reportedVolumes: 1,
        contentsLabel: '卷1,2',
        publisherAsCataloged: '上海 千頃堂書局',
        physicalFormat: '석인본',
        physicalDimensionCm: '14.9×9.0',
        printingYearRecorded: false,
        actualPrintingYear: 'UNADJUDICATED',
      },
      bothCatalogueUnitsDistinct: true,
      catalogueEditionIdenticalTo1906ShanghaiShuju: 'UNADJUDICATED',
      directImageOfBieGongZaiJianYiWeiSectionRetrieved: false,
      independentStemmaticWitnessIncrement: 0,
      newN27SemanticAuthorization: false,
    });
    expect(three.yulgokPublicViewerDirectPrintedPageAudit).toMatchObject({
      firstHolding: {
        id: 'B005_01_B00330_001',
        actualPreviewFramesDownloaded: 6,
        viewerDeclaredImageFrameCount: 6,
        publisherEmblemOnFrame4Sha256: 'd950e179f55d73339521ede027b1272bcfb3b7018b224407e03ca07a5ac7045b',
        matchingOpeningTextOnFrame5Sha256: 'f2281c68ab8d6d60662e8d282b2aaa6487e2af66ae03eb78b70253cca3cde46d',
        publisherNamedInCatalogue: false,
        publisherEmblemVisuallyPrintedInFrame4: true,
      },
      secondHolding: {
        id: 'B005_01_B00442_001',
        actualPreviewFramesDownloaded: 5,
        viewerDeclaredImageFrameCount: 5,
        publisherEmblemOnFrame3Sha256: '8590df09077da80acbe5170270a290c502b6f4a63ecc32aed584c2aa39b68677',
        matchingOpeningTextOnFrame4Sha256: '945fdb7e191ed2bc36befb58c6274e9f9bb2a1087f11fbd3eaabef90370c3d4e',
        publisherNamedInCatalogue: true,
        publisherEmblemVisuallyPrintedInFrame3: true,
      },
      exactPrintedEmblemReadRightToLeft: '千頃堂書局商標',
      sameLogoAndOpeningLeafPrintedLineArrangementDirectlyCompared: true,
      imagesAreDistinctPhotographsWithDifferentHandAnnotations: true,
      totalOfficialPreviewFramesDownloaded: 11,
      allPreviewImagesHttp200AndHashed: true,
      previewFramesAreSelectiveNotCompleteBook: true,
      hourPianCaiSupplementFolioAmong11Frames: false,
      targetCoreGlyphsVisuallyComparedToLoc1926And1929: false,
      samePrintingSettingHistoricallyCertified: false,
      independentTextualWitnessesAdded: 0,
      yulgokLithographActualPublicationYears: 'UNADJUDICATED',
      permittedClaimPromotions: 0,
      dalian1925Listing: {
        publisher: '上海 大成書局',
        publicationYearListed: 1925,
        pageHtmlBytesDownloaded: 20375,
        pageHtmlSha256: '1095f560df148abfa7dcbfd40e7c2aa638f81d5dd242010c134a92b7b8daa447',
        pdfOrBookScanLinkPresentInCatalogueHtml: false,
        originalPrintedImageRetrieved: false,
        editionIndependentFromYulgok: 'UNADJUDICATED',
      },
    });
    expect(three.yulgokFourBookAllPublicSampleFramesDirectAudit).toMatchObject({
      originalJpegAndProvenanceArtifactId: 12236515723,
      physicalVolumesOfficiallyCatalogued: 4,
      volumeOne: {
        catalogueId: 'B005_01_B00330_001',
        publicImagesRetrieved: 6,
        openingPrintedJuanHeading: '卷之一',
      },
      volumeTwo: {
        catalogueId: 'B005_01_B00330_002',
        publicImagesRetrieved: 5,
        headingEvidenceSha256: '2e9980305b437be5ec33d0d451fa98d77eea528cef80460c493433f5fbf593d6',
        originalPrintedJuanHeading: '卷之二',
      },
      volumeThree: {
        catalogueId: 'B005_01_B00330_003',
        publicImagesRetrieved: 5,
        headingEvidenceSha256: 'f9356e7b87d1dc77a5b5f6817d3b72e915212cbc981359e00cd94a026b3d88be',
        originalPrintedJuanHeading: '卷之三',
      },
      volumeFour: {
        catalogueId: 'B005_01_B00330_004',
        publicImagesRetrieved: 6,
        headingEvidenceSha256: 'a996377e1debd30d58e5018eca1ee2df7f9a428936d6a347144d3df58831d24f',
        originalPrintedJuanHeading: '卷之四',
      },
      openPreviewImagesForFourPhysicalBooksTotal: 22,
      newlyDownloadedOfficialPublicPreviewFramesBeyondEarlierVolumeOne: 16,
      separatelyCataloguedAnotherYulgokQianqingtangVolume1And2SampleFrames: 5,
      allKnownYulgokPublicSampleFramesAcrossTwoHoldings: 27,
      publicPreviewFrameLinksComeFromActualOfficialHtmlImgItems: true,
      originalsForAllFourVolumesPhysicallyCompared: true,
      laterUnshownContentsOfFourPhysicalBooksCanContainOtherJuan: 'UNADJUDICATED',
      entireFourBookEditionIsFourTextualJuan: 'UNADJUDICATED',
      actualPrintedPublisherMarkObservedOnFirstVolume: '千頃堂書局商標',
      physicalPrintingYearForThisFourBookCopy: 'UNADJUDICATED',
      exactHourWealthSupplementInAnyNewPublicPreview: false,
      newSupplementDirectPrintedGlyphLociFromTheseSixteenFrames: 0,
      newIndependentlyProvenStemmaticWitnessCount: 0,
      explicitAncientCalculationSemanticAuthorizations: 0,
      allN27ClaimsMustStayHold: true,
    });
    expect(three.nationalLibraryChina1936CopperplateDirectSupplementCollation).toMatchObject({
      sourceInstitutionAsCatalogued: '中国国家图书馆',
      physicalOwnershipMarkPrintedOnScannedPage2: '上海圖書館藏書',
      physicalOwnershipMarkAlsoOnScannedPage3: true,
      cataloguedSourceVsScannedCopyMarkRelationship: 'UNADJUDICATED',
      publicationDateAsCatalogued: '1936-03',
      editorPublisherAsCatalogued: '星命學社重校 / 星命學社',
      artifactId: 12233639543,
      originalPdfHttp200Acquired: true,
      originalPdfFileBytes: 11739726,
      originalPdfSha256: '2b4eabf3c1732f5bcb7adf964ed8fe0bc9191523fdc3e5c92f5c1aa4057eced7',
      originalPdfPageCount: 220,
      printedSupplementPrecisePdfPageOneBased: 43,
      printedSupplementOriginalJuan: 2,
      originalPrintedPageNumber: 37,
      printedSupplementLocusHeading: '補曰',
      printedTargetLeadIn: '時上偏財者如庚日見甲干或寅支辛日見乙干或卯支之類',
      exactCoreOriginalGlyphsDirectlyRead: '只要一位貴不要多而三處不要再見財',
      coreGlyphsMatchLocEarlyAnd1926And1929: true,
      directNewPrintedTargetLocusReadIncrement: 1,
      printingPlatesIndependentFromEarlierEditions: 'UNADJUDICATED',
      independentStemmaticWitnessIncrement: 0,
      printingYearFromThisPhysicalColophonDirectlyRead: true,
      originalPrintedCopyrightColophonPdfPageOneBased: 219,
      printedColophonDateReadRightToLeft: '民國二十五年三月',
      printedColophonPublisher: '星命學社',
      printedColophonReeditor: '星命學社',
      printedColophonSalesAgent: '鴻文書局',
      colophonDate1936MatchesCommons1936March: true,
      full1936VolumeTextCharacterByCharacterCollated: false,
      permitsHistoricalCountingSemanticsAdjudication: false,
      permitsAnyN27ClaimPromotion: false,
    });
    expect(three.commercial1906PublicPreviewKoreanLibraryProvenanceLead).toMatchObject({
      acquisitionArtifactId: 12234568000,
      publiclyLinkedJpegPreviewCount: 11,
      successfullyFetchedPublicPreviewJpegCount: 11,
      allElevenJpegSha256Recorded: true,
      exampleCoverSha256: '701b096014e30c0d74164f020671ce52113dd20c1464186a017c3589476750d5',
      koreanNationalAssemblyLibraryProvenanceMarkVisibleOnCover: true,
      visibleAcquisitionNumber: '130903',
      visibleStampDate: '1970-05-06',
      stampDateNotHistoricalPrintPublicationYear: true,
      cataloguedKoreanGonguSourceAlsoNamesNationalAssemblyLibrary: true,
      sellerPreviewPhysicalCopySameAsGongu1906File: 'UNADJUDICATED',
      sellerClaimsGuangxuBingwu1906WithoutDirectColophonRead: true,
      allAvailableSamplesVisuallyInspectedForTargetSupplement: true,
      originalHourWealthSupplementAmongPublicPreviews: false,
      restrictedFullPdfPurchasedOrRetrieved: false,
      independentlyReadOriginal1906PrintedTargetLoci: 0,
      permitsAdditionalAncientStemmaticVote: false,
    });
    expect(three.korean1906OfficialViewerPublicAcquisitionAudit).toMatchObject({
      catalogueWorkId: 'G905-9086005',
      sourceAccessArtifactId: 12232929247,
      publicAcquisitionStatus: 'HTTP_400_REQUEST_BLOCKED_ALL_3',
      requests: [
        { target: 'official-catalogue', httpStatus: 400, bodyTitle: 'Request Blocked' },
        { target: 'official-viewer-iframe', httpStatus: 400, bodyTitle: 'Request Blocked' },
        { target: 'official-generic-viewer', httpStatus: 400, bodyTitle: 'Request Blocked' },
      ],
      publicPdfBytesRetrieved: false,
      htmlContentOfTargetViewerRead: false,
      independentOfficialPrintedImageRead: false,
      requestWasUnauthenticatedAndRespectedAccessControls: true,
      denialMustNotBeInterpretedAsNoPdfOrNoSupplementInBook: true,
      sameEditionAs1906ShaoxingAndDalian: 'UNADJUDICATED',
      original1906SupplementFoliosCollated: 0,
      newAncientTextualWitnessCount: 0,
      semanticRulePromotions: 0,
    });
    expect(three.qianqingtang1924ScholarshipAndOtherLithographCatalogues).toMatchObject({
      koreanScholarlyPaper: {
        author: '김만태',
        journal: '東洋學 第67輯',
        publishedYear: 2017,
        citedPrintedPage: 173,
        footnoteNumber: 20,
        reportedEditionTitle: '神峰闢謬命理正宗',
        reportedPublisher: '上海 千頃堂書局',
        bibliographicPrintYearAsReported: 1924,
        reportedJuanCount: 4,
        paperQuotesPublisherYearFromBibliographicListNotOriginalColophon: true,
        original1924ColophonDirectlyRead: false,
        yulgokFirstHoldingFourPhysicalBooksMustNotEqualFourTextualJuanByDefault: true,
        yulgokPhysicalCopyPrinted1924: 'UNADJUDICATED',
      },
      dalianPublicCatalogue1920: {
        title: '(神峰闢謬)命理正宗',
        publisher: '上海 校經山房',
        dateAsCataloged: 1920,
        printingMethod: '石印本',
        textualJuanCount: 4,
        physicalBookCount: 4,
        actualPrintedTargetLocusAcquired: false,
        historicallyIndependentEditionFrom1924Qianqingtang: 'UNADJUDICATED',
      },
      guangxuBingwu1906CommercialDigitalFacsimileLead: {
        listedScanPageCount: 316,
        listedFileSizeMegabytes: 143,
        siteListsPaidResourceOnly: true,
        originalSixJuanPdfDownloaded: false,
        supplementalFolioTextRead: false,
        sameMaterialObjectAsKorean1906PublicRecord: 'UNADJUDICATED',
        evidenceLimitedToCommercialSellerListing: true,
        noPurchaseOrInstitutionContactMade: true,
      },
      sourceCountWithDirectlyNewPrintedSupplementLocus: 0,
      physicalEditionDatesNewlyCertifiedFromColophons: 0,
      independentOriginalTextualWitnessesNewlyCertified: 0,
      letsAnyN27ClaimLeaveHold: false,
    });
    expect(three.republican1929TwoVolumeBindingAudit).toMatchObject({
      printDate: '1929-11',
      collator: '秦慎安',
      upperPdfPages: 170,
      upperContainsOriginalJuanOneToThreeAccordingToSecondaryFacsimileGuide: true,
      locationOfHourWealthChapterInOriginalText: '卷二',
      upperVolumeOnlyIsFirstTargetForFindingSupplement: true,
      secondaryMirrorClaims338FacsimilePages: true,
      secondaryMirrorSameCatalogCopiesNotThirdHistoricalEdition: true,
      actualUpperPageContainingSupplementVerified: true,
      lowerPdfPages: 168,
      sameTwoVolumePublication: true,
      volumesNotIndependentTextualVotes: true,
      exactSupplementLeafLocatedInEitherVolume: true,
      originalPdfScreenshotFetchFailed: true,
      claimedNewVisualPrintWitnesses: 1,
      independentlyCertifiedVariantReadings: 0,
      yearMonthDayAndHiddenStemSemanticsStillUndecided: true,
    });
    expect(three.alternativeRepublicanPrintCatalogue).toMatchObject({
      catalogedPrintYear: 1929,
      catalogedVol: '第1卷',
      pdfPages: 170,
      exactHourWealthSectionPresentInImageConfirmed: false,
      directImageRead: false,
      independentTextualDescentQualified: false,
    });
    expect(three.locShenfengEarlyPrintedCandidate).toMatchObject({
      estimatedPrintDate: '清順治間[1638–1661]',
      editionSummaryLinesPerPage: 11,
      editionSummaryCharactersPerLine: 22,
      juanTwoDigitalImagesCataloged: true,
      exactHourWealthFolioInspected: true,
      manuscriptOrHistoricalTextVerified: true,
      printLineageIndependence: 'UNADJUDICATED',
      incrementOfDirectReadPrintedWitnesses: 1,
      specificPrintingDateEstablishedByImage: false,
      supplementAuthorIdentifiedByImage: false,
    });
    expect(three.shenfengStemVsBranchHourExamples).toEqual([
      '庚日見甲干或寅支',
      '辛日見乙干或卯支',
    ]);
    expect(three.internalYuanhaiCaseWithVisibleElsewherePianCai).toMatchObject({
      pillars: ['乙酉','乙卯','辛卯','辛卯'],
      dayMaster: '辛',
      hourPillarBranchHidesPianCai: '時支卯藏乙',
      yearVisiblePianCaiStem: '乙',
      monthVisiblePianCaiStem: '乙',
      dayBranchAlsoHidesPianCai: '日支卯藏乙',
      passageCommentsOnRepeatedStemsAndBranches: true,
      listedAsChartNotAutomaticFavorableHourWealth: true,
      exactPrintedReadingVerified: false,
      limitsAnyUniversalAbsoluteNoOtherCaiRule: true,
    });
    expect(three.separateYuanhaiListedCaseWithHiddenYearPianCai).toMatchObject({
      pillars: ['庚寅','乙酉','甲子','戊辰'],
      dayMaster: '甲',
      hourVisiblePianCai: '戊',
      yearBranchHiddenPianCai: '寅藏戊',
      sourceExplicitlyTestsHiddenYearAsRuleException: false,
    });
    expect(three.yuanhaiPublicTranscription).toContain('sajumania.com');
    expect(three.shenfengPublicTranscription).toContain('sajumania.com');
    expect(three.commons1926ScanCatalogue).toContain('commons.wikimedia.org');
    expect(printed.harvardVolumeOneOriginalPrefaceRead).toMatchObject({
      sourceId: 'HARVARD_DRS_53262215_VOL_1_PREFACE',
      sameHarvardDrsAsPreviouslyReadVolumeFive: true,
      titlePage: 2,
      recoveredLiFamilyBlocksAndSupplementPassagePage: 4,
      datedPrefaceSignaturePage: 6,
      prefaceTitle: '補刻三命通會敘',
      recoveredWoodblocksStoredInLiFamily: true,
      reportedMissingDamagedSections: true,
      describesCorrectionAndSupplementation: true,
      prefatoryDate: '雍正乙卯花朝',
      prefatorySigner: '蔣國祥',
      publicationYearNotProvenByPrefaceAlone: true,
      historicalLiBlockIsExactTaiwan1578Block: 'UNADJUDICATED',
      harvardVolumeFiveSharesExactSameCarvedBlockAsVolumeOne: 'UNADJUDICATED',
      restoredBlocksRequireTreatingWitnessesAsPotentiallyDependent: true,
    });
    expect(printed.harvardVolumeOneOriginalPrefaceRead.page4RasterSha256)
      .toBe('1688ee1e45b94b9afbeb91d35dfe39416c53768e7ed9a3606e2b7a517751f17b');
    expect(printed.taiwanWanli1578HourWealthPrintedLocus.page376RasterSha256)
      .toBe('f43b34d006ba75a50179fc04bdcd377301bc9b25caf7cc4adc0146c8a82121e8');
    expect(printed.taiwanWanli1578HourWealthPrintedLocus.originalPdfSha256)
      .toBe(printed.taiwanWanli1578ZhengGuanPrintedLocus.originalPdfSha256);
    const bibliography = printed.bibliographicWitnessRelation;
    expect(bibliography.status)
      .toBe('DIFFERENT_PRINT_FORMATS_SUPPORTED_TEXTUAL_LINEAGE_UNRESOLVED');
    expect(bibliography.harvard).toMatchObject({
      holding: 'HARVARD_YENCHING',
      publicationYearApproximate: 1735,
      publicationYearIsQuestionMarked: true,
      printedLinesPerHalfLeaf: 10,
      printedCharactersPerLine: 20,
      catalogSaysSupplementedWoodblockEdition: true,
    });
    expect(bibliography.nlc).toMatchObject({
      holding: 'NATIONAL_LIBRARY_OF_CHINA',
      dateRangeStart: 1573,
      dateRangeEnd: 1620,
      exactImprintYearWithinRangeKnown: false,
      printedLinesPerHalfLeaf: 10,
      printedCharactersPerLine: 22,
      goodBookNumber: '17605',
    });
    expect(bibliography.harvard.catalogUri).toContain('Harvard_drs_53262215');
    expect(bibliography.nlc.catalogUri).toContain('NLC892-411999029701-67240');
    expect(bibliography.differentHoldingInstitutions).toBe(true);
    expect(bibliography.differentSourcePdfHashes).toBe(true);
    expect(bibliography.catalogedCharacterCountsDiffer).toBe(true);
    expect(bibliography.distinctPrintedLayoutsSupportedByCatalog).toBe(true);
    expect(bibliography.woodblockTextualDescentAnalyzed).toBe(false);
    expect(bibliography.copiesAreIndependentTextualTraditions).toBe('UNADJUDICATED');
    expect(bibliography.laterHarvardEditionCopiedEarlierNlcEdition).toBe('UNADJUDICATED');
    expect(bibliography.agreementsAreTwoTextuallyIndependentVotes).toBe(false);
    expect(bibliography.externalMing1578LibraryCatalogIsThisNlcCopy).toBe(false);
    expect(bibliography.bibliographicMetadataCannotAuthorizeClassicalCounting).toBe(true);
    expect(printed.directlyCertifiedHourWealthBieGongIncludesDay).toBe(false);
    expect(printed.directlyCertifiedHourWealthZaiJianIncludesHidden).toBe(false);
    expect(printed.directlyCertifiedClassicalYiWeiCountingUnit).toBe(false);
    expect(printed.crossGenreRuleTransferAuthorized).toBe(false);
    expect(x.provenance.hourWealthExplicitAnalogyTarget).toBe('時上偏官');
    expect(x.provenance.zhengGuanIsNotHourWealthExplicitAnalogyTarget).toBe(true);
  });

  it('v3 date controls change scope sensitivity but never authorize classical conclusion', () => {
    const make = (month: number, day: number) => buildGeneralNatalN27WuJiRecurrenceScopeAudit(
      calculateAuthorizedMyeonghwaProductionSnapshot({
        calendarType: 'solar', date: { year: 2010, month, day },
        time: { known: true, hour: 19, minute: 30 },
        sexForTraditionalCalculation: 'unspecified',
      }, { now: NOW }).snapshot,
    );
    const visibleWu = make(2, 13);
    const hiddenOnly = make(5, 4);
    expect(visibleWu.actualObservationChannels.otherPillarVisibleWu).toBe(1);
    expect(visibleWu.actualObservationChannels.otherPillarVisibleJi).toBe(0);
    expect(hiddenOnly.actualObservationChannels.otherPillarVisibleWu).toBe(0);
    expect(hiddenOnly.actualObservationChannels.otherPillarVisibleJi).toBe(0);
    const visibleHiddenFromWu =
      visibleWu.otherPillarUnitAudit.palaceAndChannelCounterfactuals;
    const visibleHiddenFromHiddenOnly =
      hiddenOnly.otherPillarUnitAudit.palaceAndChannelCounterfactuals;
    expect(visibleHiddenFromWu[0]?.observedOccurrenceCount).toBeGreaterThan(0);
    expect(visibleHiddenFromHiddenOnly[0]?.observedOccurrenceCount).toBe(0);
    expect(visibleHiddenFromHiddenOnly[3]?.observedOccurrenceCount).toBeGreaterThan(0);
    for (const audit of [visibleWu, hiddenOnly]) {
      expect(audit.otherPillarUnitAudit.palaceAndChannelCounterfactuals.every(
        (m) => m.classicalWeiCountAuthorized === false
      )).toBe(true);
      expect(audit.sourceQualifiedRecurrenceVerdict).toBe('UNADJUDICATED');
      expect(audit.sourceQualifiedSingletonVerdict).toBe('UNADJUDICATED');
      expect(audit.consumerClaimEligible).toBe(false);
      expect(audit.productionAuthorized).toBe(false);
    }
  });

  it('v3 same other pillars on 07:30/19:30 imply identical lattice, not identical hour reference', () => {
    const a = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(7));
    const b = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    expect(a.otherPillarUnitAudit.palaceAndChannelCounterfactuals).toEqual(
      b.otherPillarUnitAudit.palaceAndChannelCounterfactuals,
    );
    expect(a.otherPillarUnitAudit.crossChannelDuplicatePillarGlyphs).toEqual(
      b.otherPillarUnitAudit.crossChannelDuplicatePillarGlyphs,
    );
    expect(a.otherPillarUnitAudit.hourReference.hourVisibleWu).toBe(true);
    expect(b.otherPillarUnitAudit.hourReference.hourVisibleWu).toBe(false);
    expect(a.otherPillarUnitAudit.hourReference.includedInOtherPillarOccurrenceCount)
      .toBe(false);
    expect(b.otherPillarUnitAudit.hourReference.includedInOtherPillarOccurrenceCount)
      .toBe(false);
  });

});
