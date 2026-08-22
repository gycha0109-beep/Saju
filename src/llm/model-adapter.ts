import type {
  GroundedNarrativeRequest,
  NarrativeEvidenceBundle,
  NarrativePolicy,
} from '../contracts/narrative.js';

export interface NarrativeModelMetadata {
  provider: string;
  modelId: string;
  modelRevision?: string;
}

export interface NarrativeGenerationParams {
  temperature?: number;
  maxOutputTokens?: number;
}

export interface NarrativeRepairContext {
  previousOutput: unknown;
  violations: readonly string[];
}

export interface CompiledNarrativePrompt {
  promptCompilerVersion: string;
  mode: 'generate' | 'repair';
  requestId: string;
  purpose: GroundedNarrativeRequest['purpose'];
  outputSchemaVersion: string;
  narrativePolicy: NarrativePolicy;
  instructions: readonly string[];
  evidence: NarrativeEvidenceBundle;
  userRequest?: GroundedNarrativeRequest['userRequest'];
  repair?: NarrativeRepairContext;
}

export interface NarrativeModelAdapter {
  readonly metadata: NarrativeModelMetadata;

  generateStructured(
    prompt: CompiledNarrativePrompt,
    params?: NarrativeGenerationParams,
  ): Promise<unknown>;
}
