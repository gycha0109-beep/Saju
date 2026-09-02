import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { admitFiveOfficerMouthCriterionAuthorityGapFR70 } from './five-officers-mouth-criterion-authority-gap-fr70.js';
import { admitFiveOfficerMouthSourceWitnessReadinessFR71 } from './five-officers-mouth-source-witness-readiness-fr71.js';
import {
  FR72_NLC_1925_INTAKE_CANDIDATE,
  admitFiveOfficerMouthDirectSourceCandidateExtensionFR72,
  assertMouthDirectSourcePageVerificationAuthorizedFR72,
  validateFiveOfficerMouthDirectSourceCandidateExtensionFR72,
  type FiveOfficerMouthDirectSourceCandidateExtensionFR72V1,
} from './five-officers-mouth-direct-source-candidate-extension-fr72.js';

const DIGEST = `sha256:${'9'.repeat(64)}`;

function request() {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr72:mouth-direct-source-candidate-extension',
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

async function extension72(): Promise<FiveOfficerMouthDirectSourceCandidateExtensionFR72V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr70 = admitFiveOfficerMouthCriterionAuthorityGapFR70(fr69);
  const fr71 = admitFiveOfficerMouthSourceWitnessReadinessFR71(fr70);
  return admitFiveOfficerMouthDirectSourceCandidateExtensionFR72(fr71);
}

function forged(
  source: FiveOfficerMouthDirectSourceCandidateExtensionFR72V1,
  patch: Record<string, unknown>,
): FiveOfficerMouthDirectSourceCandidateExtensionFR72V1 {
  return { ...source, ...patch } as unknown as FiveOfficerMouthDirectSourceCandidateExtensionFR72V1;
}

describe('FR72 Five Officers mouth direct-source candidate extension', () => {
  it('admits the verified NLC witness only as a separate passage-unlocated locator candidate', async () => {
    const result = await extension72();

    expect(result.extensionMode).toBe('separate_contract_extension');
    expect(result.baseRegistry.baseRegistryMutated).toBe(false);
    expect(result.candidate).toEqual(FR72_NLC_1925_INTAKE_CANDIDATE);
    expect(result.candidate.state).toBe('witness_verified_passage_unlocated');
    expect(result.candidate.targetChapterLabel).toBe('卷二 / 五官說 / 出納官');
    expect(result.candidate.pageCount).toBe(576);
    expect(result.candidate.fileSizeBytes).toBe(19_310_489);
    expect(result.candidate.targetConceptRefs).toEqual([
      'method.shenxiang.five_officers@0.1.0',
      'criterion.intake.square_broad',
      'criterion.intake.lips_substantial',
      'criterion.intake.corners_arched',
      'criterion.intake.open_close_relation',
      'criterion.intake.red_lip_color',
    ]);
  });

  it('pins metadata provenance without fabricating checksum or page evidence', async () => {
    const result = await extension72();

    expect(result.metadataEvidence).toEqual({
      filePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf',
      observedPageCount: 576,
      observedFileSizeBytes: 19310489,
      checksumSha1: null,
      evidenceState: 'single_external_metadata_observation',
    });
    expect(result.locatorState).toEqual({
      passageId: 'passage.shenxiang.five_officers.intake',
      chapter: '出納官',
      exactScanPage: null,
      printedPage: null,
      visualEvidenceRefs: [],
      checkerRefs: [],
      pageVerificationState: null,
    });
  });

  it('allows locator research but no registry insertion, page verification, or semantic promotion', async () => {
    const result = await extension72();

    expect(result.candidateExtensionValidationPassed).toBe(true);
    expect(result.locatorResearchAuthorized).toBe(true);
    expect(result.baseRegistryInsertionAuthorized).toBe(false);
    expect(result.pageVerificationAuthorized).toBe(false);
    expect(result.passageScanCheckedPromotionAuthorized).toBe(false);
    expect(result.methodologyProductionPromotionAuthorized).toBe(false);
    expect(result.automaticCriterionStateAuthority).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalFormationAuthorized).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(Object.values(result.authorityBoundary).every((value) => value === false)).toBe(true);
  });

  it('rejects forged locator, registry, checksum, page, or downstream authority', async () => {
    const source = await extension72();
    const variants: readonly [FiveOfficerMouthDirectSourceCandidateExtensionFR72V1, RegExp][] = [
      [forged(source, { baseRegistry: { ...source.baseRegistry, baseRegistryMutated: true } }), /base registry authority widened/u],
      [forged(source, { candidate: { ...source.candidate, state: 'scan_checked' } }), /candidate identity/u],
      [forged(source, { candidate: { ...source.candidate, pageCount: 575 } }), /candidate identity/u],
      [forged(source, { candidate: { ...source.candidate, fileSizeBytes: 19310490 } }), /candidate identity/u],
      [forged(source, { candidate: { ...source.candidate, checksumSha1: 'forged' } }), /forged checksum authority/u],
      [forged(source, { metadataEvidence: { ...source.metadataEvidence, checksumSha1: 'forged' } }), /metadata evidence widened/u],
      [forged(source, { locatorState: { ...source.locatorState, exactScanPage: 42 } }), /locator or page-verification authority widened/u],
      [forged(source, { locatorState: { ...source.locatorState, visualEvidenceRefs: ['evidence.forged'] } }), /locator or page-verification authority widened/u],
      [forged(source, { locatorState: { ...source.locatorState, checkerRefs: ['checker.forged'] } }), /locator or page-verification authority widened/u],
      [forged(source, { baseRegistryInsertionAuthorized: true }), /authority widened/u],
      [forged(source, { pageVerificationAuthorized: true }), /authority widened/u],
      [forged(source, { passageScanCheckedPromotionAuthorized: true }), /authority widened/u],
      [forged(source, { automaticCriterionStateAuthority: true }), /authority widened/u],
      [forged(source, { claimsIssued: 1 }), /authority widened/u],
      [forged(source, { traditionalSemanticAuthority: true }), /authority widened/u],
      [forged(source, { authorityBoundary: { ...source.authorityBoundary, exactFileMetadataMeansPassageLocated: true } }), /fully fail-closed/u],
      [forged(source, { remainingBlockers: source.remainingBlockers.slice(1) }), /remaining blockers drift/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.slice(1) }), /prohibited shortcuts drift/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => validateFiveOfficerMouthDirectSourceCandidateExtensionFR72(candidate)).toThrow(pattern);
    }
  });

  it('fails closed when page verification is requested before locator evidence exists', async () => {
    const result = await extension72();
    expect(() => assertMouthDirectSourcePageVerificationAuthorizedFR72(result)).toThrow(/page verification is not authorized/u);
  });
});
