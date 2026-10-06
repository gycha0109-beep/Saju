import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  type FR282Readiness,
  type FR282RegionKey,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
  FACE_NAMED_FORM_EVIDENCE_FR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  EAR_DIRECT_RULE_EVIDENCE_FR311O,
  EAR_NAMED_FORM_EVIDENCE_FR311O,
} from './traditional-face-ear-evidence-index-fr311o.js';
import {
  COMBINATION_KEY_OWNERSHIP_FR311P,
  FR311P_EVIDENCE_INVENTORY,
  RELATION_KEY_OWNERSHIP_FR311P,
} from './traditional-face-evidence-integrity-fr311p.js';
import {
  FACE_LENS_GAP_ADJUDICATIONS_FR311Q,
  FR311Q_GAP_SUMMARY,
} from './traditional-face-lens-gap-adjudication-fr311q.js';

export type ObservationBindingStatusFR312A =
  | 'direct_binding_authorized'
  | 'conditional_binding_candidate'
  | 'manual_input_only'
  | 'binding_prohibited'
  | 'semantic_only_no_observation_binding';

export type TraditionalBindingTargetKindFR312A =
  | 'named_form'
  | 'named_claim'
  | 'direct_rule'
  | 'relation_key'
  | 'combination_key';

export interface NeutralObservationSurfaceFR312A {
  readonly featureKey: string;
  readonly regionKey: FR282RegionKey;
  readonly readiness: FR282Readiness;
  readonly implementationState: string;
  readonly traditionalBindingIssued: false;
  readonly classificationIssued: false;
  readonly thresholdIssued: false;
  readonly neutralObservationOnly: true;
}

export interface TraditionalBindingTargetFR312A {
  readonly targetKind: TraditionalBindingTargetKindFR312A;
  readonly targetId: string;
  readonly regionKeys: readonly string[];
  readonly bindingStatus: ObservationBindingStatusFR312A;
  readonly candidateNeutralFeatureKeys: readonly string[];
  readonly candidateNeutralFeaturesAreEquivalenceProof: false;
  readonly explicitTraditionalKeyRequiredUntilPromotion: true;
  readonly automaticBindingAuthorized: false;
  readonly providerLandmarkDirectBindingAuthorized: false;
  readonly metricThresholdAuthorized: false;
  readonly populationNormAuthorized: false;
  readonly namedFormClassifierAuthorized: false;
  readonly relationInferenceAuthorized: false;
  readonly combinationInferenceAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modernScientificFactAuthorized: false;
  readonly permanentlyUnsupportedProductQuery: boolean;
  readonly requiresSourceGroundedEquivalenceDefinition: boolean;
  readonly requiresObservationValidationEvidence: boolean;
  readonly requiresExplicitParticipantMapping: boolean;
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)].sort();
}

const productColumnByFeature = new Map(
  FR293_PRODUCT_COLUMN_MAP.map((item) => [item.featureKey, item]),
);

export const NEUTRAL_OBSERVATION_SURFACE_FR312A:
readonly NeutralObservationSurfaceFR312A[] = Object.freeze(
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282.featureEntries
    .map((entry) => {
      const productColumn = productColumnByFeature.get(entry.featureKey as never);
      if (productColumn === undefined) {
        throw new Error('fr312a_missing_fr293_product_column:' + entry.featureKey);
      }
      return Object.freeze({
        featureKey: entry.featureKey,
        regionKey: entry.regionKey,
        readiness: entry.readiness,
        implementationState: productColumn.implementationState,
        traditionalBindingIssued: false as const,
        classificationIssued: false as const,
        thresholdIssued: false as const,
        neutralObservationOnly: true as const,
      });
    }),
);

