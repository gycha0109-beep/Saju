import { describe, expect, it } from 'vitest';
import type { SquareBroadProductSufficiencyRuntimeClosureFR137V1 } from './five-officers-square-broad-product-sufficiency-runtime-closure-fr137.js';
import {
  assessSquareBroadProductSufficiencyRuntimeClosureFR137,
  assertIssuedSquareBroadProductSufficiencyRuntimeClosureFR137,
  requireSquareBroadProductSemanticEmissionAuthorizationFR137,
} from './five-officers-square-broad-product-sufficiency-runtime-closure-fr137.js';
import { FaceAuthorityValidationError } from './validation.js';

describe('FR137 hardening', () => {
  it('does not accept neutral metric values or research assertion states as runtime inputs', () => {
    expect(assessSquareBroadProductSufficiencyRuntimeClosureFR137.length).toBe(0);
    const result = assessSquareBroadProductSufficiencyRuntimeClosureFR137();
    expect(result.emission.neutralMetricValuesConsumed).toBe(0);
    expect(result.emission.researchAssertionStatesConsumed).toBe(0);
    expect(result.executionBoundary.neutralMetricValueMayAuthorizeCriterionState).toBe(false);
    expect(result.executionBoundary.researchAssertionMayAuthorizeProductCriterionState).toBe(false);
  });

  it('keeps all machine and narrative shortcuts explicitly closed', () => {
    const result = assessSquareBroadProductSufficiencyRuntimeClosureFR137();

    expect(result.executionBoundary.unavailableCriterionMayEmitTraditionalClaim).toBe(false);
    expect(result.executionBoundary.unavailableCriterionMayEmitTraditionalNarrative).toBe(false);
    expect(result.executionBoundary.researchOnlyDiagnosisRuntimeMayBePromotedByThisGate).toBe(false);
    expect(result.executionBoundary.llmMayFillMissingCriterionState).toBe(false);
    expect(result.executionBoundary.llmMayFillMissingClaim).toBe(false);
    expect(result.executionBoundary.llmMayFillMissingNarrative).toBe(false);
  });

  it('rejects a structurally identical forged closure because issuance identity is authoritative', () => {
    const issued = assessSquareBroadProductSufficiencyRuntimeClosureFR137();
    const forged = {
      ...issued,
      target: { ...issued.target },
      predecessorAuthority: { ...issued.predecessorAuthority },
      productSufficiency: {
        ...issued.productSufficiency,
        unavailableSections: [...issued.productSufficiency.unavailableSections] as [
          'five_officers.intake.static_support',
        ],
        reasonCodes: [...issued.productSufficiency.reasonCodes] as [
          'traditional_metric_binding_not_authorized',
          'calibrated_threshold_not_authorized',
          'machine_criterion_state_not_authorized',
          'criterion_specific_semantic_annotation_authority_absent',
          'criterion_specific_annotation_protocol_absent',
          'traditional_semantic_authority_absent',
        ],
      },
      emission: { ...issued.emission },
      executionBoundary: { ...issued.executionBoundary },
    } as SquareBroadProductSufficiencyRuntimeClosureFR137V1;

    expect(() => assertIssuedSquareBroadProductSufficiencyRuntimeClosureFR137(forged)).toThrow(
      FaceAuthorityValidationError,
    );
    expect(() => requireSquareBroadProductSemanticEmissionAuthorizationFR137(forged)).toThrow(
      /was not issued by the active FR-137 runtime/u,
    );
  });

  it('cannot be mutated into an authorized semantic result', () => {
    const issued = assessSquareBroadProductSufficiencyRuntimeClosureFR137();

    expect(Object.isFrozen(issued)).toBe(true);
    expect(Object.isFrozen(issued.predecessorAuthority)).toBe(true);
    expect(Object.isFrozen(issued.productSufficiency)).toBe(true);
    expect(Object.isFrozen(issued.productSufficiency.reasonCodes)).toBe(true);
    expect(Object.isFrozen(issued.executionBoundary)).toBe(true);
  });
});
