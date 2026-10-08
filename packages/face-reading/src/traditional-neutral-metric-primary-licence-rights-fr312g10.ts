import {
  FR312G7_SOURCE_CATALOGUE,
} from './traditional-neutral-metric-source-evidence-audit-fr312g7.js';
import {
  FR312G8_SOURCE_FEASIBILITY,
  FR312G8_FEASIBILITY_VERDICT,
  assertExactAxisEvidenceFeasibilityFR312G8,
} from './traditional-neutral-metric-source-feasibility-fr312g8.js';
import {
  FR312G6_NUMERIC_GOVERNANCE_REVIEW,
} from './traditional-neutral-metric-numeric-governance-review-fr312g6.js';

export const FR312G10_REVIEW_ID = 'fr312g10.primary_licence_rights_owner_route' as const;

export type OfficialSourceIdFR312G10 = 'FR312G7-S01' | 'FR312G7-S02';
export type IntendedUseFR312G10 =
  | 'commercial_product_research'
  | 'derived_neutral_ratio_statistics'
  | 'third_party_or_cloud_processing'
  | 'internal_research_only';

export interface PrimaryLicenceFindingFR312G10 {
  readonly sourceId: OfficialSourceIdFR312G10;
  readonly dataset: string;
  readonly primarySourceUrl: string;
  readonly governingLicenceUrl: string | null;
  readonly distributionContact: string | null;
  readonly researchAccessRoute: 'unverified_historical_distribution' | 'institutional_signed_agreement';
  readonly commercialRight: 'unverified_no_permission' | 'express_prior_written_permission_required';
  readonly imageModificationRight: 'unverified_no_permission' | 'express_prior_written_permission_required';
  readonly dataRedistributionRight: 'unverified_no_permission' | 'prior_owner_approval_required';
  readonly organisationSignatureRequired: boolean | null;
  readonly rawRecordsAccessibleNow: false;
  readonly commercialUseApproved: false;
  readonly derivativeMetricUseApproved: false;
  readonly cloudProcessingApproved: false;
  readonly empiricalEvidenceAdmitted: false;
  readonly ownerReplyReceived: false;
  readonly officialBasis: string;
}

export const FR312G10_PRIMARY_LICENCE_FINDINGS: readonly PrimaryLicenceFindingFR312G10[] =
  Object.freeze([
    Object.freeze({
      sourceId: 'FR312G7-S01' as const,
      dataset: 'CMU Multi-PIE',
      primarySourceUrl: 'https://www.cs.cmu.edu/afs/cs/project/PIE/MultiPie/Multi-Pie/Home.html',
      governingLicenceUrl: null,
      distributionContact: null,
      researchAccessRoute: 'unverified_historical_distribution' as const,
      commercialRight: 'unverified_no_permission' as const,
      imageModificationRight: 'unverified_no_permission' as const,
      dataRedistributionRight: 'unverified_no_permission' as const,
      organisationSignatureRequired: null,
      rawRecordsAccessibleNow: false as const,
      commercialUseApproved: false as const,
      derivativeMetricUseApproved: false as const,
      cloudProcessingApproved: false as const,
      empiricalEvidenceAdmitted: false as const,
      ownerReplyReceived: false as const,
      officialBasis: 'The CMU project page has a historical Flintbox distribution link, but it does not provide a verifiable current dataset-specific executed licence, commercial/reanalysis grant, or valid modern delivery channel. Terms from unrelated CMU software or libraries are not Multi-PIE terms.',
    }),
    Object.freeze({
      sourceId: 'FR312G7-S02' as const,
      dataset: 'FRGC v2.0 / University of Notre Dame',
      primarySourceUrl: 'https://cvrl.nd.edu/projects/data/',
      governingLicenceUrl: 'https://cvrl.nd.edu/media/django-summernote/2018-09-19/c7654649-5277-4d8c-b069-483d8ffa3039.pdf',
      distributionContact: 'cvrl@nd.edu',
      researchAccessRoute: 'institutional_signed_agreement' as const,
      commercialRight: 'express_prior_written_permission_required' as const,
      imageModificationRight: 'express_prior_written_permission_required' as const,
      dataRedistributionRight: 'prior_owner_approval_required' as const,
      organisationSignatureRequired: true,
      rawRecordsAccessibleNow: false as const,
      commercialUseApproved: false as const,
      derivativeMetricUseApproved: false as const,
      cloudProcessingApproved: false as const,
      empiricalEvidenceAdmitted: false as const,
      ownerReplyReceived: false as const,
      officialBasis: 'FRGC v2.0 licence revised 2006-04-21: clause 1 forbids redistribution without UND Principal Investigator approval; clause 2 restricts to internal research and requires prior UND written permission for modification and commercial use; clauses 3 and institutional CVRL instructions require authorised organisation execution and approval. No product, ratio-derivative, or external processing permission was issued.',
    }),
  ]);

