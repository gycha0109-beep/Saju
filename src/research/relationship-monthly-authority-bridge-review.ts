import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_MONTHLY_ACTIVATION_RULES,
  RELATIONSHIP_MONTHLY_POLICY_SOURCE,
  RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION,
  RELATIONSHIP_MONTHLY_READING_METHODOLOGY,
  RELATIONSHIP_MONTHLY_TENSION_RULES,
  createRelationshipMonthlyReadingCandidateRegistry,
} from './relationship-monthly-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_MONTHLY_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-relationship-monthly-authority-bridge-review-v1' as const;

export type RelationshipMonthlyBridgeDecision = 'RETURN_TO_RESEARCH';

const RESEARCH_PREREQUISITES = Object.freeze([
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_RELATIONSHIP_MONTHLY_SEGMENT_STEM_TEN_GOD_INTERACTION_SEMANTICS',
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_RELATIONSHIP_MONTHLY_SEGMENT_TO_NATAL_BRANCH_CLASH_INTERACTION_ADJUSTMENT_SEMANTICS_IF_RETAINED',
  'VERIFY_OR_REMOVE_CURRENT_RELATIONSHIP_AXES_SEMANTIC_KEYS_ADJUSTMENT_AREAS_BEFORE_AFTER_JEOL_EMPHASIS_AND_PILLAR_SPECIFIC_CLASH_EMPHASIS',
  'DEFINE_RELATIONSHIP_MONTHLY_GENERAL_SPECIFIC_SCOPE_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_SCHOOL_DEPENDENCIES_AND_NON_IMPLICATIONS',
  'REVIEW_ANY_RELATIONSHIP_NATAL_GENERAL_RELATIONSHIP_ANNUAL_GENERAL_OR_OTHER_MONTHLY_DOMAIN_REUSE_AT_CLAIM_LEVEL_WITHOUT_WHOLESALE_AUTHORITY_INHERITANCE',
  'SEPARATE_EXACT_TEMPORAL_SEGMENTATION_AND_GENERAL_RELATIONSHIP_PRODUCT_POLICY_FROM_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY_SPOUSE_COMPATIBILITY_AND_DETERMINISTIC_RELATIONSHIP_EVENT_PREDICTION',
] as const);

const LATER_GOVERNANCE_PREREQUISITES = Object.freeze([
  'CREATE_A_CONTENT_ADDRESSED_REVIEW_SURFACE_ONLY_AFTER_RELATIONSHIP_MONTHLY_GENERAL_SOURCE_AUTHORITY_IS_ESTABLISHED',
  'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_FOR_THE_EXACT_ADMISSIBLE_RELATIONSHIP_MONTHLY_GENERAL_SUBJECTS',
  'OBTAIN_INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_THE_EXACT_ATTESTATION_HASHES',
  'RUN_SEPARATE_PROVENANCE_QUALITY_AND_LIFECYCLE_PROMOTION_REVIEWS',
] as const);

