export const FR166_EYE_PAIR_POST_FR165_AUTHORITY_FRONTIER_REVIEW_RECORD_ID =
  'research.face_reading.neutral.eye_pair.post_fr165_authority_frontier_review.fr166' as const;
export const FR166_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr166-eye-pair-post-fr165-authority-frontier-review.md' as const;
export const FR166_FR165_PREDECESSOR_RECORD_ID =
  'research.face_reading.neutral.eye_pair.prospective_multi_session_recurrence.fr165' as const;
export const FR166_CRITERION_SPECIFIC_PRECEDENT_REFS = Object.freeze([
  'repo:research/face-reading/fr152-square-broad-fang-independent-multi-session-evidence-acquisition-protocol.md',
  'repo:research/face-reading/fr156-square-broad-fang-external-witness-trust-root-provisioning-protocol.md',
  'repo:research/face-reading/fr157-square-broad-fang-external-trust-root-material-intake.md',
] as const);
export const FR166_NEXT_FRONTIER =
  'generalize_external_session_provenance_trust_path_for_eye_pair_before_requesting_additional_participant_capture_for_authority_promotion' as const;

const ISSUED = new WeakSet<object>();

export interface EyePairPostFR165AuthorityFrontierReviewFR166V1 {
  readonly schemaVersion: 'fr166-eye-pair-post-fr165-authority-frontier-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR166_EYE_PAIR_POST_FR165_AUTHORITY_FRONTIER_REVIEW_RECORD_ID;
  readonly authorityState: 'post_fr165_authority_frontier_review_capture_pause';
  readonly predecessorRecordId: typeof FR166_FR165_PREDECESSOR_RECORD_ID;
  readonly empiricalBoundary: {
    readonly fr165SupportsThreeOrMoreGovernedSessions: true;
    readonly additionalSameBoundarySessionMayExtendDescription: true;
    readonly additionalSameBoundarySessionPromotesAuthority: false;
    readonly additionalSameBoundaryParticipantCaptureRequiredForNextAuthorityFrontier: false;
    readonly participantDerivedNumericMetricInputAcceptedByFR166: false;
    readonly participantDerivedNumericMetricValuesPersistedByFR166: false;
  };
  readonly blockerBoundary: {
    readonly eyePairIndependentSessionTrustPathGeneralized: false;
    readonly eyePairGovernedWitnessTrustRootEstablished: false;
    readonly preregisteredRepeatabilityAcceptanceProtocolFrozen: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly inferentialProtocolFrozen: false;
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
  };
  readonly precedentBoundary: {
    readonly refs: typeof FR166_CRITERION_SPECIFIC_PRECEDENT_REFS;
    readonly squareBroadFangPathIsCriterionSpecificPrecedentOnly: true;
    readonly squareBroadFangTrustInheritedAsEyePairAuthority: false;
    readonly silentCrossCriterionTrustReuseAllowed: false;
  };
  readonly decisionBoundary: {
    readonly requestAdditionalParticipantCaptureBeforeNewAuthorityPath: false;
    readonly deriveThresholdsFromObservedMultiSessionSeries: false;
    readonly retroactiveIndependentSessionPromotionAllowed: false;
    readonly independentMultiSessionEvidenceAdmitted: false;
    readonly multiSessionIndependenceVerified: false;
    readonly repeatabilityPassFailIssued: false;
    readonly captureSensitivityPassFailIssued: false;
    readonly inferentialStatisticIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly identityMatchingPerformed: false;
    readonly biometricTemplateIssued: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly privacyBoundary: {
    readonly rawImageAccepted: false;
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawLandmarkSetPersisted: false;
    readonly derivedFullFaceMetricGeometryPersisted: false;
    readonly sourceDigestPersisted: false;
    readonly exactCaptureTimestampPersisted: false;
    readonly geolocationPersisted: false;
    readonly deviceIdentifierPersisted: false;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly researchNoteRef: typeof FR166_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR166_NEXT_FRONTIER;
}

export function issueEyePairPostFR165AuthorityFrontierReviewFR166(): EyePairPostFR165AuthorityFrontierReviewFR166V1 {
  const result: EyePairPostFR165AuthorityFrontierReviewFR166V1 = Object.freeze({
    schemaVersion: 'fr166-eye-pair-post-fr165-authority-frontier-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR166_EYE_PAIR_POST_FR165_AUTHORITY_FRONTIER_REVIEW_RECORD_ID,
    authorityState: 'post_fr165_authority_frontier_review_capture_pause' as const,
    predecessorRecordId: FR166_FR165_PREDECESSOR_RECORD_ID,
    empiricalBoundary: Object.freeze({
      fr165SupportsThreeOrMoreGovernedSessions: true as const,
      additionalSameBoundarySessionMayExtendDescription: true as const,
      additionalSameBoundarySessionPromotesAuthority: false as const,
      additionalSameBoundaryParticipantCaptureRequiredForNextAuthorityFrontier: false as const,
      participantDerivedNumericMetricInputAcceptedByFR166: false as const,
      participantDerivedNumericMetricValuesPersistedByFR166: false as const,
    }),
    blockerBoundary: Object.freeze({
      eyePairIndependentSessionTrustPathGeneralized: false as const,
      eyePairGovernedWitnessTrustRootEstablished: false as const,
      preregisteredRepeatabilityAcceptanceProtocolFrozen: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      inferentialProtocolFrozen: false as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
    }),
    precedentBoundary: Object.freeze({
      refs: FR166_CRITERION_SPECIFIC_PRECEDENT_REFS,
      squareBroadFangPathIsCriterionSpecificPrecedentOnly: true as const,
      squareBroadFangTrustInheritedAsEyePairAuthority: false as const,
      silentCrossCriterionTrustReuseAllowed: false as const,
    }),
    decisionBoundary: Object.freeze({
      requestAdditionalParticipantCaptureBeforeNewAuthorityPath: false as const,
      deriveThresholdsFromObservedMultiSessionSeries: false as const,
      retroactiveIndependentSessionPromotionAllowed: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      inferentialStatisticIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageAccepted: false as const,
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      derivedFullFaceMetricGeometryPersisted: false as const,
      sourceDigestPersisted: false as const,
      exactCaptureTimestampPersisted: false as const,
      geolocationPersisted: false as const,
      deviceIdentifierPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR166_RESEARCH_NOTE_REF,
    nextFrontier: FR166_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairPostFR165AuthorityFrontierReviewFR166(
  result: EyePairPostFR165AuthorityFrontierReviewFR166V1,
): void {
  if (!ISSUED.has(result)) throw new Error('FR-166 authority frontier review was not issued by the active FR-166 boundary.');
  if (
    result.schemaVersion !== 'fr166-eye-pair-post-fr165-authority-frontier-review-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR166_EYE_PAIR_POST_FR165_AUTHORITY_FRONTIER_REVIEW_RECORD_ID
    || result.authorityState !== 'post_fr165_authority_frontier_review_capture_pause'
    || result.predecessorRecordId !== FR166_FR165_PREDECESSOR_RECORD_ID
    || result.empiricalBoundary.fr165SupportsThreeOrMoreGovernedSessions !== true
    || result.empiricalBoundary.additionalSameBoundarySessionMayExtendDescription !== true
    || result.empiricalBoundary.additionalSameBoundarySessionPromotesAuthority !== false
    || result.empiricalBoundary.additionalSameBoundaryParticipantCaptureRequiredForNextAuthorityFrontier !== false
    || result.empiricalBoundary.participantDerivedNumericMetricInputAcceptedByFR166 !== false
    || result.empiricalBoundary.participantDerivedNumericMetricValuesPersistedByFR166 !== false
    || result.blockerBoundary.eyePairIndependentSessionTrustPathGeneralized !== false
    || result.blockerBoundary.eyePairGovernedWitnessTrustRootEstablished !== false
    || result.blockerBoundary.preregisteredRepeatabilityAcceptanceProtocolFrozen !== false
    || result.blockerBoundary.captureQualityMeasurementConstructValidated !== false
    || result.blockerBoundary.inferentialProtocolFrozen !== false
    || result.blockerBoundary.constructValidity !== 'unresolved'
    || result.blockerBoundary.traditionalBinding !== 'unresolved'
    || result.precedentBoundary.refs !== FR166_CRITERION_SPECIFIC_PRECEDENT_REFS
    || result.precedentBoundary.squareBroadFangPathIsCriterionSpecificPrecedentOnly !== true
    || result.precedentBoundary.squareBroadFangTrustInheritedAsEyePairAuthority !== false
    || result.precedentBoundary.silentCrossCriterionTrustReuseAllowed !== false
    || result.decisionBoundary.requestAdditionalParticipantCaptureBeforeNewAuthorityPath !== false
    || result.decisionBoundary.deriveThresholdsFromObservedMultiSessionSeries !== false
    || result.decisionBoundary.retroactiveIndependentSessionPromotionAllowed !== false
    || result.decisionBoundary.independentMultiSessionEvidenceAdmitted !== false
    || result.decisionBoundary.multiSessionIndependenceVerified !== false
    || result.decisionBoundary.repeatabilityPassFailIssued !== false
    || result.decisionBoundary.captureSensitivityPassFailIssued !== false
    || result.decisionBoundary.inferentialStatisticIssued !== false
    || result.decisionBoundary.calibrationIssued !== false
    || result.decisionBoundary.thresholdsIssued !== false
    || result.decisionBoundary.identityMatchingPerformed !== false
    || result.decisionBoundary.biometricTemplateIssued !== false
    || result.decisionBoundary.traditionalSemanticAuthority !== false
    || result.privacyBoundary.rawImageAccepted !== false
    || result.privacyBoundary.rawImagePersisted !== false
    || result.privacyBoundary.rawProviderResponsePersisted !== false
    || result.privacyBoundary.rawLandmarkSetPersisted !== false
    || result.privacyBoundary.derivedFullFaceMetricGeometryPersisted !== false
    || result.privacyBoundary.sourceDigestPersisted !== false
    || result.privacyBoundary.faceEmbeddingPersisted !== false
    || result.privacyBoundary.identityTemplatePersisted !== false
    || result.researchNoteRef !== FR166_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR166_NEXT_FRONTIER
  ) throw new Error('FR-166 issued authority frontier review boundary drift.');
}
