import { createHash } from 'node:crypto';
import type {
  ContentAddressedVersionedRef,
  VersionedRef,
} from '../contracts/common.js';
import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  ClaimValueSchemaNode,
  ContentAddressedReviewAttestationRef,
  ContentAddressedSourceRef,
  InterpretationPack,
  MethodologyDefinition,
  ReviewAttestation,
  RuleDefinition,
  RuleRegistrySnapshot,
  SourceReference,
} from '../contracts/interpretation.js';

export type RegistryConfigurationErrorCode =
  | 'DUPLICATE_RULE_VERSION'
  | 'DUPLICATE_METHODOLOGY_VERSION'
  | 'DUPLICATE_CLAIM_TYPE_VERSION'
  | 'DUPLICATE_CLAIM_VALUE_SCHEMA_VERSION'
  | 'DUPLICATE_SOURCE_ID'
  | 'DUPLICATE_REVIEW_ATTESTATION_ID'
  | 'PACK_METHODOLOGY_MISSING'
  | 'PACK_METHODOLOGY_VERSION_MISMATCH'
  | 'RULE_SOURCE_MISSING'
  | 'METHODOLOGY_SOURCE_MISSING'
  | 'CLAIM_TYPE_SELECTION_AMBIGUOUS'
  | 'CLAIM_VALUE_SCHEMA_INVALID'
  | 'CLAIM_VALUE_SCHEMA_MISSING'
  | 'RULE_CLAIM_TYPE_UNREGISTERED'
  | 'RULE_CLAIM_TAXONOMY_NOT_ALLOWED'
  | 'RULE_CLAIM_VALUE_SCHEMA_MISMATCH'
  | 'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY'
  | 'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN'
  | 'REVIEW_ATTESTATION_INVALID'
  | 'REVIEW_ATTESTATION_SUBJECT_MISMATCH';

export class RegistryConfigurationError extends Error {
  readonly code: RegistryConfigurationErrorCode;

  constructor(code: RegistryConfigurationErrorCode, message: string) {
    super(message);
    this.name = 'RegistryConfigurationError';
    this.code = code;
  }
}

export interface RuleRegistryInput {
  rules: readonly RuleDefinition[];
  methodologies: readonly MethodologyDefinition[];
  sources?: readonly SourceReference[];
  claimTypeDefinitions?: readonly ClaimTypeDefinition[];
  claimValueSchemas?: readonly ClaimValueSchemaDefinition[];
  reviewAttestations?: readonly ReviewAttestation[];
}

export interface ResolvedRuleRegistrySnapshot {
  snapshot: RuleRegistrySnapshot;
  pack: InterpretationPack;
  rules: readonly RuleDefinition[];
  methodologies: readonly MethodologyDefinition[];
  sources: readonly SourceReference[];
  claimTypeDefinitions: readonly ClaimTypeDefinition[];
  claimValueSchemas: readonly ClaimValueSchemaDefinition[];
  reviewAttestations: readonly ReviewAttestation[];
}

function canonicalize(value: unknown): unknown {
  if (value === undefined) return { $undefined: true };
  if (typeof value === 'number' && !Number.isFinite(value)) {
    return { $number: String(value) };
  }
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;

  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .map((key) => [key, canonicalize(record[key])]),
  );
}

export function deterministicContentHash(value: unknown): string {
  const serialized = JSON.stringify(canonicalize(value));
  return createHash('sha256').update(serialized).digest('hex');
}

