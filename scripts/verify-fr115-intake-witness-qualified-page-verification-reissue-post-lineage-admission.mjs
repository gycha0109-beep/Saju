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
import { reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissueAdmissionFR111 } from '../.face-reading-dist/five-officers-intake-witness-qualified-page-verification-reissue-admission-review-fr111.js';
import { reviewFiveOfficerIntakePageVerificationReissueLineageContractFR112 } from '../.face-reading-dist/five-officers-intake-page-verification-reissue-lineage-contract-review-fr112.js';
import { reviewDirectSourceVerificationReissueLineageExtensionAdmissionFR113 } from '../.face-reading-dist/direct-source-verification-reissue-lineage-extension-admission-review-fr113.js';
import { implementDirectSourceVerificationReissueLineageExtensionFR114 } from '../.face-reading-dist/direct-source-verification-reissue-lineage-extension-implementation-fr114.js';
import {
  reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionFR115,
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115,
} from '../.face-reading-dist/five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-fr115.js';

const DIGEST = `sha256:${'f'.repeat(64)}`;
const providerLandmarks = Array.from({ length: 478 }, (_, index) => Object.freeze({
  x: (index + 1) / 500,
  y: (478 - index) / 500,
  z: (index % 103) / 1000,
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
  providerRunRef: 'fr115:exact-verifier',
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
const fr112 = reviewFiveOfficerIntakePageVerificationReissueLineageContractFR112(fr111);
const fr113 = reviewDirectSourceVerificationReissueLineageExtensionAdmissionFR113(fr112);
const fr114 = implementDirectSourceVerificationReissueLineageExtensionFR114(fr113);
const fr115 = reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionFR115(fr114);
validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionReviewFR115(fr115);

if (
  fr115.authorityState !== 'witness_qualified_page_verification_reissue_admitted_core_lineage_available_persistence_not_executed' ||
  fr115.admissionReview.priorMissingLineageBlockerResolved !== true ||
  fr115.admissionReview.machineReadableCoreRelationAvailable !== true ||
  fr115.admissionReview.targetEphemeralRegistryValidationPassed !== true ||
  fr115.admissionReview.verificationReissueAdmissionAuthorized !== true ||
  fr115.admissionReview.persistenceReviewAuthorized !== true ||
  fr115.admissionReview.targetRelationPersistenceAuthorized !== false ||
  fr115.admissionReview.targetVerificationRecordPersistenceAuthorized !== false ||
  fr115.admissionReview.targetPassagePersistenceAuthorized !== false ||
  fr115.admissionReview.independentVerificationDelta !== 0 ||
  fr115.admissionReview.childMayCountAsIndependentVerification !== false ||
  fr115.admissionReview.semanticIdentityEquivalenceAsserted !== false ||
  fr115.execution.verificationRelationsPersisted !== 0 ||
  fr115.execution.verificationRecordsReissued !== 0 ||
  fr115.execution.verificationRecordsPersisted !== 0 ||
  fr115.execution.passagesPersisted !== 0 ||
  fr115.execution.methodologySourceRefsRewritten !== 0 ||
  fr115.execution.metricBindingsIssued !== 0 ||
  fr115.execution.thresholdsIssued !== 0 ||
  fr115.execution.criterionStatesIssued !== 0 ||
  fr115.execution.claimsIssued !== 0 ||
  fr115.execution.traditionalSemanticAuthority !== false ||
  fr115.recommendedNextFrontier !== 'intake_witness_qualified_page_verification_reissue_persistence_review'
) throw new Error('FR115 exact post-lineage reissue admission authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR115_INTAKE_WITNESS_QUALIFIED_PAGE_VERIFICATION_REISSUE_POST_LINEAGE_ADMISSION_PASS',
  authorityState: fr115.authorityState,
  priorMissingLineageBlockerResolved: fr115.admissionReview.priorMissingLineageBlockerResolved,
  targetEphemeralRegistryValidationPassed: fr115.admissionReview.targetEphemeralRegistryValidationPassed,
  verificationReissueAdmissionAuthorized: fr115.admissionReview.verificationReissueAdmissionAuthorized,
  verificationRelationsPersisted: fr115.execution.verificationRelationsPersisted,
  verificationRecordsPersisted: fr115.execution.verificationRecordsPersisted,
  passagesPersisted: fr115.execution.passagesPersisted,
  traditionalSemanticAuthority: fr115.execution.traditionalSemanticAuthority,
  nextFrontier: fr115.recommendedNextFrontier,
})}\n`);
