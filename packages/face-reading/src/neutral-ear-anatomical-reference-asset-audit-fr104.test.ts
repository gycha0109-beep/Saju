import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104,
} from './neutral-ear-anatomical-reference-asset-audit-fr104.js';

describe('FR104 U0 anatomical reference asset audit', () => {
  it('does not admit any candidate before deterministic provider preflight', () => {
    const audit =
      NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104;

    expect(audit.decision.admittedCandidateCount).toBe(0);
    expect(
      audit.decision.primaryPreflightCandidateRef,
    ).toBe('makehuman_default_cc0_head_reference');
    expect(
      audit.decision.primaryCandidateMayBeCalledAdmitted,
    ).toBe(false);
    expect(audit.authority.anatomicalReferenceAdmitted)
      .toBe(false);
  });

  it('selects MakeHuman only as the strongest preflight candidate', () => {
    const makeHuman =
      NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104
        .candidates.find(
          (candidate) =>
            candidate.candidateRef
              === 'makehuman_default_cc0_head_reference',
        );

    expect(makeHuman).toMatchObject({
      state: 'usable_for_diagnostic_only',
      sourceFamily: 'makehuman',
      license: {
        expression: 'CC0-1.0 bundled assets',
        projectPolicyAdmissible: true,
      },
      anatomicalGroundTruth: {
        independentFromMediaPipeProvider: true,
        explicitLeftRightNamedAnchors: true,
        explicitEyeCentersOrEyeJoints: true,
        leftRightAxisDefinitionDirectlyWitnessed: true,
        providerLabelDerived: false,
      },
      providerPreflight: {
        exactlyOneFaceVerified: false,
        exactRuntime: '@mediapipe/tasks-vision@0.10.35',
      },
    });
    expect(makeHuman?.admissionBlockers).toContain(
      'provider_exactly_one_face_detectability_not_yet_verified',
    );
  });

  it('keeps CesiumMan blocked because eye-centered anatomical anchors are not governed', () => {
    const candidate =
      NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104
        .candidates.find(
          (item) =>
            item.candidateRef === 'khronos_cesium_man',
        );

    expect(candidate?.state).toBe('source_axis_ambiguous');
    expect(
      candidate?.anatomicalGroundTruth
        .explicitLeftRightNamedAnchors,
    ).toBe(true);
    expect(
      candidate?.anatomicalGroundTruth
        .explicitEyeCentersOrEyeJoints,
    ).toBe(false);
    expect(
      candidate?.anatomicalGroundTruth
        .leftRightAxisDefinitionDirectlyWitnessed,
    ).toBe(false);
  });

  it('does not use the MediaPipe canonical face as independent anatomical truth', () => {
    const candidate =
      NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104
        .candidates.find(
          (item) =>
            item.candidateRef
              === 'mediapipe_canonical_face_model',
        );

    expect(candidate?.state)
      .toBe('usable_for_diagnostic_only');
    expect(
      candidate?.anatomicalGroundTruth
        .independentFromMediaPipeProvider,
    ).toBe(false);
  });

  it('rejects the Poser EULA candidate under the project fixture policy', () => {
    const candidate =
      NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104
        .candidates.find(
          (item) =>
            item.candidateRef
              === 'khronos_brainstem_poser_asset',
        );

    expect(candidate?.state).toBe('license_not_admissible');
    expect(candidate?.license.projectPolicyAdmissible)
      .toBe(false);
  });

  it('keeps all downstream authority closed', () => {
    const authority =
      NEUTRAL_EAR_ANATOMICAL_REFERENCE_ASSET_AUDIT_FR104
        .authority;

    expect(authority.anatomicalReferenceAdmitted)
      .toBe(false);
    expect(authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(authority.validatedExternalEarObservationAuthorized)
      .toBe(false);
    expect(authority.traditionalBindingAuthorized)
      .toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
