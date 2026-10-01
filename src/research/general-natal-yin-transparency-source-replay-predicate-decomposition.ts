import {
  R060_AUTHORITY,
  R060_HIDDEN_STEM_INTERACTION_VERSION,
} from './general-natal-hidden-stem-interaction-boundary.js';
import {
  R073_AUTHORITY,
  R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
} from './general-natal-temporal-latent-activation.js';
import {
  R146_ACTIVATION_PROVENANCE_CASES,
  R146_AUTHORITY,
  R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION,
} from './general-natal-hidden-stem-activation-provenance-interaction-event-corpus.js';
import {
  R157_AUTHORITY,
  R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
  R157_TRIGGER_ROWS,
} from './general-natal-temporal-trigger-matching-provenance-boundary-corpus.js';
import {
  R159_AUTHORITY,
  R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION,
  R159_TRIGGER_SUFFICIENCY_ROWS,
} from './general-natal-temporal-trigger-sufficiency-fail-closed-audit.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
  buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview,
} from './general-natal-geju-month-order-hidden-stem-selection-admission-review.js';

export const R160_YIN_TRANSPARENCY_SOURCE_REPLAY_PREDICATE_VERSION =
  '0.1.0-research' as const;

export type R160ReplayPredicateId =
  | 'EXACT_YIN_MONTH_CONTEXT'
  | 'YIN_PRIMARY_JIA_ROLE_BOUND'
  | 'PRIMARY_JIA_NOT_TRANSPARENT'
  | 'BING_TRANSPARENT'
  | 'DIRECT_YIN_SUBSTITUTION_EVIDENCE_BOUND';

export type R160ReplayRemovalOutcome =
  | 'SOURCE_SCOPE_NO_LONGER_EXACT_YIN'
  | 'PRIMARY_ROLE_CONTEXT_NOT_BOUND'
  | 'SOURCE_ANTECEDENT_JIA_NON_TRANSPARENCY_MISSING'
  | 'SOURCE_ANTECEDENT_BING_TRANSPARENCY_MISSING'
  | 'DIRECT_SUBSTITUTION_PASSAGE_NOT_BOUND';

export interface R160ReplayPredicate {
  predicateId: R160ReplayPredicateId;
  meaning: string;
  sourceRefs: readonly string[];
  requiredForExactSourceReplay: true;
  removalBlocksExactSourceReplay: true;
  removalOutcome: R160ReplayRemovalOutcome;
  semanticNecessityEstablished: false;
  activationSufficiencyEstablished: false;
  generalizedSelectionPredicateAuthorized: false;
  runtimeActivationFactAuthorized: false;
  productionAuthorityPromoted: false;
}

