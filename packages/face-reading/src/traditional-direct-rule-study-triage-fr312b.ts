import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  EAR_DIRECT_RULE_EVIDENCE_FR311O,
} from './traditional-face-ear-evidence-index-fr311o.js';
import {
  FR312A_BINDING_SUMMARY,
  NEUTRAL_OBSERVATION_SURFACE_FR312A,
  TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A,
} from './traditional-observation-binding-authority-fr312a.js';

export type DirectRuleStudyDispositionFR312B =
  | 'single_region_surface_candidate'
  | 'construct_mapping_required'
  | 'observation_surface_gap'
  | 'manual_context_or_behavior_only'
  | 'phrase_uncertain_manual_only'
  | 'binding_prohibited';

export type DirectRuleObservationKindFR312B =
  | 'morphology'
  | 'color'
  | 'surface_mark'
  | 'wrinkle_or_line'
  | 'dynamic_behavior'
  | 'cross_region_context'
  | 'hair'
  | 'relative_position'
  | 'front_visibility'
  | null;

export interface DirectRuleStudyTriageFR312B {
  readonly ruleId: string;
  readonly evidenceId: string;
  readonly sourceLayer: 'fr311j' | 'fr311o';
  readonly regionKey: string;
  readonly observationKind: DirectRuleObservationKindFR312B;
  readonly certainty: 'direct_clear' | 'phrase_uncertain';
  readonly disposition: DirectRuleStudyDispositionFR312B;
  readonly candidateNeutralFeatureKeys: readonly string[];
  readonly materializedCandidateFeatureKeys: readonly string[];
  readonly permanentlyUnsupportedProductQuery: boolean;
  readonly sameRegionCandidateOnly: true;
  readonly neutralFeatureIsTraditionalEquivalenceProof: false;
  readonly sourceGroundedEquivalenceRequired: true;
  readonly observationValidationRequiredBeforeBinding: true;
  readonly thresholdNeedAdjudicated: false;
  readonly metricThresholdAuthorized: false;
  readonly populationNormAuthorized: false;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly traditionalRuleInferenceAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modernScientificFactAuthorized: false;
}

type RuleSeedFR312B = Readonly<{
  ruleId: string;
  evidenceId: string;
  sourceLayer: 'fr311j' | 'fr311o';
  regionKey: string;
  observationKind: DirectRuleObservationKindFR312B;
  certainty: 'direct_clear' | 'phrase_uncertain';
}>;

const DIRECT_RULE_AUTHORITY = new Map(
  TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A
    .filter((item) => item.targetKind === 'direct_rule')
    .map((item) => [item.targetId, item] as const),
);

const NEUTRAL_SURFACE_BY_KEY = new Map(
  NEUTRAL_OBSERVATION_SURFACE_FR312A
    .map((item) => [item.featureKey, item] as const),
);

function candidateFeatureKeysForObservationKind(
  featureKeys: readonly string[],
  observationKind: DirectRuleObservationKindFR312B,
): readonly string[] {
  if (observationKind === 'color') {
    return Object.freeze(
      featureKeys.filter((key) => key.includes('color')).sort(),
    );
  }
  if (observationKind === 'hair') {
    return Object.freeze(
      featureKeys
        .filter((key) => key.includes('hair') || key.includes('density'))
        .sort(),
    );
  }
  if (observationKind === 'front_visibility') {
    return Object.freeze(
      featureKeys.filter((key) => key.includes('visible_boundary')).sort(),
    );
  }
  if (
    observationKind === 'surface_mark' ||
    observationKind === 'wrinkle_or_line' ||
    observationKind === 'dynamic_behavior' ||
    observationKind === 'cross_region_context' ||
    observationKind === 'relative_position'
  ) {
    return Object.freeze([]);
  }

  return Object.freeze([...featureKeys].sort());
}

