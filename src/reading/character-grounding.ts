import type { ReadingDomain } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { admitProductReadingResponse } from './product-reading-response-admission.js';
import type {
  ProductReadingResponse,
  ProductReadingResponseBlock,
  ProductReadingResponseDisclosure,
  ProductReadingResponseReading,
  ProductReadingResponseSection,
} from './product-reading-response.js';

export const CHARACTER_GROUNDING_SCHEMA_VERSION = 'myeonghwa-character-grounding-v1';
export const CHARACTER_GROUNDING_PROJECTION_VERSION =
  'myeonghwa-character-grounding-projection-v1';
export const GROUNDING_AXIS_REGISTRY_VERSION = 'myeonghwa-grounding-axis-v1';

export const GROUNDING_AXIS_REGISTRY_V1 = Object.freeze([
  'core_identity',
  'structure',
  'action_style',
  'decision_style',
  'strength',
  'tension',
  'work',
  'wealth',
  'relationship',
  'health_tendency',
  'timing',
  'compatibility',
  'responsibility',
  'learning',
  'expression',
  'boundary',
  'custom',
] as const);

export type GroundingAxisKey = (typeof GROUNDING_AXIS_REGISTRY_V1)[number];

export const CHARACTER_GROUNDING_REALIZATION_POLICIES_V1 = Object.freeze({
  bounded_semantic_paraphrase_v1: {
    allowCharacterParaphrase: true,
    constraints: [
      'no_added_claim',
      'no_certainty_strengthening',
      'no_temporal_invention',
      'no_outcome_escalation',
      'preserve_disclosures',
    ],
  },
  bounded_factual_render_v1: {
    allowCharacterParaphrase: false,
    constraints: ['preserve_exact_fact', 'preserve_disclosures'],
  },
  protected_only_v1: {
    allowCharacterParaphrase: false,
    constraints: ['preserve_exact_text', 'preserve_ambiguity', 'preserve_disclosures'],
  },
} as const);

export type CharacterGroundingRealizationPolicyRef =
  keyof typeof CHARACTER_GROUNDING_REALIZATION_POLICIES_V1;

export type CharacterGroundingNarrativeRole =
  | 'primary'
  | 'supporting'
  | 'tension'
  | 'limitation';

export interface CharacterGroundingDisclosureV1 {
  disclosureRef: string;
  type: ProductReadingResponseDisclosure['type'];
  text: string;
  sourceDisclosureIndex: number;
}

export interface CharacterGroundingAmbiguityV1 {
  ambiguityRef: string;
  kind: 'calculation' | 'reading_block';
  sourceRef: string;
  title?: string;
  summary: string;
  scenarios?: readonly { label: string; text: string }[];
}

export interface CharacterGroundingUnitV1 {
  unitId: string;
  domain: ReadingDomain;
  axis: GroundingAxisKey;
  narrativeRole: CharacterGroundingNarrativeRole;
  semanticKey: string;
  canonicalMeaning: string;
  sourceBlockRefs: readonly string[];
  qualifiers?: readonly string[];
  prohibitedExtensions?: readonly string[];
  ambiguityRef?: string;
  requiredCompanionUnitRefs: readonly string[];
  requiredDisclosureRefs: readonly string[];
  realizationPolicyRef: CharacterGroundingRealizationPolicyRef;
}

export interface CharacterGroundingBundleV1 {
  schemaVersion: typeof CHARACTER_GROUNDING_SCHEMA_VERSION;
  groundingProjectionVersion: typeof CHARACTER_GROUNDING_PROJECTION_VERSION;
  axisRegistryVersion: typeof GROUNDING_AXIS_REGISTRY_VERSION;
  readingRef: string;
  productResponseVersion: string;
  engineVersion: string;
  readingDomain: ReadingDomain;
  sourceResponseHash: string;
  groundingHash: string;
  units: readonly CharacterGroundingUnitV1[];
  disclosures: readonly CharacterGroundingDisclosureV1[];
  ambiguities: readonly CharacterGroundingAmbiguityV1[];
}

