import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_RULES,
  createGeneralNatalConclusionCandidateRegistry,
} from '../src/research/general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_CONCLUSION_T8_UNSUPPORTED_EXACT_RULE_IDS,
  buildGeneralNatalConclusionT8PassageWitnessEvidence,
} from '../src/research/general-natal-conclusion-t8-passage-witness-evidence.js';

describe('General Natal conclusion T8 passage witness evidence', () => {
  test('binds a passage-pinned subset against all fifteen exact current rules', () => {
    const evidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();

    expect(evidence.auditBaseSha).toBe('a5cabffb6067fba26934e18d088229a6cc8f2ee2');
    expect(evidence.counts.exactCandidateRuleCount).toBe(15);
    expect(evidence.counts.passagePinnedRuleCount).toBe(10);
    expect(evidence.counts.unsupportedExactRuleCount).toBe(5);
    expect(evidence.boundRules).toHaveLength(10);
    expect(evidence.unsupportedRules).toHaveLength(5);

    const currentIds = [
      ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
      ...GENERAL_NATAL_CONCLUSION_RULES,
    ]
      .map((rule) => rule.ruleId)
      .sort();
    const auditedIds = [
      ...evidence.boundRules.map((row) => row.ruleId),
      ...evidence.unsupportedRules.map((row) => row.ruleId),
    ].sort();
    expect(auditedIds).toEqual(currentIds);
    expect(new Set(auditedIds).size).toBe(15);
    for (const row of [...evidence.boundRules, ...evidence.unsupportedRules]) {
      expect(row.contentHash).toMatch(/^[a-f0-9]{64}$/);
    }
  });

  test('pins immutable Wikisource revisions without treating revision identity as authority', () => {
    const evidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();

    expect(evidence.sourceRevisions).toHaveLength(2);
    expect(evidence.sourceRevisions.map((source) => source.oldid).sort()).toEqual([
      2082207,
      2593607,
    ]);
    expect(
      evidence.sourceRevisions.every((source) => source.permanentRevisionUrl.includes('oldid=')),
    ).toBe(true);
    expect(
      evidence.sourceRevisions.every(
        (source) => !source.repositoryMayTreatAsProductionAuthorityByRevisionAlone,
      ),
    ).toBe(true);
    expect(evidence.sourceRevisions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          oldid: 2593607,
          integrityQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
        }),
        expect.objectContaining({
          oldid: 2082207,
          integrityQualification: 'QUALIFIED_CLASSICAL_EDITION_TRANSCRIPTION',
        }),
      ]),
    );
  });

  test('stores passage digests and propositions, not raw passage text', () => {
    const evidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();

    expect(evidence.counts.passageWitnessCount).toBe(16);
    for (const witness of evidence.witnesses) {
      expect(witness.passageSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(witness.proposition.length).toBeGreaterThan(20);
      expect(witness.permanentRevisionUrl).toContain('oldid=');
    }
    expect(evidence.guardrails.rawPassageTextStored).toBe(false);
  });

  test('binds five family taxonomy rules and five structural relation rules only', () => {
    const evidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();
    const familyRows = evidence.boundRules.filter((row) => row.normalizedFamilySemanticCandidate);
    const structuralRows = evidence.boundRules.filter((row) => !row.normalizedFamilySemanticCandidate);

    expect(familyRows).toHaveLength(5);
    expect(structuralRows).toHaveLength(5);
    expect(evidence.boundRules.every((row) => row.passageWitnessPinned)).toBe(true);
    expect(evidence.boundRules.every((row) => row.boundedStructuralPropositionBound)).toBe(true);
    expect(evidence.boundRules.every((row) => row.witnessSourceIds.length === 2)).toBe(true);
    expect(
      evidence.boundRules.every((row) => !row.exactCurrentConsumerOutputProductionSupported),
    ).toBe(true);
  });

  test('keeps peer-officer, whole-chart, work, money, and relationship exact outputs unsupported', () => {
    const evidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();

    expect(evidence.unsupportedRules.map((row) => row.ruleId).sort()).toEqual(
      [...GENERAL_NATAL_CONCLUSION_T8_UNSUPPORTED_EXACT_RULE_IDS].sort(),
    );
    expect(evidence.unsupportedRules.every((row) => !row.passageWitnessPinned)).toBe(true);
    expect(
      evidence.unsupportedRules.every((row) => !row.exactCurrentConsumerOutputProductionSupported),
    ).toBe(true);
  });

  test('does not mutate provenance quality or research lifecycle', () => {
    const registry = createGeneralNatalConclusionCandidateRegistry();
    const evidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();

    expect(new Set(registry.rules.map((rule) => rule.quality.provenanceQuality))).toEqual(
      new Set(['secondary_only']),
    );
    expect(registry.pack.status).toBe('research');
    expect(registry.methodologies.every((methodology) => methodology.status === 'research')).toBe(
      true,
    );
    expect(registry.rules.every((rule) => rule.status === 'research')).toBe(true);
    expect(evidence.counts.exactCurrentRuleProductionSupportedCount).toBe(0);
    expect(evidence.authorityBoundary.provenanceQualityPromotionAuthorized).toBe(false);
    expect(evidence.authorityBoundary.productionProvenanceAuthorityEstablished).toBe(false);
    expect(evidence.guardrails).toEqual({
      rawPassageTextStored: false,
      sourceTierMutated: false,
      provenanceQualityMutated: false,
      lifecyclePromotionPerformed: false,
      reviewerAuthorityFabricated: false,
      productionActivated: false,
    });
  });

  test('is deterministic and names the next exact evidence frontier', () => {
    const first = buildGeneralNatalConclusionT8PassageWitnessEvidence();
    const second = buildGeneralNatalConclusionT8PassageWitnessEvidence();

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.status).toBe(
      'PASSAGE_WITNESS_SUBSET_PINNED_PRODUCTION_PROVENANCE_NOT_ESTABLISHED',
    );
    expect(first.authorityBoundary.immutablePassageWitnessSubsetEstablished).toBe(true);
    expect(first.authorityBoundary.sourceIntegrityQualificationStillRequired).toBe(true);
    expect(first.authorityBoundary.modernConsumerSemanticBridgeStillRequired).toBe(true);
    expect(first.requiredNextEvidence).toHaveLength(4);
    expect(first.recommendedNextAction).toBe(
      'QUALIFY_PINNED_SOURCE_WITNESSES_AND_NARROW_OR_REVIEW_CONSUMER_SEMANTIC_BRIDGES',
    );
  });
});
