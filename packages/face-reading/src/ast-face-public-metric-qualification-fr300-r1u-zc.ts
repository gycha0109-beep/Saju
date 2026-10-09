import {
  FR300_R1T_ZC_CURRENT_GATE,
  FR300_R1T_ZC_ULDD_PUBLIC_METRIC_CONTRACT_VERSION,
  assertFR300R1TZCULDDPublicMetricContract,
} from './ul-dd-public-metric-qualification-fr300-r1t-zc.js';
import {
  FR300_R1R_ZC_CANDIDATES,
} from './zero-cost-metric-3d-qualification-fr300-r1r-zc.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1U_ZC_AST_PUBLIC_METRIC_CONTRACT_VERSION =
  'FR300-R1U-ZC-AST-PUBLIC-METRIC-v1' as const;

export const FR300_R1U_ZC_AST_SOURCE_BOUND_FACTS = Object.freeze({
  datasetDoi: '10.17605/OSF.IO/XK4F6' as const,
  participantCount: 98 as const,
  publicTier: Object.freeze([
    'topology_standardized_non_textured_meshes',
    '84_point_landmarks',
    'deformation_fields',
    'au_expression_metadata',
  ] as const),
  controlledTier: Object.freeze([
    'raw_3d_scans',
    'textured_meshes_where_consented',
    'synchronized_multiview_rgb_where_consented',
  ] as const),
  controlledAccessRequiresDua: true as const,
  publicDerivedReleaseConsentVerified: true as const,
  identifiableModalitiesAdditionalConsentRequired: true as const,
  publicCommercialProductDevelopmentScope:
    'not_source_bound' as const,
});

export const FR300_R1U_ZC_AST_SCALE_PIPELINE = Object.freeze({
  paperStatesCanonicalIcpAlignment: true as const,
  paperStatesScaleNormalization: true as const,
  officialPipelineSourceNormalizesEachPointCloudToUnitSphere: true as const,
  officialPipelineSourceDiscardsSourceCentroidAndScaleForOutput:
    true as const,
  officialPipelineSourceDenormalizesAlignedOutputToTargetFrame:
    true as const,
  publicMeshIsTopologyStandardizedDerivedArtifact: true as const,
  rawScannerAbsoluteMetricScalePreservedInPublicStandardizedMesh:
    false as const,
  publicStandardizedObjCoordinatesMayBeTreatedAsScannerPhysicalUnits:
    false as const,
});

export const FR300_R1U_ZC_AST_ADJUDICATION = Object.freeze({
  publicStandardizedMeshMetricScale:
    'not_fr299_metric_authority_scale_normalized_derived_geometry' as const,
  publicTierDisposition:
    'terminal_reject_public_standardized_mesh_as_fr299_metric_source' as const,
  wholeCandidateTerminalReject: false as const,
  controlledRawScanDisposition:
    'hold_unqualified_dua_controlled_raw_geometry' as const,
  controlledRawScanMetricPotential:
    'unresolved_until_exact_raw_artifact_unit_and_rights_are_source_bound' as const,
  prohibitedSubstitutions: Object.freeze([
    'public_standardized_obj_coordinate_values_for_raw_scanner_metric_units',
    'public_release_consent_for_commercial_product_development_permission',
    'topology_standardized_mesh_for_controlled_raw_scan',
  ] as const),
});

