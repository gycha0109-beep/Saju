import { describe, expect, test } from 'vitest';
import {
  EARTHLY_BRANCHES,
  EARTHLY_BRANCHES_HANJA,
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
  HEAVENLY_STEMS,
  HEAVENLY_STEMS_HANJA,
} from 'manseryeok';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
} from '../src/contracts/calculation.js';
import { ambiguous, resolved, unavailable } from '../src/contracts/common.js';
import {
  runInterpretation,
  ResearchEvidenceExecutionError,
} from '../src/interpretation/interpretation-engine.js';
import {
  createResearchEvidenceEnvelope,
  validateResearchEvidenceEnvelope,
  type ResearchEvidenceEnvelope,
} from '../src/interpretation/research-evidence.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import {
  createRuleRegistrySnapshot,
  deterministicContentHash,
  RegistryConfigurationError,
} from '../src/interpretation/rule-registry.js';
import {
  projectWoodMonthCommandTiming,
  buildWoodMonthCommandTimingResearchEvidence,
  validateWoodMonthCommandTimingResearchEvidence,
  WOOD_MONTH_COMMAND_TIMING_EVIDENCE_DEFINITION as definition,
  WOOD_MONTH_COMMAND_TIMING_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-wood-month-command-timing-research-evidence-adapter.js';
import {
  createWoodMonthCommandTimingResearchRegistry,
  WOOD_MONTH_COMMAND_TIMING_CLAIM_TYPE_DEFINITION,
  WOOD_MONTH_COMMAND_TIMING_CLAIM_VALUE_SCHEMA,
  WOOD_MONTH_COMMAND_TIMING_RULES,
  WOOD_MONTH_COMMAND_TIMING_METHODOLOGY,
  WOOD_MONTH_COMMAND_TIMING_SOURCES,
  WOOD_MONTH_COMMAND_TIMING_PACK,
} from '../src/research/shared-natal-wood-month-command-timing-structural-claim.js';
import { buildSajuR34StrengthRootSubstrate } from '../src/research/saju-r34-strength-root-substrate.js';
import {
  DEFAULT_CALCULATION_POLICY,
  UPSTREAM_1992_GOLDEN_FIXTURE,
} from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-08T00:00:00Z');
const base = calculateCanonicalSajuSnapshot(
  UPSTREAM_1992_GOLDEN_FIXTURE.input,
  DEFAULT_CALCULATION_POLICY,
  { now },
);
// Supplied-domain matrix, explicitly synthetic rather than a recalculated birth chart.
function fixture(stem: HeavenlyStem = '을', branch: EarthlyBranch = '인') {
  const s = structuredClone(base);
  const master = {
    value: stem,
    element: getHeavenlyStemElement(stem),
    yinYang: getHeavenlyStemYinYang(stem),
    hanja: HEAVENLY_STEMS_HANJA[HEAVENLY_STEMS.indexOf(stem)]!,
  };
  if (s.pillars.day.status !== 'resolved' || s.pillars.month.status !== 'resolved')
    throw new Error('fixture');
  s.derivedFacts.dayMaster = resolved(master);
  s.pillars.day.value.stem = structuredClone(master);
  s.pillars.month.value.branch = {
    value: branch,
    element: getEarthlyBranchElement(branch),
    yinYang: getEarthlyBranchYinYang(branch),
    hanja: EARTHLY_BRANCHES_HANJA[EARTHLY_BRANCHES.indexOf(branch)]!,
  };
  s.calculationHash = deterministicContentHash({ syntheticR35: s.pillars });
  s.snapshotId = 'synthetic_r35_' + s.calculationHash.slice(0, 24);
  return s;
}
function evidence(s: CanonicalSajuSnapshot) {
  const r = buildWoodMonthCommandTimingResearchEvidence(s);
  if (r.status !== 'resolved') throw new Error(r.reasonCode);
  return r.envelope;
}
function run(
  s: CanonicalSajuSnapshot,
  envelopes: readonly ResearchEvidenceEnvelope[] = [evidence(s)],
) {
  return runInterpretation(s, createWoodMonthCommandTimingResearchRegistry(), {
    now,
    researchEvidence: {
      runtimeRegistry: createResearchEvidenceRuntimeRegistry([
        WOOD_MONTH_COMMAND_TIMING_RUNTIME_ADAPTER,
      ]),
      envelopes,
    },
  });
}

describe('R35 governed Wood month-command timing', () => {
  test.each([
    { month: 2, day: 18, stem: '갑', branch: '인', state: 'de_shi_month_observed' },
    { month: 2, day: 19, stem: '을', branch: '인', state: 'de_shi_month_observed' },
    { month: 8, day: 16, stem: '갑', branch: '신', state: 'shi_shi_month_observed' },
    { month: 8, day: 17, stem: '을', branch: '신', state: 'shi_shi_month_observed' },
  ])(
    'runs actual canonical 1992/$month/$day through a registered T2 verdict',
    ({ month, day, stem, branch, state }) => {
      const s = calculateCanonicalSajuSnapshot(
        { ...UPSTREAM_1992_GOLDEN_FIXTURE.input, date: { year: 1992, month, day } },
        DEFAULT_CALCULATION_POLICY,
        { now },
      );
      const before = deterministicContentHash(s);
      const e = evidence(s);
      expect(e.payload).toMatchObject({ dayMaster: stem, monthBranch: branch, timingState: state });
      const result = run(s);
      expect(result.claims).toHaveLength(1);
      expect(result.claims[0]).toMatchObject({
        taxonomy: { tier: 'T2' },
        researchEvidenceRefs: [e.envelopeId],
        value: {
          timingState: state,
          wholeChartWangShuai: 'not_determined',
          qiangRuo: 'not_determined',
          productionAuthority: false,
        },
      });
      expect(validateWoodMonthCommandTimingResearchEvidence(e, s).valid).toBe(true);
      expect(deterministicContentHash(s)).toBe(before);
      expect(run(s)).toEqual(result);
    },
  );
  const pairs = HEAVENLY_STEMS.flatMap((stem) =>
    EARTHLY_BRANCHES.map((branch) => ({ stem, branch })),
  );
  test.each(pairs)('independent 120-pair scope matrix $stem/$branch', ({ stem, branch }) => {
    const s = fixture(stem, branch);
    const expected = !['갑', '을'].includes(stem)
      ? 'outside_selected_source_scope'
      : ['인', '묘'].includes(branch)
        ? 'de_shi_month_observed'
        : ['신', '유'].includes(branch)
          ? 'shi_shi_month_observed'
          : 'unresolved_by_selected_source_primitive';
    expect(evidence(s).payload.timingState).toBe(expected);
    const admitted = expected === 'de_shi_month_observed' || expected === 'shi_shi_month_observed';
    expect(run(s).claims).toHaveLength(admitted ? 1 : 0);
  });
  test('admits exactly eight combinations and never turns missing or unresolved into negative timing', () => {
    const admitted = pairs.filter(
      ({ stem, branch }) => run(fixture(stem, branch)).claims.length === 1,
    );
    expect(admitted).toHaveLength(8);
    expect(run(fixture(), []).claims).toHaveLength(0);
    expect(evidence(fixture('갑', '진')).payload.timingState).toBe(
      'unresolved_by_selected_source_primitive',
    );
    expect(evidence(fixture('병', '인')).payload.timingState).toBe('outside_selected_source_scope');
  });
  test('requires exact ID/hash, no scenarios and resolved master/day/month including ambiguous inputs', () => {
    const bad: CanonicalSajuSnapshot[] = [];
    for (const key of ['snapshotId', 'calculationHash'] as const) {
      const s = fixture();
      s[key] = ' ';
      bad.push(s);
    }
    for (const slot of ['day', 'month'] as const) {
      let s = fixture();
      s.pillars[slot] = unavailable('test-missing');
      bad.push(s);
      s = fixture();
      const pillar = s.pillars[slot];
      if (pillar.status !== 'resolved') throw new Error('fixture');
      s.pillars[slot] = ambiguous(
        [
          { candidateId: 'a', value: pillar.value, reasonRefs: [] },
          { candidateId: 'b', value: pillar.value, reasonRefs: [] },
        ],
        ['test-ambiguous'],
      );
      bad.push(s);
    }
    let s = fixture();
    s.derivedFacts.dayMaster = unavailable('test-missing');
    bad.push(s);
    s = fixture();
    const master = s.derivedFacts.dayMaster;
    if (master.status !== 'resolved') throw new Error('fixture');
    s.derivedFacts.dayMaster = ambiguous(
      [
        { candidateId: 'a', value: master.value, reasonRefs: [] },
        { candidateId: 'b', value: master.value, reasonRefs: [] },
      ],
      ['test-ambiguous'],
    );
    bad.push(s);
    s = fixture();
    s.scenarios = [{}] as never;
    bad.push(s);
    s = fixture();
    s.scenarios = undefined as never;
    bad.push(s);
    for (const item of bad) {
      expect(buildWoodMonthCommandTimingResearchEvidence(item).status).toBe('unavailable');
      expect(validateWoodMonthCommandTimingResearchEvidence(evidence(fixture()), item).valid).toBe(
        false,
      );
    }
  });
  test.each(['value', 'element', 'yinYang', 'hanja'] as const)(
    'rejects matching master/day metadata forgery and month $0 forgery',
    (key) => {
      let s = fixture();
      if (s.derivedFacts.dayMaster.status !== 'resolved' || s.pillars.day.status !== 'resolved')
        throw new Error('fixture');
      const forged = { ...s.derivedFacts.dayMaster.value, [key]: 'forged' };
      s.derivedFacts.dayMaster = resolved(forged as never);
      s.pillars.day.value.stem = structuredClone(forged) as never;
      expect(projectWoodMonthCommandTiming(s).status).toBe('unavailable');
      s = fixture();
      if (s.pillars.month.status !== 'resolved') throw new Error('fixture');
      Object.assign(s.pillars.month.value.branch, { [key]: 'forged' });
      expect(projectWoodMonthCommandTiming(s).status).toBe('unavailable');
    },
  );
  test('rejects day-master/day-pillar parity drift', () => {
    const s = fixture();
    s.derivedFacts.dayMaster = fixture('갑').derivedFacts.dayMaster;
    expect(projectWoodMonthCommandTiming(s).status).toBe('unavailable');
  });
  test('never dereferences hidden/root/TenGod/year/hour or the day branch', () => {
    const s = fixture('갑', '진');
    for (const key of ['hiddenStems', 'tenGods'])
      Object.defineProperty(s.derivedFacts, key, {
        get: () => {
          throw new Error('unrelated fact');
        },
      });
    for (const key of ['year', 'hour'])
      Object.defineProperty(s.pillars, key, {
        get: () => {
          throw new Error('wrong slot');
        },
      });
    if (s.pillars.day.status !== 'resolved') throw new Error('fixture');
    Object.defineProperty(s.pillars.day.value, 'branch', {
      get: () => {
        throw new Error('wrong branch');
      },
    });
    expect(evidence(s).payload.timingState).toBe('unresolved_by_selected_source_primitive');
  });
  test.each([
    'timing',
    'source',
    'master',
    'month',
    'definition',
    'constraints',
    'season',
    'count',
    'rootEffect',
  ])('rejects fully rehashed payload %s forgery at runtime', (field) => {
    const s = fixture();
    const payload = structuredClone(evidence(s).payload);
    if (field === 'timing') Object.assign(payload, { timingState: 'shi_shi_month_observed' });
    else if (field === 'source')
      Object.assign(payload, { monthBranchSourceFactRef: 'pillars.year.branch' });
    else if (field === 'master') Object.assign(payload, { dayMaster: '갑' });
    else if (field === 'month') Object.assign(payload, { monthBranch: '묘' });
    else if (field === 'definition') Object.assign(payload, { authorityDefinitionHash: 'forged' });
    else if (field === 'constraints')
      Object.assign(payload.constraints, { productionFactEmissionAuthorized: true });
    else Object.assign(payload, { [field]: 'forged' });
    const forged = createResearchEvidenceEnvelope(definition, s, payload);
    expect(validateResearchEvidenceEnvelope(forged, s, definition).valid).toBe(true);
    expect(validateWoodMonthCommandTimingResearchEvidence(forged, s).valid).toBe(false);
    expect(() => run(s, [forged])).toThrow(ResearchEvidenceExecutionError);
  });
  test.each([
    'envelopeId',
    'snapshotId',
    'snapshotHash',
    'payloadHash',
    'definitionContentHash',
  ] as const)('rejects exact envelope $0 drift', (key) => {
    const s = fixture();
    const e = evidence(s);
    expect(validateWoodMonthCommandTimingResearchEvidence({ ...e, [key]: 'forged' }, s).valid).toBe(
      false,
    );
  });
  test('detects canonical fact drift with reused binding and separates missing from forged evidence', () => {
    const s = fixture();
    const drift = fixture('갑', '유');
    drift.snapshotId = s.snapshotId;
    drift.calculationHash = s.calculationHash;
    expect(validateWoodMonthCommandTimingResearchEvidence(evidence(s), drift).valid).toBe(false);
    expect(
      validateWoodMonthCommandTimingResearchEvidence({ ...evidence(s), sourceIds: ['wrong'] }, s)
        .valid,
    ).toBe(false);
    expect(
      validateWoodMonthCommandTimingResearchEvidence(
        { ...evidence(s), authority: 'production' as never },
        s,
      ).valid,
    ).toBe(false);
  });
  test('is deterministic, leaves R34 unchanged and rejects Production selection', () => {
    expect(evidence(base)).toEqual(evidence(base));
    expect(createWoodMonthCommandTimingResearchRegistry()).toEqual(
      createWoodMonthCommandTimingResearchRegistry(),
    );
    const before = buildSajuR34StrengthRootSubstrate(base);
    evidence(base);
    expect(buildSajuR34StrengthRootSubstrate(base)).toEqual(before);
    expect(WOOD_MONTH_COMMAND_TIMING_CLAIM_TYPE_DEFINITION.materialForNarrative).toBe(false);
    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: WOOD_MONTH_COMMAND_TIMING_RULES,
          methodologies: [WOOD_MONTH_COMMAND_TIMING_METHODOLOGY],
          sources: [...WOOD_MONTH_COMMAND_TIMING_SOURCES],
          claimTypeDefinitions: [WOOD_MONTH_COMMAND_TIMING_CLAIM_TYPE_DEFINITION],
          claimValueSchemas: [WOOD_MONTH_COMMAND_TIMING_CLAIM_VALUE_SCHEMA],
          reviewAttestations: [],
        },
        { ...WOOD_MONTH_COMMAND_TIMING_PACK, status: 'production' },
        now.toISOString(),
      ),
    ).toThrow(RegistryConfigurationError);
  });
});
