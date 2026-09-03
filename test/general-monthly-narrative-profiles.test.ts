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
import { GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES } from '../src/research/general-monthly-narrative-profiles.js';
import {
  createGeneralMonthlyReadingCandidateRegistry,
  GENERAL_MONTHLY_TENSION_CLAIM_TYPE,
  GENERAL_MONTHLY_THEME_CLAIM_TYPE,
} from '../src/research/general-monthly-reading-candidate.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');

function snapshot(day = 9, timeKnown = true): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}

function monthlyRequest(month: number): ReadingRequest {
  return {
    requestId: `monthly-narrative-${month}`,
    intent: { domain: 'general', temporalScope: 'monthly' },
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
    throw new Error('monthly request must produce monthly temporal context');
  }
  const registry = createGeneralMonthlyReadingCandidateRegistry();
  const execution = runInterpretation(value, registry, {
    requestId: request.requestId,
    temporalFacts: { ...buildMonthlyInterpretationFacts(value, context) },
    now: NOW,
  });
  const composition = buildReadingCompositionEvidence(value, execution, registry, request, {
    narrativePolicyVersion: 'myeongha-general-monthly-narrative-v1',
  });
  if (composition.evidence === undefined) throw new Error('monthly narrative evidence must be available');
  return { execution, bundle: composition.evidence.bundle };
}

describe('MyeongHa general monthly consumer narrative profiles', () => {
  it('registers twenty phase themes plus eight bounded phase-clash tension profiles', () => {
    expect(GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES).toHaveLength(28);
    expect(new Set(GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES.map((profile) => profile.profileId)).size).toBe(28);
    expect(
      GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === GENERAL_MONTHLY_THEME_CLAIM_TYPE.claimType,
      ),
    ).toHaveLength(20);
    expect(
      GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === GENERAL_MONTHLY_TENSION_CLAIM_TYPE.claimType,
      ),
    ).toHaveLength(8);
    expect(
      GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES.every(
        (profile) =>
          profile.allowedEpistemicTypes.length === 1 &&
          profile.allowedEpistemicTypes[0] === 'future_tendency' &&
          profile.requiredMethodAttribution,
      ),
    ).toBe(true);
  });

  it('renders separate before-jeol and after-jeol consumer sections from actual monthly T9 claims', () => {
    const observed = evidence(snapshot(), 9);
    const themeClaims = observed.bundle.claims.filter(
      (claim) => claim.claimType === GENERAL_MONTHLY_THEME_CLAIM_TYPE.claimType,
    );
    expect(themeClaims).toHaveLength(2);

    const plan = buildClaimNarrativePlan(observed.bundle, GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES);
    const themeItems = plan.items.filter((item) => item.axis === 'core' || item.axis === 'execution');
    expect(themeItems).toHaveLength(2);
    expect(themeItems.map((item) => item.axis)).toEqual(['core', 'execution']);
    expect(themeItems[0]?.sectionTitle).toContain('절입 전');
    expect(themeItems[1]?.sectionTitle).toContain('절입 이후');
    expect(themeItems.every((item) => item.epistemicType === 'future_tendency')).toBe(true);

    const fallback = buildValidatedDeterministicFallback(
      observed.bundle,
      GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES,
    );
    expect(fallback.validation.valid).toBe(true);
    expect(fallback.validation.violations).toEqual([]);
    expect(JSON.stringify(fallback.draft)).not.toContain('무조건');
    expect(JSON.stringify(fallback.draft)).not.toContain('반드시');
  });

  it('changes at least one monthly consumer profile when the target civil month changes', () => {
    const september = buildClaimNarrativePlan(
      evidence(snapshot(), 9).bundle,
      GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES,
    );
    const october = buildClaimNarrativePlan(
      evidence(snapshot(), 10).bundle,
      GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES,
    );
    const themeProfiles = (items: typeof september.items) =>
      items
        .filter((item) => item.axis === 'core' || item.axis === 'execution')
        .map((item) => item.profileRef.id);

    expect(themeProfiles(october.items)).not.toEqual(themeProfiles(september.items));
  });

  it('keeps both monthly phase narratives when birth time is unknown', () => {
    const observed = evidence(snapshot(9, false), 9);
    const plan = buildClaimNarrativePlan(observed.bundle, GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES);

    expect(plan.items.filter((item) => item.axis === 'core' || item.axis === 'execution')).toHaveLength(2);
    expect(
      observed.bundle.claims.filter(
        (claim) => claim.claimType === GENERAL_MONTHLY_THEME_CLAIM_TYPE.claimType,
      ),
    ).toHaveLength(2);
    expect(
      observed.bundle.claims.some(
        (claim) =>
          claim.claimType === GENERAL_MONTHLY_TENSION_CLAIM_TYPE.claimType &&
          (claim.value as { natalPillar?: string }).natalPillar === 'hour',
      ),
    ).toBe(false);
  });

  it('renders a resolved monthly clash only as a bounded future-tendency tension section', () => {
    let checked = false;
    for (let day = 1; day <= 12 && !checked; day += 1) {
      const observed = evidence(snapshot(day), 9);
      const tensionClaim = observed.bundle.claims.find(
        (claim) => claim.claimType === GENERAL_MONTHLY_TENSION_CLAIM_TYPE.claimType,
      );
      if (tensionClaim === undefined) continue;
      const semanticKey = (tensionClaim.value as { semanticKey?: string }).semanticKey;
      if (semanticKey === undefined) throw new Error('monthly tension claim requires semantic key');

      const plan = buildClaimNarrativePlan(observed.bundle, GENERAL_MONTHLY_CLAIM_NARRATIVE_PROFILES);
      const tension = plan.items.find((item) => item.semanticKeys?.includes(semanticKey));
      expect(tension).toMatchObject({ axis: 'tension', epistemicType: 'future_tendency' });
      expect(tension?.assertionText).toContain('특정 사건');
      expect(tension?.assertionText).toContain('확정하지 않습니다');
      checked = true;
    }
    expect(checked).toBe(true);
  });
});
