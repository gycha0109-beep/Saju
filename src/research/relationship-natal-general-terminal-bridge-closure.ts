import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_SEEKING_REVISION_VERSION,
  buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision,
} from './relationship-natal-general-terminal-authority-seeking-revision.js';

export const RELATIONSHIP_NATAL_GENERAL_TERMINAL_BRIDGE_CLOSURE_VERSION =
  'myeonghwa-relationship-natal-general-terminal-bridge-closure-v1' as const;

export type RelationshipNatalGeneralTerminalBridgeDecision =
  | 'CLOSED_NO_SEMANTIC_CANDIDATE'
  | 'REVIEW_INCONSISTENT';

export function buildRelationshipNatalGeneralTerminalBridgeClosure() {
  const terminal =
    buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision();

  const exactTerminalVersion =
    terminal.candidateVersion ===
      RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_SEEKING_REVISION_VERSION &&
    terminal.candidateVersion ===
      '0.7.0-research-authority-seeking-terminal';

  const terminalRevisionStructurallyComplete =
    terminal.decision.terminalRevisionStructurallyComplete === true;

  const zeroAuthoritySeekingRules =
    terminal.accounting.authoritySeekingRuleCount === 0 &&
    terminal.authoritySeekingRuleIds.length === 0 &&
    terminal.authoritySeekingSurface.ruleIds.length === 0;

  const zeroRelationshipReplacementLeads =
    terminal.accounting.relationshipReplacementLeadCount === 0 &&
    terminal.replacementLeads.length === 0 &&
    terminal.authoritySeekingSurface.replacementLeadIds.length === 0 &&
    terminal.researchRequirementState.bothReplacementLeadAdjudicationsComplete ===
      true;

  const noSemanticCandidate =
    terminal.decision.semanticAdmissionCandidatePresent === false &&
    terminal.decision.relationshipReplacementResearchLeadPresent === false &&
    terminal.decision.relationshipSemanticAuthorityEstablished === false;

  const currentPreviewRuntimeIsolated =
    terminal.currentExecutableCandidate.version === '0.5.0-research' &&
    terminal.currentExecutableCandidate.ruleCount === 11 &&
    terminal.currentExecutableCandidate.authoritySeekingSurface === false &&
    terminal.currentExecutableCandidate
      .runtimeMutationAuthorizedByTerminalRevision === false &&
    terminal.currentExecutableCandidate
      .previewMutationAuthorizedByTerminalRevision === false;

  const researchRequirementsNotFalselyResolved =
    terminal.researchRequirementState
      .futureResearchRequirementsGloballyResolved === false &&
    terminal.researchRequirementState
      .futureResearchRequirementsApplicableToCurrentTerminalSurface === false &&
    terminal.researchRequirementState
      .currentTerminalSurfaceResearchRequirementDisposition ===
      'NOT_APPLICABLE_NO_SEMANTIC_CANDIDATE' &&
    terminal.researchRequirementState
      .futureNewCandidateMustReopenResearchRequirements === true &&
    terminal.researchRequirementState.futureCandidateRequirements.length === 4;

  const priorBridgeReviewNotReusable =
    terminal.bridgeSurface
      .priorFreshBridgeReviewReusableForTerminalRevision === false &&
    terminal.bridgeSurface
      .freshBridgeRereviewRequiredToCloseTerminalSurface === true &&
    terminal.bridgeSurface
      .freshBridgeRereviewCanCreateSemanticCandidate === false;

  const noDownstreamAuthorityAlreadyGranted =
    terminal.decision.bridgeAdmissionAuthorized === false &&
    terminal.decision.boundedEngineDevelopmentAdmissionAuthorized === false &&
    terminal.decision.g2aAdmissionAuthorized === false &&
    terminal.decision.officialReadingExpansionAuthorized === false &&
    terminal.decision.lifecyclePromotionAuthorized === false &&
    terminal.decision.productionAdmissionAuthorized === false &&
    terminal.decision.production === 'HOLD';

  const checks = Object.freeze({
    exactTerminalVersion,
    terminalRevisionStructurallyComplete,
    zeroAuthoritySeekingRules,
    zeroRelationshipReplacementLeads,
    noSemanticCandidate,
    currentPreviewRuntimeIsolated,
    researchRequirementsNotFalselyResolved,
    priorBridgeReviewNotReusable,
    noDownstreamAuthorityAlreadyGranted,
  });

  const terminalSurfaceRepresentable = Object.values(checks).every(
    (value) => value === true,
  );

  const bridgeDecision: RelationshipNatalGeneralTerminalBridgeDecision =
    terminalSurfaceRepresentable &&
    noSemanticCandidate &&
    zeroRelationshipReplacementLeads
      ? 'CLOSED_NO_SEMANTIC_CANDIDATE'
      : 'REVIEW_INCONSISTENT';

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_NATAL_GENERAL_TERMINAL_BRIDGE_CLOSURE_VERSION,
    issue: '#1882' as const,
    capabilityKey: 'relationship:natal:general' as const,
    reviewedCandidateVersion: terminal.candidateVersion,
    reviewedTerminalRevisionId: terminal.revisionId,
    reviewedTerminalSurfaceHash: terminal.bridgeSurface.terminalSurfaceHash,
    checks,
    terminalSurfaceRepresentable,
    currentSurface: Object.freeze({
      authoritySeekingRuleCount: terminal.accounting.authoritySeekingRuleCount,
      relationshipReplacementLeadCount:
        terminal.accounting.relationshipReplacementLeadCount,
      semanticAdmissionCandidatePresent: false as const,
      currentResearchReturnTargetPresent: false as const,
      currentPreviewRuntimeSurfacePreserved: true as const,
      currentPreviewRuntimeSurfaceIsAuthoritySeekingSurface: false as const,
    }),
    futureCandidateBoundary: Object.freeze({
      futureCandidateRequirements:
        terminal.researchRequirementState.futureCandidateRequirements,
      futureResearchRequirementsGloballyResolved: false as const,
      currentTerminalSurfaceRequirementsApplicable: false as const,
      futureNewCandidateMustReopenResearchRequirements: true as const,
      futureNewCandidateRequiresNewBridgeReview: true as const,
      capabilityPermanentlyClosed: false as const,
    }),
    decision: Object.freeze({
      bridgeDecision,
      terminalBridgeReviewCompleted: terminalSurfaceRepresentable,
      bridgeTrackClosedForCurrentSurface:
        bridgeDecision === 'CLOSED_NO_SEMANTIC_CANDIDATE',
      returnToResearchRequiredForCurrentSurface: false as const,
      semanticAdmissionCandidatePresent: false as const,
      bridgeSemanticAdmissionAuthorized: false as const,
      engineAuthorityPromotionAuthorized: false as const,
      boundedEngineDevelopmentAdmissionAuthorized: false as const,
      currentSurfaceMayEnterEngineIntake: false as const,
      g2aAdmitted: false as const,
      previewMutationAuthorized: false as const,
      officialReadingExpansionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
      capabilityAuthorityDisposition:
        'UNADMITTED_NO_CURRENT_SEMANTIC_CANDIDATE' as const,
      nextOwner: 'none_until_new_relationship_semantic_candidate' as const,
      nextAction:
        'KEEP_RELATIONSHIP_NATAL_GENERAL_UNADMITTED_UNLESS_A_NEW_SOURCE_BOUNDED_CANDIDATE_REOPENS_RESEARCH_AND_BRIDGE_REVIEW' as const,
    }),
    prohibitedShortcuts: Object.freeze([
      'CLOSED_NO_SEMANTIC_CANDIDATE_DOES_NOT_MEAN_ADMITTED',
      'CLOSED_NO_SEMANTIC_CANDIDATE_DOES_NOT_MEAN_RELATIONSHIP_SEMANTIC_AUTHORITY',
      'TERMINAL_BRIDGE_CLOSE_DOES_NOT_DELETE_CURRENT_PREVIEW_RUNTIME_RULES',
      'NO_CURRENT_RESEARCH_RETURN_TARGET_DOES_NOT_MEAN_FUTURE_RESEARCH_PROHIBITED',
      'NOT_APPLICABLE_CURRENT_REQUIREMENTS_DOES_NOT_MEAN_GLOBALLY_RESOLVED',
      'ANY_FUTURE_CANDIDATE_MUST_REOPEN_RESEARCH_AND_NEW_BRIDGE_REVIEW',
      'NO_ENGINE_G2A_OFFICIAL_LIFECYCLE_OR_PRODUCTION_PROMOTION',
    ] as const),
  });

  return Object.freeze({
    closureId: `relationship_natal_general_terminal_bridge_closure_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
