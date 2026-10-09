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
  evaluateVisibleStemCanonicalGyeopjaeCoverage,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY,
} from '../src/research/general-natal-visible-stem-canonical-gyeopjae-coverage-authority.js';
import {
  buildSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidence,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  validateSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidence,
} from '../src/research/shared-natal-visible-stem-gyeopjae-bijie-support-coverage-research-evidence-adapter.js';
import {
  createSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchRegistry,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_AUTHORITY_BOUNDARY,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE_SCHEMA,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_PACK,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULES,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_SOURCE,
} from '../src/research/shared-natal-visible-stem-gyeopjae-bijie-support-coverage-structural-claim.js';

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
  branchGyeopjae = false,
): TenGodChartFact {
  return {
    year: {
      stem: resolved(year),
      ...(branchGyeopjae ? { branch: resolved('겁재') } : {}),
    },
    month: {
      stem: resolved(month),
      ...(branchGyeopjae ? { branch: resolved('겁재') } : {}),
    },
    day: {
      stem: resolved('일간'),
      ...(branchGyeopjae ? { branch: resolved('겁재') } : {}),
    },
    hour: {
      stem: resolved(hour),
      ...(branchGyeopjae ? { branch: resolved('겁재') } : {}),
    },
  };
}

function snapshot(
  tenGods: TenGodChartFact,
  suffix: string,
): CanonicalSajuSnapshot {
  return {
    snapshotId: `saju_synthetic_r15_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-10-05T06:40:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/saju-r15-visible-stem-gyeopjae',
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
        id: 'synthetic/saju-r15-visible-stem-gyeopjae',
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
    buildSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidence(
      base,
    );
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}

function runtimeRegistry() {
  return createResearchEvidenceRuntimeRegistry([
    SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
}

function run(base: CanonicalSajuSnapshot) {
  const envelope = evidence(base);
  const registry =
    createSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchRegistry(
      '2026-10-05T06:41:00.000Z',
    );
  const result = runInterpretation(base, registry, {
    researchEvidence: {
      runtimeRegistry: runtimeRegistry(),
      envelopes: [envelope],
    },
    now: new Date('2026-10-05T06:42:00.000Z'),
  });
  return { envelope, registry, result };
}

describe('SAJU-R15 visible-stem Gyeopjae Bijie support coverage vertical slice', () => {
  test.each([
    [tenGodChart('비견', '정재', '정관'), 0],
    [tenGodChart('겁재', '정재', '정관'), 1],
    [tenGodChart('겁재', '겁재', '정관'), 2],
    [tenGodChart('겁재', '겁재', '겁재'), 3],
  ] as const)(
    'materializes fixed visible-stem coverage with %s positive presence slots without emitting count semantics',
    (chart, expectedPositiveSlots) => {
      const base = snapshot(chart, String(expectedPositiveSlots || 'z'));
      const { envelope, registry, result } = run(base);

      expect(verifyResolvedRegistryContentIntegrity(registry)).toEqual([]);
      expect(result.integrity).toEqual({ valid: true, errors: [] });
      expect(result.run.status).toBe('completed');

      const slots = envelope.payload.slots;
      const positiveSlots = [slots.year, slots.month, slots.hour].filter(
        (slot) => slot.supportConstituentObserved,
      ).length;
      expect(positiveSlots).toBe(expectedPositiveSlots);
      expect(envelope.payload.visibleStemGyeopjaeSupportObserved).toBe(
        expectedPositiveSlots > 0,
      );

      if (expectedPositiveSlots === 0) {
        expect(result.claims).toEqual([]);
      } else {
        expect(result.claims).toHaveLength(1);
        expect(result.claims[0]).toMatchObject({
          taxonomy: {
            tier: 'T2',
            category: 'day_master_strength',
            subcategory: 'visible_stem_gyeopjae_bijie_support_coverage',
          },
          claimType:
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE,
          subject: 'day_master',
          predicate: 'visible_stem_gyeopjae_bijie_support_observed',
          value:
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE,
          researchEvidenceRefs: [envelope.envelopeId],
        });
      }

      expect(
        Object.prototype.hasOwnProperty.call(
          SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE,
          'slotDetailsRecord',
        ),
      ).toBe(false);
      expect(
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE
          .gyeopjaeCount,
      ).toBe('not_authorized');
    },
  );

  test('preserves year/month/hour slot identity and bounded outside-scope results', () => {
    const envelope = evidence(
      snapshot(tenGodChart('비견', '겁재', '정관'), 'slot'),
    );

    expect(envelope.payload.slots.year).toMatchObject({
      slot: 'year',
      sourceFactRef: 'derivedFacts.tenGods.year.stem',
      canonicalTenGod: '비견',
      membershipEvaluation: {
        state: 'resolved_outside_authorized_gyeopjae_label_scope',
        membershipObserved: false,
      },
      supportConstituentObserved: false,
    });
    expect(envelope.payload.slots.month).toMatchObject({
      slot: 'month',
      sourceFactRef: 'derivedFacts.tenGods.month.stem',
      canonicalTenGod: '겁재',
      membershipEvaluation: {
        state: 'bijie_source_category_member_observed',
        canonicalLabel: '겁재',
        sourceLabel: '劫財',
        sourceCategory: '比劫',
        membershipObserved: true,
      },
      supportEvaluation: {
        state: 'gyeopjae_bijie_support_constituent_observed',
        canonicalConstituent: '겁재',
        sourceMemberLabel: '劫財',
        sourceSupportCategory: '比劫',
        supportConstituentObserved: true,
      },
    });
    expect(envelope.payload.slots.hour.sourceFactRef).toBe(
      'derivedFacts.tenGods.hour.stem',
    );
    expect(
      envelope.payload.constraints
        .resolvedOtherTenGodUniversalNonBijieVerdictAuthorized,
    ).toBe(false);
  });

  test('fails closed when visible stems are unresolved or day self semantics mismatch', () => {
    const base = snapshot(
      tenGodChart('비견', '겁재', '정관'),
      'fail',
    );

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
      buildSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidence(
        unresolved,
      ),
    ).toEqual({
      status: 'unavailable',
      reasonCode:
        'visible-stem-gyeopjae-coverage-visible-stem-facts-unresolved',
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
      buildSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidence(
        dayMismatch,
      ),
    ).toEqual({
      status: 'unavailable',
      reasonCode:
        'visible-stem-gyeopjae-coverage-day-stem-semantic-mismatch',
    });
  });

  test('ignores branch Ten-God data and preserves the same visible-stem result', () => {
    const withoutBranches = snapshot(
      tenGodChart('비견', '겁재', '정관', false),
      'branch-a',
    );
    const withBranches = snapshot(
      tenGodChart('비견', '겁재', '정관', true),
      'branch-b',
    );

    const a = evaluateVisibleStemCanonicalGyeopjaeCoverage(
      withoutBranches.derivedFacts.tenGods,
    );
    const b = evaluateVisibleStemCanonicalGyeopjaeCoverage(
      withBranches.derivedFacts.tenGods,
    );

    expect(a.state).toBe('visible_stem_gyeopjae_coverage_resolved');
    expect(b.state).toBe('visible_stem_gyeopjae_coverage_resolved');

    if (a.slots === null || b.slots === null) {
      throw new Error('expected resolved slot evaluations');
    }

    expect({
      year: a.slots.year.supportConstituentObserved,
      month: a.slots.month.supportConstituentObserved,
      hour: a.slots.hour.supportConstituentObserved,
    }).toEqual({
      year: b.slots.year.supportConstituentObserved,
      month: b.slots.month.supportConstituentObserved,
      hour: b.slots.hour.supportConstituentObserved,
    });
    expect(
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_GYEOPJAE_COVERAGE_AUTHORITY
        .branchTenGodScanAuthorized,
    ).toBe(false);
  });

  test('runtime validation rejects authority widening and non-reproducible payloads', () => {
    const base = snapshot(
      tenGodChart('비견', '겁재', '정관'),
      'validate',
    );
    const original = evidence(base);

    expect(runtimeRegistry().validate(original, base).status).toBe(
      'validated',
    );

    const widenedPayload = {
      ...original.payload,
      constraints: {
        ...original.payload.constraints,
        bijianGyeopjaeUnionAuthorized: true,
      },
    };
    const widened = createResearchEvidenceEnvelope(
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
      base,
      widenedPayload,
    );
    const validation =
      validateSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchEvidence(
        widened,
        base,
      );

    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain(
      'visible_stem_gyeopjae_coverage_payload_authority_widened',
    );
    expect(validation.errors).toContain(
      'visible_stem_gyeopjae_coverage_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test('pins R15 boundaries and rejects Production selection', () => {
    expect(
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULES,
    ).toHaveLength(1);
    expect(
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE_DEFINITION,
    ).toMatchObject({
      claimType:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE,
      scope: 'natal',
      exclusiveValue: true,
      scenarioSensitive: true,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T2'],
    });
    expect(
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE_SCHEMA
        .root,
    ).toMatchObject({
      kind: 'object',
      additionalProperties: false,
    });
    expect(
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_AUTHORITY_BOUNDARY,
    ).toMatchObject({
      runtimeScope: 'isolated_research_pack_only',
      exactR15EvidenceBindingRequired: true,
      fixedVisibleStemCoverageAuthorizedResearchOnly: true,
      sourceSlotIdentityPreserved: true,
      visibleStemGyeopjaePresenceAuthorized: true,
      visibleStemGyeopjaeCountAuthorized: false,
      bijianGyeopjaeUnionAuthorized: false,
      unifiedBijieCountAuthorized: false,
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

    const productionPack = {
      ...SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_PACK,
      packId:
        'PACK-SAJU-R15-VISIBLE-STEM-GYEOPJAE-BIJIE-SUPPORT-COVERAGE-PRODUCTION-FORBIDDEN',
      status: 'production' as const,
    };

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules:
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULES,
          methodologies: [
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY,
          ],
          sources: [
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_SOURCE,
          ],
          claimTypeDefinitions: [
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-05T06:41:00.000Z',
      ),
    ).toThrow(RegistryConfigurationError);

    try {
      createRuleRegistrySnapshot(
        {
          rules:
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULES,
          methodologies: [
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY,
          ],
          sources: [
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_SOURCE,
          ],
          claimTypeDefinitions: [
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-05T06:41:00.000Z',
      );
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });
});

