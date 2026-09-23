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
      fr257SameFrameGeometryAttributionSidecarEnabled: true as const,
      fr266SameFrameEyeTiltDiagnosticSidecarEnabled: true as const,
      singleStartActionRecordsFR240Consent: true as const,
      cameraPreviewHiddenUntilStartAction: true as const,
      shutterActionCarriesPerCaptureReconfirmationAndQualityAttestation: true as const,
      captureUiRemainsPrimaryAfterStart: true as const,
      session2ConfirmationStaysInCaptureUi: true as const,
      cameraViewportDominantAfterStart: true as const,
      captureInstructionPanelConsumesNoViewportHeight: true as const,
      challengePresentationUsesNonLayoutOverlay: true as const,
    }),
    persistence: Object.freeze({
      rawMediaPersisted: false as const,
      rawImageDigestPersisted: false as const,
      rawScreenLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      scalarCaptureGeometrySidecarExportAllowed: true as const,
      scalarEyeTiltDiagnosticSidecarExportAllowed: true as const,
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
      'collect_controlled_same_frame_screen_vs_fr76_eye_tilt_diagnostics_then_adjudicate_capture_envelope_vs_metric_redesign' as const,
  });
}
