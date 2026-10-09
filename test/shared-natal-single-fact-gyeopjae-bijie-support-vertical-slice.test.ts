import { describe, expect, test } from 'vitest';
import {
  resolved,
  unavailable,
  type FactState,
} from '../src/contracts/common.js';
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
  buildSharedNatalSingleFactGyeopjaeBijieSupportResearchEvidence,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  validateSharedNatalSingleFactGyeopjaeBijieSupportResearchEvidence,
} from '../src/research/shared-natal-single-fact-gyeopjae-bijie-support-research-evidence-adapter.js';
import type {
  SharedNatalSuppliedSingleTenGodFactBindingInput,
  SharedNatalSuppliedSingleTenGodSourceFactRef,
} from '../src/research/shared-natal-supplied-single-ten-god-fact-binding.js';
import {
  createSharedNatalSingleFactGyeopjaeBijieSupportResearchRegistry,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_VALUE,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_PACK,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULES,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_SOURCE,
} from '../src/research/shared-natal-single-fact-gyeopjae-bijie-support-structural-claim.js';

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
): TenGodChartFact {
  return {
    year: { stem: resolved(year) },
    month: { stem: resolved(month) },
    day: { stem: resolved('일간') },
    hour: { stem: resolved(hour) },
  };
}

function snapshot(
  tenGods: TenGodChartFact,
  suffix: string,
): CanonicalSajuSnapshot {
  return {
    snapshotId: `saju_synthetic_r12_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-10-04T13:20:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/saju-r12-single-fact-gyeopjae-bijie',
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
      clockTime: {
        status: 'resolved',
        value: { hour: 12, minute: 0 },
      },
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
        id: 'synthetic/saju-r12-single-fact-gyeopjae-bijie',
        version: '1',
      },
      schema: {
        id: 'myeonghwa-canonical-saju',
        version: 'saju-canonical-v1.4',
      },
    },
  };
}

function suppliedBinding(
  base: CanonicalSajuSnapshot,
  sourceFactRef: SharedNatalSuppliedSingleTenGodSourceFactRef,
): SharedNatalSuppliedSingleTenGodFactBindingInput {
  if (base.derivedFacts.tenGods.status !== 'resolved') {
    throw new Error('synthetic Ten-God chart must be resolved for caller binding');
  }

  const chart = base.derivedFacts.tenGods.value;
  const rawFact =
    sourceFactRef === 'derivedFacts.tenGods.year.stem'
      ? chart.year.stem
      : sourceFactRef === 'derivedFacts.tenGods.month.stem'
        ? chart.month.stem
        : chart.hour.stem;

  if (rawFact === undefined) {
    throw new Error('synthetic caller binding source fact missing');
  }

  if (rawFact.status === 'resolved' && rawFact.value === '일간') {
    throw new Error('synthetic caller binding source is not a Ten-God fact');
  }

  return {
    sourceFactRef,
    fact: rawFact as FactState<TenGod>,
  };
}

function evidence(
  base: CanonicalSajuSnapshot,
  sourceFactRef: SharedNatalSuppliedSingleTenGodSourceFactRef,
) {
  const built =
    buildSharedNatalSingleFactGyeopjaeBijieSupportResearchEvidence(
      base,
      suppliedBinding(base, sourceFactRef),
    );
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}

function runtimeRegistry() {
  return createResearchEvidenceRuntimeRegistry([
    SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
}

describe('SAJU-R12 single-fact Gyeopjae Bijie support vertical slice', () => {
  test('materializes caller-supplied resolved 겁재 as exactly one 比劫 support constituent and T2 claim', () => {
    const base = snapshot(
      tenGodChart('비견', '겁재', '정관'),
      '1',
    );
    const envelope = evidence(
      base,
      'derivedFacts.tenGods.month.stem',
    );

    expect(envelope.payload).toMatchObject({
      sourceFactRef: 'derivedFacts.tenGods.month.stem',
      boundCanonicalTenGod: '겁재',
      membershipEvaluation: {
        state: 'bijie_source_category_member_observed',
        canonicalLabel: '겁재',
        sourceLabel: '劫財',
        sourceCategory: '比劫',
        membershipObserved: true,
        authority: 'research_only',
      },
      supportEvaluation: {
        state: 'gyeopjae_bijie_support_constituent_observed',
        canonicalConstituent: '겁재',
        sourceMemberLabel: '劫財',
        sourceSupportCategory: '比劫',
        supportConstituentObserved: true,
        dangZhongEstablished: false,
        zhuGuaEstablished: false,
        qiangRuoEstablished: false,
        authority: 'research_only',
      },
      supportConstituentObserved: true,
    });

    const registry =
      createSharedNatalSingleFactGyeopjaeBijieSupportResearchRegistry(
        '2026-10-04T13:21:00.000Z',
      );
    expect(verifyResolvedRegistryContentIntegrity(registry)).toEqual([]);

    const result = runInterpretation(base, registry, {
      researchEvidence: {
        runtimeRegistry: runtimeRegistry(),
        envelopes: [envelope],
      },
      now: new Date('2026-10-04T13:22:00.000Z'),
    });

    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(result.run.status).toBe('completed');
    expect(
      result.evaluations.filter(
        (evaluation) => evaluation.status === 'matched',
      ),
    ).toHaveLength(1);
    expect(result.claims).toHaveLength(1);
    expect(result.claims[0]).toMatchObject({
      taxonomy: {
        tier: 'T2',
        category: 'day_master_strength',
        subcategory: 'single_fact_gyeopjae_bijie_support_constituent',
      },
      claimType:
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE,
      subject: 'day_master',
      predicate:
        'single_fact_gyeopjae_bijie_support_constituent_observed',
      value:
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_VALUE,
      researchEvidenceRefs: [envelope.envelopeId],
    });
    expect(
      Object.prototype.hasOwnProperty.call(
        result.claims[0]?.value,
        'sourceFactRef',
      ),
    ).toBe(false);
  });

  test('does not scan another slot when caller-selected bound fact is outside Gyeopjae scope', () => {
    const base = snapshot(
      tenGodChart('비견', '겁재', '정관'),
      '2',
    );
    const envelope = evidence(
      base,
      'derivedFacts.tenGods.year.stem',
    );

    expect(envelope.payload.boundCanonicalTenGod).toBe('비견');
    expect(envelope.payload.membershipEvaluation.state).toBe(
      'resolved_outside_authorized_gyeopjae_label_scope',
    );
    expect(envelope.payload.supportConstituentObserved).toBe(false);
    expect(
      envelope.payload.constraints.wholeChartJiecaiScanAuthorized,
    ).toBe(false);
    expect(
      envelope.payload.constraints
        .resolvedOtherTenGodUniversalNonBijieVerdictAuthorized,
    ).toBe(false);

    const registry =
      createSharedNatalSingleFactGyeopjaeBijieSupportResearchRegistry(
        '2026-10-04T13:21:00.000Z',
      );
    const result = runInterpretation(base, registry, {
      researchEvidence: {
        runtimeRegistry: runtimeRegistry(),
        envelopes: [envelope],
      },
      now: new Date('2026-10-04T13:22:00.000Z'),
    });

    expect(result.claims).toEqual([]);
  });

  test('fails closed for unresolved chart and exact source-fact mismatch', () => {
    const base = snapshot(
      tenGodChart('비견', '겁재', '정관'),
      '3',
    );
    const unresolved: CanonicalSajuSnapshot = {
      ...base,
      derivedFacts: {
        ...base.derivedFacts,
        tenGods: unavailable('synthetic-unresolved'),
      },
    };

    expect(
      buildSharedNatalSingleFactGyeopjaeBijieSupportResearchEvidence(
        unresolved,
        {
          sourceFactRef: 'derivedFacts.tenGods.month.stem',
          fact: resolved('겁재'),
        },
      ),
    ).toEqual({
      status: 'unavailable',
      reasonCode:
        'single-canonical-ten-god-binding-ten-god-chart-unresolved',
    });

    expect(
      buildSharedNatalSingleFactGyeopjaeBijieSupportResearchEvidence(
        base,
        {
          sourceFactRef: 'derivedFacts.tenGods.month.stem',
          fact: resolved('비견'),
        },
      ),
    ).toEqual({
      status: 'unavailable',
      reasonCode:
        'single-canonical-ten-god-binding-supplied-fact-mismatch',
    });
  });

  test('runtime validation rejects authority widening', () => {
    const base = snapshot(
      tenGodChart('비견', '겁재', '정관'),
      '4',
    );
    const original = evidence(
      base,
      'derivedFacts.tenGods.month.stem',
    );

    expect(runtimeRegistry().validate(original, base).status).toBe(
      'validated',
    );

    const widenedPayload = {
      ...original.payload,
      constraints: {
        ...original.payload.constraints,
        wholeChartJiecaiScanAuthorized: true,
      },
    };
    const widened = createResearchEvidenceEnvelope(
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      base,
      widenedPayload,
    );
    const validation =
      validateSharedNatalSingleFactGyeopjaeBijieSupportResearchEvidence(
        widened,
        base,
      );

    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain(
      'single_fact_gyeopjae_bijie_support_payload_authority_widened',
    );
    expect(validation.errors).toContain(
      'single_fact_gyeopjae_bijie_support_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test('pins R12 boundaries and rejects Production selection', () => {
    expect(
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULES,
    ).toHaveLength(1);
    expect(
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION,
    ).toMatchObject({
      claimType:
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE,
      scope: 'natal',
      exclusiveValue: true,
      scenarioSensitive: true,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T2'],
    });
    expect(
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA
        .root,
    ).toMatchObject({
      kind: 'object',
      additionalProperties: false,
    });
    expect(
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY,
    ).toMatchObject({
      runtimeScope: 'isolated_research_pack_only',
      exactR12EvidenceBindingRequired: true,
      callerSuppliedSingleFactBindingRequired: true,
      callerSuppliedSourceFactRefRequired: true,
      internalPillarSelectionAuthorized: false,
      sourceFactRefSemanticWeightAuthorized: false,
      wholeChartJiecaiScanAuthorized: false,
      wholeChartJiecaiCountAuthorized: false,
      branchTenGodScanAuthorized: false,
      hiddenStemTenGodScanAuthorized: false,
      canonicalTenGodRecomputationAuthorized: false,
      resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false,
      bijianJiecaiAggregationAuthorized: false,
      completeBijieCollectionAuthorized: false,
      bijieYinshouAggregationAuthorized: false,
      tonggenSupportCompositionAuthorized: false,
      constituentCollectionComplete: false,
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

    const productionPack = {
      ...SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_PACK,
      packId:
        'PACK-SAJU-R12-SINGLE-FACT-GYEOPJAE-BIJIE-SUPPORT-PRODUCTION-FORBIDDEN',
      status: 'production' as const,
    };

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules:
            SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULES,
          methodologies: [
            SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY,
          ],
          sources: [
            SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_SOURCE,
          ],
          claimTypeDefinitions: [
            SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-04T13:21:00.000Z',
      ),
    ).toThrow(RegistryConfigurationError);

    try {
      createRuleRegistrySnapshot(
        {
          rules:
            SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULES,
          methodologies: [
            SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY,
          ],
          sources: [
            SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_SOURCE,
          ],
          claimTypeDefinitions: [
            SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-04T13:21:00.000Z',
      );
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });
});
