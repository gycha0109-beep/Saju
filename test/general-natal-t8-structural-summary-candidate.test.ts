import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { evaluateRule } from '../src/interpretation/rule-evaluator.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_PACK,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES,
  createGeneralNatalT8StructuralSummaryCandidateRegistry,
} from '../src/research/general-natal-t8-structural-summary-candidate.js';
import type { MonthBranchStrengthRelation } from '../src/research/i18a-month-branch-strength-evidence.js';

const FIXTURE_RELATIONS = [
  { relation: 'peer', direction: 'supporting' },
  { relation: 'resource', direction: 'supporting' },
  { relation: 'output', direction: 'challenging' },
  { relation: 'wealth', direction: 'challenging' },
  { relation: 'officer', direction: 'challenging' },
] as const satisfies readonly {
  relation: MonthBranchStrengthRelation;
  direction: 'supporting' | 'challenging';
}[];

function snapshot(): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-08-24T00:00:00.000Z') },
  );
}

function upstreamClaim(
  snapshotId: string,
  claimId: string,
  claimType: string,
  value: unknown,
): InterpretationClaim {
  return {
    claimId,
    schemaVersion: 'general-natal-t8-candidate-test-v1',
    snapshotId,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: claimType === 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD' ? 'scope_guard' : 'month_branch_elemental_relation',
    },
    claimType,
    subject: 'day_master',
    predicate: 'fixture',
    value,
    methodologyRef: { id: 'METHOD-I18A-FIXTURE', version: 'test' },
    ruleRefs: [{ ruleId: `RULE-${claimId}`, version: 'test', evaluationId: `eval-${claimId}` }],
    factRefs: ['derivedFacts.dayMaster', 'pillars.month'],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

describe('general natal T8 structural summary candidate', () => {
  it('is explicitly research-only and contains exactly five relation mappings', () => {
    expect(GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_PACK.status).toBe('research');
    expect(GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.status).toBe('research');
    expect(GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES).toHaveLength(5);
    expect(
      GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES.every(
        (rule) =>
          rule.status === 'research' &&
          rule.quality.reviewerStatus === 'unreviewed' &&
          rule.quality.testCoverage === 'fixture_matrix' &&
          rule.taxonomy.tier === 'T8' &&
          rule.taxonomy.category === 'general',
      ),
    ).toBe(true);
    expect(
      GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES.map(
        (rule) => (rule.output.value as { relation: MonthBranchStrengthRelation }).relation,
      ).sort(),
    ).toEqual(FIXTURE_RELATIONS.map((item) => item.relation).sort());
  });

  it.each(FIXTURE_RELATIONS)(
    'maps $relation I18A evidence into one neutral guarded T8 candidate',
    ({ relation, direction }) => {
      const currentSnapshot = snapshot();
      const relationClaim = upstreamClaim(
        currentSnapshot.snapshotId,
        `claim-relation-${relation}`,
        'DAY_MASTER_MONTH_BRANCH_EVIDENCE',
        {
          relation,
          direction,
          monthContext: 'branch_element_only',
          overallStrength: 'not_determined',
        },
      );
      const guardClaim = upstreamClaim(
        currentSnapshot.snapshotId,
        'claim-scope-guard',
        'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD',
        {
          overallStrength: 'not_determined',
          classificationAuthorized: false,
          numericScoringAuthorized: false,
        },
      );
      const rule = GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES.find(
        (candidate) =>
          (candidate.output.value as { relation: MonthBranchStrengthRelation }).relation === relation,
      );
      if (rule === undefined) throw new Error(`Missing candidate rule for ${relation}`);

      const result = evaluateRule(rule, {
        snapshot: currentSnapshot,
        pack: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_PACK,
        existingClaims: [relationClaim, guardClaim],
        now: new Date('2026-08-24T00:00:00.000Z'),
      });

      expect(result.evaluation.status).toBe('matched');
      expect(result.claims).toHaveLength(1);
      const claim = result.claims[0];
      expect(claim?.claimType).toBe(GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE);
      expect(claim?.taxonomy).toEqual({
        tier: 'T8',
        category: 'general',
        subcategory: 'month_branch_structural_context',
      });
      expect(claim?.polarity).toBe('neutral');
      expect(claim?.upstreamClaimRefs).toEqual(
        [guardClaim.claimId, relationClaim.claimId].sort(),
      );
      expect(claim?.value).toEqual({
        relation,
        evidenceDirection: direction,
        monthContext: 'branch_element_only',
        overallStrength: 'not_determined',
        withinMonthCommand: 'not_determined',
        rootEffect: 'not_determined',
        classificationAuthorized: false,
        numericScoringAuthorized: false,
        fortunePolarityAuthorized: false,
      });
    },
  );

  it('does not emit without the explicit I18A scope guard', () => {
    const currentSnapshot = snapshot();
    const relationClaim = upstreamClaim(
      currentSnapshot.snapshotId,
      'claim-relation-peer',
      'DAY_MASTER_MONTH_BRANCH_EVIDENCE',
      { relation: 'peer' },
    );
    const rule = GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES.find(
      (candidate) =>
        (candidate.output.value as { relation: MonthBranchStrengthRelation }).relation === 'peer',
    );
    if (rule === undefined) throw new Error('Missing peer candidate rule.');

    const result = evaluateRule(rule, {
      snapshot: currentSnapshot,
      pack: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_PACK,
      existingClaims: [relationClaim],
      now: new Date('2026-08-24T00:00:00.000Z'),
    });
    expect(result.evaluation.status).toBe('skipped_dependency_unresolved');
    expect(result.claims).toEqual([]);
  });

  it('executes the real I18A dependency chain and emits one T8 general claim', () => {
    const currentSnapshot = snapshot();
    const registry = createGeneralNatalT8StructuralSummaryCandidateRegistry();
    const execution = runInterpretation(currentSnapshot, registry, {
      now: new Date('2026-08-24T00:00:00.000Z'),
    });

    const relationClaims = execution.claims.filter(
      (claim) => claim.claimType === 'DAY_MASTER_MONTH_BRANCH_EVIDENCE',
    );
    const guardClaims = execution.claims.filter(
      (claim) => claim.claimType === 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD',
    );
    const t8Claims = execution.claims.filter(
      (claim) => claim.claimType === GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    );

    expect(relationClaims).toHaveLength(1);
    expect(guardClaims).toHaveLength(1);
    expect(t8Claims).toHaveLength(1);
    expect(t8Claims[0]?.upstreamClaimRefs).toEqual(
      [relationClaims[0]?.claimId, guardClaims[0]?.claimId].sort(),
    );
    expect(t8Claims[0]?.polarity).toBe('neutral');
  });

  it('makes only general natal evidence complete and does not fabricate career coverage', () => {
    const currentSnapshot = snapshot();
    const registry = createGeneralNatalT8StructuralSummaryCandidateRegistry();
    const execution = runInterpretation(currentSnapshot, registry, {
      now: new Date('2026-08-24T00:00:00.000Z'),
    });

    const general = buildReadingCompositionEvidence(
      currentSnapshot,
      execution,
      registry,
      {
        requestId: 'candidate-general-natal',
        intent: { domain: 'general', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'candidate-general-natal-v1' },
    );
    expect(general.selection.coverageState).toBe('complete');
    expect(general.selection.targetClaimIds).toHaveLength(1);
    expect(general.evidence?.bundle.claims.some((claim) => claim.taxonomy.tier === 'T2')).toBe(
      true,
    );

    const career = buildReadingCompositionEvidence(
      currentSnapshot,
      execution,
      registry,
      {
        requestId: 'candidate-career-natal',
        intent: { domain: 'career', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'candidate-general-natal-v1' },
    );
    expect(career.selection.coverageState).toBe('insufficient_evidence');
    expect(career.selection.targetClaimIds).toEqual([]);
    expect(career.evidence).toBeUndefined();
  });

  it('remains rejected by the production composition boundary', () => {
    const registry = createGeneralNatalT8StructuralSummaryCandidateRegistry();
    const inspection = inspectMyeonghwaProductionComposition({ registry });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({
        code: 'INTERPRETATION_PACK_NOT_PRODUCTION',
        component: 'interpretation',
      }),
    );
  });
});