const predicate = (
  value: Omit<
    R160ReplayPredicate,
    | 'requiredForExactSourceReplay'
    | 'removalBlocksExactSourceReplay'
    | 'semanticNecessityEstablished'
    | 'activationSufficiencyEstablished'
    | 'generalizedSelectionPredicateAuthorized'
    | 'runtimeActivationFactAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R160ReplayPredicate =>
  Object.freeze({
    ...value,
    requiredForExactSourceReplay: true,
    removalBlocksExactSourceReplay: true,
    semanticNecessityEstablished: false,
    activationSufficiencyEstablished: false,
    generalizedSelectionPredicateAuthorized: false,
    runtimeActivationFactAuthorized: false,
    productionAuthorityPromoted: false,
  });

const gejuReview =
  buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview();

const r146Transparency = R146_ACTIVATION_PROVENANCE_CASES.find(
  (item) =>
    item.family === 'R073_TEMPORAL_STATE_REPLAY' &&
    item.upstreamKey === 'ACTIVATED_BY_TRANSPARENCY',
);
const r157Transparency = R157_TRIGGER_ROWS.find(
  (item) => item.triggerClass === 'TRANSPARENCY_ACTIVATION',
);
const r159Transparency = R159_TRIGGER_SUFFICIENCY_ROWS.find(
  (item) => item.triggerClass === 'TRANSPARENCY_ACTIVATION',
);

if (
  r146Transparency === undefined ||
  r157Transparency === undefined ||
  r159Transparency === undefined
) {
  throw new Error('R160 missing transparency upstream fixture');
}

export const R160_EXACT_YIN_SOURCE_FIXTURE = Object.freeze({
  fixtureId: 'R160-EXACT-YIN-TRANSPARENCY-SUBSTITUTION',
  monthBranch: '寅' as const,
  sourcePrimaryStem: '甲' as const,
  sourcePrimaryRole: '本主' as const,
  sourcePrimaryTransparent: false as const,
  sourceSubstituteStem: '丙' as const,
  sourceSubstituteTransparent: true as const,
  boundedSourceObservation:
    '丙_MAY_作主_WHEN_寅_MONTH_甲_NOT_TRANSPARENT_AND_丙_TRANSPARENT' as const,
  sourceScopeExactYinOnly: true as const,
  runtimeActivationFactAuthorized: false as const,
  perMemberActivationResolverAuthorized: false as const,
  generalizedMonthBranchSelectorAuthorized: false as const,
  establishmentFactEmissionAuthorized: false as const,
  productionAuthorityPromoted: false as const,
});

export const R160_REPLAY_PREDICATES: readonly R160ReplayPredicate[] =
  Object.freeze([
    predicate({
      predicateId: 'EXACT_YIN_MONTH_CONTEXT',
      meaning:
        'The replay remains scoped to the direct-source 寅 month example and is not extrapolated to the other eleven month branches.',
      sourceRefs: [
        'GEJU_HIDDEN_STEM:direct_yin_primary_role',
        'GEJU_HIDDEN_STEM:direct_yin_transparency_substitution',
      ],
      removalOutcome: 'SOURCE_SCOPE_NO_LONGER_EXACT_YIN',
    }),
    predicate({
      predicateId: 'YIN_PRIMARY_JIA_ROLE_BOUND',
      meaning:
        'The exact 寅 discussion binds 甲 as 本主 before the transparency-substitution antecedent is replayed.',
      sourceRefs: ['GEJU_HIDDEN_STEM:direct_yin_primary_role'],
      removalOutcome: 'PRIMARY_ROLE_CONTEXT_NOT_BOUND',
    }),
    predicate({
      predicateId: 'PRIMARY_JIA_NOT_TRANSPARENT',
      meaning:
        'The direct source antecedent explicitly states that 甲 is not transparent in the replayed substitution case.',
      sourceRefs: ['GEJU_HIDDEN_STEM:direct_yin_transparency_substitution'],
      removalOutcome: 'SOURCE_ANTECEDENT_JIA_NON_TRANSPARENCY_MISSING',
    }),
    predicate({
      predicateId: 'BING_TRANSPARENT',
      meaning:
        'The direct source antecedent explicitly states that 丙 is transparent in the replayed substitution case.',
      sourceRefs: ['GEJU_HIDDEN_STEM:direct_yin_transparency_substitution'],
      removalOutcome: 'SOURCE_ANTECEDENT_BING_TRANSPARENCY_MISSING',
    }),
    predicate({
      predicateId: 'DIRECT_YIN_SUBSTITUTION_EVIDENCE_BOUND',
      meaning:
        'The replay is tied to the governed direct source passage that permits 丙 to 作主 in this exact antecedent configuration.',
      sourceRefs: [
        'SRC-GEJU-ZIPING-PINGZHU-YIN-MONTH-TRANSPARENCY-SUBSTITUTION',
      ],
      removalOutcome: 'DIRECT_SUBSTITUTION_PASSAGE_NOT_BOUND',
    }),
  ]);

export interface R160RemovalVariant {
  variantId: string;
  removedPredicateId: R160ReplayPredicateId;
  retainedPredicateIds: readonly R160ReplayPredicateId[];
  removalOutcome: R160ReplayRemovalOutcome;
  exactSourceReplayEligible: false;
  sourceObservationNegated: false;
  semanticOppositeEstablished: false;
  activationSufficiencyEstablished: false;
  runtimeActivationFactAuthorized: false;
  productionAuthorityPromoted: false;
}

export const R160_REMOVAL_VARIANTS: readonly R160RemovalVariant[] =
  Object.freeze(
    R160_REPLAY_PREDICATES.map((removed, index) =>
      Object.freeze({
        variantId: 'R160-RM-' + String(index + 1).padStart(2, '0'),
        removedPredicateId: removed.predicateId,
        retainedPredicateIds: Object.freeze(
          R160_REPLAY_PREDICATES.filter(
            (item) => item.predicateId !== removed.predicateId,
          ).map((item) => item.predicateId),
        ),
        removalOutcome: removed.removalOutcome,
        exactSourceReplayEligible: false as const,
        sourceObservationNegated: false as const,
        semanticOppositeEstablished: false as const,
        activationSufficiencyEstablished: false as const,
        runtimeActivationFactAuthorized: false as const,
        productionAuthorityPromoted: false as const,
      }),
    ),
  );

export const R160_EXACT_SOURCE_REPLAY_CONTRACT = Object.freeze({
  contractId: 'EXACT_YIN_TRANSPARENCY_SUBSTITUTION_SOURCE_REPLAY',
  requiredPredicateIds: Object.freeze(
    R160_REPLAY_PREDICATES.map((item) => item.predicateId),
  ),
  exactSourceReplayEligible: true as const,
  boundedRoleSubstitutionObservationPreserved:
    gejuReview.directSourceYinExactTransparencySubstitutionObserved &&
    r146Transparency.boundedRoleSubstitutionObserved,
  sourceActivationLanguageObserved:
    r146Transparency.sourceActivationLanguageObserved &&
    r157Transparency.triggerSignalObserved,
  semanticNecessityEstablished: false as const,
  temporalActivationSufficiencyEstablished: false as const,
  generalizedTransparencyPredicateEstablished: false as const,
  generalizedSelectionPredicateAuthorized: false as const,
  runtimeActivationFactAuthorized: false as const,
  activationPersistenceVerdictAuthorized: false as const,
  effectiveForceAuthorized: false as const,
  fixedPolarityAuthorized: false as const,
  deterministicEventAuthorized: false as const,
  interpretationClaimEmissionAuthorized: false as const,
  productionAuthorityPromoted: false as const,
});

export interface R160GovernanceGuard {
  guardId: string;
  upstreamAsset: 'GEJU_HIDDEN_STEM' | 'R060' | 'R073' | 'R146' | 'R157' | 'R159';
  boundary: string;
  satisfied: boolean;
  generalizedTransparencyActivationAuthorized: false;
  executableActivationResolverAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R160GovernanceGuard,
    | 'generalizedTransparencyActivationAuthorized'
    | 'executableActivationResolverAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R160GovernanceGuard =>
  Object.freeze({
    ...value,
    generalizedTransparencyActivationAuthorized: false,
    executableActivationResolverAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R160_GOVERNANCE_GUARDS: readonly R160GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R160-GUARD-GEJU',
      upstreamAsset: 'GEJU_HIDDEN_STEM',
      boundary:
        'Exact 寅 primary/substitution evidence is admitted while all-branch mapping, generalized selection, candidate derivation, and establishment remain unauthorized.',
      satisfied:
        gejuReview.directSourceYinExactPrimaryRoleObserved &&
        gejuReview.directSourceYinExactTransparencySubstitutionObserved &&
        gejuReview.directSourceYinRoleGeneralizedBeyondYin === false &&
        gejuReview.generalizedMonthOrderHiddenStemSelectionPredicateAuthorized ===
          false &&
        gejuReview.transparencySelectionPredicateAuthorized === false &&
        gejuReview.candidateDerivationAuthorized === false &&
        gejuReview.establishmentPredicateAuthorized === false,
    }),
    guard({
      guardId: 'R160-GUARD-R060',
      upstreamAsset: 'R060',
      boundary:
        'Hidden membership and manifestation remain distinct; generic interaction activation and executable resolution remain unauthorized.',
      satisfied:
        R060_AUTHORITY.hiddenMembershipDistinctFromManifestation &&
        !R060_AUTHORITY.genericInteractionActivationAuthorized &&
        !R060_AUTHORITY.executableResolverAuthorized,
    }),
    guard({
      guardId: 'R160-GUARD-R073',
      upstreamAsset: 'R073',
      boundary:
        'Transparency remains an observed temporal state class without concrete event or executable timing authority.',
      satisfied:
        !R073_AUTHORITY.activationImpliesPermanentNatalChange &&
        !R073_AUTHORITY.activationImpliesConcreteEvent &&
        !R073_AUTHORITY.executableTimingResolverAuthorized,
    }),
    guard({
      guardId: 'R160-GUARD-R146',
      upstreamAsset: 'R146',
      boundary:
        'Bounded role substitution is distinct from runtime activation, per-member activation, persistence, force, and generalized reassignment.',
      satisfied:
        R146_AUTHORITY.boundedRoleSubstitutionDistinctFromGeneralizedReassignmentObserved &&
        !R146_AUTHORITY.runtimeActivationFactAuthorized &&
        !R146_AUTHORITY.perMemberActivationResolverAuthorized &&
        !R146_AUTHORITY.activationPersistenceVerdictAuthorized &&
        !R146_AUTHORITY.effectiveForceAuthorized &&
        !R146_AUTHORITY.generalizedRoleReassignmentAuthorized,
    }),
    guard({
      guardId: 'R160-GUARD-R157',
      upstreamAsset: 'R157',
      boundary:
        'Transparency trigger class observation remains distinct from an authorized trigger predicate or executable resolver.',
      satisfied:
        R157_AUTHORITY.transparencyActivationClassObserved &&
        R157_AUTHORITY.matchingGapsPreserved &&
        !R157_AUTHORITY.triggerPredicateAuthorized &&
        !R157_AUTHORITY.executableTriggerResolverAuthorized,
    }),
    guard({
      guardId: 'R160-GUARD-R159',
      upstreamAsset: 'R159',
      boundary:
        'Source replay decomposition does not close the temporal trigger sufficiency gap established by R159.',
      satisfied:
        R159_AUTHORITY.temporalTriggerSufficiencyGapPreserved &&
        !R159_AUTHORITY.exactTemporalTriggerMinimalPredicateSetEstablished &&
        !R159_AUTHORITY.boundedTemporalTriggerOutcomeSufficiencyEstablished &&
        !r159Transparency.exactMinimalPredicateSetEstablished &&
        !r159Transparency.boundedOutcomeSufficiencyEstablished,
    }),
  ]);

