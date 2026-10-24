import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
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
import { buildAnnualMonthlyBirthResearchReading } from '../dist/preview/annual-monthly-birth-research-runtime.js';
import { buildLifeStageBirthResearchReading } from '../dist/preview/life-stage-birth-research-runtime.js';

const NOW = new Date('2026-10-25T00:00:00.000Z');
const MENUS = ['general', 'career', 'wealth', 'relationship', 'business', 'annual', 'monthly', 'life-stage'];
const registry = {
  general: createGeneralNatalMultifactorRegistry(),
  career: createCareerMultifactorResearchRegistry(),
  wealth: createWealthNatalMultifactorRegistry(),
  relationship: createRelationshipNatalMultifactorRegistry(),
  business: createBusinessNatalMultifactorRegistry(),
};
const render = {
  general: buildGeneralNatalMultifactorReport,
  career: buildCareerMultifactorResearchReport,
  wealth: buildWealthNatalMultifactorReport,
  relationship: buildRelationshipNatalMultifactorReport,
  business: buildBusinessNatalMultifactorReport,
};
function seededBirths() {
  let seed = 0x5a1a2026;
  const next = max => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return Math.floor((seed / 0x100000000) * max);
  };
  return Array.from({ length: 10 }, () => ({
    calendarType: 'solar',
    date: { year: 1960 + next(46), month: 1 + next(12), day: 1 + next(28) },
    time: { known: true, hour: next(24), minute: next(60) },
    sexForTraditionalCalculation: next(2) ? 'male' : 'female',
  }));
}
function summarizeSections(state, sections, missing = []) {
  return {
    state, count: sections.length,
    patterns: sections.map(s => [s.claimType ?? s.id ?? s.kind ?? '', s.pattern ?? s.title ?? '', s.axis ?? '']),
    texts: sections.map(s => s.paragraph ?? s.text ?? ''),
    preview: sections.slice(0, 2).map(s => (s.paragraph ?? s.text ?? '').slice(0, 190)),
    missing: missing.slice(0, 2),
  };
}
function calculateCase(input, index) {
  const snapshot = calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
  const menu = {};
  for (const key of ['general', 'career', 'wealth', 'relationship', 'business']) {
    const report = render[key](snapshot, runInterpretation(snapshot, registry[key], { now: NOW }), registry[key]);
    assert.equal(report.calculationHash, snapshot.calculationHash);
    menu[key] = summarizeSections(report.state, report.sections, report.missing);
  }
  const annualMonthly = buildAnnualMonthlyBirthResearchReading(input, {
    requestId: 'seeded-differentiation-' + index,
    targetYear: 2026, targetMonth: 10, referenceDateTime: NOW.toISOString(),
  });
  assert.equal(annualMonthly.report.calculationHash, snapshot.calculationHash);
  menu.annual = summarizeSections('research_only', annualMonthly.report.annual.sections);
  menu.monthly = summarizeSections('research_only', annualMonthly.report.monthly.sections);
  const lifeStage = buildLifeStageBirthResearchReading(input, NOW.toISOString());
  assert.equal(lifeStage.report.calculationHash, snapshot.calculationHash);
  menu['life-stage'] = {
    state: lifeStage.report.interpretationStatus,
    count: lifeStage.report.periods.length,
    patterns: [],
    texts: [],
    preview: lifeStage.report.periods.slice(0, 2).map(p => p.text.slice(0, 190)),
    natalContextSections: lifeStage.natalContext.sections.length,
    missing: lifeStage.report.missing.slice(0, 2),
  };
  return {
    index: index + 1,
    birth: String(input.date.year) + '-' + String(input.date.month).padStart(2, '0') +
      '-' + String(input.date.day).padStart(2, '0') + ' ' +
      String(input.time.hour).padStart(2, '0') + ':' +
      String(input.time.minute).padStart(2, '0'),
    sex: input.sexForTraditionalCalculation,
    calculationHash: snapshot.calculationHash,
    menu,
  };
}
function countDistinct(records, menuId, property) {
  return new Set(records.map(record => JSON.stringify(record.menu[menuId][property]))).size;
}
test('seeded random birth minute inputs: inspect substantive differences in eight real reading menus', () => {
  const inputs = seededBirths();
  const records = inputs.map(calculateCase);
  const duplicate = calculateCase(inputs[0], 100);
  assert.equal(new Set(records.map(r => r.calculationHash)).size, records.length);
  for (const menu of MENUS) {
    assert.deepEqual(records[0].menu[menu], duplicate.menu[menu], 'same birth must repeat: ' + menu);
  }
  const summary = Object.fromEntries(MENUS.map(menu => [menu, {
    differentSemanticPatterns: countDistinct(records, menu, 'patterns'),
    differentActualParagraphs: countDistinct(records, menu, 'texts'),
    pairwiseDifferentPatterns: records.reduce((total, left, i) => total + records.slice(i + 1).filter(right =>
      JSON.stringify(left.menu[menu].patterns) !== JSON.stringify(right.menu[menu].patterns)).length, 0),
    casesWithReadingParagraphs: records.filter(r => r.menu[menu].texts.length > 0).length,
    casesWithAtLeastOneSection: records.filter(r => r.menu[menu].count > 0).length,
    outputStates: Object.fromEntries([...new Set(records.map(r => r.menu[menu].state))].map(
      state => [state, records.filter(r => r.menu[menu].state === state).length])),
  }]));
  for (const record of records) {
    console.log('SAJU_RANDOM_CASE ' + JSON.stringify({
      index: record.index, birth: record.birth, sex: record.sex,
      hash: record.calculationHash.slice(0, 14),
      menus: Object.fromEntries(MENUS.map(menu => [menu, {
        state: record.menu[menu].state,
        sections: record.menu[menu].count,
        patterns: record.menu[menu].patterns,
        preview: record.menu[menu].preview,
        missing: record.menu[menu].missing,
      }])),
    }));
  }
  console.log('SAJU_RANDOM_SUMMARY ' + JSON.stringify({
    seed: '0x5a1a2026', sampleCount: records.length,
    target: '2026-10', referenceDateTime: NOW.toISOString(),
    exactRepeatIdentical: true,
    distinctBirthChartCount: new Set(records.map(r => r.calculationHash)).size,
    menuSummary: summary,
    lifeStageIsOnlyPeriodCalculation: records.every(r =>
      r.menu['life-stage'].state === 'source_authority_not_established'),
    annualMonthlyUseSameHtmlSource: true,
  }));
});
