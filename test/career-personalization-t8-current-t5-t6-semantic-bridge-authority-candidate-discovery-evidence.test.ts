import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { buildCareerPersonalizationPostP4T8ReadinessReview } from '../src/research/career-personalization-post-p4-t8-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
  CAREER_T6_PUBLIC_CLASSIC_ALLOWED_QUALIFIER_IDS,
  CAREER_T6_PUBLIC_CLASSIC_CONTROL_IDS,
  type CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
} from '../src/research/career-personalization-t6-public-classic-bounded-scope-methodology-review.js';
import { CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION } from '../src/research/career-personalization-t6-methodology-gate.js';
import { buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview } from '../src/research/career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import { buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview } from '../src/research/career-personalization-t8-synthesis-authority-acquisition-readiness-review.js';
import { buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence } from '../src/research/career-personalization-t8-synthesis-authority-candidate-discovery-evidence.js';
import { buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation } from '../src/research/career-personalization-t8-synthesis-authority-candidate-requirement-coverage-evaluation.js';
import { buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview } from '../src/research/career-personalization-t8-synthesis-authority-residual-gap-reassessment-review.js';
import {
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES,
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_bridge_discovery_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_bridge_discovery_test',
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

function acceptedB10() {
  const p4 = acceptedP4();
  const readiness = buildCareerPersonalizationPostP4T8ReadinessReview(p4);
  const b4 = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(p4, readiness);
  const b5 = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(p4, readiness, b4);
  const b6 = buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
    p4,
    readiness,
    b4,
    b5,
  );
  const b7 = buildCareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidence(
    p4,
    readiness,
    b4,
    b5,
    b6,
  );
  const b8 = buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(
    b6,
    b7,
  );
  const b9 = buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(b8);
  return buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(b9);
}

describe('Career T8 current T5/T6 semantic bridge authority candidate discovery evidence', () => {
  test('records five inspected candidates but accepts no authority', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedB10(),
      );

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
    expect(report.inspectedCandidateCount).toBe(5);
    expect(report.inspectedCandidates).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES);
    expect(report.admissionCompatibleCandidateCount).toBe(0);
    expect(report.authorityAcquiredByThisGate).toBe(false);
  });

  test('searches all three bridge lanes and keeps all six gaps open', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedB10(),
      );

    expect(report.discoveryLaneCount).toBe(3);
    expect(report.laneResults.every((lane) => lane.searched)).toBe(true);
    expect(report.laneResults.every((lane) => lane.admissionCompatibleCandidateCount === 0)).toBe(true);
    expect(report.allSixGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('keeps Cheonbu Myeongri as the strongest lead but table-of-contents evidence cannot satisfy authority', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedB10(),
      );
    const candidate = report.inspectedCandidates.find(
      (item) => item.candidateId === 'cheonbu_myeongri_tongbyeonron_2020',
    );

    expect(report.strongestCurrentLeadCandidateId).toBe('cheonbu_myeongri_tongbyeonron_2020');
    expect(report.strongestCurrentLeadRequiresExactPassageAccess).toBe(true);
    expect(candidate?.sourceReference.isbn13).toBe('9788957175262');
    expect(candidate?.explicitCareerOrWorkSemanticObserved).toBe(true);
    expect(candidate?.multiPatternOrStructureCareerSemanticObserved).toBe(true);
    expect(candidate?.exactGapRelevantPassageLocatorObserved).toBe(false);
    expect(candidate?.originalSourceFullPassageInspected).toBe(false);
    expect(candidate?.admissionAcceptedUnderB10).toBe(false);
  });

  test('rejects the 2020 prosperous-Ten-Star paper from the current track because it quantifies strength', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedB10(),
      );
    const candidate = report.inspectedCandidates.find(
      (item) => item.candidateId === 'choi_eunhee_2020_prosperous_ten_stars_aptitude',
    );

    expect(candidate?.status).toBe('INCOMPATIBLE_NUMERIC_STRENGTH_METHOD');
    expect(candidate?.numericStrengthWeightingObserved).toBe(true);
    expect(candidate?.methodologyCompatibilityWithCurrentT5T6Contract).toBe(
      'INCOMPATIBLE_NUMERIC_WEIGHTING',
    );
    expect(report.numericStrengthMethodRejectedFromCurrentTrack).toBe(true);
  });

  test('keeps scholarly occupational candidates mixed-method rather than laundering Yongshin or Gyeokguk', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedB10(),
      );
    const mixed = report.inspectedCandidates.filter(
      (candidate) => candidate.status === 'PARTIAL_METHODOLOGY_MIXED',
    );

    expect(mixed).toHaveLength(2);
    expect(mixed.every((candidate) => candidate.yongshinOrXijiMethodologyObserved)).toBe(true);
    expect(mixed.every((candidate) => candidate.gyeokgukMethodologyObserved)).toBe(true);
    expect(mixed.every((candidate) => !candidate.admissionAcceptedUnderB10)).toBe(true);
    expect(report.competingYongshinXijiMethodologyDeferred).toBe(true);
  });

  test('does not promote profession-change clash text into a natal T6 Career modifier', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedB10(),
      );
    const candidate = report.inspectedCandidates.find(
      (item) =>
        item.candidateId ===
        'chenyuan_sizhu_yuce_rumen_branch_clash_profession_change_transcription',
    );

    expect(candidate?.status).toBe('TEMPORAL_SEMANTIC_MISMATCH');
    expect(candidate?.dynamicCareerChangeSemanticsObserved).toBe(true);
    expect(candidate?.natalCareerModifierSemanticsObserved).toBe(false);
    expect(candidate?.yongshinOrXijiMethodologyObserved).toBe(true);
    expect(candidate?.independentNormativeProvenanceObserved).toBe(false);
    expect(report.dynamicCareerChangeNotPromotedToNatalModifier).toBe(true);
    expect(report.t6LaneHasNoNatalMethodologyCompatibleBridgeCandidate).toBe(true);
  });

  test('does not establish source-to-current-claim semantic correspondence by discovery alone', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedB10(),
      );

    expect(
      report.inspectedCandidates.every(
        (candidate) => candidate.sourceConceptToCurrentClaimSemanticCorrespondenceEstablished === false,
      ),
    ).toBe(true);
    expect(report.currentClaimSemanticCorrespondenceEstablishedByThisGate).toBe(false);
    expect(report.sameGapCrossCandidateCompositionPerformed).toBe(false);
    expect(report.sameGapCrossCandidateCompositionAuthorized).toBe(false);
  });

  test('freezes no-shortcut controls and creates zero executable interpretation artifacts', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        acceptedB10(),
      );

    expect(report.controlIds).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.registeredCandidateCount).toBe(0);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      candidateEvidenceRecordsCreated: 5,
      registeredSourcesCreated: 0,
      methodologyDefinitionsCreated: 0,
      methodologyChoicesAdopted: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('fails closed when the B10 content-addressed boundary is tampered', () => {
    const b10 = acceptedB10();
    const tampered = {
      ...b10,
      allowedCurrentInputClaimTypeCount: 0,
    } as unknown as CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport;
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(
        tampered,
      );

    expect(report.status).toBe('UPSTREAM_B10_BOUNDARY_INVALID');
    expect(report.exactB10BoundaryAccepted).toBe(false);
    expect(report.discoveryPerformed).toBe(false);
    expect(report.inspectedCandidates).toEqual([]);
    expect(report.laneResults).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
  });

  test('is deterministic and routes only to targeted source-access requirements review', () => {
    const b10 = acceptedB10();
    const first =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(b10);
    const second =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidence(b10);

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW',
    );
  });
});
