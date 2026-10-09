import {
  FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_AUTHORITY,
  FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_CONTEXT_CONFLICT,
  FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_PASSAGES,
  FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_WITNESSES,
} from './traditional-shenxiang-six-fus-source-witnesses-t3.js';
import { FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS } from './traditional-shenxiang-six-fus-methodology-t4.js';
import {
  FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_BINDING_PREREQUISITES,
  FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_DESCRIPTOR_SPECS,
  FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_FORMATION_SPECS,
  FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_REGION_SPECS,
} from './traditional-shenxiang-six-fus-operationalization-t5.js';

export type TraditionalShenxiangSixFusPackSlotStatusT6 =
  | 'pinned'
  | 'research_spec_only'
  | 'blocked_pending_binding'
  | 'blocked_not_authorized';

export interface TraditionalShenxiangSixFusPackSlotT6 {
  readonly slot: string;
  readonly status: TraditionalShenxiangSixFusPackSlotStatusT6;
  readonly refs: readonly string[];
  readonly reason: string;
}

export interface TraditionalShenxiangSixFusMethodologyPackCandidateT6 {
  readonly packId: string;
  readonly version: string;
  readonly status: 'research_candidate_fail_closed';
  readonly sourceWitnessRefs: readonly string[];
  readonly sourcePassageRefs: readonly string[];
  readonly sourceConflictRef: string;
  readonly methodologyRefs: readonly string[];
  readonly regionOperationalizationRefs: readonly string[];
  readonly descriptorOperationalizationRefs: readonly string[];
  readonly formationSpecificationRefs: readonly string[];
  readonly bindingPrerequisiteRefs: readonly string[];
  readonly slots: readonly TraditionalShenxiangSixFusPackSlotT6[];
  readonly contextIsolationAssertions: readonly string[];
  readonly enabledProductionTiers: readonly [];
  readonly forbiddenShortcuts: readonly string[];
  readonly productionAuthorization: false;
}

export interface TraditionalShenxiangSixFusBindingHandoffT7Candidate {
  readonly handoffId: string;
  readonly fromPackRef: string;
  readonly targetTracks: readonly [
    'face-observation-engine',
    'face-reading-binding',
  ];
  readonly requiredCapabilityGroups: readonly string[];
  readonly requiredBindingSemantics: readonly string[];
  readonly acceptanceGates: readonly string[];
  readonly prohibitedShortcuts: readonly string[];
  readonly executableReadingAuthorized: false;
}

export const FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_SOURCE_WITNESS_SET =
  Object.freeze({
    witnessSetId: 'witness-set.face.shenxiang_six_fus.t6_candidate',
    version: '0.1.0',
    witnessRefs: [
      'witness.shenxiang_quanbian.gujin_473_1725_transmission',
    ] as const,
    passageRefs: [
      'passage.shenxiang.gujin_631.six_fus.ten_observations',
      'passage.shenxiang.gujin_632.six_fus.treatise',
    ] as const,
    scanPages: [4, 22] as const,
    sourceConflictRef:
      'conflict.shenxiang.six_fus.intra_work_context_mapping_t3' as const,
    authorityNotes: [
      'The admitted authority is one Gujin-1725 compilation-transmission witness, not an original or earliest 神相全編 witness.',
      'Page 4 pins the 十觀 / 六取五官六府 context and page 22 pins the 卷二 / 六府論 context.',
      'Two scan-checked passages from one compilation witness do not count as two independent tradition votes.',
      'The T3 intra-work context conflict is part of the pack authority and requires context-specific methodology identities.',
      'NLC-1925 exact-page authority remains outside this pack because its target pages have not been adjudicated in this chain.',
    ] as const,
  });

