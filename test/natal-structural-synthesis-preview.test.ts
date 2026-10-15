import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildNatalStructuralEvidence } from '../src/preview/natal-structural-evidence.js';
import { buildNatalSynthesisPreview } from '../src/preview/natal-synthesis-preview.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';

const NOW = new Date('2026-10-15T00:00:00.000Z');

function actualSnapshot(date: string, time?: { hour: number; minute: number }) {
  const [year, month, day] = date.split('-').map(Number);
  if (year === undefined || month === undefined || day === undefined) {
    throw new TypeError('Invalid test fixture date.');
  }
  return calculateAuthorizedMyeonghwaProductionSnapshot(
    {
      calendarType: 'solar',
      date: { year, month, day },
      time: time === undefined ? { known: false } : { known: true, ...time },
      sexForTraditionalCalculation: 'unspecified',
    },
    { now: NOW },
  ).snapshot;
}

describe('P0-NATAL N1/N2 governed structural synthesis', () => {
  it.each([
    ['1984-01-07', { hour: 17, minute: 30 }],
    ['1992-01-12', { hour: 5, minute: 30 }],
    ['2024-03-10', { hour: 12, minute: 30 }],
  ])('projects actual %s chart without elevating structural matches to interpretation', (date, time) => {
    const snapshot = actualSnapshot(date, time);
    const evidence = buildNatalStructuralEvidence(snapshot);
    expect(evidence.snapshotId).toBe(snapshot.snapshotId);
    expect(evidence.calculationHash).toBe(snapshot.calculationHash);
    expect(evidence.calculationPolicyId).toBe(snapshot.policy.policyId);
    expect(evidence.birthTimeKnown).toBe(true);
    expect(evidence.pillars).toHaveLength(4);
    expect(evidence.pillars.every((p) => p.state === 'resolved')).toBe(true);
    expect(evidence.dayMaster?.element).toBe(snapshot.derivedFacts.dayMaster.status === 'resolved'
      ? snapshot.derivedFacts.dayMaster.value.element
      : undefined);
    expect(evidence.mayInferStrength).toBe(false);
    expect(evidence.mayInferGeju).toBe(false);
    expect(evidence.mayInferYongshin).toBe(false);
    expect(evidence.mayPublish).toBe(false);
    for (const relation of evidence.structuralRelations) {
      expect(relation.structuralMatchOnly).toBe(true);
      expect(relation.transformationEstablished).toBe(false);
      expect(relation.sourcePaths.length).toBeGreaterThan(0);
    }
    const synthesis = buildNatalSynthesisPreview(evidence, []);
    expect(synthesis.lifecycle).toBe('internal_exploration');
    expect(synthesis.statements.some((s) => s.kind === 'calculated_basis')).toBe(true);
    expect(synthesis.statements.every((s) => !s.interpretiveEffectEstablished)).toBe(true);
    expect(synthesis.statements.every((s) => s.kind !== 'existing_preview_interpretation')).toBe(true);
    expect(synthesis.domainCoverage.every((d) => !d.hasInterpretation)).toBe(true);
  });

  it('preserves unknown birth hour instead of asserting a fabricated hour or meaning', () => {
    const unknown = actualSnapshot('2024-03-10');
    const evidence = buildNatalStructuralEvidence(unknown);
    expect(evidence.birthTimeKnown).toBe(false);
    expect(evidence.pillars.find((p) => p.slot === 'hour')?.state).not.toBe('resolved');
    expect(evidence.unavailableEvidencePaths).toContain('pillars.hour');
    const synthesis = buildNatalSynthesisPreview(evidence, []);
    expect(synthesis.statements.map((x) => x.text).join(' ')).not.toContain('용신은');
    expect(synthesis.mayGenerateClaims).toBe(false);
  });

  it('rejects a mismatched returned consumer chart rather than merging unrelated people', () => {
    const snapshot = actualSnapshot('2024-03-10', { hour: 12, minute: 30 });
    const evidence = buildNatalStructuralEvidence(snapshot);
    const wrong: ProductReadingResponse = {
      responseId: 'wrong-chart-test',
      responseVersion: 'test-only',
      state: 'delivered',
      messageCode: 'READING_DELIVERED',
      requiredAction: 'none',
      reading: {
        readingId: 'test-only',
        brand: { brandId: 'myeonghwa', displayName: '명화' },
        subject: {
          birthInputDisplay: { calendarType: 'solar', date: '2024-03-10', timeKnown: true, time: '12:30' },
          calculationState: 'resolved',
        },
        calculationSummary: {
          pillars: {
            year: { label: '연주', value: '틀린 연주', status: 'resolved' },
            month: { label: '월주', value: '틀린 월주', status: 'resolved' },
            day: { label: '일주', value: '틀린 일주', status: 'resolved' },
            hour: { label: '시주', value: '틀린 시주', status: 'resolved' },
          },
        },
        sections: [{ sectionType: 'overview', title: '주요 해석', blocks: [{ type: 'paragraph', text: 'fixture interpretation' }], state: 'complete' }],
        disclosures: [],
        generatedAt: NOW.toISOString(),
      },
    };
    expect(() => buildNatalSynthesisPreview(evidence, [{ domain: 'general', response: wrong }]))
      .toThrow(/chart mismatch/u);
    const correct = {
      ...wrong,
      reading: {
        ...wrong.reading!,
        calculationSummary: {
          ...wrong.reading!.calculationSummary,
          pillars: Object.fromEntries(evidence.pillars.map((p) => [
            p.slot,
            { label: p.slot, value: p.label, status: p.state },
          ])) as NonNullable<ProductReadingResponse['reading']>['calculationSummary']['pillars'],
        },
      },
    } as ProductReadingResponse;
    const same = buildNatalSynthesisPreview(evidence, [{ domain: 'general', response: correct }]);
    expect(same.domainCoverage.find((x) => x.domain === 'general')?.hasInterpretation).toBe(true);
    expect(same.statements.some((s) => s.kind === 'existing_preview_interpretation' &&
      s.readingSource?.responseId === 'wrong-chart-test')).toBe(true);
    expect(same.mayPublish).toBe(false);
  });
});
