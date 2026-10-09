import { afterEach, describe, expect, test, vi } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { enrichCanonicalHiddenStems } from '../src/calculation/hidden-stems.js';
import type { CanonicalSajuSnapshot, EarthlyBranch } from '../src/contracts/calculation.js';
import { ambiguous, resolved, unavailable } from '../src/contracts/common.js';
import {
  runInterpretation,
  ResearchEvidenceExecutionError,
} from '../src/interpretation/interpretation-engine.js';
import {
  createResearchEvidenceEnvelope,
  type ResearchEvidenceEnvelope,
} from '../src/interpretation/research-evidence.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import {
  createRuleRegistrySnapshot,
  deterministicContentHash,
  RegistryConfigurationError,
} from '../src/interpretation/rule-registry.js';
import * as upstream from '../src/research/shared-natal-hidden-stem-ten-god-occurrence-research-evidence-adapter.js';
import {
  collectHiddenBiyinSupportConstituents,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_AUTHORITY,
} from '../src/research/hidden-biyin-support-constituent-authority.js';
import {
  buildHiddenBiyinSupportConstituentResearchEvidence,
  validateHiddenBiyinSupportConstituentResearchEvidence,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_EVIDENCE_DEFINITION as definition,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-hidden-biyin-support-constituent-research-evidence-adapter.js';
import {
  createHiddenBiyinSupportConstituentResearchRegistry,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_TYPE,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_TYPE_DEFINITION,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_VALUE_SCHEMA,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_RULE,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_METHODOLOGY,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_SOURCES,
  HIDDEN_BIYIN_SUPPORT_CONSTITUENT_PACK,
} from '../src/research/shared-natal-hidden-biyin-support-constituent-structural-claim.js';
import { buildGovernedSupportPartialOrderResearchEvidence } from '../src/research/shared-natal-governed-support-partial-order-research-evidence-adapter.js';
import {
  DEFAULT_CALCULATION_POLICY,
  UPSTREAM_1992_GOLDEN_FIXTURE,
} from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-07T00:00:00Z');
const slots = ['year', 'month', 'day', 'hour'] as const;
const base = calculateCanonicalSajuSnapshot(
  UPSTREAM_1992_GOLDEN_FIXTURE.input,
  DEFAULT_CALCULATION_POLICY,
  { now },
);
// Synthetic semantic fixtures preserve canonical membership. Pillar overrides
// are not represented as actual birth-chart calculations.
function fixture(branches: readonly EarthlyBranch[] = ['진', '해', '진', '묘']) {
  const snapshot = structuredClone(base);
  const master = {
    value: '갑' as const,
    element: '목' as const,
    yinYang: '양' as const,
    hanja: '甲',
  };
  snapshot.derivedFacts.dayMaster = resolved(master);
  slots.forEach((slot, index) => {
    const pillar = snapshot.pillars[slot];
    if (pillar.status !== 'resolved' || !branches[index]) throw new Error('invalid test fixture');
    snapshot.pillars[slot] = resolved({
      ...pillar.value,
      ...(slot === 'day' ? { stem: structuredClone(master) } : {}),
      branch: { ...pillar.value.branch, value: branches[index] },
    });
  });
  snapshot.calculationHash = deterministicContentHash({ syntheticR30: snapshot.pillars });
  snapshot.snapshotId = `synthetic_r30_${snapshot.calculationHash.slice(0, 24)}`;
  return enrichCanonicalHiddenStems(snapshot);
}
function evidence(snapshot: CanonicalSajuSnapshot) {
  const result = buildHiddenBiyinSupportConstituentResearchEvidence(snapshot);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.envelope;
}
function run(
  snapshot: CanonicalSajuSnapshot,
  envelopes: readonly ResearchEvidenceEnvelope[] = [evidence(snapshot)],
) {
  return runInterpretation(snapshot, createHiddenBiyinSupportConstituentResearchRegistry(), {
    now,
    researchEvidence: {
      runtimeRegistry: createResearchEvidenceRuntimeRegistry([
        HIDDEN_BIYIN_SUPPORT_CONSTITUENT_RUNTIME_ADAPTER,
      ]),
      envelopes,
    },
  });
}
afterEach(() => vi.restoreAllMocks());

describe('R30 explicit hidden BiYin symbolic support admission', () => {
  test('consumes actual canonical R27 evidence and emits an isolated registered non-narrative T2 marker', () => {
    const before = deterministicContentHash(base);
    const result = evidence(base);
    expect(validateHiddenBiyinSupportConstituentResearchEvidence(result, base).valid).toBe(true);
    const original = upstream.buildSharedNatalHiddenStemTenGodOccurrenceResearchEvidence(base);
    if (original.status !== 'resolved') throw new Error(original.reasonCode);
    expect(result.payload.upstreamEvidence.payloadHash).toBe(original.envelope.payloadHash);
    expect(
      result.payload.occurrences.map(
        ({
          occurrenceId,
          pillarSlot,
          branch,
          hiddenStem,
          tenGod,
          sourceFactRef,
          sourcePillarRef,
        }) => ({
          occurrenceId,
          pillarSlot,
          branch,
          hiddenStem,
          tenGod,
          sourceFactRef,
          sourcePillarRef,
        }),
      ),
    ).toEqual(original.envelope.payload.occurrences);
    const executed = run(base);
    expect(executed.claims).toHaveLength(1);
    expect(executed.claims[0]?.claimType).toBe(HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_TYPE);
    expect(HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_TYPE_DEFINITION.materialForNarrative).toBe(false);
    expect(deterministicContentHash(base)).toBe(before);
  });

  test.each(slots)(
    'admits all four governed labels at %s without rejecting other members',
    (slot) => {
      const snapshot = fixture();
      const positive = evidence(snapshot).payload.occurrences.filter(
        (o) => o.supportConstituentObserved,
      );
      expect(new Set(positive.map((o) => o.tenGod))).toEqual(
        new Set(['비견', '겁재', '정인', '편인']),
      );
      for (const [branch, expected] of [
        ['해', ['비견', '편인']],
        ['진', ['겁재', '정인']],
      ] as const) {
        const branches: EarthlyBranch[] = ['유', '유', '유', '유'];
        branches[slots.indexOf(slot)] = branch;
        const occurrences = evidence(fixture(branches)).payload.occurrences;
        expect(
          occurrences
            .filter((o) => o.pillarSlot === slot && o.supportConstituentObserved)
            .map((o) => o.tenGod),
        ).toEqual(expect.arrayContaining([...expected]));
      }
      const outside = evidence(snapshot).payload.occurrences.find((o) => o.tenGod === '편재');
      expect(outside).toMatchObject({
        state: 'outside_admitted_support_label_scope',
        sourceSupportCategory: null,
        supportConstituentObserved: false,
        effectDisposition: 'not_determined',
        rootDisposition: 'not_determined',
      });
    },
  );

  test('retains repeated stem identities and includes day branch without visible day self', () => {
    const result = evidence(fixture(['묘', '묘', '묘', '묘'])).payload;
    expect(result.occurrences.map((o) => o.occurrenceId)).toEqual([
      'year:을',
      'month:을',
      'day:을',
      'hour:을',
    ]);
    expect(result.occurrences.every((o) => o.tenGod === '겁재')).toBe(true);
    expect(result.coverage).toMatchObject({
      visibleDaySelfIncluded: false,
      representativeBranchAdded: false,
      effectiveSupportComplete: false,
    });
    expect(result).not.toHaveProperty('count');
    expect(result).not.toHaveProperty('score');
  });

  test('covers every mapped Ten-God label without promoting outside-scope members', () => {
    const seen = new Map<string, boolean>();
    for (const branch of [
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
    ] as const) {
      for (const member of evidence(fixture([branch, branch, branch, branch])).payload
        .occurrences) {
        seen.set(member.tenGod, member.supportConstituentObserved);
      }
    }
    expect(Object.fromEntries(seen)).toEqual({
      비견: true,
      겁재: true,
      정인: true,
      편인: true,
      식신: false,
      상관: false,
      정재: false,
      편재: false,
      정관: false,
      편관: false,
    });
    expect(HIDDEN_BIYIN_SUPPORT_CONSTITUENT_AUTHORITY.upstreamOccurrenceAuthorityHash).toBeTruthy();
  });

  test('branch representative and visible Ten-Gods have no role in hidden admission', () => {
    const snapshot = fixture();
    const original = evidence(snapshot);
    Object.defineProperty(snapshot.derivedFacts, 'tenGods', {
      get() {
        throw new Error('visible or representative Ten-Gods must not be read');
      },
    });
    expect(evidence(snapshot)).toEqual(original);
    const year = original.payload.occurrences.filter((o) => o.pillarSlot === 'year');
    expect(year.map((o) => o.hiddenStem)).toEqual(['을', '무', '계']);
    expect(year.filter((o) => o.supportConstituentObserved).map((o) => o.tenGod)).toEqual([
      '겁재',
      '정인',
    ]);
  });

  test('resolved outside-scope inventory is not a negative support/strength verdict; missing envelope emits no marker', () => {
    const snapshot = fixture(['유', '유', '유', '유']);
    expect(evidence(snapshot).payload.supportConstituentObserved).toBe(false);
    expect(
      evidence(snapshot).payload.occurrences.every(
        (o) => o.state === 'outside_admitted_support_label_scope',
      ),
    ).toBe(true);
    expect(run(snapshot).claims).toEqual([]);
    expect(run(fixture(), []).claims).toEqual([]);
    expect(evidence(snapshot).payload.constraints.qiangRuoWangShuaiClassificationAuthorized).toBe(
      false,
    );
  });

  test.each(slots)('fails closed on missing/ambiguous hidden input or pillar at %s', (slot) => {
    const snapshot = fixture();
    const hidden = snapshot.derivedFacts.hiddenStems;
    if (!hidden || hidden[slot].status !== 'resolved') throw new Error('fixture lacks hidden data');
    const members = hidden[slot].value;
    for (const state of [
      unavailable('test-missing'),
      ambiguous(
        [
          { candidateId: 'members', value: members, reasonRefs: ['test'] },
          { candidateId: 'empty', value: [], reasonRefs: ['test'] },
        ],
        ['test-ambiguous'],
      ),
    ]) {
      const changed = structuredClone(snapshot);
      changed.derivedFacts.hiddenStems![slot] = state;
      expect(collectHiddenBiyinSupportConstituents(changed).status).toBe('unavailable');
    }
    snapshot.pillars[slot] = unavailable('test-pillar-missing');
    expect(collectHiddenBiyinSupportConstituents(snapshot).status).toBe('unavailable');
  });

  test('fails closed on scenarios, source membership corruption, duplicates and day-master parity', () => {
    const snapshot = fixture();
    const hidden = snapshot.derivedFacts.hiddenStems!;
    hidden.year = resolved(['을', '을', '계']);
    expect(collectHiddenBiyinSupportConstituents(snapshot).status).toBe('unavailable');
    hidden.year = resolved(['을', '기', '계']);
    expect(collectHiddenBiyinSupportConstituents(snapshot).status).toBe('unavailable');
    const wrongMaster = fixture();
    if (wrongMaster.derivedFacts.dayMaster.status !== 'resolved') throw new Error('fixture');
    wrongMaster.derivedFacts.dayMaster.value.hanja = '乙';
    expect(collectHiddenBiyinSupportConstituents(wrongMaster).status).toBe('unavailable');
    const scenarios = fixture();
    Object.assign(scenarios, { scenarios: [{ scenarioId: 'unmaterialized' }] });
    expect(collectHiddenBiyinSupportConstituents(scenarios).status).toBe('unavailable');
  });

  test('fails closed when R27 cannot resolve or a rehashed upstream mapping is forged', () => {
    const original = upstream.buildSharedNatalHiddenStemTenGodOccurrenceResearchEvidence;
    const spy = vi.spyOn(upstream, 'buildSharedNatalHiddenStemTenGodOccurrenceResearchEvidence');
    spy.mockReturnValue({ status: 'unavailable', reasonCode: 'test-upstream-unresolved' });
    expect(collectHiddenBiyinSupportConstituents(fixture())).toEqual({
      status: 'unavailable',
      reasonCode: 'test-upstream-unresolved',
    });
    spy.mockImplementation((snapshot) => {
      const result = original(snapshot);
      if (result.status !== 'resolved') return result;
      return {
        status: 'resolved',
        envelope: createResearchEvidenceEnvelope(
          upstream.SHARED_NATAL_HIDDEN_STEM_TEN_GOD_OCCURRENCE_RESEARCH_EVIDENCE_DEFINITION,
          snapshot,
          {
            ...result.envelope.payload,
            occurrences: result.envelope.payload.occurrences.map((o) => ({
              ...o,
              tenGod: '비견' as const,
            })),
          },
        ),
      };
    });
    expect(collectHiddenBiyinSupportConstituents(fixture())).toMatchObject({
      status: 'unavailable',
      reasonCode: 'hidden-biyin-upstream-replay-unresolved',
    });
  });

  test('rejects rehashed forged label, source, identity, omitted member, extra count and promoted authority', () => {
    const snapshot = fixture();
    const original = evidence(snapshot);
    const mutations: ((payload: typeof original.payload) => unknown)[] = [
      (p) => ({
        ...p,
        occurrences: p.occurrences.map((o, index) =>
          index === 0 ? { ...o, sourceSupportCategory: '印綬' } : o,
        ),
      }),
      (p) => ({
        ...p,
        occurrences: p.occurrences.map((o, index) =>
          index === 0 ? { ...o, sourceFactRef: 'derivedFacts.tenGods.year.branch' } : o,
        ),
      }),
      (p) => ({
        ...p,
        occurrences: p.occurrences.map((o, index) =>
          index === 0 ? { ...o, occurrenceId: 'day:을' } : o,
        ),
      }),
      (p) => ({ ...p, occurrences: p.occurrences.slice(1) }),
      (p) => ({ ...p, count: 99 }),
      (p) => ({
        ...p,
        constraints: {
          ...p.constraints,
          usableSupportEffectAuthorized: true,
          tonggenDerivationAuthorized: true,
          productionAuthorityAuthorized: true,
        },
      }),
      (p) => ({ ...p, upstreamEvidence: { ...p.upstreamEvidence, payloadHash: 'forged' } }),
    ];
    for (const mutate of mutations) {
      const forged = createResearchEvidenceEnvelope(definition, snapshot, mutate(original.payload));
      expect(validateHiddenBiyinSupportConstituentResearchEvidence(forged, snapshot).valid).toBe(
        false,
      );
      expect(() => run(snapshot, [forged])).toThrow(ResearchEvidenceExecutionError);
    }
  });

  test('reproduces evidence, registry and engine deterministically and binds exact snapshot ID/hash/facts', () => {
    const snapshot = fixture();
    const original = evidence(snapshot);
    expect(evidence(snapshot)).toEqual(original);
    expect(createHiddenBiyinSupportConstituentResearchRegistry()).toEqual(
      createHiddenBiyinSupportConstituentResearchRegistry(),
    );
    expect(run(snapshot)).toEqual(run(snapshot));
    const changed = fixture(['묘', '해', '진', '묘']);
    changed.snapshotId = snapshot.snapshotId;
    changed.calculationHash = snapshot.calculationHash;
    for (const other of [
      { ...snapshot, snapshotId: 'other' },
      { ...snapshot, calculationHash: 'other' },
      changed,
    ]) {
      expect(validateHiddenBiyinSupportConstituentResearchEvidence(original, other).valid).toBe(
        false,
      );
      expect(() => run(other, [original])).toThrow(ResearchEvidenceExecutionError);
    }
  });

  test('does not widen the R29 frontier when hidden membership changes', () => {
    const snapshot = structuredClone(base);
    const before = buildGovernedSupportPartialOrderResearchEvidence(snapshot);
    delete snapshot.derivedFacts.hiddenStems;
    expect(buildGovernedSupportPartialOrderResearchEvidence(snapshot)).toEqual(before);
    expect(collectHiddenBiyinSupportConstituents(snapshot).status).toBe('unavailable');
  });

  test('keeps effective/root/aggregation/final semantics closed and rejects Production pack promotion', () => {
    expect(HIDDEN_BIYIN_SUPPORT_CONSTITUENT_AUTHORITY).toMatchObject({
      hiddenSymbolicConstituentAdmissionAuthorized: true,
      hiddenTenGodRecalculationAuthorized: false,
      usableSupportEffectAuthorized: false,
      tonggenDerivationAuthorized: false,
      completeEffectiveSupportCollectionAuthorized: false,
      supportCountOrWeightAuthorized: false,
      hiddenPlusRootAggregationAuthorized: false,
      r29FrontierInclusionAuthorized: false,
      qiangRuoWangShuaiClassificationAuthorized: false,
      productionAuthorityAuthorized: false,
    });
    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: [HIDDEN_BIYIN_SUPPORT_CONSTITUENT_RULE],
          methodologies: [HIDDEN_BIYIN_SUPPORT_CONSTITUENT_METHODOLOGY],
          sources: HIDDEN_BIYIN_SUPPORT_CONSTITUENT_SOURCES,
          claimTypeDefinitions: [HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_TYPE_DEFINITION],
          claimValueSchemas: [HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_VALUE_SCHEMA],
          reviewAttestations: [],
        },
        { ...HIDDEN_BIYIN_SUPPORT_CONSTITUENT_PACK, status: 'production' },
        now.toISOString(),
      ),
    ).toThrow(RegistryConfigurationError);
  });
});
