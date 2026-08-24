import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ContentAddressedVersionedRef, VersionedRef } from '../contracts/common.js';
import type { GroundedNarrativeRequest } from '../contracts/narrative.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';
import {
  normalizeConsumerReadingRequest,
  type ConsumerReadingNormalizationResult,
  type ConsumerReadingRequestInput,
} from './consumer-reading-request-adapter.js';
import {
  buildReadingCompositionEvidence,
} from './scenario-aware-reading-composition.js';
import type { GovernedReadingCompositionEvidenceResult } from './reading-profile-authorization.js';

export const PRODUCT_READING_INTEGRATION_VERSION =
  'myeonghwa-product-reading-integration-v1';

export type ProductReadingPreparationState =
  | 'ready_for_narrative'
  | 'input_ambiguous'
  | 'input_unsupported'
  | 'input_invalid'
  | 'partial_coverage'
  | 'insufficient_evidence'
  | 'unsupported_intent'
  | 'invariant_blocked';

export interface ProductReadingIntegrationOptions {
  narrativePolicyRef: VersionedRef;
  outputSchemaVersion: string;
}

export interface ProductReadingDeliveryEligibility {
  narrativeGeneration:
    | 'allowed'
    | 'blocked_input'
    | 'blocked_coverage'
    | 'blocked_invariant';
  artifactAssembly:
    | 'allowed_after_grounded_narrative'
    | 'blocked_input'
    | 'blocked_coverage'
    | 'blocked_invariant';
  mustSurfaceNormalizationState: boolean;
  mustSurfaceCoverageState: boolean;
  constraints: {
    mayFillMissingEvidenceWithLLM: false;
    mayFallbackUnsupportedIntentToGeneral: false;
    mayCollapseAmbiguity: false;
    mayGenerateInterpretationClaims: false;
    mayResolveMethodologyConflicts: false;
    mayPromoteResearchAuthority: false;
  };
}

export interface ProductReadingPreparationResult {
  preparationId: string;
  integrationVersion: string;
  state: ProductReadingPreparationState;
  normalization: ConsumerReadingNormalizationResult;
  composition?: GovernedReadingCompositionEvidenceResult;
  narrativeRequest?: GroundedNarrativeRequest;
  narrativeRequestRef?: ContentAddressedVersionedRef;
  reasonCodes: readonly string[];
  deliveryEligibility: ProductReadingDeliveryEligibility;
}

const DELIVERY_CONSTRAINTS = Object.freeze({
  mayFillMissingEvidenceWithLLM: false as const,
  mayFallbackUnsupportedIntentToGeneral: false as const,
  mayCollapseAmbiguity: false as const,
  mayGenerateInterpretationClaims: false as const,
  mayResolveMethodologyConflicts: false as const,
  mayPromoteResearchAuthority: false as const,
});

function assertIntegrationOptions(options: ProductReadingIntegrationOptions): void {
  if (options.narrativePolicyRef.id.trim().length === 0) {
    throw new TypeError('narrativePolicyRef.id must be a non-empty string.');
  }
  if (options.narrativePolicyRef.version.trim().length === 0) {
    throw new TypeError('narrativePolicyRef.version must be a non-empty string.');
  }
  if (options.outputSchemaVersion.trim().length === 0) {
    throw new TypeError('outputSchemaVersion must be a non-empty string.');
  }
}

function inputBlockedEligibility(): ProductReadingDeliveryEligibility {
  return {
    narrativeGeneration: 'blocked_input',
    artifactAssembly: 'blocked_input',
    mustSurfaceNormalizationState: true,
    mustSurfaceCoverageState: false,
    constraints: DELIVERY_CONSTRAINTS,
  };
}

function coverageBlockedEligibility(): ProductReadingDeliveryEligibility {
  return {
    narrativeGeneration: 'blocked_coverage',
    artifactAssembly: 'blocked_coverage',
    mustSurfaceNormalizationState: false,
    mustSurfaceCoverageState: true,
    constraints: DELIVERY_CONSTRAINTS,
  };
}

function invariantBlockedEligibility(): ProductReadingDeliveryEligibility {
  return {
    narrativeGeneration: 'blocked_invariant',
    artifactAssembly: 'blocked_invariant',
    mustSurfaceNormalizationState: true,
    mustSurfaceCoverageState: true,
    constraints: DELIVERY_CONSTRAINTS,
  };
}

function readyEligibility(): ProductReadingDeliveryEligibility {
  return {
    narrativeGeneration: 'allowed',
    artifactAssembly: 'allowed_after_grounded_narrative',
    mustSurfaceNormalizationState: false,
    mustSurfaceCoverageState: false,
    constraints: DELIVERY_CONSTRAINTS,
  };
}

