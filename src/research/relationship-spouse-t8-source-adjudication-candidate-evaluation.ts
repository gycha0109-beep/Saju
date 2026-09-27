import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildRelationshipSpouseT8EngineHardeningBinding,
  buildRelationshipSpouseT8EngineHardeningCompletionEvidence,
} from '../reading/relationship-spouse-t8-engine-hardening.js';
import {
  buildSourceAdjudicationPromotionPolicy,
  evaluateSourceAdjudicationApplicability,
} from './source-adjudication-promotion-policy.js';
import {
  buildRelationshipSpouseT8AiAssistedInternalReview,
} from './relationship-spouse-t8-ai-assisted-internal-review.js';
import {
  buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission,
} from './relationship-spouse-t8-bounded-engine-development-admission.js';
import {
  buildRelationshipSpouseT8DomainReviewSubjectManifest,
} from './relationship-spouse-t8-domain-review-subject-manifest.js';
import {
  createRelationshipSpouseT8G2AAdmittedContract,
} from './relationship-spouse-t8-g2a-admitted-handoff.js';
import {
  buildRelationshipSpouseT8RuntimeSourceManifest,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
} from './relationship-spouse-t8-runtime-source-manifest.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY,
} from './relationship-spouse-t8-source-bound-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_CANDIDATE_EVALUATION_VERSION =
  'myeonghwa-relationship-spouse-t8-source-adjudication-candidate-evaluation-v1' as const;

function hasAll(
  values: readonly string[],
  expected: readonly string[],
): boolean {
  const set = new Set(values);
  return expected.every((value) => set.has(value));
}

function contentAddressedRefValid(
  ref: ContentAddressedVersionedRef,
): boolean {
  return (
    ref.id.length > 0 &&
    ref.version.length > 0 &&
    /^[a-f0-9]{64}$/.test(ref.contentHash)
  );
}

export function buildRelationshipSpouseT8SourceAdjudicationCandidateRef(): ContentAddressedVersionedRef {
  const policy = buildSourceAdjudicationPromotionPolicy();
  const subjects = buildRelationshipSpouseT8DomainReviewSubjectManifest();
  const sourceManifest = buildRelationshipSpouseT8RuntimeSourceManifest();
  const aiReview = buildRelationshipSpouseT8AiAssistedInternalReview();
  const admission = buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();
  const hardening = buildRelationshipSpouseT8EngineHardeningCompletionEvidence();
  const g2a = createRelationshipSpouseT8G2AAdmittedContract();

  if (
    admission.admittedAuthorityRef === undefined ||
    admission.admittedMethodologyRef === undefined ||
    admission.admittedRuleClaimContractRef === undefined
  ) {
    throw new Error(
      'Spouse T8 source-adjudication candidate requires exact bounded admission refs.',
    );
  }

  const material = Object.freeze({
    candidateVersion:
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_CANDIDATE_EVALUATION_VERSION,
    capabilityKey: 'relationship:natal:spouse' as const,
    intendedLifecycleTarget: 'staging' as const,
    claimClass: 'bounded_deterministic_correspondence' as const,
    policyRef: policy.policyRef,
    registrySnapshotId: subjects.registrySnapshotId,
    packRef: subjects.packRef,
    subjectRefs: Object.freeze(
      subjects.subjects.map((subject) =>
        Object.freeze({
          subjectType: subject.subjectType,
          subjectRef: Object.freeze({ ...subject.subjectRef }),
        }),
      ),
    ),
    sourceManifestId: sourceManifest.manifestId,
    aiInternalReviewId: aiReview.reviewId,
    boundedAdmissionRef: Object.freeze({ ...admission.admittedAuthorityRef }),
    admittedMethodologyRef: Object.freeze({ ...admission.admittedMethodologyRef }),
    admittedRuleClaimContractRef: Object.freeze({
      ...admission.admittedRuleClaimContractRef,
    }),
    g2aAuthorityRef: g2a.admittedAuthorityRef,
    g2aMethodologyRef: g2a.methodologyRef,
    g2aRuleClaimContractRef: g2a.ruleClaimContractRef,
    engineHardeningEvidenceId: hardening.evidenceId,
  });

  return Object.freeze({
    id: 'relationship-spouse-t8-source-adjudication-candidate',
    version: '1.0.0',
    contentHash: deterministicContentHash(material),
  });
}

