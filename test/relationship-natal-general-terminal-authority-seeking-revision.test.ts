import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_NATAL_GENERAL_FUTURE_CANDIDATE_REQUIREMENTS,
  RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_RULE_IDS,
  RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_SEEKING_REVISION_VERSION,
  RELATIONSHIP_NATAL_GENERAL_TERMINAL_REPLACEMENT_LEADS,
  buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision,
} from '../src/research/relationship-natal-general-terminal-authority-seeking-revision.js';

describe('Relationship Natal general terminal authority-seeking revision', () => {
  it('consolidates the two abandoned replacement leads', () => {
    const revision =
      buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision();

    expect(revision.checks.outputLeadTerminal).toBe(true);
    expect(revision.checks.peerWealthLeadTerminal).toBe(true);
    expect(revision.accounting.abandonedRelationshipReplacementLeadCount).toBe(
      2,
    );
  });

  it('materializes a terminal zero-rule zero-lead authority surface', () => {
    const revision =
      buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision();

    expect(
      RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_SEEKING_REVISION_VERSION,
    ).toBe('0.7.0-research-authority-seeking-terminal');
    expect(RELATIONSHIP_NATAL_GENERAL_TERMINAL_AUTHORITY_RULE_IDS).toHaveLength(
      0,
    );
    expect(RELATIONSHIP_NATAL_GENERAL_TERMINAL_REPLACEMENT_LEADS).toHaveLength(
      0,
    );
    expect(revision.accounting.authoritySeekingRuleCount).toBe(0);
    expect(revision.accounting.relationshipReplacementLeadCount).toBe(0);
    expect(revision.decision.semanticAdmissionCandidatePresent).toBe(false);
    expect(revision.decision.relationshipReplacementResearchLeadPresent).toBe(
      false,
    );
  });

  it('preserves the current 0.5.0 Preview/runtime candidate without treating it as authority-seeking', () => {
    const revision =
      buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision();

    expect(revision.checks.currentPreviewRuntimeSurfacePreserved).toBe(true);
    expect(revision.currentExecutableCandidate.version).toBe('0.5.0-research');
    expect(revision.currentExecutableCandidate.ruleCount).toBe(11);
    expect(revision.currentExecutableCandidate.authoritySeekingSurface).toBe(
      false,
    );
    expect(
      revision.currentExecutableCandidate.runtimeMutationAuthorizedByTerminalRevision,
    ).toBe(false);
  });

  it('does not fake source closure when no semantic candidate remains', () => {
    const revision =
      buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision();

    expect(RELATIONSHIP_NATAL_GENERAL_FUTURE_CANDIDATE_REQUIREMENTS).toHaveLength(
      4,
    );
    expect(
      revision.researchRequirementState.futureResearchRequirementsGloballyResolved,
    ).toBe(false);
    expect(
      revision.researchRequirementState
        .futureResearchRequirementsApplicableToCurrentTerminalSurface,
    ).toBe(false);
    expect(
      revision.researchRequirementState
        .currentTerminalSurfaceResearchRequirementDisposition,
    ).toBe('NOT_APPLICABLE_NO_SEMANTIC_CANDIDATE');
    expect(
      revision.researchRequirementState
        .futureNewCandidateMustReopenResearchRequirements,
    ).toBe(true);
  });

  it('requires a fresh Bridge re-review for the changed terminal revision', () => {
    const revision =
      buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision();

    expect(revision.checks.priorFreshBridgeReturnedToResearch).toBe(true);
    expect(revision.bridgeSurface.terminalSurfaceChangedFromPriorRevision).toBe(
      true,
    );
    expect(
      revision.bridgeSurface.priorFreshBridgeReviewReusableForTerminalRevision,
    ).toBe(false);
    expect(
      revision.bridgeSurface.freshBridgeRereviewRequiredToCloseTerminalSurface,
    ).toBe(true);
    expect(
      revision.bridgeSurface.freshBridgeRereviewCanCreateSemanticCandidate,
    ).toBe(false);
  });

  it('is structurally complete but grants no downstream authority', () => {
    const revision =
      buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision();

    expect(revision.decision.terminalRevisionStructurallyComplete).toBe(true);
    expect(revision.decision.relationshipSemanticAuthorityEstablished).toBe(
      false,
    );
    expect(revision.decision.currentRuntimeMutationAuthorized).toBe(false);
    expect(revision.decision.previewMutationAuthorized).toBe(false);
    expect(revision.decision.bridgeAdmissionAuthorized).toBe(false);
    expect(
      revision.decision.boundedEngineDevelopmentAdmissionAuthorized,
    ).toBe(false);
    expect(revision.decision.g2aAdmissionAuthorized).toBe(false);
    expect(revision.decision.production).toBe('HOLD');
  });

  it('is deterministic and content addressed', () => {
    const left =
      buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision();
    const right =
      buildRelationshipNatalGeneralTerminalAuthoritySeekingRevision();

    expect(left).toEqual(right);
    expect(left.revisionId).toBe(right.revisionId);
    expect(left.revisionId).toMatch(
      /^relationship_natal_general_terminal_authority_seeking_revision_[a-f0-9]{24}$/,
    );
  });
});
