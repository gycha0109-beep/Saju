import {
  FR305_CURRENT_GATE,
  FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_CONTRACT_VERSION,
  assertFR305CurrentGate,
} from './visible-hairline-vertical-reference-fr305.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATE_CONTRACT_VERSION =
  'FR306-VISIBLE-HAIRLINE-RUNTIME-CANDIDATES-v1' as const;

export type FR306HairlineCandidateState =
  | 'primary_empirical_candidate'
  | 'fallback_empirical_candidate'
  | 'secondary_empirical_candidate'
  | 'excluded_product_path';

export interface FR306HairlineCandidateComponent {
  readonly artifact: string;
  readonly revision: string | null;
  readonly declaredLicense: string;
  readonly role: string;
}

export interface FR306HairlineRuntimeCandidate {
  readonly candidateId: string;
  readonly state: FR306HairlineCandidateState;
  readonly components:
    readonly FR306HairlineCandidateComponent[];
  readonly evidenceRefs: readonly string[];
  readonly promptPolicy: readonly string[];
  readonly proposedOutputs: readonly string[];
  readonly strengths: readonly string[];
  readonly blockers: readonly string[];
  readonly mayIssueFR305AdmissionReceipt: false;
  readonly runtimeHairlineObservationAuthorized: false;
  readonly hiddenHairlineCompletionAuthorized: false;
  readonly productionAuthorization: false;
}

export const FR306_PRIMARY_CANDIDATE_ID =
  'candidate.hairline.florence2_base.referring_segmentation.fr306' as const;
export const FR306_FALLBACK_CANDIDATE_ID =
  'candidate.hairline.grounding_dino_sam2.fr306' as const;
export const FR306_ADAPTIVE_BOUNDARY_CANDIDATE_ID =
  'candidate.hairline.adaptive_visible_skin_upper_boundary.fr306' as const;

export const FR306_ADAPTIVE_BOUNDARY_RUNTIME = Object.freeze({
  modelId:
    'myeongha/adaptive-visible-skin-upper-boundary' as const,
  revision: '0.1.0-research' as const,
  runtimeContractVersion:
    'FR306-ADAPTIVE-VISIBLE-SKIN-UPPER-BOUNDARY-RUNTIME-v1' as const,
});

export interface FR306EmpiricalCandidateIdentity {
  readonly candidateId: string;
  readonly modelId: string;
  readonly modelRevision: string;
  readonly runtimeContractVersion: string;
}

export const FR306_EMPIRICAL_CANDIDATE_IDENTITIES:
readonly FR306EmpiricalCandidateIdentity[] = Object.freeze([
  Object.freeze({
    candidateId: FR306_PRIMARY_CANDIDATE_ID,
    modelId: 'microsoft/Florence-2-base',
    modelRevision:
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
    runtimeContractVersion:
      'FR307-VISIBLE-HAIRLINE-EMPIRICAL-RUNNER-v1',
  }),
  Object.freeze({
    candidateId: FR306_FALLBACK_CANDIDATE_ID,
    modelId:
      'IDEA-Research/grounding-dino-base+facebook/sam2.1-hiera-small',
    modelRevision:
      '12bdfa3120f3e7ec7b434d90674b3396eccf88eb+e07df6aa19f5c6545121551bf89957b7663ee715',
    runtimeContractVersion:
      'FR306-GROUNDING-DINO-SAM2-EMPIRICAL-RUNTIME-v1',
  }),
  Object.freeze({
    candidateId: FR306_ADAPTIVE_BOUNDARY_CANDIDATE_ID,
    modelId: FR306_ADAPTIVE_BOUNDARY_RUNTIME.modelId,
    modelRevision: FR306_ADAPTIVE_BOUNDARY_RUNTIME.revision,
    runtimeContractVersion:
      FR306_ADAPTIVE_BOUNDARY_RUNTIME.runtimeContractVersion,
  }),
]);

