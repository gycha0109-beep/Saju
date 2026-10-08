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
import { projectSajuR38RemoteNonjoining } from '../src/research/shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';
import {
  buildSajuR39StemRivalryResearchEvidence as build,
  projectSajuR39StemRivalry as project,
  validateSajuR39StemRivalryResearchEvidence as validate,
  SAJU_R39_STEM_RIVALRY_EVIDENCE_DEFINITION as definition,
  SAJU_R39_STEM_RIVALRY_RUNTIME_ADAPTER as adapter,
  SAJU_R39_STEM_RIVALRY_AUTHORITY as authority,
} from '../src/research/shared-natal-r39-stem-rivalry-research-evidence-adapter.js';
import {
  createSajuR39StemRivalryResearchRegistry as registry,
  SAJU_R39_STEM_RIVALRY_PACK as pack,
} from '../src/research/shared-natal-r39-stem-rivalry-structural-claim.js';
import { DEFAULT_CALCULATION_POLICY } from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-08T00:00:00Z');
const slots = ['year', 'month', 'day', 'hour'] as const;
function calculated(day: number, hour: number, known = true) {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1984, month: 1, day },
      time: known ? { known: true, hour, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'male',
    },
    DEFAULT_CALCULATION_POLICY,
    { now },
  );
}
const actual = calculated(7, 17);
// Supplied canonical-domain matrices, not historical/birth-date charts.
function supplied(stems: readonly string[]): CanonicalSajuSnapshot {
  const s = structuredClone(actual);
  for (const [i, slot] of slots.entries()) {
    const index = HEAVENLY_STEMS_HANJA.findIndex((v) => v === stems[i]);
    const value = HEAVENLY_STEMS[index],
      p = s.pillars[slot];
    if (!value || p.status !== 'resolved') throw new Error('fixture');
    s.pillars[slot] = resolved({
      ...p.value,
      stem: {
        value,
        hanja: HEAVENLY_STEMS_HANJA[index]!,
        element: getHeavenlyStemElement(value),
        yinYang: getHeavenlyStemYinYang(value),
      },
    });
  }
  const day = s.pillars.day;
  if (day.status !== 'resolved') throw new Error('fixture');
  s.derivedFacts.dayMaster = resolved(structuredClone(day.value.stem));
  s.calculationHash = deterministicContentHash({ suppliedR39: stems });
  s.snapshotId = 'supplied_r39_' + s.calculationHash.slice(0, 24);
  return s;
}
function evidence(s: CanonicalSajuSnapshot) {
  const b = build(s);
  if (b.status !== 'resolved') throw new Error(b.reasonCode);
  return b.envelope;
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
const families = R051_FIVE_COMBINATION_FAMILIES.flatMap((pair) =>
  [false, true].map((reverse) => ({ pair, reverse })),
);
describe('R39 position-specific stem jealous rivalry, not binding or winner', () => {
  test.each(families)(
    '$pair.pairId reverse=$reverse distinguishes both booleans and reflections',
    ({ pair, reverse }) => {
      const a = reverse ? pair.right : pair.left,
        b = reverse ? pair.left : pair.right;
      const x = HEAVENLY_STEMS_HANJA.find((v) => v !== a && v !== b)!;
      for (const stems of [
        [b, a, b, x],
        [x, b, a, b],
        [a, b, x, b],
        [b, x, b, a],
      ]) {
        const s = supplied(stems),
          e = evidence(s),
          expected = stems[1] === a || stems[2] === a;
        expect(validate(e, s).valid).toBe(true);
        expect(e.payload).toMatchObject({
          jealousRivalry: expected,
          witness: { pairId: pair.pairId },
          fullJoining: 'not_determined',
          joiningWinner: 'not_determined',
        });
        expect(e.payload.witness?.counterpartStems).toHaveLength(2);
        for (const stem of e.payload.witness?.counterpartStems ?? [])
          expect(stem.sourceFactRef).toBe(`pillars.${stem.slot}.stem`);
        const result = run(s);
        expect(result.claims).toHaveLength(1);
        expect(result.claims[0]).toMatchObject({
          taxonomy: { tier: 'T2' },
          researchEvidenceRefs: [e.envelopeId],
          value: {
            jealousRivalry: expected,
            fullJoining: 'not_determined',
            joiningWinner: 'not_determined',
            partialEffect: 'not_determined',
            zeroEffect: 'not_determined',
            supportActivationPersistence: 'not_determined',
            qiangRuo: 'not_determined',
            narrativeMateriality: false,
            productionAuthority: false,
          },
        });
      }
    },
  );
  test.each([
    ['甲', '己', '己', '丙'],
    ['己', '己', '甲', '丙'],
    ['己', '丙', '甲', '己'],
    ['丙', '甲', '己', '己'],
    ['丙', '己', '己', '甲'],
    ['己', '甲', '丙', '己'],
  ])('other two-to-one ordering %s/%s/%s/%s stays unresolved', (...stems) => {
    const s = supplied(stems);
    expect(evidence(s).payload).toMatchObject({
      state: 'unresolved_topology',
      jealousRivalry: 'not_determined',
    });
    expect(run(s).claims).toHaveLength(0);
  });
  test.each([
    ['甲', '己', '甲', '己'],
    ['甲', '己', '己', '己'],
    ['甲', '甲', '己', '甲'],
    ['甲', '丙', '庚', '己'],
    ['甲', '乙', '丙', '丁'],
  ])('extra participants or missing two-to-one domain never become no-rivalry', (...stems) => {
    const s = supplied(stems);
    expect(evidence(s).payload).toMatchObject({
      state: 'outside_single_two_to_one_scope',
      witness: null,
      jealousRivalry: 'not_determined',
    });
    expect(run(s).claims).toHaveLength(0);
  });
  test.each([
    { day: 7, hour: 17, pillars: ['癸亥', '乙丑', '庚子', '乙酉'], verdict: true },
    { day: 10, hour: 11, pillars: ['癸亥', '乙丑', '癸卯', '戊午'], verdict: false },
  ])('untouched actual 1984-01-$day $hour:30 emits $verdict', ({ day, hour, pillars, verdict }) => {
    const s = calculated(day, hour),
      before = deterministicContentHash(s);
    expect(
      slots.map((slot) => {
        const p = s.pillars[slot];
        return p.status === 'resolved' ? p.value.stem.hanja + p.value.branch.hanja : '?';
      }),
    ).toEqual(pillars);
    expect(run(s).claims[0]?.value).toMatchObject({ jealousRivalry: verdict });
    expect(evidence(s).payload.witness).toMatchObject(
      verdict
        ? {
            pairId: 'YI-GENG',
            uniqueStem: { slot: 'day', hanja: '庚' },
            counterpartStems: [
              { slot: 'month', hanja: '乙' },
              { slot: 'hour', hanja: '乙' },
            ],
            otherStem: { slot: 'year', hanja: '癸' },
          }
        : {
            pairId: 'WU-GUI',
            uniqueStem: { slot: 'hour', hanja: '戊' },
            counterpartStems: [
              { slot: 'year', hanja: '癸' },
              { slot: 'day', hanja: '癸' },
            ],
            otherStem: { slot: 'month', hanja: '乙' },
          },
    );
    expect(run(s)).toEqual(run(s));
    expect(evidence(s)).toEqual(evidence(s));
    expect(registry()).toEqual(registry());
    expect(deterministicContentHash(s)).toBe(before);
  });
  test('source worked-case visible stems resolve no rivalry without force or role inputs', () => {
    const s = supplied(['庚', '乙', '甲', '乙']);
    expect(evidence(s).payload).toMatchObject({
      jealousRivalry: false,
      witness: {
        uniqueStem: { slot: 'year' },
        counterpartStems: [{ slot: 'month' }, { slot: 'hour' }],
      },
    });
    expect(projectSajuR38RemoteNonjoining(s)).toMatchObject({
      status: 'resolved',
      projection: { state: 'unresolved_competing_combination', fullJoining: 'not_determined' },
    });
    run(s);
    expect(projectSajuR38RemoteNonjoining(s)).toMatchObject({
      status: 'resolved',
      projection: { state: 'unresolved_competing_combination' },
    });
  });
  test.each(slots)('%s missing ambiguous and invalid metadata fail closed', (slot) => {
    const a = structuredClone(actual),
      b = structuredClone(actual),
      c = structuredClone(actual);
    a.pillars[slot] = unavailable('missing');
    const p = b.pillars[slot];
    if (p.status !== 'resolved') throw new Error('fixture');
    b.pillars[slot] = ambiguous(
      [
        { candidateId: 'a', value: p.value, reasonRefs: [] },
        { candidateId: 'b', value: p.value, reasonRefs: [] },
      ],
      ['ambiguous'],
    );
    const q = c.pillars[slot];
    if (q.status !== 'resolved') throw new Error('fixture');
    q.value.stem.element = '토';
    for (const s of [a, b, c]) expect(build(s).status).toBe('unavailable');
  });
  test('binding master scenario and unknown time remain unavailable', () => {
    const cases = Array.from({ length: 5 }, () => structuredClone(actual));
    cases[0]!.snapshotId = '';
    cases[1]!.calculationHash = '';
    cases[2]!.derivedFacts.dayMaster = unavailable('missing');
    cases[3]!.scenarios = [{}] as never;
    const m = cases[4]!.derivedFacts.dayMaster;
    if (m.status !== 'resolved') throw new Error('fixture');
    m.value.hanja = '丁';
    for (const s of cases) expect(build(s).status).toBe('unavailable');
    expect(build(calculated(7, 17, false)).status).toBe('unavailable');
    expect(runInterpretation(actual, registry(), { now }).claims).toHaveLength(0);
  });
  test.each([
    'omission',
    'identity',
    'duplicate',
    'pair',
    'verdict',
    'topology',
    'winner',
    'source',
    'authority',
  ] as const)('re-enveloped %s forgery fails full replay', (kind) => {
    const payload = structuredClone(evidence(actual).payload);
    if (kind === 'omission') Reflect.deleteProperty(payload, 'witness');
    if (kind === 'identity')
      Object.assign(payload.witness!.uniqueStem, {
        slot: 'year',
        sourceFactRef: 'pillars.year.stem',
      });
    if (kind === 'duplicate')
      Object.assign(payload.witness!, {
        counterpartStems: [
          payload.witness!.counterpartStems[0],
          payload.witness!.counterpartStems[0],
        ],
      });
    if (kind === 'pair') Object.assign(payload.witness!, { pairId: 'JIA-JI' });
    if (kind === 'verdict') Object.assign(payload, { jealousRivalry: false });
    if (kind === 'topology') Object.assign(payload, { state: 'separated_without_rivalry' });
    if (kind === 'winner') Object.assign(payload, { joiningWinner: 'year' });
    if (kind === 'source') Object.assign(payload.constraints.source, { scanSha256: 'forged' });
    if (kind === 'authority')
      Object.assign(payload.constraints, { productionAuthorityAuthorized: true });
    expect(
      validate(createResearchEvidenceEnvelope(definition, actual, payload), actual).valid,
    ).toBe(false);
  });
  test('snapshot drift, wrong authority and canonical source namespace fail closed', () => {
    const e = evidence(actual),
      other = calculated(10, 11);
    expect(validate(e, other).valid).toBe(false);
    expect(validate({ ...e, authority: 'production' as never }, actual).valid).toBe(false);
    const s = structuredClone(actual),
      p = s.pillars.month;
    if (p.status !== 'resolved') throw new Error('fixture');
    Object.assign(p.value.stem, { slot: 'year', sourceFactRef: 'forged' });
    expect(evidence(s).payload.stems.month).toMatchObject({
      slot: 'month',
      sourceFactRef: 'pillars.month.stem',
    });
    p.value.stem.hanja = '丁';
    expect(validate(e, s).valid).toBe(false);
  });
  test('no branch or downstream effect input; earlier authority unchanged; Production rejects', () => {
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
    Object.defineProperty(s.derivedFacts, 'stemInteractionSettlements', {
      get() {
        throw new Error('product convention accessed');
      },
    });
    expect(project(s).status).toBe('resolved');
    const prior = projectSajuR38RemoteNonjoining(actual),
      pairHash = deterministicContentHash(R051_FIVE_COMBINATION_FAMILIES);
    run(actual);
    expect(projectSajuR38RemoteNonjoining(actual)).toEqual(prior);
    expect(deterministicContentHash(R051_FIVE_COMBINATION_FAMILIES)).toBe(pairHash);
    expect(authority).toMatchObject({
      fullJoiningAuthorized: false,
      joiningWinnerAuthorized: false,
      joiningIntentRemovalAuthorized: false,
      supportActivationPersistenceAuthorized: false,
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
