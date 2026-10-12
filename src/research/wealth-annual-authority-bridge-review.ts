import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  WEALTH_ANNUAL_ACTIVATION_RULES,
  WEALTH_ANNUAL_POLICY_SOURCE,
  WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
  WEALTH_ANNUAL_READING_METHODOLOGY,
  WEALTH_ANNUAL_READING_PACK,
  WEALTH_ANNUAL_TENSION_RULES,
  createWealthAnnualReadingCandidateRegistry,
} from './wealth-annual-reading-candidate.js';
import {
  WEALTH_NATAL_READING_CANDIDATE_VERSION,
  WEALTH_NATAL_READING_METHODOLOGY,
  WEALTH_NATAL_READING_RULES,
} from './wealth-natal-reading-candidate.js';

export const WEALTH_ANNUAL_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-wealth-annual-authority-bridge-review-v1' as const;

export type WealthAnnualBridgeDecision = 'RETURN_TO_RESEARCH';

const RESEARCH_PREREQUISITES = Object.freeze([
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_WEALTH_ANNUAL_STEM_TEN_GOD_MONEY_MANAGEMENT_SEMANTICS',
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_WEALTH_ANNUAL_TO_NATAL_BRANCH_CLASH_FINANCIAL_PLAN_ADJUSTMENT_SEMANTICS_IF_RETAINED',
  'VERIFY_OR_REMOVE_CURRENT_WEALTH_AXES_SEMANTIC_KEYS_ADJUSTMENT_AREAS_AND_INTERPRETIVE_EMPHASIS',
  'DEFINE_WEALTH_ANNUAL_SPECIFIC_SCOPE_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_SCHOOL_DEPENDENCIES_AND_NON_IMPLICATIONS',
  'REVIEW_ANY_WEALTH_NATAL_GENERAL_ANNUAL_OR_CAREER_ANNUAL_REUSE_AT_CLAIM_LEVEL_WITHOUT_WHOLESALE_AUTHORITY_INHERITANCE',
  'SEPARATE_PRODUCT_POLICY_FROM_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY_AND_FINANCIAL_ADVICE',
] as const);

const LATER_GOVERNANCE_PREREQUISITES = Object.freeze([
  'CREATE_A_CONTENT_ADDRESSED_REVIEW_SURFACE_ONLY_AFTER_WEALTH_ANNUAL_SOURCE_AUTHORITY_IS_ESTABLISHED',
  'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_FOR_THE_EXACT_ADMISSIBLE_WEALTH_ANNUAL_SUBJECTS',
  'OBTAIN_INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_THE_EXACT_ATTESTATION_HASHES',
  'RUN_SEPARATE_PROVENANCE_QUALITY_AND_LIFECYCLE_PROMOTION_REVIEWS',
] as const);

