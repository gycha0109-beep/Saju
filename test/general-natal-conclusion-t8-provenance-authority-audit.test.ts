import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_RULES,
  createGeneralNatalConclusionCandidateRegistry,
} from '../src/research/general-natal-conclusion-synthesis-candidate.js';
import { buildGeneralNatalConclusionT8ProvenanceAuthorityAudit } from '../src/research/general-natal-conclusion-t8-provenance-authority-audit.js';

describe('General Natal conclusion T8 Production provenance authority audit', () => {
  test('binds the audit to the exact fifteen current conclusion rules', () => {
    const audit = buildGeneralNatalConclusionT8ProvenanceAuthorityAudit();
    const expectedIds = [
      ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
      ...GENERAL_NATAL_CONCLUSION_RULES,
    ]
      .map((rule) => rule.ruleId)
      .sort();

    expect(audit.auditBaseSha).toBe('61544574bae80a06a0b08e9bced950d860388973');
    expect(audit.counts.exactRuleCount).toBe(15);
    expect(audit.rules.map((row) => row.ruleId).sort()).toEqual(expectedIds);
    expect(new Set(audit.rules.map((row) => row.ruleId)).size).toBe(15);
    for (const row of audit.rules) expect(row.contentHash).toMatch(/^[a-f0-9]{64}$/);
  });

  test('records both registered classical sources without mutating their source tiers', () => {
    const registry = createGeneralNatalConclusionCandidateRegistry();
    const audit = buildGeneralNatalConclusionT8ProvenanceAuthorityAudit();

    expect(audit.sourceWitnesses).toHaveLength(2);
    expect(audit.sourceWitnesses.map((source) => source.sourceId).sort()).toEqual(
      registry.sources.map((source) => source.sourceId).sort(),
    );
    expect(new Set(audit.sourceWitnesses.map((source) => source.provenanceTier))).toEqual(
      new Set(['cross_reference']),
    );
    expect(audit.sourceWitnesses.every((source) => source.anchors.length > 0)).toBe(true);
    expect(audit.sourceWitnesses.every((source) => !source.repositoryPassageChecksumBound)).toBe(
      true,
    );
    expect(audit.sourceWitnesses.every((source) => !source.immutableExternalWitnessBound)).toBe(
      true,
    );
  });

  test('distinguishes structural evidence from exact consumer-output provenance', () => {
    const audit = buildGeneralNatalConclusionT8ProvenanceAuthorityAudit();

    expect(audit.counts.structuralEvidencePresentCount).toBe(15);
    expect(audit.counts.passageLevelImmutableWitnessBoundCount).toBe(0);
    expect(audit.counts.exactOutputSemanticsProductionBoundCount).toBe(0);
    expect(audit.counts.productionEligibleExactRuleCount).toBe(0);
    expect(audit.rules.every((row) => row.structuralEvidencePresent)).toBe(true);
    expect(audit.rules.every((row) => !row.exactOutputSemanticsProductionBound)).toBe(true);
    expect(audit.rules.every((row) => !row.productionEligibleForExactContent)).toBe(true);
  });

  test('keeps direct classical relations separate from modern domain projections', () => {
    const audit = buildGeneralNatalConclusionT8ProvenanceAuthorityAudit();
    const byId = new Map(audit.rules.map((row) => [row.ruleId, row]));

    expect(byId.get('RULE-GENERAL-NATAL-CONCLUSION-OUTPUT-TO-WEALTH')?.supportClass).toBe(
      'STRUCTURAL_RELATION_SUPPORTED_CONSUMER_PROJECTION_UNBOUND',
    );
    expect(byId.get('RULE-GENERAL-NATAL-CONCLUSION-WEALTH-TO-OFFICER')?.supportClass).toBe(
      'STRUCTURAL_RELATION_SUPPORTED_CONSUMER_PROJECTION_UNBOUND',
    );
    expect(byId.get('RULE-GENERAL-NATAL-CONCLUSION-OFFICER-TO-RESOURCE')?.supportClass).toBe(
      'STRUCTURAL_RELATION_SUPPORTED_CONSUMER_PROJECTION_UNBOUND',
    );
    expect(byId.get('RULE-GENERAL-NATAL-CONCLUSION-CORE-FIVE-FAMILY-CYCLE')?.supportClass).toBe(
      'WHOLE_CHART_SYNTHESIS_UNSUPPORTED_FOR_EXACT_OUTPUT',
    );
    expect(
      byId.get('RULE-GENERAL-NATAL-CONCLUSION-WORK-OUTPUT-WEALTH-OFFICER')?.supportClass,
    ).toBe('DOMAIN_PROJECTION_UNSUPPORTED_FOR_EXACT_OUTPUT');
    expect(
      byId.get('RULE-GENERAL-NATAL-CONCLUSION-MONEY-WEALTH-PEER-RESOURCE')?.supportClass,
    ).toBe('DOMAIN_PROJECTION_UNSUPPORTED_FOR_EXACT_OUTPUT');
    expect(
      byId.get('RULE-GENERAL-NATAL-CONCLUSION-RELATIONSHIP-PEER-OFFICER')?.supportClass,
    ).toBe('DOMAIN_PROJECTION_UNSUPPORTED_FOR_EXACT_OUTPUT');
  });

  test('does not promote provenance merely because two source references exist', () => {
    const audit = buildGeneralNatalConclusionT8ProvenanceAuthorityAudit();

    for (const row of audit.rules) {
      expect(row.sourceIds).toHaveLength(2);
      expect(row.currentProvenanceQuality).toBe('secondary_only');
      expect(row.productionEligibleForExactContent).toBe(false);
    }
    expect(audit.authorityBoundary.productionSourceTierRegistrationGap).toBe(false);
    expect(audit.authorityBoundary.classicalStructuralEvidenceAbsent).toBe(false);
    expect(audit.authorityBoundary.exactPassageToContentHashBindingMissing).toBe(true);
    expect(audit.authorityBoundary.exactConsumerSemanticBridgeMissing).toBe(true);
    expect(audit.authorityBoundary.blanketMultiSourcePromotionAuthorized).toBe(false);
    expect(audit.authorityBoundary.productionProvenanceAuthorityEstablished).toBe(false);
  });

  test('preserves the research lifecycle and all non-activation guardrails', () => {
    const registry = createGeneralNatalConclusionCandidateRegistry();
    const audit = buildGeneralNatalConclusionT8ProvenanceAuthorityAudit();

    expect(registry.pack.status).toBe('research');
    expect(registry.methodologies.every((methodology) => methodology.status === 'research')).toBe(
      true,
    );
    expect(registry.rules.every((rule) => rule.status === 'research')).toBe(true);
    expect(audit.status).toBe('PRODUCTION_PROVENANCE_AUTHORITY_NOT_ESTABLISHED');
    expect(audit.guardrails).toEqual({
      provenanceQualityMutated: false,
      sourceTierMutated: false,
      lifecyclePromotionPerformed: false,
      reviewerAuthorityFabricated: false,
      productionActivated: false,
      productHostBehaviorChanged: false,
      narrativeBehaviorChanged: false,
      commerceBehaviorChanged: false,
    });
  });

  test('is deterministic and names the next evidence work rather than fabricating authority', () => {
    const first = buildGeneralNatalConclusionT8ProvenanceAuthorityAudit();
    const second = buildGeneralNatalConclusionT8ProvenanceAuthorityAudit();

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.requiredNextEvidence).toHaveLength(4);
    expect(first.recommendedNextAction).toBe(
      'OBTAIN_PASSAGE_PINNED_EXACT_SEMANTIC_SUPPORT_OR_NARROW_UNSUPPORTED_RULE_OUTPUTS_BEFORE_PROVENANCE_PROMOTION',
    );
  });
});
