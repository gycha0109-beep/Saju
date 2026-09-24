import type { ReadingDomain } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  isCanonicalReadingScopeGuardUnitV1,
  type CanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import {
  CHARACTER_GROUNDING_REALIZATION_POLICIES_V1,
  GROUNDING_AXIS_REGISTRY_V1,
  GROUNDING_AXIS_REGISTRY_VERSION,
  buildCharacterGroundingBundleV1,
  type CharacterGroundingAmbiguityV1,
  type CharacterGroundingDisclosureV1,
  type CharacterGroundingNarrativeRole,
  type CharacterGroundingRealizationPolicyRef,
  type GroundingAxisKey,
} from './character-grounding.js';
import { admitProductReadingResponse } from './product-reading-response-admission.js';

export const CHARACTER_GROUNDING_SCHEMA_VERSION_V2 =
  'myeonghwa-character-grounding-v2' as const;
export const CHARACTER_GROUNDING_PROJECTION_VERSION_V2 =
  'myeonghwa-character-grounding-projection-v3' as const;
export const CHARACTER_GROUNDING_SEMANTIC_KEY_REGISTRY_VERSION_V1 =
  'myeonghwa-character-grounding-semantic-key-v1' as const;
export const CHARACTER_GROUNDING_REALIZATION_POLICY_REGISTRY_VERSION_V1 =
  'myeonghwa-character-grounding-realization-policy-v1' as const;
export const CHARACTER_GROUNDING_BUNDLE_REF_SCHEMA_VERSION_V1 = 'v1' as const;

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
  axisRegistryVersion: typeof GROUNDING_AXIS_REGISTRY_VERSION;
  semanticKeyRegistryVersion: typeof CHARACTER_GROUNDING_SEMANTIC_KEY_REGISTRY_VERSION_V1;
  realizationPolicyRegistryVersion:
    typeof CHARACTER_GROUNDING_REALIZATION_POLICY_REGISTRY_VERSION_V1;
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

export interface CharacterGroundingBundleRefV1 {
  schemaVersion: typeof CHARACTER_GROUNDING_BUNDLE_REF_SCHEMA_VERSION_V1;
  readingRef: string;
  groundingHash: string;
  projectionVersion: typeof CHARACTER_GROUNDING_PROJECTION_VERSION_V2;
}

const READING_DOMAINS = [
  'general',
  'family',
  'relationship',
  'compatibility',
  'career',
  'business',
  'wealth',
  'life_stage',
  'question_specific',
] as const satisfies readonly ReadingDomain[];

const NARRATIVE_ROLES = [
  'primary',
  'supporting',
  'tension',
  'limitation',
] as const satisfies readonly CharacterGroundingNarrativeRole[];

const REALIZATION_POLICIES = Object.freeze(
  Object.keys(
    CHARACTER_GROUNDING_REALIZATION_POLICIES_V1,
  ) as readonly CharacterGroundingRealizationPolicyRef[],
);

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function assertRecord(
  value: unknown,
  field: string,
): asserts value is Readonly<Record<string, unknown>> {
  if (!isRecord(value)) throw new TypeError(`${field} must be an object.`);
}

function assertArray(value: unknown, field: string): asserts value is readonly unknown[] {
  if (!Array.isArray(value)) throw new TypeError(`${field} must be an array.`);
}

function assertNonEmptyString(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new TypeError(`${field} must be a non-empty string.`);
  }
}

function assertHash(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || !/^[0-9a-f]{64}$/u.test(value)) {
    throw new TypeError(`${field} must be a lowercase SHA-256 hex digest.`);
  }
}

function assertEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  field: string,
): asserts value is T {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    throw new TypeError(`${field} is invalid.`);
  }
}

