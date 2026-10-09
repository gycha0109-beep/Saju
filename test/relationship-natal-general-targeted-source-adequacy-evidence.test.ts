import { describe, expect, it } from 'vitest';
import { buildRelationshipNatalGeneralBridgeReentryReadiness } from '../src/research/relationship-natal-general-bridge-reentry-readiness.js';
import {
  RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY,
  RELATIONSHIP_NATAL_GENERAL_TARGETED_SOURCE_RECORDS,
  buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence,
} from '../src/research/relationship-natal-general-targeted-source-adequacy-evidence.js';

describe('Relationship Natal general targeted source adequacy', () => {
  it('targets exactly the five Phase-1 NARROW candidates', () => {
    const evidence =
      buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence();

    expect(evidence.exactPhase1NarrowSurface).toBe(true);
    expect(evidence.targetedRuleCount).toBe(5);
    expect(RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY).toHaveLength(5);
  });

  it('records stronger scholarly/context sources without promoting any exact rule', () => {
    const evidence =
      buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence();

    expect(evidence.sourceRecordCount).toBe(7);
    expect(RELATIONSHIP_NATAL_GENERAL_TARGETED_SOURCE_RECORDS).toHaveLength(7);
    expect(
      RELATIONSHIP_NATAL_GENERAL_TARGETED_SOURCE_RECORDS.some(
        (source) => source.sourceClass === 'kci_scholarly_journal_article',
      ),
    ).toBe(true);
    expect(
      RELATIONSHIP_NATAL_GENERAL_TARGETED_SOURCE_RECORDS.every(
        (source) => source.exactCurrentRuleMappingEstablished === false,
      ),
    ).toBe(true);
    expect(
      RELATIONSHIP_NATAL_GENERAL_TARGETED_SOURCE_RECORDS.every(
        (source) => source.authorityAdmissionAdequate === false,
      ),
    ).toBe(true);
  });

  it('confirms the current five rules consume coarse family-presence inputs only', () => {
    const evidence =
      buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence();

    expect(evidence.inputGranularityConfirmed).toBe(true);
    expect(
      evidence.targetedRuleAdequacy.every(
        (row) => row.currentInputGranularity === 'FAMILY_PRESENCE_ONLY',
      ),
    ).toBe(true);
  });

  it('does not authorize unchanged retention for any targeted rule', () => {
    const evidence =
      buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence();

    expect(evidence.exactRuleAuthorityEstablishedCount).toBe(0);
    expect(evidence.unchangedRetentionAuthorizedCount).toBe(0);
    expect(evidence.narrowerRuleResearchPathCount).toBe(2);
    expect(
      evidence.targetedRuleAdequacy.every(
        (row) =>
          row.exactRuleAuthorityEstablished === false &&
          row.currentRuleMayBeRetainedUnchanged === false,
      ),
    ).toBe(true);
  });

  it('preserves context-sensitivity findings against family-level universalization', () => {
    const evidence =
      buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence();

    expect(evidence.contextSensitivity).toEqual({
      sameTenGodMayVaryByElementAndYinYang: true,
      sameTenGodPsychologyMayVaryByElementAndStrength: true,
      modernRelationshipRoleMappingsRequireExplicitReinterpretation: true,
      familyPresenceAloneEstablishedAsUniversalRelationshipRuleInput: false,
    });
    expect(evidence.phase2Finding).toBe(
      'ZERO_OF_FIVE_NARROW_CANDIDATES_IS_AUTHORITY_READY_UNCHANGED_AND_CURRENT_FAMILY_PRESENCE_INPUTS_ARE_TOO_COARSE_FOR_THE_STRONGEST_CONTEXT_SENSITIVE_EVIDENCE',
    );
  });

  it('keeps the peer-plus-wealth candidate separate from conditional 群劫爭財', () => {
    const row = RELATIONSHIP_NATAL_GENERAL_TARGETED_RULE_ADEQUACY.find(
      (candidate) =>
        candidate.ruleId ===
        'RULE-RELATIONSHIP-NATAL-PEER-WEALTH-MY-CHOICE-VS-SHARED-RESOURCE',
    );

    expect(row?.disposition).toBe(
      'CONDITIONAL_CLASSICAL_PATTERN_MISMATCHES_CURRENT_INPUT_GRANULARITY',
    );
    expect(row?.currentRuleMayBeRetainedUnchanged).toBe(false);
    expect(
      row && 'narrowerResearchTarget' in row
        ? row.narrowerResearchTarget
        : undefined,
    ).toBe(
      'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION_OBSERVATION_WITH_EXPLICIT_CONTEXT_PREDICATES',
    );
  });

  it('keeps all Bridge and downstream authority closed', () => {
    const evidence =
      buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence();
    const reentry = buildRelationshipNatalGeneralBridgeReentryReadiness();

    expect(evidence.decision.phase2Complete).toBe(true);
    expect(evidence.researchClosure).toEqual({
      relationshipSpecificSourceSupportComplete: false,
      tenGodToRelationshipDomainMappingAuthorityComplete: false,
      scopeQualifiersCounterexamplesComplete: false,
      schoolDependenceBoundaryComplete: false,
      exactRuleRetainNarrowRemoveDecisionComplete: false,
    });
    expect(evidence.decision.bridgeReentryReady).toBe(false);
    expect(evidence.decision.engineAuthorityAdmissionReady).toBe(false);
    expect(evidence.authorityBoundary.production).toBe('HOLD');
    expect(reentry.nextDisposition).toBe('RETURN_TO_RESEARCH');
  });

  it('is deterministic', () => {
    const left =
      buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence();
    const right =
      buildRelationshipNatalGeneralTargetedSourceAdequacyEvidence();

    expect(left).toEqual(right);
    expect(left.evidenceId).toBe(right.evidenceId);
    expect(left.evidenceId).toMatch(
      /^relationship_natal_general_targeted_source_adequacy_[a-f0-9]{24}$/,
    );
  });
});
