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
import {
  WEALTH_ANNUAL_CLAIM_NARRATIVE_PROFILES,
  WEALTH_ANNUAL_MANDATORY_QUALIFIER,
  WEALTH_ANNUAL_PROHIBITED_FUTURE_PHRASES,
} from '../src/research/wealth-annual-narrative-profiles.js';
import {
  WEALTH_ANNUAL_TENSION_CLAIM_TYPE,
  WEALTH_ANNUAL_THEME_CLAIM_TYPE,
  createWealthAnnualReadingCandidateRegistry,
} from '../src/research/wealth-annual-reading-candidate.js';
import { WEALTH_NATAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/wealth-natal-narrative-profiles.js';

const NOW = new Date('2026-09-04T01:00:00.000Z');
const ALL_PROFILES = [
  ...WEALTH_NATAL_CLAIM_NARRATIVE_PROFILES,
  ...WEALTH_ANNUAL_CLAIM_NARRATIVE_PROFILES,
] as const;

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
    requestId: `wealth-annual-narrative-${year}`,
    intent: { domain: 'wealth', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      resolution: 'relative_current',
    },
  };
}

function evidence(value: CanonicalSajuSnapshot, year: number) {
  const request = annualRequest(year);
  const context = buildTemporalReadingContext(request);
  if (context === undefined) throw new Error('wealth annual request must produce temporal context');
  const registry = createWealthAnnualReadingCandidateRegistry();
  const execution = runInterpretation(value, registry, {
    requestId: request.requestId,
    temporalFacts: { ...buildAnnualInterpretationFacts(value, context) },
    now: NOW,
  });
  const composition = buildReadingCompositionEvidence(value, execution, registry, request, {
    narrativePolicyVersion: 'myeongha-wealth-annual-narrative-v1',
  });
  if (composition.evidence === undefined) throw new Error('wealth annual narrative evidence must exist');
  return composition.evidence.bundle;
}

function withDayBranchClash(value: CanonicalSajuSnapshot): CanonicalSajuSnapshot {
  if (value.pillars.day.status !== 'resolved') throw new Error('fixture requires resolved day pillar');
  const day: PillarFact = {
    ...value.pillars.day.value,
    branch: { value: '자', hanja: '子', element: '수', yinYang: '양' },
  };
  return { ...value, pillars: { ...value.pillars, day: resolved(day) } };
}

describe('MyeongHa Wealth Annual narrative profiles', () => {
  it('registers ten annual themes and four bounded branch-clash profiles', () => {
    expect(WEALTH_ANNUAL_CLAIM_NARRATIVE_PROFILES).toHaveLength(14);
    expect(new Set(WEALTH_ANNUAL_CLAIM_NARRATIVE_PROFILES.map((profile) => profile.profileId)).size).toBe(14);
    expect(
      WEALTH_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === WEALTH_ANNUAL_THEME_CLAIM_TYPE,
      ),
    ).toHaveLength(10);
    expect(
      WEALTH_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === WEALTH_ANNUAL_TENSION_CLAIM_TYPE,
      ),
    ).toHaveLength(4);
    expect(WEALTH_NATAL_CLAIM_NARRATIVE_PROFILES.length).toBeGreaterThan(0);
  });

  it('enforces future-tendency epistemics, method attribution, non-advisory qualifier, and outcome bans', () => {
    for (const profile of WEALTH_ANNUAL_CLAIM_NARRATIVE_PROFILES) {
      expect(profile.allowedEpistemicTypes).toEqual(['future_tendency']);
      expect(profile.requiredMethodAttribution).toBe(true);
      expect(profile.mandatoryQualifier).toBe(WEALTH_ANNUAL_MANDATORY_QUALIFIER);
      expect(profile.prohibitedPhrases).toEqual(WEALTH_ANNUAL_PROHIBITED_FUTURE_PHRASES);
      const profileText = JSON.stringify(profile.templates);
      for (const forbidden of WEALTH_ANNUAL_PROHIBITED_FUTURE_PHRASES) {
        expect(profileText).not.toContain(forbidden);
      }
    }
  });

  it('selects the annual semantic profile and produces a valid governed fallback with natal context', () => {
    const bundle = evidence(snapshot(), 2026);
    const activation = bundle.claims.find(
      (claim) => claim.claimType === WEALTH_ANNUAL_THEME_CLAIM_TYPE,
    );
    if (activation === undefined) throw new Error('expected Wealth Annual activation');
    const semanticKey = (activation.value as { semanticKey?: string }).semanticKey;
    if (semanticKey === undefined) throw new Error('expected semantic key');

    const plan = buildClaimNarrativePlan(bundle, ALL_PROFILES);
    const annualItem = plan.items.find((item) => item.semanticKeys?.includes(semanticKey));
    expect(annualItem).toBeDefined();
    expect(annualItem?.epistemicType).toBe('future_tendency');

    const fallback = buildValidatedDeterministicFallback(bundle, ALL_PROFILES);
    expect(fallback.validation.valid).toBe(true);
    expect(fallback.validation.violations).toEqual([]);
    const text = JSON.stringify(fallback.draft);
    expect(text).toContain('금융 조언을 제공하지 않습니다');
    expect(text).toContain('예측하거나');
  });

  it('changes the annual semantic profile when target year changes', () => {
    const first = buildClaimNarrativePlan(evidence(snapshot(), 2026), ALL_PROFILES);
    const second = buildClaimNarrativePlan(evidence(snapshot(), 2027), ALL_PROFILES);
    const firstAnnual = first.items.find((item) =>
      item.semanticKeys?.some((key) => key.startsWith('WEALTH_ANNUAL_') && !key.includes('BRANCH_CLASH')),
    );
    const secondAnnual = second.items.find((item) =>
      item.semanticKeys?.some((key) => key.startsWith('WEALTH_ANNUAL_') && !key.includes('BRANCH_CLASH')),
    );

    expect(firstAnnual).toBeDefined();
    expect(secondAnnual).toBeDefined();
    expect(firstAnnual?.profileRef.id).not.toBe(secondAnnual?.profileRef.id);
    expect(firstAnnual?.assertionText).not.toBe(secondAnnual?.assertionText);
  });

  it('does not synthesize an hour-clash narrative when birth time is unknown', () => {
    const bundle = evidence(snapshot(false), 2026);
    const plan = buildClaimNarrativePlan(bundle, ALL_PROFILES);

    expect(bundle.claims.some((claim) => claim.claimType === WEALTH_ANNUAL_THEME_CLAIM_TYPE)).toBe(true);
    expect(
      plan.items.some((item) => item.semanticKeys?.includes('WEALTH_ANNUAL_BRANCH_CLASH_HOUR')),
    ).toBe(false);
  });

  it('renders a resolved clash only as bounded financial-plan adjustment tension', () => {
    const bundle = evidence(withDayBranchClash(snapshot()), 2026);
    const plan = buildClaimNarrativePlan(bundle, ALL_PROFILES);
    const tension = plan.items.find((item) =>
      item.semanticKeys?.includes('WEALTH_ANNUAL_BRANCH_CLASH_DAY'),
    );

    expect(tension).toMatchObject({ axis: 'tension', epistemicType: 'future_tendency' });
    expect(tension?.assertionText).toContain('예산');
    expect(tension?.assertionText).toContain('특정 금전 사건');
    expect(tension?.assertionText).toContain('금융 조언을 제공하지 않습니다');
  });
});
