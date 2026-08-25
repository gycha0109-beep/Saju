import { describe, expect, test } from 'vitest';
import {
  buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview,
} from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  buildCareerPersonalizationPostP4T8ReadinessReview,
} from '../src/research/career-personalization-post-p4-t8-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
  CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS,
  CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS,
  type CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
} from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import { CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION } from '../src/research/career-personalization-t6-methodology-gate.js';
import {
  buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview,
} from '../src/research/career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview,
  type CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport,
} from '../src/research/career-personalization-t8-synthesis-authority-acquisition-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
  CAREER_T8_CANDIDATE_DISCOVERY_CONTROL_IDS,
  CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES,
  buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence,
} from '../src/research/career-personalization-t8-synthesis-authority-candidate-discovery-evidence.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_candidate_discovery_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_candidate_discovery_test',
    exactP3BoundaryAccepted: true,
    exactI252BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    scopedExceptionId: 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_RESEARCH_T6',
    structuralTriggerKind: 'branch_clash',
    structuralTriggerMustBeT0Candidate: true,
    allowedQualifierIds: CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS,
    allowedQualifierCount: 4,
    branchClashHiddenStemInteractionEligibilityT6AuthoringAuthorized: true,
    branchClashParticipantScopeRequired: true,
    qualifierOnlyContextAuthorized: true,
    generalHiddenStemInteractionStillBlocked: true,
    arbitraryHiddenStemCoPresenceInteractionAuthorized: false,
    nonClashHiddenStemInteractionAuthorized: false,
    visibilityMayCreateBinaryActivation: false,
    positionMayCreateNumericWeight: false,
    positionMayCreateZeroInteractionThreshold: false,
    seasonMayCreateNumericWeight: false,
    seasonMayChooseWinnerAutomatically: false,
    pluralityMayCreateNumericWeight: false,
    pluralityMayChooseWinnerAutomatically: false,
    damageMagnitudeAuthorized: false,
    destructionVerdictAuthorized: false,
    postRelationSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    careerOutcomeSemanticAuthorizedByThisGate: false,
    careerT8SynthesisAuthorizedByThisGate: false,
    consumerNarrativeAuthorizedByThisGate: false,
    i232SohuTrackReopened: false,
    i232ProvenanceGapClosed: false,
    i248YudingTrackMutated: false,
    i211QuWeiTrackMutated: false,
    productionPromotionAuthorized: false,
    controlIds: CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS,
    controlCount: 18,
    controlsFrozen: true,
    implementationEffects: {
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_RULE_CONTRACT',
  };
}

function acceptedInputs() {
  const p4 = acceptedP4();
  const readiness = buildCareerPersonalizationPostP4T8ReadinessReview(p4);
  const b4 = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(p4, readiness);
  const b5 = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
    p4,
    readiness,
    b4,
  );
  const b6 = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
    p4,
    readiness,
    b4,
    b5,
  );
  return { p4, readiness, b4, b5, b6 };
}

