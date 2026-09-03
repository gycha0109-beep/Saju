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
import {
  reviewFiveOfficerIntakeCriterionSourceScopeFR106,
  validateFiveOfficerIntakeCriterionSourceScopeReviewFR106,
} from '../.face-reading-dist/five-officers-intake-criterion-source-scope-review-fr106.js';

const DIGEST = `sha256:${'b'.repeat(64)}`;
const providerLandmarks = Array.from({ length: 478 }, (_, index) => Object.freeze({
  x: (index + 1) / 500,
  y: (478 - index) / 500,
  z: (index % 23) / 1000,
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
  providerRunRef: 'fr106:exact-verifier',
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
validateFiveOfficerIntakeCriterionSourceScopeReviewFR106(fr106);

if (
  fr106.fullMethodology.methodologyRef !== 'method.shenxiang.five_officers@0.1.0' ||
  fr106.fullMethodology.reviewStatus !== 'research' ||
  fr106.criterionSourceScope.criterionCount !== 5 ||
  fr106.criterionSourceScope.uniqueSourceRefs.length !== 1 ||
  fr106.criterionSourceScope.uniqueSourceRefs[0] !== 'passage.shenxiang.five_officers.intake' ||
  fr106.criterionSourceScope.criterionBundleSourceScopedIndependentlyOfMapping !== true ||
  fr106.criterionSourceScope.intakeCriterionResearchUnitCandidateAdmitted !== true ||
  fr106.intakeOfficerDefinition.historicalMappingDependencyPresent !== true ||
  fr106.intakeOfficerDefinition.mappingDependencyRemoved !== false ||
  fr106.intakeOfficerDefinition.fullOfficerDefinitionDecompositionAuthorized !== false ||
  fr106.directPassageSemantics.textSelfNamesOfficerFormation !== true ||
  fr106.directPassageSemantics.selfNamingMeansMappingDependencyRemoval !== false ||
  fr106.criterionMethodologyDefinitionsIssued !== 0 ||
  fr106.methodologyReviewPromotionAuthorized !== false ||
  fr106.metricBindingsIssued !== 0 ||
  fr106.thresholdsIssued !== 0 ||
  fr106.criterionStatesIssued !== 0 ||
  fr106.claimsIssued !== 0 ||
  fr106.traditionalSemanticAuthority !== false
) throw new Error('FR106 exact criterion source-scope authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR106_INTAKE_CRITERION_SOURCE_SCOPE_PASS',
  methodologyRef: fr106.fullMethodology.methodologyRef,
  fullMethodologyReviewStatus: fr106.fullMethodology.reviewStatus,
  criterionCount: fr106.criterionSourceScope.criterionCount,
  uniqueCriterionSourceRefs: fr106.criterionSourceScope.uniqueSourceRefs,
  criterionBundleSourceScopedIndependentlyOfMapping: fr106.criterionSourceScope.criterionBundleSourceScopedIndependentlyOfMapping,
  researchUnitCandidateAdmitted: fr106.criterionSourceScope.intakeCriterionResearchUnitCandidateAdmitted,
  historicalMappingDependencyPresent: fr106.intakeOfficerDefinition.historicalMappingDependencyPresent,
  mappingDependencyRemoved: fr106.intakeOfficerDefinition.mappingDependencyRemoved,
  criterionMethodologyDefinitionsIssued: fr106.criterionMethodologyDefinitionsIssued,
  metricBindingsIssued: fr106.metricBindingsIssued,
  thresholdsIssued: fr106.thresholdsIssued,
  criterionStatesIssued: fr106.criterionStatesIssued,
  claimsIssued: fr106.claimsIssued,
  traditionalSemanticAuthority: fr106.traditionalSemanticAuthority,
  nextFrontier: fr106.recommendedNextFrontier,
})}\n`);