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
  hiddenChallengeSections:0,hiddenChallengeBirths:0,
  hiddenChallengeWithMultipleObservedPositions:0,
  hiddenSupportSections:0,hiddenSupportBirths:0,
  hiddenPeerSupportSections:0,hiddenResourceSupportSections:0,
  visibleContrastingSections:0,visibleContrastingBirths:0,
  visibleSupportSections:0,visibleChallengeSections:0,
  renderedSourceGroups:0,crossDomainEvidenceGroups:0,
  sourceBoundGeneralCoreBirths:0,generalCoreWithStructuralContextBirths:0,
  admittedGeneralCoreContextLinks:0,
  familyChannelMeaningProfiles:new Set(),rootContextMeaningProfiles:new Set(),
  domainContextBirths:Object.fromEntries(DOMAINS.map(x=>[x,0])),
  domainContextLinks:Object.fromEntries(DOMAINS.map(x=>[x,0])),
  annualLinks:0,monthlyLinks:0,yearlyConnectedBirths:0,monthlyConnectedBirths:0,
  temporalScopeViolations:0,
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
    const hidden = s.sections.filter(x=>x.context==='hidden_challenge');
    if(hidden.length)metric.hiddenChallengeBirths++;
    metric.hiddenChallengeSections+=hidden.length;
    const support=s.sections.filter(x=>x.context.startsWith('hidden_support_'));
    if(support.length)metric.hiddenSupportBirths++;
    metric.hiddenSupportSections+=support.length;
    const visible=s.sections.filter(x=>x.context==='visible_challenge'||
      x.context==='visible_support');
    if(visible.length)metric.visibleContrastingBirths++;
    metric.visibleContrastingSections+=visible.length;
    metric.visibleSupportSections+=visible.filter(x=>x.context==='visible_support').length;
    metric.visibleChallengeSections+=visible.filter(x=>x.context==='visible_challenge').length;
    metric.hiddenPeerSupportSections+=support.filter(x=>x.context==='hidden_support_peer').length;
    metric.hiddenResourceSupportSections+=support.filter(x=>x.context==='hidden_support_resource').length;
    if(hidden.some(x=>new Set(x.hiddenChallengeMembership.map(y=>y.position)).size>1))
      metric.hiddenChallengeWithMultipleObservedPositions++;
    for(const x of s.sections){
      if(!x.claimId||!x.ruleId||!x.methodologyId||!x.sourceIds.length||
        x.upstreamClaimIds.length<3||!x.observedFactPaths.length||
        x.interpretedOutcomes!==false)metric.provenanceErrors++;
      if(x.context==='hidden_challenge' &&
        (!['peer','resource'].includes(x.monthRelation) ||
        x.monthRelation!==x.family ||
        !x.hiddenChallengeMembership.length ||
        x.intrinsicRootCandidates.length ||
        x.hiddenChallengeEffect!=='not_determined' ||
        x.hiddenChallengeMembership.some(y=>
          !['output','wealth','officer'].includes(y.relation))))
        metric.provenanceErrors++;
      if(x.context.startsWith('hidden_support_') &&
        (!['output','wealth','officer'].includes(x.monthRelation) ||
          x.monthRelation!==x.family ||
          !x.hiddenSupportMembership.length ||
          x.hiddenChallengeMembership.length ||
          x.intrinsicRootCandidates.length ||
          x.hiddenSupportEffect!=='not_determined' ||
          x.hiddenSupportMembership.some(y=>
            y.kind!==(x.context==='hidden_support_peer' ?
              'hidden_peer_root':'hidden_resource_support'))))
        metric.provenanceErrors++;
      if(x.context.startsWith('visible_') &&
        (!x.visibleContrastMembership.length || x.monthRelation!==x.family ||
        x.hiddenChallengeMembership.length || x.hiddenSupportMembership.length ||
        x.intrinsicRootCandidates.length || x.visibleContrastEffect!=='not_determined' ||
        x.visibleContrastMembership.some(v=>
          !['year','month','hour'].includes(v.position) ||
          (x.context==='visible_challenge' ?
            v.direction!=='challenging' || !['output','wealth','officer'].includes(v.relation) :
            v.direction!=='supporting' || !['peer','resource'].includes(v.relation)))))
        metric.provenanceErrors++;
      metric.familyChannelMeaningProfiles.add(x.family+':'+x.channel+':'+x.context+':'+x.monthRelation);
      metric.rootContextMeaningProfiles.add(JSON.stringify([x.family,x.channel,x.context,
        x.monthRelation,x.intrinsicRootCandidates.map(y=>[y.position,y.rootClass])]));
    }
    const groups = result.natal.sharedChartEvidence;
    metric.renderedSourceGroups += groups.length;
    if(groups.length !== s.sections.length ||
      new Set(groups.map(x=>x.sharedStructuralT8ClaimId)).size !== groups.length)
      metric.provenanceErrors++;
    for(const group of groups){
      const original=s.sections.find(x=>x.claimId===group.sharedStructuralT8ClaimId);
      if(!original || group.sharedStructuralT8RuleId!==original.ruleId ||
        group.authorizesNewDomainMeaning!==false ||
        group.sharedStructuralSourceIds.join('|')!==original.sourceIds.join('|') ||
        group.family!==original.family || group.channel!==original.channel ||
        group.context!==original.context || group.paragraph!==original.paragraph)
        metric.provenanceErrors++;
      if(group.domainEvidence.length>1)metric.crossDomainEvidenceGroups++;
      for(const d of group.domainEvidence){
        const matches=result.natal.domainSharedContexts[d.domain].filter(x=>
          x.sharedStructuralT8ClaimId===group.sharedStructuralT8ClaimId);
        const expectedClaims=[...new Set(matches.map(x=>x.domainT8ClaimId))];
        const expectedSources=[...new Set(matches.flatMap(x=>x.domainT8SourceIds))];
        if(!matches.length ||
          JSON.stringify(expectedClaims)!==JSON.stringify(d.domainT8ClaimIds) ||
          JSON.stringify(expectedSources)!==JSON.stringify(d.domainT8SourceIds))
            metric.provenanceErrors++;
      }
    }
    // A structural observation can qualify an independently selected General core,
    // but must never manufacture a core for a tension-only or empty General report.
    const guide=result.natal.generalStructuralGuide;
    const generalReport=result.natal.domainReports.general;
    const sourceCore=generalReport.readingGuide?.sourceClaimType === undefined ?
      undefined : generalReport.sections.find(section =>
        section.claimType===generalReport.readingGuide.sourceClaimType &&
        section.axis!=='tension');
    if(guide.authorizesNewConclusion!==false)metric.provenanceErrors++;
    if(sourceCore===undefined){
      if(guide.state!=='no_source_bound_core'||guide.core!==null||
        guide.contextualClaims.length)metric.provenanceErrors++;
    }else{
      metric.sourceBoundGeneralCoreBirths++;
      if(guide.core===null||guide.core.claimType!==sourceCore.claimType||
        guide.core.ruleId!==sourceCore.ruleId||
        JSON.stringify(guide.core.sourceIds)!==JSON.stringify(sourceCore.sourceIds)||
        guide.core.paragraph!==generalReport.readingGuide.paragraph)
        metric.provenanceErrors++;
      const coreIds=new Set(result.natal.domainSharedContexts.general
        .filter(link=>link.domainT8ClaimType===sourceCore.claimType &&
          link.domainT8RuleId===sourceCore.ruleId)
        .map(link=>link.domainT8ClaimId));
      const expectedGroups=groups.filter(item=>item.domainEvidence.some(domain=>
        domain.domain==='general'&&domain.domainT8ClaimIds.some(id=>coreIds.has(id))));
      if(JSON.stringify(expectedGroups.map(x=>x.sharedStructuralT8ClaimId))!==
        JSON.stringify(guide.contextualClaims.map(x=>x.claimId))||
        (expectedGroups.length>0)!==(guide.state==='source_bound_core_with_context'))
          metric.provenanceErrors++;
      for(const item of guide.contextualClaims){
        const original=expectedGroups.find(group=>group.sharedStructuralT8ClaimId===item.claimId);
        if(!original||item.ruleId!==original.sharedStructuralT8RuleId||
          JSON.stringify(item.sourceIds)!==JSON.stringify(original.sharedStructuralSourceIds))
          metric.provenanceErrors++;
      }
      if(guide.contextualClaims.length)metric.generalCoreWithStructuralContextBirths++;
      metric.admittedGeneralCoreContextLinks+=guide.contextualClaims.length;
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
    const period=result.temporalApplicability;
    if(period.referenceDateTime!==REFERENCE ||
      period.annual!==result.temporal.annualMonthly.report.annualReference.state ||
      period.monthly!==result.temporal.annualMonthly.report.monthly.referenceReading.state)
        metric.temporalScopeViolations++;
    if(period.annual!=='in_target_civil_year' && result.annualLinks.length)
      metric.temporalScopeViolations++;
    if(period.monthly!=='in_period' && result.monthlyLinks.length)
      metric.temporalScopeViolations++;
    for(const link of result.annualLinks) {
      if(link.temporalScopePolicy!=='seoul_civil_year' ||
        link.temporalInterval!==undefined || link.temporalSegment!==undefined)
          metric.temporalScopeViolations++;
    }
    for(const link of result.monthlyLinks) {
      const bounds=link.temporalInterval;
      if(link.temporalScopePolicy!=='jeol_bounded_month_segment' || !bounds ||
        !link.temporalSegment || link.temporalSegment!==
        result.temporal.annualMonthly.report.monthly.referenceReading.segmentId ||
        (bounds && !(Date.parse(bounds.startsAt)<=Date.parse(REFERENCE) &&
          Date.parse(REFERENCE)<Date.parse(bounds.endsAt))))
          metric.temporalScopeViolations++;
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
  ...(metric.temporalScopeViolations?['Incorrect annual/monthly effective reference period']:[]),
  ...(metric.provenanceErrors?['Invalid Claim/Rule/Source chain']:[]),
  ...(metric.maySellOrOfficialViolations?['Research was promoted to Product']:[]),
  ...(metric.dayunStillUninterpretedBirths!==500?['Unlicensed dayun interpretation emitted']:[]),
  ...(metric.sourceBoundT8Births===0?['No structural T8 was consumed']:[]),
  ...(metric.hiddenChallengeBirths===0?['No source-bound support/challenge co-presence was consumed']:[]),
  ...(metric.hiddenSupportBirths===0?['No source-bound challenge/support co-presence was consumed']:[]),
  ...(metric.renderedSourceGroups!==metric.structuralT8Count ||
    metric.crossDomainEvidenceGroups===0 ?
      ['Consolidated cross-domain chart source evidence was missing or duplicated']:[]),
  ...(metric.visibleSupportSections===0 || metric.visibleChallengeSections===0 ?
    ['No independently sourced I13 visible stem contrast in both month directions']:[]),
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
 rootBirths:metric.rootCandidateBirths,hiddenBirths:metric.hiddenChallengeBirths,
 hiddenSections:metric.hiddenChallengeSections,
 hiddenSupportBirths:metric.hiddenSupportBirths,hiddenSupportSections:metric.hiddenSupportSections,
 visibleBirths:metric.visibleContrastingBirths,
 visibleSupport:metric.visibleSupportSections,visibleChallenge:metric.visibleChallengeSections,
 sharedGroups:metric.renderedSourceGroups,crossDomainGroups:metric.crossDomainEvidenceGroups,
 generalCoreBirths:metric.sourceBoundGeneralCoreBirths,
 generalCoreContextBirths:metric.generalCoreWithStructuralContextBirths,
 coreContextLinks:metric.admittedGeneralCoreContextLinks,
 temporalScopeViolations:metric.temporalScopeViolations,
 yearly:metric.yearlyConnectedBirths,
 monthly:metric.monthlyConnectedBirths,
 familyProfiles:metric.familyChannelMeaningProfiles.size,
 rootProfiles:metric.rootContextMeaningProfiles.size,
})+'\n');
if(errors.length)process.exitCode=1;
