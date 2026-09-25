import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_MONTHLY_ACTIVATION_RULES,
  CAREER_MONTHLY_POLICY_SOURCE,
  CAREER_MONTHLY_READING_CANDIDATE_VERSION,
  CAREER_MONTHLY_READING_METHODOLOGY,
  CAREER_MONTHLY_READING_PACK,
  CAREER_MONTHLY_TENSION_RULES,
  createCareerMonthlyReadingCandidateRegistry,
} from './career-monthly-reading-candidate.js';
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  CAREER_NATAL_READING_METHODOLOGY,
  CAREER_NATAL_READING_RULES,
} from './career-natal-reading-candidate.js';
import { CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY } from './career-personalization-position-current-t5-bridge-bounded-authority-admission-review.js';

export const CAREER_MONTHLY_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-career-monthly-authority-bridge-review-v1' as const;

export type CareerMonthlyBridgeDecision = 'RETURN_TO_RESEARCH';

const RESEARCH_PREREQUISITES = Object.freeze([
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_CAREER_MONTHLY_SEGMENT_STEM_TEN_GOD_WORKING_PATTERN_SEMANTICS',
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_CAREER_MONTHLY_SEGMENT_TO_NATAL_BRANCH_CLASH_WORK_ADJUSTMENT_SEMANTICS_IF_RETAINED',
  'VERIFY_OR_REMOVE_CURRENT_BEFORE_AFTER_JEOL_CAREER_AXES_SEMANTIC_KEYS_ADJUSTMENT_AREAS_AND_INTERPRETIVE_EMPHASIS',
  'DEFINE_CAREER_MONTHLY_SPECIFIC_SCOPE_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_AND_SCHOOL_DEPENDENCIES',
  'REVIEW_ANY_CAREER_NATAL_GENERAL_MONTHLY_OR_CAREER_ANNUAL_REUSE_AT_CLAIM_LEVEL_WITHOUT_WHOLESALE_AUTHORITY_INHERITANCE',
  'SEPARATE_PRODUCT_NARRATIVE_POLICY_AND_TEMPORAL_SEGMENTATION_FROM_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY',
] as const);

const LATER_GOVERNANCE_PREREQUISITES = Object.freeze([
  'CREATE_A_CONTENT_ADDRESSED_REVIEW_SURFACE_ONLY_AFTER_CAREER_MONTHLY_SOURCE_AUTHORITY_IS_ESTABLISHED',
  'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_FOR_THE_EXACT_ADMISSIBLE_CAREER_MONTHLY_SUBJECTS',
  'OBTAIN_INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_THE_EXACT_ATTESTATION_HASHES',
  'RUN_SEPARATE_PROVENANCE_QUALITY_AND_LIFECYCLE_PROMOTION_REVIEWS',
] as const);

