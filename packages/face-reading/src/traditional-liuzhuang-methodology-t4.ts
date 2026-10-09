import type { FaceMethodologyDefinition } from './contracts.js';

export type TraditionalLiuzhuangMethodologyRefT4 =
  | 'method.liuzhuang.five_officers.mapping.wenming_1925@0.1.0'
  | 'method.liuzhuang.five_officers.listening_criteria.wenming_1925@0.1.0'
  | 'method.liuzhuang.five_officers.longevity_criteria.wenming_1925@0.1.0'
  | 'method.liuzhuang.five_officers.inspection_criteria.wenming_1925@0.1.0'
  | 'method.liuzhuang.five_officers.discernment_criteria.wenming_1925@0.1.0'
  | 'method.liuzhuang.five_officers.intake_criteria.wenming_1925@0.1.0'
  | 'method.liuzhuang.six_fus.mapping.wenming_1925@0.1.0';

export type TraditionalLiuzhuangConstructClassT4 =
  | 'mapping'
  | 'static_morphology'
  | 'spatial_relation'
  | 'appearance_or_color'
  | 'visibility_or_exposure'
  | 'figurative_form'
  | 'compound_semantics_unresolved';

export interface TraditionalLiuzhuangDescriptorT4 {
  readonly descriptorId: string;
  readonly methodologyRef: TraditionalLiuzhuangMethodologyRefT4;
  readonly sourceRefs: readonly string[];
  readonly sourceExpression: string;
  readonly constructClass: TraditionalLiuzhuangConstructClassT4;
  readonly normalizedResearchMeaning: string;
  readonly requiredObservationCapabilities: readonly string[];
  readonly limitations: readonly string[];
  readonly metricBindingAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly automaticCriterionStateAuthorized: false;
}

const sourceRefs = (key: string) =>
  [
    `passage.liuzhuang.nlc416_1925.five_officers.formation.${key}`,
    `passage.liuzhuang.nlc511_1925.five_officers.formation.${key}`,
  ] as const;

export const FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS = Object.freeze({
  mapping:
    'method.liuzhuang.five_officers.mapping.wenming_1925@0.1.0' as const,
  listening:
    'method.liuzhuang.five_officers.listening_criteria.wenming_1925@0.1.0' as const,
  longevity:
    'method.liuzhuang.five_officers.longevity_criteria.wenming_1925@0.1.0' as const,
  inspection:
    'method.liuzhuang.five_officers.inspection_criteria.wenming_1925@0.1.0' as const,
  discernment:
    'method.liuzhuang.five_officers.discernment_criteria.wenming_1925@0.1.0' as const,
  intake:
    'method.liuzhuang.five_officers.intake_criteria.wenming_1925@0.1.0' as const,
  sixFus:
    'method.liuzhuang.six_fus.mapping.wenming_1925@0.1.0' as const,
});

