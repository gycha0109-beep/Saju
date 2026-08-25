import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_PERSONALIZED_T5_FAMILY_RELATION_RULES,
  CAREER_PERSONALIZED_T5_PACK,
  CAREER_PERSONALIZED_T5_SUBTYPE_RULES,
  CAREER_T5_FAMILY_RELATION_CLAIM_DEFINITION,
  CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
  CAREER_T5_FAMILY_RELATION_METHODOLOGY,
  CAREER_T5_SUBTYPE_CLAIM_DEFINITION,
  CAREER_T5_SUBTYPE_CLAIM_TYPE,
  CAREER_T5_SUBTYPE_METHODOLOGY,
} from './career-personalized-t5-substrate.js';
import {
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION,
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY,
  CAREER_T6_BRANCH_CLASH_CONTEXT_RULES,
} from './career-personalized-t6-branch-clash-hidden-stem-context.js';
import {
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_DEFINITION,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES,
} from './career-personalized-t6-branch-clash-qualifier-context.js';
import {
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_DEFINITION,
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY,
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES,
} from './career-personalized-t6-branch-clash-seasonal-qualifier.js';
import type { CareerT6PublicClassicBoundedScopeMethodologyReviewReport } from './career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import { CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE } from './career-personalization-t6-methodology-gate.js';

export const CAREER_PERSONALIZATION_POST_P4_T8_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-post-p4-t8-readiness-review-v1' as const;

export type CareerPostP4T8ReadinessDimension =
  | 't5_exact_subtype_semantics'
  | 't5_family_relation_context'
  | 't6_explicit_branch_clash_context'
  | 't6_visibility_position_plurality_context'
  | 't6_seasonal_phase_context'
  | 'general_hidden_stem_interaction'
  | 'interaction_effect_settlement'
  | 'root_evidence'
  | 't1_t4_qualifiers'
  | 'cross_relation_precedence'
  | 'numeric_weighting';

export type CareerPostP4T8ReadinessMode =
  | 'available_research_substrate'
  | 'available_bounded_context_only'
  | 'blocked_authority_gap'
  | 'blocked';

export interface CareerPostP4T8ReadinessDimensionDecision {
  dimension: CareerPostP4T8ReadinessDimension;
  mode: CareerPostP4T8ReadinessMode;
  rationale: string;
  claimTypes: readonly string[];
  mayBeConsideredByNextMethodologyReview: boolean;
  semanticEffectAlreadyAuthorized: false;
  numericWeightingAuthorized: false;
}

export const CAREER_POST_P4_AVAILABLE_CLAIM_TYPES = Object.freeze([
  CAREER_T5_SUBTYPE_CLAIM_TYPE,
  CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
] as const);

