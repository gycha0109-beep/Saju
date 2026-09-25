import {
  FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS,
  type TraditionalShenxiangSixFusMethodologyRefT4,
} from './traditional-shenxiang-six-fus-methodology-t4.js';

export type TraditionalShenxiangSixFusOperationalizationModalityT5 =
  | 'semantic_region_definition'
  | 'traditional_span_definition'
  | 'static_form'
  | 'spatial_relation'
  | 'controlled_surface_appearance'
  | 'compound_construct_research';

export type TraditionalShenxiangSixFusOperationalizationStatusT5 =
  | 'blocked_pending_semantic_region_definition'
  | 'blocked_pending_span_endpoint_binding'
  | 'blocked_pending_observation_contract_and_binding'
  | 'blocked_pending_capture_protocol_and_binding'
  | 'blocked_pending_source_grounded_construct_definition';

export interface TraditionalShenxiangSixFusRegionOperationalizationT5 {
  readonly specificationId: string;
  readonly t4StatementRef: string;
  readonly methodologyRef: TraditionalShenxiangSixFusMethodologyRefT4;
  readonly pairRole: 'upper' | 'middle' | 'lower';
  readonly traditionalLabel:
    | '天府'
    | '人府'
    | '地府'
    | '上二府'
    | '中二府'
    | '下二府';
  readonly sourceRegionTerms: readonly string[];
  readonly modality:
    | 'semantic_region_definition'
    | 'traditional_span_definition';
  readonly bindingIntent: string;
  readonly requiredNeutralCapabilities: readonly string[];
  readonly prohibitedProxyClasses: readonly string[];
  readonly operationalizationStatus:
    | 'blocked_pending_semantic_region_definition'
    | 'blocked_pending_span_endpoint_binding';
  readonly crossContextReuseAuthorized: false;
  readonly modernAnatomicalAliasAuthorized: false;
  readonly concreteCoordinateOrFormulaAuthorized: false;
  readonly traditionalMetricBindingAuthorized: false;
}

export interface TraditionalShenxiangSixFusDescriptorOperationalizationT5 {
  readonly specificationId: string;
  readonly t4CriterionRef: string;
  readonly methodologyRef: TraditionalShenxiangSixFusMethodologyRefT4;
  readonly appliesTo: '天府' | '人府' | '地府' | '六府_general';
  readonly sourceExpression: string;
  readonly polarity: 'formation_supporting' | 'formation_countervailing';
  readonly modality: TraditionalShenxiangSixFusOperationalizationModalityT5;
  readonly observationContractIntent: string;
  readonly analyticalObservationFacets: readonly string[];
  readonly requiredNeutralCapabilities: readonly string[];
  readonly capturePrerequisites: readonly string[];
  readonly prohibitedProxyClasses: readonly string[];
  readonly constructValidityStatus: 'not_established';
  readonly operationalizationStatus: TraditionalShenxiangSixFusOperationalizationStatusT5;
  readonly analyticalFacetSplitIsSourceGrammar: false;
  readonly concreteCoordinateOrFormulaAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly automaticCriterionStateAuthorized: false;
}

export interface TraditionalShenxiangSixFusFormationOperationalizationT5 {
  readonly specificationId: string;
  readonly methodologyRef: TraditionalShenxiangSixFusMethodologyRefT4;
  readonly traditionalLabel: '天府' | '人府' | '地府' | '六府_general';
  readonly inputOperationalizationRefs: readonly string[];
  readonly sourceAggregateSemantics:
    | 'support_and_counter_descriptors_leading_to_formation_label'
    | 'aggregate_six_fus_quality_statements_without_boolean_grammar';
  readonly executableBooleanAndAuthorized: false;
  readonly executableBooleanOrAuthorized: false;
  readonly counterDescriptorVetoAuthorized: false;
  readonly criterionWeightingAuthorized: false;
  readonly partialSatisfactionPolicyAuthorized: false;
  readonly scoreAuthorized: false;
  readonly executableFormationStatus:
    'blocked_pending_semantics_binding_and_calibration';
}

export interface TraditionalShenxiangSixFusBindingPrerequisiteT5 {
  readonly prerequisiteId: string;
  readonly methodologyRef: TraditionalShenxiangSixFusMethodologyRefT4;
  readonly traditionalExpressions: readonly string[];
  readonly requiredCapability: string;
  readonly observationOwner: 'face-observation-engine' | 'face-reading-binding';
  readonly bindingOwner: 'face-reading-binding';
  readonly status: 'blocked';
  readonly prohibitedInference: readonly string[];
}

