import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS,
  CAREER_T8_B27_NEW_SURFACE_ACQUISITION_READINESS_CONTROL_IDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReviewReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS,
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence,
} from '../src/research/career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-evidence.js';

function acceptedB27(): CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReviewReport {
  const material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS',
    decision: 'FOUR_BOUNDED_NEW_SURFACE_ACQUISITION_LANES_READY_NO_BROAD_RESTART_NO_AUTHORITY_ADMISSION',
    upstreamB26ReviewId: 'b26_b28_fixture',
    exactB26BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    contracts: CAREER_T8_B27_NEW_SURFACE_ACQUISITION_CONTRACTS,
    contractCount: 4,
    executableNewSurfaceAcquisitionLaneCount: 4,
    allB26WaitingPathsRepresentedExactlyOnce: true,
    targetedNewSurfaceAcquisitionAuthorizedForNextGate: true,
    broadDiscoveryRestartAuthorized: false,
    repeatedPriorSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    searchSnippetMayCountAsAuthorityEvidence: false,
    visibilityConsumedByPositionLane: false,
    pluralityConsumedByPositionLane: false,
    seasonalConsumedByPositionLane: false,
    pluralityHoldReclassified: false,
    seasonalConditionalRemediationActivated: false,
    conflictPolicyRemediationActivated: false,
    successfulAcquisitionRequiresLaterAdequacyReview: true,
    successfulAcquisitionRequiresLaterAuthorityAdmissionReview: true,
    newSurfaceAcquisitionPerformedByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B27_NEW_SURFACE_ACQUISITION_READINESS_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      acquisitionContractsCreated: 4,
      executableAcquisitionLanes: 4,
      newSurfaceAcquisitionsPerformed: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate:
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE',
  };

  return {
    reviewId: `career_t8_current_method_residual_authority_new_evidence_surface_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B28 new evidence surface acquisition evidence', () => {
  test('accepts exact B27 and resolves four bounded acquisition outcomes', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE',
    );
    expect(report.decision).toBe(
      'FOUR_BOUNDED_LANES_EXECUTED_THREE_NEW_SURFACES_DISCOVERED_ZERO_FORMAL_COVERAGE_ADVANCEMENTS_PRIMARY_AND_PROVENANCE_GAPS_PRESERVED',
    );
    expect(report.exactB27BoundaryAccepted).toBe(true);
  });

  test('represents every B27 lane exactly once', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    expect(report.records).toEqual(CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS);
    expect(report.recordCount).toBe(4);
    expect(report.acquisitionLaneExecutionCount).toBe(4);
  });

  test('records three genuinely new surfaces but zero formal coverage advancement', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    expect(report.genuinelyNewSurfaceDiscoveryCount).toBe(3);
    expect(report.targetBodyOrPassageDirectAcquisitionCount).toBe(1);
    expect(report.formalAuthorityCoverageAdvancementCount).toBe(0);
    expect(report.records.every((record) => record.coverageDelta === 'NONE')).toBe(true);
  });

  test('records Qin full-document access without claiming p464 body acquisition', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    const qin = report.records.find((record) => record.recordId === 'QIN_P464_FULL_DOCUMENT_SURFACE_BODY_PENDING');
    expect(report.qinFullDocumentSurfaceDiscovered).toBe(true);
    expect(report.qinP464BodyAcquired).toBe(false);
    expect(qin?.genuinelyNewSurfaceDiscovered).toBe(true);
    expect(qin?.targetBodyOrPassageDirectlyAcquired).toBe(false);
    expect(qin?.sourceIdentity).toContain('9787204098774');
  });

  test('records the Career-specific disclaimer only as a primary-binding lead', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    const family = report.records.find(
      (record) => record.recordId === 'QIANLI_CAREER_DISCLAIMER_DERIVATIVE_LEAD_PRIMARY_BINDING_PENDING',
    );
    expect(report.familyCareerDisclaimerLeadDiscovered).toBe(true);
    expect(report.familyCareerDisclaimerCorrectedPrimaryBound).toBe(false);
    expect(report.familyLimitsRequirementSatisfied).toBe(false);
    expect(family?.independentNormativeProvenanceAdequate).toBe(false);
    expect(family?.sourceLocator).toContain('printed p.50-p.53');
  });

  test('keeps family current-method compatibility separately unresolved', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    expect(report.familyCurrentMethodCompatibilitySatisfied).toBe(false);
  });

  test('records a direct Ten-God clash Career web semantic lead but rejects normative adequacy', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    const branch = report.records.find(
      (record) => record.recordId === 'BRANCH_CLASH_TENGOD_CAREER_WEB_LEAD_PROVENANCE_INADEQUATE',
    );
    expect(report.branchDirectTenGodClashCareerSemanticLeadDiscovered).toBe(true);
    expect(report.branchIndependentNormativeProvenanceAdequate).toBe(false);
    expect(report.branchCurrentMethodCompatibilitySatisfied).toBe(false);
    expect(branch?.specificCurrentT5CareerSemanticModifierBindingObserved).toBe(true);
    expect(branch?.qualifyingAuthorityCandidate).toBe(false);
  });

  test('preserves the position negative acquisition outcome', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    const position = report.records.find((record) => record.recordId === 'POSITION_NEW_QUALIFYING_SURFACE_NOT_FOUND');
    expect(report.positionNewQualifyingSurfaceAcquired).toBe(false);
    expect(position?.genuinelyNewSurfaceDiscovered).toBe(false);
    expect(position?.negativeOutcomePreserved).toBe(true);
  });

  test('does not count repeated prior surfaces or cross-source stitching as progress', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    expect(report.crossSourceRequirementStitchingUsed).toBe(false);
    expect(report.repeatedPriorSurfaceCountedAsProgress).toBe(false);
  });

  test('keeps visibility plurality and seasonal unconsumed', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    expect(report.visibilityConsumedByThisGate).toBe(false);
    expect(report.pluralityConsumedByThisGate).toBe(false);
    expect(report.seasonalConsumedByThisGate).toBe(false);
    expect(report.pluralityHoldReclassified).toBe(false);
  });

  test('keeps all six gaps open with no authority or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes controls and routes to adequacy review', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      acceptedB27(),
    );
    expect(report.controlIds).toEqual(CAREER_T8_B28_NEW_SURFACE_ACQUISITION_EVIDENCE_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_ADEQUACY_REVIEW',
    );
  });

  test('fails closed when B27 content-addressed identity is tampered', () => {
    const b27 = acceptedB27();
    const tampered: CareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionReadinessReviewReport = {
      ...b27,
      reviewId: `${b27.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityNewEvidenceSurfaceAcquisitionEvidence(
      tampered,
    );
    expect(report.status).toBe('UPSTREAM_B27_BOUNDARY_INVALID');
    expect(report.decision).toBe('NEW_EVIDENCE_SURFACE_ACQUISITION_EVIDENCE_NOT_ESTABLISHED');
    expect(report.records).toEqual([]);
    expect(report.recordCount).toBe(0);
    expect(report.genuinelyNewSurfaceDiscoveryCount).toBe(0);
    expect(report.qinFullDocumentSurfaceDiscovered).toBe(false);
    expect(report.familyCareerDisclaimerLeadDiscovered).toBe(false);
    expect(report.branchDirectTenGodClashCareerSemanticLeadDiscovered).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
