import { describe, expect, it } from 'vitest';
import type { BirthInput, CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import {
  observeR070ClassicalParentStemExample,
  renderR070ClassicalParentStemExampleHtml,
  R070_CLASSICAL_PARENT_EXAMPLE_SOURCE,
} from '../src/research/r070-classical-parent-stem-example.js';
import { buildFamilyBirthResearchReading } from
  '../src/preview/family-birth-research-runtime.js';
import { buildThreeRelationshipMenusBirthReading } from
  '../src/preview/three-relationship-menus-birth-reading.js';

const referenceDateTime = '2026-10-30T00:00:00.000Z';
const now = new Date(referenceDateTime);
function birth(day: number): BirthInput {
  return {
    calendarType: 'solar',
    date: { year: 2024, month: 4, day },
    time: { known: true, hour: 12, minute: 0 },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const samples = Array.from({ length: 28 }, (_, i) => {
  const input = birth(i + 1);
  const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(input, { now });
  return { input, snapshot };
});
function sample(day: '甲' | '乙' | '丙') {
  const item = samples.find(value =>
    value.snapshot.derivedFacts.dayMaster.status === 'resolved' &&
    value.snapshot.derivedFacts.dayMaster.value.hanja === day);
  if (!item) throw new TypeError('No real calculated day-master case: ' + day);
  return item;
}
describe('R070 source-specific Jia/Yi parent labels, not a family classifier', () => {
  for (const configuration of [
    { day: '甲', father: '편재', mother: '정인' },
    { day: '乙', father: '정재', mother: '편인' },
  ] as const) {
    it(configuration.day + ' binds exact historical names to real visible T5 only', () => {
      const { input, snapshot } = sample(configuration.day);
      const value = observeR070ClassicalParentStemExample(snapshot);
      expect(value?.historicalDayStem).toBe(configuration.day);
      expect(value?.sourceId).toBe(R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.sourceId);
      expect(value?.sourceSection).toBe('論六親');
      expect(value?.dayMasterFactPath).toBe('derivedFacts.dayMaster.value.hanja');
      expect(value?.examples.map(row => [row.hanjaStem, row.canonicalTenGod])).toEqual([
        ['戊', configuration.father],
        ['癸', configuration.mother],
      ]);
      for (const entry of value!.examples) {
        expect(entry.historicalLabel).toMatch(/_in_original$/u);
        for (const position of entry.observedVisiblePositions) {
          const source = snapshot.pillars[position.slot];
          const t5 = snapshot.derivedFacts.tenGods;
          expect(source.status).toBe('resolved');
          expect(t5.status).toBe('resolved');
          if (source.status !== 'resolved' || t5.status !== 'resolved') continue;
          expect(source.value.stem.hanja).toBe(entry.hanjaStem);
          expect(t5.value[position.slot].stem?.status).toBe('resolved');
          expect(t5.value[position.slot].stem).toMatchObject({
            value: entry.canonicalTenGod,
          });
          expect(position.factPaths).toEqual([
            'pillars.' + position.slot + '.value.stem.hanja',
            'derivedFacts.tenGods.value.' + position.slot + '.stem.value',
          ]);
          expect(value?.paragraph).toContain(position.label);
        }
      }
      expect(value?.historicalConfigurationEstablished).toBe(false);
      expect(value?.familyRelativeExistenceAuthorized).toBe(false);
      expect(value?.parentPersonalityAuthorized).toBe(false);
      expect(value?.familyR070MeaningAuthorized).toBe(false);
      expect(value?.mayGrantOfficialAuthority).toBe(false);
      expect(value?.maySell).toBe(false);
      const family = buildFamilyBirthResearchReading(input,
        { scope: 'parents', referenceDateTime });
      expect(family.classicalParentExample).toEqual(value);
      expect(family.html).toContain(value!.paragraph);
      expect(family.html).toContain(R070_CLASSICAL_PARENT_EXAMPLE_SOURCE.url);
      expect(family.availability).toBe('unavailable');
      expect(family.mayPublish).toBe(false);
      expect(buildFamilyBirthResearchReading(input, {
        scope: 'children', referenceDateTime,
      }).classicalParentExample).toBeUndefined();
    });
  }

  it('does not generalize the named examples to unrelated day masters', () => {
    const item = sample('丙');
    expect(observeR070ClassicalParentStemExample(item.snapshot)).toBeUndefined();
    const read = buildFamilyBirthResearchReading(item.input,
      { scope: 'parents', referenceDateTime });
    expect(read.classicalParentExample).toBeUndefined();
    expect(read.html).not.toContain('r070-classical-parent-example');
  });

  it('preserves the original personal identity and family scope in combined three menus', () => {
    const original = sample('甲');
    const second = sample('乙');
    const output = buildThreeRelationshipMenusBirthReading(
      original.input, second.input, {
        requestId: 'r070-historical-exact-example',
        subjectPersonRef: 'self',
        targetPersonRef: 'other',
        targetBirthUseAuthorized: true,
        referenceDateTime,
      });
    const candidate = output.family.parents.classicalParentExample!;
    expect(candidate.snapshotId).toBe(output.snapshotId);
    expect(candidate.calculationHash).toBe(output.calculationHash);
    expect(output.html).toContain(candidate.paragraph);
    expect(output.html).toContain(candidate.sourceId);
    expect(output.family.children.classicalParentExample).toBeUndefined();
    expect(output.mayClaimFamilyOutcome).toBe(false);
    expect(output.mayMarkMenuAvailable).toBe(false);
    expect(output.maySell).toBe(false);
  });

  it('rejects a forged family right even if the original facts are genuine', () => {
    const original = sample('乙');
    const value = observeR070ClassicalParentStemExample(original.snapshot)!;
    expect(() => renderR070ClassicalParentStemExampleHtml({
      ...value, familyR070MeaningAuthorized: true,
    } as unknown as typeof value)).toThrow('cannot become a parent');
    expect(() => renderR070ClassicalParentStemExampleHtml({
      ...value, sourceUrl: 'https://example.net/forged' as typeof value.sourceUrl,
    })).toThrow('cannot become a parent');
  });

  it('keeps unresolved hours separate from visible matches', () => {
    const original = sample('甲');
    const missing: BirthInput = { ...original.input, time: { known: false } };
    const { snapshot } = calculateAuthorizedMyeonghwaProductionSnapshot(missing, { now });
    const candidate = observeR070ClassicalParentStemExample(snapshot);
    if (!candidate) return; // No invented day-master if an input scenario is ambiguous.
    expect(candidate.familyR070MeaningAuthorized).toBe(false);
    for (const row of candidate.examples) {
      expect(row.observedVisiblePositions.every(item => item.slot !== 'hour')).toBe(true);
      expect(row.unresolvedVisibleSlots).toContain('hour');
    }
  });
});