export const R160_REJECTED_SHORTCUTS = Object.freeze([
  'EXACT_SOURCE_REPLAY_GATES_EQUAL_SEMANTIC_NECESSITY',
  'EXACT_SOURCE_REPLAY_ELIGIBLE_EQUALS_RUNTIME_ACTIVATION',
  'YIN_CASE_GENERALIZES_TO_ALL_MONTH_BRANCHES',
  'JIA_NON_TRANSPARENCY_AND_BING_TRANSPARENCY_IS_UNIVERSAL_SELECTOR',
  'BOUNDED_ROLE_SUBSTITUTION_EQUALS_PER_MEMBER_ACTIVATION',
  'BOUNDED_ROLE_SUBSTITUTION_EQUALS_ESTABLISHMENT',
  'SOURCE_REPLAY_COMPLETENESS_EQUALS_TEMPORAL_TRIGGER_SUFFICIENCY',
  'REMOVAL_FROM_REPLAY_PROVES_OPPOSITE_ASTROLOGICAL_OUTCOME',
  'TRANSPARENCY_IMPLIES_FIXED_EFFECTIVE_FORCE',
  'TRANSPARENCY_IMPLIES_FIXED_POLARITY',
  'TRANSPARENCY_IMPLIES_DETERMINISTIC_EVENT',
  'SOURCE_REPLAY_PREDICATES_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R160_SUMMARY = Object.freeze({
  replayPredicateCount: R160_REPLAY_PREDICATES.length,
  removalVariantCount: R160_REMOVAL_VARIANTS.length,
  removalBlocksExactSourceReplayCount: R160_REMOVAL_VARIANTS.filter(
    (item) => !item.exactSourceReplayEligible,
  ).length,
  semanticNecessityEstablishedPredicateCount: R160_REPLAY_PREDICATES.filter(
    (item) => item.semanticNecessityEstablished,
  ).length,
  activationSufficiencyEstablishedPredicateCount: R160_REPLAY_PREDICATES.filter(
    (item) => item.activationSufficiencyEstablished,
  ).length,
  runtimeActivationAuthorizedPredicateCount: R160_REPLAY_PREDICATES.filter(
    (item) => item.runtimeActivationFactAuthorized,
  ).length,
  governanceGuardCount: R160_GOVERNANCE_GUARDS.length,
});

