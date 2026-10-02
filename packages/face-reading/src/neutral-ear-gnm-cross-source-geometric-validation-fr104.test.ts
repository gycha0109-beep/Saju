import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  assessNeutralEarGNMCrossSourceGeometricValidationFR104,
  NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104,
  type NeutralEarGNMCrossSourceGeometricObservationFR104V1,
} from './neutral-ear-gnm-cross-source-geometric-validation-fr104.js';

const ids = [
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const;

function supported():
  NeutralEarGNMCrossSourceGeometricObservationFR104V1[] {
  return ids.map((id) => {
    const preserving = id.startsWith('R');
    return {
      id,
      available:true,
      reflectionParity: preserving
        ? 'orientation_preserving' as const
        : 'orientation_reversing' as const,
      directCost:preserving ? 0.02 : 0.4,
      swappedCost:preserving ? 0.4 : 0.02,
    };
  });
}

describe('FR104 U5B-A GNM cross-source geometric preregistration', () => {
  it('requires the admitted U5A semantic witness without promoting geometry authority', () => {
    const protocol =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104;

    expect(
      protocol.predecessor.gnmCrossSourceSemanticWitnessAudited,
    ).toBe(true);
    expect(
      protocol.predecessor.crossSourceFamilyGeometricValidationExecuted,
    ).toBe(false);
    expect(protocol.authority.gnmCrossSourceSemanticWitnessAudited)
      .toBe(true);
    expect(protocol.authority.gnmCrossSourceGeometricValidationExecuted)
      .toBe(false);
    expect(protocol.authority.gnmCrossSourceGeometricMappingValidated)
      .toBe(false);
  });

  it('pins exact GNM source and direct named anatomical anchors', () => {
    const protocol =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104;

    expect(protocol.sourceAsset.repository).toBe('google/GNM');
    expect(protocol.sourceAsset.upstreamCommit).toBe(
      'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690',
    );
    expect(protocol.sourceAsset.gitBlobSha).toBe(
      'ae49903ad7d50ce1d64e464a0407441f2781873c',
    );
    expect(protocol.sourceAsset.byteLength).toBe(53305389);
    expect(protocol.anatomicalGroundTruth.leftEye.jointName)
      .toBe('left_eye');
    expect(protocol.anatomicalGroundTruth.leftEye.jointIndex).toBe(2);
    expect(protocol.anatomicalGroundTruth.rightEye.jointName)
      .toBe('right_eye');
    expect(protocol.anatomicalGroundTruth.rightEye.jointIndex).toBe(3);
    expect(
      protocol.anatomicalGroundTruth.imageSpaceXSignDefinesAnatomicalSide,
    ).toBe(false);
    expect(
      protocol.anatomicalGroundTruth.gnmAxisOrderingDefinesAnatomicalSide,
    ).toBe(false);
    expect(
      protocol.anatomicalGroundTruth.providerLabelsDefineAnatomicalSide,
    ).toBe(false);
  });

  it('freezes provider-blind renderer and prohibits U5B-A live execution', () => {
    const renderer =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104.renderer;
    const runtime =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104
        .providerRuntime;

    expect(renderer.width).toBe(1024);
    expect(renderer.height).toBe(1024);
    expect(renderer.camera.projectionModel).toBe('orthographic');
    expect(renderer.camera.canonicalUpAxis).toBe('+Y');
    expect(renderer.camera.canonicalFrontCameraSide).toBe('+Z');
    expect(renderer.renderedFixtureSha256).toBeNull();
    expect(renderer.npzFetchAllowedInU5bA).toBe(false);
    expect(renderer.renderMayExecuteInU5bA).toBe(false);
    expect(runtime.providerExecutionAllowedInU5bA).toBe(false);
  });

  it('freezes the same eight reflection-parity cases without a numeric threshold', () => {
    const protocol =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104;

    expect(protocol.cases.map((item) => item.id)).toEqual(ids);
    expect(
      protocol.cases.filter((item) => item.id.startsWith('R'))
        .every((item) =>
          item.reflectionParity === 'orientation_preserving'),
    ).toBe(true);
    expect(
      protocol.cases.filter((item) => item.id.startsWith('M'))
        .every((item) =>
          item.reflectionParity === 'orientation_reversing'),
    ).toBe(true);
    expect(protocol.frozenRule.numericAcceptanceThresholdAuthorized)
      .toBe(false);
    expect(protocol.frozenRule.aggregateOverrideAuthorized).toBe(false);
    expect(protocol.frozenRule.ruleMayBeRetunedAfterObservation)
      .toBe(false);
    expect(protocol.frozenRule.cameraMayBeRetunedAfterRenderObservation)
      .toBe(false);
    expect(protocol.frozenRule.rendererMayBeRetunedAfterProviderObservation)
      .toBe(false);
  });

  it('supports only when all eight preregistered cases satisfy parity', () => {
    const result =
      assessNeutralEarGNMCrossSourceGeometricValidationFR104(
        supported(),
      );

    expect(result.state).toBe(
      'gnm_cross_source_geometric_mapping_supported',
    );
    expect(result.evaluatedCaseIds).toEqual(ids);
    expect(result.unavailableCaseIds).toEqual([]);
    expect(result.failedCaseIds).toEqual([]);
    expect(result.allEightCasesAvailable).toBe(true);
    expect(result.numericAcceptanceThresholdApplied).toBe(false);
    expect(result.aggregateOverrideApplied).toBe(false);
  });

  it('refutes a contrary case instead of retuning the rule', () => {
    const observations = supported();
    observations[0] = {
      ...observations[0]!,
      directCost:0.5,
      swappedCost:0.01,
    };

    const result =
      assessNeutralEarGNMCrossSourceGeometricValidationFR104(
        observations,
      );

    expect(result.state).toBe(
      'gnm_cross_source_geometric_mapping_refuted',
    );
    expect(result.failedCaseIds).toEqual(['R0']);
  });

  it('keeps missing provider evidence unresolved', () => {
    const observations = supported();
    observations[7] = {
      ...observations[7]!,
      available:false,
      directCost:null,
      swappedCost:null,
    };

    const result =
      assessNeutralEarGNMCrossSourceGeometricValidationFR104(
        observations,
      );

    expect(result.state).toBe(
      'gnm_cross_source_geometric_mapping_unresolved',
    );
    expect(result.unavailableCaseIds).toEqual(['M270']);
  });

  it('fails closed on malformed parity or unavailable costs', () => {
    const parity = supported();
    parity[0] = {
      ...parity[0]!,
      reflectionParity:'orientation_reversing',
    };
    expect(() =>
      assessNeutralEarGNMCrossSourceGeometricValidationFR104(parity),
    ).toThrow(FaceAuthorityValidationError);

    const unavailable = supported();
    unavailable[1] = {
      ...unavailable[1]!,
      available:false,
      directCost:0,
      swappedCost:null,
    };
    expect(() =>
      assessNeutralEarGNMCrossSourceGeometricValidationFR104(unavailable),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('keeps subject-photo, traditional, and production authority closed', () => {
    const protocol =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_VALIDATION_FR104;

    expect(
      protocol.interpretationBoundary
        .runtimeSubjectPhotoLateralityMayBeAuthorized,
    ).toBe(false);
    expect(
      protocol.interpretationBoundary.traditionalMeaningMayBeInferred,
    ).toBe(false);
    expect(protocol.authority.providerLabelMappedToAnatomicalSide)
      .toBe(false);
    expect(protocol.authority.anatomicalLateralityAuthorized).toBe(false);
    expect(protocol.authority.traditionalBindingAuthorized).toBe(false);
    expect(protocol.authority.productionAuthorization).toBe(false);
  });
});