export interface CharacterGroundingProjectionInputV1 {
  response: unknown;
  engineVersion: string;
  readingDomain: ReadingDomain;
}

type UnitCandidate = Omit<
  CharacterGroundingUnitV1,
  'unitId' | 'domain' | 'requiredDisclosureRefs' | 'requiredCompanionUnitRefs'
> & {
  requiredCompanionUnitRefs?: readonly string[];
};

type SourceChildCollection = 'items' | 'perspectives' | 'entries' | 'rows';

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

const DISCLOSURE_TYPES = [
  'calculation_ambiguity',
  'methodology_difference',
  'insufficient_evidence',
  'scope_limitation',
] as const;

const SECTION_AXIS: Record<ProductReadingResponseSection['sectionType'], GroundingAxisKey> = {
  overview: 'core_identity',
  structure: 'structure',
  personality: 'core_identity',
  career: 'work',
  wealth: 'wealth',
  relationship: 'relationship',
  health_tendency: 'health_tendency',
  timing: 'timing',
  compatibility: 'compatibility',
  custom: 'custom',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function assertRecord(value: unknown, field: string): asserts value is Record<string, unknown> {
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

function assertEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  field: string,
): asserts value is T {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    throw new TypeError(`${field} is invalid.`);
  }
}

function assertHash(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || !/^[0-9a-f]{64}$/.test(value)) {
    throw new TypeError(`${field} must be a lowercase SHA-256 hex digest.`);
  }
}

function assertUniqueStrings(value: unknown, field: string): asserts value is readonly string[] {
  assertArray(value, field);
  const seen = new Set<string>();
  value.forEach((item, index) => {
    assertNonEmptyString(item, `${field}[${index}]`);
    if (seen.has(item)) throw new TypeError(`${field} must not contain duplicates.`);
    seen.add(item);
  });
}

function sourceBlockRef(
  sectionIndex: number,
  blockIndex: number,
  child?: { collection: SourceChildCollection; index: number },
): string {
  const base = `sections.${sectionIndex}.blocks.${blockIndex}`;
  return child === undefined ? base : `${base}.${child.collection}.${child.index}`;
}

function sourceDisclosureRef(index: number): string {
  return `disclosures.${index}`;
}

function calculationAmbiguitySourceRef(index: number): string {
  return `calculationSummary.ambiguity.${index}`;
}

function axisForSection(section: ProductReadingResponseSection): GroundingAxisKey {
  return SECTION_AXIS[section.sectionType];
}

function roleForSection(
  section: ProductReadingResponseSection,
  block: ProductReadingResponseBlock,
): CharacterGroundingNarrativeRole {
  if (section.state !== 'complete' || block.type === 'ambiguity') return 'limitation';
  if (
    section.sectionType === 'overview' ||
    section.sectionType === 'structure' ||
    section.sectionType === 'personality'
  ) {
    return 'primary';
  }
  return 'supporting';
}

function semanticKeyFor(
  section: ProductReadingResponseSection,
  block: ProductReadingResponseBlock,
): string {
  return `${section.sectionType}:${block.type}`;
}

function realizationPolicyFor(
  block: ProductReadingResponseBlock,
): CharacterGroundingRealizationPolicyRef {
  switch (block.type) {
    case 'paragraph':
    case 'key_points':
    case 'comparison':
      return 'bounded_semantic_paraphrase_v1';
    case 'fact_table':
      return 'bounded_factual_render_v1';
    case 'ambiguity':
    case 'timeline':
    case 'source_hint':
      return 'protected_only_v1';
  }
}

function makeDisclosureRef(disclosure: ProductReadingResponseDisclosure, index: number): string {
  return `grounding_disclosure_${deterministicContentHash({
    projectionVersion: CHARACTER_GROUNDING_PROJECTION_VERSION,
    sourceRef: sourceDisclosureRef(index),
    type: disclosure.type,
    text: disclosure.text,
  }).slice(0, 24)}`;
}