function deepFreeze<T>(value: T): T {
  if (value === null || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  return Object.freeze(value);
}

function immutableClone<T>(value: T): T {
  return deepFreeze(structuredClone(value));
}

function versionKey(ref: VersionedRef): string {
  return `${ref.id}@${ref.version}`;
}

function ruleRef(rule: RuleDefinition): VersionedRef {
  return { id: rule.ruleId, version: rule.version };
}

function methodologyRef(methodology: MethodologyDefinition): VersionedRef {
  return { id: methodology.methodologyId, version: methodology.version };
}

function claimTypeRef(definition: ClaimTypeDefinition): VersionedRef {
  return { id: definition.claimType, version: definition.version };
}

function claimValueSchemaRef(schema: ClaimValueSchemaDefinition): VersionedRef {
  return { id: schema.schemaId, version: schema.version };
}

function contentAddressed(ref: VersionedRef, value: unknown): ContentAddressedVersionedRef {
  return { ...ref, contentHash: deterministicContentHash(value) };
}

function sourceContentRef(source: SourceReference): ContentAddressedSourceRef {
  return { sourceId: source.sourceId, contentHash: deterministicContentHash(source) };
}

function reviewContentRef(
  attestation: ReviewAttestation,
): ContentAddressedReviewAttestationRef {
  return {
    attestationId: attestation.attestationId,
    contentHash: deterministicContentHash(attestation),
  };
}

function ensureUniqueVersions<T>(
  values: readonly T[],
  toRef: (value: T) => VersionedRef,
  errorCode:
    | 'DUPLICATE_RULE_VERSION'
    | 'DUPLICATE_METHODOLOGY_VERSION'
    | 'DUPLICATE_CLAIM_TYPE_VERSION'
    | 'DUPLICATE_CLAIM_VALUE_SCHEMA_VERSION',
): void {
  const seen = new Set<string>();
  for (const value of values) {
    const key = versionKey(toRef(value));
    if (seen.has(key)) {
      throw new RegistryConfigurationError(errorCode, `Duplicate registry entry: ${key}`);
    }
    seen.add(key);
  }
}

function ensureUniqueSources(sources: readonly SourceReference[]): void {
  const seen = new Set<string>();
  for (const source of sources) {
    if (seen.has(source.sourceId)) {
      throw new RegistryConfigurationError(
        'DUPLICATE_SOURCE_ID',
        `Duplicate sourceId: ${source.sourceId}`,
      );
    }
    seen.add(source.sourceId);
  }
}

function ensureUniqueReviewAttestations(attestations: readonly ReviewAttestation[]): void {
  const seen = new Set<string>();
  for (const attestation of attestations) {
    if (attestation.attestationId.trim().length === 0 || attestation.reviewerId.trim().length === 0) {
      throw new RegistryConfigurationError(
        'REVIEW_ATTESTATION_INVALID',
        'Review attestation requires non-empty attestationId and reviewerId.',
      );
    }
    if (Number.isNaN(Date.parse(attestation.reviewedAt))) {
      throw new RegistryConfigurationError(
        'REVIEW_ATTESTATION_INVALID',
        `Review attestation ${attestation.attestationId} has invalid reviewedAt.`,
      );
    }
    if (seen.has(attestation.attestationId)) {
      throw new RegistryConfigurationError(
        'DUPLICATE_REVIEW_ATTESTATION_ID',
        `Duplicate review attestation: ${attestation.attestationId}`,
      );
    }
    seen.add(attestation.attestationId);
  }
}

function ensureSourceReferences(
  rules: readonly RuleDefinition[],
  methodologies: readonly MethodologyDefinition[],
  sources: readonly SourceReference[],
): void {
  const sourceIds = new Set(sources.map((source) => source.sourceId));

  for (const methodology of methodologies) {
    for (const sourceId of methodology.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        throw new RegistryConfigurationError(
          'METHODOLOGY_SOURCE_MISSING',
          `Methodology ${methodology.methodologyId}@${methodology.version} references missing source ${sourceId}`,
        );
      }
    }
  }

  for (const rule of rules) {
    for (const sourceRef of rule.sourceRefs) {
      if (!sourceIds.has(sourceRef.sourceId)) {
        throw new RegistryConfigurationError(
          'RULE_SOURCE_MISSING',
          `Rule ${rule.ruleId}@${rule.version} references missing source ${sourceRef.sourceId}`,
        );
      }
    }
  }
}

function resolvePackMethodologies(
  pack: InterpretationPack,
  methodologies: readonly MethodologyDefinition[],
): readonly MethodologyDefinition[] {
  const byId = new Map<string, MethodologyDefinition[]>();
  for (const methodology of methodologies) {
    const values = byId.get(methodology.methodologyId) ?? [];
    values.push(methodology);
    byId.set(methodology.methodologyId, values);
  }

  return pack.methodologyRefs.map((requested) => {
    const versions = byId.get(requested.id);
    if (versions === undefined) {
      throw new RegistryConfigurationError(
        'PACK_METHODOLOGY_MISSING',
        `Pack ${pack.packId}@${pack.version} references missing methodology ${requested.id}@${requested.version}`,
      );
    }

    const exact = versions.find((candidate) => candidate.version === requested.version);
    if (exact === undefined) {
      throw new RegistryConfigurationError(
        'PACK_METHODOLOGY_VERSION_MISMATCH',
        `Pack ${pack.packId}@${pack.version} requires ${requested.id}@${requested.version}, available: ${versions
          .map((candidate) => candidate.version)
          .sort()
          .join(', ')}`,
      );
    }
    return exact;
  });
}

