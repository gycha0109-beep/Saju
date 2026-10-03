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
import { createResearchEvidenceEnvelope } from '../src/interpretation/research-evidence.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import {
  createRuleRegistrySnapshot,
  RegistryConfigurationError,
  verifyResolvedRegistryContentIntegrity,
} from '../src/interpretation/rule-registry.js';
import {
  buildSharedNatalBoundedTonggenResearchEvidence,
} from '../src/research/shared-natal-bounded-tonggen-research-evidence-adapter.js';
import {
  buildSharedNatalBoundedTonggenSupportResearchEvidence,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  validateSharedNatalBoundedTonggenSupportResearchEvidence,
} from '../src/research/shared-natal-bounded-tonggen-support-research-evidence-adapter.js';
import {
  createSharedNatalBoundedTonggenSupportResearchRegistry,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_AUTHORITY_BOUNDARY,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE_DEFINITION,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_VALUE,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_VALUE_SCHEMA,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_PACK,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE_INPUT_REQUIREMENT,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_SOURCES,
} from '../src/research/shared-natal-bounded-tonggen-support-structural-claim.js';

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

function snapshot(
  dayMaster: HeavenlyStem,
  branches: Readonly<{
    year: EarthlyBranch;
    month: EarthlyBranch;
    day: EarthlyBranch;
    hour: EarthlyBranch;
  }>,
  suffix: string,
): CanonicalSajuSnapshot {
  return {
    snapshotId: `saju_synthetic_r6_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-10-03T06:35:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/saju-r6-tonggen-support',
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
      day: { status: 'resolved', value: pillar(dayMaster, branches.day) },
      hour: { status: 'resolved', value: pillar('경', branches.hour) },
    },
    derivedFacts: {
      dayMaster: {
        status: 'resolved',
        value: { value: dayMaster, ...STEM_META[dayMaster] },
      },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
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
      ],
      ambiguousPaths: [],
      unavailablePaths: [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/saju-r6-tonggen-support', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

function supportEnvelope(base: CanonicalSajuSnapshot) {
  const built = buildSharedNatalBoundedTonggenSupportResearchEvidence(base);
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}

function runtimeRegistry() {
  return createResearchEvidenceRuntimeRegistry([
    SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
}

describe('SAJU-R6 bounded 通根扶助 support constituent vertical slice', () => {
  test('replays every R5 Tonggen observation through the exact governed support bridges', () => {
    const withYuqi = snapshot(
      '갑',
      { year: '묘', month: '해', day: '인', hour: '진' },
      'a',
    );
    const withMuku = snapshot(
      '갑',
      { year: '묘', month: '해', day: '인', hour: '미' },
      'b',
    );

    const yuqiTonggen = buildSharedNatalBoundedTonggenResearchEvidence(withYuqi);
    const mukuTonggen = buildSharedNatalBoundedTonggenResearchEvidence(withMuku);
    const yuqiSupport = supportEnvelope(withYuqi);
    const mukuSupport = supportEnvelope(withMuku);

    if (
      yuqiTonggen.status !== 'resolved' ||
      mukuTonggen.status !== 'resolved'
    ) {
      throw new Error('R5 bounded Tonggen evidence unexpectedly unavailable');
    }

    expect(yuqiSupport.payload.upstreamTonggenEvidence).toEqual({
      envelopeId: yuqiTonggen.envelope.envelopeId,
      definitionRef: yuqiTonggen.envelope.definitionRef,
      evidenceType: yuqiTonggen.envelope.evidenceType,
      evidenceVersion: yuqiTonggen.envelope.evidenceVersion,
      payloadHash: yuqiTonggen.envelope.payloadHash,
    });

    expect(yuqiSupport.payload.observations).toEqual([
      {
        pillarSlot: 'year',
        branch: '묘',
        sourceRootKind: '旺',
        upstreamTonggenState: 'bounded_tonggen_observed',
        sourceConstituent: '通根',
        sourceSupportPhrase: '通根扶助',
        supportConstituentObserved: true,
        authority: 'research_only',
      },
      {
        pillarSlot: 'month',
        branch: '해',
        sourceRootKind: '長生',
        upstreamTonggenState: 'bounded_tonggen_observed',
        sourceConstituent: '通根',
        sourceSupportPhrase: '通根扶助',
        supportConstituentObserved: true,
        authority: 'research_only',
      },
      {
        pillarSlot: 'day',
        branch: '인',
        sourceRootKind: '祿',
        upstreamTonggenState: 'bounded_tonggen_observed',
        sourceConstituent: '通根',
        sourceSupportPhrase: '通根扶助',
        supportConstituentObserved: true,
        authority: 'research_only',
      },
      {
        pillarSlot: 'hour',
        branch: '진',
        sourceRootKind: '餘氣',
        upstreamTonggenState: 'bounded_tonggen_observed',
        sourceConstituent: '通根',
        sourceSupportPhrase: '通根扶助',
        supportConstituentObserved: true,
        authority: 'research_only',
      },
    ]);

    expect(
      new Set([
        ...yuqiSupport.payload.observations.map((item) => item.sourceRootKind),
        ...mukuSupport.payload.observations.map((item) => item.sourceRootKind),
      ]),
    ).toEqual(new Set(['旺', '長生', '祿', '墓庫', '餘氣']));

    expect(yuqiSupport.payload.observations).toHaveLength(
      yuqiTonggen.envelope.payload.observations.length,
    );
    expect(mukuSupport.payload.observations).toHaveLength(
      mukuTonggen.envelope.payload.observations.length,
    );
  });

  test('preserves no positive constituent as non-negative and non-aggregated', () => {
    const base = snapshot(
      '갑',
      { year: '축', month: '사', day: '오', hour: '유' },
      'c',
    );
    const envelope = supportEnvelope(base);

    expect(envelope.payload.observations).toEqual([]);
    expect(envelope.payload.supportConstituentObserved).toBe(false);
    expect(envelope.payload.constraints.constituentCollectionComplete).toBe(false);
    expect(
      envelope.payload.constraints.noCurrentConstituentMeansNoSupport,
    ).toBe(false);
    expect(envelope.payload.constraints.supportAggregationAuthorized).toBe(false);
    expect(envelope.payload.constraints.dangZhongSettlementAuthorized).toBe(false);
    expect(envelope.payload.constraints.zhuGuaSettlementAuthorized).toBe(false);
  });

  test('keeps Yin Changsheng outside the governed support surface', () => {
    const base = snapshot(
      '을',
      { year: '오', month: '오', day: '오', hour: '오' },
      'd',
    );
    const envelope = supportEnvelope(base);

    expect(envelope.payload.observations).toEqual([]);
    expect(envelope.payload.supportConstituentObserved).toBe(false);
  });

  test('validates through the generic registry and rejects authority widening', () => {
    const base = snapshot(
      '갑',
      { year: '묘', month: '해', day: '인', hour: '진' },
      'e',
    );
    const original = supportEnvelope(base);

    expect(runtimeRegistry().validate(original, base).status).toBe('validated');

    const widenedPayload = {
      ...original.payload,
      constraints: {
        ...original.payload.constraints,
        supportAggregationAuthorized: true,
      },
    };
    const widened = createResearchEvidenceEnvelope(
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      base,
      widenedPayload,
    );
    const validation =
      validateSharedNatalBoundedTonggenSupportResearchEvidence(widened, base);

    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain(
      'tonggen_support_evidence_payload_authority_widened',
    );
    expect(validation.errors).toContain(
      'tonggen_support_evidence_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test('materializes one registered T2 claim only for positive bounded support evidence', () => {
    const base = snapshot(
      '갑',
      { year: '묘', month: '해', day: '인', hour: '진' },
      'f',
    );
    const envelope = supportEnvelope(base);
    const registry = createSharedNatalBoundedTonggenSupportResearchRegistry(
      '2026-10-03T06:36:00.000Z',
    );

    expect(verifyResolvedRegistryContentIntegrity(registry)).toEqual([]);

    const result = runInterpretation(base, registry, {
      researchEvidence: {
        runtimeRegistry: runtimeRegistry(),
        envelopes: [envelope],
      },
      now: new Date('2026-10-03T06:37:00.000Z'),
    });

    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(result.run.status).toBe('completed');
    expect(result.evaluations).toHaveLength(1);
    expect(result.evaluations[0]?.status).toBe('matched');
    expect(result.evaluations[0]?.inputRefs[0]).toMatchObject({
      sourceType: 'research_evidence',
      idOrPath: envelope.envelopeId,
      definitionRef: envelope.definitionRef,
      evidenceType: envelope.evidenceType,
      evidenceVersion: envelope.evidenceVersion,
      payloadHash: envelope.payloadHash,
    });
    expect(result.claims).toHaveLength(1);
    expect(result.claims[0]).toMatchObject({
      taxonomy: {
        tier: 'T2',
        category: 'day_master_strength',
        subcategory: 'bounded_tonggen_support_constituent',
      },
      claimType: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'bounded_tonggen_support_constituent_observed',
      value: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_VALUE,
      polarity: 'neutral',
      factRefs: [],
      upstreamClaimRefs: [],
      researchEvidenceRefs: [envelope.envelopeId],
    });
  });

  test('valid no-positive envelope emits no inverse claim and missing evidence fails closed', () => {
    const base = snapshot(
      '갑',
      { year: '축', month: '사', day: '오', hour: '유' },
      '1',
    );
    const envelope = supportEnvelope(base);
    const registry = createSharedNatalBoundedTonggenSupportResearchRegistry(
      '2026-10-03T06:36:00.000Z',
    );

    const noPositive = runInterpretation(base, registry, {
      researchEvidence: {
        runtimeRegistry: runtimeRegistry(),
        envelopes: [envelope],
      },
      now: new Date('2026-10-03T06:37:00.000Z'),
    });
    expect(noPositive.run.status).toBe('completed');
    expect(noPositive.evaluations[0]?.status).toBe('not_matched');
    expect(noPositive.claims).toEqual([]);

    const missing = runInterpretation(base, registry, {
      now: new Date('2026-10-03T06:37:00.000Z'),
    });
    expect(missing.run.status).toBe('partial');
    expect(missing.evaluations[0]?.status).toBe('skipped_missing_input');
    expect(missing.claims).toEqual([]);
  });

  test('pins the incomplete non-aggregating boundary and rejects Production selection', () => {
    expect(SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE.inputs).toEqual([
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE_INPUT_REQUIREMENT,
    ]);
    expect(
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE_DEFINITION,
    ).toMatchObject({
      claimType: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE,
      scope: 'natal',
      exclusiveValue: true,
      scenarioSensitive: true,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T2'],
    });
    expect(
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_VALUE_SCHEMA.root,
    ).toMatchObject({
      kind: 'object',
      additionalProperties: false,
    });
    expect(SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_AUTHORITY_BOUNDARY).toMatchObject({
      runtimeScope: 'isolated_research_pack_only',
      exactR6EvidenceBindingRequired: true,
      exactR5TonggenParityRequired: true,
      positiveConstituentObservationOnly: true,
      constituentCollectionComplete: false,
      constituentCountSemanticsAuthorized: false,
      positionWeightingAuthorized: false,
      supportAggregationAuthorized: false,
      noCurrentConstituentMeansNoSupport: false,
      dangZhongSettlementAuthorized: false,
      zhuGuaSettlementAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      wangShuaiClassificationAuthorized: false,
      gyeokgukDerivationAuthorized: false,
      narrativeMaterialityAuthorized: false,
      productionAuthorityAuthorized: false,
      externalHumanDomainReviewRequired: false,
      production: 'HOLD',
    });

    const productionPack = {
      ...SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_PACK,
      packId: 'PACK-SAJU-R6-BOUNDED-TONGGEN-SUPPORT-PRODUCTION-FORBIDDEN',
      status: 'production' as const,
    };

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: [SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE],
          methodologies: [SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY],
          sources: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_SOURCES,
          claimTypeDefinitions: [
            SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-03T06:36:00.000Z',
      ),
    ).toThrow(RegistryConfigurationError);

    try {
      createRuleRegistrySnapshot(
        {
          rules: [SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE],
          methodologies: [SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY],
          sources: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_SOURCES,
          claimTypeDefinitions: [
            SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-03T06:36:00.000Z',
      );
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });
});
