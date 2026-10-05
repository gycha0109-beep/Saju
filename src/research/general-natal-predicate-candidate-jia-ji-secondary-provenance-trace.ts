import {
  R184_AUTHORITY,
  R184_PROVENANCE_BOUNDARY,
  R184_SECONDARY_CANDIDATES,
} from './general-natal-predicate-candidate-jia-ji-secondary-direct-match-acquisition.js';

export const R185_JIA_JI_SECONDARY_PROVENANCE_TRACE_VERSION =
  '0.1.0-research' as const;

const r184DirectRule = R184_SECONDARY_CANDIDATES.find(
  (item) => item.candidateId === 'R184-C01-HANXIANGTANG-JIA-JI-HE-ER-BU-HUA',
);

if (r184DirectRule === undefined) {
  throw new Error('R185 missing R184 direct-rule candidate');
}

export const R185_EARLIEST_ATTRIBUTABLE_PUBLIC_SURFACE = Object.freeze({
  candidateId: 'R185-P01-SONG-KUN-2011-10-06',
  title: '天干地支的刑冲合害等作用关系的整理与复习' as const,
  attributedName: '宋坤' as const,
  displayedTimestamp: '2011-10-06 11:35' as const,
  sourceSurfaceLabel: 'Scribd OCR/indexed PDF surface' as const,
  sourceUrl:
    'https://www.scribd.com/document/607133572/%E5%A4%A9%E5%B9%B2%E5%9C%B0%E6%94%AF%E5%85%B3%E7%B3%BB%E8%AF%A6%E7%BB%86',
  exactJiaJiDirectRuleFamilyObserved: true,
  observedRuleFamily: Object.freeze([
    '甲己合而不化时要论生克',
    '甲木克己土',
    '甲木牵制己土或己土牵制甲木',
    '合绊',
    '双方减力',
  ] as const),
  authorIdentityVerifiedBeyondDisplayedName: false,
  firstPublicationEstablished: false,
  originalHostEstablished: false,
  printedWitnessEstablished: false,
  independentLineageEstablished: false,
  normativeAuthorityAcquired: false,
});

export const R185_LATER_REPUBLICATION_CONTEXT = Object.freeze({
  candidateId: 'R185-P02-AQIOO-2021-REPUBLICATION',
  sourceLabel: '阿启网 repost surface' as const,
  sourceUrl: 'https://www.aqioo.com/bazisuanming/tiangandizhi/166283.html',
  displayedPublicationTimestamp: '2021-08-26 09:02:33' as const,
  displayedPosterName: '灵睿居士' as const,
  articleTitle: '天干地支的刑冲合害等作用关系' as const,
  internalHeading:
    '天干地支的刑冲合害等作用关系的整理与复习' as const,
  lectureManuscriptLabelObserved: true,
  lectureManuscriptLabel: '松原易学年会 讲座稿' as const,
  exactJiaJiDirectRuleFamilyObserved: true,
  establishes2011SurfaceDerivedFromLectureManuscript: false,
  establishesSongKunAsOriginalAuthor: false,
  establishesLectureDate: false,
  establishesPrintedOrOfficialManuscript: false,
  normativeAuthorityAcquired: false,
});

export const R185_DUPLICATE_SURFACE_AUDIT = Object.freeze([
  Object.freeze({
    candidateId: 'R185-D01-5IDOC-REPOST',
    sourceLabel: '吾爱文档 indexed document' as const,
    sourceUrl: 'https://www.5idoc.com/doc/0522787761.html',
    displayedTimestampObserved: '2011-10-06 11:35:30' as const,
    sameTitleFamilyObserved: true,
    sameJiaJiRuleFamilyObserved: true,
    independentAuthorshipEstablished: false,
    independentLineageEstablished: false,
    mayIncreaseNormativeWitnessCount: false,
  }),
  Object.freeze({
    candidateId: 'R185-D02-HANXIANGTANG-2019',
    sourceLabel: '汉相堂 repost/article surface' as const,
    sourceUrl: r184DirectRule.sourceUrl,
    displayedDateObserved: '2019-07-24' as const,
    sameJiaJiRuleFamilyObserved: true,
    independentAuthorshipEstablished: false,
    independentLineageEstablished: false,
    mayIncreaseNormativeWitnessCount: false,
  }),
]);

