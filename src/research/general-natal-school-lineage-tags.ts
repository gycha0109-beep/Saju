export const R095_SCHOOL_LINEAGE_TAG_VERSION = '0.1.0-research' as const;

export const R095_TAG_DIMENSIONS = Object.freeze([
  'TRADITION_FAMILY',
  'WORK_OR_COMMENTARY_LINEAGE',
  'AUTHOR_COMMENTATOR_PRACTITIONER',
  'HISTORICAL_OR_PUBLICATION_CONTEXT',
  'METHODOLOGY_FAMILY',
  'TERMINOLOGY_PROFILE',
  'CALCULATION_CONVENTION_DEPENDENCY',
] as const);

export const R095_INTER_LINEAGE_RELATIONS = Object.freeze([
  'SAME_TRADITION',
  'DERIVED',
  'COMMENTARY_ON',
  'PARTIAL_OVERLAP',
  'DIVERGENT',
  'UNKNOWN',
] as const);

export const R095_REJECTED_SHORTCUTS = Object.freeze([
  'POPULARITY_EQUALS_AUTHORITY',
  'SENIORITY_EQUALS_CONFIDENCE',
  'AUTO_SELECT_CANONICAL_SCHOOL',
  'SAME_LABEL_EQUALS_SAME_SEMANTICS',
  'DIFFERENT_LABEL_EQUALS_DIVERGENCE',
  'CROSS_SCHOOL_BLEND_WITHOUT_COMPOSITION_POLICY',
] as const);

export const R095_AUTHORITY = Object.freeze({
  status:'DESCRIPTIVE_LINEAGE_TAG_TAXONOMY_ONLY' as const,
  tagsAsAuthorityWeights:false,
  propositionComparisonRequiredForDivergence:true,
  forcedReconciliationAuthorized:false,
  unknownLineagePreserved:true,
  productionAuthorityPromoted:false,
});
