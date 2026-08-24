import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeTargetClashDependencyEvidenceReport } from './i33-challenge-target-clash-dependency-evidence.js';
import type {
  ChallengeTargetCombinationDependencyEvidenceCandidate,
  ChallengeTargetCombinationDependencyEvidenceReport,
} from './i35-challenge-target-combination-dependency-evidence.js';
import type { ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport } from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';
import type { CurrentChartSettlementSubstrateVerificationRoute } from './i59-challenge-combination-support-channel-current-chart-settlement-substrate-verification-methodology-review.js';
import type {
  CurrentChartSettlementSubstrateVerificationStatus,
  NarrowBureauContextStatus,
} from './i60-challenge-combination-support-channel-current-chart-settlement-substrate-verification-evidence.js';
import type { ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport } from './i61-challenge-combination-support-channel-relation-identity-pair-evidence.js';
import {
  buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview,
  type ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
  type TouchSpecificSettlementDispatchResult,
} from './i62-challenge-combination-support-channel-touch-specific-settlement-dispatch-methodology-review.js';
import {
  buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence,
  type ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem,
  type ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
} from './i63-challenge-combination-support-channel-touch-specific-settlement-dispatch-evidence.js';
import {
  buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview,
  type ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
  type I64DispatchedSettlementDependency,
} from './i64-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-methodology-review.js';

export const I65_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-evidence-v1';

export interface I65DispatchedDependencyVerification {
  dependency: I64DispatchedSettlementDependency;
  route: CurrentChartSettlementSubstrateVerificationRoute;
  verificationStatus: CurrentChartSettlementSubstrateVerificationStatus;
  currentChartSettlementSubstrateVerified: boolean;
  verifiedAuthorityRefs: readonly string[];
  rescueTopologyCandidateCount: number | 'not_applicable';
  narrowBureauContextStatus: NarrowBureauContextStatus;
  narrowBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' | 'not_determined' | 'not_applicable';
  settlementOutcomeResolved: false;
}

export interface I65DispatchedRelationVerification {
  relationId: string;
  relationKind: TouchSpecificSettlementDispatchResult['relationKind'];
  isCurrentCombinationRelation: boolean;
  dispatchClass: TouchSpecificSettlementDispatchResult['dispatchClass'];
  dependencyVerification: readonly I65DispatchedDependencyVerification[];
  allDispatchedDependenciesHaveVerifiedCurrentChartSubstrate: boolean;
  precedenceWithinMultiTouch: 'not_determined';
  settlementOutcome: 'not_determined';
}

