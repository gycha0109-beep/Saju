import {
  FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PACK_CANDIDATE,
  FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_BINDING_HANDOFF_CANDIDATE,
} from './traditional-shenxiang-six-fus-methodology-pack-t6.js';
import {
  FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_DESCRIPTOR_SPECS,
  FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_FORMATION_SPECS,
  FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_REGION_SPECS,
} from './traditional-shenxiang-six-fus-operationalization-t5.js';

export type TraditionalShenxiangSixFusBindingStatusT7 =
  | 'blocked_candidate_not_equivalent'
  | 'blocked_observation_missing'
  | 'blocked_named_region_binding_missing'
  | 'blocked_span_endpoint_binding_missing'
  | 'blocked_source_construct_definition_missing'
  | 'blocked_capture_protocol_missing';

export type TraditionalShenxiangSixFusDownstreamOwnerT7 =
  | 'face-observation-engine'
  | 'face-reading-binding';

export interface TraditionalShenxiangSixFusRegionBindingHandoffT7 {
  readonly t5SpecificationRef: string;
  readonly methodologyRef: string;
  readonly traditionalLabel: '天府' | '人府' | '地府' | '上二府' | '中二府' | '下二府';
  readonly sourceRegionTerms: readonly string[];
  readonly status: TraditionalShenxiangSixFusBindingStatusT7;
  readonly neutralCandidateRefs: readonly string[];
  readonly currentEvidenceRefs: readonly string[];
  readonly rejectionReason: string;
  readonly requiredNextCapability: string;
  readonly nextOwners: readonly TraditionalShenxiangSixFusDownstreamOwnerT7[];
  readonly traditionalBindingAuthorized: false;
}

export interface TraditionalShenxiangSixFusDescriptorBindingHandoffT7 {
  readonly t5SpecificationRef: string;
  readonly methodologyRef: string;
  readonly appliesTo: '天府' | '人府' | '地府' | '六府_general';
  readonly sourceExpression: string;
  readonly status: TraditionalShenxiangSixFusBindingStatusT7;
  readonly neutralCandidateRefs: readonly string[];
  readonly currentEvidenceRefs: readonly string[];
  readonly rejectionReason: string;
  readonly requiredNextCapability: string;
  readonly nextOwners: readonly TraditionalShenxiangSixFusDownstreamOwnerT7[];
  readonly traditionalBindingAuthorized: false;
}

export interface TraditionalShenxiangSixFusFormationBindingAcceptanceT7 {
  readonly formationSpecificationRef: string;
  readonly methodologyRef: string;
  readonly traditionalLabel: '天府' | '人府' | '地府' | '六府_general';
  readonly inputOperationalizationRefs: readonly string[];
  readonly admittedInputBindingCount: 0;
  readonly bindingStatus: 'blocked_until_all_required_semantics_adjudicated';
  readonly executableBooleanAndAuthorized: false;
  readonly executableBooleanOrAuthorized: false;
  readonly counterDescriptorVetoAuthorized: false;
  readonly criterionWeightingAuthorized: false;
  readonly partialScoreAuthorized: false;
  readonly missingEvidencePolicy: 'fail_closed';
}

const CONTEXT_A = 'method.shenxiang.six_fus.ten_observations.gujin_1725@0.1.0';
const CONTEXT_B = 'method.shenxiang.six_fus.volume_two_treatise.gujin_1725@0.1.0';

export const FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_BASELINE = Object.freeze({
  baselinePackRef:
    `${FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PACK_CANDIDATE.packId}@${FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PACK_CANDIDATE.version}`,
  candidateHandoffRef:
    FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_BINDING_HANDOFF_CANDIDATE.handoffId,
  sourceReady: true as const,
  contextConflictPinned: true as const,
  methodologyReady: true as const,
  methodologyCount: FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PACK_CANDIDATE.methodologyRefs.length,
  regionSpecificationCount: FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_REGION_SPECS.length,
  descriptorSpecificationCount: FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_DESCRIPTOR_SPECS.length,
  formationSpecificationCount: FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_FORMATION_SPECS.length,
  traditionalRegionBindingReady: false as const,
  traditionalDescriptorBindingReady: false as const,
  formationEvaluationReady: false as const,
  executableReadingReady: false as const,
  productionReady: false as const,
});

