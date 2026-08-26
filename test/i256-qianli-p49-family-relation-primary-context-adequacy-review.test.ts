import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE_VERSION,
  I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTROL_IDS,
  type I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport,
} from '../src/research/i255-qianli-p49-family-relation-primary-context-adequacy-evidence.js';
import {
  I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_CONTROL_IDS,
  I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_VERSION,
  I256_QIANLI_P49_FAMILY_RESIDUAL_CHECK_ASSESSMENTS,
  buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview,
} from '../src/research/i256-qianli-p49-family-relation-primary-context-adequacy-review.js';

function acceptedI255(): I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport {
  const material: Omit<I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport, 'evidenceId'> = {
    evidenceVersion: I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE_VERSION,
    status: 'RESOLVED_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE',
    decision:
      'P49_DIRECT_CONTEXT_SATISFIES_STRUCTURE_EFFECT_DISTINCTION_BUT_NOT_RELATION_SPECIFIC_LIMITS_OR_CURRENT_METHOD_COMPATIBILITY_FAMILY_GAP_REMAINS_MATERIAL_PARTIAL_NO_AUTHORITY_ADMISSION',
    upstreamB25ReviewId: 'career_b25_i256_fixture',
    exactB25BoundaryAccepted: true,
    upstreamI253EvidenceVersion: 'myeonghwa-i253-qianli-primary-witness-provenance-correction-evidence-v1',
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    provenanceAuthority: {
      workTitle: '韋千里命學講義',
      author: '韋千里',
      publisher: '韋氏命苑',
      publicationYear: 1936,
      nlcIdentity: 'nlc:data_416,01jh000368,10155',
      primaryPdfPageCount: 368,
    },
    accessSurface: {
      kind: 'MECHANICAL_SCAN_MIRROR_OF_ALREADY_BOUND_NLC_WITNESS',
      provider: 'Wikimedia Commons',
      fileIdentity: 'NLC416-01jh000368-10155 韋千里命學講義.pdf',
      pageCountObserved: 368,
      mayReplaceProvenanceAuthority: false,
      transcriptionAuthority: false,
    },
    inspectedPage: {
      printedPage: '49',
      pdfPageOneBased: 336,
      pdfPageZeroBased: 335,
      renderSucceeded: true,
      printedPageMarkerObserved: true,
      careerHeadingObserved: true,
      precedingSectionHeadingContext: '性情',
    },
    directCareerRelationObservations: [
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
    ],
    structureVersusSemanticEffectDistinctionSatisfied: true,
    explicitRelationSpecificCareerLimitsOrExceptionsObserved: false,
    precedingXingqingGeneralDisclaimerObserved: true,
    precedingXingqingDisclaimerMayTransferToCareerRelationRule: false,
    samePageShenCaiLiangTingCareerAlternativeObserved: true,
    currentMethodCompatibilityEstablished: false,
    relationPatternIndependenceFromStrengthBalanceMethodEstablished: false,
    historicalOccupationModernizationAuthorized: false,
    familyRelationCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    familyRelationPreviouslyMissingCheckCount: 3,
    familyRelationNewlySatisfiedCheckCount: 1,
    familyRelationRemainingMissingCheckCount: 2,
    remainingMissingChecks: ['EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS', 'CURRENT_METHOD_COMPATIBILITY'],
    authorityAdmissionReady: false,
    gapClosureReady: false,
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
    controlIds: I255_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      primaryPagesReinspected: 1,
      familyAdequacyChecksNewlySatisfied: 1,
      familyAdequacyChecksRemaining: 2,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW',
  };

  return {
    evidenceId: `i255_qianli_p49_family_relation_primary_context_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('I256 Qianli p49 family relation primary context adequacy review', () => {
  test('accepts exact I255 and resolves the adequacy review', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());

    expect(report.reviewVersion).toBe(I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_VERSION);
    expect(report.status).toBe('RESOLVED_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW');
    expect(report.decision).toBe(
      'I255_SATISFIES_STRUCTURE_EFFECT_DISTINCTION_ONLY_TWO_FAMILY_REQUIREMENTS_REMAIN_NEW_EVIDENCE_SURFACE_REQUIRED_NO_AUTHORITY_ADMISSION',
    );
    expect(report.exactI255BoundaryAccepted).toBe(true);
  });

  test('accepts exactly one of the three family checks as satisfied', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());

    expect(report.familyRequirementCheckCount).toBe(3);
    expect(report.satisfiedFamilyRequirementCheckCount).toBe(1);
    expect(report.remainingFamilyRequirementCheckCount).toBe(2);
    expect(report.structureVersusSemanticEffectDistinctionSatisfied).toBe(true);
  });

  test('keeps limits and current-method compatibility unresolved', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());

    expect(report.explicitRelationSpecificLimitsOrExceptionsSatisfied).toBe(false);
    expect(report.currentMethodCompatibilitySatisfied).toBe(false);
    expect(report.residualCheckAssessments).toEqual(I256_QIANLI_P49_FAMILY_RESIDUAL_CHECK_ASSESSMENTS);
    expect(report.residualCheckAssessmentCount).toBe(2);
  });

  test('does not transfer the Xingqing disclaimer into Career exception authority', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());
    const limits = report.residualCheckAssessments.find(
      (item) => item.checkId === 'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
    );

    expect(report.crossSectionDisclaimerTransferAuthorized).toBe(false);
    expect(limits?.sameP49ReinspectionMaySatisfyWithoutNewEvidenceSurface).toBe(false);
  });

  test('does not assume current-method compatibility from direct p49 syntax', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());
    const compatibility = report.residualCheckAssessments.find((item) => item.checkId === 'CURRENT_METHOD_COMPATIBILITY');

    expect(compatibility?.disposition).toBe(
      'UNRESOLVED_REQUIRES_BROADER_METHOD_CONTEXT_OR_INDEPENDENT_COMPATIBLE_SOURCE',
    );
    expect(report.currentMethodCompatibilitySatisfied).toBe(false);
  });

  test('marks same-page source-local reinspection as exhausted without new context', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());

    expect(report.p49SourceLocalInspectionAdequateForOneRequirement).toBe(true);
    expect(report.p49SourceLocalInspectionAdequateForFullFamilyRequirement).toBe(false);
    expect(report.sameP49ReinspectionWithoutNewContextAuthorized).toBe(false);
    expect(report.familyPathImmediatelyExecutableNow).toBe(false);
    expect(report.familyPathWaitingForNewEvidenceSurface).toBe(true);
  });

  test('freezes the two genuinely new evidence surfaces required for family continuation', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());

    expect(report.requiredNewEvidenceSurfaces).toEqual([
      'RELATION_SPECIFIC_LIMIT_OR_EXCEPTION_CONTEXT',
      'CURRENT_METHOD_COMPATIBILITY_CONTEXT_OR_INDEPENDENT_COMPATIBLE_SOURCE',
    ]);
  });

  test('keeps family coverage material partial with no authority admission or closure', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());

    expect(report.familyRelationCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.gapClosureReady).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('preserves provenance and occupation boundaries', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());

    expect(report.accessMirrorProvenancePromoted).toBe(false);
    expect(report.historicalOccupationModernizationAuthorized).toBe(false);
  });

  test('keeps all six historical synthesis gaps open and production impact none', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());

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

  test('freezes controls and routes to post-I255 frontier reconciliation', () => {
    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());

    expect(report.controlIds).toEqual(I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW',
    );
  });

  test('is deterministic for the same exact I255 evidence boundary', () => {
    const first = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());
    const second = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(acceptedI255());

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });

  test('fails closed when I255 content-addressed identity is tampered', () => {
    const i255 = acceptedI255();
    const tampered: I255QianliP49FamilyRelationPrimaryContextAdequacyEvidenceReport = {
      ...i255,
      evidenceId: `${i255.evidenceId}_tampered`,
    };

    const report = buildI256QianliP49FamilyRelationPrimaryContextAdequacyReview(tampered);

    expect(report.status).toBe('UPSTREAM_I255_BOUNDARY_INVALID');
    expect(report.decision).toBe('QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_REVIEW_NOT_ESTABLISHED');
    expect(report.exactI255BoundaryAccepted).toBe(false);
    expect(report.satisfiedFamilyRequirementCheckCount).toBe(0);
    expect(report.remainingFamilyRequirementCheckCount).toBe(0);
    expect(report.residualCheckAssessments).toEqual([]);
    expect(report.familyPathWaitingForNewEvidenceSurface).toBe(false);
    expect(report.requiredNewEvidenceSurfaces).toEqual([]);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe('QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW');
  });
});
