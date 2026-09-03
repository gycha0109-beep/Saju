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
import { reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePostLineageAdmissionFR115 } from '../.face-reading-dist/five-officers-intake-witness-qualified-page-verification-reissue-post-lineage-admission-review-fr115.js';
import { reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceFR116 } from '../.face-reading-dist/five-officers-intake-witness-qualified-page-verification-reissue-persistence-review-fr116.js';
import {
  FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY,
  FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE,
  FR117_NLC_WITNESS_QUALIFIED_PASSAGE,
  implementFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceFR117,
  validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117,
} from '../.face-reading-dist/five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-fr117.js';

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
  providerRunRef: 'fr117:exact-verifier',
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
const fr116 = reviewFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceFR116(fr115);
const fr117 = implementFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceFR117(fr116);
validateFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceImplementationFR117(fr117);

const historical = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.passages.find(
  (passage) => passage.passageId === 'passage.shenxiang.five_officers.intake',
);
const witnessQualified = FACE_AUTHORITY_FR117_WITNESS_QUALIFIED_RESEARCH_REGISTRY.passages.find(
  (passage) => passage.passageId === 'passage.shenxiang.five_officers.intake.nlc_1925',
);

if (
  fr117.authorityState !== 'witness_qualified_reissue_relation_record_and_face_passage_persisted_downstream_authority_still_closed' ||
  fr117.persistedState.governedDirectSourceRegistryId !== 'direct-source-verification.face.fr117_witness_qualified_reissue' ||
  fr117.persistedState.childVerificationPersisted !== true ||
  fr117.persistedState.relationPersisted !== true ||
  fr117.persistedState.witnessQualifiedPassagePersisted !== true ||
  fr117.persistedState.derivedFaceRegistryPersisted !== true ||
  fr117.persistedState.baseDirectSourceRegistryMutated !== false ||
  fr117.persistedState.historicalFacePassageReplaced !== false ||
  fr117.persistedState.independentVerificationDelta !== 0 ||
  fr117.persistedState.semanticIdentityEquivalenceAsserted !== false ||
  fr117.persistedState.methodologySourceRefsChanged !== false ||
  fr117.execution.directSourceRegistriesPersisted !== 1 ||
  fr117.execution.verificationRelationsPersisted !== 1 ||
  fr117.execution.verificationRecordsReissued !== 1 ||
  fr117.execution.verificationRecordsPersisted !== 1 ||
  fr117.execution.passagesPersisted !== 1 ||
  fr117.execution.faceRegistriesPersisted !== 1 ||
  fr117.execution.methodologySourceRefsRewritten !== 0 ||
  fr117.execution.metricBindingsIssued !== 0 ||
  fr117.execution.thresholdsIssued !== 0 ||
  fr117.execution.criterionStatesIssued !== 0 ||
  fr117.execution.claimsIssued !== 0 ||
  fr117.execution.traditionalSemanticAuthority !== false ||
  FACE_DIRECT_SOURCE_VERIFICATION_FR117_WITNESS_QUALIFIED_REISSUE.verificationRelations?.length !== 1 ||
  FR117_NLC_WITNESS_QUALIFIED_PASSAGE.verificationStatus !== 'scan_checked' ||
  historical?.witnessId !== 'witness.shenxiang_quanbian.ctext' ||
  witnessQualified?.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
  fr117.recommendedNextFrontier !== 'intake_criterion_methodology_source_rebind_post_persistence_review'
) throw new Error('FR117 exact witness-qualified reissue persistence authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR117_INTAKE_WITNESS_QUALIFIED_PAGE_VERIFICATION_REISSUE_PERSISTENCE_IMPLEMENTATION_PASS',
  authorityState: fr117.authorityState,
  governedDirectSourceRegistryId: fr117.persistedState.governedDirectSourceRegistryId,
  verificationRelationsPersisted: fr117.execution.verificationRelationsPersisted,
  verificationRecordsPersisted: fr117.execution.verificationRecordsPersisted,
  passagesPersisted: fr117.execution.passagesPersisted,
  faceRegistriesPersisted: fr117.execution.faceRegistriesPersisted,
  methodologySourceRefsRewritten: fr117.execution.methodologySourceRefsRewritten,
  traditionalSemanticAuthority: fr117.execution.traditionalSemanticAuthority,
  nextFrontier: fr117.recommendedNextFrontier,
})}\n`);