function assertUniqueStrings(
  value: unknown,
  field: string,
): asserts value is readonly string[] {
  assertArray(value, field);
  const seen = new Set<string>();
  value.forEach((item, index) => {
    assertNonEmptyString(item, `${field}[${index}]`);
    if (seen.has(item)) throw new TypeError(`${field} must not contain duplicates.`);
    seen.add(item);
  });
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

function stableSourceResponseHash(response: unknown): string {
  const admitted = admitProductReadingResponse(response);
  if (
    (admitted.state !== 'delivered' && admitted.state !== 'delivered_with_fallback') ||
    admitted.reading === undefined
  ) {
    throw new TypeError(
      'CharacterGroundingBundleV2 requires a delivered ProductReadingResponse.',
    );
  }
  const { generatedAt, ...stableReading } = admitted.reading;
  void generatedAt;
  return deterministicContentHash({
    responseVersion: admitted.responseVersion,
    state: admitted.state,
    messageCode: admitted.messageCode,
    requiredAction: admitted.requiredAction,
    reading: stableReading,
  });
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
  const sourceResponseHash = stableSourceResponseHash(input.response);

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
    axisRegistryVersion: GROUNDING_AXIS_REGISTRY_VERSION,
    semanticKeyRegistryVersion: CHARACTER_GROUNDING_SEMANTIC_KEY_REGISTRY_VERSION_V1,
    realizationPolicyRegistryVersion:
      CHARACTER_GROUNDING_REALIZATION_POLICY_REGISTRY_VERSION_V1,
    readingRef: protectedProjection.readingRef,
    productResponseVersion: protectedProjection.productResponseVersion,
    engineVersion: input.engineVersion,
    readingDomain: input.semanticBundle.intent.domain,
    sourceResponseHash,
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

function assertCompanionGraph(units: readonly CharacterGroundingUnitV2[]): void {
  const byId = new Map(units.map((unit) => [unit.unitId, unit]));
  const visiting = new Set<string>();
  const visited = new Set<string>();

  const visit = (unitId: string): void => {
    if (visited.has(unitId)) return;
    if (visiting.has(unitId)) {
      throw new TypeError('CharacterGroundingBundleV2 companion graph must be acyclic.');
    }
    const unit = byId.get(unitId);
    if (unit === undefined) {
      throw new TypeError('CharacterGroundingBundleV2 contains a dangling companion reference.');
    }
    visiting.add(unitId);
    for (const companionRef of unit.requiredCompanionUnitRefs) visit(companionRef);
    visiting.delete(unitId);
    visited.add(unitId);
  };

  units.forEach((unit) => visit(unit.unitId));
}

export function assertCharacterGroundingBundleV2(
  value: unknown,
): asserts value is CharacterGroundingBundleV2 {
  assertRecord(value, 'CharacterGroundingBundleV2');
  if (value.schemaVersion !== CHARACTER_GROUNDING_SCHEMA_VERSION_V2) {
    throw new TypeError('CharacterGroundingBundleV2.schemaVersion is invalid.');
  }
  if (value.projectionVersion !== CHARACTER_GROUNDING_PROJECTION_VERSION_V2) {
    throw new TypeError('CharacterGroundingBundleV2.projectionVersion is invalid.');
  }
  if (value.axisRegistryVersion !== GROUNDING_AXIS_REGISTRY_VERSION) {
    throw new TypeError('CharacterGroundingBundleV2.axisRegistryVersion is invalid.');
  }
  if (
    value.semanticKeyRegistryVersion !==
    CHARACTER_GROUNDING_SEMANTIC_KEY_REGISTRY_VERSION_V1
  ) {
    throw new TypeError('CharacterGroundingBundleV2.semanticKeyRegistryVersion is invalid.');
  }
  if (
    value.realizationPolicyRegistryVersion !==
    CHARACTER_GROUNDING_REALIZATION_POLICY_REGISTRY_VERSION_V1
  ) {
    throw new TypeError(
      'CharacterGroundingBundleV2.realizationPolicyRegistryVersion is invalid.',
    );
  }
  assertNonEmptyString(value.readingRef, 'CharacterGroundingBundleV2.readingRef');
  assertNonEmptyString(
    value.productResponseVersion,
    'CharacterGroundingBundleV2.productResponseVersion',
  );
  assertNonEmptyString(value.engineVersion, 'CharacterGroundingBundleV2.engineVersion');
  assertEnum(value.readingDomain, READING_DOMAINS, 'CharacterGroundingBundleV2.readingDomain');
  assertHash(value.sourceResponseHash, 'CharacterGroundingBundleV2.sourceResponseHash');
  assertHash(value.sourceSemanticHash, 'CharacterGroundingBundleV2.sourceSemanticHash');
  assertHash(value.groundingHash, 'CharacterGroundingBundleV2.groundingHash');

  assertArray(value.disclosures, 'CharacterGroundingBundleV2.disclosures');
  const disclosureRefs = new Set<string>();
  value.disclosures.forEach((disclosure, index) => {
    const field = `CharacterGroundingBundleV2.disclosures[${index}]`;
    assertRecord(disclosure, field);
    assertNonEmptyString(disclosure.disclosureRef, `${field}.disclosureRef`);
    assertNonEmptyString(disclosure.type, `${field}.type`);
    assertNonEmptyString(disclosure.text, `${field}.text`);
    if (
      !Number.isInteger(disclosure.sourceDisclosureIndex) ||
      (disclosure.sourceDisclosureIndex as number) < 0
    ) {
      throw new RangeError(`${field}.sourceDisclosureIndex must be a non-negative integer.`);
    }
    if (disclosureRefs.has(disclosure.disclosureRef)) {
      throw new TypeError('CharacterGroundingBundleV2 disclosure refs must be unique.');
    }
    disclosureRefs.add(disclosure.disclosureRef);
  });

  assertArray(value.ambiguities, 'CharacterGroundingBundleV2.ambiguities');
  const ambiguityRefs = new Set<string>();
  value.ambiguities.forEach((ambiguity, index) => {
    const field = `CharacterGroundingBundleV2.ambiguities[${index}]`;
    assertRecord(ambiguity, field);
    assertNonEmptyString(ambiguity.ambiguityRef, `${field}.ambiguityRef`);
    assertEnum(ambiguity.kind, ['calculation', 'reading_block'] as const, `${field}.kind`);
    assertNonEmptyString(ambiguity.sourceRef, `${field}.sourceRef`);
    assertNonEmptyString(ambiguity.summary, `${field}.summary`);
    if (ambiguityRefs.has(ambiguity.ambiguityRef)) {
      throw new TypeError('CharacterGroundingBundleV2 ambiguity refs must be unique.');
    }
    ambiguityRefs.add(ambiguity.ambiguityRef);
  });

  assertArray(value.units, 'CharacterGroundingBundleV2.units');
  if (value.units.length === 0) {
    throw new RangeError('CharacterGroundingBundleV2.units must not be empty.');
  }

  const units: CharacterGroundingUnitV2[] = [];
  const unitIds = new Set<string>();
  value.units.forEach((unit, index) => {
    const field = `CharacterGroundingBundleV2.units[${index}]`;
    assertRecord(unit, field);
    if (
      typeof unit.unitId !== 'string' ||
      !/^grounding_unit_v2_[0-9a-f]{24}$/u.test(unit.unitId)
    ) {
      throw new TypeError(`${field}.unitId is invalid.`);
    }
    if (unitIds.has(unit.unitId)) {
      throw new TypeError('CharacterGroundingBundleV2 unit IDs must be unique.');
    }
    assertEnum(unit.domain, READING_DOMAINS, `${field}.domain`);
    if (unit.domain !== value.readingDomain) {
      throw new TypeError(`${field}.domain must match bundle readingDomain.`);
    }
    assertEnum(unit.axis, GROUNDING_AXIS_REGISTRY_V1, `${field}.axis`);
    assertEnum(unit.narrativeRole, NARRATIVE_ROLES, `${field}.narrativeRole`);
    assertNonEmptyString(unit.semanticKey, `${field}.semanticKey`);
    if (!unit.semanticKey.startsWith(`${value.readingDomain}:`)) {
      throw new TypeError(`${field}.semanticKey is outside the bundle domain.`);
    }
    assertNonEmptyString(unit.canonicalMeaning, `${field}.canonicalMeaning`);
    assertUniqueStrings(unit.sourceCanonicalUnitRefs, `${field}.sourceCanonicalUnitRefs`);
    if (unit.sourceCanonicalUnitRefs.length === 0) {
      throw new RangeError(`${field}.sourceCanonicalUnitRefs must not be empty.`);
    }
    for (const ref of unit.sourceCanonicalUnitRefs) {
      if (!/^canonical_reading_unit_[0-9a-f]{24}$/u.test(ref)) {
        throw new TypeError(`${field}.sourceCanonicalUnitRefs contains an invalid ref.`);
      }
    }
    assertUniqueStrings(unit.qualifiers, `${field}.qualifiers`);
    assertUniqueStrings(unit.prohibitedExtensions, `${field}.prohibitedExtensions`);
    assertUniqueStrings(
      unit.requiredCompanionUnitRefs,
      `${field}.requiredCompanionUnitRefs`,
    );
    assertUniqueStrings(unit.requiredDisclosureRefs, `${field}.requiredDisclosureRefs`);
    assertEnum(
      unit.realizationPolicyRef,
      REALIZATION_POLICIES,
      `${field}.realizationPolicyRef`,
    );
    for (const disclosureRef of unit.requiredDisclosureRefs) {
      if (!disclosureRefs.has(disclosureRef)) {
        throw new TypeError(`${field} contains a dangling required disclosure reference.`);
      }
    }
    unitIds.add(unit.unitId);
    units.push(unit as unknown as CharacterGroundingUnitV2);
  });

  for (const unit of units) {
    for (const companionRef of unit.requiredCompanionUnitRefs) {
      if (!unitIds.has(companionRef)) {
        throw new TypeError(
          'CharacterGroundingBundleV2 contains a dangling companion reference.',
        );
      }
    }
  }
  assertCompanionGraph(units);

  const typed = value as unknown as CharacterGroundingBundleV2;
  const { groundingHash, ...withoutHash } = typed;
  const expectedHash = deterministicContentHash(bundleHashMaterial(withoutHash));
  if (groundingHash !== expectedHash) {
    throw new TypeError('CharacterGroundingBundleV2.groundingHash is invalid.');
  }
}

export function admitCharacterGroundingBundleV2(
  input: unknown,
  source: CharacterGroundingProjectionInputV2,
): CharacterGroundingBundleV2 {
  assertCharacterGroundingBundleV2(input);
  const expected = buildCharacterGroundingBundleV2(source);
  if (deterministicContentHash(input) !== deterministicContentHash(expected)) {
    throw new TypeError(
      'CharacterGroundingBundleV2 does not match the admitted Saju source projection.',
    );
  }
  return input;
}

export function buildCharacterGroundingBundleRefV1(
  bundle: CharacterGroundingBundleV2,
): CharacterGroundingBundleRefV1 {
  assertCharacterGroundingBundleV2(bundle);
  return {
    schemaVersion: CHARACTER_GROUNDING_BUNDLE_REF_SCHEMA_VERSION_V1,
    readingRef: bundle.readingRef,
    groundingHash: bundle.groundingHash,
    projectionVersion: bundle.projectionVersion,
  };
}

export function assertCharacterGroundingBundleRefV1(
  value: unknown,
  bundle?: CharacterGroundingBundleV2,
): asserts value is CharacterGroundingBundleRefV1 {
  assertRecord(value, 'CharacterGroundingBundleRefV1');
  if (value.schemaVersion !== CHARACTER_GROUNDING_BUNDLE_REF_SCHEMA_VERSION_V1) {
    throw new TypeError('CharacterGroundingBundleRefV1.schemaVersion is invalid.');
  }
  assertNonEmptyString(value.readingRef, 'CharacterGroundingBundleRefV1.readingRef');
  assertHash(value.groundingHash, 'CharacterGroundingBundleRefV1.groundingHash');
  if (value.projectionVersion !== CHARACTER_GROUNDING_PROJECTION_VERSION_V2) {
    throw new TypeError('CharacterGroundingBundleRefV1.projectionVersion is invalid.');
  }
  if (
    bundle !== undefined &&
    (value.readingRef !== bundle.readingRef ||
      value.groundingHash !== bundle.groundingHash ||
      value.projectionVersion !== bundle.projectionVersion)
  ) {
    throw new TypeError('CharacterGroundingBundleRefV1 does not match grounding bundle.');
  }
}
