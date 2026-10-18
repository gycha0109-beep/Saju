/**
 * N27 scoped Research -> Bridge return. Read-only decision evidence, not an
 * admission authority, rule registry, consumer projection, or review attestation.
 */
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY,
  GENERAL_NATAL_SOURCE_BOUNDED_PACK,
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
} from './general-natal-conclusion-source-bounded-candidate.js';
import {
  GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  GENERAL_NATAL_USEFUL_T8_RULES,
} from './general-natal-useful-reading-candidate.js';
import { buildGeneralNatalSourceBoundedAuthorityBridgeReview } from './general-natal-source-bounded-authority-bridge-review.js';
import {
  GENERAL_NATAL_BRIDGE_REENTRY_BASELINE,
  buildGeneralNatalBridgeReentryReadiness,
} from './general-natal-source-bounded-bridge-reentry-readiness.js';
import { buildGeneralNatalSourceBoundedReviewSubjectManifest } from './general-natal-source-bounded-review-subject-manifest.js';
import { createPreviewSemanticAdmissionRegistryV1 } from '../preview/preview-semantic-admission.js';

export const GENERAL_NATAL_N27_CLAIM_BRIDGE_HOLD_VERSION =
  'saju-n27-claim-scoped-bridge-hold-v1' as const;

const PEER_WEALTH_RULE_ID =
  'RULE-GENERAL-NATAL-SOURCE-BOUNDED-PEER-TO-WEALTH-ADVERSE' as const;
const EXPECTED_PEER_WEALTH_RULE_HASH =
  '0fd69bb361ddcf9babd78b3238f9fe51dcda9dcbc1ee34f58654d8002aef2238' as const;
const TARGET_CLAIM_TYPES = Object.freeze([
  'GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE',
  'TEN_GOD_OFFICER_VISIBLE_STEMS_THEME',
  'TEN_GOD_OFFICER_BRANCHES_THEME',
  'GENERAL_NATAL_OFFICER_VISIBLE_STEMS_THEME',
  'GENERAL_NATAL_OFFICER_BRANCHES_THEME',
] as const);

