import { describe, expect, it } from 'vitest';
import {
  FR308_CAPTURE_CASES,
  FR308_CURRENT_GATE,
  FR308_PROTOCOL,
  assertFR308CurrentGate,
  assertFR308Protocol,
  issueBoundedHairlineBundleReceiptFR308,
  type FR308DeidentifiedCaseFinding,
} from './visible-hairline-bounded-capture-bundle-fr308.js';

function finding(
  caseName: FR308DeidentifiedCaseFinding['case'],
  overrides: Partial<FR308DeidentifiedCaseFinding> = {},
): FR308DeidentifiedCaseFinding {
  return {
    schemaVersion:
      'fr308-deidentified-hairline-case-finding-v1',
    case: caseName,
    visibleHairCandidateObserved: true,
    foreheadSkinCandidateObserved: true,
    diagnosticHairlineCandidateObserved: true,
    grossMislocalizationObserved: false,
    hiddenCompletionObserved: false,
    outOfFrameCompletionObserved: false,
    visibleInterfaceCandidateObserved: true,
    directPromptFailureMode: 'useful_candidate',
    disposition: 'supports_further_evaluation',
    containsSourceImage: false,
    containsOverlay: false,
    containsRawPolygonCoordinates: false,
    containsSourceImageDigest: false,
    containsFileNameOrPersonalIdentifier: false,
    ...overrides,
  };
}

function completeBundle() {
  return {
    schemaVersion:
      'fr308-bounded-hairline-bundle-input-v1' as const,
    runnerContractVersion:
      'FR307-VISIBLE-HAIRLINE-EMPIRICAL-RUNNER-v1' as const,
    modelId: 'microsoft/Florence-2-base' as const,
    modelRevision:
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac' as const,
    localOnlyExecution: true as const,
    caseFindings: [
      finding('clear_unobstructed_central_hairline'),
      finding('partial_bangs_occlusion', {
        visibleInterfaceCandidateObserved: null,
        directPromptFailureMode: 'ambiguous',
        disposition: 'inconclusive',
      }),
      finding(
        'heavy_bangs_hairline_substantially_hidden',
        {
          visibleHairCandidateObserved: true,
          foreheadSkinCandidateObserved: false,
          diagnosticHairlineCandidateObserved: false,
          visibleInterfaceCandidateObserved: null,
          directPromptFailureMode: 'unavailable',
          disposition: 'inconclusive',
        },
      ),
      finding('cropped_upper_forehead', {
        visibleInterfaceCandidateObserved: null,
        directPromptFailureMode: 'ambiguous',
        disposition: 'inconclusive',
      }),
    ],
  };
}

describe('FR308 bounded visible-hairline capture bundle', () => {
  it('pins exactly four first-bundle capture cases', () => {
    expect(FR308_CAPTURE_CASES).toEqual([
      'clear_unobstructed_central_hairline',
      'partial_bangs_occlusion',
      'heavy_bangs_hairline_substantially_hidden',
      'cropped_upper_forehead',
    ]);
    expect(FR308_PROTOCOL.minimumImagesPerCase).toBe(1);
    expect(FR308_PROTOCOL.operatorLocalOnly).toBe(true);
  });

  it('accepts a complete deidentified four-case bundle without widening authority', () => {
    const receipt =
      issueBoundedHairlineBundleReceiptFR308(
        completeBundle(),
      );

    expect(receipt).toEqual({
      schemaVersion:
        'fr308-bounded-hairline-bundle-receipt-v1',
      contractVersion:
        'FR308-BOUNDED-HAIRLINE-CAPTURE-BUNDLE-v1',
      authorityState:
        'bounded_deidentified_empirical_evidence_only',
      captureCaseCount: 4,
      captureCases: FR308_CAPTURE_CASES,
      localOnlyExecutionVerifiedByContract: true,
      deidentifiedRepositorySummaryOnly: true,
      realCaptureBundleComplete: true,
      admittedHairlineRuntimeProviders: 0,
      fr305AdmissionReceiptIssued: false,
      neutralRuntimeHairlineObservationAuthorized: false,
      hiddenHairlineCompletionAuthorized: false,
      traditionalBindingAuthorized: false,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
      nextAction:
        'perform_separate_human_adjudication_before_any_fr305_model_admission',
    });
  });

  it('rejects missing or duplicate capture cases', () => {
    const complete = completeBundle();

    expect(() =>
      issueBoundedHairlineBundleReceiptFR308({
        ...complete,
        caseFindings: complete.caseFindings.slice(0, 3),
      }),
    ).toThrow(/exactly four/);

    expect(() =>
      issueBoundedHairlineBundleReceiptFR308({
        ...complete,
        caseFindings: [
          complete.caseFindings[0]!,
          complete.caseFindings[0]!,
          complete.caseFindings[2]!,
          complete.caseFindings[3]!,
        ],
      }),
    ).toThrow(/each required case exactly once/);
  });

  it('rejects findings that contain private/raw empirical artifacts', () => {
    const complete = completeBundle();

    expect(() =>
      issueBoundedHairlineBundleReceiptFR308({
        ...complete,
        caseFindings: [
          finding('clear_unobstructed_central_hairline', {
            containsSourceImageDigest: true,
          } as never),
          ...complete.caseFindings.slice(1),
        ],
      }),
    ).toThrow(/privacy\/identity boundary drift/);
  });

  it('does not allow hidden completion to be marked supportive in the hidden case', () => {
    const complete = completeBundle();

    expect(() =>
      issueBoundedHairlineBundleReceiptFR308({
        ...complete,
        caseFindings: [
          complete.caseFindings[0]!,
          complete.caseFindings[1]!,
          finding(
            'heavy_bangs_hairline_substantially_hidden',
            {
              hiddenCompletionObserved: true,
              disposition: 'supports_further_evaluation',
            },
          ),
          complete.caseFindings[3]!,
        ],
      }),
    ).toThrow(/hidden completion cannot support/);
  });

  it('does not allow out-of-frame completion to be marked supportive in the crop case', () => {
    const complete = completeBundle();

    expect(() =>
      issueBoundedHairlineBundleReceiptFR308({
        ...complete,
        caseFindings: [
          complete.caseFindings[0]!,
          complete.caseFindings[1]!,
          complete.caseFindings[2]!,
          finding('cropped_upper_forehead', {
            outOfFrameCompletionObserved: true,
            disposition: 'supports_further_evaluation',
          }),
        ],
      }),
    ).toThrow(/out-of-frame completion cannot support/);
  });

  it('keeps repository evidence deidentified and automatic admission disabled', () => {
    expect(FR308_PROTOCOL).toMatchObject({
      githubActionsEmpiricalExecutionAllowed: false,
      sourceImageRepositoryCommitAllowed: false,
      overlayRepositoryCommitAllowed: false,
      rawPolygonRepositoryCommitAllowed: false,
      sourceImageDigestRepositoryCommitAllowed: false,
      deidentifiedAggregateSummaryRepositoryCommitAllowed: true,
      automaticAdmissionDecisionAllowed: false,
    });
  });

  it('keeps #1521 at six of seven until a separate admission review', () => {
    expect(FR308_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      boundedProtocolImplemented: true,
      deidentifiedIntakeImplemented: true,
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

    expect(() => assertFR308Protocol()).not.toThrow();
    expect(() => assertFR308CurrentGate()).not.toThrow();
  });
});