export const FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_REGION_HANDOFFS = [
  {
    t5SpecificationRef: 't5.six_fus.region.ten_observations.tianfu',
    methodologyRef: CONTEXT_A,
    traditionalLabel: '天府',
    sourceRegionTerms: ['天庭', '日角', '月角'],
    status: 'blocked_named_region_binding_missing',
    neutralCandidateRefs: ['MESH2 authoring-only forehead region', 'MESH2 authoring-only bilateral temple regions'],
    currentEvidenceRefs: ['MESH2', 'FR192', 'FR282'],
    rejectionReason:
      'MESH2 contains forehead/temple authoring surfaces but denies Production region and traditional interpretation authority. FR282 still records no product-boundary forehead feature and a visible hairline/forehead segmentation gap. None establishes 天庭/日角/月角 or 天府.',
    requiredNextCapability:
      'Materialize governed tradition-free upper-face/forehead evidence with visibility provenance, then adjudicate 天庭/日角/月角 and 天府 only inside Context A.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.region.ten_observations.renfu',
    methodologyRef: CONTEXT_A,
    traditionalLabel: '人府',
    sourceRegionTerms: ['兩顴'],
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR286 cheek_midface.visible_width_ratio',
      'FR286 cheek_midface.visible_contour_prominence',
      'FR217 neutral.cheek_midface.visible_side_contour_deviation_to_face_width.mean@0.1.0',
      'MESH6B zygomatic raw morphology research kernel',
    ],
    currentEvidenceRefs: ['FR217', 'FR282', 'FR286', 'MESH6B'],
    rejectionReason:
      'Useful tradition-free cheek/mid-face width and visible-contour evidence exists. MESH6B adds research-only zygomatic/temple/cheek morphology, but its adapter is an authoring candidate, depth is provider-estimated, and it issues no traditional interpretation. None establishes 兩顴 as Context A 人府.',
    requiredNextCapability:
      'Adjudicate the source-local 兩顴→人府 identity and review which governed neutral mid-face observations have construct validity for that exact Context A binding.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.region.ten_observations.difu',
    methodologyRef: CONTEXT_A,
    traditionalLabel: '地府',
    sourceRegionTerms: ['地角', '邊腮'],
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR286 chin_lower_face.visible_width_ratio',
      'FR286 chin_lower_face.visible_contour',
      'FR216 canonical visible lower-face contour',
      'MESH2 authoring-only bilateral jaw and chin regions',
    ],
    currentEvidenceRefs: ['FR216', 'FR282', 'FR286', 'MESH2'],
    rejectionReason:
      'FR216/FR286 govern visible soft-tissue lower-face geometry but FR216 explicitly does not establish a traditional 地閣 state, mandibular boundary, or bone identity. MESH2 jaw/chin regions are authoring surfaces without traditional authority. These assets cannot establish 地角/邊腮 or 地府 by location similarity.',
    requiredNextCapability:
      'Define methodology-scoped 地角/邊腮 semantics and bind them to reviewed neutral lower-face evidence without relabeling generic jaw/chin geometry.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.region.volume_two.upper_identity',
    methodologyRef: CONTEXT_B,
    traditionalLabel: '上二府',
    sourceRegionTerms: ['兩輔骨'],
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: ['MESH2 authoring-only bilateral temple regions', 'MESH6B bilateral temple research regions'],
    currentEvidenceRefs: ['MESH2', 'MESH6B'],
    rejectionReason:
      'Temple-labeled neutral authoring/research regions are not source authority for 兩輔骨. MESH6B denies anatomical zygion and traditional interpretation authority, and no current artifact establishes the traditional paired-bone identity.',
    requiredNextCapability:
      'Adjudicate 兩輔骨 as a Context B source construct and only then review a governed neutral bilateral upper-lateral face candidate.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.region.volume_two.upper_span',
    methodologyRef: CONTEXT_B,
    traditionalLabel: '上二府',
    sourceRegionTerms: ['輔角', '天倉'],
    status: 'blocked_span_endpoint_binding_missing',
    neutralCandidateRefs: ['MESH2 authoring-only bilateral temple regions'],
    currentEvidenceRefs: ['MESH2', 'FR282'],
    rejectionReason:
      'No governed artifact binds 輔角 or 天倉 to neutral endpoints. A temple surface, forehead boundary, or provider point cannot supply either endpoint by naming convenience.',
    requiredNextCapability:
      'Resolve source-grounded 輔角 and 天倉 identities, then provide compatible neutral endpoint observations before any span geometry is proposed.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.region.volume_two.middle_identity',
    methodologyRef: CONTEXT_B,
    traditionalLabel: '中二府',
    sourceRegionTerms: ['兩顴骨'],
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR286 cheek_midface.visible_width_ratio',
      'FR286 cheek_midface.visible_contour_prominence',
      'MESH6B zygomatic raw morphology research kernel',
    ],
    currentEvidenceRefs: ['FR217', 'FR286', 'MESH6B'],
    rejectionReason:
      'Cheek/mid-face and research-only zygomatic observations are neutral candidates, not authority for the traditional term 兩顴骨. The same observations also cannot inherit Context A 人府 semantics.',
    requiredNextCapability:
      'Adjudicate Context B 兩顴骨 independently and review neutral mid-face/zygomatic candidates without importing Context A bindings.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.region.volume_two.middle_span',
    methodologyRef: CONTEXT_B,
    traditionalLabel: '中二府',
    sourceRegionTerms: ['命門', '虎耳'],
    status: 'blocked_span_endpoint_binding_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR282 ear visibility gap'],
    rejectionReason:
      'Neither 命門 nor 虎耳 has a methodology-scoped neutral endpoint binding. FR282 still records ear visibility/modeling as a gap, so a presumed ear-adjacent endpoint cannot be manufactured from current geometry.',
    requiredNextCapability:
      'Resolve source-grounded 命門/虎耳 identities and materialize any required neutral ear/lateral-face endpoint evidence with visibility provenance.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.region.volume_two.lower_identity',
    methodologyRef: CONTEXT_B,
    traditionalLabel: '下二府',
    sourceRegionTerms: ['兩頤骨'],
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR286 chin_lower_face.visible_width_ratio',
      'FR286 chin_lower_face.visible_contour',
      'FR216 canonical visible lower-face contour',
      'MESH2 authoring-only bilateral jaw regions',
    ],
    currentEvidenceRefs: ['FR216', 'FR286', 'MESH2'],
    rejectionReason:
      'The governed lower-face contour is explicitly visible soft tissue rather than a mandibular or anatomical bone boundary. MESH2 jaw regions are authoring surfaces. Neither establishes the source-local 兩頤骨 identity.',
    requiredNextCapability:
      'Adjudicate 兩頤骨 independently of generic jaw/lower-face geometry and review only neutral evidence whose authority matches the required construct.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.region.volume_two.lower_span',
    methodologyRef: CONTEXT_B,
    traditionalLabel: '下二府',
    sourceRegionTerms: ['肩骨', '地閣'],
    status: 'blocked_span_endpoint_binding_missing',
    neutralCandidateRefs: ['FR216 canonical visible lower-face contour', 'FR286 chin_lower_face.visible_contour'],
    currentEvidenceRefs: ['FR216', 'FR286'],
    rejectionReason:
      'FR216 explicitly denies traditional 地閣 authority, and no current governed endpoint is admitted as 肩骨 in this source context. Visible lower-face contour geometry therefore cannot instantiate the 肩骨→地閣 span.',
    requiredNextCapability:
      'Resolve both Context B endpoints source-groundedly, then bind compatible neutral endpoint evidence before any distance or span relation is considered.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
] as const satisfies readonly TraditionalShenxiangSixFusRegionBindingHandoffT7[];

