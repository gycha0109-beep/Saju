import { deterministicContentHash, verifyResolvedRegistryContentIntegrity } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceMaterialization,
} from './relationship-spouse-t8-day-branch-palace-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES,
  buildRelationshipSpouseT8DayBranchPalaceSourceManifestCandidate,
} from './relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
} from './relationship-spouse-t8-source-adjudicated-staging-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_BRIDGE_REENTRY_ADMISSION_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-bridge-reentry-admission-review-v1' as const;

function exactArray(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function buildRelationshipSpouseT8DayBranchPalaceBridgeReentryAdmissionReview() {
  const materialization =
    buildRelationshipSpouseT8DayBranchPalaceMaterialization();
  const manifest =
    buildRelationshipSpouseT8DayBranchPalaceSourceManifestCandidate();
  const registryIntegrityErrors = verifyResolvedRegistryContentIntegrity(
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  );

  const candidateRefMaterial = Object.freeze({
    materializationId: materialization.materializationId,
    semanticFamily: materialization.semanticFamily,
    semanticVersion: materialization.semanticVersion,
    registrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .registrySnapshotId,
    packRef: Object.freeze({
      ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
        .packRef,
    }),
  });

  const candidateRef = Object.freeze({
    id: 'relationship-spouse-t8-day-branch-palace-bridge-reentry-candidate',
    version: '2.0.0',
    contentHash: deterministicContentHash(candidateRefMaterial),
  });

  const exactUpstreamMaterialization =
    materialization.candidateMaterialized === true &&
    materialization.bridgeReentryReadyForReview === true &&
    materialization.semanticVersion === '2.0.0' &&
    materialization.nextDisposition ===
      'RUN_SA_5D_BRIDGE_REENTRY_ADMISSION_REVIEW';

  const exactSemanticScope =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE ===
      'relationship.spouse.traditional_spouse_palace_position' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .allowedTaxonomyTiers.length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .allowedTaxonomyTiers[0] === 'T8' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA.root.kind ===
      'object' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA.root
      .additionalProperties === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.taxonomy.tier === 'T8' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.taxonomy.category ===
      'relationship' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.taxonomy.subcategory ===
      'spouse' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.value.position ===
      'day_branch' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.value
      .traditionalRole === 'spouse_palace' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.value.semanticScope ===
      'position_only';

  const exactCanonicalInput =
    exactArray(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.requiredFactTypes,
      ['pillars.day'],
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs.length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs[0]?.source ===
      'canonical_fact' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs[0]
      ?.pathOrClaimType === 'pillars.day' &&
    exactArray(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs[0]
        ?.acceptedStatuses ?? [],
      ['resolved'],
    ) &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs[0]
      ?.ambiguityBehavior === 'requires_resolved' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.condition.op === 'exists' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.condition.value.kind ===
      'input' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.condition.value.key ===
      'relationship_spouse_day_pillar' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.condition.value.path ===
      'branch.value';

  const inputMaterial = JSON.stringify({
    methodologyInputContract:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.inputContract,
    ruleInputs: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs,
    ruleCondition: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.condition,
  });
  const demographicInputIsolation = [
    'sexForTraditionalCalculation',
    'partnerSex',
    'partnerIdentity',
    'sexualOrientation',
    'genderIdentity',
    'relationshipRole',
    'secondChart',
    'compatibility',
  ].every((forbidden) => !inputMaterial.includes(forbidden));

  const exactProvenance =
    manifest.manifestCandidateComplete === true &&
    manifest.semanticVersion === '2.0.0' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality.provenanceQuality ===
      'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES
      .length === 2 &&
    exactArray(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES.map(
        (source) => source.sourceId,
      ),
      [
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_JUNG_RUNTIME_SOURCE_ID,
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SAJU_ATELIER_RUNTIME_SOURCE_ID,
      ],
    ) &&
    exactArray(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS.map(
        (link) => link.supportType,
      ),
      ['direct_basis', 'direct_basis'],
    );

  const registryContractValid =
    registryIntegrityErrors.length === 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.rules.length ===
      1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.methodologies
      .length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.sources
      .length === 2 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
      .reviewAttestations.length === 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.status === 'research';

  const singleNonConflictingClaimContract =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.rules.length ===
      1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .exclusiveValue === true &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE;

  const legacyV110Isolated =
    materialization.checks.legacyV110Preserved === true &&
    materialization.authorityBoundary.legacyV110Mutated === false &&
    materialization.authorityBoundary.semanticSupersessionDeclared === false &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION ===
      '1.1.0' &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.status ===
      'reviewed' &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.every(
      (rule) =>
        rule.status === 'reviewed' &&
        rule.quality.provenanceQuality === 'unknown' &&
        rule.quality.reviewerStatus === 'unreviewed',
    ) &&
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status ===
      'staging';

  const failCloseContractComplete =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .resolvedDayPillarRequired === true &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs[0]
      ?.acceptedStatuses.length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs[0]
      ?.acceptedStatuses[0] === 'resolved' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs[0]
      ?.required === true &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.inputs[0]
      ?.ambiguityBehavior === 'requires_resolved';

  const reviewAuthorityPreserved =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality.reviewerStatus ===
      'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
      .reviewAttestations.length === 0 &&
    materialization.authorityBoundary.reviewAttestationCount === 0 &&
    materialization.authorityBoundary.reviewerTrustGrantEstablished === false;

  const consumerIsolation =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .narrativeConsumerActivated === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .previewDefaultRouteChanged === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .stagingAuthorized === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .officialReadingAuthorityAuthorized === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .productionAuthorityAuthorized === false;

  const forbiddenSemanticExpansionAbsent =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .spouseStarSelectorAuthorized === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .partnerIdentityOrPersonalityInferenceAuthorized === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .marriageTimingOrOutcomeInferenceAuthorized === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .favorableUnfavorablePalaceJudgmentAuthorized === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .yongsinJisinOrGungSeongImportAuthorized === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY
      .secondChartCompatibilityAuthorized === false;

  const checks = Object.freeze({
    exactUpstreamMaterialization,
    exactSemanticScope,
    exactCanonicalInput,
    demographicInputIsolation,
    exactProvenance,
    registryContractValid,
    singleNonConflictingClaimContract,
    legacyV110Isolated,
    failCloseContractComplete,
    reviewAuthorityPreserved,
    consumerIsolation,
    forbiddenSemanticExpansionAbsent,
    registryIntegrityErrors: Object.freeze([...registryIntegrityErrors]),
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([key, value]) => key !== 'registryIntegrityErrors' && value !== true)
      .map(([key]) => `SA5D_${key.replace(/[A-Z]/g, (match) => `_${match}`).toUpperCase()}_FAILED`)
      .concat(
        registryIntegrityErrors.map(
          (error) => `SA5D_REGISTRY_INTEGRITY:${error}`,
        ),
      )
      .sort(),
  );

  const bridgeReentryAdmissionAuthorized = blockers.length === 0;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_BRIDGE_REENTRY_ADMISSION_REVIEW_VERSION,
    issue: '#1857' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    candidateRef,
    upstreamMaterializationId: materialization.materializationId,
    semanticFamily: materialization.semanticFamily,
    semanticVersion: materialization.semanticVersion,
    checks,
    blockers,
    bridgeReentryAdmissionAuthorized,
    authorityBoundary: Object.freeze({
      exactCandidateOnly: true as const,
      bridgeReentryAdmissionAuthorized,
      isolatedResearchExecutionAuthorized: false as const,
      sourceBoundRuntimeMutationAuthorized: false as const,
      legacyV110Mutated: false as const,
      reviewAttestationCreated: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      lifecycleMutationAuthorized: false as const,
      stagingAuthorized: false as const,
      shadowExecutionAuthorized: false as const,
      narrativeConsumerActivated: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: bridgeReentryAdmissionAuthorized
      ? ('BUILD_SA_5E_ISOLATED_RESEARCH_EXECUTION' as const)
      : ('REPAIR_SA_5D_BRIDGE_REENTRY_ADMISSION_BLOCKERS' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}
