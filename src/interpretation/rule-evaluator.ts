import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { FactState, VersionedRef } from '../contracts/common.js';
import type {
  ClaimInputSelector,
  InterpretationClaim,
  InterpretationPack,
  RuleDefinition,
  RuleEvaluation,
  RuleExpression,
  RuleInputRequirement,
  RuleOperand,
} from '../contracts/interpretation.js';
import { deterministicContentHash } from './rule-registry.js';

const CLAIM_SCHEMA_VERSION = 'myeonghwa-interpretation-claim-v1';
const FORBIDDEN_PATH_SEGMENTS = new Set(['__proto__', 'prototype', 'constructor']);

export interface RuleEvaluationContext {
  snapshot: CanonicalSajuSnapshot;
  pack: InterpretationPack;
  existingClaims?: readonly InterpretationClaim[];
  scenarioRef?: string;
  factOverrides?: Readonly<Record<string, unknown>>;
  now?: Date;
}

export interface RuleEvaluationResult {
  evaluation: RuleEvaluation;
  claims: readonly InterpretationClaim[];
}

interface ResolvedInput {
  key: string;
  value: unknown;
  inputRef: RuleEvaluation['inputRefs'][number];
  factRef?: string;
  upstreamClaimRefs: readonly string[];
}

type InputResolution =
  | { status: 'ready'; inputs: readonly ResolvedInput[] }
  | {
      status:
        | 'skipped_missing_input'
        | 'skipped_ambiguous_input'
        | 'skipped_dependency_unresolved'
        | 'skipped_cardinality_mismatch'
        | 'error';
      inputs: readonly ResolvedInput[];
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isFactState(value: unknown): value is FactState<unknown> {
  return (
    isRecord(value) &&
    (value.status === 'resolved' || value.status === 'ambiguous' || value.status === 'unavailable')
  );
}

function getPath(root: unknown, path: string): { found: boolean; value?: unknown } {
  const segments = path.split('.').filter((segment) => segment.length > 0);
  if (segments.length === 0 || segments.some((segment) => FORBIDDEN_PATH_SEGMENTS.has(segment))) {
    return { found: false };
  }

  let cursor: unknown = root;
  for (const segment of segments) {
    if (!isRecord(cursor) || !Object.prototype.hasOwnProperty.call(cursor, segment)) {
      return { found: false };
    }
    cursor = cursor[segment];
  }
  return { found: true, value: cursor };
}

function deepEqual(left: unknown, right: unknown): boolean {
  return deterministicContentHash(left) === deterministicContentHash(right);
}

function operandValue(operand: RuleOperand, inputs: ReadonlyMap<string, unknown>): unknown {
  if (operand.kind === 'literal') return operand.value;
  const input = inputs.get(operand.key);
  if (operand.path === undefined) return input;
  const projected = getPath(input, operand.path);
  return projected.found ? projected.value : undefined;
}

function compareNumeric(
  left: unknown,
  right: unknown,
  operation: 'gt' | 'gte' | 'lt' | 'lte',
): boolean {
  if (typeof left !== 'number' || typeof right !== 'number') {
    throw new TypeError(`${operation} requires numeric operands.`);
  }
  switch (operation) {
    case 'gt':
      return left > right;
    case 'gte':
      return left >= right;
    case 'lt':
      return left < right;
    case 'lte':
      return left <= right;
  }
}

export function evaluateRuleExpression(
  expression: RuleExpression,
  inputs: ReadonlyMap<string, unknown>,
): boolean {
  switch (expression.op) {
    case 'eq':
      return deepEqual(operandValue(expression.left, inputs), operandValue(expression.right, inputs));
    case 'in': {
      const value = operandValue(expression.value, inputs);
      return expression.set.some((candidate) => deepEqual(value, candidate));
    }
    case 'gt':
    case 'gte':
    case 'lt':
    case 'lte':
      return compareNumeric(
        operandValue(expression.left, inputs),
        operandValue(expression.right, inputs),
        expression.op,
      );
    case 'and':
      return expression.expressions.every((candidate) => evaluateRuleExpression(candidate, inputs));
    case 'or':
      return expression.expressions.some((candidate) => evaluateRuleExpression(candidate, inputs));
    case 'not':
      return !evaluateRuleExpression(expression.expression, inputs);
    case 'exists': {
      const value = operandValue(expression.value, inputs);
      return value !== undefined && value !== null;
    }
  }
}

function acceptedStatus(
  requirement: RuleInputRequirement,
  status: FactState<unknown>['status'],
): boolean {
  return requirement.acceptedStatuses === undefined || requirement.acceptedStatuses.includes(status);
}

function resolveFactInput(
  requirement: RuleInputRequirement,
  context: RuleEvaluationContext,
): InputResolution {
  const override = context.factOverrides?.[requirement.pathOrClaimType];
  if (override !== undefined) {
    return {
      status: 'ready',
      inputs: [
        {
          key: requirement.key,
          value: override,
          inputRef: {
            sourceType: 'fact',
            idOrPath: requirement.pathOrClaimType,
            observedValue: override,
          },
          factRef: requirement.pathOrClaimType,
          upstreamClaimRefs: [],
        },
      ],
    };
  }

  const located = getPath(context.snapshot, requirement.pathOrClaimType);
  if (!located.found) {
    return {
      status: requirement.required ? 'skipped_missing_input' : 'ready',
      inputs: requirement.required
        ? []
        : [
            {
              key: requirement.key,
              value: undefined,
              inputRef: { sourceType: 'fact', idOrPath: requirement.pathOrClaimType },
              factRef: requirement.pathOrClaimType,
              upstreamClaimRefs: [],
            },
          ],
    };
  }

  if (!isFactState(located.value)) {
    return {
      status: 'ready',
      inputs: [
        {
          key: requirement.key,
          value: located.value,
          inputRef: {
            sourceType: 'fact',
            idOrPath: requirement.pathOrClaimType,
            observedValue: located.value,
          },
          factRef: requirement.pathOrClaimType,
          upstreamClaimRefs: [],
        },
      ],
    };
  }

  const state = located.value;
  if (!acceptedStatus(requirement, state.status)) {
    return {
      status:
        state.status === 'ambiguous' ? 'skipped_ambiguous_input' : 'skipped_missing_input',
      inputs: [],
    };
  }

  if (state.status === 'unavailable') {
    return {
      status: requirement.required ? 'skipped_missing_input' : 'ready',
      inputs: requirement.required
        ? []
        : [
            {
              key: requirement.key,
              value: undefined,
              inputRef: {
                sourceType: 'fact',
                idOrPath: requirement.pathOrClaimType,
                observedValue: state,
              },
              factRef: requirement.pathOrClaimType,
              upstreamClaimRefs: [],
            },
          ],
    };
  }

  if (state.status === 'ambiguous') {
    return { status: 'skipped_ambiguous_input', inputs: [] };
  }

  return {
    status: 'ready',
    inputs: [
      {
        key: requirement.key,
        value: state.value,
        inputRef: {
          sourceType: 'fact',
          idOrPath: requirement.pathOrClaimType,
          observedValue: state.value,
        },
        factRef: requirement.pathOrClaimType,
        upstreamClaimRefs: [],
      },
    ],
  };
}

function claimVisibleInContext(
  claim: InterpretationClaim,
  scenarioRef: string | undefined,
): boolean {
  if (scenarioRef === undefined) return claim.scenarioRef === undefined;
  return claim.scenarioRef === undefined || claim.scenarioRef === scenarioRef;
}

function versionKey(ref: VersionedRef): string {
  return `${ref.id}@${ref.version}`;
}

function matchesSelector(claim: InterpretationClaim, selector: ClaimInputSelector | undefined): boolean {
  if (selector === undefined) return true;

  const taxonomy = selector.taxonomy;
  if (taxonomy?.tiers !== undefined && !taxonomy.tiers.includes(claim.taxonomy.tier)) return false;
  if (
    taxonomy?.categories !== undefined &&
    !taxonomy.categories.includes(claim.taxonomy.category)
  ) {
    return false;
  }
  if (taxonomy?.subcategories !== undefined) {
    if (
      claim.taxonomy.subcategory === undefined ||
      !taxonomy.subcategories.includes(claim.taxonomy.subcategory)
    ) {
      return false;
    }
  }
  if (selector.subjects !== undefined && !selector.subjects.includes(claim.subject)) return false;
  if (selector.predicates !== undefined && !selector.predicates.includes(claim.predicate)) return false;
  if (
    selector.methodologyRefs !== undefined &&
    !selector.methodologyRefs.some((ref) => versionKey(ref) === versionKey(claim.methodologyRef))
  ) {
    return false;
  }
  for (const expected of selector.valueEquals ?? []) {
    const projected = getPath(claim.value, expected.path);
    if (!projected.found || !deepEqual(projected.value, expected.value)) return false;
  }
  return true;
}

function claimInputRef(
  requirement: RuleInputRequirement,
  claims: readonly InterpretationClaim[],
  observedValue?: unknown,
): RuleEvaluation['inputRefs'][number] {
  return {
    sourceType: 'claim',
    idOrPath: requirement.pathOrClaimType,
    ...(observedValue === undefined ? {} : { observedValue }),
    selectedClaimIds: claims.map((claim) => claim.claimId),
  };
}

function readyClaimInput(
  requirement: RuleInputRequirement,
  claims: readonly InterpretationClaim[],
  value: unknown,
): InputResolution {
  return {
    status: 'ready',
    inputs: [
      {
        key: requirement.key,
        value,
        inputRef: claimInputRef(requirement, claims, value),
        upstreamClaimRefs: claims.map((claim) => claim.claimId),
      },
    ],
  };
}

function cardinalityMismatch(
  requirement: RuleInputRequirement,
  claims: readonly InterpretationClaim[],
): InputResolution {
  const values = claims.map((claim) => claim.value);
  return {
    status: 'skipped_cardinality_mismatch',
    inputs: [
      {
        key: requirement.key,
        value: values,
        inputRef: claimInputRef(requirement, claims, values),
        upstreamClaimRefs: claims.map((claim) => claim.claimId),
      },
    ],
  };
}

function resolveClaimInput(
  requirement: RuleInputRequirement,
  context: RuleEvaluationContext,
): InputResolution {
  const matchingClaims = (context.existingClaims ?? [])
    .filter(
      (claim) =>
        claim.state === 'active' &&
        claim.claimType === requirement.pathOrClaimType &&
        claimVisibleInContext(claim, context.scenarioRef) &&
        matchesSelector(claim, requirement.claimSelector),
    )
    .sort((left, right) => left.claimId.localeCompare(right.claimId));

  switch (requirement.cardinality) {
    case 'exactly_one':
      if (matchingClaims.length !== 1) return cardinalityMismatch(requirement, matchingClaims);
      return readyClaimInput(requirement, matchingClaims, matchingClaims[0]?.value);
    case 'one_or_more':
      if (matchingClaims.length === 0) return cardinalityMismatch(requirement, matchingClaims);
      return readyClaimInput(
        requirement,
        matchingClaims,
        matchingClaims.map((claim) => claim.value),
      );
    case 'zero_or_more':
      return readyClaimInput(
        requirement,
        matchingClaims,
        matchingClaims.map((claim) => claim.value),
      );
    case undefined:
      break;
  }

  if (matchingClaims.length === 0) {
    return {
      status: requirement.required ? 'skipped_dependency_unresolved' : 'ready',
      inputs: requirement.required
        ? []
        : [
            {
              key: requirement.key,
              value: undefined,
              inputRef: claimInputRef(requirement, []),
              upstreamClaimRefs: [],
            },
          ],
    };
  }

  const value =
    matchingClaims.length === 1
      ? matchingClaims[0]?.value
      : matchingClaims.map((claim) => claim.value);
  return readyClaimInput(requirement, matchingClaims, value);
}

function validInputDeclaration(requirement: RuleInputRequirement): boolean {
  const selectorOrCardinalityPresent =
    requirement.claimSelector !== undefined || requirement.cardinality !== undefined;
  if (requirement.source !== 'interpretation_claim') return !selectorOrCardinalityPresent;

  switch (requirement.cardinality) {
    case 'exactly_one':
    case 'one_or_more':
      return requirement.required;
    case 'zero_or_more':
      return !requirement.required;
    case undefined:
      return true;
  }
  return false;
}

function resolveInputs(rule: RuleDefinition, context: RuleEvaluationContext): InputResolution {
  const inputs: ResolvedInput[] = [];
  for (const requirement of rule.inputs) {
    if (!validInputDeclaration(requirement)) return { status: 'error', inputs };
    const resolution =
      requirement.source === 'interpretation_claim'
        ? resolveClaimInput(requirement, context)
        : resolveFactInput(requirement, context);
    inputs.push(...resolution.inputs);
    if (resolution.status !== 'ready') {
      return { status: resolution.status, inputs };
    }
  }
  return { status: 'ready', inputs };
}

function ruleContentHash(rule: RuleDefinition): string {
  return deterministicContentHash(rule);
}

function packContentHash(pack: InterpretationPack): string {
  return deterministicContentHash(pack);
}

function evaluationId(
  rule: RuleDefinition,
  context: RuleEvaluationContext,
  resolvedInputs: readonly ResolvedInput[],
): string {
  const hash = deterministicContentHash({
    snapshotId: context.snapshot.snapshotId,
    scenarioRef: context.scenarioRef,
    packRef: { id: context.pack.packId, version: context.pack.version },
    packContentHash: packContentHash(context.pack),
    ruleRef: { id: rule.ruleId, version: rule.version },
    ruleContentHash: ruleContentHash(rule),
    inputs: resolvedInputs.map((input) => ({ key: input.key, value: input.value })),
  });
  return `eval_${hash.slice(0, 24)}`;
}

function emitClaim(
  rule: RuleDefinition,
  context: RuleEvaluationContext,
  resolvedInputs: readonly ResolvedInput[],
  id: string,
): InterpretationClaim {
  const factRefs = [
    ...new Set(
      resolvedInputs.flatMap((input) => (input.factRef === undefined ? [] : [input.factRef])),
    ),
  ].sort();
  const upstreamClaimRefs = [
    ...new Set(resolvedInputs.flatMap((input) => input.upstreamClaimRefs)),
  ].sort();
  const sourceRefs = [...new Set(rule.sourceRefs.map((source) => source.sourceId))].sort();
  const claimMaterial = {
    snapshotId: context.snapshot.snapshotId,
    scenarioRef: context.scenarioRef,
    ruleRef: { id: rule.ruleId, version: rule.version },
    ruleContentHash: ruleContentHash(rule),
    methodologyRef: rule.methodologyRef,
    output: rule.output,
    factRefs,
    upstreamClaimRefs,
  };
  const claimId = `claim_${deterministicContentHash(claimMaterial).slice(0, 24)}`;

  return {
    claimId,
    schemaVersion: CLAIM_SCHEMA_VERSION,
    snapshotId: context.snapshot.snapshotId,
    ...(context.scenarioRef === undefined ? {} : { scenarioRef: context.scenarioRef }),
    taxonomy: rule.taxonomy,
    claimType: rule.output.claimType,
    subject: rule.output.subject,
    predicate: rule.output.predicate,
    value: rule.output.value,
    methodologyRef: rule.methodologyRef,
    ruleRefs: [{ ruleId: rule.ruleId, version: rule.version, evaluationId: id }],
    factRefs,
    upstreamClaimRefs,
    sourceRefs,
    ...(rule.output.polarity === undefined ? {} : { polarity: rule.output.polarity }),
    ...(rule.output.emphasis === undefined ? {} : { emphasis: rule.output.emphasis }),
    state: 'active',
  };
}

export function evaluateRule(
  rule: RuleDefinition,
  context: RuleEvaluationContext,
): RuleEvaluationResult {
  const resolution = resolveInputs(rule, context);
  const id = evaluationId(rule, context, resolution.inputs);
  const base: Omit<RuleEvaluation, 'status' | 'emittedClaimIds'> = {
    evaluationId: id,
    ruleRef: { id: rule.ruleId, version: rule.version } satisfies VersionedRef,
    snapshotId: context.snapshot.snapshotId,
    ...(context.scenarioRef === undefined ? {} : { scenarioRef: context.scenarioRef }),
    interpretationPackRef: { id: context.pack.packId, version: context.pack.version },
    inputRefs: resolution.inputs.map((input) => input.inputRef),
    evaluatedAt: (context.now ?? new Date()).toISOString(),
  };

  if (resolution.status !== 'ready') {
    return {
      evaluation: { ...base, status: resolution.status, emittedClaimIds: [] },
      claims: [],
    };
  }

  const values = new Map(resolution.inputs.map((input) => [input.key, input.value]));
  try {
    const matched = evaluateRuleExpression(rule.condition, values);
    if (!matched) {
      return {
        evaluation: { ...base, status: 'not_matched', emittedClaimIds: [] },
        claims: [],
      };
    }

    const claim = emitClaim(rule, context, resolution.inputs, id);
    return {
      evaluation: { ...base, status: 'matched', emittedClaimIds: [claim.claimId] },
      claims: [claim],
    };
  } catch {
    return {
      evaluation: { ...base, status: 'error', emittedClaimIds: [] },
      claims: [],
    };
  }
}
