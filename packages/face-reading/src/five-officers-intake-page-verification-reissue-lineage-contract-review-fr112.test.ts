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
import { reviewFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionFR110 } from './five-officers-intake-witness-qualified-passage-identity-definition-review-fr110.js';
import { reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionFR111 } from './five-officers-intake-witness-qualified-page-verification-reissue-admission-review-fr111.js';
import {
  reviewFiveOfficerIntakePageVerificationReissueLineageContractFR112,
  validateFiveOfficerIntakePageVerificationReissueLineageContractReviewFR112,
} from './five-officers-intake-page-verification-reissue-lineage-contract-review-fr112.js';

const DIGEST = `sha256:${'b'.repeat(64)}`;

function factory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  const result: MediaPipeFaceLandmarkerResultFR25V1 = {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 83) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
  return { async create() { return { detect: () => result, close() {} }; } };
}

async function artifact112() {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr112:test',
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
  const fr110 = reviewFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionFR110(fr109);
  const fr111 = reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionFR111(fr110);
  return reviewFiveOfficerIntakePageVerificationReissueLineageContractFR112(fr111);
}

describe('FR112 page-verification reissue lineage contract review', () => {
  it('defines a bounded registry-level non-independent reissue lineage candidate without extending core schema', async () => {
    const result = await artifact112();
    expect(validateFiveOfficerIntakePageVerificationReissueLineageContractReviewFR112(result)).toBe(result);
    expect(result.authorityState).toBe('bounded_registry_level_reissue_lineage_contract_candidate_defined_core_extension_not_authorized');
    expect(result.currentCoreContract.currentCoreCanRepresentNonIndependentReissue).toBe(false);
    expect(result.lineageContractCandidate).toMatchObject({
      kind: 'non_independent_identity_reissue',
      parentVerificationRef: 'verification.shenxiang_nlc_1925.intake@0.1.0',
      childVerificationRef: 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0',
      parentRetained: true,
      independentVerificationDelta: 0,
      childMayCountAsIndependentVerification: false,
    });
    expect(result.contractReview).toMatchObject({
      selectedPlacement: 'registry_level_verification_relation_collection',
      inlineRecordMutationSelected: false,
      machineReadableLineageContractSufficientForNonIndependentIdentityReissue: true,
      ephemeralLineageValidationPassed: true,
      coreSchemaExtensionCandidateAdmittedForReview: true,
      coreSchemaExtensionAuthorized: false,
      verificationReissueAdmissionAuthorized: false,
      verificationRecordPersistenceAuthorized: false,
    });
  });

  it('keeps all persistence, methodology, metric, threshold, criterion, claim, and semantic authority at zero', async () => {
    const result = await artifact112();
    expect(result.execution).toMatchObject({
      verificationRelationsPersisted: 0,
      verificationRecordsReissued: 0,
      verificationRecordsPersisted: 0,
      passagesPersisted: 0,
      directSourceRegistrySchemaChanged: false,
      faceRegistryChanged: false,
      methodologySourceRefsRewritten: 0,
      methodologyDefinitionsPersisted: 0,
      methodologyExecutionIssued: false,
      methodologyProductionPromotionAuthorized: false,
      metricBindingsIssued: 0,
      thresholdsIssued: 0,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalFormationAuthorized: false,
      traditionalSemanticAuthority: false,
    });
    expect(result.recommendedNextFrontier).toBe('direct_source_verification_reissue_lineage_contract_extension_admission_review');
  });
});
