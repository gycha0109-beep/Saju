import { describe, expect, test } from 'vitest';
import { resolved } from '../src/contracts/common.js';
import type {
  BranchFact,
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
  PillarFact,
  StemFact,
  StemInteractionSettlementFact,
} from '../src/contracts/calculation.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { StructuralRoleAssignment } from '../src/calculation/structural-role-impact.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import {
  executeProductReading,
} from '../src/reading/governed-reading-execution.js';
import type { ConsumerReadingAuthorityResolverV1 } from '../src/reading/consumer-reading-authority.js';
import type { OfficialReadingSemanticProjectionResolverV1 } from '../src/reading/official-reading-semantic-projection.js';
import { buildProductReadingDelivery } from '../src/reading/product-reading-delivery.js';
import { buildProductReadingResponse } from '../src/reading/product-reading-response.js';
import { createGovernedAnnualStructuralImpactBundleV1 } from '../src/reading/annual-structural-impact-bundle.js';
import { createI7SeasonalSupportRegistry } from '../src/research/i7-seasonal-support-pack.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeongha/r199-auto-annual-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

const executionOptions = {
  outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  readingVersion: 'myeongha-r199-reading-v1-test',
} as const;

const STEMS: Record<'갑' | '기' | '경', StemFact> = {
  갑: { value: '갑', hanja: '甲', element: '목', yinYang: '양' },
  기: { value: '기', hanja: '己', element: '토', yinYang: '음' },
  경: { value: '경', hanja: '庚', element: '금', yinYang: '양' },
};

const BRANCHES: Record<'사' | '오', BranchFact> = {
  사: { value: '사', hanja: '巳', element: '화', yinYang: '음' },
  오: { value: '오', hanja: '午', element: '화', yinYang: '양' },
};

function pillar(stem: keyof typeof STEMS, branch: keyof typeof BRANCHES): PillarFact {
  return { stem: STEMS[stem], branch: BRANCHES[branch] };
}

function natalSettlement(): StemInteractionSettlementFact {
  return {
    settlementId: 'r199-natal-settlement',
    relationId: 'stem_five_combination:year:stem:갑|month:stem:기',
    kind: 'stem_five_combination',
    scope: 'non_day_master_stem_five_combination',
    pair: ['갑', '기'],
    transformationApplied: false,
    activeRelations: ['stem_five_combination', 'element_control'],
    pairControlEffective: true,
    externalInfluences: [],
    participants: {
      controller: {
        pillar: 'year',
        stem: '갑',
        tenGod: '식신',
        element: '목',
        identityPreserved: true,
        baseFunctionState: 'constrained',
        incomingInfluenceSummary: 'none',
        incomingInfluences: [],
        functionState: 'constrained',
      },
      controlled: {
        pillar: 'month',
        stem: '기',
        tenGod: '정관',
        element: '토',
        identityPreserved: true,
        baseFunctionState: 'impaired',
        incomingInfluenceSummary: 'none',
        incomingInfluences: [],
        functionState: 'impaired',
      },
    },
  };
}

function autoSnapshot(): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1990, month: 5, day: 15 },
      time: { known: true, hour: 14, minute: 30 },
      sexForTraditionalCalculation: 'male',
    },
    calculationPolicy,
    { now: new Date('2042-06-15T00:00:00.000Z') },
  );
  const safeNatal = pillar('갑', '사');
  return {
    ...base,
    pillars: {
      year: resolved(safeNatal),
      month: resolved(pillar('기', '사')),
      day: resolved(safeNatal),
      hour: resolved(safeNatal),
    },
    luckCycle: resolved({
      direction: 'forward',
      start: { age: 1, years: 1, months: 0, days: 0 },
      pillars: Array.from({ length: 10 }, (_, index) => ({
        age: 1 + index * 10,
        pillar: pillar('경', '오'),
      })),
    }),
    derivedFacts: {
      ...base.derivedFacts,
      stemInteractionSettlements: resolved([natalSettlement()]),
    },
  };
}

