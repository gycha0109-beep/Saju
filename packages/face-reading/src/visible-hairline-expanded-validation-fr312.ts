import {
  FR310_HAIRLINE_EVIDENCE_ADJUDICATOR_CONTRACT_VERSION,
  type FR310AdjudicationReceipt,
} from './visible-hairline-evidence-adjudicator-fr310.js';
import {
  resolveFR306EmpiricalRuntimeCandidate,
} from './visible-hairline-runtime-candidates-fr306.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR312_EXPANDED_HAIRLINE_VALIDATION_CONTRACT_VERSION =
  'FR312-EXPANDED-HAIRLINE-VALIDATION-v1.1' as const;

export const FR312_EXPANDED_CASES = Object.freeze([
  'm_shaped_or_widows_peak_visible_contour',
  'side_recession_or_asymmetric_visible_hairline',
  'upper_hairline_visibility_loss',
  'dark_hair_dark_background',
  'light_hair_or_low_local_contrast',
  'ordinary_indoor_illumination_variation',
] as const);

export type FR312ExpandedCase =
  (typeof FR312_EXPANDED_CASES)[number];

export type FR312CaptureDisposition =
  | 'supports_further_evaluation'
  | 'inconclusive'
  | 'unavailable'
  | 'rejects_current_candidate_behavior';

export type FR312SubjectCoverage =
  | 'single_subject'
  | 'multiple_subjects'
  | 'unknown';

export interface FR312DeidentifiedCaptureFinding {
  readonly schemaVersion:
    'fr312-deidentified-expanded-capture-finding-v1';
  readonly case: FR312ExpandedCase;
  readonly captureOrdinal: number;
  readonly opaqueSessionLabel: string;
  readonly independentCaptureAttested: boolean;
  readonly derivedFromAnotherCapture: boolean;
  readonly visibleHairCandidateObserved: boolean;
  readonly foreheadSkinCandidateObserved: boolean;
  readonly diagnosticHairlineCandidateObserved: boolean;
  readonly visibleInterfaceCandidateObserved:
    | boolean
    | null;
  readonly grossMislocalizationObserved: boolean;
  readonly hiddenCompletionObserved: boolean;
  readonly outOfFrameCompletionObserved: boolean;
  readonly directPromptAuthoritativeHallucinationRisk:
    boolean;
  readonly disposition: FR312CaptureDisposition;
  readonly containsSourceImage: false;
  readonly containsOverlay: false;
  readonly containsRawPolygonCoordinates: false;
  readonly containsSourceImageDigest: false;
  readonly containsFileName: false;
  readonly containsSubjectIdentifier: false;
  readonly containsDemographicAttributes: false;
}

export interface FR312ExpandedValidationInput {
  readonly schemaVersion:
    'fr312-expanded-hairline-validation-input-v1';
  readonly prerequisiteAdjudication:
    FR310AdjudicationReceipt;
  readonly modelId: string;
  readonly modelRevision: string;
  readonly humanReviewCompleted: boolean;
  readonly sessionLabelsOpaque: boolean;
  readonly demographicAttributesCollected: false;
  readonly subjectCoverage: FR312SubjectCoverage;
  readonly captures:
    readonly FR312DeidentifiedCaptureFinding[];
}

export type FR312Disposition =
  | 'reject_current_candidate'
  | 'repeat_expanded_validation'
  | 'eligible_for_model_admission_review';

export type FR312FailureReason =
  | 'FR310_EXPANDED_VALIDATION_ELIGIBILITY_MISSING'
  | 'MODEL_IDENTITY_MISMATCH'
  | 'CAPTURE_COUNT_BELOW_TWELVE'
  | 'CASE_CAPTURE_COUNT_BELOW_TWO'
  | 'SESSION_COUNT_BELOW_THREE'
  | 'HUMAN_REVIEW_INCOMPLETE'
  | 'SESSION_LABEL_NOT_OPAQUE'
  | 'CAPTURE_INDEPENDENCE_UNSATISFIED'
  | 'DERIVED_CAPTURE_USED_AS_INDEPENDENT'
  | 'PRIVACY_BOUNDARY_UNSATISFIED'
  | 'DEMOGRAPHIC_ATTRIBUTES_COLLECTED'
  | 'GROSS_MISLOCALIZATION'
  | 'HIDDEN_COMPLETION'
  | 'OUT_OF_FRAME_COMPLETION'
  | 'DIRECT_PROMPT_AUTHORITATIVE_HALLUCINATION_RISK'
  | 'CAPTURE_EXPLICITLY_REJECTED'
  | 'CASE_REPEATABILITY_INCONCLUSIVE';

