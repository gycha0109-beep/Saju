import { FACE_TRADITIONAL_T6_FIVE_OFFICERS_PACK_CANDIDATE } from './traditional-five-officers-methodology-pack-t6.js';
import {
  FACE_TRADITIONAL_T5_FIVE_OFFICER_FORMATION_SPECS,
  FACE_TRADITIONAL_T5_FIVE_OFFICER_OPERATIONALIZATION_SPECS,
} from './traditional-five-officers-operationalization-t5.js';

export type TraditionalFiveOfficerBindingStatusT7 =
  | 'blocked_observation_missing'
  | 'blocked_candidate_not_equivalent'
  | 'blocked_capture_protocol_missing'
  | 'blocked_multi_state_protocol_missing'
  | 'blocked_source_construct_definition_missing'
  | 'blocked_historical_measure_interpretation_missing'
  | 'blocked_named_region_binding_missing';

export type TraditionalFiveOfficerDownstreamOwnerT7 =
  | 'face-observation-engine'
  | 'face-reading-binding';

export interface TraditionalFiveOfficerCriterionBindingHandoffT7 {
  readonly t5SpecificationRef: string;
  readonly traditionalOfficerName:
    | '採聽官'
    | '保壽官'
    | '監察官'
    | '審辨官'
    | '出納官';
  readonly sourceExpression: string;
  readonly status: TraditionalFiveOfficerBindingStatusT7;
  readonly neutralCandidateRefs: readonly string[];
  readonly currentEvidenceRefs: readonly string[];
  readonly rejectionReason: string;
  readonly requiredNextCapability: string;
  readonly nextOwners: readonly TraditionalFiveOfficerDownstreamOwnerT7[];
  readonly traditionalBindingAuthorized: false;
}

export interface TraditionalFiveOfficerFormationBindingAcceptanceT7 {
  readonly formationSpecificationRef: string;
  readonly methodologyRef: string;
  readonly traditionalOfficerName:
    | '採聽官'
    | '保壽官'
    | '監察官'
    | '審辨官'
    | '出納官';
  readonly criterionSpecificationRefs: readonly string[];
  readonly admittedCriterionBindingCount: 0;
  readonly bindingStatus: 'blocked_until_all_required_semantics_adjudicated';
  readonly executableBooleanAndAuthorized: false;
  readonly executableBooleanOrAuthorized: false;
  readonly partialScoreAuthorized: false;
  readonly missingEvidencePolicy: 'fail_closed';
}

export const FACE_TRADITIONAL_T7_FIVE_OFFICERS_BASELINE = Object.freeze({
  baselinePackRef:
    `${FACE_TRADITIONAL_T6_FIVE_OFFICERS_PACK_CANDIDATE.packId}@${FACE_TRADITIONAL_T6_FIVE_OFFICERS_PACK_CANDIDATE.version}`,
  sourceReady: true as const,
  methodologyReady: true as const,
  methodologySideOperationalizationSpecified: true as const,
  criterionSpecificationCount:
    FACE_TRADITIONAL_T5_FIVE_OFFICER_OPERATIONALIZATION_SPECS.length,
  formationSpecificationCount:
    FACE_TRADITIONAL_T5_FIVE_OFFICER_FORMATION_SPECS.length,
  traditionalCriterionBindingReady: false as const,
  formationEvaluationReady: false as const,
  executableReadingReady: false as const,
  productionReady: false as const,
});

