import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildClaimNarrativePlan } from '../src/narrative/claim-narrative-profile.js';
import { buildValidatedDeterministicFallback } from '../src/narrative/deterministic-fallback.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildAnnualInterpretationFacts } from '../src/reading/annual-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/general-annual-narrative-profiles.js';
import {
  GENERAL_ANNUAL_TENSION_CLAIM_TYPE,
  GENERAL_ANNUAL_THEME_CLAIM_TYPE,
  createGeneralAnnualReadingCandidateRegistry,
} from '../src/research/general-annual-reading-candidate.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');

function snapshot(timeKnown = true): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day: 9 },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}

function annualRequest(year: number): ReadingRequest {
  return {
    requestId: `annual-narrative-${year}`,
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      resolution: 'relative_current',
    },
  };
}

function temporalFacts(value: CanonicalSajuSnapshot, year: number) {
  const context = buildTemporalReadingContext(annualRequest(year));
  if (context === undefined) throw new Error('annual request must produce temporal context');
  return { ...buildAnnualInterpretationFacts(value, context) };
}

function evidence(value: CanonicalSajuSnapshot, year: number) {
  const registry = createGeneralAnnualReadingCandidateRegistry();
  const execution = runInterpretation(value, registry, {
    requestId: `annual-narrative-${year}`,
    temporalFacts: temporalFacts(value, year),
    now: NOW,
  });
  const composition = buildReadingCompositionEvidence(
    value,
    execution,
    registry,
    annualRequest(year),
    { narrativePolicyVersion: 'myeongha-general-annual-narrative-v1' },
  );
  if (composition.evidence === undefined) throw new Error('annual narrative evidence must be available');
  return { execution, bundle: composition.evidence.bundle };
}

function withDayBranchClash(value: CanonicalSajuSnapshot): CanonicalSajuSnapshot {
  if (value.pillars.day.status !== 'resolved') throw new Error('fixture requires resolved day pillar');
  const day: PillarFact = {
    ...value.pillars.day.value,
    branch: { value: '자', hanja: '子', element: '수', yinYang: '양' },
  };
  return { ...value, pillars: { ...value.pillars, day: resolved(day) } };
}

describe('MyeongHa general annual consumer narrative profiles', () => {
  it('registers ten semantic annual themes plus four bounded clash-tension profiles', () => {
    expect(GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES).toHaveLength(14);
    expect(new Set(GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES.map((profile) => profile.profileId)).size).toBe(14);
    expect(
      GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType,
      ),
    ).toHaveLength(10);
    expect(
      GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType,
      ),
    ).toHaveLength(4);
    expect(
      GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES.every(
        (profile) =>
          profile.allowedEpistemicTypes.length === 1 &&
          profile.allowedEpistemicTypes[0] === 'future_tendency' &&
          profile.requiredMethodAttribution,
      ),
    ).toBe(true);
  });

  it('renders the actual annual activation with the semantic-key-specific consumer profile', () => {
    const observed = evidence(snapshot(), 2026);
    const activation = observed.bundle.claims.find(
      (claim) => claim.claimType === GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType,
    );
    if (activation === undefined) throw new Error('expected annual activation claim');
    const semanticKey = (activation.value as { semanticKey?: string }).semanticKey;
    if (semanticKey === undefined) throw new Error('expected annual activation semantic key');

    const plan = buildClaimNarrativePlan(observed.bundle, GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES);
    const coreItems = plan.items.filter((item) => item.axis === 'core');
    expect(coreItems).toHaveLength(1);
    expect(coreItems[0]?.semanticKeys).toContain(semanticKey);
    expect(coreItems[0]?.epistemicType).toBe('future_tendency');

    const fallback = buildValidatedDeterministicFallback(
      observed.bundle,
      GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES,
    );
    expect(fallback.validation.valid).toBe(true);
    expect(fallback.validation.violations).toEqual([]);
    expect(fallback.draft.sections.length).toBe(plan.items.length);
    expect(JSON.stringify(fallback.draft)).not.toContain('무조건');
    expect(JSON.stringify(fallback.draft)).not.toContain('반드시');
  });

  it('changes the selected annual consumer profile when the target-year semantic activation changes', () => {
    const first = evidence(snapshot(), 2026);
    const second = evidence(snapshot(), 2027);
    const firstPlan = buildClaimNarrativePlan(first.bundle, GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES);
    const secondPlan = buildClaimNarrativePlan(second.bundle, GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES);
    const firstCore = firstPlan.items.find((item) => item.axis === 'core');
    const secondCore = secondPlan.items.find((item) => item.axis === 'core');

    expect(firstCore).toBeDefined();
    expect(secondCore).toBeDefined();
    expect(firstCore?.profileRef.id).not.toBe(secondCore?.profileRef.id);
    expect(firstCore?.assertionText).not.toBe(secondCore?.assertionText);
  });

  it('keeps a useful annual core narrative when birth time is unknown', () => {
    const observed = evidence(snapshot(false), 2026);
    const plan = buildClaimNarrativePlan(observed.bundle, GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES);

    expect(plan.items.some((item) => item.axis === 'core')).toBe(true);
    expect(
      observed.bundle.claims.some(
        (claim) => claim.claimType === GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType,
      ),
    ).toBe(true);
  });

  it('renders a resolved day-pillar clash only as a future-tendency tension section', () => {
    const observed = evidence(withDayBranchClash(snapshot()), 2026);
    const tensionClaim = observed.bundle.claims.find(
      (claim) =>
        claim.claimType === GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType &&
        (claim.value as { semanticKey?: string }).semanticKey === 'ANNUAL_BRANCH_CLASH_DAY',
    );
    expect(tensionClaim).toBeDefined();

    const plan = buildClaimNarrativePlan(observed.bundle, GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES);
    const tension = plan.items.find((item) => item.semanticKeys?.includes('ANNUAL_BRANCH_CLASH_DAY'));
    expect(tension).toMatchObject({ axis: 'tension', epistemicType: 'future_tendency' });
    expect(tension?.assertionText).toContain('특정 사건');
    expect(tension?.assertionText).toContain('확정하지 않습니다');
  });
});
