import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
  createGeneralMonthlyReadingCandidateRegistry,
} from './general-monthly-reading-candidate.js';
import { buildGeneralMonthlyAuthorityBridgeReview } from './general-monthly-authority-bridge-review.js';

export const GENERAL_MONTHLY_RESEARCH_RETURN_HANDOFF_VERSION =
  'myeonghwa-general-monthly-research-return-handoff-v1' as const;

interface GeneralMonthlyCandidateSurface {
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

function buildCandidateSurface(): GeneralMonthlyCandidateSurface {
  const registry = createGeneralMonthlyReadingCandidateRegistry();
  return Object.freeze({
    candidateVersion: GENERAL_MONTHLY_READING_CANDIDATE_VERSION,
    packRef: Object.freeze({ ...registry.snapshot.packRef }),
    methodologies: sortRefs(registry.snapshot.methodologies),
    rules: sortRefs(registry.snapshot.rules),
  });
}

function candidateSurfaceHash(surface: GeneralMonthlyCandidateSurface): string {
  return deterministicContentHash({
    candidateVersion: surface.candidateVersion,
    packRef: surface.packRef,
    methodologies: sortRefs(surface.methodologies),
    rules: sortRefs(surface.rules),
  });
}

export function buildGeneralMonthlyResearchReturnHandoff() {
  const bridgeReview = buildGeneralMonthlyAuthorityBridgeReview();
  const candidateSurface = buildCandidateSurface();
  const observedCandidateSurfaceHash = candidateSurfaceHash(candidateSurface);

  const material = Object.freeze({
    version: GENERAL_MONTHLY_RESEARCH_RETURN_HANDOFF_VERSION,
    issue: '#1719' as const,
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
      segmentCount: bridgeReview.candidateState.segmentCount,
      activationRuleCount: bridgeReview.candidateState.activationRuleCount,
      tensionRuleCount: bridgeReview.candidateState.tensionRuleCount,
      candidateSurfaceHash: observedCandidateSurfaceHash,
    }),
    researchReturnRequired: true as const,
    workstreams: Object.freeze([
      Object.freeze({
        code: 'MONTHLY_SEGMENT_STEM_TEN_GOD_SEMANTIC_AUTHORITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        currentPolicySourceId: bridgeReview.candidateState.sourceId,
        requirements: Object.freeze([
          'ESTABLISH_SOURCE_QUALIFIED_MONTHLY_SPECIFIC_SUPPORT_FOR_SEGMENT_STEM_TEN_GOD_INTERPRETATION',
          'SEPARATE_SOURCE_STATEMENT_INTERPRETIVE_READING_AND_RESEARCH_INFERENCE',
          'PRESERVE_MEANING_STRENGTH_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_AND_SCHOOL_DEPENDENCIES',
          'RECORD_NON_IMPLICATIONS_AND_DO_NOT_TREAT_MONTHLY_TEN_GOD_AS_A_LUCK_SCORE_OR_EVENT_GUARANTEE',
          'ALLOW_CURRENT_SEMANTIC_KEYS_TO_BE_NARROWED_CHANGED_SPLIT_OR_REMOVED_WHEN_RESEARCH_DOES_NOT_SUPPORT_THEM',
        ] as const),
      }),
      Object.freeze({
        code: 'MONTHLY_SEGMENT_BRANCH_CLASH_SEMANTIC_AUTHORITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        currentPolicySourceId: bridgeReview.candidateState.sourceId,
        requirements: Object.freeze([
          'ESTABLISH_SOURCE_QUALIFIED_MONTHLY_SPECIFIC_SUPPORT_FOR_SEGMENT_TO_NATAL_BRANCH_CLASH_MEANING_IF_RETAINED',
          'SEPARATE_THE_RESOLVED_SEGMENT_BRANCH_RELATION_FACT_FROM_ITS_INTERPRETIVE_MEANING',
          'PRESERVE_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_AND_SCHOOL_DEPENDENCIES',
          'DO_NOT_INFER_ACCIDENT_ILLNESS_SEPARATION_FINANCIAL_LOSS_OR_OTHER_DETERMINISTIC_EVENTS_FROM_CLASH_ALONE',
        ] as const),
      }),
      Object.freeze({
        code: 'MONTHLY_SEGMENT_EMPHASIS_AUTHORITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        currentPolicySourceId: bridgeReview.candidateState.sourceId,
        requirements: Object.freeze([
          'VERIFY_NARROW_REPLACE_OR_REMOVE_BEFORE_AFTER_JEOL_INTERPRETIVE_EMPHASIS',
          'VERIFY_NARROW_REPLACE_OR_REMOVE_CURRENT_PILLAR_SPECIFIC_CLASH_EMPHASIS',
          'DO_NOT_DERIVE_MEANING_STRENGTH_FROM_TEMPORAL_SEGMENTATION_PRECISION_ALONE',
        ] as const),
      }),
      Object.freeze({
        code: 'MONTHLY_SCOPE_AND_QUALIFIER_CONTRACT' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'DEFINE_MONTHLY_SCOPE_REQUIRED_INPUTS_PRECONDITIONS_ALLOWED_CONCLUSIONS_QUALIFIERS_EXCEPTIONS_AND_PROHIBITED_EXTENSIONS',
          'REVIEW_ANY_NATAL_OR_ANNUAL_AUTHORITY_REUSE_AT_CLAIM_LEVEL_INSTEAD_OF_WHOLESALE_INHERITANCE',
          'KEEP_NATAL_ANNUAL_AND_MONTHLY_AUTHORITY_SCOPES_DISTINCT',
          'IDENTIFY_UNRESOLVED_OR_SCHOOL_DEPENDENT_QUESTIONS_EXPLICITLY',
        ] as const),
      }),
      Object.freeze({
        code: 'PRODUCT_POLICY_TEMPORAL_SEGMENTATION_SEMANTIC_SEPARATION' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'KEEP_INTERNAL_MYEONGHA_POLICY_AVAILABLE_FOR_REQUEST_PACKAGING_AND_SAFETY_BOUNDARIES',
          'KEEP_EXACT_JEOL_SEGMENTATION_AVAILABLE_AS_TEMPORAL_INPUT_CAPABILITY',
          'DO_NOT_USE_INTERNAL_PRODUCT_POLICY_OR_SEGMENTATION_PRECISION_AS_STANDALONE_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY',
          'DO_NOT_TREAT_READING_PROFILE_COVERAGE_EXECUTABLE_FIXTURES_OR_TEMPORAL_FACT_DERIVATION_AS_SEMANTIC_AUTHORITY',
        ] as const),
      }),
    ]),
    expectedResearchDeliverables: Object.freeze([
      'REPOSITORY_GOVERNED_MONTHLY_RESEARCH_CANDIDATE_OR_EVIDENCE_ARTIFACT',
      'SOURCE_AND_PROVENANCE_REFS_FOR_EACH_RETAINED_MONTHLY_PROPOSITION_FAMILY',
      'SOURCE_STATEMENT_INTERPRETIVE_READING_AND_RESEARCH_INFERENCE_SEPARATION',
      'MONTHLY_SCOPE_PRECONDITIONS_ALLOWED_MEANING_AND_MEANING_STRENGTH',
      'QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_SCHOOL_DEPENDENCIES_AND_NON_IMPLICATIONS',
      'EXPLICIT_RECORD_OF_UNRESOLVED_QUESTIONS',
      'EXPLICIT_NATAL_AND_ANNUAL_REUSE_BOUNDARY',
      'EXPLICIT_SEGMENTATION_FACT_VERSUS_INTERPRETATION_AUTHORITY_BOUNDARY',
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
      natalAuthorityInheritedAutomatically: false as const,
      annualAuthorityInheritedAutomatically: false as const,
      temporalSegmentationIsInterpretationAuthority: false as const,
      exactJeolBoundaryIsInterpretationAuthority: false as const,
      internalProductPolicyIsTraditionalSemanticAuthority: false as const,
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
      'NO_NATAL_TO_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_ANNUAL_TO_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_INTERNAL_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_EXACT_JEOL_SEGMENTATION_AS_INTERPRETATION_AUTHORITY',
      'NO_BEFORE_AFTER_JEOL_OR_PILLAR_EMPHASIS_AS_AUTHORITY_WITHOUT_SOURCE_SUPPORT',
      'NO_TEMPORAL_FACT_EXECUTABILITY_OR_READING_PROFILE_COVERAGE_AS_SEMANTIC_AUTHORITY',
      'NO_DETERMINISTIC_FUTURE_EVENT_INFERENCE',
      'NO_REVIEW_ATTESTATION_OR_REVIEWER_TRUST_FABRICATION',
      'NO_AUTOMATIC_PROVENANCE_OR_LIFECYCLE_PROMOTION',
      'NO_ENGINE_PREVIEW_OFFICIAL_OR_PRODUCTION_PROMOTION_FROM_THIS_HANDOFF',
      'NO_GYEOKGUK_STRENGTH_WANGSHUAI_YONGSHIN_SKU_OR_COMMERCE_EXPANSION',
    ] as const),
  });

  return Object.freeze({
    ...material,
    handoffHash: deterministicContentHash(material),
  });
}
