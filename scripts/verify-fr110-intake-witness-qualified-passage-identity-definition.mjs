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
import {
  reviewFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionFR110,
  validateFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110,
} from '../.face-reading-dist/five-officers-intake-witness-qualified-passage-identity-definition-review-fr110.js';

const DIGEST = `sha256:${'7'.repeat(64)}`;
const providerLandmarks = Array.from({ length: 478 }, (_, index) => Object.freeze({
  x: (index + 1) / 500,
  y: (478 - index) / 500,
  z: (index % 67) / 1000,
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
  providerRunRef: 'fr110:exact-verifier',
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
validateFiveOfficerIntakeWitnessQualifiedPassageIdentityDefinitionReviewFR110(fr110);

if (
  fr110.authorityState !== 'witness_qualified_passage_identity_research_candidate_defined_reissue_not_authorized' ||
  fr110.identityCandidate.identityRef !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  fr110.identityCandidate.identityKind !== 'witness_qualified_registry_record' ||
  fr110.identityCandidate.historicalPassageRef !== 'passage.shenxiang.five_officers.intake' ||
  fr110.identityCandidate.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
  fr110.identityCandidate.scanPage !== 88 ||
  fr110.identityCandidate.verificationStatus !== 'scan_checked' ||
  fr110.identityCandidate.identityRelationship !== 'exact_text_match_distinct_witness_record' ||
  fr110.identityCandidate.historicalPassageSemanticEquivalenceAsserted !== false ||
  fr110.identityCandidate.historicalPassageReplaced !== false ||
  fr110.identityDefinitionReview.researchIdentityCandidatesIssued !== 1 ||
  fr110.identityDefinitionReview.identityDefinitionResearchCandidateAdmitted !== true ||
  fr110.identityDefinitionReview.identityDefinitionPersistenceAuthorized !== false ||
  fr110.verificationReissueProbe.proposedVerificationId !== 'verification.shenxiang_nlc_1925.intake.witness_qualified' ||
  fr110.verificationReissueProbe.proposedPassageId !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  fr110.verificationReissueProbe.originalFr104PassageIdRetained !== 'passage.shenxiang.five_officers.intake' ||
  fr110.verificationReissueProbe.originalFr104VerificationRetained !== true ||
  fr110.verificationReissueProbe.sameCandidateMayCarryDistinctPassageIdsStructurally !== true ||
  fr110.verificationReissueProbe.directSourceRegistryStructuralValidationPassed !== true ||
  fr110.verificationReissueProbe.faceRegistryStructuralAppendPassed !== true ||
  fr110.verificationReissueProbe.verificationRecordReissueAuthorized !== false ||
  fr110.verificationReissueProbe.materializedProbePersistenceAuthorized !== false ||
  fr110.execution.verificationRecordsPersisted !== 0 ||
  fr110.execution.passagesPersisted !== 0 ||
  fr110.execution.methodologySourceRefsRewritten !== 0 ||
  fr110.execution.methodologyDefinitionsPersisted !== 0 ||
  fr110.execution.metricBindingsIssued !== 0 ||
  fr110.execution.thresholdsIssued !== 0 ||
  fr110.execution.criterionStatesIssued !== 0 ||
  fr110.execution.claimsIssued !== 0 ||
  fr110.execution.traditionalSemanticAuthority !== false
) throw new Error('FR110 exact witness-qualified passage identity-definition authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR110_INTAKE_WITNESS_QUALIFIED_PASSAGE_IDENTITY_DEFINITION_REVIEW_PASS',
  identityRef: fr110.identityCandidate.identityRef,
  identityKind: fr110.identityCandidate.identityKind,
  historicalPassageRef: fr110.identityCandidate.historicalPassageRef,
  witnessId: fr110.identityCandidate.witnessId,
  scanPage: fr110.identityCandidate.scanPage,
  identityRelationship: fr110.identityCandidate.identityRelationship,
  researchIdentityCandidatesIssued: fr110.identityDefinitionReview.researchIdentityCandidatesIssued,
  identityDefinitionResearchCandidateAdmitted: fr110.identityDefinitionReview.identityDefinitionResearchCandidateAdmitted,
  identityDefinitionPersistenceAuthorized: fr110.identityDefinitionReview.identityDefinitionPersistenceAuthorized,
  proposedVerificationId: fr110.verificationReissueProbe.proposedVerificationId,
  sameCandidateMayCarryDistinctPassageIdsStructurally: fr110.verificationReissueProbe.sameCandidateMayCarryDistinctPassageIdsStructurally,
  directSourceRegistryStructuralValidationPassed: fr110.verificationReissueProbe.directSourceRegistryStructuralValidationPassed,
  faceRegistryStructuralAppendPassed: fr110.verificationReissueProbe.faceRegistryStructuralAppendPassed,
  verificationRecordReissueAuthorized: fr110.verificationReissueProbe.verificationRecordReissueAuthorized,
  verificationRecordsPersisted: fr110.execution.verificationRecordsPersisted,
  passagesPersisted: fr110.execution.passagesPersisted,
  methodologySourceRefsRewritten: fr110.execution.methodologySourceRefsRewritten,
  metricBindingsIssued: fr110.execution.metricBindingsIssued,
  thresholdsIssued: fr110.execution.thresholdsIssued,
  criterionStatesIssued: fr110.execution.criterionStatesIssued,
  claimsIssued: fr110.execution.claimsIssued,
  traditionalSemanticAuthority: fr110.execution.traditionalSemanticAuthority,
  nextFrontier: fr110.recommendedNextFrontier,
})}\n`);