import { describe, expect, it } from 'vitest';
import {
  FR307_AUTHORITY_BOUNDARY,
  FR307_CURRENT_GATE,
  FR307_LOCAL_RUNNER,
  FR307_PRIMARY_MODEL,
  FR307_PROMPT_FAMILY,
  assertFR307CurrentGate,
  assertVisibleHairlineEmpiricalRunnerFR307,
} from './visible-hairline-empirical-runner-fr307.js';

describe('FR307 visible hairline empirical runner contract', () => {
  it('pins the exact Florence-2 revision and referring-expression task', () => {
    expect(FR307_PRIMARY_MODEL).toEqual({
      id: 'microsoft/Florence-2-base',
      revision:
        '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
      task: '<REFERRING_EXPRESSION_SEGMENTATION>',
    });
  });

  it('uses the three-prompt empirical family with direct hairline prompt diagnostic only', () => {
    expect(FR307_PROMPT_FAMILY).toEqual([
      {
        key: 'visible_hair',
        prompt: 'visible hair',
        diagnosticOnly: false,
      },
      {
        key: 'forehead_skin',
        prompt: 'forehead skin',
        diagnosticOnly: false,
      },
      {
        key: 'visible_hairline_diagnostic',
        prompt: 'visible hairline',
        diagnosticOnly: true,
      },
    ]);
  });

  it('keeps empirical artifacts local and model download outside normal CI', () => {
    expect(FR307_LOCAL_RUNNER).toMatchObject({
      path:
        'tools/face-reading/hairline/run_florence2_hairline_empirical.py',
      defaultOutputPath:
        '.cache/face-reading/hairline-fr307',
      realModelDownloadInNormalCi: false,
      operatorImageUploadToGitHubActions: false,
      qaOverlayLocalOnly: true,
      rawPolygonBundleLocalOnly: true,
    });
    expect(FR307_LOCAL_RUNNER.selfTestCommand).toContain(
      '--self-test',
    );
  });

  it('does not promote candidate polygons or pair agreement into hairline authority', () => {
    expect(FR307_AUTHORITY_BOUNDARY).toEqual({
      candidateEvidenceOnly: true,
      runtimeHairlineObservationAuthorized: false,
      hairPolygonMayBeCalledHairline: false,
      foreheadSkinPolygonMayBeCalledHairline: false,
      pairAgreementMayBeCalledHairlineValidity: false,
      directHairlinePromptMayBeCalledAuthoritativeBoundary: false,
      hiddenHairlineCompletionAuthorized: false,
      faceOvalSubstitutionAuthorized: false,
      faceMeshTopVertexSubstitutionAuthorized: false,
      numericAcceptanceThresholdAuthorized: false,
      fr305AdmissionReceiptAuthorized: false,
      traditionalBindingAuthorized: false,
      productMaterializationAuthorized: false,
      productionAuthorization: false,
      commerceAuthorization: false,
    });
  });

  it('advances only runner implementation while #1521 remains six of seven', () => {
    expect(FR307_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      empiricalRunnerImplemented: true,
      parserSelfTestImplemented: true,
      empiricalRealCaptureEvidenceCollected: false,
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
      () => assertVisibleHairlineEmpiricalRunnerFR307(),
    ).not.toThrow();
    expect(() => assertFR307CurrentGate()).not.toThrow();
  });
});
