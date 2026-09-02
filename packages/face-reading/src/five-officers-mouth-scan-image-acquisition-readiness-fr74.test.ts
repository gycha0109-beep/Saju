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
import {
  FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS,
  assessFiveOfficerMouthScanImageAcquisitionReadinessFR74,
  assertMouthPageVerificationRecordAuthorizedFR74,
  assertMouthScanImageEvidenceReadyFR74,
  validateFiveOfficerMouthScanImageAcquisitionReadinessFR74,
  type FiveOfficerMouthScanImageAcquisitionReadinessFR74V1,
} from './five-officers-mouth-scan-image-acquisition-readiness-fr74.js';

const DIGEST = `sha256:${'b'.repeat(64)}`;

function request() {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr74:mouth-scan-image-acquisition-readiness',
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

async function readiness74(): Promise<FiveOfficerMouthScanImageAcquisitionReadinessFR74V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr70 = admitFiveOfficerMouthCriterionAuthorityGapFR70(fr69);
  const fr71 = admitFiveOfficerMouthSourceWitnessReadinessFR71(fr70);
  const fr72 = admitFiveOfficerMouthDirectSourceCandidateExtensionFR72(fr71);
  const fr73 = admitFiveOfficerMouthIndexedSectionAnchorFR73(fr72);
  return assessFiveOfficerMouthScanImageAcquisitionReadinessFR74(fr73);
}

function forged(
  source: FiveOfficerMouthScanImageAcquisitionReadinessFR74V1,
  patch: Record<string, unknown>,
): FiveOfficerMouthScanImageAcquisitionReadinessFR74V1 {
  return { ...source, ...patch } as unknown as FiveOfficerMouthScanImageAcquisitionReadinessFR74V1;
}

describe('FR74 Five Officers mouth scan-image acquisition readiness', () => {
  it('defines the complete page-image evidence bundle required before locator review', async () => {
    const result = await readiness74();

    expect(result.requiredEvidence).toEqual(FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS);
    expect(result.requiredEvidence).toEqual([
      'immutable_nlc_1925_page_image_ref',
      'exact_scan_page_within_1_576',
      'visual_match_of_intake_heading_or_passage_text',
      'nonempty_visual_evidence_refs',
      'nonempty_checker_refs',
    ]);
    expect(result.sourceTarget.pageCount).toBe(576);
    expect(result.sourceTarget.fileSizeBytes).toBe(19_310_489);
  });

  it('remains blocked because no actual page image or visual passage match is present', async () => {
    const result = await readiness74();

    expect(result.currentAcquisition).toEqual({
      immutablePageImageRef: null,
      exactScanPage: null,
      targetPassagePrintedLeaf: null,
      visualPassageMatchConfirmed: false,
      visualEvidenceRefs: [],
      checkerRefs: [],
      evidenceBundleComplete: false,
      state: 'page_image_not_acquired',
    });
    expect(result.scanImageEvidenceReady).toBe(false);
    expect(result.scanPageLocatorAuthorized).toBe(false);
    expect(result.pageVerificationRecordAuthorized).toBe(false);
    expect(result.passageScanCheckedPromotionAuthorized).toBe(false);
  });

  it('prohibits guessed offsets, other-edition page mapping, OCR-only matches, and URL-existence shortcuts', async () => {
    const result = await readiness74();

    expect(result.acquisitionResearchAuthorized).toBe(true);
    expect(result.guessedPageOffsetAuthorized).toBe(false);
    expect(result.otherEditionPageMappingAuthorized).toBe(false);
    expect(result.ocrOnlyLocatorAuthorized).toBe(false);
    expect(result.searchIndexLocatorAuthorized).toBe(false);
    expect(result.pageUrlExistenceMeansVisualVerification).toBe(false);
    expect(Object.values(result.authorityBoundary).every((value) => value === false)).toBe(true);
  });

  it('keeps methodology, criteria, claims, and traditional semantics closed', async () => {
    const result = await readiness74();

    expect(result.baseRegistryInsertionAuthorized).toBe(false);
    expect(result.methodologyProductionPromotionAuthorized).toBe(false);
    expect(result.automaticCriterionStateAuthority).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalFormationAuthorized).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects forged page-image evidence or any premature authority promotion', async () => {
    const source = await readiness74();
    const variants: readonly [FiveOfficerMouthScanImageAcquisitionReadinessFR74V1, RegExp][] = [
      [forged(source, { currentAcquisition: { ...source.currentAcquisition, immutablePageImageRef: 'image.forged' } }), /acquisition evidence was widened/u],
      [forged(source, { currentAcquisition: { ...source.currentAcquisition, exactScanPage: 42 } }), /acquisition evidence was widened/u],
      [forged(source, { currentAcquisition: { ...source.currentAcquisition, targetPassagePrintedLeaf: '卷二一' } }), /acquisition evidence was widened/u],
      [forged(source, { currentAcquisition: { ...source.currentAcquisition, visualPassageMatchConfirmed: true } }), /acquisition evidence was widened/u],
      [forged(source, { currentAcquisition: { ...source.currentAcquisition, visualEvidenceRefs: ['evidence.forged'] } }), /acquisition evidence was widened/u],
      [forged(source, { currentAcquisition: { ...source.currentAcquisition, checkerRefs: ['checker.forged'] } }), /acquisition evidence was widened/u],
      [forged(source, { guessedPageOffsetAuthorized: true }), /authority widened/u],
      [forged(source, { otherEditionPageMappingAuthorized: true }), /authority widened/u],
      [forged(source, { ocrOnlyLocatorAuthorized: true }), /authority widened/u],
      [forged(source, { scanImageEvidenceReady: true }), /authority widened/u],
      [forged(source, { scanPageLocatorAuthorized: true }), /authority widened/u],
      [forged(source, { baseRegistryInsertionAuthorized: true }), /authority widened/u],
      [forged(source, { pageVerificationRecordAuthorized: true }), /authority widened/u],
      [forged(source, { passageScanCheckedPromotionAuthorized: true }), /authority widened/u],
      [forged(source, { automaticCriterionStateAuthority: true }), /authority widened/u],
      [forged(source, { claimsIssued: 1 }), /authority widened/u],
      [forged(source, { traditionalSemanticAuthority: true }), /authority widened/u],
      [forged(source, { authorityBoundary: { ...source.authorityBoundary, guessedPdfOffsetMeansScanPage: true } }), /fully fail-closed/u],
      [forged(source, { remainingBlockers: source.remainingBlockers.slice(1) }), /remaining blockers drift/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.slice(1) }), /prohibited shortcuts drift/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => validateFiveOfficerMouthScanImageAcquisitionReadinessFR74(candidate)).toThrow(pattern);
    }
  });

  it('fails closed when scan-image readiness or a page-verification record is requested', async () => {
    const result = await readiness74();
    expect(() => assertMouthScanImageEvidenceReadyFR74(result)).toThrow(/scan-image evidence is not ready/u);
    expect(() => assertMouthPageVerificationRecordAuthorizedFR74(result)).toThrow(/page-verification record is not authorized/u);
  });
});
