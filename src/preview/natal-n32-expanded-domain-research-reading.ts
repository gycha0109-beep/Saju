import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildNatalN31FourDomainClaimReadings,
  type NatalN31Domain,
  type NatalN31DomainClaim,
} from './natal-n31-four-domain-claim-readings.js';

export const NATAL_N32_EXPANDED_DOMAIN_RESEARCH_VERSION =
  'saju-n32-original-research-domain-reading-completeness-v1' as const;

const DOMAINS=['career','wealth','business','relationship'] as const;

export interface NatalN32DomainDetail {
  domain:NatalN31Domain;
  initialVerifiedCount:number;
  /** Original N31 source-qualified research text beyond three first-screen claims. */
  additionalVerifiedClaims:readonly NatalN31DomainClaim[];
  totalQualifiedOriginalCount:number;
  originalQualifiedLeftUnread:0;
  heldConflictingClaimCount:number;
}
function requireValid(value:unknown,reason:string):asserts value {
  if(!value)throw new TypeError('N32 expanded research-only source reading: '+reason);
}

/**
 * Expand N31's original source-qualified, chart-specific T8 readings INSIDE
 * their original domain cards. Does not create new research/Official semantics
 * or promote contested, HOLD or cross-domain claims into consumer authority.
 */
export function buildNatalN32ExpandedDomainResearchReading(
  snapshot:CanonicalSajuSnapshot,
  interpretation:InterpretationExecutionResult,
  registry:ResolvedRuleRegistrySnapshot,
) {
  const firstScreen=buildNatalN31FourDomainClaimReadings(snapshot,interpretation,registry);
  requireValid(firstScreen.sections.length===4 &&
    firstScreen.lifecycle==='internal_research_preview_only' &&
    !firstScreen.mayPublish&&!firstScreen.maySell&&!firstScreen.usefulComplete &&
    firstScreen.originalResearchRuleAndCopyVerified &&
    firstScreen.snapshotId===snapshot.snapshotId &&
    firstScreen.calculationHash===snapshot.calculationHash,
    'not verified same-person N31 source scope');
  const seen=new Set<string>();
  const sections:NatalN32DomainDetail[]=firstScreen.sections.map((section,i)=>{
    requireValid(section.domain===DOMAINS[i] &&
      section.visibleClaims.length<=3 &&
      section.visibleClaims.length+section.additionalVerifiedClaims.length===
        section.eligibleClaimCount &&
      section.additionalVerifiedClaims.length===section.hiddenByLimitCount,
      'N31 original top-three and full source counts differ');
    for(const claim of [...section.visibleClaims,...section.additionalVerifiedClaims]){
      requireValid(!seen.has(claim.claimId)&&
        claim.claimType.toLowerCase().startsWith(section.domain+'_natal_') &&
        claim.sourceIds.length>0&&claim.claimRuleId.length>0&&
        claim.calculatedPositions.length>0&&
        claim.headline.trim().length>0&&claim.summary.trim().length>0&&
        claim.researchOnly===true&&claim.predictsOutcome===false,
        'repeated, unsupported or cross-domain original research claim');
      seen.add(claim.claimId);
    }
    return {
      domain:section.domain,
      initialVerifiedCount:section.visibleClaims.length,
      additionalVerifiedClaims:section.additionalVerifiedClaims,
      totalQualifiedOriginalCount:section.eligibleClaimCount,
      originalQualifiedLeftUnread:0,
      heldConflictingClaimCount:section.heldConflictingClaimCount,
    };
  });
  return {
    version:NATAL_N32_EXPANDED_DOMAIN_RESEARCH_VERSION,
    lifecycle:'internal_research_preview_only' as const,
    snapshotId:snapshot.snapshotId,calculationHash:snapshot.calculationHash,
    firstScreen,
    sections,
    initialClaimCount:sections.reduce((n,s)=>n+s.initialVerifiedCount,0),
    expandedOriginalClaimCount:sections.reduce((n,s)=>n+s.additionalVerifiedClaims.length,0),
    allQualifiedOriginalClaimCount:sections.reduce((n,s)=>n+s.totalQualifiedOriginalCount,0),
    originalQualifiedLeftUnread:0 as const,
    originalResearchFingerprint:deterministicContentHash(sections.map(s=>({
      domain:s.domain,
      originalTypes:[
        ...firstScreen.sections.find(x=>x.domain===s.domain)!.visibleClaims,
        ...s.additionalVerifiedClaims,
      ].map(c=>({claimType:c.claimType,text:c.summary,positions:c.calculatedPositions,
        rule:c.claimRuleId,source:c.sourceIds})),
    }))),
    researchOnly:true as const,createsNewMeaning:false as const,
    mayPublish:false as const,maySell:false as const,usefulComplete:false as const,
  };
}
