import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104,
} from './neutral-ear-prospective-composed-orientation-validation-fr104.js';
import {
  admitNeutralEarProspectiveComposedOrientationResultFR104,
} from './neutral-ear-prospective-composed-orientation-result-intake-fr104.js';

const protocol =
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104;

const hashes = {
  R0:'0df3c62c654dd5432e753a8d273e73ad3fb7d5826848b395afaead620b89bdd0',
  R90:'a40a7a9d4ffb3c937a44faaefcd3afa4a827407706ad76be8f157c2e8fac29d0',
  R180:'cd494f0af40b1985ef7a009b51067fa817920815636ff8d77fbd11525103b553',
  R270:'67fb32aa276af5ae29597cdbb207ea38ae8a93741c54d6f7ae8798bf08c72c3b',
  M0:'e9e35ef4c252d90169cb45dfe5cdabc548afdcc88f12e45ca87c1be61606584d',
  M90:'b64cfedb90ae7596e8d9dde27053e815cc4244708a928d0208d1c3240141b4d8',
  M180:'21b15542ab93e1ab8d999c8f2d5da9e6008e6c877039661e06bb2dce5c18c574',
  M270:'eb36b7499e27ee0c5c728da131de8b6afae76f29031ca196127dd2f2a4971c36',
} as const;

const costs = {
  R0:[0,0,0],
  R90:[0.8609687785387168,0.004019598639518765,1.2180429934630648],
  R180:[1.2172198425550267,0.00526201305598233,0.00526201305598233],
  R270:[0.8617153750658679,0.0034770712559623242,1.221379652899968],
  M0:[0,0,0],
  M90:[0.8608039321032435,0.004295411288492099,1.2158090456181592],
  M180:[1.2168021910668552,0.005500609024443177,0.005500609024443177],
  M270:[0.8608660213756174,0.004108235954123095,1.2207388445996106],
} as const;

function candidate() {
  return {
    schemaVersion:
      'fr104-prospective-composed-orientation-normalization-result-v1',
    authorityState:
      'prospective_candidate_result_not_admitted',
    studyKind: protocol.studyKind,
    predecessor: {
      derivedResultSha256:
        protocol.predecessor.derivedResultSha256,
      selectedHypothesis:
        protocol.predecessor.selectedHypothesis,
    },
    fixture: {
      fixtureRef: protocol.fixture.fixtureRef,
      sourceRepository: protocol.fixture.sourceRepository,
      sourceCommit: protocol.fixture.sourceCommit,
      expectedSha256: protocol.fixture.sha256,
      observedSha256: protocol.fixture.sha256,
      digestVerified: true,
      width: protocol.fixture.expectedWidth,
      height: protocol.fixture.expectedHeight,
      sourceImagePersisted: false,
      transformedRasterPersisted: false,
    },
    runtime: {
      packageName: protocol.runtime.packageName,
      packageVersion: protocol.runtime.packageVersion,
      runningMode: protocol.runtime.runningMode,
      numFaces: protocol.runtime.numFaces,
      imageProcessingOptionsRotationDegreesUsed: true,
    },
    frozenComposedRule: protocol.frozenComposedRule,
    zeroDegreeControls: {
      R0: { available:true, composedUnorderedPairCost:0 },
      M0: { available:true, composedUnorderedPairCost:0 },
    },
    cases: protocol.cases.map((item) => {
      const [identity, composed, opposite] = costs[item.id];
      const comparison = (unorderedPairCost: number) => ({
        unorderedPairCost,
        providerLabelRelationUsedForDecision:false,
      });
      return {
        id:item.id,
        family:item.family,
        horizontalMirror:item.horizontalMirror,
        physicalClockwiseRotationDegrees:
          item.physicalClockwiseRotationDegrees,
        compensationDegrees:item.compensationDegrees,
        transformedRgbaSha256:hashes[item.id],
        provider:{
          eligibilityState:'exact_one_face_478_landmarks_observed',
          faceCount:1,
          landmarkCount:478,
        },
        comparisons:{
          identity:comparison(identity),
          composed:comparison(composed),
          opposite:comparison(opposite),
        },
      };
    }),
    assessment:{
      state:'prospective_composed_normalization_supported',
      evaluatedCaseIds:['R90','R180','R270','M90','M180','M270'],
      unavailableCaseIds:[],
      failedCaseIds:[],
      quarterTurnStrictDominanceSatisfiedForEveryAvailableCase:true,
      halfTurnIdentityRejectedForEveryAvailableCase:true,
      allSixRotatedCasesAvailable:true,
      numericAcceptanceThresholdApplied:false,
      providerLabelsUsedForDecision:false,
      anatomicalInterpretationUsed:false,
    },
    interpretationBoundary:{
      providerLabelsUsedForDecision:false,
      anatomicalGroundTruthUsed:false,
      anatomicalSideSemanticsUsed:false,
      priorMirrorResultUsedToRetuneRule:false,
      hypothesisFailureIsHarnessFailure:false,
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
      empiricalResultAdmitted:false,
      resultDigestPinned:false,
      ruleRetunedAfterObservation:false,
    },
    authority:{
      prospectiveComposedNormalizationValidated:false,
      providerCompensatedOutputFrameProspectivelyValidated:false,
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
  '793b1059308242d11c176300bd141b70a49c2fa681a49bc6e38e1abddf4aaab4';

describe('FR104 U3.3B prospective composed normalization intake', () => {
  it('admits the exact prospective supported result only', () => {
    const evidence =
      admitNeutralEarProspectiveComposedOrientationResultFR104(
        candidate(),
        digest,
      );

    expect(evidence.state)
      .toBe('prospective_composed_normalization_supported');
    expect(evidence.evaluatedCaseIds).toEqual([
      'R90','R180','R270','M90','M180','M270',
    ]);
    expect(evidence.unavailableCaseIds).toEqual([]);
    expect(evidence.failedCaseIds).toEqual([]);
    expect(evidence.prospectiveComposedNormalizationValidated)
      .toBe(true);
    expect(
      evidence.providerCompensatedOutputFrameProspectivelyValidated,
    ).toBe(true);
    expect(evidence.anatomicalLateralityAuthorized).toBe(false);
    expect(evidence.productionAuthorization).toBe(false);
  });

  it('rejects a digest drift', () => {
    expect(() =>
      admitNeutralEarProspectiveComposedOrientationResultFR104(
        candidate(),
        '0000000000000000000000000000000000000000000000000000000000000000',
      ),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('rejects a preregistered decision drift', () => {
    const mutated =
      structuredClone(candidate()) as Record<string, unknown>;
    const assessment =
      mutated.assessment as Record<string, unknown>;
    assessment.state =
      'prospective_composed_normalization_partially_supported';

    expect(() =>
      admitNeutralEarProspectiveComposedOrientationResultFR104(
        mutated,
        digest,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });

  it('rejects candidate-side authority promotion', () => {
    const mutated =
      structuredClone(candidate()) as Record<string, unknown>;
    const authority =
      mutated.authority as Record<string, unknown>;
    authority.anatomicalLateralityAuthorized = true;

    expect(() =>
      admitNeutralEarProspectiveComposedOrientationResultFR104(
        mutated,
        digest,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