export function buildRelationshipMonthlyAuthorityBridgeReview() {
  const registry = createRelationshipMonthlyReadingCandidateRegistry();
  const monthlyRules = Object.freeze([
    ...RELATIONSHIP_MONTHLY_ACTIVATION_RULES,
    ...RELATIONSHIP_MONTHLY_TENSION_RULES,
  ]);
  const reusedNatalRelationshipRules = Object.freeze(
    registry.rules.filter(
      (rule) =>
        rule.taxonomy.tier === 'T8' &&
        rule.taxonomy.category === 'relationship' &&
        rule.taxonomy.subcategory === 'general',
    ),
  );

  const candidateState = Object.freeze({
    version: RELATIONSHIP_MONTHLY_READING_CANDIDATE_VERSION,
    packId: registry.pack.packId,
    packStatus: registry.pack.status,
    monthlyMethodologyId: RELATIONSHIP_MONTHLY_READING_METHODOLOGY.methodologyId,
    monthlyMethodologyStatus: RELATIONSHIP_MONTHLY_READING_METHODOLOGY.status,
    monthlySourceId: RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceId,
    monthlySourceType: RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceType,
    monthlySourceProvenanceTier: RELATIONSHIP_MONTHLY_POLICY_SOURCE.provenanceTier,
    segmentIds: Object.freeze(['before_jeol', 'after_jeol'] as const),
    monthlyActivationRuleCount: RELATIONSHIP_MONTHLY_ACTIVATION_RULES.length,
    monthlyTensionRuleCount: RELATIONSHIP_MONTHLY_TENSION_RULES.length,
    monthlyRuleCount: monthlyRules.length,
    reusedNatalCandidateVersion: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
    reusedNatalMethodologyId: RELATIONSHIP_NATAL_READING_METHODOLOGY.methodologyId,
    reusedNatalMethodologyStatus: RELATIONSHIP_NATAL_READING_METHODOLOGY.status,
    declaredNatalGeneralRuleCount: RELATIONSHIP_NATAL_READING_RULES.length,
    reusedNatalGeneralRuleCount: reusedNatalRelationshipRules.length,
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
    allReusedNatalGeneralRulesResearchOnly: reusedNatalRelationshipRules.every(
      (rule) => rule.status === 'research',
    ),
    allReusedNatalGeneralRulesSecondaryOnly: reusedNatalRelationshipRules.every(
      (rule) => rule.quality.provenanceQuality === 'secondary_only',
    ),
    allReusedNatalGeneralRulesContested: reusedNatalRelationshipRules.every(
      (rule) => rule.quality.methodologyStability === 'contested',
    ),
    allReusedNatalGeneralRulesUnreviewed: reusedNatalRelationshipRules.every(
      (rule) => rule.quality.reviewerStatus === 'unreviewed',
    ),
  });

  const temporalFactBoundary = Object.freeze({
    scope: 'relationship:monthly:general' as const,
    requiredFactTypes: Object.freeze([
      ...RELATIONSHIP_MONTHLY_READING_METHODOLOGY.requiredFactTypes,
    ]),
    optionalFactTypes: Object.freeze([
      ...RELATIONSHIP_MONTHLY_READING_METHODOLOGY.optionalFactTypes,
    ]),
    exactJeolBoundaryIsTemporalCapabilityNotRelationshipAuthority: true as const,
    segmentIdentityIsInputFactNotRelationshipAuthority: true as const,
    monthlyPillarIsInputFactNotRelationshipAuthority: true as const,
    monthlyStemTenGodIsInputFactNotRelationshipThemeAuthority: true as const,
    monthlyBranchRelationIsInputFactNotRelationshipEventAuthority: true as const,
    relationshipNatalGeneralResearchReuseIsMonthlyAuthority: false as const,
    relationshipAnnualGeneralAuthorityIsMonthlyAuthority: false as const,
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
    scope: 'relationship:monthly:general' as const,
    requiredInputs: temporalFactBoundary.requiredFactTypes,
    preconditions: Object.freeze([
      'REQUEST_TARGET_YEAR_AND_MONTH_RESOLVED',
      'EXACT_JEOL_BOUNDARY_RESOLVED',
      'MONTHLY_SEGMENT_ID_AND_PILLAR_RESOLVED',
      'NATAL_DAY_MASTER_RESOLVED_FOR_MONTHLY_SEGMENT_STEM_TEN_GOD',
      'SEGMENT_TO_NATAL_BRANCH_RELATION_RESOLVED_BEFORE_ANY_RELATIONSHIP_TENSION_CLAIM',
      'ANY_REUSED_NATAL_ANNUAL_OR_OTHER_MONTHLY_DOMAIN_AUTHORITY_MUST_BE_REVIEWED_FOR_RELATIONSHIP_MONTHLY_GENERAL_APPLICABILITY_AT_CLAIM_LEVEL',
    ] as const),
    allowedConclusion: Object.freeze([
      'CURRENT_CODE_DEMONSTRATES_A_BOUNDED_SOLAR_TERM_AWARE_RELATIONSHIP_MONTHLY_GENERAL_RESEARCH_EXECUTION_SURFACE_ONLY',
      'RELATIONSHIP_NATAL_GENERAL_RESEARCH_MAY_COEXIST_IN_THE_PACK_WITHOUT_CONFERRING_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY',
      'EXACT_JEOL_SEGMENTATION_AND_MONTHLY_TEMPORAL_FACTS_MAY_SERVE_AS_INPUT_PREREQUISITES_WITHOUT_CONFERRING_RELATIONSHIP_MONTHLY_INTERPRETATION_AUTHORITY',
      'CURRENT_RELATIONSHIP_MONTHLY_GENERAL_INTERPRETATION_SEMANTICS_ARE_NOT_ADMITTED_AS_ENGINE_AUTHORITY',
      'NO_CURRENT_OUTPUT_AUTHORIZES_SPOUSE_SPECIFIC_COMPATIBILITY_OR_DETERMINISTIC_RELATIONSHIP_EVENT_CLAIMS',
    ] as const),
    qualifiers: Object.freeze([
      'RELATIONSHIP_MONTHLY_SEGMENT_STEM_TEN_GOD_THEME_IS_A_RESEARCH_INTERACTION_TENDENCY_CANDIDATE_NOT_A_RELATIONSHIP_OUTCOME_GUARANTEE',
      'RELATIONSHIP_MONTHLY_SEGMENT_BRANCH_CLASH_IS_NOT_A_BREAKUP_DIVORCE_CONFLICT_RECONCILIATION_OR_SPECIFIC_RELATIONSHIP_EVENT_PREDICTION',
      'CURRENT_RELATIONSHIP_AXES_ADJUSTMENT_AREAS_BEFORE_AFTER_JEOL_EMPHASIS_AND_PILLAR_SPECIFIC_CLASH_EMPHASIS_REQUIRE_SOURCE_QUALIFICATION',
      'GENERAL_RELATIONSHIP_SCOPE_DOES_NOT_AUTHORIZE_SPOUSE_SPECIFIC_OR_COMPATIBILITY_CLAIMS',
    ] as const),
    exceptions: Object.freeze([
      'MISSING_RELATIONSHIP_MONTHLY_GENERAL_SEMANTIC_AUTHORITY_CANNOT_BE_FILLED_BY_EXACT_JEOL_SEGMENTATION_RELATIONSHIP_NATAL_GENERAL_REUSE_RELATIONSHIP_ANNUAL_GENERAL_LOGIC_GENERAL_MONTHLY_LOGIC_CAREER_MONTHLY_LOGIC_WEALTH_MONTHLY_LOGIC_BUSINESS_MONTHLY_LOGIC_PRODUCT_POLICY_OR_READING_PROFILE_COVERAGE',
    ] as const),
    conflictingAuthorities: Object.freeze([] as const),
    schoolDependency:
      'NOT_ESTABLISHED_BY_CURRENT_INTERNAL_RELATIONSHIP_MONTHLY_POLICY_SOURCE' as const,
    lifecycleState: 'research' as const,
  });

  const sourceResearchBlockers = Object.freeze([
    Object.freeze({
      code: 'RELATIONSHIP_MONTHLY_GENERAL_THEME_SEMANTIC_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceId,
      observedSourceType: RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceType,
      observedProvenanceTier: RELATIONSHIP_MONTHLY_POLICY_SOURCE.provenanceTier,
    }),
    Object.freeze({
      code: 'RELATIONSHIP_MONTHLY_SEGMENT_BRANCH_CLASH_INTERACTION_ADJUSTMENT_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'RELATIONSHIP_MONTHLY_AXIS_ADJUSTMENT_AREA_AND_EMPHASIS_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'RELATIONSHIP_MONTHLY_GENERAL_SPECIFIC_METHODOLOGY_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      relationshipNatalGeneralAuthorityMayBeInheritedAutomatically: false as const,
      relationshipAnnualGeneralAuthorityMayBeInheritedAutomatically: false as const,
      generalMonthlyAuthorityMayBeInheritedAutomatically: false as const,
      careerMonthlyAuthorityMayBeInheritedAutomatically: false as const,
      wealthMonthlyAuthorityMayBeInheritedAutomatically: false as const,
      businessMonthlyAuthorityMayBeInheritedAutomatically: false as const,
    }),
  ]);

  const authorityState = Object.freeze({
    candidateRepresentable: true as const,
    boundedResearchRegistryAvailable: registry.snapshot.rules.length > monthlyRules.length,
    exactJeolSegmentationCapabilityPresent: true as const,
    internalRelationshipMonthlyPolicyPresent: true as const,
    relationshipMonthlyGeneralSpecificSourceAuthorityEstablished: false as const,
    relationshipMonthlyInterpretiveEmphasisAuthorityEstablished: false as const,
    spouseSpecificAuthorityEstablished: false as const,
    compatibilityAuthorityEstablished: false as const,
    deterministicRelationshipEventPredictionAuthorized: false as const,
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
    disposition: 'RETURN_TO_RESEARCH' as RelationshipMonthlyBridgeDecision,
    reason:
      'The Relationship Monthly general candidate is executable, solar-term-aware, and bounded, but its T9 interaction semantics are grounded only in an internal research/product policy with heuristic, experimental, unreviewed quality. Reused Relationship Natal general conclusions remain secondary-only, contested, unreviewed research. Exact jeol segmentation, monthly temporal facts, implementation coverage, and product policy do not establish Relationship Monthly general semantic authority, spouse-specific authority, compatibility authority, or deterministic relationship-event prediction authority.',
    rejected: false as const,
    candidateMayRemainResearchOnly: true as const,
    reReviewRequiredAfterResearch: true as const,
  });

  const material = Object.freeze({
    reviewVersion: RELATIONSHIP_MONTHLY_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1606' as const,
    auditBaseSha: '3b2a2ab023fd31803a35b2a7cc0d1bd0d71bb38f' as const,
    candidateState,
    evidence: Object.freeze({
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
      monthlySourceId: RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceId,
      monthlySourceType: RELATIONSHIP_MONTHLY_POLICY_SOURCE.sourceType,
      monthlySourceProvenanceTier: RELATIONSHIP_MONTHLY_POLICY_SOURCE.provenanceTier,
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
      'NO_RELATIONSHIP_NATAL_GENERAL_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_INHERITANCE',
      'NO_RELATIONSHIP_ANNUAL_GENERAL_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_INHERITANCE',
      'NO_GENERAL_MONTHLY_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_INHERITANCE',
      'NO_CAREER_MONTHLY_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_INHERITANCE',
      'NO_WEALTH_MONTHLY_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_INHERITANCE',
      'NO_BUSINESS_MONTHLY_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_INHERITANCE',
      'NO_RELATIONSHIP_GENERAL_TO_SPOUSE_SPECIFIC_AUTHORITY_EXPANSION',
      'NO_RELATIONSHIP_GENERAL_TO_COMPATIBILITY_AUTHORITY_EXPANSION',
      'NO_INTERNAL_RELATIONSHIP_MONTHLY_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_EXACT_JEOL_SEGMENTATION_TEMPORAL_FACT_EXECUTABILITY_FIXTURE_OR_READING_PROFILE_COVERAGE_AS_AUTHORITY',
      'NO_CURRENT_RELATIONSHIP_AXES_ADJUSTMENT_AREAS_OR_EMPHASIS_AS_AUTHORITY_WITHOUT_SOURCE_SUPPORT',
      'NO_SPECIFIC_PERSON_APPEARANCE_CONTACT_DATING_MARRIAGE_BREAKUP_DIVORCE_RECONCILIATION_PREGNANCY_FIDELITY_OR_GUARANTEED_RELATIONSHIP_TIMING_PREDICTION',
      'NO_PARTNER_ATTRIBUTE_OR_INTENTION_INFERENCE',
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
