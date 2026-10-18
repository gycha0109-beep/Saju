import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { RuleDefinition } from '../contracts/interpretation.js';
import type { ClaimNarrativeProfile } from '../contracts/narrative.js';
import { CAREER_NATAL_READING_RULES } from '../research/career-natal-reading-candidate.js';
import { WEALTH_NATAL_READING_RULES } from '../research/wealth-natal-reading-candidate.js';
import { BUSINESS_NATAL_READING_RULES } from '../research/business-natal-reading-candidate.js';
import { RELATIONSHIP_NATAL_READING_RULES } from '../research/relationship-natal-reading-candidate.js';
import { CAREER_NATAL_CLAIM_NARRATIVE_PROFILES } from '../research/career-natal-narrative-profiles.js';
import { WEALTH_NATAL_CLAIM_NARRATIVE_PROFILES } from '../research/wealth-natal-narrative-profiles.js';
import { BUSINESS_NATAL_CLAIM_NARRATIVE_PROFILES } from '../research/business-natal-narrative-profiles.js';
import { RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES } from '../research/relationship-natal-narrative-profiles.js';

export const NATAL_N31A_RECEIPTS_VERSION = 'saju-n31a-four-domain-research-receipts-v1' as const;
export type NatalN31aDomain = 'career' | 'wealth' | 'business' | 'relationship';
const definitions: readonly { domain:NatalN31aDomain; rules:readonly RuleDefinition[];
  profiles:readonly ClaimNarrativeProfile[] }[] = [
  {domain:'career',rules:CAREER_NATAL_READING_RULES,profiles:CAREER_NATAL_CLAIM_NARRATIVE_PROFILES},
  {domain:'wealth',rules:WEALTH_NATAL_READING_RULES,profiles:WEALTH_NATAL_CLAIM_NARRATIVE_PROFILES},
  {domain:'business',rules:BUSINESS_NATAL_READING_RULES,profiles:BUSINESS_NATAL_CLAIM_NARRATIVE_PROFILES},
  {domain:'relationship',rules:RELATIONSHIP_NATAL_READING_RULES,profiles:RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES},
];
export interface NatalN31aReceipt {
  domain:NatalN31aDomain; claimId:string; claimType:string; ruleId:string;
  sourceIds:readonly string[]; factRefs:readonly string[];
  headline:string; summary:string; researchOnly:true;
}
export function auditNatalN31aFourDomainReceipts(
  snapshot:CanonicalSajuSnapshot,
  results:Readonly<Partial<Record<NatalN31aDomain,InterpretationExecutionResult>>>,
) {
  const receipts:NatalN31aReceipt[]=[];
  const hold:{domain:NatalN31aDomain;claimType:string;reason:string}[]=[];
  for(const definition of definitions) {
    const result=results[definition.domain];
    if(!result || result.run.snapshotId!==snapshot.snapshotId || !result.integrity.valid) {
      hold.push({domain:definition.domain,claimType:'*',reason:'missing valid same-snapshot execution'});
      continue;
    }
    for(const claim of result.claims) {
      if(claim.state!=='active' || claim.taxonomy.tier!=='T8' ||
        claim.taxonomy.category!==definition.domain ||
        !definition.rules.some(rule=>rule.output.claimType===claim.claimType)) continue;
      let reason='';
      const ref=claim.ruleRefs.length===1 ? claim.ruleRefs[0] : undefined;
      const rule=ref===undefined ? undefined : definition.rules.find(r=>
        r.ruleId===ref.ruleId && r.version===ref.version &&
        r.output.claimType===claim.claimType && r.taxonomy.category===definition.domain);
      if(claim.snapshotId!==snapshot.snapshotId || claim.scenarioRef!==undefined)
        reason='snapshot or unresolved scenario mismatch';
      else if(!rule || rule.status!=='research' ||
        claim.methodologyRef.id!==rule.methodologyRef.id ||
        claim.methodologyRef.version!==rule.methodologyRef.version)
        reason='rule or methodology mismatch';
      else if(claim.factRefs.length===0 || claim.sourceRefs.length===0 ||
        rule.sourceRefs.length===0 ||
        !rule.sourceRefs.every(x=>claim.sourceRefs.includes(x.sourceId)))
        reason='missing Rule/Claim source or calculated fact receipt';
      const profile=definition.profiles.find(p=>p.claimType===claim.claimType &&
        p.requiredMethodAttribution && p.allowedEpistemicTypes.includes('interpretation'));
      const headline=profile?.templates?.find(t=>t.language==='ko'&&t.templateKey==='headline')?.text;
      const summary=profile?.templates?.find(t=>t.language==='ko'&&t.templateKey==='summary')?.text;
      if(!reason && (!headline || !summary || profile?.prohibitedPhrases?.some(x=>
        headline.includes(x)||summary.includes(x))))
        reason='missing or forbidden Korean narrative profile';
      if(reason || !rule || !headline || !summary) {
        hold.push({domain:definition.domain,claimType:claim.claimType,reason:reason || 'invalid receipt'});
        continue;
      }
      receipts.push({domain:definition.domain,claimId:claim.claimId,claimType:claim.claimType,
        ruleId:rule.ruleId,sourceIds:[...claim.sourceRefs],factRefs:[...claim.factRefs],
        headline,summary,researchOnly:true});
    }
  }
  if(new Set(receipts.map(x=>x.claimId)).size!==receipts.length)
    throw new TypeError('N31a duplicate Claim receipt');
  return {version:NATAL_N31A_RECEIPTS_VERSION,lifecycle:'internal_research_only' as const,
    snapshotId:snapshot.snapshotId,receipts,hold,
    mayPublish:false as const,maySell:false as const,
    createsNewInterpretation:false as const,usefulComplete:false as const};
}
