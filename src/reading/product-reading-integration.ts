import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
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
  | 'ready_for_execution'
  | 'input_ambiguous'
  | 'input_unsupported'
  | 'input_invalid'
  | 'partial_coverage'
  | 'insufficient_evidence'
  | 'unsupported_intent'
  | 'invariant_blocked';

export interface ProductReadingExecutionEligibility {
  readingExecution:
    | 'allowed'
    | 'blocked_input'
    | 'blocked_coverage'
    | 'blocked_invariant';
  artifactAssembly:
    | 'allowed_after_authority_execution'
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
  reasonCodes: readonly string[];
  executionEligibility: ProductReadingExecutionEligibility;
}

const DELIVERY_CONSTRAINTS = Object.freeze({
  mayFillMissingEvidenceWithLLM: false as const,
  mayFallbackUnsupportedIntentToGeneral: false as const,
  mayCollapseAmbiguity: false as const,
  mayGenerateInterpretationClaims: false as const,
  mayResolveMethodologyConflicts: false as const,
  mayPromoteResearchAuthority: false as const,
});

function inputBlockedEligibility(): ProductReadingExecutionEligibility {
  return {
    readingExecution: 'blocked_input',
    artifactAssembly: 'blocked_input',
    mustSurfaceNormalizationState: true,
    mustSurfaceCoverageState: false,
    constraints: DELIVERY_CONSTRAINTS,
  };
}

function coverageBlockedEligibility(): ProductReadingExecutionEligibility {
  return {
    readingExecution: 'blocked_coverage',
    artifactAssembly: 'blocked_coverage',
    mustSurfaceNormalizationState: false,
    mustSurfaceCoverageState: true,
    constraints: DELIVERY_CONSTRAINTS,
  };
}

function invariantBlockedEligibility(): ProductReadingExecutionEligibility {
  return {
    readingExecution: 'blocked_invariant',
    artifactAssembly: 'blocked_invariant',
    mustSurfaceNormalizationState: true,
    mustSurfaceCoverageState: true,
    constraints: DELIVERY_CONSTRAINTS,
  };
}

function readyEligibility(): ProductReadingExecutionEligibility {
  return {
    readingExecution: 'allowed',
    artifactAssembly: 'allowed_after_authority_execution',
    mustSurfaceNormalizationState: false,
    mustSurfaceCoverageState: false,
    constraints: DELIVERY_CONSTRAINTS,
  };
}

function buildResult(
  state: ProductReadingPreparationState,
  normalization: ConsumerReadingNormalizationResult,
  reasonCodes: readonly string[],
  executionEligibility: ProductReadingExecutionEligibility,
  composition?: GovernedReadingCompositionEvidenceResult,
): ProductReadingPreparationResult {
  const identityMaterial = {
    integrationVersion: PRODUCT_READING_INTEGRATION_VERSION,
    state,
    normalizationId: normalization.normalizationId,
    selectionId: composition?.selection.selectionId,
    governedEvidenceHash: composition?.evidence?.evidenceBundleHash,
    reasonCodes: [...reasonCodes].sort(),
    executionEligibility,
  };
  return {
    preparationId: `product_reading_${deterministicContentHash(identityMaterial).slice(0, 24)}`,
    integrationVersion: PRODUCT_READING_INTEGRATION_VERSION,
    state,
    normalization,
    ...(composition === undefined ? {} : { composition }),
    reasonCodes: [...reasonCodes].sort(),
    executionEligibility,
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

export function prepareProductReading(
  snapshot: CanonicalSajuSnapshot,
  execution: InterpretationExecutionResult,
  registry: ResolvedRuleRegistrySnapshot,
  input: ConsumerReadingRequestInput,
  _legacyOptions?: unknown,
): ProductReadingPreparationResult {
  const normalization = normalizeConsumerReadingRequest(input);
  if (normalization.state !== 'resolved' || normalization.request === undefined) {
    return blockedFromNormalization(normalization);
  }

  const composition = buildReadingCompositionEvidence(
    snapshot,
    execution,
    registry,
    normalization.request,
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
      if (composition.evidence === undefined) {
        return buildResult(
          'invariant_blocked',
          normalization,
          ['COMPLETE_SELECTION_REQUIRES_EVIDENCE_BUNDLE'],
          invariantBlockedEligibility(),
          composition,
        );
      }
      return buildResult(
        'ready_for_execution',
        normalization,
        [],
        readyEligibility(),
        composition,
      );
    }
  }
}
