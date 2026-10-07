import { afterEach, describe, expect, test, vi } from 'vitest';
import { resolved, unavailable, ambiguous } from '../src/contracts/common.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
  TenGod,
  TenGodChartFact,
  YinYang,
} from '../src/contracts/calculation.js';
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
  verifyResolvedRegistryContentIntegrity,
} from '../src/interpretation/rule-registry.js';
import * as bijianSupport from '../src/research/general-natal-visible-stem-bijian-slot-support-constituent-authority.js';
import { evaluateVisibleStemBijieSupportConstituentUnion } from '../src/research/general-natal-visible-stem-bijie-support-constituent-union-authority.js';
import {
  evaluateVisibleStemBijieSupportMemberCount,
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY,
} from '../src/research/general-natal-visible-stem-bijie-support-member-count-authority.js';
import {
  buildSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  validateSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence,
} from '../src/research/shared-natal-visible-stem-bijie-support-member-count-research-evidence-adapter.js';
import {
  createSharedNatalVisibleStemBijieSupportMemberCountResearchRegistry,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_TYPE,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_TYPE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_VALUE_SCHEMA,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_METHODOLOGY,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_PACK,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RULES,
  visibleStemBijieSupportMemberCountClaimValue,
} from '../src/research/shared-natal-visible-stem-bijie-support-member-count-structural-claim.js';
import { SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES } from '../src/research/shared-natal-visible-stem-bijie-support-union-structural-claim.js';
const STEM_META: Readonly<
  Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: YinYang }>
> = {
  갑: { hanja: '甲', element: '목', yinYang: '양' },
  을: { hanja: '乙', element: '목', yinYang: '음' },
  병: { hanja: '丙', element: '화', yinYang: '양' },
  정: { hanja: '丁', element: '화', yinYang: '음' },
  무: { hanja: '戊', element: '토', yinYang: '양' },
  기: { hanja: '己', element: '토', yinYang: '음' },
  경: { hanja: '庚', element: '금', yinYang: '양' },
  신: { hanja: '辛', element: '금', yinYang: '음' },
  임: { hanja: '壬', element: '수', yinYang: '양' },
  계: { hanja: '癸', element: '수', yinYang: '음' },
};

const BRANCH_META: Readonly<
  Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: YinYang }>
> = {
  자: { hanja: '子', element: '수', yinYang: '양' },
  축: { hanja: '丑', element: '토', yinYang: '음' },
  인: { hanja: '寅', element: '목', yinYang: '양' },
  묘: { hanja: '卯', element: '목', yinYang: '음' },
  진: { hanja: '辰', element: '토', yinYang: '양' },
  사: { hanja: '巳', element: '화', yinYang: '음' },
  오: { hanja: '午', element: '화', yinYang: '양' },
  미: { hanja: '未', element: '토', yinYang: '음' },
  신: { hanja: '申', element: '금', yinYang: '양' },
  유: { hanja: '酉', element: '금', yinYang: '음' },
  술: { hanja: '戌', element: '토', yinYang: '양' },
  해: { hanja: '亥', element: '수', yinYang: '음' },
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: { value: stem, ...STEM_META[stem] },
    branch: { value: branch, ...BRANCH_META[branch] },
  };
}

function tenGodChart(
  year: TenGod,
  month: TenGod,
  hour: TenGod,
  branchBijie = false,
): TenGodChartFact {
  return {
    year: {
      stem: resolved(year),
      ...(branchBijie ? { branch: resolved('비견') } : {}),
    },
    month: {
      stem: resolved(month),
      ...(branchBijie ? { branch: resolved('겁재') } : {}),
    },
    day: {
      stem: resolved('일간'),
      ...(branchBijie ? { branch: resolved('비견') } : {}),
    },
    hour: {
      stem: resolved(hour),
      ...(branchBijie ? { branch: resolved('겁재') } : {}),
    },
  };
}

