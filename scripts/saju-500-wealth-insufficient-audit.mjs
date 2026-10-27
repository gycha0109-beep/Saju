import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';

const [source, destination] = process.argv.slice(2);
if (!source || !destination) throw new Error(
  'Usage: node scripts/saju-500-wealth-insufficient-audit.mjs audit.json report.json');
const audit = JSON.parse(readFileSync(source, 'utf8'));
const rows = audit.caseResults?.['재물'];
const root = audit.rootCauseDiagnostics?.wealth;
if (audit.seed !== '0x5a1a2026' || audit.count !== 500 ||
    audit.failedCases !== 0 || rows?.length !== 500 ||
    root?.missingCaseCount !== 17 || root?.cases?.length !== 17) {
  throw new Error('Requires exact original 500 samples and 17 missing Wealth cases.');
}

const recoverable = [];
const blocked = [];
const reasons = {};
const diagnostics = new Map(root.cases.map(item => [item.birth, item]));
for (const row of rows) {
  const detail = row.wealthInsufficientEvidence;
  if (row.state !== 'insufficient') {
    if (detail !== null) throw new Error('Available wealth reading cannot own a missing-only T5 trace');
    continue;
  }
  const diagnostic = diagnostics.get(row.birth);
  if (!diagnostic || !detail ||
      row.sectionCount !== 0 || row.eligibleAlternatives?.length !== 0 ||
      diagnostic.calculationHash !== row.calculationHash ||
      diagnostic.emittedWealthClaims?.length !== 0 ||
      diagnostic.selection?.selectedWealthClaimIds?.length !== 0 ||
      diagnostic.rules?.eligibleRuleIds?.length !== 0 ||
      diagnostic.rules?.eligibleRuleEvaluations?.length !== 0 ||
      detail.t8ClaimCount !== 0 || detail.recoverable !== false) {
    throw new Error('Unjustified partial/completed Wealth interpretation: ' + row.birth);
  }
  const observed = diagnostic.upstream?.claims ?? [];
  if (detail.t5?.length !== observed.length ||
      detail.t5.some(item =>
        !item.positions?.length || item.factPaths.length !== item.positions.length ||
        !item.sourceIds?.length || !item.ruleId ||
        !observed.some(source => source.claimId === item.claimId &&
          source.claimType === item.claimType &&
          source.ruleIds.includes(item.ruleId) &&
          item.sourceIds.every(id => source.sourceRefs.includes(id)) &&
          item.factPaths.every(path =>
            /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u.test(path)))) ||
      !detail.koreanExplanation?.includes('재물 종합 T8 문단은 발행하지 않습니다')) {
    throw new Error('Missing exact original source-qualified T5 trace: ' + row.birth);
  }
  const actualCause = diagnostic.cause ===
    'no_active_wealth_t5_in_either_observation_channel'
    ? 'no_wealth_t5_in_registered_channels'
    : diagnostic.cause === 'wealth_t5_exists_but_no_registered_same_channel_combination'
      ? 'wealth_t5_without_same_channel_partner' : null;
  if (actualCause === null || detail.cause !== actualCause) {
    throw new Error('Existing source classification differs from T5 evidence: ' + row.birth);
  }
  const hasWealth = observed.some(item => item.claimType.startsWith('TEN_GOD_WEALTH_'));
  if (hasWealth !== (actualCause === 'wealth_t5_without_same_channel_partner')) {
    throw new Error('Wealth family existence must not be guessed.');
  }
  reasons[detail.cause] = (reasons[detail.cause] ?? 0) + 1;
  blocked.push({
    birth: row.birth,
    calculationHash: row.calculationHash,
    disposition: 'blocked_no_registered_t8_claim' ,
    reason: detail.cause,
    activeSourceQualifiedT5Claims: detail.t5,
    koreanExplanation: detail.koreanExplanation,
  });
}
if (blocked.length !== 17 || recoverable.length !== 0 ||
    reasons.no_wealth_t5_in_registered_channels !== 16 ||
    reasons.wealth_t5_without_same_channel_partner !== 1 ||
    rows.filter(row => row.state === 'complete').length !== 124 ||
    rows.filter(row => row.state === 'partial').length !== 359) {
  throw new Error('The 17-case source-based disposition is not exact.');
}
const output = {
  status: 'fixed_500_wealth_t8_recovery_gate',
  sourceScope: 'existing T5→registered T8→selector only',
  sampledCases: 500,
  insufficient: blocked.length,
  recoverable: recoverable.length,
  blocked: blocked.length,
  byCause: reasons,
  noRegisteredT8RulesAltered: true,
  financialOutcomePredictionAuthorized: false,
  cases: blocked,
};
writeFileSync(destination, JSON.stringify(output, null, 2) + '\n');
process.stdout.write('SAJU_500_WEALTH_17_DISPOSITION ' + JSON.stringify({
  sampledCases:output.sampledCases,insufficient:output.insufficient,
  recoverable:output.recoverable,blocked:output.blocked,byCause:output.byCause
}) + '\n');
