import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_MONTHLY_ACTIVATION_RULES,
  GENERAL_MONTHLY_POLICY_SOURCE,
  GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
  GENERAL_MONTHLY_READING_METHODOLOGY,
  GENERAL_MONTHLY_READING_PACK,
  GENERAL_MONTHLY_TENSION_RULES,
  createGeneralMonthlyReadingCandidateRegistry,
} from './general-monthly-reading-candidate.js';

export const GENERAL_MONTHLY_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-general-monthly-authority-bridge-review-v1' as const;

export type GeneralMonthlyBridgeDecision = 'RETURN_TO_RESEARCH';

const RESEARCH_PREREQUISITES = Object.freeze([
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_MONTHLY_SEGMENT_STEM_TEN_GOD_THEME_SEMANTICS',
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_MONTHLY_SEGMENT_TO_NATAL_BRANCH_CLASH_TENSION_SEMANTICS_IF_RETAINED',
  'VERIFY_OR_REMOVE_BEFORE_AFTER_JEOL_AND_PILLAR_SPECIFIC_INTERPRETIVE_EMPHASIS',
  'DEFINE_MONTHLY_SPECIFIC_SCOPE_QUALIFIERS_EXCEPTIONS_AND_COUNTEREXAMPLES_WITHOUT_INHERITING_NATAL_OR_ANNUAL_AUTHORITY',
  'SEPARATE_PRODUCT_POLICY_AND_TEMPORAL_SEGMENTATION_FROM_SAJU_SEMANTIC_AUTHORITY',
] as const);

const LATER_GOVERNANCE_PREREQUISITES = Object.freeze([
  'CREATE_A_CONTENT_ADDRESSED_REVIEW_SURFACE_ONLY_AFTER_MONTHLY_SOURCE_AUTHORITY_IS_ESTABLISHED',
  'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_FOR_THE_EXACT_ADMISSIBLE_MONTHLY_SUBJECTS',
  'OBTAIN_INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_THE_EXACT_ATTESTATION_HASHES',
  'RUN_SEPARATE_PROVENANCE_QUALITY_AND_LIFECYCLE_PROMOTION_REVIEWS',
] as const);

