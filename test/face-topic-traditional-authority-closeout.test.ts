import { describe, expect, it, vi } from 'vitest';
import { buildFaceAuthorityCoverageSnapshot } from '../src/face-topic/authority.js';
import { planFaceTopicExecution } from '../src/face-topic/execution.js';
import { resolveFaceTopicReadiness } from '../src/face-topic/readiness.js';
import { executeFaceTopicRuntime } from '../src/face-topic/runtime.js';
import { buildFaceGovernedInterpretationHandoffV1 } from '../src/face-topic/governed-interpretation-handoff.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { FACE_TRADITIONAL_T3_SUCCESSOR_PASSAGES } from '../packages/face-reading/src/traditional-three-divisions-source-witnesses-t3.js';
import { FACE_TRADITIONAL_T4_METHODOLOGIES } from '../packages/face-reading/src/traditional-three-divisions-methodology-t4.js';
import {
  FACE_TRADITIONAL_T6_PACK_CANDIDATE,
  FACE_TRADITIONAL_T6_PROMOTION_GATES,
} from '../packages/face-reading/src/traditional-three-divisions-methodology-pack-t6.js';
import { FACE_TRADITIONAL_T7_CLOSEOUT } from '../packages/face-reading/src/traditional-three-divisions-binding-handoff-t7.js';
import { T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005 } from '../packages/face-reading/src/traditional-three-divisions-binding-ledger-frb005.js';
import { buildRepositoryFaceAuthorityReceiptForTopicFaceTest } from './support/topic-face-live-authority-source.js';
import { syntheticGovernedFaceSource } from './support/topic-face-governed-synthetic.js';

const topicKey = 'face.reading.three_divisions';
const request = {
  topicKey,
  requestId: 'test-only:005l-review',
  observationArtifactRef: 'test-only:005l-observation',
};

describe('TOPIC-FACE-005L real source authority closure audit', () => {
  it('pins a concrete review packet without issuing a reviewed successor or production authority', async () => {
    const methodology = FACE_TRADITIONAL_T4_METHODOLOGIES.find(
      (entry) => entry.methodologyId === 'method.mayi.face_three_divisions.fr261',
    )!;
    expect(methodology.reviewStatus).toBe('research');
    const material = {
      passages: FACE_TRADITIONAL_T3_SUCCESSOR_PASSAGES,
      methodologies: FACE_TRADITIONAL_T4_METHODOLOGIES,
      pack: FACE_TRADITIONAL_T6_PACK_CANDIDATE,
      gates: FACE_TRADITIONAL_T6_PROMOTION_GATES,
      closeout: FACE_TRADITIONAL_T7_CLOSEOUT,
      bindingLedger: T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005,
    };
    const packet = {
      classification: 'review_proposal_only_not_authority',
      topicKey,
      researchMethodologyRef: `${methodology.methodologyId}@${methodology.version}`,
      proposedReviewedSuccessorRef: `${methodology.methodologyId}@0.3.0`,
      proposedReviewedSuccessorNotIssued: {
        ...methodology,
        version: '0.3.0',
        reviewStatus: 'reviewed',
      },
      targetSpecificProjectOwnerApprovalPresent: false,
      sourceSnapshotHash: `face-traditional-review-source:${deterministicContentHash(material)}`,
      sourceSnapshot: material,
    };
    const addressedPacket = {
      ...packet,
      reviewPacketHash: `face-traditional-review-packet:${deterministicContentHash(packet)}`,
    };
    await expect(JSON.stringify(addressedPacket, null, 2) + '\n').toMatchFileSnapshot(
      './fixtures/face-traditional-authority-review-packet.json',
    );
    expect(FACE_TRADITIONAL_T6_PACK_CANDIDATE.productionAuthorization).toBe(false);
    expect(FACE_TRADITIONAL_T7_CLOSEOUT.executableReadingAuthorized).toBe(false);
  });

  it('reports every real missing capability and preserves the unapproved binding/claim boundaries', () => {
    const receipt = buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
    const readiness = resolveFaceTopicReadiness(
      topicKey,
      buildFaceAuthorityCoverageSnapshot(receipt),
    );
    expect(readiness.state).toBe('blocked');
    expect(
      readiness.blockers.filter(
        (blocker) => blocker.code === 'REQUIRED_OBSERVATION_CAPABILITY_MISSING',
      ),
    ).toHaveLength(7);
    expect(readiness.blockers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'REQUIRED_BINDING_GROUP_NOT_READY',
          ref: 'face-bridge.frb005.three_divisions',
        }),
        expect.objectContaining({
          code: 'REQUIRED_SEMANTIC_CLAIM_FAMILY_MISSING',
          ref: 'face.claim.three_divisions',
        }),
      ]),
    );
    expect(receipt.traditional.characterPublicationDecision).toBeUndefined();
    expect(T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005.admittedTraditionalBindingCount).toBe(0);
  });

  it('blocks the real runtime before engine execution and never returns Character meaning', async () => {
    const loadProductDisplayReceipt = vi.fn(async () => {
      throw new Error('must not execute');
    });
    const result = await executeFaceTopicRuntime(request, {
      authorityProvider: {
        loadAuthorityReceipt: async () => buildRepositoryFaceAuthorityReceiptForTopicFaceTest(),
      },
      engineProvider: { loadProductDisplayReceipt },
    });
    expect(result.state).toBe('blocked');
    expect(loadProductDisplayReceipt).not.toHaveBeenCalled();
    expect(result).not.toHaveProperty('characterGrounding');
    expect(result).not.toHaveProperty('sourceResultHash');
  });

  it('cannot bypass missing authority by adding a publication decision alone', () => {
    const source = syntheticGovernedFaceSource();
    const receipt = buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
    const authorityReceipt = {
      ...receipt,
      traditional: {
        ...receipt.traditional,
        characterPublicationDecision:
          source.authorityReceipt.traditional.characterPublicationDecision!,
      },
    };
    const plan = planFaceTopicExecution(
      request,
      buildFaceAuthorityCoverageSnapshot(authorityReceipt),
    );
    expect(plan.authorized).toBe(false);
    expect(
      buildFaceGovernedInterpretationHandoffV1({ authorityReceipt, plan, receipt: source.receipt }),
    ).toEqual({ state: 'not_eligible', reason: 'source_blocked' });
  });
});