export const CAREER_POST_P4_T8_REVIEW_CONTROL_IDS = Object.freeze([
  'NEXT_STAGE_IS_METHODOLOGY_REVIEW_NOT_T8_RULE_AUTHORING',
  'ONLY_REGISTERED_T5_AND_BOUNDED_T6_CLAIMS_MAY_BE_CONSIDERED',
  'MISSING_OR_BLOCKED_DIMENSIONS_ARE_NOT_NEGATIVE_EVIDENCE',
  'GENERAL_HIDDEN_STEM_INTERACTION_REMAINS_BLOCKED',
  'NO_VISIBILITY_ACTIVATION_BINARY',
  'NO_POSITION_OR_SEPARATION_NUMERIC_WEIGHT',
  'NO_SEASONAL_STRENGTH_OR_AUTOMATIC_WINNER',
  'NO_PLURALITY_STRENGTH_OR_AUTOMATIC_WINNER',
  'NO_INTERACTION_EFFECT_DAMAGE_DESTRUCTION_OR_SETTLEMENT',
  'NO_ROOT_SEMANTICS_WITHOUT_SEPARATE_AUTHORITY',
  'NO_T1_T4_CAREER_QUALIFIER_CONSUMPTION',
  'NO_CROSS_RELATION_PRECEDENCE_OR_MULTI_TOUCH_AGGREGATION',
  'NO_NUMERIC_CAREER_OR_INTERACTION_SCORE',
  'NO_OCCUPATION_SUCCESS_SALARY_PROMOTION_OR_FUTURE_OUTCOME',
  'NO_LEGACY_CAREER_T8_SUBSTITUTION_OR_MIXING',
  'NO_CONSUMER_NARRATIVE_PREVIEW_SWITCH_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationPostP4T8ReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_POST_P4_T8_READINESS_REVIEW_VERSION;
  status: 'RESOLVED_POST_P4_T8_READINESS_REVIEW' | 'UPSTREAM_BOUNDARY_INVALID';
  decision:
    | 'BOUNDED_T5_PLUS_SCOPED_T6_SUBSTRATE_READY_FOR_SEPARATE_CAREER_T8_SYNTHESIS_METHODOLOGY_REVIEW_ONLY_NO_T8_RULE_AUTHORING'
    | 'POST_P4_CAREER_T8_METHODOLOGY_REVIEW_NOT_READY';
  upstreamP4ReviewId: string;
  exactP4BoundaryAccepted: boolean;
  historicalP3BlockPreserved: boolean;
  t5SubstrateContractAccepted: boolean;
  t6BranchClashContextContractAccepted: boolean;
  t6QualifierContextContractAccepted: boolean;
  t6SeasonalQualifierContractAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  reviewerStatus: 'unreviewed';
  availableClaimTypes: readonly string[];
  availableClaimTypeCount: 5 | 0;
  dimensionDecisions: readonly CareerPostP4T8ReadinessDimensionDecision[];
  dimensionCount: 11;
  t8SynthesisMethodologyReviewMayProceed: boolean;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  legacyCareerT8MayBeConsumed: false;
  blockedDimensionMayBeInferredFromAbsence: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_POST_P4_T8_REVIEW_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW'
    | 'CAREER_PERSONALIZATION_POST_P4_T8_READINESS_REVIEW';
}

function exactP4Accepted(report: CareerT6PublicClassicBoundedScopeMethodologyReviewReport): boolean {
  return (
    report.status === 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW' &&
    report.decision ===
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION' &&
    report.exactP3BoundaryAccepted &&
    report.exactI252BoundaryAccepted &&
    report.structuralTriggerKind === 'branch_clash' &&
    report.structuralTriggerMustBeT0Candidate &&
    report.branchClashHiddenStemInteractionEligibilityT6AuthoringAuthorized &&
    report.branchClashParticipantScopeRequired &&
    report.qualifierOnlyContextAuthorized &&
    report.generalHiddenStemInteractionStillBlocked &&
    report.visibilityMayCreateBinaryActivation === false &&
    report.positionMayCreateNumericWeight === false &&
    report.positionMayCreateZeroInteractionThreshold === false &&
    report.seasonMayCreateNumericWeight === false &&
    report.seasonMayChooseWinnerAutomatically === false &&
    report.pluralityMayCreateNumericWeight === false &&
    report.pluralityMayChooseWinnerAutomatically === false &&
    report.damageMagnitudeAuthorized === false &&
    report.destructionVerdictAuthorized === false &&
    report.postRelationSettlementAuthorized === false &&
    report.crossRelationPrecedenceAuthorized === false &&
    report.multiTouchAggregationAuthorized === false &&
    report.careerOutcomeSemanticAuthorizedByThisGate === false &&
    report.careerT8SynthesisAuthorizedByThisGate === false &&
    report.consumerNarrativeAuthorizedByThisGate === false &&
    report.productionPromotionAuthorized === false
  );
}

function historicalP3BlockPreserved(): boolean {
  return (
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.t6InteractionAuthoring ===
      'not_authorized' &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.t8CareerSynthesis ===
      'not_authorized_by_this_gate' &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints.hiddenStemMayBorrowVisibleStemRule ===
      false &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints.numericInteractionScoreAuthorized ===
      false &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints.crossRelationPrecedenceAuthorized ===
      false &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.globalConstraints.legacyCareerT8MaySubstituteForT6 ===
      false &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.automaticNextPathAuthorized === false
  );
}

function t5SubstrateAccepted(): boolean {
  return (
    CAREER_PERSONALIZED_T5_PACK.status === 'research' &&
    CAREER_PERSONALIZED_T5_PACK.claimContractMode === 'registered_required' &&
    CAREER_PERSONALIZED_T5_SUBTYPE_RULES.length === 70 &&
    CAREER_PERSONALIZED_T5_FAMILY_RELATION_RULES.length === 6 &&
    CAREER_T5_SUBTYPE_CLAIM_DEFINITION.materialForNarrative === false &&
    CAREER_T5_FAMILY_RELATION_CLAIM_DEFINITION.materialForNarrative === false &&
    CAREER_T5_SUBTYPE_CLAIM_DEFINITION.allowedTaxonomyTiers.length === 1 &&
    CAREER_T5_SUBTYPE_CLAIM_DEFINITION.allowedTaxonomyTiers[0] === 'T5' &&
    CAREER_T5_FAMILY_RELATION_CLAIM_DEFINITION.allowedTaxonomyTiers.length === 1 &&
    CAREER_T5_FAMILY_RELATION_CLAIM_DEFINITION.allowedTaxonomyTiers[0] === 'T5' &&
    CAREER_T5_SUBTYPE_METHODOLOGY.status === 'research' &&
    CAREER_T5_FAMILY_RELATION_METHODOLOGY.status === 'research' &&
    CAREER_PERSONALIZED_T5_SUBTYPE_RULES.every(
      (rule) => rule.status === 'research' && rule.taxonomy.tier === 'T5' && rule.taxonomy.category === 'career',
    ) &&
    CAREER_PERSONALIZED_T5_FAMILY_RELATION_RULES.every(
      (rule) => rule.status === 'research' && rule.taxonomy.tier === 'T5' && rule.taxonomy.category === 'career',
    )
  );
}

function t6BranchClashContextAccepted(): boolean {
  return (
    CAREER_T6_BRANCH_CLASH_CONTEXT_RULES.length === 6 &&
    CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION.materialForNarrative === false &&
    CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION.allowedTaxonomyTiers.length === 1 &&
    CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION.allowedTaxonomyTiers[0] === 'T6' &&
    CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.status === 'research' &&
    CAREER_T6_BRANCH_CLASH_CONTEXT_RULES.every(
      (rule) =>
        rule.status === 'research' &&
        rule.taxonomy.tier === 'T6' &&
        rule.taxonomy.category === 'career' &&
        rule.output.claimType === CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
    )
  );
}

function t6QualifierContextAccepted(): boolean {
  return (
    CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES.length === 6 &&
    CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_DEFINITION.materialForNarrative === false &&
    CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_DEFINITION.allowedTaxonomyTiers.length === 1 &&
    CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_DEFINITION.allowedTaxonomyTiers[0] === 'T6' &&
    CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY.status === 'research' &&
    CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES.every(
      (rule) =>
        rule.status === 'research' &&
        rule.taxonomy.tier === 'T6' &&
        rule.taxonomy.category === 'career' &&
        rule.output.claimType === CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
    )
  );
}

function t6SeasonalQualifierAccepted(): boolean {
  return (
    CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES.length === 60 &&
    CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_DEFINITION.materialForNarrative === false &&
    CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_DEFINITION.allowedTaxonomyTiers.length === 1 &&
    CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_DEFINITION.allowedTaxonomyTiers[0] === 'T6' &&
    CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY.status === 'research' &&
    CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES.every(
      (rule) =>
        rule.status === 'research' &&
        rule.taxonomy.tier === 'T6' &&
        rule.taxonomy.category === 'career' &&
        rule.output.claimType === CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE &&
        rule.inputs.some(
          (input) =>
            input.source === 'research_evidence' &&
            input.required &&
            input.evidenceVersion !== undefined &&
            input.researchEvidenceDefinitionRef !== undefined,
        ),
    )
  );
}

function dimensionDecision(
  dimension: CareerPostP4T8ReadinessDimension,
  mode: CareerPostP4T8ReadinessMode,
  rationale: string,
  claimTypes: readonly string[] = [],
): CareerPostP4T8ReadinessDimensionDecision {
  return Object.freeze({
    dimension,
    mode,
    rationale,
    claimTypes: Object.freeze([...claimTypes]),
    mayBeConsideredByNextMethodologyReview:
      mode === 'available_research_substrate' || mode === 'available_bounded_context_only',
    semanticEffectAlreadyAuthorized: false,
    numericWeightingAuthorized: false,
  });
}

function readinessDimensions(): readonly CareerPostP4T8ReadinessDimensionDecision[] {
  return Object.freeze([
    dimensionDecision(
      't5_exact_subtype_semantics',
      'available_research_substrate',
      'Exact Ten-God subtype semantics are registered T5 research substrate. They may be considered by a later synthesis-methodology review but are not themselves Career T8 conclusions.',
      [CAREER_T5_SUBTYPE_CLAIM_TYPE],
    ),
    dimensionDecision(
      't5_family_relation_context',
      'available_research_substrate',
      'Broad-family generation/control context is registered T5 research substrate and carries no winner, magnitude, or Career outcome authority.',
      [CAREER_T5_FAMILY_RELATION_CLAIM_TYPE],
    ),
    dimensionDecision(
      't6_explicit_branch_clash_context',
      'available_bounded_context_only',
      'Only hidden stems belonging to an explicit precomputed T0 branch clash are admitted as a bounded T6 interaction context.',
      [CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE],
    ),
    dimensionDecision(
      't6_visibility_position_plurality_context',
      'available_bounded_context_only',
      'Visibility locations, separation positions, and plurality locations are pair-local observations only; they do not establish activation, weakening, strength, or weight.',
      [CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE],
    ),
    dimensionDecision(
      't6_seasonal_phase_context',
      'available_bounded_context_only',
      'Governed I20 旺/相/休/囚/死 values are available only as categorical month-branch-relative participant observations, not as strong/weak or winner evidence.',
      [CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE],
    ),
    dimensionDecision(
      'general_hidden_stem_interaction',
      'blocked_authority_gap',
      'P4 is a scoped branch-clash exception only. Hidden-stem interaction outside explicit branch clash remains unauthorized.',
    ),
    dimensionDecision(
      'interaction_effect_settlement',
      'blocked_authority_gap',
      'Activation, persistence, effective-support, damage, destruction, winner/loser, and post-relation settlement remain unsupported.',
    ),
    dimensionDecision(
      'root_evidence',
      'blocked_authority_gap',
      'Root evidence remains structurally available elsewhere but has no reviewed Career synthesis semantics in this authority chain.',
    ),
    dimensionDecision(
      't1_t4_qualifiers',
      'blocked',
      'T1 structural balance, T2 day-master strength, T3 pattern, and T4 Yongshin are not authorized Career synthesis inputs by the current personalization methodology.',
    ),
    dimensionDecision(
      'cross_relation_precedence',
      'blocked',
      'No reviewed winner, conflict-resolution, cross-relation precedence, or multi-touch aggregation method exists.',
    ),
    dimensionDecision(
      'numeric_weighting',
      'blocked',
      'Counts, position, separation, seasonal categories, qualitative force, and relation presence may not become numeric Career or interaction weights.',
    ),
  ]);
}

function finalized(
  material: Omit<CareerPersonalizationPostP4T8ReadinessReviewReport, 'reviewId'>,
): CareerPersonalizationPostP4T8ReadinessReviewReport {
  return {
    reviewId: `career_post_p4_t8_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationPostP4T8ReadinessReview(
  p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
): CareerPersonalizationPostP4T8ReadinessReviewReport {
  const p4Accepted = exactP4Accepted(p4);
  const p3Preserved = historicalP3BlockPreserved();
  const t5Accepted = t5SubstrateAccepted();
  const t6ContextAccepted = t6BranchClashContextAccepted();
  const t6QualifierAccepted = t6QualifierContextAccepted();
  const t6SeasonalAccepted = t6SeasonalQualifierAccepted();
  const accepted =
    p4Accepted &&
    p3Preserved &&
    t5Accepted &&
    t6ContextAccepted &&
    t6QualifierAccepted &&
    t6SeasonalAccepted;

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_POST_P4_T8_READINESS_REVIEW_VERSION,
    status: accepted ? 'RESOLVED_POST_P4_T8_READINESS_REVIEW' : 'UPSTREAM_BOUNDARY_INVALID',
    decision: accepted
      ? 'BOUNDED_T5_PLUS_SCOPED_T6_SUBSTRATE_READY_FOR_SEPARATE_CAREER_T8_SYNTHESIS_METHODOLOGY_REVIEW_ONLY_NO_T8_RULE_AUTHORING'
      : 'POST_P4_CAREER_T8_METHODOLOGY_REVIEW_NOT_READY',
    upstreamP4ReviewId: p4.reviewId,
    exactP4BoundaryAccepted: p4Accepted,
    historicalP3BlockPreserved: p3Preserved,
    t5SubstrateContractAccepted: t5Accepted,
    t6BranchClashContextContractAccepted: t6ContextAccepted,
    t6QualifierContextContractAccepted: t6QualifierAccepted,
    t6SeasonalQualifierContractAccepted: t6SeasonalAccepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    availableClaimTypes: accepted ? CAREER_POST_P4_AVAILABLE_CLAIM_TYPES : Object.freeze([]),
    availableClaimTypeCount: accepted ? 5 : 0,
    dimensionDecisions: readinessDimensions(),
    dimensionCount: 11,
    t8SynthesisMethodologyReviewMayProceed: accepted,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    legacyCareerT8MayBeConsumed: false,
    blockedDimensionMayBeInferredFromAbsence: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_POST_P4_T8_REVIEW_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW'
      : 'CAREER_PERSONALIZATION_POST_P4_T8_READINESS_REVIEW',
  });
}
