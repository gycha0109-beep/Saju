import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalConclusionT8ScanBackedSourceQualification } from './general-natal-conclusion-t8-scan-backed-source-qualification.js';
import { buildGeneralNatalConclusionT8WitnessDigestReproductionContract } from './general-natal-conclusion-t8-witness-digest-reproduction-contract.js';
import { buildGeneralNatalPeerTaxonomyScanBackedEvidence } from './general-natal-peer-taxonomy-scan-backed-evidence.js';
import { buildGeneralNatalSourceBoundedAuthorityBridgeReview } from './general-natal-source-bounded-authority-bridge-review.js';
import { buildGeneralNatalSourceBoundedReviewSubjectManifest } from './general-natal-source-bounded-review-subject-manifest.js';

export const GENERAL_NATAL_SOURCE_BOUNDED_RESEARCH_RETURN_HANDOFF_VERSION =
  'myeonghwa-general-natal-source-bounded-research-return-handoff-v1' as const;

export function buildGeneralNatalSourceBoundedResearchReturnHandoff() {
  const bridgeReview = buildGeneralNatalSourceBoundedAuthorityBridgeReview();
  const reviewSubjects = buildGeneralNatalSourceBoundedReviewSubjectManifest();
  const fixedWitnessEvidence = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
  const digestEvidence = buildGeneralNatalConclusionT8WitnessDigestReproductionContract();
  const peerEvidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();

  const material = Object.freeze({
    version: GENERAL_NATAL_SOURCE_BOUNDED_RESEARCH_RETURN_HANDOFF_VERSION,
    issue: '#1482' as const,
    upstreamBridgeReview: Object.freeze({
      issue: bridgeReview.issue,
      reviewId: bridgeReview.reviewId,
      disposition: bridgeReview.decision.disposition,
      rejected: bridgeReview.decision.rejected,
    }),
    candidateBinding: Object.freeze({
      candidateVersion: bridgeReview.candidateState.version,
      registrySnapshotId: bridgeReview.evidence.registrySnapshotId,
      packRef: Object.freeze({ ...bridgeReview.evidence.packRef }),
      reviewSubjectManifestHash: reviewSubjects.manifestHash,
      reviewSubjectCount: reviewSubjects.reviewSubjectCount,
    }),
    researchReturnRequired: true as const,
    workstreams: Object.freeze([
      Object.freeze({
        code: 'FIXED_WITNESS_SOURCE_INTEGRITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: fixedWitnessEvidence.verdict.sourceIntegrityQualificationEstablished,
        evidenceRef: fixedWitnessEvidence.evidenceId,
        requirements: Object.freeze([
          'ESTABLISH_EXACT_SCAN_OR_REGISTERED_TRANSCRIPTION_SURFACE_FOR_EVERY_FIXED_WITNESS',
          'VERIFY_EXACT_PHYSICAL_PAGE_OR_FOLIO_WHERE_REQUIRED_BY_THE_CURRENT_WITNESS_CONTRACT',
          'COMPLETE_DIRECT_SCAN_TO_TRANSCRIPTION_COMPARISON_WITHOUT_COLLAPSING_TEXTUAL_VARIANTS',
          'ESTABLISH_FULL_SCAN_QUALIFICATION_FOR_EVERY_FIXED_WITNESS',
        ] as const),
      }),
      Object.freeze({
        code: 'EXACT_TRANSCRIPTION_IDENTITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: fixedWitnessEvidence.witnessRows.every(
          (row) => row.exactTranscriptionIdentityEstablished,
        ),
        evidenceRef: fixedWitnessEvidence.evidenceId,
        requirements: Object.freeze([
          'ESTABLISH_EXACT_SCAN_TRANSCRIPTION_IDENTITY_FOR_EVERY_FIXED_WITNESS',
          'PRESERVE_RECORDED_TEXTUAL_VARIANT_DIVERGENCE',
          'DO_NOT_TREAT_OCR_OR_CROSS_EDITION_CORROBORATION_AS_EXACT_IDENTITY',
        ] as const),
      }),
      Object.freeze({
        code: 'SCAN_VERIFIED_DIGEST_REPRODUCTION' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: digestEvidence.verdict.scanDerivedDigestReproductionEstablished,
        evidenceRef: digestEvidence.evidenceId,
        requirements: Object.freeze([
          'USE_THE_EXISTING_EXACT_BOUNDED_SOURCE_SUBSTRING_UTF8_SHA256_CONTRACT',
          'REPRODUCE_EVERY_FIXED_WITNESS_DIGEST_FROM_A_SCAN_VERIFIED_TRANSCRIPTION_SURFACE',
          'DO_NOT_CHANGE_NORMALIZATION_OR_HASH_RULES_TO_FORCE_A_MATCH',
        ] as const),
      }),
      Object.freeze({
        code: 'SAMYEONG_V7_PEER_SOURCE_INTEGRITY' as const,
        owner: 'traditional_saju_research' as const,
        currentReady: peerEvidence.qualification.fullSourceIntegrityQualificationEstablished,
        evidenceRef: peerEvidence.evidenceHash,
        requirements: Object.freeze([
          'VERIFY_EXACT_PHYSICAL_PAGE_OR_FOLIO_FOR_THE_EXISTING_VOLUME_7_SCAN_SURFACE',
          'REPRODUCE_THE_EXACT_WITNESS_HASH_FROM_THE_SCAN_VERIFIED_TRANSCRIPTION',
          'ESTABLISH_EXACT_TRANSCRIPTION_IDENTITY',
          'ESTABLISH_FULL_SOURCE_INTEGRITY_QUALIFICATION',
        ] as const),
      }),
    ]),
    deferredGovernance: Object.freeze([
      'REAL_DOMAIN_REVIEW_ATTESTATIONS',
      'INDEPENDENT_REVIEWER_TRUST_GRANTS',
      'GOVERNED_PROVENANCE_QUALITY_PROMOTION_REVIEW',
      'GOVERNED_LIFECYCLE_PROMOTION_REVIEW',
      'ENGINE_AUTHORITY_ADMISSION',
      'OFFICIAL_READING_AUTHORITY',
      'PRODUCTION_ADMISSION',
    ] as const),
    authorityBoundary: Object.freeze({
      domainReviewAuthorityEstablished: false as const,
      trustedDomainAttestationEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      engineAuthorityPromotionAuthorized: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAdmissionAuthority: false as const,
      production: 'HOLD' as const,
    }),
    prohibitedExtensions: Object.freeze([
      'NO_NEW_CLASSICAL_PROPOSITION',
      'NO_SOURCE_REINTERPRETATION',
      'NO_REVIEW_ATTESTATION_OR_REVIEWER_TRUST_FABRICATION',
      'NO_AUTOMATIC_PROVENANCE_OR_LIFECYCLE_PROMOTION',
      'NO_ENGINE_RULE_IMPLEMENTATION',
      'NO_PREVIEW_OFFICIAL_OR_PRODUCTION_EXPANSION',
      'NO_GYEOKGUK_STRENGTH_WANGSHUAI_YONGSHIN_TIMING_SKU_OR_COMMERCE_EXPANSION',
    ] as const),
  });

  return Object.freeze({
    ...material,
    handoffHash: deterministicContentHash(material),
  });
}
