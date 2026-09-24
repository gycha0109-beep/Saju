import type { TraditionalObservationSemanticRefT4 } from './traditional-three-divisions-methodology-t4.js';
import { FACE_TRADITIONAL_T4_METHOD_REFS } from './traditional-three-divisions-methodology-t4.js';

export interface TraditionalSpanMeasurementSpecificationT5 {
  readonly specificationId: string;
  readonly methodologyRef: string;
  readonly sourceRefs: readonly string[];
  readonly traditionalDivision: string;
  readonly fromObservationRef: TraditionalObservationSemanticRefT4;
  readonly toObservationRef: TraditionalObservationSemanticRefT4;
  readonly topology: 'contiguous_chain_member' | 'noncontiguous_span';
  readonly measurementIntent: 'comparable_vertical_extent';
  readonly coordinateOrFormulaAuthorized: false;
  readonly executableMetricStatus: 'blocked_pending_binding';
  readonly limitations: readonly string[];
}

export interface TraditionalComparisonSpecificationT5 {
  readonly specificationId: string;
  readonly methodologyRef: string;
  readonly sourceRefs: readonly string[];
  readonly traditionalTerm: string;
  readonly comparisonKind:
    | 'qualitative_balance_relation'
    | 'measurement_only_no_classification';
  readonly inputSpanSpecificationRefs: readonly string[];
  readonly numericToleranceAuthorized: false;
  readonly nearEqualBandAuthorized: false;
  readonly executableClassificationStatus: 'blocked_pending_binding_and_calibration';
  readonly limitations: readonly string[];
}

export interface TraditionalBindingPrerequisiteT5 {
  readonly prerequisiteId: string;
  readonly observationRef: TraditionalObservationSemanticRefT4;
  readonly traditionalLabel: string;
  readonly requiredCapability: 'governed_vertical_reference';
  readonly prohibitedProxyClasses: readonly string[];
  readonly owner: 'face-observation-engine';
  readonly bindingOwner: 'face-reading-binding';
  readonly status: 'blocked';
}