export interface IntendedSourceRightsReviewFR312G10 {
  readonly sourceId: OfficialSourceIdFR312G10;
  readonly intendedUse: IntendedUseFR312G10;
}

/**
 * Documentary-only negative decision, not a licence verifier or approval tool.
 * No caller-provided boolean or fabricated agreement can override an owner.
 */
export function reviewSourceRightsFR312G10(
  request: IntendedSourceRightsReviewFR312G10,
): Readonly<{
  sourceId: OfficialSourceIdFR312G10;
  intendedUse: IntendedUseFR312G10;
  rightsState: 'explicit_restriction' | 'unverified';
  evidenceForOwnerPermission: 'not_obtained';
  permittedToAcquireImages: false;
  permittedToComputeFromExternalFaces: false;
  permittedAsNumericPrior: false;
  blockers: readonly string[];
}> {
  assertPrimaryLicenceRightsFR312G10();
  if (!request || typeof request !== 'object' || Array.isArray(request)) {
    throw new Error('fr312g10_invalid_request');
  }
  const keys = Object.keys(request);
  if (keys.length !== 2 || !keys.includes('sourceId') || !keys.includes('intendedUse')) {
    throw new Error('fr312g10_untrusted_permission_claim_or_unknown_field');
  }
  const source = FR312G10_PRIMARY_LICENCE_FINDINGS.find((x) => x.sourceId === request.sourceId);
  if (!source) throw new Error('fr312g10_unregistered_source');
  if (!(['commercial_product_research', 'derived_neutral_ratio_statistics',
    'third_party_or_cloud_processing', 'internal_research_only'] as readonly string[])
    .includes(request.intendedUse)) {
    throw new Error('fr312g10_unregistered_use');
  }
  const blockers = source.sourceId === 'FR312G7-S02'
    ? [
      'und_original_internal_research_licence_not_executed',
      'und_commercial_and_modification_exceptions_not_granted_in_writing',
      'und_derivative_metrics_cloud_processing_scope_not_confirmed',
      'fr312g_exact_axis_repeated_statistics_unavailable',
    ]
    : [
      'cmu_current_distribution_and_rightsholder_unknown',
      'cmu_dataset_specific_licence_and_commercial_reanalysis_rights_unverified',
      'fr312g_exact_axis_repeated_statistics_unavailable',
    ];
  return Object.freeze({
    sourceId: source.sourceId,
    intendedUse: request.intendedUse,
    rightsState: source.sourceId === 'FR312G7-S02' ? 'explicit_restriction' as const : 'unverified' as const,
    evidenceForOwnerPermission: 'not_obtained' as const,
    permittedToAcquireImages: false as const,
    permittedToComputeFromExternalFaces: false as const,
    permittedAsNumericPrior: false as const,
    blockers: Object.freeze(blockers),
  });
}

export function assertPrimaryLicenceRightsFR312G10(): void {
  assertExactAxisEvidenceFeasibilityFR312G8();
  const ids = FR312G10_PRIMARY_LICENCE_FINDINGS.map((source) => source.sourceId);
  const expected = ['FR312G7-S01', 'FR312G7-S02'];
  const catalogueIds = FR312G7_SOURCE_CATALOGUE.map((source) => source.sourceId);
  const feasibilityIds = FR312G8_SOURCE_FEASIBILITY.map((source) => source.sourceId);
  if (
    ids.length !== 2 || ids.join('|') !== expected.join('|')
    || ids.some((id) => !catalogueIds.includes(id) || !feasibilityIds.includes(id))
  ) throw new Error('fr312g10_source_identity_drift');
  for (const entry of FR312G10_PRIMARY_LICENCE_FINDINGS) {
    if (
      !entry.primarySourceUrl.startsWith('https://')
      || entry.rawRecordsAccessibleNow
      || entry.commercialUseApproved
      || entry.derivativeMetricUseApproved
      || entry.cloudProcessingApproved
      || entry.empiricalEvidenceAdmitted
      || entry.ownerReplyReceived
    ) throw new Error('fr312g10_premature_permission:' + entry.sourceId);
  }
  const frgc = FR312G10_PRIMARY_LICENCE_FINDINGS[1]!;
  if (
    frgc.commercialRight !== 'express_prior_written_permission_required'
    || frgc.imageModificationRight !== 'express_prior_written_permission_required'
    || frgc.dataRedistributionRight !== 'prior_owner_approval_required'
    || frgc.organisationSignatureRequired !== true
    || frgc.distributionContact !== 'cvrl@nd.edu'
    || !frgc.governingLicenceUrl?.endsWith('.pdf')
    || FR312G8_FEASIBILITY_VERDICT.reviewableExternalNumericCandidates !== 0
    || FR312G6_NUMERIC_GOVERNANCE_REVIEW.participantCount !== null
    || FR312G6_NUMERIC_GOVERNANCE_REVIEW.evidencePacketIssued
  ) throw new Error('fr312g10_frgc_contract_or_numeric_authority_drift');
}
