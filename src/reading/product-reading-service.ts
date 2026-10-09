import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { NarrativePolicy } from '../contracts/narrative.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import type { NarrativeModelAdapter } from '../llm/model-adapter.js';
import type { ConsumerReadingRequestInput } from './consumer-reading-request-adapter.js';
import {
  executeProductReading,
  type GovernedReadingExecutionOptions,
  type LegacyNarrativeRuntimeV1,
  type GovernedReadingExecutionResult,
} from './governed-reading-execution.js';
import {
  buildProductReadingDelivery,
  type ProductReadingDeliveryResult,
} from './product-reading-delivery.js';
import {
  buildProductReadingResponse,
  type ProductReadingResponse,
} from './product-reading-response.js';

export const PRODUCT_READING_SERVICE_VERSION = 'myeonghwa-product-reading-service-v3';

export type ProductReadingServiceOptions = GovernedReadingExecutionOptions;

/** Internal Saju server execution artifacts. Never expose this from consumer entrypoints. */
export interface ProductReadingInternals {
  readonly execution: GovernedReadingExecutionResult;
  readonly delivery: ProductReadingDeliveryResult;
  readonly response: ProductReadingResponse;
}

function assembleProductReadingInternals(
  execution: GovernedReadingExecutionResult,
): ProductReadingInternals {
  const delivery = buildProductReadingDelivery(execution);
  return { execution, delivery, response: buildProductReadingResponse(delivery) };
}

/** One governed execution; retained solely for Saju-internal provenance inspection. */
export async function runProductReadingInternals(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  input: ConsumerReadingRequestInput,
  options: ProductReadingServiceOptions,
  legacyNarrativeRuntime?: LegacyNarrativeRuntimeV1,
): Promise<ProductReadingInternals> {
  const execution = await executeProductReading(
    snapshot, interpretation, registry, input, options, legacyNarrativeRuntime,
  );
  return assembleProductReadingInternals(execution);
}


/**
 * Governed product-facing reading facade.
 *
 * Consumer request states are returned as transport-safe ProductReadingResponse values.
 * Operational configuration or engine invariant failures remain exceptions and
 * must be handled by the hosting API as operational failures, not reinterpreted
 * as consumer-facing Saju meaning.
 */
function isNarrativeModelAdapter(value: unknown): value is NarrativeModelAdapter {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as Partial<NarrativeModelAdapter>).generateStructured === 'function'
  );
}

export function requestProductReading(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  input: ConsumerReadingRequestInput,
  options: ProductReadingServiceOptions,
  legacyNarrativeRuntime?: LegacyNarrativeRuntimeV1,
): Promise<ProductReadingResponse>;
/** @deprecated Use the authority-neutral options + optional LegacyNarrativeRuntimeV1 signature. */
export function requestProductReading(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  input: ConsumerReadingRequestInput,
  adapter: NarrativeModelAdapter,
  narrativePolicy: NarrativePolicy,
  options: ProductReadingServiceOptions,
): Promise<ProductReadingResponse>;
export async function requestProductReading(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  input: ConsumerReadingRequestInput,
  optionsOrAdapter: ProductReadingServiceOptions | NarrativeModelAdapter,
  runtimeOrPolicy?: LegacyNarrativeRuntimeV1 | NarrativePolicy,
  legacyOptions?: ProductReadingServiceOptions,
): Promise<ProductReadingResponse> {
  if (isNarrativeModelAdapter(optionsOrAdapter)) {
    const execution = await executeProductReading(
      snapshot, interpretation, registry, input,
      optionsOrAdapter, runtimeOrPolicy as NarrativePolicy,
      legacyOptions as ProductReadingServiceOptions,
    );
    return assembleProductReadingInternals(execution).response;
  }
  return (await runProductReadingInternals(
    snapshot, interpretation, registry, input,
    optionsOrAdapter, runtimeOrPolicy as LegacyNarrativeRuntimeV1 | undefined,
  )).response;
}
