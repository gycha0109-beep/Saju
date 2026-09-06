import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence } from './relationship-spouse-t8-fulltext-access-role-neutral-mapping-candidate-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SCHOLARLY_BODY_METHOD_INPUT_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-kim-mantae-scholarly-body-method-input-evidence-v1' as const;

export type KimMantaeCanonicalCapabilityState =
  | 'AVAILABLE_CANONICAL_FACT'
  | 'PARTIAL_UNDERLYING_DATA_ONLY'
  | 'MISSING_GOVERNED_FACT_OR_SEMANTICS'
  | 'BLOCKED_BY_UNAUTHORIZED_GENDERED_APPLICABILITY';

export interface KimMantaeRequiredInputCapabilityRecord {
  sourceInputId: string;
  sourceInput: string;
  exactSourceContext: string;
  currentCanonicalPaths: readonly string[];
  capabilityState: KimMantaeCanonicalCapabilityState;
  exactCurrentBoundary: string;
  sufficientForCurrentSpouseT6: false;
}

export const RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SOURCE_RECORD = Object.freeze({
  sourceId: 'KCI-ART003250308',
  title: '배우자 인연의 중시로서 궁합(宮合)에 관한 고찰',
  englishTitle: 'A Consideration on Partner Compatibility with Emphasis on Spousal Relationships',
  author: '김만태',
  publicationYear: 2025,
  publicationMonth: 9,
  kciArticleId: 'ART003250308',
  doi: '10.58936/gcr.2025.9.5.3.143',
  issn: '3092-4200',
  volume: '5',
  issue: '3',
  serialIssue: '13',
  kciPages: '143-168',
  nationalAssemblyPages: '147-172',
  sourceClass: 'peer_reviewed_kci_indexed_scholarly_journal_article',
  historicalPublicationTitle: '교방문화연구',
  historicalPublisher: '한국교방문화학회',
  currentNormalizedPublicationTitle: '한류문화연구',
  currentNormalizedPublisher: '한국한류문화학회',
  serialRenameContinuityVerified: true,
  serialRenameConflict: false,
  paginationMetadataConflictObserved: true,
  paginationConflictResolution:
    'KCI/Kyobo and the National Assembly catalog expose different printed page spans; this evidence therefore uses section and text anchors rather than converting either pagination into an asserted exact PDF page.',
  kciMetadataSurface:
    'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003250308',
  authorPublicBodySurface:
    'https://www.namestory.kr/bbs/board.php?bo_table=sub3_1&wr_id=418',
  authorEarlierPublicBodySurface:
    'https://www.namestory.kr/bbs/board.php?bo_table=sub3_1&page=7&wr_id=333',
  directlyInspectedBodySurface: 'author_public_research_repository_indexed_article_body',
  directPdfAttachmentAdvertisedOnAuthorSurface: true,
  directPdfObjectInspected: false,
  pdfScreenshotReviewed: false,
  fullArticleBodyMateriallySurfacedOnInspectedAuthorPage: true,
  exactRelevantBodySectionEstablished: true,
  exactRelevantBodySection: '3.4 사주(四柱) 궁합법',
  exactRelevantBodyAnchor:
    '지금까지 살펴본 사주 궁합법의 내용을 총정리하면 대략 다음과 같다 ... 배우자 인연이 나쁜 사주들은 다음과 같은 특징을 갖고 있다.',
  peerReviewed: true,
  peerReviewModel:
    'formal journal review with field reviewers, anonymized review, revision/re-review states, and editorial-board publication decision',
  natalSingleChartSpouseIndicatorsExplicit: true,
  compatibilityContextAlsoPresent: true,
  roleNeutralNatalMappingExplicit: false,
  genderedSpouseRoleLanguageExplicit: true,
  sexualOrientationInferenceRulePresent: false,
  currentMethodInputCompatibilityEstablished: false,
  independentNormativeProvenanceAdequateForCurrentSpouseMethod: false,
  authorityAdmissionAdequate: false,
  sameWorkCrossSurfaceIdentityVerificationUsed: true,
  crossSourceSemanticCompositionUsed: false,
  exactSupportedClaim:
    'The directly inspected author-published body of the KCI-indexed article contains a concrete natal spouse-method section that prioritizes the Day Branch spouse palace, enumerates nine single-chart spouse-relationship indicators, and then separately discusses two-chart compatibility and balance-oriented methods.',
  exactApplicabilityBoundary:
    'The spouse-specific rules are written in explicitly male/female husband-wife terms and do not publish a role-neutral spouse-star mapping. Broader modern relationship expansion in the article does not replace the gendered spouse-specific mapping.',
  exactConflictReview: Object.freeze({
    genderedSpouseStarParentheticalObserved:
      'The indexed body visibly contains the parenthetical “남편의 경우는 재성, 부인의 경우는 관성”.',
    sourceWordingNormalizedOrCorrectedByRepository: false,
    reason:
      'The repository must not silently repair, reinterpret, or universalize source wording. The visible wording is preserved as an unresolved source-level applicability/interpretation issue rather than converted into a governed mapping.',
  }),
} as const);