function classifyDisposition(input: Readonly<{
  permanentlyUnsupportedProductQuery: boolean;
  certainty: 'direct_clear' | 'phrase_uncertain';
  observationKind: DirectRuleObservationKindFR312B;
  materializedCandidateFeatureKeys: readonly string[];
}>): DirectRuleStudyDispositionFR312B {
  if (input.permanentlyUnsupportedProductQuery) {
    return 'binding_prohibited';
  }
  if (input.certainty === 'phrase_uncertain') {
    return 'phrase_uncertain_manual_only';
  }
  if (
    input.observationKind === 'cross_region_context' ||
    input.observationKind === 'dynamic_behavior'
  ) {
    return 'manual_context_or_behavior_only';
  }
  if (input.observationKind === null) {
    return input.materializedCandidateFeatureKeys.length > 0
      ? 'construct_mapping_required'
      : 'observation_surface_gap';
  }
  if (
    input.observationKind === 'morphology' &&
    input.materializedCandidateFeatureKeys.length > 0
  ) {
    return 'single_region_surface_candidate';
  }
  return 'observation_surface_gap';
}

const RULE_SEEDS_FR312B: readonly RuleSeedFR312B[] = Object.freeze([
  ...FACE_DIRECT_RULE_EVIDENCE_FR311J.map((item) => Object.freeze({
    ruleId: item.ruleId,
    evidenceId: item.evidenceId,
    sourceLayer: 'fr311j' as const,
    regionKey: item.regionScope,
    observationKind: item.observationKind,
    certainty: item.certainty,
  })),
  ...EAR_DIRECT_RULE_EVIDENCE_FR311O.map((item) => Object.freeze({
    ruleId: item.ruleId,
    evidenceId: item.evidenceId,
    sourceLayer: 'fr311o' as const,
    regionKey: item.region,
    observationKind: item.observationKind,
    certainty: item.certainty,
  })),
]);

export const DIRECT_RULE_STUDY_TRIAGE_FR312B:
readonly DirectRuleStudyTriageFR312B[] = Object.freeze(
  RULE_SEEDS_FR312B.map((rule) => {
    const authority = DIRECT_RULE_AUTHORITY.get(rule.ruleId);
    if (authority === undefined) {
      throw new Error('fr312b_missing_fr312a_direct_rule:' + rule.ruleId);
    }

    const candidateNeutralFeatureKeys =
      candidateFeatureKeysForObservationKind(
        authority.candidateNeutralFeatureKeys,
        rule.observationKind,
      );

    const materializedCandidateFeatureKeys = Object.freeze(
      candidateNeutralFeatureKeys.filter((featureKey) => {
        const surface = NEUTRAL_SURFACE_BY_KEY.get(featureKey);
        if (surface === undefined) {
          throw new Error(
            'fr312b_unknown_neutral_feature:' +
            rule.ruleId + ':' + featureKey,
          );
        }
        return surface.implementationState ===
          'canonical_extractor_materialized';
      }),
    );

    const disposition = classifyDisposition({
      permanentlyUnsupportedProductQuery:
        authority.permanentlyUnsupportedProductQuery,
      certainty: rule.certainty,
      observationKind: rule.observationKind,
      materializedCandidateFeatureKeys,
    });

    return Object.freeze({
      ruleId: rule.ruleId,
      evidenceId: rule.evidenceId,
      sourceLayer: rule.sourceLayer,
      regionKey: rule.regionKey,
      observationKind: rule.observationKind,
      certainty: rule.certainty,
      disposition,
      candidateNeutralFeatureKeys,
      materializedCandidateFeatureKeys,
      permanentlyUnsupportedProductQuery:
        authority.permanentlyUnsupportedProductQuery,
      sameRegionCandidateOnly: true as const,
      neutralFeatureIsTraditionalEquivalenceProof: false as const,
      sourceGroundedEquivalenceRequired: true as const,
      observationValidationRequiredBeforeBinding: true as const,
      thresholdNeedAdjudicated: false as const,
      metricThresholdAuthorized: false as const,
      populationNormAuthorized: false as const,
      automaticTraditionalBindingAuthorized: false as const,
      traditionalRuleInferenceAuthorized: false as const,
      productInterpretationAuthorized: false as const,
      modernScientificFactAuthorized: false as const,
    });
  }),
);

