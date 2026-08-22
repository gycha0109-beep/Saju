import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelContestSettlementDependency } from './i55-challenge-combination-support-channel-contest-settlement-methodology-review.js';

export const I59_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-current-chart-settlement-substrate-verification-methodology-review-v1';

export type CurrentChartSettlementSubstrateVerificationRoute =
  | 'EXACT_I35_CURRENT_COMBINATION_SUBSTRATE'
  | 'EXACT_I33_CLASH_SUBSTRATE'
  | 'EXACT_I33_RESCUE_TOPOLOGY_SUBSTRATE'
  | 'I33_GENERIC_CLASH_PLUS_I47_NARROW_BUREAU_CONTEXT'
  | 'EXACT_I35_COMPETING_COMBINATION_SUBSTRATE'
  | 'MULTI_TOUCH_PAIRING_BLOCKED'
  | 'COMPETING_RELATION_PRECEDENCE_BLOCKED';

export interface CurrentChartSettlementSubstrateVerificationRequirement {
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency;
  route: CurrentChartSettlementSubstrateVerificationRoute;
  requiredAuthorityRefs: readonly string[];
  exactMatchDimensions: readonly string[];
  chartSpecificSubstrateVerificationAuthorized: boolean;
  genericSupportSourceSettlementSubstrateVerificationAuthorized: boolean;
  settlementOutcomeResolutionAuthorized: false;
  supportChannelActivationResolutionAuthorized: false;
  supportChannelPersistenceResolutionAuthorized: false;
  notes: readonly string[];
}

