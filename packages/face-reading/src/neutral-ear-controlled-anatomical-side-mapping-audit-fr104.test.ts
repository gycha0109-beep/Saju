import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  assessNeutralEarControlledAnatomicalMappingFR104,
  NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_AUDIT_FR104,
  type NeutralEarControlledAnatomicalMappingObservationFR104V1,
} from './neutral-ear-controlled-anatomical-side-mapping-audit-fr104.js';

const ids = [
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const;

function supported():
NeutralEarControlledAnatomicalMappingObservationFR104V1[] {
  return ids.map((id) => {
    const preserving = id.startsWith('R');
    return {
      id,
      available:true,
      reflectionParity: preserving
        ? 'orientation_preserving' as const
        : 'orientation_reversing' as const,
      directCost: preserving ? 0.01 : 0.3,
      swappedCost: preserving ? 0.3 : 0.01,
    };
  });
}

describe('FR104 U4A controlled anatomical mapping audit', () => {
  it('freezes exact controlled-reference boundaries', () => {
    const protocol =
      NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_AUDIT_FR104;

    expect(protocol.studyKind).toBe(
      'retrospective_controlled_anatomical_reference_mapping_audit',
    );
    expect(
      protocol.predecessors
        .u3_3ProspectiveComposedNormalizationValidated,
    ).toBe(true);
    expect(
      protocol.predecessors
        .providerCompensatedOutputFrameProspectivelyValidated,
    ).toBe(true);
    expect(
      protocol.controlledReference.providerLandmarkDerived,
    ).toBe(false);
    expect(
      protocol.controlledReference.providerLabelDerived,
    ).toBe(false);
    expect(
      protocol.mappingHypothesis
        .numericAcceptanceThresholdAuthorized,
    ).toBe(false);
    expect(
      protocol.interpretationBoundary
        .globalProviderAnatomicalSemanticsMayBeEstablished,
    ).toBe(false);
    expect(
      protocol.authority.anatomicalLateralityAuthorized,
    ).toBe(false);
    expect(
      protocol.authority.productionAuthorization,
    ).toBe(false);
  });

  it('supports the frozen reflection-parity conditional pattern', () => {
    const assessment =
      assessNeutralEarControlledAnatomicalMappingFR104(
        supported(),
      );

    expect(assessment.state).toBe(
      'reflection_parity_conditional_mapping_supported',
    );
    expect(assessment.evaluatedCaseIds).toEqual(ids);
    expect(assessment.unavailableCaseIds).toEqual([]);
    expect(assessment.failedCaseIds).toEqual([]);
    expect(
      assessment.orientationPreservingDirectForEveryAvailableCase,
    ).toBe(true);
    expect(
      assessment.orientationReversingSwappedForEveryAvailableCase,
    ).toBe(true);
    expect(assessment.allEightCasesAvailable).toBe(true);
  });

  it('treats a reversed parity relation as a scientific refutation', () => {
    const input = supported();
    input[1] = {
      ...input[1],
      directCost:0.4,
      swappedCost:0.02,
    };

    const assessment =
      assessNeutralEarControlledAnatomicalMappingFR104(
        input,
      );

    expect(assessment.state).toBe(
      'reflection_parity_conditional_mapping_refuted',
    );
    expect(assessment.failedCaseIds).toEqual(['R90']);
  });

  it('keeps incomplete evidence unresolved rather than partially promoting', () => {
    const input = supported();
    input[7] = {
      ...input[7],
      available:false,
      directCost:null,
      swappedCost:null,
    };

    const assessment =
      assessNeutralEarControlledAnatomicalMappingFR104(
        input,
      );

    expect(assessment.state).toBe(
      'reflection_parity_conditional_mapping_unresolved',
    );
    expect(assessment.unavailableCaseIds).toEqual(['M270']);
    expect(assessment.failedCaseIds).toEqual([]);
  });

  it('rejects malformed parity and unavailable-cost inputs', () => {
    const parity = supported();
    parity[0] = {
      ...parity[0],
      reflectionParity:'orientation_reversing',
    };

    expect(() =>
      assessNeutralEarControlledAnatomicalMappingFR104(
        parity,
      ),
    ).toThrow(FaceAuthorityValidationError);

    const unavailable = supported();
    unavailable[3] = {
      ...unavailable[3],
      available:false,
      directCost:0,
      swappedCost:null,
    };

    expect(() =>
      assessNeutralEarControlledAnatomicalMappingFR104(
        unavailable,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
