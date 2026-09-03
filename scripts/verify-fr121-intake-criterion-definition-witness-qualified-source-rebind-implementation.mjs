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
import { implementFiveOfficerIntakeWitnessQualifiedPageVerificationReissuePersistenceFR117 } from '../.face-reading-dist/five-officers-intake-witness-qualified-page-verification-reissue-persistence-implementation-fr117.js';
import { reviewFiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceFR118 } from '../.face-reading-dist/five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-fr118.js';
import { implementFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionFR119 } from '../.face-reading-dist/five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { reviewFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindFR120 } from '../.face-reading-dist/five-officers-intake-criterion-definition-witness-qualified-source-rebind-review-fr120.js';
import {
  FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED,
  implementFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindFR121,
  validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121,
} from '../.face-reading-dist/five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.js';
import { FIVE_OFFICER_CRITERIA_V0 } from '../.face-reading-dist/five-officers-six-fus-research-v0.js';

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
  providerRunRef: 'fr121:exact-verifier',
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
const fr118 = reviewFiveOfficerIntakeCriterionMethodologySourceRebindPostPersistenceFR118(fr117, fr108);
const fr119 = implementFiveOfficerIntakeCriterionMethodologyWitnessQualifiedRegistryAdmissionFR119(fr118);
const fr120 = reviewFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindFR120(fr119);
const fr121 = implementFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindFR121(fr120);
validateFiveOfficerIntakeCriterionDefinitionWitnessQualifiedSourceRebindImplementationFR121(fr121);

const historicalIntake = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake');
const persistedIntake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey === 'intake');
const historicalNonIntake = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey !== 'intake');
const persistedNonIntake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey !== 'intake');

if (
  fr121.authorityState !== 'witness_qualified_intake_criterion_definitions_persisted_mapping_dependency_still_open' ||
  fr121.persistedState.definitionSetId !== 'criteria.shenxiang.five_officers.fr121_witness_qualified' ||
  fr121.persistedState.derivedDefinitionSetPersisted !== true ||
  fr121.persistedState.historicalDefinitionSetRetained !== true ||
  fr121.persistedState.intakeCriterionCount !== 5 ||
  fr121.persistedState.everyPersistedIntakeCriterionUsesWitnessQualifiedPassageOnly !== true ||
  fr121.persistedState.fieldParityExceptSourceRefs !== true ||
  fr121.persistedState.nonIntakeDefinitionsUnchanged !== true ||
  fr121.persistedState.sourcePassageVerificationStatus !== 'scan_checked' ||
  fr121.persistedState.successorMethodologyUsesSameWitnessQualifiedSource !== true ||
  fr121.persistedState.semanticIdentityEquivalenceAsserted !== false ||
  fr121.execution.criterionDefinitionSetsPersisted !== 1 ||
  fr121.execution.criterionDefinitionsPersisted !== 5 ||
  fr121.execution.criterionDefinitionSourceRefsRewritten !== 5 ||
  fr121.execution.methodologyDefinitionsPersisted !== 0 ||
  fr121.execution.methodologySourceRefsRewritten !== 0 ||
  fr121.execution.methodologyExecutionIssued !== false ||
  fr121.execution.metricBindingsIssued !== 0 ||
  fr121.execution.thresholdsIssued !== 0 ||
  fr121.execution.criterionStatesIssued !== 0 ||
  fr121.execution.claimsIssued !== 0 ||
  fr121.execution.traditionalSemanticAuthority !== false ||
  historicalIntake.length !== 5 ||
  persistedIntake.length !== 5 ||
  historicalIntake.some((criterion) => criterion.sourceRefs.length !== 1 || criterion.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake') ||
  persistedIntake.some((criterion) => criterion.sourceRefs.length !== 1 || criterion.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake.nlc_1925') ||
  historicalNonIntake.length !== persistedNonIntake.length ||
  historicalNonIntake.some((criterion, index) => criterion !== persistedNonIntake[index]) ||
  fr121.recommendedNextFrontier !== 'intake_officer_mapping_dependency_post_rebind_review'
) throw new Error('FR121 exact witness-qualified criterion source rebind implementation authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR121_INTAKE_CRITERION_DEFINITION_WITNESS_QUALIFIED_SOURCE_REBIND_IMPLEMENTATION_PASS',
  authorityState: fr121.authorityState,
  definitionSetId: fr121.persistedState.definitionSetId,
  criterionDefinitionsPersisted: fr121.execution.criterionDefinitionsPersisted,
  criterionDefinitionSourceRefsRewritten: fr121.execution.criterionDefinitionSourceRefsRewritten,
  sourceRef: fr121.persistedState.uniquePersistedIntakeSourceRefs[0],
  metricBindingsIssued: fr121.execution.metricBindingsIssued,
  traditionalSemanticAuthority: fr121.execution.traditionalSemanticAuthority,
  nextFrontier: fr121.recommendedNextFrontier,
})}\n`);
