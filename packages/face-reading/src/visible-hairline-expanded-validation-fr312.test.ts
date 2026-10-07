import { describe, expect, it } from 'vitest';
import {
  FR312_CURRENT_GATE,
  FR312_EXPANDED_CASES,
  FR312_PROTOCOL,
  adjudicateExpandedHairlineValidationFR312,
  assertFR312CurrentGate,
  assertFR312Protocol,
  type FR312DeidentifiedCaptureFinding,
} from './visible-hairline-expanded-validation-fr312.js';
import type {
  FR310AdjudicationReceipt,
} from './visible-hairline-evidence-adjudicator-fr310.js';

const prerequisite: FR310AdjudicationReceipt = {
  schemaVersion:
    'fr310-hairline-evidence-adjudication-receipt-v1',
  contractVersion:
    'FR310-HAIRLINE-EVIDENCE-ADJUDICATOR-v1',
  authorityState:
    'bounded_evidence_adjudication_only',
  disposition:
    'eligible_for_expanded_validation',
  failureReasons: [],
  hardRejectTriggered: false,
  repeatRequired: false,
  expandedValidationEligible: true,
  reviewedCaseCount: 4,
  candidateId:
    'candidate.hairline.florence2_base.referring_segmentation.fr306',
  runtimeProviderId: 'microsoft/Florence-2-base',
  exactRevision:
    '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
  runnerContractVersion:
    'FR307-VISIBLE-HAIRLINE-EMPIRICAL-RUNNER-v1',
  exactModelRevisionBound: true,
  deidentifiedBoundarySatisfied: true,
  nextAction:
    'design_and_run_fr311_expanded_validation',
  authorityBoundary: {
    fr305AdmissionReceiptIssued: false,
    validatedHairlineRuntimeProviderAdmitted: false,
    neutralRuntimeHairlineObservationAuthorized: false,
    traditionalHairlineBindingIssued: false,
    threeDivisionsSpanExecutionReady: false,
    productColumnMaterialized: false,
    productionActivated: false,
    commerceActivated: false,
  },
};

function capture(
  caseName: FR312DeidentifiedCaptureFinding['case'],
  captureOrdinal: number,
  opaqueSessionLabel: string,
  overrides: Partial<FR312DeidentifiedCaptureFinding> = {},
): FR312DeidentifiedCaptureFinding {
  return {
    schemaVersion:
      'fr312-deidentified-expanded-capture-finding-v1',
    case: caseName,
    captureOrdinal,
    opaqueSessionLabel,
    independentCaptureAttested: true,
    derivedFromAnotherCapture: false,
    visibleHairCandidateObserved: true,
    foreheadSkinCandidateObserved: true,
    diagnosticHairlineCandidateObserved: true,
    visibleInterfaceCandidateObserved: true,
    grossMislocalizationObserved: false,
    hiddenCompletionObserved: false,
    outOfFrameCompletionObserved: false,
    directPromptAuthoritativeHallucinationRisk: false,
    disposition: 'supports_further_evaluation',
    containsSourceImage: false,
    containsOverlay: false,
    containsRawPolygonCoordinates: false,
    containsSourceImageDigest: false,
    containsFileName: false,
    containsSubjectIdentifier: false,
    containsDemographicAttributes: false,
    ...overrides,
  };
}

function completeCaptures(): FR312DeidentifiedCaptureFinding[] {
  const sessions = ['session-a', 'session-b', 'session-c'];
  const result: FR312DeidentifiedCaptureFinding[] = [];

  FR312_EXPANDED_CASES.forEach((caseName, index) => {
    result.push(
      capture(
        caseName,
        1,
        sessions[index % sessions.length]!,
      ),
      capture(
        caseName,
        2,
        sessions[(index + 1) % sessions.length]!,
      ),
    );
  });

  return result;
}

function input(
  captures: readonly FR312DeidentifiedCaptureFinding[],
  overrides: Record<string, unknown> = {},
) {
  return {
    schemaVersion:
      'fr312-expanded-hairline-validation-input-v1' as const,
    prerequisiteAdjudication: prerequisite,
    modelId: 'microsoft/Florence-2-base' as const,
    modelRevision:
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac' as const,
    humanReviewCompleted: true,
    sessionLabelsOpaque: true,
    demographicAttributesCollected: false as const,
    subjectCoverage: 'single_subject' as const,
    captures,
    ...overrides,
  };
}

