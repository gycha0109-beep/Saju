import process from 'node:process';
import { writeFileSync } from 'node:fs';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../dist/production/production-calculation-runtime.js';
import { buildSharedNatalSourceBoundedRelationGraph } from '../dist/research/shared-natal-source-bounded-relation-graph.js';

const NOW=new Date('2026-10-25T00:00:00.000Z');
let seed=0x5a1a2026;
function rand(){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return(seed>>>0)/4294967296;}
function n(a,b){return a+Math.floor(rand()*(b-a+1));}
function pad(x){return String(x).padStart(2,'0');}
const sampled=new Set();
function nextBirth(){
  for(;;){
    const y=n(1950,2005),m=n(1,12),d=n(1,new Date(Date.UTC(y,m,0)).getUTCDate());
    const hour=n(0,23),minute=n(0,59);
    const stamp=y+'-'+pad(m)+'-'+pad(d)+' '+pad(hour)+':'+pad(minute);
    if(sampled.has(stamp))continue;
    sampled.add(stamp);
    return {stamp,birth:{calendarType:'solar',date:{year:y,month:m,day:d},
      time:{known:true,hour,minute},
      sexForTraditionalCalculation:rand()<.5?'male':'female'}};
  }
}
const stats={attempted:500,passed:0,errors:[],n13ClaimCount:0,individualRelations:0,
  linkedRelations:0,mixedRelations:0,withN13:0,withLinked:0,withMixed:0,
  withOverlappingSharedContexts:0,totalContextOverlaps:0,unauthorizedOutputs:0,
  sourceOrFactPathFailures:0,relationIds:{}};
const samples=[],start=Date.now();
for(let i=0;i<500;i++){
  const {stamp,birth}=nextBirth();
  try{
    const {snapshot}=calculateAuthorizedMyeonghwaProductionSnapshot(birth,{now:NOW});
    const graph=buildSharedNatalSourceBoundedRelationGraph(snapshot,{
      requestId:'n13-source-bound-500-'+i,now:NOW,
    });
    if(graph.snapshotId!==snapshot.snapshotId ||
      graph.calculationHash!==snapshot.calculationHash ||
      !graph.researchOnly ||graph.maySell||graph.mayPublish ||
      graph.mayCallOfficial||graph.mayProjectToPreview ||
      graph.relationGuide.mayAddProductInterpretation)stats.unauthorizedOutputs++;
    const guide=graph.relationGuide;
    if(guide.individualRelations.length)stats.withN13++;
    if(guide.linkedRelations.length)stats.withLinked++;
    if(guide.mixedRelations.length)stats.withMixed++;
    stats.n13ClaimCount+=graph.actualN13T8ClaimIds.length;
    stats.individualRelations+=guide.individualRelations.length;
    stats.linkedRelations+=guide.linkedRelations.length;
    stats.mixedRelations+=guide.mixedRelations.length;
    if(graph.contextWitnesses.some(w=>w.overlappingSharedT8.length>0))
      stats.withOverlappingSharedContexts++;
    for(const witness of graph.contextWitnesses){
      const len=witness.overlappingSharedT8.length;
      stats.totalContextOverlaps+=len;
      stats.relationIds[witness.identity]=(stats.relationIds[witness.identity]??0)+1;
      if(!witness.sourceIds.length||!witness.observedFactPaths.length||
        !witness.sourceClaimIds.length||witness.newInterpretationAuthorized!==false||
        witness.consumerProjectionAuthorized!==false)stats.sourceOrFactPathFailures++;
      const observed=new Set(witness.observedFactPaths);
      for(const linked of witness.overlappingSharedT8){
        if(!linked.sharedT8ClaimId||!linked.sharedT8RuleId||
          !linked.observedFactPaths.length||
          linked.observedFactPaths.some(p=>!observed.has(p)))
          stats.sourceOrFactPathFailures++;
      }
    }
    if(graph.actualN13T8ClaimIds.length!==guide.individualRelations.length)
      stats.sourceOrFactPathFailures++;
    stats.passed++;
    if(samples.length<8)samples.push({stamp,n13:graph.actualN13T8ClaimIds.length,
      linked:guide.linkedRelations.length,mixed:guide.mixedRelations.length,
      overlaps:graph.contextWitnesses.reduce((v,w)=>v+w.overlappingSharedT8.length,0)});
  }catch(err){stats.errors.push({stamp,error:String(err?.stack??err).slice(0,950)});}
  if((i+1)%100===0)process.stdout.write('N13_GRAPH '+(i+1)+'/500\n');
}
const blockers=[
  ...(stats.passed!==500?['Not all 500 source-bound charts executed']:[]),
  ...(stats.unauthorizedOutputs?['Unauthorized research authority promotion']:[]),
  ...(stats.sourceOrFactPathFailures?['Relation graph failed source/Claim/fact overlap checks']:[]),
  ...(stats.n13ClaimCount===0?['No real N13 T8 was matched']:[]),
  ...(stats.totalContextOverlaps===0?['No exact same-calculation-context evidence overlap was consumed']:[]),
];
const report={version:'saju-500-n13-n14-n20-n22-shared-research-graph-2026-10-26',
  status:blockers.length?'FAIL':'SOURCE_BOUNDED_RESEARCH_ONLY',
  seed:'0x5a1a2026',reference:NOW.toISOString(),elapsedMs:Date.now()-start,
  stats,samples,blockers,
  nonAuthorizations:['No Preview, Product, Commerce, Official or Publish authority',
    'N13 generates five source-bounded relation kinds only when actual T5 endpoints match',
    'N14/N20 are research co-presence; neither creates a new life-outcome claim',
    'Same-fact-path overlap is provenance linkage, never causation or strength evaluation'],
};
if(process.argv[2])writeFileSync(process.argv[2],JSON.stringify(report,null,2)+'\n');
process.stdout.write('N13_GRAPH_FINAL '+JSON.stringify({
  status:report.status,passed:stats.passed,errors:stats.errors.length,
  sourceT8:stats.n13ClaimCount,linked:stats.linkedRelations,
  mixed:stats.mixedRelations,overlaps:stats.totalContextOverlaps,
  invalid:stats.sourceOrFactPathFailures,authority:stats.unauthorizedOutputs,
})+'\n');
if(blockers.length)process.exitCode=1;
