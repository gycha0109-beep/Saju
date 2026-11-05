import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
} from './canonical-reading-semantics.js';

/**
 * Locale identifiers that the localization contract understands.
 * Catalog membership is NOT evidence that a renderer or public product exists.
 */
export const READING_LOCALE_CATALOG_V1 = [
  'ko-KR',
  'en-US',
  'ja-JP',
  'zh-CN',
  'zh-TW',
  'vi-VN',
  'ms-MY',
  'id-ID',
] as const;

export type ReadingLocaleV1 = (typeof READING_LOCALE_CATALOG_V1)[number];

export const READING_LOCALIZATION_CONTRACT_VERSION_V1 =
  'myeonghwa-reading-localization-contract-v1' as const;

export interface ReadingLocalePreferencesV1 {
  /** Explicit per-reading request takes precedence. */
  readingLocale?: string;
  accountLocale?: string;
  uiLocale?: string;
}

/** Reject unknown language requests instead of silently changing the reading language. */
export function resolveReadingLocaleV1(
  preferences: ReadingLocalePreferencesV1,
): ReadingLocaleV1 {
  const requested =
    preferences.readingLocale ??
    preferences.accountLocale ??
    preferences.uiLocale ??
    'ko-KR';
  if (!(READING_LOCALE_CATALOG_V1 as readonly string[]).includes(requested)) {
    throw new RangeError('Unsupported reading locale: ' + requested);
  }
  return requested as ReadingLocaleV1;
}

export interface ReadingLocalizationRendererV1 {
  /** Registration is explicit; a locale in the catalog alone is not renderable. */
  locale: ReadingLocaleV1;
  rendererVersion: string;
  glossaryVersion: string;
  /**
   * Internal rendering only. A renderer must not infer new Claim meaning.
   * Textual semantic equivalence still requires independent language review.
   */
  render(input: {
    semantics: CanonicalReadingSemanticBundleV1;
    plan: ReadingLocalizationPlanV1;
  }): Promise<readonly LocalizedReadingUnitV1[]> | readonly LocalizedReadingUnitV1[];
}

export interface LocalizedReadingUnitV1 {
  unitId: string;
  claimId: string;
  text: string;
  /** Every source-owned qualifier must survive localization. */
  qualifiers: readonly { qualifierId: string; text: string }[];
}

export interface ReadingLocalizationPlanV1 {
  contractVersion: typeof READING_LOCALIZATION_CONTRACT_VERSION_V1;
  /** Opaque authorized request/subject scope from the caller; never public. */
  requestScopeKey: string;
  locale: ReadingLocaleV1;
  semanticHash: string;
  snapshotId: string;
  interpretationRunId: string;
  registrySnapshotId: string;
  rendererVersion: string;
  glossaryVersion: string;
  cacheKey: string;
  primaryUnits: readonly {
    unitId: string;
    claimId: string;
    qualifierIds: readonly string[];
    prohibitedExtensions: readonly string[];
  }[];
  constraints: {
    mayRecalculate: false;
    mayGenerateClaims: false;
    mayDropRequiredQualifiers: false;
    mayPromoteResearchAuthority: false;
    mayFallbackToAnotherLocale: false;
    mayExposeInternalIdsToConsumers: false;
    mayTreatStructuralChecksAsSemanticReview: false;
  };
}

export interface LocalizedReadingInternalV1 {
  contractVersion: typeof READING_LOCALIZATION_CONTRACT_VERSION_V1;
  state: 'internal_preview_only';
  locale: ReadingLocaleV1;
  semanticHash: string;
  cacheKey: string;
  contentHash: string;
  units: readonly LocalizedReadingUnitV1[];
  /** Never deliver this internal object directly through ProductReadingResponse. */
  constraints: ReadingLocalizationPlanV1['constraints'];
}

const CONSTRAINTS = Object.freeze({
  mayRecalculate: false as const,
  mayGenerateClaims: false as const,
  mayDropRequiredQualifiers: false as const,
  mayPromoteResearchAuthority: false as const,
  mayFallbackToAnotherLocale: false as const,
  mayExposeInternalIdsToConsumers: false as const,
  mayTreatStructuralChecksAsSemanticReview: false as const,
});

function requireNonempty(name: string, value: string): string {
  const normalized = value.trim();
  if (normalized.length === 0) {
    throw new TypeError(name + ' must be non-empty.');
  }
  return normalized;
}

/**
 * CanonicalReadingSemanticBundleV1 is the existing language-neutral meaning IR.
 * Its optional Korean canonicalText is source-owned evidence, not a translation
 * source or an authorization to invent meaning in other languages.
 */
