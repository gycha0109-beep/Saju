import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  ANNUAL_JUAN2_NLC_PRINT_WITNESS,
  ANNUAL_JUAN2_NCL_UPLOADED_SCOPE,
  ANNUAL_JUAN2_PRINT_COMPARED_LOCI,
  ANNUAL_JUAN2_PRINT_REMAINING_HOLDS,
  buildAnnualJuan2PrintImageCollation,
  auditAnnualJuan2PrintImageScope,
} from '../src/research/general-annual-juan2-print-image-collation.js';

function annual(year: number, instant: string): ReadingRequest {
  return {
    requestId: 'juan2-nlc-print-audit',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: instant, resolution: 'relative_current',
    },
  };
}
function fixture(options: {
  unknownHour?: boolean; unknownLuck?: boolean; startYears?: number;
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
  if (base.pillars.day.status !== 'resolved') throw new Error('Fixture day missing');
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

describe('Juan2 NLC printed image versus three digital text witnesses', () => {
  test('image reference is specific to one NLC print copy, not an edition census', () => {
    expect(ANNUAL_JUAN2_NLC_PRINT_WITNESS).toMatchObject({
      printedVolumeTitle: '三命通會卷二下',
      section: '論衝擊',
      uploadedScanPageCount: 55,
      targetPdfPageOneBased: 53,
      exemplarStemBranch: '己亥',
      followupBranchGlyph: '巳',
      conclusionPrefix: '觀諸詩',
      verifiesExactPrintedVariantForThisWitnessOnly: true,
      separateEditionCollated: false,
      specificPrintDateVerifiedFromColophon: false,
      classicalPrecedenceInstructionVerified: false,
    });
    expect(ANNUAL_JUAN2_NCL_UPLOADED_SCOPE).toMatchObject({
      observedPdfPageOneBased: 68,
      observedEndColophon: '三命通會卷之六終',
      containsConfirmedMatchingJuan2Clause: false,
      excludeFromJuan2VariantVote: true,
    });
    expect(ANNUAL_JUAN2_PRINT_COMPARED_LOCI).toHaveLength(3);
  });

  test('one primary scan aligns with different digital transcripts per exact locus', () => {
    const print = buildAnnualJuan2PrintImageCollation();
    expect(print.printedWitnessCountForJuan2).toBe(1);
    expect(print.independentSecondEditionCount).toBe(0);
    expect(print.comparedLoci.map((x) => x.printedObservation)).toEqual([
      '己亥', '巳', '觀諸詩',
    ]);
    expect(print.comparedLoci.map((x) => x.conflictsWithDigitalWitnesses))
      .toEqual([['SHIDIAN-SK1610'], ['SHIDIAN-SK1610'], ['WS-2292392']]);
    expect(print.comparedLoci.every((x) =>
      x.printedObservationForThisCopyVerified && !x.authorialReadingAcrossEditionsKnown
    )).toBe(true);
    expect(print.unresolved).toBe(ANNUAL_JUAN2_PRINT_REMAINING_HOLDS);
    expect(print.authority).toMatchObject({
      narrowPrintedGlyphsVerifiedForOneCopy: true,
      independentSecondWitnessVerified: false,
      printExemplarProvesModernForecast: false,
      branchTripleClashPriorityAuthorized: false,
      branchTripleBreakFromStemBreakAuthorized: false,
      individualOutcomeAuthorized: false,
      officialReadingAuthorized: false,
      productionAuthorized: false,
    });
    const { printCollationHash, ...material } = print;
    expect(printCollationHash).toBe(deterministicContentHash(material));
    expect(buildAnnualJuan2PrintImageCollation()).toEqual(print);
  });

  test('annual parent hash linked but semantics and source authority never promoted', () => {
    const snapshot = fixture();
    const before = JSON.stringify(snapshot);
    const request = annual(2026, '2026-06-15T12:00:00.000Z');
    const audit = auditAnnualJuan2PrintImageScope(snapshot, request);
    expect(audit.status).toBe('research_one_print_witness_priority_hold');
    if (audit.status !== 'research_one_print_witness_priority_hold') {
      throw new Error('Unexpected fail-closed result');
    }
    expect(audit.originalPrintPageOneBased).toBe(53);
    expect(audit.independentSecondPrintVerified).toBe(false);
    expect(audit.tripleClashPriorityDecision).toBeNull();
    expect(audit.interpretationClaim).toBeNull();
    expect(audit.authority.productionAuthorized).toBe(false);
    const { auditHash, ...material } = audit;
    expect(auditHash).toBe(deterministicContentHash(material));
    expect(auditAnnualJuan2PrintImageScope(snapshot, request)).toEqual(audit);
    expect(JSON.stringify(snapshot)).toBe(before);
  });

  test('LiChun source hash constant but annual audit changes', () => {
    const snapshot = fixture();
    const a = auditAnnualJuan2PrintImageScope(
      snapshot, annual(2026, '2026-02-03T14:59:59.000Z'));
    const b = auditAnnualJuan2PrintImageScope(
      snapshot, annual(2026, '2026-02-03T15:00:00.000Z'));
    expect(a.status).toBe('research_one_print_witness_priority_hold');
    expect(b.status).toBe('research_one_print_witness_priority_hold');
    if (a.status !== 'research_one_print_witness_priority_hold' ||
        b.status !== 'research_one_print_witness_priority_hold') return;
    expect(a.auditHash).not.toBe(b.auditHash);
    expect(a.printCollationHash).toBe(b.printCollationHash);
  });

  test('unavailable hour/Dayun and out-of-window requests remain blocked', () => {
    const request = annual(2026, '2026-06-15T12:00:00.000Z');
    expect(auditAnnualJuan2PrintImageScope(fixture({ unknownHour: true }), request))
      .toEqual({ status: 'input_unavailable', reasonCode: 'hour', productionAuthorized: false });
    expect(auditAnnualJuan2PrintImageScope(fixture({ unknownLuck: true }), request))
      .toEqual({
        status: 'input_unavailable',
        reasonCode: 'luck_cycle_unavailable',
        productionAuthorized: false,
      });
    expect(auditAnnualJuan2PrintImageScope(fixture({ startYears: 6 }), request))
      .toMatchObject({ status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS' });
    expect(auditAnnualJuan2PrintImageScope(
      fixture(), annual(2028, '2028-02-04T01:00:00.000Z')))
      .toEqual({
        status: 'input_unavailable',
        reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
        productionAuthorized: false,
      });
    const monthly: ReadingRequest = {
      ...request,
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6,
        timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(auditAnnualJuan2PrintImageScope(fixture(), monthly))
      .toEqual({
        status: 'input_unavailable',
        reasonCode: 'ANNUAL_REQUEST_REQUIRED',
        productionAuthorized: false,
      });
  });
});
