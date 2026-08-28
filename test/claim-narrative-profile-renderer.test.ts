import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ClaimNarrativeProfile } from '../src/contracts/narrative.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import {
  buildClaimNarrativePlan,
  ClaimNarrativeProfileError,
} from '../src/narrative/claim-narrative-profile.js';
import { buildValidatedDeterministicFallback } from '../src/narrative/deterministic-fallback.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import { CAREER_NATAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/career-natal-narrative-profiles.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';

const FIXED_CALCULATION_TIME = new Date('2026-08-28T00:00:00.000Z');
const FIXED_INTERPRETATION_TIME = new Date('2026-08-28T00:01:00.000Z');
const INTEGRATION_OPTIONS = {
  narrativePolicyRef: { id: 'myeonghwa-narrative-policy', version: '1.0.0-p6-test' },
  outputSchemaVersion: 'myeonghwa-narrative-draft-v1',
} as const;

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

function calculatedSnapshot(minute = 0): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: FIXED_CALCULATION_TIME },
  );
}

function withTenGodFixture(chart: TenGodChartFact): CanonicalSajuSnapshot {
  const base = calculatedSnapshot();
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(chart),
    },
  };
}

function observe(snapshot: CanonicalSajuSnapshot, requestId: string) {
  const registry = createCareerNatalReadingCandidateRegistry(
    FIXED_CALCULATION_TIME.toISOString(),
  );
  const execution = runInterpretation(snapshot, registry, {
    requestId,
    now: FIXED_INTERPRETATION_TIME,
  });
  const prepared = prepareProductReading(
    snapshot,
    execution,
    registry,
    { requestId, text: '직업운' },
    INTEGRATION_OPTIONS,
  );
  if (
    prepared.state !== 'ready_for_narrative' ||
    prepared.composition === undefined ||
    prepared.narrativeRequest === undefined
  ) {
    throw new Error(`Expected ready Career narrative preparation for ${requestId}.`);
  }
  const narrativeRequest = prepared.narrativeRequest;
  const signatures = deriveDomainInterpretationSignatures(
    execution.claims,
    execution.claimRelations,
    prepared.composition.selection,
  );
  if (signatures.length !== 1 || signatures[0] === undefined) {
    throw new Error(`Expected one Career InterpretationSignature for ${requestId}.`);
  }
  return {
    execution,
    prepared,
    narrativeRequest,
    interpretationSignature: signatures[0].signature,
  };
}

function editedProfiles(
  activeClaimType: string,
  edit: (profile: ClaimNarrativeProfile) => ClaimNarrativeProfile,
): readonly ClaimNarrativeProfile[] {
  return CAREER_NATAL_CLAIM_NARRATIVE_PROFILES.map((profile) =>
    profile.claimType === activeClaimType ? edit(profile) : profile,
  );
}

