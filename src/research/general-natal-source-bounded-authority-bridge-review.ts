import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY,
  GENERAL_NATAL_SOURCE_BOUNDED_PACK,
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  createGeneralNatalSourceBoundedRegistry,
} from './general-natal-conclusion-source-bounded-candidate.js';
import { buildGeneralNatalConclusionT8ScanBackedSourceQualification } from './general-natal-conclusion-t8-scan-backed-source-qualification.js';
import { buildGeneralNatalPeerTaxonomyScanBackedEvidence } from './general-natal-peer-taxonomy-scan-backed-evidence.js';
import { buildGeneralNatalSourceBoundedReviewSubjectManifest } from './general-natal-source-bounded-review-subject-manifest.js';
import { buildGeneralNatalTrustGrantRequestManifest } from './general-natal-source-bounded-trust-grant-request-manifest.js';

export const GENERAL_NATAL_SOURCE_BOUNDED_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-general-natal-source-bounded-authority-bridge-review-v1' as const;

export type GeneralNatalSourceBoundedBridgeDecision = 'RETURN_TO_RESEARCH';

const SOURCE_RESEARCH_PREREQUISITES = Object.freeze([
  'COMPLETE_EXACT_SOURCE_INTEGRITY_QUALIFICATION_FOR_EVERY_SOURCE_CONSUMED_BY_THE_CURRENT_SOURCE_BOUNDED_CANDIDATE',
  'CLOSE_REMAINING_FIXED_WITNESS_SCAN_TRANSCRIPTION_IDENTITY_GAPS_WITHOUT_TREATING_OCR_CORROBORATION_AS_EXACT_IDENTITY',
  'COMPLETE_DIRECT_SCAN_IMAGE_OR_EQUIVALENT_GOVERNED_VERIFICATION_FOR_THE_SAMYEONG_VOLUME_7_PEER_TAXONOMY_SOURCE',
  'REPRODUCE_SCAN_VERIFIED_WITNESS_DIGESTS_ONLY_WHERE_EXACT_SCAN_TRANSCRIPTION_IDENTITY_IS_ESTABLISHED',
  'DO_NOT_PROMOTE_PROVENANCE_QUALITY_FROM_SOURCE_COUNT_OR_OCR_CORROBORATION_ALONE',
] as const);

const GOVERNANCE_PREREQUISITES = Object.freeze([
  'OBTAIN_REAL_DOMAIN_REVIEW_ATTESTATIONS_BOUND_TO_THE_EXACT_CURRENT_11_CONTENT_ADDRESSED_SUBJECTS',
  'OBTAIN_INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_THE_EXACT_ATTESTATION_CONTENT_HASHES',
  'RUN_A_SEPARATE_GOVERNED_PROVENANCE_QUALITY_REVIEW_AFTER_SOURCE_INTEGRITY_IS_ESTABLISHED',
  'RUN_A_SEPARATE_LIFECYCLE_PROMOTION_REVIEW_AFTER_PROVENANCE_AND_TRUSTED_DOMAIN_REVIEW_GATES_ARE_SATISFIED',
] as const);

