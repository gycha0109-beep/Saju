import {
  FR282_RGB_SELFIE_FEATURE_ENTRIES,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  STATIC_MISSING_REGION_DIRECT_RULES_FR311R,
} from './traditional-static-missing-region-semantics-fr311r.js';
import {
  STATIC_METHODOLOGIES_FR311S,
} from './traditional-static-structure-methodology-fr311s.js';

export type ExpandedStaticAuditDispositionFR311V =
  | 'current_materialized_neutral_observation_candidate'
  | 'neutral_observation_exists_but_extractor_or_authority_gap'
  | 'multi_feature_construct_definition_required'
  | 'source_side_observation_definition_insufficient'
  | 'structure_or_region_map_operationalization_required'
  | 'capture_state_or_visibility_limited'
  | 'manual_only_explicit_traditional_key_required'
  | 'semantic_only_no_observation_binding'
  | 'product_binding_prohibited';

export type ExpandedStaticAuditTargetKindFR311V =
  | 'missing_region_direct_rule'
  | 'static_methodology_definition';

export type ExpandedStaticNextResearchLaneFR311V =
  | 'neutral_observation_construct_research'
  | 'region_map_research'
  | 'capture_protocol_research'
  | 'manual_only'
  | 'semantic_only'
  | 'prohibited';

export interface ExpandedStaticObservationGapAuditFR311V {
  readonly auditId: string;
  readonly targetKind: ExpandedStaticAuditTargetKindFR311V;
  readonly targetId: string;
  readonly sourceExpressionOrSection: string;
  readonly disposition: ExpandedStaticAuditDispositionFR311V;
  readonly candidateNeutralFeatureKeys: readonly string[];
  readonly materializedCandidateFeatureKeys: readonly string[];
  readonly missingNeutralConstructs: readonly string[];
  readonly gapReason: string;
  readonly nextResearchLane: ExpandedStaticNextResearchLaneFR311V;
  readonly candidateNeutralFeaturesAreEquivalenceProof: false;
  readonly empiricalValidationStarted: false;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly providerLandmarkDirectBindingAuthorized: false;
  readonly metricThresholdAuthorized: false;
  readonly populationNormAuthorized: false;
  readonly crossLineageCanonicalMapAuthorized: false;
  readonly multiFeatureSynthesisAuthorized: false;
  readonly namedFormClassifierAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modernScientificFactAuthorized: false;
}

interface AuditSeedFR311V {
  readonly disposition: ExpandedStaticAuditDispositionFR311V;
  readonly candidateNeutralFeatureKeys: readonly string[];
  readonly missingNeutralConstructs?: readonly string[];
  readonly gapReason: string;
  readonly nextResearchLane: ExpandedStaticNextResearchLaneFR311V;
}

const MATERIALIZED_FEATURE_KEYS_FR311V: ReadonlySet<string> = new Set(
  FR293_PRODUCT_COLUMN_MAP
    .filter((item) =>
      item.implementationState === 'canonical_extractor_materialized')
    .map((item) => item.featureKey),
);

const KNOWN_NEUTRAL_FEATURE_KEYS_FR311V: ReadonlySet<string> = new Set(
  FR282_RGB_SELFIE_FEATURE_ENTRIES.map((item) => item.featureKey),
);

const F = {
  foreheadWidthShape: 'forehead.visible_width_shape',
  foreheadHairline: 'forehead.visible_hairline_boundary',
  foreheadCurvature: 'forehead.relative_surface_curvature',
  cheekWidth: 'cheek_midface.visible_width_ratio',
  cheekContour: 'cheek_midface.visible_contour_prominence',
  cheekRelative3d: 'cheek_midface.relative_3d_prominence',
  lowerWidth: 'chin_lower_face.visible_width_ratio',
  lowerContour: 'chin_lower_face.visible_contour',
  chinDimensions: 'chin_lower_face.chin_height_width_center_deviation',
  lowerProjection: 'chin_lower_face.relative_projection',
} as const;

