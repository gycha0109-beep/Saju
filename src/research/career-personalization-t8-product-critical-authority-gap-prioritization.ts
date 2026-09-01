import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  CAREER_NATAL_READING_RULES,
} from './career-natal-reading-candidate.js';
import {
  CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
} from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_METHODOLOGY_GATE,
  careerMethodologyDecision,
} from './career-personalization-methodology-gate.js';
import { CAREER_T5_SUBTYPE_CLAIM_TYPE } from './career-personalized-t5-substrate.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_WITNESS_CRITICALITY_GOVERNANCE_VERSION,
  CAREER_T8_B79_CRITICALITY_GOVERNANCE_CONTROL_IDS,
  CAREER_T8_B79_PRODUCT_CRITICAL_REACTIVATION_CONDITION_IDS,
  CAREER_T8_B79_RESEARCH_BACKLOG_IDS,
  CAREER_T8_B79_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernanceReport,
} from './career-personalization-t8-classical-ziping-operational-clash-witness-criticality-governance.js';

export const CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION_VERSION =
  'myeonghwa-career-personalization-t8-product-critical-authority-gap-prioritization-v1' as const;

export const CAREER_T8_B80_REVIEWED_REPOSITORY_COMMIT_SHA =
  '1013238884455951b2aa38ef749ec8aa51f7f4fb' as const;

export const CAREER_T8_B80_EXACT_SUBTYPE_CURRENT_SOURCE_IDS = Object.freeze([
  'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
] as const);

export const CAREER_T8_B80_PRIORITY_ORDER = Object.freeze([
  'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
  'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
  'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
  'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
  'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
  'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
] as const satisfies readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][]);

export const CAREER_T8_B80_PRIORITY_CONTROL_IDS = Object.freeze([
  'B80_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B79_GOVERNANCE_BOUNDARY',
  'B80_PRIORITY_INVENTORY_MUST_EQUAL_THE_SIX_CURRENT_SYNTHESIS_AUTHORITY_GAPS',
  'PRODUCT_IMPACT_ORDER_IS_RESEARCH_EXECUTION_ORDER_NOT_INTERPRETIVE_WEIGHT',
  'EXACT_SUBTYPE_MULTI_CLAIM_BINDING_IS_THE_IMMEDIATE_PRODUCT_CRITICAL_GAP',
  'EXACT_SUBTYPE_CURRENT_SOURCE_AUTHORITY_REMAINS_T5_ONLY',
  'EXACT_SUBTYPE_CROSS_TIER_CAREER_BINDING_REMAINS_ABSENT',
  'LEGACY_RAW_FACT_DIRECT_T8_RULES_ARE_NOT_A_PERSONALIZED_MULTI_CLAIM_CANDIDATE',
  'NO_EXISTING_LEGACY_T8_RULE_MAY_BE_PROMOTED_OR_REUSED_BY_B80',
  'FAMILY_RELATION_BRIDGE_REMAINS_A_SEPARATE_T5_TO_T8_AUTHORITY_GAP',
  'BRANCH_CLASH_VISIBILITY_POSITION_PLURALITY_AND_SEASONAL_EFFECTS_REMAIN_CONTEXT_ONLY',
  'CONFLICT_TENSION_POLICY_REMAINS_DEPENDENCY_LATE_UNTIL_MULTIPLE_PERSONALIZED_T8_PATTERNS_EXIST',
  'NO_GAP_PRIORITY_MAY_CREATE_A_SEMANTIC_RULE_OR_CLAIM_TYPE',
  'NO_NUMERIC_CAREER_WEIGHT_SCORE_OR_OUTCOME_RANK_IS_AUTHORIZED',
  'NO_CALCULATION_INTERPRETATION_NARRATIVE_PREVIEW_OR_PRODUCTION_BEHAVIOR_CHANGE_IS_AUTHORIZED',
  'NEXT_GATE_REVIEWS_SOURCE_OR_METHOD_CANDIDATES_FOR_THE_SELECTED_EXACT_SUBTYPE_BRIDGE_ONLY',
] as const);

