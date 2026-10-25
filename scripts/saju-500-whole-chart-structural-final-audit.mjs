import process from 'node:process';
import { writeFileSync } from 'node:fs';
import { buildWholeChartStructuralResearchResult } from '../dist/preview/whole-chart-structural-research-runtime.js';

const REFERENCE='2026-10-25T00:00:00.000Z';
const DOMAINS=['general','career','wealth','business','relationship'];
let seed=0x5a1a2026;
function rand(){ seed ^=seed<<13; seed ^=seed>>>17; seed ^=seed<<5; return (seed>>>0)/4294967296; }
function number(a,b){return a+Math.floor(rand()*(b-a+1));}
function pad(x){return String(x).padStart(2,'0');}
const sampled=new Set();
function nextBirth(){
  for(;;){
    const y=number(1950,2005),m=number(1,12);
    const d=number(1,new Date(Date.UTC(y,m,0)).getUTCDate());
    const hour=number(0,23),minute=number(0,59);
    const stamp=y+'-'+pad(m)+'-'+pad(d)+' '+pad(hour)+':'+pad(minute);
    if(sampled.has(stamp))continue;
    sampled.add(stamp);
    return {stamp,birth:{calendarType:'solar',date:{year:y,month:m,day:d},
      time:{known:true,hour,minute},
      sexForTraditionalCalculation:rand()<.5?'male':'female'}};
  }
}
const metric={
  executed:0,errors:[],sameChartHashFailures:0,structuralT8Count:0,
  sourceBoundT8Births:0,rootCandidateBirths:0,
  familyChannelMeaningProfiles:new Set(),rootContextMeaningProfiles:new Set(),
  domainContextBirths:Object.fromEntries(DOMAINS.map(x=>[x,0])),
  domainContextLinks:Object.fromEntries(DOMAINS.map(x=>[x,0])),
  annualLinks:0,monthlyLinks:0,yearlyConnectedBirths:0,monthlyConnectedBirths:0,
  dayunStillUninterpretedBirths:0,withoutAnyNewSourceBoundContext:0,
  provenanceErrors:0,maySellOrOfficialViolations:0,
};
const examples=[],now=Date.now();
for(let i=0;i<500;i++){
  const {stamp,birth}=nextBirth();
  try{
    const result=buildWholeChartStructuralResearchResult(birth,{
      requestId:'whole-chart-500-final-'+i,
      targetYear:2026,targetMonth:10,referenceDateTime:REFERENCE,
    });
    metric.executed++;
    const s=result.natal.structural;
    if(!result.researchOnly||result.maySell||result.mayCallOfficial||
      !s.researchOnly||s.maySell||result.temporal.maySell)metric.maySellOrOfficialViolations++;
    if(result.calculationHash!==result.natal.calculationHash ||
        result.calculationHash!==result.temporal.calculationHash ||
        result.snapshotId!==result.natal.snapshotId ||
        result.snapshotId!==result.temporal.snapshotId)metric.sameChartHashFailures++;
    if(s.sections.length)metric.sourceBoundT8Births++;
    else metric.withoutAnyNewSourceBoundContext++;
    metric.structuralT8Count+=s.sections.length;
    if(s.sections.some(x=>x.intrinsicRootCandidates.length>0))metric.rootCandidateBirths++;
    for(const x of s.sections){
      if(!x.claimId||!x.ruleId||!x.methodologyId||!x.sourceIds.length||
        x.upstreamClaimIds.length<3||!x.observedFactPaths.length||
        x.interpretedOutcomes!==false)metric.provenanceErrors++;
      metric.familyChannelMeaningProfiles.add(x.family+':'+x.channel+':'+x.context+':'+x.monthRelation);
      metric.rootContextMeaningProfiles.add(JSON.stringify([x.family,x.channel,x.context,
        x.monthRelation,x.intrinsicRootCandidates.map(y=>[y.position,y.rootClass])]));
    }
    for(const domain of DOMAINS){
      const links=result.natal.domainSharedContexts[domain];
      if(links.length)metric.domainContextBirths[domain]++;
      metric.domainContextLinks[domain]+=links.length;
      for(const x of links){
        if(!x.domainT8ClaimId||!x.sharedStructuralT8ClaimId||!x.domainT8SourceIds.length||
          !x.sharedStructuralT8SourceIds.length||x.authorizesDomainOutcome!==false)
            metric.provenanceErrors++;
      }
    }
    metric.annualLinks+=result.annualLinks.length;
    metric.monthlyLinks+=result.monthlyLinks.length;
    if(result.annualLinks.length)metric.yearlyConnectedBirths++;
    if(result.monthlyLinks.length)metric.monthlyConnectedBirths++;
    if(result.dayunStructuralReference.dayunOutcomeAuthorized===false &&
      result.dayunStructuralReference.state===
        'computed_period_with_independent_natal_context_not_interpreted')
        metric.dayunStillUninterpretedBirths++;
    for(const x of [...result.annualLinks,...result.monthlyLinks]){
      if(!x.temporalT9ClaimId||!x.sharedNatalStructuralT8ClaimId||
        !x.temporalT9SourceIds.length||!x.sharedNatalStructuralSourceIds.length||
        x.outcomeAuthorized!==false)metric.provenanceErrors++;
    }
    if(examples.length<5)examples.push({birth:stamp,hash:result.calculationHash,
      T8:s.sections.length,rootCandidates:s.sections.filter(x=>x.intrinsicRootCandidates.length).length,
      general:result.natal.domainSharedContexts.general.length,
      wealth:result.natal.domainSharedContexts.wealth.length,
      annual:result.annualLinks.length,monthly:result.monthlyLinks.length});
  }catch(error){
    metric.errors.push({birth:stamp,error:String(error?.stack??error).slice(0,850)});
  }
  if((i+1)%100===0)process.stdout.write('SAJU_STRUCTURAL_FINAL_PROGRESS '+(i+1)+'/500\n');
}
const errors=[
  ...(metric.executed!==500?['Not all 500 exact charts executed']:[]),
  ...(metric.errors.length?['Execution exceptions in '+metric.errors.length+' of 500 cases']:[]),
  ...(metric.sameChartHashFailures?['Mixed canonical snapshots']:[]),
  ...(metric.provenanceErrors?['Invalid Claim/Rule/Source chain']:[]),
  ...(metric.maySellOrOfficialViolations?['Research was promoted to Product']:[]),
  ...(metric.dayunStillUninterpretedBirths!==500?['Unlicensed dayun interpretation emitted']:[]),
  ...(metric.sourceBoundT8Births===0?['No structural T8 was consumed']:[]),
  ...(metric.monthlyConnectedBirths===0?['No temporal/natal structural source correspondence']:[]),
];
const status=errors.length?'FAIL':'IMPLEMENTATION_EXECUTABLE_WITH_EXPLICIT_SEMANTIC_GAPS';
const report={
  version:'saju-500-whole-chart-structural-integration-final-2026-10-26',
  status,seed:'0x5a1a2026',reference:REFERENCE,attempted:500,
  elapsedMs:Date.now()-now,
  result:{...metric,
    familyChannelMeaningProfiles:metric.familyChannelMeaningProfiles.size,
    rootContextMeaningProfiles:metric.rootContextMeaningProfiles.size},
  examples,errors,
  remainingSemanticBlockers:[
    'R011/R121/R150 prevent global negative root and unconstrained Tonggen settlement.',
    'Strength, Gyeokguk, Tiaohou, Yongshin source conditions do not authorize universal final chart judgments.',
    'Season/root contextual T8 and five domain T8 are linked by actual same-chart observed family but are not a new causal domain verdict.',
    'R072 Dayun interaction classes are explicitly non-executable; only computed periods and independent natal context exist.',
    'Annual/monthly exact selected T9 themes and T8 contexts are linked by observed family; no event/polarity is inferred.',
    'No Production/Official/Sell/Publish promotion is granted.',
  ],
};
const output=process.argv[2];
if(output)writeFileSync(output,JSON.stringify(report,null,2)+'\n');
process.stdout.write('SAJU_STRUCTURAL_FINAL '+JSON.stringify({
 status,attempted:500,errors:errors.length,failedCases:metric.errors.length,
 T8Births:metric.sourceBoundT8Births,T8Count:metric.structuralT8Count,
 rootBirths:metric.rootCandidateBirths,yearly:metric.yearlyConnectedBirths,
 monthly:metric.monthlyConnectedBirths,
 familyProfiles:metric.familyChannelMeaningProfiles.size,
 rootProfiles:metric.rootContextMeaningProfiles.size,
})+'\n');
if(errors.length)process.exitCode=1;
