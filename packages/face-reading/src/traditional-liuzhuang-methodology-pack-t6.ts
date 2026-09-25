import {
  FACE_TRADITIONAL_T3_LIUZHUANG_WITNESSES,
} from './traditional-liuzhuang-five-officers-six-fus-variants-t3.js';
import {
  FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_FIVE_ELEMENTS_COMBINED_PASSAGES,
} from './traditional-liuzhuang-nlc1925-five-elements-combined-t3.js';
import {
  FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_EAR_TITLE_PASSAGES,
} from './traditional-liuzhuang-nlc1925-ear-title-t3.js';
import {
  FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_NOSE_TITLE_PASSAGES,
} from './traditional-liuzhuang-nlc1925-nose-title-t3.js';
import {
  FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_FIVE_OFFICERS_FORMATION_PASSAGES,
} from './traditional-liuzhuang-nlc1925-five-officers-formation-t3.js';
import {
  FACE_TRADITIONAL_T3_LIUZHUANG_SHENPAN_PROVENANCE_ADJUDICATION,
} from './traditional-liuzhuang-shenpan-provenance-t3.js';
import {
  FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS,
} from './traditional-liuzhuang-methodology-t4.js';
import {
  FACE_TRADITIONAL_T5_LIUZHUANG_FORMATION_SPECS,
  FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS,
  FACE_TRADITIONAL_T5_LIUZHUANG_SIX_FUS_BINDING_REQUIREMENTS,
} from './traditional-liuzhuang-operationalization-t5.js';

export type TraditionalLiuzhuangPackSlotStatusT6 =
  | 'pinned'
  | 'research_spec_only'
  | 'blocked_pending_binding'
  | 'blocked_not_authorized';

export interface TraditionalLiuzhuangPackSlotT6 {
  readonly slot: string;
  readonly status: TraditionalLiuzhuangPackSlotStatusT6;
  readonly refs: readonly string[];
  readonly reason: string;
}

export interface TraditionalLiuzhuangMethodologyPackCandidateT6 {
  readonly packId: string;
  readonly version: string;
  readonly status: 'research_candidate_fail_closed';
  readonly sourceWitnessRefs: readonly string[];
  readonly sourcePassageRefs: readonly string[];
  readonly methodologyRefs: readonly string[];
  readonly operationalizationSpecRefs: readonly string[];
  readonly formationSpecificationRefs: readonly string[];
  readonly sixFusBindingRequirementRefs: readonly string[];
  readonly excludedTransmissionRefs: readonly string[];
  readonly slots: readonly TraditionalLiuzhuangPackSlotT6[];
  readonly lineageIsolationAssertions: readonly string[];
  readonly enabledProductionTiers: readonly [];
  readonly forbiddenShortcuts: readonly string[];
  readonly productionAuthorization: false;
}

