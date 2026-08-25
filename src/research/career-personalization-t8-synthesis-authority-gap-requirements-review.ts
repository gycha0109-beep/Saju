import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
  CAREER_T8_SYNTHESIS_METHODOLOGY_CONTROL_IDS,
  buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview,
  type CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport,
} from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerPersonalizationPostP4T8ReadinessReviewReport } from './career-personalization-post-p4-t8-readiness-review.js';
import type { CareerT6PublicClassicBoundedScopeMethodologyReviewReport } from './career-personalization-t6-public-classic-bounded-scope-methodology-review.js';

export const CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-synthesis-authority-gap-requirements-review-v1' as const;

export type CareerT8SynthesisAuthorityGapId =
  (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number];

export interface CareerT8SynthesisAuthorityRequirement {
  gapId: CareerT8SynthesisAuthorityGapId;
  mandatory: true;
  authorityQuestion: string;
  requiredAuthorityAssertions: readonly string[];
  domainScopeRequired: 'career_or_work_expression';
  temporalScopeRequired: 'natal';
  exactSourceIdentityRequired: true;
  exactLocatorRequired: true;
  originalOrVerifiedSourceContextRequired: true;
  explicitSemanticBindingRequired: true;
  explicitContextOrExceptionTreatmentRequired: true;
  independentNormativeProvenanceRequired: true;
  currentlySatisfied: false;
  mayBeSatisfiedByExistingLowerTierClaimPresenceAlone: false;
  mayBeSatisfiedByGeneralKnowledge: false;
  mayBeSatisfiedBySearchSnippet: false;
  mayBeSatisfiedByModelSynthesis: false;
  mayBeSatisfiedByEmpiricalCalibrationAlone: false;
  mayBeSatisfiedByNumericWeighting: false;
  mayBeSatisfiedByLegacyCareerT8Reuse: false;
}

export const CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENT_CONTROL_IDS = Object.freeze([
  'REQUIREMENTS_REVIEW_DOES_NOT_CLOSE_ANY_SYNTHESIS_AUTHORITY_GAP',
  'ONE_REQUIREMENT_CONTRACT_MUST_EXIST_FOR_EACH_OF_THE_SIX_B4_GAPS',
  'SOURCE_IDENTITY_AND_EXACT_LOCATOR_ARE_REQUIRED',
  'SOURCE_MUST_EXPLICITLY_BIND_STRUCTURE_TO_CAREER_OR_WORK_EXPRESSION',
  'LOWER_TIER_CLAIM_EXISTENCE_ALONE_CANNOT_CLOSE_A_T8_SYNTHESIS_GAP',
  'GENERAL_KNOWLEDGE_CANNOT_CLOSE_A_T8_SYNTHESIS_GAP',
  'SEARCH_SNIPPET_CANNOT_CLOSE_A_T8_SYNTHESIS_GAP',
  'MODEL_SYNTHESIS_CANNOT_CREATE_MISSING_NORMATIVE_AUTHORITY',
  'EMPIRICAL_CALIBRATION_ALONE_CANNOT_CREATE_NORMATIVE_AUTHORITY',
  'NUMERIC_WEIGHTING_CANNOT_SUBSTITUTE_FOR_QUALITATIVE_METHOD_AUTHORITY',
  'LEGACY_CAREER_T8_CANNOT_BE_REUSED_AS_PERSONALIZED_SYNTHESIS_AUTHORITY',
  'MULTI_SOURCE_COMPOSITION_REQUIRES_SEPARATE_PROVENANCE_AND_COMPATIBILITY_REVIEW',
  'SOURCE_REGISTRATION_ALONE_DOES_NOT_CLOSE_A_GAP',
  'REQUIREMENT_COVERAGE_EVALUATION_IS_REQUIRED_AFTER_EVIDENCE_ACQUISITION',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT_BY_THIS_GATE',
] as const);

export interface CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW'
    | 'UPSTREAM_B4_BOUNDARY_INVALID';
  decision:
    | 'SIX_PERSONALIZED_CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS_FROZEN_NO_T8_SEMANTICS_AUTHORIZED'
    | 'CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS_NOT_FROZEN';
  upstreamB4ReviewId: string;
  exactB4BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  reviewerStatus: 'unreviewed';
  authorityGapConfirmed: boolean;
  authorityGapClosed: false;
  additionalAuthorityRequired: boolean;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  unresolvedGapCount: 6 | 0;
  requirements: readonly CareerT8SynthesisAuthorityRequirement[];
  requirementCount: 6 | 0;
  allRequirementsMandatory: boolean;
  allRequirementsCurrentlyUnsatisfied: boolean;
  everyB4GapCoveredExactlyOnce: boolean;
  sourceIdentityRequired: true;
  exactLocatorRequired: true;
  originalOrVerifiedSourceContextRequired: true;
  explicitCareerSemanticBindingRequired: true;
  independentNormativeProvenanceRequired: true;
  singleSourceFullCoveragePreferred: true;
  multiSourceCompositionPolicyRequiredBeforeCombining: true;
  sourceRegistrationAloneClosesGap: false;
  requirementCoverageEvaluationRequiredAfterAcquisition: true;
  generalKnowledgeMayCloseGap: false;
  searchSnippetMayCloseGap: false;
  modelSynthesisMayCloseGap: false;
  empiricalCalibrationAloneMayCloseGap: false;
  numericWeightingMayCloseGap: false;
  legacyCareerT8MayCloseGap: false;
  existingLowerTierClaimsMayRemainEvidence: true;
  existingLowerTierClaimsMayBecomeT8WithoutNewAuthority: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENT_CONTROL_IDS)[number][];
  controlCount: 15 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW';
}

