import {
  FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT,
} from './traditional-expanded-static-observation-gap-audit-fr311v.js';
import {
  FR311W_TARGET_CONSTRUCT_RESEARCH,
} from './traditional-neutral-observation-construct-research-fr311w.js';
import {
  FR311X_REGION_MAP_TARGET_RESOLUTIONS,
} from './traditional-lineage-pinned-region-map-research-fr311x.js';
import {
  FR311Y_CAPTURE_PROTOCOLS,
} from './traditional-capture-scope-protocol-research-fr311y.js';

export type StaticResearchClosureLaneFR311Z =
  | 'neutral_construct_research_completed'
  | 'region_map_research_completed'
  | 'capture_protocol_research_completed'
  | 'manual_only_final'
  | 'semantic_only_final';

export type StaticResearchClosureConclusionFR311Z =
  | 'research_definition_completed'
  | 'source_limit_preserved'
  | 'manual_input_is_final_authority'
  | 'semantic_layer_only_is_final_authority';

export interface StaticResearchClosureEntryFR311Z {
  readonly targetId: string;
  readonly targetKind:
    | 'missing_region_direct_rule'
    | 'static_methodology_definition';
  readonly closureLane: StaticResearchClosureLaneFR311Z;
  readonly conclusion: StaticResearchClosureConclusionFR311Z;
  readonly researchComplete: true;
  readonly implementationComplete: false;
  readonly empiricalValidationStarted: false;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly providerLandmarkDirectBindingAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly populationNormAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modernScientificFactAuthorized: false;
}

const W_IDS = new Set(
  FR311W_TARGET_CONSTRUCT_RESEARCH.map((item) => item.targetId),
);

const X_BY_ID = new Map(
  FR311X_REGION_MAP_TARGET_RESOLUTIONS
    .map((item) => [item.targetId, item] as const),
);

const Y_IDS = new Set(
  FR311Y_CAPTURE_PROTOCOLS.map((item) => item.methodologyId),
);

function resolveClosure(
  target: typeof FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT[number],
): StaticResearchClosureEntryFR311Z {
  if (W_IDS.has(target.targetId)) {
    return Object.freeze({
      targetId: target.targetId,
      targetKind: target.targetKind,
      closureLane: 'neutral_construct_research_completed' as const,
      conclusion: 'research_definition_completed' as const,
      researchComplete: true as const,
      implementationComplete: false as const,
      empiricalValidationStarted: false as const,
      automaticTraditionalBindingAuthorized: false as const,
      providerLandmarkDirectBindingAuthorized: false as const,
      thresholdAuthorized: false as const,
      populationNormAuthorized: false as const,
      productInterpretationAuthorized: false as const,
      modernScientificFactAuthorized: false as const,
    });
  }

  const regionResolution = X_BY_ID.get(target.targetId);
  if (regionResolution !== undefined) {
    return Object.freeze({
      targetId: target.targetId,
      targetKind: target.targetKind,
      closureLane: 'region_map_research_completed' as const,
      conclusion:
        regionResolution.researchResolution ===
          'named_subregion_preserved_unresolved'
          ? 'source_limit_preserved' as const
          : 'research_definition_completed' as const,
      researchComplete: true as const,
      implementationComplete: false as const,
      empiricalValidationStarted: false as const,
      automaticTraditionalBindingAuthorized: false as const,
      providerLandmarkDirectBindingAuthorized: false as const,
      thresholdAuthorized: false as const,
      populationNormAuthorized: false as const,
      productInterpretationAuthorized: false as const,
      modernScientificFactAuthorized: false as const,
    });
  }

  if (Y_IDS.has(target.targetId)) {
    return Object.freeze({
      targetId: target.targetId,
      targetKind: target.targetKind,
      closureLane: 'capture_protocol_research_completed' as const,
      conclusion: 'research_definition_completed' as const,
      researchComplete: true as const,
      implementationComplete: false as const,
      empiricalValidationStarted: false as const,
      automaticTraditionalBindingAuthorized: false as const,
      providerLandmarkDirectBindingAuthorized: false as const,
      thresholdAuthorized: false as const,
      populationNormAuthorized: false as const,
      productInterpretationAuthorized: false as const,
      modernScientificFactAuthorized: false as const,
    });
  }

  if (target.nextResearchLane === 'manual_only') {
    return Object.freeze({
      targetId: target.targetId,
      targetKind: target.targetKind,
      closureLane: 'manual_only_final' as const,
      conclusion: 'manual_input_is_final_authority' as const,
      researchComplete: true as const,
      implementationComplete: false as const,
      empiricalValidationStarted: false as const,
      automaticTraditionalBindingAuthorized: false as const,
      providerLandmarkDirectBindingAuthorized: false as const,
      thresholdAuthorized: false as const,
      populationNormAuthorized: false as const,
      productInterpretationAuthorized: false as const,
      modernScientificFactAuthorized: false as const,
    });
  }

  if (target.nextResearchLane === 'semantic_only') {
    return Object.freeze({
      targetId: target.targetId,
      targetKind: target.targetKind,
      closureLane: 'semantic_only_final' as const,
      conclusion: 'semantic_layer_only_is_final_authority' as const,
      researchComplete: true as const,
      implementationComplete: false as const,
      empiricalValidationStarted: false as const,
      automaticTraditionalBindingAuthorized: false as const,
      providerLandmarkDirectBindingAuthorized: false as const,
      thresholdAuthorized: false as const,
      populationNormAuthorized: false as const,
      productInterpretationAuthorized: false as const,
      modernScientificFactAuthorized: false as const,
    });
  }

  throw new Error('fr311z_unresolved_research_target:' + target.targetId);
}

