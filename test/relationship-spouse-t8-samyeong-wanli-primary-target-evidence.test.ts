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
import {
  buildRelationshipSpouseT8SourceAccessApplicabilityEvidence,
  type RelationshipSpouseT8SourceAccessApplicabilityEvidenceReport,
} from '../src/research/relationship-spouse-t8-source-access-applicability-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_CONTAINER_RECORDS,
  RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_TARGET_TEXT_LOCATOR,
  buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence,
} from '../src/research/relationship-spouse-t8-samyeong-wanli-primary-target-evidence.js';

function acceptedSourceAccessApplicabilityEvidence() {
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
  return buildRelationshipSpouseT8SourceAccessApplicabilityEvidence(continuation);
}

describe('Relationship spouse T8 Samyeong Wanli primary target evidence', () => {
  test('accepts the exact #300 source-access applicability boundary and records the Wanli volume-seven split', () => {
    const report = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(
      acceptedSourceAccessApplicabilityEvidence(),
    );

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE',
    );
    expect(report.decision).toBe(
      'MING_WANLI_VOLUME_SEVEN_PRIMARY_CONTAINER_SPLIT_ACQUIRED_TARGET_PAGE_NOT_BOUND_OR_VISUALLY_INSPECTED_ZERO_GAP_CLOSURE',
    );
    expect(report.exactUpstreamSourceAccessApplicabilityBoundaryAccepted).toBe(true);
    expect(report.primaryContainerRecords).toEqual(
      RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_CONTAINER_RECORDS,
    );
    expect(report.primaryContainerRecordCount).toBe(2);
    expect(report.wanliEditionEstablished).toBe(true);
    expect(report.wanliVolumeSevenUpperContainerEstablished).toBe(true);
    expect(report.wanliVolumeSevenLowerContainerEstablished).toBe(true);
    expect(report.wanliVolumeSevenBibliographicSplitEstablished).toBe(true);
    expect(report.wanliVolume14PrimaryTargetContainerCandidateEstablished).toBe(true);
  });

  test('freezes exact NLC Wanli container metadata and the bounded textual target locator', () => {
    const report = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(
      acceptedSourceAccessApplicabilityEvidence(),
    );
    const upper = RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_CONTAINER_RECORDS[0];
    const lower = RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_CONTAINER_RECORDS[1];

    expect(upper.sourceId).toBe('NLC892-411999029701-66490');
    expect(upper.description).toBe('卷之七上');
    expect(upper.pageCount).toBe(54);
    expect(lower.sourceId).toBe('NLC892-411999029701-66491');
    expect(lower.description).toBe('卷之七下');
    expect(lower.pageCount).toBe(63);
    expect(lower.publicationDate).toBe('明萬曆[1573-1620]');
    expect(report.targetChapter).toBe('妻妾引例章');
    expect(report.targetChapterInVolumeSevenTextuallyEstablished).toBe(true);
    expect(report.targetChapterImmediatelyPrecedesZiXiChapterTextuallyEstablished).toBe(true);
    expect(report.targetTextMultiFactorMethodReconfirmed).toBe(true);
    expect(report.targetTextDimensions).toEqual(
      RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_TARGET_TEXT_LOCATOR.targetTextDimensions,
    );
  });

  test('recognizes stronger primary-container provenance without inventing a target-page witness', () => {
    const report = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(
      acceptedSourceAccessApplicabilityEvidence(),
    );

    expect(report.nlcWanliVolume14TargetChapterPageBindingEstablished).toBe(false);
    expect(report.nlcWanliVolume14ExactTargetPdfPageNumberEstablished).toBe(false);
    expect(report.nlcWanliVolume14DirectTargetPageImageInspected).toBe(false);
    expect(report.qualifyingPrimaryWitnessEstablished).toBe(false);
    expect(report.primaryEditionContainerProvenanceProgressRecognized).toBe(true);
    expect(report.primaryEditionContainerIsStrongerThan1926WholeBookContainerForTargeting).toBe(
      true,
    );
    expect(report.primaryProvenanceProgressAdequateForAuthorityAdmission).toBe(false);
    expect(report.normativeProvenanceRequirementClosedByThisEvidence).toBe(false);
  });

  test('preserves the partial applicability state, current-method mismatch, absent T6, and all unsafe-inference prohibitions', () => {
    const report = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(
      acceptedSourceAccessApplicabilityEvidence(),
    );

    expect(report.applicabilityGapStatus).toBe('PARTIAL_EVIDENCE_NOT_ADEQUATE');
    expect(report.explicitGenderNeutralSpouseNatalApplicabilityEstablished).toBe(false);
    expect(report.explicitNoUserOrPartnerSexInferenceEstablished).toBe(false);
    expect(report.explicitNoPartnerSexualOrientationInferenceEstablished).toBe(false);
    expect(report.exactCurrentClaimClassCompositionAuthorityEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.historicalGenderRoleUniversalizationAuthorized).toBe(false);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(report.partnerSexualOrientationInferenceAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
  });

  test('closes zero authority gaps and authorizes no semantic or product implementation', () => {
    const report = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(
      acceptedSourceAccessApplicabilityEvidence(),
    );

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
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
  });

  test('freezes controls, implementation effects, and the exact next primary-target gate', () => {
    const report = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(
      acceptedSourceAccessApplicabilityEvidence(),
    );

    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      earlyPrintPrimaryContainerPairsRecorded: 1,
      earlyPrintPrimarySubvolumeContainersRecorded: 2,
      targetChapterTextualLocatorsRecorded: 1,
      exactTargetPdfPagesBound: 0,
      directPrimaryTargetImagesNewlyInspected: 0,
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
      'BIND_AND_VISUALLY_INSPECT_NLC_WANLI_VOLUME14_WIFE_CONCUBINE_EXAMPLE_TARGET_PAGE_BEFORE_ANY_PRIMARY_WITNESS_OR_AUTHORITY_REASSESSMENT',
    );
  });

  test('fails closed when the content-addressed #300 boundary is altered', () => {
    const upstream = acceptedSourceAccessApplicabilityEvidence();
    const altered = {
      ...upstream,
      samyeongNlcTargetTextSearchIndexed: false,
    } as RelationshipSpouseT8SourceAccessApplicabilityEvidenceReport;
    const report = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(altered);

    expect(report.status).toBe('UPSTREAM_SOURCE_ACCESS_APPLICABILITY_BOUNDARY_INVALID');
    expect(report.decision).toBe('WANLI_PRIMARY_TARGET_EVIDENCE_NOT_ESTABLISHED');
    expect(report.exactUpstreamSourceAccessApplicabilityBoundaryAccepted).toBe(false);
    expect(report.primaryContainerRecordCount).toBe(0);
    expect(report.primaryContainerRecords).toEqual([]);
    expect(report.wanliEditionEstablished).toBe(false);
    expect(report.primaryEditionContainerProvenanceProgressRecognized).toBe(false);
    expect(report.controlsFrozen).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.recommendedNextAction).toBe(
      'REESTABLISH_RELATIONSHIP_SPOUSE_T8_SOURCE_ACCESS_APPLICABILITY_EVIDENCE',
    );
  });

  test('is deterministic and content-addressed', () => {
    const upstream = acceptedSourceAccessApplicabilityEvidence();
    const first = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(upstream);
    const second = buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(upstream);

    expect(first).toEqual(second);
    const { evidenceId, ...material } = first;
    expect(evidenceId).toBe(
      `relationship_spouse_t8_samyeong_wanli_primary_target_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
