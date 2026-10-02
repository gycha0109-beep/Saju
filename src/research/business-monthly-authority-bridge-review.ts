import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  BUSINESS_MONTHLY_ACTIVATION_RULES,
  BUSINESS_MONTHLY_POLICY_SOURCE,
  BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
  BUSINESS_MONTHLY_READING_METHODOLOGY,
  BUSINESS_MONTHLY_TENSION_RULES,
  createBusinessMonthlyReadingCandidateRegistry,
} from './business-monthly-reading-candidate.js';
import {
  BUSINESS_NATAL_READING_CANDIDATE_VERSION,
  BUSINESS_NATAL_READING_METHODOLOGY,
  BUSINESS_NATAL_READING_RULES,
} from './business-natal-reading-candidate.js';

export const BUSINESS_MONTHLY_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-business-monthly-authority-bridge-review-v1' as const;

export type BusinessMonthlyBridgeDecision = 'RETURN_TO_RESEARCH';

const RESEARCH_PREREQUISITES = Object.freeze([
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_BUSINESS_MONTHLY_SEGMENT_STEM_TEN_GOD_OPERATING_SEMANTICS',
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_BUSINESS_MONTHLY_SEGMENT_TO_NATAL_BRANCH_CLASH_OPERATING_ADJUSTMENT_SEMANTICS_IF_RETAINED',
  'VERIFY_OR_REMOVE_CURRENT_BEFORE_AFTER_JEOL_BUSINESS_AXES_SEMANTIC_KEYS_ADJUSTMENT_AREAS_AND_INTERPRETIVE_EMPHASIS',
  'DEFINE_BUSINESS_MONTHLY_SPECIFIC_SCOPE_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_SCHOOL_DEPENDENCIES_AND_NON_IMPLICATIONS',
  'REVIEW_ANY_BUSINESS_NATAL_GENERAL_MONTHLY_CAREER_MONTHLY_WEALTH_MONTHLY_OR_BUSINESS_ANNUAL_REUSE_AT_CLAIM_LEVEL_WITHOUT_WHOLESALE_AUTHORITY_INHERITANCE',
  'SEPARATE_PRODUCT_POLICY_AND_TEMPORAL_SEGMENTATION_FROM_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY_FINANCIAL_ADVICE_AND_BUSINESS_OUTCOME_PREDICTION',
] as const);

const LATER_GOVERNANCE_PREREQUISITES = Object.freeze([
  'CREATE_A_CONTENT_ADDRESSED_REVIEW_SURFACE_ONLY_AFTER_BUSINESS_MONTHLY_SOURCE_AUTHORITY_IS_ESTABLISHED',
  'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_FOR_THE_EXACT_ADMISSIBLE_BUSINESS_MONTHLY_SUBJECTS',
  'OBTAIN_INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_THE_EXACT_ATTESTATION_HASHES',
  'RUN_SEPARATE_PROVENANCE_QUALITY_AND_LIFECYCLE_PROMOTION_REVIEWS',
] as const);

