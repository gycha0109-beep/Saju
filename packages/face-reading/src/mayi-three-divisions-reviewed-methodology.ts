import type { FaceAuthorityRegistry, FaceMethodologyDefinition } from './contracts.js';
import { FACE_AUTHORITY_RESEARCH_REGISTRY_V0 } from './research-pack-v0.js';
import { FACE_TRADITIONAL_T3_SUCCESSOR_PASSAGES } from './traditional-three-divisions-source-witnesses-t3.js';
import { FACE_TRADITIONAL_T4_METHODOLOGIES } from './traditional-three-divisions-methodology-t4.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

export const MAYI_THREE_DIVISIONS_METHODOLOGY_REVIEW_DECISION = Object.freeze({
  decisionId: 'decision.face.mayi.three_divisions.methodology_review',
  version: '0.1.0',
  decisionScope: 'methodology_review_promotion',
  targetMethodologyRef: 'method.mayi.face_three_divisions.fr261@0.2.0',
  proposedSuccessorRef: 'method.mayi.face_three_divisions.fr261@0.3.0',
  sourceSnapshotHash:
    'face-traditional-review-source:f4bbaa5e03d373406f85f5442d97c5f61116f58e433bb6563a0fde1c43404413',
  reviewPacketHash:
    'face-traditional-review-packet:0868afd3f6bf9457bd92cfcf3f01472b77aa7c065acc506cf921152d3a42dc9b',
  authorityActorRef: 'actor.myeongha.project_owner@0.1.0',
  outcome: 'approved_for_reviewed_promotion',
  explicitProjectOwnerDecisionEvidencePresent: true,
  evidenceRefs: Object.freeze([
    'repo:governance/face-reading/mayi-three-divisions-project-owner-methodology-approval-v1.md',
  ]),
} as const);

const predecessor = FACE_TRADITIONAL_T4_METHODOLOGIES.find(
  (entry) =>
    `${entry.methodologyId}@${entry.version}` ===
    MAYI_THREE_DIVISIONS_METHODOLOGY_REVIEW_DECISION.targetMethodologyRef,
);
if (predecessor === undefined)
  throw new FaceAuthorityValidationError('Approved Mayi review predecessor is missing.');

const source = FACE_TRADITIONAL_T3_SUCCESSOR_PASSAGES.find(
  (entry) => entry.passageId === predecessor.sourceRefs[0],
);
if (source === undefined)
  throw new FaceAuthorityValidationError('Approved Mayi source passage is missing.');

const registeredPredecessor: FaceMethodologyDefinition = Object.freeze({
  ...predecessor,
  sourceRefs: Object.freeze([...predecessor.sourceRefs]),
  limitations: Object.freeze([...predecessor.limitations]),
});

/** Exact proposal: only version/reviewStatus differ from the immutable predecessor. */
export const MAYI_THREE_DIVISIONS_REVIEWED_SUCCESSOR: FaceMethodologyDefinition = Object.freeze({
  ...registeredPredecessor,
  version: '0.3.0',
  reviewStatus: 'reviewed',
});

/** Versioned registry extension; existing research packs/rules are not rebound. */
export const FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY: FaceAuthorityRegistry =
  Object.freeze({
    ...FACE_AUTHORITY_RESEARCH_REGISTRY_V0,
    passages: Object.freeze([
      ...FACE_AUTHORITY_RESEARCH_REGISTRY_V0.passages,
      Object.freeze({ ...source }),
    ]),
    methodologies: Object.freeze([
      ...FACE_AUTHORITY_RESEARCH_REGISTRY_V0.methodologies,
      registeredPredecessor,
      MAYI_THREE_DIVISIONS_REVIEWED_SUCCESSOR,
    ]),
  });

export function getReviewedMayiThreeDivisionsMethodology(): FaceMethodologyDefinition {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY);
  const definition = FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY.methodologies.find(
    (entry) =>
      `${entry.methodologyId}@${entry.version}` ===
      MAYI_THREE_DIVISIONS_METHODOLOGY_REVIEW_DECISION.proposedSuccessorRef,
  );
  if (definition === undefined || definition.reviewStatus !== 'reviewed') {
    throw new FaceAuthorityValidationError('Approved Mayi reviewed successor is not registered.');
  }
  return definition;
}
