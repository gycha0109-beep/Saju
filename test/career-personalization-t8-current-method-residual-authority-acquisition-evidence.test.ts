import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-acquisition-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_CURRENT_METHOD_ACQUISITION_CANDIDATES,
  CAREER_T8_CURRENT_METHOD_ACQUISITION_EVIDENCE_CONTROL_IDS,
  CAREER_T8_CURRENT_METHOD_ACQUISITION_TASK_EVIDENCE,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence,
} from '../src/research/career-personalization-t8-current-method-residual-authority-acquisition-evidence.js';

function acceptedB19(): CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport {
  const material: Omit<CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS',
    decision: 'TWO_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_HOLDS_EXCLUDED_NO_AUTHORITY_ACQUIRED',
    upstreamB18ReviewId: 'career_t8_current_t5_t6_bridge_method_boundary_reassessment_b20_fixture',
    exactB18BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    acquisitionTasks: CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS,
    acquisitionTaskCount: 2,
    executableResidualClassIds: [
      'CURRENT_METHOD_T5_DIRECT_BRIDGE_ACQUISITION',
      'CURRENT_METHOD_T6_DIRECT_CAREER_BRIDGE_DISCOVERY',
    ],
    executableResidualClassCount: 2,
    t5CurrentMethodAcquisitionReady: true,
    t6CurrentMethodAcquisitionReady: true,
    currentMethodDiscoveryMayContinueWithoutHumanMethodologyChoice: true,
    cheonbuHoldExcludedFromExecution: true,
    wangQingHoldExcludedFromExecution: true,
    wangQingHumanAdjudicationStillRequiredBeforeSemanticUse: true,
    acquisitionExecutionAuthorizedForNextGate: true,
    acquisitionPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    crossSourceStitchingAuthorized: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    methodologyChoiceMadeByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      acquisitionExecutionsPerformed: 0,
      sourcesDiscovered: 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE',
  };

  return {
    reviewId: `career_t8_current_method_residual_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B20 current-method residual authority acquisition evidence', () => {
  test('accepts exact B19 and records exactly two executions with five evidence candidates', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE');
    expect(report.decision).toBe(
      'TWO_CURRENT_METHOD_ACQUISITIONS_EXECUTED_PARTIAL_DIRECT_EVIDENCE_FOUND_ZERO_QUALIFYING_AUTHORITY_ALL_SIX_GAPS_OPEN',
    );
    expect(report.acquisitionExecutionCount).toBe(2);
    expect(report.candidateEvidenceCount).toBe(5);
    expect(report.acquisitionTaskEvidence).toEqual(CAREER_T8_CURRENT_METHOD_ACQUISITION_TASK_EVIDENCE);
    expect(report.candidateEvidence).toEqual(CAREER_T8_CURRENT_METHOD_ACQUISITION_CANDIDATES);
  });

  test('records Yang full-text reinspection without inventing a direct multi-claim Career bridge', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());
    const yang = report.candidateEvidence.find((candidate) => candidate.candidateId === 'YANG_YIYUN_FULL_TEXT_REINSPECTION');

    expect(report.yangFullTextReinspectionCompleted).toBe(true);
    expect(report.yangDirectMultiClaimCareerBridgeConfirmed).toBe(false);
    expect(yang?.tenGodCombinationSemanticsExplicit).toBe(true);
    expect(yang?.explicitCareerWorkSemantics).toBe(true);
    expect(yang?.directMultiClaimCareerCompositionExplicit).toBe(false);
    expect(yang?.formalPublicationProvenanceConfirmed).toBe(false);
    expect(yang?.qualifyingCurrentMethodAuthorityCandidate).toBe(false);
  });

  test('records Qin as a formal-published TOC lead while preserving passage-body absence', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());
    const qin = report.candidateEvidence.find(
      (candidate) => candidate.candidateId === 'QIN_LUNSHI_2010_PUBLISHED_TENGOD_CAREER_CHAPTER_LEAD',
    );

    expect(report.qinFormalPublishedCareerCombinationChapterLeadConfirmed).toBe(true);
    expect(report.qinTargetPassageBodyInspected).toBe(false);
    expect(qin?.formalPublicationProvenanceConfirmed).toBe(true);
    expect(qin?.sourceIdentity).toContain('9787204098774');
    expect(qin?.originalOrVerifiedLocalContextInspected).toBe(false);
    expect(qin?.qualifyingCurrentMethodAuthorityCandidate).toBe(false);
  });

  test('records Wang Yuantang direct Career-combination semantics as non-normative strength-bound evidence only', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());
    const candidate = report.candidateEvidence.find(
      (item) => item.candidateId === 'WANG_YUANTANG_2022_DIRECT_TENGOD_CAREER_WEB_LEAD',
    );

    expect(candidate?.directMultiClaimCareerCompositionExplicit).toBe(true);
    expect(candidate?.formalPublicationProvenanceConfirmed).toBe(false);
    expect(candidate?.independentNormativeProvenanceAdequate).toBe(false);
    expect(candidate?.relativeForceOrStrengthHierarchyDetected).toBe(true);
    expect(candidate?.currentGovernedMethodCompatibilityEstablished).toBe(false);
    expect(candidate?.qualifyingCurrentMethodAuthorityCandidate).toBe(false);
  });

  test('records Xu 2009 as formal partial T6 Career and position evidence without creating a T5 modifier bridge', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());
    const xu = report.candidateEvidence.find((candidate) => candidate.candidateId === 'XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION');

    expect(report.xuBingxinFormalPublicationConfirmed).toBe(true);
    expect(report.xuBingxinDirectBranchClashCareerSemanticsConfirmed).toBe(true);
    expect(report.xuBingxinPositionCareerSemanticsConfirmed).toBe(true);
    expect(report.xuBingxinExactCurrentT5ModifierBridgeConfirmed).toBe(false);
    expect(xu?.formalPublicationProvenanceConfirmed).toBe(true);
    expect(xu?.branchClashCareerSemanticsExplicit).toBe(true);
    expect(xu?.positionCareerSemanticsExplicit).toBe(true);
    expect(xu?.exactCurrentT5SemanticModifierCorrespondenceEstablished).toBe(false);
    expect(xu?.qualifyingCurrentMethodAuthorityCandidate).toBe(false);
  });

  test('does not infer visibility, plurality, or seasonal Career authority from Xu position evidence', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());

    expect(report.visibilityCareerModifierAuthorityConfirmed).toBe(false);
    expect(report.pluralityCareerModifierAuthorityConfirmed).toBe(false);
    expect(report.seasonalCareerModifierAuthorityConfirmed).toBe(false);
  });

  test('treats the repeated six-clash web corpus as derivative rather than independent authority', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());
    const cluster = report.candidateEvidence.find(
      (candidate) => candidate.candidateId === 'SIX_CLASH_CAREER_DERIVATIVE_WEB_CLUSTER',
    );

    expect(report.derivativeWebClusterTreatedAsIndependentAuthorities).toBe(false);
    expect(cluster?.derivativeLineageRiskDetected).toBe(true);
    expect(cluster?.independentNormativeProvenanceAdequate).toBe(false);
    expect(cluster?.qualifyingCurrentMethodAuthorityCandidate).toBe(false);
  });

  test('keeps Cheonbu and Wang Qing holds untouched and adopts no competing method or force hierarchy', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());

    expect(report.cheonbuHoldExecuted).toBe(false);
    expect(report.cheonbuHoldReclassified).toBe(false);
    expect(report.wangQingHoldExecuted).toBe(false);
    expect(report.wangQingHoldReclassified).toBe(false);
    expect(report.methodologyChoiceMadeByThisGate).toBe(false);
    expect(report.competingMethodAdoptedByThisGate).toBe(false);
    expect(report.relativeForceHierarchyAdoptedByThisGate).toBe(false);
  });

  test('keeps zero qualifying authority, all six gaps open, no global exhaustion claim, and no artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(acceptedB19());

    expect(report.qualifyingCurrentMethodAuthorityCandidateCount).toBe(0);
    expect(report.authorityCandidatesAcceptedByThisGate).toBe(0);
    expect(report.gapClosureCount).toBe(0);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.globalCurrentMethodSourceAbsenceInferred).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(CAREER_T8_CURRENT_METHOD_ACQUISITION_EVIDENCE_CONTROL_IDS);
    expect(report.implementationEffects).toEqual({
      acquisitionExecutionsPerformed: 2,
      candidateEvidenceRecordsCreated: 5,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed on tampered B19 and remains deterministic/content-addressed for exact B19', () => {
    const valid = acceptedB19();
    const tamperedMaterial = { ...valid, acquisitionExecutionAuthorizedForNextGate: false };
    const { reviewId: originalReviewId, ...withoutId } = tamperedMaterial;
    expect(originalReviewId).toBe(valid.reviewId);
    const tampered: CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport = {
      ...tamperedMaterial,
      reviewId: `career_t8_current_method_residual_authority_acquisition_readiness_${deterministicContentHash(withoutId).slice(0, 24)}`,
    };

    const rejected = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(tampered);
    expect(rejected.status).toBe('UPSTREAM_B19_BOUNDARY_INVALID');
    expect(rejected.acquisitionExecutionCount).toBe(0);
    expect(rejected.candidateEvidenceCount).toBe(0);
    expect(rejected.controlsFrozen).toBe(false);

    const first = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(valid);
    const second = buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidence(valid);
    const { evidenceId, ...material } = first;
    expect(second).toEqual(first);
    expect(evidenceId).toBe(
      `career_t8_current_method_residual_authority_acquisition_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW',
    );
  });
});
