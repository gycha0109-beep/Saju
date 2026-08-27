import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { InterpretationClaim, RuleEvaluation } from '../src/contracts/interpretation.js';
import type { ReadingEvidenceSelection } from '../src/contracts/reading.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
} from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import {
  ConsumedInputTraceError,
  deriveConsumedInputFingerprints,
  type ConsumedInputTraceErrorCode,
} from '../src/verification/consumed-input-fingerprint.js';

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

const ALTERNATE_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('정재'), branch: resolved('정인') },
  month: { stem: resolved('상관'), branch: resolved('편재') },
  day: { stem: resolved('일간'), branch: resolved('편관') },
  hour: { stem: resolved('식신'), branch: resolved('비견') },
};

function fixture(
  tenGods: TenGodChartFact = FIVE_FAMILY_TEN_GODS,
  day = 10,
): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-08-27T07:45:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(tenGods) },
  };
}

function careerClaims(execution: InterpretationExecutionResult): readonly InterpretationClaim[] {
  return execution.claims.filter(
    (claim) =>
      claim.state === 'active' &&
      claim.taxonomy.tier === 'T8' &&
      claim.taxonomy.category === 'career',
  );
}

function selection(
  execution: InterpretationExecutionResult,
  scenarioRefs: readonly string[] = [],
  selectedClaimIds?: readonly string[],
): ReadingEvidenceSelection {
  const ids = selectedClaimIds ?? careerClaims(execution).map((claim) => claim.claimId);
  return {
    selectionId: 'selection-transport-identity-does-not-define-fingerprint',
    intent: { domain: 'career', temporalScope: 'natal' },
    coverageState: 'complete',
    targetClaimIds: [...ids],
    selectedClaimIds: [...ids],
    omittedClaimIds: [],
    missingRequirements: [],
    scenarioRefs,
    conflictRelationIds: [],
    constraints: {
      mayGenerateClaims: false,
      mayResolveConflicts: false,
      mayCollapseScenarios: false,
      mayPromoteResearchAuthority: false,
    },
  };
}

function firstCareerClaim(execution: InterpretationExecutionResult): InterpretationClaim {
  const claim = careerClaims(execution)[0];
  if (claim === undefined) throw new Error('Expected at least one Career T8 claim.');
  return claim;
}

function producingEvaluationId(claim: InterpretationClaim): string {
  const ruleRef = claim.ruleRefs[0];
  if (ruleRef === undefined) throw new Error('Expected producing rule reference.');
  return ruleRef.evaluationId;
}

function replaceEvaluation(
  execution: InterpretationExecutionResult,
  evaluationId: string,
  replace: (evaluation: RuleEvaluation) => RuleEvaluation,
): InterpretationExecutionResult {
  return {
    ...execution,
    evaluations: execution.evaluations.map((evaluation) =>
      evaluation.evaluationId === evaluationId ? replace(evaluation) : evaluation,
    ),
  };
}

function expectTraceError(
  action: () => unknown,
  code: ConsumedInputTraceErrorCode,
): void {
  let caught: unknown;
  try {
    action();
  } catch (error) {
    caught = error;
  }
  expect(caught).toBeInstanceOf(ConsumedInputTraceError);
  expect((caught as ConsumedInputTraceError).code).toBe(code);
}

