import { describe, expect, it } from 'vitest';
import type { TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createGeneralNatalSourceBoundedRegistry } from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { buildNatalN20MixedRelationResearchReport } from '../src/research/general-natal-t8-mixed-relation-reading.js';

const now = new Date('2026-10-16T00:00:00.000Z');
const registry = createGeneralNatalSourceBoundedRegistry(now.toISOString());

const full: TenGodChartFact = {
  year: { stem: resolved('겁재'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};
function run(gods: TenGodChartFact) {
  const calculated = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month: 3, day: 10 },
    time: { known: true, hour: 12, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
  const snapshot = {
    ...calculated,
    derivedFacts: { ...calculated.derivedFacts, tenGods: resolved(gods) },
  };
  const execution = runInterpretation(snapshot, registry, {
    now, requestId: 'n20-source-bounded-research-test',
  });
  return { snapshot, execution, report:
    buildNatalN20MixedRelationResearchReport(snapshot, execution, registry) };
}

describe('N20 opposed-relation kinds, source-bounded T5/T8 and exact T0 locations', () => {
  it('identifies two real mixed pairs without concluding polarity, cancellation or outcomes', () => {
    const { execution, report } = run(full);
    expect(report).toMatchObject({
      lifecycle: 'internal_research_only', mayPublish: false, maySell: false,
      mayAuthorizeInterpretation: false, mixedPairCount: 2,
    });
    expect(report.mixedPairs.map((x) => x.pattern)).toEqual([
      'OFFICER-TO-RESOURCE__WEALTH-RESOURCE-CONFLICT',
      'OUTPUT-TO-WEALTH__PEER-TO-WEALTH-ADVERSE',
    ]);
    const claimIds = new Set(execution.claims.map((claim) => claim.claimId));
    for (const pair of report.mixedPairs) {
      expect(pair.firstT8ClaimId).not.toBe(pair.secondT8ClaimId);
      expect(pair.uniqueT5ClaimIds).toHaveLength(3);
      expect(pair.uniqueT5ClaimIds.every((id) => claimIds.has(id))).toBe(true);
      expect(pair.sourceLocators).toHaveLength(2);
      expect(pair.factRefs.length).toBeGreaterThan(0);
      expect(pair.observedFamilies).toHaveLength(3);
      for (const family of pair.observedFamilies) {
        expect(family.observed.length).toBeGreaterThan(0);
        for (const observation of family.observed) {
          expect(observation.factPath).toMatch(
            /^derivedFacts\.tenGods\.(year|month|day|hour)\.(stem|branch)$/u,
          );
          expect(pair.text).toContain(observation.display);
        }
      }
      expect(pair).toMatchObject({
        relationCancellationInferred: false,
        transitiveCausalityInferred: false,
        realLifeOutcomeInferred: false,
        consumerProjectionAuthorized: false,
      });
      expect(pair.text).toContain('상쇄되거나');
      expect(pair.text).toContain('결과도 아닙니다');
    }
    const adverse = report.mixedPairs.find((x) => x.secondRelationId === 'PEER-TO-WEALTH-ADVERSE');
    expect(adverse?.observedFamilies.find((x) => x.family === 'peer')).toMatchObject({
      exactTenGodRequired: '겁재',
    });
    expect(adverse?.observedFamilies.find((x) => x.family === 'peer')?.observed
      .every((x) => x.tenGod === '겁재')).toBe(true);
  });

  it('does not treat mere 비견 as evidence of 겁재→財', () => {
    const peersWithoutGyeopjae: TenGodChartFact = {
      ...full, year: { stem: resolved('비견'), branch: resolved('정인') },
    };
    const { report } = run(peersWithoutGyeopjae);
    expect(report.mixedPairs.some((x) => x.secondRelationId === 'PEER-TO-WEALTH-ADVERSE')).toBe(false);
    expect(report.mixedPairs.some((x) => x.secondRelationId === 'WEALTH-RESOURCE-CONFLICT')).toBe(true);
  });

  it('requires actual endpoints: absent wealth means no mixed pairs', () => {
    const noWealth: TenGodChartFact = {
      ...full,
      month: { stem: resolved('정관'), branch: resolved('상관') },
    };
    const { report } = run(noWealth);
    expect(report.mixedPairCount).toBe(0);
  });

  it('separates physical-position differences from the same bounded structural meaning', () => {
    const swapped: TenGodChartFact = {
      ...full,
      year: { stem: resolved('편재'), branch: resolved('정인') },
      month: { stem: resolved('겁재'), branch: resolved('정재') },
    };
    const first = run(full).report;
    const second = run(swapped).report;
    expect(first.relationPatternSignature).toBe(second.relationPatternSignature);
    expect(first.locationSignature).not.toBe(second.locationSignature);
    expect(first.mixedPairs.map((p) => p.text)).not.toEqual(second.mixedPairs.map((p) => p.text));
    const repeated = run(full);
    expect(buildNatalN20MixedRelationResearchReport(repeated.snapshot, repeated.execution, registry))
      .toEqual(repeated.report);
  });

  it('rejects a different snapshot or unrelated Preview registry', () => {
    const { snapshot, execution } = run(full);
    const unauthorized = createGeneralNatalIntegratedReadingRegistry(now.toISOString());
    expect(() => buildNatalN20MixedRelationResearchReport(snapshot, execution, unauthorized))
      .toThrow(/source-bounded research/u);
    expect(() => buildNatalN20MixedRelationResearchReport(
      { ...snapshot, snapshotId: 'mismatched' }, execution, registry,
    )).toThrow(/not bound/u);
  });
});
