import type {
  GroundedNarrativeRequest,
  NarrativeDraft,
  NarrativePolicy,
  NarrativeRun,
} from '../contracts/narrative.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildValidatedDeterministicFallback } from '../narrative/deterministic-fallback.js';
import { validateNarrativeDraftGrounding } from '../narrative/grounding-validator.js';
import type {
  NarrativeGenerationParams,
  NarrativeModelAdapter,
  NarrativeRepairContext,
} from './model-adapter.js';
import { parseNarrativeDraft } from './narrative-draft-parser.js';
import {
  NARRATIVE_PROMPT_COMPILER_VERSION,
  compileNarrativePrompt,
} from './prompt-compiler.js';

export interface NarrativeOrchestratorOptions {
  generationParams?: NarrativeGenerationParams;
  now?: Date;
}

export interface NarrativeGenerationResult {
  draft: NarrativeDraft;
  run: NarrativeRun;
  outcome: 'model_first_pass' | 'model_repaired' | 'deterministic_fallback';
  modelCalls: number;
}

interface ModelAttemptResult {
  rawOutput?: unknown;
  draft?: NarrativeDraft;
  violations: readonly string[];
  providerError: boolean;
}

function parseViolationStrings(value: unknown): ModelAttemptResult {
  const parsed = parseNarrativeDraft(value);
  if (!parsed.success) {
    return {
      rawOutput: value,
      violations: parsed.violations.map(
        (violation) => `PARSE:${violation.path}:${violation.message}`,
      ),
      providerError: false,
    };
  }
  return {
    rawOutput: value,
    draft: parsed.draft,
    violations: [],
    providerError: false,
  };
}

function validateAttempt(
  rawOutput: unknown,
  request: GroundedNarrativeRequest,
): ModelAttemptResult {
  const parsed = parseViolationStrings(rawOutput);
  if (parsed.draft === undefined) return parsed;

  const violations: string[] = [];
  if (parsed.draft.schemaVersion !== request.outputSchemaVersion) {
    violations.push(
      `SCHEMA_VERSION_MISMATCH:${parsed.draft.schemaVersion}:${request.outputSchemaVersion}`,
    );
  }

  const grounding = validateNarrativeDraftGrounding(
    parsed.draft,
    request.evidenceBundle,
  );
  violations.push(
    ...grounding.violations.map(
      (violation) => `GROUNDING:${violation.code}:${violation.message}`,
    ),
  );

  return {
    rawOutput,
    draft: parsed.draft,
    violations,
    providerError: false,
  };
}

async function generateAttempt(
  adapter: NarrativeModelAdapter,
  request: GroundedNarrativeRequest,
  policy: NarrativePolicy,
  params: NarrativeGenerationParams | undefined,
  repair?: NarrativeRepairContext,
): Promise<ModelAttemptResult> {
  const prompt = compileNarrativePrompt(request, policy, repair);
  try {
    const output = await adapter.generateStructured(prompt, params);
    return validateAttempt(output, request);
  } catch (error) {
    return {
      violations: [
        `PROVIDER_ERROR:${error instanceof Error ? error.name : 'UnknownError'}:${
          error instanceof Error ? error.message : 'Unknown provider failure'
        }`,
      ],
      providerError: true,
    };
  }
}

function stableGenerationParams(
  params: NarrativeGenerationParams | undefined,
): NarrativeRun['generationParams'] {
  return {
    ...(params?.temperature === undefined ? {} : { temperature: params.temperature }),
    ...(params?.maxOutputTokens === undefined
      ? {}
      : { maxOutputTokens: params.maxOutputTokens }),
  };
}

