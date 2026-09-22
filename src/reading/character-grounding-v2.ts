import type { ReadingDomain } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  isCanonicalReadingScopeGuardUnitV1,
  type CanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import {
  buildCharacterGroundingBundleV1,
  type CharacterGroundingAmbiguityV1,
  type CharacterGroundingDisclosureV1,
  type CharacterGroundingNarrativeRole,
  type CharacterGroundingRealizationPolicyRef,
  type GroundingAxisKey,
} from './character-grounding.js';

export const CHARACTER_GROUNDING_SCHEMA_VERSION_V2 = 'myeonghwa-character-grounding-v2' as const;
export const CHARACTER_GROUNDING_PROJECTION_VERSION_V2 =
  'myeonghwa-character-grounding-projection-v2' as const;

export interface CharacterGroundingUnitV2 {
  unitId: string;
  domain: ReadingDomain;
  axis: GroundingAxisKey;
  narrativeRole: CharacterGroundingNarrativeRole;
  semanticKey: string;
  canonicalMeaning: string;
  sourceCanonicalUnitRefs: readonly string[];
  qualifiers: readonly string[];
  prohibitedExtensions: readonly string[];
  requiredCompanionUnitRefs: readonly string[];
  requiredDisclosureRefs: readonly string[];
  realizationPolicyRef: CharacterGroundingRealizationPolicyRef;
}

export interface CharacterGroundingBundleV2 {
  schemaVersion: typeof CHARACTER_GROUNDING_SCHEMA_VERSION_V2;
  projectionVersion: typeof CHARACTER_GROUNDING_PROJECTION_VERSION_V2;
  readingRef: string;
  productResponseVersion: string;
  engineVersion: string;
  readingDomain: ReadingDomain;
  sourceResponseHash: string;
  sourceSemanticHash: string;
  groundingHash: string;
  units: readonly CharacterGroundingUnitV2[];
  disclosures: readonly CharacterGroundingDisclosureV1[];
  ambiguities: readonly CharacterGroundingAmbiguityV1[];
}

