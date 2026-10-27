import { createHash } from 'node:crypto';
import process from 'node:process';
import { readFileSync, writeFileSync } from 'node:fs';

const [auditPath, outputPath] = process.argv.slice(2);
if(!auditPath||!outputPath) {
  throw new Error('Usage: node scripts/saju-500-conditional-evidence-audit.mjs case-results.json out.json');
}
const input=JSON.parse(readFileSync(auditPath,'utf8'));
if(input.seed!=='0x5a1a2026'||input.count!==500||input.failedCases!==0) {
  throw new Error('Exact fixed 500 case audit required');
}
const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const menus=['올해','이번 달'];
const findings={};
for(const menu of menus){
  const rows=input.caseResults?.[menu];
  if(!Array.isArray(rows)||rows.length!==500)throw new Error(menu+' exact 500 case rows required');
  const seen=new Map();
  const patterns=new Set();
  const controlledPairs=[];
  let relationMatches=0;
  let daysWithUnavailable=0;
  let extraTimeSlices=0;
  let linkedT9=0;
  let observedAnnualDayunRelations=0;
  const t9RelationStates={};
  for(const row of rows){
    if(!row.compositionAuthority ||
        Object.values(row.compositionAuthority).length !== 4 ||
        !Object.values(row.compositionAuthority).every(v=>v===false)) {
      throw new Error(menu+' has missing or unauthorized conditional evidence permissions');
    }
    if(!Array.isArray(row.compositionEvidence)||row.compositionEvidence.length<2) {
      throw new Error(menu+' missing controlled temporal structural evidence');
    }
    if(row.compositionEvidence.some(slice=>!Array.isArray(slice.relations) ||
         slice.relations.some(rel=>!rel.sourceIds?.length||
            !['branch_clash','branch_six_combination'].includes(rel.kind)||
            !['natal','dayun','annual','monthly'].includes(rel.left?.layer)||
            !['natal','dayun','annual','monthly'].includes(rel.right?.layer)))) {
      throw new Error(menu+' has unsourced or non-structural relation');
    }
    if(menu==='이번 달') {
      const links=row.existingT9EvidenceLinks;
      if(!Array.isArray(links)||links.length!==row.compositionEvidence.length||
         links.some((link,i)=>{
           const slice=row.compositionEvidence[i];
           return link.segmentId!==slice.segmentId ||
             link.startsAt!==slice.startsAt || link.endsAtExclusive!==slice.endsAtExclusive ||
             link.newT9Claims!==0 ||
             (link.existingT9Link==='matched_source_owned_theme' &&
              (!link.existingT9ClaimId||!link.existingT9MethodologyId));
         }))throw new Error('Monthly T9 research links do not match exact source-owned intervals');
      for(const link of links) {
        linkedT9+=link.existingT9Link==='matched_source_owned_theme'?1:0;
        observedAnnualDayunRelations+=['branch_clash_observed',
          'branch_six_combination_observed'].includes(link.annualDayunRelation)?1:0;
        t9RelationStates[link.annualDayunRelation]=
          (t9RelationStates[link.annualDayunRelation]??0)+1;
      }
    }
    const first=row.compositionEvidence[0];
    const last=row.compositionEvidence.at(-1);
    if(first.segmentId!=='before_jeol'||last.segmentId!=='after_jeol'){
      throw new Error(menu+' Jeol segment order mismatch');
    }
    for(let i=1;i<row.compositionEvidence.length;i++){
      if(row.compositionEvidence[i-1].endsAtExclusive!==row.compositionEvidence[i].startsAt){
        throw new Error(menu+' conditional timeline has a gap/overlap');
      }
    }
    const normalized=row.compositionEvidence.map(slice=>({
      phase:slice.segmentId,
      dayunStatus:slice.dayunStatus,
      dayunBranch:slice.dayunBranch,
      missingNatal:slice.natalUnavailableSlots,
      // Period dates and chart hash are never counted as semantic differentiation.
      relations:slice.relations.map(rel=>[rel.kind,
        rel.left.layer,rel.left.pillar,rel.left.branch,
        rel.right.layer,rel.right.pillar,rel.right.branch,
      ]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b))),
    }));
    const pattern=digest(normalized);
    patterns.add(pattern);
    relationMatches+=row.compositionEvidence.reduce((n,s)=>n+s.relations.length,0);
    daysWithUnavailable+=row.compositionEvidence.some(s=>s.dayunStatus==='unavailable')?1:0;
    extraTimeSlices+=Math.max(0,row.compositionEvidence.length-2);
    const sameMeaning=seen.get(row.meaningSignature)??[];
    const contrast=sameMeaning.find(other=>other.pattern!==pattern);
    if(contrast && controlledPairs.length<50 && controlledPairs.every(
      pair=>pair.firstBirth!==contrast.row.birth&&pair.secondBirth!==row.birth)) {
      controlledPairs.push({
        sameMeaningSignature:row.meaningSignature,
        firstBirth:contrast.row.birth,
        secondBirth:row.birth,
        firstRelations:contrast.normalized,
        secondRelations:normalized,
        firstStructuralHash:contrast.pattern,
        secondStructuralHash:pattern,
        semanticConclusionDifferentiationEstablished:false,
      });
    }
    sameMeaning.push({pattern,normalized,row});
    seen.set(row.meaningSignature,sameMeaning);
  }
  findings[menu]={
    auditedCases:rows.length,
    distinctStructuralPatterns:patterns.size,
    totalObservedRelationMatches:relationMatches,
    casesWithUnavailableDayun:daysWithUnavailable,
    extraTimeSlices,
    ...(menu==='이번 달'?{
      existingT9ClaimLinks:linkedT9,
      observedAnnualDayunRelations,
      annualDayunRelationStates:t9RelationStates,
      newlyEmittedT9Claims:0,
    }:{}),
    sameCoarseMeaningDifferentStructuralEvidencePairs:controlledPairs,
    prognosticClaimsInferred:0,
    officialAuthorizationGranted:false,
  };
}
const report={
  scope:'Fixed 500 births / one civil year / one Jeol month / structural evidence only',
  seed:input.seed,cases:input.count,
  meaningsUnchangedByThisAudit:true,
  entries:findings,
  caution:'Different relational evidence is not a different validated horoscope or future prediction.',
  finalRoadmapAccepted:false,
};
writeFileSync(outputPath,JSON.stringify(report,null,2)+'\n','utf8');
process.stdout.write('SAJU_500_CONDITIONAL_EVIDENCE '+JSON.stringify(Object.fromEntries(
  menus.map(menu=>[menu,Object.fromEntries(Object.entries(findings[menu]).filter(
    ([key])=>key!=='sameCoarseMeaningDifferentStructuralEvidencePairs'
  ).concat([['controlledPairs',findings[menu].sameCoarseMeaningDifferentStructuralEvidencePairs.length]]))])
))+'\n');
