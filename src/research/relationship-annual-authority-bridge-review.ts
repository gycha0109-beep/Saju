import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_ANNUAL_ACTIVATION_RULES,
  RELATIONSHIP_ANNUAL_POLICY_SOURCE,
  RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_ANNUAL_READING_METHODOLOGY,
  RELATIONSHIP_ANNUAL_TENSION_RULES,
  createRelationshipAnnualReadingCandidateRegistry,
} from './relationship-annual-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';

export const RELATIONSHIP_ANNUAL_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-relationship-annual-authority-bridge-review-v1' as const;

export type RelationshipAnnualBridgeDecision = 'RETURN_TO_RESEARCH';

const RESEARCH_PREREQUISITES = Object.freeze([
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_RELATIONSHIP_ANNUAL_STEM_TEN_GOD_INTERACTION_SEMANTICS',
  'ESTABLISH_SOURCE_QUALIFIED_AUTHORITY_FOR_RELATIONSHIP_ANNUAL_TO_NATAL_BRANCH_CLASH_INTERACTION_ADJUSTMENT_SEMANTICS_IF_RETAINED',
  'VERIFY_OR_REMOVE_CURRENT_RELATIONSHIP_AXES_SEMANTIC_KEYS_ADJUSTMENT_AREAS_AND_INTERPRETIVE_EMPHASIS',
  'DEFINE_RELATIONSHIP_ANNUAL_GENERAL_SPECIFIC_SCOPE_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_SCHOOL_DEPENDENCIES_AND_NON_IMPLICATIONS',
  'REVIEW_ANY_RELATIONSHIP_NATAL_GENERAL_OR_OTHER_ANNUAL_DOMAIN_REUSE_AT_CLAIM_LEVEL_WITHOUT_WHOLESALE_AUTHORITY_INHERITANCE',
  'SEPARATE_GENERAL_RELATIONSHIP_PRODUCT_POLICY_FROM_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY_SPOUSE_COMPATIBILITY_AND_DETERMINISTIC_RELATIONSHIP_EVENT_PREDICTION',
] as const);

const LATER_GOVERNANCE_PREREQUISITES = Object.freeze([
  'CREATE_A_CONTENT_ADDRESSED_REVIEW_SURFACE_ONLY_AFTER_RELATIONSHIP_ANNUAL_GENERAL_SOURCE_AUTHORITY_IS_ESTABLISHED',
  'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_FOR_THE_EXACT_ADMISSIBLE_RELATIONSHIP_ANNUAL_GENERAL_SUBJECTS',
  'OBTAIN_INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_THE_EXACT_ATTESTATION_HASHES',
  'RUN_SEPARATE_PROVENANCE_QUALITY_AND_LIFECYCLE_PROMOTION_REVIEWS',
] as const);

