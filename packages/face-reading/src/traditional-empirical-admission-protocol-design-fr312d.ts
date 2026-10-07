import {
  FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT,
} from './traditional-expanded-static-observation-gap-audit-fr311v.js';
import {
  FR311W_TARGET_CONSTRUCT_RESEARCH,
  type TargetConstructResolutionFR311W,
} from './traditional-neutral-observation-construct-research-fr311w.js';
import {
  FR311X_REGION_MAP_TARGET_RESOLUTIONS,
} from './traditional-lineage-pinned-region-map-research-fr311x.js';
import {
  FR311Y_CAPTURE_PROTOCOLS,
} from './traditional-capture-scope-protocol-research-fr311y.js';
import {
  FR311Z_RESEARCH_CLOSURE_SUMMARY,
  FR311Z_STATIC_RESEARCH_CLOSURE,
} from './traditional-static-research-closure-fr311z.js';
import {
  FR312C_DIRECT_RULE_EQUIVALENCE_STUDY,
  FR312C_EQUIVALENCE_SUMMARY,
  type ResearchReadinessFR312C,
} from './traditional-direct-rule-equivalence-study-fr312c.js';

export type EmpiricalAdmissionSourceFR312D =
  | 'legacy_fr312c'
  | 'expanded_static_fr311z';

export type EmpiricalAdmissionDispositionFR312D =
  | 'morphology_only_pilot_candidate'
  | 'blocked_construct_definition'
  | 'blocked_additional_extractor'
  | 'blocked_source_observation_definition'
  | 'legacy_manual_only'
  | 'blocked_registered_surface_not_materialized'
  | 'blocked_source_to_visible_equivalence'
  | 'blocked_outside_v1_static_geometry'
  | 'blocked_ordinary_rgb_skeletal_proxy'
  | 'blocked_region_map_operationalization'
  | 'blocked_capture_scope'
  | 'manual_only_final'
  | 'semantic_only_final';

export interface EmpiricalAdmissionEntryFR312D {
  readonly admissionId: string;
  readonly sourceTrack: EmpiricalAdmissionSourceFR312D;
  readonly targetId: string;
  readonly targetKind: string;
  readonly disposition: EmpiricalAdmissionDispositionFR312D;
  readonly morphologyOnlyPilotEligible: boolean;
  readonly blockingReasons: readonly string[];
  readonly candidateNeutralFeatureKeys: readonly string[];
  readonly researchComplete: boolean;
  readonly empiricalExecutionStarted: false;
  readonly semanticClaimValidationAuthorized: false;
  readonly thresholdDiscoveryAuthorizedByThisStage: false;
  readonly thresholdValueAuthorized: false;
  readonly populationNormAuthorized: false;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly providerLandmarkDirectBindingAuthorized: false;
  readonly scoreAuthorized: false;
  readonly rankAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modernScientificFactAuthorized: false;
}

export type PilotEvaluationDimensionFR312D =
  | 'manual_morphology_label_repeatability'
  | 'inter_rater_morphology_agreement'
  | 'repeat_capture_metric_stability'
  | 'capture_condition_robustness'
  | 'held_out_metric_label_association'
  | 'false_positive_false_negative_review';

export interface MorphologyOnlyPilotProtocolFR312D {
  readonly protocolId: 'fr312d.morphology_only_pilot';
  readonly candidateRuleIds: readonly string[];
  readonly annotationContract:
    'source_bounded_morphology_predicate_only';
  readonly semanticClaimVisibleToAnnotator: false;
  readonly neutralMetricVisibleToAnnotator: false;
  readonly productOutcomeVisibleToAnnotator: false;
  readonly requiredPartitions: readonly [
    'development',
    'calibration',
    'holdout',
  ];
  readonly partitionRatiosAuthorized: false;
  readonly participantSamplingRuleAuthorized: false;
  readonly thresholdDiscoveryAuthorized: false;
  readonly thresholdValueAuthorized: false;
  readonly minimumAcceptanceValuesAuthorized: false;
  readonly evaluationDimensions:
    readonly PilotEvaluationDimensionFR312D[];
  readonly productionPromotionRequiresSeparateReview: true;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly semanticClaimValidationAuthorized: false;
  readonly empiricalExecutionStarted: false;
}

const W_BY_ID = new Map(
  FR311W_TARGET_CONSTRUCT_RESEARCH
    .map((item) => [item.targetId, item] as const),
);

const X_BY_ID = new Map(
  FR311X_REGION_MAP_TARGET_RESOLUTIONS
    .map((item) => [item.targetId, item] as const),
);

