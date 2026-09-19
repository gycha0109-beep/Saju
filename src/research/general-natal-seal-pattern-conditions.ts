export const R024_SEAL_PATTERN_VERSION = '0.1.0-research' as const;

export type R024ConditionRole = 'SUCCESS' | 'FAILURE' | 'CONTAMINATION';

export interface R024SealPatternProposition {
  id: string;
  role: R024ConditionRole;
  sourcePhrase: string;
  operands: readonly string[];
  executable: false;
}

export const R024_SEAL_PATTERN_PROPOSITIONS: readonly R024SealPatternProposition[] = Object.freeze([
  { id:'light-seal-meets-kill', role:'SUCCESS', sourcePhrase:'印輕逢煞', operands:['印輕','煞'], executable:false },
  { id:'officer-and-seal-complete', role:'SUCCESS', sourcePhrase:'官印雙全', operands:['官','印'], executable:false },
  { id:'strong-body-strong-seal-output-leakage', role:'SUCCESS', sourcePhrase:'身印兩旺而用食傷洩氣', operands:['身旺','印旺','食傷','洩氣'], executable:false },
  { id:'many-seals-wealth-exposed-light-root', role:'SUCCESS', sourcePhrase:'印多逢財而財透根輕', operands:['印多','財','財透','根輕'], executable:false },
  { id:'light-seal-meets-wealth', role:'FAILURE', sourcePhrase:'印輕逢財', operands:['印輕','財'], executable:false },
  { id:'strong-body-heavy-seal-exposes-kill', role:'FAILURE', sourcePhrase:'身強印重而透煞', operands:['身強','印重','透煞'], executable:false },
  { id:'seal-output-leakage-then-wealth-exposed', role:'CONTAMINATION', sourcePhrase:'印透食以洩氣，而又遇財露', operands:['印','透食','洩氣','財露'], executable:false },
  { id:'kill-generates-seal-then-wealth-breaks-seal', role:'CONTAMINATION', sourcePhrase:'透煞以生印，而又透財，以去印存煞', operands:['透煞','生印','透財','去印存煞'], executable:false },
]);

export const R024_EXECUTION_GAPS = Object.freeze([
  'SEAL_PATTERN_CANDIDATE_SELECTION',
  'SEAL_RELATIVE_LIGHTNESS_HEAVINESS',
  'BODY_STRENGTH',
  'WEALTH_ROOT_DEPTH',
  'OUTPUT_LEAKAGE_EFFECT',
  'WEALTH_BREAKS_SEAL_EFFECT',
  'RESCUE_PRECEDENCE',
] as const);

export const R024_AUTHORITY = Object.freeze({
  status:'research' as const,
  propositionFamiliesVerified:true,
  executableSealPatternResolverAuthorized:false,
  establishmentBooleanAuthorized:false,
  productionAuthorityPromoted:false,
});
