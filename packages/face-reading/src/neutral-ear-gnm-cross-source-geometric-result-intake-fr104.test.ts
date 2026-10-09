import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  admitNeutralEarGnmCrossSourceGeometryResultFR104,
} from './neutral-ear-gnm-cross-source-geometric-result-intake-fr104.js';

const ids = [
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const;

const exact = {
  R0:[
    'non_mirrored',
    'orientation_preserving',
    false,
    0,
    0,
    '45e5d55d6d179cc906f23597e6456763dc38e92f8d82662b0547dcda7327b897',
    0.012882031198933767,
    0.2859449713275122,
    'direct_assignment_closer',
  ],
  R90:[
    'non_mirrored',
    'orientation_preserving',
    false,
    90,
    270,
    'a93687aa1f8652e51c40333acef87885852910fca8d3ee81f1a22bc836dc20ce',
    0.01439847854266454,
    0.28563923801751523,
    'direct_assignment_closer',
  ],
  R180:[
    'non_mirrored',
    'orientation_preserving',
    false,
    180,
    180,
    'c6519a12f9e98e5caa6687057c159776095e7acf18ba4563423ecdb541184ea5',
    0.014967380835671621,
    0.28673710470008695,
    'direct_assignment_closer',
  ],
  R270:[
    'non_mirrored',
    'orientation_preserving',
    false,
    270,
    90,
    'db399de883e866a520e0d3e940288b685e38e1c1f0ed1c9ba943bda2ab92571b',
    0.013149344314935387,
    0.2883262973150461,
    'direct_assignment_closer',
  ],
  M0:[
    'mirrored',
    'orientation_reversing',
    true,
    0,
    0,
    '36071374d0e60d3f03d170fcc3e211363fcfbcb2ad7cd4efc00db99bd99257c2',
    0.28979418849201966,
    0.01253495018132203,
    'swapped_assignment_closer',
  ],
  M90:[
    'mirrored',
    'orientation_reversing',
    true,
    90,
    270,
    '8e0a23684fe06cb84cd16d6e06681fa5dec663127b1cb14b7aa397d3e6968572',
    0.28756890003625524,
    0.015743050990045394,
    'swapped_assignment_closer',
  ],
  M180:[
    'mirrored',
    'orientation_reversing',
    true,
    180,
    180,
    'faf0d3eff9ba7713d7b65cc6ac85765356f0797b476f2ef6989fe2091a280ee3',
    0.2883129305537383,
    0.015266341568986312,
    'swapped_assignment_closer',
  ],
  M270:[
    'mirrored',
    'orientation_reversing',
    true,
    270,
    90,
    '5c8f02999dc7789218f5e5bac79d16e2de76e43f774a8ffe67209ebddc2311ff',
    0.2870139936542212,
    0.014249632206525012,
    'swapped_assignment_closer',
  ],
} as const;

function candidate() {
  return {
    schemaVersion:'fr104-gnm-cross-source-geometric-provider-result-v1',
    authorityState:'prospective_candidate_result_not_admitted',
    studyKind:
      'prospective_preregistered_cross_source_family_geometric_validation',
    preregistration:{
      preregistrationMergeSha:
        'dca237437d170ef03f8d15d370726a82c68345c3',
      fixturePinMergeRequiredBeforeExecution:true,
      frozenRule:{
        providerInferenceCompensation:
          'rotationDegrees_equals_inverse_physical_rotation',
        returnedProviderCoordinateNormalization:
          'explicit_inverse_physical_rotation',
        anatomicalGroundTruthCoordinateNormalization:
          'explicit_inverse_physical_rotation',
        mirrorSemanticIdentityRule:
          'mirror_changes_screen_coordinate_but_does_not_swap_anatomical_identity',
        orientationPreservingRule:
          'directCost_strictly_less_than_swappedCost',
        orientationReversingRule:
          'swappedCost_strictly_less_than_directCost',
        numericAcceptanceThresholdAuthorized:false,
        everyAvailableCaseMustSatisfyItsReflectionParityRule:true,
        aggregateOverrideAuthorized:false,
        ruleMayBeRetunedAfterProspectiveObservation:false,
      },
    },
    fixture:{
      fixtureId:'google_gnm_head_v3_u5b',
      expectedPngSha256:
        '1af28c1677375f5551e3613bbc7e0d78bfba83e74df2438c0819a343252cc325',
      observedPngSha256:
        '1af28c1677375f5551e3613bbc7e0d78bfba83e74df2438c0819a343252cc325',
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
        horizontalMirror:item[2],
        physicalClockwiseRotationDegrees:item[3],
        compensationDegrees:item[4],
        transformedRgbaSha256:item[5],
        directCost:item[6],
        swappedCost:item[7],
        relation:item[8],
        provider:{
          eligibilityState:'exact_one_face_478_landmarks_observed',
          faceCount:1,
          landmarkCount:478,
        },
      };
    }),
    assessment:{
      state:'gnm_cross_source_geometric_mapping_supported',
      evaluatedCaseIds:[...ids],
      unavailableCaseIds:[],
      failedCaseIds:[],
      orientationPreservingDirectForEveryAvailableCase:true,
      orientationReversingSwappedForEveryAvailableCase:true,
      allEightCasesAvailable:true,
      numericAcceptanceThresholdApplied:false,
      aggregateOverrideApplied:false,
      providerPublishedSideNamesUsedAsAnatomicalAuthority:false,
      imageSpaceXSignUsedAsAnatomicalAuthority:false,
      gnmAxisOrderingUsedAsAnatomicalAuthority:false,
    },
    interpretationBoundary:{
      sourceFamilyIndependentFromMakeHuman:true,
      sourceFamilyIndependentFromMediaPipe:true,
      providerPublishedSideNamesUsedAsAnatomicalAuthority:false,
      imageSpaceXSignUsedAsAnatomicalAuthority:false,
      gnmAxisOrderingUsedAsAnatomicalAuthority:false,
      globalProviderAnatomicalSemanticsMayBeEstablished:false,
      runtimeSubjectPhotoLateralityMayBeAuthorized:false,
      traditionalMeaningMayBeInferred:false,
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
      gnmCrossSourceSemanticWitnessAudited:true,
      gnmCrossSourceFixtureDigestPinned:true,
      gnmCrossSourceGeometricValidationExecuted:false,
      gnmCrossSourceGeometricMappingValidated:false,
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
  '7c284cad3b467676e20c44ebf63a7aee3dc66c5d22534363286ef532ba3852fe';

describe('FR104 U5B-D GNM cross-source geometry result intake', () => {
  it('admits only the exact supported candidate', () => {
    const evidence =
      admitNeutralEarGnmCrossSourceGeometryResultFR104(
        candidate(),
        digest,
      );

    expect(evidence.gnmCrossSourceSemanticWitnessAudited).toBe(true);
    expect(evidence.gnmCrossSourceFixtureDigestPinned).toBe(true);
    expect(evidence.gnmCrossSourceGeometricValidationExecuted).toBe(true);
    expect(evidence.gnmCrossSourceGeometricMappingValidated).toBe(true);
    expect(evidence.globalProviderAnatomicalSemanticsEstablished).toBe(false);
    expect(evidence.anatomicalLateralityAuthorized).toBe(false);
    expect(evidence.traditionalBindingAuthorized).toBe(false);
    expect(evidence.productionAuthorization).toBe(false);
  });

  it('rejects digest drift', () => {
    expect(() =>
      admitNeutralEarGnmCrossSourceGeometryResultFR104(
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
    mutated.cases[0]!.directCost = 1;

    expect(() =>
      admitNeutralEarGnmCrossSourceGeometryResultFR104(
        mutated,
        digest,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('rejects semantic-authority drift', () => {
    const mutated =
      structuredClone(candidate()) as unknown as {
        assessment:Record<string, unknown>;
      };
    mutated.assessment.gnmAxisOrderingUsedAsAnatomicalAuthority = true;

    expect(() =>
      admitNeutralEarGnmCrossSourceGeometryResultFR104(
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
      admitNeutralEarGnmCrossSourceGeometryResultFR104(
        mutated,
        digest,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
