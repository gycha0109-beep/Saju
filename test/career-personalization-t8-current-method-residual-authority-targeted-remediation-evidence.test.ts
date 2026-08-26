import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_READINESS_CONTROL_IDS,
  CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_TASKS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport,
} from '../src/research/career-personalization-t8-current-method-residual-authority-targeted-remediation-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_VERSION,
  CAREER_T8_B23_TARGETED_REMEDIATION_EVIDENCE_CONTROL_IDS,
  buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence,
} from '../src/research/career-personalization-t8-current-method-residual-authority-targeted-remediation-evidence.js';
import { I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION } from '../src/research/i253-qianli-primary-witness-provenance-correction-evidence.js';
import { I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION } from '../src/research/i254-qianli-season-plurality-primary-page-binding-hold-record.js';

function acceptedB22(): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport {
  const material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS',
    decision:
      'FOUR_TARGETED_REMEDIATION_TASKS_EXECUTABLE_ONE_CONDITIONAL_ONE_PACK_DEFERRED_NO_ACQUISITION_OR_AUTHORITY_ADMISSION',
    upstreamB21ReviewId: 'career_t8_b21_b23_fixture',
    exactB21BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    tasks: CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_TASKS,
    taskCount: 6,
    executableTaskCount: 4,
    conditionalTaskCount: 1,
    deferredTaskCount: 1,
    allB21RemediationPathsRepresentedExactlyOnce: true,
    targetedEvidenceAcquisitionAuthorizedForNextGate: true,
    broadDiscoveryLoopAuthorized: false,
    broadCurrentMethodSearchRestartAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    qinP464TargetFrozen: true,
    qinTableOfContentsMaySatisfyPassageRequirement: false,
    xuAnchorUseBoundedToExistingPartialEvidence: true,
    positionVisibilityPluralityMayUseSeparateSourceBoundEvidence: true,
    seasonalTaskExecutableNow: false,
    conflictPolicyTaskExecutableNow: false,
    successfulAcquisitionRequiresLaterAdequacyReview: true,
    successfulAcquisitionRequiresLaterAuthorityAdmissionReview: true,
    newAcquisitionPerformedByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    cheonbuHoldReclassified: false,
    wangQingHoldReclassified: false,
    methodologyChoiceMadeByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_READINESS_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      targetedAcquisitionExecutionsPerformed: 0,
      newSourcesAcquired: 0,
      candidateEvidenceRecordsCreated: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE',
  };

  return {
    reviewId: `career_t8_current_method_residual_authority_targeted_remediation_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B23 targeted remediation evidence', () => {
  test('accepts exact B22 and evaluates exactly the four executable targeted tasks', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE');
    expect(report.decision).toBe(
      'FOUR_ACTIVE_TASKS_EVALUATED_FAMILY_RELATION_ADVANCED_TO_MATERIAL_PARTIAL_QIN_BODY_AND_TWO_T6_BRIDGES_REMAIN_UNSATISFIED_SEASON_PLURALITY_EXCLUDED_NO_AUTHORITY_ADMISSION',
    );
    expect(report.recordCount).toBe(4);
    expect(report.evaluatedActiveTaskCount).toBe(4);
    expect(report.records.map((record) => record.taskId)).toEqual([
      'QIN_LUNSHI_P464_BODY_ACQUISITION',
      'T5_FAMILY_RELATION_DIRECT_CAREER_SOURCE_DISCOVERY',
      'T6_BRANCH_CLASH_TO_T5_SEMANTIC_BINDING_SOURCE_DISCOVERY',
      'T6_POSITION_VISIBILITY_PLURALITY_CURRENT_METHOD_SOURCE_DISCOVERY',
    ]);
  });

  test('preserves the historical B20 Qin ISBN typo but carries forward only the corrected B22 ISBN', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());
    const qin = report.records.find((record) => record.recordId === 'QIN_LUNSHI_P464_BODY_TARGETED_ATTEMPT');

    expect(report.historicalB20QinIsbnRetainedAsAuditRecord).toBe('9787504098774');
    expect(report.canonicalQinIsbn).toBe('9787204098774');
    expect(report.historicalB20ArtifactRewritten).toBe(false);
    expect(qin?.sourceIdentity).toContain('9787204098774');
    expect(qin?.sourceIdentity).not.toContain('9787504098774');
  });

  test('keeps Qin p464 fail-closed because the body and local context were not directly acquired', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());
    const qin = report.records.find((record) => record.recordId === 'QIN_LUNSHI_P464_BODY_TARGETED_ATTEMPT');

    expect(qin?.disposition).toBe('BODY_NOT_ACQUIRED_FAIL_CLOSED');
    expect(qin?.coverageClass).toBe('LEAD_ONLY');
    expect(qin?.originalOrVerifiedLocalContextInspected).toBe(false);
    expect(qin?.unsatisfiedCheckIds).toContain('EXACT_TEN_GOD_SUBTYPE_ROLE_PRESERVATION');
    expect(qin?.unsatisfiedCheckIds).toContain('DIRECT_MULTI_CLAIM_CAREER_COMPOSITION');
    expect(qin?.unsatisfiedCheckIds).toContain('DEPENDENCY_ON_WANGSHUAI_GEJU_YONGSHEN_XIJI_INVENTORY');
    expect(qin?.qualifyingAuthorityCandidate).toBe(false);
    expect(report.qinP464BodyAcquired).toBe(false);
    expect(report.qinP464BodyStillRequired).toBe(true);
  });

  test('advances the I253 Qianli p49 family-relation gap to material partial coverage only', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());
    const family = report.records.find(
      (record) => record.recordId === 'QIANLI_1936_P49_FAMILY_RELATION_CAREER_PRIMARY_EVALUATION',
    );

    expect(report.upstreamI253EvidenceVersion).toBe(I253_QIANLI_PRIMARY_WITNESS_PROVENANCE_CORRECTION_EVIDENCE_VERSION);
    expect(family?.coverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(family?.sourceLocator).toContain('printed p.49 / PDF p.336');
    expect(family?.satisfiedCheckIds).toContain('NAMED_TEN_GOD_FAMILY_RELATION_BINDING');
    expect(family?.satisfiedCheckIds).toContain('EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING');
    expect(report.familyRelationCoverageAdvancedFromNone).toBe(true);
    expect(report.familyRelationCoverageNow).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
  });

  test('does not promote Qianli p49 because limits, current-method compatibility, and structure-effect distinction remain unresolved', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());
    const family = report.records.find(
      (record) => record.recordId === 'QIANLI_1936_P49_FAMILY_RELATION_CAREER_PRIMARY_EVALUATION',
    );

    expect(family?.unsatisfiedCheckIds).toContain('EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS');
    expect(family?.unsatisfiedCheckIds).toContain('CURRENT_METHOD_COMPATIBILITY');
    expect(family?.unsatisfiedCheckIds).toContain('STRUCTURE_VERSUS_SEMANTIC_EFFECT_DISTINCTION');
    expect(family?.historicalOccupationModernized).toBe(false);
    expect(family?.qualifyingAuthorityCandidate).toBe(false);
    expect(family?.authorityAdmissionAuthorized).toBe(false);
    expect(family?.gapClosureAuthorized).toBe(false);
    expect(report.familyRelationAuthorityAdmitted).toBe(false);
  });

  test('keeps branch-clash to specific current-T5 Career modifier unresolved without cross-source stitching', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());
    const clash = report.records.find(
      (record) => record.recordId === 'BRANCH_CLASH_TO_SPECIFIC_T5_CAREER_MODIFIER_TARGETED_ATTEMPT',
    );

    expect(clash?.disposition).toBe('NO_QUALIFYING_SINGLE_SOURCE_BRIDGE_FOUND');
    expect(clash?.specificCurrentT5CareerSemanticModifierBindingObserved).toBe(false);
    expect(clash?.unsatisfiedCheckIds).toContain('SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING');
    expect(clash?.unsatisfiedCheckIds).toContain('QUALITATIVE_MODIFICATION_MODE_SOURCE_EXPLICIT');
    expect(clash?.crossSourceStitchingUsed).toBe(false);
    expect(report.branchClashSpecificT5ModifierBridgeAcquired).toBe(false);
    expect(report.crossSourceRequirementStitchingUsed).toBe(false);
  });

  test('keeps position, visibility, and plurality separate and preserves the I254 plurality hold', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());
    const dimension = report.records.find(
      (record) => record.recordId === 'POSITION_VISIBILITY_PLURALITY_TO_T5_CAREER_TARGETED_ATTEMPT',
    );

    expect(report.upstreamI254HoldVersion).toBe(I254_QIANLI_SEASON_PLURALITY_PRIMARY_PAGE_BINDING_HOLD_RECORD_VERSION);
    expect(dimension?.disposition).toBe('POSITION_PARTIAL_VISIBILITY_UNBOUND_PLURALITY_HELD');
    expect(dimension?.satisfiedCheckIds).toContain('POSITION_CAREER_BINDING');
    expect(dimension?.unsatisfiedCheckIds).toContain('VISIBILITY_CAREER_BINDING_IF_CONSUMED');
    expect(dimension?.unsatisfiedCheckIds).toContain('PLURALITY_CAREER_BINDING_IF_CONSUMED');
    expect(dimension?.unsatisfiedCheckIds).toContain('SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING');
    expect(report.positionSpecificT5ModifierBridgeAcquired).toBe(false);
    expect(report.visibilityCareerBindingAcquired).toBe(false);
    expect(report.pluralityCareerBindingAcquired).toBe(false);
    expect(report.pluralityExplicitlyExcludedByI254).toBe(true);
  });

  test('does not activate conditional seasonal or deferred conflict-policy tasks', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());

    expect(report.seasonalCareerDimensionConsumed).toBe(false);
    expect(report.conditionalSeasonalRemediationActivated).toBe(false);
    expect(report.conflictPolicyTaskActivated).toBe(false);
    expect(report.relativeForceOrAutomaticPrecedenceImported).toBe(false);
  });

  test('keeps all six synthesis gaps open and creates no T8 or production artifacts', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());

    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.methodologyChoiceMadeByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.implementationEffects.gapsMateriallyAdvancedWithoutClosure).toBe(1);
    expect(report.implementationEffects.authorityGapsClosed).toBe(0);
  });

  test('freezes the exact B23 control set and routes to targeted evidence adequacy review', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());

    expect(report.controlIds).toEqual(CAREER_T8_B23_TARGETED_REMEDIATION_EVIDENCE_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW',
    );
  });

  test('makes every targeted record explicitly non-promoting even when partial evidence is strong', () => {
    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());

    for (const record of report.records) {
      expect(record.crossSourceStitchingUsed).toBe(false);
      expect(record.relativeForceOrAutomaticPrecedenceImported).toBe(false);
      expect(record.historicalOccupationModernized).toBe(false);
      expect(record.qualifyingAuthorityCandidate).toBe(false);
      expect(record.authorityAdmissionAuthorized).toBe(false);
      expect(record.gapClosureAuthorized).toBe(false);
      expect(record.t8AuthoringAuthorized).toBe(false);
    }
  });

  test('is deterministic for the same exact B22 content-addressed boundary', () => {
    const first = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());
    const second = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(acceptedB22());

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed when the content-addressed B22 identity is tampered', () => {
    const b22 = acceptedB22();
    const tampered: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport = {
      ...b22,
      reviewId: `${b22.reviewId}_tampered`,
    };

    const report = buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidence(tampered);

    expect(report.status).toBe('UPSTREAM_B22_BOUNDARY_INVALID');
    expect(report.decision).toBe('TARGETED_REMEDIATION_EVIDENCE_NOT_ESTABLISHED');
    expect(report.exactB22BoundaryAccepted).toBe(false);
    expect(report.recordCount).toBe(0);
    expect(report.records).toEqual([]);
    expect(report.familyRelationCoverageAdvancedFromNone).toBe(false);
    expect(report.qinP464BodyStillRequired).toBe(false);
    expect(report.pluralityExplicitlyExcludedByI254).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW',
    );
  });
});
