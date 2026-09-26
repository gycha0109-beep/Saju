import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_ANNUAL_READING_CANDIDATE_VERSION,
  createCareerAnnualReadingCandidateRegistry,
} from './career-annual-reading-candidate.js';
import { buildCareerAnnualAuthorityBridgeReview } from './career-annual-authority-bridge-review.js';

export const CAREER_ANNUAL_RESEARCH_RETURN_HANDOFF_VERSION =
  'myeonghwa-career-annual-research-return-handoff-v1' as const;

interface CareerAnnualCandidateSurface {
  readonly candidateVersion: string;
  readonly packRef: ContentAddressedVersionedRef;
  readonly methodologies: readonly ContentAddressedVersionedRef[];
  readonly rules: readonly ContentAddressedVersionedRef[];
}

function sortRefs(refs: readonly ContentAddressedVersionedRef[]) {
  return Object.freeze(
    [...refs].sort((left, right) =>
      `${left.id}@${left.version}`.localeCompare(`${right.id}@${right.version}`),
    ),
  );
}

function buildCandidateSurface(): CareerAnnualCandidateSurface {
  const registry = createCareerAnnualReadingCandidateRegistry();
  return Object.freeze({
    candidateVersion: CAREER_ANNUAL_READING_CANDIDATE_VERSION,
    packRef: Object.freeze({ ...registry.snapshot.packRef }),
    methodologies: sortRefs(registry.snapshot.methodologies),
    rules: sortRefs(registry.snapshot.rules),
  });
}

function candidateSurfaceHash(surface: CareerAnnualCandidateSurface): string {
  return deterministicContentHash({
    candidateVersion: surface.candidateVersion,
    packRef: surface.packRef,
    methodologies: sortRefs(surface.methodologies),
    rules: sortRefs(surface.rules),
  });
}

