import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingEvidenceSelection } from '../src/contracts/reading.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import {
  buildConvergenceObservation,
  classifyManyToOneConvergences,
  type ConvergenceObservation,
} from '../src/verification/convergence-classification.js';
import { deriveConsumedInputFingerprints } from '../src/verification/consumed-input-fingerprint.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';

const POSITION_LAYOUT_A: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

const POSITION_LAYOUT_B: TenGodChartFact = {
  year: { stem: resolved('편재'), branch: resolved('정재') },
  month: { stem: resolved('비견'), branch: resolved('정인') },
  day: { stem: resolved('일간'), branch: resolved('식신') },
  hour: { stem: resolved('편관'), branch: resolved('상관') },
};

function fixture(tenGods: TenGodChartFact): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-08-27T08:10:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(tenGods) },
  };
}

function selection(
  execution: ReturnType<typeof runInterpretation>,
  caseId: string,
): ReadingEvidenceSelection {
  const selectedClaimIds = execution.claims
    .filter(
      (claim) =>
        claim.state === 'active' &&
        claim.taxonomy.tier === 'T8' &&
        claim.taxonomy.category === 'career',
    )
    .map((claim) => claim.claimId)
    .sort();
  if (selectedClaimIds.length === 0) throw new Error(`Expected Career T8 claims for ${caseId}.`);

  return {
    selectionId: `selection-${caseId}`,
    intent: { domain: 'career', temporalScope: 'natal' },
    coverageState: 'complete',
    targetClaimIds: selectedClaimIds,
    selectedClaimIds,
    omittedClaimIds: [],
    missingRequirements: [],
    scenarioRefs: [],
    conflictRelationIds: [],
    constraints: {
      mayGenerateClaims: false,
      mayResolveConflicts: false,
      mayCollapseScenarios: false,
      mayPromoteResearchAuthority: false,
    },
  };
}

function observe(tenGods: TenGodChartFact, caseId: string): ConvergenceObservation {
  const registry = createCareerNatalReadingCandidateRegistry();
  const execution = runInterpretation(fixture(tenGods), registry, {
    requestId: `request-${caseId}`,
    now: new Date('2026-08-27T08:11:00.000Z'),
  });
  const readingSelection = selection(execution, caseId);
  const fingerprint = deriveConsumedInputFingerprints(execution, registry, readingSelection)[0];
  const signature = deriveDomainInterpretationSignatures(
    execution.claims,
    execution.claimRelations,
    readingSelection,
  )[0];
  if (fingerprint === undefined || signature === undefined) {
    throw new Error(`Expected complete Career verification observation for ${caseId}.`);
  }
  return buildConvergenceObservation(caseId, fingerprint, signature);
}

describe('P5 many-to-one convergence classification', () => {
  it('classifies actual Career position-only convergence when exact producing T8 rule sets are identical', () => {
    const left = observe(POSITION_LAYOUT_A, 'position-layout-a');
    const right = observe(POSITION_LAYOUT_B, 'position-layout-b');

    expect(left.consumedInputFingerprint).not.toBe(right.consumedInputFingerprint);
    expect(left.interpretationSignature).toBe(right.interpretationSignature);
    expect(left.producingT8RuleRefs).toEqual(right.producingT8RuleRefs);

    const groups = classifyManyToOneConvergences([left, right]);
    expect(groups).toHaveLength(1);
    expect(groups[0]?.classification).toBe('intentional_convergence');
    expect(groups[0]?.basis).toBe('same_exact_t8_producing_rule_set');
    expect(groups[0]?.consumedInputFingerprints).toHaveLength(2);
  });

  it('defaults same-signature convergence with different producing rule sets to unexplained', () => {
    const observations: readonly ConvergenceObservation[] = [
      {
        caseId: 'a',
        consumedInputFingerprint: 'input-a',
        interpretationSignature: 'shared-signature',
        producingT8RuleRefs: [{ id: 'RULE-A', version: '1.0.0' }],
      },
      {
        caseId: 'b',
        consumedInputFingerprint: 'input-b',
        interpretationSignature: 'shared-signature',
        producingT8RuleRefs: [{ id: 'RULE-B', version: '1.0.0' }],
      },
    ];

    const groups = classifyManyToOneConvergences(observations);
    expect(groups).toHaveLength(1);
    expect(groups[0]?.classification).toBe('unexplained_collision');
    expect(groups[0]?.basis).toBe('no_machine_verifiable_convergence_basis');
  });

  it('does not treat an empty producing rule set as proof of intentional convergence', () => {
    const groups = classifyManyToOneConvergences([
      {
        caseId: 'a',
        consumedInputFingerprint: 'input-a',
        interpretationSignature: 'shared-signature',
        producingT8RuleRefs: [],
      },
      {
        caseId: 'b',
        consumedInputFingerprint: 'input-b',
        interpretationSignature: 'shared-signature',
        producingT8RuleRefs: [],
      },
    ]);

    expect(groups[0]?.classification).toBe('unexplained_collision');
  });

  it('ignores duplicate cases that do not create a many-to-one mapping', () => {
    const groups = classifyManyToOneConvergences([
      {
        caseId: 'a',
        consumedInputFingerprint: 'same-input',
        interpretationSignature: 'same-signature',
        producingT8RuleRefs: [{ id: 'RULE-A', version: '1.0.0' }],
      },
      {
        caseId: 'b',
        consumedInputFingerprint: 'same-input',
        interpretationSignature: 'same-signature',
        producingT8RuleRefs: [{ id: 'RULE-A', version: '1.0.0' }],
      },
    ]);

    expect(groups).toEqual([]);
  });

  it('normalizes duplicate and unordered rule references before comparison', () => {
    const groups = classifyManyToOneConvergences([
      {
        caseId: 'a',
        consumedInputFingerprint: 'input-a',
        interpretationSignature: 'shared-signature',
        producingT8RuleRefs: [
          { id: 'RULE-B', version: '1.0.0' },
          { id: 'RULE-A', version: '1.0.0' },
          { id: 'RULE-A', version: '1.0.0' },
        ],
      },
      {
        caseId: 'b',
        consumedInputFingerprint: 'input-b',
        interpretationSignature: 'shared-signature',
        producingT8RuleRefs: [
          { id: 'RULE-A', version: '1.0.0' },
          { id: 'RULE-B', version: '1.0.0' },
        ],
      },
    ]);

    expect(groups[0]?.classification).toBe('intentional_convergence');
    expect(groups[0]?.producingT8RuleSets[0]).toEqual([
      { id: 'RULE-A', version: '1.0.0' },
      { id: 'RULE-B', version: '1.0.0' },
    ]);
  });
});