const RULE_AUDIT_SEEDS_FR311V: Readonly<Record<string, AuditSeedFR311V>> =
  Object.freeze({
    'fr311r.forehead.raised_broad': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.foreheadWidthShape, F.foreheadCurvature],
      missingNeutralConstructs: [],
      gapReason:
        '隆然而起/聳然而闊 combines visible breadth with relative relief; neither current forehead surface is materialized and no approved compound construct exists.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.forehead.steep_broad': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.foreheadWidthShape, F.foreheadCurvature],
      missingNeutralConstructs: [],
      gapReason:
        '峻如立壁/廣如覆肝 is a compound width-plus-relief description and cannot be reduced to one current axis.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.forehead.bright_square_long': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.foreheadWidthShape],
      missingNeutralConstructs: [
        'forehead.visible_brightness_or_lustre',
        'forehead.visible_height_or_length',
      ],
      gapReason:
        '明而澤/方而長 combines appearance and shape; the current matrix lacks a governed forehead appearance axis and an explicit forehead height/length construct.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.forehead.small_narrow': {
      disposition: 'neutral_observation_exists_but_extractor_or_authority_gap',
      candidateNeutralFeatureKeys: [F.foreheadWidthShape],
      missingNeutralConstructs: [],
      gapReason:
        '小而狹 is plausibly comparable to visible forehead extent, but the registered forehead width/shape surface still requires a new image model.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.forehead.defective_sunken': {
      disposition: 'neutral_observation_exists_but_extractor_or_authority_gap',
      candidateNeutralFeatureKeys: [F.foreheadCurvature],
      missingNeutralConstructs: ['forehead.visible_defect_or_depression_boundary'],
      gapReason:
        '缺而陷 includes depression/defect morphology; relative forehead curvature is not yet benchmarked and visible defect semantics are not registered.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.forehead.five_positions_upright_clear': {
      disposition: 'structure_or_region_map_operationalization_required',
      candidateNeutralFeatureKeys: [],
      missingNeutralConstructs: [
        'traditional_region_map.tianzhong',
        'traditional_region_map.tianting',
        'traditional_region_map.sikong',
        'traditional_region_map.zhongzheng',
        'traditional_region_map.yintang',
      ],
      gapReason:
        'The rule depends on five named traditional forehead positions; no lineage-pinned neutral region map has been operationalized.',
      nextResearchLane: 'region_map_research',
    },
    'fr311r.forehead.narrow_low_hair': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.foreheadWidthShape, F.foreheadHairline],
      missingNeutralConstructs: ['forehead.visible_hair_coverage_state'],
      gapReason:
        '狹小 with 亂髮低覆 requires both visible forehead extent and hairline/coverage evidence; neither registered forehead feature is materialized.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.forehead.large_face_square': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.foreheadWidthShape],
      missingNeutralConstructs: ['whole_face.visible_shape'],
      gapReason:
        '額大面方 is cross-region: forehead size plus whole-face squareness. The current neutral inventory has no whole-face shape feature.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.forehead.wide_face_broad': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.foreheadWidthShape],
      missingNeutralConstructs: ['whole_face.visible_width_shape'],
      gapReason:
        '額闊面廣 combines forehead breadth with whole-face breadth; no governed whole-face width/shape surface exists.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.forehead.hairline_irregular': {
      disposition: 'neutral_observation_exists_but_extractor_or_authority_gap',
      candidateNeutralFeatureKeys: [F.foreheadHairline],
      missingNeutralConstructs: [],
      gapReason:
        '髮際參差 is image-visible, but visible hairline boundary extraction remains a new-image-model requirement.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.forehead.square_raised': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.foreheadWidthShape, F.foreheadCurvature],
      missingNeutralConstructs: [],
      gapReason:
        '額方峻起 combines planform shape and relative relief; no approved compound construct or materialized forehead extractor exists.',
      nextResearchLane: 'neutral_observation_construct_research',
    },

    'fr311r.cheekbones.bilateral_support': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.cheekWidth, F.cheekContour, F.cheekRelative3d],
      missingNeutralConstructs: ['cheek_midface.bilateral_support_relation'],
      gapReason:
        '兩顴骨充實相輔 is a bilateral skeletal-support construct. Current visible width/contour are soft-tissue observations and cannot establish skeletal equivalence.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.cheekbones.tilted_exposed': {
      disposition: 'neutral_observation_exists_but_extractor_or_authority_gap',
      candidateNeutralFeatureKeys: [F.cheekContour, F.cheekRelative3d],
      missingNeutralConstructs: ['cheek_midface.bilateral_tilt'],
      gapReason:
        '欹更露 requires tilt/exposure evidence. Visible contour prominence exists, but the relevant relative-3D and bilateral tilt authority is incomplete.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.cheekbone.left_east_mountain': {
      disposition: 'structure_or_region_map_operationalization_required',
      candidateNeutralFeatureKeys: [],
      missingNeutralConstructs: ['traditional_region_map.left_cheekbone_east_mountain'],
      gapReason:
        '左顴/東岳 is a lineage-specific traditional region designation; screen-side or provider landmarks cannot assign it automatically.',
      nextResearchLane: 'region_map_research',
    },
    'fr311r.cheekbone.right_west_mountain': {
      disposition: 'structure_or_region_map_operationalization_required',
      candidateNeutralFeatureKeys: [],
      missingNeutralConstructs: ['traditional_region_map.right_cheekbone_west_mountain'],
      gapReason:
        '右顴/西岳 is a lineage-specific traditional region designation; screen-side or provider landmarks cannot assign it automatically.',
      nextResearchLane: 'region_map_research',
    },
    'fr311r.cheekbones.high_narrow': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.cheekWidth, F.cheekContour],
      missingNeutralConstructs: ['cheek_midface.vertical_position_or_height'],
      gapReason:
        '高狹 combines height/position and narrowness; the current inventory has width and contour evidence but no governed cheekbone height axis.',
      nextResearchLane: 'neutral_observation_construct_research',
    },

    'fr311r.lower_face.yi_bone.square_horizontal': {
      disposition: 'source_side_observation_definition_insufficient',
      candidateNeutralFeatureKeys: [F.lowerWidth, F.lowerContour],
      missingNeutralConstructs: ['jaw_lower_face.skeletal_square_horizontal_construct'],
      gapReason:
        '頤骨方而橫 names bone morphology while current materialized features describe visible soft tissue; the source-to-visible construct equivalence is not defined.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.lower_face.han_bone.broad': {
      disposition: 'source_side_observation_definition_insufficient',
      candidateNeutralFeatureKeys: [F.lowerWidth],
      missingNeutralConstructs: ['jaw_lower_face.skeletal_breadth_construct'],
      gapReason:
        '頷骨闊 is explicitly skeletal. Visible lower-face width is materialized but is not evidence that jaw-bone breadth is the same construct.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.lower_face.han_bone.sharp': {
      disposition: 'source_side_observation_definition_insufficient',
      candidateNeutralFeatureKeys: [F.lowerContour],
      missingNeutralConstructs: ['jaw_lower_face.skeletal_pointedness_construct'],
      gapReason:
        '尖 is observable as contour language, but the source specifically concerns 頷骨; the current visible contour cannot be relabeled as skeletal pointedness.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.whole_face.upper_lower_pointed_datepit': {
      disposition: 'neutral_observation_exists_but_extractor_or_authority_gap',
      candidateNeutralFeatureKeys: [],
      missingNeutralConstructs: ['whole_face.upper_lower_pointedness_shape'],
      gapReason:
        '上下尖如棗核 is a whole-face shape construct. It is image-observable in principle but no current FR282/FR293 whole-face shape surface exists.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.chin.square_broad': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.lowerWidth, F.lowerContour, F.chinDimensions],
      missingNeutralConstructs: [],
      gapReason:
        '頦方而闊 combines shape and breadth. Multiple lower-face neutral surfaces are materialized, but no approved compound chin construct exists.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.chin.forehead_square_flat': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.foreheadWidthShape, F.lowerContour, F.chinDimensions],
      missingNeutralConstructs: ['forehead.visible_flatness'],
      gapReason:
        '頦額方且平 is a cross-region forehead-plus-chin condition. Current chin surfaces do not resolve the missing forehead flatness/shape authority.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.lower_face.flat_full_upright_thick': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.lowerWidth, F.lowerContour, F.chinDimensions, F.lowerProjection],
      missingNeutralConstructs: ['chin_lower_face.visible_fullness_or_thickness'],
      gapReason:
        '平而滿/端而厚 is a multi-axis lower-face construct involving shape, fullness and thickness; visible contour alone is insufficient.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.lower_face.long_narrow_sharp_thin': {
      disposition: 'multi_feature_construct_definition_required',
      candidateNeutralFeatureKeys: [F.lowerWidth, F.lowerContour, F.chinDimensions, F.lowerProjection],
      missingNeutralConstructs: ['chin_lower_face.visible_thickness'],
      gapReason:
        '長/狹/尖/薄 combines length, width, pointedness and thickness. No automatic synthesis of the existing neutral axes is authorized.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.lower_face.di_ge_full_bone': {
      disposition: 'structure_or_region_map_operationalization_required',
      candidateNeutralFeatureKeys: [],
      missingNeutralConstructs: ['traditional_region_map.dige', 'dige.visible_or_relative_fullness'],
      gapReason:
        '地閣骨滿 requires both a lineage-pinned 地閣 region and a bone/fullness construct; neither is currently operationalized.',
      nextResearchLane: 'region_map_research',
    },
    'fr311r.lower_face.chengjiang_full': {
      disposition: 'structure_or_region_map_operationalization_required',
      candidateNeutralFeatureKeys: [],
      missingNeutralConstructs: ['traditional_region_map.chengjiang', 'chengjiang.visible_fullness'],
      gapReason:
        '承漿豐滿 cannot be attached to a provider landmark until 承漿 has an authorized region-map definition.',
      nextResearchLane: 'region_map_research',
    },
    'fr311r.lower_face.xuanbi_full': {
      disposition: 'structure_or_region_map_operationalization_required',
      candidateNeutralFeatureKeys: [],
      missingNeutralConstructs: ['traditional_region_map.xuanbi', 'xuanbi.visible_fullness'],
      gapReason:
        '懸壁骨起/肉滿 depends on an unmapped traditional subregion plus skeletal/soft-tissue fullness semantics.',
      nextResearchLane: 'region_map_research',
    },
    'fr311r.lower_face.yanhan_raised': {
      disposition: 'structure_or_region_map_operationalization_required',
      candidateNeutralFeatureKeys: [],
      missingNeutralConstructs: ['traditional_region_map.yanhan', 'yanhan.relative_relief'],
      gapReason:
        '燕頷骨起 depends on an unmapped traditional subregion and relative relief authority.',
      nextResearchLane: 'region_map_research',
    },
    'fr311r.whole_face.long_square': {
      disposition: 'neutral_observation_exists_but_extractor_or_authority_gap',
      candidateNeutralFeatureKeys: [],
      missingNeutralConstructs: ['whole_face.visible_length_width_shape'],
      gapReason:
        '面欲長而方 is a whole-face planform construct; no current FR282/FR293 whole-face shape feature exists.',
      nextResearchLane: 'neutral_observation_construct_research',
    },
    'fr311r.whole_face.five_mountains_three_divisions': {
      disposition: 'structure_or_region_map_operationalization_required',
      candidateNeutralFeatureKeys: [],
      missingNeutralConstructs: ['traditional_region_map.five_mountains', 'traditional_region_map.three_divisions'],
      gapReason:
        '五嶽及三停 is itself a governed traditional structure and must use lineage-specific region maps before any observation binding study.',
      nextResearchLane: 'region_map_research',
    },
  });

