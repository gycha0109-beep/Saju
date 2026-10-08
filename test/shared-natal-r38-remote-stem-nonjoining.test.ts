import { describe, expect, test } from 'vitest';
import {
  HEAVENLY_STEMS,
  HEAVENLY_STEMS_HANJA,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
} from 'manseryeok';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import { resolved, unavailable, ambiguous } from '../src/contracts/common.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import { createResearchEvidenceEnvelope } from '../src/interpretation/research-evidence.js';
import {
  createRuleRegistrySnapshot,
  deterministicContentHash,
  RegistryConfigurationError,
} from '../src/interpretation/rule-registry.js';
import { R051_FIVE_COMBINATION_FAMILIES } from '../src/research/general-natal-heavenly-stem-five-combination.js';
import { buildSajuR34StrengthRootSubstrate } from '../src/research/saju-r34-strength-root-substrate.js';
import {
  buildSajuR38RemoteNonjoiningResearchEvidence as build,
  projectSajuR38RemoteNonjoining as project,
  validateSajuR38RemoteNonjoiningResearchEvidence as validate,
  SAJU_R38_REMOTE_NONJOINING_EVIDENCE_DEFINITION as definition,
  SAJU_R38_REMOTE_NONJOINING_RUNTIME_ADAPTER as adapter,
  SAJU_R38_REMOTE_NONJOINING_AUTHORITY as authority,
} from '../src/research/shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';
import {
  createSajuR38RemoteNonjoiningResearchRegistry as registry,
  SAJU_R38_REMOTE_NONJOINING_PACK as pack,
} from '../src/research/shared-natal-r38-remote-stem-nonjoining-structural-claim.js';
import { DEFAULT_CALCULATION_POLICY } from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-08T00:00:00Z');
const slots = ['year', 'month', 'day', 'hour'] as const;
const actual = calculateCanonicalSajuSnapshot(
  {
    calendarType: 'solar',
    date: { year: 1984, month: 2, day: 6 },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'male',
  },
  DEFAULT_CALCULATION_POLICY,
  { now },
);

