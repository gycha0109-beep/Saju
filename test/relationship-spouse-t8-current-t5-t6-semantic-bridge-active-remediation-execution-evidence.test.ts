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
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_RECORDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION,
  buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence,
} from '../src/research/relationship-spouse-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence.js';

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
  return buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
    sourceAccess,
  );
}

describe('Relationship spouse T8 current T5/T6 active remediation execution evidence', () => {
  test('records three executed research tasks with nine source attempts and no authority acceptance', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
        acceptedReadiness(),
      );

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE',
    );
    expect(report.decision).toBe(
      'V5_V6_DIRECT_FACSIMILE_ACCESS_BLOCKED_PARTIAL_TEXT_AND_INDEPENDENT_CLASSIC_LEADS_MODERN_SCOPE_REQUIRES_ADDITIONAL_AUTHORITY_NO_AUTHORITY_ACQUIRED',
    );
    expect(report.executionPerformed).toBe(true);
    expect(report.taskEvidenceRecordCount).toBe(3);
    expect(report.taskEvidenceRecords).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_RECORDS,
    );
    expect(report.totalSourceAttemptCount).toBe(9);
    expect(report.samyeongV5SourceAttemptCount).toBe(4);
    expect(report.samyeongV6SourceAttemptCount).toBe(4);
    expect(report.modernScopeEvidenceAttemptCount).toBe(1);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
  });

  test('records volume five as access-blocked while preserving historical wealth-spouse and independent classic leads', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
        acceptedReadiness(),
      );
    const record = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'SAMYEONG_V5_FACSIMILE_WITNESS_INSPECTION_EXECUTION',
    );

    expect(report.samyeongV5PrimaryDisposition).toBe('ACCESS_BLOCKED');
    expect(report.samyeongV5PartialEvidencePreserved).toBe(true);
    expect(report.samyeongV5DirectFacsimileImageInspected).toBe(false);
    expect(report.samyeongV5RequiredWygPrimaryWitnessSatisfied).toBe(false);
    expect(report.samyeongV5HistoricalWealthSpouseVocabularyObserved).toBe(true);
    expect(report.samyeongV5CurrentWealthCorrespondenceAdmitted).toBe(false);
    expect(record?.secondaryDispositions).toEqual(['PARTIAL_EVIDENCE_ACQUIRED']);
    expect(record?.sourceAttempts.some((attempt) => attempt.independentFromSamyeong)).toBe(true);
    expect(
      record?.sourceAttempts.find((attempt) => attempt.attemptId.includes('wikisource_siku'))
        ?.wealthSpouseVocabularyObserved,
    ).toBe(true);
  });

  test('records exact WYG volume-six indexed locator evidence but rejects it as a facsimile substitute', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
        acceptedReadiness(),
      );
    const record = report.taskEvidenceRecords.find(
      (item) =>
        item.taskId === 'SAMYEONG_V6_OFFICER_WEALTH_FACSIMILE_WITNESS_INSPECTION_EXECUTION',
    );
    const kanripo = record?.sourceAttempts.find((attempt) => attempt.attemptId.includes('kanripo'));

    expect(report.samyeongV6PrimaryDisposition).toBe('ACCESS_BLOCKED');
    expect(report.samyeongV6WygIndexedPageLocatorConfirmed).toBe(true);
    expect(report.samyeongV6DirectFacsimileImageInspected).toBe(false);
    expect(report.samyeongV6RequiredWygPrimaryWitnessSatisfied).toBe(false);
    expect(report.samyeongV6HistoricalOfficerSpouseVocabularyObserved).toBe(true);
    expect(report.samyeongV6HistoricalWealthSpouseVocabularyObserved).toBe(true);
    expect(report.samyeongV6CurrentOfficerCorrespondenceAdmitted).toBe(false);
    expect(report.samyeongV6CurrentWealthCorrespondenceAdmitted).toBe(false);
    expect(kanripo?.requiredWygEditionIdentityConfirmed).toBe(true);
    expect(kanripo?.reproducibleLocatorObserved).toBe(true);
    expect(kanripo?.directFacsimileImageInspected).toBe(false);
    expect(kanripo?.directFacsimileImageAccessBlocked).toBe(true);
    expect(kanripo?.primaryWitnessRequirementSatisfied).toBe(false);
  });

  test('keeps Yuanhai Ziping as one independent classic corroboration lead without admitting normative provenance', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
        acceptedReadiness(),
      );
    const independentAttempts = report.taskEvidenceRecords.flatMap((record) =>
      record.sourceAttempts.filter((attempt) => attempt.independentFromSamyeong),
    );

    expect(report.independentClassicCorroborationLeadObserved).toBe(true);
    expect(report.independentClassicCorroborationSourceCount).toBe(1);
    expect(report.independentNormativeProvenanceEstablished).toBe(false);
    expect(independentAttempts.some((attempt) => attempt.title.includes('淵海子平'))).toBe(true);
    expect(independentAttempts.every((attempt) => !attempt.primaryWitnessRequirementSatisfied)).toBe(true);
  });

  test('adjudicates the historical gender-role mapping as requiring additional modern spouse authority', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
        acceptedReadiness(),
      );
    const record = report.taskEvidenceRecords.find(
      (item) => item.taskId === 'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION_EXECUTION',
    );

    expect(report.modernScopePrimaryDisposition).toBe('MODERN_SCOPE_REQUIRES_ADDITIONAL_AUTHORITY');
    expect(record?.secondaryDispositions).toEqual(['MODERN_SCOPE_INCOMPATIBLE']);
    expect(report.modernScopeAdjudicationPerformed).toBe(true);
    expect(report.historicalMappingGenderRoleBound).toBe(true);
    expect(report.genderNeutralSpouseApplicabilityEstablished).toBe(false);
    expect(report.rawHistoricalMappingUsableAsProductSemantic).toBe(false);
    expect(report.modernScopeAdditionalAuthorityRequired).toBe(true);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(report.partnerAttributeOrOutcomePromotionAuthorized).toBe(false);
    expect(report.compatibilityOrTimingPromotionAuthorized).toBe(false);
  });

  test('keeps all five spouse gaps open and creates no product interpretation artifacts', () => {
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(
        acceptedReadiness(),
      );

    expect(report.allFiveGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toHaveLength(5);
    expect(report.authorityGapClosedCount).toBe(0);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.currentRelationshipT6ExecutionTaskCreated).toBe(false);
    expect(report.negativeEvidencePreserved).toBe(true);
    expect(report.fallbackAuthoritySynthesized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(15);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      sourceAttemptsRecorded: 9,
      evidenceRecordsCreated: 3,
      scopeAdjudicationsPerformed: 1,
      primaryWitnessImagesInspected: 0,
      registeredSourcesCreated: 0,
      registeredCandidatesCreated: 0,
      authorityCandidatesAccepted: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed when the upstream active-remediation readiness identity is altered', () => {
    const readiness = acceptedReadiness();
    const altered = { ...readiness, reviewId: `${readiness.reviewId}_altered` };
    const report =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(altered);

    expect(report.status).toBe('UPSTREAM_ACTIVE_REMEDIATION_READINESS_BOUNDARY_INVALID');
    expect(report.exactReadinessBoundaryAccepted).toBe(false);
    expect(report.executionPerformed).toBe(false);
    expect(report.taskEvidenceRecordCount).toBe(0);
    expect(report.taskEvidenceRecords).toEqual([]);
    expect(report.totalSourceAttemptCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW',
    );
  });

  test('is deterministic and routes only to remediation evidence adequacy and residual-path reassessment', () => {
    const readiness = acceptedReadiness();
    const first =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(readiness);
    const second =
      buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidence(readiness);

    expect(first).toEqual(second);
    const { evidenceId, ...material } = first;
    expect(evidenceId).toBe(
      `relationship_spouse_t8_current_bridge_active_remediation_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW',
    );
  });
});
