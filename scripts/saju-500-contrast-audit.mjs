import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';

const [, , inputPath, outputPath] = process.argv;
if (!inputPath) {
  throw new TypeError('Usage: node scripts/saju-500-contrast-audit.mjs AUDIT.json [OUTPUT.json]');
}
const audit = JSON.parse(readFileSync(inputPath, 'utf8'));
if (audit.seed !== '0x5a1a2026' || audit.failedCases !== 0 || audit.count !== 500) {
  throw new TypeError('Contrasting-pair audit requires the exact deterministic successful 500-person run');
}
const rows = audit.caseRows ?? audit.auditCaseRows;
const output = {};
const errors = [];
for (const [menu, key] of [['올해', 'annual'], ['이번 달', 'monthly']]) {
  if (rows?.[menu]?.length !== 500) throw new TypeError(menu + ': missing 500 birth cases');
  const groups = new Map();
  for (const row of rows[menu]) {
    const trace = row.sourceEvidence;
    const segments = trace?.sections ?? [];
    const theme = segments.filter(section => section.kind === 'core' || (
      menu === '이번 달' && section.kind === 'theme' &&
      section.segmentId === trace.referenceSegment
    ));
    if (theme.length !== 1) {
      errors.push(menu + ': expected one exact current-period T9 theme for ' + row.birth);
      continue;
    }
    const selected = theme[0];
    if (!selected.claimId || !selected.ruleIds?.length || !selected.sourceIds?.length ||
        !(selected.factPaths ?? selected.calculatedFactPaths)?.length) {
      errors.push(menu + ': cannot prove T9 source for ' + row.birth);
      continue;
    }
    const signature = JSON.stringify([
      selected.candidateClaimType ?? selected.kind,
      selected.sourceProfileId ?? selected.tenGod,
      selected.ruleIds,
      selected.sourceIds,
      selected.segmentId ?? 'annual',
    ]);
    const members = groups.get(signature) ?? [];
    members.push({
      birth: row.birth, chartHash: row.calculationHash,
      selectedTemporalClaimId: selected.claimId,
      meaningKey: row.meaningKey,
      natal: trace.natalCorrespondences ?? [],
    });
    groups.set(signature, members);
  }
  const contrasts = [];
  let sharedThemeCases = 0;
  let legitimateSameMeaningPairs = 0;
  let noContextCases = 0;
  for (const members of groups.values()) {
    if (members.length > 1) sharedThemeCases += members.length;
    const withContext = members.filter(member => member.natal.length > 0);
    noContextCases += members.length - withContext.length;
    // A matched theme with different independently cited natal structures
    // is a genuine interpretive research contrast, not a new forecast.
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const left = members[i], right = members[j];
        if (left.meaningKey === right.meaningKey) {
          legitimateSameMeaningPairs++;
          continue;
        }
        if (!left.natal.length || !right.natal.length) continue;
        const identity = member => member.natal.map(relation => [
          relation.natalClaimType, relation.natalPattern, relation.natalAxis,
          relation.natalRuleId, relation.sharedFamily,
        ]);
        if (JSON.stringify(identity(left)) === JSON.stringify(identity(right))) continue;
        const valid = [left, right].every(member => member.natal.every(relation =>
          relation.authority === 'observed_natal_context_not_temporal_outcome' &&
          relation.temporalClaimId === member.selectedTemporalClaimId &&
          relation.temporalClaimId && relation.temporalSourceIds?.length &&
          relation.temporalFactPaths?.length && relation.natalSourceIds?.length &&
          relation.natalFactPaths?.length && relation.natalRuleId));
        if (!valid) {
          errors.push(menu + ': a contrast uses non-source-bound natal context');
          continue;
        }
        if (contrasts.length < 8) contrasts.push({
          births: [left.birth, right.birth],
          differentCalculationHashes: left.chartHash !== right.chartHash,
          sameSelectedTemporalTheme: true,
          differingNatalMeaning: [identity(left), identity(right)],
        });
      }
    }
  }
  if (contrasts.length === 0) errors.push(menu + ': no observed pair differentiates identical T9 themes by genuine natal evidence');
  output[key] = {
    menu,
    birthCases: rows[menu].length,
    themeGroups: groups.size,
    peopleWithSharedTemporalTheme: sharedThemeCases,
    casesWithoutQualifiedNatalContext: noContextCases,
    sameMeaningPairsAllowed: legitimateSameMeaningPairs,
    sourceTracedContrastingExamples: contrasts,
  };
}
const result = {
  version: 'saju-500-period-natal-intentional-contrasts-v1',
  status: errors.length ? 'FAIL' : 'RESEARCH_CONTRASTS_VERIFIED_NOT_PREDICTIONS',
  seed: audit.seed,
  note: 'Comparisons change only when selected T9 theme plus independently observed T8 structures differ. Agreement across different charts is permitted; none of this proves real-life prediction.',
  ...output,
  errors,
};
if (outputPath) writeFileSync(outputPath, JSON.stringify(result, null, 2) + '\n', 'utf8');
process.stdout.write('SAJU500_CONTRAST ' + JSON.stringify(result) + '\n');
if (errors.length) process.exitCode = 1;
