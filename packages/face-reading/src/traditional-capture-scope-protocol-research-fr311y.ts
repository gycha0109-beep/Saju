import {
  EIGHT_STUDY_HALLS_FR311S,
  FOUR_STUDY_HALLS_FR311S,
  TEN_OBSERVATIONS_FR311S,
  THREE_PILLARS_FR311S,
} from './traditional-static-structure-methodology-fr311s.js';
import {
  FR311V_METHODOLOGY_AUDIT,
} from './traditional-expanded-static-observation-gap-audit-fr311v.js';

export type CaptureRequirementStateFR311Y =
  | 'available_in_current_v1_static_face'
  | 'additional_rgb_state_required'
  | 'additional_view_required'
  | 'non_face_visual_scope_required'
  | 'audio_scope_required'
  | 'source_region_unresolved';

export type CaptureModeFR311Y =
  | 'frontal_neutral_face'
  | 'frontal_teeth_visible'
  | 'frontal_tongue_extended'
  | 'ear_visible_oblique_or_profile'
  | 'whole_head_visible'
  | 'full_body_posture_visible'
  | 'waist_back_visible'
  | 'hands_visible'
  | 'feet_visible'
  | 'voice_audio'
  | 'no_capture_until_source_region_resolved';

export interface CaptureRequirementFR311Y {
  readonly requirementId: string;
  readonly traditionalMemberKeys: readonly string[];
  readonly state: CaptureRequirementStateFR311Y;
  readonly captureMode: CaptureModeFR311Y;
  readonly neutralPurpose: string;
  readonly currentV1StaticFaceSatisfies: boolean;
  readonly inferenceFromMissingInputAuthorized: false;
  readonly traditionalSemanticInferenceAuthorized: false;
}

export type CaptureProtocolResolutionFR311Y =
  | 'multi_state_face_capture_required'
  | 'mixed_multi_state_and_unresolved_surface'
  | 'multimodal_outside_v1_static_face_scope'
  | 'multi_region_outside_v1_static_face_scope';

export interface MethodologyCaptureProtocolFR311Y {
  readonly methodologyId: string;
  readonly sourceSection: string;
  readonly resolution: CaptureProtocolResolutionFR311Y;
  readonly requirements: readonly CaptureRequirementFR311Y[];
  readonly currentV1StaticFaceComplete: false;
  readonly protocolResearchComplete: true;
  readonly captureExecutionAuthorizedByThisStudy: false;
  readonly empiricalValidationStarted: false;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly productActivationAuthorized: false;
}

function requirement(
  requirementId: string,
  traditionalMemberKeys: readonly string[],
  state: CaptureRequirementStateFR311Y,
  captureMode: CaptureModeFR311Y,
  neutralPurpose: string,
): CaptureRequirementFR311Y {
  return Object.freeze({
    requirementId,
    traditionalMemberKeys: Object.freeze([...traditionalMemberKeys]),
    state,
    captureMode,
    neutralPurpose,
    currentV1StaticFaceSatisfies:
      state === 'available_in_current_v1_static_face',
    inferenceFromMissingInputAuthorized: false as const,
    traditionalSemanticInferenceAuthorized: false as const,
  });
}

function protocol(
  methodologyId: string,
  sourceSection: string,
  resolution: CaptureProtocolResolutionFR311Y,
  requirements: readonly CaptureRequirementFR311Y[],
): MethodologyCaptureProtocolFR311Y {
  return Object.freeze({
    methodologyId,
    sourceSection,
    resolution,
    requirements: Object.freeze([...requirements]),
    currentV1StaticFaceComplete: false as const,
    protocolResearchComplete: true as const,
    captureExecutionAuthorizedByThisStudy: false as const,
    empiricalValidationStarted: false as const,
    automaticTraditionalBindingAuthorized: false as const,
    thresholdAuthorized: false as const,
    productActivationAuthorized: false as const,
  });
}