export const FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_REGION_SPECS = [
  {
    specificationId: 't5.six_fus.region.ten_observations.tianfu',
    t4StatementRef: 't4.shenxiang.ten_observations.six_fus.upper',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    pairRole: 'upper',
    traditionalLabel: '天府',
    sourceRegionTerms: ['天庭', '日角', '月角'],
    modality: 'semantic_region_definition',
    bindingIntent:
      '十觀 문맥에서 天庭/日角/月角이 天府 pair를 구성하는 source-local 관계를 보존한 채 중립 관찰 영역과 별도 binding한다.',
    requiredNeutralCapabilities: [
      'neutral_upper_face_region_candidates_without_traditional_labels',
      'bilateral_visible_region_support',
    ],
    prohibitedProxyClasses: [
      'forehead_rectangle_as_tianfu',
      'temple_landmark_as_rijiao_or_yuejiao_without_source_binding',
      'context_b_upper_pair_reuse',
    ],
    operationalizationStatus: 'blocked_pending_semantic_region_definition',
    crossContextReuseAuthorized: false,
    modernAnatomicalAliasAuthorized: false,
    concreteCoordinateOrFormulaAuthorized: false,
    traditionalMetricBindingAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.region.ten_observations.renfu',
    t4StatementRef: 't4.shenxiang.ten_observations.six_fus.middle',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    pairRole: 'middle',
    traditionalLabel: '人府',
    sourceRegionTerms: ['兩顴'],
    modality: 'semantic_region_definition',
    bindingIntent:
      '十觀의 兩顴→人府 관계를 보존하되 generic cheek/zygoma label을 자동 전통 region으로 승격하지 않는다.',
    requiredNeutralCapabilities: [
      'bilateral_midface_surface_or_contour_candidates',
    ],
    prohibitedProxyClasses: [
      'generic_cheek_center_as_renfu',
      'zygomatic_landmark_as_renfu_without_methodology_binding',
      'context_b_middle_pair_reuse',
    ],
    operationalizationStatus: 'blocked_pending_semantic_region_definition',
    crossContextReuseAuthorized: false,
    modernAnatomicalAliasAuthorized: false,
    concreteCoordinateOrFormulaAuthorized: false,
    traditionalMetricBindingAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.region.ten_observations.difu',
    t4StatementRef: 't4.shenxiang.ten_observations.six_fus.lower',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    pairRole: 'lower',
    traditionalLabel: '地府',
    sourceRegionTerms: ['地角', '邊腮'],
    modality: 'semantic_region_definition',
    bindingIntent:
      '十觀의 地角/邊腮→地府 관계를 lower-face generic outline과 구분한 채 source-local region binding으로 유지한다.',
    requiredNeutralCapabilities: [
      'bilateral_lower_face_boundary_or_surface_candidates',
    ],
    prohibitedProxyClasses: [
      'jawline_segment_as_difu',
      'mandible_angle_as_dijiao_without_source_binding',
      'context_b_lower_pair_reuse',
    ],
    operationalizationStatus: 'blocked_pending_semantic_region_definition',
    crossContextReuseAuthorized: false,
    modernAnatomicalAliasAuthorized: false,
    concreteCoordinateOrFormulaAuthorized: false,
    traditionalMetricBindingAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.region.volume_two.upper_identity',
    t4StatementRef: 't4.shenxiang.volume_two.six_fus.upper_identity',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    pairRole: 'upper',
    traditionalLabel: '上二府',
    sourceRegionTerms: ['兩輔骨'],
    modality: 'semantic_region_definition',
    bindingIntent:
      '六府論의 兩輔骨 identity를 Context A 天府와 자동 동일시하지 않고 별도 traditional region contract로 유지한다.',
    requiredNeutralCapabilities: [
      'bilateral_upper_lateral_face_region_candidates',
    ],
    prohibitedProxyClasses: [
      'modern_bone_name_as_fugu',
      'context_a_tianfu_alias',
    ],
    operationalizationStatus: 'blocked_pending_semantic_region_definition',
    crossContextReuseAuthorized: false,
    modernAnatomicalAliasAuthorized: false,
    concreteCoordinateOrFormulaAuthorized: false,
    traditionalMetricBindingAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.region.volume_two.upper_span',
    t4StatementRef: 't4.shenxiang.volume_two.six_fus.upper_span',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    pairRole: 'upper',
    traditionalLabel: '上二府',
    sourceRegionTerms: ['輔角', '天倉'],
    modality: 'traditional_span_definition',
    bindingIntent:
      '輔角→天倉의 source-local span endpoint 의미를 먼저 binding한 뒤에만 중립 spatial relation을 검토한다.',
    requiredNeutralCapabilities: [
      'neutral_upper_lateral_face_endpoint_candidates',
      'bilateral_span_representation',
    ],
    prohibitedProxyClasses: [
      'temple_width',
      'face_width_slice',
      'provider_landmark_pair_as_fujiao_tiancang',
    ],
    operationalizationStatus: 'blocked_pending_span_endpoint_binding',
    crossContextReuseAuthorized: false,
    modernAnatomicalAliasAuthorized: false,
    concreteCoordinateOrFormulaAuthorized: false,
    traditionalMetricBindingAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.region.volume_two.middle_identity',
    t4StatementRef: 't4.shenxiang.volume_two.six_fus.middle_identity',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    pairRole: 'middle',
    traditionalLabel: '中二府',
    sourceRegionTerms: ['兩顴骨'],
    modality: 'semantic_region_definition',
    bindingIntent:
      '六府論의 兩顴骨 identity를 Context A 人府와 동일 region object로 합치지 않는다.',
    requiredNeutralCapabilities: [
      'bilateral_midface_surface_or_contour_candidates',
    ],
    prohibitedProxyClasses: [
      'modern_zygoma_alias',
      'context_a_renfu_alias',
    ],
    operationalizationStatus: 'blocked_pending_semantic_region_definition',
    crossContextReuseAuthorized: false,
    modernAnatomicalAliasAuthorized: false,
    concreteCoordinateOrFormulaAuthorized: false,
    traditionalMetricBindingAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.region.volume_two.middle_span',
    t4StatementRef: 't4.shenxiang.volume_two.six_fus.middle_span',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    pairRole: 'middle',
    traditionalLabel: '中二府',
    sourceRegionTerms: ['命門', '虎耳'],
    modality: 'traditional_span_definition',
    bindingIntent:
      '命門→虎耳 traditional span을 source-grounded endpoint binding 이전에는 어떠한 cheek-width metric으로도 치환하지 않는다.',
    requiredNeutralCapabilities: [
      'neutral_midface_lateral_endpoint_candidates',
      'bilateral_span_representation',
    ],
    prohibitedProxyClasses: [
      'cheek_width',
      'ear_to_nose_width',
      'provider_landmark_pair_as_mingmen_huer',
    ],
    operationalizationStatus: 'blocked_pending_span_endpoint_binding',
    crossContextReuseAuthorized: false,
    modernAnatomicalAliasAuthorized: false,
    concreteCoordinateOrFormulaAuthorized: false,
    traditionalMetricBindingAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.region.volume_two.lower_identity',
    t4StatementRef: 't4.shenxiang.volume_two.six_fus.lower_identity',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    pairRole: 'lower',
    traditionalLabel: '下二府',
    sourceRegionTerms: ['兩頤骨'],
    modality: 'semantic_region_definition',
    bindingIntent:
      '六府論의 兩頤骨 identity를 Context A 地府와 동일 lower-face region으로 합치지 않는다.',
    requiredNeutralCapabilities: [
      'bilateral_lower_face_surface_or_boundary_candidates',
    ],
    prohibitedProxyClasses: [
      'modern_mandible_alias',
      'context_a_difu_alias',
    ],
    operationalizationStatus: 'blocked_pending_semantic_region_definition',
    crossContextReuseAuthorized: false,
    modernAnatomicalAliasAuthorized: false,
    concreteCoordinateOrFormulaAuthorized: false,
    traditionalMetricBindingAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.region.volume_two.lower_span',
    t4StatementRef: 't4.shenxiang.volume_two.six_fus.lower_span',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    pairRole: 'lower',
    traditionalLabel: '下二府',
    sourceRegionTerms: ['肩骨', '地閣'],
    modality: 'traditional_span_definition',
    bindingIntent:
      '肩骨→地閣 span은 source-local endpoint 의미가 확정되기 전까지 lower-face width/height geometry로 변환하지 않는다.',
    requiredNeutralCapabilities: [
      'neutral_lower_face_endpoint_candidates',
      'bilateral_span_representation',
    ],
    prohibitedProxyClasses: [
      'jaw_width',
      'chin_to_mandible_distance',
      'provider_landmark_pair_as_jiangu_dige',
    ],
    operationalizationStatus: 'blocked_pending_span_endpoint_binding',
    crossContextReuseAuthorized: false,
    modernAnatomicalAliasAuthorized: false,
    concreteCoordinateOrFormulaAuthorized: false,
    traditionalMetricBindingAuthorized: false,
  },
] as const satisfies readonly TraditionalShenxiangSixFusRegionOperationalizationT5[];

