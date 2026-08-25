import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  CAREER_NATAL_READING_METHODOLOGY,
  CAREER_NATAL_READING_RULES,
} from './career-natal-reading-candidate.js';
import {
  CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
  CAREER_T5_SUBTYPE_CLAIM_TYPE,
} from './career-personalized-t5-substrate.js';
import {
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
} from './career-personalized-t6-branch-clash-hidden-stem-context.js';
import {
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
} from './career-personalized-t6-branch-clash-qualifier-context.js';
import {
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
} from './career-personalized-t6-branch-clash-seasonal-qualifier.js';
import {
  CAREER_PERSONALIZATION_METHODOLOGY_GATE,
  careerMethodologyDecision,
} from './career-personalization-methodology-gate.js';
import {
  CAREER_POST_P4_AVAILABLE_CLAIM_TYPES,
  CAREER_POST_P4_T8_REVIEW_CONTROL_IDS,
  buildCareerPersonalizationPostP4T8ReadinessReview,
  type CareerPersonalizationPostP4T8ReadinessReviewReport,
} from './career-personalization-post-p4-t8-readiness-review.js';
import type { CareerT6PublicClassicBoundedScopeMethodologyReviewReport } from './career-personalization-t6-public-classic-bounded-scope-methodology-review.js';

export const CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-career-personalization-bounded-t5-t6-t8-synthesis-methodology-review-v1' as const;

export type CareerT8SynthesisAuthorityDimension =
  | 'multi_evidence_input_shape'
  | 'exact_subtype_semantic_composition'
  | 'family_relation_career_composition'
  | 'branch_clash_career_modifier'
  | 'visibility_position_plurality_career_modifier'
  | 'seasonal_phase_career_modifier'
  | 'conflict_tension_resolution';

export type CareerT8SynthesisAuthorityState =
  | 'structurally_available_only'
  | 'lower_tier_authority_only'
  | 'context_only'
  | 'missing_authority';

export interface CareerT8SynthesisAuthorityDecision {
  dimension: CareerT8SynthesisAuthorityDimension;
  state: CareerT8SynthesisAuthorityState;
  rationale: string;
  supportingClaimTypes: readonly string[];
  mayDefinePersonalizedCareerT8SemanticRule: false;
  numericWeightingAuthorized: false;
}

export const CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS = Object.freeze([
  'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
  'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
  'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
  'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
  'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
  'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
] as const);

export const CAREER_T8_SYNTHESIS_METHODOLOGY_CONTROL_IDS = Object.freeze([
  'METHODOLOGY_REVIEW_COMPLETION_DOES_NOT_AUTHORIZE_T8_RULES',
  'MULTI_EVIDENCE_INPUT_AVAILABILITY_IS_NOT_SEMANTIC_COMPOSITION_AUTHORITY',
  'NO_SINGLE_T5_CLAIM_DIRECT_TO_PERSONALIZED_T8',
  'NO_RAW_DERIVED_TEN_GOD_FACT_DIRECT_TO_PERSONALIZED_T8',
  'NO_T5_FAMILY_RELATION_CONTEXT_AUTO_PROMOTION_TO_T8',
  'NO_T6_BRANCH_CLASH_CONTEXT_AUTO_PROMOTION_TO_T8',
  'NO_VISIBILITY_POSITION_OR_PLURALITY_EFFECT_INFERENCE',
  'NO_SEASONAL_PHASE_STRENGTH_OR_CAREER_MODIFIER_INFERENCE',
  'NO_LEGACY_CAREER_T8_RULE_REUSE_OR_MIXING',
  'MISSING_BLOCKED_DIMENSION_IS_NOT_NEGATIVE_EVIDENCE',
  'NO_CONFLICT_WINNER_PRECEDENCE_OR_WEIGHTED_VOTING',
  'NO_OCCUPATION_SUCCESS_SALARY_PROMOTION_OR_FUTURE_OUTCOME',
  'NO_CONSUMER_NARRATIVE_PREVIEW_SWITCH_OR_PRODUCTION_PROMOTION',
  'NEXT_GATE_MAY_ONLY_CLOSE_THE_IDENTIFIED_SYNTHESIS_AUTHORITY_GAPS',
] as const);