function annualClaim(snapshotId: string, id: string): InterpretationClaim {
  return {
    claimId: id,
    schemaVersion: 'myeongha-r199-annual-claim-v1',
    snapshotId,
    taxonomy: {
      tier: 'T9',
      category: 'general',
      subcategory: 'annual',
    },
    claimType: 'CLAIM-R199-ANNUAL',
    subject: 'general',
    predicate: 'r199_annual_fixture',
    value: { fixture: id },
    methodologyRef: {
      id: 'METHOD-R199-ANNUAL-TEST',
      version: '1.0.0-test',
    },
    ruleRefs: [
      {
        ruleId: `RULE-${id}`,
        version: '1.0.0-test',
        evaluationId: `eval-${id}`,
      },
    ],
    factRefs: ['pillars.day'],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

function interpretationWithAnnualClaim(
  snapshot: CanonicalSajuSnapshot,
  id: string,
) {
  const registry = createI7SeasonalSupportRegistry();
  const base = runInterpretation(snapshot, registry, {
    now: new Date('2042-06-15T00:05:00.000Z'),
  });
  return {
    registry,
    interpretation: {
      ...base,
      claims: [annualClaim(snapshot.snapshotId, id)],
      claimRelations: [],
      integrity: { valid: true as const, errors: [] },
      evidenceIndex: {},
    },
  };
}

const roles: readonly StructuralRoleAssignment[] = [
  {
    roleAssignmentId: 'r199-controller-core-support',
    structureId: 'structure-r199',
    authority: 'governed_upstream',
    pillar: 'year',
    stem: '갑',
    tenGod: '식신',
    disposition: 'supports_structure',
    criticality: 'core',
  },
  {
    roleAssignmentId: 'r199-controlled-supporting-harm',
    structureId: 'structure-r199',
    authority: 'governed_upstream',
    pillar: 'month',
    stem: '기',
    tenGod: '정관',
    disposition: 'harms_structure',
    criticality: 'supporting',
  },
];

const baseline = {
  baselineId: 'r199-baseline',
  structureId: 'structure-r199',
  authority: 'governed_upstream' as const,
  state: 'intact' as const,
};

const officialAuthority: ConsumerReadingAuthorityResolverV1 = (intent) => {
  return {
    authorityVersion: 'r199-test-annual-official-v1',
    readingSection: `${intent.domain}:${intent.temporalScope}`,
    authority: 'official_reading' as const,
    supportedOfficialReadingSection: 'general:annual',
    constraints: {
      mayPromoteProductionInterpretationAuthority: false as const,
      mayGrantPersistenceAuthority: false as const,
      mayGrantPublicGeneralAvailabilityAuthority: false as const,
      mayTreatUnsupportedSectionAsOfficialReading: false as const,
    },
  };
};

const semanticProjection: OfficialReadingSemanticProjectionResolverV1 = ({
  targetClaimIds,
}) => ({
  semanticTextBindings: targetClaimIds.map((targetClaimId) => ({
    targetClaimId,
    canonicalText: {
      headline: '연간 구조 흐름',
      summary: '등록된 연간 의미와 계산된 구조 전이를 함께 사용합니다.',
    },
    provenance: {
      admissionId: 'r199-test-admission',
      admissionRegistryVersion: '1.0.0-test',
      researchId: 'r199-test-research',
      researchVersion: '1.0.0-test',
      authorityState: 'test_official',
    },
  })),
  semanticQualifierBindings: [],
});

describe('R199 automatic annual Official Reading production', () => {
  test('auto-produces R198 bundle and delivers the settled timing section end-to-end', async () => {
    const currentSnapshot = autoSnapshot();
    const { registry, interpretation } = interpretationWithAnnualClaim(
      currentSnapshot,
      'r199-auto-success',
    );

    const result = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'r199-auto-success',
        text: '올해 사주',
        referenceDateTime: '2042-06-15T12:00:00.000Z',
      },
      {
        ...executionOptions,
        consumerReadingAuthorityResolver: officialAuthority,
        officialReadingSemanticProjectionResolver: semanticProjection,
        governedAnnualTemporalProduction: {
          baseline,
          roleAssignments: roles,
        },
      },
    );

    expect(result.state).toBe('completed');
    expect(result.modelCalls).toBe(0);
    expect(result.consumerReadingAuthority?.authority).toBe('official_reading');

    const timing = result.artifact?.sections.find(
      (section) => section.sectionType === 'timing',
    );
    expect(timing?.title).toBe('2042년 구조 흐름');
    expect(timing?.blocks).toEqual([
      {
        type: 'fact_table',
        rows: [
          { label: '연간 기둥', value: '임술' },
          { label: '이전 구조 상태', value: '정상' },
          { label: '이번 구조 방향', value: '구조 약화 방향' },
          { label: '다음 구조 상태', value: '약화' },
        ],
      },
      {
        type: 'paragraph',
        text: '기존 구조가 한 단계 약해지는 흐름입니다.',
      },
    ]);

    const response = buildProductReadingResponse(
      buildProductReadingDelivery(result),
    );
    expect(
      response.reading?.sections.some(
        (section) =>
          section.sectionType === 'timing' &&
          section.title === '2042년 구조 흐름',
      ),
    ).toBe(true);
    expect(JSON.stringify(response)).not.toMatch(
      /annual_impact_producer_|annual_structural_impact_|r199-controller-core-support|governed_upstream/u,
    );
  });

  test('root qualifier-only annual context reaches public timing without leaking root metadata', async () => {
    const currentSnapshot = autoSnapshot();
    const { registry, interpretation } = interpretationWithAnnualClaim(
      currentSnapshot,
      'r200-root-qualifier-public',
    );

    const result = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'r200-root-qualifier-public',
        text: '올해 사주',
        referenceDateTime: '2048-06-15T12:00:00.000Z',
      },
      {
        ...executionOptions,
        consumerReadingAuthorityResolver: officialAuthority,
        officialReadingSemanticProjectionResolver: semanticProjection,
        governedAnnualTemporalProduction: {
          baseline,
          roleAssignments: roles,
        },
      },
    );

    expect(result.state).toBe('completed');
    expect(result.modelCalls).toBe(0);
    const response = buildProductReadingResponse(
      buildProductReadingDelivery(result),
    );
    const timing = response.reading?.sections.find(
      (section) => section.sectionType === 'timing',
    );
    expect(timing?.title).toBe('2048년 구조 흐름');
    expect(JSON.stringify(timing)).toContain('무진');
    expect(JSON.stringify(response)).not.toMatch(
      /rootSupport|sameElementHiddenStems|hiddenStems|qualifierOnly|r199-controller-core-support/u,
    );
  });

  test('bounded producer failure blocks Official Reading instead of falling back to legacy narrative', async () => {
    const currentSnapshot = autoSnapshot();
    const { registry, interpretation } = interpretationWithAnnualClaim(
      currentSnapshot,
      'r199-auto-bounded-block',
    );

    const result = await executeProductReading(
      currentSnapshot,
      interpretation,
      registry,
      {
        requestId: 'r199-auto-bounded-block',
        text: '올해 사주',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
      },
      {
        ...executionOptions,
        consumerReadingAuthorityResolver: officialAuthority,
        officialReadingSemanticProjectionResolver: semanticProjection,
        governedAnnualTemporalProduction: {
          baseline,
          roleAssignments: roles,
        },
      },
    );

    expect(result.state).toBe('invariant_blocked');
    expect(result.modelCalls).toBe(0);
    expect(result.artifact).toBeUndefined();
    expect(result.reasonCodes).toContain(
      'OFFICIAL_READING_ANNUAL_STRUCTURAL_IMPACT_PRODUCTION_BLOCKED:branch_relation_requires_settlement',
    );
  });

  test('automatic annual production cannot be silently used under the default legacy authority', async () => {
    const currentSnapshot = autoSnapshot();
    const { registry, interpretation } = interpretationWithAnnualClaim(
      currentSnapshot,
      'r199-auto-legacy-block',
    );

    await expect(
      executeProductReading(
        currentSnapshot,
        interpretation,
        registry,
        {
          requestId: 'r199-auto-legacy-block',
          text: '올해 사주',
          referenceDateTime: '2042-06-15T12:00:00.000Z',
        },
        {
          ...executionOptions,
          governedAnnualTemporalProduction: {
            baseline,
            roleAssignments: roles,
          },
        },
      ),
    ).rejects.toThrow(/requires Official Reading authority/u);
  });

  test('manual and automatic annual temporal inputs are mutually exclusive', async () => {
    const currentSnapshot = autoSnapshot();
    const { registry, interpretation } = interpretationWithAnnualClaim(
      currentSnapshot,
      'r199-mutually-exclusive',
    );

    await expect(
      executeProductReading(
        currentSnapshot,
        interpretation,
        registry,
        {
          requestId: 'r199-mutually-exclusive',
          text: '올해 사주',
          referenceDateTime: '2042-06-15T12:00:00.000Z',
        },
        {
          ...executionOptions,
          consumerReadingAuthorityResolver: officialAuthority,
          officialReadingSemanticProjectionResolver: semanticProjection,
          governedAnnualTemporalProduction: {
            baseline,
            roleAssignments: roles,
          },
          governedAnnualTemporalStructure: {
            baseline,
            impactBundle: createGovernedAnnualStructuralImpactBundleV1({
              snapshotId: currentSnapshot.snapshotId,
              targetYear: 2042,
              structureId: baseline.structureId,
              producerRef: {
                id: 'r199-manual-test',
                version: '1.0.0-test',
              },
              assessments: [
                {
                  status: 'resolved',
                  assessmentId: 'r199-manual-assessment',
                  settlementId: 'r199-manual-settlement',
                  structureId: baseline.structureId,
                  participantImpacts: [
                    {
                      participantRole: 'controller',
                      roleAssignmentId: 'r199-manual-controller',
                      pillar: 'year',
                      stem: '갑',
                      tenGod: '식신',
                      disposition: 'supports_structure',
                      criticality: 'core',
                      functionState: 'impaired',
                      impact: 'weakens_structure',
                    },
                    {
                      participantRole: 'controlled',
                      roleAssignmentId: 'r199-manual-controlled',
                      pillar: 'month',
                      stem: '기',
                      tenGod: '정관',
                      disposition: 'neutral',
                      criticality: 'secondary',
                      functionState: 'preserved',
                      impact: 'maintains_structure',
                    },
                  ],
                  overallImpact: 'weakens_structure',
                  decisionRule: 'single_direction',
                  decisiveRoleAssignmentIds: ['r199-manual-controller'],
                },
              ],
            }),
          },
        },
      ),
    ).rejects.toThrow(/mutually exclusive/u);
  });
});
