import {
  FR308_CAPTURE_CASES,
  FR308_CURRENT_GATE,
  FR308_BOUNDED_HAIRLINE_CAPTURE_CONTRACT_VERSION,
  issueBoundedHairlineBundleReceiptFR308,
  type FR308BoundedBundleReceipt,
  type FR308CaptureCase,
  type FR308DeidentifiedCaseFinding,
} from './visible-hairline-bounded-capture-bundle-fr308.js';
import {
  FR307_VISIBLE_HAIRLINE_EMPIRICAL_RUNNER_CONTRACT_VERSION,
} from './visible-hairline-empirical-runner-fr307.js';
import {
  resolveEmpiricalHairlineCandidateIdentityFR306,
} from './visible-hairline-runtime-candidates-fr306.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR310_HAIRLINE_EVIDENCE_ADJUDICATOR_CONTRACT_VERSION =
  'FR310-HAIRLINE-EVIDENCE-ADJUDICATOR-v1' as const;

export type FR310Disposition =
  | 'reject_current_candidate'
  | 'repeat_bounded_bundle'
  | 'eligible_for_expanded_validation';

export type FR310FailureReason =
  | 'BUNDLE_RECEIPT_INVALID'
  | 'CASE_SET_INVALID'
  | 'HUMAN_REVIEW_INCOMPLETE'
  | 'REVIEW_OUTPUT_PRIVACY_BOUNDARY_UNSATISFIED'
  | 'CLEAR_CASE_REJECTED'
  | 'CLEAR_GROSS_MISLOCALIZATION'
  | 'CLEAR_HIDDEN_COMPLETION'
  | 'CLEAR_CASE_INCONCLUSIVE'
  | 'PARTIAL_BANGS_CASE_REJECTED'
  | 'PARTIAL_BANGS_GROSS_MISLOCALIZATION'
  | 'PARTIAL_BANGS_HIDDEN_COMPLETION'
  | 'PARTIAL_BANGS_INCONCLUSIVE_WITHOUT_VISIBLE_INTERFACE'
  | 'HIDDEN_CASE_REJECTED'
  | 'HIDDEN_CASE_HIDDEN_COMPLETION'
  | 'HIDDEN_CASE_DIRECT_PROMPT_HALLUCINATION_RISK'
  | 'HIDDEN_CASE_ASSESSMENT_BLOCKED'
  | 'CROP_CASE_REJECTED'
  | 'CROP_CASE_GROSS_MISLOCALIZATION'
  | 'CROP_CASE_OUT_OF_FRAME_COMPLETION'
  | 'CROP_CASE_ASSESSMENT_BLOCKED'
  | 'TWO_OR_MORE_CASES_INCONCLUSIVE';

export interface FR310HumanReviewAttestation {
  readonly schemaVersion:
    'fr310-hairline-human-review-attestation-v1';
  readonly completed: boolean;
  readonly reviewOutputDeidentified: boolean;
  readonly sourceImageAbsent: boolean;
  readonly overlayAbsent: boolean;
  readonly rawPolygonCoordinatesAbsent: boolean;
  readonly sourceImageDigestAbsent: boolean;
  readonly fileNameOrPersonalIdentifierAbsent: boolean;
  readonly assessmentBlockedCases:
    readonly FR308CaptureCase[];
  readonly directPromptAuthoritativeMisinterpretationRiskCases:
    readonly FR308CaptureCase[];
}

export interface FR310AdjudicationInput {
  readonly schemaVersion:
    'fr310-hairline-evidence-adjudication-input-v1';
  readonly bundleReceipt: FR308BoundedBundleReceipt;
  readonly caseFindings:
    readonly FR308DeidentifiedCaseFinding[];
  readonly candidateId?: string;
  readonly modelId: string;
  readonly modelRevision: string;
  readonly humanReview: FR310HumanReviewAttestation;
}

