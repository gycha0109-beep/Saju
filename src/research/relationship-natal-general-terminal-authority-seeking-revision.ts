import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_CANDIDATE_REVISION_VERSION,
  buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision,
} from './relationship-natal-general-authority-seeking-candidate-revision.js';
import {
  buildRelationshipNatalGeneralFreshBridgeRereview,
} from './relationship-natal-general-fresh-bridge-rereview.js';
import {
  buildRelationshipOutputExpressionReplacementAdjudication,
} from './relationship-output-expression-replacement-adjudication.js';
import {
  buildRelationshipPeerWealthReplacementAdjudication,
} from './relationship-peer-wealth-replacement-adjudication.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_SEEKING_REVISION_VERSION =
  '0.7.0-research-authority-seeking-terminal' as const;

export const RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_SEEKING_ARTIFACT_VERSION =
  'myeonghwa-relationship-natal-general-terminal-authority-seeking-revision-v1' as const;

export const RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_RULE_IDS =
  Object.freeze([] as const);

export const RELATIONSHIP_NATAL_GENERAL_TERMINAL_REPLACEMENT_LEADS =
  Object.freeze([] as const);

export const RELATIONSHIP_NATAL_GENERAL_FUTURE_CANDIDATE_REQUIREMENTS =
  Object.freeze([
    'RELATIONSHIP_SPECIFIC_SOURCE_SUPPORT_REQUIRED',
    'TEN_GOD_TO_RELATIONSHIP_DOMAIN_MAPPING_AUTHORITY_REQUIRED',
    'RELATIONSHIP_SCOPE_QUALIFIERS_COUNTEREXAMPLES_REQUIRED',
    'RELATIONSHIP_SCHOOL_DEPENDENCE_BOUNDARY_REQUIRED',
  ] as const);

function terminalReviewSurface() {
  return Object.freeze({
    candidateVersion:
      RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_SEEKING_REVISION_VERSION,
    ruleIds: Object.freeze([] as string[]),
    replacementLeadIds: Object.freeze([] as string[]),
    ruleTaxonomy: Object.freeze([] as string[]),
    methodologySourceIds: Object.freeze([] as string[]),
    ruleSourceBindings: Object.freeze([] as string[]),
  });
}

