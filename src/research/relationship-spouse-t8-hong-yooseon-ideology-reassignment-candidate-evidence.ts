import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_DISPOSITION_EVIDENCE_VERSION,
  buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence,
} from './relationship-spouse-t8-post-ha-scholarly-candidate-disposition-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_IDEOLOGY_REASSIGNMENT_CANDIDATE_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-hong-yooseon-ideology-reassignment-candidate-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_SOURCE = Object.freeze({
  sourceId: 'KCI-ART003089059',
  rissId: 'A108419413',
  rissControlNo: 'f254e3e7ba27f8afb7998d826d417196',
  doi: '10.54385/cbt.2022.2.2.75',
  author: '홍유선',
  publicationYear: 2022,
  title: '이데올로기적 접근을 통한 육친 간 상극관계 해석: 부부, 부자, 고부를 중심으로',
  journal: '문화·경영·기술',
  volume: 2,
  issue: 2,
  pages: '75-89',
  publisher: '사단법인 아시아문화콘텐츠연구소',
  sourceClass: 'scholarly_journal_article' as const,
  inspectedSurfaces: Object.freeze([
    'KCI_OFFICIAL_METADATA_AND_ABSTRACT',
    'RISS_METADATA_ABSTRACT_TOC_AND_ACCESS_STATUS',
    'ACCI_INSTITUTIONAL_JOURNAL_REVIEW_RULES',
    'ACCI_INSTITUTIONAL_HISTORY',
    'NATIONAL_ASSEMBLY_LIBRARY_CATALOG_AND_ORIGINAL_VIEW_CONTROL',
  ] as const),
  directFullTextObjectInspected: false,
  pdfScreenshotReviewed: false,
  exactBodyPassageInspected: false,
  articleReviewRecordInspected: false,
  journalReviewPolicyAtPublicationEstablished: true,
  journalReviewPolicyBasis:
    'The institutional publication rules effective from 2021-09-01 require the editor to appoint at least three expert reviewers per manuscript, subject to stated exceptions for non-article or keynote material. The inspected record classifies this item as a scholarly journal article.',
  rissListingAtPublication: 'NOT_KCI_LISTED' as const,
  kciListedAtPublication: false,
  journalLaterKciCandidateYear: 2023,
  journalLaterKciListedYear: 2025,
  currentJournalKciStatusRetroactivelyUpgradesArticle: false,
  publicAccessBoundary:
    'RISS exposes a paid-original control and the National Assembly Library catalog exposes original-view/download controls, but the publicly inspected surfaces did not expose a directly inspectable article object or PDF.',
  targetBodySections: Object.freeze([
    '1. 서론',
    '2. 육친 간 상극관계에 대한 기존 공식의 오류',
    '3. 이데올로기적 접근 해결',
    '4. 결론',
  ] as const),
} as const);

export const RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_PUBLIC_METHOD_EVIDENCE = Object.freeze({
  natalSajuInterpretationContextExplicit: true,
  husbandWifeRelationshipExplicit: true,
  traditionalWifeWealthAssignmentExplicit: true,
  traditionalWifeWealthAssignmentTreatedAsIdeologicalRatherThanTimelessNaturalRule: true,
  modernKinshipTenStarResetPurposeExplicit: true,
  resetCriterion: 'SOCIAL_IDEOLOGY_DUTY_AND_ROLE' as const,
  patriarchalWifeWealthRationaleExplicit: true,
  patriarchalHusbandOfficerInterpretationExplicit: true,
  fixedRoleNeutralSpouseStarEstablished: false,
  spousePalaceSelectorEstablished: false,
  natalChartOnlySpouseSelectorEstablished: false,
  externalSocioRelationalContextRequiredByPubliclyDescribedCriterion: true,
  completeExecutableInputContractEstablished: false,
  publiclyDescribedMethodCanonicalSajuSnapshotAloneSufficient: false,
  exactSupportedClaim:
    'The official abstract explicitly treats the traditional wife-as-Wealth assignment as arising from duties imposed under patriarchal ideology and presents social-ideological duty and role as a criterion for reinterpreting or resetting kinship Ten-Star relations in changing modern society.',
  exactUnresolvedQuestion:
    'The public abstract does not establish whether the article body derives a fixed role-neutral natal spouse Star or a chart-only operational selector; the described reset criterion instead depends on external social duty/role context.',
} as const);