function featureKeysForRegion(region: string): readonly string[] {
  let regionKeys: readonly FR282RegionKey[];
  switch (region) {
    case 'eyebrow':
      regionKeys = ['eyebrow'];
      break;
    case 'eye':
      regionKeys = ['eye_pair'];
      break;
    case 'eyebrow_eye':
      regionKeys = ['eyebrow', 'eye_pair'];
      break;
    case 'nose':
      regionKeys = ['nose'];
      break;
    case 'philtrum':
    case 'mouth':
    case 'mouth_corner':
    case 'upper_lip':
    case 'lower_lip':
    case 'lips':
      regionKeys = ['mouth_lips'];
      break;
    case 'ear':
    case 'ear_whole':
    case 'lun':
    case 'kuo':
    case 'ear_gate':
    case 'earlobe':
    case 'ear_root':
    case 'mingmen':
    case 'tianlun':
    case 'lower_ear_bone':
      regionKeys = ['ear'];
      break;
    default:
      regionKeys = [];
      break;
  }

  return Object.freeze(
    NEUTRAL_OBSERVATION_SURFACE_FR312A
      .filter((item) => regionKeys.includes(item.regionKey))
      .map((item) => item.featureKey)
      .sort(),
  );
}

function target(
  input: Omit<
    TraditionalBindingTargetFR312A,
    | 'candidateNeutralFeaturesAreEquivalenceProof'
    | 'explicitTraditionalKeyRequiredUntilPromotion'
    | 'automaticBindingAuthorized'
    | 'providerLandmarkDirectBindingAuthorized'
    | 'metricThresholdAuthorized'
    | 'populationNormAuthorized'
    | 'namedFormClassifierAuthorized'
    | 'relationInferenceAuthorized'
    | 'combinationInferenceAuthorized'
    | 'productInterpretationAuthorized'
    | 'modernScientificFactAuthorized'
  >,
): TraditionalBindingTargetFR312A {
  return Object.freeze({
    ...input,
    regionKeys: Object.freeze([...input.regionKeys]),
    candidateNeutralFeatureKeys: Object.freeze([...input.candidateNeutralFeatureKeys]),
    candidateNeutralFeaturesAreEquivalenceProof: false as const,
    explicitTraditionalKeyRequiredUntilPromotion: true as const,
    automaticBindingAuthorized: false as const,
    providerLandmarkDirectBindingAuthorized: false as const,
    metricThresholdAuthorized: false as const,
    populationNormAuthorized: false as const,
    namedFormClassifierAuthorized: false as const,
    relationInferenceAuthorized: false as const,
    combinationInferenceAuthorized: false as const,
    productInterpretationAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
  });
}

const PERMANENTLY_UNSUPPORTED_EVIDENCE_IDS = new Set(
  FACE_LENS_GAP_ADJUDICATIONS_FR311Q
    .filter((item) => item.disposition === 'permanently_unsupported_product_query')
    .map((item) => item.evidenceId),
);

type NamedFormSeed = Readonly<{
  formKey: string;
  region: string;
}>;

const NAMED_FORM_SEEDS = (() => {
  const byForm = new Map<string, string>();
  const all: readonly NamedFormSeed[] = [
    ...FACE_NAMED_FORM_EVIDENCE_FR311J.map((item) => ({
      formKey: item.formKey,
      region: item.region,
    })),
    ...EAR_NAMED_FORM_EVIDENCE_FR311O.map((item) => ({
      formKey: item.formKey,
      region: 'ear',
    })),
  ];

  for (const item of all) {
    const previous = byForm.get(item.formKey);
    if (previous !== undefined && previous !== item.region) {
      throw new Error(
        'fr312a_named_form_region_conflict:' +
        item.formKey + ':' + previous + ':' + item.region,
      );
    }
    byForm.set(item.formKey, item.region);
  }

  return Object.freeze(
    [...byForm.entries()]
      .map(([formKey, region]) => Object.freeze({ formKey, region }))
      .sort((a, b) => a.formKey.localeCompare(b.formKey)),
  );
})();

const NAMED_FORM_TARGETS: readonly TraditionalBindingTargetFR312A[] =
  Object.freeze(
    NAMED_FORM_SEEDS.map((item) =>
      target({
        targetKind: 'named_form',
        targetId: item.formKey,
        regionKeys: [item.region],
        bindingStatus: 'manual_input_only',
        candidateNeutralFeatureKeys: featureKeysForRegion(item.region),
        permanentlyUnsupportedProductQuery: false,
        requiresSourceGroundedEquivalenceDefinition: true,
        requiresObservationValidationEvidence: true,
        requiresExplicitParticipantMapping: false,
      })),
  );

