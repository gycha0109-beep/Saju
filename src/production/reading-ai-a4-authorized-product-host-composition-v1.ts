import type { Server } from 'node:http';
import {
  OpenAIResponsesNarrativeAdapter,
  OPENAI_RESPONSES_ENDPOINT,
  type OpenAIResponsesAdapterConfig,
} from '../llm/openai/openai-responses-adapter.js';
import type { NarrativePolicy } from '../contracts/narrative.js';
import {
  createAuthorizedMyeonghwaProductionHostServer,
  inspectMyeonghwaProductionComposition,
  ProductionCompositionBlockedError,
  type ProductionCompositionRequest,
} from './production-composition.js';
import type { MyeonghwaProductionProductHostServerOptions } from '../host/http-server.js';
import {
  createSajuA4AuthenticatedCaptureCompositionV1,
  type SajuA4AuthenticatedCaptureConfigV1,
} from './reading-ai-a4-authenticated-capture-composition-v1.js';
import { LEGACY_NARRATIVE_RUNTIME_VERSION } from '../reading/governed-reading-execution.js';

/**
 * Pure unmounted composition. Reuses the already-governed production
 * interpretation authority; never substitutes an A4 cost/attempt proof for
 * ProductReadingResponse or Publication authority.
 *
 * One capture instance is bound simultaneously to:
 * - the actual OpenAIResponsesNarrativeAdapter onProviderCall; and
 * - the private authenticated /api/readings host withPreparedAttempt.
 * A separate injected observer/capture, alternate provider transport/endpoint,
 * or fake source-ref factory is denied. The offline adapter tests may mock
 * fetch separately, but the official A4 host must use the real HTTPS endpoint.
 *
 * No server.listen, secret provisioning, production DB changes or API calls.
 */
export function createUnstartedSajuA4CapturedProductionHostV1(
  input: Readonly<{
    production: ProductionCompositionRequest;
    narrativePolicy: NarrativePolicy;
    openAI: Omit<OpenAIResponsesAdapterConfig, 'onProviderCall'>;
    host: Omit<MyeonghwaProductionProductHostServerOptions, 'a4SourceCapture'>;
    a4: SajuA4AuthenticatedCaptureConfigV1;
  }>,
): Readonly<{
  server: Server;
  adapter: OpenAIResponsesNarrativeAdapter;
  capture: ReturnType<typeof createSajuA4AuthenticatedCaptureCompositionV1>;
}> {
  if (
    !input?.production ||
    !input.host ||
    !input.openAI ||
    !input.narrativePolicy ||
    !input.a4 ||
    'legacyNarrativeRuntime' in input.production ||
    'onProviderCall' in input.openAI ||
    'fetchImpl' in input.openAI ||
    (input.openAI.endpoint !== undefined && input.openAI.endpoint !== OPENAI_RESPONSES_ENDPOINT) ||
    'a4SourceCapture' in input.host ||
    input.a4.sourceRefFactory !== undefined
  ) {
    throw new TypeError(
      'A4 production capture cannot override governed narrative, provider transport, callback or source ref',
    );
  }

  // Inspect before constructing any adapter/host; authority blockers remain
  // authoritative, including missing Production Interpretation Registry.
  const inspection = inspectMyeonghwaProductionComposition(input.production);
  if (inspection.status === 'blocked')
    throw new ProductionCompositionBlockedError(inspection.blockers);

  const capture = createSajuA4AuthenticatedCaptureCompositionV1(input.a4);
  const adapter = new OpenAIResponsesNarrativeAdapter({
    ...input.openAI,
    onProviderCall: capture.onProviderCall,
  });
  const server = createAuthorizedMyeonghwaProductionHostServer(
    {
      ...input.production,
      legacyNarrativeRuntime: {
        runtimeVersion: LEGACY_NARRATIVE_RUNTIME_VERSION,
        adapter,
        narrativePolicy: input.narrativePolicy,
      },
    },
    {
      ...input.host,
      a4SourceCapture: capture,
    },
  );
  return Object.freeze({ server, adapter, capture });
}