function projectDisclosures(
  reading: ProductReadingResponseReading,
): readonly CharacterGroundingDisclosureV1[] {
  return reading.disclosures.map((disclosure, index) => ({
    disclosureRef: makeDisclosureRef(disclosure, index),
    type: disclosure.type,
    text: disclosure.text,
    sourceDisclosureIndex: index,
  }));
}

function makeAmbiguityRef(material: unknown): string {
  return `grounding_ambiguity_${deterministicContentHash({
    projectionVersion: CHARACTER_GROUNDING_PROJECTION_VERSION,
    material,
  }).slice(0, 24)}`;
}

function projectAmbiguities(
  reading: ProductReadingResponseReading,
): readonly CharacterGroundingAmbiguityV1[] {
  const ambiguities: CharacterGroundingAmbiguityV1[] = [];
  for (const [index, ambiguity] of (reading.calculationSummary.ambiguity ?? []).entries()) {
    const sourceRef = calculationAmbiguitySourceRef(index);
    ambiguities.push({
      ambiguityRef: makeAmbiguityRef({ sourceRef, ambiguity }),
      kind: 'calculation',
      sourceRef,
      title: ambiguity.title,
      summary: ambiguity.summary,
    });
  }

  reading.sections.forEach((section, sectionIndex) => {
    section.blocks.forEach((block, blockIndex) => {
      if (block.type !== 'ambiguity') return;
      const sourceRef = sourceBlockRef(sectionIndex, blockIndex);
      ambiguities.push({
        ambiguityRef: makeAmbiguityRef({ sourceRef, block }),
        kind: 'reading_block',
        sourceRef,
        summary: block.summary,
        scenarios: block.scenarios.map((scenario) => ({ ...scenario })),
      });
    });
  });

  return ambiguities;
}

function ambiguityRefForBlock(
  ambiguities: readonly CharacterGroundingAmbiguityV1[],
  sectionIndex: number,
  blockIndex: number,
): string | undefined {
  const sourceRef = sourceBlockRef(sectionIndex, blockIndex);
  return ambiguities.find((item) => item.sourceRef === sourceRef)?.ambiguityRef;
}

function candidateForText(
  section: ProductReadingResponseSection,
  block: ProductReadingResponseBlock,
  sourceRefs: readonly string[],
  canonicalMeaning: string,
  ambiguityRef?: string,
): UnitCandidate {
  return {
    axis: axisForSection(section),
    narrativeRole: roleForSection(section, block),
    semanticKey: semanticKeyFor(section, block),
    canonicalMeaning,
    sourceBlockRefs: sourceRefs,
    realizationPolicyRef: realizationPolicyFor(block),
    ...(ambiguityRef === undefined ? {} : { ambiguityRef }),
  };
}

function candidatesForBlock(
  section: ProductReadingResponseSection,
  sectionIndex: number,
  block: ProductReadingResponseBlock,
  blockIndex: number,
  ambiguities: readonly CharacterGroundingAmbiguityV1[],
): readonly UnitCandidate[] {
  const baseRef = sourceBlockRef(sectionIndex, blockIndex);
  switch (block.type) {
    case 'paragraph':
      return [candidateForText(section, block, [baseRef], block.text)];
    case 'key_points':
      return block.items.map((item, itemIndex) =>
        candidateForText(
          section,
          block,
          [sourceBlockRef(sectionIndex, blockIndex, { collection: 'items', index: itemIndex })],
          item,
        ),
      );
    case 'comparison':
      return block.perspectives.map((perspective, itemIndex) =>
        candidateForText(
          section,
          block,
          [
            sourceBlockRef(sectionIndex, blockIndex, {
              collection: 'perspectives',
              index: itemIndex,
            }),
          ],
          `${block.title}\n${perspective.label}: ${perspective.text}`,
        ),
      );
    case 'ambiguity': {
      const ambiguityRef = ambiguityRefForBlock(ambiguities, sectionIndex, blockIndex);
      return [
        candidateForText(
          section,
          block,
          [baseRef],
          [
            block.summary,
            ...block.scenarios.map((scenario) => `${scenario.label}: ${scenario.text}`),
          ].join('\n'),
          ambiguityRef,
        ),
      ];
    }
    case 'timeline':
      return block.entries.map((entry, itemIndex) =>
        candidateForText(
          section,
          block,
          [
            sourceBlockRef(sectionIndex, blockIndex, {
              collection: 'entries',
              index: itemIndex,
            }),
          ],
          `${entry.label}: ${entry.text}`,
        ),
      );
    case 'fact_table':
      return block.rows.map((row, itemIndex) =>
        candidateForText(
          section,
          block,
          [sourceBlockRef(sectionIndex, blockIndex, { collection: 'rows', index: itemIndex })],
          `${row.label}: ${row.value}`,
        ),
      );
    case 'source_hint':
      return [];
  }
}

