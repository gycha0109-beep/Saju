import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-independent-scholarly-provenance-candidate-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS =
  Object.freeze([
    Object.freeze({
      sourceId: 'KCI-ART002630397',
      title: '명리학 육친론의 이론체계 고찰 - 궁위론과 십성론을 중심으로-',
      author: '이수동',
      journal: '문화와융합',
      publisher: '인문사회예술융합학회',
      publicationYear: 2020,
      volume: '42',
      issue: '9',
      pages: '755-780',
      doi: '10.33645/cnc.2020.09.42.9.755',
      kciArticleId: 'ART002630397',
      sourceClass: 'kci_indexed_scholarly_journal_article',
      accessSurface:
        'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002630397',
      inspectedSurface: 'official_kci_bibliographic_metadata_and_abstract',
      natalMethodologyScopeExplicit: true,
      compatibilityOnly: false,
      spousePalaceExplicitInInspectedAbstract: true,
      gungwiAndSipseongCombinedMethodExplicitInInspectedAbstract: true,
      gyeokgukYongshinDependencyExplicitInInspectedAbstract: true,
      fullTextDirectlyInspected: false,
      exactBodyPassageLocatorEstablished: false,
      explicitModernRoleNeutralSpouseNatalMappingEstablished: false,
      explicitPartnerGenderNeutralRuleEstablished: false,
      explicitSexualOrientationNeutralRuleEstablished: false,
      independentNormativeProvenanceAdequateForCurrentSpouseMethod: false,
      authorityAdmissionAdequate: false,
      exactSupportedClaim:
        'The inspected KCI abstract presents natal family interpretation as a combined Gungwi/Sipseong method and states that spouse-palace family interpretation is directly related to Gyeokguk/Yongshin context.',
      unsupportedExtrapolations: Object.freeze([
        'exact spouse-star subtype mapping for the current governed producer',
        'modern role-neutral spouse-natal mapping',
        'partner gender or sexual-orientation inference',
        'exact current Relationship T6 input contract',
        'production spouse T8 promotion',
      ] as const),
    }),
    Object.freeze({
      sourceId: 'KCI-ART003175186',
      title: '『적천수천미』 「여명장」의 현대적 고찰 ― 부성용신론(夫星用神論)을 중심으로 ―',
      author: '이영은',
      journal: '역사와 융합',
      publisher: '바른역사학술원',
      publicationYear: 2025,
      volume: '9',
      issue: '1',
      pages: '305-338',
      doi: '10.55793/jkhc.2025.24.305',
      kciArticleId: 'ART003175186',
      sourceClass: 'kci_indexed_scholarly_journal_article',
      accessSurface:
        'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003175186',
      inspectedSurface: 'official_kci_bibliographic_metadata_and_abstract',
      natalMethodologyScopeExplicit: true,
      compatibilityOnly: false,
      femaleChartHusbandScopeExplicit: true,
      historicalSocialRoleContingencyExplicitInInspectedAbstract: true,
      modernMarriageContextChangeExplicitInInspectedAbstract: true,
      husbandNotFixedToOfficerStarOnlyExplicitInInspectedAbstract: true,
      alternativeTenGodRepresentationForHusbandProposedInInspectedAbstract: true,
      fullTextDirectlyInspected: false,
      exactBodyPassageLocatorEstablished: false,
      explicitModernRoleNeutralSpouseNatalMappingEstablished: false,
      explicitPartnerGenderNeutralRuleEstablished: false,
      explicitSexualOrientationNeutralRuleEstablished: false,
      independentNormativeProvenanceAdequateForCurrentSpouseMethod: false,
      authorityAdmissionAdequate: false,
      exactSupportedClaim:
        'The inspected KCI abstract treats a historical female-chart husband convention as socially contingent and proposes that, in modern relationship contexts, the husband need not be represented only by Officer but may be sought through other Ten Gods.',
      unsupportedExtrapolations: Object.freeze([
        'a partner-neutral rule applicable regardless of user or partner gender',
        'a sexual-orientation-neutral spouse-star mapping',
        'the exact current governed spouse claim-class composition contract',
        'the exact current Relationship T6 input contract',
        'production spouse T8 promotion',
      ] as const),
    }),
  ] as const);

