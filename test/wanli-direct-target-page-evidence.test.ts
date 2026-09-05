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
import { buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence } from '../src/research/relationship-spouse-t8-role-neutral-applicability-contract-candidate-evidence.js';
import {
  buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence,
  type RelationshipSpouseT8WanliMultiWitnessCollationEvidenceReport,
} from '../src/research/relationship-spouse-t8-wanli-multi-witness-collation-evidence.js';
import {
  WANLI_DIRECT_TARGET_PAGE_CONTROL_IDS,
  WANLI_DIRECT_TARGET_PAGE_EVIDENCE_VERSION,
  WANLI_DIRECT_TARGET_PAGE_RECORDS,
  WANLI_DIRECT_TARGET_PAGE_SOURCE_WITNESS,
  buildWanliDirectTargetPageEvidence,
} from '../src/research/wanli-direct-target-page-evidence.js';

function acceptedCollationEvidence() {
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
  const applicability =
    buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(wanli);
  return buildRelationshipSpouseT8WanliMultiWitnessCollationEvidence(applicability);
}

describe('Wanli direct target-page evidence', () => {
  test('accepts only the exact content-addressed collation boundary and content-addresses the new report', () => {
    const upstream = acceptedCollationEvidence();
    const report = buildWanliDirectTargetPageEvidence(upstream);

    expect(report.evidenceVersion).toBe(WANLI_DIRECT_TARGET_PAGE_EVIDENCE_VERSION);
    expect(report.status).toBe('RESOLVED_WANLI_DIRECT_TARGET_PAGE_EVIDENCE');
    expect(report.decision).toBe(
      'WANLI_FIRST_PRINT_SCAN_50_DIRECTLY_INSPECTED_QUALIFYING_PRIMARY_WITNESS_ESTABLISHED_ONE_OF_FIVE_AUTHORITY_GAPS_CLOSED',
    );
    expect(report.exactUpstreamCollationBoundaryAccepted).toBe(true);

    const { evidenceId, ...material } = report;
    expect(evidenceId).toBe(
      `wanli_direct_target_page_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });

  test('freezes the exact NLC source manifest and SHA-256-addressed direct page evidence', () => {
    const report = buildWanliDirectTargetPageEvidence(acceptedCollationEvidence());

    expect(report.sourceWitness).toEqual(WANLI_DIRECT_TARGET_PAGE_SOURCE_WITNESS);
    expect(report.sourceWitness).toEqual({
      sourceId: 'NLC892-411999029701-66491',
      institution: 'National Library of China',
      title: '三命通會',
      volumeLabel: '第14冊',
      volumePart: '卷之七下',
      pageCount: 63,
      sourceBytes: 21_351_812,
      sourceSha1: 'e23875add1ce23db1b3be3251433af3e0f46d641',
      sourceClass: 'institutional_wanli_print_facsimile',
    });
    expect(report.directPageRecords).toEqual(WANLI_DIRECT_TARGET_PAGE_RECORDS);
    expect(report.directPageRecordCount).toBe(3);
    expect(report.directPageRecords).toEqual([
      {
        scanPage: 46,
        sha256: 'd15171ce870f5ee6d53a9a7b71f31806e5d7e2c455665acbe3d173a139f578b5',
        observedHeading: '論六親',
        role: 'CONTEXT_ANCHOR',
        targetPassageVisible: false,
      },
      {
        scanPage: 50,
        sha256: '44ddc6eaa4ad43bdb4d55b88e8aefd652ba52526a9cf186731197201ff825de2',
        observedHeading: '妻妾引例章',
        observedTargetExcerpt: '正財妻偏財妾也',
        role: 'DIRECT_TARGET',
        targetPassageVisible: true,
      },
      {
        scanPage: 51,
        sha256: 'adb418b2bd7c53a956e69cf22ba4007b249ab9be4fd3aa4773224d1a85e3fa48',
        observedHeading: '子息引例章',
        role: 'NEXT_SECTION_BOUNDARY',
        targetPassageVisible: false,
      },
    ]);
    expect(report.exactFirstPrintTargetScanPageEstablished).toBe(true);
    expect(report.exactFirstPrintTargetScanPage).toBe(50);
    expect(report.directFirstPrintTargetPageImageInspected).toBe(true);
    expect(report.historicalGenderedRuleDirectlyVisible).toBe(true);
  });

  test('closes exactly the qualifying-primary-witness gap and keeps all four remaining authority gaps open', () => {
    const upstream = acceptedCollationEvidence();
    expect(upstream.authorityGapsClosedCount).toBe(0);
    expect(upstream.qualifyingPrimaryWitnessEstablished).toBe(false);

    const report = buildWanliDirectTargetPageEvidence(upstream);

    expect(report.qualifyingPrimaryWitnessEstablished).toBe(true);
    expect(report.qualifyingPrimaryWitnessGapStatus).toBe('CLOSED');
    expect(report.authorityGapStatus).toEqual({
      QUALIFYING_PRIMARY_WITNESS: 'CLOSED',
      INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN',
      EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN',
      CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN',
      RELATIONSHIP_T6_INPUT: 'OPEN',
    });
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.allFiveAuthorityGapsRemainOpen).toBe(false);

    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.explicitRoleNeutralSpouseNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.applicabilityGapStatus).toBe('PARTIAL_EVIDENCE_NOT_ADEQUATE');
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.qualifyingAuthorityCandidateCount).toBe(0);
    expect(report.authorityAcceptedCandidateCount).toBe(0);
    expect(report.authorityAdmissionReady).toBe(false);
  });

  test('preserves every semantic, consumer, preview, and production gate fail-closed', () => {
    const report = buildWanliDirectTargetPageEvidence(acceptedCollationEvidence());

    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.controlIds).toEqual(WANLI_DIRECT_TARGET_PAGE_CONTROL_IDS);
    expect(report.controlCount).toBe(18);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      exactTargetScanPagesBound: 1,
      directTargetImagesInspected: 1,
      qualifyingPrimaryWitnessesEstablished: 1,
      authorityGapsClosed: 1,
      authorityRequirementsSatisfied: 1,
      authorityCandidatesAccepted: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionRoutesChanged: 0,
    });
  });

  test('fails closed if the upstream collation evidence is altered', () => {
    const upstream = acceptedCollationEvidence();
    const altered = {
      ...upstream,
      controlsFrozen: false,
    } as RelationshipSpouseT8WanliMultiWitnessCollationEvidenceReport;
    const report = buildWanliDirectTargetPageEvidence(altered);

    expect(report.status).toBe('UPSTREAM_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_INVALID');
    expect(report.decision).toBe('WANLI_DIRECT_TARGET_PAGE_EVIDENCE_NOT_ESTABLISHED');
    expect(report.exactUpstreamCollationBoundaryAccepted).toBe(false);
    expect(report.sourceWitness).toBeNull();
    expect(report.directPageRecords).toEqual([]);
    expect(report.directPageRecordCount).toBe(0);
    expect(report.exactFirstPrintTargetScanPageEstablished).toBe(false);
    expect(report.exactFirstPrintTargetScanPage).toBeNull();
    expect(report.directFirstPrintTargetPageImageInspected).toBe(false);
    expect(report.qualifyingPrimaryWitnessEstablished).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(0);
    expect(report.authorityGapsOpenCount).toBe(5);
    expect(report.allFiveAuthorityGapsRemainOpen).toBe(true);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.semanticProducerImplementationAuthorized).toBe(false);
    expect(report.controlsFrozen).toBe(false);
  });
});
