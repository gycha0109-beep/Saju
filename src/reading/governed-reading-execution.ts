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
import {
  resolvePreviewConsumerReadingAuthorityV1,
  type PreviewConsumerReadingAuthorityResolutionV1,
} from '../preview/preview-official-reading-consumer-authority.js';
import { buildPreviewSemanticQualifierBindingsV1 } from '../preview/preview-semantic-qualifier-projection.js';
import { buildPreviewSemanticTextBindingsV1 } from '../preview/preview-semantic-text-projection.js';
import { assembleReadingArtifact } from './reading-assembler.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
} from './canonical-reading-semantics.js';
import { assembleOfficialReadingArtifactV1 } from './official-reading-artifact.js';
import {
  buildOfficialReadingPlanV1,
  type OfficialReadingPlanV1,
} from './official-reading-plan.js';
import {
  canRenderOfficialReadingV1,
  renderOfficialReadingV1,
  type OfficialReadingRenderedContentV1,
} from './official-reading-renderer.js';
import {
  prepareProductReading,
  type ProductReadingPreparationResult,
  type ProductReadingPreparationState,
} from './product-reading-integration.js';
import type { ConsumerReadingRequestInput } from './consumer-reading-request-adapter.js';

export const GOVERNED_READING_EXECUTION_VERSION =
  'myeonghwa-governed-reading-execution-v3';

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
  canonicalSemantics?: CanonicalReadingSemanticBundleV1;
  officialReadingPlan?: OfficialReadingPlanV1;
  officialReadingReport?: OfficialReadingRenderedContentV1;
  consumerReadingAuthority?: PreviewConsumerReadingAuthorityResolutionV1;
  artifact?: ReadingArtifact;
  modelCalls: number;
  reasonCodes: readonly string[];
  constraints: {
    mayInvokeModelWhenPreparationBlocked: false;
    mayAssembleLegacyNarrativeArtifactWithoutGroundedNarrative: false;
    mayInvokeNarrativeForOfficialReadingAuthority: false;
    mayBypassGroundingValidation: false;
    mayRetryBeyondNarrativeRuntimePolicy: false;
    mayFillMissingEvidenceWithLLM: false;
    mayAssembleOfficialPlanWithoutCanonicalSemantics: false;
    mayPromoteResearchAuthority: false;
    mayUseNarrativeAsOfficialReadingAuthority: false;
    mayFallbackOfficialReadingToLegacyNarrative: false;
    mayOverrideResolvedConsumerReadingAuthority: false;
  };
}

