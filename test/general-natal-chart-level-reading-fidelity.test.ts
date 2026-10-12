import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { runProductReadingInternals } from '../src/reading/product-reading-service.js';
import {
  buildOfficialReadingCharacterGroundingV1,
  assertOfficialReadingReaderParityReceiptV1,
} from '../src/reading/official-reading-reader-parity.js';
import { GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE } from '../src/research/general-natal-t8-structural-summary-candidate.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';

const NOW = new Date('2026-10-12T00:00:00.000Z');
const registry = createGeneralNatalIntegratedReadingRegistry(NOW.toISOString());

async function chartReading(day: number, timeKnown = true) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month: 3, day },
    time: timeKnown
      ? { known: true as const, hour: 12, minute: 0 }
      : { known: false as const },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
  const execution = runInterpretation(snapshot, registry, {
    requestId: `ws-d-fidelity-interpretation-${day}-${timeKnown}`,
    now: NOW,
  });
  const product = await runProductReadingInternals(
    snapshot, execution, registry,
    { requestId: `ws-d-fidelity-reading-${day}-${timeKnown}`, text: '전체 사주' },
    {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'ws-d-chart-level-fidelity-v1-preview',
      artifactGeneratedAt: NOW,
    },
  );
  return { snapshot, execution, product };
}

function requireDelivered(input: Awaited<ReturnType<typeof chartReading>>) {
  expect(input.execution.integrity.valid).toBe(true);
  expect(input.product.execution.state).toBe('completed');
  expect(input.product.execution.modelCalls).toBe(0);
  expect(input.product.response.state).toBe('delivered');
  expect(input.product.execution.preparation.composition?.selection.coverageState).toBe('complete');
  expect(input.product.execution.preparation.composition?.selection.profileAuthorization.state)
    .toBe('authorized');
  const semantics = input.product.execution.canonicalSemantics;
  const plan = input.product.execution.officialReadingPlan;
  const report = input.product.execution.officialReadingReport;
  const reading = input.product.response.reading;
  if (!semantics || !plan || !report || !reading) {
    throw new Error('Real-chart General Natal Preview must deliver a governed Official Reading');
  }
  expect(report.sourceSemanticHash).toBe(semantics.semanticHash);
  expect(report.sourcePlanHash).toBe(plan.planHash);
  return { semantics, plan, report, reading };
}

function assertVisibleSemanticFidelity(output: ReturnType<typeof requireDelivered>) {
  const primaryRefs = output.plan.sections
    .filter((section) => section.semanticGroup !== 'evidence' && section.semanticGroup !== 'limits')
    .flatMap((section) => section.primaryUnitRefs);
  const explainedRefs = output.report.explainability.entries
    .flatMap((entry) => entry.primaryUnitRefs ?? []);
  expect(primaryRefs.length).toBeGreaterThan(1);
  expect(new Set(primaryRefs).size).toBe(primaryRefs.length);
  for (const ref of primaryRefs) expect(explainedRefs).toContain(ref);
  const visible = output.semantics.units.filter((unit) => primaryRefs.includes(unit.unitId));
  expect(visible).toHaveLength(primaryRefs.length);
  const reportText = JSON.stringify(output.report.sections);
  const consumerText = JSON.stringify(output.reading.sections);
  for (const unit of visible) {
    const summary = unit.canonicalText?.summary;
    expect(summary).toBeTruthy();
    if (!summary) throw new Error(`Missing approved text for ${unit.claimType}`);
    expect(reportText).toContain(summary);
    expect(consumerText).toContain(summary);
    const entry = output.report.explainability.entries.find((item) =>
      item.primaryUnitRefs?.length === 1 && item.primaryUnitRefs.includes(unit.unitId),
    );
    expect(entry?.claimIds).toContain(unit.claimId);
    expect(entry?.methodologyIds).toContain(
      `${unit.methodologyRef.id}@${unit.methodologyRef.version}`,
    );
    for (const sourceId of unit.sourceRefs) expect(entry?.sourceIds).toContain(sourceId);
    for (const upstreamId of unit.upstreamClaimRefs) expect(entry?.claimIds).toContain(upstreamId);
  }
  return visible;
}

