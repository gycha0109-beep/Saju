import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import process from 'node:process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createGeneralNatalMultifactorRegistry } from '../dist/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../dist/research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../dist/research/wealth-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../dist/research/relationship-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../dist/research/business-natal-multifactor-candidate.js';

export const CAPABILITY_REACHABILITY_AUDIT_VERSION = 'saju-500-four-stage-capability-reachability-v1';
export const REFERENCE = '2026-10-25T00:00:00.000Z';
const ROOT = resolve(import.meta.dirname, '..');
const NATAL = [
  ['전체 사주', createGeneralNatalMultifactorRegistry],
  ['직업·커리어', createCareerMultifactorResearchRegistry],
  ['재물', createWealthNatalMultifactorRegistry],
  ['연애·관계', createRelationshipNatalMultifactorRegistry],
  ['사업', createBusinessNatalMultifactorRegistry],
];
const MENUS = [...NATAL.map(x => x[0]), '올해', '이번 달', '삶의 단계'];
const resolved = x => x?.status === 'resolved' && x.value !== undefined;
const uniq = x => [...new Set(x)];
const readJson = path => JSON.parse(readFileSync(path, 'utf8'));

function sampleBirths() {
  let seed = 0x5a1a2026;
  function rand() {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  }
  const number = (a, b) => a + Math.floor(rand() * (b - a + 1));
  const pad = n => String(n).padStart(2, '0');
  const used = new Set(), cases = [];
  while (cases.length < 500) {
    const y = number(1950, 2005), m = number(1, 12);
    const d = number(1, new Date(Date.UTC(y, m, 0)).getUTCDate());
    const hour = number(0, 23), minute = number(0, 59);
    const stamp = y + '-' + pad(m) + '-' + pad(d) + ' ' + pad(hour) + ':' + pad(minute);
    if (used.has(stamp)) continue;
    used.add(stamp);
    cases.push({
      birth: stamp,
      input: {
        calendarType: 'solar', date: { year: y, month: m, day: d },
        time: { known: true, hour, minute },
        sexForTraditionalCalculation: rand() < 0.5 ? 'male' : 'female',
      },
    });
  }
  return cases;
}

const CALC = [
  ['four_pillars', '사주 네 기둥', s => ['year','month','day','hour'].every(k=>resolved(s.pillars[k]))],
  ['day_master', '일간', s => resolved(s.derivedFacts.dayMaster)],
  ['ten_god_mapping', '십신 배치', s => resolved(s.derivedFacts.tenGods)],
  ['five_element_counts', '오행 분포', s => resolved(s.derivedFacts.fiveElementCounts)],
  ['hidden_stems', '지장간', s => ['year','month','day','hour'].every(k=>resolved(s.derivedFacts.hiddenStems?.[k]))],
  ['solar_term_context', '절기', s => Boolean(s.solarTermContext?.previous && s.solarTermContext?.next)],
  ['natal_relations', '천간·지지 구조관계', s => resolved(s.derivedFacts.structuralRelations)],
  ['stem_settlement', '천간 상호작용 관측', s => resolved(s.derivedFacts.stemInteractionSettlements)],
  ['branch_clash_context', '지지 충 관측 맥락', s => resolved(s.derivedFacts.branchClashContexts)],
  ['void_branches', '공망 계산 사실', s => resolved(s.derivedFacts.voidBranches)],
  ['luck_cycle', '대운 계산', s => resolved(s.luckCycle)],
];