function requirement(
  gapId: CareerT8SynthesisAuthorityGapId,
  authorityQuestion: string,
  requiredAuthorityAssertions: readonly string[],
): CareerT8SynthesisAuthorityRequirement {
  return Object.freeze({
    gapId,
    mandatory: true,
    authorityQuestion,
    requiredAuthorityAssertions: Object.freeze([...requiredAuthorityAssertions]),
    domainScopeRequired: 'career_or_work_expression',
    temporalScopeRequired: 'natal',
    exactSourceIdentityRequired: true,
    exactLocatorRequired: true,
    originalOrVerifiedSourceContextRequired: true,
    explicitSemanticBindingRequired: true,
    explicitContextOrExceptionTreatmentRequired: true,
    independentNormativeProvenanceRequired: true,
    currentlySatisfied: false,
    mayBeSatisfiedByExistingLowerTierClaimPresenceAlone: false,
    mayBeSatisfiedByGeneralKnowledge: false,
    mayBeSatisfiedBySearchSnippet: false,
    mayBeSatisfiedByModelSynthesis: false,
    mayBeSatisfiedByEmpiricalCalibrationAlone: false,
    mayBeSatisfiedByNumericWeighting: false,
    mayBeSatisfiedByLegacyCareerT8Reuse: false,
  });
}

export const CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS = Object.freeze([
  requirement(
    'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    'When multiple exact Ten-God subtype semantics coexist, what source-bound rule permits them to form a chart-level Career or work-expression pattern without collapsing subtype identity?',
    [
      'Authority must explicitly address coexistence or composition of multiple exact Ten-God subtype meanings rather than mere single-symbol description.',
      'Authority must bind that composition to Career or work expression, not to generic personality, auspiciousness, status, or future-event prediction.',
      'Authority must preserve materially different subtype roles and state any context or exception that limits the composition.',
    ],
  ),
  requirement(
    'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    'When Ten-God family generation or control relations are present, what source-bound rule permits those relations to become a Career or work-expression pattern?',
    [
      'Authority must explicitly connect a named generation/control relation among Ten-God families to Career or work expression.',
      'Authority must distinguish structural relation presence from a Career semantic effect or pattern.',
      'Authority must state context or exceptions and must not equate the relation with success, income, rank, promotion, or deterministic outcome.',
    ],
  ),
  requirement(
    'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    'How may an explicit branch-clash participation context qualify an already established T5 Career semantic without turning every hidden-stem coexistence into an interaction?',
    [
      'Authority must explicitly bind an identified branch clash or its participants to a qualitative modification of a Ten-God or Career/work semantic.',
      'Authority must keep the modification relation-local and distinguish explicit branch-clash participation from arbitrary hidden-stem coexistence.',
      'Authority must state whether the base T5 meaning is preserved, constrained, redirected, or otherwise qualified, including material exceptions.',
    ],
  ),
  requirement(
    'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    'How may visibility, position/separation, or plurality observations qualitatively modify a T5 Career semantic?',
    [
      'Authority must explicitly state which visibility, position/separation, or plurality distinction changes manifestation or interpretation rather than merely describing structure.',
      'Authority must bind that distinction to Career or work expression and state the applicable structural scope.',
      'Authority must define qualitative limits or exceptions without converting position, distance, visibility, or occurrence count into numeric weights or automatic winners.',
    ],
  ),
  requirement(
    'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    'How may the categorical 旺/相/休/囚/死 seasonal phase qualify a T5 Career semantic without inventing a strength score or automatic winner?',
    [
      'Authority must explicitly bind categorical seasonal phase to a qualitative change in manifestation or interpretation of the relevant Ten-God or Career/work semantic.',
      'Authority must preserve the categorical nature of 旺/相/休/囚/死 and distinguish observation from numeric strength, rank, or probability.',
      'Authority must state scope or exceptions and must not authorize an automatic interaction winner, loser, elimination, or damage magnitude.',
    ],
  ),
  requirement(
    'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
    'When several authorized Career patterns coexist or conflict, what source-bound composition method determines coexistence, tension, qualification, or precedence without hidden weighted voting?',
    [
      'Authority must explicitly define how multiple authorized Career/work patterns are composed when they reinforce, constrain, or conflict.',
      'Authority must distinguish coexistence/tension from precedence and identify the conditions under which any precedence rule applies.',
      'Authority must state exceptions and must not rely on invented numeric weights, majority voting, missing-claim-as-negative logic, or legacy T8 shortcuts.',
    ],
  ),
] as const satisfies readonly CareerT8SynthesisAuthorityRequirement[]);