// Supplied-domain fixtures only: not asserted to be calculated birth charts.
function supplied(stems: readonly string[]): CanonicalSajuSnapshot {
  const s = structuredClone(actual);
  for (const [i, slot] of slots.entries()) {
    const index = HEAVENLY_STEMS_HANJA.findIndex((stem) => stem === stems[i]);
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
  if (day.status !== 'resolved') throw new Error('Missing day');
  s.derivedFacts.dayMaster = resolved(structuredClone(day.value.stem));
  s.calculationHash = deterministicContentHash({ suppliedR38: stems });
  s.snapshotId = 'supplied_r38_' + s.calculationHash.slice(0, 24);
  return s;
}

function evidence(s: CanonicalSajuSnapshot) {
  const result = build(s);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.envelope;
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
const familyCases = R051_FIVE_COMBINATION_FAMILIES.flatMap((pair) =>
  [false, true].map((reverse) => ({ pair, reverse })),
);

describe('R38 bounded year/hour remote full-nonjoining', () => {
  test.each(familyCases)(
    '$pair.pairId reverse=$reverse emits actual false, never zero effect',
    ({ pair, reverse }) => {
      const middle = HEAVENLY_STEMS_HANJA.filter((v) => v !== pair.left && v !== pair.right);
      const s = supplied([
        reverse ? pair.right : pair.left,
        middle[0]!,
        middle[1]!,
        reverse ? pair.left : pair.right,
      ]);
      const e = evidence(s);
      expect(validate(e, s).valid).toBe(true);
      expect(e.payload).toMatchObject({
        pairId: pair.pairId,
        state: 'remote_nonjoining',
        fullJoining: false,
        partialEffect: 'not_determined',
        competingEndpointPairs: [],
        stems: {
          year: { sourceFactRef: 'pillars.year.stem' },
          hour: { sourceFactRef: 'pillars.hour.stem' },
        },
      });
      const result = run(s);
      expect(result.claims).toHaveLength(1);
      expect(result.claims[0]).toMatchObject({
        taxonomy: { tier: 'T2' },
        researchEvidenceRefs: [e.envelopeId],
        value: {
          fullJoining: false,
          partialEffect: 'not_determined',
          zeroEffect: 'not_determined',
          supportActivationPersistence: 'not_determined',
          qiangRuo: 'not_determined',
          narrativeMateriality: false,
          productionAuthority: false,
        },
      });
    },
  );

  test.each([
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [2, 3],
  ])('other pair distance %i/%i stays outside this verdict', (a, b) => {
    const stems = ['丙', '丙', '庚', '庚'];
    stems[a] = '甲';
    stems[b] = '己';
    const s = supplied(stems);
    expect(evidence(s).payload).toMatchObject({
      state: 'outside_year_hour_pair_scope',
      fullJoining: 'not_determined',
    });
    expect(run(s).claims).toHaveLength(0);
  });

  test.each(['month', 'day'] as const)('endpoint competitor in %s is unresolved', (slot) => {
    const stems = ['甲', '丙', '庚', '己'];
    stems[slot === 'month' ? 1 : 2] = '己';
    const s = supplied(stems);
    expect(evidence(s).payload).toMatchObject({
      state: 'unresolved_competing_combination',
      fullJoining: 'not_determined',
    });
    expect(run(s).claims).toHaveLength(0);
    const opposite = supplied(['甲', '甲', '庚', '己']);
    expect(run(opposite).claims).toHaveLength(0);
  });

  test('untouched calculated source-example positive executes registered T2 deterministically', () => {
    const before = deterministicContentHash(actual);
    expect(
      slots.map((slot) => {
        const p = actual.pillars[slot];
        return p.status === 'resolved' ? p.value.stem.hanja + p.value.branch.hanja : '?';
      }),
    ).toEqual(['甲子', '丙寅', '庚午', '己卯']);
    expect(evidence(actual).payload).toMatchObject({ pairId: 'JIA-JI', fullJoining: false });
    expect(run(actual).claims).toHaveLength(1);
    expect(run(actual)).toEqual(run(actual));
    expect(evidence(actual)).toEqual(evidence(actual));
    expect(registry()).toEqual(registry());
    expect(deterministicContentHash(actual)).toBe(before);
  });

  test.each(slots)('%s missing, ambiguous, invalid metadata all fail closed', (slot) => {
    const missing = structuredClone(actual);
    missing.pillars[slot] = unavailable('missing');
    const amb = structuredClone(actual);
    const fact = amb.pillars[slot];
    if (fact.status !== 'resolved') throw new Error('fixture');
    amb.pillars[slot] = ambiguous(
      [
        { candidateId: 'a', value: fact.value, reasonRefs: [] },
        { candidateId: 'b', value: fact.value, reasonRefs: [] },
      ],
      ['ambiguous'],
    );
    const invalid = structuredClone(actual);
    const p = invalid.pillars[slot];
    if (p.status !== 'resolved') throw new Error('fixture');
    p.value.stem.hanja = '乙';
    for (const s of [missing, amb, invalid]) expect(build(s).status).toBe('unavailable');
  });

  test('binding, master, scenario and unknown time never become negative joining', () => {
    const cases = Array.from({ length: 5 }, () => structuredClone(actual));
    cases[0]!.snapshotId = '';
    cases[1]!.calculationHash = '';
    cases[2]!.derivedFacts.dayMaster = unavailable('missing');
    cases[3]!.scenarios = [{}] as never;
    const master = cases[4]!.derivedFacts.dayMaster;
    if (master.status !== 'resolved') throw new Error('fixture');
    master.value.hanja = '乙';
    for (const s of cases) expect(build(s).status).toBe('unavailable');
    const unknown = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1984, month: 2, day: 6 },
        time: { known: false },
        sexForTraditionalCalculation: 'male',
      },
      DEFAULT_CALCULATION_POLICY,
      { now },
    );
    expect(build(unknown).status).toBe('unavailable');
    expect(runInterpretation(unknown, registry(), { now }).claims).toHaveLength(0);
  });

  test.each([
    'omission',
    'pair',
    'source',
    'duplicate',
    'fullJoining',
    'partialEffect',
    'authority',
    'competition',
  ] as const)('full replay rejects re-enveloped %s forgery', (kind) => {
    const e = evidence(actual),
      payload = structuredClone(e.payload);
    if (kind === 'omission') Reflect.deleteProperty(payload, 'stems');
    if (kind === 'pair') Object.assign(payload, { pairId: 'YI-GENG' });
    if (kind === 'source')
      Object.assign(payload.stems, { year: { sourceFactRef: 'pillars.hour.stem' } });
    if (kind === 'duplicate')
      Object.assign(payload, {
        competingEndpointPairs: [
          { endpointSlot: 'year', interveningSlot: 'month', pairId: 'JIA-JI' },
        ],
      });
    if (kind === 'fullJoining') Object.assign(payload, { fullJoining: true });
    if (kind === 'partialEffect') Object.assign(payload, { partialEffect: 'zero' });
    if (kind === 'authority')
      Object.assign(payload.constraints, { productionAuthorityAuthorized: true });
    if (kind === 'competition') Object.assign(payload, { state: 'outside_year_hour_pair_scope' });
    const forged = createResearchEvidenceEnvelope(definition, actual, payload);
    expect(validate(forged, actual).valid).toBe(false);
  });

  test('wrong envelope authority/binding, missing evidence and payload drift are rejected', () => {
    const e = evidence(actual);
    expect(validate({ ...e, authority: 'production' as never }, actual).valid).toBe(false);
    const other = supplied(['甲', '丁', '庚', '己']);
    expect(validate(e, other).valid).toBe(false);
    expect(runInterpretation(actual, registry(), { now }).claims).toHaveLength(0);
    const changed = structuredClone(actual);
    const month = changed.pillars.month;
    if (month.status !== 'resolved') throw new Error('fixture');
    month.value.stem.hanja = '丁';
    expect(validate(e, changed).valid).toBe(false);
  });

  test('canonical stem extras cannot override derived source position or namespace', () => {
    const s = structuredClone(actual),
      year = s.pillars.year;
    if (year.status !== 'resolved') throw new Error('fixture');
    Object.assign(year.value.stem, { slot: 'hour', sourceFactRef: 'forged' });
    expect(evidence(s).payload.stems.year).toMatchObject({
      slot: 'year',
      sourceFactRef: 'pillars.year.stem',
    });
  });

  test('no branch/hidden access; R34 and R051 authority stay unchanged; Production rejects', () => {
    const s = structuredClone(actual);
    for (const slot of slots) {
      const p = s.pillars[slot];
      if (p.status !== 'resolved') throw new Error('fixture');
      Object.defineProperty(p.value, 'branch', {
        get() {
          throw new Error('branch accessed');
        },
      });
    }
    expect(project(s).status).toBe('resolved');
    const roots = buildSajuR34StrengthRootSubstrate(actual),
      pairs = deterministicContentHash(R051_FIVE_COMBINATION_FAMILIES);
    run(actual);
    expect(buildSajuR34StrengthRootSubstrate(actual)).toEqual(roots);
    expect(deterministicContentHash(R051_FIVE_COMBINATION_FAMILIES)).toBe(pairs);
    expect(authority).toMatchObject({
      zeroEffectInferenceAuthorized: false,
      strengthClassifierAuthorized: false,
      productionAuthorityAuthorized: false,
    });
    const r = registry();
    expect(r.claimTypeDefinitions[0]?.materialForNarrative).toBe(false);
    expect(() =>
      createRuleRegistrySnapshot(r, { ...pack, status: 'production' }, now.toISOString()),
    ).toThrow(RegistryConfigurationError);
  });
});
