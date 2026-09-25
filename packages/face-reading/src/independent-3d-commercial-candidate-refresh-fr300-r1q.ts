import {
  FR300_R1H_CANDIDATES,
  FR300_R1H_CURRENT_GATE,
} from './independent-3d-reference-candidate-gate-fr300-r1h.js';
import {
  FR300_R1N_CURRENT_METRIC_AUTHORITY,
  FR300_R1N_V1_METRIC_SEMANTICS_CONTRACT_VERSION,
} from './rap3df-v1-metric-semantics-fr300-r1n.js';
import {
  FR300_R1P_CURRENT_DEPTH_AUTHORITY,
  FR300_R1P_V2_DEPTH_SURVIVABILITY_CONTRACT_VERSION,
} from './rap3df-v2-depth-survivability-fr300-r1p.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1Q_COMMERCIAL_METRIC_3D_REFRESH_CONTRACT_VERSION =
  'FR300-R1Q-COMMERCIAL-METRIC-3D-REFRESH-v1' as const;

export type FR300R1QRightsState =
  | 'commercial_verified'
  | 'commercial_license_path'
  | 'noncommercial_blocked'
  | 'research_only_blocked'
  | 'commercial_unresolved';

export type FR300R1QGeometryState =
  | 'metric_verified'
  | 'real_3d_metric_unresolved'
  | 'metric_blocked'
  | 'not_yet_qualified';

export type FR300R1QParticipantScope =
  | 'product_development_verified'
  | 'controlled_research_scope'
  | 'research_only'
  | 'unresolved';

export type FR300R1QDisposition =
  | 'qualify_next'
  | 'hold_rights'
  | 'hold_technical'
  | 'terminal_reject';

export interface FR300R1QCandidate {
  readonly id: string;
  readonly displayName: string;
  readonly sourceRef: string;
  readonly sourceAuthority: 'primary' | 'official_catalog';
  readonly rightsState: FR300R1QRightsState;
  readonly geometryState: FR300R1QGeometryState;
  readonly paired2D:
    | 'verified'
    | 'available_as_registered_rendering'
    | 'unresolved'
    | 'not_required_for_screen';
  readonly registrationSupport:
    | 'verified'
    | 'partial'
    | 'unresolved'
    | 'blocked';
  readonly participantScope: FR300R1QParticipantScope;
  readonly disposition: FR300R1QDisposition;
  readonly blockers: readonly string[];
  readonly fr299Eligible: false;
  readonly fr300R2Eligible: false;
}

const c = (
  candidate: FR300R1QCandidate,
): FR300R1QCandidate => Object.freeze(candidate);