describe('FR312 expanded visible-hairline validation', () => {
  it('freezes six remaining cases, two independent captures each and three sessions minimum', () => {
    expect(FR312_EXPANDED_CASES).toEqual([
      'm_shaped_or_widows_peak_visible_contour',
      'side_recession_or_asymmetric_visible_hairline',
      'upper_hairline_visibility_loss',
      'dark_hair_dark_background',
      'light_hair_or_low_local_contrast',
      'ordinary_indoor_illumination_variation',
    ]);
    expect(FR312_PROTOCOL).toMatchObject({
      minimumIndependentCapturesPerCase: 2,
      minimumTotalCaptures: 12,
      minimumDistinctSessionLabels: 3,
      derivedCaptureCountsAsIndependent: false,
      demographicAttributesCollected: false,
      singleSubjectCanEstablishRepresentativeOrdinaryRgb:
        false,
      expandedValidationCanIssueFR305Admission: false,
    });
  });

  it('hard-rejects any hidden completion in expanded validation', () => {
    const captures = completeCaptures();
    captures[0] = capture(
      captures[0]!.case,
      captures[0]!.captureOrdinal,
      captures[0]!.opaqueSessionLabel,
      {
        hiddenCompletionObserved: true,
        disposition:
          'rejects_current_candidate_behavior',
      },
    );

    const result =
      adjudicateExpandedHairlineValidationFR312(
        input(captures),
      );

    expect(result).toMatchObject({
      disposition: 'reject_current_candidate',
      hardRejectTriggered: true,
      repeatRequired: false,
      modelAdmissionReviewEligible: false,
      nextAction: 'evaluate_fr306_fallback_candidate',
    });
    expect(result.failureReasons).toEqual(
      expect.arrayContaining([
        'HIDDEN_COMPLETION',
        'CAPTURE_EXPLICITLY_REJECTED',
      ]),
    );
  });

  it('hard-rejects direct-prompt authoritative hallucination risk', () => {
    const captures = completeCaptures();
    captures[3] = capture(
      captures[3]!.case,
      captures[3]!.captureOrdinal,
      captures[3]!.opaqueSessionLabel,
      {
        directPromptAuthoritativeHallucinationRisk:
          true,
      },
    );

    const result =
      adjudicateExpandedHairlineValidationFR312(
        input(captures),
      );

    expect(result.disposition).toBe(
      'reject_current_candidate',
    );
    expect(result.failureReasons).toContain(
      'DIRECT_PROMPT_AUTHORITATIVE_HALLUCINATION_RISK',
    );
  });

  it('requires repeat when total captures or per-case repeats are insufficient', () => {
    const captures = completeCaptures().slice(0, 11);

    const result =
      adjudicateExpandedHairlineValidationFR312(
        input(captures),
      );

    expect(result).toMatchObject({
      disposition: 'repeat_expanded_validation',
      hardRejectTriggered: false,
      repeatRequired: true,
      modelAdmissionReviewEligible: false,
      nextAction:
        'repeat_fr312_expanded_validation_without_retuning',
    });
    expect(result.failureReasons).toEqual(
      expect.arrayContaining([
        'CAPTURE_COUNT_BELOW_TWELVE',
        'CASE_CAPTURE_COUNT_BELOW_TWO',
      ]),
    );
  });

  it('requires repeat when fewer than three opaque sessions are represented', () => {
    const captures = completeCaptures().map(
      (entry, index) =>
        capture(
          entry.case,
          entry.captureOrdinal,
          index % 2 === 0
            ? 'session-a'
            : 'session-b',
        ),
    );

    const result =
      adjudicateExpandedHairlineValidationFR312(
        input(captures),
      );

    expect(result.disposition).toBe(
      'repeat_expanded_validation',
    );
    expect(result.failureReasons).toContain(
      'SESSION_COUNT_BELOW_THREE',
    );
  });

  it('requires repeat when a case is unavailable or inconclusive across repeats', () => {
    const captures = completeCaptures();
    captures[0] = capture(
      captures[0]!.case,
      captures[0]!.captureOrdinal,
      captures[0]!.opaqueSessionLabel,
      {
        visibleInterfaceCandidateObserved: null,
        disposition: 'unavailable',
      },
    );

    const result =
      adjudicateExpandedHairlineValidationFR312(
        input(captures),
      );

    expect(result.disposition).toBe(
      'repeat_expanded_validation',
    );
    expect(result.failureReasons).toContain(
      'CASE_REPEATABILITY_INCONCLUSIVE',
    );
  });

  it('requires repeat when capture independence is not attested or a derived capture is used', () => {
    const captures = completeCaptures();
    captures[0] = capture(
      captures[0]!.case,
      captures[0]!.captureOrdinal,
      captures[0]!.opaqueSessionLabel,
      {
        independentCaptureAttested: false,
        derivedFromAnotherCapture: true,
      },
    );

    const result =
      adjudicateExpandedHairlineValidationFR312(
        input(captures),
      );

    expect(result.disposition).toBe(
      'repeat_expanded_validation',
    );
    expect(result.failureReasons).toEqual(
      expect.arrayContaining([
        'CAPTURE_INDEPENDENCE_UNSATISFIED',
        'DERIVED_CAPTURE_USED_AS_INDEPENDENT',
      ]),
    );
  });

  it('permits only model-admission review after a clean expanded engineering bundle', () => {
    const result =
      adjudicateExpandedHairlineValidationFR312(
        input(completeCaptures()),
      );

    expect(result).toMatchObject({
      disposition:
        'eligible_for_model_admission_review',
      failureReasons: [],
      hardRejectTriggered: false,
      repeatRequired: false,
      modelAdmissionReviewEligible: true,
      captureCount: 12,
      distinctSessionCount: 3,
      eachCaseHasAtLeastTwoIndependentCaptures: true,
      subjectCoverage: 'single_subject',
      representativeOrdinaryRgbReady: false,
      representativeCoverageReviewRequired: true,
      candidateId:
        'candidate.hairline.florence2_base.referring_segmentation.fr306',
      runtimeProviderId: 'microsoft/Florence-2-base',
      exactRevision:
        '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
      runnerContractVersion:
        'FR307-VISIBLE-HAIRLINE-EMPIRICAL-RUNNER-v1',
      exactModelRevisionBound: true,
      deidentifiedBoundarySatisfied: true,
      nextAction:
        'design_fr313_model_admission_review_with_representative_coverage_gap',
    });

    expect(result.authorityBoundary).toEqual({
      fr305AdmissionReceiptIssued: false,
      validatedHairlineRuntimeProviderAdmitted: false,
      neutralRuntimeHairlineObservationAuthorized: false,
      traditionalHairlineBindingIssued: false,
      threeDivisionsSpanExecutionReady: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('accepts the registered multi-signal candidate when FR310 and FR312 identities match', () => {
    const multiSignalPrerequisite: FR310AdjudicationReceipt = {
      ...prerequisite,
      candidateId:
        'candidate.hairline.multisignal_visible_interface.fr306',
      runtimeProviderId:
        'candidate.hairline.multisignal_visible_interface.fr306',
      exactRevision: '0.4.0',
      runnerContractVersion:
        'MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1',
    };

    const result =
      adjudicateExpandedHairlineValidationFR312(
        input(completeCaptures(), {
          prerequisiteAdjudication:
            multiSignalPrerequisite,
          modelId:
            'candidate.hairline.multisignal_visible_interface.fr306',
          modelRevision: '0.4.0',
        }),
      );

    expect(result).toMatchObject({
      disposition:
        'eligible_for_model_admission_review',
      candidateId:
        'candidate.hairline.multisignal_visible_interface.fr306',
      runtimeProviderId:
        'candidate.hairline.multisignal_visible_interface.fr306',
      exactRevision: '0.4.0',
      runnerContractVersion:
        'MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1',
      modelAdmissionReviewEligible: true,
    });
  });

  it('rejects candidate swapping between FR310 and FR312', () => {
    expect(() =>
      adjudicateExpandedHairlineValidationFR312(
        input(completeCaptures(), {
          modelId:
            'candidate.hairline.multisignal_visible_interface.fr306',
          modelRevision: '0.4.0',
        }),
      ),
    ).toThrow();
  });

  it('never treats single-subject engineering evidence as representative ordinary RGB coverage', () => {
    const result =
      adjudicateExpandedHairlineValidationFR312(
        input(completeCaptures(), {
          subjectCoverage: 'single_subject',
        }),
      );

    expect(result.modelAdmissionReviewEligible).toBe(
      true,
    );
    expect(result.representativeOrdinaryRgbReady).toBe(
      false,
    );
    expect(
      result.representativeCoverageReviewRequired,
    ).toBe(true);
  });

  it('rejects duplicate capture keys instead of counting duplicated evidence', () => {
    const captures = completeCaptures();
    captures[1] = captures[0]!;

    expect(() =>
      adjudicateExpandedHairlineValidationFR312(
        input(captures),
      ),
    ).toThrow(/duplicate capture key detected/);
  });

  it('keeps demographic attributes outside the intake boundary', () => {
    expect(() =>
      adjudicateExpandedHairlineValidationFR312(
        input(completeCaptures(), {
          demographicAttributesCollected: true,
        }) as never,
      ),
    ).toThrow(
      /demographic attributes must not be collected/,
    );
  });

  it('keeps the repository gate at six of seven before any real expanded bundle is executed', () => {
    expect(FR312_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      expandedValidationProtocolImplemented: true,
      expandedValidationExecuted: false,
      representativeOrdinaryRgbReady: false,
      modelAdmissionReviewEligible: false,
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

    expect(() => assertFR312Protocol()).not.toThrow();
    expect(() => assertFR312CurrentGate()).not.toThrow();
  });
});