export const FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PACK_CANDIDATE:
  TraditionalShenxiangSixFusMethodologyPackCandidateT6 = Object.freeze({
    packId: 'pack.face.shenxiang_six_fus.t6_candidate',
    version: '0.1.0',
    status: 'research_candidate_fail_closed',
    sourceWitnessRefs:
      FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_SOURCE_WITNESS_SET.witnessRefs,
    sourcePassageRefs:
      FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_SOURCE_WITNESS_SET.passageRefs,
    sourceConflictRef:
      FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_SOURCE_WITNESS_SET.sourceConflictRef,
    methodologyRefs: [
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
      FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
    ],
    regionOperationalizationRefs:
      FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_REGION_SPECS.map(
        (specification) => specification.specificationId,
      ),
    descriptorOperationalizationRefs:
      FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_DESCRIPTOR_SPECS.map(
        (specification) => specification.specificationId,
      ),
    formationSpecificationRefs:
      FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_FORMATION_SPECS.map(
        (specification) => specification.specificationId,
      ),
    bindingPrerequisiteRefs:
      FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_BINDING_PREREQUISITES.map(
        (prerequisite) => prerequisite.prerequisiteId,
      ),
    slots: [
      {
        slot: 'source_witness_set',
        status: 'pinned',
        refs: ['witness-set.face.shenxiang_six_fus.t6_candidate@0.1.0'],
        reason:
          'T3 scan-checks one Gujin-1725 compilation-transmission witness and two context-specific passages.',
      },
      {
        slot: 'methodology_definitions',
        status: 'pinned',
        refs: [
          FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.tenObservations,
          FACE_TRADITIONAL_T4_SHENXIANG_SIX_FUS_METHOD_REFS.volumeTwoTreatise,
        ],
        reason:
          'T4 reconstructs two separate methodology identities and does not collapse the intra-work context conflict.',
      },
      {
        slot: 'context_relation',
        status: 'pinned',
        refs: [
          FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_SOURCE_WITNESS_SET.sourceConflictRef,
        ],
        reason:
          'T3 establishes differing source-local region vocabularies and explicitly blocks one universal 神相 六府 region map.',
      },
      {
        slot: 'region_span_operationalization',
        status: 'research_spec_only',
        refs: FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_REGION_SPECS.map(
          (specification) => specification.specificationId,
        ),
        reason:
          'T5 pins nine methodology-scoped region/span contracts, but no modern coordinate or traditional metric binding is authorized.',
      },
      {
        slot: 'descriptor_operationalization',
        status: 'research_spec_only',
        refs: FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_DESCRIPTOR_SPECS.map(
          (specification) => specification.specificationId,
        ),
        reason:
          'T5 pins nine source-construct observation intents while construct validity, calibration, thresholds, and automatic criterion states remain unavailable.',
      },
      {
        slot: 'formation_semantics',
        status: 'research_spec_only',
        refs: FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_FORMATION_SPECS.map(
          (specification) => specification.specificationId,
        ),
        reason:
          'T5 preserves four source aggregate semantics without compiling descriptor lists into executable Boolean or scoring logic.',
      },
      {
        slot: 'binding_prerequisites',
        status: 'blocked_pending_binding',
        refs: FACE_TRADITIONAL_T5_SHENXIANG_SIX_FUS_BINDING_PREREQUISITES.map(
          (prerequisite) => prerequisite.prerequisiteId,
        ),
        reason:
          'Traditional region identities, span endpoints, compound constructs, capture-sensitive appearance, and aggregate constructs remain unbound.',
      },
      {
        slot: 'executable_region_maps',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'No source-local 六府 region or span has an executable coordinate frame or provider-landmark map.',
      },
      {
        slot: 'metric_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'T5 analytical facets and neutral-capability requirements are not executable FaceMetricDefinition formulas.',
      },
      {
        slot: 'formation_evaluator',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          '成/不成 wording does not authorize Boolean AND/OR, automatic counter-descriptor veto, criterion weights, partial scores, or automatic formation states.',
      },
      {
        slot: 'cross_context_comparison_policy',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'No policy authorizes aliasing, comparing, merging, or inheriting metrics between Context A and Context B.',
      },
      {
        slot: 'claim_type_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'Historical age, wealth, fortune, and land imagery remains source content only and is not an executable claim registry.',
      },
      {
        slot: 'rule_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'No executable traditional reading rule may be emitted from this research pack candidate.',
      },
      {
        slot: 'production',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'The candidate is research-only and enables no Production tier.',
      },
    ] as const,
    contextIsolationAssertions: [
      'The same work title and same compilation witness do not imply one universal 六府 methodology.',
      'Context A 天府/人府/地府 remains distinct from Context B 上二府/中二府/下二府.',
      'Context A 兩顴 and Context B 兩顴骨 are not automatically one traditional region identity.',
      'Context A 地府 and Context B 下二府 are not automatically one lower-face region identity.',
      'A neutral observation capability may be technically reusable, but its traditional binding must be reviewed separately for each methodologyRef.',
      'The T3 conflict record is not resolved by choosing one context as canonical or treating the other as a synonym.',
      'The Gujin-1725 witness is a compilation transmission and contributes zero independent tradition votes beyond that witness role.',
      'NLC-1925 remains a separate unpromoted witness gate in this 六府 chain.',
    ],
    enabledProductionTiers: [] as const,
    forbiddenShortcuts: [
      'Photo → VLM → traditional 六府 interpretation',
      '天府/人府/地府 → generic upper/middle/lower face zones',
      '上二府/中二府/下二府 → generic upper/middle/lower face zones',
      '兩顴 → 兩顴骨 cross-context identity by wording similarity',
      'Context A binding or metric → Context B automatic inheritance',
      '輔角/天倉/命門/虎耳/肩骨/地閣 → provider landmark indices without source-grounded binding',
      '方員明淨/齊揖方拱/充實相輔/支離孤露 → one shape, symmetry, fullness, or segmentation score',
      'raw RGB or uncontrolled surface appearance → 明淨/昏/慘',
      'medical scar or skin-condition inference → 瘢痕',
      'source supporting descriptors → executable Boolean requirements',
      'source counter-descriptors → automatic veto',
      'partial descriptor match → 成/不成 score',
      '初年/中年/十年 wording → executable age map',
      '富盛/凶敗/財旺/財祿/萬頃田 → executable wealth or fate claim',
      'Gujin-1725 evidence → NLC-1925 exact-page authority',
    ],
    productionAuthorization: false,
  });