export function buildGeneralNatalSourceBoundedAuthorityBridgeReview() {
  const registry = createGeneralNatalSourceBoundedRegistry();
  const reviewSubjects = buildGeneralNatalSourceBoundedReviewSubjectManifest();
  const scanQualification = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
  const peerTaxonomyEvidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
  const trustRequest = buildGeneralNatalTrustGrantRequestManifest([]);
  const rules = Object.freeze([
    ...GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
    ...GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
  ]);

  const sourceResearchBlockers = Object.freeze([
    Object.freeze({
      code: 'FIXED_WITNESS_SOURCE_INTEGRITY_NOT_ESTABLISHED' as const,
      established: scanQualification.verdict.sourceIntegrityQualificationEstablished,
      evidenceRef: scanQualification.evidenceId,
    }),
    Object.freeze({
      code: 'SAMYEONG_V7_PEER_SOURCE_INTEGRITY_NOT_ESTABLISHED' as const,
      established:
        peerTaxonomyEvidence.qualification.fullSourceIntegrityQualificationEstablished,
      evidenceRef: peerTaxonomyEvidence.evidenceHash,
    }),
  ]);

  const governanceBlockers = Object.freeze([
    Object.freeze({
      code: 'DOMAIN_REVIEW_ATTESTATIONS_ABSENT' as const,
      satisfied: reviewSubjects.reviewAttestationCount > 0,
      observedCount: reviewSubjects.reviewAttestationCount,
    }),
    Object.freeze({
      code: 'TRUSTED_DOMAIN_ATTESTATION_AUTHORITY_ABSENT' as const,
      satisfied: trustRequest.authority.trustedDomainAttestationEstablished,
      observedTrustGrantCount: trustRequest.authority.actualReviewerTrustGrantCount,
    }),
    Object.freeze({
      code: 'PROVENANCE_QUALITY_PROMOTION_NOT_AUTHORIZED' as const,
      satisfied: false as const,
      currentRuleProvenanceQualities: Object.freeze([
        ...new Set(rules.map((rule) => rule.quality.provenanceQuality)),
      ]),
    }),
  ]);

  const candidateState = Object.freeze({
    version: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
    packId: GENERAL_NATAL_SOURCE_BOUNDED_PACK.packId,
    packStatus: GENERAL_NATAL_SOURCE_BOUNDED_PACK.status,
    methodologyId: GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY.methodologyId,
    methodologyStatus: GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY.status,
    familyRuleCount: GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES.length,
    relationRuleCount: GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.length,
    ruleCount: rules.length,
    allRulesResearchOnly: rules.every((rule) => rule.status === 'research'),
    allRulesSecondaryOnly: rules.every(
      (rule) => rule.quality.provenanceQuality === 'secondary_only',
    ),
    allRulesUnreviewed: rules.every(
      (rule) => rule.quality.reviewerStatus === 'unreviewed',
    ),
    allRulesContested: rules.every(
      (rule) => rule.quality.methodologyStability === 'contested',
    ),
  });

  const authorityState = Object.freeze({
    candidateRepresentable: true as const,
    boundedResearchRegistryAvailable: registry.snapshot.rules.length === rules.length,
    reviewSubjectManifestEstablished:
      reviewSubjects.authority.reviewSubjectManifestEstablished,
    reviewSubjectCount: reviewSubjects.reviewSubjectCount,
    bundledReviewAttestationCount: registry.reviewAttestations.length,
    sourceIntegrityQualificationEstablished:
      scanQualification.verdict.sourceIntegrityQualificationEstablished &&
      peerTaxonomyEvidence.qualification.fullSourceIntegrityQualificationEstablished,
    provenanceQualityPromotionAuthorized: false as const,
    domainReviewAuthorityEstablished: false as const,
    trustedDomainAttestationEstablished:
      trustRequest.authority.trustedDomainAttestationEstablished,
    engineAuthorityPromotionAuthorized: false as const,
    previewExpansionAuthorized: false as const,
    officialReadingAuthorityAuthorized: false as const,
    productionAdmissionAuthority: false as const,
    production: 'HOLD' as const,
  });

  const decision = Object.freeze({
    disposition: 'RETURN_TO_RESEARCH' as GeneralNatalSourceBoundedBridgeDecision,
    reason:
      'The current candidate is bounded and representable, but exact source-integrity qualification is still incomplete. Repository review/trust/provenance/lifecycle gates are also independently unsatisfied.',
    rejected: false as const,
    candidateMayRemainResearchOnly: true as const,
    reReviewRequiredAfterResearch: true as const,
  });

  const material = Object.freeze({
    reviewVersion: GENERAL_NATAL_SOURCE_BOUNDED_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1447' as const,
    auditBaseSha: '31e8d476ee4b6f42e253ea7ecc7bb6d843c647f3' as const,
    candidateState,
    evidence: Object.freeze({
      registrySnapshotId: registry.snapshot.registrySnapshotId,
      packRef: Object.freeze({ ...registry.snapshot.packRef }),
      reviewSubjectManifestHash: reviewSubjects.manifestHash,
      scanQualificationEvidenceId: scanQualification.evidenceId,
      peerTaxonomyEvidenceHash: peerTaxonomyEvidence.evidenceHash,
      trustGrantRequestManifestHash: trustRequest.manifestHash,
      fixedWitnessCount: scanQualification.counts.witnessCount,
      fixedWitnessDirectScanVerifiedCount:
        scanQualification.counts.boundedPropositionDirectlyObservedInScanCount,
      fixedWitnessFullScanQualificationCount:
        scanQualification.counts.fullScanQualificationEstablishedCount,
    }),
    sourceResearchBlockers,
    governanceBlockers,
    authorityState,
    decision,
    reReviewEntryCriteria: Object.freeze({
      research: SOURCE_RESEARCH_PREREQUISITES,
      governance: GOVERNANCE_PREREQUISITES,
    }),
    prohibitedExtensions: Object.freeze([
      'NO_REVIEW_ATTESTATION_FABRICATION',
      'NO_REVIEWER_IDENTITY_OR_TRUST_GRANT_FABRICATION',
      'NO_SECONDARY_ONLY_TO_MULTI_SOURCE_SUPPORTED_AUTOMATIC_PROMOTION',
      'NO_RESEARCH_TO_REVIEWED_OR_ACTIVE_LIFECYCLE_AUTOMATIC_PROMOTION',
      'NO_PREVIEW_OR_OFFICIAL_READING_EXPANSION_FROM_THIS_REVIEW',
      'NO_PRODUCTION_PACK_OR_PRODUCTION_ADMISSION_FROM_THIS_REVIEW',
      'NO_NEW_CONSUMER_SEMANTICS',
      'NO_GENERIC_TEN_GOD_RELATION_RESOLVER',
      'NO_STRENGTH_GYEOKGUK_YONGSHIN_TIMING_OR_COMMERCE_EXPANSION',
    ] as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}