export const FR300_R1U_ZC_CURRENT_GATE = Object.freeze({
  schemaVersion: 'fr300-r1u-zc-ast-public-metric-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  publicSourceReviewCompleted: true as const,
  publicSubjectArtifactDownloadPerformed: false as const,
  controlledDataAccessRequested: false as const,
  controlledDataAccessAuthorizedByThisTrack: false as const,
  duaSignedOrSent: false as const,
  externalContactPerformed: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  nextActionWithoutNewAuthorization:
    'review_ast_face_dua_and_raw_scan_unit_authority_without_requesting_access_or_evaluate_existing_hardware_metric_reference' as const,
  authority: Object.freeze({
    astPublicStandardizedMeshMetricReferenceAuthorized: false as const,
    astControlledRawScanMetricReferenceAuthorized: false as const,
    realFR299BundleAuthorized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1U-ZC ${message}`);
}

export function assertFR300R1UZCASTPublicMetricContract(): void {
  assertFR300R1TZCULDDPublicMetricContract();

  if (
    FR300_R1T_ZC_ULDD_PUBLIC_METRIC_CONTRACT_VERSION !==
      'FR300-R1T-ZC-ULDD-PUBLIC-METRIC-v1' ||
    FR300_R1T_ZC_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1T_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0
  ) {
    fail('R1T-ZC predecessor authority drift.');
  }

  const ast = FR300_R1R_ZC_CANDIDATES.find(
    (candidate) => candidate.id === 'ast_face_public_and_controlled',
  );
  if (
    ast?.costState !== 'zero_cost_on_request' ||
    ast.rightsState !== 'commercial_product_scope_unresolved' ||
    ast.metricState !== 'metric_contract_unresolved' ||
    ast.disposition !== 'hold_zero_cost_rights'
  ) {
    fail('AST-Face predecessor candidate state drift.');
  }

  if (
    !FR300_R1U_ZC_AST_SOURCE_BOUND_FACTS.controlledAccessRequiresDua ||
    !FR300_R1U_ZC_AST_SOURCE_BOUND_FACTS.publicDerivedReleaseConsentVerified ||
    FR300_R1U_ZC_AST_SOURCE_BOUND_FACTS.publicCommercialProductDevelopmentScope !==
      'not_source_bound'
  ) {
    fail('AST-Face public/controlled rights boundary drift.');
  }

  const pipeline = FR300_R1U_ZC_AST_SCALE_PIPELINE;
  if (
    !pipeline.paperStatesCanonicalIcpAlignment ||
    !pipeline.paperStatesScaleNormalization ||
    !pipeline.officialPipelineSourceNormalizesEachPointCloudToUnitSphere ||
    !pipeline.officialPipelineSourceDiscardsSourceCentroidAndScaleForOutput ||
    !pipeline.officialPipelineSourceDenormalizesAlignedOutputToTargetFrame ||
    !pipeline.publicMeshIsTopologyStandardizedDerivedArtifact ||
    pipeline.rawScannerAbsoluteMetricScalePreservedInPublicStandardizedMesh ||
    pipeline.publicStandardizedObjCoordinatesMayBeTreatedAsScannerPhysicalUnits
  ) {
    fail('AST-Face scale-normalization boundary drift.');
  }

  if (
    FR300_R1U_ZC_AST_ADJUDICATION.publicTierDisposition !==
      'terminal_reject_public_standardized_mesh_as_fr299_metric_source' ||
    FR300_R1U_ZC_AST_ADJUDICATION.wholeCandidateTerminalReject ||
    FR300_R1U_ZC_AST_ADJUDICATION.controlledRawScanDisposition !==
      'hold_unqualified_dua_controlled_raw_geometry'
  ) {
    fail('AST-Face public-vs-controlled disposition drift.');
  }

  if (
    FR300_R1U_ZC_CURRENT_GATE.publicSubjectArtifactDownloadPerformed ||
    FR300_R1U_ZC_CURRENT_GATE.controlledDataAccessRequested ||
    FR300_R1U_ZC_CURRENT_GATE.controlledDataAccessAuthorizedByThisTrack ||
    FR300_R1U_ZC_CURRENT_GATE.duaSignedOrSent ||
    FR300_R1U_ZC_CURRENT_GATE.externalContactPerformed ||
    FR300_R1U_ZC_CURRENT_GATE.paidSpendAuthorized ||
    FR300_R1U_ZC_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1U_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0 ||
    FR300_R1U_ZC_CURRENT_GATE.authority
      .astPublicStandardizedMeshMetricReferenceAuthorized ||
    FR300_R1U_ZC_CURRENT_GATE.authority
      .astControlledRawScanMetricReferenceAuthorized ||
    FR300_R1U_ZC_CURRENT_GATE.authority.realFR299BundleAuthorized ||
    FR300_R1U_ZC_CURRENT_GATE.authority.fr300R2Authorized
  ) {
    fail('AST-Face qualification widened operational authority.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState === 'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('R1U-ZC must preserve 18/29 product materialization.');
  }
}

assertFR300R1UZCASTPublicMetricContract();
