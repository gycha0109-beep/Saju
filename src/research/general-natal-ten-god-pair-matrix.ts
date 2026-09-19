export const R050_TEN_GOD_PAIR_MATRIX_VERSION = '0.1.0-research' as const;

export const R050_TEN_GODS = Object.freeze([
  '비견', '겁재', '식신', '상관', '편재',
  '정재', '편관', '정관', '편인', '정인',
] as const);

export type R050TenGod = (typeof R050_TEN_GODS)[number];

export type R050Family = 'PEER' | 'OUTPUT' | 'WEALTH' | 'OFFICER' | 'RESOURCE';

export type R050EvidenceStatus =
  | 'FAMILY_LEVEL_EVIDENCE'
  | 'EXACT_MEMBER_INTERSECTION'
  | 'UNRESOLVED';

export type R050Directionality = 'DIRECTED' | 'SYMMETRIC' | 'UNRESOLVED';

export type R050RelationKind =
  | 'GENERATES'
  | 'ADVERSE_TO'
  | 'CONFLICTS_WITH'
  | 'UNRESOLVED';

const FAMILY_BY_TEN_GOD: Readonly<Record<R050TenGod, R050Family>> = Object.freeze({
  비견: 'PEER',
  겁재: 'PEER',
  식신: 'OUTPUT',
  상관: 'OUTPUT',
  편재: 'WEALTH',
  정재: 'WEALTH',
  편관: 'OFFICER',
  정관: 'OFFICER',
  편인: 'RESOURCE',
  정인: 'RESOURCE',
});

export interface R050PairEvidence {
  from: R050TenGod;
  to: R050TenGod;
  fromFamily: R050Family;
  toFamily: R050Family;
  evidenceStatus: R050EvidenceStatus;
  directionality: R050Directionality;
  relationKind: R050RelationKind;
  sourceBasis: readonly string[];
  prerequisites: readonly string[];
  executable: false;
}

function classifyPair(from: R050TenGod, to: R050TenGod): R050PairEvidence {
  const fromFamily = FAMILY_BY_TEN_GOD[from];
  const toFamily = FAMILY_BY_TEN_GOD[to];

  if (from === '겁재' && toFamily === 'WEALTH') {
    return {
      from, to, fromFamily, toFamily,
      evidenceStatus: 'EXACT_MEMBER_INTERSECTION',
      directionality: 'DIRECTED',
      relationKind: 'ADVERSE_TO',
      sourceBasis: ['#801', '#860'],
      prerequisites: ['EXACT_GYEOPJAE_PRESENT', 'WEALTH_FAMILY_PRESENT', 'CONTEXT_EFFECT_NOT_AUTO_RESOLVED'],
      executable: false,
    };
  }

  if (fromFamily === 'OUTPUT' && toFamily === 'WEALTH') {
    return {
      from, to, fromFamily, toFamily,
      evidenceStatus: 'FAMILY_LEVEL_EVIDENCE',
      directionality: 'DIRECTED',
      relationKind: 'GENERATES',
      sourceBasis: ['#801', '#860', 'R045'],
      prerequisites: ['OUTPUT_FAMILY_PRESENT', 'WEALTH_FAMILY_PRESENT', 'MEMBER_LEVEL_SEMANTICS_NOT_ESTABLISHED', 'CONTEXT_EFFECT_NOT_AUTO_RESOLVED'],
      executable: false,
    };
  }

  if (fromFamily === 'WEALTH' && toFamily === 'OFFICER') {
    return {
      from, to, fromFamily, toFamily,
      evidenceStatus: 'FAMILY_LEVEL_EVIDENCE',
      directionality: 'DIRECTED',
      relationKind: 'GENERATES',
      sourceBasis: ['#801', '#860', 'R041'],
      prerequisites: ['WEALTH_FAMILY_PRESENT', 'OFFICER_FAMILY_PRESENT', 'MEMBER_LEVEL_SEMANTICS_NOT_ESTABLISHED', 'CONTEXT_EFFECT_NOT_AUTO_RESOLVED'],
      executable: false,
    };
  }

  if (fromFamily === 'OFFICER' && toFamily === 'RESOURCE') {
    return {
      from, to, fromFamily, toFamily,
      evidenceStatus: 'FAMILY_LEVEL_EVIDENCE',
      directionality: 'DIRECTED',
      relationKind: 'GENERATES',
      sourceBasis: ['#801', '#860', 'R042', 'R049'],
      prerequisites: ['OFFICER_FAMILY_PRESENT', 'RESOURCE_FAMILY_PRESENT', 'MEMBER_LEVEL_SEMANTICS_NOT_ESTABLISHED', 'CONTEXT_EFFECT_NOT_AUTO_RESOLVED'],
      executable: false,
    };
  }

  if (
    (fromFamily === 'WEALTH' && toFamily === 'RESOURCE') ||
    (fromFamily === 'RESOURCE' && toFamily === 'WEALTH')
  ) {
    return {
      from, to, fromFamily, toFamily,
      evidenceStatus: 'FAMILY_LEVEL_EVIDENCE',
      directionality: 'SYMMETRIC',
      relationKind: 'CONFLICTS_WITH',
      sourceBasis: ['#801', '#860', 'R044'],
      prerequisites: ['WEALTH_FAMILY_PRESENT', 'RESOURCE_FAMILY_PRESENT', 'MEMBER_LEVEL_SEMANTICS_NOT_ESTABLISHED', 'CONTEXT_EFFECT_NOT_AUTO_RESOLVED'],
      executable: false,
    };
  }

  return {
    from, to, fromFamily, toFamily,
    evidenceStatus: 'UNRESOLVED',
    directionality: 'UNRESOLVED',
    relationKind: 'UNRESOLVED',
    sourceBasis: [],
    prerequisites: ['SOURCE_BOUNDED_RELATION_NOT_ESTABLISHED'],
    executable: false,
  };
}

export const R050_TEN_GOD_PAIR_MATRIX: readonly R050PairEvidence[] = Object.freeze(
  R050_TEN_GODS.flatMap((from) => R050_TEN_GODS.map((to) => classifyPair(from, to))),
);

export const R050_AUTHORITY = Object.freeze({
  status: 'EXHAUSTIVE_INVENTORY_ONLY' as const,
  orderedPairCount: 100,
  familyLevelEvidenceCount: 20,
  exactMemberIntersectionCount: 2,
  unresolvedCount: 78,
  missingEvidenceMeansNoRelation: false,
  familyEvidencePromotesExactMemberSemantics: false,
  presenceOnlyPolarityAuthorized: false,
  executableRelationResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
