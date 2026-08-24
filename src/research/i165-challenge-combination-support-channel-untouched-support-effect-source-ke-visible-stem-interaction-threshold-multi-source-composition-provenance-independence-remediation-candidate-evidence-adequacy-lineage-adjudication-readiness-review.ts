import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I164_REMEDIATION_DISCOVERY_CANDIDATE_IDS,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport,
  type I164RemediationDiscoveryCandidateId,
} from './i164-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-remediation-candidate-discovery-evidence.js';

export const I165_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-remediation-candidate-evidence-adequacy-lineage-adjudication-readiness-review-v1';

export const I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS = Object.freeze([
  'EXACT_CANDIDATE_SOURCE_AND_WITNESS_BINDING',
  'EXACT_BINARY_RULE_PASSAGE_OR_CLAIM_BINDING',
  'DATED_PREDECESSOR_AND_SUCCESSOR_CHRONOLOGY_CHECK',
  'INTERNAL_ATTRIBUTION_CITATION_AND_AUTHOR_ORIGIN_STATEMENT_CHECK',
  'PERSON_SCHOOL_TEACHER_STUDENT_OR_TRANSMISSION_RELATIONSHIP_CHECK',
  'MATERIAL_TEXTUAL_OVERLAP_AND_DIRECTIONALITY_CHECK',
  'SAME_WORK_DUPLICATE_AND_RETRANSMISSION_NORMALIZATION',
  'TRI_STATE_RELATIONSHIP_FINDING_REQUIRED',
  'EXPLICIT_NEGATIVE_FINDING_REQUIRES_DOCUMENTED_BOUNDED_SEARCH_BASIS',
  'NO_INDEPENDENCE_INFERENCE_FROM_CHRONOLOGY_AUTHORSHIP_SCHOOL_LABEL_OR_SEARCH_SILENCE',
] as const);

export type I165LineageAdjudicationRequirementId =
  (typeof I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS)[number];

export type I165LineageQuestionId =
  | 'LI_HANCHEN_GE_BU_ZUOYONG_EXACT_UPSTREAM_ORIGIN'
  | 'SUN_HAIYI_TO_LI_HANCHEN_SPECIFIC_DEPENDENCY';

