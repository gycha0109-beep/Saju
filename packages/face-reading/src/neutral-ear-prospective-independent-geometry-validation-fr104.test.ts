import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  assessNeutralEarProspectiveIndependentGeometryFR104,
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_FR104,
  type NeutralEarProspectiveIndependentGeometryObservationFR104V1,
} from './neutral-ear-prospective-independent-geometry-validation-fr104.js';

const ids = [
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const;

function supported(): NeutralEarProspectiveIndependentGeometryObservationFR104V1[] {
  return ids.map((id) => {
    const preserving = id.startsWith('R');
    return {
      id,
      available:true,
      reflectionParity: preserving
        ? 'orientation_preserving' as const
        : 'orientation_reversing' as const,
      directCost: preserving ? 0.02 : 0.4,
      swappedCost: preserving ? 0.4 : 0.02,
    };
  });
}

describe('FR104 U4B-A prospective independent geometry preregistration', () => {
  it('freezes source, target, weight, and no-execution boundary', () => {
    const protocol =
      NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_FR104;

    expect(protocol.authorityState).toBe(
      'preregistered_no_u4b_fixture_render_or_provider_result_observed_or_admitted',
    );
    expect(protocol.prospectiveFixture.morphTarget.path).toBe(
      'makehuman/data/targets/head/head-scale-horiz-incr.target',
    );
    expect(protocol.prospectiveFixture.morphTarget.blobSha).toBe(
      '9a32e90f7bd4d0a90092052d89137a365e272a67',
    );
    expect(protocol.prospectiveFixture.morphTarget.weight).toBe(1);
    expect(
      protocol.prospectiveFixture
        .targetRuntimeWitness.blobSha,
    ).toBe(
      'eaaf4e9c3d9c67d374a3fe8761812929f2c0f81e',
    );
    expect(
      protocol.prospectiveFixture.renderedFixtureSha256,
    ).toBeNull();
    expect(
      protocol.prospectiveFixture.renderMayExecuteInU4bA,
    ).toBe(false);
    expect(
      protocol.prospectiveFixture.providerMayExecuteInU4bA,
    ).toBe(false);
  });

  it('records geometry independence without claiming source-family independence', () => {
    const independence =
      NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_FR104
        .prospectiveFixture.independence;

    expect(independence.geometryUsedInU4a).toBe(false);
    expect(independence.sameSourceFamilyAsU4a).toBe(true);
    expect(independence.independentSourceFamily).toBe(false);
    expect(
      independence.u4aNumericCaseCostsUsedToTuneTargetOrWeight,
    ).toBe(false);
    expect(
      independence.targetOrWeightMayBeRetunedAfterU4bObservation,
    ).toBe(false);
  });

  it('supports the frozen reflection-parity rule only when all eight cases pass', () => {
    const assessment =
      assessNeutralEarProspectiveIndependentGeometryFR104(
        supported(),
      );

    expect(assessment.state).toBe(
      'prospective_independent_geometry_mapping_supported',
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

  it('refutes rather than retunes a failed prospective case', () => {
    const input = supported();
    input[1] = {
      ...input[1]!,
      directCost:0.5,
      swappedCost:0.01,
    };

    const assessment =
      assessNeutralEarProspectiveIndependentGeometryFR104(
        input,
      );

    expect(assessment.state).toBe(
      'prospective_independent_geometry_mapping_refuted',
    );
    expect(assessment.failedCaseIds).toEqual(['R90']);
  });

  it('keeps incomplete evidence unresolved', () => {
    const input = supported();
    input[7] = {
      ...input[7]!,
      available:false,
      directCost:null,
      swappedCost:null,
    };

    const assessment =
      assessNeutralEarProspectiveIndependentGeometryFR104(
        input,
      );

    expect(assessment.state).toBe(
      'prospective_independent_geometry_mapping_unresolved',
    );
    expect(assessment.unavailableCaseIds).toEqual(['M270']);
    expect(assessment.failedCaseIds).toEqual([]);
  });

  it('rejects malformed parity and unavailable-cost input', () => {
    const parity = supported();
    parity[0] = {
      ...parity[0]!,
      reflectionParity:'orientation_reversing',
    };
    expect(() =>
      assessNeutralEarProspectiveIndependentGeometryFR104(
        parity,
      ),
    ).toThrow(FaceAuthorityValidationError);

    const unavailable = supported();
    unavailable[2] = {
      ...unavailable[2]!,
      available:false,
      directCost:0,
      swappedCost:null,
    };
    expect(() =>
      assessNeutralEarProspectiveIndependentGeometryFR104(
        unavailable,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
