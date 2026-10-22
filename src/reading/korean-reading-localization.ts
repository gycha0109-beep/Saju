import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';
import type { ConsumerReadingRequestInput } from './consumer-reading-request-adapter.js';
import type { LegacyNarrativeRuntimeV1 } from './governed-reading-execution.js';
import {
  runProductReadingInternals,
  type ProductReadingServiceOptions,
} from './product-reading-service.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticTextV1,
} from './canonical-reading-semantics.js';
import type { ProductReadingDeliveryResult } from './product-reading-delivery.js';
import { buildProductReadingResponse, type ProductReadingResponse } from './product-reading-response.js';
import { assertProductReadingResponse } from './product-reading-response-admission.js';
import {
  renderReadingOnDemandV1,
  resolveReadingLocaleV1,
  type LocalizedReadingInternalV1,
  type ReadingLocalePreferencesV1,
  type ReadingLocalizationRendererV1,
} from './reading-localization.js';

export const KOREAN_SOURCE_BOUND_RENDERER_VERSION_V1 =
  'myeonghwa-korean-source-bound-renderer-v1' as const;
export const KOREAN_SOURCE_COPY_GLOSSARY_VERSION_V1 =
  'myeonghwa-korean-source-copy-v1' as const;
export const KOREAN_EXISTING_TRANSPORT_BRIDGE_VERSION_V1 =
  'myeonghwa-korean-transport-compatibility-v1' as const;

function exactSourceText(text: CanonicalReadingSemanticTextV1 | undefined): string {
  const headline = text?.headline?.trim();
  const summary = text?.summary?.trim();
  if (headline === undefined && summary === undefined) {
    throw new TypeError('Korean source-bound renderer requires existing source-owned text.');
  }
  if (headline === undefined) return summary ?? '';
  if (summary === undefined || summary === headline) return headline;
  // No interpretation, summarization, paraphrase or added prediction.
  return headline + '\n' + summary;
}

/**
 * Reuse source-owned Korean meaning text, not translation from a consumer
 * paragraph and not an LLM inference. A missing source-owned qualifier/text
 * causes an error; it never manufactures a Korean fortune or default copy.
 */
export function createKoreanSourceBoundRendererV1(): ReadingLocalizationRendererV1 {
  return {
    locale: 'ko-KR',
    rendererVersion: KOREAN_SOURCE_BOUND_RENDERER_VERSION_V1,
    glossaryVersion: KOREAN_SOURCE_COPY_GLOSSARY_VERSION_V1,
    render({ semantics, plan }) {
      const unitsByClaim = new Map(semantics.units.map((unit) => [unit.claimId, unit]));
      return plan.primaryUnits.map((source) => {
        const unit = unitsByClaim.get(source.claimId);
        if (
          unit === undefined ||
          unit.role !== 'primary' ||
          unit.unitId !== source.unitId ||
          unit.sourceRefs.length === 0
        ) {
          throw new TypeError('Korean source-bound renderer requires a matching source-owned primary unit.');
        }
        return {
          unitId: unit.unitId,
          claimId: unit.claimId,
          text: exactSourceText(unit.canonicalText),
          qualifiers: (unit.semanticQualifiers ?? []).map((qualifier) => ({
            qualifierId: qualifier.qualifierId,
            text: exactSourceText(qualifier.canonicalText),
          })),
        };
      });
    },
  };
}

/** One requested language; preserve Canonical meaning and claim boundaries. */
export function renderKoreanSourceBoundOnDemandV1(
  semantics: CanonicalReadingSemanticBundleV1,
  preferences: ReadingLocalePreferencesV1,
  requestScopeKey: string,
): Promise<LocalizedReadingInternalV1> {
  return renderReadingOnDemandV1(
    semantics,
    preferences,
    requestScopeKey,
    createKoreanSourceBoundRendererV1(),
  );
}

export interface KoreanExistingTransportCompatibilityInputV1 {
  /** Must originate from the existing governed delivery. */
  delivery: ProductReadingDeliveryResult;
  /** Unmodified response previously assembled from that exact delivery. */
  response: ProductReadingResponse;
  canonicalSemantics?: CanonicalReadingSemanticBundleV1;
}

