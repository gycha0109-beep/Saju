import type {
  CanonicalReadingSemanticBundleV1,
  CanonicalReadingSemanticTextV1,
} from './canonical-reading-semantics.js';
import {
  renderReadingOnDemandV1,
  type LocalizedReadingInternalV1,
  type ReadingLocalizationRendererV1,
} from './reading-localization.js';

export const KOREAN_SOURCE_BOUND_RENDERER_VERSION_V1 =
  'myeonghwa-ko-source-bound-renderer-v1' as const;

/**
 * This identifies the existing admitted Korean expressions, NOT a new
 * vocabulary approval or a translation glossary.
 */
export const KOREAN_SOURCE_BOUND_COPY_POLICY_VERSION_V1 =
  'myeonghwa-existing-ko-source-copy-v1' as const;

/**
 * E-3: Preserve precisely the existing source-owned Korean headline/summary,
 * including their order. Never paraphrase or translate Claim semantics.
 * The result is still INTERNAL ONLY; consumer redaction, Preview/Official
 * admission and server-side subject authorization remain separate.
 */
function existingKoreanText(
  text: CanonicalReadingSemanticTextV1 | undefined,
  description: string,
): string {
  const headline = text?.headline;
  const summary = text?.summary;
  const lines = [headline, summary].filter(
    (part): part is string => typeof part === 'string' && part.trim().length > 0,
  );
  if (lines.length === 0) {
    throw new TypeError('Korean source renderer requires existing ' + description +
      ' text; it cannot generate missing Korean meaning.');
  }
  // Avoid printing an identical headline/summary twice, without rewriting it.
  return [...new Set(lines)].join('\n');
}

export const KOREAN_SOURCE_BOUND_READING_RENDERER_V1: ReadingLocalizationRendererV1 =
  Object.freeze({
    locale: 'ko-KR',
    rendererVersion: KOREAN_SOURCE_BOUND_RENDERER_VERSION_V1,
    glossaryVersion: KOREAN_SOURCE_BOUND_COPY_POLICY_VERSION_V1,
    render({ semantics, plan }: Parameters<ReadingLocalizationRendererV1['render']>[0]) {
      if (plan.locale !== 'ko-KR' || plan.semanticHash !== semantics.semanticHash ||
        plan.rendererVersion !== KOREAN_SOURCE_BOUND_RENDERER_VERSION_V1 ||
        plan.glossaryVersion !== KOREAN_SOURCE_BOUND_COPY_POLICY_VERSION_V1) {
        throw new TypeError('Korean source renderer requires the exact admitted plan.');
      }
      const units = new Map(semantics.units.map((unit) => [unit.claimId, unit]));
      return plan.primaryUnits.map((primary) => {
        const unit = units.get(primary.claimId);
        if (unit === undefined || unit.role !== 'primary' ||
          unit.unitId !== primary.unitId ||
          unit.scenarioRef !== undefined ||
          unit.ruleRefs.length === 0 ||
          unit.sourceRefs.length === 0 ||
          unit.methodologyRef.id.trim().length === 0) {
          throw new TypeError(
            'Korean source renderer requires exact sourced, non-scenario primary Claim.',
          );
        }
        const qualifiers = (unit.semanticQualifiers ?? []).map((qualifier) => ({
          qualifierId: qualifier.qualifierId,
          text: existingKoreanText(
            qualifier.canonicalText, 'required qualifier ' + qualifier.qualifierId,
          ),
        }));
        return {
          unitId: primary.unitId,
          claimId: primary.claimId,
          text: existingKoreanText(unit.canonicalText, 'primary Claim ' + primary.claimId),
          qualifiers,
        };
      });
    },
  });

/**
 * Server/internal E-3 entrypoint. A trusted caller must authenticate the
 * subject/request and provide its opaque authorized scope BEFORE invoking
 * this method or using a cache. It returns neither ProductReadingResponse
 * nor publication/storage/commerce permission.
 */
export function renderExistingKoreanReadingOnDemandV1(
  semantics: CanonicalReadingSemanticBundleV1,
  authorizedRequestScopeKey: string,
): Promise<LocalizedReadingInternalV1> {
  return renderReadingOnDemandV1(
    semantics,
    { readingLocale: 'ko-KR' },
    authorizedRequestScopeKey,
    KOREAN_SOURCE_BOUND_READING_RENDERER_V1,
  );
}
