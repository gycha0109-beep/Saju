import { describe, expect, it } from 'vitest';
import type { NasalApexCandidateStudyResultFR267V1 } from './nasal-apex-geometry-candidate-study-fr267.js';
import {
  buildNasalApexEmpiricalBundleFR268,
  minimizeNasalApexCandidateStudyResultFR268,
} from './nasal-apex-empirical-bundle-fr268.js';

const METHODS = [
  'full_face_max_z',
  'full_face_min_z',
  'central_band_0_10_max_z',
  'central_band_0_10_min_z',
  'central_band_0_20_max_z',
  'central_band_0_20_min_z',
] as const;

function source(offset = 0): NasalApexCandidateStudyResultFR267V1 {
  const candidates = METHODS.map((method, index) => ({
    schemaVersion: 'fr267-nasal-apex-geometry-candidate-v1' as const,
    candidateId: `candidate.neutral.nasal_apex.${method}@0.1.0`,
    method,
    point: { x: index, y: index + offset, z: index + 1 },
    candidateState: 'geometry_only_hypothesis_not_nasal_apex_admission' as const,
    sourcePointCount: 20,
    providerIndexExposed: false as const,
    anatomicalNasalApexIdentityIssued: false as const,
    traditionalZhuntouEquivalenceIssued: false as const,
  }));
  const evaluations = METHODS.map((method, index) => ({
    schemaVersion: 'fr267-nasal-apex-candidate-evaluation-v1' as const,
    subjectId: 'source-subject-secret',
    captureId: 'source-capture-secret',
    annotationRef: 'fr266_provider_independent_frozen_nasal_apex_annotation' as const,
    candidateId: candidates[index]!.candidateId,
    method,
    euclidean3DErrorCm: index + 0.1 + offset,
    absoluteVerticalYErrorCm: index + 0.05 + offset,
    signedXErrorCm: index,
    signedYErrorCm: index,
    signedZErrorCm: index,
    selectedAsWinner: false as const,
    acceptedAsNasalApex: false as const,
    traditionalZhuntouEquivalenceIssued: false as const,
  }));
  return {
    schemaVersion: 'fr267-nasal-apex-candidate-study-result-v1',
    artifactVersion: '0.1.0',
    watchtowerTrack: 'face-research',
    authorityState:
      'geometry_only_candidate_generation_and_independent_annotation_error_measurement',
    subjectId: 'source-subject-secret',
    captureId: 'source-capture-secret',
    candidates,
    evaluations,
    candidateWinner: null,
    acceptanceThresholdCm: null,
    evidenceSufficientForCandidateSelection: false,
    authorityBoundary: {
      researchCandidateComparisonOnly: true,
      canonicalZSignInterpretedAsAnatomicalAnterior: false,
      providerIndexIssued: false,
      providerIndexSemanticBindingIssued: false,
      anatomicalNasalApexIdentityIssued: false,
      traditionalZhuntouEquivalenceIssued: false,
      threeDivisionsSpanIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      F1ClaimIssued: false,
      F6ClaimIssued: false,
      fortuneClaimIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
    researchNoteRef:
      'repo:research/face-reading/fr267-nasal-apex-geometry-candidate-study.md',
    nextFrontier:
      'collect_multi_subject_multi_session_fr266_annotations_and_fr267_candidate_errors_before_any_nasal_apex_candidate_selection',
  };
}

describe('FR268 nasal-apex empirical bundle', () => {
  it('strips source identities and coordinates into scalar error observations', () => {
    const observation = minimizeNasalApexCandidateStudyResultFR268(
      source(),
      1,
      1,
      1,
    );
    const serialized = JSON.stringify(observation);

    expect(serialized).not.toContain('source-subject-secret');
    expect(serialized).not.toContain('source-capture-secret');
    expect(serialized).not.toContain('"point"');
    expect(serialized).not.toContain('signedXErrorCm');
    expect(observation.candidateErrors).toHaveLength(6);
    expect(Object.values(observation.privacyBoundary).every((value) => value === false))
      .toBe(true);
  });

  it('aggregates descriptive errors without selecting a candidate', () => {
    const bundle = buildNasalApexEmpiricalBundleFR268([
      minimizeNasalApexCandidateStudyResultFR268(source(0), 1, 1, 1),
      minimizeNasalApexCandidateStudyResultFR268(source(0.2), 1, 2, 2),
      minimizeNasalApexCandidateStudyResultFR268(source(0.4), 2, 1, 3),
    ]);

    expect(bundle.observations).toHaveLength(3);
    expect(bundle.summaries).toHaveLength(6);
    expect(bundle.candidateWinner).toBeNull();
    expect(bundle.acceptanceThresholdCm).toBeNull();
    expect(bundle.evidenceSufficientForCandidateSelection).toBe(false);

    const first = bundle.summaries[0]!;
    expect(first.observationCount).toBe(3);
    expect(first.subjectCount).toBe(2);
    expect(first.sessionCount).toBe(3);
    expect(first.evaluationState).toBe('descriptive_only_no_candidate_selection');
  });

  it('declares historical FR251/FR255 exports non-retroactive and avoids a new camera workflow', () => {
    const bundle = buildNasalApexEmpiricalBundleFR268([
      minimizeNasalApexCandidateStudyResultFR268(source(), 1, 1, 1),
    ]);
    expect(bundle.existingCaptureLaneCompatibility).toEqual({
      fr251Fr257FutureLiveMechanicsReusable: true,
      historicalFR251FR255RetroactiveCandidateErrorRecoveryPossible: false,
      reason:
        'historical_exports_do_not_persist_raw_metric_geometry_or_fr266_independent_annotations',
      newCameraWorkflowRequiredByFR268: false,
    });
  });

  it('rejects duplicate study-local observation ordinals', () => {
    const observation = minimizeNasalApexCandidateStudyResultFR268(source(), 1, 1, 1);
    expect(() =>
      buildNasalApexEmpiricalBundleFR268([observation, observation])
    ).toThrow(/duplicate subject\/session\/observation/);
  });

  it('keeps threshold, winner, Zhuntou and Production authority closed', () => {
    const bundle = buildNasalApexEmpiricalBundleFR268([
      minimizeNasalApexCandidateStudyResultFR268(source(), 1, 1, 1),
    ]);
    expect(bundle.authorityBoundary).toEqual({
      descriptiveAggregationOnly: true,
      empiricalRepeatabilityEstablished: false,
      candidateWinnerIssued: false,
      numericAcceptanceThresholdIssued: false,
      minimumEvidenceThresholdIssued: false,
      nasalApexAdmissionIssued: false,
      traditionalZhuntouEquivalenceIssued: false,
      threeDivisionsSpanIssued: false,
      calibrationIssued: false,
      F1ClaimIssued: false,
      F6ClaimIssued: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });
});
