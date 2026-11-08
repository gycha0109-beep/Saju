import { describe, expect, it } from 'vitest';
import { buildGeneralNatalN27ClaimScopedBridgePreflight } from
  '../src/research/general-natal-n27-claim-scoped-bridge-preflight.js';
import { createPreviewSemanticAdmissionRegistryV1 } from
  '../src/preview/preview-semantic-admission.js';

describe('N27 Claim-scoped Bridge evidence preflight (no independent review)', () => {
  it('pins the three actual Research Claims, current RETURN_TO_RESEARCH and exact source registry identities', () => {
    const p = buildGeneralNatalN27ClaimScopedBridgePreflight();
    expect(p).toMatchObject({
      lifecycle: 'internal_bridge_preflight_not_a_governance_decision',
      trackedBridgeIssue: 2557,
      currentBridgeReentryDisposition: 'RETURN_TO_RESEARCH',
      sourceIntegrityReady: false,
      allThreeClaimsHeld: true,
      newConsumerMeaningAdmitted: false,
      actualIndependentBridgeReviewOfIssue2557Completed: false,
      mayPublish: false, maySell: false, mayCreateInterpretation: false,
    });
    expect(p.claims).toHaveLength(3);
    expect(p.claims.map(c => c.claimType)).toEqual([
      'GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE',
      'GENERAL_NATAL_OFFICER_VISIBLE_STEMS_THEME',
      'GENERAL_NATAL_OFFICER_BRANCHES_THEME',
    ]);
    expect(p.claims.every(c => c.ruleRef.contentHash.length === 64 &&
      c.sourceIds.length > 0 && c.researchLifecycle === 'research' &&
      c.provenanceQuality === 'secondary_only' && c.reviewerStatus === 'unreviewed' &&
      !c.existingConsumerPermission && c.existingPreviewAdmissionCountForOwningModule === 0 &&
      c.currentDisposition === 'HOLD' && !c.mayMaterializeNewOfficialMeaning &&
      !c.mayPromoteProduction && !c.claimScopedGovernedBridgeDecisionRecorded)).toBe(true);
    expect(p.claims[0]!.blockers).toContain(
      'FIXED_WITNESS_SOURCE_INTEGRITY_INCOMPLETE',
    );
    expect(p.claims[0]!.blockers).toContain(
      'SAMYEONG_V7_PEER_SOURCE_INTEGRITY_INCOMPLETE',
    );
    expect(p.claims[1]!.blockers).toContain('OFFICER_CHANNEL_AND_JEONG_PYEON_SUBTYPE_CONFOUNDED');
  });
  it('does not infer admission from unrelated existing Preview authority', () => {
    const allowedOther = createPreviewSemanticAdmissionRegistryV1();
    expect(allowedOther.entries.some(e => e.disposition === 'claim')).toBe(true);
    const p = buildGeneralNatalN27ClaimScopedBridgePreflight();
    expect(p.claims.every(c => c.currentDisposition === 'HOLD')).toBe(true);
    expect(p.previewAdmissionRegistryHash).toBe(allowedOther.registryHash);
    expect(p.evidenceHash).toMatch(/^[a-f0-9]{64}$/);
    expect(buildGeneralNatalN27ClaimScopedBridgePreflight().evidenceHash).toBe(p.evidenceHash);
  });
});
