import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const SOURCE_ADJUDICATION_PROMOTION_POLICY_ID =
  'myeonghwa-source-adjudication-promotion-policy' as const;
export const SOURCE_ADJUDICATION_PROMOTION_POLICY_VERSION = '1.0.0' as const;

export const SOURCE_ADJUDICATION_ELIGIBLE_CLAIM_CLASSES = Object.freeze([
  'bounded_deterministic_correspondence',
] as const);

export const SOURCE_ADJUDICATION_ALLOWED_LIFECYCLE_TARGETS = Object.freeze([
  'staging',
] as const);

export const SOURCE_ADJUDICATION_REQUIRED_EVIDENCE = Object.freeze([
  'SEMANTIC_SCOPE_FROZEN',
  'EXACT_CONTENT_ADDRESSING',
  'SOURCE_BINDING_COMPLETE',
  'SOURCE_ROLE_PINNING_COMPLETE',
  'PASSAGE_PROPOSITION_BINDING_COMPLETE',
  'RIGHTS_REUSE_HANDLING_EXPLICIT',
  'COUNTEREXAMPLES_AND_DIVERGENCE_REVIEWED',
  'CALCULATION_CONVENTIONS_EXPLICIT',
  'EXECUTABLE_PREDICATES_NO_HIDDEN_GUESSES',
  'AMBIGUITY_UNKNOWN_FAIL_CLOSED',
  'DETERMINISTIC_AND_REGRESSION_TESTS_PASS',
  'ENGINE_E2E_COMPLETE',
  'SEMANTIC_EXPANSION_GUARDS_COMPLETE',
  'AI_ADVERSARIAL_INTERNAL_REVIEW_COMPLETE',
] as const);

export const SOURCE_ADJUDICATION_DISQUALIFIERS = Object.freeze([
  'OPEN_ENDED_NARRATIVE_SEMANTICS',
  'UNRESOLVED_METHODOLOGY_CONFLICT',
  'CROSS_SOURCE_SYNTHETIC_RULE',
  'SEMANTIC_SCOPE_NOT_FROZEN',
] as const);

export type SourceAdjudicationEligibleClaimClass =
  (typeof SOURCE_ADJUDICATION_ELIGIBLE_CLAIM_CLASSES)[number];
export type SourceAdjudicationLifecycleTarget = 'staging' | 'production';

export interface SourceAdjudicationEvidenceInput {
  semanticScopeFrozen: boolean;
  exactContentAddressing: boolean;
  sourceBindingComplete: boolean;
  sourceRolePinningComplete: boolean;
  passagePropositionBindingComplete: boolean;
  rightsReuseHandlingExplicit: boolean;
  counterexamplesAndDivergenceReviewed: boolean;
  calculationConventionsExplicit: boolean;
  executablePredicatesNoHiddenGuesses: boolean;
  ambiguityUnknownFailClosed: boolean;
  deterministicAndRegressionTestsPass: boolean;
  engineE2eComplete: boolean;
  semanticExpansionGuardsComplete: boolean;
  aiAdversarialInternalReviewComplete: boolean;
}

export interface SourceAdjudicationDisqualifierInput {
  openEndedNarrativeSemantics: boolean;
  unresolvedMethodologyConflict: boolean;
  crossSourceSyntheticRule: boolean;
  semanticScopeNotFrozen: boolean;
}

export interface SourceAdjudicationGovernanceDecision {
  decisionRef: ContentAddressedVersionedRef;
  decision: 'approved' | 'rejected';
  authorityClass: 'source_adjudication';
  candidateRef: ContentAddressedVersionedRef;
  lifecycleTarget: 'staging';
}

export interface SourceAdjudicationApplicabilityInput {
  candidateRef: ContentAddressedVersionedRef;
  claimClass: SourceAdjudicationEligibleClaimClass | string;
  intendedLifecycleTarget: SourceAdjudicationLifecycleTarget;
  evidence: SourceAdjudicationEvidenceInput;
  disqualifiers: SourceAdjudicationDisqualifierInput;
  governanceDecision?: SourceAdjudicationGovernanceDecision;
}

function refsEqual(
  left: ContentAddressedVersionedRef,
  right: ContentAddressedVersionedRef,
): boolean {
  return (
    left.id === right.id &&
    left.version === right.version &&
    left.contentHash === right.contentHash
  );
}