function buildRun(
  adapter: NarrativeModelAdapter,
  request: GroundedNarrativeRequest,
  policy: NarrativePolicy,
  params: NarrativeGenerationParams | undefined,
  draft: NarrativeDraft,
  firstPass: 'passed' | 'failed',
  repairAttempted: boolean,
  final: 'passed' | 'fallback',
  violations: readonly string[],
  now: Date,
): NarrativeRun {
  const evidenceBundleHash = deterministicContentHash(request.evidenceBundle);
  const validation = {
    firstPass,
    repairAttempted,
    final,
    violations: [...violations],
  } as const;
  const identityMaterial = {
    requestId: request.requestId,
    interpretationRunId: request.evidenceBundle.interpretationRunId,
    evidenceBundleHash,
    provider: adapter.metadata.provider,
    modelId: adapter.metadata.modelId,
    modelRevision: adapter.metadata.modelRevision,
    promptCompilerVersion: NARRATIVE_PROMPT_COMPILER_VERSION,
    narrativePolicyRef: request.narrativePolicyRef,
    outputSchemaVersion: request.outputSchemaVersion,
    generationParams: stableGenerationParams(params),
    finalDraft: draft,
    validation,
  };
  const runHash = deterministicContentHash(identityMaterial);

  return {
    narrativeRunId: `narrative_${runHash.slice(0, 24)}`,
    requestId: request.requestId,
    interpretationRunId: request.evidenceBundle.interpretationRunId,
    evidenceBundleHash,
    modelProvider: adapter.metadata.provider,
    modelId: adapter.metadata.modelId,
    ...(adapter.metadata.modelRevision === undefined
      ? {}
      : { modelRevision: adapter.metadata.modelRevision }),
    promptCompilerVersion: NARRATIVE_PROMPT_COMPILER_VERSION,
    narrativePolicyRef: { id: policy.policyId, version: policy.version },
    outputSchemaVersion: request.outputSchemaVersion,
    generationParams: stableGenerationParams(params),
    validation,
    createdAt: now.toISOString(),
  };
}

export async function generateGroundedNarrative(
  adapter: NarrativeModelAdapter,
  request: GroundedNarrativeRequest,
  policy: NarrativePolicy,
  options: NarrativeOrchestratorOptions = {},
): Promise<NarrativeGenerationResult> {
  const now = options.now ?? new Date();
  const first = await generateAttempt(
    adapter,
    request,
    policy,
    options.generationParams,
  );

  if (first.draft !== undefined && first.violations.length === 0) {
    return {
      draft: first.draft,
      run: buildRun(
        adapter,
        request,
        policy,
        options.generationParams,
        first.draft,
        'passed',
        false,
        'passed',
        [],
        now,
      ),
      outcome: 'model_first_pass',
      modelCalls: 1,
    };
  }

  const violations: string[] = [...first.violations];
  if (!first.providerError) {
    const repairContext: NarrativeRepairContext = {
      previousOutput: first.rawOutput,
      violations: first.violations,
    };
    const repaired = await generateAttempt(
      adapter,
      request,
      policy,
      options.generationParams,
      repairContext,
    );
    violations.push(...repaired.violations.map((value) => `REPAIR:${value}`));

    if (repaired.draft !== undefined && repaired.violations.length === 0) {
      return {
        draft: repaired.draft,
        run: buildRun(
          adapter,
          request,
          policy,
          options.generationParams,
          repaired.draft,
          'failed',
          true,
          'passed',
          violations,
          now,
        ),
        outcome: 'model_repaired',
        modelCalls: 2,
      };
    }

    const fallback = buildValidatedDeterministicFallback(request.evidenceBundle);
    return {
      draft: fallback.draft,
      run: buildRun(
        adapter,
        request,
        policy,
        options.generationParams,
        fallback.draft,
        'failed',
        true,
        'fallback',
        violations,
        now,
      ),
      outcome: 'deterministic_fallback',
      modelCalls: 2,
    };
  }

  const fallback = buildValidatedDeterministicFallback(request.evidenceBundle);
  return {
    draft: fallback.draft,
    run: buildRun(
      adapter,
      request,
      policy,
      options.generationParams,
      fallback.draft,
      'failed',
      false,
      'fallback',
      violations,
      now,
    ),
    outcome: 'deterministic_fallback',
    modelCalls: 1,
  };
}
