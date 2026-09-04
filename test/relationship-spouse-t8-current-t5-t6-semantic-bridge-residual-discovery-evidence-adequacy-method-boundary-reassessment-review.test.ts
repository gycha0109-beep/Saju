import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';
import { buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence } from '../src/research/relationship-spouse-t8-authority-candidate-discovery-evidence.js';
import { buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation } from '../src/research/relationship-spouse-t8-authority-candidate-requirement-coverage-evaluation.js';
import { buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview } from '../src/research/relationship-spouse-t8-authority-residual-gap-reassessment-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-targeted-source-access-requirements-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-active-remediation-execution-readiness-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-remediation-evidence-adequacy-residual-path-reassessment-review.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-readiness-review.js';
import {
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidenceReport,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION,
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review.js';

function acceptedExecutionEvidence() {
  const discoveryReadiness = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
    buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview(),
  );
  const discoveryEvidence =
    buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(discoveryReadiness);
  const coverage = buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
    discoveryReadiness,
    discoveryEvidence,
  );
  const residual = buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(coverage);
  const bridgeReadiness =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(residual);
  const bridgeDiscovery =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
      bridgeReadiness,
    );
  const sourceAccess =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
      bridgeDiscovery,
    );
  const executionReadiness =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
      sourceAccess,
    );
  const executionEvidence =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
      executionReadiness,
    );
  const residualReassessment =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
      executionEvidence,
    );
  const residualExecutionReadiness =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
      residualReassessment,
    );
  return buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(
    residualExecutionReadiness,
  );
}

