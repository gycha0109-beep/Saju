export const R010_YUANHAI_STEMMA_VARIANT_MATRIX_VERSION = '0.1.0-research' as const;

export const R010_SURFACES = Object.freeze([
  {
    id: 'NLC_MING_WANLI',
    identityState: 'REGISTERED_DIRECTLY_INSPECTED',
    openingEvidence: 'BOUNDED_SURFACE_SEPARATE_RECORD',
    frozenContextExactWitnessCount: 0,
    genealogicalPlacement: 'UNRESOLVED',
  },
  {
    id: 'TIANYI_CHONGZHEN',
    identityState: 'REGISTERED_DIRECTLY_INSPECTED',
    openingEvidence: 'R004_SHARED_16_ANCHOR_OPENING',
    frozenContextExactWitnessCount: 0,
    genealogicalPlacement: 'UNRESOLVED',
  },
  {
    id: 'NLC_1634_YUSHI_SHANCHENGTANG',
    identityState: 'REGISTERED_DIRECTLY_INSPECTED',
    openingEvidence: 'R004_SHARED_16_ANCHOR_OPENING',
    frozenContextExactWitnessCount: 0,
    genealogicalPlacement: 'UNRESOLVED',
  },
  {
    id: 'ZHUJI_QING_FUJIAN_YUSHI',
    identityState: 'REGISTERED_DIRECTLY_INSPECTED',
    openingEvidence: 'R005_15_EXACT_PLUS_SLOT12_LEXICAL_VARIANT',
    frozenContextExactWitnessCount: 0,
    genealogicalPlacement: 'UNRESOLVED',
  },
  {
    id: 'NTL_1926_QIN_SHENAN',
    identityState: 'REGISTERED_DIRECTLY_INSPECTED',
    openingEvidence: 'FULL_OPENING_NOT_GOVERNED_BY_R004_R005',
    frozenContextExactWitnessCount: 0,
    genealogicalPlacement: 'UNRESOLVED',
  },
  {
    id: 'NLC_1940_ZHAO_YANSHENG_ZHANGFUJI',
    identityState: 'REGISTERED_DIRECTLY_INSPECTED',
    openingEvidence: 'FULL_OPENING_NOT_GOVERNED_BY_R004_R005',
    frozenContextExactWitnessCount: 0,
    genealogicalPlacement: 'UNRESOLVED',
  },
  {
    id: 'WIKISOURCE_OLDID_2593607',
    identityState: 'FROZEN_WEB_TRANSCRIPTION_EDITION_UNKNOWN',
    openingEvidence: 'SOURCE_FAMILY_ATTRIBUTION_UNRESOLVED',
    frozenContextExactWitnessCount: 4,
    genealogicalPlacement: 'UNRESOLVED',
  },
] as const);

export const R010_ESTABLISHED_AFFINITY_EDGES = Object.freeze([
  {
    left: 'TIANYI_CHONGZHEN',
    right: 'NLC_1634_YUSHI_SHANCHENGTANG',
    relation: 'BOUNDED_SEQUENCE_CORRESPONDENCE',
    evidenceScope: 'R004_OPENING_16_ANCHORS_PLUS_RECORDED_LATER_ANCHORS',
    genealogicalDirection: 'UNKNOWN',
  },
  {
    left: 'ZHUJI_QING_FUJIAN_YUSHI',
    right: 'TIANYI_CHONGZHEN',
    relation: 'BOUNDED_SEQUENCE_CORRESPONDENCE_WITH_LEXICAL_VARIANT',
    evidenceScope: 'R005_VS_R004_SHARED_OPENING_SEQUENCE',
    genealogicalDirection: 'UNKNOWN',
  },
  {
    left: 'ZHUJI_QING_FUJIAN_YUSHI',
    right: 'NLC_1634_YUSHI_SHANCHENGTANG',
    relation: 'BOUNDED_SEQUENCE_CORRESPONDENCE_WITH_LEXICAL_VARIANT',
    evidenceScope: 'R005_VS_R004_SHARED_OPENING_SEQUENCE',
    genealogicalDirection: 'UNKNOWN',
  },
] as const);

