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
import {
  FR103_NLC_INTAKE_SCAN_EVIDENCE,
  admitFiveOfficerMouthScanEvidenceAcquisitionFR103,
  assertMouthPageVerificationRecordAuthorizedFR103,
  assertMouthPassageScanCheckedPromotionAuthorizedFR103,
  validateFiveOfficerMouthScanEvidenceAcquisitionFR103,
  type FiveOfficerMouthScanEvidenceAcquisitionFR103V1,
} from './five-officers-mouth-scan-evidence-acquisition-fr103.js';

const DIGEST = `sha256:${'3'.repeat(64)}`;

function request() {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr103:nlc-scan-evidence-acquisition',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 5) / 1000,
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

async function artifact103(): Promise<FiveOfficerMouthScanEvidenceAcquisitionFR103V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr70 = admitFiveOfficerMouthCriterionAuthorityGapFR70(fr69);
  const fr71 = admitFiveOfficerMouthSourceWitnessReadinessFR71(fr70);
  const fr72 = admitFiveOfficerMouthDirectSourceCandidateExtensionFR72(fr71);
  const fr73 = admitFiveOfficerMouthIndexedSectionAnchorFR73(fr72);
  const fr74 = assessFiveOfficerMouthScanImageAcquisitionReadinessFR74(fr73);
  return admitFiveOfficerMouthScanEvidenceAcquisitionFR103(fr74);
}

function forged(
  source: FiveOfficerMouthScanEvidenceAcquisitionFR103V1,
  patch: Record<string, unknown>,
): FiveOfficerMouthScanEvidenceAcquisitionFR103V1 {
  return { ...source, ...patch } as unknown as FiveOfficerMouthScanEvidenceAcquisitionFR103V1;
}

describe('FR103 Five Officers mouth NLC scan evidence acquisition', () => {
  it('binds the immutable NLC page-88 evidence and exact visual passage match', async () => {
    const result = await artifact103();

    expect(result.evidence).toBe(FR103_NLC_INTAKE_SCAN_EVIDENCE);
    expect(result.currentAcquisition.exactScanPage).toBe(88);
    expect(result.currentAcquisition.visualPassageMatchConfirmed).toBe(true);
    expect(result.currentAcquisition.evidenceBundleComplete).toBe(true);
    expect(result.evidence.sourcePdfSha256).toBe('sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af');
    expect(result.evidence.visuallyMatchedText).toBe('口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。');
    expect(result.evidence.ocrUsedForEvidenceAdmission).toBe(false);
    expect(result.evidence.searchIndexUsedForEvidenceAdmission).toBe(false);
  });

  it('issues only scan-image readiness and exact locator authority', async () => {
    const result = await artifact103();

    expect(result.scanImageEvidenceReady).toBe(true);
    expect(result.scanPageLocatorAuthorized).toBe(true);
    expect(result.baseRegistryInsertionAuthorized).toBe(false);
    expect(result.pageVerificationRecordAuthorized).toBe(false);
    expect(result.passageScanCheckedPromotionAuthorized).toBe(false);
  });

  it('keeps methodology, criterion, claim, formation, and traditional semantics closed', async () => {
    const result = await artifact103();

    expect(result.methodologyProductionPromotionAuthorized).toBe(false);
    expect(result.automaticCriterionStateAuthority).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalFormationAuthorized).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(Object.values(result.authorityBoundary).every((value) => value === false)).toBe(true);
  });

  it('rejects forged scan evidence or premature source-authority promotion', async () => {
    const source = await artifact103();
    const variants: readonly [FiveOfficerMouthScanEvidenceAcquisitionFR103V1, RegExp][] = [
      [forged(source, { currentAcquisition: { ...source.currentAcquisition, exactScanPage: 87 } }), /scan acquisition evidence drift/u],
      [forged(source, { currentAcquisition: { ...source.currentAcquisition, visualPassageMatchConfirmed: false } }), /scan acquisition evidence drift/u],
      [forged(source, { scanImageEvidenceReady: false }), /authority widened/u],
      [forged(source, { baseRegistryInsertionAuthorized: true }), /authority widened/u],
      [forged(source, { pageVerificationRecordAuthorized: true }), /authority widened/u],
      [forged(source, { passageScanCheckedPromotionAuthorized: true }), /authority widened/u],
      [forged(source, { methodologyProductionPromotionAuthorized: true }), /authority widened/u],
      [forged(source, { criterionStatesIssued: 1 }), /authority widened/u],
      [forged(source, { claimsIssued: 1 }), /authority widened/u],
      [forged(source, { traditionalSemanticAuthority: true }), /authority widened/u],
      [forged(source, { authorityBoundary: { ...source.authorityBoundary, exactScanPageMeansScanCheckedPassage: true } }), /fully fail-closed/u],
      [forged(source, { remainingBlockers: source.remainingBlockers.slice(1) }), /remaining blockers drift/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.slice(1) }), /prohibited shortcuts drift/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => validateFiveOfficerMouthScanEvidenceAcquisitionFR103(candidate)).toThrow(pattern);
    }
  });

  it('fails closed when page-verification or scan_checked promotion is requested', async () => {
    const result = await artifact103();
    expect(() => assertMouthPageVerificationRecordAuthorizedFR103(result)).toThrow(/separate governance review/u);
    expect(() => assertMouthPassageScanCheckedPromotionAuthorizedFR103(result)).toThrow(/does not mutate the direct-source registry/u);
  });
});