const Y_BY_ID = new Map(
  FR311Y_CAPTURE_PROTOCOLS
    .map((item) => [item.methodologyId, item] as const),
);

function legacyDisposition(
  readiness: ResearchReadinessFR312C,
): EmpiricalAdmissionDispositionFR312D {
  switch (readiness) {
    case 'empirical_protocol_candidate':
      return 'morphology_only_pilot_candidate';
    case 'construct_definition_required':
      return 'blocked_construct_definition';
    case 'additional_extractor_required':
      return 'blocked_additional_extractor';
    case 'source_definition_required':
      return 'blocked_source_observation_definition';
    case 'manual_only':
      return 'legacy_manual_only';
  }
}

function expandedNeutralDisposition(
  resolution: TargetConstructResolutionFR311W,
): EmpiricalAdmissionDispositionFR312D {
  switch (resolution) {
    case 'components_defined_registered_surface_not_materialized':
      return 'blocked_registered_surface_not_materialized';
    case 'components_defined_extractor_research_required':
      return 'blocked_additional_extractor';
    case 'components_defined_existing_geometry_only':
      return 'blocked_source_to_visible_equivalence';
    case 'partial_geometry_only_out_of_scope_component':
      return 'blocked_outside_v1_static_geometry';
    case 'ordinary_rgb_skeletal_proxy_rejected':
      return 'blocked_ordinary_rgb_skeletal_proxy';
  }
}

function entry(
  sourceTrack: EmpiricalAdmissionSourceFR312D,
  targetId: string,
  targetKind: string,
  disposition: EmpiricalAdmissionDispositionFR312D,
  blockingReasons: readonly string[],
  candidateNeutralFeatureKeys: readonly string[],
  researchComplete: boolean,
): EmpiricalAdmissionEntryFR312D {
  return Object.freeze({
    admissionId: 'fr312d.' + sourceTrack + '.' + targetKind + '.' + targetId,
    sourceTrack,
    targetId,
    targetKind,
    disposition,
    morphologyOnlyPilotEligible:
      disposition === 'morphology_only_pilot_candidate',
    blockingReasons: Object.freeze([...blockingReasons]),
    candidateNeutralFeatureKeys: Object.freeze([
      ...candidateNeutralFeatureKeys,
    ]),
    researchComplete,
    empiricalExecutionStarted: false as const,
    semanticClaimValidationAuthorized: false as const,
    thresholdDiscoveryAuthorizedByThisStage: false as const,
    thresholdValueAuthorized: false as const,
    populationNormAuthorized: false as const,
    automaticTraditionalBindingAuthorized: false as const,
    providerLandmarkDirectBindingAuthorized: false as const,
    scoreAuthorized: false as const,
    rankAuthorized: false as const,
    productInterpretationAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
  });
}

export const FR312D_LEGACY_ADMISSION:
readonly EmpiricalAdmissionEntryFR312D[] = Object.freeze(
  FR312C_DIRECT_RULE_EQUIVALENCE_STUDY.map((item) => {
    const disposition = legacyDisposition(item.researchReadiness);
    const reasons: string[] = [];

    switch (disposition) {
      case 'morphology_only_pilot_candidate':
        break;
      case 'blocked_construct_definition':
        reasons.push(
          'multi-feature construct definition remains required before empirical morphology equivalence can be tested',
        );
        break;
      case 'blocked_additional_extractor':
        reasons.push(
          'the required neutral observation construct is not materialized by the current extractor surface',
        );
        break;
      case 'blocked_source_observation_definition':
        reasons.push(
          'the source phrase is mismatched or insufficiently defined for a stable neutral measurement construct',
        );
        break;
      case 'legacy_manual_only':
        reasons.push(
          'traditional named or symbolic morphology remains manual-only after review',
        );
        break;
      default:
        throw new Error(
          'fr312d_unexpected_legacy_disposition:' + disposition,
        );
    }

    return entry(
      'legacy_fr312c',
      item.ruleId,
      'direct_rule',
      disposition,
      reasons,
      item.comparableNeutralFeatureKeys,
      true,
    );
  }),
);

