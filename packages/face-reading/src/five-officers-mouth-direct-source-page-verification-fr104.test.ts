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
import {
  FR104_NLC_1925_INTAKE_CANDIDATE,
  FR104_NLC_INTAKE_PAGE_VERIFICATION,
  admitFiveOfficerMouthDirectSourcePageVerificationFR104,
  assertIssuedMouthScanCheckedPassageFR104,
  assertMouthBaseRegistryInsertionAuthorizedFR104,
  assertMouthDoubleCheckedPromotionAuthorizedFR104,
  type FiveOfficerMouthDirectSourcePageVerificationFR104V1,
} from './five-officers-mouth-direct-source-page-verification-fr104.js';

const DIGEST = `sha256:${'4'.repeat(64)}`;

function factory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  const result: MediaPipeFaceLandmarkerResultFR25V1 = {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 5) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
  return {
    async create() {
      return { detect: () => result, close() {} };
    },
  };
}

async function artifact104(): Promise<FiveOfficerMouthDirectSourcePageVerificationFR104V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr104:nlc-page-verification',
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
  return admitFiveOfficerMouthDirectSourcePageVerificationFR104(fr103);
}

describe('FR104 Five Officers mouth direct-source page verification', () => {
  it('admits one scan_checked NLC page-verification record in a separate governed extension', async () => {
    const result = await artifact104();
    expect(result.candidate).toBe(FR104_NLC_1925_INTAKE_CANDIDATE);
    expect(result.pageVerification).toBe(FR104_NLC_INTAKE_PAGE_VERIFICATION);
    expect(result.candidate.state).toBe('scan_checked');
    expect(result.pageVerification.state).toBe('scan_checked');
    expect(result.pageVerification.scanPage).toBe(88);
    expect(result.pageVerification.checkerRefs).toHaveLength(1);
    expect(result.registryExtension.extensionCandidateCount).toBe(2);
    expect(result.registryExtension.extensionPageVerificationCount).toBe(1);
    expect(result.registryExtension.baseRegistryMutated).toBe(false);
  });

  it('materializes the verified NLC passage as scan_checked', async () => {
    const result = await artifact104();
    expect(assertIssuedMouthScanCheckedPassageFR104(result)).toEqual({
      passageId: 'passage.shenxiang.five_officers.intake',
      witnessId: 'witness.shenxiang_quanbian.nlc_1925',
      chapter: '出納官',
      scanPage: 88,
      originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。',
      verificationStatus: 'scan_checked',
    });
    expect(result.verifiedSourcePassagesIssued).toBe(1);
    expect(result.pageVerificationRecordAuthorized).toBe(true);
    expect(result.passageScanCheckedPromotionAuthorized).toBe(true);
  });

  it('keeps base registry mutation and double_checked promotion closed', async () => {
    const result = await artifact104();
    expect(result.extensionRegistryInsertionAuthorized).toBe(true);
    expect(result.baseRegistryInsertionAuthorized).toBe(false);
    expect(result.doubleCheckedPromotionAuthorized).toBe(false);
    expect(() => assertMouthBaseRegistryInsertionAuthorizedFR104(result)).toThrow(/base registry insertion is not authorized/u);
    expect(() => assertMouthDoubleCheckedPromotionAuthorizedFR104(result)).toThrow(/exactly one reviewed checker ref/u);
  });

  it('does not widen methodology, criterion, claim, or traditional authority', async () => {
    const result = await artifact104();
    expect(result.methodologyProductionPromotionAuthorized).toBe(false);
    expect(result.automaticCriterionStateAuthority).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalFormationAuthorized).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(Object.values(result.authorityBoundary).every((value) => value === false)).toBe(true);
  });
});
