import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeTargetCombinationRelationKind } from './i35-challenge-target-combination-dependency-evidence.js';

export const I76_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_KIND_SPECIFIC_COMBINATION_BINDING_INTERACTION_SETTLEMENT_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-relation-kind-specific-combination-binding-interaction-settlement-methodology-review-v1';

export type I76CombinationSettlementRole =
  | 'CURRENT_COMBINATION'
  | 'COMPETING_COMBINATION';

export type I76CombinationInteractionReadiness =
  | 'STRUCTURAL_INTERACTION_ONLY_SCOPE_TRANSFER_BLOCKED'
  | 'STRUCTURAL_PAIR_INTERACTION_ONLY_TRANSFORMATION_CONVENTION_BLOCKED'
  | 'STRUCTURAL_BUREAU_FORMATION_AVAILABLE_POST_INTERACTION_SETTLEMENT_REQUIRED';

export interface I76RelationKindCombinationInteractionPolicy {
  relationKind: ChallengeTargetCombinationRelationKind;
  readiness: I76CombinationInteractionReadiness;
  structuralRelationAuthorityAvailable: true;
  exactCurrentChartCandidateSubstrateAvailable: true;
  currentAndCompetingRolesMayReuseKindSpecificStructuralSubstrate: true;
  currentAndCompetingRolesShareOneOutcomeVerdictPolicy: false;
  transformationResultRouteAuthorized: false;
  directBindingVerdictAuthorized: false;
  directInteractionOutcomeAuthorized: false;
  noEffectConclusionAuthorized: false;
  structuralBureauFormationMayBeObserved: boolean;
  structuralBureauFormationIsBindingVerdict: false;
  postInteractionStateResolved: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  requiredAuthorityRefs: readonly string[];
  unresolvedNormativeQuestions: readonly string[];
}

export interface I76RoleBoundaryPolicy {
  role: I76CombinationSettlementRole;
  exactRelationKindRequired: true;
  exactRelationIdRequired: true;
  exactSupportSourceIdentityRequired: true;
  pairLocalOutcomeRequiredBeforeCrossRelationPrecedence: true;
  roleMayBorrowOppositeRoleOutcomeWithoutAudit: false;
  settlementOutcome: 'not_determined';
}

export interface ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'RELATION_KIND_SPECIFIC_INTERACTION_PATHS_SEPARATED_DIRECT_BINDING_OUTCOME_BLOCKED';
  relationKindAuditComplete: true;
  stemFiveAndBranchSixAndBranchThreeMayShareOneBindingRule: false;
  currentAndCompetingCombinationRolesRemainDistinctOutcomeDomains: true;
  kindSpecificStructuralSubstrateReuseAcrossRolesAuthorized: true;
  directBindingOutcomeAdapterAuthorized: false;
  genericCombinationSettlementResolverAuthorized: false;
  transformationEqualsBindingAuthorized: false;
  nonTransformationEqualsBindingAuthorized: false;
  structuralMembershipEqualsBindingAuthorized: false;
  structuralBureauFormationEqualsBindingAuthorized: false;
  structuralBureauFormationEqualsPostInteractionEffectiveBureauAuthorized: false;
  noEffectInferenceFromBlockedTransformationAuthorized: false;
  globalConditionPrecedenceAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  kindPolicies: readonly I76RelationKindCombinationInteractionPolicy[];
  rolePolicies: readonly I76RoleBoundaryPolicy[];
  authorityBasis: readonly {
    authorityRef: string;
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  recommendedNextGate: 'RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE_ADAPTER';
  notes: readonly string[];
}

