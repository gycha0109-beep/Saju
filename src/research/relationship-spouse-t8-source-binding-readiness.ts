import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8EngineGovernanceHandoff } from './relationship-spouse-t8-engine-governance-handoff.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE,
} from './relationship-spouse-t8-lee-youngeun-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_READINESS_VERSION,
  RELATIONSHIP_SPOUSE_T8_RESEARCH_EVIDENCE_SOURCE_IDS,
  buildRelationshipSpouseT8PromotionProvenanceTrustReadiness,
} from './relationship-spouse-t8-promotion-provenance-trust-readiness.js';
import {
  RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE,
} from './relationship-spouse-t8-whisper-2026-day-master-polarity-direct-body-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_SOURCE_BINDING_READINESS_VERSION =
  'myeonghwa-relationship-spouse-t8-source-binding-readiness-v1' as const;

export type RelationshipSpouseT8SourceBindingDisposition =
  | 'SOURCE_BINDING_READY_FOR_SEPARATE_MUTATION'
  | 'SOURCE_BINDING_MANIFEST_INCOMPLETE'
  | 'UPSTREAM_ENGINE_GOVERNANCE_HANDOFF_INVALID';

export const RELATIONSHIP_SPOUSE_T8_SOURCE_BINDING_READINESS_CONTROL_IDS = Object.freeze([
  'RESEARCH_EVIDENCE_IDENTITY_IS_NOT_AUTOMATIC_RUNTIME_SOURCE_REFERENCE_IDENTITY',
  'RESEARCH_CANDIDATE_IDENTITY_IS_NOT_AUTOMATIC_RUNTIME_SOURCE_REFERENCE_IDENTITY',
  'RUNTIME_SOURCE_REFERENCE_REQUIRES_EXPLICIT_SOURCE_TYPE_AND_PROVENANCE_TIER',
  'RUNTIME_SOURCE_REFERENCE_REQUIRES_REPRODUCIBLE_LOCATOR_AND_RIGHTS_METADATA_REVIEW',
  'METHODOLOGY_SOURCE_APPLICABILITY_MUST_BE_EXPLICIT',
  'RULE_SOURCE_SUPPORT_TYPE_MUST_BE_EXPLICIT',
  'WHISPER_DIRECT_BODY_SUPPORTS_THE_EXACT_ROLE_NEUTRAL_SELECTOR_ONLY_WITHIN_ITS_SOURCE_BOUNDED_SCHOOL_DEPENDENT_SCOPE',
  'LEE_YOUNGEUN_2025_SUPPORTS_INDEPENDENT_MODERN_NORMATIVE_PROVENANCE_BUT_NOT_THE_PURE_NATAL_SELECTOR',
  'NO_CROSS_SOURCE_STITCHING_MAY_CREATE_A_MISSING_RUNTIME_BINDING',
  'EMPTY_RUNTIME_SOURCE_REGISTRY_REMAINS_FAIL_CLOSED',
  'EMPTY_RUNTIME_METHODOLOGY_SOURCE_IDS_REMAIN_FAIL_CLOSED',
  'EMPTY_RUNTIME_RULE_SOURCE_REFS_REMAIN_FAIL_CLOSED',
  'SOURCE_TIER_MUST_NOT_BE_INFLATED_FROM_RESEARCH_SOURCE_CLASS',
  'SOURCE_BINDING_MUTATION_REQUIRES_A_SEPARATE_REPOSITORY_AUTHORIZED_MANIFEST',
  'REVIEW_TRUST_AND_LIFECYCLE_PROMOTION_REMAIN_SEPARATE',
  'PRODUCTION_REMAINS_HOLD',
] as const);

