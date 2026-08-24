import { describe, expect, it } from 'vitest';
import type { I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport } from '../src/research/i226-source-ke-hidden-stem-interaction-eligibility-target-exact-text-pre-2017-original-source-authorship-discovery-readiness-review.js';
import {
  I226_RARE_TARGET_PHRASES,
  I226_TARGET_EXACT_TEXT_DISCOVERY_PATH_IDS,
} from '../src/research/i226-source-ke-hidden-stem-interaction-eligibility-target-exact-text-pre-2017-original-source-authorship-discovery-readiness-review.js';
import { buildI227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidence } from '../src/research/i227-source-ke-hidden-stem-interaction-eligibility-target-exact-text-pre-2017-original-source-authorship-discovery-evidence.js';

const validI226 = (): I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport =>
  ({
    reviewId: 'i226_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW',
    decision:
      'TARGET_SPECIFIC_PRE_2017_ORIGIN_DISCOVERY_CONTRACT_FROZEN_FIVE_PATHS_SEVENTEEN_CONTROLS_FOUR_RARE_PHRASES_NO_DISCOVERY_EXECUTED_NO_AUTHORSHIP_LINEAGE_OR_DERIVATIVE_ADJUDICATION_NO_PROMOTION',
    exactI225BoundaryAccepted: true,
    targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    targetPublicationDate: '2017-02-02',
    sevenRequirementCoverageAcceptedAsUpstreamFinding: true,
    coverageReevaluationAuthorizedByThisGate: false,
    discoveryPathIds: I226_TARGET_EXACT_TEXT_DISCOVERY_PATH_IDS,
    discoveryPathCount: 5,
    discoveryControlCount: 17,
    discoveryControlsFrozen: true,
    rareTargetPhrases: I226_RARE_TARGET_PHRASES,
    rareTargetPhraseCount: 4,
    targetSpecificDiscoveryAuthorized: true,
    targetSpecificDiscoveryExecutedByThisGate: false,
    exactRarePhrasePre2017SearchRequired: true,
    sohuPart1ArchiveAttributionTraceRequired: true,
    pre2017BookOrCourseExactPassageMatchRequired: true,
    namedLineageExactPassageBindingRequired: true,
    dateVerifiedEarlyRepublicationTraceRequired: true,
    directlyOpenedOrSourceBoundContextRequiredForPositivePredecessorFinding: true,
    adjacentTheoryMayEstablishTargetPredecessor: false,
    authorNameMatchMayEstablishTargetLineage: false,
    laterMirrorMayEstablishPriorDependency: false,
    sohuAccountMayEstablishOriginalAuthorship: false,
    alternatePositiveLineageMayBackfillTargetLineage: false,
    searchSnippetMayEstablishPositivePredecessorFinding: false,
    discoverySilenceCreatesNegativeFinding: false,
    corpusExhaustionClaimed: false,
    exactTargetOriginalAuthorshipEstablishedByThisGate: false,
    exactTargetDoctrinalLineageEstablishedByThisGate: false,
    exactTargetPriorSourceDependencyEstablishedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    restrictiveDoctrineConflictAdjudicatedByThisGate: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    doctrinalConflictPreserved: true,
    doctrinalConflictResolvedByThisGate: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE',
  }) as unknown as I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport;