const METHODOLOGY_AUDIT_SEEDS_FR311V:
Readonly<Record<string, AuditSeedFR311V>> = Object.freeze({
  'fr311s.gujin632.five_officers': {
    disposition: 'structure_or_region_map_operationalization_required',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['traditional_region_map.five_officers'],
    gapReason:
      'Five Officers defines traditional semantic regions; existing neutral region surfaces do not establish officer-region equivalence.',
    nextResearchLane: 'region_map_research',
  },
  'fr311s.gujin632.five_mountains': {
    disposition: 'structure_or_region_map_operationalization_required',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['traditional_region_map.five_mountains'],
    gapReason:
      'Five Mountains requires lineage-pinned forehead/nose/left-cheek/right-cheek/chin region mapping before morphology can be evaluated.',
    nextResearchLane: 'region_map_research',
  },
  'fr311s.gujin632.four_waterways': {
    disposition: 'structure_or_region_map_operationalization_required',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['traditional_region_map.four_waterways'],
    gapReason:
      'Four Waterways maps ear/eye/mouth/nose into a traditional structure; the mapping itself is semantic authority, not a neutral landmark alias.',
    nextResearchLane: 'region_map_research',
  },
  'fr311s.gujin632.six_ministries': {
    disposition: 'structure_or_region_map_operationalization_required',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['traditional_region_map.six_ministries'],
    gapReason:
      'Six Ministries defines paired ranges such as 輔角至天倉 and 肩骨至地閣; these ranges need their own lineage-pinned map.',
    nextResearchLane: 'region_map_research',
  },
  'fr311s.gujin631.face_three_divisions': {
    disposition: 'structure_or_region_map_operationalization_required',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['traditional_region_map.three_divisions.gujin631'],
    gapReason:
      'The 631 Three-Divisions boundary must remain distinct from the 632 lineage and has no production-authorized neutral map.',
    nextResearchLane: 'region_map_research',
  },
  'fr311s.gujin632.three_talents_three_divisions': {
    disposition: 'structure_or_region_map_operationalization_required',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['traditional_region_map.three_divisions.gujin632'],
    gapReason:
      'The 632 Three-Divisions/Three-Talents definition must remain lineage-specific; no cross-lineage canonical boundary is authorized.',
    nextResearchLane: 'region_map_research',
  },
  'fr311s.gujin631.thirteen_parts': {
    disposition: 'structure_or_region_map_operationalization_required',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['traditional_region_map.thirteen_parts'],
    gapReason:
      'The thirteen named parts require source-governed region geometry before any photo-derived assignment can be studied.',
    nextResearchLane: 'region_map_research',
  },
  'fr311s.gujin631.twelve_palaces': {
    disposition: 'structure_or_region_map_operationalization_required',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['traditional_region_map.twelve_palaces'],
    gapReason:
      'Twelve Palaces is a lineage-specific semantic face map; approximate developer polygons or cross-source fusion are prohibited.',
    nextResearchLane: 'region_map_research',
  },
  'fr311s.gujin632.five_stars_six_luminaries': {
    disposition: 'structure_or_region_map_operationalization_required',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['traditional_region_map.five_stars_six_luminaries'],
    gapReason:
      'The static star/luminary placement is a traditional region mapping and cannot be inferred from provider landmark names.',
    nextResearchLane: 'region_map_research',
  },
  'fr311s.gujin631.four_study_halls': {
    disposition: 'capture_state_or_visibility_limited',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: [
      'visible_teeth_state',
      'traditional_region_map.ear_gate_front',
    ],
    gapReason:
      'Four Study Halls includes teeth and the area before the ear gate; a neutral frontal-face observation bundle does not guarantee those surfaces.',
    nextResearchLane: 'capture_protocol_research',
  },
  'fr311s.gujin631.eight_study_halls': {
    disposition: 'capture_state_or_visibility_limited',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: [
      'whole_head_shape',
      'visible_teeth_state',
      'tongue_extension_state',
      'traditional_bansun_surface',
    ],
    gapReason:
      'Eight Study Halls includes head, teeth, tongue and other surfaces outside the current fixed frontal-face observation contract.',
    nextResearchLane: 'capture_protocol_research',
  },
  'fr311s.gujin632.five_element_forms': {
    disposition: 'manual_only_explicit_traditional_key_required',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['whole_face_or_body_five_element_form_classifier'],
    gapReason:
      'Five-element forms are whole-form traditional categories. No named/analogical automatic classifier is authorized.',
    nextResearchLane: 'manual_only',
  },
  'fr311s.gujin631.ten_observations': {
    disposition: 'capture_state_or_visibility_limited',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: [
      'voice_observation',
      'hands_feet_observation',
      'waist_back_observation',
      'whole_body_demeanor_observation',
    ],
    gapReason:
      'Ten Observations intentionally spans voice and non-face body regions; a static frontal face photo cannot satisfy the full method.',
    nextResearchLane: 'capture_protocol_research',
  },
  'fr311s.gujin631.five_methods': {
    disposition: 'semantic_only_no_observation_binding',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: [],
    gapReason:
      'Five Methods is an interpretive routing doctrine linking questions to eye/nose/spirit/voice, not a standalone photo morphology predicate.',
    nextResearchLane: 'semantic_only',
  },
  'fr311s.gujin632.three_masters': {
    disposition: 'semantic_only_no_observation_binding',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: [],
    gapReason:
      'Three Masters maps forehead/nose/dige to life-stage semantics; it does not itself define a morphology condition to bind from a photo.',
    nextResearchLane: 'semantic_only',
  },
  'fr311s.gujin632.three_pillars': {
    disposition: 'capture_state_or_visibility_limited',
    candidateNeutralFeatureKeys: [],
    missingNeutralConstructs: ['whole_head_observation', 'feet_observation'],
    gapReason:
      'Three Pillars includes head, nose and feet; current static face capture cannot observe the full traditional configuration.',
    nextResearchLane: 'capture_protocol_research',
  },
});