function makeUnitId(
  sourceResponseHash: string,
  candidate: UnitCandidate,
  domain: ReadingDomain,
): string {
  return `grounding_unit_${deterministicContentHash({
    projectionVersion: CHARACTER_GROUNDING_PROJECTION_VERSION,
    sourceResponseHash,
    domain,
    semanticKey: candidate.semanticKey,
    canonicalMeaning: candidate.canonicalMeaning,
    sourceBlockRefs: candidate.sourceBlockRefs,
    realizationPolicyRef: candidate.realizationPolicyRef,
    ambiguityRef: candidate.ambiguityRef,
  }).slice(0, 24)}`;
}

function projectUnits(
  reading: ProductReadingResponseReading,
  domain: ReadingDomain,
  sourceResponseHash: string,
  disclosures: readonly CharacterGroundingDisclosureV1[],
  ambiguities: readonly CharacterGroundingAmbiguityV1[],
): readonly CharacterGroundingUnitV1[] {
  const requiredDisclosureRefs = disclosures.map((item) => item.disclosureRef);
  const units: CharacterGroundingUnitV1[] = [];

  reading.sections.forEach((section, sectionIndex) => {
    section.blocks.forEach((block, blockIndex) => {
      for (const candidate of candidatesForBlock(
        section,
        sectionIndex,
        block,
        blockIndex,
        ambiguities,
      )) {
        units.push({
          ...candidate,
          unitId: makeUnitId(sourceResponseHash, candidate, domain),
          domain,
          requiredCompanionUnitRefs: [...(candidate.requiredCompanionUnitRefs ?? [])],
          requiredDisclosureRefs: [...requiredDisclosureRefs],
        });
      }
    });
  });

  return units;
}

function bundleHashMaterial(
  bundle: Omit<CharacterGroundingBundleV1, 'groundingHash'>,
): Omit<CharacterGroundingBundleV1, 'groundingHash'> {
  return bundle;
}

export function buildCharacterGroundingBundleV1(
  input: CharacterGroundingProjectionInputV1,
): CharacterGroundingBundleV1 {
  assertNonEmptyString(input.engineVersion, 'CharacterGroundingProjectionInputV1.engineVersion');
  assertEnum(
    input.readingDomain,
    READING_DOMAINS,
    'CharacterGroundingProjectionInputV1.readingDomain',
  );

  const response = admitProductReadingResponse(input.response);
  if (response.state !== 'delivered' && response.state !== 'delivered_with_fallback') {
    throw new TypeError('Character grounding requires a delivered ProductReadingResponse.');
  }
  if (response.reading === undefined) {
    throw new TypeError('Delivered ProductReadingResponse must contain reading payload.');
  }

  const sourceResponseHash = deterministicContentHash(response);
  const disclosures = projectDisclosures(response.reading);
  const ambiguities = projectAmbiguities(response.reading);
  const units = projectUnits(
    response.reading,
    input.readingDomain,
    sourceResponseHash,
    disclosures,
    ambiguities,
  );
  if (units.length === 0) {
    throw new RangeError('Character grounding requires at least one semantic unit.');
  }

  const withoutHash: Omit<CharacterGroundingBundleV1, 'groundingHash'> = {
    schemaVersion: CHARACTER_GROUNDING_SCHEMA_VERSION,
    groundingProjectionVersion: CHARACTER_GROUNDING_PROJECTION_VERSION,
    axisRegistryVersion: GROUNDING_AXIS_REGISTRY_VERSION,
    readingRef: response.reading.readingId,
    productResponseVersion: response.responseVersion,
    engineVersion: input.engineVersion,
    readingDomain: input.readingDomain,
    sourceResponseHash,
    units,
    disclosures,
    ambiguities,
  };

  const result: CharacterGroundingBundleV1 = {
    ...withoutHash,
    groundingHash: deterministicContentHash(bundleHashMaterial(withoutHash)),
  };
  assertCharacterGroundingBundleV1(result);
  return result;
}

