import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  GENERAL_NATAL_PEER_TAXONOMY_SOURCE,
  GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY,
  GENERAL_NATAL_SOURCE_BOUNDED_PACK,
  GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
  GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION,
  createGeneralNatalSourceBoundedRegistry,
} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';

const ALL_FIVE_FAMILIES_WITH_GYEOPJAE: TenGodChartFact = {
  year: { stem: resolved('겁재'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

const ALL_FIVE_FAMILIES_WITH_BIJEON_ONLY: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

const WITHOUT_WEALTH: TenGodChartFact = {
  year: { stem: resolved('겁재'), branch: resolved('정인') },
  month: { stem: resolved('상관'), branch: resolved('식신') },
  day: { stem: resolved('일간'), branch: resolved('편관') },
  hour: { stem: resolved('정관'), branch: resolved('편인') },
};

function fixture(tenGods: TenGodChartFact): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-09-18T04:20:00.000+09:00') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(tenGods) },
  };
}

describe('general natal source-bounded T8 structural relation candidate', () => {
  it('contains exactly five family rules and five source-bounded structural rules', () => {
    expect(GENERAL_NATAL_SOURCE_BOUNDED_T8_VERSION).toBe('0.2.0-research');
    expect(GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES).toHaveLength(5);
    expect(GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES).toHaveLength(5);
    expect(GENERAL_NATAL_SOURCE_BOUNDED_PACK.status).toBe('research');
    expect(GENERAL_NATAL_SOURCE_BOUNDED_METHODOLOGY.status).toBe('research');

    const allRules = [
      ...GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES,
      ...GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES,
    ];
    expect(
      allRules.every(
        (rule) =>
          rule.status === 'research' &&
          rule.quality.provenanceQuality === 'secondary_only' &&
          rule.quality.reviewerStatus === 'unreviewed',
      ),
    ).toBe(true);
  });

  it('registers Samyeong volume 7 as the direct second peer-family source', () => {
    expect(GENERAL_NATAL_PEER_TAXONOMY_SOURCE).toEqual(
      expect.objectContaining({
        sourceId: 'SRC-SAMYEONG-TONGHOE-V7-FOUR-LIBRARIES-PEER-TAXONOMY',
        provenanceTier: 'cross_reference',
        locator: { section: '兄弟' },
      }),
    );
    expect(GENERAL_NATAL_PEER_TAXONOMY_SOURCE.url).toContain('oldid=2082208');

    expect(
      GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES.every(
        (rule) => new Set(rule.sourceRefs.map((ref) => ref.sourceId)).size === 2,
      ),
    ).toBe(true);

    const peerRule = GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_RULES.find(
      (rule) =>
        rule.ruleId === 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-FAMILY-PEER-PRESENT',
    );
    expect(peerRule).toBeDefined();
    const peerSourceIds = peerRule?.sourceRefs.map((ref) => ref.sourceId).sort();
    expect(peerSourceIds).toEqual(
      [
        'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
        'SRC-SAMYEONG-TONGHOE-V7-FOUR-LIBRARIES-PEER-TAXONOMY',
      ].sort(),
    );
    expect(peerSourceIds).not.toContain(
      'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS',
    );

    const registry = createGeneralNatalSourceBoundedRegistry();
    expect(
      registry.sources.some(
        (source) => source.sourceId === GENERAL_NATAL_PEER_TAXONOMY_SOURCE.sourceId,
      ),
    ).toBe(true);
  });

  it('contains no consumer prose or unsupported conclusion families in T8 outputs', () => {
    const encoded = JSON.stringify(GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES);
    for (const forbidden of [
      'headline',
      'summary',
      'consumer_conclusion',
      'PEER-OFFICER',
      'CORE-FIVE-FAMILY',
      'WORK-',
      'MONEY-',
      'RELATIONSHIP-',
    ]) {
      expect(encoded).not.toContain(forbidden);
    }

    expect(
      GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.every(
        (rule) => rule.output.predicate === 'ten_god_structural_relation',
      ),
    ).toBe(true);
    expect(
      GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.every(
        (rule) =>
          (rule.output.value as { consumerProjectionAuthorized?: boolean })
            .consumerProjectionAuthorized === false &&
          (rule.output.value as { behavioralInferenceAuthorized?: boolean })
            .behavioralInferenceAuthorized === false,
      ),
    ).toBe(true);
  });

  it('keeps every T8 structural relation bound to Yuanhai plus Samyeong volume 5', () => {
    expect(
      GENERAL_NATAL_SOURCE_BOUNDED_RELATION_RULES.every((rule) => {
        const sourceIds = rule.sourceRefs.map((ref) => ref.sourceId).sort();
        return (
          sourceIds.length === 2 &&
          sourceIds[0] === 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE' &&
          sourceIds[1] === 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS'
        );
      }),
    ).toBe(true);
  });

  it('emits exactly the five supported structural relations when all endpoint families and Gyeopjae exist', () => {
    const execution = runInterpretation(
      fixture(ALL_FIVE_FAMILIES_WITH_GYEOPJAE),
      createGeneralNatalSourceBoundedRegistry(),
    );
    const relations = execution.claims.filter(
      (claim) => claim.predicate === 'ten_god_structural_relation',
    );

    expect(relations).toHaveLength(5);
    expect(
      relations
        .map((claim) => (claim.value as { relationId: string }).relationId)
        .sort(),
    ).toEqual(
      [
        'OUTPUT-TO-WEALTH',
        'WEALTH-TO-OFFICER',
        'OFFICER-TO-RESOURCE',
        'PEER-TO-WEALTH-ADVERSE',
        'WEALTH-RESOURCE-CONFLICT',
      ].sort(),
    );

    const peerWealth = relations.find(
      (claim) =>
        (claim.value as { relationId: string }).relationId === 'PEER-TO-WEALTH-ADVERSE',
    );
    expect(peerWealth?.value).toEqual(
      expect.objectContaining({
        evidenceScope: 'exact_member_intersection',
        exactTenGodConstraint: '겁재',
        consumerProjectionAuthorized: false,
      }),
    );
    expect(relations.every((claim) => claim.upstreamClaimRefs.length === 2)).toBe(true);
  });

  it('does not broaden the two-source peer-wealth relation to Bijeon-only presence', () => {
    const execution = runInterpretation(
      fixture(ALL_FIVE_FAMILIES_WITH_BIJEON_ONLY),
      createGeneralNatalSourceBoundedRegistry(),
    );
    const relationIds = execution.claims
      .filter((claim) => claim.predicate === 'ten_god_structural_relation')
      .map((claim) => (claim.value as { relationId: string }).relationId);

    expect(relationIds).not.toContain('PEER-TO-WEALTH-ADVERSE');
    expect(relationIds).toHaveLength(4);
  });

  it('does not emit wealth-dependent relations when the wealth family is absent', () => {
    const execution = runInterpretation(
      fixture(WITHOUT_WEALTH),
      createGeneralNatalSourceBoundedRegistry(),
    );
    const relationIds = execution.claims
      .filter((claim) => claim.predicate === 'ten_god_structural_relation')
      .map((claim) => (claim.value as { relationId: string }).relationId);

    expect(relationIds).toEqual(['OFFICER-TO-RESOURCE']);
  });

  it('builds deterministically and remains blocked at Production composition', () => {
    const left = createGeneralNatalSourceBoundedRegistry();
    const right = createGeneralNatalSourceBoundedRegistry();
    expect(left.snapshot.registrySnapshotId).toBe(right.snapshot.registrySnapshotId);

    const inspection = inspectMyeonghwaProductionComposition({ registry: left });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
