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
import {
  reviewFiveOfficerIntakeCriterionMethodologyRegistryAdmissionFR108,
  validateFiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108,
} from '../.face-reading-dist/five-officers-intake-criterion-methodology-registry-admission-review-fr108.js';

const DIGEST = `sha256:${'1'.repeat(64)}`;
const providerLandmarks = Array.from({ length: 478 }, (_, index) => Object.freeze({
  x: (index + 1) / 500,
  y: (478 - index) / 500,
  z: (index % 41) / 1000,
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
  providerRunRef: 'fr108:exact-verifier',
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
validateFiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108(fr108);

if (
  fr108.upstream.candidateMethodologyRef !== 'method.shenxiang.five_officers.intake_criteria@0.1.0' ||
  fr108.upstream.candidateReviewStatus !== 'research' ||
  fr108.faceRegistrySnapshot.nlcWitnessRegistered !== true ||
  fr108.faceRegistrySnapshot.nlcWitnessStatus !== 'verified' ||
  fr108.faceRegistrySnapshot.intakePassageWitnessId !== 'witness.shenxiang_quanbian.ctext' ||
  fr108.faceRegistrySnapshot.intakePassageVerificationStatus !== 'unverified_ocr' ||
  fr108.faceRegistrySnapshot.intakePassageUsesNlcWitness !== false ||
  fr108.faceRegistrySnapshot.sourceAuthorityOverlayCollectionSupportedByContract !== false ||
  fr108.admissionReview.structuralResearchRegistryAppendValid !== true ||
  fr108.admissionReview.candidateSourceRefResolvesToHistoricalCtextPassage !== true ||
  fr108.admissionReview.governedScanCheckedAuthorityPresentUpstream !== true ||
  fr108.admissionReview.governedScanCheckedAuthorityPersistedInFaceRegistry !== false ||
  fr108.admissionReview.scanCheckedWitnessAuthoritySurvivesCandidateSourceRefResolution !== false ||
  fr108.admissionReview.provenancePreservingRegistryAdmissionValid !== false ||
  fr108.admissionReview.registryAdmissionAuthorized !== false ||
  fr108.admissionReview.candidatePersisted !== false ||
  fr108.admissionReview.methodologyDefinitionsPersisted !== 0 ||
  fr108.passageIdentityConstraint.explicitPersistenceDesignReviewRequired !== true ||
  fr108.execution.methodologyExecutionIssued !== false ||
  fr108.execution.metricBindingsIssued !== 0 ||
  fr108.execution.thresholdsIssued !== 0 ||
  fr108.execution.criterionStatesIssued !== 0 ||
  fr108.execution.claimsIssued !== 0 ||
  fr108.execution.traditionalSemanticAuthority !== false
) throw new Error('FR108 exact registry-admission authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR108_INTAKE_METHODOLOGY_REGISTRY_ADMISSION_REVIEW_PASS',
  candidateMethodologyRef: fr108.upstream.candidateMethodologyRef,
  structuralResearchRegistryAppendValid: fr108.admissionReview.structuralResearchRegistryAppendValid,
  nlcWitnessRegistered: fr108.faceRegistrySnapshot.nlcWitnessRegistered,
  nlcWitnessStatus: fr108.faceRegistrySnapshot.nlcWitnessStatus,
  registeredIntakePassageWitness: fr108.faceRegistrySnapshot.intakePassageWitnessId,
  registeredIntakePassageVerificationStatus: fr108.faceRegistrySnapshot.intakePassageVerificationStatus,
  sourceAuthorityOverlayCollectionSupportedByContract: fr108.faceRegistrySnapshot.sourceAuthorityOverlayCollectionSupportedByContract,
  governedScanCheckedAuthorityPresentUpstream: fr108.admissionReview.governedScanCheckedAuthorityPresentUpstream,
  governedScanCheckedAuthorityPersistedInFaceRegistry: fr108.admissionReview.governedScanCheckedAuthorityPersistedInFaceRegistry,
  provenancePreservingRegistryAdmissionValid: fr108.admissionReview.provenancePreservingRegistryAdmissionValid,
  registryAdmissionAuthorized: fr108.admissionReview.registryAdmissionAuthorized,
  methodologyDefinitionsPersisted: fr108.admissionReview.methodologyDefinitionsPersisted,
  metricBindingsIssued: fr108.execution.metricBindingsIssued,
  thresholdsIssued: fr108.execution.thresholdsIssued,
  criterionStatesIssued: fr108.execution.criterionStatesIssued,
  claimsIssued: fr108.execution.claimsIssued,
  traditionalSemanticAuthority: fr108.execution.traditionalSemanticAuthority,
  nextFrontier: fr108.recommendedNextFrontier,
})}\n`);