export const FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_DESCRIPTOR_SPECS = [
  {
    specificationId: 't5.six_fus.op.ten_observations.tianfu.support',
    t4CriterionRef: 't4.six_fus.ten_observations.tianfu.support',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    appliesTo: '天府',
    sourceExpression: '方員明淨，不宜露骨',
    polarity: 'formation_supporting',
    modality: 'compound_construct_research',
    observationContractIntent:
      '天府 region binding 이후 form/surface/exposure 후보를 분리 관찰할 수 있어야 하지만 원문 compound를 Boolean subcriteria로 재작성하지 않는다.',
    analyticalObservationFacets: [
      'visible_form_candidate',
      'controlled_surface_appearance_candidate',
      'visible_bony_exposure_candidate',
    ],
    requiredNeutralCapabilities: [
      'governed_bound_region_shape_evidence',
      'capture_controlled_surface_evidence',
      'neutral_visible_prominence_or_exposure_evidence',
    ],
    capturePrerequisites: [
      'governed_pose',
      'sufficient_region_visibility',
      'controlled_illumination_for_surface_appearance',
    ],
    prohibitedProxyClasses: [
      'single_roundness_score',
      'raw_brightness_as_mingjing',
      '2d_edge_strength_as_bone_exposure',
    ],
    constructValidityStatus: 'not_established',
    operationalizationStatus:
      'blocked_pending_source_grounded_construct_definition',
    analyticalFacetSplitIsSourceGrammar: false,
    concreteCoordinateOrFormulaAuthorized: false,
    calibrationAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.op.ten_observations.tianfu.counter',
    t4CriterionRef: 't4.six_fus.ten_observations.tianfu.counter',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    appliesTo: '天府',
    sourceExpression: '欹削低塌、偏尖',
    polarity: 'formation_countervailing',
    modality: 'compound_construct_research',
    observationContractIntent:
      '欹/削/低塌/偏尖의 source-local form semantics를 연구하고 neutral shape evidence와 별도 binding해야 한다.',
    analyticalObservationFacets: [
      'bilateral_or_local_shape_asymmetry_candidate',
      'visible_recession_or_prominence_candidate',
      'local_taper_candidate',
    ],
    requiredNeutralCapabilities: [
      'governed_bound_region_shape_evidence',
    ],
    capturePrerequisites: ['governed_pose', 'sufficient_region_visibility'],
    prohibitedProxyClasses: [
      'one_asymmetry_score',
      'single_depth_proxy',
      'single_angle_threshold',
    ],
    constructValidityStatus: 'not_established',
    operationalizationStatus:
      'blocked_pending_source_grounded_construct_definition',
    analyticalFacetSplitIsSourceGrammar: false,
    concreteCoordinateOrFormulaAuthorized: false,
    calibrationAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.op.ten_observations.renfu.support',
    t4CriterionRef: 't4.six_fus.ten_observations.renfu.support',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    appliesTo: '人府',
    sourceExpression: '方正插鬢，不粗不露，齊揖方拱',
    polarity: 'formation_supporting',
    modality: 'compound_construct_research',
    observationContractIntent:
      '人府의 form, 鬢 relation, exposure, bilateral relation 후보를 중립 관찰로 분리하되 원문을 기계 논리로 분해하지 않는다.',
    analyticalObservationFacets: [
      'bound_region_form_candidate',
      'bound_region_to_temporal_hair_relation_candidate',
      'visible_prominence_or_exposure_candidate',
      'bilateral_alignment_or_relation_candidate',
    ],
    requiredNeutralCapabilities: [
      'governed_bound_region_shape_evidence',
      'governed_temporal_hair_region_candidate',
      'bilateral_relation_evidence',
    ],
    capturePrerequisites: [
      'governed_pose',
      'bilateral_region_visibility',
      'temporal_hair_visibility_when_relation_is_reviewed',
    ],
    prohibitedProxyClasses: [
      'cheekbone_width_as_fangzheng',
      'generic_temple_as_bin',
      '2d_prominence_as_lu',
      'symmetry_score_as_qiyifanggong',
    ],
    constructValidityStatus: 'not_established',
    operationalizationStatus:
      'blocked_pending_source_grounded_construct_definition',
    analyticalFacetSplitIsSourceGrammar: false,
    concreteCoordinateOrFormulaAuthorized: false,
    calibrationAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.op.ten_observations.renfu.counter',
    t4CriterionRef: 't4.six_fus.ten_observations.renfu.counter',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    appliesTo: '人府',
    sourceExpression: '粗露高低，尖員綳鼓',
    polarity: 'formation_countervailing',
    modality: 'compound_construct_research',
    observationContractIntent:
      '人府 counter-descriptor를 source-grounded construct로 유지하고 neutral coarseness/exposure/relative-height/form/prominence 후보와 자동 동일시하지 않는다.',
    analyticalObservationFacets: [
      'surface_or_form_coarseness_candidate',
      'visible_prominence_or_exposure_candidate',
      'bilateral_relative_position_candidate',
      'local_form_candidate',
    ],
    requiredNeutralCapabilities: [
      'governed_bound_region_shape_evidence',
      'bilateral_relation_evidence',
    ],
    capturePrerequisites: ['governed_pose', 'bilateral_region_visibility'],
    prohibitedProxyClasses: [
      'texture_score_as_cu',
      'depth_proxy_as_lu_or_benggu',
      'left_right_y_difference_as_gaodi',
    ],
    constructValidityStatus: 'not_established',
    operationalizationStatus:
      'blocked_pending_source_grounded_construct_definition',
    analyticalFacetSplitIsSourceGrammar: false,
    concreteCoordinateOrFormulaAuthorized: false,
    calibrationAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.op.ten_observations.difu.support',
    t4CriterionRef: 't4.six_fus.ten_observations.difu.support',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    appliesTo: '地府',
    sourceExpression: '喜輔，地閣懸壁，不昏不慘，不尖不歪，不粗不大',
    polarity: 'formation_supporting',
    modality: 'compound_construct_research',
    observationContractIntent:
      '地府/地閣 relation, surface appearance, lower-face form 후보를 source construct와 분리해 관찰해야 한다.',
    analyticalObservationFacets: [
      'bound_dige_relation_candidate',
      'controlled_surface_appearance_candidate',
      'lower_face_form_candidate',
    ],
    requiredNeutralCapabilities: [
      'governed_dige_candidate_only_after_binding',
      'governed_bound_region_shape_evidence',
      'capture_controlled_surface_evidence',
    ],
    capturePrerequisites: [
      'governed_pose',
      'lower_face_visibility',
      'controlled_illumination_for_surface_appearance',
    ],
    prohibitedProxyClasses: [
      'chin_landmark_as_dige',
      'raw_brightness_as_hun_or_can',
      'jaw_angle_as_jian_or_wai',
      'face_width_as_cu_or_da',
    ],
    constructValidityStatus: 'not_established',
    operationalizationStatus:
      'blocked_pending_source_grounded_construct_definition',
    analyticalFacetSplitIsSourceGrammar: false,
    concreteCoordinateOrFormulaAuthorized: false,
    calibrationAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.op.ten_observations.difu.counter',
    t4CriterionRef: 't4.six_fus.ten_observations.difu.counter',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    appliesTo: '地府',
    sourceExpression: '高低粗露尖削，耳後見重腮',
    polarity: 'formation_countervailing',
    modality: 'compound_construct_research',
    observationContractIntent:
      'lower-face counter-descriptor와 耳後見重腮의 visibility/relation 의미를 source-grounded하게 연구한 뒤 neutral evidence와 결합해야 한다.',
    analyticalObservationFacets: [
      'bilateral_relative_position_candidate',
      'surface_or_form_coarseness_candidate',
      'visible_prominence_or_exposure_candidate',
      'posterior_jaw_visibility_relation_candidate',
    ],
    requiredNeutralCapabilities: [
      'governed_bound_region_shape_evidence',
      'governed_ear_and_lower_face_visibility_relation_candidate',
    ],
    capturePrerequisites: [
      'governed_pose',
      'bilateral_lower_face_visibility',
      'ear_visibility_when_posterior_relation_is_reviewed',
    ],
    prohibitedProxyClasses: [
      'single_asymmetry_score',
      'jaw_width_as_zhongshai',
      'ear_overlap_pixel_count_as_earhoujian',
    ],
    constructValidityStatus: 'not_established',
    operationalizationStatus:
      'blocked_pending_source_grounded_construct_definition',
    analyticalFacetSplitIsSourceGrammar: false,
    concreteCoordinateOrFormulaAuthorized: false,
    calibrationAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.op.volume_two.general.support',
    t4CriterionRef: 't4.six_fus.volume_two.general.support',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    appliesTo: '六府_general',
    sourceExpression: '充實相輔',
    polarity: 'formation_supporting',
    modality: 'compound_construct_research',
    observationContractIntent:
      '각 paired region의 visible fullness/form 후보와 pair 간 相輔 의미를 분리 연구하되 단일 fullness/symmetry score로 축약하지 않는다.',
    analyticalObservationFacets: [
      'paired_region_fullness_candidate',
      'cross_pair_relation_candidate',
      'bilateral_support_or_balance_candidate',
    ],
    requiredNeutralCapabilities: [
      'all_three_bound_pair_regions',
      'bilateral_shape_or_surface_evidence',
      'cross_pair_relation_evidence',
    ],
    capturePrerequisites: ['governed_pose', 'all_required_regions_visible'],
    prohibitedProxyClasses: [
      'one_fullness_score',
      'global_face_symmetry_as_xiangfu',
      '3d_volume_as_chongshi_without_construct_validity',
    ],
    constructValidityStatus: 'not_established',
    operationalizationStatus:
      'blocked_pending_source_grounded_construct_definition',
    analyticalFacetSplitIsSourceGrammar: false,
    concreteCoordinateOrFormulaAuthorized: false,
    calibrationAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.op.volume_two.general.counter',
    t4CriterionRef: 't4.six_fus.volume_two.general.counter',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    appliesTo: '六府_general',
    sourceExpression: '不欲支離孤露',
    polarity: 'formation_countervailing',
    modality: 'compound_construct_research',
    observationContractIntent:
      '支離/孤露를 source-local aggregate counter-construct로 유지하고 segmentation/protrusion proxy를 곧바로 전통 의미로 승격하지 않는다.',
    analyticalObservationFacets: [
      'pair_continuity_or_fragmentation_candidate',
      'isolated_prominence_or_exposure_candidate',
    ],
    requiredNeutralCapabilities: [
      'all_three_bound_pair_regions',
      'cross_pair_relation_evidence',
    ],
    capturePrerequisites: ['governed_pose', 'all_required_regions_visible'],
    prohibitedProxyClasses: [
      'segmentation_gap_count_as_zhili',
      'depth_peak_as_gulu',
      'global_asymmetry_as_countercriterion',
    ],
    constructValidityStatus: 'not_established',
    operationalizationStatus:
      'blocked_pending_source_grounded_construct_definition',
    analyticalFacetSplitIsSourceGrammar: false,
    concreteCoordinateOrFormulaAuthorized: false,
    calibrationAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    specificationId: 't5.six_fus.op.volume_two.general.complete',
    t4CriterionRef: 't4.six_fus.volume_two.general.complete',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    appliesTo: '六府_general',
    sourceExpression: '六府充直，無缺陷瘢痕',
    polarity: 'formation_supporting',
    modality: 'compound_construct_research',
    observationContractIntent:
      '充直 및 visible 缺陷/瘢痕 wording을 source-local compound로 보존하고 neutral form/surface evidence와 별도 binding한다.',
    analyticalObservationFacets: [
      'paired_region_form_continuity_candidate',
      'visible_surface_mark_or_interruption_candidate',
    ],
    requiredNeutralCapabilities: [
      'all_three_bound_pair_regions',
      'governed_bound_region_shape_evidence',
      'capture_controlled_visible_surface_evidence',
    ],
    capturePrerequisites: [
      'governed_pose',
      'all_required_regions_visible',
      'controlled_illumination_for_surface_evidence',
    ],
    prohibitedProxyClasses: [
      'medical_scar_diagnosis',
      'skin_condition_inference',
      'blemish_detector_as_quexian_banhen',
      'straightness_score_as_chongzhi',
    ],
    constructValidityStatus: 'not_established',
    operationalizationStatus:
      'blocked_pending_source_grounded_construct_definition',
    analyticalFacetSplitIsSourceGrammar: false,
    concreteCoordinateOrFormulaAuthorized: false,
    calibrationAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
] as const satisfies readonly TraditionalShenxiangSixFusDescriptorOperationalizationT5[];

export const FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_FORMATION_SPECS = [
  {
    specificationId: 't5.six_fus.formation.ten_observations.tianfu',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    traditionalLabel: '天府',
    inputOperationalizationRefs: [
      't5.six_fus.op.ten_observations.tianfu.support',
      't5.six_fus.op.ten_observations.tianfu.counter',
    ],
    sourceAggregateSemantics:
      'support_and_counter_descriptors_leading_to_formation_label',
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    counterDescriptorVetoAuthorized: false,
    criterionWeightingAuthorized: false,
    partialSatisfactionPolicyAuthorized: false,
    scoreAuthorized: false,
    executableFormationStatus:
      'blocked_pending_semantics_binding_and_calibration',
  },
  {
    specificationId: 't5.six_fus.formation.ten_observations.renfu',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    traditionalLabel: '人府',
    inputOperationalizationRefs: [
      't5.six_fus.op.ten_observations.renfu.support',
      't5.six_fus.op.ten_observations.renfu.counter',
    ],
    sourceAggregateSemantics:
      'support_and_counter_descriptors_leading_to_formation_label',
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    counterDescriptorVetoAuthorized: false,
    criterionWeightingAuthorized: false,
    partialSatisfactionPolicyAuthorized: false,
    scoreAuthorized: false,
    executableFormationStatus:
      'blocked_pending_semantics_binding_and_calibration',
  },
  {
    specificationId: 't5.six_fus.formation.ten_observations.difu',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    traditionalLabel: '地府',
    inputOperationalizationRefs: [
      't5.six_fus.op.ten_observations.difu.support',
      't5.six_fus.op.ten_observations.difu.counter',
    ],
    sourceAggregateSemantics:
      'support_and_counter_descriptors_leading_to_formation_label',
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    counterDescriptorVetoAuthorized: false,
    criterionWeightingAuthorized: false,
    partialSatisfactionPolicyAuthorized: false,
    scoreAuthorized: false,
    executableFormationStatus:
      'blocked_pending_semantics_binding_and_calibration',
  },
  {
    specificationId: 't5.six_fus.formation.volume_two.general',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    traditionalLabel: '六府_general',
    inputOperationalizationRefs: [
      't5.six_fus.op.volume_two.general.support',
      't5.six_fus.op.volume_two.general.counter',
      't5.six_fus.op.volume_two.general.complete',
    ],
    sourceAggregateSemantics:
      'aggregate_six_fus_quality_statements_without_boolean_grammar',
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    counterDescriptorVetoAuthorized: false,
    criterionWeightingAuthorized: false,
    partialSatisfactionPolicyAuthorized: false,
    scoreAuthorized: false,
    executableFormationStatus:
      'blocked_pending_semantics_binding_and_calibration',
  },
] as const satisfies readonly TraditionalShenxiangSixFusFormationOperationalizationT5[];

export const FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_BINDING_PREREQUISITES = [
  {
    prerequisiteId: 't5.six_fus.binding.ten_observations.regions',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    traditionalExpressions: [
      '天府',
      '天庭',
      '日角',
      '月角',
      '人府',
      '兩顴',
      '地府',
      '地角',
      '邊腮',
      '地閣',
      '鬢',
    ],
    requiredCapability:
      'source-grounded Context A region/relation identities mapped to governed neutral observations without importing Context B',
    observationOwner: 'face-reading-binding',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
    prohibitedInference: [
      'modern anatomy label => traditional region',
      'generic face zone => traditional region',
      'Context B region => Context A alias',
    ],
  },
  {
    prerequisiteId: 't5.six_fus.binding.volume_two.regions_and_spans',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    traditionalExpressions: [
      '兩輔骨',
      '兩顴骨',
      '兩頤骨',
      '輔角',
      '天倉',
      '命門',
      '虎耳',
      '肩骨',
      '地閣',
    ],
    requiredCapability:
      'source-grounded Context B paired-region and span-endpoint identities before any geometry or distance binding',
    observationOwner: 'face-reading-binding',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
    prohibitedInference: [
      'provider landmark => traditional endpoint',
      'modern bone name => traditional paired region',
      'Context A region => Context B alias',
    ],
  },
  {
    prerequisiteId: 't5.six_fus.binding.form_constructs',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    traditionalExpressions: [
      '方員',
      '欹削',
      '低塌',
      '偏尖',
      '方正',
      '齊揖方拱',
      '粗露高低',
      '尖員綳鼓',
      '尖歪',
      '重腮',
    ],
    requiredCapability:
      'source-grounded construct definitions plus neutral shape/relation observations with construct-validity review',
    observationOwner: 'face-reading-binding',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
    prohibitedInference: [
      'single shape metric => compound source construct',
      'symmetry score => traditional formation descriptor',
    ],
  },
  {
    prerequisiteId: 't5.six_fus.binding.surface_capture',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    traditionalExpressions: ['明淨', '不昏不慘', '粗', '露'],
    requiredCapability:
      'capture-controlled visible surface evidence separated from traditional semantic binding',
    observationOwner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
    prohibitedInference: [
      'raw brightness => 明淨',
      'skin tone => 昏/慘',
      'surface appearance => health/race/ethnicity',
    ],
  },
  {
    prerequisiteId: 't5.six_fus.binding.volume_two.aggregate_constructs',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    traditionalExpressions: [
      '充實相輔',
      '支離孤露',
      '充直',
      '無缺陷瘢痕',
    ],
    requiredCapability:
      'source-grounded aggregate construct definitions and governed neutral pair/form/surface evidence',
    observationOwner: 'face-reading-binding',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
    prohibitedInference: [
      'global symmetry => 相輔',
      '3D volume => 充實',
      'segmentation gap => 支離',
      'medical scar/skin diagnosis => 瘢痕',
    ],
  },
] as const satisfies readonly TraditionalShenxiangSixFusBindingPrerequisiteT5[];

export const FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_AUTHORIZATION =
  Object.freeze({
    phase: 'T5_OPERATIONALIZATION_SPECIFICATION' as const,
    methodologyCount: 2 as const,
    regionOperationalizationSpecificationCount:
      FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_REGION_SPECS.length,
    expectedRegionOperationalizationSpecificationCount: 9 as const,
    descriptorOperationalizationSpecificationCount:
      FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_DESCRIPTOR_SPECS.length,
    expectedDescriptorOperationalizationSpecificationCount: 9 as const,
    formationOperationalizationSpecificationCount:
      FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_FORMATION_SPECS.length,
    expectedFormationOperationalizationSpecificationCount: 4 as const,
    oneUniversalMethodologyAuthorized: false as const,
    oneUniversalRegionMapAuthorized: false as const,
    crossContextMetricReuseAuthorized: false as const,
    concreteCoordinateFrameAuthorized: false as const,
    executableMetricFormulaAuthorized: false as const,
    traditionalMetricBindingAuthorized: false as const,
    captureCalibrationProtocolAuthorized: false as const,
    numericThresholdAuthorized: false as const,
    booleanFormationEvaluatorAuthorized: false as const,
    counterDescriptorAutomaticVetoAuthorized: false as const,
    criterionWeightingAuthorized: false as const,
    partialSatisfactionScoringAuthorized: false as const,
    automaticFormationStateAuthorized: false as const,
    historicalAgeMapAuthorized: false as const,
    wealthOrFateClaimAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_T6_HANDOFF =
  Object.freeze({
    nextPhase: 'T6_SHENXIANG_SIX_FUS_METHODOLOGY_PACK_CANDIDATE' as const,
    candidateMethodologyRefs: [
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    ] as const,
    packCandidateMayInclude: [
      'T3 Gujin-1725 scan-checked compilation-transmission witness/passages',
      'T4 context-specific 六府 methodology identities',
      'T5 region/span operationalization specifications',
      'T5 descriptor operationalization specifications',
      'T5 fail-closed formation/evaluation specifications',
      'T5 binding and capture prerequisites',
      'explicit authority gates',
    ] as const,
    packCandidateMustNotClaim: [
      'one universal 神相 六府 region map',
      'NLC-1925 exact-page authority',
      'modern anatomical alias authority',
      'executable RGB/CV binding',
      'numeric criterion thresholds',
      'Boolean 成/不成 evaluator',
      'automatic counter-descriptor veto',
      'criterion weighting or partial score',
      'automatic 六府 formation state',
      'historical age/wealth/fate outcome claim',
      'Production readiness',
    ] as const,
    remainingExternalDependencies: [
      'face-observation-engine neutral region/form/surface observation contracts',
      'face-reading-binding context-specific traditional region and span bindings',
      'source-grounded definitions for compound form/appearance constructs',
      'capture calibration protocols for surface appearance constructs',
      'construct-validity evidence for any proposed neutral proxy',
      'separate NLC-1925 exact-page adjudication if that witness is to be promoted',
    ] as const,
  });