export const FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_COMPLETENESS =
  Object.freeze({
    methodologyCount:
      FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PACK_CANDIDATE.methodologyRefs
        .length,
    expectedMethodologyCount: 2 as const,
    regionOperationalizationCount:
      FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PACK_CANDIDATE
        .regionOperationalizationRefs.length,
    expectedRegionOperationalizationCount: 9 as const,
    descriptorOperationalizationCount:
      FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PACK_CANDIDATE
        .descriptorOperationalizationRefs.length,
    expectedDescriptorOperationalizationCount: 9 as const,
    formationSpecificationCount:
      FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PACK_CANDIDATE
        .formationSpecificationRefs.length,
    expectedFormationSpecificationCount: 4 as const,
    bindingPrerequisiteCount:
      FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PACK_CANDIDATE
        .bindingPrerequisiteRefs.length,
    expectedBindingPrerequisiteCount: 5 as const,
    witnessRecordCount:
      FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_WITNESSES.length,
    expectedWitnessRecordCount: 1 as const,
    scanCheckedPassageCount:
      FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_PASSAGES.filter(
        (passage) => passage.verificationStatus === 'scan_checked',
      ).length,
    expectedScanCheckedPassageCount: 2 as const,
  });

export const FACE_TRADITIONAL_T6_SHENXIANG_SIX_FUS_PROMOTION_GATES =
  Object.freeze({
    gujinCompilationWitnessPinned: true as const,
    scanCheckedPassagesPinned: true as const,
    contextConflictPinned: true as const,
    contextSpecificMethodologiesPinned: true as const,
    regionSpanSpecificationsPinned: true as const,
    descriptorSpecificationsPinned: true as const,
    formationSpecificationsPinned: true as const,
    bindingPrerequisitesPinned: true as const,
    t3TransmissionQualifiedReconstructionAuthorized:
      FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_AUTHORITY
        .transmissionQualifiedMethodologyReconstructionAuthorized,
    t3OneUniversalRegionMapAuthorized:
      FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_CONTEXT_CONFLICT
        .oneUniversalShenxiangSixFusRegionMapAuthorized,
    nlc1925ExactPagesAdjudicated: false as const,
    contextARregionBindingsReady: false as const,
    contextBRegionAndSpanBindingsReady: false as const,
    compoundConstructValidityReady: false as const,
    controlledSurfaceCaptureProtocolReady: false as const,
    executableRegionMapsReady: false as const,
    executableMetricRegistryReady: false as const,
    booleanFormationEvaluatorAuthorized: false as const,
    counterDescriptorAutomaticVetoAuthorized: false as const,
    criterionWeightingAuthorized: false as const,
    partialSatisfactionScoringAuthorized: false as const,
    crossContextNormalizationAuthorized: false as const,
    automaticFormationStateAuthorized: false as const,
    historicalAgeMapAuthorized: false as const,
    wealthOrFateClaimAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T7_SHENXIANG_SIX_FUS_BINDING_HANDOFF_CANDIDATE:
  TraditionalShenxiangSixFusBindingHandoffT7Candidate = Object.freeze({
    handoffId: 'handoff.face.shenxiang_six_fus.t7_candidate@0.1.0',
    fromPackRef: 'pack.face.shenxiang_six_fus.t6_candidate@0.1.0',
    targetTracks: [
      'face-observation-engine',
      'face-reading-binding',
    ] as const,
    requiredCapabilityGroups: [
      'governed tradition-free bilateral upper, middle, and lower face region candidates without 六府 labels',
      'governed tradition-free span endpoint and bilateral relation primitives for Context B candidate review',
      'governed shape/form evidence with pose and visibility provenance',
      'capture-controlled visible surface evidence separated from traditional appearance semantics',
      'source-grounded Context A identities for 天府/天庭/日角/月角/人府/兩顴/地府/地角/邊腮/地閣/鬢',
      'source-grounded Context B identities for 兩輔骨/兩顴骨/兩頤骨/輔角/天倉/命門/虎耳/肩骨/地閣',
      'source-grounded construct definitions for Context A compound form and appearance expressions',
      'source-grounded construct definitions for 充實相輔/支離孤露/充直/無缺陷瘢痕',
    ],
    requiredBindingSemantics: [
      'Every proposed binding names the exact 六府 methodologyRef and exact T5 specificationId it satisfies.',
      'Neutral observation names remain tradition-free; traditional labels exist only in methodology-scoped binding records.',
      'Context A bindings do not automatically satisfy Context B, and Context B bindings do not automatically satisfy Context A.',
      'A technically reusable neutral observation requires separate construct-validity review in each methodology context.',
      'Traditional span endpoints remain unavailable until their source-local identities are explicitly bound.',
      'Capture-sensitive appearance constructs fail closed when capture provenance or calibration requirements are absent.',
      'Compound source expressions remain compound unless separate source research authorizes decomposition.',
      'A T7 binding handoff does not itself authorize 成/不成 aggregation, historical outcome claims, or Production.',
    ],
    acceptanceGates: [
      'all proposed bindings cite one exact T5 六府 specification and one exact T4 methodologyRef',
      'all required neutral observations are governed or explicitly unavailable',
      'all traditional region/span identities used by a proposed binding have methodology-scoped provenance',
      'Context A and Context B have separate binding ledgers or equivalent explicit context isolation',
      'appearance-sensitive proposals identify capture-control dependencies',
      'compound constructs include source-grounded construct-validity evidence rather than one convenient proxy',
      'missing evidence fails closed',
      'no Boolean formation evaluator, counter-descriptor veto, criterion weight, partial score, age map, wealth/fate claim, or Production activation is introduced',
    ],
    prohibitedShortcuts: [
      'legacy generic 六府 map promoted into this successor pack',
      'same neutral geometry => same traditional meaning across both contexts',
      'modern anatomy label => traditional 六府 region without methodology-scoped provenance',
      'provider landmark => 輔角/天倉/命門/虎耳/肩骨/地閣 by label convenience',
      'raw RGB => 明淨/昏/慘',
      'global symmetry => 相輔',
      '3D volume => 充實',
      'segmentation gap => 支離',
      'medical scar or skin-condition classifier => 瘢痕',
      'support/counter wording => executable Boolean/veto logic',
      'Gujin-1725 witness => NLC-1925 authority',
    ],
    executableReadingAuthorized: false,
  });