describe('Career T8 synthesis authority candidate discovery evidence', () => {
  test('records four inspected candidates but accepts no authority', () => {
    const { p4, readiness, b4, b5, b6 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
      p4,
      readiness,
      b4,
      b5,
      b6,
    );

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
    expect(report.inspectedCandidateCount).toBe(4);
    expect(report.partialCoverageCandidateCount).toBe(3);
    expect(report.discoveryLeadOnlyCandidateCount).toBe(1);
    expect(report.fullAdmissionCandidateCount).toBe(0);
    expect(report.registeredCandidateCount).toBe(0);
    expect(report.authorityAcquiredByThisGate).toBe(false);
  });

  test('searches all three governed discovery lanes and keeps all six gaps open', () => {
    const { p4, readiness, b4, b5, b6 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
      p4,
      readiness,
      b4,
      b5,
      b6,
    );

    expect(report.laneCount).toBe(3);
    expect(report.laneResults.every((lane) => lane.searched)).toBe(true);
    expect(report.laneResults.every((lane) => !lane.fullAdmissionCandidateDiscovered)).toBe(true);
    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('preserves direct primary-scan locators for 精選命理約言 and 子平真詮', () => {
    const jingxuan = CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
      (candidate) => candidate.sourceReference.title === '精選命理約言',
    );
    const ziping = CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
      (candidate) => candidate.sourceReference.title === '子平真詮',
    );

    expect(jingxuan?.exactPrimaryWitnessPassageLocatorVerified).toBe(true);
    expect(jingxuan?.sourceReference.locator?.page).toContain('PDF p.20');
    expect(jingxuan?.careerWorkBindingObserved).toBe(false);
    expect(ziping?.exactPrimaryWitnessPassageLocatorVerified).toBe(true);
    expect(ziping?.sourceReference.locator?.page).toContain('PDF p.36');
    expect(ziping?.sourceReference.locator?.section).toBe('論用神因成得敗因敗得成');
    expect(ziping?.careerWorkBindingObserved).toBe(false);
  });

  test('keeps 神峰通考 as a lead because its inspected target passage is not primary-scan page-bound', () => {
    const shenfeng = CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
      (candidate) => candidate.sourceReference.title === '神峰通考',
    );

    expect(shenfeng?.discoveryStatus).toBe('DISCOVERY_LEAD_ONLY');
    expect(shenfeng?.exactPassageInspectedOnAtLeastOneSurface).toBe(true);
    expect(shenfeng?.exactPrimaryWitnessPassageLocatorVerified).toBe(false);
    expect(shenfeng?.independentNormativeProvenanceObserved).toBe(false);
    expect(shenfeng?.admissionAcceptedUnderB6).toBe(false);
  });

  test('records 千里命稿 explicit 事業 binding without pretending it supports current T5/T6 synthesis', () => {
    const qianli = CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
      (candidate) => candidate.sourceReference.title === '千里命稿',
    );

    expect(qianli?.careerWorkBindingObserved).toBe(true);
    expect(qianli?.careerBindingMethodInputs).toEqual(['用神', '喜忌']);
    expect(qianli?.currentPersonalizedT5T6ContractDirectlySupported).toBe(false);
    expect(qianli?.competingMethodologyApplicabilityReviewRequired).toBe(true);
    expect(qianli?.discoveryStatus).toBe(
      'POTENTIAL_PARTIAL_COVERAGE_COMPETING_METHODOLOGY_INPUTS',
    );
    expect(qianli?.exactPrimaryWitnessPassageLocatorVerified).toBe(false);
  });

  test('does not count any candidate gap observation as a satisfied requirement', () => {
    expect(
      CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES.flatMap(
        (candidate) => candidate.gapObservations,
      ).every(
        (observation) =>
          observation.currentPersonalizedT5T6SemanticBridgeObserved === false &&
          observation.requirementCoverageEvaluated === false &&
          observation.countsAsRequirementSatisfied === false,
      ),
    ).toBe(true);
  });

  test('does not modernize historical 官/rank language into Career semantics', () => {
    const shenfeng = CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
      (candidate) => candidate.sourceReference.title === '神峰通考',
    );
    const { p4, readiness, b4, b5, b6 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
      p4,
      readiness,
      b4,
      b5,
      b6,
    );

    expect(shenfeng?.careerWorkBindingObserved).toBe(false);
    expect(report.historicalRankLanguageMayBeModernizedAsCareerSemantic).toBe(false);
    expect(report.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
  });

  test('freezes no-shortcut controls and creates zero executable interpretation artifacts', () => {
    const { p4, readiness, b4, b5, b6 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
      p4,
      readiness,
      b4,
      b5,
      b6,
    );

    expect(report.controlIds).toEqual(CAREER_T8_CANDIDATE_DISCOVERY_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      candidateEvidenceRecordsCreated: 4,
      registeredSourcesCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed when B6 is not the exact governed acquisition-readiness report', () => {
    const { p4, readiness, b4, b5, b6 } = acceptedInputs();
    const tamperedB6 = {
      ...b6,
      admissionContractCount: 5,
    } as unknown as CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport;
    const report = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
      p4,
      readiness,
      b4,
      b5,
      tamperedB6,
    );

    expect(report.status).toBe('UPSTREAM_B6_BOUNDARY_INVALID');
    expect(report.exactB6BoundaryAccepted).toBe(false);
    expect(report.discoveryPerformed).toBe(false);
    expect(report.inspectedCandidates).toEqual([]);
    expect(report.controlIds).toEqual([]);
    expect(report.authorityAcquiredByThisGate).toBe(false);
  });

  test('is deterministic for the same exact upstream chain', () => {
    const { p4, readiness, b4, b5, b6 } = acceptedInputs();
    const first = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
      p4,
      readiness,
      b4,
      b5,
      b6,
    );
    const second = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
      p4,
      readiness,
      b4,
      b5,
      b6,
    );

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION',
    );
  });
});
