import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  R022_AUTHORITY,
  R022_EXECUTION_GAPS,
  R022_WEALTH_PATTERN_PROPOSITIONS,
} from './general-natal-wealth-pattern-conditions.js';
import {
  R050_AUTHORITY,
  R050_TEN_GOD_PAIR_MATRIX,
} from './general-natal-ten-god-pair-matrix.js';
import {
  buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence,
} from './relationship-natal-general-targeted-source-adequacy-evidence.js';
import {
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_NATAL_GENERAL_RUNTIME_ADEQUACY_EVIDENCE_VERSION =
  'myeonghwa-relationship-natal-general-runtime-adequacy-evidence-v1' as const;

export const RELATIONSHIP_NATAL_GENERAL_RUNTIME_PATHS = Object.freeze([
  Object.freeze({
    pathId: 'OUTPUT_EXPRESSION_AXIS',
    currentRuleId: 'RULE-RELATIONSHIP-NATAL-OUTPUT-EXPRESS-TO-CONNECT',
    sourceState: Object.freeze({
      exactMemberExpressionAxisObserved: true as const,
      sourceDomain: 'occupation_creativity_case_analysis' as const,
      relationshipConnectionOutcomeEstablished: false as const,
      exactRelevantBodyPassageDirectlyInspected: false as const,
      sourceAdequateForRelationshipRule: false as const,
    }),
    runtimeState: Object.freeze({
      canonicalTenGodMemberIdentityPreserved: true as const,
      canonicalTenGodPositionPreserved: true as const,
      currentRuleConsumesFamilyPresenceOnly: true as const,
      exactMemberNarrowingTechnicallyRepresentable: true as const,
      relationshipDomainPredicateAvailable: false as const,
    }),
    disposition:
      'TECHNICALLY_REPRESENTABLE_BUT_RELATIONSHIP_SOURCE_AUTHORITY_MISSING' as const,
    engineRuleAuthoringAuthorized: false as const,
    nextResearchAction:
      'ACQUIRE_RELATIONSHIP_DOMAIN_SOURCE_FOR_OUTPUT_EXPRESSION_OR_REMOVE_RELATIONSHIP_PROJECTION' as const,
  }),
  Object.freeze({
    pathId: 'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION',
    currentRuleId:
      'RULE-RELATIONSHIP-NATAL-PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
    sourceState: Object.freeze({
      conditionalPeerWealthCompetitionPatternObserved: true as const,
      inspectedSurface:
        'secondary_web_reproduction_attributed_to_saju_cheopgyeong' as const,
      directPrimaryFacsimileInspected: false as const,
      simplePeerWealthCopresenceSufficient: false as const,
      modernSharedTimeMoneyEnergyRelationshipMeaningEstablished: false as const,
      sourceAdequateForCurrentRelationshipRule: false as const,
    }),
    requiredPredicates: Object.freeze([
      'MULTIPLE_EFFECTIVE_PEER_OR_ROB_WEALTH_SOURCES',
      'EFFECTIVE_PEER_STRENGTH_OR_SUPPORT',
      'USABLE_WEALTH_TARGET',
      'PEER_TO_WEALTH_EFFECTIVE_CONTACT',
      'WEALTH_USE_CONTEXT',
      'OFFICER_CONTROL_MODIFIER_IF_PRESENT',
      'OUTPUT_TRANSFORMATION_MODIFIER_IF_PRESENT',
    ] as const),
    runtimeState: Object.freeze({
      canonicalExactTenGodMembersAvailable: true as const,
      currentRuleConsumesFamilyPresenceOnly: true as const,
      currentCanonicalDerivedFactsExposeFinalStrengthResolver: false as const,
      currentCanonicalDerivedFactsExposeWealthUseResolver: false as const,
      currentCanonicalDerivedFactsExposeEffectivePeerWealthContactResolver: false as const,
      currentCanonicalDerivedFactsExposeControlTransformationEffectResolver: false as const,
      researchModulesContainPartialContextEvidence: true as const,
      researchModulesAuthorizeExecutableResolver: false as const,
    }),
    disposition:
      'CONDITIONAL_SOURCE_PATH_NOT_EXECUTABLE_WITH_CURRENT_CANONICAL_INPUT_CONTRACT' as const,
    engineRuleAuthoringAuthorized: false as const,
    nextResearchAction:
      'ACQUIRE_PRIMARY_OR_HIGHER_PROVENANCE_PATTERN_SURFACE_AND_DEFINE_GOVERNED_CONTEXT_PREDICATES_BEFORE_ANY_RELATIONSHIP_RULE' as const,
  }),
] as const);

function currentRuleUsesFamilyPresenceOnly(ruleId: string): boolean {
  const rule = RELATIONSHIP_NATAL_READING_RULES.find(
    (candidate) => candidate.ruleId === ruleId,
  );
  if (rule === undefined) return false;
  return (
    rule.inputs.length > 0 &&
    rule.inputs.every(
      (input) =>
        input.source === 'interpretation_claim' &&
        input.pathOrClaimType.startsWith('TEN_GOD_FAMILY_') &&
        input.pathOrClaimType.endsWith('_PRESENT'),
    )
  );
}

function peerWealthInternalResearchBoundaryValid(): boolean {
  const peerWealthRows = R050_TEN_GOD_PAIR_MATRIX.filter(
    (row) =>
      row.fromFamily === 'PEER' &&
      row.toFamily === 'WEALTH',
  );
  const wealthPatternHasContextualPeerFailure = R022_WEALTH_PATTERN_PROPOSITIONS.some(
    (row) =>
      row.id === 'light-wealth-heavy-peer' &&
      row.executable === false,
  );
  return (
    peerWealthRows.length > 0 &&
    peerWealthRows.every((row) => row.executable === false) &&
    R050_AUTHORITY.presenceOnlyPolarityAuthorized === false &&
    R050_AUTHORITY.executableRelationResolverAuthorized === false &&
    wealthPatternHasContextualPeerFailure &&
    R022_AUTHORITY.executableWealthPatternResolverAuthorized === false &&
    R022_EXECUTION_GAPS.includes('CAI_QING_RELATIVE_LIGHTNESS') &&
    R022_EXECUTION_GAPS.includes('BI_ZHONG_RELATIVE_HEAVINESS') &&
    R022_EXECUTION_GAPS.includes('BODY_STRENGTH')
  );
}

export function buildRelationshipNatalGeneralRuntimeAdequacyEvidence() {
  const phase2 = buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence();
  const narrowedPathIds = phase2.targetedRuleAdequacy
    .filter((row) => 'narrowerResearchTarget' in row)
    .map((row) => row.ruleId)
    .sort();
  const runtimePathRuleIds = RELATIONSHIP_NATAL_GENERAL_RUNTIME_PATHS
    .map((row) => row.currentRuleId)
    .sort();

  const exactNarrowedPathSurface =
    narrowedPathIds.length === runtimePathRuleIds.length &&
    narrowedPathIds.every(
      (ruleId, index) => ruleId === runtimePathRuleIds[index],
    );

  const currentRulesStillUseFamilyPresenceOnly =
    RELATIONSHIP_NATAL_GENERAL_RUNTIME_PATHS.every((row) =>
      currentRuleUsesFamilyPresenceOnly(row.currentRuleId),
    );

  const peerWealthResearchBoundaryValid =
    peerWealthInternalResearchBoundaryValid();

  const material = Object.freeze({
    evidenceVersion:
      RELATIONSHIP_NATAL_GENERAL_RUNTIME_ADEQUACY_EVIDENCE_VERSION,
    issue: '#1807' as const,
    phase: 'PHASE_3_RUNTIME_AND_SOURCE_PREDICATE_ADEQUACY' as const,
    capabilityKey: 'relationship:natal:general' as const,
    upstreamPhase2EvidenceId: phase2.evidenceId,
    exactNarrowedPathSurface,
    currentRulesStillUseFamilyPresenceOnly,
    peerWealthResearchBoundaryValid,
    runtimePaths: RELATIONSHIP_NATAL_GENERAL_RUNTIME_PATHS,
    runtimePathCount: RELATIONSHIP_NATAL_GENERAL_RUNTIME_PATHS.length,
    engineAuthorablePathCount:
      RELATIONSHIP_NATAL_GENERAL_RUNTIME_PATHS.filter(
        (row) => row.engineRuleAuthoringAuthorized,
      ).length,
    findings: Object.freeze({
      outputExactMemberPredicateTechnicallyRepresentable: true as const,
      outputRelationshipSemanticAuthorityEstablished: false as const,
      peerWealthConditionalPatternRequiresMoreThanFamilyPresence: true as const,
      peerWealthRequiredContextFullyAvailableInCanonicalFacts: false as const,
      peerWealthExecutableResolverAuthorizedByExistingResearch: false as const,
      exactBodyPassageClosureComplete: false as const,
    }),
    researchClosure: Object.freeze({
      relationshipSpecificSourceSupportComplete: false as const,
      tenGodToRelationshipDomainMappingAuthorityComplete: false as const,
      scopeQualifiersCounterexamplesComplete: false as const,
      schoolDependenceBoundaryComplete: false as const,
      exactRuleRetainNarrowRemoveDecisionComplete: false as const,
    }),
    decision: Object.freeze({
      phase3Complete:
        exactNarrowedPathSurface &&
        currentRulesStillUseFamilyPresenceOnly &&
        peerWealthResearchBoundaryValid,
      bridgeReentryReady: false as const,
      engineAuthorityAdmissionReady: false as const,
      currentElevenRuleSurfaceMayBePromotedUnchanged: false as const,
      nextAction:
        'CLOSE_SOURCE_BODY_AND_CONTEXT_PREDICATE_GAPS_THEN_FREEZE_FINAL_RETAIN_NARROW_REMOVE_DECISION' as const,
    }),
    prohibitedExtensions: Object.freeze([
      'NO_OCCUPATIONAL_OUTPUT_EXPRESSION_EVIDENCE_AS_RELATIONSHIP_CONNECTION_AUTHORITY',
      'NO_EXACT_TEN_GOD_MEMBER_AVAILABILITY_AS_SEMANTIC_AUTHORITY',
      'NO_PEER_WEALTH_COPRESENCE_AS_GUNGYEOPJAENGJAE',
      'NO_RESEARCH_ONLY_STRENGTH_OR_WEALTH_PATTERN_EVIDENCE_AS_CANONICAL_EXECUTABLE_FACTS',
      'NO_SECONDARY_WEB_REPRODUCTION_AS_PRIMARY_FACSIMILE',
      'NO_CLASSICAL_WEALTH_COMPETITION_TO_MODERN_SHARED_TIME_ENERGY_INFERENCE',
      'NO_ENGINE_G2A_OFFICIAL_OR_PRODUCTION_PROMOTION',
    ] as const),
    authorityBoundary: Object.freeze({
      sourceGroundedAiInternalReviewPassed: false as const,
      boundedEngineDevelopmentAdmissionAuthorized: false as const,
      g2aAdmitted: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingExpansionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    evidenceId: `relationship_natal_general_runtime_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
