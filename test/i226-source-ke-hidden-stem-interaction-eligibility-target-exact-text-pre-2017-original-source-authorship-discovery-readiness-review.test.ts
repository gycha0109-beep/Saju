import { describe, expect, it } from 'vitest';
import type { I225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReviewReport } from '../src/research/i225-source-ke-hidden-stem-interaction-eligibility-single-source-authority-admissibility-acquisition-evidence-adequacy-residual-gap-reassessment-review.js';
import {
  I226_RARE_TARGET_PHRASES,
  I226_TARGET_EXACT_TEXT_DISCOVERY_CONTROL_IDS,
  I226_TARGET_EXACT_TEXT_DISCOVERY_PATH_IDS,
  buildI226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReview,
} from '../src/research/i226-source-ke-hidden-stem-interaction-eligibility-target-exact-text-pre-2017-original-source-authorship-discovery-readiness-review.js';

const validI225 = (): I225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReviewReport =>
  ({
    reviewId: 'i225_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW',
    decision:
      'I224_EVIDENCE_ADEQUATE_FOR_LIMITED_FINDINGS_FOUR_ADMISSIBILITY_GAPS_REMAIN_TARGET_SPECIFIC_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_LINEAGE_AND_DERIVATIVE_DISCOVERY_PRIORITIZED_RESTRICTIVE_CONFLICT_ADJUDICATION_DEFERRED_NO_PROMOTION',
    exactI224BoundaryAccepted: true,
    targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    sevenRequirementCoverageAcceptedAsUpstreamFinding: true,
    coverageReevaluationAuthorizedByThisGate: false,
    I224LimitedEvidenceFindingsAdequate: true,
    targetPublicationObjectIdentityFindingAccepted: true,
    sameAccountRepublicationCautionFindingAccepted: true,
    laterMirrorRedistributionLeadFindingAccepted: true,
    restrictiveDoctrineConflictFindingAccepted: true,
    targetRuleBearingContentObserved: true,
    targetRuleBearingContentObservationMayEstablishNormativeAuthority: false,
    exactTargetOriginalAuthorshipStillUnresolved: true,
    exactTargetDoctrinalLineageStillUnresolved: true,
    exactTargetPriorSourceDependencyStillUnresolved: true,
    restrictiveDoctrineSchoolBoundaryStillUnresolved: true,
    unresolvedAdmissibilityGapCount: 4,
    residualDiscoveryPriorityCount: 4,
    broadEquivalentSearchRepetitionJustified: false,
    targetSpecificPre2017OriginalSourceDiscoveryJustified: true,
    restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished: true,
    absenceOfPre2017WitnessCreatesNegativeFinding: false,
    corpusExhaustionClaimed: false,
    authorshipMayBeInferredFromSohuAccount: false,
    derivativeRelationshipMayBeInferredFromLaterMirrors: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    doctrinalConflictPreserved: true,
    doctrinalConflictResolvedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeLineageAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW',
  }) as unknown as I225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReviewReport;

describe('I226 hidden-stem target exact-text pre-2017 origin discovery readiness', () => {
  it('accepts the exact I225 residual boundary without reopening coverage', () => {
    const report = buildI226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReview(validI225());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW',
    );
    expect(report.targetCandidateId).toBe('LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML');
    expect(report.targetPublicationDate).toBe('2017-02-02');
    expect(report.sevenRequirementCoverageAcceptedAsUpstreamFinding).toBe(true);
    expect(report.coverageReevaluationAuthorizedByThisGate).toBe(false);
  });

  it('freezes five target-specific discovery paths and seventeen controls', () => {
    const report = buildI226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReview(validI225());
    expect(report.discoveryPathIds).toEqual(I226_TARGET_EXACT_TEXT_DISCOVERY_PATH_IDS);
    expect(report.discoveryPathCount).toBe(5);
    expect(report.discoveryControlIds).toEqual(I226_TARGET_EXACT_TEXT_DISCOVERY_CONTROL_IDS);
    expect(report.discoveryControlCount).toBe(17);
    expect(report.discoveryControlsFrozen).toBe(true);
  });

  it('freezes four rare exact-target search phrases', () => {
    const report = buildI226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReview(validI225());
    expect(report.rareTargetPhrases).toEqual(I226_RARE_TARGET_PHRASES);
    expect(report.rareTargetPhraseCount).toBe(4);
    expect(report.rareTargetPhrases).toContain('也可论子中癸克巳中丙');
    expect(report.rareTargetPhrases).toContain('如果克方被外力引动，并有力而动');
  });

  it('requires target-specific predecessor, archive, book-course, lineage and dated-republication paths', () => {
    const report = buildI226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReview(validI225());
    expect(report.targetSpecificDiscoveryAuthorized).toBe(true);
    expect(report.targetSpecificDiscoveryExecutedByThisGate).toBe(false);
    expect(report.exactRarePhrasePre2017SearchRequired).toBe(true);
    expect(report.sohuPart1ArchiveAttributionTraceRequired).toBe(true);
    expect(report.pre2017BookOrCourseExactPassageMatchRequired).toBe(true);
    expect(report.namedLineageExactPassageBindingRequired).toBe(true);
    expect(report.dateVerifiedEarlyRepublicationTraceRequired).toBe(true);
    expect(report.directlyOpenedOrSourceBoundContextRequiredForPositivePredecessorFinding).toBe(true);
  });

  it('rejects adjacent theory, name matching, later mirrors and account names as target-origin proof', () => {
    const report = buildI226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReview(validI225());
    expect(report.adjacentTheoryMayEstablishTargetPredecessor).toBe(false);
    expect(report.authorNameMatchMayEstablishTargetLineage).toBe(false);
    expect(report.laterMirrorMayEstablishPriorDependency).toBe(false);
    expect(report.sohuAccountMayEstablishOriginalAuthorship).toBe(false);
    expect(report.alternatePositiveLineageMayBackfillTargetLineage).toBe(false);
    expect(report.searchSnippetMayEstablishPositivePredecessorFinding).toBe(false);
  });

  it('performs no origin, lineage, derivative or conflict adjudication', () => {
    const report = buildI226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReview(validI225());
    expect(report.exactTargetOriginalAuthorshipEstablishedByThisGate).toBe(false);
    expect(report.exactTargetDoctrinalLineageEstablishedByThisGate).toBe(false);
    expect(report.exactTargetPriorSourceDependencyEstablishedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.restrictiveDoctrineConflictAdjudicatedByThisGate).toBe(false);
    expect(report.discoverySilenceCreatesNegativeFinding).toBe(false);
    expect(report.corpusExhaustionClaimed).toBe(false);
  });

  it('preserves authority, provenance and production guards', () => {
    const report = buildI226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReview(validI225());
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed when the I225 residual boundary changes', () => {
    const invalid: I225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReviewReport = {
      ...validI225(),
      residualDiscoveryPriorityCount: 0,
    };
    const report = buildI226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReview(invalid);
    expect(report.status).toBe('I225_RESIDUAL_GAP_BOUNDARY_INVALID');
    expect(report.targetCandidateId).toBeNull();
    expect(report.discoveryPathCount).toBe(0);
    expect(report.discoveryControlCount).toBe(0);
    expect(report.rareTargetPhraseCount).toBe(0);
    expect(report.targetSpecificDiscoveryAuthorized).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