const FAMILY_MAP = [
  { id:'day_master_month_season', label:'일간·월령·계절 환경', historical:'Month / Season Semantics',
    witnesses:['src/research/i18a-month-branch-strength-evidence.ts'], hints:['월령·계절의 구조적 의미가 전체 종합 판단으로 연결됐는지 확인'] },
  { id:'root_tonggen', label:'통근·뿌리', historical:'Root / Tonggen',
    witnesses:['src/research/general-natal-root-strength-dependency-map.ts','src/research/general-natal-root-term-binding-authority.ts'] },
  { id:'strength', label:'왕쇠·강약', historical:'旺衰 / 強弱',
    witnesses:['src/research/i23-strength-decision-readiness-v2.ts','src/research/general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.ts'] },
  { id:'support_constituents', label:'당중·조과', historical:'黨眾 / 助寡',
    witnesses:['src/research/general-natal-tonggen-dang-zhong-support-constituent-authority.ts'] },
  { id:'gyeokguk', label:'격국', historical:'格局',
    witnesses:['src/research/general-natal-pattern-candidate-establishment-formal-boundary-audit.ts'] },
  { id:'tiaohou', label:'조후', historical:'調候',
    witnesses:['src/research/general-natal-tiaohou-priority-conditions.ts','src/research/general-natal-tiaohou-structure-conflict-preservation.ts'] },
  { id:'yongxi', label:'용신·희신·기신', historical:'喜神 / 用神 / 忌神',
    witnesses:['src/research/general-natal-xi-yong-ji-shen-scope-observation-authority.ts'] },
  { id:'ten_god_context', label:'십신의 구조적 의미', historical:'Ten-God Contextual Meaning',
    witnesses:['src/research/general-natal-bing-yi-zhengyin-exact-relation-authority.ts'] },
  { id:'qualified_interactions', label:'합·충과 조건·효력', historical:'Stem / Branch Interactions',
    witnesses:['src/calculation/structural-relations.ts','src/research/general-natal-minimal-interaction-predicate-set-executable-claims.ts'] },
  { id:'position_semantics', label:'궁위·일지 배우자궁', historical:'Palace / Position Semantics',
    witnesses:['src/research/relationship-spouse-t8-day-branch-palace-project-governed-materiality-decision.ts'] },
  { id:'method_conflicts', label:'방법론 간 상충 보존', historical:'Conflict Preservation',
    witnesses:['src/research/general-natal-tiaohou-structure-conflict-preservation.ts'] },
  { id:'whole_chart', label:'전체 명식의 종합 판단', historical:'General Natal',
    witnesses:['src/research/general-natal-multifactor-candidate.ts'] },
  { id:'career', label:'직업 종합 판단', historical:'Career Natal',
    witnesses:['src/research/career-natal-multifactor-candidate.ts'] },
  { id:'wealth', label:'재물 종합 판단', historical:'Wealth Natal',
    witnesses:['src/research/wealth-natal-multifactor-candidate.ts'] },
  { id:'relationship', label:'연애·관계 종합 판단', historical:'Relationship Natal General',
    witnesses:['src/research/relationship-natal-multifactor-candidate.ts'] },
  { id:'business', label:'사업 종합 판단', historical:'Business Natal',
    witnesses:['src/research/business-natal-multifactor-candidate.ts'] },
  { id:'spouse', label:'배우자 세부 판단', historical:'Relationship Spouse',
    witnesses:['src/interpretation/relationship-spouse-t8-engine-producer.ts'] },
  { id:'annual', label:'올해 운세와 원국의 관계', historical:'T9 Annual',
    witnesses:['src/research/general-annual-reading-candidate.ts'] },
  { id:'monthly', label:'이번 달 운세와 원국의 관계', historical:'T9 Monthly',
    witnesses:['src/research/general-monthly-reading-candidate.ts'] },
  { id:'daewoon', label:'대운·삶의 단계 해석', historical:'Daewoon Interpretation',
    witnesses:['src/research/general-natal-dayun-natal-interaction.ts'] },
  { id:'cross_domain_coherence', label:'주제 간 일관성', historical:'Cross-Domain Coherence',
    witnesses:['src/reading/product-reading-integration.ts'] },
  { id:'family', label:'가족·자녀', historical:'Family Natal',
    witnesses:['src/research/general-natal-family-domain-claim-corpus.ts'] },
  { id:'compatibility', label:'궁합', historical:'T10 Compatibility',
    witnesses:['src/research/relationship-spouse-t8-dyadic-compatibility-boundary-evidence.ts'] },
  { id:'question_specific', label:'질문 맞춤 해석', historical:'T11 Question-Specific',
    witnesses:['src/reading/reading-intent-composition.ts'] },
];

