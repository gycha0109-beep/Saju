import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import {
  GENERAL_NATAL_INTEGRATED_SOURCE_BOUNDED_RESEARCH_PACK,
  createGeneralNatalIntegratedReadingRegistry,
  createGeneralNatalIntegratedSourceBoundedResearchRegistry,
} from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import { runProductReadingInternals } from '../src/reading/product-reading-service.js';
import {
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';

const now = new Date('2026-10-11T00:00:00.000Z');
const samples = [
  { year: 1984, month: 6, day: 14, hour: 5 },
  { year: 1984, month: 2, day: 6, hour: 5 },
] as const;
const intendedReading = { domain: 'general', temporalScope: 'natal' } as const;

function chart(input: (typeof samples)[number]) {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: input.year, month: input.month, day: input.day },
      time: { known: true, hour: input.hour, minute: 30 },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now },
  );
}

describe('WS-C1: existing T5 -> source-bounded T8 inside shared natal interpretation', () => {
  it.each(samples)(
    '$year-$month-$day executes exact structural relations without consumer leakage',
    async (birth) => {
      const snapshot = chart(birth);
      const originalHash = deterministicContentHash(snapshot);
      const baseline = createGeneralNatalIntegratedReadingRegistry();
      const registry = createGeneralNatalIntegratedSourceBoundedResearchRegistry();
      const baseExecution = runInterpretation(snapshot, baseline, { now });
      const execution = runInterpretation(snapshot, registry, { now });
      const replay = runInterpretation(snapshot, registry, { now });

      const relations = execution.claims.filter(
        (claim) => claim.taxonomy.tier === 'T8' &&
          claim.taxonomy.category === 'general' &&
          claim.taxonomy.subcategory === 'source_bounded_relation',
      );
      expect(relations.length).toBeGreaterThan(0);
      expect(baseExecution.claims.some(
        (claim) => claim.taxonomy.subcategory === 'source_bounded_relation',
      )).toBe(false);
      expect(replay).toEqual(execution);
      expect(execution.claims.some(
        (claim) => claim.taxonomy.subcategory === 'month_branch_structural_context',
      )).toBe(true);
      expect(execution.claims.some(
        (claim) => claim.taxonomy.subcategory === 'self_baseline',
      )).toBe(true);

      for (const claim of relations) {
        expect(claim.upstreamClaimRefs).toHaveLength(2);
        const rule = GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.find(
          (candidate) => candidate.output.claimType === claim.claimType,
        );
        expect(rule).toBeDefined();
        expect(claim.methodologyRef).toEqual(rule?.methodologyRef);
        expect(claim.value).toMatchObject({
          consumerProjectionAuthorized: false,
          behavioralInferenceAuthorized: false,
          futureTimingAuthorized: false,
          numericScoringAuthorized: false,
        });
        for (const parentId of claim.upstreamClaimRefs) {
          const parent = execution.claims.find((item) => item.claimId === parentId);
          expect(parent?.taxonomy).toMatchObject({
            tier: 'T5',
            category: 'ten_gods',
            subcategory: 'source_bounded_family_presence',
          });
          expect(parent?.methodologyRef).toEqual(claim.methodologyRef);
        }
      }

      const selection = buildReadingCompositionEvidence(snapshot, execution, registry, {
        requestId: 'ws-c1-' + birth.month + '-' + birth.day,
        intent: intendedReading,
      });
      expect(selection.selection.coverageState).toBe('complete');
      expect(selection.selection.missingRequirements).toEqual([]);
      for (const claim of relations) {
        expect(selection.selection.targetClaimIds).toContain(claim.claimId);
      }

      const request = { requestId: 'ws-c1-' + birth.month + '-' + birth.day, text: '전체 사주' };
      const prepared = prepareProductReading(snapshot, execution, registry, request);
      expect(prepared.state).toBe('invariant_blocked');
      expect(prepared.reasonCodes).toContain('TARGET_CLAIM_CONSUMER_PROJECTION_NOT_AUTHORIZED');
      expect(prepared.executionEligibility.readingExecution).toBe('blocked_invariant');
      const result = await runProductReadingInternals(
        snapshot, execution, registry, request,
        {
          outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
          readingVersion: 'ws-c1-source-bounded-no-consumer-projection',
        },
      );
      expect(result.response.reading).toBeUndefined();
      expect(result.execution.modelCalls).toBe(0);
      expect(deterministicContentHash(snapshot)).toBe(originalHash);
    },
  );

  it('keeps existing Preview registry/host routing untouched and Production blocked', () => {
    const existing = createGeneralNatalIntegratedReadingRegistry();
    const extended = createGeneralNatalIntegratedSourceBoundedResearchRegistry();
    expect(existing.rules.some(
      (rule) => rule.ruleSetId === 'general-natal-source-bounded-structural-relation',
    )).toBe(false);
    expect(extended.rules.filter(
      (rule) => rule.ruleSetId === 'general-natal-source-bounded-structural-relation',
    )).toHaveLength(GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.length);
    expect(GENERAL_NATAL_INTEGRATED_SOURCE_BOUNDED_RESEARCH_PACK.status).toBe('research');
    expect(extended.rules.every((rule) => rule.status === 'research')).toBe(true);
    const production = inspectMyeonghwaProductionComposition({ registry: extended });
    expect(production.status).toBe('blocked');
    if (production.status !== 'blocked') throw new Error('Research claims cannot become production.');
    expect(production.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
