import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { NatalN31Domain, NatalN31DomainClaim } from './natal-n31-four-domain-claim-readings.js';
import type { buildNatalN32ExpandedDomainResearchReading } from './natal-n32-expanded-domain-research-reading.js';

export const NATAL_N34_FOUR_DOMAIN_COPY_CONTRAST_VERSION =
  'saju-n34-four-domain-original-copy-vs-basis-vs-position-contrast-v1' as const;

const DOMAINS = ['career', 'wealth', 'business', 'relationship'] as const satisfies readonly NatalN31Domain[];

type VerifiedResearchReading = ReturnType<typeof buildNatalN32ExpandedDomainResearchReading>;
export interface NatalN34Case {
  caseId: string;
  reading: VerifiedResearchReading;
}
export interface NatalN34Pair {
  left: string;
  right: string;
}
export type NatalN34Difference =
  | 'insufficient_research_evidence'
  | 'coverage_changed'
  | 'original_korean_copy_changed'
  | 'same_copy_different_claim_basis'
  | 'same_copy_different_positions'
  | 'unchanged';

function requireValid(condition: unknown, reason: string): asserts condition {
  if (!condition) throw new TypeError('N34 original-copy comparison: ' + reason);
}

function copyMaterial(claims: readonly NatalN31DomainClaim[]) {
  return claims.map(claim => [claim.headline, claim.summary]).sort((a,b) =>
    JSON.stringify(a).localeCompare(JSON.stringify(b)));
}
function basisMaterial(claims: readonly NatalN31DomainClaim[]) {
  return claims.map(claim => ({
    claimType: claim.claimType, rule: claim.claimRuleId,
    ruleVersion: claim.claimRuleVersion, methodology: claim.methodologyId,
    methodologyVersion: claim.methodologyVersion,
    profileVersion: claim.profileVersion, sourceIds: [...claim.sourceIds].sort(),
  })).sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}
function positionMaterial(claims: readonly NatalN31DomainClaim[]) {
  return claims.map(claim => ({
    claimType: claim.claimType, rule: claim.claimRuleId,
    positions: claim.calculatedPositions, paths: claim.calculatedFactPaths,
  })).sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}

interface DomainMaterial {
  domain: NatalN31Domain;
  count: number;
  copyHash: string;
  basisHash: string;
  positionHash: string;
}

function verifyReading(input: NatalN34Case) {
  const reading=input.reading;
  const first=reading.firstScreen;
  requireValid(input.caseId.trim().length > 0 && reading.researchOnly &&
    reading.createsNewMeaning === false && reading.mayPublish === false &&
    reading.maySell === false && reading.usefulComplete === false &&
    first.snapshotId === reading.snapshotId &&
    first.calculationHash === reading.calculationHash &&
    reading.originalQualifiedLeftUnread === 0 &&
    first.sections.length === 4 && reading.sections.length === 4,
    'input is not a complete internal research-only source-qualified reading');

  const allMaterial: {domain:NatalN31Domain; originalTypes: unknown[]}[]=[];
  const material: DomainMaterial[]=[];
  for(const domain of DOMAINS) {
    const section=first.sections.find(item=>item.domain===domain);
    const details=reading.sections.find(item=>item.domain===domain);
    requireValid(section!==undefined && details!==undefined &&
      section.visibleClaims.length<=3 &&
      section.visibleClaims.length+section.additionalVerifiedClaims.length===
        section.eligibleClaimCount &&
      details.initialVerifiedCount===section.visibleClaims.length &&
      details.totalQualifiedOriginalCount===section.eligibleClaimCount &&
      details.additionalVerifiedClaims.length===section.additionalVerifiedClaims.length,
      'missing, extra, or miscounted domain research copy: '+domain);
    const claims=[...section.visibleClaims,...details.additionalVerifiedClaims];
    requireValid(claims.every(claim=>claim.researchOnly && !claim.predictsOutcome &&
      claim.claimType.startsWith(domain.toUpperCase()+'_NATAL_') &&
      claim.calculatedPositions.length===claim.calculatedFactPaths.length &&
      claim.sourceIds.length>0 && claim.summary.length>0),
      'nonqualified domain source copy: '+domain);
    allMaterial.push({domain,originalTypes:claims.map(c=>({
      claimType:c.claimType,text:c.summary,positions:c.calculatedPositions,
      rule:c.claimRuleId,ruleVersion:c.claimRuleVersion,
      methodologyVersion:c.methodologyVersion,
      profileVersion:c.profileVersion,factPaths:c.calculatedFactPaths,
      source:c.sourceIds,
    }))});
    material.push({
      domain, count:claims.length,
      copyHash:deterministicContentHash(copyMaterial(claims)),
      basisHash:deterministicContentHash(basisMaterial(claims)),
      positionHash:deterministicContentHash(positionMaterial(claims)),
    });
  }
  requireValid(deterministicContentHash(allMaterial)===reading.originalResearchFingerprint,
    'original source-qualified text/receipt fingerprint changed after verification');
  return {caseId:input.caseId,snapshotId:reading.snapshotId,
    chartHash:reading.calculationHash, domains:material};
}

