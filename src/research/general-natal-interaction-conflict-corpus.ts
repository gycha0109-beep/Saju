export const R059_INTERACTION_CONFLICT_CORPUS_VERSION = '0.1.0-research' as const;

export type R059RelationKind = 'COMBINATION' | 'MEETING' | 'CLASH' | 'PUNISHMENT' | 'HARM' | 'BREAK';

export interface R059ConflictCase {
  id: string;
  actor: R059RelationKind;
  target: R059RelationKind;
  boundedResult:
    | 'RESOLVES'
    | 'CAN_REACTIVATE'
    | 'MAY_BE_INEFFECTIVE';
  sourceSurface: string;
  generalizedPrecedenceAuthorized: false;
  executable: false;
}

export const R059_DIRECT_CASES: readonly R059ConflictCase[] = Object.freeze([
  {
    id: 'C1-SHEN-ZI-CHEN-RESOLVES-ZI-WU',
    actor: 'MEETING',
    target: 'CLASH',
    boundedResult: 'RESOLVES',
    sourceSurface: '申子辰之會，而解子午之沖',
    generalizedPrecedenceAuthorized: false,
    executable: false,
  },
  {
    id: 'C2-MAO-YOU-RESOLVES-SI-YOU',
    actor: 'CLASH',
    target: 'MEETING',
    boundedResult: 'RESOLVES',
    sourceSurface: '卯酉之沖，而解巳酉之會',
    generalizedPrecedenceAuthorized: false,
    executable: false,
  },
  {
    id: 'C3-MAO-XU-RESOLVES-MAO-YOU',
    actor: 'COMBINATION',
    target: 'CLASH',
    boundedResult: 'RESOLVES',
    sourceSurface: '卯戌之合，而解卯酉之沖',
    generalizedPrecedenceAuthorized: false,
    executable: false,
  },
  {
    id: 'C4-YIN-SHEN-RESOLVES-ZI-SHEN',
    actor: 'CLASH',
    target: 'MEETING',
    boundedResult: 'RESOLVES',
    sourceSurface: '寅申之沖，而解子申之會',
    generalizedPrecedenceAuthorized: false,
    executable: false,
  },
  {
    id: 'C5-RESOLUTION-REACTIVATES-CONFLICT',
    actor: 'COMBINATION',
    target: 'CLASH',
    boundedResult: 'CAN_REACTIVATE',
    sourceSurface: '因解而反得刑沖',
    generalizedPrecedenceAuthorized: false,
    executable: false,
  },
  {
    id: 'C6-STRUCTURAL-MATCH-MAY-BE-INEFFECTIVE',
    actor: 'CLASH',
    target: 'COMBINATION',
    boundedResult: 'MAY_BE_INEFFECTIVE',
    sourceSurface: '須看地位與性質之如何而定；無一定之方式',
    generalizedPrecedenceAuthorized: false,
    executable: false,
  },
]);

export const R059_COVERAGE = Object.freeze({
  directConflictCaseCoverage: ['COMBINATION', 'MEETING', 'CLASH', 'PUNISHMENT'] as const,
  harmConflictCaseCoverage: 'INSUFFICIENT' as const,
  breakConflictCaseCoverage: 'INSUFFICIENT' as const,
  totalOrderingAuthorized: false,
  firstMatchWinsAuthorized: false,
  numericWeightAuthorized: false,
});

export const R059_EXECUTION_GAPS = Object.freeze([
  'POSITIONAL_EFFECT',
  'RELATION_EFFECTIVENESS',
  'MULTIPLE_RELATION_SETTLEMENT',
  'HAI_CONFLICT_CASES',
  'PO_CONFLICT_CASES',
  'TIME_LAYER_INTERACTION',
  'ROLE_CONTEXT',
  'CROSS_RELATION_PRECEDENCE',
] as const);

export const R059_AUTHORITY = Object.freeze({
  status: 'VERIFIED_NONUNIVERSAL_CONFLICT_CASE_CORPUS' as const,
  directCaseCount: 6,
  universalPrecedenceAuthorized: false,
  totalOrderAuthorized: false,
  executableConflictResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
