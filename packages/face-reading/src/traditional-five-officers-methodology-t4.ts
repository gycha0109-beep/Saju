import type { FaceMethodologyDefinition } from './contracts.js';

export type TraditionalFiveOfficerMethodologyRefT4 =
  | 'method.shenxiang.five_officers.mapping.nlc_1925@0.1.0'
  | 'method.shenxiang.five_officers.listening_criteria.nlc_1925@0.1.0'
  | 'method.shenxiang.five_officers.longevity_criteria.nlc_1925@0.1.0'
  | 'method.shenxiang.five_officers.inspection_criteria.nlc_1925@0.1.0'
  | 'method.shenxiang.five_officers.discernment_criteria.nlc_1925@0.1.0'
  | 'method.shenxiang.five_officers.intake_criteria@0.2.0';

export type TraditionalFiveOfficerConstructClassT4 =
  | 'mapping'
  | 'static_morphology'
  | 'spatial_relation'
  | 'appearance_color'
  | 'appearance_contrast_or_lustre'
  | 'visibility_or_exposure'
  | 'dynamic_multi_state'
  | 'figurative_form'
  | 'historical_measure_expression'
  | 'compound_semantics_unresolved';

export type TraditionalFiveOfficerObservabilityClassT4 =
  | 'source_semantic_only'
  | 'static_candidate'
  | 'capture_sensitive_candidate'
  | 'multi_state_candidate'
  | 'non_numeric_figurative_candidate'
  | 'unresolved';

export interface TraditionalFiveOfficerCriterionUnitT4 {
  readonly criterionId: string;
  readonly methodologyRef: TraditionalFiveOfficerMethodologyRefT4;
  readonly sourceRefs: readonly string[];
  readonly traditionalOfficerName:
    | '採聽官'
    | '保壽官'
    | '監察官'
    | '審辨官'
    | '出納官';
  readonly sourceExpression: string;
  readonly constructClass: TraditionalFiveOfficerConstructClassT4;
  readonly observabilityClass: TraditionalFiveOfficerObservabilityClassT4;
  readonly normalizedResearchMeaning: string;
  readonly decompositionStatus:
    | 'source_expression_preserved'
    | 'analytical_split_only_not_source_segmentation';
  readonly requiredObservationCapabilities: readonly string[];
  readonly limitations: readonly string[];
  readonly traditionalMetricBindingAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly automaticCriterionStateAuthorized: false;
}

export interface TraditionalFiveOfficerFormationStatementT4 {
  readonly statementId: string;
  readonly methodologyRef: TraditionalFiveOfficerMethodologyRefT4;
  readonly sourceRefs: readonly string[];
  readonly traditionalOfficerName:
    | '採聽官'
    | '保壽官'
    | '監察官'
    | '審辨官'
    | '出納官';
  readonly sourceFormationLabel: string;
  readonly criterionIds: readonly string[];
  readonly sourceAggregateSemantics:
    | 'listed_descriptors_leading_to_formation_label';
  readonly explicitAlternativeMarkerPresent: boolean;
  readonly executableBooleanAndAuthorized: false;
  readonly executableBooleanOrAuthorized: false;
  readonly criterionWeightingAuthorized: false;
  readonly partialSatisfactionPolicyAuthorized: false;
  readonly negativeCountercriterionPolicyAuthorized: false;
  readonly limitations: readonly string[];
}

export interface TraditionalFiveOfficerObservationRequirementT4 {
  readonly requirementId: string;
  readonly methodologyRef: TraditionalFiveOfficerMethodologyRefT4;
  readonly traditionalExpression: string;
  readonly semanticRequirement: string;
  readonly requirementClass:
    | 'neutral_static_geometry'
    | 'neutral_spatial_relation'
    | 'controlled_appearance'
    | 'controlled_multi_state'
    | 'figurative_construct_research'
    | 'historical_measure_research';
  readonly implementationOwner:
    | 'face-observation-engine'
    | 'face-reading-binding';
  readonly implementationStatus: 'required_unbound';
  readonly directMetricSubstitutionAuthorized: false;
}

