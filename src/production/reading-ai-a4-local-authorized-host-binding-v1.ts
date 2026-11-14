import { createUnstartedSajuA4CapturedProductionHostV1 } from './reading-ai-a4-authorized-product-host-composition-v1.js';
import {
  inspectMyeonghwaProductionComposition,
  ProductionCompositionBlockedError,
} from './production-composition.js';
import {
  createSajuA4LocalSourcePoolPairV1,
  type SajuA4LocalCaptureBindingConfigV1,
} from './reading-ai-a4-local-capture-binding-v1.js';

type AuthorizedHostInput = Parameters<typeof createUnstartedSajuA4CapturedProductionHostV1>[0];

/**
 * Connects existing local Docker claim/receipt pools to the existing A4
 * authorized Production host factory. This is NOT a new host, deployment
 * entry point, server.listen, or Production service credential provisioner.
 *
 * Authority is inspected before even creating local DB pools. Without real
 * governed interpretation authority the Saju host remains blocked.
 */
export async function createUnstartedSajuA4LocalAuthorizedHostBindingV1(
  input: Readonly<
    Omit<AuthorizedHostInput, 'a4'> & {
      local: SajuA4LocalCaptureBindingConfigV1;
    }
  >,
): Promise<
  Readonly<
    ReturnType<typeof createUnstartedSajuA4CapturedProductionHostV1> & {
      end(): Promise<void>;
    }
  >
> {
  if (!input?.production || !input.local?.a4)
    throw new TypeError('Governed Production request and local A4 Source configuration required');

  const inspection = inspectMyeonghwaProductionComposition(input.production);
  if (inspection.status === 'blocked')
    throw new ProductionCompositionBlockedError(inspection.blockers);

  const pools = createSajuA4LocalSourcePoolPairV1(input.local);
  try {
    const composed = createUnstartedSajuA4CapturedProductionHostV1({
      production: input.production,
      narrativePolicy: input.narrativePolicy,
      openAI: input.openAI,
      host: input.host,
      a4: {
        ...input.local.a4,
        claimPool: pools.claimPool,
        sourceReceiptPool: pools.sourceReceiptPool,
      },
    });
    return Object.freeze({ ...composed, end: pools.end });
  } catch (error) {
    try {
      await pools.end();
    } catch (closeError) {
      throw new AggregateError([error, closeError], 'A4 host setup and cleanup failed', {
        cause: closeError,
      });
    }
    throw error;
  }
}
