import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
  HEAVENLY_STEMS,
  HEAVENLY_STEMS_HANJA,
} from 'manseryeok';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { enrichCanonicalHiddenStems } from '../src/calculation/hidden-stems.js';
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
  INTRINSIC_TONGGEN_AUTHORITY,
  INTRINSIC_TONGGEN_SLOTS as slots,
  projectIntrinsicTonggen,
} from '../src/research/phase-independent-intrinsic-tonggen-authority.js';
import {
  buildIntrinsicTonggenResearchEvidence,
  validateIntrinsicTonggenResearchEvidence,
  INTRINSIC_TONGGEN_EVIDENCE_DEFINITION as definition,
  INTRINSIC_TONGGEN_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-intrinsic-tonggen-research-evidence-adapter.js';
import {
  createIntrinsicTonggenResearchRegistry,
  INTRINSIC_TONGGEN_CLAIM_TYPE_DEFINITION,
  INTRINSIC_TONGGEN_CLAIM_VALUE_SCHEMA,
  INTRINSIC_TONGGEN_RULES,
  INTRINSIC_TONGGEN_METHODOLOGY,
  INTRINSIC_TONGGEN_SOURCES,
  INTRINSIC_TONGGEN_PACK,
} from '../src/research/shared-natal-intrinsic-tonggen-structural-claim.js';
import * as phase from '../src/research/general-natal-twelve-growth-stage-mapping-authority.js';
import { buildSharedNatalBoundedTonggenSupportResearchEvidence } from '../src/research/shared-natal-bounded-tonggen-support-research-evidence-adapter.js';
import { buildGovernedSupportPartialOrderResearchEvidence } from '../src/research/shared-natal-governed-support-partial-order-research-evidence-adapter.js';
import { buildGovernedBiyinSupportInventoryResearchEvidence } from '../src/research/shared-natal-governed-biyin-support-inventory-research-evidence-adapter.js';
import {
  DEFAULT_CALCULATION_POLICY,
  UPSTREAM_1992_GOLDEN_FIXTURE,
} from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-07T00:00:00Z');
const base = calculateCanonicalSajuSnapshot(
  UPSTREAM_1992_GOLDEN_FIXTURE.input,
  DEFAULT_CALCULATION_POLICY,
  { now },
);
// Synthetic supplied-domain fixture, not a recalculated birth chart.
function fixture(
  stem: HeavenlyStem = '을',
  branches: readonly EarthlyBranch[] = ['오', '해', '묘', '신'],
) {
  const snapshot = structuredClone(base);
  const master = {
    value: stem,
    element: getHeavenlyStemElement(stem),
    yinYang: getHeavenlyStemYinYang(stem),
    hanja: HEAVENLY_STEMS_HANJA[HEAVENLY_STEMS.indexOf(stem)]!,
  };
  snapshot.derivedFacts.dayMaster = resolved(structuredClone(master));
  for (const [i, slot] of slots.entries()) {
    const pillar = snapshot.pillars[slot];
    if (pillar.status !== 'resolved') throw new Error('fixture pillar required');
    snapshot.pillars[slot] = resolved({
      ...pillar.value,
      ...(slot === 'day' ? { stem: structuredClone(master) } : {}),
      branch: { ...pillar.value.branch, value: branches[i]! },
    });
  }
  snapshot.calculationHash = deterministicContentHash({ syntheticR33: snapshot.pillars });
  snapshot.snapshotId = `synthetic_r33_${snapshot.calculationHash.slice(0, 24)}`;
  return enrichCanonicalHiddenStems(snapshot);
}
function evidence(snapshot: CanonicalSajuSnapshot) {
  const result = buildIntrinsicTonggenResearchEvidence(snapshot);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.envelope;
}
function run(
  snapshot: CanonicalSajuSnapshot,
  envelopes: readonly ResearchEvidenceEnvelope[] = [evidence(snapshot)],
) {
  return runInterpretation(snapshot, createIntrinsicTonggenResearchRegistry(), {
    now,
    researchEvidence: {
      runtimeRegistry: createResearchEvidenceRuntimeRegistry([INTRINSIC_TONGGEN_RUNTIME_ADAPTER]),
      envelopes,
    },
  });
}
afterEach(() => vi.restoreAllMocks());

describe('R33 phase-independent intrinsic Tonggen', () => {
  test('consumes an actual canonical snapshot through four registered T2 verdicts with exact provenance', () => {
    const before = deterministicContentHash(base);
    const envelope = evidence(base);
    const result = run(base);
    expect(result.claims).toHaveLength(4);
    for (const claim of result.claims)
      expect(claim).toMatchObject({
        taxonomy: { tier: 'T2' },
        researchEvidenceRefs: [envelope.envelopeId],
      });
    expect(INTRINSIC_TONGGEN_CLAIM_TYPE_DEFINITION.materialForNarrative).toBe(false);
    expect(validateIntrinsicTonggenResearchEvidence(envelope, base).valid).toBe(true);
    expect(deterministicContentHash(base)).toBe(before);
    expect(run(base)).toEqual(result);
    expect(evidence(base)).toEqual(envelope);
    expect(createIntrinsicTonggenResearchRegistry()).toEqual(
      createIntrinsicTonggenResearchRegistry(),
    );
  });
  // Independent expected branch sets, including canonical 申土 and excluding 亥土.
  const roots = {
    목: ['인', '묘', '진', '미', '해'],
    화: ['인', '사', '오', '미', '술'],
    토: ['축', '인', '진', '사', '오', '미', '신', '술'],
    금: ['축', '사', '신', '유', '술'],
    수: ['자', '축', '진', '신', '해'],
  };
  const branches = [
    '자',
    '축',
    '인',
    '묘',
    '진',
    '사',
    '오',
    '미',
    '신',
    '유',
    '술',
    '해',
  ] as const;
  test.each(HEAVENLY_STEMS.flatMap((stem) => branches.map((branch) => ({ stem, branch }))))(
    'checks $stem/$branch against the independent 120-pair matrix',
    ({ stem, branch }) => {
      const payload = evidence(fixture(stem, [branch, branch, branch, branch])).payload;
      const expected = roots[getHeavenlyStemElement(stem)].includes(branch);
      for (const slot of slots) expect(payload.branches[slot].tonggen).toBe(expected);
    },
  );
  test.each([
    { stem: '을', branch: '오', stage: '長生', tonggen: false, matches: [] },
    { stem: '정', branch: '유', stage: '長生', tonggen: false, matches: [] },
    { stem: '을', branch: '해', stage: '死', tonggen: true, matches: ['갑'] },
    { stem: '정', branch: '인', stage: '死', tonggen: true, matches: ['병'] },
  ] as const)(
    'separates phase and root for $stem/$branch',
    ({ stem, branch, stage, tonggen, matches }) => {
      expect(phase.getTwelveGrowthStage(stem, branch)).toBe(stage);
      expect(
        evidence(fixture(stem, [branch, branch, branch, branch])).payload.branches.day,
      ).toMatchObject({ tonggen, sameElementHiddenStems: matches });
    },
  );
  test('emits true and false claims at their own slots without an overall no-root conclusion', () => {
    const snapshot = fixture();
    const claims = run(snapshot).claims;
    expect(claims.map((claim) => claim.value)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          slot: 'year',
          tonggen: false,
          wholeChartNoRoot: 'not_determined',
        }),
        expect.objectContaining({ slot: 'month', tonggen: true }),
        expect.objectContaining({ slot: 'day', tonggen: true }),
        expect.objectContaining({ slot: 'hour', tonggen: false }),
      ]),
    );
    expect(evidence(snapshot).payload).not.toHaveProperty('chartTonggen');
  });
  test('preserves repeated hidden occurrences across all four slots including day', () => {
    const payload = evidence(fixture('을', ['해', '해', '해', '해'])).payload;
    expect(
      slots.flatMap((slot) => payload.branches[slot].hiddenOccurrences.map((o) => o.occurrenceId)),
    ).toEqual([
      'year:갑',
      'year:임',
      'month:갑',
      'month:임',
      'day:갑',
      'day:임',
      'hour:갑',
      'hour:임',
    ]);
    expect(payload.branches.day.sourceFactRef).toBe('derivedFacts.hiddenStems.day');
    expect(payload.branches.day.hiddenOccurrences[1]).toMatchObject({
      hiddenStem: '임',
      sameElementAsDayMaster: false,
    });
  });
  test('gives paired Yin/Yang stems identical branch verdicts', () => {
    for (let i = 0; i < HEAVENLY_STEMS.length; i += 2)
      for (const branch of branches) {
        const first = evidence(fixture(HEAVENLY_STEMS[i]!, [branch, branch, branch, branch]))
          .payload.branches.day.tonggen;
        const second = evidence(fixture(HEAVENLY_STEMS[i + 1]!, [branch, branch, branch, branch]))
          .payload.branches.day.tonggen;
        expect(first).toBe(second);
      }
  });
  test('does not dereference phase or TenGod/representative observations', () => {
    vi.spyOn(phase, 'getTwelveGrowthStage').mockImplementation(() => {
      throw new Error('phase must not be consumed');
    });
    const snapshot = fixture();
    Object.defineProperty(snapshot.derivedFacts, 'tenGods', {
      get: () => {
        throw new Error('TenGod must not be consumed');
      },
    });
    expect(projectIntrinsicTonggen(snapshot).status).toBe('resolved');
  });
  test.each(slots)('requires resolved complete $slot pillar and hidden membership', (slot) => {
    for (const target of ['pillar', 'hidden'] as const) {
      const snapshot = fixture();
      if (target === 'pillar') snapshot.pillars[slot] = unavailable('test-missing');
      else snapshot.derivedFacts.hiddenStems![slot] = unavailable('test-missing');
      expect(buildIntrinsicTonggenResearchEvidence(snapshot).status).toBe('unavailable');
      expect(validateIntrinsicTonggenResearchEvidence(evidence(fixture()), snapshot).valid).toBe(
        false,
      );
    }
  });
  test('does not turn ambiguous or missing master/day/hidden/scenario inputs into false', () => {
    const cases: CanonicalSajuSnapshot[] = [];
    let snapshot = fixture();
    snapshot.derivedFacts.dayMaster = unavailable('test-missing');
    cases.push(snapshot);
    snapshot = fixture();
    snapshot.snapshotId = '';
    cases.push(snapshot);
    snapshot = fixture();
    snapshot.calculationHash = '';
    cases.push(snapshot);
    snapshot = fixture();
    snapshot.derivedFacts.hiddenStems = undefined as never;
    cases.push(snapshot);
    snapshot = fixture();
    snapshot.scenarios = [{}] as never;
    cases.push(snapshot);
    snapshot = fixture();
    snapshot.scenarios = undefined as never;
    cases.push(snapshot);
    snapshot = fixture();
    snapshot.derivedFacts.hiddenStems!.day = ambiguous(
      [
        { candidateId: 'a', value: ['갑'], reasonRefs: [] },
        { candidateId: 'b', value: ['을'], reasonRefs: [] },
      ],
      ['test-ambiguous'],
    );
    cases.push(snapshot);
    snapshot = fixture();
    snapshot.pillars.day = ambiguous(
      [
        {
          candidateId: 'a',
          value: base.pillars.day.status === 'resolved' ? base.pillars.day.value : ({} as never),
          reasonRefs: [],
        },
        {
          candidateId: 'b',
          value: base.pillars.year.status === 'resolved' ? base.pillars.year.value : ({} as never),
          reasonRefs: [],
        },
      ],
      ['test-ambiguous'],
    );
    cases.push(snapshot);
    for (const item of cases) expect(projectIntrinsicTonggen(item).status).toBe('unavailable');
  });
  test.each(['element', 'yinYang', 'hanja', 'value'] as const)(
    'rejects forged pinned master $0 even with matching day-pillar forgery',
    (key) => {
      const snapshot = fixture();
      if (
        snapshot.derivedFacts.dayMaster.status !== 'resolved' ||
        snapshot.pillars.day.status !== 'resolved'
      )
        throw new Error('fixture');
      const forged = { ...snapshot.derivedFacts.dayMaster.value, [key]: 'forged' };
      snapshot.derivedFacts.dayMaster = resolved(forged as never);
      snapshot.pillars.day = resolved({
        ...snapshot.pillars.day.value,
        stem: structuredClone(forged) as never,
      });
      expect(projectIntrinsicTonggen(snapshot).status).toBe('unavailable');
    },
  );
  test('rejects master/day parity drift', () => {
    const snapshot = fixture();
    snapshot.derivedFacts.dayMaster = fixture('갑').derivedFacts.dayMaster;
    expect(projectIntrinsicTonggen(snapshot).status).toBe('unavailable');
  });
  test.each(
    [[], ['갑'], ['임', '갑'], ['갑', '임', '무'], ['갑', '갑'], ['갑', '임', '임']].map(
      (members) => ({ members }),
    ),
  )('rejects incomplete, reordered or alternative 亥 membership $members', ({ members }) => {
    const snapshot = fixture('을', ['해', '해', '해', '해']);
    snapshot.derivedFacts.hiddenStems!.hour = resolved(members as HeavenlyStem[]);
    expect(projectIntrinsicTonggen(snapshot).status).toBe('unavailable');
  });
  test('rejects branch drift against hidden membership and invalid branch values', () => {
    for (const branch of ['자', 'invalid'] as const) {
      const snapshot = fixture();
      if (snapshot.pillars.month.status !== 'resolved') throw new Error('fixture');
      snapshot.pillars.month.value.branch.value = branch as EarthlyBranch;
      expect(projectIntrinsicTonggen(snapshot).status).toBe('unavailable');
    }
  });
  type Writable<T> = T extends object ? { -readonly [K in keyof T]: Writable<T[K]> } : T;
  type WritablePayload = Writable<ReturnType<typeof evidence>['payload']>;
  const tamper = {
    verdict: (p: WritablePayload) => {
      p.branches.year.tonggen = true;
    },
    omission: (p: WritablePayload) => {
      delete (p.branches as Partial<typeof p.branches>).day;
    },
    matchingStem: (p: WritablePayload) => {
      p.branches.month.sameElementHiddenStems = [];
    },
    identity: (p: WritablePayload) => {
      p.branches.month.hiddenOccurrences[0]!.occurrenceId = 'day:갑';
    },
    source: (p: WritablePayload) => {
      p.branches.month.sourceFactRef = 'derivedFacts.hiddenStems.day';
    },
    slot: (p: WritablePayload) => {
      p.branches.month.pillarSlot = 'day';
    },
    count: (p: WritablePayload) => {
      Object.assign(p, { rootCount: 2 });
    },
    phase: (p: WritablePayload) => {
      Object.assign(p, { twelveGrowthStage: '長生' });
    },
    authority: (p: WritablePayload) => {
      Object.assign(p.constraints, { productionAuthorityAuthorized: true });
    },
    definition: (p: WritablePayload) => {
      p.authorityDefinitionHash = 'forged';
    },
  };
  test.each(Object.entries(tamper))('rejects rehashed payload forgery: %s', (_, mutate) => {
    const snapshot = fixture();
    // Test clone is writable deliberately; runtime producer output is frozen.
    const payload = structuredClone(evidence(snapshot).payload) as WritablePayload;
    mutate(payload);
    const forged = createResearchEvidenceEnvelope(definition, snapshot, payload);
    expect(validateResearchEvidenceEnvelope(forged, snapshot, definition).valid).toBe(true);
    expect(validateIntrinsicTonggenResearchEvidence(forged, snapshot).valid).toBe(false);
    expect(() => run(snapshot, [forged])).toThrow(ResearchEvidenceExecutionError);
  });
  test('binds exact ID/hash and detects fact drift even when the binding is reused', () => {
    const snapshot = fixture();
    const original = evidence(snapshot);
    for (const key of ['snapshotId', 'calculationHash'] as const) {
      const drift = structuredClone(snapshot);
      drift[key] += 'changed';
      expect(validateIntrinsicTonggenResearchEvidence(original, drift).valid).toBe(false);
    }
    const drift = fixture('정');
    drift.snapshotId = snapshot.snapshotId;
    drift.calculationHash = snapshot.calculationHash;
    expect(validateIntrinsicTonggenResearchEvidence(original, drift).valid).toBe(false);
  });
  test('missing research evidence emits no negative claims', () => {
    expect(run(base, []).claims).toHaveLength(0);
  });
  test('does not modify historical R6/R29/R31 evidence', () => {
    const builders = [
      buildSharedNatalBoundedTonggenSupportResearchEvidence,
      buildGovernedSupportPartialOrderResearchEvidence,
      buildGovernedBiyinSupportInventoryResearchEvidence,
    ];
    const before = builders.map((build) => build(base));
    projectIntrinsicTonggen(base);
    expect(builders.map((build) => build(base))).toEqual(before);
  });
  test('pins the narrow authority and rejects Production selection', () => {
    expect(INTRINSIC_TONGGEN_AUTHORITY).toMatchObject({
      intrinsicBranchRootVerdictAuthorized: true,
      twelveGrowthStageConsumed: false,
      yinYangEqualityRequired: false,
      wholeChartNoRootVerdictAuthorized: false,
      productRootAuthority: 'NOT_GRANTED',
      productionAuthorityAuthorized: false,
    });
    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: INTRINSIC_TONGGEN_RULES,
          methodologies: [INTRINSIC_TONGGEN_METHODOLOGY],
          sources: [...INTRINSIC_TONGGEN_SOURCES],
          claimTypeDefinitions: [INTRINSIC_TONGGEN_CLAIM_TYPE_DEFINITION],
          claimValueSchemas: [INTRINSIC_TONGGEN_CLAIM_VALUE_SCHEMA],
          reviewAttestations: [],
        },
        { ...INTRINSIC_TONGGEN_PACK, status: 'production' },
        now.toISOString(),
      ),
    ).toThrow(RegistryConfigurationError);
  });
});
