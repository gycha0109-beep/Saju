import { describe, expect, test } from 'vitest';
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
import { resolved } from '../src/contracts/common.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  buildIntrinsicTonggenResearchEvidence,
} from '../src/research/shared-natal-intrinsic-tonggen-research-evidence-adapter.js';
import {
  buildSajuR34StrengthRootSubstrate,
  buildSajuR34StrengthRootSubstrateFromEvidence,
  SAJU_R34_STRENGTH_ROOT_SUBSTRATE_AUTHORITY,
} from '../src/research/saju-r34-strength-root-substrate.js';
import {
  INTRINSIC_TONGGEN_SLOTS as slots,
} from '../src/research/phase-independent-intrinsic-tonggen-authority.js';
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
  for (const [index, slot] of slots.entries()) {
    const pillar = snapshot.pillars[slot];
    if (pillar.status !== 'resolved') throw new Error('fixture pillar required');
    snapshot.pillars[slot] = resolved({
      ...pillar.value,
      ...(slot === 'day' ? { stem: structuredClone(master) } : {}),
      branch: { ...pillar.value.branch, value: branches[index]! },
    });
  }
  snapshot.calculationHash = deterministicContentHash({
    syntheticR34: snapshot.pillars,
  });
  snapshot.snapshotId = 'synthetic_r34_' + snapshot.calculationHash.slice(0, 24);
  return enrichCanonicalHiddenStems(snapshot);
}

function resolvedSubstrate(snapshot: CanonicalSajuSnapshot) {
  const result = buildSajuR34StrengthRootSubstrate(snapshot);
  if (result.status !== 'resolved') throw new Error(result.reasonCode);
  return result.substrate;
}

describe('SAJU-R34 intrinsic root strength substrate', () => {
  test('admits only intrinsic presence topology and keeps all effect/classification authority closed', () => {
    expect(SAJU_R34_STRENGTH_ROOT_SUBSTRATE_AUTHORITY).toMatchObject({
      intrinsicPresenceTopologyAuthorized: true,
      chartAnyIntrinsicTonggenSummaryAuthorized: true,
      chartAnyIntrinsicTonggenFalseMeansWholeChartNoRoot: false,
      twelveGrowthStageConsumed: false,
      rootCountAuthorized: false,
      rootWeightAuthorized: false,
      monthMultiplierAuthorized: false,
      effectiveRootSupportAuthorized: false,
      rootQualitySettlementAuthorized: false,
      postRelationRootStateAuthorized: false,
      supportEffectAuthorized: false,
      dangZhongZhuGuaAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      wangShuaiClassificationAuthorized: false,
      narrativeMaterialityAuthorized: false,
      productRootAuthority: 'NOT_GRANTED',
      productionAuthorityAuthorized: false,
    });
  });

  test.each([
    { stem: '을', branch: '오', expected: false, matches: [] },
    { stem: '정', branch: '유', expected: false, matches: [] },
    { stem: '을', branch: '해', expected: true, matches: ['갑'] },
    { stem: '정', branch: '인', expected: true, matches: ['병'] },
  ] as const)(
    'preserves R33 intrinsic root semantics for $stem/$branch',
    ({ stem, branch, expected, matches }) => {
      const substrate = resolvedSubstrate(
        fixture(stem, [branch, branch, branch, branch]),
      );
      for (const slot of slots) {
        expect(substrate.rootTopology[slot]).toMatchObject({
          pillarSlot: slot,
          branch,
          intrinsicTonggen: expected,
          matchingHiddenStems: matches,
          effectiveRootSupport: 'not_determined',
          rootQuality: 'not_determined',
          postRelationRootState: 'not_determined',
        });
      }
      expect(substrate.anyIntrinsicTonggen).toBe(expected);
    },
  );

  test('preserves all four slot identities and exact hidden source references', () => {
    const substrate = resolvedSubstrate(fixture());
    expect(
      slots.map((slot) => ({
        slot,
        sourceFactRef: substrate.rootTopology[slot].sourceFactRef,
      })),
    ).toEqual([
      { slot: 'year', sourceFactRef: 'derivedFacts.hiddenStems.year' },
      { slot: 'month', sourceFactRef: 'derivedFacts.hiddenStems.month' },
      { slot: 'day', sourceFactRef: 'derivedFacts.hiddenStems.day' },
      { slot: 'hour', sourceFactRef: 'derivedFacts.hiddenStems.hour' },
    ]);
    expect(substrate.allBranchesResolved).toBe(true);
  });

  test('summarizes any intrinsic root without creating whole-chart no-root semantics', () => {
    const mixed = resolvedSubstrate(fixture('을', ['자', '해', '자', '자']));
    expect(mixed.anyIntrinsicTonggen).toBe(true);

    const none = resolvedSubstrate(fixture('을', ['자', '자', '자', '자']));
    expect(none.anyIntrinsicTonggen).toBe(false);
    expect(none.anyIntrinsicTonggenFalseMeaning).toBe(
      'no_r33_intrinsic_same_element_hidden_member_in_checked_four_branch_domain_only',
    );
    expect(none.wholeChartNoRoot).toBe('not_determined');
    expect(none.effectiveRootSupport).toBe('not_determined');
    expect(none.qiangRuo).toBe('not_determined');
    expect(none.wangShuai).toBe('not_determined');
  });

  test('revalidates the exact R33 envelope before admitting it', () => {
    const snapshot = fixture('을', ['해', '해', '해', '해']);
    const evidence = buildIntrinsicTonggenResearchEvidence(snapshot);
    if (evidence.status !== 'resolved') throw new Error(evidence.reasonCode);

    const forged = structuredClone(evidence.envelope) as any;
    forged.payload.branches.year.tonggen = false;
    forged.payloadHash = deterministicContentHash(forged.payload);

    const result = buildSajuR34StrengthRootSubstrateFromEvidence(
      snapshot,
      forged,
    );
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toBe(
      'strength-root-substrate-r33-evidence-invalid',
    );
    expect(result.validationErrors).toContain(
      'intrinsic_tonggen_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test('fails closed rather than turning unresolved/scenario input into a negative root verdict', () => {
    const snapshot = fixture();
    snapshot.scenarios = [{}] as never;
    const result = buildSajuR34StrengthRootSubstrate(snapshot);
    expect(result.status).toBe('unavailable');
    if (result.status !== 'unavailable') throw new Error('expected unavailable');
    expect(result.reasonCode).toContain(
      'strength-root-substrate-r33-evidence-unavailable',
    );
  });

  test('is deterministic for the same snapshot and does not mutate the snapshot', () => {
    const snapshot = fixture('정', ['인', '유', '오', '자']);
    const before = deterministicContentHash(snapshot);
    const first = buildSajuR34StrengthRootSubstrate(snapshot);
    const second = buildSajuR34StrengthRootSubstrate(snapshot);
    expect(first).toEqual(second);
    expect(deterministicContentHash(snapshot)).toBe(before);
  });

  test('does not turn intrinsic root presence into count, weight, quality or support effect', () => {
    const substrate = resolvedSubstrate(fixture('을', ['해', '묘', '미', '인']));
    expect(substrate.anyIntrinsicTonggen).toBe(true);
    expect(substrate).not.toHaveProperty('rootCount');
    expect(substrate).not.toHaveProperty('rootWeight');
    expect(substrate.effectiveRootSupport).toBe('not_determined');
    expect(substrate.rootQuality).toBe('not_determined');
    expect(substrate.supportEffect).toBe('not_determined');
  });
});
