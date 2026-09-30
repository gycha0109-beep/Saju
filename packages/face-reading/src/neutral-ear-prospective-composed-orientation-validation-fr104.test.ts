import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104,
  assessNeutralEarProspectiveComposedNormalizationFR104,
  type NeutralEarProspectiveComposedRotationObservationFR104V1,
} from './neutral-ear-prospective-composed-orientation-validation-fr104.js';

function supportedCases(): NeutralEarProspectiveComposedRotationObservationFR104V1[] {
  return [
    {
      id:'R90',
      available:true,
      composedUnorderedPairCost:0.01,
      identityUnorderedPairCost:0.2,
      oppositeUnorderedPairCost:0.3,
    },
    {
      id:'R180',
      available:true,
      composedUnorderedPairCost:0.01,
      identityUnorderedPairCost:0.2,
      oppositeUnorderedPairCost:0.01,
    },
    {
      id:'R270',
      available:true,
      composedUnorderedPairCost:0.01,
      identityUnorderedPairCost:0.2,
      oppositeUnorderedPairCost:0.3,
    },
    {
      id:'M90',
      available:true,
      composedUnorderedPairCost:0.01,
      identityUnorderedPairCost:0.2,
      oppositeUnorderedPairCost:0.3,
    },
    {
      id:'M180',
      available:true,
      composedUnorderedPairCost:0.01,
      identityUnorderedPairCost:0.2,
      oppositeUnorderedPairCost:0.01,
    },
    {
      id:'M270',
      available:true,
      composedUnorderedPairCost:0.01,
      identityUnorderedPairCost:0.2,
      oppositeUnorderedPairCost:0.3,
    },
  ];
}