export interface CareerLegacyT8Audit {
  candidateVersion: typeof CAREER_NATAL_READING_CANDIDATE_VERSION;
  methodologyId: string;
  ruleCount: 20;
  allRulesTierT8Career: boolean;
  allRulesReadRawDerivedTenGodFact: boolean;
  consumesPersonalizedT5Claims: false;
  consumesBoundedT6Claims: false;
  personalizedArchitectureCompatible: false;
  reuseAuthorized: false;
}

export interface CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW_VERSION;
  status: 'RESOLVED_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW' | 'UPSTREAM_BOUNDARY_INVALID';
  decision:
    | 'CURRENT_SOURCE_AUTHORITY_INSUFFICIENT_FOR_PERSONALIZED_CAREER_T8_SYNTHESIS_NO_T8_AUTHORING_NEXT_AUTHORITY_GAP_REVIEW'
    | 'BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW_NOT_ESTABLISHED';
  upstreamReadinessReviewId: string;
  upstreamP4ReviewId: string;
  exactReadinessBoundaryAccepted: boolean;
  exactAvailableClaimInventoryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  reviewerStatus: 'unreviewed';
  multiEvidenceInputShapeAvailable: boolean;
  sourceBoundCrossTierCareerSynthesisAuthorityPresent: false;
  t5OnlyPersonalizedCareerSynthesisAuthorityPresent: false;
  t6MayModifyT5CareerSemantics: false;
  authorityDecisions: readonly CareerT8SynthesisAuthorityDecision[];
  authorityDecisionCount: 7 | 0;
  unresolvedAuthorityGapIds: readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][];
  unresolvedAuthorityGapCount: 6 | 0;
  legacyT8Audit: CareerLegacyT8Audit;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  legacyCareerT8MayBeConsumed: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_SYNTHESIS_METHODOLOGY_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
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
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW'
    | 'CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW';
}

function exactReadinessAccepted(
  p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  readiness: CareerPersonalizationPostP4T8ReadinessReviewReport,
): boolean {
  const expected = buildCareerPersonalizationPostP4T8ReadinessReview(p4);
  return (
    deterministicContentHash(readiness) === deterministicContentHash(expected) &&
    readiness.reviewId === expected.reviewId &&
    readiness.status === 'RESOLVED_POST_P4_T8_READINESS_REVIEW' &&
    readiness.decision ===
      'BOUNDED_T5_PLUS_SCOPED_T6_SUBSTRATE_READY_FOR_SEPARATE_CAREER_T8_SYNTHESIS_METHODOLOGY_REVIEW_ONLY_NO_T8_RULE_AUTHORING' &&
    readiness.t8SynthesisMethodologyReviewMayProceed &&
    readiness.t8RuleAuthoringAuthorized === false &&
    readiness.t8ClaimTypeCreationAuthorized === false &&
    readiness.personalizedT8PackCreationAuthorized === false &&
    readiness.legacyCareerT8MayBeConsumed === false &&
    readiness.controlIds.length === CAREER_POST_P4_T8_REVIEW_CONTROL_IDS.length &&
    readiness.controlsFrozen
  );
}

function exactAvailableClaimInventoryAccepted(
  readiness: CareerPersonalizationPostP4T8ReadinessReviewReport,
): boolean {
  return (
    readiness.availableClaimTypeCount === 5 &&
    deterministicContentHash(readiness.availableClaimTypes) ===
      deterministicContentHash(CAREER_POST_P4_AVAILABLE_CLAIM_TYPES) &&
    readiness.availableClaimTypes.includes(CAREER_T5_SUBTYPE_CLAIM_TYPE) &&
    readiness.availableClaimTypes.includes(CAREER_T5_FAMILY_RELATION_CLAIM_TYPE) &&
    readiness.availableClaimTypes.includes(CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE) &&
    readiness.availableClaimTypes.includes(CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE) &&
    readiness.availableClaimTypes.includes(CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE)
  );
}

