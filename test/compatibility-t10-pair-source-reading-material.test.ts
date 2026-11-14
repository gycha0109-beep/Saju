import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { buildT10PairSourceReadingMaterialV1 } from
  '../src/reading/t10-pair-source-reading-material.js';

function birth(year: number, month: number, day: number): BirthInput {
  return {
    calendarType: 'solar', date: { year, month, day },
    time: { known: true, hour: 12, minute: 0 },
    sexForTraditionalCalculation: 'unspecified',
  };
}
function run(a: BirthInput, b: BirthInput) {
  const result = buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 'pair-source-material-regression',
    subjectPersonRef: 'first',
    targetPersonRef: 'second',
    referenceDateTime: '2026-11-13T00:00:00.000Z',
    candidateScope: 'traditional_marital_palace_comparison',
  });
  const draft = result.internalServiceInterpretationDraft;
  if (!draft) throw new Error('Internal interpretation draft missing.');
  return { result, draft, material: buildT10PairSourceReadingMaterialV1(result.sourceScopeHandoff, draft) };
}

describe('source-owned pair Reading material never inherits Preview issuance authority', () => {
  it('preserves two independent calculated charts and sentence-level original references', () => {
    const { result, draft, material } = run(birth(1990, 5, 15), birth(1996, 8, 5));
    expect(material.charts).toEqual([
      { role: result.sourceScopeHandoff.subject.personRef,
        snapshotId: result.sourceScopeHandoff.subject.snapshotId,
        calculationHash: result.sourceScopeHandoff.subject.calculationHash },
      { role: result.sourceScopeHandoff.target.personRef,
        snapshotId: result.sourceScopeHandoff.target.snapshotId,
        calculationHash: result.sourceScopeHandoff.target.calculationHash },
    ]);
    expect(material.units).toHaveLength(draft.sentences.length);
    expect(material.units.map(u => u.paragraph)).toEqual(draft.sentences.map(s => s.paragraph));
    for (const [index, unit] of material.units.entries()) {
      const { unitId, ...content } = unit;
      expect(unitId).toBe('t10_unit_' + deterministicContentHash(content).slice(0, 24));
      expect(unit.observedFactPaths).toEqual(draft.sentences[index]?.observedFactPaths);
    }
    const { materialHash, status, officialIssueAuthorized, mayPublish, maySell, ...unsigned } = material;
    expect(materialHash).toBe(deterministicContentHash(unsigned));
    expect(status).toBe('source_owned_candidate_unissued');
    expect(officialIssueAuthorized).toBe(false);
    expect(mayPublish).toBe(false);
    expect(maySell).toBe(false);
  });

  it('changes material when person order changes and rejects tampering with the source chart', () => {
    const a = birth(1990, 5, 15);
    const b = birth(1996, 6, 5);
    const forward = run(a, b);
    const reversed = run(b, a);
    expect(forward.material.charts[0]?.calculationHash)
      .toBe(reversed.material.charts[1]?.calculationHash);
    expect(forward.material.materialHash).not.toBe(reversed.material.materialHash);
    expect(() => buildT10PairSourceReadingMaterialV1({
      ...forward.result.sourceScopeHandoff,
      target: { ...forward.result.sourceScopeHandoff.target, calculationHash: '0'.repeat(64) },
    }, forward.draft)).toThrow('Pair Reading requires two exact source charts');
    expect(() => buildT10PairSourceReadingMaterialV1(
      forward.result.sourceScopeHandoff,
      { ...forward.draft, koreanDraft: 'Different statement' },
    )).toThrow('Pair Reading requires two exact source charts');
  });
});
