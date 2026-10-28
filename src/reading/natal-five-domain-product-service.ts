import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { buildReadingArtifactShell } from './reading-artifact-shell.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';
import {
  requestProductReading,
  type ProductReadingServiceOptions,
} from './product-reading-service.js';
import type { LegacyNarrativeRuntimeV1 } from './governed-reading-execution.js';
import type { ConsumerReadingRequestInput } from './consumer-reading-request-adapter.js';
import type {
  ProductReadingResponse,
  ProductReadingResponseState,
} from './product-reading-response.js';

export const NATAL_FIVE_DOMAIN_PRODUCT_BUNDLE_VERSION =
  'myeonghwa-natal-five-domain-product-bundle-v1' as const;

export const NATAL_FIVE_DOMAIN_PRODUCT_ORDER = Object.freeze([
  { domain: 'general', title: '전체 사주', requestText: '전체 사주' },
  { domain: 'career', title: '직업·커리어', requestText: '직업운' },
  { domain: 'wealth', title: '재물', requestText: '재물운' },
  { domain: 'business', title: '사업', requestText: '사업운' },
  { domain: 'relationship', title: '연애·관계', requestText: '연애운' },
] as const);

export type NatalFiveDomainKey = typeof NATAL_FIVE_DOMAIN_PRODUCT_ORDER[number]['domain'];

export interface NatalFiveDomainProductEntry {
  domain: NatalFiveDomainKey;
  title: string;
  state: ProductReadingResponseState;
  response: ProductReadingResponse;
}

export interface NatalFiveDomainProductBundle {
  bundleId: string;
  version: typeof NATAL_FIVE_DOMAIN_PRODUCT_BUNDLE_VERSION;
  /**
   * Delivery is not a claim that a full, meaningful natal synthesis is complete.
   * Each response retains its own governed meaning and insufficient-evidence state.
   */
  deliveryState: 'all_delivered' | 'some_delivered' | 'none_delivered';
  deliveredDomainCount: number;
  domains: readonly NatalFiveDomainProductEntry[];
}

export interface NatalFiveDomainProductRequest {
  requestId: string;
  outputPreferences?: ConsumerReadingRequestInput['outputPreferences'];
}

/**
 * A single canonical chart and a single interpretation execution feed the
 * five existing governed natal reading routes. Do not collapse source scopes
 * or infer a sixth cross-domain meaning from their co-presence.
 *
 * Only transport-safe ProductReadingResponse values cross this public facade;
 * internal claim IDs, snapshot hashes and audit objects are not included.
 */
export async function requestNatalFiveDomainReadings(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  input: NatalFiveDomainProductRequest,
  options: ProductReadingServiceOptions,
  legacyNarrativeRuntime?: LegacyNarrativeRuntimeV1,
): Promise<NatalFiveDomainProductBundle> {
  const requestId = input.requestId.trim();
  if (!requestId) throw new TypeError('Natal bundle requestId must be nonempty.');
  if (interpretation.run.snapshotId !== snapshot.snapshotId) {
    throw new TypeError('Natal bundle requires the same canonical snapshot as interpretation.');
  }

  const responses: ProductReadingResponse[] = [];
  for (const topic of NATAL_FIVE_DOMAIN_PRODUCT_ORDER) {
    const response = await requestProductReading(
      snapshot,
      interpretation,
      registry,
      {
        requestId: requestId + ':' + topic.domain,
        text: topic.requestText,
        ...(input.outputPreferences === undefined
          ? {}
          : { outputPreferences: input.outputPreferences }),
      },
      options,
      legacyNarrativeRuntime,
    );
    responses.push(response);
  }
  return assembleNatalFiveDomainProductResponses(snapshot, responses);
}

/** The five-domain bundle is an API convenience, never a priority tier.
 * In particular, a transported interpretation for one subject/topic cannot
 * occupy another subject/topic's slot just because it arrived at the same index.
 * Compare the canonical birth *display* using the same shell as the artifact,
 * not newly inferred astrological properties or a caller-provided label.
 */
function assertNatalDomainResponseIdentity(
  snapshot: CanonicalSajuSnapshot,
  topic: typeof NATAL_FIVE_DOMAIN_PRODUCT_ORDER[number],
  response: ProductReadingResponse,
): void {
  const context = response.requestContext;
  const isDelivered =
    response.state === 'delivered' || response.state === 'delivered_with_fallback';
  if (!isDelivered && response.reading !== undefined) {
    throw new TypeError('Natal bundle cannot show a reading from a blocked response.');
  }
  if (isDelivered && (context === undefined || response.reading === undefined)) {
    throw new TypeError('Natal bundle delivered response requires source-bound topic and person.');
  }
  if (context !== undefined) {
    const scope = context.intent;
    if (context.requestedText !== topic.requestText ||
        scope.domain !== topic.domain || scope.temporalScope !== 'natal' ||
        (scope.relationshipScope ?? null) !==
          (topic.domain === 'relationship' ? 'general' : null) ||
        context.calculationSex !==
          (snapshot.input.sexForTraditionalCalculation ?? 'unspecified')) {
      throw new TypeError('Natal bundle received a different requested reading intent.');
    }
  }
  if (response.reading !== undefined) {
    const expected = buildReadingArtifactShell(snapshot).subject.birthInputDisplay;
    const actual = response.reading.subject.birthInputDisplay;
    if (actual.calendarType !== expected.calendarType ||
        actual.date !== expected.date ||
        actual.timeKnown !== expected.timeKnown ||
        (actual.time ?? null) !== (expected.time ?? null) ||
        (actual.leapMonth ?? null) !== (expected.leapMonth ?? null)) {
      throw new TypeError('Natal bundle received a reading for a different birth input.');
    }
  }
}

export function assembleNatalFiveDomainProductResponses(
  snapshot: CanonicalSajuSnapshot,
  responses: readonly ProductReadingResponse[],
): NatalFiveDomainProductBundle {
  if (responses.length !== NATAL_FIVE_DOMAIN_PRODUCT_ORDER.length) {
    throw new TypeError('Natal bundle requires exactly five governed domain responses.');
  }
  const domains: NatalFiveDomainProductEntry[] =
    NATAL_FIVE_DOMAIN_PRODUCT_ORDER.map((topic, index) => {
      const response = responses[index]!;
      if (!response || response.responseVersion.length === 0) {
        throw new TypeError('Natal bundle requires a governed response for each domain.');
      }
      assertNatalDomainResponseIdentity(snapshot, topic, response);
      return {
        domain: topic.domain,
        title: topic.title,
        state: response.state,
        response,
      };
    });
  const deliveredDomainCount = domains.filter(domain =>
    domain.state === 'delivered' || domain.state === 'delivered_with_fallback',
  ).length;
  const deliveryState = deliveredDomainCount === domains.length
    ? 'all_delivered' as const
    : deliveredDomainCount === 0
      ? 'none_delivered' as const
      : 'some_delivered' as const;
  const identity = {
    version: NATAL_FIVE_DOMAIN_PRODUCT_BUNDLE_VERSION,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    domainResponses: domains.map(domain => ({
      domain: domain.domain, responseId: domain.response.responseId,
    })),
  };

  return {
    bundleId: 'natal_bundle_' + deterministicContentHash(identity).slice(0, 24),
    version: NATAL_FIVE_DOMAIN_PRODUCT_BUNDLE_VERSION,
    deliveryState,
    deliveredDomainCount,
    domains,
  };
}
