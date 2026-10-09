import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_CANDIDATE_REVISION_VERSION,
  RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_RULE_IDS,
  RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS,
  buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision,
} from '../src/research/relationship-natal-general-authority-seeking-candidate-revision.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_RULES,
} from '../src/research/relationship-natal-reading-candidate.js';

describe('Relationship Natal general authority-seeking candidate revision', () => {
  it('leaves the current executable/Preview candidate untouched', () => {
    const revision =
      buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();

    expect(RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION).toBe(
      '0.5.0-research',
    );
    expect(RELATIONSHIP_NATAL_READING_RULES).toHaveLength(11);
    expect(revision.currentExecutableCandidate).toEqual({
      version: '0.5.0-research',
      ruleCount: 11,
      runtimeMutationAuthorizedByRevision: false,
      previewMutationAuthorizedByRevision: false,
    });
  });

  it('creates a separate 0.6.0 authority-seeking surface with zero rules', () => {
    const revision =
      buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();

    expect(
      RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_CANDIDATE_REVISION_VERSION,
    ).toBe('0.6.0-research-authority-seeking');
    expect(RELATIONSHIP_NATAL_GENERAL_AUTHORITY_SEEKING_RULE_IDS).toHaveLength(
      0,
    );
    expect(revision.accounting.authoritySeekingRuleCount).toBe(0);
    expect(revision.decision.anyCurrentRuleRetainedUnchangedForAuthoritySeeking).toBe(
      false,
    );
  });

  it('accounts for all 11 prior rules as nine REMOVE plus two NARROW', () => {
    const revision =
      buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();

    expect(revision.accounting.exactPriorSurfaceAccountedFor).toBe(true);
    expect(revision.accounting.priorRuleCount).toBe(11);
    expect(revision.accounting.removedPriorRuleCount).toBe(9);
    expect(revision.accounting.narrowedPriorRuleCount).toBe(2);
  });

  it('preserves exactly two NARROW paths as non-admitted Research leads', () => {
    const revision =
      buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();

    expect(RELATIONSHIP_NATAL_GENERAL_NON_ADMITTED_RESEARCH_LEADS).toHaveLength(
      2,
    );
    expect(revision.accounting.exactNarrowLeadBinding).toBe(true);
    expect(revision.accounting.nonAdmittedResearchLeadCount).toBe(2);
    expect(
      revision.nonAdmittedResearchLeads.map((lead) => lead.leadId).sort(),
    ).toEqual(
      [
        'OUTPUT_EXPRESSION_AXIS_ONLY',
        'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_WITH_EXPLICIT_CONTEXT',
      ].sort(),
    );
    expect(
      revision.nonAdmittedResearchLeads.every(
        (lead) =>
          lead.status === 'non_admitted_research_lead' &&
          lead.replacementRuleAuthoringAuthorized === false &&
          lead.engineAuthorityAuthorized === false,
      ),
    ).toBe(true);
  });

  it('invalidates reuse of the previously reviewed Bridge surface', () => {
    const revision =
      buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();

    expect(revision.bridgeSurface.reviewedBaselineReusable).toBe(false);
    expect(revision.bridgeSurface.surfaceChangedFromReviewedBaseline).toBe(
      true,
    );
    expect(
      revision.bridgeSurface.freshBridgeReviewRequiredBeforeAnyAuthorityPromotion,
    ).toBe(true);
    expect(revision.bridgeSurface.freshBridgeReviewIsEngineAdmission).toBe(
      false,
    );
  });

  it('keeps the four unresolved Research closure streams open', () => {
    const revision =
      buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();

    expect(revision.remainingResearchClosure).toEqual({
      relationshipSpecificSourceSupportComplete: false,
      tenGodToRelationshipDomainMappingAuthorityComplete: false,
      scopeQualifiersCounterexamplesComplete: false,
      schoolDependenceBoundaryComplete: false,
      exactRuleRetainNarrowRemoveDecisionComplete: true,
    });
    expect(revision.decision.revisionStructurallyComplete).toBe(true);
  });

  it('grants no downstream authority', () => {
    const revision =
      buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();

    expect(revision.decision.replacementRuleAuthoringAuthorized).toBe(false);
    expect(revision.decision.currentRuntimeMutationAuthorized).toBe(false);
    expect(revision.decision.previewMutationAuthorized).toBe(false);
    expect(revision.decision.bridgeAuthorityPromotionAuthorized).toBe(false);
    expect(revision.decision.g2aAdmissionAuthorized).toBe(false);
    expect(revision.authorityBoundary.g2aAdmitted).toBe(false);
    expect(revision.authorityBoundary.production).toBe('HOLD');
  });

  it('is deterministic and content addressed', () => {
    const left =
      buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();
    const right =
      buildRelationshipNatalGeneralAuthoritySeekingCandidateRevision();

    expect(left).toEqual(right);
    expect(left.revisionId).toBe(right.revisionId);
    expect(left.revisionId).toMatch(
      /^relationship_natal_general_authority_seeking_candidate_revision_[a-f0-9]{24}$/,
    );
  });
});
