import { describe, expect, test } from 'vitest';
import {
  buildI24ChallengeMechanismComposition,
  challengeMechanismForRelation,
} from '../src/index.js';

describe('I24 challenge mechanism composition', () => {
  test('maps output, wealth, and officer relations to distinct mechanisms', () => {
    expect(challengeMechanismForRelation('output')).toBe('OUTPUT_LEAKAGE');
    expect(challengeMechanismForRelation('wealth')).toBe('WEALTH_EXPENDITURE_CONTROL');
    expect(challengeMechanismForRelation('officer')).toBe('OFFICER_CONTROL_PRESSURE');
  });

  test('preserves mixed challenge mechanisms without authorizing precedence or a verdict', () => {
    const report = buildI24ChallengeMechanismComposition([
      { evidenceId: 'output-1', relation: 'output' },
      { evidenceId: 'wealth-1', relation: 'wealth' },
      { evidenceId: 'officer-1', relation: 'officer' },
    ]);

    expect(report.mixedMechanismsPresent).toBe(true);
    expect(report.mechanismGroups).toEqual([
      { mechanism: 'OUTPUT_LEAKAGE', evidenceIds: ['output-1'] },
      { mechanism: 'WEALTH_EXPENDITURE_CONTROL', evidenceIds: ['wealth-1'] },
      { mechanism: 'OFFICER_CONTROL_PRESSURE', evidenceIds: ['officer-1'] },
    ]);
    expect(report.crossMechanismPrecedenceAuthorized).toBe(false);
    expect(report.challengeEffectVerdict).toBe('not_determined');
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('repeated same-mechanism evidence remains auditable but is not aggregated into magnitude', () => {
    const report = buildI24ChallengeMechanismComposition([
      { evidenceId: 'output-2', relation: 'output' },
      { evidenceId: 'output-1', relation: 'output' },
    ]);

    expect(report.mechanismGroups).toEqual([
      { mechanism: 'OUTPUT_LEAKAGE', evidenceIds: ['output-1', 'output-2'] },
    ]);
    expect(report.repeatedEvidenceAggregation).toBe('not_authorized');
    expect(report.challengeEffectVerdict).toBe('not_determined');
  });

  test('rejects duplicate evidence identifiers', () => {
    expect(() =>
      buildI24ChallengeMechanismComposition([
        { evidenceId: 'duplicate', relation: 'output' },
        { evidenceId: 'duplicate', relation: 'officer' },
      ]),
    ).toThrow('Duplicate challenge evidence ID: duplicate');
  });

  test('report identity is deterministic regardless of observation input order', () => {
    const first = buildI24ChallengeMechanismComposition([
      { evidenceId: 'wealth', relation: 'wealth' },
      { evidenceId: 'output', relation: 'output' },
    ]);
    const second = buildI24ChallengeMechanismComposition([
      { evidenceId: 'output', relation: 'output' },
      { evidenceId: 'wealth', relation: 'wealth' },
    ]);

    expect(first.reportId).toBe(second.reportId);
    expect(first.observations).toEqual(second.observations);
  });
});
