import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalSourceBoundedAuthorityBridgeReview } from './general-natal-source-bounded-authority-bridge-review.js';
import { buildGeneralNatalConclusionT8ScanBackedSourceQualification } from './general-natal-conclusion-t8-scan-backed-source-qualification.js';
import { buildGeneralNatalPeerTaxonomyScanBackedEvidence } from './general-natal-peer-taxonomy-scan-backed-evidence.js';
import { buildGeneralNatalSourceBoundedReviewSubjectManifest } from './general-natal-source-bounded-review-subject-manifest.js';

export const GENERAL_NATAL_SOURCE_BOUNDED_RESEARCH_RETURN_HANDOFF_VERSION =
  'myeonghwa-general-natal-source-bounded-research-return-handoff-v1' as const;

export type GeneralNatalResearchWorkItemStatus = 'BLOCKED' | 'SATISFIED';

function status(satisfied: boolean): GeneralNatalResearchWorkItemStatus {
  return satisfied ? 'SATISFIED' : 'BLOCKED';
}

export function buildGeneralNatalSourceBoundedResearchReturnHandoff() {
  const bridgeReview = buildGeneralNatalSourceBoundedAuthorityBridgeReview();
  const scanQualification = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
  const peerEvidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
  const reviewManifest = buildGeneralNatalSourceBoundedReviewSubjectManifest();

  if (bridgeReview.decision.disposition !== 'RETURN_TO_RESEARCH') {
    throw new Error('General Natal Research-return handoff requires RETURN_TO_RESEARCH disposition.');
  }

  const candidateBinding = Object.freeze({
    candidateVersion: reviewManifest.candidateVersion,
    registrySnapshotId: reviewManifest.registrySnapshotId,
    packRef: Object.freeze({ ...reviewManifest.packRef }),
    reviewSubjectManifestHash: reviewManifest.manifestHash,
    reviewSubjectCount: reviewManifest.reviewSubjectCount,
    subjects: Object.freeze(
      reviewManifest.subjects.map((subject) =>
        Object.freeze({
          subjectType: subject.subjectType,
          subjectRef: Object.freeze({ ...subject.subjectRef }),
        }),
      ),
    ),
  });

  const researchWorkItems = Object.freeze([
    Object.freeze({
      code: 'FIXED_WITNESS_FULL_SOURCE_INTEGRITY' as const,
      status: status(scanQualification.verdict.sourceIntegrityQualificationEstablished),
      evidenceRef: scanQualification.evidenceId,
      requirement:
        'Establish the governed source-integrity qualification for the fixed 16-witness mesh without treating OCR or source count as exact witness identity.',
    }),
    Object.freeze({
      code: 'FIXED_WITNESS_EXACT_PAGE_OR_FOLIO_AUTHORITY' as const,
      status: status(scanQualification.verdict.exactPhysicalPageOrFolioAuthorityEstablished),
      evidenceRef: scanQualification.evidenceId,
      observedCount: scanQualification.counts.exactPhysicalPageOrFolioVerifiedCount,
      requiredCount: scanQualification.counts.witnessCount,
      requirement:
        'Preserve digital-scan-page versus printed-page/folio identity and establish exact locator authority where the frozen witness requires it.',
    }),
    Object.freeze({
      code: 'FIXED_WITNESS_EXACT_DIGEST_REPRODUCTION' as const,
      status: status(scanQualification.verdict.exactWitnessHashReproductionAuthorityEstablished),
      evidenceRef: scanQualification.evidenceId,
      observedCount: scanQualification.counts.exactWitnessHashReproducedFromScanCount,
      requiredCount: scanQualification.counts.witnessCount,
      requirement:
        'Reproduce witness digests only from a scan-verified transcription surface with exact identity established.',
    }),
    Object.freeze({
      code: 'FIXED_WITNESS_TEXTUAL_VARIANT_RESOLUTION' as const,
      status: status(scanQualification.counts.fixedWitnessTextualVariantDivergenceCount === 0),
      evidenceRef: scanQualification.evidenceId,
      observedVariantCount: scanQualification.counts.fixedWitnessTextualVariantDivergenceCount,
      requirement:
        'Resolve or explicitly re-register frozen witnesses through a separate reviewed process; do not treat a Ming-Wanli textual variant as the exact frozen transcription.',
    }),
    Object.freeze({
      code: 'SAMYEONG_V7_PEER_FULL_SOURCE_INTEGRITY' as const,
      status: status(peerEvidence.qualification.fullSourceIntegrityQualificationEstablished),
      evidenceRef: peerEvidence.evidenceHash,
      requirement:
        'Close the remaining 三命通會 卷七 peer-taxonomy source-integrity gap while preserving the already established direct scan observation.',
    }),
    Object.freeze({
      code: 'SAMYEONG_V7_PEER_EXACT_TRANSCRIPTION_IDENTITY' as const,
      status: status(peerEvidence.qualification.exactTranscriptionIdentityEstablished),
      evidenceRef: peerEvidence.evidenceHash,
      requirement:
        'Establish exact scan/transcription identity for the bounded 兄弟者即劫財比肩 witness before any provenance promotion is considered.',
    }),
  ]);

  const material = Object.freeze({
    handoffVersion: GENERAL_NATAL_SOURCE_BOUNDED_RESEARCH_RETURN_HANDOFF_VERSION,
    issue: '#1482' as const,
    fromBridgeIssue: '#1447' as const,
    fromBridgeReviewId: bridgeReview.reviewId,
    disposition: 'RETURN_TO_RESEARCH' as const,
    candidateRejected: false as const,
    candidateBinding,
    researchWorkItems,
    upstreamRequiredNextEvidence: Object.freeze([...scanQualification.requiredNextEvidence]),
    laterGovernanceWork: Object.freeze([
      'DOMAIN_REVIEW_ATTESTATIONS_FOR_EXACT_CURRENT_SUBJECTS',
      'INDEPENDENT_REVIEWER_TRUST_GRANTS_FOR_EXACT_ATTESTATION_HASHES',
      'GOVERNED_PROVENANCE_QUALITY_REVIEW',
      'GOVERNED_LIFECYCLE_PROMOTION_REVIEW',
    ] as const),
    authorityBoundary: Object.freeze({
      researchMayCreateReviewAttestation: false as const,
      researchMayCreateReviewerTrustGrant: false as const,
      researchMayPromoteProvenanceQuality: false as const,
      researchMayPromoteLifecycle: false as const,
      researchMayAuthorizeEnginePromotion: false as const,
      researchMayAuthorizeOfficialReading: false as const,
      researchMayAuthorizeProduction: false as const,
    }),
    prohibitedExtensions: Object.freeze([
      'NO_NEW_CLASSICAL_PROPOSITION_IN_BRIDGE',
      'NO_OCR_CORROBORATION_AS_EXACT_TRANSCRIPTION_IDENTITY',
      'NO_SOURCE_COUNT_AS_PROVENANCE_PROMOTION',
      'NO_REVIEW_ATTESTATION_FABRICATION',
      'NO_REVIEWER_TRUST_FABRICATION',
      'NO_RESEARCH_TO_REVIEWED_OR_ACTIVE_AUTOMATIC_PROMOTION',
      'NO_ENGINE_OFFICIAL_OR_PRODUCTION_PROMOTION_FROM_RESEARCH_RETURN',
    ] as const),
  });

  return Object.freeze({
    handoffId: deterministicContentHash(material),
    ...material,
  });
}

export type GeneralNatalSourceBoundedResearchReturnHandoff =
  ReturnType<typeof buildGeneralNatalSourceBoundedResearchReturnHandoff>;
