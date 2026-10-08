import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralAnnualResearchReturnHandoff } from './general-annual-research-return-handoff.js';
import { buildGeneralAnnualAtomicSourceAcquisition } from './general-annual-atomic-semantic-source-acquisition.js';
import { buildGeneralAnnualBranchClashAdjudication } from './general-annual-branch-clash-adjudication.js';

export const GENERAL_ANNUAL_SA7D_RETURN_EVIDENCE_VERSION =
  'sa7d-research-return-evidence-v1' as const;

/**
 * Research evidence return only. This is neither an authority registry
 * nor a Bridge, Engine, Reader, or Production admission.
 */
export function buildGeneralAnnualSA7DResearchReturnEvidence() {
  const upstream = buildGeneralAnnualResearchReturnHandoff();
  const atomic = buildGeneralAnnualAtomicSourceAcquisition();
  const clash = buildGeneralAnnualBranchClashAdjudication();
  const themeDecisions = atomic.currentThemeSemanticAdjudication.decisions;
  const clashDecisions = clash.decisions;

  if (
    atomic.upstreamHandoff.handoffHash !== upstream.handoffHash ||
    atomic.upstreamHandoff.candidateSurfaceHash !==
      upstream.candidateBinding.candidateSurfaceHash ||
    clash.acquisitionRef.acquisitionId !== atomic.acquisitionId
  ) {
    throw new Error('SA-7D evidence sources do not match the current Research-return binding');
  }

  if (
    themeDecisions.length !== 10 ||
    clashDecisions.length !== 4 ||
    !atomic.observations.atomicStemRelationSourceQualified ||
    !themeDecisions.every((item) =>
      item.originalModernMeaningGate === 'REQUIRES_SEPARATE_DIRECT_SUPPORT' &&
      item.sourceSupportGrade === 'INSUFFICIENT' &&
      !item.sourceQualifiedModernAnnualMeaning &&
      !item.productionAuthorization
    ) ||
    !clashDecisions.every((item) =>
      item.sourceSupportGrade === 'INSUFFICIENT' &&
      item.semanticDisposition === 'REQUIRES_SEPARATE_DIRECT_SUPPORT' &&
      !item.qualifiedTraditionalAnnualMeaning &&
      !item.productionAuthorization
    ) ||
    atomic.observations.bridgeReentryReady ||
    clash.boundary.bridgeReentryReady ||
    atomic.authorityBoundary.production !== 'HOLD' ||
    clash.boundary.production !== 'HOLD'
  ) {
    throw new Error('SA-7D research evidence must remain source-bounded and fail-closed');
  }

  const witnessedIdentity = Object.freeze(
    themeDecisions.filter((item) => item.identitySourceSupportGrade === 'PRIMARY_SUPPORTED'),
  );
  if (
    witnessedIdentity.length !== 2 ||
    witnessedIdentity[0]?.tenGod !== '편재' ||
    witnessedIdentity[1]?.tenGod !== '편관' ||
    !witnessedIdentity.every((item) =>
      item.semanticDisposition === 'REPLACE' &&
      item.sourceStatement !== null &&
      item.successorMeaningCeiling === 'relation_identity_only'
    ) ||
    themeDecisions.some((item) =>
      item.identitySourceSupportGrade !== 'PRIMARY_SUPPORTED' &&
      item.semanticDisposition !== 'REQUIRES_SEPARATE_DIRECT_SUPPORT'
    )
  ) {
    throw new Error('SA-7D exact primary identity witness set changed; fresh review required');
  }

  const material = Object.freeze({
    version: GENERAL_ANNUAL_SA7D_RETURN_EVIDENCE_VERSION,
    parentResearchIssue: '#2386' as const,
    watchtowerTrack: 'saju-research' as const,
    provenance: Object.freeze({
      upstreamHandoffVersion: upstream.version,
      upstreamHandoffHash: upstream.handoffHash,
      candidateVersion: upstream.candidateBinding.candidateVersion,
      candidateSurfaceHash: upstream.candidateBinding.candidateSurfaceHash,
      atomicAcquisitionId: atomic.acquisitionId,
      branchClashAdjudicationId: clash.adjudicationId,
      themeAdjudicationPr: '#2417' as const,
      branchClashAdjudicationPr: '#2420' as const,
      primaryWitnessPdfPageOneBased:
        atomic.currentThemeSemanticAdjudication.sourceBoundary.exactPrimaryPdfPageOneBased,
    }),
    evidence: Object.freeze({
      relationIdentityProposition: atomic.atomicStemRelationProposition,
      atomicStemSourceAdjudication: atomic.atomicStemRelationAdjudication,
      currentThemeDecisions: themeDecisions,
      annualBranchClashDecisions: clashDecisions,
      currentThemeDecisionCount: themeDecisions.length,
      currentBranchClashDecisionCount: clashDecisions.length,
      directlyWitnessedTenGodIdentities: Object.freeze(
        witnessedIdentity.map((item) => item.tenGod),
      ),
      unresolvedModernAnnualThemeKeys: Object.freeze(
        themeDecisions.map((item) => item.semanticKey),
      ),
      unresolvedAnnualClashMeaningKeys: Object.freeze(
        clashDecisions.map((item) => item.semanticKey),
      ),
      classicalExampleSupportIsExhaustiveTaxonomy: false as const,
      internalPolicyProvidesTraditionalMeaningAuthority: false as const,
      currentlyQualifiedAnnualClashTension: false as const,
      currentlyQualifiedPillarSpecificEmphasis: false as const,
    }),
    decision: Object.freeze({
      disposition: 'RETURN_RESEARCH_EVIDENCE_WITH_UNRESOLVED_SEMANTIC_GAPS' as const,
      researchAdjudicationRecorded: true as const,
      candidateCodeMutated: false as const,
      candidateSemanticsAdmitted: false as const,
      governedFullTenGodTaxonomyEstablishedByTwoExamples: false as const,
      bridgeReentryReady: false as const,
      highestPermittedFutureState:
        upstream.reentryRequirements.highestPermittedFutureReentryState,
      authorityPromotionsGranted: false as const,
      annualToMonthlyAuthorityGranted: false as const,
      engineAuthorized: false as const,
      previewAuthorized: false as const,
      officialReadingAuthorized: false as const,
      productionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    unresolvedResearch: Object.freeze([
      'EIGHT_OTHER_TEN_GOD_EXACT_PRIMARY_WITNESSES_AND_GOVERNED_TAXONOMY',
      'TEN_MODERN_ANNUAL_THEME_MEANINGS_REQUIRE_DIRECT_ANNUAL_SCOPE_EVIDENCE',
      'FOUR_ANNUAL_TO_NATAL_PILLAR_CLASH_MEANINGS_REQUIRE_DIRECT_SOURCE_SUPPORT',
      'CONDITIONAL_INTERACTIONS_EXCEPTIONS_AND_SCHOOL_DEPENDENT_EFFECTS',
      'NO_ANNUAL_TO_MONTHLY_AUTHORITY_INHERITANCE',
    ] as const),
    prohibitedExtensions: Object.freeze([
      'NO_EVENT_OR_LUCK_SCORE_FROM_RELATION_IDENTITY',
      'NO_GENERIC_TENSION_OR_PILLAR_EMPHASIS_FROM_BRANCH_CLASH',
      'NO_NATAL_TO_ANNUAL_OR_ANNUAL_TO_MONTHLY_INHERITANCE',
      'NO_BRIDGE_ENGINE_PREVIEW_OFFICIAL_READING_OR_PRODUCTION_PROMOTION',
      'NO_FAKE_DOMAIN_REVIEW_ATTESTATIONS',
    ] as const),
  });

  return Object.freeze({
    ...material,
    evidenceId: deterministicContentHash(material),
  });
}
