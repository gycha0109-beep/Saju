import {
  createSajuA4AuthenticatedCaptureCompositionV1,
  type SajuA4AuthenticatedCaptureConfigV1,
} from './reading-ai-a4-authenticated-capture-composition-v1.js';
import { createSajuA4LocalSourcePoolV1 } from './reading-ai-a4-local-postgres-pool-v1.js';

export interface SajuA4LocalCaptureBindingConfigV1 {
  readonly claimWriterPassword: string;
  readonly receiptWriterPassword: string;
  readonly trustedCaPem: string;
  readonly port?: number;
  readonly a4: Omit<
    SajuA4AuthenticatedCaptureConfigV1,
    'claimPool' | 'sourceReceiptPool' | 'sourceRefFactory' | 'fetchImpl'
  >;
}

export function createSajuA4LocalSourcePoolPairV1(
  input: Pick<
    SajuA4LocalCaptureBindingConfigV1,
    'claimWriterPassword' | 'receiptWriterPassword' | 'trustedCaPem' | 'port'
  >,
): Readonly<{
  claimPool: ReturnType<typeof createSajuA4LocalSourcePoolV1>;
  sourceReceiptPool: ReturnType<typeof createSajuA4LocalSourcePoolV1>;
  end(): Promise<void>;
}> {
  if (
    !input ||
    typeof input.claimWriterPassword !== 'string' ||
    typeof input.receiptWriterPassword !== 'string' ||
    input.claimWriterPassword === input.receiptWriterPassword
  ) {
    throw new TypeError('Separate local Source claim and receipt credentials required');
  }
  const connection = {
    trustedCaPem: input.trustedCaPem,
    ...(input.port === undefined ? {} : { port: input.port }),
  };
  const claimPool = createSajuA4LocalSourcePoolV1({
    ...connection,
    role: 'saju_a4_prepared_attempt_claim_writer_v1',
    password: input.claimWriterPassword,
  });

  let sourceReceiptPool: ReturnType<typeof createSajuA4LocalSourcePoolV1> | undefined;
  try {
    sourceReceiptPool = createSajuA4LocalSourcePoolV1({
      ...connection,
      role: 'saju_a4_provider_receipt_writer_v1',
      password: input.receiptWriterPassword,
    });
    const writer = sourceReceiptPool;
    return Object.freeze({
      claimPool,
      sourceReceiptPool: writer,
      async end(): Promise<void> {
        const outcomes = await Promise.allSettled([claimPool.end(), writer.end()]);
        const failures = outcomes
          .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
          .map((result) => result.reason as unknown);
        if (failures.length > 0) {
          throw new AggregateError(failures, 'Failed to close local A4 Source pools');
        }
      },
    });
  } catch (error) {
    void claimPool.end().catch(() => undefined);
    throw error;
  }
}

/**
 * Local Docker-only wiring for the existing authenticated A4 capture instance.
 * Does not start a host, contact MyeongHa, dispatch an AI call, or grant
 * Production interpretation authority. A separate receipt reader remains
 * reserved for MyeongHa's independent cost-replay path.
 */
export async function createUnstartedSajuA4LocalCaptureBindingV1(
  input: SajuA4LocalCaptureBindingConfigV1,
): Promise<
  Readonly<{
    capture: ReturnType<typeof createSajuA4AuthenticatedCaptureCompositionV1>;
    end(): Promise<void>;
  }>
> {
  if (!input?.a4) throw new TypeError('Local A4 capture configuration required');
  const pools = createSajuA4LocalSourcePoolPairV1(input);
  try {
    const capture = createSajuA4AuthenticatedCaptureCompositionV1({
      ...input.a4,
      claimPool: pools.claimPool,
      sourceReceiptPool: pools.sourceReceiptPool,
    });
    return Object.freeze({ capture, end: pools.end });
  } catch (error) {
    try {
      await pools.end();
    } catch (closeError) {
      throw new AggregateError([error, closeError], 'A4 capture setup and cleanup failed', {
        cause: closeError,
      });
    }
    throw error;
  }
}