function missingEvidence(
  evidence: SourceAdjudicationEvidenceInput,
): readonly string[] {
  const checks = [
    ['SEMANTIC_SCOPE_FROZEN', evidence.semanticScopeFrozen],
    ['EXACT_CONTENT_ADDRESSING', evidence.exactContentAddressing],
    ['SOURCE_BINDING_COMPLETE', evidence.sourceBindingComplete],
    ['SOURCE_ROLE_PINNING_COMPLETE', evidence.sourceRolePinningComplete],
    ['PASSAGE_PROPOSITION_BINDING_COMPLETE', evidence.passagePropositionBindingComplete],
    ['RIGHTS_REUSE_HANDLING_EXPLICIT', evidence.rightsReuseHandlingExplicit],
    [
      'COUNTEREXAMPLES_AND_DIVERGENCE_REVIEWED',
      evidence.counterexamplesAndDivergenceReviewed,
    ],
    ['CALCULATION_CONVENTIONS_EXPLICIT', evidence.calculationConventionsExplicit],
    [
      'EXECUTABLE_PREDICATES_NO_HIDDEN_GUESSES',
      evidence.executablePredicatesNoHiddenGuesses,
    ],
    ['AMBIGUITY_UNKNOWN_FAIL_CLOSED', evidence.ambiguityUnknownFailClosed],
    [
      'DETERMINISTIC_AND_REGRESSION_TESTS_PASS',
      evidence.deterministicAndRegressionTestsPass,
    ],
    ['ENGINE_E2E_COMPLETE', evidence.engineE2eComplete],
    ['SEMANTIC_EXPANSION_GUARDS_COMPLETE', evidence.semanticExpansionGuardsComplete],
    [
      'AI_ADVERSARIAL_INTERNAL_REVIEW_COMPLETE',
      evidence.aiAdversarialInternalReviewComplete,
    ],
  ] as const;

  return Object.freeze(
    checks
      .filter(([, satisfied]) => satisfied !== true)
      .map(([evidenceId]) => evidenceId),
  );
}

function activeDisqualifiers(
  disqualifiers: SourceAdjudicationDisqualifierInput,
): readonly string[] {
  const checks = [
    ['OPEN_ENDED_NARRATIVE_SEMANTICS', disqualifiers.openEndedNarrativeSemantics],
    ['UNRESOLVED_METHODOLOGY_CONFLICT', disqualifiers.unresolvedMethodologyConflict],
    ['CROSS_SOURCE_SYNTHETIC_RULE', disqualifiers.crossSourceSyntheticRule],
    ['SEMANTIC_SCOPE_NOT_FROZEN', disqualifiers.semanticScopeNotFrozen],
  ] as const;

  return Object.freeze(
    checks
      .filter(([, active]) => active === true)
      .map(([disqualifierId]) => disqualifierId),
  );
}

export function buildSourceAdjudicationPromotionPolicy() {
  const material = Object.freeze({
    policyId: SOURCE_ADJUDICATION_PROMOTION_POLICY_ID,
    version: SOURCE_ADJUDICATION_PROMOTION_POLICY_VERSION,
    eligibleClaimClasses: SOURCE_ADJUDICATION_ELIGIBLE_CLAIM_CLASSES,
    allowedLifecycleTargets: SOURCE_ADJUDICATION_ALLOWED_LIFECYCLE_TARGETS,
    requiredEvidence: SOURCE_ADJUDICATION_REQUIRED_EVIDENCE,
    disqualifiers: SOURCE_ADJUDICATION_DISQUALIFIERS,
    r098Gate12Treatment: Object.freeze({
      gateId: 'REQUIRED_DOMAIN_REVIEW_ATTESTATION_SATISFIED' as const,
      applicability: 'CONDITIONAL' as const,
      sourceAdjudicationStatus:
        'NOT_APPLICABLE_WITH_JUSTIFICATION' as const,
      explicitGovernanceDecisionRequired: true as const,
      policyRefRequired: true as const,
      justificationRequired: true as const,
      silentSkipAuthorized: false as const,
    }),
    authorityBoundary: Object.freeze({
      humanDomainReviewClaimed: false as const,
      reviewerTrustGrantClaimed: false as const,
      reviewAttestationClaimed: false as const,
      domainReviewedStatusClaimed: false as const,
      lifecycleMutationAuthorizedByPolicyDefinition: false as const,
      previewAuthorityGranted: false as const,
      officialReadingAuthorityGranted: false as const,
      productionAuthorityGranted: false as const,
      sourceAdjudicationV1MayTargetProduction: false as const,
    }),
  });

  const policyRef: ContentAddressedVersionedRef = Object.freeze({
    id: material.policyId,
    version: material.version,
    contentHash: deterministicContentHash(material),
  });

  return Object.freeze({
    ...material,
    policyRef,
  });
}