const EXECUTION_CONSTRAINTS = Object.freeze({
  mayInvokeModelWhenPreparationBlocked: false as const,
  mayAssembleLegacyNarrativeArtifactWithoutGroundedNarrative: false as const,
  mayInvokeNarrativeForOfficialReadingAuthority: false as const,
  mayBypassGroundingValidation: false as const,
  mayRetryBeyondNarrativeRuntimePolicy: false as const,
  mayFillMissingEvidenceWithLLM: false as const,
  mayAssembleOfficialPlanWithoutCanonicalSemantics: false as const,
  mayPromoteResearchAuthority: false as const,
  mayUseNarrativeAsOfficialReadingAuthority: false as const,
  mayFallbackOfficialReadingToLegacyNarrative: false as const,
  mayOverrideResolvedConsumerReadingAuthority: false as const,
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
  consumerReadingAuthority?: PreviewConsumerReadingAuthorityResolutionV1,
  narrative?: NarrativeGenerationResult,
  canonicalSemantics?: CanonicalReadingSemanticBundleV1,
  officialReadingPlan?: OfficialReadingPlanV1,
  officialReadingReport?: OfficialReadingRenderedContentV1,
  artifact?: ReadingArtifact,
): string {
  return `reading_execution_${deterministicContentHash({
    orchestratorVersion: GOVERNED_READING_EXECUTION_VERSION,
    state,
    preparationId: preparation.preparationId,
    consumerReadingAuthority:
      consumerReadingAuthority === undefined
        ? undefined
        : {
            authorityVersion: consumerReadingAuthority.authorityVersion,
            readingSection: consumerReadingAuthority.readingSection,
            authority: consumerReadingAuthority.authority,
          },
    narrativeRunId: narrative?.run.narrativeRunId,
    narrativeOutcome: narrative?.outcome,
    canonicalSemanticHash: canonicalSemantics?.semanticHash,
    officialReadingPlanHash: officialReadingPlan?.planHash,
    officialReadingReportHash: officialReadingReport?.reportHash,
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

function officialAuthorityBlockedResult(
  preparation: ProductReadingPreparationResult,
  consumerReadingAuthority: PreviewConsumerReadingAuthorityResolutionV1,
  reasonCodes: readonly string[],
  canonicalSemantics: CanonicalReadingSemanticBundleV1,
  officialReadingPlan: OfficialReadingPlanV1,
  officialReadingReport?: OfficialReadingRenderedContentV1,
): GovernedReadingExecutionResult {
  const state: GovernedReadingExecutionState = 'invariant_blocked';
  const sortedReasonCodes = [...new Set(reasonCodes)].sort();
  return {
    executionId: resultIdentity(
      state,
      preparation,
      0,
      sortedReasonCodes,
      consumerReadingAuthority,
      undefined,
      canonicalSemantics,
      officialReadingPlan,
      officialReadingReport,
    ),
    orchestratorVersion: GOVERNED_READING_EXECUTION_VERSION,
    state,
    preparation,
    canonicalSemantics,
    officialReadingPlan,
    ...(officialReadingReport === undefined ? {} : { officialReadingReport }),
    consumerReadingAuthority,
    modelCalls: 0,
    reasonCodes: sortedReasonCodes,
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

  if (
    preparation.normalization.request === undefined ||
    preparation.composition === undefined ||
    preparation.composition.evidence === undefined
  ) {
    throw new Error(
      'ready_for_narrative preparation requires resolved request and composition evidence.',
    );
  }

  const governedEvidence = preparation.composition.evidence.bundle;
  const consumerReadingAuthority = resolvePreviewConsumerReadingAuthorityV1(
    preparation.normalization.request.intent,
  );
  const semanticTextBindings = buildPreviewSemanticTextBindingsV1({
    intent: preparation.normalization.request.intent,
    registry,
    evidence: governedEvidence,
    targetClaimIds: preparation.composition.selection.targetClaimIds,
  });
  const semanticQualifierBindings = buildPreviewSemanticQualifierBindingsV1({
    intent: preparation.normalization.request.intent,
    registry,
    evidence: governedEvidence,
    targetClaimIds: preparation.composition.selection.targetClaimIds,
  });
  const canonicalSemantics = buildCanonicalReadingSemanticBundleV1({
    intent: preparation.normalization.request.intent,
    evidence: governedEvidence,
    targetClaimIds: preparation.composition.selection.targetClaimIds,
    semanticTextBindings,
    semanticQualifierBindings,
  });
  const officialReadingPlan = buildOfficialReadingPlanV1(canonicalSemantics);
  const officialReadingReport = canRenderOfficialReadingV1(
    canonicalSemantics,
    officialReadingPlan,
  )
    ? renderOfficialReadingV1(canonicalSemantics, officialReadingPlan)
    : undefined;

  if (consumerReadingAuthority.authority === 'official_reading') {
    if (officialReadingReport === undefined) {
      return officialAuthorityBlockedResult(
        preparation,
        consumerReadingAuthority,
        ['OFFICIAL_READING_REPORT_REQUIRED_FOR_CONSUMER_AUTHORITY'],
        canonicalSemantics,
        officialReadingPlan,
      );
    }

    let artifact: ReadingArtifact;
    try {
      artifact = assembleOfficialReadingArtifactV1(
        snapshot,
        interpretation,
        canonicalSemantics,
        officialReadingPlan,
        officialReadingReport,
        {
          readingVersion: options.readingVersion,
          ...(options.displayLabel === undefined
            ? {}
            : { displayLabel: options.displayLabel }),
          ...(options.artifactGeneratedAt === undefined
            ? {}
            : { generatedAt: options.artifactGeneratedAt }),
        },
      );
    } catch {
      return officialAuthorityBlockedResult(
        preparation,
        consumerReadingAuthority,
        ['OFFICIAL_READING_ARTIFACT_MATERIALIZATION_BLOCKED'],
        canonicalSemantics,
        officialReadingPlan,
        officialReadingReport,
      );
    }

    const state: GovernedReadingExecutionState = 'completed';
    const reasonCodes: readonly string[] = [];
    return {
      executionId: resultIdentity(
        state,
        preparation,
        0,
        reasonCodes,
        consumerReadingAuthority,
        undefined,
        canonicalSemantics,
        officialReadingPlan,
        officialReadingReport,
        artifact,
      ),
      orchestratorVersion: GOVERNED_READING_EXECUTION_VERSION,
      state,
      preparation,
      canonicalSemantics,
      officialReadingPlan,
      officialReadingReport,
      consumerReadingAuthority,
      artifact,
      modelCalls: 0,
      reasonCodes,
      constraints: EXECUTION_CONSTRAINTS,
    };
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

  const reasonCodes =
    narrative.outcome === 'deterministic_fallback'
      ? ['NARRATIVE_RUNTIME_USED_DETERMINISTIC_FALLBACK']
      : [];

  const artifact = assembleReadingArtifact(snapshot, interpretation, narrative, {
    readingVersion: options.readingVersion,
    ...(options.displayLabel === undefined ? {} : { displayLabel: options.displayLabel }),
    ...(options.artifactGeneratedAt === undefined
      ? {}
      : { generatedAt: options.artifactGeneratedAt }),
  });
  const state: GovernedReadingExecutionState =
    narrative.outcome === 'deterministic_fallback'
      ? 'completed_with_fallback'
      : 'completed';

  return {
    executionId: resultIdentity(
      state,
      preparation,
      narrative.modelCalls,
      reasonCodes,
      consumerReadingAuthority,
      narrative,
      canonicalSemantics,
      officialReadingPlan,
      officialReadingReport,
      artifact,
    ),
    orchestratorVersion: GOVERNED_READING_EXECUTION_VERSION,
    state,
    preparation,
    narrative,
    canonicalSemantics,
    officialReadingPlan,
    ...(officialReadingReport === undefined ? {} : { officialReadingReport }),
    consumerReadingAuthority,
    artifact,
    modelCalls: narrative.modelCalls,
    reasonCodes,
    constraints: EXECUTION_CONSTRAINTS,
  };
}
