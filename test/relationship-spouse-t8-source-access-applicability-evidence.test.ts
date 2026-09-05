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
import { buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview } from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-readiness-review.js';
import { buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence } from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-evidence.js';
import { buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview } from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-evidence-adequacy-reassessment-review.js';
import {
  buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence,
  type RelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidenceReport,
} from '../src/research/relationship-spouse-t8-current-method-authority-acquisition-continuation-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_RECORDS,
  RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8SourceAccessApplicabilityEvidence,
} from '../src/research/relationship-spouse-t8-source-access-applicability-evidence.js';

function acceptedContinuationEvidence() {
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
  const acquisitionReadiness =
    buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(methodBoundary);
  const acquisitionEvidence =
    buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(acquisitionReadiness);
  const adequacy =
    buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
      acquisitionEvidence,
    );
  return buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(adequacy);
}

describe('Relationship spouse T8 source-access and applicability evidence', () => {
  test('accepts the exact #299 continuation boundary and records three bounded research evidence records', () => {
    const report = buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(
      acceptedContinuationEvidence(),
    );

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE',
    );
    expect(report.decision).toBe(
      'HIGHER_PROVENANCE_MODERN_GENDER_ASYMMETRY_EVIDENCE_UPGRADES_APPLICABILITY_TO_PARTIAL_WHILE_DIRECT_FACSIMILE_AND_CURRENT_METHOD_AUTHORITY_REMAIN_UNRESOLVED',
    );
    expect(report.exactUpstreamContinuationBoundaryAccepted).toBe(true);
    expect(report.evidenceRecords).toEqual(
      RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE_RECORDS,
    );
    expect(report.evidenceRecordCount).toBe(3);
  });

  test('records institutional scan access and historical corroboration without claiming direct facsimile inspection', () => {
    const report = buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(
      acceptedContinuationEvidence(),
    );

    expect(report.samyeongWygTargetFolioSpanStillBounded).toBe(true);
    expect(report.samyeongWygDirectTargetImageInspected).toBe(false);
    expect(report.samyeongNlcInstitutionalScanContainerEstablished).toBe(true);
    expect(report.samyeongNlcTargetTextSearchIndexed).toBe(true);
    expect(report.samyeongNlcExactTargetPdfPageNumberEstablished).toBe(false);
    expect(report.samyeongNlcDirectTargetPageImageInspected).toBe(false);
    expect(report.samyeongNlcQualifyingPrimaryWitnessEstablished).toBe(false);
    expect(report.gujinHistoricalCompilationWitnessLocated).toBe(true);
    expect(report.gujinHistoricalCompilationDirectPageImageInspected).toBe(false);
    expect(report.gujinWitnessQualifiesAsSamyeongPrimaryWitness).toBe(false);
    expect(report.samyeongTextualMethodCorroborationStrengthened).toBe(true);
  });

  test('upgrades the applicability gap from no qualifying evidence to partial but inadequate without synthesizing a missing contract', () => {
    const report = buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(
      acceptedContinuationEvidence(),
    );

    expect(report.kciGenderAsymmetryStudyLocated).toBe(true);
    expect(report.kciStudyKciIndexed).toBe(true);
    expect(report.kciStudyDirectlyAddressesMingliGenderAsymmetry).toBe(true);
    expect(report.kciStudySupportsRemovingHistoricalDiscriminatoryMoralStigma).toBe(true);
    expect(report.applicabilityGapPreviousStatus).toBe('NO_QUALIFYING_EVIDENCE');
    expect(report.applicabilityGapCurrentStatus).toBe('PARTIAL_EVIDENCE_NOT_ADEQUATE');
    expect(report.applicabilityGapProgressRecognized).toBe(true);
    expect(report.modernApplicabilityBoundaryPartialEvidenceEstablished).toBe(true);
    expect(report.independentModernGenderAsymmetryProvenanceLocated).toBe(true);
    expect(report.kciStudyExplicitGenderNeutralSpouseNatalContractEstablished).toBe(false);
    expect(report.kciStudyExplicitNoUserOrPartnerSexInferenceContractEstablished).toBe(false);
    expect(report.kciStudyExplicitNoPartnerSexualOrientationInferenceContractEstablished).toBe(false);
    expect(report.explicitGenderNeutralSpouseNatalApplicabilityEstablished).toBe(false);
    expect(report.explicitNoUserOrPartnerSexInferenceEstablished).toBe(false);
    expect(report.explicitNoPartnerSexualOrientationInferenceEstablished).toBe(false);
    expect(report.modernApplicabilityBoundaryAdequateForGapClosure).toBe(false);
    expect(report.applicabilityGapClosedByThisEvidence).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
  });

  test('keeps all five authority gaps open and every semantic/product effect blocked', () => {
    const report = buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(
      acceptedContinuationEvidence(),
    );

    expect(report.exactCurrentClaimClassCompositionAuthorityEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingAuthorityCandidateCount).toBe(0);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
    expect(report.authorityGapsClosedCount).toBe(0);
    expect(report.allFiveAuthorityGapsRemainOpen).toBe(true);
    expect(report.partialButInadequateRequirementCount).toBe(5);
    expect(report.noQualifyingEvidenceRequirementCount).toBe(0);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.historicalGenderRoleUniversalizationAuthorized).toBe(false);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(report.partnerSexualOrientationInferenceAuthorized).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
  });

  test('freezes controls, zero implementation effects, and the next external-acquisition gate', () => {
    const report = buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(
      acceptedContinuationEvidence(),
    );

    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      sourceAccessEvidenceRecordsRecorded: 3,
      institutionalScanContainersNewlyRecorded: 1,
      historicalCorroborationWitnessesNewlyRecorded: 1,
      higherProvenanceModernApplicabilitySourcesNewlyRecorded: 1,
      directPrimaryTargetImagesNewlyInspected: 0,
      applicabilityRequirementsUpgradedFromNoEvidenceToPartial: 1,
      authorityRequirementsSatisfied: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
    expect(report.recommendedNextAction).toBe(
      'ACQUIRE_DIRECT_SAMYEONG_TARGET_FACSIMILE_AND_EXPLICIT_GENDER_NEUTRAL_SPOUSE_NATAL_APPLICABILITY_AUTHORITY_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE',
    );
  });

  test('fails closed when the content-addressed #299 continuation boundary is altered', () => {
    const accepted = acceptedContinuationEvidence();
    const altered = {
      ...accepted,
      controlsFrozen: false,
    } as RelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidenceReport;
    const report = buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(altered);

    expect(report.status).toBe('UPSTREAM_CONTINUATION_EVIDENCE_BOUNDARY_INVALID');
    expect(report.decision).toBe('SOURCE_ACCESS_APPLICABILITY_EVIDENCE_NOT_ESTABLISHED');
    expect(report.exactUpstreamContinuationBoundaryAccepted).toBe(false);
    expect(report.evidenceRecordCount).toBe(0);
    expect(report.evidenceRecords).toEqual([]);
    expect(report.applicabilityGapCurrentStatus).toBe('NOT_REASSESSED_DUE_TO_INVALID_UPSTREAM');
    expect(report.applicabilityGapProgressRecognized).toBe(false);
    expect(report.modernApplicabilityBoundaryPartialEvidenceEstablished).toBe(false);
    expect(report.controlsFrozen).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.recommendedNextAction).toBe(
      'REESTABLISH_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE',
    );
  });

  test('is deterministic and content-addressed', () => {
    const upstream = acceptedContinuationEvidence();
    const first = buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(upstream);
    const second = buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(upstream);

    expect(first).toEqual(second);
    const { evidenceId, ...material } = first;
    expect(evidenceId).toBe(
      `relationship_spouse_t8_source_access_applicability_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
