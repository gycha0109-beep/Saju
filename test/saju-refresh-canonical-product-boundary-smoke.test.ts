import { describe, expect, test, vi } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { runProductReadingInternals } from '../src/reading/product-reading-service.js';
import { LEGACY_NARRATIVE_RUNTIME_VERSION } from '../src/reading/governed-reading-execution.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import {
  buildSajuR36BureauBreakResearchEvidence,
  validateSajuR36BureauBreakResearchEvidence,
  SAJU_R36_BUREAU_BREAK_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-r36-bureau-break-research-evidence-adapter.js';
import { createSajuR36BureauBreakResearchRegistry } from '../src/research/shared-natal-r36-bureau-break-structural-claim.js';
import {
  buildSajuR37SupportPrecedenceResearchEvidence,
  validateSajuR37SupportPrecedenceResearchEvidence,
  SAJU_R37_SUPPORT_PRECEDENCE_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-r37-support-precedence-research-evidence-adapter.js';
import { createSajuR37SupportPrecedenceResearchRegistry } from '../src/research/shared-natal-r37-support-precedence-structural-claim.js';
import {
  buildSajuR38RemoteNonjoiningResearchEvidence,
  validateSajuR38RemoteNonjoiningResearchEvidence,
  SAJU_R38_REMOTE_NONJOINING_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';
import { createSajuR38RemoteNonjoiningResearchRegistry } from '../src/research/shared-natal-r38-remote-stem-nonjoining-structural-claim.js';
import {
  buildSajuR39StemRivalryResearchEvidence,
  validateSajuR39StemRivalryResearchEvidence,
  SAJU_R39_STEM_RIVALRY_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-r39-stem-rivalry-research-evidence-adapter.js';
import { createSajuR39StemRivalryResearchRegistry } from '../src/research/shared-natal-r39-stem-rivalry-structural-claim.js';
import { DEFAULT_CALCULATION_POLICY } from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-08T00:00:00Z');
// Actual date inputs: no pillar, Ten-God, hidden-membership or hash replacement.
const fixtures = [
  {
    track: 'R39',
    year: 1984,
    month: 1,
    day: 7,
    hour: 17,
    pillars: ['癸亥', '乙丑', '庚子', '乙酉'],
    jealousRivalry: true,
  },
  {
    track: 'R39',
    year: 1984,
    month: 1,
    day: 10,
    hour: 11,
    pillars: ['癸亥', '乙丑', '癸卯', '戊午'],
    jealousRivalry: false,
  },
  {
    track: 'R38',
    year: 1984,
    month: 2,
    day: 6,
    hour: 5,
    pillars: ['甲子', '丙寅', '庚午', '己卯'],
  },
  {
    track: 'R36',
    year: 1989,
    month: 9,
    day: 8,
    hour: 1,
    pillars: ['己巳', '癸酉', '辛未', '己丑'],
    mechanism: 'OUTPUT_LEAKAGE',
  },
  {
    track: 'R36',
    year: 1992,
    month: 1,
    day: 12,
    hour: 5,
    pillars: ['辛未', '辛丑', '丁亥', '癸卯'],
    mechanism: 'OFFICER_CONTROL_PRESSURE',
  },
  {
    track: 'R37',
    year: 1992,
    month: 1,
    day: 2,
    hour: 13,
    pillars: ['辛未', '庚子', '丁丑', '丁未'],
    rootClass: 'residual_storage_candidate',
  },
  {
    track: 'R37',
    year: 1992,
    month: 1,
    day: 5,
    hour: 9,
    pillars: ['辛未', '庚子', '庚辰', '辛巳'],
    rootClass: 'strong_birth_lu_wang_candidate',
  },
] as const;

const narrativePolicy = {
  policyId: 'saju-refresh-product-boundary-smoke',
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

describe('Saju Refresh actual canonical positive / existing product boundary smoke', () => {
  test.each(fixtures)(
    '$track $year-$month-$day $hour:30 executes a real positive without product promotion',
    async (fixture) => {
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
      const snapshotBefore = deterministicContentHash(snapshot);
      expect(
        (['year', 'month', 'day', 'hour'] as const).map((slot) => {
          const fact = snapshot.pillars[slot];
          if (fact.status !== 'resolved') throw new Error('Expected calculated resolved pillar');
          return fact.value.stem.hanja + fact.value.branch.hanja;
        }),
      ).toEqual(fixture.pillars);

      const r36 = fixture.track === 'R36';
      const built = r36
        ? buildSajuR36BureauBreakResearchEvidence(snapshot)
        : fixture.track === 'R39'
          ? buildSajuR39StemRivalryResearchEvidence(snapshot)
          : fixture.track === 'R38'
            ? buildSajuR38RemoteNonjoiningResearchEvidence(snapshot)
            : buildSajuR37SupportPrecedenceResearchEvidence(snapshot);
      if (built.status !== 'resolved') throw new Error(built.reasonCode);
      const validate = r36
        ? validateSajuR36BureauBreakResearchEvidence
        : fixture.track === 'R39'
          ? validateSajuR39StemRivalryResearchEvidence
          : fixture.track === 'R38'
            ? validateSajuR38RemoteNonjoiningResearchEvidence
            : validateSajuR37SupportPrecedenceResearchEvidence;
      expect(validate(built.envelope, snapshot).valid).toBe(true);
      const registry = r36
        ? createSajuR36BureauBreakResearchRegistry()
        : fixture.track === 'R39'
          ? createSajuR39StemRivalryResearchRegistry()
          : fixture.track === 'R38'
            ? createSajuR38RemoteNonjoiningResearchRegistry()
            : createSajuR37SupportPrecedenceResearchRegistry();
      const options = {
        now,
        researchEvidence: {
          runtimeRegistry: createResearchEvidenceRuntimeRegistry([
            r36
              ? SAJU_R36_BUREAU_BREAK_RUNTIME_ADAPTER
              : fixture.track === 'R39'
                ? SAJU_R39_STEM_RIVALRY_RUNTIME_ADAPTER
                : fixture.track === 'R38'
                  ? SAJU_R38_REMOTE_NONJOINING_RUNTIME_ADAPTER
                  : SAJU_R37_SUPPORT_PRECEDENCE_RUNTIME_ADAPTER,
          ]),
          envelopes: [built.envelope],
        },
      };
      const interpretation = runInterpretation(snapshot, registry, options);
      expect(interpretation.claims).toHaveLength(1);
      expect(interpretation.claims[0]).toMatchObject({
        taxonomy: { tier: 'T2' },
        researchEvidenceRefs: [built.envelope.envelopeId],
        value: {
          qiangRuo: 'not_determined',
          narrativeMateriality: false,
          productionAuthority: false,
        },
      });
      if (fixture.track === 'R36') {
        expect(built.envelope.payload).toMatchObject({
          mechanismOutcomes: {
            [fixture.mechanism]: {
              observed: true,
              identity:
                fixture.year === 1989
                  ? {
                      bureauParticipantPositions: ['year', 'month', 'hour'],
                      clashCounterpartPosition: 'day',
                      clashedBureauParticipantPosition: 'hour',
                    }
                  : {
                      bureauParticipantPositions: ['year', 'day', 'hour'],
                      clashCounterpartPosition: 'month',
                      clashedBureauParticipantPosition: 'year',
                    },
            },
          },
        });
        expect(interpretation.claims[0]?.value).toMatchObject({
          mechanism: fixture.mechanism,
          bureauBreak: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
          rootDestruction: 'not_determined',
          supportEffect: 'not_determined',
        });
      } else if (fixture.track === 'R37') {
        expect(interpretation.claims[0]?.value).toMatchObject({ rootClass: fixture.rootClass });
        expect(built.envelope.payload).toMatchObject({
          comparisons: {
            [fixture.rootClass]: {
              observed: true,
              rootWitnesses:
                fixture.rootClass === 'residual_storage_candidate'
                  ? [
                      { pillarSlot: 'year', sourceRootKind: '餘氣', branch: '미' },
                      { pillarSlot: 'hour', sourceRootKind: '餘氣', branch: '미' },
                    ]
                  : [{ pillarSlot: 'hour', sourceRootKind: '長生', branch: '사' }],
              bijianWitnesses: [
                {
                  pillarSlot: fixture.rootClass === 'residual_storage_candidate' ? 'hour' : 'month',
                  tenGod: '비견',
                },
              ],
            },
          },
        });
      } else if (fixture.track === 'R39') {
        expect(interpretation.claims[0]?.value).toMatchObject({
          jealousRivalry: fixture.jealousRivalry,
          fullJoining: 'not_determined',
          joiningWinner: 'not_determined',
        });
      } else {
        expect(interpretation.claims[0]?.value).toMatchObject({
          fullJoining: false,
          partialEffect: 'not_determined',
        });
      }
      expect(runInterpretation(snapshot, registry, options)).toEqual(interpretation);

      const generateStructured = vi.fn(async () => {
        throw new Error('Research claim reached Narrative');
      });
      const product = await runProductReadingInternals(
        snapshot,
        interpretation,
        registry,
        {
          requestId: `actual-${fixture.track}-${fixture.day}-${fixture.hour}`,
          text: '전체 사주',
          referenceDateTime: now.toISOString(),
        },
        {
          outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
          readingVersion: 'saju-refresh-boundary-v1-test',
        },
        {
          runtimeVersion: LEGACY_NARRATIVE_RUNTIME_VERSION,
          narrativePolicy,
          adapter: {
            metadata: { provider: 'test', modelId: 'must-not-run', modelRevision: '1' },
            generateStructured,
          },
        },
      );
      expect(product.execution.preparation.normalization.state).toBe('resolved');
      expect(product.execution.preparation.normalization.request?.intent).toMatchObject({
        domain: 'general',
        temporalScope: 'natal',
      });
      expect(product.execution.preparation.composition).toBeDefined();
      expect(product.execution.preparation.executionEligibility.readingExecution).toBe(
        'blocked_coverage',
      );
      expect(product.execution.state).toBe('insufficient_evidence');
      expect(product.execution.modelCalls).toBe(0);
      expect(generateStructured).not.toHaveBeenCalled();
      expect(product.execution.artifact).toBeUndefined();
      expect(product.response.reading).toBeUndefined();
      expect(
        product.execution.preparation.executionEligibility.constraints.mayPromoteResearchAuthority,
      ).toBe(false);
      expect(deterministicContentHash(snapshot)).toBe(snapshotBefore);
    },
  );

  test.each(['R36', 'R37', 'R38', 'R39'] as const)(
    '%s preserves unknown time rather than emitting a negative conclusion',
    (track) => {
      const snapshot = calculateCanonicalSajuSnapshot(
        {
          calendarType: 'solar',
          date: { year: 1992, month: 1, day: 5 },
          time: { known: false },
          sexForTraditionalCalculation: 'male',
        },
        DEFAULT_CALCULATION_POLICY,
        { now },
      );
      const built =
        track === 'R36'
          ? buildSajuR36BureauBreakResearchEvidence(snapshot)
          : track === 'R39'
            ? buildSajuR39StemRivalryResearchEvidence(snapshot)
            : track === 'R38'
              ? buildSajuR38RemoteNonjoiningResearchEvidence(snapshot)
              : buildSajuR37SupportPrecedenceResearchEvidence(snapshot);
      expect(built.status).toBe('unavailable');
      const registry =
        track === 'R36'
          ? createSajuR36BureauBreakResearchRegistry()
          : track === 'R39'
            ? createSajuR39StemRivalryResearchRegistry()
            : track === 'R38'
              ? createSajuR38RemoteNonjoiningResearchRegistry()
              : createSajuR37SupportPrecedenceResearchRegistry();
      expect(runInterpretation(snapshot, registry, { now }).claims).toHaveLength(0);
    },
  );
});
