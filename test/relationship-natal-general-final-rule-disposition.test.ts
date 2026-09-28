import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS,
  buildRelationshipNatalGeneralFinalRuleDisposition,
} from '../src/research/relationship-natal-general-final-rule-disposition.js';
import {
  buildRelationshipNatalGeneralBridgeReentryReadiness,
} from '../src/research/relationship-natal-general-bridge-reentry-readiness.js';

describe('Relationship Natal general final RETAIN/NARROW/REMOVE disposition', () => {
  it('covers the exact current 11-rule surface', () => {
    const result = buildRelationshipNatalGeneralFinalRuleDisposition();

    expect(result.currentSurfaceExact).toBe(true);
    expect(result.counts.ruleCount).toBe(11);
    expect(RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS).toHaveLength(11);
  });

  it('freezes zero RETAIN, two NARROW, and nine REMOVE decisions', () => {
    const result = buildRelationshipNatalGeneralFinalRuleDisposition();

    expect(result.counts).toEqual({
      ruleCount: 11,
      retainCount: 0,
      narrowCount: 2,
      removeCount: 9,
      currentRuleRetainedCount: 0,
      replacementRuleAuthoringAuthorizedCount: 0,
    });
    expect(result.decision.exactRuleRetainNarrowRemoveDecisionComplete).toBe(
      true,
    );
  });

  it('preserves only Output expression and conditional Peer+Wealth as non-admitted research leads', () => {
    const narrowed = RELATIONSHIP_NATAL_GENERAL_FINAL_RULE_DISPOSITIONS.filter(
      (row) => row.finalDisposition === 'NARROW',
    );

    expect(narrowed.map((row) => row.ruleId).sort()).toEqual(
      [
        'RULE-RELATIONSHIP-NATAL-OUTPUT-EXPRESS-TO-CONNECT',
        'RULE-RELATIONSHIP-NATAL-PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
      ].sort(),
    );
    expect(narrowed.every((row) => row.currentRuleRetained === false)).toBe(true);
    expect(
      narrowed.every((row) => row.replacementRuleAuthoringAuthorized === false),
    ).toBe(true);
  });

  it('does not authorize direct runtime mutation or downstream authority', () => {
    const result = buildRelationshipNatalGeneralFinalRuleDisposition();

    expect(
      result.decision.currentRuntimeMutationAuthorizedByThisResearchArtifact,
    ).toBe(false);
    expect(result.decision.narrowedResearchLeadsAreAdmittedRelationshipRules).toBe(
      false,
    );
    expect(result.authorityBoundary.g2aAdmitted).toBe(false);
    expect(result.authorityBoundary.production).toBe('HOLD');
  });

  it('closes only the exact rule-disposition blocker in the live re-entry gate', () => {
    const readiness = buildRelationshipNatalGeneralBridgeReentryReadiness();

    expect(
      readiness.researchClosure.exactRuleRetainNarrowRemoveDecisionComplete,
    ).toBe(true);
    expect(readiness.researchClosure.relationshipSpecificSourceSupportComplete).toBe(
      false,
    );
    expect(
      readiness.researchClosure.tenGodToRelationshipDomainMappingAuthorityComplete,
    ).toBe(false);
    expect(readiness.remainingResearchBlockers).toHaveLength(4);
    expect(readiness.remainingResearchBlockers).not.toContain(
      'EXACT_11_RULE_RETAIN_NARROW_REMOVE_DECISION_INCOMPLETE',
    );
    expect(readiness.nextDisposition).toBe('RETURN_TO_RESEARCH');
  });

  it('is deterministic', () => {
    const left = buildRelationshipNatalGeneralFinalRuleDisposition();
    const right = buildRelationshipNatalGeneralFinalRuleDisposition();

    expect(left).toEqual(right);
    expect(left.dispositionId).toBe(right.dispositionId);
    expect(left.dispositionId).toMatch(
      /^relationship_natal_general_final_rule_disposition_[a-f0-9]{24}$/,
    );
  });
});
