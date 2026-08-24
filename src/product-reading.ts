export {
  PRODUCT_READING_SERVICE_VERSION,
  requestProductReading,
  type ProductReadingServiceOptions,
} from './reading/product-reading-service.js';

export type { CanonicalSajuSnapshot } from './contracts/calculation.js';
export type { NarrativePolicy } from './contracts/narrative.js';
export type { InterpretationExecutionResult } from './interpretation/interpretation-engine.js';
export type { ResolvedRuleRegistrySnapshot } from './interpretation/rule-registry.js';
export type {
  NarrativeGenerationParams,
  NarrativeModelAdapter,
} from './llm/model-adapter.js';
export type { ConsumerReadingRequestInput } from './reading/consumer-reading-request-adapter.js';
export type {
  ProductReadingClarification,
  ProductReadingCoverageSummary,
  ProductReadingDeliveryMessageCode,
  ProductReadingDeliveryResult,
  ProductReadingDeliveryState,
  ProductReadingRequiredAction,
} from './reading/product-reading-delivery.js';
