import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ClaimNarrativeProfile, NarrativePolicy } from '../contracts/narrative.js';
import type { ReadingArtifact } from '../contracts/reading.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';
import {
  generateGroundedNarrative,
  type NarrativeGenerationResult,
} from '../llm/narrative-orchestrator.js';
import type {
  NarrativeGenerationParams,
  NarrativeModelAdapter,
} from '../llm/model-adapter.js';
import { assembleReadingArtifact } from './reading-assembler.js';
import {
  prepareProductReading,
  type ProductReadingPreparationResult,
  type ProductReadingPreparationState,
} from './product-reading-integration.js';
import type { ConsumerReadingRequestInput } from './consumer-reading-request-adapter.js';

export const GOVERNED_READING_EXECUTION_VERSION =
  'myeonghwa-governed-reading-execution-v1';

export type GovernedReadingExecutionState =
  | Exclude<ProductReadingPreparationState, 'ready_for_narrative'>
  | 'completed'
  | 'completed_with_fallback';

export interface GovernedReadingExecutionOptions {
  outputSchemaVersion: string;
  readingVersion: string;
  displayLabel?: string;
  generationParams?: NarrativeGenerationParams;
  claimNarrativeProfiles?: readonly ClaimNarrativeProfile[];
  narrativeNow?: Date;
  artifactGeneratedAt?: Date;
}

export interface GovernedReadingExecutionResult {
  executionId: string;
  orchestratorVersion: string;
  state: GovernedReadingExecutionState;
  preparation: ProductReadingPreparationResult;
  narrative?: NarrativeGenerationResult;
  artifact?: ReadingArtifact;
  modelCalls: number;
  reasonCodes: readonly string[];
  constraints: {
    mayInvokeModelWhenPreparationBlocked: false;
    mayAssembleArtifactWithoutGroundedNarrative: false;
    mayBypassGroundingValidation: false;
    mayRetryBeyondNarrativeRuntimePolicy: false;
    mayFillMissingEvidenceWithLLM: false;
    mayPromoteResearchAuthority: false;
  };
}

const EXECUTION_CONSTRAINTS = Object.freeze({
  mayInvokeModelWhenPreparationBlocked: false as const,
  mayAssembleArtifactWithoutGroundedNarrative: false as const,
  mayBypassGroundingValidation: false as const,
  mayRetryBeyondNarrativeRuntimePolicy: false as const,
  mayFillMissingEvidenceWithLLM: false as const,
  mayPromoteResearchAuthority: false as const,
});

function assertExecutionOptions(options: GovernedReadingExecutionOptions): void {
  if (options.outputSchemaVersion.trim().length === 0) {
    throw new TypeError('outputSchemaVersion must be a non-empty string.');
  }
  if (options.readingVersion.trim().length === 0) {
    throw new TypeError('readingVersion must be a non-empty string.');
  }
}

function resultIdentity(
  state: GovernedReadingExecutionState,
  preparation: ProductReadingPreparationResult,
  modelCalls: number,
  reasonCodes: readonly string[],
  narrative?: NarrativeGenerationResult,
  artifact?: ReadingArtifact,
): string {
  return `reading_execution_${deterministicContentHash({
    orchestratorVersion: GOVERNED_READING_EXECUTION_VERSION,
    state,
    preparationId: preparation.preparationId,
    narrativeRunId: narrative?.run.narrativeRunId,
    narrativeOutcome: narrative?.outcome,
    readingId: artifact?.readingId,
    modelCalls,
    reasonCodes: [...reasonCodes].sort(),
    constraints: EXECUTION_CONSTRAINTS,
  }).slice(0, 24)}`;
}

function blockedResult(
  preparation: ProductReadingPreparationResult,
): GovernedReadingExecutionResult {
  if (preparation.state === 'ready_for_narrative') {
    throw new Error('blockedResult cannot accept a ready_for_narrative preparation.');
  }
  const state = preparation.state;
  const reasonCodes = [...preparation.reasonCodes].sort();
  return {
    executionId: resultIdentity(state, preparation, 0, reasonCodes),
    orchestratorVersion: GOVERNED_READING_EXECUTION_VERSION,
    state,
    preparation,
    modelCalls: 0,
    reasonCodes,
    constraints: EXECUTION_CONSTRAINTS,
  };
}

export async function executeProductReading(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  input: ConsumerReadingRequestInput,
  adapter: NarrativeModelAdapter,
  narrativePolicy: NarrativePolicy,
  options: GovernedReadingExecutionOptions,
): Promise<GovernedReadingExecutionResult> {
  assertExecutionOptions(options);

  const preparation = prepareProductReading(
    snapshot,
    interpretation,
    registry,
    input,
    {
      narrativePolicyRef: {
        id: narrativePolicy.policyId,
        version: narrativePolicy.version,
      },
      outputSchemaVersion: options.outputSchemaVersion,
    },
  );

  if (
    preparation.state !== 'ready_for_narrative' ||
    preparation.narrativeRequest === undefined ||
    preparation.deliveryEligibility.narrativeGeneration !== 'allowed'
  ) {
    return blockedResult(preparation);
  }

  const narrative = await generateGroundedNarrative(
    adapter,
    preparation.narrativeRequest,
    narrativePolicy,
    {
      ...(options.generationParams === undefined
        ? {}
        : { generationParams: options.generationParams }),
      ...(options.claimNarrativeProfiles === undefined
        ? {}
        : { claimNarrativeProfiles: options.claimNarrativeProfiles }),
      ...(options.narrativeNow === undefined ? {} : { now: options.narrativeNow }),
    },
  );

  const artifact = assembleReadingArtifact(snapshot, interpretation, narrative, {
    readingVersion: options.readingVersion,
    ...(options.displayLabel === undefined ? {} : { displayLabel: options.displayLabel }),
    ...(options.artifactGeneratedAt === undefined
      ? {}
      : { generatedAt: options.artifactGeneratedAt }),
  });
  const state: GovernedReadingExecutionState =
    narrative.outcome === 'deterministic_fallback' ? 'completed_with_fallback' : 'completed';
  const reasonCodes =
    narrative.outcome === 'deterministic_fallback'
      ? ['NARRATIVE_RUNTIME_USED_DETERMINISTIC_FALLBACK']
      : [];

  return {
    executionId: resultIdentity(
      state,
      preparation,
      narrative.modelCalls,
      reasonCodes,
      narrative,
      artifact,
    ),
    orchestratorVersion: GOVERNED_READING_EXECUTION_VERSION,
    state,
    preparation,
    narrative,
    artifact,
    modelCalls: narrative.modelCalls,
    reasonCodes,
    constraints: EXECUTION_CONSTRAINTS,
  };
}
