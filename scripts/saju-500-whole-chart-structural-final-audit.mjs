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
  sourceBoundDomainCoreBirths:Object.fromEntries(['career','wealth','relationship','business'].map(k=>[k,0])),
  sourceBoundDomainContextBirths:Object.fromEntries(['career','wealth','relationship','business'].map(k=>[k,0])),
  sourceBoundDomainStructuralLinks:Object.fromEntries(['career','wealth','relationship','business'].map(k=>[k,0])),
  isolatedWealthT5NoCoreBirths:0,sourceBoundDomainGuideFailures:0,
  directWealthResearchT8Births:0,  directWealthResearchT8Count:0,
  directCareerBirths:0,directCareerVisibleT8:0,directCareerBranchT8:0,
  directCareerWithoutCore:0,directCareerErrors:0,
  directWealthWithoutMultifactorCoreBirths:0,directWealthResearchT8Violations:0,
  familyChannelMeaningProfiles:new Set(),rootContextMeaningProfiles:new Set(),
  domainContextBirths:Object.fromEntries(DOMAINS.map(x=>[x,0])),
  domainContextLinks:Object.fromEntries(DOMAINS.map(x=>[x,0])),
  annualLinks:0,monthlyLinks:0,yearlyConnectedBirths:0,monthlyConnectedBirths:0,
  temporalScopeViolations:0,
  annualCoreDomainContextLinks:0,monthlyCoreDomainContextLinks:0,
  annualCoreDomainContextBirths:0,monthlyCoreDomainContextBirths:0,
  temporalCoreDomainErrors:0,
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
    const directCareer=result.natal.sourceOwnedDirectCareerT8;
    if(directCareer.directVisibleStemT8.length)metric.directCareerBirths++;
    metric.directCareerVisibleT8+=directCareer.directVisibleStemT8.length;
    metric.directCareerBranchT8+=directCareer.supportingBranchT8.length;
    if(directCareer.directVisibleStemT8.length &&
      result.natal.domainStructuralGuides.career.core===null)
      metric.directCareerWithoutCore++;
    if(!directCareer.researchOnly||directCareer.maySell||
      directCareer.mayPublish||directCareer.mayConcludeCareerOutcome)
      metric.directCareerErrors++;
    const allCareer=[...directCareer.directVisibleStemT8,
      ...directCareer.supportingBranchT8];
    if(new Set(allCareer.map(x=>x.claimId)).size!==allCareer.length)
      metric.directCareerErrors++;
    for(const x of allCareer){
      if(x.replacesMultifactorCore!==false||
        x.authorizesOccupationOrIncomeOutcome!==false||!x.claimId||
        !x.ruleId||!x.sourceIds.length||!x.factPaths.length||
        x.positions.length!==x.factPaths.length||
        x.factPaths.some(path=>!path.startsWith('derivedFacts.tenGods.value.')))
        metric.directCareerErrors++;
    }
    const directWealth=result.natal.domainReports.wealth.sourceOwnedDirectWealthT8;
    if(directWealth.length)metric.directWealthResearchT8Births++;
    metric.directWealthResearchT8Count+=directWealth.length;
    if(directWealth.length && result.natal.domainStructuralGuides.wealth.core===null)
      metric.directWealthWithoutMultifactorCoreBirths++;
    if(new Set(directWealth.map(x=>x.claimId)).size!==directWealth.length)
      metric.directWealthResearchT8Violations++;
    for(const x of directWealth){
      if(x.kind!=='source_owned_direct_wealth_t8_not_multifactor_core' ||
        x.authorizesMultifactorCore!==false || x.authorizesMoneyOutcome!==false ||
        !x.claimId || !x.claimType.startsWith('WEALTH_NATAL_CONCLUSION_') ||
        !x.methodologyId.includes('WEALTH-NATAL-READING') ||
        !x.ruleId || !x.sourceIds.length || !x.families.includes('wealth') ||
        x.observedFactPaths.length!==x.observedPositions.length ||
        !x.observedFactPaths.length ||
        x.observedFactPaths.some(path=>
          !/^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u.test(path)))
          metric.directWealthResearchT8Violations++;
    }
    for(const domain of ['career','wealth','relationship','business']){
      const guide=result.natal.domainStructuralGuides[domain];
      const report=result.natal.domainReports[domain];
      if(guide.domain!==domain||guide.authorizesNewDomainOutcome!==false)
        metric.sourceBoundDomainGuideFailures++;
      const coreType=report.readingGuide?.coreClaimType;
      const sourceCore=coreType===undefined?undefined:report.sections.find(s=>
        s.claimType===coreType&&s.axis!=='context'&&s.axis!=='tension');
      if(sourceCore===undefined){
        const isolated=domain==='wealth' && report.singleWealthT5Observation!==undefined;
        if(guide.core!==null||guide.contextualClaims.length||guide.supporting.length||
          guide.state!==(isolated?'isolated_wealth_t5_not_synthesis':'no_source_bound_core'))
          metric.sourceBoundDomainGuideFailures++;
        if(isolated)metric.isolatedWealthT5NoCoreBirths++;
      }else{
        metric.sourceBoundDomainCoreBirths[domain]++;
        if(!guide.core||guide.core.claimType!==sourceCore.claimType||
          guide.core.ruleId!==sourceCore.ruleId||
          JSON.stringify(guide.core.sourceIds)!==JSON.stringify(sourceCore.sourceIds)||
          guide.core.paragraph!==report.readingGuide?.paragraph)
          metric.sourceBoundDomainGuideFailures++;
        const linkedIds=new Set(result.natal.domainSharedContexts[domain].filter(x=>
          x.domainT8ClaimType===sourceCore.claimType&&
          x.domainT8RuleId===sourceCore.ruleId).map(x=>x.domainT8ClaimId));
        const actual=result.natal.sharedChartEvidence.filter(x=>
          x.domainEvidence.some(d=>d.domain===domain &&
            d.domainT8ClaimIds.some(id=>linkedIds.has(id))));
        if(JSON.stringify(actual.map(x=>x.sharedStructuralT8ClaimId))!==
          JSON.stringify(guide.contextualClaims.map(x=>x.claimId))||
          guide.state!==(actual.length?'core_with_structural_context':'core_without_structural_context'))
          metric.sourceBoundDomainGuideFailures++;
        const chosenSupport=report.readingGuide?.supporting??[];
        if(guide.supporting.length!==chosenSupport.length||
          guide.supporting.some((x,i)=>
            x.claimType!==chosenSupport[i]?.claimType ||
            !report.sections.some(s=>s.claimType===x.claimType &&
              s.ruleId===x.ruleId &&
              JSON.stringify(s.sourceIds)===JSON.stringify(x.sourceIds))))
          metric.sourceBoundDomainGuideFailures++;
        for(const context of guide.contextualClaims){
          const original=actual.find(x=>x.sharedStructuralT8ClaimId===context.claimId);
          if(!original || original.sharedStructuralT8RuleId!==context.ruleId ||
            JSON.stringify(original.sharedStructuralSourceIds)!==JSON.stringify(context.sourceIds))
            metric.sourceBoundDomainGuideFailures++;
        }
        if(guide.contextualClaims.length)metric.sourceBoundDomainContextBirths[domain]++;
        metric.sourceBoundDomainStructuralLinks[domain]+=guide.contextualClaims.length;
      }
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
    for(const [scope, coreLinks, baseLinks] of [
      ['annual',result.annualDomainCoreContexts,result.annualLinks],
      ['monthly',result.monthlyDomainCoreContexts,result.monthlyLinks],
    ]){
      if(scope==='annual'){
        metric.annualCoreDomainContextLinks+=coreLinks.length;
        if(coreLinks.length)metric.annualCoreDomainContextBirths++;
      }else{
        metric.monthlyCoreDomainContextLinks+=coreLinks.length;
        if(coreLinks.length)metric.monthlyCoreDomainContextBirths++;
      }
      const identities=new Set();
      for(const x of coreLinks){
        const guide=result.natal.domainStructuralGuides[x.domain];
        const actual=result.natal.domainSharedContexts[x.domain].find(c=>
          c.domainT8ClaimId===x.domainCoreT8ClaimId &&
          c.sharedStructuralT8ClaimId===x.sharedNatalStructuralT8ClaimId);
        const temporal=baseLinks.find(link=>
          link.temporalT9ClaimId===x.temporalT9ClaimId &&
          link.sharedNatalStructuralT8ClaimId===x.sharedNatalStructuralT8ClaimId);
        const key=x.temporalT9ClaimId+'|'+x.domain+'|'+x.domainCoreT8ClaimId+
          '|'+x.sharedNatalStructuralT8ClaimId;
        if(identities.has(key))metric.temporalCoreDomainErrors++;
        identities.add(key);
        if(!guide||!guide.core||!actual||!temporal ||
          x.temporalScope!==scope ||
          x.domainCoreT8RuleId!==guide.core.ruleId ||
          x.domainCoreT8RuleId!==actual.domainT8RuleId ||
          !guide.contextualClaims.some(c=>c.claimId===x.sharedNatalStructuralT8ClaimId) ||
          x.relation!=='same_selected_natal_structural_claim' ||
          x.temporalDomainOutcomeAuthorized!==false ||
          JSON.stringify(x.domainCoreT8SourceIds)!==JSON.stringify(actual.domainT8SourceIds) ||
          JSON.stringify(x.temporalT9SourceIds)!==JSON.stringify(temporal.temporalT9SourceIds) ||
          JSON.stringify(x.sharedNatalStructuralSourceIds)!==
            JSON.stringify(actual.sharedStructuralT8SourceIds) ||
          x.temporalScopePolicy!==temporal.temporalScopePolicy ||
          JSON.stringify(x.temporalInterval??null)!==
            JSON.stringify(temporal.temporalInterval??null))
          metric.temporalCoreDomainErrors++;
      }
    }
    if(result.temporalApplicability.annual!=='in_target_civil_year' &&
      result.annualDomainCoreContexts.length)metric.temporalCoreDomainErrors++;
    if(result.temporalApplicability.monthly!=='in_period' &&
      result.monthlyDomainCoreContexts.length)metric.temporalCoreDomainErrors++;
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
// Final-stage boundary cases complement, but do not alter, the fixed 500-person corpus.
const temporalBoundaryResults=[];
const boundaryBirth={
  calendarType:'solar',
  date:{year:1998,month:3,day:28},
  time:{known:true,hour:22,minute:19},
  sexForTraditionalCalculation:'female',
};
for(const item of [
  {name:'other_civil_year',year:2025,month:10,reference:REFERENCE,
    annual:'outside_target_civil_year',monthly:'outside_target_month'},
  {name:'other_month_same_civil_year',year:2026,month:9,reference:REFERENCE,
    annual:'in_target_civil_year',monthly:'outside_target_month'},
  {name:'seoul_new_year_boundary',year:2026,month:12,
    reference:'2026-12-31T15:30:00.000Z',
    annual:'outside_target_civil_year',monthly:'outside_target_month'},
]){
  try{
    const result=buildWholeChartStructuralResearchResult(boundaryBirth,{
      requestId:'whole-chart-final-boundary-'+item.name,
      targetYear:item.year,targetMonth:item.month,
      referenceDateTime:item.reference,
    });
    const observed=result.temporalApplicability;
    const pass=observed.annual===item.annual &&
      observed.monthly===item.monthly &&
      observed.referenceDateTime===item.reference &&
      (observed.annual==='in_target_civil_year'||result.annualLinks.length===0) &&
      (observed.monthly==='in_period'||result.monthlyLinks.length===0) &&
      result.researchOnly && !result.mayPublish && !result.maySell;
    if(!pass)metric.temporalScopeViolations++;
    temporalBoundaryResults.push({
      name:item.name,passed:pass,annual:observed.annual,monthly:observed.monthly,
      annualLinkCount:result.annualLinks.length,
      monthlyLinkCount:result.monthlyLinks.length,
    });
  }catch(error){
    metric.temporalScopeViolations++;
    temporalBoundaryResults.push({name:item.name,passed:false,error:String(error)});
  }
}
const errors=[
  ...(metric.executed!==500?['Not all 500 exact charts executed']:[]),
  ...(metric.errors.length?['Execution exceptions in '+metric.errors.length+' of 500 cases']:[]),
  ...(metric.sameChartHashFailures?['Mixed canonical snapshots']:[]),
  ...(metric.temporalScopeViolations?['Incorrect annual/monthly effective reference period']:[]),
  ...(metric.temporalCoreDomainErrors?['Annual/monthly T9 was incorrectly attached to a selected natal domain core']:[]),
  ...(metric.provenanceErrors?['Invalid Claim/Rule/Source chain']:[]),
  ...(metric.sourceBoundDomainGuideFailures?['Selected four-domain center/context guides failed to preserve source T8 authority']:[]),
  ...(metric.directCareerErrors?['Selected career subtype research T8 provenance/authority mismatch']:[]),
  ...(metric.directCareerVisibleT8===0?['No selected direct career research T8']:[]),
  ...(metric.directWealthResearchT8Violations?['Selected direct wealth research T8 violated exact source or scope']:[]),
  ...(metric.directWealthResearchT8Count===0?['Registered direct wealth T8 rules did not reach any real chart']:[]),
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
  examples,temporalBoundaryResults,errors,
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
 domainGuideFailures:metric.sourceBoundDomainGuideFailures,
 wealthIsolatedT5Births:metric.isolatedWealthT5NoCoreBirths,
 directWealthBirths:metric.directWealthResearchT8Births,
 directWealthT8:metric.directWealthResearchT8Count,
 directWealthNoCoreBirths:metric.directWealthWithoutMultifactorCoreBirths,
 directWealthErrors:metric.directWealthResearchT8Violations,
 directCareerBirths:metric.directCareerBirths,
 directCareerVisibleT8:metric.directCareerVisibleT8,
 directCareerBranchT8:metric.directCareerBranchT8,
 directCareerNoCore:metric.directCareerWithoutCore,
 directCareerErrors:metric.directCareerErrors,
 domainCoreBirths:metric.sourceBoundDomainCoreBirths,
 domainContextBirths:metric.sourceBoundDomainContextBirths,
 temporalScopeViolations:metric.temporalScopeViolations,
 annualDomainCorePeople:metric.annualCoreDomainContextBirths,
 monthlyDomainCorePeople:metric.monthlyCoreDomainContextBirths,
 annualDomainCoreLinks:metric.annualCoreDomainContextLinks,
 monthlyDomainCoreLinks:metric.monthlyCoreDomainContextLinks,
 domainTemporalErrors:metric.temporalCoreDomainErrors,
 yearly:metric.yearlyConnectedBirths,
 monthly:metric.monthlyConnectedBirths,
 familyProfiles:metric.familyChannelMeaningProfiles.size,
 rootProfiles:metric.rootContextMeaningProfiles.size,
})+'\n');
if(errors.length)process.exitCode=1;
