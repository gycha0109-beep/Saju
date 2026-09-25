import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  WEALTH_MONTHLY_ACTIVATION_RULES,
  WEALTH_MONTHLY_POLICY_SOURCE,
  WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
  WEALTH_MONTHLY_READING_METHODOLOGY,
  WEALTH_MONTHLY_READING_PACK,
  WEALTH_MONTHLY_TENSION_RULES,
  createWealthMonthlyReadingCandidateRegistry,
} from './wealth-monthly-reading-candidate.js';
import {
  WEALTH_NATAL_READING_CANDIDATE_VERSION,
  WEALTH_NATAL_READING_METHODOLOGY,
  WEALTH_NATAL_READING_RULES,
} from './wealth-natal-reading-candidate.js';

export const WEALTH_MONTHLY_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-wealth-monthly-authority-bridge-review-v1' as const;

export type WealthMonthlyBridgeDecision = 'RETURN_TO_RESEARCH';

const RESEARCH_PREREQUISITES = Object.freeze([
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_WEALTH_MONTHLY_SEGMENT_STEM_TEN_GOD_MONEY_MANAGEMENT_SEMANTICS',
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_WEALTH_MONTHLY_SEGMENT_TO_NATAL_BRANCH_CLASH_FINANCIAL_PLAN_ADJUSTMENT_SEMANTICS_IF_RETAINED',
  'VERIFY_OR_REMOVE_CURRENT_BEFORE_AFTER_JEOL_WEALTH_AXES_SEMANTIC_KEYS_ADJUSTMENT_AREAS_AND_INTERPRETIVE_EMPHASIS',
  'DEFINE_WEALTH_MONTHLY_SPECIFIC_SCOPE_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_SCHOOL_DEPENDENCIES_AND_NON_IMPLICATIONS',
  'REVIEW_ANY_WEALTH_NATAL_GENERAL_MONTHLY_WEALTH_ANNUAL_OR_CAREER_MONTHLY_REUSE_AT_CLAIM_LEVEL_WITHOUT_WHOLESALE_AUTHORITY_INHERITANCE',
  'SEPARATE_PRODUCT_POLICY_AND_TEMPORAL_SEGMENTATION_FROM_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY_AND_FINANCIAL_ADVICE',
] as const);

const LATER_GOVERNANCE_PREREQUISITES = Object.freeze([
  'CREATE_A_CONTENT_ADDRESSED_REVIEW_SURFACE_ONLY_AFTER_WEALTH_MONTHLY_SOURCE_AUTHORITY_IS_ESTABLISHED',
  'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_FOR_THE_EXACT_ADMISSIBLE_WEALTH_MONTHLY_SUBJECTS',
  'OBTAIN_INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_THE_EXACT_ATTESTATION_HASHES',
  'RUN_SEPARATE_PROVENANCE_QUALITY_AND_LIFECYCLE_PROMOTION_REVIEWS',
] as const);

