import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { NarrativePolicy } from '../contracts/narrative.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import type { NarrativeModelAdapter } from '../llm/model-adapter.js';
import type { ConsumerReadingRequestInput } from './consumer-reading-request-adapter.js';
import {
  executeProductReading,
  type GovernedReadingExecutionOptions,
} from './governed-reading-execution.js';
import {
  buildProductReadingDelivery,
  type ProductReadingDeliveryResult,
} from './product-reading-delivery.js';

export const PRODUCT_READING_SERVICE_VERSION = 'myeonghwa-product-reading-service-v1';

export type ProductReadingServiceOptions = GovernedReadingExecutionOptions;

/**
 * Governed product-facing reading facade.
 *
 * Consumer request states are returned as ProductReadingDeliveryResult values.
 * Operational configuration or engine invariant failures remain exceptions and
 * must be handled by the hosting API as operational failures, not reinterpreted
 * as consumer-facing Saju meaning.
 */
export async function requestProductReading(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  input: ConsumerReadingRequestInput,
  adapter: NarrativeModelAdapter,
  narrativePolicy: NarrativePolicy,
  options: ProductReadingServiceOptions,
): Promise<ProductReadingDeliveryResult> {
  const execution = await executeProductReading(
    snapshot,
    interpretation,
    registry,
    input,
    adapter,
    narrativePolicy,
    options,
  );
  return buildProductReadingDelivery(execution);
}