export function resolveEmpiricalHairlineCandidateIdentityFR306(
  input: Partial<FR306EmpiricalCandidateIdentity> & {
    readonly modelId: string;
    readonly modelRevision: string;
  },
): FR306EmpiricalCandidateIdentity {
  const candidateId =
    input.candidateId ??
    (
      input.modelId === 'microsoft/Florence-2-base' &&
      input.modelRevision ===
        '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac'
        ? FR306_PRIMARY_CANDIDATE_ID
        : null
    );

  const match = FR306_EMPIRICAL_CANDIDATE_IDENTITIES.find(
    (candidate) =>
      candidate.candidateId === candidateId &&
      candidate.modelId === input.modelId &&
      candidate.modelRevision === input.modelRevision &&
      (
        input.runtimeContractVersion == null ||
        candidate.runtimeContractVersion ===
          input.runtimeContractVersion
      ),
  );

  if (!match) {
    throw new FaceAuthorityValidationError(
      'FR-306 empirical hairline candidate identity is not registered at the exact runtime/model revision.',
    );
  }

  return match;
}

export const FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATES:
readonly FR306HairlineRuntimeCandidate[] = Object.freeze([
  Object.freeze({
    candidateId: FR306_PRIMARY_CANDIDATE_ID,
    state: 'primary_empirical_candidate' as const,
    components: Object.freeze([
      Object.freeze({
        artifact: 'microsoft/Florence-2-base',
        revision:
          '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
        declaredLicense: 'MIT',
        role:
          'text_referring_expression_to_visible_region_polygon_candidate',
      }),
    ]),
    evidenceRefs: Object.freeze([
      'https://huggingface.co/microsoft/Florence-2-base',
      'https://huggingface.co/microsoft/Florence-2-base/blob/5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac/processing_florence2.py',
      'repo:packages/face-reading/src/neutral-ear-runtime-candidates-fr101.ts',
      'repo:tools/face-reading/ear/run_florence2_ear_empirical.py',
    ]),
    promptPolicy: Object.freeze([
      'primary_region_prompt=visible hair',
      'paired_region_prompt=forehead skin',
      'diagnostic_direct_boundary_prompt=visible hairline',
      'direct_boundary_prompt_never_authoritative_without_empirical_review',
      'region_pair_adjacency_never_auto_admitted_without_empirical_review',
    ]),
    proposedOutputs: Object.freeze([
      'candidate visible-hair polygon set',
      'candidate forehead-skin polygon set',
      'diagnostic direct-hairline polygon set',
      'model id and exact revision provenance',
      'descriptive polygon geometry only',
    ]),
    strengths: Object.freeze([
      'same exact model revision is already pinned by FR101',
      'existing local Florence-2 parser/runner mechanics are reusable',
      'processor exposes referring-expression segmentation polygon output',
      'single-model primary lane avoids introducing a second runtime stack before empirical evidence',
    ]),
    blockers: Object.freeze([
      'no MyeongHa visible-hairline empirical evidence yet',
      'hair polygon does not by itself identify the hair-skin interface',
      'forehead-skin polygon adjacency reliability is unverified',
      'direct visible-hairline prompt reliability is unverified',
      'partial and full occlusion failure behavior is unverified',
      'candidate output has not satisfied FR305 admission requirements',
    ]),
    mayIssueFR305AdmissionReceipt: false as const,
    runtimeHairlineObservationAuthorized: false as const,
    hiddenHairlineCompletionAuthorized: false as const,
    productionAuthorization: false as const,
  }),
  Object.freeze({
    candidateId: FR306_FALLBACK_CANDIDATE_ID,
    state: 'fallback_empirical_candidate' as const,
    components: Object.freeze([
      Object.freeze({
        artifact: 'IDEA-Research/grounding-dino-base',
        revision:
          '12bdfa3120f3e7ec7b434d90674b3396eccf88eb',
        declaredLicense: 'Apache-2.0',
        role:
          'open_vocabulary_visible_hair_or_forehead_region_grounding_candidate',
      }),
      Object.freeze({
        artifact: 'facebook/sam2.1-hiera-small',
        revision:
          'e07df6aa19f5c6545121551bf89957b7663ee715',
        declaredLicense: 'Apache-2.0',
        role:
          'grounded_box_to_region_mask_refinement_candidate',
      }),
    ]),
    evidenceRefs: Object.freeze([
      'repo:packages/face-reading/src/neutral-ear-runtime-candidates-fr101.ts',
      'https://huggingface.co/IDEA-Research/grounding-dino-base',
      'https://huggingface.co/facebook/sam2.1-hiera-small',
      'https://github.com/IDEA-Research/Grounded-SAM-2',
    ]),
    promptPolicy: Object.freeze([
      'ground visible hair and forehead skin as separate candidate regions',
      'retain exact grounding and mask-refinement provenance',
      'wrong grounding cannot be repaired by segmentation refinement',
      'no detector score becomes an FR305 acceptance threshold',
    ]),
    proposedOutputs: Object.freeze([
      'candidate region boxes',
      'candidate refined masks',
      'detector and segmenter revision provenance',
      'descriptive region adjacency evidence only',
    ]),
    strengths: Object.freeze([
      'fallback component revisions are already pinned by FR101',
      'separates open-vocabulary grounding from mask refinement',
      'may provide a useful failure-mode comparator to the single-model Florence-2 lane',
    ]),
    blockers: Object.freeze([
      'project-specific visible-hair grounding reliability is unverified',
      'project-specific forehead-skin grounding reliability is unverified',
      'mask refinement cannot rescue a wrongly grounded region',
      'candidate output has not satisfied FR305 admission requirements',
    ]),
    mayIssueFR305AdmissionReceipt: false as const,
    runtimeHairlineObservationAuthorized: false as const,
    hiddenHairlineCompletionAuthorized: false as const,
    productionAuthorization: false as const,
  }),
  Object.freeze({
    candidateId: FR306_ADAPTIVE_BOUNDARY_CANDIDATE_ID,
    state: 'secondary_empirical_candidate' as const,
    components: Object.freeze([
      Object.freeze({
        artifact:
          'MyeongHa adaptive visible-skin upper-boundary algorithm',
        revision:
          FR306_ADAPTIVE_BOUNDARY_RUNTIME.revision,
        declaredLicense:
          'project-owned implementation; external runtime dependencies reviewed separately',
        role:
          'image_derived_visible_face_skin_upper_boundary_candidate_with_fail_closed_visibility_gate',
      }),
    ]),
    evidenceRefs: Object.freeze([
      'repo:research/face-reading/fr306-visible-hairline-runtime-candidates.md',
      'issue:#2213',
      'issue:#2253',
    ]),
    promptPolicy: Object.freeze([
      'no_text_prompt_used',
      'derive_candidate_from_visible_face_skin_component_only',
      'face_or_eye_detection_may_gate_visibility_but_must_not_supply_hairline_geometry',
      'crop_or_insufficient_visibility_returns_unavailable',
      'hidden_hairline_completion_forbidden',
    ]),
    proposedOutputs: Object.freeze([
      'visible face-skin upper-boundary polyline candidate',
      'visibility availability state',
      'runtime algorithm revision provenance',
      'no hidden boundary completion',
    ]),
    strengths: Object.freeze([
      'deterministic image-derived boundary rather than open-vocabulary hairline semantics',
      'explicitly fails closed on crop and low visible-interface clearance',
      'does not depend on CelebAMask-HQ-derived restricted training labels',
      '13-image exploratory local evidence separates visible and occluded failure modes',
    ]),
    blockers: Object.freeze([
      'current 13-image evidence is exploratory and not representative admission authority',
      'visibility safety rule requires governed expanded validation',
      'runtime dependency packaging is not yet a production provider admission',
      'candidate output has not satisfied FR305 admission requirements',
    ]),
    mayIssueFR305AdmissionReceipt: false as const,
    runtimeHairlineObservationAuthorized: false as const,
    hiddenHairlineCompletionAuthorized: false as const,
    productionAuthorization: false as const,
  }),
  Object.freeze({
    candidateId:
      'excluded.hairline.celebamask_hq_face_parsing.fr306',
    state: 'excluded_product_path' as const,
    components: Object.freeze([
      Object.freeze({
        artifact:
          'CelebAMask-HQ / derivatives trained on its face-parsing labels',
        revision: null,
        declaredLicense:
          'dataset restricted to non-commercial research; software notice restricted to non-commercial research/education',
        role:
          'hair_and_skin_label_feasibility_reference_not_product_dependency',
      }),
    ]),
    evidenceRefs: Object.freeze([
      'https://mmlab.ie.cuhk.edu.hk/projects/CelebA/CelebAMask_HQ.html',
      'https://github.com/switchablenorms/CelebAMask-HQ',
    ]),
    promptPolicy: Object.freeze([
      'do_not_use_as_product_runtime_dependency',
      'do_not_use_derived_masks_to_issue_FR305_product_admission',
    ]),
    proposedOutputs: Object.freeze([
      'none for the product path',
    ]),
    strengths: Object.freeze([
      'label inventory includes both skin and hair classes',
    ]),
    blockers: Object.freeze([
      'official dataset agreement limits use to non-commercial research',
      'official software notice restricts use to non-commercial research and education',
      'rights are not compatible with assuming a MyeongHa commercial product dependency',
    ]),
    mayIssueFR305AdmissionReceipt: false as const,
    runtimeHairlineObservationAuthorized: false as const,
    hiddenHairlineCompletionAuthorized: false as const,
    productionAuthorization: false as const,
  }),
]);