export interface ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'EXACT_IDENTITY_CHART_SUBSTRATE_VERIFICATION_ROUTING_AUTHORIZED_SETTLEMENT_OUTCOME_BLOCKED';
  exactIdentityChartSubstrateVerificationRoutingAuthorized: true;
  methodologyApplicabilityAloneSufficientForChartVerification: false;
  i33ArbitrarySupportSourceReuseAuthorized: false;
  i35ArbitraryCompetingRelationReuseAuthorized: false;
  i47BureauStateToSupportSourceOutcomeAuthorized: false;
  multiTouchPairReconstructionAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  settlementOutcomeResolutionAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelNeutralizationVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  requirements: readonly CurrentChartSettlementSubstrateVerificationRequirement[];
  authorityBasis: readonly {
    authorityRef: string;
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

const REQUIREMENTS = Object.freeze([
  {
    dependency: 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    route: 'EXACT_I35_CURRENT_COMBINATION_SUBSTRATE',
    requiredAuthorityRefs: ['I35'],
    exactMatchDimensions: [
      'mechanism',
      'currentCombinationRelationId',
      'currentCombinationRelationKind',
      'source pillar + component + value must be an exact relation participant',
    ],
    chartSpecificSubstrateVerificationAuthorized: true,
    genericSupportSourceSettlementSubstrateVerificationAuthorized: true,
    settlementOutcomeResolutionAuthorized: false,
    supportChannelActivationResolutionAuthorized: false,
    supportChannelPersistenceResolutionAuthorized: false,
    notes: [
      'The current combination originates in the challenge-target combination chain, but I35 reuse still requires exact relation and source-participant identity.',
      'An aligned I35 candidate verifies only chart-specific structural/conditional substrate, not binding, neutralization, or persistence outcome.',
    ],
  },
  {
    dependency: 'CLASH_RELATIVE_FORCE_SETTLEMENT',
    route: 'EXACT_I33_CLASH_SUBSTRATE',
    requiredAuthorityRefs: ['I33', 'I49', 'I50'],
    exactMatchDimensions: [
      'mechanism',
      'single touching clash relation id',
      'source pillar + branch value must match an exact I33 clash participant',
    ],
    chartSpecificSubstrateVerificationAuthorized: true,
    genericSupportSourceSettlementSubstrateVerificationAuthorized: true,
    settlementOutcomeResolutionAuthorized: false,
    supportChannelActivationResolutionAuthorized: false,
    supportChannelPersistenceResolutionAuthorized: false,
    notes: [
      'I33 is challenge-target-root clash evidence rather than arbitrary branch-clash evidence; reuse is authorized only when the I58 support source is an exact participant of the same I33 clash candidate.',
      'Seasonal advantage and I49/I50 disposition remain substrate and do not establish relative force or a clash winner.',
    ],
  },
  {
    dependency: 'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
    route: 'EXACT_I33_RESCUE_TOPOLOGY_SUBSTRATE',
    requiredAuthorityRefs: ['I33'],
    exactMatchDimensions: [
      'mechanism',
      'single touching clash relation id',
      'source pillar + branch value must match an exact I33 clash participant',
      'preserve I33 rescueTopologyCandidates without effectiveness inference',
    ],
    chartSpecificSubstrateVerificationAuthorized: true,
    genericSupportSourceSettlementSubstrateVerificationAuthorized: true,
    settlementOutcomeResolutionAuthorized: false,
    supportChannelActivationResolutionAuthorized: false,
    supportChannelPersistenceResolutionAuthorized: false,
    notes: [
      'I33 may verify whether rescue topology candidates are present for the exact clash context.',
      'Presence or absence of rescue topology must not be converted directly to rescue effectiveness, persistence, or activation.',
    ],
  },
  {
    dependency: 'CLASH_INTERACTION_SETTLEMENT',
    route: 'I33_GENERIC_CLASH_PLUS_I47_NARROW_BUREAU_CONTEXT',
    requiredAuthorityRefs: ['I33', 'I46', 'I47', 'I48'],
    exactMatchDimensions: [
      'mechanism',
      'single touching clash relation id',
      'source pillar + branch value must match the exact clash participant for generic clash substrate',
      'I47 reuse additionally requires current combination kind branch_three_combination',
      'I47 formationRelationId must equal currentCombinationRelationId',
      'I47 clashRelationId must equal the touching clash relation id',
    ],
    chartSpecificSubstrateVerificationAuthorized: true,
    genericSupportSourceSettlementSubstrateVerificationAuthorized: false,
    settlementOutcomeResolutionAuthorized: false,
    supportChannelActivationResolutionAuthorized: false,
    supportChannelPersistenceResolutionAuthorized: false,
    notes: [
      'I33 can verify exact clash-context substrate when its domain identity aligns.',
      'I47 can additionally verify a narrow formed-bureau placement/break context only for the exact three-combination bureau and exact clash identity.',
      'Even an I47 BROKEN_BY_TIGHT_EMBEDDED_CLASH state is a bureau-state fact and cannot verify generic support-source destruction, inactivity, or settlement outcome.',
    ],
  },
  {
    dependency: 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    route: 'EXACT_I35_COMPETING_COMBINATION_SUBSTRATE',
    requiredAuthorityRefs: ['I35', 'I40', 'I41'],
    exactMatchDimensions: [
      'mechanism',
      'single touching competing combination relation id',
      'touching relation kind',
      'source pillar + component + value must be an exact I35 candidate participant',
    ],
    chartSpecificSubstrateVerificationAuthorized: true,
    genericSupportSourceSettlementSubstrateVerificationAuthorized: true,
    settlementOutcomeResolutionAuthorized: false,
    supportChannelActivationResolutionAuthorized: false,
    supportChannelPersistenceResolutionAuthorized: false,
    notes: [
      'I35 does not catalog every arbitrary combination in the chart; a competing relation is reusable only when it is itself an exact I35 challenge-target combination candidate for the same mechanism and source participant.',
      'I40/I41 preserve competing-condition topology but do not settle binding or precedence.',
    ],
  },
  {
    dependency: 'TOUCH_SPECIFIC_RELATION_SETTLEMENT',
    route: 'MULTI_TOUCH_PAIRING_BLOCKED',
    requiredAuthorityRefs: ['I54', 'I56', 'I58'],
    exactMatchDimensions: ['authoritative touching relation id-to-kind pair mapping'],
    chartSpecificSubstrateVerificationAuthorized: false,
    genericSupportSourceSettlementSubstrateVerificationAuthorized: false,
    settlementOutcomeResolutionAuthorized: false,
    supportChannelActivationResolutionAuthorized: false,
    supportChannelPersistenceResolutionAuthorized: false,
    notes: [
      'I54 exposes separate relation-id and relation-kind sets for multi-touch items and therefore does not authorize touch-specific dispatch.',
      'A later adapter must fail closed rather than reconstruct the missing pair mapping.',
    ],
  },
  {
    dependency: 'COMPETING_RELATION_SETTLEMENT',
    route: 'COMPETING_RELATION_PRECEDENCE_BLOCKED',
    requiredAuthorityRefs: ['I40', 'I41', 'I54', 'I56'],
    exactMatchDimensions: ['all touching relation identities', 'authorized competing-relation precedence policy'],
    chartSpecificSubstrateVerificationAuthorized: false,
    genericSupportSourceSettlementSubstrateVerificationAuthorized: false,
    settlementOutcomeResolutionAuthorized: false,
    supportChannelActivationResolutionAuthorized: false,
    supportChannelPersistenceResolutionAuthorized: false,
    notes: [
      'Current topology can show multiple touches, but no universal cross-relation precedence is authorized.',
      'Chart-specific competing-relation settlement verification therefore remains blocked even if individual relation substrates exist.',
    ],
  },
] as const satisfies readonly CurrentChartSettlementSubstrateVerificationRequirement[]);

const AUTHORITY_BASIS = Object.freeze([
  {
    authorityRef: 'I33',
    finding:
      'I33 materializes challenge-target-root clash candidates with exact clash relation id, participant positions/branches, seasonal/support substrate, and rescue topology while leaving relative force, rescue effect, clash settlement, and post-relation state unresolved.',
  },
  {
    authorityRef: 'I35',
    finding:
      'I35 materializes challenge-target combination candidates with exact relation identity and participants while leaving transformation, binding/interaction effect, competing-relation effect, and force unresolved.',
  },
  {
    authorityRef: 'I40/I41',
    finding:
      'The composition/dependency chain preserves competing conditions without authorizing a universal cross-relation precedence outcome.',
  },
  {
    authorityRef: 'I46/I47/I48',
    finding:
      'I47 has a narrow exact-bureau tight-embedded-clash state; I48 explicitly preserves contextual ambiguity outside that narrow bureau domain.',
  },
  {
    authorityRef: 'I54/I56/I58',
    finding:
      'Support-source contest routing preserves exact source identity for single-touch cases but deliberately does not provide authoritative id-kind pairing for multi-touch dispatch or any settlement outcome.',
  },
] as const);

const NEXT_GUARDS = Object.freeze([
  'A next adapter may verify chart-specific substrate only by exact dependency route and the identity dimensions listed here.',
  'I33 must not be reused for an arbitrary support-source branch merely because the same structural clash exists elsewhere; the source must be an exact participant of the same mechanism/clash candidate.',
  'I35 must not be reused for an arbitrary competing combination unless the touched relation is an exact I35 candidate and the support source is an exact participant.',
  'I47 bureau-state evidence may be attached only to the exact current three-combination bureau and exact touching clash identity; it must remain bureau context rather than support-source outcome.',
  'Do not reconstruct multi-touch relation id-kind pairs and do not invent competing-relation precedence.',
  'Chart-specific substrate verification must remain distinct from settlement outcome resolution and from support activation/persistence.',
  'Do not emit force magnitude, usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview(): ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReviewReport {
  const material = {
    reviewVersion:
      I59_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_METHODOLOGY_REVIEW_VERSION,
    decision:
      'EXACT_IDENTITY_CHART_SUBSTRATE_VERIFICATION_ROUTING_AUTHORIZED_SETTLEMENT_OUTCOME_BLOCKED' as const,
    exactIdentityChartSubstrateVerificationRoutingAuthorized: true as const,
    methodologyApplicabilityAloneSufficientForChartVerification: false as const,
    i33ArbitrarySupportSourceReuseAuthorized: false as const,
    i35ArbitraryCompetingRelationReuseAuthorized: false as const,
    i47BureauStateToSupportSourceOutcomeAuthorized: false as const,
    multiTouchPairReconstructionAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    settlementOutcomeResolutionAuthorized: false as const,
    supportChannelActivationVerdictAuthorized: false as const,
    supportChannelPersistenceVerdictAuthorized: false as const,
    supportChannelNeutralizationVerdictAuthorized: false as const,
    supportChannelDestructionVerdictAuthorized: false as const,
    supportChannelNetEffectVerdictAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    requirements: REQUIREMENTS,
    authorityBasis: AUTHORITY_BASIS,
    requiredNextImplementationGuards: NEXT_GUARDS,
    notes: [
      'I59 defines identity-safe verification routes over already-closed evidence and creates no new settlement rule.',
      'A chart-specific substrate flag may become true only after an adapter validates the exact authority-domain and identity chain required for that dependency.',
      'Chart-specific substrate availability is still below settlement outcome, support activation/persistence, net support effect, post-relation root state, and effective force.',
      'The narrow I47 break state remains a formed-bureau context fact, not a generic support-source destruction fact.',
      'Multi-touch dispatch and competing-relation settlement remain blocked by missing id-kind pairing and missing precedence authority respectively.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_current_chart_settlement_substrate_verification_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