function buildResult(
  state: ProductReadingPreparationState,
  normalization: ConsumerReadingNormalizationResult,
  reasonCodes: readonly string[],
  deliveryEligibility: ProductReadingDeliveryEligibility,
  composition?: GovernedReadingCompositionEvidenceResult,
  narrativeRequest?: GroundedNarrativeRequest,
): ProductReadingPreparationResult {
  const narrativeRequestRef =
    narrativeRequest === undefined
      ? undefined
      : {
          id: `grounded_narrative_request_${deterministicContentHash(narrativeRequest).slice(0, 24)}`,
          version: PRODUCT_READING_INTEGRATION_VERSION,
          contentHash: deterministicContentHash(narrativeRequest),
        };
  const identityMaterial = {
    integrationVersion: PRODUCT_READING_INTEGRATION_VERSION,
    state,
    normalizationId: normalization.normalizationId,
    selectionId: composition?.selection.selectionId,
    narrativeRequestRef,
    reasonCodes: [...reasonCodes].sort(),
    deliveryEligibility,
  };
  return {
    preparationId: `product_reading_${deterministicContentHash(identityMaterial).slice(0, 24)}`,
    integrationVersion: PRODUCT_READING_INTEGRATION_VERSION,
    state,
    normalization,
    ...(composition === undefined ? {} : { composition }),
    ...(narrativeRequest === undefined ? {} : { narrativeRequest }),
    ...(narrativeRequestRef === undefined ? {} : { narrativeRequestRef }),
    reasonCodes: [...reasonCodes].sort(),
    deliveryEligibility,
  };
}

function blockedFromNormalization(
  normalization: ConsumerReadingNormalizationResult,
): ProductReadingPreparationResult {
  const state: ProductReadingPreparationState =
    normalization.state === 'ambiguous'
      ? 'input_ambiguous'
      : normalization.state === 'invalid'
        ? 'input_invalid'
        : 'input_unsupported';
  return buildResult(
    state,
    normalization,
    normalization.reasonCodes,
    inputBlockedEligibility(),
  );
}

function buildNarrativeRequest(
  normalization: ConsumerReadingNormalizationResult,
  composition: GovernedReadingCompositionEvidenceResult,
  options: ProductReadingIntegrationOptions,
): GroundedNarrativeRequest | undefined {
  if (normalization.request === undefined || composition.evidence === undefined) return undefined;
  const intent = normalization.request.intent;
  const requestedSection =
    intent.relationshipScope === undefined
      ? `${intent.domain}:${intent.temporalScope}`
      : `${intent.domain}:${intent.temporalScope}:${intent.relationshipScope}`;
  return {
    requestId: normalization.request.requestId,
    purpose: composition.evidence.bundle.purpose,
    evidenceBundle: composition.evidence.bundle,
    userRequest: {
      ...(intent.domain === 'question_specific' ? {} : { requestedSection }),
      ...(normalization.request.question === undefined
        ? {}
        : { question: normalization.request.question }),
      ...(normalization.request.outputPreferences?.preferredDetail === undefined
        ? {}
        : { preferredDetail: normalization.request.outputPreferences.preferredDetail }),
    },
    narrativePolicyRef: options.narrativePolicyRef,
    outputSchemaVersion: options.outputSchemaVersion,
  };
}

export function prepareProductReading(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  input: ConsumerReadingRequestInput,
  options: ProductReadingIntegrationOptions,
): ProductReadingPreparationResult {
  assertIntegrationOptions(options);
  const normalization = normalizeConsumerReadingRequest(input);
  if (normalization.state !== 'resolved' || normalization.request === undefined) {
    return blockedFromNormalization(normalization);
  }

  const composition = buildReadingCompositionEvidence(
    snapshot,
    execution,
    registry,
    normalization.request,
    { narrativePolicyVersion: options.narrativePolicyRef.version },
  );

  switch (composition.selection.coverageState) {
    case 'unsupported_intent':
      return buildResult(
        'unsupported_intent',
        normalization,
        composition.selection.missingRequirements,
        coverageBlockedEligibility(),
        composition,
      );
    case 'insufficient_evidence':
      return buildResult(
        'insufficient_evidence',
        normalization,
        composition.selection.missingRequirements,
        coverageBlockedEligibility(),
        composition,
      );
    case 'partial_coverage':
      return buildResult(
        'partial_coverage',
        normalization,
        composition.selection.missingRequirements,
        coverageBlockedEligibility(),
        composition,
      );
    case 'complete': {
      const narrativeRequest = buildNarrativeRequest(normalization, composition, options);
      if (narrativeRequest === undefined) {
        return buildResult(
          'invariant_blocked',
          normalization,
          ['COMPLETE_SELECTION_REQUIRES_EVIDENCE_BUNDLE'],
          invariantBlockedEligibility(),
          composition,
        );
      }
      return buildResult(
        'ready_for_narrative',
        normalization,
        [],
        readyEligibility(),
        composition,
        narrativeRequest,
      );
    }
  }
}
