import process from 'node:process';

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitFiveOfficerMouthCriterionAuthorityGapFR70 } from '../.face-reading-dist/five-officers-mouth-criterion-authority-gap-fr70.js';
import { admitFiveOfficerMouthSourceWitnessReadinessFR71 } from '../.face-reading-dist/five-officers-mouth-source-witness-readiness-fr71.js';
import { admitFiveOfficerMouthDirectSourceCandidateExtensionFR72 } from '../.face-reading-dist/five-officers-mouth-direct-source-candidate-extension-fr72.js';
import { admitFiveOfficerMouthIndexedSectionAnchorFR73 } from '../.face-reading-dist/five-officers-mouth-indexed-section-anchor-fr73.js';
import { assessFiveOfficerMouthScanImageAcquisitionReadinessFR74 } from '../.face-reading-dist/five-officers-mouth-scan-image-acquisition-readiness-fr74.js';
import { admitFiveOfficerMouthScanEvidenceAcquisitionFR103 } from '../.face-reading-dist/five-officers-mouth-scan-evidence-acquisition-fr103.js';
import { admitFiveOfficerMouthDirectSourcePageVerificationFR104 } from '../.face-reading-dist/five-officers-mouth-direct-source-page-verification-fr104.js';
import { reviewFiveOfficerMethodologySourceRebindFR105 } from '../.face-reading-dist/five-officers-methodology-source-rebind-review-fr105.js';
import { reviewFiveOfficerIntakeCriterionSourceScopeFR106 } from '../.face-reading-dist/five-officers-intake-criterion-source-scope-review-fr106.js';
import { reviewFiveOfficerIntakeCriterionMethodologyDefinitionFR107 } from '../.face-reading-dist/five-officers-intake-criterion-methodology-definition-review-fr107.js';
import { reviewFiveOfficerIntakeCriterionMethodologyRegistryAdmissionFR108 } from '../.face-reading-dist/five-officers-intake-criterion-methodology-registry-admission-review-fr108.js';
import { reviewFiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceFR109 } from '../.face-reading-dist/five-officers-intake-scanchecked-passage-registry-identity-persistence-review-fr109.js';
import { reviewFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionFR110 } from '../.face-reading-dist/five-officers-intake-witness-qualified-passage-identity-definition-review-fr110.js';
import {
  reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionFR111,
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111,
} from '../.face-reading-dist/five-officers-intake-witness-qualified-page-verification-reissue-admission-review-fr111.js';

const DIGEST = `sha256:${'a'.repeat(64)}`;
const providerLandmarks = Array.from({ length: 478 }, (_, index) => Object.freeze({
  x: (index + 1) / 500,
  y: (478 - index) / 500,
  z: (index % 79) / 1000,
  visibility: 0.99,
}));
const runtimeFactory = {
  async create() {
    return {
      detect() {
        return { faceLandmarks: [providerLandmarks], faceBlendshapes: [], facialTransformationMatrixes: [] };
      },
      close() {},
    };
  },
};

const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr111:exact-verifier',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
}, runtimeFactory);
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
validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionReviewFR111(fr111);

if (
  fr111.authorityState !== 'witness_qualified_page_verification_reissue_blocked_missing_machine_readable_lineage_contract' ||
  fr111.upstream.identityRef !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  fr111.originalVerification.verificationId !== 'verification.shenxiang_nlc_1925.intake' ||
  fr111.originalVerification.passageId !== 'passage.shenxiang.five_officers.intake' ||
  fr111.originalVerification.retainedUnchanged !== true ||
  fr111.proposedReissue.verificationId !== 'verification.shenxiang_nlc_1925.intake.witness_qualified' ||
  fr111.proposedReissue.passageId !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  fr111.proposedReissue.differsFromOriginalOnlyByVerificationAndPassageIdentity !== true ||
  fr111.proposedReissue.sameOriginalText !== true ||
  fr111.proposedReissue.sameVisualEvidenceRefs !== true ||
  fr111.proposedReissue.sameCheckerRefs !== true ||
  fr111.proposedReissue.sameVerificationState !== true ||
  fr111.proposedReissue.additionalVisualEvidenceRefsIssued !== 0 ||
  fr111.proposedReissue.additionalCheckerRefsIssued !== 0 ||
  fr111.proposedReissue.structuralRegistryValidationPassed !== true ||
  fr111.lineageContractReview.directSourcePageVerificationRecordHasReissueLineageField !== false ||
  fr111.lineageContractReview.directSourceRegistryHasVerificationRelationCollection !== false ||
  fr111.lineageContractReview.machineReadableReissueLineageAvailable !== false ||
  fr111.lineageContractReview.duplicateEvidenceCouldAppearAsIndependentVerificationRecord !== true ||
  fr111.lineageContractReview.independentVerificationCountMayIncreaseFromReissue !== false ||
  fr111.lineageContractReview.verificationReissueAdmissionAuthorized !== false ||
  fr111.lineageContractReview.verificationRecordPersistenceAuthorized !== false ||
  fr111.execution.verificationRecordsReissued !== 0 ||
  fr111.execution.verificationRecordsPersisted !== 0 ||
  fr111.execution.passagesPersisted !== 0 ||
  fr111.execution.directSourceRegistrySchemaChanged !== false ||
  fr111.execution.faceRegistryChanged !== false ||
  fr111.execution.methodologySourceRefsRewritten !== 0 ||
  fr111.execution.metricBindingsIssued !== 0 ||
  fr111.execution.thresholdsIssued !== 0 ||
  fr111.execution.criterionStatesIssued !== 0 ||
  fr111.execution.claimsIssued !== 0 ||
  fr111.execution.traditionalSemanticAuthority !== false ||
  fr111.recommendedNextFrontier !== 'intake_page_verification_reissue_lineage_contract_review'
) throw new Error('FR111 exact witness-qualified page-verification reissue-admission authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR111_INTAKE_WITNESS_QUALIFIED_PAGE_VERIFICATION_REISSUE_ADMISSION_REVIEW_PASS',
  authorityState: fr111.authorityState,
  identityRef: fr111.upstream.identityRef,
  originalVerificationId: fr111.originalVerification.verificationId,
  originalPassageId: fr111.originalVerification.passageId,
  proposedVerificationId: fr111.proposedReissue.verificationId,
  proposedPassageId: fr111.proposedReissue.passageId,
  structuralRegistryValidationPassed: fr111.proposedReissue.structuralRegistryValidationPassed,
  machineReadableReissueLineageAvailable: fr111.lineageContractReview.machineReadableReissueLineageAvailable,
  verificationReissueAdmissionAuthorized: fr111.lineageContractReview.verificationReissueAdmissionAuthorized,
  verificationRecordsPersisted: fr111.execution.verificationRecordsPersisted,
  passagesPersisted: fr111.execution.passagesPersisted,
  methodologySourceRefsRewritten: fr111.execution.methodologySourceRefsRewritten,
  metricBindingsIssued: fr111.execution.metricBindingsIssued,
  thresholdsIssued: fr111.execution.thresholdsIssued,
  criterionStatesIssued: fr111.execution.criterionStatesIssued,
  claimsIssued: fr111.execution.claimsIssued,
  traditionalSemanticAuthority: fr111.execution.traditionalSemanticAuthority,
  nextFrontier: fr111.recommendedNextFrontier,
})}\n`);