import {
  FR300_R1Q_CANDIDATES,
  FR300_R1Q_COMMERCIAL_METRIC_3D_REFRESH_CONTRACT_VERSION,
  FR300_R1Q_CURRENT_GATE,
  assertFR300R1QCommercialMetric3DRefreshContract,
} from './independent-3d-commercial-candidate-refresh-fr300-r1q.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1R_ZC_ZERO_COST_METRIC_3D_CONTRACT_VERSION =
  'FR300-R1R-ZC-ZERO-COST-METRIC-3D-v1' as const;

export type FR300R1RZCCostState =
  | 'zero_cost_public'
  | 'zero_cost_on_request'
  | 'existing_hardware_only'
  | 'paid_required'
  | 'unknown';

export type FR300R1RZCRightsState =
  | 'commercial_compatible_license_verified'
  | 'commercial_r_and_d_verified'
  | 'commercial_product_scope_unresolved';

export type FR300R1RZCMetricState =
  | 'metric_face_geometry_source_bound'
  | 'metric_survivability_unresolved'
  | 'metric_contract_unresolved';

export type FR300R1RZCParticipantState =
  | 'public_release_consent_verified'
  | 'derived_public_release_consent_verified'
  | 'commercial_product_development_unresolved';

export type FR300R1RZCDisposition =
  | 'qualify_zero_cost_next'
  | 'hold_zero_cost_rights'
  | 'hold_zero_cost_technical';

export interface FR300R1RZCCandidate {
  readonly id: string;
  readonly displayName: string;
  readonly costState: FR300R1RZCCostState;
  readonly sourceRef: string;
  readonly rightsState: FR300R1RZCRightsState;
  readonly metricState: FR300R1RZCMetricState;
  readonly paired2D:
    | 'source_bound'
    | 'capture_pair_exists_but_metric_registration_unresolved'
    | 'controlled_rgb_only';
  readonly participantState: FR300R1RZCParticipantState;
  readonly disposition: FR300R1RZCDisposition;
  readonly blockers: readonly string[];
  readonly fr299Eligible: false;
  readonly fr300R2Eligible: false;
}

const candidate = (
  value: FR300R1RZCCandidate,
): FR300R1RZCCandidate => Object.freeze(value);

