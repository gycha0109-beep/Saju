import { describe, expect, test } from 'vitest';
import { GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS } from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES,
} from '../src/research/general-natal-geju-branch-meeting-source-evidence.js';
import {
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION,
} from '../src/research/general-natal-geju-co-use-affinity-source-evidence.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
} from '../src/research/general-natal-geju-source-semantic-use-identity.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_DECISION,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
  buildGeneralNatalGejuBranchMeetingSelectionEffectAdmissionReview,
} from '../src/research/general-natal-geju-branch-meeting-selection-effect-admission-review.js';

describe('General Natal Gyeokguk branch-meeting selection-effect admission review', () => {
  test('freezes the current direct-source boundary without admitting generalized meeting effect', () => {
    const review = buildGeneralNatalGejuBranchMeetingSelectionEffectAdmissionReview();

    expect(GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION).toBe(
      '0.1.0-research',
    );
    expect(review.decision).toBe(
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_DECISION,
    );
    expect(review.sourceAlignedBranchMeetingStructuralEvidenceAuthorized).toBe(true);
    expect(review.directSourceMeetingResultWordingObserved).toBe(true);
    expect(review.sourcePluralCoUseBoundaryObserved).toBe(true);
    expect(review.directSourceAffinityExemplarEvidenceObserved).toBe(true);
    expect(review.directSourceMeetingUseIdentityObserved).toBe(true);
    expect(review.canonicalTransformationEstablished).toBe(false);
    expect(review.postInteractionEffectiveBureau).toBe('unresolved');
    expect(review.branchMeetingSelectionEffectAuthorized).toBe(false);
  });

  test('chains exactly to the three merged upstream research authorities', () => {
    const review = buildGeneralNatalGejuBranchMeetingSelectionEffectAdmissionReview();

    expect(review.upstreamBranchMeetingEvidenceVersion).toBe(
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
    );
    expect(review.upstreamBranchMeetingEvidenceDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_DEFINITION_HASH,
    );
    expect(review.upstreamCoUseAffinityEvidenceVersion).toBe(
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION,
    );
    expect(review.upstreamCoUseAffinityEvidenceDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_DEFINITION_HASH,
    );
    expect(review.upstreamSemanticUseIdentityVersion).toBe(
      GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
    );
    expect(review.upstreamSemanticUseIdentityDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
    );
  });

  test('separates direct meeting wording, co-use quality, and source-use identity evidence', () => {
    const review = buildGeneralNatalGejuBranchMeetingSelectionEffectAdmissionReview();

    expect(review.evidence.map((item) => item.key)).toEqual([
      'source_aligned_meeting_result_wording',
      'source_plural_co_use_and_affinity_wording',
      'source_direct_meeting_use_identity',
    ]);
    expect(review.evidence.every((item) => item.directSourceSemanticRelevanceObserved)).toBe(true);
    expect(review.evidence.every((item) => !item.canonicalTransformationEstablished)).toBe(true);
    expect(review.evidence.every((item) => !item.generalizedPostInteractionEffectAuthorized)).toBe(
      true,
    );
  });

  test('preserves all four branch-meeting direct source anchors as evidence inventory', () => {
    const review = buildGeneralNatalGejuBranchMeetingSelectionEffectAdmissionReview();

    expect(review.sourceIds).toEqual(
      expect.arrayContaining([
        GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.chenWaterMeeting.sourceId,
        GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.chouMetalMeeting.sourceId,
        GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.weiWoodMeeting.sourceId,
        GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_REFERENCES.xuFireMeeting.sourceId,
      ]),
    );
  });

  test('does not manufacture interaction settlement from structural or source-exemplar evidence', () => {
    const review = buildGeneralNatalGejuBranchMeetingSelectionEffectAdmissionReview();

    expect(review.clashDamageSettlementAuthorized).toBe(false);
    expect(review.competingInteractionSettlementAuthorized).toBe(false);
    expect(review.generalizedMeetingSurvivalPredicateAuthorized).toBe(false);
    expect(review.branchMeetingSelectionEffectAuthorized).toBe(false);
    expect(review.candidateDerivationAuthorized).toBe(false);
    expect(review.establishmentPredicateAuthorized).toBe(false);
    expect(review.candidateFactsEmitted).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
  });

  test('keeps all five coarse Gyeokguk authority gaps open', () => {
    const review = buildGeneralNatalGejuBranchMeetingSelectionEffectAdmissionReview();

    expect(review.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(review.openPredicateGaps).toHaveLength(5);
    expect(review.openPredicateGaps).toContain('BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING');
  });

  test('is deterministic and content-addressed', () => {
    const first = buildGeneralNatalGejuBranchMeetingSelectionEffectAdmissionReview();
    const second = buildGeneralNatalGejuBranchMeetingSelectionEffectAdmissionReview();

    expect(first).toEqual(second);
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.reviewId).toMatch(
      /^general_natal_geju_branch_meeting_selection_effect_admission_review_[0-9a-f]{24}$/,
    );
    expect(
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
    ).toHaveLength(64);
  });
});