export const RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_NATAL_INDICATOR_SUMMARY = Object.freeze([
  Object.freeze({
    indicator: 1,
    summary: 'Day Branch spouse palace and Day Stem share the same Five-Element category (간여지동).',
  }),
  Object.freeze({
    indicator: 2,
    summary: 'Day Branch participates in clash, harm, break, wonjin, punishment, or guimun relations with another branch.',
  }),
  Object.freeze({
    indicator: 3,
    summary: 'Day Branch is at the spouse-star 절 or 묘 state.',
  }),
  Object.freeze({
    indicator: 4,
    summary: 'Spouse star is weak.',
  }),
  Object.freeze({
    indicator: 5,
    summary: 'Spouse star is associated with void, concentration/imbalance, mixture, wonjin, or baekho.',
  }),
  Object.freeze({
    indicator: 6,
    summary: 'Spouse star is at 절/묘 or is weakened through lack of root, strong leakage, or destructive control.',
  }),
  Object.freeze({
    indicator: 7,
    summary: 'Many chart elements share the Day Master element, with an explicitly gendered stronger statement for male charts.',
  }),
  Object.freeze({
    indicator: 8,
    summary: 'For women, many output stars or an output star in the Day Branch are treated as adverse spouse indicators.',
  }),
  Object.freeze({
    indicator: 9,
    summary: 'The spouse-palace element is repeated across other stems/branches.',
  }),
] as const);

