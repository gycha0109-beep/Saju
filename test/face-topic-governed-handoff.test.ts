import { describe, expect, it } from 'vitest';
import { buildFaceAuthorityCoverageSnapshot } from '../src/face-topic/authority.js';
import { planFaceTopicExecution } from '../src/face-topic/execution.js';
import {
  assertFaceGovernedInterpretationHandoffMatchesSourceV1,
  buildFaceGovernedInterpretationHandoffV1,
} from '../src/face-topic/governed-interpretation-handoff.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRepositoryFaceAuthorityReceiptForTopicFaceTest } from './support/topic-face-live-authority-source.js';
import { syntheticGovernedFaceSource } from './support/topic-face-governed-synthetic.js';

function eligible() {
  const source = syntheticGovernedFaceSource();
  const result = buildFaceGovernedInterpretationHandoffV1(source);
  if (result.state !== 'eligible') throw new Error('Expected synthetic eligible handoff');
  return { source, handoff: result.handoff };
}

describe('TOPIC-FACE-005K source-owned governed handoff (synthetic contract only)', () => {
  it('pins the deterministic, wire-compatible canonical TEST ONLY fixture', async () => {
    const { source, handoff } = eligible();
    expect(buildFaceGovernedInterpretationHandoffV1(structuredClone(source))).toEqual({
      state: 'eligible',
      handoff,
    });
    expect(handoff.units).toEqual(
      source.receipt.semanticClaims.map((claim) => claim.governedInterpretation),
    );
    expect(Object.isFrozen(handoff.units[0]?.conditions)).toBe(true);
    await expect(
      JSON.stringify({ classification: 'synthetic_contract_only', source, handoff }, null, 2) +
        '\n',
    ).toMatchFileSnapshot('./fixtures/saju-face-governed-v1.json');
  });

  it('does not authorize the actual blocked Three Divisions topic', () => {
    const source = syntheticGovernedFaceSource();
    const authorityReceipt = buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
    const plan = planFaceTopicExecution(
      {
        topicKey: 'face.reading.three_divisions',
        observationArtifactRef: 'test-only:blocked',
        requestId: 'test-only:blocked',
      },
      buildFaceAuthorityCoverageSnapshot(authorityReceipt),
    );
    expect(buildFaceGovernedInterpretationHandoffV1({ ...source, authorityReceipt, plan })).toEqual(
      { state: 'not_eligible', reason: 'source_blocked' },
    );
  });

  it('never promotes neutral topics', () => {
    const source = syntheticGovernedFaceSource();
    const authorityReceipt = buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
    const plan = planFaceTopicExecution(
      {
        topicKey: 'face.discover.structure',
        requestId: 'test-only:neutral',
        observationArtifactRef: 'test-only:neutral',
      },
      buildFaceAuthorityCoverageSnapshot(authorityReceipt),
    );
    if (!plan.authorized) throw new Error('Expected neutral plan');
    expect(
      buildFaceGovernedInterpretationHandoffV1({
        authorityReceipt,
        plan,
        receipt: {
          ...source.receipt,
          executionPlanHash: plan.executionPlanHash,
          authoritySnapshotId: plan.authoritySnapshotId,
          requestId: plan.requestId,
          observationArtifactRef: plan.observationArtifactRef,
          executionKind: plan.executionKind,
          methodologyPackRefs: [],
          bindingGroupRefs: [],
          observations: plan.requiredObservationCapabilities.map((capabilityKey, index) => ({
            kind: 'neutral_observation',
            capabilityKey,
            observationRef: `test-only:neutral:${index}`,
            qualifiers: [],
            provenanceRefs: [],
          })),
          semanticClaims: [],
          approvedNarrativeBlocks: [],
        },
      }),
    ).toEqual({ state: 'not_eligible', reason: 'neutral_topic' });
  });

  it('requires a separate source publication decision even with semantic readiness', () => {
    const source = syntheticGovernedFaceSource();
    delete (source.authorityReceipt.traditional as { characterPublicationDecision?: unknown })
      .characterPublicationDecision;
    const plan = planFaceTopicExecution(
      {
        topicKey: source.plan.topicKey,
        requestId: source.plan.requestId,
        observationArtifactRef: source.plan.observationArtifactRef,
      },
      buildFaceAuthorityCoverageSnapshot(source.authorityReceipt),
    );
    if (!plan.authorized) throw new Error('Expected semantic readiness');
    expect(
      buildFaceGovernedInterpretationHandoffV1({
        ...source,
        plan,
        receipt: {
          ...source.receipt,
          executionPlanHash: plan.executionPlanHash,
          authoritySnapshotId: plan.authoritySnapshotId,
        },
      }),
    ).toEqual({ state: 'not_eligible', reason: 'publication_not_authorized' });
  });

  it('leaves legacy claims with no governed metadata ineligible', () => {
    const source = syntheticGovernedFaceSource();
    const claim = source.receipt.semanticClaims[0]!;
    const { governedInterpretation: _unused, ...legacy } = claim;
    void _unused;
    expect(
      buildFaceGovernedInterpretationHandoffV1({
        ...source,
        receipt: { ...source.receipt, semanticClaims: [legacy] },
      }),
    ).toEqual({ state: 'not_eligible', reason: 'metadata_incomplete' });
  });

  it.each(['lensKey', 'direction', 'evidenceStatus', 'conditions', 'bindingRefs', 'sourceRefs'])(
    'rejects incomplete source metadata: %s',
    (key) => {
      const source = structuredClone(syntheticGovernedFaceSource());
      delete (
        source.receipt.semanticClaims[0]!.governedInterpretation as unknown as Record<
          string,
          unknown
        >
      )[key];
      expect(() => buildFaceGovernedInterpretationHandoffV1(source)).toThrow(/METADATA/);
    },
  );

  it.each(['observationRefs', 'bindingRefs', 'evidenceRefs', 'sourceRefs'])(
    'rejects invented references: %s',
    (key) => {
      const source = structuredClone(syntheticGovernedFaceSource());
      (
        source.receipt.semanticClaims[0]!.governedInterpretation as unknown as Record<
          string,
          unknown
        >
      )[key] = ['test-only:invented'];
      expect(() => buildFaceGovernedInterpretationHandoffV1(source)).toThrow(/MISMATCH/);
    },
  );

  it('rejects source narrative widening and removed qualifiers', () => {
    const source = structuredClone(syntheticGovernedFaceSource());
    const unit = source.receipt.semanticClaims[0]!.governedInterpretation!;
    expect(() =>
      buildFaceGovernedInterpretationHandoffV1({
        ...source,
        receipt: {
          ...source.receipt,
          semanticClaims: [
            {
              ...source.receipt.semanticClaims[0]!,
              governedInterpretation: {
                ...unit,
                protectedMeaningText: 'Unapproved stronger claim',
              },
            },
          ],
        },
      }),
    ).toThrow(/MEANING_MISMATCH/);
    expect(() =>
      buildFaceGovernedInterpretationHandoffV1({
        ...source,
        receipt: {
          ...source.receipt,
          semanticClaims: [
            {
              ...source.receipt.semanticClaims[0]!,
              governedInterpretation: {
                ...unit,
                qualifiers: [],
              },
            },
          ],
        },
      }),
    ).toThrow(/QUALIFIER_REMOVED/);
  });

  it('preserves source conflict and rejects unilateral conflict resolution', () => {
    const source = structuredClone(syntheticGovernedFaceSource());
    const claim = source.receipt.semanticClaims[0]!;
    const result = buildFaceGovernedInterpretationHandoffV1({
      ...source,
      receipt: {
        ...source.receipt,
        semanticClaims: [
          {
            ...claim,
            governedInterpretation: {
              ...claim.governedInterpretation!,
              direction: 'source_conflict',
              evidenceStatus: 'source_conflict',
            },
          },
        ],
      },
    });
    expect(result.state === 'eligible' && result.handoff.units[0]?.direction).toBe(
      'source_conflict',
    );
    expect(() =>
      buildFaceGovernedInterpretationHandoffV1({
        ...source,
        receipt: {
          ...source.receipt,
          semanticClaims: [
            {
              ...claim,
              governedInterpretation: {
                ...claim.governedInterpretation!,
                direction: 'favorable',
                evidenceStatus: 'source_conflict',
              },
            },
          ],
        },
      }),
    ).toThrow(/CONFLICT/);
  });

  it('rejects stale authority and a publication decision added after planning', () => {
    const source = structuredClone(syntheticGovernedFaceSource());
    const decision = source.authorityReceipt.traditional.characterPublicationDecision!;
    expect(() =>
      buildFaceGovernedInterpretationHandoffV1({
        ...source,
        authorityReceipt: {
          ...source.authorityReceipt,
          traditional: {
            ...source.authorityReceipt.traditional,
            characterPublicationDecision: { ...decision, decisionRef: 'test-only:new-decision' },
          },
        },
      }),
    ).toThrow(/AUTHORITY_PLAN_MISMATCH/);
  });

  it.each(['protectedMeaningText', 'lensKey', 'direction', 'conditions', 'prohibitedExtensions'])(
    'rejects semantic tampering even after attacker recomputes the handoff hash: %s',
    (key) => {
      const { source, handoff } = eligible();
      const candidate = structuredClone(handoff);
      (candidate.units[0] as unknown as Record<string, unknown>)[key] = [
        'conditions',
        'prohibitedExtensions',
      ].includes(key)
        ? []
        : 'tampered';
      const { handoffHash: _hash, ...material } = candidate;
      void _hash;
      const tampered = {
        ...candidate,
        handoffHash: `face-governed-interpretation:${deterministicContentHash(material)}`,
      };
      expect(() =>
        assertFaceGovernedInterpretationHandoffMatchesSourceV1(tampered, source),
      ).toThrow(/MISMATCH/);
    },
  );

  it.each(['handoffHash', 'authorizationReceiptRef', 'sourceResultHash'])(
    'rejects %s tampering',
    (key) => {
      const { source, handoff } = eligible();
      expect(() =>
        assertFaceGovernedInterpretationHandoffMatchesSourceV1(
          { ...handoff, [key]: 'tampered' },
          source,
        ),
      ).toThrow(/MISMATCH/);
      expect(() =>
        assertFaceGovernedInterpretationHandoffMatchesSourceV1(handoff, source),
      ).not.toThrow();
    },
  );
});
