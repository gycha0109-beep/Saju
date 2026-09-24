import { FACE_TRADITIONAL_T4_METHOD_REFS } from './traditional-three-divisions-methodology-t4.js';
import {
  FACE_TRADITIONAL_T5_BINDING_PREREQUISITES,
  FACE_TRADITIONAL_T5_COMPARISON_SPECS,
  FACE_TRADITIONAL_T5_SPAN_SPECS,
} from './traditional-three-divisions-operationalization-t5.js';

export type TraditionalPackSlotStatusT6 =
  | 'pinned'
  | 'research_spec_only'
  | 'blocked_pending_binding'
  | 'blocked_not_authorized';

export interface TraditionalPackSlotT6 {
  readonly slot: string;
  readonly status: TraditionalPackSlotStatusT6;
  readonly refs: readonly string[];
  readonly reason: string;
}

export interface TraditionalMethodologyPackCandidateT6 {
  readonly packId: string;
  readonly version: string;
  readonly status: 'research_candidate_fail_closed';
  readonly sourceWitnessRefs: readonly string[];
  readonly sourcePassageRefs: readonly string[];
  readonly methodologyRefs: readonly string[];
  readonly spanSpecificationRefs: readonly string[];
  readonly comparisonSpecificationRefs: readonly string[];
  readonly bindingPrerequisiteRefs: readonly string[];
  readonly slots: readonly TraditionalPackSlotT6[];
  readonly lineageIsolationAssertions: readonly string[];
  readonly enabledProductionTiers: readonly [];
  readonly forbiddenObservationInputs: readonly string[];
  readonly productionAuthorization: false;
}

export interface TraditionalBindingHandoffT7Candidate {
  readonly handoffId: string;
  readonly fromPackRef: string;
  readonly targetTracks: readonly ['face-observation-engine', 'face-reading-binding'];
  readonly requiredObservationRefs: readonly string[];
  readonly requiredBindingSemantics: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
  readonly acceptanceGates: readonly string[];
  readonly executableReadingAuthorized: false;
}

export const FACE_TRADITIONAL_T6_SOURCE_WITNESS_SET = Object.freeze({
  witnessSetId: 'witness-set.face.three_divisions.t6_candidate',
  version: '0.1.0',
  witnessRefs: [
    'witness.mayi_xiangfa.nlc_1925_v1',
    'witness.shenyi_fu.gujin_636_transmission',
  ] as const,
  passageRefs: [
    'passage.mayi.fr261.contiguous_three_divisions',
    'passage.mayi.fr261.three_fus_three_governors',
    'passage.shenyi_fu.gujin_636.noncontiguous_three_divisions',
  ] as const,
  authorityNotes: [
    'Mayi passages are FR261 scan-checked successor passages from the 1925 NLC witness.',
    'Shenyi Fu evidence is the scan-checked Gujin 第636卷 transmission witness, not original/earliest Shenyi authority.',
    'Harvard 萬曆 Shenyi witness is intentionally excluded because its target passage is not pinned.',
    'Shenxiang, Liuzhuang, Taiqing, and Renlun candidate passages are excluded from this pack slice because their target scan pages remain unpinned.',
  ] as const,
});