export interface ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceItem {
  mechanism: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem['mechanism'];
  currentCombinationRelationId: string;
  currentCombinationRelationKind: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem['currentCombinationRelationKind'];
  targetParticipantPillar: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem['targetParticipantPillar'];
  targetParticipantComponent: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem['targetParticipantComponent'];
  targetParticipantValue: string;
  supportChannelKind: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem['supportChannelKind'];
  sourcePillar: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem['sourcePillar'];
  sourceComponent: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem['sourceComponent'];
  sourceValue: string;
  contestTopologyState: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem['contestTopologyState'];
  touchCount: number;
  dispatchedRelationVerification: readonly I65DispatchedRelationVerification[];
  allDispatchedRelationSettlementSubstratesVerified: boolean;
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

export interface ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE'
    | 'I61_UNRESOLVED_OR_INVALID'
    | 'I62_METHODOLOGY_NOT_AUTHORIZED'
    | 'I63_UNRESOLVED_OR_INVALID'
    | 'I64_METHODOLOGY_NOT_AUTHORIZED'
    | 'DEPENDENCY_ROUTE_MISMATCH';
  upstreamI61ReportId: string;
  upstreamI62ReviewId: string;
  upstreamI63ReportId: string;
  upstreamI64ReviewId: string;
  i33ReportId: string;
  i35ReportId: string;
  i47ReportId: string;
  items: readonly ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceItem[];
  dispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceAvailable: boolean;
  anyDispatchedRelationCurrentChartSettlementSubstrateVerified: boolean;
  allDispatchedRelationCurrentChartSettlementSubstratesVerified: boolean;
  anyRoutedSettlementOutcomeResolved: false;
  pairOrderSignificanceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
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
    ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
    'reportId'
  >,
): ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_dispatched_relation_current_chart_settlement_substrate_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport['status'],
    'RESOLVED_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE'
  >,
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  dispatchMethodology: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
  dispatchEvidence: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
  methodology: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport {
  return finalized({
    evidenceVersion:
      I65_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE_VERSION,
    status,
    upstreamI61ReportId: pairEvidence.reportId,
    upstreamI62ReviewId: dispatchMethodology.reviewId,
    upstreamI63ReportId: dispatchEvidence.reportId,
    upstreamI64ReviewId: methodology.reviewId,
    i33ReportId: i33.reportId,
    i35ReportId: i35.reportId,
    i47ReportId: i47.reportId,
    items: [],
    dispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceAvailable: false,
    anyDispatchedRelationCurrentChartSettlementSubstrateVerified: false,
    allDispatchedRelationCurrentChartSettlementSubstratesVerified: false,
    anyRoutedSettlementOutcomeResolved: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
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

function i61Accepted(evidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport): boolean {
  return (
    evidence.status === 'RESOLVED_RELATION_IDENTITY_PAIR_EVIDENCE' &&
    evidence.relationIdKindPairEvidenceAvailable &&
    evidence.pairReconstructionFromSeparateI54ArraysUsed === false &&
    evidence.touchSpecificSettlementDispatchAuthorized === false &&
    evidence.crossRelationPrecedenceAuthorized === false &&
    evidence.contestOutcomeVerdictAuthorized === false &&
    evidence.classificationAuthorized === false &&
    evidence.numericScoringAuthorized === false
  );
}

function i62Accepted(
  methodology: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
): boolean {
  const canonical =
    buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();
  return (
    methodology.reviewId === canonical.reviewId &&
    methodology.decision === 'PAIR_KIND_DISPATCH_AUTHORIZED_PRECEDENCE_AND_OUTCOME_BLOCKED' &&
    methodology.exactI61PairRequired &&
    methodology.touchSpecificSettlementDispatchAuthorized &&
    methodology.crossRelationPrecedenceAuthorized === false &&
    methodology.multiTouchAggregationAuthorized === false &&
    methodology.dispatchToSettlementOutcomeAuthorized === false &&
    methodology.classificationAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function i63Accepted(
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  dispatchMethodology: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
  dispatchEvidence: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
): boolean {
  const expected = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
    pairEvidence,
    dispatchMethodology,
  );
  return (
    dispatchEvidence.reportId === expected.reportId &&
    dispatchEvidence.status === 'RESOLVED_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_EVIDENCE' &&
    dispatchEvidence.touchSpecificSettlementDispatchEvidenceAvailable &&
    dispatchEvidence.allRelationPairsDispatched &&
    dispatchEvidence.pairOrderSignificanceAuthorized === false &&
    dispatchEvidence.multiTouchAggregationAuthorized === false &&
    dispatchEvidence.crossRelationPrecedenceAuthorized === false &&
    dispatchEvidence.settlementOutcomeVerdictAuthorized === false &&
    dispatchEvidence.supportChannelActivationVerdictAuthorized === false &&
    dispatchEvidence.supportChannelPersistenceVerdictAuthorized === false &&
    dispatchEvidence.supportChannelDestructionVerdictAuthorized === false &&
    dispatchEvidence.supportChannelNetEffectVerdictAuthorized === false &&
    dispatchEvidence.classificationAuthorized === false &&
    dispatchEvidence.numericScoringAuthorized === false
  );
}

function i64Accepted(
  methodology: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
): boolean {
  const canonical =
    buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();
  return (
    methodology.reviewId === canonical.reviewId &&
    methodology.decision ===
      'I59_EXACT_DOMAIN_RULES_REUSABLE_PER_I63_DISPATCHED_PAIR_OUTCOMES_BLOCKED' &&
    methodology.i59ExactDomainRulesReusablePerDispatchedPair &&
    methodology.authoritativeRelationIdKindPairRequiredFromI61 &&
    methodology.canonicalPairDispatchRequiredFromI63 &&
    methodology.methodologyApplicabilityAloneSufficientForVerification === false &&
    methodology.i33ArbitrarySupportSourceReuseAuthorized === false &&
    methodology.i35ArbitraryCompetingRelationReuseAuthorized === false &&
    methodology.i47BureauStateToSupportSourceOutcomeAuthorized === false &&
    methodology.touchSpecificGenericDependencyVerificationAuthorized === false &&
    methodology.competingRelationPrecedenceSettlementVerificationAuthorized === false &&
    methodology.crossRelationPrecedenceAuthorized === false &&
    methodology.multiTouchAggregationAuthorized === false &&
    methodology.settlementOutcomeResolutionAuthorized === false &&
    methodology.classificationAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function requirementMap(
  methodology: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
): ReadonlyMap<
  I64DispatchedSettlementDependency,
  ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport['requirements'][number]
> | undefined {
  const map = new Map<
    I64DispatchedSettlementDependency,
    ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport['requirements'][number]
  >();
  for (const requirement of methodology.requirements) {
    if (map.has(requirement.dependency)) return undefined;
    map.set(requirement.dependency, requirement);
  }
  return map;
}

function isCombinationKind(
  kind: TouchSpecificSettlementDispatchResult['relationKind'],
): kind is ChallengeTargetCombinationDependencyEvidenceCandidate['relationKind'] {
  return (
    kind === 'stem_five_combination' ||
    kind === 'branch_six_combination' ||
    kind === 'branch_three_combination'
  );
}

function exactI35Candidate(
  item: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem,
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
  item: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem,
  dispatch: TouchSpecificSettlementDispatchResult,
  i33: ChallengeTargetClashDependencyEvidenceReport,
) {
  if (
    i33.status !== 'RESOLVED_DEPENDENCY_EVIDENCE' ||
    item.sourceComponent !== 'branch' ||
    dispatch.relationKind !== 'branch_clash' ||
    dispatch.isCurrentCombinationRelation
  ) {
    return undefined;
  }
  return i33.candidates.find(
    (candidate) =>
      candidate.mechanism === item.mechanism &&
      candidate.clashRelationId === dispatch.relationId &&
      candidate.participants.some(
        (participant) =>
          participant.position === item.sourcePillar && String(participant.branch) === item.sourceValue,
      ),
  );
}

function narrowI47Context(
  item: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem,
  dispatch: TouchSpecificSettlementDispatchResult,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): {
  status: NarrowBureauContextStatus;
  state: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' | 'not_determined';
  verified: boolean;
} {
  if (
    item.currentCombinationRelationKind !== 'branch_three_combination' ||
    dispatch.relationKind !== 'branch_clash'
  ) {
    return { status: 'NOT_APPLICABLE', state: 'not_determined', verified: false };
  }
  if (
    i47.status !== 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE' ||
    item.sourceComponent !== 'branch'
  ) {
    return { status: 'NOT_VERIFIED', state: 'not_determined', verified: false };
  }
  const formation = i47.items.find(
    (candidate) =>
      candidate.mechanism === item.mechanism &&
      candidate.formationRelationId === item.currentCombinationRelationId &&
      candidate.clashes.some(
        (clash) =>
          clash.clashRelationId === dispatch.relationId &&
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
  item: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem,
  dispatch: TouchSpecificSettlementDispatchResult,
  dependency: I64DispatchedSettlementDependency,
  route: CurrentChartSettlementSubstrateVerificationRoute,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): I65DispatchedDependencyVerification {
  if (route === 'EXACT_I35_CURRENT_COMBINATION_SUBSTRATE') {
    const candidate =
      dispatch.isCurrentCombinationRelation &&
      dispatch.relationId === item.currentCombinationRelationId &&
      dispatch.relationKind === item.currentCombinationRelationKind &&
      isCombinationKind(dispatch.relationKind)
        ? exactI35Candidate(item, i35, dispatch.relationId, dispatch.relationKind)
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

  if (route === 'EXACT_I35_COMPETING_COMBINATION_SUBSTRATE') {
    const candidate =
      !dispatch.isCurrentCombinationRelation && isCombinationKind(dispatch.relationKind)
        ? exactI35Candidate(item, i35, dispatch.relationId, dispatch.relationKind)
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

  const clash = exactI33Candidate(item, dispatch, i33);
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

  const bureau = narrowI47Context(item, dispatch, i47);
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
    narrowBureauState: bureau.status === 'NOT_APPLICABLE' ? 'not_applicable' : bureau.state,
    settlementOutcomeResolved: false,
  };
}

export function buildI65ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidence(
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  dispatchMethodology: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
  dispatchEvidence: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
  methodology: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport {
  if (!i61Accepted(pairEvidence)) {
    return unresolved('I61_UNRESOLVED_OR_INVALID', pairEvidence, dispatchMethodology, dispatchEvidence, methodology, i33, i35, i47, [
      'Resolved authoritative I61 relation-id/kind pair evidence is required.',
    ]);
  }
  if (!i62Accepted(dispatchMethodology)) {
    return unresolved('I62_METHODOLOGY_NOT_AUTHORIZED', pairEvidence, dispatchMethodology, dispatchEvidence, methodology, i33, i35, i47, [
      'The supplied I62 review must match the canonical pair-local dispatch methodology.',
    ]);
  }
  if (!i63Accepted(pairEvidence, dispatchMethodology, dispatchEvidence)) {
    return unresolved('I63_UNRESOLVED_OR_INVALID', pairEvidence, dispatchMethodology, dispatchEvidence, methodology, i33, i35, i47, [
      'I63 dispatch evidence must deterministically match the exact supplied I61/I62 chain.',
    ]);
  }
  if (!i64Accepted(methodology)) {
    return unresolved('I64_METHODOLOGY_NOT_AUTHORIZED', pairEvidence, dispatchMethodology, dispatchEvidence, methodology, i33, i35, i47, [
      'The supplied I64 review must match the canonical I59-exact-domain-per-dispatched-pair contract.',
    ]);
  }

  const requirements = requirementMap(methodology);
  if (requirements === undefined) {
    return unresolved('DEPENDENCY_ROUTE_MISMATCH', pairEvidence, dispatchMethodology, dispatchEvidence, methodology, i33, i35, i47, [
      'I64 must provide one unique exact-domain verification route per concrete dispatched dependency.',
    ]);
  }

  const items: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceItem[] = [];
  for (const item of dispatchEvidence.items) {
    const dispatchedRelationVerification: I65DispatchedRelationVerification[] = [];
    for (const dispatch of item.dispatchedRelations) {
      const dependencyVerification: I65DispatchedDependencyVerification[] = [];
      for (const dependency of dispatch.routedDependencies) {
        if (
          dependency === 'TOUCH_SPECIFIC_RELATION_SETTLEMENT' ||
          dependency === 'COMPETING_RELATION_SETTLEMENT'
        ) {
          return unresolved('DEPENDENCY_ROUTE_MISMATCH', pairEvidence, dispatchMethodology, dispatchEvidence, methodology, i33, i35, i47, [
            `I63 emitted non-concrete dependency ${dependency} for pair-local I65 verification.`,
          ]);
        }
        const requirement = requirements.get(dependency);
        if (requirement === undefined) {
          return unresolved('DEPENDENCY_ROUTE_MISMATCH', pairEvidence, dispatchMethodology, dispatchEvidence, methodology, i33, i35, i47, [
            `No I64 exact-domain verification route exists for dispatched dependency ${dependency}.`,
          ]);
        }
        dependencyVerification.push(
          verificationForDependency(
            item,
            dispatch,
            dependency,
            requirement.reusedI59Route,
            i33,
            i35,
            i47,
          ),
        );
      }
      dispatchedRelationVerification.push({
        relationId: dispatch.relationId,
        relationKind: dispatch.relationKind,
        isCurrentCombinationRelation: dispatch.isCurrentCombinationRelation,
        dispatchClass: dispatch.dispatchClass,
        dependencyVerification,
        allDispatchedDependenciesHaveVerifiedCurrentChartSubstrate:
          dependencyVerification.length > 0 &&
          dependencyVerification.every(
            (verification) => verification.currentChartSettlementSubstrateVerified,
          ),
        precedenceWithinMultiTouch: 'not_determined',
        settlementOutcome: 'not_determined',
      });
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
      touchCount: item.touchCount,
      dispatchedRelationVerification,
      allDispatchedRelationSettlementSubstratesVerified:
        dispatchedRelationVerification.length > 0 &&
        dispatchedRelationVerification.every(
          (verification) =>
            verification.allDispatchedDependenciesHaveVerifiedCurrentChartSubstrate,
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

  const dependencyVerifications = items.flatMap((item) =>
    item.dispatchedRelationVerification.flatMap((relation) => relation.dependencyVerification),
  );

  return finalized({
    evidenceVersion:
      I65_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE_VERSION,
    status: 'RESOLVED_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE',
    upstreamI61ReportId: pairEvidence.reportId,
    upstreamI62ReviewId: dispatchMethodology.reviewId,
    upstreamI63ReportId: dispatchEvidence.reportId,
    upstreamI64ReviewId: methodology.reviewId,
    i33ReportId: i33.reportId,
    i35ReportId: i35.reportId,
    i47ReportId: i47.reportId,
    items,
    dispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceAvailable: true,
    anyDispatchedRelationCurrentChartSettlementSubstrateVerified: dependencyVerifications.some(
      (verification) => verification.currentChartSettlementSubstrateVerified,
    ),
    allDispatchedRelationCurrentChartSettlementSubstratesVerified:
      dependencyVerifications.length > 0 &&
      dependencyVerifications.every(
        (verification) => verification.currentChartSettlementSubstrateVerified,
      ),
    anyRoutedSettlementOutcomeResolved: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
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
      'I65 applies the canonical I59/I64 exact-domain rules to each exact I61 relation pair after canonical I63 dispatch. Multi-touch no longer blocks pair-local substrate verification solely because more than one relation touches the support source.',
      'I33 clash reuse requires the exact dispatched clash id, same mechanism, branch support source, and exact source pillar/branch participation. I35 combination reuse requires the exact dispatched relation id/kind, same mechanism, and exact source pillar/component/value participation.',
      'I47 remains optional narrow bureau-local context for the exact current three-combination plus exact dispatched clash. BROKEN_BY_TIGHT_EMBEDDED_CLASH never sets supportChannelDestroyed or resolves the generic support-source outcome.',
      'Pair-local current-chart substrate verification does not aggregate multiple touches, choose precedence, or resolve any dispatched settlement outcome.',
      'Support activation/persistence/neutralization/destruction, net effect, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, and strong/weak classification remain unresolved and unauthorized.',
    ],
  });
}
