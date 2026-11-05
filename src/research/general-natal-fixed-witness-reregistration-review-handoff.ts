import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { GENERAL_NATAL_BRIDGE_REENTRY_BASELINE } from './general-natal-source-bounded-bridge-reentry-readiness.js';
import { buildGeneralNatalSourceIntegrityAcquisitionAudit } from './general-natal-source-integrity-acquisition-audit.js';

export const GENERAL_NATAL_FIXED_WITNESS_REREGISTRATION_REVIEW_HANDOFF_VERSION =
  'myeonghwa-general-natal-fixed-witness-reregistration-review-handoff-v1' as const;

export function buildGeneralNatalFixedWitnessReregistrationReviewHandoff() {
  const acquisition = buildGeneralNatalSourceIntegrityAcquisitionAudit();

  if (acquisition.outcome !== 'BLOCKED_BY_FIXED_WITNESS_REREGISTRATION') {
    throw new Error(
      `Unexpected acquisition outcome for re-registration handoff: ${acquisition.outcome}`,
    );
  }

  const targetWitnesses = Object.freeze(
    acquisition.witnessRows.map((row) =>
      Object.freeze({
        witnessId: row.witnessId,
        currentSection: row.requiredWitnessSection,
        currentPassageSha256: row.expectedPassageSha256,
        exactBoundedSubstringDigestMatchOnAlternateSurface:
          row.exactBoundedSubstringDigestMatch,
        exactSameSectionIdentityEstablished: row.fixedWitnessExactIdentityEstablished,
        acquisitionStatus: row.acquisitionStatus,
      }),
    ),
  );

  const material = Object.freeze({
    version: GENERAL_NATAL_FIXED_WITNESS_REREGISTRATION_REVIEW_HANDOFF_VERSION,
    issue: '#1551' as const,
    upstreamResearchIssue: '#1518' as const,
    upstreamBridgeIssue: '#1482' as const,
    currentDecision: 'REVIEW_REQUIRED' as const,
    targetWitnesses,
    governedEvidence: Object.freeze({
      inspectedTargetSurfaceCount:
        acquisition.governedDirectTargetInspectionSummary.inspectedTargetSurfaceCount,
      inspectedSurfaceRefs:
        acquisition.governedDirectTargetInspectionSummary.inspectedSurfaceRefs,
      frozenExactWitnessCountPerInspectedSurface:
        acquisition.governedDirectTargetInspectionSummary.frozenExactWitnessCountPerInspectedSurface,
      everyInspectedTargetSurfaceIsZeroOfFour:
        acquisition.governedDirectTargetInspectionSummary.everyInspectedTargetSurfaceIsZeroOfFour,
      externalAcquisitionBacklog: acquisition.externalAcquisitionBacklog,
    }),
    allowedReviewDecisions: Object.freeze([
      'PRESERVE_CURRENT_FROZEN_DEFINITION' as const,
      'REREGISTER_FROM_GOVERNED_SCAN_VERIFIED_SURFACE' as const,
    ]),
    prohibitedShortcuts: Object.freeze([
      'GLYPH_NORMALIZATION_AS_EXACT_IDENTITY' as const,
      'PROPOSITION_EQUIVALENCE_AS_EXACT_IDENTITY' as const,
      'OCR_ONLY_EVIDENCE_AS_DIRECT_SCAN_IDENTITY' as const,
      'SECTION_RELOCATION_WITHOUT_REVIEW' as const,
      'SILENT_FROZEN_WITNESS_MUTATION' as const,
    ]),
    requiredReplacementEvidence: Object.freeze([
      'CURRENT_WITNESS_ID_SECTION_AND_DIGEST' as const,
      'PROPOSED_SOURCE_EDITION_AND_EXACT_SCAN_LOCATOR' as const,
      'EXACT_SECTION_IDENTITY' as const,
      'EXACT_SCAN_VERIFIED_TRANSCRIPTION' as const,
      'UTF8_NO_NORMALIZATION_SHA256_REPRODUCTION' as const,
      'PROPOSITION_COMPARISON_AGAINST_CURRENT_CANDIDATE' as const,
      'WITNESS_ID_OR_VERSION_CHANGE_DECISION' as const,
      'CONTENT_ADDRESSED_CANDIDATE_DRIFT_RECORD' as const,
    ]),
    candidateMutationContract: Object.freeze({
      mutationAuthorizedByThisHandoff: false as const,
      currentBaselineCandidateSurfaceHash:
        GENERAL_NATAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash,
      anyReregistrationRequiresVersionedCandidateSurface: true as const,
      existingBridgeReviewMayBeInheritedAfterMutation: false as const,
      expectedBridgeDispositionAfterApprovedMutation:
        'FRESH_REVIEW_SURFACE_REQUIRED' as const,
    }),
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
    handoffHash: deterministicContentHash(material),
  });
}