describe('P6 ClaimNarrativeProfile deterministic renderer', () => {
  it('moves Career consumer copy out of semantic claims and renders grounded profile sections in explicit order', () => {
    expect(CAREER_NATAL_CLAIM_NARRATIVE_PROFILES).toHaveLength(20);
    expect(new Set(CAREER_NATAL_CLAIM_NARRATIVE_PROFILES.map((profile) => profile.claimType)).size).toBe(
      20,
    );

    const observed = observe(withTenGodFixture(FIVE_FAMILY_TEN_GODS), 'p6-profile-render');
    const bundle = observed.narrativeRequest.evidenceBundle;

    for (const claim of bundle.claims) {
      expect(claim.value).not.toHaveProperty('headline');
      expect(claim.value).not.toHaveProperty('summary');
    }

    const plan = buildClaimNarrativePlan(bundle, CAREER_NATAL_CLAIM_NARRATIVE_PROFILES);
    const reversedPlan = buildClaimNarrativePlan(
      { ...bundle, claims: [...bundle.claims].reverse() },
      CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
    );
    expect(reversedPlan.items).toEqual(plan.items);
    expect(plan.items.length).toBeGreaterThan(0);
    expect(new Set(plan.items.map((item) => item.claimType))).toEqual(
      new Set(bundle.claims.map((claim) => claim.claimType)),
    );

    const fallback = buildValidatedDeterministicFallback(
      bundle,
      CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
    );
    expect(fallback.validation.valid).toBe(true);
    expect(fallback.validation.violations).toEqual([]);
    expect(fallback.draft.sections.length).toBe(plan.items.length);
    expect(
      fallback.draft.sections.every((section) => section.sectionId.startsWith('claim-profile:')),
    ).toBe(true);

    const encoded = JSON.stringify(fallback.draft);
    expect(encoded).not.toContain('specificOccupationAuthorized');
    expect(encoded).not.toContain('careerSuccessAuthorized');
    expect(encoded).not.toContain('numericScoringAuthorized');
    expect(encoded).toContain('업무 방식');
  });

  it('keeps the same deterministic narrative plan when an actual-engine non-consumed minute change preserves InterpretationSignature', () => {
    const leftSnapshot = calculatedSnapshot(0);
    const rightSnapshot = calculatedSnapshot(30);
    expect(leftSnapshot.calculationHash).not.toBe(rightSnapshot.calculationHash);

    const left = observe(leftSnapshot, 'p6-same-plan-minute-00');
    const right = observe(rightSnapshot, 'p6-same-plan-minute-30');
    expect(left.interpretationSignature).toBe(right.interpretationSignature);

    const leftPlan = buildClaimNarrativePlan(
      left.narrativeRequest.evidenceBundle,
      CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
    );
    const rightPlan = buildClaimNarrativePlan(
      right.narrativeRequest.evidenceBundle,
      CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
    );
    expect(leftPlan.items).toEqual(rightPlan.items);
  });

  it('allows copy/profile version changes without changing T8 InterpretationSignature', () => {
    const snapshot = withTenGodFixture(FIVE_FAMILY_TEN_GODS);
    const before = observe(snapshot, 'p6-copy-before');
    const after = observe(snapshot, 'p6-copy-after');
    expect(before.interpretationSignature).toBe(after.interpretationSignature);

    const bundle = before.narrativeRequest.evidenceBundle;
    const baselinePlan = buildClaimNarrativePlan(bundle, CAREER_NATAL_CLAIM_NARRATIVE_PROFILES);
    const activeClaimType = baselinePlan.items[0]?.claimType;
    if (activeClaimType === undefined) throw new Error('Expected active Career narrative profile.');

    const edited = editedProfiles(activeClaimType, (profile) => ({
      ...profile,
      version: '0.1.1-copy-test',
      templates: (profile.templates ?? []).map((template) =>
        template.templateKey === 'summary'
          ? { ...template, text: `${template.text} 표현만 다듬은 문장입니다.` }
          : template,
      ),
    }));
    const editedPlan = buildClaimNarrativePlan(bundle, edited);
    expect(editedPlan.items).not.toEqual(baselinePlan.items);
    expect(before.interpretationSignature).toBe(after.interpretationSignature);
  });

  it('rejects a profile template that contains a prohibited high-risk phrase', () => {
    const observed = observe(withTenGodFixture(FIVE_FAMILY_TEN_GODS), 'p6-prohibited-copy');
    const bundle = observed.narrativeRequest.evidenceBundle;
    const activeClaimType = bundle.claims[0]?.claimType;
    if (activeClaimType === undefined) throw new Error('Expected an active Career claim.');

    const invalid = editedProfiles(activeClaimType, (profile) => ({
      ...profile,
      templates: (profile.templates ?? []).map((template) =>
        template.templateKey === 'summary'
          ? { ...template, text: '이 구조라면 무조건 승진한다.' }
          : template,
      ),
    }));

    try {
      buildClaimNarrativePlan(bundle, invalid);
      throw new Error('Expected prohibited narrative phrase rejection.');
    } catch (error) {
      expect(error).toBeInstanceOf(ClaimNarrativeProfileError);
      expect((error as ClaimNarrativeProfileError).code).toBe('PROHIBITED_PHRASE_PRESENT');
    }
  });
});
