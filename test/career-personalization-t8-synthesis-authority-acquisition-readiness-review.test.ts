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
  type CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport,
} from '../src/research/career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_AUTHORITY_ACQUISITION_CONTROL_IDS,
  CAREER_T8_AUTHORITY_DISCOVERY_LANES,
  buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview,
} from '../src/research/career-personalization-t8-synthesis-authority-acquisition-readiness-review.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_acquisition_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_acquisition_test',
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
  return { p4, readiness, b4, b5 };
}

describe('Career T8 synthesis authority acquisition readiness', () => {
  test('freezes gap-scoped acquisition readiness without acquiring authority', () => {
    const { p4, readiness, b4, b5 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      b5,
    );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS');
    expect(report.decision).toBe(
      'GAP_SCOPED_GOVERNED_AUTHORITY_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED',
    );
    expect(report.acquisitionMode).toBe('GAP_SCOPED_CANDIDATE_DISCOVERY');
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
  });

  test('assigns the six distinct gaps exactly once across three discovery lanes', () => {
    const { p4, readiness, b4, b5 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      b5,
    );
    const laneGapIds = report.discoveryLanes.flatMap((lane) => lane.targetGapIds);

    expect(report.discoveryLaneCount).toBe(3);
    expect(report.discoveryLanes).toEqual(CAREER_T8_AUTHORITY_DISCOVERY_LANES);
    expect(laneGapIds).toHaveLength(6);
    expect(new Set(laneGapIds).size).toBe(6);
    expect(new Set(laneGapIds)).toEqual(new Set(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS));
    expect(report.allSixGapsAssignedExactlyOnceToDiscoveryLane).toBe(true);
  });

  test('creates one strict candidate admission contract per semantic gap', () => {
    const { p4, readiness, b4, b5 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      b5,
    );

    expect(report.admissionContractCount).toBe(6);
    expect(report.admissionContracts.map((item) => item.gapId)).toEqual(
      CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    );
    expect(report.allSixGapsCoveredExactlyOnceByAdmissionContract).toBe(true);
    expect(
      report.admissionContracts.every(
        (item) =>
          item.exactEvidenceForGapRequired &&
          item.exactSourceIdentityRequired &&
          item.oneNormalizedSourceReferencePerCandidateRequired &&
          item.stableRevisionOrEquivalentReproducibleLocatorRequired &&
          item.exactLocatorForGapRequired &&
          item.originalSourceInspectionRequired &&
          item.explicitCareerOrWorkSemanticAssertionRequired &&
          item.explicitContextOrExceptionTreatmentRequired &&
          item.independentNormativeProvenanceRequired,
      ),
    ).toBe(true);
  });

  test('does not incorrectly require one source to cover all six distinct gaps', () => {
    const { p4, readiness, b4, b5 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      b5,
    );

    expect(report.oneCandidateMayTargetMultipleGaps).toBe(true);
    expect(report.oneCandidateMustCoverAllSixGaps).toBe(false);
    expect(report.differentGapsMayUseDifferentAcceptedSources).toBe(true);
    expect(report.singleSourceFullCoveragePreferredPerGap).toBe(true);
    expect(report.singleSourceFullCoverageRequiredGlobally).toBe(false);
  });

  test('blocks cross-candidate stitching inside one gap until a separate composition policy exists', () => {
    const { p4, readiness, b4, b5 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      b5,
    );

    expect(report.crossCandidateCompositionForSameGapAuthorized).toBe(false);
    expect(report.multiSourceCompositionPolicyForSameGapResolved).toBe(false);
    expect(
      report.admissionContracts.every((item) => !item.crossCandidateCompositionForSameGapAllowed),
    ).toBe(true);
  });

  test('permits broad research source classes but makes source class and snippets insufficient', () => {
    const { p4, readiness, b4, b5 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      b5,
    );

    expect(report.candidateMayBeHistoricalPrimarySource).toBe(true);
    expect(report.candidateMayBeScholarlyOrInstitutionalReference).toBe(true);
    expect(report.candidateMayBePractitionerSecondarySource).toBe(true);
    expect(report.sourceClassAloneMaySatisfyGap).toBe(false);
    expect(report.searchSnippetMayBeDiscoveryLead).toBe(true);
    expect(report.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
    expect(report.existingRepositorySourceMayBeReconsidered).toBe(true);
    expect(report.existingRepositorySourceAutomaticallyAccepted).toBe(false);
  });

  test('requires post-discovery coverage evaluation and creates zero candidates or interpretation artifacts', () => {
    const { p4, readiness, b4, b5 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      b5,
    );

    expect(report.candidateDiscoveryPerformedByThisGate).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.requirementCoverageEvaluatedByThisGate).toBe(false);
    expect(report.sourceRegistrationAloneMayCloseGap).toBe(false);
    expect(report.candidateDiscoveryAloneMayCloseGap).toBe(false);
    expect(report.requirementCoverageEvaluationRequiredAfterDiscovery).toBe(true);
    expect(report.implementationEffects).toEqual({
      sourceCandidatesDiscovered: 0,
      sourceCandidatesRegistered: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('freezes no-shortcut controls and points only to candidate discovery evidence', () => {
    const { p4, readiness, b4, b5 } = acceptedInputs();
    const report = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      b5,
    );

    expect(report.controlIds).toEqual(CAREER_T8_AUTHORITY_ACQUISITION_CONTROL_IDS);
    expect(report.controlCount).toBe(15);
    expect(report.controlsFrozen).toBe(true);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
  });

  test('fails closed when B5 is not the exact deterministic report for the upstream chain', () => {
    const { p4, readiness, b4, b5 } = acceptedInputs();
    const tampered = {
      ...b5,
      requirementCount: 5,
    } as unknown as CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport;
    const report = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      tampered,
    );

    expect(report.status).toBe('UPSTREAM_B5_BOUNDARY_INVALID');
    expect(report.exactB5BoundaryAccepted).toBe(false);
    expect(report.acquisitionMode).toBe('NONE');
    expect(report.discoveryLanes).toEqual([]);
    expect(report.admissionContracts).toEqual([]);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    );
  });

  test('is deterministic for the same exact upstream chain', () => {
    const { p4, readiness, b4, b5 } = acceptedInputs();
    const first = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      b5,
    );
    const second = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
      p4,
      readiness,
      b4,
      b5,
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);
  });
});
