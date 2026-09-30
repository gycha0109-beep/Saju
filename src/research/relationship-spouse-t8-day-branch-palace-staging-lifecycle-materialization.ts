import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import {
  createRuleRegistrySnapshot,
  deterministicContentHash,
  verifyResolvedRegistryContentIntegrity,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution,
} from './relationship-spouse-t8-day-branch-palace-isolated-research-execution.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES,
} from './relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision,
} from './relationship-spouse-t8-day-branch-palace-staging-governance-decision.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_LIFECYCLE_MATERIALIZATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK_ID =
  'relationship-spouse-t8-day-branch-palace-source-adjudicated-staging' as const;

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

function contentAddressedRef(
  id: string,
  version: string,
  material: unknown,
): ContentAddressedVersionedRef {
  return Object.freeze({
    id,
    version,
    contentHash: deterministicContentHash(material),
  });
}

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY =
  Object.freeze({
    ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY,
    status: 'reviewed',
  } as const satisfies MethodologyDefinition);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE =
  Object.freeze({
    ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE,
    status: 'reviewed',
  } as const satisfies RuleDefinition);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK =
  Object.freeze({
    ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
    packId: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK_ID,
    name: 'Relationship Spouse T8 Day-Branch spouse-palace 2.0 source-adjudicated staging',
    status: 'staging',
  } as const satisfies InterpretationPack);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY =
  createRuleRegistrySnapshot(
    {
      rules: [RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE],
      methodologies: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY,
      ],
      sources:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES,
      claimTypeDefinitions: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK,
  );

export function buildRelationshipSpouseT8DayBranchPalaceStagingRegistryRef():
  ContentAddressedVersionedRef {
  const material = Object.freeze({
    registrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    packRef:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
  });

  return contentAddressedRef(
    'relationship-spouse-t8-day-branch-palace-source-adjudicated-staging-registry',
    '2.0.0',
    material,
  );
}

export interface RelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterializationInput {
  readonly governanceDecision: ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision
  >;
}

