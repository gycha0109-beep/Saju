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
  buildSharedNatalVisibleBijianSupportResearchEvidence,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  validateSharedNatalVisibleBijianSupportResearchEvidence,
} from '../src/research/shared-natal-visible-bijian-support-research-evidence-adapter.js';
import {
  createSharedNatalVisibleBijianSupportResearchRegistry,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE_DEFINITION,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_VALUE,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_VALUE_SCHEMA,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_PACK,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE_INPUT_REQUIREMENT,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_SOURCE,
} from '../src/research/shared-natal-visible-bijian-support-structural-claim.js';

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
  branchBijian = false,
): TenGodChartFact {
  return {
    year: {
      stem: resolved(year),
      ...(branchBijian ? { branch: resolved('비견') } : {}),
    },
    month: {
      stem: resolved(month),
      ...(branchBijian ? { branch: resolved('비견') } : {}),
    },
    day: {
      stem: resolved('일간'),
      ...(branchBijian ? { branch: resolved('비견') } : {}),
    },
    hour: {
      stem: resolved(hour),
      ...(branchBijian ? { branch: resolved('비견') } : {}),
    },
  };
}

function snapshot(
  tenGods: TenGodChartFact,
  suffix: string,
): CanonicalSajuSnapshot {
  return {
    snapshotId: `saju_synthetic_r7_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-10-03T08:20:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/saju-r7-visible-bijian',
      policyVersion: '1',
      dayBoundary: 'midnight',
      trueSolarTime: {
        enabled: false,
        longitudeSource: 'not-applicable',
        applyEquationOfTime: false,
        applyHistoricalDst: false,
      },
      timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
      unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
    },
    normalized: {
      solarDate: { status: 'resolved', value: { year: 2000, month: 1, day: 1 } },
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
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
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
      policy: { id: 'synthetic/saju-r7-visible-bijian', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

function evidence(base: CanonicalSajuSnapshot) {
  const built = buildSharedNatalVisibleBijianSupportResearchEvidence(base);
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}

function runtimeRegistry() {
  return createResearchEvidenceRuntimeRegistry([
    SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
}

describe('SAJU-R7 visible Bijian support constituent vertical slice', () => {
  test.each([
    [tenGodChart('비견', '정재', '정관'), 1],
    [tenGodChart('비견', '비견', '정관'), 2],
    [tenGodChart('비견', '비견', '비견'), 3],
  ] as const)(
    'preserves bounded visible Bijian count %s only as upstream operand and materializes support evidence',
    (chart, count) => {
      const envelope = evidence(snapshot(chart, String(count)));

      expect(envelope.payload.upstreamEvaluation).toMatchObject({
        state: 'bounded_peer_stem_count_established',
        peerStemCount: count,
        boundedOperand: { kind: 'peer_stem_count', count },
        authority: 'research_only',
      });
      expect(envelope.payload.supportEvaluation).toMatchObject({
        state: 'visible_bijian_support_constituent_observed',
        canonicalConstituent: '비견',
        sourceSupportCategory: '比劫',
        visibleBijianCount: count,
        supportConstituentObserved: true,
        dangZhongEstablished: false,
        zhuGuaEstablished: false,
        qiangRuoEstablished: false,
        authority: 'research_only',
      });
      expect(envelope.payload.supportConstituentObserved).toBe(true);
      expect(envelope.payload.constraints.peerCountIsBoundedOperandOnly).toBe(true);
      expect(envelope.payload.constraints.peerCountToDangZhongAuthorized).toBe(false);
      expect(envelope.payload.constraints.peerCountToStrengthAuthorized).toBe(false);
    },
  );

  test('zero visible Bijian is a bounded non-positive result, not no-support or Zhu-Gua evidence', () => {
    const envelope = evidence(
      snapshot(tenGodChart('겁재', '정재', '정관', true), 'a'),
    );

    expect(envelope.payload.upstreamEvaluation).toMatchObject({
      state: 'no_bounded_peer_stem_operand',
      peerStemCount: 0,
      boundedOperand: null,
    });
    expect(envelope.payload.supportEvaluation).toMatchObject({
      state: 'no_visible_bijian_support_constituent',
      visibleBijianCount: 0,
      supportConstituentObserved: false,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
    });
    expect(envelope.payload.supportConstituentObserved).toBe(false);
    expect(envelope.payload.constraints.jiecaiIncludedAsBijian).toBe(false);
    expect(envelope.payload.constraints.branchTenGodConsumed).toBe(false);
    expect(envelope.payload.constraints.noVisibleBijianMeansNoSupport).toBe(false);
  });

  test('fails closed instead of converting unresolved canonical Ten-God facts into a negative result', () => {
    const base = snapshot(tenGodChart('비견', '정재', '정관'), 'b');
    const unresolved: CanonicalSajuSnapshot = {
      ...base,
      derivedFacts: {
        ...base.derivedFacts,
        tenGods: unavailable('synthetic-unresolved'),
      },
    };

    expect(buildSharedNatalVisibleBijianSupportResearchEvidence(unresolved)).toEqual({
      status: 'unavailable',
      reasonCode: 'visible-bijian-support-ten-god-chart-unresolved',
    });
  });

  test('validates through the generic runtime registry and rejects authority widening', () => {
    const base = snapshot(tenGodChart('비견', '정재', '정관'), 'c');
    const original = evidence(base);

    expect(runtimeRegistry().validate(original, base).status).toBe('validated');

    const widenedPayload = {
      ...original.payload,
      constraints: {
        ...original.payload.constraints,
        peerCountToDangZhongAuthorized: true,
      },
    };
    const widened = createResearchEvidenceEnvelope(
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      base,
      widenedPayload,
    );
    const validation =
      validateSharedNatalVisibleBijianSupportResearchEvidence(widened, base);

    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain(
      'visible_bijian_support_payload_authority_widened',
    );
    expect(validation.errors).toContain(
      'visible_bijian_support_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test('materializes one registered T2 claim without promoting the peer count into claim semantics', () => {
    const base = snapshot(tenGodChart('비견', '비견', '정관'), 'd');
    const envelope = evidence(base);
    const registry = createSharedNatalVisibleBijianSupportResearchRegistry(
      '2026-10-03T08:21:00.000Z',
    );

    expect(verifyResolvedRegistryContentIntegrity(registry)).toEqual([]);

    const result = runInterpretation(base, registry, {
      researchEvidence: {
        runtimeRegistry: runtimeRegistry(),
        envelopes: [envelope],
      },
      now: new Date('2026-10-03T08:22:00.000Z'),
    });

    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(result.run.status).toBe('completed');
    expect(result.evaluations).toHaveLength(1);
    expect(result.evaluations[0]?.status).toBe('matched');
    expect(result.claims).toHaveLength(1);
    expect(result.claims[0]).toMatchObject({
      taxonomy: {
        tier: 'T2',
        category: 'day_master_strength',
        subcategory: 'visible_bijian_support_constituent',
      },
      claimType: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'visible_bijian_support_constituent_observed',
      value: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_VALUE,
      researchEvidenceRefs: [envelope.envelopeId],
    });
    expect(
      Object.prototype.hasOwnProperty.call(result.claims[0]?.value, 'visibleBijianCount'),
    ).toBe(false);
  });

  test('valid zero evidence emits no inverse claim and missing evidence fails closed', () => {
    const base = snapshot(tenGodChart('겁재', '정재', '정관'), 'e');
    const envelope = evidence(base);
    const registry = createSharedNatalVisibleBijianSupportResearchRegistry(
      '2026-10-03T08:21:00.000Z',
    );

    const zero = runInterpretation(base, registry, {
      researchEvidence: {
        runtimeRegistry: runtimeRegistry(),
        envelopes: [envelope],
      },
      now: new Date('2026-10-03T08:22:00.000Z'),
    });
    expect(zero.run.status).toBe('completed');
    expect(zero.evaluations[0]?.status).toBe('not_matched');
    expect(zero.claims).toEqual([]);

    const missing = runInterpretation(base, registry, {
      now: new Date('2026-10-03T08:22:00.000Z'),
    });
    expect(missing.run.status).toBe('partial');
    expect(missing.evaluations[0]?.status).toBe('skipped_missing_input');
    expect(missing.claims).toEqual([]);
  });

  test('pins the non-aggregating boundary and rejects Production selection', () => {
    expect(SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE.inputs).toEqual([
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE_INPUT_REQUIREMENT,
    ]);
    expect(SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE_DEFINITION).toMatchObject({
      claimType: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE,
      scope: 'natal',
      exclusiveValue: true,
      scenarioSensitive: true,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T2'],
    });
    expect(SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_VALUE_SCHEMA.root).toMatchObject({
      kind: 'object',
      additionalProperties: false,
    });
    expect(SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY).toMatchObject({
      runtimeScope: 'isolated_research_pack_only',
      exactR7EvidenceBindingRequired: true,
      exactBijianOnly: true,
      jiecaiIncludedAsBijian: false,
      branchTenGodConsumed: false,
      hiddenStemConsumed: false,
      peerCountIsBoundedOperandOnly: true,
      peerCountToDangZhongAuthorized: false,
      peerCountToStrengthAuthorized: false,
      supportAggregationAuthorized: false,
      constituentCollectionComplete: false,
      noVisibleBijianMeansNoSupport: false,
      dangZhongSettlementAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      wangShuaiClassificationAuthorized: false,
      gyeokgukDerivationAuthorized: false,
      narrativeMaterialityAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      production: 'HOLD',
    });

    const productionPack = {
      ...SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_PACK,
      packId: 'PACK-SAJU-R7-VISIBLE-BIJIAN-SUPPORT-PRODUCTION-FORBIDDEN',
      status: 'production' as const,
    };

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE],
          methodologies: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY],
          sources: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_SOURCE],
          claimTypeDefinitions: [
            SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-03T08:21:00.000Z',
      ),
    ).toThrow(RegistryConfigurationError);

    try {
      createRuleRegistrySnapshot(
        {
          rules: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE],
          methodologies: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY],
          sources: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_SOURCE],
          claimTypeDefinitions: [
            SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-03T08:21:00.000Z',
      );
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });
});
