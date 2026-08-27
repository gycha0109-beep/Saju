import type { VersionedRef } from '../contracts/common.js';
import type {
  InterpretationClaim,
  RuleDefinition,
  RuleEvaluation,
  RuleInputRequirement,
} from '../contracts/interpretation.js';
import type { ReadingEvidenceSelection, ReadingScenarioCoverage } from '../contracts/reading.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';

export const CONSUMED_INPUT_FINGERPRINT_VERSION =
  'myeonghwa-consumed-input-fingerprint-v1' as const;

export type ConsumedInputTraceErrorCode =
  | 'SELECTED_CLAIM_MISSING'
  | 'SELECTED_CLAIM_NOT_ACTIVE'
  | 'DUPLICATE_EVALUATION_ID'
  | 'PRODUCING_EVALUATION_MISSING'
  | 'PRODUCING_EVALUATION_NOT_MATCHED'
  | 'PRODUCING_EVALUATION_RULE_MISMATCH'
  | 'PRODUCING_EVALUATION_SCENARIO_MISMATCH'
  | 'PRODUCING_EVALUATION_EMISSION_MISMATCH'
  | 'PRODUCING_RULE_MISSING'
  | 'PRODUCING_RULE_DOMAIN_MISMATCH'
  | 'INPUT_TRACE_CARDINALITY_MISMATCH'
  | 'INPUT_TRACE_SOURCE_MISMATCH'
  | 'INPUT_TRACE_DECLARATION_MISMATCH';

export class ConsumedInputTraceError extends Error {
  readonly code: ConsumedInputTraceErrorCode;

  constructor(code: ConsumedInputTraceErrorCode, message: string) {
    super(message);
    this.name = 'ConsumedInputTraceError';
    this.code = code;
  }
}

export interface ConsumedResearchEvidenceIdentity {
  evidenceType?: string;
  evidenceVersion?: string;
  definitionRef?: VersionedRef;
  definitionContentHash?: string;
  payloadHash?: string;
}

export interface ConsumedInputTraceEntry {
  ruleRef: VersionedRef;
  inputKey: string;
  sourceType: RuleInputRequirement['source'];
  idOrPath: string;
  observedValue: unknown;
  evaluationStatus: 'matched';
  evidenceIdentity?: ConsumedResearchEvidenceIdentity;
}

export interface ConsumedInputFingerprint {
  version: typeof CONSUMED_INPUT_FINGERPRINT_VERSION;
  scenarioRef?: string;
  fingerprint: string;
  domain: string;
  entries: readonly ConsumedInputTraceEntry[];
}

function versionKey(ref: VersionedRef): string {
  return `${ref.id}@${ref.version}`;
}

function sameRef(left: VersionedRef, right: VersionedRef): boolean {
  return left.id === right.id && left.version === right.version;
}

function scenarioRefs(selection: ReadingEvidenceSelection): readonly (string | undefined)[] {
  const fromCoverage = selection.scenarioCoverage
    ?.map((coverage: ReadingScenarioCoverage) => coverage.scenarioRef)
    .filter((scenarioRef): scenarioRef is string => scenarioRef !== undefined);
  const refs =
    fromCoverage !== undefined && fromCoverage.length > 0
      ? fromCoverage
      : selection.scenarioRefs;
  const unique = [...new Set(refs)].sort();
  return unique.length === 0 ? [undefined] : unique;
}

function selectedDomainClaims(
  execution: InterpretationExecutionResult,
  selection: ReadingEvidenceSelection,
): readonly InterpretationClaim[] {
  const claimsById = new Map(execution.claims.map((claim) => [claim.claimId, claim]));
  const selected: InterpretationClaim[] = [];

  for (const claimId of selection.selectedClaimIds) {
    const claim = claimsById.get(claimId);
    if (claim === undefined) {
      throw new ConsumedInputTraceError(
        'SELECTED_CLAIM_MISSING',
        `Reading selection references missing claim ${claimId}.`,
      );
    }
    if (claim.state !== 'active') {
      throw new ConsumedInputTraceError(
        'SELECTED_CLAIM_NOT_ACTIVE',
        `Reading selection references non-active claim ${claimId}.`,
      );
    }
    if (claim.taxonomy.tier === 'T8' && claim.taxonomy.category === selection.intent.domain) {
      selected.push(claim);
    }
  }

  return selected.sort((left, right) => left.claimId.localeCompare(right.claimId));
}

function evaluationIndex(
  evaluations: readonly RuleEvaluation[],
): ReadonlyMap<string, RuleEvaluation> {
  const index = new Map<string, RuleEvaluation>();
  for (const evaluation of evaluations) {
    if (index.has(evaluation.evaluationId)) {
      throw new ConsumedInputTraceError(
        'DUPLICATE_EVALUATION_ID',
        `Duplicate evaluationId ${evaluation.evaluationId}.`,
      );
    }
    index.set(evaluation.evaluationId, evaluation);
  }
  return index;
}

