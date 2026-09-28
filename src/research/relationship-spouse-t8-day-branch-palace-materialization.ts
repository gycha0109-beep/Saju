import {
  deterministicContentHash,
  verifyResolvedRegistryContentIntegrity,
} from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProvenancePolicy,
} from './relationship-spouse-t8-day-branch-palace-provenance-policy.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProvenanceSurvey,
} from './relationship-spouse-t8-day-branch-palace-provenance-survey.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceSourceManifestCandidate,
} from './relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';
import {
  buildRelationshipSpouseT8SelectorRedesignAssessment,
} from './relationship-spouse-t8-selector-redesign-assessment.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
} from './relationship-spouse-t8-source-adjudicated-staging-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALIZATION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-materialization-v1' as const;

export function buildRelationshipSpouseT8DayBranchPalaceMaterialization() {
  const redesign = buildRelationshipSpouseT8SelectorRedesignAssessment();
  const policy = buildRelationshipSpouseT8DayBranchPalaceProvenancePolicy();
  const survey = buildRelationshipSpouseT8DayBranchPalaceProvenanceSurvey();
  const manifest =
    buildRelationshipSpouseT8DayBranchPalaceSourceManifestCandidate();

  const registryIntegrityErrors =
    verifyResolvedRegistryContentIntegrity(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
    );

  const upstreamLineageAccepted =
    redesign.observations.selectedRedesignTarget ===
      'ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION' &&
    redesign.decision.nextDisposition ===
      'RUN_SA_5B_DAY_BRANCH_SPOUSE_PALACE_PROVENANCE_ACQUISITION' &&
    policy.semanticSuccessorFamily ===
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' &&
    survey.policyId === policy.policyId &&
    survey.provenanceRoute === 'MULTI_SOURCE_SUPPORTED' &&
    survey.researchProductionProvenanceCandidateReady === true &&
    survey.proposedFutureQuality === 'multi_source_supported' &&
    survey.proposedSemanticSuccessorVersion === '2.0.0';

  const claimContractExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION ===
      '2.0.0' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA.root.kind ===
      'object' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.family ===
      'domain_synthesis' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.status ===
      'research' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.status === 'research' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality
      .provenanceQuality === 'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality.reviewerStatus ===
      'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.status === 'research' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.claimContractMode ===
      'registered_required';

  const sourceManifestExact =
    manifest.manifestCandidateComplete &&
    manifest.semanticVersion === '2.0.0' &&
    manifest.sources.length === 2 &&
    manifest.directBasisSourceLinks.length === 2;

  const registryIntegrityVerified =
    registryIntegrityErrors.length === 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
      .reviewAttestations.length === 0 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.rules
      .length === 1 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.sources
      .length === 2;

  const legacyV110Preserved =
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

  const candidateMaterialized =
    upstreamLineageAccepted &&
    claimContractExact &&
    sourceManifestExact &&
    registryIntegrityVerified &&
    legacyV110Preserved;

  const material = Object.freeze({
    materializationVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALIZATION_VERSION,
    issue: '#1849' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_VERSION,
    lineage: Object.freeze({
      redesignAssessmentId: redesign.assessmentId,
      provenancePolicyId: policy.policyId,
      provenanceSurveyId: survey.surveyId,
      sourceManifestCandidateId: manifest.manifestId,
      registrySnapshotId:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
          .registrySnapshotId,
      packRef: Object.freeze({
        ...RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE.snapshot
          .packRef,
      }),
    }),
    checks: Object.freeze({
      upstreamLineageAccepted,
      claimContractExact,
      sourceManifestExact,
      registryIntegrityVerified,
      legacyV110Preserved,
      registryIntegrityErrors: Object.freeze([...registryIntegrityErrors]),
    }),
    candidate: Object.freeze({
      claimType:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
          .claimType,
      claimSchemaRef: Object.freeze({
        id: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA
          .schemaId,
        version:
          RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_VALUE_SCHEMA
            .version,
      }),
      methodologyRef: Object.freeze({
        id: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY
          .methodologyId,
        version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.version,
      }),
      ruleRef: Object.freeze({
        id: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.ruleId,
        version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.version,
      }),
      packRef: Object.freeze({
        id: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.packId,
        version: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.version,
      }),
      provenanceQuality:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality
          .provenanceQuality,
      reviewerStatus:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality.reviewerStatus,
      lifecycle: Object.freeze({
        methodology: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.status,
        rule: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.status,
        pack: RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.status,
      }),
    }),
    semanticBoundary:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_CONTRACT_BOUNDARY,
    candidateMaterialized,
    bridgeReentryReadyForReview: candidateMaterialized,
    authorityBoundary: Object.freeze({
      legacyV110Mutated: false as const,
      semanticSupersessionDeclared: false as const,
      bridgeAdmissionAuthorized: false as const,
      stagingAuthorized: false as const,
      reviewAttestationCount: 0 as const,
      reviewerTrustGrantEstablished: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: candidateMaterialized
      ? ('RUN_SA_5D_BRIDGE_REENTRY_ADMISSION_REVIEW' as const)
      : ('REPAIR_SA_5C_VERSIONED_MATERIALIZATION' as const),
  });

  return Object.freeze({
    materializationId: deterministicContentHash(material),
    ...material,
  });
}
