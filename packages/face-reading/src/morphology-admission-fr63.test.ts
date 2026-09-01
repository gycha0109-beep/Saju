import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  runPhotoToGovernedNeutralGeometryFR62,
  type GovernedNeutralGeometryCandidateFR62V1,
} from './governed-neutral-geometry-fr62.js';
import { assessGeometryToMorphologyAdmissionFR63 } from './morphology-admission-fr63.js';

const DIGEST = `sha256:${'c'.repeat(64)}`;

function request(image: unknown = Object.freeze({ image: true })) {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr63:test-run',
    canonicalAssetDigest: DIGEST,
    image,
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 5) / 1000,
      visibility: 0.95,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
}

function factory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      return {
        detect() {
          return validResult();
        },
        close() {},
      };
    },
  };
}

async function source(): Promise<GovernedNeutralGeometryCandidateFR62V1> {
  return runPhotoToGovernedNeutralGeometryFR62(request(), factory());
}

describe('FR63 geometry to morphology admission', () => {
  it('keeps F1 morphology blocked instead of classifying the two FR62 eye outlines', async () => {
    const report = assessGeometryToMorphologyAdmissionFR63(await source());

    expect(report.schemaVersion).toBe('fr63-morphology-admission-v1');
    expect(report.tier).toBe('F1');
    expect(report.authorityState).toBe('blocked_no_authorized_eye_morphology_operationalization');
    expect(report.anatomicalTarget).toBe('eye');
    expect(report.sourceGeometryCandidateCount).toBe(2);
    expect(report.sourceGeometryKind).toBe('region');
    expect(report.pairConsumptionState).toBe('unordered_provider_labeled_pair_only');
    expect(report.automaticMorphologyClassifications).toEqual([]);
    expect(report.automaticCriterionStatesIssued).toBe(0);
    expect(report.fiveOfficerAssessmentInputIssued).toBe(false);
    expect(report.productionMorphologyAuthorized).toBe(false);
    expect(report.v1MethodologyInputReady).toBe(false);
  });

  it('pins all current eye criteria as capture-sensitive or dynamic and issues no automatic state', async () => {
    const report = assessGeometryToMorphologyAdmissionFR63(await source());

    expect(report.criterionAdmissions.map((entry) => entry.criterionId)).toEqual([
      'criterion.inspection.contained_not_exposed',
      'criterion.inspection.pupil_stable_center',
      'criterion.inspection.black_white_distinct',
      'criterion.inspection.radiant_appearance',
    ]);
    expect(report.criterionAdmissions.filter((entry) => entry.modality === 'capture_sensitive')).toHaveLength(3);
    expect(report.criterionAdmissions.filter((entry) => entry.modality === 'dynamic_appearance')).toHaveLength(1);
    report.criterionAdmissions.forEach((entry) => {
      expect(entry.staticV1Eligible).toBe(false);
      expect(entry.automaticState).toBe('not_evaluated');
      expect(entry.operationalizationRef).toBeNull();
      expect(entry.calibrationRef).toBeNull();
    });
  });

  it('prevents empty static criteria from becoming a synthetic complete Five Officers assessment', async () => {
    const report = assessGeometryToMorphologyAdmissionFR63(await source());
    const serialized = JSON.stringify(report);

    expect(report.prohibitedShortcuts).toContain('empty_static_criteria_to_complete_assessment');
    expect(report.fiveOfficerAssessmentInputIssued).toBe(false);
    expect(serialized).not.toContain('staticSupportState');
    expect(serialized).not.toContain('criterionStates');
    expect(serialized).not.toContain('\"met\"');
    expect(serialized).not.toContain('\"not_met\"');
  });

  it('does not substitute research fixture or human-label assertions for missing automatic morphology', async () => {
    const report = assessGeometryToMorphologyAdmissionFR63(await source());
    const serialized = JSON.stringify(report);

    expect(report.researchAssertionSubstitutionAllowed).toBe(false);
    expect(report.captureSensitiveObservationConsumed).toBe(false);
    expect(report.dynamicAppearanceConsumed).toBe(false);
    expect(report.prohibitedShortcuts).toContain('geometry_to_human_label_assertion');
    expect(serialized).not.toContain('research_fixture');
    expect(serialized).not.toContain('human_label_assertion');
    expect(serialized).not.toContain('\"claims\"');
    expect(serialized).not.toContain('\"narrative\"');
  });

  it('preserves research-only methodology and non-persistence provenance', async () => {
    const report = assessGeometryToMorphologyAdmissionFR63(await source());

    expect(report.provenance.providerRunRef).toBe('fr63:test-run');
    expect(report.provenance.canonicalAssetDigest).toBe(DIGEST);
    expect(report.provenance.sourceGeometrySchemaVersion).toBe('fr62-governed-neutral-geometry-candidate-v1');
    expect(report.provenance.sourceGeometryArtifactVersion).toBe('0.1.0');
    expect(report.provenance.methodologyRef).toBe('method.shenxiang.five_officers@0.1.0');
    expect(report.provenance.methodologyReviewStatus).toBe('research');
    expect(report.provenance.rawSourcePersisted).toBe(false);
    expect(report.provenance.rawProviderResponsePersisted).toBe(false);
    expect(report.provenance.biometricEmbeddingPersisted).toBe(false);
    expect(report.blockers).toEqual([
      'source_geometry_has_no_anatomical_laterality',
      'source_geometry_has_no_fr15_consumer_slot_assignment',
      'eye_criteria_require_capture_sensitive_or_dynamic_observation',
      'no_static_v1_eye_criterion_operationalization',
      'methodology_remains_research_only',
    ]);
  });

  it('rejects FR62 geometry that claims morphology was already produced', async () => {
    const valid = await source();
    const forged = {
      ...valid,
      morphologyProduced: true,
    } as unknown as GovernedNeutralGeometryCandidateFR62V1;

    expect(() => assessGeometryToMorphologyAdmissionFR63(forged)).toThrow(/widened downstream authority/u);
  });

  it('rejects a forged anatomical consumer-slot assignment on a provider-labeled eye region', async () => {
    const valid = await source();
    const forged = {
      ...valid,
      geometryCandidates: valid.geometryCandidates.map((candidate, index) => index === 0
        ? { ...candidate, consumerSlotAssignment: 'neutral.face.left_eye_region' }
        : candidate),
    } as unknown as GovernedNeutralGeometryCandidateFR62V1;

    expect(() => assessGeometryToMorphologyAdmissionFR63(forged)).toThrow(/anatomical\/consumer-slot promotion/u);
  });
});