export const FR311Y_FOUR_STUDY_HALLS_CAPTURE_PROTOCOL =
  protocol(
    FOUR_STUDY_HALLS_FR311S.methodologyId,
    FOUR_STUDY_HALLS_FR311S.sourceSection,
    'multi_state_face_capture_required',
    [
      requirement(
        'fr311y.four_study_halls.frontal_face',
        ['official_hall', 'emolument_hall'],
        'available_in_current_v1_static_face',
        'frontal_neutral_face',
        'Observe only the already-visible eye and forehead surfaces in a neutral frontal capture; no traditional hall judgment is produced.',
      ),
      requirement(
        'fr311y.four_study_halls.teeth',
        ['inner_hall'],
        'additional_rgb_state_required',
        'frontal_teeth_visible',
        'Acquire a separate explicit teeth-visible state if the front teeth themselves are to be observed; do not infer hidden dentition from closed lips.',
      ),
      requirement(
        'fr311y.four_study_halls.ear_gate_front',
        ['outer_hall'],
        'additional_view_required',
        'ear_visible_oblique_or_profile',
        'Acquire a view in which the external-ear/front-of-ear surface is directly visible; frontal presence alone does not guarantee visibility.',
      ),
    ],
  );

export const FR311Y_EIGHT_STUDY_HALLS_CAPTURE_PROTOCOL =
  protocol(
    EIGHT_STUDY_HALLS_FR311S.methodologyId,
    EIGHT_STUDY_HALLS_FR311S.sourceSection,
    'mixed_multi_state_and_unresolved_surface',
    [
      requirement(
        'fr311y.eight_study_halls.face_visible',
        ['02_gaoguang', '03_guangda', '04_mingxiu'],
        'available_in_current_v1_static_face',
        'frontal_neutral_face',
        'Observe only directly visible forehead, central-forehead and eye surfaces in the governed frontal capture.',
      ),
      requirement(
        'fr311y.eight_study_halls.whole_head',
        ['01_gaoming'],
        'additional_view_required',
        'whole_head_visible',
        'Use a framing that contains the whole visible head outline; the ordinary cropped face frame must not stand in for whole-head morphology.',
      ),
      requirement(
        'fr311y.eight_study_halls.ear',
        ['05_congming'],
        'additional_view_required',
        'ear_visible_oblique_or_profile',
        'Require directly visible external-ear boundaries under a separately admitted view; hair or frontal occlusion is not completed by inference.',
      ),
      requirement(
        'fr311y.eight_study_halls.teeth',
        ['06_zhongxin'],
        'additional_rgb_state_required',
        'frontal_teeth_visible',
        'Use a separate teeth-visible capture state; closed-mouth imagery cannot provide dentition evidence.',
      ),
      requirement(
        'fr311y.eight_study_halls.tongue',
        ['07_guangde'],
        'additional_rgb_state_required',
        'frontal_tongue_extended',
        'Use an explicit tongue-visible state if tongue morphology is ever studied; tongue state is not inferred from the face.',
      ),
      requirement(
        'fr311y.eight_study_halls.bansun',
        ['08_bansun'],
        'source_region_unresolved',
        'no_capture_until_source_region_resolved',
        'Do not design a capture or image proxy for 班筍部 until the source-side surface referred to by 橫紋中節停合雙 is independently resolved.',
      ),
    ],
  );

