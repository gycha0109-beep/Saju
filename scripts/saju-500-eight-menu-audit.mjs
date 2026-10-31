import { createHash } from 'node:crypto';
import process from 'node:process';
import { writeFileSync } from 'node:fs';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createGeneralNatalMultifactorRegistry } from '../dist/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../dist/research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../dist/research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../dist/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../dist/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../dist/preview/general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from '../dist/preview/career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from '../dist/preview/wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../dist/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../dist/preview/relationship-natal-multifactor-report.js';
import { buildThreeTemporalMenusBirthReading } from '../dist/preview/three-temporal-menus-birth-reading.js';
import {
  diagnoseMissingWealthReading,
  analyzeTemporalRepetition,
  analyzeTemporalMeaningRepetition,
  summarizeMissingWealthCauses,
  ROOT_CAUSE_AUDIT_VERSION,
} from './saju-500-root-cause.mjs';

const REFERENCE = '2026-10-25T00:00:00.000Z';
const COUNT = 500;
const DOMAIN_NAMES = ['전체 사주', '직업·커리어', '재물', '연애·관계', '사업', '올해', '이번 달', '삶의 단계'];
const NATAL = ['general', 'career', 'wealth', 'relationship', 'business'];
const now = new Date(REFERENCE);
let seed = 0x5a1a2026;
function rand() {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) / 4294967296;
}
function number(min, max) { return min + Math.floor(rand() * (max - min + 1)); }
function pad(n) { return String(n).padStart(2, '0'); }
function sampleBirth(used) {
  for (;;) {
    const y = number(1950, 2005);
    const m = number(1, 12);
    const d = number(1, new Date(Date.UTC(y, m, 0)).getUTCDate());
    const hour = number(0, 23), minute = number(0, 59);
    const stamp = y + '-' + pad(m) + '-' + pad(d) + ' ' + pad(hour) + ':' + pad(minute);
    if (used.has(stamp)) continue;
    used.add(stamp);
    return {
      stamp,
      birth: {
        calendarType: 'solar',
        date: { year: y, month: m, day: d },
        time: { known: true, hour, minute },
        sexForTraditionalCalculation: rand() < 0.5 ? 'male' : 'female',
      },
    };
  }
}
function digest(v) { return createHash('sha256').update(String(v)).digest('hex'); }
function entry(text, meaning, state, sectionCount, kind) {
  const str = text.trim();
  return {
    text: str,
    exactKey: digest(str),
    meaningKey: digest(JSON.stringify(meaning)),
    meaningComponents: meaning,
    state,
    sectionCount,
    kind,
  };
}
function natalEntry(report) {
  const sections = report.sections ?? [];
  const prose = sections.map(s => s.headline + '\n' + s.paragraph);
  if (report.readingGuide?.paragraph) prose.push(report.readingGuide.paragraph);
  // Narrative and selected source-backed claim types are counted separately:
  // different stems/dates inside the text do not automatically prove different meaning.
  return entry(
    prose.join('\n\n'),
    sections.map(s => [s.claimType, s.pattern, s.axis, s.channel]),
    report.state,
    sections.length,
    'sourced_natal_research',
  );
}
function temporalEntries(result) {
  const report = result.annualMonthly.report;
  const annual = report.annual.sections;
  const monthly = report.monthly.sections;
  const focus = report.monthly.referenceReading;
  const life = result.lifeStage.report;
  const a = entry(
    annual.map(s => s.title + '\n' + s.text).join('\n\n'),
    annual.map(s => [s.researchProfileId, s.title]),
    report.annualReference.state, annual.length, 'annual_research',
  );
  const current = focus.state === 'in_period' && focus.theme
    ? focus.theme.title + '\n' + focus.theme.text : '';
  const m = entry(
    [current, ...monthly.map(s => s.title + '\n' + s.text)].filter(Boolean).join('\n\n'),
    [focus.state, focus.theme?.title ?? '', ...monthly.map(s => [s.segmentId, s.title])],
    focus.state, monthly.length + (current ? 1 : 0), 'monthly_research',
  );
  // IMPORTANT: Dayun periods describe calendar/pillar facts, not supported
  // forecasts; report life-stage's structural uniqueness but DO NOT count it
  // as distinct life-stage interpretations.
  a.sourceEvidence = {
    annualStemTenGod: report.annual.annualStemTenGod,
    annualCalendarPolicy: report.annual.calendarPolicy,
    sections: annual.map(s => ({
      kind: s.kind,
      sourceProfileId: s.researchProfileId,
      candidateClaimType: s.candidateClaimType,
      calculatedFactPaths: [...s.calculationFactPaths],
      relatedPillar: s.relatedPillar ?? null,
      observedClash: s.observedClash ?? null,
    })),
  };
  m.sourceEvidence = {
    referenceState: focus.state,
    referenceSegment: focus.segmentId ?? null,
    sections: monthly.map(s => ({
      kind: s.kind,
      segmentId: s.segmentId,
      tenGod: s.tenGod,
      claimId: s.claimId,
      sourceIds: [...s.sourceIds],
      ruleIds: [...s.ruleIds],
      factPaths: [...s.factPaths],
      relatedPillar: s.relatedPillar ?? null,
      observedClash: s.observedClash ?? null,
    })),
  };
  const l = entry(
    life.periods.map(p => p.text).join('\n\n'),
    [life.interpretationStatus, ...life.periods.map(p => p.kind)],
    life.interpretationStatus, life.periods.length, 'calculated_dayun_only',
  );
  return [a, m, l];
}
function tally(rows, key) {
  const groups = new Map();
  for (const r of rows) {
    const k = r[key];
    const g = groups.get(k) ?? { count: 0, examples: [], profile: r.meaningComponents };
    g.count++;
    if (g.examples.length < 3) g.examples.push(r.birth);
    groups.set(k, g);
  }
  const repeats = [...groups.values()].filter(g => g.count > 1)
    .sort((a,b) => b.count - a.count);
  return {
    unique: groups.size,
    repeatedGroups: repeats.length,
    casesInRepeatedGroups: repeats.reduce((n,g) => n+g.count, 0),
    largestRepeatedGroup: repeats[0]?.count ?? 0,
    examples: repeats.slice(0, 3).map(g => ({
      count: g.count, sampleBirths: g.examples,
      ...(key === 'meaningKey' ? { meaningComponents: g.profile } : {}),
    })),
  };
}
function summarize(rows) {
  const nonEmpty = rows.filter(r => r.text.length > 0);
  return {
    generated: rows.length,
    withReadableText: nonEmpty.length,
    withoutReadableText: rows.length - nonEmpty.length,
    avgProseCharacters: nonEmpty.length ? Math.round(nonEmpty.reduce((n,r)=>n+r.text.length,0)/nonEmpty.length) : 0,
    exactText: tally(nonEmpty, 'exactKey'),
    meaningProfile: tally(nonEmpty, 'meaningKey'),
    reportStates: Object.fromEntries([...new Set(rows.map(r => r.state))].sort()
      .map(state=>[state,rows.filter(r=>r.state===state).length])),
    researchKind: rows[0]?.kind ?? null,
    examples: rows.slice(0, 2).map(r => ({birth: r.birth, text: r.text.slice(0, 550)})),
  };
}
export function runFiveHundredSajuAudit() {
  const registries = {
    general: createGeneralNatalMultifactorRegistry(),
    career: createCareerMultifactorResearchRegistry(),
    wealth: createWealthNatalMultifactorRegistry(),
    relationship: createRelationshipNatalMultifactorRegistry(),
    business: createBusinessNatalMultifactorRegistry(),
  };
  const renderers = {
    general: buildGeneralNatalMultifactorReport,
    career: buildCareerMultifactorResearchReport,
    wealth: buildWealthNatalMultifactorReport,
    relationship: buildRelationshipNatalMultifactorReport,
    business: buildBusinessNatalMultifactorReport,
  };
  const rows = Object.fromEntries(DOMAIN_NAMES.map(name=>[name,[]]));
  const inputs = new Set();
  const chartHashGroups = new Map();
  const failures = [];
  const wealthMissingCases = [];
  const startedAt = Date.now();
  for (let i=0; i<COUNT; i++) {
    const {stamp, birth} = sampleBirth(inputs);
    try {
      const snapshot = calculateCanonicalSajuSnapshot(birth, PRODUCTION_DEFAULT_CALCULATION_POLICY, {now});
      const chartKey = snapshot.calculationHash;
      const existing = chartHashGroups.get(chartKey) ?? [];
      existing.push(stamp);
      chartHashGroups.set(chartKey,existing);
      for (const domain of NATAL) {
        const registry = registries[domain];
        const interpretation = runInterpretation(snapshot,registry,{now});
        const report = renderers[domain](snapshot, interpretation, registry);
        if (report.snapshotId !== snapshot.snapshotId || report.calculationHash !== chartKey) {
          throw new Error(domain + ' did not use the same exact natal snapshot');
        }
        rows[({
          general:'전체 사주', career:'직업·커리어', wealth:'재물',
          relationship:'연애·관계', business:'사업',
        })[domain]].push({...natalEntry(report),birth:stamp,calculationHash:chartKey});
        if (domain === 'wealth' && report.sections.length === 0) {
          wealthMissingCases.push(
            diagnoseMissingWealthReading(snapshot, interpretation, registry, report, stamp),
          );
        }
      }
      const temporal = buildThreeTemporalMenusBirthReading(birth,{
        requestId:'500-sample-audit-' + i,
        targetYear:2026,
        targetMonth:10,
        referenceDateTime:REFERENCE,
      });
      if (temporal.calculationHash !== chartKey) {
        throw new Error('Time menus did not preserve canonical calculation hash');
      }
      const three = temporalEntries(temporal);
      for (let t=0;t<3;t++) rows[DOMAIN_NAMES[5+t]].push({...three[t],birth:stamp,calculationHash:chartKey});
    } catch(error) {
      failures.push({birth:stamp,error:String(error?.stack ?? error).slice(0,1200)});
    }
    if ((i+1)%100===0) process.stdout.write('SAJU500_PROGRESS ' + (i+1) + '/500\n');
  }
  const sameChart = [...chartHashGroups.values()].filter(x=>x.length>1);
  const result = {
    spec:'500 deterministic pseudorandom real solar birth dates, times and minutes; 8 menu engines; fixed 2026-10 year/month; no partner/family/question',
    seed:'0x5a1a2026',
    count:COUNT,
    uniqueBirthDateTimes:inputs.size,
    attempted:COUNT,
    failedCases:failures.length,
    failureExamples:failures.slice(0,10),
    uniqueCalculationHashes:chartHashGroups.size,
    sameCalculationHashGroups:sameChart.slice(0,10),
    elapsedMs:Date.now()-startedAt,
    menuResults:Object.fromEntries(DOMAIN_NAMES.map(name=>[name,summarize(rows[name])])),
    rootCauseDiagnostics: {
      version: ROOT_CAUSE_AUDIT_VERSION,
      wealth: summarizeMissingWealthCauses(wealthMissingCases),
      annualRepetition: analyzeTemporalRepetition(rows['올해']),
      monthlyRepetition: analyzeTemporalRepetition(rows['이번 달']),
      annualMeaningRepetition: analyzeTemporalMeaningRepetition(rows['올해']),
      monthlyMeaningRepetition: analyzeTemporalMeaningRepetition(rows['이번 달']),
    },
    interpretationCaveat:'Exact Korean text uniqueness is not semantic uniqueness. Meaning profile counts are a conservative proxy based on actual emitted claim patterns. Structural Dayun intervals are not independently authorized life-stage forecasts. These results are internal research only.',
    permissions:{mayPublish:false,maySell:false,mayCallOfficial:false},
  };
  const outfile=process.argv[2];
  if(outfile) writeFileSync(outfile,JSON.stringify(result,null,2)+'\n','utf8');
  process.stdout.write('SAJU500_ROOT_CAUSE_SUMMARY '+JSON.stringify({
    wealthMissing: result.rootCauseDiagnostics.wealth.missingCaseCount,
    missingCauses: result.rootCauseDiagnostics.wealth.byCause,
    missingWithSourceContext: result.rootCauseDiagnostics.wealth.casesWithExistingSourceContext,
    remediationGroups: result.rootCauseDiagnostics.wealth.remediation.groupCount,
    remediationTargets: result.rootCauseDiagnostics.wealth.remediation.byRemediationTarget,
    annualRepeated: result.rootCauseDiagnostics.annualRepetition.casesInRepeatedGroups,
    monthlyRepeated: result.rootCauseDiagnostics.monthlyRepetition.casesInRepeatedGroups,
  })+'\n');
  process.stdout.write('SAJU500_RESULT_JSON '+JSON.stringify(result)+'\n');
  if(inputs.size!==COUNT || failures.length || DOMAIN_NAMES.some(name=>rows[name].length!==COUNT) ||
      !result.rootCauseDiagnostics.wealth.allCasesHaveExplicitCause ||
      result.rootCauseDiagnostics.wealth.missingCaseCount !==
        result.menuResults['재물'].withoutReadableText ||
      result.rootCauseDiagnostics.annualRepetition.casesInRepeatedGroups !==
        result.menuResults['올해'].exactText.casesInRepeatedGroups ||
      result.rootCauseDiagnostics.monthlyRepetition.casesInRepeatedGroups !==
        result.menuResults['이번 달'].exactText.casesInRepeatedGroups ||
      result.rootCauseDiagnostics.annualMeaningRepetition.casesInRepeatedGroups !==
        result.menuResults['올해'].meaningProfile.casesInRepeatedGroups ||
      result.rootCauseDiagnostics.monthlyMeaningRepetition.casesInRepeatedGroups !==
        result.menuResults['이번 달'].meaningProfile.casesInRepeatedGroups ||
      result.rootCauseDiagnostics.wealth.remediation.caseCount !== wealthMissingCases.length) {
    process.exitCode=1;
  }
  return result;
}
if (process.argv[1] && /saju-500-eight-menu-audit\.mjs$/u.test(process.argv[1])) runFiveHundredSajuAudit();
