import type { NarrativePolicy } from '../contracts/narrative.js';
import type { CalculationEngineOptions } from '../calculation/calculation-engine.js';
import {
  buildInterpretationExecutionPlan,
  ExecutionPlanError,
} from '../interpretation/execution-plan.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
} from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';
import type { ReviewerTrustContext } from '../interpretation/reviewer-trust.js';
import type { NarrativeModelAdapter } from '../llm/model-adapter.js';
import {
  createMyeonghwaProductHost,
  type MyeonghwaProductHost,
  type MyeonghwaProductHostDependencies,
  type ProductHostExecutionContext,
  type ProductHostInterpretationBundle,
  type ProductHostInterpretationRequestContext,
} from '../host/product-host.js';
import type { ProductReadingServiceOptions } from '../reading/product-reading-service.js';
import {
  getAuthorizedProductionCalculationPolicyGrant,
  listAuthorizedProductionCalculationPolicies,
  type AuthorizedCalculationPolicyGrant,
  type AuthorizedProductionCalculationPolicySummary,
} from './production-calculation-authority.js';
import {
  calculateAuthorizedMyeonghwaProductionSnapshot,
  diagnoseAuthorizedMyeonghwaProductionCalculationSensitivity,
  type AuthorizedMyeonghwaProductionCalculationSensitivityDiagnostic,
} from './production-calculation-runtime.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY_ID } from './production-calculation-policy.js';

export {
  listAuthorizedProductionCalculationPolicies,
  type AuthorizedProductionCalculationPolicySummary,
};

export const PRODUCTION_COMPOSITION_VERSION = 'myeonghwa-production-composition-v3';
export const PRODUCTION_AUTHORITY_MANIFEST_VERSION =
  'myeonghwa-production-authority-manifest-v2';
export const CURRENT_PRODUCTION_COMPOSITION_STATUS = 'blocked_authority_required' as const;

export type ProductionCompositionBlockerCode =
  | 'CALCULATION_POLICY_SELECTION_REQUIRED'
  | 'AUTHORIZED_CALCULATION_POLICY_NOT_REGISTERED'
  | 'PRODUCTION_INTERPRETATION_REGISTRY_REQUIRED'
  | 'INTERPRETATION_PACK_NOT_PRODUCTION'
  | 'INTERPRETATION_AUTHORIZATION_PREFLIGHT_FAILED'
  | 'NARRATIVE_ADAPTER_REQUIRED'
  | 'NARRATIVE_POLICY_REQUIRED'
  | 'READING_OPTIONS_REQUIRED';

export interface ProductionCompositionBlocker {
  code: ProductionCompositionBlockerCode;
  component: 'calculation' | 'interpretation' | 'narrative' | 'reading';
  message: string;
  reasonCode?: string;
}

export interface ProductionCalculationSensitivityObservation {
  requestId: string;
  diagnostic: AuthorizedMyeonghwaProductionCalculationSensitivityDiagnostic;
}

export type ProductionCalculationSensitivityObserver = (
  observation: ProductionCalculationSensitivityObservation,
) => void | Promise<void>;

export interface ProductionCompositionRequest {
  calculationPolicyId?: string;
  registry?: ResolvedRuleRegistrySnapshot;
  reviewerTrustContext?: ReviewerTrustContext;
  adapter?: NarrativeModelAdapter;
  narrativePolicy?: NarrativePolicy;
  readingOptions?: ProductReadingServiceOptions;
  calculationOptions?: CalculationEngineOptions;
  calculationSensitivityObserver?: ProductionCalculationSensitivityObserver;
  requestIdFactory?: () => string;
}

export interface ProductionCompositionAuthoritySummary {
  calculationPolicyId: string;
  calculationAuthorizationId: string;
  calculationAuthorityRecordRef: string;
  calculationPolicyContentHash: string;
  interpretationRegistrySnapshotId: string;
  interpretationPackId: string;
  interpretationPackVersion: string;
  interpretationPackContentHash: string;
}

