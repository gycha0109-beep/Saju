import type { FaceAuthorityRegistry, FaceClaimTemplate, FaceRuleExpression } from './contracts.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

export type FaceRuleScalar = string | number | boolean;
export type FaceRuleInputs = Readonly<
  Record<string, FaceRuleScalar | readonly FaceRuleScalar[] | null>
>;
export type FaceConditionResult = boolean | null;

// Execution resource bounds, never measurement or interpretation thresholds.
const MAX_DEPTH = 64;
const MAX_WORK = 4096;
const ITEM_INPUT = '$item';

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`Face rule evaluation: ${message}`);
}

function scalar(value: unknown): value is FaceRuleScalar {
  return (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'number' && Number.isFinite(value))
  );
}

function record(value: unknown): Record<string, unknown> {
  if (
    value === null ||
    typeof value !== 'object' ||
    ![Object.prototype, null].includes(Object.getPrototypeOf(value))
  )
    fail('expected a plain data object');
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)!;
    if (typeof key !== 'string' || !descriptor.enumerable || !('value' in descriptor))
      fail('expected data properties');
  }
  return value as Record<string, unknown>;
}

function list(value: unknown): readonly unknown[] {
  if (!Array.isArray(value) || value.length > MAX_WORK) fail('invalid or oversized array');
  if (
    Object.getPrototypeOf(value) !== Array.prototype ||
    Reflect.ownKeys(value).length !== value.length + 1
  ) {
    fail('expected a plain array');
  }
  // Reject holes and accessors before visiting elements.
  for (let index = 0; index < value.length; index++) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
    if (descriptor === undefined || !('value' in descriptor)) fail('sparse or accessor array');
  }
  return value;
}

function inputKey(value: unknown): asserts value is string {
  if (
    typeof value !== 'string' ||
    value.trim().length === 0 ||
    ['__proto__', 'prototype', 'constructor'].includes(value)
  )
    fail('invalid input key');
}

function validateExpression(value: unknown, keys?: ReadonlySet<string>): FaceRuleExpression {
  let count = 0;
  function visit(candidate: unknown, depth: number, inItem: boolean): void {
    if (++count > MAX_WORK || depth > MAX_DEPTH) fail('expression resource limit');
    const expression = record(candidate);
    const op = expression['op'];
    let fields: readonly string[];
    switch (op) {
      case 'eq':
      case 'lt':
      case 'lte':
      case 'gt':
      case 'gte':
        fields = ['op', 'input', 'value'];
        break;
      case 'in':
        fields = ['op', 'input', 'values'];
        break;
      case 'between':
        fields = ['op', 'input', 'min', 'max'];
        break;
      case 'exists':
        fields = ['op', 'input'];
        break;
      case 'not':
        fields = ['op', 'expression'];
        break;
      case 'and':
      case 'or':
        fields = ['op', 'expressions'];
        break;
      case 'all':
      case 'any':
        fields = ['op', 'input', 'expression'];
        break;
      default:
        fail('unsupported operator');
    }
    if (
      Object.keys(expression).length !== fields.length ||
      fields.some((key) => !Object.hasOwn(expression, key))
    ) {
      fail('unexpected expression fields');
    }
    if (Object.hasOwn(expression, 'input')) {
      const key = expression['input'];
      inputKey(key);
      if (key === ITEM_INPUT ? !inItem : keys !== undefined && !keys.has(key))
        fail(`undeclared input ${key}`);
    }
    if (op === 'eq' && !scalar(expression['value'])) fail('eq requires a finite scalar literal');
    if (op === 'in' && !list(expression['values']).every(scalar))
      fail('in requires scalar literals');
    if (['lt', 'lte', 'gt', 'gte'].includes(String(op))) {
      if (typeof expression['value'] !== 'number' || !Number.isFinite(expression['value']))
        fail('numeric literal required');
    }
    if (op === 'between') {
      const min = expression['min'];
      const max = expression['max'];
      if (
        typeof min !== 'number' ||
        typeof max !== 'number' ||
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min > max
      )
        fail('invalid inclusive interval');
    }
    if (op === 'not' || op === 'all' || op === 'any')
      visit(expression['expression'], depth + 1, inItem || op !== 'not');
    if (op === 'and' || op === 'or') {
      const children = list(expression['expressions']);
      if (children.length === 0) fail('empty boolean expression');
      for (const child of children) visit(child, depth + 1, inItem);
    }
  }
  visit(value, 0, false);
  return value as FaceRuleExpression;
}

