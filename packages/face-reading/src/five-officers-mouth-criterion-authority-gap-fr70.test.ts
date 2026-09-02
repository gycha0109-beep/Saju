import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { evaluateFiveOfficerStaticSupport } from './five-officers-six-fus-research-v0.js';
import {
  FR70_INTAKE_CRITERION_IDS,
  admitFiveOfficerMouthCriterionAuthorityGapFR70,
  assertAutomaticMouthCriterionStatesAuthorizedFR70,
  validateFiveOfficerMouthCriterionAuthorityGapFR70,
  type FiveOfficerMouthCriterionAuthorityGapFR70V1,
} from './five-officers-mouth-criterion-authority-gap-fr70.js';

const DIGEST = `sha256:${'7'.repeat(64)}`;

function request() {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr70:mouth-criterion-authority-gap',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 11) / 1000,
      visibility: 0.99,
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

async function gap70(): Promise<FiveOfficerMouthCriterionAuthorityGapFR70V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  return admitFiveOfficerMouthCriterionAuthorityGapFR70(fr69);
}

function forged(
  source: FiveOfficerMouthCriterionAuthorityGapFR70V1,
  patch: Record<string, unknown>,
): FiveOfficerMouthCriterionAuthorityGapFR70V1 {
  return { ...source, ...patch } as unknown as FiveOfficerMouthCriterionAuthorityGapFR70V1;
}

