import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_NATAL_GENERAL_BRIDGE_REENTRY_BASELINE,
} from './relationship-natal-general-bridge-reentry-readiness.js';
import {
  RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS,
  buildRelationshipNatalGeneralFinalRuleDisposition,
} from './relationship-natal-general-final-rule-disposition.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_CANDIDATE_REVISION_VERSION =
  '0.6.0-research-authority-seeking' as const;

export const RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_REVISION_ARTIFACT_VERSION =
  'myeonghwa-relationship-natal-general-authority-seeking-candidate-revision-v1' as const;

export const RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_RULE_IDS =
  Object.freeze([] as const);

export const RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS = Object.freeze([
  Object.freeze({
    leadId: 'OUTPUT_EXPRESSION_AXIS_ONLY',
    priorRuleId: 'RULE-RELATIONSHIP-NATAL-OUTPUT-EXPRESS-TO-CONNECT',
    status: 'non_admitted_research_lead' as const,
    targetScope: 'output_expression_axis_only' as const,
    relationshipOutcomeAuthorized: false as const,
    replacementRuleAuthoringAuthorized: false as const,
    engineAuthorityAuthorized: false as const,
  }),
  Object.freeze({
    leadId:
      'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_WITH_EXPLICIT_CONTEXT',
    priorRuleId:
      'RULE-RELATIONSHIP-NATAL-PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
    status: 'non_admitted_research_lead' as const,
    targetScope:
      'conditional_peer_wealth_resource_competition_with_explicit_context' as const,
    relationshipOutcomeAuthorized: false as const,
    replacementRuleAuthoringAuthorized: false as const,
    engineAuthorityAuthorized: false as const,
  }),
] as const);

function sorted(values: readonly string[]) {
  return [...values].sort();
}

function revisionReviewSurface() {
  return Object.freeze({
    candidateVersion:
      RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_CANDIDATE_REVISION_VERSION,
    ruleIds: Object.freeze([] as string[]),
    ruleTaxonomy: Object.freeze([] as string[]),
    methodologySourceIds: Object.freeze([] as string[]),
    ruleSourceBindings: Object.freeze([] as string[]),
  });
}

