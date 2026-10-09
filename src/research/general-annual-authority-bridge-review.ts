import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_ANNUAL_ACTIVATION_RULES,
  GENERAL_ANNUAL_POLICY_SOURCE,
  GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
  GENERAL_ANNUAL_READING_METHODOLOGY,
  GENERAL_ANNUAL_READING_PACK,
  GENERAL_ANNUAL_TENSION_RULES,
  createGeneralAnnualReadingCandidateRegistry,
} from './general-annual-reading-candidate.js';

export const GENERAL_ANNUAL_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-general-annual-authority-bridge-review-v1' as const;

export type GeneralAnnualBridgeDecision = 'RETURN_TO_RESEARCH';

const RESEARCH_PREREQUISITES = Object.freeze([
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_ANNUAL_STEM_TEN_GOD_THEME_SEMANTICS',
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_ANNUAL_TO_NATAL_BRANCH_CLASH_TENSION_SEMANTICS_IF_RETAINED',
  'DEFINE_ANNUAL_SPECIFIC_SCOPE_QUALIFIERS_EXCEPTIONS_AND_COUNTEREXAMPLES_WITHOUT_INHERITING_NATAL_AUTHORITY',
  'SEPARATE_PRODUCT_POLICY_PACKAGING_FROM_SAJU_SEMANTIC_AUTHORITY',
  'PRESERVE_TEMPORAL_FACT_DERIVATION_AS_INPUT_EVIDENCE_NOT_INTERPRETATION_AUTHORITY',
] as const);

const LATER_GOVERNANCE_PREREQUISITES = Object.freeze([
  'CREATE_A_CONTENT_ADDRESSED_REVIEW_SURFACE_ONLY_AFTER_ANNUAL_SOURCE_AUTHORITY_IS_ESTABLISHED',
  'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_FOR_THE_EXACT_ADMISSIBLE_ANNUAL_SUBJECTS',
  'OBTAIN_INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_THE_EXACT_ATTESTATION_HASHES',
  'RUN_SEPARATE_PROVENANCE_QUALITY_AND_LIFECYCLE_PROMOTION_REVIEWS',
] as const);