function makeAudit(
  targetKind: ExpandedStaticAuditTargetKindFR311V,
  targetId: string,
  sourceExpressionOrSection: string,
  seed: AuditSeedFR311V,
): ExpandedStaticObservationGapAuditFR311V {
  const materialized = seed.candidateNeutralFeatureKeys
    .filter((featureKey) => MATERIALIZED_FEATURE_KEYS_FR311V.has(featureKey));

  return Object.freeze({
    auditId: 'fr311v.' + targetKind + '.' + targetId,
    targetKind,
    targetId,
    sourceExpressionOrSection,
    disposition: seed.disposition,
    candidateNeutralFeatureKeys: Object.freeze([
      ...seed.candidateNeutralFeatureKeys,
    ]),
    materializedCandidateFeatureKeys: Object.freeze(materialized),
    missingNeutralConstructs: Object.freeze([
      ...(seed.missingNeutralConstructs ?? []),
    ]),
    gapReason: seed.gapReason,
    nextResearchLane: seed.nextResearchLane,
    candidateNeutralFeaturesAreEquivalenceProof: false as const,
    empiricalValidationStarted: false as const,
    automaticTraditionalBindingAuthorized: false as const,
    providerLandmarkDirectBindingAuthorized: false as const,
    metricThresholdAuthorized: false as const,
    populationNormAuthorized: false as const,
    crossLineageCanonicalMapAuthorized: false as const,
    multiFeatureSynthesisAuthorized: false as const,
    namedFormClassifierAuthorized: false as const,
    productInterpretationAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
  });
}