export const FR300_R1R_ZC_CANDIDATES:
readonly FR300R1RZCCandidate[] = Object.freeze([
  candidate({
    id: 'minds_libras_rgbd',
    displayName: 'MINDS-Libras RGB-D sensor data',
    costState: 'zero_cost_public',
    sourceRef: 'doi:10.5281/zenodo.4322984',
    rightsState: 'commercial_compatible_license_verified',
    metricState: 'metric_face_geometry_source_bound',
    paired2D: 'source_bound',
    participantState: 'commercial_product_development_unresolved',
    disposition: 'qualify_zero_cost_next',
    blockers: Object.freeze([
      'participant_commercial_product_development_scope_not_source_bound',
      'exact_zenodo_artifact_identity_not_yet_frozen',
      'fr299_landmark_mapping_not_yet_qualified',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  candidate({
    id: 'ul_dd_zed2',
    displayName: 'UL-DD ZED 2 facial capture',
    costState: 'zero_cost_on_request',
    sourceRef: 'doi:10.5281/zenodo.17978727',
    rightsState: 'commercial_r_and_d_verified',
    metricState: 'metric_survivability_unresolved',
    paired2D: 'capture_pair_exists_but_metric_registration_unresolved',
    participantState: 'public_release_consent_verified',
    disposition: 'hold_zero_cost_technical',
    blockers: Object.freeze([
      'public_release_is_split_resized_left_right_mp4',
      'device_specific_calibration_not_source_bound_to_release',
      'released_mp4_metric_depth_survivability_not_established',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  candidate({
    id: 'ast_face_public_and_controlled',
    displayName: 'AST-Face public standardized meshes / controlled raw scans',
    costState: 'zero_cost_on_request',
    sourceRef: 'doi:10.17605/OSF.IO/XK4F6',
    rightsState: 'commercial_product_scope_unresolved',
    metricState: 'metric_contract_unresolved',
    paired2D: 'controlled_rgb_only',
    participantState: 'derived_public_release_consent_verified',
    disposition: 'hold_zero_cost_rights',
    blockers: Object.freeze([
      'dataset_commercial_product_development_license_not_source_bound',
      'public_mesh_physical_unit_not_source_bound',
      'topology_pipeline_uses_normalized_processing_and_regularization',
      'raw_scans_and_synchronized_rgb_require_dua',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
] as const);

export const FR300_R1R_ZC_COST_POLICY = Object.freeze({
  policy: 'zero_cost_first' as const,
  priorityOrder: Object.freeze([
    'zero_cost_public',
    'zero_cost_on_request',
    'existing_hardware_only',
    'paid_required',
  ] as const),
  paidSpendAuthorized: false as const,
  paidPurchaseRequiresSeparateExplicitAuthority: true as const,
  paidCandidatesDeferred: Object.freeze([
    'bfm2009_example_scans',
    'nexdata_vietnam_200_3d_liveness',
    'nexdata_40_3d_2d_liveness',
  ] as const),
  existingHardwareAcquisition:
    'fallback_not_yet_qualified' as const,
});

export const FR300_R1R_ZC_CURRENT_GATE = Object.freeze({
  schemaVersion: 'fr300-r1r-zc-zero-cost-metric-3d-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  predecessorCandidateCount: 20 as const,
  zeroCostCandidateCount: 3 as const,
  zeroCostQualificationQueue: Object.freeze([
    'minds_libras_rgbd',
  ] as const),
  zeroCostTechnicalHold: Object.freeze([
    'ul_dd_zed2',
  ] as const),
  zeroCostRightsHold: Object.freeze([
    'ast_face_public_and_controlled',
  ] as const),
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  nextEvidencePriority: Object.freeze([
    'minds_libras_exact_artifact_identity_participant_scope_and_fr299_landmark_mapping',
    'ul_dd_released_zed2_metric_survivability_and_calibration',
    'existing_hardware_metric_3d_reference_feasibility',
  ] as const),
  authority: Object.freeze({
    fr300R2Authorized: false as const,
    realFR299BundleAuthorized: false as const,
    paidAcquisitionAuthorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1R-ZC ${message}`);
}

export function assertFR300R1RZCZeroCostMetric3DContract(): void {
  assertFR300R1QCommercialMetric3DRefreshContract();

  if (
    FR300_R1Q_COMMERCIAL_METRIC_3D_REFRESH_CONTRACT_VERSION !==
      'FR300-R1Q-COMMERCIAL-METRIC-3D-REFRESH-v1' ||
    FR300_R1Q_CANDIDATES.length !== 20 ||
    FR300_R1Q_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1Q_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0
  ) {
    fail('R1Q predecessor authority drift.');
  }

  if (
    FR300_R1R_ZC_COST_POLICY.paidSpendAuthorized ||
    FR300_R1R_ZC_CURRENT_GATE.paidSpendAuthorized ||
    FR300_R1R_ZC_CURRENT_GATE.authority.paidAcquisitionAuthorized
  ) {
    fail('paid acquisition must remain unauthorized.');
  }

  if (
    FR300_R1R_ZC_CANDIDATES.length !== 3 ||
    FR300_R1R_ZC_CANDIDATES.some(
      (item) => item.fr299Eligible || item.fr300R2Eligible,
    )
  ) {
    fail('zero-cost candidate inventory must remain fail-closed.');
  }

  const minds = FR300_R1R_ZC_CANDIDATES.find(
    (item) => item.id === 'minds_libras_rgbd',
  );
  if (
    minds?.costState !== 'zero_cost_public' ||
    minds.rightsState !== 'commercial_compatible_license_verified' ||
    minds.metricState !== 'metric_face_geometry_source_bound' ||
    minds.paired2D !== 'source_bound' ||
    minds.participantState !==
      'commercial_product_development_unresolved' ||
    minds.disposition !== 'qualify_zero_cost_next'
  ) {
    fail('MINDS-Libras zero-cost qualification authority drift.');
  }

  const ulDd = FR300_R1R_ZC_CANDIDATES.find(
    (item) => item.id === 'ul_dd_zed2',
  );
  if (
    ulDd?.rightsState !== 'commercial_r_and_d_verified' ||
    ulDd.metricState !== 'metric_survivability_unresolved' ||
    ulDd.disposition !== 'hold_zero_cost_technical'
  ) {
    fail('UL-DD must remain a technical hold until metric survivability is bound.');
  }

  const ast = FR300_R1R_ZC_CANDIDATES.find(
    (item) => item.id === 'ast_face_public_and_controlled',
  );
  if (
    ast?.rightsState !== 'commercial_product_scope_unresolved' ||
    ast.metricState !== 'metric_contract_unresolved' ||
    ast.disposition !== 'hold_zero_cost_rights'
  ) {
    fail('AST-Face must remain rights/metric fail-closed.');
  }

  const paidIds = new Set<string>(
    FR300_R1R_ZC_COST_POLICY.paidCandidatesDeferred,
  );
  if (
    FR300_R1R_ZC_CURRENT_GATE.zeroCostQualificationQueue.some(
      (id) => paidIds.has(id),
    )
  ) {
    fail('paid candidate entered zero-cost qualification queue.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState === 'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('R1R-ZC must preserve 18/29 product materialization.');
  }
}

assertFR300R1RZCZeroCostMetric3DContract();
