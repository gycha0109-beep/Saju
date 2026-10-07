/** Wire fields are source-owned. No claim-family, prose, or direction mapping. */
export interface FaceGovernedInterpretationUnitV1 {
  readonly interpretationId: string;
  readonly lensKey: string;
  readonly direction:
    | 'favorable'
    | 'challenging'
    | 'mixed_or_conditional'
    | 'uncertain'
    | 'non_directional'
    | 'source_conflict';
  readonly evidenceStatus:
    | 'direct_evidence'
    | 'direct_relation'
    | 'direct_combination'
    | 'parallel_evidence'
    | 'source_conflict';
  readonly protectedMeaningText: string;
  readonly observationRefs: readonly string[];
  readonly bindingRefs: readonly string[];
  readonly evidenceRefs: readonly string[];
  readonly sourceRefs: readonly string[];
  readonly conditions: readonly string[];
  readonly qualifiers: readonly string[];
  readonly prohibitedExtensions: readonly string[];
}

export const FACE_GOVERNED_INTERPRETATION_REQUIRED_PROHIBITIONS_V1 = Object.freeze([
  'no_new_face_claims',
  'no_topic_remapping',
  'no_direction_mutation',
  'no_condition_removal',
  'no_conflict_resolution_without_upstream_authority',
] as const);

const DIRECTIONS = [
  'favorable',
  'challenging',
  'mixed_or_conditional',
  'uncertain',
  'non_directional',
  'source_conflict',
];
const EVIDENCE_STATUSES = [
  'direct_evidence',
  'direct_relation',
  'direct_combination',
  'parallel_evidence',
  'source_conflict',
];
const TEXT_FIELDS = [
  'interpretationId',
  'lensKey',
  'direction',
  'evidenceStatus',
  'protectedMeaningText',
] as const;
const REF_FIELDS = [
  'observationRefs',
  'bindingRefs',
  'evidenceRefs',
  'sourceRefs',
  'conditions',
  'qualifiers',
  'prohibitedExtensions',
] as const;
const KEYS = new Set<string>([...TEXT_FIELDS, ...REF_FIELDS]);

export function admitFaceGovernedInterpretationUnitV1(
  candidate: unknown,
): FaceGovernedInterpretationUnitV1 {
  if (candidate === null || typeof candidate !== 'object' || Array.isArray(candidate)) {
    throw new Error('FACE_GOVERNED_METADATA_INVALID');
  }
  const unit = candidate as Record<string, unknown>;
  if (Object.keys(unit).some((key) => !KEYS.has(key))) {
    throw new Error('FACE_GOVERNED_METADATA_SCOPE_VIOLATION');
  }
  const bounds = [512, 256, 64, 64, 8000];
  TEXT_FIELDS.forEach((key, index) => {
    const value = unit[key];
    if (typeof value !== 'string' || !value.trim() || value.length > bounds[index]!) {
      throw new Error(`FACE_GOVERNED_METADATA_MISSING_OR_INVALID:${key}`);
    }
  });
  if (
    !DIRECTIONS.includes(unit.direction as string) ||
    !EVIDENCE_STATUSES.includes(unit.evidenceStatus as string) ||
    (unit.direction === 'source_conflict') !== (unit.evidenceStatus === 'source_conflict')
  ) {
    throw new Error('FACE_GOVERNED_METADATA_CONFLICT_OR_ENUM_INVALID');
  }
  const refs = Object.fromEntries(
    REF_FIELDS.map((key) => {
      const values = unit[key];
      if (
        !Array.isArray(values) ||
        values.some((value) => typeof value !== 'string' || !value.trim() || value.length > 2048) ||
        new Set(values).size !== values.length ||
        [...values].sort().some((value, index) => value !== values[index]) ||
        (!['conditions', 'qualifiers'].includes(key) && values.length === 0)
      ) {
        throw new Error(`FACE_GOVERNED_METADATA_REFS_INVALID:${key}`);
      }
      return [key, Object.freeze([...values])];
    }),
  );
  const prohibitions = refs.prohibitedExtensions as readonly string[];
  if (
    FACE_GOVERNED_INTERPRETATION_REQUIRED_PROHIBITIONS_V1.some((key) => !prohibitions.includes(key))
  ) {
    throw new Error('FACE_GOVERNED_METADATA_PROHIBITION_REMOVED');
  }
  return Object.freeze({
    ...Object.fromEntries(TEXT_FIELDS.map((key) => [key, unit[key]])),
    ...refs,
  }) as unknown as FaceGovernedInterpretationUnitV1;
}
