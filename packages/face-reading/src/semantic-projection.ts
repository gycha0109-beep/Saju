import type {
  CharacterFaceGrounding,
  FaceClaim,
  ProductFaceReadingSemanticV3,
} from './contracts.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface FaceGroundingProjectionInput {
  readonly groundingVersion: string;
  readonly reading: ProductFaceReadingSemanticV3;
  readonly claims: readonly FaceClaim[];
}

const CONSUMER_PROSE_KEYS = new Set([
  'headline',
  'summary',
  'paragraph',
  'text',
  'narrative',
  'copy',
]);
const MODULE_KEYS = [
  'threeDivisions',
  'fiveOfficers',
  'twelvePalaces',
  'dominantFeatures',
  'tensions',
  'typeDiagnosis',
];

function semanticError(message: string): never {
  throw new FaceAuthorityValidationError(`Semantic face reading ${message}`);
}

function semanticRecord(
  value: unknown,
  allowed: readonly string[],
  required: readonly string[],
  path: string,
): Record<string, unknown> {
  if (
    value === null ||
    typeof value !== 'object' ||
    ![Object.prototype, null].includes(Object.getPrototypeOf(value))
  )
    semanticError(`${path} must be a plain data object.`);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)!;
    if (typeof key !== 'string' || !descriptor.enumerable || !('value' in descriptor))
      semanticError(`${path} contains an executable or non-data property.`);
    if (!allowed.includes(key)) {
      if (CONSUMER_PROSE_KEYS.has(key.toLowerCase()))
        semanticError(`contains consumer-prose field: ${key.toLowerCase()}`);
      semanticError(`${path} contains an unauthorized field.`);
    }
  }
  if (required.some((key) => !Object.hasOwn(value, key)))
    semanticError(`${path} is missing required fields.`);
  return value as Record<string, unknown>;
}

function semanticArray(value: unknown, path: string): readonly unknown[] {
  if (
    !Array.isArray(value) ||
    Object.getPrototypeOf(value) !== Array.prototype ||
    Reflect.ownKeys(value).length !== value.length + 1
  )
    semanticError(`${path} must be a data array.`);
  for (let index = 0; index < value.length; index++) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (descriptor === undefined || !('value' in descriptor))
      semanticError(`${path} contains a sparse or executable item.`);
  }
  return value;
}

// Opaque reference/version values retain their existing meaning; never normalize them.
function semanticReference(value: unknown, path: string): void {
  if (typeof value !== 'string' || value.trim().length === 0)
    semanticError(`${path} must be a non-empty reference.`);
}

function semanticIdentifier(value: unknown, path: string): void {
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._:@/-]*$/u.test(value)) {
    semanticError(`${path} must be an identifier, not consumer prose.`);
  }
}

function semanticList(value: unknown, path: string, identifiers = false): void {
  for (const entry of semanticArray(value, path)) {
    if (identifiers) semanticIdentifier(entry, path);
    else semanticReference(entry, path);
  }
}

function semanticEnum(value: unknown, choices: readonly string[], path: string): void {
  if (typeof value !== 'string' || !choices.includes(value))
    semanticError(`${path} has an unsupported state.`);
}

function validateClaimForProjection(value: unknown): void {
  const required = ['claimRef', 'claimType', 'tier', 'methodologyRef', 'sourceRefs', 'semanticKey'];
  const claim = semanticRecord(
    value,
    [...required, 'axis', 'pattern', 'salience', 'disposition'],
    required,
    'claim',
  );
  for (const key of ['claimRef', 'methodologyRef']) semanticReference(claim[key], `claim.${key}`);
  semanticIdentifier(claim['claimType'], 'claim.claimType');
  semanticIdentifier(claim['semanticKey'], 'claim.semanticKey');
  semanticList(claim['sourceRefs'], 'claim.sourceRefs');
  semanticEnum(claim['tier'], ['F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'], 'claim.tier');
  for (const key of ['axis', 'pattern']) {
    if (claim[key] !== undefined) semanticIdentifier(claim[key], `claim.${key}`);
  }
  if (claim['salience'] !== undefined)
    semanticEnum(
      claim['salience'],
      ['primary', 'strong', 'supporting', 'secondary', 'countervailing'],
      'claim.salience',
    );
  if (claim['disposition'] !== undefined)
    semanticEnum(
      claim['disposition'],
      ['favorable', 'mixed', 'challenging', 'neutral'],
      'claim.disposition',
    );
}