export const FACE_TRADITIONAL_T7_FIVE_OFFICER_CRITERION_HANDOFFS = [
  {
    t5SpecificationRef: 't5.op.listening.color_fresh',
    traditionalOfficerName: '採聽官',
    sourceExpression: '色鮮',
    status: 'blocked_observation_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR294 ear hard-gap frontier'],
    rejectionReason:
      'FR294 has no admitted visible-ear appearance model; even external-pinna boundary work is gated behind ear-specific visibility admission. No controlled ear-color observation can be promoted from current geometry.',
    requiredNextCapability:
      'Admit ear visibility first, then govern controlled visible-ear appearance evidence with illumination/color-quality provenance before any traditional binding review.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.listening.high_relative_to_brow',
    traditionalOfficerName: '採聽官',
    sourceExpression: '高聳於眉',
    status: 'blocked_observation_missing',
    neutralCandidateRefs: ['FR292 visible eyebrow pair geometry'],
    currentEvidenceRefs: ['FR292', 'FR294 ear hard-gap frontier'],
    rejectionReason:
      'FR292 improves brow geometry, but FR294 still lacks a governed visible-ear boundary/vertical reference. Neither side currently supplies the methodology-scoped ear-to-brow vertical relation.',
    requiredNextCapability:
      'Govern neutral ear and brow vertical references in one compatible coordinate frame, then review the exact 高聳於眉 binding.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.listening.contour_complete',
    traditionalOfficerName: '採聽官',
    sourceExpression: '輪廓完成',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR294 ear hard-gap frontier'],
    rejectionReason:
      'A subject external-pinna boundary model is not materialized, and 輪/廓/完成 has no admitted source-grounded executable construct definition.',
    requiredNextCapability:
      'Define the source-local 輪廓完成 construct and independently materialize a governed visible-ear boundary observation before binding.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.listening.close_fleshy_substantial',
    traditionalOfficerName: '採聽官',
    sourceExpression: '貼肉敦厚',
    status: 'blocked_observation_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR294 ear hard-gap frontier'],
    rejectionReason:
      'FR294 explicitly keeps ear thickness/attachment/canal authority unavailable. External outline or a profile image cannot establish attachment depth or tissue fullness.',
    requiredNextCapability:
      'Establish an ordinary-RGB or other admitted neutral observation authority for visible ear attachment/fullness without fabricating depth from 2D outline.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.listening.fengmen_broad',
    traditionalOfficerName: '採聽官',
    sourceExpression: '風門寬大',
    status: 'blocked_named_region_binding_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR294 ear hard-gap frontier'],
    rejectionReason:
      'FR294 keeps canal/gate boundary authority unavailable, while 風門 itself has no methodology-scoped traditional-region binding.',
    requiredNextCapability:
      'Resolve source-grounded 風門 region semantics and supply a governed neutral observable counterpart before any 寬大 measurement is proposed.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },

  {
    t5SpecificationRef: 't5.op.longevity.broad_clear_long',
    traditionalOfficerName: '保壽官',
    sourceExpression: '寬廣清長',
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR292 visible eyebrow pair geometry',
      'neutral.eyebrow.visible_pair.mean_span_to_face_width_ratio@0.1.0',
    ],
    currentEvidenceRefs: ['FR292', 'FR294 eyebrow density/texture hard gap'],
    rejectionReason:
      'FR292 supplies neutral span/arch/tail geometry, but 清 and the compound 寬廣清長 are not established by span alone. FR294 still lacks a governed eyebrow-hair appearance model.',
    requiredNextCapability:
      'Govern the missing visible eyebrow appearance evidence and adjudicate the compound source construct without reducing it to one span ratio.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.longevity.both_extend_into_temples',
    traditionalOfficerName: '保壽官',
    sourceExpression: '雙分入鬢',
    status: 'blocked_named_region_binding_missing',
    neutralCandidateRefs: ['FR292 visible eyebrow pair geometry'],
    currentEvidenceRefs: ['FR292'],
    rejectionReason:
      'FR292 has explicit visible brow endpoints but does not govern 鬢 or a temporal-hair region, and it issues no traditional relation.',
    requiredNextCapability:
      'Provide a neutral temporal-hair region and governed brow-tail relation, then bind 鬢 methodology-specifically.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.longevity.suspended_rhino_new_moon_analogy',
    traditionalOfficerName: '保壽官',
    sourceExpression: '或如懸犀新月之樣',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: [
      'FR292 visible eyebrow pair geometry',
      'neutral.eyebrow.visible_pair.mean_arch_amplitude_to_span_ratio@0.1.0',
    ],
    currentEvidenceRefs: ['FR292'],
    rejectionReason:
      'Arch geometry is a useful neutral candidate, but no source-grounded 懸犀/新月 construct has been admitted. Curvature or arch amplitude cannot become the analogy by naming convenience.',
    requiredNextCapability:
      'Research and adjudicate source-grounded figurative-form definitions before reviewing any neutral shape comparison.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.longevity.ends_full',
    traditionalOfficerName: '保壽官',
    sourceExpression: '首尾豐盈',
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: ['FR292 explicit visible medial/lateral eyebrow endpoints'],
    currentEvidenceRefs: ['FR292', 'FR294 eyebrow density/texture hard gap'],
    rejectionReason:
      'FR292 governs endpoint roles for visible curves but does not establish 豐盈. The appearance/fullness component remains outside current admitted eyebrow evidence.',
    requiredNextCapability:
      'Govern local visible brow fullness/appearance evidence and separately bind 首/尾/豐盈 semantics.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.longevity.high_in_forehead_center',
    traditionalOfficerName: '保壽官',
    sourceExpression: '高居額中',
    status: 'blocked_named_region_binding_missing',
    neutralCandidateRefs: ['FR292 visible eyebrow pair geometry'],
    currentEvidenceRefs: ['FR292', 'FR294 forehead segmentation hard gaps'],
    rejectionReason:
      'Brow geometry exists, but 額中 has no governed traditional-region binding and FR294 still lacks the visible forehead/hairline segmentation needed for a robust neutral forehead region.',
    requiredNextCapability:
      'Materialize a governed neutral forehead region/reference and adjudicate 額中 before defining the brow-to-region relation.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },

  {
    t5SpecificationRef: 't5.op.inspection.concealed_not_exposed',
    traditionalOfficerName: '監察官',
    sourceExpression: '含藏不露',
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR210 eye neutral axis bundle',
      'FR281 fixed-still metric eye chord decomposition',
    ],
    currentEvidenceRefs: ['FR210', 'FR281'],
    rejectionReason:
      'The repository has substantial neutral eye geometry, but no admitted methodology-scoped construct equates an eye-opening/exposure geometry value with 含藏不露.',
    requiredNextCapability:
      'Define controlled gaze/expression eye-exposure evidence and review construct validity against the source expression.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.inspection.black_white_distinct',
    traditionalOfficerName: '監察官',
    sourceExpression: '黑白分明',
    status: 'blocked_capture_protocol_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR210 geometry-only authority'],
    rejectionReason:
      'Current eye authority is geometry-focused. No controlled eye-region dark/light appearance contract with the required illumination/exposure boundary is admitted for this traditional construct.',
    requiredNextCapability:
      'Govern capture-controlled eye appearance/contrast evidence while excluding medical and sensitive-attribute inference, then review the binding.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.inspection.pupil_settled',
    traditionalOfficerName: '監察官',
    sourceExpression: '瞳子端定',
    status: 'blocked_capture_protocol_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR210 geometry-only authority'],
    rejectionReason:
      'Existing neutral eye geometry does not establish a controlled pupil/iris alignment observation or traditional 端定 semantics.',
    requiredNextCapability:
      'Admit controlled-gaze pupil/iris alignment evidence with fail-closed visibility and then perform methodology-scoped semantic binding review.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.inspection.radiant_lustre',
    traditionalOfficerName: '監察官',
    sourceExpression: '光彩射人',
    status: 'blocked_capture_protocol_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR210 geometry-only authority'],
    rejectionReason:
      'No admitted eye-lustre observation separates subject appearance from illumination/specular artefacts, and no source-grounded 光彩 construct binding exists.',
    requiredNextCapability:
      'Govern eye-region appearance plus capture artefact evidence before source-construct adjudication.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.inspection.slender_long_historical_measure',
    traditionalOfficerName: '監察官',
    sourceExpression: '或細長極寸',
    status: 'blocked_historical_measure_interpretation_missing',
    neutralCandidateRefs: ['FR210 relative horizontal span and vertical-to-horizontal ratio'],
    currentEvidenceRefs: ['FR210'],
    rejectionReason:
      'Neutral eye shape ratios exist, but 極寸 has not been source-groundedly interpreted. Modern millimetres, pixels, normalized face ratios, or a fixed aspect ratio cannot be substituted.',
    requiredNextCapability:
      'Adjudicate the source-local historical measure semantics of 極寸 and the scope of 或 before any executable metric proposal.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },

  {
    t5SpecificationRef: 't5.op.discernment.bridge_column_straight',
    traditionalOfficerName: '審辨官',
    sourceExpression: '梁柱端直',
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR287 canonical neutral nose morphology',
      'FR297 provider-independent neutral nasal bridge-root reference',
    ],
    currentEvidenceRefs: ['FR287', 'FR297'],
    rejectionReason:
      'Neutral bridge geometry and a provider-independent bridge-root benchmark definition exist, but neither is source authority for 梁柱 or 端直.',
    requiredNextCapability:
      'Define the methodology-scoped 梁柱/端直 construct and bind it to reviewed neutral bridge evidence without importing provider labels.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.discernment.yintang_level_broad',
    traditionalOfficerName: '審辨官',
    sourceExpression: '印堂平闊',
    status: 'blocked_named_region_binding_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['T7 Three-Divisions 印堂 handoff remains blocked'],
    rejectionReason:
      'No admitted canonical interbrow region is bound as methodology-specific 印堂, so 平/闊 cannot yet be operationalized.',
    requiredNextCapability:
      'Govern a neutral interbrow region/reference and admit an explicit 印堂 binding before evaluating 平/闊.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.discernment.shangen_connects_yintang',
    traditionalOfficerName: '審辨官',
    sourceExpression: '山根連印',
    status: 'blocked_named_region_binding_missing',
    neutralCandidateRefs: ['FR297 provider-independent neutral nasal bridge-root reference'],
    currentEvidenceRefs: ['FR297', 'FR300'],
    rejectionReason:
      'FR297 deliberately hides traditional labels and does not establish 山根; 印堂 also remains unbound. FR300 is still blocked as a real independent 3D pilot and issues no traditional binding.',
    requiredNextCapability:
      'Admit separate methodology-scoped 山根 and 印堂 bindings, then govern the relation between those bound regions.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.discernment.nianshou_high_prominent',
    traditionalOfficerName: '審辨官',
    sourceExpression: '年壽高隆',
    status: 'blocked_named_region_binding_missing',
    neutralCandidateRefs: ['FR287 neutral nasal bridge morphology'],
    currentEvidenceRefs: ['FR287', 'FR297'],
    rejectionReason:
      'No source-governed 年壽 region identity exists. General bridge morphology or a bridge-root point cannot be relabeled as 年壽, and 2D height is not 3D prominence.',
    requiredNextCapability:
      'Define and bind the 年壽 region first, then govern an appropriate neutral prominence observation.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.discernment.zhuntou_round_ku_raised',
    traditionalOfficerName: '審辨官',
    sourceExpression: '準圓庫起',
    status: 'blocked_named_region_binding_missing',
    neutralCandidateRefs: [
      'FR287 neutral nose-tip morphology',
      'FR298 neutral tip/bridge relative-depth reference scalar',
    ],
    currentEvidenceRefs: ['FR287', 'FR298', 'FR299', 'FR300'],
    rejectionReason:
      'Tip morphology and a provider-independent depth-ratio definition do not establish 準 or 庫 identities. FR299 is only a reference-bundle contract and FR300 remains blocked from real materialization.',
    requiredNextCapability:
      'Resolve 準/庫 source-local region identities and bind reviewed neutral shape/prominence evidence separately.',
    nextOwners: ['face-reading-binding', 'face-observation-engine'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.discernment.suspended_gallbladder_form',
    traditionalOfficerName: '審辨官',
    sourceExpression: '形如懸膽',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: ['FR287 neutral nose morphology'],
    currentEvidenceRefs: ['FR287'],
    rejectionReason:
      'No source-grounded 懸膽 visual construct is admitted. Tip circularity, projection, or a template score cannot become the traditional analogy by itself.',
    requiredNextCapability:
      'Adjudicate a source-grounded 懸膽 form construct before reviewing neutral morphology correspondence.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.discernment.cut_tube_form',
    traditionalOfficerName: '審辨官',
    sourceExpression: '齊如截筒',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: ['FR287 neutral nose morphology'],
    currentEvidenceRefs: ['FR287'],
    rejectionReason:
      'No source-grounded 截筒 visual construct is admitted. Bridge straightness or width uniformity alone is not the analogy.',
    requiredNextCapability:
      'Adjudicate a source-grounded 截筒 form construct before reviewing neutral morphology correspondence.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.discernment.fresh_yellow_bright',
    traditionalOfficerName: '審辨官',
    sourceExpression: '色鮮黃明',
    status: 'blocked_capture_protocol_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR287 geometry-only nose authority'],
    rejectionReason:
      'Current admitted nose progress is morphology/reference geometry. No controlled nose-region color/brightness contract exists for 色鮮黃明.',
    requiredNextCapability:
      'Govern capture-controlled nose appearance evidence with color-quality provenance and then perform source-construct binding review.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },

  {
    t5SpecificationRef: 't5.op.intake.square_broad',
    traditionalOfficerName: '出納官',
    sourceExpression: '方大',
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR80 neutral mouth contour aspect ratio',
      'FR82 neutral relative mouth size',
    ],
    currentEvidenceRefs: ['FR81', 'FR83', 'FR132', 'FRB002'],
    rejectionReason:
      'Existing mouth geometry is explicitly not admitted as 方, 大, or 方大 construct validity. FRB002 records zero admitted traditional mouth metric bindings.',
    requiredNextCapability:
      'Establish source-governed construct validity for 方 and 大, including the admissible combination semantics, before any bridge binding.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.intake.lips_substantial',
    traditionalOfficerName: '出納官',
    sourceExpression: '端厚',
    status: 'blocked_candidate_not_equivalent',
    neutralCandidateRefs: [
      'FR293 visible upper/lower lip-band fullness axes',
    ],
    currentEvidenceRefs: ['FR132', 'FR293'],
    rejectionReason:
      'FR293 materially improves neutral visible lip-band fullness geometry but explicitly does not issue anatomical thickness or traditional 端厚 semantics. 端 remains unresolved.',
    requiredNextCapability:
      'Adjudicate 端 semantics and construct validity for 厚/fullness before admitting any FR293-derived traditional binding.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.intake.corners_arched',
    traditionalOfficerName: '出納官',
    sourceExpression: '角弓',
    status: 'blocked_source_construct_definition_missing',
    neutralCandidateRefs: [
      'FR212 visible mouth-corner orientation',
      'FR214 role-free mouth outline angularity',
    ],
    currentEvidenceRefs: ['FR81', 'FR132', 'FR212', 'FR214', 'FRB002'],
    rejectionReason:
      'Neutral corner orientation and outline angularity exist, but FR81/FR132/FRB002 do not admit either as 角弓. The bow-like compound construct remains undefined.',
    requiredNextCapability:
      'Adjudicate source-grounded 角弓 form semantics and validate correspondence to neutral corner/contour evidence.',
    nextOwners: ['face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.intake.open_close_relation',
    traditionalOfficerName: '出納官',
    sourceExpression: '開大合小',
    status: 'blocked_multi_state_protocol_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR132', 'T5 controlled multi-state requirement'],
    rejectionReason:
      'No admitted same-subject controlled open/closed mouth-state comparison contract is present in the audited Five-Officers binding path. A single selfie or speech frame is insufficient.',
    requiredNextCapability:
      'Materialize a governed same-subject controlled open/closed mouth-state protocol and only then review the traditional relation.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
  {
    t5SpecificationRef: 't5.op.intake.red_lip_color',
    traditionalOfficerName: '出納官',
    sourceExpression: '唇紅',
    status: 'blocked_capture_protocol_missing',
    neutralCandidateRefs: [],
    currentEvidenceRefs: ['FR132', 'FR294 mouth.visible_lip_color hard gap'],
    rejectionReason:
      'FR294 keeps visible lip color behind a new controlled image model. Uncalibrated RGB cannot be promoted to 唇紅.',
    requiredNextCapability:
      'Validate controlled visible-lip color observation with illumination/color-quality admission, then review the traditional binding.',
    nextOwners: ['face-observation-engine', 'face-reading-binding'],
    traditionalBindingAuthorized: false,
  },
] as const satisfies readonly TraditionalFiveOfficerCriterionBindingHandoffT7[];