const KIND_POLICIES = Object.freeze([
  {
    relationKind: 'stem_five_combination' as const,
    readiness: 'STRUCTURAL_INTERACTION_ONLY_SCOPE_TRANSFER_BLOCKED' as const,
    structuralRelationAuthorityAvailable: true as const,
    exactCurrentChartCandidateSubstrateAvailable: true as const,
    currentAndCompetingRolesMayReuseKindSpecificStructuralSubstrate: true as const,
    currentAndCompetingRolesShareOneOutcomeVerdictPolicy: false as const,
    transformationResultRouteAuthorized: false as const,
    directBindingVerdictAuthorized: false as const,
    directInteractionOutcomeAuthorized: false as const,
    noEffectConclusionAuthorized: false as const,
    structuralBureauFormationMayBeObserved: false,
    structuralBureauFormationIsBindingVerdict: false as const,
    postInteractionStateResolved: false as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    requiredAuthorityRefs: ['I35', 'I38', 'I39', 'I40', 'I42'],
    unresolvedNormativeQuestions: [
      'what source-bounded structural interaction consequence, if any, applies to a non-day-master challenge-target stem combination',
      'how seasonal/support/competing contexts participate without importing day-master 化氣 or 羈絆 result contracts',
      'how subject persistence is represented after a structural stem combination without inventing replacement or disappearance semantics',
    ],
  },
  {
    relationKind: 'branch_six_combination' as const,
    readiness: 'STRUCTURAL_PAIR_INTERACTION_ONLY_TRANSFORMATION_CONVENTION_BLOCKED' as const,
    structuralRelationAuthorityAvailable: true as const,
    exactCurrentChartCandidateSubstrateAvailable: true as const,
    currentAndCompetingRolesMayReuseKindSpecificStructuralSubstrate: true as const,
    currentAndCompetingRolesShareOneOutcomeVerdictPolicy: false as const,
    transformationResultRouteAuthorized: false as const,
    directBindingVerdictAuthorized: false as const,
    directInteractionOutcomeAuthorized: false as const,
    noEffectConclusionAuthorized: false as const,
    structuralBureauFormationMayBeObserved: false,
    structuralBureauFormationIsBindingVerdict: false as const,
    postInteractionStateResolved: false as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    requiredAuthorityRefs: ['I35', 'I38', 'I39', 'I40', 'I43'],
    unresolvedNormativeQuestions: [
      'what branch-six structural interaction or binding semantics are source-authorized without a uniform transformed-element result contract',
      'how seasonal/support/competing topology affects interaction without treating blocked transformation as no effect',
      'how branch subject persistence is represented after interaction',
    ],
  },
  {
    relationKind: 'branch_three_combination' as const,
    readiness: 'STRUCTURAL_BUREAU_FORMATION_AVAILABLE_POST_INTERACTION_SETTLEMENT_REQUIRED' as const,
    structuralRelationAuthorityAvailable: true as const,
    exactCurrentChartCandidateSubstrateAvailable: true as const,
    currentAndCompetingRolesMayReuseKindSpecificStructuralSubstrate: true as const,
    currentAndCompetingRolesShareOneOutcomeVerdictPolicy: false as const,
    transformationResultRouteAuthorized: false as const,
    directBindingVerdictAuthorized: false as const,
    directInteractionOutcomeAuthorized: false as const,
    noEffectConclusionAuthorized: false as const,
    structuralBureauFormationMayBeObserved: true,
    structuralBureauFormationIsBindingVerdict: false as const,
    postInteractionStateResolved: false as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    requiredAuthorityRefs: ['I35', 'I38', 'I39', 'I40', 'I44', 'I45', 'I46', 'I47', 'I48'],
    unresolvedNormativeQuestions: [
      'how a source-bounded STRUCTURAL_BUREAU_FORMED state settles after clash and other competing-relation interaction',
      'how intact/damaged/broken post-interaction states are represented outside already-authorized narrow subcases',
      'how the original branch subjects persist relative to bureau identity without equating formation to replacement or transformation',
    ],
  },
] as const satisfies readonly I76RelationKindCombinationInteractionPolicy[]);

const ROLE_POLICIES = Object.freeze([
  {
    role: 'CURRENT_COMBINATION' as const,
    exactRelationKindRequired: true as const,
    exactRelationIdRequired: true as const,
    exactSupportSourceIdentityRequired: true as const,
    pairLocalOutcomeRequiredBeforeCrossRelationPrecedence: true as const,
    roleMayBorrowOppositeRoleOutcomeWithoutAudit: false as const,
    settlementOutcome: 'not_determined' as const,
  },
  {
    role: 'COMPETING_COMBINATION' as const,
    exactRelationKindRequired: true as const,
    exactRelationIdRequired: true as const,
    exactSupportSourceIdentityRequired: true as const,
    pairLocalOutcomeRequiredBeforeCrossRelationPrecedence: true as const,
    roleMayBorrowOppositeRoleOutcomeWithoutAudit: false as const,
    settlementOutcome: 'not_determined' as const,
  },
] as const satisfies readonly I76RoleBoundaryPolicy[]);