function validateInputs(value: unknown): FaceRuleInputs {
  const inputs = record(value);
  for (const [key, entry] of Object.entries(inputs)) {
    inputKey(key);
    if (key === ITEM_INPUT) fail('reserved collection item input');
    if (entry !== null && !scalar(entry) && !list(entry).every(scalar)) fail('invalid input value');
  }
  return inputs as FaceRuleInputs;
}

function combine(results: readonly FaceConditionResult[], every: boolean): FaceConditionResult {
  if (results.includes(!every)) return !every;
  return results.includes(null) ? null : every;
}

/** Null means unavailable, including type mismatch; negation preserves it. */
export function evaluateFaceRuleExpression(
  expression: FaceRuleExpression,
  inputs: FaceRuleInputs,
): FaceConditionResult {
  const values = validateInputs(inputs);
  validateExpression(expression);
  let work = 0;
  function evaluate(
    node: FaceRuleExpression,
    item: FaceRuleScalar | null = null,
  ): FaceConditionResult {
    if (++work > MAX_WORK) fail('evaluation resource limit');
    if (node.op === 'not') {
      const result = evaluate(node.expression, item);
      return result === null ? null : !result;
    }
    if (node.op === 'and' || node.op === 'or') {
      return combine(
        node.expressions.map((child) => evaluate(child, item)),
        node.op === 'and',
      );
    }
    // Exact own-property lookup only: input keys are not executable object paths.
    if (!('input' in node)) fail('missing leaf input');
    const value =
      node.input === ITEM_INPUT
        ? item
        : Object.hasOwn(values, node.input)
          ? values[node.input]
          : null;
    if (node.op === 'exists') return value !== null && value !== undefined;
    if (value === null || value === undefined) return null;
    if (node.op === 'all' || node.op === 'any') {
      if (!Array.isArray(value)) return null;
      return combine(
        value.map((entry) => evaluate(node.expression, entry)),
        node.op === 'all',
      );
    }
    if (!scalar(value)) return null;
    switch (node.op) {
      case 'eq':
        return value === node.value;
      case 'in':
        return node.values.includes(value);
      case 'between':
        return typeof value === 'number' ? value >= node.min && value <= node.max : null;
      case 'lt':
        return typeof value === 'number' ? value < node.value : null;
      case 'lte':
        return typeof value === 'number' ? value <= node.value : null;
      case 'gt':
        return typeof value === 'number' ? value > node.value : null;
      case 'gte':
        return typeof value === 'number' ? value >= node.value : null;
      default:
        return fail('invalid validated expression');
    }
  }
  return evaluate(expression);
}

export interface FaceRegisteredRuleEvaluationInput {
  readonly registry: FaceAuthorityRegistry;
  readonly methodologyPackRef: string;
  readonly ruleRef: string;
  readonly executionStatus: 'research' | 'production_authorized';
  /** Already-bound rule input keys; this API neither measures nor classifies a photo. */
  readonly inputs: FaceRuleInputs;
}

export interface FaceRegisteredRuleEvaluation {
  readonly ruleRef: string;
  readonly methodologyPackRef: string;
  readonly methodologyRef: string;
  readonly sourceRefs: readonly string[];
  readonly executionStatus: FaceRegisteredRuleEvaluationInput['executionStatus'];
  readonly outcome: 'matched' | 'not_matched' | 'unavailable';
  readonly missingInputKeys: readonly string[];
  readonly output: FaceClaimTemplate | null;
}