export const FR312D_EXPANDED_STATIC_ADMISSION:
readonly EmpiricalAdmissionEntryFR312D[] = Object.freeze(
  FR311Z_STATIC_RESEARCH_CLOSURE.map((closure) => {
    const targetId = closure.targetId;

    switch (closure.closureLane) {
      case 'neutral_construct_research_completed': {
        const neutralResearch = W_BY_ID.get(targetId);
        if (neutralResearch === undefined) {
          throw new Error(
            'fr312d_missing_fr311w_target:' + targetId,
          );
        }

        const disposition = expandedNeutralDisposition(
          neutralResearch.resolution,
        );
        const reasons: string[] = [];

        switch (disposition) {
          case 'blocked_registered_surface_not_materialized':
            reasons.push(
              'the neutral surface is registered but is not yet a materialized extractor output',
            );
            break;
          case 'blocked_additional_extractor':
            reasons.push(
              'the source-bounded neutral construct is researched, but a new or extended extractor is still required',
            );
            break;
          case 'blocked_source_to_visible_equivalence':
            reasons.push(
              'existing neutral geometry is available but source-to-visible equivalence remains unestablished',
            );
            break;
          case 'blocked_outside_v1_static_geometry':
            reasons.push(
              'at least one required source component is outside the V1 static geometry scope',
            );
            break;
          case 'blocked_ordinary_rgb_skeletal_proxy':
            reasons.push(
              'ordinary RGB soft-tissue geometry is not an authorized proxy for the source skeletal wording',
            );
            break;
          default:
            throw new Error(
              'fr312d_unexpected_expanded_neutral_disposition:' +
              disposition,
            );
        }

        return entry(
          'expanded_static_fr311z',
          targetId,
          closure.targetKind,
          disposition,
          reasons,
          [
            ...neutralResearch.registeredFeatureKeys,
            ...neutralResearch.proposedConstructKeys,
          ],
          true,
        );
      }

      case 'region_map_research_completed': {
        const regionResearch = X_BY_ID.get(targetId);
        if (regionResearch === undefined) {
          throw new Error(
            'fr312d_missing_fr311x_target:' + targetId,
          );
        }

        return entry(
          'expanded_static_fr311z',
          targetId,
          closure.targetKind,
          'blocked_region_map_operationalization',
          [
            regionResearch.researchResolution ===
              'named_subregion_preserved_unresolved'
              ? 'the source-side named region is intentionally unresolved and no invented geometry is authorized'
              : 'the lineage-pinned source map exists, but no neutral geometry operationalization is authorized',
          ],
          [],
          true,
        );
      }

      case 'capture_protocol_research_completed': {
        const captureResearch = Y_BY_ID.get(targetId);
        if (captureResearch === undefined) {
          throw new Error(
            'fr312d_missing_fr311y_target:' + targetId,
          );
        }

        return entry(
          'expanded_static_fr311z',
          targetId,
          closure.targetKind,
          'blocked_capture_scope',
          [
            'the methodology is not complete under the current V1 static frontal-face input contract',
          ],
          [],
          true,
        );
      }

      case 'manual_only_final':
        return entry(
          'expanded_static_fr311z',
          targetId,
          closure.targetKind,
          'manual_only_final',
          [
            'manual traditional key is the final research authority; automatic named-form classification is not authorized',
          ],
          [],
          true,
        );

      case 'semantic_only_final':
        return entry(
          'expanded_static_fr311z',
          targetId,
          closure.targetKind,
          'semantic_only_final',
          [
            'the target is interpretive routing/semantic structure and has no standalone observation-binding predicate',
          ],
          [],
          true,
        );
    }
  }),
);

export const FR312D_EMPIRICAL_ADMISSION_MATRIX:
readonly EmpiricalAdmissionEntryFR312D[] = Object.freeze([
  ...FR312D_LEGACY_ADMISSION,
  ...FR312D_EXPANDED_STATIC_ADMISSION,
]);

export const FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL:
MorphologyOnlyPilotProtocolFR312D = Object.freeze({
  protocolId: 'fr312d.morphology_only_pilot',
  candidateRuleIds: Object.freeze(
    FR312D_LEGACY_ADMISSION
      .filter((item) => item.morphologyOnlyPilotEligible)
      .map((item) => item.targetId)
      .sort(),
  ),
  annotationContract: 'source_bounded_morphology_predicate_only',
  semanticClaimVisibleToAnnotator: false,
  neutralMetricVisibleToAnnotator: false,
  productOutcomeVisibleToAnnotator: false,
  requiredPartitions: Object.freeze([
    'development',
    'calibration',
    'holdout',
  ] as const),
  partitionRatiosAuthorized: false,
  participantSamplingRuleAuthorized: false,
  thresholdDiscoveryAuthorized: false,
  thresholdValueAuthorized: false,
  minimumAcceptanceValuesAuthorized: false,
  evaluationDimensions: Object.freeze([
    'manual_morphology_label_repeatability',
    'inter_rater_morphology_agreement',
    'repeat_capture_metric_stability',
    'capture_condition_robustness',
    'held_out_metric_label_association',
    'false_positive_false_negative_review',
  ] as const),
  productionPromotionRequiresSeparateReview: true,
  automaticTraditionalBindingAuthorized: false,
  semanticClaimValidationAuthorized: false,
  empiricalExecutionStarted: false,
});

