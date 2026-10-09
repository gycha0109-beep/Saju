import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipNatalGeneralAuthorityBridgeReview,
} from './relationship-natal-general-authority-bridge-review.js';
import {
  RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_CANDIDATE_REVISION_VERSION,
  RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_RULE_IDS,
  RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS,
  buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision,
} from './relationship-natal-general-authority-seeking-candidate-revision.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_NATAL_GENERAL_FRESH_BRIDGE_REREVIEW_VERSION =
  'myeonghwa-relationship-natal-general-fresh-bridge-rereview-v1' as const;

export type RelationshipNatalGeneralFreshBridgeDecision =
  | 'RETURN_TO_RESEARCH'
  | 'REVIEW_INCONSISTENT';

export function buildRelationshipNatalGeneralFreshBridgeRereview() {
  const originalReview = buildRelationshipNatalGeneralAuthorityBridgeReview();
  const revision =
    buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();

  const exactRevisionVersion =
    revision.candidateVersion ===
      RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_CANDIDATE_REVISION_VERSION &&
    revision.candidateVersion === '0.6.0-research-authority-seeking';

  const exactAuthoritySeekingSurface =
    revision.accounting.authoritySeekingRuleCount === 0 &&
    RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_RULE_IDS.length === 0 &&
    revision.authoritySeekingSurface.ruleIds.length === 0 &&
    revision.authoritySeekingSurface.ruleTaxonomy.length === 0 &&
    revision.authoritySeekingSurface.ruleSourceBindings.length === 0;

  const exactResearchLeadIsolation =
    revision.accounting.nonAdmittedResearchLeadCount === 2 &&
    RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS.length === 2 &&
    revision.nonAdmittedResearchLeads.every(
      (lead) =>
        lead.status === 'non_admitted_research_lead' &&
        lead.relationshipOutcomeAuthorized === false &&
        lead.replacementRuleAuthoringAuthorized === false &&
        lead.engineAuthorityAuthorized === false,
    );

  const oldReviewedSurfaceInvalidated =
    revision.bridgeSurface.reviewedBaselineReusable === false &&
    revision.bridgeSurface.surfaceChangedFromReviewedBaseline === true &&
    revision.bridgeSurface
      .freshBridgeReviewRequiredBeforeAnyAuthorityPromotion === true;

  const currentPreviewRuntimeSurfacePreserved =
    RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION === '0.5.0-research' &&
    RELATIONSHIP_NATAL_READING_RULES.length === 11 &&
    revision.currentExecutableCandidate.version === '0.5.0-research' &&
    revision.currentExecutableCandidate.ruleCount === 11 &&
    revision.currentExecutableCandidate.runtimeMutationAuthorizedByRevision ===
      false &&
    revision.currentExecutableCandidate.previewMutationAuthorizedByRevision ===
      false;

  const originalReviewWasResearchReturn =
    originalReview.decision.bridgeDecision === 'RETURN_TO_RESEARCH' &&
    originalReview.decision.engineAuthorityPromotion === false &&
    originalReview.decision.g2aAdmitted === false &&
    originalReview.decision.production === 'HOLD';

  const revisionStructurallyComplete =
    revision.decision.revisionStructurallyComplete === true &&
    revision.accounting.exactPriorSurfaceAccountedFor === true &&
    revision.accounting.exactNarrowLeadBinding === true &&
    revision.accounting.priorRuleCount === 11 &&
    revision.accounting.removedPriorRuleCount === 9 &&
    revision.accounting.narrowedPriorRuleCount === 2;

  const semanticAdmissionCandidatePresent =
    revision.accounting.authoritySeekingRuleCount > 0;

  const freshReviewRepresentable =
    exactRevisionVersion &&
    exactAuthoritySeekingSurface &&
    exactResearchLeadIsolation &&
    oldReviewedSurfaceInvalidated &&
    currentPreviewRuntimeSurfacePreserved &&
    originalReviewWasResearchReturn &&
    revisionStructurallyComplete;

  const futureRuleResearchBlockers = Object.freeze([
    ...(revision.remainingResearchClosure.relationshipSpecificSourceSupportComplete
      ? []
      : ['RELATIONSHIP_SPECIFIC_SOURCE_SUPPORT_INCOMPLETE' as const]),
    ...(revision.remainingResearchClosure
      .tenGodToRelationshipDomainMappingAuthorityComplete
      ? []
      : ['TEN_GOD_TO_RELATIONSHIP_DOMAIN_MAPPING_AUTHORITY_INCOMPLETE' as const]),
    ...(revision.remainingResearchClosure.scopeQualifiersCounterexamplesComplete
      ? []
      : ['RELATIONSHIP_SCOPE_QUALIFIERS_COUNTEREXAMPLES_INCOMPLETE' as const]),
    ...(revision.remainingResearchClosure.schoolDependenceBoundaryComplete
      ? []
      : ['RELATIONSHIP_SCHOOL_DEPENDENCE_BOUNDARY_INCOMPLETE' as const]),
  ]);

  const bridgeDecision: RelationshipNatalGeneralFreshBridgeDecision =
    freshReviewRepresentable && !semanticAdmissionCandidatePresent
      ? 'RETURN_TO_RESEARCH'
      : 'REVIEW_INCONSISTENT';

  const material = Object.freeze({
    reviewVersion: RELATIONSHIP_NATAL_GENERAL_FRESH_BRIDGE_REREVIEW_VERSION,
    issue: '#1860' as const,
    capabilityKey: 'relationship:natal:general' as const,
    reviewedCandidateVersion: revision.candidateVersion,
    reviewedRevisionId: revision.revisionId,
    priorBridgeReviewId: originalReview.reviewId,
    priorBridgeDecision: originalReview.decision.bridgeDecision,
    checks: Object.freeze({
      exactRevisionVersion,
      exactAuthoritySeekingSurface,
      exactResearchLeadIsolation,
      oldReviewedSurfaceInvalidated,
      currentPreviewRuntimeSurfacePreserved,
      originalReviewWasResearchReturn,
      revisionStructurallyComplete,
    }),
    surface: Object.freeze({
      priorReviewedCandidateVersion: originalReview.candidateVersion,
      priorReviewedRuleCount: originalReview.relationshipRuleCount,
      revisedAuthoritySeekingRuleCount:
        revision.accounting.authoritySeekingRuleCount,
      nonAdmittedResearchLeadCount:
        revision.accounting.nonAdmittedResearchLeadCount,
      semanticAdmissionCandidatePresent,
      oldReviewedSurfaceReusable: false as const,
      currentPreviewRuntimeSurfaceIsAuthoritySeekingSurface: false as const,
    }),
    futureRuleResearchBlockers,
    decision: Object.freeze({
      freshBridgeRereviewCompleted: freshReviewRepresentable,
      bridgeDecision,
      semanticAdmissionCandidatePresent,
      bridgeSemanticAdmissionAuthorized: false as const,
      engineAuthorityPromotionAuthorized: false as const,
      boundedEngineDevelopmentAdmissionAuthorized: false as const,
      g2aAdmitted: false as const,
      previewMutationAuthorized: false as const,
      officialReadingExpansionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
      nextOwner: 'traditional_saju_research' as const,
      nextAction:
        'CONTINUE_THE_TWO_NARROW_RESEARCH_LEADS_OR_ABANDON_THEM_DO_NOT_REUSE_THE_OLD_ELEVEN_RULE_AUTHORITY_SURFACE' as const,
    }),
    prohibitedShortcuts: Object.freeze([
      'ZERO_AUTHORITY_SEEKING_RULES_DOES_NOT_MEAN_BLANKET_RELATIONSHIP_AUTHORITY',
      'FRESH_BRIDGE_REREVIEW_COMPLETED_DOES_NOT_MEAN_BRIDGE_ADMISSION',
      'NON_ADMITTED_RESEARCH_LEAD_DOES_NOT_MEAN_SEMANTIC_ADMISSION_CANDIDATE',
      'OLD_ELEVEN_RULE_PREVIEW_RUNTIME_SURFACE_DOES_NOT_REGAIN_AUTHORITY',
      'RETURN_TO_RESEARCH_DOES_NOT_MUTATE_CURRENT_PREVIEW_RUNTIME',
      'NO_G2A_OFFICIAL_LIFECYCLE_OR_PRODUCTION_PROMOTION',
    ] as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}
