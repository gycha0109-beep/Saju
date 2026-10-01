import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_AUDIT_FR104,
} from './neutral-ear-controlled-anatomical-side-mapping-audit-fr104.js';
import {
  admitNeutralEarControlledAnatomicalMappingResultFR104,
} from './neutral-ear-controlled-anatomical-side-mapping-result-intake-fr104.js';

const protocol =
  NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_AUDIT_FR104;

const exact = {
  R0:['non_mirrored','orientation_preserving',0,0,'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364',0.02456967216060714,0.35972525227214214,'direct_assignment_closer'],
  R90:['non_mirrored','orientation_preserving',90,270,'5a8da29746625ed14da6580b84d8ebf0116939a7bfe7d7369ea46f19aeac84ed',0.0251961315461134,0.35952807254254904,'direct_assignment_closer'],
  R180:['non_mirrored','orientation_preserving',180,180,'8d725e503a41e01f8e7e48f1466ff54d88c2cd7d3ab9a1df66332625bc7586fc',0.028621665163675758,0.3584955007831722,'direct_assignment_closer'],
  R270:['non_mirrored','orientation_preserving',270,90,'b6d87e6c433f971d167a5c35b8751d351c0047abbf7a1e63f959ce83bc2bcead',0.025449295833505033,0.35839249708583565,'direct_assignment_closer'],
  M0:['mirrored','orientation_reversing',0,0,'5f3b92f9a50d5913d5ba97ff9c5edf9d14e10bdd8a6f8be526cccb32b5f0c0d8',0.35788482319576975,0.025677951082069113,'swapped_assignment_closer'],
  M90:['mirrored','orientation_reversing',90,270,'a0ac410ac805bee1a367df7cb41684376d30eab35c149ab73d81e7d00a9227c4',0.358415418424448,0.028792761353791618,'swapped_assignment_closer'],
  M180:['mirrored','orientation_reversing',180,180,'5e37e4df33d3457988e7780479fa8c8cf97b5d721b56e5a3298caf23d09e4c9f',0.35806848399131674,0.0266075804281148,'swapped_assignment_closer'],
  M270:['mirrored','orientation_reversing',270,90,'73fef262ba0e9aa7d56ce03297e66437596a0e4f6b7da32d4541569e42e5b51b',0.3601669572278045,0.02616992462873194,'swapped_assignment_closer'],
} as const;

const ids = [
  'R0','R90','R180','R270',
  'M0','M90','M180','M270',
] as const;

function candidate() {
  return {
    schemaVersion:'fr104-controlled-anatomical-side-mapping-audit-result-v1',
    authorityState:'retrospective_controlled_mapping_candidate_not_admitted',
    studyKind:protocol.studyKind,
    predecessors:{
      u3_2CompensationResultSha256:
        protocol.predecessors.u3_2CompensationResultSha256,
      u3_2LiveReplayVerified:true,
      u3_3ProspectiveResultSha256:
        protocol.predecessors.u3_3ProspectiveResultSha256,
      u3_3ProspectiveComposedNormalizationValidated:true,
      providerCompensatedOutputFrameProspectivelyValidated:true,
    },
    controlledReference:{
      fixturePngSha256:
        protocol.controlledReference.fixturePngSha256,
      canonicalRgbaSha256:
        protocol.controlledReference.canonicalRgbaSha256,
      independentAnatomicalGroundTruthSource:
        protocol.controlledReference
          .independentAnatomicalGroundTruthSource,
      providerLandmarkDerived:false,
      providerLabelDerived:false,
    },
    normalization:protocol.normalization,
    cases:ids.map((id) => {
      const item = exact[id];
      return {
        id,
        family:item[0],
        reflectionParity:item[1],
        physicalClockwiseRotationDegrees:item[2],
        compensationDegrees:item[3],
        transformedRgbaSha256:item[4],
        available:true,
        directCost:item[5],
        swappedCost:item[6],
        relation:item[7],
      };
    }),
    assessment:{
      state:'reflection_parity_conditional_mapping_supported',
      evaluatedCaseIds:[...ids],
      unavailableCaseIds:[],
      failedCaseIds:[],
      orientationPreservingDirectForEveryAvailableCase:true,
      orientationReversingSwappedForEveryAvailableCase:true,
      allEightCasesAvailable:true,
      numericAcceptanceThresholdApplied:false,
      providerPublishedSideNamesUsedAsAnatomicalAuthority:false,
      imageSpaceXSignUsedAsAnatomicalAuthority:false,
    },
    interpretationBoundary:protocol.interpretationBoundary,
    privacy:protocol.privacy,
    authority:{
      controlledAnatomicalMappingAudited:false,
      reflectionParityConditionalMappingSupportedOnExactFixture:false,
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
  '863b1909b2bb33437496c990fd97529d986b2fca1564addb6e1591d232b7f2cf';

describe('FR104 U4A controlled anatomical mapping result intake', () => {
  it('admits only the exact supported controlled result', () => {
    const evidence =
      admitNeutralEarControlledAnatomicalMappingResultFR104(
        candidate(),
        digest,
      );

    expect(evidence.state).toBe(
      'reflection_parity_conditional_mapping_supported',
    );
    expect(evidence.controlledAnatomicalMappingAudited).toBe(true);
    expect(
      evidence
        .reflectionParityConditionalMappingSupportedOnExactFixture,
    ).toBe(true);
    expect(
      evidence.controlledAnatomicalReferenceAdmittedForExactFixture,
    ).toBe(true);
    expect(evidence.providerLabelMappedToAnatomicalSide).toBe(false);
    expect(evidence.anatomicalLateralityAuthorized).toBe(false);
    expect(evidence.productionAuthorization).toBe(false);
  });

  it('rejects digest drift', () => {
    expect(() =>
      admitNeutralEarControlledAnatomicalMappingResultFR104(
        candidate(),
        '0000000000000000000000000000000000000000000000000000000000000000',
      ),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('rejects case-cost drift', () => {
    const mutated =
      structuredClone(candidate()) as unknown as {
        cases: Array<Record<string, unknown>>;
      };
    mutated.cases[1]!.directCost = 0.5;

    expect(() =>
      admitNeutralEarControlledAnatomicalMappingResultFR104(
        mutated,
        digest,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('rejects candidate-side downstream authority promotion', () => {
    const mutated =
      structuredClone(candidate()) as unknown as {
        authority: Record<string, unknown>;
      };
    mutated.authority.anatomicalLateralityAuthorized = true;

    expect(() =>
      admitNeutralEarControlledAnatomicalMappingResultFR104(
        mutated,
        digest,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
