import {
  FR312G_RELIABILITY_FAMILIES,
  FR312G_STUDY_DESIGN,
  assertNeutralMetricReliabilityStudyDesignFR312G,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G4_PLANNING_CONTRACT,
  assertParticipantCountPlanningRationaleFR312G4,
} from './traditional-neutral-metric-participant-count-rationale-fr312g4.js';
import {
  FR312G6_NUMERIC_GOVERNANCE_REVIEW,
  assertNumericGovernanceReviewFR312G6,
} from './traditional-neutral-metric-numeric-governance-review-fr312g6.js';

export const FR312G7_AUDIT_ID = 'fr312g7.external_source_evidence_audit' as const;
export const FR312G7_REVIEW_DATE = '2026-10-08' as const;

export type SourceSuitabilityFR312G7 =
  | 'eligible_for_numeric_review'
  | 'limited_support_only'
  | 'insufficient_evidence'
  | 'unsuitable';

export interface ExternalSourceFR312G7 {
  readonly sourceId: string;
  readonly sourceType: 'dataset' | 'measurement_study' | 'statistics_method';
  readonly title: string;
  readonly authorsOrInstitution: string;
  readonly publicationOrVersion: string;
  readonly officialUrl: string;
  readonly doi: string | null;
  readonly accessState: 'documentation_only' | 'public_abstract_or_article';
  readonly rights: 'permission_unknown' | 'agreement_required' | 'noncommercial_only' | 'publication_reference_only';
  readonly imageReuseAuthorized: false;
  readonly modality: 'two_dimensional_photos' | 'three_dimensional_models_and_photos' | 'three_dimensional_photogrammetry' | 'methods_only';
  readonly repeatStructure: string;
  readonly numericEvidenceForExactFR312GAxes: false;
  readonly independentParticipantVarianceUsable: false;
  readonly missingnessAndWithdrawalUsable: false;
  readonly suitability: Exclude<SourceSuitabilityFR312G7, 'eligible_for_numeric_review'>;
  readonly limitation: string;
}

