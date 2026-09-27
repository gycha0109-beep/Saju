import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1S_Q_CURRENT_GATE,
  FR300_R1S_Q_MINDS_RIGHTS_INQUIRY_CONTRACT_VERSION,
  FR300_R1S_Q_PUBLIC_SEARCH_ADJUDICATION,
  assertFR300R1SQMindsRightsInquiryContract,
} from './minds-libras-rights-inquiry-fr300-r1s-q.js';
import {
  FR300_R1T_ZC_ULDD_ADJUDICATION,
  FR300_R1T_ZC_ULDD_CALIBRATION_AUTHORITY,
  FR300_R1T_ZC_ULDD_PUBLIC_METRIC_CONTRACT_VERSION,
  FR300_R1T_ZC_ULDD_SOURCE_BOUND_FACTS,
  assertFR300R1TZCULDDPublicMetricContract,
} from './ul-dd-public-metric-qualification-fr300-r1t-zc.js';
import {
  FR300_R1V_ZC_AST_CONTROLLED_ADJUDICATION,
  FR300_R1V_ZC_AST_CONTROLLED_PREFLIGHT_CONTRACT_VERSION,
  FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS,
  FR300_R1V_ZC_AST_DUA_PREFLIGHT,
  FR300_R1V_ZC_AST_FR299_GAP,
  assertFR300R1VZCASTControlledPreflightContract,
} from './ast-face-controlled-preflight-fr300-r1v-zc.js';
import {
  FR300_R1Z_BM_CURRENT_GATE,
  FR300_R1Z_BM_FIRST_TARGET,
  FR300_R1Z_BM_RGB_SELFIE_INDEPENDENT_BENCHMARK_CONTRACT_VERSION,
  assertFR300R1ZBMRgbSelfieIndependentBenchmarkContract,
} from './rgb-selfie-independent-benchmark-strategy-fr300-r1z-bm.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2A_QG_FIRST_REFERENCE_ACQUISITION_QUALIFICATION_CONTRACT_VERSION =
  'FR300-R2A-QG-FIRST-REFERENCE-ACQUISITION-QUALIFICATION-v1' as const;

export type FR300R2AQGCandidateKey =
  | 'ast_face_controlled'
  | 'ul_dd_restricted_stereo'
  | 'minds_libras_public_rgbd';

export type FR300R2AQGGateKey =
  | 'Q0_source_identity'
  | 'Q1_rights'
  | 'Q2_rgb_availability'
  | 'Q3_independent_3d'
  | 'Q4_metric_scale_authority'
  | 'Q5_rgb_3d_correspondence'
  | 'Q6_canonical_registration_feasibility'
  | 'Q7_provider_blind_annotation_feasibility'
  | 'Q8_acquisition_authority';

export type FR300R2AQGGateState =
  | 'pass'
  | 'promising_unverified'
  | 'blocked'
  | 'feasible_not_executed';

export interface FR300R2AQGGateReceipt {
  readonly gate: FR300R2AQGGateKey;
  readonly critical: boolean;
  readonly state: FR300R2AQGGateState;
  readonly evidenceRefs: readonly string[];
  readonly blocker: string | null;
}

export interface FR300R2AQGCandidateQualification {
  readonly schemaVersion:
    'fr300-r2a-qg-candidate-qualification-v1';
  readonly candidateKey: FR300R2AQGCandidateKey;
  readonly targetFeatureKey:
    typeof FR300_R1Z_BM_FIRST_TARGET;
  readonly gates: readonly FR300R2AQGGateReceipt[];
  readonly criticalGateBlocked: boolean;
  readonly acquisitionReady: false;
  readonly disposition:
    | 'hold_public_authority_gap'
    | 'hold_external_rights_authority'
    | 'hold_exact_calibration_authority';
  readonly nextAuthorityNeeded: readonly string[];
  readonly prohibitedSubstitutions: readonly string[];
}

export const FR300_R2A_QG_CRITICAL_GATES = Object.freeze([
  'Q1_rights',
  'Q2_rgb_availability',
  'Q3_independent_3d',
  'Q4_metric_scale_authority',
  'Q5_rgb_3d_correspondence',
  'Q8_acquisition_authority',
] as const satisfies readonly FR300R2AQGGateKey[]);

