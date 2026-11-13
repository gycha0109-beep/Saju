import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from
  '../src/production/production-calculation-policy.js';
import { buildAnnualInterpretationFacts } from
  '../src/reading/annual-interpretation-facts.js';
import { buildMonthlyInterpretationFacts } from
  '../src/reading/monthly-interpretation-facts.js';
import { buildTemporalInternalCommercialDraftV1 } from
  '../src/reading/internal-commercial-temporal-draft.js';
import { buildTemporalReaderEvidence } from
  '../src/reading/temporal-reader-evidence.js';
import { annualSexagenaryPillar, buildTemporalReadingContext } from
  '../src/reading/temporal-reading-context.js';
import { createGeneralAnnualReadingCandidateRegistry } from
  '../src/research/general-annual-reading-candidate.js';
import { createGeneralMonthlyReadingCandidateRegistry } from
  '../src/research/general-monthly-reading-candidate.js';
import type { ReadingRequest } from '../src/contracts/reading.js';

const now = new Date('2026-09-03T13:00:00.000Z');
const snapshot = calculateCanonicalSajuSnapshot({
  calendarType: 'solar',
  date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'male',
}, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });

function build(scope: 'annual' | 'monthly') {
  const request: ReadingRequest = {
    requestId: 'internal-t9-' + scope,
    intent: { domain: 'general', temporalScope: scope },
    targetPeriod: {
      scope,
      year: 2026,
      ...(scope === 'monthly' ? { month: 9 } : {}),
      timeZone: 'Asia/Seoul',
      referenceDateTime: now.toISOString(),
      resolution: 'relative_current',
    },
  } as ReadingRequest;
  const ctx = buildTemporalReadingContext(request);
  if (!ctx) throw new Error('Missing real request period.');
  if (scope === 'annual' && ctx.scope === 'annual') {
    const facts = buildAnnualInterpretationFacts(snapshot, ctx);
    const execution = runInterpretation(
      snapshot, createGeneralAnnualReadingCandidateRegistry(now.toISOString()),
      { requestId: request.requestId, temporalFacts: { ...facts }, now },
    );
    return buildTemporalReaderEvidence(snapshot, facts, 'b'.repeat(64), execution);
  }
  if (ctx.scope !== 'monthly') throw new Error('Unexpected reading scope.');
  const facts = buildMonthlyInterpretationFacts(snapshot, ctx);
  const execution = runInterpretation(
    snapshot, createGeneralMonthlyReadingCandidateRegistry(now.toISOString()),
    { requestId: request.requestId, temporalFacts: { ...facts }, now },
  );
  return buildTemporalReaderEvidence(snapshot, facts, 'b'.repeat(64), execution);
}

describe('internal commercial T9 interpretations use existing governed claims', () => {
  it.each(['annual', 'monthly'] as const)(
    '%s retains exact calculated windows and source-linked Korean sentences without authorizing sales',
    (scope) => {
      const evidence = build(scope);
      expect(evidence).toBeDefined();
      if (!evidence) throw new Error('Missing canonical timeline evidence.');
      const result = buildTemporalInternalCommercialDraftV1(evidence);
      expect(result.policy.academicApprovalRequired).toBe(false);
      expect(result.scope).toBe(scope);
      expect(result.snapshotId).toBe(snapshot.snapshotId);
      expect(result.calculationHash).toBe(snapshot.calculationHash);
      expect(result.sections.map(x => [x.segmentId, x.startsAt, x.endsAt]))
        .toEqual(evidence.segments.map(x => [x.id, x.startsAt, x.endsAt]));
      expect(result.sections).toHaveLength(2);
      for (const section of result.sections) {
        const source = evidence.researchSignals.filter(x =>
          x.segmentId === section.segmentId);
        expect(section.sourceSignals).toEqual(source);
        expect(section.koreanParagraphs).toEqual(source.map(x => x.statement));
        expect(section.sourceFactRefs).toEqual([...new Set(
          source.flatMap(x => x.factRefs))]);
        expect(section.sourceRuleRefs).toEqual([...new Set(
          source.flatMap(x => x.ruleRefs))]);
      }
      const completed = result.sections.every(section =>
        section.coverage === 'primary_claim_observed');
      expect(result.readyForInternalNarrativeQualityTest).toBe(completed);
      expect(result.readyForOfficialIssue).toBe(false);
      expect(result.maySell).toBe(false);
    },
  );

  it('never mistakes a missing interpretation as launch-ready', () => {
    const original = build('annual');
    if (!original) throw new Error('Missing original civil-year evidence.');
    const held = buildTemporalInternalCommercialDraftV1({
      ...original, researchSignals: [],
    });
    expect(held.sectionCoverage).toBe('one_or_more_segments_uncovered');
    expect(held.readyForInternalNarrativeQualityTest).toBe(false);
    expect(held.sections.every(x => x.koreanParagraphs.length === 0)).toBe(true);
    expect(held.readyForOfficialIssue).toBe(false);
  });
});