const NAMED_CLAIM_TARGETS: readonly TraditionalBindingTargetFR312A[] =
  Object.freeze([
    ...FACE_NAMED_FORM_EVIDENCE_FR311J.map((item) =>
      target({
        targetKind: 'named_claim',
        targetId: item.evidenceId,
        regionKeys: [item.region],
        bindingStatus: PERMANENTLY_UNSUPPORTED_EVIDENCE_IDS.has(item.evidenceId)
          ? 'binding_prohibited'
          : 'semantic_only_no_observation_binding',
        candidateNeutralFeatureKeys: [],
        permanentlyUnsupportedProductQuery:
          PERMANENTLY_UNSUPPORTED_EVIDENCE_IDS.has(item.evidenceId),
        requiresSourceGroundedEquivalenceDefinition: false,
        requiresObservationValidationEvidence: false,
        requiresExplicitParticipantMapping: false,
      })),
    ...EAR_NAMED_FORM_EVIDENCE_FR311O.map((item) =>
      target({
        targetKind: 'named_claim',
        targetId: item.evidenceId,
        regionKeys: ['ear'],
        bindingStatus: PERMANENTLY_UNSUPPORTED_EVIDENCE_IDS.has(item.evidenceId)
          ? 'binding_prohibited'
          : 'semantic_only_no_observation_binding',
        candidateNeutralFeatureKeys: [],
        permanentlyUnsupportedProductQuery:
          PERMANENTLY_UNSUPPORTED_EVIDENCE_IDS.has(item.evidenceId),
        requiresSourceGroundedEquivalenceDefinition: false,
        requiresObservationValidationEvidence: false,
        requiresExplicitParticipantMapping: false,
      })),
  ]);

const DIRECT_RULE_TARGETS: readonly TraditionalBindingTargetFR312A[] =
  Object.freeze([
    ...FACE_DIRECT_RULE_EVIDENCE_FR311J.map((item) =>
      target({
        targetKind: 'direct_rule',
        targetId: item.ruleId,
        regionKeys: [item.regionScope],
        bindingStatus: 'conditional_binding_candidate',
        candidateNeutralFeatureKeys: featureKeysForRegion(item.regionScope),
        permanentlyUnsupportedProductQuery:
          PERMANENTLY_UNSUPPORTED_EVIDENCE_IDS.has(item.evidenceId),
        requiresSourceGroundedEquivalenceDefinition: true,
        requiresObservationValidationEvidence: true,
        requiresExplicitParticipantMapping: item.regionScope === 'eyebrow_eye',
      })),
    ...EAR_DIRECT_RULE_EVIDENCE_FR311O.map((item) =>
      target({
        targetKind: 'direct_rule',
        targetId: item.ruleId,
        regionKeys: [item.region],
        bindingStatus: 'conditional_binding_candidate',
        candidateNeutralFeatureKeys: featureKeysForRegion(item.region),
        permanentlyUnsupportedProductQuery:
          PERMANENTLY_UNSUPPORTED_EVIDENCE_IDS.has(item.evidenceId),
        requiresSourceGroundedEquivalenceDefinition: true,
        requiresObservationValidationEvidence: true,
        requiresExplicitParticipantMapping:
          item.observationKind === 'cross_region_context',
      })),
  ]);

const RELATION_TARGETS: readonly TraditionalBindingTargetFR312A[] =
  Object.freeze(
    RELATION_KEY_OWNERSHIP_FR311P.map((item) =>
      target({
        targetKind: 'relation_key',
        targetId: item.key,
        regionKeys: [],
        bindingStatus: 'conditional_binding_candidate',
        candidateNeutralFeatureKeys: [],
        permanentlyUnsupportedProductQuery: false,
        requiresSourceGroundedEquivalenceDefinition: true,
        requiresObservationValidationEvidence: true,
        requiresExplicitParticipantMapping: true,
      })),
  );

const COMBINATION_TARGETS: readonly TraditionalBindingTargetFR312A[] =
  Object.freeze(
    COMBINATION_KEY_OWNERSHIP_FR311P.map((item) =>
      target({
        targetKind: 'combination_key',
        targetId: item.key,
        regionKeys: [],
        bindingStatus: 'manual_input_only',
        candidateNeutralFeatureKeys: [],
        permanentlyUnsupportedProductQuery: false,
        requiresSourceGroundedEquivalenceDefinition: true,
        requiresObservationValidationEvidence: true,
        requiresExplicitParticipantMapping: true,
      })),
  );

