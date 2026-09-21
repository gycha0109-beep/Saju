export const R009_FROZEN_WIKISOURCE_ATTRIBUTION_VERSION = '0.1.0-research' as const;

export const R009_FROZEN_REVISION = Object.freeze({
  sourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
  oldid: 2593607,
  sectionLabel: '四言獨步',
  sourceQualification: 'IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED',
} as const);

export const R009_FROZEN_TARGETS = Object.freeze([
  '財旺生官',
  '煞化為印',
  '比劫羊刃，財格大忌',
  '印綬見財',
] as const);

export const R009_DIRECT_SCAN_NEGATIVE_COMPARATORS = Object.freeze([
  'NLC_MING_WANLI',
  'NLC_1634_YUSHI_SHANCHENGTANG',
  'NTL_1926_QIN_SHENAN',
  'NLC_1940_ZHAO_YANSHENG_ZHANGFUJI',
  'TIANYI_CHONGZHEN',
  'ZHUJI_QING_FUJIAN_YUSHI',
] as const);

export const R009_DISCOVERY_SURFACES = Object.freeze([
  {
    id: 'SECONDARY-ZENGBU-SIYAN-GETIT01',
    role: 'SECONDARY_DISCOVERY_ONLY',
    labelObserved: '增補四言獨步',
    registeredScanIdentity: false,
    independentProvenanceEstablished: false,
  },
  {
    id: 'SECONDARY-ZENGBU-SIYAN-READ01-A',
    role: 'SECONDARY_DISCOVERY_ONLY',
    labelObserved: '增補四言獨步',
    registeredScanIdentity: false,
    independentProvenanceEstablished: false,
  },
  {
    id: 'SECONDARY-ZENGBU-SIYAN-READ01-B',
    role: 'SECONDARY_DISCOVERY_ONLY',
    labelObserved: '增補四言獨步',
    registeredScanIdentity: false,
    independentProvenanceEstablished: false,
  },
  {
    id: 'SECONDARY-JIAOJINGSHANFANG-TRANSCRIPTION',
    role: 'NEGATIVE_CONTEXT_COMPARATOR_ONLY',
    labelObserved: '四言獨步',
    registeredScanIdentity: false,
    independentProvenanceEstablished: false,
  },
] as const);

export const R009_ATTRIBUTION_FINDINGS = Object.freeze([
  'FROZEN_WIKISOURCE_REVISION_IDENTITY_PINNED',
  'FOUR_FROZEN_TARGETS_PRESENT_IN_FROZEN_TRANSCRIPTION',
  'INSPECTED_REGISTERED_SCAN_SURFACES_DIVERGE_IN_FROZEN_CONTEXT',
  'SECONDARY_WEB_FAMILY_LABELS_SIMILAR_LONG_BLOCK_ZENGBU_SIYAN_DUBU',
  'SECONDARY_WEB_FAMILY_HAS_ORTHOGRAPHIC_AND_WORDING_VARIANCE',
  'EXACT_PRINTED_EDITION_NOT_ESTABLISHED',
  'EXACT_WITNESS_LINEAGE_NOT_ESTABLISHED',
] as const);

export const R009_FAMILY_HYPOTHESIS = Object.freeze({
  label: 'EXPANDED_OR_ZENGBU_SIYAN_DUBU_WEB_TRANSMISSION',
  evidenceState: 'INCONCLUSIVE',
  descriptiveFamilyHypothesisSupported: true,
  exactEditionIdentityEstablished: false,
  exactWitnessLineageEstablished: false,
  r091Relationship: 'WITNESS_OF_WORK_EDITION_UNKNOWN',
} as const);

export const R009_REQUIRED_NEXT_EVIDENCE = Object.freeze([
  'SCAN_OR_REPRODUCTION_WITH_BOUNDED_ZENGBU_SIYAN_SURFACE',
  'DOCUMENTED_TRANSCRIPTION_SOURCE_PLUS_REPRODUCIBLE_IMAGE',
  'WIKISOURCE_IMPORT_OR_EDIT_PROVENANCE_TIED_TO_A_WITNESS',
  'REVIEWED_STEMMA_WITHOUT_ORTHOGRAPHIC_COLLAPSE',
] as const);

export const R009_REJECTED_SHORTCUTS = Object.freeze([
  'SAME_FOUR_STRINGS_EQUALS_SAME_EDITION',
  'SECONDARY_WEB_LABEL_EQUALS_PRINTED_EDITION',
  'DIFFERENT_WEBSITES_EQUALS_INDEPENDENT_PROVENANCE',
  'ORTHOGRAPHIC_VARIANT_EQUALS_FROZEN_HASH_MATCH',
  'NO_MATCH_IN_INSPECTED_COPY_EQUALS_FAMILY_WIDE_ABSENCE',
  'WIKISOURCE_SECTION_HEADING_EQUALS_HISTORICAL_SECTION_IDENTITY',
  'FAMILY_HYPOTHESIS_EQUALS_R091_EDITION_IDENTITY',
] as const);

export const R009_AUTHORITY = Object.freeze({
  status: 'INCONCLUSIVE_EXACT_EDITION_BOUNDED_FAMILY_HYPOTHESIS' as const,
  frozenWitnessDefinitionChanged: false,
  frozenDigestChanged: false,
  exactPrintedEditionAttributed: false,
  exactWitnessLineageAttributed: false,
  sourceTierPromoted: false,
  provenanceQualityPromoted: false,
  lifecyclePromoted: false,
  productionAuthorityPromoted: false,
});
