import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import {
  deterministicContentHash,
  verifyResolvedRegistryContentIntegrity,
  type ResolvedRuleRegistrySnapshot,
} from '../interpretation/rule-registry.js';
import type { GovernedReadingExecutionResult } from './governed-reading-execution.js';
import {
  normalizeConsumerReadingRequest, type ConsumerReadingRequestInput,
} from './consumer-reading-request-adapter.js';
import { inspectSajuSelectedRuleBundleV1 } from './source-reading-selected-rule-bundle.js';
import type { ProductReadingDeliveryResult } from './product-reading-delivery.js';
import { resolveReadingProfileSelectionAuthorization } from './reading-profile-authorization.js';
import { assertProductReadingResponse } from './product-reading-response-admission.js';
import {
  buildProductReadingResponse,
  type ProductReadingResponse,
} from './product-reading-response.js';

export const SOURCE_READING_PROOF_READINESS_VERSION_V1 =
  'myeonghwa-source-reading-proof-readiness-v1' as const;

export type SourceReadingProofReadinessReasonV1 =
  | 'invalid_source_identity'
  | 'incomplete_execution'
  | 'profile_not_selection_authorized'
  | 'incomplete_claim_coverage'
  | 'invalid_selected_claim_lineage'
  | 'missing_evidence_bundle'
  | 'artifact_identity_mismatch'
  | 'response_not_admitted'
  | 'response_delivery_mismatch'
  | 'source_attestation_not_implemented';

export interface SourceReadingProofMaterialV1 {
  readonly snapshotId: string;
  readonly interpretationRunId: string;
  readonly registrySnapshotId: string;
  readonly executionId: string;
  readonly preparationId: string;
  readonly selectionId: string;
  readonly profileRef: Readonly<{
    id: string;
    version: string;
    contentHash: string;
  }>;
  readonly evidenceBundleHash: string;
  readonly readingId: string;
  readonly responseId: string;
  /**
   * Deterministic content digest; NOT a signature, authorization,
   * provenance certificate or replay protection by itself.
   */
  readonly responseBodyHash: string;
}

/**
 * This is an inspection result from already-available Saju in-process objects.
 * It is not an origin-authenticated or host-bound Source Execution Proof.
 */
export interface SourceReadingProofReadinessV1 {
  readonly version: typeof SOURCE_READING_PROOF_READINESS_VERSION_V1;
  readonly state: 'blocked' | 'held';
  readonly reason: SourceReadingProofReadinessReasonV1;
  readonly material?: SourceReadingProofMaterialV1;
  readonly requestBinding: 'NOT_ATTESTED';
  readonly productionInterpretationAuthority: 'NOT_EVALUATED';
  readonly proofAuthenticity: 'NOT_ATTESTED';
  readonly releaseAuthorization: 'NOT_EVALUATED';
  readonly canExecute: false;
  readonly canPublish: false;
  readonly canSell: false;
}

export interface InspectSourceReadingProofReadinessInputV1 {
  readonly snapshot: CanonicalSajuSnapshot;
  readonly interpretation: InterpretationExecutionResult;
  readonly registry: ResolvedRuleRegistrySnapshot;
  readonly execution: GovernedReadingExecutionResult;
  readonly delivery: ProductReadingDeliveryResult;
  readonly response: ProductReadingResponse;
  /** Original server-owned request, required when the response echoes context. */
  readonly requestInput?: ConsumerReadingRequestInput;
}

function inspection(
  state: SourceReadingProofReadinessV1['state'],
  reason: SourceReadingProofReadinessReasonV1,
  material?: SourceReadingProofMaterialV1,
): SourceReadingProofReadinessV1 {
  return Object.freeze({
    version: SOURCE_READING_PROOF_READINESS_VERSION_V1,
    state,
    reason,
    ...(material === undefined ? {} : { material: Object.freeze(material) }),
    requestBinding: 'NOT_ATTESTED' as const,
    productionInterpretationAuthority: 'NOT_EVALUATED' as const,
    proofAuthenticity: 'NOT_ATTESTED' as const,
    releaseAuthorization: 'NOT_EVALUATED' as const,
    canExecute: false as const,
    canPublish: false as const,
    canSell: false as const,
  });
}

function nonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Source-side material inventory and identity/coverage consistency audit.
 *
 * This function MUST only run inside Saju against objects produced by its
 * authorized execution pipeline. It deliberately does not create a network
 * payload, signature, HTTP header, Production authorization, or claim meaning.
 *
 * A fully consistent in-memory fixture remains HOLD because Saju cannot
 * authenticate MyeongHa's subject / Birth Profile revision from this public
 * Product Reading request, and no per-response production source attestation
 * has yet been defined.
 */