export const FR311V_RULE_AUDIT:
readonly ExpandedStaticObservationGapAuditFR311V[] = Object.freeze(
  STATIC_MISSING_REGION_DIRECT_RULES_FR311R.map((rule) => {
    const seed = RULE_AUDIT_SEEDS_FR311V[rule.ruleId];
    if (seed === undefined) {
      throw new Error('fr311v_missing_rule_audit:' + rule.ruleId);
    }
    return makeAudit(
      'missing_region_direct_rule',
      rule.ruleId,
      rule.sourceExpression,
      seed,
    );
  }),
);

export const FR311V_METHODOLOGY_AUDIT:
readonly ExpandedStaticObservationGapAuditFR311V[] = Object.freeze(
  STATIC_METHODOLOGIES_FR311S.map((methodology) => {
    const seed = METHODOLOGY_AUDIT_SEEDS_FR311V[methodology.methodologyId];
    if (seed === undefined) {
      throw new Error(
        'fr311v_missing_methodology_audit:' + methodology.methodologyId,
      );
    }
    return makeAudit(
      'static_methodology_definition',
      methodology.methodologyId,
      methodology.sourceSection,
      seed,
    );
  }),
);

export const FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT:
readonly ExpandedStaticObservationGapAuditFR311V[] = Object.freeze([
  ...FR311V_RULE_AUDIT,
  ...FR311V_METHODOLOGY_AUDIT,
]);

