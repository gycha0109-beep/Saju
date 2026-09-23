import { describe, expect, it } from 'vitest';
import type { CanonicalMetricPoint3DFR265 } from './full-face-neutral-canonical-metric-xy-projection-rule-fr265.js';
import type { ProviderIndependentNasalApexAnnotationFR266V1 } from './provider-independent-nasal-apex-reference-fr266.js';
import {
  NASAL_APEX_CANDIDATE_STUDY_AUTHORITY_FR267,
  assertNasalApexCandidateStudyAuthorityFR267,
  assertNasalApexCandidateStudyResultFR267,
  evaluateNasalApexGeometryCandidatesFR267,
  generateNasalApexGeometryCandidatesFR267,
  type GovernedNeutralMetricGeometryStudyInputFR267V1,
} from './nasal-apex-geometry-candidate-study-fr267.js';

const POINTS = Object.freeze([
  Object.freeze({ x: -5, y: 0, z: 1 }),
  Object.freeze({ x: -1, y: 1, z: 3 }),
  Object.freeze({ x: -0.3, y: 1.1, z: 6 }),
  Object.freeze({ x: 0, y: 1.25, z: 7.5 }),
  Object.freeze({ x: 0.25, y: 1.0, z: 6.5 }),
  Object.freeze({ x: 1, y: -2, z: -3 }),
  Object.freeze({ x: 5, y: 0, z: 1 }),
]);

function geometry(
  points: readonly CanonicalMetricPoint3DFR265[] = POINTS,
): GovernedNeutralMetricGeometryStudyInputFR267V1 {
  return {
    schemaVersion: 'fr267-governed-neutral-metric-geometry-study-input-v1',
    subjectId: 'subject-001',
    captureId: 'capture-001',
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    sourceAuthorityRef: 'fr77:test-governed-metric-geometry',
    providerIndicesExposed: false,
    points,
  };
}

function annotation(): ProviderIndependentNasalApexAnnotationFR266V1 {
  return {
    schemaVersion: 'fr266-provider-independent-nasal-apex-annotation-v1',
    subjectId: 'subject-001',
    captureId: 'capture-001',
    annotatorId: 'annotator-001',
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    point: { x: 0, y: 1.25, z: 7.5 },
    annotationDefinition:
      'most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d',
    providerOutputVisibleDuringAnnotation: false,
    providerIndicesVisibleDuringAnnotation: false,
    traditionalLabelVisibleDuringAnnotation: false,
    annotationFrozenBeforeProviderScoring: true,
  };
}

describe('FR267 nasal-apex geometry candidate study', () => {
  it('registers six geometry-only candidates with no winner or threshold', () => {
    expect(() =>
      assertNasalApexCandidateStudyAuthorityFR267(
        NASAL_APEX_CANDIDATE_STUDY_AUTHORITY_FR267,
      )
    ).not.toThrow();

    expect(NASAL_APEX_CANDIDATE_STUDY_AUTHORITY_FR267.candidateMethods)
      .toHaveLength(6);
    expect(NASAL_APEX_CANDIDATE_STUDY_AUTHORITY_FR267.winnerSelectionRule)
      .toBeNull();
    expect(NASAL_APEX_CANDIDATE_STUDY_AUTHORITY_FR267.acceptanceThresholdCm)
      .toBeNull();
  });

  it('generates candidates without exposing source point ordinals', () => {
    const candidates = generateNasalApexGeometryCandidatesFR267(geometry());
    expect(candidates).toHaveLength(6);
    for (const candidate of candidates) {
      expect(candidate.providerIndexExposed).toBe(false);
      expect(candidate.anatomicalNasalApexIdentityIssued).toBe(false);
      expect(candidate.traditionalZhuntouEquivalenceIssued).toBe(false);
      expect(Object.keys(candidate)).not.toContain('providerIndex');
      expect(Object.keys(candidate)).not.toContain('sourcePointIndex');
    }
  });

  it('is deterministic and independent of source point ordering', () => {
    const forward = generateNasalApexGeometryCandidatesFR267(geometry());
    const reversed = generateNasalApexGeometryCandidatesFR267(
      geometry(Object.freeze([...POINTS].reverse())),
    );
    expect(reversed).toEqual(forward);
  });

  it('measures candidate error against the frozen FR266 independent annotation', () => {
    const result = evaluateNasalApexGeometryCandidatesFR267(
      geometry(),
      annotation(),
    );
    expect(() => assertNasalApexCandidateStudyResultFR267(result)).not.toThrow();

    const globalMax = result.evaluations.find(
      (entry) => entry.method === 'full_face_max_z',
    )!;
    expect(globalMax.euclidean3DErrorCm).toBe(0);
    expect(globalMax.absoluteVerticalYErrorCm).toBe(0);
    expect(globalMax.selectedAsWinner).toBe(false);
    expect(result.candidateWinner).toBeNull();
    expect(result.evidenceSufficientForCandidateSelection).toBe(false);
  });

  it('emits both Z directions instead of assuming anatomical anterior sign', () => {
    const candidates = generateNasalApexGeometryCandidatesFR267(geometry());
    expect(candidates.map((entry) => entry.method)).toContain('full_face_max_z');
    expect(candidates.map((entry) => entry.method)).toContain('full_face_min_z');

    const result = evaluateNasalApexGeometryCandidatesFR267(
      geometry(),
      annotation(),
    );
    expect(
      result.authorityBoundary.canonicalZSignInterpretedAsAnatomicalAnterior,
    ).toBe(false);
  });

  it('rejects mismatched capture identity', () => {
    expect(() =>
      evaluateNasalApexGeometryCandidatesFR267(geometry(), {
        ...annotation(),
        captureId: 'other-capture',
      })
    ).toThrow(/same subject\/capture/);
  });

  it('rejects duplicate or degenerate study geometry', () => {
    expect(() =>
      generateNasalApexGeometryCandidatesFR267(
        geometry(Object.freeze([...POINTS, POINTS[0]!]))
      )
    ).toThrow(/unique/);

    expect(() =>
      generateNasalApexGeometryCandidatesFR267(
        geometry(Object.freeze([
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 1, z: 1 },
          { x: 0, y: 2, z: 2 },
          { x: 0, y: 3, z: 3 },
          { x: 0, y: 4, z: 4 },
        ]))
      )
    ).toThrow(/X span/);
  });

  it('keeps candidate selection, Zhuntou and Production authority closed', () => {
    const result = evaluateNasalApexGeometryCandidatesFR267(
      geometry(),
      annotation(),
    );
    expect(result.authorityBoundary).toEqual({
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
    });
  });

  it('rejects forged candidate-selection authority', () => {
    const result = evaluateNasalApexGeometryCandidatesFR267(
      geometry(),
      annotation(),
    );
    expect(() =>
      assertNasalApexCandidateStudyResultFR267({
        ...result,
        candidateWinner: 'candidate.neutral.nasal_apex.full_face_max_z@0.1.0',
      } as never),
    ).toThrow(/identity\/evidence drift/);
  });
});
