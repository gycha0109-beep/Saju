import { describe, expect, it } from 'vitest';
import {
  assertIssuedEyePairPostFR165AuthorityFrontierReviewFR166,
  FR166_CRITERION_SPECIFIC_PRECEDENT_REFS,
  FR166_NEXT_FRONTIER,
  FR166_RESEARCH_NOTE_REF,
  issueEyePairPostFR165AuthorityFrontierReviewFR166,
  type EyePairPostFR165AuthorityFrontierReviewFR166V1,
} from './eye-pair-post-fr165-authority-frontier-review-fr166.js';

function forgedFR166(): EyePairPostFR165AuthorityFrontierReviewFR166V1 {
  return Object.freeze({}) as unknown as EyePairPostFR165AuthorityFrontierReviewFR166V1;
}

describe('FR166 eye-pair post-FR165 authority frontier review', () => {
  it('pauses further same-boundary participant capture as an authority requirement', () => {
    const review = issueEyePairPostFR165AuthorityFrontierReviewFR166();

    expect(review.authorityState).toBe('post_fr165_authority_frontier_review_capture_pause');
    expect(review.empiricalBoundary.fr165SupportsThreeOrMoreGovernedSessions).toBe(true);
    expect(review.empiricalBoundary.additionalSameBoundarySessionMayExtendDescription).toBe(true);
    expect(review.empiricalBoundary.additionalSameBoundarySessionPromotesAuthority).toBe(false);
    expect(review.empiricalBoundary.additionalSameBoundaryParticipantCaptureRequiredForNextAuthorityFrontier).toBe(false);
    expect(review.decisionBoundary.requestAdditionalParticipantCaptureBeforeNewAuthorityPath).toBe(false);
    expect(review.empiricalBoundary.participantDerivedNumericMetricInputAcceptedByFR166).toBe(false);
    expect(review.empiricalBoundary.participantDerivedNumericMetricValuesPersistedByFR166).toBe(false);
    expect(() => assertIssuedEyePairPostFR165AuthorityFrontierReviewFR166(review)).not.toThrow();
  });

  it('keeps all blocked authority surfaces fail-closed', () => {
    const review = issueEyePairPostFR165AuthorityFrontierReviewFR166();

    expect(review.blockerBoundary).toEqual({
      eyePairIndependentSessionTrustPathGeneralized: false,
      eyePairGovernedWitnessTrustRootEstablished: false,
      preregisteredRepeatabilityAcceptanceProtocolFrozen: false,
      captureQualityMeasurementConstructValidated: false,
      inferentialProtocolFrozen: false,
      constructValidity: 'unresolved',
      traditionalBinding: 'unresolved',
    });
    expect(review.decisionBoundary).toMatchObject({
      deriveThresholdsFromObservedMultiSessionSeries: false,
      retroactiveIndependentSessionPromotionAllowed: false,
      independentMultiSessionEvidenceAdmitted: false,
      multiSessionIndependenceVerified: false,
      repeatabilityPassFailIssued: false,
      captureSensitivityPassFailIssued: false,
      inferentialStatisticIssued: false,
      calibrationIssued: false,
      thresholdsIssued: false,
      identityMatchingPerformed: false,
      biometricTemplateIssued: false,
      traditionalSemanticAuthority: false,
    });
  });

  it('treats FR152/FR156/FR157 only as criterion-specific precedent rather than inherited eye-pair authority', () => {
    const review = issueEyePairPostFR165AuthorityFrontierReviewFR166();

    expect(review.precedentBoundary.refs).toBe(FR166_CRITERION_SPECIFIC_PRECEDENT_REFS);
    expect(review.precedentBoundary.squareBroadFangPathIsCriterionSpecificPrecedentOnly).toBe(true);
    expect(review.precedentBoundary.squareBroadFangTrustInheritedAsEyePairAuthority).toBe(false);
    expect(review.precedentBoundary.silentCrossCriterionTrustReuseAllowed).toBe(false);
    expect(FR166_CRITERION_SPECIFIC_PRECEDENT_REFS).toEqual([
      'repo:research/face-reading/fr152-square-broad-fang-independent-multi-session-evidence-acquisition-protocol.md',
      'repo:research/face-reading/fr156-square-broad-fang-external-witness-trust-root-provisioning-protocol.md',
      'repo:research/face-reading/fr157-square-broad-fang-external-trust-root-material-intake.md',
    ]);
  });

  it('accepts no raw participant or biometric persistence authority', () => {
    const review = issueEyePairPostFR165AuthorityFrontierReviewFR166();

    expect(Object.values(review.privacyBoundary).every((value) => value === false)).toBe(true);
    expect(Object.keys(review)).not.toContain('participantMetricValues');
    expect(Object.keys(review)).not.toContain('sessionMeans');
    expect(Object.keys(review)).not.toContain('threshold');
  });

  it('rejects structural lookalikes and keeps the documented frontier stable', () => {
    expect(() => assertIssuedEyePairPostFR165AuthorityFrontierReviewFR166(forgedFR166())).toThrow(/not issued/u);
    expect(FR166_RESEARCH_NOTE_REF).toBe('repo:research/face-reading/fr166-eye-pair-post-fr165-authority-frontier-review.md');
    expect(FR166_NEXT_FRONTIER).toBe(
      'generalize_external_session_provenance_trust_path_for_eye_pair_before_requesting_additional_participant_capture_for_authority_promotion',
    );
  });
});
