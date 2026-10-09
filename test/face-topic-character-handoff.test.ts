import {
  describe,
  expect,
  it,
} from 'vitest';
import { buildFaceAuthorityCoverageSnapshot } from '../src/face-topic/authority.js';
import {
  admitFaceCharacterGroundingBundleV1,
  assertFaceCharacterGroundingBundleRefV1,
  assertFaceCharacterGroundingBundleV1,
  buildFaceCharacterGroundingBundleRefV1,
  evaluateFaceCharacterHandoffEligibility,
  type FaceCharacterGroundingBundleV1,
} from '../src/face-topic/character-handoff.js';
import {
  planFaceTopicExecution,
  type FaceTopicAuthorizedExecutionPlan,
} from '../src/face-topic/execution.js';
import { buildFaceLiveReaderPipeline } from '../src/face-topic/live-fr293-reader.js';
import {
  deterministicContentHash,
} from '../src/interpretation/rule-registry.js';
import {
  collectNormalizedKeys,
  createTopicFaceE2EHarness,
} from './support/topic-face-e2e-harness.js';
import {
  buildFR293ProductDisplayReceiptForTopicFaceTest,
} from './support/topic-face-fr293-display-receipt.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';

const STRUCTURE_TOPIC =
  'face.discover.structure';
const EXTENDED_TOPIC =
  'face.discover.extended';
const THREE_DIVISIONS_TOPIC =
  'face.reading.three_divisions';

const ARTIFACT =
  'face-observation-artifact:topic-face-005a:001';

const authoritySnapshot =
  buildFaceAuthorityCoverageSnapshot(
    buildRepositoryFaceAuthorityReceiptForTopicFaceTest(),
  );

function authorizedPlan(
  topicKey = STRUCTURE_TOPIC,
  requestId =
    'request:topic-face-005a:001',
): FaceTopicAuthorizedExecutionPlan {
  const plan =
    planFaceTopicExecution(
      {
        topicKey,
        observationArtifactRef: ARTIFACT,
        requestId,
      },
      authoritySnapshot,
    );

  if (!plan.authorized) {
    throw new Error(
      `expected authorized plan: ${topicKey}`,
    );
  }

  return plan;
}

function sourcePipeline(
  topicKey = STRUCTURE_TOPIC,
  requestId =
    'request:topic-face-005a:001',
) {
  const plan =
    authorizedPlan(topicKey, requestId);
  const receipt =
    buildFR293ProductDisplayReceiptForTopicFaceTest(
      plan.observationArtifactRef,
    );

  return {
    plan,
    pipeline:
      buildFaceLiveReaderPipeline(
        plan,
        receipt,
      ),
  };
}

function rehashBundle(
  bundle: FaceCharacterGroundingBundleV1,
  change: Partial<
    Omit<
      FaceCharacterGroundingBundleV1,
      'bundleHash'
    >
  >,
): FaceCharacterGroundingBundleV1 {
  const {
    bundleHash: ignored,
    ...identity
  } = bundle;
  void ignored;

  const changed = {
    ...identity,
    ...change,
  };

  return {
    ...changed,
    bundleHash:
      `face-character-grounding:${deterministicContentHash(
        changed,
      )}`,
  };
}

function mutateDisplayValue(
  bundle: FaceCharacterGroundingBundleV1,
): FaceCharacterGroundingBundleV1 {
  const first = bundle.units[0];
  if (first === undefined) {
    throw new Error(
      'fixture must contain Character grounding unit',
    );
  }

  const displayValue =
    first.displayValue.kind === 'scalar'
      ? {
          ...first.displayValue,
          value:
            first.displayValue.value +
            0.01,
        }
      : {
          ...first.displayValue,
          axes:
            first.displayValue.axes.map(
              (axis, index) =>
                index === 0
                  ? {
                      ...axis,
                      value:
                        axis.value +
                        0.01,
                    }
                  : axis,
            ),
        };

  return rehashBundle(bundle, {
    units: [
      {
        ...first,
        displayValue,
      },
      ...bundle.units.slice(1),
    ],
  });
}

