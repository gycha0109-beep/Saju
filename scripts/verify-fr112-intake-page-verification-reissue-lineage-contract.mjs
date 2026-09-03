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
import {
  reviewFiveOfficerIntakePageVerificationReissueLineageContractFR112,
  validateFiveOfficerIntakePageVerificationReissueLineageContractReviewFR112,
} from '../.face-reading-dist/five-officers-intake-page-verification-reissue-lineage-contract-review-fr112.js';

const DIGEST = `sha256:${'d'.repeat(64)}`;
const providerLandmarks = Array.from({ length: 478 }, (_, index) => Object.freeze({
  x: (index + 1) / 500,
  y: (478 - index) / 500,
  z: (index % 97) / 1000,
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
  providerRunRef: 'fr112:exact-verifier',
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
validateFiveOfficerIntakePageVerificationReissueLineageContractReviewFR112(fr112);

if (
  fr112.authorityState !== 'bounded_registry_level_reissue_lineage_contract_candidate_defined_core_extension_not_authorized' ||
  fr112.upstream.originalVerificationRef !== 'verification.shenxiang_nlc_1925.intake@0.1.0' ||
  fr112.upstream.proposedVerificationRef !== 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0' ||
  fr112.currentCoreContract.pageVerificationRecordHasInlineReissueLineage !== false ||
  fr112.currentCoreContract.registryHasVerificationRelationCollection !== false ||
  fr112.currentCoreContract.currentCoreCanRepresentNonIndependentReissue !== false ||
  fr112.lineageContractCandidate.kind !== 'non_independent_identity_reissue' ||
  fr112.lineageContractCandidate.parentVerificationRef !== 'verification.shenxiang_nlc_1925.intake@0.1.0' ||
  fr112.lineageContractCandidate.childVerificationRef !== 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0' ||
  fr112.lineageContractCandidate.parentRetained !== true ||
  fr112.lineageContractCandidate.evidenceReusePolicy !== 'exact_evidence_reuse_required' ||
  fr112.lineageContractCandidate.checkingEventPolicy !== 'same_checker_refs_same_checking_event' ||
  fr112.lineageContractCandidate.independentVerificationDelta !== 0 ||
  fr112.lineageContractCandidate.childMayCountAsIndependentVerification !== false ||
  fr112.contractReview.selectedPlacement !== 'registry_level_verification_relation_collection' ||
  fr112.contractReview.inlineRecordMutationSelected !== false ||
  fr112.contractReview.machineReadableLineageContractSufficientForNonIndependentIdentityReissue !== true ||
  fr112.contractReview.ephemeralLineageValidationPassed !== true ||
  fr112.contractReview.coreSchemaExtensionCandidateAdmittedForReview !== true ||
  fr112.contractReview.coreSchemaExtensionAuthorized !== false ||
  fr112.contractReview.verificationReissueAdmissionAuthorized !== false ||
  fr112.contractReview.verificationRecordPersistenceAuthorized !== false ||
  fr112.execution.verificationRelationsPersisted !== 0 ||
  fr112.execution.verificationRecordsReissued !== 0 ||
  fr112.execution.verificationRecordsPersisted !== 0 ||
  fr112.execution.passagesPersisted !== 0 ||
  fr112.execution.directSourceRegistrySchemaChanged !== false ||
  fr112.execution.methodologySourceRefsRewritten !== 0 ||
  fr112.execution.metricBindingsIssued !== 0 ||
  fr112.execution.thresholdsIssued !== 0 ||
  fr112.execution.criterionStatesIssued !== 0 ||
  fr112.execution.claimsIssued !== 0 ||
  fr112.execution.traditionalSemanticAuthority !== false ||
  fr112.recommendedNextFrontier !== 'direct_source_verification_reissue_lineage_contract_extension_admission_review'
) throw new Error('FR112 exact page-verification reissue lineage contract authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR112_INTAKE_PAGE_VERIFICATION_REISSUE_LINEAGE_CONTRACT_REVIEW_PASS',
  authorityState: fr112.authorityState,
  selectedPlacement: fr112.contractReview.selectedPlacement,
  parentVerificationRef: fr112.lineageContractCandidate.parentVerificationRef,
  childVerificationRef: fr112.lineageContractCandidate.childVerificationRef,
  independentVerificationDelta: fr112.lineageContractCandidate.independentVerificationDelta,
  ephemeralLineageValidationPassed: fr112.contractReview.ephemeralLineageValidationPassed,
  coreSchemaExtensionAuthorized: fr112.contractReview.coreSchemaExtensionAuthorized,
  verificationReissueAdmissionAuthorized: fr112.contractReview.verificationReissueAdmissionAuthorized,
  verificationRelationsPersisted: fr112.execution.verificationRelationsPersisted,
  verificationRecordsPersisted: fr112.execution.verificationRecordsPersisted,
  passagesPersisted: fr112.execution.passagesPersisted,
  methodologySourceRefsRewritten: fr112.execution.methodologySourceRefsRewritten,
  metricBindingsIssued: fr112.execution.metricBindingsIssued,
  thresholdsIssued: fr112.execution.thresholdsIssued,
  criterionStatesIssued: fr112.execution.criterionStatesIssued,
  claimsIssued: fr112.execution.claimsIssued,
  traditionalSemanticAuthority: fr112.execution.traditionalSemanticAuthority,
  nextFrontier: fr112.recommendedNextFrontier,
})}\n`);