function countDisposition(
  disposition: DirectRuleStudyDispositionFR312B,
): number {
  return DIRECT_RULE_STUDY_TRIAGE_FR312B
    .filter((item) => item.disposition === disposition)
    .length;
}

export const FR312B_SHORTLIST = Object.freeze(
  DIRECT_RULE_STUDY_TRIAGE_FR312B
    .filter((item) => item.disposition === 'single_region_surface_candidate')
    .map((item) => Object.freeze({
      ruleId: item.ruleId,
      evidenceId: item.evidenceId,
      regionKey: item.regionKey,
      observationKind: item.observationKind,
      materializedCandidateFeatureKeys: Object.freeze([
        ...item.materializedCandidateFeatureKeys,
      ]),
      automaticTraditionalBindingAuthorized: false as const,
      sourceGroundedEquivalenceRequired: true as const,
      observationValidationRequiredBeforeBinding: true as const,
      thresholdNeedAdjudicated: false as const,
    })),
);

export const FR312B_TRIAGE_SUMMARY = Object.freeze({
  directRules: DIRECT_RULE_STUDY_TRIAGE_FR312B.length,
  singleRegionSurfaceCandidates:
    countDisposition('single_region_surface_candidate'),
  constructMappingRequired:
    countDisposition('construct_mapping_required'),
  observationSurfaceGap:
    countDisposition('observation_surface_gap'),
  manualContextOrBehaviorOnly:
    countDisposition('manual_context_or_behavior_only'),
  phraseUncertainManualOnly:
    countDisposition('phrase_uncertain_manual_only'),
  bindingProhibited:
    countDisposition('binding_prohibited'),
  shortlistCount: FR312B_SHORTLIST.length,
  automaticTraditionalBindingsAuthorized: 0,
  thresholdNeedAdjudicated: 0,
  metricThresholdsAuthorized: 0,
});

export const FR312B_AUTHORITY_BOUNDARY = Object.freeze({
  automaticTraditionalBindingAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  neutralFeatureSemanticEquivalenceAssumed: false as const,
  automaticConstructMappingAuthorized: false as const,
  crossRegionInferenceAuthorized: false as const,
  dynamicBehaviorInferenceAuthorized: false as const,
  arbitraryMetricThresholdAuthorized: false as const,
  thresholdNeedInferenceAuthorized: false as const,
  thresholdTuningAuthorized: false as const,
  populationNormAuthorized: false as const,
  scoreAuthorized: false as const,
  rankAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
});

