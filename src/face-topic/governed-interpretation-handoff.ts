import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildFaceAuthorityCoverageSnapshot,
  type FaceTopicAuthoritySourceReceipt,
} from './authority.js';
import { planFaceTopicExecution, type FaceTopicExecutionPlan } from './execution.js';
import {
  admitFaceTopicExecutionResult,
  type FaceTopicExecutionResultReceiptV1,
} from './result-receipt.js';
import type { FaceGovernedInterpretationUnitV1 } from './governed-interpretation-unit.js';

export const FACE_GOVERNED_INTERPRETATION_SOURCE_CONTRACT_V1 =
  'saju-face-governed-interpretation-source-v1' as const;

/** Exactly the MyeongHa v1 wire contract; no transport rewrite is permitted. */
export interface FaceGovernedInterpretationHandoffV1 {
  readonly schemaVersion: 'character-face-governed-interpretation-v1';
  readonly sourceContractVersion: typeof FACE_GOVERNED_INTERPRETATION_SOURCE_CONTRACT_V1;
  readonly sourceAuthorityRef: string;
  readonly sourceResultHash: string;
  readonly topicKey: string;
  readonly authorizationState: 'product_authorized';
  readonly authorizationScope: 'character_public_reading';
  readonly authorizationReceiptRef: string;
  readonly units: readonly FaceGovernedInterpretationUnitV1[];
  readonly handoffHash: string;
}

export interface FaceGovernedInterpretationSourceInputV1 {
  /** Both receipts come from trusted server-side source providers, not the client. */
  readonly authorityReceipt: FaceTopicAuthoritySourceReceipt;
  readonly plan: FaceTopicExecutionPlan;
  readonly receipt: FaceTopicExecutionResultReceiptV1;
}

export type FaceGovernedInterpretationHandoffDecisionV1 =
  | Readonly<{ state: 'eligible'; handoff: FaceGovernedInterpretationHandoffV1 }>
  | Readonly<{
      state: 'not_eligible';
      reason:
        'source_blocked' | 'neutral_topic' | 'publication_not_authorized' | 'metadata_incomplete';
    }>;

function fail(code: string): never {
  throw new Error(code);
}

function assertSubset(actual: readonly string[], expected: readonly string[], code: string): void {
  if (actual.some((ref) => !expected.includes(ref))) fail(code);
}

