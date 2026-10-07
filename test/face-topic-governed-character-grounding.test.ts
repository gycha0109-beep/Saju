import { describe, expect, it } from 'vitest';

import {
  FACE_GOVERNED_CHARACTER_GROUNDING_MODE_V1,
  FACE_GOVERNED_CHARACTER_REALIZATION_POLICY_V1,
  assertFaceGovernedCharacterGroundingMatchesSourceV1,
  assertFaceGovernedCharacterGroundingV1,
  buildFaceGovernedCharacterGroundingV1,
} from '../src/face-topic/governed-character-grounding.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';
import {
  syntheticGovernedFaceSource,
} from './support/topic-face-governed-synthetic.js';
import {
  buildFaceAuthorityCoverageSnapshot,
} from '../src/face-topic/authority.js';
import {
  planFaceTopicExecution,
} from '../src/face-topic/execution.js';

describe('TOPIC-FACE-005M-C1 governed Face CharacterGrounding', () => {
  it('builds deterministic source-owned grounding from the exact governed handoff', () => {
    const source =
      syntheticGovernedFaceSource();

    const first =
      buildFaceGovernedCharacterGroundingV1(source);
    const replay =
      buildFaceGovernedCharacterGroundingV1(source);

    expect(first.state).toBe('eligible');
    expect(replay).toEqual(first);
    if (
      first.state !== 'eligible' ||
      replay.state !== 'eligible'
    ) {
      throw new Error('expected eligible synthetic grounding');
    }

    expect(first.grounding.mode).toBe(
      FACE_GOVERNED_CHARACTER_GROUNDING_MODE_V1,
    );
    expect(first.grounding.sourceResultHash).toBe(
      first.handoff.sourceResultHash,
    );
    expect(first.grounding.authorizationReceiptRef).toBe(
      first.handoff.authorizationReceiptRef,
    );
    expect(first.grounding.handoffHash).toBe(
      first.handoff.handoffHash,
    );
    expect(first.grounding.units).toEqual(
      first.handoff.units.map((unit) => ({
        ...unit,
        realizationPolicyRef:
          FACE_GOVERNED_CHARACTER_REALIZATION_POLICY_V1,
      })),
    );
    expect(first.groundingRef).toEqual(
      expect.objectContaining({
        mode:
          FACE_GOVERNED_CHARACTER_GROUNDING_MODE_V1,
        topicKey:
          first.handoff.topicKey,
        sourceResultHash:
          first.handoff.sourceResultHash,
        authorizationReceiptRef:
          first.handoff.authorizationReceiptRef,
        handoffHash:
          first.handoff.handoffHash,
        bundleHash:
          first.grounding.bundleHash,
      }),
    );
    expect(first.grounding.bundleHash).toMatch(
      /^face-governed-character-grounding:/u,
    );
    expect(() =>
      assertFaceGovernedCharacterGroundingV1(
        first.grounding,
      ),
    ).not.toThrow();
    expect(() =>
      assertFaceGovernedCharacterGroundingMatchesSourceV1(
        first.grounding,
        source,
      ),
    ).not.toThrow();
  });

  it('preserves protected meaning, conditions, qualifiers, evidence, source and prohibitions exactly', () => {
    const source =
      syntheticGovernedFaceSource();
    const result =
      buildFaceGovernedCharacterGroundingV1(source);
    if (result.state !== 'eligible') {
      throw new Error('expected eligible synthetic grounding');
    }

    const sourceUnit =
      result.handoff.units[0]!;
    const grounded =
      result.grounding.units[0]!;

    expect(grounded.protectedMeaningText).toBe(
      sourceUnit.protectedMeaningText,
    );
    expect(grounded.direction).toBe(
      sourceUnit.direction,
    );
    expect(grounded.evidenceStatus).toBe(
      sourceUnit.evidenceStatus,
    );
    expect(grounded.conditions).toEqual(
      sourceUnit.conditions,
    );
    expect(grounded.qualifiers).toEqual(
      sourceUnit.qualifiers,
    );
    expect(grounded.observationRefs).toEqual(
      sourceUnit.observationRefs,
    );
    expect(grounded.bindingRefs).toEqual(
      sourceUnit.bindingRefs,
    );
    expect(grounded.evidenceRefs).toEqual(
      sourceUnit.evidenceRefs,
    );
    expect(grounded.sourceRefs).toEqual(
      sourceUnit.sourceRefs,
    );
    expect(grounded.prohibitedExtensions).toEqual(
      sourceUnit.prohibitedExtensions,
    );
  });

  it('rejects bundle hash tampering and unexpected privacy-bearing fields', () => {
    const source =
      syntheticGovernedFaceSource();
    const result =
      buildFaceGovernedCharacterGroundingV1(source);
    if (result.state !== 'eligible') {
      throw new Error('expected eligible synthetic grounding');
    }

    expect(() =>
      assertFaceGovernedCharacterGroundingV1({
        ...result.grounding,
        bundleHash:
          'face-governed-character-grounding:tampered',
      }),
    ).toThrow(
      'FACE_GOVERNED_CHARACTER_GROUNDING_HASH_MISMATCH',
    );

    expect(() =>
      assertFaceGovernedCharacterGroundingV1({
        ...result.grounding,
        rawImage: 'forbidden',
      } as typeof result.grounding),
    ).toThrow(
      /FACE_GOVERNED_CHARACTER_GROUNDING_PRIVACY_SCOPE_VIOLATION/u,
    );
  });

  it('does not create governed grounding for the real currently blocked Three-Divisions authority', () => {
    const authorityReceipt =
      buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
    const snapshot =
      buildFaceAuthorityCoverageSnapshot(
        authorityReceipt,
      );
    const plan =
      planFaceTopicExecution(
        {
          topicKey:
            'face.reading.three_divisions',
          requestId:
            'test-only:005m-c1:blocked',
          observationArtifactRef:
            'test-only:005m-c1:observation',
        },
        snapshot,
      );

    expect(plan.authorized).toBe(false);
    expect(
      buildFaceGovernedCharacterGroundingV1({
        authorityReceipt,
        plan,
        receipt:
          {} as never,
      }),
    ).toEqual({
      state: 'not_eligible',
      reason: 'source_blocked',
    });
  });
});
