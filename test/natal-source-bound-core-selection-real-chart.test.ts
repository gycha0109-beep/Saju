import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../src/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../src/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../src/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../src/preview/relationship-natal-multifactor-report.js';

const NOW = new Date('2026-10-19T00:00:00.000Z');
const CASES = [
  {
    domain: 'general',
    month: 8, day: 16, hour: 11,
    registry: createGeneralNatalMultifactorRegistry(),
    build: buildGeneralNatalMultifactorReport,
  },
  {
    domain: 'business',
    month: 8, day: 16, hour: 11,
    registry: createBusinessNatalMultifactorRegistry(),
    build: buildBusinessNatalMultifactorReport,
  },
  {
    domain: 'relationship',
    month: 7, day: 9, hour: 6,
    registry: createRelationshipNatalMultifactorRegistry(),
    build: buildRelationshipNatalMultifactorReport,
  },
] as const;

describe('real chart: source-owned alternate T8 center restores independent Korean meaning', () => {
  for (const fixture of CASES) {
    it('uses existing independent Claim axes and preserves original three-family meaning in ' + fixture.domain, () => {
      const snapshot = calculateCanonicalSajuSnapshot({
        calendarType: 'solar',
        date: { year: 1985, month: fixture.month, day: fixture.day },
        time: { known: true, hour: fixture.hour, minute: 0 },
        sexForTraditionalCalculation: 'unspecified',
      }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
      const result = runInterpretation(snapshot, fixture.registry, { now: NOW });
      const report = fixture.build(snapshot, result, fixture.registry);
      const originalCoreClaims = result.claims.filter(claim =>
        claim.taxonomy.tier === 'T8' &&
        claim.taxonomy.category === fixture.domain &&
        claim.state === 'active' &&
        (claim.value as { axis?: string }).axis === 'core');
      expect(originalCoreClaims.length).toBeGreaterThan(0);
      expect(report.state).toBe('complete');
      expect(report.sections).toHaveLength(3);
      expect(report.sections[0]?.axis).not.toBe('core');

      const axes = new Set<string>();
      const paths = new Set<string>();
      for (const section of report.sections) {
        expect(section.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(section.sourceIds.length).toBeGreaterThan(0);
        expect(section.ruleId).toBe('RULE-' + section.claimType);
        expect(axes.has(section.axis)).toBe(false);
        expect(section.observedFactPaths.some(path => !paths.has(path))).toBe(true);
        axes.add(section.axis);
        section.observedFactPaths.forEach(path => paths.add(path));
      }
      // Source-owned center has not vanished, even though it was not selected
      // as the first interpretation. It can be a genuine supporting axis.
      const shown = new Set([
        ...report.sections.map(section => section.claimType),
        ...(report.displacedOriginalCore === undefined
          ? [] : [report.displacedOriginalCore.claimType]),
      ]);
      expect(originalCoreClaims.some(claim => shown.has(claim.claimType))).toBe(true);
      expect(report.researchOnly).toBe(true);
      expect(report.usefulComplete).toBe(false);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
    });
  }
});
