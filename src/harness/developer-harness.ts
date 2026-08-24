import type {
  BirthInput,
  CalculationPolicySnapshot,
  GroundedNarrativeRequest,
  NarrativePolicy,
  NarrativePurpose,
  ReadingArtifact,
} from '../contracts/index.js';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationEngineOptions,
} from '../calculation/calculation-engine.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
} from '../interpretation/interpretation-engine.js';
import type { ResolvedRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  buildNarrativeEvidenceBundle,
  type BuiltNarrativeEvidenceBundle,
} from '../narrative/evidence-selector.js';
import type {
  NarrativeGenerationParams,
  NarrativeModelAdapter,
} from '../llm/model-adapter.js';
import {
  generateGroundedNarrative,
  type NarrativeGenerationResult,
} from '../llm/narrative-orchestrator.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../llm/prompt-compiler.js';
import { assembleReadingArtifact } from '../reading/reading-assembler.js';

export interface DeveloperHarnessRequest {
  requestId: string;
  birthInput: BirthInput;
  calculationPolicy: CalculationPolicySnapshot;
  registry: ResolvedRuleRegistrySnapshot;
  narrativePolicy: NarrativePolicy;
  narrativeModelAdapter: NarrativeModelAdapter;
  readingVersion: string;
  purpose?: NarrativePurpose;
  targetClaimIds?: readonly string[];
  includeSourceSummaries?: boolean;
  userRequest?: GroundedNarrativeRequest['userRequest'];
  displayLabel?: string;
  generationParams?: NarrativeGenerationParams;
  calculationOptions?: Omit<CalculationEngineOptions, 'now'>;
  now?: Date;
}

export interface DeveloperHarnessResult {
  snapshot: ReturnType<typeof calculateCanonicalSajuSnapshot>;
  interpretation: InterpretationExecutionResult;
  evidence: BuiltNarrativeEvidenceBundle;
  narrative: NarrativeGenerationResult;
  reading: ReadingArtifact;
}

function assertRequestId(requestId: string): void {
  if (requestId.trim().length === 0) {
    throw new TypeError('DeveloperHarness requestId must be a non-empty string.');
  }
}

export async function runDeveloperHarness(
  request: DeveloperHarnessRequest,
): Promise<DeveloperHarnessResult> {
  assertRequestId(request.requestId);
  const now = request.now ?? new Date();
  const purpose = request.purpose ?? 'full_reading';

  const snapshot = calculateCanonicalSajuSnapshot(
    request.birthInput,
    request.calculationPolicy,
    {
      ...(request.calculationOptions ?? {}),
      now,
    },
  );

  const interpretation = runInterpretation(snapshot, request.registry, {
    requestId: request.requestId,
    now,
  });

  const evidence = buildNarrativeEvidenceBundle(
    snapshot,
    interpretation,
    request.registry,
    {
      requestId: request.requestId,
      purpose,
      narrativePolicyVersion: request.narrativePolicy.version,
      ...(request.targetClaimIds === undefined
        ? {}
        : { targetClaimIds: request.targetClaimIds }),
      ...(request.includeSourceSummaries === undefined
        ? {}
        : { includeSourceSummaries: request.includeSourceSummaries }),
    },
  );

  const narrativeRequest: GroundedNarrativeRequest = {
    requestId: request.requestId,
    purpose,
    evidenceBundle: evidence.bundle,
    ...(request.userRequest === undefined ? {} : { userRequest: request.userRequest }),
    narrativePolicyRef: {
      id: request.narrativePolicy.policyId,
      version: request.narrativePolicy.version,
    },
    outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  };

  const narrative = await generateGroundedNarrative(
    request.narrativeModelAdapter,
    narrativeRequest,
    request.narrativePolicy,
    {
      ...(request.generationParams === undefined
        ? {}
        : { generationParams: request.generationParams }),
      now,
    },
  );

  const reading = assembleReadingArtifact(snapshot, interpretation, narrative, {
    readingVersion: request.readingVersion,
    generatedAt: now,
    ...(request.displayLabel === undefined ? {} : { displayLabel: request.displayLabel }),
  });

  return {
    snapshot,
    interpretation,
    evidence,
    narrative,
    reading,
  };
}
