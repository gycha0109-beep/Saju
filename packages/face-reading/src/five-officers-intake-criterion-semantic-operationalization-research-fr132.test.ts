import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132,
  assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132,
} from './five-officers-intake-criterion-semantic-operationalization-research-fr132.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

describe('FR132 intake criterion semantic operationalization research', () => {
  it('keeps reviewed promotion explicitly deferred while issuing substantive semantic research', () => {
    const value = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
    assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132(value);

    expect(value.authorityState).toBe(
      'intake_criterion_semantics_decomposed_operationalization_research_active_reviewed_promotion_deferred',
    );
    expect(value.predecessor.projectOwnerGovernanceActive).toBe(true);
    expect(value.predecessor.targetSpecificDecisionCount).toBe(0);
    expect(value.promotionStatus.targetSpecificApprovalExplicitlyDeferred).toBe(true);
    expect(value.promotionStatus.researchMethodologyRemainsResearch).toBe(true);
    expect(value.promotionStatus.proposedReviewedSuccessorPresent).toBe(false);
    expect(value.execution.semanticResearchRecordsIssued).toBe(5);
  });

  it('decomposes every intake criterion without pretending the decomposition is authoritative metric binding', () => {
    const value = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
    expect(value.criterionResearch.map((record) => [record.sourceConcept, record.analyticalParts])).toEqual([
      ['方大', ['方', '大']],
      ['端厚', ['端', '厚']],
      ['角弓', ['角', '弓']],
      ['開大合小', ['開大', '合小']],
      ['唇紅', ['唇', '紅']],
    ]);
    expect(value.criterionResearch.every((record) => record.constructValidityStatus === 'not_established')).toBe(true);
    expect(value.criterionResearch.every((record) => record.traditionalMetricBindingAuthorized === false)).toBe(true);
    expect(value.criterionResearch.every((record) => record.thresholdAuthorized === false)).toBe(true);
    expect(value.semanticFindings.compoundSegmentationAuthoritative).toBe(false);
  });

  it('narrows 方大 into separate shape and relative-size construct-validation work', () => {
    const value = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
    const squareBroad = value.criterionResearch.find((record) => record.criterionId === 'criterion.intake.square_broad');
    expect(squareBroad).toBeDefined();
    expect(squareBroad?.observability).toBe('partially_observable_static_geometry');
    expect(squareBroad?.candidateNeutralMeasurementRefs).toEqual([
      'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
      'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
    ]);
    expect(squareBroad?.missingOperationalConstructs).toContain(
      'governed_mouth_outline_rectilinearity_or_angularity_observation_for_fang',
    );
    expect(squareBroad?.missingOperationalConstructs).toContain(
      'anatomically_governed_relative_mouth_size_reference_for_da',
    );
    expect(value.neutralMetricAssessment.fr80CanProveTraditionalFang).toBe(false);
    expect(value.neutralMetricAssessment.fr82CanProveTraditionalDa).toBe(false);
    expect(value.semanticFindings.daIncludesContainmentContextCandidate).toBe(true);
  });

  it('corrects the 端厚 shortcut and preserves FR97 as role-free separation rather than lip thickness', () => {
    const value = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
    const duanHou = value.criterionResearch.find((record) => record.criterionId === 'criterion.intake.lips_substantial');
    expect(duanHou).toBeDefined();
    expect(value.semanticFindings.duanHouMustNotCollapseToThickness).toBe(true);
    expect(value.semanticFindings.houThicknessFullnessSupportStrongerThanDuanOperationalMeaning).toBe(true);
    expect(value.semanticFindings.duanOperationalMeaningResolved).toBe(false);
    expect(value.neutralMetricAssessment.fr97CanBeInterpretedAsLipThickness).toBe(false);
    expect(duanHou?.missingOperationalConstructs).toContain('source_grounded_definition_of_duan_component');
  });

  it('requires capture-aware operationalization for 角弓, 開大合小 and 唇紅', () => {
    const value = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
    const arched = value.criterionResearch.find((record) => record.sourceConcept === '角弓');
    const openClose = value.criterionResearch.find((record) => record.sourceConcept === '開大合小');
    const red = value.criterionResearch.find((record) => record.sourceConcept === '唇紅');
    expect(arched?.observability).toBe('capture_sensitive_multifeature_geometry');
    expect(arched?.missingOperationalConstructs).toContain('teeth_visibility_observation');
    expect(value.semanticFindings.bowContextIncludesUpwardOrientationAndTeethNonExposure).toBe(true);
    expect(openClose?.observability).toBe('controlled_multi_state_dynamic_geometry');
    expect(value.semanticFindings.openCloseRelationRequiresMultipleControlledStates).toBe(true);
    expect(red?.observability).toBe('appearance_requires_capture_calibration');
    expect(red?.missingOperationalConstructs).toContain('color_calibrated_capture_protocol');
  });

  it('leaves persisted methodology and decision authority unchanged', () => {
    const target = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
      (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.2.0',
    );
    const proposed = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
      (method) => `${method.methodologyId}@${method.version}` === 'method.shenxiang.five_officers.intake_criteria@0.3.0',
    );
    expect(target?.reviewStatus).toBe('research');
    expect(proposed).toBeUndefined();
    expect(FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions).toHaveLength(0);
  });
});