export interface TraditionalLiuzhuangBindingHandoffT7Candidate {
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

const nlcWitnesses = FACE_TRADITIONAL_T3_LIUZHUANG_WITNESSES.filter(
  (witness) =>
    witness.witnessId ===
      'witness.liuzhuang_xiangfa.nlc416_1925_wenming' ||
    witness.witnessId ===
      'witness.liuzhuang_xiangfa.nlc511_1925_wenming',
);

const nlcPassages = [
  ...FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_FIVE_ELEMENTS_COMBINED_PASSAGES,
  ...FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_EAR_TITLE_PASSAGES,
  ...FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_NOSE_TITLE_PASSAGES,
  ...FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_FIVE_OFFICERS_FORMATION_PASSAGES,
] as const;

export const FACE_TRADITIONAL_T6_LIUZHUANG_1925_SOURCE_WITNESS_SET =
  Object.freeze({
    witnessSetId: 'witness-set.face.liuzhuang_1925_wenming.t6_candidate',
    version: '0.1.0',
    witnessRefs: nlcWitnesses.map((witness) => witness.witnessId),
    passageRefs: nlcPassages.map((passage) => passage.passageId),
    admittedLineage:
      '柳莊相法 / 1925 文明書局 / NLC416 + NLC511' as const,
    manifestationCount: 2 as const,
    independentEditionVotes: 0 as const,
    independentTraditionVotes: 0 as const,
    scanCheckedPassageCount: nlcPassages.filter(
      (passage) => passage.verificationStatus === 'scan_checked',
    ).length,
    authorityNotes: [
      'NLC416 and NLC511 are separately cataloged manifestations of the same 1925 文明書局 reproduction lineage.',
      'Their agreement increases reproduction confidence but does not create two independent edition or tradition votes.',
      'The admitted 五官 mapping is 耳→採聽官 / 眉→保壽官 / 眼→監察官 / 鼻→審辨官 / 口→出納官.',
      'The admitted 柳莊 六府 mapping is 天倉→上二府 / 顴骨→中二府 / 地庫→下二府.',
      'The modern 審判官 web-text family is retained as transmission evidence but is excluded from verified methodology authority because its upstream historical witness remains unpinned.',
    ] as const,
  });

export const FACE_TRADITIONAL_T6_LIUZHUANG_1925_PACK_CANDIDATE:
  TraditionalLiuzhuangMethodologyPackCandidateT6 = Object.freeze({
    packId: 'pack.face.liuzhuang_1925_wenming.t6_candidate',
    version: '0.1.0',
    status: 'research_candidate_fail_closed',
    sourceWitnessRefs:
      FACE_TRADITIONAL_T6_LIUZHUANG_1925_SOURCE_WITNESS_SET.witnessRefs,
    sourcePassageRefs:
      FACE_TRADITIONAL_T6_LIUZHUANG_1925_SOURCE_WITNESS_SET.passageRefs,
    methodologyRefs: Object.values(FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS),
    operationalizationSpecRefs:
      FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS.map(
        (specification) => specification.specId,
      ),
    formationSpecificationRefs:
      FACE_TRADITIONAL_T5_LIUZHUANG_FORMATION_SPECS.map(
        (specification) => specification.methodologyRef,
      ),
    sixFusBindingRequirementRefs:
      FACE_TRADITIONAL_T5_LIUZHUANG_SIX_FUS_BINDING_REQUIREMENTS.map(
        (requirement) =>
          `t5.binding.liuzhuang.six_fus.${requirement.traditionalLabel}`,
      ),
    excludedTransmissionRefs: [
      FACE_TRADITIONAL_T3_LIUZHUANG_SHENPAN_PROVENANCE_ADJUDICATION
        .earliestDatedElectronicManifestationLocated,
    ],
    slots: [
      {
        slot: 'source_witness_set',
        status: 'pinned',
        refs: [
          'witness-set.face.liuzhuang_1925_wenming.t6_candidate@0.1.0',
        ],
        reason:
          'T3 directly scan-checks the 1925 文明書局 NLC416/NLC511 manifestations and versions their shared-lineage relationship.',
      },
      {
        slot: 'methodology_definitions',
        status: 'pinned',
        refs: Object.values(FACE_TRADITIONAL_T4_LIUZHUANG_METHOD_REFS),
        reason:
          'T4 reconstructs lineage-scoped 五官 mapping, five 官成 descriptor methodologies, and 柳莊 六府 mapping without borrowing 神相 authority.',
      },
      {
        slot: 'descriptor_operationalization',
        status: 'research_spec_only',
        refs: FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS.map(
          (specification) => specification.specId,
        ),
        reason:
          'T5 covers all 26 T4 descriptor units with fail-closed observation/binding requirements but authorizes no concrete formula or threshold.',
      },
      {
        slot: 'formation_semantics',
        status: 'research_spec_only',
        refs: FACE_TRADITIONAL_T5_LIUZHUANG_FORMATION_SPECS.map(
          (specification) => specification.methodologyRef,
        ),
        reason:
          'Five 官成 groups are versioned, but source descriptor lists are not compiled into Boolean AND/OR, weights, vetoes, partial scores, or automatic 官成 states.',
      },
      {
        slot: 'six_fus_binding',
        status: 'blocked_pending_binding',
        refs: FACE_TRADITIONAL_T5_LIUZHUANG_SIX_FUS_BINDING_REQUIREMENTS.map(
          (requirement) =>
            `t5.binding.liuzhuang.six_fus.${requirement.traditionalLabel}`,
        ),
        reason:
          '天倉/顴骨/地庫 mappings are source-pinned, while modern neutral-region bindings remain the responsibility of face-reading-binding.',
      },
      {
        slot: 'traditional_region_bindings',
        status: 'blocked_pending_binding',
        refs: [],
        reason:
          '命門/鬢/額中/山根/印堂/年壽/準頭/庫 and other named constructs do not yet have methodology-scoped bindings to neutral observations.',
      },
      {
        slot: 'capture_protocols',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          '色明/黑白分明/光彩/明潤/黃明色肉 and 開大合小 require controlled capture semantics that T5 identifies but does not implement.',
      },
      {
        slot: 'figurative_construct_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          '玄犀/新月/鳳目/懸膽/截筒/角弓 remain source-grounded figurative constructs without numeric comparanda or executable definitions.',
      },
      {
        slot: 'metric_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'No T5 observation requirement is promoted into an executable FaceMetricDefinition formula or threshold.',
      },
      {
        slot: 'comparison_policy',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'The source material does not yet authorize ordinal ranking among 五官, 六府, or 官成 states.',
      },
      {
        slot: 'claim_type_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'Historical outcome language is not promoted into modern product claims in this research candidate.',
      },
      {
        slot: 'rule_registry',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'No executable FaceRuleDefinition may be emitted until bindings, construct validity, aggregation semantics, and claim authority are independently governed.',
      },
      {
        slot: 'production',
        status: 'blocked_not_authorized',
        refs: [],
        reason:
          'This T6 object is not a production FaceMethodologyPackDefinition and enables no FaceTier.',
      },
    ] as const,
    lineageIsolationAssertions: [
      'This pack means 柳莊相法 / 1925 文明書局 lineage, not every historical or modern 柳莊 transmission.',
      'The modern 審判官 web-text family remains preserved but contributes no methodology authority to this pack.',
      '識典 採聰官 remains an unpinned digital-transcription variant and is not silently normalized by this pack.',
      '柳莊 六府 is not 神相 六府 even when upper/middle/lower terminology appears structurally similar.',
      'A neutral observation may be technically reusable across methods, but its traditional meaning requires a separate methodology-scoped binding.',
      'Same glyph does not imply same lineage methodology.',
    ],
    enabledProductionTiers: [] as const,
    forbiddenShortcuts: [
      'Photo → VLM/LLM → 柳莊 traditional claim',
      'neutral ear/eye/brow/nose/mouth geometry → 五官成 without methodology-scoped binding',
      'neutral temple → 天倉',
      'neutral cheek or zygomatic evidence → 柳莊 顴骨',
      'neutral lower-face evidence → 地庫',
      '柳莊 六府 → 神相 六府 aliasing',
      'source descriptor list → executable Boolean AND',
      '或 → executable Boolean OR',
      'source order → criterion weight',
      'negative wording → automatic veto',
      'partial descriptor match → 官成 score',
      'figurative form → one convenient numeric shape metric',
      'uncontrolled RGB → 色明/黑白分明/光彩/明潤/黃明色肉',
      'single selfie → 開大合小',
      '審判官 electronic transmission → verified 1925 authority',
      'historical outcome wording → modern factual prediction',
    ],
    productionAuthorization: false,
  });

export const FACE_TRADITIONAL_T6_LIUZHUANG_1925_COMPLETENESS =
  Object.freeze({
    methodologyCount:
      FACE_TRADITIONAL_T6_LIUZHUANG_1925_PACK_CANDIDATE.methodologyRefs.length,
    expectedMethodologyCount: 7 as const,
    descriptorOperationalizationCount:
      FACE_TRADITIONAL_T6_LIUZHUANG_1925_PACK_CANDIDATE
        .operationalizationSpecRefs.length,
    expectedDescriptorOperationalizationCount: 26 as const,
    formationSpecificationCount:
      FACE_TRADITIONAL_T6_LIUZHUANG_1925_PACK_CANDIDATE
        .formationSpecificationRefs.length,
    expectedFormationSpecificationCount: 5 as const,
    sixFusBindingRequirementCount:
      FACE_TRADITIONAL_T6_LIUZHUANG_1925_PACK_CANDIDATE
        .sixFusBindingRequirementRefs.length,
    expectedSixFusBindingRequirementCount: 3 as const,
    admittedWitnessCount:
      FACE_TRADITIONAL_T6_LIUZHUANG_1925_SOURCE_WITNESS_SET.witnessRefs.length,
    expectedAdmittedWitnessCount: 2 as const,
    scanCheckedPassageCount:
      FACE_TRADITIONAL_T6_LIUZHUANG_1925_SOURCE_WITNESS_SET
        .scanCheckedPassageCount,
    expectedScanCheckedPassageCount: 16 as const,
  });

export const FACE_TRADITIONAL_T6_LIUZHUANG_1925_PROMOTION_GATES =
  Object.freeze({
    sourceLineagePinned: true as const,
    directScanWitnessesPinned: true as const,
    fiveOfficersMappingPinned: true as const,
    fiveOfficerFormationPassagesPinned: true as const,
    sixFusMappingPinned: true as const,
    shenpanElectronicTransmissionVersioned: true as const,
    methodologyDefinitionsPinned: true as const,
    abstractOperationalizationSpecsPinned: true as const,
    traditionalRegionBindingsReady: false as const,
    controlledAppearanceCaptureProtocolReady: false as const,
    multiStateMouthCaptureProtocolReady: false as const,
    figurativeConstructValidityReady: false as const,
    executableMetricRegistryReady: false as const,
    booleanFormationEvaluatorAuthorized: false as const,
    counterDescriptorAutomaticVetoAuthorized: false as const,
    criterionWeightingAuthorized: false as const,
    partialSatisfactionScoringAuthorized: false as const,
    fiveOfficersOrdinalRankingAuthorized: false as const,
    crossLineageNormalizationAuthorized: false as const,
    automaticOfficerFormationStateAuthorized: false as const,
    historicalOutcomeClaimAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T7_LIUZHUANG_1925_BINDING_HANDOFF_CANDIDATE:
  TraditionalLiuzhuangBindingHandoffT7Candidate = Object.freeze({
    handoffId: 'handoff.face.liuzhuang_1925_wenming.t7_candidate@0.1.0',
    fromPackRef: 'pack.face.liuzhuang_1925_wenming.t6_candidate@0.1.0',
    targetTracks: [
      'face-observation-engine',
      'face-reading-binding',
    ] as const,
    requiredCapabilityGroups: [
      'tradition-free visible feature geometry for ear/brow/eye/nose/mouth with pose, visibility, and quality provenance',
      'controlled appearance evidence separated from semantic interpretation',
      'controlled same-subject multi-state mouth observations for future 開大合小 research',
      'methodology-scoped traditional region identities for 命門/鬢/額中/山根/印堂/年壽/準頭/庫',
      'methodology-scoped 柳莊 六府 identities for 天倉/顴骨/地庫',
      'source-grounded construct definitions for compound morphology and spatial-relation expressions',
      'source-grounded figurative comparanda for 玄犀/新月/鳳目/懸膽/截筒/角弓',
    ],
    requiredBindingSemantics: [
      'Every proposed traditional binding names the exact method.liuzhuang.* methodologyRef and T5 spec it satisfies.',
      'Neutral observation names remain tradition-free; 柳莊 labels exist only in methodology-scoped binding records.',
      'A technically reusable neutral observation does not inherit 神相 or other traditional meaning automatically.',
      'Capture-sensitive constructs fail closed without the required capture provenance.',
      'Compound and figurative expressions remain unresolved until construct-validity evidence is versioned.',
      'Missing evidence means unavailable, not negative.',
      'A T7 binding does not itself authorize Boolean 官成 aggregation, ranking, historical outcome claims, or Production.',
    ],
    acceptanceGates: [
      'all proposed bindings cite one exact 柳莊 T4 methodologyRef and one exact T5 specification',
      'all neutral observations used by a proposal are governed or explicitly unavailable',
      'all traditional named regions have methodology-scoped provenance before use',
      '柳莊 六府 bindings are kept separate from 神相 六府 bindings',
      'appearance-sensitive proposals identify capture-control dependencies',
      'multi-state proposals identify state-consistency requirements',
      'figurative and compound constructs use source-grounded construct-validity evidence rather than one convenient proxy',
      'missing evidence fails closed',
      'no Boolean 官成 evaluator, counter-descriptor veto, criterion weight, partial score, ordinal 五官 ranking, historical outcome claim, or Production activation is introduced',
    ],
    prohibitedShortcuts: [
      'legacy generic 五官/六府 map promoted into this pack',
      'same neutral geometry => same traditional meaning across methodologies',
      'modern anatomy label => 柳莊 traditional region without methodology-scoped provenance',
      'provider landmark => 命門/鬢/額中/山根/印堂/年壽/準頭/庫 by convenience',
      'neutral temple/cheek/lower-face geometry => 天倉/顴骨/地庫 by convenience',
      'raw RGB => source appearance descriptor',
      'single image => 開大合小',
      'supporting descriptor list => executable Boolean requirements',
      'negative phrase => automatic veto',
      'modern 審判官 web text => verified 1925 methodology authority',
    ],
    executableReadingAuthorized: false,
  });
