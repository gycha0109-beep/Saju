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
    expect(x.version).toBe('saju-n27-wu-ji-recurrence-scope-sensitivity-v11');
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