export const RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_CONTROL_IDS =
  Object.freeze([
    'KCI_INDEXED_SCHOLARLY_ARTICLE_IS_STRONGER_PROVENANCE_THAN_COMMERCIAL_EDITORIAL_GUIDANCE_BUT_IS_NOT_AUTO_ADMITTED',
    'OFFICIAL_KCI_ABSTRACT_TEXT_IS_RECORDED_ONLY_FOR_CLAIMS_EXPLICITLY_VISIBLE_ON_THE_INSPECTED_SURFACE',
    'FULL_TEXT_AND_EXACT_RELEVANT_BODY_PASSAGE_REMAIN_UNINSPECTED_FOR_BOTH_CANDIDATES',
    'LEE_2020_SUPPORTS_A_MULTI_FACTOR_NATAL_FAMILY_METHOD_NOT_CURRENT_BROAD_T5_FAMILY_EQUIVALENCE',
    'LEE_2025_SUPPORTS_HISTORICAL_SOCIAL_ROLE_CONTINGENCY_AND_A_FEMALE_HUSBAND_METHOD_ALTERNATIVE_ONLY',
    'LEE_2025_DOES_NOT_DEFINE_A_PARTNER_NEUTRAL_OR_SEXUAL_ORIENTATION_NEUTRAL_NATAL_MAPPING',
    'NO_COMPATIBILITY_AUTHORITY_IS_REUSED_AS_NATAL_AUTHORITY',
    'NO_CROSS_SOURCE_STITCHING_IS_USED_TO_SYNTHESIZE_MISSING_ROLE_NEUTRAL_AUTHORITY',
    'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_OPEN_PENDING_EXACT_BODY_CONTEXT_AND_METHOD_ADEQUACY_REVIEW',
    'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
    'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
    'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
    'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
    'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
  ] as const);

export interface RelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_EVIDENCE_VERSION;
  status: 'MATERIAL_PARTIAL_SCHOLARLY_PROVENANCE_CANDIDATES_ACQUIRED';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidateRecords: typeof RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS;
  candidateRecordCount: 2;
  kciIndexedScholarlyCandidateCount: 2;
  natalMethodologyCandidateCount: 2;
  fullTextDirectlyInspectedCount: 0;
  exactBodyPassageLocatorEstablishedCount: 0;
  modernHistoricalRoleContingencyCandidateLocated: true;
  explicitRoleNeutralNatalMappingCandidateLocated: false;
  independentNormativeProvenanceEstablished: false;
  explicitRoleNeutralSpouseNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  spouseT8ProducerReady: false;
  spouseRulePackReady: false;
  spouseClaimPackReady: false;
  spouseInterpretationPackReady: false;
  consumerNarrativeReady: false;
  previewDefaultReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_CONTROL_IDS;
  controlCount: 14;
  recommendedNextAction:
    'ACQUIRE_AND_DIRECTLY_INSPECT_EXACT_RELEVANT_FULL_TEXT_PASSAGES_FOR_THE_SCHOLARLY_CANDIDATES_AND_CONTINUE_SEARCH_FOR_AN_EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_WITHOUT_STITCHING';
}

export function buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence(): RelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidenceReport {
  const material = {
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_EVIDENCE_VERSION,
    status: 'MATERIAL_PARTIAL_SCHOLARLY_PROVENANCE_CANDIDATES_ACQUIRED' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidateRecords: RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS,
    candidateRecordCount: 2 as const,
    kciIndexedScholarlyCandidateCount: 2 as const,
    natalMethodologyCandidateCount: 2 as const,
    fullTextDirectlyInspectedCount: 0 as const,
    exactBodyPassageLocatorEstablishedCount: 0 as const,
    modernHistoricalRoleContingencyCandidateLocated: true as const,
    explicitRoleNeutralNatalMappingCandidateLocated: false as const,
    independentNormativeProvenanceEstablished: false as const,
    explicitRoleNeutralSpouseNatalMappingEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    crossTaskStitchingAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    spouseRulePackReady: false as const,
    spouseClaimPackReady: false as const,
    spouseInterpretationPackReady: false as const,
    consumerNarrativeReady: false as const,
    previewDefaultReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_CONTROL_IDS,
    controlCount: 14 as const,
    recommendedNextAction:
      'ACQUIRE_AND_DIRECTLY_INSPECT_EXACT_RELEVANT_FULL_TEXT_PASSAGES_FOR_THE_SCHOLARLY_CANDIDATES_AND_CONTINUE_SEARCH_FOR_AN_EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_WITHOUT_STITCHING' as const,
  };

  return Object.freeze({
    evidenceId: `relationship_spouse_t8_independent_scholarly_provenance_candidate_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