function ruleIndex(registry: ResolvedRuleRegistrySnapshot): ReadonlyMap<string, RuleDefinition> {
  return new Map(registry.rules.map((rule) => [versionKey({ id: rule.ruleId, version: rule.version }), rule]));
}

function producingEvaluations(
  claims: readonly InterpretationClaim[],
  execution: InterpretationExecutionResult,
): ReadonlyMap<string, RuleEvaluation> {
  const evaluations = evaluationIndex(execution.evaluations);
  const selected = new Map<string, RuleEvaluation>();

  for (const claim of claims) {
    for (const ruleRef of claim.ruleRefs) {
      const evaluation = evaluations.get(ruleRef.evaluationId);
      if (evaluation === undefined) {
        throw new ConsumedInputTraceError(
          'PRODUCING_EVALUATION_MISSING',
          `Claim ${claim.claimId} references missing evaluation ${ruleRef.evaluationId}.`,
        );
      }
      if (evaluation.status !== 'matched') {
        throw new ConsumedInputTraceError(
          'PRODUCING_EVALUATION_NOT_MATCHED',
          `Claim ${claim.claimId} references ${evaluation.evaluationId} with status ${evaluation.status}.`,
        );
      }
      const declaredRuleRef = { id: ruleRef.ruleId, version: ruleRef.version };
      if (!sameRef(evaluation.ruleRef, declaredRuleRef)) {
        throw new ConsumedInputTraceError(
          'PRODUCING_EVALUATION_RULE_MISMATCH',
          `Claim ${claim.claimId} rule reference does not match evaluation ${evaluation.evaluationId}.`,
        );
      }
      if (evaluation.scenarioRef !== claim.scenarioRef) {
        throw new ConsumedInputTraceError(
          'PRODUCING_EVALUATION_SCENARIO_MISMATCH',
          `Claim ${claim.claimId} scenario does not match evaluation ${evaluation.evaluationId}.`,
        );
      }
      if (!evaluation.emittedClaimIds.includes(claim.claimId)) {
        throw new ConsumedInputTraceError(
          'PRODUCING_EVALUATION_EMISSION_MISMATCH',
          `Evaluation ${evaluation.evaluationId} does not declare emitted claim ${claim.claimId}.`,
        );
      }
      selected.set(evaluation.evaluationId, evaluation);
    }
  }

  return selected;
}

function expectedInputRefSource(
  source: RuleInputRequirement['source'],
): RuleEvaluation['inputRefs'][number]['sourceType'] {
  switch (source) {
    case 'canonical_fact':
    case 'derived_fact':
      return 'fact';
    case 'interpretation_claim':
      return 'claim';
    case 'research_evidence':
      return 'research_evidence';
  }
}

function evidenceIdentity(
  inputRef: RuleEvaluation['inputRefs'][number],
): ConsumedResearchEvidenceIdentity | undefined {
  if (inputRef.sourceType !== 'research_evidence') return undefined;
  return {
    ...(inputRef.evidenceType === undefined ? {} : { evidenceType: inputRef.evidenceType }),
    ...(inputRef.evidenceVersion === undefined
      ? {}
      : { evidenceVersion: inputRef.evidenceVersion }),
    ...(inputRef.definitionRef === undefined ? {} : { definitionRef: inputRef.definitionRef }),
    ...(inputRef.definitionContentHash === undefined
      ? {}
      : { definitionContentHash: inputRef.definitionContentHash }),
    ...(inputRef.payloadHash === undefined ? {} : { payloadHash: inputRef.payloadHash }),
  };
}

