import {
  FR300_R1G_CREATOR_PIPELINE_METRIC_AUDIT_CONTRACT_VERSION,
  FR300_R1G_CURRENT_METRIC_AUTHORITY,
} from './rap3df-v2-creator-pipeline-metric-audit-fr300-r1g.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1H_INDEPENDENT_3D_CANDIDATE_GATE_CONTRACT_VERSION =
  'FR300-R1H-INDEPENDENT-3D-CANDIDATE-GATE-v1' as const;

export const FR300_R1H_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr300-r1h-independent-3d-candidate-gate.md' as const;

export type FR300R1HCandidateId =
  | 'rap3df_v2'
  | 'rap3df_v1'
  | 'three_d_wide_faces'
  | 'florence_superface'
  | 'headspace'
  | 'facescape'
  | 'siat_3dfe'
  | 'frgc_v2';

export type FR300R1HEvidenceState =
  | 'verified'
  | 'blocked'
  | 'unresolved'
  | 'not_required';

export type FR300R1HAccessState =
  | 'public'
  | 'request_gated'
  | 'license_gated'
  | 'mixed';

export type FR300R1HRightsState =
  | 'commercial_allowed'
  | 'noncommercial_only'
  | 'academic_research_only'
  | 'commercial_unresolved';

export interface FR300R1HIndependent3DCandidate {
  readonly id: FR300R1HCandidateId;
  readonly displayName: string;
  readonly sourceRef: string;
  readonly datasetLicenseRef: string;
  readonly accessState: FR300R1HAccessState;
  readonly rightsState: FR300R1HRightsState;
  readonly independentReal3D: FR300R1HEvidenceState;
  readonly pairedOrCorresponding2D: FR300R1HEvidenceState;
  readonly metricGeometry: FR300R1HEvidenceState;
  readonly registrationSupport: FR300R1HEvidenceState;
  readonly participantUseScope: FR300R1HEvidenceState;
  readonly productDevelopmentPermission:
    FR300R1HEvidenceState;
  readonly technicalBlockers: readonly string[];
  readonly rightsBlockers: readonly string[];
  readonly fr300R2Eligible: false;
}

