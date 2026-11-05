import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { runProductReadingInternals } from '../src/reading/product-reading-service.js';
import { createGeneralNatalSourceBoundedRegistry } from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import { DEFAULT_CALCULATION_POLICY } from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-09T00:00:00.000Z');
const fixtures = [
  {
    date: { year: 1984, month: 6, day: 14 },
    hour: 5,
    pillars: ['甲子', '庚午', '己卯', '丁卯'],
  },
  {
    date: { year: 1984, month: 2, day: 6 },
    hour: 5,
    pillars: ['甲子', '丙寅', '庚午', '己卯'],
  },
] as const;

describe('General Natal source-bounded T8 real-chart consumer implementation design gate', () => {
  test.each(fixtures)(
    '$date.year-$date.month-$date.day emits a bounded T8 relation but blocks incomplete general reading',
    async ({ date, hour, pillars }) => {
      const snapshot = calculateCanonicalSajuSnapshot(
        {
          calendarType: 'solar',
          date: { year: date.year, month: date.month, day: date.day },
          time: { known: true, hour, minute: 30 },
          sexForTraditionalCalculation: 'male',
        },
        DEFAULT_CALCULATION_POLICY,
        { now },
      );
      const snapshotHash = deterministicContentHash(snapshot);
      expect(
        (['year', 'month', 'day', 'hour'] as const).map((slot) => {
          const p = snapshot.pillars[slot];
          if (p.status !== 'resolved') throw new Error('Expected real calculated pillar');
          return p.value.stem.hanja + p.value.branch.hanja;
        }),
      ).toEqual(pillars);

      const registry = createGeneralNatalSourceBoundedRegistry();
      const interpretation = runInterpretation(snapshot, registry, { now });
      expect(runInterpretation(snapshot, registry, { now })).toEqual(interpretation);
      const relations = interpretation.claims.filter(
        (claim) =>
          claim.taxonomy.tier === 'T8' &&
          claim.taxonomy.category === 'general' &&
          claim.taxonomy.subcategory === 'source_bounded_relation',
      );
      expect(relations.length).toBeGreaterThan(0);
      for (const claim of relations) {
        expect(claim.upstreamClaimRefs).toHaveLength(2);
        expect(claim.value).toMatchObject({
          consumerProjectionAuthorized: false,
          behavioralInferenceAuthorized: false,
          futureTimingAuthorized: false,
          numericScoringAuthorized: false,
        });
        for (const parent of claim.upstreamClaimRefs) {
          expect(interpretation.claims.find((upstream) => upstream.claimId === parent)).toMatchObject({
            taxonomy: { tier: 'T5' },
          });
        }
      }

      const product = await runProductReadingInternals(
        snapshot,
        interpretation,
        registry,
        { requestId: 'bounded-t8-' + date.month + '-' + date.day, text: '전체 사주' },
        {
          outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
          readingVersion: 'saju-general-natal-source-bounded-design-test-v1',
        },
      );
      const preparation = product.execution.preparation;
      expect(preparation.normalization.request?.intent).toEqual({
        domain: 'general',
        temporalScope: 'natal',
      });
      expect(preparation.composition?.selection.coverageState).toBe('partial_coverage');
      expect(preparation.composition?.selection.missingRequirements).toEqual([
        'NATAL_GENERAL_FOUNDATION_CLAIM_REQUIRED',
      ]);
      const targetIds = preparation.composition?.selection.targetClaimIds ?? [];
      expect(targetIds.length).toBeGreaterThan(0);
      expect(targetIds.every((id) => relations.some((claim) => claim.claimId === id))).toBe(true);
      expect(preparation.composition?.selection.constraints.mayPromoteResearchAuthority).toBe(false);
      expect(preparation.executionEligibility.readingExecution).toBe('blocked_coverage');
      expect(product.execution.state).toBe('partial_coverage');
      expect(product.execution.modelCalls).toBe(0);
      expect(product.execution.artifact).toBeUndefined();
      expect(product.response.reading).toBeUndefined();

      const production = inspectMyeonghwaProductionComposition({ registry });
      expect(production.status).toBe('blocked');
      if (production.status !== 'blocked') throw new Error('Research candidate must be blocked');
      expect(production.blockers).toContainEqual(
        expect.objectContaining({
          code: 'INTERPRETATION_PACK_NOT_PRODUCTION',
          component: 'interpretation',
        }),
      );
      expect(deterministicContentHash(snapshot)).toBe(snapshotHash);
    },
  );
});
