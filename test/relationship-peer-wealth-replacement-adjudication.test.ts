import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_PEER_WEALTH_ADJUDICATION_SOURCES,
  RELATIONSHIP_PEER_WEALTH_REQUIRED_CONTEXT_PREDICATES,
  buildRelationshipPeerWealthReplacementAdjudication,
} from '../src/research/relationship-peer-wealth-replacement-adjudication.js';

describe('Relationship conditional Peer+Wealth replacement adjudication', () => {
  it('binds exactly to the final non-admitted Relationship replacement lead', () => {
    const result = buildRelationshipPeerWealthReplacementAdjudication();

    expect(result.exactLeadBound).toBe(true);
    expect(result.leadId).toBe(
      'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_WITH_EXPLICIT_CONTEXT',
    );
  });

  it('records direct classical pattern inspection without reducing it to family presence', () => {
    const result = buildRelationshipPeerWealthReplacementAdjudication();

    expect(RELATIONSHIP_PEER_WEALTH_ADJUDICATION_SOURCES).toHaveLength(3);
    expect(result.findings.primaryClassicalPatternDirectlyInspected).toBe(true);
    expect(result.findings.conditionalPatternEstablished).toBe(true);
    expect(result.findings.simplePeerWealthPresenceSufficient).toBe(false);
  });

  it('keeps the exact contextual predicate contract from Phase 3', () => {
    const result = buildRelationshipPeerWealthReplacementAdjudication();

    expect(RELATIONSHIP_PEER_WEALTH_REQUIRED_CONTEXT_PREDICATES).toHaveLength(7);
    expect(result.findings.requiredPredicatesMatchPhase3).toBe(true);
    expect(result.findings.runtimeBoundaryPreserved).toBe(true);
    expect(
      result.findings.canonicalExecutableWealthPatternResolverAuthorized,
    ).toBe(false);
    expect(
      result.findings.canonicalExecutablePeerWealthRelationResolverAuthorized,
    ).toBe(false);
  });

  it('rejects classical wealth-pattern evidence as a modern general Relationship mapping', () => {
    const result = buildRelationshipPeerWealthReplacementAdjudication();

    expect(
      result.findings.roleNeutralGeneralRelationshipMappingEstablished,
    ).toBe(false);
    expect(result.findings.modernSharedResourceNarrativeEstablished).toBe(false);
    expect(
      result.findings.historicalGenderedKinRoleMayAuthorizeGeneralRelationship,
    ).toBe(false);
    expect(result.findings.crossDomainReinterpretationWouldBeRequired).toBe(
      true,
    );
  });

  it('abandons the lead as a Relationship replacement while preserving generic pattern research', () => {
    const result = buildRelationshipPeerWealthReplacementAdjudication();

    expect(result.findings.relationshipReplacementViable).toBe(false);
    expect(result.decision.adjudicationComplete).toBe(true);
    expect(result.decision.disposition).toBe(
      'ABANDON_AS_RELATIONSHIP_REPLACEMENT_LEAD',
    );
    expect(
      result.decision.genericPeerWealthPatternResearchMayContinueOutsideRelationship,
    ).toBe(true);
    expect(result.decision.nextAuthoritySeekingRevisionShouldCarryThisLead).toBe(
      false,
    );
  });

  it('leaves no Relationship replacement leads after both narrowed paths are adjudicated', () => {
    const result = buildRelationshipPeerWealthReplacementAdjudication();

    expect(result.remainingRelationshipReplacementLeadsAfterThisAdjudication).toEqual(
      [],
    );
  });

  it('grants no runtime or downstream authority', () => {
    const result = buildRelationshipPeerWealthReplacementAdjudication();

    expect(result.decision.currentRevisionMutationAuthorizedByThisArtifact).toBe(
      false,
    );
    expect(result.decision.runtimeMutationAuthorized).toBe(false);
    expect(result.decision.previewMutationAuthorized).toBe(false);
    expect(result.decision.bridgeAdmissionAuthorized).toBe(false);
    expect(result.decision.g2aAdmissionAuthorized).toBe(false);
    expect(result.authorityBoundary.production).toBe('HOLD');
  });

  it('is deterministic', () => {
    const left = buildRelationshipPeerWealthReplacementAdjudication();
    const right = buildRelationshipPeerWealthReplacementAdjudication();

    expect(left).toEqual(right);
    expect(left.adjudicationId).toBe(right.adjudicationId);
    expect(left.adjudicationId).toMatch(
      /^relationship_peer_wealth_replacement_adjudication_[a-f0-9]{24}$/,
    );
  });
});
