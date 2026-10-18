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
  'saju-n27-wu-ji-recurrence-scope-sensitivity-v9' as const;

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
  // Count the same physical glyph-at-pillar once when it appears through both
  // an exposed stem and a hidden stem. This is a counterfactual accounting
  // unit, NOT proof that the classical 位 is a stem+pillar pair.
  const crossChannelDuplicatePillarGlyphs = Object.freeze(
    otherPillarPositions.filter((p) => p.channel === 'visible_stem' &&
      otherPillarPositions.some((q) =>
        q.slot === p.slot && q.glyph === p.glyph && q.channel === 'hidden_stem'
      )).map((p) => Object.freeze({ slot: p.slot, glyph: p.glyph })),
  );
  // Separate two unrelated open questions:
  //  (a) does 別宮 reach 日柱, and
  //  (b) do hidden stem occurrences count as 再見?
  // A third dimension is purely about how to deduplicate repeated channel
  // observations inside the same pillar, not a historical "位" decision.
  const palaceAndChannelCounterfactuals = Object.freeze([
    { key: 'YEAR_MONTH_VISIBLE' as const, includeDayPillar: false, includeHiddenStems: false },
    { key: 'YEAR_MONTH_DAY_VISIBLE' as const, includeDayPillar: true, includeHiddenStems: false },
    { key: 'YEAR_MONTH_VISIBLE_HIDDEN' as const, includeDayPillar: false, includeHiddenStems: true },
    { key: 'YEAR_MONTH_DAY_VISIBLE_HIDDEN' as const, includeDayPillar: true, includeHiddenStems: true },
  ].map((policy) => {
    const observed = otherPillarPositions.filter((p) =>
      (policy.includeDayPillar || p.slot !== 'day') &&
      (policy.includeHiddenStems || p.channel === 'visible_stem')
    );
    const pillarGlyphPairs = new Set(observed.map((p) => `${p.slot}:${p.glyph}`));
    return Object.freeze({
      ...policy,
      observedOccurrenceCount: observed.length,
      distinctPillarGlyphPairCount: pillarGlyphPairs.size,
      distinctPillarCount: new Set(observed.map((p) => p.slot)).size,
      samePillarSameGlyphTwoChannelExcess: observed.length - pillarGlyphPairs.size,
      namedWuJiCovered: true as const,
      classicalBieGongVerdict: 'UNADJUDICATED' as const,
      classicalZaiJianVerdict: 'UNADJUDICATED' as const,
      classicalWeiCountAuthorized: false as const,
    });
  }));
  const otherPillarUnitAudit = Object.freeze({
    // These are observed channels, not prohibitions or approved 宮 definitions.
    positions: otherPillarPositions,
    crossChannelDuplicatePillarGlyphs,
    samePillarGlyphAcrossChannelsCanInflateOccurrenceCount:
      crossChannelDuplicatePillarGlyphs.length > 0,
    palaceAndChannelCounterfactuals,
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
    // Scope-lattice v3 adds no new classical gate or accepted interpretation.
    yearMonthVsDayAndVisibleVsHiddenScopeAdjudicated: false as const,
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
      sameVolumeAnalogySecondVerse: '時上一位貴藏在支中' as const,
      sameVolumeZhengGuanChapter: '三命通會 卷五 論正官' as const,
      sameVolumeZhengGuanPhrase: '甲生丑月內有辛金又值酉時' as const,
      sameVolumeZhengGuanLaterVisiblePhrase: '若天干復透辛多' as const,
      sameVolumeZhengGuanHiddenBranchRepetitionDescribed: true as const,
      sameVolumeZhengGuanSourceChannel: 'DIGITAL_TRANSCRIPTION_ONLY' as const,
      zhengGuanRecurrenceRuleApplicableToHourWealth: false as const,
      // Independent directly inspected scanned pages; not a printed
      // adjudication of the DIFFERENT 時上偏財 counting predicate.
      sameVolumeZhengGuanPrintCrosscheck: Object.freeze({
        status: 'TWO_PRINT_SCAN_WITNESSES_PASSAGE_DIRECTLY_READ' as const,
        printWitnesses: Object.freeze([
          Object.freeze({
            sourceId: 'HARVARD_DRS_53262215_VOL_5' as const,
            originalPdfSha256: 'ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831' as const,
            ordinalPdfPages: Object.freeze([6, 7] as const),
            page6RasterSha256: 'e17407b04cd2a11e402fb2105defa44e912d88e728c75496f5ac2ea8d31e9292' as const,
            page7RasterSha256: '9c7a13cbd444e49487de86747b59fa52bd84ef6b16ecc60b20ffc1a3cb9a42bc' as const,
            priorActionsRun: 39037912192 as const,
            priorArtifactId: 12103320492 as const,
          }),
          Object.freeze({
            sourceId: 'NLC_411999029701_VOL_5_UPPER' as const,
            originalPdfSha256: '0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1' as const,
            ordinalPdfPages: Object.freeze([5, 6] as const),
            page5RasterSha256: '4c7e7a191389421f46fef36af412277fd2e8fd6c3bdb9d2a221b8cf3efa7bfb2' as const,
            page6RasterSha256: '9ec272128d7e3e313b7ce9b190cfb8ba75e997bf51c7b09912b97aeaea51fb93' as const,
            priorActionsRun: 39041195684 as const,
            priorArtifactId: 12103659191 as const,
          }),
        ]),
        printedZhengGuanOnlyPhrase: '支藏干透餘位不宜再見' as const,
        printedHiddenThenBranchExample: '甲生丑月內有辛金又值酉時' as const,
        printedAdditionalVisibleStemExample: '若天干復透辛多' as const,
        debatedYiJiSiGlyphBeforeShiZhongFanResolved: false as const,
        newSourceScanDownloadedInThisAudit: false as const,
        priorOriginalRenderedArtifactsReopenedAndRead: true as const,
        twoDistinctHoldingPrintScansRead: true as const,
        // Source-level book history is NOT equivalent to stemmatic
        // independence. Holdings, imprint/dating, printed layout, shared
        // readings and genealogical dependence are all different claims.
        bibliographicWitnessRelation: Object.freeze({
          status: 'DIFFERENT_PRINT_FORMATS_SUPPORTED_TEXTUAL_LINEAGE_UNRESOLVED' as const,
          sourceClass: 'PUBLIC_CATALOG_METADATA_AND_PRINT_SCAN_LOCUS' as const,
          harvard: Object.freeze({
            catalogUri: 'https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_三命通會_v.5卷之五.pdf' as const,
            holding: 'HARVARD_YENCHING' as const,
            editionAsCataloged: '清雍正十三年補刊本' as const,
            publicationYearApproximate: 1735 as const,
            publicationYearIsQuestionMarked: true as const,
            printedLinesPerHalfLeaf: 10 as const,
            printedCharactersPerLine: 20 as const,
            catalogSaysSupplementedWoodblockEdition: true as const,
          }),
          nlc: Object.freeze({
            catalogUri: 'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67240_三命通會_第9冊.pdf' as const,
            holding: 'NATIONAL_LIBRARY_OF_CHINA' as const,
            editionAsCataloged: '明萬曆刻本' as const,
            dateRangeStart: 1573 as const,
            dateRangeEnd: 1620 as const,
            exactImprintYearWithinRangeKnown: false as const,
            printedLinesPerHalfLeaf: 10 as const,
            printedCharactersPerLine: 22 as const,
            goodBookNumber: '17605' as const,
          }),
          differentHoldingInstitutions: true as const,
          differentSourcePdfHashes: true as const,
          catalogedCharacterCountsDiffer: true as const,
          samePrintingBlocksCannotBeInferred: true as const,
          distinctPrintedLayoutsSupportedByCatalog: true as const,
          woodblockTextualDescentAnalyzed: false as const,
          copiesAreIndependentTextualTraditions: 'UNADJUDICATED' as const,
          laterHarvardEditionCopiedEarlierNlcEdition: 'UNADJUDICATED' as const,
          agreementsAreTwoTextuallyIndependentVotes: false as const,
          externalMing1578LibraryCatalogIsThisNlcCopy: false as const,
          bibliographicMetadataCannotAuthorizeClassicalCounting: true as const,
        }),

        // The Ming 1578 print is a THIRD distinct institutional holding
        // for the Zhengguan parallel, with its own directly checked images.
        taiwanWanli1578ZhengGuanPrintedLocus: Object.freeze({
          sourceId: 'TAIWAN_NCL_06589_1578' as const,
          originalPdfSha256: '3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd' as const,
          catalogedExactPublicationYear: 1578 as const,
          catalogHolder: 'TAIWAN_NATIONAL_CENTRAL_LIBRARY' as const,
          originalPdfPages: Object.freeze([337, 340, 341] as const),
          volumeFiveOpensOnPage337: true as const,
          originalZhengGuanHeadingOnPage340: true as const,
          directPrintedBranchExampleOnPage341: '甲生丑月內有辛金又值酉時' as const,
          page340RasterSha256: 'eb1b041c5dadb699e3ec7baa3728594263eee6502b485af544ffedec03ead219' as const,
          page341RasterSha256: '7259ed422d7fef314e3703631a09c8e3f3c19657f74f57cc79b2ac4d3f2923fd' as const,
          independentTextualLineageCertified: false as const,
          automaticallyApplyToHourWealth: false as const,
        }),
        taiwanWanli1578HourWealthPrintedLocus: Object.freeze({
          sourceId: 'TAIWAN_NCL_06589_1578' as const,
          originalPdfSha256: '3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd' as const,
          pageHourWealthHeading: 375 as const,
          pageDirectPrintedWuJiClause: 376 as const,
          printedDisputedGlyph: '己' as const,
          originalPrintedClause: '柱中不宜再見戊己' as const,
          page375RasterSha256: '6807b6ab78cc0d2cd4bbe12d9b059dac977296134976be402ea53f6d54472afe' as const,
          page376RasterSha256: 'f43b34d006ba75a50179fc04bdcd377301bc9b25caf7cc4adc0146c8a82121e8' as const,
          renderedPage376DetailSha256: '782d797bb8424eeb32df77b0b517897c38dbe58ff6a5f1120329cec15d74f45f' as const,
          existingHarvardCadalNlcThreeScansAlsoReadWuJi: true as const,
          directlyReadPrintedHoldingGroupsNowFour: 4 as const,
          fourPrintingsAreGenealogicallyIndependent: false as const,
          originalAuthorialManuscriptGlyphCertified: false as const,
          printedGlyphDoesNotDefineZaiJianCountingScope: true as const,
        }),
        // Direct side-by-side reading of TWO specified leaf locations.
        // Agreement across a small set of phrases is not full-text collation.
        // Distinct printed settings do not certify independent transmission.
        hourWealthLocalLeafCollation: Object.freeze({
          version: 'n27-harvard-taiwan-local-leaf-collation-v1' as const,
          auditStatus: 'SAMPLED_PHRASE_AGREEMENT_ONLY' as const,
          harvardHoldingId: 'HARVARD_DRS_53262215_VOL_5' as const,
          harvardOriginalPdfSha256: 'ecf33909cf47822f144f315935e377fd1bc8475533db7497230a2a819b191831' as const,
          harvardHourWealthPdfPage: 45 as const,
          harvardHighResPage45Sha256: 'b32beb586688fd219d751ad22072d911a507008541863e3d47ad057fabc81f12' as const,
          taiwanHoldingId: 'TAIWAN_NCL_06589_1578' as const,
          taiwanOriginalPdfSha256: '3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd' as const,
          taiwanHourWealthPdfPages: Object.freeze([375, 376] as const),
          taiwanPdfPage375PreviousRasterSha256: '6807b6ab78cc0d2cd4bbe12d9b059dac977296134976be402ea53f6d54472afe' as const,
          taiwanPdfPage376PreviousRasterSha256: 'f43b34d006ba75a50179fc04bdcd377301bc9b25caf7cc4adc0146c8a82121e8' as const,
          sampledPrintedPhraseAgreements: Object.freeze([
            Object.freeze({ text: '時上偏財別宮忌見' as const, harvardPage: 45 as const, taiwanPage: 375 as const }),
            Object.freeze({ text: '柱中不宜再見戊己' as const, harvardPage: 45 as const, taiwanPage: 376 as const }),
            Object.freeze({ text: '只要一位不宜多逢' as const, harvardPage: 45 as const, taiwanPage: 376 as const }),
            Object.freeze({ text: '天元透出為妙支內所藏次之' as const, harvardPage: 45 as const, taiwanPage: 376 as const }),
            Object.freeze({ text: '時上偏財不用多' as const, harvardPage: 45 as const, taiwanPage: 376 as const }),
          ]),
          sampledAgreementsArePunctuationNormalized: true as const,
          entireChapterVerbatimCollationCompleted: false as const,
          localSampleShowsSubstantiveVariant: false as const,
          noVariantAnywhereInVolumeCertified: false as const,
          catalogHarvardCharactersPerLine: 20 as const,
          catalogTaiwanCharactersPerLine: 22 as const,
          matchingPhysicalSettingFromSameCarvedWoodblockSupported: false as const,
          nonidenticalPrintedSettingSupported: true as const,
          taiwanCatalogPlateHeartTitle: '三命會通' as const,
          taiwanCatalogSingleFishtail: true as const,
          taiwanCatalogListsEngraverNames: true as const,
          namedEngraverAtExactComparedLeafRead: false as const,
          engravedNameAtExactLeaf: 'UNREADABLE' as const,
          actualLeafRecarvingOrReplacementProven: false as const,
          actualLeafLossProven: false as const,
          commonTextualAncestor: 'UNADJUDICATED' as const,
          independentTextualWitnesses: 'UNADJUDICATED' as const,
          sampleAgreementCanAuthorizeBieGongDayScope: false as const,
          sampleAgreementCanAuthorizeZaiJianHiddenCount: false as const,
          sampleAgreementCanAuthorizeYiWeiUnit: false as const,
          sourceOnlyNoConsumerPromotion: true as const,
        }),
        // Catalogue-only companion copy: NO raster from 06590 was examined.
        // Two accession numbers are not two independent printing lineages.
        taiwanWanliCopy06590AccessibilityAudit: Object.freeze({
          status: 'CATALOG_CONFIRMED_ORIGINAL_SCAN_NOT_ACCESSED' as const,
          holdingInstitution: 'TAIWAN_NATIONAL_CENTRAL_LIBRARY' as const,
          accessionNumber: '06590' as const,
          comparedAccessibleCopyAccessionNumber: '06589' as const,
          twoSeparateCatalogRecordsVerified: true as const,
          editionAsCataloged: '明萬曆戊寅六年1578刊本' as const,
          sameCatalogedYear1578: true as const,
          volumes: 12 as const,
          catalogedLinesPerHalfLeaf: 10 as const,
          catalogedCharactersPerLine: 22 as const,
          catalogedPlateHeartTitle: '三命會通' as const,
          sharedPlateHeartTitleIsCatalogOnly: true as const,
          catalogSource: 'https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=a8776bf009664f7a8de67d697186e322fDcyODE20.HwkhFZvyoK_b_gt8uDb5Xa7Nh9LYxzj5HEj4uWEtX6g_&page=2' as const,
          secondaryCatalogSource: 'https://catalog.digitalarchives.tw/item/00/19/3c/14.html' as const,
          catalogIndicatesPermissionApplication: true as const,
          accessibleOriginalPdfLocatedInReviewedPublicSources: false as const,
          printedImagesOf06590Reviewed: false as const,
          hourWealthPdfPageNumberFor06590Known: false as const,
          exactHourWealthLeafInscriptionReviewed: false as const,
          characterStrokeLossComparedBetween06589And06590: false as const,
          specificEngraverSameInTwoCopies: 'UNADJUDICATED' as const,
          exactSamePrintingBlock: 'UNADJUDICATED' as const,
          textualIndependentTraditions: 'UNADJUDICATED' as const,
          independentNewPrintWitnessCountIncrement: 0 as const,
          permissionsOrReadingRoomRequiredToContinue: true as const,
          candidateOnlyNeverClassicalAuthorization: true as const,
        }),
        mainlandNlcVsTaiwan06589SameLocusPrintComparison: Object.freeze({
          status: 'SIDE_BY_SIDE_COLUMN_ALIGNMENT_OBSERVED_NO_WOODBLOCK_VERDICT' as const,
          mainlandOriginalHolding: 'NLC_411999029701_VOL_5_UPPER' as const,
          mainlandPdfPage: 43 as const,
          taiwanOriginalHolding: 'TAIWAN_NCL_06589_1578' as const,
          taiwanPdfPage: 376 as const,
          bothCatalogedTenLinesTwentyTwoCharacters: true as const,
          visiblySimilarColumnBeginningsAtHourWealthLocus: true as const,
          visuallyComparedRepeatedText: '如甲日見戊辰或甲戌時之例' as const,
          physicalStrokeChipOrSharedDefectEstablished: false as const,
          sameEngraverMarkAtBothLeavesRead: false as const,
          imageScalesAndInkingDiffer: true as const,
          supplementaryReadingMarksNotTreatedAsOriginalTextVariants: true as const,
          plateHeartFishtailOnBothExactLeavesFullyRead: false as const,
          candidateSameSettingRequiresPositiveMicrodefectEvidence: true as const,
          commonPrintingBlocks: 'UNADJUDICATED' as const,
          manuscriptFamilyOrTextualGenealogy: 'UNADJUDICATED' as const,
          independentVotesFromTextAgreementAuthorized: false as const,
          cannotUseToDecideBieGongZaiJianOrYiWei: true as const,
        }),
        // Reproducible quantitative scan-registration observation only:
        // feature homography is not a proof of the identical carved block.
        mainlandNlcTaiwan06589SiftRegistrationAudit: Object.freeze({
          status: 'STRONG_SPATIAL_REGISTRATION_NO_POSITIVE_SHARED_BLOCK_DEFECT' as const,
          measuredAt: '2026-10-18' as const,
          mainlandHoldingId: 'NLC_411999029701_VOL_5_UPPER' as const,
          mainlandPdfPage: 43 as const,
          taiwanHoldingId: 'TAIWAN_NCL_06589_1578' as const,
          taiwanPdfPage: 376 as const,
          mainlandOriginalPdfSha256: '0e67d177f4fe346988f67df33fe82df9df1bdecbd21d359f07716b6b95eda5d1' as const,
          taiwanOriginalPdfSha256: '3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd' as const,
          mainlandAnalyzedRasterSha256: '7f9b25f6c420044e5edc3d55f12dbb66b779a552b8181adfbc0deae8dfe5f005' as const,
          taiwanAnalyzedRasterSha256: '163ea1e3eebcd719b397672e99ff2112f3c47927f2452d2f1e87d63f06abe7cf' as const,
          originalRoiPixelBounds: Object.freeze({
            mainland: Object.freeze([426, 155, 806, 689] as const),
            taiwan: Object.freeze([1083, 356, 2015, 1665] as const),
          }),
          algorithm: 'OpenCV_SIFT_BF_KNN_RANSAC_HOMOGRAPHY' as const,
          detectorMaxFeatures: 8500 as const,
          detectorContrastThreshold: 0.012 as const,
          detectorEdgeThreshold: 15 as const,
          knnRatioThreshold: 0.74 as const,
          ransacDestinationThresholdPixels: 3.5 as const,
          mainlandP43Taiwan1578P376: Object.freeze({
            siftRatioAccepted: 406 as const,
            homographyInliers: 245 as const,
            inlierFraction: 0.6034 as const,
            medianInlierReprojectionPixelsInTaiwanRaster: 1.925 as const,
            inliersDistributedAcrossMostOfComparedPrintedLeaf: true as const,
          }),
          negativeControls: Object.freeze([
            Object.freeze({ comparedWith: 'MAINLAND_NLC_P42' as const, siftRatioAccepted: 57 as const, homographyInliers: 8 as const }),
            Object.freeze({ comparedWith: 'MAINLAND_NLC_P44' as const, siftRatioAccepted: 86 as const, homographyInliers: 8 as const }),
            Object.freeze({ comparedWith: 'HARVARD_REPRINT_P45' as const, siftRatioAccepted: 22 as const, homographyInliers: 5 as const }),
          ]),
          automatedMatchingStrengthVersusControls: 'SUBSTANTIALLY_HIGHER' as const,
          metricSensitiveToRoiRenderingAlgorithmAndThresholds: true as const,
          identicalSourcePdfOrScanReuseCertifiedExcluded: false as const,
          sharedUniqueGlyphChipDefectLocatedAndVisuallyCertified: false as const,
          exactEngraverSameAtLeaf: 'UNADJUDICATED' as const,
          identicalCarvedPhysicalWoodblock: 'UNADJUDICATED' as const,
          lineageIndependence: 'UNADJUDICATED' as const,
          physicalPrintingIdentityPromoted: false as const,
          interpretationCountingRuleChanged: false as const,
          originalPrintWitnessCountIncrement: 0 as const,
          noInstitutionalOutreachRequired: true as const,
          nextAllowedEvidencePath: 'PUBLIC_SCAN_GLYPH_DAMAGE_FINGERPRINT_ONLY' as const,
        }),
        harvardVolumeOneOriginalPrefaceRead: Object.freeze({
          sourceId: 'HARVARD_DRS_53262215_VOL_1_PREFACE' as const,
          sameHarvardDrsAsPreviouslyReadVolumeFive: true as const,
          originalPdfSha256: 'af48a02807222915574a7b03f2bcda1dea2810f69fe7112ee8c40967bc8de2d5' as const,
          titlePage: 2 as const,
          recoveredLiFamilyBlocksAndSupplementPassagePage: 4 as const,
          datedPrefaceSignaturePage: 6 as const,
          prefaceTitle: '補刻三命通會敘' as const,
          recoveredWoodblocksStoredInLiFamily: true as const,
          reportedMissingDamagedSections: true as const,
          describesCorrectionAndSupplementation: true as const,
          prefatoryDate: '雍正乙卯花朝' as const,
          prefatorySigner: '蔣國祥' as const,
          page2RasterSha256: '0fa370c44688714df45fabfa54c89f92adbb6bac2765517a9cada457c77884ab' as const,
          page4RasterSha256: '1688ee1e45b94b9afbeb91d35dfe39416c53768e7ed9a3606e2b7a517751f17b' as const,
          page6RasterSha256: 'b673ab1811624b18b1ce0d8ac61f4a8b5facf2ab720871bc8dc3c9bc5ecfbae5' as const,
          publicationYearNotProvenByPrefaceAlone: true as const,
          historicalLiBlockIsExactTaiwan1578Block: 'UNADJUDICATED' as const,
          harvardVolumeFiveSharesExactSameCarvedBlockAsVolumeOne: 'UNADJUDICATED' as const,
          restoredBlocksRequireTreatingWitnessesAsPotentiallyDependent: true as const,
        }),
        printLineageIndependenceCertified: false as const,
        directlyCertifiedHourWealthBieGongIncludesDay: false as const,
        directlyCertifiedHourWealthZaiJianIncludesHidden: false as const,
        directlyCertifiedClassicalYiWeiCountingUnit: false as const,
        crossGenreRuleTransferAuthorized: false as const,
      }),
      // "此與時上偏官格相似" refers to 偏官, NOT this 正官 chapter.
      hourWealthExplicitAnalogyTarget: '時上偏官' as const,
      zhengGuanIsNotHourWealthExplicitAnalogyTarget: true as const,
      sameVolumeAnalogyIsDigitallyTranscribedNotNewPrintAttestation: true as const,
      classicalBieGongDayInclusionNotDerivedFromAnalogy: true as const,
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
