import { describe, expect, it } from 'vitest';
import type { I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport } from '../src/research/i223-source-ke-hidden-stem-interaction-eligibility-single-source-authority-admissibility-targeted-evidence-acquisition-readiness-review.js';
import {
  buildI224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidence,
} from '../src/research/i224-source-ke-hidden-stem-interaction-eligibility-single-source-authority-admissibility-targeted-evidence-acquisition-evidence.js';

const validI223 = (): I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport =>
  ({
    reviewId: 'i223_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW',
    decision:
      'FOUR_ADMISSIBILITY_GAPS_FIVE_TARGETED_ACQUISITION_PATHS_SIXTEEN_CONTROLS_FROZEN_NO_ACQUISITION_EXECUTED_NO_ADMISSIBILITY_ADJUDICATED_NO_PROMOTION',
    exactI222BoundaryAccepted: true,
    targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    sevenRequirementCoverageAcceptedAsUpstreamFinding: true,
    coverageReevaluationAuthorizedByThisGate: false,
    unresolvedAdmissibilityGapIds: [
      'DOCTRINAL_AUTHORSHIP_OR_LINEAGE_ATTRIBUTION_GAP',
      'NORMATIVE_RULE_BEARING_STATUS_AND_ORIGINALITY_GAP',
      'DERIVATIVE_RELATIONSHIP_AND_PRIOR_SOURCE_DEPENDENCY_GAP',
      'RESTRICTIVE_DOCTRINAL_CONFLICT_HANDLING_GAP',
    ],
    unresolvedAdmissibilityGapCount: 4,
    acquisitionPathIds: [
      'DIRECT_PUBLICATION_BYLINE_AND_ACCOUNT_IDENTITY_CONTEXT_CAPTURE',
      'EXACT_TEXT_PRIOR_PUBLICATION_AND_ORIGINALITY_TRACE',
      'AUTHOR_OR_DOCTRINAL_LINEAGE_IDENTITY_DISCOVERY',
      'DERIVATIVE_SOURCE_DEPENDENCY_COMPARISON',
      'RESTRICTIVE_DOCTRINE_SCHOOL_BOUNDARY_EVIDENCE_ACQUISITION',
    ],
    acquisitionPathCount: 5,
    acquisitionControlIds: Array.from({ length: 16 }, (_, index) => `control_${index}`),
    acquisitionControlCount: 16,
    acquisitionControlsFrozen: true,
    targetedAcquisitionAuthorized: true,
    targetedAcquisitionExecutedByThisGate: false,
    directPublicationContextCaptureRequired: true,
    exactTextPriorPublicationTraceRequired: true,
    authorOrDoctrinalLineageDiscoveryRequired: true,
    derivativeSourceDependencyComparisonRequired: true,
    restrictiveDoctrineSchoolBoundaryEvidenceRequired: true,
    searchSnippetMayCreatePositiveAdmissibilityFinding: false,
    platformBylineMayAutoEstablishOriginalAuthorship: false,
    authorNameMatchMayAutoEstablishDoctrinalLineage: false,
    textualSimilarityMayAutoEstablishDerivativeRelationship: false,
    schoolConflictMayBeSilentlyResolved: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE',
  }) as unknown as I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport;