export type ProductionCompositionInspection =
  | {
      status: 'blocked';
      compositionVersion: string;
      authorityManifestVersion: string;
      blockers: readonly ProductionCompositionBlocker[];
    }
  | {
      status: 'ready';
      compositionVersion: string;
      authorityManifestVersion: string;
      blockers: readonly [];
      authority: ProductionCompositionAuthoritySummary;
    };

export class ProductionCompositionBlockedError extends Error {
  readonly blockers: readonly ProductionCompositionBlocker[];

  constructor(blockers: readonly ProductionCompositionBlocker[]) {
    super(
      `Myeonghwa production composition is blocked: ${blockers
        .map((item) => item.code)
        .join(', ')}`,
    );
    this.name = 'ProductionCompositionBlockedError';
    this.blockers = blockers;
  }
}

function selectedCalculationPolicyId(calculationPolicyId: string | undefined): string {
  return calculationPolicyId ?? PRODUCTION_DEFAULT_CALCULATION_POLICY_ID;
}

function calculationGrant(
  calculationPolicyId: string | undefined,
): AuthorizedCalculationPolicyGrant | undefined {
  return getAuthorizedProductionCalculationPolicyGrant(calculationPolicyId);
}

function sortedBlockers(
  blockers: readonly ProductionCompositionBlocker[],
): readonly ProductionCompositionBlocker[] {
  return [...blockers].sort((left, right) => {
    const componentOrder = left.component.localeCompare(right.component);
    return componentOrder === 0 ? left.code.localeCompare(right.code) : componentOrder;
  });
}

function interpretationPreflightBlocker(
  registry: ResolvedRuleRegistrySnapshot,
  reviewerTrustContext: ReviewerTrustContext | undefined,
): ProductionCompositionBlocker | undefined {
  if (registry.pack.status !== 'production') {
    return {
      code: 'INTERPRETATION_PACK_NOT_PRODUCTION',
      component: 'interpretation',
      message: `Interpretation pack ${registry.pack.packId}@${registry.pack.version} is ${registry.pack.status}, not production.`,
    };
  }

  try {
    buildInterpretationExecutionPlan(registry, reviewerTrustContext);
    return undefined;
  } catch (error) {
    if (error instanceof ExecutionPlanError) {
      return {
        code: 'INTERPRETATION_AUTHORIZATION_PREFLIGHT_FAILED',
        component: 'interpretation',
        message: 'Production interpretation registry failed the existing authorization preflight.',
        reasonCode: error.code,
      };
    }
    throw error;
  }
}

export function inspectMyeonghwaProductionComposition(
  request: ProductionCompositionRequest = {},
): ProductionCompositionInspection {
  const blockers: ProductionCompositionBlocker[] = [];
  const calculationPolicyId = selectedCalculationPolicyId(request.calculationPolicyId);
  const registry = request.registry;
  const grant = calculationGrant(calculationPolicyId);

  if (grant === undefined) {
    blockers.push({
      code: 'AUTHORIZED_CALCULATION_POLICY_NOT_REGISTERED',
      component: 'calculation',
      message: `Calculation policy ${calculationPolicyId} is not registered in the governed production authority manifest.`,
    });
  }

  if (registry === undefined) {
    blockers.push({
      code: 'PRODUCTION_INTERPRETATION_REGISTRY_REQUIRED',
      component: 'interpretation',
      message: 'A resolved production interpretation registry is required.',
    });
  } else {
    const blocker = interpretationPreflightBlocker(registry, request.reviewerTrustContext);
    if (blocker !== undefined) blockers.push(blocker);
  }

  if (request.adapter === undefined || typeof request.adapter.generateStructured !== 'function') {
    blockers.push({
      code: 'NARRATIVE_ADAPTER_REQUIRED',
      component: 'narrative',
      message: 'A configured narrative model adapter is required.',
    });
  }
  if (request.narrativePolicy === undefined) {
    blockers.push({
      code: 'NARRATIVE_POLICY_REQUIRED',
      component: 'narrative',
      message: 'A narrative policy is required.',
    });
  }
  if (request.readingOptions === undefined) {
    blockers.push({
      code: 'READING_OPTIONS_REQUIRED',
      component: 'reading',
      message: 'Product reading service options are required.',
    });
  }

  if (blockers.length > 0 || grant === undefined || registry === undefined) {
    return {
      status: 'blocked',
      compositionVersion: PRODUCTION_COMPOSITION_VERSION,
      authorityManifestVersion: PRODUCTION_AUTHORITY_MANIFEST_VERSION,
      blockers: sortedBlockers(blockers),
    };
  }

  return {
    status: 'ready',
    compositionVersion: PRODUCTION_COMPOSITION_VERSION,
    authorityManifestVersion: PRODUCTION_AUTHORITY_MANIFEST_VERSION,
    blockers: [],
    authority: {
      calculationPolicyId,
      calculationAuthorizationId: grant.authorizationId,
      calculationAuthorityRecordRef: grant.authorityRecordRef,
      calculationPolicyContentHash: deterministicContentHash(grant.policy),
      interpretationRegistrySnapshotId: registry.snapshot.registrySnapshotId,
      interpretationPackId: registry.pack.packId,
      interpretationPackVersion: registry.pack.version,
      interpretationPackContentHash: deterministicContentHash(registry.pack),
    },
  };
}

