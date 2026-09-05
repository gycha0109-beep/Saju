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
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-evidence.js';
import { buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview } from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review.js';
import {
  buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview,
  type RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
} from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_RECORDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION,
  buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence,
} from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-evidence.js';

function acceptedReadiness() {
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
  const residualExecutionEvidence =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidence(
      residualExecutionReadiness,
    );
  const methodBoundary =
    buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
      residualExecutionEvidence,
    );
  return buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(
    methodBoundary,
  );
}

describe('Relationship spouse T8 current-method residual authority acquisition evidence', () => {
  test('accepts the exact readiness boundary and records all four frozen acquisition outcomes', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
      acceptedReadiness(),
    );

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE',
    );
    expect(report.decision).toBe(
      'PARTIAL_EVIDENCE_ACQUIRED_ZERO_QUALIFYING_AUTHORITY_ALL_FIVE_GAPS_REMAIN_OPEN',
    );
    expect(report.executionPerformed).toBe(true);
    expect(report.taskEvidenceRecordCount).toBe(4);
    expect(report.taskEvidenceRecords).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_RECORDS,
    );
    expect(new Set(report.taskEvidenceRecords.map((item) => item.taskId))).toEqual(
      new Set([
        'WYG_DIRECT_PRIMARY_IMAGE_AUTHORITY_ACQUISITION',
        'YUANHAI_PRIMARY_PASSAGE_AUTHORITY_ACQUISITION',
        'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_ACQUISITION',
        'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_ACQUISITION',
      ]),
    );
    expect(report.qualifyingAuthorityCandidateCount).toBe(0);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
  });

  test('keeps WYG blocked because the exact folio-to-0810 scan-page image binding is still missing', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
      acceptedReadiness(),
    );
    const wyg = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'WYG_DIRECT_PRIMARY_IMAGE_AUTHORITY_ACQUISITION',
    );

    expect(report.wygFolioTo0810ScanPageBindingEstablished).toBe(false);
    expect(report.wygDirectTargetPageImageInspected).toBe(false);
    expect(wyg?.boundedContextInspected).toBe(true);
    expect(wyg?.historicalSpouseSemanticBindingObserved).toBe(true);
    expect(wyg?.directPrimaryImageInspected).toBe(false);
    expect(wyg?.disposition).toBe('PAGE_BINDING_NOT_ESTABLISHED');
    expect(wyg?.qualifyingCandidate).toBe(false);
  });

  test('records the Yuanhai NLC direct target image upgrade without upgrading normative authority', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
      acceptedReadiness(),
    );
    const yuanhai = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'YUANHAI_PRIMARY_PASSAGE_AUTHORITY_ACQUISITION',
    );

    expect(report.yuanhaiExactPrimaryPassagePageLocatorEstablished).toBe(true);
    expect(report.yuanhaiDirectPrimaryPassageImageInspected).toBe(true);
    expect(report.yuanhaiBoundedPrimaryContextInspected).toBe(true);
    expect(report.yuanhaiWorkIdentityIndependentFromSamyeong).toBe(true);
    expect(yuanhai?.directPrimaryImageInspected).toBe(true);
    expect(yuanhai?.boundedContextInspected).toBe(true);
    expect(yuanhai?.disposition).toBe('PARTIAL_EVIDENCE_ACQUIRED');
    expect(yuanhai?.secondaryDispositions).toContain('PROVENANCE_INSUFFICIENT');
    expect(yuanhai?.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(yuanhai?.qualifyingCandidate).toBe(false);
    expect(report.independentNormativeProvenanceEstablished).toBe(false);
  });

  test('rejects a higher-provenance modern compatibility paper as spouse-natal applicability authority', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
      acceptedReadiness(),
    );
    const modern = report.taskEvidenceRecords.find(
      (item) =>
        item.taskId === 'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_ACQUISITION',
    );

    expect(report.higherProvenanceModernSourceLocated).toBe(true);
    expect(report.explicitGenderNeutralSpouseNatalApplicabilityEstablished).toBe(false);
    expect(report.explicitNoUserPartnerSexOrOrientationInferenceEstablished).toBe(false);
    expect(report.modernApplicabilityNormativeAuthorityAdequateCount).toBe(0);
    expect(modern?.sourceProvenanceIndependent).toBe(true);
    expect(modern?.applicabilityExplicit).toBe(false);
    expect(modern?.currentGovernedMethodCompatible).toBe(false);
    expect(modern?.disposition).toBe('APPLICABILITY_AUTHORITY_NOT_FOUND');
    expect(modern?.secondaryDispositions).toContain('SCOPE_INCOMPATIBLE');
    expect(modern?.qualifyingCandidate).toBe(false);
  });

  test('preserves the Ziping multi-factor spouse method but rejects it as exact current claim-class composition authority', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
      acceptedReadiness(),
    );
    const composition = report.taskEvidenceRecords.find(
      (item) =>
        item.taskId === 'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_ACQUISITION',
    );

    expect(report.zipingMultiFactorSpouseCompositionObserved).toBe(true);
    expect(composition?.multiClaimCompositionExplicit).toBe(true);
    expect(composition?.conflictOrAmbiguityHandlingExplicit).toBe(true);
    expect(composition?.positiveScopeExclusionsAndExceptionsExplicit).toBe(true);
    expect(composition?.eligibleCurrentUpstreamClaimClassesExplicit).toBe(false);
    expect(composition?.currentGovernedMethodCompatible).toBe(false);
    expect(composition?.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(composition?.disposition).toBe('SEMANTIC_MISMATCH');
    expect(composition?.secondaryDispositions).toContain(
      'COMPOSITION_SCOPE_AUTHORITY_NOT_FOUND',
    );
    expect(report.exactCurrentClaimClassCompositionAuthorityEstablished).toBe(false);
  });

  test('preserves all five gaps, the absent relationship T6 path, and every implementation prohibition', () => {
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
      acceptedReadiness(),
    );

    expect(report.negativePartialAndMismatchEvidencePreserved).toBe(true);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(report.historicalGenderRoleUniversalizationAuthorized).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.relationshipT6ExecutionTaskCreated).toBe(false);
    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      acquisitionExecutionsPerformed: 4,
      evidenceRecordsCreated: 4,
      directPrimaryTargetPagesNewlyVerified: 1,
      higherProvenanceModernSourcesAssessed: 1,
      registeredSourcesCreated: 0,
      registeredCandidatesCreated: 0,
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

  test('fails closed when the content-addressed readiness boundary is altered', () => {
    const readiness = acceptedReadiness();
    const altered = {
      ...readiness,
      acquisitionTaskCount: 3,
    } as unknown as RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport;
    const report = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(altered);

    expect(report.status).toBe('UPSTREAM_CURRENT_METHOD_ACQUISITION_READINESS_INVALID');
    expect(report.exactReadinessBoundaryAccepted).toBe(false);
    expect(report.executionPerformed).toBe(false);
    expect(report.taskEvidenceRecordCount).toBe(0);
    expect(report.taskEvidenceRecords).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
  });

  test('is deterministic and routes only to evidence adequacy reassessment', () => {
    const readiness = acceptedReadiness();
    const first = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
      readiness,
    );
    const second = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
      readiness,
    );

    expect(first).toEqual(second);
    const { evidenceId, ...material } = first;
    expect(evidenceId).toBe(
      `relationship_spouse_t8_current_method_residual_authority_acquisition_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW',
    );
  });
});
