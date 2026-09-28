import type {
  RuleDefinition,
  RuleQualityMetadata,
  SourceReference,
} from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildSourceAdjudicationPromotionPolicy } from './source-adjudication-promotion-policy.js';
import {
  RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS,
} from './relationship-spouse-t8-promotion-provenance-trust-readiness.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES,
} from './relationship-spouse-t8-runtime-source-manifest.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES,
  buildRelationshipSpouseT8SourceAdjudicatedStagingLineage,
} from './relationship-spouse-t8-source-adjudicated-staging-runtime.js';
import {
  buildRelationshipSpouseT8SourceAdjudicatedShadowStagingEvidence,
} from './relationship-spouse-t8-source-adjudicated-shadow-staging-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_PRODUCTION_ELIGIBILITY_ASSESSMENT_VERSION =
  'myeonghwa-relationship-spouse-t8-production-eligibility-assessment-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_QUALITIES = Object.freeze([
  'primary_supported',
  'multi_source_supported',
] as const);

export const RELATIONSHIP_SPOUSE_T8_PRODUCTION_TEST_COVERAGE = Object.freeze([
  'fixture_matrix',
  'regression_suite',
] as const);

export const RELATIONSHIP_SPOUSE_T8_PRODUCTION_REVIEWER_STATUS =
  'domain_reviewed' as const;

function refsEqual(
  left: { readonly id: string; readonly version: string; readonly contentHash: string },
  right: { readonly id: string; readonly version: string; readonly contentHash: string },
): boolean {
  return (
    left.id === right.id &&
    left.version === right.version &&
    left.contentHash === right.contentHash
  );
}

function sourceById(sourceId: string): SourceReference | undefined {
  return RELATIONSHIP_SPOUSE_T8_RUNTIME_SOURCE_MANIFEST_SOURCES.find(
    (source) => source.sourceId === sourceId,
  );
}

function exactSelectorDirectBasisSourceIds(): readonly string[] {
  return Object.freeze(
    [
      ...new Set(
        RELATIONSHIP_SPOUSE_T8_RUNTIME_RULE_SOURCE_BINDINGS.flatMap((binding) =>
          binding.sourceRefs
            .filter((sourceRef) => sourceRef.supportType === 'direct_basis')
            .map((sourceRef) => sourceRef.sourceId),
        ),
      ),
    ].sort(),
  );
}

export function evaluateRelationshipSpouseT8ProductionProvenanceDeclaration(
  provenanceQuality: RuleQualityMetadata['provenanceQuality'],
) {
  const directBasisSourceIds = exactSelectorDirectBasisSourceIds();
  const directBasisSources = directBasisSourceIds
    .map(sourceById)
    .filter((source): source is SourceReference => source !== undefined);
  const primaryDirectBasisEstablished = directBasisSources.some(
    (source) => source.provenanceTier === 'primary',
  );
  const multiSourceSelectorSupportEstablished =
    directBasisSourceIds.length >= 2;

  const declarationSupported =
    provenanceQuality === 'primary_supported'
      ? primaryDirectBasisEstablished
      : provenanceQuality === 'multi_source_supported'
        ? multiSourceSelectorSupportEstablished
        : false;

  return Object.freeze({
    provenanceQuality,
    directBasisSourceIds,
    directBasisSourceTiers: Object.freeze(
      directBasisSources.map((source) => source.provenanceTier).sort(),
    ),
    primaryDirectBasisEstablished,
    multiSourceSelectorSupportEstablished,
    declarationSupported,
  });
}

export function evaluateRelationshipSpouseT8ProductionReviewerDeclaration(
  reviewerStatus: RuleQualityMetadata['reviewerStatus'],
  domainAttestationCoverageEstablished: boolean,
  reviewerTrustGrantEstablished: boolean,
) {
  const reviewerStatusEstablished =
    reviewerStatus === RELATIONSHIP_SPOUSE_T8_PRODUCTION_REVIEWER_STATUS;
  const trustedDomainReviewAuthorityEstablished =
    reviewerStatusEstablished &&
    domainAttestationCoverageEstablished &&
    reviewerTrustGrantEstablished;

  return Object.freeze({
    reviewerStatus,
    reviewerStatusEstablished,
    domainAttestationCoverageEstablished,
    reviewerTrustGrantEstablished,
    trustedDomainReviewAuthorityEstablished,
  });
}

