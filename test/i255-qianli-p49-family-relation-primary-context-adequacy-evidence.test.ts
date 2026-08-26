import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW_VERSION,
  CAREER_T8_B25_CONTINUATION_READINESS_CONTROL_IDS,
  CAREER_T8_B25_CONTINUATION_TASKS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-targeted-remediation-continuation-readiness-review.js';
import {
  I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE_VERSION,
  I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTROL_IDS,
  buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence,
} from '../src/research/i255-qianli-p49-family-relation-primary-context-adequacy-evidence.js';
import { I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION } from '../src/research/i253-qianli-primary-witness-provenance-correction-evidence.js';

function acceptedB25(): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport {
  const material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS',
    decision:
      'FOUR_ACTIVE_PATHS_TRACKED_ONLY_QIANLI_P49_CONTEXT_EXECUTABLE_THREE_PATHS_WAIT_FOR_NEW_EVIDENCE_SURFACES_SEASON_VISIBILITY_PLURALITY_UNCONSUMED_CONFLICT_DEFERRED_NO_AUTHORITY_ADMISSION',
    upstreamB24ReviewId: 'career_t8_b24_i255_fixture',
    exactB24BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    tasks: CAREER_T8_B25_CONTINUATION_TASKS,
    taskCount: 4,
    immediatelyExecutableTaskCount: 1,
    evidenceSurfaceBlockedTaskCount: 3,
    activePrimaryRemediationPathCountPreserved: 4,
    onlyFamilyPrimaryContextExecutableNow: true,
    qinWaitingForNewBodyAccessSurface: true,
    branchClashWaitingForNewSingleSourceCandidate: true,
    positionWaitingForNewSpecificT5Bridge: true,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    seasonalConditionalRemediationActivated: false,
    conflictPolicyRemediationActivated: false,
    broadSearchRestartAuthorized: false,
    repeatedNegativeSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    continuationExecutionAutomaticallyAdmitsAuthority: false,
    continuationExecutionAutomaticallyClosesGap: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    methodologyScopeExpandedByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B25_CONTINUATION_READINESS_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      continuationTasksMaterialized: 4,
      immediatelyExecutableTasks: 1,
      evidenceSurfaceBlockedTasks: 3,
      dimensionsExplicitlyUnconsumedForCurrentContinuation: 3,
      newSourceAcquisitionsPerformed: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE',
  };

  return {
    reviewId: `career_t8_current_method_residual_authority_targeted_remediation_continuation_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('I255 Qianli p49 family relation primary context adequacy evidence', () => {
  test('accepts the exact B25 boundary and resolves the source-local evidence gate', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.evidenceVersion).toBe(I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE_VERSION);
    expect(report.status).toBe('RESOLVED_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE');
    expect(report.decision).toBe(
      'P49_DIRECT_CONTEXT_SATISFIES_STRUCTURE_EFFECT_DISTINCTION_BUT_NOT_RELATION_SPECIFIC_LIMITS_OR_CURRENT_METHOD_COMPATIBILITY_FAMILY_GAP_REMAINS_MATERIAL_PARTIAL_NO_AUTHORITY_ADMISSION',
    );
    expect(report.exactB25BoundaryAccepted).toBe(true);
  });

  test('keeps provenance authority on the corrected I253 NLC witness', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.upstreamI253EvidenceVersion).toBe(I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION);
    expect(report.provenanceAuthority).toEqual({
      workTitle: '韋千里命學講義',
      author: '韋千里',
      publisher: '韋氏命苑',
      publicationYear: 1936,
      nlcIdentity: 'nlc:data_416,01jh000368,10155',
      primaryPdfPageCount: 368,
    });
  });

  test('uses Wikimedia only as a mechanical scan access surface and never as replacement provenance', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.accessSurface.kind).toBe('MECHANICAL_SCAN_MIRROR_OF_ALREADY_BOUND_NLC_WITNESS');
    expect(report.accessSurface.provider).toBe('Wikimedia Commons');
    expect(report.accessSurface.fileIdentity).toBe('NLC416-01jh000368-10155 韋千里命學講義.pdf');
    expect(report.accessSurface.pageCountObserved).toBe(368);
    expect(report.accessSurface.mayReplaceProvenanceAuthority).toBe(false);
    expect(report.accessSurface.transcriptionAuthority).toBe(false);
  });

  test('binds the direct render to printed p49 and PDF p336', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.inspectedPage.printedPage).toBe('49');
    expect(report.inspectedPage.pdfPageOneBased).toBe(336);
    expect(report.inspectedPage.pdfPageZeroBased).toBe(335);
    expect(report.inspectedPage.renderSucceeded).toBe(true);
    expect(report.inspectedPage.printedPageMarkerObserved).toBe(true);
    expect(report.inspectedPage.careerHeadingObserved).toBe(true);
  });

  test('records both direct named relation-to-Career clauses without modernizing occupation labels', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.directCareerRelationObservations).toEqual([
      {
        structuralPattern: '殺印相生',
        semanticMarker: '宜',
        historicalCareerLabel: '武備',
        directStructureToEffectSyntaxObserved: true,
      },
      {
        structuralPattern: '傷食生財',
        semanticMarker: '宜',
        historicalCareerLabel: '貿遷',
        directStructureToEffectSyntaxObserved: true,
      },
    ]);
    expect(report.historicalOccupationModernizationAuthorized).toBe(false);
  });

  test('satisfies the previously missing structure-versus-semantic-effect distinction from direct syntax', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.structureVersusSemanticEffectDistinctionSatisfied).toBe(true);
    expect(report.familyRelationPreviouslyMissingCheckCount).toBe(3);
    expect(report.familyRelationNewlySatisfiedCheckCount).toBe(1);
    expect(report.familyRelationRemainingMissingCheckCount).toBe(2);
    expect(report.remainingMissingChecks).toEqual([
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
    ]);
  });

  test('does not transfer the preceding Xingqing disclaimer across the Shiye section boundary', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.inspectedPage.precedingSectionHeadingContext).toBe('性情');
    expect(report.precedingXingqingGeneralDisclaimerObserved).toBe(true);
    expect(report.precedingXingqingDisclaimerMayTransferToCareerRelationRule).toBe(false);
    expect(report.explicitRelationSpecificCareerLimitsOrExceptionsObserved).toBe(false);
  });

  test('does not assume current-method compatibility from the p49 Career opening', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.samePageShenCaiLiangTingCareerAlternativeObserved).toBe(true);
    expect(report.currentMethodCompatibilityEstablished).toBe(false);
    expect(report.relationPatternIndependenceFromStrengthBalanceMethodEstablished).toBe(false);
  });

  test('keeps the family relation at material partial coverage with no admission or closure', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.familyRelationCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.gapClosureReady).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('keeps all six historical synthesis gaps open and produces no T8 or production artifacts', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.methodologyScopeExpandedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes controls and routes to a family primary-context adequacy review', () => {
    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(report.controlIds).toEqual(I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW');
  });

  test('is deterministic for the same exact B25 boundary', () => {
    const first = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());
    const second = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(acceptedB25());

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed when the B25 content-addressed identity is tampered', () => {
    const b25 = acceptedB25();
    const tampered: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport = {
      ...b25,
      reviewId: `${b25.reviewId}_tampered`,
    };

    const report = buildI255QianliP49FamilyRelationPrimaryContextAdequacyEvidence(tampered);

    expect(report.status).toBe('UPSTREAM_B25_BOUNDARY_INVALID');
    expect(report.decision).toBe('QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_NOT_ESTABLISHED');
    expect(report.exactB25BoundaryAccepted).toBe(false);
    expect(report.inspectedPage.renderSucceeded).toBe(false);
    expect(report.structureVersusSemanticEffectDistinctionSatisfied).toBe(false);
    expect(report.precedingXingqingGeneralDisclaimerObserved).toBe(false);
    expect(report.samePageShenCaiLiangTingCareerAlternativeObserved).toBe(false);
    expect(report.familyRelationPreviouslyMissingCheckCount).toBe(0);
    expect(report.familyRelationNewlySatisfiedCheckCount).toBe(0);
    expect(report.familyRelationRemainingMissingCheckCount).toBe(0);
    expect(report.remainingMissingChecks).toEqual([]);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW',
    );
  });
});
