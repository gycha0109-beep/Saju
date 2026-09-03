import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { admitFiveOfficerMouthCriterionAuthorityGapFR70 } from './five-officers-mouth-criterion-authority-gap-fr70.js';
import { admitFiveOfficerMouthSourceWitnessReadinessFR71 } from './five-officers-mouth-source-witness-readiness-fr71.js';
import { admitFiveOfficerMouthDirectSourceCandidateExtensionFR72 } from './five-officers-mouth-direct-source-candidate-extension-fr72.js';
import { admitFiveOfficerMouthIndexedSectionAnchorFR73 } from './five-officers-mouth-indexed-section-anchor-fr73.js';
import { assessFiveOfficerMouthScanImageAcquisitionReadinessFR74 } from './five-officers-mouth-scan-image-acquisition-readiness-fr74.js';
import { admitFiveOfficerMouthScanEvidenceAcquisitionFR103 } from './five-officers-mouth-scan-evidence-acquisition-fr103.js';
import { admitFiveOfficerMouthDirectSourcePageVerificationFR104 } from './five-officers-mouth-direct-source-page-verification-fr104.js';
import {
  reviewFiveOfficerMethodologySourceRebindFR105,
  validateFiveOfficerMethodologySourceRebindReviewFR105,
} from './five-officers-methodology-source-rebind-review-fr105.js';

const DIGEST = `sha256:${'6'.repeat(64)}`;

function factory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  const result: MediaPipeFaceLandmarkerResultFR25V1 = {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 7) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
  return { async create() { return { detect: () => result, close() {} }; } };
}

async function artifact105() {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr105:source-rebind',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  }, factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr70 = admitFiveOfficerMouthCriterionAuthorityGapFR70(fr69);
  const fr71 = admitFiveOfficerMouthSourceWitnessReadinessFR71(fr70);
  const fr72 = admitFiveOfficerMouthDirectSourceCandidateExtensionFR72(fr71);
  const fr73 = admitFiveOfficerMouthIndexedSectionAnchorFR73(fr72);
  const fr74 = assessFiveOfficerMouthScanImageAcquisitionReadinessFR74(fr73);
  const fr103 = admitFiveOfficerMouthScanEvidenceAcquisitionFR103(fr74);
  const fr104 = admitFiveOfficerMouthDirectSourcePageVerificationFR104(fr103);
  return reviewFiveOfficerMethodologySourceRebindFR105(fr104);
}

describe('FR105 Five Officers methodology source rebind review', () => {
  it('rebinds only the intake source authority to the scan-checked NLC witness', async () => {
    const result = await artifact105();
    expect(result.sourceSlotCount).toBe(6);
    expect(result.scanCheckedSourceCountBefore).toBe(0);
    expect(result.scanCheckedSourceCountAfter).toBe(1);
    expect(result.unresolvedSourceSlotCountAfter).toBe(5);
    const intake = result.sourceSlots.find((slot) => slot.passageRef === 'passage.shenxiang.five_officers.intake');
    expect(intake).toEqual({
      passageRef: 'passage.shenxiang.five_officers.intake',
      beforeWitnessId: 'witness.shenxiang_quanbian.ctext',
      beforeVerificationStatus: 'unverified_ocr',
      afterWitnessId: 'witness.shenxiang_quanbian.nlc_1925',
      afterVerificationStatus: 'scan_checked',
      authorityRebound: true,
    });
  });

  it('preserves the historical methodology identity and research review status', async () => {
    const result = await artifact105();
    expect(result.targetMethodology).toEqual({
      methodologyRef: 'method.shenxiang.five_officers@0.1.0',
      methodologyId: 'method.shenxiang.five_officers',
      methodologyVersion: '0.1.0',
      traditionalTerm: '五官',
      reviewStatusBefore: 'research',
      reviewStatusAfter: 'research',
      sourceRefCount: 6,
      sourceRefsChanged: false,
      historicalRegistryMutated: false,
    });
    expect(result.intakeSourceAuthorityRebindAuthorized).toBe(true);
    expect(result.methodologySourceAuthorityOverlayIssued).toBe(1);
    expect(result.methodologyRegistryMutationAuthorized).toBe(false);
    expect(result.methodologyReviewPromotionAuthorized).toBe(false);
  });

  it('keeps methodology execution and downstream semantic authority closed', async () => {
    const result = await artifact105();
    expect(result.methodologyExecutionIssued).toBe(false);
    expect(result.methodologyProductionPromotionAuthorized).toBe(false);
    expect(result.metricBindingsIssued).toBe(0);
    expect(result.thresholdsIssued).toBe(0);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalFormationAuthorized).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('validates the issued review artifact without widening authority', async () => {
    const result = await artifact105();
    expect(validateFiveOfficerMethodologySourceRebindReviewFR105(result)).toBe(result);
    expect(Object.values(result.authorityBoundary).every((value) => value === false)).toBe(true);
  });
});