export const FR312G7_SOURCE_CATALOGUE: readonly ExternalSourceFR312G7[] = Object.freeze([
  Object.freeze({
    sourceId: 'FR312G7-S01',
    sourceType: 'dataset',
    title: 'CMU Multi-PIE Face Database',
    authorsOrInstitution: 'Carnegie Mellon University',
    publicationOrVersion: 'official database documentation; acquisition/version not established',
    officialUrl: 'https://www.cs.cmu.edu/afs/cs/project/PIE/MultiPie/Multi-Pie/Home.html',
    doi: null,
    accessState: 'documentation_only',
    rights: 'permission_unknown',
    imageReuseAuthorized: false,
    modality: 'two_dimensional_photos',
    repeatStructure: '337 participants; up to 4 sessions; differing pose/lighting/expression; exact FR312F fresh-capture pairs unverified',
    numericEvidenceForExactFR312GAxes: false,
    independentParticipantVarianceUsable: false,
    missingnessAndWithdrawalUsable: false,
    suitability: 'limited_support_only',
    limitation: 'Official session structure is informative; redistribution/commercial rights, licensed access, FR312G metric outputs and clustered variability are unverified.',
  }),
  Object.freeze({
    sourceId: 'FR312G7-S02',
    sourceType: 'dataset',
    title: 'Face Recognition Grand Challenge (FRGC)',
    authorsOrInstitution: 'US National Institute of Standards and Technology',
    publicationOrVersion: 'official project archive; page updated 2025-03-26; exact distribution version unknown',
    officialUrl: 'https://www.nist.gov/programs-projects/face-recognition-grand-challenge-frgc',
    doi: null,
    accessState: 'documentation_only',
    rights: 'agreement_required',
    imageReuseAuthorized: false,
    modality: 'three_dimensional_models_and_photos',
    repeatStructure: '4,003 subject sessions in validation; per-session multiple controlled and uncontrolled 2D captures plus 3D; temporal pairing with FR312F unverified',
    numericEvidenceForExactFR312GAxes: false,
    independentParticipantVarianceUsable: false,
    missingnessAndWithdrawalUsable: false,
    suitability: 'limited_support_only',
    limitation: 'NIST requires signed data/software licenses; recognition experiment statistics are not the eight FR312G mouth/philtrum ratio variances.',
  }),
  Object.freeze({
    sourceId: 'FR312G7-S03',
    sourceType: 'dataset',
    title: 'FaceScape: 3D Facial Dataset and Benchmark for Single-View 3D Face Reconstruction',
    authorsOrInstitution: 'Hao Zhu et al.; Nanjing University CITE Lab',
    publicationOrVersion: 'IEEE TPAMI 2023; official data access site current in 2026',
    officialUrl: 'https://nju-3dv.github.io/projects/FaceScape/',
    doi: null,
    accessState: 'documentation_only',
    rights: 'noncommercial_only',
    imageReuseAuthorized: false,
    modality: 'three_dimensional_models_and_photos',
    repeatStructure: '847 identities x 20 expressions 3D models; 359 identities in multi-view images; FR312F temporally distinct sessions not established',
    numericEvidenceForExactFR312GAxes: false,
    independentParticipantVarianceUsable: false,
    missingnessAndWithdrawalUsable: false,
    suitability: 'unsuitable',
    limitation: 'Licensed for non-commercial internal research only; commercial development and unauthorized portrait publication forbidden. Expression/view multiplicity is not repeated temporal-session FR312G evidence.',
  }),
  Object.freeze({
    sourceId: 'FR312G7-S04',
    sourceType: 'measurement_study',
    title: 'Precision and accuracy assessment of single and multicamera three-dimensional photogrammetry compared with direct anthropometry',
    authorsOrInstitution: 'Sable Staller et al.',
    publicationOrVersion: 'Angle Orthodontist 2022; 92(5):635-641',
    officialUrl: 'https://pubmed.ncbi.nlm.nih.gov/35622942/',
    doi: '10.2319/101321-770.1',
    accessState: 'public_abstract_or_article',
    rights: 'publication_reference_only',
    imageReuseAuthorized: false,
    modality: 'three_dimensional_photogrammetry',
    repeatStructure: '30 participants; two 3D images per method and repeated measurements; not the FR312F two-session four-capture design',
    numericEvidenceForExactFR312GAxes: false,
    independentParticipantVarianceUsable: false,
    missingnessAndWithdrawalUsable: false,
    suitability: 'limited_support_only',
    limitation: '17 soft-tissue landmarks and 16 anthropometric measurements are not the exact eight ratio definitions. Published ICCs cannot be transplanted as FR312G variance.',
  }),
  Object.freeze({
    sourceId: 'FR312G7-S05',
    sourceType: 'measurement_study',
    title: 'Validity and reliability of craniofacial anthropometric measurement of 3D digital photogrammetric images',
    authorsOrInstitution: 'Julielynn Y Wong et al.',
    publicationOrVersion: 'Cleft Palate-Craniofacial Journal 2008; 45(3):232-239',
    officialUrl: 'https://pubmed.ncbi.nlm.nih.gov/18452351/',
    doi: '10.1597/06-175',
    accessState: 'public_abstract_or_article',
    rights: 'publication_reference_only',
    imageReuseAuthorized: false,
    modality: 'three_dimensional_photogrammetry',
    repeatStructure: '20 participants; direct and 3D distances measured twice; FR312F independent temporal sessions not documented',
    numericEvidenceForExactFR312GAxes: false,
    independentParticipantVarianceUsable: false,
    missingnessAndWithdrawalUsable: false,
    suitability: 'limited_support_only',
    limitation: 'Reported linear distances and repeat-rater statistics do not establish any FR312G ratio or per-axis missingness/clustered variance.',
  }),
  Object.freeze({
    sourceId: 'FR312G7-S06',
    sourceType: 'statistics_method',
    title: 'A Guideline of Selecting and Reporting Intraclass Correlation Coefficients for Reliability Research',
    authorsOrInstitution: 'Terry K Koo and Mae Y Li',
    publicationOrVersion: 'Journal of Chiropractic Medicine 2016; 15(2):155-163',
    officialUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4913118/',
    doi: '10.1016/j.jcm.2016.02.012',
    accessState: 'public_abstract_or_article',
    rights: 'publication_reference_only',
    imageReuseAuthorized: false,
    modality: 'methods_only',
    repeatStructure: 'Provides guidance on selection/reporting of ICC models; no FR312G participant-level observations',
    numericEvidenceForExactFR312GAxes: false,
    independentParticipantVarianceUsable: false,
    missingnessAndWithdrawalUsable: false,
    suitability: 'limited_support_only',
    limitation: 'General reporting method is not a precision objective, population norm or variance observation for this study.',
  }),
  Object.freeze({
    sourceId: 'FR312G7-S07',
    sourceType: 'statistics_method',
    title: 'Statistical methods for assessing agreement between two methods of clinical measurement',
    authorsOrInstitution: 'J Martin Bland and Douglas G Altman',
    publicationOrVersion: 'The Lancet 1986; 1(8476):307-310',
    officialUrl: 'https://pubmed.ncbi.nlm.nih.gov/2868172/',
    doi: '10.1016/S0140-6736(86)90837-8',
    accessState: 'public_abstract_or_article',
    rights: 'publication_reference_only',
    imageReuseAuthorized: false,
    modality: 'methods_only',
    repeatStructure: 'Agreement/repeatability analysis methodology, not a facial repeat-capture dataset',
    numericEvidenceForExactFR312GAxes: false,
    independentParticipantVarianceUsable: false,
    missingnessAndWithdrawalUsable: false,
    suitability: 'limited_support_only',
    limitation: 'Method-comparison statistics cannot substitute for observed participant-clustered FR312G variance or available/unavailable outcomes.',
  }),
]);