export function evaluateRelationshipSpouseT8SourceAdjudicationCandidate() {
  const policy = buildSourceAdjudicationPromotionPolicy();
  const candidateRef =
    buildRelationshipSpouseT8SourceAdjudicationCandidateRef();
  const subjects = buildRelationshipSpouseT8DomainReviewSubjectManifest();
  const sourceManifest = buildRelationshipSpouseT8RuntimeSourceManifest();
  const aiReview = buildRelationshipSpouseT8AiAssistedInternalReview();
  const admission = buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();
  const g2a = createRelationshipSpouseT8G2AAdmittedContract();
  const hardeningBinding = buildRelationshipSpouseT8EngineHardeningBinding();
  const hardeningCompletion =
    buildRelationshipSpouseT8EngineHardeningCompletionEvidence();

  const exactContentAddressing =
    contentAddressedRefValid(candidateRef) &&
    contentAddressedRefValid(subjects.packRef) &&
    subjects.reviewSubjectCount === 3 &&
    subjects.methodologySubjectCount === 1 &&
    subjects.ruleSubjectCount === 2 &&
    subjects.subjects.every((subject) =>
      contentAddressedRefValid(subject.subjectRef),
    ) &&
    admission.admittedAuthorityRef !== undefined &&
    admission.admittedMethodologyRef !== undefined &&
    admission.admittedRuleClaimContractRef !== undefined &&
    contentAddressedRefValid(admission.admittedAuthorityRef) &&
    contentAddressedRefValid(admission.admittedMethodologyRef) &&
    contentAddressedRefValid(admission.admittedRuleClaimContractRef);

  const semanticScopeFrozen =
    g2a.requiredInputs.length === 1 &&
    g2a.requiredInputs[0] === 'derivedFacts.dayMaster' &&
    g2a.allowedClaims.length === 2 &&
    hasAll(g2a.forbiddenClaims, [
      'NATIVE_SEX_INFERENCE',
      'PARTNER_SEX_INFERENCE',
      'PARTNER_IDENTITY_INFERENCE',
      'SEXUAL_ORIENTATION_INFERENCE',
      'MARRIAGE_EXISTENCE_OR_GUARANTEE',
      'FERTILITY_INFERENCE',
      'RELATIONSHIP_LEGALITY_OR_ETHICS_INFERENCE',
      'COMPATIBILITY_SCORING',
      'SECOND_CHART_INFERENCE',
      'RELATIONSHIP_OUTCOME_PREDICTION',
      'ANNUAL_OR_MONTHLY_SPOUSE_AUTHORITY_EXPANSION',
      'GENERAL_RELATIONSHIP_AUTHORITY_RELABELLED_AS_SPOUSE_T8_AUTHORITY',
    ]);

  const sourceBindingComplete =
    sourceManifest.manifestComplete === true &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY
      .sourceBindingMaterialized === true &&
    sourceManifest.exactRuleCoverage === true &&
    sourceManifest.sourceMappingsComplete === true &&
    sourceManifest.ruleReferencesResolve === true &&
    sourceManifest.methodologyReferencesResolve === true;

  const sourceRolePinningComplete =
    aiReview.sourceReview.sourceRoleBoundaryPreserved === true &&
    RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.length === 2 &&
    RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.every(
      (binding) =>
        binding.sourceRefs.length === 1 &&
        binding.sourceRefs[0]?.sourceId ===
          RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID &&
        binding.sourceRefs[0]?.supportType === 'direct_basis',
    ) &&
    hasAll(
      RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_CONTROL_IDS,
      [
        'WHISPER_IS_DIRECT_BASIS_FOR_EXACT_SELECTOR_RULES_ONLY',
        'LEE_IS_METHODOLOGY_NORMATIVE_CONTEXT_NOT_SELECTOR_DIRECT_BASIS',
        'SCHOOL_DEPENDENCE_IS_PRESERVED',
        'NO_CROSS_SOURCE_STITCHING_CREATES_A_NEW_SELECTOR',
      ],
    );

  const passagePropositionBindingComplete =
    aiReview.exactCurrentSubjectBinding === true &&
    aiReview.sourceReview.whisperPublicBodyRechecked === true &&
    aiReview.sourceReview.whisperYangSelectorObserved === true &&
    aiReview.sourceReview.whisperYinSelectorObserved === true &&
    aiReview.sourceReview.leeKciIdentityAndAbstractRechecked === true &&
    aiReview.sourceReview.leeUsedAsRuleDirectBasis === false;

  const rightsReuseHandlingExplicit =
    sourceManifest.rightsHandlingExplicit === true &&
    hasAll(
      RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_CONTROL_IDS,
      ['RIGHTS_LICENSE_IS_NOT_INVENTED', 'RUNTIME_REUSE_IS_METADATA_ONLY'],
    );

  const counterexamplesAndDivergenceReviewed =
    aiReview.sourceReview.whisperSchoolDependenceObserved === true &&
    aiReview.sourceReview.leePureNatalSelectorObserved === false &&
    aiReview.sourceReview.leeUsedAsRuleDirectBasis === false &&
    aiReview.sourceReview.sourceRoleBoundaryPreserved === true;

  const calculationConventionsExplicit =
    g2a.requiredInputs.length === 1 &&
    g2a.requiredInputs[0] === 'derivedFacts.dayMaster' &&
    hasAll(g2a.runtimePrerequisites, [
      'CANONICAL_SAJU_SNAPSHOT_AVAILABLE',
      'DERIVED_FACTS_DAY_MASTER_RESOLVED',
      'DAY_MASTER_YIN_YANG_RESOLVED_TO_EXACTLY_YANG_OR_YIN',
    ]);

  const executablePredicatesNoHiddenGuesses =
    calculationConventionsExplicit &&
    hasAll(g2a.negativeCases, [
      'NO_T5_SUBTYPE_RECONSTRUCTION',
      'NO_GENERAL_RELATIONSHIP_T8_RELABELLING',
      'NO_SECOND_CHART_COMPATIBILITY_FALLBACK',
    ]);

  const ambiguityUnknownFailClosed =
    hasAll(g2a.negativeCases, [
      'MISSING_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
      'AMBIGUOUS_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
      'UNAVAILABLE_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
      'PENDING_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
    ]) &&
    hardeningCompletion.p2Complete === true;

  const deterministicAndRegressionTestsPass =
    hardeningCompletion.p2Complete === true &&
    hardeningCompletion.implementationEvidence.deterministicGuardsComplete ===
      true;

  const engineE2eComplete =
    hardeningCompletion.p2Complete === true &&
    hardeningCompletion.implementationEvidence.e2eComplete === true &&
    hardeningCompletion.observedRouting === 'READY';

  const semanticExpansionGuardsComplete =
    hardeningBinding.hardeningBindingReady === true &&
    Object.values(hardeningBinding.guardChecks).every(
      (value) => value === true,
    ) &&
    hasAll(g2a.forbiddenClaims, [
      'COMPATIBILITY_SCORING',
      'SECOND_CHART_INFERENCE',
      'ANNUAL_OR_MONTHLY_SPOUSE_AUTHORITY_EXPANSION',
      'GENERAL_RELATIONSHIP_AUTHORITY_RELABELLED_AS_SPOUSE_T8_AUTHORITY',
    ]);

  const aiAdversarialInternalReviewComplete =
    aiReview.authority.aiAssistedInternalReviewEstablished === true &&
    aiReview.authority.internalApprovedSubjectCount === 3 &&
    aiReview.exactCurrentSubjectBinding === true;

  const crossSourceSyntheticRule =
    !hasAll(
      RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_CONTROL_IDS,
      ['NO_CROSS_SOURCE_STITCHING_CREATES_A_NEW_SELECTOR'],
    ) ||
    !RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.every(
      (binding) =>
        binding.sourceRefs.length === 1 &&
        binding.sourceRefs[0]?.sourceId ===
          RELATIONSHIP_SPOUSE_T8_WHISPER_RUNTIME_SOURCE_ID,
    );

  const unresolvedMethodologyConflict =
    !(
      aiReview.sourceReview.whisperSchoolDependenceObserved === true &&
      aiReview.sourceReview.sourceRoleBoundaryPreserved === true &&
      admission.boundedEngineDevelopmentAdmitted === true &&
      semanticScopeFrozen
    );

  const openEndedNarrativeSemantics =
    hardeningBinding.guardChecks.claimNarrativeBoundaryPreserved !== true;

  const evidence = Object.freeze({
    semanticScopeFrozen,
    exactContentAddressing,
    sourceBindingComplete,
    sourceRolePinningComplete,
    passagePropositionBindingComplete,
    rightsReuseHandlingExplicit,
    counterexamplesAndDivergenceReviewed,
    calculationConventionsExplicit,
    executablePredicatesNoHiddenGuesses,
    ambiguityUnknownFailClosed,
    deterministicAndRegressionTestsPass,
    engineE2eComplete,
    semanticExpansionGuardsComplete,
    aiAdversarialInternalReviewComplete,
  });

  const disqualifiers = Object.freeze({
    openEndedNarrativeSemantics,
    unresolvedMethodologyConflict,
    crossSourceSyntheticRule,
    semanticScopeNotFrozen: !semanticScopeFrozen,
  });

  const policyEvaluation = evaluateSourceAdjudicationApplicability({
    candidateRef,
    claimClass: 'bounded_deterministic_correspondence',
    intendedLifecycleTarget: 'staging',
    evidence,
    disqualifiers,
  });

  const authorityBoundary = Object.freeze({
    objectiveEligibilityEstablished:
      policyEvaluation.objectiveEligibility === true,
    explicitGovernanceDecisionPresent: false as const,
    sourceAdjudicationAuthorityEstablished: false as const,
    gate12ResolvedAsNotApplicable: false as const,
    humanDomainReviewClaimed: false as const,
    reviewerTrustGrantClaimed: false as const,
    reviewerStatusPromotionAuthorized: false as const,
    provenanceQualityPromotionAuthorized: false as const,
    lifecyclePromotionAuthorized: false as const,
    stagingActivationAuthorized: false as const,
    previewAuthorityAuthorized: false as const,
    officialReadingAuthorityAuthorized: false as const,
    productionAuthorityAuthorized: false as const,
    production: 'HOLD' as const,
  });

  const material = Object.freeze({
    evaluationVersion:
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATION_CANDIDATE_EVALUATION_VERSION,
    issue: '#1801' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    policyRef: policy.policyRef,
    candidateRef,
    subjectManifestHash: subjects.manifestHash,
    sourceManifestId: sourceManifest.manifestId,
    aiInternalReviewId: aiReview.reviewId,
    boundedAdmissionRef: admission.admittedAuthorityRef,
    engineHardeningEvidenceId: hardeningCompletion.evidenceId,
    evidence,
    disqualifiers,
    policyEvaluation,
    authorityBoundary,
    nextDisposition:
      policyEvaluation.status ===
      'ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION'
        ? ('REQUEST_EXPLICIT_SOURCE_ADJUDICATION_STAGING_GOVERNANCE_DECISION' as const)
        : ('REPAIR_SOURCE_ADJUDICATION_ELIGIBILITY_BLOCKERS' as const),
  });

  return Object.freeze({
    evaluationId: deterministicContentHash(material),
    ...material,
  });
}
