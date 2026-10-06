import {
  FR307_CURRENT_GATE,
  FR307_LOCAL_RUNNER,
  FR307_PRIMARY_MODEL,
  FR307_VISIBLE_HAIRLINE_EMPIRICAL_RUNNER_CONTRACT_VERSION,
  assertFR307CurrentGate,
  assertVisibleHairlineEmpiricalRunnerFR307,
} from './visible-hairline-empirical-runner-fr307.js';
import {
  resolveFR306EmpiricalRuntimeCandidate,
} from './visible-hairline-runtime-candidates-fr306.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR308_BOUNDED_HAIRLINE_CAPTURE_CONTRACT_VERSION =
  'FR308-BOUNDED-HAIRLINE-CAPTURE-BUNDLE-v1' as const;

export const FR308_CAPTURE_CASES = Object.freeze([
  'clear_unobstructed_central_hairline',
  'partial_bangs_occlusion',
  'heavy_bangs_hairline_substantially_hidden',
  'cropped_upper_forehead',
] as const);

export type FR308CaptureCase =
  (typeof FR308_CAPTURE_CASES)[number];

export type FR308CaseDisposition =
  | 'supports_further_evaluation'
  | 'inconclusive'
  | 'rejects_current_candidate_behavior';

export type FR308DirectPromptFailureMode =
  | 'useful_candidate'
  | 'leakage'
  | 'hallucination'
  | 'unavailable'
  | 'ambiguous';

export interface FR308DeidentifiedCaseFinding {
  readonly schemaVersion:
    'fr308-deidentified-hairline-case-finding-v1';
  readonly case: FR308CaptureCase;
  readonly visibleHairCandidateObserved: boolean;
  readonly foreheadSkinCandidateObserved: boolean;
  readonly diagnosticHairlineCandidateObserved: boolean;
  readonly grossMislocalizationObserved: boolean;
  readonly hiddenCompletionObserved: boolean;
  readonly outOfFrameCompletionObserved: boolean;
  readonly visibleInterfaceCandidateObserved:
    | boolean
    | null;
  readonly directPromptFailureMode:
    FR308DirectPromptFailureMode;
  readonly disposition: FR308CaseDisposition;
  readonly containsSourceImage: false;
  readonly containsOverlay: false;
  readonly containsRawPolygonCoordinates: false;
  readonly containsSourceImageDigest: false;
  readonly containsFileNameOrPersonalIdentifier: false;
}

export interface FR308BoundedBundleInput {
  readonly schemaVersion:
    'fr308-bounded-hairline-bundle-input-v1';
  readonly runnerContractVersion: string;
  readonly modelId: string;
  readonly modelRevision: string;
  readonly localOnlyExecution: true;
  readonly caseFindings:
    readonly FR308DeidentifiedCaseFinding[];
}

export interface FR308BoundedBundleReceipt {
  readonly schemaVersion:
    'fr308-bounded-hairline-bundle-receipt-v1';
  readonly contractVersion:
    typeof FR308_BOUNDED_HAIRLINE_CAPTURE_CONTRACT_VERSION;
  readonly authorityState:
    'bounded_deidentified_empirical_evidence_only';
  readonly captureCaseCount: 4;
  readonly captureCases:
    readonly FR308CaptureCase[];
  readonly localOnlyExecutionVerifiedByContract: true;
  readonly deidentifiedRepositorySummaryOnly: true;
  readonly realCaptureBundleComplete: true;
  readonly candidateId: string;
  readonly runtimeProviderId: string;
  readonly exactRevision: string;
  readonly runnerContractVersion: string;
  readonly admittedHairlineRuntimeProviders: 0;
  readonly fr305AdmissionReceiptIssued: false;
  readonly neutralRuntimeHairlineObservationAuthorized: false;
  readonly hiddenHairlineCompletionAuthorized: false;
  readonly traditionalBindingAuthorized: false;
  readonly threeDivisionsSpanExecutionReady: false;
  readonly productMaterializedCount: 18;
  readonly productionActivated: false;
  readonly commerceActivated: false;
  readonly nextAction:
    'perform_separate_human_adjudication_before_any_fr305_model_admission';
}

export const FR308_PROTOCOL = Object.freeze({
  schemaVersion:
    'fr308-bounded-hairline-capture-protocol-v1' as const,
  watchtowerTrack: 'face-observation-engine' as const,
  requiredCases: FR308_CAPTURE_CASES,
  minimumImagesPerCase: 1 as const,
  runnerPath: FR307_LOCAL_RUNNER.path,
  defaultOutputPath:
    FR307_LOCAL_RUNNER.defaultOutputPath,
  exactModelId: FR307_PRIMARY_MODEL.id,
  exactModelRevision: FR307_PRIMARY_MODEL.revision,
  operatorLocalOnly: true as const,
  githubActionsEmpiricalExecutionAllowed: false as const,
  sourceImageRepositoryCommitAllowed: false as const,
  overlayRepositoryCommitAllowed: false as const,
  rawPolygonRepositoryCommitAllowed: false as const,
  sourceImageDigestRepositoryCommitAllowed: false as const,
  deidentifiedAggregateSummaryRepositoryCommitAllowed:
    true as const,
  automaticAdmissionDecisionAllowed: false as const,
});

