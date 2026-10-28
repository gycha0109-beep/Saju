import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import { createWealthNatalReadingCandidateRegistry } from '../src/research/wealth-natal-reading-candidate.js';

/**
 * This is a NEW fixed 500-case official product admission cohort, not the
 * historical 2026-10-25 randomized 8-menu audit and not the separate
 * Wealth multifactor research-only MUR report.
 */
describe('wealth official product: 500 real calculation-to-T8-to-selection cases', () => {
  it('preserves actual source-qualified Wealth T8 coverage and varies selected meanings', () => {
    const now = new Date('2026-10-25T00:00:00.000Z');
    const registry = createWealthNatalReadingCandidateRegistry(now.toISOString());
    const claimMeaningCombinations = new Set<string>();
    const observedCases: { birth: string; reason: string }[] = [];
    let caseCount = 0;

    outer: for (let month = 1; month <= 12; month++) {
      for (let day = 1; day <= 28; day++) {
        for (const hour of [0, 3, 6, 9, 12, 15, 18, 21]) {
          const birth = '2024-' + String(month).padStart(2, '0') +
            '-' + String(day).padStart(2, '0') + ' ' +
            String(hour).padStart(2, '0') + ':00';
          const snapshot = calculateCanonicalSajuSnapshot({
            calendarType: 'solar',
            date: { year: 2024, month, day },
            time: { known: true, hour, minute: 0 },
            sexForTraditionalCalculation: 'unspecified',
          }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
          const execution = runInterpretation(snapshot, registry, {
            requestId: 'wealth-admission-fixed-' + caseCount, now,
          });
          const reading = prepareProductReading(snapshot, execution, registry, {
            requestId: 'wealth-product-fixed-' + caseCount, text: '재물운',
          });
          const sourceClaims = execution.claims.filter(claim =>
            claim.state === 'active' &&
            claim.taxonomy.tier === 'T8' &&
            claim.taxonomy.category === 'wealth' &&
            claim.predicate === 'wealth_conclusion');
          if (sourceClaims.length === 0 ||
              reading.state !== 'ready_for_execution' ||
              reading.composition?.selection.coverageState !== 'complete' ||
              reading.composition.selection.profileAuthorization.state !== 'authorized') {
            observedCases.push({
              birth,
              reason: reading.state + ' / T8=' + sourceClaims.length +
                ' / ' + reading.reasonCodes.join(','),
            });
          }
          if (sourceClaims.length > 0) {
            claimMeaningCombinations.add(sourceClaims
              .map(claim => claim.claimType).sort().join('|'));
          }
          caseCount++;
          if (caseCount === 500) break outer;
        }
      }
    }
    expect(caseCount).toBe(500);
    expect(observedCases).toEqual([]);
    // Actual T8 interpretation kinds vary. Birth string, hash and display
    // formatting are deliberately excluded from the semantic signature.
    expect(claimMeaningCombinations.size).toBeGreaterThan(10);
  }, 30_000);
});
