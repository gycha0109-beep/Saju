/**
 * Run only inside a checkout of the exact 2026-10-24 original audited commit
 * 313635fcf8fdf0029eba9d463b22884b79d4007a, using THAT commit's dist/.
 * Copy this runner into that checkout after npm ci + npm run build.
 *
 * Input generation below is copied without changes from the original
 * scripts/saju-500-eight-menu-audit.mjs; each sample consumes the random
 * sex choice even though this runner only executes the Wealth menu.
 * This script does NOT add a new Rule/Claim/Methodology/Source.
 */
import { writeFileSync } from 'node:fs';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createWealthNatalMultifactorRegistry } from '../dist/research/wealth-natal-multifactor-candidate.js';
import { buildWealthNatalMultifactorReport } from '../dist/preview/wealth-natal-multifactor-report.js';

const BASELINE_SHA = '313635fcf8fdf0029eba9d463b22884b79d4007a';
const REFERENCE = '2026-10-25T00:00:00.000Z';
const COUNT = 500;
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

export function replayHistoricalWealthCases() {
  const registry = createWealthNatalMultifactorRegistry();
  const used = new Set();
  const rows = [];
  for (let i = 0; i < COUNT; i++) {
    const { stamp, birth } = sampleBirth(used);
    const snapshot = calculateCanonicalSajuSnapshot(
      birth, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now },
    );
    const execution = runInterpretation(snapshot, registry, { now });
    const report = buildWealthNatalMultifactorReport(
      snapshot, execution, registry,
    );
    if (report.snapshotId !== snapshot.snapshotId ||
        report.calculationHash !== snapshot.calculationHash ||
        execution.run.snapshotId !== snapshot.snapshotId) {
      throw new TypeError('Historical Wealth report changed chart or execution');
    }
    const activeT5Types = [...new Set(execution.claims.filter(claim =>
      claim.state === 'active' && claim.taxonomy.tier === 'T5' &&
      /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u
        .test(claim.claimType)).map(claim => claim.claimType))].sort();
    const activeT8 = execution.claims.filter(claim =>
      claim.state === 'active' && claim.taxonomy.tier === 'T8' &&
      claim.taxonomy.category === 'wealth' &&
      claim.predicate === 'wealth_multifactor_structure');
    const eligibleRules = registry.rules.filter(rule =>
      rule.status === 'research' && rule.taxonomy.tier === 'T8' &&
      rule.taxonomy.category === 'wealth' &&
      rule.output.predicate === 'wealth_multifactor_structure' &&
      rule.inputs.every(input => input.source === 'interpretation_claim' &&
        activeT5Types.includes(input.pathOrClaimType)));
    const selected = report.sections.map(section => ({
      claimType: section.claimType,
      pattern: section.pattern,
      axis: section.axis,
      channel: section.channel,
    }));
    const noT8 = selected.length === 0;
    const directWealthT5 = activeT5Types.some(type =>
      /^TEN_GOD_WEALTH_(VISIBLE_STEMS|BRANCHES)_THEME$/u.test(type));
    const cause = !noT8 ? 'selected_original_t8'
      : !snapshot.completeness.birthTimeKnown ? 'birth_time_unresolved'
      : !activeT5Types.length ? 'no_active_source_t5'
      : !directWealthT5 ? 'no_direct_wealth_t5'
      : !eligibleRules.length && !activeT8.length
        ? 'no_registered_combination_for_original_t5'
        : !activeT8.length ? 'eligible_rule_did_not_emit_t8'
        : 'emitted_t8_not_rendered';
    rows.push({
      birth: stamp,
      calculationHash: snapshot.calculationHash,
      state: report.state,
      selectedT8: selected,
      noT8,
      cause,
      originalActiveT5ClaimTypes: activeT5Types,
      originalEligibleT8RuleIds: eligibleRules.map(rule => rule.ruleId).sort(),
      originalActiveT8ClaimTypes: activeT8.map(claim => claim.claimType).sort(),
    });
  }
  const missing = rows.filter(row => row.noT8);
  if (rows.length !== COUNT || used.size !== COUNT ||
      rows[0]?.birth !== '1998-03-28 22:19' ||
      rows[1]?.birth !== '1971-02-24 21:59' ||
      missing.length !== 111 ||
      rows.filter(row => !row.noT8).length !== 389 ||
      rows.some(row => !row.calculationHash || !row.cause)) {
    throw new Error('Historical replay is not the original immutable 500-case / 389-selected baseline');
  }
  return {
    sourceCommit: BASELINE_SHA,
    originalAuditRunId: 40122318503,
    referenceDateTime: REFERENCE,
    seed: '0x5a1a2026',
    count: COUNT,
    withWealthT8: 389,
    withoutWealthT8: 111,
    replayMethod: 'original_sha_build_same_seed_engine_and_original_registry',
    cases: rows,
  };
}
if (process.argv[1]?.endsWith('saju-500-historical-wealth-replay.mjs')) {
  const result = replayHistoricalWealthCases();
  if (!process.argv[2]) throw new Error('Historical replay requires an output file');
  writeFileSync(process.argv[2], JSON.stringify(result, null, 2) + '\n', 'utf8');
  process.stdout.write('SAJU500_HISTORICAL_WEALTH_REPLAY ' + JSON.stringify({
    headSha: result.sourceCommit, count: result.count,
    withT8: result.withWealthT8, withoutT8: result.withoutWealthT8,
  }) + '\n');
}