function validateInputBinding(
  requirement: RuleInputRequirement,
  inputRef: RuleEvaluation['inputRefs'][number],
): void {
  const expectedSource = expectedInputRefSource(requirement.source);
  if (inputRef.sourceType !== expectedSource) {
    throw new ConsumedInputTraceError(
      'INPUT_TRACE_SOURCE_MISMATCH',
      `Input ${requirement.key} expects ${expectedSource} but evaluation recorded ${inputRef.sourceType}.`,
    );
  }

  if (requirement.source === 'research_evidence') {
    if (inputRef.evidenceType !== requirement.pathOrClaimType) {
      throw new ConsumedInputTraceError(
        'INPUT_TRACE_DECLARATION_MISMATCH',
        `Research input ${requirement.key} evidence type does not match its rule declaration.`,
      );
    }
    if (
      requirement.evidenceVersion !== undefined &&
      inputRef.evidenceVersion !== requirement.evidenceVersion
    ) {
      throw new ConsumedInputTraceError(
        'INPUT_TRACE_DECLARATION_MISMATCH',
        `Research input ${requirement.key} evidence version does not match its rule declaration.`,
      );
    }
    if (
      requirement.researchEvidenceDefinitionRef !== undefined &&
      (inputRef.definitionRef === undefined ||
        !sameRef(inputRef.definitionRef, requirement.researchEvidenceDefinitionRef))
    ) {
      throw new ConsumedInputTraceError(
        'INPUT_TRACE_DECLARATION_MISMATCH',
        `Research input ${requirement.key} definition does not match its rule declaration.`,
      );
    }
    return;
  }

  if (inputRef.idOrPath !== requirement.pathOrClaimType) {
    throw new ConsumedInputTraceError(
      'INPUT_TRACE_DECLARATION_MISMATCH',
      `Input ${requirement.key} path/type ${inputRef.idOrPath} does not match ${requirement.pathOrClaimType}.`,
    );
  }
}

function traceEntriesForEvaluation(
  evaluation: RuleEvaluation,
  rules: ReadonlyMap<string, RuleDefinition>,
  domain: string,
): readonly ConsumedInputTraceEntry[] {
  const rule = rules.get(versionKey(evaluation.ruleRef));
  if (rule === undefined) {
    throw new ConsumedInputTraceError(
      'PRODUCING_RULE_MISSING',
      `Evaluation ${evaluation.evaluationId} references missing rule ${versionKey(evaluation.ruleRef)}.`,
    );
  }
  if (rule.taxonomy.tier !== 'T8' || rule.taxonomy.category !== domain) {
    throw new ConsumedInputTraceError(
      'PRODUCING_RULE_DOMAIN_MISMATCH',
      `Producing rule ${versionKey(evaluation.ruleRef)} is not T8 domain ${domain}.`,
    );
  }
  if (rule.inputs.length !== evaluation.inputRefs.length) {
    throw new ConsumedInputTraceError(
      'INPUT_TRACE_CARDINALITY_MISMATCH',
      `Rule ${versionKey(evaluation.ruleRef)} declares ${rule.inputs.length} inputs but evaluation ${evaluation.evaluationId} records ${evaluation.inputRefs.length}.`,
    );
  }

  return rule.inputs.map((requirement, index) => {
    const inputRef = evaluation.inputRefs[index];
    if (inputRef === undefined) {
      throw new ConsumedInputTraceError(
        'INPUT_TRACE_CARDINALITY_MISMATCH',
        `Evaluation ${evaluation.evaluationId} is missing input ${requirement.key}.`,
      );
    }
    validateInputBinding(requirement, inputRef);
    const researchIdentity = evidenceIdentity(inputRef);
    return {
      ruleRef: { id: rule.ruleId, version: rule.version },
      inputKey: requirement.key,
      sourceType: requirement.source,
      idOrPath: requirement.pathOrClaimType,
      observedValue: inputRef.observedValue,
      evaluationStatus: 'matched' as const,
      ...(researchIdentity === undefined ? {} : { evidenceIdentity: researchIdentity }),
    };
  });
}

function visibleInScenario(claim: InterpretationClaim, scenarioRef: string | undefined): boolean {
  if (scenarioRef === undefined) return claim.scenarioRef === undefined;
  return claim.scenarioRef === undefined || claim.scenarioRef === scenarioRef;
}

export function deriveConsumedInputFingerprints(
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  selection: ReadingEvidenceSelection,
): readonly ConsumedInputFingerprint[] {
  const selected = selectedDomainClaims(execution, selection);
  if (selected.length === 0) return [];

  const rules = ruleIndex(registry);
  const results: ConsumedInputFingerprint[] = [];

  for (const scenarioRef of scenarioRefs(selection)) {
    const visibleClaims = selected.filter((claim) => visibleInScenario(claim, scenarioRef));
    if (visibleClaims.length === 0) continue;

    const evaluations = producingEvaluations(visibleClaims, execution);
    const entries = [...evaluations.values()]
      .flatMap((evaluation) => traceEntriesForEvaluation(evaluation, rules, selection.intent.domain))
      .sort((left, right) =>
        deterministicContentHash(left).localeCompare(deterministicContentHash(right)),
      );
    const fingerprint = deterministicContentHash({
      domain: selection.intent.domain,
      entries,
    });

    results.push({
      version: CONSUMED_INPUT_FINGERPRINT_VERSION,
      ...(scenarioRef === undefined ? {} : { scenarioRef }),
      fingerprint: `consumed_input_fingerprint_${fingerprint}`,
      domain: selection.intent.domain,
      entries,
    });
  }

  return results;
}
