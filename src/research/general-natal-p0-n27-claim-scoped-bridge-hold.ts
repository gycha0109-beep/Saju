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
    researchHeadReviewed: 'bb91adf29541fe1b26234c6202cb139ad99c552f' as const,
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
      version: 'saju-n27-wu-ji-recurrence-scope-sensitivity-v1' as const,
      path: 'src/research/general-natal-p0-n27-wu-ji-recurrence-scope-audit.ts' as const,
      sameReal2010WuChenAndJiaXuNonHourPillars: true as const,
      testedTimeCases: Object.freeze(['07:30', '19:30', '05:30', 'UNKNOWN'] as const),
      counterfactualScopeKeys: Object.freeze([
        'VISIBLE_WU_ONLY', 'VISIBLE_WU_AND_JI',
        'VISIBLE_AND_HIDDEN_WU_ONLY', 'VISIBLE_AND_HIDDEN_WU_AND_JI',
      ] as const),
      visibleWuOnlyWouldMissPrintedJi: true as const,
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
