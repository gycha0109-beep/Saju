import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_ANNUAL_ACTIVATION_RULES,
  CAREER_ANNUAL_POLICY_SOURCE,
  CAREER_ANNUAL_READING_CANDIDATE_VERSION,
  CAREER_ANNUAL_READING_METHODOLOGY,
  CAREER_ANNUAL_READING_PACK,
  CAREER_ANNUAL_TENSION_RULES,
  createCareerAnnualReadingCandidateRegistry,
} from './career-annual-reading-candidate.js';
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  CAREER_NATAL_READING_METHODOLOGY,
  CAREER_NATAL_READING_RULES,
} from './career-natal-reading-candidate.js';
import { CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY } from './career-personalization-position-current-t5-bridge-bounded-authority-admission-review.js';

export const CAREER_ANNUAL_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-career-annual-authority-bridge-review-v1' as const;

export type CareerAnnualBridgeDecision = 'RETURN_TO_RESEARCH';

const RESEARCH_PREREQUISITES = Object.freeze([
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_CAREER_ANNUAL_STEM_TEN_GOD_WORKING_PATTERN_SEMANTICS',
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_CAREER_ANNUAL_TO_NATAL_BRANCH_CLASH_WORK_ADJUSTMENT_SEMANTICS_IF_RETAINED',
  'VERIFY_OR_REMOVE_CURRENT_CAREER_AXES_SEMANTIC_KEYS_ADJUSTMENT_AREAS_AND_INTERPRETIVE_EMPHASIS',
  'DEFINE_CAREER_ANNUAL_SPECIFIC_SCOPE_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_AND_SCHOOL_DEPENDENCIES',
  'REVIEW_ANY_CAREER_NATAL_OR_GENERAL_ANNUAL_REUSE_AT_CLAIM_LEVEL_WITHOUT_WHOLESALE_AUTHORITY_INHERITANCE',
  'SEPARATE_PRODUCT_AND_NARRATIVE_POLICY_FROM_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY',
] as const);

const LATER_GOVERNANCE_PREREQUISITES = Object.freeze([
  'CREATE_A_CONTENT_ADDRESSED_REVIEW_SURFACE_ONLY_AFTER_CAREER_ANNUAL_SOURCE_AUTHORITY_IS_ESTABLISHED',
  'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_FOR_THE_EXACT_ADMISSIBLE_CAREER_ANNUAL_SUBJECTS',
  'OBTAIN_INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_THE_EXACT_ATTESTATION_HASHES',
  'RUN_SEPARATE_PROVENANCE_QUALITY_AND_LIFECYCLE_PROMOTION_REVIEWS',
] as const);

