import { describe, expect, it } from 'vitest';
import {
  issueBoundedHairlineBundleReceiptFR308,
  type FR308DeidentifiedCaseFinding,
} from './visible-hairline-bounded-capture-bundle-fr308.js';
import {
  FR310_CURRENT_GATE,
  adjudicateHairlineEvidenceFR310,
  assertFR310CurrentGate,
  type FR310HumanReviewAttestation,
} from './visible-hairline-evidence-adjudicator-fr310.js';

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

function findings(
  overrides: Partial<
    Record<
      FR308DeidentifiedCaseFinding['case'],
      Partial<FR308DeidentifiedCaseFinding>
    >
  > = {},
): readonly FR308DeidentifiedCaseFinding[] {
  return [
    finding(
      'clear_unobstructed_central_hairline',
      overrides.clear_unobstructed_central_hairline,
    ),
    finding(
      'partial_bangs_occlusion',
      overrides.partial_bangs_occlusion,
    ),
    finding(
      'heavy_bangs_hairline_substantially_hidden',
      overrides.heavy_bangs_hairline_substantially_hidden,
    ),
    finding(
      'cropped_upper_forehead',
      overrides.cropped_upper_forehead,
    ),
  ];
}

function review(
  overrides: Partial<FR310HumanReviewAttestation> = {},
): FR310HumanReviewAttestation {
  return {
    schemaVersion:
      'fr310-hairline-human-review-attestation-v1',
    completed: true,
    reviewOutputDeidentified: true,
    sourceImageAbsent: true,
    overlayAbsent: true,
    rawPolygonCoordinatesAbsent: true,
    sourceImageDigestAbsent: true,
    fileNameOrPersonalIdentifierAbsent: true,
    assessmentBlockedCases: [],
    directPromptAuthoritativeMisinterpretationRiskCases:
      [],
    ...overrides,
  };
}

function input(
  caseFindings: readonly FR308DeidentifiedCaseFinding[],
  humanReview: FR310HumanReviewAttestation = review(),
) {
  const bundleReceipt =
    issueBoundedHairlineBundleReceiptFR308({
      schemaVersion:
        'fr308-bounded-hairline-bundle-input-v1',
      runnerContractVersion:
        'FR307-VISIBLE-HAIRLINE-EMPIRICAL-RUNNER-v1',
      modelId: 'microsoft/Florence-2-base',
      modelRevision:
        '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
      localOnlyExecution: true,
      caseFindings,
    });

  return {
    schemaVersion:
      'fr310-hairline-evidence-adjudication-input-v1' as const,
    bundleReceipt,
    caseFindings,
    modelId: 'microsoft/Florence-2-base' as const,
    modelRevision:
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac' as const,
    humanReview,
  };
}