function sourceAuthorityStillLowerTierOrContextOnly(): boolean {
  const subtype = careerMethodologyDecision('exact_ten_god_subtype');
  const family = careerMethodologyDecision('broad_family_context');
  const interaction = careerMethodologyDecision('structural_interactions');
  const season = careerMethodologyDecision('month_season_context');
  const conflict = careerMethodologyDecision('conflict_resolution');

  return (
    subtype.mode === 'consume' &&
    subtype.authorizedSemanticTiers.length === 1 &&
    subtype.authorizedSemanticTiers[0] === 'T5' &&
    subtype.directCareerT8Authorized === false &&
    family.mode === 'consume' &&
    family.authorizedSemanticTiers.length === 1 &&
    family.authorizedSemanticTiers[0] === 'T5' &&
    family.directCareerT8Authorized === false &&
    interaction.directCareerT8Authorized === false &&
    season.directCareerT8Authorized === false &&
    conflict.mode === 'blocked' &&
    conflict.directCareerT8Authorized === false &&
    CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.sourceVocabularyMayBecomeCareerOutcomeWithoutRule ===
      false &&
    CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.legacyCareerT8MayMixWithPersonalizedCareerT8 ===
      false &&
    CAREER_PERSONALIZATION_METHODOLOGY_GATE.globalConstraints.numericCareerScoreAuthorized === false
  );
}

function legacyAudit(): CareerLegacyT8Audit {
  const allRulesTierT8Career = CAREER_NATAL_READING_RULES.every(
    (rule) => rule.taxonomy.tier === 'T8' && rule.taxonomy.category === 'career',
  );
  const allRulesReadRawDerivedTenGodFact = CAREER_NATAL_READING_RULES.every(
    (rule) =>
      rule.inputs.length === 1 &&
      rule.inputs[0]?.source === 'derived_fact' &&
      rule.inputs[0].pathOrClaimType === 'derivedFacts.tenGods',
  );

  return Object.freeze({
    candidateVersion: CAREER_NATAL_READING_CANDIDATE_VERSION,
    methodologyId: CAREER_NATAL_READING_METHODOLOGY.methodologyId,
    ruleCount: 20,
    allRulesTierT8Career,
    allRulesReadRawDerivedTenGodFact,
    consumesPersonalizedT5Claims: false,
    consumesBoundedT6Claims: false,
    personalizedArchitectureCompatible: false,
    reuseAuthorized: false,
  });
}

function authorityDecision(
  dimension: CareerT8SynthesisAuthorityDimension,
  state: CareerT8SynthesisAuthorityState,
  rationale: string,
  supportingClaimTypes: readonly string[] = [],
): CareerT8SynthesisAuthorityDecision {
  return Object.freeze({
    dimension,
    state,
    rationale,
    supportingClaimTypes: Object.freeze([...supportingClaimTypes]),
    mayDefinePersonalizedCareerT8SemanticRule: false,
    numericWeightingAuthorized: false,
  });
}

