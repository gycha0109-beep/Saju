import { FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS } from './traditional-five-officers-methodology-t4.js';
import {
  FACE_TRADITIONAL_T5_FIVE_OFFICER_BINDING_PREREQUISITES,
  FACE_TRADITIONAL_T5_FIVE_OFFICER_FORMATION_SPECS,
  FACE_TRADITIONAL_T5_FIVE_OFFICER_OPERATIONALIZATION_SPECS,
} from './traditional-five-officers-operationalization-t5.js';

export type TraditionalFiveOfficersPackSlotStatusT6 =
  | 'pinned'
  | 'research_spec_only'
  | 'blocked_pending_binding'
  | 'blocked_not_authorized';

export interface TraditionalFiveOfficersPackSlotT6 {
  readonly slot: string;
  readonly status: TraditionalFiveOfficersPackSlotStatusT6;
  readonly refs: readonly string[];
  readonly reason: string;
}

export interface TraditionalFiveOfficersMethodologyPackCandidateT6 {
  readonly packId: string;
  readonly version: string;
  readonly status: 'research_candidate_fail_closed';
  readonly sourceWitnessRefs: readonly string[];
  readonly sourcePassageRefs: readonly string[];
  readonly methodologyRefs: readonly string[];
  readonly criterionOperationalizationRefs: readonly string[];
  readonly formationSpecificationRefs: readonly string[];
  readonly bindingPrerequisiteRefs: readonly string[];
  readonly slots: readonly TraditionalFiveOfficersPackSlotT6[];
  readonly authorityIsolationAssertions: readonly string[];
  readonly enabledProductionTiers: readonly [];
  readonly forbiddenShortcuts: readonly string[];
  readonly productionAuthorization: false;
}

export interface TraditionalFiveOfficersBindingHandoffT7Candidate {
  readonly handoffId: string;
  readonly fromPackRef: string;
  readonly targetTracks: readonly ['face-observation-engine', 'face-reading-binding'];
  readonly requiredCapabilityGroups: readonly string[];
  readonly requiredBindingSemantics: readonly string[];
  readonly acceptanceGates: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
  readonly executableReadingAuthorized: false;
}

export const FACE_TRADITIONAL_T6_FIVE_OFFICERS_SOURCE_WITNESS_SET =
  Object.freeze({
    witnessSetId: 'witness-set.face.five_officers.t6_candidate',
    version: '0.1.0',
    witnessRefs: ['witness.shenxiang_quanbian.nlc_1925'] as const,
    passageRefs: [
      'passage.shenxiang.nlc_1925.five_officers.mapping',
      'passage.shenxiang.nlc_1925.five_officers.listening',
      'passage.shenxiang.nlc_1925.five_officers.longevity',
      'passage.shenxiang.nlc_1925.five_officers.inspection',
      'passage.shenxiang.nlc_1925.five_officers.discernment',
      'passage.shenxiang.five_officers.intake.nlc_1925',
    ] as const,
    scanPages: [87, 88] as const,
    authorityNotes: [
      'The 五官 mapping is scan-checked on NLC-1925 page 87.',
      '採聽官/保壽官/監察官/審辨官 formation passages are scan-checked on NLC-1925 page 88.',
      '出納官 reuses the existing FR117 scan-checked successor passage and method.shenxiang.five_officers.intake_criteria@0.2.0.',
      'Reusing page 88 evidence does not add an independent witness.',
      'Electronic v0 text is historical context only and is not promoted by this pack.',
      '柳莊 五官, 柳莊 六府, and 神相 六府 are outside this pack because their direct witness gates remain unresolved in the current research chain.',
    ] as const,
  });

