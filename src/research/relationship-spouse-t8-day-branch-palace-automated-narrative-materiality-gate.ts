import {
  deterministicContentHash,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview,
} from './relationship-spouse-t8-day-branch-palace-narrative-delivery-authority-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_AUTOMATED_NARRATIVE_MATERIALITY_GATE_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-automated-narrative-materiality-gate-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_AUTOMATED_MATERIALITY_APPROVAL =
  'APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS =
  Object.freeze([
    'spouse_star_selection',
    'partner_personality',
    'partner_identity',
    'marriage_timing',
    'marriage_outcome',
    'relationship_outcome',
    'favorable_unfavorable_palace_judgment',
    'yongshin_jisin_semantics',
    'second_chart_compatibility',
    'sex_scoped_spouse_role_expansion',
  ] as const);

function currentAuthorityReviewIntegrityValid(
  review: Awaited<
    ReturnType<
      typeof buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview
    >
  >,
): boolean {
  const {
    reviewId: declaredReviewId,
    governedExecution: _governedExecution,
    delivery: _delivery,
    ...material
  } = review;
  void _governedExecution;
  void _delivery;
  return deterministicContentHash(material) === declaredReviewId;
}

export async function buildRelationshipSpouseT8DayBranchPalaceAutomatedNarrativeMaterialityGate() {
  const authorityReview =
    await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();

  const exactUpstreamReview =
    currentAuthorityReviewIntegrityValid(authorityReview) &&
    authorityReview.authorityReviewCompleted === true &&
    authorityReview.decision === 'HOLD_NARRATIVE_AND_DELIVERY_AUTHORITY' &&
    authorityReview.narrativeEligibilityEstablished === false &&
    authorityReview.deliveryAuthorityEstablished === false &&
    authorityReview.nextDisposition ===
      'RUN_SA_5L_DETERMINISTIC_POSITION_ONLY_NARRATIVE_MATERIALITY_GATE';

  const exactRegistryShape =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
      .methodologies.length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.rules
      .length === 1;

  const exactPositionOnlySemantic =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .position === 'day_branch' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .traditionalRole === 'spouse_palace' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .semanticScope === 'position_only';

  const exactClaimContractBoundary =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION.scope ===
      'natal' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .exclusiveValue === true;

  const sourceGroundingReady =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .provenanceQuality === 'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.sourceRefs.length >= 2;

  const governedEvidenceReady =
    authorityReview.checks.evidenceSelectionAdmissionValid === true &&
    authorityReview.authorityBoundary
      .governedEvidenceSelectionAuthorityPreserved === true &&
    authorityReview.authorityBoundary.exactCandidateOnly === true;

  const noBroaderConsumerAuthority =
    authorityReview.authorityBoundary.previewAuthorityAuthorized === false &&
    authorityReview.authorityBoundary.officialReadingAuthorityAuthorized ===
      false &&
    authorityReview.authorityBoundary.publicSemanticAuthorityAuthorized ===
      false &&
    authorityReview.authorityBoundary.productionAuthorityAuthorized === false &&
    authorityReview.authorityBoundary.production === 'HOLD';

  const checks = Object.freeze({
    exactUpstreamReview,
    exactRegistryShape,
    exactPositionOnlySemantic,
    exactClaimContractBoundary,
    sourceGroundingReady,
    governedEvidenceReady,
    noBroaderConsumerAuthority,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5L_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const automatedMaterialityApproved = blockers.length === 0;

  const material = Object.freeze({
    gateVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_AUTOMATED_NARRATIVE_MATERIALITY_GATE_VERSION,
    issue: '#1925' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    claimType: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    semanticScope: 'position_only' as const,
    upstreamAuthorityReviewId: authorityReview.reviewId,
    governedEvidenceHash: authorityReview.governedEvidenceHash,
    stagingRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    allowedNarrativeProposition: Object.freeze({
      position: 'day_branch' as const,
      traditionalRole: 'spouse_palace' as const,
      semanticScope: 'position_only' as const,
    }),
    prohibitedExtensions:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS,
    reviewPolicy: Object.freeze({
      externalExpertReviewRequired: false as const,
      humanDomainReviewRequired: false as const,
      reviewAttestationRequired: false as const,
      reviewerIdentityRequired: false as const,
      reviewerTrustGrantRequired: false as const,
    }),
    checks,
    blockers,
    automatedMaterialityApproved,
    decision: automatedMaterialityApproved
      ? (RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_AUTOMATED_MATERIALITY_APPROVAL)
      : ('HOLD_AND_REPAIR_SA_5L_AUTOMATED_MATERIALITY_GATE' as const),
    authorityBoundary: Object.freeze({
      exactCandidateOnly: exactPositionOnlySemantic && governedEvidenceReady,
      narrativeMaterialityAuthorized: automatedMaterialityApproved,
      materialForNarrativeMutationAuthorized: automatedMaterialityApproved,
      narrativeProfileAuthorityEstablished: false as const,
      narrativeGenerationAuthorized: false as const,
      artifactAssemblyAuthorized: false as const,
      deliveryAuthorityAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: automatedMaterialityApproved
      ? ('RUN_SA_5M_POSITION_ONLY_NARRATIVE_MATERIALIZATION' as const)
      : ('HOLD_AND_REPAIR_SA_5L_AUTOMATED_MATERIALITY_GATE' as const),
  });

  return Object.freeze({
    gateId: deterministicContentHash(material),
    ...material,
  });
}
