import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8AuthorityBridgeReview } from './relationship-spouse-t8-authority-bridge-review.js';

export const RELATIONSHIP_SPOUSE_T8_ENGINE_GOVERNANCE_HANDOFF_VERSION =
  'myeonghwa-relationship-spouse-t8-engine-governance-handoff-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_ENGINE_CAPABILITY_KEY =
  'relationship:natal:spouse' as const;

export type RelationshipSpouseT8EngineIntakeDisposition = 'AUTHORITY_GAP';

const GOVERNANCE_WORKSTREAMS = Object.freeze([
  'RUNTIME_SOURCE_BINDING',
  'SOURCE_TIER_ELIGIBILITY_VERIFICATION',
  'SPOUSE_BOUND_REVIEW_ATTESTATION',
  'TRUST_PINNED_REVIEWER_GRANT',
  'SEPARATE_LIFECYCLE_PROMOTION_REVIEW',
] as const);

const FUTURE_ADMITTED_HANDOFF_REQUIRED_MATERIAL = Object.freeze([
  'CONTENT_ADDRESSED_ADMITTED_AUTHORITY_REF',
  'CONTENT_ADDRESSED_METHODOLOGY_REF',
  'CONTENT_ADDRESSED_RULE_CLAIM_CONTRACT_REF',
  'REQUIRED_INPUTS',
  'ALLOWED_CLAIM_SCOPE',
  'FORBIDDEN_CLAIM_SCOPE',
  'RUNTIME_PREREQUISITES',
  'NEGATIVE_AND_BOUNDARY_CASES',
] as const);

