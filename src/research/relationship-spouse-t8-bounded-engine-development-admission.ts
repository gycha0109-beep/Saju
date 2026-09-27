import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8AiAssistedInternalReview } from './relationship-spouse-t8-ai-assisted-internal-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
} from './relationship-spouse-t8-source-bound-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_ADMISSION_VERSION =
  'myeonghwa-relationship-spouse-t8-bounded-engine-development-admission-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_RULE_CLAIM_CONTRACT_VERSION =
  'myeonghwa-relationship-spouse-t8-bounded-engine-rule-claim-contract-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_ADMISSION_ID =
  'RELATIONSHIP-SPOUSE-T8-BOUNDED-ENGINE-DEVELOPMENT-ADMISSION' as const;

export const RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_RULE_CLAIM_CONTRACT_ID =
  'RELATIONSHIP-SPOUSE-T8-BOUNDED-ENGINE-RULE-CLAIM-CONTRACT' as const;

export const RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_CAPABILITY_KEY =
  'relationship:natal:spouse' as const;

function cloneRef(ref: ContentAddressedVersionedRef): ContentAddressedVersionedRef {
  return Object.freeze({ ...ref });
}

function requireSingleRef(
  refs: readonly ContentAddressedVersionedRef[],
  label: string,
): ContentAddressedVersionedRef {
  if (refs.length !== 1 || refs[0] === undefined) {
    throw new Error(`Spouse T8 bounded Engine admission requires exactly one ${label} ref.`);
  }
  return cloneRef(refs[0]);
}