function countDisposition(
  disposition: EmpiricalAdmissionDispositionFR312D,
): number {
  return FR312D_EMPIRICAL_ADMISSION_MATRIX
    .filter((item) => item.disposition === disposition)
    .length;
}

export const FR312D_ADMISSION_SUMMARY = Object.freeze({
  legacyTargets: FR312D_LEGACY_ADMISSION.length,
  expandedStaticTargets: FR312D_EXPANDED_STATIC_ADMISSION.length,
  totalAdmissionTargets: FR312D_EMPIRICAL_ADMISSION_MATRIX.length,

  morphologyOnlyPilotCandidates:
    countDisposition('morphology_only_pilot_candidate'),
  legacyConstructDefinitionBlocked:
    countDisposition('blocked_construct_definition'),
  totalAdditionalExtractorBlocked:
    countDisposition('blocked_additional_extractor'),
  legacySourceDefinitionBlocked:
    countDisposition('blocked_source_observation_definition'),
  legacyManualOnly:
    countDisposition('legacy_manual_only'),

  expandedRegisteredSurfaceNotMaterialized:
    countDisposition('blocked_registered_surface_not_materialized'),
  expandedSourceToVisibleEquivalenceBlocked:
    countDisposition('blocked_source_to_visible_equivalence'),
  expandedOutsideV1StaticGeometry:
    countDisposition('blocked_outside_v1_static_geometry'),
  expandedOrdinaryRgbSkeletalProxyRejected:
    countDisposition('blocked_ordinary_rgb_skeletal_proxy'),
  expandedRegionMapOperationalizationBlocked:
    countDisposition('blocked_region_map_operationalization'),
  expandedCaptureScopeBlocked:
    countDisposition('blocked_capture_scope'),
  expandedManualOnlyFinal:
    countDisposition('manual_only_final'),
  expandedSemanticOnlyFinal:
    countDisposition('semantic_only_final'),

  expandedImmediatePilotCandidates:
    FR312D_EXPANDED_STATIC_ADMISSION
      .filter((item) => item.morphologyOnlyPilotEligible)
      .length,

  empiricalExecutionStartedTargets: 0,
  semanticClaimValidationsAuthorized: 0,
  thresholdDiscoveriesAuthorized: 0,
  thresholdValuesAuthorized: 0,
  populationNormsAuthorized: 0,
  automaticTraditionalBindingsAuthorized: 0,
  productInterpretationsAuthorized: 0,
});

export const FR312D_AUTHORITY_BOUNDARY = Object.freeze({
  empiricalExecutionAuthorized: false as const,
  semanticClaimValidationAuthorized: false as const,
  thresholdDiscoveryAuthorized: false as const,
  thresholdValueAuthorized: false as const,
  partitionRatioAuthorized: false as const,
  participantSamplingRuleAuthorized: false as const,
  minimumAcceptanceValueAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  populationNormAuthorized: false as const,
  scoreAuthorized: false as const,
  rankAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  modernPsychologyFactAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  mortalityPredictionAuthorized: false as const,
  intelligenceInferenceAuthorized: false as const,
  abilityInferenceAuthorized: false as const,
  sexualityInferenceAuthorized: false as const,
  moralityInferenceAuthorized: false as const,
  criminalityInferenceAuthorized: false as const,
});

