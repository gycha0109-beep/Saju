import { describe, expect, it } from 'vitest';
import {
  FACE_TOPIC_FOUNDATION_FIXTURE_AUTHORITY_SNAPSHOT_FR293_FRB005,
  FACE_TOPIC_REGISTRY,
  assertFaceTopicDefinition,
  createFaceTopicDefinitionRef,
  evaluateFaceTopicDefinitionReadiness,
  getFaceTopicDefinition,
  resolveFaceTopicReadiness,
  type FaceAuthorityCoverageSnapshot,
  type FaceTopicDefinition,
} from '../src/index.js';

const snapshot =
  FACE_TOPIC_FOUNDATION_FIXTURE_AUTHORITY_SNAPSHOT_FR293_FRB005;

function requiredTopic(topicKey: string): FaceTopicDefinition {
  const topic = getFaceTopicDefinition(topicKey);
  if (topic === undefined) {
    throw new Error(`missing fixture topic: ${topicKey}`);
  }
  return topic;
}

describe('TOPIC-FACE-001 Face Product Topic foundation', () => {
  it('registers stable content-addressed topic definitions without price semantics', () => {
    expect(FACE_TOPIC_REGISTRY).toHaveLength(3);
    expect(
      new Set(FACE_TOPIC_REGISTRY.map((topic) => topic.topicKey)).size,
    ).toBe(3);

    for (const topic of FACE_TOPIC_REGISTRY) {
      expect(createFaceTopicDefinitionRef(topic)).toEqual(
        createFaceTopicDefinitionRef(topic),
      );
      expect('price' in topic).toBe(false);
      expect('discount' in topic).toBe(false);
      expect('providerSku' in topic).toBe(false);
      expect(topic.subjectPolicy).toBe('single_face_only');
      expect(topic.unavailableBehavior).toBe('fail_closed');
    }
  });

  it('marks a neutral observation-only discover topic available on FR293 coverage', () => {
    const result = resolveFaceTopicReadiness(
      'face.discover.structure',
      snapshot,
    );

    expect(result.state).toBe('available');
    expect(result.blockers).toEqual([]);
    expect(result.missingOptionalRequirements).toEqual([]);
  });

  it('marks optional hard-gap coverage partial only when the topic allows partial results', () => {
    const result = resolveFaceTopicReadiness(
      'face.discover.extended',
      snapshot,
    );

    expect(result.state).toBe('partial');
    expect(result.blockers).toEqual([]);
    expect(result.missingOptionalRequirements).toEqual([
      'observation:forehead.visible_width_shape',
    ]);
  });

  it('fails closed for an unknown topic', () => {
    const result = resolveFaceTopicReadiness(
      'face.unknown.topic',
      snapshot,
    );

    expect(result.state).toBe('blocked');
    expect(result.definitionRef).toBeUndefined();
    expect(result.blockers).toEqual([
      {
        code: 'TOPIC_NOT_REGISTERED',
        ref: 'face.unknown.topic',
        detail: 'Face topic is not registered: face.unknown.topic.',
      },
    ]);
  });

  it('keeps Three-Divisions blocked while FRB005 admits zero bindings', () => {
    const result = resolveFaceTopicReadiness(
      'face.reading.three_divisions',
      snapshot,
    );

    expect(result.state).toBe('blocked');
    expect(
      result.blockers.some(
        (blocker) =>
          blocker.code === 'REQUIRED_BINDING_GROUP_NOT_READY' &&
          blocker.ref === 'face-bridge.frb005.three_divisions',
      ),
    ).toBe(true);
    expect(
      result.blockers.some(
        (blocker) =>
          blocker.code ===
          'REQUIRED_SEMANTIC_CLAIM_FAMILY_MISSING',
      ),
    ).toBe(true);
  });

  it('does not promote neutral observation coverage into a traditional claim', () => {
    const threeDivisions = requiredTopic(
      'face.reading.three_divisions',
    );
    const observationOnlySnapshot: FaceAuthorityCoverageSnapshot = {
      ...snapshot,
      snapshotId: 'observation-only-three-divisions-test',
      availableObservationCapabilities: [
        ...snapshot.availableObservationCapabilities,
        ...threeDivisions.requirements
          .requiredObservationCapabilities,
      ],
      availableSemanticClaimFamilies: [],
    };

    const result = evaluateFaceTopicDefinitionReadiness(
      threeDivisions,
      observationOnlySnapshot,
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
      result.constraints.mayPromoteObservationToTraditionalClaim,
    ).toBe(false);
  });

  it('rejects a topic definition that requests a prohibited inference', () => {
    const base = requiredTopic('face.discover.structure');
    const invalid: FaceTopicDefinition = {
      ...base,
      topicKey: 'face.invalid.prohibited-inference',
      requirements: {
        ...base.requirements,
        requestedInferenceKeys: ['intelligence_inference'],
        prohibitedInferenceKeys: ['intelligence_inference'],
      },
    };

    expect(() => assertFaceTopicDefinition(invalid)).toThrow(
      'FACE_TOPIC_PROHIBITED_INFERENCE_REQUESTED',
    );
  });

  it('keeps rendering, commerce and publication metadata outside semantic readiness', () => {
    const base = requiredTopic('face.discover.structure');
    const changedPresentation: FaceTopicDefinition = {
      ...base,
      renderingProfileRef: 'face.rendering.changed-for-test',
      commerceEligibility: 'eligible',
      publicationState: 'published',
    };

    const original = evaluateFaceTopicDefinitionReadiness(
      base,
      snapshot,
    );
    const changed = evaluateFaceTopicDefinitionReadiness(
      changedPresentation,
      snapshot,
    );

    expect(original.state).toBe('available');
    expect(changed.state).toBe(original.state);
    expect(changed.blockers).toEqual(original.blockers);
    expect(changed.constraints.renderingMayAlterSemanticReadiness).toBe(
      false,
    );
    expect(changed.constraints.commerceMayAlterSemanticReadiness).toBe(
      false,
    );
    expect(changed.constraints.characterMayAlterSemanticReadiness).toBe(
      false,
    );
  });
});