export function buildGeneralNatalN27ClaimScopedBridgeHold() {
  const existingBridge = buildGeneralNatalSourceBoundedAuthorityBridgeReview();
  const reentry = buildGeneralNatalBridgeReentryReadiness();
  const manifest = buildGeneralNatalSourceBoundedReviewSubjectManifest();
  const preview = createPreviewSemanticAdmissionRegistryV1();
  const peerRule = GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.find(
    (rule) => rule.ruleId === PEER_WEALTH_RULE_ID,
  );
  const subject = manifest.subjects.find(
    (item) => item.subjectType === 'rule' && item.subjectRef.id === PEER_WEALTH_RULE_ID,
  );
  const officers = [
    ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
    ...GENERAL_NATAL_USEFUL_T8_RULES,
  ].filter((rule) =>
    TARGET_CLAIM_TYPES.slice(1).includes(
      rule.output.claimType as (typeof TARGET_CLAIM_TYPES)[number],
    ),
  );

  const baselineBound =
    reentry.candidateBindingFresh &&
    reentry.observedCandidateSurfaceHash ===
      GENERAL_NATAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash &&
    subject?.subjectRef.contentHash === EXPECTED_PEER_WEALTH_RULE_HASH &&
    peerRule?.version === '0.2.0-research' &&
    peerRule?.output.claimType === TARGET_CLAIM_TYPES[0] &&
    peerRule?.quality.provenanceQuality === 'secondary_only' &&
    peerRule?.quality.reviewerStatus === 'unreviewed' &&
    peerRule?.status === 'research' &&
    GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY.status === 'research' &&
    GENERAL_NATAL_SOURCE_BOUNDED_PACK.status === 'research' &&
    officers.length === 4 &&
    officers.every((rule) =>
      rule.version === GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION &&
      rule.status === 'research' &&
      rule.quality.provenanceQuality === 'secondary_only' &&
      rule.quality.reviewerStatus === 'unreviewed'
    );

  // The current Preview registry admits research IDs, not arbitrary claimType
  // strings. Do not interpret a missing entry as universal negative evidence.
  const relevantResearchIds = Object.freeze([
    'GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY',
    'GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY',
    'GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY',
  ] as const);
  const explicitPreviewAdmissionPresent = preview.entries.some((item) =>
    relevantResearchIds.includes(
      item.researchRef.researchId as (typeof relevantResearchIds)[number],
    ),
  );
  const consumerEligible = false as const;
  const candidateDisposition = baselineBound &&
    existingBridge.decision.disposition === 'RETURN_TO_RESEARCH' &&
    !reentry.bridgeReentryReady &&
    !explicitPreviewAdmissionPresent
    ? 'RETURN_TO_RESEARCH'
    : 'FRESH_GOVERNED_REVIEW_REQUIRED';

  const reviewed = Object.freeze(TARGET_CLAIM_TYPES.map((claimType) => {
    const isPeerWealth = claimType === TARGET_CLAIM_TYPES[0];
    const rule = isPeerWealth
      ? peerRule
      : officers.find((candidate) => candidate.output.claimType === claimType);
    return Object.freeze({
      claimType,
      sourceRuleId: rule?.ruleId ?? null,
      sourceRuleVersion: rule?.version ?? null,
      sourceIds: Object.freeze((rule?.sourceRefs ?? []).map((source) => source.sourceId)),
      observedStatus: rule?.status ?? 'missing',
      observedProvenance: rule?.quality.provenanceQuality ?? 'missing',
      observedReviewerStatus: rule?.quality.reviewerStatus ?? 'missing',
      requestedSection: 'general:natal' as const,
      disposition: 'hold' as const,
      mayCreateClaim: consumerEligible,
      mayExposeObservation: consumerEligible,
      mayExposeQualifier: consumerEligible,
      mayAffectProduction: consumerEligible,
      blocker: isPeerWealth
        ? 'EXACT_GYEOPJAE_T8_RUNTIME_IS_NOT_HISTORICAL_BIJEON_EXCLUSION_OR_SOURCE_INTEGRITY' as const
        : 'OFFICER_CHANNEL_AND_JEONG_PYEON_SUBTYPE_NOT_INDEPENDENTLY_SOURCE_ADMITTED' as const,
    });
  }));

  const material = Object.freeze({
    version: GENERAL_NATAL_N27_CLAIM_BRIDGE_HOLD_VERSION,
    issue: 2557 as const,
    researchPr: 2553 as const,
    researchHeadReviewed: 'f106da36055a5141ecde4c53fbbcae12662524c3' as const,
    researchPrMergedAtReview: false as const,
    researchScope: 'RESEARCH_ONLY_2010_ACTUAL_N13_T8_1_VS_0' as const,
    parentBridgeReviewId: existingBridge.reviewId,
    existingBridgeDisposition: existingBridge.decision.disposition,
    reviewSubjectManifestHash: manifest.manifestHash,
    expectedCandidateSurfaceHash: GENERAL_NATAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash,
    observedCandidateSurfaceHash: reentry.observedCandidateSurfaceHash,
    bindingFresh: baselineBound,
    sourceIntegrityReady: reentry.sourceIntegrity.ready,
    bridgeReentryReady: reentry.bridgeReentryReady,
    explicitPreviewAdmissionPresent,
    previewRegistryHash: preview.registryHash,
    candidateDisposition,
    adjudication2010: 'METHODOLOGY_CONFLICT' as const,
    distinctConsumerMeaningApproved: 0 as const,
    targetClaims: reviewed,
    candidateBijeonWealthRuleExistsInThisReview: false as const,
    sourceLocatorCaveat:
      '三命通會 卷五 printed original scans directly locate 時上偏財 in Harvard page 45, SiKu CADAL06056481 image page 104, NLC engraved upper volume page 43; all three read 戊己. SiKu Wikisource editable volume five reads 戊巳 and conflicts with the inspected SiKu image. General 卷六 warns （以下內容與書不合）. Print stemma independence, original folio numbering, classical singleton/strength inference and reviewer authority remain unverified.',
    verifiedOnlineSiKuVolumeFiveLocator: true as const,
    siKuVolumeFiveDigitalSource:
      'https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05' as const,
    siKuVolumeFiveDirectlyLocatedSections: Object.freeze(
      ['論正財', '論偏財', '時上偏財'] as const,
    ),
    generalCopyVolumeSixHasDiscrepantEditorialWarning: true as const,
    twoIndependentPhysicalWitnessesVerified: false as const,
    availableOriginalScanCandidates: Object.freeze([
      'CADAL06056481',
      'CADAL06066041',
    ] as const),
    unresolvedSiKuPrintGlyphVariant: Object.freeze({
      siKuWikisourceFive: '戊巳' as const,
      shiDianGuJiFive: '戊己' as const,
      generalWikisourceSix: '戊己' as const,
      printGlyphResolved: false as const,
      independentAuthenticatedWitnessCount: 0 as const,
    }),
    real2010ChartOtherPillarJiAndHiddenWuAreStructuralObservationsOnly: true as const,
    distinctCataloguedPrintLeadGroups: Object.freeze([
      'HARVARD_1735_CATALOGUE',
      'NLC_411999029701_ENGRAVED_EDITION',
    ] as const),
    additionalPrintSourceIds: Object.freeze([
      'HARVARD_DRS_53262215_VOL_5',
      'NLC_411999029701_VOL_5_UPPER',
      'NLC_411999029701_VOL_5_LOWER',
    ] as const),
    printLeadGroupCountIsNotAuthenticatedWitnessCount: true as const,
    authenticatedPrintReadingsOfTargetPassage: 0 as const,
    visuallyInspectedHarvardPrintedWitnessCount: 1 as const,
    totalDirectPrintedSourceReadings: 3 as const,
    nlcUpperPrintedSource: Object.freeze({
      sourceId: 'NLC_411999029701_VOL_5_UPPER' as const,
      pdfPageOneBased: 43 as const,
      printedClause: '柱中不宜再見戊己' as const,
      printedCharacter: '己' as const,
      originalPdfSha256:
        '0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1' as const,
      pageImageSha256:
        '7f9b25f6c420044e5edc3d55f12dbb66b779a552b8181adfbc0deae8dfe5f005' as const,
      acquisitionRunId: 39041195684 as const,
      artifactId: 12103659191 as const,
      historicalEditionIndependenceQualified: false as const,
    }),
    siKuPrintedSource: Object.freeze({
      sourceId: 'CADAL06056481' as const,
      djvuPageOneBased: 104 as const,
      printedClause: '柱中不宜再見戊己' as const,
      printedCharacter: '己' as const,
      scannedDjvuSha256:
        '4f273322b3fd4339789e1408e0bbb4ea15a7956e5e508c6f99fced264e0b53ee' as const,
      page104ImageSha256:
        'e20a1ce67daac2fc30eb914e8288d85f41cf2ab0ec14ba3156e630c2d5a91ac4' as const,
      knownJiSiPrintCalibrationPage: 106 as const,
      acquisitionRunId: 39041195684 as const,
      artifactId: 12103971835 as const,
      historicalEditionIndependenceQualified: false as const,
    }),
    printedGlyphAgreementFromThreeSources: '戊己' as const,
    siKuWikisourceDigitalTranscriptionConflictAtThisLocus: true as const,
    printedSourcesNotYetTextuallyIndependentQualified: true as const,
    harvardPrintedWitness: Object.freeze({
      sourceId: 'HARVARD_DRS_53262215_VOL_5' as const,
      directPageImageRead: true as const,
      pdfPageOneBased: 45 as const,
      clause: '柱中不宜再見戊己' as const,
      printedGlyph: '己' as const,
      originalPdfSha256:
        'ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831' as const,
      fullPageHighResSha256:
        'b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12' as const,
      cropSha256:
        'fc3063d2608720b13cfca0f7e43e89f3a898aca38d3810de290b835f600e5582' as const,
      printedFolioMarkUnread: true as const,
      independentSiKuPhysicalOriginalRead: false as const,
    }),
    sourceIntegrityOverallQualified: false as const,
    reproducibleManualPrintInspectionScript:
      'scripts/research/inspect-n27-volume-five-print.mjs' as const,
    originalPdfSha256ComputedInCurrentRun: false as const,
    targetPageImagesRenderedFromAuthenticSourceInCurrentRun: false as const,
    scriptSelfTestDoesNotAuthenticateOriginalReading: true as const,
    printedTargetFoliosDirectlyInspected: true as const,
    targetPrintingsInspected: 3 as const,
    siKuPhysicalPrintedTargetFolioInspected: true as const,
    actualPrintedFolioMarksRead: false as const,
    twoScansDemonstratedToBeIndependentEditions: false as const,
    n27SourceClauseConditionMatrix: Object.freeze({
      version: 'saju-n27-hour-wealth-source-condition-matrix-v2' as const,
      sourcePath: 'src/research/general-natal-p0-n27-hour-wealth-condition-matrix.ts' as const,
      evaluatedAgainstActualCanonical2010: true as const,
      testedHourCases: Object.freeze(['05:30', '19:30', 'UNKNOWN'] as const),
      independentClauseScopes: Object.freeze([
        'JIA_XU_HOUR_EXAMPLE', 'OTHER_PALACE_EXCLUSION',
        'NO_ADDITIONAL_WU_JI', 'ONLY_ONE_POSITION',
        'VISIBLE_VS_HIDDEN_PRIORITY', 'STRENGTH_OFFICER_SEAL_AND_BREAK',
        'PEER_TERM_NOT_EXACT_T8',
      ] as const),
      bothHourExamplesCheckedAgainstRealCanonicalSnapshots: true as const,
      jiaWuChen07HourVisibleWu: true as const,
      jiaJiaXu19HourHiddenWu: true as const,
      sameOtherThreePillarsInBothCases: true as const,
      exposedStemOnlyFilterWouldDropThePrintedJiaXuExample: true as const,
      otherPalaceVisibleAndHiddenScopeStillUnadjudicated: true as const,
      hour19HiddenWuNotVisibleWu: true as const,
      yearVisibleJiIsJiaRegularWealth: true as const,
      classicalPalaceAndSingletonInterpretationAdjudicated: false as const,
      chartStrengthAuthorized: false as const,
      newInterpretationClaimAuthorized: false as const,
    }),
    n27WuJiRecurrenceScopeSensitivity: Object.freeze({
      version: 'saju-n27-wu-ji-recurrence-scope-sensitivity-v9' as const,
      path: 'src/research/general-natal-p0-n27-wu-ji-recurrence-scope-audit.ts' as const,
      sameReal2010WuChenAndJiaXuNonHourPillars: true as const,
      testedTimeCases: Object.freeze(['07:30', '19:30', '05:30', 'UNKNOWN'] as const),
      counterfactualScopeKeys: Object.freeze([
        'VISIBLE_WU_ONLY', 'VISIBLE_WU_AND_JI',
        'VISIBLE_AND_HIDDEN_WU_ONLY', 'VISIBLE_AND_HIDDEN_WU_AND_JI',
      ] as const),
      additionalActualCanonicalControlDates: Object.freeze([
        '2010-02-13T19:30', '2010-05-04T19:30', '2010-02-04T19:30',
      ] as const),
      controlDesign: 'VISIBLE_JI_ONLY_VS_VISIBLE_WU_ONLY_VS_HIDDEN_ONLY_AND_NON_JIA' as const,
      visibleWuOnlyWouldMissPrintedJi: true as const,
      distinctCountingUnits: Object.freeze([
        'OCCURRENCE_PER_CHANNEL_GLYPH',
        'DISTINCT_OTHER_PILLAR',
        'DISTINCT_WU_JI_GLYPH',
        'YEAR_MONTH_ONLY_VS_DAY_INCLUDED',
        'BOTH_CHANNELS_SAME_PILLAR',
        'HOUR_REFERENCE_EXCLUDED',
      ] as const),
      samePillarTwoChannelsAreNotProvenTwoClassicalWei: true as const,
      dayPillarWithinBieGongNotSourceAdjudicated: true as const,
      noHiddenStemGeneralizationAuthorized: true as const,
      sameVolumeOfficerAnalogy: Object.freeze({
        chapter: '三命通會 卷五 時上一位貴' as const,
        distinctFromHourWealth: true as const,
        quotedOtherPillars: '年月日重見' as const,
        directAuthorizationToApplyToHourWealth: false as const,
      }),

      palaceAndChannelCounterfactualKeys: Object.freeze([
        'YEAR_MONTH_VISIBLE', 'YEAR_MONTH_DAY_VISIBLE',
        'YEAR_MONTH_VISIBLE_HIDDEN', 'YEAR_MONTH_DAY_VISIBLE_HIDDEN',
      ] as const),
      actual2010JiaXuScopeLatticeExpectedRawOccurrences: Object.freeze([
        1, 1, 3, 4,
      ] as const),
      actual2010JiaXuScopeLatticeExpectedDistinctPillarGlyphs: Object.freeze([
        1, 1, 2, 3,
      ] as const),
      yearPillarVisibleAndHiddenJiAreSamePillarGlyph: true as const,
      countsAreCounterfactualAndNotClassicalWei: true as const,
      otherDayPillarBieGongSemanticsEstablished: false as const,
      sameVolumeZhengGuanAnalogy: Object.freeze({
        chapter: '三命通會 卷五 論正官' as const,
        hiddenBranchRecurrencePhrase: '甲生丑月內有辛金又值酉時' as const,
        additionalVisibleStemPhrase: '若天干復透辛多' as const,
        evidenceChannel: 'DIGITAL_TRANSCRIPTION_WITH_TWO_PRINT_SCAN_LOCI' as const,
        qualifiedForHourWealthRuleTransfer: false as const,
      }),

      sameVolumeZhengGuanPrintedCrosscheck: Object.freeze({
        status: 'TWO_PRINT_SCAN_WITNESSES_PASSAGE_DIRECTLY_READ' as const,
        exactSourceChapter: '三命通會 卷五 論正官' as const,
        sourceHoldingIds: Object.freeze([
          'HARVARD_DRS_53262215_VOL_5',
          'NLC_411999029701_VOL_5_UPPER',
        ] as const),
        harvardPdfPages: Object.freeze([6, 7] as const),
        nlcPdfPages: Object.freeze([5, 6] as const),
        mainPrintedPhrase: '支藏干透餘位不宜再見' as const,
        printedBranchExample: '甲生丑月內有辛金又值酉時' as const,
        additionalStemPhrase: '若天干復透辛多' as const,
        printLineageIndependenceCertified: false as const,
        harvardVolumeOnePrefaceDirectEvidence: Object.freeze({
          originalHolding: 'HARVARD_DRS_53262215_VOL_1_PREFACE' as const,
          sameDrsAsHourWealthVolumeFive: true as const,
          originalPdfPages: Object.freeze([2, 4, 6] as const),
          originalPrefaceDate: '雍正乙卯花朝' as const,
          signer: '蔣國祥' as const,
          printedWoodblockRecoveryAndRepairDescribed: true as const,
          harvardSameHoldingPrefaceConfirmed: true as const,
          linkToExactTaiwan1578WoodblocksProven: false as const,
          prefaceFixesVolumeFivePrintYear: false as const,
        }),
        taiwanWanli1578ThirdZhengGuanPrintEvidence: Object.freeze({
          sourceId: 'TAIWAN_NCL_06589_1578' as const,
          catalogedYear: 1578 as const,
          volumeFiveStartsPdfPage: 337 as const,
          zhengGuanHeadingPdfPage: 340 as const,
          hiddenXinThenYouHourExamplePdfPage: 341 as const,
          branchExample: '甲生丑月內有辛金又值酉時' as const,
          textualLineageIndependentFromMainlandNlc: false as const,
          countingTransferToHourWealthAuthorized: false as const,
        }),
        taiwanWanli1578PrintedHourWealthClause: Object.freeze({
          sourceId: 'TAIWAN_NCL_06589_1578' as const,
          originalPdfSha256: '3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd' as const,
          hourWealthHeadingPdfPage: 375 as const,
          exactGlyphPdfPage: 376 as const,
          directlyPrintedClause: '柱中不宜再見戊己' as const,
          printedGlyph: '己' as const,
          previouslyReadHarvardCadalMainlandNlcConcur: true as const,
          totalDirectPrintedHoldingGroups: 4 as const,
          fourIndependentStemmaticVotesLicensed: false as const,
          historicalZaiJianScopeAdjudicated: false as const,
          historicalBieGongScopeAdjudicated: false as const,
          historicalYiWeiCountAdjudicated: false as const,
          anyClaimPromotionAuthorized: false as const,
        }),
        // At the exact 時上偏財 locus, a few physical phrases align while
        // the print setting and textual genealogy remain distinct questions.
        hourWealthLocalLeafCollation: Object.freeze({
          researchVersion: 'n27-harvard-taiwan-local-leaf-collation-v1' as const,
          status: 'SAMPLED_PHRASE_AGREEMENT_ONLY' as const,
          harvardPdfPage: 45 as const,
          taiwanPdfPages: Object.freeze([375, 376] as const),
          matchedPhraseCount: 5 as const,
          matchRequiresNoFullTextOrIndependentLineageAssumption: true as const,
          harvardCharactersPerLine: 20 as const,
          taiwanCharactersPerLine: 22 as const,
          samePhysicalPrintedSettingSupported: false as const,
          exactLocusEngraverRead: false as const,
          exactLeafRecarvingCertified: false as const,
          independentTransmissionCertified: false as const,
          noOtherVariantsInChapterCertified: false as const,
          dayPillarBieGongRuleAdjudicated: false as const,
          hiddenStemZaiJianRuleAdjudicated: false as const,
          historicYiWeiCountingUnitAdjudicated: false as const,
          consumerOrProductionAdmission: false as const,
        }),
        taiwanCopy06590AccessHold: Object.freeze({
          status: 'CATALOG_CONFIRMED_ORIGINAL_SCAN_NOT_ACCESSED' as const,
          accessionNumber: '06590' as const,
          existingPrintedWitness: '06589' as const,
          catalogsAreSeparate: true as const,
          catalogedMing1578TenLinesTwentyTwoCharacters: true as const,
          originalImagesReviewed: false as const,
          plateEngraverOrStrokeDamageCompared: false as const,
          printWitnessCountIncrement: 0 as const,
          sameBlockAs06589: 'UNADJUDICATED' as const,
          independentTextualDescent: 'UNADJUDICATED' as const,
          libraryPermissionOrOnsiteInspectionNeeded: true as const,
          claimOrProductionPromotionAllowed: false as const,
        }),
        mainlandNlcTaiwan06589LeafAlignmentHold: Object.freeze({
          status: 'SIDE_BY_SIDE_COLUMN_ALIGNMENT_OBSERVED_NO_WOODBLOCK_VERDICT' as const,
          mainlandPdfPage: 43 as const,
          taiwanPdfPage: 376 as const,
          sameCataloged10x22: true as const,
          visuallySimilarFirstColumns: true as const,
          exactSharedWoodblockMicrodefectsConfirmed: false as const,
          leafEngraverNameAtBothLociRead: false as const,
          circlesOrAnnotationsNotCertifiedAsOriginalTextVariants: true as const,
          sameBlock: 'UNADJUDICATED' as const,
          genealogicalIndependence: 'UNADJUDICATED' as const,
          noChangeToRecurrenceRules: true as const,
        }),
        mainlandNlcTaiwan06589FeatureRegistrationHold: Object.freeze({
          status: 'STRONG_SPATIAL_REGISTRATION_NO_POSITIVE_SHARED_BLOCK_DEFECT' as const,
          mainlandPdfPage: 43 as const,
          taiwanPdfPage: 376 as const,
          method: 'OpenCV_SIFT_BF_KNN_RANSAC_HOMOGRAPHY' as const,
          comparedPageSiftRatioMatches: 406 as const,
          comparedPageHomographyInliers: 245 as const,
          controlInliers: Object.freeze([8, 8, 5] as const),
          positiveUniqueWoodblockChipMatchRead: false as const,
          scannedImageDerivationIndependentCertified: false as const,
          physicalSameWoodblock: 'UNADJUDICATED' as const,
          twoIndependentTextualVotes: false as const,
          originalPrintWitnessCountIncrement: 0 as const,
          anyConsumerOrClassicalRulePromotion: false as const,
          noInstitutionalMailOrPermissionDependency: true as const,
        }),
        bibliographicRelation: Object.freeze({
          classification: 'DISTINCT_CATALOGED_PRINT_LAYOUTS_NOT_INDEPENDENT_TEXTUAL_VOTES' as const,
          harvardPrintedLines: 10 as const,
          harvardPrintedCharactersPerLine: 20 as const,
          harvardQingYongzheng1735DateIsUncertain: true as const,
          nlcPrintedLines: 10 as const,
          nlcPrintedCharactersPerLine: 22 as const,
          nlcMingWanliDateRange: Object.freeze([1573, 1620] as const),
          nlcExactPrintingYearEstablished: false as const,
          separateHoldingAndPrintedSettingSupported: true as const,
          sharedSourceFamilyAdjudicated: false as const,
          independenceOfTextualTransmissionCertified: false as const,
          agreementAsTwoIndependentVotesAuthorized: false as const,
          Taiwan1578CatalogIsSameNlcCopyVerified: false as const,
          bibliographicDetailsPromoteAnyClaim: false as const,
        }),
        hourWealthExplicitAnalogyTarget: '時上偏官' as const,
        zhengGuanCanAuthorizeHourWealthCounting: false as const,
        disputedYiJiSiNearZhongFanCertified: false as const,
        classicalBieGongZaiJianYiWeiAdjudicated: false as const,
      }),
      actualYearVisibleJiRegularWealthOnJiaDay: true as const,
      recurrenceCountingScopeMethodApproved: false as const,
      classicalWeiCountingMethodApproved: false as const,
      interpretationsInferred: false as const,
      admitsNewClaim: false as const,
    }),
    finalWangShuaiAndQiangRuoVerdictAuthorized: false as const,
    classicalSingleWealthLocationProven: false as const,
    independentPrintReviewCompleted: false as const,
    reviewerAttestationCreated: false as const,
    reviewerTrustGrantCreated: false as const,
    previewAuthorityExpanded: false as const,
    officialReadingAuthorityExpanded: false as const,
    engineAuthorityPromoted: false as const,
    productionAuthorized: false as const,
    researchFreezePreserved: true as const,
    nextOwners: Object.freeze({
      research: 'Repair witness identity, trace passages to physically checked edition, establish month/strength/正偏財 conditions and counterexamples',
      bridge: 'Re-run existing #1447/#1482 review against fresh exact subject hashes; independently attest per Claim and decide scope',
      engine: 'Keep actual 2010 N13 1-vs-0 research shadow and N15 overclaim regression; no 比肩→財 rule or consumer text without approval',
    }),
  });
  return Object.freeze({
    ...material,
    decisionHash: deterministicContentHash(material),
  });
}
