import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { admitFiveOfficerMouthCriterionAuthorityGapFR70 } from './five-officers-mouth-criterion-authority-gap-fr70.js';
import { admitFiveOfficerMouthSourceWitnessReadinessFR71 } from './five-officers-mouth-source-witness-readiness-fr71.js';
import { admitFiveOfficerMouthDirectSourceCandidateExtensionFR72 } from './five-officers-mouth-direct-source-candidate-extension-fr72.js';
import { admitFiveOfficerMouthIndexedSectionAnchorFR73 } from './five-officers-mouth-indexed-section-anchor-fr73.js';
import { assessFiveOfficerMouthScanImageAcquisitionReadinessFR74 } from './five-officers-mouth-scan-image-acquisition-readiness-fr74.js';
import { admitFiveOfficerMouthScanEvidenceAcquisitionFR103 } from './five-officers-mouth-scan-evidence-acquisition-fr103.js';
import { admitFiveOfficerMouthDirectSourcePageVerificationFR104 } from './five-officers-mouth-direct-source-page-verification-fr104.js';
import { reviewFiveOfficerMethodologySourceRebindFR105 } from './five-officers-methodology-source-rebind-review-fr105.js';
import { reviewFiveOfficerIntakeCriterionSourceScopeFR106 } from './five-officers-intake-criterion-source-scope-review-fr106.js';
import {
  reviewFiveOfficerIntakeCriterionMethodologyDefinitionFR107,
  validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107,
} from './five-officers-intake-criterion-methodology-definition-review-fr107.js';

const DIGEST = `sha256:${'c'.repeat(64)}`;

function factory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  const result: MediaPipeFaceLandmarkerResultFR25V1 = {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 19) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
  return { async create() { return { detect: () => result, close() {} }; } };
}

async function artifact107() {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr107:methodology-definition',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  }, factory());
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
  return reviewFiveOfficerIntakeCriterionMethodologyDefinitionFR107(fr106);
}

describe('FR107 Five Officers intake criterion methodology definition review', () => {
  it('admits one narrow research methodology definition candidate from the intake criterion bundle', async () => {
    const result = await artifact107();
    expect(result.candidateDefinition).toMatchObject({
      methodologyId: 'method.shenxiang.five_officers.intake_criteria',
      version: '0.1.0',
      traditionalTerm: '出納官',
      scope: 'static_face',
      sourceRefs: ['passage.shenxiang.five_officers.intake'],
      reviewStatus: 'research',
    });
    expect(result.definitionReview.criterionCount).toBe(5);
    expect(result.definitionReview.criterionResearchMethodologyDefinitionAdmitted).toBe(true);
    expect(result.definitionReview.methodologyDefinitionsIssued).toBe(1);
    expect(result.definitionReview.persistentRegistryDefinitionsIssued).toBe(0);
  });

  it('preserves the mixed criterion modalities instead of pretending the whole bundle is static-operationalized', async () => {
    const result = await artifact107();
    expect(result.definitionReview.staticGeometryCriterionCount).toBe(2);
    expect(result.definitionReview.captureSensitiveCriterionCount).toBe(2);
    expect(result.definitionReview.dynamicAppearanceCriterionCount).toBe(1);
    expect(result.candidateDefinition.limitations.join('\n')).toContain('capture-sensitive');
  });

  it('does not replace or promote the full Five Officers methodology and does not mutate the registry', async () => {
    const result = await artifact107();
    expect(result.fullMethodology.methodologyRef).toBe('method.shenxiang.five_officers@0.1.0');
    expect(result.fullMethodology.reviewStatus).toBe('research');
    expect(result.fullMethodology.historicalMappingDependencyPresent).toBe(true);
    expect(result.fullMethodology.mappingDependencyRemoved).toBe(false);
    expect(result.fullMethodology.replacedByCandidate).toBe(false);
    expect(result.registry).toEqual({
      historicalRegistryMutated: false,
      candidatePersisted: false,
      methodologyPackMutated: false,
      registryAdmissionAuthorized: false,
    });
  });

  it('issues no execution, metric, threshold, criterion-state, claim, or traditional authority', async () => {
    const result = await artifact107();
    expect(result.execution.methodologyExecutionIssued).toBe(false);
    expect(result.execution.methodologyProductionPromotionAuthorized).toBe(false);
    expect(result.execution.metricBindingsIssued).toBe(0);
    expect(result.execution.thresholdsIssued).toBe(0);
    expect(result.execution.criterionStatesIssued).toBe(0);
    expect(result.execution.claimsIssued).toBe(0);
    expect(result.execution.traditionalFormationAuthorized).toBe(false);
    expect(result.execution.traditionalSemanticAuthority).toBe(false);
    expect(result.recommendedNextFrontier).toBe('intake_criterion_methodology_registry_admission_review');
    expect(validateFiveOfficerIntakeCriterionMethodologyDefinitionReviewFR107(result)).toBe(result);
  });
});
