import {
  FACE_TRADITIONAL_T4_LIUZHUANG_AUTHORITY_BOUNDARY,
  FACE_TRADITIONAL_T4_LIUZHUANG_DESCRIPTOR_UNITS,
  FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS,
} from './traditional-liuzhuang-methodology-t4.js';

export type TraditionalLiuzhuangOperationalizationBlockT5 =
  | 'observation_contract_plus_binding'
  | 'capture_protocol_plus_binding'
  | 'multi_state_protocol_plus_binding'
  | 'source_grounded_figurative_definition'
  | 'semantic_region_definition'
  | 'compound_construct_definition';

export type TraditionalLiuzhuangCaptureModeT5 =
  | 'single_static_candidate'
  | 'controlled_static'
  | 'controlled_multi_state'
  | 'not_yet_capture_operationalizable';

export interface TraditionalLiuzhuangOperationalizationSpecT5 {
  readonly specId: string;
  readonly descriptorId: string;
  readonly sourceExpression: string;
  readonly requiredNeutralObservation: string;
  readonly traditionalBindingRequirement: string;
  readonly blockClass: TraditionalLiuzhuangOperationalizationBlockT5;
  readonly captureMode: TraditionalLiuzhuangCaptureModeT5;
  readonly failClosedWhen: readonly string[];
  readonly neutralObservationMayEmitTraditionalLabel: false;
  readonly concreteFormulaAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly executableCriterionStateAuthorized: false;
}

const t4ById = new Map(
  FACE_TRADITIONAL_T4_LIUZHUANG_DESCRIPTOR_UNITS.map((unit) => [
    unit.descriptorId,
    unit,
  ]),
);

const spec = (
  descriptorId: string,
  requiredNeutralObservation: string,
  traditionalBindingRequirement: string,
  blockClass: TraditionalLiuzhuangOperationalizationBlockT5,
  captureMode: TraditionalLiuzhuangCaptureModeT5,
  failClosedWhen: readonly string[],
): TraditionalLiuzhuangOperationalizationSpecT5 => {
  const unit = t4ById.get(descriptorId);
  if (!unit) {
    throw new Error(`Unknown 柳莊 T4 descriptor: ${descriptorId}`);
  }
  return {
    specId: `t5.op.${descriptorId}`,
    descriptorId,
    sourceExpression: unit.sourceExpression,
    requiredNeutralObservation,
    traditionalBindingRequirement,
    blockClass,
    captureMode,
    failClosedWhen,
    neutralObservationMayEmitTraditionalLabel: false,
    concreteFormulaAuthorized: false,
    thresholdAuthorized: false,
    executableCriterionStateAuthorized: false,
  };
};