export interface KoreanExistingTransportCompatibilityResultV1 {
  bridgeVersion: typeof KOREAN_EXISTING_TRANSPORT_BRIDGE_VERSION_V1;
  locale: 'ko-KR';
  mode: 'preserve_existing_korean_response';
  /** Internal trace metadata; must NOT be transmitted in the consumer body. */
  internalSemanticHash?: string;
  /**
   * Same public response object, with existing redactions, message codes,
   * reading blocks, availability and partial/unsupported handling preserved.
   */
  consumerResponse: ProductReadingResponse;
  constraints: {
    mayRewriteConsumerText: false;
    mayExposeInternalSemanticHashToConsumers: false;
    mayPromoteResearchAuthority: false;
    mayFallbackToAnotherLocale: false;
  };
}

const COMPATIBILITY_CONSTRAINTS = Object.freeze({
  mayRewriteConsumerText: false as const,
  mayExposeInternalSemanticHashToConsumers: false as const,
  mayPromoteResearchAuthority: false as const,
  mayFallbackToAnotherLocale: false as const,
});

/**
 * Bridges the real existing Korean ProductReadingResponse into locale-aware
 * callers without rewriting the original approved/partial/unsupported text.
 * In particular, internal semantic IR never enters the public response.
 */
export function preserveExistingKoreanReadingResponseV1(
  input: KoreanExistingTransportCompatibilityInputV1,
  preferences: ReadingLocalePreferencesV1,
): KoreanExistingTransportCompatibilityResultV1 {
  if (resolveReadingLocaleV1(preferences) !== 'ko-KR') {
    throw new RangeError('Existing Korean response cannot be used for a different reading locale.');
  }
  assertProductReadingResponse(input.response);
  const expected = buildProductReadingResponse(input.delivery);
  if (deterministicContentHash(expected) !== deterministicContentHash(input.response)) {
    throw new TypeError('Existing Korean response must match its governed delivery exactly.');
  }

  const semantics = input.canonicalSemantics;
  if (semantics !== undefined) {
    assertCanonicalReadingSemanticBundleV1(semantics);
    const artifact = input.delivery.artifact;
    if (
      artifact !== undefined &&
      (semantics.snapshotId !== artifact.provenance.snapshotId ||
        semantics.interpretationRunId !== artifact.provenance.interpretationRunId)
    ) {
      throw new TypeError('Korean response and semantic IR do not belong to the same execution.');
    }
    if (
      artifact !== undefined &&
      'canonicalSemanticHash' in artifact.provenance &&
      artifact.provenance.canonicalSemanticHash !== semantics.semanticHash
    ) {
      throw new TypeError('Korean response and semantic IR have different semantic hashes.');
    }
  }

  return {
    bridgeVersion: KOREAN_EXISTING_TRANSPORT_BRIDGE_VERSION_V1,
    locale: 'ko-KR',
    mode: 'preserve_existing_korean_response',
    ...(semantics === undefined ? {} : { internalSemanticHash: semantics.semanticHash }),
    consumerResponse: input.response,
    constraints: COMPATIBILITY_CONSTRAINTS,
  };
}

/**
 * Execute the existing governed Korean path verbatim behind the locale-aware
 * interface. The consumer response is produced by the existing redacting
 * adapter, not by rendering a second inferred interpretation.
 *
 * This is opt-in, server-internal integration: the current public host
 * remains unchanged and non-Korean requests fail before calculation/reading.
 */
export async function runExistingKoreanReadingLocalizedV1(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  input: ConsumerReadingRequestInput,
  options: ProductReadingServiceOptions,
  preferences: ReadingLocalePreferencesV1,
  legacyRuntime?: LegacyNarrativeRuntimeV1,
): Promise<KoreanExistingTransportCompatibilityResultV1> {
  if (resolveReadingLocaleV1(preferences) !== 'ko-KR') {
    throw new RangeError('Existing Korean path cannot execute a different reading locale.');
  }
  const internals = await runProductReadingInternals(
    snapshot,
    interpretation,
    registry,
    input,
    options,
    legacyRuntime,
  );
  return preserveExistingKoreanReadingResponseV1({
    delivery: internals.delivery,
    response: internals.response,
    ...(internals.execution.canonicalSemantics === undefined
      ? {}
      : { canonicalSemantics: internals.execution.canonicalSemantics }),
  }, preferences);
}