const OFFICIAL = Object.freeze({
  astPaper:
    'https://doi.org/10.1038/s41597-026-07098-2' as const,
  astRepository:
    'https://github.com/zhaopu99/AST-face' as const,
  astOsf:
    'https://doi.org/10.17605/OSF.IO/XK4F6' as const,
  ulDdPaper:
    'https://doi.org/10.1038/s41597-025-06540-1' as const,
  ulDdZenodo:
    'https://doi.org/10.5281/zenodo.17978727' as const,
  zedCalibration:
    'https://docs.stereolabs.com/docs/development/zed-sdk/modules/camera/camera-calibration' as const,
  mindsThesis:
    'https://hdl.handle.net/1843/39785' as const,
  mindsZenodo:
    'https://doi.org/10.5281/zenodo.4322984' as const,
});

function gate(
  gateKey: FR300R2AQGGateKey,
  critical: boolean,
  state: FR300R2AQGGateState,
  evidenceRefs: readonly string[],
  blocker: string | null,
): FR300R2AQGGateReceipt {
  return Object.freeze({
    gate: gateKey,
    critical,
    state,
    evidenceRefs: Object.freeze([...evidenceRefs]),
    blocker,
  });
}

function isCritical(gateKey: FR300R2AQGGateKey): boolean {
  return (
    FR300_R2A_QG_CRITICAL_GATES as readonly FR300R2AQGGateKey[]
  ).includes(gateKey);
}

export const FR300_R2A_QG_AST_FACE_CONTROLLED:
FR300R2AQGCandidateQualification = Object.freeze({
  schemaVersion: 'fr300-r2a-qg-candidate-qualification-v1' as const,
  candidateKey: 'ast_face_controlled' as const,
  targetFeatureKey: FR300_R1Z_BM_FIRST_TARGET,
  gates: Object.freeze([
    gate(
      'Q0_source_identity',
      false,
      'pass',
      [
        OFFICIAL.astPaper,
        OFFICIAL.astRepository,
        OFFICIAL.astOsf,
      ],
      null,
    ),
    gate(
      'Q1_rights',
      true,
      'promising_unverified',
      [
        OFFICIAL.astRepository,
        'repo:research/face-reading/fr300-r1v-zc-ast-controlled-preflight.md',
      ],
      'authoritative_osf_dua_exact_version_not_byte_verified_against_inspected_github_mirror',
    ),
    gate(
      'Q2_rgb_availability',
      true,
      'pass',
      [OFFICIAL.astPaper, OFFICIAL.astRepository],
      null,
    ),
    gate(
      'Q3_independent_3d',
      true,
      'pass',
      [OFFICIAL.astPaper, OFFICIAL.astRepository],
      null,
    ),
    gate(
      'Q4_metric_scale_authority',
      true,
      'blocked',
      [
        OFFICIAL.astPaper,
        OFFICIAL.astRepository,
        'repo:packages/face-reading/src/ast-face-controlled-preflight-fr300-r1v-zc.ts',
      ],
      'raw_obj_physical_coordinate_unit_export_scale_scanner_accuracy_and_artifact_bound_metric_authority_not_publicly_source_bound',
    ),
    gate(
      'Q5_rgb_3d_correspondence',
      true,
      'promising_unverified',
      [OFFICIAL.astPaper, OFFICIAL.astRepository],
      'synchronized_neutral_capture_and_unified_naming_are_documented_but_exact_controlled_artifact_level_rgb_raw_scan_binding_is_not_publicly_verified',
    ),
    gate(
      'Q6_canonical_registration_feasibility',
      false,
      'feasible_not_executed',
      [
        OFFICIAL.astPaper,
        'repo:research/face-reading/fr299-independent-3d-nose-reference-bundle.md',
      ],
      'candidate_independent_external_registration_receipt_not_yet_materialized',
    ),
    gate(
      'Q7_provider_blind_annotation_feasibility',
      false,
      'feasible_not_executed',
      [
        'repo:research/face-reading/fr266-provider-independent-nasal-apex-reference.md',
        'repo:research/face-reading/fr297-provider-independent-neutral-nasal-bridge-root-reference.md',
      ],
      'raw_surface_annotation_not_executed_and_dataset_landmarks_may_not_substitute_fr266_or_fr297_truth',
    ),
    gate(
      'Q8_acquisition_authority',
      true,
      'blocked',
      [OFFICIAL.astRepository],
      'controlled_access_requires_separately_authorized_dua_signature_submission_and_identity_verification',
    ),
  ]),
  criticalGateBlocked: true as const,
  acquisitionReady: false as const,
  disposition: 'hold_public_authority_gap' as const,
  nextAuthorityNeeded: Object.freeze([
    'authoritative_osf_dua_exact_version_confirmation',
    'raw_obj_physical_unit_or_equivalent_artifact_bound_metric_scale_authority',
    'exact_controlled_tier_rgb_raw_scan_subject_capture_binding_or_validated_registration_basis',
    'separate_user_authorization_before_dua_submission_or_controlled_access_request',
  ] as const),
  prohibitedSubstitutions: Object.freeze([
    'structured_light_capture_for_metric_scale_verified',
    'public_standardized_mesh_for_controlled_raw_metric_geometry',
    'dataset_landmarks_for_fr266_or_fr297_truth',
    'github_dua_mirror_for_unverified_authoritative_osf_dua_identity',
  ] as const),
});

