import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import console from 'node:console';
import { fileURLToPath } from 'node:url';
import { getTenGod } from 'manseryeok';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';

export const WEALTH_EVIDENCE_MEANING_AUDIT_VERSION = 'saju-500-wealth-evidence-meaning-v1';
const NOW = new Date('2026-10-25T00:00:00.000Z');
const SLOTS = { year: '연주', month: '월주', day: '일주', hour: '시주' };
const FAMILIES = {
  peer: ['비견', '겁재'],
  resource: ['정인', '편인'],
  output: ['식신', '상관'],
  wealth: ['정재', '편재'],
  officer: ['정관', '편관'],
};
const HIDDEN_SOURCE = 'SRC-GENERAL-NATAL-YUANHAI-HIDDEN-STEMS-WIKISOURCE';
const FACT = /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u;
const HIDDEN_FACT = /^derivedFacts\.hiddenStems\.(year|month|day|hour)\.value\.([0-2])$/u;
function groupFamily(tenGod) {
  return Object.entries(FAMILIES).find(([, values]) => values.includes(tenGod))?.[0] ?? null;
}
function uniqueGroups(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  const repeated = [...counts.values()].filter((n) => n > 1);
  return {
    unique: counts.size,
    repeatedGroups: repeated.length,
    casesInRepeatedGroups: repeated.reduce((n, value) => n + value, 0),
    largestRepeatedGroup: Math.max(0, ...repeated),
  };
}
function equivalent(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
function verifySection(snapshot, chart, section, errors) {
  const prefix = chart.birth + ' ' + section.claimType;
  const fail = (reason) => errors.push(prefix + ': ' + reason);
  const expectedFamilies = section.pattern
    .replace(/_CONTEXT$/u, '')
    .split('_')
    .map((f) => f.toLowerCase());
  if (!expectedFamilies.every((f) => FAMILIES[f])) fail('unsupported pattern family');
  if (!section.claimType.endsWith('_' + section.channel.toUpperCase()))
    fail('claimType/channel mismatch');
  if (section.ruleId !== 'RULE-' + section.claimType) fail('rule ID mismatch');
  if (section.axis === 'context' && expectedFamilies.includes('wealth'))
    fail('context incorrectly includes wealth');
  if (section.axis !== 'context' && !expectedFamilies.includes('wealth'))
    fail('direct wealth axis lacks wealth family');
  if (!Array.isArray(section.sourceIds) || section.sourceIds.length < 2)
    fail('missing source references');
  if (section.channel === 'hidden_stems' && !section.sourceIds.includes(HIDDEN_SOURCE)) {
    fail('hidden-stem channel lacks its cross-reference source');
  }
  if (
    typeof section.paragraph !== 'string' ||
    section.paragraph.length < 40 ||
    typeof section.headline !== 'string' ||
    section.headline.length === 0
  ) {
    fail('missing readable Korean section');
  }
  const active = chart.activeWealthT8Claims.filter((c) => c.claimType === section.claimType);
  if (active.length !== 1) {
    fail('selected T8 has no unique active claim');
  } else if (
    !equivalent(active[0].upstreamClaimIds, section.upstreamClaimIds) ||
    !equivalent(active[0].sourceIds, section.sourceIds)
  ) {
    fail('selected section diverges from T8 upstream or source references');
  }
  if (
    !Array.isArray(section.observedFactPaths) ||
    section.observedFactPaths.length !== section.observedPositions.length ||
    section.observedFactPaths.length < expectedFamilies.length
  ) {
    fail('fact paths and observed positions are insufficient');
    return;
  }
  const observedFamilies = new Set();
  const dayMaster = snapshot.derivedFacts.dayMaster;
  for (const [index, factPath] of section.observedFactPaths.entries()) {
    const match = factPath.match(section.channel === 'hidden_stems' ? HIDDEN_FACT : FACT);
    if (!match) {
      fail('unsupported observed fact path: ' + factPath);
      continue;
    }
    let tenGod;
    let display;
    if (section.channel === 'hidden_stems') {
      const [, slot, rawIndex] = match;
      const state = snapshot.derivedFacts.hiddenStems?.[slot];
      if (state?.status !== 'resolved' || dayMaster.status !== 'resolved') {
        fail('unresolved hidden-stem input: ' + factPath);
        continue;
      }
      const stem = state.value[Number(rawIndex)];
      if (!stem) {
        fail('hidden-stem index outside canonical fact: ' + factPath);
        continue;
      }
      tenGod = getTenGod(dayMaster.value.value, stem);
      display = SLOTS[slot] + ' 지장간 ' + stem + ' ' + tenGod;
    } else {
      const [, slot, key] = match;
      if ((section.channel === 'visible_stems') !== (key === 'stem')) {
        fail('observed path mixes Ten-God channels');
        continue;
      }
      const state = snapshot.derivedFacts.tenGods;
      const member = state.status === 'resolved' ? state.value[slot][key] : undefined;
      if (member?.status !== 'resolved') {
        fail('unresolved visible/branch Ten-God fact: ' + factPath);
        continue;
      }
      tenGod = member.value;
      display = SLOTS[slot] + ' ' + (key === 'stem' ? '천간' : '지지 대표 십신') + ' ' + tenGod;
    }
    const family = groupFamily(tenGod);
    if (!family || !expectedFamilies.includes(family))
      fail('unexpected Ten-God family at ' + factPath);
    if (family) observedFamilies.add(family);
    if (section.observedPositions[index] !== display)
      fail('rendered position does not match canonical fact: ' + factPath);
    if (!section.paragraph.includes(display))
      fail('narrative omits observed position: ' + factPath);
  }
  for (const family of expectedFamilies) {
    if (!observedFamilies.has(family))
      fail('pattern family has no real observed position: ' + family);
    const upstreamType =
      'TEN_GOD_' + family.toUpperCase() + '_' + section.channel.toUpperCase() + '_THEME';
    const matched = chart.activeT5Claims.filter((c) => c.claimType === upstreamType);
    if (matched.length !== 1 || !section.upstreamClaimIds.includes(matched[0].claimId)) {
      fail('no same-chart/same-channel upstream T5 Claim: ' + upstreamType);
    }
  }
  if (section.upstreamClaimIds.length !== expectedFamilies.length)
    fail('unexpected upstream cardinality');
}
export function compareWealthEvidenceMeaning(baseline, current) {
  if (
    baseline.count !== 500 ||
    current.count !== 500 ||
    baseline.seed !== current.seed ||
    baseline.wealthMissingCases?.length !== 111 ||
    current.wealthChartDiagnostics?.length !== 500
  ) {
    throw new Error('Expected exact same-seed original 111-case and current 500-case audit inputs');
  }
  const errors = [];
  const baselineCases = new Map(baseline.wealthMissingCases.map((c) => [c.birth, c]));
  const currentCases = new Map();
  const selectedCounts = { complete: 0, partial: 0, insufficient: 0 };
  let verifiedSections = 0;
  let hiddenSections = 0;
  let checkedClaimLinks = 0;
  const semanticKeys = [];
  const positionKeys = [];
  const sectionTextKeys = [];
  const reviews = [];
  for (const chart of current.wealthChartDiagnostics) {
    if (currentCases.has(chart.birth)) errors.push('duplicate current birth: ' + chart.birth);
    currentCases.set(chart.birth, chart);
    const snapshot = calculateCanonicalSajuSnapshot(
      chart.birthInput,
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
      { now: NOW },
    );
    if (snapshot.calculationHash !== chart.calculationHash) {
      errors.push(chart.birth + ': canonical calculation hash differs');
      continue;
    }
    if (!Object.hasOwn(selectedCounts, chart.reportState)) {
      errors.push(chart.birth + ': unknown report state');
    } else {
      selectedCounts[chart.reportState]++;
    }
    if (chart.reportState === 'insufficient') {
      if (chart.sections.length !== 0)
        errors.push(chart.birth + ': insufficient report has sections');
      if (!chart.reportMissing.length)
        errors.push(chart.birth + ': insufficient report has no explanation');
      if (chart.activeT5Claims.some((c) => c.claimType === 'TEN_GOD_WEALTH_HIDDEN_STEMS_THEME')) {
        errors.push(chart.birth + ': insufficient despite active hidden-stem Wealth theme');
      }
    } else if (chart.sections.length === 0) {
      errors.push(chart.birth + ': empty non-insufficient report');
    }
    for (const section of chart.sections) {
      verifiedSections++;
      if (section.channel === 'hidden_stems') hiddenSections++;
      checkedClaimLinks += section.upstreamClaimIds.length;
      verifySection(snapshot, chart, section, errors);
    }
    semanticKeys.push(JSON.stringify(chart.sections.map((s) => [s.pattern, s.axis, s.channel])));
    positionKeys.push(JSON.stringify(chart.sections.map((s) => s.observedFactPaths)));
    sectionTextKeys.push(JSON.stringify(chart.sections.map((s) => s.paragraph)));
  }
  const recovered = [];
  const stillInsufficient = [];
  for (const old of baseline.wealthMissingCases) {
    const now = currentCases.get(old.birth);
    if (!now) {
      errors.push(old.birth + ': absent from current 500 sample');
      continue;
    }
    if (
      old.calculationHash !== now.calculationHash ||
      !equivalent(old.birthInput, now.birthInput)
    ) {
      errors.push(old.birth + ': original vs current birth input/hash mismatch');
    }
    const record = {
      birth: old.birth,
      birthInput: now.birthInput,
      calculationHash: now.calculationHash,
      originalCause: old.cause,
      originalChartFacts: {
        pillars: old.chartFacts.pillars,
        dayMaster: old.chartFacts.dayMaster,
        hiddenStemFamilies: old.chartFacts.hiddenStemFamilies,
      },
      originalT5: old.upstream.availableT5ClaimTypes,
      originalT5ClaimRefs: old.upstream.claims,
      originalRuleTrace: {
        eligibleRuleIds: old.rules.eligibleRuleIds,
        evaluationsByStatus: old.rules.evaluationsByStatus,
        inputCoverage: old.rules.inputCoverage,
      },
      originalSelection: old.selection,
      currentState: now.reportState,
      currentT5: now.activeT5ClaimTypes,
      currentT8: now.activeWealthT8ClaimTypes,
      selectedSections: now.sections.map((section) => ({
        claimType: section.claimType,
        axis: section.axis,
        channel: section.channel,
        ruleId: section.ruleId,
        observedFactPaths: section.observedFactPaths,
        observedPositions: section.observedPositions,
        upstreamClaimIds: section.upstreamClaimIds,
        sourceIds: section.sourceIds,
        headline: section.headline,
        paragraph: section.paragraph,
      })),
      missing: now.reportMissing,
    };
    if (now.sections.length) recovered.push(record);
    else stillInsufficient.push(record);
  }
  const currentMissing = current.wealthChartDiagnostics.filter((c) => c.sections.length === 0);
  const additionalMissing = currentMissing.filter((c) => !baselineCases.has(c.birth));
  if (additionalMissing.length)
    errors.push(
      'new missing cases not in original 111: ' + additionalMissing.map((c) => c.birth).join(', '),
    );
  const repeatedGroups = new Map();
  current.wealthChartDiagnostics.forEach((chart, index) => {
    const key = semanticKeys[index];
    const existing = repeatedGroups.get(key) ?? [];
    existing.push(chart);
    repeatedGroups.set(key, existing);
  });
  for (const group of [...repeatedGroups.values()]
    .filter((g) => g.length > 1)
    .sort((a, b) => b.length - a.length)
    .slice(0, 8)) {
    const first = group[0],
      differentPositions = group.find(
        (c) =>
          !equivalent(
            c.sections.map((s) => s.observedFactPaths),
            first.sections.map((s) => s.observedFactPaths),
          ),
      );
    reviews.push({
      semanticProfile: first.sections.map((s) => [s.pattern, s.axis, s.channel]),
      repeatedCases: group.length,
      examples: [first, differentPositions].filter(Boolean).map((c) => ({
        birth: c.birth,
        evidencePaths: c.sections.map((s) => s.observedFactPaths),
        selectedHeadlines: c.sections.map((s) => s.headline),
      })),
    });
  }
  const result = {
    version: WEALTH_EVIDENCE_MEANING_AUDIT_VERSION,
    seed: current.seed,
    sampleCount: current.count,
    summary: {
      originalMissing: baseline.wealthMissingCases.length,
      originalRecoveredWithSections: recovered.length,
      originalStillInsufficient: stillInsufficient.length,
      newMissing: additionalMissing.length,
      reportStates: selectedCounts,
      verifiedSections,
      hiddenStemSections: hiddenSections,
      upstreamClaimLinksChecked: checkedClaimLinks,
      structuralMeaningProfiles: uniqueGroups(semanticKeys),
      distinctFactPathProfiles: uniqueGroups(positionKeys),
      distinctSelectedParagraphProfiles: uniqueGroups(sectionTextKeys),
      evidenceContractFailures: errors.length,
      semanticInterpretationQuality: 'not_established_by_automated_structural_checks',
      sourceMethodologyStatus: 'research_only_unreviewed',
    },
    failures: errors.slice(0, 150),
    repeatedStructuralProfilesForHumanReview: reviews,
    currentFiveHundredCaseEvidence: current.wealthChartDiagnostics.map((chart) => ({
      birth: chart.birth,
      birthInput: chart.birthInput,
      calculationHash: chart.calculationHash,
      reportState: chart.reportState,
      reportMissing: chart.reportMissing,
      selectedSections: chart.sections.map((section) => ({
        claimType: section.claimType,
        pattern: section.pattern,
        axis: section.axis,
        channel: section.channel,
        ruleId: section.ruleId,
        observedFactPaths: section.observedFactPaths,
        observedPositions: section.observedPositions,
        upstreamClaimIds: section.upstreamClaimIds,
        sourceIds: section.sourceIds,
        paragraph: section.paragraph,
      })),
    })),
    originallyMissingCases: [...recovered, ...stillInsufficient],
  };
  return result;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [baselinePath, currentPath, outputPath] = process.argv.slice(2);
  if (!baselinePath || !currentPath || !outputPath) {
    console.error(
      'Usage: node scripts/saju-500-wealth-evidence-meaning-compare.mjs <original-111-audit.json> <current-500-audit.json> <output.json>',
    );
    process.exitCode = 2;
  } else {
    const original = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
    const current = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
    const report = compareWealthEvidenceMeaning(original, current);
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report.summary, null, 2));
    console.log('RESULT=' + outputPath);
    if (report.summary.evidenceContractFailures) process.exitCode = 1;
  }
}