describe('I224 hidden-stem authority admissibility targeted evidence acquisition evidence', () => {
  it('executes all five frozen acquisition paths while preserving I221 coverage', () => {
    const report = buildI224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidence(validI223());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE',
    );
    expect(report.acquisitionExecuted).toBe(true);
    expect(report.executedAcquisitionPathCount).toBe(5);
    expect(report.evidenceRecordCount).toBe(5);
    expect(report.sevenRequirementCoverageAcceptedAsUpstreamFinding).toBe(true);
    expect(report.coverageReevaluationPerformedByThisGate).toBe(false);
  });

  it('binds the target Sohu publication object but not original authorship', () => {
    const report = buildI224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidence(validI223());
    expect(report.directPublicationBylineAndAccountIdentityCaptured).toBe(true);
    expect(report.targetPublicationTitle).toBe('干支的九种关系2');
    expect(report.targetPublicationAccount).toBe('李炎宸易经风水智慧');
    expect(report.targetPublicationDate).toBe('2017-02-02');
    expect(report.platformAccountMayBeTreatedAsTargetOriginalAuthor).toBe(false);
    expect(report.exactTargetDoctrinalAuthorshipEstablished).toBe(false);
  });

  it('records later redistribution only as lead-only and creates no earlier-source negative finding', () => {
    const report = buildI224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidence(validI223());
    expect(report.laterMirrorRedistributionLeadObserved).toBe(true);
    expect(report.laterMirrorDirectlyOpenedForPositiveAdmissibilityFinding).toBe(false);
    expect(report.earlierThanTargetExactTextWitnessEstablished).toBe(false);
    expect(report.priorPublicationSearchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.corpusExhaustionClaimed).toBe(false);
    const priorTrace = report.evidenceRecords.find((record) => record.pathId === 'EXACT_TEXT_PRIOR_PUBLICATION_AND_ORIGINALITY_TRACE');
    expect(priorTrace?.disposition).toBe('LEAD_ONLY_PARTIAL_FINDING');
    expect(priorTrace?.negativeOrExhaustionFindingCreated).toBe(false);
  });

  it('directly records same-account third-party republication behavior as caution evidence', () => {
    const report = buildI224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidence(validI223());
    expect(report.sameAccountThirdPartyMaterialRepublicationDirectlyEvidenced).toBe(true);
    expect(report.sameAccountRepublicationEvidenceLocator).toBe('https://mt.sohu.com/20160829/n466534112.shtml');
    expect(report.sameAccountRepublicationNamedSource).toBe('高云启的四柱命理学高级函授班讲义');
    expect(report.possibleRelatedAuthorOrLineageLeadObserved).toBe(true);
    expect(report.possibleRelatedAuthorOrLineageLeadPromotedToFinding).toBe(false);
    expect(report.exactTargetDoctrinalLineageEstablished).toBe(false);
    expect(report.exactTargetPriorSourceDependencyEstablished).toBe(false);
  });

  it('reconfirms restrictive doctrinal conflict without resolving school boundaries', () => {
    const report = buildI224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidence(validI223());
    expect(report.restrictiveDoctrineDirectConflictEvidenceReconfirmed).toBe(true);
    expect(report.restrictiveDoctrineLocator).toBe('https://m.guoxuedashi.com/a/22337wzuc/281431r.html');
    expect(report.restrictiveDoctrineFinding).toBe(
      'LI_HANCHEN_BRANCH_PRINCIPAL_QI_ONLY_HIDDEN_STEM_NON_USE_WITH_LIMITED_EXCEPTIONS',
    );
    expect(report.restrictiveDoctrineSchoolBoundaryEstablished).toBe(false);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
  });

  it('leaves all four authority-admissibility gaps open and promotion blocked', () => {
    const report = buildI224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidence(validI223());
    expect(report.unresolvedAdmissibilityGapCount).toBe(4);
    expect(report.anyAdmissibilityGapClosedByThisGate).toBe(false);
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.authorityPromotionReadinessEstablishedByThisGate).toBe(false);
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
  });

  it('preserves provenance, candidate-set, composition and production guards', () => {
    const report = buildI224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidence(validI223());
    expect(report.searchSnippetUsedAsPositiveAuthority).toBe(false);
    expect(report.sourcePlatformOrAccountAutoAcceptedAsAuthority).toBe(false);
    expect(report.currentCandidateEvidenceUsedToBackfillAdmissibility).toBe(false);
    expect(report.crossCandidateCompositionPerformed).toBe(false);
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

  it('fails closed when the I223 targeted-acquisition boundary changes', () => {
    const invalid: I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport = {
      ...validI223(),
      acquisitionPathCount: 0,
    };
    const report = buildI224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidence(invalid);
    expect(report.status).toBe('I223_TARGETED_ACQUISITION_READINESS_BOUNDARY_INVALID');
    expect(report.targetCandidateId).toBeNull();
    expect(report.acquisitionExecuted).toBe(false);
    expect(report.executedAcquisitionPathCount).toBe(0);
    expect(report.evidenceRecordCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
