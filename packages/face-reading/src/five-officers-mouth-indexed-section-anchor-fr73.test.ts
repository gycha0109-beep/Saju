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
import {
  FR73_INDEXED_SECTION_ANCHOR,
  admitFiveOfficerMouthIndexedSectionAnchorFR73,
  assertMouthScanPageLocatorAuthorizedFR73,
  assertMouthTargetPassagePrintedLeafAuthorizedFR73,
  validateFiveOfficerMouthIndexedSectionAnchorFR73,
  type FiveOfficerMouthIndexedSectionAnchorFR73V1,
} from './five-officers-mouth-indexed-section-anchor-fr73.js';

const DIGEST = `sha256:${'a'.repeat(64)}`;

function request() {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr73:mouth-indexed-section-anchor',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 7) / 1000,
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

async function anchor73(): Promise<FiveOfficerMouthIndexedSectionAnchorFR73V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr70 = admitFiveOfficerMouthCriterionAuthorityGapFR70(fr69);
  const fr71 = admitFiveOfficerMouthSourceWitnessReadinessFR71(fr70);
  const fr72 = admitFiveOfficerMouthDirectSourceCandidateExtensionFR72(fr71);
  return admitFiveOfficerMouthIndexedSectionAnchorFR73(fr72);
}

function forged(
  source: FiveOfficerMouthIndexedSectionAnchorFR73V1,
  patch: Record<string, unknown>,
): FiveOfficerMouthIndexedSectionAnchorFR73V1 {
  return { ...source, ...patch } as unknown as FiveOfficerMouthIndexedSectionAnchorFR73V1;
}

describe('FR73 Five Officers mouth indexed section anchor', () => {
  it('records only the NLC volume-two leaf-one section-start anchor', async () => {
    const result = await anchor73();

    expect(result.authorityState).toBe('indexed_volume2_leaf1_section_start_anchor_only');
    expect(result.indexedSectionAnchor).toEqual(FR73_INDEXED_SECTION_ANCHOR);
    expect(result.indexedSectionAnchor.sourceFileUrl).toContain('NLC416-13jh001662-59167');
    expect(result.indexedSectionAnchor.indexedHeading).toBe('神相全編卷二一');
    expect(result.indexedSectionAnchor.indexedSectionSequence).toEqual(['五官總論', '五官說']);
    expect(result.indexedSectionAnchor.anchorInterpretation).toBe('volume2_leaf1_section_start_only');
  });

  it('does not turn the section-start anchor into a target-passage or scan-page locator', async () => {
    const result = await anchor73();

    expect(result.locatorState).toEqual({
      sectionStartPrintedLeafAnchor: '卷二一',
      targetPassagePrintedLeaf: null,
      exactScanPage: null,
      visualEvidenceRefs: [],
      checkerRefs: [],
      pageVerificationState: null,
    });
    expect(result.searchIndexResearchAuthorized).toBe(true);
    expect(result.targetPassagePrintedLeafAuthorized).toBe(false);
    expect(result.scanPageLocatorAuthorized).toBe(false);
    expect(result.pageVerificationAuthorized).toBe(false);
    expect(result.passageScanCheckedPromotionAuthorized).toBe(false);
  });

  it('keeps every downstream methodology, criterion, claim, and traditional authority closed', async () => {
    const result = await anchor73();

    expect(result.baseRegistryInsertionAuthorized).toBe(false);
    expect(result.methodologyProductionPromotionAuthorized).toBe(false);
    expect(result.automaticCriterionStateAuthority).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalFormationAuthorized).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(Object.values(result.authorityBoundary).every((value) => value === false)).toBe(true);
  });

  it('rejects forged passage leaf, scan page, visual evidence, page verification, or semantic authority', async () => {
    const source = await anchor73();
    const variants: readonly [FiveOfficerMouthIndexedSectionAnchorFR73V1, RegExp][] = [
      [forged(source, { locatorState: { ...source.locatorState, targetPassagePrintedLeaf: '卷二一' } }), /locator evidence or passage-location authority widened/u],
      [forged(source, { locatorState: { ...source.locatorState, exactScanPage: 42 } }), /locator evidence or passage-location authority widened/u],
      [forged(source, { locatorState: { ...source.locatorState, visualEvidenceRefs: ['evidence.forged'] } }), /locator evidence or passage-location authority widened/u],
      [forged(source, { locatorState: { ...source.locatorState, checkerRefs: ['checker.forged'] } }), /locator evidence or passage-location authority widened/u],
      [forged(source, { locatorState: { ...source.locatorState, pageVerificationState: 'scan_checked' } }), /locator evidence or passage-location authority widened/u],
      [forged(source, { targetPassagePrintedLeafAuthorized: true }), /authority widened/u],
      [forged(source, { scanPageLocatorAuthorized: true }), /authority widened/u],
      [forged(source, { baseRegistryInsertionAuthorized: true }), /authority widened/u],
      [forged(source, { pageVerificationAuthorized: true }), /authority widened/u],
      [forged(source, { passageScanCheckedPromotionAuthorized: true }), /authority widened/u],
      [forged(source, { automaticCriterionStateAuthority: true }), /authority widened/u],
      [forged(source, { claimsIssued: 1 }), /authority widened/u],
      [forged(source, { traditionalSemanticAuthority: true }), /authority widened/u],
      [forged(source, { authorityBoundary: { ...source.authorityBoundary, sectionStartAnchorMeansTargetPassagePrintedLeaf: true } }), /fully fail-closed/u],
      [forged(source, { remainingBlockers: source.remainingBlockers.slice(1) }), /remaining blockers drift/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.slice(1) }), /prohibited shortcuts drift/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => validateFiveOfficerMouthIndexedSectionAnchorFR73(candidate)).toThrow(pattern);
    }
  });

  it('fails closed when target-passage leaf or scan-page authority is requested', async () => {
    const result = await anchor73();
    expect(() => assertMouthTargetPassagePrintedLeafAuthorizedFR73(result)).toThrow(/printed leaf is not authorized/u);
    expect(() => assertMouthScanPageLocatorAuthorizedFR73(result)).toThrow(/scan page locator is not authorized/u);
  });
});
