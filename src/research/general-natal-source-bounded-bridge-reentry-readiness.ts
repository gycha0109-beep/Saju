import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  createGeneralNatalSourceBoundedRegistry,
} from './general-natal-conclusion-source-bounded-candidate.js';
import { buildGeneralNatalConclusionT8ScanBackedSourceQualification } from './general-natal-conclusion-t8-scan-backed-source-qualification.js';
import { buildGeneralNatalConclusionT8WitnessDigestReproductionContract } from './general-natal-conclusion-t8-witness-digest-reproduction-contract.js';
import { buildGeneralNatalPeerTaxonomyScanBackedEvidence } from './general-natal-peer-taxonomy-scan-backed-evidence.js';
import { buildGeneralNatalSourceBoundedAuthorityBridgeReview } from './general-natal-source-bounded-authority-bridge-review.js';

export const GENERAL_NATAL_SOURCE_BOUNDED_BRIDGE_REENTRY_READINESS_VERSION =
  'myeonghwa-general-natal-source-bounded-bridge-reentry-readiness-v1' as const;

export type GeneralNatalBridgeReentryDisposition =
  | 'RETURN_TO_RESEARCH'
  | 'FRESH_REVIEW_SURFACE_REQUIRED'
  | 'READY_FOR_BRIDGE_REREVIEW';

interface CandidateSurface {
  readonly candidateVersion: string;
  readonly packRef: ContentAddressedVersionedRef;
  readonly methodologies: readonly ContentAddressedVersionedRef[];
  readonly rules: readonly ContentAddressedVersionedRef[];
}

export interface GeneralNatalBridgeReentryEvidenceSnapshot {
  readonly candidateSurface: CandidateSurface;
  readonly fixedWitness: {
    readonly witnessCount: number;
    readonly exactPhysicalPageOrFolioVerifiedCount: number;
    readonly exactWitnessHashReproducedFromScanCount: number;
    readonly exactTranscriptionIdentityEstablishedCount: number;
    readonly fullScanQualificationEstablishedCount: number;
    readonly scanDerivedDigestReproductionEstablishedCount: number;
    readonly textualVariantDivergencePreserved: boolean;
  };
  readonly peerTaxonomy: {
    readonly exactPhysicalPageOrFolioVerified: boolean;
    readonly exactWitnessHashReproducedFromScan: boolean;
    readonly exactTranscriptionIdentityEstablished: boolean;
    readonly fullSourceIntegrityQualificationEstablished: boolean;
  };
  readonly laterGovernance: {
    readonly domainReviewAuthorityEstablished: boolean;
    readonly trustedDomainAttestationEstablished: boolean;
    readonly provenanceQualityPromotionAuthorized: boolean;
  };
}

function sortRefs(refs: readonly ContentAddressedVersionedRef[]) {
  return Object.freeze(
    [...refs].sort((left, right) =>
      `${left.id}@${left.version}`.localeCompare(`${right.id}@${right.version}`),
    ),
  );
}