export const FR300_R1Q_CANDIDATES:
readonly FR300R1QCandidate[] = Object.freeze([
  c({
    id: 'rap3df_v1',
    displayName: 'RAP3DF V1',
    sourceRef: 'doi:10.17632/kpdkpcs8zb.3',
    sourceAuthority: 'primary',
    rightsState: 'commercial_verified',
    geometryState: 'metric_blocked',
    paired2D: 'verified',
    registrationSupport: 'unresolved',
    participantScope: 'unresolved',
    disposition: 'terminal_reject',
    blockers: Object.freeze([
      'fr300_r1n_metric_information_destroyed_by_single_byte_projection',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'rap3df_v2',
    displayName: 'RAP3DF V2',
    sourceRef: 'doi:10.17632/kpdkpcs8zb.4',
    sourceAuthority: 'primary',
    rightsState: 'commercial_verified',
    geometryState: 'metric_blocked',
    paired2D: 'verified',
    registrationSupport: 'unresolved',
    participantScope: 'unresolved',
    disposition: 'terminal_reject',
    blockers: Object.freeze([
      'fr300_r1p_official_v4_creator_bytes_exactly_bound',
      'fr300_r1p_metric_information_destroyed_by_single_byte_projection',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'three_d_wide_faces',
    displayName: '3D Wide Faces (3DWF)',
    sourceRef: 'https://doi.org/10.21950/UBTZOR',
    sourceAuthority: 'primary',
    rightsState: 'noncommercial_blocked',
    geometryState: 'metric_verified',
    paired2D: 'verified',
    registrationSupport: 'verified',
    participantScope: 'unresolved',
    disposition: 'terminal_reject',
    blockers: Object.freeze(['cc_by_nc_sa_4_0']),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'florence_superface',
    displayName: 'Florence Superface',
    sourceRef:
      'https://www.micc.unifi.it/resources/datasets/florence-superface/',
    sourceAuthority: 'primary',
    rightsState: 'noncommercial_blocked',
    geometryState: 'metric_verified',
    paired2D: 'verified',
    registrationSupport: 'unresolved',
    participantScope: 'unresolved',
    disposition: 'terminal_reject',
    blockers: Object.freeze(['official_research_no_profit_scope']),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'headspace',
    displayName: 'Headspace / LYHM training data',
    sourceRef: 'https://www-users.york.ac.uk/~np7/research/LYHM/',
    sourceAuthority: 'primary',
    rightsState: 'noncommercial_blocked',
    geometryState: 'metric_verified',
    paired2D: 'verified',
    registrationSupport: 'unresolved',
    participantScope: 'research_only',
    disposition: 'terminal_reject',
    blockers: Object.freeze([
      'noncommercial_research_and_education_only',
      'commercial_exploitation_forbidden',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'facescape',
    displayName: 'FaceScape',
    sourceRef: 'https://nju-3dv.github.io/projects/FaceScape/',
    sourceAuthority: 'primary',
    rightsState: 'noncommercial_blocked',
    geometryState: 'metric_blocked',
    paired2D: 'verified',
    registrationSupport: 'verified',
    participantScope: 'research_only',
    disposition: 'terminal_reject',
    blockers: Object.freeze([
      'official_release_noncommercial_only',
      'published_evidence_reports_facescape_not_in_metric_space',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'siat_3dfe',
    displayName: 'SIAT-3DFE',
    sourceRef: 'https://github.com/CIESIAT/SIAT-3DFE',
    sourceAuthority: 'primary',
    rightsState: 'research_only_blocked',
    geometryState: 'metric_verified',
    paired2D: 'verified',
    registrationSupport: 'verified',
    participantScope: 'unresolved',
    disposition: 'terminal_reject',
    blockers: Object.freeze(['academic_research_purpose']),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'frgc_v2',
    displayName: 'FRGC v2',
    sourceRef:
      'https://www.nist.gov/programs-projects/face-recognition-grand-challenge-frgc',
    sourceAuthority: 'primary',
    rightsState: 'commercial_unresolved',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'verified',
    registrationSupport: 'unresolved',
    participantScope: 'unresolved',
    disposition: 'hold_rights',
    blockers: Object.freeze([
      'commercial_product_development_permission_not_established',
      'metric_coordinate_contract_not_qualified',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'bfm2009_example_scans',
    displayName: 'Basel Face Model 2009 — 10 example scans',
    sourceRef:
      'https://faces.dmi.unibas.ch/bfm/main.php?id=scans&nav=1-1-1',
    sourceAuthority: 'primary',
    rightsState: 'commercial_license_path',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'available_as_registered_rendering',
    registrationSupport: 'verified',
    participantScope: 'unresolved',
    disposition: 'qualify_next',
    blockers: Object.freeze([
      'commercial_license_not_yet_acquired',
      'official_scan_unit_contract_not_yet_bound',
      'participant_product_development_scope_not_yet_bound',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'nexdata_vietnam_200_3d_liveness',
    displayName: 'Nexdata — 200 Vietnamese 3D Living Face',
    sourceRef:
      'https://www.nexdata.ai/datasets/computervision/1259',
    sourceAuthority: 'primary',
    rightsState: 'commercial_verified',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'unresolved',
    registrationSupport: 'unresolved',
    participantScope: 'unresolved',
    disposition: 'qualify_next',
    blockers: Object.freeze([
      'public_spec_lists_jpg_xml_json_but_no_metric_depth_or_mesh_contract',
      'participant_product_development_scope_not_publicly_bound',
      'sample_artifact_schema_not_yet_qualified',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'nexdata_40_3d_2d_liveness',
    displayName: 'Nexdata — 40 People 3D&2D Living Face',
    sourceRef:
      'https://www.nexdata.ai/datasets/computervision/1198',
    sourceAuthority: 'primary',
    rightsState: 'commercial_license_path',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'verified',
    registrationSupport: 'unresolved',
    participantScope: 'unresolved',
    disposition: 'qualify_next',
    blockers: Object.freeze([
      'public_spec_does_not_expose_metric_depth_or_mesh_contract',
      'participant_product_development_scope_not_publicly_bound',
      'sample_artifact_schema_not_yet_qualified',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'facebase_3d_facial_norms',
    displayName: 'FaceBase 3D Facial Norms',
    sourceRef:
      'https://www.facebase.org/resources/human/facial_norms/notes/',
    sourceAuthority: 'primary',
    rightsState: 'commercial_unresolved',
    geometryState: 'metric_verified',
    paired2D: 'unresolved',
    registrationSupport: 'partial',
    participantScope: 'controlled_research_scope',
    disposition: 'hold_rights',
    blockers: Object.freeze([
      'individual_level_data_requires_irb_and_data_access_committee',
      'commercial_product_development_permission_not_established',
      'released_obj_surfaces_are_untextured',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'd4fly_multimodal',
    displayName: 'D4FLY Multimodal Biometric Dataset',
    sourceRef: 'https://d4fly.eu/dataset/',
    sourceAuthority: 'primary',
    rightsState: 'research_only_blocked',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'unresolved',
    registrationSupport: 'unresolved',
    participantScope: 'research_only',
    disposition: 'terminal_reject',
    blockers: Object.freeze([
      'official_project_qa_states_shared_only_for_research_purposes',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'uea_3d_face',
    displayName: 'UEA 3D Face Database',
    sourceRef: 'https://uea3dfaces.org/',
    sourceAuthority: 'primary',
    rightsState: 'noncommercial_blocked',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'verified',
    registrationSupport: 'unresolved',
    participantScope: 'research_only',
    disposition: 'terminal_reject',
    blockers: Object.freeze([
      'free_for_noncommercial_academic_research_only',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'stirling_esrc_3d_face',
    displayName: 'Stirling/ESRC 3D Face Database',
    sourceRef: 'https://pics.stir.ac.uk/ESRC/',
    sourceAuthority: 'primary',
    rightsState: 'research_only_blocked',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'verified',
    registrationSupport: 'unresolved',
    participantScope: 'research_only',
    disposition: 'terminal_reject',
    blockers: Object.freeze(['license_restricts_images_to_research_purposes']),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'texas_3dfrd',
    displayName: 'Texas 3D Face Recognition Database',
    sourceRef: 'https://live.ece.utexas.edu/research/texas3dfr/',
    sourceAuthority: 'primary',
    rightsState: 'noncommercial_blocked',
    geometryState: 'metric_verified',
    paired2D: 'verified',
    registrationSupport: 'verified',
    participantScope: 'research_only',
    disposition: 'terminal_reject',
    blockers: Object.freeze([
      'official_page_forbids_commercial_purposes',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'iiitd_kinect_rgbd',
    displayName: 'IIIT-D Kinect RGB-D Face Database',
    sourceRef: 'https://www.iab-rubric.org/resources/biometric-datasets/face',
    sourceAuthority: 'primary',
    rightsState: 'noncommercial_blocked',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'verified',
    registrationSupport: 'unresolved',
    participantScope: 'research_only',
    disposition: 'terminal_reject',
    blockers: Object.freeze([
      'official_page_research_and_educational_only',
      'official_page_forbids_commercial_use',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'notre_dame_3d_tec',
    displayName: 'Notre Dame 3D-TEC',
    sourceRef: 'https://cvrl.nd.edu/projects/data/',
    sourceAuthority: 'primary',
    rightsState: 'commercial_unresolved',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'unresolved',
    registrationSupport: 'unresolved',
    participantScope: 'unresolved',
    disposition: 'hold_rights',
    blockers: Object.freeze([
      'signed_release_agreement_required',
      'commercial_product_development_scope_not_bound_in_public_page',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'lock3dface',
    displayName: 'Lock3DFace',
    sourceRef: 'https://irip.buaa.edu.cn/lock3dface/index.html',
    sourceAuthority: 'primary',
    rightsState: 'commercial_unresolved',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'verified',
    registrationSupport: 'unresolved',
    participantScope: 'unresolved',
    disposition: 'hold_rights',
    blockers: Object.freeze([
      'signed_agreement_required',
      'commercial_product_development_scope_not_bound_in_public_page',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
  c({
    id: 'eurecom_kinect_face',
    displayName: 'EURECOM Kinect Face Dataset',
    sourceRef: 'https://rgb-d.eurecom.fr/',
    sourceAuthority: 'primary',
    rightsState: 'commercial_unresolved',
    geometryState: 'real_3d_metric_unresolved',
    paired2D: 'verified',
    registrationSupport: 'partial',
    participantScope: 'unresolved',
    disposition: 'hold_rights',
    blockers: Object.freeze([
      'organization_usage_agreement_required',
      'commercial_product_development_scope_not_bound_in_public_page',
    ]),
    fr299Eligible: false,
    fr300R2Eligible: false,
  }),
] as const);

export const FR300_R1Q_ACQUISITION_FALLBACKS = Object.freeze([
  Object.freeze({
    id: 'consent_forward_custom_metric_3d_capture',
    disposition: 'fallback_not_existing_dataset' as const,
    requirement:
      'commission_or_self_collect_real_human_metric_3d_plus_corresponding_2d_under_explicit_product_development_consent' as const,
  }),
] as const);

export const FR300_R1Q_CURRENT_GATE = Object.freeze({
  schemaVersion: 'fr300-r1q-commercial-metric-3d-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  candidateCount: 20 as const,
  qualifyNext: Object.freeze([
    'bfm2009_example_scans',
    'nexdata_vietnam_200_3d_liveness',
    'nexdata_40_3d_2d_liveness',
  ] as const),
  holdRights: Object.freeze([
    'frgc_v2',
    'facebase_3d_facial_norms',
    'notre_dame_3d_tec',
    'lock3dface',
    'eurecom_kinect_face',
  ] as const),
  terminalRejectCount: 12 as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  staleR1HPrioritiesSuperseded: true as const,
  nextEvidencePriority: Object.freeze([
    'bfm2009_commercial_license_scope_and_official_metric_unit_qualification',
    'nexdata_metric_artifact_schema_and_participant_product_scope_qualification',
    'custom_metric_3d_capture_cost_and_consent_design_if_market_candidates_fail',
  ] as const),
  authority: Object.freeze({
    fr300R2Authorized: false as const,
    realFR299BundleAuthorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1Q ${message}`);
}

export function assertFR300R1QCommercialMetric3DRefreshContract(): void {
  if (
    FR300_R1N_V1_METRIC_SEMANTICS_CONTRACT_VERSION !==
      'FR300-R1N-V1-METRIC-SEMANTICS-v1' ||
    FR300_R1N_CURRENT_METRIC_AUTHORITY.metricReferenceDisposition !==
      'rejected_for_metric_reference' ||
    FR300_R1P_V2_DEPTH_SURVIVABILITY_CONTRACT_VERSION !==
      'FR300-R1P-V2-DEPTH-SURVIVABILITY-v1' ||
    FR300_R1P_CURRENT_DEPTH_AUTHORITY.metricReferenceDisposition !==
      'rejected_for_metric_reference'
  ) {
    fail('terminal RAP3DF predecessor authority drift.');
  }

  if (
    FR300_R1H_CANDIDATES.length !== 8 ||
    FR300_R1H_CURRENT_GATE.nextEvidencePriority[0] !==
      'rap3df_v1_exact_metric_artifact_qualification'
  ) {
    fail('FR300-R1H historical baseline drift.');
  }

  if (
    FR300_R1Q_CANDIDATES.length !== 20 ||
    FR300_R1Q_CANDIDATES.some(
      (candidate) =>
        candidate.fr299Eligible || candidate.fr300R2Eligible,
    )
  ) {
    fail('candidate inventory or fail-closed eligibility drift.');
  }

  for (const id of ['rap3df_v1', 'rap3df_v2'] as const) {
    const candidate = FR300_R1Q_CANDIDATES.find(
      (item) => item.id === id,
    );
    if (
      candidate?.geometryState !== 'metric_blocked' ||
      candidate.disposition !== 'terminal_reject'
    ) {
      fail(`${id} must remain terminally rejected from metric reference.`);
    }
  }

  const qualifyNext = FR300_R1Q_CANDIDATES
    .filter((candidate) => candidate.disposition === 'qualify_next')
    .map((candidate) => candidate.id);
  if (
    qualifyNext.length !== 3 ||
    FR300_R1Q_CURRENT_GATE.qualifyNext.some(
      (id) => !qualifyNext.includes(id),
    )
  ) {
    fail('qualification shortlist drift.');
  }

  const invalidCommercialPromotion = FR300_R1Q_CANDIDATES.some(
    (candidate) =>
      candidate.fr299Eligible &&
      (candidate.rightsState === 'noncommercial_blocked' ||
        candidate.rightsState === 'research_only_blocked' ||
        candidate.participantScope !== 'product_development_verified'),
  );
  if (invalidCommercialPromotion) {
    fail('rights/participant scope cannot be bypassed for FR299.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR300-R1Q must preserve 18/29 product materialization.');
  }
}

assertFR300R1QCommercialMetric3DRefreshContract();