export const FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS = [
  spec('t4.liuzhuang.listening.color_clear', 'capture-controlled visible ear appearance evidence', 'source-qualified binding from neutral ear appearance to 色明', 'capture_protocol_plus_binding', 'controlled_static', ['lighting/white-balance/exposure is uncontrolled', 'ear appearance region is not reliable']),
  spec('t4.liuzhuang.listening.high_over_brow', 'neutral ear and brow vertical reference candidates', 'methodology-specific definition of which ear/brow references instantiate 高聳過於眉', 'observation_contract_plus_binding', 'single_static_candidate', ['required ear or brow reference is unavailable', 'binding reference points are undefined']),
  spec('t4.liuzhuang.listening.contour_complete', 'visible ear contour/structure evidence', 'source-grounded definition of 輪/廓/完成', 'compound_construct_definition', 'not_yet_capture_operationalizable', ['輪/廓/完成 semantics are not versioned']),
  spec('t4.liuzhuang.listening.close_substantial', 'neutral ear attachment/projection/fullness candidates', 'source-grounded construct validity for 貼肉敦厚', 'compound_construct_definition', 'single_static_candidate', ['depth/projection evidence is insufficient', '貼肉/敦厚 binding is undefined']),
  spec('t4.liuzhuang.listening.mingmen_broad', 'neutral visible ear-region geometry', '柳莊-specific 命門 region identity plus 寬大 construct', 'semantic_region_definition', 'not_yet_capture_operationalizable', ['命門 region authority is absent', '寬大 threshold/construct is undefined']),

  spec('t4.liuzhuang.longevity.broad_clear_long', 'neutral brow extent/density/visibility candidates', 'source-grounded compound binding for 寬廣清長', 'compound_construct_definition', 'single_static_candidate', ['compound semantics are not decomposed with authority']),
  spec('t4.liuzhuang.longevity.into_temples', 'bilateral brow-tail and temporal-hair relation candidates', '柳莊-specific 鬢 region identity and 入 relation', 'semantic_region_definition', 'single_static_candidate', ['鬢 boundary is undefined', 'hair/temple visibility is insufficient']),
  spec('t4.liuzhuang.longevity.xuanxi_new_moon', 'neutral brow shape evidence retained without traditional label', 'source-grounded comparanda for 玄犀/新月', 'source_grounded_figurative_definition', 'not_yet_capture_operationalizable', ['figurative comparanda are not versioned']),
  spec('t4.liuzhuang.longevity.ends_full', 'neutral medial/lateral brow fullness candidates', 'source-grounded 首/尾 and 豐盈 construct binding', 'observation_contract_plus_binding', 'single_static_candidate', ['brow end roles or fullness construct are undefined']),
  spec('t4.liuzhuang.longevity.high_forehead_center', 'neutral brow/forehead spatial relation candidates', '柳莊-specific 額中 region and 高居 relation', 'semantic_region_definition', 'single_static_candidate', ['額中 authority is absent']),

  spec('t4.liuzhuang.inspection.concealed', 'controlled eye exposure evidence', 'source-grounded 含藏不露 binding', 'capture_protocol_plus_binding', 'controlled_static', ['gaze/expression is uncontrolled', 'exposure construct binding is absent']),
  spec('t4.liuzhuang.inspection.black_white_distinct', 'capture-controlled eye-region contrast/appearance evidence', 'source-grounded 黑白分明 binding without medical or demographic inference', 'capture_protocol_plus_binding', 'controlled_static', ['illumination/exposure/white-balance is uncontrolled']),
  spec('t4.liuzhuang.inspection.pupil_upright', 'controlled visible iris/pupil alignment candidates', 'source-grounded 瞳子端正 binding', 'capture_protocol_plus_binding', 'controlled_static', ['gaze is uncontrolled', 'pupil/iris evidence is unreliable']),
  spec('t4.liuzhuang.inspection.lustre', 'capture-controlled eye highlight/appearance evidence', 'source-grounded 光彩 construct distinct from camera specular highlight', 'capture_protocol_plus_binding', 'controlled_static', ['lighting creates uncontrolled highlights', '光彩 binding is absent']),
  spec('t4.liuzhuang.inspection.phoenix_long_hidden', 'neutral eye shape/exposure evidence retained without 鳳目 label', 'source-grounded 鳳目細長藏秀 figurative/compound definition', 'source_grounded_figurative_definition', 'not_yet_capture_operationalizable', ['鳳目 comparanda and 藏秀 semantics are not versioned']),

  spec('t4.liuzhuang.discernment.bridge_straight', 'neutral nasal axis/bridge geometry candidate', '柳莊-specific 樑柱明直 binding', 'observation_contract_plus_binding', 'single_static_candidate', ['traditional 樑柱 identity or 明直 construct is undefined']),
  spec('t4.liuzhuang.discernment.root_to_yintang', 'neutral glabella/nasal-root relation plus controlled local appearance', '柳莊-specific 山根 and 印堂 identities plus 明潤 relation semantics', 'semantic_region_definition', 'controlled_static', ['山根/印堂 authority is absent', 'appearance capture is uncontrolled']),
  spec('t4.liuzhuang.discernment.nianshou_high', 'neutral nasal profile/region geometry candidate', '柳莊-specific 年壽 identity plus 高隆 construct', 'semantic_region_definition', 'single_static_candidate', ['年壽 region authority is absent', '2D evidence cannot establish 3D prominence']),
  spec('t4.liuzhuang.discernment.no_joint', 'neutral nasal profile irregularity candidate', 'source-grounded 起節 construct and negative-criterion semantics', 'observation_contract_plus_binding', 'single_static_candidate', ['起節 binding is undefined', 'negative veto semantics are unauthorized']),
  spec('t4.liuzhuang.discernment.tip_store_rise', 'neutral nose-tip/alar/base geometry candidates', '柳莊-specific 準頭/庫 identities plus 起 construct', 'semantic_region_definition', 'single_static_candidate', ['準頭/庫 authority is absent', 'prominence evidence is insufficient']),
  spec('t4.liuzhuang.discernment.suspended_gall', 'neutral nose-shape evidence retained without 懸膽 label', 'source-grounded 懸膽 comparanda', 'source_grounded_figurative_definition', 'not_yet_capture_operationalizable', ['figurative comparanda are not versioned']),
  spec('t4.liuzhuang.discernment.cut_tube', 'neutral nose-shape evidence retained without 截筒 label', 'source-grounded 截筒 comparanda', 'source_grounded_figurative_definition', 'not_yet_capture_operationalizable', ['figurative comparanda are not versioned']),
  spec('t4.liuzhuang.discernment.yellow_clear_flesh', 'capture-controlled nose-region appearance evidence', 'source-grounded 黃明色肉 binding without sensitive-attribute inference', 'capture_protocol_plus_binding', 'controlled_static', ['lighting/white-balance/exposure is uncontrolled', 'traditional appearance construct is undefined']),

  spec('t4.liuzhuang.intake.corners_bow', 'neutral mouth-corner form evidence retained without 角弓 label', 'source-grounded 角弓 figurative definition', 'source_grounded_figurative_definition', 'not_yet_capture_operationalizable', ['角弓 comparanda are not versioned']),
  spec('t4.liuzhuang.intake.open_large_close_small', 'same-subject controlled open and closed mouth-state observations', 'source-grounded 開大合小 relation across controlled states', 'multi_state_protocol_plus_binding', 'controlled_multi_state', ['only one mouth state is available', 'pose/expression consistency fails']),
  spec('t4.liuzhuang.intake.lip_teeth_square_relation', 'neutral lip/teeth/form relation evidence', 'source-grounded 上下唇配齒配四方 compound binding', 'compound_construct_definition', 'not_yet_capture_operationalizable', ['配/四方 semantics are not versioned', 'teeth visibility is uncontrolled']),
] as const satisfies readonly TraditionalLiuzhuangOperationalizationSpecT5[];