export function buildGeneralAnnualAuthorityBridgeReview() {
  const registry = createGeneralAnnualReadingCandidateRegistry();
  const rules = Object.freeze([
    ...GENERAL_ANNUAL_ACTIVATION_RULES,
    ...GENERAL_ANNUAL_TENSION_RULES,
  ]);

  const candidateState = Object.freeze({
    version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
    packId: GENERAL_ANNUAL_READING_PACK.packId,
    packStatus: GENERAL_ANNUAL_READING_PACK.status,
    methodologyId: GENERAL_ANNUAL_READING_METHODOLOGY.methodologyId,
    methodologyStatus: GENERAL_ANNUAL_READING_METHODOLOGY.status,
    sourceId: GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
    sourceType: GENERAL_ANNUAL_POLICY_SOURCE.sourceType,
    sourceProvenanceTier: GENERAL_ANNUAL_POLICY_SOURCE.provenanceTier,
    activationRuleCount: GENERAL_ANNUAL_ACTIVATION_RULES.length,
    tensionRuleCount: GENERAL_ANNUAL_TENSION_RULES.length,
    ruleCount: rules.length,
    allRulesResearchOnly: rules.every((rule) => rule.status === 'research'),
    allRulesHeuristic: rules.every(
      (rule) => rule.quality.provenanceQuality === 'heuristic',
    ),
    allRulesExperimental: rules.every(
      (rule) => rule.quality.methodologyStability === 'experimental',
    ),
    allRulesUnreviewed: rules.every(
      (rule) => rule.quality.reviewerStatus === 'unreviewed',
    ),
  });

  const temporalFactBoundary = Object.freeze({
    scope: 'annual' as const,
    requiredFactTypes: Object.freeze([
      ...GENERAL_ANNUAL_READING_METHODOLOGY.requiredFactTypes,
    ]),
    optionalFactTypes: Object.freeze([
      ...GENERAL_ANNUAL_READING_METHODOLOGY.optionalFactTypes,
    ]),
    annualPillarIsInputFactNotInterpretationAuthority: true as const,
    annualStemTenGodIsInputFactNotThemeAuthority: true as const,
    annualBranchRelationIsInputFactNotEventAuthority: true as const,
    readingProfileCoverageIsSemanticAuthority: false as const,
    executableCandidateIsSemanticAuthority: false as const,
  });

  const reviewSchema = Object.freeze({
    authorityClasses: Object.freeze([
      'Methodology Authority',
      'Rule Authority',
      'Composition Authority',
    ] as const),
    scope: 'general:annual' as const,
    requiredInputs: temporalFactBoundary.requiredFactTypes,
    preconditions: Object.freeze([
      'REQUEST_TARGET_YEAR_RESOLVED',
      'ANNUAL_PILLAR_RESOLVED',
      'NATAL_DAY_MASTER_RESOLVED_FOR_ANNUAL_STEM_TEN_GOD',
      'ANNUAL_TO_NATAL_BRANCH_RELATION_RESOLVED_BEFORE_ANY_TENSION_CLAIM',
    ] as const),
    allowedConclusion: Object.freeze([
      'CURRENT_CODE_DEMONSTRATES_A_BOUNDED_RESEARCH_EXECUTION_SURFACE_ONLY',
      'TEMPORAL_FACTS_MAY_SERVE_AS_INPUT_PREREQUISITES_WITHOUT_CONFERRING_INTERPRETATION_AUTHORITY',
      'CURRENT_ANNUAL_INTERPRETATION_SEMANTICS_ARE_NOT_ADMITTED_AS_ENGINE_AUTHORITY',
    ] as const),
    qualifiers: Object.freeze([
      'ANNUAL_STEM_TEN_GOD_THEME_IS_NOT_A_LUCK_SCORE_OR_EVENT_GUARANTEE',
      'ANNUAL_BRANCH_CLASH_IS_NOT_A_CONCRETE_EVENT_PREDICTION',
      'UNKNOWN_OR_AMBIGUOUS_NATAL_FACTS_MUST_FAIL_CLOSED_FOR_DEPENDENT_CLAIMS',
    ] as const),
    exceptions: Object.freeze([
      'UNRESOLVED_ANNUAL_OR_REQUIRED_NATAL_FACTS_DO_NOT_AUTHORIZE_FABRICATED_PERIOD_CLAIMS',
      'MISSING_ANNUAL_SEMANTIC_AUTHORITY_CANNOT_BE_FILLED_BY_PRODUCT_POLICY_OR_READING_PROFILE_COVERAGE',
    ] as const),
    conflictingAuthorities: Object.freeze([] as const),
    schoolDependency: 'NOT_ESTABLISHED_BY_CURRENT_INTERNAL_POLICY_SOURCE' as const,
    lifecycleState: 'research' as const,
  });

  const sourceResearchBlockers = Object.freeze([
    Object.freeze({
      code: 'ANNUAL_THEME_SEMANTIC_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
      observedSourceType: GENERAL_ANNUAL_POLICY_SOURCE.sourceType,
      observedProvenanceTier: GENERAL_ANNUAL_POLICY_SOURCE.provenanceTier,
    }),
    Object.freeze({
      code: 'ANNUAL_BRANCH_CLASH_TENSION_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'ANNUAL_SPECIFIC_METHODOLOGY_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      natalAuthorityMayBeInheritedAutomatically: false as const,
    }),
  ]);

  const authorityState = Object.freeze({
    candidateRepresentable: true as const,
    boundedResearchRegistryAvailable:
      registry.snapshot.rules.length === rules.length,
    internalProductPolicyPresent: true as const,
    annualSpecificSourceAuthorityEstablished: false as const,
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
    disposition: 'RETURN_TO_RESEARCH' as GeneralAnnualBridgeDecision,
    reason:
      'The General Annual candidate is executable and explicitly bounded, but its interpretation semantics are currently grounded only in an internal research/product policy with heuristic, experimental, unreviewed rule quality. Temporal fact derivation and Reading Profile coverage do not establish Annual-specific semantic authority, and Natal authority may not be inherited automatically.',
    rejected: false as const,
    candidateMayRemainResearchOnly: true as const,
    reReviewRequiredAfterResearch: true as const,
  });

  const material = Object.freeze({
    reviewVersion: GENERAL_ANNUAL_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1512' as const,
    auditBaseSha: 'f5d6fc648dbe135b03cac3296d84d34f33017fe0' as const,
    candidateState,
    evidence: Object.freeze({
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
      sourceId: GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
      sourceType: GENERAL_ANNUAL_POLICY_SOURCE.sourceType,
      sourceProvenanceTier: GENERAL_ANNUAL_POLICY_SOURCE.provenanceTier,
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
      'NO_NATAL_TO_ANNUAL_AUTHORITY_INHERITANCE',
      'NO_INTERNAL_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_EXECUTABLE_CODE_OR_FIXTURE_COVERAGE_AS_AUTHORITY',
      'NO_READING_PROFILE_COVERAGE_AS_AUTHORITY',
      'NO_ANNUAL_TO_MONTHLY_AUTHORITY_EXPANSION',
      'NO_DETERMINISTIC_FUTURE_EVENT_INFERENCE',
      'NO_LUCK_SCORE_OR_WEALTH_MAGNITUDE_INFERENCE',
      'NO_HEALTH_RELATIONSHIP_OR_GUARANTEED_TIMING_OUTCOME',
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
