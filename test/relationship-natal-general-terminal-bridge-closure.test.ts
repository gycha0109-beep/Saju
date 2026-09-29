import { describe, expect, it } from 'vitest';
import {
  buildRelationshipNatalGeneralTerminalBridgeClosure,
} from '../src/research/relationship-natal-general-terminal-bridge-closure.js';

describe('Relationship Natal general terminal Bridge closure', () => {
  it('binds exactly to the 0.7.0 terminal authority-seeking revision', () => {
    const closure = buildRelationshipNatalGeneralTerminalBridgeClosure();

    expect(closure.reviewedCandidateVersion).toBe(
      '0.7.0-research-authority-seeking-terminal',
    );
    expect(closure.checks.exactTerminalVersion).toBe(true);
    expect(closure.checks.terminalRevisionStructurallyComplete).toBe(true);
  });

  it('confirms there are zero authority rules and zero replacement leads', () => {
    const closure = buildRelationshipNatalGeneralTerminalBridgeClosure();

    expect(closure.checks.zeroAuthoritySeekingRules).toBe(true);
    expect(closure.checks.zeroRelationshipReplacementLeads).toBe(true);
    expect(closure.currentSurface.authoritySeekingRuleCount).toBe(0);
    expect(closure.currentSurface.relationshipReplacementLeadCount).toBe(0);
    expect(closure.currentSurface.semanticAdmissionCandidatePresent).toBe(false);
    expect(closure.currentSurface.currentResearchReturnTargetPresent).toBe(false);
  });

  it('preserves the existing Preview/runtime surface without granting it authority', () => {
    const closure = buildRelationshipNatalGeneralTerminalBridgeClosure();

    expect(closure.checks.currentPreviewRuntimeIsolated).toBe(true);
    expect(closure.currentSurface.currentPreviewRuntimeSurfacePreserved).toBe(
      true,
    );
    expect(
      closure.currentSurface
        .currentPreviewRuntimeSurfaceIsAuthoritySeekingSurface,
    ).toBe(false);
    expect(closure.decision.previewMutationAuthorized).toBe(false);
  });

  it('does not fake source closure and requires any future candidate to reopen Research', () => {
    const closure = buildRelationshipNatalGeneralTerminalBridgeClosure();

    expect(closure.checks.researchRequirementsNotFalselyResolved).toBe(true);
    expect(
      closure.futureCandidateBoundary.futureResearchRequirementsGloballyResolved,
    ).toBe(false);
    expect(
      closure.futureCandidateBoundary.currentTerminalSurfaceRequirementsApplicable,
    ).toBe(false);
    expect(
      closure.futureCandidateBoundary
        .futureNewCandidateMustReopenResearchRequirements,
    ).toBe(true);
    expect(
      closure.futureCandidateBoundary.futureNewCandidateRequiresNewBridgeReview,
    ).toBe(true);
    expect(closure.futureCandidateBoundary.capabilityPermanentlyClosed).toBe(
      false,
    );
  });

  it('closes the current Bridge surface without admitting semantics', () => {
    const closure = buildRelationshipNatalGeneralTerminalBridgeClosure();

    expect(closure.terminalSurfaceRepresentable).toBe(true);
    expect(closure.decision.terminalBridgeReviewCompleted).toBe(true);
    expect(closure.decision.bridgeDecision).toBe(
      'CLOSED_NO_SEMANTIC_CANDIDATE',
    );
    expect(closure.decision.bridgeTrackClosedForCurrentSurface).toBe(true);
    expect(closure.decision.returnToResearchRequiredForCurrentSurface).toBe(
      false,
    );
    expect(closure.decision.semanticAdmissionCandidatePresent).toBe(false);
    expect(closure.decision.bridgeSemanticAdmissionAuthorized).toBe(false);
  });

  it('does not route the terminal surface into Engine intake', () => {
    const closure = buildRelationshipNatalGeneralTerminalBridgeClosure();

    expect(closure.decision.engineAuthorityPromotionAuthorized).toBe(false);
    expect(
      closure.decision.boundedEngineDevelopmentAdmissionAuthorized,
    ).toBe(false);
    expect(closure.decision.currentSurfaceMayEnterEngineIntake).toBe(false);
    expect(closure.decision.g2aAdmitted).toBe(false);
    expect(closure.decision.capabilityAuthorityDisposition).toBe(
      'UNADMITTED_NO_CURRENT_SEMANTIC_CANDIDATE',
    );
  });

  it('keeps Official Reading, lifecycle, and Production fail-closed', () => {
    const closure = buildRelationshipNatalGeneralTerminalBridgeClosure();

    expect(closure.checks.noDownstreamAuthorityAlreadyGranted).toBe(true);
    expect(closure.decision.officialReadingExpansionAuthorized).toBe(false);
    expect(closure.decision.lifecyclePromotionAuthorized).toBe(false);
    expect(closure.decision.productionAdmissionAuthorized).toBe(false);
    expect(closure.decision.production).toBe('HOLD');
  });

  it('is deterministic and content addressed', () => {
    const left = buildRelationshipNatalGeneralTerminalBridgeClosure();
    const right = buildRelationshipNatalGeneralTerminalBridgeClosure();

    expect(left).toEqual(right);
    expect(left.closureId).toBe(right.closureId);
    expect(left.closureId).toMatch(
      /^relationship_natal_general_terminal_bridge_closure_[a-f0-9]{24}$/,
    );
  });
});
