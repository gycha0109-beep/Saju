import {
  NEUTRAL_EAR_REFERENCE_TARGET_FR100,
} from './neutral-ear-reference-target-fr100.js';

export type NeutralEarRuntimeCandidateStateFR101 =
  | 'primary_empirical_candidate'
  | 'fallback_empirical_candidate'
  | 'research_comparator_only'
  | 'feasibility_reference_only';

export interface NeutralEarRuntimeCandidateFR101 {
  readonly candidateId: string;
  readonly state: NeutralEarRuntimeCandidateStateFR101;
  readonly components: readonly {
    readonly artifact: string;
    readonly revision: string | null;
    readonly declaredLicense: string;
    readonly role: string;
  }[];
  readonly evidenceRefs: readonly string[];
  readonly proposedInput: readonly string[];
  readonly proposedOutput: readonly string[];
  readonly knownStrengths: readonly string[];
  readonly blockers: readonly string[];
  readonly runtimeObservationAuthorized: false;
  readonly productionAuthorization: false;
}

export const NEUTRAL_EAR_RUNTIME_CANDIDATES_FR101:
  readonly NeutralEarRuntimeCandidateFR101[] = Object.freeze([
    Object.freeze({
      candidateId: 'candidate.ear.florence2_base.referring_segmentation.fr101',
      state: 'primary_empirical_candidate' as const,
      components: [
        Object.freeze({
          artifact: 'microsoft/Florence-2-base',
          revision: '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
          declaredLicense: 'MIT',
          role: 'text_referring_expression_to_polygon_candidate',
        }),
      ],
      evidenceRefs: [
        'https://huggingface.co/microsoft/Florence-2-base',
        'https://huggingface.co/microsoft/Florence-2-base/blob/5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac/processing_florence2.py',
      ],
      proposedInput: [
        'RGB image',
        'one side-specific referring expression per invocation',
        'left external ear OR right external ear',
      ],
      proposedOutput: [
        'candidate polygon mask',
        'provider/model revision provenance',
        'requested side provenance',
      ],
      knownStrengths: [
        'official model card declares MIT',
        'processor exposes REFERRING_EXPRESSION_SEGMENTATION polygon output',
        'single-model path is lighter than a detector-plus-segmenter stack',
      ],
      blockers: [
        'no project-specific ear accuracy evidence yet',
        'left/right side reliability is unverified',
        'hair/accessory/crop failure behavior is unverified',
        'candidate polygon has not been validated against the FR100 external-ear reference concept',
      ],
      runtimeObservationAuthorized: false as const,
      productionAuthorization: false as const,
    }),
    Object.freeze({
      candidateId: 'candidate.ear.grounding_dino_sam2.fr101',
      state: 'fallback_empirical_candidate' as const,
      components: [
        Object.freeze({
          artifact: 'IDEA-Research/grounding-dino-base',
          revision: '12bdfa3120f3e7ec7b434d90674b3396eccf88eb',
          declaredLicense: 'Apache-2.0',
          role: 'open_vocabulary_ear_box_grounding_candidate',
        }),
        Object.freeze({
          artifact: 'facebook/sam2.1-hiera-small',
          revision: 'e07df6aa19f5c6545121551bf89957b7663ee715',
          declaredLicense: 'Apache-2.0',
          role: 'box_prompt_to_mask_refinement_candidate',
        }),
      ],
      evidenceRefs: [
        'https://huggingface.co/IDEA-Research/grounding-dino-base',
        'https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/06319.pdf',
        'https://huggingface.co/facebook/sam2.1-hiera-small',
        'https://github.com/IDEA-Research/Grounded-SAM-2',
      ],
      proposedInput: [
        'RGB image',
        'lowercase period-terminated open-vocabulary ear prompt',
        'side-specific candidate selection policy',
      ],
      proposedOutput: [
        'Grounding DINO candidate box',
        'SAM2 candidate mask',
        'detector and segmenter revision provenance',
      ],
      knownStrengths: [
        'Grounding DINO paper explicitly illustrates ear as a human-input novel category',
        'Grounding DINO model card declares Apache-2.0',
        'SAM2 model card declares Apache-2.0',
        'Grounded-SAM-2 demonstrates the detector/grounder to SAM2 refinement pattern',
      ],
      blockers: [
        'project-specific human external-ear grounding accuracy is unverified',
        'left/right laterality policy is not supplied by the generic models',
        'mask refinement cannot repair a wrongly grounded box',
        'artifact license declarations do not substitute for project legal review of deployment context',
      ],
      runtimeObservationAuthorized: false as const,
      productionAuthorization: false as const,
    }),
    Object.freeze({
      candidateId: 'comparator.ear.celebamask_hq.face_parsing.fr101',
      state: 'research_comparator_only' as const,
      components: [
        Object.freeze({
          artifact: 'switchablenorms/CelebAMask-HQ face parsing',
          revision: null,
          declaredLicense: 'non-commercial research / educational restriction',
          role: 'bilateral_ear_label_feasibility_comparator',
        }),
      ],
      evidenceRefs: [
        'https://github.com/switchablenorms/CelebAMask-HQ',
        'https://github.com/switchablenorms/CelebAMask-HQ/blob/master/face_parsing/README.md',
      ],
      proposedInput: ['RGB face image'],
      proposedOutput: ['l_ear class', 'r_ear class'],
      knownStrengths: [
        'official label inventory explicitly includes l_ear and r_ear',
      ],
      blockers: [
        'official dataset agreement restricts use to non-commercial research purposes',
        'official software notice restricts use to non-commercial research and educational purposes',
        'must not become a product dependency or training-data source without separately obtained rights',
      ],
      runtimeObservationAuthorized: false as const,
      productionAuthorization: false as const,
    }),
    Object.freeze({
      candidateId: 'reference.ear.gnm_mediapipe_fit.fr101',
      state: 'feasibility_reference_only' as const,
      components: [
        Object.freeze({
          artifact: 'google/GNM',
          revision: NEUTRAL_EAR_REFERENCE_TARGET_FR100.sourceAsset.upstreamCommit,
          declaredLicense: 'Apache-2.0',
          role: 'full_head_reference_surface_only',
        }),
      ],
      evidenceRefs: [
        'https://github.com/google/GNM',
        'https://github.com/google/GNM/issues/53',
      ],
      proposedInput: ['face/head observations'],
      proposedOutput: ['hypothetical subject-specific GNM fit'],
      knownStrengths: [
        'FR100 already admits provider-derived bilateral GNM ear reference surfaces',
        'GNM repository declares Apache-2.0',
      ],
      blockers: [
        'official inspected release does not provide the project a ready subject-photo external-ear extraction runtime',
        'official MediaPipe-to-GNM correspondence is not pinned',
        'third-party fitting prototypes are not project authority',
      ],
      runtimeObservationAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  ]);

export const NEUTRAL_EAR_RUNTIME_EMPIRICAL_PROTOCOL_FR101 =
  Object.freeze({
    protocolId: 'protocol.face.neutral_ear_runtime_candidate.fr101',
    candidateOrder: [
      'candidate.ear.florence2_base.referring_segmentation.fr101',
      'candidate.ear.grounding_dino_sam2.fr101',
    ] as const,
    requiredCaptureCases: [
      'frontal_both_ears_if_visible',
      'mild_three_quarter_near_ear',
      'mild_three_quarter_far_ear',
      'stronger_three_quarter_single_ear',
      'hair_partial_occlusion',
      'glasses_or_ear_accessory_if_available',
      'ear_near_image_crop',
      'ear_truncated_or_absent',
    ] as const,
    perSidePromptPolicy: [
      'invoke left and right as separate targets',
      'retain requested-side provenance',
      'do not infer anatomical laterality solely from model label text',
    ] as const,
    validationQuestions: [
      'does the candidate cover visible external pinna rather than generic side-head/cheek/hair/background',
      'does an absent or fully occluded ear fail closed instead of hallucinating a region',
      'does the mask preserve side provenance under mirror/front-camera handling',
      'does crop pressure produce unavailable rather than an accepted partial geometry observation',
    ] as const,
    acceptancePolicy:
      'empirical_evidence_required_no_accuracy_threshold_declared_yet' as const,
    operatorCaptureRequestReady: true as const,
    runtimeObservationAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const NEUTRAL_EAR_RUNTIME_CANDIDATE_AUTHORITY_FR101 =
  Object.freeze({
    phase: 'FR101_RUNTIME_EAR_CANDIDATE_SELECTION' as const,
    predecessorRef:
      `${NEUTRAL_EAR_REFERENCE_TARGET_FR100.authorityRef}@${NEUTRAL_EAR_REFERENCE_TARGET_FR100.authorityVersion}`,
    primaryCandidate:
      'candidate.ear.florence2_base.referring_segmentation.fr101' as const,
    fallbackCandidate:
      'candidate.ear.grounding_dino_sam2.fr101' as const,
    productPathExcludedComparator:
      'comparator.ear.celebamask_hq.face_parsing.fr101' as const,
    admittedRuntimeProviders: 0 as const,
    admittedEarObservations: 0 as const,
    traditionalBindingAuthorized: false as const,
    appearanceInferenceAuthorized: false as const,
    depthOrFullnessInferenceAuthorized: false as const,
    productionAuthorization: false as const,
    nextGate:
      'operator_real_capture_empirical_candidate_evaluation' as const,
  });