export function evaluateSourceAdjudicationApplicability(
  input: SourceAdjudicationApplicabilityInput,
) {
  const policy = buildSourceAdjudicationPromotionPolicy();
  const evidenceBlockers = missingEvidence(input.evidence);
  const disqualifierBlockers = activeDisqualifiers(input.disqualifiers);
  const claimClassEligible = (
    SOURCE_ADJUDICATION_ELIGIBLE_CLAIM_CLASSES as readonly string[]
  ).includes(input.claimClass);
  const lifecycleTargetAllowed = (
    SOURCE_ADJUDICATION_ALLOWED_LIFECYCLE_TARGETS as readonly string[]
  ).includes(input.intendedLifecycleTarget);

  const governanceDecision = input.governanceDecision;
  const decisionCandidateMatches =
    governanceDecision === undefined ||
    refsEqual(governanceDecision.candidateRef, input.candidateRef);
  const decisionTargetMatches =
    governanceDecision === undefined ||
    governanceDecision.lifecycleTarget === input.intendedLifecycleTarget;
  const decisionAuthorityClassMatches =
    governanceDecision === undefined ||
    governanceDecision.authorityClass === 'source_adjudication';

  const blockers = Object.freeze([
    ...(!claimClassEligible ? ['CLAIM_CLASS_NOT_SOURCE_ADJUDICATION_ELIGIBLE'] : []),
    ...(!lifecycleTargetAllowed
      ? [
          input.intendedLifecycleTarget === 'production'
            ? 'SOURCE_ADJUDICATION_V1_DOES_NOT_AUTHORIZE_PRODUCTION'
            : 'LIFECYCLE_TARGET_NOT_SOURCE_ADJUDICATION_ELIGIBLE',
        ]
      : []),
    ...evidenceBlockers.map((id) => `MISSING_EVIDENCE:${id}`),
    ...disqualifierBlockers.map((id) => `DISQUALIFIER:${id}`),
    ...(!decisionCandidateMatches ? ['GOVERNANCE_DECISION_CANDIDATE_MISMATCH'] : []),
    ...(!decisionTargetMatches ? ['GOVERNANCE_DECISION_TARGET_MISMATCH'] : []),
    ...(!decisionAuthorityClassMatches
      ? ['GOVERNANCE_DECISION_AUTHORITY_CLASS_MISMATCH']
      : []),
    ...(governanceDecision?.decision === 'rejected'
      ? ['GOVERNANCE_DECISION_REJECTED']
      : []),
  ]);

  const objectiveEligibility =
    claimClassEligible &&
    lifecycleTargetAllowed &&
    evidenceBlockers.length === 0 &&
    disqualifierBlockers.length === 0;

  const approvedDecisionPresent =
    governanceDecision?.decision === 'approved' &&
    decisionCandidateMatches &&
    decisionTargetMatches &&
    decisionAuthorityClassMatches;

  const gate12Resolution =
    blockers.length > 0
      ? Object.freeze({
          status: 'BLOCKED' as const,
          applicability: 'CONDITIONAL' as const,
          policyRef: policy.policyRef,
          justification:
            'Source-adjudication applicability failed closed; trusted human review remains the alternative authority path.',
        })
      : approvedDecisionPresent
        ? Object.freeze({
            status: 'NOT_APPLICABLE_WITH_JUSTIFICATION' as const,
            applicability: 'CONDITIONAL' as const,
            policyRef: policy.policyRef,
            justification:
              'Exact bounded deterministic correspondence is governed through the approved source-adjudication staging path; no human domain review is claimed or implied.',
          })
        : Object.freeze({
            status: 'PENDING' as const,
            applicability: 'CONDITIONAL' as const,
            policyRef: policy.policyRef,
            justification:
              'Objective source-adjudication evidence is complete, but an exact explicit governance decision is still required.',
          });

  const status =
    blockers.length > 0
      ? ('INELIGIBLE_FOR_SOURCE_ADJUDICATION' as const)
      : approvedDecisionPresent
        ? ('SOURCE_ADJUDICATION_APPLICABILITY_APPROVED' as const)
        : ('ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION' as const);

  const material = Object.freeze({
    policyRef: policy.policyRef,
    candidateRef: input.candidateRef,
    claimClass: input.claimClass,
    intendedLifecycleTarget: input.intendedLifecycleTarget,
    evidence: input.evidence,
    disqualifiers: input.disqualifiers,
    governanceDecisionRef: governanceDecision?.decisionRef,
    objectiveEligibility,
    approvedDecisionPresent,
    gate12Resolution,
    blockers,
    status,
    authorityBoundary: policy.authorityBoundary,
  });

  return Object.freeze({
    evaluationId: deterministicContentHash(material),
    ...material,
  });
}