export interface I165LineageAdjudicationTarget {
  questionId: I165LineageQuestionId;
  candidateId: I164RemediationDiscoveryCandidateId;
  targetQuestion: string;
  currentFinding: 'UNRESOLVED_REQUIRES_TARGETED_LINEAGE_EVIDENCE';
  requiredRequirementIds: readonly I165LineageAdjudicationRequirementId[];
  readinessState: 'READY_FOR_TARGETED_LINEAGE_EVIDENCE_ACQUISITION';
  allowedFutureFindingStates: readonly [
    'DERIVATIVE_DEPENDENCY_FOUND',
    'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
    'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
  ];
  lineageEvidenceAcquiredByReadinessGate: false;
  relationshipAdjudicatedByReadinessGate: false;
  independenceAdjudicatedByReadinessGate: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW'
    | 'I164_REMEDIATION_CANDIDATE_EVIDENCE_INVALID';
  decision:
    | 'I164_EVIDENCE_ADEQUATE_FOR_TARGETED_LINEAGE_ADJUDICATION_READINESS_TWO_RELATIONSHIP_QUESTIONS_FROZEN_NO_INDEPENDENCE_ADJUDICATION'
    | 'LINEAGE_ADJUDICATION_NOT_READY';
  upstreamI164EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI164BoundaryAccepted: boolean;
  i164EvidenceAdequateForCandidateDiscoveryRecord: boolean;
  i164EvidenceAdequateToEstablishIndependenceWithoutFurtherEvidence: false;
  candidateEvidenceRecordCount: 2 | 0;
  liHanchenNewCandidateIdentityAndScopeEvidenceAdequate: boolean;
  liHanchenUpstreamOriginStillUnresolved: boolean;
  sunHaiyiIdentityScopeAndContextEvidenceAdequate: boolean;
  sunHaiyiSpecificDependencyStillUnresolved: boolean;
  schoolLineageSignalAloneInsufficientForDependencyFinding: true;
  chronologyAloneInsufficientForDependencyFinding: true;
  doctrineSimilarityAloneInsufficientForDependencyFinding: true;
  requirementIds: readonly I165LineageAdjudicationRequirementId[];
  requirementCount: 10;
  requirementsFrozen: boolean;
  lineageTargets: readonly I165LineageAdjudicationTarget[];
  lineageTargetCount: 2 | 0;
  exactLiHanchenOriginQuestionPresent: boolean;
  exactSunHaiyiToLiHanchenQuestionPresent: boolean;
  targetedLineageEvidenceAcquisitionAuthorizedByThisGate: boolean;
  targetedLineageEvidenceAcquisitionExecutedByThisGate: false;
  relationshipFindingMadeByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  candidateSetMutatedByThisGate: false;
  candidateRemovedByThisGate: false;
  candidateReplacedByThisGate: false;
  evidenceReboundByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetReevaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  productionPolicyExecutionAuthorized: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

function exactI164Accepted(
  i164: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport,
): boolean {
  const exactCandidateIds =
    i164.candidateEvidenceRecords.length === I164_REMEDIATION_DISCOVERY_CANDIDATE_IDS.length &&
    i164.candidateEvidenceRecords.every(
      (record, index) => record.candidateId === I164_REMEDIATION_DISCOVERY_CANDIDATE_IDS[index],
    );

  return (
    i164.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE' &&
    i164.decision ===
      'REMEDIATION_CANDIDATE_DISCOVERY_EXECUTED_ONE_NEW_PROVENANCE_CANDIDATE_AND_ONE_LINEAGE_RISK_SIGNAL_DISCOVERED_ZERO_INDEPENDENCE_OR_REMEDIATION_SELECTION' &&
    i164.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i164.policyVersion === 'v1-definition' &&
    i164.adoptionVersion === 'v1-adoption' &&
    i164.currentCandidateSetVersion === 'v1-candidate-set' &&
    i164.currentInputPackageVersion === 'v2-input-package' &&
    i164.exactI163ReadinessAccepted &&
    i164.discoveryOutputRequirementCount === 9 &&
    exactCandidateIds &&
    i164.candidateEvidenceRecordCount === 2 &&
    i164.newProvenanceCandidatePendingAdjudicationCount === 1 &&
    i164.lineageDependencyRiskSignalCount === 1 &&
    i164.derivativeDependencyEstablishedCount === 0 &&
    i164.explicitNegativeDerivativeFindingEstablishedCount === 0 &&
    i164.independentNormativeProvenanceEstablishedCount === 0 &&
    i164.liHanchenCandidateDiscovered &&
    i164.liHanchen1997_1999SelfDisclosedWorkChronologyRecorded &&
    i164.liHanchen2003InspectedEditionRecorded &&
    i164.liHanchenBinaryNonInteractionRuleRecorded &&
    i164.liHanchenIndependenceNotInferredFromAuthorshipOrChronology &&
    i164.sunHaiyiCandidateRecordedAsLineageRiskOnly &&
    i164.sunHaiyi2004WitnessRecorded &&
    i164.sunHaiyiSpecificTextualDependencyOnLiHanchenNotProven &&
    i164.thirdPartyNewSchoolLineageSignalRecorded &&
    i164.sameDoctrineSimilarityNotPromotedToDerivativeDependency &&
    i164.sameWorkDuplicateWitnessesNotCountedAsIndependentAuthority &&
    i164.currentV2PackageAndCandidateSetRemainImmutable &&
    i164.remediationCandidateDiscoveryExecutedByThisGate &&
    i164.remediationStrategySelectedByThisGate === false &&
    i164.remediationExecutionAuthorizedByThisGate === false &&
    i164.candidateSetMutatedByThisGate === false &&
    i164.candidateReplacedByThisGate === false &&
    i164.evidenceReboundByThisGate === false &&
    i164.provenanceIndependenceAdjudicatedByThisGate === false &&
    i164.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i164.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i164.candidateSetReevaluationAuthorizedByThisGate === false &&
    i164.candidateSetReevaluationPerformedByThisGate === false &&
    i164.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i164.sourceCountVotingAllowed === false &&
    i164.provenanceTierWeightingAllowed === false &&
    i164.productionPolicyExecutionAuthorized === false &&
    i164.actualCompositionPerformedByThisGate === false &&
    i164.multiSourceCompositionAuthorized === false &&
    i164.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i164.thresholdRuleCreatedByThisGate === false &&
    i164.classificationAuthorized === false &&
    i164.numericScoringAuthorized === false &&
    i164.hiddenStemInteractionEligibilityGapRemains &&
    i164.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_AND_LINEAGE_ADJUDICATION_READINESS_REVIEW'
  );
}

function lineageTargets(): readonly I165LineageAdjudicationTarget[] {
  const allowed = Object.freeze([
    'DERIVATIVE_DEPENDENCY_FOUND',
    'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
    'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
  ] as const);

  return Object.freeze([
    Object.freeze({
      questionId: 'LI_HANCHEN_GE_BU_ZUOYONG_EXACT_UPSTREAM_ORIGIN' as const,
      candidateId: 'candidate_li_hanchen_bazi_yuce_zhenzong_ge_bu_zuoyong' as const,
      targetQuestion:
        'What exact earlier source, teacher, course material, authored predecessor, or independent-origin evidence can establish the normative lineage of 李涵辰’s visible-stem 隔不作用 rule?',
      currentFinding: 'UNRESOLVED_REQUIRES_TARGETED_LINEAGE_EVIDENCE' as const,
      requiredRequirementIds: I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS,
      readinessState: 'READY_FOR_TARGETED_LINEAGE_EVIDENCE_ACQUISITION' as const,
      allowedFutureFindingStates: allowed,
      lineageEvidenceAcquiredByReadinessGate: false as const,
      relationshipAdjudicatedByReadinessGate: false as const,
      independenceAdjudicatedByReadinessGate: false as const,
    }),
    Object.freeze({
      questionId: 'SUN_HAIYI_TO_LI_HANCHEN_SPECIFIC_DEPENDENCY' as const,
      candidateId: 'candidate_sun_haiyi_mingli_guo_sanguan_gegan_yaoge' as const,
      targetQuestion:
        'Is there direct attribution, transmission history, or directional textual evidence linking 孙海义’s specific 隔干/遥隔 non-interaction rule to 李涵辰, beyond chronology, school labels, and doctrine similarity?',
      currentFinding: 'UNRESOLVED_REQUIRES_TARGETED_LINEAGE_EVIDENCE' as const,
      requiredRequirementIds: I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS,
      readinessState: 'READY_FOR_TARGETED_LINEAGE_EVIDENCE_ACQUISITION' as const,
      allowedFutureFindingStates: allowed,
      lineageEvidenceAcquiredByReadinessGate: false as const,
      relationshipAdjudicatedByReadinessGate: false as const,
      independenceAdjudicatedByReadinessGate: false as const,
    }),
  ]);
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_provenance_remediation_candidate_lineage_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI165ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(
  i164: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport {
  const accepted = exactI164Accepted(i164);
  const targets = accepted ? lineageTargets() : Object.freeze([]);

  return finalized({
    reviewVersion:
      I165_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW'
      : 'I164_REMEDIATION_CANDIDATE_EVIDENCE_INVALID',
    decision: accepted
      ? 'I164_EVIDENCE_ADEQUATE_FOR_TARGETED_LINEAGE_ADJUDICATION_READINESS_TWO_RELATIONSHIP_QUESTIONS_FROZEN_NO_INDEPENDENCE_ADJUDICATION'
      : 'LINEAGE_ADJUDICATION_NOT_READY',
    upstreamI164EvidenceRecordSetId: i164.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI164BoundaryAccepted: accepted,
    i164EvidenceAdequateForCandidateDiscoveryRecord: accepted,
    i164EvidenceAdequateToEstablishIndependenceWithoutFurtherEvidence: false,
    candidateEvidenceRecordCount: accepted ? 2 : 0,
    liHanchenNewCandidateIdentityAndScopeEvidenceAdequate: accepted,
    liHanchenUpstreamOriginStillUnresolved: accepted,
    sunHaiyiIdentityScopeAndContextEvidenceAdequate: accepted,
    sunHaiyiSpecificDependencyStillUnresolved: accepted,
    schoolLineageSignalAloneInsufficientForDependencyFinding: true,
    chronologyAloneInsufficientForDependencyFinding: true,
    doctrineSimilarityAloneInsufficientForDependencyFinding: true,
    requirementIds: I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS,
    requirementCount: 10,
    requirementsFrozen: accepted,
    lineageTargets: targets,
    lineageTargetCount: accepted ? 2 : 0,
    exactLiHanchenOriginQuestionPresent: accepted,
    exactSunHaiyiToLiHanchenQuestionPresent: accepted,
    targetedLineageEvidenceAcquisitionAuthorizedByThisGate: accepted,
    targetedLineageEvidenceAcquisitionExecutedByThisGate: false,
    relationshipFindingMadeByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    evidenceReboundByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'I164 evidence is adequate to justify two narrowly bounded lineage-evidence questions, but not to establish independence.',
          '李涵辰 requires exact upstream-origin investigation for the 隔不作用 rule; chronology and authorship alone remain insufficient.',
          '孙海义 requires direct relationship evidence beyond school-lineage labels and doctrine similarity before any derivative finding.',
          'I165 is readiness only. It acquires no new lineage evidence and does not select or execute remediation.',
        ])
      : Object.freeze([
          'I164 evidence did not match the exact frozen discovery boundary. Lineage adjudication readiness fails closed.',
        ]),
  });
}
