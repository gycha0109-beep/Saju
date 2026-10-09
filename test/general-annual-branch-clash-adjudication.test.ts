import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { GENERAL_ANNUAL_TENSION_RULES } from '../src/research/general-annual-reading-candidate.js';
import {
  GENERAL_ANNUAL_BRANCH_CLASH_ADJUDICATION_VERSION,
  buildGeneralAnnualBranchClashAdjudication,
} from '../src/research/general-annual-branch-clash-adjudication.js';

const adjudication = buildGeneralAnnualBranchClashAdjudication();

describe('SA-7D-A4 annual branch-clash four-pillar Research adjudication', () => {
  test('binds four and only four unchanged research candidate rules', () => {
    const expected = [
      ['ANNUAL_BRANCH_CLASH_YEAR', 'year', 'minor'],
      ['ANNUAL_BRANCH_CLASH_MONTH', 'month', 'minor'],
      ['ANNUAL_BRANCH_CLASH_DAY', 'day', 'moderate'],
      ['ANNUAL_BRANCH_CLASH_HOUR', 'hour', 'minor'],
    ];
    const current = GENERAL_ANNUAL_TENSION_RULES.map((rule) => {
      const value = rule.output.value as { semanticKey: string; natalPillar: string };
      return [value.semanticKey, value.natalPillar, rule.output.emphasis];
    });
    expect(current).toEqual(expected);
    expect(adjudication.decisions.map((item) => [item.semanticKey, item.natalPillar]))
      .toEqual(expected.map(([semanticKey, natalPillar]) => [semanticKey, natalPillar]));
    expect(adjudication.candidateBinding.candidateRuleCount).toBe(4);
    expect(adjudication.candidateBinding.currentCandidateCodeMutated).toBe(false);
  });

  test('records each required evidentiary dimension without invented classical annual claims', () => {
    expect(adjudication.version).toBe(GENERAL_ANNUAL_BRANCH_CLASH_ADJUDICATION_VERSION);
    expect(adjudication.acquisitionRef.mingLunTaisuiIsAnnualBranchClashEvidence).toBe(false);
    for (const decision of adjudication.decisions) {
      for (const field of [
        'semanticKey', 'currentClaim', 'sourceRefs', 'sourceStatement',
        'interpretiveReading', 'researchInference', 'preconditions',
        'meaningStrength', 'qualifiers', 'exceptions', 'counterexamples',
        'schoolDependencies', 'nonImplications', 'sourceSupportGrade',
        'semanticDisposition', 'unresolvedEvidence',
      ]) {
        expect(Object.hasOwn(decision, field), decision.semanticKey + ' ' + field).toBe(true);
      }
      expect(decision.sourceRefs).toHaveLength(3);
      expect(decision.sourceStatement.primaryAnnualClashPassageVerified).toBe(false);
      expect(decision.sourceSupportGrade).toBe('INSUFFICIENT');
      expect(decision.structuralContextGrade).toBe('CROSS_REFERENCE_ONLY');
      expect(decision.semanticDisposition).toBe('REQUIRES_SEPARATE_DIRECT_SUPPORT');
      expect(decision.meaningStrength).toBe('relation_fact_only');
      expect(decision.preconditions).toHaveLength(4);
      expect(decision.exceptions.length).toBeGreaterThan(0);
      expect(decision.counterexamples.length).toBeGreaterThan(0);
      expect(decision.unresolvedEvidence).toHaveLength(4);
      expect(decision.qualifiedTraditionalAnnualMeaning).toBe(false);
      expect(decision.productionAuthorization).toBe(false);
      expect(decision.nonImplications).toContain('NO_MONTHLY_AUTHORITY');
    }
  });

  test('does not promote modern scholarly context or internal policy to primary evidence', () => {
    expect(adjudication.sourceInventory.map((source) => source.sourceClass)).toEqual([
      'modern_scholarly_secondary', 'modern_scholarly_secondary', 'internal_product_policy',
    ]);
    expect(adjudication.sourceInventory.every((source) =>
      source.annualPillarSpecificDirectSupport === false,
    )).toBe(true);
    expect(adjudication.boundary).toEqual({
      deterministicClashRelationIsInputFactOnly: true,
      genericTensionAuthorized: false,
      pillarSpecificEmphasisAuthorized: false,
      specificEventPredictionAuthorized: false,
      bridgeReentryReady: false,
      engineAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      monthlyAuthorityAuthorized: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
    });
  });

  test('is deterministic and content addressed', () => {
    const again = buildGeneralAnnualBranchClashAdjudication();
    const { adjudicationId, ...material } = adjudication;
    expect(adjudicationId).toMatch(/^[a-f0-9]{64}$/);
    expect(adjudicationId).toBe(deterministicContentHash(material));
    expect(again.adjudicationId).toBe(adjudicationId);
  });
});
