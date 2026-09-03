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
  admitFiveOfficerMouthDirectSourcePageVerificationFR104,
  validateFiveOfficerMouthDirectSourcePageVerificationFR104,
  type FiveOfficerMouthDirectSourcePageVerificationFR104V1,
} from './five-officers-mouth-direct-source-page-verification-fr104.js';

const DIGEST = `sha256:${'5'.repeat(64)}`;

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
  return { async create() { return { detect: () => result, close() {} }; } };
}

async function valid104(): Promise<FiveOfficerMouthDirectSourcePageVerificationFR104V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr104:hardening',
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

function forged(
  source: FiveOfficerMouthDirectSourcePageVerificationFR104V1,
  patch: Record<string, unknown>,
): FiveOfficerMouthDirectSourcePageVerificationFR104V1 {
  return { ...source, ...patch } as unknown as FiveOfficerMouthDirectSourcePageVerificationFR104V1;
}

describe('FR104 direct-source page verification hardening', () => {
  it('rejects forged registry, verification tier, or downstream authority', async () => {
    const source = await valid104();
    const variants: readonly [FiveOfficerMouthDirectSourcePageVerificationFR104V1, RegExp][] = [
      [forged(source, { registryExtension: { ...source.registryExtension, baseRegistryMutated: true } }), /registry extension drift/u],
      [forged(source, { pageVerificationRecordAuthorized: false }), /authority drift/u],
      [forged(source, { passageScanCheckedPromotionAuthorized: false }), /authority drift/u],
      [forged(source, { doubleCheckedPromotionAuthorized: true }), /authority drift/u],
      [forged(source, { materializedPassage: { ...source.materializedPassage, verificationStatus: 'double_checked' } }), /materialized scan-checked source passage drift/u],
      [forged(source, { methodologyProductionPromotionAuthorized: true }), /authority drift/u],
      [forged(source, { criterionStatesIssued: 1 }), /authority drift/u],
      [forged(source, { claimsIssued: 1 }), /authority drift/u],
      [forged(source, { traditionalSemanticAuthority: true }), /authority drift/u],
      [forged(source, { authorityBoundary: { ...source.authorityBoundary, singleCheckerMeansDoubleChecked: true } }), /fully fail-closed/u],
      [forged(source, { remainingBlockers: source.remainingBlockers.slice(1) }), /remaining blockers drift/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.slice(1) }), /prohibited shortcuts drift/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => validateFiveOfficerMouthDirectSourcePageVerificationFR104(candidate)).toThrow(pattern);
    }
  });
});