export const FACE_TRADITIONAL_T4_LIUZHUANG_METHODOLOGIES = [
  {
    methodologyId: 'method.liuzhuang.five_officers.mapping.wenming_1925',
    version: '0.1.0',
    traditionalTerm: '五官說',
    scope: 'static_face',
    sourceRefs: [
      'passage.liuzhuang.nlc416_1925.five_officers.ear_title',
      'passage.liuzhuang.nlc511_1925.five_officers.ear_title',
      'passage.liuzhuang.nlc416_1925.five_officers.nose_title',
      'passage.liuzhuang.nlc511_1925.five_officers.nose_title',
    ],
    description:
      '1925 文明書局 柳莊 lineage의 五官 mapping을 source-local methodology로 보존한다: 耳→採聽官, 眉→保壽官, 眼→監察官, 鼻→審辨官, 口→出納官.',
    limitations: [
      '神相 method.*와 별도 lineage다.',
      'mapping은 官成 판정이나 결과 예측을 뜻하지 않는다.',
      '현대 審判官 전자 전사를 이 methodology로 삭제하거나 OCR 오류로 선언하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId:
      'method.liuzhuang.five_officers.listening_criteria.wenming_1925',
    version: '0.1.0',
    traditionalTerm: '採聽官成',
    scope: 'static_face',
    sourceRefs: [...sourceRefs('listening')],
    description:
      '柳莊 1925 五官說의 色明/高聳過於眉/輪廓完成/貼肉敦厚/命門寬大를 source-qualified formation descriptors로 보존한다.',
    limitations: [
      '色明을 uncontrolled RGB로 환원하지 않는다.',
      '命門의 traditional region authority를 neutral ear geometry에서 발명하지 않는다.',
      'descriptor list를 executable Boolean AND로 컴파일하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId:
      'method.liuzhuang.five_officers.longevity_criteria.wenming_1925',
    version: '0.1.0',
    traditionalTerm: '保壽官成',
    scope: 'static_face',
    sourceRefs: [...sourceRefs('longevity')],
    description:
      '柳莊 1925 五官說의 寬廣清長/雙分入鬢/玄犀新月/首尾豐盈/高居額中을 source-qualified formation descriptors로 보존한다.',
    limitations: [
      '或를 executable OR로 자동 해석하지 않는다.',
      '玄犀/新月 비유를 임의 curvature threshold로 환원하지 않는다.',
      '鬢/額中의 executable boundary는 T4에서 만들지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId:
      'method.liuzhuang.five_officers.inspection_criteria.wenming_1925',
    version: '0.1.0',
    traditionalTerm: '監察官成',
    scope: 'static_face',
    sourceRefs: [...sourceRefs('inspection')],
    description:
      '柳莊 1925 五官說의 含藏不露/黑白分明/瞳子端正/光彩射人/鳳目細長藏秀를 source-qualified formation descriptors로 보존한다.',
    limitations: [
      'appearance/capture-sensitive language를 static geometry와 동일시하지 않는다.',
      '鳳目 비유를 단일 eye aspect-ratio metric으로 환원하지 않는다.',
      '或를 executable OR로 자동 해석하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId:
      'method.liuzhuang.five_officers.discernment_criteria.wenming_1925',
    version: '0.1.0',
    traditionalTerm: '審辨官成',
    scope: 'static_face',
    sourceRefs: [...sourceRefs('discernment')],
    description:
      '柳莊 1925 五官說의 樑柱明直/上接山根/印堂明潤/下連年壽高隆/不宜起節/準頭庫起/懸膽/截筒/黃明色肉을 source-qualified formation descriptors로 보존한다.',
    limitations: [
      '印堂/山根/年壽/準頭/庫의 traditional binding을 neutral CV region에서 자동 생성하지 않는다.',
      '懸膽/截筒 비유를 단일 shape metric으로 환원하지 않는다.',
      '黃明色肉을 uncontrolled RGB 판정으로 만들지 않는다.',
      '審判官 전자 전승을 이 definition으로 삭제하거나 정규화하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId:
      'method.liuzhuang.five_officers.intake_criteria.wenming_1925',
    version: '0.1.0',
    traditionalTerm: '出納官成',
    scope: 'static_face',
    sourceRefs: [...sourceRefs('intake')],
    description:
      '柳莊 1925 五官說의 角弓/開大合小/上下唇配齒配四方을 source-qualified formation descriptors로 보존한다.',
    limitations: [
      '神相 出納官 methodology를 재사용하지 않는다.',
      '開大合小의 실행에는 controlled multi-state capture 의미가 필요하지만 T4는 그 capture contract를 정의하지 않는다.',
      '配齒配四方을 임의 aspect ratio나 치아 노출 threshold로 환원하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId: 'method.liuzhuang.six_fus.mapping.wenming_1925',
    version: '0.1.0',
    traditionalTerm: '六府',
    scope: 'static_face',
    sourceRefs: [
      'passage.liuzhuang.nlc416_1925.five_elements_combined.five_officers_six_fus',
      'passage.liuzhuang.nlc511_1925.five_elements_combined.five_officers_six_fus',
    ],
    description:
      '柳莊 1925 五行貴賤 locus의 六府 mapping 天倉→上二府 / 顴骨→中二府 / 地庫→下二府를 source-local mapping으로 보존한다.',
    limitations: [
      '神相 六府와 동일 methodology로 병합하지 않는다.',
      '天倉/顴骨/地庫의 neutral CV region binding을 이 T4에서 만들지 않는다.',
      'mapping은 富貴 등 outcome claim을 실행하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
] as const satisfies readonly FaceMethodologyDefinition[];

const descriptor = (
  descriptorId: string,
  methodologyRef: TraditionalLiuzhuangMethodologyRefT4,
  key: string,
  sourceExpression: string,
  constructClass: TraditionalLiuzhuangConstructClassT4,
  normalizedResearchMeaning: string,
  requiredObservationCapabilities: readonly string[],
  limitations: readonly string[],
): TraditionalLiuzhuangDescriptorT4 => ({
  descriptorId,
  methodologyRef,
  sourceRefs: sourceRefs(key),
  sourceExpression,
  constructClass,
  normalizedResearchMeaning,
  requiredObservationCapabilities,
  limitations,
  metricBindingAuthorized: false,
  thresholdAuthorized: false,
  automaticCriterionStateAuthorized: false,
});

export const FACE_TRADITIONAL_T4_LIUZHUANG_DESCRIPTOR_UNITS = [
  descriptor('t4.liuzhuang.listening.color_clear', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.listening, 'listening', '色明', 'appearance_or_color', '귀의 色이 明하다는 source-local appearance descriptor.', ['controlled_visible_ear_appearance'], ['조명/화이트밸런스 통제 없이 판정하지 않는다.']),
  descriptor('t4.liuzhuang.listening.high_over_brow', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.listening, 'listening', '高聳過於眉', 'spatial_relation', '귀 높이와 眉의 source-local 관계.', ['governed_ear_to_brow_vertical_relation'], ['어느 귀/眉 기준점을 쓸지는 T4가 정하지 않는다.']),
  descriptor('t4.liuzhuang.listening.contour_complete', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.listening, 'listening', '輪廓完成', 'compound_semantics_unresolved', '輪廓의 完成을 요구하는 복합 구조 descriptor.', ['governed_visible_ear_contour_structure'], ['完成 threshold가 없다.']),
  descriptor('t4.liuzhuang.listening.close_substantial', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.listening, 'listening', '貼肉敦厚', 'compound_semantics_unresolved', '부착/돌출과 敦厚 의미가 결합된 descriptor.', ['governed_ear_attachment_candidate'], ['2D selfie만으로 실제 두께를 확정하지 않는다.']),
  descriptor('t4.liuzhuang.listening.mingmen_broad', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.listening, 'listening', '命門寬大', 'compound_semantics_unresolved', '命門이라는 source-local named region의 寬大.', ['governed_liuzhuang_mingmen_region'], ['neutral ear geometry를 命門으로 자동 명명하지 않는다.']),

  descriptor('t4.liuzhuang.longevity.broad_clear_long', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.longevity, 'longevity', '寬廣清長', 'compound_semantics_unresolved', '眉의 폭/청정성/길이 의미가 결합된 descriptor.', ['governed_visible_brow_extent'], ['독립 threshold나 가중치를 만들지 않는다.']),
  descriptor('t4.liuzhuang.longevity.into_temples', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.longevity, 'longevity', '雙分入鬢', 'spatial_relation', '양쪽 眉와 鬢 영역의 관계.', ['governed_brow_to_temporal_hair_relation'], ['鬢 boundary authority가 별도로 필요하다.']),
  descriptor('t4.liuzhuang.longevity.xuanxi_new_moon', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.longevity, 'longevity', '或如玄犀新月', 'figurative_form', '玄犀/新月의 source-local 형상 비유.', ['source_grounded_brow_form_comparanda'], ['curvature 하나로 치환하지 않는다.', '或를 executable OR로 만들지 않는다.']),
  descriptor('t4.liuzhuang.longevity.ends_full', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.longevity, 'longevity', '首尾豐盈', 'static_morphology', '眉의 首/尾가 豐盈하다는 descriptor.', ['governed_brow_end_fullness_candidate'], ['豐盈 threshold가 없다.']),
  descriptor('t4.liuzhuang.longevity.high_forehead_center', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.longevity, 'longevity', '高居額中', 'spatial_relation', '眉와 額中의 source-local 위치 관계.', ['governed_brow_to_forehead_relation'], ['額中 boundary를 T4에서 발명하지 않는다.']),

  descriptor('t4.liuzhuang.inspection.concealed', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.inspection, 'inspection', '含藏不露', 'visibility_or_exposure', '눈의 含藏/不露 노출성 descriptor.', ['controlled_eye_exposure_candidate'], ['표정/시선 상태와 traditional construct를 자동 동일시하지 않는다.']),
  descriptor('t4.liuzhuang.inspection.black_white_distinct', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.inspection, 'inspection', '黑白分明', 'appearance_or_color', '눈의 黑/白이 分明하다는 appearance descriptor.', ['controlled_eye_region_appearance'], ['의학적/인구학적 추론으로 확장하지 않는다.']),
  descriptor('t4.liuzhuang.inspection.pupil_upright', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.inspection, 'inspection', '瞳子端正', 'compound_semantics_unresolved', '瞳子의 端正을 요구하는 source-local descriptor.', ['controlled_gaze_alignment_candidate'], ['현대 안과학적 진단으로 해석하지 않는다.']),
  descriptor('t4.liuzhuang.inspection.lustre', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.inspection, 'inspection', '光彩射人', 'appearance_or_color', '눈의 光彩를 기술하는 capture-sensitive descriptor.', ['controlled_eye_lustre_candidate'], ['조명 반사를 traditional 光彩와 자동 동일시하지 않는다.']),
  descriptor('t4.liuzhuang.inspection.phoenix_long_hidden', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.inspection, 'inspection', '或鳳目細長藏秀', 'figurative_form', '鳳目/細長/藏秀가 결합된 source-local 대안 표현.', ['source_grounded_eye_form_comparanda'], ['aspect ratio 하나로 鳳目를 정의하지 않는다.', '或를 executable OR로 만들지 않는다.']),

  descriptor('t4.liuzhuang.discernment.bridge_straight', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.discernment, 'discernment', '樑柱明直', 'static_morphology', '鼻의 樑柱가 明直하다는 source-local descriptor.', ['neutral_nasal_axis_candidate'], ['neutral nasal axis를 樑柱로 자동 binding하지 않는다.']),
  descriptor('t4.liuzhuang.discernment.root_to_yintang', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.discernment, 'discernment', '上接山根印堂明潤', 'compound_semantics_unresolved', '山根/印堂 관계와 印堂 appearance가 결합된 source-local phrase.', ['governed_shangen_yintang_relation', 'controlled_yintang_appearance'], ['named-region authority가 먼저 필요하다.']),
  descriptor('t4.liuzhuang.discernment.nianshou_high', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.discernment, 'discernment', '下連年壽高隆', 'compound_semantics_unresolved', '年壽와의 연결 및 高隆을 기술한다.', ['governed_nianshou_region_relation'], ['neutral bridge geometry를 年壽로 자동 명명하지 않는다.']),
  descriptor('t4.liuzhuang.discernment.no_joint', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.discernment, 'discernment', '不宜起節', 'static_morphology', '起節을 부정하는 source-local morphology descriptor.', ['neutral_nasal_profile_irregularity_candidate'], ['negative criterion veto semantics는 아직 승인되지 않는다.']),
  descriptor('t4.liuzhuang.discernment.tip_store_rise', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.discernment, 'discernment', '準頭庫起', 'compound_semantics_unresolved', '準頭/庫의 起를 기술하는 named-region compound.', ['governed_zhuntou_ku_region_candidate'], ['準頭/庫 binding authority가 필요하다.']),
  descriptor('t4.liuzhuang.discernment.suspended_gall', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.discernment, 'discernment', '形如懸膽', 'figurative_form', '懸膽 형상 비유.', ['source_grounded_nose_form_comparanda'], ['단일 shape metric으로 치환하지 않는다.']),
  descriptor('t4.liuzhuang.discernment.cut_tube', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.discernment, 'discernment', '鼻如截筒', 'figurative_form', '截筒 형상 비유.', ['source_grounded_nose_form_comparanda'], ['단일 shape metric으로 치환하지 않는다.']),
  descriptor('t4.liuzhuang.discernment.yellow_clear_flesh', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.discernment, 'discernment', '黃明色肉', 'appearance_or_color', '黃/明/色肉을 포함하는 source-local appearance descriptor.', ['controlled_nose_region_appearance'], ['uncontrolled RGB나 피부색 추론으로 실행하지 않는다.']),

  descriptor('t4.liuzhuang.intake.corners_bow', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.intake, 'intake', '角弓', 'figurative_form', '입꼬리의 弓 비유를 포함하는 source-local descriptor.', ['source_grounded_mouth_corner_form'], ['generic curvature로 치환하지 않는다.']),
  descriptor('t4.liuzhuang.intake.open_large_close_small', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.intake, 'intake', '開大合小', 'compound_semantics_unresolved', 'open/closed 상태를 비교하는 source-local dynamic phrase.', ['controlled_multi_state_mouth_capture'], ['single image에서 실행하지 않는다.']),
  descriptor('t4.liuzhuang.intake.lip_teeth_square_relation', FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.intake, 'intake', '上下唇配齒配四方', 'compound_semantics_unresolved', '上下唇/齒/四方의 配를 요구하는 복합 descriptor.', ['governed_lip_teeth_form_relation'], ['aspect ratio나 치아 노출량 하나로 축약하지 않는다.']),
] as const;

export const FACE_TRADITIONAL_T4_LIUZHUANG_MAPPING = Object.freeze({
  methodologyRef: FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.mapping,
  mappings: [
    { feature: '耳', officer: '採聽官' },
    { feature: '眉', officer: '保壽官' },
    { feature: '眼', officer: '監察官' },
    { feature: '鼻', officer: '審辨官' },
    { feature: '口', officer: '出納官' },
  ] as const,
  mappingMeansFormationSatisfied: false as const,
  mappingMeansOutcomeClaim: false as const,
  shenxiangAliasAuthorized: false as const,
});

export const FACE_TRADITIONAL_T4_LIUZHUANG_SIX_FUS_MAPPING = Object.freeze({
  methodologyRef: FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.sixFus,
  mappings: [
    { sourceLocationTerm: '天倉', traditionalLabel: '上二府' },
    { sourceLocationTerm: '顴骨', traditionalLabel: '中二府' },
    { sourceLocationTerm: '地庫', traditionalLabel: '下二府' },
  ] as const,
  shenxiangSixFusMergeAuthorized: false as const,
  neutralRegionBindingAuthorized: false as const,
  outcomeClaimAuthorized: false as const,
});

export const FACE_TRADITIONAL_T4_LIUZHUANG_AUTHORITY_BOUNDARY =
  Object.freeze({
    methodologyLineage:
      '柳莊相法 / 1925 文明書局 / NLC416 + NLC511' as const,
    universalLiuzhuangCanonicalizationClaimed: false as const,
    modernShenpanTransmissionRetained: true as const,
    modernShenpanTransmissionUsedAsMethodologyAuthority: false as const,
    sourceListingMeansExecutableBooleanAnd: false as const,
    sourceAlternativeMarkerMeansExecutableBooleanOr: false as const,
    sourceOrderMeansCriterionWeight: false as const,
    negativePhraseMeansAutomaticVeto: false as const,
    missingCriterionPolicyAuthorized: false as const,
    partialSatisfactionPolicyAuthorized: false as const,
    figurativeLanguageMeansNumericShapeMetric: false as const,
    appearanceLanguageMeansUncontrolledRgbInference: false as const,
    traditionalMetricBindingAuthorized: false as const,
    automaticOfficerFormationStateAuthorized: false as const,
    outcomeClaimAuthorized: false as const,
    productionAuthorization: false as const,
    nextPhase:
      'T5_LIUZHUANG_1925_OPERATIONALIZATION_SPECIFICATION' as const,
  });
