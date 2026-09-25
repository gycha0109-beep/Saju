import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from './rule-registry.js';

export const SAJU_ENGINE_AUTHORITY_INTAKE_VERSION =
  'myeonghwa-saju-engine-authority-intake-v1' as const;

export type SajuEngineUpstreamDisposition =
  | 'RESEARCH_GAP'
  | 'AUTHORITY_GAP'
  | 'ADMITTED';

export type SajuEngineImplementationRouting =
  | 'HOLD_RESEARCH'
  | 'HOLD_AUTHORITY'
  | 'P0_RUNTIME'
  | 'P1_COMPOSITION'
  | 'P2_HARDENING'
  | 'READY'
  | 'INVALID_EVIDENCE';

export interface SajuEngineAuthorityIntakeContract {
  capabilityKey: string;
  upstreamDisposition: SajuEngineUpstreamDisposition;
  admittedAuthorityRef?: ContentAddressedVersionedRef;
  requiredInputs: readonly string[];
  allowedClaims: readonly string[];
  forbiddenClaims: readonly string[];
  methodologyRef?: ContentAddressedVersionedRef;
  ruleClaimContractRef?: ContentAddressedVersionedRef;
  runtimePrerequisites: readonly string[];
  negativeCases: readonly string[];
}

export interface SajuEngineImplementationEvidence {
  producerRuntimeExists: boolean;
  compositionIntegrated: boolean;
  deterministicGuardsComplete: boolean;
  e2eComplete: boolean;
}

export interface SajuEngineAuthorityIntakeEvaluation {
  version: typeof SAJU_ENGINE_AUTHORITY_INTAKE_VERSION;
  capabilityKey: string;
  routing: SajuEngineImplementationRouting;
  implementationMayProceed: boolean;
  authorityContractComplete: boolean;
  invariantViolations: readonly string[];
  constraints: {
    mayInferAuthorityFromResearchRuntime: false;
    mayInferAuthorityFromReadingProfile: false;
    mayInferAuthorityFromPreviewConsumerRoute: false;
    mayImplementNewSemanticsWithoutAdmission: false;
    mayPromoteProductionAuthority: false;
  };
  evaluationHash: string;
}

function hasText(values: readonly string[]): boolean {
  return values.length > 0 && values.every((value) => value.trim().length > 0);
}

function authorityContractComplete(contract: SajuEngineAuthorityIntakeContract): boolean {
  return (
    contract.upstreamDisposition === 'ADMITTED' &&
    contract.admittedAuthorityRef !== undefined &&
    contract.methodologyRef !== undefined &&
    contract.ruleClaimContractRef !== undefined &&
    hasText(contract.requiredInputs) &&
    hasText(contract.allowedClaims) &&
    hasText(contract.forbiddenClaims) &&
    hasText(contract.runtimePrerequisites) &&
    hasText(contract.negativeCases)
  );
}

function implementationInvariantViolations(
  evidence: SajuEngineImplementationEvidence,
): readonly string[] {
  const violations: string[] = [];

  if (evidence.compositionIntegrated && !evidence.producerRuntimeExists) {
    violations.push('COMPOSITION_WITHOUT_PRODUCER_RUNTIME');
  }
  if (evidence.deterministicGuardsComplete && !evidence.compositionIntegrated) {
    violations.push('GUARDS_WITHOUT_COMPOSITION');
  }
  if (evidence.e2eComplete && !evidence.compositionIntegrated) {
    violations.push('E2E_WITHOUT_COMPOSITION');
  }

  return Object.freeze(violations);
}

export function evaluateSajuEngineAuthorityIntake(
  contract: SajuEngineAuthorityIntakeContract,
  evidence: SajuEngineImplementationEvidence,
): SajuEngineAuthorityIntakeEvaluation {
  const invariantViolations = implementationInvariantViolations(evidence);
  const contractComplete = authorityContractComplete(contract);

  let routing: SajuEngineImplementationRouting;

  if (invariantViolations.length > 0) {
    routing = 'INVALID_EVIDENCE';
  } else if (contract.upstreamDisposition === 'RESEARCH_GAP') {
    routing = 'HOLD_RESEARCH';
  } else if (contract.upstreamDisposition === 'AUTHORITY_GAP') {
    routing = 'HOLD_AUTHORITY';
  } else if (!contractComplete) {
    routing = 'INVALID_EVIDENCE';
  } else if (!evidence.producerRuntimeExists) {
    routing = 'P0_RUNTIME';
  } else if (!evidence.compositionIntegrated) {
    routing = 'P1_COMPOSITION';
  } else if (!evidence.deterministicGuardsComplete || !evidence.e2eComplete) {
    routing = 'P2_HARDENING';
  } else {
    routing = 'READY';
  }

  const material = Object.freeze({
    version: SAJU_ENGINE_AUTHORITY_INTAKE_VERSION,
    capabilityKey: contract.capabilityKey,
    routing,
    implementationMayProceed:
      routing === 'P0_RUNTIME' ||
      routing === 'P1_COMPOSITION' ||
      routing === 'P2_HARDENING',
    authorityContractComplete: contractComplete,
    invariantViolations,
    constraints: Object.freeze({
      mayInferAuthorityFromResearchRuntime: false as const,
      mayInferAuthorityFromReadingProfile: false as const,
      mayInferAuthorityFromPreviewConsumerRoute: false as const,
      mayImplementNewSemanticsWithoutAdmission: false as const,
      mayPromoteProductionAuthority: false as const,
    }),
  });

  return Object.freeze({
    ...material,
    evaluationHash: deterministicContentHash(material),
  });
}