export const FACE_TRADITIONAL_T5_SPAN_SPECS = [
  {
    specificationId: 't5.span.mayi_santing.upper',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    sourceRefs: ['passage.mayi.fr261.contiguous_three_divisions'],
    traditionalDivision: '上停',
    fromObservationRef: 'trad.anchor.hairline',
    toObservationRef: 'trad.anchor.brow',
    topology: 'contiguous_chain_member',
    measurementIntent: 'comparable_vertical_extent',
    coordinateOrFormulaAuthorized: false,
    executableMetricStatus: 'blocked_pending_binding',
    limitations: [
      'T5는 髮際와 眉의 vertical reference 구현을 선택하지 않는다.',
      'normalized-face 좌표계나 pixel distance를 source meaning으로 간주하지 않는다.',
    ],
  },
  {
    specificationId: 't5.span.mayi_santing.middle',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    sourceRefs: ['passage.mayi.fr261.contiguous_three_divisions'],
    traditionalDivision: '中停',
    fromObservationRef: 'trad.anchor.brow',
    toObservationRef: 'trad.anchor.zhuntou',
    topology: 'contiguous_chain_member',
    measurementIntent: 'comparable_vertical_extent',
    coordinateOrFormulaAuthorized: false,
    executableMetricStatus: 'blocked_pending_binding',
    limitations: [
      'T5는 眉와 準頭의 vertical reference 구현을 선택하지 않는다.',
      'shape metric을 boundary coordinate의 proxy로 승격하지 않는다.',
    ],
  },
  {
    specificationId: 't5.span.mayi_santing.lower',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    sourceRefs: ['passage.mayi.fr261.contiguous_three_divisions'],
    traditionalDivision: '下停',
    fromObservationRef: 'trad.anchor.zhuntou',
    toObservationRef: 'trad.anchor.dige',
    topology: 'contiguous_chain_member',
    measurementIntent: 'comparable_vertical_extent',
    coordinateOrFormulaAuthorized: false,
    executableMetricStatus: 'blocked_pending_binding',
    limitations: [
      'T5는 準頭와 地閣의 vertical reference 구현을 선택하지 않는다.',
      'visible lower-face contour를 자동으로 地閣과 동일시하지 않는다.',
    ],
  },
  {
    specificationId: 't5.span.mayi_sanfu.upper',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    sourceRefs: ['passage.mayi.fr261.three_fus_three_governors'],
    traditionalDivision: '上府 / 初主',
    fromObservationRef: 'trad.anchor.hairline',
    toObservationRef: 'trad.anchor.yintang',
    topology: 'noncontiguous_span',
    measurementIntent: 'comparable_vertical_extent',
    coordinateOrFormulaAuthorized: false,
    executableMetricStatus: 'blocked_pending_binding',
    limitations: [
      '이 span을 麻衣 上停 metric으로 재사용하지 않는다.',
      '初主를 수치 연령구간으로 변환하지 않는다.',
    ],
  },
  {
    specificationId: 't5.span.mayi_sanfu.middle',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    sourceRefs: ['passage.mayi.fr261.three_fus_three_governors'],
    traditionalDivision: '中府 / 中主',
    fromObservationRef: 'trad.anchor.shangen',
    toObservationRef: 'trad.anchor.zhuntou',
    topology: 'noncontiguous_span',
    measurementIntent: 'comparable_vertical_extent',
    coordinateOrFormulaAuthorized: false,
    executableMetricStatus: 'blocked_pending_binding',
    limitations: [
      '이 span을 麻衣 中停 metric으로 재사용하지 않는다.',
      '中主를 수치 연령구간으로 변환하지 않는다.',
    ],
  },
  {
    specificationId: 't5.span.mayi_sanfu.lower',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    sourceRefs: ['passage.mayi.fr261.three_fus_three_governors'],
    traditionalDivision: '下府 / 末主',
    fromObservationRef: 'trad.anchor.renzhong',
    toObservationRef: 'trad.anchor.dige',
    topology: 'noncontiguous_span',
    measurementIntent: 'comparable_vertical_extent',
    coordinateOrFormulaAuthorized: false,
    executableMetricStatus: 'blocked_pending_binding',
    limitations: [
      '이 span을 麻衣 下停 metric으로 재사용하지 않는다.',
      '末主를 수치 연령구간으로 변환하지 않는다.',
    ],
  },
  {
    specificationId: 't5.span.shenyi_gujin_santing.upper',
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    sourceRefs: ['passage.shenyi_fu.gujin_636.noncontiguous_three_divisions'],
    traditionalDivision: '上停',
    fromObservationRef: 'trad.anchor.hairline',
    toObservationRef: 'trad.anchor.yintang',
    topology: 'noncontiguous_span',
    measurementIntent: 'comparable_vertical_extent',
    coordinateOrFormulaAuthorized: false,
    executableMetricStatus: 'blocked_pending_binding',
    limitations: [
      'Gujin transmission-qualified span이다.',
      '동일 geometry의 麻衣 上府와 metric identity를 공유하지 않는다.',
    ],
  },
  {
    specificationId: 't5.span.shenyi_gujin_santing.middle',
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    sourceRefs: ['passage.shenyi_fu.gujin_636.noncontiguous_three_divisions'],
    traditionalDivision: '中停',
    fromObservationRef: 'trad.anchor.shangen',
    toObservationRef: 'trad.anchor.zhuntou',
    topology: 'noncontiguous_span',
    measurementIntent: 'comparable_vertical_extent',
    coordinateOrFormulaAuthorized: false,
    executableMetricStatus: 'blocked_pending_binding',
    limitations: [
      'Gujin transmission-qualified span이다.',
      '동일 geometry의 麻衣 中府와 metric identity를 공유하지 않는다.',
    ],
  },
  {
    specificationId: 't5.span.shenyi_gujin_santing.lower',
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    sourceRefs: ['passage.shenyi_fu.gujin_636.noncontiguous_three_divisions'],
    traditionalDivision: '下停',
    fromObservationRef: 'trad.anchor.renzhong',
    toObservationRef: 'trad.anchor.dige',
    topology: 'noncontiguous_span',
    measurementIntent: 'comparable_vertical_extent',
    coordinateOrFormulaAuthorized: false,
    executableMetricStatus: 'blocked_pending_binding',
    limitations: [
      'Gujin transmission-qualified span이다.',
      '동일 geometry의 麻衣 下府와 metric identity를 공유하지 않는다.',
    ],
  },
] as const satisfies readonly TraditionalSpanMeasurementSpecificationT5[];

