import { describe, expect, it } from 'vitest';
import {
  FR306_CURRENT_GATE,
  FR306_EMPIRICAL_CAPTURE_CASES,
  FR306_EMPIRICAL_REVIEW_QUESTIONS,
  FR306_PRIVACY_BOUNDARY,
  FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATES,
  assertFR306CurrentGate,
  assertVisibleHairlineRuntimeCandidatesFR306,
  resolveFR306EmpiricalRuntimeCandidate,
} from './visible-hairline-runtime-candidates-fr306.js';

describe('FR306 visible hairline runtime candidate selection', () => {
  it('pins Florence-2 base as the primary empirical candidate at the already-governed exact revision', () => {
    const primary =
      FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATES.find(
        (candidate) =>
          candidate.state === 'primary_empirical_candidate',
      );

    expect(primary).toMatchObject({
      candidateId:
        'candidate.hairline.florence2_base.referring_segmentation.fr306',
      mayIssueFR305AdmissionReceipt: false,
      runtimeHairlineObservationAuthorized: false,
      hiddenHairlineCompletionAuthorized: false,
      productionAuthorization: false,
    });
    expect(primary?.components).toEqual([
      {
        artifact: 'microsoft/Florence-2-base',
        revision:
          '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
        declaredLicense: 'MIT',
        role:
          'text_referring_expression_to_visible_region_polygon_candidate',
      },
    ]);
    expect(primary?.promptPolicy).toEqual(
      expect.arrayContaining([
        'primary_region_prompt=visible hair',
        'paired_region_prompt=forehead skin',
        'diagnostic_direct_boundary_prompt=visible hairline',
      ]),
    );
  });

  it('pins the existing Grounding-DINO plus SAM2 revisions as fallback only', () => {
    const fallback =
      FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATES.find(
        (candidate) =>
          candidate.state === 'fallback_empirical_candidate',
      );

    expect(fallback?.components).toEqual([
      {
        artifact: 'IDEA-Research/grounding-dino-base',
        revision:
          '12bdfa3120f3e7ec7b434d90674b3396eccf88eb',
        declaredLicense: 'Apache-2.0',
        role:
          'open_vocabulary_visible_hair_or_forehead_region_grounding_candidate',
      },
      {
        artifact: 'facebook/sam2.1-hiera-small',
        revision:
          'e07df6aa19f5c6545121551bf89957b7663ee715',
        declaredLicense: 'Apache-2.0',
        role:
          'grounded_box_to_region_mask_refinement_candidate',
      },
    ]);
    expect(
      fallback?.runtimeHairlineObservationAuthorized,
    ).toBe(false);
  });

  it('registers the deterministic multi-signal v3.2 candidate without widening authority', () => {
    const candidate =
      FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATES.find(
        (entry) =>
          entry.state === 'additional_empirical_candidate',
      );

    expect(candidate).toMatchObject({
      candidateId:
        'candidate.hairline.multisignal_visible_interface.fr306',
      runtimeProviderId:
        'candidate.hairline.multisignal_visible_interface.fr306',
      exactRevision: '0.3.0',
      runnerContractVersion:
        'MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1',
      mayIssueFR305AdmissionReceipt: false,
      runtimeHairlineObservationAuthorized: false,
      hiddenHairlineCompletionAuthorized: false,
      productionAuthorization: false,
    });
    expect(candidate?.components[0]?.artifact).toBe(
      'repo:tools/face-reading/hairline/run_multisignal_visible_hairline_candidate.py',
    );
  });

  it('resolves only an exact registered empirical runtime identity', () => {
    expect(
      resolveFR306EmpiricalRuntimeCandidate(
        'microsoft/Florence-2-base',
        '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
        'FR307-VISIBLE-HAIRLINE-EMPIRICAL-RUNNER-v1',
      ).candidateId,
    ).toBe(
      'candidate.hairline.florence2_base.referring_segmentation.fr306',
    );

    expect(
      resolveFR306EmpiricalRuntimeCandidate(
        'candidate.hairline.multisignal_visible_interface.fr306',
        '0.3.0',
        'MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1',
      ).state,
    ).toBe('additional_empirical_candidate');

    expect(() =>
      resolveFR306EmpiricalRuntimeCandidate(
        'candidate.hairline.multisignal_visible_interface.fr306',
        '0.3.1',
        'MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1',
      ),
    ).toThrow();
  });

  it('excludes CelebAMask-HQ-derived face parsing from the product path', () => {
    const excluded =
      FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATES.find(
        (candidate) =>
          candidate.state === 'excluded_product_path',
      );

    expect(excluded?.candidateId).toBe(
      'excluded.hairline.celebamask_hq_face_parsing.fr306',
    );
    expect(
      excluded?.components[0]?.declaredLicense,
    ).toContain('non-commercial');
    expect(excluded?.mayIssueFR305AdmissionReceipt).toBe(
      false,
    );
    expect(excluded?.productionAuthorization).toBe(false);
  });

  it('freezes capture cases around visibility, occlusion, crop and contrast failure modes', () => {
    expect(FR306_EMPIRICAL_CAPTURE_CASES).toHaveLength(10);
    expect(FR306_EMPIRICAL_CAPTURE_CASES).toEqual(
      expect.arrayContaining([
        'clear_unobstructed_central_hairline',
        'partial_bangs_occlusion',
        'heavy_bangs_hairline_substantially_hidden',
        'cropped_upper_forehead',
        'dark_hair_dark_background',
        'light_hair_or_low_local_contrast',
      ]),
    );
    expect(FR306_EMPIRICAL_REVIEW_QUESTIONS).toEqual(
      expect.arrayContaining([
        'partial occlusion remains partial rather than hallucinated completion',
        'substantially hidden hairline returns unavailable rather than completed boundary',
      ]),
    );
  });

  it('keeps empirical face images and raw candidate artifacts outside repository and CI', () => {
    expect(FR306_PRIVACY_BOUNDARY).toEqual({
      sourceImagesRemainLocal: true,
      qaOverlaysRemainLocal: true,
      rawPolygonBundlesRemainLocal: true,
      privateImageDigestsEnterGitHistory: false,
      githubActionsReceiveOperatorImages: false,
      defaultOutputPath:
        '.cache/face-reading/hairline-fr306',
      repositoryMayPersist:
        'aggregate_non_identifying_failure_mode_conclusions_only',
    });
  });

  it('preserves FR305 and #1521 at six of seven until empirical admission evidence exists', () => {
    expect(FR306_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      empiricalRunnerImplemented: false,
      empiricalRealCaptureEvidenceCollected: false,
      additionalCandidate:
        'candidate.hairline.multisignal_visible_interface.fr306',
      admittedHairlineRuntimeProviders: 0,
      fr305AdmissionReceiptIssued: false,
      handoffReadyNeutralReferenceCapabilityCount: 6,
      remainingNeutralReferenceCapabilityCount: 1,
      traditionalBindingAdmittedCount: 0,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(
      () => assertVisibleHairlineRuntimeCandidatesFR306(),
    ).not.toThrow();
    expect(() => assertFR306CurrentGate()).not.toThrow();
  });
});