export const R160_UPSTREAM_BINDINGS = Object.freeze({
  gejuHiddenStem: {
    version:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
    directSourceYinExactPrimaryRoleObserved:
      gejuReview.directSourceYinExactPrimaryRoleObserved,
    directSourceYinExactTransparencySubstitutionObserved:
      gejuReview.directSourceYinExactTransparencySubstitutionObserved,
    transparencySelectionPredicateAuthorized:
      gejuReview.transparencySelectionPredicateAuthorized,
    generalizedMonthOrderHiddenStemSelectionPredicateAuthorized:
      gejuReview.generalizedMonthOrderHiddenStemSelectionPredicateAuthorized,
  },
  r060: {
    version: R060_HIDDEN_STEM_INTERACTION_VERSION,
    hiddenMembershipDistinctFromManifestation:
      R060_AUTHORITY.hiddenMembershipDistinctFromManifestation,
    genericInteractionActivationAuthorized:
      R060_AUTHORITY.genericInteractionActivationAuthorized,
  },
  r073: {
    version: R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
    activationImpliesConcreteEvent: R073_AUTHORITY.activationImpliesConcreteEvent,
  },
  r146: {
    version: R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION,
    boundedRoleSubstitutionObserved:
      r146Transparency.boundedRoleSubstitutionObserved,
    runtimeActivationFactAuthorized:
      R146_AUTHORITY.runtimeActivationFactAuthorized,
  },
  r157: {
    version: R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
    transparencyActivationClassObserved:
      R157_AUTHORITY.transparencyActivationClassObserved,
    triggerPredicateAuthorized: R157_AUTHORITY.triggerPredicateAuthorized,
  },
  r159: {
    version: R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION,
    temporalTriggerSufficiencyGapPreserved:
      R159_AUTHORITY.temporalTriggerSufficiencyGapPreserved,
    exactTemporalTriggerMinimalPredicateSetEstablished:
      R159_AUTHORITY.exactTemporalTriggerMinimalPredicateSetEstablished,
  },
});

export const R160_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_EXACT_YIN_TRANSPARENCY_SOURCE_REPLAY_PREDICATE_DECOMPOSITION_COMPLETE' as const,
  researchOnly: true,
  exactYinSourceFixtureBound: true,
  exactYinSourceReplayPredicateSetEstablished: true,
  exactSourceReplayGateRemovalAuditEstablished: true,
  boundedRoleSubstitutionObservationPreserved: true,
  sourceReplayDistinctFromSemanticNecessityObserved: true,
  sourceReplayDistinctFromActivationSufficiencyObserved: true,
  sourceReplayDistinctFromRuntimeActivationObserved: true,
  semanticPredicateNecessityEstablished: false,
  exactTemporalActivationSufficiencyEstablished: false,
  generalizedTransparencyActivationPredicateEstablished: false,
  generalizedMonthBranchSelectorAuthorized: false,
  runtimeActivationFactAuthorized: false,
  perMemberActivationResolverAuthorized: false,
  activationPersistenceVerdictAuthorized: false,
  effectiveForceAuthorized: false,
  fixedPolarityAuthorized: false,
  deterministicEventAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
