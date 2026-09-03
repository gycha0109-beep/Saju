import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { NarrativePolicy } from '../src/contracts/narrative.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import {
  createMyeonghwaProductHost,
  type ProductHostInterpretationRequestContext,
} from '../src/host/product-host.js';
import type { NarrativeModelAdapter } from '../src/llm/model-adapter.js';
import { deriveAnnualStemTenGod } from '../src/reading/annual-interpretation-facts.js';
import type { ProductReadingServiceOptions } from '../src/reading/product-reading-service.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');
const STOP_AFTER_INTERPRET = new Error('stop after annual interpretation context capture');

const unusedAdapter = {
  async generateStructured(): Promise<never> {
    throw new Error('narrative adapter must not run in this host context test');
  },
} as unknown as NarrativeModelAdapter;

const unusedNarrativePolicy = {} as NarrativePolicy;
const unusedReadingOptions = {} as ProductReadingServiceOptions;

describe('product host annual temporal facts', () => {
  it('calculates the natal snapshot before enriching an 올해 운세 request with personalized annual facts', async () => {
    const seenContexts: ProductHostInterpretationRequestContext[] = [];
    let calculatedSnapshot: CanonicalSajuSnapshot | undefined;

    const host = createMyeonghwaProductHost({
      calculate(input) {
        const snapshot = calculateCanonicalSajuSnapshot(
          input,
          PRODUCTION_DEFAULT_CALCULATION_POLICY,
          { now: NOW },
        );
        calculatedSnapshot = snapshot;
        return snapshot;
      },
      interpret(_snapshot, _context, requestContext) {
        if (requestContext !== undefined) seenContexts.push(requestContext);
        throw STOP_AFTER_INTERPRET;
      },
      adapter: unusedAdapter,
      narrativePolicy: unusedNarrativePolicy,
      readingOptions: unusedReadingOptions,
      requestIdFactory: () => 'annual-context-test',
      requestNowFactory: () => NOW,
    });

    await expect(
      host.requestReading({
        birth: {
          calendarType: 'solar',
          date: '1996-01-09',
          time: '09:30',
          sex: 'male',
        },
        reading: { text: '올해 운세' },
      }),
    ).rejects.toBe(STOP_AFTER_INTERPRET);

    expect(seenContexts).toHaveLength(1);
    const requestContext = seenContexts[0];
    if (requestContext === undefined) throw new Error('annual request context was not captured');
    expect(requestContext.readingRequest.intent).toEqual({ domain: 'general', temporalScope: 'annual' });
    expect(requestContext.readingRequest.targetPeriod).toMatchObject({
      scope: 'annual',
      year: 2026,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      resolution: 'relative_current',
    });
    expect(requestContext.temporalFacts).toMatchObject({
      schemaVersion: 'myeongha-annual-interpretation-facts-v1',
      policyId: 'myeongha-annual-interpretation-policy-v1',
      scope: 'annual',
      targetYear: 2026,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      annualPillar: { stem: '병', branch: '오', cycleIndex: 42 },
    });

    if (calculatedSnapshot?.derivedFacts.dayMaster.status !== 'resolved') {
      throw new Error('fixture requires a resolved natal day master');
    }
    expect(requestContext.temporalFacts.annualStemTenGod).toBe(
      deriveAnnualStemTenGod(calculatedSnapshot.derivedFacts.dayMaster.value, '병'),
    );
    expect(requestContext.temporalFacts.annualBranchRelations).toBeDefined();
  });
});