describe('WS-D-NEXT-1 real chart-level General Natal fidelity', () => {
  it('retains distinct day-master, Ten-God and guarded month-branch meaning through Reader', async () => {
    const sample = await chartReading(10);
    const result = requireDelivered(sample);
    const visible = assertVisibleSemanticFidelity(result);
    expect(visible.some((unit) => unit.claimType === 'GENERAL_NATAL_DAY_MASTER_BASELINE'))
      .toBe(true);
    expect(visible.some((unit) => unit.predicate === 'consumer_theme')).toBe(true);
    const structural = visible.find((unit) =>
      unit.claimType === GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    );
    expect(structural?.upstreamClaimRefs).toHaveLength(2);
    const reader = buildOfficialReadingCharacterGroundingV1({
      response: sample.product.response,
      semanticBundle: result.semantics,
      officialReadingReport: result.report,
      engineVersion: 'ws-d-fidelity-audit-v1',
    });
    expect(reader.grounding.sourceSemanticHash).toBe(result.report.sourceSemanticHash);
    expect(reader.grounding.units).toHaveLength(visible.length);
    for (const unit of visible) {
      expect(reader.grounding.units.some((entry) =>
        entry.sourceCanonicalUnitRefs.includes(unit.unitId) &&
        entry.canonicalMeaning.includes(unit.canonicalText?.summary ?? ''),
      )).toBe(true);
    }
    expect(() => assertOfficialReadingReaderParityReceiptV1(
      reader.parity, result.report, reader.grounding,
    )).not.toThrow();
    expect(inspectMyeonghwaProductionComposition({ registry }).status).toBe('blocked');
  });

  it('distinguishes real day-master baselines across charts and stays deterministic', async () => {
    const a = await chartReading(10);
    const b = await chartReading(12);
    const first = requireDelivered(a);
    const second = requireDelivered(b);
    const primaryA = assertVisibleSemanticFidelity(first);
    const primaryB = assertVisibleSemanticFidelity(second);
    const baseline = (units: typeof primaryA) => units.find((unit) =>
      unit.claimType === 'GENERAL_NATAL_DAY_MASTER_BASELINE',
    );
    expect(a.snapshot.snapshotId).not.toBe(b.snapshot.snapshotId);
    expect(baseline(primaryA)?.canonicalText?.summary).toBeTruthy();
    expect(baseline(primaryB)?.canonicalText?.summary).toBeTruthy();
    expect(baseline(primaryA)?.semanticPayload).not.toEqual(baseline(primaryB)?.semanticPayload);
    expect(baseline(primaryA)?.canonicalText?.summary)
      .not.toBe(baseline(primaryB)?.canonicalText?.summary);
    expect(first.semantics.semanticHash).not.toBe(second.semantics.semanticHash);
    expect(first.report.reportHash).not.toBe(second.report.reportHash);
    const repeat = requireDelivered(await chartReading(10));
    expect(repeat.semantics.semanticHash).toBe(first.semantics.semanticHash);
    expect(repeat.report.reportHash).toBe(first.report.reportHash);
  });

  it('does not resolve an unknown birth hour or erase a delivered scenario condition', async () => {
    const sample = await chartReading(10, false);
    const response = sample.product.response;
    if (response.reading === undefined) {
      expect(response.state).not.toBe('delivered');
      expect(sample.product.execution.artifact).toBeUndefined();
      return;
    }
    expect(response.reading.subject.birthInputDisplay.timeKnown).toBe(false);
    expect(response.reading.calculationSummary.pillars.hour.status).not.toBe('resolved');
    const semantics = sample.product.execution.canonicalSemantics;
    const report = sample.product.execution.officialReadingReport;
    if (!semantics || !report) throw new Error('Delivered Preview requires governed semantic evidence');
    if (semantics.units.some((unit) => unit.role === 'primary' && unit.scenarioRef !== undefined)) {
      expect(report.sections.some((section) =>
        section.blocks.some((block) => block.type === 'ambiguity'),
      )).toBe(true);
    }
  });
});
