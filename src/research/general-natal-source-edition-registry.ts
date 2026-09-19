export const R091_SOURCE_EDITION_REGISTRY_VERSION = '0.1.0-research' as const;

export const R091_IDENTITY_LAYERS = Object.freeze([
  'WORK_IDENTITY','EDITION_IDENTITY','WITNESS_IDENTITY',
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

export const R091_INITIAL_WORKS = Object.freeze([
  { workId:'WORK-ZIPING-ZHENQUAN-PINGZHU', title:'子平真詮評註', editionIdentity:null },
  { workId:'WORK-SANMING-TONGHUI', title:'三命通會', editionIdentity:null },
  { workId:'WORK-DITIAN-SUI-CHANWEI', title:'滴天髓闡微', editionIdentity:null },
  { workId:'WORK-SHENFENG-TONGKAO', title:'神峰通考', editionIdentity:null },
] as const);

export const R091_REQUIRED_WITNESS_FIELDS = Object.freeze([
  'WITNESS_ID',
  'WORK_ID',
  'EDITION_ID_OR_UNKNOWN',
  'URL_OR_REPOSITORY_LOCATOR',
  'ACCESSED_AT',
  'PASSAGE_LOCATOR',
  'CONTENT_CHECKSUM_IF_REPRODUCIBLE',
] as const);

export const R091_REJECTED_SHORTCUTS = Object.freeze([
  'URL_EQUALS_EDITION_IDENTITY',
  'SAME_TITLE_EQUALS_SAME_EDITION',
  'DIFFERENT_WEBSITE_EQUALS_INDEPENDENT_PROVENANCE',
  'FABRICATE_PUBLICATION_METADATA',
  'UNKNOWN_RELATIONSHIP_TREATED_AS_INDEPENDENT',
] as const);

export const R091_AUTHORITY = Object.freeze({
  status:'IDENTITY_LAYER_REGISTRY_DEFINED' as const,
  initialWorkCount:4,
  editionMetadataFabricationAuthorized:false,
  websiteIndependenceAssumptionAuthorized:false,
  provenanceTierPromotionAuthorized:false,
  productionAuthorityPromoted:false,
});
