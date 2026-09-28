import { describe, expect, it } from 'vitest';
import { buildRelationshipNatalGeneralBridgeReentryReadiness } from '../src/research/relationship-natal-general-bridge-reentry-readiness.js';
import {
  RELATIONSHIP_NATAL_GENERAL_RULE_SOURCE_DISCOVERY_MATRIX,
  RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_SOURCES,
  buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence,
} from '../src/research/relationship-natal-general-source-authority-discovery-evidence.js';
import { RELATIONSHIP_NATAL_READING_RULES } from '../src/research/relationship-natal-reading-candidate.js';

describe('Relationship Natal general source-authority discovery evidence', () => {
  it('covers the exact current 11-rule surface', () => {
    const evidence =
      buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence();

    expect(evidence.exactCurrentRuleSurface).toBe(true);
    expect(evidence.ruleCount).toBe(11);
    expect(RELATIONSHIP_NATAL_GENERAL_RULE_SOURCE_DISCOVERY_MATRIX).toHaveLength(
      11,
    );
    expect(
      RELATIONSHIP_NATAL_GENERAL_RULE_SOURCE_DISCOVERY_MATRIX
        .map((row) => row.ruleId)
        .sort(),
    ).toEqual(RELATIONSHIP_NATAL_READING_RULES.map((rule) => rule.ruleId).sort());
  });

  it('records scholarly and discovery sources without treating any as rule-level authority', () => {
    const evidence =
      buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence();

    expect(evidence.sourceRecordCount).toBe(5);
    expect(RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_SOURCES).toHaveLength(
      5,
    );
    expect(
      RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_SOURCES.some(
        (source) => source.sourceClass === 'graduate_thesis',
      ),
    ).toBe(true);
    expect(
      RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_SOURCES.some(
        (source) => source.sourceClass === 'non_scholarly_web_discovery_lead',
      ),
    ).toBe(true);
    expect(
      RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_SOURCES.every(
        (source) => source.exactRuleLevelRelationshipMappingEstablished === false,
      ),
    ).toBe(true);
    expect(
      RELATIONSHIP_NATAL_GENERAL_SOURCE_AUTHORITY_DISCOVERY_SOURCES.every(
        (source) => source.authorityAdmissionAdequate === false,
      ),
    ).toBe(true);
  });

  it('does not finalize retain/remove decisions during phase 1', () => {
    const evidence =
      buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence();

    expect(evidence.directlyAuthorityReadyRuleCount).toBe(0);
    expect(evidence.finalRetainDecisionCount).toBe(0);
    expect(evidence.finalRemoveDecisionCount).toBe(0);
    expect(evidence.narrowCandidateCount).toBe(5);
    expect(evidence.removeIfUnsupportedCount).toBe(6);
    expect(
      evidence.ruleMatrix.every(
        (row) =>
          row.directCurrentWordingAuthorityEstablished === false &&
          row.relationshipDomainMappingAuthorityEstablished === false,
      ),
    ).toBe(true);
  });

  it('keeps all Research closure streams false and Bridge re-entry closed', () => {
    const evidence =
      buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence();
    const reentry = buildRelationshipNatalGeneralBridgeReentryReadiness();

    expect(evidence.researchClosure).toEqual({
      relationshipSpecificSourceSupportComplete: false,
      tenGodToRelationshipDomainMappingAuthorityComplete: false,
      scopeQualifiersCounterexamplesComplete: false,
      schoolDependenceBoundaryComplete: false,
      exactRuleRetainNarrowRemoveDecisionComplete: false,
    });
    expect(evidence.decision.bridgeReentryReady).toBe(false);
    expect(evidence.decision.engineAuthorityAdmissionReady).toBe(false);
    expect(reentry.nextDisposition).toBe('RETURN_TO_RESEARCH');
    expect(reentry.bridgeReentryReady).toBe(false);
  });

  it('keeps Production and downstream authority closed', () => {
    const evidence =
      buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence();

    expect(evidence.authorityBoundary).toEqual({
      sourceGroundedAiInternalReviewPassed: false,
      g2aAdmitted: false,
      previewExpansionAuthorized: false,
      officialReadingExpansionAuthorized: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
    });
  });

  it('is deterministic', () => {
    const left =
      buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence();
    const right =
      buildRelationshipNatalGeneralSourceAuthorityDiscoveryEvidence();

    expect(left).toEqual(right);
    expect(left.evidenceId).toBe(right.evidenceId);
    expect(left.evidenceId).toMatch(
      /^relationship_natal_general_source_authority_discovery_[a-f0-9]{24}$/,
    );
  });
});