export const R185_PROVENANCE_PROGRESS = Object.freeze({
  r184OriginalSourceLineagePreviouslyResolved:
    R184_AUTHORITY.originalSourceLineageResolved,
  r184FirstPublicationPreviouslyEstablished:
    R184_PROVENANCE_BOUNDARY.originalAuthorOrFirstPublicationEstablished,
  earliestAttributablePublicSurfaceCandidateEstablished: true,
  earliestObservedDisplayedDate: '2011-10-06' as const,
  displayedAttributionNameAvailable: true,
  laterLectureManuscriptLabelAvailable: true,
  originalAuthorEstablished: false,
  firstPublicationEstablished: false,
  originalLectureManuscriptAcquired: false,
  printedWitnessEstablished: false,
  directNonDayMasterCaseLineageConnectedToRuleFamily: false,
  canonicalTraditionalLineageEstablished: false,
});

export const R185_R184_CASE_PROVENANCE_GAP = Object.freeze({
  r184ExactNonDayMasterSecondaryDirectCaseObserved:
    R184_AUTHORITY.exactNonDayMasterSecondaryDirectCaseObserved,
  exactNonDayMasterCaseSourceUrl:
    'https://read01.com/zh-sg/Rmo3Ea.html' as const,
  exactNonDayMasterCaseEarliestAttributableAuthorEstablished: false,
  exactNonDayMasterCaseEarliestPublicationEstablished: false,
  exactNonDayMasterCaseBookOrPrintedSourceEstablished: false,
  exactNonDayMasterCaseSharesSongKun2011LineageEstablished: false,
  directCaseProvenanceStillOpen: true,
});

export const R185_AUTHORITY_BOUNDARY = Object.freeze({
  earliestAttributableSurfaceDoesNotEqualFirstPublication: true,
  displayedNameDoesNotEqualVerifiedOriginalAuthor: true,
  repostLectureLabelDoesNotEqualOriginalLectureManuscript: true,
  duplicateTextDoesNotEqualIndependentCorroboration: true,
  2011ModernSurfaceDoesNotEqualClassicalCanonicalAuthority: true,
  ruleFamilyLineageDoesNotTransferToDirectCaseWithoutEvidence: true,
  provenanceProgressDoesNotEqualSemanticAdmission: true,
});

export const R185_REQUIRED_FOLLOW_UP = Object.freeze([
  'TRACE_SONG_KUN_2011_SURFACE_TO_ORIGINAL_HOST_OR_ARCHIVE',
  'VERIFY_SONG_KUN_IDENTITY_AND_ROLE_IF_POSSIBLE',
  'LOCATE_SONGYUAN_YIXUE_ANNUAL_MEETING_MANUSCRIPT_OR_RECORD',
  'TRACE_READ01_DIRECT_NON_DAY_MASTER_CASE_TO_EARLIEST_SOURCE',
  'COMPARE_RULE_FAMILY_AND_DIRECT_CASE_TEXTUAL_LINEAGES',
] as const);

export const R185_REJECTED_SHORTCUTS = Object.freeze([
  'EARLIEST_FOUND_WEB_SURFACE_EQUALS_FIRST_PUBLICATION',
  'DISPLAYED_NAME_EQUALS_ORIGINAL_AUTHOR',
  'REPOST_LECTURE_LABEL_EQUALS_PRIMARY_MANUSCRIPT',
  'DUPLICATE_TEXT_EQUALS_INDEPENDENT_WITNESS',
  'SONG_KUN_2011_EQUALS_CLASSICAL_CANON',
  'RULE_FAMILY_PROVENANCE_EQUALS_DIRECT_CASE_PROVENANCE',
  'PROVENANCE_PROGRESS_EQUALS_PAIR_LOCAL_OUTCOME_AUTHORITY',
] as const);

export const R185_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_JIA_JI_SECONDARY_PROVENANCE_EARLIEST_ATTRIBUTABLE_SURFACE_BOUND' as const,
  researchOnly: true,
  earliestAttributablePublicSurfaceCandidateEstablished: true,
  displayedAttributionNameAvailable: true,
  displayedDateAvailable: true,
  laterLectureManuscriptLabelAvailable: true,
  originalAuthorEstablished: false,
  firstPublicationEstablished: false,
  originalHostEstablished: false,
  originalLectureManuscriptAcquired: false,
  printedWitnessEstablished: false,
  independentLineageEstablished: false,
  directNonDayMasterCaseProvenanceResolved: false,
  primaryOrCanonicalDirectMatchAuthorityObserved: false,
  pairLocalNormativeAuthorityAcquired: false,
  pairLocalInteractionOutcomeEstablished: false,
  coexistenceSettlementEstablished: false,
  exactContextSettlementEstablished: false,
  crossRelationPrecedenceAuthorized: false,
  settlementEstablished: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
