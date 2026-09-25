import { describe, expect, it } from 'vitest';
import {
  admitFaceTopicExecutionResult,
  buildFaceAuthorityCoverageSnapshot,
  buildFaceProductProjection,
  planFaceTopicExecution,
  type FaceTopicAuthorizedExecutionPlan,
  type FaceTopicExecutionPlan,
  type FaceTopicExecutionResultReceiptV1,
} from '../src/index.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';

const snapshot = buildFaceAuthorityCoverageSnapshot(
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest(),
);

function plan(
  topicKey = 'face.discover.structure',
  requestId = 'request:topic-face-003:001',
): FaceTopicExecutionPlan {
  return planFaceTopicExecution(
    {
      topicKey,
      observationArtifactRef:
        'face-observation-artifact:topic-face-003:001',
      requestId,
    },
    snapshot,
  );
}

function authorized(
  topicKey = 'face.discover.structure',
  requestId = 'request:topic-face-003:001',
): FaceTopicAuthorizedExecutionPlan {
  const value = plan(topicKey, requestId);
  if (!value.authorized) {
    throw new Error(`expected authorized plan: ${topicKey}`);
  }
  return value;
}

function receipt(
  executionPlan: FaceTopicAuthorizedExecutionPlan,
  overrides: Partial<FaceTopicExecutionResultReceiptV1> = {},
): FaceTopicExecutionResultReceiptV1 {
  return {
    schemaVersion: 'face-topic-execution-result-receipt-v1',
    executionPlanHash: executionPlan.executionPlanHash,
    requestId: executionPlan.requestId,
    authoritySnapshotId: executionPlan.authoritySnapshotId,
    observationArtifactRef:
      executionPlan.observationArtifactRef,
    executionKind: executionPlan.executionKind,
    faceEngineVersion: 'face-engine:test-fr293',
    methodologyPackRefs: [],
    bindingGroupRefs: [],
    observations:
      executionPlan.requiredObservationCapabilities.map(
        (capabilityKey, index) => ({
          kind: 'neutral_observation' as const,
          capabilityKey,
          observationRef:
            `face-observation:test:${index + 1}`,
          qualifiers: ['governed_neutral_observation'],
          provenanceRefs: [
            `face-engine:test:${capabilityKey}`,
          ],
        }),
      ),
    semanticClaims: [],
    approvedNarrativeBlocks: [],
    unavailableSections: [],
    prohibitedInferences: [
      ...executionPlan.prohibitedInferenceKeys,
    ],
    provenanceRefs: ['face-engine:test:result'],
    ...overrides,
  };
}

