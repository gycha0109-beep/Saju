import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToGovernedNeutralGeometryFR62 } from './governed-neutral-geometry-fr62.js';
import {
  assessGeometryToMorphologyAdmissionFR63,
  type MorphologyAdmissionReportFR63V1,
} from './morphology-admission-fr63.js';
import { assessV1MethodologyAdmissionFR64 } from './v1-methodology-admission-fr64.js';

const DIGEST = `sha256:${'e'.repeat(64)}`;

function request(image: unknown = Object.freeze({ image: true })) {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr64:hardening-run',
    canonicalAssetDigest: DIGEST,
    image,
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 3) / 1000,
      visibility: 0.97,
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

async function morphology(): Promise<MorphologyAdmissionReportFR63V1> {
  const geometry = await runPhotoToGovernedNeutralGeometryFR62(request(), factory());
  return assessGeometryToMorphologyAdmissionFR63(geometry);
}

function forged(
  source: MorphologyAdmissionReportFR63V1,
  patch: Record<string, unknown>,
): MorphologyAdmissionReportFR63V1 {
  return { ...source, ...patch } as unknown as MorphologyAdmissionReportFR63V1;
}

describe('FR64 V1 methodology admission hardening', () => {
  it('rejects every widened FR63 execution-readiness or observation-consumption flag', async () => {
    const source = await morphology();
    const variants: readonly MorphologyAdmissionReportFR63V1[] = [
      forged(source, { automaticMorphologyClassifications: [{ forged: true }] }),
      forged(source, { automaticCriterionStatesIssued: 1 }),
      forged(source, { fiveOfficerAssessmentInputIssued: true }),
      forged(source, { researchAssertionSubstitutionAllowed: true }),
      forged(source, { captureSensitiveObservationConsumed: true }),
      forged(source, { dynamicAppearanceConsumed: true }),
      forged(source, { productionMorphologyAuthorized: true }),
      forged(source, { v1MethodologyInputReady: true }),
    ];

    for (const candidate of variants) {
      expect(() => assessV1MethodologyAdmissionFR64(candidate)).toThrow(/explicitly blocked and empty/u);
    }
  });

  it('rejects loss of FR63 laterality, consumer-slot, synthetic-completion, or assertion-shortcut guards', async () => {
    const source = await morphology();
    const missingLaterality = forged(source, {
      blockers: source.blockers.filter((entry) => entry !== 'source_geometry_has_no_anatomical_laterality'),
    });
    const missingSlot = forged(source, {
      blockers: source.blockers.filter((entry) => entry !== 'source_geometry_has_no_fr15_consumer_slot_assignment'),
    });
    const missingSyntheticCompletionGuard = forged(source, {
      prohibitedShortcuts: source.prohibitedShortcuts.filter((entry) => entry !== 'empty_static_criteria_to_complete_assessment'),
    });
    const missingAssertionGuard = forged(source, {
      prohibitedShortcuts: source.prohibitedShortcuts.filter((entry) => entry !== 'geometry_to_human_label_assertion'),
    });

    expect(() => assessV1MethodologyAdmissionFR64(missingLaterality)).toThrow(/blockers to remain intact/u);
    expect(() => assessV1MethodologyAdmissionFR64(missingSlot)).toThrow(/blockers to remain intact/u);
    expect(() => assessV1MethodologyAdmissionFR64(missingSyntheticCompletionGuard)).toThrow(/anti-shortcut/u);
    expect(() => assessV1MethodologyAdmissionFR64(missingAssertionGuard)).toThrow(/anti-shortcut/u);
  });

  it('rejects a forged FR63 criterion that becomes static, evaluated, operationalized, or calibrated', async () => {
    const source = await morphology();
    const first = source.criterionAdmissions[0]!;

    const variants = [
      { ...first, staticV1Eligible: true },
      { ...first, automaticState: 'evaluated' },
      { ...first, operationalizationRef: 'op:forged' },
      { ...first, calibrationRef: 'cal:forged' },
    ];

    for (const criterion of variants) {
      const candidate = forged(source, {
        criterionAdmissions: [criterion, ...source.criterionAdmissions.slice(1)],
      });
      expect(() => assessV1MethodologyAdmissionFR64(candidate)).toThrow(/non-evaluated and non-operationalized/u);
    }
  });

  it('rejects forged persistence provenance before methodology inspection can proceed', async () => {
    const source = await morphology();
    const variants: readonly MorphologyAdmissionReportFR63V1[] = [
      forged(source, { provenance: { ...source.provenance, rawSourcePersisted: true } }),
      forged(source, { provenance: { ...source.provenance, rawProviderResponsePersisted: true } }),
      forged(source, { provenance: { ...source.provenance, biometricEmbeddingPersisted: true } }),
    ];

    for (const candidate of variants) {
      expect(() => assessV1MethodologyAdmissionFR64(candidate)).toThrow(/non-persistence provenance/u);
    }
  });
});