export const TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A:
readonly TraditionalBindingTargetFR312A[] = Object.freeze([
  ...NAMED_FORM_TARGETS,
  ...NAMED_CLAIM_TARGETS,
  ...DIRECT_RULE_TARGETS,
  ...RELATION_TARGETS,
  ...COMBINATION_TARGETS,
]);

function countStatus(status: ObservationBindingStatusFR312A): number {
  return TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A
    .filter((item) => item.bindingStatus === status)
    .length;
}

function countKind(kind: TraditionalBindingTargetKindFR312A): number {
  return TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A
    .filter((item) => item.targetKind === kind)
    .length;
}

export const FR312A_BINDING_SUMMARY = Object.freeze({
  neutralFeatureCount: NEUTRAL_OBSERVATION_SURFACE_FR312A.length,
  neutralMaterializedFeatureCount: NEUTRAL_OBSERVATION_SURFACE_FR312A
    .filter((item) => item.implementationState === 'canonical_extractor_materialized')
    .length,
  neutralExtractorOrAuthorityGapCount: NEUTRAL_OBSERVATION_SURFACE_FR312A
    .filter((item) => item.implementationState !== 'canonical_extractor_materialized')
    .length,
  namedForms: countKind('named_form'),
  namedClaims: countKind('named_claim'),
  directRules: countKind('direct_rule'),
  relationKeys: countKind('relation_key'),
  combinationKeys: countKind('combination_key'),
  traditionalTargetCount: TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A.length,
  directBindingAuthorized: countStatus('direct_binding_authorized'),
  conditionalBindingCandidates: countStatus('conditional_binding_candidate'),
  manualInputOnly: countStatus('manual_input_only'),
  bindingProhibited: countStatus('binding_prohibited'),
  semanticOnlyNoObservationBinding: countStatus('semantic_only_no_observation_binding'),
  permanentlyUnsupportedProductQueryTargets:
    TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A
      .filter((item) => item.permanentlyUnsupportedProductQuery)
      .length,
});

export const FR312A_AUTHORITY_BOUNDARY = Object.freeze({
  automaticTraditionalBindingAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  relationInferenceAuthorized: false as const,
  combinationInferenceAuthorized: false as const,
  arbitraryMetricThresholdAuthorized: false as const,
  thresholdTuningAuthorized: false as const,
  populationNormAuthorized: false as const,
  scoreAuthorized: false as const,
  rankAuthorized: false as const,
  neutralFeatureSemanticEquivalenceAssumed: false as const,
  productInterpretationAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  modernPsychologyFactAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  mortalityPredictionAuthorized: false as const,
  intelligenceInferenceAuthorized: false as const,
  abilityInferenceAuthorized: false as const,
  sexualityInferenceAuthorized: false as const,
});