describe('FR104 U3.3 prospective composed normalization preregistration', () => {
  it('freezes the retrospective rule before any prospective result exists', () => {
    const protocol =
      NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104;

    expect(protocol.studyKind).toBe(
      'prospective_preregistered_independent_fixture_validation',
    );
    expect(protocol.predecessor.derivedResultSha256).toBe(
      '732268b973592f70f606000ffcbd0219e67afcc20b920e57906d14978f5cbb05',
    );
    expect(protocol.predecessor.selectedHypothesis).toBe(
      'original_input_image_frame',
    );
    expect(protocol.frozenComposedRule).toEqual({
      providerInferenceCompensation:
        'rotationDegrees_equals_inverse_physical_rotation',
      providerOutputCoordinateFrame:
        'original_input_image_frame',
      outputCoordinateNormalization:
        'explicit_inverse_physical_rotation_of_returned_provider_coordinates',
      ruleMayBeRetunedAfterProspectiveObservation: false,
      parallelPoseNormalizationStackAuthorized: false,
    });
    expect(
      protocol.preregistration.prospectiveResultObservedAtDefinitionTime,
    ).toBe(false);
    expect(
      protocol.preregistration.empiricalResultSha256PinnedAtDefinitionTime,
    ).toBeNull();
    expect(
      protocol.preregistration.empiricalResultValuesBundledAtDefinitionTime,
    ).toBe(0);
  });

  it('pins a source-independent validation fixture without claiming FR104-wide novelty', () => {
    const fixture =
      NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104
        .fixture;

    expect(fixture.fixtureRef).toBe(
      'skimage_astronaut_public_domain',
    );
    expect(fixture.sha256).toBe(
      '88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5',
    );
    expect(fixture.expectedWidth).toBe(512);
    expect(fixture.expectedHeight).toBe(512);
    expect(
      fixture.sourceRepositoryDistinctFromMediaPipeFixtureSource,
    ).toBe(true);
    expect(fixture.previouslyUsedForControlledMirrorStudy).toBe(true);
    expect(fixture.novelToEntireFr104).toBe(false);
    expect(fixture.usedInU3_2OrU3_2_1Development).toBe(false);
    expect(
      fixture.priorMirrorResultMaySelectOrRetuneOrientationRule,
    ).toBe(false);
  });

  it('supports only when every rotated case satisfies the frozen rule', () => {
    const result =
      assessNeutralEarProspectiveComposedNormalizationFR104({
        nonMirroredBaselineAvailable:true,
        mirroredBaselineAvailable:true,
        rotatedCases:supportedCases(),
      });

    expect(result.state).toBe(
      'prospective_composed_normalization_supported',
    );
    expect(result.evaluatedCaseIds).toEqual([
      'R90','R180','R270','M90','M180','M270',
    ]);
    expect(result.unavailableCaseIds).toEqual([]);
    expect(result.failedCaseIds).toEqual([]);
    expect(
      result.quarterTurnStrictDominanceSatisfiedForEveryAvailableCase,
    ).toBe(true);
    expect(
      result.halfTurnIdentityRejectedForEveryAvailableCase,
    ).toBe(true);
    expect(result.allSixRotatedCasesAvailable).toBe(true);
    expect(result.numericAcceptanceThresholdApplied).toBe(false);
    expect(result.providerLabelsUsedForDecision).toBe(false);
  });

  it('reports partial support rather than silently promoting unavailable coverage', () => {
    const cases = supportedCases();
    cases[5] = {
      id:'M270',
      available:false,
      composedUnorderedPairCost:null,
      identityUnorderedPairCost:null,
      oppositeUnorderedPairCost:null,
    };

    const result =
      assessNeutralEarProspectiveComposedNormalizationFR104({
        nonMirroredBaselineAvailable:true,
        mirroredBaselineAvailable:true,
        rotatedCases:cases,
      });

    expect(result.state).toBe(
      'prospective_composed_normalization_partially_supported',
    );
    expect(result.unavailableCaseIds).toEqual(['M270']);
    expect(result.allSixRotatedCasesAvailable).toBe(false);
  });

  it('refutes the frozen rule when any available case violates its preregistered comparison', () => {
    const cases = supportedCases();
    cases[0] = {
      id:'R90',
      available:true,
      composedUnorderedPairCost:0.4,
      identityUnorderedPairCost:0.2,
      oppositeUnorderedPairCost:0.3,
    };

    const result =
      assessNeutralEarProspectiveComposedNormalizationFR104({
        nonMirroredBaselineAvailable:true,
        mirroredBaselineAvailable:true,
        rotatedCases:cases,
      });

    expect(result.state).toBe(
      'prospective_composed_normalization_refuted',
    );
    expect(result.failedCaseIds).toEqual(['R90']);
    expect(
      result.quarterTurnStrictDominanceSatisfiedForEveryAvailableCase,
    ).toBe(false);
  });

  it('remains unresolved when either family baseline is unavailable', () => {
    const result =
      assessNeutralEarProspectiveComposedNormalizationFR104({
        nonMirroredBaselineAvailable:true,
        mirroredBaselineAvailable:false,
        rotatedCases:supportedCases(),
      });

    expect(result.state).toBe(
      'prospective_composed_normalization_unresolved',
    );
  });

  it('fails closed on malformed prospective matrices', () => {
    const missing = supportedCases().slice(0, 5);

    expect(() =>
      assessNeutralEarProspectiveComposedNormalizationFR104({
        nonMirroredBaselineAvailable:true,
        mirroredBaselineAvailable:true,
        rotatedCases:missing,
      }),
    ).toThrow();

    const unavailableWithData = supportedCases();
    unavailableWithData[5] = {
      id:'M270',
      available:false,
      composedUnorderedPairCost:0,
      identityUnorderedPairCost:null,
      oppositeUnorderedPairCost:null,
    };

    expect(() =>
      assessNeutralEarProspectiveComposedNormalizationFR104({
        nonMirroredBaselineAvailable:true,
        mirroredBaselineAvailable:true,
        rotatedCases:unavailableWithData,
      }),
    ).toThrow();
  });

  it('keeps anatomical and production authority closed before execution', () => {
    const authority =
      NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104
        .authority;

    expect(authority.prospectiveComposedNormalizationValidated)
      .toBe(false);
    expect(
      authority.providerCompensatedOutputFrameProspectivelyValidated,
    ).toBe(false);
    expect(authority.providerLabelMappedToAnatomicalSide).toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(authority.validatedExternalEarObservationAuthorized)
      .toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