describe('I227 hidden-stem target exact-text pre-2017 origin discovery evidence', () => {
  it('accepts the exact I226 boundary and executes all five paths without reopening coverage', () => {
    const report = buildI227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidence(validI226());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE',
    );
    expect(report.exactI226BoundaryAccepted).toBe(true);
    expect(report.discoveryExecuted).toBe(true);
    expect(report.executedDiscoveryPathCount).toBe(5);
    expect(report.evidenceRecordCount).toBe(5);
    expect(report.evidenceRecords.map((record) => record.pathId)).toEqual(I226_TARGET_EXACT_TEXT_DISCOVERY_PATH_IDS);
    expect(report.coverageReevaluationPerformedByThisGate).toBe(false);
  });

  it('binds the four rare phrases to the dated 2017 target baseline', () => {
    const report = buildI227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidence(validI226());
    expect(report.targetCandidateId).toBe('LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML');
    expect(report.targetPublicationDate).toBe('2017-02-02');
    expect(report.targetPublicationLocator).toBe('https://m.sohu.com/n/479788391/?wscrid=95360_8');
    expect(report.rareTargetPhrasesAcceptedFromI226).toEqual(I226_RARE_TARGET_PHRASES);
    expect(report.rareTargetPhraseCount).toBe(4);
    expect(report.exactRarePhraseSearchExecuted).toBe(true);
    expect(report.targetBaselineExactPhrasesDirectlyBoundTo2017Publication).toBe(true);
  });

  it('keeps the unestablished pre-2017 witness distinct from a nonexistence finding', () => {
    const report = buildI227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidence(validI226());
    expect(report.pre2017ExactTargetWitnessEstablished).toBe(false);
    expect(report.pre2017ExactTargetWitnessNonexistenceEstablished).toBe(false);
    expect(report.discoverySilenceCreatesNegativeFinding).toBe(false);
    expect(report.corpusExhaustionClaimed).toBe(false);
    expect(report.sohuTargetPart1OrUpstreamAttributionDirectlyBound).toBe(false);
    expect(report.sohuTargetPart1NonexistenceEstablished).toBe(false);
  });

  it('records the 2016 alternate lineage only as a direct contrast witness', () => {
    const report = buildI227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidence(validI226());
    expect(report.pre2017AlternateLineageContrastDirectlyVerified).toBe(true);
    expect(report.pre2017AlternateLineageLocator).toBe('https://xm.yi958.com/gsqm/5246');
    expect(report.pre2017AlternateLineagePublicationDate).toBe('2016-05-18');
    expect(report.pre2017AlternateLineageNamedTransmission).toBe('邱平策_TO_法能');
    expect(report.alternateLineageExactTargetPhraseBindingEstablished).toBe(false);
    expect(report.alternateLineageMayBackfillTargetLineage).toBe(false);
  });

  it('confirms later exact-text redistribution without inferring prior dependency', () => {
    const report = buildI227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidence(validI226());
    expect(report.laterExactTextRedistributionDirectlyConfirmed).toBe(true);
    expect(report.laterExactTextDirectWitnessLocator).toBe('https://www.sohu.com/a/406500779_120756849');
    expect(report.laterExactTextDirectWitnessDate).toBe('2020-07-08');
    expect(report.laterRedistributionLeadLocators).toContain('https://chinaqigong.com/article-493-1.html');
    expect(report.laterRedistributionLeadLocators).toContain(
      'https://www.aqioo.com/bazisuanming/tiangandizhi/165853.html',
    );
    expect(report.laterMirrorMayEstablishPriorDependency).toBe(false);
  });

  it('does not adjudicate authorship, lineage, dependency, derivative direction or restrictive-school boundary', () => {
    const report = buildI227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidence(validI226());
    expect(report.namedLineageExactTargetBindingEstablished).toBe(false);
    expect(report.exactTargetOriginalAuthorshipEstablishedByThisGate).toBe(false);
    expect(report.exactTargetDoctrinalLineageEstablishedByThisGate).toBe(false);
    expect(report.exactTargetPriorSourceDependencyEstablishedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.restrictiveDoctrineConflictAdjudicatedByThisGate).toBe(false);
    expect(report.restrictiveDoctrineSchoolBoundaryEstablishedByThisGate).toBe(false);
    expect(report.unresolvedAdmissibilityGapCount).toBe(4);
  });

  it('preserves authority, provenance, conflict and production guards', () => {
    const report = buildI227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidence(validI226());
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
    expect(report.searchSnippetUsedAsPositivePredecessorEvidence).toBe(false);
    expect(report.adjacentTheoryUsedAsTargetPredecessorEvidence).toBe(false);
    expect(report.accountNameUsedAsOriginalAuthorshipEvidence).toBe(false);
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
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed when the I226 discovery boundary changes', () => {
    const invalid: I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport = {
      ...validI226(),
      rareTargetPhraseCount: 0,
    };
    const report = buildI227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidence(invalid);
    expect(report.status).toBe('I226_TARGET_ORIGIN_DISCOVERY_READINESS_BOUNDARY_INVALID');
    expect(report.discoveryExecuted).toBe(false);
    expect(report.evidenceRecordCount).toBe(0);
    expect(report.targetCandidateId).toBeNull();
    expect(report.pre2017AlternateLineageContrastDirectlyVerified).toBe(false);
    expect(report.laterExactTextRedistributionDirectlyConfirmed).toBe(false);
    expect(report.unresolvedAdmissibilityGapCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