export const FR300_R2A_QG_UL_DD:
FR300R2AQGCandidateQualification = Object.freeze({
  schemaVersion: 'fr300-r2a-qg-candidate-qualification-v1' as const,
  candidateKey: 'ul_dd_restricted_stereo' as const,
  targetFeatureKey: FR300_R1Z_BM_FIRST_TARGET,
  gates: Object.freeze([
    gate(
      'Q0_source_identity',
      false,
      'pass',
      [OFFICIAL.ulDdPaper, OFFICIAL.ulDdZenodo],
      null,
    ),
    gate(
      'Q1_rights',
      true,
      'pass',
      [OFFICIAL.ulDdZenodo],
      null,
    ),
    gate(
      'Q2_rgb_availability',
      true,
      'pass',
      [OFFICIAL.ulDdPaper],
      null,
    ),
    gate(
      'Q3_independent_3d',
      true,
      'promising_unverified',
      [OFFICIAL.ulDdPaper, OFFICIAL.zedCalibration],
      'stereo_metric_reconstruction_is_conditionally_feasible_but_not_authorized_without_exact_capture_calibration',
    ),
    gate(
      'Q4_metric_scale_authority',
      true,
      'blocked',
      [
        OFFICIAL.ulDdPaper,
        OFFICIAL.zedCalibration,
        'repo:packages/face-reading/src/ul-dd-public-metric-qualification-fr300-r1t-zc.ts',
      ],
      'exact_capture_device_calibration_intrinsics_extrinsics_baseline_rectification_and_release_pixel_transform_not_source_bound',
    ),
    gate(
      'Q5_rgb_3d_correspondence',
      true,
      'promising_unverified',
      [OFFICIAL.ulDdPaper],
      'left_right_release_is_same_session_and_time_aligned_but_exact_released_pixel_to_calibration_domain_binding_is_unverified',
    ),
    gate(
      'Q6_canonical_registration_feasibility',
      false,
      'blocked',
      [
        'repo:research/face-reading/fr299-independent-3d-nose-reference-bundle.md',
      ],
      'cannot_validate_candidate_independent_metric_registration_before_exact_metric_stereo_reconstruction_authority_exists',
    ),
    gate(
      'Q7_provider_blind_annotation_feasibility',
      false,
      'feasible_not_executed',
      [
        'repo:research/face-reading/fr266-provider-independent-nasal-apex-reference.md',
        'repo:research/face-reading/fr297-provider-independent-neutral-nasal-bridge-root-reference.md',
      ],
      'provider_blind_surface_annotation_requires_a_metric_3d_reconstruction_first',
    ),
    gate(
      'Q8_acquisition_authority',
      true,
      'blocked',
      [OFFICIAL.ulDdZenodo],
      'restricted_access_request_requires_registered_account_institutional_or_corporate_r_and_d_email_statement_of_purpose_and_data_usage_agreement_acceptance',
    ),
  ]),
  criticalGateBlocked: true as const,
  acquisitionReady: false as const,
  disposition: 'hold_exact_calibration_authority' as const,
  nextAuthorityNeeded: Object.freeze([
    'exact_capture_device_serial_and_calibration_file',
    'exact_released_split_resize_crop_rectification_transform',
    'verified_same_frame_left_right_binding_in_calibration_domain',
    'separate_user_authorization_before_restricted_access_request',
  ] as const),
  prohibitedSubstitutions: Object.freeze([
    'generic_zed2_calibration_for_exact_capture_calibration',
    'device_model_name_for_metric_scale_authority',
    'dlib_ir_2d_landmarks_for_metric_3d_nose_truth',
  ] as const),
});