describe(
  'TOPIC-FACE-005A source-owned Face Character handoff admission',
  () => {
    it('projects structure into exactly four Character-safe neutral units', () => {
      const { pipeline } =
        sourcePipeline();

      expect(
        pipeline.characterGrounding.units,
      ).toHaveLength(4);
      expect(
        pipeline.characterGrounding.units.map(
          (unit) => unit.capabilityKey,
        ).sort(),
      ).toEqual([
        'chin_lower_face.visible_width_ratio',
        'eye.width_height_ratio',
        'mouth.width_and_relative_size',
        'nose.alar_width_and_nostril_geometry',
      ]);

      expect(
        pipeline.characterGrounding.units.every(
          (unit) =>
            unit.kind ===
              'neutral_observation' &&
            unit.realizationPolicyRef ===
              'bounded_neutral_fact_render_v1',
        ),
      ).toBe(true);

      expect(
        pipeline.characterGroundingRef,
      ).toEqual(
        buildFaceCharacterGroundingBundleRefV1(
          pipeline.characterGrounding,
        ),
      );
    });

    it('binds every Character unit to the existing grounding unit and admitted display fact', () => {
      const { pipeline } =
        sourcePipeline();

      for (
        const unit
        of pipeline.characterGrounding.units
      ) {
        const grounding =
          pipeline.projection.grounding
            .observationUnits.find(
              (candidate) =>
                candidate.unitId ===
                unit.unitId,
            );
        const fact =
          pipeline.displayFacts.facts.find(
            (candidate) =>
              candidate.factRef ===
              unit.displayFactRef,
          );

        expect(grounding).toBeDefined();
        expect(fact).toBeDefined();
        expect(unit.observationRef).toBe(
          grounding?.observationRef,
        );
        expect(unit.observationRef).toBe(
          fact?.observationRef,
        );
        expect(unit.capabilityKey).toBe(
          grounding?.capabilityKey,
        );
        expect(unit.capabilityKey).toBe(
          fact?.capabilityKey,
        );
        expect(unit.displayValue).toEqual(
          fact?.value,
        );
      }
    });

    it('keeps FR293 authority superset filtering upstream and exposes only Topic-authorized units', () => {
      const { pipeline } =
        sourcePipeline();

      expect(
        pipeline.characterGrounding.units,
      ).toHaveLength(
        pipeline.projection
          .selectedObservationRefs.length,
      );
      expect(
        pipeline.characterGrounding.units,
      ).toHaveLength(
        pipeline.displayFacts.facts.length,
      );
      expect(
        pipeline.characterGrounding.units,
      ).toHaveLength(4);
    });

    it('keeps extended eligible while preserving forehead as unavailable', () => {
      const { pipeline } =
        sourcePipeline(EXTENDED_TOPIC);

      expect(
        pipeline.characterGrounding
          .readinessState,
      ).toBe('partial');
      expect(
        pipeline.characterGrounding.units,
      ).toHaveLength(4);
      expect(
        pipeline.characterGrounding
          .unavailableSections,
      ).toContain(
        'observation:forehead.visible_width_shape',
      );
      expect(
        evaluateFaceCharacterHandoffEligibility(
          {
            state: 'partial',
            characterGrounding:
              pipeline.characterGrounding,
            characterGroundingRef:
              pipeline.characterGroundingRef,
          },
        ),
      ).toEqual({
        state: 'eligible',
        mode:
          'neutral_fact_realization',
        bundleRef:
          pipeline.characterGroundingRef,
      });
    });

    it('keeps Three-Divisions not eligible while Product authority is blocked', () => {
      const blocked =
        planFaceTopicExecution(
          {
            topicKey:
              THREE_DIVISIONS_TOPIC,
            observationArtifactRef:
              ARTIFACT,
            requestId:
              'request:topic-face-005a:blocked',
          },
          authoritySnapshot,
        );

      expect(blocked.authorized).toBe(false);
      expect(
        evaluateFaceCharacterHandoffEligibility(
          { state: 'blocked' },
        ),
      ).toEqual({
        state: 'not_eligible',
        reason: 'source_blocked',
      });
    });

    it('admits a source-built bundle and rejects a self-consistent bundle forged away from the admitted source', () => {
      const { pipeline } =
        sourcePipeline();

      expect(
        admitFaceCharacterGroundingBundleV1(
          pipeline.characterGrounding,
          {
            projection:
              pipeline.projection,
            displayFacts:
              pipeline.displayFacts,
          },
        ),
      ).toBe(
        pipeline.characterGrounding,
      );

      const forged =
        mutateDisplayValue(
          pipeline.characterGrounding,
        );

      expect(() =>
        assertFaceCharacterGroundingBundleV1(
          forged,
        ),
      ).not.toThrow();

      expect(() =>
        admitFaceCharacterGroundingBundleV1(
          forged,
          {
            projection:
              pipeline.projection,
            displayFacts:
              pipeline.displayFacts,
          },
        ),
      ).toThrow(
        'FACE_CHARACTER_GROUNDING_SOURCE_ADMISSION_MISMATCH',
      );
    });

    it('rejects grounding, display, projection and bundle identity tampering', () => {
      const { pipeline } =
        sourcePipeline();
      const bundle =
        pipeline.characterGrounding;

      for (const forged of [
        {
          ...bundle,
          groundingHash:
            `face-grounding:${'0'.repeat(
              64,
            )}`,
        },
        {
          ...bundle,
          displayFactsHash:
            `face-display-facts:${'0'.repeat(
              64,
            )}`,
        },
        {
          ...bundle,
          projectionHash:
            `face-product-projection:${'0'.repeat(
              64,
            )}`,
        },
        {
          ...bundle,
          bundleHash:
            `face-character-grounding:${'0'.repeat(
              64,
            )}`,
        },
      ]) {
        expect(() =>
          assertFaceCharacterGroundingBundleV1(
            forged,
          ),
        ).toThrow();
      }
    });

    it('rejects duplicate bindings, unknown policy and removed prohibitions', () => {
      const { pipeline } =
        sourcePipeline();
      const bundle =
        pipeline.characterGrounding;
      const first =
        bundle.units[0];
      if (first === undefined) {
        throw new Error(
          'fixture must contain unit',
        );
      }

      expect(() =>
        assertFaceCharacterGroundingBundleV1(
          rehashBundle(bundle, {
            units: [
              first,
              first,
              ...bundle.units.slice(1),
            ],
          }),
        ),
      ).toThrow(
        'FACE_CHARACTER_GROUNDING_DUPLICATE_BINDING',
      );

      expect(() =>
        assertFaceCharacterGroundingBundleV1(
          rehashBundle(bundle, {
            units: [
              {
                ...first,
                realizationPolicyRef:
                  'unknown-policy',
              } as unknown as typeof first,
              ...bundle.units.slice(1),
            ],
          }),
        ),
      ).toThrow(
        'FACE_CHARACTER_GROUNDING_POLICY_INVALID',
      );

      expect(
        bundle.prohibitedInferences.length,
      ).toBeGreaterThan(0);
      expect(() =>
        assertFaceCharacterGroundingBundleV1(
          rehashBundle(bundle, {
            units: [
              {
                ...first,
                prohibitedExtensions:
                  first.prohibitedExtensions.filter(
                    (value) =>
                      value !==
                      bundle
                        .prohibitedInferences[0],
                  ),
              },
              ...bundle.units.slice(1),
            ],
          }),
        ),
      ).toThrow(
        'FACE_CHARACTER_GROUNDING_PROHIBITION_REMOVED',
      );
    });

    it('rejects observation/capability/display binding drift through positive source admission', () => {
      const { pipeline } =
        sourcePipeline();
      const bundle =
        pipeline.characterGrounding;
      const first =
        bundle.units[0];
      if (first === undefined) {
        throw new Error(
          'fixture must contain unit',
        );
      }

      for (const changedUnit of [
        {
          ...first,
          observationRef:
            'face-neutral-observation:v1:forged',
        },
        {
          ...first,
          capabilityKey:
            'eye.forged_capability',
        },
        {
          ...first,
          displayFactRef:
            'face-display-fact:v1:forged',
        },
      ]) {
        const forged =
          rehashBundle(bundle, {
            units: [
              changedUnit,
              ...bundle.units.slice(1),
            ],
          });

        expect(() =>
          admitFaceCharacterGroundingBundleV1(
            forged,
            {
              projection:
                pipeline.projection,
              displayFacts:
                pipeline.displayFacts,
            },
          ),
        ).toThrow(
          'FACE_CHARACTER_GROUNDING_SOURCE_ADMISSION_MISMATCH',
        );
      }
    });

    it('rejects semantic, privacy, Character and Commerce widening on the Character source artifact', () => {
      const { pipeline } =
        sourcePipeline();
      const bundle =
        pipeline.characterGrounding;

      for (const injected of [
        {
          personalityClaim:
            'forbidden',
        },
        {
          fortuneClaim:
            'forbidden',
        },
        {
          rawImage:
            'data:image/jpeg;base64,forbidden',
        },
        {
          rawLandmarks: [
            [0.1, 0.2],
          ],
        },
        {
          faceEmbedding: [0.1],
        },
        {
          characterId:
            'character:forbidden',
        },
        {
          relationshipState:
            'forbidden',
        },
        {
          price: 9900,
        },
        {
          offer: 'forbidden',
        },
        {
          entitlement: true,
        },
      ]) {
        expect(() =>
          assertFaceCharacterGroundingBundleV1(
            {
              ...bundle,
              ...injected,
            },
          ),
        ).toThrow();
      }
    });

    it('keeps Character source identity stable across requestId-only transport changes', async () => {
      const harness =
        createTopicFaceE2EHarness();

      const first =
        await harness.runtimeHost.execute({
          topicKey:
            STRUCTURE_TOPIC,
          observationArtifactRef:
            ARTIFACT,
          requestId:
            'request:topic-face-005a:a',
        });
      const second =
        await harness.runtimeHost.execute({
          topicKey:
            STRUCTURE_TOPIC,
          observationArtifactRef:
            ARTIFACT,
          requestId:
            'request:topic-face-005a:b',
        });

      expect(first.state).toBe('ready');
      expect(second.state).toBe('ready');
      if (
        first.state !== 'ready' ||
        second.state !== 'ready'
      ) {
        throw new Error(
          'expected ready runtime results',
        );
      }

      expect(
        first.characterGrounding,
      ).toEqual(
        second.characterGrounding,
      );
      expect(
        first.characterGroundingRef,
      ).toEqual(
        second.characterGroundingRef,
      );
    });

    it('keeps Product snapshot identity Character-neutral and hides handoff internals from Product DTOs', async () => {
      const harness =
        createTopicFaceE2EHarness();
      const response =
        await harness.api.analyze({
          topicKey:
            STRUCTURE_TOPIC,
          observationArtifactRef:
            ARTIFACT,
          requestId:
            'request:topic-face-005a:product',
        });

      expect(response.state).toBe('ready');
      if (response.state !== 'ready') {
        throw new Error(
          'expected ready Product response',
        );
      }

      const snapshot =
        harness.historyStore
          .savedSnapshots[0];
      expect(snapshot).toBeDefined();

      const keys =
        collectNormalizedKeys({
          response,
          snapshot,
        });

      for (const forbidden of [
        'charactergrounding',
        'charactergroundingref',
        'bundlehash',
        'realizationpolicy',
        'prohibitedextensions',
        'characterid',
        'relationshipstate',
      ]) {
        expect(
          [...keys].some((key) =>
            key.includes(forbidden),
          ),
        ).toBe(false);
      }

      expect(
        snapshot?.resultRef,
      ).toBe(
        response.result.resultRef,
      );
    });

    it('builds and validates a stable source ref with no character-specific material', () => {
      const { pipeline } =
        sourcePipeline();

      const ref =
        buildFaceCharacterGroundingBundleRefV1(
          pipeline.characterGrounding,
        );

      expect(() =>
        assertFaceCharacterGroundingBundleRefV1(
          ref,
          pipeline.characterGrounding,
        ),
      ).not.toThrow();

      expect(
        Object.keys(ref).sort(),
      ).toEqual([
        'bundleHash',
        'displayFactsHash',
        'groundingHash',
        'projectionHash',
        'projectionVersion',
        'schemaVersion',
        'sourceResultHash',
        'topicKey',
      ]);
    });
  },
);
