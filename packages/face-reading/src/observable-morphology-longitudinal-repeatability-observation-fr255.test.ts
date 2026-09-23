import { describe, expect, it } from 'vitest';
import {
  appendLongitudinalRepeatabilityObservationFR255,
  assertLongitudinalRepeatabilityBundleFR255,
  createLongitudinalRepeatabilityBundleFR255,
  type FR255CaptureConditionObservation,
} from './observable-morphology-longitudinal-repeatability-observation-fr255.js';

function conditions(
  overrides: Partial<FR255CaptureConditionObservation> = {},
): FR255CaptureConditionObservation {
  return {
    schemaVersion: 'fr255-capture-condition-observation-v1',
    deviceClass: 'phone',
    cameraFacing: 'front',
    orientation: 'portrait',
    lightingCondition: 'indoor_typical',
    glassesPresent: 'absent',
    hairOccludingEyeRegion: 'absent',
    neutralExpressionOperatorAttested: true,
    frontalPoseOperatorAttested: true,
    operatorObservationOnly: true,
    independentlyVerified: false,
    qualityThresholdApplied: false,
    ...overrides,
  };
}

function source(
  generatedAt: string,
  values: readonly [number, number, number, number],
) {
  const records = [
    [1, 1, values[0]],
    [1, 2, values[1]],
    [2, 1, values[2]],
    [2, 2, values[3]],
  ].map(([sessionOrdinal, captureOrdinal, value]) => ({
    schemaVersion: 'fr243-dry-run-capture-execution-record-v1',
    runtimeRef: 'runtime.synthetic.mechanics-only',
    participantRef: 'participant.synthetic.not-real-evidence',
    operatorRef: 'operator.synthetic.not-real-evidence',
    sessionRef: 'session.synthetic.' + sessionOrdinal,
    challengeRef: 'challenge.synthetic.' + sessionOrdinal + '.' + captureOrdinal,
    sessionOrdinal,
    captureOrdinal,
    challengeIssuedAt: generatedAt,
    operatorAttestation: {
      schemaVersion: 'fr243-operator-execution-attestation-v1',
      operatorRef: 'operator.synthetic.not-real-evidence',
      recordedAt: generatedAt,
      participantPresentObserved: true,
      liveCameraCaptureObserved: true,
      consentReconfirmedImmediatelyBeforeCapture: true,
      challengePresentedBeforeCapture: true,
    },
    resultStatus: 'accepted_for_dry_run_mechanics_only',
    observedByteLength: 1024,
    qualityAssessment: {
      schemaVersion: 'fr242-capture-quality-assessment-v1',
      singleFace: true,
      frontalPose: true,
      sharpness: true,
      bilateralEyeRegionVisibility: true,
      bilateralEyeLandmarkCoverage: true,
      majorEyeRegionOcclusionAbsent: true,
    },
    rejectionReasons: [],
    primaryMetric: {
      metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
      unit: 'degree',
      value,
    },
    metricExtractorInvoked: true,
    workingBufferZeroizedAfterProcessing: true,
    rawBytesPersisted: false,
    rawImageDigestPersisted: false,
    reviewImagePersisted: false,
    faceEmbeddingPersisted: false,
    identityTemplatePersisted: false,
    operatorAttestedRealParticipantExecution: true,
    independentRealParticipantExecutionVerification: false,
    empiricalEvidenceEligible: false,
    confirmatoryEvidenceEligible: false,
  }));

  return {
    schemaVersion: 'fr251-localhost-dry-run-sanitized-export-v1',
    generatedAt,
    participantRef: 'participant.synthetic.must-not-be-retained',
    operatorRef: 'operator.synthetic.must-not-be-retained',
    records,
    review: {
      schemaVersion: 'fr243-dry-run-mechanics-review-v1',
      runtimeRef: 'runtime.synthetic.mechanics-only',
      participantRef: 'participant.synthetic.must-not-be-retained',
      operatorRef: 'operator.synthetic.must-not-be-retained',
      requiredSlotCount: 4,
      recordedSlotCount: 4,
      acceptedCaptureCount: 4,
      rejectedCaptureCount: 0,
      mechanicsReviewState: 'four_slot_operator_attested_mechanics_complete',
      acceptedPrimaryMetrics: records.map((record) => ({
        sessionOrdinal: record.sessionOrdinal,
        captureOrdinal: record.captureOrdinal,
        metricRef: record.primaryMetric.metricRef,
        unit: record.primaryMetric.unit,
        value: record.primaryMetric.value,
      })),
      actualRealParticipantDryRunOperatorAttested: true,
      actualRealParticipantDryRunIndependentlyVerified: false,
      empiricalEvidenceEligible: false,
      confirmatoryEvidenceEligible: false,
      empiricalRepeatabilityEstablished: false,
      interpretationValidityEstablished: false,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
    authorityBoundary: {
      rawMediaPersisted: false,
      rawImageDigestPersisted: false,
      faceEmbeddingPersisted: false,
      identityTemplatePersisted: false,
      temporalSeparationIndependentlyVerified: false,
      participantIdentityIndependentlyVerified: false,
      captureQualityConstructValidated: false,
      empiricalRepeatabilityEstablished: false,
      interpretationValidityEstablished: false,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

describe('FR255 longitudinal repeatability observation bundle', () => {
  it('creates a first descriptive observation without retaining FR251 participant/operator refs', () => {
    const bundle = createLongitudinalRepeatabilityBundleFR255({
      studyRef: 'study.fr255:synthetic',
      importedAt: '2026-09-23T03:00:00.000Z',
      sourceFR251: source(
        '2026-09-23T02:00:00.000Z',
        [8, 7, 6, 5],
      ),
      baselineParticipantOperatorAttested: true,
      captureConditions: conditions(),
    });

    expect(bundle.observations).toHaveLength(1);
    expect(bundle.observations[0]!.elapsedSincePreviousObservationMs).toBeNull();
    expect(bundle.observations[0]!.sessionSummaries[0]!.meanDegrees).toBe(7.5);
    expect(bundle.observations[0]!.sessionSummaries[0]!.absoluteDifferenceDegrees).toBe(1);
    expect(bundle.observations[0]!.sessionSummaries[1]!.meanDegrees).toBe(5.5);
    expect(bundle.descriptiveSummary.sessionMeansDegrees).toEqual([7.5, 5.5]);
    expect(bundle.descriptiveSummary.meanOfSessionMeansDegrees).toBe(6.5);
    expect(bundle.descriptiveSummary.withinSessionAbsoluteDifferencesDegrees).toEqual([1, 1]);
    expect(bundle.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(bundle.authorityBoundary.repeatabilityPassFailIssued).toBe(false);
    expect(bundle.authorityBoundary.numericRepeatabilityThresholdIssued).toBe(false);
    expect(bundle.privacyBoundary.sourceParticipantRefRetained).toBe(false);
    expect(bundle.privacyBoundary.sourceOperatorRefRetained).toBe(false);
    expect(JSON.stringify(bundle)).not.toContain('participant.synthetic.must-not-be-retained');
    expect(JSON.stringify(bundle)).not.toContain('operator.synthetic.must-not-be-retained');
    expect(() => assertLongitudinalRepeatabilityBundleFR255(bundle)).not.toThrow();
  });

  it('appends only a later separately executed observation and records elapsed time without a minimum threshold', () => {
    const first = createLongitudinalRepeatabilityBundleFR255({
      studyRef: 'study.fr255:synthetic',
      importedAt: '2026-09-23T03:00:00.000Z',
      sourceFR251: source(
        '2026-09-23T02:00:00.000Z',
        [8, 7, 6, 5],
      ),
      baselineParticipantOperatorAttested: true,
      captureConditions: conditions(),
    });
    const second = appendLongitudinalRepeatabilityObservationFR255({
      bundle: first,
      importedAt: '2026-09-24T03:00:00.000Z',
      sourceFR251: source(
        '2026-09-24T02:00:00.000Z',
        [8.5, 7.5, 6.5, 5.5],
      ),
      baselineParticipantOperatorAttested: true,
      sameParticipantAsPreviousOperatorAttested: true,
      captureConditions: conditions({ lightingCondition: 'indoor_bright' }),
    });

    expect(second.observations).toHaveLength(2);
    expect(second.observations[1]!.elapsedSincePreviousObservationMs).toBe(86_400_000);
    expect(
      second.observations[1]!.executionSeparation.elapsedTimeRecordedWithoutMinimumThreshold,
    ).toBe(true);
    expect(
      second.observations[1]!.executionSeparation.temporalSeparationIndependentlyVerified,
    ).toBe(false);
    expect(
      second.observations[1]!.participantContinuity.sameParticipantAsPreviousOperatorAttested,
    ).toBe(true);
    expect(second.descriptiveSummary.observationBlockMeansDegrees).toEqual([6.5, 7]);
    expect(second.descriptiveSummary.firstToLatestObservationMeanSignedDifferenceDegrees).toBe(0.5);
    expect(second.chainHeadDigest).toBe(second.observations[1]!.observationDigest);
    expect(() => assertLongitudinalRepeatabilityBundleFR255(second)).not.toThrow();
  });

  it('rejects duplicate or out-of-order FR251 executions instead of silently replacing history', () => {
    const sourceOne = source(
      '2026-09-23T02:00:00.000Z',
      [8, 7, 6, 5],
    );
    const first = createLongitudinalRepeatabilityBundleFR255({
      studyRef: 'study.fr255:synthetic',
      importedAt: '2026-09-23T03:00:00.000Z',
      sourceFR251: sourceOne,
      baselineParticipantOperatorAttested: true,
      captureConditions: conditions(),
    });

    expect(() => appendLongitudinalRepeatabilityObservationFR255({
      bundle: first,
      importedAt: '2026-09-23T04:00:00.000Z',
      sourceFR251: sourceOne,
      baselineParticipantOperatorAttested: true,
      sameParticipantAsPreviousOperatorAttested: true,
      captureConditions: conditions(),
    })).toThrow(/same FR251 execution cannot be appended twice/u);

    expect(() => appendLongitudinalRepeatabilityObservationFR255({
      bundle: first,
      importedAt: '2026-09-23T04:00:00.000Z',
      sourceFR251: source(
        '2026-09-23T01:00:00.000Z',
        [8.1, 7.1, 6.1, 5.1],
      ),
      baselineParticipantOperatorAttested: true,
      sameParticipantAsPreviousOperatorAttested: true,
      captureConditions: conditions(),
    })).toThrow(/generatedAt must be later than the current chain head/u);
  });

  it('fails closed when the persisted observation chain is edited', () => {
    const bundle = createLongitudinalRepeatabilityBundleFR255({
      studyRef: 'study.fr255:synthetic',
      importedAt: '2026-09-23T03:00:00.000Z',
      sourceFR251: source(
        '2026-09-23T02:00:00.000Z',
        [8, 7, 6, 5],
      ),
      baselineParticipantOperatorAttested: true,
      captureConditions: conditions(),
    });
    const edited = JSON.parse(JSON.stringify(bundle)) as {
      observations: Array<{ slots: Array<{ primaryMetric: { value: number } | null }> }>;
    };
    edited.observations[0]!.slots[0]!.primaryMetric!.value = 99;

    expect(() => assertLongitudinalRepeatabilityBundleFR255(edited))
      .toThrow(/digest chain verification failed/u);
  });

  it('keeps capture conditions descriptive and does not promote operator observations to quality validation', () => {
    const bundle = createLongitudinalRepeatabilityBundleFR255({
      studyRef: 'study.fr255:synthetic',
      importedAt: '2026-09-23T03:00:00.000Z',
      sourceFR251: source(
        '2026-09-23T02:00:00.000Z',
        [8, 7, 6, 5],
      ),
      baselineParticipantOperatorAttested: true,
      captureConditions: conditions({
        neutralExpressionOperatorAttested: false,
        frontalPoseOperatorAttested: false,
        glassesPresent: 'unknown',
      }),
    });

    expect(bundle.observations[0]!.captureConditions.neutralExpressionOperatorAttested)
      .toBe(false);
    expect(bundle.observations[0]!.captureConditions.qualityThresholdApplied).toBe(false);
    expect(bundle.authorityBoundary.captureQualityConstructValidated).toBe(false);
  });
});