export function buildRelationshipSpouseT8SourceBindingReadiness() {
  const handoff = buildRelationshipSpouseT8EngineGovernanceHandoff();
  const promotion = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();
  const whisper =
    RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE;
  const lee =
    RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE;

  const upstreamAccepted =
    handoff.upstreamAccepted === true &&
    handoff.engineIntake.capabilityKey === 'relationship:natal:spouse' &&
    handoff.engineIntake.upstreamDisposition === 'AUTHORITY_GAP' &&
    handoff.engineIntake.expectedG2ARouting === 'HOLD_AUTHORITY' &&
    handoff.engineIntake.governanceRemediationMayProceed === true &&
    handoff.engineIntake.engineSemanticImplementationMayProceed === false &&
    handoff.nonActivationBoundary.production === 'HOLD';

  const currentRuntime = Object.freeze({
    promotionEvidenceVersion:
      RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_READINESS_VERSION,
    researchEvidenceSourceIds: RELATIONSHIP_SPOUSE_T8_RESEARCH_EVIDENCE_SOURCE_IDS,
    methodologySourceIds: promotion.runtimeSourceAuthority.methodologySourceIds,
    ruleSourceIds: promotion.runtimeSourceAuthority.ruleSourceIds,
    registeredSourceIds: promotion.runtimeSourceAuthority.registeredSourceIds,
    sourceTiers: promotion.runtimeSourceAuthority.sourceTiers,
    sourceReferenceRegistered:
      promotion.runtimeSourceAuthority.sourceReferenceRegistered,
    sourceTierAuthorized: promotion.runtimeSourceAuthority.sourceTierAuthorized,
  });

  const researchEvidenceCandidates = Object.freeze([
    Object.freeze({
      researchIdentity: whisper.candidateId,
      sourceClass: whisper.sourceClass,
      publicLocator: whisper.publicUrl,
      directBodyInspected:
        whisper.directBodyAcquisition.completeDirectHtmlBodyAcquired &&
        whisper.directBodySemanticReviewPerformed,
      exactSelectorSupportObserved:
        whisper.directBodyEvidence.dayMasterPolaritySelectorExplicit &&
        whisper.explicitRoleNeutralNatalMappingGapClosedByThisEvidence,
      schoolDependenceCaveatObserved:
        whisper.directBodyEvidence.schoolDependentConventionCaveatObserved,
      pureNatalSelectorSupported: true as const,
      independentNormativeProvenanceRole: false as const,
      runtimeSourceReferenceIdAssigned: false as const,
      runtimeProvenanceTierAssigned: false as const,
      runtimeRightsReuseMetadataReviewed: false as const,
      runtimeMethodologyBindingAssigned: false as const,
      runtimeRuleSupportTypeAssigned: false as const,
    }),
    Object.freeze({
      researchIdentity: lee.candidateId,
      sourceClass: 'kci_listed_scholarly_article_direct_pdf' as const,
      publicLocator: lee.publicPdfAcquisitionUrl,
      directBodyInspected: lee.directPublicPdfObjectInspected,
      exactSelectorSupportObserved: false as const,
      schoolDependenceCaveatObserved: false as const,
      pureNatalSelectorSupported: lee.pureNatalOperationalSelectorFound,
      independentNormativeProvenanceRole: true as const,
      runtimeSourceReferenceIdAssigned: false as const,
      runtimeProvenanceTierAssigned: false as const,
      runtimeRightsReuseMetadataReviewed: false as const,
      runtimeMethodologyBindingAssigned: false as const,
      runtimeRuleSupportTypeAssigned: false as const,
    }),
  ]);

  const blockers = Object.freeze([
    'NO_RUNTIME_SOURCE_REFERENCE_RECORDS',
    'NO_RUNTIME_METHODOLOGY_SOURCE_BINDING',
    'NO_RUNTIME_RULE_SOURCE_BINDING',
    'NO_EXPLICIT_RESEARCH_EVIDENCE_TO_RUNTIME_SOURCE_ID_MAPPING',
    'NO_REPOSITORY_AUTHORIZED_PROVENANCE_TIER_ASSIGNMENT_FOR_THE_EXACT_SELECTOR_SOURCE',
    'NO_RUNTIME_RIGHTS_REUSE_METADATA_REVIEW_FOR_THE_EXACT_SELECTOR_SOURCE',
    'NO_EXPLICIT_RULE_SUPPORT_TYPE_ASSIGNMENT',
    'NO_EXPLICIT_METHODOLOGY_LEVEL_SOURCE_APPLICABILITY_MANIFEST',
  ] as const);

  const sourceBindingManifestComplete =
    currentRuntime.registeredSourceIds.length > 0 &&
    currentRuntime.methodologySourceIds.length > 0 &&
    currentRuntime.ruleSourceIds.length > 0 &&
    currentRuntime.sourceReferenceRegistered &&
    researchEvidenceCandidates.every(
      (candidate) =>
        candidate.runtimeSourceReferenceIdAssigned &&
        candidate.runtimeProvenanceTierAssigned &&
        candidate.runtimeRightsReuseMetadataReviewed,
    );

  const disposition: RelationshipSpouseT8SourceBindingDisposition = !upstreamAccepted
    ? 'UPSTREAM_ENGINE_GOVERNANCE_HANDOFF_INVALID'
    : sourceBindingManifestComplete
      ? 'SOURCE_BINDING_READY_FOR_SEPARATE_MUTATION'
      : 'SOURCE_BINDING_MANIFEST_INCOMPLETE';

  const material = Object.freeze({
    reviewVersion: RELATIONSHIP_SPOUSE_T8_SOURCE_BINDING_READINESS_VERSION,
    issue: '#1627' as const,
    upstreamHandoffId: handoff.handoffId,
    upstreamAccepted,
    capabilityKey: handoff.engineIntake.capabilityKey,
    currentRuntime,
    researchEvidenceCandidates,
    sourceBindingManifestComplete,
    sourceBindingMutationAuthorized:
      disposition === 'SOURCE_BINDING_READY_FOR_SEPARATE_MUTATION',
    disposition,
    blockers: disposition === 'SOURCE_BINDING_MANIFEST_INCOMPLETE'
      ? blockers
      : Object.freeze([]),
    nextAction: disposition === 'SOURCE_BINDING_MANIFEST_INCOMPLETE'
      ? ('DEFINE_REPOSITORY_AUTHORIZED_RUNTIME_SOURCE_MANIFEST_WITH_EXPLICIT_SOURCE_IDS_TIERS_LOCATORS_RIGHTS_METHODOLOGY_APPLICABILITY_AND_RULE_SUPPORT_TYPES' as const)
      : disposition === 'SOURCE_BINDING_READY_FOR_SEPARATE_MUTATION'
        ? ('MATERIALIZE_SOURCE_BINDING_IN_A_SEPARATE_REVIEWED_MUTATION' as const)
        : ('REESTABLISH_ENGINE_GOVERNANCE_HANDOFF' as const),
    authorityBoundary: Object.freeze({
      crossSourceStitchingAuthorized: false as const,
      sourceTierInflationAuthorized: false as const,
      researchEvidenceIdRelabellingAuthorized: false as const,
      reviewTrustFabricationAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      engineSemanticImplementationAuthorized: false as const,
      consumerActivationAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    controlIds: RELATIONSHIP_SPOUSE_T8_SOURCE_BINDING_READINESS_CONTROL_IDS,
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    controlCount: material.controlIds.length,
  });
}