export type CareerT8B80AuthorityGapId =
  (typeof CAREER_T8_B80_PRIORITY_ORDER)[number];

export type CareerT8B80AuthorityState =
  | 'LOWER_TIER_T5_AUTHORITY_ONLY'
  | 'BOUNDED_T6_CONTEXT_ONLY'
  | 'MISSING_AUTHORITY';

export type CareerT8B80PriorityBand =
  | 'IMMEDIATE_PRODUCT_CRITICAL'
  | 'NEXT_T5_COMPOSITION'
  | 'FOLLOWING_T6_MODIFIER'
  | 'DEPENDENCY_LATE';

export interface CareerT8B80AuthorityGapPriorityRecord {
  gapId: CareerT8B80AuthorityGapId;
  researchOrder: 1 | 2 | 3 | 4 | 5 | 6;
  priorityBand: CareerT8B80PriorityBand;
  currentAuthorityState: CareerT8B80AuthorityState;
  rationale: string;
  semanticRuleAuthoringAuthorized: false;
  numericInterpretiveWeightAuthorized: false;
}

export interface CareerT8B80ExactSubtypeCandidateAudit {
  selectedGapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING';
  exactSubtypeMethodologyMode: 'consume';
  exactSubtypeAuthorizedSemanticTiers: readonly ['T5'];
  exactSubtypeSourceIds: readonly string[];
  exactSubtypeT5SourceAuthorityPresent: boolean;
  exactSubtypeT5ClaimType: typeof CAREER_T5_SUBTYPE_CLAIM_TYPE;
  exactSubtypeCrossTierCareerBindingAuthorityPresent: false;
  reviewedPersonalizedMultiClaimCareerBindingCandidateCount: 0;
  legacyDirectT8CandidateObserved: boolean;
  legacyCandidateVersion: typeof CAREER_NATAL_READING_CANDIDATE_VERSION;
  legacyCandidateRuleCount: 20;
  legacyCandidateReadsRawDerivedTenGodFact: boolean;
  legacyCandidateConsumesPersonalizedT5Claims: false;
  legacyCandidateUsableAsPersonalizedBridge: false;
  sourceCandidateState:
    | 'LOWER_TIER_SOURCE_PRESENT_CROSS_TIER_CAREER_BINDING_CANDIDATE_ABSENT';
}

export interface CareerPersonalizationT8ProductCriticalAuthorityGapPrioritizationReport {
  prioritizationId: string;
  prioritizationVersion: typeof CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION'
    | 'UPSTREAM_B79_BOUNDARY_INVALID';
  decision:
    | 'SIX_GAPS_PRIORITIZED_EXACT_SUBTYPE_MULTI_CLAIM_BRIDGE_SELECTED_FOR_SOURCE_CANDIDATE_REVIEW_NO_T8_AUTHORING'
    | 'CAREER_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION_NOT_ESTABLISHED';
  upstreamB79GovernanceId: string;
  exactB79BoundaryAccepted: boolean;
  reviewedRepository: 'gycha0109-beep/Saju';
  reviewedRepositoryCommitSha: typeof CAREER_T8_B80_REVIEWED_REPOSITORY_COMMIT_SHA;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research_governance';
  exactGapInventoryAccepted: boolean;
  priorityRecords: readonly CareerT8B80AuthorityGapPriorityRecord[];
  priorityRecordCount: 6 | 0;
  selectedImmediateGapId:
    | 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING'
    | null;
  exactSubtypeCandidateAudit: CareerT8B80ExactSubtypeCandidateAudit | null;
  productPriorityIsInterpretiveWeight: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  legacyCareerT8ReuseAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B80_PRIORITY_CONTROL_IDS)[number][];
  controlCount: 15 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    priorityGovernanceRecordsCreated: 1 | 0;
    sourceCandidateAuditsCreated: 1 | 0;
    methodologyDefinitionsCreated: 0;
    semanticRuleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    calculationBehaviorsChanged: 0;
    interpretationBehaviorsChanged: 0;
    narrativeBehaviorsChanged: 0;
    previewRoutesChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION';
}

