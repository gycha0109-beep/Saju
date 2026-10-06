import { describe, expect, test } from 'vitest';
import { resolved, unavailable } from '../src/contracts/common.js';
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
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceEnvelope } from '../src/interpretation/research-evidence.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import {
  createRuleRegistrySnapshot,
  RegistryConfigurationError,
  verifyResolvedRegistryContentIntegrity,
} from '../src/interpretation/rule-registry.js';
import {
  evaluateVisibleStemBijieSupportConstituentUnion,
  GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY,
} from '../src/research/general-natal-visible-stem-bijie-support-constituent-union-authority.js';
import {
  buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  validateSharedNatalVisibleStemBijieSupportUnionResearchEvidence,
} from '../src/research/shared-natal-visible-stem-bijie-support-union-research-evidence-adapter.js';
import {
  createSharedNatalVisibleStemBijieSupportUnionResearchRegistry,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_AUTHORITY_BOUNDARY,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_VALUE,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_VALUE_SCHEMA,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_PACK,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULES,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES,
} from '../src/research/shared-natal-visible-stem-bijie-support-union-structural-claim.js';

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

function snapshot(
  tenGods: TenGodChartFact,
  suffix: string,
): CanonicalSajuSnapshot {
  return {
    snapshotId: `saju_synthetic_r23_${suffix}`,
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
      policyId: 'synthetic/saju-r23-visible-stem-bijie-support-union',
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
        id: 'synthetic/saju-r23-visible-stem-bijie-support-union',
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
  const built =
    buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence(base);
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}

function runtimeRegistry() {
  return createResearchEvidenceRuntimeRegistry([
    SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
}

function run(base: CanonicalSajuSnapshot) {
  const envelope = evidence(base);
  const registry =
    createSharedNatalVisibleStemBijieSupportUnionResearchRegistry(
      '2026-10-06T09:01:00.000Z',
    );
  const result = runInterpretation(base, registry, {
    researchEvidence: {
      runtimeRegistry: runtimeRegistry(),
      envelopes: [envelope],
    },
    now: new Date('2026-10-06T09:02:00.000Z'),
  });
  return { envelope, registry, result };
}

describe('SAJU-R23 visible-stem Bijie support union vertical slice', () => {
  test.each([
    [tenGodChart('정재', '정관', '편인'), []],
    [tenGodChart('비견', '정관', '편인'), ['비견']],
    [tenGodChart('겁재', '정관', '편인'), ['겁재']],
    [tenGodChart('비견', '겁재', '편인'), ['비견', '겁재']],
    [tenGodChart('겁재', '비견', '겁재'), ['겁재', '비견', '겁재']],
    [tenGodChart('비견', '비견', '비견'), ['비견', '비견', '비견']],
    [tenGodChart('겁재', '겁재', '겁재'), ['겁재', '겁재', '겁재']],
  ] as const)(
    'materializes support member kinds without count semantics for %s',
    (chart, expectedKinds) => {
      const base = snapshot(chart, JSON.stringify(expectedKinds));
      const { envelope, registry, result } = run(base);

      expect(verifyResolvedRegistryContentIntegrity(registry)).toEqual([]);
      expect(result.integrity).toEqual({ valid: true, errors: [] });
      expect(result.run.status).toBe('completed');

      const observedKinds = [
        envelope.payload.slots.year,
        envelope.payload.slots.month,
        envelope.payload.slots.hour,
      ]
        .filter((slot) => slot.supportConstituentObserved)
        .map((slot) => slot.canonicalMemberKind);

      expect(observedKinds).toEqual([...expectedKinds]);
      expect(envelope.payload.upstreamThreeWayParityVerified).toBe(true);
      expect(envelope.payload.visibleStemBijieSupportObserved).toBe(
        expectedKinds.length > 0,
      );

      if (expectedKinds.length === 0) {
        expect(result.claims).toEqual([]);
      } else {
        expect(result.claims).toHaveLength(1);
        expect(result.claims[0]).toMatchObject({
          taxonomy: {
            tier: 'T2',
            category: 'day_master_strength',
            subcategory: 'visible_stem_bijie_support_union',
          },
          claimType:
            SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE,
          subject: 'day_master',
          predicate: 'visible_stem_bijie_support_constituent_observed',
          value: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_VALUE,
          researchEvidenceRefs: [envelope.envelopeId],
        });
      }
    },
  );

  test('preserves slot provenance, canonical member kind, and support category', () => {
    const envelope = evidence(
      snapshot(tenGodChart('비견', '겁재', '정관'), 'slot'),
    );

    expect(envelope.payload.slots.year).toEqual({
      slot: 'year',
      sourceFactRef: 'derivedFacts.tenGods.year.stem',
      canonicalTenGod: '비견',
      bijieMemberObserved: true,
      canonicalMemberKind: '비견',
      supportConstituentObserved: true,
      sourceSupportCategory: '比劫',
      authority: 'research_only',
    });

    expect(envelope.payload.slots.month).toEqual({
      slot: 'month',
      sourceFactRef: 'derivedFacts.tenGods.month.stem',
      canonicalTenGod: '겁재',
      bijieMemberObserved: true,
      canonicalMemberKind: '겁재',
      supportConstituentObserved: true,
      sourceSupportCategory: '比劫',
      authority: 'research_only',
    });

    expect(envelope.payload.slots.hour).toEqual({
      slot: 'hour',
      sourceFactRef: 'derivedFacts.tenGods.hour.stem',
      canonicalTenGod: '정관',
      bijieMemberObserved: false,
      canonicalMemberKind: null,
      supportConstituentObserved: false,
      sourceSupportCategory: null,
      authority: 'research_only',
    });
  });

  test('fails closed when visible stems are unresolved or day self semantics mismatch', () => {
    const base = snapshot(tenGodChart('비견', '겁재', '정관'), 'fail');

    const unresolved: CanonicalSajuSnapshot = {
      ...base,
      derivedFacts: {
        ...base.derivedFacts,
        tenGods: resolved({
          ...tenGodChart('비견', '겁재', '정관'),
          month: { stem: unavailable('synthetic-unresolved') },
        }),
      },
    };

    expect(
      buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence(unresolved),
    ).toEqual({
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijie-support-union-visible-stem-facts-unresolved',
    });

    const dayMismatch: CanonicalSajuSnapshot = {
      ...base,
      derivedFacts: {
        ...base.derivedFacts,
        tenGods: resolved({
          ...tenGodChart('비견', '겁재', '정관'),
          day: { stem: resolved('비견') },
        }),
      },
    };

    expect(
      buildSharedNatalVisibleStemBijieSupportUnionResearchEvidence(dayMismatch),
    ).toEqual({
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijie-support-union-day-stem-semantic-mismatch',
    });
  });

  test('ignores branch Ten-God data', () => {
    const a = snapshot(tenGodChart('비견', '겁재', '비견', false), 'branch-a');
    const b = snapshot(tenGodChart('비견', '겁재', '비견', true), 'branch-b');

    const one = evaluateVisibleStemBijieSupportConstituentUnion(
      a.derivedFacts.tenGods,
    );
    const two = evaluateVisibleStemBijieSupportConstituentUnion(
      b.derivedFacts.tenGods,
    );

    expect(one.state).toBe(
      'visible_stem_bijie_support_constituent_union_resolved',
    );
    expect(two.state).toBe(
      'visible_stem_bijie_support_constituent_union_resolved',
    );

    if (one.slots === null || two.slots === null) {
      throw new Error('expected resolved support union');
    }

    expect([
      one.slots.year.canonicalMemberKind,
      one.slots.month.canonicalMemberKind,
      one.slots.hour.canonicalMemberKind,
    ]).toEqual([
      two.slots.year.canonicalMemberKind,
      two.slots.month.canonicalMemberKind,
      two.slots.hour.canonicalMemberKind,
    ]);

    expect(
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY
        .branchTenGodScanAuthorized,
    ).toBe(false);
  });

  test('rejects authority widening and non-reproducible evidence', () => {
    const base = snapshot(tenGodChart('비견', '겁재', '정관'), 'validate');
    const original = evidence(base);

    expect(runtimeRegistry().validate(original, base).status).toBe('validated');

    const widenedPayload = {
      ...original.payload,
      constraints: {
        ...original.payload.constraints,
        unifiedBijieCountAuthorized: true,
      },
    };
    const widened = createResearchEvidenceEnvelope(
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION,
      base,
      widenedPayload,
    );
    const validation =
      validateSharedNatalVisibleStemBijieSupportUnionResearchEvidence(
        widened,
        base,
      );

    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain(
      'visible_stem_bijie_support_union_payload_authority_widened',
    );
    expect(validation.errors).toContain(
      'visible_stem_bijie_support_union_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test('pins R23 boundaries and rejects Production selection', () => {
    expect(SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULES).toHaveLength(1);
    expect(
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE_DEFINITION,
    ).toMatchObject({
      scope: 'natal',
      exclusiveValue: true,
      scenarioSensitive: true,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T2'],
    });
    expect(
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_VALUE_SCHEMA.root,
    ).toMatchObject({
      kind: 'object',
      additionalProperties: false,
    });

    expect(
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_AUTHORITY_BOUNDARY,
    ).toMatchObject({
      runtimeScope: 'isolated_research_pack_only',
      exactR23EvidenceBindingRequired: true,
      fixedVisibleStemDomainOnly: true,
      sourceSlotIdentityPreserved: true,
      canonicalMemberKindPreserved: true,
      upstreamThreeWayParityRequired: true,
      categoryUnionUsedOnlyAsParityGuard: true,
      supportConstituentUnionAuthorizedResearchOnly: true,
      bijianCountAuthorized: false,
      gyeopjaeCountAuthorized: false,
      unifiedBijieCountAuthorized: false,
      supportCountAuthorized: false,
      supportWeightAuthorized: false,
      completeBijieCollectionAuthorized: false,
      branchTenGodScanAuthorized: false,
      hiddenStemTenGodScanAuthorized: false,
      supportAggregationAuthorized: false,
      dangZhongSettlementAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      wangShuaiClassificationAuthorized: false,
      gyeokgukDerivationAuthorized: false,
      narrativeMaterialityAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      production: 'HOLD',
    });

    expect(
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_AUTHORITY
        .definitionHash,
    ).toMatch(/^[0-9a-f]{64}$/);

    const productionPack = {
      ...SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_PACK,
      packId:
        'PACK-SAJU-R23-VISIBLE-STEM-BIJIE-SUPPORT-UNION-PRODUCTION-FORBIDDEN',
      status: 'production' as const,
    };

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULES,
          methodologies: [
            SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY,
          ],
          sources: [...SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES],
          claimTypeDefinitions: [
            SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-06T09:01:00.000Z',
      ),
    ).toThrow(RegistryConfigurationError);

    try {
      createRuleRegistrySnapshot(
        {
          rules: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULES,
          methodologies: [
            SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY,
          ],
          sources: [...SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES],
          claimTypeDefinitions: [
            SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-06T09:01:00.000Z',
      );
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });
});
