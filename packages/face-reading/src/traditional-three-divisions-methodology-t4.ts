import type { FaceMethodologyDefinition } from './contracts.js';

export type TraditionalObservationSemanticRefT4 =
  | 'trad.anchor.hairline'
  | 'trad.anchor.brow'
  | 'trad.anchor.yintang'
  | 'trad.anchor.shangen'
  | 'trad.anchor.zhuntou'
  | 'trad.anchor.renzhong'
  | 'trad.anchor.dige';

export interface TraditionalMethodologyStatementT4 {
  readonly statementId: string;
  readonly methodologyRef: string;
  readonly sourceRefs: readonly string[];
  readonly statementKind:
    | 'division_boundary'
    | 'division_role'
    | 'qualitative_balance'
    | 'semantic_separation';
  readonly traditionalTerm: string;
  readonly normalizedMeaning: string;
  readonly requiredTraditionalObservationRefs: readonly TraditionalObservationSemanticRefT4[];
  readonly limitations: readonly string[];
  readonly reconstructionStatus: 'reconstructed' | 'blocked';
}

export interface TraditionalObservationRequirementT4 {
  readonly methodologyRef: string;
  readonly requirementId: string;
  readonly traditionalObservationRef: TraditionalObservationSemanticRefT4;
  readonly traditionalLabel: string;
  readonly semanticRequirement: string;
  readonly implementationOwner: 'face-observation-engine';
  readonly implementationStatus: 'required_unbound';
}

export const FACE_TRADITIONAL_T4_METHOD_REFS = Object.freeze({
  mayiContiguousThreeDivisions:
    'method.mayi.face_three_divisions.fr261@0.2.0' as const,
  mayiThreeFusThreeGovernors:
    'method.mayi.three_fus_three_governors.fr261@0.1.0' as const,
  shenyiFuGujinNoncontiguousThreeDivisions:
    'method.shenyi_fu.gujin_636.face_three_divisions@0.1.0' as const,
});

