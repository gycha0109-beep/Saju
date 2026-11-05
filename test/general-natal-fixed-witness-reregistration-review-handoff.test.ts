import { describe, expect, it } from 'vitest';
import { GENERAL_NATAL_BRIDGE_REENTRY_BASELINE } from '../src/research/general-natal-source-bounded-bridge-reentry-readiness.js';
import { buildGeneralNatalFixedWitnessReregistrationReviewHandoff } from '../src/research/general-natal-fixed-witness-reregistration-review-handoff.js';

describe('General Natal fixed-witness re-registration review handoff', () => {
  it('hands exactly the four divergent Yuanhai witnesses to the separate review', () => {
    const handoff = buildGeneralNatalFixedWitnessReregistrationReviewHandoff();

    expect(handoff.issue).toBe('#1551');
    expect(handoff.currentDecision).toBe('REVIEW_REQUIRED');
    expect(handoff.targetWitnesses.map((row) => row.witnessId)).toEqual([
      'W-YUANHAI-WEALTH-OFFICER',
      'W-YUANHAI-OFFICER-RESOURCE',
      'W-YUANHAI-PEER-WEALTH',
      'W-YUANHAI-WEALTH-RESOURCE',
    ]);
    expect(handoff.targetWitnesses.every((row) => row.currentSection === '四言獨步')).toBe(
      true,
    );
    expect(
      handoff.targetWitnesses.every((row) => !row.exactSameSectionIdentityEstablished),
    ).toBe(true);
  });

  it('binds the merged direct-inspection frontier instead of repeating acquisition', () => {
    const handoff = buildGeneralNatalFixedWitnessReregistrationReviewHandoff();

    expect(handoff.governedEvidence.inspectedTargetSurfaceCount).toBe(3);
    expect(handoff.governedEvidence.frozenExactWitnessCountPerInspectedSurface).toEqual([
      0,
      0,
      0,
    ]);
    expect(handoff.governedEvidence.everyInspectedTargetSurfaceIsZeroOfFour).toBe(true);
    expect(handoff.governedEvidence.externalAcquisitionBacklog.map((row) => row.researchItem)).toEqual([
      'R006',
      'R007',
      'R008',
    ]);
  });

  it('allows a review decision but no silent normalization or relocation shortcut', () => {
    const handoff = buildGeneralNatalFixedWitnessReregistrationReviewHandoff();

    expect(handoff.allowedReviewDecisions).toEqual([
      'PRESERVE_CURRENT_FROZEN_DEFINITION',
      'REREGISTER_FROM_GOVERNED_SCAN_VERIFIED_SURFACE',
    ]);
    expect(handoff.prohibitedShortcuts).toContain('GLYPH_NORMALIZATION_AS_EXACT_IDENTITY');
    expect(handoff.prohibitedShortcuts).toContain('SECTION_RELOCATION_WITHOUT_REVIEW');
    expect(handoff.prohibitedShortcuts).toContain('SILENT_FROZEN_WITNESS_MUTATION');
  });

  it('forces any approved mutation onto a fresh content-addressed Bridge surface', () => {
    const handoff = buildGeneralNatalFixedWitnessReregistrationReviewHandoff();

    expect(handoff.candidateMutationContract.mutationAuthorizedByThisHandoff).toBe(false);
    expect(handoff.candidateMutationContract.currentBaselineCandidateSurfaceHash).toBe(
      GENERAL_NATAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash,
    );
    expect(handoff.candidateMutationContract.anyReregistrationRequiresVersionedCandidateSurface).toBe(
      true,
    );
    expect(handoff.candidateMutationContract.existingBridgeReviewMayBeInheritedAfterMutation).toBe(
      false,
    );
    expect(handoff.candidateMutationContract.expectedBridgeDispositionAfterApprovedMutation).toBe(
      'FRESH_REVIEW_SURFACE_REQUIRED',
    );
  });

  it('grants no downstream authority and is deterministic', () => {
    const left = buildGeneralNatalFixedWitnessReregistrationReviewHandoff();
    const right = buildGeneralNatalFixedWitnessReregistrationReviewHandoff();

    expect(left.authorityBoundary.engineAuthorityPromotionAuthorized).toBe(false);
    expect(left.authorityBoundary.productionAdmissionAuthority).toBe(false);
    expect(left.authorityBoundary.production).toBe('HOLD');
    expect(left.handoffHash).toBe(right.handoffHash);
    expect(left.handoffHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