export function buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision() {
  const finalDisposition = buildRelationshipNatalGeneralFinalRuleDisposition();

  const priorRuleIds = sorted(
    RELATIONSHIP_NATAL_READING_RULES.map((rule) => rule.ruleId),
  );
  const dispositionRuleIds = sorted(
    RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS.map(
      (row) => row.ruleId,
    ),
  );
  const removedRuleIds = sorted(
    RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS.filter(
      (row) => row.finalDisposition === 'REMOVE',
    ).map((row) => row.ruleId),
  );
  const narrowedPriorRuleIds = sorted(
    RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS.filter(
      (row) => row.finalDisposition === 'NARROW',
    ).map((row) => row.ruleId),
  );
  const researchLeadPriorRuleIds = sorted(
    RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS.map(
      (lead) => lead.priorRuleId,
    ),
  );

  const exactPriorSurfaceAccountedFor =
    priorRuleIds.length === dispositionRuleIds.length &&
    priorRuleIds.every(
      (ruleId, index) => ruleId === dispositionRuleIds[index],
    );
  const exactNarrowLeadBinding =
    narrowedPriorRuleIds.length === researchLeadPriorRuleIds.length &&
    narrowedPriorRuleIds.every(
      (ruleId, index) => ruleId === researchLeadPriorRuleIds[index],
    );

  const reviewSurface = revisionReviewSurface();
  const revisedCandidateSurfaceHash = deterministicContentHash(reviewSurface);
  const reviewedBaselineSurfaceHash =
    RELATIONSHIP_NATAL_GENERAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash;
  const reviewedBaselineReusable =
    revisedCandidateSurfaceHash === reviewedBaselineSurfaceHash;

  const material = Object.freeze({
    artifactVersion:
      RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_REVISION_ARTIFACT_VERSION,
    candidateVersion:
      RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_CANDIDATE_REVISION_VERSION,
    issue: '#1855' as const,
    upstreamResearchIssue: '#1807' as const,
    capabilityKey: 'relationship:natal:general' as const,
    supersedesResearchCandidateVersion:
      RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
    upstreamFinalDispositionId: finalDisposition.dispositionId,
    currentExecutableCandidate: Object.freeze({
      version: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
      ruleCount: RELATIONSHIP_NATAL_READING_RULES.length,
      runtimeMutationAuthorizedByRevision: false as const,
      previewMutationAuthorizedByRevision: false as const,
    }),
    authoritySeekingSurface: reviewSurface,
    authoritySeekingRuleIds:
      RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_RULE_IDS,
    nonAdmittedResearchLeads:
      RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS,
    removedPriorRuleIds: Object.freeze(removedRuleIds),
    narrowedPriorRuleIds: Object.freeze(narrowedPriorRuleIds),
    accounting: Object.freeze({
      exactPriorSurfaceAccountedFor,
      exactNarrowLeadBinding,
      priorRuleCount: priorRuleIds.length,
      authoritySeekingRuleCount:
        RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_RULE_IDS.length,
      removedPriorRuleCount: removedRuleIds.length,
      narrowedPriorRuleCount: narrowedPriorRuleIds.length,
      nonAdmittedResearchLeadCount:
        RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS.length,
    }),
    bridgeSurface: Object.freeze({
      reviewedBaselineSurfaceHash,
      revisedCandidateSurfaceHash,
      reviewedBaselineReusable,
      surfaceChangedFromReviewedBaseline: !reviewedBaselineReusable,
      freshBridgeReviewRequiredBeforeAnyAuthorityPromotion:
        !reviewedBaselineReusable,
      freshBridgeReviewIsEngineAdmission: false as const,
    }),
    remainingResearchClosure: Object.freeze({
      relationshipSpecificSourceSupportComplete: false as const,
      tenGodToRelationshipDomainMappingAuthorityComplete: false as const,
      scopeQualifiersCounterexamplesComplete: false as const,
      schoolDependenceBoundaryComplete: false as const,
      exactRuleRetainNarrowRemoveDecisionComplete: true as const,
    }),
    decision: Object.freeze({
      revisionStructurallyComplete:
        finalDisposition.decision.exactRuleRetainNarrowRemoveDecisionComplete &&
        exactPriorSurfaceAccountedFor &&
        exactNarrowLeadBinding &&
        RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_RULE_IDS.length === 0 &&
        removedRuleIds.length === 9 &&
        narrowedPriorRuleIds.length === 2 &&
        !reviewedBaselineReusable,
      currentElevenRuleSurfaceRetainedForAuthoritySeeking: false as const,
      anyCurrentRuleRetainedUnchangedForAuthoritySeeking: false as const,
      narrowedResearchLeadsAreAdmittedRules: false as const,
      replacementRuleAuthoringAuthorized: false as const,
      currentRuntimeMutationAuthorized: false as const,
      previewMutationAuthorized: false as const,
      bridgeAuthorityPromotionAuthorized: false as const,
      g2aAdmissionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      nextAction:
        'RUN_FRESH_BRIDGE_REVIEW_AGAINST_THE_REVISED_ZERO_RULE_AUTHORITY_SEEKING_SURFACE_AND_KEEP_THE_TWO_NARROW_PATHS_IN_RESEARCH' as const,
    }),
    prohibitedExtensions: Object.freeze([
      'ZERO_AUTHORITY_SEEKING_RULES_DOES_NOT_DELETE_CURRENT_PREVIEW_RUNTIME_RULES',
      'NARROW_RESEARCH_LEAD_DOES_NOT_CREATE_A_REPLACEMENT_RULE',
      'CANDIDATE_REVISION_DOES_NOT_CLOSE_SOURCE_MAPPING_SCOPE_OR_SCHOOL_BOUNDARY_RESEARCH',
      'FRESH_BRIDGE_REVIEW_REQUIRED_DOES_NOT_MEAN_BRIDGE_REVIEW_PASSES',
      'FRESH_BRIDGE_REVIEW_DOES_NOT_MEAN_ENGINE_ADMISSION',
      'NO_G2A_OFFICIAL_LIFECYCLE_OR_PRODUCTION_PROMOTION',
    ] as const),
    authorityBoundary: Object.freeze({
      sourceGroundedAiInternalReviewPassed: false as const,
      boundedEngineDevelopmentAdmissionAuthorized: false as const,
      g2aAdmitted: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingExpansionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    revisionId: `relationship_natal_general_authority_seeking_candidate_revision_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