const BASELINE_SURFACE = Object.freeze({
  candidateVersion: '0.2.0-research',
  packRef: Object.freeze({
    id: 'PACK-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1',
    version: '0.2.0-research',
    contentHash: '1023deb8a8e9c50887dc374486eb68e7aa46582cbbef2814a1ea5a80169917ce',
  }),
  methodologies: Object.freeze([
    Object.freeze({
      id: 'M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1',
      version: '0.2.0-research',
      contentHash: '3a96da5b30373cd28f5a5860235a9d73681c19a4ca96c5ecc4be817b92519780',
    }),
  ]),
  rules: Object.freeze([
    Object.freeze({ id: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-OFFICER-PRESENT', version: '0.2.0-research', contentHash: '03f89c697fdbb273bf33d112ea27b40a318daa54952542d70d58b137b144e409' }),
    Object.freeze({ id: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-OUTPUT-PRESENT', version: '0.2.0-research', contentHash: 'b65679244b3b92042165828a2374ce3b5b090889f5f31ab5dc88b02866fcba5f' }),
    Object.freeze({ id: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-PEER-PRESENT', version: '0.2.0-research', contentHash: 'd77782cc4c10c8572b648ba0f88bdfb024af97607483cb4c8c4ea486738b6992' }),
    Object.freeze({ id: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-RESOURCE-PRESENT', version: '0.2.0-research', contentHash: 'c832f0482478351ac175f73d2e12b43363c8ec6de4b46967a013982d404ee697' }),
    Object.freeze({ id: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-WEALTH-PRESENT', version: '0.2.0-research', contentHash: 'e8091bc88dc90e2cbc32268da6a43ffdb44032f51b40cbd1efea9be2d868378e' }),
    Object.freeze({ id: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-OFFICER-TO-RESOURCE', version: '0.2.0-research', contentHash: 'bbfe64c3eb1081aa95449b0273922fd77ed7d5f7163f59f51db9a84fd31d6c13' }),
    Object.freeze({ id: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-OUTPUT-TO-WEALTH', version: '0.2.0-research', contentHash: 'e691772ccf9e9e175aec96d60edda616e7cd5939f76aaaa4834991ba49388ce0' }),
    Object.freeze({ id: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-PEER-TO-WEALTH-ADVERSE', version: '0.2.0-research', contentHash: '0fd69bb361ddcf9babd78b3238f9fe51dcda9dcbc1ee34f58654d8002aef2238' }),
    Object.freeze({ id: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-WEALTH-RESOURCE-CONFLICT', version: '0.2.0-research', contentHash: '3ba38796119c7a2059829e50aaa25da954174a8748d380e3f471d48b4cf170c8' }),
    Object.freeze({ id: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-WEALTH-TO-OFFICER', version: '0.2.0-research', contentHash: 'd8622a8a7a565f768b7d33384c01a2d9b4e6304a83c466c6039e0d287eda30b1' }),
  ]),
} satisfies CandidateSurface);

export const GENERAL_NATAL_BRIDGE_REENTRY_BASELINE = Object.freeze({
  issue: '#1447' as const,
  candidateSurface: BASELINE_SURFACE,
  candidateSurfaceHash: '420cb351c1288af54ef50fc85972bd080a92a851147d5b71062e8c30b0534cb9' as const,
  reviewSubjectCount: 11 as const,
});

function currentCandidateSurface(): CandidateSurface {
  const registry = createGeneralNatalSourceBoundedRegistry();
  return Object.freeze({
    candidateVersion: GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
    packRef: Object.freeze({ ...registry.snapshot.packRef }),
    methodologies: sortRefs(registry.snapshot.methodologies),
    rules: sortRefs(registry.snapshot.rules),
  });
}

export function collectGeneralNatalBridgeReentryEvidence(): GeneralNatalBridgeReentryEvidenceSnapshot {
  const fixedWitness = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
  const digest = buildGeneralNatalConclusionT8WitnessDigestReproductionContract();
  const peerTaxonomy = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
  const bridgeReview = buildGeneralNatalSourceBoundedAuthorityBridgeReview();

  const divergenceRows = fixedWitness.witnessRows.filter(
    (row) => 'scanSurfaceInspection' in row,
  );

  return Object.freeze({
    candidateSurface: currentCandidateSurface(),
    fixedWitness: Object.freeze({
      witnessCount: fixedWitness.counts.witnessCount,
      exactPhysicalPageOrFolioVerifiedCount:
        fixedWitness.counts.exactPhysicalPageOrFolioVerifiedCount,
      exactWitnessHashReproducedFromScanCount:
        fixedWitness.counts.exactWitnessHashReproducedFromScanCount,
      exactTranscriptionIdentityEstablishedCount: fixedWitness.witnessRows.filter(
        (row) => row.exactTranscriptionIdentityEstablished,
      ).length,
      fullScanQualificationEstablishedCount:
        fixedWitness.counts.fullScanQualificationEstablishedCount,
      scanDerivedDigestReproductionEstablishedCount:
        digest.counts.scanDerivedDigestReproductionEstablishedCount,
      textualVariantDivergencePreserved:
        divergenceRows.length === fixedWitness.counts.fixedWitnessTextualVariantDivergenceCount &&
        divergenceRows.every(
          (row) =>
            row.scanSurfaceInspection?.fixedWitnessDirectVerificationOutcome ===
            'NOT_ESTABLISHED_TEXTUAL_VARIANT_DIVERGENCE',
        ),
    }),
    peerTaxonomy: Object.freeze({
      exactPhysicalPageOrFolioVerified:
        peerTaxonomy.qualification.exactPhysicalPageOrFolioVerified,
      exactWitnessHashReproducedFromScan:
        peerTaxonomy.qualification.exactWitnessHashReproducedFromScan,
      exactTranscriptionIdentityEstablished:
        peerTaxonomy.qualification.exactTranscriptionIdentityEstablished,
      fullSourceIntegrityQualificationEstablished:
        peerTaxonomy.qualification.fullSourceIntegrityQualificationEstablished,
    }),
    laterGovernance: Object.freeze({
      domainReviewAuthorityEstablished:
        bridgeReview.authorityState.domainReviewAuthorityEstablished,
      trustedDomainAttestationEstablished:
        bridgeReview.authorityState.trustedDomainAttestationEstablished,
      provenanceQualityPromotionAuthorized:
        bridgeReview.authorityState.provenanceQualityPromotionAuthorized,
    }),
  });
}

function candidateSurfaceHash(surface: CandidateSurface): string {
  return deterministicContentHash({
    candidateVersion: surface.candidateVersion,
    packRef: surface.packRef,
    methodologies: sortRefs(surface.methodologies),
    rules: sortRefs(surface.rules),
  });
}

export function evaluateGeneralNatalBridgeReentryReadiness(
  evidence: GeneralNatalBridgeReentryEvidenceSnapshot,
) {
  const observedCandidateSurfaceHash = candidateSurfaceHash(evidence.candidateSurface);
  const candidateBindingFresh =
    observedCandidateSurfaceHash === GENERAL_NATAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash;

  const fixedWitnessReady =
    evidence.fixedWitness.witnessCount > 0 &&
    evidence.fixedWitness.exactPhysicalPageOrFolioVerifiedCount === evidence.fixedWitness.witnessCount &&
    evidence.fixedWitness.exactWitnessHashReproducedFromScanCount === evidence.fixedWitness.witnessCount &&
    evidence.fixedWitness.exactTranscriptionIdentityEstablishedCount === evidence.fixedWitness.witnessCount &&
    evidence.fixedWitness.fullScanQualificationEstablishedCount === evidence.fixedWitness.witnessCount &&
    evidence.fixedWitness.scanDerivedDigestReproductionEstablishedCount === evidence.fixedWitness.witnessCount &&
    evidence.fixedWitness.textualVariantDivergencePreserved;

  const peerTaxonomyReady =
    evidence.peerTaxonomy.exactPhysicalPageOrFolioVerified &&
    evidence.peerTaxonomy.exactWitnessHashReproducedFromScan &&
    evidence.peerTaxonomy.exactTranscriptionIdentityEstablished &&
    evidence.peerTaxonomy.fullSourceIntegrityQualificationEstablished;

  const sourceIntegrityReady = fixedWitnessReady && peerTaxonomyReady;

  const remainingResearchBlockers = Object.freeze([
    ...(fixedWitnessReady ? [] : ['FIXED_WITNESS_SOURCE_INTEGRITY_INCOMPLETE' as const]),
    ...(peerTaxonomyReady ? [] : ['SAMYEONG_V7_PEER_SOURCE_INTEGRITY_INCOMPLETE' as const]),
  ]);

  const laterGovernanceBlockers = Object.freeze([
    ...(
      evidence.laterGovernance.domainReviewAuthorityEstablished
        ? []
        : ['DOMAIN_REVIEW_ATTESTATIONS_REQUIRED' as const]
    ),
    ...(
      evidence.laterGovernance.trustedDomainAttestationEstablished
        ? []
        : ['REVIEWER_TRUST_GRANTS_REQUIRED' as const]
    ),
    ...(
      evidence.laterGovernance.provenanceQualityPromotionAuthorized
        ? []
        : ['PROVENANCE_QUALITY_PROMOTION_REVIEW_REQUIRED' as const]
    ),
    'LIFECYCLE_PROMOTION_REVIEW_REQUIRED' as const,
  ]);

  const nextDisposition: GeneralNatalBridgeReentryDisposition = !candidateBindingFresh
    ? 'FRESH_REVIEW_SURFACE_REQUIRED'
    : !sourceIntegrityReady
      ? 'RETURN_TO_RESEARCH'
      : 'READY_FOR_BRIDGE_REREVIEW';

  const material = Object.freeze({
    version: GENERAL_NATAL_SOURCE_BOUNDED_BRIDGE_REENTRY_READINESS_VERSION,
    issue: '#1482' as const,
    baselineCandidateSurfaceHash: GENERAL_NATAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash,
    observedCandidateSurfaceHash,
    candidateBindingFresh,
    sourceIntegrity: Object.freeze({
      ready: sourceIntegrityReady,
      fixedWitnessReady,
      peerTaxonomyReady,
    }),
    researchReturnRequired: !sourceIntegrityReady,
    bridgeReentryReady:
      candidateBindingFresh && sourceIntegrityReady,
    nextDisposition,
    remainingResearchBlockers,
    laterGovernanceBlockers,
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
  });

  return Object.freeze({
    ...material,
    readinessHash: deterministicContentHash(material),
  });
}

export function buildGeneralNatalBridgeReentryReadiness() {
  return evaluateGeneralNatalBridgeReentryReadiness(
    collectGeneralNatalBridgeReentryEvidence(),
  );
}