export function buildWealthMonthlyAuthorityBridgeReview() {
  const registry = createWealthMonthlyReadingCandidateRegistry();
  const monthlyRules = Object.freeze([
    ...WEALTH_MONTHLY_ACTIVATION_RULES,
    ...WEALTH_MONTHLY_TENSION_RULES,
  ]);
  const reusedNatalRules = Object.freeze([...WEALTH_NATAL_READING_RULES]);

  const candidateState = Object.freeze({
    version: WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
    packId: WEALTH_MONTHLY_READING_PACK.packId,
    packStatus: WEALTH_MONTHLY_READING_PACK.status,
    monthlyMethodologyId: WEALTH_MONTHLY_READING_METHODOLOGY.methodologyId,
    monthlyMethodologyStatus: WEALTH_MONTHLY_READING_METHODOLOGY.status,
    monthlySourceId: WEALTH_MONTHLY_POLICY_SOURCE.sourceId,
    monthlySourceType: WEALTH_MONTHLY_POLICY_SOURCE.sourceType,
    monthlySourceProvenanceTier: WEALTH_MONTHLY_POLICY_SOURCE.provenanceTier,
    segmentCount: 2 as const,
    monthlyActivationRuleCount: WEALTH_MONTHLY_ACTIVATION_RULES.length,
    monthlyTensionRuleCount: WEALTH_MONTHLY_TENSION_RULES.length,
    monthlyRuleCount: monthlyRules.length,
    reusedNatalCandidateVersion: WEALTH_NATAL_READING_CANDIDATE_VERSION,
    reusedNatalMethodologyId: WEALTH_NATAL_READING_METHODOLOGY.methodologyId,
    reusedNatalMethodologyStatus: WEALTH_NATAL_READING_METHODOLOGY.status,
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

  const temporalFactBoundary = Object.freeze({
    scope: 'wealth:monthly' as const,
    requiredFactTypes: Object.freeze([...WEALTH_MONTHLY_READING_METHODOLOGY.requiredFactTypes]),
    optionalFactTypes: Object.freeze([...WEALTH_MONTHLY_READING_METHODOLOGY.optionalFactTypes]),
    targetMonthIsInputFactNotWealthAuthority: true as const,
    jeolBoundaryIsSegmentationFactNotWealthAuthority: true as const,
    segmentMonthlyPillarIsInputFactNotWealthAuthority: true as const,
    segmentMonthlyStemTenGodIsInputFactNotWealthThemeAuthority: true as const,
    segmentBranchRelationIsInputFactNotFinancialEventAuthority: true as const,
    wealthNatalResearchReuseIsMonthlyAuthority: false as const,
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
    scope: 'wealth:monthly' as const,
    requiredInputs: temporalFactBoundary.requiredFactTypes,
    preconditions: Object.freeze([
      'REQUEST_TARGET_YEAR_AND_MONTH_RESOLVED',
      'EXACT_JEOL_BOUNDARY_RESOLVED_FOR_THE_CIVIL_MONTH',
      'BEFORE_AND_AFTER_JEOL_SEGMENT_IDENTITIES_RESOLVED',
      'SEGMENT_MONTHLY_PILLAR_RESOLVED_BEFORE_ANY_WEALTH_MONTHLY_CLAIM',
      'NATAL_DAY_MASTER_RESOLVED_FOR_SEGMENT_STEM_TEN_GOD',
      'SEGMENT_TO_NATAL_BRANCH_RELATION_RESOLVED_BEFORE_ANY_WEALTH_TENSION_CLAIM',
      'ANY_REUSED_NATAL_OR_OTHER_DOMAIN_TEMPORAL_AUTHORITY_MUST_BE_REVIEWED_FOR_WEALTH_MONTHLY_APPLICABILITY_AT_CLAIM_LEVEL',
    ] as const),
    allowedConclusion: Object.freeze([
      'CURRENT_CODE_DEMONSTRATES_A_SOLAR_TERM_AWARE_BOUNDED_WEALTH_MONTHLY_RESEARCH_EXECUTION_SURFACE_ONLY',
      'WEALTH_NATAL_RESEARCH_CLAIMS_MAY_COEXIST_IN_THE_PACK_WITHOUT_CONFERRING_WEALTH_MONTHLY_AUTHORITY',
      'JEOL_SEGMENTATION_AND_MONTHLY_FACTS_MAY_SERVE_AS_INPUT_PREREQUISITES_WITHOUT_CONFERRING_WEALTH_MONTHLY_INTERPRETATION_AUTHORITY',
      'CURRENT_WEALTH_MONTHLY_INTERPRETATION_SEMANTICS_AND_EMPHASIS_ARE_NOT_ADMITTED_AS_ENGINE_AUTHORITY',
      'NO_CURRENT_OUTPUT_AUTHORIZES_FINANCIAL_ADVICE',
    ] as const),
    qualifiers: Object.freeze([
      'WEALTH_MONTHLY_SEGMENT_STEM_TEN_GOD_THEME_IS_A_RESEARCH_MONEY_MANAGEMENT_CANDIDATE_NOT_A_FINANCIAL_OUTCOME_GUARANTEE',
      'WEALTH_MONTHLY_SEGMENT_BRANCH_CLASH_IS_NOT_AN_INCOME_RETURN_LOSS_DEBT_WINDFALL_OR_MARKET_EVENT_PREDICTION',
      'BEFORE_AFTER_JEOL_SEGMENTATION_DOES_NOT_BY_ITSELF_AUTHORIZE_DIFFERENT_WEALTH_MEANING_STRENGTH',
      'CURRENT_WEALTH_AXES_ADJUSTMENT_AREAS_AND_PILLAR_SPECIFIC_EMPHASIS_REQUIRE_SOURCE_QUALIFICATION',
      'NO_OUTPUT_CONSTITUTES_INVESTMENT_TAX_CREDIT_DEBT_INSURANCE_OR_OTHER_FINANCIAL_ADVICE',
    ] as const),
    exceptions: Object.freeze([
      'MISSING_WEALTH_MONTHLY_SEMANTIC_AUTHORITY_CANNOT_BE_FILLED_BY_WEALTH_NATAL_REUSE_GENERAL_MONTHLY_LOGIC_WEALTH_ANNUAL_LOGIC_CAREER_MONTHLY_LOGIC_PRODUCT_POLICY_TEMPORAL_PRECISION_OR_READING_PROFILE_COVERAGE',
    ] as const),
    conflictingAuthorities: Object.freeze([] as const),
    schoolDependency: 'NOT_ESTABLISHED_BY_CURRENT_INTERNAL_WEALTH_MONTHLY_POLICY_SOURCE' as const,
    lifecycleState: 'research' as const,
  });

  const sourceResearchBlockers = Object.freeze([
    Object.freeze({
      code: 'WEALTH_MONTHLY_SEGMENT_THEME_SEMANTIC_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: WEALTH_MONTHLY_POLICY_SOURCE.sourceId,
      observedSourceType: WEALTH_MONTHLY_POLICY_SOURCE.sourceType,
      observedProvenanceTier: WEALTH_MONTHLY_POLICY_SOURCE.provenanceTier,
    }),
    Object.freeze({
      code: 'WEALTH_MONTHLY_SEGMENT_BRANCH_CLASH_FINANCIAL_PLAN_ADJUSTMENT_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: WEALTH_MONTHLY_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'WEALTH_MONTHLY_SEGMENT_AXIS_ADJUSTMENT_AREA_AND_EMPHASIS_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: WEALTH_MONTHLY_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'WEALTH_MONTHLY_SPECIFIC_METHODOLOGY_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      wealthNatalAuthorityMayBeInheritedAutomatically: false as const,
      generalMonthlyAuthorityMayBeInheritedAutomatically: false as const,
      wealthAnnualAuthorityMayBeInheritedAutomatically: false as const,
      careerMonthlyAuthorityMayBeInheritedAutomatically: false as const,
    }),
  ]);

  const authorityState = Object.freeze({
    candidateRepresentable: true as const,
    boundedResearchRegistryAvailable:
      registry.snapshot.rules.length >= monthlyRules.length + reusedNatalRules.length,
    internalWealthMonthlyPolicyPresent: true as const,
    exactJeolSegmentationCapabilityPresent: true as const,
    wealthMonthlySpecificSourceAuthorityEstablished: false as const,
    wealthMonthlyInterpretiveEmphasisAuthorityEstablished: false as const,
    financialAdviceAuthorized: false as const,
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
    disposition: 'RETURN_TO_RESEARCH' as WealthMonthlyBridgeDecision,
    reason:
      'The Wealth Monthly candidate is executable, solar-term-aware, and bounded, but its T9 money-management semantics and emphasis are grounded only in an internal research/product policy with heuristic, experimental, unreviewed quality. Reused Wealth Natal rules remain research-only. Exact jeol segmentation, monthly temporal facts, implementation coverage, and product policy do not establish Wealth Monthly semantic authority or financial-advice authority.',
    rejected: false as const,
    candidateMayRemainResearchOnly: true as const,
    reReviewRequiredAfterResearch: true as const,
  });

  const material = Object.freeze({
    reviewVersion: WEALTH_MONTHLY_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1561' as const,
    auditBaseSha: 'e1984df27ccdfed93b5118797a11f79342b6dd42' as const,
    candidateState,
    evidence: Object.freeze({
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
      monthlySourceId: WEALTH_MONTHLY_POLICY_SOURCE.sourceId,
      monthlySourceType: WEALTH_MONTHLY_POLICY_SOURCE.sourceType,
      monthlySourceProvenanceTier: WEALTH_MONTHLY_POLICY_SOURCE.provenanceTier,
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
      'NO_WEALTH_NATAL_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_GENERAL_MONTHLY_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_WEALTH_ANNUAL_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_CAREER_MONTHLY_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_INTERNAL_WEALTH_MONTHLY_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_EXACT_JEOL_SEGMENTATION_AS_WEALTH_INTERPRETATION_AUTHORITY',
      'NO_TEMPORAL_FACT_EXECUTABILITY_FIXTURE_OR_READING_PROFILE_COVERAGE_AS_AUTHORITY',
      'NO_CURRENT_WEALTH_AXES_ADJUSTMENT_AREAS_OR_EMPHASIS_AS_AUTHORITY_WITHOUT_SOURCE_SUPPORT',
      'NO_INCOME_RETURN_LOSS_DEBT_WINDFALL_MARKET_OR_SPECIFIC_FINANCIAL_EVENT_PREDICTION',
      'NO_FINANCIAL_ADVICE_AUTHORIZATION',
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