export const RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_IDEOLOGY_REASSIGNMENT_CONTROL_IDS =
  Object.freeze([
    'HONG_2022_TRADITIONAL_WIFE_WEALTH_ASSIGNMENT_IS_RECORDED_AS_IDEOLOGICALLY_CONTEXTUALIZED',
    'HONG_2022_MODERN_KINSHIP_TEN_STAR_RESET_PURPOSE_IS_RECORDED',
    'HONG_2022_DUTY_AND_ROLE_CRITERION_IS_EXTERNAL_SOCIO_RELATIONAL_CONTEXT',
    'HONG_2022_PUBLIC_ABSTRACT_IS_NOT_RELABELED_AS_DIRECT_BODY_INSPECTION',
    'HONG_2022_ORIGINAL_VIEW_OR_DOWNLOAD_CONTROL_IS_NOT_DIRECT_PDF_INSPECTION',
    'HONG_2022_JOURNAL_REVIEW_POLICY_IS_NOT_RELABELED_AS_AN_INSPECTED_ARTICLE_REVIEW_RECORD',
    'HONG_2022_LATER_JOURNAL_KCI_STATUS_DOES_NOT_RETROACTIVELY_UPGRADE_2022_LISTING',
    'HONG_2022_NO_FIXED_ROLE_NEUTRAL_SPOUSE_STAR_IS_INFERRED',
    'HONG_2022_NO_CHART_ONLY_NATAL_SPOUSE_SELECTOR_IS_INFERRED',
    'HONG_2022_EXTERNAL_DUTY_ROLE_CONTEXT_IS_NOT_INVENTED_AS_CANONICAL_SAJU_FACT',
    'NO_HONG_KIM_OR_OTHER_SOURCE_CROSS_STITCHING',
    'NO_USER_OR_PARTNER_GENDER_OR_SEXUAL_ORIENTATION_INFERENCE',
    'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_SPOUSE_METHOD_REMAINS_OPEN',
    'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
    'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
    'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
    'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
    'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
  ] as const);

export interface RelationshipSpouseT8HongYooseonIdeologyReassignmentCandidateEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_IDEOLOGY_REASSIGNMENT_CANDIDATE_EVIDENCE_VERSION;
  upstreamEvidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_DISPOSITION_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'MATERIAL_SCHOLARLY_TRADITIONAL_SPOUSE_MAPPING_CRITIQUE_AND_MODERN_REASSIGNMENT_CANDIDATE_ACQUIRED_NO_AUTHORITY_CLOSURE';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  source: typeof RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_SOURCE;
  publicMethodEvidence: typeof RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_PUBLIC_METHOD_EVIDENCE;
  traditionalGenderedSpouseMappingDeNaturalizedByIndependentScholarlyCandidate: true;
  roleNeutralNatalSpouseMappingEstablished: false;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  externalDutyRoleContextPromotedToCanonicalSajuFact: false;
  sexualOrientationInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_IDEOLOGY_REASSIGNMENT_CONTROL_IDS;
  controlCount: 18;
  recommendedNextAction:
    'ACQUIRE_HONG_2022_ACTUAL_BODY_TO_TEST_WHOLE_REASSIGNMENT_METHOD_WHILE_KEEPING_KIM_YOUNGJIN_2020_PRIORITY_BODY_ACQUISITION_AND_ALL_AUTHORITY_GATES_FAIL_CLOSED';
}

export function buildRelationshipSpouseT8HongYooseonIdeologyReassignmentCandidateEvidence(): RelationshipSpouseT8HongYooseonIdeologyReassignmentCandidateEvidenceReport {
  const upstream = buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence();
  const material = {
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_IDEOLOGY_REASSIGNMENT_CANDIDATE_EVIDENCE_VERSION,
    upstreamEvidenceVersion:
      RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_DISPOSITION_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'MATERIAL_SCHOLARLY_TRADITIONAL_SPOUSE_MAPPING_CRITIQUE_AND_MODERN_REASSIGNMENT_CANDIDATE_ACQUIRED_NO_AUTHORITY_CLOSURE' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    source: RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_SOURCE,
    publicMethodEvidence: RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_PUBLIC_METHOD_EVIDENCE,
    traditionalGenderedSpouseMappingDeNaturalizedByIndependentScholarlyCandidate: true as const,
    roleNeutralNatalSpouseMappingEstablished: false as const,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    externalDutyRoleContextPromotedToCanonicalSajuFact: false as const,
    sexualOrientationInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_IDEOLOGY_REASSIGNMENT_CONTROL_IDS,
    controlCount: 18 as const,
    recommendedNextAction:
      'ACQUIRE_HONG_2022_ACTUAL_BODY_TO_TEST_WHOLE_REASSIGNMENT_METHOD_WHILE_KEEPING_KIM_YOUNGJIN_2020_PRIORITY_BODY_ACQUISITION_AND_ALL_AUTHORITY_GATES_FAIL_CLOSED' as const,
  };

  return Object.freeze({
    evidenceId: `relationship_spouse_t8_hong_yooseon_ideology_reassignment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