export const FR300_R1H_CANDIDATES:
readonly FR300R1HIndependent3DCandidate[] = Object.freeze([
  Object.freeze({
    id: 'rap3df_v2' as const,
    displayName: 'RAP3DF V2',
    sourceRef:
      'https://data.mendeley.com/datasets/kpdkpcs8zb/4',
    datasetLicenseRef:
      'https://creativecommons.org/licenses/by/4.0/',
    accessState: 'public' as const,
    rightsState: 'commercial_allowed' as const,
    independentReal3D: 'verified' as const,
    pairedOrCorresponding2D: 'verified' as const,
    metricGeometry: 'blocked' as const,
    registrationSupport: 'unresolved' as const,
    participantUseScope: 'unresolved' as const,
    productDevelopmentPermission: 'unresolved' as const,
    technicalBlockers: Object.freeze([
      'fr300_r1g_creator_pipeline_metric_conflict',
      'exact_mendeley_v4_depth_byte_identity_unverified',
      'v4_specific_metric_export_evidence_missing',
    ]),
    rightsBlockers: Object.freeze([
      'participant_consent_scope_not_bound_to_product_use',
    ]),
    fr300R2Eligible: false as const,
  }),
  Object.freeze({
    id: 'rap3df_v1' as const,
    displayName: 'RAP3DF V1',
    sourceRef:
      'https://data.mendeley.com/datasets/kpdkpcs8zb/3',
    datasetLicenseRef:
      'https://creativecommons.org/licenses/by/4.0/',
    accessState: 'public' as const,
    rightsState: 'commercial_allowed' as const,
    independentReal3D: 'verified' as const,
    pairedOrCorresponding2D: 'verified' as const,
    metricGeometry: 'unresolved' as const,
    registrationSupport: 'unresolved' as const,
    participantUseScope: 'unresolved' as const,
    productDevelopmentPermission: 'unresolved' as const,
    technicalBlockers: Object.freeze([
      'v1_exact_metric_artifact_not_admitted',
      'v1_serialization_and_coordinate_contract_not_admitted',
    ]),
    rightsBlockers: Object.freeze([
      'participant_consent_scope_not_bound_to_product_use',
    ]),
    fr300R2Eligible: false as const,
  }),
  Object.freeze({
    id: 'three_d_wide_faces' as const,
    displayName: '3D Wide Faces (3DWF)',
    sourceRef:
      'https://doi.org/10.21950/UBTZOR',
    datasetLicenseRef:
      'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    accessState: 'public' as const,
    rightsState: 'noncommercial_only' as const,
    independentReal3D: 'verified' as const,
    pairedOrCorresponding2D: 'verified' as const,
    metricGeometry: 'verified' as const,
    registrationSupport: 'verified' as const,
    participantUseScope: 'unresolved' as const,
    productDevelopmentPermission: 'blocked' as const,
    technicalBlockers: Object.freeze([]),
    rightsBlockers: Object.freeze([
      'dataset_license_is_cc_by_nc_sa_4_0',
      'commercial_product_development_not_admitted',
    ]),
    fr300R2Eligible: false as const,
  }),
  Object.freeze({
    id: 'florence_superface' as const,
    displayName: 'Florence Superface',
    sourceRef:
      'https://www.micc.unifi.it/resources/datasets/florence-superface/',
    datasetLicenseRef:
      'https://www.micc.unifi.it/berretti/codedata.html',
    accessState: 'public' as const,
    rightsState: 'noncommercial_only' as const,
    independentReal3D: 'verified' as const,
    pairedOrCorresponding2D: 'verified' as const,
    metricGeometry: 'verified' as const,
    registrationSupport: 'unresolved' as const,
    participantUseScope: 'unresolved' as const,
    productDevelopmentPermission: 'blocked' as const,
    technicalBlockers: Object.freeze([
      'canonical_registration_contract_not_yet_qualified',
    ]),
    rightsBlockers: Object.freeze([
      'official_page_limits_use_to_research_no_profit',
    ]),
    fr300R2Eligible: false as const,
  }),
  Object.freeze({
    id: 'headspace' as const,
    displayName: 'Headspace',
    sourceRef:
      'https://www-users.york.ac.uk/~np7/research/Headspace/',
    datasetLicenseRef:
      'https://www-users.york.ac.uk/~np7/research/LYHM/LYHMagreement07.pdf',
    accessState: 'request_gated' as const,
    rightsState: 'noncommercial_only' as const,
    independentReal3D: 'verified' as const,
    pairedOrCorresponding2D: 'verified' as const,
    metricGeometry: 'verified' as const,
    registrationSupport: 'unresolved' as const,
    participantUseScope: 'verified' as const,
    productDevelopmentPermission: 'blocked' as const,
    technicalBlockers: Object.freeze([
      'canonical_registration_contract_not_yet_qualified',
    ]),
    rightsBlockers: Object.freeze([
      'university_based_noncommercial_research_only',
      'commercial_exploitation_forbidden_by_user_agreement',
    ]),
    fr300R2Eligible: false as const,
  }),
  Object.freeze({
    id: 'facescape' as const,
    displayName: 'FaceScape',
    sourceRef:
      'https://github.com/zhuhao-nju/facescape',
    datasetLicenseRef:
      'https://facescape.nju.edu.cn/static/License_Agreement.pdf',
    accessState: 'license_gated' as const,
    rightsState: 'noncommercial_only' as const,
    independentReal3D: 'verified' as const,
    pairedOrCorresponding2D: 'verified' as const,
    metricGeometry: 'verified' as const,
    registrationSupport: 'verified' as const,
    participantUseScope: 'verified' as const,
    productDevelopmentPermission: 'blocked' as const,
    technicalBlockers: Object.freeze([]),
    rightsBlockers: Object.freeze([
      'official_project_releases_dataset_for_noncommercial_research_only',
      'commercial_or_special_use_requires_separate_permission',
    ]),
    fr300R2Eligible: false as const,
  }),
  Object.freeze({
    id: 'siat_3dfe' as const,
    displayName: 'SIAT-3DFE',
    sourceRef:
      'https://github.com/CIESIAT/SIAT-3DFE',
    datasetLicenseRef:
      'https://github.com/CIESIAT/SIAT-3DFE/blob/master/README.md',
    accessState: 'mixed' as const,
    rightsState: 'academic_research_only' as const,
    independentReal3D: 'verified' as const,
    pairedOrCorresponding2D: 'verified' as const,
    metricGeometry: 'verified' as const,
    registrationSupport: 'verified' as const,
    participantUseScope: 'unresolved' as const,
    productDevelopmentPermission: 'blocked' as const,
    technicalBlockers: Object.freeze([]),
    rightsBlockers: Object.freeze([
      'project_states_academic_research_purpose',
      'copy_distribution_and_use_rights_controlled_by_corresponding_author',
    ]),
    fr300R2Eligible: false as const,
  }),
  Object.freeze({
    id: 'frgc_v2' as const,
    displayName: 'FRGC v2',
    sourceRef:
      'https://www.nist.gov/programs-projects/face-recognition-grand-challenge-frgc',
    datasetLicenseRef:
      'https://cvrl.nd.edu/projects/data/',
    accessState: 'license_gated' as const,
    rightsState: 'commercial_unresolved' as const,
    independentReal3D: 'verified' as const,
    pairedOrCorresponding2D: 'verified' as const,
    metricGeometry: 'unresolved' as const,
    registrationSupport: 'unresolved' as const,
    participantUseScope: 'unresolved' as const,
    productDevelopmentPermission: 'unresolved' as const,
    technicalBlockers: Object.freeze([
      'metric_coordinate_contract_not_qualified_in_current_track',
      'canonical_registration_contract_not_qualified',
    ]),
    rightsBlockers: Object.freeze([
      'signed_dataset_license_required',
      'commercial_product_development_permission_not_established',
    ]),
    fr300R2Eligible: false as const,
  }),
]);

