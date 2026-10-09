import { describe, expect, test, vi } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { runProductReadingInternals } from '../src/reading/product-reading-service.js';
import { LEGACY_NARRATIVE_RUNTIME_VERSION } from '../src/reading/governed-reading-execution.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../src/research/general-natal-useful-reading-candidate.js';
import {
  buildSajuR36BureauBreakResearchEvidence,
  SAJU_R36_BUREAU_BREAK_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-r36-bureau-break-research-evidence-adapter.js';
import { createSajuR36BureauBreakResearchRegistry } from '../src/research/shared-natal-r36-bureau-break-structural-claim.js';
import {
  buildSajuR37SupportPrecedenceResearchEvidence,
  SAJU_R37_SUPPORT_PRECEDENCE_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-r37-support-precedence-research-evidence-adapter.js';
import { createSajuR37SupportPrecedenceResearchRegistry } from '../src/research/shared-natal-r37-support-precedence-structural-claim.js';
import {
  buildSajuR38RemoteNonjoiningResearchEvidence,
  SAJU_R38_REMOTE_NONJOINING_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';
import { createSajuR38RemoteNonjoiningResearchRegistry } from '../src/research/shared-natal-r38-remote-stem-nonjoining-structural-claim.js';
import {
  buildSajuR41GengInterpositionResearchEvidence,
  SAJU_R41_GENG_INTERPOSITION_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-r41-geng-interposition-research-evidence-adapter.js';
import { createSajuR41GengInterpositionResearchRegistry } from '../src/research/shared-natal-r41-geng-interposition-structural-claim.js';
import { DEFAULT_CALCULATION_POLICY } from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-09T00:00:00.000Z');
const options = {
  outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  readingVersion: 'saju-refresh-general-natal-consumer-differential-v1',
  artifactGeneratedAt: now,
};
const narrativePolicy = {
  policyId: 'saju-refresh-general-natal-consumer-differential',
  version: '1.0.0-test',
  language: 'ko',
  certaintyPolicy: {
    deterministicFacts: 'direct',
    interpretationClaims: 'method_attributed',
    contestedClaims: 'explicit_difference',
    ambiguousFacts: 'explicit_uncertainty',
    futureClaims: 'non_deterministic',
  },
  tone: { style: 'clear', avoidFatalism: true, avoidFearInduction: true },
  sensitiveDomains: {
    health: 'non_diagnostic',
    finance: 'non_advisory',
    legal: 'non_advisory',
    safety: 'no_harmful_direction',
  },
  sourceDisclosure: 'internal_only',
} as const;
const requiredMissing = [
  'NATAL_GENERAL_FOUNDATION_CLAIM_REQUIRED',
  'NATAL_GENERAL_SYNTHESIS_CLAIM_REQUIRED',
];
const cases = [
  { track: 'R41', year: 1984, month: 6, day: 14, hour: 5, pillars: ['甲子', '庚午', '己卯', '丁卯'] },
  { track: 'R36', year: 1989, month: 9, day: 8, hour: 1, pillars: ['己巳', '癸酉', '辛未', '己丑'] },
  { track: 'R37', year: 1992, month: 1, day: 5, hour: 9, pillars: ['辛未', '庚子', '庚辰', '辛巳'] },
  { track: 'R38', year: 1984, month: 2, day: 6, hour: 5, pillars: ['甲子', '丙寅', '庚午', '己卯'] },
] as const;

function buildTrack(track: (typeof cases)[number]['track'], snapshot: ReturnType<typeof calculateCanonicalSajuSnapshot>) {
  switch (track) {
    case 'R36': {
      const built = buildSajuR36BureauBreakResearchEvidence(snapshot);
      if (built.status !== 'resolved') return { status: 'unavailable' as const };
      return {
        status: 'resolved' as const,
        registry: createSajuR36BureauBreakResearchRegistry(),
        adapter: SAJU_R36_BUREAU_BREAK_RUNTIME_ADAPTER,
        envelope: built.envelope,
      };
    }
    case 'R37': {
      const built = buildSajuR37SupportPrecedenceResearchEvidence(snapshot);
      if (built.status !== 'resolved') return { status: 'unavailable' as const };
      return {
        status: 'resolved' as const,
        registry: createSajuR37SupportPrecedenceResearchRegistry(),
        adapter: SAJU_R37_SUPPORT_PRECEDENCE_RUNTIME_ADAPTER,
        envelope: built.envelope,
      };
    }
    case 'R38': {
      const built = buildSajuR38RemoteNonjoiningResearchEvidence(snapshot);
      if (built.status !== 'resolved') return { status: 'unavailable' as const };
      return {
        status: 'resolved' as const,
        registry: createSajuR38RemoteNonjoiningResearchRegistry(),
        adapter: SAJU_R38_REMOTE_NONJOINING_RUNTIME_ADAPTER,
        envelope: built.envelope,
      };
    }
    case 'R41': {
      const built = buildSajuR41GengInterpositionResearchEvidence(snapshot);
      if (built.status !== 'resolved') return { status: 'unavailable' as const };
      return {
        status: 'resolved' as const,
        registry: createSajuR41GengInterpositionResearchRegistry(),
        adapter: SAJU_R41_GENG_INTERPOSITION_RUNTIME_ADAPTER,
        envelope: built.envelope,
      };
    }
  }
}

describe('Refresh General Natal actual-chart producer-to-consumer differential', () => {
  test.each(cases)('$track $year-$month-$day $hour:30 separates real T2 evidence from bounded T8 and Production authority', async (fixture) => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: fixture.year, month: fixture.month, day: fixture.day },
        time: { known: true, hour: fixture.hour, minute: 30 },
        sexForTraditionalCalculation: 'male',
      },
      DEFAULT_CALCULATION_POLICY,
      { now },
    );
    const before = deterministicContentHash(snapshot);
    const pillars = (['year', 'month', 'day', 'hour'] as const).map((slot) => {
      const fact = snapshot.pillars[slot];
      if (fact.status !== 'resolved') throw new Error('Calculated pillar expected');
      return fact.value.stem.hanja + fact.value.branch.hanja;
    });
    expect(pillars).toEqual(fixture.pillars);
    const built = buildTrack(fixture.track, snapshot);
    expect(built.status).toBe('resolved');
    if (built.status !== 'resolved') throw new Error('Real research-positive chart required');
    const evidenceRegistry = createResearchEvidenceRuntimeRegistry([built.adapter]);
    expect(built.adapter.validate(built.envelope, snapshot).valid).toBe(true);

    const t2Run = runInterpretation(snapshot, built.registry, {
      now,
      researchEvidence: {
        runtimeRegistry: evidenceRegistry,
        envelopes: [built.envelope],
      },
    });
    expect(t2Run.claims).toHaveLength(1);
    expect(t2Run.claims[0]).toMatchObject({
      taxonomy: { tier: 'T2' },
      researchEvidenceRefs: [built.envelope.envelopeId],
      value: {
        qiangRuo: 'not_determined',
        narrativeMateriality: false,
        productionAuthority: false,
      },
    });
    const request = {
      requestId: 'refresh-general-' + fixture.track,
      text: '전체 사주',
      referenceDateTime: now.toISOString(),
    };
    const researchComposition = buildReadingCompositionEvidence(
      snapshot,
      t2Run,
      built.registry,
      { requestId: request.requestId, intent: { domain: 'general', temporalScope: 'natal' } },
    );
    expect(researchComposition.selection.coverageState).toBe('insufficient_evidence');
    expect(researchComposition.selection.missingRequirements).toEqual(requiredMissing);
    expect(researchComposition.selection.targetClaimIds).toEqual([]);
    expect(researchComposition.selection.selectedClaimIds).toEqual([]);
    expect(researchComposition.selection.omittedClaimIds).toEqual([t2Run.claims[0]!.claimId]);
    expect(researchComposition.selection.constraints.mayPromoteResearchAuthority).toBe(false);

    const model = vi.fn(async () => {
      throw new Error('Blocked research T2 must not enter a narrative adapter');
    });
    const t2Product = await runProductReadingInternals(
      snapshot,
      t2Run,
      built.registry,
      request,
      options,
      {
        runtimeVersion: LEGACY_NARRATIVE_RUNTIME_VERSION,
        narrativePolicy,
        adapter: { metadata: { provider: 'test', modelId: 'must-not-run', modelRevision: '1' }, generateStructured: model },
      },
    );
    expect(t2Product.execution.preparation.normalization.state).toBe('resolved');
    expect(t2Product.execution.preparation.normalization.request?.intent).toEqual({
      domain: 'general',
      temporalScope: 'natal',
    });
    expect(t2Product.execution.preparation.composition?.selection.missingRequirements).toEqual(requiredMissing);
    expect(t2Product.execution.preparation.executionEligibility.readingExecution).toBe('blocked_coverage');
    expect(t2Product.execution.state).toBe('insufficient_evidence');
    expect(t2Product.execution.artifact).toBeUndefined();
    expect(t2Product.response.reading).toBeUndefined();
    expect(t2Product.execution.modelCalls).toBe(0);
    expect(model).not.toHaveBeenCalled();

    const candidateRegistry = createGeneralNatalUsefulReadingCandidateRegistry(
      '2026-10-09T00:00:00.000Z',
    );
    const candidateRun = runInterpretation(snapshot, candidateRegistry, { now });
    expect(candidateRun.claims.filter((c) => c.taxonomy.tier === 'T8').length).toBeGreaterThan(1);
    expect(candidateRun.claims.some((c) => c.taxonomy.tier === 'T5')).toBe(true);
    const bounded = await runProductReadingInternals(
      snapshot,
      candidateRun,
      candidateRegistry,
      request,
      options,
    );
    expect(bounded.execution.preparation.composition?.selection.coverageState).toBe('complete');
    expect(bounded.execution.preparation.composition?.selection.missingRequirements).toEqual([]);
    expect(bounded.execution.state).toBe('completed');
    expect(bounded.execution.consumerReadingAuthority?.authority).toBe('official_reading');
    expect(bounded.execution.modelCalls).toBe(0);
    expect(bounded.response.state).toBe('delivered');
    expect(bounded.response.reading).toBeDefined();
    expect(candidateRegistry.pack.status).toBe('research');

    const prodCandidate = inspectMyeonghwaProductionComposition({ registry: candidateRegistry });
    expect(prodCandidate.status).toBe('blocked');
    if (prodCandidate.status !== 'blocked') throw new Error('Research pack must be blocked');
    expect(prodCandidate.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
    expect(inspectMyeonghwaProductionComposition({ registry: built.registry }).status).toBe('blocked');

    // The same validated snapshot feeds both branches; a preview result
    // cannot confer T8 or production authority to an unrelated T2 rule.
    expect(bounded.execution.preparation.composition?.selection.targetClaimIds).not.toContain(
      t2Run.claims[0]!.claimId,
    );
    expect(bounded.execution.preparation.composition?.selection.constraints.mayPromoteResearchAuthority).toBe(false);
    expect(deterministicContentHash(snapshot)).toBe(before);
    expect(built.adapter.validate(built.envelope, snapshot).valid).toBe(true);
  });

  test('unknown hour cannot turn exact R41 interposition into a negative or product claim', async () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1984, month: 6, day: 14 },
        time: { known: false },
        sexForTraditionalCalculation: 'male',
      },
      DEFAULT_CALCULATION_POLICY,
      { now },
    );
    expect(buildTrack('R41', snapshot).status).toBe('unavailable');
    const registry = createSajuR41GengInterpositionResearchRegistry();
    const run = runInterpretation(snapshot, registry, { now });
    expect(run.claims).toEqual([]);
    const product = await runProductReadingInternals(
      snapshot, run, registry,
      { requestId: 'r41-unknown-hour', text: '전체 사주' },
      options,
    );
    expect(product.execution.state).toBe('insufficient_evidence');
    expect(product.execution.modelCalls).toBe(0);
    expect(product.response.reading).toBeUndefined();
  });
});