export const FR300_R2A_QG_MINDS:
FR300R2AQGCandidateQualification = Object.freeze({
  schemaVersion: 'fr300-r2a-qg-candidate-qualification-v1' as const,
  candidateKey: 'minds_libras_public_rgbd' as const,
  targetFeatureKey: FR300_R1Z_BM_FIRST_TARGET,
  gates: Object.freeze([
    gate(
      'Q0_source_identity',
      false,
      'pass',
      [OFFICIAL.mindsThesis, OFFICIAL.mindsZenodo],
      null,
    ),
    gate(
      'Q1_rights',
      true,
      'blocked',
      [
        OFFICIAL.mindsThesis,
        'repo:research/face-reading/fr300-r1s-rights-minds-participant-scope.md',
        'repo:research/face-reading/fr300-r1s-q-minds-rights-inquiry.md',
      ],
      'participant_commercial_product_development_scope_unresolved_after_public_source_search',
    ),
    gate(
      'Q2_rgb_availability',
      true,
      'pass',
      [OFFICIAL.mindsThesis],
      null,
    ),
    gate(
      'Q3_independent_3d',
      true,
      'promising_unverified',
      [OFFICIAL.mindsThesis],
      'creator_documents_1347_point_facemodel_but_released_subject_artifact_inspection_is_not_authorized',
    ),
    gate(
      'Q4_metric_scale_authority',
      true,
      'promising_unverified',
      [
        OFFICIAL.mindsThesis,
        'repo:research/face-reading/fr300-r1s-zc-minds-exact-public-metadata.md',
      ],
      'creator_documents_meter_space_but_released_byte_meter_survivability_remains_unverified',
    ),
    gate(
      'Q5_rgb_3d_correspondence',
      true,
      'promising_unverified',
      [OFFICIAL.mindsThesis],
      'colorfacemodel_and_depthfacemodel_mapping_are_documented_but_exact_released_artifact_binding_has_not_been_inspected',
    ),
    gate(
      'Q6_canonical_registration_feasibility',
      false,
      'feasible_not_executed',
      [
        'repo:research/face-reading/fr299-independent-3d-nose-reference-bundle.md',
      ],
      'external_candidate_independent_registration_receipt_not_yet_materialized',
    ),
    gate(
      'Q7_provider_blind_annotation_feasibility',
      false,
      'feasible_not_executed',
      [
        'repo:research/face-reading/fr266-provider-independent-nasal-apex-reference.md',
        'repo:research/face-reading/fr297-provider-independent-neutral-nasal-bridge-root-reference.md',
      ],
      'kinect_nosetip_and_nosetop_indices_may_only_be_topology_or_debug_hints_not_fr266_or_fr297_truth',
    ),
    gate(
      'Q8_acquisition_authority',
      true,
      'blocked',
      [
        'repo:packages/face-reading/src/minds-libras-rights-inquiry-fr300-r1s-q.ts',
      ],
      'subject_artifact_inspection_and_download_remain_forbidden_until_participant_product_r_and_d_scope_is_source_bound',
    ),
  ]),
  criticalGateBlocked: true as const,
  acquisitionReady: false as const,
  disposition: 'hold_external_rights_authority' as const,
  nextAuthorityNeeded: Object.freeze([
    'source_bound_participant_commercial_product_development_scope',
    'authorization_to_inspect_subject_artifacts_after_rights_gate_changes',
    'released_byte_metric_survivability_verification',
    'exact_rgb_facemodel_artifact_binding_validation',
  ] as const),
  prohibitedSubstitutions: Object.freeze([
    'cc_by_4_0_for_participant_commercial_consent',
    'public_release_for_participant_product_r_and_d_permission',
    'kinect_nosetip_for_fr266_truth',
    'kinect_nosetop_for_fr297_truth',
  ] as const),
});

export const FR300_R2A_QG_CANDIDATES = Object.freeze([
  FR300_R2A_QG_AST_FACE_CONTROLLED,
  FR300_R2A_QG_UL_DD,
  FR300_R2A_QG_MINDS,
] as const);

