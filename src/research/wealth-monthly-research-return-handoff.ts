import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
  createWealthMonthlyReadingCandidateRegistry,
} from './wealth-monthly-reading-candidate.js';
import { buildWealthMonthlyAuthorityBridgeReview } from './wealth-monthly-authority-bridge-review.js';

export const WEALTH_MONTHLY_RESEARCH_RETURN_HANDOFF_VERSION =
  'myeonghwa-wealth-monthly-research-return-handoff-v1' as const;

interface WealthMonthlyCandidateSurface {
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

function buildCandidateSurface(): WealthMonthlyCandidateSurface {
  const registry = createWealthMonthlyReadingCandidateRegistry();
  return Object.freeze({
    candidateVersion: WEALTH_MONTHLY_READING_CANDIDATE_VERSION,
    packRef: Object.freeze({ ...registry.snapshot.packRef }),
    methodologies: sortRefs(registry.snapshot.methodologies),
    rules: sortRefs(registry.snapshot.rules),
  });
}

function candidateSurfaceHash(surface: WealthMonthlyCandidateSurface): string {
  return deterministicContentHash({
    candidateVersion: surface.candidateVersion,
    packRef: surface.packRef,
    methodologies: sortRefs(surface.methodologies),
    rules: sortRefs(surface.rules),
  });
}

export function buildWealthMonthlyResearchReturnHandoff() {
  const bridgeReview = buildWealthMonthlyAuthorityBridgeReview();
  const candidateSurface = buildCandidateSurface();
  const observedCandidateSurfaceHash = candidateSurfaceHash(candidateSurface);

  const material = Object.freeze({
    version: WEALTH_MONTHLY_RESEARCH_RETURN_HANDOFF_VERSION,
    issue: '#1753' as const,
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
      monthlyActivationRuleCount: bridgeReview.candidateState.monthlyActivationRuleCount,
      monthlyTensionRuleCount: bridgeReview.candidateState.monthlyTensionRuleCount,
      monthlyRuleCount: bridgeReview.candidateState.monthlyRuleCount,
      reusedNatalRuleCount: bridgeReview.candidateState.reusedNatalRuleCount,
      registryRuleCount: bridgeReview.candidateState.registryRuleCount,
      candidateSurfaceHash: observedCandidateSurfaceHash,
    }),
    researchReturnRequired: true as const,
    workstreams: Object.freeze([
      Object.freeze({
        code: 'WEALTH_MONTHLY_SEGMENT_STEM_TEN_GOD_SEMANTIC_AUTHORITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        currentPolicySourceId: bridgeReview.candidateState.monthlySourceId,
        requirements: Object.freeze([
          'ESTABLISH_SOURCE_QUALIFIED_WEALTH_MONTHLY_SUPPORT_FOR_SEGMENT_STEM_TEN_GOD_MONEY_MANAGEMENT_INTERPRETATION',
          'SEPARATE_SOURCE_STATEMENT_INTERPRETIVE_READING_AND_RESEARCH_INFERENCE',
          'PRESERVE_MEANING_STRENGTH_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_AND_SCHOOL_DEPENDENCIES',
          'RECORD_NON_IMPLICATIONS_AND_DO_NOT_TREAT_WEALTH_MONTHLY_TEN_GOD_AS_AN_INCOME_RETURN_LOSS_DEBT_WINDFALL_OR_MARKET_OUTCOME_GUARANTEE',
          'ALLOW_CURRENT_WEALTH_AXES_AND_SEMANTIC_KEYS_TO_BE_NARROWED_CHANGED_SPLIT_OR_REMOVED_WHEN_RESEARCH_DOES_NOT_SUPPORT_THEM',
        ] as const),
      }),
      Object.freeze({
        code: 'WEALTH_MONTHLY_SEGMENT_BRANCH_CLASH_FINANCIAL_PLAN_ADJUSTMENT_AUTHORITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        currentPolicySourceId: bridgeReview.candidateState.monthlySourceId,
        requirements: Object.freeze([
          'ESTABLISH_SOURCE_QUALIFIED_WEALTH_MONTHLY_SUPPORT_FOR_SEGMENT_TO_NATAL_BRANCH_CLASH_FINANCIAL_PLAN_ADJUSTMENT_MEANING_IF_RETAINED',
          'SEPARATE_THE_RESOLVED_SEGMENT_BRANCH_RELATION_FACT_FROM_ITS_WEALTH_INTERPRETIVE_MEANING',
          'PRESERVE_QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_AND_SCHOOL_DEPENDENCIES',
          'DO_NOT_INFER_INCOME_RETURN_LOSS_DEBT_WINDFALL_MARKET_OR_OTHER_SPECIFIC_FINANCIAL_EVENTS_FROM_CLASH_ALONE',
        ] as const),
      }),
      Object.freeze({
        code: 'WEALTH_MONTHLY_SEGMENT_AXIS_ADJUSTMENT_AND_EMPHASIS_AUTHORITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        currentPolicySourceId: bridgeReview.candidateState.monthlySourceId,
        requirements: Object.freeze([
          'VERIFY_NARROW_REPLACE_OR_REMOVE_CURRENT_BEFORE_AFTER_JEOL_WEALTH_AXES',
          'VERIFY_NARROW_REPLACE_OR_REMOVE_CURRENT_ADJUSTMENT_AREAS',
          'VERIFY_NARROW_REPLACE_OR_REMOVE_CURRENT_BEFORE_AFTER_JEOL_AND_PILLAR_SPECIFIC_EMPHASIS',
          'DO_NOT_DERIVE_WEALTH_MEANING_STRENGTH_FROM_TEMPORAL_SEGMENTATION_PRECISION_ALONE',
        ] as const),
      }),
      Object.freeze({
        code: 'WEALTH_MONTHLY_SCOPE_AND_QUALIFIER_CONTRACT' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'DEFINE_WEALTH_MONTHLY_SCOPE_REQUIRED_INPUTS_PRECONDITIONS_ALLOWED_CONCLUSIONS_QUALIFIERS_EXCEPTIONS_AND_PROHIBITED_EXTENSIONS',
          'KEEP_WEALTH_NATAL_WEALTH_ANNUAL_AND_WEALTH_MONTHLY_AUTHORITY_SCOPES_DISTINCT',
          'IDENTIFY_UNRESOLVED_OR_SCHOOL_DEPENDENT_QUESTIONS_EXPLICITLY',
        ] as const),
      }),
      Object.freeze({
        code: 'WEALTH_NATAL_GENERAL_MONTHLY_WEALTH_ANNUAL_AND_CAREER_MONTHLY_REUSE_BOUNDARY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'REVIEW_ANY_WEALTH_NATAL_REUSE_AT_CLAIM_LEVEL_INSTEAD_OF_WHOLESALE_AUTHORITY_INHERITANCE',
          'REVIEW_ANY_GENERAL_MONTHLY_REUSE_AT_CLAIM_LEVEL_INSTEAD_OF_WHOLESALE_AUTHORITY_INHERITANCE',
          'REVIEW_ANY_WEALTH_ANNUAL_REUSE_AT_CLAIM_LEVEL_INSTEAD_OF_WHOLESALE_AUTHORITY_INHERITANCE',
          'REVIEW_ANY_CAREER_MONTHLY_REUSE_AT_CLAIM_LEVEL_INSTEAD_OF_WHOLESALE_AUTHORITY_INHERITANCE',
        ] as const),
      }),
      Object.freeze({
        code: 'PRODUCT_POLICY_TEMPORAL_SEGMENTATION_SEMANTIC_AND_FINANCIAL_ADVICE_SEPARATION' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: false as const,
        requirements: Object.freeze([
          'KEEP_INTERNAL_MYEONGHA_POLICY_AVAILABLE_FOR_REQUEST_PACKAGING_AND_SAFETY_BOUNDARIES',
          'KEEP_EXACT_JEOL_SEGMENTATION_AVAILABLE_AS_TEMPORAL_INPUT_CAPABILITY',
          'DO_NOT_USE_INTERNAL_PRODUCT_POLICY_OR_SEGMENTATION_PRECISION_AS_STANDALONE_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY',
          'SEPARATE_TRADITIONAL_SAJU_INTERPRETATION_AUTHORITY_FROM_FINANCIAL_ADVICE_AUTHORIZATION',
          'DO_NOT_TREAT_READING_PROFILE_COVERAGE_EXECUTABLE_FIXTURES_OR_TEMPORAL_FACT_DERIVATION_AS_SEMANTIC_AUTHORITY',
        ] as const),
      }),
    ]),
    expectedResearchDeliverables: Object.freeze([
      'REPOSITORY_GOVERNED_WEALTH_MONTHLY_RESEARCH_CANDIDATE_OR_EVIDENCE_ARTIFACT',
      'SOURCE_AND_PROVENANCE_REFS_FOR_EACH_RETAINED_WEALTH_MONTHLY_PROPOSITION_FAMILY',
      'SOURCE_STATEMENT_INTERPRETIVE_READING_AND_RESEARCH_INFERENCE_SEPARATION',
      'WEALTH_MONTHLY_SCOPE_PRECONDITIONS_ALLOWED_MEANING_AND_MEANING_STRENGTH',
      'QUALIFIERS_EXCEPTIONS_COUNTEREXAMPLES_SCHOOL_DEPENDENCIES_AND_NON_IMPLICATIONS',
      'EXPLICIT_RECORD_OF_UNRESOLVED_QUESTIONS',
      'EXPLICIT_WEALTH_NATAL_GENERAL_MONTHLY_WEALTH_ANNUAL_AND_CAREER_MONTHLY_REUSE_BOUNDARY',
      'EXPLICIT_SEGMENTATION_FACT_VERSUS_WEALTH_INTERPRETATION_AUTHORITY_BOUNDARY',
      'EXPLICIT_TRADITIONAL_SAJU_SEMANTIC_AUTHORITY_VERSUS_FINANCIAL_ADVICE_BOUNDARY',
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
      wealthNatalAuthorityInheritedAutomatically: false as const,
      generalMonthlyAuthorityInheritedAutomatically: false as const,
      wealthAnnualAuthorityInheritedAutomatically: false as const,
      careerMonthlyAuthorityInheritedAutomatically: false as const,
      temporalSegmentationIsWealthInterpretationAuthority: false as const,
      exactJeolBoundaryIsWealthInterpretationAuthority: false as const,
      internalProductPolicyIsTraditionalSemanticAuthority: false as const,
      financialAdviceAuthorized: false as const,
      deterministicFinancialEventPredictionAuthorized: false as const,
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
      'NO_WEALTH_NATAL_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_GENERAL_MONTHLY_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_WEALTH_ANNUAL_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_CAREER_MONTHLY_TO_WEALTH_MONTHLY_AUTHORITY_INHERITANCE',
      'NO_INTERNAL_PRODUCT_POLICY_AS_STANDALONE_SAJU_SEMANTIC_AUTHORITY',
      'NO_EXACT_JEOL_SEGMENTATION_AS_WEALTH_INTERPRETATION_AUTHORITY',
      'NO_TEMPORAL_FACT_EXECUTABILITY_FIXTURE_OR_READING_PROFILE_COVERAGE_AS_AUTHORITY',
      'NO_INCOME_RETURN_LOSS_DEBT_WINDFALL_MARKET_OR_SPECIFIC_FINANCIAL_EVENT_PREDICTION',
      'NO_FINANCIAL_ADVICE_AUTHORIZATION',
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