export function buildRelationshipAnnualAuthorityBridgeReview() {
  const registry = createRelationshipAnnualReadingCandidateRegistry();
  const annualRules = Object.freeze([
    ...RELATIONSHIP_ANNUAL_ACTIVATION_RULES,
    ...RELATIONSHIP_ANNUAL_TENSION_RULES,
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
    version: RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
    packId: registry.pack.packId,
    packStatus: registry.pack.status,
    annualMethodologyId: RELATIONSHIP_ANNUAL_READING_METHODOLOGY.methodologyId,
    annualMethodologyStatus: RELATIONSHIP_ANNUAL_READING_METHODOLOGY.status,
    annualSourceId: RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceId,
    annualSourceType: RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceType,
    annualSourceProvenanceTier: RELATIONSHIP_ANNUAL_POLICY_SOURCE.provenanceTier,
    annualActivationRuleCount: RELATIONSHIP_ANNUAL_ACTIVATION_RULES.length,
    annualTensionRuleCount: RELATIONSHIP_ANNUAL_TENSION_RULES.length,
    annualRuleCount: annualRules.length,
    reusedNatalCandidateVersion: RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
    reusedNatalMethodologyId: RELATIONSHIP_NATAL_READING_METHODOLOGY.methodologyId,
    reusedNatalMethodologyStatus: RELATIONSHIP_NATAL_READING_METHODOLOGY.status,
    declaredNatalGeneralRuleCount: RELATIONSHIP_NATAL_READING_RULES.length,
    reusedNatalGeneralRuleCount: reusedNatalRelationshipRules.length,
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
    scope: 'relationship:annual:general' as const,
    requiredFactTypes: Object.freeze([...RELATIONSHIP_ANNUAL_READING_METHODOLOGY.requiredFactTypes]),
    optionalFactTypes: Object.freeze([...RELATIONSHIP_ANNUAL_READING_METHODOLOGY.optionalFactTypes]),
    annualPillarIsInputFactNotRelationshipAuthority: true as const,
    annualStemTenGodIsInputFactNotRelationshipThemeAuthority: true as const,
    annualBranchRelationIsInputFactNotRelationshipEventAuthority: true as const,
    relationshipNatalGeneralResearchReuseIsAnnualAuthority: false as const,
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
    scope: 'relationship:annual:general' as const,
    requiredInputs: temporalFactBoundary.requiredFactTypes,
    preconditions: Object.freeze([
      'REQUEST_TARGET_YEAR_RESOLVED',
      'ANNUAL_PILLAR_RESOLVED',
      'NATAL_DAY_MASTER_RESOLVED_FOR_ANNUAL_STEM_TEN_GOD',
      'ANNUAL_TO_NATAL_BRANCH_RELATION_RESOLVED_BEFORE_ANY_RELATIONSHIP_TENSION_CLAIM',
      'ANY_REUSED_NATAL_OR_OTHER_DOMAIN_TEMPORAL_AUTHORITY_MUST_BE_REVIEWED_FOR_RELATIONSHIP_ANNUAL_GENERAL_APPLICABILITY_AT_CLAIM_LEVEL',
    ] as const),
    allowedConclusion: Object.freeze([
      'CURRENT_CODE_DEMONSTRATES_A_BOUNDED_RELATIONSHIP_ANNUAL_GENERAL_RESEARCH_EXECUTION_SURFACE_ONLY',
      'RELATIONSHIP_NATAL_GENERAL_RESEARCH_MAY_COEXIST_IN_THE_PACK_WITHOUT_CONFERRING_RELATIONSHIP_ANNUAL_GENERAL_AUTHORITY',
      'TEMPORAL_FACTS_MAY_SERVE_AS_INPUT_PREREQUISITES_WITHOUT_CONFERRING_RELATIONSHIP_ANNUAL_INTERPRETATION_AUTHORITY',
      'CURRENT_RELATIONSHIP_ANNUAL_GENERAL_INTERPRETATION_SEMANTICS_ARE_NOT_ADMITTED_AS_ENGINE_AUTHORITY',
      'NO_CURRENT_OUTPUT_AUTHORIZES_SPOUSE_SPECIFIC_COMPATIBILITY_OR_DETERMINISTIC_RELATIONSHIP_EVENT_CLAIMS',
    ] as const),
    qualifiers: Object.freeze([
      'RELATIONSHIP_ANNUAL_STEM_TEN_GOD_THEME_IS_A_RESEARCH_INTERACTION_TENDENCY_CANDIDATE_NOT_A_RELATIONSHIP_OUTCOME_GUARANTEE',
      'RELATIONSHIP_ANNUAL_BRANCH_CLASH_IS_NOT_A_BREAKUP_DIVORCE_CONFLICT_RECONCILIATION_OR_SPECIFIC_RELATIONSHIP_EVENT_PREDICTION',
      'CURRENT_RELATIONSHIP_AXES_ADJUSTMENT_AREAS_AND_EMPHASIS_REQUIRE_SOURCE_QUALIFICATION',
      'GENERAL_RELATIONSHIP_SCOPE_DOES_NOT_AUTHORIZE_SPOUSE_SPECIFIC_OR_COMPATIBILITY_CLAIMS',
    ] as const),
    exceptions: Object.freeze([
      'MISSING_RELATIONSHIP_ANNUAL_GENERAL_SEMANTIC_AUTHORITY_CANNOT_BE_FILLED_BY_RELATIONSHIP_NATAL_GENERAL_REUSE_GENERAL_ANNUAL_LOGIC_CAREER_ANNUAL_LOGIC_WEALTH_ANNUAL_LOGIC_BUSINESS_ANNUAL_LOGIC_PRODUCT_POLICY_OR_READING_PROFILE_COVERAGE',
    ] as const),
    conflictingAuthorities: Object.freeze([] as const),
    schoolDependency:
      'NOT_ESTABLISHED_BY_CURRENT_INTERNAL_RELATIONSHIP_ANNUAL_POLICY_SOURCE' as const,
    lifecycleState: 'research' as const,
  });

  const sourceResearchBlockers = Object.freeze([
    Object.freeze({
      code: 'RELATIONSHIP_ANNUAL_GENERAL_THEME_SEMANTIC_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceId,
      observedSourceType: RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceType,
      observedProvenanceTier: RELATIONSHIP_ANNUAL_POLICY_SOURCE.provenanceTier,
    }),
    Object.freeze({
      code: 'RELATIONSHIP_ANNUAL_BRANCH_CLASH_INTERACTION_ADJUSTMENT_SOURCE_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'RELATIONSHIP_ANNUAL_AXIS_ADJUSTMENT_AREA_AND_EMPHASIS_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      observedSourceId: RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceId,
    }),
    Object.freeze({
      code: 'RELATIONSHIP_ANNUAL_GENERAL_SPECIFIC_METHODOLOGY_AUTHORITY_NOT_ESTABLISHED' as const,
      established: false as const,
      relationshipNatalGeneralAuthorityMayBeInheritedAutomatically: false as const,
      generalAnnualAuthorityMayBeInheritedAutomatically: false as const,
      careerAnnualAuthorityMayBeInheritedAutomatically: false as const,
      wealthAnnualAuthorityMayBeInheritedAutomatically: false as const,
      businessAnnualAuthorityMayBeInheritedAutomatically: false as const,
    }),
  ]);

  const authorityState = Object.freeze({
    candidateRepresentable: true as const,
    boundedResearchRegistryAvailable: registry.snapshot.rules.length > annualRules.length,
    internalRelationshipAnnualPolicyPresent: true as const,
    relationshipAnnualGeneralSpecificSourceAuthorityEstablished: false as const,
    relationshipAnnualInterpretiveEmphasisAuthorityEstablished: false as const,
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
    disposition: 'RETURN_TO_RESEARCH' as RelationshipAnnualBridgeDecision,
    reason:
      'The Relationship Annual general candidate is executable and bounded, but its T9 interaction semantics are grounded only in an internal research/product policy with heuristic, experimental, unreviewed quality. Reused Relationship Natal general conclusions remain secondary-only, contested, unreviewed research. Annual temporal facts, implementation coverage, and product policy do not establish Relationship Annual general semantic authority, spouse-specific authority, compatibility authority, or deterministic relationship-event prediction authority.',
    rejected: false as const,
    candidateMayRemainResearchOnly: true as const,
    reReviewRequiredAfterResearch: true as const,
  });

  const material = Object.freeze({
    reviewVersion: RELATIONSHIP_ANNUAL_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1594' as const,
    auditBaseSha: 'b17701a2c558d4b1bb59c58c0afa133ff1b43166' as const,
    candidateState,
    evidence: Object.freeze({
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
      annualSourceId: RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceId,
      annualSourceType: RELATIONSHIP_ANNUAL_POLICY_SOURCE.sourceType,
      annualSourceProvenanceTier: RELATIONSHIP_ANNUAL_POLICY_SOURCE.provenanceTier,
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
      'NO_RELATIONSHIP_NATAL_GENERAL_TO_RELATIONSHIP_ANNUAL_GENERAL_AUTHORITY_INHERITANCE',
      'NO_GENERAL_ANNUAL_TO_RELATIONSHIP_ANNUAL_GENERAL_AUTHORITY_INHERITANCE',
      'NO_CAREER_ANNUAL_TO_RELATIONSHIP_ANNUAL_GENERAL_AUTHORITY_INHERITANCE',
      'NO_WEALTH_ANNUAL_TO_RELATIONSHIP_ANNUAL_GENERAL_AUTHORITY_INHERITANCE',
      'NO_BUSINESS_ANNUAL_TO_RELATIONSHIP_ANNUAL_GENERAL_AUTHORITY_INHERITANCE',
      'NO_RELATIONSHIP_ANNUAL_GENERAL_TO_RELATIONSHIP_MONTHLY_GENERAL_AUTHORITY_EXPANSION',
      'NO_RELATIONSHIP_GENERAL_TO_SPOUSE_SPECIFIC_AUTHORITY_EXPANSION',
      'NO_RELATIONSHIP_GENERAL_TO_COMPATIBILITY_AUTHORITY_EXPANSION',
      'NO_INTERNAL_RELATIONSHIP_ANNUAL_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_TEMPORAL_FACT_EXECUTABILITY_FIXTURE_OR_READING_PROFILE_COVERAGE_AS_AUTHORITY',
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
