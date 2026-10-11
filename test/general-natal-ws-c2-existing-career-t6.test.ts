import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import {
  createGeneralNatalPositionQualifiedResearchRegistry,
  createGeneralNatalPositionQualifiedCareerT6ResearchRegistry,
} from '../src/interpretation/general-natal-position-qualified-reading.js';
import type {
  CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
} from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import {
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_CONTEXT_RULES,
} from '../src/research/career-personalized-t6-branch-clash-hidden-stem-context.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';

const now = new Date('2026-10-11T00:00:00.000Z');
const dates = [
  { year: 1984, month: 5, day: 20 },
  { year: 1984, month: 6, day: 14 },
  { year: 1984, month: 2, day: 6 },
  { year: 1992, month: 10, day: 24 },
  { year: 2000, month: 1, day: 15 },
  { year: 2001, month: 8, day: 11 },
  { year: 2010, month: 9, day: 15 },
  { year: 2024, month: 3, day: 10 },
] as const;

// Synthetic gate witness for the test only. The production-facing opt-in
// function requires the pre-existing bounded P4 review and validates it.
const p4 = {
  status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
  decision: 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
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

function chart(date: { readonly year: number; readonly month: number; readonly day: number }, known = true) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date,
    time: known ? { known: true, hour: 5, minute: 30 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
}

describe('WS-C2 reuse existing authorized-scope T6 in one General Natal interpretation', () => {
  it('rejects an unauthorized P4 scope instead of promoting a research rule', () => {
    expect(() => createGeneralNatalPositionQualifiedCareerT6ResearchRegistry({
      ...p4,
      status: 'UPSTREAM_BOUNDARY_INVALID',
    })).toThrow('P4 Career T6 gate');
  });

  it('executes exact T5, bounded T6 and unchanged General T8 on calculated charts', () => {
    const registry = createGeneralNatalPositionQualifiedCareerT6ResearchRegistry(p4);
    const baseline = createGeneralNatalPositionQualifiedResearchRegistry();
    expect(registry.pack.status).toBe('research');
    expect(registry.rules.filter((rule) => rule.taxonomy.tier === 'T6')).toHaveLength(
      CAREER_T6_BRANCH_CLASH_CONTEXT_RULES.length,
    );
    expect(registry.claimTypeDefinitions.find((definition) =>
      definition.claimType === CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE
    )?.materialForNarrative).toBe(false);

    let positive = 0;
    for (const date of dates) {
      const snapshot = chart(date);
      const execution = runInterpretation(snapshot, registry, { now });
      const oldExecution = runInterpretation(snapshot, baseline, { now });
      expect(execution.integrity.valid).toBe(true);
      expect(runInterpretation(snapshot, registry, { now })).toEqual(execution);

      const t6 = execution.claims.filter((claim) =>
        claim.claimType === CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
      );
      const contexts = snapshot.derivedFacts.branchClashContexts;
      expect(t6).toHaveLength(contexts?.status === 'resolved'
        ? Object.keys(contexts.value).length : 0);
      positive += t6.length;
      for (const claim of t6) {
        expect(claim.taxonomy).toMatchObject({ tier: 'T6', category: 'career' });
        expect(claim.factRefs.some((ref) => ref.startsWith('derivedFacts.branchClashContexts'))).toBe(true);
        expect((claim.value as { effectSettlement: string }).effectSettlement).toBe('not_authorized');
        expect(claim.upstreamClaimRefs).toEqual([]);
      }
      const oldT8 = oldExecution.claims.filter((claim) => claim.taxonomy.tier === 'T8')
        .map((claim) => ({ type: claim.claimType, value: claim.value }))
        .sort((a, b) => a.type.localeCompare(b.type));
      const newT8 = execution.claims.filter((claim) => claim.taxonomy.tier === 'T8')
        .map((claim) => ({ type: claim.claimType, value: claim.value }))
        .sort((a, b) => a.type.localeCompare(b.type));
      expect(newT8).toEqual(oldT8);
      for (const claim of execution.claims.filter((item) => item.taxonomy.tier === 'T8')) {
        expect(claim.upstreamClaimRefs.every((ref) =>
          t6.every((context) => context.claimId !== ref)
        )).toBe(true);
      }
      const reading = buildReadingCompositionEvidence(snapshot, execution, registry, {
        requestId: 'ws-c2-bounded-existing-t6',
        intent: { domain: 'general', temporalScope: 'natal' },
      });
      expect(reading.selection.coverageState).toBe('complete');
      expect(reading.selection.selectedClaimIds.every((id) =>
        t6.every((claim) => claim.claimId !== id)
      )).toBe(true);
    }
    expect(positive).toBeGreaterThan(0);
    expect(inspectMyeonghwaProductionComposition({ registry }).status).toBe('blocked');
    expect(baseline.rules.some((rule) => rule.taxonomy.tier === 'T6')).toBe(false);
  });

  it('keeps unknown-hour and unresolved branch contexts fail-closed', () => {
    const snapshot = chart(dates[0]!, false);
    const registry = createGeneralNatalPositionQualifiedCareerT6ResearchRegistry(p4);
    const execution = runInterpretation(snapshot, registry, { now });
    const t6 = execution.claims.filter((claim) =>
      claim.claimType === CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE
    );
    const contexts = snapshot.derivedFacts.branchClashContexts;
    expect(t6).toHaveLength(contexts?.status === 'resolved'
      ? Object.keys(contexts.value).length : 0);
    const unavailable = {
      ...snapshot,
      derivedFacts: {
        ...snapshot.derivedFacts,
        branchClashContexts: { status: 'unavailable' as const, reasonCode: 'test-unresolved' },
      },
    };
    const closed = runInterpretation(unavailable, registry, { now });
    expect(closed.claims.some((claim) =>
      claim.claimType === CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE
    )).toBe(false);
  });
});