describe('TOPIC-FACE-003 product-safe projection and grounding', () => {
  it('keeps execution plan semantic identity stable across request ids', () => {
    const first = authorized(
      'face.discover.structure',
      'request:topic-face-003:first',
    );
    const second = authorized(
      'face.discover.structure',
      'request:topic-face-003:second',
    );

    expect(first.executionPlanHash).toBe(
      second.executionPlanHash,
    );
  });

  it('admits an available neutral result and projects only the Topic-authorized subset', () => {
    const executionPlan = authorized();
    const source = receipt(executionPlan, {
      observations: [
        ...receipt(executionPlan).observations,
        {
          kind: 'neutral_observation',
          capabilityKey: 'mouth.corner_orientation',
          observationRef: 'face-observation:test:superset',
          qualifiers: ['governed_neutral_observation'],
          provenanceRefs: ['face-engine:test:superset'],
        },
      ],
      approvedNarrativeBlocks: [
        {
          blockRef: 'face-narrative:test:structure',
          sourceRefs: ['face-observation:test:1'],
          text: '현재 사진에서 확인 가능한 구조적 관찰입니다.',
          realizationPolicy: 'bounded_paraphrase',
          prohibitedExtensions: [
            'traditional_semantic_promotion_without_governed_claim',
          ],
        },
      ],
    });

    const admitted =
      admitFaceTopicExecutionResult(executionPlan, source);
    const projection =
      buildFaceProductProjection(executionPlan, admitted);

    expect(projection.readinessState).toBe('available');
    expect(projection.selectedObservationRefs).toHaveLength(4);
    expect(projection.selectedObservationRefs).not.toContain(
      'face-observation:test:superset',
    );
    expect(projection.selectedClaimRefs).toEqual([]);
    expect(projection.grounding.observationUnits).toHaveLength(4);
    expect(projection.grounding.semanticClaimUnits).toEqual([]);
    expect(
      projection.grounding.approvedNarrativeBlocks[0]
        ?.sourceUnitRefs,
    ).toHaveLength(1);
  });

  it('preserves a partial optional observation as explicitly unavailable', () => {
    const executionPlan = authorized(
      'face.discover.extended',
    );
    expect(executionPlan.readinessState).toBe('partial');

    const admitted = admitFaceTopicExecutionResult(
      executionPlan,
      receipt(executionPlan),
    );
    const projection =
      buildFaceProductProjection(executionPlan, admitted);

    expect(projection.readinessState).toBe('partial');
    expect(projection.unavailableSections).toContain(
      'observation:forehead.visible_width_shape',
    );
    expect(
      projection.grounding.unavailableSections,
    ).toContain(
      'observation:forehead.visible_width_shape',
    );
  });

  it('keeps Three-Divisions blocked before result admission and projection', () => {
    const blocked = plan('face.reading.three_divisions');
    expect(blocked.authorized).toBe(false);

    expect(() =>
      admitFaceTopicExecutionResult(
        blocked,
        {
          schemaVersion:
            'face-topic-execution-result-receipt-v1',
        } as unknown as FaceTopicExecutionResultReceiptV1,
      ),
    ).toThrow('FACE_TOPIC_RESULT_BLOCKED_PLAN_REJECTED');
  });

  it('rejects a result missing a required observation', () => {
    const executionPlan = authorized();
    const source = receipt(executionPlan);
    expect(() =>
      admitFaceTopicExecutionResult(executionPlan, {
        ...source,
        observations: source.observations.slice(1),
      }),
    ).toThrow(
      /FACE_TOPIC_RESULT_REQUIRED_OBSERVATION_MISSING/u,
    );
  });

  it('rejects traditional claims on a neutral execution plan', () => {
    const executionPlan = authorized();
    expect(() =>
      admitFaceTopicExecutionResult(
        executionPlan,
        receipt(executionPlan, {
          methodologyPackRefs: [
            'method.mayi.face_three_divisions.fr261@0.2.0',
          ],
          semanticClaims: [
            {
              kind: 'traditional_claim',
              claimFamily: 'face.claim.three_divisions',
              claimRef: 'face-claim:test:forged',
              methodologyRef:
                'method.mayi.face_three_divisions.fr261@0.2.0',
              inferenceKeys: [],
              qualifiers: [],
              provenanceRefs: ['face-bridge:test:forged'],
            },
          ],
        }),
      ),
    ).toThrow(
      'FACE_TOPIC_RESULT_NEUTRAL_TRADITIONAL_PROMOTION_REJECTED',
    );
  });

  it('rejects removal of a plan-level prohibited inference', () => {
    const executionPlan = authorized();
    const source = receipt(executionPlan);
    expect(() =>
      admitFaceTopicExecutionResult(executionPlan, {
        ...source,
        prohibitedInferences:
          source.prohibitedInferences.slice(1),
      }),
    ).toThrow(/FACE_TOPIC_RESULT_PROHIBITION_TAMPERED/u);
  });

  it('rejects privacy-sensitive and presentation metadata at the result boundary', () => {
    const executionPlan = authorized();
    const source = receipt(executionPlan);

    expect(() =>
      admitFaceTopicExecutionResult(
        executionPlan,
        {
          ...source,
          rawLandmarks: [{ x: 1, y: 2 }],
        } as unknown as FaceTopicExecutionResultReceiptV1,
      ),
    ).toThrow(
      'FACE_TOPIC_RESULT_PRIVACY_SCOPE_VIOLATION:rawLandmarks',
    );

    expect(() =>
      admitFaceTopicExecutionResult(
        executionPlan,
        {
          ...source,
          characterId: 'character:test',
        } as unknown as FaceTopicExecutionResultReceiptV1,
      ),
    ).toThrow(
      'FACE_TOPIC_RESULT_RECEIPT_SCOPE_VIOLATION:characterId',
    );
  });

  it('rejects narrative blocks that would leak an out-of-scope superset source', () => {
    const executionPlan = authorized();
    const source = receipt(executionPlan, {
      observations: [
        ...receipt(executionPlan).observations,
        {
          kind: 'neutral_observation',
          capabilityKey: 'mouth.corner_orientation',
          observationRef: 'face-observation:test:superset',
          qualifiers: [],
          provenanceRefs: ['face-engine:test:superset'],
        },
      ],
      approvedNarrativeBlocks: [
        {
          blockRef: 'face-narrative:test:leak',
          sourceRefs: ['face-observation:test:superset'],
          text: 'Topic 범위 밖 관찰을 노출하려는 블록입니다.',
          realizationPolicy: 'bounded_paraphrase',
          prohibitedExtensions: [],
        },
      ],
    });
    const admitted =
      admitFaceTopicExecutionResult(executionPlan, source);

    expect(() =>
      buildFaceProductProjection(executionPlan, admitted),
    ).toThrow(
      /FACE_PRODUCT_PROJECTION_NARRATIVE_SOURCE_OUT_OF_SCOPE/u,
    );
  });

  it('keeps source and grounding semantic hashes stable when only requestId changes', () => {
    const firstPlan = authorized(
      'face.discover.structure',
      'request:topic-face-003:hash-a',
    );
    const secondPlan = authorized(
      'face.discover.structure',
      'request:topic-face-003:hash-b',
    );

    const firstAdmitted = admitFaceTopicExecutionResult(
      firstPlan,
      receipt(firstPlan),
    );
    const secondAdmitted = admitFaceTopicExecutionResult(
      secondPlan,
      receipt(secondPlan),
    );
    const firstProjection =
      buildFaceProductProjection(firstPlan, firstAdmitted);
    const secondProjection =
      buildFaceProductProjection(secondPlan, secondAdmitted);

    expect(firstAdmitted.sourceResultHash).toBe(
      secondAdmitted.sourceResultHash,
    );
    expect(firstProjection.grounding.groundingHash).toBe(
      secondProjection.grounding.groundingHash,
    );
    expect(firstProjection.projectionHash).toBe(
      secondProjection.projectionHash,
    );
  });

  it('changes source and grounding identity when selected semantic content changes', () => {
    const executionPlan = authorized();
    const baseline = receipt(executionPlan);
    const changed = receipt(executionPlan, {
      observations: baseline.observations.map((unit, index) =>
        index === 0
          ? {
              ...unit,
              qualifiers: [
                ...unit.qualifiers,
                'source_semantic_change',
              ],
            }
          : unit,
      ),
    });

    const baselineAdmitted = admitFaceTopicExecutionResult(
      executionPlan,
      baseline,
    );
    const changedAdmitted = admitFaceTopicExecutionResult(
      executionPlan,
      changed,
    );
    const baselineProjection =
      buildFaceProductProjection(
        executionPlan,
        baselineAdmitted,
      );
    const changedProjection =
      buildFaceProductProjection(
        executionPlan,
        changedAdmitted,
      );

    expect(changedAdmitted.sourceResultHash).not.toBe(
      baselineAdmitted.sourceResultHash,
    );
    expect(
      changedProjection.grounding.groundingHash,
    ).not.toBe(
      baselineProjection.grounding.groundingHash,
    );
  });
});