export function buildGeneralMonthlyAuthorityBridgeReview() {
  const registry = createGeneralMonthlyReadingCandidateRegistry();
  const rules = Object.freeze([
    ...GENERAL_MONTHLY_ACTIVATION_RULES,
    ...GENERAL_MONTHLY_TENSION_RULES,
  ]);

  const candidateState = Object.freeze({
    version: GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
    packId: GENERAL_MONTHLY_READING_PACK.packId,
    packStatus: GENERAL_MONTHLY_READING_PACK.status,
    methodologyId: GENERAL_MONTHLY_READING_METHODOLOGY.methodologyId,
    methodologyStatus: GENERAL_MONTHLY_READING_METHODOLOGY.status,
    sourceId: GENERAL_MONTHLY_POLICY_SOURCE.sourceId,
    sourceType: GENERAL_MONTHLY_POLICY_SOURCE.sourceType,
    sourceProvenanceTier: GENERAL_MONTHLY_POLICY_SOURCE.provenanceTier,
    segmentCount: 2 as const,
    activationRuleCount: GENERAL_MONTHLY_ACTIVATION_RULES.length,
    tensionRuleCount: GENERAL_MONTHLY_TENSION_RULES.length,
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
    scope: 'monthly' as const,
    requiredFactTypes: Object.freeze([
      ...GENERAL_MONTHLY_READING_METHODOLOGY.requiredFactTypes,
    ]),
    optionalFactTypes: Object.freeze([
      ...GENERAL_MONTHLY_READING_METHODOLOGY.optionalFactTypes,
    ]),
    targetMonthIsInputFactNotInterpretationAuthority: true as const,
    jeolBoundaryIsSegmentationFactNotInterpretationAuthority: true as const,
    segmentMonthlyPillarIsInputFactNotInterpretationAuthority: true as const,
    segmentMonthlyStemTenGodIsInputFactNotThemeAuthority: true as const,
    segmentBranchRelationIsInputFactNotEventAuthority: true as const,
    executableCandidateIsSemanticAuthority: false as const,
    readingProfileCoverageIsSemanticAuthority: false as const,
  });

  const reviewSchema = Object.freeze({
    authorityClasses: Object.freeze([
      'Methodology Authority',
      'Rule Authority',
      'Composition Authority',
    ] as const),
    scope: 'general:monthly' as const,
    requiredInputs: temporalFactBoundary.requiredFactTypes,
    preconditions: Object.freeze([
      'REQUEST_TARGET_YEAR_AND_MONTH_RESOLVED',
      'EXACT_JEOL_BOUNDARY_RESOLVED_FOR_THE_CIVIL_MONTH',
      'BEFORE_AND_AFTER_JEOL_SEGMENT_IDENTITIES_RESOLVED',
      'SEGMENT_MONTHLY_PILLAR_RESOLVED_BEFORE_ANY_SEGMENT_CLAIM',
      'NATAL_DAY_MASTER_RESOLVED_FOR_SEGMENT_STEM_TEN_GOD',
      'SEGMENT_TO_NATAL_BRANCH_RELATION_RESOLVED_BEFORE_ANY_TENSION_CLAIM',
    ] as const),
    allowedConclusion: Object.freeze([
      'CURRENT_CODE_DEMONSTRATES_A_SOLAR_TERM_AWARE_BOUNDED_RESEARCH_EXECUTION_SURFACE_ONLY',
      'JEOL_SEGMENTATION_AND_MONTHLY_FACTS_MAY_SERVE_AS_INPUT_PREREQUISITES_WITHOUT_CONFERRING_INTERPRETATION_AUTHORITY',
      'CURRENT_MONTHLY_INTERPRETATION_SEMANTICS_AND_EMPHASIS_ARE_NOT_ADMITTED_AS_ENGINE_AUTHORITY',
    ] as const),
    qualifiers: Object.freeze([
      'MONTHLY_SEGMENT_STEM_TEN_GOD_THEME_IS_NOT_A_LUCK_SCORE_OR_EVENT_GUARANTEE',
      'MONTHLY_SEGMENT_BRANCH_CLASH_IS_NOT_A_CONCRETE_EVENT_PREDICTION',
      'BEFORE_AFTER_JEOL_SEGMENTATION_DOES_NOT_BY_ITSELF_AUTHORIZE_DIFFERENT_MEANING_STRENGTH',
      'UNKNOWN_OR_AMBIGUOUS_NATAL_FACTS_MUST_FAIL_CLOSED_FOR_DEPENDENT_CLAIMS',
    ] as const),
    exceptions: Object.freeze([
      'UNRESOLVED_MONTHLY_SEGMENT_OR_REQUIRED_NATAL_FACTS_DO_NOT_AUTHORIZE_FABRICATED_PERIOD_CLAIMS',
      'MISSING_MONTHLY_SEMANTIC_AUTHORITY_CANNOT_BE_FILLED_BY_PRODUCT_POLICY_TEMPORAL_PRECISION_OR_READING_PROFILE_COVERAGE',
    ] as const),
    conflictingAuthorities: Object.freeze([] as const),
    schoolDependency: 'NOT_ESTABLISHED_BY_CURRENT_INTERNAL_POLICY_SOURCE' as const,
    lifecycleState: 'research' as const,
  });

  const sourceResearchBlockers = Object.freeze([
    Object.freeze({
      code: 'MONTHLY_SEGMENT_THEME_SEMANTIC_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: GENERAL_MONTHLY_POLICY_SOURCE.sourceId,
      observedSourceType: GENERAL_MONTHLY_POLICY_SOURCE.sourceType,
      observedProvenanceTier: GENERAL_MONTHLY_POLICY_SOURCE.provenanceTier,
    }),
    Object.freeze({
      code: 'MONTHLY_SEGMENT_BRANCH_CLASH_TENSION_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: GENERAL_MONTHLY_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'MONTHLY_SEGMENT_INTERPRETIVE_EMPHASIS_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: GENERAL_MONTHLY_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'MONTHLY_SPECIFIC_METHODOLOGY_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      natalAuthorityMayBeInheritedAutomatically: false as const,
      annualAuthorityMayBeInheritedAutomatically: false as const,
    }),
  ]);

  const authorityState = Object.freeze({
    candidateRepresentable: true as const,
    boundedResearchRegistryAvailable:
      registry.snapshot.rules.length === rules.length,
    internalProductPolicyPresent: true as const,
    exactJeolSegmentationCapabilityPresent: true as const,
    monthlySpecificSourceAuthorityEstablished: false as const,
    monthlyInterpretiveEmphasisAuthorityEstablished: false as const,
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
    disposition: 'RETURN_TO_RESEARCH' as GeneralMonthlyBridgeDecision,
    reason:
      'The General Monthly candidate is executable, solar-term-aware, and explicitly bounded, but its interpretation semantics and emphasis are grounded only in an internal research/product policy with heuristic, experimental, unreviewed rule quality. Exact jeol segmentation establishes temporal fact precision rather than Monthly semantic authority, and neither Natal nor Annual authority may be inherited automatically.',
    rejected: false as const,
    candidateMayRemainResearchOnly: true as const,
    reReviewRequiredAfterResearch: true as const,
  });

  const material = Object.freeze({
    reviewVersion: GENERAL_MONTHLY_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1531' as const,
    auditBaseSha: '6e9ee65057466051a781da2e2b2d7aef41b518eb' as const,
    candidateState,
    evidence: Object.freeze({
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
      sourceId: GENERAL_MONTHLY_POLICY_SOURCE.sourceId,
      sourceType: GENERAL_MONTHLY_POLICY_SOURCE.sourceType,
      sourceProvenanceTier: GENERAL_MONTHLY_POLICY_SOURCE.provenanceTier,
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
      'NO_NATAL_TO_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_ANNUAL_TO_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_INTERNAL_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_EXACT_JEOL_SEGMENTATION_AS_INTERPRETATION_AUTHORITY',
      'NO_EXECUTABLE_CODE_OR_FIXTURE_COVERAGE_AS_AUTHORITY',
      'NO_READING_PROFILE_COVERAGE_AS_AUTHORITY',
      'NO_BEFORE_AFTER_JEOL_OR_PILLAR_EMPHASIS_AS_AUTHORITY_WITHOUT_SOURCE_SUPPORT',
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
