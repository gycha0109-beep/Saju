import { describe, expect, it } from 'vitest';
import {
  assertIssuedSquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136,
  reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136,
  type SquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136V1,
} from './five-officers-square-broad-independent-semantic-annotation-authority-reuse-review-fr136.js';


describe('FR136 square-broad semantic annotation authority reuse hardening', () => {
  it('rejects copied review-shaped objects outside the active issuer', () => {
    const issued = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
    const forged = {
      ...issued,
      reuseDecision: { ...issued.reuseDecision },
    } as SquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136V1;
    expect(() => assertIssuedSquareBroadIndependentSemanticAnnotationAuthorityReuseReviewFR136(forged)).toThrow(/FR-136/u);
  });

  it('does not reinterpret face-count annotation infrastructure as physiognomic semantic authority', () => {
    const review = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
    const faceCountPrecedents = review.reviewedPrecedents.filter(
      (precedent) => precedent.targetConstruct === 'categorical_human_face_count_state',
    );
    expect(faceCountPrecedents).toHaveLength(5);
    expect(faceCountPrecedents.every((precedent) => precedent.patternReuseCandidate)).toBe(true);
    expect(faceCountPrecedents.every((precedent) => !precedent.squareBroadSemanticAuthorityReusable)).toBe(true);
    expect(review.authorityBoundary.faceCountHumanLabelAuthorityMeansSquareBroadSemanticAuthority).toBe(false);
    expect(review.authorityBoundary.faceCountAdjudicationAuthorityMeansSquareBroadAdjudicationAuthority).toBe(false);
  });

  it('does not promote source verification or project-owner governance into annotation authority', () => {
    const review = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
    expect(review.currentSourceAndMethodologyAuthority.passageVerificationStatus).toBe('scan_checked');
    expect(review.currentSourceAndMethodologyAuthority.methodologyReviewStatus).toBe('research');
    expect(review.authorityBoundary.scanCheckedSourceMeansMethodologyReviewed).toBe(false);
    expect(review.authorityBoundary.projectOwnerGovernanceMeansAnnotationAuthority).toBe(false);
    expect(review.unresolvedAnnotationAuthority.annotationAuthorityRef).toBeNull();
  });

  it('keeps all square-broad reviewer, quorum, consensus, adjudication, and qualification policy unassigned', () => {
    const review = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
    expect(review.unresolvedAnnotationAuthority.reviewerCount).toBeNull();
    expect(review.unresolvedAnnotationAuthority.quorum).toBeNull();
    expect(review.unresolvedAnnotationAuthority.consensusThreshold).toBeNull();
    expect(review.unresolvedAnnotationAuthority.adjudicationRuleRef).toBeNull();
    expect(review.unresolvedAnnotationAuthority.reviewerQualificationRef).toBeNull();
    expect(review.reuseDecision.reusableReviewerPolicyFound).toBe(false);
    expect(review.reuseDecision.reusableConsensusPolicyFound).toBe(false);
  });

  it('does not let a future protocol definition itself imply collection, binding, threshold, or criterion state authority', () => {
    const review = reviewSquareBroadIndependentSemanticAnnotationAuthorityReuseFR136();
    expect(review.authorityBoundary.annotationRequirementsMeanProtocolMaterialized).toBe(false);
    expect(review.authorityBoundary.protocolDesignMeansCollectionAuthority).toBe(false);
    expect(review.authorityBoundary.humanLabelsMeanTraditionalMetricBinding).toBe(false);
    expect(review.authorityBoundary.humanLabelsMeanCalibrationThreshold).toBe(false);
    expect(review.authorityBoundary.constructValidityEvidenceMeansCriterionState).toBe(false);
    expect(review.collectionGate.humanSemanticCollectionAuthorized).toBe(false);
    expect(review.execution.structuredClaimsIssued).toBe(0);
    expect(review.execution.boundedNarrativesIssued).toBe(0);
  });
});