export const FACE_TRADITIONAL_T5_LIUZHUANG_FORMATION_SPECS =
  Object.freeze([
    {
      officer: '採聽官',
      methodologyRef: FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.listening,
      executableAggregationAuthorized: false,
    },
    {
      officer: '保壽官',
      methodologyRef: FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.longevity,
      executableAggregationAuthorized: false,
    },
    {
      officer: '監察官',
      methodologyRef: FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.inspection,
      executableAggregationAuthorized: false,
    },
    {
      officer: '審辨官',
      methodologyRef: FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.discernment,
      executableAggregationAuthorized: false,
    },
    {
      officer: '出納官',
      methodologyRef: FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS.intake,
      executableAggregationAuthorized: false,
    },
  ] as const);

export const FACE_TRADITIONAL_T5_LIUZHUANG_SIX_FUS_BINDING_REQUIREMENTS =
  Object.freeze([
    {
      sourceLocationTerm: '天倉',
      traditionalLabel: '上二府',
      requiredNeutralObservation:
        'neutral upper-lateral facial/temporal region evidence',
      traditionalRegionBindingAuthorized: false as const,
    },
    {
      sourceLocationTerm: '顴骨',
      traditionalLabel: '中二府',
      requiredNeutralObservation:
        'neutral zygomatic/cheek-region evidence',
      traditionalRegionBindingAuthorized: false as const,
    },
    {
      sourceLocationTerm: '地庫',
      traditionalLabel: '下二府',
      requiredNeutralObservation:
        'neutral lower-face/jaw-region evidence',
      traditionalRegionBindingAuthorized: false as const,
    },
  ] as const);

export const FACE_TRADITIONAL_T5_LIUZHUANG_AUTHORITY_BOUNDARY =
  Object.freeze({
    predecessorAuthority:
      FACE_TRADITIONAL_T4_LIUZHUANG_AUTHORITY_BOUNDARY.methodologyLineage,
    t4DescriptorCount:
      FACE_TRADITIONAL_T4_LIUZHUANG_DESCRIPTOR_UNITS.length,
    operationalizationSpecCount:
      FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS.length,
    allT4DescriptorsCovered:
      FACE_TRADITIONAL_T4_LIUZHUANG_DESCRIPTOR_UNITS.length ===
      FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS.length,
    neutralObservationAssetsAutoAcquireTraditionalLabels: false as const,
    concreteCvFormulaAuthorized: false as const,
    traditionalMetricBindingAuthorized: false as const,
    numericThresholdAuthorized: false as const,
    booleanFormationEvaluatorAuthorized: false as const,
    automaticOfficerFormationStateAuthorized: false as const,
    historicalOutcomeClaimAuthorized: false as const,
    productionAuthorization: false as const,
    nextPhase:
      'T6_LIUZHUANG_1925_METHODOLOGY_PACK_CANDIDATE' as const,
  });
