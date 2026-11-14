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
  if (
    !input ||
    !input.a4 ||
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

  let receiptPool: ReturnType<typeof createSajuA4LocalSourcePoolV1> | undefined;
  try {
    receiptPool = createSajuA4LocalSourcePoolV1({
      ...connection,
      role: 'saju_a4_provider_receipt_writer_v1',
      password: input.receiptWriterPassword,
    });
    const capture = createSajuA4AuthenticatedCaptureCompositionV1({
      ...input.a4,
      claimPool,
      sourceReceiptPool: receiptPool,
    });

    const writer = receiptPool;
    return Object.freeze({
      capture,
      async end(): Promise<void> {
        const outcomes = await Promise.allSettled([claimPool.end(), writer.end()]);
        const failed = outcomes
          .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
          .map((result) => result.reason as unknown);
        if (failed.length > 0) {
          throw new AggregateError(failed, 'Failed to close local A4 Source pools');
        }
      },
    });
  } catch (error) {
    await Promise.allSettled([claimPool.end(), ...(receiptPool ? [receiptPool.end()] : [])]);
    throw error;
  }
}