export interface CharacterGroundingProjectionInputV2 {
  response: unknown;
  semanticBundle: CanonicalReadingSemanticBundleV1;
  engineVersion: string;
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function stringValue(value: unknown, key: string): string | undefined {
  if (!isRecord(value)) return undefined;
  const candidate = value[key];
  return typeof candidate === 'string' && candidate.trim().length > 0
    ? candidate.trim()
    : undefined;
}

function canonicalMeaning(unit: CanonicalReadingSemanticUnitV1): string {
  const primaryMeaning =
    unit.canonicalText?.summary?.trim() ?? unit.canonicalText?.headline?.trim();
  if (primaryMeaning === undefined || primaryMeaning.length === 0) {
    throw new TypeError(
      `Canonical Reading primary unit has no realizable canonical text: ${unit.unitId}`,
    );
  }
  const qualifierMeanings = [
    ...new Set(
      (unit.semanticQualifiers ?? [])
        .map(
          (qualifier) =>
            qualifier.canonicalText?.summary?.trim() ??
            qualifier.canonicalText?.headline?.trim(),
        )
        .filter((value): value is string => value !== undefined && value.length > 0),
    ),
  ];
  return [primaryMeaning, ...qualifierMeanings].join('\n');
}

function axisFor(
  domain: ReadingDomain,
  unit: CanonicalReadingSemanticUnitV1,
): GroundingAxisKey {
  if (domain === 'wealth') {
    switch (stringValue(unit.semanticPayload, 'wealthKind')) {
      case 'friction':
        return 'tension';
      case 'spending':
        return 'decision_style';
      case 'management':
        return 'responsibility';
      case 'value_creation':
        return 'wealth';
      default:
        return 'wealth';
    }
  }

  if (domain === 'general') {
    switch (stringValue(unit.semanticPayload, 'conclusionKind')) {
      case 'core':
        return 'core_identity';
      case 'strength':
        return 'strength';
      case 'tension':
        return 'tension';
      case 'work':
        return 'work';
      case 'money':
        return 'wealth';
      case 'relationship':
        return 'relationship';
      default:
        return 'structure';
    }
  }

  switch (domain) {
    case 'career':
    case 'business':
      return 'work';
    case 'relationship':
      return 'relationship';
    case 'compatibility':
      return 'compatibility';
    case 'life_stage':
      return 'timing';
    case 'family':
    case 'question_specific':
      return 'custom';
  }
}

function narrativeRoleFor(
  unit: CanonicalReadingSemanticUnitV1,
): CharacterGroundingNarrativeRole {
  if (
    stringValue(unit.semanticPayload, 'conclusionKind') === 'tension' ||
    stringValue(unit.semanticPayload, 'wealthKind') === 'friction' ||
    stringValue(unit.semanticPayload, 'careerKind') === 'friction' ||
    stringValue(unit.semanticPayload, 'relationshipKind') === 'friction' ||
    stringValue(unit.semanticPayload, 'businessKind') === 'friction'
  ) {
    return 'tension';
  }
  return 'primary';
}

function canonicalUnitIndex(
  bundle: CanonicalReadingSemanticBundleV1,
): ReadonlyMap<string, CanonicalReadingSemanticUnitV1> {
  return new Map(bundle.units.map((unit) => [unit.claimId, unit]));
}

function sourceCanonicalUnitRefs(
  root: CanonicalReadingSemanticUnitV1,
  index: ReadonlyMap<string, CanonicalReadingSemanticUnitV1>,
): readonly string[] {
  const result = new Set<string>([root.unitId]);
  const pending = [...root.upstreamClaimRefs];
  const visitedClaims = new Set<string>();

  while (pending.length > 0) {
    const claimId = pending.shift();
    if (claimId === undefined || visitedClaims.has(claimId)) continue;
    visitedClaims.add(claimId);
    const unit = index.get(claimId);
    if (unit === undefined) continue;
    result.add(unit.unitId);
    pending.push(...unit.upstreamClaimRefs);
  }

  return [...result].sort();
}

function prohibitedExtensions(
  refs: readonly string[],
  units: readonly CanonicalReadingSemanticUnitV1[],
): readonly string[] {
  const refSet = new Set(refs);
  return [
    ...new Set(
      units
        .filter((unit) => refSet.has(unit.unitId))
        .flatMap((unit) => unit.prohibitedExtensions),
    ),
  ].sort();
}

function qualifiersFor(unit: CanonicalReadingSemanticUnitV1): readonly string[] {
  const payloadQualifiers =
    isRecord(unit.semanticPayload) && Array.isArray(unit.semanticPayload.qualifiers)
      ? unit.semanticPayload.qualifiers.filter(
          (value): value is string => typeof value === 'string' && value.trim().length > 0,
        )
      : [];
  const admittedQualifierKeys = (unit.semanticQualifiers ?? []).flatMap(
    (qualifier) => qualifier.semanticKeys,
  );
  return [
    ...new Set([
      ...payloadQualifiers,
      ...admittedQualifierKeys,
      ...(unit.scenarioRef === undefined ? [] : [`scenario:${unit.scenarioRef}`]),
      ...(unit.polarity === undefined ? [] : [`polarity:${unit.polarity}`]),
      ...(unit.emphasis === undefined ? [] : [`emphasis:${unit.emphasis}`]),
    ]),
  ].sort();
}

function realizationPolicyFor(
  unit: CanonicalReadingSemanticUnitV1,
): CharacterGroundingRealizationPolicyRef {
  return unit.scenarioRef === undefined
    ? 'bounded_semantic_paraphrase_v1'
    : 'protected_only_v1';
}

function semanticKeyFor(
  domain: ReadingDomain,
  unit: CanonicalReadingSemanticUnitV1,
): string {
  return [
    domain,
    unit.taxonomy.subcategory ?? 'general',
    unit.predicate,
  ].join(':');
}

function makeUnit(
  domain: ReadingDomain,
  sourceSemanticHash: string,
  source: CanonicalReadingSemanticUnitV1,
  allUnits: readonly CanonicalReadingSemanticUnitV1[],
  index: ReadonlyMap<string, CanonicalReadingSemanticUnitV1>,
  requiredDisclosureRefs: readonly string[],
  readingScopeProhibitions: readonly string[],
): CharacterGroundingUnitV2 {
  const sourceRefs = sourceCanonicalUnitRefs(source, index);
  const material = {
    domain,
    axis: axisFor(domain, source),
    narrativeRole: narrativeRoleFor(source),
    semanticKey: semanticKeyFor(domain, source),
    canonicalMeaning: canonicalMeaning(source),
    sourceCanonicalUnitRefs: sourceRefs,
    qualifiers: qualifiersFor(source),
    prohibitedExtensions: [
      ...new Set([
        ...prohibitedExtensions(sourceRefs, allUnits),
        ...readingScopeProhibitions,
      ]),
    ].sort(),
    requiredCompanionUnitRefs: [] as readonly string[],
    requiredDisclosureRefs: [...requiredDisclosureRefs].sort(),
    realizationPolicyRef: realizationPolicyFor(source),
  };
  return {
    unitId: `grounding_unit_v2_${deterministicContentHash({
      projectionVersion: CHARACTER_GROUNDING_PROJECTION_VERSION_V2,
      sourceSemanticHash,
      sourceCanonicalUnitId: source.unitId,
      material,
    }).slice(0, 24)}`,
    ...material,
  };
}

function bundleHashMaterial(
  bundle: Omit<CharacterGroundingBundleV2, 'groundingHash'>,
): Omit<CharacterGroundingBundleV2, 'groundingHash'> {
  return bundle;
}

export function buildCharacterGroundingBundleV2(
  input: CharacterGroundingProjectionInputV2,
): CharacterGroundingBundleV2 {
  if (input.engineVersion.trim().length === 0) {
    throw new TypeError('CharacterGroundingProjectionInputV2.engineVersion must not be empty.');
  }
  assertCanonicalReadingSemanticBundleV1(input.semanticBundle);

  const protectedProjection = buildCharacterGroundingBundleV1({
    response: input.response,
    engineVersion: input.engineVersion,
    readingDomain: input.semanticBundle.intent.domain,
  });

  const index = canonicalUnitIndex(input.semanticBundle);
  const targetUnits = input.semanticBundle.targetClaimIds.map((claimId) => {
    const unit = index.get(claimId);
    if (unit === undefined || unit.role !== 'primary') {
      throw new TypeError(
        `Canonical Reading target claim has no primary semantic unit: ${claimId}`,
      );
    }
    return unit;
  });
  const scopeGuardUnits = targetUnits.filter(isCanonicalReadingScopeGuardUnitV1);
  const primaryUnits = targetUnits.filter(
    (unit) => !isCanonicalReadingScopeGuardUnitV1(unit),
  );
  const readingScopeProhibitions = [
    ...new Set(scopeGuardUnits.flatMap((unit) => unit.prohibitedExtensions)),
  ].sort();

  const requiredDisclosureRefs = protectedProjection.disclosures.map(
    (disclosure) => disclosure.disclosureRef,
  );
  const units = primaryUnits.map((unit) =>
    makeUnit(
      input.semanticBundle.intent.domain,
      input.semanticBundle.semanticHash,
      unit,
      input.semanticBundle.units,
      index,
      requiredDisclosureRefs,
      readingScopeProhibitions,
    ),
  );

  if (units.length === 0) {
    throw new RangeError('CharacterGroundingBundleV2 requires at least one semantic unit.');
  }

  const withoutHash: Omit<CharacterGroundingBundleV2, 'groundingHash'> = {
    schemaVersion: CHARACTER_GROUNDING_SCHEMA_VERSION_V2,
    projectionVersion: CHARACTER_GROUNDING_PROJECTION_VERSION_V2,
    readingRef: protectedProjection.readingRef,
    productResponseVersion: protectedProjection.productResponseVersion,
    engineVersion: input.engineVersion,
    readingDomain: input.semanticBundle.intent.domain,
    sourceResponseHash: protectedProjection.sourceResponseHash,
    sourceSemanticHash: input.semanticBundle.semanticHash,
    units,
    disclosures: protectedProjection.disclosures,
    ambiguities: protectedProjection.ambiguities,
  };

  const bundle: CharacterGroundingBundleV2 = {
    ...withoutHash,
    groundingHash: deterministicContentHash(bundleHashMaterial(withoutHash)),
  };
  assertCharacterGroundingBundleV2(bundle);
  return bundle;
}

export function assertCharacterGroundingBundleV2(
  value: CharacterGroundingBundleV2,
): void {
  if (value.schemaVersion !== CHARACTER_GROUNDING_SCHEMA_VERSION_V2) {
    throw new TypeError('CharacterGroundingBundleV2.schemaVersion is invalid.');
  }
  if (value.projectionVersion !== CHARACTER_GROUNDING_PROJECTION_VERSION_V2) {
    throw new TypeError('CharacterGroundingBundleV2.projectionVersion is invalid.');
  }
  if (value.units.length === 0) {
    throw new RangeError('CharacterGroundingBundleV2.units must not be empty.');
  }

  const unitIds = new Set<string>();
  for (const unit of value.units) {
    if (!/^grounding_unit_v2_[0-9a-f]{24}$/.test(unit.unitId)) {
      throw new TypeError('CharacterGroundingBundleV2 unitId is invalid.');
    }
    if (unitIds.has(unit.unitId)) {
      throw new TypeError('CharacterGroundingBundleV2 unit IDs must be unique.');
    }
    if (unit.domain !== value.readingDomain) {
      throw new TypeError('CharacterGroundingBundleV2 unit domain is invalid.');
    }
    if (unit.canonicalMeaning.trim().length === 0) {
      throw new TypeError('CharacterGroundingBundleV2 canonicalMeaning must not be empty.');
    }
    if (unit.sourceCanonicalUnitRefs.length === 0) {
      throw new TypeError('CharacterGroundingBundleV2 sourceCanonicalUnitRefs must not be empty.');
    }
    unitIds.add(unit.unitId);
  }

  const { groundingHash, ...withoutHash } = value;
  const expectedHash = deterministicContentHash(bundleHashMaterial(withoutHash));
  if (groundingHash !== expectedHash) {
    throw new TypeError('CharacterGroundingBundleV2.groundingHash is invalid.');
  }
}