function claimIndex(claims: readonly FaceClaim[]): ReadonlyMap<string, FaceClaim> {
  const result = new Map<string, FaceClaim>();
  for (const claim of claims) {
    if (result.has(claim.claimRef)) {
      throw new FaceAuthorityValidationError(`Duplicate claimRef: ${claim.claimRef}`);
    }
    result.set(claim.claimRef, claim);
  }
  return result;
}

function semanticClaim(claim: FaceClaim): CharacterFaceGrounding['semanticClaims'][number] {
  return {
    key: claim.semanticKey,
    ...(claim.axis === undefined ? {} : { axis: claim.axis }),
    ...(claim.pattern === undefined ? {} : { pattern: claim.pattern }),
    claimRef: claim.claimRef,
  };
}

export function projectCharacterFaceGrounding(
  input: FaceGroundingProjectionInput,
): CharacterFaceGrounding {
  semanticRecord(
    input,
    ['groundingVersion', 'reading', 'claims'],
    ['groundingVersion', 'reading', 'claims'],
    'projection',
  );
  semanticReference(input.groundingVersion, 'projection.groundingVersion');
  assertNoConsumerProseInSemanticReading(input.reading);
  for (const claim of semanticArray(input.claims, 'projection.claims'))
    validateClaimForProjection(claim);
  const byRef = claimIndex(input.claims);
  const requestedRefs = new Set<string>([
    ...input.reading.verdict.claimRefs,
    ...Object.values(input.reading.modules).flatMap((module) => module?.claimRefs ?? []),
    ...input.reading.lenses.flatMap((lens) => lens.claimRefs),
  ]);

  const selected: FaceClaim[] = [];
  for (const ref of requestedRefs) {
    const claim = byRef.get(ref);
    if (claim === undefined) {
      throw new FaceAuthorityValidationError(`Semantic reading references missing claim: ${ref}`);
    }
    selected.push(claim);
  }

  return {
    groundingVersion: input.groundingVersion,
    faceReadingRef: input.reading.readingRef,
    faceEngineVersion: input.reading.engineVersion,
    methodologyPackRef: input.reading.methodologyPackRef,
    semanticClaims: selected.map(semanticClaim),
    unavailableSections: [...input.reading.unavailableSections],
    prohibitedInferences: [...input.reading.prohibitedInferences],
  };
}

export function assertNoConsumerProseInSemanticReading(value: ProductFaceReadingSemanticV3): void {
  const keys = [
    'readingRef',
    'engineVersion',
    'methodologyPackRef',
    'sourceSnapshotRef',
    'observationState',
    'diagnosisResolution',
    'verdict',
    'modules',
    'lenses',
    'unavailableSections',
    'prohibitedInferences',
  ];
  const reading = semanticRecord(value, keys, keys, 'reading');
  for (const key of ['readingRef', 'engineVersion', 'methodologyPackRef', 'sourceSnapshotRef'])
    semanticReference(reading[key], `reading.${key}`);
  semanticEnum(
    reading['observationState'],
    ['usable', 'section_limited', 'recapture_required'],
    'reading.observationState',
  );
  semanticEnum(
    reading['diagnosisResolution'],
    ['resolved', 'resolved_mixed', 'unsupported_method'],
    'reading.diagnosisResolution',
  );
  const verdict = semanticRecord(
    reading['verdict'],
    ['semanticKey', 'claimRefs'],
    ['semanticKey', 'claimRefs'],
    'verdict',
  );
  semanticIdentifier(verdict['semanticKey'], 'verdict.semanticKey');
  semanticList(verdict['claimRefs'], 'verdict.claimRefs');
  const modules = semanticRecord(reading['modules'], MODULE_KEYS, [], 'modules');
  for (const value of Object.values(modules)) {
    if (value === undefined) continue;
    const module = semanticRecord(
      value,
      ['moduleKey', 'claimRefs', 'comparisonPolicyGroup'],
      ['moduleKey', 'claimRefs'],
      'module',
    );
    semanticIdentifier(module['moduleKey'], 'module.moduleKey');
    semanticList(module['claimRefs'], 'module.claimRefs');
    if (module['comparisonPolicyGroup'] !== undefined)
      semanticIdentifier(module['comparisonPolicyGroup'], 'module.comparisonPolicyGroup');
  }
  for (const value of semanticArray(reading['lenses'], 'lenses')) {
    const lens = semanticRecord(value, ['lensKey', 'claimRefs'], ['lensKey', 'claimRefs'], 'lens');
    semanticIdentifier(lens['lensKey'], 'lens.lensKey');
    semanticList(lens['claimRefs'], 'lens.claimRefs');
  }
  semanticList(reading['unavailableSections'], 'unavailableSections', true);
  semanticList(reading['prohibitedInferences'], 'prohibitedInferences', true);
}
