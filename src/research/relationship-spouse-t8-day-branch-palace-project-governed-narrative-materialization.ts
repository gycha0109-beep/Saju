import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type {
  ClaimTypeDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
  type InterpretationRunOptions,
} from '../interpretation/interpretation-engine.js';
import {
  buildSourceAdjudicationExecutionAuthorityRef,
  validateSourceAdjudicationExecutionAuthority,
  type SourceAdjudicationExecutionAuthority,
  type SourceAdjudicationExecutionAuthorityMaterial,
} from '../interpretation/promotion-authority.js';
import {
  createRuleRegistrySnapshot,
  deterministicContentHash,
  verifyResolvedRegistryContentIntegrity,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALITY_APPROVAL,
} from './relationship-spouse-t8-day-branch-palace-project-governed-materiality-decision.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_REVIEWER_STATUS,
} from './relationship-spouse-t8-day-branch-palace-narrative-authority-contract.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
  buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_GOVERNED_NARRATIVE_MATERIALIZATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIAL_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
    materialForNarrative: true,
  } as const satisfies ClaimTypeDefinition);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_INTERNAL_REVIEWED_RULE =
  Object.freeze({
    ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
    quality: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality,
      reviewerStatus:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_REVIEWER_STATUS,
    }),
  } as const satisfies RuleDefinition);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY =
  createRuleRegistrySnapshot(
    {
      rules: [RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_INTERNAL_REVIEWED_RULE],
      methodologies: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY,
      ],
      sources: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.sources,
      claimTypeDefinitions: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIAL_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK,
  );

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

function decisionIntegrityValid(
  decision: Awaited<
    ReturnType<
      typeof buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision
    >
  >,
): boolean {
  const { decisionId: declaredDecisionId, ...material } = decision;
  return deterministicContentHash(material) === declaredDecisionId;
}

