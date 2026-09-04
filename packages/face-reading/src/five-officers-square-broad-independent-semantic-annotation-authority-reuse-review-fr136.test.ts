import { describe, expect, it } from 'vitest';
import {
  FR136_NEXT_FRONTIER,
  reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136,
} from './five-officers-square-broad-independent-semantic-annotation-authority-reuse-review-fr136.js';


describe('FR136 square-broad independent semantic annotation authority reuse review', () => {
  it('consumes the FR135 frontier and keeps annotation authority unresolved', () => {
    const review = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
    expect(review.predecessor.fr135NextFrontier).toBe(
      'square_broad_independent_semantic_annotation_authority_and_protocol_materialization_then_empirical_collection',
    );
    expect(review.predecessor.independentSemanticAnnotationRequired).toBe(true);
    expect(review.predecessor.annotationEvidenceMustBeIndependentOfCandidateMetricValues).toBe(true);
    expect(review.unresolvedAnnotationAuthority.annotationAuthorityRef).toBeNull();
    expect(review.unresolvedAnnotationAuthority.annotationProtocolRef).toBeNull();
    expect(review.unresolvedAnnotationAuthority.labelSchemaRef).toBeNull();
  });

  it('finds reusable governance patterns but no reusable square-broad semantic authority', () => {
    const review = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
    expect(review.reviewedPrecedents).toHaveLength(6);
    expect(review.reviewedPrecedents.every((precedent) => precedent.patternReuseCandidate)).toBe(true);
    expect(review.reviewedPrecedents.every((precedent) => !precedent.squareBroadSemanticAuthorityReusable)).toBe(true);
    expect(review.reviewedPrecedents.every((precedent) => !precedent.squareBroadLabelVocabularyReusable)).toBe(true);
    expect(review.reuseDecision.reusableIndependentSemanticAnnotationAuthorityFound).toBe(false);
    expect(review.reuseDecision.reusableCriterionSpecificAnnotationProtocolFound).toBe(false);
    expect(review.reuseDecision.reusableLabelSchemaFound).toBe(false);
  });

  it('records current scan-checked source authority without upgrading the research methodology', () => {
    const review = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
    expect(review.currentSourceAndMethodologyAuthority.passageVerificationStatus).toBe('scan_checked');
    expect(review.currentSourceAndMethodologyAuthority.methodologyReviewStatus).toBe('research');
    expect(review.currentSourceAndMethodologyAuthority.targetSpecificApprovalDeferred).toBe(true);
    expect(review.currentSourceAndMethodologyAuthority.methodologyReviewDecisionRecordsIssued).toBe(0);
    expect(review.currentSourceAndMethodologyAuthority.traditionalSemanticAuthority).toBe(false);
  });

  it('does not transfer the FR101 criterion-specific reviewer and agreement design into square-broad', () => {
    const review = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
    expect(review.precedentSpecificNonTransferableParameters.reviewersPerItemObservedInPrecedent).toBe(3);
    expect(review.precedentSpecificNonTransferableParameters.minAgreementFractionObservedInPrecedent).toBeCloseTo(2 / 3);
    expect(review.precedentSpecificNonTransferableParameters.minNonAbstainLabelsObservedInPrecedent).toBe(2);
    expect(review.precedentSpecificNonTransferableParameters.parametersTransferAuthorized).toBe(false);
    expect(review.precedentSpecificNonTransferableParameters.parameterValuesAppliedToSquareBroad).toBe(false);
    expect(review.unresolvedAnnotationAuthority.reviewerCount).toBeNull();
    expect(review.unresolvedAnnotationAuthority.quorum).toBeNull();
    expect(review.unresolvedAnnotationAuthority.consensusThreshold).toBeNull();
  });

  it('keeps semantic collection and downstream traditional execution closed', () => {
    const review = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
    expect(review.collectionGate.humanSemanticCollectionAuthorized).toBe(false);
    expect(review.collectionGate.empiricalSemanticEvidenceAcquisitionAuthorized).toBe(false);
    expect(review.execution.annotationAuthoritiesIssued).toBe(0);
    expect(review.execution.annotationProtocolsIssued).toBe(0);
    expect(review.execution.labelSchemasIssued).toBe(0);
    expect(review.execution.empiricalSemanticLabelsIssued).toBe(0);
    expect(review.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(review.execution.calibrationProtocolsIssued).toBe(0);
    expect(review.execution.thresholdsIssued).toBe(0);
    expect(review.execution.criterionStatesIssued).toBe(0);
    expect(review.execution.traditionalSemanticAuthority).toBe(false);
    expect(review.nextFrontier).toBe(FR136_NEXT_FRONTIER);
  });
});