export function buildCareerAnnualAuthorityBridgeReview() {
  const registry = createCareerAnnualReadingCandidateRegistry();
  const annualRules = Object.freeze([
    ...CAREER_ANNUAL_ACTIVATION_RULES,
    ...CAREER_ANNUAL_TENSION_RULES,
  ]);
  const reusedNatalRules = Object.freeze([...CAREER_NATAL_READING_RULES]);

  const candidateState = Object.freeze({
    version: CAREER_ANNUAL_READING_CANDIDATE_VERSION,
    packId: CAREER_ANNUAL_READING_PACK.packId,
    packStatus: CAREER_ANNUAL_READING_PACK.status,
    annualMethodologyId: CAREER_ANNUAL_READING_METHODOLOGY.methodologyId,
    annualMethodologyStatus: CAREER_ANNUAL_READING_METHODOLOGY.status,
    annualSourceId: CAREER_ANNUAL_POLICY_SOURCE.sourceId,
    annualSourceType: CAREER_ANNUAL_POLICY_SOURCE.sourceType,
    annualSourceProvenanceTier: CAREER_ANNUAL_POLICY_SOURCE.provenanceTier,
    annualActivationRuleCount: CAREER_ANNUAL_ACTIVATION_RULES.length,
    annualTensionRuleCount: CAREER_ANNUAL_TENSION_RULES.length,
    annualRuleCount: annualRules.length,
    reusedNatalCandidateVersion: CAREER_NATAL_READING_CANDIDATE_VERSION,
    reusedNatalMethodologyId: CAREER_NATAL_READING_METHODOLOGY.methodologyId,
    reusedNatalMethodologyStatus: CAREER_NATAL_READING_METHODOLOGY.status,
    reusedNatalRuleCount: reusedNatalRules.length,
    registryRuleCount: registry.snapshot.rules.length,
    allAnnualRulesResearchOnly: annualRules.every((rule) => rule.status === 'research'),
    allAnnualRulesHeuristic: annualRules.every(
      (rule) => rule.quality.provenanceQuality === 'heuristic',
    ),
    allAnnualRulesExperimental: annualRules.every(
      (rule) => rule.quality.methodologyStability === 'experimental',
    ),
    allAnnualRulesUnreviewed: annualRules.every(
      (rule) => rule.quality.reviewerStatus === 'unreviewed',
    ),
    allReusedNatalRulesResearchOnly: reusedNatalRules.every((rule) => rule.status === 'research'),
    allReusedNatalRulesSecondaryOnly: reusedNatalRules.every(
      (rule) => rule.quality.provenanceQuality === 'secondary_only',
    ),
    allReusedNatalRulesContested: reusedNatalRules.every(
      (rule) => rule.quality.methodologyStability === 'contested',
    ),
    allReusedNatalRulesUnreviewed: reusedNatalRules.every(
      (rule) => rule.quality.reviewerStatus === 'unreviewed',
    ),
  });

  const natalGovernanceBoundary = Object.freeze({
    boundedNatalAuthorityComponentObserved: true as const,
    authorityClass: CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY.authorityClass,
    exactTenGod: CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY.exactTenGod,
    currentT5SemanticKey: CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY.currentT5SemanticKey,
    condition: CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY.condition,
    qualitativeModificationMode:
      CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY.qualitativeModificationMode,
    temporalScope: CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY.temporalScope,
    generalizedToOtherPillars:
      CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY.generalizedToOtherPillars,
    generalizedToOtherTenGodSemantics:
      CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY.generalizedToOtherTenGodSemantics,
    currentCareerNatalCandidateIsResearchOnly:
      CAREER_NATAL_READING_METHODOLOGY.status === 'research' &&
      reusedNatalRules.every((rule) => rule.status === 'research'),
    boundedNatalComponentAuthorizesCareerAnnual: false as const,
    reusedNatalResearchExecutionAuthorizesCareerAnnual: false as const,
  });

  const temporalFactBoundary = Object.freeze({
    scope: 'career:annual' as const,
    requiredFactTypes: Object.freeze([
      ...CAREER_ANNUAL_READING_METHODOLOGY.requiredFactTypes,
    ]),
    optionalFactTypes: Object.freeze([
      ...CAREER_ANNUAL_READING_METHODOLOGY.optionalFactTypes,
    ]),
    annualPillarIsInputFactNotCareerAuthority: true as const,
    annualStemTenGodIsInputFactNotCareerThemeAuthority: true as const,
    annualBranchRelationIsInputFactNotCareerEventAuthority: true as const,
    readingProfileCoverageIsSemanticAuthority: false as const,
    executableCandidateIsSemanticAuthority: false as const,
    narrativeCopyIsSemanticAuthority: false as const,
  });

  const reviewSchema = Object.freeze({
    authorityClasses: Object.freeze([
      'Methodology Authority',
      'Rule Authority',
      'Composition Authority',
      'Product Authority',
    ] as const),
    scope: 'career:annual' as const,
    requiredInputs: temporalFactBoundary.requiredFactTypes,
    preconditions: Object.freeze([
      'REQUEST_TARGET_YEAR_RESOLVED',
      'ANNUAL_PILLAR_RESOLVED',
      'NATAL_DAY_MASTER_RESOLVED_FOR_ANNUAL_STEM_TEN_GOD',
      'ANNUAL_TO_NATAL_BRANCH_RELATION_RESOLVED_BEFORE_ANY_CAREER_TENSION_CLAIM',
      'ANY_REUSED_NATAL_CAREER_AUTHORITY_MUST_BE_REVIEWED_FOR_ANNUAL_APPLICABILITY_AT_CLAIM_LEVEL',
    ] as const),
    allowedConclusion: Object.freeze([
      'CURRENT_CODE_DEMONSTRATES_A_BOUNDED_CAREER_ANNUAL_RESEARCH_EXECUTION_SURFACE_ONLY',
      'CAREER_NATAL_RESEARCH_CLAIMS_MAY_COEXIST_IN_THE_PACK_WITHOUT_CONFERRING_CAREER_ANNUAL_AUTHORITY',
      'THE_EXISTING_BOUNDED_NATAL_POSITION_AUTHORITY_COMPONENT_REMAINS_NATAL_ONLY',
      'TEMPORAL_FACTS_MAY_SERVE_AS_INPUT_PREREQUISITES_WITHOUT_CONFERRING_CAREER_ANNUAL_INTERPRETATION_AUTHORITY',
      'CURRENT_CAREER_ANNUAL_INTERPRETATION_SEMANTICS_ARE_NOT_ADMITTED_AS_ENGINE_AUTHORITY',
    ] as const),
    qualifiers: Object.freeze([
      'CAREER_ANNUAL_STEM_TEN_GOD_THEME_IS_A_RESEARCH_WORKING_PATTERN_CANDIDATE_NOT_A_CAREER_EVENT_GUARANTEE',
      'CAREER_ANNUAL_BRANCH_CLASH_IS_NOT_A_HIRING_FIRING_RESIGNATION_JOB_CHANGE_PROMOTION_OR_COMPENSATION_PREDICTION',
      'CURRENT_CAREER_AXES_ADJUSTMENT_AREAS_AND_EMPHASIS_REQUIRE_SOURCE_QUALIFICATION',
      'UNKNOWN_OR_AMBIGUOUS_NATAL_FACTS_MUST_FAIL_CLOSED_FOR_DEPENDENT_CLAIMS',
    ] as const),
    exceptions: Object.freeze([
      'THE_ADMITTED_NATAL_JEONG_GWAN_DAY_BRANCH_POSITION_COMPONENT_DOES_NOT_GENERALIZE_TO_ANNUAL_SCOPE',
      'MISSING_CAREER_ANNUAL_SEMANTIC_AUTHORITY_CANNOT_BE_FILLED_BY_CAREER_NATAL_REUSE_GENERAL_ANNUAL_LOGIC_PRODUCT_POLICY_NARRATIVE_COPY_OR_READING_PROFILE_COVERAGE',
    ] as const),
    conflictingAuthorities: Object.freeze([] as const),
    schoolDependency: 'NOT_ESTABLISHED_BY_CURRENT_INTERNAL_CAREER_ANNUAL_POLICY_SOURCE' as const,
    lifecycleState: 'research' as const,
  });

  const sourceResearchBlockers = Object.freeze([
    Object.freeze({
      code: 'CAREER_ANNUAL_THEME_SEMANTIC_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: CAREER_ANNUAL_POLICY_SOURCE.sourceId,
      observedSourceType: CAREER_ANNUAL_POLICY_SOURCE.sourceType,
      observedProvenanceTier: CAREER_ANNUAL_POLICY_SOURCE.provenanceTier,
    }),
    Object.freeze({
      code: 'CAREER_ANNUAL_BRANCH_CLASH_WORK_ADJUSTMENT_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: CAREER_ANNUAL_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'CAREER_ANNUAL_AXIS_ADJUSTMENT_AREA_AND_EMPHASIS_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: CAREER_ANNUAL_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'CAREER_ANNUAL_SPECIFIC_METHODOLOGY_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      careerNatalAuthorityMayBeInheritedAutomatically: false as const,
      generalAnnualAuthorityMayBeInheritedAutomatically: false as const,
    }),
  ]);

  const authorityState = Object.freeze({
    candidateRepresentable: true as const,
    boundedResearchRegistryAvailable:
      registry.snapshot.rules.length === annualRules.length + reusedNatalRules.length,
    internalCareerAnnualPolicyPresent: true as const,
    boundedNatalPositionAuthorityComponentObserved: true as const,
    careerAnnualSpecificSourceAuthorityEstablished: false as const,
    careerAnnualInterpretiveEmphasisAuthorityEstablished: false as const,
    domainReviewAuthorityEstablished: false as const,
    trustedDomainAttestationEstablished: false as const,
    provenanceQualityPromotionAuthorized: false as const,
    lifecyclePromotionAuthorized: false as const,
    engineAuthorityPromotionAuthorized: false as const,
    previewExpansionAuthorized: false as const,
    officialReadingAuthorityAuthorized: false as const,
    productionAdmissionAuthority: false as const,
    production: 'HOLD' as const,
  });

  const decision = Object.freeze({
    disposition: 'RETURN_TO_RESEARCH' as CareerAnnualBridgeDecision,
    reason:
      'The Career Annual candidate is executable and bounded, but its T9 career semantics are grounded only in an internal research/product policy with heuristic, experimental, unreviewed quality. Reused Career Natal T8 rules remain research-only, and the one already-admitted bounded Natal Position component is explicitly natal-only and cannot be generalized into Career Annual authority. Annual temporal facts, narrative copy, and Reading Profile coverage do not establish Career Annual semantic authority.',
    rejected: false as const,
    candidateMayRemainResearchOnly: true as const,
    reReviewRequiredAfterResearch: true as const,
  });

  const material = Object.freeze({
    reviewVersion: CAREER_ANNUAL_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1540' as const,
    auditBaseSha: '3106b165f9a0d544a74d3612018508a81309ddea' as const,
    candidateState,
    evidence: Object.freeze({
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
      annualSourceId: CAREER_ANNUAL_POLICY_SOURCE.sourceId,
      annualSourceType: CAREER_ANNUAL_POLICY_SOURCE.sourceType,
      annualSourceProvenanceTier: CAREER_ANNUAL_POLICY_SOURCE.provenanceTier,
    }),
    natalGovernanceBoundary,
    temporalFactBoundary,
    reviewSchema,
    sourceResearchBlockers,
    authorityState,
    decision,
    reReviewEntryCriteria: Object.freeze({
      research: RESEARCH_PREREQUISITES,
      laterGovernance: LATER_GOVERNANCE_PREREQUISITES,
    }),
    prohibitedExtensions: Object.freeze([
      'NO_CAREER_NATAL_TO_CAREER_ANNUAL_AUTHORITY_INHERITANCE',
      'NO_GENERAL_ANNUAL_TO_CAREER_ANNUAL_AUTHORITY_INHERITANCE',
      'NO_CAREER_ANNUAL_TO_CAREER_MONTHLY_AUTHORITY_EXPANSION',
      'NO_BOUNDED_NATAL_POSITION_COMPONENT_GENERALIZATION_TO_ANNUAL_SCOPE',
      'NO_INTERNAL_CAREER_ANNUAL_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_EXECUTABLE_CODE_FIXTURE_NARRATIVE_OR_READING_PROFILE_COVERAGE_AS_AUTHORITY',
      'NO_CURRENT_CAREER_AXES_ADJUSTMENT_AREAS_OR_EMPHASIS_AS_AUTHORITY_WITHOUT_SOURCE_SUPPORT',
      'NO_HIRING_FIRING_RESIGNATION_JOB_CHANGE_PROMOTION_COMPENSATION_OR_BUSINESS_SUCCESS_PREDICTION',
      'NO_REVIEW_OR_TRUST_FABRICATION',
      'NO_RESEARCH_LIFECYCLE_AUTOMATIC_PROMOTION',
      'NO_ENGINE_PREVIEW_OFFICIAL_OR_PRODUCTION_PROMOTION_FROM_THIS_REVIEW',
    ] as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}