export interface FR312ExpandedValidationReceipt {
  readonly schemaVersion:
    'fr312-expanded-hairline-validation-receipt-v1';
  readonly contractVersion:
    typeof FR312_EXPANDED_HAIRLINE_VALIDATION_CONTRACT_VERSION;
  readonly authorityState:
    'expanded_engineering_validation_only';
  readonly disposition: FR312Disposition;
  readonly failureReasons:
    readonly FR312FailureReason[];
  readonly hardRejectTriggered: boolean;
  readonly repeatRequired: boolean;
  readonly modelAdmissionReviewEligible: boolean;
  readonly captureCount: number;
  readonly distinctSessionCount: number;
  readonly eachCaseHasAtLeastTwoIndependentCaptures:
    boolean;
  readonly subjectCoverage: FR312SubjectCoverage;
  readonly representativeOrdinaryRgbReady: false;
  readonly representativeCoverageReviewRequired: true;
  readonly candidateId: string;
  readonly runtimeProviderId: string;
  readonly exactRevision: string;
  readonly runnerContractVersion: string;
  readonly exactModelRevisionBound: true;
  readonly deidentifiedBoundarySatisfied: boolean;
  readonly nextAction:
    | 'evaluate_fr306_fallback_candidate'
    | 'repeat_fr312_expanded_validation_without_retuning'
    | 'design_fr313_model_admission_review_with_representative_coverage_gap';
  readonly authorityBoundary: {
    readonly fr305AdmissionReceiptIssued: false;
    readonly validatedHairlineRuntimeProviderAdmitted: false;
    readonly neutralRuntimeHairlineObservationAuthorized: false;
    readonly traditionalHairlineBindingIssued: false;
    readonly threeDivisionsSpanExecutionReady: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export const FR312_PROTOCOL = Object.freeze({
  schemaVersion:
    'fr312-expanded-hairline-validation-protocol-v1' as const,
  prerequisiteContractVersion:
    FR310_HAIRLINE_EVIDENCE_ADJUDICATOR_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  requiredCases: FR312_EXPANDED_CASES,
  minimumIndependentCapturesPerCase: 2 as const,
  minimumTotalCaptures: 12 as const,
  minimumDistinctSessionLabels: 3 as const,
  derivedCaptureCountsAsIndependent: false as const,
  sourceImagesRemainLocal: true as const,
  overlaysRemainLocal: true as const,
  rawPolygonsRemainLocal: true as const,
  sourceImageDigestsRemainLocal: true as const,
  demographicAttributesCollected: false as const,
  singleSubjectCanEstablishRepresentativeOrdinaryRgb:
    false as const,
  expandedValidationCanIssueFR305Admission:
    false as const,
});

export const FR312_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr312-expanded-hairline-validation-gate-v1' as const,
  contractVersion:
    FR312_EXPANDED_HAIRLINE_VALIDATION_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  parentIssue: 1521 as const,
  expandedValidationProtocolImplemented: true as const,
  expandedValidationExecuted: false as const,
  representativeOrdinaryRgbReady: false as const,
  modelAdmissionReviewEligible: false as const,
  admittedHairlineRuntimeProviders: 0 as const,
  fr305AdmissionReceiptIssued: false as const,
  handoffReadyNeutralReferenceCapabilityCount: 6 as const,
  remainingNeutralReferenceCapabilityCount: 1 as const,
  traditionalBindingAdmittedCount: 0 as const,
  threeDivisionsSpanExecutionReady: false as const,
  productMaterializedCount: 18 as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'await_fr310_expanded_validation_eligibility_then_execute_deidentified_fr312_bundle' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-312 ${message}`,
  );
}

function pushUnique(
  target: FR312FailureReason[],
  reason: FR312FailureReason,
): void {
  if (!target.includes(reason)) {
    target.push(reason);
  }
}

function assertPrerequisite(
  receipt: FR310AdjudicationReceipt,
): void {
  if (
    receipt.schemaVersion !==
      'fr310-hairline-evidence-adjudication-receipt-v1' ||
    receipt.contractVersion !==
      FR310_HAIRLINE_EVIDENCE_ADJUDICATOR_CONTRACT_VERSION ||
    receipt.authorityState !==
      'bounded_evidence_adjudication_only' ||
    receipt.disposition !==
      'eligible_for_expanded_validation' ||
    receipt.expandedValidationEligible !== true ||
    receipt.hardRejectTriggered !== false ||
    receipt.repeatRequired !== false ||
    receipt.nextAction !==
      'design_and_run_fr311_expanded_validation' ||
    receipt.authorityBoundary.fr305AdmissionReceiptIssued !==
      false ||
    receipt.authorityBoundary
      .validatedHairlineRuntimeProviderAdmitted !== false ||
    receipt.authorityBoundary
      .neutralRuntimeHairlineObservationAuthorized !== false ||
    receipt.authorityBoundary
      .traditionalHairlineBindingIssued !== false ||
    receipt.authorityBoundary
      .threeDivisionsSpanExecutionReady !== false ||
    receipt.authorityBoundary.productColumnMaterialized !==
      false ||
    receipt.authorityBoundary.productionActivated !== false ||
    receipt.authorityBoundary.commerceActivated !== false
  ) {
    fail('FR310 expanded-validation prerequisite not satisfied.');
  }
}

function assertCaptureShape(
  capture: FR312DeidentifiedCaptureFinding,
): void {
  if (
    capture.schemaVersion !==
      'fr312-deidentified-expanded-capture-finding-v1' ||
    !FR312_EXPANDED_CASES.includes(capture.case) ||
    !Number.isInteger(capture.captureOrdinal) ||
    capture.captureOrdinal < 1 ||
    capture.opaqueSessionLabel.trim().length === 0
  ) {
    fail('capture identity/case shape drift.');
  }

  if (
    ![
      'supports_further_evaluation',
      'inconclusive',
      'unavailable',
      'rejects_current_candidate_behavior',
    ].includes(capture.disposition)
  ) {
    fail('capture disposition vocabulary drift.');
  }
}

function capturePrivacySatisfied(
  capture: FR312DeidentifiedCaptureFinding,
): boolean {
  return (
    capture.containsSourceImage === false &&
    capture.containsOverlay === false &&
    capture.containsRawPolygonCoordinates === false &&
    capture.containsSourceImageDigest === false &&
    capture.containsFileName === false &&
    capture.containsSubjectIdentifier === false &&
    capture.containsDemographicAttributes === false
  );
}

function independentCaptureKey(
  capture: FR312DeidentifiedCaptureFinding,
): string {
  return [
    capture.case,
    capture.opaqueSessionLabel,
    String(capture.captureOrdinal),
  ].join(':');
}

export function adjudicateExpandedHairlineValidationFR312(
  input: FR312ExpandedValidationInput,
): FR312ExpandedValidationReceipt {
  if (
    input.schemaVersion !==
      'fr312-expanded-hairline-validation-input-v1'
  ) {
    fail('input schemaVersion drift.');
  }

  assertPrerequisite(input.prerequisiteAdjudication);

  const candidate = resolveFR306EmpiricalRuntimeCandidate(
    input.modelId,
    input.modelRevision,
    input.prerequisiteAdjudication.runnerContractVersion,
  );

  if (
    input.prerequisiteAdjudication.candidateId !==
      candidate.candidateId ||
    input.prerequisiteAdjudication.runtimeProviderId !==
      candidate.runtimeProviderId ||
    input.prerequisiteAdjudication.exactRevision !==
      candidate.exactRevision ||
    input.prerequisiteAdjudication.runnerContractVersion !==
      candidate.runnerContractVersion
  ) {
    fail('FR310 candidate identity does not match FR312 input.');
  }

  if (input.demographicAttributesCollected !== false) {
    fail('demographic attributes must not be collected.');
  }

  input.captures.forEach(assertCaptureShape);

  const captureKeys = input.captures.map(
    independentCaptureKey,
  );
  if (new Set(captureKeys).size !== captureKeys.length) {
    fail('duplicate capture key detected.');
  }

  const reasons: FR312FailureReason[] = [];
  let hardRejectTriggered = false;

  const hardReject = (
    reason: FR312FailureReason,
  ): void => {
    pushUnique(reasons, reason);
    hardRejectTriggered = true;
  };

  if (input.captures.length < 12) {
    pushUnique(
      reasons,
      'CAPTURE_COUNT_BELOW_TWELVE',
    );
  }

  const caseCounts = new Map<FR312ExpandedCase, number>();
  for (const caseName of FR312_EXPANDED_CASES) {
    caseCounts.set(caseName, 0);
  }
  for (const capture of input.captures) {
    caseCounts.set(
      capture.case,
      (caseCounts.get(capture.case) ?? 0) + 1,
    );
  }

  const eachCaseHasAtLeastTwoIndependentCaptures =
    FR312_EXPANDED_CASES.every(
      (caseName) => (caseCounts.get(caseName) ?? 0) >= 2,
    );

  if (!eachCaseHasAtLeastTwoIndependentCaptures) {
    pushUnique(
      reasons,
      'CASE_CAPTURE_COUNT_BELOW_TWO',
    );
  }

  const distinctSessionCount = new Set(
    input.captures.map(
      (capture) => capture.opaqueSessionLabel,
    ),
  ).size;

  if (distinctSessionCount < 3) {
    pushUnique(
      reasons,
      'SESSION_COUNT_BELOW_THREE',
    );
  }

  if (!input.humanReviewCompleted) {
    pushUnique(
      reasons,
      'HUMAN_REVIEW_INCOMPLETE',
    );
  }

  if (!input.sessionLabelsOpaque) {
    pushUnique(
      reasons,
      'SESSION_LABEL_NOT_OPAQUE',
    );
  }

  if (
    input.captures.some(
      (capture) =>
        capture.independentCaptureAttested !== true,
    )
  ) {
    pushUnique(
      reasons,
      'CAPTURE_INDEPENDENCE_UNSATISFIED',
    );
  }

  if (
    input.captures.some(
      (capture) =>
        capture.derivedFromAnotherCapture === true,
    )
  ) {
    pushUnique(
      reasons,
      'DERIVED_CAPTURE_USED_AS_INDEPENDENT',
    );
  }

  const deidentifiedBoundarySatisfied =
    input.captures.every(capturePrivacySatisfied) &&
    input.sessionLabelsOpaque &&
    input.demographicAttributesCollected === false;

  if (!deidentifiedBoundarySatisfied) {
    pushUnique(
      reasons,
      'PRIVACY_BOUNDARY_UNSATISFIED',
    );
  }

  for (const capture of input.captures) {
    if (
      capture.disposition ===
      'rejects_current_candidate_behavior'
    ) {
      hardReject(
        'CAPTURE_EXPLICITLY_REJECTED',
      );
    }
    if (capture.grossMislocalizationObserved) {
      hardReject('GROSS_MISLOCALIZATION');
    }
    if (capture.hiddenCompletionObserved) {
      hardReject('HIDDEN_COMPLETION');
    }
    if (capture.outOfFrameCompletionObserved) {
      hardReject('OUT_OF_FRAME_COMPLETION');
    }
    if (
      capture.directPromptAuthoritativeHallucinationRisk
    ) {
      hardReject(
        'DIRECT_PROMPT_AUTHORITATIVE_HALLUCINATION_RISK',
      );
    }
  }

  for (const caseName of FR312_EXPANDED_CASES) {
    const caseCaptures = input.captures.filter(
      (capture) => capture.case === caseName,
    );
    if (caseCaptures.length < 2) {
      continue;
    }

    const states = new Set(
      caseCaptures.map(
        (capture) => capture.disposition,
      ),
    );

    if (
      states.has('inconclusive') ||
      states.has('unavailable') ||
      (
        states.has('supports_further_evaluation') &&
        states.size > 1
      )
    ) {
      pushUnique(
        reasons,
        'CASE_REPEATABILITY_INCONCLUSIVE',
      );
    }
  }

  const repeatRequired =
    !hardRejectTriggered &&
    (
      input.captures.length < 12 ||
      !eachCaseHasAtLeastTwoIndependentCaptures ||
      distinctSessionCount < 3 ||
      !input.humanReviewCompleted ||
      !deidentifiedBoundarySatisfied ||
      input.captures.some(
        (capture) =>
          !capture.independentCaptureAttested ||
          capture.derivedFromAnotherCapture,
      ) ||
      reasons.includes(
        'CASE_REPEATABILITY_INCONCLUSIVE',
      )
    );

  const modelAdmissionReviewEligible =
    !hardRejectTriggered &&
    !repeatRequired &&
    input.captures.length >= 12 &&
    eachCaseHasAtLeastTwoIndependentCaptures &&
    distinctSessionCount >= 3 &&
    input.humanReviewCompleted &&
    deidentifiedBoundarySatisfied &&
    input.captures.every(
      (capture) =>
        capture.disposition ===
        'supports_further_evaluation',
    );

  const disposition: FR312Disposition =
    hardRejectTriggered
      ? 'reject_current_candidate'
      : modelAdmissionReviewEligible
        ? 'eligible_for_model_admission_review'
        : 'repeat_expanded_validation';

  const nextAction:
    FR312ExpandedValidationReceipt['nextAction'] =
    disposition === 'reject_current_candidate'
      ? 'evaluate_fr306_fallback_candidate'
      : disposition === 'repeat_expanded_validation'
        ? 'repeat_fr312_expanded_validation_without_retuning'
        : 'design_fr313_model_admission_review_with_representative_coverage_gap';

  return Object.freeze({
    schemaVersion:
      'fr312-expanded-hairline-validation-receipt-v1' as const,
    contractVersion:
      FR312_EXPANDED_HAIRLINE_VALIDATION_CONTRACT_VERSION,
    authorityState:
      'expanded_engineering_validation_only' as const,
    disposition,
    failureReasons: Object.freeze([...reasons]),
    hardRejectTriggered,
    repeatRequired:
      disposition === 'repeat_expanded_validation',
    modelAdmissionReviewEligible:
      disposition ===
      'eligible_for_model_admission_review',
    captureCount: input.captures.length,
    distinctSessionCount,
    eachCaseHasAtLeastTwoIndependentCaptures,
    subjectCoverage: input.subjectCoverage,
    representativeOrdinaryRgbReady: false as const,
    representativeCoverageReviewRequired: true as const,
    candidateId: candidate.candidateId,
    runtimeProviderId: candidate.runtimeProviderId,
    exactRevision: candidate.exactRevision,
    runnerContractVersion:
      input.prerequisiteAdjudication.runnerContractVersion,
    exactModelRevisionBound: true as const,
    deidentifiedBoundarySatisfied,
    nextAction,
    authorityBoundary: Object.freeze({
      fr305AdmissionReceiptIssued: false as const,
      validatedHairlineRuntimeProviderAdmitted:
        false as const,
      neutralRuntimeHairlineObservationAuthorized:
        false as const,
      traditionalHairlineBindingIssued: false as const,
      threeDivisionsSpanExecutionReady: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export function assertFR312Protocol(): void {
  if (
    FR312_EXPANDED_CASES.length !== 6 ||
    new Set(FR312_EXPANDED_CASES).size !== 6 ||
    FR312_PROTOCOL.minimumIndependentCapturesPerCase !== 2 ||
    FR312_PROTOCOL.minimumTotalCaptures !== 12 ||
    FR312_PROTOCOL.minimumDistinctSessionLabels !== 3 ||
    FR312_PROTOCOL.derivedCaptureCountsAsIndependent !== false ||
    FR312_PROTOCOL.sourceImagesRemainLocal !== true ||
    FR312_PROTOCOL.overlaysRemainLocal !== true ||
    FR312_PROTOCOL.rawPolygonsRemainLocal !== true ||
    FR312_PROTOCOL.sourceImageDigestsRemainLocal !== true ||
    FR312_PROTOCOL.demographicAttributesCollected !== false ||
    FR312_PROTOCOL
      .singleSubjectCanEstablishRepresentativeOrdinaryRgb !==
      false ||
    FR312_PROTOCOL.expandedValidationCanIssueFR305Admission !==
      false
  ) {
    fail('expanded validation protocol drift.');
  }
}

export function assertFR312CurrentGate(): void {
  const gate = FR312_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.expandedValidationProtocolImplemented !== true ||
    gate.expandedValidationExecuted !== false ||
    gate.representativeOrdinaryRgbReady !== false ||
    gate.modelAdmissionReviewEligible !== false ||
    gate.admittedHairlineRuntimeProviders !== 0 ||
    gate.fr305AdmissionReceiptIssued !== false ||
    gate.handoffReadyNeutralReferenceCapabilityCount !== 6 ||
    gate.remainingNeutralReferenceCapabilityCount !== 1 ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.productMaterializedCount !== 18 ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR312Protocol();
assertFR312CurrentGate();
