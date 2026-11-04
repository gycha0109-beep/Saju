/**
 * Pair original source-SHA Wealth research T8 outcomes with the current 500
 * real cases. The original audit artifact contains only totals; its per-chart
 * rows come only from the separate original-SHA compiled-engine replay.
 *
 * A selected T8 is not a prediction, product readiness or Official authority.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { FIXED_500_BASELINE } from './saju-500-baseline-comparison.mjs';

const EXPECTED_SHA = FIXED_500_BASELINE.headSha;
const EXPECTED_COUNT = FIXED_500_BASELINE.count;
const WEALTH_BASELINE = FIXED_500_BASELINE.menuResults['재물'];

export function compareHistoricalWealthCases(original, current) {
  if (original?.sourceCommit !== EXPECTED_SHA ||
      original.originalAuditRunId !== FIXED_500_BASELINE.runId ||
      original.referenceDateTime !== FIXED_500_BASELINE.referenceDateTime ||
      original.seed !== FIXED_500_BASELINE.seed ||
      original.count !== EXPECTED_COUNT ||
      original.withWealthT8 !== WEALTH_BASELINE.readable ||
      original.withoutWealthT8 !== WEALTH_BASELINE.missing ||
      !Array.isArray(original.cases) ||
      !Array.isArray(current?.cases) ||
      original.cases.length !== EXPECTED_COUNT ||
      current.cases.length !== EXPECTED_COUNT ||
      current.count !== EXPECTED_COUNT ||
      current.seed !== FIXED_500_BASELINE.seed ||
      current.referenceDateTime !== FIXED_500_BASELINE.referenceDateTime) {
    throw new TypeError('Historical comparison needs exact original audited source, seed, period and 500 rows');
  }
  const byBirth = new Map();
  for (const row of current.cases) {
    if (!row.birth || !row.calculationHash ||
        typeof row.noT8 !== 'boolean' ||
        !Array.isArray(row.selectedT8) ||
        !Array.isArray(row.activeT5ClaimTypes) ||
        row.noT8 !== (row.selectedT8.length === 0) ||
        row.selectedT8.some(section =>
          !section.claimType?.startsWith('WEALTH_NATAL_MULTIFACTOR_') ||
          !section.ruleId || !section.sourceIds?.length ||
          !section.upstreamClaimIds?.length) ||
        byBirth.has(row.birth)) {
      throw new TypeError('Current Wealth outcome lacks exact unique selected source evidence');
    }
    byBirth.set(row.birth, row);
  }
  const recovered = [];
  const stillMissing = [];
  const newlyMissing = [];
  const unchangedCovered = [];
  const pairedMissingCases = [];
  const originalCauseCounts = {};
  const recoveredOriginalCauseCounts = {};
  for (const row of original.cases) {
    const after = byBirth.get(row.birth);
    if (!after || !row.birth || !row.calculationHash ||
        row.calculationHash !== after.calculationHash ||
        typeof row.noT8 !== 'boolean' ||
        !Array.isArray(row.selectedT8) ||
        row.noT8 !== (row.selectedT8.length === 0) ||
        !Array.isArray(row.originalActiveT5ClaimTypes) ||
        !Array.isArray(row.originalEligibleT8RuleIds) ||
        !row.cause || row.cause === 'unknown') {
      throw new TypeError('Original replay and current audit must agree on every exact birth and canonical chart hash');
    }
    const paired = {
      birth: row.birth,
      calculationHash: row.calculationHash,
      original: {
        state: row.state, cause: row.cause,
        selectedT8: row.selectedT8,
        activeT5ClaimTypes: row.originalActiveT5ClaimTypes,
        eligibleT8RuleIds: row.originalEligibleT8RuleIds,
      },
      current: {
        state: after.state,
        selectedT8: after.selectedT8,
        activeT5ClaimTypes: after.activeT5ClaimTypes,
        missing: after.missing,
      },
    };
    if (row.noT8) {
      originalCauseCounts[row.cause] = (originalCauseCounts[row.cause] ?? 0) + 1;
      pairedMissingCases.push(paired);
      if (after.noT8) stillMissing.push(paired);
      else {
        recovered.push(paired);
        recoveredOriginalCauseCounts[row.cause] =
          (recoveredOriginalCauseCounts[row.cause] ?? 0) + 1;
      }
    } else if (after.noT8) newlyMissing.push(paired);
    else unchangedCovered.push(paired);
  }
  if (byBirth.size !== EXPECTED_COUNT ||
      original.cases.length !== EXPECTED_COUNT ||
      pairedMissingCases.length !== WEALTH_BASELINE.missing ||
      recovered.length + stillMissing.length !== WEALTH_BASELINE.missing ||
      unchangedCovered.length + newlyMissing.length !== WEALTH_BASELINE.readable ||
      stillMissing.length + newlyMissing.length !== current.withoutWealthT8 ||
      recovered.length + unchangedCovered.length !== current.withWealthT8 ||
      newlyMissing.length !== 0) {
    throw new TypeError('Historical replay has unresolved cases, totals mismatch or regressed original Wealth T8 evidence');
  }
  return {
    version: 'saju-wealth-historical-per-chart-replay-v1',
    source: {commit: original.sourceCommit, runId: original.originalAuditRunId},
    currentSource: 'exact_current_audit_chart_hash',
    seed: original.seed,
    referenceDateTime: original.referenceDateTime,
    count: EXPECTED_COUNT,
    originalMissing: WEALTH_BASELINE.missing,
    recoveredMissing: recovered.length,
    stillMissing: stillMissing.length,
    newlyMissing: newlyMissing.length,
    originallyCoveredAndStillCovered: unchangedCovered.length,
    originalMissingByObservedCause: originalCauseCounts,
    recoveredByOriginalCause: recoveredOriginalCauseCounts,
    allOriginalMissingPaired: pairedMissingCases,
    recovered,
    stillMissingCases: stillMissing,
    notNewlyMissing: true,
    researchOnly: true,
    mayPublish: false,
    maySell: false,
    mayCallOfficial: false,
    caveat: 'Historical causes are observed boundaries from original executed T5/T8 and rules, not proof that a new rule or favorable outcome was authorized. Cases are matched by exact deterministic birth and Canonical calculation hash.',
  };
}

if (process.argv[1] &&
    fileURLToPath(import.meta.url) === process.argv[1]) {
  const [originalPath, currentPath, outputPath] = process.argv.slice(2);
  if (!originalPath || !currentPath || !outputPath) {
    throw new Error('Usage: comparator <original replay JSON> <current audit JSON> <paired JSON>');
  }
  const baseline = JSON.parse(readFileSync(originalPath, 'utf8'));
  const currentAudit = JSON.parse(readFileSync(currentPath, 'utf8'));
  const summary = compareHistoricalWealthCases(baseline, currentAudit.wealthPerChart);
  writeFileSync(outputPath, JSON.stringify(summary, null, 2) + '\n');
  process.stdout.write('SAJU500_HISTORICAL_WEALTH_PAIRED ' + JSON.stringify({
    sourceSha: summary.source.commit,
    originalMissing: summary.originalMissing,
    recoveredMissing: summary.recoveredMissing,
    stillMissing: summary.stillMissing,
    newlyMissing: summary.newlyMissing,
    originalCauses: summary.originalMissingByObservedCause,
    recoveredCauses: summary.recoveredByOriginalCause,
    researchOnly: true,
  }) + '\n');
}
