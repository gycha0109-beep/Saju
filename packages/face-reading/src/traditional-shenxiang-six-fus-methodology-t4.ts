import type { FaceMethodologyDefinition } from './contracts.js';

export type TraditionalShenxiangSixFusMethodologyRefT4 =
  | 'method.shenxiang.six_fus.ten_observations.gujin_1725@0.1.0'
  | 'method.shenxiang.six_fus.volume_two_treatise.gujin_1725@0.1.0';

export interface TraditionalShenxiangSixFusPairStatementT4 {
  readonly statementId: string;
  readonly methodologyRef: TraditionalShenxiangSixFusMethodologyRefT4;
  readonly sourceRefs: readonly string[];
  readonly pairRole: 'upper' | 'middle' | 'lower';
  readonly traditionalLabel:
    | '天府'
    | '人府'
    | '地府'
    | '上二府'
    | '中二府'
    | '下二府';
  readonly sourceRegionTerms: readonly string[];
  readonly statementKind:
    | 'source_local_region_association'
    | 'paired_bone_identity'
    | 'traditional_span';
  readonly normalizedResearchMeaning: string;
  readonly regionIdentityWithOtherContextAuthorized: false;
  readonly modernAnatomicalNormalizationAuthorized: false;
  readonly machineRegionBindingAuthorized: false;
}

export interface TraditionalShenxiangSixFusFormationUnitT4 {
  readonly criterionId: string;
  readonly methodologyRef: TraditionalShenxiangSixFusMethodologyRefT4;
  readonly sourceRefs: readonly string[];
  readonly appliesTo:
    | '天府'
    | '人府'
    | '地府'
    | '六府_general';
  readonly sourceExpression: string;
  readonly polarity: 'formation_supporting' | 'formation_countervailing';
  readonly constructClass:
    | 'static_form'
    | 'spatial_relation'
    | 'surface_appearance'
    | 'compound_semantics_unresolved';
  readonly normalizedResearchMeaning: string;
  readonly requiredObservationCapabilities: readonly string[];
  readonly executableBooleanAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly automaticFormationStateAuthorized: false;
}

export interface TraditionalShenxiangSixFusObservationRequirementT4 {
  readonly requirementId: string;
  readonly methodologyRef: TraditionalShenxiangSixFusMethodologyRefT4;
  readonly traditionalExpression: string;
  readonly semanticRequirement: string;
  readonly implementationOwner:
    | 'face-observation-engine'
    | 'face-reading-binding';
  readonly implementationStatus: 'required_unbound';
  readonly directMetricSubstitutionAuthorized: false;
}

export const FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS =
  Object.freeze({
    tenObservations:
      'method.shenxiang.six_fus.ten_observations.gujin_1725@0.1.0' as const,
    volumeTwoTreatise:
      'method.shenxiang.six_fus.volume_two_treatise.gujin_1725@0.1.0' as const,
  });