function assertDisclosure(
  value: unknown,
  field: string,
): asserts value is CharacterGroundingDisclosureV1 {
  assertRecord(value, field);
  if (
    typeof value.disclosureRef !== 'string' ||
    !/^grounding_disclosure_[0-9a-f]{24}$/.test(value.disclosureRef)
  ) {
    throw new TypeError(`${field}.disclosureRef is invalid.`);
  }
  assertEnum(value.type, DISCLOSURE_TYPES, `${field}.type`);
  assertNonEmptyString(value.text, `${field}.text`);
  if (!Number.isInteger(value.sourceDisclosureIndex) || (value.sourceDisclosureIndex as number) < 0) {
    throw new RangeError(`${field}.sourceDisclosureIndex must be a non-negative integer.`);
  }
  const expected = makeDisclosureRef(
    { type: value.type, text: value.text },
    value.sourceDisclosureIndex as number,
  );
  if (value.disclosureRef !== expected) {
    throw new TypeError(`${field}.disclosureRef does not match disclosure content.`);
  }
}

function assertAmbiguity(
  value: unknown,
  field: string,
): asserts value is CharacterGroundingAmbiguityV1 {
  assertRecord(value, field);
  if (
    typeof value.ambiguityRef !== 'string' ||
    !/^grounding_ambiguity_[0-9a-f]{24}$/.test(value.ambiguityRef)
  ) {
    throw new TypeError(`${field}.ambiguityRef is invalid.`);
  }
  assertEnum(value.kind, ['calculation', 'reading_block'] as const, `${field}.kind`);
  assertNonEmptyString(value.sourceRef, `${field}.sourceRef`);
  if (value.title !== undefined) assertNonEmptyString(value.title, `${field}.title`);
  assertNonEmptyString(value.summary, `${field}.summary`);
  if (value.scenarios !== undefined) {
    assertArray(value.scenarios, `${field}.scenarios`);
    value.scenarios.forEach((scenario, index) => {
      const scenarioField = `${field}.scenarios[${index}]`;
      assertRecord(scenario, scenarioField);
      assertNonEmptyString(scenario.label, `${scenarioField}.label`);
      assertNonEmptyString(scenario.text, `${scenarioField}.text`);
    });
  }
  const expected = makeAmbiguityRef({
    sourceRef: value.sourceRef,
    ...(value.kind === 'calculation'
      ? { ambiguity: { title: value.title, summary: value.summary } }
      : {
          block: {
            type: 'ambiguity',
            summary: value.summary,
            scenarios: value.scenarios ?? [],
          },
        }),
  });
  if (value.ambiguityRef !== expected) {
    throw new TypeError(`${field}.ambiguityRef does not match ambiguity content.`);
  }
}