export function buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision() {
  const priorRevision =
    buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();
  const priorBridge = buildRelationshipNatalGeneralFreshBridgeRereview();
  const outputAdjudication =
    buildRelationshipOutputExpressionReplacementAdjudication();
  const peerWealthAdjudication =
    buildRelationshipPeerWealthReplacementAdjudication();

  const outputLeadTerminal =
    outputAdjudication.decision.adjudicationComplete === true &&
    outputAdjudication.decision.disposition ===
      'ABANDON_AS_RELATIONSHIP_REPLACEMENT_LEAD' &&
    outputAdjudication.decision.nextAuthoritySeekingRevisionShouldCarryThisLead ===
      false;

  const peerWealthLeadTerminal =
    peerWealthAdjudication.decision.adjudicationComplete === true &&
    peerWealthAdjudication.decision.disposition ===
      'ABANDON_AS_RELATIONSHIP_REPLACEMENT_LEAD' &&
    peerWealthAdjudication.decision
      .nextAuthoritySeekingRevisionShouldCarryThisLead === false &&
    peerWealthAdjudication
      .remainingRelationshipReplacementLeadsAfterThisAdjudication.length === 0;

  const priorZeroRuleSurfaceValid =
    priorRevision.candidateVersion ===
      RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_CANDIDATE_REVISION_VERSION &&
    priorRevision.accounting.authoritySeekingRuleCount === 0 &&
    priorRevision.authoritySeekingRuleIds.length === 0;

  const currentPreviewRuntimeSurfacePreserved =
    RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION === '0.5.0-research' &&
    RELATIONSHIP_NATAL_READING_RULES.length === 11 &&
    priorRevision.currentExecutableCandidate.runtimeMutationAuthorizedByRevision ===
      false &&
    priorRevision.currentExecutableCandidate.previewMutationAuthorizedByRevision ===
      false;

  const priorFreshBridgeReturnedToResearch =
    priorBridge.decision.freshBridgeRereviewCompleted === true &&
    priorBridge.decision.bridgeDecision === 'RETURN_TO_RESEARCH' &&
    priorBridge.decision.semanticAdmissionCandidatePresent === false &&
    priorBridge.decision.bridgeSemanticAdmissionAuthorized === false;

  const surface = terminalReviewSurface();
  const terminalSurfaceHash = deterministicContentHash(surface);
  const priorSurfaceHash =
    priorRevision.bridgeSurface.revisedCandidateSurfaceHash;
  const terminalSurfaceChangedFromPriorRevision =
    terminalSurfaceHash !== priorSurfaceHash;

  const futureResearchRequirementsGloballyResolved = false as const;
  const futureResearchRequirementsApplicableToCurrentTerminalSurface =
    false as const;
  const futureNewCandidateMustReopenResearchRequirements = true as const;

  const material = Object.freeze({
    artifactVersion:
      RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_SEEKING_ARTIFACT_VERSION,
    issue: '#1877' as const,
    capabilityKey: 'relationship:natal:general' as const,
    candidateVersion:
      RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_SEEKING_REVISION_VERSION,
    supersedesAuthoritySeekingCandidateVersion:
      RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_CANDIDATE_REVISION_VERSION,
    priorRevisionId: priorRevision.revisionId,
    priorFreshBridgeReviewId: priorBridge.reviewId,
    outputAdjudicationId: outputAdjudication.adjudicationId,
    peerWealthAdjudicationId: peerWealthAdjudication.adjudicationId,
    checks: Object.freeze({
      outputLeadTerminal,
      peerWealthLeadTerminal,
      priorZeroRuleSurfaceValid,
      currentPreviewRuntimeSurfacePreserved,
      priorFreshBridgeReturnedToResearch,
      terminalSurfaceChangedFromPriorRevision,
    }),
    authoritySeekingSurface: surface,
    authoritySeekingRuleIds:
      RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_RULE_IDS,
    replacementLeads:
      RELATIONSHIP_NATAL_GENERAL_TERMINAL_REPLACEMENT_LEADS,
    accounting: Object.freeze({
      authoritySeekingRuleCount:
        RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_RULE_IDS.length,
      relationshipReplacementLeadCount:
        RELATIONSHIP_NATAL_GENERAL_TERMINAL_REPLACEMENT_LEADS.length,
      abandonedRelationshipReplacementLeadCount: 2 as const,
      currentPreviewRuntimeRuleCount: RELATIONSHIP_NATAL_READING_RULES.length,
    }),
    researchRequirementState: Object.freeze({
      futureCandidateRequirements:
        RELATIONSHIP_NATAL_GENERAL_FUTURE_CANDIDATE_REQUIREMENTS,
      futureResearchRequirementsGloballyResolved,
      futureResearchRequirementsApplicableToCurrentTerminalSurface,
      currentTerminalSurfaceResearchRequirementDisposition:
        'NOT_APPLICABLE_NO_SEMANTIC_CANDIDATE' as const,
      futureNewCandidateMustReopenResearchRequirements,
      exactRuleDispositionAlreadyComplete: true as const,
      bothReplacementLeadAdjudicationsComplete:
        outputLeadTerminal && peerWealthLeadTerminal,
    }),
    bridgeSurface: Object.freeze({
      priorSurfaceHash,
      terminalSurfaceHash,
      terminalSurfaceChangedFromPriorRevision,
      priorFreshBridgeReviewReusableForTerminalRevision: false as const,
      freshBridgeRereviewRequiredToCloseTerminalSurface: true as const,
      freshBridgeRereviewCanCreateSemanticCandidate: false as const,
    }),
    currentExecutableCandidate: Object.freeze({
      version: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
      ruleCount: RELATIONSHIP_NATAL_READING_RULES.length,
      runtimeMutationAuthorizedByTerminalRevision: false as const,
      previewMutationAuthorizedByTerminalRevision: false as const,
      authoritySeekingSurface: false as const,
    }),
    decision: Object.freeze({
      terminalRevisionStructurallyComplete:
        outputLeadTerminal &&
        peerWealthLeadTerminal &&
        priorZeroRuleSurfaceValid &&
        currentPreviewRuntimeSurfacePreserved &&
        priorFreshBridgeReturnedToResearch &&
        terminalSurfaceChangedFromPriorRevision &&
        RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_RULE_IDS.length === 0 &&
        RELATIONSHIP_NATAL_GENERAL_TERMINAL_REPLACEMENT_LEADS.length === 0,
      semanticAdmissionCandidatePresent: false as const,
      relationshipReplacementResearchLeadPresent: false as const,
      relationshipSemanticAuthorityEstablished: false as const,
      currentRuntimeMutationAuthorized: false as const,
      previewMutationAuthorized: false as const,
      bridgeAdmissionAuthorized: false as const,
      boundedEngineDevelopmentAdmissionAuthorized: false as const,
      g2aAdmissionAuthorized: false as const,
      officialReadingExpansionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
      nextAction:
        'RUN_FRESH_BRIDGE_REREVIEW_AGAINST_THE_TERMINAL_ZERO_RULE_ZERO_REPLACEMENT_LEAD_SURFACE' as const,
    }),
    prohibitedExtensions: Object.freeze([
      'TERMINAL_ZERO_CANDIDATE_SURFACE_DOES_NOT_MEAN_RELATIONSHIP_SEMANTIC_AUTHORITY',
      'ZERO_REPLACEMENT_LEADS_DOES_NOT_DELETE_CURRENT_PREVIEW_RUNTIME_RULES',
      'NOT_APPLICABLE_TO_CURRENT_SURFACE_DOES_NOT_MEAN_FUTURE_SOURCE_REQUIREMENTS_RESOLVED',
      'ANY_FUTURE_NEW_RELATIONSHIP_RULE_MUST_REOPEN_SOURCE_MAPPING_SCOPE_AND_SCHOOL_REVIEW',
      'FRESH_BRIDGE_REREVIEW_REQUIRED_DOES_NOT_MEAN_BRIDGE_ADMISSION',
      'NO_RUNTIME_PREVIEW_ENGINE_G2A_OFFICIAL_LIFECYCLE_OR_PRODUCTION_PROMOTION',
    ] as const),
  });

  return Object.freeze({
    revisionId: `relationship_natal_general_terminal_authority_seeking_revision_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