export function buildFaceGovernedInterpretationHandoffV1(
  input: FaceGovernedInterpretationSourceInputV1,
): FaceGovernedInterpretationHandoffDecisionV1 {
  const { plan, receipt, authorityReceipt } = input;
  if (!plan.authorized) return Object.freeze({ state: 'not_eligible', reason: 'source_blocked' });
  // Re-plan against the trusted live receipt. A rehashed or stale plan is insufficient.
  const snapshot = buildFaceAuthorityCoverageSnapshot(authorityReceipt);
  const currentPlan = planFaceTopicExecution(
    {
      topicKey: plan.topicKey,
      requestId: plan.requestId,
      observationArtifactRef: plan.observationArtifactRef,
    },
    snapshot,
  );
  if (!currentPlan.authorized || currentPlan.executionPlanHash !== plan.executionPlanHash) {
    fail('FACE_GOVERNED_AUTHORITY_PLAN_MISMATCH');
  }
  const admitted = admitFaceTopicExecutionResult(plan, receipt);
  if (admitted.executionKind !== 'traditional_face_reading') {
    return Object.freeze({ state: 'not_eligible', reason: 'neutral_topic' });
  }
  const decision = authorityReceipt.traditional.characterPublicationDecision;
  if (
    !decision ||
    decision.state !== 'product_authorized' ||
    decision.scope !== 'character_public_reading' ||
    typeof decision.decisionRef !== 'string' ||
    !decision.decisionRef.trim() ||
    !decision.topicKeys.includes(plan.topicKey)
  ) {
    return Object.freeze({ state: 'not_eligible', reason: 'publication_not_authorized' });
  }
  if (
    !admitted.semanticClaims.length ||
    admitted.semanticClaims.some((claim) => !claim.governedInterpretation)
  ) {
    return Object.freeze({ state: 'not_eligible', reason: 'metadata_incomplete' });
  }
  const units = Object.freeze(
    admitted.semanticClaims.map((claim) => {
      const unit = claim.governedInterpretation!;
      if (
        !plan.semanticClaimFamilies.includes(claim.claimFamily) ||
        !plan.methodologyRefs.includes(claim.methodologyRef) ||
        !admitted.methodologyPackRefs.includes(claim.methodologyRef)
      ) {
        fail('FACE_GOVERNED_CLAIM_OUTSIDE_AUTHORITY');
      }
      assertSubset(
        unit.observationRefs,
        admitted.observations
          .filter((observation) =>
            [
              ...plan.requiredObservationCapabilities,
              ...plan.optionalObservationCapabilities,
            ].includes(observation.capabilityKey),
          )
          .map((observation) => observation.observationRef),
        'FACE_GOVERNED_OBSERVATION_BINDING_MISMATCH',
      );
      assertSubset(
        unit.bindingRefs,
        admitted.bindingGroupRefs.filter((ref) => plan.bindingGroupRefs.includes(ref)),
        'FACE_GOVERNED_BINDING_MISMATCH',
      );
      assertSubset(unit.evidenceRefs, claim.provenanceRefs, 'FACE_GOVERNED_EVIDENCE_MISMATCH');
      assertSubset(unit.sourceRefs, claim.provenanceRefs, 'FACE_GOVERNED_SOURCE_MISMATCH');
      assertSubset(claim.qualifiers, unit.qualifiers, 'FACE_GOVERNED_QUALIFIER_REMOVED');
      assertSubset(
        admitted.prohibitedInferences,
        unit.prohibitedExtensions,
        'FACE_GOVERNED_PROHIBITION_REMOVED',
      );
      const narratives = admitted.approvedNarrativeBlocks.filter(
        (block) =>
          block.sourceRefs.includes(claim.claimRef) &&
          block.realizationPolicy === 'protected_verbatim' &&
          block.text === unit.protectedMeaningText,
      );
      if (narratives.length !== 1) fail('FACE_GOVERNED_PROTECTED_MEANING_MISMATCH');
      assertSubset(
        narratives[0]!.prohibitedExtensions,
        unit.prohibitedExtensions,
        'FACE_GOVERNED_NARRATIVE_PROHIBITION_REMOVED',
      );
      return unit;
    }),
  );
  if (
    new Set(units.map((unit) => unit.interpretationId)).size !== units.length ||
    new Set(units.map((unit) => unit.lensKey)).size !== units.length
  ) {
    fail('FACE_GOVERNED_UNRESOLVED_DUPLICATE_ID_OR_LENS');
  }
  const material = Object.freeze({
    schemaVersion: 'character-face-governed-interpretation-v1' as const,
    sourceContractVersion: FACE_GOVERNED_INTERPRETATION_SOURCE_CONTRACT_V1,
    sourceAuthorityRef: authorityReceipt.traditional.authorityRef,
    sourceResultHash: admitted.sourceResultHash,
    topicKey: plan.topicKey,
    authorizationState: 'product_authorized' as const,
    authorizationScope: 'character_public_reading' as const,
    units,
  });
  const authorizationReceiptRef = `face-governed-authorization:${deterministicContentHash({
    ...material,
    executionPlanHash: plan.executionPlanHash,
    authoritySnapshotId: snapshot.snapshotId,
    decision,
  })}`;
  const withoutHash = Object.freeze({ ...material, authorizationReceiptRef });
  return Object.freeze({
    state: 'eligible',
    handoff: Object.freeze({
      ...withoutHash,
      handoffHash: `face-governed-interpretation:${deterministicContentHash(withoutHash)}`,
    }),
  });
}

/** A content hash is integrity, not authority: compare to trusted source material. */
export function assertFaceGovernedInterpretationHandoffMatchesSourceV1(
  candidate: unknown,
  input: FaceGovernedInterpretationSourceInputV1,
): asserts candidate is FaceGovernedInterpretationHandoffV1 {
  const expected = buildFaceGovernedInterpretationHandoffV1(input);
  if (
    expected.state !== 'eligible' ||
    deterministicContentHash(candidate) !== deterministicContentHash(expected.handoff)
  ) {
    fail('FACE_GOVERNED_HANDOFF_SOURCE_OR_RECEIPT_MISMATCH');
  }
}