function contentAddressedB79IdentityValid(
  b79: CareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernanceReport,
): boolean {
  const { governanceId, ...material } = b79;
  return (
    governanceId ===
    `career_personalization_t8_classical_ziping_operational_clash_witness_criticality_governance_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB79Accepted(
  b79: CareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernanceReport,
): boolean {
  return (
    contentAddressedB79IdentityValid(b79) &&
    b79.governanceVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_WITNESS_CRITICALITY_GOVERNANCE_VERSION &&
    b79.status === 'RESOLVED_OPERATIONAL_CLASH_WITNESS_PRODUCT_CRITICALITY_GOVERNANCE' &&
    b79.decision ===
      'EXACT_WITNESS_COMPLETENESS_RETAINED_AS_OPEN_RESEARCH_BACKLOG_CURRENT_PRODUCT_BLOCKER_RELEASED_NO_POSITIVE_CLASH_EFFECT_AUTHORITY' &&
    b79.reviewedRepository === 'gycha0109-beep/Saju' &&
    b79.reviewedRepositoryCommitSha === CAREER_T8_B79_REVIEWED_REPOSITORY_COMMIT_SHA &&
    b79.domain === 'career' &&
    b79.temporalScope === 'natal' &&
    b79.statusClass === 'research_governance' &&
    b79.productCriticalityQuestionApplied &&
    b79.b78ClassicalSignalRetained &&
    b79.b78EvidenceDiscarded === false &&
    b79.exactHistoricalWitnessResearchOpen &&
    b79.exactHistoricalWitnessProductBlockerReleased &&
    b79.b77ReopenAuthorized === false &&
    b79.b63NegativeGuardRetained &&
    b79.b63NegativeGuardProductCritical &&
    b79.b64AuthorizedConstraintCount === 5 &&
    b79.positiveOperationalClashEffectRuleAuthorized === false &&
    b79.researchBacklogCount === 6 &&
    deterministicContentHash(b79.researchBacklogIds) ===
      deterministicContentHash(CAREER_T8_B79_RESEARCH_BACKLOG_IDS) &&
    b79.productCriticalReactivationConditionCount === 5 &&
    deterministicContentHash(b79.productCriticalReactivationConditionIds) ===
      deterministicContentHash(CAREER_T8_B79_PRODUCT_CRITICAL_REACTIVATION_CONDITION_IDS) &&
    b79.productCriticalReactivationConditionCurrentlySatisfiedCount === 0 &&
    b79.selectedImmediateProductLane ===
      'CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION' &&
    b79.productionPromotionAuthorized === false &&
    b79.productionImpact === 'NONE' &&
    b79.controlCount === 18 &&
    b79.controlsFrozen &&
    deterministicContentHash(b79.controlIds) ===
      deterministicContentHash(CAREER_T8_B79_CRITICALITY_GOVERNANCE_CONTROL_IDS) &&
    b79.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION'
  );
}

function exactGapInventoryStillAccepted(): boolean {
  return (
    CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.length === 6 &&
    CAREER_T8_B80_PRIORITY_ORDER.length === 6 &&
    deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) ===
      deterministicContentHash(CAREER_T8_B80_PRIORITY_ORDER)
  );
}

function exactSubtypeCandidateAudit(): CareerT8B80ExactSubtypeCandidateAudit | null {
  const decision = careerMethodologyDecision('exact_ten_god_subtype');
  const exactSourceAccepted =
    decision.mode === 'consume' &&
    decision.authorizedSemanticTiers.length === 1 &&
    decision.authorizedSemanticTiers[0] === 'T5' &&
    decision.directCareerT8Authorized === false &&
    deterministicContentHash(decision.sourceIds) ===
      deterministicContentHash(CAREER_T8_B80_EXACT_SUBTYPE_CURRENT_SOURCE_IDS) &&
    CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints
      .sourceVocabularyMayBecomeCareerOutcomeWithoutRule === false;

  const legacyReadsRawFacts = CAREER_NATAL_READING_RULES.every(
    (rule) =>
      rule.taxonomy.tier === 'T8' &&
      rule.taxonomy.category === 'career' &&
      rule.inputs.length === 1 &&
      rule.inputs[0]?.source === 'derived_fact' &&
      rule.inputs[0].pathOrClaimType === 'derivedFacts.tenGods',
  );

  if (!exactSourceAccepted || CAREER_NATAL_READING_RULES.length !== 20 || !legacyReadsRawFacts) {
    return null;
  }

  return Object.freeze({
    selectedGapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    exactSubtypeMethodologyMode: 'consume',
    exactSubtypeAuthorizedSemanticTiers: Object.freeze(['T5'] as const),
    exactSubtypeSourceIds: CAREER_T8_B80_EXACT_SUBTYPE_CURRENT_SOURCE_IDS,
    exactSubtypeT5SourceAuthorityPresent: true,
    exactSubtypeT5ClaimType: CAREER_T5_SUBTYPE_CLAIM_TYPE,
    exactSubtypeCrossTierCareerBindingAuthorityPresent: false,
    reviewedPersonalizedMultiClaimCareerBindingCandidateCount: 0,
    legacyDirectT8CandidateObserved: true,
    legacyCandidateVersion: CAREER_NATAL_READING_CANDIDATE_VERSION,
    legacyCandidateRuleCount: 20,
    legacyCandidateReadsRawDerivedTenGodFact: true,
    legacyCandidateConsumesPersonalizedT5Claims: false,
    legacyCandidateUsableAsPersonalizedBridge: false,
    sourceCandidateState:
      'LOWER_TIER_SOURCE_PRESENT_CROSS_TIER_CAREER_BINDING_CANDIDATE_ABSENT',
  });
}

function priorityRecords(): readonly CareerT8B80AuthorityGapPriorityRecord[] {
  return Object.freeze([
    Object.freeze({
      gapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
      researchOrder: 1,
      priorityBand: 'IMMEDIATE_PRODUCT_CRITICAL',
      currentAuthorityState: 'LOWER_TIER_T5_AUTHORITY_ONLY',
      rationale:
        'Exact Ten-God subtype semantics already have bounded T5 source authority and a registered T5 substrate, while the cross-tier multi-claim Career pattern binding is the missing authority closest to a first personalized T8 semantic composition.',
      semanticRuleAuthoringAuthorized: false,
      numericInterpretiveWeightAuthorized: false,
    }),
    Object.freeze({
      gapId: 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
      researchOrder: 2,
      priorityBand: 'NEXT_T5_COMPOSITION',
      currentAuthorityState: 'LOWER_TIER_T5_AUTHORITY_ONLY',
      rationale:
        'Broad-family generation/control context is already bounded at T5 and can be reviewed after the exact-subtype bridge without requiring T6 effect semantics.',
      semanticRuleAuthoringAuthorized: false,
      numericInterpretiveWeightAuthorized: false,
    }),
    Object.freeze({
      gapId: 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
      researchOrder: 3,
      priorityBand: 'FOLLOWING_T6_MODIFIER',
      currentAuthorityState: 'BOUNDED_T6_CONTEXT_ONLY',
      rationale:
        'Branch-clash participation is available only as bounded T6 context. Its Career effect must remain downstream of a valid T5-to-T8 composition bridge and may not preempt that simpler authority dependency.',
      semanticRuleAuthoringAuthorized: false,
      numericInterpretiveWeightAuthorized: false,
    }),
    Object.freeze({
      gapId: 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
      researchOrder: 4,
      priorityBand: 'FOLLOWING_T6_MODIFIER',
      currentAuthorityState: 'BOUNDED_T6_CONTEXT_ONLY',
      rationale:
        'Visibility, position, and plurality are currently qualifier context only. Their product value depends on a reviewed rule that changes a bounded Career semantic facet without inventing force, score, or precedence.',
      semanticRuleAuthoringAuthorized: false,
      numericInterpretiveWeightAuthorized: false,
    }),
    Object.freeze({
      gapId: 'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
      researchOrder: 5,
      priorityBand: 'FOLLOWING_T6_MODIFIER',
      currentAuthorityState: 'BOUNDED_T6_CONTEXT_ONLY',
      rationale:
        'Seasonal phase remains categorical qualifier context; reviewing its Career modification comes after the primary T5 composition bridge and must not become a hidden strength score.',
      semanticRuleAuthoringAuthorized: false,
      numericInterpretiveWeightAuthorized: false,
    }),
    Object.freeze({
      gapId: 'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
      researchOrder: 6,
      priorityBand: 'DEPENDENCY_LATE',
      currentAuthorityState: 'MISSING_AUTHORITY',
      rationale:
        'Conflict or tension composition is not product-actionable until multiple authorized personalized Career T8 patterns can actually coexist; resolving it earlier would create policy around semantics that do not yet exist.',
      semanticRuleAuthoringAuthorized: false,
      numericInterpretiveWeightAuthorized: false,
    }),
  ] as const);
}

function finalized(
  material: Omit<
    CareerPersonalizationT8ProductCriticalAuthorityGapPrioritizationReport,
    'prioritizationId'
  >,
): CareerPersonalizationT8ProductCriticalAuthorityGapPrioritizationReport {
  return {
    prioritizationId: `career_personalization_t8_product_critical_authority_gap_prioritization_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8ProductCriticalAuthorityGapPrioritization(
  b79: CareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernanceReport,
): CareerPersonalizationT8ProductCriticalAuthorityGapPrioritizationReport {
  const upstreamAccepted = exactB79Accepted(b79);
  const inventoryAccepted = upstreamAccepted && exactGapInventoryStillAccepted();
  const exactSubtypeAudit = inventoryAccepted ? exactSubtypeCandidateAudit() : null;
  const accepted =
    inventoryAccepted &&
    exactSubtypeAudit !== null &&
    CAREER_T8_B80_PRIORITY_CONTROL_IDS.length === 15;
  const records = accepted ? priorityRecords() : Object.freeze([]);

  return finalized({
    prioritizationVersion:
      CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION'
      : 'UPSTREAM_B79_BOUNDARY_INVALID',
    decision: accepted
      ? 'SIX_GAPS_PRIORITIZED_EXACT_SUBTYPE_MULTI_CLAIM_BRIDGE_SELECTED_FOR_SOURCE_CANDIDATE_REVIEW_NO_T8_AUTHORING'
      : 'CAREER_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION_NOT_ESTABLISHED',
    upstreamB79GovernanceId: b79.governanceId,
    exactB79BoundaryAccepted: upstreamAccepted,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B80_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research_governance',
    exactGapInventoryAccepted: inventoryAccepted,
    priorityRecords: records,
    priorityRecordCount: accepted ? 6 : 0,
    selectedImmediateGapId: accepted
      ? 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING'
      : null,
    exactSubtypeCandidateAudit: accepted ? exactSubtypeAudit : null,
    productPriorityIsInterpretiveWeight: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    legacyCareerT8ReuseAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B80_PRIORITY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 15 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      priorityGovernanceRecordsCreated: accepted ? 1 : 0,
      sourceCandidateAuditsCreated: accepted ? 1 : 0,
      methodologyDefinitionsCreated: 0,
      semanticRuleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      calculationBehaviorsChanged: 0,
      interpretationBehaviorsChanged: 0,
      narrativeBehaviorsChanged: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION',
  });
}
