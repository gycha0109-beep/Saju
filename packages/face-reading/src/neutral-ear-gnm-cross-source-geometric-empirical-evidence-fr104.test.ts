import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-gnm-cross-source-geometric-empirical-evidence-fr104.js';

describe('FR104 U5B-D admitted cross-source geometric evidence', () => {
  it('pins candidate, replay, and exact result provenance', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.preregistrationMergeSha).toBe(
      'dca237437d170ef03f8d15d370726a82c68345c3',
    );
    expect(evidence.fixturePinMergeSha).toBe(
      '61cecde20b8648909f6ae414ec8610e3f20673ac',
    );
    expect(evidence.candidateMergeSha).toBe(
      '3424c784cbc2b15b6b0aabe39236faf5ae22c5dd',
    );
    expect(evidence.firstObservationWorkflowRunId).toBe(
      37084191246,
    );
    expect(evidence.exactReplayWorkflowRunId).toBe(
      37085912495,
    );
    expect(evidence.resultSha256).toBe(
      '7c284cad3b467676e20c44ebf63a7aee3dc66c5d22534363286ef532ba3852fe',
    );
  });

  it('records exact cross-source eight-case support', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.state).toBe(
      'gnm_cross_source_geometric_mapping_supported',
    );
    expect(evidence.summary.evaluatedCaseIds).toEqual([
      'R0','R90','R180','R270',
      'M0','M90','M180','M270',
    ]);
    expect(evidence.summary.unavailableCaseIds).toEqual([]);
    expect(evidence.summary.failedCaseIds).toEqual([]);
    expect(
      evidence.summary
        .orientationPreservingDirectForEveryAvailableCase,
    ).toBe(true);
    expect(
      evidence.summary
        .orientationReversingSwappedForEveryAvailableCase,
    ).toBe(true);
    expect(evidence.summary.allEightCasesAvailable).toBe(true);
    expect(
      evidence.summary.numericAcceptanceThresholdApplied,
    ).toBe(false);
    expect(evidence.summary.aggregateOverrideApplied).toBe(false);
    expect(
      evidence.interpretation
        .crossSourceFamilyGeometricMappingSupported,
    ).toBe(true);
  });

  it('admits only cross-source geometry and keeps runtime authority closed', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_EMPIRICAL_EVIDENCE_FR104;
    const authority = evidence.authority;

    expect(authority.gnmCrossSourceSemanticWitnessAudited).toBe(true);
    expect(authority.gnmCrossSourceFixtureDigestPinned).toBe(true);
    expect(
      authority.gnmCrossSourceGeometricValidationExecuted,
    ).toBe(true);
    expect(
      authority.gnmCrossSourceGeometricMappingValidated,
    ).toBe(true);
    expect(authority.providerLabelMappedToAnatomicalSide).toBe(false);
    expect(
      authority.globalProviderAnatomicalSemanticsEstablished,
    ).toBe(false);
    expect(authority.anatomicalReferenceAdmitted).toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(
      authority.validatedExternalEarObservationAuthorized,
    ).toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
    expect(
      evidence.interpretation.runtimeSubjectPhotoLateralityAuthorized,
    ).toBe(false);
    expect(evidence.interpretation.traditionalMeaningAuthorized).toBe(false);
  });
});