describe('verification-only consumed input fingerprints', () => {
  it('materializes actual Career T8 consumed inputs from producing evaluations and exact rules', () => {
    const registry = createCareerNatalReadingCandidateRegistry();
    const execution = runInterpretation(fixture(), registry, {
      now: new Date('2026-08-27T07:46:00.000Z'),
    });
    const claims = careerClaims(execution);
    const fingerprints = deriveConsumedInputFingerprints(execution, registry, selection(execution));

    expect(fingerprints).toHaveLength(1);
    const fingerprint = fingerprints[0];
    expect(fingerprint?.domain).toBe('career');
    expect(fingerprint?.entries).toHaveLength(claims.length);
    expect(
      fingerprint?.entries.every(
        (entry) =>
          entry.inputKey === 'tenGods' &&
          entry.sourceType === 'derived_fact' &&
          entry.idOrPath === 'derivedFacts.tenGods' &&
          entry.evaluationStatus === 'matched',
      ),
    ).toBe(true);
    expect(fingerprint?.entries.every((entry) => entry.observedValue !== undefined)).toBe(true);
    expect(fingerprint?.entries[0]?.observedValue).toEqual(FIVE_FAMILY_TEN_GODS);
  });

  it('ignores snapshot, request, evaluation, claim, and timestamp transport identity', () => {
    const firstRegistry = createCareerNatalReadingCandidateRegistry('2026-08-27T07:47:00.000Z');
    const secondRegistry = createCareerNatalReadingCandidateRegistry('2026-08-27T07:48:00.000Z');
    const firstExecution = runInterpretation(fixture(FIVE_FAMILY_TEN_GODS, 10), firstRegistry, {
      requestId: 'request-a',
      now: new Date('2026-08-27T07:49:00.000Z'),
    });
    const secondExecution = runInterpretation(fixture(FIVE_FAMILY_TEN_GODS, 11), secondRegistry, {
      requestId: 'request-b',
      now: new Date('2026-08-27T07:50:00.000Z'),
    });

    const first = deriveConsumedInputFingerprints(
      firstExecution,
      firstRegistry,
      selection(firstExecution),
    )[0];
    const second = deriveConsumedInputFingerprints(
      secondExecution,
      secondRegistry,
      selection(secondExecution),
    )[0];

    expect(firstExecution.run.snapshotId).not.toBe(secondExecution.run.snapshotId);
    expect(firstExecution.run.requestId).not.toBe(secondExecution.run.requestId);
    expect(first?.fingerprint).toBe(second?.fingerprint);
  });

  it('changes when methodology-consumed observed input changes', () => {
    const registry = createCareerNatalReadingCandidateRegistry();
    const firstExecution = runInterpretation(fixture(FIVE_FAMILY_TEN_GODS), registry);
    const secondExecution = runInterpretation(fixture(ALTERNATE_TEN_GODS), registry);

    const first = deriveConsumedInputFingerprints(
      firstExecution,
      registry,
      selection(firstExecution),
    )[0];
    const second = deriveConsumedInputFingerprints(
      secondExecution,
      registry,
      selection(secondExecution),
    )[0];

    expect(first?.fingerprint).not.toBe(second?.fingerprint);
  });

  it('does not let scenario labels create false input diversity', () => {
    const registry = createCareerNatalReadingCandidateRegistry();
    const execution = runInterpretation(fixture(), registry);

    const scenarioA = deriveConsumedInputFingerprints(
      execution,
      registry,
      selection(execution, ['scenario-a']),
    )[0];
    const scenarioB = deriveConsumedInputFingerprints(
      execution,
      registry,
      selection(execution, ['scenario-b']),
    )[0];

    expect(scenarioA?.scenarioRef).toBe('scenario-a');
    expect(scenarioB?.scenarioRef).toBe('scenario-b');
    expect(scenarioA?.fingerprint).toBe(scenarioB?.fingerprint);
  });

  it('returns no fingerprint when the selection contains no active T8 claims for the domain', () => {
    const registry = createCareerNatalReadingCandidateRegistry();
    const execution = runInterpretation(fixture(), registry);
    const generalClaim = execution.claims.find(
      (claim) => claim.state === 'active' && claim.taxonomy.category === 'general',
    );
    if (generalClaim === undefined) throw new Error('Expected a general claim fixture.');

    const fingerprints = deriveConsumedInputFingerprints(
      execution,
      registry,
      selection(execution, [], [generalClaim.claimId]),
    );

    expect(fingerprints).toEqual([]);
  });

  it('fails closed when an evaluation loses a declared consumed input', () => {
    const registry = createCareerNatalReadingCandidateRegistry();
    const execution = runInterpretation(fixture(), registry);
    const claim = firstCareerClaim(execution);
    const evaluationId = producingEvaluationId(claim);
    const corrupted = replaceEvaluation(execution, evaluationId, (evaluation) => ({
      ...evaluation,
      inputRefs: [],
    }));

    expectTraceError(
      () => deriveConsumedInputFingerprints(corrupted, registry, selection(corrupted, [], [claim.claimId])),
      'INPUT_TRACE_CARDINALITY_MISMATCH',
    );
  });

  it('fails closed when a recorded consumed input source disagrees with the rule declaration', () => {
    const registry = createCareerNatalReadingCandidateRegistry();
    const execution = runInterpretation(fixture(), registry);
    const claim = firstCareerClaim(execution);
    const evaluationId = producingEvaluationId(claim);
    const corrupted = replaceEvaluation(execution, evaluationId, (evaluation) => ({
      ...evaluation,
      inputRefs: evaluation.inputRefs.map((inputRef, index) =>
        index === 0 ? { ...inputRef, sourceType: 'claim' as const } : inputRef,
      ),
    }));

    expectTraceError(
      () => deriveConsumedInputFingerprints(corrupted, registry, selection(corrupted, [], [claim.claimId])),
      'INPUT_TRACE_SOURCE_MISMATCH',
    );
  });

  it('fails closed when a recorded fact path disagrees with the exact rule input declaration', () => {
    const registry = createCareerNatalReadingCandidateRegistry();
    const execution = runInterpretation(fixture(), registry);
    const claim = firstCareerClaim(execution);
    const evaluationId = producingEvaluationId(claim);
    const corrupted = replaceEvaluation(execution, evaluationId, (evaluation) => ({
      ...evaluation,
      inputRefs: evaluation.inputRefs.map((inputRef, index) =>
        index === 0 ? { ...inputRef, idOrPath: 'derivedFacts.fiveElements' } : inputRef,
      ),
    }));

    expectTraceError(
      () => deriveConsumedInputFingerprints(corrupted, registry, selection(corrupted, [], [claim.claimId])),
      'INPUT_TRACE_DECLARATION_MISMATCH',
    );
  });

  it('fails closed when the reading selection references a missing claim', () => {
    const registry = createCareerNatalReadingCandidateRegistry();
    const execution = runInterpretation(fixture(), registry);

    expectTraceError(
      () =>
        deriveConsumedInputFingerprints(
          execution,
          registry,
          selection(execution, [], ['missing-claim']),
        ),
      'SELECTED_CLAIM_MISSING',
    );
  });
});