describe('FR310 visible hairline evidence adjudicator', () => {
  it('hard-rejects the current candidate on clear-case gross mislocalization', () => {
    const result = adjudicateHairlineEvidenceFR310(
      input(
        findings({
          clear_unobstructed_central_hairline: {
            grossMislocalizationObserved: true,
            disposition:
              'rejects_current_candidate_behavior',
          },
        }),
      ),
    );

    expect(result).toMatchObject({
      disposition: 'reject_current_candidate',
      hardRejectTriggered: true,
      repeatRequired: false,
      expandedValidationEligible: false,
      nextAction: 'evaluate_fr306_fallback_candidate',
    });
    expect(result.failureReasons).toEqual(
      expect.arrayContaining([
        'CLEAR_CASE_REJECTED',
        'CLEAR_GROSS_MISLOCALIZATION',
      ]),
    );
  });

  it('hard-rejects hidden completion in the substantially-hidden case', () => {
    const result = adjudicateHairlineEvidenceFR310(
      input(
        findings({
          heavy_bangs_hairline_substantially_hidden: {
            hiddenCompletionObserved: true,
            disposition:
              'rejects_current_candidate_behavior',
          },
        }),
      ),
    );

    expect(result.disposition).toBe(
      'reject_current_candidate',
    );
    expect(result.failureReasons).toEqual(
      expect.arrayContaining([
        'HIDDEN_CASE_REJECTED',
        'HIDDEN_CASE_HIDDEN_COMPLETION',
      ]),
    );
  });

  it('hard-rejects a hidden-case direct-prompt hallucination when human review identifies authoritative-boundary risk', () => {
    const result = adjudicateHairlineEvidenceFR310(
      input(
        findings({
          heavy_bangs_hairline_substantially_hidden: {
            directPromptFailureMode: 'hallucination',
          },
        }),
        review({
          directPromptAuthoritativeMisinterpretationRiskCases:
            [
              'heavy_bangs_hairline_substantially_hidden',
            ],
        }),
      ),
    );

    expect(result.disposition).toBe(
      'reject_current_candidate',
    );
    expect(result.failureReasons).toContain(
      'HIDDEN_CASE_DIRECT_PROMPT_HALLUCINATION_RISK',
    );
  });

  it('requires a bounded re-run when two or more cases remain inconclusive', () => {
    const result = adjudicateHairlineEvidenceFR310(
      input(
        findings({
          partial_bangs_occlusion: {
            visibleInterfaceCandidateObserved: null,
            directPromptFailureMode: 'ambiguous',
            disposition: 'inconclusive',
          },
          cropped_upper_forehead: {
            visibleInterfaceCandidateObserved: null,
            directPromptFailureMode: 'ambiguous',
            disposition: 'inconclusive',
          },
        }),
      ),
    );

    expect(result).toMatchObject({
      disposition: 'repeat_bounded_bundle',
      hardRejectTriggered: false,
      repeatRequired: true,
      expandedValidationEligible: false,
      nextAction:
        'repeat_fr308_bounded_bundle_without_retuning',
    });
    expect(result.failureReasons).toEqual(
      expect.arrayContaining([
        'PARTIAL_BANGS_INCONCLUSIVE_WITHOUT_VISIBLE_INTERFACE',
        'TWO_OR_MORE_CASES_INCONCLUSIVE',
      ]),
    );
  });

  it('requires a bounded re-run when human review is incomplete or assessment is blocked', () => {
    const result = adjudicateHairlineEvidenceFR310(
      input(
        findings(),
        review({
          completed: false,
          assessmentBlockedCases: [
            'cropped_upper_forehead',
          ],
        }),
      ),
    );

    expect(result.disposition).toBe(
      'repeat_bounded_bundle',
    );
    expect(result.failureReasons).toEqual(
      expect.arrayContaining([
        'HUMAN_REVIEW_INCOMPLETE',
        'CROP_CASE_ASSESSMENT_BLOCKED',
      ]),
    );
  });

  it('requires a bounded re-run when the review output privacy boundary is not satisfied', () => {
    const result = adjudicateHairlineEvidenceFR310(
      input(
        findings(),
        review({
          reviewOutputDeidentified: false,
          sourceImageDigestAbsent: false,
        }),
      ),
    );

    expect(result.disposition).toBe(
      'repeat_bounded_bundle',
    );
    expect(
      result.deidentifiedBoundarySatisfied,
    ).toBe(false);
    expect(result.failureReasons).toContain(
      'REVIEW_OUTPUT_PRIVACY_BOUNDARY_UNSATISFIED',
    );
  });

  it('permits only FR311 expanded validation when the bounded four-case evidence clears the first gate', () => {
    const result = adjudicateHairlineEvidenceFR310(
      input(
        findings({
          heavy_bangs_hairline_substantially_hidden: {
            diagnosticHairlineCandidateObserved: false,
            visibleInterfaceCandidateObserved: null,
            directPromptFailureMode: 'unavailable',
            disposition:
              'supports_further_evaluation',
          },
          cropped_upper_forehead: {
            visibleInterfaceCandidateObserved: null,
            directPromptFailureMode: 'ambiguous',
            disposition:
              'supports_further_evaluation',
          },
        }),
      ),
    );

    expect(result).toMatchObject({
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

  it('accepts a registered multi-signal candidate when FR308 and FR310 identities match', () => {
    const caseFindings = findings({
      heavy_bangs_hairline_substantially_hidden: {
        diagnosticHairlineCandidateObserved: false,
        visibleInterfaceCandidateObserved: null,
        directPromptFailureMode: 'unavailable',
        disposition: 'supports_further_evaluation',
      },
      cropped_upper_forehead: {
        visibleInterfaceCandidateObserved: null,
        directPromptFailureMode: 'unavailable',
        disposition: 'supports_further_evaluation',
      },
    });
    const bundleReceipt =
      issueBoundedHairlineBundleReceiptFR308({
        schemaVersion:
          'fr308-bounded-hairline-bundle-input-v1',
        runnerContractVersion:
          'MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1',
        modelId:
          'candidate.hairline.multisignal_visible_interface.fr306',
        modelRevision: '0.3.0',
        localOnlyExecution: true,
        caseFindings,
      });

    const result = adjudicateHairlineEvidenceFR310({
      schemaVersion:
        'fr310-hairline-evidence-adjudication-input-v1',
      bundleReceipt,
      caseFindings,
      modelId:
        'candidate.hairline.multisignal_visible_interface.fr306',
      modelRevision: '0.3.0',
      humanReview: review(),
    });

    expect(result).toMatchObject({
      disposition: 'eligible_for_expanded_validation',
      candidateId:
        'candidate.hairline.multisignal_visible_interface.fr306',
      runtimeProviderId:
        'candidate.hairline.multisignal_visible_interface.fr306',
      exactRevision: '0.3.0',
      runnerContractVersion:
        'MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1',
      expandedValidationEligible: true,
    });
  });

  it('rejects an exact-model revision mismatch before adjudication', () => {
    const base = input(findings());

    expect(() =>
      adjudicateHairlineEvidenceFR310({
        ...base,
        modelRevision: 'different-revision',
      } as never),
    ).toThrow(/registered empirical candidate/);
  });

  it('rejects candidate swapping between FR308 and FR310', () => {
    const base = input(findings());

    expect(() =>
      adjudicateHairlineEvidenceFR310({
        ...base,
        modelId:
          'candidate.hairline.multisignal_visible_interface.fr306',
        modelRevision: '0.3.0',
      }),
    ).toThrow();
  });

  it('keeps the current repository gate at six of seven with no real adjudication executed', () => {
    expect(FR310_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      adjudicatorImplemented: true,
      adjudicationExecuted: false,
      empiricalRealCaptureEvidenceCollected: false,
      expandedValidationEligible: false,
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

    expect(() => assertFR310CurrentGate()).not.toThrow();
  });
});
