export const R027_SEVEN_KILL_PATTERN_VERSION='0.1.0-research' as const;
export type R027ConditionRole='SUCCESS'|'FAILURE'|'CONTAMINATION'|'RESCUE';
export interface R027SevenKillProposition{
 id:string;role:R027ConditionRole;sourcePhrase:string;operands:readonly string[];executable:false;
}
export const R027_SEVEN_KILL_PROPOSITIONS:readonly R027SevenKillProposition[]=Object.freeze([
 {id:'strong-body-kill-controlled',role:'SUCCESS',sourcePhrase:'身強七煞逢制',operands:['身強','七煞','制'],executable:false},
 {id:'balanced-body-kill-food-control',role:'SUCCESS',sourcePhrase:'身煞兩停者，方許成格',operands:['身煞兩停','食神制煞'],executable:false},
 {id:'kill-meets-wealth-uncontrolled',role:'FAILURE',sourcePhrase:'七煞逢財無制',operands:['七煞','財','無制'],executable:false},
 {id:'food-controls-kill-then-seal',role:'CONTAMINATION',sourcePhrase:'七煞逢食制而又逢印',operands:['七煞','食制','印'],executable:false},
 {id:'wealth-removes-seal-preserves-food',role:'RESCUE',sourcePhrase:'煞逢食制，印來護煞，而逢財以去印存食',operands:['煞','食制','印','財','去印','存食'],executable:false},
]);
export const R027_EXPLICIT_REJECTIONS=Object.freeze([
 {condition:'身強煞弱',simpleControlPathAuthorized:false},
 {condition:'煞強身弱',simpleControlPathAuthorized:false},
] as const);
export const R027_EXECUTION_GAPS=Object.freeze([
 'SEVEN_KILL_PATTERN_CANDIDATE_SELECTION','BODY_STRENGTH','KILL_RELATIVE_STRENGTH',
 'BODY_KILL_BALANCE','FOOD_CONTROLS_KILL_EFFECT','SEAL_REMOVES_FOOD_EFFECT',
 'WEALTH_REMOVES_SEAL_EFFECT','RESCUE_PRECEDENCE'
] as const);
export const R027_AUTHORITY=Object.freeze({
 status:'research' as const,propositionFamiliesVerified:true,
 bodyKillBalanceRequiredForControlPath:true,
 executableSevenKillResolverAuthorized:false,establishmentBooleanAuthorized:false,
 productionAuthorityPromoted:false,
});
