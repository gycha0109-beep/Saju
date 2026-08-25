import { describe, expect, test } from 'vitest';
import type {
  BranchClashContextFact,
  BranchClashContextIndex,
  CanonicalSajuSnapshot,
  PillarPairKey,
} from '../src/contracts/calculation.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import type { I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport } from '../src/research/i252-public-classic-hidden-stem-interaction-evidence-adequacy-methodology-review.js';
import { buildCareerT6PublicClassicBoundedScopeMethodologyReview } from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import {
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION,
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY,
  CAREER_T6_BRANCH_CLASH_CONTEXT_PACK,
  CAREER_T6_BRANCH_CLASH_CONTEXT_RULES,
  CAREER_T6_QIANLI_NLC_SCAN_SOURCE,
  CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE,
  createCareerT6BranchClashContextRegistry,
} from '../src/research/career-personalized-t6-branch-clash-hidden-stem-context.js';

function validI252(): I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport {
  return {
    reviewId: 'i252_synthetic_valid',
    status: 'RESOLVED_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW',
    decision:
      'QIANLI_PUBLIC_CLASSIC_EVIDENCE_ADEQUATE_FOR_BOUNDED_RESEARCH_METHODOLOGY_FRONTIER_EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_AND_QUALIFIERS_ONLY_THREE_PAGE_BOUND_SOURCE_EXPANSION_GAPS_REMAIN_NO_GENERAL_HIDDEN_STEM_AUTHORITY_NO_CAREER_RULE_YET',
    exactI251BoundaryAccepted: true,
    satisfiedRequirementCount: 8,
    unsatisfiedRequirementCount: 0,
    boundedResearchMethodologyCandidateMayProceed: true,
    boundedMethodologyScope:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_WITH_VISIBILITY_POSITION_SEASON_AND_PLURALITY_QUALIFIERS',
    qianliWorkFamilyAcceptedAsSingleAuthorityFamily: true,
    qianliScanIdentityPlusTranscriptionMaySupportResearchCandidate: true,
    universalHiddenStemInteractionAuthorized: false,
    arbitraryHiddenStemCoPresenceInteractionAuthorized: false,
    hiddenStemInteractionOutsideExplicitRelationAuthorized: false,
    branchClashWinnerMayBeDerivedFromSeasonOrPluralityAutomatically: false,
    numericSeasonWeightAuthorized: false,
    numericPluralityWeightAuthorized: false,
    numericPositionWeightAuthorized: false,
    damageMagnitudeAuthorized: false,
    i232SohuTrackReopened: false,
    i232ProvenanceGapClosed: false,
    i248YudingTrackMutated: false,
    i211QuWeiTrackMutated: false,
    careerT6RuleAuthoringAuthorizedByThisGate: false,
    productionPromotionAuthorized: false,
  } as unknown as I252PublicClassicHiddenStemInteractionEvidenceAdequacyMethodologyReviewReport;
}

function p4() {
  return buildCareerT6PublicClassicBoundedScopeMethodologyReview(validI252());
}

function context(pairKey: PillarPairKey): BranchClashContextFact {
  if (pairKey === 'year_month') {
    return {
      relationId: 'branch_clash:year:branch:자|month:branch:오',
      kind: 'branch_clash',
      pairKey,
      participants: [
        { pillar: 'year', branch: '자', hiddenStems: ['계'] },
        { pillar: 'month', branch: '오', hiddenStems: ['정', '기'] },
      ],
      sourceIds: ['SRC-T0-YISI-ZHAN-10', 'SRC-T0-XUANZE-YAOLUE-UPPER'],
      sourceFactRefs: [
        'derivedFacts.structuralRelations',
        'derivedFacts.hiddenStems.year',
        'derivedFacts.hiddenStems.month',
      ],
      semantics: { structuralMatchOnly: true, transformationEstablished: false },
    };
  }

  if (pairKey === 'day_hour') {
    return {
      relationId: 'branch_clash:day:branch:인|hour:branch:신',
      kind: 'branch_clash',
      pairKey,
      participants: [
        { pillar: 'day', branch: '인', hiddenStems: ['갑', '병', '무'] },
        { pillar: 'hour', branch: '신', hiddenStems: ['무', '경', '임'] },
      ],
      sourceIds: ['SRC-T0-YISI-ZHAN-10', 'SRC-T0-XUANZE-YAOLUE-UPPER'],
      sourceFactRefs: [
        'derivedFacts.structuralRelations',
        'derivedFacts.hiddenStems.day',
        'derivedFacts.hiddenStems.hour',
      ],
      semantics: { structuralMatchOnly: true, transformationEstablished: false },
    };
  }

  throw new Error(`synthetic context not defined for ${pairKey}`);
}

