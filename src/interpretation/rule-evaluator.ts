import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { FactState, VersionedRef } from '../contracts/common.js';
import type {
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
        | 'skipped_dependency_unresolved';
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
  return inputs.get(operand.key);
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

function acceptedStatus(requirement: RuleInputRequirement, status: FactState<unknown>['status']): boolean {
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

function resolveClaimInput(
  requirement: RuleInputRequirement,
  context: RuleEvaluationContext,
): InputResolution {
  const matchingClaims = (context.existingClaims ?? [])
    .filter(
      (claim) =>
        claim.state === 'active' &&
        claim.claimType === requirement.pathOrClaimType &&
        (context.scenarioRef === undefined ||
          claim.scenarioRef === undefined ||
          claim.scenarioRef === context.scenarioRef),
    )
    .sort((left, right) => left.claimId.localeCompare(right.claimId));

  if (matchingClaims.length === 0) {
    return {
      status: requirement.required ? 'skipped_dependency_unresolved' : 'ready',
      inputs: requirement.required
        ? []
        : [
            {
              key: requirement.key,
              value: undefined,
              inputRef: { sourceType: 'claim', idOrPath: requirement.pathOrClaimType },
              upstreamClaimRefs: [],
            },
          ],
    };
  }

  const value = matchingClaims.length === 1 ? matchingClaims[0]?.value : matchingClaims.map((claim) => claim.value);
  return {
    status: 'ready',
    inputs: [
      {
        key: requirement.key,
        value,
        inputRef: {
          sourceType: 'claim',
          idOrPath: requirement.pathOrClaimType,
          observedValue: value,
        },
        upstreamClaimRefs: matchingClaims.map((claim) => claim.claimId),
      },
    ],
  };
}

function resolveInputs(rule: RuleDefinition, context: RuleEvaluationContext): InputResolution {
  const inputs: ResolvedInput[] = [];
  for (const requirement of rule.inputs) {
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

function evaluationId(
  rule: RuleDefinition,
  context: RuleEvaluationContext,
  resolvedInputs: readonly ResolvedInput[],
): string {
  const hash = deterministicContentHash({
    snapshotId: context.snapshot.snapshotId,
    scenarioRef: context.scenarioRef,
    packRef: { id: context.pack.packId, version: context.pack.version },
    ruleRef: { id: rule.ruleId, version: rule.version },
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
  const factRefs = [...new Set(resolvedInputs.flatMap((input) => (input.factRef === undefined ? [] : [input.factRef])))].sort();
  const upstreamClaimRefs = [...new Set(resolvedInputs.flatMap((input) => input.upstreamClaimRefs))].sort();
  const sourceRefs = [...new Set(rule.sourceRefs.map((source) => source.sourceId))].sort();
  const claimMaterial = {
    snapshotId: context.snapshot.snapshotId,
    scenarioRef: context.scenarioRef,
    ruleRef: { id: rule.ruleId, version: rule.version },
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