export function evaluateRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization(
  input: RelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterializationInput,
) {
  const currentGovernance =
    buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision();
  const currentResearchExecution =
    buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution();
  const governanceDecision = input.governanceDecision;

  const {
    decisionId: declaredGovernanceDecisionId,
    ...governanceDecisionMaterial
  } = governanceDecision;

  const governanceDecisionIntegrityValid =
    deterministicContentHash(governanceDecisionMaterial) ===
    declaredGovernanceDecisionId;

  const exactGovernanceDecisionBinding =
    governanceDecisionIntegrityValid &&
    governanceDecision.decisionId === currentGovernance.decisionId &&
    governanceDecision.decisionRef !== undefined &&
    currentGovernance.decisionRef !== undefined &&
    refsEqual(governanceDecision.decisionRef, currentGovernance.decisionRef);

  const governanceAuthorityValid =
    governanceDecision.sourceAdjudicationAuthorityEstablished === true &&
    governanceDecision.postDecisionPolicyEvaluation.status ===
      'SOURCE_ADJUDICATION_APPLICABILITY_APPROVED' &&
    governanceDecision.postDecisionPolicyEvaluation.approvedDecisionPresent ===
      true &&
    governanceDecision.gate12Resolution.status ===
      'NOT_APPLICABLE_WITH_JUSTIFICATION' &&
    governanceDecision.postDecisionPolicyEvaluation.blockers.length === 0 &&
    governanceDecision.authorityBoundary.allowedLifecycleTarget === 'staging' &&
    governanceDecision.nextDisposition ===
      'BUILD_SA_5H_SOURCE_ADJUDICATED_STAGING_LIFECYCLE_MATERIALIZATION';

  const exactResearchExecutionBinding =
    governanceDecision.decisionMaterial.upstreamExecutionId ===
      currentResearchExecution.executionId &&
    refsEqual(
      governanceDecision.decisionMaterial.upstreamExecutionAuthorityRef,
      currentResearchExecution.executionAuthority.authorityRef,
    ) &&
    currentResearchExecution.authorizedRegistrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .registrySnapshotId &&
    refsEqual(
      currentResearchExecution.authorizedPackRef,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .packRef,
    );

  const researchRegistryIntegrityErrors =
    verifyResolvedRegistryContentIntegrity(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
    );
  const stagingRegistryIntegrityErrors =
    verifyResolvedRegistryContentIntegrity(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
    );

  const {
    status: researchMethodologyStatus,
    ...researchMethodologyStable
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY;
  const {
    status: stagingMethodologyStatus,
    ...stagingMethodologyStable
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY;

  const methodologyNonLifecycleParity =
    deterministicContentHash(researchMethodologyStable) ===
    deterministicContentHash(stagingMethodologyStable);

  const {
    status: researchRuleStatus,
    ...researchRuleStable
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE;
  const {
    status: stagingRuleStatus,
    ...stagingRuleStable
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE;

  const ruleNonLifecycleParity =
    deterministicContentHash(researchRuleStable) ===
    deterministicContentHash(stagingRuleStable);

  const {
    packId: researchPackId,
    name: researchPackName,
    status: researchPackStatus,
    ...researchPackStable
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK;
  const {
    packId: stagingPackId,
    name: stagingPackName,
    status: stagingPackStatus,
    ...stagingPackStable
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK;

  const packNonLifecycleParity =
    deterministicContentHash(researchPackStable) ===
    deterministicContentHash(stagingPackStable);

  const lifecycleMutationExact =
    researchMethodologyStatus === 'research' &&
    stagingMethodologyStatus === 'reviewed' &&
    researchRuleStatus === 'research' &&
    stagingRuleStatus === 'reviewed' &&
    researchPackStatus === 'research' &&
    stagingPackStatus === 'staging' &&
    researchPackId ===
      'relationship-spouse-t8-day-branch-palace-research-candidate' &&
    stagingPackId ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK_ID &&
    researchPackName !== stagingPackName;

  const exactSourceManifestPreserved =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.sources.length ===
      2 &&
    deterministicContentHash(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.sources,
    ) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.sources,
      ) &&
    deterministicContentHash(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.sourceRefs,
    ) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.sourceRefs,
      );

  const exactClaimContractPreserved =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .claimTypeDefinitions.length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .claimValueSchemas.length === 1 &&
    deterministicContentHash(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
        .claimTypeDefinitions,
    ) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
          .claimTypeDefinitions,
      ) &&
    deterministicContentHash(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
        .claimValueSchemas,
    ) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
          .claimValueSchemas,
      );

  const exactQualityAuthorityPreserved =
    deterministicContentHash(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality,
    ) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality,
      ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .provenanceQuality === 'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .reviewAttestations.length === 0;

  const exactPositionOnlySemanticPreserved =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.claimType ===
      'relationship.spouse.traditional_spouse_palace_position' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .position === 'day_branch' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .traditionalRole === 'spouse_palace' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .semanticScope === 'position_only' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false;

  const researchCandidatePreserved =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.status ===
      'research' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.status === 'research' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.status === 'research' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
      .reviewAttestations.length === 0 &&
    researchRegistryIntegrityErrors.length === 0;

  const stagingRegistryIntegrityVerified =
    stagingRegistryIntegrityErrors.length === 0;

  const noExecutionAuthorityCreated =
    governanceDecision.authorityBoundary.stagingRuntimeActivationAuthorized ===
      false &&
    governanceDecision.authorityBoundary.shadowExecutionAuthorized === false &&
    governanceDecision.authorityBoundary.narrativeConsumerActivated === false &&
    governanceDecision.authorityBoundary.previewAuthorityAuthorized === false &&
    governanceDecision.authorityBoundary
      .officialReadingAuthorityAuthorized === false &&
    governanceDecision.authorityBoundary.productionAuthorityAuthorized ===
      false &&
    governanceDecision.authorityBoundary.production === 'HOLD';

  const checks = Object.freeze({
    governanceDecisionIntegrityValid,
    exactGovernanceDecisionBinding,
    governanceAuthorityValid,
    exactResearchExecutionBinding,
    methodologyNonLifecycleParity,
    ruleNonLifecycleParity,
    packNonLifecycleParity,
    lifecycleMutationExact,
    exactSourceManifestPreserved,
    exactClaimContractPreserved,
    exactQualityAuthorityPreserved,
    exactPositionOnlySemanticPreserved,
    researchCandidatePreserved,
    stagingRegistryIntegrityVerified,
    noExecutionAuthorityCreated,
    researchRegistryIntegrityErrors: Object.freeze([
      ...researchRegistryIntegrityErrors,
    ]),
    stagingRegistryIntegrityErrors: Object.freeze([
      ...stagingRegistryIntegrityErrors,
    ]),
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(
        ([key, value]) =>
          key !== 'researchRegistryIntegrityErrors' &&
          key !== 'stagingRegistryIntegrityErrors' &&
          value !== true,
      )
      .map(
        ([key]) =>
          `SA5H_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .concat(
        researchRegistryIntegrityErrors.map(
          (error) => `SA5H_RESEARCH_REGISTRY_INTEGRITY:${error}`,
        ),
        stagingRegistryIntegrityErrors.map(
          (error) => `SA5H_STAGING_REGISTRY_INTEGRITY:${error}`,
        ),
      )
      .sort(),
  );

  const stagingRegistryRef =
    buildRelationshipSpouseT8DayBranchPalaceStagingRegistryRef();

  const stagingLifecycleMaterializationEstablished = blockers.length === 0;

  const material = Object.freeze({
    materializationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_LIFECYCLE_MATERIALIZATION_VERSION,
    issue: '#1901' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    governanceDecisionId: governanceDecision.decisionId,
    governanceDecisionRef: governanceDecision.decisionRef,
    candidateRef: governanceDecision.decisionMaterial.candidateRef,
    policyRef: governanceDecision.decisionMaterial.policyRef,
    upstreamExecutionId: governanceDecision.decisionMaterial.upstreamExecutionId,
    upstreamExecutionAuthorityRef:
      governanceDecision.decisionMaterial.upstreamExecutionAuthorityRef,
    researchRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .registrySnapshotId,
    researchPackRef:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .packRef,
    stagingRegistryRef,
    stagingRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    stagingPackRef:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .packRef,
    checks,
    blockers,
    stagingLifecycleMaterializationEstablished,
    authorityBoundary: Object.freeze({
      exactCandidateOnly: true as const,
      sourceAdjudicationAuthorityEstablished:
        stagingLifecycleMaterializationEstablished,
      stagingLifecycleMaterialized:
        stagingLifecycleMaterializationEstablished,
      stagingRegistryMaterialized:
        stagingLifecycleMaterializationEstablished,
      stagingLifecycleMutationApplied:
        stagingLifecycleMaterializationEstablished,
      humanDomainReviewEstablished: false as const,
      reviewAttestationCreated: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      stagingExecutionAuthorityCreated: false as const,
      stagingExecutionAuthorized: false as const,
      shadowExecutionAuthorized: false as const,
      narrativeConsumerActivated: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: stagingLifecycleMaterializationEstablished
      ? ('RUN_SA_5I_ISOLATED_SHADOW_STAGING_EXECUTION_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5H_STAGING_LIFECYCLE_MATERIALIZATION' as const),
  });

  const materializationRef = stagingLifecycleMaterializationEstablished
    ? contentAddressedRef(
        'relationship-spouse-t8-day-branch-palace-source-adjudicated-staging-lifecycle-materialization',
        '1.0.0',
        material,
      )
    : undefined;

  const resultMaterial = Object.freeze({
    material,
    materializationRef,
  });

  return Object.freeze({
    materializationId: deterministicContentHash(resultMaterial),
    ...material,
    materializationRef,
  });
}

export function buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization() {
  return evaluateRelationshipSpouseT8DayBranchPalaceStagingLifecycleMaterialization({
    governanceDecision:
      buildRelationshipSpouseT8DayBranchPalaceStagingGovernanceDecision(),
  });
}
