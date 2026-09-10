import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8EumJonghee2019DirectBodyBoundaryEvidence } from './relationship-spouse-t8-eum-jonghee-2019-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-song-sangseop-2022-functional-husband-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'SONG_SANGSEOP_2022_RISS_WONKWANG_DCOLLECTION_DIRECT_FULLTEXT_PDF',
  author: '송상섭',
  publicationYear: 2022,
  title: '命理學의 六親論 硏究 : -滴天隨闡微를 中心으로-',
  institution: '원광대학교 일반대학원',
  degree: '박사',
  rissId: 'T16377357',
  rissControl: '6188af0cf49b0838ffe0bdc3ef48d419',
  uci: 'I804:45008-200000631721',
  priorAccessBoundaryPr: 374,
  directBodyAcquisitionPr: 401,
  dcollectionItemId: '200000631721',
  exactRissIdentityDirectlyObserved: true as const,
  rissDetailAuthoredSearchCommonScript: true as const,
  globalFulltextDownloadImplementationDirectlyObserved: true as const,
  dispatcherLoginFlagOneDirectlyObserved: true as const,
  rissAuthoredDcollectionRouteFollowed: true as const,
  dcollectionActiveNonDrmPublicPdfRedirectDirectlyObserved: true as const,
  dcollectionDrm: 'N' as const,
  dcollectionMessageGate: '' as const,
  dcollectionAgreeVariablePresent: false as const,
  directPublicPdfObjectInspected: true as const,
  completePdfTextIndexedForLocators: true as const,
  materialPagesVisuallyReviewed: true as const,
  dispatcherScriptSha256: 'd00f2205c1e40ef8ff0d499b938f2c9f782f5d0a52a082e459127b77bf40f9b8',
  pdfSha256: '9df71be1ff471d329a58af2ccb88d01aa71fa6a4f0aaed81762f28c2761e5988',
  pdfBytes: 1_895_533,
  pdfPageCount: 208,
  pdfEncrypted: false as const,
  pdfVersion: '1.4' as const,
  printedBodyPageOffset: 19,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({
      printedPage: 84,
      physicalPdfPage: 103,
      topic:
        'male-chart discussion accepts Wealth as wife while rejecting the unrelated father-equals-Wealth extension',
    }),
    Object.freeze({
      printedPage: 89,
      physicalPdfPage: 108,
      topic:
        'female-chart chapter states that overly strong or weak Officer can shift the husband indicator to Injury Officer, Wealth, Resource, or other balancing kinship stars',
    }),
    Object.freeze({
      printedPage: 91,
      physicalPdfPage: 110,
      topic:
        'source explicitly says one must not insist on Officer alone when discussing the husband in a female chart',
    }),
    Object.freeze({
      printedPage: 93,
      physicalPdfPage: 112,
      topic:
        'Ren Tieqiao passage gives multiple female-chart husband substitutions according to strength and available balancing relations',
    }),
    Object.freeze({
      printedPage: 97,
      physicalPdfPage: 116,
      topic:
        'source explicitly states that the husband star in a female chart is the Yongsin and again rejects Officer-only husband analysis',
    }),
    Object.freeze({
      printedPage: 125,
      physicalPdfPage: 144,
      topic:
        'comparative spouse table keeps husband and wife-concubine columns separate and maps husband to Officer or source-specific Heesin/Yongsin while wife remains Wealth',
    }),
    Object.freeze({
      printedPage: 140,
      physicalPdfPage: 159,
      topic:
        'female-chart application states that what controls the native is husband and treats Officer or Seven-Killings as husband within that female branch',
    }),
    Object.freeze({
      printedPage: 180,
      physicalPdfPage: 199,
      topic:
        'conclusion retains sex-differentiated family assignments while describing Ren Tieqiao revisions to inherited kinship theory',
    }),
    Object.freeze({
      printedPage: 181,
      physicalPdfPage: 200,
      topic:
        'conclusion endorses Yongsin-based husband judgment for female charts and says social values influence theory change without publishing a partner-neutral selector',
    }),
  ] as const),
  socialValueConditionedTheoryEvolutionExplicit: true as const,
  maleWealthAsWifeFrameworkExplicit: true as const,
  femaleOfficerAsHusbandBaselineExplicit: true as const,
  femaleOfficerOnlyHusbandRuleExplicitlyRejected: true as const,
  femaleFunctionalHusbandRemappingExplicit: true as const,
  femaleHusbandYongshinRuleExplicit: true as const,
  femaleHusbandCanShiftToBalancingKinshipStarExplicit: true as const,
  sexCommonSpousePositionLayerExplicit: true as const,
  husbandAndWifeFrameworkRemainsSexSeparated: true as const,
  childMappingModernizationDoesNotGeneralizeToSpouseNeutrality: true as const,
  functionalHusbandRemappingIsNativeSexIndependent: false as const,
  functionalHusbandRemappingIsPartnerSexIndependent: false as const,
  spouseSpecificOperationalRoleNeutralSelectorPublished: false as const,
  nativeSexIndependentOperationalSelectorFound: false as const,
  partnerSexIndependentOperationalSelectorFound: false as const,
  pureNatalRoleNeutralSpouseSelectorFound: false as const,
  completeRoleNeutralNatalInputContractFound: false as const,
  sourceRequiresUngovernedYongshinHeesinGyeokgukSemantics: true as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactPositiveBoundary:
    'The directly inspected thesis materially exceeds a fixed Officer-only husband rule. Within its explicitly female-chart husband branch, it accepts context-sensitive substitution through the chart balancing need and ultimately states that the female-chart husband star is the Yongsin. It also recognizes that Yukchin theory changes with social convention and value systems.',
  exactNegativeBoundary:
    'The functional remapping never becomes one spouse selector independent of native sex and partner sex. The source keeps male wife analysis and female husband analysis as separate branches, preserves Wealth-centered wife semantics for male charts, and states its Yongsin husband rule specifically for female charts. The replacement logic also depends on source-specific Yongsin, Heesin, Gyeokguk, strength, and balancing semantics that are not currently governed Relationship T6 canonical inputs.',
  noStitchingBoundary:
    'Song Sangseop 2022 female-chart Yongsin husband remapping is not combined with sex-common spouse-palace evidence, actual-role language, social-role critique, same-sex-family discussion, product partner terminology, or another source spouse rule to manufacture the native-sex-independent and partner-sex-independent selector that this thesis does not publish.',
});

