import { describe, expect, test } from 'vitest';
import type {
  BranchClashContextFact,
  BranchClashQualifierObservationFact,
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
  YinYang,
} from '../src/contracts/calculation.js';
import { ResearchEvidenceExecutionError, runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import { createResearchEvidenceEnvelope } from '../src/interpretation/research-evidence.js';
import type { CareerT6PublicClassicBoundedScopeMethodologyReviewReport } from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import { CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE } from '../src/research/career-personalized-t6-branch-clash-hidden-stem-context.js';
import { CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE } from '../src/research/career-personalized-t6-branch-clash-qualifier-context.js';
import {
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_DEFINITION,
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY,
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES,
  createCareerT6BranchClashSeasonalQualifierRegistry,
} from '../src/research/career-personalized-t6-branch-clash-seasonal-qualifier.js';
import {
  buildI20RelativeForceResearchEvidence,
  I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
  I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
} from '../src/research/i20-relative-force-research-evidence-adapter.js';
import type { RelativeForceEvidenceReport } from '../src/research/i20-relative-force-evidence.js';

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

function p4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    exactP3BoundaryAccepted: true,
    exactI252BoundaryAccepted: true,
    structuralTriggerKind: 'branch_clash',
    structuralTriggerMustBeT0Candidate: true,
    branchClashHiddenStemInteractionEligibilityT6AuthoringAuthorized: true,
    branchClashParticipantScopeRequired: true,
    qualifierOnlyContextAuthorized: true,
    generalHiddenStemInteractionStillBlocked: true,
    arbitraryHiddenStemCoPresenceInteractionAuthorized: false,
    nonClashHiddenStemInteractionAuthorized: false,
    damageMagnitudeAuthorized: false,
    destructionVerdictAuthorized: false,
    postRelationSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    careerOutcomeSemanticAuthorizedByThisGate: false,
    careerT8SynthesisAuthorizedByThisGate: false,
    consumerNarrativeAuthorizedByThisGate: false,
    productionPromotionAuthorized: false,
  } as unknown as CareerT6PublicClassicBoundedScopeMethodologyReviewReport;
}

const branchClashContext: BranchClashContextFact = {
  relationId: 'branch_clash:year:branch:자|day:branch:오',
  kind: 'branch_clash',
  pairKey: 'year_day',
  participants: [
    { pillar: 'year', branch: '자', hiddenStems: ['계'] },
    { pillar: 'day', branch: '오', hiddenStems: ['정', '기'] },
  ],
  sourceIds: ['SRC-T0-YISI-ZHAN-10', 'SRC-T0-XUANZE-YAOLUE-UPPER'],
  sourceFactRefs: [
    'derivedFacts.structuralRelations',
    'derivedFacts.hiddenStems.year',
    'derivedFacts.hiddenStems.day',
  ],
  semantics: { structuralMatchOnly: true, transformationEstablished: false },
};

const qualifierObservation: BranchClashQualifierObservationFact = {
  relationId: branchClashContext.relationId,
  pairKey: 'year_day',
  interveningPillars: ['month'],
  participants: [
    {
      pillar: 'year',
      branch: '자',
      hiddenStemObservations: [
        {
          stem: '계',
          visibleExactStemPositions: [],
          hiddenOccurrenceBranchPositions: ['year'],
        },
      ],
    },
    {
      pillar: 'day',
      branch: '오',
      hiddenStemObservations: [
        {
          stem: '정',
          visibleExactStemPositions: [],
          hiddenOccurrenceBranchPositions: ['day'],
        },
        {
          stem: '기',
          visibleExactStemPositions: [],
          hiddenOccurrenceBranchPositions: ['day'],
        },
      ],
    },
  ],
  sourceFactRefs: [
    'derivedFacts.branchClashContexts.year_day',
    'pillars.year.stem',
    'pillars.month.stem',
    'pillars.day.stem',
    'pillars.hour.stem',
    'derivedFacts.hiddenStems.year',
    'derivedFacts.hiddenStems.month',
    'derivedFacts.hiddenStems.day',
    'derivedFacts.hiddenStems.hour',
  ],
  semantics: {
    observationOnly: true,
    visibilityEffectEstablished: false,
    separationEffectEstablished: false,
    pluralityEffectEstablished: false,
    numericWeightAssigned: false,
  },
};

