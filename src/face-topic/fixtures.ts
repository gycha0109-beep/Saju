import type { FaceAuthorityCoverageSnapshot } from './contracts.js';

export const FR293_MATERIALIZED_OBSERVATION_CAPABILITIES =
  Object.freeze([
    'eye.width_height_ratio',
    'eye.inter_eye_spacing_ratio',
    'eye.outer_corner_tilt',
    'eye.bilateral_shape_asymmetry',
    'mouth.width_and_relative_size',
    'mouth.corner_orientation',
    'mouth.outline_angularity',
    'cheek_midface.visible_width_ratio',
    'cheek_midface.visible_contour_prominence',
    'chin_lower_face.visible_width_ratio',
    'chin_lower_face.visible_contour',
    'nose.bridge_centerline_deviation',
    'nose.tip_contour_circularity',
    'chin_lower_face.chin_height_width_center_deviation',
    'nose.alar_width_and_nostril_geometry',
    'mouth.philtrum_length_width',
    'eyebrow.span_arch_tail_orientation',
    'mouth.visible_lip_fullness',
  ] as const);

export const FR294_HARD_GAP_OBSERVATION_CAPABILITIES =
  Object.freeze([
    'forehead.visible_width_shape',
    'forehead.visible_hairline_boundary',
    'forehead.relative_surface_curvature',
    'eyebrow.visible_hair_density_texture',
    'eye.eyelid_crease_or_hooded_category',
    'nose.tip_bridge_relative_projection',
    'mouth.visible_lip_color',
    'ear.visible_boundary_height_shape',
    'ear.thickness_attachment_canal_boundary',
    'cheek_midface.relative_3d_prominence',
    'chin_lower_face.relative_projection',
  ] as const);

export const FACE_TOPIC_FOUNDATION_FIXTURE_AUTHORITY_SNAPSHOT_FR293_FRB005:
  FaceAuthorityCoverageSnapshot = Object.freeze({
    snapshotId: 'face-topic-fixture-fr293-frb005-v1',
    observationAuthorityRef:
      'FR293-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
    bridgeAuthorityRef:
      'FRB005-T7-METHODOLOGY-SCOPED-BINDING-LEDGER-v1',
    traditionalAuthorityRef:
      'traditional-three-divisions-methodology-pack-t6',
    availableObservationCapabilities:
      FR293_MATERIALIZED_OBSERVATION_CAPABILITIES,
    availableMethodologyRefs: Object.freeze([
      'method.mayi.face_three_divisions.fr261@0.2.0',
      'method.mayi.three_fus_three_governors.fr261@0.1.0',
      'method.shenyi_fu.gujin_636.face_three_divisions@0.1.0',
    ]),
    availableSemanticClaimFamilies: Object.freeze([]),
    bindingGroups: Object.freeze([
      Object.freeze({
        bindingGroupRef: 'face-bridge.frb005.three_divisions',
        requiredBindingCount: 16,
        admittedBindingCount: 0,
        bindingReady: false,
        provenanceRefs: Object.freeze([
          'packages/face-reading/src/traditional-three-divisions-binding-ledger-frb005.ts',
          'issues/1521',
        ]),
      }),
    ]),
    prohibitedInferenceKeys: Object.freeze([
      'objective_personality_diagnosis',
      'intelligence_inference',
      'morality_inference',
      'guaranteed_future_outcome',
      'exact_marriage_age_without_authority',
      'exact_wealth_amount_without_authority',
    ]),
    provenanceRefs: Object.freeze([
      'packages/face-reading/src/canonical-rgb-selfie-morphology-fr293.ts',
      'packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.ts',
      'packages/face-reading/src/traditional-observation-bridge-readiness-frb004.ts',
      'packages/face-reading/src/traditional-three-divisions-binding-ledger-frb005.ts',
      'issues/1521',
    ]),
  });