function countDisposition(
  disposition: ExpandedStaticAuditDispositionFR311V,
): number {
  return FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT
    .filter((item) => item.disposition === disposition).length;
}

function countLane(lane: ExpandedStaticNextResearchLaneFR311V): number {
  return FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT
    .filter((item) => item.nextResearchLane === lane).length;
}

export const FR311V_AUDIT_SUMMARY = Object.freeze({
  ruleTargets: FR311V_RULE_AUDIT.length,
  methodologyTargets: FR311V_METHODOLOGY_AUDIT.length,
  totalTargets: FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT.length,

  currentMaterializedNeutralObservationCandidates:
    countDisposition('current_materialized_neutral_observation_candidate'),
  neutralObservationExtractorOrAuthorityGaps:
    countDisposition('neutral_observation_exists_but_extractor_or_authority_gap'),
  multiFeatureConstructDefinitionsRequired:
    countDisposition('multi_feature_construct_definition_required'),
  sourceObservationDefinitionsInsufficient:
    countDisposition('source_side_observation_definition_insufficient'),
  structureOrRegionMapOperationalizationsRequired:
    countDisposition('structure_or_region_map_operationalization_required'),
  captureStateOrVisibilityLimited:
    countDisposition('capture_state_or_visibility_limited'),
  manualOnlyExplicitTraditionalKeyRequired:
    countDisposition('manual_only_explicit_traditional_key_required'),
  semanticOnlyNoObservationBinding:
    countDisposition('semantic_only_no_observation_binding'),
  productBindingProhibited:
    countDisposition('product_binding_prohibited'),

  neutralObservationConstructResearch:
    countLane('neutral_observation_construct_research'),
  regionMapResearch: countLane('region_map_research'),
  captureProtocolResearch: countLane('capture_protocol_research'),
  manualOnly: countLane('manual_only'),
  semanticOnly: countLane('semantic_only'),
  prohibited: countLane('prohibited'),

  targetsWithAnyCandidateNeutralFeature:
    FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT
      .filter((item) => item.candidateNeutralFeatureKeys.length > 0).length,
  targetsWithAnyMaterializedCandidate:
    FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT
      .filter((item) => item.materializedCandidateFeatureKeys.length > 0).length,

  neutralFeatureInventory: FR282_RGB_SELFIE_FEATURE_ENTRIES.length,
  neutralMaterializedFeatureInventory:
    FR293_PRODUCT_COLUMN_MAP
      .filter((item) =>
        item.implementationState === 'canonical_extractor_materialized')
      .length,
  neutralGapFeatureInventory:
    FR293_PRODUCT_COLUMN_MAP
      .filter((item) =>
        item.implementationState !== 'canonical_extractor_materialized')
      .length,

  empiricalValidationStarted: false,
  automaticTraditionalBindingsAuthorized: 0,
  metricThresholdsAuthorized: 0,
  populationNormsAuthorized: 0,
  productInterpretationsAuthorized: 0,
});

