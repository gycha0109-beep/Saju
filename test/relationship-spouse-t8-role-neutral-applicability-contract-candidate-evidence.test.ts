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
import {
  buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence,
  type RelationshipSpouseT8SamyeongWanliPrimaryTargetEvidenceReport,
} from '../src/research/relationship-spouse-t8-samyeong-wanli-primary-target-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_RECORD,
  buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence,
} from '../src/research/relationship-spouse-t8-role-neutral-applicability-contract-candidate-evidence.js';

function acceptedWanliEvidence() {
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
  return buildRelationshipSpouseT8SamyeongWanliPrimaryTargetEvidence(sourceAccessApplicability);
}

describe('Relationship spouse T8 modern applicability boundary candidate evidence', () => {
  test('accepts the exact #301 Wanli boundary and records one bounded editorial candidate', () => {
    const report = buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(
      acceptedWanliEvidence(),
    );

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE',
    );
    expect(report.decision).toBe(
      'EXPLICIT_NO_IDENTITY_INFERENCE_AND_PARTNER_NEUTRAL_EDITORIAL_BOUNDARY_ACQUIRED_BUT_ROLE_NEUTRAL_NATAL_CONVENTION_AND_NORMATIVE_PROVENANCE_REMAIN_UNRESOLVED_ZERO_GAP_CLOSURE',
    );
    expect(report.exactUpstreamWanliPrimaryTargetBoundaryAccepted).toBe(true);
    expect(report.candidateRecord).toEqual(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_RECORD,
    );
    expect(report.candidateRecordCount).toBe(1);
  });

  test('records only the spouse-natal/editorial applicability boundary actually supported by the source', () => {
    const report = buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(
      acceptedWanliEvidence(),
    );
    const record = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_RECORD;

    expect(record.classicalGenderedConventionExplicitlyHistorical).toBe(true);
    expect(record.historicalGenderedConventionExplicitlyNotUniversal).toBe(true);
    expect(record.partnerNeutralLanguageSupported).toBe(true);
    expect(record.explicitRoleNeutralSpouseNatalConventionEstablished).toBe(false);
    expect(record.spouseStarSeparatedFromSpousePalace).toBe(true);
    expect(record.spouseStarSeparatedFromDirectRealWorldPartnerEvidence).toBe(true);
    expect(record.requiresDeclaredConvention).toBe(true);
    expect(record.requiresWholeChartContext).toBe(true);
    expect(record.explicitlyProhibitsPartnerGenderInference).toBe(true);
    expect(record.explicitlyProhibitsSexualOrientationInference).toBe(true);
    expect(record.compatibilityScopedRoleNeutralConventionReusedForNatalAuthority).toBe(false);

    expect(report.explicitModernEditorialHistoricalGenderConventionNotUniversalCandidateLocated).toBe(
      true,
    );
    expect(report.explicitModernEditorialPartnerNeutralLanguageCandidateLocated).toBe(true);
    expect(report.explicitModernEditorialNoPartnerGenderInferenceCandidateLocated).toBe(true);
    expect(report.explicitModernEditorialNoSexualOrientationInferenceCandidateLocated).toBe(true);
    expect(report.explicitModernEditorialSpouseStarPalaceSeparationCandidateLocated).toBe(true);
    expect(report.explicitModernEditorialWholeChartContextCandidateLocated).toBe(true);
    expect(report.explicitRoleNeutralSpouseNatalConventionCandidateLocated).toBe(false);
    expect(report.compatibilityScopedRoleNeutralConventionReusedForNatalAuthority).toBe(false);
  });

  test('does not promote practitioner editorial material into governed applicability authority', () => {
    const report = buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(
      acceptedWanliEvidence(),
    );

    expect(report.editorialBoundaryCandidateIsCommercialPractitionerMethodology).toBe(true);
    expect(report.editorialBoundaryCandidatePeerReviewed).toBe(false);
    expect(report.editorialBoundaryCandidateInstitutionalNormativeStandard).toBe(false);
    expect(report.editorialBoundaryCandidateIndependentNormativeAuthority).toBe(false);
    expect(report.editorialBoundaryCandidateAdequateForAuthorityAdmission).toBe(false);
    expect(
      report.modernNoIdentityInferenceBoundaryTextFoundButCompleteGovernedApplicabilityContractNotEstablished,
    ).toBe(true);
    expect(report.applicabilityGapStatus).toBe('PARTIAL_EVIDENCE_NOT_ADEQUATE');
    expect(report.applicabilityGapClosedByThisEvidence).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
  });

  test('preserves direct-facsimile, semantic-correspondence, inference, admission, and producer gates', () => {
    const report = buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(
      acceptedWanliEvidence(),
    );

    expect(report.qualifyingPrimaryWitnessEstablished).toBe(false);
    expect(report.nlcWanliVolume14TargetChapterPageBindingEstablished).toBe(false);
    expect(report.nlcWanliVolume14DirectTargetPageImageInspected).toBe(false);
    expect(report.explicitGenderNeutralSpouseNatalApplicabilityEstablished).toBe(false);
    expect(report.explicitNoUserOrPartnerSexInferenceEstablished).toBe(false);
    expect(report.explicitNoPartnerSexualOrientationInferenceEstablished).toBe(false);
    expect(report.exactCurrentClaimClassCompositionAuthorityEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.historicalGenderRoleUniversalizationAuthorized).toBe(false);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(report.partnerSexualOrientationInferenceAuthorized).toBe(false);
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

  test('freezes zero product effects and the next natal-specific provenance/direct-facsimile gate', () => {
    const report = buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(
      acceptedWanliEvidence(),
    );

    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(17);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      explicitModernEditorialBoundaryCandidatesRecorded: 1,
      explicitPartnerNeutralLanguageCandidatesRecorded: 1,
      explicitNoSexOrientationInferenceBoundaryCandidatesRecorded: 1,
      explicitRoleNeutralSpouseNatalConventionCandidatesRecorded: 0,
      compatibilityAuthorityReusedForNatal: 0,
      independentNormativeAuthoritiesEstablished: 0,
      directPrimaryTargetImagesNewlyInspected: 0,
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
      'ACQUIRE_EXPLICIT_ROLE_NEUTRAL_SPOUSE_NATAL_CONVENTION_WITH_INDEPENDENT_NORMATIVE_PROVENANCE_OR_BIND_DIRECT_WANLI_TARGET_FACSIMILE_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE',
    );
  });

  test('fails closed when the content-addressed #301 Wanli boundary is altered', () => {
    const accepted = acceptedWanliEvidence();
    const altered = {
      ...accepted,
      controlsFrozen: false,
    } as RelationshipSpouseT8SamyeongWanliPrimaryTargetEvidenceReport;
    const report = buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(altered);

    expect(report.status).toBe('UPSTREAM_WANLI_PRIMARY_TARGET_BOUNDARY_INVALID');
    expect(report.decision).toBe(
      'ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_NOT_ESTABLISHED',
    );
    expect(report.exactUpstreamWanliPrimaryTargetBoundaryAccepted).toBe(false);
    expect(report.candidateRecord).toBeNull();
    expect(report.candidateRecordCount).toBe(0);
    expect(
      report.modernNoIdentityInferenceBoundaryTextFoundButCompleteGovernedApplicabilityContractNotEstablished,
    ).toBe(false);
    expect(report.explicitRoleNeutralSpouseNatalConventionCandidateLocated).toBe(false);
    expect(report.controlsFrozen).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.recommendedNextAction).toBe(
      'REESTABLISH_RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE',
    );
  });

  test('is deterministic and content-addressed', () => {
    const upstream = acceptedWanliEvidence();
    const first = buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(upstream);
    const second = buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(upstream);

    expect(first).toEqual(second);
    const { evidenceId, ...material } = first;
    expect(evidenceId).toBe(
      `relationship_spouse_t8_role_neutral_applicability_contract_candidate_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