describe('FR70 Five Officers mouth criterion authority gap', () => {
  it('pins the five 出納官 criteria and preserves their source-level modalities', async () => {
    const result = await gap70();

    expect(result.traditionalSource).toEqual({
      passageId: 'passage.shenxiang.five_officers.intake',
      verificationStatus: 'unverified_ocr',
      methodologyRef: 'method.shenxiang.five_officers@0.1.0',
      methodologyReviewStatus: 'research',
      traditionalOfficerName: '出納官',
      anatomicalTarget: 'mouth',
    });
    expect(result.criterionAdmissions.map((item) => item.criterionId)).toEqual(FR70_INTAKE_CRITERION_IDS);
    expect(result.criterionAdmissions.map((item) => [item.sourceConcept, item.modality, item.staticV1Eligible])).toEqual([
      ['方大', 'static_geometry', true],
      ['端厚', 'static_geometry', true],
      ['角弓', 'capture_sensitive', false],
      ['開大合小', 'capture_sensitive', false],
      ['唇紅', 'dynamic_appearance', false],
    ]);
  });

  it('keeps staticV1Eligible criteria as candidates rather than executable operationalizations', async () => {
    const result = await gap70();
    const staticCandidates = result.criterionAdmissions.filter((item) => item.staticV1Eligible);

    expect(staticCandidates.map((item) => item.criterionId)).toEqual([
      'criterion.intake.square_broad',
      'criterion.intake.lips_substantial',
    ]);
    for (const criterion of staticCandidates) {
      expect(criterion.operationalizationState).toBe('candidate_note_only');
      expect(criterion.metricBindingRef).toBeNull();
      expect(criterion.calibrationRef).toBeNull();
      expect(criterion.automaticCriterionStateAuthorized).toBe(false);
    }
    expect(result.authorityBoundary.staticV1EligibleMeansExecutableOperationalization).toBe(false);
    expect(result.authorityBoundary.operationalizationNoteMeansMetricDefinition).toBe(false);
  });

  it('keeps capture-sensitive and dynamic criteria blocked from static automatic evaluation', async () => {
    const result = await gap70();
    const blocked = result.criterionAdmissions.filter((item) => !item.staticV1Eligible);

    expect(blocked).toHaveLength(3);
    expect(blocked.every((item) => item.operationalizationState === 'capture_or_dynamic_blocked')).toBe(true);
    expect(blocked.every((item) => item.automaticCriterionStateAuthorized === false)).toBe(true);
    expect(result.remainingBlockers).toContain('capture_sensitive_intake_criteria_not_authorized');
    expect(result.remainingBlockers).toContain('dynamic_lip_color_not_authorized');
  });

  it('records the current calibration and neutral-slot gaps without inventing mouth authority', async () => {
    const result = await gap70();

    expect(result.baseNeutralContract.consumerSlots).toEqual([
      'neutral.face.brow_midline',
      'neutral.face.nose_region',
      'neutral.face.left_brow_region',
      'neutral.face.right_brow_region',
      'neutral.face.left_eye_region',
      'neutral.face.right_eye_region',
    ]);
    expect(result.baseNeutralContract.mouthConsumerSlotIssued).toBe(false);
    expect(result.calibrationInventory).toEqual({
      criterionSpecificEvidenceRefs: [],
      criterionSpecificProtocolRefs: [],
      criterionSpecificStudyRefs: [],
      productionAuthorizedCalibrationCount: 0,
    });
    expect(result.mouthMetricBindingReviewed).toBe(false);
    expect(result.mouthStaticThresholdsCalibrated).toBe(false);
  });

  it('distinguishes caller-supplied research states from CV-generated criterion authority', async () => {
    const result = await gap70();
    const researchAssessment = evaluateFiveOfficerStaticSupport({
      officerKey: 'intake',
      criterionStates: {
        'criterion.intake.square_broad': 'met',
        'criterion.intake.lips_substantial': 'met',
      },
    });

    expect(researchAssessment.staticSupportState).toBe('complete');
    expect(researchAssessment.traditionalFormationState).toBe('not_authorized');
    expect(result.existingResearchEvaluator).toEqual({
      acceptsCallerSuppliedCriterionStates: true,
      generatesCriterionStatesFromGeometry: false,
      productionCriterionStateAuthority: false,
      researchClaimBuilderProductionAuthorized: false,
    });
    expect(result.authorityBoundary.callerSuppliedResearchStateMeansGeneratedState).toBe(false);
    expect(result.authorityBoundary.researchStaticSupportMeansTraditionalFormation).toBe(false);
  });

  it('inherits FR69 metric geometry blockers and issues no morphology, criterion states, claims, or semantics', async () => {
    const result = await gap70();

    expect(result.upstream).toEqual({
      fr69SchemaVersion: 'fr69-mediapipe-web-metric-geometry-gap-v1',
      fr69AuthorityState: 'release_exact_web_metric_geometry_surface_gap',
      metricLipsGeometryIssued: false,
      poseNormalizedLipsGeometryIssued: false,
      neutralMetricDefinitionsIssued: 0,
      criterionStatesIssued: 0,
      traditionalSemanticAuthority: false,
    });
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalFormationAuthorized).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(Object.values(result.authorityBoundary).every((value) => value === false)).toBe(true);
  });

  it('rejects forged source, slot, calibration, criterion, or semantic authority widening', async () => {
    const source = await gap70();
    const widenedCriterion = {
      ...source.criterionAdmissions[0]!,
      calibrationRef: 'calibration.forged@1.0.0',
      automaticCriterionStateAuthorized: true,
    };
    const variants: readonly [FiveOfficerMouthCriterionAuthorityGapFR70V1, RegExp][] = [
      [forged(source, { criterionStatesIssued: 1 }), /authority widened/u],
      [forged(source, { traditionalSemanticAuthority: true }), /authority widened/u],
      [forged(source, {
        traditionalSource: { ...source.traditionalSource, verificationStatus: 'scan_checked' },
      }), /traditional source\/methodology authority widened/u],
      [forged(source, {
        baseNeutralContract: { ...source.baseNeutralContract, mouthConsumerSlotIssued: true },
      }), /consumer-slot authority widened/u],
      [forged(source, {
        calibrationInventory: { ...source.calibrationInventory, productionAuthorizedCalibrationCount: 1 },
      }), /calibration inventory authority widened/u],
      [forged(source, {
        criterionAdmissions: [widenedCriterion, ...source.criterionAdmissions.slice(1)],
      }), /criterion admission authority widened/u],
      [forged(source, {
        authorityBoundary: { ...source.authorityBoundary, staticV1EligibleMeansExecutableOperationalization: true },
      }), /fully fail-closed/u],
      [forged(source, { remainingBlockers: source.remainingBlockers.slice(1) }), /remaining blockers drift/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.slice(1) }), /prohibited shortcuts drift/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => validateFiveOfficerMouthCriterionAuthorityGapFR70(candidate)).toThrow(pattern);
    }
  });

  it('fails closed when automatic mouth criterion states are requested', async () => {
    const result = await gap70();
    expect(() => assertAutomaticMouthCriterionStatesAuthorizedFR70(result)).toThrow(/not authorized/u);
  });
});
