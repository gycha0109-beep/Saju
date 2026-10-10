import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import {
  GENERAL_NATAL_INTEGRATED_READING_PACK,
  createGeneralNatalIntegratedReadingRegistry,
} from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { runProductReadingInternals } from '../src/reading/product-reading-service.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE } from '../src/research/general-natal-t8-structural-summary-candidate.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../src/research/general-natal-useful-reading-candidate.js';

const now = new Date('2026-10-11T00:00:00.000Z');
const readingRequest = {
  requestId: 'general-integrated-actual-chart',
  text: '전체 사주',
};
const readingOptions = {
  outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  readingVersion: 'general-integrated-existing-structures-v1',
  artifactGeneratedAt: now,
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
    { now },
  );
}

describe('WS-D: execute existing General Natal structural and theme claims in one reading', () => {
  it('adds existing guarded month-branch structural context to the same real-chart reading', async () => {
    const snapshot = actualChart();
    const snapshotBefore = deterministicContentHash(snapshot);
    const baselineRegistry = createGeneralNatalUsefulReadingCandidateRegistry();
    const baseline = runInterpretation(snapshot, baselineRegistry, { now });
    expect(baseline.claims.some((claim) =>
      claim.claimType === GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    )).toBe(false);

    const registry = createGeneralNatalIntegratedReadingRegistry();
    const interpretation = runInterpretation(snapshot, registry, { now });
    const structural = interpretation.claims.filter((claim) =>
      claim.claimType === GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    );
    expect(structural).toHaveLength(1);
    expect(structural[0]?.taxonomy).toMatchObject({
      tier: 'T8',
      category: 'general',
      subcategory: 'month_branch_structural_context',
    });
    expect(structural[0]?.upstreamClaimRefs).toHaveLength(2);
    expect(
      structural[0]?.upstreamClaimRefs.map((id) =>
        interpretation.claims.find((claim) => claim.claimId === id)?.claimType,
      ).sort(),
    ).toEqual([
      'DAY_MASTER_MONTH_BRANCH_EVIDENCE',
      'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD',
    ]);
    expect(structural[0]?.value).toMatchObject({
      overallStrength: 'not_determined',
      classificationAuthorized: false,
      fortunePolarityAuthorized: false,
      numericScoringAuthorized: false,
    });

    const general = buildReadingCompositionEvidence(snapshot, interpretation, registry, {
      requestId: readingRequest.requestId,
      intent: { domain: 'general', temporalScope: 'natal' },
    });
    expect(general.selection.coverageState).toBe('complete');
    expect(general.selection.missingRequirements).toEqual([]);
    expect(general.selection.targetClaimIds).toContain(structural[0]?.claimId);
    expect(
      interpretation.claims.filter((claim) =>
        claim.taxonomy.tier === 'T8' &&
        claim.taxonomy.category === 'general' &&
        claim.taxonomy.subcategory === 'self_baseline',
      ),
    ).toHaveLength(1);
    expect(
      general.evidence?.bundle.claims.some((claim) =>
        claim.claimType === 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD',
      ),
    ).toBe(true);

    const product = await runProductReadingInternals(
      snapshot, interpretation, registry, readingRequest, readingOptions,
    );
    expect(product.execution.state).toBe('completed');
    expect(product.execution.modelCalls).toBe(0);
    expect(product.execution.narrative).toBeUndefined();
    expect(product.execution.officialReadingPlan).toBeDefined();
    expect(product.execution.canonicalSemantics?.units.some((unit) =>
      unit.claimId === structural[0]?.claimId,
    )).toBe(true);
    expect(product.execution.officialReadingReport).toBeDefined();
    expect(product.response.state).toBe('delivered');
    expect(product.response.reading).toBeDefined();
    expect(JSON.stringify(product.response.reading)).toContain('월지');
    expect(product.execution.constraints.mayPromoteResearchAuthority).toBe(false);
    expect(deterministicContentHash(snapshot)).toBe(snapshotBefore);
  });

  it('keeps identical input deterministic and refuses every Production reinterpretation', () => {
    const snapshot = actualChart();
    const registry = createGeneralNatalIntegratedReadingRegistry();
    const first = runInterpretation(snapshot, registry, { now });
    const second = runInterpretation(snapshot, registry, { now });
    expect(first.claims.map((claim) => claim.claimId)).toEqual(
      second.claims.map((claim) => claim.claimId),
    );
    expect(first.run.interpretationRunId).toBe(second.run.interpretationRunId);
    expect(GENERAL_NATAL_INTEGRATED_READING_PACK.status).toBe('research');
    expect(registry.resolvedRules.every((rule) => rule.status === 'research')).toBe(true);
    const production = inspectMyeonghwaProductionComposition({ registry });
    expect(production.status).toBe('blocked');
    if (production.status !== 'blocked') throw new Error('Research pack cannot be Production.');
    expect(production.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