export const FR308_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr308-bounded-hairline-capture-gate-v1' as const,
  contractVersion:
    FR308_BOUNDED_HAIRLINE_CAPTURE_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  parentIssue: 1521 as const,
  boundedProtocolImplemented: true as const,
  deidentifiedIntakeImplemented: true as const,
  empiricalRealCaptureEvidenceCollected: false as const,
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
    'operator_runs_four_case_local_bundle_then_commits_only_deidentified_aggregate_findings_for_separate_adjudication' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-308 ${message}`,
  );
}

function assertCaseFinding(
  finding: FR308DeidentifiedCaseFinding,
): void {
  if (
    finding.schemaVersion !==
      'fr308-deidentified-hairline-case-finding-v1' ||
    !FR308_CAPTURE_CASES.includes(finding.case) ||
    finding.containsSourceImage !== false ||
    finding.containsOverlay !== false ||
    finding.containsRawPolygonCoordinates !== false ||
    finding.containsSourceImageDigest !== false ||
    finding.containsFileNameOrPersonalIdentifier !== false
  ) {
    fail('case finding privacy/identity boundary drift.');
  }

  if (
    ![
      'supports_further_evaluation',
      'inconclusive',
      'rejects_current_candidate_behavior',
    ].includes(finding.disposition) ||
    ![
      'useful_candidate',
      'leakage',
      'hallucination',
      'unavailable',
      'ambiguous',
    ].includes(finding.directPromptFailureMode)
  ) {
    fail('case finding disposition vocabulary drift.');
  }

  if (
    finding.case ===
      'heavy_bangs_hairline_substantially_hidden' &&
    finding.hiddenCompletionObserved &&
    finding.disposition ===
      'supports_further_evaluation'
  ) {
    fail(
      'hidden completion cannot support further evaluation in the substantially-hidden case.',
    );
  }

  if (
    finding.case === 'cropped_upper_forehead' &&
    finding.outOfFrameCompletionObserved &&
    finding.disposition ===
      'supports_further_evaluation'
  ) {
    fail(
      'out-of-frame completion cannot support further evaluation in the crop case.',
    );
  }
}

export function issueBoundedHairlineBundleReceiptFR308(
  input: FR308BoundedBundleInput,
): FR308BoundedBundleReceipt {
  if (
    input.schemaVersion !==
      'fr308-bounded-hairline-bundle-input-v1' ||
    input.localOnlyExecution !== true
  ) {
    fail('bundle input identity/runtime boundary drift.');
  }

  const candidate = resolveFR306EmpiricalRuntimeCandidate(
    input.modelId,
    input.modelRevision,
    input.runnerContractVersion,
  );

  if (candidate.state === 'primary_empirical_candidate') {
    assertVisibleHairlineEmpiricalRunnerFR307();
    assertFR307CurrentGate();
  }

  if (input.caseFindings.length !== 4) {
    fail('bounded bundle requires exactly four case findings.');
  }

  input.caseFindings.forEach(assertCaseFinding);

  const observedCases = input.caseFindings.map(
    (finding) => finding.case,
  );
  if (
    new Set(observedCases).size !== 4 ||
    FR308_CAPTURE_CASES.some(
      (requiredCase) =>
        !observedCases.includes(requiredCase),
    )
  ) {
    fail('bounded bundle must contain each required case exactly once.');
  }

  return Object.freeze({
    schemaVersion:
      'fr308-bounded-hairline-bundle-receipt-v1' as const,
    contractVersion:
      FR308_BOUNDED_HAIRLINE_CAPTURE_CONTRACT_VERSION,
    authorityState:
      'bounded_deidentified_empirical_evidence_only' as const,
    captureCaseCount: 4 as const,
    captureCases: FR308_CAPTURE_CASES,
    localOnlyExecutionVerifiedByContract: true as const,
    deidentifiedRepositorySummaryOnly: true as const,
    realCaptureBundleComplete: true as const,
    candidateId: candidate.candidateId,
    runtimeProviderId: candidate.runtimeProviderId,
    exactRevision: candidate.exactRevision,
    runnerContractVersion: input.runnerContractVersion,
    admittedHairlineRuntimeProviders: 0 as const,
    fr305AdmissionReceiptIssued: false as const,
    neutralRuntimeHairlineObservationAuthorized: false as const,
    hiddenHairlineCompletionAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    threeDivisionsSpanExecutionReady: false as const,
    productMaterializedCount: 18 as const,
    productionActivated: false as const,
    commerceActivated: false as const,
    nextAction:
      'perform_separate_human_adjudication_before_any_fr305_model_admission' as const,
  });
}

export function assertFR308Protocol(): void {
  if (
    FR308_CAPTURE_CASES.length !== 4 ||
    new Set(FR308_CAPTURE_CASES).size !== 4 ||
    FR308_PROTOCOL.minimumImagesPerCase !== 1 ||
    FR308_PROTOCOL.operatorLocalOnly !== true ||
    FR308_PROTOCOL
      .githubActionsEmpiricalExecutionAllowed !== false ||
    FR308_PROTOCOL
      .sourceImageRepositoryCommitAllowed !== false ||
    FR308_PROTOCOL
      .overlayRepositoryCommitAllowed !== false ||
    FR308_PROTOCOL
      .rawPolygonRepositoryCommitAllowed !== false ||
    FR308_PROTOCOL
      .sourceImageDigestRepositoryCommitAllowed !== false ||
    FR308_PROTOCOL
      .deidentifiedAggregateSummaryRepositoryCommitAllowed !==
      true ||
    FR308_PROTOCOL
      .automaticAdmissionDecisionAllowed !== false
  ) {
    fail('bounded capture protocol drift.');
  }
}

export function assertFR308CurrentGate(): void {
  const gate = FR308_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.boundedProtocolImplemented !== true ||
    gate.deidentifiedIntakeImplemented !== true ||
    gate.empiricalRealCaptureEvidenceCollected !== false ||
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

assertFR308Protocol();
assertFR308CurrentGate();
