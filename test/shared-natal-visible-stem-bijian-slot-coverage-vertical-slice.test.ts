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
  evaluateVisibleStemCanonicalBijianSlotCoverage,
  GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY,
} from '../src/research/general-natal-visible-stem-canonical-bijian-slot-coverage-authority.js';
import {
  buildSharedNatalVisibleStemBijianSlotCoverageResearchEvidence,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  validateSharedNatalVisibleStemBijianSlotCoverageResearchEvidence,
} from '../src/research/shared-natal-visible-stem-bijian-slot-coverage-research-evidence-adapter.js';
import {
  createSharedNatalVisibleStemBijianSlotCoverageResearchRegistry,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_AUTHORITY_BOUNDARY,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE_SCHEMA,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_PACK,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULES,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_SOURCE,
} from '../src/research/shared-natal-visible-stem-bijian-slot-coverage-structural-claim.js';

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
    snapshotId: `saju_synthetic_r17_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-10-05T09:30:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/saju-r17-visible-stem-bijian-slot-coverage',
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
        id: 'synthetic/saju-r17-visible-stem-bijian-slot-coverage',
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
    buildSharedNatalVisibleStemBijianSlotCoverageResearchEvidence(base);
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}

function runtimeRegistry() {
  return createResearchEvidenceRuntimeRegistry([
    SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
}

function run(base: CanonicalSajuSnapshot) {
  const envelope = evidence(base);
  const registry =
    createSharedNatalVisibleStemBijianSlotCoverageResearchRegistry(
      '2026-10-05T09:31:00.000Z',
    );
  const result = runInterpretation(base, registry, {
    researchEvidence: {
      runtimeRegistry: runtimeRegistry(),
      envelopes: [envelope],
    },
    now: new Date('2026-10-05T09:32:00.000Z'),
  });
  return { envelope, registry, result };
}

describe('SAJU-R17 visible-stem Bijian slot coverage vertical slice', () => {
  test.each([
    [tenGodChart('정재', '정관', '편인'), 0],
    [tenGodChart('비견', '정관', '편인'), 1],
    [tenGodChart('비견', '비견', '편인'), 2],
    [tenGodChart('비견', '비견', '비견'), 3],
  ] as const)(
    'preserves exact Bijian slot identity with %s positive slots while keeping R7 count upstream-only',
    (chart, expectedPositiveSlots) => {
      const base = snapshot(chart, String(expectedPositiveSlots || 'z'));
      const { envelope, registry, result } = run(base);

      expect(verifyResolvedRegistryContentIntegrity(registry)).toEqual([]);
      expect(result.integrity).toEqual({ valid: true, errors: [] });
      expect(result.run.status).toBe('completed');

      const slots = envelope.payload.slots;
      const positiveSlots = [slots.year, slots.month, slots.hour].filter(
        (slot) => slot.exactBijianObserved,
      ).length;
      expect(positiveSlots).toBe(expectedPositiveSlots);
      expect(envelope.payload.r7BoundedCountParityVerified).toBe(true);
      expect(envelope.payload.visibleStemBijianObserved).toBe(
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
            subcategory: 'visible_stem_bijian_slot_coverage',
          },
          claimType:
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE,
          subject: 'day_master',
          predicate: 'visible_stem_bijian_slot_coverage_observed',
          value:
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE,
          researchEvidenceRefs: [envelope.envelopeId],
        });
      }

      expect(
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE
          .r7BoundedCount,
      ).toBe('preserved_upstream_only');
      expect(
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE
          .newBijianCountSemantics,
      ).toBe('not_authorized');
    },
  );

  test('preserves year/month/hour source slot identity and exact Bijian observation only', () => {
    const envelope = evidence(
      snapshot(tenGodChart('비견', '겁재', '정관'), 'slot'),
    );

    expect(envelope.payload.slots.year).toMatchObject({
      slot: 'year',
      sourceFactRef: 'derivedFacts.tenGods.year.stem',
      canonicalTenGod: '비견',
      exactBijianObserved: true,
      authority: 'research_only',
    });
    expect(envelope.payload.slots.month).toMatchObject({
      slot: 'month',
      sourceFactRef: 'derivedFacts.tenGods.month.stem',
      canonicalTenGod: '겁재',
      exactBijianObserved: false,
      authority: 'research_only',
    });
    expect(envelope.payload.slots.hour.sourceFactRef).toBe(
      'derivedFacts.tenGods.hour.stem',
    );
    expect(
      envelope.payload.constraints
        .resolvedOtherTenGodUniversalNonBijieVerdictAuthorized,
    ).toBe(false);
    expect(
      envelope.payload.constraints.perSlotSupportConstituentAuthorized,
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
      buildSharedNatalVisibleStemBijianSlotCoverageResearchEvidence(
        unresolved,
      ),
    ).toEqual({
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-coverage-visible-stem-facts-unresolved',
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
      buildSharedNatalVisibleStemBijianSlotCoverageResearchEvidence(
        dayMismatch,
      ),
    ).toEqual({
      status: 'unavailable',
      reasonCode:
        'visible-stem-bijian-slot-coverage-day-stem-semantic-mismatch',
    });
  });

  test('ignores branch Ten-God data', () => {
    const withoutBranches = snapshot(
      tenGodChart('비견', '겁재', '정관', false),
      'branch-a',
    );
    const withBranches = snapshot(
      tenGodChart('비견', '겁재', '정관', true),
      'branch-b',
    );

    const a = evaluateVisibleStemCanonicalBijianSlotCoverage(
      withoutBranches.derivedFacts.tenGods,
    );
    const b = evaluateVisibleStemCanonicalBijianSlotCoverage(
      withBranches.derivedFacts.tenGods,
    );

    expect(a.state).toBe('visible_stem_bijian_slot_coverage_resolved');
    expect(b.state).toBe('visible_stem_bijian_slot_coverage_resolved');

    if (a.slots === null || b.slots === null) {
      throw new Error('expected resolved slot evaluations');
    }

    expect({
      year: a.slots.year.exactBijianObserved,
      month: a.slots.month.exactBijianObserved,
      hour: a.slots.hour.exactBijianObserved,
    }).toEqual({
      year: b.slots.year.exactBijianObserved,
      month: b.slots.month.exactBijianObserved,
      hour: b.slots.hour.exactBijianObserved,
    });

    expect(
      GENERAL_NATAL_VISIBLE_STEM_CANONICAL_BIJIAN_SLOT_COVERAGE_AUTHORITY
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
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
      base,
      widenedPayload,
    );
    const validation =
      validateSharedNatalVisibleStemBijianSlotCoverageResearchEvidence(
        widened,
        base,
      );

    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain(
      'visible_stem_bijian_slot_coverage_payload_authority_widened',
    );
    expect(validation.errors).toContain(
      'visible_stem_bijian_slot_coverage_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test('pins R17 boundaries and rejects Production selection', () => {
    expect(
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULES,
    ).toHaveLength(1);
    expect(
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE_DEFINITION,
    ).toMatchObject({
      claimType:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE,
      scope: 'natal',
      exclusiveValue: true,
      scenarioSensitive: true,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T2'],
    });
    expect(
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE_SCHEMA.root,
    ).toMatchObject({
      kind: 'object',
      additionalProperties: false,
    });
    expect(
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_AUTHORITY_BOUNDARY,
    ).toMatchObject({
      runtimeScope: 'isolated_research_pack_only',
      exactR17EvidenceBindingRequired: true,
      fixedVisibleStemCoverageAuthorizedResearchOnly: true,
      sourceSlotIdentityPreserved: true,
      visibleStemBijianPresenceAuthorized: true,
      r7BoundedCountParityRequired: true,
      r7BoundedCountReinterpreted: false,
      newBijianCountSemanticsAuthorized: false,
      perSlotSupportConstituentAuthorized: false,
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
      ...SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_PACK,
      packId:
        'PACK-SAJU-R17-VISIBLE-STEM-BIJIAN-SLOT-COVERAGE-PRODUCTION-FORBIDDEN',
      status: 'production' as const,
    };

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules:
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULES,
          methodologies: [
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY,
          ],
          sources: [
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_SOURCE,
          ],
          claimTypeDefinitions: [
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-05T09:31:00.000Z',
      ),
    ).toThrow(RegistryConfigurationError);

    try {
      createRuleRegistrySnapshot(
        {
          rules:
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULES,
          methodologies: [
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY,
          ],
          sources: [
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_SOURCE,
          ],
          claimTypeDefinitions: [
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-05T09:31:00.000Z',
      );
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });
});
