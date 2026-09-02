import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { admitFiveOfficerMouthCriterionAuthorityGapFR70 } from './five-officers-mouth-criterion-authority-gap-fr70.js';
import {
  admitFiveOfficerMouthSourceWitnessReadinessFR71,
  assertMouthPassageScanCheckedAuthorizedFR71,
  validateFiveOfficerMouthSourceWitnessReadinessFR71,
  type FiveOfficerMouthSourceWitnessReadinessFR71V1,
} from './five-officers-mouth-source-witness-readiness-fr71.js';

const DIGEST = `sha256:${'8'.repeat(64)}`;

function request() {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr71:mouth-source-witness-readiness',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 13) / 1000,
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

async function readiness71(): Promise<FiveOfficerMouthSourceWitnessReadinessFR71V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr70 = admitFiveOfficerMouthCriterionAuthorityGapFR70(fr69);
  return admitFiveOfficerMouthSourceWitnessReadinessFR71(fr70);
}

function forged(
  source: FiveOfficerMouthSourceWitnessReadinessFR71V1,
  patch: Record<string, unknown>,
): FiveOfficerMouthSourceWitnessReadinessFR71V1 {
  return { ...source, ...patch } as unknown as FiveOfficerMouthSourceWitnessReadinessFR71V1;
}

describe('FR71 Five Officers mouth source-witness readiness', () => {
  it('separates the candidate ctext passage from the verified NLC work witness', async () => {
    const result = await readiness71();

    expect(result.electronicPassage).toEqual({
      passageId: 'passage.shenxiang.five_officers.intake',
      workId: 'work.shenxiang_quanbian',
      witnessId: 'witness.shenxiang_quanbian.ctext',
      witnessStatus: 'candidate',
      chapter: '出納官',
      originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。',
      verificationStatus: 'unverified_ocr',
    });
    expect(result.verifiedScanWitness).toEqual({
      witnessId: 'witness.shenxiang_quanbian.nlc_1925',
      workId: 'work.shenxiang_quanbian',
      editionLabel: '文明書局 民國十四年本 — NLC scan',
      publicationYear: 1925,
      holdingInstitution: 'National Library of China',
      digitalSourceUrl: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf',
      witnessStatus: 'verified',
    });
    expect(result.authorityBoundary.verifiedWorkWitnessMeansPassageScanChecked).toBe(false);
  });

  it('records the exact direct-source evidence still missing for the intake passage', async () => {
    const result = await readiness71();

    expect(result.directVerification).toEqual({
      registryId: 'direct-source-verification.face.research_v0',
      registryVersion: '0.1.0',
      intakeTargetCandidateCount: 0,
      intakePageVerificationCount: 0,
      verifiedNlcWitnessRegisteredAsIntakeCandidate: false,
      scanPage: null,
      visualEvidenceRefs: [],
      checkerRefs: [],
      pageVerificationState: null,
    });
    expect(result.remainingBlockers).toContain('intake_scan_page_not_recorded');
    expect(result.remainingBlockers).toContain('intake_visual_evidence_refs_absent');
    expect(result.remainingBlockers).toContain('intake_checker_refs_absent');
  });

  it('does not let corroboration or source availability promote the direct passage', async () => {
    const result = await readiness71();

    expect(result.corroboration).toEqual({ intakeEntryCount: 0, mayPromoteDirectSource: false });
    expect(result.passageScanCheckedPromotionAuthorized).toBe(false);
    expect(result.authorityBoundary.scanUrlMeansPassageLocated).toBe(false);
    expect(result.authorityBoundary.chapterLabelMeansScanPage).toBe(false);
    expect(result.authorityBoundary.ctextTranscriptionMeansVisualVerification).toBe(false);
    expect(result.authorityBoundary.corroborationMeansDirectVerification).toBe(false);
  });

  it('preserves FR70 and methodology fail-close authority downstream', async () => {
    const result = await readiness71();

    expect(result.upstream).toEqual({
      fr70SchemaVersion: 'fr70-five-officers-mouth-criterion-authority-gap-v1',
      fr70AuthorityState: 'research_source_and_static_candidate_authority_only',
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalFormationAuthorized: false,
      traditionalSemanticAuthority: false,
    });
    expect(result.methodology).toEqual({
      methodologyRef: 'method.shenxiang.five_officers@0.1.0',
      reviewStatus: 'research',
      productionPromotionAuthorized: false,
    });
    expect(result.automaticCriterionStateAuthority).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalFormationAuthorized).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(Object.values(result.authorityBoundary).every((value) => value === false)).toBe(true);
  });

  it('rejects forged passage binding, scan-check, methodology, or downstream authority', async () => {
    const source = await readiness71();
    const variants: readonly [FiveOfficerMouthSourceWitnessReadinessFR71V1, RegExp][] = [
      [forged(source, {
        electronicPassage: { ...source.electronicPassage, verificationStatus: 'scan_checked' },
      }), /electronic passage authority widened/u],
      [forged(source, {
        directVerification: { ...source.directVerification, intakeTargetCandidateCount: 1 },
      }), /direct passage verification authority widened/u],
      [forged(source, {
        directVerification: { ...source.directVerification, scanPage: 42 },
      }), /direct passage verification authority widened/u],
      [forged(source, {
        directVerification: { ...source.directVerification, visualEvidenceRefs: ['evidence.forged'] },
      }), /direct passage verification authority widened/u],
      [forged(source, {
        directVerification: { ...source.directVerification, checkerRefs: ['checker.forged'] },
      }), /direct passage verification authority widened/u],
      [forged(source, { passageScanCheckedPromotionAuthorized: true }), /authority widened/u],
      [forged(source, {
        methodology: { ...source.methodology, reviewStatus: 'production_authorized' },
      }), /methodology authority widened/u],
      [forged(source, { automaticCriterionStateAuthority: true }), /authority widened/u],
      [forged(source, { criterionStatesIssued: 1 }), /authority widened/u],
      [forged(source, { traditionalSemanticAuthority: true }), /authority widened/u],
      [forged(source, {
        authorityBoundary: { ...source.authorityBoundary, verifiedWorkWitnessMeansPassageScanChecked: true },
      }), /fully fail-closed/u],
      [forged(source, { remainingBlockers: source.remainingBlockers.slice(1) }), /remaining blockers drift/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.slice(1) }), /prohibited shortcuts drift/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => validateFiveOfficerMouthSourceWitnessReadinessFR71(candidate)).toThrow(pattern);
    }
  });

  it('fails closed when scan_checked promotion is requested without a page verification record', async () => {
    const result = await readiness71();
    expect(() => assertMouthPassageScanCheckedAuthorizedFR71(result)).toThrow(/scan_checked promotion is not authorized/u);
  });
});
