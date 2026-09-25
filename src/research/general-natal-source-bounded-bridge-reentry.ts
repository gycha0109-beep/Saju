import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalSourceBoundedAuthorityBridgeReview } from './general-natal-source-bounded-authority-bridge-review.js';
import { buildGeneralNatalConclusionT8ScanBackedSourceQualification } from './general-natal-conclusion-t8-scan-backed-source-qualification.js';
import { buildGeneralNatalPeerTaxonomyScanBackedEvidence } from './general-natal-peer-taxonomy-scan-backed-evidence.js';
import {
  buildGeneralNatalSourceBoundedResearchReturnHandoff,
  type GeneralNatalSourceBoundedResearchReturnHandoff,
} from './general-natal-source-bounded-research-return-handoff.js';
import { buildGeneralNatalSourceBoundedReviewSubjectManifest } from './general-natal-source-bounded-review-subject-manifest.js';

export const GENERAL_NATAL_SOURCE_BOUNDED_BRIDGE_REENTRY_VERSION =
  'myeonghwa-general-natal-source-bounded-bridge-reentry-v1' as const;

export type GeneralNatalBridgeReentryDisposition =
  | 'RETURN_TO_RESEARCH'
  | 'REFRESH_BRIDGE_SUBJECT_BINDING'
  | 'INVALID_RESEARCH_RETURN_HANDOFF'
  | 'READY_FOR_BRIDGE_REVIEW';

export interface GeneralNatalBridgeReentryCurrentState {
  readonly candidateBinding: {
    readonly candidateVersion: string;
    readonly registrySnapshotId: string;
    readonly packContentHash: string;
    readonly reviewSubjectManifestHash: string;
    readonly reviewSubjectCount: number;
    readonly subjectsHash: string;
  };
  readonly sourceIntegrity: {
    readonly fixedWitnessSourceIntegrityEstablished: boolean;
    readonly peerTaxonomySourceIntegrityEstablished: boolean;
    readonly fixedWitnessFullScanQualificationCount: number;
    readonly fixedWitnessCount: number;
    readonly fixedWitnessTextualVariantDivergenceCount: number;
  };
  readonly laterGovernance: {
    readonly domainReviewAuthorityEstablished: boolean;
    readonly trustedDomainAttestationEstablished: boolean;
    readonly provenanceQualityPromotionAuthorized: boolean;
    readonly lifecyclePromotionAuthorized: boolean;
  };
}

function handoffMaterial(handoff: GeneralNatalSourceBoundedResearchReturnHandoff) {
  return Object.fromEntries(
    Object.entries(handoff).filter(([key]) => key !== 'handoffId'),
  );
}

function bindingSubjectsHash(
  handoff: GeneralNatalSourceBoundedResearchReturnHandoff,
): string {
  return deterministicContentHash(handoff.candidateBinding.subjects);
}

export function buildCurrentGeneralNatalBridgeReentryState(): GeneralNatalBridgeReentryCurrentState {
  const reviewManifest = buildGeneralNatalSourceBoundedReviewSubjectManifest();
  const scanQualification = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
  const peerEvidence = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
  const bridgeReview = buildGeneralNatalSourceBoundedAuthorityBridgeReview();

  return Object.freeze({
    candidateBinding: Object.freeze({
      candidateVersion: reviewManifest.candidateVersion,
      registrySnapshotId: reviewManifest.registrySnapshotId,
      packContentHash: reviewManifest.packRef.contentHash,
      reviewSubjectManifestHash: reviewManifest.manifestHash,
      reviewSubjectCount: reviewManifest.reviewSubjectCount,
      subjectsHash: deterministicContentHash(
        reviewManifest.subjects.map((subject) => ({
          subjectType: subject.subjectType,
          subjectRef: subject.subjectRef,
        })),
      ),
    }),
    sourceIntegrity: Object.freeze({
      fixedWitnessSourceIntegrityEstablished:
        scanQualification.verdict.sourceIntegrityQualificationEstablished,
      peerTaxonomySourceIntegrityEstablished:
        peerEvidence.qualification.fullSourceIntegrityQualificationEstablished,
      fixedWitnessFullScanQualificationCount:
        scanQualification.counts.fullScanQualificationEstablishedCount,
      fixedWitnessCount: scanQualification.counts.witnessCount,
      fixedWitnessTextualVariantDivergenceCount:
        scanQualification.counts.fixedWitnessTextualVariantDivergenceCount,
    }),
    laterGovernance: Object.freeze({
      domainReviewAuthorityEstablished:
        bridgeReview.authorityState.domainReviewAuthorityEstablished,
      trustedDomainAttestationEstablished:
        bridgeReview.authorityState.trustedDomainAttestationEstablished,
      provenanceQualityPromotionAuthorized:
        bridgeReview.authorityState.provenanceQualityPromotionAuthorized,
      lifecyclePromotionAuthorized: false,
    }),
  });
}

