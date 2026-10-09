import { describe, expect, test } from 'vitest';
import {
  HEAVENLY_STEMS,
  HEAVENLY_STEMS_HANJA,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
} from 'manseryeok';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import { ambiguous, resolved, unavailable } from '../src/contracts/common.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import { createResearchEvidenceEnvelope } from '../src/interpretation/research-evidence.js';
import {
  createRuleRegistrySnapshot,
  deterministicContentHash,
  RegistryConfigurationError,
} from '../src/interpretation/rule-registry.js';
import { projectSajuR38RemoteNonjoining } from '../src/research/shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';
import {
  buildSajuR41GengInterpositionResearchEvidence as build,
  projectSajuR41GengInterposition as project,
  validateSajuR41GengInterpositionResearchEvidence as validate,
  SAJU_R41_GENG_INTERPOSITION_EVIDENCE_DEFINITION as definition,
  SAJU_R41_GENG_INTERPOSITION_RUNTIME_ADAPTER as adapter,
  SAJU_R41_GENG_INTERPOSITION_AUTHORITY as authority,
} from '../src/research/shared-natal-r41-geng-interposition-research-evidence-adapter.js';
import {
  createSajuR41GengInterpositionResearchRegistry as registry,
  SAJU_R41_GENG_INTERPOSITION_PACK as pack,
} from '../src/research/shared-natal-r41-geng-interposition-structural-claim.js';
import { DEFAULT_CALCULATION_POLICY } from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-09T00:00:00Z');
const slots = ['year', 'month', 'day', 'hour'] as const;
const actual = calculateCanonicalSajuSnapshot(
  {
    calendarType: 'solar',
    date: { year: 1984, month: 6, day: 14 },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'male',
  },
  DEFAULT_CALCULATION_POLICY,
  { now },
);

// Supplied semantic fixtures are NOT calculated birth chart evidence.
function supplied(values: readonly string[]): CanonicalSajuSnapshot {
  const s = structuredClone(actual);
  for (const [i, slot] of slots.entries()) {
    const index = HEAVENLY_STEMS_HANJA.findIndex((v) => v === values[i]);
    const value = HEAVENLY_STEMS[index];
    const fact = s.pillars[slot];
    if (!value || fact.status !== 'resolved') throw new Error('Invalid test stem');
    s.pillars[slot] = resolved({
      ...fact.value,
      stem: {
        value,
        hanja: HEAVENLY_STEMS_HANJA[index]!,
        element: getHeavenlyStemElement(value),
        yinYang: getHeavenlyStemYinYang(value),
      },
    });
  }
  const day = s.pillars.day;
  if (day.status !== 'resolved') throw new Error('Unresolved day');
  s.derivedFacts.dayMaster = resolved(structuredClone(day.value.stem));
  s.calculationHash = deterministicContentHash({ suppliedR41: values });
  s.snapshotId = 'supplied_r41_' + s.calculationHash.slice(0, 24);
  return s;
}

function evidence(s: CanonicalSajuSnapshot) {
  const built = build(s);
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}
function run(s: CanonicalSajuSnapshot) {
  return runInterpretation(s, registry(), {
    now,
    researchEvidence: {
      runtimeRegistry: createResearchEvidenceRuntimeRegistry([adapter]),
      envelopes: [evidence(s)],
    },
  });
}