function stableRules(rules: readonly RuleDefinition[]): readonly RuleDefinition[] {
  return [...rules].sort((left, right) => {
    const idOrder = left.ruleId.localeCompare(right.ruleId);
    return idOrder === 0 ? left.version.localeCompare(right.version) : idOrder;
  });
}

function stableMethodologies(
  methodologies: readonly MethodologyDefinition[],
): readonly MethodologyDefinition[] {
  return [...methodologies].sort((left, right) => {
    const idOrder = left.methodologyId.localeCompare(right.methodologyId);
    return idOrder === 0 ? left.version.localeCompare(right.version) : idOrder;
  });
}

function stableClaimTypeDefinitions(
  definitions: readonly ClaimTypeDefinition[],
): readonly ClaimTypeDefinition[] {
  return [...definitions].sort((left, right) => {
    const typeOrder = left.claimType.localeCompare(right.claimType);
    return typeOrder === 0 ? left.version.localeCompare(right.version) : typeOrder;
  });
}

function stableClaimValueSchemas(
  schemas: readonly ClaimValueSchemaDefinition[],
): readonly ClaimValueSchemaDefinition[] {
  return [...schemas].sort((left, right) => {
    const idOrder = left.schemaId.localeCompare(right.schemaId);
    return idOrder === 0 ? left.version.localeCompare(right.version) : idOrder;
  });
}

function stableSources(sources: readonly SourceReference[]): readonly SourceReference[] {
  return [...sources].sort((left, right) => left.sourceId.localeCompare(right.sourceId));
}

function stableReviewAttestations(
  attestations: readonly ReviewAttestation[],
): readonly ReviewAttestation[] {
  return [...attestations].sort((left, right) => left.attestationId.localeCompare(right.attestationId));
}

function ensureReviewSubjectBindings(
  attestations: readonly ReviewAttestation[],
  rules: readonly RuleDefinition[],
  methodologies: readonly MethodologyDefinition[],
): void {
  const ruleContent = new Map(
    rules.map((rule) => [versionKey(ruleRef(rule)), contentAddressed(ruleRef(rule), rule)]),
  );
  const methodologyContent = new Map(
    methodologies.map((methodology) => [
      versionKey(methodologyRef(methodology)),
      contentAddressed(methodologyRef(methodology), methodology),
    ]),
  );

  for (const attestation of attestations) {
    const key = versionKey(attestation.subjectRef);
    const expected =
      attestation.subjectType === 'rule' ? ruleContent.get(key) : methodologyContent.get(key);
    if (expected === undefined || expected.contentHash !== attestation.subjectRef.contentHash) {
      throw new RegistryConfigurationError(
        'REVIEW_ATTESTATION_SUBJECT_MISMATCH',
        `Review attestation ${attestation.attestationId} does not bind the current ${attestation.subjectType} content ${key}.`,
      );
    }
  }
}

function selectedRulesForPack(
  rules: readonly RuleDefinition[],
  pack: InterpretationPack,
): readonly RuleDefinition[] {
  const enabledSets = new Set(pack.enabledRuleSets);
  const disabled = new Set(pack.disabledRuleIds ?? []);
  return rules.filter((rule) => enabledSets.has(rule.ruleSetId) && !disabled.has(rule.ruleId));
}

function pathPatternMatches(pattern: string, path: string): boolean {
  const patternSegments = pattern.split('.').filter(Boolean);
  const pathSegments = path.split('.').filter(Boolean);
  let pi = 0;
  let vi = 0;
  while (pi < patternSegments.length && vi < pathSegments.length) {
    const segment = patternSegments[pi];
    if (segment === '**') return pi === patternSegments.length - 1;
    if (segment !== '*' && segment !== pathSegments[vi]) return false;
    pi += 1;
    vi += 1;
  }
  if (pi === patternSegments.length && vi === pathSegments.length) return true;
  return pi === patternSegments.length - 1 && patternSegments[pi] === '**';
}

