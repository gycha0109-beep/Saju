import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';
import type { CareerT8B58InputDimension } from './career-personalization-t8-classical-ziping-method-source-family-reconciliation.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT_VERSION,
  CAREER_T8_B77_CLOSED_CAPABILITY_IDS,
  CAREER_T8_B77_CLOSEOUT_CONTROL_IDS,
  CAREER_T8_B77_REOPEN_CONDITION_IDS,
  CAREER_T8_B77_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAuthoringGovernanceCloseoutReport,
} from './career-personalization-t8-classical-ziping-negative-clash-method-guard-research-authoring-governance-closeout.js';

export const CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_VERSION =
  'myeonghwa-career-personalization-t8-classical-ziping-operational-clash-effectiveness-reopen-signal-adjudication-v1' as const;

export const CAREER_T8_B78_REVIEWED_REPOSITORY_COMMIT_SHA =
  '0e9981fa19badd7c3f8b699a4140f63d80aeca76' as const;

export const CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION: CareerT8B58InputDimension =
  'INTERACTION_EFFECTIVENESS_OR_RECOVERY';

export const CAREER_T8_B78_CANDIDATE_NEGATIVE_CONSTRAINT_ID =
  'FORMAL_CLASH_PRESENCE_MAY_NOT_IMPLY_OPERATIONAL_EFFECTIVENESS' as const;

export type CareerT8B78EvidenceClassification =
  | 'INDEPENDENT_NEW_CLASSICAL_WORK_SIGNAL_TARGET_WITNESS_UNBOUND'
  | 'SAME_WORK_NEW_SURFACE_CORROBORATION_TARGET_WITNESS_UNBOUND'
  | 'SECONDARY_TRANSCRIPTION_CORROBORATION_NO_INSTITUTIONAL_WITNESS_BINDING';

export interface CareerT8B78OperationalClashEffectivenessEvidenceRecord {
  evidenceId: string;
  title: string;
  evidenceClassification: CareerT8B78EvidenceClassification;
  sourceIdentity: string;
  observedClause: string;
  institutionalWorkOrManuscriptFamilyIdentityBound: boolean;
  targetClauseDirectTranscriptionObserved: boolean;
  exactTargetHistoricalWitnessPageBound: false;
  exactTargetHistoricalWitnessDirectlyInspected: false;
  independentNewClassicalWorkSignal: boolean;
  samePreviouslyCoveredWorkNewSurface: boolean;
  secondaryOnly: boolean;
  candidateInputDimension: typeof CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION;
  formalClashRelationPresent: true;
  otherInteractionMayChangeWhetherClashOperates: true;
  supportsCandidateNegativeConstraint: true;
  universalCombinationCancelsClashRuleSupported: false;
  universalInteractionPrecedenceRuleSupported: false;
  positiveEffectSemanticsEstablished: false;
  currentCareerSemanticBridgeEstablished: false;
  qualifiesAsB77NewClassicalAuthorityScopeChange: false;
  evidenceBoundary: string;
}

