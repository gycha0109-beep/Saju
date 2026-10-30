import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  observePairwiseClassicalDayStemCombination,
  renderPairwiseClassicalDayStemObservationHtml,
  PAIRWISE_DAY_STEM_PRIMARY_SOURCE,
} from '../src/research/pairwise-day-stem-classical-combination-witness.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';

const now = new Date('2026-10-30T00:00:00.000Z');
const stemInputs = new Map<string, {
  birth: { calendarType: 'solar'; date: { year: number; month: number; day: number };
    time: { known: true; hour: number; minute: number };
    sexForTraditionalCalculation: 'unspecified' };
  snapshot: ReturnType<typeof calculateCanonicalSajuSnapshot>;
}>();
for (let day = 1; day <= 28; day++) {
  const birth = {
    calendarType: 'solar' as const,
    date: { year: 2024, month: 4, day },
    time: { known: true as const, hour: 12, minute: 0 },
    sexForTraditionalCalculation: 'unspecified' as const,
  };
  const snapshot = calculateCanonicalSajuSnapshot(birth, PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now });
  if (snapshot.pillars.day.status === 'resolved') {
    stemInputs.set(snapshot.pillars.day.value.stem.hanja, { birth, snapshot });
  }
}
const person = (hanja: string, personRef: string) => {
  const item = stemInputs.get(hanja);
  if (!item) throw new Error('Real calculation did not cover stem ' + hanja);
  return { personRef, snapshot: item.snapshot };
};
describe('primary-source day-stem pairs in the two-person T10 research boundary', () => {
  it('recognizes all five original stem combinations and both input directions without claiming marriage', () => {
    expect(stemInputs.size).toBe(10);
    for (const [left, right] of [
      ['甲', '己'], ['乙', '庚'], ['丙', '辛'], ['丁', '壬'], ['戊', '癸'],
    ] as const) {
      const input = observePairwiseClassicalDayStemCombination(
        person(left, 'first'), person(right, 'second'));
      const swapped = observePairwiseClassicalDayStemCombination(
        person(right, 'second'), person(left, 'first'));
      expect(input.status).toBe('named_classical_stem_pair_observed');
      expect(input.classicalPair).toBe(left + '·' + right);
      expect(swapped.classicalPair).toBe(input.classicalPair);
      expect(input.paragraph).toContain(left + '·' + right);
      expect(input.paragraph).toContain('관계 적합도·결혼 결과를 뜻하지 않습니다');
      expect(input.subject.factPath).toBe('pillars.day.value.stem.hanja');
      expect(input.target.factPath).toBe('pillars.day.value.stem.hanja');
      expect(input.sourceId).toBe(PAIRWISE_DAY_STEM_PRIMARY_SOURCE.sourceId);
      expect(input.pairwiseT10Admitted).toBe(false);
      expect(input.relationshipCompatibilityEstablished).toBe(false);
      expect(input.mayPublish).toBe(false);
      expect(input.maySell).toBe(false);
      const html = renderPairwiseClassicalDayStemObservationHtml(input);
      expect(html).toContain(input.paragraph);
      expect(html).toContain(input.sourceUrl);
      expect(html).toContain('궁합 점수·합화·관계 결론은 발행하지 않습니다');
    }
  });

  it('does not call an unmatched pair adverse or fabricate a sixth stem combination', () => {
    const input = observePairwiseClassicalDayStemCombination(
      person('甲', 'first'), person('乙', 'second'));
    expect(input.status).toBe('different_day_stem_pair');
    expect(input.classicalPair).toBeUndefined();
    expect(input.paragraph).toContain('관계의 불화나 궁합의 좋고 나쁨을 뜻하지 않습니다');
    expect(input.pairwiseT10Admitted).toBe(false);
    expect(renderPairwiseClassicalDayStemObservationHtml(input)).toContain(
      PAIRWISE_DAY_STEM_PRIMARY_SOURCE.sourceId);
  });

  it('binds the source witness to each actually calculated birth and both research screens', () => {
    const first = stemInputs.get('甲')!;
    const second = stemInputs.get('己')!;
    const reading = buildCompatibilityTwoBirthResearchReading(
      first.birth, second.birth, {
        requestId: 'primary-source-two-real-births',
        subjectPersonRef: 'person-a',
        targetPersonRef: 'person-b',
        referenceDateTime: '2026-10-30T00:00:00.000Z',
      });
    const witness = reading.dayStemSourceWitness;
    expect(witness.classicalPair).toBe('甲·己');
    expect(witness.subject.snapshotId).toBe(reading.report.subject.snapshotId);
    expect(witness.target.snapshotId).toBe(reading.report.target.snapshotId);
    expect(witness.subject.calculationHash).toBe(reading.report.subject.calculationHash);
    expect(witness.target.calculationHash).toBe(reading.report.target.calculationHash);
    expect(reading.html).toContain(witness.paragraph);
    expect(reading.html).toContain(PAIRWISE_DAY_STEM_PRIMARY_SOURCE.sourceId);
    expect(reading.availability).toBe('unavailable');
    expect(reading.mayClaimInterpersonalMeaning).toBe(false);
  });

  it('rejects duplicate people and forged authority on renderer', () => {
    expect(() => observePairwiseClassicalDayStemCombination(
      person('甲', 'same'), person('己', 'same'))).toThrow('Two separate person');
    const base = observePairwiseClassicalDayStemCombination(
      person('甲', 'one'), person('己', 'two'));
    expect(() => renderPairwiseClassicalDayStemObservationHtml({
      ...base, pairwiseT10Admitted: true,
    } as unknown as typeof base)).toThrow('not an authorized two-person T10');
    expect(() => renderPairwiseClassicalDayStemObservationHtml({
      ...base, sourceUrl: 'https://fake.example/forged' as typeof base.sourceUrl,
    })).toThrow('not an authorized two-person T10');
  });
});