/** Differences of original Korean text are distinct from Claim-basis or factual-position differences.
 * This classifies already-existing RESEARCH copy, never authorizes semantic truth or outcomes.
 */
export function classifyNatalN34CopyDifference(
  left: DomainMaterial, right: DomainMaterial,
): NatalN34Difference {
  requireValid(left.domain===right.domain, 'cannot compare different domains');
  if(left.count===0 && right.count===0) return 'insufficient_research_evidence';
  if(left.count===0 || right.count===0) return 'coverage_changed';
  if(left.copyHash!==right.copyHash) return 'original_korean_copy_changed';
  if(left.basisHash!==right.basisHash) return 'same_copy_different_claim_basis';
  if(left.positionHash!==right.positionHash) return 'same_copy_different_positions';
  return 'unchanged';
}

/** Pairs originate in an independent real-HTTP chart-pair audit (N10).
 * Repeated charts must not masquerade as differently personalized interpretations.
 */
export function auditNatalN34FourDomainCopyContrasts(
  inputs: readonly NatalN34Case[],
  pairs: readonly NatalN34Pair[],
) {
  const cases=inputs.map(verifyReading);
  const index=new Map(cases.map(entry=>[entry.caseId,entry]));
  requireValid(index.size===cases.length, 'duplicate case identifiers');
  const compared=pairs.map(pair=>{
    requireValid(pair.left!==pair.right, 'self-comparison cannot validate personalization');
    const left=index.get(pair.left),right=index.get(pair.right);
    requireValid(left!==undefined&&right!==undefined,
      'pair references a case without original chart and research evidence');
    const sameChart=left.chartHash===right.chartHash;
    const domains=DOMAINS.map(domain=>{
      const l=left.domains.find(x=>x.domain===domain);
      const r=right.domains.find(x=>x.domain===domain);
      requireValid(l!==undefined && r!==undefined, 'domain missing from pair');
      const difference=classifyNatalN34CopyDifference(l,r);
      requireValid(!sameChart ||
        difference==='unchanged' || difference==='insufficient_research_evidence',
        'same Canonical chart falsely diversified original copy, basis, or position');
      return {domain,difference,leftClaimCount:l.count,rightClaimCount:r.count};
    });
    return {left:pair.left,right:pair.right,sameChart,domains};
  });
  const all=compared.flatMap(x=>x.domains.map(d=>d.difference));
  const counts=Object.fromEntries(([
    'insufficient_research_evidence','coverage_changed','original_korean_copy_changed',
    'same_copy_different_claim_basis','same_copy_different_positions','unchanged',
  ] as const).map(kind=>[kind,all.filter(x=>x===kind).length])) as
    Record<NatalN34Difference,number>;
  return {
    version:NATAL_N34_FOUR_DOMAIN_COPY_CONTRAST_VERSION,
    lifecycle:'internal_research_quality_audit' as const,
    researchOnly:true as const, mayPublish:false as const,maySell:false as const,
    usefulComplete:false as const,independentHumanMeaningValidated:false as const,
    actualCaseCount:cases.length,pairCount:compared.length,
    distinctChartPairCount:compared.filter(p=>!p.sameChart).length,
    sameChartControlPairCount:compared.filter(p=>p.sameChart).length,
    counts, pairs:compared,
    limitations:[
      'A changed Korean excerpt is a different existing research profile selection, not proof of a true human trait or outcome.',
      'Claim-basis changes and factual pillar-position changes are separately counted; neither is new semantic meaning.',
      'Unknown-hour and missing research claims do not become invented readings.',
      'Original Product/Official text, source/methodology authority, Production and Commerce remain unchanged.',
    ],
  };
}