function criticalBlockers(
  candidate: FR300R2AQGCandidateQualification,
): readonly FR300R2AQGGateReceipt[] {
  return candidate.gates.filter(
    (receipt) =>
      receipt.critical &&
      receipt.state !== 'pass',
  );
}

export function assessFR300R2AQGAcquisitionReadiness(
  candidate: FR300R2AQGCandidateQualification,
) {
  const blockers = Object.freeze([...criticalBlockers(candidate)]);
  return Object.freeze({
    schemaVersion:
      'fr300-r2a-qg-acquisition-readiness-v1' as const,
    candidateKey: candidate.candidateKey,
    criticalGateCount:
      FR300_R2A_QG_CRITICAL_GATES.length,
    unresolvedCriticalGateCount: blockers.length,
    acquisitionReady: blockers.length === 0,
    unresolvedCriticalGates: Object.freeze(
      blockers.map((receipt) => receipt.gate),
    ),
  });
}

export const FR300_R2A_QG_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2a-qg-first-reference-acquisition-qualification-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  targetFeatureKey: FR300_R1Z_BM_FIRST_TARGET,
  disposition:
    'all_candidates_hold_before_acquisition_authorization' as const,
  candidateCount: 3 as const,
  acquisitionReadyCandidateCount: 0 as const,
  publicOnlyQualificationCompleted: true as const,
  controlledAccessRequested: false as const,
  restrictedAccessRequested: false as const,
  duaSigned: false as const,
  duaSubmitted: false as const,
  externalContactAuthorized: false as const,
  externalContactPerformed: false as const,
  participantArtifactDownloaded: false as const,
  participantArtifactInspected: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextActionWithoutNewExternalAuthorization:
    'resolve_candidate_specific_public_or_external_authority_gaps_before_any_subject_artifact_acquisition' as const,
  preferredPublicAuthorityFrontier:
    'ast_face_controlled_metric_scale_and_exact_pairing_authority' as const,
  authority: Object.freeze({
    acquisitionAuthorized: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2A-QG ${message}`,
  );
}

function exactGateSet(
  candidate: FR300R2AQGCandidateQualification,
): boolean {
  const expected: readonly FR300R2AQGGateKey[] = [
    'Q0_source_identity',
    'Q1_rights',
    'Q2_rgb_availability',
    'Q3_independent_3d',
    'Q4_metric_scale_authority',
    'Q5_rgb_3d_correspondence',
    'Q6_canonical_registration_feasibility',
    'Q7_provider_blind_annotation_feasibility',
    'Q8_acquisition_authority',
  ];
  const actual = candidate.gates.map((receipt) => receipt.gate);
  return (
    actual.length === expected.length &&
    new Set(actual).size === expected.length &&
    expected.every((gateKey) => actual.includes(gateKey))
  );
}

export function assertFR300R2AQGFirstReferenceAcquisitionQualificationContract(): void {
  assertFR300R1ZBMRgbSelfieIndependentBenchmarkContract();
  assertFR300R1VZCASTControlledPreflightContract();
  assertFR300R1TZCULDDPublicMetricContract();
  assertFR300R1SQMindsRightsInquiryContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R1Z_BM_RGB_SELFIE_INDEPENDENT_BENCHMARK_CONTRACT_VERSION !==
      'FR300-R1Z-BM-RGB-SELFIE-INDEPENDENT-BENCHMARK-v1' ||
    FR300_R1Z_BM_CURRENT_GATE.disposition !==
      'benchmark_strategy_frozen_reference_acquisition_next' ||
    FR300_R1Z_BM_CURRENT_GATE.firstBenchmarkTarget !==
      'nose.tip_bridge_relative_projection'
  ) {
    fail('R1Z-BM predecessor drift.');
  }

  if (
    FR300_R1V_ZC_AST_CONTROLLED_PREFLIGHT_CONTRACT_VERSION !==
      'FR300-R1V-ZC-AST-CONTROLLED-PREFLIGHT-v1' ||
    FR300_R1T_ZC_ULDD_PUBLIC_METRIC_CONTRACT_VERSION !==
      'FR300-R1T-ZC-ULDD-PUBLIC-METRIC-v1' ||
    FR300_R1S_Q_MINDS_RIGHTS_INQUIRY_CONTRACT_VERSION !==
      'FR300-R1S-Q-MINDS-RIGHTS-INQUIRY-v1'
  ) {
    fail('candidate predecessor contract version drift.');
  }

  for (const candidate of FR300_R2A_QG_CANDIDATES) {
    if (!exactGateSet(candidate)) {
      fail(`${candidate.candidateKey} must contain exactly Q0-Q8 once.`);
    }
    for (const receipt of candidate.gates) {
      if (receipt.critical !== isCritical(receipt.gate)) {
        fail(`${candidate.candidateKey} critical gate map drift.`);
      }
      if (
        (receipt.state === 'blocked' ||
          receipt.state === 'promising_unverified' ||
          receipt.state === 'feasible_not_executed') &&
        (receipt.blocker === null ||
          receipt.blocker.trim().length === 0)
      ) {
        fail(`${candidate.candidateKey} unresolved gate requires blocker.`);
      }
      if (
        receipt.state === 'pass' &&
        receipt.blocker !== null
      ) {
        fail(`${candidate.candidateKey} passing gate may not carry blocker.`);
      }
    }

    const readiness =
      assessFR300R2AQGAcquisitionReadiness(candidate);
    if (
      readiness.acquisitionReady ||
      readiness.unresolvedCriticalGateCount === 0 ||
      !candidate.criticalGateBlocked ||
      candidate.acquisitionReady
    ) {
      fail(`${candidate.candidateKey} was improperly promoted to acquisition-ready.`);
    }
  }

  if (
    !FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS
      .rawScansAreOriginalPreTopologyStandardizationGeometry ||
    !FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS
      .synchronizedRgbCaptureDocumented ||
    FR300_R1V_ZC_AST_CONTROLLED_SOURCE_BOUND_FACTS
      .rawObjPhysicalCoordinateUnit !== 'not_source_bound' ||
    FR300_R1V_ZC_AST_DUA_PREFLIGHT
      .osfAuthoritativeDuaByteVerifiedAgainstMirror ||
    FR300_R1V_ZC_AST_FR299_GAP.metricScaleVerified ||
    FR300_R1V_ZC_AST_FR299_GAP.correspondenceVerifiedForFR299 ||
    FR300_R1V_ZC_AST_CONTROLLED_ADJUDICATION.disposition !==
      'hold_external_authority'
  ) {
    fail('AST predecessor authority was widened.');
  }

  if (
    FR300_R1T_ZC_ULDD_SOURCE_BOUND_FACTS.permittedUse !==
      'bona_fide_research_including_commercial_r_and_d' ||
    FR300_R1T_ZC_ULDD_CALIBRATION_AUTHORITY
      .exactCaptureDeviceCalibrationFileSourceBound ||
    FR300_R1T_ZC_ULDD_CALIBRATION_AUTHORITY
      .genericZed2CalibrationAcceptableAsCaptureAuthority ||
    FR300_R1T_ZC_ULDD_ADJUDICATION.metricReconstructionFromPublicRelease !==
      'not_source_bound'
  ) {
    fail('UL-DD predecessor authority was widened.');
  }

  if (
    FR300_R1S_Q_PUBLIC_SEARCH_ADJUDICATION
      .participantCommercialProductDevelopmentScope !==
      'unresolved_after_additional_public_search' ||
    FR300_R1S_Q_CURRENT_GATE.externalContactPerformed ||
    FR300_R1S_Q_CURRENT_GATE.subjectArtifactDownloadPerformed
  ) {
    fail('MINDS predecessor rights boundary was widened.');
  }

  const current = FR300_R2A_QG_CURRENT_GATE;
  if (
    current.disposition !==
      'all_candidates_hold_before_acquisition_authorization' ||
    current.candidateCount !== 3 ||
    current.acquisitionReadyCandidateCount !== 0 ||
    !current.publicOnlyQualificationCompleted ||
    current.controlledAccessRequested ||
    current.restrictedAccessRequested ||
    current.duaSigned ||
    current.duaSubmitted ||
    current.externalContactAuthorized ||
    current.externalContactPerformed ||
    current.participantArtifactDownloaded ||
    current.participantArtifactInspected ||
    current.paidSpendAuthorized ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    current.authority.acquisitionAuthorized ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('R2A-QG widened acquisition or product authority.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState ===
      'canonical_extractor_materialized',
  ).length;
  if (
    materializedCount !== 18 ||
    current.productMaterialization !== '18/29'
  ) {
    fail('R2A-QG must preserve Product 18/29.');
  }
}

assertFR300R2AQGFirstReferenceAcquisitionQualificationContract();