export async function buildRelationshipSpouseT8DayBranchPalaceProjectGovernedNarrativeMaterialization() {
  const decision =
    await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision();

  const upstreamDecisionExact =
    decisionIntegrityValid(decision) &&
    decision.projectGovernedMaterialityDecisionEstablished === true &&
    decision.governanceMode === 'PROJECT_INTERNAL_GOVERNANCE' &&
    decision.decision ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALITY_APPROVAL &&
    decision.semanticScope === 'position_only' &&
    decision.blockers.length === 0 &&
    decision.targetMutationForNextGate.materialForNarrative === true &&
    decision.targetMutationForNextGate.reviewerStatus === 'internal_reviewed' &&
    decision.nextDisposition ===
      'RUN_SA_5M_PROJECT_GOVERNED_NARRATIVE_MATERIALIZATION';

  const existingStagingStateExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.status ===
      'reviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .provenanceQuality === 'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK.status === 'staging' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .reviewAttestations.length === 0;

  const {
    quality: stagingQuality,
    ...stagingRuleWithoutQuality
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE;
  const {
    quality: materializedQuality,
    ...materializedRuleWithoutQuality
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_INTERNAL_REVIEWED_RULE;
  const {
    reviewerStatus: _stagingReviewerStatus,
    ...stagingQualityWithoutReviewer
  } = stagingQuality;
  const {
    reviewerStatus: _materializedReviewerStatus,
    ...materializedQualityWithoutReviewer
  } = materializedQuality;
  void _stagingReviewerStatus;
  void _materializedReviewerStatus;

  const ruleMutationExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_INTERNAL_REVIEWED_RULE.quality
      .reviewerStatus ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_REVIEWER_STATUS &&
    deterministicContentHash(stagingRuleWithoutQuality) ===
      deterministicContentHash(materializedRuleWithoutQuality) &&
    deterministicContentHash(stagingQualityWithoutReviewer) ===
      deterministicContentHash(materializedQualityWithoutReviewer);

  const {
    materialForNarrative: _stagingMaterialForNarrative,
    ...stagingClaimTypeWithoutMateriality
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION;
  const {
    materialForNarrative: _materializedMaterialForNarrative,
    ...materializedClaimTypeWithoutMateriality
  } =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIAL_CLAIM_TYPE_DEFINITION;
  void _stagingMaterialForNarrative;
  void _materializedMaterialForNarrative;

  const claimTypeMutationExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIAL_CLAIM_TYPE_DEFINITION
      .materialForNarrative === true &&
    deterministicContentHash(stagingClaimTypeWithoutMateriality) ===
      deterministicContentHash(materializedClaimTypeWithoutMateriality);

  const registryIntegrityErrors =
    verifyResolvedRegistryContentIntegrity(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    );

  const exactRegistryPreservation =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
      .methodologies.length === 1 &&
    deterministicContentHash(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .methodologies,
    ) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.methodologies,
      ) &&
    deterministicContentHash(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .sources,
    ) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.sources,
      ) &&
    deterministicContentHash(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .claimValueSchemas,
    ) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
          .claimValueSchemas,
      ) &&
    deterministicContentHash(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .pack,
    ) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.pack,
      ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
      .reviewAttestations.length === 0 &&
    registryIntegrityErrors.length === 0;

  const semanticBoundaryExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_INTERNAL_REVIEWED_RULE.output
      .claimType ===
      'relationship.spouse.traditional_spouse_palace_position' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_INTERNAL_REVIEWED_RULE.output.value
      .position === 'day_branch' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_INTERNAL_REVIEWED_RULE.output.value
      .traditionalRole === 'spouse_palace' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_INTERNAL_REVIEWED_RULE.output.value
      .semanticScope === 'position_only';

  const distinctRegistryIdentity =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
      .snapshot.registrySnapshotId !==
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId &&
    refsEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .snapshot.packRef,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
    );

  const checks = Object.freeze({
    upstreamDecisionExact,
    existingStagingStateExact,
    ruleMutationExact,
    claimTypeMutationExact,
    exactRegistryPreservation,
    semanticBoundaryExact,
    distinctRegistryIdentity,
    registryIntegrityErrors: Object.freeze([...registryIntegrityErrors]),
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(
        ([key, value]) =>
          key !== 'registryIntegrityErrors' && value !== true,
      )
      .map(
        ([key]) =>
          `SA5M_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .concat(
        registryIntegrityErrors.map(
          (error) => `SA5M_REGISTRY_INTEGRITY:${error}`,
        ),
      )
      .sort(),
  );

  const narrativeMaterializationEstablished = blockers.length === 0;

  const material = Object.freeze({
    materializationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_GOVERNED_NARRATIVE_MATERIALIZATION_VERSION,
    issue: '#1959' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamDecisionId: decision.decisionId,
    upstreamStagingRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    narrativeMaterializedRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .snapshot.registrySnapshotId,
    stagingPackRef: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .packRef,
    }),
    materializedPackRef: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .snapshot.packRef,
    }),
    appliedMutations: Object.freeze([
      Object.freeze({
        target: 'rule.quality.reviewerStatus' as const,
        from: 'unreviewed' as const,
        to: 'internal_reviewed' as const,
      }),
      Object.freeze({
        target: 'claimType.materialForNarrative' as const,
        from: false as const,
        to: true as const,
      }),
    ]),
    checks,
    blockers,
    narrativeMaterializationEstablished,
    authorityBoundary: Object.freeze({
      projectGovernedMaterialityDecisionEstablished:
        upstreamDecisionExact,
      internalReviewStatusMaterialized:
        narrativeMaterializationEstablished,
      positionOnlyNarrativeMaterialityMaterialized:
        narrativeMaterializationEstablished,
      externalHumanDomainReviewRequired: false as const,
      reviewAttestationRequired: false as const,
      reviewerTrustContextRequired: false as const,
      reviewerTrustGrantRequired: false as const,
      claimNarrativeProfileCreated: false as const,
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
    nextDisposition: narrativeMaterializationEstablished
      ? ('RUN_SA_5N_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE_MATERIALIZATION' as const)
      : ('HOLD_AND_REPAIR_SA_5M_PROJECT_GOVERNED_NARRATIVE_MATERIALIZATION' as const),
  });

  return Object.freeze({
    materializationId: deterministicContentHash(material),
    ...material,
  });
}


const NARRATIVE_MATERIALIZED_SHADOW_EXECUTION_AUTHORITY_ID =
  'relationship-spouse-t8-day-branch-palace-narrative-materialized-shadow-execution-authority' as const;
const NARRATIVE_MATERIALIZED_SHADOW_EXECUTION_AUTHORITY_VERSION =
  '1.0.0' as const;

export async function buildRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecutionAuthority():
  Promise<SourceAdjudicationExecutionAuthority> {
  const materialization =
    await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedNarrativeMaterialization();
  const stagingMaterialization =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization();

  if (
    materialization.narrativeMaterializationEstablished !== true ||
    materialization.nextDisposition !==
      'RUN_SA_5N_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE_MATERIALIZATION'
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch narrative-materialized shadow execution requires the exact established SA-5M materialization.',
    );
  }

  if (
    stagingMaterialization.stagingLifecycleMaterializationEstablished !== true ||
    stagingMaterialization.policyRef === undefined ||
    stagingMaterialization.candidateRef === undefined ||
    stagingMaterialization.governanceDecisionRef === undefined
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch narrative-materialized shadow execution requires the exact established SA-5H source-adjudication lineage.',
    );
  }

  const material = Object.freeze({
    authorityClass: 'source_adjudication',
    lifecycleTarget: 'staging',
    capabilityKey: 'relationship:natal:spouse',
    policyRef: Object.freeze({ ...stagingMaterialization.policyRef }),
    candidateRef: Object.freeze({ ...stagingMaterialization.candidateRef }),
    decisionRef: Object.freeze({
      ...stagingMaterialization.governanceDecisionRef,
    }),
    authorizedRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .snapshot.registrySnapshotId,
    authorizedPackRef: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY
        .snapshot.packRef,
    }),
    sourceAdjudicationAuthorityEstablished: true,
    productionAuthorityAuthorized: false,
  } as const satisfies SourceAdjudicationExecutionAuthorityMaterial);

  const authority = Object.freeze({
    authorityRef: buildSourceAdjudicationExecutionAuthorityRef(
      NARRATIVE_MATERIALIZED_SHADOW_EXECUTION_AUTHORITY_ID,
      NARRATIVE_MATERIALIZED_SHADOW_EXECUTION_AUTHORITY_VERSION,
      material,
    ),
    material,
  });

  const validation = validateSourceAdjudicationExecutionAuthority(
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    authority,
  );
  if (!validation.valid) {
    throw new Error(
      `Relationship Spouse T8 Day-Branch narrative-materialized shadow execution authority invalid: ${validation.blockers.join(', ')}`,
    );
  }

  return authority;
}

export type RelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowRunOptions =
  Omit<
    InterpretationRunOptions,
    'promotionAuthorityContext' | 'reviewerTrustContext'
  >;

export async function runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
  snapshot: CanonicalSajuSnapshot,
  options: RelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowRunOptions = {},
): Promise<InterpretationExecutionResult> {
  if (
    'promotionAuthorityContext' in options ||
    'reviewerTrustContext' in options
  ) {
    throw new Error(
      'Relationship Spouse T8 Day-Branch narrative-materialized shadow execution owns its exact source-adjudication authority; callers may not inject promotion or reviewer-trust authority.',
    );
  }

  const authority =
    await buildRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecutionAuthority();

  return runInterpretation(
    snapshot,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
    {
      ...options,
      promotionAuthorityContext: {
        mode: 'source_adjudication',
        sourceAdjudicationAuthority: authority,
      },
    },
  );
}