export const R010_R004_OPENING = Object.freeze({
  sharedAnchorCount: 16,
  openingSequenceOrderMatches: true,
  laterRecordedSharedAnchors: Object.freeze(['印綬根深', '先財後印', '先印後財'] as const),
  fullEditionIdentityEstablished: false,
} as const);

export const R010_R005_VARIANT = Object.freeze({
  exactSharedOpeningAnchorCount: 15,
  lexicalVariantCount: 1,
  lexicalVariant: Object.freeze({
    position: 12,
    r004MingReading: '論格推詳',
    zhujiReading: '論格要精',
  }),
  exactOpeningIdentityEstablished: false,
  boundedFamilyCorrespondenceEstablished: true,
} as const);

export const R010_FROZEN_WIKISOURCE = Object.freeze({
  witnessId: 'WIKISOURCE_OLDID_2593607',
  r091Relationship: 'WITNESS_OF_WORK_EDITION_UNKNOWN',
  familyHypothesis: 'EXPANDED_OR_ZENGBU_SIYAN_DUBU_WEB_TRANSMISSION',
  familyHypothesisEvidenceState: 'INCONCLUSIVE',
  exactPrintedEditionEstablished: false,
  exactWitnessLineageEstablished: false,
  stemmaEdgeToPrintedEditionEstablished: false,
} as const);

export const R010_VARIANT_DIMENSIONS = Object.freeze([
  'OPENING_ANCHOR_SEQUENCE',
  'CORRESPONDING_SLOT_LEXICAL_VARIANT',
  'LATER_BOUNDED_ANCHOR_OVERLAP',
  'FROZEN_CONTEXT_EXACT_WITNESS_COUNT',
  'SAME_STRING_DIFFERENT_SECTION',
  'ORTHOGRAPHIC_VARIANCE',
  'REGISTERED_SCAN_IDENTITY',
  'EXACT_EDITION_IDENTITY',
  'GENEALOGICAL_DIRECTION',
] as const);

export const R010_UNRESOLVED_EDGES = Object.freeze([
  'NTL_1926_TO_MING_BOUNDED_CLUSTER',
  'NLC_1940_TO_MING_BOUNDED_CLUSTER',
  'NLC_MING_WANLI_TO_R004_R005_CLUSTER_BEYOND_GOVERNED_EVIDENCE',
  'WIKISOURCE_FROZEN_TO_ANY_REGISTERED_PRINTED_EDITION',
  'UNINSPECTED_ACQUISITION_TARGETS_TO_INSPECTED_SURFACES',
] as const);

export const R010_REJECTED_SHORTCUTS = Object.freeze([
  'SHARED_OPENING_EQUALS_SAME_EDITION',
  'SHARED_OPENING_EQUALS_REPRINT_RELATION',
  'CATALOG_LINEAGE_EQUALS_TEXTUAL_STEMMA_EDGE',
  'ZERO_OF_FOUR_EQUALS_UNRELATED_EDITION',
  'FOUR_OF_FOUR_EQUALS_DIRECT_ANCESTRY',
  'UNKNOWN_EDGE_EQUALS_INDEPENDENT',
  'ORTHOGRAPHIC_NORMALIZATION_FOR_STEMMA_MATCH',
  'NUMERIC_SIMILARITY_SCORE_EQUALS_GENEALOGICAL_AUTHORITY',
  'FAMILY_HYPOTHESIS_EQUALS_EDITION_IDENTITY',
] as const);

export const R010_AUTHORITY = Object.freeze({
  status: 'BOUNDED_TEXTUAL_AFFINITY_MATRIX_ESTABLISHED_GENEALOGICAL_STEMMA_UNRESOLVED' as const,
  surfaceCount: 7,
  establishedAffinityEdgeCount: 3,
  directedGenealogicalEdgeCount: 0,
  numericSimilarityScoreIntroduced: false,
  unknownMeansIndependent: false,
  witnessDefinitionChanged: false,
  sourceTierPromoted: false,
  provenanceQualityPromoted: false,
  lifecyclePromoted: false,
  productionAuthorityPromoted: false,
});
