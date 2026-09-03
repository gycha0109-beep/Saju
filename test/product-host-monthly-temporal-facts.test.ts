import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { NarrativePolicy } from '../src/contracts/narrative.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import {
  createMyeonghwaProductHost,
  type ProductHostInterpretationRequestContext,
} from '../src/host/product-host.js';
import type { NarrativeModelAdapter } from '../src/llm/model-adapter.js';
import type { ProductReadingServiceOptions } from '../src/reading/product-reading-service.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');
const STOP_AFTER_INTERPRET = new Error('stop after monthly interpretation context capture');

const unusedAdapter = {
  async generateStructured(): Promise<never> {
    throw new Error('narrative adapter must not run in this host context test');
  },
} as unknown as NarrativeModelAdapter;

const unusedNarrativePolicy = {} as NarrativePolicy;
const unusedReadingOptions = {} as ProductReadingServiceOptions;

describe('product host monthly temporal facts', () => {
  it('enriches 이번 달 운세 with two solar-term-aware personalized month segments', async () => {
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
      requestIdFactory: () => 'monthly-context-test',
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
        reading: { text: '이번 달 운세' },
      }),
    ).rejects.toBe(STOP_AFTER_INTERPRET);

    expect(seenContexts).toHaveLength(1);
    const requestContext = seenContexts[0];
    if (requestContext === undefined) throw new Error('monthly request context was not captured');
    expect(requestContext.readingRequest.intent).toEqual({ domain: 'general', temporalScope: 'monthly' });
    expect(requestContext.readingRequest.targetPeriod).toMatchObject({
      scope: 'monthly',
      year: 2026,
      month: 9,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      resolution: 'relative_current',
    });
    expect(requestContext.temporalFacts).toMatchObject({
      schemaVersion: 'myeongha-monthly-interpretation-facts-v1',
      policyId: 'myeongha-monthly-interpretation-policy-v1',
      scope: 'monthly',
      targetYear: 2026,
      targetMonth: 9,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      jeolBoundary: { index: 16, name: '백로', hanja: '白露' },
      segments: [
        {
          segmentId: 'before_jeol',
          monthlyPillar: { stem: '병', branch: '신' },
        },
        {
          segmentId: 'after_jeol',
          monthlyPillar: { stem: '정', branch: '유' },
        },
      ],
    });

    if (calculatedSnapshot?.derivedFacts.dayMaster.status !== 'resolved') {
      throw new Error('fixture requires a resolved natal day master');
    }
    const segments = requestContext.temporalFacts.segments;
    if (!Array.isArray(segments) || segments.length !== 2) {
      throw new Error('monthly temporal facts must expose exactly two segments');
    }
    for (const segment of segments) {
      if (segment === null || typeof segment !== 'object') {
        throw new Error('monthly temporal segment must be an object');
      }
      expect('monthlyStemTenGod' in segment).toBe(true);
      expect('monthlyBranchRelations' in segment).toBe(true);
    }
  });
});