export function buildBusinessMonthlyAuthorityBridgeReview() {
  const registry = createBusinessMonthlyReadingCandidateRegistry();
  const monthlyRules = Object.freeze([
    ...BUSINESS_MONTHLY_ACTIVATION_RULES,
    ...BUSINESS_MONTHLY_TENSION_RULES,
  ]);
  const reusedNatalBusinessRules = Object.freeze(
    registry.rules.filter(
      (rule) => rule.taxonomy.tier === 'T8' && rule.taxonomy.category === 'business',
    ),
  );

  const candidateState = Object.freeze({
    version: BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
    packId: registry.pack.packId,
    packStatus: registry.pack.status,
    monthlyMethodologyId: BUSINESS_MONTHLY_READING_METHODOLOGY.methodologyId,
    monthlyMethodologyStatus: BUSINESS_MONTHLY_READING_METHODOLOGY.status,
    monthlySourceId: BUSINESS_MONTHLY_POLICY_SOURCE.sourceId,
    monthlySourceType: BUSINESS_MONTHLY_POLICY_SOURCE.sourceType,
    monthlySourceProvenanceTier: BUSINESS_MONTHLY_POLICY_SOURCE.provenanceTier,
    segmentCount: 2 as const,
    monthlyActivationRuleCount: BUSINESS_MONTHLY_ACTIVATION_RULES.length,
    monthlyTensionRuleCount: BUSINESS_MONTHLY_TENSION_RULES.length,
    monthlyRuleCount: monthlyRules.length,
    reusedNatalCandidateVersion: BUSINESS_NATAL_READING_CANDIDATE_VERSION,
    reusedNatalMethodologyId: BUSINESS_NATAL_READING_METHODOLOGY.methodologyId,
    reusedNatalMethodologyStatus: BUSINESS_NATAL_READING_METHODOLOGY.status,
    declaredNatalSpecialistRuleCount: BUSINESS_NATAL_READING_RULES.length,
    reusedNatalBusinessRuleCount: reusedNatalBusinessRules.length,
    registryRuleCount: registry.snapshot.rules.length,
    sharedChannelGatedNatalBusinessRulesPresent: reusedNatalBusinessRules.every((rule) =>
      rule.output.tags?.includes('shared-channel-gated'),
    ),
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
    allReusedNatalBusinessRulesResearchOnly: reusedNatalBusinessRules.every(
      (rule) => rule.status === 'research',
    ),
    allReusedNatalBusinessRulesSecondaryOnly: reusedNatalBusinessRules.every(
      (rule) => rule.quality.provenanceQuality === 'secondary_only',
    ),
    allReusedNatalBusinessRulesContested: reusedNatalBusinessRules.every(
      (rule) => rule.quality.methodologyStability === 'contested',
    ),
    allReusedNatalBusinessRulesUnreviewed: reusedNatalBusinessRules.every(
      (rule) => rule.quality.reviewerStatus === 'unreviewed',
    ),
  });

  const temporalFactBoundary = Object.freeze({
    scope: 'business:monthly' as const,
    requiredFactTypes: Object.freeze([...BUSINESS_MONTHLY_READING_METHODOLOGY.requiredFactTypes]),
    optionalFactTypes: Object.freeze([...BUSINESS_MONTHLY_READING_METHODOLOGY.optionalFactTypes]),
    targetMonthIsInputFactNotBusinessAuthority: true as const,
    jeolBoundaryIsSegmentationFactNotBusinessAuthority: true as const,
    segmentMonthlyPillarIsInputFactNotBusinessAuthority: true as const,
    segmentMonthlyStemTenGodIsInputFactNotBusinessThemeAuthority: true as const,
    segmentBranchRelationIsInputFactNotBusinessEventAuthority: true as const,
    businessNatalResearchReuseIsMonthlyAuthority: false as const,
    sharedChannelGateIsMonthlyAuthority: false as const,
    readingProfileCoverageIsSemanticAuthority: false as const,
    executableCandidateIsSemanticAuthority: false as const,
  });

  const reviewSchema = Object.freeze({
    authorityClasses: Object.freeze([
      'Methodology Authority',
      'Rule Authority',
      'Composition Authority',
      'Product Authority',
    ] as const),
    scope: 'business:monthly' as const,
    requiredInputs: temporalFactBoundary.requiredFactTypes,
    preconditions: Object.freeze([
      'REQUEST_TARGET_YEAR_AND_MONTH_RESOLVED',
      'EXACT_JEOL_BOUNDARY_RESOLVED_FOR_THE_CIVIL_MONTH',
      'BEFORE_AND_AFTER_JEOL_SEGMENT_IDENTITIES_RESOLVED',
      'SEGMENT_MONTHLY_PILLAR_RESOLVED_BEFORE_ANY_BUSINESS_MONTHLY_CLAIM',
      'NATAL_DAY_MASTER_RESOLVED_FOR_SEGMENT_STEM_TEN_GOD',
      'SEGMENT_TO_NATAL_BRANCH_RELATION_RESOLVED_BEFORE_ANY_BUSINESS_TENSION_CLAIM',
      'ANY_REUSED_NATAL_OR_OTHER_DOMAIN_TEMPORAL_AUTHORITY_MUST_BE_REVIEWED_FOR_BUSINESS_MONTHLY_APPLICABILITY_AT_CLAIM_LEVEL',
    ] as const),
    allowedConclusion: Object.freeze([
      'CURRENT_CODE_DEMONSTRATES_A_SOLAR_TERM_AWARE_BOUNDED_BUSINESS_MONTHLY_RESEARCH_EXECUTION_SURFACE_ONLY',
      'BUSINESS_NATAL_RESEARCH_CLAIMS_AND_SHARED_CHANNEL_GATING_MAY_COEXIST_IN_THE_PACK_WITHOUT_CONFERRING_BUSINESS_MONTHLY_AUTHORITY',
      'JEOL_SEGMENTATION_AND_MONTHLY_FACTS_MAY_SERVE_AS_INPUT_PREREQUISITES_WITHOUT_CONFERRING_BUSINESS_MONTHLY_INTERPRETATION_AUTHORITY',
      'CURRENT_BUSINESS_MONTHLY_INTERPRETATION_SEMANTICS_AND_EMPHASIS_ARE_NOT_ADMITTED_AS_ENGINE_AUTHORITY',
      'NO_CURRENT_OUTPUT_AUTHORIZES_FINANCIAL_OR_INVESTMENT_ADVICE',
    ] as const),
    qualifiers: Object.freeze([
      'BUSINESS_MONTHLY_SEGMENT_STEM_TEN_GOD_THEME_IS_A_RESEARCH_OPERATING_TENDENCY_CANDIDATE_NOT_A_BUSINESS_OUTCOME_GUARANTEE',
      'BUSINESS_MONTHLY_SEGMENT_BRANCH_CLASH_IS_NOT_A_FAILURE_BANKRUPTCY_REVENUE_LOSS_FUNDING_FAILURE_PARTNER_BREAKUP_OR_SPECIFIC_BUSINESS_EVENT_PREDICTION',
      'BEFORE_AFTER_JEOL_SEGMENTATION_DOES_NOT_BY_ITSELF_AUTHORIZE_DIFFERENT_BUSINESS_MEANING_STRENGTH',
      'CURRENT_BUSINESS_AXES_ADJUSTMENT_AREAS_AND_PILLAR_SPECIFIC_EMPHASIS_REQUIRE_SOURCE_QUALIFICATION',
      'NO_OUTPUT_CONSTITUTES_FINANCIAL_OR_INVESTMENT_ADVICE',
    ] as const),
    exceptions: Object.freeze([
      'MISSING_BUSINESS_MONTHLY_SEMANTIC_AUTHORITY_CANNOT_BE_FILLED_BY_BUSINESS_NATAL_REUSE_SHARED_CHANNEL_GATING_GENERAL_MONTHLY_LOGIC_CAREER_MONTHLY_LOGIC_WEALTH_MONTHLY_LOGIC_BUSINESS_ANNUAL_LOGIC_PRODUCT_POLICY_TEMPORAL_PRECISION_OR_READING_PROFILE_COVERAGE',
    ] as const),
    conflictingAuthorities: Object.freeze([] as const),
    schoolDependency: 'NOT_ESTABLISHED_BY_CURRENT_INTERNAL_BUSINESS_MONTHLY_POLICY_SOURCE' as const,
    lifecycleState: 'research' as const,
  });

  const sourceResearchBlockers = Object.freeze([
    Object.freeze({
      code: 'BUSINESS_MONTHLY_SEGMENT_THEME_SEMANTIC_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: BUSINESS_MONTHLY_POLICY_SOURCE.sourceId,
      observedSourceType: BUSINESS_MONTHLY_POLICY_SOURCE.sourceType,
      observedProvenanceTier: BUSINESS_MONTHLY_POLICY_SOURCE.provenanceTier,
    }),
    Object.freeze({
      code: 'BUSINESS_MONTHLY_SEGMENT_BRANCH_CLASH_OPERATING_ADJUSTMENT_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: BUSINESS_MONTHLY_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'BUSINESS_MONTHLY_SEGMENT_AXIS_ADJUSTMENT_AREA_AND_EMPHASIS_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: BUSINESS_MONTHLY_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'BUSINESS_MONTHLY_SPECIFIC_METHODOLOGY_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      businessNatalAuthorityMayBeInheritedAutomatically: false as const,
      generalMonthlyAuthorityMayBeInheritedAutomatically: false as const,
      careerMonthlyAuthorityMayBeInheritedAutomatically: false as const,
      wealthMonthlyAuthorityMayBeInheritedAutomatically: false as const,
      businessAnnualAuthorityMayBeInheritedAutomatically: false as const,
    }),
  ]);

  const authorityState = Object.freeze({
    candidateRepresentable: true as const,
    boundedResearchRegistryAvailable: registry.snapshot.rules.length > monthlyRules.length,
    internalBusinessMonthlyPolicyPresent: true as const,
    exactJeolSegmentationCapabilityPresent: true as const,
    sharedChannelGatedNatalResearchPresent:
      reusedNatalBusinessRules.length === BUSINESS_NATAL_READING_RULES.length,
    businessMonthlySpecificSourceAuthorityEstablished: false as const,
    businessMonthlyInterpretiveEmphasisAuthorityEstablished: false as const,
    financialOrInvestmentAdviceAuthorized: false as const,
    businessOutcomePredictionAuthorized: false as const,
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
    disposition: 'RETURN_TO_RESEARCH' as BusinessMonthlyBridgeDecision,
    reason:
      'The Business Monthly candidate is executable, solar-term-aware, and bounded, but its T9 operating semantics and emphasis are grounded only in an internal research/product policy with heuristic, experimental, unreviewed quality. Reused Business Natal specialist rules remain research-only, and their shared-channel gate is an evidence-specificity constraint rather than Monthly semantic authority. Exact jeol segmentation, monthly temporal facts, implementation coverage, and product policy do not establish Business Monthly semantic authority, business-outcome prediction authority, or financial-advice authority.',
    rejected: false as const,
    candidateMayRemainResearchOnly: true as const,
    reReviewRequiredAfterResearch: true as const,
  });

  const material = Object.freeze({
    reviewVersion: BUSINESS_MONTHLY_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1584' as const,
    auditBaseSha: 'b54f8d507fef44deeb18fa4bbda2fea1ad482926' as const,
    candidateState,
    evidence: Object.freeze({
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
      monthlySourceId: BUSINESS_MONTHLY_POLICY_SOURCE.sourceId,
      monthlySourceType: BUSINESS_MONTHLY_POLICY_SOURCE.sourceType,
      monthlySourceProvenanceTier: BUSINESS_MONTHLY_POLICY_SOURCE.provenanceTier,
    }),
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
      'NO_BUSINESS_NATAL_TO_BUSINESS_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_GENERAL_MONTHLY_TO_BUSINESS_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_CAREER_MONTHLY_TO_BUSINESS_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_WEALTH_MONTHLY_TO_BUSINESS_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_BUSINESS_ANNUAL_TO_BUSINESS_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_SHARED_CHANNEL_GATE_AS_BUSINESS_MONTHLY_SEMANTIC_AUTHORITY',
      'NO_INTERNAL_BUSINESS_MONTHLY_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_EXACT_JEOL_SEGMENTATION_AS_BUSINESS_INTERPRETATION_AUTHORITY',
      'NO_TEMPORAL_FACT_EXECUTABILITY_FIXTURE_OR_READING_PROFILE_COVERAGE_AS_AUTHORITY',
      'NO_CURRENT_BUSINESS_AXES_ADJUSTMENT_AREAS_OR_EMPHASIS_AS_AUTHORITY_WITHOUT_SOURCE_SUPPORT',
      'NO_BUSINESS_SUCCESS_FAILURE_REVENUE_PROFIT_FUNDING_INVESTMENT_BANKRUPTCY_PARTNER_BREAKUP_MARKET_EVENT_INDUSTRY_OUTCOME_FOUNDER_SUITABILITY_OR_GUARANTEED_TIMING_PREDICTION',
      'NO_FINANCIAL_OR_INVESTMENT_ADVICE_AUTHORIZATION',
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
