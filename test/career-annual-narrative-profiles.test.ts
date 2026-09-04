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
  CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES,
  CAREER_ANNUAL_MANDATORY_QUALIFIER,
  CAREER_ANNUAL_PROHIBITED_FUTURE_PHRASES,
} from '../src/research/career-annual-narrative-profiles.js';
import {
  CAREER_ANNUAL_TENSION_CLAIM_TYPE,
  CAREER_ANNUAL_THEME_CLAIM_TYPE,
  createCareerAnnualReadingCandidateRegistry,
} from '../src/research/career-annual-reading-candidate.js';

const NOW = new Date('2026-09-04T01:00:00.000Z');

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
    requestId: `career-annual-narrative-${year}`,
    intent: { domain: 'career', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      resolution: 'explicit',
    },
  };
}

function evidence(value: CanonicalSajuSnapshot, year: number) {
  const request = annualRequest(year);
  const context = buildTemporalReadingContext(request);
  if (context === undefined) throw new Error('career annual request must produce temporal context');
  const registry = createCareerAnnualReadingCandidateRegistry();
  const execution = runInterpretation(value, registry, {
    requestId: request.requestId,
    temporalFacts: { ...buildAnnualInterpretationFacts(value, context) },
    now: NOW,
  });
  const composition = buildReadingCompositionEvidence(value, execution, registry, request, {
    narrativePolicyVersion: 'myeongha-career-annual-narrative-v1',
  });
  if (composition.evidence === undefined) throw new Error('career annual narrative evidence must exist');
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

describe('MyeongHa Career Annual narrative profiles', () => {
  it('registers ten semantic themes and four bounded branch-clash profiles', () => {
    expect(CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES).toHaveLength(14);
    expect(new Set(CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES.map((profile) => profile.profileId)).size).toBe(14);
    expect(
      CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === CAREER_ANNUAL_THEME_CLAIM_TYPE.claimType,
      ),
    ).toHaveLength(10);
    expect(
      CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === CAREER_ANNUAL_TENSION_CLAIM_TYPE.claimType,
      ),
    ).toHaveLength(4);
  });

  it('enforces future-tendency-only epistemics, method attribution, qualifier, and deterministic-event bans', () => {
    for (const profile of CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES) {
      expect(profile.allowedEpistemicTypes).toEqual(['future_tendency']);
      expect(profile.requiredMethodAttribution).toBe(true);
      expect(profile.mandatoryQualifier).toBe(CAREER_ANNUAL_MANDATORY_QUALIFIER);
      expect(profile.prohibitedPhrases).toEqual(CAREER_ANNUAL_PROHIBITED_FUTURE_PHRASES);
      const profileText = JSON.stringify(profile.templates);
      for (const forbidden of CAREER_ANNUAL_PROHIBITED_FUTURE_PHRASES) {
        expect(profileText).not.toContain(forbidden);
      }
    }
  });

  it('selects a semantic-key-specific annual profile and produces a valid governed fallback', () => {
    const bundle = evidence(snapshot(), 2026);
    const activation = bundle.claims.find(
      (claim) => claim.claimType === CAREER_ANNUAL_THEME_CLAIM_TYPE.claimType,
    );
    if (activation === undefined) throw new Error('expected Career Annual activation');
    const semanticKey = (activation.value as { semanticKey?: string }).semanticKey;
    if (semanticKey === undefined) throw new Error('expected semantic key');

    const plan = buildClaimNarrativePlan(bundle, CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES);
    const annualItem = plan.items.find((item) => item.semanticKeys?.includes(semanticKey));
    expect(annualItem).toBeDefined();
    expect(annualItem?.epistemicType).toBe('future_tendency');
    expect(annualItem?.assertionText).toContain('경향');

    const fallback = buildValidatedDeterministicFallback(
      bundle,
      CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES,
    );
    expect(fallback.validation.valid).toBe(true);
    expect(fallback.validation.violations).toEqual([]);
    expect(JSON.stringify(fallback.draft)).toContain('특정 사건이나 결과를 확정하지 않습니다');
  });

  it('changes the annual semantic profile when target year changes', () => {
    const first = buildClaimNarrativePlan(
      evidence(snapshot(), 2026),
      CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES,
    );
    const second = buildClaimNarrativePlan(
      evidence(snapshot(), 2027),
      CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES,
    );
    const firstAnnual = first.items.find((item) =>
      item.semanticKeys?.some((key) => key.startsWith('CAREER_ANNUAL_') && !key.includes('BRANCH_CLASH')),
    );
    const secondAnnual = second.items.find((item) =>
      item.semanticKeys?.some((key) => key.startsWith('CAREER_ANNUAL_') && !key.includes('BRANCH_CLASH')),
    );

    expect(firstAnnual).toBeDefined();
    expect(secondAnnual).toBeDefined();
    expect(firstAnnual?.profileRef.id).not.toBe(secondAnnual?.profileRef.id);
    expect(firstAnnual?.assertionText).not.toBe(secondAnnual?.assertionText);
  });

  it('keeps annual narrative usable with unknown birth time and does not synthesize an hour clash section', () => {
    const bundle = evidence(snapshot(false), 2026);
    const plan = buildClaimNarrativePlan(bundle, CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES);

    expect(
      bundle.claims.some((claim) => claim.claimType === CAREER_ANNUAL_THEME_CLAIM_TYPE.claimType),
    ).toBe(true);
    expect(
      plan.items.some((item) => item.semanticKeys?.includes('CAREER_ANNUAL_BRANCH_CLASH_HOUR')),
    ).toBe(false);
  });

  it('renders a resolved clash only as a bounded work-adjustment tension', () => {
    const bundle = evidence(withDayBranchClash(snapshot()), 2026);
    const plan = buildClaimNarrativePlan(bundle, CAREER_ANNUAL_CLAIM_NARRATIVE_PROFILES);
    const tension = plan.items.find((item) =>
      item.semanticKeys?.includes('CAREER_ANNUAL_BRANCH_CLASH_DAY'),
    );

    expect(tension).toMatchObject({ axis: 'tension', epistemicType: 'future_tendency' });
    expect(tension?.assertionText).toContain('업무 역할');
    expect(tension?.assertionText).toContain('특정 직업 사건');
  });
});