export const RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_REQUIRED_INPUT_CAPABILITY = Object.freeze([
  Object.freeze({
    sourceInputId: 'DAY_PALACE_DAY_MASTER_ELEMENT_EQUALITY',
    sourceInput: 'Day Branch and Day Stem Five-Element equality',
    exactSourceContext: 'Indicator 1 / 간여지동',
    currentCanonicalPaths: Object.freeze(['pillars.day.stem.element', 'pillars.day.branch.element'] as const),
    capabilityState: 'AVAILABLE_CANONICAL_FACT',
    exactCurrentBoundary:
      'The canonical day pillar preserves stem and branch Five-Element values. This only supplies the neutral fact comparison; it does not authorize the spouse interpretation.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'DAY_BRANCH_RELATION_SET',
    sourceInput: '충·해·파·원진·형살·귀문관살 involving the Day Branch',
    exactSourceContext: 'Indicator 2',
    currentCanonicalPaths: Object.freeze(['derivedFacts.structuralRelations'] as const),
    capabilityState: 'PARTIAL_UNDERLYING_DATA_ONLY',
    exactCurrentBoundary:
      'Canonical structural relations currently include branch clash, branch six-combination, branch three-combination, and stem five-combination only. Harm, break, punishment, wonjin, and guimun are not governed structural facts.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'SPOUSE_STAR_TWELVE_STAGE',
    sourceInput: 'Spouse star at 절 or 묘 / 묘절지',
    exactSourceContext: 'Indicators 3 and 6',
    currentCanonicalPaths: Object.freeze([] as const),
    capabilityState: 'MISSING_GOVERNED_FACT_OR_SEMANTICS',
    exactCurrentBoundary:
      'CanonicalSajuSnapshot does not materialize Twelve-Growth-Stage or spouse-star 墓/絶 state as a governed fact.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'SPOUSE_STAR_STRENGTH',
    sourceInput: 'Spouse-star weakness / 미약',
    exactSourceContext: 'Indicators 4 and 6',
    currentCanonicalPaths: Object.freeze([] as const),
    capabilityState: 'MISSING_GOVERNED_FACT_OR_SEMANTICS',
    exactCurrentBoundary:
      'No governed spouse-star strength, 旺衰, strong/weak, or numeric dominance fact exists in the canonical snapshot.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'SPOUSE_STAR_VOID_AND_CONFIGURATION',
    sourceInput: '공망·편중·혼잡·원진·백호살 on the spouse star',
    exactSourceContext: 'Indicator 5',
    currentCanonicalPaths: Object.freeze(['derivedFacts.voidBranches', 'derivedFacts.tenGods'] as const),
    capabilityState: 'PARTIAL_UNDERLYING_DATA_ONLY',
    exactCurrentBoundary:
      'Void branches and exact Ten-God observations exist, but no authorized spouse-star selector, concentration/mixing semantic, wonjin, or baekho fact is materialized for this methodology.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'SPOUSE_STAR_ROOT_LEAKAGE_DESTRUCTIVE_CONTROL',
    sourceInput: 'Root status, 泄氣, and 破剋 affecting the spouse star',
    exactSourceContext: 'Indicator 6',
    currentCanonicalPaths: Object.freeze(['derivedFacts.hiddenStems'] as const),
    capabilityState: 'MISSING_GOVERNED_FACT_OR_SEMANTICS',
    exactCurrentBoundary:
      'Hidden-stem membership exists, but canonical hidden-stem order is not strength authority and does not establish root, leakage, destructive-control, or hidden-stem weighting semantics.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'DAY_MASTER_SAME_ELEMENT_PLURALITY',
    sourceInput: 'Many chart elements share the Day Master element',
    exactSourceContext: 'Indicator 7',
    currentCanonicalPaths: Object.freeze(['derivedFacts.dayMaster', 'derivedFacts.fiveElementCounts'] as const),
    capabilityState: 'BLOCKED_BY_UNAUTHORIZED_GENDERED_APPLICABILITY',
    exactCurrentBoundary:
      'Underlying Day-Master element and optional Five-Element counts can exist, but the source explicitly intensifies the rule for male charts and no role-neutral spouse applicability rule authorizes that semantic use.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'GENDERED_OUTPUT_STAR_RULE',
    sourceInput: 'Women: many 식상 or 식상 in the Day Branch',
    exactSourceContext: 'Indicator 8',
    currentCanonicalPaths: Object.freeze(['derivedFacts.tenGods.day.branch', 'derivedFacts.tenGods'] as const),
    capabilityState: 'BLOCKED_BY_UNAUTHORIZED_GENDERED_APPLICABILITY',
    exactCurrentBoundary:
      'Exact Ten-God values are canonical, but the source rule is explicitly female-specific and “many” has no governed threshold. It cannot be converted into a role-neutral spouse rule.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'SPOUSE_PALACE_ELEMENT_REPETITION',
    sourceInput: 'Spouse-palace element repeated across other stems/branches',
    exactSourceContext: 'Indicator 9',
    currentCanonicalPaths: Object.freeze(['pillars', 'pillars.day.branch.element'] as const),
    capabilityState: 'PARTIAL_UNDERLYING_DATA_ONLY',
    exactCurrentBoundary:
      'Pillar elements are available and repetition can be observed, but no admitted spouse methodology authorizes the source outcome semantics or an exact plurality threshold.',
    sufficientForCurrentSpouseT6: false,
  }),
] as const satisfies readonly KimMantaeRequiredInputCapabilityRecord[]);