function snapshot(
  indexState: CanonicalSajuSnapshot['derivedFacts']['branchClashContexts'],
): CanonicalSajuSnapshot {
  return {
    snapshotId: 'saju_synthetic_t6_context',
    schemaVersion: 'saju-canonical-v1.3',
    calculationHash: 'b'.repeat(64),
    createdAt: '2026-08-25T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/career-t6-branch-clash',
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
      branchClashContexts: indexState,
    },
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    scenarios: [],
    completeness: {
      birthTimeKnown: true,
      fullyResolved: false,
      resolvedPaths: indexState?.status === 'resolved' ? ['derivedFacts.branchClashContexts'] : [],
      ambiguousPaths: [],
      unavailablePaths: indexState?.status === 'resolved' ? [] : ['derivedFacts.branchClashContexts'],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/career-t6-branch-clash', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.3' },
    },
  };
}

function resolvedIndex(index: BranchClashContextIndex) {
  return { status: 'resolved' as const, value: index };
}

function claimValue(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('expected structured T6 claim value');
  }
  return value as Record<string, unknown>;
}

describe('Career T6 bounded branch-clash hidden-stem context', () => {
  test('registers exactly six research-only non-narrative pillar-pair rules under the P4 gate', () => {
    const registry = createCareerT6BranchClashContextRegistry(p4(), '2026-08-25T00:00:00.000Z');
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_RULES).toHaveLength(6);
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_PACK.status).toBe('research');
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_PACK.claimContractMode).toBe('registered_required');
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.status).toBe('research');
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION.materialForNarrative).toBe(false);
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION.allowedTaxonomyTiers).toEqual(['T6']);
    expect(registry.rules.every((rule) => rule.taxonomy.tier === 'T6')).toBe(true);
    expect(registry.rules.every((rule) => rule.taxonomy.category === 'career')).toBe(true);
    expect(registry.rules.every((rule) => rule.status === 'research')).toBe(true);
    expect(registry.rules.every((rule) => rule.quality.reviewerStatus === 'unreviewed')).toBe(true);
  });

  test('methodology admits only the resolved projection root and exact branch-clash context paths', () => {
    const contracts = CAREER_T6_BRANCH_CLASH_CONTEXT_METHODOLOGY.inputContract?.factInputs ?? [];
    expect(contracts).toEqual([
      expect.objectContaining({
        pathPattern: 'derivedFacts.branchClashContexts',
        mode: 'required',
      }),
      expect.objectContaining({
        pathPattern: 'derivedFacts.branchClashContexts.*',
        mode: 'allowed',
      }),
    ]);
    for (const rule of CAREER_T6_BRANCH_CLASH_CONTEXT_RULES) {
      expect(rule.inputs).toHaveLength(2);
      expect(rule.inputs[0]?.pathOrClaimType).toBe('derivedFacts.branchClashContexts');
      expect(rule.inputs[0]?.required).toBe(true);
      expect(rule.inputs[1]?.pathOrClaimType).toMatch(/^derivedFacts\.branchClashContexts\.(year_month|year_day|year_hour|month_day|month_hour|day_hour)$/);
      expect(rule.inputs[1]?.required).toBe(false);
    }
  });

  test('one explicit T0 clash context emits exactly one direct T6 Career context claim', () => {
    const result = runInterpretation(
      snapshot(resolvedIndex({ year_month: context('year_month') })),
      createCareerT6BranchClashContextRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );
    const claims = result.claims.filter((claim) => claim.claimType === CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE);
    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(claims).toHaveLength(1);
    const claim = claims[0];
    expect(claim?.taxonomy).toEqual({
      tier: 'T6',
      category: 'career',
      subcategory: 'branch_clash_hidden_stem_interaction_context',
    });
    expect(claim?.factRefs).toContain('derivedFacts.branchClashContexts');
    expect(claim?.factRefs).toContain('derivedFacts.branchClashContexts.year_month');
    expect(claim?.upstreamClaimRefs).toEqual([]);
    expect(claimValue(claim?.value).pillarPair).toBe('year_month');
  });

  test('resolved projection with no clash is a normal no-match, not missing evidence', () => {
    const result = runInterpretation(
      snapshot(resolvedIndex({})),
      createCareerT6BranchClashContextRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );
    expect(result.claims).toHaveLength(0);
    expect(result.evaluations.every((evaluation) => evaluation.status === 'not_matched')).toBe(true);
    expect(result.run.completeness.state).toBe('complete');
  });

  test('unavailable projection root fails closed and emits no T6 claim', () => {
    const result = runInterpretation(
      snapshot({ status: 'unavailable', reasonCode: 'synthetic-authority-missing' }),
      createCareerT6BranchClashContextRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );
    expect(result.claims).toHaveLength(0);
    expect(result.evaluations.every((evaluation) => evaluation.status === 'skipped_missing_input')).toBe(true);
    expect(result.run.completeness.state).toBe('partial');
  });

  test('multiple independent clash-pair contexts remain separate and are never aggregated into a winner', () => {
    const result = runInterpretation(
      snapshot(
        resolvedIndex({
          year_month: context('year_month'),
          day_hour: context('day_hour'),
        }),
      ),
      createCareerT6BranchClashContextRegistry(p4(), '2026-08-25T00:00:00.000Z'),
      { now: new Date('2026-08-25T00:00:00.000Z') },
    );
    const claims = result.claims.filter((claim) => claim.claimType === CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE);
    expect(claims).toHaveLength(2);
    expect(claims.map((claim) => claimValue(claim.value).pillarPair).sort()).toEqual(['day_hour', 'year_month']);
    expect(claims.every((claim) => claim.upstreamClaimRefs.length === 0)).toBe(true);
  });

  test('T6 claim value contains no winner damage destruction weighting future salary occupation or T8 conclusion', () => {
    for (const rule of CAREER_T6_BRANCH_CLASH_CONTEXT_RULES) {
      const value = claimValue(rule.output.value);
      expect(value.effectSettlement).toBe('not_authorized');
      expect(value.scope).toBe('t6_structural_interaction_context_only');
      const serialized = JSON.stringify(value).toLowerCase();
      for (const forbiddenField of ['winner":', 'damage":', 'score":', 'weight":', 'salary":', 'occupation":', 'future":', 't8conclusion":']) {
        expect(serialized).not.toContain(forbiddenField);
      }
    }
  });

  test('sources are explicitly one Qianli work family rather than fake multi-source corroboration', () => {
    expect(CAREER_T6_QIANLI_NLC_SCAN_SOURCE.notes).toContain('same QIANLI_MINGGAO work family');
    expect(CAREER_T6_QIANLI_NLC_SCAN_SOURCE.notes).toContain('not counted as independent corroboration');
    expect(CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE.notes).toContain('Same QIANLI_MINGGAO work family');
    expect(CAREER_T6_QIANLI_PUBLIC_TRANSCRIPTION_SOURCE.notes).toContain('not independent corroboration');
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_RULES.every((rule) => rule.quality.provenanceQuality === 'secondary_only')).toBe(true);
  });

  test('P4 widening or damage authorization invalidates registry creation', () => {
    const invalid = {
      ...p4(),
      damageMagnitudeAuthorized: true,
    } as ReturnType<typeof p4>;
    expect(() => createCareerT6BranchClashContextRegistry(invalid)).toThrow(
      'P4 Career T6 gate does not authorize',
    );
  });

  test('the research package does not authorize any other domain or production narrative route', () => {
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_PACK.status).toBe('research');
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_DEFINITION.materialForNarrative).toBe(false);
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_RULES.every((rule) => rule.taxonomy.category === 'career')).toBe(true);
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_RULES.some((rule) => rule.taxonomy.tier === 'T8')).toBe(false);
    expect(CAREER_T6_BRANCH_CLASH_CONTEXT_RULES.some((rule) => rule.status === 'active')).toBe(false);
  });
});
