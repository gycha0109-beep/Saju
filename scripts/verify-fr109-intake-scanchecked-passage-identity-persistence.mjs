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
import {
  reviewFiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceFR109,
  validateFiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109,
} from '../.face-reading-dist/five-officers-intake-scanchecked-passage-registry-identity-persistence-review-fr109.js';

const DIGEST = `sha256:${'4'.repeat(64)}`;
const providerLandmarks = Array.from({ length: 478 }, (_, index) => Object.freeze({
  x: (index + 1) / 500,
  y: (478 - index) / 500,
  z: (index % 53) / 1000,
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
  providerRunRef: 'fr109:exact-verifier',
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
validateFiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109(fr109);

const strategies = Object.fromEntries(fr109.strategyReviews.map((entry) => [entry.strategy, entry]));
if (
  fr109.authorityState !== 'witness_qualified_passage_identity_candidate_preferred_but_not_authorized' ||
  fr109.directSourceIdentityContract.verificationRecordPassageId !== 'passage.shenxiang.five_officers.intake' ||
  fr109.directSourceIdentityContract.verificationRecordAllowsImplicitPassageAlias !== false ||
  strategies.same_id_duplicate_append?.structurallyValidUnderCurrentFaceRegistry !== false ||
  strategies.same_id_historical_replacement?.structurallyValidUnderCurrentFaceRegistry !== true ||
  strategies.same_id_historical_replacement?.preservesHistoricalCtextPassageRecord !== false ||
  strategies.witness_qualified_new_passage_identity?.structurallyValidUnderCurrentFaceRegistry !== true ||
  strategies.witness_qualified_new_passage_identity?.preservesHistoricalCtextPassageRecord !== true ||
  strategies.witness_qualified_new_passage_identity?.requiresVerificationRecordPassageIdChange !== true ||
  strategies.witness_qualified_new_passage_identity?.requiresMethodologySourceRefRewrite !== true ||
  strategies.registry_overlay_schema_extension?.structurallyValidUnderCurrentFaceRegistry !== false ||
  strategies.registry_overlay_schema_extension?.requiresRegistryContractChange !== true ||
  fr109.decision.preferredStrategyCandidate !== 'witness_qualified_new_passage_identity' ||
  fr109.decision.proposedPassageRef !== 'passage.shenxiang.five_officers.intake.nlc_1925' ||
  fr109.decision.proposedWitnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
  fr109.decision.proposedVerificationStatus !== 'scan_checked' ||
  fr109.decision.proposedScanPage !== 88 ||
  fr109.decision.proposedPassageStructurallyValid !== true ||
  fr109.decision.historicalPassageRetained !== true ||
  fr109.decision.newPassageIdentityDefinitionAdmitted !== false ||
  fr109.decision.newVerificationRecordAuthorized !== false ||
  fr109.decision.methodologySourceRefRewriteAuthorized !== false ||
  fr109.decision.persistentRegistryMutationAuthorized !== false ||
  fr109.execution.passagesPersisted !== 0 ||
  fr109.execution.verificationRecordsReissued !== 0 ||
  fr109.execution.methodologyDefinitionsPersisted !== 0 ||
  fr109.execution.metricBindingsIssued !== 0 ||
  fr109.execution.thresholdsIssued !== 0 ||
  fr109.execution.criterionStatesIssued !== 0 ||
  fr109.execution.claimsIssued !== 0 ||
  fr109.execution.traditionalSemanticAuthority !== false
) throw new Error('FR109 exact passage identity-persistence authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR109_INTAKE_SCAN_CHECKED_PASSAGE_IDENTITY_PERSISTENCE_REVIEW_PASS',
  historicalPassageRef: fr109.upstream.historicalPassageRef,
  verificationRecordPassageId: fr109.directSourceIdentityContract.verificationRecordPassageId,
  strategyStructuralValidity: Object.fromEntries(fr109.strategyReviews.map((entry) => [entry.strategy, entry.structurallyValidUnderCurrentFaceRegistry])),
  preferredStrategyCandidate: fr109.decision.preferredStrategyCandidate,
  proposedPassageRef: fr109.decision.proposedPassageRef,
  proposedWitnessId: fr109.decision.proposedWitnessId,
  proposedVerificationStatus: fr109.decision.proposedVerificationStatus,
  proposedScanPage: fr109.decision.proposedScanPage,
  newPassageIdentityDefinitionAdmitted: fr109.decision.newPassageIdentityDefinitionAdmitted,
  newVerificationRecordAuthorized: fr109.decision.newVerificationRecordAuthorized,
  methodologySourceRefRewriteAuthorized: fr109.decision.methodologySourceRefRewriteAuthorized,
  persistentRegistryMutationAuthorized: fr109.decision.persistentRegistryMutationAuthorized,
  passagesPersisted: fr109.execution.passagesPersisted,
  metricBindingsIssued: fr109.execution.metricBindingsIssued,
  thresholdsIssued: fr109.execution.thresholdsIssued,
  criterionStatesIssued: fr109.execution.criterionStatesIssued,
  claimsIssued: fr109.execution.claimsIssued,
  traditionalSemanticAuthority: fr109.execution.traditionalSemanticAuthority,
  nextFrontier: fr109.recommendedNextFrontier,
})}\n`);