export const R026_HURTING_OFFICER_PATTERN_VERSION='0.1.0-research' as const;
export type R026ConditionRole='SUCCESS'|'FAILURE'|'CONTAMINATION'|'RESCUE';
export interface R026HurtingOfficerProposition{
 id:string;role:R026ConditionRole;sourcePhrase:string;operands:readonly string[];executable:false;
}
export const R026_HURTING_OFFICER_PROPOSITIONS:readonly R026HurtingOfficerProposition[]=Object.freeze([
 {id:'hurting-generates-wealth',role:'SUCCESS',sourcePhrase:'傷官生財',operands:['傷官','財'],executable:false},
 {id:'hurting-with-seal-strong-hurting-rooted-seal',role:'SUCCESS',sourcePhrase:'傷官佩印而傷官旺，印有根',operands:['傷官旺','佩印','印有根'],executable:false},
 {id:'strong-hurting-weak-body-kill-seal',role:'SUCCESS',sourcePhrase:'傷官旺、身主弱而透煞印',operands:['傷官旺','身主弱','煞','印'],executable:false},
 {id:'hurting-with-kill-no-wealth',role:'SUCCESS',sourcePhrase:'傷官帶煞而無財',operands:['傷官','煞','無財'],executable:false},
 {id:'non-metal-water-hurting-sees-officer',role:'FAILURE',sourcePhrase:'傷官非金水而見官',operands:['非金水傷官','官'],executable:false},
 {id:'wealth-path-supports-kill',role:'FAILURE',sourcePhrase:'傷官生財，帶煞則財轉而生煞',operands:['傷官生財','煞','財生煞'],executable:false},
 {id:'seal-path-light-hurting-strong-body',role:'FAILURE',sourcePhrase:'佩印而傷輕身旺',operands:['佩印','傷輕','身旺'],executable:false},
 {id:'wealth-combined-away',role:'CONTAMINATION',sourcePhrase:'傷官生財而財又逢合',operands:['傷官生財','財合'],executable:false},
 {id:'seal-damaged',role:'CONTAMINATION',sourcePhrase:'佩印而印又遭傷',operands:['佩印','印遭傷'],executable:false},
 {id:'wealth-exposed-meets-kill',role:'CONTAMINATION',sourcePhrase:'透財而逢煞',operands:['透財','煞'],executable:false},
 {id:'kill-combined-rescue',role:'RESCUE',sourcePhrase:'傷官生財透煞而煞逢合',operands:['傷官生財','透煞','煞合'],executable:false},
]);
export const R026_EXECUTION_GAPS=Object.freeze([
 'HURTING_OFFICER_PATTERN_CANDIDATE_SELECTION','METAL_WATER_CLIMATE_EXCEPTION',
 'BODY_STRENGTH','HURTING_OFFICER_RELATIVE_STRENGTH','SEAL_ROOTEDNESS',
 'WEALTH_COMBINATION_EFFECT','KILL_COMBINATION_EFFECT','RESCUE_PRECEDENCE'
] as const);
export const R026_AUTHORITY=Object.freeze({
 status:'research' as const,propositionFamiliesVerified:true,
 metalWaterExceptionPreserved:true,executableHurtingOfficerResolverAuthorized:false,
 establishmentBooleanAuthorized:false,productionAuthorityPromoted:false,
});