export const FR311Z_STATIC_RESEARCH_CLOSURE:
readonly StaticResearchClosureEntryFR311Z[] = Object.freeze(
  FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT.map(resolveClosure),
);

function countLane(lane: StaticResearchClosureLaneFR311Z): number {
  return FR311Z_STATIC_RESEARCH_CLOSURE
    .filter((item) => item.closureLane === lane).length;
}

function countConclusion(
  conclusion: StaticResearchClosureConclusionFR311Z,
): number {
  return FR311Z_STATIC_RESEARCH_CLOSURE
    .filter((item) => item.conclusion === conclusion).length;
}

export const FR311Z_RESEARCH_CLOSURE_SUMMARY = Object.freeze({
  totalExpandedStaticTargets:
    FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT.length,
  totalResearchClosures: FR311Z_STATIC_RESEARCH_CLOSURE.length,

  neutralConstructResearchCompleted:
    countLane('neutral_construct_research_completed'),
  regionMapResearchCompleted:
    countLane('region_map_research_completed'),
  captureProtocolResearchCompleted:
    countLane('capture_protocol_research_completed'),
  manualOnlyFinal:
    countLane('manual_only_final'),
  semanticOnlyFinal:
    countLane('semantic_only_final'),

  researchDefinitionCompleted:
    countConclusion('research_definition_completed'),
  sourceLimitPreserved:
    countConclusion('source_limit_preserved'),
  manualInputFinalAuthority:
    countConclusion('manual_input_is_final_authority'),
  semanticLayerOnlyFinalAuthority:
    countConclusion('semantic_layer_only_is_final_authority'),

  unresolvedResearchTargets: 0,
  implementationCompleteTargets: 0,
  empiricalValidationStartedTargets: 0,
  automaticTraditionalBindingsAuthorized: 0,
  providerLandmarkDirectBindingsAuthorized: 0,
  thresholdsAuthorized: 0,
  populationNormsAuthorized: 0,
  productInterpretationsAuthorized: 0,
});