const formationCriteria = (formationRef: string): readonly string[] => {
  const formation = FACE_TRADITIONAL_T5_FIVE_OFFICER_FORMATION_SPECS.find(
    (candidate) => candidate.specificationId === formationRef,
  );
  if (formation === undefined) {
    throw new Error(`T7 Five-Officers formation missing: ${formationRef}`);
  }
  return formation.inputOperationalizationRefs;
};

export const FACE_TRADITIONAL_T7_FIVE_OFFICER_FORMATION_ACCEPTANCE = [
  {
    formationSpecificationRef: 't5.formation.listening',
    methodologyRef:
      'method.shenxiang.five_officers.listening_criteria.nlc_1925@0.1.0',
    traditionalOfficerName: '採聽官',
    criterionSpecificationRefs: formationCriteria('t5.formation.listening'),
    admittedCriterionBindingCount: 0,
    bindingStatus: 'blocked_until_all_required_semantics_adjudicated',
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    partialScoreAuthorized: false,
    missingEvidencePolicy: 'fail_closed',
  },
  {
    formationSpecificationRef: 't5.formation.longevity',
    methodologyRef:
      'method.shenxiang.five_officers.longevity_criteria.nlc_1925@0.1.0',
    traditionalOfficerName: '保壽官',
    criterionSpecificationRefs: formationCriteria('t5.formation.longevity'),
    admittedCriterionBindingCount: 0,
    bindingStatus: 'blocked_until_all_required_semantics_adjudicated',
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    partialScoreAuthorized: false,
    missingEvidencePolicy: 'fail_closed',
  },
  {
    formationSpecificationRef: 't5.formation.inspection',
    methodologyRef:
      'method.shenxiang.five_officers.inspection_criteria.nlc_1925@0.1.0',
    traditionalOfficerName: '監察官',
    criterionSpecificationRefs: formationCriteria('t5.formation.inspection'),
    admittedCriterionBindingCount: 0,
    bindingStatus: 'blocked_until_all_required_semantics_adjudicated',
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    partialScoreAuthorized: false,
    missingEvidencePolicy: 'fail_closed',
  },
  {
    formationSpecificationRef: 't5.formation.discernment',
    methodologyRef:
      'method.shenxiang.five_officers.discernment_criteria.nlc_1925@0.1.0',
    traditionalOfficerName: '審辨官',
    criterionSpecificationRefs: formationCriteria('t5.formation.discernment'),
    admittedCriterionBindingCount: 0,
    bindingStatus: 'blocked_until_all_required_semantics_adjudicated',
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    partialScoreAuthorized: false,
    missingEvidencePolicy: 'fail_closed',
  },
  {
    formationSpecificationRef: 't5.formation.intake',
    methodologyRef:
      'method.shenxiang.five_officers.intake_criteria@0.2.0',
    traditionalOfficerName: '出納官',
    criterionSpecificationRefs: formationCriteria('t5.formation.intake'),
    admittedCriterionBindingCount: 0,
    bindingStatus: 'blocked_until_all_required_semantics_adjudicated',
    executableBooleanAndAuthorized: false,
    executableBooleanOrAuthorized: false,
    partialScoreAuthorized: false,
    missingEvidencePolicy: 'fail_closed',
  },
] as const satisfies readonly TraditionalFiveOfficerFormationBindingAcceptanceT7[];