export function buildWealthAnnualAuthorityBridgeReview() {
  const registry = createWealthAnnualReadingCandidateRegistry();
  const annualRules = Object.freeze([
    ...WEALTH_ANNUAL_ACTIVATION_RULES,
    ...WEALTH_ANNUAL_TENSION_RULES,
  ]);
  const reusedNatalRules = Object.freeze([...WEALTH_NATAL_READING_RULES]);

  const candidateState = Object.freeze({
    version: WEALTH_ANNUAL_READING_CANDIDATE_VERSION,
    packId: WEALTH_ANNUAL_READING_PACK.packId,
    packStatus: WEALTH_ANNUAL_READING_PACK.status,
    annualMethodologyId: WEALTH_ANNUAL_READING_METHODOLOGY.methodologyId,
    annualMethodologyStatus: WEALTH_ANNUAL_READING_METHODOLOGY.status,
    annualSourceId: WEALTH_ANNUAL_POLICY_SOURCE.sourceId,
    annualSourceType: WEALTH_ANNUAL_POLICY_SOURCE.sourceType,
    annualSourceProvenanceTier: WEALTH_ANNUAL_POLICY_SOURCE.provenanceTier,
    annualActivationRuleCount: WEALTH_ANNUAL_ACTIVATION_RULES.length,
    annualTensionRuleCount: WEALTH_ANNUAL_TENSION_RULES.length,
    annualRuleCount: annualRules.length,
    reusedNatalCandidateVersion: WEALTH_NATAL_READING_CANDIDATE_VERSION,
    reusedNatalMethodologyId: WEALTH_NATAL_READING_METHODOLOGY.methodologyId,
    reusedNatalMethodologyStatus: WEALTH_NATAL_READING_METHODOLOGY.status,
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

  const temporalFactBoundary = Object.freeze({
    scope: 'wealth:annual' as const,
    requiredFactTypes: Object.freeze([...WEALTH_ANNUAL_READING_METHODOLOGY.requiredFactTypes]),
    optionalFactTypes: Object.freeze([...WEALTH_ANNUAL_READING_METHODOLOGY.optionalFactTypes]),
    annualPillarIsInputFactNotWealthAuthority: true as const,
    annualStemTenGodIsInputFactNotWealthThemeAuthority: true as const,
    annualBranchRelationIsInputFactNotFinancialEventAuthority: true as const,
    wealthNatalResearchReuseIsAnnualAuthority: false as const,
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
    scope: 'wealth:annual' as const,
    requiredInputs: temporalFactBoundary.requiredFactTypes,
    preconditions: Object.freeze([
      'REQUEST_TARGET_YEAR_RESOLVED',
      'ANNUAL_PILLAR_RESOLVED',
      'NATAL_DAY_MASTER_RESOLVED_FOR_ANNUAL_STEM_TEN_GOD',
      'ANNUAL_TO_NATAL_BRANCH_RELATION_RESOLVED_BEFORE_ANY_WEALTH_TENSION_CLAIM',
      'ANY_REUSED_NATAL_OR_OTHER_DOMAIN_TEMPORAL_AUTHORITY_MUST_BE_REVIEWED_FOR_WEALTH_ANNUAL_APPLICABILITY_AT_CLAIM_LEVEL',
    ] as const),
    allowedConclusion: Object.freeze([
      'CURRENT_CODE_DEMONSTRATES_A_BOUNDED_WEALTH_ANNUAL_RESEARCH_EXECUTION_SURFACE_ONLY',
      'WEALTH_NATAL_RESEARCH_CLAIMS_MAY_COEXIST_IN_THE_PACK_WITHOUT_CONFERRING_WEALTH_ANNUAL_AUTHORITY',
      'TEMPORAL_FACTS_MAY_SERVE_AS_INPUT_PREREQUISITES_WITHOUT_CONFERRING_WEALTH_ANNUAL_INTERPRETATION_AUTHORITY',
      'CURRENT_WEALTH_ANNUAL_INTERPRETATION_SEMANTICS_ARE_NOT_ADMITTED_AS_ENGINE_AUTHORITY',
      'NO_CURRENT_OUTPUT_AUTHORIZES_FINANCIAL_ADVICE',
    ] as const),
    qualifiers: Object.freeze([
      'WEALTH_ANNUAL_STEM_TEN_GOD_THEME_IS_A_RESEARCH_MONEY_MANAGEMENT_CANDIDATE_NOT_A_FINANCIAL_OUTCOME_GUARANTEE',
      'WEALTH_ANNUAL_BRANCH_CLASH_IS_NOT_AN_INCOME_RETURN_LOSS_DEBT_WINDFALL_OR_MARKET_EVENT_PREDICTION',
      'CURRENT_WEALTH_AXES_ADJUSTMENT_AREAS_AND_EMPHASIS_REQUIRE_SOURCE_QUALIFICATION',
      'NO_OUTPUT_CONSTITUTES_INVESTMENT_TAX_CREDIT_DEBT_INSURANCE_OR_OTHER_FINANCIAL_ADVICE',
    ] as const),
    exceptions: Object.freeze([
      'MISSING_WEALTH_ANNUAL_SEMANTIC_AUTHORITY_CANNOT_BE_FILLED_BY_WEALTH_NATAL_REUSE_GENERAL_ANNUAL_LOGIC_CAREER_ANNUAL_LOGIC_PRODUCT_POLICY_OR_READING_PROFILE_COVERAGE',
    ] as const),
    conflictingAuthorities: Object.freeze([] as const),
    schoolDependency: 'NOT_ESTABLISHED_BY_CURRENT_INTERNAL_WEALTH_ANNUAL_POLICY_SOURCE' as const,
    lifecycleState: 'research' as const,
  });

  const sourceResearchBlockers = Object.freeze([
    Object.freeze({
      code: 'WEALTH_ANNUAL_THEME_SEMANTIC_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: WEALTH_ANNUAL_POLICY_SOURCE.sourceId,
      observedSourceType: WEALTH_ANNUAL_POLICY_SOURCE.sourceType,
      observedProvenanceTier: WEALTH_ANNUAL_POLICY_SOURCE.provenanceTier,
    }),
    Object.freeze({
      code: 'WEALTH_ANNUAL_BRANCH_CLASH_FINANCIAL_PLAN_ADJUSTMENT_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: WEALTH_ANNUAL_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'WEALTH_ANNUAL_AXIS_ADJUSTMENT_AREA_AND_EMPHASIS_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: WEALTH_ANNUAL_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'WEALTH_ANNUAL_SPECIFIC_METHODOLOGY_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      wealthNatalAuthorityMayBeInheritedAutomatically: false as const,
      generalAnnualAuthorityMayBeInheritedAutomatically: false as const,
      careerAnnualAuthorityMayBeInheritedAutomatically: false as const,
    }),
  ]);

  const authorityState = Object.freeze({
    candidateRepresentable: true as const,
    boundedResearchRegistryAvailable: registry.snapshot.rules.length >= annualRules.length + reusedNatalRules.length,
    internalWealthAnnualPolicyPresent: true as const,
    wealthAnnualSpecificSourceAuthorityEstablished: false as const,
    wealthAnnualInterpretiveEmphasisAuthorityEstablished: false as const,
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
    disposition: 'RETURN_TO_RESEARCH' as WealthAnnualBridgeDecision,
    reason:
      'The Wealth Annual candidate is executable and bounded, but its T9 money-management semantics are grounded only in an internal research/product policy with heuristic, experimental, unreviewed quality. Reused Wealth Natal rules remain research-only. Annual temporal facts, implementation coverage, and product policy do not establish Wealth Annual semantic authority or financial-advice authority.',
    rejected: false as const,
    candidateMayRemainResearchOnly: true as const,
    reReviewRequiredAfterResearch: true as const,
  });

  const material = Object.freeze({
    reviewVersion: WEALTH_ANNUAL_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1554' as const,
    auditBaseSha: 'b2f689f355b44c90daea05f3a1818a2558265bcf' as const,
    candidateState,
    evidence: Object.freeze({
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
      annualSourceId: WEALTH_ANNUAL_POLICY_SOURCE.sourceId,
      annualSourceType: WEALTH_ANNUAL_POLICY_SOURCE.sourceType,
      annualSourceProvenanceTier: WEALTH_ANNUAL_POLICY_SOURCE.provenanceTier,
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
      'NO_WEALTH_NATAL_TO_WEALTH_ANNUAL_AUTHORITY_INHERITANCE',
      'NO_GENERAL_ANNUAL_TO_WEALTH_ANNUAL_AUTHORITY_INHERITANCE',
      'NO_CAREER_ANNUAL_TO_WEALTH_ANNUAL_AUTHORITY_INHERITANCE',
      'NO_WEALTH_ANNUAL_TO_WEALTH_MONTHLY_AUTHORITY_EXPANSION',
      'NO_INTERNAL_WEALTH_ANNUAL_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
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