function sourceTierAuthorizedForProduction(sourceId: string): boolean {
  const source = sourceById(sourceId);
  return (
    source !== undefined &&
    (RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS as readonly string[]).includes(
      source.provenanceTier,
    )
  );
}

function exactDomainAttestationCoverageEstablished(): boolean {
  const registry =
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY;

  const exactSubjects = [
    ...registry.snapshot.methodologies.map((subjectRef) => ({
      subjectType: 'methodology' as const,
      subjectRef,
    })),
    ...registry.snapshot.rules.map((subjectRef) => ({
      subjectType: 'rule' as const,
      subjectRef,
    })),
  ];

  return exactSubjects.length > 0 && exactSubjects.every((subject) =>
    registry.reviewAttestations.some(
      (attestation) =>
        attestation.subjectType === subject.subjectType &&
        attestation.reviewLevel === 'domain' &&
        attestation.decision === 'approved' &&
        refsEqual(attestation.subjectRef, subject.subjectRef),
    ),
  );
}

function ruleProductionObservation(rule: RuleDefinition) {
  const provenance =
    evaluateRelationshipSpouseT8ProductionProvenanceDeclaration(
      rule.quality.provenanceQuality,
    );
  const referencedSourceIds = Object.freeze(
    [...new Set(rule.sourceRefs.map((sourceRef) => sourceRef.sourceId))].sort(),
  );
  const sourceTierAuthorized =
    referencedSourceIds.length > 0 &&
    referencedSourceIds.every(sourceTierAuthorizedForProduction);
  const testCoverageReady = (
    RELATIONSHIP_SPOUSE_T8_PRODUCTION_TEST_COVERAGE as readonly string[]
  ).includes(rule.quality.testCoverage);

  return Object.freeze({
    ruleId: rule.ruleId,
    ruleVersion: rule.version,
    lifecycle: rule.status,
    quality: Object.freeze({ ...rule.quality }),
    referencedSourceIds,
    sourceTierAuthorized,
    testCoverageReady,
    provenance,
  });
}