export const FACE_TRADITIONAL_T7_FIVE_OFFICERS_READINESS_DELTA =
  Object.freeze({
    observationProgress: [
      'FR292 materializes neutral visible eyebrow-pair span/arch/tail geometry but no traditional brow criterion.',
      'FR293 materializes neutral visible lip-band fullness axes but explicitly not anatomical thickness or 端厚.',
      'FR210/FR281 provide neutral eye geometry while appearance/gaze-dependent 五官 constructs remain unbound.',
      'FR297 freezes a provider-independent neutral nasal bridge-root benchmark definition but explicitly no traditional anchor.',
      'FR298 freezes a neutral tip/bridge relative-depth reference scalar but explicitly no traditional interpretation.',
      'FR299 freezes the independent 3D reference-bundle contract but does not materialize a real subject reference.',
      'FR300 keeps the first real independent 3D nose pilot blocked on rights/metric-scale evidence and issues no traditional binding.',
      'FR294 still blocks ear visible-boundary/attachment/canal authority and controlled visible lip color.',
    ] as const,
    bridgeProgress: [
      'FRB001 provides a binding foundation without creating traditional meaning.',
      'FRB002 exposes mouth capability routing while admitting zero traditional mouth metric bindings.',
      'No Five-Officers methodology-scoped binding ledger has been admitted in the audited bridge baseline.',
    ] as const,
    newlyAdmittedTraditionalCriterionBindings: [] as const,
    criterionSpecificationsStillBlocked:
      FACE_TRADITIONAL_T7_FIVE_OFFICER_CRITERION_HANDOFFS.map(
        (handoff) => handoff.t5SpecificationRef,
      ),
    verdict:
      'neutral_capability_improved_but_zero_five_officers_traditional_bindings_admitted' as const,
  });

