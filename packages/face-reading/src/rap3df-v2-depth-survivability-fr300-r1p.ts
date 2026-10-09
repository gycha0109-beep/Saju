import {
  FR300_R1G_CREATOR_PIPELINE_METRIC_AUDIT_CONTRACT_VERSION,
  FR300_R1G_CURRENT_METRIC_AUTHORITY,
} from './rap3df-v2-creator-pipeline-metric-audit-fr300-r1g.js';
import {
  FR300_R1O_CURRENT_CONTENT_AUTHORITY,
  FR300_R1O_V2_OFFICIAL_CONTENT_ANCHOR_CONTRACT_VERSION,
} from './rap3df-v2-official-content-anchor-fr300-r1o.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1P_V2_DEPTH_SURVIVABILITY_CONTRACT_VERSION =
  'FR300-R1P-V2-DEPTH-SURVIVABILITY-v1' as const;

export const FR300_R1P_EXACT_ARTIFACT_RECEIPTS = Object.freeze([
  Object.freeze({
    subject: 'P6HF7NR',
    filename: 'depth_bgRm_VRO.data',
    creatorGitBlobSha: '09e922073030f713dc24b33c2eecbebb9369edb7',
    sizeBytes: 35_462,
    sha256:
      'sha256:cc183a37228fa4824eda206e4ddab04bc0d67e8e921c43cc20f9b9ab73f43325',
    publisherFileId: '9af95e81-7a80-4c83-8cf8-a874556e9ee6',
    exactByteIdentity: true,
  }),
  Object.freeze({
    subject: 'M8D6FNE',
    filename: 'depth_bgRm_XQ2.data',
    creatorGitBlobSha: '1bdf3a802eae33d03839d3788fadc797edd85d90',
    sizeBytes: 35_462,
    sha256:
      'sha256:aaad26f20992c9cdce0f43970bf397d935cfd0d9f528a50f1f28132e3c46ab52',
    publisherFileId: '6b0defc7-3f14-4176-97e9-06ad19547a91',
    exactByteIdentity: true,
  }),
  Object.freeze({
    subject: '5SSCKOW',
    filename: 'depth_bgRm_S5F.data',
    creatorGitBlobSha: '3823e9fce02049806ab1adc79d9c395b48c0d007',
    sizeBytes: 35_462,
    sha256:
      'sha256:f72d51e3b96172a2d0f1ad542dc9015d9d36a988cd533c7c8e3ddfd585a220fb',
    publisherFileId: '1ef0d8b3-5c1b-4c5c-a3c8-e63084788d16',
    exactByteIdentity: true,
  }),
  Object.freeze({
    subject: 'FC6KAXU',
    filename: 'depth_bgRm_2XS.data',
    creatorGitBlobSha: 'd07c7c91d3c28639221ae0d4491a980d2ad17185',
    sizeBytes: 35_462,
    sha256:
      'sha256:fb3c0a24c12ed60f08f30d94f85d0fd5b3802810905610b929e37055e6f06a6b',
    publisherFileId: 'd61e3ce2-db39-406f-bc3b-f73d3e95df08',
    exactByteIdentity: true,
  }),
  Object.freeze({
    subject: 'CPUR8VH',
    filename: 'depth_bgRm_V5J.data',
    creatorGitBlobSha: '4f015141e9f704118d159e3f95a57eb35d92992a',
    sizeBytes: 35_462,
    sha256:
      'sha256:e043bdf6dd602b0ae4679ed19c5c783cafca0c66a7fdf71c775d5590b35b6dbf',
    publisherFileId: '363305ae-d5bf-4eaa-989f-48ac5de7ce9d',
    exactByteIdentity: true,
  }),
] as const);

export const FR300_R1P_CURRENT_DEPTH_AUTHORITY = Object.freeze({
  schemaVersion:
    'fr300-r1p-v2-depth-survivability-authority-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  datasetRef: 'doi:10.17632/kpdkpcs8zb.4' as const,
  creatorCommit:
    '460b8873ab9a13e67ae82e0264d6dfbf10461e07' as const,
  status: 'official_v4_creator_bytes_exactly_bound' as const,
  inspectedSampleCount: 5 as const,
  exactArtifactMatchCount: 5 as const,
  creatorSingleByteProjectionLineageBound: true as const,
  metricDepthRecoverability:
    'destroyed_by_single_byte_projection' as const,
  metricReferenceDisposition:
    'rejected_for_metric_reference' as const,
  participantCommercialProductUseScopeEstablished: false as const,
  authority: Object.freeze({
    metricScaleAdmitted: false as const,
    realFR299BundleEligible: false as const,
    fr300R2Eligible: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
  nextEvidenceNeed:
    'commercial_compatible_metric_3d_candidate_refresh' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1P ${message}`);
}

export function assertFR300R1PV2DepthSurvivabilityContract(): void {
  if (
    FR300_R1G_CREATOR_PIPELINE_METRIC_AUDIT_CONTRACT_VERSION !==
      'FR300-R1G-CREATOR-PIPELINE-METRIC-AUDIT-v1' ||
    FR300_R1G_CURRENT_METRIC_AUTHORITY.authority.metricScaleAdmitted !==
      false
  ) {
    fail('FR300-R1G predecessor authority drift.');
  }

  if (
    FR300_R1O_V2_OFFICIAL_CONTENT_ANCHOR_CONTRACT_VERSION !==
      'FR300-R1O-V2-OFFICIAL-CONTENT-ANCHOR-v1' ||
    FR300_R1O_CURRENT_CONTENT_AUTHORITY.v4DatasetContentAnchorBound !==
      true
  ) {
    fail('FR300-R1O predecessor authority drift.');
  }

  if (
    FR300_R1P_EXACT_ARTIFACT_RECEIPTS.length !== 5 ||
    FR300_R1P_EXACT_ARTIFACT_RECEIPTS.some(
      (receipt) =>
        receipt.sizeBytes !== 35_462 ||
        receipt.exactByteIdentity !== true,
    )
  ) {
    fail('official V4 exact artifact receipts drift.');
  }

  const current = FR300_R1P_CURRENT_DEPTH_AUTHORITY;
  if (
    current.status !== 'official_v4_creator_bytes_exactly_bound' ||
    current.exactArtifactMatchCount !== 5 ||
    current.creatorSingleByteProjectionLineageBound !== true ||
    current.metricDepthRecoverability !==
      'destroyed_by_single_byte_projection' ||
    current.metricReferenceDisposition !==
      'rejected_for_metric_reference' ||
    current.authority.metricScaleAdmitted !== false ||
    current.authority.fr300R2Eligible !== false
  ) {
    fail('V2 metric-survivability authority drift.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR300-R1P must preserve 18/29 product materialization.');
  }
}

assertFR300R1PV2DepthSurvivabilityContract();
