import {
  FR312G7_AXIS_EVIDENCE_MATRIX,
  FR312G7_SOURCE_CATALOGUE,
  assertExternalEvidenceAuditFR312G7,
} from './traditional-neutral-metric-source-evidence-audit-fr312g7.js';
import {
  FR312G_RELIABILITY_FAMILIES,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G6_NUMERIC_GOVERNANCE_REVIEW,
} from './traditional-neutral-metric-numeric-governance-review-fr312g6.js';

/**
 * FR312G8 assesses the accessibility of documentary evidence, not data access.
 * A checked website, published paper or a successful download is never a licence.
 */
export const FR312G8_PROTOCOL_ID = 'fr312g8.exact_axis_source_feasibility' as const;
export const FR312G8_REVIEW_DATE = '2026-10-08' as const;

export type AccessRouteFR312G8 =
  | 'stale_distribution_link'
  | 'signed_organizational_agreement_required'
  | 'noncommercial_research_licence_only'
  | 'publication_only'
  | 'statistical_methods_only';

export interface SourceFeasibilityFR312G8 {
  readonly sourceId: string;
  readonly accessRoute: AccessRouteFR312G8;
  readonly verifiedPublicDocumentation: string;
  readonly currentDataAccessConfirmed: false;
  readonly productCompatibleRightsConfirmed: false;
  readonly existingRawDataUseAuthorized: false;
  readonly exactAxisObservationsAvailable: false;
  readonly independentParticipantsLinkable: false;
  readonly pairedSessionsAndAcceptedCapturesVerified: false;
  readonly missingnessAndWithdrawalAvailable: false;
  readonly requestAction: 'verify_current_owner_route' | 'obtain_organizational_licence'
    | 'requires_separate_commercial_permission' | 'author_contact_only'
    | 'methodological_reference_only';
  readonly evidentiaryBlocker: string;
}

/** S01-S07 retain FR312G7 stable source IDs; no facial assets are fetched. */
export const FR312G8_SOURCE_FEASIBILITY: readonly SourceFeasibilityFR312G8[] =
  Object.freeze(([
    {
      sourceId: 'FR312G7-S01',
      accessRoute: 'stale_distribution_link',
      verifiedPublicDocumentation: 'https://www.cs.cmu.edu/afs/cs/project/PIE/MultiPie/Multi-Pie/Home.html',
      currentDataAccessConfirmed: false,
      productCompatibleRightsConfirmed: false,
      existingRawDataUseAuthorized: false,
      exactAxisObservationsAvailable: false,
      independentParticipantsLinkable: false,
      pairedSessionsAndAcceptedCapturesVerified: false,
      missingnessAndWithdrawalAvailable: false,
      requestAction: 'verify_current_owner_route',
      evidentiaryBlocker: 'The official distribution link redirects to a generic Wellspring search portal; current fulfilment and applicable rights cannot be verified. Four longitudinal sessions do not prove the FR312F accepted-capture protocol.',
    },
    {
      sourceId: 'FR312G7-S02',
      accessRoute: 'signed_organizational_agreement_required',
      verifiedPublicDocumentation: 'https://www.nist.gov/programs-projects/face-recognition-grand-challenge-frgc',
      currentDataAccessConfirmed: false,
      productCompatibleRightsConfirmed: false,
      existingRawDataUseAuthorized: false,
      exactAxisObservationsAvailable: false,
      independentParticipantsLinkable: false,
      pairedSessionsAndAcceptedCapturesVerified: false,
      missingnessAndWithdrawalAvailable: false,
      requestAction: 'obtain_organizational_licence',
      evidentiaryBlocker: 'NIST requires an organization-authorized signatory for dataset/software licensing; 4,003 subject sessions are not 4,003 independent participants and published recognition scores are not FR312G ratios.',
    },
    {
      sourceId: 'FR312G7-S03',
      accessRoute: 'noncommercial_research_licence_only',
      verifiedPublicDocumentation: 'https://nju-3dv.github.io/projects/FaceScape/',
      currentDataAccessConfirmed: false,
      productCompatibleRightsConfirmed: false,
      existingRawDataUseAuthorized: false,
      exactAxisObservationsAvailable: false,
      independentParticipantsLinkable: false,
      pairedSessionsAndAcceptedCapturesVerified: false,
      missingnessAndWithdrawalAvailable: false,
      requestAction: 'requires_separate_commercial_permission',
      evidentiaryBlocker: 'Official licence only allows internal noncommercial research, evaluation or testing. Twenty expression variants are not two temporal capture sessions.',
    },
    {
      sourceId: 'FR312G7-S04',
      accessRoute: 'publication_only',
      verifiedPublicDocumentation: 'https://pubmed.ncbi.nlm.nih.gov/35622942/',
      currentDataAccessConfirmed: false,
      productCompatibleRightsConfirmed: false,
      existingRawDataUseAuthorized: false,
      exactAxisObservationsAvailable: false,
      independentParticipantsLinkable: false,
      pairedSessionsAndAcceptedCapturesVerified: false,
      missingnessAndWithdrawalAvailable: false,
      requestAction: 'author_contact_only',
      evidentiaryBlocker: 'Thirty-participant 3D landmark/anthropometric repeatability paper has no verified authorized participant-row values for the eight FR312G 2D ratio estimands.',
    },
    {
      sourceId: 'FR312G7-S05',
      accessRoute: 'publication_only',
      verifiedPublicDocumentation: 'https://pubmed.ncbi.nlm.nih.gov/18452351/',
      currentDataAccessConfirmed: false,
      productCompatibleRightsConfirmed: false,
      existingRawDataUseAuthorized: false,
      exactAxisObservationsAvailable: false,
      independentParticipantsLinkable: false,
      pairedSessionsAndAcceptedCapturesVerified: false,
      missingnessAndWithdrawalAvailable: false,
      requestAction: 'author_contact_only',
      evidentiaryBlocker: 'Twenty-participant 3D/direct linear-distance study cannot supply participant-clustered FR312G visible contour ratios or missingness without separately authorized remeasurement.',
    },
    {
      sourceId: 'FR312G7-S06',
      accessRoute: 'statistical_methods_only',
      verifiedPublicDocumentation: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4913118/',
      currentDataAccessConfirmed: false,
      productCompatibleRightsConfirmed: false,
      existingRawDataUseAuthorized: false,
      exactAxisObservationsAvailable: false,
      independentParticipantsLinkable: false,
      pairedSessionsAndAcceptedCapturesVerified: false,
      missingnessAndWithdrawalAvailable: false,
      requestAction: 'methodological_reference_only',
      evidentiaryBlocker: 'An ICC model/reporting guideline does not contain repeat-capture observations of FR312G mouth metrics.',
    },
    {
      sourceId: 'FR312G7-S07',
      accessRoute: 'statistical_methods_only',
      verifiedPublicDocumentation: 'https://pubmed.ncbi.nlm.nih.gov/2868172/',
      currentDataAccessConfirmed: false,
      productCompatibleRightsConfirmed: false,
      existingRawDataUseAuthorized: false,
      exactAxisObservationsAvailable: false,
      independentParticipantsLinkable: false,
      pairedSessionsAndAcceptedCapturesVerified: false,
      missingnessAndWithdrawalAvailable: false,
      requestAction: 'methodological_reference_only',
      evidentiaryBlocker: 'An agreement-method paper gives no participant-specific variance or unavailable-case distribution for the eight FR312G axes.',
    },
  ] as const).map((entry) => Object.freeze(entry)));