export function assertEmpiricalAdmissionProtocolDesignFR312D(): void {
  if (
    FR311Z_RESEARCH_CLOSURE_SUMMARY.totalExpandedStaticTargets !== 46 ||
    FR311Z_RESEARCH_CLOSURE_SUMMARY.totalResearchClosures !== 46 ||
    FR311Z_RESEARCH_CLOSURE_SUMMARY.unresolvedResearchTargets !== 0
  ) {
    throw new Error('fr312d_static_research_closure_not_satisfied');
  }

  if (
    FR312C_DIRECT_RULE_EQUIVALENCE_STUDY.length !== 68 ||
    FR312C_EQUIVALENCE_SUMMARY.nextEmpiricalProtocolCandidates !== 10 ||
    FR312D_LEGACY_ADMISSION.length !== 68 ||
    FR312D_EXPANDED_STATIC_ADMISSION.length !== 46 ||
    FR312D_EMPIRICAL_ADMISSION_MATRIX.length !== 114
  ) {
    throw new Error('fr312d_admission_population_drift');
  }

  const admissionIds = FR312D_EMPIRICAL_ADMISSION_MATRIX
    .map((item) => item.admissionId);
  if (
    admissionIds.length !== 114 ||
    new Set(admissionIds).size !== admissionIds.length
  ) {
    throw new Error('fr312d_duplicate_admission_id');
  }

  const legacyIds = new Set(
    FR312C_DIRECT_RULE_EQUIVALENCE_STUDY
      .map((item) => item.ruleId),
  );
  const expandedIds = new Set(
    FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT
      .map((item) => item.targetId),
  );

  if (
    legacyIds.size !== 68 ||
    expandedIds.size !== 46 ||
    [...legacyIds].some((id) => expandedIds.has(id))
  ) {
    throw new Error('fr312d_target_universe_overlap_or_drift');
  }

  for (const item of FR312D_EMPIRICAL_ADMISSION_MATRIX) {
    if (
      item.empiricalExecutionStarted !== false ||
      item.semanticClaimValidationAuthorized !== false ||
      item.thresholdDiscoveryAuthorizedByThisStage !== false ||
      item.thresholdValueAuthorized !== false ||
      item.populationNormAuthorized !== false ||
      item.automaticTraditionalBindingAuthorized !== false ||
      item.providerLandmarkDirectBindingAuthorized !== false ||
      item.scoreAuthorized !== false ||
      item.rankAuthorized !== false ||
      item.productInterpretationAuthorized !== false ||
      item.modernScientificFactAuthorized !== false
    ) {
      throw new Error('fr312d_authority_widening:' + item.targetId);
    }

    if (
      item.morphologyOnlyPilotEligible !==
      (item.disposition === 'morphology_only_pilot_candidate')
    ) {
      throw new Error('fr312d_pilot_flag_drift:' + item.targetId);
    }

    if (
      !item.morphologyOnlyPilotEligible &&
      item.blockingReasons.length === 0
    ) {
      throw new Error('fr312d_blocked_without_reason:' + item.targetId);
    }
  }

  if (
    FR312D_ADMISSION_SUMMARY.morphologyOnlyPilotCandidates !== 10 ||
    FR312D_ADMISSION_SUMMARY.legacyConstructDefinitionBlocked !== 18 ||
    FR312D_ADMISSION_SUMMARY.totalAdditionalExtractorBlocked !== 36 ||
    FR312D_ADMISSION_SUMMARY.legacySourceDefinitionBlocked !== 16 ||
    FR312D_ADMISSION_SUMMARY.legacyManualOnly !== 3 ||
    FR312D_ADMISSION_SUMMARY.expandedRegisteredSurfaceNotMaterialized !== 3 ||
    FR312D_ADMISSION_SUMMARY.expandedSourceToVisibleEquivalenceBlocked !== 0 ||
    FR312D_ADMISSION_SUMMARY.expandedOutsideV1StaticGeometry !== 1 ||
    FR312D_ADMISSION_SUMMARY.expandedOrdinaryRgbSkeletalProxyRejected !== 3 ||
    FR312D_ADMISSION_SUMMARY.expandedRegionMapOperationalizationBlocked !== 17 ||
    FR312D_ADMISSION_SUMMARY.expandedCaptureScopeBlocked !== 4 ||
    FR312D_ADMISSION_SUMMARY.expandedManualOnlyFinal !== 1 ||
    FR312D_ADMISSION_SUMMARY.expandedSemanticOnlyFinal !== 2 ||
    FR312D_ADMISSION_SUMMARY.expandedImmediatePilotCandidates !== 0
  ) {
    throw new Error('fr312d_admission_distribution_drift');
  }

  const pilot = FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL;
  if (
    pilot.candidateRuleIds.length !== 10 ||
    pilot.semanticClaimVisibleToAnnotator !== false ||
    pilot.neutralMetricVisibleToAnnotator !== false ||
    pilot.productOutcomeVisibleToAnnotator !== false ||
    pilot.partitionRatiosAuthorized !== false ||
    pilot.participantSamplingRuleAuthorized !== false ||
    pilot.thresholdDiscoveryAuthorized !== false ||
    pilot.thresholdValueAuthorized !== false ||
    pilot.minimumAcceptanceValuesAuthorized !== false ||
    pilot.productionPromotionRequiresSeparateReview !== true ||
    pilot.automaticTraditionalBindingAuthorized !== false ||
    pilot.semanticClaimValidationAuthorized !== false ||
    pilot.empiricalExecutionStarted !== false
  ) {
    throw new Error('fr312d_pilot_protocol_authority_drift');
  }

  for (const [key, flag] of Object.entries(FR312D_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr312d_global_authority_widening:' + key);
    }
  }
}
