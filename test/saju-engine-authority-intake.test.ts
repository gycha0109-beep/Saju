import { describe, expect, it } from 'vitest';
import type { ContentAddressedVersionedRef } from '../src/contracts/common.js';
import {
  evaluateSajuEngineAuthorityIntake,
  type SajuEngineAuthorityIntakeContract,
  type SajuEngineImplementationEvidence,
} from '../src/interpretation/saju-engine-authority-intake.js';

const ref = (id: string): ContentAddressedVersionedRef => ({
  id,
  version: '1.0.0',
  contentHash: 'a'.repeat(64),
});

function contract(
  upstreamDisposition: SajuEngineAuthorityIntakeContract['upstreamDisposition'],
): SajuEngineAuthorityIntakeContract {
  return {
    capabilityKey: 'example:natal',
    upstreamDisposition,
    ...(upstreamDisposition === 'ADMITTED'
      ? {
          admittedAuthorityRef: ref('authority'),
          methodologyRef: ref('methodology'),
          ruleClaimContractRef: ref('rule-claim-contract'),
        }
      : {}),
    requiredInputs: ['derivedFacts.tenGods'],
    allowedClaims: ['bounded structural claim'],
    forbiddenClaims: ['deterministic event prediction'],
    runtimePrerequisites: ['canonical snapshot'],
    negativeCases: ['missing required fact'],
  };
}

function evidence(
  overrides: Partial<SajuEngineImplementationEvidence> = {},
): SajuEngineImplementationEvidence {
  return {
    producerRuntimeExists: false,
    compositionIntegrated: false,
    deterministicGuardsComplete: false,
    e2eComplete: false,
    ...overrides,
  };
}

describe('Saju Engine authority intake', () => {
  it('keeps an executable Research runtime behind an Authority hold', () => {
    const result = evaluateSajuEngineAuthorityIntake(
      {
        ...contract('AUTHORITY_GAP'),
        capabilityKey: 'general:annual',
      },
      evidence({ producerRuntimeExists: true }),
    );

    expect(result.routing).toBe('HOLD_AUTHORITY');
    expect(result.implementationMayProceed).toBe(false);
  });

  it('keeps Research-gap capabilities out of Engine implementation', () => {
    const result = evaluateSajuEngineAuthorityIntake(
      {
        ...contract('RESEARCH_GAP'),
        capabilityKey: 'family:natal:parents',
      },
      evidence(),
    );

    expect(result.routing).toBe('HOLD_RESEARCH');
    expect(result.implementationMayProceed).toBe(false);
  });

  it('routes admitted authority with no producer runtime to P0', () => {
    const result = evaluateSajuEngineAuthorityIntake(contract('ADMITTED'), evidence());

    expect(result.routing).toBe('P0_RUNTIME');
    expect(result.implementationMayProceed).toBe(true);
  });

  it('routes admitted authority with runtime but no composition to P1', () => {
    const result = evaluateSajuEngineAuthorityIntake(
      contract('ADMITTED'),
      evidence({ producerRuntimeExists: true }),
    );

    expect(result.routing).toBe('P1_COMPOSITION');
    expect(result.implementationMayProceed).toBe(true);
  });

  it('routes admitted runtime and composition with incomplete hardening to P2', () => {
    const result = evaluateSajuEngineAuthorityIntake(
      contract('ADMITTED'),
      evidence({
        producerRuntimeExists: true,
        compositionIntegrated: true,
        deterministicGuardsComplete: true,
        e2eComplete: false,
      }),
    );

    expect(result.routing).toBe('P2_HARDENING');
    expect(result.implementationMayProceed).toBe(true);
  });

  it('marks a fully implemented admitted capability READY', () => {
    const result = evaluateSajuEngineAuthorityIntake(
      contract('ADMITTED'),
      evidence({
        producerRuntimeExists: true,
        compositionIntegrated: true,
        deterministicGuardsComplete: true,
        e2eComplete: true,
      }),
    );

    expect(result.routing).toBe('READY');
    expect(result.implementationMayProceed).toBe(false);
  });

  it('fails closed when ADMITTED is asserted without the complete handoff contract', () => {
    const admitted = contract('ADMITTED');
    const incomplete = { ...admitted };
    delete incomplete.admittedAuthorityRef;
    const result = evaluateSajuEngineAuthorityIntake(incomplete, evidence());

    expect(result.routing).toBe('INVALID_EVIDENCE');
    expect(result.authorityContractComplete).toBe(false);
    expect(result.implementationMayProceed).toBe(false);
  });

  it('fails closed on impossible implementation evidence ordering', () => {
    const result = evaluateSajuEngineAuthorityIntake(
      contract('ADMITTED'),
      evidence({
        producerRuntimeExists: false,
        compositionIntegrated: true,
        deterministicGuardsComplete: true,
        e2eComplete: true,
      }),
    );

    expect(result.routing).toBe('INVALID_EVIDENCE');
    expect(result.invariantViolations).toEqual([
      'COMPOSITION_WITHOUT_PRODUCER_RUNTIME',
    ]);
    expect(result.implementationMayProceed).toBe(false);
  });

  it('never treats intake as Production promotion authority and is deterministic', () => {
    const left = evaluateSajuEngineAuthorityIntake(contract('ADMITTED'), evidence());
    const right = evaluateSajuEngineAuthorityIntake(contract('ADMITTED'), evidence());

    expect(left.constraints.mayInferAuthorityFromResearchRuntime).toBe(false);
    expect(left.constraints.mayInferAuthorityFromReadingProfile).toBe(false);
    expect(left.constraints.mayInferAuthorityFromPreviewConsumerRoute).toBe(false);
    expect(left.constraints.mayImplementNewSemanticsWithoutAdmission).toBe(false);
    expect(left.constraints.mayPromoteProductionAuthority).toBe(false);
    expect(left.evaluationHash).toBe(right.evaluationHash);
    expect(left.evaluationHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