export const FR312G8_EXACT_AXIS_REPRODUCTION_REQUIREMENTS = Object.freeze([
  'FR291 visible central groove axis endpoints and visible mouth-width denominator; 2-session participant-paired ratio observations',
  'FR291 visible groove corridor boundary width and mouth-width denominator; unavailable reasons retained',
  'FR80 pose-normalized unordered lip-contour union bounding-box x/y aspect ratio; no substitution by anatomical linear width',
  'FR82 FR79 2D lip horizontal span / FR77 canonical-aligned 468-landmark 3D mesh span under common metric-x projection',
  'FR212 signed mean corner elevation relative to visible mouth width with accepted neutral expression captures',
  'FR293 visible upper-lip band vertical span over mouth width with correct visible/nonanatomical boundaries',
  'FR293 visible lower-lip band vertical span over mouth width with correct visible/nonanatomical boundaries',
  'FR293 combined visible lip-band area over squared mouth width, recording unavailable cases instead of zero',
] as const);

export interface AxisFeasibilityFR312G8 {
  readonly comparatorKey: string;
  readonly metricRef: string;
  readonly candidateSourceIds: readonly string[];
  readonly definitionRequirement: string;
  readonly definitionProof: 'not_established';
  readonly lawfulCommercialResearchRights: 'not_established';
  readonly participantClusteredSessionPairEvidence: 'not_established';
  readonly exactAxisVarianceEvidence: 'not_established';
  readonly missingnessWithdrawalEvidence: 'not_established';
  readonly outcome: 'hold_for_evidence';
  readonly numericReviewCandidateApproved: false;
}