export function buildRelationshipSpouseT8EngineGovernanceHandoff() {
  const upstream = buildRelationshipSpouseT8AuthorityBridgeReview();

  const upstreamAccepted =
    upstream.decision.disposition === 'ENGINE_HANDOFF' &&
    upstream.decision.semanticResearchReopenRequired === false &&
    upstream.decision.engineGovernanceWorkRequired === true &&
    upstream.authorityState.researchSemanticAuthorityClosed === true &&
    upstream.authorityState.researchReturnRequired === false &&
    upstream.authorityState.runtimeProducerAvailable === true &&
    upstream.authorityState.runtimeSourceBindingAuthorityEstablished === false &&
    upstream.authorityState.trustedReviewerAuthorityEstablished === false &&
    upstream.authorityState.engineAuthorityPromotionAuthorized === false &&
    upstream.authorityState.productionAdmissionAuthority === false &&
    upstream.authorityState.production === 'HOLD';

  const authorityGapBlockers = Object.freeze([
    Object.freeze({
      blocker: 'RUNTIME_SOURCE_BINDING_AUTHORITY_NOT_ESTABLISHED' as const,
      closed: upstream.authorityState.runtimeSourceBindingAuthorityEstablished,
    }),
    Object.freeze({
      blocker: 'TRUST_PINNED_REVIEWER_AUTHORITY_NOT_ESTABLISHED' as const,
      closed: upstream.authorityState.trustedReviewerAuthorityEstablished,
    }),
    Object.freeze({
      blocker: 'LIFECYCLE_PROMOTION_NOT_AUTHORIZED' as const,
      closed: upstream.authorityState.lifecyclePromotionAuthorized,
    }),
  ]);

  const allAdmissionBlockersClosed = authorityGapBlockers.every((entry) => entry.closed);

  const engineIntake = Object.freeze({
    capabilityKey: RELATIONSHIP_SPOUSE_T8_ENGINE_CAPABILITY_KEY,
    upstreamDisposition: 'AUTHORITY_GAP' as RelationshipSpouseT8EngineIntakeDisposition,
    expectedG2ARouting: 'HOLD_AUTHORITY' as const,
    admittedAuthorityRefAvailable: false as const,
    admittedMethodologyRefAvailable: false as const,
    admittedRuleClaimContractRefAvailable: false as const,
    engineSemanticImplementationMayProceed: false as const,
    governanceRemediationMayProceed: upstreamAccepted,
    producerRuntimeAlreadyExistsInIsolatedResearchScope:
      upstream.runtimeState.spouseT8ProducerReady,
    implementationEvidenceMustNotOverrideAuthorityGap: true as const,
  });

  const governedClaimBoundary = Object.freeze({
    requiredInputs: Object.freeze(['derivedFacts.dayMaster'] as const),
    canonicalSelectorInput: upstream.governedSemanticBoundary.canonicalSelectorInput,
    allowedClaims: Object.freeze([
      'RESOLVED_YANG_DAY_MASTER_MAY_EMIT_ONLY_THE_GOVERNED_INDIRECT_WEALTH_PYEONJAE_PIANCAI_ROLE_NEUTRAL_SPOUSE_STAR_MARKER',
      'RESOLVED_YIN_DAY_MASTER_MAY_EMIT_ONLY_THE_GOVERNED_INDIRECT_POWER_PYEONGWAN_PIANGUAN_ROLE_NEUTRAL_SPOUSE_STAR_MARKER',
    ] as const),
    forbiddenClaims: Object.freeze([
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
    ] as const),
    runtimePrerequisites: Object.freeze([
      'CANONICAL_SAJU_SNAPSHOT_AVAILABLE',
      'DERIVED_FACTS_DAY_MASTER_RESOLVED',
      'DAY_MASTER_YIN_YANG_RESOLVED_TO_EXACTLY_YANG_OR_YIN',
      'ISOLATED_RESEARCH_RUNTIME_ADMISSION_STATE_REMAINS_VALID',
    ] as const),
    negativeCases: Object.freeze([
      'MISSING_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
      'AMBIGUOUS_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
      'UNAVAILABLE_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
      'PENDING_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
      'NO_T5_SUBTYPE_RECONSTRUCTION',
      'NO_GENERAL_RELATIONSHIP_T8_RELABELLING',
      'NO_SECOND_CHART_COMPATIBILITY_FALLBACK',
    ] as const),
  });

  const governanceHandoff = Object.freeze({
    owner: 'ENGINE_GOVERNANCE' as const,
    handoffClass: 'NON_ADMITTED_AUTHORITY_GAP_REMEDIATION' as const,
    workstreams: GOVERNANCE_WORKSTREAMS,
    futureAdmittedHandoffRequiredMaterial: FUTURE_ADMITTED_HANDOFF_REQUIRED_MATERIAL,
    currentAdmissionBlockersClosed: allAdmissionBlockersClosed,
    futureG2AAdmittedDispositionAuthorized: false as const,
    futureG2AAdmittedDispositionRequiresFreshBridgeAdmission: true as const,
  });

  const nonActivationBoundary = Object.freeze({
    semanticResearchReopenAuthorized: false as const,
    engineP0RuntimeAuthorized: false as const,
    engineP1CompositionAuthorized: false as const,
    engineP2HardeningAuthorized: false as const,
    lifecyclePromotionAuthorized: false as const,
    consumerNarrativeActivationAuthorized: false as const,
    compatibilityConsumerActivationAuthorized: false as const,
    previewDefaultRouteActivationAuthorized: false as const,
    officialReadingAuthorityAuthorized: false as const,
    productionAdmissionAuthorized: false as const,
    production: 'HOLD' as const,
  });

  const material = Object.freeze({
    handoffVersion: RELATIONSHIP_SPOUSE_T8_ENGINE_GOVERNANCE_HANDOFF_VERSION,
    issue: '#1620' as const,
    upstreamBridgeReviewId: upstream.reviewId,
    upstreamAccepted,
    engineIntake,
    governedClaimBoundary,
    authorityGapBlockers,
    governanceHandoff,
    nonActivationBoundary,
    nextDisposition: upstreamAccepted
      ? ('ENGINE_GOVERNANCE_REMEDIATION' as const)
      : ('REESTABLISH_UPSTREAM_BRIDGE_HANDOFF' as const),
  });

  return Object.freeze({
    handoffId: deterministicContentHash(material),
    ...material,
  });
}
