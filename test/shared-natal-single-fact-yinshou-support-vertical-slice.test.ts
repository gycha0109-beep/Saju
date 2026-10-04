import { describe, expect, test } from 'vitest';
import { ambiguous, resolved, unavailable } from '../src/contracts/common.js';
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
  buildSharedNatalSingleFactYinshouSupportResearchEvidence,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  validateSharedNatalSingleFactYinshouSupportResearchEvidence,
} from '../src/research/shared-natal-single-fact-yinshou-support-research-evidence-adapter.js';
import {
  createSharedNatalSingleFactYinshouSupportResearchRegistry,
  SHARED_NATAL_SINGLE_FACT_JEONGIN_YINSHOU_SUPPORT_CLAIM_VALUE,
  SHARED_NATAL_SINGLE_FACT_PYEONIN_YINSHOU_SUPPORT_CLAIM_VALUE,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE_DEFINITION,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_VALUE_SCHEMA,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_PACK,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULES,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_SOURCE,
} from '../src/research/shared-natal-single-fact-yinshou-support-structural-claim.js';

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
    snapshotId: `saju_synthetic_r9_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-10-04T03:25:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/saju-r9-single-fact-yinshou',
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
      policy: {
        id: 'synthetic/saju-r9-single-fact-yinshou',
        version: '1',
      },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

function evidence(
  base: CanonicalSajuSnapshot,
  slot: 'year' | 'month' | 'hour',
) {
  const built =
    buildSharedNatalSingleFactYinshouSupportResearchEvidence(base, slot);
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}

function runtimeRegistry() {
  return createResearchEvidenceRuntimeRegistry([
    SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
}

describe('SAJU-R9 single-fact Yinshou support constituent vertical slice', () => {
  test.each([
    ['정인', '正印'],
    ['편인', '偏印'],
  ] as const)(
    'materializes selected resolved %s as exactly one 印綬 support constituent',
    (canonical, sourceLabel) => {
      const base = snapshot(
        tenGodChart('비견', canonical, '정관'),
        canonical === '정인' ? '1' : '2',
      );
      const envelope = evidence(base, 'month');

      expect(envelope.payload.selectedPillarSlot).toBe('month');
      expect(envelope.payload.selectedCanonicalTenGod).toBe(canonical);
      expect(envelope.payload.membershipEvaluation).toMatchObject({
        state: 'yinshou_source_category_member_observed',
        canonicalLabel: canonical,
        sourceLabel,
        sourceCategory: '印綬',
        membershipObserved: true,
        authority: 'research_only',
      });
      expect(envelope.payload.supportEvaluation).toMatchObject({
        state: 'yinshou_support_constituent_observed',
        canonicalConstituent: canonical,
        sourceMemberLabel: sourceLabel,
        sourceSupportCategory: '印綬',
        supportConstituentObserved: true,
        dangZhongEstablished: false,
        zhuGuaEstablished: false,
        qiangRuoEstablished: false,
        authority: 'research_only',
      });
      expect(envelope.payload.constraints.internalPillarSelectionAuthorized).toBe(
        false,
      );
      expect(
        envelope.payload.constraints.selectedPositionSemanticWeightAuthorized,
      ).toBe(false);
    },
  );

  test('does not scan another pillar when the caller-selected fact is outside Yinshou scope', () => {
    const base = snapshot(
      tenGodChart('비견', '정인', '정관'),
      '3',
    );
    const envelope = evidence(base, 'year');

    expect(envelope.payload.selectedCanonicalTenGod).toBe('비견');
    expect(envelope.payload.membershipEvaluation.state).toBe(
      'resolved_outside_authorized_yin_label_scope',
    );
    expect(envelope.payload.supportConstituentObserved).toBe(false);
    expect(envelope.payload.constraints.wholeChartYinScanAuthorized).toBe(false);
    expect(
      envelope.payload.constraints
        .resolvedOtherTenGodUniversalNonYinshouVerdictAuthorized,
    ).toBe(false);
  });

  test('fails closed when outer Ten-God chart or selected fact is unresolved', () => {
    const base = snapshot(
      tenGodChart('비견', '정인', '정관'),
      '4',
    );

    const outerUnavailable: CanonicalSajuSnapshot = {
      ...base,
      derivedFacts: {
        ...base.derivedFacts,
        tenGods: unavailable('synthetic-unresolved'),
      },
    };
    expect(
      buildSharedNatalSingleFactYinshouSupportResearchEvidence(
        outerUnavailable,
        'month',
      ),
    ).toEqual({
      status: 'unavailable',
      reasonCode: 'single-fact-yinshou-support-ten-god-chart-unresolved',
    });

    const chart = tenGodChart('비견', '정인', '정관');
    const selectedAmbiguous: CanonicalSajuSnapshot = {
      ...base,
      derivedFacts: {
        ...base.derivedFacts,
        tenGods: resolved({
          ...chart,
          month: {
            stem: ambiguous(
              [
                {
                  candidateId: 'ten-god:jeongin',
                  value: '정인',
                  reasonRefs: ['synthetic'],
                },
                {
                  candidateId: 'ten-god:pyeonin',
                  value: '편인',
                  reasonRefs: ['synthetic'],
                },
              ],
              ['synthetic'],
            ),
          },
        }),
      },
    };
    expect(
      buildSharedNatalSingleFactYinshouSupportResearchEvidence(
        selectedAmbiguous,
        'month',
      ),
    ).toEqual({
      status: 'unavailable',
      reasonCode:
        'single-fact-yinshou-support-selected-visible-stem-fact-unresolved',
    });
  });

  test('validates through generic runtime registry and rejects authority widening', () => {
    const base = snapshot(
      tenGodChart('비견', '정인', '정관'),
      '5',
    );
    const original = evidence(base, 'month');

    expect(runtimeRegistry().validate(original, base).status).toBe('validated');

    const widenedPayload = {
      ...original.payload,
      constraints: {
        ...original.payload.constraints,
        wholeChartYinScanAuthorized: true,
      },
    };
    const widened = createResearchEvidenceEnvelope(
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      base,
      widenedPayload,
    );
    const validation =
      validateSharedNatalSingleFactYinshouSupportResearchEvidence(
        widened,
        base,
      );

    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain(
      'single_fact_yinshou_support_payload_authority_widened',
    );
    expect(validation.errors).toContain(
      'single_fact_yinshou_support_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test.each([
    [
      '정인',
      SHARED_NATAL_SINGLE_FACT_JEONGIN_YINSHOU_SUPPORT_CLAIM_VALUE,
    ],
    [
      '편인',
      SHARED_NATAL_SINGLE_FACT_PYEONIN_YINSHOU_SUPPORT_CLAIM_VALUE,
    ],
  ] as const)(
    'materializes exactly one registered T2 claim for %s without selected-position semantics',
    (canonical, expectedValue) => {
      const base = snapshot(
        tenGodChart('비견', canonical, '정관'),
        canonical === '정인' ? '6' : '7',
      );
      const envelope = evidence(base, 'month');
      const registry =
        createSharedNatalSingleFactYinshouSupportResearchRegistry(
          '2026-10-04T03:26:00.000Z',
        );

      expect(verifyResolvedRegistryContentIntegrity(registry)).toEqual([]);

      const result = runInterpretation(base, registry, {
        researchEvidence: {
          runtimeRegistry: runtimeRegistry(),
          envelopes: [envelope],
        },
        now: new Date('2026-10-04T03:27:00.000Z'),
      });

      expect(result.integrity).toEqual({ valid: true, errors: [] });
      expect(result.run.status).toBe('completed');
      expect(result.evaluations.filter((evaluation) => evaluation.status === 'matched')).toHaveLength(1);
      expect(result.claims).toHaveLength(1);
      expect(result.claims[0]).toMatchObject({
        taxonomy: {
          tier: 'T2',
          category: 'day_master_strength',
          subcategory: 'single_fact_yinshou_support_constituent',
        },
        claimType: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE,
        subject: 'day_master',
        predicate: 'single_fact_yinshou_support_constituent_observed',
        value: expectedValue,
        researchEvidenceRefs: [envelope.envelopeId],
      });
      expect(
        Object.prototype.hasOwnProperty.call(
          result.claims[0]?.value,
          'selectedPillarSlot',
        ),
      ).toBe(false);
    },
  );

  test('resolved non-Yin selected fact emits no inverse claim and missing evidence fails closed', () => {
    const base = snapshot(
      tenGodChart('비견', '정재', '정관'),
      '8',
    );
    const envelope = evidence(base, 'month');
    const registry =
      createSharedNatalSingleFactYinshouSupportResearchRegistry(
        '2026-10-04T03:26:00.000Z',
      );

    const nonMatch = runInterpretation(base, registry, {
      researchEvidence: {
        runtimeRegistry: runtimeRegistry(),
        envelopes: [envelope],
      },
      now: new Date('2026-10-04T03:27:00.000Z'),
    });
    expect(nonMatch.run.status).toBe('completed');
    expect(nonMatch.evaluations.every((evaluation) => evaluation.status === 'not_matched')).toBe(true);
    expect(nonMatch.claims).toEqual([]);

    const missing = runInterpretation(base, registry, {
      now: new Date('2026-10-04T03:27:00.000Z'),
    });
    expect(missing.run.status).toBe('partial');
    expect(
      missing.evaluations.every(
        (evaluation) => evaluation.status === 'skipped_missing_input',
      ),
    ).toBe(true);
    expect(missing.claims).toEqual([]);
  });

  test('pins single-fact boundaries and rejects Production selection', () => {
    expect(SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULES).toHaveLength(2);
    expect(
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE_DEFINITION,
    ).toMatchObject({
      claimType: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE,
      scope: 'natal',
      exclusiveValue: true,
      scenarioSensitive: true,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T2'],
    });
    expect(
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_VALUE_SCHEMA.root,
    ).toMatchObject({
      kind: 'object',
      additionalProperties: false,
    });
    expect(
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY,
    ).toMatchObject({
      runtimeScope: 'isolated_research_pack_only',
      exactR9EvidenceBindingRequired: true,
      callerSuppliedSingleFactBindingRequired: true,
      internalPillarSelectionAuthorized: false,
      selectedPositionSemanticWeightAuthorized: false,
      wholeChartYinScanAuthorized: false,
      wholeChartYinCountAuthorized: false,
      branchTenGodScanAuthorized: false,
      hiddenStemTenGodScanAuthorized: false,
      canonicalTenGodRecomputationAuthorized: false,
      resolvedOtherTenGodUniversalNonYinshouVerdictAuthorized: false,
      bijieYinshouAggregationAuthorized: false,
      tonggenYinshouCompositionAuthorized: false,
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
      ...SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_PACK,
      packId: 'PACK-SAJU-R9-SINGLE-FACT-YINSHOU-SUPPORT-PRODUCTION-FORBIDDEN',
      status: 'production' as const,
    };

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULES,
          methodologies: [
            SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY,
          ],
          sources: [SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_SOURCE],
          claimTypeDefinitions: [
            SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-04T03:26:00.000Z',
      ),
    ).toThrow(RegistryConfigurationError);

    try {
      createRuleRegistrySnapshot(
        {
          rules: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULES,
          methodologies: [
            SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY,
          ],
          sources: [SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_SOURCE],
          claimTypeDefinitions: [
            SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-04T03:26:00.000Z',
      );
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });
});
