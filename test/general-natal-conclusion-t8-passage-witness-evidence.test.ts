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

    expect(evidence.auditBaseSha).toBe('8b757241c6ba3b49defad182309e0ca8834a3895');
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

  test('pins immutable source revisions without promoting revision identity into authority', () => {
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
  });

  test('stores passage digests and bounded propositions without raw passage text', () => {
    const evidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();

    expect(evidence.counts.passageWitnessCount).toBe(16);
    for (const witness of evidence.witnesses) {
      expect(witness.passageSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(witness.proposition.length).toBeGreaterThan(20);
      expect(witness.permanentRevisionUrl).toContain('oldid=');
    }
    expect(evidence.guardrails.rawPassageTextStored).toBe(false);
  });

  test('keeps peer-family witness single-source instead of misusing the Samyeong volume-five taxonomy passage', () => {
    const evidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();
    const peer = evidence.boundRules.find(
      (row) => row.ruleId === 'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-PEER-PRESENT',
    );

    expect(peer).toBeDefined();
    expect(peer?.witnessIds).toEqual(['W-YUANHAI-PEER-TAXONOMY']);
    expect(peer?.witnessSourceIds).toEqual([
      'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    ]);
    expect(peer?.passageWitnessPinned).toBe(true);
    expect(peer?.multiSourcePassageWitnessBound).toBe(false);
    expect(evidence.counts.singleSourcePassagePinnedRuleCount).toBe(1);
    expect(evidence.counts.multiSourcePassagePinnedRuleCount).toBe(9);
    expect(evidence.authorityBoundary.peerFamilyPassageWitnessEstablished).toBe(true);
    expect(evidence.authorityBoundary.peerFamilyMultiSourceWitnessEstablished).toBe(false);
    expect(evidence.guardrails.unregisteredSourcePromotedIntoCandidate).toBe(false);
  });

  test('binds the remaining four family rules and five structural rules to two registered source surfaces', () => {
    const evidence = buildGeneralNatalConclusionT8PassageWitnessEvidence();
    const peerId = 'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-PEER-PRESENT';
    const remaining = evidence.boundRules.filter((row) => row.ruleId !== peerId);

    expect(remaining).toHaveLength(9);
    expect(remaining.every((row) => row.witnessSourceIds.length === 2)).toBe(true);
    expect(remaining.every((row) => row.multiSourcePassageWitnessBound)).toBe(true);
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

  test('does not mutate provenance quality, lifecycle, reviewer authority, or Production', () => {
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
    expect(evidence.guardrails.sourceTierMutated).toBe(false);
    expect(evidence.guardrails.provenanceQualityMutated).toBe(false);
    expect(evidence.guardrails.lifecyclePromotionPerformed).toBe(false);
    expect(evidence.guardrails.reviewerAuthorityFabricated).toBe(false);
    expect(evidence.guardrails.productionActivated).toBe(false);
  });

  test('is deterministic and names the next evidence frontier', () => {
    const first = buildGeneralNatalConclusionT8PassageWitnessEvidence();
    const second = buildGeneralNatalConclusionT8PassageWitnessEvidence();

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.status).toBe(
      'PASSAGE_WITNESS_SUBSET_PINNED_PRODUCTION_PROVENANCE_NOT_ESTABLISHED',
    );
    expect(first.authorityBoundary.immutablePassageWitnessSubsetEstablished).toBe(true);
    expect(first.authorityBoundary.sourceIntegrityQualificationStillRequired).toBe(true);
    expect(first.authorityBoundary.modernConsumerSemanticBridgeStillRequired).toBe(true);
    expect(first.requiredNextEvidence).toHaveLength(5);
    expect(first.recommendedNextAction).toBe(
      'QUALIFY_PINNED_SOURCE_WITNESSES_AND_NARROW_OR_REVIEW_CONSUMER_SEMANTIC_BRIDGES',
    );
  });
});