export const RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CONTROL_IDS = Object.freeze([
  'SONG_SANGSEOP_2022_EXACT_RISS_TITLE_AUTHOR_YEAR_INSTITUTION_IDENTITY_IS_PINNED',
  'RISS_ID_CONTROL_UCI_AND_PRIOR_ACCESS_BOUNDARY_PR_ARE_PINNED',
  'RISS_DETAIL_AUTHORED_SEARCHCOMMON_SCRIPT_IS_DIRECTLY_OBSERVED',
  'GLOBAL_FULLTEXTDOWNLOAD_IMPLEMENTATION_LOGINFLAG_AND_DISPATCHER_ARE_DIRECTLY_OBSERVED',
  'RISS_SITE_AUTHORED_DISPATCHER_CHAIN_IS_FOLLOWED_WITHOUT_OPAQUE_ID_GUESSING',
  'WONKWANG_DCOLLECTION_ITEM_200000631721_IS_RISS_AUTHORED',
  'DCOLLECTION_ACTIVE_NON_DRM_PUBLIC_PDF_REDIRECT_IS_DIRECTLY_OBSERVED',
  'DCOLLECTION_DRM_N_EMPTY_MESSAGE_GATE_AND_EXACT_FILE_SIZE_ARE_PINNED',
  'ABSENT_AGREE_VARIABLE_IS_NOT_RELABELED_AS_AN_AGREEMENT_BYPASS',
  'FULL_PDF_SHA256_BYTES_PAGE_COUNT_VERSION_AND_ENCRYPTION_STATE_ARE_CONTENT_ADDRESSED',
  'PRINTED_84_PHYSICAL_103_MALE_WEALTH_WIFE_FRAMEWORK_IS_DIRECTLY_REVIEWED',
  'PRINTED_89_PHYSICAL_108_FEMALE_FUNCTIONAL_HUSBAND_SUBSTITUTION_IS_DIRECTLY_REVIEWED',
  'PRINTED_91_PHYSICAL_110_OFFICER_ONLY_HUSBAND_RULE_REJECTION_IS_DIRECTLY_REVIEWED',
  'PRINTED_93_PHYSICAL_112_MULTIPLE_FEMALE_HUSBAND_SUBSTITUTIONS_ARE_DIRECTLY_REVIEWED',
  'PRINTED_97_PHYSICAL_116_FEMALE_HUSBAND_YONGSHIN_RULE_IS_DIRECTLY_REVIEWED',
  'PRINTED_125_PHYSICAL_144_SEX_SEPARATED_HUSBAND_WIFE_COMPARATIVE_TABLE_IS_DIRECTLY_REVIEWED',
  'PRINTED_140_PHYSICAL_159_FEMALE_HUSBAND_CONTROL_RELATION_IS_DIRECTLY_REVIEWED',
  'PRINTED_180_TO_181_PHYSICAL_199_TO_200_CONCLUSION_IS_DIRECTLY_REVIEWED',
  'SOCIAL_VALUE_CONDITIONED_THEORY_CHANGE_IS_ACKNOWLEDGED',
  'FEMALE_FIXED_OFFICER_ONLY_RULE_REJECTION_IS_NOT_CONVERTED_TO_ROLE_NEUTRAL_SPOUSE_SELECTION',
  'FEMALE_YONGSHIN_HUSBAND_RULE_REMAINS_NATIVE_SEX_CONDITIONED',
  'MALE_WIFE_AND_FEMALE_HUSBAND_BRANCHES_REMAIN_SEPARATE',
  'SEX_COMMON_SPOUSE_POSITION_IS_NOT_CONVERTED_TO_SPOUSE_STAR_NEUTRALITY',
  'UNGOVERNED_YONGSHIN_HEESIN_GYEOKGUK_SEMANTICS_ARE_NOT_INVENTED_FROM_RAW_CANONICAL_FACTS',
  'NO_NATIVE_SEX_INDEPENDENT_SPOUSE_SELECTOR_IS_INVENTED',
  'NO_PARTNER_SEX_INDEPENDENT_SPOUSE_SELECTOR_IS_INVENTED',
  'NO_PURE_NATAL_COMPLETE_ROLE_NEUTRAL_INPUT_CONTRACT_IS_INVENTED',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8SongSangseop2022FunctionalHusbandBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'DIRECT_FULLTEXT_CONFIRMS_FEMALE_FUNCTIONAL_HUSBAND_REMAPPING_WITHOUT_ROLE_NEUTRAL_SPOUSE_SELECTOR'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  directFulltextPdfInspected: true;
  femaleFunctionalHusbandRemappingConfirmed: true;
  femaleHusbandYongshinRuleConfirmed: true;
  sexSeparatedSpouseFrameworkConfirmed: true;
  explicitRoleNeutralNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessRemainsClosed: boolean;
  independentNormativeProvenanceRemainsClosed: boolean;
  authorityGapsClosedCount: 2 | 0;
  authorityGapsOpenCount: 3 | 5;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

function upstreamTwoOfFiveStateAccepted(): boolean {
  const upstream = buildRelationshipSpouseT8EumJonghee2019DirectBodyBoundaryEvidence();
  return (
    upstream.status ===
      'DIRECT_FULLTEXT_CONFIRMS_PRACTICAL_ROLE_AND_PALACE_REINTERPRETATION_WITH_EXPLICIT_SEX_CONDITIONED_SPOUSE_SEMANTICS' &&
    upstream.exactUpstreamTwoOfFiveStateAccepted === true &&
    upstream.explicitRoleNeutralNatalMappingEstablished === false &&
    upstream.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    upstream.currentRelationshipT6InputPathEstablished === false &&
    upstream.qualifyingPrimaryWitnessRemainsClosed === true &&
    upstream.independentNormativeProvenanceRemainsClosed === true &&
    upstream.authorityGapsClosedCount === 2 &&
    upstream.authorityGapsOpenCount === 3 &&
    upstream.authorityAdmissionReady === false &&
    upstream.productionPromotionReady === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8SongSangseop2022FunctionalHusbandBoundaryEvidence(): RelationshipSpouseT8SongSangseop2022FunctionalHusbandBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8EumJonghee2019DirectBodyBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('DIRECT_FULLTEXT_CONFIRMS_FEMALE_FUNCTIONAL_HUSBAND_REMAPPING_WITHOUT_ROLE_NEUTRAL_SPOUSE_SELECTOR' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    directFulltextPdfInspected: true as const,
    femaleFunctionalHusbandRemappingConfirmed: true as const,
    femaleHusbandYongshinRuleConfirmed: true as const,
    sexSeparatedSpouseFrameworkConfirmed: true as const,
    explicitRoleNeutralNatalMappingEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessRemainsClosed: accepted,
    independentNormativeProvenanceRemainsClosed: accepted,
    authorityGapsClosedCount: accepted ? (2 as const) : (0 as const),
    authorityGapsOpenCount: accepted ? (3 as const) : (5 as const),
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    productionState: 'HOLD' as const,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_SONG_SANGSEOP_2022_FUNCTIONAL_HUSBAND_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_song_sangseop_2022_functional_husband_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
