import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeTargetClashDependencyEvidenceReport } from './i33-challenge-target-clash-dependency-evidence.js';
import type {
  ChallengeTargetCombinationDependencyEvidenceCandidate,
  ChallengeTargetCombinationDependencyEvidenceReport,
} from './i35-challenge-target-combination-dependency-evidence.js';
import type { ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport } from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';
import type { ChallengeCombinationSupportChannelContestSettlementDependency } from './i55-challenge-combination-support-channel-contest-settlement-methodology-review.js';
import type {
  ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem,
  ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
} from './i58-challenge-combination-support-channel-existing-settlement-authority-applicability-evidence.js';
import {
  buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview,
  type ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
  type CurrentChartSettlementSubstrateVerificationRoute,
} from './i59-challenge-combination-support-channel-current-chart-settlement-substrate-verification-methodology-review.js';

export const I60_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-current-chart-settlement-substrate-verification-evidence-v1';

export type CurrentChartSettlementSubstrateVerificationStatus =
  | 'VERIFIED_EXACT_AUTHORITY_DOMAIN'
  | 'VERIFIED_EXACT_AUTHORITY_DOMAIN_WITH_NARROW_BUREAU_CONTEXT'
  | 'UNVERIFIED_AUTHORITY_DOMAIN_OR_IDENTITY_MISMATCH'
  | 'BLOCKED_MULTI_TOUCH_PAIRING'
  | 'BLOCKED_COMPETING_RELATION_PRECEDENCE';

export type NarrowBureauContextStatus =
  | 'NOT_APPLICABLE'
  | 'NOT_VERIFIED'
  | 'VERIFIED_BUREAU_CONTEXT_NO_DETERMINISTIC_BREAK'
  | 'VERIFIED_BROKEN_BY_TIGHT_EMBEDDED_CLASH';

export interface ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerification {
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency;
  route: CurrentChartSettlementSubstrateVerificationRoute;
  verificationStatus: CurrentChartSettlementSubstrateVerificationStatus;
  currentChartSettlementSubstrateVerified: boolean;
  verifiedAuthorityRefs: readonly string[];
  rescueTopologyCandidateCount: number | 'not_applicable';
  narrowBureauContextStatus: NarrowBureauContextStatus;
  narrowBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' | 'not_determined' | 'not_applicable';
  settlementOutcomeResolved: false;
}