export const FACE_TRADITIONAL_T6_FIVE_OFFICERS_PACK_CANDIDATE:
  TraditionalFiveOfficersMethodologyPackCandidateT6 = Object.freeze({
    packId: 'pack.face.five_officers.t6_candidate',
    version: '0.1.0',
    status: 'research_candidate_fail_closed',
    sourceWitnessRefs:
      FACE_TRADITIONAL_T6_FIVE_OFFICERS_SOURCE_WITNESS_SET.witnessRefs,
    sourcePassageRefs:
      FACE_TRADITIONAL_T6_FIVE_OFFICERS_SOURCE_WITNESS_SET.passageRefs,
    methodologyRefs: [
      FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.mapping,
      FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
      FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
      FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
      FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
      FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
    ],
    criterionOperationalizationRefs:
      FACE_TRADITIONAL_T5_FIVE_OFFICER_OPERATIONALIZATION_SPECS.map(
        (specification) => specification.specificationId,
      ),
    formationSpecificationRefs:
      FACE_TRADITIONAL_T5_FIVE_OFFICER_FORMATION_SPECS.map(
        (specification) => specification.specificationId,
      ),
    bindingPrerequisiteRefs:
      FACE_TRADITIONAL_T5_FIVE_OFFICER_BINDING_PREREQUISITES.map(
        (prerequisite) => prerequisite.prerequisiteId,
      ),
    slots: [
      {
        slot: 'source_witness_set',
        status: 'pinned',
        refs: ['witness-set.face.five_officers.t6_candidate@0.1.0'],
        reason:
          'T3 and the existing FR117 successor chain pin the NLC-1925 witness and all six admitted 五官 passages.',
      },
      {
        slot: 'methodology_definitions',
        status: 'pinned',
        refs: [
          FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.mapping,
          FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.listening,
          FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.longevity,
          FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.inspection,
          FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.discernment,
          FACE_TRADITIONAL_T4_FIVE_OFFICER_METHOD_REFS.intake,
        ],
        reason:
          'T4 pins one mapping methodology and five source-qualified formation methodologies without forking the existing 出納官 authority.',
      },
      {
        slot: 'criterion_operationalization_registry',
        status: 'research_spec_only',
        refs: FACE_TRADITIONAL_T5_FIVE_OFFICER_OPERATIONALIZATION_SPECS.map(
          (specification) => specification.specificationId,
        ),
        reason:
          'T5 specifies all 28 criterion observation intents and blockers, but no executable metric or threshold is authorized.',
      },
      {
        slot: 'formation_semantics',
        status: 'research_spec_only',
        refs: FACE_TRADITIONAL_T5_FIVE_OFFICER_FORMATION_SPECS.map(
          (specification) => specification.specificationId,
        ),
        reason:
          'Five 官成 source aggregations are preserved as non-executable semantics; Boolean evaluation and scoring remain blocked.',
      },
      {
        slot: 'binding_prerequisites',
        status: 'blocked_pending_binding',
        refs: FACE_TRADITIONAL_T5_FIVE_OFFICER_BINDING_PREREQUISITES.map(
          (prerequisite) => prerequisite.prerequisiteId,
        ),
        reason:
          'Neutral observation contracts, capture protocols, named-region bindings, figurative constructs, and historical-measure semantics are incomplete.',
      },
      {
        slot: 'region_maps',
        status: 'blocked_pending_binding',
        refs: [],
        reason:
          'No traditional named region such as 風門/額中/印堂/山根/年壽/準/庫 is promoted into an executable region map.',
      },
      {
        slot: 'metric_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'T5 observation intents are not FaceMetricDefinition formulas and must not be converted into metrics by convenience.',
      },
      {
        slot: 'formation_evaluator',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'Source descriptor lists and 或 markers do not authorize Boolean AND/OR, weighting, partial scores, or automatic 官成 states.',
      },
      {
        slot: 'claim_type_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'No traditional outcome claim is authorized from this reconstructed 五官 chain.',
      },
      {
        slot: 'rule_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'No executable reading rule may be emitted until downstream observation/binding and calibration gates are independently satisfied.',
      },
    ] as const,
    authorityIsolationAssertions: [
      'The NLC-1925 witness is one witness even when pages 87 and 88 support multiple passages.',
      'The FR117 出納官 successor methodology is reused and is not forked into a competing T4/T6 authority.',
      'Feature-to-officer mapping is not equivalent to 官成 satisfaction.',
      'Repeated electronic text does not become independent corroboration.',
      '神相 審辨官 is not silently normalized to the unresolved 柳莊 審判官 variant.',
      '五官 methodology does not import 六府 region mappings.',
    ],
    enabledProductionTiers: [] as const,
    forbiddenShortcuts: [
      'Photo → VLM → traditional 五官 interpretation',
      'neutral feature geometry → traditional criterion without methodology-specific binding',
      'FR297 → 山根 by label convenience',
      'FR298 → 準 or 庫 by label convenience',
      'raw RGB or uncontrolled selfie appearance → 色鮮/黑白分明/光彩射人/色鮮黃明/唇紅',
      'single image → 開大合小',
      'single curvature or template score → 懸犀/新月/懸膽/截筒',
      '寸 → millimetre/pixel/normalized ratio without historical-measure adjudication',
      'source descriptor list → Boolean AND',
      '或 → executable Boolean OR',
      'partial descriptor match → 官成 score',
    ],
    productionAuthorization: false,
  });

