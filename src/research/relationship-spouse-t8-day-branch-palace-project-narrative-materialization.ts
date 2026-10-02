import type {
  ClaimTypeDefinition,
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
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS,
} from './relationship-spouse-t8-day-branch-palace-project-governed-materiality-decision.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_NARRATIVE_MATERIALIZATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-project-narrative-materialization-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE =
  Object.freeze({
    ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
    quality: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality,
      reviewerStatus: 'internal_reviewed',
    }),
  } as const satisfies RuleDefinition);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
    materialForNarrative: true,
  } as const satisfies ClaimTypeDefinition);

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY =
  createRuleRegistrySnapshot(
    {
      rules: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE,
      ],
      methodologies: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY,
      ],
      sources:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.sources,
      claimTypeDefinitions: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK,
  );

function exactDecisionIntegrity(
  decision: Awaited<
    ReturnType<
      typeof buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision
    >
  >,
): boolean {
  const { decisionId, ...material } = decision;
  return deterministicContentHash(material) === decisionId;
}

export async function buildRelationshipSpouseT8DayBranchPalaceProjectNarrativeMaterialization() {
  const decision =
    await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision();

  const decisionIntegrityValid = exactDecisionIntegrity(decision);

  const exactDecisionBinding =
    decisionIntegrityValid &&
    decision.projectGovernedMaterialityDecisionEstablished === true &&
    decision.blockers.length === 0 &&
    decision.governanceMode === 'PROJECT_INTERNAL_GOVERNANCE' &&
    decision.decision ===
      'APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY_BY_PROJECT_GOVERNANCE' &&
    decision.nextDisposition ===
      'RUN_SA_5M_PROJECT_GOVERNED_NARRATIVE_MATERIALIZATION';

  const exactTargetMutation =
    decision.targetMutationForNextGate.materialForNarrative === true &&
    decision.targetMutationForNextGate.reviewerStatus ===
      'internal_reviewed' &&
    decision.targetMutationForNextGate.preserveProvenanceQuality ===
      'multi_source_supported' &&
    decision.targetMutationForNextGate.preserveMethodologyLifecycle ===
      'reviewed' &&
    decision.targetMutationForNextGate.preserveRuleLifecycle === 'reviewed' &&
    decision.targetMutationForNextGate.preservePackLifecycle === 'staging';

  const stagingPreStateExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .reviewAttestations.length === 0;

  const {
    quality: stagingQuality,
    ...stagingRuleWithoutQuality
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE;
  const {
    quality: materializedQuality,
    ...materializedRuleWithoutQuality
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE;

  const exactRuleMutationOnly =
    deterministicContentHash(stagingRuleWithoutQuality) ===
      deterministicContentHash(materializedRuleWithoutQuality) &&
    stagingQuality.reviewerStatus === 'unreviewed' &&
    materializedQuality.reviewerStatus === 'internal_reviewed' &&
    stagingQuality.provenanceQuality ===
      materializedQuality.provenanceQuality &&
    stagingQuality.testCoverage === materializedQuality.testCoverage &&
    stagingQuality.methodologyStability ===
      materializedQuality.methodologyStability;

  const {
    materialForNarrative: stagingMaterialForNarrative,
    ...stagingClaimDefinitionStable
  } = RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION;
  const {
    materialForNarrative: materializedMaterialForNarrative,
    ...materializedClaimDefinitionStable
  } =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_CLAIM_TYPE_DEFINITION;

  const exactClaimMaterialityMutationOnly =
    deterministicContentHash(stagingClaimDefinitionStable) ===
      deterministicContentHash(materializedClaimDefinitionStable) &&
    stagingMaterialForNarrative === false &&
    materializedMaterialForNarrative === true;

  const semanticBoundaryExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.output
      .claimType ===
      'relationship.spouse.traditional_spouse_palace_position' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.output
      .value.position === 'day_branch' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.output
      .value.traditionalRole === 'spouse_palace' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.output
      .value.semanticScope === 'position_only' &&
    decision.prohibitedExtensions.length ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS.length &&
    deterministicContentHash(decision.prohibitedExtensions) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS,
      );

  const lifecycleAndQualityPreserved =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_METHODOLOGY.status ===
      'reviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.status ===
      'reviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_PACK.status ===
      'staging' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.quality
      .provenanceQuality === 'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.quality
      .testCoverage === 'fixture_matrix' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_RULE.quality
      .methodologyStability === 'stable_within_method';

  const registryIntegrityErrors =
    verifyResolvedRegistryContentIntegrity(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY,
    );

  const materializedRegistryExact =
    registryIntegrityErrors.length === 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY
      .rules.length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY
      .claimTypeDefinitions.length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY
      .sources.length === 2 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY
      .reviewAttestations.length === 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY
      .snapshot.registrySnapshotId !==
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId;

  const checks = Object.freeze({
    decisionIntegrityValid,
    exactDecisionBinding,
    exactTargetMutation,
    stagingPreStateExact,
    exactRuleMutationOnly,
    exactClaimMaterialityMutationOnly,
    semanticBoundaryExact,
    lifecycleAndQualityPreserved,
    materializedRegistryExact,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5M_PROJECT_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const narrativeMaterialityMaterialized = blockers.length === 0;

  const material = Object.freeze({
    materializationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_NARRATIVE_MATERIALIZATION_VERSION,
    issue: '#1955' as const,
    track: 'saju-bridge' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    semanticScope: 'position_only' as const,
    upstreamDecisionId: decision.decisionId,
    sourceRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    materializedRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY
        .snapshot.registrySnapshotId,
    packRef:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROJECT_MATERIALIZED_REGISTRY
        .snapshot.packRef,
    appliedMutations: Object.freeze({
      reviewerStatus: Object.freeze({
        before: 'unreviewed' as const,
        after: 'internal_reviewed' as const,
      }),
      materialForNarrative: Object.freeze({
        before: false as const,
        after: true as const,
      }),
    }),
    preserved: Object.freeze({
      provenanceQuality: 'multi_source_supported' as const,
      testCoverage: 'fixture_matrix' as const,
      methodologyStability: 'stable_within_method' as const,
      methodologyLifecycle: 'reviewed' as const,
      ruleLifecycle: 'reviewed' as const,
      packLifecycle: 'staging' as const,
      sourceCount: 2 as const,
      reviewAttestationCount: 0 as const,
    }),
    allowedNarrativeProposition: decision.allowedNarrativeProposition,
    prohibitedExtensions: decision.prohibitedExtensions,
    checks,
    blockers,
    registryIntegrityErrors: Object.freeze([...registryIntegrityErrors]),
    narrativeMaterialityMaterialized,
    authorityBoundary: Object.freeze({
      projectGovernedMaterialityDecisionEstablished:
        decision.projectGovernedMaterialityDecisionEstablished,
      internalReviewStatusMaterialized:
        narrativeMaterialityMaterialized,
      narrativeMaterialityMaterialized,
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
    nextDisposition: narrativeMaterialityMaterialized
      ? ('RUN_SA_5N_POSITION_ONLY_NARRATIVE_PROFILE_MATERIALIZATION' as const)
      : ('HOLD_AND_REPAIR_SA_5M_PROJECT_GOVERNED_NARRATIVE_MATERIALIZATION' as const),
  });

  return Object.freeze({
    materializationId: deterministicContentHash(material),
    ...material,
  });
}