function researchEvidenceContractMatches(
  candidate: NonNullable<MethodologyDefinition['inputContract']>['researchEvidenceInputs'] extends readonly (infer T)[] | undefined
    ? T
    : never,
  input: RuleDefinition['inputs'][number],
): boolean {
  if (candidate.evidenceType !== input.pathOrClaimType) return false;
  if (candidate.evidenceVersion !== undefined && candidate.evidenceVersion !== input.evidenceVersion) {
    return false;
  }
  if (candidate.definitionRef !== undefined) {
    if (input.researchEvidenceDefinitionRef === undefined) return false;
    if (versionKey(candidate.definitionRef) !== versionKey(input.researchEvidenceDefinitionRef)) return false;
  }
  return true;
}

function ensureMethodologyInputContracts(
  rules: readonly RuleDefinition[],
  methodologies: readonly MethodologyDefinition[],
): void {
  const methods = new Map(methodologies.map((method) => [versionKey(methodologyRef(method)), method]));

  for (const rule of rules) {
    const method = methods.get(versionKey(rule.methodologyRef));
    if (method?.inputContract === undefined) continue;

    for (const input of rule.inputs) {
      if (input.source === 'interpretation_claim') {
        const candidates = (method.inputContract.claimInputs ?? []).filter(
          (candidate) => candidate.claimType === input.pathOrClaimType,
        );
        if (candidates.some((candidate) => candidate.mode === 'forbidden')) {
          throw new RegistryConfigurationError(
            'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY',
            `Rule ${rule.ruleId}@${rule.version} consumes forbidden claim input ${input.pathOrClaimType} under ${method.methodologyId}@${method.version}.`,
          );
        }
        if (!candidates.some((candidate) => candidate.mode === 'allowed' || candidate.mode === 'required')) {
          throw new RegistryConfigurationError(
            'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY',
            `Rule ${rule.ruleId}@${rule.version} consumes undeclared claim input ${input.pathOrClaimType} under ${method.methodologyId}@${method.version}.`,
          );
        }
        continue;
      }

      if (input.source === 'research_evidence') {
        const candidates = (method.inputContract.researchEvidenceInputs ?? []).filter((candidate) =>
          researchEvidenceContractMatches(candidate, input),
        );
        if (candidates.some((candidate) => candidate.mode === 'forbidden')) {
          throw new RegistryConfigurationError(
            'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY',
            `Rule ${rule.ruleId}@${rule.version} consumes forbidden research evidence ${input.pathOrClaimType}@${input.evidenceVersion ?? '*'} under ${method.methodologyId}@${method.version}.`,
          );
        }
        if (!candidates.some((candidate) => candidate.mode === 'allowed' || candidate.mode === 'required')) {
          throw new RegistryConfigurationError(
            'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY',
            `Rule ${rule.ruleId}@${rule.version} consumes undeclared research evidence ${input.pathOrClaimType}@${input.evidenceVersion ?? '*'} under ${method.methodologyId}@${method.version}.`,
          );
        }
        continue;
      }

      const candidates = (method.inputContract.factInputs ?? []).filter(
        (candidate) =>
          candidate.source === input.source &&
          pathPatternMatches(candidate.pathPattern, input.pathOrClaimType),
      );
      if (candidates.some((candidate) => candidate.mode === 'forbidden')) {
        throw new RegistryConfigurationError(
          'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY',
          `Rule ${rule.ruleId}@${rule.version} consumes forbidden fact input ${input.pathOrClaimType} under ${method.methodologyId}@${method.version}.`,
        );
      }
      if (!candidates.some((candidate) => candidate.mode === 'allowed' || candidate.mode === 'required')) {
        throw new RegistryConfigurationError(
          'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY',
          `Rule ${rule.ruleId}@${rule.version} consumes undeclared fact input ${input.pathOrClaimType} under ${method.methodologyId}@${method.version}.`,
        );
      }
    }
  }
}

