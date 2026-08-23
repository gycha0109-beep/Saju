import { describe, expect, it } from 'vitest';
import type { I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport } from '../src/research/i227-source-ke-hidden-stem-interaction-eligibility-target-exact-text-pre-2017-original-source-authorship-discovery-evidence.js';
import {
  I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS,
  I228_RESIDUAL_ADMISSIBILITY_GAP_IDS,
  buildI228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReview,
} from '../src/research/i228-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review.js';

const validI227 = (): I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport =>
  ({
    evidenceId: 'i227_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE',
    decision:
      'FIVE_TARGET_SPECIFIC_ORIGIN_PATHS_EXECUTED_NO_DIRECT_PRE_2017_EXACT_TARGET_WITNESS_ESTABLISHED_ONE_PRE_2017_ALTERNATE_LINEAGE_CONTRAST_DIRECTLY_VERIFIED_LATER_EXACT_TEXT_REDISTRIBUTION_CONFIRMED_PART1_AND_TARGET_ORIGIN_ATTRIBUTION_UNRESOLVED_NO_NEGATIVE_EXHAUSTION_FINDING_NO_AUTHORSHIP_LINEAGE_DERIVATIVE_ADJUDICATION_NO_PROMOTION',
    exactI226BoundaryAccepted: true,
    targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    targetPublicationDate: '2017-02-02',
    sevenRequirementCoverageAcceptedAsUpstreamFinding: true,
    coverageReevaluationPerformedByThisGate: false,
    discoveryExecuted: true,
    executedDiscoveryPathCount: 5,
    evidenceRecordCount: 5,
    rareTargetPhraseCount: 4,
    exactRarePhraseSearchExecuted: true,
    targetBaselineExactPhrasesDirectlyBoundTo2017Publication: true,
    pre2017ExactTargetWitnessEstablished: false,
    pre2017ExactTargetWitnessNonexistenceEstablished: false,
    discoverySilenceCreatesNegativeFinding: false,
    corpusExhaustionClaimed: false,
    sohuTargetPart1OrUpstreamAttributionDirectlyBound: false,
    sohuTargetPart1NonexistenceEstablished: false,
    pre2017AlternateLineageContrastDirectlyVerified: true,
    alternateLineageExactTargetPhraseBindingEstablished: false,
    alternateLineageMayBackfillTargetLineage: false,
    laterExactTextRedistributionDirectlyConfirmed: true,
    laterMirrorMayEstablishPriorDependency: false,
    namedLineageExactTargetBindingEstablished: false,
    exactTargetOriginalAuthorshipEstablishedByThisGate: false,
    exactTargetDoctrinalLineageEstablishedByThisGate: false,
    exactTargetPriorSourceDependencyEstablishedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    restrictiveDoctrineConflictAdjudicatedByThisGate: false,
    restrictiveDoctrineSchoolBoundaryEstablishedByThisGate: false,
    unresolvedAdmissibilityGapCount: 4,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW',
  }) as unknown as I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport;

describe('I228 hidden-stem target-origin discovery evidence adequacy residual-path reassessment', () => {
  it('accepts the exact I227 evidence boundary without reopening seven-requirement coverage', () => {
    const report = buildI228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReview(validI227());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW',
    );
    expect(report.exactI227BoundaryAccepted).toBe(true);
    expect(report.targetCandidateId).toBe('LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML');
    expect(report.sevenRequirementCoverageAcceptedAsUpstreamFinding).toBe(true);
    expect(report.coverageReevaluationAuthorizedByThisGate).toBe(false);
  });

  it('accepts I227 as adequate only for the completed current pass', () => {
    const report = buildI228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReview(validI227());
    expect(report.I227EvidenceAdequateForCurrentPass).toBe(true);
    expect(report.exactRarePhraseSearchExecutionAccepted).toBe(true);
    expect(report.noPre2017ExactWitnessEstablishedInPassAccepted).toBe(true);
    expect(report.noPre2017WitnessNonexistenceFindingAccepted).toBe(false);
    expect(report.noCorpusExhaustionFindingAccepted).toBe(true);
    expect(report.part1OrUpstreamAttributionStillUnresolved).toBe(true);
  });

  it('preserves alternate-lineage and later-redistribution limits', () => {
    const report = buildI228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReview(validI227());
    expect(report.pre2017AlternateLineageContrastAccepted).toBe(true);
    expect(report.alternateLineageMayBackfillTargetLineage).toBe(false);
    expect(report.laterExactTextRedistributionAccepted).toBe(true);
    expect(report.laterRedistributionMayEstablishPriorDependency).toBe(false);
  });

  it('retains exactly four residual admissibility gaps', () => {
    const report = buildI228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReview(validI227());
    expect(report.residualAdmissibilityGapIds).toEqual(I228_RESIDUAL_ADMISSIBILITY_GAP_IDS);
    expect(report.residualAdmissibilityGapCount).toBe(4);
    expect(report.residualAdmissibilityGapIds).toContain('TARGET_ORIGINAL_AUTHORSHIP_UNRESOLVED');
    expect(report.residualAdmissibilityGapIds).toContain('RESTRICTIVE_DOCTRINE_SCHOOL_BOUNDARY_UNRESOLVED');
  });

  it('rejects equivalent automated-web repetition without claiming web exhaustion', () => {
    const report = buildI228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReview(validI227());
    expect(report.equivalentAutomatedWebSearchRepeatJustified).toBe(false);
    expect(report.automatedWebCorpusExhaustionEstablished).toBe(false);
    expect(report.automatedWebAccessFailureEstablished).toBe(false);
    expect(report.negativeFindingCreatedFromSearchSilence).toBe(false);
    expect(report.corpusExhaustionClaimed).toBe(false);
    expect(report.materiallyNewEvidenceClassRequired).toBe(true);
  });

  it('routes only to four higher-provenance acquisition classes', () => {
    const report = buildI228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReview(validI227());
    expect(report.higherProvenanceAcquisitionPathIds).toEqual(I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS);
    expect(report.higherProvenanceAcquisitionPathCount).toBe(4);
    expect(report.higherProvenanceAcquisitionReadinessReviewJustified).toBe(true);
    expect(report.archivalSnapshotPathJustified).toBe(true);
    expect(report.authorControlledFirstPartyPathJustified).toBe(true);
    expect(report.originalBookCourseCanonicalWitnessPathJustified).toBe(true);
    expect(report.custodianBoundWitnessPathJustified).toBe(true);
    expect(report.restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished).toBe(true);
  });

  it('preserves authority, provenance, conflict and production guards', () => {
    const report = buildI228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReview(validI227());
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.authorityPromotionReadinessEstablishedByThisGate).toBe(false);
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
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

  it('fails closed when the I227 current-pass evidence boundary changes', () => {
    const invalid: I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport = {
      ...validI227(),
      laterExactTextRedistributionDirectlyConfirmed: false,
    };
    const report = buildI228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReview(invalid);
    expect(report.status).toBe('I227_TARGET_ORIGIN_DISCOVERY_EVIDENCE_BOUNDARY_INVALID');
    expect(report.I227EvidenceAdequateForCurrentPass).toBe(false);
    expect(report.residualAdmissibilityGapCount).toBe(0);
    expect(report.higherProvenanceAcquisitionPathCount).toBe(0);
    expect(report.materiallyNewEvidenceClassRequired).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