export function buildRelationshipSpouseT8ProductionEligibilityAssessment() {
  const shadow =
    buildRelationshipSpouseT8SourceAdjudicatedShadowStagingEvidence();
  const stagingLineage =
    buildRelationshipSpouseT8SourceAdjudicatedStagingLineage();
  const sourceAdjudicationPolicy = buildSourceAdjudicationPromotionPolicy();

  const ruleObservations = Object.freeze(
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
      ruleProductionObservation,
    ),
  );

  const methodologySourceIds = Object.freeze(
    [...RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.sourceIds].sort(),
  );
  const methodologySourceTierAuthorized =
    methodologySourceIds.length > 0 &&
    methodologySourceIds.every(sourceTierAuthorizedForProduction);

  const exactLineageBound =
    shadow.requiredShadowStagingEvidenceComplete === true &&
    shadow.gate14Resolution.status === 'SATISFIED' &&
    shadow.evidenceId.length === 64 &&
    stagingLineage.stagingRegistrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
        .registrySnapshotId &&
    refsEqual(
      stagingLineage.stagingPackRef,
      RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
        .packRef,
    ) &&
    refsEqual(
      stagingLineage.sourceAdjudicationExecutionAuthorityRef,
      shadow.lineage.executionAuthorityRef,
    );

  const gate14Satisfied =
    shadow.requiredShadowStagingEvidenceComplete === true &&
    shadow.gate14Resolution.status === 'SATISFIED';

  const testCoverageReady =
    ruleObservations.length > 0 &&
    ruleObservations.every((rule) => rule.testCoverageReady);

  const sourceTierReady =
    methodologySourceTierAuthorized &&
    ruleObservations.every((rule) => rule.sourceTierAuthorized);

  const directSelectorEvidence =
    evaluateRelationshipSpouseT8ProductionProvenanceDeclaration('unknown');
  const primaryDirectBasisEstablished =
    directSelectorEvidence.primaryDirectBasisEstablished;
  const multiSourceSelectorSupportEstablished =
    directSelectorEvidence.multiSourceSelectorSupportEstablished;

  const declaredProductionProvenanceQualityReady =
    ruleObservations.length > 0 &&
    ruleObservations.every(
      (rule) =>
        (
          RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_QUALITIES as readonly string[]
        ).includes(rule.quality.provenanceQuality) &&
        rule.provenance.declarationSupported,
    );

  const domainAttestationCoverageEstablished =
    exactDomainAttestationCoverageEstablished();

  const domainReviewerStatusEstablished =
    ruleObservations.length > 0 &&
    ruleObservations.every(
      (rule) =>
        rule.quality.reviewerStatus ===
        RELATIONSHIP_SPOUSE_T8_PRODUCTION_REVIEWER_STATUS,
    );

  // The exact current staging lineage is source-adjudication governed and
  // explicitly records no ReviewerTrustGrant. Generic reviewer-trust helpers
  // or test fixtures are not capability-bound authority.
  const reviewerTrustGrantEstablished =
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_BOUNDARY
      .reviewerTrustGrantEstablished ||
    shadow.authorityBoundary.reviewerTrustGrantEstablished;

  const trustedDomainReviewAuthorityEstablished =
    domainReviewerStatusEstablished &&
    domainAttestationCoverageEstablished &&
    reviewerTrustGrantEstablished;

  const sourceAdjudicationProductionAllowed =
    sourceAdjudicationPolicy.authorityBoundary
      .sourceAdjudicationV1MayTargetProduction;

  const provenancePathReady =
    declaredProductionProvenanceQualityReady &&
    (primaryDirectBasisEstablished ||
      multiSourceSelectorSupportEstablished);

  const productionPromotionReady =
    gate14Satisfied &&
    exactLineageBound &&
    testCoverageReady &&
    sourceTierReady &&
    provenancePathReady &&
    trustedDomainReviewAuthorityEstablished;

  const blockers = Object.freeze([
    ...(!gate14Satisfied
      ? ['GATE14_SHADOW_STAGING_EVIDENCE_NOT_COMPLETE']
      : []),
    ...(!exactLineageBound ? ['EXACT_STAGING_LINEAGE_NOT_BOUND'] : []),
    ...(!testCoverageReady ? ['PRODUCTION_TEST_COVERAGE_NOT_ESTABLISHED'] : []),
    ...(!sourceTierReady ? ['PRODUCTION_SOURCE_TIER_NOT_AUTHORIZED'] : []),
    ...(!declaredProductionProvenanceQualityReady
      ? ['PRODUCTION_RULE_PROVENANCE_QUALITY_NOT_ESTABLISHED']
      : []),
    ...(!primaryDirectBasisEstablished
      ? ['PRIMARY_DIRECT_BASIS_NOT_ESTABLISHED']
      : []),
    ...(!multiSourceSelectorSupportEstablished
      ? ['MULTI_SOURCE_SELECTOR_SUPPORT_NOT_ESTABLISHED']
      : []),
    ...(!domainReviewerStatusEstablished
      ? ['DOMAIN_REVIEW_STATUS_NOT_ESTABLISHED']
      : []),
    ...(!domainAttestationCoverageEstablished
      ? ['TRUST_PINNED_DOMAIN_REVIEW_ATTESTATIONS_NOT_ESTABLISHED']
      : []),
    ...(!reviewerTrustGrantEstablished
      ? ['REVIEWER_TRUST_GRANT_NOT_ESTABLISHED']
      : []),
  ]);

  const material = Object.freeze({
    assessmentVersion:
      RELATIONSHIP_SPOUSE_T8_PRODUCTION_ELIGIBILITY_ASSESSMENT_VERSION,
    issue: '#1824' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    lineage: Object.freeze({
      shadowEvidenceId: shadow.evidenceId,
      stagingRegistrySnapshotId:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
          .registrySnapshotId,
      stagingPackRef: Object.freeze({
        ...RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_REGISTRY.snapshot
          .packRef,
      }),
      sourceAdjudicationAuthorityRef: Object.freeze({
        ...stagingLineage.sourceAdjudicationExecutionAuthorityRef,
      }),
    }),
    productionContract: Object.freeze({
      methodologyLifecycleRequired: 'active' as const,
      ruleLifecycleRequired: 'active' as const,
      packLifecycleRequired: 'production' as const,
      allowedProvenanceQuality:
        RELATIONSHIP_SPOUSE_T8_PRODUCTION_PROVENANCE_QUALITIES,
      allowedTestCoverage: RELATIONSHIP_SPOUSE_T8_PRODUCTION_TEST_COVERAGE,
      requiredReviewerStatus:
        RELATIONSHIP_SPOUSE_T8_PRODUCTION_REVIEWER_STATUS,
      allowedSourceTiers: RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS,
      trustPinnedDomainReviewRequired: true as const,
      sourceAdjudicationV1MayTargetProduction:
        sourceAdjudicationProductionAllowed,
      trustedReviewRequiredForProduction: true as const,
    }),
    currentLifecycle: Object.freeze({
      methodology:
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_METHODOLOGY.status,
      rules: Object.freeze(
        RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RULES.map(
          (rule) => rule.status,
        ),
      ),
      pack: RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_PACK.status,
      productionLifecycleMaterialized: false as const,
    }),
    observations: Object.freeze({
      gate14Satisfied,
      exactLineageBound,
      testCoverageReady,
      sourceTierReady,
      methodologySourceTierAuthorized,
      directSelectorSourceIds: directSelectorEvidence.directBasisSourceIds,
      directSelectorSourceTiers:
        directSelectorEvidence.directBasisSourceTiers,
      primaryDirectBasisEstablished,
      multiSourceSelectorSupportEstablished,
      declaredProductionProvenanceQualityReady,
      provenancePathReady,
      domainReviewerStatusEstablished,
      domainAttestationCoverageEstablished,
      reviewerTrustGrantEstablished,
      trustedDomainReviewAuthorityEstablished,
      sourceAdjudicationProductionAllowed,
    }),
    ruleObservations,
    blockers,
    routeConstraints: Object.freeze([
      'SOURCE_ADJUDICATION_V1_NOT_AUTHORIZED_FOR_PRODUCTION',
      'PRODUCTION_REQUIRES_TRUSTED_REVIEW_AUTHORITY',
    ] as const),
    productionCandidateResearchReady:
      gate14Satisfied &&
      exactLineageBound &&
      testCoverageReady &&
      sourceTierReady &&
      provenancePathReady,
    productionExecutionAuthorityReady:
      trustedDomainReviewAuthorityEstablished,
    productionPromotionReady,
    productionEligibility: productionPromotionReady
      ? ('ELIGIBLE_FOR_PRODUCTION_PROMOTION' as const)
      : ('BLOCKED' as const),
    authorityBoundary: Object.freeze({
      humanDomainReviewEstablished: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      productionLifecycleMutationAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: !provenancePathReady
      ? ('OBTAIN_PRODUCTION_GRADE_DIRECT_SELECTOR_PROVENANCE' as const)
      : !trustedDomainReviewAuthorityEstablished
        ? ('MATERIALIZE_EXACT_PRODUCTION_CANDIDATE_FOR_EXTERNAL_DOMAIN_REVIEW' as const)
        : ('ASSESS_SEPARATE_PRODUCTION_LIFECYCLE_MUTATION' as const),
  });

  return Object.freeze({
    assessmentId: deterministicContentHash(material),
    ...material,
  });
}