export const FACE_TRADITIONAL_T5_COMPARISON_SPECS = [
  {
    specificationId: 't5.compare.mayi_santing.measurement_only',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    sourceRefs: ['passage.mayi.fr261.contiguous_three_divisions'],
    traditionalTerm: '三停',
    comparisonKind: 'measurement_only_no_classification',
    inputSpanSpecificationRefs: [
      't5.span.mayi_santing.upper',
      't5.span.mayi_santing.middle',
      't5.span.mayi_santing.lower',
    ],
    numericToleranceAuthorized: false,
    nearEqualBandAuthorized: false,
    executableClassificationStatus: 'blocked_pending_binding_and_calibration',
    limitations: [
      '이 T5 slice의 admitted successor passage는 boundary를 확정하지만 수치 비교 band를 제공하지 않는다.',
      '기존 historical research-pack의 relative-order 구현을 successor authority로 자동 승계하지 않는다.',
    ],
  },
  {
    specificationId: 't5.compare.mayi_sanfu.measurement_only',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    sourceRefs: ['passage.mayi.fr261.three_fus_three_governors'],
    traditionalTerm: '三府 / 三主',
    comparisonKind: 'measurement_only_no_classification',
    inputSpanSpecificationRefs: [
      't5.span.mayi_sanfu.upper',
      't5.span.mayi_sanfu.middle',
      't5.span.mayi_sanfu.lower',
    ],
    numericToleranceAuthorized: false,
    nearEqualBandAuthorized: false,
    executableClassificationStatus: 'blocked_pending_binding_and_calibration',
    limitations: [
      'FR261 successor passage는 三府/三主의 span과 role을 확정하지만 span 간 수치 비교 규칙을 제공하지 않는다.',
      '初主/中主/末主는 comparison class가 아니다.',
    ],
  },
  {
    specificationId: 't5.compare.shenyi_gujin_santing.balance',
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    sourceRefs: ['passage.shenyi_fu.gujin_636.noncontiguous_three_divisions'],
    traditionalTerm: '三停平等',
    comparisonKind: 'qualitative_balance_relation',
    inputSpanSpecificationRefs: [
      't5.span.shenyi_gujin_santing.upper',
      't5.span.shenyi_gujin_santing.middle',
      't5.span.shenyi_gujin_santing.lower',
    ],
    numericToleranceAuthorized: false,
    nearEqualBandAuthorized: false,
    executableClassificationStatus: 'blocked_pending_binding_and_calibration',
    limitations: [
      '平等이 평가 관계라는 점만 source-authorized이다.',
      'exact equality, percentage tolerance, near-equal band를 원문에서 추론하지 않는다.',
      '一生衣祿無虧를 Production claim으로 연결하지 않는다.',
    ],
  },
] as const satisfies readonly TraditionalComparisonSpecificationT5[];

