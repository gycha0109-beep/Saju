import { describe, expect, it } from 'vitest';
import {
  buildGeneralNatalN27ClaimScopedBridgeHold,
} from '../src/research/general-natal-p0-n27-claim-scoped-bridge-hold.js';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import {
  buildGeneralNatalBridgeReentryReadiness,
  collectGeneralNatalBridgeReentryEvidence,
  evaluateGeneralNatalBridgeReentryReadiness,
} from '../src/research/general-natal-source-bounded-bridge-reentry-readiness.js';
import {
  requirePreviewSemanticAdmissionV1,
} from '../src/preview/preview-semantic-admission.js';

describe('P0-NATAL N27 Claim-scoped Bridge hold (read-only)', () => {
  it('binds existing content-addressed source-bounded review and 5 claim decisions', () => {
    const review = buildGeneralNatalN27ClaimScopedBridgeHold();
    expect(review.issue).toBe(2557);
    expect(review.bindingFresh).toBe(true);
    expect(review.candidateDisposition).toBe('RETURN_TO_RESEARCH');
    expect(review.researchHeadReviewed).toBe('b7d64f58d0f84f9f1e8d1393ca4dac31bc6e4b2a');
    expect(review.targetClaims.map((x) => x.claimType)).toEqual([
      'GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE',
      'TEN_GOD_OFFICER_VISIBLE_STEMS_THEME',
      'TEN_GOD_OFFICER_BRANCHES_THEME',
      'GENERAL_NATAL_OFFICER_VISIBLE_STEMS_THEME',
      'GENERAL_NATAL_OFFICER_BRANCHES_THEME',
    ]);
    expect(review.targetClaims.every((x) =>
      x.sourceRuleId !== null &&
      x.observedStatus === 'research' &&
      x.observedProvenance === 'secondary_only' &&
      x.observedReviewerStatus === 'unreviewed' &&
      x.sourceIds.length > 0
    )).toBe(true);
    expect(review.decisionHash).toMatch(/^[a-f0-9]{64}$/);
    expect(buildGeneralNatalN27ClaimScopedBridgeHold().decisionHash).toBe(review.decisionHash);
  });

  it('preserves exact 겁재 restriction; does not create a rival 比肩 relationship', () => {
    const rule = GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.find((x) =>
      x.output.claimType === 'GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE'
    );
    expect(rule?.output.value).toMatchObject({
      exactTenGodConstraint: '겁재',
      consumerProjectionAuthorized: false,
    });
    expect(rule?.status).toBe('research');
    const review = buildGeneralNatalN27ClaimScopedBridgeHold();
    expect(review.candidateBijeonWealthRuleExistsInThisReview).toBe(false);
    expect(review.adjudication2010).toBe('METHODOLOGY_CONFLICT');
    expect(review.distinctConsumerMeaningApproved).toBe(0);
    expect(review.sourceLocatorCaveat).toContain('以下內容與書不合');
    expect(review.sourceLocatorCaveat).toContain('CADAL06056481 image page 104');
    expect(review.sourceLocatorCaveat).toContain('SiKu Wikisource editable volume five reads 戊巳');
    expect(review.verifiedOnlineSiKuVolumeFiveLocator).toBe(true);
    expect(review.siKuVolumeFiveDirectlyLocatedSections).toEqual([
      '論正財', '論偏財', '時上偏財',
    ]);
    expect(review.twoIndependentPhysicalWitnessesVerified).toBe(false);
    expect(review.availableOriginalScanCandidates).toEqual([
      'CADAL06056481', 'CADAL06066041',
    ]);
    expect(review.printedTargetFoliosDirectlyInspected).toBe(true);
    expect(review.targetPrintingsInspected).toBe(3);
    expect(review.siKuPhysicalPrintedTargetFolioInspected).toBe(true);
    expect(review.actualPrintedFolioMarksRead).toBe(false);
    expect(review.totalDirectPrintedSourceReadings).toBe(3);
    expect(review.printedGlyphAgreementFromThreeSources).toBe('戊己');
    expect(review.siKuWikisourceDigitalTranscriptionConflictAtThisLocus).toBe(true);
    expect(review.printedSourcesNotYetTextuallyIndependentQualified).toBe(true);
    expect(review.nlcUpperPrintedSource).toMatchObject({
      pdfPageOneBased: 43,
      printedClause: '柱中不宜再見戊己',
      printedCharacter: '己',
      originalPdfSha256: '0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1',
      artifactId: 12103659191,
      historicalEditionIndependenceQualified: false,
    });
    expect(review.siKuPrintedSource).toMatchObject({
      djvuPageOneBased: 104,
      printedClause: '柱中不宜再見戊己',
      printedCharacter: '己',
      scannedDjvuSha256: '4f273322b3fd4339789e1408e0bbb4ea15a7956e5e508c6f99fced264e0b53ee',
      knownJiSiPrintCalibrationPage: 106,
      artifactId: 12103971835,
      historicalEditionIndependenceQualified: false,
    });
    expect(review.visuallyInspectedHarvardPrintedWitnessCount).toBe(1);
    expect(review.sourceIntegrityOverallQualified).toBe(false);
    expect(review.harvardPrintedWitness).toMatchObject({
      sourceId: 'HARVARD_DRS_53262215_VOL_5',
      directPageImageRead: true,
      pdfPageOneBased: 45,
      clause: '柱中不宜再見戊己',
      printedGlyph: '己',
      originalPdfSha256: 'ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831',
      fullPageHighResSha256: 'b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12',
      cropSha256: 'fc3063d2608720b13cfca0f7e43e89f3a898aca38d3810de290b835f600e5582',
      printedFolioMarkUnread: true,
      independentSiKuPhysicalOriginalRead: false,
    });
    expect(review.reproducibleManualPrintInspectionScript).toBe(
      'scripts/research/inspect-n27-volume-five-print.mjs',
    );
    expect(review.originalPdfSha256ComputedInCurrentRun).toBe(false);
    expect(review.targetPageImagesRenderedFromAuthenticSourceInCurrentRun).toBe(false);
    expect(review.scriptSelfTestDoesNotAuthenticateOriginalReading).toBe(true);
    expect(review.distinctCataloguedPrintLeadGroups).toEqual([
      'HARVARD_1735_CATALOGUE',
      'NLC_411999029701_ENGRAVED_EDITION',
    ]);
    expect(review.additionalPrintSourceIds).toEqual([
      'HARVARD_DRS_53262215_VOL_5',
      'NLC_411999029701_VOL_5_UPPER',
      'NLC_411999029701_VOL_5_LOWER',
    ]);
    expect(review.printLeadGroupCountIsNotAuthenticatedWitnessCount).toBe(true);
    expect(review.authenticatedPrintReadingsOfTargetPassage).toBe(0);
    expect(review.unresolvedSiKuPrintGlyphVariant).toEqual({
      siKuWikisourceFive: '戊巳',
      shiDianGuJiFive: '戊己',
      generalWikisourceSix: '戊己',
      printGlyphResolved: false,
      independentAuthenticatedWitnessCount: 0,
    });
    expect(review.real2010ChartOtherPillarJiAndHiddenWuAreStructuralObservationsOnly).toBe(true);
    expect(review.twoScansDemonstratedToBeIndependentEditions).toBe(false);
    expect(review.n27SourceClauseConditionMatrix).toMatchObject({
      version: 'saju-n27-hour-wealth-source-condition-matrix-v2',
      sourcePath: 'src/research/general-natal-p0-n27-hour-wealth-condition-matrix.ts',
      evaluatedAgainstActualCanonical2010: true,
      testedHourCases: ['05:30', '19:30', 'UNKNOWN'],
      bothHourExamplesCheckedAgainstRealCanonicalSnapshots: true,
      jiaWuChen07HourVisibleWu: true,
      jiaJiaXu19HourHiddenWu: true,
      sameOtherThreePillarsInBothCases: true,
      exposedStemOnlyFilterWouldDropThePrintedJiaXuExample: true,
      otherPalaceVisibleAndHiddenScopeStillUnadjudicated: true,
      hour19HiddenWuNotVisibleWu: true,
      yearVisibleJiIsJiaRegularWealth: true,
      classicalPalaceAndSingletonInterpretationAdjudicated: false,
      chartStrengthAuthorized: false,
      newInterpretationClaimAuthorized: false,
    });
    expect(review.n27SourceClauseConditionMatrix.independentClauseScopes).toHaveLength(7);
    expect(review.n27WuJiRecurrenceScopeSensitivity).toMatchObject({
      version: 'saju-n27-wu-ji-recurrence-scope-sensitivity-v11',
      path: 'src/research/general-natal-p0-n27-wu-ji-recurrence-scope-audit.ts',
      sameReal2010WuChenAndJiaXuNonHourPillars: true,
      testedTimeCases: ['07:30', '19:30', '05:30', 'UNKNOWN'],
      visibleWuOnlyWouldMissPrintedJi: true,
      actualYearVisibleJiRegularWealthOnJiaDay: true,
      recurrenceCountingScopeMethodApproved: false,
      classicalWeiCountingMethodApproved: false,
      interpretationsInferred: false,
      admitsNewClaim: false,
    });
    expect(review.n27WuJiRecurrenceScopeSensitivity.counterfactualScopeKeys).toHaveLength(4);
    expect(review.n27WuJiRecurrenceScopeSensitivity).toMatchObject({
      additionalActualCanonicalControlDates: [
        '2010-02-13T19:30', '2010-05-04T19:30', '2010-02-04T19:30',
      ],
      distinctCountingUnits: [
        'OCCURRENCE_PER_CHANNEL_GLYPH', 'DISTINCT_OTHER_PILLAR',
        'DISTINCT_WU_JI_GLYPH', 'YEAR_MONTH_ONLY_VS_DAY_INCLUDED',
        'BOTH_CHANNELS_SAME_PILLAR', 'HOUR_REFERENCE_EXCLUDED',
      ],
      samePillarTwoChannelsAreNotProvenTwoClassicalWei: true,
      dayPillarWithinBieGongNotSourceAdjudicated: true,
      noHiddenStemGeneralizationAuthorized: true,
      sameVolumeZhengGuanPrintedCrosscheck: {
        status: 'TWO_PRINT_SCAN_WITNESSES_PASSAGE_DIRECTLY_READ',
        exactSourceChapter: '三命通會 卷五 論正官',
        sourceHoldingIds: [
          'HARVARD_DRS_53262215_VOL_5',
          'NLC_411999029701_VOL_5_UPPER',
        ],
        harvardPdfPages: [6, 7],
        nlcPdfPages: [5, 6],
        mainPrintedPhrase: '支藏干透餘位不宜再見',
        printedBranchExample: '甲生丑月內有辛金又值酉時',
        additionalStemPhrase: '若天干復透辛多',
        printLineageIndependenceCertified: false,
        harvardVolumeOnePrefaceDirectEvidence: {
          originalHolding: 'HARVARD_DRS_53262215_VOL_1_PREFACE',
          sameDrsAsHourWealthVolumeFive: true,
          originalPdfPages: [2, 4, 6],
          originalPrefaceDate: '雍正乙卯花朝',
          signer: '蔣國祥',
          printedWoodblockRecoveryAndRepairDescribed: true,
          harvardSameHoldingPrefaceConfirmed: true,
          linkToExactTaiwan1578WoodblocksProven: false,
          prefaceFixesVolumeFivePrintYear: false,
        },
        taiwanWanli1578ThirdZhengGuanPrintEvidence: {
          sourceId: 'TAIWAN_NCL_06589_1578',
          catalogedYear: 1578,
          volumeFiveStartsPdfPage: 337,
          zhengGuanHeadingPdfPage: 340,
          hiddenXinThenYouHourExamplePdfPage: 341,
          branchExample: '甲生丑月內有辛金又值酉時',
          textualLineageIndependentFromMainlandNlc: false,
          countingTransferToHourWealthAuthorized: false,
        },
        taiwanWanli1578PrintedHourWealthClause: {
          sourceId: 'TAIWAN_NCL_06589_1578',
          originalPdfSha256: '3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd',
          hourWealthHeadingPdfPage: 375,
          exactGlyphPdfPage: 376,
          directlyPrintedClause: '柱中不宜再見戊己',
          printedGlyph: '己',
          previouslyReadHarvardCadalMainlandNlcConcur: true,
          totalDirectPrintedHoldingGroups: 4,
          fourIndependentStemmaticVotesLicensed: false,
          historicalZaiJianScopeAdjudicated: false,
          historicalBieGongScopeAdjudicated: false,
          historicalYiWeiCountAdjudicated: false,
          anyClaimPromotionAuthorized: false,
        },
        hourWealthLocalLeafCollation: {
          researchVersion: 'n27-harvard-taiwan-local-leaf-collation-v1',
          status: 'SAMPLED_PHRASE_AGREEMENT_ONLY',
          harvardPdfPage: 45,
          taiwanPdfPages: [375, 376],
          matchedPhraseCount: 5,
          matchRequiresNoFullTextOrIndependentLineageAssumption: true,
          harvardCharactersPerLine: 20,
          taiwanCharactersPerLine: 22,
          samePhysicalPrintedSettingSupported: false,
          exactLocusEngraverRead: false,
          exactLeafRecarvingCertified: false,
          independentTransmissionCertified: false,
          noOtherVariantsInChapterCertified: false,
          dayPillarBieGongRuleAdjudicated: false,
          hiddenStemZaiJianRuleAdjudicated: false,
          historicYiWeiCountingUnitAdjudicated: false,
          consumerOrProductionAdmission: false,
        },
        taiwanCopy06590AccessHold: {
          status: 'CATALOG_CONFIRMED_ORIGINAL_SCAN_NOT_ACCESSED',
          accessionNumber: '06590',
          existingPrintedWitness: '06589',
          catalogsAreSeparate: true,
          catalogedMing1578TenLinesTwentyTwoCharacters: true,
          originalImagesReviewed: false,
          plateEngraverOrStrokeDamageCompared: false,
          printWitnessCountIncrement: 0,
          sameBlockAs06589: 'UNADJUDICATED',
          independentTextualDescent: 'UNADJUDICATED',
          libraryPermissionOrOnsiteInspectionNeeded: true,
          claimOrProductionPromotionAllowed: false,
        },
        mainlandNlcTaiwan06589LeafAlignmentHold: {
          status: 'SIDE_BY_SIDE_COLUMN_ALIGNMENT_OBSERVED_NO_WOODBLOCK_VERDICT',
          mainlandPdfPage: 43,
          taiwanPdfPage: 376,
          sameCataloged10x22: true,
          visuallySimilarFirstColumns: true,
          exactSharedWoodblockMicrodefectsConfirmed: false,
          leafEngraverNameAtBothLociRead: false,
          circlesOrAnnotationsNotCertifiedAsOriginalTextVariants: true,
          sameBlock: 'UNADJUDICATED',
          genealogicalIndependence: 'UNADJUDICATED',
          noChangeToRecurrenceRules: true,
        },
        mainlandNlcTaiwan06589FeatureRegistrationHold: {
          status: 'STRONG_SPATIAL_REGISTRATION_NO_POSITIVE_SHARED_BLOCK_DEFECT',
          mainlandPdfPage: 43,
          taiwanPdfPage: 376,
          method: 'OpenCV_SIFT_BF_KNN_RANSAC_HOMOGRAPHY',
          comparedPageSiftRatioMatches: 406,
          comparedPageHomographyInliers: 245,
          controlInliers: [8, 8, 5],
          positiveUniqueWoodblockChipMatchRead: false,
          scannedImageDerivationIndependentCertified: false,
          physicalSameWoodblock: 'UNADJUDICATED',
          twoIndependentTextualVotes: false,
          originalPrintWitnessCountIncrement: 0,
          anyConsumerOrClassicalRulePromotion: false,
          noInstitutionalMailOrPermissionDependency: true,
        },
        publicPrintedGlyphMicrodefectHold: {
          researchVersion: 'n27-public-printed-glyph-microdefect-inspection-v1',
          status: 'NO_CERTIFIED_SHARED_UNIQUE_CHIP_WITH_AVAILABLE_PUBLIC_RASTERS',
          inspectedPublicPrintCellPairs: 9,
          previouslyConfirmedGlobalSiftInliers: 245,
          yQuartileInlierCoverage: [68, 26, 95, 56],
          xQuartileInlierCoverage: [14, 45, 82, 104],
          spatialRefitHeldoutInliers: [0, 29, 113, 32],
          originalNlcPageRasterPixels: [850, 726],
          originalTaiwanPageRasterPixels: [2600, 1850],
          sourceStrokeLossIndependentlyVerified: false,
          sameCarvedPhysicalBlock: 'UNADJUDICATED',
          independentTextualLineage: 'UNADJUDICATED',
          newPrintedWitnesses: 0,
          noInstitutionContact: true,
          noRulePromotion: true,
          noTrustGrantPreviewOfficialProduction: true,
        },
        yuanhaiXijiCaseHypothesisHold: {
          evidenceClass: 'SECONDARY_PUBLIC_TRANSCRIPTION_OF_CLASSICAL_COMMENTARY',
          primaryTextSource: 'https://sajumania.com/ebook/to01-06/to01-06-02-01.htm',
          comparativeTextSource: 'https://zh.wikisource.org/zh-hant/神峰通考',
          twoIndependentPhysicalPrintedSourcesRead: false,
          favorableCase: ['丁酉', '己酉', '戊子', '壬子'],
          negativeOtherPalaceCase: ['丁丑', '己酉', '丁丑', '辛亥'],
          favorableDayBranchHidesZhengCai: true,
          negativeHasNoExtraVisiblePianCaiStem: true,
          negativeYearMonthDayBranchesContainHiddenPianCai: true,
          negativeExplicitYouChouAssociation: true,
          evidenceAgainstStrictExtraVisibleStemOnly: true,
          evidenceAgainstPoolingAllWealthStemsAndHidden: true,
          independentDayBranchCausalityEstablished: false,
          anyHiddenStemRecurrenceIsAutomaticViolationEstablished: false,
          exactYiWeiCountUnitEstablished: false,
          crossTranscriptionCommanderNameDisagreement: true,
          commanderNameDisagreementCertifiedPrintVariant: false,
          newAncientTextualWitnesses: 0,
          semanticEngineAdmission: false,
          allExistingClaimsStayHold: true,
        },
        bibliographicRelation: {
          classification: 'DISTINCT_CATALOGED_PRINT_LAYOUTS_NOT_INDEPENDENT_TEXTUAL_VOTES',
          harvardPrintedLines: 10,
          harvardPrintedCharactersPerLine: 20,
          harvardQingYongzheng1735DateIsUncertain: true,
          nlcPrintedLines: 10,
          nlcPrintedCharactersPerLine: 22,
          nlcMingWanliDateRange: [1573, 1620],
          nlcExactPrintingYearEstablished: false,
          separateHoldingAndPrintedSettingSupported: true,
          sharedSourceFamilyAdjudicated: false,
          independenceOfTextualTransmissionCertified: false,
          agreementAsTwoIndependentVotesAuthorized: false,
          Taiwan1578CatalogIsSameNlcCopyVerified: false,
          bibliographicDetailsPromoteAnyClaim: false,
        },
        hourWealthExplicitAnalogyTarget: '時上偏官',
        zhengGuanCanAuthorizeHourWealthCounting: false,
        disputedYiJiSiNearZhongFanCertified: false,
        classicalBieGongZaiJianYiWeiAdjudicated: false,
      },
      palaceAndChannelCounterfactualKeys: [
        'YEAR_MONTH_VISIBLE', 'YEAR_MONTH_DAY_VISIBLE',
        'YEAR_MONTH_VISIBLE_HIDDEN', 'YEAR_MONTH_DAY_VISIBLE_HIDDEN',
      ],
      actual2010JiaXuScopeLatticeExpectedRawOccurrences: [1, 1, 3, 4],
      actual2010JiaXuScopeLatticeExpectedDistinctPillarGlyphs: [1, 1, 2, 3],
      yearPillarVisibleAndHiddenJiAreSamePillarGlyph: true,
      countsAreCounterfactualAndNotClassicalWei: true,
      otherDayPillarBieGongSemanticsEstablished: false,
      sameVolumeZhengGuanAnalogy: {
        chapter: '三命通會 卷五 論正官',
        hiddenBranchRecurrencePhrase: '甲生丑月內有辛金又值酉時',
        additionalVisibleStemPhrase: '若天干復透辛多',
        evidenceChannel: 'DIGITAL_TRANSCRIPTION_WITH_TWO_PRINT_SCAN_LOCI',
        qualifiedForHourWealthRuleTransfer: false,
      },
      sameVolumeOfficerAnalogy: {
        chapter: '三命通會 卷五 時上一位貴',
        distinctFromHourWealth: true,
        quotedOtherPillars: '年月日重見',
        directAuthorizationToApplyToHourWealth: false,
      },
      recurrenceCountingScopeMethodApproved: false,
      classicalWeiCountingMethodApproved: false,
      interpretationsInferred: false,
      admitsNewClaim: false,
    });
    expect(review.finalWangShuaiAndQiangRuoVerdictAuthorized).toBe(false);
    expect(review.classicalSingleWealthLocationProven).toBe(false);
    expect(review.generalCopyVolumeSixHasDiscrepantEditorialWarning).toBe(true);
  });

  it('keeps each claim/observation/qualifier blocked and existing Preview authorization unchanged', () => {
    const review = buildGeneralNatalN27ClaimScopedBridgeHold();
    expect(review.explicitPreviewAdmissionPresent).toBe(false);
    expect(review.targetClaims.every((x) =>
      x.disposition === 'hold' &&
      !x.mayCreateClaim &&
      !x.mayExposeObservation &&
      !x.mayExposeQualifier &&
      !x.mayAffectProduction
    )).toBe(true);
    expect(() => requirePreviewSemanticAdmissionV1(
      'GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY', 'general:natal'
    )).toThrow(/not admitted/);
    expect(review.reviewerAttestationCreated).toBe(false);
    expect(review.reviewerTrustGrantCreated).toBe(false);
    expect(review.previewAuthorityExpanded).toBe(false);
    expect(review.officialReadingAuthorityExpanded).toBe(false);
    expect(review.engineAuthorityPromoted).toBe(false);
    expect(review.productionAuthorized).toBe(false);
    expect(review.researchFreezePreserved).toBe(true);
  });

  it('requires existing governed reentry after exact candidate hash drift', () => {
    const base = collectGeneralNatalBridgeReentryEvidence();
    const changed = {
      ...base,
      candidateSurface: {
        ...base.candidateSurface,
        rules: base.candidateSurface.rules.map((r, i) =>
          i === 0 ? { ...r, contentHash: 'f'.repeat(64) } : r
        ),
      },
    };
    expect(buildGeneralNatalBridgeReentryReadiness().nextDisposition).toBe('RETURN_TO_RESEARCH');
    const reevaluated = evaluateGeneralNatalBridgeReentryReadiness(changed);
    expect(reevaluated.candidateBindingFresh).toBe(false);
    expect(reevaluated.nextDisposition).toBe('FRESH_REVIEW_SURFACE_REQUIRED');
    expect(reevaluated.authorityBoundary.productionAdmissionAuthority).toBe(false);
  });
});
