import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildNatalStructuralEvidence } from '../src/preview/natal-structural-evidence.js';
import { buildNatalN17DifferentiationAudit } from '../src/preview/natal-grounded-reading-differentiation.js';
import { buildNatalN16GroundedReaderBrief } from '../src/preview/natal-grounded-reader-brief.js';
import { attachGeneralNatalCalculatedContext } from '../src/preview/general-natal-consumer-fact-context.js';
import { attachGeneralNatalCalculatedRoleObservation } from '../src/preview/general-natal-consumer-role-observation.js';

const now = new Date('2026-10-16T00:00:00.000Z');
function snapshot(day: number, known = true): CanonicalSajuSnapshot {
  return calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month: 3, day },
    time: known ? { known: true, hour: 12, minute: 30 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  }, { now }).snapshot;
}
function reading(snap: CanonicalSajuSnapshot, id: string, text: string): ProductReadingResponse {
  const facts = buildNatalStructuralEvidence(snap);
  const date = snap.input.date;
  return {
    responseId: id,
    responseVersion: 'test-only',
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: 'reading-' + id,
      brand: { brandId: 'myeonghwa', displayName: '명화' },
      subject: {
        birthInputDisplay: {
          calendarType: 'solar',
          date: [date.year, String(date.month).padStart(2, '0'),
            String(date.day).padStart(2, '0')].join('-'),
          timeKnown: true, time: '12:30',
        },
        calculationState: 'resolved',
      },
      calculationSummary: {
        pillars: Object.fromEntries(facts.pillars.map((p) => [
          p.slot, { label: p.slot, value: p.label, status: p.state },
        ])) as NonNullable<ProductReadingResponse['reading']>['calculationSummary']['pillars'],
      },
      sections: [{
        sectionType: 'overview', title: '주요 해석', state: 'complete',
        blocks: [{ type: 'paragraph', text }],
      }],
      disclosures: [],
      generatedAt: now.toISOString(),
    },
  };
}
const partial: ProductReadingResponse = {
  responseId: 'unknown-hour',
  responseVersion: 'test-only',
  state: 'partial_evidence',
  messageCode: 'READING_EVIDENCE_PARTIAL',
  requiredAction: 'provide_required_context',
  coverage: { state: 'partial', hasAvailableEvidence: true, missingRequirementCount: 1 },
};

