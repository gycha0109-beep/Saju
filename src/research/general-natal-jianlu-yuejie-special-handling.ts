export const R028_JIANLU_YUEJIE_VERSION='0.1.0-research' as const;
export type R028TransitionTarget='OFFICER_LOGIC'|'WEALTH_LOGIC'|'SEVEN_KILL_LOGIC';
export interface R028Transition{
 id:string;sourcePhrase:string;target:R028TransitionTarget;operands:readonly string[];executable:false;
}
export const R028_SPECIAL_RULE=Object.freeze({
 sourcePhrase:'祿劫本身不能為用，而另取扶抑之神為用',
 selfSufficientOrdinaryYongshen:false,
 transitionRequired:true,
});
export const R028_SUCCESS_TRANSITIONS:readonly R028Transition[]=Object.freeze([
 {id:'expose-officer-meet-wealth-seal',sourcePhrase:'透官而逢財印',target:'OFFICER_LOGIC',operands:['透官','財','印'],executable:false},
 {id:'expose-wealth-meet-output',sourcePhrase:'透財而逢食傷',target:'WEALTH_LOGIC',operands:['透財','食傷'],executable:false},
 {id:'expose-kill-meet-control',sourcePhrase:'透煞而遇制伏',target:'SEVEN_KILL_LOGIC',operands:['透煞','制伏'],executable:false},
]);
export const R028_FAILURE_PROPOSITION=Object.freeze({
 sourcePhrase:'建祿月劫，無財官，透煞印，建祿月劫之格敗也',
 operands:['無財官','透煞','印'],
 executable:false as const,
});
export const R028_RESCUE_PROPOSITIONS=Object.freeze([
 {sourcePhrase:'建祿月劫用官，遇傷而傷被合',operands:['用官','傷','傷被合'],executable:false as const},
 {sourcePhrase:'用財帶煞而煞被合',operands:['用財','煞','煞被合'],executable:false as const},
]);
export const R028_EXECUTION_GAPS=Object.freeze([
 'JIANLU_YUEJIE_CANDIDATE_SELECTION','SUPPRESSION_SUPPORT_TARGET_SELECTION',
 'OFFICER_TRANSITION_PREDICATES','WEALTH_TRANSITION_PREDICATES','SEVEN_KILL_TRANSITION_PREDICATES',
 'COMBINATION_EFFECT','RESCUE_PRECEDENCE'
] as const);
export const R028_AUTHORITY=Object.freeze({
 status:'research' as const,specialHandlingVerified:true,
 monthBranchToEstablishedPatternAuthorized:false,
 selfSufficientYongshenAuthorized:false,
 transitionResolverAuthorized:false,productionAuthorityPromoted:false,
});
