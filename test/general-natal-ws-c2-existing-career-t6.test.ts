import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';
import { executeGeneralNatalC5SharedDomainResearch } from '../src/interpretation/general-natal-c5-domain-execution.js';
import {
  createGeneralNatalPositionQualifiedResearchRegistry,
  createGeneralNatalPositionQualifiedCareerT6ResearchRegistry,
  executeGeneralNatalPositionQualifiedC2Research,
  executeGeneralNatalPositionQualifiedC3Research,
  executeGeneralNatalPositionQualifiedC4Research,
} from '../src/interpretation/general-natal-position-qualified-reading.js';
import type {
  CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
} from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import {
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_CONTEXT_RULES,
} from '../src/research/career-personalized-t6-branch-clash-hidden-stem-context.js';
import { bindGeneralNatalC4MethodScopedEvidence } from '../src/interpretation/general-natal-c4-method-scoped-evidence.js';
import { buildGeneralNatalGejuSelectionSignalObservation } from '../src/research/general-natal-geju-selection-signal-observation.js';
import { bindGeneralNatalC3StructuralEvidence } from '../src/interpretation/general-natal-c3-structural-evidence.js';
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

  it('binds visible-stem settlements to exact T5 in the same T6/T8 run', () => {
    const baselineRegistry = createGeneralNatalPositionQualifiedResearchRegistry();
    let bound = 0;
    for (const date of dates) {
      const snapshot = chart(date);
      const run = executeGeneralNatalPositionQualifiedC2Research(snapshot, p4, { now });
      expect(run.interpretation.integrity.valid).toBe(true);
      expect(executeGeneralNatalPositionQualifiedC2Research(snapshot, p4, { now }))
        .toEqual(run);
      const existing = runInterpretation(snapshot, baselineRegistry, { now });
      expect(run.interpretation.claims.filter((claim) => claim.taxonomy.tier === 'T8')
        .map((claim) => ({ type: claim.claimType, value: claim.value }))
        .sort((left, right) => left.type.localeCompare(right.type)))
        .toEqual(existing.claims.filter((claim) => claim.taxonomy.tier === 'T8')
          .map((claim) => ({ type: claim.claimType, value: claim.value }))
          .sort((left, right) => left.type.localeCompare(right.type)));
      const settlement = snapshot.derivedFacts.stemInteractionSettlements;
      if (settlement?.status === 'resolved') {
        expect(run.stemEvidence.status).toBe('resolved');
        if (run.stemEvidence.status !== 'resolved') continue;
        expect(run.stemEvidence.witnesses).toHaveLength(settlement.value.length * 2);
        for (const witness of run.stemEvidence.witnesses) {
          bound += 1;
          const original = settlement.value.find((value) =>
            value.settlementId === witness.settlementId);
          expect(original).toBeDefined();
          expect(witness.functionState).toBe(
            original?.participants[witness.participantRole].functionState,
          );
          expect(witness.pairControlEffective).toBe(original?.pairControlEffective);
          expect(witness.tenGod).toBe(original?.participants[witness.participantRole].tenGod);
          expect(run.interpretation.claims.find((claim) =>
            claim.claimId === witness.claimId)?.factRefs)
            .toContain(witness.sourceFactRef);
          expect(witness.t6EffectClaimAuthorized).toBe(false);
          expect(witness.consumerProjectionAuthorized).toBe(false);
        }
      } else {
        expect(run.stemEvidence.status).not.toBe('resolved');
      }
      const reading = buildReadingCompositionEvidence(snapshot, run.interpretation, run.registry, {
        requestId: 'ws-c2-same-run',
        intent: { domain: 'general', temporalScope: 'natal' },
      });
      expect(reading.selection.coverageState).toBe('complete');
      expect(reading.selection.selectedClaimIds.every((id) => {
        const claim = run.interpretation.claims.find((item) => item.claimId === id);
        return claim?.taxonomy.tier !== 'T6';
      })).toBe(true);
    }
    expect(bound).toBeGreaterThan(0);
  });

  it('does not silently turn unresolved canonical stems into an empty resolved pair', () => {
    const unknown = chart(dates[0]!, false);
    const result = executeGeneralNatalPositionQualifiedC2Research(unknown, p4, { now });
    const state = unknown.derivedFacts.stemInteractionSettlements;
    if (state?.status !== 'resolved') {
      expect(result.stemEvidence.status).toBe(state?.status ?? 'unavailable');
    }
    const blocked = {
      ...unknown,
      derivedFacts: {
        ...unknown.derivedFacts,
        stemInteractionSettlements: {
          status: 'unavailable' as const,
          reasonCode: 'birth_hour_unresolved',
        },
      },
    };
    const closed = executeGeneralNatalPositionQualifiedC2Research(blocked, p4, { now });
    expect(closed.stemEvidence).toEqual({
      status: 'unavailable',
      reasonCode: 'birth_hour_unresolved',
    });
    expect(closed.interpretation.claims.some((claim) =>
      claim.taxonomy.tier === 'T6' && claim.predicate.includes('stem_effect'),
    )).toBe(false);
  });

  it('C3 combines original month direction with seven exact T5 positions and raw hidden stems', () => {
    const seen = new Set<string>();
    for (const date of dates) {
      const snapshot = chart(date);
      const c3 = executeGeneralNatalPositionQualifiedC3Research(snapshot, p4, { now });
      const rerun = executeGeneralNatalPositionQualifiedC3Research(snapshot, p4, { now });
      expect(rerun).toEqual(c3);
      expect(c3.interpretation.integrity.valid).toBe(true);
      const evidence = c3.c3Evidence;
      expect(evidence.snapshotId).toBe(snapshot.snapshotId);
      expect(evidence.interpretationRunId).toBe(c3.interpretation.run.interpretationRunId);
      expect(evidence.month.status).toBe('resolved');
      const monthEvidence = evidence.month;
      if (monthEvidence.status === 'resolved') {
        seen.add(monthEvidence.direction);
        const monthClaim = c3.interpretation.claims.find((claim) =>
          claim.claimId === monthEvidence.claimId);
        expect(monthClaim?.claimType).toBe('DAY_MASTER_MONTH_BRANCH_EVIDENCE');
        expect(monthClaim?.value).toMatchObject({
          relation: monthEvidence.relation,
          direction: monthEvidence.direction,
          weight: 'not_assigned',
          overallStrength: 'not_determined',
        });
        expect(c3.interpretation.claims.some((claim) =>
          claim.claimId === monthEvidence.guardClaimId &&
          claim.claimType === 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD'
        )).toBe(true);
      }
      expect(evidence.positionedTenGods).toHaveLength(7);
      expect(evidence.hiddenStemObservations).toHaveLength(4);
      for (const item of evidence.positionedTenGods) {
        expect(item.sourceFactRef).toBe(
          `derivedFacts.tenGods.${item.pillar}.${item.component}`,
        );
        if (item.status !== 'resolved') continue;
        const linked = c3.interpretation.claims.find((claim) =>
          claim.claimId === item.claimId);
        expect(linked?.claimType).toBe(
          `TEN_GOD_${item.family!.toUpperCase()}_${item.component === 'stem'
            ? 'VISIBLE_STEMS' : 'BRANCHES'}_THEME`,
        );
        expect(linked?.factRefs).toEqual([item.sourceFactRef]);
        if (snapshot.derivedFacts.tenGods.status === 'resolved') {
          const canonical = snapshot.derivedFacts.tenGods.value[item.pillar][item.component];
          expect(canonical?.status).toBe('resolved');
          if (canonical?.status === 'resolved') expect(item.tenGod).toBe(canonical.value);
        }
      }
      for (const item of evidence.hiddenStemObservations) {
        const fact = snapshot.derivedFacts.hiddenStems?.[item.pillar];
        expect(item.sourceFactRef).toBe(`derivedFacts.hiddenStems.${item.pillar}`);
        expect(item.status).toBe(fact?.status ?? 'unavailable');
        if (item.status === 'resolved') {
          expect(item.stems).toEqual(fact?.status === 'resolved' ? fact.value : undefined);
        }
      }
      expect(evidence.root).toEqual({
        status: 'not_authorized',
        tonggen: 'not_determined',
        fourPillarHasRoot: 'not_determined',
        rootWeight: 'not_assigned',
      });
      expect(evidence.synthesis).toMatchObject({
        scope: 'independent_evidence_axes_only',
        finalStrength: 'not_determined',
        numericStrength: 'not_authorized',
        consumerProjectionAuthorized: false,
      });
      const selection = buildReadingCompositionEvidence(snapshot, c3.interpretation, c3.registry, {
        requestId: 'ws-c3-internal-axes',
        intent: { domain: 'general', temporalScope: 'natal' },
      });
      expect(selection.selection.coverageState).toBe('complete');
      expect(selection.selection.targetClaimIds.every((id) =>
        c3.interpretation.claims.find((claim) => claim.claimId === id)?.taxonomy.tier === 'T8'
      )).toBe(true);
      // Existing month T2 evidence is already valid upstream reading context.
      // C3 adds no new claim to the existing interpretation or product selection.
      const baseline = executeGeneralNatalPositionQualifiedC2Research(snapshot, p4, { now });
      const priorSelection = buildReadingCompositionEvidence(snapshot, baseline.interpretation,
        baseline.registry, {
          requestId: 'ws-c3-internal-axes',
          intent: { domain: 'general', temporalScope: 'natal' },
        });
      expect(selection.selection).toEqual(priorSelection.selection);
    }
    expect(seen).toEqual(new Set(['supporting', 'challenging']));
  });

  it('C3 rejects mismatched execution and missing or duplicated month source claims', () => {
    const snapshot = chart(dates[0]!);
    const c2 = executeGeneralNatalPositionQualifiedC2Research(snapshot, p4, { now });
    expect(() => bindGeneralNatalC3StructuralEvidence(snapshot, {
      ...c2.interpretation,
      run: { ...c2.interpretation.run, snapshotHash: 'stale' },
    })).toThrow('WS_C3_SNAPSHOT_MISMATCH');
    const guard = c2.interpretation.claims.find((claim) =>
      claim.claimType === 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD');
    expect(guard).toBeDefined();
    expect(() => bindGeneralNatalC3StructuralEvidence(snapshot, {
      ...c2.interpretation,
      claims: c2.interpretation.claims.filter((claim) => claim.claimId !== guard?.claimId),
    })).toThrow('WS_C3_MONTH_EVIDENCE_NOT_UNIQUE');
    if (guard !== undefined) {
      expect(() => bindGeneralNatalC3StructuralEvidence(snapshot, {
        ...c2.interpretation,
        claims: [...c2.interpretation.claims, { ...guard, claimId: 'fake-duplicate' }],
      })).toThrow('WS_C3_MONTH_EVIDENCE_NOT_UNIQUE');
    }
    expect(() => bindGeneralNatalC3StructuralEvidence(snapshot, {
      ...c2.interpretation,
      integrity: { valid: false, errors: ['tamper'] },
    })).toThrow('WS_C3_CLAIM_GRAPH_INVALID');
  });

  it('C3 retains unknown-hour unavailability without inventing no root or final strength', () => {
    const snapshot = chart(dates[0]!, false);
    const result = executeGeneralNatalPositionQualifiedC3Research(snapshot, p4, { now });
    const hour = result.c3Evidence.positionedTenGods.find((item) =>
      item.pillar === 'hour' && item.component === 'stem');
    expect(hour).toBeDefined();
    expect(hour?.status).not.toBe('resolved');
    expect(result.c3Evidence.root.status).toBe('not_authorized');
    expect(result.c3Evidence.synthesis.finalStrength).toBe('not_determined');
    expect(result.c3Evidence.month.status).toBe('resolved');
  });

  it('C4 reuses exact source-governed Gyeokguk signals without inventing candidates', () => {
    const observed = new Set<string>();
    for (const date of dates) {
      const snapshot = chart(date);
      const c4 = executeGeneralNatalPositionQualifiedC4Research(snapshot, p4, { now });
      const c3 = executeGeneralNatalPositionQualifiedC3Research(snapshot, p4, { now });
      expect(c4.interpretation).toEqual(c3.interpretation);
      expect(c4.c3Evidence).toEqual(c3.c3Evidence);
      expect(executeGeneralNatalPositionQualifiedC4Research(snapshot, p4, { now })).toEqual(c4);

      const geju = c4.c4Evidence.geju;
      expect(geju.observation).toEqual(buildGeneralNatalGejuSelectionSignalObservation(snapshot));
      expect(geju.links).toHaveLength(geju.observation.signalCount);
      observed.add(geju.observation.status);
      expect(geju.candidate).toBe('not_determined');
      expect(geju.establishment).toBe('not_determined');
      expect(geju.winner).toBe('not_authorized');
      expect(geju.observation.signalSetExhaustiveAuthorized).toBe(false);
      expect(geju.observation.zeroSignalMeansNoCandidateAuthorized).toBe(false);
      for (const link of geju.links) {
        const sourceSignal = geju.observation.signals.find((item) => item.signalId === link.signalId);
        expect(sourceSignal).toBeDefined();
        expect(link.signalKind).toBe(sourceSignal?.signalKind);
        expect(sourceSignal?.candidateEmitted).toBe(false);
        if (sourceSignal?.signalKind === 'transparency') {
          expect(link.canonicalFactRefs).toContain('derivedFacts.hiddenStems.month');
          const sourceMonth = snapshot.derivedFacts.hiddenStems?.month;
          expect(sourceMonth?.status).toBe('resolved');
          if (sourceMonth?.status === 'resolved') expect(sourceMonth.value).toContain(sourceSignal.stem);
          for (const position of sourceSignal.sourceObservedExactMatchPositions) {
            expect(link.canonicalFactRefs).toContain('pillars.' + position);
            expect(snapshot.pillars[position].status).toBe('resolved');
          }
          for (const id of link.exactT5ClaimIds) {
            const claim = c4.interpretation.claims.find((item) => item.claimId === id);
            expect(claim?.taxonomy.tier).toBe('T5');
            expect(claim?.factRefs.length).toBe(1);
          }
        } else if (sourceSignal?.signalKind === 'branch_meeting') {
          expect(link.canonicalFactRefs).toContain(
            'derivedFacts.structuralRelations.' + sourceSignal.relationId
          );
          expect(link.t5LineageState).toBe('not_applicable');
          expect(link.exactT5ClaimIds).toEqual([]);
        }
      }

      expect(c4.c4Evidence.tiaohou).toMatchObject({
        status: 'unresolved_no_governed_chart_resolver',
        climateRequirement: 'not_determined',
        executableResolverAuthorized: false,
      });
      expect(c4.c4Evidence.yongxi).toMatchObject({
        status: 'unresolved_no_governed_role_assignment',
        primaryUse: 'not_determined',
        singleWinnerAuthorized: false,
      });
      expect(c4.c4Evidence.t8SynthesisAuthorized).toBe(false);
      expect(c4.c4Evidence.consumerProjectionAuthorized).toBe(false);
      const reading = buildReadingCompositionEvidence(snapshot, c4.interpretation, c4.registry, {
        requestId: 'ws-c4-source-only', intent: { domain: 'general', temporalScope: 'natal' },
      });
      const before = buildReadingCompositionEvidence(snapshot, c3.interpretation, c3.registry, {
        requestId: 'ws-c4-source-only', intent: { domain: 'general', temporalScope: 'natal' },
      });
      expect(reading.selection).toEqual(before.selection);
    }
    expect(observed.size).toBeGreaterThan(0);
  });

  it('C4 fails closed for mismatched C3 evidence and preserves unknown-hour uncertainty', () => {
    const snapshot = chart(dates[0]!, false);
    const c3 = executeGeneralNatalPositionQualifiedC3Research(snapshot, p4, { now });
    const original = bindGeneralNatalC4MethodScopedEvidence(
      snapshot, c3.interpretation, c3.c3Evidence
    );
    expect(original.snapshotId).toBe(snapshot.snapshotId);
    expect(original.geju.observation.candidateDerivationAuthorized).toBe(false);
    expect(() => bindGeneralNatalC4MethodScopedEvidence(snapshot, c3.interpretation, {
      ...c3.c3Evidence, snapshotId: 'foreign_snapshot',
    })).toThrow('WS_C4_EXECUTION_IDENTITY_MISMATCH');
    expect(() => bindGeneralNatalC4MethodScopedEvidence(snapshot, {
      ...c3.interpretation,
      integrity: { valid: false, errors: ['invalid'] },
    }, c3.c3Evidence)).toThrow('WS_C4_CLAIM_GRAPH_INVALID');
    const hour = c3.c3Evidence.positionedTenGods.find((item) =>
      item.pillar === 'hour' && item.component === 'stem'
    );
    expect(hour?.status).not.toBe('resolved');
    expect(original.tiaohou.climateRequirement).toBe('not_determined');
    expect(original.yongxi.primaryUse).toBe('not_determined');
  });

  it('C5 preserves existing four-domain T8 meanings on the same canonical snapshot', () => {
    const domains = ['career', 'wealth', 'business', 'relationship'] as const;
    const baselineRegistry = createBusinessNatalReadingCandidateRegistry(now.toISOString());
    const observed = new Set<string>();
    for (const date of dates) {
      const snapshot = chart(date);
      const result = executeGeneralNatalC5SharedDomainResearch(snapshot, p4, { now });
      expect(result).toEqual(executeGeneralNatalC5SharedDomainResearch(snapshot, p4, { now }));
      const baseline = runInterpretation(snapshot, baselineRegistry, { now });
      expect(result.interpretation.integrity.valid).toBe(true);
      expect(result.interpretation.run.snapshotHash).toBe(snapshot.calculationHash);
      expect(result.c3Evidence.interpretationRunId)
        .toBe(result.interpretation.run.interpretationRunId);
      expect(result.c4Evidence.interpretationRunId)
        .toBe(result.interpretation.run.interpretationRunId);
      expect(result.productionAuthorityPromoted).toBe(false);
      expect(result.newT8SemanticsIntroduced).toBe(false);
      for (const domain of domains) {
        const view = result.domainReadings[domain];
        expect(view.semantics).toBe('existing_research_t8_only');
        expect(view.consumerAuthorizationGranted).toBe(false);
        expect(view.sharedContextUsedAsDomainPremise).toBe(false);
        expect(view.selection.intent).toEqual({ domain, temporalScope: 'natal' });
        const baselineReading = buildReadingCompositionEvidence(
          snapshot, baseline, baselineRegistry, {
            requestId: 'ws-c5-baseline-' + domain,
            intent: { domain, temporalScope: 'natal' },
          },
        );
        const baselineT8 = baseline.claims
          .filter((claim) =>
            claim.state === 'active' &&
            claim.taxonomy.tier === 'T8' &&
            claim.taxonomy.category === domain
          )
          .map((claim) => ({
            claimType: claim.claimType, value: claim.value,
            methodologyRef: claim.methodologyRef,
          }))
          .sort((left, right) => left.claimType.localeCompare(right.claimType));
        const c5T8 = result.interpretation.claims
          .filter((claim) =>
            claim.state === 'active' &&
            claim.taxonomy.tier === 'T8' &&
            claim.taxonomy.category === domain
          )
          .map((claim) => ({
            claimType: claim.claimType, value: claim.value,
            methodologyRef: claim.methodologyRef,
          }))
          .sort((left, right) => left.claimType.localeCompare(right.claimType));
        expect(c5T8).toEqual(baselineT8);
        expect(view.selection.coverageState).toBe(baselineReading.selection.coverageState);
        expect(view.targetClaims.map((claim) => claim.claimType).sort()).toEqual(
          baselineReading.selection.targetClaimIds.map((id) =>
            baseline.claims.find((claim) => claim.claimId === id)?.claimType
          ).sort(),
        );
        for (const target of view.targetClaims) {
          observed.add(domain);
          const original = result.interpretation.claims.find((claim) =>
            claim.claimId === target.claimId);
          expect(original?.taxonomy.category).toBe(domain);
          expect(original?.taxonomy.tier).toBe('T8');
          expect(original?.methodologyRef).toEqual(target.methodologyRef);
          expect(original?.upstreamClaimRefs).toEqual(target.upstreamClaimRefs);
          expect(original?.factRefs).toEqual(target.factRefs);
        }
        expect(view.selection.selectedClaimIds.every((id) =>
          result.interpretation.claims.some((claim) => claim.claimId === id)
        )).toBe(true);
      }
      const t6ids = new Set(result.interpretation.claims
        .filter((claim) => claim.taxonomy.tier === 'T6')
        .map((claim) => claim.claimId));
      for (const domain of domains) {
        expect(result.domainReadings[domain].selection.targetClaimIds.every((id) =>
          !t6ids.has(id)
        )).toBe(true);
      }
      expect(result.c3Evidence.root.tonggen).toBe('not_determined');
      expect(result.c4Evidence.geju.candidate).toBe('not_determined');
      expect(result.c4Evidence.yongxi.primaryUse).toBe('not_determined');
    }
    expect([...observed].sort()).toEqual([...domains].sort());
  });

  it('C5 preserves unknown-hour missing positions and requires an intact P4 gate', () => {
    const snapshot = chart(dates[0]!, false);
    const result = executeGeneralNatalC5SharedDomainResearch(snapshot, p4, { now });
    const hour = result.c3Evidence.positionedTenGods.find((item) =>
      item.pillar === 'hour' && item.component === 'stem'
    );
    expect(hour?.status).not.toBe('resolved');
    expect(result.c4Evidence.tiaohou.climateRequirement).toBe('not_determined');
    expect(result.c4Evidence.geju.candidate).toBe('not_determined');
    expect(result.domainReadings.relationship.consumerAuthorizationGranted).toBe(false);
    const invalidP4 = { ...p4, status: 'UPSTREAM_BOUNDARY_INVALID' as const };
    expect(() => executeGeneralNatalC5SharedDomainResearch(
      chart(dates[0]!), invalidP4, { now },
    )).toThrow();
  });
});