/** Evaluates an exact registered rule, without issuing claims or granting authority. */
export function evaluateRegisteredFaceRule(
  input: FaceRegisteredRuleEvaluationInput,
): FaceRegisteredRuleEvaluation {
  if (!['research', 'production_authorized'].includes(input.executionStatus))
    fail('unknown execution status');
  validateFaceAuthorityRegistry(input.registry);
  const pack = input.registry.methodologyPacks.find(
    (entry) => `${entry.packId}@${entry.version}` === input.methodologyPackRef,
  );
  const rule = input.registry.rules.find(
    (entry) => `${entry.ruleId}@${entry.version}` === input.ruleRef,
  );
  if (pack === undefined || rule === undefined) fail('exact pack and rule versions required');
  if (rule.sourceRefs.length === 0) fail('source passage references required');
  const template = record(rule.output);
  if (
    Object.keys(template).some(
      (key) =>
        !['claimType', 'semanticKey', 'axis', 'pattern', 'salience', 'disposition'].includes(key),
    )
  ) {
    fail('unexpected semantic template field');
  }
  if (
    Object.values(template).some(
      (value) => typeof value !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,191}$/u.test(value),
    )
  ) {
    fail('semantic template requires identifier values');
  }
  if (!pack.methodologyDefinitionRefs.includes(rule.methodologyRef))
    fail('methodology outside selected pack');
  if (
    input.registry.claimTypes.find((entry) => entry.claimType === rule.output.claimType)!
      .dynamicAppearance
  ) {
    fail('dynamic appearance claim disabled for static execution');
  }
  if (!pack.enabledTiers.includes(rule.tier) || rule.tier === 'F5' || rule.tier === 'F8')
    fail('disabled rule tier');
  if (
    input.executionStatus === 'production_authorized' &&
    rule.promotionStatus !== 'production_authorized'
  ) {
    fail('production requires an explicitly authorized rule');
  }
  function verifyWitnesses(sourceRefs: readonly string[]): void {
    if (input.executionStatus !== 'production_authorized') return;
    for (const ref of sourceRefs) {
      const passage = input.registry.passages.find((entry) => entry.passageId === ref)!;
      if (
        input.registry.witnesses.find((entry) => entry.witnessId === passage.witnessId)!
          .witnessStatus !== 'verified'
      ) {
        fail('production requires a verified source witness');
      }
    }
  }
  verifyWitnesses(rule.sourceRefs);
  verifyWitnesses(
    input.registry.methodologies.find(
      (entry) => `${entry.methodologyId}@${entry.version}` === rule.methodologyRef,
    )!.sourceRefs,
  );
  // Claim dependency graphs require issued producer evidence, not caller assertions.
  if (
    input.executionStatus === 'production_authorized' &&
    rule.inputs.some((entry) => entry.sourceType === 'claim')
  ) {
    fail('production claim dependencies require a governed resolver');
  }
  const keys = rule.inputs.map((entry) => entry.inputKey);
  if (new Set(keys).size !== keys.length || keys.includes(ITEM_INPUT))
    fail('duplicate or reserved rule input');
  for (const entry of rule.inputs) {
    if (
      pack.forbiddenObservationInputs.some((ref) =>
        [entry.inputKey, entry.ref].some((key) => key === ref || key.startsWith(`${ref}.`)),
      )
    ) {
      fail('forbidden static observation input');
    }
    const metricRefs =
      entry.sourceType === 'metric'
        ? [entry.ref]
        : entry.sourceType === 'operationalization'
          ? input.registry.operationalizations.find(
              (candidate) => candidate.operationalizationId === entry.ref,
            )!.inputMetricRefs
          : [];
    if (entry.sourceType === 'operationalization') {
      verifyWitnesses(
        input.registry.operationalizations.find(
          (candidate) => candidate.operationalizationId === entry.ref,
        )!.sourceRefs,
      );
    }
    for (const metricRef of metricRefs) {
      const metric = input.registry.metrics.find(
        (candidate) => `${candidate.metricKey}@${candidate.version}` === metricRef,
      )!;
      verifyWitnesses(metric.sourceRefs);
      if (metric.regionMapRef === undefined) continue;
      const map = input.registry.regionMaps.find(
        (candidate) => `${candidate.regionMapId}@${candidate.version}` === metric.regionMapRef,
      )!;
      verifyWitnesses(map.sourceRefs);
      if (
        !pack.regionMapRefs.includes(metric.regionMapRef) ||
        map.methodologyRef !== rule.methodologyRef
      ) {
        fail('region map outside selected methodology');
      }
    }
  }
  const values = validateInputs(input.inputs);
  if (Object.keys(values).some((key) => !keys.includes(key))) fail('undeclared supplied input');
  validateExpression(rule.condition, new Set(keys));
  const bound: Record<string, FaceRuleInputs[string]> = Object.create(null) as Record<
    string,
    FaceRuleInputs[string]
  >;
  for (const key of keys) bound[key] = Object.hasOwn(values, key) ? values[key]! : null;
  const missingInputKeys = rule.inputs
    .filter((entry) => entry.required && bound[entry.inputKey] === null)
    .map((entry) => entry.inputKey)
    .sort();
  const result =
    missingInputKeys.length > 0 ? null : evaluateFaceRuleExpression(rule.condition, bound);
  return Object.freeze({
    ruleRef: input.ruleRef,
    methodologyPackRef: input.methodologyPackRef,
    methodologyRef: rule.methodologyRef,
    sourceRefs: Object.freeze([...rule.sourceRefs]),
    executionStatus: input.executionStatus,
    outcome: result === null ? 'unavailable' : result ? 'matched' : 'not_matched',
    missingInputKeys: Object.freeze(missingInputKeys),
    output: result === true ? Object.freeze({ ...rule.output }) : null,
  });
}