export interface FR300R1HCandidateGateSummary {
  readonly schemaVersion:
    'fr300-r1h-candidate-gate-summary-v1';
  readonly contractVersion:
    typeof FR300_R1H_INDEPENDENT_3D_CANDIDATE_GATE_CONTRACT_VERSION;
  readonly watchtowerTrack: 'face-engine';
  readonly candidateCount: 8;
  readonly eligibleCandidateCount: 0;
  readonly technicallyStrongButRightsBlocked:
    readonly FR300R1HCandidateId[];
  readonly permissiveRightsButTechnicalOrConsentBlocked:
    readonly FR300R1HCandidateId[];
  readonly fr300R2Status:
    'blocked_no_current_candidate_satisfies_technical_and_rights_gates';
  readonly authority: {
    readonly fr300R2Authorized: false;
    readonly realFR299BundleAuthorized: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextEvidencePriority: readonly [
    'rap3df_v1_exact_metric_artifact_qualification',
    'rap3df_v2_exact_mendeley_v4_artifact_resolution',
    'commercial_license_path_for_metric_3d_candidate',
  ];
  readonly researchNoteRef: typeof FR300_R1H_RESEARCH_NOTE_REF;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1H ${message}`,
  );
}

export function summarizeFR300R1HCandidateGate():
FR300R1HCandidateGateSummary {
  const eligibleCandidateCount =
    FR300_R1H_CANDIDATES.filter(
      (candidate) => candidate.fr300R2Eligible,
    ).length;

  if (eligibleCandidateCount !== 0) {
    fail(
      'no candidate is currently allowed to unlock FR300-R2.',
    );
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r1h-candidate-gate-summary-v1' as const,
    contractVersion:
      FR300_R1H_INDEPENDENT_3D_CANDIDATE_GATE_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    candidateCount: 8 as const,
    eligibleCandidateCount: 0 as const,
    technicallyStrongButRightsBlocked: Object.freeze([
      'three_d_wide_faces',
      'florence_superface',
      'headspace',
      'facescape',
      'siat_3dfe',
    ] as const),
    permissiveRightsButTechnicalOrConsentBlocked:
      Object.freeze([
        'rap3df_v2',
        'rap3df_v1',
      ] as const),
    fr300R2Status:
      'blocked_no_current_candidate_satisfies_technical_and_rights_gates' as const,
    authority: Object.freeze({
      fr300R2Authorized: false as const,
      realFR299BundleAuthorized: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextEvidencePriority: Object.freeze([
      'rap3df_v1_exact_metric_artifact_qualification',
      'rap3df_v2_exact_mendeley_v4_artifact_resolution',
      'commercial_license_path_for_metric_3d_candidate',
    ] as const),
    researchNoteRef: FR300_R1H_RESEARCH_NOTE_REF,
  });
}

export const FR300_R1H_CURRENT_GATE =
  summarizeFR300R1HCandidateGate();

export function assertFR300R1HIndependent3DCandidateGateContract():
void {
  if (
    FR300_R1G_CREATOR_PIPELINE_METRIC_AUDIT_CONTRACT_VERSION !==
      'FR300-R1G-CREATOR-PIPELINE-METRIC-AUDIT-v1' ||
    FR300_R1G_CURRENT_METRIC_AUTHORITY.authority
      .fr300R2Eligible !== false
  ) {
    fail('FR300-R1G predecessor authority drift.');
  }

  if (FR300_R1H_CANDIDATES.length !== 8) {
    fail('candidate inventory size drift.');
  }

  if (
    FR300_R1H_CANDIDATES.some(
      (candidate) => candidate.fr300R2Eligible,
    )
  ) {
    fail('candidate was promoted without a new authority review.');
  }

  for (const candidate of FR300_R1H_CANDIDATES) {
    if (
      candidate.productDevelopmentPermission ===
        'verified' &&
      candidate.rightsState !== 'commercial_allowed'
    ) {
      fail(
        `${candidate.id} cannot have product permission under current rights state.`,
      );
    }
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;

  if (materializedCount !== 18) {
    fail(
      'FR300-R1H must preserve 18/29 product materialization.',
    );
  }
}

assertFR300R1HIndependent3DCandidateGateContract();