export const FR306_EMPIRICAL_CAPTURE_CASES = Object.freeze([
  'clear_unobstructed_central_hairline',
  'm_shaped_or_widows_peak_visible_contour',
  'side_recession_or_asymmetric_visible_hairline',
  'partial_bangs_occlusion',
  'heavy_bangs_hairline_substantially_hidden',
  'cropped_upper_forehead',
  'headwear_occlusion_if_available',
  'dark_hair_dark_background',
  'light_hair_or_low_local_contrast',
  'ordinary_indoor_illumination_variation',
] as const);

export const FR306_EMPIRICAL_REVIEW_QUESTIONS = Object.freeze([
  'candidate follows visible hair-skin boundary rather than face oval eyebrow shadow or background',
  'partial occlusion remains partial rather than hallucinated completion',
  'substantially hidden hairline returns unavailable rather than completed boundary',
  'hair and forehead-skin candidate regions are coherent where both are visibly present',
  'direct visible-hairline prompt does not silently create hidden segments',
  'crop or truncation pressure is represented explicitly rather than silently accepted',
] as const);

export const FR306_PRIVACY_BOUNDARY = Object.freeze({
  sourceImagesRemainLocal: true as const,
  qaOverlaysRemainLocal: true as const,
  rawPolygonBundlesRemainLocal: true as const,
  privateImageDigestsEnterGitHistory: false as const,
  githubActionsReceiveOperatorImages: false as const,
  defaultOutputPath:
    '.cache/face-reading/hairline-fr306' as const,
  repositoryMayPersist:
    'aggregate_non_identifying_failure_mode_conclusions_only' as const,
});