export function assessGeneralNatalSourceBoundedBridgeReentry(
  handoff: GeneralNatalSourceBoundedResearchReturnHandoff,
  current: GeneralNatalBridgeReentryCurrentState =
    buildCurrentGeneralNatalBridgeReentryState(),
) {
  const handoffIntegrityValid =
    deterministicContentHash(handoffMaterial(handoff)) === handoff.handoffId;

  const bindingChecks = Object.freeze({
    candidateVersionMatches:
      handoff.candidateBinding.candidateVersion === current.candidateBinding.candidateVersion,
    registrySnapshotMatches:
      handoff.candidateBinding.registrySnapshotId === current.candidateBinding.registrySnapshotId,
    packContentMatches:
      handoff.candidateBinding.packRef.contentHash === current.candidateBinding.packContentHash,
    reviewSubjectManifestMatches:
      handoff.candidateBinding.reviewSubjectManifestHash ===
      current.candidateBinding.reviewSubjectManifestHash,
    reviewSubjectCountMatches:
      handoff.candidateBinding.reviewSubjectCount === current.candidateBinding.reviewSubjectCount,
    reviewSubjectsMatch:
      bindingSubjectsHash(handoff) === current.candidateBinding.subjectsHash,
  });

  const candidateBindingFresh =
    handoffIntegrityValid && Object.values(bindingChecks).every(Boolean);

  const sourceIntegrityReady =
    current.sourceIntegrity.fixedWitnessSourceIntegrityEstablished &&
    current.sourceIntegrity.peerTaxonomySourceIntegrityEstablished;

  const remainingResearchBlockers = Object.freeze([
    ...(current.sourceIntegrity.fixedWitnessSourceIntegrityEstablished
      ? []
      : ['FIXED_WITNESS_SOURCE_INTEGRITY_NOT_ESTABLISHED' as const]),
    ...(current.sourceIntegrity.fixedWitnessTextualVariantDivergenceCount === 0
      ? []
      : ['FIXED_WITNESS_TEXTUAL_VARIANT_DIVERGENCE_UNRESOLVED' as const]),
    ...(current.sourceIntegrity.peerTaxonomySourceIntegrityEstablished
      ? []
      : ['SAMYEONG_V7_PEER_SOURCE_INTEGRITY_NOT_ESTABLISHED' as const]),
  ]);

  const laterGovernanceBlockers = Object.freeze([
    ...(current.laterGovernance.domainReviewAuthorityEstablished
      ? []
      : ['DOMAIN_REVIEW_AUTHORITY_NOT_ESTABLISHED' as const]),
    ...(current.laterGovernance.trustedDomainAttestationEstablished
      ? []
      : ['TRUSTED_DOMAIN_ATTESTATION_NOT_ESTABLISHED' as const]),
    ...(current.laterGovernance.provenanceQualityPromotionAuthorized
      ? []
      : ['PROVENANCE_QUALITY_PROMOTION_NOT_AUTHORIZED' as const]),
    ...(current.laterGovernance.lifecyclePromotionAuthorized
      ? []
      : ['LIFECYCLE_PROMOTION_NOT_AUTHORIZED' as const]),
  ]);

  const nextDisposition: GeneralNatalBridgeReentryDisposition =
    !handoffIntegrityValid
      ? 'INVALID_RESEARCH_RETURN_HANDOFF'
      : !candidateBindingFresh
        ? 'REFRESH_BRIDGE_SUBJECT_BINDING'
        : !sourceIntegrityReady
          ? 'RETURN_TO_RESEARCH'
          : 'READY_FOR_BRIDGE_REVIEW';

  const material = Object.freeze({
    reentryVersion: GENERAL_NATAL_SOURCE_BOUNDED_BRIDGE_REENTRY_VERSION,
    issue: '#1482' as const,
    handoffId: handoff.handoffId,
    handoffIntegrityValid,
    bindingChecks,
    candidateBindingFresh,
    sourceIntegrityReady,
    remainingResearchBlockers,
    laterGovernanceBlockers,
    researchReturnRequired: nextDisposition === 'RETURN_TO_RESEARCH',
    bridgeReentryReady: nextDisposition === 'READY_FOR_BRIDGE_REVIEW',
    nextDisposition,
    authorityBoundary: Object.freeze({
      domainReviewAuthorityEstablished: false as const,
      trustedDomainAttestationEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      engineAuthorityPromotionAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAdmissionAuthority: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    reentryId: deterministicContentHash(material),
    ...material,
  });
}

export function buildCurrentGeneralNatalSourceBoundedBridgeReentryReadiness() {
  return assessGeneralNatalSourceBoundedBridgeReentry(
    buildGeneralNatalSourceBoundedResearchReturnHandoff(),
  );
}
