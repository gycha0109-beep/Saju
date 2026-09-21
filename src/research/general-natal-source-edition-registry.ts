export const R091_SOURCE_EDITION_REGISTRY_VERSION = '0.2.0-research' as const;

export const R091_IDENTITY_LAYERS = Object.freeze([
  'WORK_IDENTITY',
  'EDITION_IDENTITY',
  'WITNESS_IDENTITY',
] as const);

export const R091_RELATIONSHIP_TYPES = Object.freeze([
  'EDITION_OF',
  'WITNESS_OF_EDITION',
  'WITNESS_OF_WORK_EDITION_UNKNOWN',
  'DERIVED_FROM',
  'REPRINT_OF',
  'TRANSLATION_OF',
  'UNKNOWN',
] as const);

export const R091_WITNESS_STABILITY_STATES = Object.freeze([
  'REPRODUCIBLE_SNAPSHOT',
  'LOCATOR_ONLY_MUTABLE',
  'INSUFFICIENT',
] as const);

export const R091_REQUIRED_WORK_FIELDS = Object.freeze([
  'WORK_ID',
  'CANONICAL_TITLE',
  'IDENTITY_LAYER',
] as const);

export const R091_EDITION_FIELDS = Object.freeze([
  'EDITION_ID',
  'WORK_ID',
  'EDITOR_OR_UNKNOWN',
  'PUBLISHER_OR_UNKNOWN',
  'PUBLICATION_YEAR_OR_UNKNOWN',
  'LANGUAGE_OR_UNKNOWN',
  'VOLUME_IDENTITY_OR_UNKNOWN',
  'ASSERTED_FIELD_EVIDENCE_REFS',
] as const);

export const R091_REQUIRED_WITNESS_FIELDS = Object.freeze([
  'WITNESS_ID',
  'WORK_ID',
  'EDITION_ID_OR_EXPLICIT_UNKNOWN',
  'URL_ARCHIVE_OR_REPOSITORY_LOCATOR',
  'ACCESSED_AT',
  'PASSAGE_LOCATOR',
  'CONTENT_CHECKSUM_IF_REPRODUCIBLE',
  'WITNESS_STABILITY_STATE',
] as const);

export const R091_RELATION_ASSERTION_RULES = Object.freeze([
  'NON_UNKNOWN_RELATION_REQUIRES_EVIDENCE_REFS',
  'UNKNOWN_LINEAGE_REMAINS_UNKNOWN',
  'NO_INDEPENDENCE_INFERENCE_FROM_DISTINCT_HOSTS',
] as const);

export const R091_INITIAL_WORKS = Object.freeze([
  {
    workId: 'WORK-ZIPING-ZHENQUAN-PINGZHU',
    title: '子平真詮評註',
    identityLayer: 'WORK_IDENTITY',
    editionIdentity: null,
  },
  {
    workId: 'WORK-SANMING-TONGHUI',
    title: '三命通會',
    identityLayer: 'WORK_IDENTITY',
    editionIdentity: null,
  },
  {
    workId: 'WORK-DITIAN-SUI-CHANWEI',
    title: '滴天髓闡微',
    identityLayer: 'WORK_IDENTITY',
    editionIdentity: null,
  },
  {
    workId: 'WORK-SHENFENG-TONGKAO',
    title: '神峰通考',
    identityLayer: 'WORK_IDENTITY',
    editionIdentity: null,
  },
] as const);

export const R091_REJECTED_SHORTCUTS = Object.freeze([
  'URL_EQUALS_EDITION_IDENTITY',
  'SAME_TITLE_EQUALS_SAME_EDITION',
  'DIFFERENT_WEBSITE_EQUALS_INDEPENDENT_PROVENANCE',
  'FABRICATE_PUBLICATION_METADATA',
  'UNKNOWN_RELATIONSHIP_TREATED_AS_INDEPENDENT',
  'MISSING_CHECKSUM_EQUALS_IMMUTABLE_WITNESS',
  'REGISTRY_MEMBERSHIP_EQUALS_TEXT_VERIFICATION',
  'IDENTITY_REGISTRY_REPLACES_SOURCE_REFERENCE',
] as const);

export const R091_AUTHORITY = Object.freeze({
  status: 'IDENTITY_NORMALIZATION_LAYER_DEFINED' as const,
  initialWorkCount: 4,
  normalizationLayerOnly: true,
  replacesSourceReference: false,
  assertedMetadataRequiresEvidence: true,
  mutableLocatorCountsAsImmutableWitness: false,
  registryMembershipVerifiesText: false,
  editionMetadataFabricationAuthorized: false,
  websiteIndependenceAssumptionAuthorized: false,
  provenanceTierPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
