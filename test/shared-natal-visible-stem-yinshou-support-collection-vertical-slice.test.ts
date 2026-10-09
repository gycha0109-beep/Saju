import { afterEach, describe, expect, test, vi } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type {
  CanonicalSajuSnapshot,
  TenGod,
  TenGodChartFact,
} from '../src/contracts/calculation.js';
import { ambiguous, resolved, unavailable, type FactState } from '../src/contracts/common.js';
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
  collectVisibleStemYinshouSupport,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_AUTHORITY,
  VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS,
} from '../src/research/general-natal-visible-stem-yinshou-support-collection-authority.js';
import * as singleFact from '../src/research/shared-natal-single-fact-yinshou-support-research-evidence-adapter.js';
import * as support from '../src/research/general-natal-yinshou-dang-zhong-support-constituent-authority.js';
import {
  buildVisibleStemYinshouSupportCollectionResearchEvidence,
  validateVisibleStemYinshouSupportCollectionResearchEvidence,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_EVIDENCE_DEFINITION as definition,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-visible-stem-yinshou-support-collection-research-evidence-adapter.js';
import {
  createVisibleStemYinshouSupportCollectionResearchRegistry,
  visibleStemYinshouSupportCollectionClaimValue,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_TYPE,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_TYPE_DEFINITION,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_VALUE_SCHEMA,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_METHODOLOGY,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_PACK,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_RULES,
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES,
} from '../src/research/shared-natal-visible-stem-yinshou-support-collection-structural-claim.js';
import {
  DEFAULT_CALCULATION_POLICY,
  UPSTREAM_1992_GOLDEN_FIXTURE,
} from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-07T00:00:00Z');
type Mutable<T> = T extends object ? { -readonly [K in keyof T]: Mutable<T[K]> } : T;
const base = calculateCanonicalSajuSnapshot(
  UPSTREAM_1992_GOLDEN_FIXTURE.input,
  DEFAULT_CALCULATION_POLICY,
  { now },
);

// Synthetic semantic fixture: overridden labels are supplied canonical inputs,
// not a claim about the original birth input or a Ten-God recalculation.
function fixture(year: TenGod = '정인', month: TenGod = '편인', hour: TenGod = '정재') {
  const snapshot = structuredClone(base);
  snapshot.snapshotId = `synthetic_r28_${year}_${month}_${hour}`;
  snapshot.calculationHash = deterministicContentHash({ fixture: snapshot.snapshotId });
  snapshot.derivedFacts.tenGods = resolved({
    year: { stem: resolved(year) },
    month: { stem: resolved(month) },
    day: { stem: resolved('일간') },
    hour: { stem: resolved(hour) },
  });
  return snapshot;
}
function chart(snapshot: CanonicalSajuSnapshot): TenGodChartFact {
  if (snapshot.derivedFacts.tenGods.status !== 'resolved')
    throw new Error('fixture requires chart');
  return snapshot.derivedFacts.tenGods.value;
}
function evidence(snapshot: CanonicalSajuSnapshot) {
  const result = buildVisibleStemYinshouSupportCollectionResearchEvidence(snapshot);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.envelope;
}
function run(
  snapshot: CanonicalSajuSnapshot,
  envelopes: readonly ResearchEvidenceEnvelope[] = [evidence(snapshot)],
) {
  return runInterpretation(snapshot, createVisibleStemYinshouSupportCollectionResearchRegistry(), {
    now,
    researchEvidence: {
      runtimeRegistry: createResearchEvidenceRuntimeRegistry([
        VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_RUNTIME_ADAPTER,
      ]),
      envelopes,
    },
  });
}
afterEach(() => vi.restoreAllMocks());

describe('SAJU-R28 governed visible-stem Yinshou collection', () => {
  test('replays a real canonical fixture and each unchanged R9 single-fact result', () => {
    const envelope = evidence(base);
    expect(validateVisibleStemYinshouSupportCollectionResearchEvidence(envelope, base).valid).toBe(
      true,
    );
    for (const slot of VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS) {
      const original = singleFact.buildSharedNatalSingleFactYinshouSupportResearchEvidence(base, {
        sourceFactRef: `derivedFacts.tenGods.${slot}.stem`,
        fact: chart(base)[slot].stem! as FactState<TenGod>,
      });
      expect(original.status).toBe('resolved');
      if (original.status === 'resolved')
        expect(envelope.payload.slots[slot].governedSingleFact).toEqual(original.envelope.payload);
    }
  });

  test.each(
    VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS.flatMap((slot) =>
      (['정인', '편인'] as const).map((member) => ({ slot, member })),
    ),
  )(
    'materializes $slot $member through exact evidence and a registered T2 slot claim',
    ({ slot, member }) => {
      const snapshot = fixture('식신', '정관', '정재');
      chart(snapshot)[slot].stem = resolved(member);
      const envelope = evidence(snapshot);
      const result = run(snapshot, [envelope]);
      expect(result.claims).toHaveLength(1);
      expect(result.claims[0]).toMatchObject({
        claimType: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_TYPE,
        taxonomy: { tier: 'T2' },
        value: visibleStemYinshouSupportCollectionClaimValue(slot, member),
        researchEvidenceRefs: [envelope.envelopeId],
      });
    },
  );

  test('preserves mixed and repeated members as distinct slot observations without a count or score', () => {
    const snapshot = fixture('정인', '편인', '정인');
    const envelope = evidence(snapshot);
    expect(run(snapshot).claims.map((claim) => claim.value)).toEqual(
      expect.arrayContaining([
        visibleStemYinshouSupportCollectionClaimValue('year', '정인'),
        visibleStemYinshouSupportCollectionClaimValue('month', '편인'),
        visibleStemYinshouSupportCollectionClaimValue('hour', '정인'),
      ]),
    );
    expect(run(snapshot).claims).toHaveLength(3);
    expect(Object.keys(envelope.payload)).toEqual([
      'snapshotId',
      'snapshotHash',
      'slots',
      'constraints',
    ]);
    expect(envelope.payload.constraints).toMatchObject({
      yinshouCountAuthorized: false,
      supportWeightAuthorized: false,
    });
  });

  test.each(['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관'] as const)(
    '%s remains bounded non-positive; resolved empty and absent evidence are distinct',
    (member) => {
      const snapshot = fixture(member, member, member);
      const envelope = evidence(snapshot);
      for (const slot of VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS)
        expect(envelope.payload.slots[slot].governedSingleFact.supportConstituentObserved).toBe(
          false,
        );
      expect(run(snapshot).claims).toEqual([]);
      expect(run(snapshot, []).claims).toEqual([]);
      expect(envelope.payload.constraints.wholeChartCollectionComplete).toBe(false);
    },
  );

  test('excludes visible day self and never dereferences branch or hidden support inputs', () => {
    const snapshot = fixture();
    const before = evidence(snapshot);
    for (const slot of ['year', 'month', 'day', 'hour'] as const) {
      Object.defineProperty(chart(snapshot)[slot], 'branch', {
        get() {
          throw new Error('branch consumed');
        },
      });
    }
    Object.defineProperty(snapshot.derivedFacts, 'hiddenStems', {
      get() {
        throw new Error('hidden consumed');
      },
    });
    Object.defineProperty(snapshot, 'pillars', {
      get() {
        throw new Error('pillars consumed');
      },
    });
    expect(evidence(snapshot)).toEqual(before);
    expect(Object.keys(before.payload.slots)).toEqual(['year', 'month', 'hour']);
    chart(snapshot).day.stem = resolved('정인');
    expect(collectVisibleStemYinshouSupport(snapshot)).toMatchObject({
      status: 'unavailable',
      reasonCode: 'yinshou-collection-day-self-semantic-mismatch',
    });
  });

  test.each(VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS)(
    'fails closed for every missing/ambiguous/unavailable/invalid %s slot',
    (slot) => {
      for (const replacement of [
        undefined,
        unavailable('missing'),
        ambiguous<TenGod>(
          [
            { candidateId: 'a', value: '정인', reasonRefs: [] },
            { candidateId: 'b', value: '편인', reasonRefs: [] },
          ],
          ['candidate'],
        ),
        resolved('invalid' as TenGod),
        resolved('일간' as const),
      ]) {
        const snapshot = fixture();
        if (replacement === undefined) delete chart(snapshot)[slot].stem;
        else chart(snapshot)[slot].stem = replacement;
        expect(collectVisibleStemYinshouSupport(snapshot).status).toBe('unavailable');
        expect(buildVisibleStemYinshouSupportCollectionResearchEvidence(snapshot).status).toBe(
          'unavailable',
        );
      }
    },
  );

  test('fails closed for unresolved outer chart, day marker, missing binding or unmaterialized scenarios', () => {
    const cases = [fixture(), fixture(), fixture(), fixture(), fixture()];
    cases[0]!.derivedFacts.tenGods = unavailable('missing');
    cases[1]!.derivedFacts.tenGods = ambiguous(
      [
        { candidateId: 'a', value: chart(base), reasonRefs: [] },
        { candidateId: 'b', value: chart(fixture()), reasonRefs: [] },
      ],
      ['candidate'],
    );
    delete chart(cases[2]!).day.stem;
    cases[3]!.calculationHash = '';
    cases[4]!.scenarios = [{} as CanonicalSajuSnapshot['scenarios'][number]];
    for (const snapshot of cases)
      expect(collectVisibleStemYinshouSupport(snapshot).status).toBe('unavailable');
  });

  test('rejects an upstream semantic parity failure instead of producing a partial collection', () => {
    vi.spyOn(support, 'bindGovernedYinshouMemberToDangZhongSupportConstituent').mockImplementation(
      (evaluation) => ({
        state: 'no_yinshou_support_constituent_evidence',
        upstreamState: evaluation.state,
        canonicalConstituent: null,
        sourceMemberLabel: null,
        sourceSupportCategory: null,
        supportConstituentObserved: false,
        dangZhongEstablished: false,
        zhuGuaEstablished: false,
        qiangRuoEstablished: false,
        authority: 'research_only',
      }),
    );
    expect(collectVisibleStemYinshouSupport(fixture()).status).toBe('unavailable');
  });

  test('rejects an upstream rehashed slot substitution', () => {
    const original = singleFact.buildSharedNatalSingleFactYinshouSupportResearchEvidence;
    vi.spyOn(
      singleFact,
      'buildSharedNatalSingleFactYinshouSupportResearchEvidence',
    ).mockImplementation((snapshot, input) => {
      const result = original(snapshot, input);
      if (result.status !== 'resolved') return result;
      return {
        status: 'resolved',
        envelope: createResearchEvidenceEnvelope(
          singleFact.SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
          snapshot,
          { ...result.envelope.payload, sourceFactRef: 'derivedFacts.tenGods.hour.stem' },
        ),
      };
    });
    expect(collectVisibleStemYinshouSupport(fixture())).toMatchObject({
      status: 'unavailable',
      reasonCode: 'yinshou-collection-upstream-slot-parity-unresolved',
    });
  });

  test('does not retain earlier positives when the last upstream slot fails', () => {
    const original = singleFact.buildSharedNatalSingleFactYinshouSupportResearchEvidence;
    vi.spyOn(
      singleFact,
      'buildSharedNatalSingleFactYinshouSupportResearchEvidence',
    ).mockImplementation((snapshot, input) =>
      input.sourceFactRef === 'derivedFacts.tenGods.hour.stem'
        ? {
            status: 'unavailable',
            reasonCode: 'single-fact-yinshou-support-upstream-parity-unresolved',
          }
        : original(snapshot, input),
    );
    const result = collectVisibleStemYinshouSupport(fixture());
    expect(result.status).toBe('unavailable');
    expect(result).not.toHaveProperty('projection');
  });

  test('rejects rehashed forged member/source/omission/count/authority and emits no claim', () => {
    const snapshot = fixture();
    const valid = evidence(snapshot);
    const mutations = [
      (payload: Mutable<typeof valid.payload>) => {
        payload.slots.year.governedSingleFact.supportConstituentObserved = false;
      },
      (payload: Mutable<typeof valid.payload>) => {
        payload.slots.year.governedSingleFact.sourceFactRef = 'derivedFacts.tenGods.month.stem';
      },
      (payload: Mutable<typeof valid.payload>) => {
        payload.slots.year.slot = 'hour';
      },
      (payload: Mutable<typeof valid.payload>) => {
        delete (payload.slots as Partial<typeof payload.slots>).hour;
      },
      (payload: Mutable<typeof valid.payload>) => {
        Object.assign(payload, { yinshouCount: 2 });
      },
      (payload: Mutable<typeof valid.payload>) => {
        Object.assign(payload.constraints, { productionAuthorityAuthorized: true });
      },
    ];
    for (const mutate of mutations) {
      const payload = structuredClone(valid.payload) as Mutable<typeof valid.payload>;
      mutate(payload);
      const forged = createResearchEvidenceEnvelope(definition, snapshot, payload);
      expect(
        validateVisibleStemYinshouSupportCollectionResearchEvidence(forged, snapshot).valid,
      ).toBe(false);
      expect(() => run(snapshot, [forged])).toThrow(ResearchEvidenceExecutionError);
    }
  });

  test('reproduces envelope, registry and engine deterministically with exact snapshot binding and no Narrative authority', () => {
    const snapshot = fixture();
    const envelope = evidence(snapshot);
    expect(evidence(snapshot)).toEqual(envelope);
    expect(createVisibleStemYinshouSupportCollectionResearchRegistry()).toEqual(
      createVisibleStemYinshouSupportCollectionResearchRegistry(),
    );
    expect(run(snapshot)).toEqual(run(snapshot));
    const alteredFact = structuredClone(snapshot);
    chart(alteredFact).year.stem = resolved('정재');
    for (const changed of [
      { ...snapshot, snapshotId: 'other' },
      { ...snapshot, calculationHash: 'other' },
      alteredFact,
    ]) {
      expect(
        validateVisibleStemYinshouSupportCollectionResearchEvidence(envelope, changed).valid,
      ).toBe(false);
      expect(() => run(changed, [envelope])).toThrow(ResearchEvidenceExecutionError);
    }
    expect(VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_TYPE_DEFINITION.materialForNarrative).toBe(
      false,
    );
    expect(VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_AUTHORITY).toMatchObject({
      branchTenGodScanAuthorized: false,
      hiddenStemScanAuthorized: false,
      wholeChartCollectionComplete: false,
      bijieYinshouAggregationAuthorized: false,
      tonggenCompositionAuthorized: false,
      dangZhongZhuGuaSettlementAuthorized: false,
      strengthClassificationAuthorized: false,
      narrativeMaterialityAuthorized: false,
      productionAuthorityAuthorized: false,
    });
  });

  test('rejects Production pack promotion of research evidence', () => {
    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_RULES,
          methodologies: [VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_METHODOLOGY],
          sources: [...VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES],
          claimTypeDefinitions: [VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_TYPE_DEFINITION],
          claimValueSchemas: [VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_VALUE_SCHEMA],
          reviewAttestations: [],
        },
        { ...VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_PACK, status: 'production' },
      ),
    ).toThrow(RegistryConfigurationError);
  });
});
