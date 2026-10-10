export {
  PRODUCT_HOST_VERSION,
  createMyeonghwaProductHost,
  type MyeonghwaProductHost,
  type MyeonghwaProductHostDependencies,
  type ProductHostBirthRequest,
  type ProductHostExecutionContext,
  type ProductHostInterpretationBundle,
  type ProductHostReadingRequest,
  type ProductHostReadingRequestBody,
} from './host/product-host.js';

export {
  createMyeonghwaProductHostServer,
  type MyeonghwaProductHostServerOptions,
} from './host/http-server.js';

export type { LegacyNarrativeRuntimeV1 } from './reading/governed-reading-execution.js';

/** Opt-in research-lifecycle General Natal Preview host; never a Production authority. */
export {
  GENERAL_NATAL_INTEGRATED_PREVIEW_HOST_VERSION,
  createGeneralNatalIntegratedPreviewProductHost,
  type GeneralNatalIntegratedPreviewHostOptions,
} from './host/general-natal-integrated-preview-host.js';