export function buildCareerMonthlyAuthorityBridgeReview() {
  const registry = createCareerMonthlyReadingCandidateRegistry();
  const monthlyRules = Object.freeze([
    ...CAREER_MONTHLY_ACTIVATION_RULES,
    ...CAREER_MONTHLY_TENSION_RULES,
  ]);
  const reusedNatalRules = Object.freeze([...CAREER_NATAL_READING_RULES]);

  const candidateState = Object.freeze({
    version: CAREER_MONTHLY_READING_CANDIDATE_VERSION,
    packId: CAREER_MONTHLY_READING_PACK.packId,
    packStatus: CAREER_MONTHLY_READING_PACK.status,
    monthlyMethodologyId: CAREER_MONTHLY_READING_METHODOLOGY.methodologyId,
    monthlyMethodologyStatus: CAREER_MONTHLY_READING_METHODOLOGY.status,
    monthlySourceId: CAREER_MONTHLY_POLICY_SOURCE.sourceId,
    monthlySourceType: CAREER_MONTHLY_POLICY_SOURCE.sourceType,
    monthlySourceProvenanceTier: CAREER_MONTHLY_POLICY_SOURCE.provenanceTier,
    segmentCount: 2 as const,
    monthlyActivationRuleCount: CAREER_MONTHLY_ACTIVATION_RULES.length,
    monthlyTensionRuleCount: CAREER_MONTHLY_TENSION_RULES.length,
    monthlyRuleCount: monthlyRules.length,
    reusedNatalCandidateVersion: CAREER_NATAL_READING_CANDIDATE_VERSION,
    reusedNatalMethodologyId: CAREER_NATAL_READING_METHODOLOGY.methodologyId,
    reusedNatalMethodologyStatus: CAREER_NATAL_READING_METHODOLOGY.status,
    reusedNatalRuleCount: reusedNatalRules.length,
    registryRuleCount: registry.snapshot.rules.length,
    allMonthlyRulesResearchOnly: monthlyRules.every((rule) => rule.status === 'research'),
    allMonthlyRulesHeuristic: monthlyRules.every(
      (rule) => rule.quality.provenanceQuality === 'heuristic',
    ),
    allMonthlyRulesExperimental: monthlyRules.every(
      (rule) => rule.quality.methodologyStability === 'experimental',
    ),
    allMonthlyRulesUnreviewed: monthlyRules.every(
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
    boundedNatalComponentAuthorizesCareerMonthly: false as const,
    reusedNatalResearchExecutionAuthorizesCareerMonthly: false as const,
  });

  const temporalFactBoundary = Object.freeze({
    scope: 'career:monthly' as const,
    requiredFactTypes: Object.freeze([
      ...CAREER_MONTHLY_READING_METHODOLOGY.requiredFactTypes,
    ]),
    optionalFactTypes: Object.freeze([
      ...CAREER_MONTHLY_READING_METHODOLOGY.optionalFactTypes,
    ]),
    targetMonthIsInputFactNotCareerAuthority: true as const,
    jeolBoundaryIsSegmentationFactNotCareerAuthority: true as const,
    segmentMonthlyPillarIsInputFactNotCareerAuthority: true as const,
    segmentMonthlyStemTenGodIsInputFactNotCareerThemeAuthority: true as const,
    segmentBranchRelationIsInputFactNotCareerEventAuthority: true as const,
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
    scope: 'career:monthly' as const,
    requiredInputs: temporalFactBoundary.requiredFactTypes,
    preconditions: Object.freeze([
      'REQUEST_TARGET_YEAR_AND_MONTH_RESOLVED',
      'EXACT_JEOL_BOUNDARY_RESOLVED_FOR_THE_CIVIL_MONTH',
      'BEFORE_AND_AFTER_JEOL_SEGMENT_IDENTITIES_RESOLVED',
      'SEGMENT_MONTHLY_PILLAR_RESOLVED_BEFORE_ANY_CAREER_MONTHLY_CLAIM',
      'NATAL_DAY_MASTER_RESOLVED_FOR_SEGMENT_STEM_TEN_GOD',
      'SEGMENT_TO_NATAL_BRANCH_RELATION_RESOLVED_BEFORE_ANY_CAREER_TENSION_CLAIM',
      'ANY_REUSED_NATAL_OR_OTHER_TEMPORAL_AUTHORITY_MUST_BE_REVIEWED_FOR_CAREER_MONTHLY_APPLICABILITY_AT_CLAIM_LEVEL',
    ] as const),
    allowedConclusion: Object.freeze([
      'CURRENT_CODE_DEMONSTRATES_A_SOLAR_TERM_AWARE_BOUNDED_CAREER_MONTHLY_RESEARCH_EXECUTION_SURFACE_ONLY',
      'CAREER_NATAL_RESEARCH_CLAIMS_MAY_COEXIST_IN_THE_PACK_WITHOUT_CONFERRING_CAREER_MONTHLY_AUTHORITY',
      'THE_EXISTING_BOUNDED_NATAL_POSITION_AUTHORITY_COMPONENT_REMAINS_NATAL_ONLY',
      'JEOL_SEGMENTATION_AND_MONTHLY_FACTS_MAY_SERVE_AS_INPUT_PREREQUISITES_WITHOUT_CONFERRING_CAREER_MONTHLY_INTERPRETATION_AUTHORITY',
      'CURRENT_CAREER_MONTHLY_INTERPRETATION_SEMANTICS_AND_EMPHASIS_ARE_NOT_ADMITTED_AS_ENGINE_AUTHORITY',
    ] as const),
    qualifiers: Object.freeze([
      'CAREER_MONTHLY_SEGMENT_STEM_TEN_GOD_THEME_IS_A_RESEARCH_WORKING_PATTERN_CANDIDATE_NOT_A_CAREER_EVENT_GUARANTEE',
      'CAREER_MONTHLY_SEGMENT_BRANCH_CLASH_IS_NOT_A_HIRING_FIRING_RESIGNATION_JOB_CHANGE_PROMOTION_OR_COMPENSATION_PREDICTION',
      'BEFORE_AFTER_JEOL_SEGMENTATION_DOES_NOT_BY_ITSELF_AUTHORIZE_DIFFERENT_CAREER_MEANING_STRENGTH',
      'CURRENT_CAREER_AXES_ADJUSTMENT_AREAS_AND_PILLAR_SPECIFIC_EMPHASIS_REQUIRE_SOURCE_QUALIFICATION',
      'UNKNOWN_OR_AMBIGUOUS_NATAL_FACTS_MUST_FAIL_CLOSED_FOR_DEPENDENT_CLAIMS',
    ] as const),
    exceptions: Object.freeze([
      'THE_ADMITTED_NATAL_JEONG_GWAN_DAY_BRANCH_POSITION_COMPONENT_DOES_NOT_GENERALIZE_TO_MONTHLY_SCOPE',
      'MISSING_CAREER_MONTHLY_SEMANTIC_AUTHORITY_CANNOT_BE_FILLED_BY_CAREER_NATAL_REUSE_GENERAL_MONTHLY_LOGIC_CAREER_ANNUAL_LOGIC_PRODUCT_POLICY_TEMPORAL_PRECISION_NARRATIVE_COPY_OR_READING_PROFILE_COVERAGE',
    ] as const),
    conflictingAuthorities: Object.freeze([] as const),
    schoolDependency: 'NOT_ESTABLISHED_BY_CURRENT_INTERNAL_CAREER_MONTHLY_POLICY_SOURCE' as const,
    lifecycleState: 'research' as const,
  });

  const sourceResearchBlockers = Object.freeze([
    Object.freeze({
      code: 'CAREER_MONTHLY_SEGMENT_THEME_SEMANTIC_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: CAREER_MONTHLY_POLICY_SOURCE.sourceId,
      observedSourceType: CAREER_MONTHLY_POLICY_SOURCE.sourceType,
      observedProvenanceTier: CAREER_MONTHLY_POLICY_SOURCE.provenanceTier,
    }),
    Object.freeze({
      code: 'CAREER_MONTHLY_SEGMENT_BRANCH_CLASH_WORK_ADJUSTMENT_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: CAREER_MONTHLY_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'CAREER_MONTHLY_SEGMENT_AXIS_ADJUSTMENT_AREA_AND_EMPHASIS_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: CAREER_MONTHLY_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'CAREER_MONTHLY_SPECIFIC_METHODOLOGY_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      careerNatalAuthorityMayBeInheritedAutomatically: false as const,
      generalMonthlyAuthorityMayBeInheritedAutomatically: false as const,
      careerAnnualAuthorityMayBeInheritedAutomatically: false as const,
    }),
  ]);

  const authorityState = Object.freeze({
    candidateRepresentable: true as const,
    boundedResearchRegistryAvailable:
      registry.snapshot.rules.length === monthlyRules.length + reusedNatalRules.length,
    internalCareerMonthlyPolicyPresent: true as const,
    exactJeolSegmentationCapabilityPresent: true as const,
    boundedNatalPositionAuthorityComponentObserved: true as const,
    careerMonthlySpecificSourceAuthorityEstablished: false as const,
    careerMonthlyInterpretiveEmphasisAuthorityEstablished: false as const,
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
    disposition: 'RETURN_TO_RESEARCH' as CareerMonthlyBridgeDecision,
    reason:
      'The Career Monthly candidate is executable, solar-term-aware, and bounded, but its T9 career semantics and emphasis are grounded only in an internal research/product policy with heuristic, experimental, unreviewed quality. Reused Career Natal T8 rules remain research-only, and the one already-admitted bounded Natal Position component is explicitly natal-only. Exact jeol segmentation, monthly temporal facts, narrative copy, and Reading Profile coverage do not establish Career Monthly semantic authority.',
    rejected: false as const,
    candidateMayRemainResearchOnly: true as const,
    reReviewRequiredAfterResearch: true as const,
  });

  const material = Object.freeze({
    reviewVersion: CAREER_MONTHLY_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1546' as const,
    auditBaseSha: 'b521b716a363fcdac84cca5debb117e39601917b' as const,
    candidateState,
    evidence: Object.freeze({
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
      monthlySourceId: CAREER_MONTHLY_POLICY_SOURCE.sourceId,
      monthlySourceType: CAREER_MONTHLY_POLICY_SOURCE.sourceType,
      monthlySourceProvenanceTier: CAREER_MONTHLY_POLICY_SOURCE.provenanceTier,
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
      'NO_CAREER_NATAL_TO_CAREER_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_GENERAL_MONTHLY_TO_CAREER_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_CAREER_ANNUAL_TO_CAREER_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_BOUNDED_NATAL_POSITION_COMPONENT_GENERALIZATION_TO_MONTHLY_SCOPE',
      'NO_INTERNAL_CAREER_MONTHLY_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_EXACT_JEOL_SEGMENTATION_AS_CAREER_INTERPRETATION_AUTHORITY',
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