export const FACE_TRADITIONAL_T6_FIVE_OFFICERS_PROMOTION_GATES =
  Object.freeze({
    sourceWitnessSetPinned: true as const,
    sourcePassagesPinned: true as const,
    mappingMethodologyPinned: true as const,
    allFiveFormationMethodologiesPinned: true as const,
    criterionOperationalizationSpecsPinned: true as const,
    criterionOperationalizationSpecCount: 28 as const,
    formationSpecsPinned: true as const,
    formationSpecCount: 5 as const,
    bindingPrerequisitesPinned: true as const,
    governedNeutralObservationContractsReady: false as const,
    controlledAppearanceCaptureProtocolReady: false as const,
    controlledMultiStateCaptureProtocolReady: false as const,
    namedTraditionalRegionBindingsReady: false as const,
    figurativeFormConstructsReady: false as const,
    historicalMeasureInterpretationReady: false as const,
    executableRegionMapsReady: false as const,
    executableMetricRegistryReady: false as const,
    booleanFormationEvaluatorAuthorized: false as const,
    criterionWeightingAuthorized: false as const,
    partialSatisfactionScoringAuthorized: false as const,
    automaticOfficerFormationStateAuthorized: false as const,
    traditionalOutcomeClaimsAuthorized: false as const,
    liuzhuangNormalizationAuthorized: false as const,
    sixFusImportAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T7_FIVE_OFFICERS_BINDING_HANDOFF_CANDIDATE:
  TraditionalFiveOfficersBindingHandoffT7Candidate = Object.freeze({
    handoffId: 'handoff.face.five_officers.t7_candidate@0.1.0',
    fromPackRef: 'pack.face.five_officers.t6_candidate@0.1.0',
    targetTracks: ['face-observation-engine', 'face-reading-binding'] as const,
    requiredCapabilityGroups: [
      'governed visible ear structure and ear-to-brow relation candidates',
      'governed brow extent/end/fullness and adjacent temporal/forehead relation candidates',
      'controlled eye exposure/alignment/appearance observations',
      'neutral nose bridge/tip/subregion morphology without traditional aliases',
      'controlled lip appearance and same-subject open/closed mouth states',
      'capture metadata or equivalent controls for appearance-sensitive constructs',
      'source-grounded named-region semantics for 風門/額中/印堂/山根/年壽/準/庫',
      'source-grounded figurative-form semantics for 懸犀/新月/懸膽/截筒',
      'source-grounded historical-measure interpretation for 細長極寸',
    ],
    requiredBindingSemantics: [
      'Every binding names the exact 五官 methodologyRef and T5 criterion operationalization it satisfies.',
      'Neutral observation names remain tradition-free; traditional labels live in methodology-scoped binding records.',
      'Capture-sensitive criteria fail closed when the required capture controls are absent.',
      '開大合小 requires same-subject governed multi-state evidence.',
      'Compound source expressions remain compound unless separate source research authorizes decomposition.',
      'A binding handoff does not itself authorize 官成 aggregation, claims, or Production.',
    ],
    acceptanceGates: [
      'all required neutral observation contracts are governed or explicitly unavailable',
      'all named traditional regions used by an admitted criterion have explicit methodology-scoped bindings',
      'appearance-sensitive bindings name the capture protocol and calibration evidence they require',
      'figurative forms have source-grounded construct definitions rather than single-metric aliases',
      '細長極寸 has an adjudicated historical-measure interpretation before any executable metric is proposed',
      'missing evidence fails closed',
      'no Boolean 官成 evaluator, criterion weight, partial score, or outcome claim is introduced by the handoff',
    ],
    prohibitedShortcuts: [
      'reuse of legacy research-v0 mappings as successor authority',
      'modern anatomical label => traditional named region without binding provenance',
      'existing neutral nose metric => traditional nose criterion by name similarity',
      'uncontrolled appearance => traditional color/lustre criterion',
      'single frame => dynamic multi-state criterion',
      'same witness repeated across passages => independent corroboration',
      '神相 審辨官 => 柳莊 審判官 normalization without direct witness adjudication',
    ],
    executableReadingAuthorized: false,
  });