export const FACE_TRADITIONAL_T7_FIVE_OFFICERS_DOWNSTREAM_ACCEPTANCE_GATES =
  Object.freeze({
    observationEngineMustProvide: [
      'governed tradition-free observation contracts for every required visible geometry/appearance/state construct',
      'capture protocol identity for appearance- and gaze-sensitive evidence',
      'same-subject state provenance for 開大合小',
      'visibility and fail-closed unavailable semantics',
      'no traditional labels inside neutral extraction authority',
    ] as const,
    faceReadingBindingMustProvide: [
      'exact T5 criterion specification and methodologyRef for every proposed binding',
      'source-grounded named-region semantics for 風門/鬢/額中/印堂/山根/年壽/準/庫',
      'source-grounded figurative-form definitions for 懸犀/新月/懸膽/截筒/角弓',
      'historical-measure adjudication for 細長極寸 before metric design',
      'construct-validity evidence showing why a neutral candidate represents the source construct',
      'capture/calibration dependency provenance for appearance criteria',
      'fail-closed behavior when required evidence is unavailable',
    ] as const,
    prohibited: [
      'provider index or modern anatomical label promoted directly into a traditional region',
      'FR297 relabeled as 山根',
      'FR298 relabeled as 準 or 庫',
      'FR293 visible lip-band fullness relabeled as 端厚',
      'FR292 arch/span metrics relabeled as 懸犀/新月 or 寬廣清長',
      'raw RGB relabeled as 色鮮/色鮮黃明/唇紅/黑白分明/光彩射人',
      'single selfie used for 開大合小',
      '寸 converted to millimetres/pixels/normalized ratio without source adjudication',
      'source descriptor list compiled into Boolean AND',
      '或 compiled into Boolean OR',
      'partial descriptor match converted into 官成 score',
      'outcome claim or Production activation from the T7 handoff',
    ] as const,
  });

export const FACE_TRADITIONAL_T7_FIVE_OFFICERS_CLOSEOUT = Object.freeze({
  phase: 'T7_BINDING_HANDOFF_AUDIT' as const,
  traditionalResearchStatus:
    'complete_for_current_shenxiang_five_officers_slice' as const,
  admittedCriterionBindingCount: 0 as const,
  admittedFormationEvaluatorCount: 0 as const,
  downstreamBindingStatus: 'blocked' as const,
  sourceResearchReopened: false as const,
  methodologyReconstructionReopened: false as const,
  observationImplementationPerformedHere: false as const,
  faceReadingBindingPerformedHere: false as const,
  executableReadingAuthorized: false as const,
  traditionalOutcomeClaimAuthorized: false as const,
  productionAuthorization: false as const,
  nextOwners: [
    'face-observation-engine',
    'face-reading-binding',
  ] as const,
  separateResearchFrontiers: [
    '神相 六府 direct source witness extraction',
    '柳莊 五官/六府 direct source witness extraction and 審辨官/審判官 variant adjudication',
  ] as const,
});
