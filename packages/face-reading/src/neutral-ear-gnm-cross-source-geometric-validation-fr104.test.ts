import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  assessNeutralEarGnmCrossSourceGeometryFR104,
  NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104,
  type NeutralEarGnmCrossSourceGeometryObservationFR104V1,
} from './neutral-ear-gnm-cross-source-geometric-validation-fr104.js';

const ids = [
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const;

function supported():
  NeutralEarGnmCrossSourceGeometryObservationFR104V1[] {
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

describe('FR104 U5B-A GNM cross-source geometric preregistration', () => {
  it('requires the admitted U5A semantic witness and exact source anchors', () => {
    const protocol =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104;

    expect(
      protocol.predecessor.gnmCrossSourceSemanticWitnessAudited,
    ).toBe(true);
    expect(protocol.predecessor.u5aResultSha256).toBe(
      '7eac8cb7b030fed200cf6d4b7d8406901449f130deb3b44c7ef2b98a79b6cd21',
    );
    expect(protocol.predecessor.u5aAdmissionMergeSha).toBe(
      '1abdec05f7c0204d25503b4400fdd487a187d548',
    );
    expect(
      protocol.semanticGroundTruth.anatomicalLeftEye.sourcePoint,
    ).toEqual([
      0.030839037150144577,
      0.30316492915153503,
      0.09888789802789688,
    ]);
    expect(
      protocol.semanticGroundTruth.anatomicalRightEye.sourcePoint,
    ).toEqual([
      -0.030866222456097603,
      0.3031134307384491,
      0.09897840023040771,
    ]);
  });

  it('freezes exact GNM geometry and coordinate provenance without execution', () => {
    const protocol =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104;

    expect(protocol.sourceAsset.repository).toBe('google/GNM');
    expect(protocol.sourceAsset.upstreamCommit).toBe(
      'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690',
    );
    expect(protocol.sourceAsset.gitBlobSha).toBe(
      'ae49903ad7d50ce1d64e464a0407441f2781873c',
    );
    expect(protocol.sourceAsset.requiredGeometryArrays).toEqual([
      'template_vertex_positions',
      'triangles',
    ]);
    expect(protocol.sourceAsset.requiredSemanticArrays).toEqual([
      'joint_names',
      'template_joint_positions',
    ]);
    expect(protocol.sourceAsset.coordinateConvention).toEqual({
      handedness:'right-handed',
      upAxis:'+Y',
      forwardAxis:'+Z',
      unit:'meter',
    });
    expect(protocol.prospectiveFixture.renderedFixtureSha256).toBeNull();
    expect(protocol.prospectiveFixture.renderMayExecuteInU5bA).toBe(false);
    expect(protocol.prospectiveFixture.providerMayExecuteInU5bA).toBe(false);
  });

  it('reuses the existing GNM full-head framing rule instead of tuning a new camera', () => {
    const camera =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104
        .renderer.camera;

    expect(camera.centerRule).toBe(
      'full_gnm_template_xyz_bounds_midpoint',
    );
    expect(camera.spanRule).toBe(
      'max(full_template_span_y_times_1_24,full_template_span_x_times_1_34)',
    );
    expect(camera.framingRuleReusedFromExistingGnmHeadScene).toBe(true);
    expect(camera.screenRightAxis).toBe('+X');
    expect(camera.screenUpAxis).toBe('+Y');
  });

  it('reuses U4B provider extraction and exact eight-case transform matrix', () => {
    const protocol =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104;

    expect(
      protocol.providerRuntime.providerEyeExtraction.topologyWitness,
    ).toBe('FR24_EYE_TOPOLOGY_WITNESS_EDGES');
    expect(
      protocol.providerRuntime.providerEyeExtraction.providerLeftSymbol,
    ).toBe('FACE_LANDMARKS_LEFT_EYE');
    expect(
      protocol.providerRuntime.providerEyeExtraction.providerRightSymbol,
    ).toBe('FACE_LANDMARKS_RIGHT_EYE');
    expect(
      protocol.providerRuntime.providerEyeExtraction
        .newLandmarkSelectionAuthorized,
    ).toBe(false);
    expect(protocol.cases.map((item) => item.id)).toEqual(ids);
    expect(protocol.cases.map((item) => item.compensationDegrees)).toEqual([
      0,270,180,90,0,270,180,90,
    ]);
  });

  it('supports only when all eight preregistered cases satisfy parity rules', () => {
    const assessment =
      assessNeutralEarGnmCrossSourceGeometryFR104(supported());

    expect(assessment.state).toBe(
      'gnm_cross_source_geometric_mapping_supported',
    );
    expect(assessment.evaluatedCaseIds).toEqual(ids);
    expect(assessment.unavailableCaseIds).toEqual([]);
    expect(assessment.failedCaseIds).toEqual([]);
    expect(assessment.allEightCasesAvailable).toBe(true);
    expect(assessment.numericAcceptanceThresholdApplied).toBe(false);
    expect(assessment.aggregateOverrideApplied).toBe(false);
  });

  it('refutes an explicit failed case and never retunes after observation', () => {
    const input = supported();
    input[1] = {
      ...input[1]!,
      directCost:0.5,
      swappedCost:0.01,
    };
    const assessment =
      assessNeutralEarGnmCrossSourceGeometryFR104(input);

    expect(assessment.state).toBe(
      'gnm_cross_source_geometric_mapping_refuted',
    );
    expect(assessment.failedCaseIds).toEqual(['R90']);
    expect(
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104
        .frozenRule.ruleMayBeRetunedAfterProspectiveObservation,
    ).toBe(false);
  });

  it('keeps unavailable evidence unresolved', () => {
    const input = supported();
    input[7] = {
      ...input[7]!,
      available:false,
      directCost:null,
      swappedCost:null,
    };
    const assessment =
      assessNeutralEarGnmCrossSourceGeometryFR104(input);

    expect(assessment.state).toBe(
      'gnm_cross_source_geometric_mapping_unresolved',
    );
    expect(assessment.unavailableCaseIds).toEqual(['M270']);
    expect(assessment.failedCaseIds).toEqual([]);
  });

  it('rejects malformed parity, duplicate cases, and unavailable costs', () => {
    const parity = supported();
    parity[0] = {
      ...parity[0]!,
      reflectionParity:'orientation_reversing',
    };
    expect(() =>
      assessNeutralEarGnmCrossSourceGeometryFR104(parity),
    ).toThrow(FaceAuthorityValidationError);

    const duplicate = supported();
    duplicate[7] = { ...duplicate[7]!, id:'M180' };
    expect(() =>
      assessNeutralEarGnmCrossSourceGeometryFR104(duplicate),
    ).toThrow(FaceAuthorityValidationError);

    const unavailable = supported();
    unavailable[2] = {
      ...unavailable[2]!,
      available:false,
      directCost:0,
      swappedCost:null,
    };
    expect(() =>
      assessNeutralEarGnmCrossSourceGeometryFR104(unavailable),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('keeps all downstream authority closed in U5B-A', () => {
    const protocol =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104;

    expect(protocol.authority.gnmCrossSourceSemanticWitnessAudited).toBe(true);
    expect(
      protocol.authority.gnmCrossSourceGeometricValidationExecuted,
    ).toBe(false);
    expect(
      protocol.authority.gnmCrossSourceGeometricMappingValidated,
    ).toBe(false);
    expect(protocol.authority.providerLabelMappedToAnatomicalSide).toBe(false);
    expect(
      protocol.authority.globalProviderAnatomicalSemanticsEstablished,
    ).toBe(false);
    expect(protocol.authority.anatomicalReferenceAdmitted).toBe(false);
    expect(protocol.authority.anatomicalLateralityAuthorized).toBe(false);
    expect(
      protocol.authority.validatedExternalEarObservationAuthorized,
    ).toBe(false);
    expect(protocol.authority.traditionalBindingAuthorized).toBe(false);
    expect(protocol.authority.productionAuthorization).toBe(false);
  });
});