export const FR311Y_TEN_OBSERVATIONS_CAPTURE_PROTOCOL =
  protocol(
    TEN_OBSERVATIONS_FR311S.methodologyId,
    TEN_OBSERVATIONS_FR311S.sourceSection,
    'multimodal_outside_v1_static_face_scope',
    [
      requirement(
        'fr311y.ten_observations.face_subset',
        ['04_head_forehead', '05_mountains_divisions', '06_officers_ministries'],
        'available_in_current_v1_static_face',
        'frontal_neutral_face',
        'A frontal face capture may supply only the directly visible face subset; it cannot satisfy the full Ten Observations method.',
      ),
      requirement(
        'fr311y.ten_observations.whole_body_demeanor',
        ['01_demeanor', '02_weight_spirit', '10_sitting_walking'],
        'non_face_visual_scope_required',
        'full_body_posture_visible',
        'Whole-body posture or movement requires a separately governed non-face visual protocol; static facial geometry must not proxy demeanor or behavior.',
      ),
      requirement(
        'fr311y.ten_observations.waist_back',
        ['07_waist_back'],
        'non_face_visual_scope_required',
        'waist_back_visible',
        'Waist/back morphology requires direct non-face visual input; a face image provides no evidence.',
      ),
      requirement(
        'fr311y.ten_observations.hands',
        ['08_hands_feet'],
        'non_face_visual_scope_required',
        'hands_visible',
        'Hand morphology requires direct hand-visible input and is outside the V1 static face capture.',
      ),
      requirement(
        'fr311y.ten_observations.feet',
        ['08_hands_feet'],
        'non_face_visual_scope_required',
        'feet_visible',
        'Foot morphology requires direct foot-visible input and is outside the V1 static face capture.',
      ),
      requirement(
        'fr311y.ten_observations.voice',
        ['09_voice_and_mind'],
        'audio_scope_required',
        'voice_audio',
        'Voice requires an explicit audio channel; no facial or visual feature may stand in for voice. The 心田 wording is not converted into a modern morality fact.',
      ),
    ],
  );

export const FR311Y_THREE_PILLARS_CAPTURE_PROTOCOL =
  protocol(
    THREE_PILLARS_FR311S.methodologyId,
    THREE_PILLARS_FR311S.sourceSection,
    'multi_region_outside_v1_static_face_scope',
    [
      requirement(
        'fr311y.three_pillars.nose',
        ['beam_pillar'],
        'available_in_current_v1_static_face',
        'frontal_neutral_face',
        'The nose can be directly visible in the frontal face input, but no 三柱 semantic judgment follows from visibility alone.',
      ),
      requirement(
        'fr311y.three_pillars.whole_head',
        ['longevity_pillar'],
        'additional_view_required',
        'whole_head_visible',
        '頭 requires a whole-head visible framing rather than a cropped face approximation.',
      ),
      requirement(
        'fr311y.three_pillars.feet',
        ['building_pillar'],
        'non_face_visual_scope_required',
        'feet_visible',
        '足 requires direct foot-visible input and is outside the current V1 static face capture.',
      ),
    ],
  );

export const FR311Y_CAPTURE_PROTOCOLS:
readonly MethodologyCaptureProtocolFR311Y[] = Object.freeze([
  FR311Y_FOUR_STUDY_HALLS_CAPTURE_PROTOCOL,
  FR311Y_EIGHT_STUDY_HALLS_CAPTURE_PROTOCOL,
  FR311Y_TEN_OBSERVATIONS_CAPTURE_PROTOCOL,
  FR311Y_THREE_PILLARS_CAPTURE_PROTOCOL,
]);

function countState(state: CaptureRequirementStateFR311Y): number {
  return FR311Y_CAPTURE_PROTOCOLS
    .flatMap((item) => item.requirements)
    .filter((item) => item.state === state)
    .length;
}

export const FR311Y_RESEARCH_SUMMARY = Object.freeze({
  methodologyTargets: FR311Y_CAPTURE_PROTOCOLS.length,
  captureRequirements:
    FR311Y_CAPTURE_PROTOCOLS
      .reduce((sum, item) => sum + item.requirements.length, 0),
  currentV1StaticFaceRequirements:
    countState('available_in_current_v1_static_face'),
  additionalRgbStateRequirements:
    countState('additional_rgb_state_required'),
  additionalViewRequirements:
    countState('additional_view_required'),
  nonFaceVisualScopeRequirements:
    countState('non_face_visual_scope_required'),
  audioScopeRequirements:
    countState('audio_scope_required'),
  unresolvedSourceRegionRequirements:
    countState('source_region_unresolved'),
  currentV1CompleteMethodologies:
    FR311Y_CAPTURE_PROTOCOLS
      .filter((item) => item.currentV1StaticFaceComplete).length,
  empiricalValidationStarted: false,
  automaticTraditionalBindingsAuthorized: 0,
  thresholdsAuthorized: 0,
  productActivationsAuthorized: 0,
});

