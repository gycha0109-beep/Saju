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
import { reviewFiveOfficerMethodologySourceRebindFR105 } from './five-officers-methodology-source-rebind-review-fr105.js';
import { reviewFiveOfficerIntakeCriterionSourceScopeFR106 } from './five-officers-intake-criterion-source-scope-review-fr106.js';
import { reviewFiveOfficerIntakeCriterionMethodologyDefinitionFR107 } from './five-officers-intake-criterion-methodology-definition-review-fr107.js';
import { reviewFiveOfficerIntakeCriterionMethodologyRegistryAdmissionFR108 } from './five-officers-intake-criterion-methodology-registry-admission-review-fr108.js';
import { reviewFiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceFR109 } from './five-officers-intake-scanchecked-passage-registry-identity-persistence-review-fr109.js';
import {
  reviewFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionFR110,
  validateFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110,
} from './five-officers-intake-witness-qualified-passage-identity-definition-review-fr110.js';

const DIGEST = `sha256:${'5'.repeat(64)}`;

function factory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  const result: MediaPipeFaceLandmarkerResultFR25V1 = {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 59) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
  return { async create() { return { detect: () => result, close() {} }; } };
}

async function artifact110() {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr110:identity-definition',
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
  const fr105 = reviewFiveOfficerMethodologySourceRebindFR105(fr104);
  const fr106 = reviewFiveOfficerIntakeCriterionSourceScopeFR106(fr105);
  const fr107 = reviewFiveOfficerIntakeCriterionMethodologyDefinitionFR107(fr106);
  const fr108 = reviewFiveOfficerIntakeCriterionMethodologyRegistryAdmissionFR108(fr107);
  const fr109 = reviewFiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceFR109(fr108);
  return reviewFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionFR110(fr109);
}

describe('FR110 witness-qualified intake passage identity definition review', () => {
  it('defines one witness-qualified research identity candidate without replacing the historical passage', async () => {
    const result = await artifact110();
    expect(result.identityCandidate).toMatchObject({
      identityRef: 'passage.shenxiang.five_officers.intake.nlc_1925',
      identityKind: 'witness_qualified_registry_record',
      historicalPassageRef: 'passage.shenxiang.five_officers.intake',
      witnessId: 'witness.shenxiang_quanbian.nlc_1925',
      scanPage: 88,
      verificationStatus: 'scan_checked',
      identityRelationship: 'exact_text_match_distinct_witness_record',
      historicalPassageSemanticEquivalenceAsserted: false,
      historicalPassageReplaced: false,
      candidateReviewState: 'research_candidate',
    });
    expect(result.identityDefinitionReview.researchIdentityCandidatesIssued).toBe(1);
    expect(result.identityDefinitionReview.identityDefinitionResearchCandidateAdmitted).toBe(true);
    expect(result.identityDefinitionReview.identityDefinitionPersistenceAuthorized).toBe(false);
  });

  it('proves a non-destructive witness-qualified verification reissue is structurally valid', async () => {
    const result = await artifact110();
    expect(result.verificationReissueProbe).toMatchObject({
      proposedVerificationId: 'verification.shenxiang_nlc_1925.intake.witness_qualified',
      candidateRef: 'candidate.shenxiang_nlc_1925.intake@0.2.0',
      proposedPassageId: 'passage.shenxiang.five_officers.intake.nlc_1925',
      originalFr104PassageIdRetained: 'passage.shenxiang.five_officers.intake',
      originalFr104VerificationRetained: true,
      sameCandidateMayCarryDistinctPassageIdsStructurally: true,
      directSourceRegistryStructuralValidationPassed: true,
      materializedProbePassageId: 'passage.shenxiang.five_officers.intake.nlc_1925',
      materializedProbeVerificationStatus: 'scan_checked',
      faceRegistryStructuralAppendPassed: true,
    });
  });

  it('withholds verification reissue and persistence authority despite structural success', async () => {
    const result = await artifact110();
    expect(result.verificationReissueProbe.verificationRecordReissueAuthorized).toBe(false);
    expect(result.verificationReissueProbe.materializedProbePersistenceAuthorized).toBe(false);
    expect(result.execution.verificationRecordsPersisted).toBe(0);
    expect(result.execution.passagesPersisted).toBe(0);
    expect(result.execution.methodologySourceRefsRewritten).toBe(0);
    expect(result.execution.methodologyDefinitionsPersisted).toBe(0);
  });

  it('issues no execution, metric, threshold, criterion, claim, or traditional authority', async () => {
    const result = await artifact110();
    expect(result.execution.methodologyExecutionIssued).toBe(false);
    expect(result.execution.metricBindingsIssued).toBe(0);
    expect(result.execution.thresholdsIssued).toBe(0);
    expect(result.execution.criterionStatesIssued).toBe(0);
    expect(result.execution.claimsIssued).toBe(0);
    expect(result.execution.traditionalSemanticAuthority).toBe(false);
    expect(result.recommendedNextFrontier).toBe('intake_witness_qualified_page_verification_reissue_admission_review');
    expect(validateFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110(result)).toBe(result);
  });
});
