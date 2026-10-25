import { readFileSync } from 'node:fs';
import process from 'node:process';

const [, , beforePath, afterPath] = process.argv;
if (!beforePath || !afterPath) {
  throw new TypeError('Usage: node scripts/saju-500-meaning-diff.mjs BEFORE.json AFTER.json');
}
const before = JSON.parse(readFileSync(beforePath, 'utf8'));
const after = JSON.parse(readFileSync(afterPath, 'utf8'));
const expectedMenus = ['전체 사주', '직업·커리어', '재물', '연애·관계', '사업', '올해', '이번 달', '삶의 단계'];
function assertAudit(report) {
  if (report.count !== 500 || report.seed !== '0x5a1a2026' ||
      report.failedCases !== 0 || !(report.caseRows ?? report.auditCaseRows) ||
      expectedMenus.some(name => (report.caseRows ?? report.auditCaseRows)[name]?.length !== 500)) {
    throw new TypeError('Both inputs must be successful, case-level fixed-seed 500-person audits');
  }
}
assertAudit(before);
assertAudit(after);
function hasExecutedSourceTrace(row, menu) {
  const evidence = row.sourceEvidence;
  if (menu === '올해' || menu === '이번 달') {
    const sections = evidence?.sections;
    if (!Array.isArray(sections) || !sections.length ||
        !sections.every(section =>
          section.claimId && section.sourceIds?.length > 0 &&
          section.ruleIds?.length > 0 &&
          (section.calculatedFactPaths ?? section.factPaths)?.length > 0)) return false;
    const relations = evidence.natalCorrespondences ?? [];
    return relations.every(relation =>
      relation.authority === 'observed_natal_context_not_temporal_outcome' &&
      sections.some(section => section.claimId === relation.temporalClaimId) &&
      relation.temporalSourceIds?.length > 0 &&
      relation.temporalFactPaths?.length > 0 &&
      relation.natalSourceIds?.length > 0 &&
      relation.natalFactPaths?.length > 0 &&
      relation.natalRuleId);
  }
  if (!Array.isArray(evidence)) return false;
  const sectionsGrounded = evidence.every(section =>
    section.claimType && section.ruleId &&
    section.sourceIds?.length > 0 &&
    section.upstreamClaimIds?.length > 0 &&
    section.observedFactPaths?.length > 0);
  const isolated = row.singleWealthT5Observation;
  const singleGrounded = isolated === undefined ||
    menu === '재물' && isolated.kind === 'isolated_wealth_t5_observation_not_synthesis' &&
    isolated.ruleIds?.length > 0 && isolated.sourceIds?.length > 0 &&
    isolated.observedFactPaths?.length > 0 && isolated.claimFactPaths?.length > 0;
  return sectionsGrounded && singleGrounded &&
    (evidence.length > 0 || isolated !== undefined);
}
const byMenu = {};
for (const menu of expectedMenus) {
  const oldRows = (before.caseRows ?? before.auditCaseRows)[menu];
  const newRows = new Map((after.caseRows ?? after.auditCaseRows)[menu].map(row => [row.birth, row]));
  if (newRows.size !== 500) throw new TypeError('Duplicate birth identity in ' + menu);
  const counts = {
    generated: 500, exactTextChanged: 0, meaningProfileChanged: 0,
    newlyReadable: 0, becameEmpty: 0, changedWithPriorReading: 0,
    stillEmpty: 0, changedMeaningWithSourceTrace: 0, changedMeaningWithoutSourceTrace: 0,
    newlyDirectWealth: 0, newlyContextOnly: 0,
    newlyOtherPartial: 0, changedFromCompleteToPartial: 0,
    changedFromPartialToComplete: 0, changedCases: [],
  };
  for (const old of oldRows) {
    const next = newRows.get(old.birth);
    if (!next || old.calculationHash !== next.calculationHash) {
      throw new TypeError('Changed or missing canonical chart for ' + old.birth);
    }
    const previouslyReadable = old.text.trim().length > 0;
    const readableNow = next.text.trim().length > 0;
    if (old.exactKey !== next.exactKey) counts.exactTextChanged++;
    if (old.meaningKey !== next.meaningKey) {
      counts.meaningProfileChanged++;
      if (previouslyReadable) counts.changedWithPriorReading++;
      const hasSourceTrace = hasExecutedSourceTrace(next, menu);
      if (hasSourceTrace) counts.changedMeaningWithSourceTrace++;
      else counts.changedMeaningWithoutSourceTrace++;
      counts.changedCases.push({
        birth: old.birth, previousState: old.state, nextState: next.state,
        previousMeaning: old.meaningComponents, nextMeaning: next.meaningComponents,
        nextSourceEvidence: next.sourceEvidence ?? null,
      });
    }
    if (!previouslyReadable && readableNow) {
      counts.newlyReadable++;
      if (menu === '재물') {
        const axes = next.meaningComponents.map(x => x[2]);
        if (axes.some(axis => ['core', 'creation', 'management', 'planning'].includes(axis))) {
          counts.newlyDirectWealth++;
        } else if (axes.length > 0 && axes.every(axis => axis === 'context')) {
          counts.newlyContextOnly++;
        } else {
          counts.newlyOtherPartial++;
        }
      }
    }
    if (previouslyReadable && !readableNow) counts.becameEmpty++;
    if (!readableNow) counts.stillEmpty++;
    if (old.state === 'complete' && next.state === 'partial') counts.changedFromCompleteToPartial++;
    if (old.state === 'partial' && next.state === 'complete') counts.changedFromPartialToComplete++;
  }
  byMenu[menu] = counts;
}
process.stdout.write(JSON.stringify({
  comparisonVersion: 'saju-500-exact-chart-meaning-profile-diff-v1',
  caveat: 'Meaning profiles are execution-pattern proxies, not external validation of predictive truth. Direct wealth means an authorized research rule structural axis, not financial-outcome predictions.',
  before: { seed: before.seed, count: before.count },
  after: { seed: after.seed, count: after.count },
  menuChanges: byMenu,
}, null, 2) + '\n');
