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
import {
  reviewFiveOfficerIntakeCriterionMethodologyDefinitionFR107,
  validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107,
} from '../.face-reading-dist/five-officers-intake-criterion-methodology-definition-review-fr107.js';

const DIGEST = `sha256:${'d'.repeat(64)}`;
const providerLandmarks = Array.from({ length: 478 }, (_, index) => Object.freeze({
  x: (index + 1) / 500,
  y: (478 - index) / 500,
  z: (index % 29) / 1000,
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
  providerRunRef: 'fr107:exact-verifier',
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
validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107(fr107);

if (
  fr107.candidateDefinition.methodologyId !== 'method.shenxiang.five_officers.intake_criteria' ||
  fr107.candidateDefinition.version !== '0.1.0' ||
  fr107.candidateDefinition.traditionalTerm !== '出納官' ||
  fr107.candidateDefinition.scope !== 'static_face' ||
  fr107.candidateDefinition.reviewStatus !== 'research' ||
  fr107.candidateDefinition.sourceRefs.length !== 1 ||
  fr107.candidateDefinition.sourceRefs[0] !== 'passage.shenxiang.five_officers.intake' ||
  fr107.definitionReview.criterionCount !== 5 ||
  fr107.definitionReview.staticGeometryCriterionCount !== 2 ||
  fr107.definitionReview.captureSensitiveCriterionCount !== 2 ||
  fr107.definitionReview.dynamicAppearanceCriterionCount !== 1 ||
  fr107.definitionReview.criterionResearchMethodologyDefinitionAdmitted !== true ||
  fr107.definitionReview.methodologyDefinitionsIssued !== 1 ||
  fr107.definitionReview.persistentRegistryDefinitionsIssued !== 0 ||
  fr107.fullMethodology.reviewStatus !== 'research' ||
  fr107.fullMethodology.historicalMappingDependencyPresent !== true ||
  fr107.fullMethodology.mappingDependencyRemoved !== false ||
  fr107.fullMethodology.reviewPromotionAuthorized !== false ||
  fr107.registry.historicalRegistryMutated !== false ||
  fr107.registry.candidatePersisted !== false ||
  fr107.registry.methodologyPackMutated !== false ||
  fr107.registry.registryAdmissionAuthorized !== false ||
  fr107.execution.methodologyExecutionIssued !== false ||
  fr107.execution.metricBindingsIssued !== 0 ||
  fr107.execution.thresholdsIssued !== 0 ||
  fr107.execution.criterionStatesIssued !== 0 ||
  fr107.execution.claimsIssued !== 0 ||
  fr107.execution.traditionalSemanticAuthority !== false
) throw new Error('FR107 exact methodology-definition authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR107_INTAKE_CRITERION_METHODOLOGY_DEFINITION_PASS',
  candidateMethodologyRef: fr107.definitionReview.methodologyRef,
  candidateReviewStatus: fr107.candidateDefinition.reviewStatus,
  candidateSourceRefs: fr107.candidateDefinition.sourceRefs,
  criterionCount: fr107.definitionReview.criterionCount,
  modalityCounts: {
    staticGeometry: fr107.definitionReview.staticGeometryCriterionCount,
    captureSensitive: fr107.definitionReview.captureSensitiveCriterionCount,
    dynamicAppearance: fr107.definitionReview.dynamicAppearanceCriterionCount,
  },
  methodologyDefinitionsIssued: fr107.definitionReview.methodologyDefinitionsIssued,
  persistentRegistryDefinitionsIssued: fr107.definitionReview.persistentRegistryDefinitionsIssued,
  fullMethodologyReviewStatus: fr107.fullMethodology.reviewStatus,
  historicalMappingDependencyPresent: fr107.fullMethodology.historicalMappingDependencyPresent,
  registryAdmissionAuthorized: fr107.registry.registryAdmissionAuthorized,
  methodologyExecutionIssued: fr107.execution.methodologyExecutionIssued,
  metricBindingsIssued: fr107.execution.metricBindingsIssued,
  thresholdsIssued: fr107.execution.thresholdsIssued,
  criterionStatesIssued: fr107.execution.criterionStatesIssued,
  claimsIssued: fr107.execution.claimsIssued,
  traditionalSemanticAuthority: fr107.execution.traditionalSemanticAuthority,
  nextFrontier: fr107.recommendedNextFrontier,
})}\n`);