export const FACE_TRADITIONAL_T4_METHODOLOGIES = [
  {
    methodologyId: 'method.mayi.face_three_divisions.fr261',
    version: '0.2.0',
    traditionalTerm: '三停',
    scope: 'static_face',
    sourceRefs: ['passage.mayi.fr261.contiguous_three_divisions'],
    description:
      '麻衣相法 1925 NLC witness의 FR261 successor 판독에 따라 上停=髮際→眉, 中停=眉→準頭, 下停=準頭→地閣의 연속 삼정 체계를 보존한다.',
    limitations: [
      '기존 method.mayi.face_three_divisions@0.1.0의 거친 source passage를 역사 기록으로 유지하고 이 정의가 successor authority 역할을 한다.',
      '平等/相稱의 수치 허용오차를 정의하지 않는다.',
      'RGB 좌표, landmark, pixel, angle, camera calibration을 정의하지 않는다.',
      '연령/운세/성격 결과를 이 methodology 자체에서 활성화하지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId: 'method.mayi.three_fus_three_governors.fr261',
    version: '0.1.0',
    traditionalTerm: '三府 / 三主',
    scope: 'static_face',
    sourceRefs: ['passage.mayi.fr261.three_fus_three_governors'],
    description:
      '같은 麻衣 1925 문맥의 上府/中府/下府와 初主/中主/末主를 三停과 분리된 관련 체계로 보존한다.',
    limitations: [
      '三府의 세 span은 麻衣 三停 boundary로 재명명하지 않는다.',
      '初主/中主/末主를 보편 연령구간으로 수치화하지 않는다.',
      '三才 또는 三表와의 전역 alias를 만들지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
  {
    methodologyId: 'method.shenyi_fu.gujin_636.face_three_divisions',
    version: '0.1.0',
    traditionalTerm: '面上三停',
    scope: 'static_face',
    sourceRefs: ['passage.shenyi_fu.gujin_636.noncontiguous_three_divisions'],
    description:
      '古今圖書集成 第636卷의 神異賦 transmission에서 上停=髮際→印堂, 中停=山根→準頭, 下停=人中→地閣으로 제시된 비연속 삼정 체계를 transmission-qualified methodology로 보존한다.',
    limitations: [
      '古今圖書集成 transmission의 scan-checked 증거이며 神異賦 원본/초기 독립 witness authority를 확립하지 않는다.',
      'Harvard 萬曆 witness의 target passage가 아직 pin되지 않았다.',
      '麻衣 三府와 geometry가 같아도 semantic identity를 선언하지 않는다.',
      '平等은 질적 표현으로만 보존하며 numeric tolerance를 만들지 않는다.',
      'Production authorization이 아니다.',
    ],
    reviewStatus: 'research',
  },
] as const satisfies readonly FaceMethodologyDefinition[];

export const FACE_TRADITIONAL_T4_STATEMENTS = [
  {
    statementId: 't4.mayi.santing.upper',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    sourceRefs: ['passage.mayi.fr261.contiguous_three_divisions'],
    statementKind: 'division_boundary',
    traditionalTerm: '上停',
    normalizedMeaning: '髮際에서 眉까지의 연속 상부 span.',
    requiredTraditionalObservationRefs: ['trad.anchor.hairline', 'trad.anchor.brow'],
    limitations: ['髮際와 眉의 executable 좌표 정의는 T4 범위가 아니다.'],
    reconstructionStatus: 'reconstructed',
  },
  {
    statementId: 't4.mayi.santing.middle',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    sourceRefs: ['passage.mayi.fr261.contiguous_three_divisions'],
    statementKind: 'division_boundary',
    traditionalTerm: '中停',
    normalizedMeaning: '眉에서 準頭까지의 연속 중부 span.',
    requiredTraditionalObservationRefs: ['trad.anchor.brow', 'trad.anchor.zhuntou'],
    limitations: ['眉와 準頭의 executable 좌표 정의는 T4 범위가 아니다.'],
    reconstructionStatus: 'reconstructed',
  },
  {
    statementId: 't4.mayi.santing.lower',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    sourceRefs: ['passage.mayi.fr261.contiguous_three_divisions'],
    statementKind: 'division_boundary',
    traditionalTerm: '下停',
    normalizedMeaning: '準頭에서 地閣까지의 연속 하부 span.',
    requiredTraditionalObservationRefs: ['trad.anchor.zhuntou', 'trad.anchor.dige'],
    limitations: ['準頭와 地閣의 executable 좌표 정의는 T4 범위가 아니다.'],
    reconstructionStatus: 'reconstructed',
  },
  {
    statementId: 't4.mayi.sanfu.upper',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    sourceRefs: ['passage.mayi.fr261.three_fus_three_governors'],
    statementKind: 'division_role',
    traditionalTerm: '上府 / 初主',
    normalizedMeaning: '髮際→印堂 span에 上府 및 初主 역할명이 결합된다.',
    requiredTraditionalObservationRefs: ['trad.anchor.hairline', 'trad.anchor.yintang'],
    limitations: ['이 span을 麻衣 上停으로 재명명하지 않는다.', '初主의 수치 연령범위를 추론하지 않는다.'],
    reconstructionStatus: 'reconstructed',
  },
  {
    statementId: 't4.mayi.sanfu.middle',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    sourceRefs: ['passage.mayi.fr261.three_fus_three_governors'],
    statementKind: 'division_role',
    traditionalTerm: '中府 / 中主',
    normalizedMeaning: '山根→準頭 span에 中府 및 中主 역할명이 결합된다.',
    requiredTraditionalObservationRefs: ['trad.anchor.shangen', 'trad.anchor.zhuntou'],
    limitations: ['이 span을 麻衣 中停으로 재명명하지 않는다.', '中主의 수치 연령범위를 추론하지 않는다.'],
    reconstructionStatus: 'reconstructed',
  },
  {
    statementId: 't4.mayi.sanfu.lower',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    sourceRefs: ['passage.mayi.fr261.three_fus_three_governors'],
    statementKind: 'division_role',
    traditionalTerm: '下府 / 末主',
    normalizedMeaning: '人中→地閣 span에 下府 및 末主 역할명이 결합된다.',
    requiredTraditionalObservationRefs: ['trad.anchor.renzhong', 'trad.anchor.dige'],
    limitations: ['이 span을 麻衣 下停으로 재명명하지 않는다.', '末主의 수치 연령범위를 추론하지 않는다.'],
    reconstructionStatus: 'reconstructed',
  },
  {
    statementId: 't4.shenyi_gujin.santing.upper',
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    sourceRefs: ['passage.shenyi_fu.gujin_636.noncontiguous_three_divisions'],
    statementKind: 'division_boundary',
    traditionalTerm: '上停',
    normalizedMeaning: '古今圖書集成 神異賦 transmission의 髮際→印堂 상부 span.',
    requiredTraditionalObservationRefs: ['trad.anchor.hairline', 'trad.anchor.yintang'],
    limitations: ['transmission-qualified statement이며 original Shenyi Fu authority가 아니다.'],
    reconstructionStatus: 'reconstructed',
  },
  {
    statementId: 't4.shenyi_gujin.santing.middle',
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    sourceRefs: ['passage.shenyi_fu.gujin_636.noncontiguous_three_divisions'],
    statementKind: 'division_boundary',
    traditionalTerm: '中停',
    normalizedMeaning: '古今圖書集成 神異賦 transmission의 山根→準頭 중부 span.',
    requiredTraditionalObservationRefs: ['trad.anchor.shangen', 'trad.anchor.zhuntou'],
    limitations: ['transmission-qualified statement이며 original Shenyi Fu authority가 아니다.'],
    reconstructionStatus: 'reconstructed',
  },
  {
    statementId: 't4.shenyi_gujin.santing.lower',
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    sourceRefs: ['passage.shenyi_fu.gujin_636.noncontiguous_three_divisions'],
    statementKind: 'division_boundary',
    traditionalTerm: '下停',
    normalizedMeaning: '古今圖書集成 神異賦 transmission의 人中→地閣 하부 span.',
    requiredTraditionalObservationRefs: ['trad.anchor.renzhong', 'trad.anchor.dige'],
    limitations: ['transmission-qualified statement이며 original Shenyi Fu authority가 아니다.'],
    reconstructionStatus: 'reconstructed',
  },
  {
    statementId: 't4.shenyi_gujin.santing.balance',
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    sourceRefs: ['passage.shenyi_fu.gujin_636.noncontiguous_three_divisions'],
    statementKind: 'qualitative_balance',
    traditionalTerm: '三停平等',
    normalizedMeaning: '세 三停 사이의 平等을 평가 대상으로 삼는 질적 방법론 표현.',
    requiredTraditionalObservationRefs: [
      'trad.anchor.hairline',
      'trad.anchor.yintang',
      'trad.anchor.shangen',
      'trad.anchor.zhuntou',
      'trad.anchor.renzhong',
      'trad.anchor.dige',
    ],
    limitations: [
      '원문은 numeric tolerance 또는 near-equal band를 제공하지 않는다.',
      '一生衣祿無虧라는 전통적 결과 문구는 T4에서 Production claim으로 활성화하지 않는다.',
    ],
    reconstructionStatus: 'reconstructed',
  },
  {
    statementId: 't4.semantic_separation.mayi_sanfu_vs_shenyi_santing',
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    sourceRefs: [
      'passage.mayi.fr261.three_fus_three_governors',
      'passage.shenyi_fu.gujin_636.noncontiguous_three_divisions',
    ],
    statementKind: 'semantic_separation',
    traditionalTerm: '三府/三主 ≠ 神異賦 transmission 三停',
    normalizedMeaning:
      '두 체계는 동일한 세 span geometry를 공유하지만 source-local concept label과 function이 다르므로 별도 methodology identity를 유지한다.',
    requiredTraditionalObservationRefs: [
      'trad.anchor.hairline',
      'trad.anchor.yintang',
      'trad.anchor.shangen',
      'trad.anchor.zhuntou',
      'trad.anchor.renzhong',
      'trad.anchor.dige',
    ],
    limitations: ['geometry equality를 textual genealogy 또는 semantic identity의 증거로 사용하지 않는다.'],
    reconstructionStatus: 'reconstructed',
  },
] as const satisfies readonly TraditionalMethodologyStatementT4[];

export const FACE_TRADITIONAL_T4_OBSERVATION_REQUIREMENTS = [
  {
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    requirementId: 't4.req.mayi.hairline',
    traditionalObservationRef: 'trad.anchor.hairline',
    traditionalLabel: '髮際',
    semanticRequirement: '上停의 시작 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    requirementId: 't4.req.mayi.brow',
    traditionalObservationRef: 'trad.anchor.brow',
    traditionalLabel: '眉',
    semanticRequirement: '上停/中停의 공유 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    requirementId: 't4.req.mayi.zhuntou',
    traditionalObservationRef: 'trad.anchor.zhuntou',
    traditionalLabel: '準頭',
    semanticRequirement: '中停/下停의 공유 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
    requirementId: 't4.req.mayi.dige',
    traditionalObservationRef: 'trad.anchor.dige',
    traditionalLabel: '地閣',
    semanticRequirement: '下停의 종료 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    requirementId: 't4.req.mayi_sanfu.hairline',
    traditionalObservationRef: 'trad.anchor.hairline',
    traditionalLabel: '髮際',
    semanticRequirement: '上府의 시작 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    requirementId: 't4.req.mayi_sanfu.yintang',
    traditionalObservationRef: 'trad.anchor.yintang',
    traditionalLabel: '印堂',
    semanticRequirement: '上府의 종료 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    requirementId: 't4.req.mayi_sanfu.shangen',
    traditionalObservationRef: 'trad.anchor.shangen',
    traditionalLabel: '山根',
    semanticRequirement: '中府의 시작 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    requirementId: 't4.req.mayi_sanfu.zhuntou',
    traditionalObservationRef: 'trad.anchor.zhuntou',
    traditionalLabel: '準頭',
    semanticRequirement: '中府의 종료 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    requirementId: 't4.req.mayi_sanfu.renzhong',
    traditionalObservationRef: 'trad.anchor.renzhong',
    traditionalLabel: '人中',
    semanticRequirement: '下府의 시작 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef: FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    requirementId: 't4.req.mayi_sanfu.dige',
    traditionalObservationRef: 'trad.anchor.dige',
    traditionalLabel: '地閣',
    semanticRequirement: '下府의 종료 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    requirementId: 't4.req.shenyi_gujin.hairline',
    traditionalObservationRef: 'trad.anchor.hairline',
    traditionalLabel: '髮際',
    semanticRequirement: '上停의 시작 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    requirementId: 't4.req.shenyi_gujin.yintang',
    traditionalObservationRef: 'trad.anchor.yintang',
    traditionalLabel: '印堂',
    semanticRequirement: '上停의 종료 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    requirementId: 't4.req.shenyi_gujin.shangen',
    traditionalObservationRef: 'trad.anchor.shangen',
    traditionalLabel: '山根',
    semanticRequirement: '中停의 시작 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    requirementId: 't4.req.shenyi_gujin.zhuntou',
    traditionalObservationRef: 'trad.anchor.zhuntou',
    traditionalLabel: '準頭',
    semanticRequirement: '中停의 종료 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    requirementId: 't4.req.shenyi_gujin.renzhong',
    traditionalObservationRef: 'trad.anchor.renzhong',
    traditionalLabel: '人中',
    semanticRequirement: '下停의 시작 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
  {
    methodologyRef:
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    requirementId: 't4.req.shenyi_gujin.dige',
    traditionalObservationRef: 'trad.anchor.dige',
    traditionalLabel: '地閣',
    semanticRequirement: '下停의 종료 경계를 식별할 수 있어야 한다.',
    implementationOwner: 'face-observation-engine',
    implementationStatus: 'required_unbound',
  },
] as const satisfies readonly TraditionalObservationRequirementT4[];

export const FACE_TRADITIONAL_T4_BLOCKED_SOURCE_GATES = Object.freeze({
  shenxiangNlc1925: Object.freeze({
    status: 'blocked_before_methodology_reconstruction' as const,
    reason: 'T3 target passage is direct-PDF OCR locator only; exact scan page is not pinned.',
  }),
  liuzhuangNlc1925: Object.freeze({
    status: 'blocked_before_methodology_reconstruction' as const,
    reason: 'Verified witness exists, but the target 三停 passage is not scan-pinned.',
  }),
  taiqingNlc1925: Object.freeze({
    status: 'blocked_before_methodology_reconstruction' as const,
    reason: 'Direct-PDF OCR locator exists, but exact scan page and lower-endpoint reading remain unpinned.',
  }),
  renlunSiku: Object.freeze({
    status: 'blocked_before_methodology_reconstruction' as const,
    reason: 'Verified scan witness exists, but the target 三才 commentary page is not pinned.',
  }),
});

export const FACE_TRADITIONAL_T4_HANDOFF = Object.freeze({
  phase: 'T4_METHOD_RECONSTRUCTION' as const,
  nextPhase: 'T5_OPERATIONALIZATION_SPECIFICATION' as const,
  reconstructedMethodologyRefs: Object.values(FACE_TRADITIONAL_T4_METHOD_REFS),
  numericBalanceToleranceAuthorized: false as const,
  universalAgeMapAuthorized: false as const,
  cvOperationalizationAuthorized: false as const,
  productionAuthorization: false as const,
  nextRequirements: [
    'Translate each reconstructed span into methodology-side metric requirements without choosing RGB landmarks.',
    'Specify comparison semantics for 長短/平等 while keeping numeric tolerance blocked unless independently justified.',
    'Keep Mayi 三停, Mayi 三府/三主, and Shenyi Fu Gujin 三停 as separate lineage-qualified contracts.',
    'Hand required traditional anchor semantics to face-observation-engine/face-reading-binding without implementing them here.',
  ] as const,
});
