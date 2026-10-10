import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  ANNUAL_SOURCE_GLYPH_WITNESSES,
  ANNUAL_SOURCE_GLYPH_LOCI,
  ANNUAL_SOURCE_GLYPH_COLLATION_UNRESOLVED,
  buildAnnualSourceGlyphWitnessCollation,
  auditAnnualSourceGlyphVariantScope,
} from '../src/research/general-annual-source-glyph-witness-collation.js';

function annual(year: number, instant: string): ReadingRequest {
  return {
    requestId: 'juan2-digital-variants',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: instant, resolution: 'relative_current',
    },
  };
}

function fixture(options: {
  unknownHour?: boolean;
  unknownLuck?: boolean;
  startYears?: number;
} = {}): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1990, month: 5, day: 15 },
      time: { known: true, hour: 14, minute: 30 },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-10-10T12:00:00.000Z') },
  );
  if (base.pillars.day.status !== 'resolved') throw new Error('Fixture day unavailable');
  const day: PillarFact = base.pillars.day.value;
  const age = options.startYears ?? 1;
  return {
    ...base,
    pillars: options.unknownHour
      ? { ...base.pillars, hour: unavailable('test-hour-unavailable') }
      : base.pillars,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age, years: age, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, index) => ({
            age: age + index * 10, pillar: day,
          })),
        }),
  };
}

function checked(input: ReturnType<typeof auditAnnualSourceGlyphVariantScope>) {
  if (input.status !== 'research_witness_variant_gate_hold') {
    throw new Error('Expected blocked research witness gate');
  }
  return input;
}

describe('Juan2 digital text witness conflict / not independent print edition', () => {
  test('three sites/records do not establish manuscript independence', () => {
    expect(ANNUAL_SOURCE_GLYPH_WITNESSES).toHaveLength(3);
    expect(ANNUAL_SOURCE_GLYPH_WITNESSES.every((w) =>
      !w.firstPrintedEditionIdentified &&
      !w.printImageGlyphVerified &&
      !w.independentEditionEstablished)).toBe(true);
    expect(ANNUAL_SOURCE_GLYPH_LOCI.every((l) => !l.mayNormalizeConfusables))
      .toBe(true);
    const collation = buildAnnualSourceGlyphWitnessCollation();
    expect(collation.comparisonCount).toBe(3);
    expect(collation.differences.map((x) => x.locus)).toEqual([
      'BREAK_CASE_EXAMPLE_FIRST_PILLAR',
      'BREAK_CASE_FOLLOWUP_BRANCH_GLYPH',
      'CLASH_CHAPTER_CONCLUSION_FORM',
    ]);
    expect(collation.differences.every((x) =>
      x.distinctDigitalTextCount === 2 &&
      x.unresolvedEditorialVariant &&
      x.printedPreferredReading === null &&
      x.majorityReading === null &&
      x.automaticallyNormalizedReading === null &&
      !x.executableRuleAdmitted,
    )).toBe(true);
    expect(collation.unresolved).toBe(ANNUAL_SOURCE_GLYPH_COLLATION_UNRESOLVED);
    expect(collation.authority.multipleWebsitesDoNotProveIndependentManuscripts)
      .toBe(true);
    const { witnessCollationHash, ...material } = collation;
    expect(witnessCollationHash).toBe(deterministicContentHash(material));
    expect(buildAnnualSourceGlyphWitnessCollation()).toEqual(collation);
  });

  test('己亥 and 巳亥, 巳 and 已 remain distinct without normalization', () => {
    const collation = buildAnnualSourceGlyphWitnessCollation();
    const first = collation.differences[0];
    const followup = collation.differences[1];
    expect(first?.observations.map((x) => x.exactText))
      .toEqual(['如甲午人見己亥', '如甲午人見巳亥', '如甲午人見己亥']);
    expect(followup?.observations.map((x) => x.exactText))
      .toEqual(['或見巳字', '或見已字', '或見巳字']);
    expect(first?.printedPreferredReading).toBeNull();
    expect(first?.executableRuleAdmitted).toBe(false);
    expect('己'.codePointAt(0)).not.toBe('巳'.codePointAt(0));
    expect('巳'.codePointAt(0)).not.toBe('已'.codePointAt(0));
  });

  test('observed historical closing-line forms are not harmonized silently', () => {
    const conclusion = buildAnnualSourceGlyphWitnessCollation().differences[2];
    expect(conclusion?.observations.map((x) => x.exactText)).toEqual([
      '可見衝破有吉有凶，不可概論',
      '觀諸詩，見衝破有吉有凶，不可槩論',
      '觀諸詩，見衝破有吉有凶，不可槩論',
    ]);
    expect(conclusion?.automaticallyNormalizedReading).toBeNull();
  });

  test('research year result retains 9/16 upstream scope and all HOLD', () => {
    const snapshot = fixture();
    const before = JSON.stringify(snapshot);
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    const audit = checked(auditAnnualSourceGlyphVariantScope(snapshot, req));
    expect(audit.unresolvedWitnessLoci).toHaveLength(3);
    expect(audit.gates).toMatchObject({
      sourceExampleGlyphDisputeOpen: true,
      webWitnessMajorityVotingAuthorized: false,
      uncertainExampleToExecutableRuleAuthorized: false,
      tripleClashPrecedenceAuthorized: false,
      consumerReadingAuthorized: false,
      productionAuthorized: false,
    });
    expect(audit.effectivePriorityDecision).toBeNull();
    expect(audit.verifiedPrintedExample).toBeNull();
    expect(audit.claimedPersonalOutcome).toBeNull();
    const { auditHash, ...material } = audit;
    expect(auditHash).toBe(deterministicContentHash(material));
    expect(auditAnnualSourceGlyphVariantScope(snapshot, req)).toEqual(audit);
    expect(JSON.stringify(snapshot)).toBe(before);
  });

  test('LiChun boundary changes upstream hash without promoting a witness', () => {
    const snapshot = fixture();
    const prior = checked(auditAnnualSourceGlyphVariantScope(
      snapshot, annual(2026, '2026-02-03T14:59:59.000Z')));
    const next = checked(auditAnnualSourceGlyphVariantScope(
      snapshot, annual(2026, '2026-02-03T15:00:00.000Z')));
    expect(prior.auditHash).not.toBe(next.auditHash);
    expect(prior.witnessCollationHash).toBe(next.witnessCollationHash);
    expect(next.gates.uncertainExampleToExecutableRuleAuthorized).toBe(false);
  });

  test('unknown hour/luck, Dayun crossing, 2028 missing E1 and monthly fail closed', () => {
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    expect(auditAnnualSourceGlyphVariantScope(fixture({ unknownHour: true }), req))
      .toMatchObject({ status: 'input_unavailable', reasonCode: 'hour' });
    expect(auditAnnualSourceGlyphVariantScope(fixture({ unknownLuck: true }), req))
      .toMatchObject({ status: 'input_unavailable', reasonCode: 'luck_cycle_unavailable' });
    expect(auditAnnualSourceGlyphVariantScope(fixture({ startYears: 6 }), req))
      .toMatchObject({ status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS' });
    expect(auditAnnualSourceGlyphVariantScope(
      fixture(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toEqual({
      status: 'input_unavailable', reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
      productionAuthorized: false,
    });
    const monthly: ReadingRequest = {
      ...req,
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6,
        timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(auditAnnualSourceGlyphVariantScope(fixture(), monthly)).toEqual({
      status: 'input_unavailable', reasonCode: 'ANNUAL_REQUEST_REQUIRED',
      productionAuthorized: false,
    });
  });
});