export const FACE_TRADITIONAL_T6_PACK_CANDIDATE: TraditionalMethodologyPackCandidateT6 =
  Object.freeze({
    packId: 'pack.face.three_divisions.t6_candidate',
    version: '0.1.0',
    status: 'research_candidate_fail_closed',
    sourceWitnessRefs: FACE_TRADITIONAL_T6_SOURCE_WITNESS_SET.witnessRefs,
    sourcePassageRefs: FACE_TRADITIONAL_T6_SOURCE_WITNESS_SET.passageRefs,
    methodologyRefs: [
      FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
      FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
      FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    ],
    spanSpecificationRefs: FACE_TRADITIONAL_T5_SPAN_SPECS.map(
      (specification) => specification.specificationId,
    ),
    comparisonSpecificationRefs: FACE_TRADITIONAL_T5_COMPARISON_SPECS.map(
      (specification) => specification.specificationId,
    ),
    bindingPrerequisiteRefs: FACE_TRADITIONAL_T5_BINDING_PREREQUISITES.map(
      (prerequisite) => prerequisite.prerequisiteId,
    ),
    slots: [
      {
        slot: 'source_witness_set',
        status: 'pinned',
        refs: ['witness-set.face.three_divisions.t6_candidate@0.1.0'],
        reason: 'T3 scan-qualified witness/passages are explicitly pinned.',
      },
      {
        slot: 'methodology_definitions',
        status: 'pinned',
        refs: [
          FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
          FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
          FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
        ],
        reason: 'T4 reconstructed three separate source-qualified methodology identities.',
      },
      {
        slot: 'region_maps',
        status: 'blocked_pending_binding',
        refs: [],
        reason:
          'No successor coordinate frame or region map is authorized before governed traditional anchor bindings exist.',
      },
      {
        slot: 'metric_registry',
        status: 'research_spec_only',
        refs: FACE_TRADITIONAL_T5_SPAN_SPECS.map(
          (specification) => specification.specificationId,
        ),
        reason:
          'T5 defines abstract comparable-vertical-extent requirements only; executable FaceMetricDefinition formulas are not authorized.',
      },
      {
        slot: 'operationalization_registry',
        status: 'research_spec_only',
        refs: FACE_TRADITIONAL_T5_COMPARISON_SPECS.map(
          (specification) => specification.specificationId,
        ),
        reason:
          'T5 preserves measurement-only and qualitative-balance semantics; executable classification bands remain blocked.',
      },
      {
        slot: 'claim_type_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'This successor slice has not authorized a claim type mapping from the reconstructed methodologies.',
      },
      {
        slot: 'rule_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'No executable rule may be created until observation binding and operationalization gates are satisfied.',
      },
      {
        slot: 'comparison_policy',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'The legacy research-v0 comparison policy is not silently inherited by this successor pack candidate.',
      },
    ] as const,
    lineageIsolationAssertions: [
      'Mayi contiguous 三停 remains distinct from Mayi 三府/三主.',
      'Mayi 三府/三主 remains distinct from Shenyi Fu Gujin transmission 三停 even where span geometry matches.',
      'Gujin transmission authority must not be relabeled as original or earliest Shenyi Fu authority.',
      'Repeated wording across genealogically entangled texts does not count as independent corroboration.',
    ],
    enabledProductionTiers: [],
    forbiddenObservationInputs: [
      'observations.colorAppearance',
      'unreviewed generic forehead-height proxies',
      'eyebrow shape metrics substituted for 眉 vertical reference',
      'nose bridge shape metrics substituted for 山根 vertical reference',
      'nose tip shape metrics substituted for 準頭 vertical reference',
      'philtrum shape metrics substituted for 人中 vertical reference',
      'generic chin/lower-face contour substituted for 地閣 vertical reference',
    ],
    productionAuthorization: false,
  });

export const FACE_TRADITIONAL_T6_PROMOTION_GATES = Object.freeze({
  sourceWitnessSetPinned: true as const,
  sourcePassagesPinned: true as const,
  methodologyDefinitionsPinned: true as const,
  abstractSpanSpecificationsPinned: true as const,
  qualitativeComparisonSemanticsPinned: true as const,
  governedObservationBindingsReady: false as const,
  executableRegionMapsReady: false as const,
  executableMetricRegistryReady: false as const,
  executableOperationalizationRegistryReady: false as const,
  claimTypeRegistryReady: false as const,
  ruleRegistryReady: false as const,
  numericBalanceToleranceAuthorized: false as const,
  universalAgeMapAuthorized: false as const,
  crossLineageMergeAuthorized: false as const,
  productionAuthorization: false as const,
});

export const FACE_TRADITIONAL_T7_BINDING_HANDOFF_CANDIDATE: TraditionalBindingHandoffT7Candidate =
  Object.freeze({
    handoffId: 'handoff.face.three_divisions.t7_candidate@0.1.0',
    fromPackRef: 'pack.face.three_divisions.t6_candidate@0.1.0',
    targetTracks: ['face-observation-engine', 'face-reading-binding'] as const,
    requiredObservationRefs: [
      'trad.anchor.hairline',
      'trad.anchor.brow',
      'trad.anchor.yintang',
      'trad.anchor.shangen',
      'trad.anchor.zhuntou',
      'trad.anchor.renzhong',
      'trad.anchor.dige',
    ],
    requiredBindingSemantics: [
      'Provide a governed vertical reference for each required traditional anchor without changing the source-local label.',
      'Bind neutral observation primitives separately into each methodology identity.',
      'Preserve contiguous topology for Mayi 三停 and non-contiguous topology for Mayi 三府/三主 and Shenyi Fu Gujin 三停.',
      'Return unavailable/blocked rather than substituting an unrelated shape metric when a required anchor cannot be governed.',
      'Keep qualitative 三停平等 non-executable until an independently justified comparison calibration exists.',
    ],
    prohibitedShortcuts: [
      'Photo → VLM → traditional Three-Divisions interpretation',
      'legacy research-v0 region map automatically promoted into this successor pack',
      'legacy strict relative-order bands automatically promoted into this successor pack',
      'same six endpoints → one shared traditional methodology',
      'generic visible boundary → traditional anchor without explicit binding authority',
    ],
    acceptanceGates: [
      'all seven required traditional anchors have governed observation contracts',
      'binding records name the exact methodologyRef they satisfy',
      'binding provenance identifies the neutral observation primitive used for each traditional anchor',
      'missing anchors fail closed',
      'no numeric 平等 threshold is introduced without separate authority/adjudication',
      'no claim/rule execution is enabled by the binding handoff itself',
    ],
    executableReadingAuthorized: false,
  });
