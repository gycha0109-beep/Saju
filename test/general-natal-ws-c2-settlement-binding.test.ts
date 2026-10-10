import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createGeneralNatalPositionQualifiedResearchRegistry } from '../src/interpretation/general-natal-position-qualified-reading.js';
import { bindGeneralNatalC2Settlements } from '../src/interpretation/general-natal-c2-settlement-binding.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';

const now = new Date('2026-10-11T00:00:00.000Z');
const dates = [
  { year: 1984, month: 6, day: 14 },
  { year: 1984, month: 2, day: 6 },
  { year: 2024, month: 3, day: 10 },
] as const;

function execute(date: (typeof dates)[number]) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date,
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'male',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
  const interpretation = runInterpretation(
    snapshot,
    createGeneralNatalPositionQualifiedResearchRegistry(),
    { now },
  );
  return { snapshot, interpretation };
}

describe('WS-C2: exact-position Ten-God to canonical stem-settlement binding', () => {
  it.each(dates)('binds only exact canonical witnesses for $year-$month-$day', (date) => {
    const { snapshot, interpretation } = execute(date);
    const before = deterministicContentHash(snapshot);
    const first = bindGeneralNatalC2Settlements(snapshot, interpretation);
    const second = bindGeneralNatalC2Settlements(snapshot, interpretation);
    expect(first).toEqual(second);
    expect(first.status).toBe('resolved');
    if (first.status !== 'resolved') return;
    expect(first.interpretationOutcomeAuthorized).toBe(false);
    expect(first.witnesses.length % 2).toBe(0);
    expect(first.witnesses).toHaveLength(
      snapshot.derivedFacts.stemInteractionSettlements?.status === 'resolved'
        ? snapshot.derivedFacts.stemInteractionSettlements.value.length * 2
        : 0,
    );
    for (const witness of first.witnesses) {
      const source = interpretation.claims.find((claim) => claim.claimId === witness.t5ClaimId);
      expect(source?.factRefs).toEqual([witness.factRef]);
      expect(source?.taxonomy.tier).toBe('T5');
      expect(source?.taxonomy.category).toBe('ten_gods');
      expect(witness.interpretationOutcomeAuthorized).toBe(false);
      expect(witness.factRef).toMatch(/^derivedFacts\.tenGods\.(year|month|hour)\.stem$/u);
    }
    expect(deterministicContentHash(snapshot)).toBe(before);
  });

  it('blocks identity mismatch without accepting another calculation snapshot', () => {
    const a = execute(dates[0]);
    const b = execute(dates[1]);
    const result = bindGeneralNatalC2Settlements(a.snapshot, b.interpretation);
    expect(result).toEqual({
      status: 'unavailable',
      reason: 'SNAPSHOT_MISMATCH',
      witnesses: [],
    });
  });

  it('fails closed for unresolved settlement fact and leaves interpretation untouched', () => {
    const { snapshot, interpretation } = execute(dates[0]);
    const altered = {
      ...snapshot,
      derivedFacts: {
        ...snapshot.derivedFacts,
        stemInteractionSettlements: { status: 'unavailable' as const, reasonCode: 'test_unresolved' },
      },
    };
    expect(bindGeneralNatalC2Settlements(altered, interpretation)).toEqual({
      status: 'unavailable',
      reason: 'SETTLEMENT_FACT_NOT_RESOLVED',
      witnesses: [],
    });
  });
});
