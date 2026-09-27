import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_NATAL_READING_RULES,
} from '../src/research/relationship-natal-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_GENERAL_BRIDGE_REENTRY_BASELINE,
  buildRelationshipNatalGeneralBridgeReentryReadiness,
  collectRelationshipNatalGeneralBridgeReentryEvidence,
  evaluateRelationshipNatalGeneralBridgeReentryReadiness,
} from '../src/research/relationship-natal-general-bridge-reentry-readiness.js';
import {
  RELATIONSHIP_NATAL_GENERAL_REVIEWED_CANDIDATE_BLOB_SHA,
  RELATIONSHIP_NATAL_GENERAL_REVIEWED_RULE_IDS,
  buildRelationshipNatalGeneralResearchReturnHandoff,
} from '../src/research/relationship-natal-general-research-return-handoff.js';

describe('Relationship Natal general Research-return handoff / Bridge re-entry gate', () => {
  it('pins the exact reviewed 0.5.0 candidate surface and 11 rule IDs', () => {
    const handoff = buildRelationshipNatalGeneralResearchReturnHandoff();

    expect(handoff.candidateBinding.candidateVersion).toBe('0.5.0-research');
    expect(handoff.candidateBinding.relationshipRuleCount).toBe(11);
    expect(handoff.candidateBinding.reviewedCandidateDefinitionBlobSha).toBe(
      'a6f3e958f7b2b521c5c4e38be746cd8475af1109',
    );
    expect(handoff.candidateBinding.ruleIds).toEqual(
      [...RELATIONSHIP_NATAL_GENERAL_REVIEWED_RULE_IDS].sort(),
    );
    expect(
      RELATIONSHIP_NATAL_READING_RULES.map((rule) => rule.ruleId).sort(),
    ).toEqual([...RELATIONSHIP_NATAL_GENERAL_REVIEWED_RULE_IDS].sort());
    expect(RELATIONSHIP_NATAL_GENERAL_REVIEWED_CANDIDATE_BLOB_SHA).toBe(
      'a6f3e958f7b2b521c5c4e38be746cd8475af1109',
    );
  });

  it('materializes exactly five Research closure workstreams with all current readiness false', () => {
    const handoff = buildRelationshipNatalGeneralResearchReturnHandoff();

    expect(handoff.upstreamBridgeReview.bridgeDecision).toBe(
      'RETURN_TO_RESEARCH',
    );
    expect(handoff.researchReturnRequired).toBe(true);
    expect(handoff.workstreams).toHaveLength(5);
    expect(handoff.workstreams.every((stream) => stream.currentReady === false)).toBe(
      true,
    );
    expect(handoff.workstreams.every((stream) => stream.issue === '#1807')).toBe(
      true,
    );
    expect(handoff.authorityBoundary.production).toBe('HOLD');
    expect(handoff.authorityBoundary.g2aAdmitted).toBe(false);
  });

  it('keeps the current live repository at RETURN_TO_RESEARCH', () => {
    const readiness = buildRelationshipNatalGeneralBridgeReentryReadiness();

    expect(readiness.candidateBindingFresh).toBe(true);
    expect(readiness.researchClosureReady).toBe(false);
    expect(readiness.bridgeReentryReady).toBe(false);
    expect(readiness.nextDisposition).toBe('RETURN_TO_RESEARCH');
    expect(readiness.remainingResearchBlockers).toHaveLength(5);
    expect(readiness.authorityBoundary.production).toBe('HOLD');
  });

  it('fails closed to a fresh review surface when the candidate surface drifts', () => {
    const evidence = collectRelationshipNatalGeneralBridgeReentryEvidence();
    const readiness = evaluateRelationshipNatalGeneralBridgeReentryReadiness({
      ...evidence,
      candidateSurface: {
        ...evidence.candidateSurface,
        ruleIds: [...evidence.candidateSurface.ruleIds, 'DRIFTED-RULE-ID'],
      },
    });

    expect(readiness.candidateBindingFresh).toBe(false);
    expect(readiness.bridgeReentryReady).toBe(false);
    expect(readiness.nextDisposition).toBe('FRESH_REVIEW_SURFACE_REQUIRED');
  });

  it('allows only READY_FOR_BRIDGE_REREVIEW after all Research closure evidence is true', () => {
    const evidence = collectRelationshipNatalGeneralBridgeReentryEvidence();
    const readiness = evaluateRelationshipNatalGeneralBridgeReentryReadiness({
      ...evidence,
      researchClosure: {
        relationshipSpecificSourceSupportComplete: true,
        tenGodToRelationshipDomainMappingAuthorityComplete: true,
        scopeQualifiersCounterexamplesComplete: true,
        schoolDependenceBoundaryComplete: true,
        exactRuleRetainNarrowRemoveDecisionComplete: true,
      },
    });

    expect(readiness.candidateBindingFresh).toBe(true);
    expect(readiness.researchClosureReady).toBe(true);
    expect(readiness.bridgeReentryReady).toBe(true);
    expect(readiness.nextDisposition).toBe('READY_FOR_BRIDGE_REREVIEW');
    expect(readiness.remainingResearchBlockers).toEqual([]);
    expect(readiness.authorityBoundary.readyForBridgeRereviewIsEngineAdmission).toBe(
      false,
    );
    expect(readiness.authorityBoundary.g2aAdmitted).toBe(false);
    expect(readiness.authorityBoundary.production).toBe('HOLD');
  });

  it('is deterministic', () => {
    const left = buildRelationshipNatalGeneralBridgeReentryReadiness();
    const right = buildRelationshipNatalGeneralBridgeReentryReadiness();
    const handoffLeft = buildRelationshipNatalGeneralResearchReturnHandoff();
    const handoffRight = buildRelationshipNatalGeneralResearchReturnHandoff();

    expect(left).toEqual(right);
    expect(left.readinessHash).toBe(right.readinessHash);
    expect(left.readinessHash).toMatch(/^[a-f0-9]{64}$/);
    expect(handoffLeft).toEqual(handoffRight);
    expect(handoffLeft.handoffHash).toBe(handoffRight.handoffHash);
    expect(
      RELATIONSHIP_NATAL_GENERAL_BRIDGE_REENTRY_BASELINE.candidateSurfaceHash,
    ).toMatch(/^[a-f0-9]{64}$/);
  });
});
