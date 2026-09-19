export const R030_GEJU_CONFLICT_MATRIX_VERSION='0.1.0-research' as const;

export type R030CandidateCardinality='ZERO'|'ONE'|'MULTIPLE';
export type R030ResolutionState=
 |'NO_CANDIDATE'
 |'SINGLE_CANDIDATE_UNESTABLISHED'
 |'MULTIPLE_COEXISTING'
 |'MULTIPLE_CONFLICT_UNRESOLVED'
 |'ORDINARY_CONDITION_EVALUATION_REQUIRED'
 |'SPECIAL_TRANSITION_REQUIRED'
 |'ORDINARY_PATH_BLOCKS_EXTERNAL_SWITCH'
 |'BROKEN_ORDINARY_PATTERN'
 |'INDETERMINATE';

export interface R030ConflictScenario{
 id:string;
 cardinality:R030CandidateCardinality;
 observedSourceBoundary:string;
 state:R030ResolutionState;
 mayChooseSingleWinner:false;
 executable:false;
}

export const R030_CONFLICT_SCENARIOS:readonly R030ConflictScenario[]=Object.freeze([
 {id:'zero-candidate',cardinality:'ZERO',observedSourceBoundary:'no governed selection satisfied',state:'NO_CANDIDATE',mayChooseSingleWinner:false,executable:false},
 {id:'single-candidate',cardinality:'ONE',observedSourceBoundary:'one source-governed candidate only',state:'SINGLE_CANDIDATE_UNESTABLISHED',mayChooseSingleWinner:false,executable:false},
 {id:'compatible-multiple',cardinality:'MULTIPLE',observedSourceBoundary:'兼透則兼用；透而又會，則透與會並用',state:'MULTIPLE_COEXISTING',mayChooseSingleWinner:false,executable:false},
 {id:'conflicting-multiple',cardinality:'MULTIPLE',observedSourceBoundary:'multiple channels present but precedence predicate absent',state:'MULTIPLE_CONFLICT_UNRESOLVED',mayChooseSingleWinner:false,executable:false},
 {id:'ordinary-condition-family',cardinality:'ONE',observedSourceBoundary:'成/敗/帶忌/救應 are subsequent evaluation states',state:'ORDINARY_CONDITION_EVALUATION_REQUIRED',mayChooseSingleWinner:false,executable:false},
 {id:'jianlu-yuejie-transition',cardinality:'ONE',observedSourceBoundary:'祿劫本身不能為用，而另取扶抑之神為用',state:'SPECIAL_TRANSITION_REQUIRED',mayChooseSingleWinner:false,executable:false},
 {id:'ordinary-path-present',cardinality:'ONE',observedSourceBoundary:'月令有用神、四柱有扶抑，不另取外格',state:'ORDINARY_PATH_BLOCKS_EXTERNAL_SWITCH',mayChooseSingleWinner:false,executable:false},
 {id:'broken-ordinary-no-rescue',cardinality:'ONE',observedSourceBoundary:'財被劫/官被傷不等於月令無取',state:'BROKEN_ORDINARY_PATTERN',mayChooseSingleWinner:false,executable:false},
 {id:'predicate-gap',cardinality:'MULTIPLE',observedSourceBoundary:'required selection/transformation/precedence predicate missing',state:'INDETERMINATE',mayChooseSingleWinner:false,executable:false},
]);

export const R030_FORBIDDEN_SHORTCUTS=Object.freeze([
 'HIDDEN_STEM_ARRAY_ORDER_AS_RANK',
 'MONTH_BRANCH_IDENTITY_AS_ESTABLISHMENT',
 'NUMERIC_CANDIDATE_SCORE',
 'FORCE_SINGLE_WINNER',
 'BROKEN_PATTERN_AUTO_FOLLOW',
 'UNRESOLVED_PREDICATE_GUESS',
] as const);

export const R030_REQUIRED_FUTURE_PREDICATES=Object.freeze([
 'MONTH_ORDER_HIDDEN_CONTENT_SELECTION',
 'VISIBLE_STEM_TRANSPARENCY_SELECTION',
 'BRANCH_MEETING_SELECTION_EFFECT',
 'MULTIPLE_CANDIDATE_REPRESENTATION',
 'CANDIDATE_COMPATIBILITY',
 'TRANSFORMATION_PRECEDENCE',
 'ESTABLISHMENT_SUCCESS_FAILURE',
 'RESCUE_PRECEDENCE',
] as const);

export const R030_AUTHORITY=Object.freeze({
 status:'research' as const,
 multiCandidateRepresentationBoundaryVerified:true,
 conflictStatesRepresentable:true,
 conflictWinnerResolverAuthorized:false,
 establishmentResolverAuthorized:false,
 productionAuthorityPromoted:false,
});
