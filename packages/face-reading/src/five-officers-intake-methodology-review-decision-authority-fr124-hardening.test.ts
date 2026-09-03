import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124,
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124,
  validateMethodologyReviewDecisionRegistryFR124,
  type FiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124V1,
  type MethodologyReviewDecisionRegistryFR124V1,
} from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

function syntheticRegistry(
  overrides: Partial<MethodologyReviewDecisionRegistryFR124V1['decisions'][number]> = {},
): MethodologyReviewDecisionRegistryFR124V1 {
  return {
    registryId: 'registry.face.methodology_review_decisions.synthetic',
    version: '0.1.0',
    decisions: [{
      decisionId: 'decision.face.methodology_review.synthetic_intake',
      version: '0.1.0',
      decisionScope: 'methodology_review_promotion',
      targetMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0',
      proposedSuccessorRef: 'method.shenxiang.five_officers.intake_criteria@0.3.0',
      sourceRefsSnapshot: ['passage.shenxiang.five_officers.intake.nlc_1925'],
      evidenceRefs: ['evidence.methodology_review.synthetic_only'],
      authorityActorRef: 'authority_actor.synthetic_only',
      outcome: 'approved_for_reviewed_promotion',
      ...overrides,
    }],
  };
}

describe('FR124 intake methodology review decision authority hardening', () => {
  it('rejects a forged issued artifact even when visible fields are copied', () => {
    const issued = assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124();
    const forged = structuredClone(issued) as FiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124V1;
    expect(() => assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124(forged)).toThrow(/FR-124/);
  });

  it('rejects source snapshot drift from the target research methodology', () => {
    const registry = syntheticRegistry({
      sourceRefsSnapshot: ['passage.shenxiang.five_officers.intake'],
    });
    expect(() => validateMethodologyReviewDecisionRegistryFR124(
      registry,
      FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
    )).toThrow(/sourceRefsSnapshot/);
  });

  it('rejects empty review evidence or authority actor provenance', () => {
    const noEvidence = syntheticRegistry({ evidenceRefs: [] });
    const noActor = syntheticRegistry({ authorityActorRef: '   ' });
    expect(() => validateMethodologyReviewDecisionRegistryFR124(
      noEvidence,
      FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
    )).toThrow(/evidenceRefs/);
    expect(() => validateMethodologyReviewDecisionRegistryFR124(
      noActor,
      FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
    )).toThrow(/authorityActorRef/);
  });

  it('rejects duplicate decision refs and duplicate target-successor promotion pairs', () => {
    const first = syntheticRegistry().decisions[0]!;
    const duplicateRef: MethodologyReviewDecisionRegistryFR124V1 = {
      registryId: 'registry.face.methodology_review_decisions.synthetic',
      version: '0.1.0',
      decisions: [first, { ...first }],
    };
    expect(() => validateMethodologyReviewDecisionRegistryFR124(
      duplicateRef,
      FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
    )).toThrow(/duplicate methodology review decision/);

    const duplicatePair: MethodologyReviewDecisionRegistryFR124V1 = {
      registryId: 'registry.face.methodology_review_decisions.synthetic',
      version: '0.1.0',
      decisions: [first, { ...first, decisionId: 'decision.face.methodology_review.synthetic_intake_second' }],
    };
    expect(() => validateMethodologyReviewDecisionRegistryFR124(
      duplicatePair,
      FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
    )).toThrow(/same methodology promotion pair/);
  });

  it('does not allow legacy reviewed scalar or source-verification checker identity to substitute for review-decision provenance', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124();
    expect(value.authorityBoundary.legacyReviewedScalarMeansReusableDecisionProvenance).toBe(false);
    expect(value.authorityBoundary.scanCheckedSourceMeansReviewApproval).toBe(false);
    expect(value.authorityBoundary.sourceVerificationCheckerMeansMethodologyReviewAuthorityActor).toBe(false);
    expect(value.admission.governedDecisionRecordPresent).toBe(false);
    expect(value.admission.reviewedPromotionAuthorized).toBe(false);
  });

  it('keeps decision provenance separate from metric, threshold, criterion-state, and claim authority', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124();
    expect(value.authorityBoundary.reviewDecisionMeansMetricBinding).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansThreshold).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansCriterionState).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansClaim).toBe(false);
    expect(value.authorityBoundary.historicalArtifactMutated).toBe(false);
  });
});
