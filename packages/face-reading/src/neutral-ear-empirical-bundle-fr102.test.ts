import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_EMPIRICAL_BUNDLE_SCHEMA_FR102,
  NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102,
} from './neutral-ear-empirical-bundle-fr102.js';

describe('FR102 local Florence-2 ear empirical runner authority', () => {
  it('pins the exact FR101 primary model and local runner', () => {
    expect(NEUTRAL_EAR_EMPIRICAL_BUNDLE_SCHEMA_FR102.modelId).toBe(
      'microsoft/Florence-2-base',
    );
    expect(NEUTRAL_EAR_EMPIRICAL_BUNDLE_SCHEMA_FR102.modelRevision).toBe(
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
    );
    expect(NEUTRAL_EAR_EMPIRICAL_BUNDLE_SCHEMA_FR102.localRunnerPath).toBe(
      'tools/face-reading/ear/run_florence2_ear_empirical.py',
    );
  });

  it('keeps empirical artifacts local and out of standard CI', () => {
    expect(NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102.localOnly).toBe(true);
    expect(
      NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102
        .modelDownloadInStandardCi,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102
        .userImagesAllowedInRepositoryHistory,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102
        .userImagesAllowedInGithubActions,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102
        .outputRootCoveredByGitignore,
    ).toBe(true);
  });

  it('admits no semantic or Production authority', () => {
    expect(
      NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102
        .candidatePolygonMayBeCalledValidatedEarObservation,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102
        .neutralRuntimeEarObservationAuthorized,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102
        .traditionalBindingAuthorized,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102
        .numericAcceptanceThresholdAuthorized,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102.productionAuthorization,
    ).toBe(false);
  });

  it('is ready to request the bounded empirical capture bundle', () => {
    expect(
      NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102.operatorCaptureRequestReady,
    ).toBe(true);
  });
});