export const FR306_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr306-visible-hairline-runtime-candidate-gate-v1' as const,
  contractVersion:
    FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATE_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  predecessorContractVersion:
    FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_CONTRACT_VERSION,
  parentIssue: 1521 as const,
  primaryCandidate:
    'candidate.hairline.florence2_base.referring_segmentation.fr306' as const,
  fallbackCandidate:
    FR306_FALLBACK_CANDIDATE_ID,
  secondaryCandidate:
    FR306_ADAPTIVE_BOUNDARY_CANDIDATE_ID,
  excludedProductPath:
    'excluded.hairline.celebamask_hq_face_parsing.fr306' as const,
  empiricalRunnerImplemented: false as const,
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
    'build_local_empirical_runner_for_primary_florence2_hairline_prompt_family_without_model_download_in_ci' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-306 ${message}`);
}

function assertRefs(
  refs: readonly string[],
  label: string,
): void {
  if (
    refs.length === 0 ||
    refs.some((ref) => ref.trim().length === 0) ||
    new Set(refs).size !== refs.length
  ) {
    fail(`${label} must contain unique non-empty refs.`);
  }
}

export function assertVisibleHairlineRuntimeCandidatesFR306(): void {
  assertFR305CurrentGate();

  if (
    FR305_CURRENT_GATE.validatedHairlineModelAdmitted !== false ||
    FR305_CURRENT_GATE
      .handoffReadyNeutralReferenceCapabilityCount !== 6 ||
    FR305_CURRENT_GATE
      .remainingNeutralReferenceCapabilityCount !== 1
  ) {
    fail('FR305 predecessor readiness drift.');
  }

  const candidates = FR306_VISIBLE_HAIRLINE_RUNTIME_CANDIDATES;
  if (
    candidates.length !== 4 ||
    new Set(candidates.map((entry) => entry.candidateId)).size !==
      4
  ) {
    fail('candidate registry must contain exactly three unique entries.');
  }

  const primary = candidates.find(
    (entry) =>
      entry.state === 'primary_empirical_candidate',
  );
  const fallback = candidates.find(
    (entry) =>
      entry.state === 'fallback_empirical_candidate',
  );
  const secondary = candidates.find(
    (entry) =>
      entry.state === 'secondary_empirical_candidate',
  );
  const excluded = candidates.find(
    (entry) =>
      entry.state === 'excluded_product_path',
  );

  if (
    primary?.candidateId !==
      FR306_CURRENT_GATE.primaryCandidate ||
    primary.components.length !== 1 ||
    primary.components[0]?.artifact !==
      'microsoft/Florence-2-base' ||
    primary.components[0]?.revision !==
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac' ||
    primary.components[0]?.declaredLicense !== 'MIT'
  ) {
    fail('primary Florence-2 candidate drift.');
  }

  if (
    fallback?.candidateId !==
      FR306_CURRENT_GATE.fallbackCandidate ||
    fallback.components.length !== 2 ||
    fallback.components[0]?.artifact !==
      'IDEA-Research/grounding-dino-base' ||
    fallback.components[0]?.revision !==
      '12bdfa3120f3e7ec7b434d90674b3396eccf88eb' ||
    fallback.components[1]?.artifact !==
      'facebook/sam2.1-hiera-small' ||
    fallback.components[1]?.revision !==
      'e07df6aa19f5c6545121551bf89957b7663ee715'
  ) {
    fail('fallback Grounding-DINO/SAM2 candidate drift.');
  }

  if (
    secondary?.candidateId !==
      FR306_CURRENT_GATE.secondaryCandidate ||
    secondary.components.length !== 1 ||
    secondary.components[0]?.revision !==
      FR306_ADAPTIVE_BOUNDARY_RUNTIME.revision ||
    secondary.hiddenHairlineCompletionAuthorized !== false ||
    secondary.productionAuthorization !== false
  ) {
    fail('secondary adaptive visible-boundary candidate drift.');
  }

  if (
    FR306_EMPIRICAL_CANDIDATE_IDENTITIES.length !== 3 ||
    new Set(
      FR306_EMPIRICAL_CANDIDATE_IDENTITIES.map(
        (entry) => entry.candidateId,
      ),
    ).size !== 3
  ) {
    fail('empirical candidate identity registry drift.');
  }

  if (
    excluded?.candidateId !==
      FR306_CURRENT_GATE.excludedProductPath ||
    !excluded.components[0]?.declaredLicense.includes(
      'non-commercial',
    )
  ) {
    fail('restricted face-parsing exclusion drift.');
  }

  for (const candidate of candidates) {
    assertRefs(candidate.evidenceRefs, candidate.candidateId);
    if (
      candidate.promptPolicy.length === 0 ||
      candidate.proposedOutputs.length === 0 ||
      candidate.strengths.length === 0 ||
      candidate.blockers.length === 0 ||
      candidate.mayIssueFR305AdmissionReceipt !== false ||
      candidate.runtimeHairlineObservationAuthorized !== false ||
      candidate.hiddenHairlineCompletionAuthorized !== false ||
      candidate.productionAuthorization !== false
    ) {
      fail(`candidate authority widened: ${candidate.candidateId}.`);
    }
  }

  if (
    FR306_EMPIRICAL_CAPTURE_CASES.length !== 10 ||
    new Set(FR306_EMPIRICAL_CAPTURE_CASES).size !== 10 ||
    FR306_EMPIRICAL_REVIEW_QUESTIONS.length !== 6 ||
    FR306_PRIVACY_BOUNDARY.sourceImagesRemainLocal !== true ||
    FR306_PRIVACY_BOUNDARY.qaOverlaysRemainLocal !== true ||
    FR306_PRIVACY_BOUNDARY.rawPolygonBundlesRemainLocal !== true ||
    FR306_PRIVACY_BOUNDARY.privateImageDigestsEnterGitHistory !==
      false ||
    FR306_PRIVACY_BOUNDARY.githubActionsReceiveOperatorImages !==
      false
  ) {
    fail('empirical/privacy protocol drift.');
  }
}

export function assertFR306CurrentGate(): void {
  const gate = FR306_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.empiricalRunnerImplemented !== false ||
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

assertVisibleHairlineRuntimeCandidatesFR306();
assertFR306CurrentGate();
