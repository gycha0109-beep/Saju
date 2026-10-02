import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  admitNeutralEarGnmCrossSourceWitnessResultFR104,
} from './neutral-ear-gnm-cross-source-anatomical-witness-result-intake-fr104.js';

function candidate() {
  return {
    schemaVersion:
      'fr104-gnm-cross-source-anatomical-witness-live-result-v1',
    authorityState:'live_candidate_not_admitted',
    studyKind:'cross_source_family_direct_source_semantic_witness_audit',
    assessment:{
      directSourceLeftEyeJointWitnessPresent:true,
      directSourceRightEyeJointWitnessPresent:true,
      jointPositionsUsableAsControlledAnchors:true,
      providerGroupsAvailableForReferenceContext:true,
      state:'gnm_direct_left_right_joint_witness_supported',
    },
    asset:{
      assetVerified:true,
      expectedByteLength:53305389,
      expectedGitBlobSha:'ae49903ad7d50ce1d64e464a0407441f2781873c',
      observedByteLength:53305389,
      observedGitBlobSha:'ae49903ad7d50ce1d64e464a0407441f2781873c',
      repository:'google/GNM',
      sourcePath:'gnm/shape/data/versions/v3_0/gnm_head.npz',
      upstreamCommit:'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690',
      variantNormalized:'head',
      versionNormalized:'3.0',
    },
    directSourceSemanticWitness:{
      leftEyeJointCount:1,
      leftEyeJointIndex:2,
      leftEyeJointName:'left_eye',
      leftEyePositionFinite:true,
      leftEyeTemplateJointPosition:[
        0.030839037150144577,
        0.30316492915153503,
        0.09888789802789688,
      ],
      leftRightPositionsDistinct:true,
      requiredProviderGroups:['ears','left','right'],
      requiredProviderGroupsPresent:true,
      rightEyeJointCount:1,
      rightEyeJointIndex:3,
      rightEyeJointName:'right_eye',
      rightEyePositionFinite:true,
      rightEyeTemplateJointPosition:[
        -0.030866222456097603,
        0.3031134307384491,
        0.09897840023040771,
      ],
    },
    diagnostics:{
      gnmAxisOrderingUsedAsSemanticAuthority:false,
      imageSpaceXSignUsedAsSemanticAuthority:false,
      leftEyeX:0.030839037150144577,
      mediaPipeProviderLabelsUsedAsSemanticAuthority:false,
      rightEyeX:-0.030866222456097603,
      xOrdering:'left_greater_than_right',
    },
    interpretationBoundary:{
      crossSourceFamilyGeometricValidationExecuted:false,
      crossSourceFamilySemanticWitnessCandidate:true,
      globalProviderAnatomicalSemanticsMayBeEstablished:false,
      gnmJointNamingAlreadyAdmittedAsRuntimeMapping:false,
      runtimeSubjectPhotoLateralityMayBeAuthorized:false,
      sourceFamilyDistinctFromMakeHuman:true,
      sourceFamilyDistinctFromMediaPipe:true,
    },
    privacy:{
      biometricEmbeddingProduced:false,
      cameraAccessed:false,
      identityTemplateProduced:false,
      rawProviderLandmarksPersisted:false,
      rawProviderLandmarksReturned:false,
      transformedRasterPersisted:false,
      userImageConsumed:false,
    },
    authority:{
      anatomicalLateralityAuthorized:false,
      anatomicalReferenceAdmitted:false,
      globalProviderAnatomicalSemanticsEstablished:false,
      gnmCrossSourceGeometricValidationExecuted:false,
      gnmCrossSourceSemanticWitnessAudited:false,
      productionAuthorization:false,
      providerLabelMappedToAnatomicalSide:false,
      traditionalBindingAuthorized:false,
      validatedExternalEarObservationAuthorized:false,
    },
  };
}

const digest =
  '7eac8cb7b030fed200cf6d4b7d8406901449f130deb3b44c7ef2b98a79b6cd21';

describe('FR104 U5A-B2 GNM witness result intake', () => {
  it('admits only the exact supported candidate', () => {
    const evidence =
      admitNeutralEarGnmCrossSourceWitnessResultFR104(
        candidate(),
        digest,
      );

    expect(evidence.gnmCrossSourceSemanticWitnessAudited).toBe(true);
    expect(evidence.gnmCrossSourceGeometricValidationExecuted).toBe(false);
    expect(evidence.anatomicalLateralityAuthorized).toBe(false);
    expect(evidence.productionAuthorization).toBe(false);
  });

  it('rejects digest drift', () => {
    expect(() =>
      admitNeutralEarGnmCrossSourceWitnessResultFR104(
        candidate(),
        '0000000000000000000000000000000000000000000000000000000000000000',
      ),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('rejects joint-index drift', () => {
    const mutated =
      structuredClone(candidate()) as unknown as {
        directSourceSemanticWitness:Record<string, unknown>;
      };
    mutated.directSourceSemanticWitness.leftEyeJointIndex = 99;

    expect(() =>
      admitNeutralEarGnmCrossSourceWitnessResultFR104(
        mutated,
        digest,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('rejects exact 3D position drift', () => {
    const mutated =
      structuredClone(candidate()) as unknown as {
        directSourceSemanticWitness:{
          leftEyeTemplateJointPosition:[number, number, number];
        };
      };
    mutated.directSourceSemanticWitness.leftEyeTemplateJointPosition[0] +=
      0.000001;

    expect(() =>
      admitNeutralEarGnmCrossSourceWitnessResultFR104(
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
      admitNeutralEarGnmCrossSourceWitnessResultFR104(
        mutated,
        digest,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
