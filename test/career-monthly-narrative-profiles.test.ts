import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildClaimNarrativePlan } from '../src/narrative/claim-narrative-profile.js';
import { buildValidatedDeterministicFallback } from '../src/narrative/deterministic-fallback.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import {
  CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES,
  CAREER_MONTHLY_MANDATORY_QUALIFIER,
  CAREER_MONTHLY_PROHIBITED_FUTURE_PHRASES,
} from '../src/research/career-monthly-narrative-profiles.js';
import {
  CAREER_MONTHLY_TENSION_CLAIM_TYPE,
  CAREER_MONTHLY_THEME_CLAIM_TYPE,
  createCareerMonthlyReadingCandidateRegistry,
} from '../src/research/career-monthly-reading-candidate.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');

function snapshot(day = 9, timeKnown = true): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}

function monthlyRequest(month: number): ReadingRequest {
  return {
    requestId: `career-monthly-narrative-${month}`,
    intent: { domain: 'career', temporalScope: 'monthly' },
    targetPeriod: {
      scope: 'monthly',
      year: 2026,
      month,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      resolution: 'relative_current',
    },
  };
}

function evidence(value: CanonicalSajuSnapshot, month: number) {
  const request = monthlyRequest(month);
  const context = buildTemporalReadingContext(request);
  if (context === undefined || context.scope !== 'monthly') {
    throw new Error('career monthly request must produce monthly temporal context');
  }
  const registry = createCareerMonthlyReadingCandidateRegistry();
  const execution = runInterpretation(value, registry, {
    requestId: request.requestId,
    temporalFacts: { ...buildMonthlyInterpretationFacts(value, context) },
    now: NOW,
  });
  const composition = buildReadingCompositionEvidence(value, execution, registry, request, {
    narrativePolicyVersion: 'myeongha-career-monthly-narrative-v1',
  });
  if (composition.evidence === undefined) throw new Error('career monthly narrative evidence must exist');
  return { bundle: composition.evidence.bundle, execution };
}

describe('MyeongHa Career Monthly narrative profiles', () => {
  it('registers twenty segment-specific themes and eight bounded branch-clash profiles', () => {
    expect(CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES).toHaveLength(28);
    expect(new Set(CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES.map((profile) => profile.profileId)).size).toBe(28);
    expect(
      CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === CAREER_MONTHLY_THEME_CLAIM_TYPE.claimType,
      ),
    ).toHaveLength(20);
    expect(
      CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === CAREER_MONTHLY_TENSION_CLAIM_TYPE.claimType,
      ),
    ).toHaveLength(8);
  });

  it('enforces future-tendency-only epistemics, method attribution, qualifier, and deterministic career-event bans', () => {
    for (const profile of CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES) {
      expect(profile.allowedEpistemicTypes).toEqual(['future_tendency']);
      expect(profile.requiredMethodAttribution).toBe(true);
      expect(profile.mandatoryQualifier).toBe(CAREER_MONTHLY_MANDATORY_QUALIFIER);
      expect(profile.prohibitedPhrases).toEqual(CAREER_MONTHLY_PROHIBITED_FUTURE_PHRASES);
      const profileText = JSON.stringify(profile.templates);
      for (const forbidden of CAREER_MONTHLY_PROHIBITED_FUTURE_PHRASES) {
        expect(profileText).not.toContain(forbidden);
      }
    }
  });

  it('selects semantic-key-specific before/after profiles and produces a valid governed fallback', () => {
    const { bundle } = evidence(snapshot(), 9);
    const themeKeys = bundle.claims
      .filter((claim) => claim.claimType === CAREER_MONTHLY_THEME_CLAIM_TYPE.claimType)
      .map((claim) => (claim.value as { semanticKey?: string }).semanticKey)
      .filter((value): value is string => value !== undefined);
    expect(themeKeys).toHaveLength(2);

    const plan = buildClaimNarrativePlan(bundle, CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES);
    for (const semanticKey of themeKeys) {
      const item = plan.items.find((candidate) => candidate.semanticKeys?.includes(semanticKey));
      expect(item).toBeDefined();
      expect(item?.epistemicType).toBe('future_tendency');
    }
    expect(JSON.stringify(plan.items)).toContain('이번 달 절입 전 구간');
    expect(JSON.stringify(plan.items)).toContain('이번 달 절입 이후 구간');

    const fallback = buildValidatedDeterministicFallback(
      bundle,
      CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES,
    );
    expect(fallback.validation.valid).toBe(true);
    expect(fallback.validation.violations).toEqual([]);
    expect(JSON.stringify(fallback.draft)).toContain('특정 사건이나 결과를 확정하지 않습니다');
  });

  it('changes the Career Monthly semantic profiles when the target civil month changes', () => {
    const first = buildClaimNarrativePlan(
      evidence(snapshot(), 9).bundle,
      CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES,
    );
    const second = buildClaimNarrativePlan(
      evidence(snapshot(), 10).bundle,
      CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES,
    );
    const themeProfiles = (plan: ReturnType<typeof buildClaimNarrativePlan>) =>
      plan.items
        .filter((item) =>
          item.semanticKeys?.some(
            (key) => key.startsWith('CAREER_MONTHLY_') && !key.includes('BRANCH_CLASH'),
          ),
        )
        .map((item) => item.profileRef.id)
        .sort();

    expect(themeProfiles(second)).not.toEqual(themeProfiles(first));
  });

  it('does not synthesize an hour-clash narrative when birth time is unknown', () => {
    const { bundle } = evidence(snapshot(9, false), 9);
    const plan = buildClaimNarrativePlan(bundle, CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES);

    expect(
      bundle.claims.filter((claim) => claim.claimType === CAREER_MONTHLY_THEME_CLAIM_TYPE.claimType),
    ).toHaveLength(2);
    expect(
      plan.items.some((item) =>
        item.semanticKeys?.some((key) => key.endsWith('BRANCH_CLASH_HOUR')),
      ),
    ).toBe(false);
  });

  it('renders resolved clashes only as bounded work-adjustment tensions', () => {
    let checked = false;
    for (let day = 1; day <= 12 && !checked; day += 1) {
      const { bundle } = evidence(snapshot(day), 9);
      const tensionClaim = bundle.claims.find(
        (claim) => claim.claimType === CAREER_MONTHLY_TENSION_CLAIM_TYPE.claimType,
      );
      if (tensionClaim === undefined) continue;
      const semanticKey = (tensionClaim.value as { semanticKey?: string }).semanticKey;
      if (semanticKey === undefined) continue;
      const plan = buildClaimNarrativePlan(bundle, CAREER_MONTHLY_CLAIM_NARRATIVE_PROFILES);
      const tension = plan.items.find((item) => item.semanticKeys?.includes(semanticKey));
      expect(tension).toMatchObject({ axis: 'tension', epistemicType: 'future_tendency' });
      expect(tension?.assertionText).toContain('업무 역할');
      expect(tension?.assertionText).toContain('특정 직업 사건');
      checked = true;
    }
    expect(checked).toBe(true);
  });
});