export const FR311V_AUTHORITY_BOUNDARY = Object.freeze({
  replacesFR312AAuthority: false as const,
  feedsFR312Automatically: false as const,
  candidateNeutralFeaturesAreEquivalenceProof: false as const,
  empiricalValidationAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  populationNormAuthorized: false as const,
  crossLineageCanonicalMapAuthorized: false as const,
  multiFeatureSynthesisAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  aggregateScoreAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
});

export function assertExpandedStaticObservationGapAuditFR311V(): void {
  if (
    STATIC_MISSING_REGION_DIRECT_RULES_FR311R.length !== 30 ||
    STATIC_METHODOLOGIES_FR311S.length !== 16 ||
    FR311V_RULE_AUDIT.length !== 30 ||
    FR311V_METHODOLOGY_AUDIT.length !== 16 ||
    FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT.length !== 46
  ) {
    throw new Error('fr311v_target_count_drift');
  }

  if (
    FR282_RGB_SELFIE_FEATURE_ENTRIES.length !== 29 ||
    FR311V_AUDIT_SUMMARY.neutralMaterializedFeatureInventory !== 18 ||
    FR311V_AUDIT_SUMMARY.neutralGapFeatureInventory !== 11
  ) {
    throw new Error('fr311v_neutral_feature_baseline_drift');
  }

  const auditedIds = FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT
    .map((item) => item.targetKind + ':' + item.targetId);
  if (
    new Set(auditedIds).size !== auditedIds.length ||
    new Set(FR311V_RULE_AUDIT.map((item) => item.targetId)).size !== 30 ||
    new Set(FR311V_METHODOLOGY_AUDIT.map((item) => item.targetId)).size !== 16
  ) {
    throw new Error('fr311v_duplicate_audit_target');
  }

  for (const item of FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT) {
    if (
      item.sourceExpressionOrSection.trim().length === 0 ||
      item.gapReason.trim().length === 0
    ) {
      throw new Error('fr311v_incomplete_audit:' + item.targetId);
    }

    if (
      item.candidateNeutralFeatureKeys.length === 0 &&
      item.missingNeutralConstructs.length === 0 &&
      item.disposition !== 'semantic_only_no_observation_binding'
    ) {
      throw new Error('fr311v_gap_without_feature_or_construct:' + item.targetId);
    }

    for (const featureKey of item.candidateNeutralFeatureKeys) {
      if (!KNOWN_NEUTRAL_FEATURE_KEYS_FR311V.has(featureKey)) {
        throw new Error(
          'fr311v_unknown_neutral_feature:' + item.targetId + ':' + featureKey,
        );
      }
    }

    for (const featureKey of item.materializedCandidateFeatureKeys) {
      if (
        !item.candidateNeutralFeatureKeys.includes(featureKey) ||
        !MATERIALIZED_FEATURE_KEYS_FR311V.has(featureKey)
      ) {
        throw new Error(
          'fr311v_invalid_materialized_candidate:' +
          item.targetId + ':' + featureKey,
        );
      }
    }

    if (
      item.candidateNeutralFeaturesAreEquivalenceProof !== false ||
      item.empiricalValidationStarted !== false ||
      item.automaticTraditionalBindingAuthorized !== false ||
      item.providerLandmarkDirectBindingAuthorized !== false ||
      item.metricThresholdAuthorized !== false ||
      item.populationNormAuthorized !== false ||
      item.crossLineageCanonicalMapAuthorized !== false ||
      item.multiFeatureSynthesisAuthorized !== false ||
      item.namedFormClassifierAuthorized !== false ||
      item.productInterpretationAuthorized !== false ||
      item.modernScientificFactAuthorized !== false
    ) {
      throw new Error('fr311v_authority_drift:' + item.targetId);
    }
  }

  const expectedRuleIds = STATIC_MISSING_REGION_DIRECT_RULES_FR311R
    .map((item) => item.ruleId)
    .sort();
  const auditedRuleIds = FR311V_RULE_AUDIT
    .map((item) => item.targetId)
    .sort();
  if (JSON.stringify(expectedRuleIds) !== JSON.stringify(auditedRuleIds)) {
    throw new Error('fr311v_rule_coverage_drift');
  }

  const expectedMethodIds = STATIC_METHODOLOGIES_FR311S
    .map((item) => item.methodologyId)
    .sort();
  const auditedMethodIds = FR311V_METHODOLOGY_AUDIT
    .map((item) => item.targetId)
    .sort();
  if (JSON.stringify(expectedMethodIds) !== JSON.stringify(auditedMethodIds)) {
    throw new Error('fr311v_methodology_coverage_drift');
  }

  for (const [key, value] of Object.entries(FR311V_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr311v_global_authority_widening:' + key);
    }
  }
}