function exactB4Accepted(
  p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  readiness: CareerPersonalizationPostP4T8ReadinessReviewReport,
  b4: CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport,
): boolean {
  const expected = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(p4, readiness);
  return (
    deterministicContentHash(b4) === deterministicContentHash(expected) &&
    b4.reviewId === expected.reviewId &&
    b4.status === 'RESOLVED_BOUNDED_T5_T6_T8_SYNTHESIS_METHODOLOGY_REVIEW' &&
    b4.decision ===
      'CURRENT_SOURCE_AUTHORITY_INSUFFICIENT_FOR_PERSONALIZED_CAREER_T8_SYNTHESIS_NO_T8_AUTHORING_NEXT_AUTHORITY_GAP_REVIEW' &&
    b4.unresolvedAuthorityGapCount === 6 &&
    deterministicContentHash(b4.unresolvedAuthorityGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b4.controlIds.length === CAREER_T8_SYNTHESIS_METHODOLOGY_CONTROL_IDS.length &&
    b4.controlsFrozen &&
    b4.t8RuleAuthoringAuthorized === false &&
    b4.t8ClaimTypeCreationAuthorized === false &&
    b4.personalizedT8PackCreationAuthorized === false &&
    b4.legacyCareerT8MayBeConsumed === false &&
    b4.consumerNarrativeAuthorized === false &&
    b4.productionPromotionAuthorized === false &&
    b4.recommendedNextGate === 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW'
  );
}

function everyGapCoveredExactlyOnce(): boolean {
  const requirementIds = CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS.map((item) => item.gapId);
  return (
    requirementIds.length === CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.length &&
    new Set(requirementIds).size === requirementIds.length &&
    CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.every((gapId) => requirementIds.includes(gapId))
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport, 'reviewId'>,
): CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport {
  return {
    reviewId: `career_t8_synthesis_authority_requirements_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
  p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  readiness: CareerPersonalizationPostP4T8ReadinessReviewReport,
  b4: CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport,
): CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport {
  const upstreamAccepted = exactB4Accepted(p4, readiness, b4);
  const coverageAccepted = everyGapCoveredExactlyOnce();
  const accepted = upstreamAccepted && coverageAccepted;

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW'
      : 'UPSTREAM_B4_BOUNDARY_INVALID',
    decision: accepted
      ? 'SIX_PERSONALIZED_CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS_FROZEN_NO_T8_SEMANTICS_AUTHORIZED'
      : 'CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS_NOT_FROZEN',
    upstreamB4ReviewId: b4.reviewId,
    exactB4BoundaryAccepted: upstreamAccepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    authorityGapConfirmed: accepted,
    authorityGapClosed: false,
    additionalAuthorityRequired: accepted,
    unresolvedGapIds: accepted ? CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS : Object.freeze([]),
    unresolvedGapCount: accepted ? 6 : 0,
    requirements: accepted ? CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS : Object.freeze([]),
    requirementCount: accepted ? 6 : 0,
    allRequirementsMandatory:
      accepted && CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS.every((item) => item.mandatory),
    allRequirementsCurrentlyUnsatisfied:
      accepted && CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS.every((item) => !item.currentlySatisfied),
    everyB4GapCoveredExactlyOnce: accepted && coverageAccepted,
    sourceIdentityRequired: true,
    exactLocatorRequired: true,
    originalOrVerifiedSourceContextRequired: true,
    explicitCareerSemanticBindingRequired: true,
    independentNormativeProvenanceRequired: true,
    singleSourceFullCoveragePreferred: true,
    multiSourceCompositionPolicyRequiredBeforeCombining: true,
    sourceRegistrationAloneClosesGap: false,
    requirementCoverageEvaluationRequiredAfterAcquisition: true,
    generalKnowledgeMayCloseGap: false,
    searchSnippetMayCloseGap: false,
    modelSynthesisMayCloseGap: false,
    empiricalCalibrationAloneMayCloseGap: false,
    numericWeightingMayCloseGap: false,
    legacyCareerT8MayCloseGap: false,
    existingLowerTierClaimsMayRemainEvidence: true,
    existingLowerTierClaimsMayBecomeT8WithoutNewAuthority: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENT_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 15 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
  });
}