function assertUnitShape(value: unknown, field: string): asserts value is CharacterGroundingUnitV1 {
  assertRecord(value, field);
  if (typeof value.unitId !== 'string' || !/^grounding_unit_[0-9a-f]{24}$/.test(value.unitId)) {
    throw new TypeError(`${field}.unitId is invalid.`);
  }
  assertEnum(value.domain, READING_DOMAINS, `${field}.domain`);
  assertEnum(value.axis, GROUNDING_AXIS_REGISTRY_V1, `${field}.axis`);
  assertEnum(value.narrativeRole, NARRATIVE_ROLES, `${field}.narrativeRole`);
  assertNonEmptyString(value.semanticKey, `${field}.semanticKey`);
  assertNonEmptyString(value.canonicalMeaning, `${field}.canonicalMeaning`);
  assertUniqueStrings(value.sourceBlockRefs, `${field}.sourceBlockRefs`);
  if (value.sourceBlockRefs.length === 0) {
    throw new RangeError(`${field}.sourceBlockRefs must not be empty.`);
  }
  if (value.qualifiers !== undefined) assertUniqueStrings(value.qualifiers, `${field}.qualifiers`);
  if (value.prohibitedExtensions !== undefined) {
    assertUniqueStrings(value.prohibitedExtensions, `${field}.prohibitedExtensions`);
  }
  if (value.ambiguityRef !== undefined) {
    assertNonEmptyString(value.ambiguityRef, `${field}.ambiguityRef`);
  }
  assertUniqueStrings(value.requiredCompanionUnitRefs, `${field}.requiredCompanionUnitRefs`);
  assertUniqueStrings(value.requiredDisclosureRefs, `${field}.requiredDisclosureRefs`);
  assertEnum(value.realizationPolicyRef, REALIZATION_POLICIES, `${field}.realizationPolicyRef`);
}

function assertCompanionGraph(units: readonly CharacterGroundingUnitV1[]): void {
  const byId = new Map(units.map((unit) => [unit.unitId, unit]));
  const visiting = new Set<string>();
  const visited = new Set<string>();

  const visit = (unitId: string): void => {
    if (visited.has(unitId)) return;
    if (visiting.has(unitId)) {
      throw new TypeError('CharacterGroundingBundleV1 companion graph must be acyclic.');
    }
    const unit = byId.get(unitId);
    if (unit === undefined) {
      throw new TypeError('CharacterGroundingBundleV1 contains a dangling companion reference.');
    }
    visiting.add(unitId);
    for (const companionRef of unit.requiredCompanionUnitRefs) visit(companionRef);
    visiting.delete(unitId);
    visited.add(unitId);
  };

  units.forEach((unit) => visit(unit.unitId));
}