export const FACE_TRADITIONAL_T5_BINDING_PREREQUISITES = [
  {
    prerequisiteId: 't5.binding.hairline',
    observationRef: 'trad.anchor.hairline',
    traditionalLabel: '髮際',
    requiredCapability: 'governed_vertical_reference',
    prohibitedProxyClasses: ['generic_forehead_height', 'unreviewed_visible_boundary'],
    owner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
  },
  {
    prerequisiteId: 't5.binding.brow',
    observationRef: 'trad.anchor.brow',
    traditionalLabel: '眉',
    requiredCapability: 'governed_vertical_reference',
    prohibitedProxyClasses: ['eyebrow_shape_metric', 'arch_or_tail_orientation'],
    owner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
  },
  {
    prerequisiteId: 't5.binding.yintang',
    observationRef: 'trad.anchor.yintang',
    traditionalLabel: '印堂',
    requiredCapability: 'governed_vertical_reference',
    prohibitedProxyClasses: ['generic_interbrow_midpoint_without_authority'],
    owner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
  },
  {
    prerequisiteId: 't5.binding.shangen',
    observationRef: 'trad.anchor.shangen',
    traditionalLabel: '山根',
    requiredCapability: 'governed_vertical_reference',
    prohibitedProxyClasses: ['nose_bridge_shape_metric', 'bridge_centerline_deviation'],
    owner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
  },
  {
    prerequisiteId: 't5.binding.zhuntou',
    observationRef: 'trad.anchor.zhuntou',
    traditionalLabel: '準頭',
    requiredCapability: 'governed_vertical_reference',
    prohibitedProxyClasses: ['nose_tip_shape_metric', 'tip_contour_circularity'],
    owner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
  },
  {
    prerequisiteId: 't5.binding.renzhong',
    observationRef: 'trad.anchor.renzhong',
    traditionalLabel: '人中',
    requiredCapability: 'governed_vertical_reference',
    prohibitedProxyClasses: ['philtrum_length_width_metric'],
    owner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
  },
  {
    prerequisiteId: 't5.binding.dige',
    observationRef: 'trad.anchor.dige',
    traditionalLabel: '地閣',
    requiredCapability: 'governed_vertical_reference',
    prohibitedProxyClasses: ['generic_chin_bottom', 'visible_lower_face_contour_without_authority'],
    owner: 'face-observation-engine',
    bindingOwner: 'face-reading-binding',
    status: 'blocked',
  },
] as const satisfies readonly TraditionalBindingPrerequisiteT5[];

export const FACE_TRADITIONAL_T5_AUTHORIZATION = Object.freeze({
  phase: 'T5_OPERATIONALIZATION_SPECIFICATION' as const,
  methodologySideSpanSpecificationComplete: true as const,
  concreteCoordinateFrameAuthorized: false as const,
  executableMetricFormulaAuthorized: false as const,
  numericBalanceToleranceAuthorized: false as const,
  nearEqualBandAuthorized: false as const,
  universalAgeMapAuthorized: false as const,
  crossLineageMetricIdentityAuthorized: false as const,
  faceClaimEmissionAuthorized: false as const,
  productionAuthorization: false as const,
});

export const FACE_TRADITIONAL_T5_T6_HANDOFF = Object.freeze({
  nextPhase: 'T6_METHODOLOGY_PACK_CANDIDATE' as const,
  candidateMethodologyRefs: [
    FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
  ] as const,
  packCandidateMayInclude: [
    'pinned T3 sourceRefs',
    'T4 source-qualified methodology identities',
    'T5 abstract span specifications',
    'T5 binding prerequisites',
    'explicit authority and production gates',
  ] as const,
  packCandidateMustNotClaim: [
    'executable RGB binding',
    'numeric 平等 threshold',
    'universal age mapping',
    'cross-lineage semantic identity',
    'Production readiness',
  ] as const,
  remainingExternalDependencies: [
    'face-observation-engine governed vertical references',
    'face-reading-binding explicit observation-to-methodology bindings',
    'primary/earlier Shenyi Fu target passage pinning if stronger lineage authority is desired',
  ] as const,
});