export function assertTraditionalObservationBindingAuthorityFR312A(): void {
  if (
    FR312A_BINDING_SUMMARY.neutralFeatureCount !== 29 ||
    FR312A_BINDING_SUMMARY.neutralMaterializedFeatureCount !== 18 ||
    FR312A_BINDING_SUMMARY.neutralExtractorOrAuthorityGapCount !== 11
  ) {
    throw new Error('fr312a_neutral_observation_baseline_drift');
  }

  if (
    FR312A_BINDING_SUMMARY.namedForms !== 119 ||
    FR312A_BINDING_SUMMARY.namedClaims !== 348 ||
    FR312A_BINDING_SUMMARY.directRules !== 230 ||
    FR312A_BINDING_SUMMARY.relationKeys !== 24 ||
    FR312A_BINDING_SUMMARY.combinationKeys !== 20 ||
    FR312A_BINDING_SUMMARY.traditionalTargetCount !== 741
  ) {
    throw new Error('fr312a_traditional_target_baseline_drift');
  }

  if (
    FR312A_BINDING_SUMMARY.directBindingAuthorized !== 0 ||
    FR312A_BINDING_SUMMARY.conditionalBindingCandidates !== 254 ||
    FR312A_BINDING_SUMMARY.manualInputOnly !== 139 ||
    FR312A_BINDING_SUMMARY.bindingProhibited !== 18 ||
    FR312A_BINDING_SUMMARY.semanticOnlyNoObservationBinding !== 330 ||
    FR312A_BINDING_SUMMARY.permanentlyUnsupportedProductQueryTargets !== 18
  ) {
    throw new Error('fr312a_binding_status_baseline_drift');
  }

  if (
    FR311P_EVIDENCE_INVENTORY.namedForms !== 119 ||
    FR311P_EVIDENCE_INVENTORY.namedClaims !== 348 ||
    FR311P_EVIDENCE_INVENTORY.directRules !== 230 ||
    FR311P_EVIDENCE_INVENTORY.relationKeys !== 24 ||
    FR311P_EVIDENCE_INVENTORY.combinationKeys !== 20 ||
    FR311P_EVIDENCE_INVENTORY.canonicalEvidence !== 621 ||
    FR311Q_GAP_SUMMARY.totalGapEvidence !== 28 ||
    FR311Q_GAP_SUMMARY.permanentlyUnsupportedProductQuery !== 18
  ) {
    throw new Error('fr312a_fr311_baseline_drift');
  }

  const targetIds = TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A
    .map((item) => item.targetKind + ':' + item.targetId);
  if (new Set(targetIds).size !== targetIds.length) {
    throw new Error('fr312a_duplicate_binding_target');
  }

  const neutralKeys = NEUTRAL_OBSERVATION_SURFACE_FR312A
    .map((item) => item.featureKey);
  if (
    neutralKeys.length !== 29 ||
    new Set(neutralKeys).size !== neutralKeys.length
  ) {
    throw new Error('fr312a_neutral_feature_key_drift');
  }

  for (const observation of NEUTRAL_OBSERVATION_SURFACE_FR312A) {
    if (
      observation.traditionalBindingIssued !== false ||
      observation.classificationIssued !== false ||
      observation.thresholdIssued !== false ||
      observation.neutralObservationOnly !== true
    ) {
      throw new Error(
        'fr312a_neutral_observation_authority_widening:' +
        observation.featureKey,
      );
    }
  }

  for (const item of TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A) {
    if (
      item.bindingStatus === 'direct_binding_authorized' ||
      item.candidateNeutralFeaturesAreEquivalenceProof !== false ||
      item.explicitTraditionalKeyRequiredUntilPromotion !== true ||
      item.automaticBindingAuthorized !== false ||
      item.providerLandmarkDirectBindingAuthorized !== false ||
      item.metricThresholdAuthorized !== false ||
      item.populationNormAuthorized !== false ||
      item.namedFormClassifierAuthorized !== false ||
      item.relationInferenceAuthorized !== false ||
      item.combinationInferenceAuthorized !== false ||
      item.productInterpretationAuthorized !== false ||
      item.modernScientificFactAuthorized !== false
    ) {
      throw new Error(
        'fr312a_target_authority_widening:' +
        item.targetKind + ':' + item.targetId,
      );
    }

    for (const featureKey of item.candidateNeutralFeatureKeys) {
      if (!neutralKeys.includes(featureKey)) {
        throw new Error(
          'fr312a_unknown_candidate_neutral_feature:' +
          item.targetKind + ':' + item.targetId + ':' + featureKey,
        );
      }
    }

    if (
      item.targetKind === 'named_form' &&
      item.bindingStatus !== 'manual_input_only'
    ) {
      throw new Error('fr312a_named_form_not_manual_only:' + item.targetId);
    }
    if (
      item.targetKind === 'combination_key' &&
      item.bindingStatus !== 'manual_input_only'
    ) {
      throw new Error('fr312a_combination_not_manual_only:' + item.targetId);
    }
    if (
      item.targetKind === 'relation_key' &&
      (
        item.bindingStatus !== 'conditional_binding_candidate' ||
        item.requiresExplicitParticipantMapping !== true
      )
    ) {
      throw new Error('fr312a_relation_boundary_drift:' + item.targetId);
    }
  }

  for (const [key, flag] of Object.entries(FR312A_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr312a_global_authority_widening:' + key);
    }
  }
}