describe('R41 exact source 甲 庚 己 intervening nonjoining', () => {
  test('actual calculated chart has exact positive identity and one bounded research T2', () => {
    const before = deterministicContentHash(actual);
    expect(
      slots.map((slot) => {
        const p = actual.pillars[slot];
        if (p.status !== 'resolved') throw new Error('Expected complete calculated chart');
        return p.value.stem.hanja + p.value.branch.hanja;
      }),
    ).toEqual(['甲子', '庚午', '己卯', '丁卯']);
    const e = evidence(actual);
    expect(e.payload).toMatchObject({
      state: 'exact_interposed_geng_nonjoining',
      fullJoining: false,
      partialEffect: 'not_determined',
      zeroEffect: 'not_determined',
      supportEffect: 'not_determined',
      witness: {
        first: { slot: 'year', hanja: '甲', sourceFactRef: 'pillars.year.stem' },
        intervening: { slot: 'month', hanja: '庚', sourceFactRef: 'pillars.month.stem' },
        last: { slot: 'day', hanja: '己', sourceFactRef: 'pillars.day.stem' },
        fourthStem: { slot: 'hour', hanja: '丁' },
        pairId: 'JIA-JI',
        interveningControl: 'GENG_CONTROLS_JIA',
      },
    });
    expect(validate(e, actual).valid).toBe(true);
    const result = run(actual);
    expect(result.claims).toHaveLength(1);
    expect(result.claims[0]).toMatchObject({
      taxonomy: { tier: 'T2' },
      researchEvidenceRefs: [e.envelopeId],
      value: {
        fullJoining: false,
        partialEffect: 'not_determined',
        zeroEffect: 'not_determined',
        supportNetEffect: 'not_determined',
        qiangRuo: 'not_determined',
        narrativeMateriality: false,
        productionAuthority: false,
      },
    });
    expect(evidence(actual)).toEqual(e);
    expect(run(actual)).toEqual(result);
    expect(deterministicContentHash(actual)).toBe(before);
  });

  test.each([
    ['甲', '庚', '己', '丁'],
    ['丁', '甲', '庚', '己'],
  ])('source-directed triplet in either exact window is positive: %s %s %s %s', (...stems) => {
    const s = supplied(stems);
    expect(evidence(s).payload.state).toBe('exact_interposed_geng_nonjoining');
    expect(run(s).claims).toHaveLength(1);
  });

  test.each([
    ['己', '庚', '甲', '丁'],
    ['甲', '丙', '己', '丁'],
    ['甲', '己', '庚', '丁'],
    ['甲', '庚', '己', '甲'],
    ['甲', '庚', '己', '庚'],
    ['甲', '庚', '丙', '己'],
    ['甲', '丙', '庚', '己'],
  ])('reversal, non-Geng, duplicates, wider separation remain unknown: %s %s %s %s', (...stems) => {
    const s = supplied(stems);
    const e = evidence(s);
    expect(e.payload.state).toBe('outside_exact_source_interposition_scope');
    expect(e.payload.witness).toBeNull();
    expect(e.payload.fullJoining).toBe('not_determined');
    expect(run(s).claims).toHaveLength(0);
  });

  test.each(['snapshotId', 'calculationHash', 'dayMaster', 'year', 'month', 'day', 'hour'] as const)(
    'unavailable canonical %s never becomes negative joining', (field) => {
      const s = supplied(['甲', '庚', '己', '丁']);
      if (field === 'snapshotId') s.snapshotId = '';
      else if (field === 'calculationHash') s.calculationHash = '';
      else if (field === 'dayMaster') s.derivedFacts.dayMaster = unavailable('missing');
      else s.pillars[field] = unavailable('missing');
      expect(build(s).status).toBe('unavailable');
    },
  );

  test('ambiguous, metadata-forged, unknown-time and scenario input fail closed', () => {
    const a = supplied(['甲', '庚', '己', '丁']);
    const month = a.pillars.month;
    if (month.status !== 'resolved') throw new Error('Missing month');
    a.pillars.month = ambiguous(
      [
        { candidateId: 'a', value: month.value, reasonRefs: [] },
        { candidateId: 'b', value: month.value, reasonRefs: [] },
      ],
      ['ambiguous'],
    );
    const forged = supplied(['甲', '庚', '己', '丁']);
    if (forged.pillars.year.status === 'resolved') forged.pillars.year.value.stem.hanja = '乙';
    const scenarios = supplied(['甲', '庚', '己', '丁']);
    scenarios.scenarios = [{}] as never;
    const unknown = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1984, month: 6, day: 14 },
        time: { known: false },
        sexForTraditionalCalculation: 'male',
      },
      DEFAULT_CALCULATION_POLICY,
      { now },
    );
    for (const s of [a, forged, unknown]) {
      expect(build(s).status).toBe('unavailable');
      expect(runInterpretation(s, registry(), { now }).claims).toHaveLength(0);
    }
    // The synthetic scenario lacks claim-graph fields; only the R41 projector
    // is under test for that deliberately malformed input.
    expect(build(scenarios).status).toBe('unavailable');
  });

  test.each([
    ['state', 'FORGED_NONJOINING'],
    ['fullJoining', true],
    ['witness_first_slot', 'hour'],
    ['witness_intervening_hanja', '辛'],
    ['witness_last_source', 'pillars.year.stem'],
    ['authority', true],
  ] as const)('correctly re-enveloped %s forgery is rejected by full replay', (kind, value) => {
    const s = supplied(['甲', '庚', '己', '丁']);
    const e = evidence(s);
    const p = structuredClone(e.payload);
    if (kind === 'state') Object.assign(p, { state: value });
    if (kind === 'fullJoining') Object.assign(p, { fullJoining: value });
    if (kind === 'witness_first_slot') Object.assign(p.witness!.first, { slot: value });
    if (kind === 'witness_intervening_hanja') Object.assign(p.witness!.intervening, { hanja: value });
    if (kind === 'witness_last_source') Object.assign(p.witness!.last, { sourceFactRef: value });
    if (kind === 'authority') Object.assign(p.constraints, { productionAuthorityAuthorized: value });
    const tampered = createResearchEvidenceEnvelope(definition, s, p);
    expect(validate(tampered, s).valid).toBe(false);
    expect(validate(tampered, s).errors).toContain('saju_r41_exact_interposition_full_replay_mismatch');
  });

  test('R38 remains unchanged, branches are not read, and Production rejects', () => {
    const original = projectSajuR38RemoteNonjoining(actual);
    const s = supplied(['甲', '庚', '己', '丁']);
    for (const slot of slots) {
      const p = s.pillars[slot];
      if (p.status !== 'resolved') throw new Error('Resolved fixture expected');
      Object.defineProperty(p.value, 'branch', {
        get() { throw new Error('R41 must not read branch'); },
      });
    }
    expect(project(s).status).toBe('resolved');
    expect(projectSajuR38RemoteNonjoining(actual)).toEqual(original);
    expect(authority).toMatchObject({
      reverseOrderAuthorized: false,
      partialEffectAuthorized: false,
      zeroEffectAuthorized: false,
      effectiveMechanismForceAuthorized: false,
      strengthClassifierAuthorized: false,
      productionAuthorityAuthorized: false,
    });
    expect(registry().claimTypeDefinitions[0]?.materialForNarrative).toBe(false);
    expect(() =>
      createRuleRegistrySnapshot(registry(), { ...pack, status: 'production' }, now.toISOString()),
    ).toThrow(RegistryConfigurationError);
  });
});
