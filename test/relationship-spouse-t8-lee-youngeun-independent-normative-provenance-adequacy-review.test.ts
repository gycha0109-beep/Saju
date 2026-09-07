import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW_VERSION,
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_SOURCE_IDS,
  buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview,
} from '../src/research/relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE,
  buildRelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidence,
  type RelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidenceReport,
} from '../src/research/relationship-spouse-t8-lee-youngeun-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Lee Youngeun independent normative provenance adequacy review', () => {
  test('accepts Lee 2025 alone against the frozen normative-provenance requirement', () => {
    const report = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();

    expect(report.status).toBe(
      'RESOLVED_LEE_YOUNGEUN_2025_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW',
    );
    expect(report.decision).toBe(
      'LEE_YOUNGEUN_2025_SINGLE_SOURCE_ADEQUATE_FOR_INDEPENDENT_NORMATIVE_PROVENANCE_EXACTLY_TWO_OF_FIVE_GAPS_CLOSED',
    );
    expect(report.targetFrozenGapId).toBe('SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING');
    expect(report.targetPostPrimaryGapId).toBe('INDEPENDENT_NORMATIVE_PROVENANCE');
    expect(report.exactUpstreamEvidenceAccepted).toBe(true);
    expect(report.frozenNormativeProvenanceRequirementAccepted).toBe(true);
    expect(report.sourceIdsConsumed).toEqual(
      RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_SOURCE_IDS,
    );
    expect(report.sourceCountConsumed).toBe(1);
    expect(report.otherSourceSemanticEvidenceConsumed).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
  });

  test('requires reproducible identity exact locators direct context and source-authored spouse semantics', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();

    expect(candidate.kciArticleId).toBe('ART003175186');
    expect(candidate.doi).toBe('10.55793/jkhc.2025.24.305');
    expect(candidate.kyoboArticleId).toBe('4010070551816');
    expect(candidate.pdfSha256).toBe(
      '06114b29775f024520ae5683cc359a97d54bf2d6b2e0d5feb8557586d0768e61',
    );
    expect(candidate.printedToPhysicalPageMap.map((item) => item.printedPage)).toEqual(
      expect.arrayContaining([326, 332, 333]),
    );
    expect(report.sourceIdentityReproducible).toBe(true);
    expect(report.exactLocatorReproducible).toBe(true);
    expect(report.directOriginalOrVerifiedContextReviewed).toBe(true);
    expect(report.explicitSpouseSemanticBindingPresent).toBe(true);
    expect(report.explicitApplicabilityBoundaryPresent).toBe(true);
    expect(report.explicitContextAndExceptionTreatmentPresent).toBe(true);
    expect(report.sourceAuthoredNormativeModernProposalPresent).toBe(true);
  });

  test('does not inflate KCI listing into an uninspected article-specific peer-review record', () => {
    const report = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();

    expect(report.kciListedArticle).toBe(true);
    expect(report.articleSpecificPeerReviewRecordInspected).toBe(false);
    expect(report.peerReviewStatusInflatedByThisReview).toBe(false);
    expect(report.independentNormativeProvenanceEstablished).toBe(true);
  });

  test('closes only the independent normative provenance gap and keeps production on hold', () => {
    const report = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();

    expect(report.authorityGapStatus).toEqual({
      QUALIFYING_PRIMARY_WITNESS: 'CLOSED',
      INDEPENDENT_NORMATIVE_PROVENANCE: 'CLOSED',
      EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN',
      CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN',
      RELATIONSHIP_T6_INPUT: 'OPEN',
    });
    expect(report.authorityGapsClosedCount).toBe(2);
    expect(report.authorityGapsOpenCount).toBe(3);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('is deterministic and freezes the Lee-only no-stitching controls', () => {
    const first = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const second = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const { reviewId, ...material } = first;

    expect(first.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW_VERSION,
    );
    expect(second.reviewId).toBe(first.reviewId);
    expect(reviewId).toBe(
      `relationship_spouse_t8_lee_youngeun_normative_provenance_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(15);
    expect(first.controlsFrozen).toBe(true);
  });

  test('fails closed when the content-addressed Lee upstream boundary is altered', () => {
    const evidence = buildRelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidence();
    const tampered = {
      ...evidence,
      evidenceId: `${evidence.evidenceId}:tampered`,
    } as RelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidenceReport;
    const report =
      buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview(tampered);

    expect(report.status).toBe('UPSTREAM_LEE_YOUNGEUN_DIRECT_BODY_EVIDENCE_INVALID');
    expect(report.decision).toBe('INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_NOT_ESTABLISHED');
    expect(report.sourceCountConsumed).toBe(0);
    expect(report.independentNormativeProvenanceEstablished).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(0);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });
});