export const FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHODOLOGIES = [
  {
    methodologyId:
      'method.shenxiang.six_fus.ten_observations.gujin_1725',
    version: '0.1.0',
    traditionalTerm: '六府 / 十觀六取五官六府',
    scope: 'static_face',
    sourceRefs: [
      'passage.shenxiang.gujin_631.six_fus.ten_observations',
    ],
    description:
      '古今圖書集成 1725 神相全編一 transmission의 十觀 문맥에서 天府/人府/地府를 source-local region vocabulary와 成/不成 descriptor로 재구성한다.',
    limitations: [
      '古今圖書集成 compilation transmission에 한정되며 original 神相全編 manuscript authority를 뜻하지 않는다.',
      '天府/人府/地府를 卷二의 上二府/中二府/下二府와 동일 region identity로 정규화하지 않는다.',
      '初年/中年 및 一府就掌十年 등 기간 문구를 age-map으로 실행하지 않는다.',
      '富盛/凶敗 등 전통 결과 문구를 claim으로 실행하지 않는다.',
      '현대 landmark, metric, threshold, Production authorization을 제공하지 않는다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId:
      'method.shenxiang.six_fus.volume_two_treatise.gujin_1725',
    version: '0.1.0',
    traditionalTerm: '六府論',
    scope: 'static_face',
    sourceRefs: [
      'passage.shenxiang.gujin_632.six_fus.treatise',
    ],
    description:
      '古今圖書集成 1725 神相全編二 transmission의 六府論에서 兩輔骨/兩顴骨/兩頤骨, 上二府/中二府/下二府 span, 充實相輔 계열 형성 의미를 별도 방법론으로 재구성한다.',
    limitations: [
      '古今圖書集成 compilation transmission에 한정되며 NLC-1925 exact-page promotion이 아니다.',
      '輔角/天倉/命門/虎耳/肩骨/地閣을 현대 얼굴 landmark로 임의 번역하지 않는다.',
      '卷首 十觀의 天府/人府/地府 mapping과 하나의 region map으로 합치지 않는다.',
      '財旺/財祿/萬頃田 등 전통 결과 문구를 claim으로 실행하지 않는다.',
      '현대 landmark, metric, threshold, Production authorization을 제공하지 않는다.',
    ],
    reviewStatus: 'research',
  },
] as const satisfies readonly FaceMethodologyDefinition[];

export const FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_PAIR_STATEMENTS = [
  {
    statementId: 't4.shenxiang.ten_observations.six_fus.upper',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    sourceRefs: ['passage.shenxiang.gujin_631.six_fus.ten_observations'],
    pairRole: 'upper',
    traditionalLabel: '天府',
    sourceRegionTerms: ['天庭', '日角', '月角'],
    statementKind: 'source_local_region_association',
    normalizedResearchMeaning:
      '十觀 문맥의 upper pair를 天府라 부르며 天庭/日角/月角 어휘로 위치를 표현한다.',
    regionIdentityWithOtherContextAuthorized: false,
    modernAnatomicalNormalizationAuthorized: false,
    machineRegionBindingAuthorized: false,
  },
  {
    statementId: 't4.shenxiang.ten_observations.six_fus.middle',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    sourceRefs: ['passage.shenxiang.gujin_631.six_fus.ten_observations'],
    pairRole: 'middle',
    traditionalLabel: '人府',
    sourceRegionTerms: ['兩顴'],
    statementKind: 'source_local_region_association',
    normalizedResearchMeaning:
      '十觀 문맥의 middle pair를 人府라 부르며 兩顴을 source-local 위치 어휘로 사용한다.',
    regionIdentityWithOtherContextAuthorized: false,
    modernAnatomicalNormalizationAuthorized: false,
    machineRegionBindingAuthorized: false,
  },
  {
    statementId: 't4.shenxiang.ten_observations.six_fus.lower',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    sourceRefs: ['passage.shenxiang.gujin_631.six_fus.ten_observations'],
    pairRole: 'lower',
    traditionalLabel: '地府',
    sourceRegionTerms: ['地角', '邊腮'],
    statementKind: 'source_local_region_association',
    normalizedResearchMeaning:
      '十觀 문맥의 lower pair를 地府라 부르며 地角/邊腮를 source-local 위치 어휘로 사용한다.',
    regionIdentityWithOtherContextAuthorized: false,
    modernAnatomicalNormalizationAuthorized: false,
    machineRegionBindingAuthorized: false,
  },
  {
    statementId: 't4.shenxiang.volume_two.six_fus.upper_identity',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    sourceRefs: ['passage.shenxiang.gujin_632.six_fus.treatise'],
    pairRole: 'upper',
    traditionalLabel: '上二府',
    sourceRegionTerms: ['兩輔骨'],
    statementKind: 'paired_bone_identity',
    normalizedResearchMeaning:
      '六府論은 upper pair를 兩輔骨 계열로 제시한다.',
    regionIdentityWithOtherContextAuthorized: false,
    modernAnatomicalNormalizationAuthorized: false,
    machineRegionBindingAuthorized: false,
  },
  {
    statementId: 't4.shenxiang.volume_two.six_fus.upper_span',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    sourceRefs: ['passage.shenxiang.gujin_632.six_fus.treatise'],
    pairRole: 'upper',
    traditionalLabel: '上二府',
    sourceRegionTerms: ['輔角', '天倉'],
    statementKind: 'traditional_span',
    normalizedResearchMeaning:
      '靈臺祕訣 인용문은 上二府를 輔角에서 天倉까지의 source-local span으로 표현한다.',
    regionIdentityWithOtherContextAuthorized: false,
    modernAnatomicalNormalizationAuthorized: false,
    machineRegionBindingAuthorized: false,
  },
  {
    statementId: 't4.shenxiang.volume_two.six_fus.middle_identity',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    sourceRefs: ['passage.shenxiang.gujin_632.six_fus.treatise'],
    pairRole: 'middle',
    traditionalLabel: '中二府',
    sourceRegionTerms: ['兩顴骨'],
    statementKind: 'paired_bone_identity',
    normalizedResearchMeaning:
      '六府論은 middle pair를 兩顴骨 계열로 제시한다.',
    regionIdentityWithOtherContextAuthorized: false,
    modernAnatomicalNormalizationAuthorized: false,
    machineRegionBindingAuthorized: false,
  },
  {
    statementId: 't4.shenxiang.volume_two.six_fus.middle_span',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    sourceRefs: ['passage.shenxiang.gujin_632.six_fus.treatise'],
    pairRole: 'middle',
    traditionalLabel: '中二府',
    sourceRegionTerms: ['命門', '虎耳'],
    statementKind: 'traditional_span',
    normalizedResearchMeaning:
      '靈臺祕訣 인용문은 中二府를 命門에서 虎耳까지의 source-local span으로 표현한다.',
    regionIdentityWithOtherContextAuthorized: false,
    modernAnatomicalNormalizationAuthorized: false,
    machineRegionBindingAuthorized: false,
  },
  {
    statementId: 't4.shenxiang.volume_two.six_fus.lower_identity',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    sourceRefs: ['passage.shenxiang.gujin_632.six_fus.treatise'],
    pairRole: 'lower',
    traditionalLabel: '下二府',
    sourceRegionTerms: ['兩頤骨'],
    statementKind: 'paired_bone_identity',
    normalizedResearchMeaning:
      '六府論은 lower pair를 兩頤骨 계열로 제시한다.',
    regionIdentityWithOtherContextAuthorized: false,
    modernAnatomicalNormalizationAuthorized: false,
    machineRegionBindingAuthorized: false,
  },
  {
    statementId: 't4.shenxiang.volume_two.six_fus.lower_span',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    sourceRefs: ['passage.shenxiang.gujin_632.six_fus.treatise'],
    pairRole: 'lower',
    traditionalLabel: '下二府',
    sourceRegionTerms: ['肩骨', '地閣'],
    statementKind: 'traditional_span',
    normalizedResearchMeaning:
      '靈臺祕訣 인용문은 下二府를 肩骨에서 地閣까지의 source-local span으로 표현한다.',
    regionIdentityWithOtherContextAuthorized: false,
    modernAnatomicalNormalizationAuthorized: false,
    machineRegionBindingAuthorized: false,
  },
] as const satisfies readonly TraditionalShenxiangSixFusPairStatementT4[];

export const FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_FORMATION_UNITS = [
  {
    criterionId: 't4.six_fus.ten_observations.tianfu.support',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    sourceRefs: ['passage.shenxiang.gujin_631.six_fus.ten_observations'],
    appliesTo: '天府',
    sourceExpression: '方員明淨，不宜露骨',
    polarity: 'formation_supporting',
    constructClass: 'compound_semantics_unresolved',
    normalizedResearchMeaning:
      '天府成에 연결되는 형태/표면/노출성 복합 descriptor를 원문 결합 상태로 보존한다.',
    requiredObservationCapabilities: [
      'governed_tianfu_region_identity',
      'governed_form_and_surface_descriptor_research',
    ],
    executableBooleanAuthorized: false,
    thresholdAuthorized: false,
    automaticFormationStateAuthorized: false,
  },
  {
    criterionId: 't4.six_fus.ten_observations.tianfu.counter',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    sourceRefs: ['passage.shenxiang.gujin_631.six_fus.ten_observations'],
    appliesTo: '天府',
    sourceExpression: '欹削低塌、偏尖',
    polarity: 'formation_countervailing',
    constructClass: 'compound_semantics_unresolved',
    normalizedResearchMeaning:
      '天府不成에 연결되는 source-local counter-descriptor 집합.',
    requiredObservationCapabilities: ['governed_tianfu_region_identity'],
    executableBooleanAuthorized: false,
    thresholdAuthorized: false,
    automaticFormationStateAuthorized: false,
  },
  {
    criterionId: 't4.six_fus.ten_observations.renfu.support',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    sourceRefs: ['passage.shenxiang.gujin_631.six_fus.ten_observations'],
    appliesTo: '人府',
    sourceExpression: '方正插鬢，不粗不露，齊揖方拱',
    polarity: 'formation_supporting',
    constructClass: 'compound_semantics_unresolved',
    normalizedResearchMeaning:
      '人府成에 연결되는 형태/위치/노출성 복합 descriptor 집합.',
    requiredObservationCapabilities: [
      'governed_renfu_region_identity',
      'governed_cheekbone_to_temporal_relation_candidate',
    ],
    executableBooleanAuthorized: false,
    thresholdAuthorized: false,
    automaticFormationStateAuthorized: false,
  },
  {
    criterionId: 't4.six_fus.ten_observations.renfu.counter',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    sourceRefs: ['passage.shenxiang.gujin_631.six_fus.ten_observations'],
    appliesTo: '人府',
    sourceExpression: '粗露高低，尖員綳鼓',
    polarity: 'formation_countervailing',
    constructClass: 'compound_semantics_unresolved',
    normalizedResearchMeaning:
      '人府不成에 연결되는 source-local counter-descriptor 집합.',
    requiredObservationCapabilities: ['governed_renfu_region_identity'],
    executableBooleanAuthorized: false,
    thresholdAuthorized: false,
    automaticFormationStateAuthorized: false,
  },
  {
    criterionId: 't4.six_fus.ten_observations.difu.support',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    sourceRefs: ['passage.shenxiang.gujin_631.six_fus.ten_observations'],
    appliesTo: '地府',
    sourceExpression: '喜輔，地閣懸壁，不昏不慘，不尖不歪，不粗不大',
    polarity: 'formation_supporting',
    constructClass: 'compound_semantics_unresolved',
    normalizedResearchMeaning:
      '地府成에 연결되는 source-local lower-face 복합 descriptor를 원문 결합 상태로 보존한다.',
    requiredObservationCapabilities: [
      'governed_difu_region_identity',
      'governed_dige_relation_candidate',
    ],
    executableBooleanAuthorized: false,
    thresholdAuthorized: false,
    automaticFormationStateAuthorized: false,
  },
  {
    criterionId: 't4.six_fus.ten_observations.difu.counter',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    sourceRefs: ['passage.shenxiang.gujin_631.six_fus.ten_observations'],
    appliesTo: '地府',
    sourceExpression: '高低粗露尖削，耳後見重腮',
    polarity: 'formation_countervailing',
    constructClass: 'compound_semantics_unresolved',
    normalizedResearchMeaning:
      '地府不成에 연결되는 source-local counter-descriptor 집합.',
    requiredObservationCapabilities: [
      'governed_difu_region_identity',
      'governed_posterior_jaw_visibility_candidate',
    ],
    executableBooleanAuthorized: false,
    thresholdAuthorized: false,
    automaticFormationStateAuthorized: false,
  },
  {
    criterionId: 't4.six_fus.volume_two.general.support',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    sourceRefs: ['passage.shenxiang.gujin_632.six_fus.treatise'],
    appliesTo: '六府_general',
    sourceExpression: '充實相輔',
    polarity: 'formation_supporting',
    constructClass: 'compound_semantics_unresolved',
    normalizedResearchMeaning:
      '六府 전체가 充實하고 서로 相輔해야 한다는 source-local aggregate formation semantics.',
    requiredObservationCapabilities: [
      'governed_context_b_six_fus_pair_regions',
      'source_grounded_fullness_and_mutual_support_construct_research',
    ],
    executableBooleanAuthorized: false,
    thresholdAuthorized: false,
    automaticFormationStateAuthorized: false,
  },
  {
    criterionId: 't4.six_fus.volume_two.general.counter',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    sourceRefs: ['passage.shenxiang.gujin_632.six_fus.treatise'],
    appliesTo: '六府_general',
    sourceExpression: '不欲支離孤露',
    polarity: 'formation_countervailing',
    constructClass: 'compound_semantics_unresolved',
    normalizedResearchMeaning:
      '支離/孤露를 六府 전체의 countervailing semantics로 보존한다.',
    requiredObservationCapabilities: ['governed_context_b_six_fus_pair_regions'],
    executableBooleanAuthorized: false,
    thresholdAuthorized: false,
    automaticFormationStateAuthorized: false,
  },
  {
    criterionId: 't4.six_fus.volume_two.general.complete',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    sourceRefs: ['passage.shenxiang.gujin_632.six_fus.treatise'],
    appliesTo: '六府_general',
    sourceExpression: '六府充直，無缺陷瘢痕',
    polarity: 'formation_supporting',
    constructClass: 'compound_semantics_unresolved',
    normalizedResearchMeaning:
      '充直 및 無缺陷瘢痕을 source-local formation wording으로 보존한다.',
    requiredObservationCapabilities: [
      'governed_context_b_six_fus_pair_regions',
      'source_grounded_surface_and_form_descriptor_research',
    ],
    executableBooleanAuthorized: false,
    thresholdAuthorized: false,
    automaticFormationStateAuthorized: false,
  },
] as const satisfies readonly TraditionalShenxiangSixFusFormationUnitT4[];

export const FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_OBSERVATION_REQUIREMENTS = [
  {
    requirementId: 't4.req.six_fus.ten_observations.region_identity',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    traditionalExpression: '天庭日月二角 / 兩顴 / 地角邊腮',
    semanticRequirement:
      '十觀 문맥의 세 source-local pair region을 다른 六府 문맥과 섞지 않고 식별할 수 있어야 한다.',
    implementationOwner: 'face-reading-binding',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.six_fus.ten_observations.neutral_observation',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
    traditionalExpression: '方員明淨 / 露骨 / 方正插鬢 / 齊揖方拱 / 地閣懸壁',
    semanticRequirement:
      'source descriptor와 대응 가능한 중립 형태·표면·공간관계 관찰 capability가 먼저 정의되어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.six_fus.volume_two.region_identity',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    traditionalExpression: '兩輔骨 / 兩顴骨 / 兩頤骨',
    semanticRequirement:
      '六府論의 paired-bone identity를 source-local 의미로 식별하고 卷首 region map과 자동 동일시하지 않아야 한다.',
    implementationOwner: 'face-reading-binding',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.six_fus.volume_two.spans',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    traditionalExpression: '輔角至天倉 / 命門至虎耳 / 肩骨至地閣',
    semanticRequirement:
      '세 traditional span의 endpoint 의미가 먼저 source-grounded binding으로 정의되어야 한다.',
    implementationOwner: 'face-reading-binding',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
  {
    requirementId: 't4.req.six_fus.volume_two.neutral_observation',
    methodologyRef:
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    traditionalExpression: '充實相輔 / 支離孤露 / 充直',
    semanticRequirement:
      '복합 전통 descriptor를 단일 geometry metric으로 축약하지 않는 관찰/구성 연구가 필요하다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
    directMetricSubstitutionAuthorized: false,
  },
] as const satisfies readonly TraditionalShenxiangSixFusObservationRequirementT4[];

export const FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_CONTEXT_RELATION =
  Object.freeze({
    sameWorkTitle: true as const,
    sameCompilationWitness: true as const,
    sameTraditionalTermFamily: true as const,
    exactRegionIdentityEstablished: false as const,
    exactSemanticEquivalenceEstablished: false as const,
    oneUniversalMethodologyAuthorized: false as const,
    oneUniversalRegionMapAuthorized: false as const,
    crossContextMetricReuseAuthorized: false as const,
    contextSpecificMethodologyRequired: true as const,
  });

export const FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_BLOCKED_OUTCOME_SEMANTICS =
  Object.freeze({
    tenObservationsHistoricalExpressions: [
      '主初年運蹇',
      '主中年運否',
      '一府就掌十年之富盛',
      '相反者主十年之凶敗',
    ] as const,
    volumeTwoHistoricalExpressions: [
      '主財旺',
      '天倉峻起多財祿',
      '地閣方停萬頃田',
    ] as const,
    universalAgeMapAuthorized: false as const,
    wealthOrFateClaimAuthorized: false as const,
    claimTemplateAuthorized: false as const,
    productionNarrativeAuthorized: false as const,
  });

export const FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_HANDOFF =
  Object.freeze({
    phase: 'T4_METHOD_RECONSTRUCTION' as const,
    nextPhase: 'T5_OPERATIONALIZATION_SPECIFICATION' as const,
    reconstructedMethodologyRefs: Object.values(
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS,
    ),
    sourceAuthority:
      'gujin_1725_scan_checked_compilation_transmission' as const,
    nlc1925ExactPagePromotionAuthorized: false as const,
    regionMapAuthorized: false as const,
    numericThresholdAuthorized: false as const,
    comparisonPolicyAuthorized: false as const,
    ruleEmissionAuthorized: false as const,
    claimEmissionAuthorized: false as const,
    productionAuthorization: false as const,
    nextRequirements: [
      'Keep the two 六府 contexts as separate methodology identities in T5.',
      'Specify abstract observation requirements without choosing RGB landmarks or pixel formulas.',
      'Do not turn 成/不成 descriptor lists into executable Boolean logic without independent methodological justification.',
      'Preserve all traditional endpoint and region terms as unbound until face-reading-binding supplies source-governed mappings.',
      'Keep historical age/wealth/fate language non-executable.',
    ] as const,
  });