export interface AxisEvidenceFR312G7 {
  readonly metricRef: string;
  readonly comparatorKey: string;
  readonly candidateSourceIds: readonly string[];
  readonly definitionEquivalence: 'unknown' | 'partial' | 'mismatch' | 'exact';
  readonly captureComparability: 'limited' | 'unsuitable' | 'comparable';
  readonly repeatabilityData: 'unavailable';
  readonly varianceEvidence: 'unavailable';
  readonly missingnessEvidence: 'unavailable';
  readonly dataUseRights: 'restricted_or_unverified';
  readonly admissionSuitability: 'insufficient_evidence';
  readonly requiredFollowUp: string;
}

const AXIS_SOURCE_IDS = Object.freeze([
  ['FR312G7-S01', 'FR312G7-S02', 'FR312G7-S04'],
  ['FR312G7-S01', 'FR312G7-S05'],
  ['FR312G7-S01', 'FR312G7-S03', 'FR312G7-S04'],
  ['FR312G7-S02', 'FR312G7-S03'],
  ['FR312G7-S01', 'FR312G7-S03'],
  ['FR312G7-S03', 'FR312G7-S04', 'FR312G7-S05'],
  ['FR312G7-S03', 'FR312G7-S04', 'FR312G7-S05'],
  ['FR312G7-S03', 'FR312G7-S04'],
] as const);

const AXIS_FOLLOW_UPS = Object.freeze([
  'Verify visible-groove axis endpoints and mouth-width denominator; obtain 2D, two-session participant-paired ratio repeatability and missingness.',
  'Verify visible corridor boundary definition and repeated ratio measurements, including not-observable reasons.',
  'Reproduce unordered pose-normalized lips contour union bounding box aspect ratio, not clinical anatomic length or width.',
  'Match mixed FR79 2D numerator / FR77 canonical 468-point 3D denominator and common metric-x projection exactly.',
  'Verify signed corner-elevation mean over mouth width and handling of smile/expression sensitivity.',
  'Match visible upper-lip band span with non-anatomic contour boundaries and mouth-width normalization.',
  'Match visible lower-lip band span with non-anatomic contour boundaries and mouth-width normalization.',
  'Match combined visible lip-band area divided by squared mouth width, including unavailable outcomes.',
] as const);

export const FR312G7_AXIS_EVIDENCE_MATRIX: readonly AxisEvidenceFR312G7[] =
  Object.freeze(FR312G_RELIABILITY_FAMILIES.flatMap((family) =>
    family.metricAxes.map((axis, localIndex) => {
      const allPriorAxes = FR312G_RELIABILITY_FAMILIES
        .slice(0, FR312G_RELIABILITY_FAMILIES.indexOf(family))
        .reduce((sum, prior) => sum + prior.metricAxes.length, 0);
      const index = allPriorAxes + localIndex;
      return Object.freeze({
        metricRef: axis.metricRef,
        comparatorKey: axis.comparatorKey,
        candidateSourceIds: Object.freeze([...AXIS_SOURCE_IDS[index]!]),
        definitionEquivalence: 'unknown' as const,
        captureComparability: 'limited' as const,
        repeatabilityData: 'unavailable' as const,
        varianceEvidence: 'unavailable' as const,
        missingnessEvidence: 'unavailable' as const,
        dataUseRights: 'restricted_or_unverified' as const,
        admissionSuitability: 'insufficient_evidence' as const,
        requiredFollowUp: AXIS_FOLLOW_UPS[index]!,
      });
    }),
  ));