export function inspectSourceReadingProofReadinessV1(
  input: InspectSourceReadingProofReadinessInputV1,
): SourceReadingProofReadinessV1 {
  const { snapshot, interpretation, registry, execution, delivery, response } = input;
  if (!nonEmpty(snapshot?.snapshotId)
    || !nonEmpty(interpretation?.run?.interpretationRunId)
    || !nonEmpty(registry?.snapshot?.registrySnapshotId)
    || !interpretation.integrity.valid
    || interpretation.run.snapshotId !== snapshot.snapshotId
    || interpretation.run.registrySnapshotId !== registry.snapshot.registrySnapshotId
    || verifyResolvedRegistryContentIntegrity(registry).length > 0) {
    return inspection('blocked', 'invalid_source_identity');
  }

  const preparation = execution.preparation;
  const composition = preparation.composition;
  if (preparation.state !== 'ready_for_execution'
    || preparation.executionEligibility.readingExecution !== 'allowed'
    || !['completed', 'completed_with_fallback'].includes(execution.state)
    || execution.artifact === undefined
    || delivery.artifact === undefined) {
    return inspection('blocked', 'incomplete_execution');
  }

  const selection = composition?.selection;
  const profileRef = selection?.profileRef;
  if (profileRef === undefined
    || selection?.profileAuthorization.state !== 'authorized'
    || resolveReadingProfileSelectionAuthorization(profileRef).state !== 'authorized') {
    return inspection('blocked', 'profile_not_selection_authorized');
  }

  if (selection.coverageState !== 'complete'
    || !Array.isArray(selection.selectedClaimIds)
    || selection.selectedClaimIds.length === 0) {
    return inspection('blocked', 'incomplete_claim_coverage');
  }
  if (!nonEmpty(composition?.evidence?.evidenceBundleHash)) {
    return inspection('blocked', 'missing_evidence_bundle');
  }

  // Coverage "complete" is necessary but not proof that the selected Claims
  // still belong to this content-addressed Registry and their matched
  // Rule/Methodology/Source lineage. Prevent a stale or substituted Claim
  // selection from ever becoming signed Source Owner material.
  if (inspectSajuSelectedRuleBundleV1({
    registry, interpretation, selectedClaimIds: selection.selectedClaimIds,
  }).state !== 'held') {
    return inspection('blocked', 'invalid_selected_claim_lineage');
  }

  const artifact = execution.artifact;
  if (!nonEmpty(artifact.readingId)
    || artifact.provenance.snapshotId !== snapshot.snapshotId
    || artifact.provenance.interpretationRunId !== interpretation.run.interpretationRunId
    || !nonEmpty(artifact.provenance.readingVersion)
    || delivery.audit.executionId !== execution.executionId
    || delivery.audit.preparationId !== preparation.preparationId
    || deterministicContentHash(delivery.artifact) !== deterministicContentHash(artifact)) {
    return inspection('blocked', 'artifact_identity_mismatch');
  }

  try {
    assertProductReadingResponse(response);
  } catch {
    return inspection('blocked', 'response_not_admitted');
  }
  // Product responses now bind the selected menu, original text and calculation
  // sex. Reconstruct that context from the server-owned input, never from the
  // response being inspected; otherwise swapped menu metadata could be signed.
  const original = input.requestInput;
  if ((response.requestContext !== undefined && original === undefined) ||
      (original !== undefined && normalizeConsumerReadingRequest(original).normalizationId !==
        preparation.normalization.normalizationId)) {
    return inspection('blocked', 'response_delivery_mismatch');
  }
  const request = preparation.normalization.request;
  const expectedContext = original === undefined || request === undefined ? undefined : {
    requestedText: original.text,
    intent: request.intent,
    calculationSex: snapshot.input.sexForTraditionalCalculation ?? 'unspecified',
  };
  if (!['delivered', 'delivered_with_fallback'].includes(response.state)
    || delivery.state !== response.state
    || delivery.messageCode !== response.messageCode
    || delivery.requiredAction !== response.requiredAction
    || response.reading?.readingId !== artifact.readingId
    || deterministicContentHash(buildProductReadingResponse(delivery, expectedContext))
      !== deterministicContentHash(response)) {
    return inspection('blocked', 'response_delivery_mismatch');
  }

  const material: SourceReadingProofMaterialV1 = {
    snapshotId: snapshot.snapshotId,
    interpretationRunId: interpretation.run.interpretationRunId,
    registrySnapshotId: registry.snapshot.registrySnapshotId,
    executionId: execution.executionId,
    preparationId: preparation.preparationId,
    selectionId: selection.selectionId,
    profileRef: Object.freeze({
      id: profileRef.id,
      version: profileRef.version,
      contentHash: profileRef.contentHash,
    }),
    evidenceBundleHash: composition.evidence.evidenceBundleHash,
    readingId: artifact.readingId,
    responseId: response.responseId,
    responseBodyHash: deterministicContentHash(response),
  };

  return inspection('held', 'source_attestation_not_implemented', material);
}