export const FR312G8_AXIS_FEASIBILITY: readonly AxisFeasibilityFR312G8[] =
  Object.freeze(FR312G7_AXIS_EVIDENCE_MATRIX.map((axis, index) =>
    Object.freeze({
      comparatorKey: axis.comparatorKey,
      metricRef: axis.metricRef,
      candidateSourceIds: axis.candidateSourceIds,
      definitionRequirement: FR312G8_EXACT_AXIS_REPRODUCTION_REQUIREMENTS[index]!,
      definitionProof: 'not_established' as const,
      lawfulCommercialResearchRights: 'not_established' as const,
      participantClusteredSessionPairEvidence: 'not_established' as const,
      exactAxisVarianceEvidence: 'not_established' as const,
      missingnessWithdrawalEvidence: 'not_established' as const,
      outcome: 'hold_for_evidence' as const,
      numericReviewCandidateApproved: false as const,
    }),
  ));

export const FR312G8_FEASIBILITY_VERDICT = Object.freeze({
  protocolId: FR312G8_PROTOCOL_ID,
  sourceCount: 7,
  axisCount: 8,
  verifiedExactAxisNumericEvidenceCount: 0,
  reviewableExternalNumericCandidates: 0,
  dataRightsVerifiedSources: 0,
  disposition: 'halt_numeric_sizing_pending_governed_exact_axis_evidence' as const,
  literatureAndMethodologyReferenceOnly: true as const,
  datasetLicenceOrOwnerResponseStillRequired: true as const,
  externalFaceImagesAcquisitionAuthorized: false as const,
  automaticEvidenceAdmissionAuthorized: false as const,
  numericSampleSizeAuthorized: false as const,
  participantRecruitmentAuthorized: false as const,
  dataCollectionAuthorized: false as const,
  fr312gReliabilityExecutionAuthorized: false as const,
  fr312hEntryAuthorized: false as const,
  traditionalMeaningBindingAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

/** Fail closed across FR312G7/8 and the independent FR312G6 numeric authority boundary. */
export function assertExactAxisEvidenceFeasibilityFR312G8(): void {
  assertExternalEvidenceAuditFR312G7();
  const sources = FR312G7_SOURCE_CATALOGUE;
  const sourceIds = sources.map((s) => s.sourceId);
  const axes = FR312G_RELIABILITY_FAMILIES.flatMap((f) => f.metricAxes);
  if (
    FR312G8_SOURCE_FEASIBILITY.length !== sources.length
    || FR312G8_AXIS_FEASIBILITY.length !== axes.length
    || new Set(FR312G8_SOURCE_FEASIBILITY.map((s) => s.sourceId)).size !== sources.length
    || FR312G8_SOURCE_FEASIBILITY.map((s) => s.sourceId).join('|') !== sourceIds.join('|')
    || FR312G8_AXIS_FEASIBILITY.map((a) => a.metricRef).join('|')
      !== axes.map((a) => a.metricRef).join('|')
  ) throw new Error('fr312g8_upstream_source_or_axis_drift');
  for (const source of FR312G8_SOURCE_FEASIBILITY) {
    if (
      !sourceIds.includes(source.sourceId)
      || !source.verifiedPublicDocumentation.startsWith('https://')
      || source.currentDataAccessConfirmed
      || source.productCompatibleRightsConfirmed
      || source.existingRawDataUseAuthorized
      || source.exactAxisObservationsAvailable
      || source.independentParticipantsLinkable
      || source.pairedSessionsAndAcceptedCapturesVerified
      || source.missingnessAndWithdrawalAvailable
    ) throw new Error('fr312g8_external_source_authority_drift:' + source.sourceId);
  }
  for (const axis of FR312G8_AXIS_FEASIBILITY) {
    if (
      axis.candidateSourceIds.length === 0
      || axis.candidateSourceIds.some((id) => !sourceIds.includes(id))
      || axis.definitionRequirement.length === 0
      || axis.definitionProof !== 'not_established'
      || axis.lawfulCommercialResearchRights !== 'not_established'
      || axis.participantClusteredSessionPairEvidence !== 'not_established'
      || axis.exactAxisVarianceEvidence !== 'not_established'
      || axis.missingnessWithdrawalEvidence !== 'not_established'
      || axis.outcome !== 'hold_for_evidence'
      || axis.numericReviewCandidateApproved
    ) throw new Error('fr312g8_axis_premature_admission:' + axis.metricRef);
  }
  if (
    FR312G8_FEASIBILITY_VERDICT.verifiedExactAxisNumericEvidenceCount !== 0
    || FR312G8_FEASIBILITY_VERDICT.reviewableExternalNumericCandidates !== 0
    || FR312G6_NUMERIC_GOVERNANCE_REVIEW.evidencePacketIssued
    || FR312G6_NUMERIC_GOVERNANCE_REVIEW.participantCount !== null
    || FR312G6_NUMERIC_GOVERNANCE_REVIEW.partitionRatios !== null
  ) throw new Error('fr312g8_numeric_authority_drift');
  for (const [key, value] of Object.entries(FR312G8_FEASIBILITY_VERDICT)) {
    if (key.endsWith('Authorized') && value !== false) {
      throw new Error('fr312g8_authority_widened:' + key);
    }
  }
}