function historicalInventory() {
  const content = readFileSync(resolve(ROOT,
    'docs/implementation/saju-r1-canonical-capability-runtime-audit-v1.md'), 'utf8');
  const result = new Map();
  for (const line of content.split(/\r?\n/u)) {
    if (!line.startsWith('| ')) continue;
    const cols = line.split('|').slice(1, -1).map(x => x.trim());
    if (cols.length !== 8 || cols[0] === 'Capability' || cols[0].startsWith('---')) continue;
    result.set(cols[0], { oldRuntimeState: cols[2], oldDisposition: cols[7], oldGap: cols[5] });
  }
  return result;
}

export function auditCapabilities(basis) {
  const errors = [];
  const rows = basis.caseRows;
  if (basis.seed !== '0x5a1a2026' || basis.count !== 500 ||
      basis.failedCases !== 0 || basis.uniqueCalculationHashes !== 500 ||
      MENUS.some(menu => rows?.[menu]?.length !== 500)) {
    throw new Error('Capability audit requires the unchanged successful 500-person eight-menu source-trace audit');
  }
  const byMenu = Object.fromEntries(MENUS.map(menu=>[menu,
    new Map(rows[menu].map(row => [row.birth, row]))]));
  for (const [menu, rowMap] of Object.entries(byMenu)) {
    if (rowMap.size !== 500) errors.push(menu + ': duplicate sampled birth');
  }
  const calc = Object.fromEntries(CALC.map(([id,label])=>[id,{label,resolvedBirths:0}]));
  const relations = {}, observedFactPaths = new Map();
  const natal = Object.fromEntries(NATAL.map(([menu])=>[menu,{
    selectedT8Births:0, selectedT8Sections:0, birthCasesWithTwoOrMoreT8Sections:0,
    birthCasesWithBothVisibleAndBranchChannels:0, birthCasesWithOneOrMoreT8FromTwoPlusT5:0,
    deliveredReadableBirths:0, researchCompleteFlaggedBirths:0,
  }]));
  const temporal = Object.fromEntries(['올해','이번 달'].map(menu=>[menu,{
    sourceBoundT9Births:0, sourceBoundT9Sections:0, natalContextBirths:0,
    observedClassicalSixPairBirths:0, observedClassicalSixPairSections:0,
    actuallySelectedPrimaryT9Births:0, deliveredReadableBirths:0,
  }]));
  let dayunFactBirths=0;
  const originalSeeds = sampleBirths();
  const now = new Date(REFERENCE);
  const seenRuleIds = new Map(), seenMethodIds = new Map();
  const runtimeRegistries = Object.fromEntries(NATAL.map(([menu,fn])=>[menu,fn()]));
  const enabledRuleTotals = Object.fromEntries(NATAL.map(([menu])=>[menu,{
    registeredT5:runtimeRegistries[menu].rules.filter(x=>x.taxonomy.tier==='T5').length,
    registeredT8:runtimeRegistries[menu].rules.filter(x=>x.taxonomy.tier==='T8').length,
    observedUniqueT8RuleIds:0,
  }]));
  for (const sample of originalSeeds) {
    const snapshot = calculateCanonicalSajuSnapshot(sample.input,
      PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
    const inconsistentMenus = MENUS.filter(menu =>
      byMenu[menu].get(sample.birth)?.calculationHash !== snapshot.calculationHash);
    if (inconsistentMenus.length > 0) {
      errors.push(sample.birth + ': canonical calculation hash differs from audited menu(s) ' +
        inconsistentMenus.join(','));
      continue;
    }
    for (const [id,,check] of CALC) if (check(snapshot)) calc[id].resolvedBirths++;
    for (const kind of snapshot.derivedFacts.structuralRelations?.value?.map(x=>x.kind) ?? []) {
      relations[kind] = (relations[kind] ?? 0) + 1;
    }
    for (const [menu] of NATAL) {
      const row = byMenu[menu].get(sample.birth);
      const out = natal[menu];
      const sections = row?.sourceEvidence ?? [];
      if (row?.text.trim()) out.deliveredReadableBirths++;
      if (row?.state === 'complete') out.researchCompleteFlaggedBirths++;
      if (sections.length) out.selectedT8Births++;
      out.selectedT8Sections += sections.length;
      if (sections.length >= 2) out.birthCasesWithTwoOrMoreT8Sections++;
      if (new Set(sections.map(x=>x.channel)).size >= 2)
        out.birthCasesWithBothVisibleAndBranchChannels++;
      if (sections.some(x=>x.upstreamClaimIds?.length >= 2))
        out.birthCasesWithOneOrMoreT8FromTwoPlusT5++;
      for (const s of sections) {
        if (!s.claimId || !s.ruleId || !s.methodologyId || !s.sourceIds?.length ||
            !s.observedFactPaths?.length || !s.upstreamClaimIds?.length) {
          errors.push(menu + ': ungrounded selected T8 source at ' + sample.birth);
          continue;
        }
        const rule = runtimeRegistries[menu].rules.find(x=>x.ruleId===s.ruleId);
        if (!rule || rule.taxonomy.tier !== 'T8' ||
            rule.methodologyRef.id !== s.methodologyId) {
          errors.push(menu + ': source path is not a registered T8 Claim chain at ' + sample.birth);
        }
        seenRuleIds.set(s.ruleId, (seenRuleIds.get(s.ruleId)??0)+1);
        seenMethodIds.set(s.methodologyId, (seenMethodIds.get(s.methodologyId)??0)+1);
        for (const fact of s.observedFactPaths) {
          observedFactPaths.set(fact, (observedFactPaths.get(fact) ?? 0)+1);
        }
      }
    }
    for (const menu of ['올해','이번 달']) {
      const row = byMenu[menu].get(sample.birth), t = temporal[menu];
      const sections = row.sourceEvidence?.sections ?? [];
      if (row.text.trim()) t.deliveredReadableBirths++;
      if (sections.length) t.sourceBoundT9Births++;
      t.sourceBoundT9Sections += sections.length;
      if ((row.sourceEvidence?.natalCorrespondences??[]).length) t.natalContextBirths++;
      const selected = sections.filter(x=>menu==='올해' ? x.kind==='core' :
        x.kind==='theme' && x.segmentId===row.sourceEvidence.referenceSegment);
      if (selected.length===1 && selected[0].claimId && selected[0].sourceIds?.length)
        t.actuallySelectedPrimaryT9Births++;
      const six = sections.filter(x=>x.kind==='structural_context');
      if (six.length) t.observedClassicalSixPairBirths++;
      t.observedClassicalSixPairSections += six.length;
      for (const s of sections) {
        if (!s.claimId || !s.ruleIds?.length || !s.sourceIds?.length ||
          !s.methodologyId) errors.push(menu + ': missing T9 rule chain ' + sample.birth);
      }
    }
    const stage = byMenu['삶의 단계'].get(sample.birth);
    if (resolved(snapshot.luckCycle)) dayunFactBirths++;
    if (stage?.state !== 'source_authority_not_established')
      errors.push(sample.birth + ': life-stage authority state was incorrectly promoted');
  }
  for (const [menu] of NATAL) {
    enabledRuleTotals[menu].observedUniqueT8RuleIds =
      uniq(rows[menu].flatMap(row => row.sourceEvidence.map(x=>x.ruleId))).length;
  }
  const historical = historicalInventory();
  const capabilities = FAMILY_MAP.map(item=>{
    const was=historical.get(item.historical);
    const sourceWitnesses = item.witnesses.map(p=>({path:p,present:existsSync(resolve(ROOT,p))}));
    const domainMenu = {whole_chart:'전체 사주', career:'직업·커리어', wealth:'재물',
      relationship:'연애·관계', business:'사업'}[item.id];
    const observed = domainMenu ? {
      sourceBoundIndividualInterpretationBirths:natal[domainMenu].selectedT8Births,
      boundedMultiInputT8Births:natal[domainMenu].birthCasesWithOneOrMoreT8FromTwoPlusT5,
      deliveredInActualResearchReadingBirths:natal[domainMenu].deliveredReadableBirths,
      resultScope:'same-channel T5 to T8 candidates, not complete whole-chart judgment',
    } : item.id==='annual'||item.id==='monthly' ? {
      sourceBoundIndividualInterpretationBirths:temporal[item.id==='annual'?'올해':'이번 달'].sourceBoundT9Births,
      boundedStructuralPeriodNatalBirths:temporal[item.id==='annual'?'올해':'이번 달'].observedClassicalSixPairBirths,
      deliveredInActualResearchReadingBirths:temporal[item.id==='annual'?'올해':'이번 달'].deliveredReadableBirths,
      resultScope:'T9 research theme plus source-bounded classical branch pairing, no validated events',
    } : item.id==='daewoon' ? {
      calculatedBirths:dayunFactBirths, authorizedLifeStageMeaningBirths:0,
      resultScope:'computed intervals are not life-stage interpretations',
    } : {};
    const isAdditionalMenu = ['family','spouse','compatibility','question_specific'].includes(item.id);
    return {
      id:item.id, label:item.label,
      historicalReference:item.historical,
      priorAudit:was ?? null,
      codeEvidence:sourceWitnesses,
      calculationState: domainMenu ? 'shared_T0_substrate_verified_500' :
        (item.id==='daewoon' ? 'luck_cycle_facts_verified_500' :
          ['day_master_month_season','ten_god_context','qualified_interactions'].includes(item.id) ?
            'related_T0_facts_verified_not_full_structural_verdict' :
            'not_a_separately_verified_T0_fact'),
      individualInterpretation:domainMenu||['annual','monthly'].includes(item.id) ?
        'observed_in_current_500_research_consumer' :
        isAdditionalMenu ? 'not_executed_by_this_eight_menu_audit' :
        'research_code_exists_or_historical_review_only_not_verified_in_selected_500_claim_chain',
      synthesis:domainMenu ? 'bounded_T8_multi_input_not_proof_of_complete_chart_synthesis' :
        ['annual','monthly'].includes(item.id) ? 'limited_branch_pair_and_independent_natal_context' :
        'no_full_500_chart_synthesis_proof',
      output: domainMenu || ['annual','monthly'].includes(item.id) ?
        'observed_in_research_menu_only' :
        item.id==='daewoon' ? 'date_and_pillar_facts_only' :
        isAdditionalMenu ? 'not_in_eight_menu_scope' : 'not_independently_observed_as_authorized_synthesis',
      observed, limitation: item.hints ?? [],
    };
  });
  const refByFamily = ['root','tonggen','wang','shuai','qiang','gyeok','tiaohou',
    'yong','xi','ji','strength','climate','season','interaction'];
  const sourceUsage = Object.fromEntries(refByFamily.map(k=>[k, [...observedFactPaths]
    .filter(([path])=>path.toLowerCase().includes(k)).reduce((sum,x)=>sum+x[1],0)]));
  const result={
    version:CAPABILITY_REACHABILITY_AUDIT_VERSION,
    status:errors.length ? 'FAIL' : 'FOUR_STAGE_EVIDENCE_INVENTORY_COMPLETE_NOT_PRODUCT_APPROVED',
    source:{seed:basis.seed,sampledBirths:500,menus:8,reference:REFERENCE,
      calculationHashVerifiedPerBirth:500-errors.filter(x=>x.includes('canonical calculation hash differs')).length},
    structuralCalculation:calc,observedStructuralRelationOccurrences:relations,
    registeredAndReachedRules:enabledRuleTotals,
    natalReadingConsumption:natal,
    temporalReadingConsumption:temporal,
    lifeStage:{calculatedLuckCycleBirths:dayunFactBirths,authorizedLifeStageMeaningBirths:0,
      consumerProjectionState:'source_authority_not_established_for_all_500'},
    selectedT8CalculatedFactPathFamilies:sourceUsage,
    provenance:{distinctSelectedT8Rules:seenRuleIds.size,
      distinctSelectedT8Methodologies:seenMethodIds.size,
      selectedT8FactPaths:[...observedFactPaths].map(([path,count])=>({path,count}))
        .sort((a,b)=>b.count-a.count).slice(0,30)},
    fourStageCapabilityMatrix:capabilities,
    priorityBacklog:[
      {priority:'P0',task:'Share admissible root/strength/season/pattern/climate evidence as governed chart-level claims without forced verdicts',blocking:'research witnesses exist, actual 500 consumer chain cannot prove unified shared structural synthesis',references:['src/research/general-natal-root-strength-dependency-map.ts','src/research/general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.ts','src/research/general-natal-pattern-candidate-establishment-formal-boundary-audit.ts']},
      {priority:'P0',task:'Use the governed shared chart context in General Natal T8 before extending domain-local rules',blocking:'same-channel ten-god combinations do not establish one complete whole-chart meaning',references:['src/research/general-natal-multifactor-candidate.ts','src/preview/general-natal-multifactor-report.ts']},
      {priority:'P1',task:'Connect admitted shared structures to Wealth/Career/Business/Relationship T8',blocking:'wealth direct T8 core missing for 118/500; other domains also have unreadable/partial cases',references:['src/research/wealth-natal-multifactor-candidate.ts','src/preview/natal-five-domain-multifactor-reader.ts']},
      {priority:'P1',task:'Check coherence of independently produced five natal menus for the same canonical person',blocking:'multiple selected sections are not evidence that their meanings are compatible',references:['src/reading/product-reading-integration.ts']},
      {priority:'P2',task:'Deepen authorized Annual/Monthly/Dayun overlays only from established natal structure and admitted temporal semantics',blocking:'classical six pairing is structural-only; Dayun is currently intervals-only',references:['src/preview/temporal-natal-correspondence.ts','src/research/general-natal-dayun-natal-interaction.ts']},
      {priority:'P2',task:'Evaluate report and Reader delivery only after source-bounded meaning is verified',blocking:'prose polish cannot invent missing semantic Claim',references:['src/preview/natal-reader-first-story.ts','src/preview/korean-prose-surface.ts']},
    ],
    guardrails:['Research and Preview execution are not Production/Official permission.',
      'Missing independent chart-wide semantic conclusions must not be inferred from file presence or rule registration.',
      'This 500-person corpus uses known birth hours; unknown-hour and leap-birth cases require separate targeted tests.',
      'Only eight audited menus are included; spouse/family/compatibility/question-specific are not proved absent merely because omitted.'],
    errors,
  };
  return result;
}

if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath) throw new TypeError('Usage: node scripts/saju-500-capability-reachability-audit.mjs 500-AUDIT.json [OUTPUT.json]');
  const result=auditCapabilities(readJson(inputPath));
  if (outputPath) writeFileSync(outputPath, JSON.stringify(result,null,2)+'\n','utf8');
  process.stdout.write('SAJU500_CAPABILITY '+JSON.stringify({
    status:result.status,source:result.source,calculation:result.structuralCalculation,
    selectedT8FactPaths:result.provenance.selectedT8FactPaths,
    natal:result.natalReadingConsumption,temporal:result.temporalReadingConsumption,
    lifeStage:result.lifeStage,errors:result.errors,
  })+'\n');
  if (result.errors.length) process.exitCode=1;
}