function interpretationBundle(
  registry: ResolvedRuleRegistrySnapshot,
  reviewerTrustContext: ReviewerTrustContext | undefined,
  snapshot: Parameters<typeof runInterpretation>[0],
  context: ProductHostExecutionContext,
  requestContext?: ProductHostInterpretationRequestContext,
): ProductHostInterpretationBundle {
  const options = {
    requestId: context.requestId,
    ...(requestContext === undefined ? {} : { temporalFacts: requestContext.temporalFacts }),
    ...(reviewerTrustContext === undefined ? {} : { reviewerTrustContext }),
  };
  const interpretation: InterpretationExecutionResult = runInterpretation(snapshot, registry, options);
  return { registry, interpretation };
}

async function observeCalculationSensitivity(
  request: ProductionCompositionRequest,
  input: Parameters<typeof calculateAuthorizedMyeonghwaProductionSnapshot>[0],
  context: ProductHostExecutionContext,
): Promise<void> {
  const observer = request.calculationSensitivityObserver;
  if (observer === undefined) return;

  try {
    const diagnostic = diagnoseAuthorizedMyeonghwaProductionCalculationSensitivity(
      input,
      request.calculationOptions ?? {},
    );
    await observer({ requestId: context.requestId, diagnostic });
  } catch {
    // Diagnostics are deliberately isolated from the consumer reading path.
  }
}

function toDependencies(
  request: ProductionCompositionRequest,
  registry: ResolvedRuleRegistrySnapshot,
): MyeonghwaProductHostDependencies {
  const adapter = request.adapter;
  const narrativePolicy = request.narrativePolicy;
  const readingOptions = request.readingOptions;
  if (adapter === undefined || narrativePolicy === undefined || readingOptions === undefined) {
    throw new Error('Production composition invariant failed after readiness inspection.');
  }

  return {
    async calculate(input, context) {
      const result = calculateAuthorizedMyeonghwaProductionSnapshot(
        input,
        request.calculationOptions ?? {},
      );
      await observeCalculationSensitivity(request, input, context);
      return result.snapshot;
    },
    interpret: (snapshot, context, requestContext) =>
      interpretationBundle(
        registry,
        request.reviewerTrustContext,
        snapshot,
        context,
        requestContext,
      ),
    adapter,
    narrativePolicy,
    readingOptions,
    ...(request.requestIdFactory === undefined ? {} : { requestIdFactory: request.requestIdFactory }),
  };
}

export function createAuthorizedMyeonghwaProductionHost(
  request: ProductionCompositionRequest,
): MyeonghwaProductHost {
  const inspection = inspectMyeonghwaProductionComposition(request);
  if (inspection.status === 'blocked') {
    throw new ProductionCompositionBlockedError(inspection.blockers);
  }

  const calculationPolicyId = selectedCalculationPolicyId(request.calculationPolicyId);
  const grant = calculationGrant(calculationPolicyId);
  const registry = request.registry;
  if (grant === undefined || registry === undefined) {
    throw new Error('Production composition authority disappeared after readiness inspection.');
  }

  return createMyeonghwaProductHost(toDependencies(request, registry));
}
