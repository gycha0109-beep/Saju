import { afterEach, describe, expect, test, vi } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  TenGod,
  TenGodChartFact,
} from '../src/contracts/calculation.js';
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
  RegistryConfigurationError,
  deterministicContentHash,
} from '../src/interpretation/rule-registry.js';
import {
  composeGovernedSupportPartialOrder,
  GOVERNED_SUPPORT_PARTIAL_ORDER_AUTHORITY,
} from '../src/research/shared-natal-governed-support-partial-order-authority.js';
import {
  buildGovernedSupportPartialOrderResearchEvidence,
  validateGovernedSupportPartialOrderResearchEvidence,
  GOVERNED_SUPPORT_PARTIAL_ORDER_EVIDENCE_DEFINITION as definition,
  GOVERNED_SUPPORT_PARTIAL_ORDER_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-governed-support-partial-order-research-evidence-adapter.js';
import {
  createGovernedSupportPartialOrderResearchRegistry,
  GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_TYPE,
  GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_VALUE,
  GOVERNED_SUPPORT_PARTIAL_ORDER_RULE,
  GOVERNED_SUPPORT_PARTIAL_ORDER_METHODOLOGY,
  GOVERNED_SUPPORT_PARTIAL_ORDER_PACK,
  GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_TYPE_DEFINITION,
  GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_VALUE_SCHEMA,
} from '../src/research/shared-natal-governed-support-partial-order-structural-claim.js';
import { VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES } from '../src/research/shared-natal-visible-stem-yinshou-support-collection-structural-claim.js';
import * as roots from '../src/research/shared-natal-bounded-tonggen-support-research-evidence-adapter.js';
import * as peers from '../src/research/shared-natal-visible-stem-bijie-support-union-research-evidence-adapter.js';
import * as resources from '../src/research/shared-natal-visible-stem-yinshou-support-collection-research-evidence-adapter.js';
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
const slots = ['year', 'month', 'day', 'hour'] as const;
// Synthetic supplied canonical labels/branches test meaning and provenance;
// these overrides are not the actual birth input's chart or a recalculation.
function fixture(
  branches: readonly EarthlyBranch[] = ['묘', '미', '유', '축'],
  labels: readonly TenGod[] = ['비견', '정인', '겁재'],
  earth = false,
) {
  const snapshot = structuredClone(base);
  const master = earth
    ? { value: '무' as const, element: '토' as const, yinYang: '양' as const, hanja: '戊' }
    : { value: '갑' as const, element: '목' as const, yinYang: '양' as const, hanja: '甲' };
  snapshot.derivedFacts.dayMaster = resolved(master);
  for (const [index, slot] of slots.entries()) {
    const pillar = snapshot.pillars[slot];
    if (pillar.status !== 'resolved') throw new Error('fixture requires pillars');
    pillar.value.branch.value = branches[index]!;
    if (slot === 'day') pillar.value.stem = master;
  }
  snapshot.derivedFacts.tenGods = resolved({
    year: { stem: resolved(labels[0]!) },
    month: { stem: resolved(labels[1]!) },
    day: { stem: resolved('일간') },
    hour: { stem: resolved(labels[2]!) },
  });
  snapshot.snapshotId = `synthetic_r29_${branches.join('')}_${labels.join('')}_${master.value}`;
  snapshot.calculationHash = deterministicContentHash({ fixture: snapshot.snapshotId });
  return snapshot;
}
function chart(snapshot: CanonicalSajuSnapshot): TenGodChartFact {
  if (snapshot.derivedFacts.tenGods.status !== 'resolved')
    throw new Error('fixture requires Ten-Gods');
  return snapshot.derivedFacts.tenGods.value;
}
function evidence(snapshot: CanonicalSajuSnapshot) {
  const result = buildGovernedSupportPartialOrderResearchEvidence(snapshot);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.envelope;
}
function run(
  snapshot: CanonicalSajuSnapshot,
  envelopes: readonly ResearchEvidenceEnvelope[] = [evidence(snapshot)],
) {
  return runInterpretation(snapshot, createGovernedSupportPartialOrderResearchRegistry(), {
    now,
    researchEvidence: {
      runtimeRegistry: createResearchEvidenceRuntimeRegistry([
        GOVERNED_SUPPORT_PARTIAL_ORDER_RUNTIME_ADAPTER,
      ]),
      envelopes,
    },
  });
}
afterEach(() => vi.restoreAllMocks());

describe('SAJU-R29 governed bounded support partial-order composition', () => {
  test('replays real canonical upstream evidence and emits a registered non-narrative T2 marker', () => {
    const envelope = evidence(base);
    expect(validateGovernedSupportPartialOrderResearchEvidence(envelope, base).valid).toBe(true);
    const upstream = [
      roots.buildSharedNatalBoundedTonggenSupportResearchEvidence(base),
      peers.buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence(base),
      resources.buildVisibleStemYinshouSupportCollectionResearchEvidence(base),
    ];
    expect(Object.values(envelope.payload.upstreamEvidence).map((ref) => ref.envelopeId)).toEqual(
      upstream.map((result) => {
        if (result.status !== 'resolved') throw new Error(result.reasonCode);
        return result.envelope.envelopeId;
      }),
    );
    const result = run(base);
    if (envelope.payload.supportObservationPresent)
      expect(result.claims[0]).toMatchObject({
        claimType: GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_TYPE,
        taxonomy: { tier: 'T2' },
        value: GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_VALUE,
        researchEvidenceRefs: [envelope.envelopeId],
      });
  });

  test('composes heavy/light/peer precedence while retaining dominated, resource-incomparable and unranked evidence', () => {
    const snapshot = fixture();
    const payload = evidence(snapshot).payload;
    const frontier = payload.eligibleObservationFrontier;
    expect(frontier.maximalEvidenceIds).toEqual(['root:year:묘:旺', 'visible:month']);
    expect(frontier.dominatedEvidence).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          evidenceId: 'root:month:미:墓庫',
          dominatedByEvidenceIds: ['root:year:묘:旺'],
        }),
        expect.objectContaining({
          evidenceId: 'visible:year',
          dominatedByEvidenceIds: ['root:month:미:墓庫', 'root:year:묘:旺'],
        }),
      ]),
    );
    expect(frontier.incomparableMaximalPairs).toEqual([
      { leftEvidenceId: 'root:year:묘:旺', rightEvidenceId: 'visible:month' },
    ]);
    expect(payload.unrankedObservationIds).toEqual(['visible:hour']);
    expect(
      payload.observations.find((observation) => observation.evidenceId === 'visible:hour'),
    ).toMatchObject({
      family: '比劫',
      member: '겁재',
      evidenceClass: null,
      precedenceAdmission: 'gyeopjae_precedence_unresolved',
    });
    expect(run(snapshot).claims).toHaveLength(1);
    expect(payload.compositionVerdict).toBe('not_determined');
  });

  test('binds all current governed non-Earth root kinds without invoking a legacy raw classifier', () => {
    const payload = evidence(fixture(['묘', '해', '인', '진'])).payload;
    expect(
      payload.observations
        .filter((observation) => observation.family === '通根')
        .map((observation) => [
          observation.pillarSlot,
          observation.member,
          observation.evidenceClass,
        ]),
    ).toEqual([
      ['day', '祿', 'strong_birth_lu_wang_candidate'],
      ['hour', '餘氣', 'residual_storage_candidate'],
      ['month', '長生', 'strong_birth_lu_wang_candidate'],
      ['year', '旺', 'strong_birth_lu_wang_candidate'],
    ]);
    expect(
      payload.observations.some(
        (observation) => observation.sourceFactRef === 'pillars.day.branch',
      ),
    ).toBe(true);
    expect(
      payload.observations.some(
        (observation) => observation.sourceFactRef === 'derivedFacts.tenGods.day.stem',
      ),
    ).toBe(false);
  });

  test('keeps Earth roots unordered instead of inheriting non-Earth heavy-root precedence', () => {
    const payload = evidence(
      fixture(['진', '술', '축', '미'], ['비견', '정인', '정재'], true),
    ).payload;
    expect(
      payload.observations
        .filter((observation) => observation.family === '通根')
        .every((observation) => observation.evidenceClass === 'earth_root_class_unresolved'),
    ).toBe(true);
    expect(payload.eligibleObservationFrontier.dominatedEvidence).toEqual([]);
    expect(payload.eligibleObservationFrontier.maximalEvidenceIds).toContain('visible:year');
  });

  test('preserves repeated source-slot occurrences and never adds frequency weight', () => {
    const payload = evidence(fixture(['묘', '묘', '묘', '묘'], ['비견', '비견', '비견'])).payload;
    expect(payload.observations).toHaveLength(7);
    expect(new Set(payload.observations.map((observation) => observation.evidenceId)).size).toBe(7);
    expect(payload.eligibleObservationFrontier.maximalEvidenceIds).toEqual([
      'root:day:묘:旺',
      'root:hour:묘:旺',
      'root:month:묘:旺',
      'root:year:묘:旺',
    ]);
    expect(payload.eligibleObservationFrontier.repeatedEvidenceAggregation).toBe('not_authorized');
    expect(payload.constraints.countOrScoreAuthorized).toBe(false);
  });

  test('retains only-겁재 observations outside an empty eligible frontier without treating them as no support', () => {
    const payload = evidence(fixture(['유', '유', '유', '유'], ['겁재', '겁재', '겁재'])).payload;
    expect(payload.supportObservationPresent).toBe(true);
    expect(payload.unrankedObservationIds).toEqual([
      'visible:hour',
      'visible:month',
      'visible:year',
    ]);
    expect(payload.eligibleObservationFrontier.observations).toEqual([]);
    expect(payload.compositionVerdict).toBe('not_determined');
  });

  test('distinguishes resolved empty, missing evidence and unavailable without an inverse claim', () => {
    const snapshot = fixture(['유', '유', '유', '유'], ['정재', '정관', '식신']);
    const payload = evidence(snapshot).payload;
    expect(payload.observations).toEqual([]);
    expect(payload.supportObservationPresent).toBe(false);
    expect(payload.coverage.wholeChartComplete).toBe(false);
    expect(run(snapshot).claims).toEqual([]);
    expect(run(snapshot, []).claims).toEqual([]);
    snapshot.pillars.hour = unavailable('unknown-hour');
    expect(composeGovernedSupportPartialOrder(snapshot)).toMatchObject({
      status: 'unavailable',
      reasonCode: 'support-composition-pillar-unresolved',
    });
  });

  test.each(slots)('fails closed for missing/unavailable/ambiguous %s pillar', (slot) => {
    const snapshot = fixture();
    const pillar = snapshot.pillars[slot];
    if (pillar.status !== 'resolved') throw new Error('expected pillar');
    for (const state of [
      unavailable('missing'),
      ambiguous(
        [
          { candidateId: 'a', value: pillar.value, reasonRefs: [] },
          { candidateId: 'b', value: pillar.value, reasonRefs: [] },
        ],
        ['candidate'],
      ),
    ]) {
      snapshot.pillars[slot] = state;
      expect(composeGovernedSupportPartialOrder(snapshot).status).toBe('unavailable');
    }
  });

  test('fails closed for day-master parity, unresolved visible fact, missing hash and scenarios', () => {
    const cases = [fixture(), fixture(), fixture(), fixture(), fixture()];
    cases[0]!.derivedFacts.dayMaster = unavailable('missing');
    cases[1]!.derivedFacts.dayMaster = resolved({
      value: '을',
      hanja: '乙',
      yinYang: '음',
      element: '목',
    });
    chart(cases[2]!).hour.stem = unavailable('unknown');
    cases[3]!.calculationHash = '';
    cases[4]!.scenarios = [{} as CanonicalSajuSnapshot['scenarios'][number]];
    for (const snapshot of cases)
      expect(composeGovernedSupportPartialOrder(snapshot).status).toBe('unavailable');
  });

  test('does not read hidden or representative-branch Ten-God facts', () => {
    const snapshot = fixture();
    const before = evidence(snapshot);
    Object.defineProperty(snapshot.derivedFacts, 'hiddenStems', {
      get() {
        throw new Error('hidden read');
      },
    });
    for (const slot of slots)
      Object.defineProperty(chart(snapshot)[slot], 'branch', {
        get() {
          throw new Error('branch Ten-God read');
        },
      });
    expect(evidence(snapshot)).toEqual(before);
  });

  test('does not silently retain other families when any upstream producer is unavailable', () => {
    vi.spyOn(resources, 'buildVisibleStemYinshouSupportCollectionResearchEvidence').mockReturnValue(
      { status: 'unavailable', reasonCode: 'yinshou-collection-upstream-slot-parity-unresolved' },
    );
    expect(composeGovernedSupportPartialOrder(fixture())).toEqual({
      status: 'unavailable',
      reasonCode: 'yinshou-collection-upstream-slot-parity-unresolved',
    });
  });

  test('rejects a rehashed forged upstream support observation before ordering', () => {
    const original = roots.buildSharedNatalBoundedTonggenSupportResearchEvidence;
    vi.spyOn(roots, 'buildSharedNatalBoundedTonggenSupportResearchEvidence').mockImplementation(
      (snapshot) => {
        const result = original(snapshot);
        if (result.status !== 'resolved') return result;
        return {
          status: 'resolved',
          envelope: createResearchEvidenceEnvelope(
            roots.SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
            snapshot,
            { ...result.envelope.payload, observations: [] },
          ),
        };
      },
    );
    expect(composeGovernedSupportPartialOrder(fixture())).toMatchObject({
      status: 'unavailable',
      reasonCode: 'support-composition-upstream-replay-unresolved',
    });
  });

  test('rejects rehashed forged rank, deleted unranked item, provenance, scalar, authority and frontier', () => {
    const snapshot = fixture();
    const valid = evidence(snapshot);
    const mutations = [
      (payload: typeof valid.payload) => {
        payload.observations[0] = {
          ...payload.observations[0]!,
          evidenceClass: 'visible_peer_support',
        };
      },
      (payload: typeof valid.payload) => {
        payload.unrankedObservationIds = [];
      },
      (payload: typeof valid.payload) => {
        payload.upstreamEvidence.root.payloadHash = 'forged';
      },
      (payload: typeof valid.payload) => {
        Object.assign(payload, { supportScore: 100 });
      },
      (payload: typeof valid.payload) => {
        Object.assign(payload.constraints, { productionAuthorityAuthorized: true });
      },
      (payload: typeof valid.payload) => {
        payload.eligibleObservationFrontier.maximalEvidenceIds = ['visible:hour'];
      },
    ];
    for (const mutate of mutations) {
      const payload = structuredClone(valid.payload);
      mutate(payload);
      const forged = createResearchEvidenceEnvelope(definition, snapshot, payload);
      expect(validateGovernedSupportPartialOrderResearchEvidence(forged, snapshot).valid).toBe(
        false,
      );
      expect(() => run(snapshot, [forged])).toThrow(ResearchEvidenceExecutionError);
    }
  });

  test('reproduces evidence, registry and claims deterministically; exact snapshot identity and facts are required', () => {
    const snapshot = fixture();
    const original = evidence(snapshot);
    expect(evidence(snapshot)).toEqual(original);
    expect(createGovernedSupportPartialOrderResearchRegistry()).toEqual(
      createGovernedSupportPartialOrderResearchRegistry(),
    );
    expect(run(snapshot)).toEqual(run(snapshot));
    const altered = structuredClone(snapshot);
    chart(altered).year.stem = resolved('정재');
    for (const changed of [
      { ...snapshot, snapshotId: 'other' },
      { ...snapshot, calculationHash: 'other' },
      altered,
    ]) {
      expect(validateGovernedSupportPartialOrderResearchEvidence(original, changed).valid).toBe(
        false,
      );
      expect(() => run(changed, [original])).toThrow(ResearchEvidenceExecutionError);
    }
  });

  test('keeps all final semantics closed and rejects Production pack promotion', () => {
    expect(GOVERNED_SUPPORT_PARTIAL_ORDER_AUTHORITY).toMatchObject({
      constituentCollectionComplete: false,
      countOrScoreAuthorized: false,
      supportEffectVerdictAuthorized: false,
      dangZhongZhuGuaSettlementAuthorized: false,
      qiangRuoWangShuaiClassificationAuthorized: false,
      narrativeMaterialityAuthorized: false,
      productionAuthorityAuthorized: false,
    });
    expect(GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_TYPE_DEFINITION.materialForNarrative).toBe(false);
    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: [GOVERNED_SUPPORT_PARTIAL_ORDER_RULE],
          methodologies: [GOVERNED_SUPPORT_PARTIAL_ORDER_METHODOLOGY],
          sources: [...VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES],
          claimTypeDefinitions: [GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_TYPE_DEFINITION],
          claimValueSchemas: [GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_VALUE_SCHEMA],
          reviewAttestations: [],
        },
        { ...GOVERNED_SUPPORT_PARTIAL_ORDER_PACK, status: 'production' },
      ),
    ).toThrow(RegistryConfigurationError);
  });
});
