export const FR251_CONTRACT_VERSION =
  'FR251-LOCALHOST-ONE-PERSON-DRY-RUN-OPERATOR-SURFACE-v1' as const;

export const FR251_OPERATOR_ROUTE = '/fr251/' as const;

export function getLocalhostDryRunOperatorSurfaceContractFR251() {
  return Object.freeze({
    schemaVersion: 'fr251-localhost-dry-run-operator-surface-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR251_CONTRACT_VERSION,
    route: FR251_OPERATOR_ROUTE,
    runtime: Object.freeze({
      sameBrowserRealmAuthorityChain: 'FR237_through_FR250' as const,
      callerOwnedMesh6HCamera: true as const,
      exactSessionCount: 2 as const,
      exactSlotsPerSession: 2 as const,
      challengeDisplayedBeforeShutterEnabled: true as const,
      explicitOperatorShutterRequired: true as const,
      fr240ConsentCollectedBeforeCameraExecution: true as const,
      fr243ConsentReconfirmationPerCapture: true as const,
      fr247QualityObservationPerCapture: true as const,
      session2TemporalSeparationOperatorConfirmationRequired: true as const,
      technicalFailureAfterChallengeFailsClosed: true as const,
    }),
    persistence: Object.freeze({
      rawMediaPersisted: false as const,
      rawImageDigestPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      sanitizedFr243RecordsExportAllowed: true as const,
      sanitizedMechanicsReviewExportAllowed: true as const,
    }),
    authorityBoundary: Object.freeze({
      actualParticipantActionRequired: true as const,
      actualLiveCameraInputRequired: true as const,
      challengePresentationIndependentlyVerified: false as const,
      temporalSeparationIndependentlyVerified: false as const,
      participantIdentityIndependentlyVerified: false as const,
      captureQualityConstructValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      interpretationValidityEstablished: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier:
      'execute_first_actual_fr251_four_slot_operator_attested_dry_run_with_user_camera_action' as const,
  });
}
