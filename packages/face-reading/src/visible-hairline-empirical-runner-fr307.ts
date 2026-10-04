import {
  FR306_CURRENT_GATE,
  FR306_EMPIRICAL_CAPTURE_CASES,
  FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATE_CONTRACT_VERSION,
  assertFR306CurrentGate,
  assertVisibleHairlineRuntimeCandidatesFR306,
} from './visible-hairline-runtime-candidates-fr306.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR307_VISIBLE_HAIRLINE_EMPIRICAL_RUNNER_CONTRACT_VERSION =
  'FR307-VISIBLE-HAIRLINE-EMPIRICAL-RUNNER-v1' as const;

export const FR307_PRIMARY_MODEL = Object.freeze({
  id: 'microsoft/Florence-2-base' as const,
  revision:
    '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac' as const,
  task: '<REFERRING_EXPRESSION_SEGMENTATION>' as const,
});

export const FR307_PROMPT_FAMILY = Object.freeze([
  Object.freeze({
    key: 'visible_hair' as const,
    prompt: 'visible hair' as const,
    diagnosticOnly: false as const,
  }),
  Object.freeze({
    key: 'forehead_skin' as const,
    prompt: 'forehead skin' as const,
    diagnosticOnly: false as const,
  }),
  Object.freeze({
    key: 'visible_hairline_diagnostic' as const,
    prompt: 'visible hairline' as const,
    diagnosticOnly: true as const,
  }),
]);

export const FR307_LOCAL_RUNNER = Object.freeze({
  path:
    'tools/face-reading/hairline/run_florence2_hairline_empirical.py' as const,
  defaultOutputPath:
    '.cache/face-reading/hairline-fr307' as const,
  selfTestCommand:
    'python tools/face-reading/hairline/run_florence2_hairline_empirical.py --self-test' as const,
  realModelDownloadInNormalCi: false as const,
  operatorImageUploadToGitHubActions: false as const,
  qaOverlayLocalOnly: true as const,
  rawPolygonBundleLocalOnly: true as const,
});

export const FR307_AUTHORITY_BOUNDARY = Object.freeze({
  candidateEvidenceOnly: true as const,
  runtimeHairlineObservationAuthorized: false as const,
  hairPolygonMayBeCalledHairline: false as const,
  foreheadSkinPolygonMayBeCalledHairline: false as const,
  pairAgreementMayBeCalledHairlineValidity: false as const,
  directHairlinePromptMayBeCalledAuthoritativeBoundary:
    false as const,
  hiddenHairlineCompletionAuthorized: false as const,
  faceOvalSubstitutionAuthorized: false as const,
  faceMeshTopVertexSubstitutionAuthorized: false as const,
  numericAcceptanceThresholdAuthorized: false as const,
  fr305AdmissionReceiptAuthorized: false as const,
  traditionalBindingAuthorized: false as const,
  productMaterializationAuthorized: false as const,
  productionAuthorization: false as const,
  commerceAuthorization: false as const,
});

export const FR307_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr307-visible-hairline-empirical-runner-gate-v1' as const,
  contractVersion:
    FR307_VISIBLE_HAIRLINE_EMPIRICAL_RUNNER_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  predecessorContractVersion:
    FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATE_CONTRACT_VERSION,
  parentIssue: 1521 as const,
  empiricalRunnerImplemented: true as const,
  parserSelfTestImplemented: true as const,
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
    'execute_bounded_local_real_capture_bundle_and_record_only_non_identifying_failure_mode_evidence_before_any_fr305_admission_review' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-307 ${message}`);
}

export function assertVisibleHairlineEmpiricalRunnerFR307(): void {
  assertVisibleHairlineRuntimeCandidatesFR306();
  assertFR306CurrentGate();

  if (
    FR306_CURRENT_GATE.primaryCandidate !==
      'candidate.hairline.florence2_base.referring_segmentation.fr306' ||
    FR306_CURRENT_GATE.empiricalRunnerImplemented !== false ||
    FR306_CURRENT_GATE.fr305AdmissionReceiptIssued !== false
  ) {
    fail('FR306 predecessor boundary drift.');
  }

  if (
    FR307_PRIMARY_MODEL.id !== 'microsoft/Florence-2-base' ||
    FR307_PRIMARY_MODEL.revision !==
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac' ||
    FR307_PRIMARY_MODEL.task !==
      '<REFERRING_EXPRESSION_SEGMENTATION>'
  ) {
    fail('primary model pin drift.');
  }

  if (
    FR307_PROMPT_FAMILY.length !== 3 ||
    new Set(FR307_PROMPT_FAMILY.map((entry) => entry.key)).size !==
      3 ||
    FR307_PROMPT_FAMILY[0]?.prompt !== 'visible hair' ||
    FR307_PROMPT_FAMILY[1]?.prompt !== 'forehead skin' ||
    FR307_PROMPT_FAMILY[2]?.prompt !== 'visible hairline' ||
    FR307_PROMPT_FAMILY[2]?.diagnosticOnly !== true
  ) {
    fail('prompt family drift.');
  }

  if (
    FR306_EMPIRICAL_CAPTURE_CASES.length !== 10 ||
    FR307_LOCAL_RUNNER.realModelDownloadInNormalCi !== false ||
    FR307_LOCAL_RUNNER.operatorImageUploadToGitHubActions !== false ||
    FR307_LOCAL_RUNNER.qaOverlayLocalOnly !== true ||
    FR307_LOCAL_RUNNER.rawPolygonBundleLocalOnly !== true
  ) {
    fail('runner execution/privacy boundary drift.');
  }

  if (
    FR307_AUTHORITY_BOUNDARY.candidateEvidenceOnly !== true ||
    Object.entries(FR307_AUTHORITY_BOUNDARY)
      .filter(([key]) => key !== 'candidateEvidenceOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('authority widened beyond candidate evidence.');
  }
}

export function assertFR307CurrentGate(): void {
  const gate = FR307_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.empiricalRunnerImplemented !== true ||
    gate.parserSelfTestImplemented !== true ||
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

assertVisibleHairlineEmpiricalRunnerFR307();
assertFR307CurrentGate();