function snapshot(tenGods: TenGodChartFact, suffix: string): CanonicalSajuSnapshot {
  return {
    snapshotId: `saju_synthetic_r25_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-10-06T09:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/saju-r25-visible-stem-bijie-support-union',
      policyVersion: '1',
      dayBoundary: 'midnight',
      trueSolarTime: {
        enabled: false,
        longitudeSource: 'not-applicable',
        applyEquationOfTime: false,
        applyHistoricalDst: false,
      },
      timeZonePolicy: {
        source: 'service-default',
        timeZone: 'Asia/Seoul',
      },
      unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
    },
    normalized: {
      solarDate: {
        status: 'resolved',
        value: { year: 2000, month: 1, day: 1 },
      },
      clockTime: { status: 'resolved', value: { hour: 12, minute: 0 } },
      timeZone: 'Asia/Seoul',
      appliedCorrections: [],
    },
    pillars: {
      year: { status: 'resolved', value: pillar('병', '인') },
      month: { status: 'resolved', value: pillar('정', '묘') },
      day: { status: 'resolved', value: pillar('갑', '진') },
      hour: { status: 'resolved', value: pillar('경', '사') },
    },
    derivedFacts: {
      dayMaster: {
        status: 'resolved',
        value: { value: '갑', ...STEM_META.갑 },
      },
      tenGods: resolved(tenGods),
      voidBranches: { status: 'resolved', value: [] },
    },
    luckCycle: {
      status: 'unavailable',
      reasonCode: 'synthetic-not-needed',
    },
    scenarios: [],
    completeness: {
      birthTimeKnown: true,
      fullyResolved: false,
      resolvedPaths: [
        'pillars.year',
        'pillars.month',
        'pillars.day',
        'pillars.hour',
        'derivedFacts.dayMaster',
        'derivedFacts.tenGods',
      ],
      ambiguousPaths: [],
      unavailablePaths: [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: {
        id: 'synthetic/saju-r25-visible-stem-bijie-support-union',
        version: '1',
      },
      schema: {
        id: 'myeonghwa-canonical-saju',
        version: 'saju-canonical-v1.4',
      },
    },
  };
}

function evidence(base: CanonicalSajuSnapshot) {
  const built = buildSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(base);
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}
const runtimeRegistry = () =>
  createResearchEvidenceRuntimeRegistry([
    SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
function run(
  base: CanonicalSajuSnapshot,
  envelopes: readonly ResearchEvidenceEnvelope[] = [evidence(base)],
) {
  const registry = createSharedNatalVisibleStemBijieSupportMemberCountResearchRegistry();
  return runInterpretation(base, registry, {
    researchEvidence: { runtimeRegistry: runtimeRegistry(), envelopes },
    now: new Date('2026-10-07T00:00:00.000Z'),
  });
}

afterEach(() => vi.restoreAllMocks());

describe('SAJU-R25 bounded visible-stem Bijie support-member count', () => {
  test.each([
    ['정재', '정관', '편인', 0],
    ['비견', '정관', '편인', 1],
    ['겁재', '정관', '편인', 1],
    ['비견', '겁재', '편인', 2],
    ['겁재', '비견', '겁재', 3],
    ['비견', '비견', '비견', 3],
    ['겁재', '겁재', '겁재', 3],
  ] as const)('counts %s/%s/%s as %s through evidence and T2 claim', (year, month, hour, count) => {
    const base = snapshot(tenGodChart(year, month, hour), `${year}-${month}-${hour}`);
    const envelope = evidence(base);
    expect(envelope.payload.visibleStemBijieSupportMemberCount).toBe(count);
    expect(envelope.payload.semanticScope).toBe(
      'year_month_hour_visible_stem_support_members_only',
    );
    expect(envelope.payload.upstreamThreeWayParityVerified).toBe(true);
    expect(runtimeRegistry().validate(envelope, base).status).toBe('validated');
    const registry = createSharedNatalVisibleStemBijieSupportMemberCountResearchRegistry();
    expect(verifyResolvedRegistryContentIntegrity(registry)).toEqual([]);
    const result = run(base);
    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(result.run.status).toBe('completed');
    expect(result.claims).toHaveLength(1);
    expect(result.claims[0]).toMatchObject({
      claimType: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_TYPE,
      taxonomy: { tier: 'T2' },
      value: visibleStemBijieSupportMemberCountClaimValue(count),
      researchEvidenceRefs: [envelope.envelopeId],
    });
  });

  test('covers every position and mixture using R23 as the only membership surface', () => {
    const labels = ['비견', '겁재', '정인'] as const;
    for (const year of labels)
      for (const month of labels)
        for (const hour of labels) {
          const union = evaluateVisibleStemBijieSupportConstituentUnion(
            resolved(tenGodChart(year, month, hour)),
          );
          const result = evaluateVisibleStemBijieSupportMemberCount(union);
          expect(result.visibleStemBijieSupportMemberCount).toBe(
            [year, month, hour].filter((value) => value !== '정인').length,
          );
        }
  });

  test('excludes day self, branch and hidden-stem support from cardinality', () => {
    const base = snapshot(tenGodChart('정재', '정관', '편인'), 'excluded');
    const withBranchAndHidden: CanonicalSajuSnapshot = {
      ...base,
      derivedFacts: {
        ...base.derivedFacts,
        tenGods: resolved(tenGodChart('정재', '정관', '편인', true)),
        hiddenStems: {
          year: resolved(['갑', '을']),
          month: resolved(['갑', '을']),
          day: resolved(['갑', '을']),
          hour: resolved(['갑', '을']),
        },
      },
    };
    expect(evidence(withBranchAndHidden).payload).toEqual(evidence(base).payload);
    expect(evidence(base).payload.visibleStemBijieSupportMemberCount).toBe(0);
    const missingHidden = {
      ...withBranchAndHidden,
      derivedFacts: {
        ...withBranchAndHidden.derivedFacts,
        hiddenStems: {
          year: unavailable('hidden'),
          month: unavailable('hidden'),
          day: unavailable('hidden'),
          hour: unavailable('hidden'),
        },
      },
    };
    expect(evidence(missingHidden).payload).toEqual(evidence(base).payload);
  });

  test('unresolved and ambiguous facts and invalid day self stay unavailable, never zero', () => {
    const base = snapshot(tenGodChart('정재', '정관', '편인'), 'unresolved');
    const charts = [
      unavailable('chart-unresolved'),
      resolved({
        ...tenGodChart('정재', '정관', '편인'),
        month: { stem: unavailable('month-unresolved') },
      }),
      resolved({ ...tenGodChart('정재', '정관', '편인'), hour: {} }),
      resolved({
        ...tenGodChart('정재', '정관', '편인'),
        day: { stem: resolved('비견' as const) },
      }),
      resolved({
        ...tenGodChart('정재', '정관', '편인'),
        year: {
          stem: ambiguous<TenGod>(
            [
              { candidateId: 'a', value: '비견', reasonRefs: ['uncertain'] },
              { candidateId: 'b', value: '정관', reasonRefs: ['uncertain'] },
            ],
            ['uncertain'],
          ),
        },
      }),
    ];
    for (const tenGods of charts) {
      const changed = { ...base, derivedFacts: { ...base.derivedFacts, tenGods } };
      const union = evaluateVisibleStemBijieSupportConstituentUnion(tenGods);
      expect(
        evaluateVisibleStemBijieSupportMemberCount(union).visibleStemBijieSupportMemberCount,
      ).toBeNull();
      expect(
        buildSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(changed).status,
      ).toBe('unavailable');
      // Even a freshly hashed zero payload cannot turn unresolved into negative.
      const forgedZero = createResearchEvidenceEnvelope(
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION,
        changed,
        { ...evidence(base).payload, visibleStemBijieSupportMemberCount: 0 },
      );
      expect(
        validateSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(forgedZero, changed)
          .valid,
      ).toBe(false);
      expect(() => run(changed, [forgedZero])).toThrow(ResearchEvidenceExecutionError);
    }
    expect(run(base, []).claims).toEqual([]);
  });

  test('rejects unmaterialized scenarios', () => {
    const base = snapshot(tenGodChart('비견', '겁재', '정관'), 'scenario');
    const changed = {
      ...base,
      scenarios: [
        {
          scenarioId: 'scenario-a',
          snapshotId: base.snapshotId,
          factOverrides: [],
          reasonRefs: ['unknown-time'],
        },
      ],
    };
    expect(buildSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(changed)).toEqual({
      status: 'unavailable',
      reasonCode: 'visible-stem-bijie-support-member-count-scenario-materialization-required',
    });
  });

  test('fails closed on actual R23 cross-surface parity failure', () => {
    const base = snapshot(tenGodChart('비견', '겁재', '정관'), 'parity');
    const good = bijianSupport.evaluateVisibleStemBijianSlotSupportConstituents(
      base.derivedFacts.tenGods,
    );
    if (good.slots === null) throw new Error('expected resolved support');
    vi.spyOn(bijianSupport, 'evaluateVisibleStemBijianSlotSupportConstituents').mockReturnValue({
      ...good,
      slots: {
        ...good.slots,
        year: { ...good.slots.year, sourceFactRef: 'derivedFacts.tenGods.month.stem' },
      },
    });
    const union = evaluateVisibleStemBijieSupportConstituentUnion(base.derivedFacts.tenGods);
    expect(union.state).toBe('slot_support_union_parity_unresolved');
    expect(
      evaluateVisibleStemBijieSupportMemberCount(union).visibleStemBijieSupportMemberCount,
    ).toBeNull();
    expect(buildSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(base).status).toBe(
      'unavailable',
    );
  });

  test('requires R23 parity flag and fixed slot/source identity before arithmetic', () => {
    const union = evaluateVisibleStemBijieSupportConstituentUnion(
      resolved(tenGodChart('비견', '겁재', '정관')),
    );
    if (union.slots === null) throw new Error('expected resolved union');
    for (const changed of [
      { ...union, upstreamThreeWayParityVerified: false },
      { ...union, slots: null },
      { ...union, visibleStemBijieSupportObserved: false },
      {
        ...union,
        slots: { ...union.slots, year: { ...union.slots.year, slot: 'month' as const } },
      },
    ]) {
      expect(evaluateVisibleStemBijieSupportMemberCount(changed)).toMatchObject({
        state: 'r23_support_union_parity_unresolved',
        visibleStemBijieSupportMemberCount: null,
      });
    }
  });

  test.each([-1, 4, 1.5, null, '2', 0, 3])(
    'rejects forged count %s even with recomputed envelope hash',
    (count) => {
      const base = snapshot(tenGodChart('비견', '겁재', '정관'), 'tamper');
      const forged = createResearchEvidenceEnvelope(
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION,
        base,
        { ...evidence(base).payload, visibleStemBijieSupportMemberCount: count },
      );
      expect(
        validateSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(forged, base).valid,
      ).toBe(false);
      expect(() => run(base, [forged])).toThrow(ResearchEvidenceExecutionError);
    },
  );

  test('rejects every forbidden authority promotion, extra fields and upstream binding tampering', () => {
    const base = snapshot(tenGodChart('비견', '겁재', '정관'), 'authority');
    const original = evidence(base);
    const forgedPayloads = [
      { ...original.payload, upstreamR23ResultHash: 'forged' },
      { ...original.payload, upstreamThreeWayParityVerified: false },
      { ...original.payload, authorityDefinitionHash: 'forged' },
      { ...original.payload, semanticScope: 'whole_chart' },
      { ...original.payload, supportWeight: 2 },
      ...Object.entries(original.payload.constraints)
        .filter(([, value]) => value === false)
        .map(([key]) => ({
          ...original.payload,
          constraints: { ...original.payload.constraints, [key]: true },
        })),
    ];
    for (const payload of forgedPayloads) {
      const forged = createResearchEvidenceEnvelope(
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RESEARCH_EVIDENCE_DEFINITION,
        base,
        payload,
      );
      expect(
        validateSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(forged, base).valid,
      ).toBe(false);
      expect(() => run(base, [forged])).toThrow(ResearchEvidenceExecutionError);
    }
  });

  test('reproduces evidence, registry and claims deterministically and binds the exact snapshot', () => {
    const base = snapshot(tenGodChart('비견', '겁재', '정관'), 'replay');
    const original = evidence(base);
    expect(evidence(base)).toEqual(original);
    expect(createSharedNatalVisibleStemBijieSupportMemberCountResearchRegistry()).toEqual(
      createSharedNatalVisibleStemBijieSupportMemberCountResearchRegistry(),
    );
    expect(run(base)).toEqual(run(base));
    expect(
      validateSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(original, {
        ...base,
        snapshotId: 'other-snapshot',
      }).valid,
    ).toBe(false);
    expect(
      validateSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(original, {
        ...base,
        calculationHash: 'other-hash',
      }).valid,
    ).toBe(false);
    const changed = {
      ...base,
      derivedFacts: {
        ...base.derivedFacts,
        tenGods: resolved(tenGodChart('정재', '정관', '편인')),
      },
    };
    expect(
      validateSharedNatalVisibleStemBijieSupportMemberCountResearchEvidence(original, changed)
        .valid,
    ).toBe(false);
  });

  test('keeps structural claim non-narrative and rejects Production pack selection', () => {
    expect(GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY.definitionHash).toMatch(
      /^[0-9a-f]{64}$/,
    );
    expect(SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RULES).toHaveLength(4);
    expect(
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_TYPE_DEFINITION,
    ).toMatchObject({
      exclusiveValue: true,
      scenarioSensitive: true,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T2'],
    });
    try {
      createRuleRegistrySnapshot(
        {
          rules: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_RULES,
          methodologies: [SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_METHODOLOGY],
          sources: [...SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES],
          claimTypeDefinitions: [
            SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        { ...SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_PACK, status: 'production' },
      );
      throw new Error('expected Production rejection');
    } catch (error) {
      expect(error).toBeInstanceOf(RegistryConfigurationError);
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });
});