export const RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SCHOLARLY_BODY_CONTROL_IDS = Object.freeze([
  'KIM_MANTAE_KCI_SOURCE_IDENTITY_AND_AUTHOR_PUBLIC_BODY_REFER_TO_THE_SAME_ARTICLE',
  'AUTHOR_PUBLIC_BODY_INSPECTION_IS_RECORDED_SEPARATELY_FROM_UNINSPECTED_PDF_ATTACHMENT',
  'KCI_AND_NATIONAL_ASSEMBLY_PAGINATION_VARIANCE_IS_NOT_SILENTLY_NORMALIZED',
  'SECTION_3_4_EXPLICITLY_CONTAINS_NATAL_SINGLE_CHART_SPOUSE_INDICATORS',
  'COMPATIBILITY_CONTEXT_DOES_NOT_ERASE_THE_NATAL_SINGLE_CHART_SUBSECTION',
  'PEER_REVIEWED_STATUS_DOES_NOT_BY_ITSELF_CLOSE_NORMATIVE_PROVENANCE',
  'SOURCE_GENDERED_SPOUSE_LANGUAGE_IS_NOT_UNIVERSALIZED_OR_SILENTLY_CORRECTED',
  'SOURCE_WORDING_DOES_NOT_AUTHORIZE_USER_PARTNER_GENDER_OR_ORIENTATION_INFERENCE',
  'CURRENT_CANONICAL_FACT_AVAILABILITY_DOES_NOT_AUTHORIZE_SOURCE_SEMANTICS',
  'MISSING_HARM_BREAK_PUNISHMENT_WONJIN_GUIMUN_FACTS_REMAIN_MISSING',
  'MISSING_TWELVE_STAGE_ROOT_STRENGTH_LEAKAGE_AND_DESTRUCTIVE_CONTROL_AUTHORITY_REMAINS_MISSING',
  'HIDDEN_STEM_MEMBERSHIP_IS_NOT_RELABELED_AS_ROOT_OR_STRENGTH',
  'GENDERED_INDICATORS_CANNOT_BE_CONVERTED_INTO_ROLE_NEUTRAL_NATAL_MAPPING',
  'NO_KIM_MANTAE_MINGMAP_OR_OTHER_CROSS_SOURCE_STITCHING',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SCHOLARLY_BODY_METHOD_INPUT_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'MATERIAL_PEER_REVIEWED_SPOUSE_BODY_AND_INPUT_SET_ACQUIRED_BUT_CURRENT_METHOD_ADEQUACY_FAILS_CLOSED';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  sourceRecord: typeof RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SOURCE_RECORD;
  natalIndicatorSummary: typeof RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_NATAL_INDICATOR_SUMMARY;
  requiredInputCapability: typeof RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_REQUIRED_INPUT_CAPABILITY;
  peerReviewedScholarlyBodyAcquired: true;
  exactRelevantBodySectionEstablished: true;
  directPdfObjectInspected: false;
  pdfScreenshotReviewed: false;
  sourceRequiredInputSetExtracted: true;
  allSourceRequiredInputsAvailableAndGoverned: false;
  roleNeutralNatalMappingEstablished: false;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  sexualOrientationInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SCHOLARLY_BODY_CONTROL_IDS;
  controlCount: 20;
  recommendedNextAction:
    'ACQUIRE_AN_EXPLICIT_ROLE_NEUTRAL_SCHOLARLY_NATAL_SPOUSE_MAPPING_OR_A_CURRENT_METHOD_COMPATIBLE_NORMATIVE_SPOUSE_SOURCE_BEFORE_ANY_T6_OR_PRODUCER_GATE';
}

export function buildRelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidence(): RelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidenceReport {
  const upstream = buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence();
  const material = {
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SCHOLARLY_BODY_METHOD_INPUT_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'MATERIAL_PEER_REVIEWED_SPOUSE_BODY_AND_INPUT_SET_ACQUIRED_BUT_CURRENT_METHOD_ADEQUACY_FAILS_CLOSED' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    sourceRecord: RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SOURCE_RECORD,
    natalIndicatorSummary: RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_NATAL_INDICATOR_SUMMARY,
    requiredInputCapability: RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_REQUIRED_INPUT_CAPABILITY,
    peerReviewedScholarlyBodyAcquired: true as const,
    exactRelevantBodySectionEstablished: true as const,
    directPdfObjectInspected: false as const,
    pdfScreenshotReviewed: false as const,
    sourceRequiredInputSetExtracted: true as const,
    allSourceRequiredInputsAvailableAndGoverned: false as const,
    roleNeutralNatalMappingEstablished: false as const,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    sexualOrientationInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_SCHOLARLY_BODY_CONTROL_IDS,
    controlCount: 20 as const,
    recommendedNextAction:
      'ACQUIRE_AN_EXPLICIT_ROLE_NEUTRAL_SCHOLARLY_NATAL_SPOUSE_MAPPING_OR_A_CURRENT_METHOD_COMPATIBLE_NORMATIVE_SPOUSE_SOURCE_BEFORE_ANY_T6_OR_PRODUCER_GATE' as const,
  };

  return Object.freeze({
    evidenceId: `relationship_spouse_t8_kim_mantae_scholarly_body_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