export const FR312G7_SUFFICIENCY_VERDICT = Object.freeze({
  auditId: FR312G7_AUDIT_ID,
  reviewDate: FR312G7_REVIEW_DATE,
  authorityState: 'external_sources_catalogued_no_axis_specific_numeric_evidence_admitted' as const,
  sourceCount: 7 as const,
  axisCount: 8 as const,
  conclusion: 'insufficient_evidence' as const,
  eligibleSourceCount: 0 as const,
  eligibleAxisCount: 0 as const,
  numericReviewInputApproved: false as const,
  externalRawImageAcquisitionAuthorized: false as const,
  participantCountAuthorized: false as const,
  partitionRatiosAuthorized: false as const,
  recruitmentAuthorized: false as const,
  empiricalCollectionAuthorized: false as const,
  reliabilityExecutionAuthorized: false as const,
  fr312hEntryAuthorized: false as const,
  traditionalMeaningValidationAuthorized: false as const,
  productionInterpretationAuthorized: false as const,
});

export function assertExternalEvidenceAuditFR312G7(): void {
  assertNeutralMetricReliabilityStudyDesignFR312G();
  assertParticipantCountPlanningRationaleFR312G4();
  assertNumericGovernanceReviewFR312G6();
  const axes = FR312G_RELIABILITY_FAMILIES.flatMap((family) => family.metricAxes);
  const sourceIds = FR312G7_SOURCE_CATALOGUE.map((source) => source.sourceId);
  const refs = FR312G7_AXIS_EVIDENCE_MATRIX.map((axis) => axis.metricRef);
  if (
    FR312G_STUDY_DESIGN.neutralMetricAxisCount !== 8
    || FR312G7_AXIS_EVIDENCE_MATRIX.length !== 8
    || FR312G7_SOURCE_CATALOGUE.length !== 7
    || new Set(sourceIds).size !== sourceIds.length
    || new Set(refs).size !== 8
    || refs.join('|') !== axes.map((axis) => axis.metricRef).join('|')
    || refs.join('|') !== FR312G4_PLANNING_CONTRACT.axisMetricRefs.join('|')
  ) throw new Error('fr312g7_source_or_axis_inventory_drift');
  for (const source of FR312G7_SOURCE_CATALOGUE) {
    if (
      source.imageReuseAuthorized
      || source.numericEvidenceForExactFR312GAxes
      || source.independentParticipantVarianceUsable
      || source.missingnessAndWithdrawalUsable
      || source.suitability === 'eligible_for_numeric_review'
      || !source.officialUrl.startsWith('https://')
    ) throw new Error('fr312g7_source_premature_admission:' + source.sourceId);
  }
  for (const axis of FR312G7_AXIS_EVIDENCE_MATRIX) {
    if (
      !axis.candidateSourceIds.length
      || axis.candidateSourceIds.some((id) => !sourceIds.includes(id))
      || axis.definitionEquivalence === 'exact'
      || axis.captureComparability === 'comparable'
      || axis.repeatabilityData !== 'unavailable'
      || axis.varianceEvidence !== 'unavailable'
      || axis.missingnessEvidence !== 'unavailable'
      || axis.dataUseRights !== 'restricted_or_unverified'
      || axis.admissionSuitability !== 'insufficient_evidence'
    ) throw new Error('fr312g7_axis_premature_admission:' + axis.metricRef);
  }
  if (
    FR312G6_NUMERIC_GOVERNANCE_REVIEW.evidencePacketIssued
    || FR312G6_NUMERIC_GOVERNANCE_REVIEW.evidenceBackedParticipantCountApproved
    || FR312G6_NUMERIC_GOVERNANCE_REVIEW.actualParticipantCollectionAuthorized
    || FR312G7_SUFFICIENCY_VERDICT.conclusion !== 'insufficient_evidence'
    || FR312G7_SUFFICIENCY_VERDICT.eligibleAxisCount !== 0
  ) throw new Error('fr312g7_numeric_or_empirical_authority_widened');
  for (const [key, value] of Object.entries(FR312G7_SUFFICIENCY_VERDICT)) {
    if (key.endsWith('Authorized') || key.endsWith('Approved')) {
      if (value !== false) throw new Error('fr312g7_authority_widening:' + key);
    }
  }
}