describe('N17 real chart structure vs bounded Preview text', () => {
  it('separates true structural differences, repeated text, and textual change without claiming meaning', () => {
    const a = snapshot(10);
    const b = snapshot(11);
    const entries = [
      { caseId: 'a', snapshot: a, sources: [{ domain: 'general' as const, response: reading(a, 'a', '같은 기존 문장') }] },
      { caseId: 'a-control', snapshot: snapshot(10), sources: [{ domain: 'general' as const, response: reading(a, 'control', '같은 기존 문장') }] },
      { caseId: 'b', snapshot: b, sources: [{ domain: 'general' as const, response: reading(b, 'b', '같은 기존 문장') }] },
      { caseId: 'b-different', snapshot: b, sources: [{ domain: 'general' as const, response: reading(b, 'other', '서로 다른 기존 문장') }] },
      { caseId: 'unknown', snapshot: snapshot(10, false), sources: [{ domain: 'general' as const, response: partial }] },
    ];
    const audit = buildNatalN17DifferentiationAudit(entries);
    expect(audit).toMatchObject({
      lifecycle: 'internal_quality_audit', mayPublish: false, maySell: false,
      mayPromoteResearch: false, substantiveMeaningValidated: false,
      reviewRequired: true,
    });
    const pair = (left: string, right: string) => audit.pairs.find((p) =>
      p.left === left && p.right === right);
    expect(pair('a', 'a-control')).toMatchObject({
      disposition: 'SAME_STRUCTURE_SAME_TEXT', identicalStructure: true,
      identicalReadingText: true, substantiveMeaningDifferenceEstablished: false,
    });
    expect(pair('a', 'b')).toMatchObject({
      disposition: 'DIFFERENT_STRUCTURE_SAME_TEXT_COLLISION',
      identicalStructure: false, identicalReadingText: true,
    });
    expect(pair('b', 'b-different')).toMatchObject({
      disposition: 'SAME_STRUCTURE_DIFFERENT_TEXT_REVIEW',
      identicalStructure: true, identicalReadingText: false,
    });
    expect(pair('a', 'b-different')).toMatchObject({
      disposition: 'DIFFERENT_STRUCTURE_DIFFERENT_TEXT_UNVERIFIED',
      identicalStructure: false, identicalReadingText: false,
    });
    expect(audit.cases.find((c) => c.caseId === 'unknown')).toMatchObject({
      birthTimeKnown: false, readingUnitCount: 0, availableDomains: [],
    });
    expect(audit.comparisonsWithMissingReading).toBe(4);
    expect(audit.pairs).toHaveLength(10);
    expect(buildNatalN17DifferentiationAudit([...entries].reverse())).toEqual(audit);
  });

  it('does not mistake real N5/N7 chart-specific factual paragraphs for different interpretations', () => {
    const a = snapshot(10);
    const b = snapshot(11);
    const withFacts = (snap: CanonicalSajuSnapshot, id: string) =>
      attachGeneralNatalCalculatedRoleObservation(
        attachGeneralNatalCalculatedContext(reading(snap, id, '같은 범위 제한 풀이 본문')),
        snap,
      );
    const first = withFacts(a, 'a-facts');
    const second = withFacts(b, 'b-facts');
    const brief = buildNatalN16GroundedReaderBrief(a, [
      { domain: 'general', response: first },
    ]);
    expect(brief.interpretationTextUnitCount).toBe(1);
    expect(brief.calculatedContextTextUnitCount).toBe(2);
    expect(brief.readingUnits.filter((u) => u.kind === 'calculated_chart_context'))
      .toHaveLength(2);
    expect(brief.readingUnits.find((u) =>
      u.kind === 'existing_preview_interpretation')?.text).toBe('같은 범위 제한 풀이 본문');
    const audit = buildNatalN17DifferentiationAudit([
      { caseId: 'a', snapshot: a, sources: [{ domain: 'general', response: first }] },
      { caseId: 'b', snapshot: b, sources: [{ domain: 'general', response: second }] },
    ]);
    expect(audit.cases.map((entry) => entry.readingUnitCount)).toEqual([1, 1]);
    expect(audit.cases.map((entry) => entry.calculatedContextUnitCount)).toEqual([2, 2]);
    expect(audit.pairs[0]).toMatchObject({
      disposition: 'DIFFERENT_STRUCTURE_SAME_TEXT_COLLISION',
      identicalReadingText: true,
      substantiveMeaningDifferenceEstablished: false,
    });
  });

  it('marks absent interpretive text as missing evidence, not a same-text collision', () => {
    const a = snapshot(10, false);
    const b = snapshot(11, false);
    const audit = buildNatalN17DifferentiationAudit([
      { caseId: 'a', snapshot: a, sources: [{ domain: 'general', response: partial }] },
      { caseId: 'b', snapshot: b, sources: [{ domain: 'general', response: partial }] },
    ]);
    expect(audit.comparisonsWithMissingReading).toBe(1);
    expect(audit.differentStructureSameTextPairs).toBe(0);
    expect(audit.pairs[0]).toMatchObject({
      disposition: 'MISSING_INTERPRETATION_EVIDENCE',
      substantiveMeaningDifferenceEstablished: false,
    });
  });

  it('rejects a spoofed calculated-only marker instead of silently concealing interpretation', () => {
    const a = snapshot(10);
    const malformed = reading(a, 'spoof', '이 사주풀이가 실제로 참조한 명식은 개인의 직업 성공을 보증합니다.');
    expect(() => buildNatalN16GroundedReaderBrief(a, [
      { domain: 'general', response: malformed },
    ])).toThrow(/unrecognized N5/u);
  });

  it('fails closed for repeated case identity or reading belonging to another person', () => {
    const a = snapshot(10);
    const b = snapshot(11);
    const entry = { caseId: 'one', snapshot: a,
      sources: [{ domain: 'general' as const, response: reading(a, 'a', '검증 문장') }] };
    expect(() => buildNatalN17DifferentiationAudit([entry, entry])).toThrow(/unique/);
    expect(() => buildNatalN17DifferentiationAudit([
      { caseId: 'wrong', snapshot: b, sources: entry.sources },
    ])).toThrow(/subject differs|chart mismatch/u);
  });
});