export function assertDirectRuleStudyTriageFR312B(): void {
  if (
    FR312A_BINDING_SUMMARY.directRules !== 230 ||
    DIRECT_RULE_STUDY_TRIAGE_FR312B.length !== 230
  ) {
    throw new Error('fr312b_direct_rule_count_drift');
  }

  const keys = DIRECT_RULE_STUDY_TRIAGE_FR312B
    .map((item) => item.ruleId);
  if (new Set(keys).size !== keys.length) {
    throw new Error('fr312b_duplicate_rule_id');
  }

  const dispositionTotal =
    FR312B_TRIAGE_SUMMARY.singleRegionSurfaceCandidates +
    FR312B_TRIAGE_SUMMARY.constructMappingRequired +
    FR312B_TRIAGE_SUMMARY.observationSurfaceGap +
    FR312B_TRIAGE_SUMMARY.manualContextOrBehaviorOnly +
    FR312B_TRIAGE_SUMMARY.phraseUncertainManualOnly +
    FR312B_TRIAGE_SUMMARY.bindingProhibited;

  if (dispositionTotal !== 230) {
    throw new Error(
      'fr312b_disposition_coverage_drift:' + dispositionTotal,
    );
  }

  if (
    FR312B_TRIAGE_SUMMARY.singleRegionSurfaceCandidates !== 68 ||
    FR312B_TRIAGE_SUMMARY.constructMappingRequired !== 46 ||
    FR312B_TRIAGE_SUMMARY.observationSurfaceGap !== 81 ||
    FR312B_TRIAGE_SUMMARY.manualContextOrBehaviorOnly !== 6 ||
    FR312B_TRIAGE_SUMMARY.phraseUncertainManualOnly !== 29 ||
    FR312B_TRIAGE_SUMMARY.bindingProhibited !== 0 ||
    FR312B_TRIAGE_SUMMARY.shortlistCount !== 68 ||
    FR312B_TRIAGE_SUMMARY.automaticTraditionalBindingsAuthorized !== 0 ||
    FR312B_TRIAGE_SUMMARY.thresholdNeedAdjudicated !== 0 ||
    FR312B_TRIAGE_SUMMARY.metricThresholdsAuthorized !== 0
  ) {
    throw new Error('fr312b_summary_baseline_drift');
  }

  for (const item of DIRECT_RULE_STUDY_TRIAGE_FR312B) {
    if (
      item.sameRegionCandidateOnly !== true ||
      item.neutralFeatureIsTraditionalEquivalenceProof !== false ||
      item.sourceGroundedEquivalenceRequired !== true ||
      item.observationValidationRequiredBeforeBinding !== true ||
      item.thresholdNeedAdjudicated !== false ||
      item.metricThresholdAuthorized !== false ||
      item.populationNormAuthorized !== false ||
      item.automaticTraditionalBindingAuthorized !== false ||
      item.traditionalRuleInferenceAuthorized !== false ||
      item.productInterpretationAuthorized !== false ||
      item.modernScientificFactAuthorized !== false
    ) {
      throw new Error(
        'fr312b_rule_authority_widening:' + item.ruleId,
      );
    }

    if (
      item.disposition === 'single_region_surface_candidate' &&
      (
        item.observationKind !== 'morphology' ||
        item.certainty !== 'direct_clear' ||
        item.permanentlyUnsupportedProductQuery ||
        item.materializedCandidateFeatureKeys.length === 0
      )
    ) {
      throw new Error(
        'fr312b_invalid_shortlist_candidate:' + item.ruleId,
      );
    }

    if (
      item.observationKind === null &&
      item.disposition === 'single_region_surface_candidate'
    ) {
      throw new Error(
        'fr312b_unstructured_construct_auto_shortlisted:' + item.ruleId,
      );
    }

    if (
      (
        item.observationKind === 'cross_region_context' ||
        item.observationKind === 'dynamic_behavior'
      ) &&
      item.disposition !== 'manual_context_or_behavior_only' &&
      item.disposition !== 'binding_prohibited' &&
      item.disposition !== 'phrase_uncertain_manual_only'
    ) {
      throw new Error(
        'fr312b_context_or_behavior_boundary_drift:' + item.ruleId,
      );
    }

    if (
      item.certainty === 'phrase_uncertain' &&
      !item.permanentlyUnsupportedProductQuery &&
      item.disposition !== 'phrase_uncertain_manual_only'
    ) {
      throw new Error(
        'fr312b_uncertain_rule_promoted:' + item.ruleId,
      );
    }

    if (
      item.permanentlyUnsupportedProductQuery &&
      item.disposition !== 'binding_prohibited'
    ) {
      throw new Error(
        'fr312b_sensitive_rule_reopened:' + item.ruleId,
      );
    }
  }

  for (const item of FR312B_SHORTLIST) {
    if (
      item.automaticTraditionalBindingAuthorized !== false ||
      item.sourceGroundedEquivalenceRequired !== true ||
      item.observationValidationRequiredBeforeBinding !== true ||
      item.thresholdNeedAdjudicated !== false ||
      item.materializedCandidateFeatureKeys.length === 0
    ) {
      throw new Error('fr312b_shortlist_boundary_drift:' + item.ruleId);
    }
  }

  for (const [key, flag] of Object.entries(FR312B_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr312b_global_authority_widening:' + key);
    }
  }
}