export function planReadingLocalizationV1(
  semantics: CanonicalReadingSemanticBundleV1,
  preferences: ReadingLocalePreferencesV1,
  requestScopeKey: string,
  renderer: Pick<ReadingLocalizationRendererV1, 'locale' | 'rendererVersion' | 'glossaryVersion'>,
): ReadingLocalizationPlanV1 {
  assertCanonicalReadingSemanticBundleV1(semantics);
  const locale = resolveReadingLocaleV1(preferences);
  if (renderer.locale !== locale) {
    throw new RangeError('No registered renderer for requested reading locale: ' + locale);
  }
  const scope = requireNonempty('requestScopeKey', requestScopeKey);
  const rendererVersion = requireNonempty('rendererVersion', renderer.rendererVersion);
  const glossaryVersion = requireNonempty('glossaryVersion', renderer.glossaryVersion);
  const primaryUnits = semantics.units
    .filter((unit) => unit.role === 'primary')
    .map((unit) => ({
      unitId: unit.unitId,
      claimId: unit.claimId,
      qualifierIds: (unit.semanticQualifiers ?? []).map((qualifier) => qualifier.qualifierId),
      prohibitedExtensions: [...unit.prohibitedExtensions],
    }));

  const cacheKey = 'reading_locale_' + deterministicContentHash({
    contractVersion: READING_LOCALIZATION_CONTRACT_VERSION_V1,
    requestScopeKey: scope,
    locale,
    semanticHash: semantics.semanticHash,
    snapshotId: semantics.snapshotId,
    interpretationRunId: semantics.interpretationRunId,
    registrySnapshotId: semantics.registrySnapshotId,
    rendererVersion,
    glossaryVersion,
  }).slice(0, 32);

  return {
    contractVersion: READING_LOCALIZATION_CONTRACT_VERSION_V1,
    requestScopeKey: scope,
    locale,
    semanticHash: semantics.semanticHash,
    snapshotId: semantics.snapshotId,
    interpretationRunId: semantics.interpretationRunId,
    registrySnapshotId: semantics.registrySnapshotId,
    rendererVersion,
    glossaryVersion,
    cacheKey,
    primaryUnits,
    constraints: CONSTRAINTS,
  };
}

function validateLocalizedUnits(
  plan: ReadingLocalizationPlanV1,
  units: readonly LocalizedReadingUnitV1[],
): readonly LocalizedReadingUnitV1[] {
  const expected = new Map(plan.primaryUnits.map((unit) => [unit.claimId, unit]));
  if (units.length !== expected.size) {
    throw new TypeError('Localized reading must contain exactly one result per primary Claim.');
  }
  const seen = new Set<string>();
  const normalized: LocalizedReadingUnitV1[] = [];
  for (const unit of units) {
    const source = expected.get(unit.claimId);
    if (source === undefined || source.unitId !== unit.unitId || seen.has(unit.claimId)) {
      throw new TypeError('Localized reading references an unknown or duplicate primary Claim.');
    }
    seen.add(unit.claimId);
    const text = requireNonempty('Localized reading text', unit.text);
    const qualifierIds = new Set<string>();
    const qualifiers = unit.qualifiers.map((qualifier) => {
      if (
        !source.qualifierIds.includes(qualifier.qualifierId) ||
        qualifierIds.has(qualifier.qualifierId)
      ) {
        throw new TypeError('Localized reading qualifier is unknown or duplicated.');
      }
      qualifierIds.add(qualifier.qualifierId);
      return {
        qualifierId: qualifier.qualifierId,
        text: requireNonempty('Localized qualifier text', qualifier.text),
      };
    });
    if (qualifierIds.size !== source.qualifierIds.length) {
      throw new TypeError('Localized reading cannot omit source-owned qualifiers.');
    }
    normalized.push({ unitId: unit.unitId, claimId: unit.claimId, text, qualifiers });
  }
  return plan.primaryUnits.map((source) => {
    const unit = normalized.find((candidate) => candidate.claimId === source.claimId);
    if (unit === undefined) throw new TypeError('Localized reading is missing a primary Claim.');
    return unit;
  });
}

/**
 * Runs only the explicitly requested locale renderer. No all-language fanout,
 * automatic fallback, persistence, consumer exposure, or new authority grant.
 */
export async function renderReadingOnDemandV1(
  semantics: CanonicalReadingSemanticBundleV1,
  preferences: ReadingLocalePreferencesV1,
  requestScopeKey: string,
  renderer: ReadingLocalizationRendererV1,
): Promise<LocalizedReadingInternalV1> {
  const plan = planReadingLocalizationV1(semantics, preferences, requestScopeKey, renderer);
  const units = validateLocalizedUnits(
    plan,
    await renderer.render({ semantics, plan }),
  );
  return {
    contractVersion: READING_LOCALIZATION_CONTRACT_VERSION_V1,
    state: 'internal_preview_only',
    locale: plan.locale,
    semanticHash: plan.semanticHash,
    cacheKey: plan.cacheKey,
    contentHash: deterministicContentHash({
      contractVersion: plan.contractVersion,
      cacheKey: plan.cacheKey,
      units,
    }),
    units,
    constraints: CONSTRAINTS,
  };
}