export interface FR310AdjudicationReceipt {
  readonly schemaVersion:
    'fr310-hairline-evidence-adjudication-receipt-v1';
  readonly contractVersion:
    typeof FR310_HAIRLINE_EVIDENCE_ADJUDICATOR_CONTRACT_VERSION;
  readonly authorityState:
    'bounded_evidence_adjudication_only';
  readonly candidateId: string;
  readonly runtimeContractVersion: string;
  readonly modelId: string;
  readonly modelRevision: string;
  readonly disposition: FR310Disposition;
  readonly failureReasons:
    readonly FR310FailureReason[];
  readonly hardRejectTriggered: boolean;
  readonly repeatRequired: boolean;
  readonly expandedValidationEligible: boolean;
  readonly reviewedCaseCount: 4;
  readonly exactModelRevisionBound: true;
  readonly deidentifiedBoundarySatisfied: boolean;
  readonly nextAction:
    | 'evaluate_fr306_fallback_candidate'
    | 'repeat_fr308_bounded_bundle_without_retuning'
    | 'design_and_run_fr311_expanded_validation';
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

export const FR310_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr310-hairline-evidence-adjudicator-gate-v1' as const,
  contractVersion:
    FR310_HAIRLINE_EVIDENCE_ADJUDICATOR_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  parentIssue: 1521 as const,
  adjudicatorImplemented: true as const,
  adjudicationExecuted: false as const,
  empiricalRealCaptureEvidenceCollected:
    FR308_CURRENT_GATE.empiricalRealCaptureEvidenceCollected,
  expandedValidationEligible: false as const,
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
    'await_real_fr308_deidentified_four_case_findings_then_execute_fr310_adjudication' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-310 ${message}`,
  );
}

function uniqueKnownCases(
  cases: readonly FR308CaptureCase[],
  label: string,
): void {
  if (
    new Set(cases).size !== cases.length ||
    cases.some(
      (caseName) =>
        !FR308_CAPTURE_CASES.includes(caseName),
    )
  ) {
    fail(`${label} must contain unique FR308 cases only.`);
  }
}

function findingByCase(
  findings: readonly FR308DeidentifiedCaseFinding[],
  caseName: FR308CaptureCase,
): FR308DeidentifiedCaseFinding {
  const finding = findings.find(
    (entry) => entry.case === caseName,
  );
  if (!finding) {
    fail(`missing case finding: ${caseName}.`);
  }
  return finding;
}

function assertBundleReceipt(
  receipt: FR308BoundedBundleReceipt,
): void {
  if (
    receipt.schemaVersion !==
      'fr308-bounded-hairline-bundle-receipt-v1' ||
    receipt.contractVersion !==
      FR308_BOUNDED_HAIRLINE_CAPTURE_CONTRACT_VERSION ||
    receipt.authorityState !==
      'bounded_deidentified_empirical_evidence_only' ||
    receipt.candidateId.trim().length === 0 ||
    receipt.runtimeContractVersion.trim().length === 0 ||
    receipt.modelId.trim().length === 0 ||
    receipt.modelRevision.trim().length === 0 ||
    receipt.captureCaseCount !== 4 ||
    receipt.captureCases.length !== 4 ||
    FR308_CAPTURE_CASES.some(
      (caseName) =>
        !receipt.captureCases.includes(caseName),
    ) ||
    receipt.localOnlyExecutionVerifiedByContract !== true ||
    receipt.deidentifiedRepositorySummaryOnly !== true ||
    receipt.realCaptureBundleComplete !== true ||
    receipt.admittedHairlineRuntimeProviders !== 0 ||
    receipt.fr305AdmissionReceiptIssued !== false ||
    receipt.neutralRuntimeHairlineObservationAuthorized !== false ||
    receipt.hiddenHairlineCompletionAuthorized !== false ||
    receipt.traditionalBindingAuthorized !== false ||
    receipt.threeDivisionsSpanExecutionReady !== false ||
    receipt.productMaterializedCount !== 18 ||
    receipt.productionActivated !== false ||
    receipt.commerceActivated !== false
  ) {
    fail('FR308 bundle receipt boundary drift.');
  }
}

function deidentifiedBoundarySatisfied(
  review: FR310HumanReviewAttestation,
): boolean {
  return (
    review.reviewOutputDeidentified &&
    review.sourceImageAbsent &&
    review.overlayAbsent &&
    review.rawPolygonCoordinatesAbsent &&
    review.sourceImageDigestAbsent &&
    review.fileNameOrPersonalIdentifierAbsent
  );
}

function pushUnique(
  target: FR310FailureReason[],
  reason: FR310FailureReason,
): void {
  if (!target.includes(reason)) {
    target.push(reason);
  }
}

export function adjudicateHairlineEvidenceFR310(
  input: FR310AdjudicationInput,
): FR310AdjudicationReceipt {
  if (
    input.schemaVersion !==
      'fr310-hairline-evidence-adjudication-input-v1'
  ) {
    fail('adjudication input schemaVersion drift.');
  }

  const candidateIdentity =
    resolveEmpiricalHairlineCandidateIdentityFR306({
      candidateId:
        input.candidateId ??
        input.bundleReceipt.candidateId,
      modelId: input.modelId,
      modelRevision: input.modelRevision,
      runtimeContractVersion:
        input.bundleReceipt.runtimeContractVersion,
    });

  if (
    input.bundleReceipt.candidateId !==
      candidateIdentity.candidateId ||
    input.bundleReceipt.modelId !==
      candidateIdentity.modelId ||
    input.bundleReceipt.modelRevision !==
      candidateIdentity.modelRevision
  ) {
    fail('candidate identity must match the FR308 bundle receipt.');
  }

  if (
    input.humanReview.schemaVersion !==
      'fr310-hairline-human-review-attestation-v1'
  ) {
    fail('human review attestation schemaVersion drift.');
  }

  uniqueKnownCases(
    input.humanReview.assessmentBlockedCases,
    'assessmentBlockedCases',
  );
  uniqueKnownCases(
    input.humanReview
      .directPromptAuthoritativeMisinterpretationRiskCases,
    'directPromptAuthoritativeMisinterpretationRiskCases',
  );

  assertBundleReceipt(input.bundleReceipt);

  if (
    input.caseFindings.length !== 4 ||
    new Set(
      input.caseFindings.map(
        (finding) => finding.case,
      ),
    ).size !== 4 ||
    FR308_CAPTURE_CASES.some(
      (caseName) =>
        !input.caseFindings.some(
          (finding) => finding.case === caseName,
        ),
    )
  ) {
    fail('FR308 case set must contain each required case exactly once.');
  }

  const replayedReceipt =
    issueBoundedHairlineBundleReceiptFR308({
      schemaVersion:
        'fr308-bounded-hairline-bundle-input-v1',
      candidateId: candidateIdentity.candidateId,
      runnerContractVersion:
        candidateIdentity.runtimeContractVersion,
      modelId: candidateIdentity.modelId,
      modelRevision: candidateIdentity.modelRevision,
      localOnlyExecution: true,
      caseFindings: input.caseFindings,
    });

  if (
    replayedReceipt.contractVersion !==
      input.bundleReceipt.contractVersion ||
    replayedReceipt.candidateId !==
      input.bundleReceipt.candidateId ||
    replayedReceipt.runtimeContractVersion !==
      input.bundleReceipt.runtimeContractVersion ||
    replayedReceipt.modelId !==
      input.bundleReceipt.modelId ||
    replayedReceipt.modelRevision !==
      input.bundleReceipt.modelRevision ||
    replayedReceipt.captureCaseCount !==
      input.bundleReceipt.captureCaseCount ||
    replayedReceipt.authorityState !==
      input.bundleReceipt.authorityState
  ) {
    fail('FR308 bundle receipt replay mismatch.');
  }

  const clear = findingByCase(
    input.caseFindings,
    'clear_unobstructed_central_hairline',
  );
  const partial = findingByCase(
    input.caseFindings,
    'partial_bangs_occlusion',
  );
  const hidden = findingByCase(
    input.caseFindings,
    'heavy_bangs_hairline_substantially_hidden',
  );
  const crop = findingByCase(
    input.caseFindings,
    'cropped_upper_forehead',
  );

  const reasons: FR310FailureReason[] = [];
  let hardRejectTriggered = false;

  const hardReject = (
    reason: FR310FailureReason,
  ): void => {
    pushUnique(reasons, reason);
    hardRejectTriggered = true;
  };

  if (
    clear.disposition ===
    'rejects_current_candidate_behavior'
  ) {
    hardReject('CLEAR_CASE_REJECTED');
  }
  if (clear.grossMislocalizationObserved) {
    hardReject('CLEAR_GROSS_MISLOCALIZATION');
  }
  if (clear.hiddenCompletionObserved) {
    hardReject('CLEAR_HIDDEN_COMPLETION');
  }

  if (
    partial.disposition ===
    'rejects_current_candidate_behavior'
  ) {
    hardReject('PARTIAL_BANGS_CASE_REJECTED');
  }
  if (partial.grossMislocalizationObserved) {
    hardReject(
      'PARTIAL_BANGS_GROSS_MISLOCALIZATION',
    );
  }
  if (partial.hiddenCompletionObserved) {
    hardReject('PARTIAL_BANGS_HIDDEN_COMPLETION');
  }

  if (
    hidden.disposition ===
    'rejects_current_candidate_behavior'
  ) {
    hardReject('HIDDEN_CASE_REJECTED');
  }
  if (hidden.hiddenCompletionObserved) {
    hardReject('HIDDEN_CASE_HIDDEN_COMPLETION');
  }
  if (
    hidden.directPromptFailureMode ===
      'hallucination' &&
    input.humanReview
      .directPromptAuthoritativeMisinterpretationRiskCases
      .includes(
        'heavy_bangs_hairline_substantially_hidden',
      )
  ) {
    hardReject(
      'HIDDEN_CASE_DIRECT_PROMPT_HALLUCINATION_RISK',
    );
  }

  if (
    crop.disposition ===
    'rejects_current_candidate_behavior'
  ) {
    hardReject('CROP_CASE_REJECTED');
  }
  if (crop.grossMislocalizationObserved) {
    hardReject('CROP_CASE_GROSS_MISLOCALIZATION');
  }
  if (crop.outOfFrameCompletionObserved) {
    hardReject('CROP_CASE_OUT_OF_FRAME_COMPLETION');
  }

  const privacySatisfied =
    deidentifiedBoundarySatisfied(
      input.humanReview,
    );

  if (!input.humanReview.completed) {
    pushUnique(reasons, 'HUMAN_REVIEW_INCOMPLETE');
  }
  if (!privacySatisfied) {
    pushUnique(
      reasons,
      'REVIEW_OUTPUT_PRIVACY_BOUNDARY_UNSATISFIED',
    );
  }

  if (clear.disposition === 'inconclusive') {
    pushUnique(reasons, 'CLEAR_CASE_INCONCLUSIVE');
  }

  if (
    partial.disposition === 'inconclusive' &&
    partial.visibleInterfaceCandidateObserved === null
  ) {
    pushUnique(
      reasons,
      'PARTIAL_BANGS_INCONCLUSIVE_WITHOUT_VISIBLE_INTERFACE',
    );
  }

  if (
    input.humanReview.assessmentBlockedCases.includes(
      'heavy_bangs_hairline_substantially_hidden',
    )
  ) {
    pushUnique(
      reasons,
      'HIDDEN_CASE_ASSESSMENT_BLOCKED',
    );
  }

  if (
    input.humanReview.assessmentBlockedCases.includes(
      'cropped_upper_forehead',
    )
  ) {
    pushUnique(
      reasons,
      'CROP_CASE_ASSESSMENT_BLOCKED',
    );
  }

  const inconclusiveCount =
    input.caseFindings.filter(
      (finding) =>
        finding.disposition === 'inconclusive',
    ).length;

  if (inconclusiveCount >= 2) {
    pushUnique(
      reasons,
      'TWO_OR_MORE_CASES_INCONCLUSIVE',
    );
  }

  const repeatRequired =
    !hardRejectTriggered &&
    (
      !input.humanReview.completed ||
      !privacySatisfied ||
      clear.disposition === 'inconclusive' ||
      (
        partial.disposition === 'inconclusive' &&
        partial.visibleInterfaceCandidateObserved === null
      ) ||
      input.humanReview.assessmentBlockedCases.includes(
        'heavy_bangs_hairline_substantially_hidden',
      ) ||
      input.humanReview.assessmentBlockedCases.includes(
        'cropped_upper_forehead',
      ) ||
      inconclusiveCount >= 2
    );

  const expandedValidationEligible =
    !hardRejectTriggered &&
    !repeatRequired &&
    input.humanReview.completed &&
    privacySatisfied &&
    clear.disposition ===
      'supports_further_evaluation' &&
    !clear.grossMislocalizationObserved &&
    !partial.hiddenCompletionObserved &&
    !hidden.hiddenCompletionObserved &&
    !(
      hidden.directPromptFailureMode ===
        'hallucination' &&
      input.humanReview
        .directPromptAuthoritativeMisinterpretationRiskCases
        .includes(
          'heavy_bangs_hairline_substantially_hidden',
        )
    ) &&
    !crop.outOfFrameCompletionObserved;

  const disposition: FR310Disposition =
    hardRejectTriggered
      ? 'reject_current_candidate'
      : repeatRequired
        ? 'repeat_bounded_bundle'
        : expandedValidationEligible
          ? 'eligible_for_expanded_validation'
          : 'repeat_bounded_bundle';

  if (
    disposition === 'repeat_bounded_bundle' &&
    reasons.length === 0
  ) {
    pushUnique(reasons, 'CASE_SET_INVALID');
  }

  const nextAction:
    FR310AdjudicationReceipt['nextAction'] =
    disposition === 'reject_current_candidate'
      ? 'evaluate_fr306_fallback_candidate'
      : disposition === 'repeat_bounded_bundle'
        ? 'repeat_fr308_bounded_bundle_without_retuning'
        : 'design_and_run_fr311_expanded_validation';

  return Object.freeze({
    schemaVersion:
      'fr310-hairline-evidence-adjudication-receipt-v1' as const,
    contractVersion:
      FR310_HAIRLINE_EVIDENCE_ADJUDICATOR_CONTRACT_VERSION,
    authorityState:
      'bounded_evidence_adjudication_only' as const,
    candidateId: candidateIdentity.candidateId,
    runtimeContractVersion:
      candidateIdentity.runtimeContractVersion,
    modelId: candidateIdentity.modelId,
    modelRevision: candidateIdentity.modelRevision,
    disposition,
    failureReasons: Object.freeze([...reasons]),
    hardRejectTriggered,
    repeatRequired:
      disposition === 'repeat_bounded_bundle',
    expandedValidationEligible:
      disposition ===
      'eligible_for_expanded_validation',
    reviewedCaseCount: 4 as const,
    exactModelRevisionBound: true as const,
    deidentifiedBoundarySatisfied:
      privacySatisfied,
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

export function assertFR310CurrentGate(): void {
  const gate = FR310_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.adjudicatorImplemented !== true ||
    gate.adjudicationExecuted !== false ||
    gate.empiricalRealCaptureEvidenceCollected !== false ||
    gate.expandedValidationEligible !== false ||
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

assertFR310CurrentGate();
