import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalFixedWitnessReregistrationReviewHandoff } from './general-natal-fixed-witness-reregistration-review-handoff.js';

export const GENERAL_NATAL_FIXED_WITNESS_REREGISTRATION_REVIEW_VERSION =
  'myeonghwa-general-natal-fixed-witness-reregistration-review-v1' as const;

export function buildGeneralNatalFixedWitnessReregistrationReview() {
  const handoff = buildGeneralNatalFixedWitnessReregistrationReviewHandoff();

  const witnessDecisions = Object.freeze(
    handoff.targetWitnesses.map((row) =>
      Object.freeze({
        witnessId: row.witnessId,
        currentSection: row.currentSection,
        currentPassageSha256: row.currentPassageSha256,
        currentExactSameSectionIdentityEstablished:
          row.exactSameSectionIdentityEstablished,
        replacementEligibleNow: false as const,
        decision: 'PRESERVE_CURRENT_FROZEN_DEFINITION' as const,
        reason:
          row.acquisitionStatus === 'EXACT_STRING_SCAN_LOCATED_SECTION_MISMATCH'
            ? ('EXACT_STRING_EXISTS_ONLY_OUTSIDE_REQUIRED_SECTION' as const)
            : row.acquisitionStatus === 'GLYPH_AND_SECTION_MISMATCH'
              ? ('OBSERVED_SURFACE_HAS_GLYPH_AND_SECTION_MISMATCH' as const)
              : ('NO_GOVERNED_EXACT_SAME_SECTION_REPLACEMENT_SURFACE' as const),
      }),
    ),
  );

  const material = Object.freeze({
    version: GENERAL_NATAL_FIXED_WITNESS_REREGISTRATION_REVIEW_VERSION,
    issue: '#1551' as const,
    upstreamResearchIssue: '#1518' as const,
    upstreamBridgeIssue: '#1482' as const,
    handoffHash: handoff.handoffHash,
    decision: 'PRESERVE_CURRENT_FROZEN_DEFINITION' as const,
    decisionBasis: Object.freeze({
      inspectedTargetSurfaceCount: handoff.governedEvidence.inspectedTargetSurfaceCount,
      frozenExactWitnessCountPerInspectedSurface:
        handoff.governedEvidence.frozenExactWitnessCountPerInspectedSurface,
      everyInspectedTargetSurfaceIsZeroOfFour:
        handoff.governedEvidence.everyInspectedTargetSurfaceIsZeroOfFour,
      eligibleReplacementWitnessCount: witnessDecisions.filter(
        (row) => row.replacementEligibleNow,
      ).length,
      witnessDecisions,
    }),
    candidateState: Object.freeze({
      witnessMutationAuthorized: false as const,
      candidateMutationPerformed: false as const,
      candidateSurfaceVersionBumpRequiredNow: false as const,
      existingBridgeReviewInvalidatedByThisDecision: false as const,
      currentBaselineCandidateSurfaceHash:
        handoff.candidateMutationContract.currentBaselineCandidateSurfaceHash,
    }),
    routing: Object.freeze({
      bridgeReentryReady: false as const,
      bridgeDisposition: 'RETURN_TO_RESEARCH' as const,
      nextOwner: 'EXTERNAL_ACQUISITION_BACKLOG_R006_R008' as const,
      externalAcquisitionBacklog: handoff.governedEvidence.externalAcquisitionBacklog,
      reReviewTrigger:
        'NEW_GOVERNED_EXACT_SAME_SECTION_SCAN_SURFACE_FOR_ANY_FROZEN_WITNESS' as const,
      approvedReregistrationWouldRequireFreshBridgeSurface: true as const,
    }),
    authorityBoundary: handoff.authorityBoundary,
  });

  return Object.freeze({
    ...material,
    reviewHash: deterministicContentHash(material),
  });
}