function evidenceRecord(
  material: Omit<CareerT8B78OperationalClashEffectivenessEvidenceRecord, 'evidenceId'>,
): CareerT8B78OperationalClashEffectivenessEvidenceRecord {
  return Object.freeze({
    evidenceId: `career_t8_b78_operational_clash_effectiveness_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}

export const CAREER_T8_B78_OPERATIONAL_CLASH_EFFECTIVENESS_EVIDENCE_RECORDS = Object.freeze([
  evidenceRecord({
    title: '子平遺書 明代抄本 得合不沖 surface',
    evidenceClassification: 'INDEPENDENT_NEW_CLASSICAL_WORK_SIGNAL_TARGET_WITNESS_UNBOUND',
    sourceIdentity:
      '子平遺書, 不分卷, 明[1368-1644]抄本 manuscript corpus, National Library of China; institutional manuscript-family identity is independently exposed by NLC-derived Wikimedia scans',
    observedClause: '子申寅午，得合不冲',
    institutionalWorkOrManuscriptFamilyIdentityBound: true,
    targetClauseDirectTranscriptionObserved: true,
    exactTargetHistoricalWitnessPageBound: false,
    exactTargetHistoricalWitnessDirectlyInspected: false,
    independentNewClassicalWorkSignal: true,
    samePreviouslyCoveredWorkNewSurface: false,
    secondaryOnly: false,
    candidateInputDimension: CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION,
    formalClashRelationPresent: true,
    otherInteractionMayChangeWhetherClashOperates: true,
    supportsCandidateNegativeConstraint: true,
    universalCombinationCancelsClashRuleSupported: false,
    universalInteractionPrecedenceRuleSupported: false,
    positiveEffectSemanticsEstablished: false,
    currentCareerSemanticBridgeEstablished: false,
    qualifiesAsB77NewClassicalAuthorityScopeChange: false,
    evidenceBoundary:
      'The independent classical-work signal is material because the transmitted clause distinguishes a formal clash relation from whether it operates under another interaction. The exact target clause has not yet been bound to and directly inspected on a historical manuscript page, so it does not yet satisfy the B77 new-classical-authority reopen condition.',
  }),
  evidenceRecord({
    title: '三命通會 飛天祿馬 貪合不能沖 surface',
    evidenceClassification: 'SAME_WORK_NEW_SURFACE_CORROBORATION_TARGET_WITNESS_UNBOUND',
    sourceIdentity:
      '三命通會, 飛天祿馬 / 倒沖祿 method surface; the work is already covered by repository classical research, while this exact interaction-effectiveness surface is newly material to the present question',
    observedClause: '若有丑羈絆，子去貪合，不能沖午中之祿；有寅羈絆，則亥貪合，不能沖巳中之祿',
    institutionalWorkOrManuscriptFamilyIdentityBound: true,
    targetClauseDirectTranscriptionObserved: true,
    exactTargetHistoricalWitnessPageBound: false,
    exactTargetHistoricalWitnessDirectlyInspected: false,
    independentNewClassicalWorkSignal: false,
    samePreviouslyCoveredWorkNewSurface: true,
    secondaryOnly: false,
    candidateInputDimension: CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION,
    formalClashRelationPresent: true,
    otherInteractionMayChangeWhetherClashOperates: true,
    supportsCandidateNegativeConstraint: true,
    universalCombinationCancelsClashRuleSupported: false,
    universalInteractionPrecedenceRuleSupported: false,
    positiveEffectSemanticsEstablished: false,
    currentCareerSemanticBridgeEstablished: false,
    qualifiesAsB77NewClassicalAuthorityScopeChange: false,
    evidenceBoundary:
      'This is corroboration from a new surface inside an already-covered work, not an independent new-work authority path. The special-pattern context also forbids universalizing it into a general rule that combination always cancels clash.',
  }),
  evidenceRecord({
    title: '御定子平 干合支沖 secondary transcription surface',
    evidenceClassification: 'SECONDARY_TRANSCRIPTION_CORROBORATION_NO_INSTITUTIONAL_WITNESS_BINDING',
    sourceIdentity:
      '御定子平 attributed transcription surfaces located in secondary web reproductions; no institutional edition or manuscript witness is bound by this gate',
    observedClause: '干合則支沖者不沖',
    institutionalWorkOrManuscriptFamilyIdentityBound: false,
    targetClauseDirectTranscriptionObserved: true,
    exactTargetHistoricalWitnessPageBound: false,
    exactTargetHistoricalWitnessDirectlyInspected: false,
    independentNewClassicalWorkSignal: false,
    samePreviouslyCoveredWorkNewSurface: false,
    secondaryOnly: true,
    candidateInputDimension: CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION,
    formalClashRelationPresent: true,
    otherInteractionMayChangeWhetherClashOperates: true,
    supportsCandidateNegativeConstraint: true,
    universalCombinationCancelsClashRuleSupported: false,
    universalInteractionPrecedenceRuleSupported: false,
    positiveEffectSemanticsEstablished: false,
    currentCareerSemanticBridgeEstablished: false,
    qualifiesAsB77NewClassicalAuthorityScopeChange: false,
    evidenceBoundary:
      'The transcription is corroborative only. Without an institutional witness identity and exact target-page inspection it may not be used as authority, and this gate does not infer a universal interaction-precedence rule from it.',
  }),
] as const);

export const CAREER_T8_B78_REOPEN_SIGNAL_CONTROL_IDS = Object.freeze([
  'B78_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B77_GOVERNANCE_CLOSEOUT_BOUNDARY',
  'THE_B77_RESEARCH_AUTHORING_GOVERNANCE_LANE_REMAINS_CLOSED_UNTIL_ONE_EXPLICIT_REOPEN_CONDITION_IS_ACTUALLY_SATISFIED',
  'B58_ALREADY_NAMES_INTERACTION_EFFECTIVENESS_OR_RECOVERY_AS_A_RESEARCH_INPUT_DIMENSION_VOCABULARY_WITHOUT_ESTABLISHING_IT_AS_METHOD_AUTHORITY',
  'THE_CANDIDATE_CONSTRAINT_DISTINGUISHES_FORMAL_CLASH_PRESENCE_FROM_OPERATIONAL_EFFECTIVENESS_BEFORE_SEMANTIC_EFFECT_RESOLUTION',
  'ZIPING_YISHU_IS_RECORDED_AS_AN_INDEPENDENT_NEW_CLASSICAL_WORK_SIGNAL_BUT_ITS_TARGET_HISTORICAL_WITNESS_PAGE_IS_NOT_YET_BOUND_OR_DIRECTLY_INSPECTED',
  'SANMING_TONGHUI_GREEDY_COMBINATION_CANNOT_CLASH_IS_SAME_WORK_NEW_SURFACE_CORROBORATION_NOT_AN_INDEPENDENT_NEW_WORK_AUTHORITY_PATH',
  'YUDING_ZIPING_SECONDARY_TRANSCRIPTION_IS_CORROBORATION_ONLY_AND_CANNOT_SATISFY_THE_B77_AUTHORITY_REOPEN_CONDITION',
  'NO_UNIVERSAL_RULE_THAT_COMBINATION_ALWAYS_CANCELS_CLASH_IS_INFERRED',
  'NO_UNIVERSAL_INTERACTION_PRECEDENCE_RULE_IS_INFERRED',
  'THE_EXISTING_B63_B64_FIVE_CONSTRAINT_AUTHORITY_AND_GUARD_SHAPE_REMAIN_UNCHANGED',
  'NO_SIXTH_B64_GUARD_FIELD_OR_CONSTRAINT_IS_AUTHORIZED_BY_THIS_SIGNAL_ADJUDICATION',
  'NO_POSITIVE_T6_INPUT_CONTRACT_OR_POSITIVE_CLASH_EFFECT_CONTRACT_IS_CREATED',
  'B48_STYLE_SOURCE_OR_METHOD_TRIGGER_REMAINS_UNSATISFIED',
  'NO_CURRENT_CLASSICAL_TO_MODERN_CAREER_SEMANTIC_BRIDGE_IS_CREATED',
  'B61_VISUAL_CORROBORATION_HOLD_REMAINS_PRESERVED',
  'B56_CHEN_ZEZHEN_EXACT_TARGET_BODY_HOLD_REMAINS_PRESERVED',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_PUBLIC_PACKAGE_PERSISTENCE_CORE_REGISTRY_PRODUCTION_OR_PROMOTION_EFFECT_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudicationReport {
  adjudicationId: string;
  adjudicationVersion: typeof CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_VERSION;
  status:
    | 'RESOLVED_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION'
    | 'UPSTREAM_B77_BOUNDARY_INVALID';
  decision:
    | 'MATERIAL_NEW_CLASSICAL_SCOPE_SIGNAL_OBSERVED_B77_AUTHORITY_REOPEN_CONDITION_NOT_YET_SATISFIED_TARGET_WITNESS_BINDING_REQUIRED'
    | 'OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_NOT_ESTABLISHED';
  upstreamB77CloseoutId: string;
  exactB77BoundaryAccepted: boolean;
  reviewedRepository: 'gycha0109-beep/Saju';
  reviewedRepositoryCommitSha: typeof CAREER_T8_B78_REVIEWED_REPOSITORY_COMMIT_SHA;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  candidateInputDimension: typeof CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION;
  candidateNegativeConstraintId: typeof CAREER_T8_B78_CANDIDATE_NEGATIVE_CONSTRAINT_ID;
  evidenceRecords: readonly CareerT8B78OperationalClashEffectivenessEvidenceRecord[];
  evidenceRecordCount: 3 | 0;
  independentNewClassicalWorkSignalCount: 1 | 0;
  sameWorkNewSurfaceCorroborationCount: 1 | 0;
  secondaryCorroborationCount: 1 | 0;
  exactTargetHistoricalWitnessBindingCount: 0;
  materialScopeChangeSignalObserved: boolean;
  b77NewClassicalAuthorityScopeChangeReopenConditionSatisfied: false;
  boundedNegativeMethodScopeAmendmentAuthorized: false;
  existingFiveConstraintGuardMutationAuthorized: false;
  sixthConstraintAuthoringAuthorized: false;
  universalCombinationCancelsClashRuleAuthorized: false;
  universalInteractionPrecedenceRuleAuthorized: false;
  immediatelyExecutableTargetWitnessBindingLaneCount: 1 | 0;
  immediatelyExecutableScopeAuthorityAmendmentLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane:
    | 'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_TARGET_WITNESS_BINDING'
    | null;
  positiveT6InputContractEstablished: false;
  positiveClashEffectContractEstablished: false;
  branchSourceOrMethodTriggerActivationCount: 0;
  currentCareerSemanticBridgeEstablished: false;
  visualCorroborationHoldPreserved: boolean;
  b56ChenZezhenHoldPreserved: boolean;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B78_REOPEN_SIGNAL_CONTROL_IDS)[number][];
  controlCount: 18 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    reopenSignalAdjudicationsCreated: 1 | 0;
    evidenceRecordsCreated: 3 | 0;
    guardConstraintsChanged: 0;
    guardProposalFieldsChanged: 0;
    publicExportsChanged: 0;
    packageScriptsChanged: 0;
    persistenceBehaviorsCreated: 0;
    coreRegistryBehaviorsChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_TARGET_WITNESS_BINDING'
    | 'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION';
}

function exactB77Accepted(
  b77: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAuthoringGovernanceCloseoutReport,
): boolean {
  const { closeoutId, ...material } = b77;
  return (
    closeoutId ===
      `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_authoring_governance_closeout_${deterministicContentHash(material).slice(0, 24)}` &&
    b77.closeoutVersion ===
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT_VERSION &&
    b77.status === 'CLOSED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE' &&
    b77.decision ===
      'NEGATIVE_CLASH_RESEARCH_AUTHORING_GOVERNANCE_CLOSED_INTERNAL_DIRECT_PATH_READY_NO_PUBLIC_CORE_PRODUCTION_PROMOTION' &&
    b77.exactB76BoundaryAccepted &&
    b77.reviewedRepository === 'gycha0109-beep/Saju' &&
    b77.reviewedRepositoryCommitSha === CAREER_T8_B77_REVIEWED_REPOSITORY_COMMIT_SHA &&
    b77.researchAuthoringGovernanceLaneClosed &&
    b77.closedCapabilityCount === 6 &&
    deterministicContentHash(b77.closedCapabilityIds) ===
      deterministicContentHash(CAREER_T8_B77_CLOSED_CAPABILITY_IDS) &&
    b77.reopenConditionCount === 3 &&
    deterministicContentHash(b77.reopenConditionIds) ===
      deterministicContentHash(CAREER_T8_B77_REOPEN_CONDITION_IDS) &&
    b77.boundedNegativeGuardAvailable &&
    b77.explicitApplicabilityAdmissionAvailable &&
    b77.auditableEnvelopeAndAdmissionRecordAvailable &&
    b77.standaloneThreeOutcomeWorkflowAvailable &&
    b77.internalAuthoringEntrypointAvailable &&
    b77.directPathInvocationSufficient &&
    b77.additionalInvocationSurfaceRequired === false &&
    b77.publicOrPackageAdoptionAuthorized === false &&
    b77.persistenceRegistrationPromotionAuthorized === false &&
    b77.coreRuleRegistryIntegrationAuthorized === false &&
    b77.productionEnforcementAuthorized === false &&
    b77.immediateContinuationLaneCount === 0 &&
    b77.selectedImmediateNextLane === null &&
    b77.positiveT6InputContractEstablished === false &&
    b77.positiveClashEffectContractEstablished === false &&
    b77.branchSourceOrMethodTriggerActivationCount === 0 &&
    b77.currentCareerSemanticBridgeEstablished === false &&
    b77.visualCorroborationHoldPreserved &&
    b77.b56ChenZezhenHoldPreserved &&
    b77.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b77.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b77.productionPromotionAuthorized === false &&
    b77.productionImpact === 'NONE' &&
    b77.controlCount === 16 &&
    b77.controlsFrozen &&
    deterministicContentHash(b77.controlIds) === deterministicContentHash(CAREER_T8_B77_CLOSEOUT_CONTROL_IDS) &&
    b77.implementationEffects.closeoutRecordsCreated === 1 &&
    b77.implementationEffects.invocationSurfacesCreated === 0 &&
    b77.implementationEffects.publicExportsChanged === 0 &&
    b77.implementationEffects.packageScriptsChanged === 0 &&
    b77.implementationEffects.persistenceBehaviorsCreated === 0 &&
    b77.implementationEffects.coreRegistryBehaviorsChanged === 0 &&
    b77.implementationEffects.productionBehaviorsChanged === 0 &&
    b77.recommendedNextGate === null
  );
}

function evidenceBoundaryValid(): boolean {
  const evidence = CAREER_T8_B78_OPERATIONAL_CLASH_EFFECTIVENESS_EVIDENCE_RECORDS;
  const independent = evidence.filter((record) => record.independentNewClassicalWorkSignal);
  const sameWork = evidence.filter((record) => record.samePreviouslyCoveredWorkNewSurface);
  const secondary = evidence.filter((record) => record.secondaryOnly);
  return (
    CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.authorizedConstraintIds.length === 5 &&
    CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.positiveEffectSemanticsAuthorized === false &&
    CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.numericEffectSemanticsAuthorized === false &&
    CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.productionEnforcementEnabled === false &&
    evidence.length === 3 &&
    independent.length === 1 &&
    sameWork.length === 1 &&
    secondary.length === 1 &&
    evidence.every((record) => record.candidateInputDimension === 'INTERACTION_EFFECTIVENESS_OR_RECOVERY') &&
    evidence.every((record) => record.formalClashRelationPresent) &&
    evidence.every((record) => record.otherInteractionMayChangeWhetherClashOperates) &&
    evidence.every((record) => record.supportsCandidateNegativeConstraint) &&
    evidence.every((record) => record.exactTargetHistoricalWitnessPageBound === false) &&
    evidence.every((record) => record.exactTargetHistoricalWitnessDirectlyInspected === false) &&
    evidence.every((record) => record.universalCombinationCancelsClashRuleSupported === false) &&
    evidence.every((record) => record.universalInteractionPrecedenceRuleSupported === false) &&
    evidence.every((record) => record.positiveEffectSemanticsEstablished === false) &&
    evidence.every((record) => record.currentCareerSemanticBridgeEstablished === false) &&
    evidence.every((record) => record.qualifiesAsB77NewClassicalAuthorityScopeChange === false) &&
    CAREER_T8_B78_REOPEN_SIGNAL_CONTROL_IDS.length === 18
  );
}

export function buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication(
  b77: CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAuthoringGovernanceCloseoutReport,
): CareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudicationReport {
  const accepted = exactB77Accepted(b77) && evidenceBoundaryValid();
  const material = {
    adjudicationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_VERSION,
    status: accepted
      ? ('RESOLVED_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION' as const)
      : ('UPSTREAM_B77_BOUNDARY_INVALID' as const),
    decision: accepted
      ? ('MATERIAL_NEW_CLASSICAL_SCOPE_SIGNAL_OBSERVED_B77_AUTHORITY_REOPEN_CONDITION_NOT_YET_SATISFIED_TARGET_WITNESS_BINDING_REQUIRED' as const)
      : ('OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_NOT_ESTABLISHED' as const),
    upstreamB77CloseoutId: b77.closeoutId,
    exactB77BoundaryAccepted: accepted,
    reviewedRepository: 'gycha0109-beep/Saju' as const,
    reviewedRepositoryCommitSha: CAREER_T8_B78_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidateInputDimension: CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION,
    candidateNegativeConstraintId: CAREER_T8_B78_CANDIDATE_NEGATIVE_CONSTRAINT_ID,
    evidenceRecords: accepted ? CAREER_T8_B78_OPERATIONAL_CLASH_EFFECTIVENESS_EVIDENCE_RECORDS : Object.freeze([]),
    evidenceRecordCount: accepted ? (3 as const) : (0 as const),
    independentNewClassicalWorkSignalCount: accepted ? (1 as const) : (0 as const),
    sameWorkNewSurfaceCorroborationCount: accepted ? (1 as const) : (0 as const),
    secondaryCorroborationCount: accepted ? (1 as const) : (0 as const),
    exactTargetHistoricalWitnessBindingCount: 0 as const,
    materialScopeChangeSignalObserved: accepted,
    b77NewClassicalAuthorityScopeChangeReopenConditionSatisfied: false as const,
    boundedNegativeMethodScopeAmendmentAuthorized: false as const,
    existingFiveConstraintGuardMutationAuthorized: false as const,
    sixthConstraintAuthoringAuthorized: false as const,
    universalCombinationCancelsClashRuleAuthorized: false as const,
    universalInteractionPrecedenceRuleAuthorized: false as const,
    immediatelyExecutableTargetWitnessBindingLaneCount: accepted ? (1 as const) : (0 as const),
    immediatelyExecutableScopeAuthorityAmendmentLaneCount: 0 as const,
    immediatelyExecutableSemanticRuleLaneCount: 0 as const,
    selectedImmediateNextLane: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_TARGET_WITNESS_BINDING' as const)
      : null,
    positiveT6InputContractEstablished: false as const,
    positiveClashEffectContractEstablished: false as const,
    branchSourceOrMethodTriggerActivationCount: 0 as const,
    currentCareerSemanticBridgeEstablished: false as const,
    visualCorroborationHoldPreserved: accepted && b77.visualCorroborationHoldPreserved,
    b56ChenZezhenHoldPreserved: accepted && b77.b56ChenZezhenHoldPreserved,
    allSixHistoricalGapsRemainOpen: true as const,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionPromotionAuthorized: false as const,
    productionImpact: 'NONE' as const,
    controlIds: accepted ? CAREER_T8_B78_REOPEN_SIGNAL_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? (18 as const) : (0 as const),
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      reopenSignalAdjudicationsCreated: accepted ? (1 as const) : (0 as const),
      evidenceRecordsCreated: accepted ? (3 as const) : (0 as const),
      guardConstraintsChanged: 0 as const,
      guardProposalFieldsChanged: 0 as const,
      publicExportsChanged: 0 as const,
      packageScriptsChanged: 0 as const,
      persistenceBehaviorsCreated: 0 as const,
      coreRegistryBehaviorsChanged: 0 as const,
      productionBehaviorsChanged: 0 as const,
    }),
    recommendedNextGate: accepted
      ? ('BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_TARGET_WITNESS_BINDING' as const)
      : ('BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION' as const),
  };

  return {
    adjudicationId: `career_personalization_t8_classical_ziping_operational_clash_effectiveness_reopen_signal_adjudication_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
