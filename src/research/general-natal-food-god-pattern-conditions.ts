export const R025_FOOD_GOD_PATTERN_VERSION = '0.1.0-research' as const;
export type R025ConditionRole='SUCCESS'|'FAILURE'|'CONTAMINATION'|'RESCUE';
export interface R025FoodGodPatternProposition{
 id:string; role:R025ConditionRole; sourcePhrase:string; operands:readonly string[]; executable:false;
}
export const R025_FOOD_GOD_PATTERN_PROPOSITIONS:readonly R025FoodGodPatternProposition[]=Object.freeze([
 {id:'food-generates-wealth',role:'SUCCESS',sourcePhrase:'食神生財',operands:['食神','財'],executable:false},
 {id:'food-with-kill-no-wealth',role:'SUCCESS',sourcePhrase:'食帶煞而無財',operands:['食神','煞','無財'],executable:false},
 {id:'abandon-food-follow-kill-with-seal',role:'SUCCESS',sourcePhrase:'棄食就煞而透印',operands:['棄食','就煞','透印'],executable:false},
 {id:'food-meets-owl',role:'FAILURE',sourcePhrase:'食神逢梟',operands:['食神','梟'],executable:false},
 {id:'generate-wealth-expose-kill',role:'FAILURE',sourcePhrase:'生財露煞',operands:['生財','露煞'],executable:false},
 {id:'food-kill-seal-then-wealth',role:'CONTAMINATION',sourcePhrase:'食神帶煞印而又逢財',operands:['食神','煞','印','財'],executable:false},
 {id:'food-meets-owl-switch-to-kill',role:'RESCUE',sourcePhrase:'食逢梟而就煞以成格',operands:['食','梟','就煞'],executable:false},
 {id:'wealth-protects-food',role:'RESCUE',sourcePhrase:'或生財以護食',operands:['生財','護食'],executable:false},
]);
export const R025_EXECUTION_GAPS=Object.freeze([
 'FOOD_GOD_PATTERN_CANDIDATE_SELECTION','OWL_SEIZES_FOOD_EFFECT','WEALTH_SUPPORTS_KILL_EFFECT',
 'KILL_CONTROL_BALANCE','SEAL_TRANSFORMS_KILL_EFFECT','ABANDON_FOOD_SWITCH_CONDITION','RESCUE_PRECEDENCE'
] as const);
export const R025_AUTHORITY=Object.freeze({
 status:'research' as const,propositionFamiliesVerified:true,
 ordinaryFoodGodVsAbandonFoodSeparated:true,
 executableFoodGodPatternResolverAuthorized:false,
 establishmentBooleanAuthorized:false,productionAuthorityPromoted:false,
});
