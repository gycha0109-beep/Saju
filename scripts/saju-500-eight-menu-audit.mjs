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
import { buildTemporalResearchMenuReadings } from '../dist/preview/temporal-research-menu-reading.js';
import { renderNatalFiveDomainMultifactorResearchHtml } from '../dist/preview/natal-five-domain-multifactor-reader.js';
import {
  diagnoseMissingWealthReading,
  analyzeTemporalRepetition,
  analyzeTemporalMeaningRepetition,
  analyzeTemporalConsumedT9Meaning,
  analyzeTemporalStructuralEvidenceVariation,
  analyzeTemporalNatalT5Variation,
  summarizeMissingWealthCauses,
  summarizeWealthConsumerEvidence,
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
/** The consumer HTML safely escapes the original source-owned Korean prose.
 * Audit the actual rendered representation, not an unescaped JS string. */
function escapedHtmlText(value) {
  return value.replace(/[&<>"']/gu, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}
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
/**
 * Existing source-qualified T5 Claims from the SAME natal engine execution.
 * Do not combine channels, inspect unauthorized hidden stems, or derive new
 * period interpretations. Store only actually observed qualified positions.
 */
function sourceBoundNatalT5(snapshot, execution) {
  const fact = snapshot.derivedFacts.tenGods;
  if (fact.status !== 'resolved') return [];
  const families = {
    PEER: ['비견', '겁재'], RESOURCE: ['정인', '편인'],
    OUTPUT: ['식신', '상관'], WEALTH: ['정재', '편재'],
    OFFICER: ['정관', '편관'],
  };
  return execution.claims.filter(c => c.state === 'active' &&
    c.taxonomy.tier === 'T5' && c.snapshotId === snapshot.snapshotId &&
    c.scenarioRef === undefined && c.sourceRefs.length > 0 &&
    /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u.test(c.claimType))
    .map(claim => {
      const match = /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u.exec(claim.claimType);
      const family = match[1], channel = match[2];
      const key = channel === 'VISIBLE_STEMS' ? 'stem' : 'branch';
      const slots = channel === 'VISIBLE_STEMS' ? ['year', 'month', 'hour'] : ['year', 'month', 'day', 'hour'];
      const observed = slots.flatMap(slot => {
        const tenGod = fact.value[slot][key];
        return tenGod?.status === 'resolved' && families[family].includes(tenGod.value)
          ? [{factPath: 'derivedFacts.tenGods.value.' + slot + '.' + key + '.value', tenGod:tenGod.value}]
          : [];
      });
      if (!observed.length) throw new Error('T5 source audit has no matching observed natal evidence: ' + claim.claimType);
      return {claimType:claim.claimType, sourceIds:[...claim.sourceRefs], observed};
    }).sort((a,b)=>a.claimType.localeCompare(b.claimType));
}

function temporalEntries(result, natalT5) {
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
    natalT5,
    consumedT9:annual.map((section, index) => {
      const evidence=report.annualExecutedEvidence[index];
      if (!evidence || evidence.semanticKey !== section.id) {
        throw new Error('Annual audit cannot guess missing selected T9 semantics');
      }
      return {
        kind:section.kind,
        claimType:evidence.claimType,
        semanticKey:evidence.semanticKey,
        ...(section.kind === 'core' ? {tenGod:report.annual.annualStemTenGod} : {
          relatedPillar:section.relatedPillar,
          relation:section.observedClash?.relation ?? section.observedCombination?.relation,
        }),
        ruleIds:[...evidence.ruleIds],
        methodologyId:evidence.methodologyId,
        sourceIds:[...evidence.sourceIds],
        factPaths:[...evidence.factPaths],
      };
    }),
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
    natalT5,
    consumedT9:monthly.map(section => ({
      kind:section.kind,
      segmentId:section.segmentId,
      claimType:section.claimType,
      semanticKey:section.semanticKey,
      ...(section.kind === 'theme' ? {tenGod:section.tenGod} : {
        relatedPillar:section.relatedPillar,
        relation:section.observedClash?.relation ?? section.observedCombination?.relation,
      }),
      ruleIds:[...section.ruleIds],
      methodologyId:section.methodologyId,
      sourceIds:[...section.sourceIds],
      factPaths:[...section.factPaths],
    })),
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
  const wealthConsumerCases = [];
  const wealthCrossOfficerCases = [];
  const wealthCrossResourceCases = [];
  const wealthCrossPeerCases = [];
  const generalT5ContextCases = [];
  const generalTensionFirstScreenCases = [];
  const wealthIndependentLimitedCases = [];
  const wealthPartialCoreUnusedT5Cases = [];
  const startedAt = Date.now();
  let annualMenuProvenanceChecked = 0;
  let monthlyMenuProvenanceChecked = 0;
  let annualCurrentFocusChecked = 0;
  const annualSixCombinationCases = [];
  let monthlyCurrentFocusChecked = 0;
  const monthlySixCombinationCases = [];
  const currentMonthlyEvidencePairs = [];
  let threeMenuT5Available = 0;
  let threeMenuT5WithoutT8 = 0;
  for (let i=0; i<COUNT; i++) {
    const {stamp, birth} = sampleBirth(inputs);
    try {
      const snapshot = calculateCanonicalSajuSnapshot(birth, PRODUCTION_DEFAULT_CALCULATION_POLICY, {now});
      const chartKey = snapshot.calculationHash;
      const existing = chartHashGroups.get(chartKey) ?? [];
      existing.push(stamp);
      chartHashGroups.set(chartKey,existing);
      let natalT5 = [];
      const natalReports = {};
      for (const domain of NATAL) {
        const registry = registries[domain];
        const interpretation = runInterpretation(snapshot,registry,{now});
        if (domain === 'general') natalT5 = sourceBoundNatalT5(snapshot, interpretation);
        const report = renderers[domain](snapshot, interpretation, registry);
        natalReports[domain] = report;
        if (report.snapshotId !== snapshot.snapshotId || report.calculationHash !== chartKey) {
          throw new Error(domain + ' did not use the same exact natal snapshot');
        }
        rows[({
          general:'전체 사주', career:'직업·커리어', wealth:'재물',
          relationship:'연애·관계', business:'사업',
        })[domain]].push({...natalEntry(report),birth:stamp,calculationHash:chartKey});
        if (domain === 'general') {
          const context = report.availableThemeContext;
          const noGeneralT8 = report.sections.length === 0 &&
            report.state === 'insufficient';
          const tensionOnly = report.state === 'partial' &&
            report.sections.length === 1 && report.sections[0]?.axis === 'tension';
          const hasPartialCore = report.state === 'partial' &&
            report.readingGuide !== undefined && report.sections.length > 0 &&
            report.sections.length < 3 && report.sections[0]?.axis !== 'tension';
          const alreadyUsedT5 = new Set(
            report.sections.flatMap(section => section.upstreamClaimIds));
          if (context !== undefined && (
            !(noGeneralT8 || tensionOnly || hasPartialCore) ||
            context.wholeChartSynthesisAuthorized !== false ||
            context.themes.length === 0 ||
            context.themes.some(theme =>
              !theme.claimId || alreadyUsedT5.has(theme.claimId) ||
              theme.observedFactPaths.some(path =>
                report.sections.some(section => section.observedFactPaths.includes(path))) ||
              !theme.claimType.startsWith('TEN_GOD_') ||
              theme.sourceIds.length === 0 || theme.ruleIds.length === 0 ||
              !theme.methodologyId || theme.observedFactPaths.length === 0 ||
              theme.observedFactPaths.length !== theme.observedPositions.length)
          )) throw new Error('General bounded T5 context must be sourced and never replace T8');
          generalT5ContextCases.push({
            birth: stamp,
            withoutGeneralT8: report.sections.length === 0,
            partialTensionWithUnusedT5: tensionOnly && context !== undefined,
            partialCoreWithUnusedT5: hasPartialCore && context !== undefined,
            withSourcedT5Context: context !== undefined,
            sourceThemeCount: context?.themes.length ?? 0,
            sourceClaimTypes: context?.themes.map(theme => theme.claimType) ?? [],
            sourceFactPaths: context?.themes.flatMap(theme => theme.observedFactPaths) ?? [],
          });
        }
        if (domain === 'wealth') {
          wealthConsumerCases.push({
            ...natalEntry(report), birth:stamp, calculationHash:chartKey,
            missingReason:report.missing[0] ?? null,
            ...(report.availableThemeContext === undefined ? {} : {
              boundedT5Context: {
                paragraph:report.availableThemeContext.paragraph,
                wealthConclusionAuthorized:report.availableThemeContext.wealthConclusionAuthorized,
                hiddenWealthT5Boundary:report.availableThemeContext.hiddenWealthT5Boundary ?? null,
                themes:report.availableThemeContext.themes.map(theme => ({
                  claimId:theme.claimId,
                  claimType:theme.claimType,
                  sourceIds:[...theme.sourceIds],
                  ruleIds:[...theme.ruleIds],
                  methodologyId:theme.methodologyId,
                  observedFactPaths:[...theme.observedFactPaths],
                })),
              },
            }),
          });
        }
        if (domain === 'wealth') {
          // Count only actually selected, reader-visible T8 meanings, not
          // all eligible rules or textual variation in their dates/positions.
          for (const section of report.sections.filter(item =>
            item.pattern === 'WEALTH_OFFICER' && item.channel === 'cross_channel')) {
            const claim = interpretation.claims.find(item =>
              item.state === 'active' && item.claimType === section.claimType &&
              item.snapshotId === snapshot.snapshotId);
            const familyChannels = claim?.value?.familyChannels;
            const wealthChannel = familyChannels?.wealth;
            const officerChannel = familyChannels?.officer;
            const upstreamTypes = section.upstreamClaimIds.map(id =>
              interpretation.claims.find(item => item.claimId === id)?.claimType);
            const expectedTypes = [
              'TEN_GOD_WEALTH_' + String(wealthChannel).toUpperCase() + '_THEME',
              'TEN_GOD_OFFICER_' + String(officerChannel).toUpperCase() + '_THEME',
            ];
            if (!claim || !['visible_stems','branches'].includes(wealthChannel) ||
                !['visible_stems','branches'].includes(officerChannel) ||
                wealthChannel === officerChannel ||
                JSON.stringify([...upstreamTypes].sort()) !==
                  JSON.stringify(expectedTypes.sort()) ||
                section.sourceIds.length !== 2 || !section.ruleId ||
                section.observedFactPaths.length < 2 ||
                !section.observedFactPaths.some(path => path.endsWith('.stem.value')) ||
                !section.observedFactPaths.some(path => path.endsWith('.branch.value')) ||
                !section.paragraph.includes('재성과 관성은 동일 관측 채널이 아니라')) {
              throw new Error('Cross-channel Wealth-to-Officer T8 lacks its executed T5 and original Korean meaning');
            }
            wealthCrossOfficerCases.push({
              birth:stamp, calculationHash:chartKey,
              claimType:section.claimType, upstreamClaimTypes:upstreamTypes,
              ruleId:section.ruleId, sourceIds:section.sourceIds,
              observedFactPaths:section.observedFactPaths,
              headline:section.headline, paragraph:section.paragraph,
            });
          }
          for (const section of report.sections.filter(item =>
            item.pattern === 'WEALTH_RESOURCE' && item.channel === 'cross_channel')) {
            const claim = interpretation.claims.find(item =>
              item.state === 'active' && item.claimType === section.claimType &&
              item.snapshotId === snapshot.snapshotId);
            const familyChannels = claim?.value?.familyChannels;
            const wealthChannel = familyChannels?.wealth;
            const resourceChannel = familyChannels?.resource;
            const upstreamTypes = section.upstreamClaimIds.map(id =>
              interpretation.claims.find(item => item.claimId === id)?.claimType);
            const expectedTypes = [
              'TEN_GOD_WEALTH_' + String(wealthChannel).toUpperCase() + '_THEME',
              'TEN_GOD_RESOURCE_' + String(resourceChannel).toUpperCase() + '_THEME',
            ];
            if (!claim || !['visible_stems','branches'].includes(wealthChannel) ||
                !['visible_stems','branches'].includes(resourceChannel) ||
                wealthChannel === resourceChannel ||
                JSON.stringify([...upstreamTypes].sort()) !==
                  JSON.stringify(expectedTypes.sort()) ||
                section.sourceIds.length !== 2 || !section.ruleId ||
                section.observedFactPaths.length < 2 ||
                !section.observedFactPaths.some(path => path.endsWith('.stem.value')) ||
                !section.observedFactPaths.some(path => path.endsWith('.branch.value')) ||
                !section.paragraph.includes('재성과 인성은 동일 관측 채널이 아니라')) {
              throw new Error('Cross-channel Wealth-to-Resource T8 lacks its executed T5 and original Korean meaning');
            }
            wealthCrossResourceCases.push({
              birth:stamp, calculationHash:chartKey,
              claimType:section.claimType, upstreamClaimTypes:upstreamTypes,
              ruleId:section.ruleId, sourceIds:section.sourceIds,
              observedFactPaths:section.observedFactPaths,
              headline:section.headline, paragraph:section.paragraph,
            });
          }
        }

          for (const section of report.sections.filter(item =>
            item.pattern === 'PEER_WEALTH' && item.channel === 'cross_channel')) {
            const claim = interpretation.claims.find(item =>
              item.state === 'active' && item.claimType === section.claimType &&
              item.snapshotId === snapshot.snapshotId);
            const peer = claim?.value?.familyChannels?.peer;
            const wealth = claim?.value?.familyChannels?.wealth;
            const upstream = section.upstreamClaimIds.map(id =>
              interpretation.claims.find(item => item.claimId === id)?.claimType);
            const expected = [
              'TEN_GOD_PEER_' + String(peer).toUpperCase() + '_THEME',
              'TEN_GOD_WEALTH_' + String(wealth).toUpperCase() + '_THEME',
            ];
            if (!claim || !['visible_stems','branches'].includes(peer) ||
                !['visible_stems','branches'].includes(wealth) || peer === wealth ||
                section.axis !== 'tension' ||
                JSON.stringify([...upstream].sort()) !== JSON.stringify(expected.sort()) ||
                section.sourceIds.length !== 2 || !section.ruleId ||
                section.observedFactPaths.length < 2 ||
                !section.observedFactPaths.some(path => path.endsWith('.stem.value')) ||
                !section.observedFactPaths.some(path => path.endsWith('.branch.value')) ||
                !section.paragraph.includes('비겁과 재성은 동일 관측 채널이 아니라') ||
                !section.paragraph.includes('실제 자산 손실')) {
              throw new Error('Selected Peer-to-Wealth cross-channel T8 lost actual T5 or its bounded meaning');
            }
            wealthCrossPeerCases.push({
              birth:stamp, calculationHash:chartKey,
              claimType:section.claimType, upstreamClaimTypes:upstream,
              ruleId:section.ruleId, sourceIds:section.sourceIds,
              observedFactPaths:section.observedFactPaths,
              headline:section.headline, paragraph:section.paragraph,
            });
          }
        if (domain === 'wealth' && report.sections.length === 0) {
          const context = report.availableThemeContext;
          const membership = context?.hiddenWealthMembership ?? [];
          const expected = context?.hiddenWealthEvidenceStatus === 'unavailable'
            ? 'membership_unavailable'
            : membership.length > 0 ? 'membership_only' : 'no_membership_observed';
          if (context?.hiddenWealthT5Boundary !== expected ||
              context.themes.some(theme => theme.family === 'wealth')) {
            throw new Error('Missing Wealth T8 must distinguish hidden membership from direct T5');
          }
          wealthMissingCases.push(
            diagnoseMissingWealthReading(snapshot, interpretation, registry, report, stamp),
          );
        }
      }
      // The five-domain HTML can only be checked after all five reports exist.
      const missingWealthReport = natalReports.wealth;
      if (missingWealthReport.sections.length === 0) {
        const hiddenContext = missingWealthReport.availableThemeContext;
        const expected = hiddenContext?.hiddenWealthT5Boundary;
        const html = renderNatalFiveDomainMultifactorResearchHtml(snapshot, natalReports);
        const overview = html.split('</nav>')[0] ?? '';
        const firstT5 = hiddenContext?.themes[0];
        if (firstT5 && (!overview.includes('재물 종합 결론 보류 · 출처 있는 십신 부분풀이: ') ||
            !overview.includes(firstT5.headline) ||
            !overview.includes(firstT5.summary))) {
          throw new Error('Missing Wealth T8 hid its real source-owned T5 Korean meaning from the first screen');
        }
        const card = html.split('<h2 id="domain-wealth">')[1]?.split('</article>')[0];
        if (!card || !card.includes('aria-label="지장간 계산과 재물운 해석의 구분"') ||
            !card.includes('새로운 운세 주장이 아닙니다') ||
            (expected === 'membership_only' && !card.includes('재성 해석 근거(T5)가 아닙니다')) ||
            (expected === 'no_membership_observed' && !card.includes('재산이나 돈이 없다는 뜻이 아니며'))) {
          throw new Error('Missing Wealth T8 hidden membership boundary was not visible');
        }
      }
      const generalPartial = natalReports.general;
      if (generalPartial.state === 'partial' &&
          generalPartial.sections.length === 1 &&
          generalPartial.sections[0].axis === 'tension') {
        const guide = generalPartial.readingGuide;
        const chosen = generalPartial.sections[0];
        if (guide === undefined || guide.sourceClaimType !== chosen.claimType ||
            guide.supporting.length !== 0 ||
            guide.ruleIds.length !== 1 || guide.ruleIds[0] !== chosen.ruleId ||
            guide.sourceIds.length !== chosen.sourceIds.length ||
            chosen.sourceIds.some(id => !guide.sourceIds.includes(id)) ||
            !guide.paragraph.includes(chosen.paragraph)) {
          throw new Error('General tension-only reading must retain its original limited guide');
        }
        if (generalTensionFirstScreenCases.length < 5) {
          const html = renderNatalFiveDomainMultifactorResearchHtml(snapshot, natalReports);
          const generalCard = html.split('<h2 id="domain-general">')[1]?.split('</article>')[0];
          const firstScreen = generalCard?.split('<details class="full-claim-evidence"')[0];
          if (!firstScreen ||
              !firstScreen.includes('총운의 중심 결론은 보류합니다') ||
              !firstScreen.includes('<p>' + escapedHtmlText(chosen.paragraph) + '</p>') ||
              !generalCard.includes(chosen.ruleId) ||
              !generalCard.includes(chosen.sourceIds[0])) {
            throw new Error('General source-owned tension T8 was lost on the first screen');
          }
        }
        generalTensionFirstScreenCases.push({
          birth:stamp, calculationHash:chartKey,
          claimType:generalPartial.sections[0].claimType,
          sourceIds:generalPartial.sections[0].sourceIds,
          factPaths:generalPartial.sections[0].observedFactPaths,
        });
      }
      const selectedWealth = natalReports.wealth;
      const partial = selectedWealth.sections;
      const hasPartialCore = selectedWealth.state === 'partial' &&
        selectedWealth.readingGuide !== undefined &&
        partial.length > 0 && partial.length < 3 &&
        ['core','creation','management','planning'].includes(partial[0].axis);
      const unusedT5 = selectedWealth.availableThemeContext;
      if (hasPartialCore && unusedT5 !== undefined) {
        const consumed = new Set(partial.flatMap(section => section.upstreamClaimIds));
        const usedPaths = new Set(partial.flatMap(section => section.observedFactPaths));
        if (unusedT5.wealthConclusionAuthorized !== false ||
            !unusedT5.paragraph.includes('부족한 독립 보조 근거를 채우지 않으며') ||
            unusedT5.themes.length === 0 ||
            unusedT5.themes.some(theme =>
              consumed.has(theme.claimId) ||
              theme.observedFactPaths.some(path => usedPaths.has(path)) ||
              theme.ruleIds.length === 0 || !theme.methodologyId ||
              theme.sourceIds.length === 0)) {
          throw new Error('Wealth partial core reused T8 as a new unsupported T5 support');
        }
        if (wealthPartialCoreUnusedT5Cases.length < 5) {
          const html = renderNatalFiveDomainMultifactorResearchHtml(snapshot, natalReports);
          const wealthCard = html.split('<h2 id="domain-wealth">')[1]?.split('</article>')[0];
          if (!wealthCard || !wealthCard.includes(
            '<p>' + escapedHtmlText(unusedT5.paragraph) + '</p>')) {
            throw new Error('Wealth partial-core unconsumed T5 was lost at consumer rendering');
          }
        }
        wealthPartialCoreUnusedT5Cases.push({
          birth:stamp, calculationHash:chartKey,
          coreClaimType:partial[0].claimType, selectedT8Count:partial.length,
          unconsumedT5Count:unusedT5.themes.length,
          sourceClaimTypes:unusedT5.themes.map(theme=>theme.claimType),
        });
      }
      if (partial[0]?.axis === 'tension' && partial[1]?.axis === 'context') {
        const firstPaths = new Set(partial[0].observedFactPaths);
        const genuinelyNew = partial[1].observedFactPaths.filter(path => !firstPaths.has(path));
        if (selectedWealth.state !== 'partial' || selectedWealth.readingGuide !== undefined ||
            partial.length !== 2 || genuinelyNew.length === 0 ||
            partial.some(item => item.sourceIds.length === 0 ||
              item.upstreamClaimIds.length < 2 || item.observedFactPaths.length < 2)) {
          throw new Error('Wealth dual partial meaning is not independent source-owned T8');
        }
        const html = renderNatalFiveDomainMultifactorResearchHtml(snapshot, natalReports);
        const wealthCard = html.split('<h2 id="domain-wealth">')[1]?.split('</article>')[0];
        const wealthFirstScreen = wealthCard?.split('<details class="full-claim-evidence"')[0];
        if (!wealthCard || !wealthFirstScreen ||
          !wealthFirstScreen.includes('aria-label="재물운 명식별 풀이 본문"') ||
          !wealthFirstScreen.includes('재물운 중심 결론이 확립되지 않았습니다') ||
          partial.some(item =>
          !wealthFirstScreen.includes('<p>' + escapedHtmlText(item.paragraph) + '</p>')) ||
          partial.some(item =>
          !wealthCard.includes('<h3>' + escapedHtmlText(item.headline) + '</h3>') ||
          !wealthCard.includes('<p>' + escapedHtmlText(item.paragraph) + '</p>')) ||
          selectedWealth.availableThemeContext !== undefined &&
          !wealthCard.includes('<p>' +
            escapedHtmlText(selectedWealth.availableThemeContext.paragraph) + '</p>')) {
          throw new Error('Selected Wealth partial interpretation was lost at consumer rendering');
        }
        wealthIndependentLimitedCases.push({
          birth: stamp,
          calculationHash: chartKey,
          status: selectedWealth.state,
          tension: {
            claimType: partial[0].claimType, sourceIds: partial[0].sourceIds,
            factPaths: partial[0].observedFactPaths,
          },
          independentContext: {
            claimType: partial[1].claimType, sourceIds: partial[1].sourceIds,
            newFactPaths: genuinelyNew,
          },
          unusedSourcedT5Themes: selectedWealth.availableThemeContext?.themes.length ?? 0,
          renderedBoth: true,
        });
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
      const [annualMenu, monthlyMenu] = buildTemporalResearchMenuReadings({
        annualMonthly: temporal.annualMonthly.report,
      });
      const originals = temporal.annualMonthly.report.annualExecutedEvidence;
      if (annualMenu?.menuId !== 'annual' ||
          annualMenu.authority.mayCallOfficial ||
          annualMenu.authority.mayPublish || annualMenu.authority.maySell ||
          annualMenu.authority.mayMarkMenuAvailable ||
          annualMenu.sections.length !== originals.length ||
          annualMenu.sections.some((section, index) => {
            const original = originals[index];
            const profile = temporal.annualMonthly.report.annual.sections[index];
            return section.evidenceKind !== 'annual_research_profile' ||
              section.claimId !== original?.claimId ||
              section.researchProfileKey !== original?.semanticKey ||
              section.methodologyId !== original?.methodologyId ||
              JSON.stringify(section.ruleIds) !== JSON.stringify(original?.ruleIds) ||
              JSON.stringify(section.sourceIds) !== JSON.stringify(original?.sourceIds) ||
              JSON.stringify(section.factPaths) !== JSON.stringify(original?.factPaths) ||
              !section.sourceIds.includes(profile?.policySourceId);
          })) {
        throw new Error('Annual menu lost selected Claim/Rule/Methodology/Source in 500-case audit');
      }
      annualMenuProvenanceChecked++;
      const originalMonthly = temporal.annualMonthly.report.monthly.sections;
      if (monthlyMenu?.menuId !== 'monthly' ||
          monthlyMenu.authority.mayCallOfficial ||
          monthlyMenu.authority.mayPublish || monthlyMenu.authority.maySell ||
          monthlyMenu.authority.mayMarkMenuAvailable ||
          monthlyMenu.sections.length !== originalMonthly.length ||
          monthlyMenu.sections.some((section, index) => {
            const original = originalMonthly[index];
            return section.evidenceKind !== 'monthly_t9_research_claim' ||
              section.claimId !== original?.claimId ||
              section.claimType !== original?.claimType ||
              section.semanticKey !== original?.semanticKey ||
              section.methodologyId !== original?.methodologyId ||
              JSON.stringify(section.ruleIds) !== JSON.stringify(original?.ruleIds) ||
              JSON.stringify(section.sourceIds) !== JSON.stringify(original?.sourceIds) ||
              JSON.stringify(section.factPaths) !== JSON.stringify(original?.factPaths) ||
              section.interval?.startsAt !== original?.calculatedInterval.startsAt ||
              section.interval?.endsAtExclusive !== original?.calculatedInterval.endsAt;
          })) {
        throw new Error('Monthly menu lost selected Claim/Rule/Methodology/Source in 500-case audit');
      }
      monthlyMenuProvenanceChecked++;
      // Current focus is a subset of executed T9 claims, not a new result.
      // A repeated basic theme can still have materially different selected
      // clash meanings. Compare source-owned selections, never birth/date IDs.
      const sourceAnnualCurrent = temporal.annualMonthly.report.annualCurrentReading;
      const annualFocus = annualMenu.annualReferenceFocus;
      if (sourceAnnualCurrent.state !== 'in_target_civil_year' ||
          annualFocus?.state !== 'from_ipchun' ||
          annualFocus.currentTheme?.semanticKey !== sourceAnnualCurrent.theme.id ||
          annualFocus.currentTheme?.text !== sourceAnnualCurrent.theme.text ||
          JSON.stringify((annualFocus.currentTensions ?? []).map(s => s.semanticKey)) !==
            JSON.stringify(sourceAnnualCurrent.sourceBoundTensions.map(s => s.id)) ||
          JSON.stringify((annualFocus.currentTensions ?? []).map(s => s.text)) !==
            JSON.stringify(sourceAnnualCurrent.sourceBoundTensions.map(s => s.text)) ||
          JSON.stringify((annualFocus.currentSupports ?? []).map(s => s.semanticKey)) !==
            JSON.stringify(sourceAnnualCurrent.sourceBoundSupports.map(s => s.id)) ||
          JSON.stringify((annualFocus.currentSupports ?? []).map(s => s.text)) !==
            JSON.stringify(sourceAnnualCurrent.sourceBoundSupports.map(s => s.text)) ||
          (annualFocus.currentSupports ?? []).some(s =>
            !s.sourceIds?.includes('SRC-T0-XUANZE-YAOLUE-UPPER') ||
            s.interpretationRole !== 'support')) {
        throw new Error('Annual current focus lost actual selected chart-specific T9 meanings');
      }
      annualCurrentFocusChecked++;
      for (const support of sourceAnnualCurrent.sourceBoundSupports) {
        const index = temporal.annualMonthly.report.annual.sections.indexOf(support);
        const evidence = temporal.annualMonthly.report.annualExecutedEvidence[index];
        if (!evidence ||
            support.kind !== 'support' ||
            support.observedCombination?.relation !== 'six_combination' ||
            support.observedCombination.sourceId !== 'SRC-T0-XUANZE-YAOLUE-UPPER' ||
            !evidence.sourceIds.includes(support.observedCombination.sourceId) ||
            evidence.methodologyId !== support.methodologyId ||
            !evidence.factPaths.includes('temporal.annualBranchRelations.' + support.relatedPillar) ||
            !support.text.includes('육합') || !support.text.includes('합화나 사건 성립의 근거로 사용하지 않습니다')) {
          throw new Error('Annual selected six-combination lost classical source, calculated pair or bounded Korean meaning');
        }
        annualSixCombinationCases.push({
          birth:stamp, calculationHash:chartKey, claimId:evidence.claimId,
          claimType:evidence.claimType, semanticKey:evidence.semanticKey,
          sourceIds:evidence.sourceIds, ruleIds:evidence.ruleIds,
          methodologyId:evidence.methodologyId, factPaths:evidence.factPaths,
          observedCombination:support.observedCombination, text:support.text,
        });
      }
      const sourceMonthCurrent = temporal.annualMonthly.report.monthly.referenceReading;
      const monthFocus = monthlyMenu.referenceFocus;
      if (sourceMonthCurrent.state !== 'in_period' ||
          monthFocus?.state !== 'in_period' ||
          monthFocus.currentSection?.claimId !== sourceMonthCurrent.theme?.claimId ||
          monthFocus.currentSection?.text !== sourceMonthCurrent.theme?.text ||
          JSON.stringify((monthFocus.currentTensions ?? []).map(s => s.claimId)) !==
            JSON.stringify((sourceMonthCurrent.sourceBoundTensions ?? []).map(s => s.claimId)) ||
          JSON.stringify((monthFocus.currentTensions ?? []).map(s => s.text)) !==
            JSON.stringify((sourceMonthCurrent.sourceBoundTensions ?? []).map(s => s.text)) ||
          JSON.stringify((monthFocus.currentSupports ?? []).map(s => s.claimId)) !==
            JSON.stringify((sourceMonthCurrent.sourceBoundSupports ?? []).map(s => s.claimId)) ||
          JSON.stringify((monthFocus.currentSupports ?? []).map(s => s.text)) !==
            JSON.stringify((sourceMonthCurrent.sourceBoundSupports ?? []).map(s => s.text)) ||
          JSON.stringify(monthFocus.unavailableNatalPillars ?? []) !==
            JSON.stringify(sourceMonthCurrent.unavailableNatalPillars ?? [])) {
        throw new Error('Monthly current focus lost source-selected natal-branch T9 meanings');
      }
      monthlyCurrentFocusChecked++;
      for (const support of sourceMonthCurrent.sourceBoundSupports ?? []) {
        const projected = monthFocus.currentSupports?.find(s => s.claimId === support.claimId);
        if (!projected ||
            support.kind !== 'support' ||
            support.observedCombination?.relation !== 'six_combination' ||
            support.observedCombination.sourceId !== 'SRC-T0-XUANZE-YAOLUE-UPPER' ||
            !projected.sourceIds.includes(support.observedCombination.sourceId) ||
            projected.methodologyId !== 'M-GENERAL-MONTHLY-T9-SIX-COMBINATION-SOURCE-V1' ||
            projected.interpretationRole !== 'support' ||
            !support.factPaths.includes('temporal.segmentsById.' + support.segmentId +
              '.monthlyBranchRelations.' + support.relatedPillar + '.relation') ||
            !support.text.includes('육합') ||
            !support.text.includes('합화나 실제 사건의 근거가 아닙니다')) {
          throw new Error('Current monthly six-combination lost selected Jeol interval evidence or Korean interpretation');
        }
        monthlySixCombinationCases.push({
          birth:stamp, calculationHash:chartKey,
          claimId:support.claimId, sourceIds:support.sourceIds,
          ruleIds:support.ruleIds, methodologyId:support.methodologyId,
          factPaths:support.factPaths, observedCombination:support.observedCombination,
          segmentId:support.segmentId, text:support.text,
        });
      }
      currentMonthlyEvidencePairs.push({
        birth:stamp,
        calculationHash:chartKey,
        currentThemeKey:JSON.stringify([
          monthFocus.currentSection.claimType,monthFocus.currentSection.semanticKey,
          monthFocus.currentSection.methodologyId,
        ]),
        currentTensionKey:JSON.stringify((monthFocus.currentTensions ?? [])
          .map(section=>[section.claimType,section.semanticKey,section.methodologyId,
            ...section.ruleIds]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)))),
        selectedKoreanText:[monthFocus.currentSection,
          ...(monthFocus.currentTensions ?? [])].map(section=>section.text).join(' '),
        selectedSourceFacts:(monthFocus.currentTensions ?? []).map(section=>({
          claimId:section.claimId,semanticKey:section.semanticKey,
          ruleIds:[...section.ruleIds],sourceIds:[...section.sourceIds],
          factPaths:[...section.factPaths],
        })),
      });
      const sharedNatal = temporal.annualMonthly.report.natalContext;
      const t5 = sharedNatal.availableThemeContext;
      if (t5 !== undefined) {
        const panel = temporal.html.split('<section id="natal-reference"')[1]
          ?.split('<section id="annual"')[0];
        if (!panel || !panel.includes('aria-label="원국에서 확인된 기존 십신 부분풀이"') ||
            !panel.includes('이를 연·월운이나 대운의 새로운 의미로 합치지 않습니다') ||
            t5.themes.some(theme =>
              !panel.includes(escapedHtmlText(theme.summary)) ||
              !panel.includes(escapedHtmlText(theme.claimId)) ||
              !panel.includes(escapedHtmlText(theme.ruleIds[0])) ||
              !panel.includes(escapedHtmlText(theme.sourceIds[0])) ||
              !panel.includes(escapedHtmlText(theme.observedPositions[0])) ||
              !panel.includes(escapedHtmlText(theme.observedFactPaths[0])))) {
          throw new Error('Three-menu reader dropped original natal T5 partial meaning and provenance');
        }
        threeMenuT5Available++;
        if (sharedNatal.sections.length === 0) {
          if (sharedNatal.state !== 'insufficient') {
            throw new Error('T5-only report cannot be promoted to whole-chart T8');
          }
          threeMenuT5WithoutT8++;
        }
      }
      const three = temporalEntries(temporal, natalT5);
      for (let t=0;t<3;t++) rows[DOMAIN_NAMES[5+t]].push({...three[t],birth:stamp,calculationHash:chartKey});
    } catch(error) {
      failures.push({birth:stamp,error:String(error?.stack ?? error).slice(0,1200)});
    }
    if ((i+1)%100===0) process.stdout.write('SAJU500_PROGRESS ' + (i+1) + '/500\n');
  }
  const sameChart = [...chartHashGroups.values()].filter(x=>x.length>1);
  const themeGroups = new Map();
  for(const item of currentMonthlyEvidencePairs) {
    const group=themeGroups.get(item.currentThemeKey)??[];
    group.push(item);
    themeGroups.set(item.currentThemeKey,group);
  }
  const meaningfulCurrentMonthContrasts=[];
  for(const [themeKey,group] of themeGroups) {
    for(let i=0;i<group.length;i++) {
      const a=group[i];
      const b=group.find((v,index)=>index>i &&
        v.currentTensionKey!==a.currentTensionKey &&
        v.selectedKoreanText!==a.selectedKoreanText);
      if(b) {
        meaningfulCurrentMonthContrasts.push({
          sameTheme:themeKey,
          distinctSelectedTensions:[a.currentTensionKey,b.currentTensionKey],
          samples:[a,b],
        });
        break;
      }
    }
    if(meaningfulCurrentMonthContrasts.length>=8) break;
  }
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
      wealthConsumerEvidence: summarizeWealthConsumerEvidence(wealthConsumerCases),
      wealthCrossOfficerSelectedMeaning: {
        examined: COUNT,
        selectedCount: wealthCrossOfficerCases.length,
        examples: wealthCrossOfficerCases.slice(0, 8),
        distinction: 'Actually selected T8 source-grounded 財→官殺 with exact opposite-channel Wealth/Officer T5; not new outcome predictions',
      },
      wealthCrossResourceSelectedMeaning: {
        examined: COUNT,
        selectedCount: wealthCrossResourceCases.length,
        examples: wealthCrossResourceCases.slice(0, 8),
        distinction: 'Actually selected T8 source-grounded 財剋印 with exact opposite-channel Wealth/Resource T5; not a money or behavior prediction',
      },
      wealthCrossPeerSelectedMeaning: {
        examined: COUNT,
        selectedCount: wealthCrossPeerCases.length,
        examples: wealthCrossPeerCases.slice(0, 8),
        distinction: 'Actually selected classical 比劫↔財 tension from opposite-channel T5 without event or asset-loss prediction',
      },
      wealthIndependentLimitedContext: {
        examined: COUNT,
        count: wealthIndependentLimitedCases.length,
        cases: wealthIndependentLimitedCases,
      },
      wealthPartialCoreUnusedT5: {
        examined: COUNT,
        count: wealthPartialCoreUnusedT5Cases.length,
        examples: wealthPartialCoreUnusedT5Cases.slice(0, 6),
      },
      generalBoundedT5OnNoT8: {
        examined: generalT5ContextCases.length,
        withoutGeneralT8: generalT5ContextCases.filter(c => c.withoutGeneralT8).length,
        withActualSourcedT5Only: generalT5ContextCases.filter(c =>
          c.withoutGeneralT8 && c.withSourcedT5Context).length,
        withoutAnySourcedT5: generalT5ContextCases.filter(c =>
          c.withoutGeneralT8 && !c.withSourcedT5Context).length,
        examples: generalT5ContextCases.filter(c => c.withoutGeneralT8)
          .slice(0, 6),
      },
      generalTensionFirstScreen: {
        examined: COUNT,
        count: generalTensionFirstScreenCases.length,
        examples: generalTensionFirstScreenCases.slice(0, 6),
      },
      generalPartialTensionWithUnusedT5: {
        examined: generalT5ContextCases.length,
        count: generalT5ContextCases.filter(c => c.partialTensionWithUnusedT5).length,
        examples: generalT5ContextCases.filter(c => c.partialTensionWithUnusedT5)
          .slice(0, 6),
      },
      generalPartialCoreWithUnusedT5: {
        examined: generalT5ContextCases.length,
        count: generalT5ContextCases.filter(c => c.partialCoreWithUnusedT5).length,
        examples: generalT5ContextCases.filter(c => c.partialCoreWithUnusedT5)
          .slice(0, 6),
      },
      annualMenuT9Provenance: {
        examined: COUNT,
        exactSelectedClaimRuleMethodSource: annualMenuProvenanceChecked,
        researchOnlyNoPromotion: true,
      },
      monthlyMenuT9Provenance: {
        examined: COUNT,
        exactSelectedClaimRuleMethodSource: monthlyMenuProvenanceChecked,
        researchOnlyNoPromotion: true,
      },
      currentAnnualT9Focus: {examined:COUNT,exactSourceSelected:annualCurrentFocusChecked},
      annualSixCombinationSelectedMeaning: {
        examined: COUNT, selectedCount: annualSixCombinationCases.length,
        examples: annualSixCombinationCases.slice(0, 8),
        interpretationBoundary: 'Selected T9 structure-only 六合, no 合化 or outcome claim',
      },
      monthlySixCombinationSelectedMeaning: {
        examined: COUNT, selectedCount: monthlySixCombinationCases.length,
        examples: monthlySixCombinationCases.slice(0, 8),
        interpretationBoundary: 'Exact selected Jeol phase T9 六合 with classical source, no annual T9 inheritance',
      },
      currentMonthlyT9Focus: {
        examined:COUNT,exactSourceSelected:monthlyCurrentFocusChecked,
        sameThemeDifferentActualT9MeaningPairs: meaningfulCurrentMonthContrasts,
        qualification:'Identical basic monthly theme, different executed T9 clash Claims in the current solar-term interval; never interpreted as new favorable/unfavorable or event outcomes',
      },
      threeMenuSourceBoundNatalT5: {
        examined: COUNT,
        withDisplayedOriginalT5: threeMenuT5Available,
        withoutT8ButWithDisplayedT5: threeMenuT5WithoutT8,
        noTemporalMeaningPromotion: true,
      },
      annualRepetition: analyzeTemporalRepetition(rows['올해']),
      monthlyRepetition: analyzeTemporalRepetition(rows['이번 달']),
      annualMeaningRepetition: analyzeTemporalMeaningRepetition(rows['올해']),
      monthlyMeaningRepetition: analyzeTemporalMeaningRepetition(rows['이번 달']),
      annualConsumedT9Meaning: analyzeTemporalConsumedT9Meaning(rows['올해'],'annual'),
      monthlyConsumedT9Meaning: analyzeTemporalConsumedT9Meaning(rows['이번 달'],'monthly'),
      annualStructuralVariation: analyzeTemporalStructuralEvidenceVariation(rows['올해']),
      monthlyStructuralVariation: analyzeTemporalStructuralEvidenceVariation(rows['이번 달']),
      annualNatalT5Variation: analyzeTemporalNatalT5Variation(rows['올해']),
      monthlyNatalT5Variation: analyzeTemporalNatalT5Variation(rows['이번 달']),
    },
    interpretationCaveat:'Natal withReadableText counts selected source-bound T8 sections, not bounded General/Wealth T5-only partial explanations. General and Wealth T5 are reported separately without upgrading T8 completion. Exact Korean text uniqueness is not semantic uniqueness. Meaning profile counts are a conservative proxy based on actual emitted claim patterns. Structural Dayun intervals are not independently authorized life-stage forecasts. These results are internal research only.',
    permissions:{mayPublish:false,maySell:false,mayCallOfficial:false},
  };
  const outfile=process.argv[2];
  if(outfile) writeFileSync(outfile,JSON.stringify(result,null,2)+'\n','utf8');
  process.stdout.write('SAJU500_ROOT_CAUSE_SUMMARY '+JSON.stringify({
    generalWithoutT8: result.rootCauseDiagnostics.generalBoundedT5OnNoT8.withoutGeneralT8,
    generalNoT8WithSourcedT5: result.rootCauseDiagnostics.generalBoundedT5OnNoT8.withActualSourcedT5Only,
    generalNoT8WithoutSourcedT5: result.rootCauseDiagnostics.generalBoundedT5OnNoT8.withoutAnySourcedT5,
    generalPartialTensionWithUnusedT5: result.rootCauseDiagnostics.generalPartialTensionWithUnusedT5.count,
    generalPartialCoreWithUnusedT5: result.rootCauseDiagnostics.generalPartialCoreWithUnusedT5.count,
    generalTensionFirstScreen: result.rootCauseDiagnostics.generalTensionFirstScreen.count,
    wealthMissing: result.rootCauseDiagnostics.wealth.missingCaseCount,
    wealthCrossOfficerSelected: result.rootCauseDiagnostics.wealthCrossOfficerSelectedMeaning.selectedCount,
    wealthCrossResourceSelected: result.rootCauseDiagnostics.wealthCrossResourceSelectedMeaning.selectedCount,
    wealthCrossPeerSelected: result.rootCauseDiagnostics.wealthCrossPeerSelectedMeaning.selectedCount,
    wealthNoT8ButSourcedT5: result.rootCauseDiagnostics.wealthConsumerEvidence.withBoundedT5ContextInstead,
    wealthNoSourceBoundInterpretiveText: result.rootCauseDiagnostics.wealthConsumerEvidence.withoutAnySourceBoundInterpretiveText,
    wealthIndependentLimitedInterpretations: result.rootCauseDiagnostics.wealthIndependentLimitedContext.count,
    wealthPartialCoreUnusedT5: result.rootCauseDiagnostics.wealthPartialCoreUnusedT5.count,
    missingCauses: result.rootCauseDiagnostics.wealth.byCause,
    missingWithSourceContext: result.rootCauseDiagnostics.wealth.casesWithExistingSourceContext,
    missingWithHiddenWealthMembership: result.rootCauseDiagnostics.wealth.casesWithHiddenWealthMembership,
    observedHiddenWealthStems: result.rootCauseDiagnostics.wealth.hiddenWealthObservationCount,
    hiddenWealthEvidenceStates: result.rootCauseDiagnostics.wealth.remediation.byHiddenWealthEvidenceState,
    remediationGroups: result.rootCauseDiagnostics.wealth.remediation.groupCount,
    remediationTargets: result.rootCauseDiagnostics.wealth.remediation.byRemediationTarget,
    annualMenuExactT9Provenance: result.rootCauseDiagnostics.annualMenuT9Provenance.exactSelectedClaimRuleMethodSource,
    monthlyMenuExactT9Provenance: result.rootCauseDiagnostics.monthlyMenuT9Provenance.exactSelectedClaimRuleMethodSource,
    currentAnnualExactT9:annualCurrentFocusChecked,
    annualSixCombinationSelected:result.rootCauseDiagnostics.annualSixCombinationSelectedMeaning.selectedCount,
    monthlySixCombinationSelected:result.rootCauseDiagnostics.monthlySixCombinationSelectedMeaning.selectedCount,
    currentMonthlyExactT9:monthlyCurrentFocusChecked,
    sameThemeDifferentCurrentT9Pairs:meaningfulCurrentMonthContrasts.length,
    threeMenuDisplayedNatalT5: result.rootCauseDiagnostics.threeMenuSourceBoundNatalT5.withDisplayedOriginalT5,
    threeMenuT5OnlyWithoutT8: result.rootCauseDiagnostics.threeMenuSourceBoundNatalT5.withoutT8ButWithDisplayedT5,
    annualRepeated: result.rootCauseDiagnostics.annualRepetition.casesInRepeatedGroups,
    monthlyRepeated: result.rootCauseDiagnostics.monthlyRepetition.casesInRepeatedGroups,
    annualExecutedMeaningSignatures: result.rootCauseDiagnostics.annualConsumedT9Meaning.distinctExecutedMeaningSignatures,
    monthlyExecutedMeaningSignatures: result.rootCauseDiagnostics.monthlyConsumedT9Meaning.distinctExecutedMeaningSignatures,
    annualDisplayProfilesHidingExecutedMeaning: result.rootCauseDiagnostics.annualConsumedT9Meaning.oldDisplayProfilesHidingDistinctExecutedMeaning,
    monthlyDisplayProfilesHidingExecutedMeaning: result.rootCauseDiagnostics.monthlyConsumedT9Meaning.oldDisplayProfilesHidingDistinctExecutedMeaning,
    annualActualUsedEvidencePatterns: result.rootCauseDiagnostics.annualConsumedT9Meaning.actualEvidencePatternCount,
    monthlyActualUsedEvidencePatterns: result.rootCauseDiagnostics.monthlyConsumedT9Meaning.actualEvidencePatternCount,
    monthlyExtraDisplayProfilesWithoutNewMeaning: result.rootCauseDiagnostics.monthlyConsumedT9Meaning.excessDisplayProfileVariants,
    annualActualMeaningControlledPairs: result.rootCauseDiagnostics.annualConsumedT9Meaning.contrastingMeaningPairs.length,
    monthlyActualMeaningControlledPairs: result.rootCauseDiagnostics.monthlyConsumedT9Meaning.contrastingMeaningPairs.length,
    annualProfilesWithDifferentObservedRelations:
      result.rootCauseDiagnostics.annualStructuralVariation.repeatedMeaningProfilesWithDifferentVerifiedRelations,
    monthlyProfilesWithDifferentObservedRelations:
      result.rootCauseDiagnostics.monthlyStructuralVariation.repeatedMeaningProfilesWithDifferentVerifiedRelations,
    annualProfilesWithDifferentObservedNatalT5:
      result.rootCauseDiagnostics.annualNatalT5Variation.repeatedMeaningProfilesWithDifferentNatalT5Evidence,
    monthlyProfilesWithDifferentObservedNatalT5:
      result.rootCauseDiagnostics.monthlyNatalT5Variation.repeatedMeaningProfilesWithDifferentNatalT5Evidence,
  })+'\n');
  process.stdout.write('SAJU500_RESULT_JSON '+JSON.stringify(result)+'\n');
  if(inputs.size!==COUNT || failures.length ||
      annualMenuProvenanceChecked !== COUNT ||
      monthlyMenuProvenanceChecked !== COUNT ||
      annualCurrentFocusChecked !== COUNT ||
      result.rootCauseDiagnostics.annualSixCombinationSelectedMeaning.examined !== COUNT ||
      result.rootCauseDiagnostics.monthlySixCombinationSelectedMeaning.examined !== COUNT ||
      monthlyCurrentFocusChecked !== COUNT ||
      threeMenuT5WithoutT8 !==
        result.rootCauseDiagnostics.generalBoundedT5OnNoT8.withActualSourcedT5Only ||
      DOMAIN_NAMES.some(name=>rows[name].length!==COUNT) ||
      result.rootCauseDiagnostics.generalBoundedT5OnNoT8.examined !== COUNT ||
      result.rootCauseDiagnostics.generalBoundedT5OnNoT8.withoutGeneralT8 !==
        result.menuResults['전체 사주'].withoutReadableText ||
      result.rootCauseDiagnostics.generalBoundedT5OnNoT8.withActualSourcedT5Only +
        result.rootCauseDiagnostics.generalBoundedT5OnNoT8.withoutAnySourcedT5 !==
          result.rootCauseDiagnostics.generalBoundedT5OnNoT8.withoutGeneralT8 ||
      result.rootCauseDiagnostics.generalPartialTensionWithUnusedT5.examined !== COUNT ||
      !result.rootCauseDiagnostics.wealth.allCasesHaveExplicitCause ||
      result.rootCauseDiagnostics.wealth.missingCaseCount !==
        result.menuResults['재물'].withoutReadableText ||
      result.rootCauseDiagnostics.wealthConsumerEvidence.examined !== COUNT ||
      result.rootCauseDiagnostics.wealthCrossOfficerSelectedMeaning.examined !== COUNT ||
      result.rootCauseDiagnostics.wealthCrossResourceSelectedMeaning.examined !== COUNT ||
      result.rootCauseDiagnostics.wealthCrossPeerSelectedMeaning.examined !== COUNT ||
      result.rootCauseDiagnostics.wealthIndependentLimitedContext.examined !== COUNT ||
      result.rootCauseDiagnostics.wealthIndependentLimitedContext.cases.length !==
        result.rootCauseDiagnostics.wealthIndependentLimitedContext.count ||
      result.rootCauseDiagnostics.wealthConsumerEvidence.withoutWealthT8 !==
        result.rootCauseDiagnostics.wealth.missingCaseCount ||
      result.rootCauseDiagnostics.wealthConsumerEvidence.withoutAnySourceBoundInterpretiveText +
        result.rootCauseDiagnostics.wealthConsumerEvidence.withBoundedT5ContextInstead !==
          result.rootCauseDiagnostics.wealth.missingCaseCount ||
      result.rootCauseDiagnostics.annualRepetition.casesInRepeatedGroups !==
        result.menuResults['올해'].exactText.casesInRepeatedGroups ||
      result.rootCauseDiagnostics.monthlyRepetition.casesInRepeatedGroups !==
        result.menuResults['이번 달'].exactText.casesInRepeatedGroups ||
      result.rootCauseDiagnostics.annualMeaningRepetition.casesInRepeatedGroups !==
        result.menuResults['올해'].meaningProfile.casesInRepeatedGroups ||
      result.rootCauseDiagnostics.monthlyMeaningRepetition.casesInRepeatedGroups !==
        result.menuResults['이번 달'].meaningProfile.casesInRepeatedGroups ||
      result.rootCauseDiagnostics.annualNatalT5Variation.unassessed !== 0 ||
      result.rootCauseDiagnostics.monthlyNatalT5Variation.unassessed !== 0 ||
      result.rootCauseDiagnostics.annualConsumedT9Meaning.unassessed !== 0 ||
      result.rootCauseDiagnostics.monthlyConsumedT9Meaning.unassessed !== 0 ||
      result.rootCauseDiagnostics.annualConsumedT9Meaning.actualEvidencePatternCount !==
        result.rootCauseDiagnostics.annualConsumedT9Meaning.distinctExecutedMeaningSignatures ||
      result.rootCauseDiagnostics.monthlyConsumedT9Meaning.actualEvidencePatternCount !==
        result.rootCauseDiagnostics.monthlyConsumedT9Meaning.distinctExecutedMeaningSignatures ||
      result.rootCauseDiagnostics.monthlyConsumedT9Meaning.actualEvidencePatternCount < 100 ||
      result.rootCauseDiagnostics.monthlyConsumedT9Meaning.sameMeaningPairs.length === 0 ||
      result.rootCauseDiagnostics.monthlyConsumedT9Meaning.contrastingMeaningPairs.length === 0 ||
      result.rootCauseDiagnostics.wealth.remediation.caseCount !== wealthMissingCases.length) {
    process.exitCode=1;
  }
  return result;
}
if (process.argv[1] && /saju-500-eight-menu-audit\.mjs$/u.test(process.argv[1])) runFiveHundredSajuAudit();