export function assertCharacterGroundingBundleV1(
  value: unknown,
): asserts value is CharacterGroundingBundleV1 {
  assertRecord(value, 'CharacterGroundingBundleV1');
  if (value.schemaVersion !== CHARACTER_GROUNDING_SCHEMA_VERSION) {
    throw new TypeError('CharacterGroundingBundleV1.schemaVersion is invalid.');
  }
  if (value.groundingProjectionVersion !== CHARACTER_GROUNDING_PROJECTION_VERSION) {
    throw new TypeError('CharacterGroundingBundleV1.groundingProjectionVersion is invalid.');
  }
  if (value.axisRegistryVersion !== GROUNDING_AXIS_REGISTRY_VERSION) {
    throw new TypeError('CharacterGroundingBundleV1.axisRegistryVersion is invalid.');
  }
  assertNonEmptyString(value.readingRef, 'CharacterGroundingBundleV1.readingRef');
  assertNonEmptyString(
    value.productResponseVersion,
    'CharacterGroundingBundleV1.productResponseVersion',
  );
  assertNonEmptyString(value.engineVersion, 'CharacterGroundingBundleV1.engineVersion');
  assertEnum(value.readingDomain, READING_DOMAINS, 'CharacterGroundingBundleV1.readingDomain');
  assertHash(value.sourceResponseHash, 'CharacterGroundingBundleV1.sourceResponseHash');
  assertHash(value.groundingHash, 'CharacterGroundingBundleV1.groundingHash');

  assertArray(value.disclosures, 'CharacterGroundingBundleV1.disclosures');
  const disclosures: CharacterGroundingDisclosureV1[] = [];
  const disclosureRefs = new Set<string>();
  value.disclosures.forEach((disclosure, index) => {
    assertDisclosure(disclosure, `CharacterGroundingBundleV1.disclosures[${index}]`);
    if (disclosureRefs.has(disclosure.disclosureRef)) {
      throw new TypeError('CharacterGroundingBundleV1 disclosure refs must be unique.');
    }
    disclosureRefs.add(disclosure.disclosureRef);
    disclosures.push(disclosure);
  });

  assertArray(value.ambiguities, 'CharacterGroundingBundleV1.ambiguities');
  const ambiguities: CharacterGroundingAmbiguityV1[] = [];
  const ambiguityRefs = new Set<string>();
  value.ambiguities.forEach((ambiguity, index) => {
    assertAmbiguity(ambiguity, `CharacterGroundingBundleV1.ambiguities[${index}]`);
    if (ambiguityRefs.has(ambiguity.ambiguityRef)) {
      throw new TypeError('CharacterGroundingBundleV1 ambiguity refs must be unique.');
    }
    ambiguityRefs.add(ambiguity.ambiguityRef);
    ambiguities.push(ambiguity);
  });

  assertArray(value.units, 'CharacterGroundingBundleV1.units');
  if (value.units.length === 0) {
    throw new RangeError('CharacterGroundingBundleV1.units must not be empty.');
  }
  const units: CharacterGroundingUnitV1[] = [];
  const unitIds = new Set<string>();
  value.units.forEach((unit, index) => {
    const field = `CharacterGroundingBundleV1.units[${index}]`;
    assertUnitShape(unit, field);
    if (unit.domain !== value.readingDomain) {
      throw new TypeError(`${field}.domain must match bundle readingDomain.`);
    }
    if (unitIds.has(unit.unitId)) {
      throw new TypeError('CharacterGroundingBundleV1 unit ids must be unique.');
    }
    for (const disclosureRef of unit.requiredDisclosureRefs) {
      if (!disclosureRefs.has(disclosureRef)) {
        throw new TypeError(`${field} contains a dangling required disclosure reference.`);
      }
    }
    if (unit.ambiguityRef !== undefined && !ambiguityRefs.has(unit.ambiguityRef)) {
      throw new TypeError(`${field}.ambiguityRef is dangling.`);
    }

    const candidate: UnitCandidate = {
      axis: unit.axis,
      narrativeRole: unit.narrativeRole,
      semanticKey: unit.semanticKey,
      canonicalMeaning: unit.canonicalMeaning,
      sourceBlockRefs: unit.sourceBlockRefs,
      ...(unit.qualifiers === undefined ? {} : { qualifiers: unit.qualifiers }),
      ...(unit.prohibitedExtensions === undefined
        ? {}
        : { prohibitedExtensions: unit.prohibitedExtensions }),
      ...(unit.ambiguityRef === undefined ? {} : { ambiguityRef: unit.ambiguityRef }),
      realizationPolicyRef: unit.realizationPolicyRef,
      requiredCompanionUnitRefs: unit.requiredCompanionUnitRefs,
    };
    const expectedUnitId = makeUnitId(value.sourceResponseHash, candidate, unit.domain);
    if (unit.unitId !== expectedUnitId) {
      throw new TypeError(`${field}.unitId does not match unit content.`);
    }
    unitIds.add(unit.unitId);
    units.push(unit);
  });

  assertCompanionGraph(units);

  const withoutHash: Omit<CharacterGroundingBundleV1, 'groundingHash'> = {
    schemaVersion: value.schemaVersion,
    groundingProjectionVersion: value.groundingProjectionVersion,
    axisRegistryVersion: value.axisRegistryVersion,
    readingRef: value.readingRef,
    productResponseVersion: value.productResponseVersion,
    engineVersion: value.engineVersion,
    readingDomain: value.readingDomain,
    sourceResponseHash: value.sourceResponseHash,
    units,
    disclosures,
    ambiguities,
  };
  const expectedGroundingHash = deterministicContentHash(bundleHashMaterial(withoutHash));
  if (value.groundingHash !== expectedGroundingHash) {
    throw new TypeError('CharacterGroundingBundleV1.groundingHash does not match bundle content.');
  }
}

export function admitCharacterGroundingBundleV1(input: unknown): CharacterGroundingBundleV1 {
  assertCharacterGroundingBundleV1(input);
  return input;
}

export function sourceResponseHashForCharacterGrounding(
  response: ProductReadingResponse,
): string {
  return deterministicContentHash(admitProductReadingResponse(response));
}
