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
import { buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence } from '../src/research/relationship-spouse-t8-current-method-authority-acquisition-continuation-evidence.js';
import { buildRelationshipSpouseT8SourceAccessApplicabilityEvidence } from '../src/research/relationship-spouse-t8-source-access-applicability-evidence.js';
import { buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence } from '../src/research/relationship-spouse-t8-samyeong-wanli-primary-target-evidence.js';
import {
  buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence,
  type RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
} from '../src/research/relationship-spouse-t8-role-neutral-applicability-contract-candidate-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_RECORDS,
  buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence,
} from '../src/research/relationship-spouse-t8-wanli-multi-witness-collation-evidence.js';

function acceptedApplicabilityEvidence() {
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
  const continuation =
    buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(adequacy);
  const sourceAccessApplicability =
    buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(continuation);
  const wanli = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(
    sourceAccessApplicability,
  );
  return buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(wanli);
}

describe('Relationship spouse T8 Wanli multi-witness collation evidence', () => {
  test('accepts the exact #303 applicability boundary and freezes three bounded provenance records', () => {
    const report = buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence(
      acceptedApplicabilityEvidence(),
    );

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE',
    );
    expect(report.decision).toBe(
      'WANLI_1578_FIRST_PRINT_IDENTITY_AND_THREE_WITNESS_COLLATION_PROVENANCE_FROZEN_TARGET_PAGE_STILL_UNBOUND_ZERO_GAP_CLOSURE',
    );
    expect(report.exactUpstreamApplicabilityBoundaryAccepted).toBe(true);
    expect(report.records).toEqual(RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_RECORDS);
    expect(report.recordCount).toBe(3);

    const { evidenceId, ...material } = report;
    expect(evidenceId).toBe(
      `relationship_spouse_t8_wanli_multi_witness_collation_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });

  test('records first-print and critical-collation provenance without converting editorial pagination into a scan page', () => {
    const report = buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence(
      acceptedApplicabilityEvidence(),
    );

    expect(report.wanli1578FirstPrintIdentityEstablished).toBe(true);
    expect(report.taiwanNclOfficialFirstPrintBibliographyEstablished).toBe(true);
    expect(report.taiwanNclTwelveBookPhysicalSetEstablished).toBe(true);
    expect(report.taiwanNclPublicFacsimileContainerMirrorEstablished).toBe(true);
    expect(report.criticalEditionThreeFirstPrintWitnessCollationClaimEstablished).toBe(true);
    expect(report.criticalEditionThreeWitnessesBasicallyConcordantClaimEstablished).toBe(true);
    expect(report.criticalEditionTaiwanVariantNotePreserved).toBe(true);
    expect(report.wifeConcubineExampleChapterVolumeSevenBindingStrengthened).toBe(true);
    expect(report.criticalEditionTargetPrintedPageReference).toBe('658');
    expect(report.criticalEditionPrintedPageTreatedAsFacsimileScanPage).toBe(false);
    expect(report.exactFirstPrintTargetScanPageEstablished).toBe(false);
    expect(report.directFirstPrintTargetPageImageInspected).toBe(false);
    expect(report.qualifyingPrimaryWitnessEstablished).toBe(false);
    expect(report.provenanceProgressClass).toBe(
      'STRONGER_MULTI_WITNESS_FIRST_PRINT_PROVENANCE_NOT_AUTHORITY_QUALIFYING',
    );
  });

  test('preserves all semantic, applicability, and producer gates at zero closure', () => {
    const report = buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence(
      acceptedApplicabilityEvidence(),
    );

    expect(report.applicabilityGapStatus).toBe('PARTIAL_EVIDENCE_NOT_ADEQUATE');
    expect(report.explicitRoleNeutralSpouseNatalMappingEstablished).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.qualifyingAuthorityCandidateCount).toBe(0);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
    expect(report.authorityGapsClosedCount).toBe(0);
    expect(report.allFiveAuthorityGapsRemainOpen).toBe(true);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
  });

  test('freezes zero implementation effects and the direct facsimile next gate', () => {
    const report = buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence(
      acceptedApplicabilityEvidence(),
    );

    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(17);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      officialWanliFirstPrintBibliographiesRecorded: 1,
      publicWanliFirstPrintFacsimileMirrorsRecorded: 1,
      threeWitnessCriticalCollationStatementsRecorded: 1,
      exactTargetScanPagesBound: 0,
      directTargetImagesInspected: 0,
      qualifyingPrimaryWitnessesEstablished: 0,
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
      'BIND_AND_VISUALLY_INSPECT_EXACT_WANLI_FIRST_PRINT_WIFE_CONCUBINE_EXAMPLE_TARGET_SCAN_PAGE_OR_ACQUIRE_INDEPENDENT_NORMATIVE_ROLE_NEUTRAL_NATAL_APPLICABILITY_AUTHORITY_BEFORE_ANY_PRODUCER_GATE',
    );
  });

  test('fails closed when the content-addressed #303 applicability boundary is altered', () => {
    const accepted = acceptedApplicabilityEvidence();
    const altered = {
      ...accepted,
      controlsFrozen: false,
    } as RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport;
    const report = buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence(altered);

    expect(report.status).toBe('UPSTREAM_ROLE_NEUTRAL_APPLICABILITY_BOUNDARY_INVALID');
    expect(report.decision).toBe('WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_NOT_ESTABLISHED');
    expect(report.exactUpstreamApplicabilityBoundaryAccepted).toBe(false);
    expect(report.recordCount).toBe(0);
    expect(report.records).toEqual([]);
    expect(report.wanli1578FirstPrintIdentityEstablished).toBe(false);
    expect(report.controlsFrozen).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.recommendedNextAction).toBe(
      'REESTABLISH_RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE',
    );
  });
});
