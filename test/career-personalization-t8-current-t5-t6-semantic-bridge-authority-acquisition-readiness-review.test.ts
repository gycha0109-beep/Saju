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
import {
  buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview,
  type CareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReviewReport,
} from '../src/research/career-personalization-t8-synthesis-authority-residual-gap-reassessment-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_INPUT_CLAIM_TYPES,
  buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview,
} from '../src/research/career-personalization-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
  CAREER_T5_SUBTYPE_CLAIM_TYPE,
} from '../src/research/career-personalized-t5-substrate.js';
import {
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
} from '../src/research/career-personalized-t6-branch-clash-hidden-stem-context.js';
import {
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
} from '../src/research/career-personalized-t6-branch-clash-qualifier-context.js';
import {
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
} from '../src/research/career-personalized-t6-branch-clash-seasonal-qualifier.js';

function acceptedP4(): CareerT6PublicClassicBoundedScopeMethodologyReviewReport {
  return {
    reviewId: 'career_t6_public_classic_scope_t8_bridge_readiness_test',
    reviewVersion: CAREER_PERSONALIZATION_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T6_PUBLIC_CLASSIC_BOUNDED_SCOPE_METHODOLOGY_REVIEW',
    decision:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORIZED_FOR_RESEARCH_T6_RULE_AUTHORING_ONLY_QUALIFIERS_CONTEXT_ONLY_GENERAL_P3_BLOCK_PRESERVED_NO_DAMAGE_WINNER_T8_NARRATIVE_OR_PRODUCTION',
    upstreamP3Version: CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
    upstreamI252ReviewId: 'i252_t8_bridge_readiness_test',
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

function acceptedB9() {
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
  return buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(b8);
}

describe('Career T8 current T5/T6 semantic bridge authority acquisition readiness review', () => {
  test('freezes the primary bridge acquisition track without acquiring authority', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedB9(),
      );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS',
    );
    expect(report.acquisitionTrackId).toBe('CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY');
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('allows exactly the five already-governed current Career T5/T6 input claim types', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedB9(),
      );

    expect(report.allowedCurrentInputClaimTypes).toEqual([
      CAREER_T5_SUBTYPE_CLAIM_TYPE,
      CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
    ]);
    expect(report.allowedCurrentInputClaimTypes).toEqual(
      CAREER_T8_CURRENT_T5_T6_BRIDGE_INPUT_CLAIM_TYPES,
    );
    expect(report.allowedCurrentInputClaimTypeCount).toBe(5);
    expect(report.currentT5T6ClaimSemanticsOnly).toBe(true);
  });

  test('partitions all six gaps exactly once into three bridge discovery lanes', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedB9(),
      );

    expect(report.discoveryLanes).toEqual(CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES);
    expect(report.discoveryLaneCount).toBe(3);
    expect(report.allSixGapsAssignedExactlyOnceToDiscoveryLane).toBe(true);
    expect(report.discoveryLanes.flatMap((lane) => lane.targetGapIds)).toEqual(
      CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    );
  });

  test('creates one exact admission contract per unresolved gap', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedB9(),
      );

    expect(report.admissionContractCount).toBe(6);
    expect(report.allSixGapsCoveredExactlyOnceByAdmissionContract).toBe(true);
    expect(report.admissionContracts.map((contract) => contract.gapId)).toEqual(
      CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    );
    expect(
      report.admissionContracts.every(
        (contract) =>
          contract.sourceConceptToCurrentClaimSemanticCorrespondenceRequired &&
          contract.correspondenceEvidenceMustBeSourceBound &&
          contract.explicitCareerOrWorkSemanticAssertionRequired &&
          contract.inputMethodologyCompatibilityRequired,
      ),
    ).toBe(true);
  });

  test('does not require historical sources to contain internal claim type strings', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedB9(),
      );

    expect(report.sourceNeedNotUseInternalClaimTypeNames).toBe(true);
    expect(report.sourceConceptToCurrentClaimSemanticCorrespondenceRequired).toBe(true);
    expect(
      report.admissionContracts.every(
        (contract) => contract.internalClaimTypeStringNeedAppearInSource === false,
      ),
    ).toBe(true);
  });

  test('keeps Qianli Career wording inspectable but blocks Yongshin/Xiji from this track', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedB9(),
      );

    expect(report.qianliCareerBindingMayBeReinspected).toBe(true);
    expect(report.qianliCareerBindingAutomaticallyAccepted).toBe(false);
    expect(report.qianliYongshinXijiTrackIncludedInThisAcquisition).toBe(false);
    expect(report.competingMethodologyMayBeSilentlyAdopted).toBe(false);
    expect(report.competingMethodologyChoiceRequiredBeforeAnyYongshinXijiUse).toBe(true);
  });

  test('preserves categorical qualifier boundaries with no strength, winner, damage, or precedence inference', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedB9(),
      );

    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.clashWinnerVerdictAuthorized).toBe(false);
    expect(report.damageMagnitudeAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.occupationOrSuccessOutcomeAuthorized).toBe(false);
    expect(report.historicalRankLanguageMayBeModernizedAutomatically).toBe(false);
  });

  test('freezes controls and creates zero executable interpretation artifacts', () => {
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        acceptedB9(),
      );

    expect(report.controlIds).toEqual(
      CAREER_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.candidateDiscoveryPerformedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      sourceCandidatesDiscovered: 0,
      sourceCandidatesRegistered: 0,
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

  test('fails closed when the B9 content-addressed boundary is tampered', () => {
    const b9 = acceptedB9();
    const tampered = {
      ...b9,
      currentT5T6SemanticBridgeIsUniversalResidual: false,
    } as unknown as CareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReviewReport;
    const report =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
        tampered,
      );

    expect(report.status).toBe('UPSTREAM_B9_BOUNDARY_INVALID');
    expect(report.exactB9BoundaryAccepted).toBe(false);
    expect(report.acquisitionTrackId).toBe('NONE');
    expect(report.allowedCurrentInputClaimTypes).toEqual([]);
    expect(report.discoveryLanes).toEqual([]);
    expect(report.admissionContracts).toEqual([]);
    expect(report.controlsFrozen).toBe(false);
  });

  test('is deterministic and routes only to bounded bridge candidate discovery', () => {
    const b9 = acceptedB9();
    const first =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(b9);
    const second =
      buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(b9);

    expect(first.reviewId).toBe(second.reviewId);
    expect(deterministicContentHash(first)).toBe(deterministicContentHash(second));
    expect(first.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
  });
});