function snapshot(options: { includeClash?: boolean; suffix?: string } = {}): CanonicalSajuSnapshot {
  const includeClash = options.includeClash ?? true;
  const suffix = options.suffix ?? 'a';
  return {
    snapshotId: `saju_synthetic_t6_seasonal_${suffix}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: suffix.repeat(64).slice(0, 64),
    createdAt: '2026-08-25T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/career-t6-seasonal',
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
      year: { status: 'resolved', value: pillar('갑', '자') },
      month: { status: 'resolved', value: pillar('병', '인') },
      day: { status: 'resolved', value: pillar('무', '오') },
      hour: { status: 'resolved', value: pillar('경', '유') },
    },
    derivedFacts: {
      dayMaster: { status: 'resolved', value: { value: '무', ...STEM_META.무 } },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
      branchClashContexts: {
        status: 'resolved',
        value: includeClash ? { year_day: branchClashContext } : {},
      },
      branchClashQualifierObservations: {
        status: 'resolved',
        value: { year_day: qualifierObservation },
      },
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
        'derivedFacts.branchClashContexts',
        ...(includeClash ? ['derivedFacts.branchClashContexts.year_day'] : []),
        'derivedFacts.branchClashQualifierObservations',
        'derivedFacts.branchClashQualifierObservations.year_day',
      ],
      ambiguousPaths: [],
      unavailablePaths: [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/career-t6-seasonal', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

function evidence(base: CanonicalSajuSnapshot) {
  const built = buildI20RelativeForceResearchEvidence(base);
  if (built.status !== 'resolved') throw new Error(`I20 evidence unavailable: ${built.reasonCode}`);
  return built.envelope;
}

function runtimeRegistry() {
  return createResearchEvidenceRuntimeRegistry([
    I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
  ]);
}

function run(base = snapshot(), envelopes = [evidence(base)]) {
  return runInterpretation(
    base,
    createCareerT6BranchClashSeasonalQualifierRegistry(p4(), '2026-08-25T00:00:00.000Z'),
    {
      now: new Date('2026-08-25T00:00:00.000Z'),
      researchEvidence: { runtimeRegistry: runtimeRegistry(), envelopes },
    },
  );
}

function claimsOfType(result: ReturnType<typeof runInterpretation>, claimType: string) {
  return result.claims.filter((claim) => claim.claimType === claimType);
}

describe('Career T6 branch-clash seasonal qualifier transport', () => {
  test('registers 60 bounded seasonal rules after the 12 existing branch-clash context rules', () => {
    const registry = createCareerT6BranchClashSeasonalQualifierRegistry(
      p4(),
      '2026-08-25T00:00:00.000Z',
    );

    expect(CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES).toHaveLength(60);
    expect(registry.rules).toHaveLength(72);
    expect(CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_DEFINITION.materialForNarrative).toBe(false);
    expect(CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY.status).toBe('research');
    expect(CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_METHODOLOGY.inputContract?.researchEvidenceInputs).toEqual([
      expect.objectContaining({
        source: 'research_evidence',
        evidenceType: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.evidenceType,
        evidenceVersion: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.evidenceVersion,
        mode: 'required',
      }),
    ]);
  });

  test('year-day clash emits exactly the two participant phase observations carried by governed I20 evidence', () => {
    const result = run();
    const seasonal = claimsOfType(result, CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE);

    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(seasonal).toHaveLength(2);
    expect(seasonal.map((claim) => claim.value)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          pillarPair: 'year_day',
          participantPillar: 'year',
          seasonalPhase: '休',
          evidencePayloadPath: 'positions.0.seasonalPhase',
        }),
        expect.objectContaining({
          pillarPair: 'year_day',
          participantPillar: 'day',
          seasonalPhase: '相',
          evidencePayloadPath: 'positions.2.seasonalPhase',
        }),
      ]),
    );
  });

  test('seasonal claims preserve exact upstream qualifier and content-addressed research-evidence provenance separately', () => {
    const base = snapshot();
    const envelope = evidence(base);
    const result = run(base, [envelope]);
    const qualifier = claimsOfType(result, CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE)[0];
    const seasonal = claimsOfType(result, CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE);

    expect(qualifier).toBeDefined();
    for (const claim of seasonal) {
      expect(claim.upstreamClaimRefs).toEqual([qualifier?.claimId]);
      expect(claim.researchEvidenceRefs).toEqual([envelope.envelopeId]);
      expect(claim.factRefs).toEqual([]);
    }
  });

  test('the existing qualifier context remains deferred while the new child claim carries only the categorical phase', () => {
    const result = run();
    const qualifier = claimsOfType(result, CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE)[0];
    const qualifierValue = qualifier?.value as Record<string, unknown>;
    expect(qualifierValue.seasonQualifierStatus).toBe('deferred_to_research_evidence_input_boundary');

    for (const claim of claimsOfType(result, CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE)) {
      const value = claim.value as Record<string, unknown>;
      expect(['旺', '相', '休', '囚', '死']).toContain(value.seasonalPhase);
      expect(value.qualifierClass).toBe('categorical_observation_only');
      expect(value.effectSettlement).toBe('not_authorized');
      expect(value.scope).toBe('t6_seasonal_qualifier_observation_only');
      expect(value).not.toHaveProperty('score');
      expect(value).not.toHaveProperty('weight');
      expect(value).not.toHaveProperty('winner');
      expect(value).not.toHaveProperty('strength');
      expect(value).not.toHaveProperty('damage');
    }
  });

  test('for one present pair only one of five phase rules matches per participant', () => {
    const result = run();
    const yearDaySeasonal = result.evaluations.filter((evaluation) =>
      evaluation.ruleRef.id.startsWith('RULE-CAREER-T6-BRANCH-CLASH-SEASONAL-YEAR-DAY-'),
    );

    expect(yearDaySeasonal).toHaveLength(10);
    expect(yearDaySeasonal.filter((evaluation) => evaluation.status === 'matched')).toHaveLength(2);
    expect(yearDaySeasonal.filter((evaluation) => evaluation.status === 'not_matched')).toHaveLength(8);
  });

  test('missing research evidence fails closed without removing the already-valid upstream branch-clash context', () => {
    const base = snapshot();
    const result = runInterpretation(
      base,
      createCareerT6BranchClashSeasonalQualifierRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );

    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE)).toHaveLength(1);
    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE)).toHaveLength(1);
    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE)).toHaveLength(0);
    expect(
      result.evaluations
        .filter((evaluation) =>
          evaluation.ruleRef.id.startsWith('RULE-CAREER-T6-BRANCH-CLASH-SEASONAL-YEAR-DAY-'),
        )
        .every((evaluation) => evaluation.status === 'skipped_missing_input'),
    ).toBe(true);
  });

  test('I20 evidence and qualifier observation cannot create seasonal claims without the same-pair branch-clash authority chain', () => {
    const base = snapshot({ includeClash: false });
    const result = run(base, [evidence(base)]);

    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE)).toHaveLength(0);
    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE)).toHaveLength(0);
    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE)).toHaveLength(0);
  });

  test('freshly rehashed seasonal tampering is rejected before any seasonal rule can consume it', () => {
    const base = snapshot();
    const original = evidence(base);
    const first = original.payload.positions[0];
    if (first === undefined) throw new Error('expected I20 position');
    const tamperedPayload: RelativeForceEvidenceReport = {
      ...original.payload,
      positions: [
        { ...first, seasonalPhase: first.seasonalPhase === '旺' ? '死' : '旺' },
        ...original.payload.positions.slice(1),
      ],
    };
    const tampered = createResearchEvidenceEnvelope(
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
      base,
      tamperedPayload,
    );

    expect(() => run(base, [tampered])).toThrow(ResearchEvidenceExecutionError);
  });

  test('an envelope bound to a different snapshot is rejected before rule evaluation', () => {
    const base = snapshot({ suffix: 'a' });
    const other = snapshot({ suffix: 'b' });

    expect(() => run(base, [evidence(other)])).toThrow(ResearchEvidenceExecutionError);
  });

  test('same snapshot and same evidence produce deterministic seasonal claim and run identities', () => {
    const base = snapshot();
    const envelope = evidence(base);
    const first = run(base, [envelope]);
    const second = run(base, [envelope]);

    expect(
      claimsOfType(first, CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE).map(
        (claim) => claim.claimId,
      ),
    ).toEqual(
      claimsOfType(second, CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE).map(
        (claim) => claim.claimId,
      ),
    );
    expect(first.run.runHash).toBe(second.run.runHash);
  });

  test('seasonal rules remain research-only, T6, non-narrative, and contain no T8 or consumer-output authorization', () => {
    expect(
      CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES.every(
        (rule) =>
          rule.status === 'research' &&
          rule.taxonomy.tier === 'T6' &&
          rule.taxonomy.category === 'career' &&
          rule.output.claimType === CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
      ),
    ).toBe(true);

    const serialized = JSON.stringify(CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_RULES);
    expect(serialized).not.toContain('materialForNarrative":true');
    expect(serialized).not.toContain('career_t8');
    expect(serialized).not.toContain('production');
  });
});
