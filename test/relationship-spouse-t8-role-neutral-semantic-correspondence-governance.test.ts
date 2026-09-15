import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence } from '../src/research/relationship-spouse-t8-dailyastro-neutral-column-compatibility-access-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_MAP,
  buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance,
} from '../src/research/relationship-spouse-t8-role-neutral-semantic-correspondence-governance.js';

describe('Relationship spouse T8 role-neutral semantic correspondence governance', () => {
  test('pins the repository-owned governance frontier and canonical input path', () => {
    const governance = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE;
    expect(governance.frontierIssue).toBe(591);
    expect(governance.domain).toBe('relationship');
    expect(governance.subcategory).toBe('spouse');
    expect(governance.temporalScope).toBe('natal');
    expect(governance.statusClass).toBe('research');
    expect(governance.authorityScope).toBe('repository_owned_semantic_correspondence_only');
    expect(governance.canonicalContract.snapshotContract).toBe('CanonicalSajuSnapshot');
    expect(governance.canonicalContract.dayMasterContract).toBe('StemFact');
    expect(governance.canonicalContract.canonicalInputPath).toBe(
      'derivedFacts.dayMaster.yinYang',
    );
    expect(governance.canonicalContract.canonicalInputType).toBe('YinYang');
    expect(governance.canonicalContract.canonicalInputValues).toEqual(['양', '음']);
  });

  test('governs the exact Day-Master-polarity spouse-star correspondence', () => {
    expect(RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_MAP).toEqual({
      양: {
        dayMasterPolarity: '양',
        spouseStarSemantic: 'INDIRECT_WEALTH',
        tenGodNativeLabel: '편재',
        tenGodHanjaLabel: '偏財',
      },
      음: {
        dayMasterPolarity: '음',
        spouseStarSemantic: 'INDIRECT_POWER',
        tenGodNativeLabel: '편관',
        tenGodHanjaLabel: '偏官',
      },
    });
  });

  test('preserves the historical T5 information-loss fail-closed boundary', () => {
    const governance = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE;
    expect(governance.historicalFailClosedBoundary.priorFeasibilityPr).toBe(312);
    expect(
      governance.historicalFailClosedBoundary
        .broadT5FamilyPresenceCannotBeRelabelledAsSpouseAuthority,
    ).toBe(true);
    expect(
      governance.historicalFailClosedBoundary.discardedT5SubtypeReconstructionAuthorized,
    ).toBe(false);
    expect(governance.historicalFailClosedBoundary.generalRelationshipT8RelabellingAuthorized).toBe(
      false,
    );
    expect(governance.historicalFailClosedBoundary.oldT5InformationLossFindingOverridden).toBe(
      false,
    );
    expect(
      governance.historicalFailClosedBoundary
        .currentPathBypassesLossyT5TupleByUsingExistingCanonicalDayMasterPolarity,
    ).toBe(true);
    expect(governance.canonicalContract.t5FamilyTupleRequired).toBe(false);
    expect(governance.canonicalContract.t5TenGodSubtypeReconstructionRequired).toBe(false);
  });

  test('limits the governed meaning to a spouse-star marker and forbids identity inferences', () => {
    const boundary =
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE.semanticBoundary;
    expect(boundary.meansGovernedSpouseStarMarkerForAdmittedMethodologyFamily).toBe(true);
    expect(boundary.meansNativeSex).toBe(false);
    expect(boundary.meansPartnerSex).toBe(false);
    expect(boundary.meansPartnerIdentity).toBe(false);
    expect(boundary.meansSexualOrientation).toBe(false);
    expect(boundary.meansMarriageExistsOrIsGuaranteed).toBe(false);
    expect(boundary.meansFertility).toBe(false);
    expect(boundary.meansRelationshipLegalityOrEthics).toBe(false);
    expect(boundary.meansCompatibilityScore).toBe(false);
    expect(boundary.meansSecondChartProperties).toBe(false);
    expect(boundary.schoolDependenceCaveatPreserved).toBe(true);
  });

  test('does not import DailyAstro bilateral compatibility semantics into natal governance', () => {
    const boundary =
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE.semanticBoundary;
    expect(boundary.dailyAstroBilateralCompatibilitySemanticsImported).toBe(false);
    expect(boundary.dailyAstroNayinFallbackImported).toBe(false);
    expect(boundary.crossSourceSemanticStitchingAuthorized).toBe(false);
  });

  test('requires the exact upstream three-of-five authority snapshot', () => {
    const upstream =
      buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence();
    const report = buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance();
    expect(upstream.status).toBe(
      'PUBLIC_INDEXED_OPERATIONAL_ROLE_NEUTRAL_TWO_CHART_COMPATIBILITY_SIGNAL_NO_FULL_BODY_NO_SINGLE_NATIVE_ADMISSION_DECISION',
    );
    expect(upstream.exactUpstreamThreeOfFiveStateAccepted).toBe(true);
    expect(upstream.explicitRoleNeutralNatalMappingEstablished).toBe(true);
    expect(upstream.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(upstream.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(upstream.authorityGapsClosedCount).toBe(3);
    expect(upstream.authorityGapsOpenCount).toBe(2);
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamThreeOfFiveStateAccepted).toBe(true);
  });

  test('closes only governed semantic correspondence and advances authority to four of five', () => {
    const report = buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance();
    expect(report.status).toBe(
      'GOVERNED_CANONICAL_DAY_MASTER_POLARITY_SPOUSE_STAR_SEMANTIC_CORRESPONDENCE_ESTABLISHED',
    );
    expect(report.canonicalInputPath).toBe('derivedFacts.dayMaster.yinYang');
    expect(report.canonicalDayMasterPolarityContractGoverned).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(true);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(true);
    expect(report.semanticCorrespondenceGapClosedByThisEvidence).toBe(true);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.relationshipT6InputGapClosedByThisEvidence).toBe(false);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(4);
    expect(report.authorityGapsOpenCount).toBe(1);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('keeps T5 reconstruction and all T6/runtime activation forbidden', () => {
    const governance = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE;
    const report = buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance();
    expect(report.t5FamilyTupleRequired).toBe(false);
    expect(report.t5SubtypeReconstructionAuthorized).toBe(false);
    expect(report.generalRelationshipRelabellingAuthorized).toBe(false);
    expect(governance.canonicalContract.relationshipT6ObjectRequiredForSemanticCorrespondence).toBe(
      false,
    );
    expect(governance.runtimeBoundary.relationshipT6InputPathEstablished).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.producerRegistered).toBe(false);
    expect(report.ruleRegistered).toBe(false);
    expect(report.claimTypeRegistered).toBe(false);
    expect(report.interpretationPackRegistered).toBe(false);
    expect(report.consumerNarrativeActivated).toBe(false);
    expect(report.compatibilityConsumerActivated).toBe(false);
    expect(report.previewDefaultRouteChanged).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
  });

  test('keeps the control set and deterministic content address stable', () => {
    const first = buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance();
    const second = buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance();
    const { evidenceId, ...material } = first;
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_CONTROL_IDS.length,
    );
    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_VERSION,
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_role_neutral_semantic_correspondence_governance_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'GOVERN_RELATIONSHIP_T6_INPUT_FOR_ADMITTED_ROLE_NEUTRAL_SPOUSE_SELECTOR',
    );
  });
});
