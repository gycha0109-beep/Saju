import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalBridgeReentryReadiness } from './general-natal-source-bounded-bridge-reentry-readiness.js';
import { buildGeneralNatalConclusionT8ScanBackedSourceQualification } from './general-natal-conclusion-t8-scan-backed-source-qualification.js';
import { buildGeneralNatalConclusionT8WitnessDigestReproductionContract } from './general-natal-conclusion-t8-witness-digest-reproduction-contract.js';
import { buildGeneralNatalPeerTaxonomyScanBackedEvidence } from './general-natal-peer-taxonomy-scan-backed-evidence.js';
import { buildGeneralNatalSourceIntegrityAcquisitionAudit } from './general-natal-source-integrity-acquisition-audit.js';

export const GENERAL_NATAL_SOURCE_INTEGRITY_CLOSURE_AUDIT_VERSION =
  'myeonghwa-general-natal-source-integrity-closure-audit-v2' as const;

export type GeneralNatalFixedWitnessClosureClass =
  | 'ALTERNATE_EXACT_WITNESS_SURFACE_REQUIRED'
  | 'EXACT_IDENTITY_FOLIO_AND_DIGEST_REQUIRED'
  | 'FULL_SOURCE_INTEGRITY_ESTABLISHED';

export function buildGeneralNatalSourceIntegrityClosureAudit() {
  const scan = buildGeneralNatalConclusionT8ScanBackedSourceQualification();
  const digest = buildGeneralNatalConclusionT8WitnessDigestReproductionContract();
  const peer = buildGeneralNatalPeerTaxonomyScanBackedEvidence();
  const reentry = buildGeneralNatalBridgeReentryReadiness();
  const acquisition = buildGeneralNatalSourceIntegrityAcquisitionAudit();
  const digestByWitnessId = new Map(digest.witnessRows.map((row) => [row.witnessId, row]));

  const fixedWitnessRows = Object.freeze(
    scan.witnessRows.map((row) => {
      const digestRow = digestByWitnessId.get(row.witnessId);
      if (digestRow === undefined) throw new Error(`Missing digest row for ${row.witnessId}`);

      const textualVariantDivergence =
        'scanSurfaceInspection' in row &&
        row.scanSurfaceInspection?.fixedWitnessDirectVerificationOutcome ===
          'NOT_ESTABLISHED_TEXTUAL_VARIANT_DIVERGENCE';

      const fullSourceIntegrityEstablished =
        row.exactPhysicalPageOrFolioVerified &&
        row.exactWitnessHashReproducedFromScan &&
        row.exactTranscriptionIdentityEstablished &&
        row.fullScanQualificationEstablished &&
        digestRow.scanDerivedDigestReproductionEstablished;

      const closureClass: GeneralNatalFixedWitnessClosureClass = fullSourceIntegrityEstablished
        ? 'FULL_SOURCE_INTEGRITY_ESTABLISHED'
        : textualVariantDivergence
          ? 'ALTERNATE_EXACT_WITNESS_SURFACE_REQUIRED'
          : 'EXACT_IDENTITY_FOLIO_AND_DIGEST_REQUIRED';

      return Object.freeze({
        witnessId: row.witnessId,
        sourceId: row.sourceId,
        scanAuthorityId: row.scanAuthorityId,
        exactDigitalScanPageVerified: row.exactDigitalScanPageVerified,
        boundedPropositionDirectlyObservedInScan: row.boundedPropositionDirectlyObservedInScan,
        textualVariantDivergence,
        exactPhysicalPageOrFolioVerified: row.exactPhysicalPageOrFolioVerified,
        exactWitnessHashReproducedFromScan: row.exactWitnessHashReproducedFromScan,
        exactTranscriptionIdentityEstablished: row.exactTranscriptionIdentityEstablished,
        scanDerivedDigestReproductionEstablished:
          digestRow.scanDerivedDigestReproductionEstablished,
        fullScanQualificationEstablished: row.fullScanQualificationEstablished,
        fullSourceIntegrityEstablished,
        closureClass,
      });
    }),
  );

  const peerFullSourceIntegrityEstablished =
    peer.qualification.exactPhysicalPageOrFolioVerified &&
    peer.qualification.exactWitnessHashReproducedFromScan &&
    peer.qualification.exactTranscriptionIdentityEstablished &&
    peer.qualification.fullSourceIntegrityQualificationEstablished;

  const material = Object.freeze({
    version: GENERAL_NATAL_SOURCE_INTEGRITY_CLOSURE_AUDIT_VERSION,
    issue: '#1518' as const,
    upstreamBridgeIssue: '#1482' as const,
    candidateBindingFresh: reentry.candidateBindingFresh,
    fixedWitnessRows,
    fixedWitnessSummary: Object.freeze({
      witnessCount: fixedWitnessRows.length,
      directDigitalScanPageVerifiedCount: fixedWitnessRows.filter(
        (row) => row.exactDigitalScanPageVerified,
      ).length,
      textualVariantDivergenceCount: fixedWitnessRows.filter(
        (row) => row.textualVariantDivergence,
      ).length,
      fullSourceIntegrityEstablishedCount: fixedWitnessRows.filter(
        (row) => row.fullSourceIntegrityEstablished,
      ).length,
      alternateExactWitnessSurfaceRequiredCount: fixedWitnessRows.filter(
        (row) => row.closureClass === 'ALTERNATE_EXACT_WITNESS_SURFACE_REQUIRED',
      ).length,
    }),
    acquisition: Object.freeze({
      auditHash: acquisition.auditHash,
      outcome: acquisition.outcome,
      exactStringScanLocatedCount: acquisition.counts.exactStringScanLocatedCount,
      exactSameSectionIdentityEstablishedCount:
        acquisition.counts.exactSameSectionIdentityEstablishedCount,
      unresolvedExternalSurfaceCount: acquisition.counts.unresolvedExternalSurfaceCount,
      witnessReregistrationReviewRequiredNow:
        acquisition.witnessReregistrationReview.requiredNow,
    }),
    peerTaxonomy: Object.freeze({
      sourceId: peer.source.sourceId,
      scanAuthorityId: peer.scanAuthority.authorityId,
      digitalScanPage: peer.scanAuthority.directInspection.digitalScanPage,
      boundedPropositionDirectlyObservedInScan:
        peer.qualification.boundedPropositionDirectlyObservedInScan,
      exactPhysicalPageOrFolioVerified: peer.qualification.exactPhysicalPageOrFolioVerified,
      exactWitnessHashReproducedFromScan: peer.qualification.exactWitnessHashReproducedFromScan,
      exactTranscriptionIdentityEstablished: peer.qualification.exactTranscriptionIdentityEstablished,
      fullSourceIntegrityQualificationEstablished:
        peer.qualification.fullSourceIntegrityQualificationEstablished,
      fullSourceIntegrityEstablished: peerFullSourceIntegrityEstablished,
    }),
    currentReentry: Object.freeze({
      sourceIntegrityReady: reentry.sourceIntegrity.ready,
      bridgeReentryReady: reentry.bridgeReentryReady,
      nextDisposition: reentry.nextDisposition,
      remainingResearchBlockers: reentry.remainingResearchBlockers,
    }),
    researchDisposition:
      reentry.bridgeReentryReady
        ? ('READY_FOR_BRIDGE_REREVIEW' as const)
        : acquisition.outcome,
    authorityBoundary: acquisition.authorityBoundary,
  });

  return Object.freeze({
    ...material,
    auditHash: deterministicContentHash(material),
  });
}