export const FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_DESCRIPTOR_HANDOFFS = [
  {
    t5SpecificationRef: 't5.six_fus.op.ten_observations.tianfu.support',
    methodologyRef: CONTEXT_A,
    appliesTo: '天府',
    sourceExpression: '方員明淨，不宜露骨',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: ['MESH2 upper-face authoring surfaces'],
    currentEvidenceRefs: ['MESH2', 'FR282'],
    rejectionReason:
      'No source-grounded executable construct defines 方員/明淨/露骨, the 天府 region is unbound, and FR282 lacks product-boundary forehead segmentation. Raw shape, brightness, or apparent prominence would be convenience proxies.',
    requiredNextCapability:
      'Define the compound source construct, govern the Context A region, and separately establish capture-controlled surface evidence before correspondence review.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.op.ten_observations.tianfu.counter',
    methodologyRef: CONTEXT_A,
    appliesTo: '天府',
    sourceExpression: '欹削低塌、偏尖',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['MESH2', 'FR282'],
    rejectionReason:
      'Generic asymmetry, contour, or depth proxies do not establish 欹削/低塌/偏尖, and the underlying 天府 region is not bound.',
    requiredNextCapability:
      'Adjudicate the source-local form constructs and the bound region before selecting any neutral shape or prominence observations.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.op.ten_observations.renfu.support',
    methodologyRef: CONTEXT_A,
    appliesTo: '人府',
    sourceExpression: '方正插鬢，不粗不露，齊揖方拱',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: [
      'FR286 cheek_midface.visible_width_ratio',
      'FR286 cheek_midface.visible_contour_prominence',
      'MESH6B zygomatic raw morphology research kernel',
    ],
    currentEvidenceRefs: ['FR217', 'FR286', 'MESH6B'],
    rejectionReason:
      'Neutral cheek geometry exists, but 人府/鬢 are unbound and the compound 方正插鬢/齊揖方拱 semantics are not established. Width, contour prominence, or bilateral asymmetry cannot stand in for the source construct.',
    requiredNextCapability:
      'Adjudicate 人府/鬢 and the compound form/relation construct before reviewing neutral cheek and temporal-hair evidence.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.op.ten_observations.renfu.counter',
    methodologyRef: CONTEXT_A,
    appliesTo: '人府',
    sourceExpression: '粗露高低，尖員綳鼓',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: [
      'FR286 cheek_midface.visible_contour_prominence',
      'MESH6B bilateralZygomaticAsymmetryRatio research diagnostic',
      'MESH6B zygomaticRelativeDepthRatio research diagnostic',
    ],
    currentEvidenceRefs: ['FR217', 'FR286', 'MESH6B'],
    rejectionReason:
      'MESH6B research diagnostics and FR286 visible contour evidence are useful neutral candidates but do not establish 粗露高低/尖員綳鼓. MESH6B depth is provider-estimated single-view relative depth and not traditional authority.',
    requiredNextCapability:
      'Define the compound counter-construct and review candidate geometry only after the Context A 人府 binding exists.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.op.ten_observations.difu.support',
    methodologyRef: CONTEXT_A,
    appliesTo: '地府',
    sourceExpression: '喜輔，地閣懸壁，不昏不慘，不尖不歪，不粗不大',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: ['FR286 chin_lower_face.visible_width_ratio', 'FR286 chin_lower_face.visible_contour'],
    currentEvidenceRefs: ['FR216', 'FR282', 'FR286'],
    rejectionReason:
      'Lower-face geometry is available, but 地府/地閣 are unbound, compound form/relation semantics are unresolved, and no capture-controlled surface contract authorizes 昏/慘 inference. FR216 explicitly denies traditional 地閣 authority.',
    requiredNextCapability:
      'Resolve 地府/地閣 and the compound construct, plus capture-controlled visible-surface evidence, before any binding review.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.op.ten_observations.difu.counter',
    methodologyRef: CONTEXT_A,
    appliesTo: '地府',
    sourceExpression: '高低粗露尖削，耳後見重腮',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: ['FR286 chin_lower_face.visible_contour'],
    currentEvidenceRefs: ['FR216', 'FR282 ear visibility gap', 'FR286'],
    rejectionReason:
      'Visible lower-face contour does not define 高低粗露尖削 or 重腮, while FR282 still lacks a governed ear image/visibility model needed for 耳後 relation evidence.',
    requiredNextCapability:
      'Adjudicate the counter-construct and materialize governed ear/lower-face visibility-relation evidence before correspondence review.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.op.volume_two.general.support',
    methodologyRef: CONTEXT_B,
    appliesTo: '六府_general',
    sourceExpression: '充實相輔',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: ['FR286 cheek/lower-face neutral morphology', 'MESH6B zygomatic raw morphology research kernel'],
    currentEvidenceRefs: ['FR286', 'MESH6B'],
    rejectionReason:
      'Current neutral geometry does not establish the aggregate 充實相輔 construct across all three Context B paired regions. Global symmetry, 2D contour, or research-only relative depth would collapse an unresolved traditional aggregate into a convenience score.',
    requiredNextCapability:
      'Bind all three Context B region pairs and define 充實/相輔 source-groundedly before evaluating any cross-pair neutral evidence.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.op.volume_two.general.counter',
    methodologyRef: CONTEXT_B,
    appliesTo: '六府_general',
    sourceExpression: '不欲支離孤露',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR286', 'MESH6B'],
    rejectionReason:
      'No admitted construct maps 支離/孤露 to segmentation gaps, isolated prominence, asymmetry, or depth. The three paired traditional regions are themselves unbound.',
    requiredNextCapability:
      'Define 支離/孤露 and bind all Context B region pairs before selecting neutral continuity/prominence evidence.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.six_fus.op.volume_two.general.complete',
    methodologyRef: CONTEXT_B,
    appliesTo: '六府_general',
    sourceExpression: '六府充直，無缺陷瘢痕',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: ['FR286 visible cheek/lower-face geometry'],
    currentEvidenceRefs: ['FR286', 'FR282'],
    rejectionReason:
      'No source-grounded 充直/缺陷/瘢痕 construct is bound across all Context B regions. Visible image marks cannot be promoted into medical scar or skin-condition inference, and ordinary geometry does not establish 充直.',
    requiredNextCapability:
      'Define the aggregate construct with a non-medical visible-surface boundary and bind all required regions before any neutral evidence review.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
] as const satisfies readonly TraditionalShenxiangSixFusDescriptorBindingHandoffT7[];

export const FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_FORMATION_ACCEPTANCE =
  FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_FORMATION_SPECS.map(
    (formation): TraditionalShenxiangSixFusFormationBindingAcceptanceT7 =>
      Object.freeze({
        formationSpecificationRef: formation.specificationId,
        methodologyRef: formation.methodologyRef,
        traditionalLabel: formation.traditionalLabel,
        inputOperationalizationRefs: formation.inputOperationalizationRefs,
        admittedInputBindingCount: 0 as const,
        bindingStatus: 'blocked_until_all_required_semantics_adjudicated' as const,
        executableBooleanAndAuthorized: false as const,
        executableBooleanOrAuthorized: false as const,
        counterDescriptorVetoAuthorized: false as const,
        criterionWeightingAuthorized: false as const,
        partialScoreAuthorized: false as const,
        missingEvidencePolicy: 'fail_closed' as const,
      }),
  );

export const FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_AUDIT_SUMMARY = Object.freeze({
  auditedRegionSpecificationCount: FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_REGION_HANDOFFS.length,
  expectedRegionSpecificationCount: 9 as const,
  auditedDescriptorSpecificationCount: FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_DESCRIPTOR_HANDOFFS.length,
  expectedDescriptorSpecificationCount: 9 as const,
  auditedFormationSpecificationCount: FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_FORMATION_ACCEPTANCE.length,
  expectedFormationSpecificationCount: 4 as const,
  currentNeutralAssetsReviewed: [
    'FR192 master region coverage skeleton',
    'FR216 canonical visible lower-face contour',
    'FR217 visible cheek contour prominence',
    'FR282 ordinary-RGB selfie feature authority matrix',
    'FR286 canonical cheek/lower-face morphology',
    'MESH2 physical-region authoring surface',
    'MESH6B zygomatic raw morphology research kernel',
  ] as const,
  candidateNeutralEvidenceExists: true as const,
  admittedTraditionalRegionBindingCount: 0 as const,
  admittedTraditionalDescriptorBindingCount: 0 as const,
  admittedFormationEvaluatorCount: 0 as const,
  crossContextInheritanceAuthorized: false as const,
  executableReadingAuthorized: false as const,
  historicalOutcomeClaimAuthorized: false as const,
  productionAuthorization: false as const,
});

export const FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_AUTHORITY_BOUNDARY = Object.freeze({
  neutralGeometryMeansTraditionalRegion: false as const,
  authoringSurfaceMeansGovernedTraditionalRegion: false as const,
  researchDiagnosticMeansProductionMetric: false as const,
  wordingSimilarityMeansCrossContextIdentity: false as const,
  sameNeutralCandidateMeansSameTraditionalMeaning: false as const,
  sourceSupportingListMeansBooleanAnd: false as const,
  sourceCounterListMeansAutomaticVeto: false as const,
  sourceOrderMeansCriterionWeight: false as const,
  partialMatchMeansFormationScore: false as const,
  uncontrolledRgbMeansTraditionalSurfaceAppearance: false as const,
  visibleSurfaceMarkMeansMedicalScarDiagnosis: false as const,
  gujinWitnessMeansNlc1925Authority: false as const,
  historicalPeriodLanguageMeansExecutableAgeMap: false as const,
  historicalWealthLanguageMeansExecutableOutcomeClaim: false as const,
  productionAuthorization: false as const,
});

export const FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_CLOSEOUT = Object.freeze({
  phase: 'T7_BINDING_HANDOFF_AUDIT' as const,
  traditionalResearchStatus: 'complete_for_current_shenxiang_six_fus_slice' as const,
  admittedRegionBindingCount: 0 as const,
  admittedDescriptorBindingCount: 0 as const,
  admittedFormationEvaluatorCount: 0 as const,
  downstreamBindingStatus: 'blocked' as const,
  sourceResearchReopened: false as const,
  methodologyReconstructionReopened: false as const,
  observationImplementationPerformedHere: false as const,
  faceReadingBindingPerformedHere: false as const,
  executableReadingAuthorized: false as const,
  traditionalOutcomeClaimAuthorized: false as const,
  productionAuthorization: false as const,
  nextOwners: ['face-observation-engine', 'face-reading-binding'] as const,
  separateResearchFrontiers: [
    'NLC-1925 神相 六府 exact-page source adjudication',
    '柳莊 五官/六府 direct source witness extraction and 審辨官/審判官 variant adjudication',
  ] as const,
});