export function buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission() {
  const review = buildRelationshipSpouseT8AiAssistedInternalReview();
  const registry = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY;

  const methodologyRef = requireSingleRef(registry.snapshot.methodologies, 'methodology');
  const claimTypeRef = requireSingleRef(
    registry.snapshot.claimTypeDefinitions ?? [],
    'claim type',
  );
  const claimValueSchemaRef = requireSingleRef(
    registry.snapshot.claimValueSchemas ?? [],
    'claim value schema',
  );
  const ruleRefs = Object.freeze(registry.snapshot.rules.map(cloneRef));

  const requiredInputs = Object.freeze(['derivedFacts.dayMaster'] as const);
  const allowedClaims = Object.freeze([
    'RESOLVED_YANG_DAY_MASTER_MAY_EMIT_ONLY_THE_GOVERNED_INDIRECT_WEALTH_PYEONJAE_PIANCAI_ROLE_NEUTRAL_SPOUSE_STAR_MARKER',
    'RESOLVED_YIN_DAY_MASTER_MAY_EMIT_ONLY_THE_GOVERNED_INDIRECT_POWER_PYEONGWAN_PIANGUAN_ROLE_NEUTRAL_SPOUSE_STAR_MARKER',
  ] as const);
  const forbiddenClaims = Object.freeze([
    'NATIVE_SEX_INFERENCE',
    'PARTNER_SEX_INFERENCE',
    'PARTNER_IDENTITY_INFERENCE',
    'SEXUAL_ORIENTATION_INFERENCE',
    'GENDER_IDENTITY_INFERENCE',
    'MARRIAGE_EXISTENCE_OR_GUARANTEE',
    'FERTILITY_INFERENCE',
    'RELATIONSHIP_LEGALITY_OR_ETHICS_INFERENCE',
    'COMPATIBILITY_SCORING',
    'SECOND_CHART_INFERENCE',
    'RELATIONSHIP_OUTCOME_PREDICTION',
    'ANNUAL_OR_MONTHLY_SPOUSE_AUTHORITY_EXPANSION',
    'GENERAL_RELATIONSHIP_AUTHORITY_RELABELLED_AS_SPOUSE_T8_AUTHORITY',
  ] as const);
  const runtimePrerequisites = Object.freeze([
    'CANONICAL_SAJU_SNAPSHOT_AVAILABLE',
    'DERIVED_FACTS_DAY_MASTER_RESOLVED',
    'DAY_MASTER_YIN_YANG_RESOLVED_TO_EXACTLY_YANG_OR_YIN',
    'SOURCE_BOUND_RUNTIME_VERSION_1_0_1_REMAINS_EXACT',
    'AI_ASSISTED_INTERNAL_REVIEW_REMAINS_EXACTLY_BOUND_TO_CURRENT_THREE_SUBJECTS',
  ] as const);
  const negativeCases = Object.freeze([
    'MISSING_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
    'AMBIGUOUS_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
    'UNAVAILABLE_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
    'PENDING_DAY_MASTER_EMITS_NO_SPOUSE_T8_CLAIM',
    'NO_T5_SUBTYPE_RECONSTRUCTION',
    'NO_GENERAL_RELATIONSHIP_T8_RELABELLING',
    'NO_SECOND_CHART_COMPATIBILITY_FALLBACK',
    'NO_ANNUAL_OR_MONTHLY_AUTO_EXPANSION',
  ] as const);

  const ruleClaimContract = Object.freeze({
    contractId: RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_RULE_CLAIM_CONTRACT_ID,
    version: RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_RULE_CLAIM_CONTRACT_VERSION,
    capabilityKey: RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_CAPABILITY_KEY,
    runtimeVersion: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
    registrySnapshotId: registry.snapshot.registrySnapshotId,
    packRef: cloneRef(registry.snapshot.packRef),
    methodologyRef,
    ruleRefs,
    claimTypeRef,
    claimValueSchemaRef,
    requiredInputs,
    allowedClaims,
    forbiddenClaims,
    runtimePrerequisites,
    negativeCases,
    semanticBoundary: Object.freeze({
      sourceBoundMethodOnly: true as const,
      schoolDependencePreserved: true as const,
      roleNeutralSpouseStarMarkerOnly: true as const,
      newSajuSemanticsAuthorized: false as const,
      annualExpansionAuthorized: false as const,
      monthlyExpansionAuthorized: false as const,
      compatibilityExpansionAuthorized: false as const,
      secondChartAccessAuthorized: false as const,
    }),
  });

  const ruleClaimContractRef = Object.freeze({
    id: RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_RULE_CLAIM_CONTRACT_ID,
    version: RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_RULE_CLAIM_CONTRACT_VERSION,
    contentHash: deterministicContentHash(ruleClaimContract),
  } satisfies ContentAddressedVersionedRef);

  const prerequisites = Object.freeze({
    capabilityExact:
      review.capabilityKey === RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_CAPABILITY_KEY,
    runtimeVersionExact:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION === '1.0.1',
    runtimeSourceBound:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY.sourceBindingMaterialized === true,
    runtimeStillResearchOnly:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY.runtimeScope ===
      'isolated_research_only',
    exactCurrentReviewBinding: review.exactCurrentSubjectBinding === true,
    aiAssistedInternalReviewEstablished:
      review.authority.aiAssistedInternalReviewEstablished === true,
    exactlyThreeInternalApprovals:
      review.reviewedSubjectCount === 3 &&
      review.attestations.every(
        (attestation) =>
          attestation.reviewLevel === 'internal' &&
          attestation.decision === 'approved',
      ),
    sourceRoleBoundaryPreserved:
      review.sourceReview.sourceRoleBoundaryPreserved === true &&
      review.sourceReview.leeUsedAsRuleDirectBasis === false,
    noHumanDomainReviewClaim:
      review.authority.independentHumanDomainReviewEstablished === false &&
      review.authority.domainReviewAuthorityEstablished === false,
    noTrustGrant:
      review.authority.actualReviewerTrustGrantCount === 0 &&
      review.authority.trustedDomainAttestationEstablished === false,
    productionStillHeld:
      review.authority.productionAdmissionAuthority === false &&
      review.authority.production === 'HOLD' &&
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY.productionState === 'HOLD',
  });

  const admissionAuthorized = Object.values(prerequisites).every(Boolean);

  const admissionMaterial = Object.freeze({
    admissionId: RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_ADMISSION_ID,
    version: RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_ADMISSION_VERSION,
    issue: '#1774' as const,
    capabilityKey: RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_CAPABILITY_KEY,
    disposition:
      admissionAuthorized
        ? ('BOUNDED_ENGINE_DEVELOPMENT_ADMITTED' as const)
        : ('BOUNDED_ENGINE_DEVELOPMENT_HOLD' as const),
    sourceBoundRuntimeVersion: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_VERSION,
    sourceBoundRegistrySnapshotId: registry.snapshot.registrySnapshotId,
    sourceBoundPackRef: cloneRef(registry.snapshot.packRef),
    aiAssistedInternalReviewId: review.reviewId,
    aiAssistedInternalReviewSubjectManifestHash: review.subjectManifestHash,
    methodologyRef,
    ruleClaimContractRef,
    prerequisites,
    engineDevelopmentAuthorization: Object.freeze({
      producerRuntimeDevelopmentAuthorized: admissionAuthorized,
      compositionDevelopmentAuthorized: admissionAuthorized,
      deterministicGuardDevelopmentAuthorized: admissionAuthorized,
      engineE2EDevelopmentAuthorized: admissionAuthorized,
      existingProducerRuntimeMayBeReused: admissionAuthorized,
      semanticExpansionAuthorized: false as const,
    }),
    publicAndProductionBoundary: Object.freeze({
      independentHumanDomainReviewStillRequired: true as const,
      trustedDomainAttestationStillRequired: true as const,
      reviewerTrustGrantStillRequired: true as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      previewActivationAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    g2aBoundary: Object.freeze({
      currentG2ARoutingMutationAuthorizedInThisArtifact: false as const,
      currentG2ARoutingMustRemain: 'HOLD_AUTHORITY' as const,
      separateG2AHandoffRequired: true as const,
      separateG2AHandoffMayConsumeAdmissionRef: admissionAuthorized,
      separateG2AHandoffMayConsumeMethodologyRef: admissionAuthorized,
      separateG2AHandoffMayConsumeRuleClaimContractRef: admissionAuthorized,
    }),
    driftPolicy: Object.freeze({
      runtimeVersionChangeRequiresFreshReviewAndAdmission: true as const,
      methodologyHashChangeRequiresFreshReviewAndAdmission: true as const,
      ruleHashChangeRequiresFreshReviewAndAdmission: true as const,
      sourceRoleChangeRequiresFreshReviewAndAdmission: true as const,
      aiReviewDecisionOrSubjectChangeRequiresFreshReviewAndAdmission: true as const,
    }),
  });

  const admissionRef = Object.freeze({
    id: RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_ADMISSION_ID,
    version: RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_ADMISSION_VERSION,
    contentHash: deterministicContentHash(admissionMaterial),
  } satisfies ContentAddressedVersionedRef);

  return Object.freeze({
    ...admissionMaterial,
    admissionAuthorized,
    admissionRef,
    ruleClaimContract,
  });
}
