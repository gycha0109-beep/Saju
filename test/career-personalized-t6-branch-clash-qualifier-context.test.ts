import { describe, expect, test } from 'vitest';
import type {
  BranchClashContextFact,
  BranchClashQualifierObservationFact,
  CanonicalSajuSnapshot,
} from '../src/contracts/calculation.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import type { CareerT6PublicClassicBoundedScopeMethodologyReviewReport } from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import { CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE } from '../src/research/career-personalized-t6-branch-clash-hidden-stem-context.js';
import {
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_DEFINITION,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES,
  createCareerT6BranchClashQualifierContextRegistry,
} from '../src/research/career-personalized-t6-branch-clash-qualifier-context.js';

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
          visibleExactStemPositions: ['hour'],
          hiddenOccurrenceBranchPositions: ['year', 'month'],
        },
      ],
    },
    {
      pillar: 'day',
      branch: '오',
      hiddenStemObservations: [
        {
          stem: '정',
          visibleExactStemPositions: ['day'],
          hiddenOccurrenceBranchPositions: ['day'],
        },
        {
          stem: '기',
          visibleExactStemPositions: [],
          hiddenOccurrenceBranchPositions: ['day', 'hour'],
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

function snapshot(options: {
  clash?: BranchClashContextFact;
  observation?: BranchClashQualifierObservationFact;
  qualifierRootUnavailable?: boolean;
} = {}): CanonicalSajuSnapshot {
  const clash = options.clash === undefined && 'clash' in options ? undefined : (options.clash ?? branchClashContext);
  const observation =
    options.observation === undefined && 'observation' in options
      ? undefined
      : (options.observation ?? qualifierObservation);
  const qualifierState = options.qualifierRootUnavailable
    ? ({ status: 'unavailable' as const, reasonCode: 'synthetic-qualifier-missing' })
    : ({
        status: 'resolved' as const,
        value: observation === undefined ? {} : { year_day: observation },
      });

  return {
    snapshotId: `saju_synthetic_t6_qualifier_${clash === undefined ? 'no_clash' : 'clash'}_${observation === undefined ? 'no_observation' : 'observation'}_${options.qualifierRootUnavailable ? 'unavailable' : 'resolved'}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: 'c'.repeat(64),
    createdAt: '2026-08-25T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/career-t6-qualifier',
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
      year: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      month: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      day: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      hour: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    },
    derivedFacts: {
      dayMaster: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      branchClashContexts: {
        status: 'resolved',
        value: clash === undefined ? {} : { year_day: clash },
      },
      branchClashQualifierObservations: qualifierState,
    },
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    scenarios: [],
    completeness: {
      birthTimeKnown: true,
      fullyResolved: false,
      resolvedPaths: [
        'derivedFacts.branchClashContexts',
        ...(clash === undefined ? [] : ['derivedFacts.branchClashContexts.year_day']),
        ...(options.qualifierRootUnavailable ? [] : ['derivedFacts.branchClashQualifierObservations']),
        ...(observation === undefined || options.qualifierRootUnavailable
          ? []
          : ['derivedFacts.branchClashQualifierObservations.year_day']),
      ],
      ambiguousPaths: [],
      unavailablePaths: options.qualifierRootUnavailable
        ? ['derivedFacts.branchClashQualifierObservations']
        : [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/career-t6-qualifier', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

function claimsOfType(result: ReturnType<typeof runInterpretation>, claimType: string) {
  return result.claims.filter((claim) => claim.claimType === claimType);
}

describe('Career T6 branch-clash qualifier context', () => {
  test('registers six qualifier rules together with six upstream branch-clash rules under the P4 gate', () => {
    const registry = createCareerT6BranchClashQualifierContextRegistry(p4(), '2026-08-25T00:00:00.000Z');
    expect(CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES).toHaveLength(6);
    expect(registry.rules).toHaveLength(12);
    expect(CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_DEFINITION.materialForNarrative).toBe(false);
    expect(CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_METHODOLOGY.status).toBe('research');
    expect(registry.rules.filter((rule) => rule.ruleSetId === 'career-t6-branch-clash-qualifier-context').every((rule) => rule.taxonomy.tier === 'T6' && rule.taxonomy.category === 'career')).toBe(true);
  });

  test('one exact pair emits one upstream context and one qualifier context with a direct dependency', () => {
    const result = runInterpretation(
      snapshot(),
      createCareerT6BranchClashQualifierContextRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );
    const upstream = claimsOfType(result, CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE);
    const qualifiers = claimsOfType(result, CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE);

    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(upstream).toHaveLength(1);
    expect(qualifiers).toHaveLength(1);
    expect(qualifiers[0]?.upstreamClaimRefs).toEqual([upstream[0]?.claimId]);
    expect(qualifiers[0]?.factRefs).toContain('derivedFacts.branchClashQualifierObservations.year_day');
    expect(result.claimRelations.some((relation) => relation.fromClaimId === qualifiers[0]?.claimId && relation.toClaimId === upstream[0]?.claimId && relation.relation === 'depends_on')).toBe(true);
  });

  test('qualifier claim references the lossless observation path instead of copying raw stems and position arrays into claim value', () => {
    const result = runInterpretation(
      snapshot(),
      createCareerT6BranchClashQualifierContextRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );
    const qualifier = claimsOfType(result, CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE)[0];
    expect(qualifier).toBeDefined();
    const value = qualifier?.value as Record<string, unknown>;
    expect(value.qualifierEvidenceRef).toBe('derivedFacts.branchClashQualifierObservations.year_day');
    expect(value.qualifierDimensions).toEqual([
      'visible_hidden_location_observation',
      'position_or_separation_observation',
      'plurality_location_observation',
    ]);
    const serialized = JSON.stringify(value);
    expect(serialized).not.toContain('visibleExactStemPositions');
    expect(serialized).not.toContain('hiddenOccurrenceBranchPositions');
    expect(serialized).not.toContain('interveningPillars');
    expect(qualifier?.factRefs).toContain('derivedFacts.branchClashQualifierObservations.year_day');
  });

  test('season is explicitly deferred rather than fabricated from canonical facts', () => {
    const result = runInterpretation(
      snapshot(),
      createCareerT6BranchClashQualifierContextRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );
    const qualifier = claimsOfType(result, CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE)[0];
    const value = qualifier?.value as Record<string, unknown>;
    expect(value.seasonQualifierStatus).toBe('deferred_to_research_evidence_input_boundary');
    expect(JSON.stringify(value)).not.toMatch(/旺|相|休|囚|死/);
  });

  test('resolved qualifier root with no pair is a normal no-match while the upstream clash remains valid', () => {
    const result = runInterpretation(
      snapshot({ observation: undefined }),
      createCareerT6BranchClashQualifierContextRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );
    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE)).toHaveLength(1);
    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE)).toHaveLength(0);
    const qualifierEvaluation = result.evaluations.find((evaluation) => evaluation.ruleRef.id === 'RULE-CAREER-T6-BRANCH-CLASH-QUALIFIER-YEAR-DAY');
    expect(qualifierEvaluation?.status).toBe('not_matched');
  });

  test('qualifier observation cannot create a T6 qualifier without the same-pair upstream branch-clash claim', () => {
    const result = runInterpretation(
      snapshot({ clash: undefined }),
      createCareerT6BranchClashQualifierContextRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );
    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE)).toHaveLength(0);
    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE)).toHaveLength(0);
    const qualifierEvaluation = result.evaluations.find((evaluation) => evaluation.ruleRef.id === 'RULE-CAREER-T6-BRANCH-CLASH-QUALIFIER-YEAR-DAY');
    expect(qualifierEvaluation?.status).toBe('skipped_cardinality_mismatch');
  });

  test('unavailable qualifier root fails closed and never reuses the upstream context as fallback evidence', () => {
    const result = runInterpretation(
      snapshot({ qualifierRootUnavailable: true }),
      createCareerT6BranchClashQualifierContextRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );
    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE)).toHaveLength(1);
    expect(claimsOfType(result, CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE)).toHaveLength(0);
    expect(result.run.completeness.state).toBe('partial');
  });

  test('qualifier contract contains no activation strength distance weight winner damage outcome T8 or narrative authority', () => {
    for (const rule of CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES) {
      const serialized = JSON.stringify(rule.output.value).toLowerCase();
      expect(serialized).toContain('not_authorized');
      for (const forbidden of [
        '"winner":',
        '"damage":',
        '"score":',
        '"weight":',
        '"activation":true',
        '"strength":',
        '"salary":',
        '"occupation":',
        '"future":',
        '"t8conclusion":',
      ]) {
        expect(serialized).not.toContain(forbidden);
      }
      expect(rule.status).toBe('research');
      expect(rule.quality.reviewerStatus).toBe('unreviewed');
    }
  });

  test('P4 gate widening is rejected', () => {
    const widened = {
      ...p4(),
      damageMagnitudeAuthorized: true,
    } as unknown as CareerT6PublicClassicBoundedScopeMethodologyReviewReport;
    expect(() => createCareerT6BranchClashQualifierContextRegistry(widened)).toThrow(
      'P4 Career T6 gate does not authorize branch-clash qualifier context rules.',
    );
  });

  test('all qualifier rules remain Career-only and never leak into general or other specialist domains', () => {
    expect(CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES.every((rule) => rule.taxonomy.category === 'career')).toBe(true);
    expect(CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_RULES.some((rule) => ['general', 'wealth', 'relationship', 'business'].includes(rule.taxonomy.category))).toBe(false);
  });
});