function authorityDecisions(): readonly CareerT8SynthesisAuthorityDecision[] {
  return Object.freeze([
    authorityDecision(
      'multi_evidence_input_shape',
      'structurally_available_only',
      'The repository now exposes multiple registered T5/T6 claim types that could be selected together, but input multiplicity alone does not define a Career semantic composition.',
      CAREER_POST_P4_AVAILABLE_CLAIM_TYPES,
    ),
    authorityDecision(
      'exact_subtype_semantic_composition',
      'lower_tier_authority_only',
      'Exact Ten-God subtype semantics are authorized only as T5 substrate. No reviewed source rule maps multiple subtype facets into a personalized Career T8 semantic pattern.',
      [CAREER_T5_SUBTYPE_CLAIM_TYPE],
    ),
    authorityDecision(
      'family_relation_career_composition',
      'lower_tier_authority_only',
      'Generation/control relations among broad Ten-God families are source-bound as T5 structural context only; the P1 methodology inventory explicitly denies direct Career T8 authority from that vocabulary.',
      [CAREER_T5_FAMILY_RELATION_CLAIM_TYPE],
    ),
    authorityDecision(
      'branch_clash_career_modifier',
      'context_only',
      'P4 authorizes explicit branch-clash hidden-stem participation only as bounded T6 context and explicitly denies Career outcome semantics or T8 synthesis by that gate.',
      [CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE],
    ),
    authorityDecision(
      'visibility_position_plurality_career_modifier',
      'context_only',
      'Visibility, separation/position, and plurality observations remain qualifier context only; no reviewed method states how they alter a T5 Career facet.',
      [CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE],
    ),
    authorityDecision(
      'seasonal_phase_career_modifier',
      'context_only',
      'Governed 旺/相/休/囚/死 values remain categorical month-branch-relative observations. No reviewed Career method maps a phase to stronger/weaker expression or changes a T5 semantic facet.',
      [CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE],
    ),
    authorityDecision(
      'conflict_tension_resolution',
      'missing_authority',
      'No reviewed method defines whether multiple Career patterns should coexist, form a bounded tension, or resolve by precedence; winner selection and weighted voting remain blocked.',
    ),
  ]);
}

function finalized(
  material: Omit<CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport, 'reviewId'>,
): CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport {
  return {
    reviewId: `career_t8_synthesis_methodology_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(
  p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  readiness: CareerPersonalizationPostP4T8ReadinessReviewReport,
): CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport {
  const readinessAccepted = exactReadinessAccepted(p4, readiness);
  const inventoryAccepted = readinessAccepted && exactAvailableClaimInventoryAccepted(readiness);
  const sourceBoundaryAccepted = sourceAuthorityStillLowerTierOrContextOnly();
  const legacy = legacyAudit();
  const accepted =
    readinessAccepted &&
    inventoryAccepted &&
    sourceBoundaryAccepted &&
    legacy.ruleCount === 20 &&
    legacy.allRulesTierT8Career &&
    legacy.allRulesReadRawDerivedTenGodFact &&
    !legacy.personalizedArchitectureCompatible &&
    !legacy.reuseAuthorized;

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW'
      : 'UPSTREAM_BOUNDARY_INVALID',
    decision: accepted
      ? 'CURRENT_SOURCE_AUTHORITY_INSUFFICIENT_FOR_PERSONALIZED_CAREER_T8_SYNTHESIS_NO_T8_AUTHORING_NEXT_AUTHORITY_GAP_REVIEW'
      : 'BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW_NOT_ESTABLISHED',
    upstreamReadinessReviewId: readiness.reviewId,
    upstreamP4ReviewId: p4.reviewId,
    exactReadinessBoundaryAccepted: readinessAccepted,
    exactAvailableClaimInventoryAccepted: inventoryAccepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    multiEvidenceInputShapeAvailable: accepted,
    sourceBoundCrossTierCareerSynthesisAuthorityPresent: false,
    t5OnlyPersonalizedCareerSynthesisAuthorityPresent: false,
    t6MayModifyT5CareerSemantics: false,
    authorityDecisions: accepted ? authorityDecisions() : Object.freeze([]),
    authorityDecisionCount: accepted ? 7 : 0,
    unresolvedAuthorityGapIds: accepted ? CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS : Object.freeze([]),
    unresolvedAuthorityGapCount: accepted ? 6 : 0,
    legacyT8Audit: legacy,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    legacyCareerT8MayBeConsumed: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_SYNTHESIS_METHODOLOGY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
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
      ? 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW'
      : 'CAREER_PERSONALIZATION_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW',
  });
}