const AUTHORITY_BASIS = Object.freeze([
  {
    authorityRef: 'I35 / I39',
    finding:
      'Exact current-chart combination identity, relation kind, participants, support/seasonal context, and competing topology are available as substrate while binding, transformation, subject identity, and post-relation outcomes remain unresolved.',
  },
  {
    authorityRef: 'I38 / I40 / I42',
    finding:
      'Stem-five traditional 化氣 and 合而不化 result contracts are day-master scoped or context-bound and cannot be transferred into a generic non-day-master challenge-target transformation or binding verdict.',
  },
  {
    authorityRef: 'I38 / I43',
    finding:
      'Branch-six structural pairing is authoritative, but no complete same-domain uniform transformed-element result contract is selected; blocked transformation does not imply no structural interaction or no effect.',
  },
  {
    authorityRef: 'I44 / I45',
    finding:
      'A complete branch-three relation may emit STRUCTURAL_BUREAU_FORMED, but formation is explicitly distinct from post-interaction effective-bureau, binding, subject replacement, or final force state.',
  },
  {
    authorityRef: 'I66',
    finding:
      'Current-combination and competing-combination binding/interaction are separate pair-local outcome domains, and one shared outcome policy is not authorized without relation-kind audit and later role-specific outcome review.',
  },
] as const);

const NEXT_GUARDS = Object.freeze([
  'A next evidence adapter may classify exact current and competing combination relations by I76 relation-kind readiness, preserving exact relation id, kind, role, mechanism, and support-source identity.',
  'Do not emit BOUND, UNBOUND, TRANSFORMED, NEUTRALIZED, DESTROYED, DISAPPEARED, PRESERVED, or replacement-subject outcomes from structural membership or traditional references alone.',
  'For stem-five, preserve I42 day-master scope closure and do not import 化氣 or 羈絆 result language into a challenge-target binding result.',
  'For branch-six, preserve structural pairing while keeping transformed-element and binding/interaction outcomes unresolved; do not turn unavailable transformation convention into a no-effect verdict.',
  'For branch-three, permit exact I45 STRUCTURAL_BUREAU_FORMED evidence where aligned but never treat formation as a post-interaction binding/effective-bureau verdict.',
  'Keep current-combination and competing-combination outcome roles distinct even when they reuse the same relation-kind structural substrate.',
  'Do not introduce global condition precedence, cross-relation precedence, support activation/persistence, effective mechanism force, scoring, or classification.',
] as const);

export function buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview(): ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReviewReport {
  const material = {
    reviewVersion:
      I76_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_KIND_SPECIFIC_COMBINATION_BINDING_INTERACTION_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
    decision:
      'RELATION_KIND_SPECIFIC_INTERACTION_PATHS_SEPARATED_DIRECT_BINDING_OUTCOME_BLOCKED' as const,
    relationKindAuditComplete: true as const,
    stemFiveAndBranchSixAndBranchThreeMayShareOneBindingRule: false as const,
    currentAndCompetingCombinationRolesRemainDistinctOutcomeDomains: true as const,
    kindSpecificStructuralSubstrateReuseAcrossRolesAuthorized: true as const,
    directBindingOutcomeAdapterAuthorized: false as const,
    genericCombinationSettlementResolverAuthorized: false as const,
    transformationEqualsBindingAuthorized: false as const,
    nonTransformationEqualsBindingAuthorized: false as const,
    structuralMembershipEqualsBindingAuthorized: false as const,
    structuralBureauFormationEqualsBindingAuthorized: false as const,
    structuralBureauFormationEqualsPostInteractionEffectiveBureauAuthorized: false as const,
    noEffectInferenceFromBlockedTransformationAuthorized: false as const,
    globalConditionPrecedenceAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    supportChannelActivationVerdictAuthorized: false as const,
    supportChannelPersistenceVerdictAuthorized: false as const,
    supportChannelNetEffectVerdictAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    kindPolicies: KIND_POLICIES,
    rolePolicies: ROLE_POLICIES,
    authorityBasis: AUTHORITY_BASIS,
    requiredNextImplementationGuards: NEXT_GUARDS,
    recommendedNextGate: 'RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE_ADAPTER' as const,
    notes: [
      'I76 closes the unsafe idea that all structural combinations can share one generic binding or interaction outcome rule.',
      'Stem-five, branch-six, and branch-three have different source boundaries and therefore different unresolved settlement questions.',
      'The branch-three path is the only kind with a currently authorized positive structural state beyond membership: STRUCTURAL_BUREAU_FORMED. That state remains pre-settlement and post-interaction-blocked.',
      'Current and competing combination roles may reuse audited kind-specific structural substrate, but their pair-local settlement outcomes remain separate and unresolved.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_relation_kind_specific_combination_interaction_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
