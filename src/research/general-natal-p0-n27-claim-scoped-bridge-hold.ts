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
    researchHeadReviewed: '29a14e348e5c5136aa2c97394d332a081c5af3d5' as const,
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
      '三命通會（四庫全書本）卷五 online transcription directly locates 論正財/論偏財/時上偏財; general 卷六 version has （以下內容與書不合） warning and nonidentical editorial characters. Physical scan/folio and lineage unverified; no independent manuscript or reviewer authority.',
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
    reproducibleManualPrintInspectionScript:
      'scripts/research/inspect-n27-volume-five-print.mjs' as const,
    originalPdfSha256ComputedInCurrentRun: false as const,
    targetPageImagesRenderedFromAuthenticSourceInCurrentRun: false as const,
    scriptSelfTestDoesNotAuthenticateOriginalReading: true as const,
    printedTargetFoliosDirectlyInspected: false as const,
    twoScansDemonstratedToBeIndependentEditions: false as const,
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