export interface ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceItem {
  mechanism: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem['mechanism'];
  currentCombinationRelationId: string;
  currentCombinationRelationKind: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem['currentCombinationRelationKind'];
  targetParticipantPillar: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem['targetParticipantPillar'];
  targetParticipantComponent: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem['targetParticipantComponent'];
  targetParticipantValue: string;
  supportChannelKind: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem['supportChannelKind'];
  sourcePillar: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem['sourcePillar'];
  sourceComponent: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem['sourceComponent'];
  sourceValue: string;
  contestTopologyState: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem['contestTopologyState'];
  touchingRelationIds: readonly string[];
  touchingRelationKinds: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem['touchingRelationKinds'];
  touchCount: number;
  dependencyVerification: readonly ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerification[];
  allRequiredSettlementDependenciesVerified: boolean;
  anySettlementOutcomeResolved: false;
  supportChannelActive: 'not_determined';
  supportChannelPersisted: 'not_determined';
  supportChannelNeutralized: 'not_determined';
  supportChannelDestroyed: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE'
    | 'I58_UNRESOLVED_OR_INVALID'
    | 'I59_METHODOLOGY_NOT_AUTHORIZED'
    | 'DEPENDENCY_ROUTE_MISMATCH';
  upstreamI58ReportId: string;
  upstreamI59ReviewId: string;
  i33ReportId: string;
  i35ReportId: string;
  i47ReportId: string;
  items: readonly ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceItem[];
  currentChartSettlementSubstrateVerificationEvidenceAvailable: boolean;
  anyCurrentChartSettlementSubstrateVerified: boolean;
  allEligibleCurrentChartSettlementSubstratesVerified: boolean;
  anyRoutedSettlementOutcomeResolved: false;
  contestOutcomeVerdictAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelNeutralizationVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<
    ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceReport,
    'reportId'
  >,
): ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_current_chart_settlement_substrate_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceReport['status'],
    'RESOLVED_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE'
  >,
  applicabilityEvidence: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
  methodology: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceReport {
  return finalized({
    evidenceVersion:
      I60_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE_VERSION,
    status,
    upstreamI58ReportId: applicabilityEvidence.reportId,
    upstreamI59ReviewId: methodology.reviewId,
    i33ReportId: i33.reportId,
    i35ReportId: i35.reportId,
    i47ReportId: i47.reportId,
    items: [],
    currentChartSettlementSubstrateVerificationEvidenceAvailable: false,
    anyCurrentChartSettlementSubstrateVerified: false,
    allEligibleCurrentChartSettlementSubstratesVerified: false,
    anyRoutedSettlementOutcomeResolved: false,
    contestOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

function i58Accepted(
  evidence: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
): boolean {
  return (
    evidence.status === 'RESOLVED_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE' &&
    evidence.authorityApplicabilityEvidenceAvailable &&
    evidence.currentChartRelationSpecificSettlementEvidenceVerified === false &&
    evidence.anyRoutedSettlementOutcomeResolved === false &&
    evidence.contestOutcomeVerdictAuthorized === false &&
    evidence.supportChannelActivationVerdictAuthorized === false &&
    evidence.supportChannelPersistenceVerdictAuthorized === false &&
    evidence.supportChannelNeutralizationVerdictAuthorized === false &&
    evidence.supportChannelDestructionVerdictAuthorized === false &&
    evidence.supportChannelNetEffectVerdictAuthorized === false &&
    evidence.effectiveMechanismForceVerdict === 'not_determined' &&
    evidence.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    evidence.classificationAuthorized === false &&
    evidence.numericScoringAuthorized === false
  );
}

function i59Accepted(
  methodology: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
): boolean {
  const canonical =
    buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();
  return (
    methodology.reviewId === canonical.reviewId &&
    methodology.decision ===
      'EXACT_IDENTITY_CHART_SUBSTRATE_VERIFICATION_ROUTING_AUTHORIZED_SETTLEMENT_OUTCOME_BLOCKED' &&
    methodology.exactIdentityChartSubstrateVerificationRoutingAuthorized &&
    methodology.methodologyApplicabilityAloneSufficientForChartVerification === false &&
    methodology.i33ArbitrarySupportSourceReuseAuthorized === false &&
    methodology.i35ArbitraryCompetingRelationReuseAuthorized === false &&
    methodology.i47BureauStateToSupportSourceOutcomeAuthorized === false &&
    methodology.multiTouchPairReconstructionAuthorized === false &&
    methodology.crossRelationPrecedenceAuthorized === false &&
    methodology.settlementOutcomeResolutionAuthorized === false &&
    methodology.supportChannelActivationVerdictAuthorized === false &&
    methodology.supportChannelPersistenceVerdictAuthorized === false &&
    methodology.supportChannelNetEffectVerdictAuthorized === false &&
    methodology.classificationAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function requirementMap(
  methodology: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
): ReadonlyMap<
  ChallengeCombinationSupportChannelContestSettlementDependency,
  ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport['requirements'][number]
> | undefined {
  const map = new Map<
    ChallengeCombinationSupportChannelContestSettlementDependency,
    ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport['requirements'][number]
  >();
  for (const requirement of methodology.requirements) {
    if (map.has(requirement.dependency)) return undefined;
    map.set(requirement.dependency, requirement);
  }
  return map;
}

function exactI35Candidate(
  item: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  relationId: string,
  relationKind: ChallengeTargetCombinationDependencyEvidenceCandidate['relationKind'],
): ChallengeTargetCombinationDependencyEvidenceCandidate | undefined {
  if (i35.status !== 'RESOLVED_DEPENDENCY_EVIDENCE') return undefined;
  return i35.candidates.find(
    (candidate) =>
      candidate.mechanism === item.mechanism &&
      candidate.relationId === relationId &&
      candidate.relationKind === relationKind &&
      candidate.participants.some(
        (participant) =>
          participant.pillar === item.sourcePillar &&
          participant.component === item.sourceComponent &&
          String(participant.value) === item.sourceValue,
      ),
  );
}

function exactI33Candidate(
  item: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem,
  i33: ChallengeTargetClashDependencyEvidenceReport,
) {
  if (
    i33.status !== 'RESOLVED_DEPENDENCY_EVIDENCE' ||
    item.sourceComponent !== 'branch' ||
    item.touchingRelationIds.length !== 1 ||
    item.touchingRelationKinds.length !== 1 ||
    item.touchingRelationKinds[0] !== 'branch_clash'
  ) {
    return undefined;
  }
  const clashRelationId = item.touchingRelationIds[0];
  if (clashRelationId === undefined) return undefined;
  return i33.candidates.find(
    (candidate) =>
      candidate.mechanism === item.mechanism &&
      candidate.clashRelationId === clashRelationId &&
      candidate.participants.some(
        (participant) =>
          participant.position === item.sourcePillar && String(participant.branch) === item.sourceValue,
      ),
  );
}

function narrowI47Context(
  item: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): {
  status: NarrowBureauContextStatus;
  state: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' | 'not_determined';
  verified: boolean;
} {
  if (item.currentCombinationRelationKind !== 'branch_three_combination') {
    return { status: 'NOT_APPLICABLE', state: 'not_determined', verified: false };
  }
  if (
    i47.status !== 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE' ||
    item.sourceComponent !== 'branch' ||
    item.touchingRelationIds.length !== 1
  ) {
    return { status: 'NOT_VERIFIED', state: 'not_determined', verified: false };
  }
  const clashRelationId = item.touchingRelationIds[0];
  if (clashRelationId === undefined) {
    return { status: 'NOT_VERIFIED', state: 'not_determined', verified: false };
  }
  const formation = i47.items.find(
    (candidate) =>
      candidate.mechanism === item.mechanism &&
      candidate.formationRelationId === item.currentCombinationRelationId &&
      candidate.clashes.some(
        (clash) =>
          clash.clashRelationId === clashRelationId &&
          (clash.clashedBureauParticipantPosition === item.sourcePillar ||
            clash.clashCounterpartPosition === item.sourcePillar),
      ),
  );
  if (formation === undefined) {
    return { status: 'NOT_VERIFIED', state: 'not_determined', verified: false };
  }
  if (formation.postInteractionBureauState === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH') {
    return {
      status: 'VERIFIED_BROKEN_BY_TIGHT_EMBEDDED_CLASH',
      state: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
      verified: true,
    };
  }
  return {
    status: 'VERIFIED_BUREAU_CONTEXT_NO_DETERMINISTIC_BREAK',
    state: 'not_determined',
    verified: true,
  };
}

function verificationForDependency(
  item: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceItem,
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency,
  route: CurrentChartSettlementSubstrateVerificationRoute,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerification {
  if (route === 'MULTI_TOUCH_PAIRING_BLOCKED') {
    return {
      dependency,
      route,
      verificationStatus: 'BLOCKED_MULTI_TOUCH_PAIRING',
      currentChartSettlementSubstrateVerified: false,
      verifiedAuthorityRefs: [],
      rescueTopologyCandidateCount: 'not_applicable',
      narrowBureauContextStatus: 'NOT_APPLICABLE',
      narrowBureauState: 'not_applicable',
      settlementOutcomeResolved: false,
    };
  }
  if (route === 'COMPETING_RELATION_PRECEDENCE_BLOCKED') {
    return {
      dependency,
      route,
      verificationStatus: 'BLOCKED_COMPETING_RELATION_PRECEDENCE',
      currentChartSettlementSubstrateVerified: false,
      verifiedAuthorityRefs: [],
      rescueTopologyCandidateCount: 'not_applicable',
      narrowBureauContextStatus: 'NOT_APPLICABLE',
      narrowBureauState: 'not_applicable',
      settlementOutcomeResolved: false,
    };
  }

  if (route === 'EXACT_I35_CURRENT_COMBINATION_SUBSTRATE') {
    const candidate = exactI35Candidate(
      item,
      i35,
      item.currentCombinationRelationId,
      item.currentCombinationRelationKind,
    );
    return {
      dependency,
      route,
      verificationStatus:
        candidate === undefined
          ? 'UNVERIFIED_AUTHORITY_DOMAIN_OR_IDENTITY_MISMATCH'
          : 'VERIFIED_EXACT_AUTHORITY_DOMAIN',
      currentChartSettlementSubstrateVerified: candidate !== undefined,
      verifiedAuthorityRefs: candidate === undefined ? [] : ['I35'],
      rescueTopologyCandidateCount: 'not_applicable',
      narrowBureauContextStatus: 'NOT_APPLICABLE',
      narrowBureauState: 'not_applicable',
      settlementOutcomeResolved: false,
    };
  }

  if (route === 'EXACT_I35_COMPETING_COMBINATION_SUBSTRATE') {
    const relationId = item.touchingRelationIds.length === 1 ? item.touchingRelationIds[0] : undefined;
    const relationKind = item.touchingRelationKinds.length === 1 ? item.touchingRelationKinds[0] : undefined;
    const candidate =
      relationId !== undefined &&
      (relationKind === 'stem_five_combination' ||
        relationKind === 'branch_six_combination' ||
        relationKind === 'branch_three_combination')
        ? exactI35Candidate(item, i35, relationId, relationKind)
        : undefined;
    return {
      dependency,
      route,
      verificationStatus:
        candidate === undefined
          ? 'UNVERIFIED_AUTHORITY_DOMAIN_OR_IDENTITY_MISMATCH'
          : 'VERIFIED_EXACT_AUTHORITY_DOMAIN',
      currentChartSettlementSubstrateVerified: candidate !== undefined,
      verifiedAuthorityRefs: candidate === undefined ? [] : ['I35'],
      rescueTopologyCandidateCount: 'not_applicable',
      narrowBureauContextStatus: 'NOT_APPLICABLE',
      narrowBureauState: 'not_applicable',
      settlementOutcomeResolved: false,
    };
  }

  const clash = exactI33Candidate(item, i33);
  if (route === 'EXACT_I33_CLASH_SUBSTRATE') {
    return {
      dependency,
      route,
      verificationStatus:
        clash === undefined
          ? 'UNVERIFIED_AUTHORITY_DOMAIN_OR_IDENTITY_MISMATCH'
          : 'VERIFIED_EXACT_AUTHORITY_DOMAIN',
      currentChartSettlementSubstrateVerified: clash !== undefined,
      verifiedAuthorityRefs: clash === undefined ? [] : ['I33', 'I49', 'I50'],
      rescueTopologyCandidateCount: 'not_applicable',
      narrowBureauContextStatus: 'NOT_APPLICABLE',
      narrowBureauState: 'not_applicable',
      settlementOutcomeResolved: false,
    };
  }

  if (route === 'EXACT_I33_RESCUE_TOPOLOGY_SUBSTRATE') {
    return {
      dependency,
      route,
      verificationStatus:
        clash === undefined
          ? 'UNVERIFIED_AUTHORITY_DOMAIN_OR_IDENTITY_MISMATCH'
          : 'VERIFIED_EXACT_AUTHORITY_DOMAIN',
      currentChartSettlementSubstrateVerified: clash !== undefined,
      verifiedAuthorityRefs: clash === undefined ? [] : ['I33'],
      rescueTopologyCandidateCount:
        clash === undefined ? 'not_applicable' : clash.rescueTopologyCandidates.length,
      narrowBureauContextStatus: 'NOT_APPLICABLE',
      narrowBureauState: 'not_applicable',
      settlementOutcomeResolved: false,
    };
  }

  const bureau = narrowI47Context(item, i47);
  return {
    dependency,
    route,
    verificationStatus:
      clash === undefined
        ? 'UNVERIFIED_AUTHORITY_DOMAIN_OR_IDENTITY_MISMATCH'
        : bureau.verified
          ? 'VERIFIED_EXACT_AUTHORITY_DOMAIN_WITH_NARROW_BUREAU_CONTEXT'
          : 'VERIFIED_EXACT_AUTHORITY_DOMAIN',
    currentChartSettlementSubstrateVerified: clash !== undefined,
    verifiedAuthorityRefs:
      clash === undefined ? [] : bureau.verified ? ['I33', 'I46', 'I47', 'I48'] : ['I33'],
    rescueTopologyCandidateCount: 'not_applicable',
    narrowBureauContextStatus: bureau.status,
    narrowBureauState:
      bureau.status === 'NOT_APPLICABLE' ? 'not_applicable' : bureau.state,
    settlementOutcomeResolved: false,
  };
}

export function buildI60ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidence(
  applicabilityEvidence: ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidenceReport,
  methodology: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceReport {
  if (!i58Accepted(applicabilityEvidence)) {
    return unresolved('I58_UNRESOLVED_OR_INVALID', applicabilityEvidence, methodology, i33, i35, i47, [
      'Resolved I58 applicability evidence with all settlement/outcome/activation/persistence/force/scoring guards closed is required.',
    ]);
  }
  if (!i59Accepted(methodology)) {
    return unresolved('I59_METHODOLOGY_NOT_AUTHORIZED', applicabilityEvidence, methodology, i33, i35, i47, [
      'The supplied I59 review must match the canonical exact-identity chart-substrate verification contract.',
    ]);
  }

  const requirements = requirementMap(methodology);
  if (requirements === undefined) {
    return unresolved('DEPENDENCY_ROUTE_MISMATCH', applicabilityEvidence, methodology, i33, i35, i47, [
      'I59 must provide one exact verification route per settlement dependency kind.',
    ]);
  }

  const items: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationEvidenceItem[] = [];
  for (const item of applicabilityEvidence.items) {
    const dependencyVerification: ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerification[] = [];
    for (const applicability of item.dependencyApplicability) {
      const requirement = requirements.get(applicability.dependency);
      if (requirement === undefined) {
        return unresolved('DEPENDENCY_ROUTE_MISMATCH', applicabilityEvidence, methodology, i33, i35, i47, [
          `No I59 verification route exists for ${applicability.dependency}.`,
        ]);
      }
      dependencyVerification.push(
        verificationForDependency(
          item,
          applicability.dependency,
          requirement.route,
          i33,
          i35,
          i47,
        ),
      );
    }

    items.push({
      mechanism: item.mechanism,
      currentCombinationRelationId: item.currentCombinationRelationId,
      currentCombinationRelationKind: item.currentCombinationRelationKind,
      targetParticipantPillar: item.targetParticipantPillar,
      targetParticipantComponent: item.targetParticipantComponent,
      targetParticipantValue: item.targetParticipantValue,
      supportChannelKind: item.supportChannelKind,
      sourcePillar: item.sourcePillar,
      sourceComponent: item.sourceComponent,
      sourceValue: item.sourceValue,
      contestTopologyState: item.contestTopologyState,
      touchingRelationIds: item.touchingRelationIds,
      touchingRelationKinds: item.touchingRelationKinds,
      touchCount: item.touchCount,
      dependencyVerification,
      allRequiredSettlementDependenciesVerified: dependencyVerification.every(
        (verification) => verification.currentChartSettlementSubstrateVerified,
      ),
      anySettlementOutcomeResolved: false,
      supportChannelActive: 'not_determined',
      supportChannelPersisted: 'not_determined',
      supportChannelNeutralized: 'not_determined',
      supportChannelDestroyed: 'not_determined',
      supportChannelNetEffect: 'not_resolved',
      effectiveMechanismForceVerdict: 'not_determined',
      relationSpecificUsefulnessHarmfulness: 'not_determined',
      numericScore: 'not_assigned',
    });
  }

  const verificationItems = items.flatMap((item) => item.dependencyVerification);
  const eligible = verificationItems.filter(
    (verification) =>
      verification.verificationStatus !== 'BLOCKED_MULTI_TOUCH_PAIRING' &&
      verification.verificationStatus !== 'BLOCKED_COMPETING_RELATION_PRECEDENCE',
  );

  return finalized({
    evidenceVersion:
      I60_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE_VERSION,
    status: 'RESOLVED_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE',
    upstreamI58ReportId: applicabilityEvidence.reportId,
    upstreamI59ReviewId: methodology.reviewId,
    i33ReportId: i33.reportId,
    i35ReportId: i35.reportId,
    i47ReportId: i47.reportId,
    items,
    currentChartSettlementSubstrateVerificationEvidenceAvailable: true,
    anyCurrentChartSettlementSubstrateVerified: verificationItems.some(
      (verification) => verification.currentChartSettlementSubstrateVerified,
    ),
    allEligibleCurrentChartSettlementSubstratesVerified:
      eligible.length > 0 && eligible.every((verification) => verification.currentChartSettlementSubstrateVerified),
    anyRoutedSettlementOutcomeResolved: false,
    contestOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I60 verifies only chart-specific substrate alignment against the exact I59 authority-domain routes; it does not resolve any routed settlement outcome.',
      'I33 reuse requires the support source to be an exact participant of the same mechanism and single clash relation; arbitrary structural clash reuse is rejected.',
      'I35 reuse requires the touched/current combination to be an exact challenge-target combination candidate for the same mechanism and exact source participant.',
      'I47 may annotate only an exact current three-combination bureau plus exact touching clash; even BROKEN_BY_TIGHT_EMBEDDED_CLASH remains bureau-local and never sets supportChannelDestroyed.',
      'Multi-touch touch-specific verification remains blocked because id-kind pairing is unavailable, and competing-relation verification remains blocked because precedence is unauthorized.',
      'A true currentChartSettlementSubstrateVerified flag is still below settlement outcome, activation/persistence, net support effect, post-relation root state, effective force, usefulness/harmfulness, scoring, and classification.',
    ],
  });
}
