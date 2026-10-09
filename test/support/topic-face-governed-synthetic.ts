/** TEST ONLY: no approved production Three Divisions authority is asserted here. */
import {
  buildFaceAuthorityCoverageSnapshot,
  type FaceTopicAuthoritySourceReceipt,
} from '../../src/face-topic/authority.js';
import { planFaceTopicExecution } from '../../src/face-topic/execution.js';
import { FACE_GOVERNED_INTERPRETATION_REQUIRED_PROHIBITIONS_V1 } from '../../src/face-topic/governed-interpretation-unit.js';
import { getFaceTopicDefinition } from '../../src/face-topic/registry.js';
import type { FaceTopicExecutionResultReceiptV1 } from '../../src/face-topic/result-receipt.js';

export function syntheticGovernedFaceSource() {
  const topic = getFaceTopicDefinition('face.reading.three_divisions')!;
  const authorityReceipt: FaceTopicAuthoritySourceReceipt = {
    schemaVersion: 'face-topic-authority-source-receipt-v1',
    observation: {
      authorityRef: 'test-only:neutral-authority',
      materializedCapabilities: [...topic.requirements.requiredObservationCapabilities],
      unavailableOrHardGapCapabilities: [],
      provenanceRefs: ['test-only:observation-evidence'],
    },
    bridge: {
      authorityRef: 'test-only:bridge-authority',
      bindingGroups: [
        {
          bindingGroupRef: 'face-bridge.frb005.three_divisions',
          requiredBindingCount: 16,
          admittedBindingCount: 16,
          bindingReady: true,
          provenanceRefs: ['test-only:binding-evidence'],
        },
      ],
      provenanceRefs: ['test-only:bridge-evidence'],
    },
    traditional: {
      authorityRef: 'test-only:traditional-authority',
      methodologyRefs: [...topic.requirements.requiredMethodologyRefs],
      semanticClaimFamilies: [...topic.requirements.requiredSemanticClaimFamilies],
      provenanceRefs: ['test-only:source-scan'],
      characterPublicationDecision: {
        state: 'product_authorized',
        scope: 'character_public_reading',
        decisionRef: 'test-only:synthetic-publication-decision',
        topicKeys: [topic.topicKey],
      },
    },
  };
  const plan = planFaceTopicExecution(
    {
      topicKey: topic.topicKey,
      requestId: 'test-only:governed-request',
      observationArtifactRef: 'test-only:observation-artifact',
    },
    buildFaceAuthorityCoverageSnapshot(authorityReceipt),
  );
  if (!plan.authorized) throw new Error('Synthetic test plan must be authorized');
  const observations = plan.requiredObservationCapabilities.map((capabilityKey, index) => ({
    kind: 'neutral_observation' as const,
    capabilityKey,
    observationRef: `test-only:observation:${index}`,
    qualifiers: ['test-only:observation-qualifier'],
    provenanceRefs: ['test-only:observation-evidence'],
  }));
  const governedInterpretation = {
    interpretationId: 'test-only:source-interpretation:1',
    lensKey: 'test-only:source-lens',
    direction: 'mixed_or_conditional' as const,
    evidenceStatus: 'direct_evidence' as const,
    protectedMeaningText: '시험 자료: 승인된 조건이 충족되는 경우에 한해 읽습니다.',
    observationRefs: observations.map((observation) => observation.observationRef).sort(),
    bindingRefs: [...plan.bindingGroupRefs].sort(),
    evidenceRefs: ['test-only:semantic-evidence'],
    sourceRefs: ['test-only:source-scan'],
    conditions: ['test-only:source-condition'],
    qualifiers: ['test-only:source-qualifier'],
    prohibitedExtensions: [
      ...FACE_GOVERNED_INTERPRETATION_REQUIRED_PROHIBITIONS_V1,
      ...plan.prohibitedInferenceKeys,
    ].sort(),
  };
  const receipt: FaceTopicExecutionResultReceiptV1 = {
    schemaVersion: 'face-topic-execution-result-receipt-v1',
    executionPlanHash: plan.executionPlanHash,
    requestId: plan.requestId,
    authoritySnapshotId: plan.authoritySnapshotId,
    observationArtifactRef: plan.observationArtifactRef,
    executionKind: plan.executionKind,
    faceEngineVersion: 'test-only:face-engine',
    methodologyPackRefs: [...plan.methodologyRefs],
    bindingGroupRefs: [...plan.bindingGroupRefs],
    observations,
    semanticClaims: [
      {
        kind: 'traditional_claim',
        claimFamily: 'face.claim.three_divisions',
        claimRef: 'test-only:semantic-claim',
        methodologyRef: plan.methodologyRefs[0]!,
        inferenceKeys: [],
        qualifiers: ['test-only:source-qualifier'],
        provenanceRefs: ['test-only:semantic-evidence', 'test-only:source-scan'],
        governedInterpretation,
      },
    ],
    approvedNarrativeBlocks: [
      {
        blockRef: 'test-only:approved-narrative',
        sourceRefs: ['test-only:semantic-claim'],
        text: governedInterpretation.protectedMeaningText,
        realizationPolicy: 'protected_verbatim',
        prohibitedExtensions: [...governedInterpretation.prohibitedExtensions],
      },
    ],
    unavailableSections: [],
    prohibitedInferences: [...plan.prohibitedInferenceKeys],
    provenanceRefs: ['test-only:source-evidence'],
  };
  return { authorityReceipt, plan, receipt };
}
