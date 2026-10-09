import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  admitNeutralEarProspectiveIndependentGeometryResultFR104,
} from './neutral-ear-prospective-independent-geometry-result-intake-fr104.js';

const ids = [
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const;

const exact = {
  R0:['non_mirrored','orientation_preserving',0,0,'ce342bbcb32400dff14ee4d6c3ea88df9b944f42d9699d789007e3a79c086e3b',0.027928257825205603,0.4250445225028384,'direct_assignment_closer'],
  R90:['non_mirrored','orientation_preserving',90,270,'f00620e47be708aa407345708617929d3fc279fd20f6a7f42798bbd8ca367e57',0.029718198041168414,0.4243093468638832,'direct_assignment_closer'],
  R180:['non_mirrored','orientation_preserving',180,180,'42a2af28737f9e0bd46a68acc9406b794a8e9c5f2ec3114e4a172e8ebe2ba354',0.02890459634878363,0.4285892132847949,'direct_assignment_closer'],
  R270:['non_mirrored','orientation_preserving',270,90,'3fd03835d63960f206736d39352cda8d477f1c83d4d0d5a03f60249f307e19a3',0.027013495539828767,0.427821617867851,'direct_assignment_closer'],
  M0:['mirrored','orientation_reversing',0,0,'e1145dbfc731fbffd537364578e682b0d9399cd3cab295b57281dc160c800c8c',0.42772041164106067,0.02697392168748674,'swapped_assignment_closer'],
  M90:['mirrored','orientation_reversing',90,270,'bac6477f5f69b6b9411cdd803bdecd263e6a69fd550f8933e1bede880365a630',0.4285124926745898,0.028820229662936306,'swapped_assignment_closer'],
  M180:['mirrored','orientation_reversing',180,180,'4eb5a34ff3b791c703d41636c9dd8c1997c798760fc0af6a44307b70a6afa457',0.4265415151981318,0.029106096735218745,'swapped_assignment_closer'],
  M270:['mirrored','orientation_reversing',270,90,'7d9ec7319a21e9416a3d1b376a08dbe3e09f85e36abf5ea5bf852dc8a847fd3c',0.4253760585961517,0.029034204988878376,'swapped_assignment_closer'],
} as const;

function candidate() {
  return {
    schemaVersion:'fr104-prospective-independent-geometry-provider-result-v1',
    authorityState:'prospective_candidate_result_not_admitted',
    studyKind:
      'prospective_preregistered_independent_geometry_fixture_validation_same_anatomical_source_family',
    fixture:{
      fixtureRef:'makehuman_head_scale_horiz_incr_weight_1_u4b',
      expectedPngSha256:
        '91a481011618f7a74aed7380185d640c604dcde587eff69b6f44654c97585b33',
      observedPngSha256:
        '91a481011618f7a74aed7380185d640c604dcde587eff69b6f44654c97585b33',
      digestVerified:true,
      width:1024,
      height:1024,
    },
    runtime:{
      packageName:'@mediapipe/tasks-vision',
      packageVersion:'0.10.35',
      runningMode:'IMAGE',
      numFaces:1,
      expectedLandmarkCount:478,
      imageProcessingOptionsRotationDegreesUsed:true,
    },
    cases:ids.map((id) => {
      const item = exact[id];
      return {
        id,
        family:item[0],
        reflectionParity:item[1],
        physicalClockwiseRotationDegrees:item[2],
        compensationDegrees:item[3],
        transformedRgbaSha256:item[4],
        directCost:item[5],
        swappedCost:item[6],
        relation:item[7],
        provider:{
          eligibilityState:'exact_one_face_478_landmarks_observed',
          faceCount:1,
          landmarkCount:478,
        },
      };
    }),
    assessment:{
      state:'prospective_independent_geometry_mapping_supported',
      evaluatedCaseIds:[...ids],
      unavailableCaseIds:[],
      failedCaseIds:[],
      orientationPreservingDirectForEveryAvailableCase:true,
      orientationReversingSwappedForEveryAvailableCase:true,
      allEightCasesAvailable:true,
      numericAcceptanceThresholdApplied:false,
    },
    interpretationBoundary:{
      prospectiveGeometryFixtureIndependentFromU4a:true,
      sourceFamilyIndependentFromU4a:false,
      globalProviderAnatomicalSemanticsMayBeEstablished:false,
      runtimeSubjectPhotoLateralityMayBeAuthorized:false,
      crossSourceFamilyValidationStillRequired:true,
    },
    privacy:{
      userImageConsumed:false,
      cameraAccessed:false,
      rawProviderLandmarksReturned:false,
      rawProviderLandmarksPersisted:false,
      transformedRasterPersisted:false,
      biometricEmbeddingProduced:false,
      identityTemplateProduced:false,
    },
    execution:{
      allEightCasesAttempted:true,
      providerExecuted:true,
      empiricalResultAdmitted:false,
      resultDigestPinned:false,
      ruleRetunedAfterObservation:false,
    },
    authority:{
      u4bFixtureDigestPinned:true,
      prospectiveIndependentGeometryValidationExecuted:false,
      prospectiveIndependentGeometryMappingValidated:false,
      providerLabelMappedToAnatomicalSide:false,
      globalProviderAnatomicalSemanticsEstablished:false,
      anatomicalReferenceAdmitted:false,
      anatomicalLateralityAuthorized:false,
      validatedExternalEarObservationAuthorized:false,
      traditionalBindingAuthorized:false,
      productionAuthorization:false,
    },
  };
}

const digest =
  'e601205ccdad7ec66900d953ed6f742e04dbd37e6074ccc4bb36bf21dd3b16a8';

describe('FR104 U4B-C result intake', () => {
  it('admits only the exact prospective supported candidate', () => {
    const evidence =
      admitNeutralEarProspectiveIndependentGeometryResultFR104(
        candidate(),
        digest,
      );

    expect(
      evidence.prospectiveIndependentGeometryValidationExecuted,
    ).toBe(true);
    expect(
      evidence.prospectiveIndependentGeometryMappingValidated,
    ).toBe(true);
    expect(evidence.anatomicalLateralityAuthorized).toBe(false);
    expect(evidence.productionAuthorization).toBe(false);
  });

  it('rejects digest drift', () => {
    expect(() =>
      admitNeutralEarProspectiveIndependentGeometryResultFR104(
        candidate(),
        '0000000000000000000000000000000000000000000000000000000000000000',
      ),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('rejects scientific case drift', () => {
    const mutated =
      structuredClone(candidate()) as unknown as {
        cases:Array<Record<string, unknown>>;
      };
    mutated.cases[1]!.directCost = 1;

    expect(() =>
      admitNeutralEarProspectiveIndependentGeometryResultFR104(
        mutated,
        digest,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('rejects premature runtime authority', () => {
    const mutated =
      structuredClone(candidate()) as unknown as {
        authority:Record<string, unknown>;
      };
    mutated.authority.anatomicalLateralityAuthorized = true;

    expect(() =>
      admitNeutralEarProspectiveIndependentGeometryResultFR104(
        mutated,
        digest,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
