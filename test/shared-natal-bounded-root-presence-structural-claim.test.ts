import { describe, expect, test } from 'vitest';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
  YinYang,
} from '../src/contracts/calculation.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import {
  createRuleRegistrySnapshot,
  RegistryConfigurationError,
  verifyResolvedRegistryContentIntegrity,
} from '../src/interpretation/rule-registry.js';
import {
  buildSharedNatalBoundedRootResearchEvidence,
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-bounded-root-research-evidence-adapter.js';
import {
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION_REF,
  SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT,
} from '../src/research/shared-natal-bounded-root-research-consumer-input-contract.js';
import {
  createSharedNatalBoundedRootPresenceResearchRegistry,
  SHARED_NATAL_BOUNDED_ROOT_PRESENCE_AUTHORITY_BOUNDARY,
  SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE,
  SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE_DEFINITION,
  SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_VALUE,
  SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_VALUE_SCHEMA,
  SHARED_NATAL_BOUNDED_ROOT_PRESENCE_METHODOLOGY,
  SHARED_NATAL_BOUNDED_ROOT_PRESENCE_PACK,
  SHARED_NATAL_BOUNDED_ROOT_PRESENCE_RULE,
  SHARED_NATAL_BOUNDED_ROOT_PRESENCE_SOURCE,
} from '../src/research/shared-natal-bounded-root-presence-structural-claim.js';

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

function snapshot(rootPositive: boolean, suffix: string): CanonicalSajuSnapshot {
  const branches = rootPositive
    ? { year: '묘', month: '해', day: '인', hour: '진' } as const
    : { year: '축', month: '사', day: '오', hour: '유' } as const;

  return {
    snapshotId: `saju_synthetic_r4_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-10-03T02:30:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/saju-r4-root-claim',
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
      year: { status: 'resolved', value: pillar('병', branches.year) },
      month: { status: 'resolved', value: pillar('정', branches.month) },
      day: { status: 'resolved', value: pillar('갑', branches.day) },
      hour: { status: 'resolved', value: pillar('경', branches.hour) },
    },
    derivedFacts: {
      dayMaster: { status: 'resolved', value: { value: '갑', ...STEM_META.갑 } },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
    },
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    scenarios: [],
    completeness: {
      birthTimeKnown: true,
      fullyResolved: false,
      resolvedPaths: ['pillars.year', 'pillars.month', 'pillars.day', 'pillars.hour'],
      ambiguousPaths: [],
      unavailablePaths: [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/saju-r4-root-claim', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

function evidence(base: CanonicalSajuSnapshot) {
  const built = buildSharedNatalBoundedRootResearchEvidence(base);
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}

function runtimeRegistry() {
  return createResearchEvidenceRuntimeRegistry([
    SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
}

describe('SAJU-R4 bounded positive root-presence structural claim', () => {
  test('pins exact R3 input identity and keeps every stronger semantic authority closed', () => {
    expect(SHARED_NATAL_BOUNDED_ROOT_PRESENCE_RULE.inputs).toEqual([
      SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT,
    ]);
    expect(SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT).toMatchObject({
      source: 'research_evidence',
      pathOrClaimType: 'SHARED_NATAL_BOUNDED_POSITIVE_ROOT_EVIDENCE',
      required: true,
      researchEvidenceDefinitionRef:
        SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION_REF,
    });
    expect(SHARED_NATAL_BOUNDED_ROOT_PRESENCE_AUTHORITY_BOUNDARY).toEqual({
      runtimeScope: 'isolated_research_pack_only',
      exactR3EvidenceBindingRequired: true,
      positiveObservationOnly: true,
      negativeRootClaimAuthorized: false,
      canonicalSizhuHasRootSettlementAuthorized: false,
      noRootInferenceAuthorized: false,
      observationCountSemanticsAuthorized: false,
      positionWeightingAuthorized: false,
      directRootToTonggenSupportConstituentAuthorized: false,
      dangZhongSettlementAuthorized: false,
      zhuGuaSettlementAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      wangShuaiClassificationAuthorized: false,
      gyeokgukDerivationAuthorized: false,
      numericStrengthAuthorized: false,
      narrativeMaterialityAuthorized: false,
      defaultRuntimeRouteChanged: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionPackAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      production: 'HOLD',
    });
  });

  test('materializes one T2 claim only for exact validated positive root evidence', () => {
    const base = snapshot(true, 'a');
    const envelope = evidence(base);
    expect(envelope.payload.evaluation.rootPresenceObserved).toBe(true);

    const registry = createSharedNatalBoundedRootPresenceResearchRegistry(
      '2026-10-03T02:31:00.000Z',
    );
    expect(verifyResolvedRegistryContentIntegrity(registry)).toEqual([]);

    const result = runInterpretation(base, registry, {
      researchEvidence: {
        runtimeRegistry: runtimeRegistry(),
        envelopes: [envelope],
      },
      now: new Date('2026-10-03T02:32:00.000Z'),
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
        subcategory: 'bounded_root_presence_observation',
      },
      claimType: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'bounded_positive_root_presence_observed',
      value: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_VALUE,
      polarity: 'neutral',
      factRefs: [],
      upstreamClaimRefs: [],
      researchEvidenceRefs: [envelope.envelopeId],
    });
    expect(result.claims[0]?.sourceRefs).toEqual([
      SHARED_NATAL_BOUNDED_ROOT_PRESENCE_SOURCE.sourceId,
    ]);
  });

  test('valid no-positive-evidence envelope emits no inverse or no-root claim', () => {
    const base = snapshot(false, 'b');
    const envelope = evidence(base);

    expect(envelope.payload.evaluation.rootPresenceObserved).toBe(false);
    expect(envelope.payload.evaluation.absenceMeansNoRoot).toBe(false);
    expect(envelope.payload.evaluation.sizhuHasRootSettled).toBe(false);

    const result = runInterpretation(
      base,
      createSharedNatalBoundedRootPresenceResearchRegistry(
        '2026-10-03T02:31:00.000Z',
      ),
      {
        researchEvidence: {
          runtimeRegistry: runtimeRegistry(),
          envelopes: [envelope],
        },
        now: new Date('2026-10-03T02:32:00.000Z'),
      },
    );

    expect(result.run.status).toBe('completed');
    expect(result.evaluations[0]?.status).toBe('not_matched');
    expect(result.claims).toEqual([]);
  });

  test('missing required R2 evidence fails closed instead of falling back to chart facts', () => {
    const base = snapshot(true, 'c');
    const result = runInterpretation(
      base,
      createSharedNatalBoundedRootPresenceResearchRegistry(
        '2026-10-03T02:31:00.000Z',
      ),
      { now: new Date('2026-10-03T02:32:00.000Z') },
    );

    expect(result.run.status).toBe('partial');
    expect(result.evaluations[0]?.status).toBe('skipped_missing_input');
    expect(result.claims).toEqual([]);
  });

  test('registered claim contract is exact and non-narrative', () => {
    expect(SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE_DEFINITION).toMatchObject({
      claimType: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE,
      scope: 'natal',
      exclusiveValue: true,
      scenarioSensitive: true,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T2'],
    });
    expect(SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_VALUE_SCHEMA.root).toMatchObject({
      kind: 'object',
      additionalProperties: false,
    });
    expect(SHARED_NATAL_BOUNDED_ROOT_PRESENCE_PACK).toMatchObject({
      claimContractMode: 'registered_required',
      status: 'research',
    });
  });

  test('production pack cannot select the R4 rule because it consumes research-only evidence', () => {
    const productionPack = {
      ...SHARED_NATAL_BOUNDED_ROOT_PRESENCE_PACK,
      packId: 'PACK-SAJU-R4-BOUNDED-ROOT-PRESENCE-PRODUCTION-FORBIDDEN',
      status: 'production' as const,
    };

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_RULE],
          methodologies: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_METHODOLOGY],
          sources: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_SOURCE],
          claimTypeDefinitions: [
            SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-03T02:31:00.000Z',
      ),
    ).toThrow(RegistryConfigurationError);

    try {
      createRuleRegistrySnapshot(
        {
          rules: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_RULE],
          methodologies: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_METHODOLOGY],
          sources: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_SOURCE],
          claimTypeDefinitions: [
            SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-03T02:31:00.000Z',
      );
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });
});