export function buildCareerAnnualResearchReturnHandoff() {
  const bridgeReview = buildCareerAnnualAuthorityBridgeReview();
  const candidateSurface = buildCandidateSurface();
  const observedCandidateSurfaceHash = candidateSurfaceHash(candidateSurface);

  const material = Object.freeze({
    version: CAREER_ANNUAL_RESEARCH_RETURN_HANDOFF_VERSION,
    issue: '#1728' as const,
    upstreamBridgeReview: Object.freeze({
      issue: bridgeReview.issue,
      reviewId: bridgeReview.reviewId,
      disposition: bridgeReview.decision.disposition,
      rejected: bridgeReview.decision.rejected,
    }),
    candidateBinding: Object.freeze({
      candidateVersion: candidateSurface.candidateVersion,
      packRef: candidateSurface.packRef,
      methodologies: candidateSurface.methodologies,
      rules: candidateSurface.rules,
      methodologyCount: candidateSurface.methodologies.length,
      ruleCount: candidateSurface.rules.length,
      annualRuleCount: bridgeReview.candidateState.annualRuleCount,
      reusedNatalRuleCount: bridgeReview.candidateState.reusedNatalRuleCount,
      registryRuleCount: bridgeReview.candidateState.registryRuleCount,
      candidateSurfaceHash: observedCandidateSurfaceHash,
    }),
    researchReturnRequired: true as const,
    existingNatalAuthorityBoundary: Object.freeze({
      boundedNatalAuthorityComponentObserved:
        bridgeReview.natalGovernanceBoundary.boundedNatalAuthorityComponentObserved,
      authorityClass: bridgeReview.natalGovernanceBoundary.authorityClass,
      exactTenGod: bridgeReview.natalGovernanceBoundary.exactTenGod,
      currentT5SemanticKey: bridgeReview.natalGovernanceBoundary.currentT5SemanticKey,
      condition: bridgeReview.natalGovernanceBoundary.condition,
      qualitativeModificationMode:
        bridgeReview.natalGovernanceBoundary.qualitativeModificationMode,
      temporalScope: bridgeReview.natalGovernanceBoundary.temporalScope,
      generalizedToOtherPillars:
        bridgeReview.natalGovernanceBoundary.generalizedToOtherPillars,
      generalizedToOtherTenGodSemantics:
        bridgeReview.natalGovernanceBoundary.generalizedToOtherTenGodSemantics,
      boundedNatalComponentAuthorizesCareerAnnual: false as const,
      reusedNatalResearchExecutionAuthorizesCareerAnnual: false as const,
    }),
    workstreams: Object.freeze([
      Object.freeze({
        code: 'CAREER_ANNUAL_STEM_TEN_GOD_SEMANTIC_AUTHORITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        currentPolicySourceId: bridgeReview.candidateState.annualSourceId,
        requirements: Object.freeze([
          'ESTABLISH_SOURCE_QUALIFIED_CAREER_ANNUAL_SUPPORT_FOR_ANNUAL_STEM_TEN_GOD_WORKING_PATTERN_INTERPRETATION',
          'SEPARATE_SOURCE_STATEMENT_INTERPRETIVE_READING_AND_RESEARCH_INFERENCE',
          'PRESERVE_MEANING_STRENGTH_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_AND_SCHOOL_DEPENDENCIES',
          'RECORD_NON_IMPLICATIONS_AND_DO_NOT_TREAT_CAREER_ANNUAL_TEN_GOD_AS_A_HIRING_FIRING_PROMOTION_COMPENSATION_OR_BUSINESS_SUCCESS_GUARANTEE',
          'ALLOW_CURRENT_CAREER_AXES_AND_SEMANTIC_KEYS_TO_BE_NARROWED_CHANGED_SPLIT_OR_REMOVED_WHEN_RESEARCH_DOES_NOT_SUPPORT_THEM',
        ] as const),
      }),
      Object.freeze({
        code: 'CAREER_ANNUAL_BRANCH_CLASH_WORK_ADJUSTMENT_AUTHORITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        currentPolicySourceId: bridgeReview.candidateState.annualSourceId,
        requirements: Object.freeze([
          'ESTABLISH_SOURCE_QUALIFIED_CAREER_ANNUAL_SUPPORT_FOR_ANNUAL_TO_NATAL_BRANCH_CLASH_WORK_ADJUSTMENT_MEANING_IF_RETAINED',
          'SEPARATE_THE_RESOLVED_BRANCH_RELATION_FACT_FROM_ITS_CAREER_INTERPRETIVE_MEANING',
          'PRESERVE_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_AND_SCHOOL_DEPENDENCIES',
          'DO_NOT_INFER_HIRING_FIRING_RESIGNATION_JOB_CHANGE_PROMOTION_COMPENSATION_OR_OTHER_DETERMINISTIC_CAREER_EVENTS_FROM_CLASH_ALONE',
        ] as const),
      }),
      Object.freeze({
        code: 'CAREER_ANNUAL_AXIS_ADJUSTMENT_AND_EMPHASIS_AUTHORITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        currentPolicySourceId: bridgeReview.candidateState.annualSourceId,
        requirements: Object.freeze([
          'VERIFY_NARROW_REPLACE_OR_REMOVE_CURRENT_CAREER_AXES',
          'VERIFY_NARROW_REPLACE_OR_REMOVE_CURRENT_ADJUSTMENT_AREAS',
          'VERIFY_NARROW_REPLACE_OR_REMOVE_CURRENT_ACTIVATION_AND_PILLAR_SPECIFIC_EMPHASIS',
          'DO_NOT_TREAT_INTERNAL_PRODUCT_OR_NARRATIVE_POLICY_AS_TRADITIONAL_SAJU_AUTHORITY',
        ] as const),
      }),
      Object.freeze({
        code: 'CAREER_ANNUAL_SCOPE_AND_QUALIFIER_CONTRACT' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'DEFINE_CAREER_ANNUAL_SCOPE_REQUIRED_INPUTS_PRECONDITIONS_ALLOWED_CONCLUSIONS_QUALIFIERS_EXCEPTIONS_AND_PROHIBITED_EXTENSIONS',
          'KEEP_CAREER_NATAL_CAREER_ANNUAL_AND_CAREER_MONTHLY_AUTHORITY_SCOPES_DISTINCT',
          'IDENTIFY_UNRESOLVED_OR_SCHOOL_DEPENDENT_QUESTIONS_EXPLICITLY',
        ] as const),
      }),
      Object.freeze({
        code: 'CAREER_NATAL_AND_GENERAL_ANNUAL_REUSE_BOUNDARY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'REVIEW_ANY_CAREER_NATAL_REUSE_AT_CLAIM_LEVEL_INSTEAD_OF_WHOLESALE_AUTHORITY_INHERITANCE',
          'REVIEW_ANY_GENERAL_ANNUAL_REUSE_AT_CLAIM_LEVEL_INSTEAD_OF_WHOLESALE_AUTHORITY_INHERITANCE',
          'PRESERVE_THE_EXISTING_BOUNDED_NATAL_POSITION_COMPONENT_AS_NATAL_ONLY',
          'DO_NOT_GENERALIZE_THE_NATAL_JEONG_GWAN_DAY_BRANCH_COMPONENT_TO_CAREER_ANNUAL_SCOPE',
        ] as const),
      }),
      Object.freeze({
        code: 'PRODUCT_NARRATIVE_POLICY_SEMANTIC_SEPARATION' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'KEEP_INTERNAL_MYEONGHA_POLICY_AVAILABLE_FOR_REQUEST_PACKAGING_AND_SAFETY_BOUNDARIES',
          'DO_NOT_USE_INTERNAL_PRODUCT_OR_NARRATIVE_POLICY_AS_STANDALONE_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY',
          'DO_NOT_TREAT_READING_PROFILE_COVERAGE_EXECUTABLE_FIXTURES_OR_TEMPORAL_FACT_DERIVATION_AS_SEMANTIC_AUTHORITY',
        ] as const),
      }),
    ]),
    expectedResearchDeliverables: Object.freeze([
      'REPOSITORY_GOVERNED_CAREER_ANNUAL_RESEARCH_CANDIDATE_OR_EVIDENCE_ARTIFACT',
      'SOURCE_AND_PROVENANCE_REFS_FOR_EACH_RETAINED_CAREER_ANNUAL_PROPOSITION_FAMILY',
      'SOURCE_STATEMENT_INTERPRETIVE_READING_AND_RESEARCH_INFERENCE_SEPARATION',
      'CAREER_ANNUAL_SCOPE_PRECONDITIONS_ALLOWED_MEANING_AND_MEANING_STRENGTH',
      'QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_SCHOOL_DEPENDENCIES_AND_NON_IMPLICATIONS',
      'EXPLICIT_RECORD_OF_UNRESOLVED_QUESTIONS',
      'EXPLICIT_CAREER_NATAL_AND_GENERAL_ANNUAL_REUSE_BOUNDARY',
      'EXPLICIT_NATAL_BOUNDED_POSITION_COMPONENT_NON_GENERALIZATION_TO_ANNUAL_SCOPE',
      'EXPLICIT_CAREER_ANNUAL_TO_CAREER_MONTHLY_NON_AUTHORIZATION',
    ] as const),
    deferredGovernance: Object.freeze([
      'CONTENT_ADDRESSED_DOMAIN_REVIEW_SUBJECT_CREATION',
      'REAL_DOMAIN_REVIEW_ATTESTATIONS',
      'INDEPENDENT_REVIEWER_TRUST_GRANTS',
      'GOVERNED_PROVENANCE_QUALITY_PROMOTION_REVIEW',
      'GOVERNED_LIFECYCLE_PROMOTION_REVIEW',
      'ENGINE_AUTHORITY_ADMISSION',
      'PREVIEW_EXPANSION',
      'OFFICIAL_READING_AUTHORITY',
      'PRODUCTION_ADMISSION',
    ] as const),
    reentryRequirements: Object.freeze({
      currentCandidateSurfaceHash: observedCandidateSurfaceHash,
      candidateDriftRequiresFreshReviewSurface: true as const,
      researchMayChangeCurrentCandidateSemantics: true as const,
      researchEvidenceMustBeRepositoryGovernedArtifact: true as const,
      bridgeEvaluatorMustConsumeActualResearchEvidence: true as const,
      bridgeMustNotPreInventResearchEvidenceSchema: true as const,
      sourceCompletionOnlyAuthorizesBridgeRereview: true as const,
      highestPermittedFutureReentryState: 'READY_FOR_BRIDGE_REREVIEW' as const,
    }),
    authorityBoundary: Object.freeze({
      careerNatalAuthorityInheritedAutomatically: false as const,
      generalAnnualAuthorityInheritedAutomatically: false as const,
      boundedNatalPositionAuthorityGeneralizedToAnnual: false as const,
      careerAnnualAuthorityExtendsToCareerMonthlyAutomatically: false as const,
      temporalFactsAreInterpretationAuthority: false as const,
      productOrNarrativePolicyIsTraditionalSemanticAuthority: false as const,
      domainReviewAuthorityEstablished: false as const,
      trustedDomainAttestationEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      engineAuthorityPromotionAuthorized: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAdmissionAuthority: false as const,
      production: 'HOLD' as const,
    }),
    prohibitedExtensions: Object.freeze([
      'NO_NEW_CLASSICAL_PROPOSITION_BY_BRIDGE',
      'NO_DIRECT_SOURCE_RESEARCH_BY_BRIDGE',
      'NO_CURRENT_CANDIDATE_SEMANTICS_TREATED_AS_RESEARCH_TARGET_TRUTH',
      'NO_CAREER_NATAL_TO_CAREER_ANNUAL_AUTHORITY_INHERITANCE',
      'NO_GENERAL_ANNUAL_TO_CAREER_ANNUAL_AUTHORITY_INHERITANCE',
      'NO_CAREER_ANNUAL_TO_CAREER_MONTHLY_AUTHORITY_EXPANSION',
      'NO_BOUNDED_NATAL_POSITION_COMPONENT_GENERALIZATION_TO_ANNUAL_SCOPE',
      'NO_INTERNAL_PRODUCT_OR_NARRATIVE_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_TEMPORAL_FACT_EXECUTABILITY_READING_PROFILE_OR_NARRATIVE_COPY_AS_SEMANTIC_AUTHORITY',
      'NO_HIRING_FIRING_RESIGNATION_JOB_CHANGE_PROMOTION_COMPENSATION_OR_BUSINESS_SUCCESS_PREDICTION',
      'NO_REVIEW_ATTESTATION_OR_REVIEWER_TRUST_FABRICATION',
      'NO_AUTOMATIC_PROVENANCE_OR_LIFECYCLE_PROMOTION',
      'NO_ENGINE_PREVIEW_OFFICIAL_OR_PRODUCTION_PROMOTION_FROM_THIS_HANDOFF',
    ] as const),
  });

  return Object.freeze({
    ...material,
    handoffHash: deterministicContentHash(material),
  });
}
