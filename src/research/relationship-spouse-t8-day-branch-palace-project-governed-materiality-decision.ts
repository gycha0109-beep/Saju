import {
  deterministicContentHash,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview,
} from './relationship-spouse-t8-day-branch-palace-narrative-delivery-authority-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_GOVERNED_MATERIALITY_DECISION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-project-governed-materiality-decision-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALITY_APPROVAL =
  'APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY_BY_PROJECT_GOVERNANCE' as const;

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

function exactCurrentSa5kReview(
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

  return (
    deterministicContentHash(material) === declaredReviewId &&
    review.authorityReviewCompleted === true &&
    review.decision === 'HOLD_NARRATIVE_AND_DELIVERY_AUTHORITY' &&
    review.narrativeEligibilityEstablished === false &&
    review.deliveryAuthorityEstablished === false &&
    review.nextDisposition ===
      'RUN_SA_5L_PROJECT_GOVERNED_POSITION_ONLY_NARRATIVE_MATERIALITY_DECISION'
  );
}

export async function buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision() {
  const sa5k =
    await buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview();

  const exactSa5kBinding = exactCurrentSa5kReview(sa5k);

  const exactPositionOnlySemantic =
    sa5k.semanticFamily ===
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' &&
    sa5k.semanticVersion === '2.0.0' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.claimType ===
      'relationship.spouse.traditional_spouse_palace_position' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .position === 'day_branch' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .traditionalRole === 'spouse_palace' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .semanticScope === 'position_only';

  const evidenceAndQualityBoundaryExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.sources.length ===
      2 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .provenanceQuality === 'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .testCoverage === 'fixture_matrix' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .methodologyStability === 'stable_within_method';

  const currentPreMaterialityStateExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false;

  const checks = Object.freeze({
    exactSa5kBinding,
    exactPositionOnlySemantic,
    evidenceAndQualityBoundaryExact,
    currentPreMaterialityStateExact,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5L_PROJECT_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const projectGovernedMaterialityDecisionEstablished = blockers.length === 0;

  const material = Object.freeze({
    decisionVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_GOVERNED_MATERIALITY_DECISION_VERSION,
    issue: '#1945' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamSa5kReviewId: sa5k.reviewId,
    stagingRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    stagingPackRef: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .packRef,
    }),
    governanceMode: 'PROJECT_INTERNAL_GOVERNANCE' as const,
    decision:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALITY_APPROVAL,
    allowedNarrativeProposition: Object.freeze({
      position: 'day_branch' as const,
      traditionalRole: 'spouse_palace' as const,
      semanticScope: 'position_only' as const,
    }),
    prohibitedExtensions:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS,
    targetMutationForNextGate: Object.freeze({
      materialForNarrative: true as const,
      reviewerStatus: 'internal_reviewed' as const,
      preserveProvenanceQuality: 'multi_source_supported' as const,
      preserveMethodologyLifecycle: 'reviewed' as const,
      preserveRuleLifecycle: 'reviewed' as const,
      preservePackLifecycle: 'staging' as const,
    }),
    checks,
    blockers,
    projectGovernedMaterialityDecisionEstablished,
    authorityBoundary: Object.freeze({
      projectGovernedMaterialityDecisionEstablished,
      materialForNarrativeMutationApplied: false as const,
      reviewerStatusPromotionApplied: false as const,
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
    nextDisposition: projectGovernedMaterialityDecisionEstablished
      ? ('RUN_SA_5M_PROJECT_GOVERNED_NARRATIVE_MATERIALIZATION' as const)
      : ('HOLD_AND_REPAIR_SA_5L_PROJECT_GOVERNED_MATERIALITY_DECISION' as const),
  });

  return Object.freeze({
    decisionId: deterministicContentHash(material),
    ...material,
  });
}
