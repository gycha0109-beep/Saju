import {
  NEUTRAL_EAR_RUNTIME_CANDIDATE_AUTHORITY_FR101,
  NEUTRAL_EAR_RUNTIME_EMPIRICAL_PROTOCOL_FR101,
} from './neutral-ear-runtime-candidates-fr101.js';

export const NEUTRAL_EAR_EMPIRICAL_BUNDLE_SCHEMA_FR102 = Object.freeze({
  schemaVersion: 'fr102-neutral-ear-empirical-bundle-v1' as const,
  modelId: 'microsoft/Florence-2-base' as const,
  modelRevision:
    '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac' as const,
  task: '<REFERRING_EXPRESSION_SEGMENTATION>' as const,
  localRunnerPath:
    'tools/face-reading/ear/run_florence2_ear_empirical.py' as const,
  defaultOutputRoot: '.cache/face-reading/ear-fr102' as const,
  requiredRecordFields: [
    'sourceImage.sha256',
    'sourceImage.width',
    'sourceImage.height',
    'capture.case',
    'capture.frontCameraMirrored',
    'request.requestedSide',
    'request.prompt',
    'result.status',
    'result.polygons',
    'result.rawParsedOutput',
    'runtime',
    'authority',
  ] as const,
  resultStates: ['candidate_polygon', 'unavailable'] as const,
});

export const NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102 =
  Object.freeze({
    phase: 'FR102_LOCAL_EMPIRICAL_RUNNER' as const,
    predecessorPrimaryCandidate:
      NEUTRAL_EAR_RUNTIME_CANDIDATE_AUTHORITY_FR101.primaryCandidate,
    empiricalProtocolRef:
      NEUTRAL_EAR_RUNTIME_EMPIRICAL_PROTOCOL_FR101.protocolId,
    localOnly: true as const,
    modelDownloadInStandardCi: false as const,
    userImagesAllowedInRepositoryHistory: false as const,
    userImagesAllowedInGithubActions: false as const,
    qaOverlaysAllowedInRepositoryHistory: false as const,
    outputRootCoveredByGitignore: true as const,
    parserSelfTestInStandardCi: true as const,
    sideSeparatedInference: true as const,
    mirrorProvenanceRequiredWhenApplicable: true as const,
    candidatePolygonMayBeCalledValidatedEarObservation: false as const,
    neutralRuntimeEarObservationAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    appearanceInferenceAuthorized: false as const,
    depthOrFullnessInferenceAuthorized: false as const,
    numericAcceptanceThresholdAuthorized: false as const,
    productionAuthorization: false as const,
    operatorCaptureRequestReady: true as const,
    nextGate:
      'run_real_capture_empirical_bundle_and_version_failure_modes_without_committing_images' as const,
  });