function ensureResearchEvidenceProductionBoundary(
  rules: readonly RuleDefinition[],
  pack: InterpretationPack,
): void {
  if (pack.status !== 'production') return;
  for (const rule of rules) {
    const researchInput = rule.inputs.find((input) => input.source === 'research_evidence');
    if (researchInput === undefined) continue;
    throw new RegistryConfigurationError(
      'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      `Production pack ${pack.packId}@${pack.version} cannot select rule ${rule.ruleId}@${rule.version} because it consumes research_only evidence ${researchInput.pathOrClaimType}@${researchInput.evidenceVersion ?? '*'}.`,
    );
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function schemaDefinitionErrors(node: ClaimValueSchemaNode, path = '$'): readonly string[] {
  switch (node.kind) {
    case 'string':
      return node.enum !== undefined && new Set(node.enum).size !== node.enum.length
        ? [`${path}: duplicate string enum value`]
        : [];
    case 'number':
    case 'boolean':
    case 'null':
    case 'literal':
      return [];
    case 'array': {
      const errors = [...schemaDefinitionErrors(node.items, `${path}[]`)];
      if (node.minItems !== undefined && (!Number.isInteger(node.minItems) || node.minItems < 0)) {
        errors.push(`${path}: minItems must be a non-negative integer`);
      }
      if (node.maxItems !== undefined && (!Number.isInteger(node.maxItems) || node.maxItems < 0)) {
        errors.push(`${path}: maxItems must be a non-negative integer`);
      }
      if (
        node.minItems !== undefined &&
        node.maxItems !== undefined &&
        node.minItems > node.maxItems
      ) {
        errors.push(`${path}: minItems exceeds maxItems`);
      }
      return errors;
    }
    case 'object': {
      const errors: string[] = [];
      const propertyKeys = new Set(Object.keys(node.properties));
      for (const required of node.required) {
        if (!propertyKeys.has(required)) errors.push(`${path}: required property ${required} is undefined`);
      }
      if (new Set(node.required).size !== node.required.length) {
        errors.push(`${path}: duplicate required property`);
      }
      for (const [key, child] of Object.entries(node.properties)) {
        errors.push(...schemaDefinitionErrors(child, `${path}.${key}`));
      }
      return errors;
    }
    case 'union': {
      if (node.anyOf.length === 0) return [`${path}: union requires at least one branch`];
      return node.anyOf.flatMap((child, index) => schemaDefinitionErrors(child, `${path}|${index}`));
    }
  }
}

function valueValidationErrors(
  node: ClaimValueSchemaNode,
  value: unknown,
  path = '$',
): readonly string[] {
  switch (node.kind) {
    case 'string':
      if (typeof value !== 'string') return [`${path}: expected string`];
      if (node.enum !== undefined && !node.enum.includes(value)) {
        return [`${path}: value is outside allowed enum`];
      }
      return [];
    case 'number':
      if (typeof value !== 'number' || !Number.isFinite(value)) return [`${path}: expected finite number`];
      if (node.integer === true && !Number.isInteger(value)) return [`${path}: expected integer`];
      return [];
    case 'boolean':
      return typeof value === 'boolean' ? [] : [`${path}: expected boolean`];
    case 'null':
      return value === null ? [] : [`${path}: expected null`];
    case 'literal':
      return deterministicContentHash(value) === deterministicContentHash(node.value)
        ? []
        : [`${path}: expected literal value`];
    case 'array': {
      if (!Array.isArray(value)) return [`${path}: expected array`];
      const errors: string[] = [];
      if (node.minItems !== undefined && value.length < node.minItems) {
        errors.push(`${path}: fewer than ${node.minItems} items`);
      }
      if (node.maxItems !== undefined && value.length > node.maxItems) {
        errors.push(`${path}: more than ${node.maxItems} items`);
      }
      value.forEach((item, index) => {
        errors.push(...valueValidationErrors(node.items, item, `${path}[${index}]`));
      });
      return errors;
    }
    case 'object': {
      if (!isRecord(value)) return [`${path}: expected object`];
      const errors: string[] = [];
      for (const required of node.required) {
        if (!Object.prototype.hasOwnProperty.call(value, required)) {
          errors.push(`${path}.${required}: required property missing`);
        }
      }
      for (const [key, childValue] of Object.entries(value)) {
        const childSchema = node.properties[key];
        if (childSchema === undefined) {
          if (!node.additionalProperties) errors.push(`${path}.${key}: additional property not allowed`);
          continue;
        }
        errors.push(...valueValidationErrors(childSchema, childValue, `${path}.${key}`));
      }
      return errors;
    }
    case 'union': {
      if (node.anyOf.some((child) => valueValidationErrors(child, value, path).length === 0)) return [];
      return [`${path}: value matches no union branch`];
    }
  }
}

function ensureClaimValueSchemas(schemas: readonly ClaimValueSchemaDefinition[]): void {
  for (const schema of schemas) {
    const errors = schemaDefinitionErrors(schema.root);
    if (errors.length > 0) {
      throw new RegistryConfigurationError(
        'CLAIM_VALUE_SCHEMA_INVALID',
        `Claim value schema ${schema.schemaId}@${schema.version} is invalid: ${errors.join('; ')}`,
      );
    }
  }
}

function ensureClaimTypeDefinitions(
  definitions: readonly ClaimTypeDefinition[],
  schemas: readonly ClaimValueSchemaDefinition[],
): void {
  const byClaimType = new Map<string, ClaimTypeDefinition[]>();
  for (const definition of definitions) {
    const values = byClaimType.get(definition.claimType) ?? [];
    values.push(definition);
    byClaimType.set(definition.claimType, values);
  }
  for (const [claimType, values] of byClaimType) {
    if (values.length > 1) {
      throw new RegistryConfigurationError(
        'CLAIM_TYPE_SELECTION_AMBIGUOUS',
        `Registry selects multiple ClaimTypeDefinition versions for ${claimType}: ${values
          .map((value) => value.version)
          .sort()
          .join(', ')}`,
      );
    }
  }

  const schemaRefs = new Set(schemas.map((schema) => versionKey(claimValueSchemaRef(schema))));
  for (const definition of definitions) {
    if (!schemaRefs.has(versionKey(definition.valueSchemaRef))) {
      throw new RegistryConfigurationError(
        'CLAIM_VALUE_SCHEMA_MISSING',
        `Claim type ${definition.claimType}@${definition.version} references missing value schema ${versionKey(definition.valueSchemaRef)}.`,
      );
    }
  }
}

function ensureRuleClaimContracts(
  rules: readonly RuleDefinition[],
  definitions: readonly ClaimTypeDefinition[],
  schemas: readonly ClaimValueSchemaDefinition[],
  pack: InterpretationPack,
): void {
  const definitionByType = new Map(definitions.map((definition) => [definition.claimType, definition]));
  const schemaByRef = new Map(schemas.map((schema) => [versionKey(claimValueSchemaRef(schema)), schema]));
  const strict = pack.claimContractMode === 'registered_required';

  for (const rule of rules) {
    const definition = definitionByType.get(rule.output.claimType);
    if (definition === undefined) {
      if (strict) {
        throw new RegistryConfigurationError(
          'RULE_CLAIM_TYPE_UNREGISTERED',
          `Rule ${rule.ruleId}@${rule.version} emits unregistered claim type ${rule.output.claimType} in strict claim-contract mode.`,
        );
      }
      continue;
    }

    if (!definition.allowedTaxonomyTiers.includes(rule.taxonomy.tier)) {
      throw new RegistryConfigurationError(
        'RULE_CLAIM_TAXONOMY_NOT_ALLOWED',
        `Rule ${rule.ruleId}@${rule.version} emits ${definition.claimType} at disallowed tier ${rule.taxonomy.tier}.`,
      );
    }

    const schema = schemaByRef.get(versionKey(definition.valueSchemaRef));
    if (schema === undefined) {
      throw new RegistryConfigurationError(
        'CLAIM_VALUE_SCHEMA_MISSING',
        `Claim type ${definition.claimType}@${definition.version} references unavailable schema ${versionKey(definition.valueSchemaRef)}.`,
      );
    }
    const errors = valueValidationErrors(schema.root, rule.output.value);
    if (errors.length > 0) {
      throw new RegistryConfigurationError(
        'RULE_CLAIM_VALUE_SCHEMA_MISMATCH',
        `Rule ${rule.ruleId}@${rule.version} output does not satisfy ${schema.schemaId}@${schema.version}: ${errors.join('; ')}`,
      );
    }
  }
}

function registryMaterialFor(
  rules: readonly ContentAddressedVersionedRef[],
  methodologies: readonly ContentAddressedVersionedRef[],
  sources: readonly ContentAddressedSourceRef[],
  claimTypeDefinitions: readonly ContentAddressedVersionedRef[],
  claimValueSchemas: readonly ContentAddressedVersionedRef[],
  reviewAttestations: readonly ContentAddressedReviewAttestationRef[],
  packRef: ContentAddressedVersionedRef,
) {
  return {
    rules,
    methodologies,
    sources,
    ...(claimTypeDefinitions.length === 0 ? {} : { claimTypeDefinitions }),
    ...(claimValueSchemas.length === 0 ? {} : { claimValueSchemas }),
    reviewAttestations,
    packRef,
  };
}

export function verifyResolvedRegistryContentIntegrity(
  registry: ResolvedRuleRegistrySnapshot,
): readonly string[] {
  const errors: string[] = [];
  const expectedRules = stableRules(registry.rules).map((rule) => contentAddressed(ruleRef(rule), rule));
  const expectedMethodologies = stableMethodologies(registry.methodologies).map((methodology) =>
    contentAddressed(methodologyRef(methodology), methodology),
  );
  const expectedSources = stableSources(registry.sources).map(sourceContentRef);
  const expectedClaimTypes = stableClaimTypeDefinitions(registry.claimTypeDefinitions).map((definition) =>
    contentAddressed(claimTypeRef(definition), definition),
  );
  const expectedSchemas = stableClaimValueSchemas(registry.claimValueSchemas).map((schema) =>
    contentAddressed(claimValueSchemaRef(schema), schema),
  );
  const expectedReviews = stableReviewAttestations(registry.reviewAttestations).map(reviewContentRef);
  const expectedPackRef = contentAddressed(
    { id: registry.pack.packId, version: registry.pack.version },
    registry.pack,
  );

  if (deterministicContentHash(expectedRules) !== deterministicContentHash(registry.snapshot.rules)) {
    errors.push('rule content differs from registry snapshot');
  }
  if (
    deterministicContentHash(expectedMethodologies) !==
    deterministicContentHash(registry.snapshot.methodologies)
  ) {
    errors.push('methodology content differs from registry snapshot');
  }
  if (deterministicContentHash(expectedSources) !== deterministicContentHash(registry.snapshot.sources)) {
    errors.push('source content differs from registry snapshot');
  }
  if (
    expectedClaimTypes.length > 0 ||
    registry.snapshot.claimTypeDefinitions !== undefined
  ) {
    if (
      deterministicContentHash(expectedClaimTypes) !==
      deterministicContentHash(registry.snapshot.claimTypeDefinitions ?? [])
    ) {
      errors.push('claim type definition content differs from registry snapshot');
    }
  }
  if (expectedSchemas.length > 0 || registry.snapshot.claimValueSchemas !== undefined) {
    if (
      deterministicContentHash(expectedSchemas) !==
      deterministicContentHash(registry.snapshot.claimValueSchemas ?? [])
    ) {
      errors.push('claim value schema content differs from registry snapshot');
    }
  }
  if (
    deterministicContentHash(expectedReviews) !==
    deterministicContentHash(registry.snapshot.reviewAttestations)
  ) {
    errors.push('review attestation content differs from registry snapshot');
  }
  if (deterministicContentHash(expectedPackRef) !== deterministicContentHash(registry.snapshot.packRef)) {
    errors.push('pack content differs from registry snapshot');
  }

  const expectedRegistryId = `registry_${deterministicContentHash(
    registryMaterialFor(
      expectedRules,
      expectedMethodologies,
      expectedSources,
      expectedClaimTypes,
      expectedSchemas,
      expectedReviews,
      expectedPackRef,
    ),
  ).slice(0, 24)}`;
  if (expectedRegistryId !== registry.snapshot.registrySnapshotId) {
    errors.push('registrySnapshotId does not match resolved content');
  }
  return errors.sort();
}

export function createRuleRegistrySnapshot(
  input: RuleRegistryInput,
  pack: InterpretationPack,
  createdAt = '1970-01-01T00:00:00.000Z',
): ResolvedRuleRegistrySnapshot {
  const rulesInput = immutableClone([...input.rules]);
  const methodologiesInput = immutableClone([...input.methodologies]);
  const sourcesInput = immutableClone([...(input.sources ?? [])]);
  const claimTypesInput = immutableClone([...(input.claimTypeDefinitions ?? [])]);
  const claimSchemasInput = immutableClone([...(input.claimValueSchemas ?? [])]);
  const reviewsInput = immutableClone([...(input.reviewAttestations ?? [])]);
  const packInput = immutableClone(pack);

  ensureUniqueVersions(rulesInput, ruleRef, 'DUPLICATE_RULE_VERSION');
  ensureUniqueVersions(
    methodologiesInput,
    methodologyRef,
    'DUPLICATE_METHODOLOGY_VERSION',
  );
  ensureUniqueVersions(claimTypesInput, claimTypeRef, 'DUPLICATE_CLAIM_TYPE_VERSION');
  ensureUniqueVersions(
    claimSchemasInput,
    claimValueSchemaRef,
    'DUPLICATE_CLAIM_VALUE_SCHEMA_VERSION',
  );
  ensureUniqueSources(sourcesInput);
  ensureUniqueReviewAttestations(reviewsInput);
  ensureSourceReferences(rulesInput, methodologiesInput, sourcesInput);
  ensureClaimValueSchemas(claimSchemasInput);
  ensureClaimTypeDefinitions(claimTypesInput, claimSchemasInput);

  const rules = immutableClone(stableRules(rulesInput));
  const methodologies = immutableClone(
    stableMethodologies(resolvePackMethodologies(packInput, methodologiesInput)),
  );
  const sources = immutableClone(stableSources(sourcesInput));
  const claimTypeDefinitions = immutableClone(stableClaimTypeDefinitions(claimTypesInput));
  const claimValueSchemas = immutableClone(stableClaimValueSchemas(claimSchemasInput));
  const reviewAttestations = immutableClone(stableReviewAttestations(reviewsInput));
  ensureReviewSubjectBindings(reviewAttestations, rules, methodologies);

  const selectedRules = selectedRulesForPack(rules, packInput);
  ensureMethodologyInputContracts(selectedRules, methodologies);
  ensureResearchEvidenceProductionBoundary(selectedRules, packInput);
  ensureRuleClaimContracts(
    selectedRules,
    claimTypeDefinitions,
    claimValueSchemas,
    packInput,
  );

  const ruleRefs = immutableClone(rules.map((rule) => contentAddressed(ruleRef(rule), rule)));
  const methodologyRefs = immutableClone(
    methodologies.map((methodology) => contentAddressed(methodologyRef(methodology), methodology)),
  );
  const sourceRefs = immutableClone(sources.map(sourceContentRef));
  const claimTypeRefs = immutableClone(
    claimTypeDefinitions.map((definition) => contentAddressed(claimTypeRef(definition), definition)),
  );
  const claimSchemaRefs = immutableClone(
    claimValueSchemas.map((schema) => contentAddressed(claimValueSchemaRef(schema), schema)),
  );
  const reviewRefs = immutableClone(reviewAttestations.map(reviewContentRef));
  const packRef = immutableClone(
    contentAddressed({ id: packInput.packId, version: packInput.version }, packInput),
  );

  const registryMaterial = registryMaterialFor(
    ruleRefs,
    methodologyRefs,
    sourceRefs,
    claimTypeRefs,
    claimSchemaRefs,
    reviewRefs,
    packRef,
  );
  const registrySnapshotId = `registry_${deterministicContentHash(registryMaterial).slice(0, 24)}`;
  const snapshot = immutableClone({
    registrySnapshotId,
    createdAt,
    rules: ruleRefs,
    methodologies: methodologyRefs,
    sources: sourceRefs,
    ...(claimTypeRefs.length === 0 ? {} : { claimTypeDefinitions: claimTypeRefs }),
    ...(claimSchemaRefs.length === 0 ? {} : { claimValueSchemas: claimSchemaRefs }),
    reviewAttestations: reviewRefs,
    packRef,
  } satisfies RuleRegistrySnapshot);

  return deepFreeze({
    snapshot,
    pack: packInput,
    rules,
    methodologies,
    sources,
    claimTypeDefinitions,
    claimValueSchemas,
    reviewAttestations,
  });
}
