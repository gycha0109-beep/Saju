import {
  FR300_R1G_CURRENT_METRIC_AUTHORITY,
  FR300_R1G_CREATOR_PIPELINE_METRIC_AUDIT_CONTRACT_VERSION,
} from './rap3df-v2-creator-pipeline-metric-audit-fr300-r1g.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1O_V2_OFFICIAL_CONTENT_ANCHOR_CONTRACT_VERSION =
  'FR300-R1O-V2-OFFICIAL-CONTENT-ANCHOR-v1' as const;

export const FR300_R1O_CURRENT_CONTENT_AUTHORITY = Object.freeze({
  schemaVersion:
    'fr300-r1o-v2-official-content-anchor-authority-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  datasetRef: 'doi:10.17632/kpdkpcs8zb.4' as const,
  datasetVersion: 4 as const,
  v2RootFolderId:
    '67f0c597-b978-426e-b3df-8c1a6f2db2ef' as const,
  rootFileCount: 1 as const,
  databaseIdentity: Object.freeze({
    fileId:
      '6b7f0bd4-d235-482e-a762-bf2f1f9ca5c6' as const,
    filename: 'database.json' as const,
    sizeBytes: 273_343 as const,
    sha256:
      'sha256:1366f0496078a250b43bafffc3483d3f949c33afb32520a041d92d353598e3ea' as const,
  }),
  v4DatasetContentAnchorBound: true as const,
  convenienceArchive: Object.freeze({
    observedSizeBytes: 66_792_678 as const,
    observedSha256:
      'sha256:92a967bdacba4a7e5d387232f2d3308ad656022953c0139f615def2f607ccc5e' as const,
    digestRepresentedInV2RootPublisherMetadata: false as const,
    publisherMetadataBound: false as const,
  }),
  creatorPipelineMetricConflictResolved: false as const,
  participantCommercialProductUseScopeEstablished: false as const,
  authority: Object.freeze({
    realFR299BundleEligible: false as const,
    fr300R2Eligible: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
  nextEvidenceNeed:
    'authenticate_exact_v4_member_level_depth_identity_against_publisher_metadata_and_reconcile_creator_metric_pipeline' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1O ${message}`,
  );
}

export function assertFR300R1OV2OfficialContentAnchorContract(): void {
  if (
    FR300_R1G_CREATOR_PIPELINE_METRIC_AUDIT_CONTRACT_VERSION !==
      'FR300-R1G-CREATOR-PIPELINE-METRIC-AUDIT-v1' ||
    FR300_R1G_CURRENT_METRIC_AUTHORITY.authority.fr300R2Eligible !==
      false
  ) {
    fail('FR300-R1G predecessor authority drift.');
  }

  const current = FR300_R1O_CURRENT_CONTENT_AUTHORITY;
  if (
    current.v4DatasetContentAnchorBound !== true ||
    current.databaseIdentity.sizeBytes !== 273_343 ||
    current.databaseIdentity.sha256 !==
      'sha256:1366f0496078a250b43bafffc3483d3f949c33afb32520a041d92d353598e3ea' ||
    current.convenienceArchive.publisherMetadataBound !== false ||
    current.creatorPipelineMetricConflictResolved !== false ||
    current.authority.fr300R2Eligible !== false
  ) {
    fail('V4 content-anchor authority drift.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR300-R1O must preserve 18/29 product materialization.');
  }
}

assertFR300R1OV2OfficialContentAnchorContract();
