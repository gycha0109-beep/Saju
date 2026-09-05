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
import {
  buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview,
  type RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReviewReport,
} from '../src/research/relationship-spouse-t8-current-method-residual-authority-acquisition-evidence-adequacy-reassessment-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_EXPECTED_CLAIM_TYPES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_SUBTYPE_COLLAPSE,
  buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence,
} from '../src/research/relationship-spouse-t8-current-method-authority-acquisition-continuation-evidence.js';

function acceptedAdequacyReview() {
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
  const acquisitionEvidence = buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
    acquisitionReadiness,
  );
  return buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReview(
    acquisitionEvidence,
  );
}

describe('Relationship spouse T8 current-method authority acquisition continuation evidence', () => {
  test('accepts the exact post-acquisition adequacy boundary and records the new lead as research-only', () => {
    const report = buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(
      acceptedAdequacyReview(),
    );

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE',
    );
    expect(report.decision).toBe(
      'NEW_MULTI_FACTOR_SPOUSE_METHOD_LEAD_ACQUIRED_BUT_CURRENT_T5_INFORMATION_LOSS_SEMANTIC_MISMATCH_CONFIRMED_ZERO_GAP_CLOSURE',
    );
    expect(report.exactUpstreamAdequacyBoundaryAccepted).toBe(true);
    expect(report.exactCurrentT5ProducerBoundaryAccepted).toBe(true);
    expect(report.sourceLeadId).toBe(
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.sourceId,
    );
    expect(report.sourceLeadChapter).toBe('妻妾引例章');
    expect(report.sourceLeadTargetFolioSpan).toEqual(['007-88a', '007-88b']);
    expect(report.sourceLeadNextChapterBoundaryFolio).toBe('007-89a');
    expect(report.sourceLeadStableFolioLocators).toEqual(['007-88a', '007-88b', '007-89a']);
    expect(report.sourceLeadExactTargetTextLocatorEstablished).toBe(true);
    expect(report.sourceLeadDirectPrimaryImageInspected).toBe(false);
    expect(report.sourceLeadQualifyingPrimaryWitnessEstablished).toBe(false);
    expect(report.sourceLeadMultiFactorSpouseMethodObserved).toBe(true);
  });

  test('freezes the exact current T5 family-presence conditions, emitted substrate, and information loss', () => {
    const report = buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(
      acceptedAdequacyReview(),
    );

    expect(report.currentT5ProducerPath).toBe(
      'src/research/general-natal-conclusion-synthesis-candidate.ts',
    );
    expect(report.currentT5ClaimCount).toBe(5);
    expect(report.currentT5ObservedClaims.map((item) => item.claimType)).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_EXPECTED_CLAIM_TYPES,
    );
    expect(report.currentT5ObservedClaims.every((item) => item.presence === 'observed')).toBe(true);
    expect(report.currentT5ObservedClaims.every((item) => item.dominance === 'not_scored')).toBe(true);
    expect(report.currentT5FamilySubtypeCollapse).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_SUBTYPE_COLLAPSE,
    );
    expect(report.currentT5ConditionSubtypeSetsVerified).toBe(true);
    expect(report.currentT5ConditionSlotPathsVerified).toBe(true);
    expect(report.currentT5EmittedClaimPreservesTenGodSubtypeIdentity).toBe(false);
    expect(report.currentT5EmittedClaimPreservesSourceSlotIdentity).toBe(false);
    expect(report.currentT5EmittedClaimPreservesSeasonalCommand).toBe(false);
    expect(report.currentT5EmittedClaimPreservesDayMasterStrengthOrWangShuai).toBe(false);
    expect(report.currentT5DominanceScored).toBe(false);
    expect(report.currentT5SpouseSpecificSemanticAuthorityPresent).toBe(false);
    expect(report.currentT5InformationLossSemanticMismatchConfirmed).toBe(true);
    expect(report.semanticReconstructionWouldBeRequired).toBe(true);
    expect(report.semanticReconstructionAuthorized).toBe(false);
  });

  test('keeps every authority, admission, and product effect blocked', () => {
    const report = buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(
      acceptedAdequacyReview(),
    );

    expect(report.exactCurrentClaimClassCompositionAuthorityEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingAuthorityCandidateCount).toBe(0);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
    expect(report.authorityGapClosedByThisEvidence).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(0);
    expect(report.allFiveAuthorityGapsRemainOpen).toBe(true);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.historicalGenderRoleUniversalizationAuthorized).toBe(false);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(report.partnerSexualOrientationInferenceAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
  });

  test('records only negative research progress and preserves the external-acquisition gate', () => {
    const report = buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(
      acceptedAdequacyReview(),
    );

    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(15);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      newExternalSourceLeadsRecorded: 1,
      directPrimaryTargetImagesNewlyInspected: 0,
      currentT5ProducerBoundariesInspected: 1,
      semanticMismatchesConfirmed: 1,
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
      'CONTINUE_EXTERNAL_SOURCE_ACQUISITION_UNTIL_NEW_QUALIFYING_EVIDENCE_EXISTS_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE',
    );
  });

  test('fails closed when the content-addressed upstream adequacy review is altered', () => {
    const accepted = acceptedAdequacyReview();
    const altered = {
      ...accepted,
      controlsFrozen: false,
    } as RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReviewReport;
    const report = buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(altered);

    expect(report.status).toBe('UPSTREAM_ADEQUACY_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.decision).toBe('CONTINUATION_EVIDENCE_NOT_ESTABLISHED');
    expect(report.exactUpstreamAdequacyBoundaryAccepted).toBe(false);
    expect(report.sourceLeadExactTargetTextLocatorEstablished).toBe(false);
    expect(report.sourceLeadMultiFactorSpouseMethodObserved).toBe(false);
    expect(report.currentT5ClaimCount).toBe(0);
    expect(report.currentT5InformationLossSemanticMismatchConfirmed).toBe(false);
    expect(report.controlsFrozen).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.recommendedNextAction).toBe(
      'REESTABLISH_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW',
    );
  });

  test('is deterministic and remains content-addressed', () => {
    const upstream = acceptedAdequacyReview();
    const first = buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(upstream);
    const second = buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(upstream);

    expect(first).toEqual(second);
    const { evidenceId, ...material } = first;
    expect(evidenceId).toBe(
      `relationship_spouse_t8_current_method_authority_acquisition_continuation_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
