import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipNatalGeneralRuntimeAdequacyEvidence,
} from './relationship-natal-general-runtime-adequacy-evidence.js';
import {
  buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence,
} from './relationship-natal-general-source-authority-discovery-evidence.js';
import {
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITION_VERSION =
  'myeonghwa-relationship-natal-general-final-rule-disposition-v1' as const;

export type RelationshipNatalGeneralFinalDisposition =
  | 'NARROW'
  | 'REMOVE';

export const RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS = Object.freeze([
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-PEER-EQUAL-FOOTING',
    finalDisposition: 'REMOVE' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'No qualifying inspected source establishes equal-footing, retained-choice-space, or distancing-under-interference semantics from Peer-family presence.',
    preservedResearchLead: null,
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-RESOURCE-UNDERSTAND-BEFORE-CLOSE',
    finalDisposition: 'REMOVE' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'No qualifying relationship-domain source establishes understand-before-closeness, trust-before-opening, or process-before-response semantics from Resource-family presence.',
    preservedResearchLead: null,
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-OUTPUT-EXPRESS-TO-CONNECT',
    finalDisposition: 'NARROW' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'Scholarly evidence supports an Output/Hurting-Officer expression axis, but not the current relationship-connection or constrained-expression outcome.',
    preservedResearchLead: 'OUTPUT_EXPRESSION_AXIS_ONLY',
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-WEALTH-PRACTICAL-RECIPROCITY',
    finalDisposition: 'REMOVE' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'General Wealth semantics do not establish practical reciprocity, balanced caregiving, or relationship-equity preferences.',
    preservedResearchLead: null,
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-OFFICER-RELIABLE-BOUNDARY',
    finalDisposition: 'REMOVE' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'Rules/responsibility vocabulary does not establish the current close-relationship promise, reliability, or boundary-preference claim.',
    preservedResearchLead: null,
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-PEER-OFFICER-AUTONOMY-WITH-BOUNDARY',
    finalDisposition: 'REMOVE' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'No qualifying source establishes autonomy-versus-boundary relationship preference from simple Peer-plus-Officer family co-presence.',
    preservedResearchLead: null,
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-RESOURCE-OUTPUT-PROCESS-THEN-SPEAK',
    finalDisposition: 'REMOVE' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'Resource/Output structural relations do not establish the current process-then-speak communication sequence or conflict-reduction outcome.',
    preservedResearchLead: null,
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-OUTPUT-WEALTH-WORDS-TO-ACTION',
    finalDisposition: 'REMOVE' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'Output-generates-Wealth structure does not establish words-to-action trust semantics in general relationships.',
    preservedResearchLead: null,
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-OFFICER-RESOURCE-CARE-THROUGH-PREPARATION',
    finalDisposition: 'REMOVE' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'Officer-generates-Resource structure does not establish caregiving-through-preparation as a general relationship expression style.',
    preservedResearchLead: null,
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
    finalDisposition: 'NARROW' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'A conditional Peer/Rob-Wealth-versus-Wealth competition pattern is observed, but it requires contextual predicates and does not establish the current modern shared-time/money/energy relationship narrative.',
    preservedResearchLead:
      'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_WITH_EXPLICIT_CONTEXT',
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
  Object.freeze({
    ruleId: 'RULE-RELATIONSHIP-NATAL-WEALTH-RESOURCE-SOLVE-VS-UNDERSTAND',
    finalDisposition: 'REMOVE' as RelationshipNatalGeneralFinalDisposition,
    reason:
      'Wealth/Resource conflict structure does not establish the current solve-versus-understand psychological relationship claim.',
    preservedResearchLead: null,
    currentRuleRetained: false as const,
    replacementRuleAuthoringAuthorized: false as const,
  }),
] as const);

export const RELATIONSHIP_NATAL_GENERAL_FINAL_DISPOSITION_SUPPLEMENTARY_SOURCES =
  Object.freeze([
    Object.freeze({
      sourceId: 'KCI-ART003257007',
      title:
        '현대적 상담심리에서 명리학 십성(十星)과 에니어그램 성격유형 간 융합적 적용',
      year: 2025,
      inspectedSurface: 'KCI indexed abstract',
      support:
        'Supports use of Ten-God concepts in a behavior-motivation-relationship counseling framework, but does not establish any of the current eleven exact mappings.',
      exactRuleAuthorityEstablished: false as const,
    }),
    Object.freeze({
      sourceId: 'KCI-ART002810441',
      title: '명리학에서 십성(十星)의 성립과 개념 확장에 관한 연구',
      year: 2021,
      inspectedSurface: 'KCI indexed abstract',
      support:
        'Documents that classical Ten-God material was primarily kin-role oriented and that broader psychological/aptitude expansion is a later development, reinforcing the need to source modern domain projections explicitly.',
      exactRuleAuthorityEstablished: false as const,
    }),
    Object.freeze({
      sourceId: 'NAMETORY-KIM-HYUNSUK-KIM-MANTAE-2020-PDF-LISTING',
      title: '엔터테인먼트 종사자의 명리학적 특성 분석',
      year: 2020,
      inspectedSurface:
        'author research-page metadata and public PDF attachment listing; exact PDF body not directly inspected by the current fetch surface',
      support:
        'Supports a bounded Output/Hurting-Officer expression lead in an occupational/creativity context only.',
      exactRuleAuthorityEstablished: false as const,
    }),
    Object.freeze({
      sourceId: 'SAJUCHEOPGYEONG-GUNGYEOPJAENGJAE-WEB-REPRODUCTION',
      title: '군겁쟁재(群劫爭財) 『사주첩경(四柱捷徑)』',
      year: null,
      inspectedSurface: 'public attributed reproduction',
      support:
        'Requires multiple Peer/Rob-Wealth actors and a Wealth-use context; does not support simple family co-presence or the current modern relationship wording.',
      exactRuleAuthorityEstablished: false as const,
    }),
  ] as const);

function exactLiveSurface(): boolean {
  const liveRuleIds = RELATIONSHIP_NATAL_READING_RULES.map((rule) => rule.ruleId).sort();
  const dispositionRuleIds = RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS
    .map((row) => row.ruleId)
    .sort();

  return (
    liveRuleIds.length === dispositionRuleIds.length &&
    liveRuleIds.every(
      (ruleId, index) => ruleId === dispositionRuleIds[index],
    )
  );
}

export function buildRelationshipNatalGeneralFinalRuleDisposition() {
  const phase1 = buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence();
  const phase3 = buildRelationshipNatalGeneralRuntimeAdequacyEvidence();
  const currentSurfaceExact = exactLiveSurface();

  const retainCount = 0 as const;
  const narrowCount = RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS.filter(
    (row) => row.finalDisposition === 'NARROW',
  ).length;
  const removeCount = RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS.filter(
    (row) => row.finalDisposition === 'REMOVE',
  ).length;
  const currentRuleRetainedCount =
    RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS.filter(
      (row) => row.currentRuleRetained,
    ).length;
  const replacementRuleAuthoringAuthorizedCount =
    RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS.filter(
      (row) => row.replacementRuleAuthoringAuthorized,
    ).length;

  const exactRuleRetainNarrowRemoveDecisionComplete =
    phase1.exactCurrentRuleSurface &&
    phase3.decision.phase3Complete &&
    currentSurfaceExact &&
    RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS.length === 11 &&
    retainCount === 0 &&
    narrowCount === 2 &&
    removeCount === 9 &&
    currentRuleRetainedCount === 0 &&
    replacementRuleAuthoringAuthorizedCount === 0;

  const material = Object.freeze({
    version: RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITION_VERSION,
    issue: '#1807' as const,
    phase: 'PHASE_4_FINAL_RETAIN_NARROW_REMOVE_DISPOSITION' as const,
    capabilityKey: 'relationship:natal:general' as const,
    upstreamPhase1EvidenceId: phase1.evidenceId,
    upstreamPhase3EvidenceId: phase3.evidenceId,
    currentSurfaceExact,
    supplementarySources:
      RELATIONSHIP_NATAL_GENERAL_FINAL_DISPOSITION_SUPPLEMENTARY_SOURCES,
    dispositions: RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS,
    counts: Object.freeze({
      ruleCount: RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS.length,
      retainCount,
      narrowCount,
      removeCount,
      currentRuleRetainedCount,
      replacementRuleAuthoringAuthorizedCount,
    }),
    decision: Object.freeze({
      exactRuleRetainNarrowRemoveDecisionComplete,
      currentElevenRuleSurfaceMayBePromotedUnchanged: false as const,
      currentElevenRuleSurfaceMayRemainAuthoritySeekingUnchanged: false as const,
      currentRuntimeMutationAuthorizedByThisResearchArtifact: false as const,
      narrowedResearchLeadsAreAdmittedRelationshipRules: false as const,
      candidateRevisionRequiredBeforeAnyFreshBridgeAuthorityReview: true as const,
      nextAction:
        'CREATE_A_SEPARATE_RESEARCH_CANDIDATE_REVISION_THAT_REMOVES_THE_NINE_UNSUPPORTED_RULES_AND_PRESERVES_THE_TWO_NARROWED_PATHS_AS_NON_ADMITTED_RESEARCH_LEADS' as const,
    }),
    remainingResearchClosure: Object.freeze({
      relationshipSpecificSourceSupportComplete: false as const,
      tenGodToRelationshipDomainMappingAuthorityComplete: false as const,
      scopeQualifiersCounterexamplesComplete: false as const,
      schoolDependenceBoundaryComplete: false as const,
      exactRuleRetainNarrowRemoveDecisionComplete,
    }),
    prohibitedExtensions: Object.freeze([
      'NO_NARROW_DISPOSITION_AS_RULE_AUTHORITY',
      'NO_REMOVE_DISPOSITION_AS_RUNTIME_MUTATION_AUTHORITY',
      'NO_OCCUPATIONAL_EXPRESSION_FINDING_AS_GENERAL_RELATIONSHIP_OUTCOME',
      'NO_GUNGYEOPJAENGJAE_AS_SIMPLE_PEER_WEALTH_COPRESENCE',
      'NO_MODERN_SHARED_TIME_MONEY_ENERGY_SEMANTICS_FROM_CLASSICAL_WEALTH_COMPETITION',
      'NO_PREVIEW_USAGE_AS_REASON_TO_RETAIN_UNSUPPORTED_RULES',
      'NO_ENGINE_G2A_OFFICIAL_OR_PRODUCTION_PROMOTION',
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
    dispositionId: `relationship_natal_general_final_rule_disposition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
