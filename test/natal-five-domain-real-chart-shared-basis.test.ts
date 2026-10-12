import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';
import {
  assertOfficialReadingReaderParityReceiptV1,
  buildOfficialReadingCharacterGroundingV1,
} from '../src/reading/official-reading-reader-parity.js';
import { runProductReadingInternals } from '../src/reading/product-reading-service.js';

const NOW = new Date('2026-10-12T00:00:00.000Z');
const OPTIONS = {
  outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  readingVersion: 'ws-h-one-chart-multi-domain-preview-v1',
  artifactGeneratedAt: NOW,
};

function actualChart() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}

describe('WS-H: one actual Canonical chart across five Preview Natal readings', () => {
  it('reuses one calculation, preserves each admitted domain and reader trace, and isolates blocked requests', async () => {
    // No mocked / overwritten Ten-God facts. One snapshot is supplied to both
    // existing governed registries, which have different Preview admission scopes.
    const snapshot = actualChart();
    expect(snapshot.derivedFacts.tenGods.status).toBe('resolved');

    const generalRegistry = createGeneralNatalIntegratedReadingRegistry(NOW.toISOString());
    const specialistRegistry = createBusinessNatalReadingCandidateRegistry(NOW.toISOString());
    const generalExecution = runInterpretation(snapshot, generalRegistry, {
      requestId: 'ws-h-general-interpretation', now: NOW,
    });
    const specialistExecution = runInterpretation(snapshot, specialistRegistry, {
      requestId: 'ws-h-specialist-interpretation', now: NOW,
    });

    expect(generalExecution.integrity.valid).toBe(true);
    expect(specialistExecution.integrity.valid).toBe(true);
    expect(generalExecution.claims.some((claim) =>
      claim.claimType.startsWith('GENERAL_NATAL_CONCLUSION_'),
    )).toBe(false);
    expect(inspectMyeonghwaProductionComposition({ registry: generalRegistry }).status)
      .toBe('blocked');
    expect(inspectMyeonghwaProductionComposition({ registry: specialistRegistry }).status)
      .toBe('blocked');

    const cases = [
      { domain: 'general', text: '전체 사주', execution: generalExecution, registry: generalRegistry },
      { domain: 'career', text: '직업운', execution: specialistExecution, registry: specialistRegistry },
      { domain: 'wealth', text: '재물운', execution: specialistExecution, registry: specialistRegistry },
      { domain: 'business', text: '사업운', execution: specialistExecution, registry: specialistRegistry },
      { domain: 'relationship', text: '연애운', execution: specialistExecution, registry: specialistRegistry },
    ] as const;

    const semanticHashes = new Set<string>();
    const domains = new Set<string>();
    for (const reading of cases) {
      const output = await runProductReadingInternals(
        snapshot, reading.execution, reading.registry,
        { requestId: `ws-h-${reading.domain}-reading`, text: reading.text },
        OPTIONS,
      );
      expect(output.execution.state).toBe('completed');
      expect(output.response.state).toBe('delivered');
      expect(output.execution.modelCalls).toBe(0);
      expect(output.execution.preparation.composition?.selection.coverageState).toBe('complete');
      expect(output.execution.preparation.composition?.selection.profileAuthorization.state)
        .toBe('authorized');
      const semantics = output.execution.canonicalSemantics;
      const report = output.execution.officialReadingReport;
      const consumer = output.response.reading;
      if (!semantics || !report || !consumer) {
        throw new Error(`Missing Official Reading for ${reading.domain}`);
      }
      expect(semantics.intent.domain).toBe(reading.domain);
      expect(report.sourceSemanticHash).toBe(semantics.semanticHash);
      expect(consumer.calculationSummary.pillars.day.value).toBeTruthy();
      expect(consumer.calculationSummary.pillars.day.value)
        .toBe(snapshot.pillars.day.stem + snapshot.pillars.day.branch);
      const selected = output.execution.preparation.composition?.selection.targetClaimIds ?? [];
      expect(selected.length).toBeGreaterThan(0);
      for (const target of selected) {
        expect(reading.execution.claims.some((claim) => claim.claimId === target)).toBe(true);
      }
      const reader = buildOfficialReadingCharacterGroundingV1({
        response: output.response,
        semanticBundle: semantics,
        officialReadingReport: report,
        engineVersion: 'ws-h-reader-parity-preview-v1',
      });
      expect(() => assertOfficialReadingReaderParityReceiptV1(
        reader.parity, report, reader.grounding,
      )).not.toThrow();
      domains.add(reading.domain);
      semanticHashes.add(semantics.semanticHash);
    }
    expect(domains.size).toBe(5);
    expect(semanticHashes.size).toBe(5);

    // An unrelated unsupported request must not change the already computed
    // natal basis or contaminate independently authorized natal readings.
    const unsupported = await runProductReadingInternals(
      snapshot, specialistExecution, specialistRegistry,
      { requestId: 'ws-h-unsupported-annual', text: '올해 운세' },
      OPTIONS,
    );
    expect(unsupported.response.state).not.toBe('delivered');
    expect(unsupported.execution.modelCalls).toBe(0);
  });
});
