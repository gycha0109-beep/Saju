import { describe, expect, test } from 'vitest';
import { unavailable } from '../src/contracts/common.js';
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
  buildSharedNatalExactJiaYiBijieSupportResearchEvidence,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  validateSharedNatalExactJiaYiBijieSupportResearchEvidence,
} from '../src/research/shared-natal-exact-jia-yi-bijie-support-research-evidence-adapter.js';
import {
  createSharedNatalExactJiaYiBijieSupportResearchRegistry,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_VALUE,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_PACK,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE_INPUT_REQUIREMENT,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_SOURCE,
} from '../src/research/shared-natal-exact-jia-yi-bijie-support-structural-claim.js';

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
  visibleStems: Readonly<{
    year: HeavenlyStem;
    month: HeavenlyStem;
    hour: HeavenlyStem;
  }>,
  suffix: string,
): CanonicalSajuSnapshot {
  return {
    snapshotId: `saju_synthetic_r8_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-10-04T02:05:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/saju-r8-exact-jia-yi',
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
      year: { status: 'resolved', value: pillar(visibleStems.year, '인') },
      month: { status: 'resolved', value: pillar(visibleStems.month, '묘') },
      day: { status: 'resolved', value: pillar(dayMaster, '진') },
      hour: { status: 'resolved', value: pillar(visibleStems.hour, '사') },
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
      policy: { id: 'synthetic/saju-r8-exact-jia-yi', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

function evidence(
  base: CanonicalSajuSnapshot,
  slot: 'year' | 'month' | 'hour',
) {
  const built =
    buildSharedNatalExactJiaYiBijieSupportResearchEvidence(base, slot);
  if (built.status !== 'resolved') throw new Error(built.reasonCode);
  return built.envelope;
}

function runtimeRegistry() {
  return createResearchEvidenceRuntimeRegistry([
    SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
}

describe('SAJU-R8 exact Jia-Yi Jiecai-to-Bijie support vertical slice', () => {
  test.each(['year', 'month', 'hour'] as const)(
    'admits exact Jia + selected visible Yi at %s without assigning position semantics',
    (slot) => {
      const stems = { year: '병', month: '정', hour: '경' } as const;
      const base = snapshot(
        '갑',
        {
          ...stems,
          [slot]: '을',
        },
        slot === 'year' ? '1' : slot === 'month' ? '2' : '3',
      );
      const envelope = evidence(base, slot);

      expect(envelope.payload.selectedPillarSlot).toBe(slot);
      expect(envelope.payload.dayMaster).toBe('갑');
      expect(envelope.payload.selectedVisibleStem).toBe('을');
      expect(envelope.payload.relationEvaluation).toMatchObject({
        state: 'jia_yi_jiecai_relation_observed',
        sourceRelation: '劫財',
        exactRelationObserved: true,
        authority: 'research_only',
      });
      expect(envelope.payload.supportEvaluation).toMatchObject({
        state: 'jia_yi_jiecai_bijie_support_constituent_observed',
        sourceRelation: '劫財',
        sourceSupportCategory: '比劫',
        supportConstituentObserved: true,
        dangZhongEstablished: false,
        zhuGuaEstablished: false,
        qiangRuoEstablished: false,
        authority: 'research_only',
      });
      expect(
        envelope.payload.constraints.selectedPositionSemanticWeightAuthorized,
      ).toBe(false);
    },
  );

  test('does not scan another pillar when the explicitly selected slot is outside the exact pair', () => {
    const base = snapshot(
      '갑',
      { year: '병', month: '을', hour: '경' },
      '4',
    );
    const envelope = evidence(base, 'year');

    expect(envelope.payload.selectedVisibleStem).toBe('병');
    expect(envelope.payload.relationEvaluation.state).toBe(
      'outside_selected_source_pair_scope',
    );
    expect(envelope.payload.supportConstituentObserved).toBe(false);
    expect(envelope.payload.constraints.wholeChartJiecaiScanAuthorized).toBe(
      false,
    );
    expect(
      envelope.payload.constraints.selectedPairNonMatchMeansGlobalNoJiecai,
    ).toBe(false);
  });

  test('does not symmetrically generalize Yi day master plus Jia', () => {
    const base = snapshot(
      '을',
      { year: '갑', month: '병', hour: '경' },
      '5',
    );
    const envelope = evidence(base, 'year');

    expect(envelope.payload.relationEvaluation.state).toBe(
      'outside_selected_source_pair_scope',
    );
    expect(envelope.payload.supportConstituentObserved).toBe(false);
    expect(
      envelope.payload.constraints.yiDayMasterJiaSymmetryAuthorized,
    ).toBe(false);
  });

  test('fails closed when day master or selected visible pillar is unresolved', () => {
    const base = snapshot(
      '갑',
      { year: '을', month: '병', hour: '경' },
      '6',
    );

    const unresolvedDayMaster: CanonicalSajuSnapshot = {
      ...base,
      derivedFacts: {
        ...base.derivedFacts,
        dayMaster: unavailable('synthetic-unresolved'),
      },
    };
    expect(
      buildSharedNatalExactJiaYiBijieSupportResearchEvidence(
        unresolvedDayMaster,
        'year',
      ),
    ).toEqual({
      status: 'unavailable',
      reasonCode: 'exact-jia-yi-support-day-master-unresolved',
    });

    const unresolvedYear: CanonicalSajuSnapshot = {
      ...base,
      pillars: {
        ...base.pillars,
        year: unavailable('synthetic-unresolved'),
      },
    };
    expect(
      buildSharedNatalExactJiaYiBijieSupportResearchEvidence(
        unresolvedYear,
        'year',
      ),
    ).toEqual({
      status: 'unavailable',
      reasonCode: 'exact-jia-yi-support-selected-visible-pillar-unresolved',
    });
  });

  test('validates through generic runtime registry and rejects authority widening', () => {
    const base = snapshot(
      '갑',
      { year: '을', month: '병', hour: '경' },
      '7',
    );
    const original = evidence(base, 'year');

    expect(runtimeRegistry().validate(original, base).status).toBe('validated');

    const widenedPayload = {
      ...original.payload,
      constraints: {
        ...original.payload.constraints,
        wholeChartJiecaiScanAuthorized: true,
      },
    };
    const widened = createResearchEvidenceEnvelope(
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
      base,
      widenedPayload,
    );
    const validation =
      validateSharedNatalExactJiaYiBijieSupportResearchEvidence(
        widened,
        base,
      );

    expect(validation.valid).toBe(false);
    expect(validation.errors).toContain(
      'exact_jia_yi_support_payload_authority_widened',
    );
    expect(validation.errors).toContain(
      'exact_jia_yi_support_payload_not_reproducible_from_bound_snapshot',
    );
  });

  test('materializes one registered T2 claim without selected-position or count semantics', () => {
    const base = snapshot(
      '갑',
      { year: '병', month: '을', hour: '경' },
      '8',
    );
    const envelope = evidence(base, 'month');
    const registry =
      createSharedNatalExactJiaYiBijieSupportResearchRegistry(
        '2026-10-04T02:06:00.000Z',
      );

    expect(verifyResolvedRegistryContentIntegrity(registry)).toEqual([]);

    const result = runInterpretation(base, registry, {
      researchEvidence: {
        runtimeRegistry: runtimeRegistry(),
        envelopes: [envelope],
      },
      now: new Date('2026-10-04T02:07:00.000Z'),
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
        subcategory: 'exact_jia_yi_bijie_support_constituent',
      },
      claimType: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'exact_jia_yi_bijie_support_constituent_observed',
      value: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_VALUE,
      researchEvidenceRefs: [envelope.envelopeId],
    });
    expect(
      Object.prototype.hasOwnProperty.call(
        result.claims[0]?.value,
        'selectedPillarSlot',
      ),
    ).toBe(false);
  });

  test('bounded selected-pair non-match emits no inverse claim and missing evidence fails closed', () => {
    const base = snapshot(
      '갑',
      { year: '병', month: '을', hour: '경' },
      '9',
    );
    const envelope = evidence(base, 'year');
    const registry =
      createSharedNatalExactJiaYiBijieSupportResearchRegistry(
        '2026-10-04T02:06:00.000Z',
      );

    const nonMatch = runInterpretation(base, registry, {
      researchEvidence: {
        runtimeRegistry: runtimeRegistry(),
        envelopes: [envelope],
      },
      now: new Date('2026-10-04T02:07:00.000Z'),
    });
    expect(nonMatch.run.status).toBe('completed');
    expect(nonMatch.evaluations[0]?.status).toBe('not_matched');
    expect(nonMatch.claims).toEqual([]);

    const missing = runInterpretation(base, registry, {
      now: new Date('2026-10-04T02:07:00.000Z'),
    });
    expect(missing.run.status).toBe('partial');
    expect(missing.evaluations[0]?.status).toBe('skipped_missing_input');
    expect(missing.claims).toEqual([]);
  });

  test('pins the bounded explicit-slot boundary and rejects Production selection', () => {
    expect(SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE.inputs).toEqual([
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE_INPUT_REQUIREMENT,
    ]);
    expect(
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION,
    ).toMatchObject({
      claimType: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE,
      scope: 'natal',
      exclusiveValue: true,
      scenarioSensitive: true,
      materialForNarrative: false,
      allowedTaxonomyTiers: ['T2'],
    });
    expect(
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA.root,
    ).toMatchObject({
      kind: 'object',
      additionalProperties: false,
    });
    expect(
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY,
    ).toMatchObject({
      runtimeScope: 'isolated_research_pack_only',
      explicitSingleVisibleSlotRequired: true,
      wholeChartJiecaiScanAuthorized: false,
      selectedPositionSemanticWeightAuthorized: false,
      exactJiaYiOnly: true,
      generalizedJiecaiResolverAuthorized: false,
      yiDayMasterJiaSymmetryAuthorized: false,
      canonicalGyeopjaeAliasAuthorized: false,
      globalJiecaiBijieOntologyAuthorized: false,
      jiecaiCountAuthorized: false,
      bijianJiecaiAggregationAuthorized: false,
      supportAggregationAuthorized: false,
      constituentCollectionComplete: false,
      selectedPairNonMatchMeansGlobalNoJiecai: false,
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
      ...SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_PACK,
      packId: 'PACK-SAJU-R8-EXACT-JIA-YI-BIJIE-SUPPORT-PRODUCTION-FORBIDDEN',
      status: 'production' as const,
    };

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: [SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE],
          methodologies: [
            SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY,
          ],
          sources: [SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_SOURCE],
          claimTypeDefinitions: [
            SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-04T02:06:00.000Z',
      ),
    ).toThrow(RegistryConfigurationError);

    try {
      createRuleRegistrySnapshot(
        {
          rules: [SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE],
          methodologies: [
            SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY,
          ],
          sources: [SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_SOURCE],
          claimTypeDefinitions: [
            SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION,
          ],
          claimValueSchemas: [
            SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA,
          ],
          reviewAttestations: [],
        },
        productionPack,
        '2026-10-04T02:06:00.000Z',
      );
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });
});