describe('Relationship spouse T8 residual discovery evidence adequacy and method-boundary reassessment', () => {
  test('accepts the exact execution-evidence boundary and selects four residual classes', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        acceptedExecutionEvidence(),
      );

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT',
    );
    expect(report.decision).toBe(
      'PARTIAL_EVIDENCE_VALID_FOUR_CURRENT_METHOD_AUTHORITY_FRONTIERS_REMAIN_OPEN_NO_COMPETING_METHOD_ADOPTION_NO_AUTHORITY_ACQUIRED',
    );
    expect(report.residualClassCount).toBe(4);
    expect(report.residualClasses).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES,
    );
    expect(report.activePrimaryWitnessVerificationFrontierCount).toBe(2);
    expect(report.activeNormativeProvenanceFrontierCount).toBe(1);
    expect(report.activeCurrentMethodAuthorityDiscoveryFrontierCount).toBe(1);
  });

  test('treats partial execution evidence as classification evidence only', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        acceptedExecutionEvidence(),
      );

    expect(report.executionEvidenceAdequateForResidualClassificationOnly).toBe(true);
    expect(report.executionEvidenceAdequateForAuthorityAdmission).toBe(false);
    expect(report.executionEvidenceAdequateForGapClosure).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('keeps WYG and Yuanhai as direct primary-witness verification frontiers', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        acceptedExecutionEvidence(),
      );
    const wyg = report.residualClasses.find(
      (item) => item.classId === 'WYG_DIRECT_PRIMARY_IMAGE_VERIFICATION_FRONTIER',
    );
    const yuanhai = report.residualClasses.find(
      (item) => item.classId === 'YUANHAI_PRIMARY_PASSAGE_VERIFICATION_FRONTIER',
    );

    expect(report.wygDirectPrimaryImageVerificationMayContinue).toBe(true);
    expect(report.yuanhaiPrimaryPassageVerificationMayContinue).toBe(true);
    expect(report.directPrimaryImageRequirementWaived).toBe(false);
    expect(wyg?.status).toBe('ACTIVE_PRIMARY_WITNESS_VERIFICATION');
    expect(wyg?.retainedCandidateIds).toEqual([
      'WYG_0810_SCAN_CONTAINER',
      'KANRIPO_WYG_V5_FOLIO_INDEX',
      'KANRIPO_WYG_V6_FOLIO_INDEX',
    ]);
    expect(yuanhai?.retainedCandidateIds).toEqual([
      'NCL_06593_YUANHAI_MING_1600_SCAN',
      'NLC_YUANHAI_MING_SCAN_SERIES',
      'SHIDIAN_YUANHAI_VOL3_OCR_CONTEXT',
    ]);
  });

  test('keeps modern role-neutral policy leads behind a normative-provenance boundary', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        acceptedExecutionEvidence(),
      );
    const frontier = report.residualClasses.find(
      (item) => item.classId === 'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_FRONTIER',
    );

    expect(report.modernApplicabilityNormativeProvenanceDiscoveryMayContinue).toBe(true);
    expect(report.independentNormativeProvenanceRequirementWaived).toBe(false);
    expect(report.modernEditorialPolicySemanticUseAuthorized).toBe(false);
    expect(report.rawHistoricalGenderRoleSemanticUseAuthorized).toBe(false);
    expect(frontier?.status).toBe('ACTIVE_NORMATIVE_PROVENANCE_DISCOVERY');
    expect(frontier?.retainedCandidateIds).toEqual([
      'CLARIFY_GENDER_NEUTRAL_SPOUSE_POLICY',
      'OPENFATE_GENDER_NEUTRAL_SPOUSE_POLICY',
    ]);
  });

  test('keeps multi-layer guides behind exact current claim-class composition authority', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        acceptedExecutionEvidence(),
      );
    const frontier = report.residualClasses.find(
      (item) => item.classId === 'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_FRONTIER',
    );

    expect(report.exactCurrentClaimClassCompositionAuthorityDiscoveryMayContinue).toBe(true);
    expect(report.currentClaimClassCompositionRequirementWaived).toBe(false);
    expect(report.modernPractitionerCompositionSemanticUseAuthorized).toBe(false);
    expect(frontier?.status).toBe('ACTIVE_CURRENT_METHOD_AUTHORITY_DISCOVERY');
    expect(frontier?.retainedCandidateIds).toEqual([
      'AUSPDAY_RELATIONSHIP_COMPOSITION_GUIDE',
      'SUPERBAZI_RELATIONSHIP_COMPOSITION_GUIDE',
    ]);
  });

  test('does not invent a competing-method choice or use human choice as substitute authority', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        acceptedExecutionEvidence(),
      );

    expect(report.competingFoundationalMethodChoiceSurfaced).toBe(false);
    expect(report.methodologyChoiceMadeByThisGate).toBe(false);
    expect(report.humanMethodologyChoiceRequiredBeforeContinuingEvidenceAcquisition).toBe(false);
    expect(report.residualClasses.every((item) => item.mayContinueWithoutHumanMethodologyChoice)).toBe(true);
    expect(report.residualClasses.every((item) => item.humanMethodologyChoiceRequiredBeforeSemanticUse === false)).toBe(true);
  });

  test('forbids source/frontier stitching and keeps all five spouse gaps open', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        acceptedExecutionEvidence(),
      );

    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossFrontierStitchingAuthorized).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
  });

  test('freezes controls and creates zero semantic or product artifacts', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        acceptedExecutionEvidence(),
      );

    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      residualClassesSelected: 4,
      activeRemediationFrontiersSelected: 4,
      humanMethodologyChoicesMade: 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed when upstream execution evidence is tampered', () => {
    const evidence = acceptedExecutionEvidence();
    const tampered = {
      ...evidence,
      totalCandidateAttemptCount: 9,
    } as unknown as RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidenceReport;
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        tampered,
      );

    expect(report.status).toBe('UPSTREAM_RESIDUAL_EXECUTION_EVIDENCE_BOUNDARY_INVALID');
    expect(report.exactExecutionEvidenceBoundaryAccepted).toBe(false);
    expect(report.residualClasses).toEqual([]);
    expect(report.residualClassCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE',
    );
  });

  test('is deterministic and routes only to current-method residual authority acquisition readiness', () => {
    const evidence = acceptedExecutionEvidence();
    const first =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        evidence,
      );
    const second =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
        evidence,
      );

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `relationship_spouse_t8_current_bridge_method_boundary_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
  });
});
