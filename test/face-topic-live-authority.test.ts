import { describe, expect, it } from 'vitest';
import {
  buildFaceAuthorityCoverageSnapshot,
  createFaceTopicDefinitionRef,
  getFaceTopicDefinition,
  planFaceTopicExecution,
  resolveFaceTopicReadiness,
  type FaceTopicAuthoritySourceReceipt,
  type FaceTopicExecutionInput,
} from '../src/index.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';

const liveReceipt: FaceTopicAuthoritySourceReceipt =
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
const liveSnapshot =
  buildFaceAuthorityCoverageSnapshot(liveReceipt);

function requiredTopic(topicKey: string) {
  const topic = getFaceTopicDefinition(topicKey);
  if (topic === undefined) {
    throw new Error(`missing topic: ${topicKey}`);
  }
  return topic;
}

describe('TOPIC-FACE-002 live authority coverage and execution gate', () => {
  it('derives the product coverage partition from governed FR293/FR294 authority', () => {
    expect(
      liveReceipt.observation.materializedCapabilities,
    ).toHaveLength(18);
    expect(
      liveReceipt.observation.unavailableOrHardGapCapabilities,
    ).toHaveLength(11);
    expect(
      new Set([
        ...liveReceipt.observation.materializedCapabilities,
        ...liveReceipt.observation.unavailableOrHardGapCapabilities,
      ]).size,
    ).toBe(29);
    expect(
      liveSnapshot.availableObservationCapabilities,
    ).not.toContain('forehead.visible_width_shape');
  });

  it('builds a deterministic content-addressed snapshot from the same authority receipt', () => {
    expect(buildFaceAuthorityCoverageSnapshot(liveReceipt)).toEqual(
      liveSnapshot,
    );
    expect(liveSnapshot.snapshotId).toMatch(
      /^face-authority-coverage:/u,
    );
  });

  it('keeps current live readiness aligned with governed authority without using the old fixture', () => {
    expect(
      resolveFaceTopicReadiness(
        'face.discover.structure',
        liveSnapshot,
      ).state,
    ).toBe('available');
    expect(
      resolveFaceTopicReadiness(
        'face.discover.extended',
        liveSnapshot,
      ).state,
    ).toBe('partial');

    const threeDivisions = resolveFaceTopicReadiness(
      'face.reading.three_divisions',
      liveSnapshot,
    );
    expect(threeDivisions.state).toBe('blocked');
    expect(
      threeDivisions.blockers.some(
        (blocker) =>
          blocker.code ===
            'REQUIRED_BINDING_GROUP_NOT_READY' &&
          blocker.ref ===
            'face-bridge.frb005.three_divisions',
      ),
    ).toBe(true);
    expect(
      threeDivisions.blockers.some(
        (blocker) =>
          blocker.code ===
          'REQUIRED_SEMANTIC_CLAIM_FAMILY_MISSING',
      ),
    ).toBe(true);
  });

  it('changes readiness when authority coverage changes without changing the Topic definition', () => {
    const topic = requiredTopic('face.discover.extended');
    const beforeRef = createFaceTopicDefinitionRef(topic);
    const promotedReceipt: FaceTopicAuthoritySourceReceipt = {
      ...liveReceipt,
      observation: {
        ...liveReceipt.observation,
        materializedCapabilities: [
          ...liveReceipt.observation.materializedCapabilities,
          'forehead.visible_width_shape',
        ],
        unavailableOrHardGapCapabilities:
          liveReceipt.observation.unavailableOrHardGapCapabilities.filter(
            (capability) =>
              capability !== 'forehead.visible_width_shape',
          ),
      },
    };
    const promotedSnapshot =
      buildFaceAuthorityCoverageSnapshot(promotedReceipt);

    expect(promotedSnapshot.snapshotId).not.toBe(
      liveSnapshot.snapshotId,
    );
    expect(
      resolveFaceTopicReadiness(
        topic.topicKey,
        promotedSnapshot,
      ).state,
    ).toBe('available');
    expect(createFaceTopicDefinitionRef(topic)).toEqual(beforeRef);
  });

  it('does not treat observation progress as traditional claim authority', () => {
    const topic = requiredTopic(
      'face.reading.three_divisions',
    );
    const observationOnlyReceipt: FaceTopicAuthoritySourceReceipt = {
      ...liveReceipt,
      observation: {
        ...liveReceipt.observation,
        materializedCapabilities: [
          ...liveReceipt.observation.materializedCapabilities,
          ...topic.requirements.requiredObservationCapabilities,
        ],
        unavailableOrHardGapCapabilities:
          liveReceipt.observation.unavailableOrHardGapCapabilities,
      },
    };
    const snapshot =
      buildFaceAuthorityCoverageSnapshot(
        observationOnlyReceipt,
      );
    const result = resolveFaceTopicReadiness(
      topic.topicKey,
      snapshot,
    );

    expect(result.state).toBe('blocked');
    expect(
      result.blockers.some(
        (blocker) =>
          blocker.code ===
          'REQUIRED_SEMANTIC_CLAIM_FAMILY_MISSING',
      ),
    ).toBe(true);
    expect(
      result.blockers.some(
        (blocker) =>
          blocker.code ===
          'REQUIRED_BINDING_GROUP_NOT_READY',
      ),
    ).toBe(true);
  });

  it('refuses to create an execution plan for a blocked traditional Topic', () => {
    const plan = planFaceTopicExecution(
      {
        topicKey: 'face.reading.three_divisions',
        observationArtifactRef:
          'face-observation-artifact:test:001',
        requestId: 'request:test:blocked',
      },
      liveSnapshot,
    );

    expect(plan.authorized).toBe(false);
    if (plan.authorized) {
      throw new Error('blocked plan unexpectedly authorized');
    }
    expect(plan.readiness.state).toBe('blocked');
  });

  it('creates only a bounded neutral observation plan for an available Topic', () => {
    const topic = requiredTopic('face.discover.structure');
    const plan = planFaceTopicExecution(
      {
        topicKey: topic.topicKey,
        observationArtifactRef:
          'face-observation-artifact:test:002',
        requestId: 'request:test:available',
      },
      liveSnapshot,
    );

    expect(plan.authorized).toBe(true);
    if (!plan.authorized) {
      throw new Error('available plan unexpectedly blocked');
    }
    expect(plan.executionKind).toBe(
      'neutral_observation_projection',
    );
    expect(plan.methodologyRefs).toEqual([]);
    expect(plan.semanticClaimFamilies).toEqual([]);
    expect(plan.bindingGroupRefs).toEqual([]);
    expect(plan.requiredObservationCapabilities).toEqual(
      topic.requirements.requiredObservationCapabilities,
    );
  });

  it('rejects caller-supplied authority overrides instead of silently ignoring them', () => {
    const forged = {
      topicKey: 'face.discover.structure',
      observationArtifactRef:
        'face-observation-artifact:test:003',
      requestId: 'request:test:forged',
      methodologyRefs: [
        'method.mayi.face_three_divisions.fr261@0.2.0',
      ],
    } as unknown as FaceTopicExecutionInput;

    expect(() =>
      planFaceTopicExecution(forged, liveSnapshot),
    ).toThrow(
      'FACE_TOPIC_EXECUTION_INPUT_SCOPE_VIOLATION:methodologyRefs',
    );
  });

  it('keeps the live bridge group at FRB005 zero-admission fail-closed state', () => {
    const group = liveSnapshot.bindingGroups.find(
      (candidate) =>
        candidate.bindingGroupRef ===
        'face-bridge.frb005.three_divisions',
    );
    expect(group).toBeDefined();
    expect(group?.requiredBindingCount).toBe(16);
    expect(group?.admittedBindingCount).toBe(0);
    expect(group?.bindingReady).toBe(false);
  });
});
