import { describe, expect, it } from 'vitest';
import { FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS } from './five-officers-mouth-scan-image-acquisition-readiness-fr74.js';
import {
  assertIssuedLipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102,
  reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102,
} from './lips-substantial-construct-validity-collection-authorization-gate-review-fr102.js';

describe('FR102 lips substantial construct-validity collection authorization gate review', () => {
  it('keeps source, methodology, and linked protocol gates closed', () => {
    const review = reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102();
    assertIssuedLipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102(review);

    expect(review.gateAssessment.sourceGate).toMatchObject({
      requiredVerificationStatus: 'scan_checked',
      currentVerificationStatus: 'unverified_ocr',
      open: false,
    });
    expect(review.gateAssessment.methodologyGate).toMatchObject({
      requiredReviewStatus: 'reviewed',
      currentReviewStatus: 'research',
      open: false,
    });
    expect(review.gateAssessment.linkedProtocolGate.open).toBe(false);
    expect(review.gateAssessment.allRequiredGatesOpen).toBe(false);
  });

  it('denies collection and construct-validity evidence acquisition while any gate remains closed', () => {
    const review = reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102();

    expect(review.authorizationDecision).toEqual({
      decision: 'not_authorized',
      humanDataCollectionAuthorized: false,
      constructValidityEvidenceAcquisitionAuthorized: false,
      studyExecutionPromotionAuthorized: false,
      reason: 'source_methodology_and_linked_protocol_review_gates_are_all_closed',
      protocolExistenceMeansCollectionAuthority: false,
      blockedStudyMeansEvidenceMayBeCollected: false,
    });
  });

  it('hands the next remediation back to immutable NLC scan-image acquisition', () => {
    const review = reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102();

    expect(review.nextExternalAuthorityRemediation.remediationClass).toBe('source_scan_image_acquisition');
    expect(review.nextExternalAuthorityRemediation.requiredEvidence).toBe(FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS);
    expect(review.nextExternalAuthorityRemediation.requiredEvidence).toEqual([
      'immutable_nlc_1925_page_image_ref',
      'exact_scan_page_within_1_576',
      'visual_match_of_intake_heading_or_passage_text',
      'nonempty_visual_evidence_refs',
      'nonempty_checker_refs',
    ]);
    expect(review.nextExternalAuthorityRemediation.guessedPageOffsetAuthorized).toBe(false);
    expect(review.nextExternalAuthorityRemediation.ocrOnlyLocatorAuthorized).toBe(false);
    expect(review.nextExternalAuthorityRemediation.searchIndexLocatorAuthorized).toBe(false);
  });

  it('does not recommend more internal protocol expansion before source evidence work', () => {
    const review = reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102();

    expect(review.recommendedNextFrontier.frontierKey).toBe('five_officers_intake_scan_image_acquisition_reassessment');
    expect(review.recommendedNextFrontier.internalProtocolExpansionRecommendedBeforeSourceWork).toBe(false);
    expect(review.recommendedNextFrontier.externalSourceEvidenceAcquisitionRecommendedNow).toBe(true);
    expect(review.recommendedNextFrontier.humanCollectionAuthorizationAllowedNow).toBe(false);
  });

  it('issues no evidence, threshold, traditional binding, thickness semantics, criterion state, or claims', () => {
    const review = reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102();

    expect(review.humanDataCollectionAuthorized).toBe(false);
    expect(review.constructValidityEvidenceIssued).toBe(0);
    expect(review.calibrationEvidenceIssued).toBe(0);
    expect(review.thresholdRefsIssued).toBe(0);
    expect(review.traditionalMetricBindingsIssued).toBe(0);
    expect(review.thicknessMetricIssued).toBe(false);
    expect(review.morphologyProduced).toBe(false);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
    expect(review.traditionalSemanticAuthority).toBe(false);
  });
});