export const FR311Y_AUTHORITY_BOUNDARY = Object.freeze({
  missingInputInferenceAuthorized: false as const,
  visualToVoiceInferenceAuthorized: false as const,
  faceToWholeBodyInferenceAuthorized: false as const,
  hiddenDentitionInferenceAuthorized: false as const,
  hiddenTongueInferenceAuthorized: false as const,
  hiddenEarCompletionAuthorized: false as const,
  captureExecutionAuthorized: false as const,
  empiricalValidationAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  thresholdAuthorized: false as const,
  populationNormAuthorized: false as const,
  productActivationAuthorized: false as const,
  modernPsychologyOrMoralityFactAuthorized: false as const,
});

export function assertCaptureScopeProtocolResearchFR311Y(): void {
  const expected = FR311V_METHODOLOGY_AUDIT
    .filter((item) =>
      item.nextResearchLane === 'capture_protocol_research')
    .map((item) => item.targetId)
    .sort();
  const actual = FR311Y_CAPTURE_PROTOCOLS
    .map((item) => item.methodologyId)
    .sort();

  if (
    expected.length !== 4 ||
    actual.length !== 4 ||
    JSON.stringify(expected) !== JSON.stringify(actual)
  ) {
    throw new Error('fr311y_target_coverage_drift');
  }

  const ids = FR311Y_CAPTURE_PROTOCOLS
    .flatMap((item) => item.requirements)
    .map((item) => item.requirementId);
  if (new Set(ids).size !== ids.length) {
    throw new Error('fr311y_duplicate_requirement_id');
  }

  for (const protocolValue of FR311Y_CAPTURE_PROTOCOLS) {
    if (
      protocolValue.requirements.length === 0 ||
      protocolValue.currentV1StaticFaceComplete !== false ||
      protocolValue.protocolResearchComplete !== true ||
      protocolValue.captureExecutionAuthorizedByThisStudy !== false ||
      protocolValue.empiricalValidationStarted !== false ||
      protocolValue.automaticTraditionalBindingAuthorized !== false ||
      protocolValue.thresholdAuthorized !== false ||
      protocolValue.productActivationAuthorized !== false
    ) {
      throw new Error(
        'fr311y_protocol_authority_drift:' +
        protocolValue.methodologyId,
      );
    }

    for (const item of protocolValue.requirements) {
      if (
        item.traditionalMemberKeys.length === 0 ||
        item.neutralPurpose.trim().length === 0 ||
        item.inferenceFromMissingInputAuthorized !== false ||
        item.traditionalSemanticInferenceAuthorized !== false
      ) {
        throw new Error(
          'fr311y_invalid_requirement:' + item.requirementId,
        );
      }

      if (
        item.currentV1StaticFaceSatisfies !==
        (item.state === 'available_in_current_v1_static_face')
      ) {
        throw new Error(
          'fr311y_current_capture_flag_drift:' + item.requirementId,
        );
      }
    }
  }

  if (
    FR311Y_RESEARCH_SUMMARY.methodologyTargets !== 4 ||
    FR311Y_RESEARCH_SUMMARY.currentV1CompleteMethodologies !== 0 ||
    FR311Y_RESEARCH_SUMMARY.empiricalValidationStarted !== false
  ) {
    throw new Error('fr311y_summary_drift');
  }

  for (const [key, value] of Object.entries(FR311Y_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr311y_global_authority_widening:' + key);
    }
  }
}