export const FR311Z_AUTHORITY_BOUNDARY = Object.freeze({
  researchClosureImpliesExtractorImplementation: false as const,
  researchClosureImpliesNeutralGeometryOperationalization: false as const,
  researchClosureImpliesEmpiricalValidation: false as const,
  researchClosureImpliesTraditionalEquivalence: false as const,
  unresolvedSourceRegionMayBeFilledByDeveloperGuess: false as const,
  sourceLimitMayBeConvertedToInventedCoordinates: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  thresholdAuthorized: false as const,
  populationNormAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
});

export function assertStaticResearchClosureFR311Z(): void {
  if (
    FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT.length !== 46 ||
    FR311W_TARGET_CONSTRUCT_RESEARCH.length !== 22 ||
    FR311X_REGION_MAP_TARGET_RESOLUTIONS.length !== 17 ||
    FR311Y_CAPTURE_PROTOCOLS.length !== 4 ||
    FR311Z_STATIC_RESEARCH_CLOSURE.length !== 46
  ) {
    throw new Error('fr311z_baseline_count_drift');
  }

  const expectedIds = FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT
    .map((item) => item.targetKind + ':' + item.targetId)
    .sort();
  const actualIds = FR311Z_STATIC_RESEARCH_CLOSURE
    .map((item) => item.targetKind + ':' + item.targetId)
    .sort();

  if (
    new Set(actualIds).size !== 46 ||
    JSON.stringify(expectedIds) !== JSON.stringify(actualIds)
  ) {
    throw new Error('fr311z_closure_coverage_drift');
  }

  const laneIds = [
    ...FR311W_TARGET_CONSTRUCT_RESEARCH.map((item) => item.targetId),
    ...FR311X_REGION_MAP_TARGET_RESOLUTIONS.map((item) => item.targetId),
    ...FR311Y_CAPTURE_PROTOCOLS.map((item) => item.methodologyId),
    ...FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT
      .filter((item) =>
        item.nextResearchLane === 'manual_only' ||
        item.nextResearchLane === 'semantic_only')
      .map((item) => item.targetId),
  ];

  if (
    laneIds.length !== 46 ||
    new Set(laneIds).size !== 46
  ) {
    throw new Error('fr311z_lane_overlap_or_missing_target');
  }

  for (const item of FR311Z_STATIC_RESEARCH_CLOSURE) {
    if (
      item.researchComplete !== true ||
      item.implementationComplete !== false ||
      item.empiricalValidationStarted !== false ||
      item.automaticTraditionalBindingAuthorized !== false ||
      item.providerLandmarkDirectBindingAuthorized !== false ||
      item.thresholdAuthorized !== false ||
      item.populationNormAuthorized !== false ||
      item.productInterpretationAuthorized !== false ||
      item.modernScientificFactAuthorized !== false
    ) {
      throw new Error('fr311z_authority_drift:' + item.targetId);
    }
  }

  if (
    FR311Z_RESEARCH_CLOSURE_SUMMARY.totalExpandedStaticTargets !== 46 ||
    FR311Z_RESEARCH_CLOSURE_SUMMARY.totalResearchClosures !== 46 ||
    FR311Z_RESEARCH_CLOSURE_SUMMARY.neutralConstructResearchCompleted !== 22 ||
    FR311Z_RESEARCH_CLOSURE_SUMMARY.regionMapResearchCompleted !== 17 ||
    FR311Z_RESEARCH_CLOSURE_SUMMARY.captureProtocolResearchCompleted !== 4 ||
    FR311Z_RESEARCH_CLOSURE_SUMMARY.manualOnlyFinal !== 1 ||
    FR311Z_RESEARCH_CLOSURE_SUMMARY.semanticOnlyFinal !== 2 ||
    FR311Z_RESEARCH_CLOSURE_SUMMARY.unresolvedResearchTargets !== 0
  ) {
    throw new Error('fr311z_closure_summary_drift');
  }

  for (const [key, value] of Object.entries(FR311Z_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr311z_global_authority_widening:' + key);
    }
  }
}