export const FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS =
  Object.freeze({
    mapping:
      'method.shenxiang.five_officers.mapping.nlc_1925@0.1.0' as const,
    listening:
      'method.shenxiang.five_officers.listening_criteria.nlc_1925@0.1.0' as const,
    longevity:
      'method.shenxiang.five_officers.longevity_criteria.nlc_1925@0.1.0' as const,
    inspection:
      'method.shenxiang.five_officers.inspection_criteria.nlc_1925@0.1.0' as const,
    discernment:
      'method.shenxiang.five_officers.discernment_criteria.nlc_1925@0.1.0' as const,
    intake:
      'method.shenxiang.five_officers.intake_criteria@0.2.0' as const,
  });

export const FACE_TRADITIONAL_T4_FIVE_OFFICER_NEW_METHODOLOGIES = [
  {
    methodologyId:
      'method.shenxiang.five_officers.mapping.nlc_1925',
    version: '0.1.0',
    traditionalTerm: '五官說',
    scope: 'static_face',
    sourceRefs: [
      'passage.shenxiang.nlc_1925.five_officers.mapping',
    ],
    description:
      '神相全編 NLC-1925 scan-checked 五官說에서 耳/眉/眼/鼻/口를 採聽官/保壽官/監察官/審辨官/出納官으로 대응시키는 source-local mapping을 보존한다.',
    limitations: [
      'mapping 자체는 개별 官成 조건의 충족 여부를 판정하지 않는다.',
      '一官成十年之貴顯 등 결과·연령 문구를 이 mapping methodology에서 실행하지 않는다.',
      '柳莊 또는 다른 전승의 五官 명칭을 이 정의로 정규화하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId:
      'method.shenxiang.five_officers.listening_criteria.nlc_1925',
    version: '0.1.0',
    traditionalTerm: '採聽官成',
    scope: 'static_face',
    sourceRefs: [
      'passage.shenxiang.nlc_1925.five_officers.listening',
    ],
    description:
      'NLC-1925 採聽官 passage의 色鮮/高聳於眉/輪廓完成/貼肉敦厚/風門寬大를 source-qualified formation descriptors로 보존한다.',
    limitations: [
      '色鮮은 static geometry로 환원하지 않는다.',
      '원문의 descriptor 나열을 executable Boolean AND로 변환하지 않는다.',
      '風門의 현대 해부학적 경계나 landmark를 이 methodology에서 정의하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId:
      'method.shenxiang.five_officers.longevity_criteria.nlc_1925',
    version: '0.1.0',
    traditionalTerm: '保壽官成',
    scope: 'static_face',
    sourceRefs: [
      'passage.shenxiang.nlc_1925.five_officers.longevity',
    ],
    description:
      'NLC-1925 保壽官 passage의 寬廣清長/雙分入鬢/懸犀新月之樣/首尾豐盈/高居額中을 source-qualified formation descriptors로 보존한다.',
    limitations: [
      '或 표지는 source text의 대안 표지로 보존하되 executable OR 조건을 승인하지 않는다.',
      '懸犀/新月 비유를 임의의 곡률 threshold로 환원하지 않는다.',
      '額中/入鬢의 executable region boundary를 이 methodology에서 정의하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId:
      'method.shenxiang.five_officers.inspection_criteria.nlc_1925',
    version: '0.1.0',
    traditionalTerm: '監察官成',
    scope: 'static_face',
    sourceRefs: [
      'passage.shenxiang.nlc_1925.five_officers.inspection',
    ],
    description:
      'NLC-1925 監察官 passage의 含藏不露/黑白分明/瞳子端定/光彩射人/細長極寸을 source-qualified formation descriptors로 보존한다.',
    limitations: [
      '黑白分明/光彩射人은 capture-sensitive appearance semantics를 포함한다.',
      '極寸을 현대 길이·pixel·face-normalized threshold로 변환하지 않는다.',
      '或 표지를 executable OR 조건으로 승인하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId:
      'method.shenxiang.five_officers.discernment_criteria.nlc_1925',
    version: '0.1.0',
    traditionalTerm: '審辨官成',
    scope: 'static_face',
    sourceRefs: [
      'passage.shenxiang.nlc_1925.five_officers.discernment',
    ],
    description:
      'NLC-1925 審辨官 passage의 梁柱端直/印堂平闊/山根連印/年壽高隆/準圓庫起/懸膽/截筒/色鮮黃明을 source-qualified formation descriptors로 보존한다.',
    limitations: [
      '色鮮黃明은 morphology가 아니라 appearance/color 계열로 분리한다.',
      '懸膽/截筒 비유를 단일 shape metric으로 환원하지 않는다.',
      '印堂/山根/年壽/準/庫의 observation binding을 이 methodology에서 발명하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
] as const satisfies readonly FaceMethodologyDefinition[];

export const FACE_TRADITIONAL_T4_FIVE_OFFICER_MAPPING = Object.freeze({
  methodologyRef:
    FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.mapping,
  sourceRef:
    'passage.shenxiang.nlc_1925.five_officers.mapping' as const,
  mappings: [
    { feature: '耳', officer: '採聽官' },
    { feature: '眉', officer: '保壽官' },
    { feature: '眼', officer: '監察官' },
    { feature: '鼻', officer: '審辨官' },
    { feature: '口', officer: '出納官' },
  ] as const,
  mappingMeansFormationSatisfied: false as const,
  mappingMeansOutcomeClaim: false as const,
  crossLineageAliasAuthorized: false as const,
});

export const FACE_TRADITIONAL_T4_FIVE_OFFICER_CRITERION_UNITS = [
  {
    criterionId: 't4.listening.color_fresh',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.listening'],
    traditionalOfficerName: '採聽官',
    sourceExpression: '色鮮',
    constructClass: 'appearance_color',
    observabilityClass: 'capture_sensitive_candidate',
    normalizedResearchMeaning: '귀의 色이 鮮하다는 source-local appearance descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['controlled_visible_ear_appearance'],
    limitations: ['조명·화이트밸런스·피부색 보정 없이 색 판정을 승인하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.listening.high_relative_to_brow',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.listening'],
    traditionalOfficerName: '採聽官',
    sourceExpression: '高聳於眉',
    constructClass: 'spatial_relation',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '귀의 높이를 眉와 관계지어 기술하는 source-local relation.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_ear_to_brow_vertical_relation'],
    limitations: ['어느 귀 경계점과 어느 眉 기준점을 비교할지는 source passage만으로 정해지지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.listening.contour_complete',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.listening'],
    traditionalOfficerName: '採聽官',
    sourceExpression: '輪廓完成',
    constructClass: 'compound_semantics_unresolved',
    observabilityClass: 'unresolved',
    normalizedResearchMeaning: '輪/廓의 完成을 요구하는 복합 형태 descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_visible_ear_contour_structure'],
    limitations: ['輪과 廓을 현대 귀 subregion으로 임의 분할하지 않는다.', '完成의 threshold가 없다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.listening.close_fleshy_substantial',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.listening'],
    traditionalOfficerName: '採聽官',
    sourceExpression: '貼肉敦厚',
    constructClass: 'compound_semantics_unresolved',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '貼肉과 敦厚가 결합된 source-local 복합 형태 descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_ear_projection_or_attachment_candidate', 'governed_visible_ear_fullness_candidate'],
    limitations: ['2D selfie만으로 실제 돌출도/두께를 확정할 수 있다고 가정하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.listening.fengmen_broad',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.listening'],
    traditionalOfficerName: '採聽官',
    sourceExpression: '風門寬大',
    constructClass: 'compound_semantics_unresolved',
    observabilityClass: 'unresolved',
    normalizedResearchMeaning: '風門의 寬大를 요구하는 source-local descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_fengmen_semantic_region_before_measurement'],
    limitations: ['風門의 observation region authority가 먼저 필요하다.', '寬大의 수치 기준은 source에 없다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },

  {
    criterionId: 't4.longevity.broad_clear_long',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.longevity'],
    traditionalOfficerName: '保壽官',
    sourceExpression: '寬廣清長',
    constructClass: 'compound_semantics_unresolved',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '眉의 폭·청정성·길이 계열 의미가 결합된 source-local descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_visible_brow_extent', 'governed_visible_brow_clarity_candidate'],
    limitations: ['寬廣/清/長의 독립 threshold나 가중치를 만들지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.longevity.both_extend_into_temples',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.longevity'],
    traditionalOfficerName: '保壽官',
    sourceExpression: '雙分入鬢',
    constructClass: 'spatial_relation',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '양쪽 眉의 외측 전개와 鬢 영역의 관계를 기술한다.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_bilateral_brow_to_temporal_hair_relation'],
    limitations: ['鬢의 neutral observation boundary가 먼저 필요하다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.longevity.suspended_rhino_new_moon_analogy',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.longevity'],
    traditionalOfficerName: '保壽官',
    sourceExpression: '或如懸犀新月之樣',
    constructClass: 'figurative_form',
    observabilityClass: 'non_numeric_figurative_candidate',
    normalizedResearchMeaning: '懸犀/新月을 사용한 source-local 형상 비유이며 或 표지를 포함한다.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['source_grounded_brow_form_comparanda'],
    limitations: ['곡률 하나로 비유를 치환하지 않는다.', '或를 executable OR로 해석하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.longevity.ends_full',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.longevity'],
    traditionalOfficerName: '保壽官',
    sourceExpression: '首尾豐盈',
    constructClass: 'static_morphology',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '眉의 首/尾가 豐盈하다는 형태 descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_brow_medial_lateral_fullness_candidate'],
    limitations: ['首/尾 boundary와 豐盈 threshold는 아직 unbound다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.longevity.high_in_forehead_center',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.longevity'],
    traditionalOfficerName: '保壽官',
    sourceExpression: '高居額中',
    constructClass: 'spatial_relation',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '眉의 위치를 額中과 관계지어 기술하는 source-local relation.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_brow_to_forehead_relation'],
    limitations: ['額中의 executable region definition을 이 T4에서 만들지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },

  {
    criterionId: 't4.inspection.concealed_not_exposed',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.inspection'],
    traditionalOfficerName: '監察官',
    sourceExpression: '含藏不露',
    constructClass: 'visibility_or_exposure',
    observabilityClass: 'capture_sensitive_candidate',
    normalizedResearchMeaning: '눈의 含藏/不露를 기술하는 source-local 노출성 descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_eye_exposure_candidate', 'neutral_gaze_capture_gate'],
    limitations: ['표정·시선·눈뜸 정도와 source construct를 자동 동일시하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.inspection.black_white_distinct',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.inspection'],
    traditionalOfficerName: '監察官',
    sourceExpression: '黑白分明',
    constructClass: 'appearance_contrast_or_lustre',
    observabilityClass: 'capture_sensitive_candidate',
    normalizedResearchMeaning: '눈의 黑/白이 分明하다는 appearance/contrast descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['controlled_eye_region_appearance_contrast'],
    limitations: ['의학적 상태나 인종/민족적 특성으로 해석하지 않는다.', 'capture calibration 없이 threshold를 만들지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.inspection.pupil_settled',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.inspection'],
    traditionalOfficerName: '監察官',
    sourceExpression: '瞳子端定',
    constructClass: 'compound_semantics_unresolved',
    observabilityClass: 'capture_sensitive_candidate',
    normalizedResearchMeaning: '瞳子의 端定을 요구하는 source-local descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_pupil_or_visible_iris_alignment_candidate', 'neutral_gaze_capture_gate'],
    limitations: ['端定을 gaze-center metric 하나로 환원하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.inspection.radiant_lustre',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.inspection'],
    traditionalOfficerName: '監察官',
    sourceExpression: '光彩射人',
    constructClass: 'appearance_contrast_or_lustre',
    observabilityClass: 'capture_sensitive_candidate',
    normalizedResearchMeaning: '光彩를 강조하는 source-local appearance/lustre descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['controlled_eye_lustre_research_only'],
    limitations: ['조명 반사나 카메라 specular highlight를 전통 光彩로 자동 동일시하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.inspection.slender_long_historical_measure',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.inspection'],
    traditionalOfficerName: '監察官',
    sourceExpression: '或細長極寸',
    constructClass: 'historical_measure_expression',
    observabilityClass: 'unresolved',
    normalizedResearchMeaning: '細長과 寸 표현을 포함한 source-local 형상/척도 문구이며 或 표지를 포함한다.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['source_grounded_historical_measure_interpretation_before_metric_binding'],
    limitations: ['寸을 현대 절대길이·pixel·비율로 환산하지 않는다.', '或를 executable OR로 해석하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },

  {
    criterionId: 't4.discernment.bridge_column_straight',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.discernment'],
    traditionalOfficerName: '審辨官',
    sourceExpression: '梁柱端直',
    constructClass: 'static_morphology',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '鼻의 梁柱를 端直하다고 기술하는 source-local 형태 descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_nasal_bridge_column_straightness_candidate'],
    limitations: ['기존 neutral nose metric이 곧 梁柱端直임을 선언하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.discernment.yintang_level_broad',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.discernment'],
    traditionalOfficerName: '審辨官',
    sourceExpression: '印堂平闊',
    constructClass: 'compound_semantics_unresolved',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '印堂의 平/闊을 결합해 기술하는 source-local descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_yintang_region_before_shape_or_width_measurement'],
    limitations: ['印堂 region authority가 없으면 fail closed한다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.discernment.shangen_connects_yintang',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.discernment'],
    traditionalOfficerName: '審辨官',
    sourceExpression: '山根連印',
    constructClass: 'spatial_relation',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '山根과 印堂 사이의 source-local 연결 관계.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_shangen_reference', 'governed_yintang_reference', 'governed_connection_relation'],
    limitations: ['FR297 neutral nasal bridge-root reference를 山根으로 자동 승격하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.discernment.nianshou_high_prominent',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.discernment'],
    traditionalOfficerName: '審辨官',
    sourceExpression: '年壽高隆',
    constructClass: 'compound_semantics_unresolved',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '年壽 부위의 高隆을 요구하는 source-local descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_nianshou_region_before_prominence_measurement'],
    limitations: ['年壽 region과 高隆 기준은 아직 unbound다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.discernment.zhuntou_round_ku_raised',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.discernment'],
    traditionalOfficerName: '審辨官',
    sourceExpression: '準圓庫起',
    constructClass: 'compound_semantics_unresolved',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: '準의 圓과 庫의 起를 결합한 source-local descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_zhuntou_region', 'governed_ku_region_before_prominence_measurement'],
    limitations: ['準/庫의 exact region identity를 이 T4에서 발명하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.discernment.suspended_gallbladder_form',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.discernment'],
    traditionalOfficerName: '審辨官',
    sourceExpression: '形如懸膽',
    constructClass: 'figurative_form',
    observabilityClass: 'non_numeric_figurative_candidate',
    normalizedResearchMeaning: '懸膽을 사용한 source-local 鼻 형상 비유.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['source_grounded_nose_form_comparanda'],
    limitations: ['tip circularity 또는 단일 비율로 懸膽을 치환하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.discernment.cut_tube_form',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.discernment'],
    traditionalOfficerName: '審辨官',
    sourceExpression: '齊如截筒',
    constructClass: 'figurative_form',
    observabilityClass: 'non_numeric_figurative_candidate',
    normalizedResearchMeaning: '截筒을 사용한 source-local 鼻 형상 비유.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['source_grounded_nose_form_comparanda'],
    limitations: ['rectilinearity 하나로 截筒을 치환하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 't4.discernment.fresh_yellow_bright',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.discernment'],
    traditionalOfficerName: '審辨官',
    sourceExpression: '色鮮黃明',
    constructClass: 'appearance_color',
    observabilityClass: 'capture_sensitive_candidate',
    normalizedResearchMeaning: '鼻의 色을 鮮/黃/明으로 기술하는 source-local appearance descriptor.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['controlled_nose_region_appearance'],
    limitations: ['피부색·민족·건강 상태를 추론하지 않는다.', 'color-calibrated capture authority 없이 실행하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },

  {
    criterionId: 'criterion.intake.square_broad',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
    sourceRefs: ['passage.shenxiang.five_officers.intake.nlc_1925'],
    traditionalOfficerName: '出納官',
    sourceExpression: '方大',
    constructClass: 'compound_semantics_unresolved',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: 'FR132가 연구 중인 方/大 복합 construct이며 aspect ratio 하나로 환원되지 않는다.',
    decompositionStatus: 'analytical_split_only_not_source_segmentation',
    requiredObservationCapabilities: ['governed_mouth_outline_form_candidate', 'anatomically_governed_relative_mouth_size_candidate'],
    limitations: ['FR132 authority boundary를 그대로 유지한다.', '方와 大의 분석적 분해는 source segmentation authority가 아니다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 'criterion.intake.lips_substantial',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
    sourceRefs: ['passage.shenxiang.five_officers.intake.nlc_1925'],
    traditionalOfficerName: '出納官',
    sourceExpression: '端厚',
    constructClass: 'compound_semantics_unresolved',
    observabilityClass: 'static_candidate',
    normalizedResearchMeaning: 'FR132가 연구 중인 端/厚 복합 construct이며 厚만으로 환원되지 않는다.',
    decompositionStatus: 'analytical_split_only_not_source_segmentation',
    requiredObservationCapabilities: ['governed_visible_lip_fullness_candidate', 'source_grounded_duan_semantics'],
    limitations: ['端의 operational meaning은 unresolved다.', 'neutral nearest-set distance를 lip thickness로 자동 해석하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 'criterion.intake.corners_arched',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
    sourceRefs: ['passage.shenxiang.five_officers.intake.nlc_1925'],
    traditionalOfficerName: '出納官',
    sourceExpression: '角弓',
    constructClass: 'figurative_form',
    observabilityClass: 'non_numeric_figurative_candidate',
    normalizedResearchMeaning: 'FR132가 generic corner curvature로 환원하지 않도록 고정한 角弓 construct.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['governed_mouth_corner_orientation_candidate', 'bow_like_contour_research', 'teeth_visibility_candidate'],
    limitations: ['미소·발화·lip parting confound를 통제해야 한다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 'criterion.intake.open_close_relation',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
    sourceRefs: ['passage.shenxiang.five_officers.intake.nlc_1925'],
    traditionalOfficerName: '出納官',
    sourceExpression: '開大合小',
    constructClass: 'dynamic_multi_state',
    observabilityClass: 'multi_state_candidate',
    normalizedResearchMeaning: 'FR132가 controlled multiple states를 요구하도록 고정한 開/合 관계 construct.',
    decompositionStatus: 'source_expression_preserved',
    requiredObservationCapabilities: ['controlled_open_state_geometry', 'controlled_closed_state_geometry', 'same_subject_state_relation'],
    limitations: ['단일 정지 selfie에서 이 criterion을 판정하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
  {
    criterionId: 'criterion.intake.red_lip_color',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
    sourceRefs: ['passage.shenxiang.five_officers.intake.nlc_1925'],
    traditionalOfficerName: '出納官',
    sourceExpression: '唇紅',
    constructClass: 'appearance_color',
    observabilityClass: 'capture_sensitive_candidate',
    normalizedResearchMeaning: 'FR132가 color-calibrated capture 전에는 operationalization을 금지한 唇紅 construct.',
    decompositionStatus: 'analytical_split_only_not_source_segmentation',
    requiredObservationCapabilities: ['controlled_lip_color_capture'],
    limitations: ['피부색·민족·건강 상태 추론으로 확장하지 않는다.'],
    traditionalMetricBindingAuthorized: false,
    thresholdAuthorized: false,
    automaticCriterionStateAuthorized: false,
  },
] as const satisfies readonly TraditionalFiveOfficerCriterionUnitT4[];

export const FACE_TRADITIONAL_T4_FIVE_OFFICER_FORMATION_STATEMENTS = [
  {
    statementId: 't4.formation.listening',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.listening'],
    traditionalOfficerName: '採聽官',
    sourceFormationLabel: '謂之採聽官成',
    criterionIds: [
      't4.listening.color_fresh',
      't4.listening.high_relative_to_brow',
      't4.listening.contour_complete',
      't4.listening.close_fleshy_substantial',
      't4.listening.fengmen_broad',
    ],
    sourceAggregateSemantics: 'listed_descriptors_leading_to_formation_label',
    explicitAlternativeMarkerPresent: false,
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    criterionWeightingAuthorized: false,
    partialSatisfactionPolicyAuthorized: false,
    negativeCountercriterionPolicyAuthorized: false,
    limitations: ['須要/者謂之의 문법을 deterministic AND evaluator로 자동 변환하지 않는다.'],
  },
  {
    statementId: 't4.formation.longevity',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.longevity'],
    traditionalOfficerName: '保壽官',
    sourceFormationLabel: '乃為保壽官成',
    criterionIds: [
      't4.longevity.broad_clear_long',
      't4.longevity.both_extend_into_temples',
      't4.longevity.suspended_rhino_new_moon_analogy',
      't4.longevity.ends_full',
      't4.longevity.high_in_forehead_center',
    ],
    sourceAggregateSemantics: 'listed_descriptors_leading_to_formation_label',
    explicitAlternativeMarkerPresent: true,
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    criterionWeightingAuthorized: false,
    partialSatisfactionPolicyAuthorized: false,
    negativeCountercriterionPolicyAuthorized: false,
    limitations: ['或의 범위와 대체관계를 machine OR로 확정하지 않는다.'],
  },
  {
    statementId: 't4.formation.inspection',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.inspection'],
    traditionalOfficerName: '監察官',
    sourceFormationLabel: '乃為監察官成',
    criterionIds: [
      't4.inspection.concealed_not_exposed',
      't4.inspection.black_white_distinct',
      't4.inspection.pupil_settled',
      't4.inspection.radiant_lustre',
      't4.inspection.slender_long_historical_measure',
    ],
    sourceAggregateSemantics: 'listed_descriptors_leading_to_formation_label',
    explicitAlternativeMarkerPresent: true,
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    criterionWeightingAuthorized: false,
    partialSatisfactionPolicyAuthorized: false,
    negativeCountercriterionPolicyAuthorized: false,
    limitations: ['或의 범위와 極寸의 의미가 unresolved이므로 Boolean evaluator를 만들지 않는다.'],
  },
  {
    statementId: 't4.formation.discernment',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    sourceRefs: ['passage.shenxiang.nlc_1925.five_officers.discernment'],
    traditionalOfficerName: '審辨官',
    sourceFormationLabel: '乃為審辨官成',
    criterionIds: [
      't4.discernment.bridge_column_straight',
      't4.discernment.yintang_level_broad',
      't4.discernment.shangen_connects_yintang',
      't4.discernment.nianshou_high_prominent',
      't4.discernment.zhuntou_round_ku_raised',
      't4.discernment.suspended_gallbladder_form',
      't4.discernment.cut_tube_form',
      't4.discernment.fresh_yellow_bright',
    ],
    sourceAggregateSemantics: 'listed_descriptors_leading_to_formation_label',
    explicitAlternativeMarkerPresent: false,
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    criterionWeightingAuthorized: false,
    partialSatisfactionPolicyAuthorized: false,
    negativeCountercriterionPolicyAuthorized: false,
    limitations: ['복합 부위·비유·색 표현이 섞여 있어 source listing을 단일 score로 합치지 않는다.'],
  },
  {
    statementId: 't4.formation.intake',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
    sourceRefs: ['passage.shenxiang.five_officers.intake.nlc_1925'],
    traditionalOfficerName: '出納官',
    sourceFormationLabel: '乃為出納官成',
    criterionIds: [
      'criterion.intake.square_broad',
      'criterion.intake.red_lip_color',
      'criterion.intake.lips_substantial',
      'criterion.intake.corners_arched',
      'criterion.intake.open_close_relation',
    ],
    sourceAggregateSemantics: 'listed_descriptors_leading_to_formation_label',
    explicitAlternativeMarkerPresent: false,
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    criterionWeightingAuthorized: false,
    partialSatisfactionPolicyAuthorized: false,
    negativeCountercriterionPolicyAuthorized: false,
    limitations: [
      '기존 method.shenxiang.five_officers.intake_criteria@0.2.0 및 FR132 authority boundary를 재사용한다.',
      'T4는 competing 出納官 methodology를 새로 발행하지 않는다.',
    ],
  },
] as const satisfies readonly TraditionalFiveOfficerFormationStatementT4[];

export const FACE_TRADITIONAL_T4_FIVE_OFFICER_OBSERVATION_REQUIREMENTS = [
  {
    requirementId: 't4.req.listening.static_ear_structure',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
    traditionalExpression: '輪廓完成 / 貼肉敦厚 / 風門寬大',
    semanticRequirement: '귀의 source-local 구조·부착/풍부함·風門 의미를 보존할 수 있는 중립 관찰 계약이 필요하다.',
    requirementClass: 'neutral_static_geometry',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.listening.ear_brow_relation',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
    traditionalExpression: '高聳於眉',
    semanticRequirement: '귀와 眉의 governed vertical relation이 필요하다.',
    requirementClass: 'neutral_spatial_relation',
    implementationOwner: 'face-reading-binding',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.listening.appearance',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
    traditionalExpression: '色鮮',
    semanticRequirement: 'capture-controlled ear appearance evidence가 없으면 fail closed해야 한다.',
    requirementClass: 'controlled_appearance',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.longevity.brow_geometry',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
    traditionalExpression: '寬廣清長 / 首尾豐盈',
    semanticRequirement: 'visible brow extent/fullness와 source construct를 분리한 중립 관찰 계약이 필요하다.',
    requirementClass: 'neutral_static_geometry',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.longevity.brow_relations',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
    traditionalExpression: '雙分入鬢 / 高居額中',
    semanticRequirement: '眉-鬢 및 眉-額의 governed relation semantics가 필요하다.',
    requirementClass: 'neutral_spatial_relation',
    implementationOwner: 'face-reading-binding',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.longevity.figurative_form',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
    traditionalExpression: '懸犀新月之樣',
    semanticRequirement: '비유를 단일 curvature로 축약하지 않는 source-grounded form 연구가 필요하다.',
    requirementClass: 'figurative_construct_research',
    implementationOwner: 'face-reading-binding',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.inspection.static_eye',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
    traditionalExpression: '含藏不露 / 瞳子端定',
    semanticRequirement: 'controlled gaze 상태에서 eye exposure/alignment 후보를 관찰하되 traditional binding은 별도여야 한다.',
    requirementClass: 'neutral_static_geometry',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.inspection.appearance',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
    traditionalExpression: '黑白分明 / 光彩射人',
    semanticRequirement: 'capture-controlled eye appearance/contrast/lustre evidence가 필요하다.',
    requirementClass: 'controlled_appearance',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.inspection.historical_measure',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
    traditionalExpression: '細長極寸',
    semanticRequirement: '寸의 source-local 의미를 먼저 연구해야 하며 현대 단위 변환을 선행하지 않는다.',
    requirementClass: 'historical_measure_research',
    implementationOwner: 'face-reading-binding',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.discernment.nose_structure',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    traditionalExpression: '梁柱端直 / 年壽高隆 / 準圓庫起',
    semanticRequirement: 'neutral nose morphology와 source-local named regions를 분리한 관찰/binding 계약이 필요하다.',
    requirementClass: 'neutral_static_geometry',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.discernment.named_region_relations',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    traditionalExpression: '印堂平闊 / 山根連印',
    semanticRequirement: '印堂/山根의 governed traditional binding 전에는 region relation을 실행하지 않는다.',
    requirementClass: 'neutral_spatial_relation',
    implementationOwner: 'face-reading-binding',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.discernment.figurative_forms',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    traditionalExpression: '形如懸膽 / 齊如截筒',
    semanticRequirement: 'source-grounded figurative form comparanda가 필요하며 단일 neutral metric으로 치환하지 않는다.',
    requirementClass: 'figurative_construct_research',
    implementationOwner: 'face-reading-binding',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.discernment.appearance',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
    traditionalExpression: '色鮮黃明',
    semanticRequirement: 'capture-controlled nose-region appearance evidence가 없으면 fail closed한다.',
    requirementClass: 'controlled_appearance',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.intake.static_mouth',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
    traditionalExpression: '方大 / 端厚 / 角弓',
    semanticRequirement: 'FR132의 construct-validity blockers를 유지한 채 source-grounded neutral mouth observations가 필요하다.',
    requirementClass: 'neutral_static_geometry',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.intake.dynamic',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
    traditionalExpression: '開大合小',
    semanticRequirement: '동일 subject의 controlled open/closed states가 필요하다.',
    requirementClass: 'controlled_multi_state',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.intake.appearance',
    methodologyRef: FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
    traditionalExpression: '唇紅',
    semanticRequirement: 'color-calibrated lip appearance evidence가 없으면 fail closed한다.',
    requirementClass: 'controlled_appearance',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
] as const satisfies readonly TraditionalFiveOfficerObservationRequirementT4[];

export const FACE_TRADITIONAL_T4_FIVE_OFFICER_AUTHORITY_BOUNDARY =
  Object.freeze({
    sourceMappingScanChecked: true as const,
    allFiveFormationSourcePassagesScanChecked: true as const,
    sourceListingMeansExecutableBooleanAnd: false as const,
    sourceAlternativeMarkerMeansExecutableBooleanOr: false as const,
    sourceOrderMeansCriterionWeight: false as const,
    missingCriterionPolicyAuthorized: false as const,
    partialSatisfactionPolicyAuthorized: false as const,
    negativeCountercriterionPolicyAuthorized: false as const,
    figurativeLanguageMeansNumericShapeMetric: false as const,
    historicalMeasureMeansModernUnit: false as const,
    appearanceLanguageMeansUncontrolledRgbInference: false as const,
    existingIntakeSuccessorReused: true as const,
    competingIntakeMethodologyIssued: false as const,
    traditionalMetricBindingAuthorized: false as const,
    thresholdAuthorized: false as const,
    automaticOfficerFormationStateAuthorized: false as const,
    outcomeClaimAuthorized: false as const,
    productionAuthorization: false as const,
    nextPhase:
      'T5_FIVE_OFFICERS_OPERATIONALIZATION_SPECIFICATION' as const,
  });
