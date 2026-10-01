import {
  R072_AUTHORITY,
  R072_DAYUN_NATAL_INTERACTION_VERSION,
  R072_EXECUTION_GAPS,
  R072_INTERACTION_CLASSES,
} from './general-natal-dayun-natal-interaction.js';
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
  R161_AUTHORITY,
  R161_NATAL_LUCK_MEETING_SOURCE_REPLAY_VERSION,
} from './general-natal-luck-meeting-source-replay-boundary.js';

export const R162_DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE_CLASS_REPLAY_VERSION =
  '0.1.0-research' as const;

export type R162RelationMode = 'MEETING_ASSERTED' | 'CLASH_ASSERTED';

export type R162ReplayPredicateId =
  | 'R072_PARAPHRASED_STRUCTURAL_CHANGE_CLASS_BOUND'
  | 'DAYUN_TEMPORAL_CONTEXT_ASSERTED'
  | 'NATAL_STRUCTURE_CONTEXT_ASSERTED'
  | 'RELATION_MODE_ASSERTED_AS_MEETING_OR_CLASH'
  | 'STRUCTURAL_CHANGE_LANGUAGE_PRESERVED';

export type R162RemovalOutcome =
  | 'PARAPHRASED_CLASS_NOT_BOUND'
  | 'DAYUN_CONTEXT_NOT_ASSERTED'
  | 'NATAL_STRUCTURE_CONTEXT_NOT_ASSERTED'
  | 'RELATION_MODE_NOT_ASSERTED'
  | 'STRUCTURAL_CHANGE_LANGUAGE_NOT_PRESERVED';

export interface R162ReplayPredicate {
  predicateId: R162ReplayPredicateId;
  meaning: string;
  sourceRefs: readonly string[];
  requiredForClassReplay: true;
  removalBlocksClassReplay: true;
  removalOutcome: R162RemovalOutcome;
  directQuoteAuthorityEstablished: false;
  interactionMatcherEstablished: false;
  semanticNecessityEstablished: false;
  changeSufficiencyEstablished: false;
  automaticStructuralChangeAuthorized: false;
  productionAuthorityPromoted: false;
}

const predicate = (
  value: Omit<
    R162ReplayPredicate,
    | 'requiredForClassReplay'
    | 'removalBlocksClassReplay'
    | 'directQuoteAuthorityEstablished'
    | 'interactionMatcherEstablished'
    | 'semanticNecessityEstablished'
    | 'changeSufficiencyEstablished'
    | 'automaticStructuralChangeAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R162ReplayPredicate =>
  Object.freeze({
    ...value,
    requiredForClassReplay: true,
    removalBlocksClassReplay: true,
    directQuoteAuthorityEstablished: false,
    interactionMatcherEstablished: false,
    semanticNecessityEstablished: false,
    changeSufficiencyEstablished: false,
    automaticStructuralChangeAuthorized: false,
    productionAuthorityPromoted: false,
  });

const r072StructuralChange = R072_INTERACTION_CLASSES.find(
  (item) => item.interaction === 'STRUCTURAL_CHANGE',
);
const r157StructuralChange = R157_TRIGGER_ROWS.find(
  (item) => item.triggerClass === 'DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE',
);
const r159StructuralChange = R159_TRIGGER_SUFFICIENCY_ROWS.find(
  (item) => item.triggerClass === 'DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE',
);

if (
  r072StructuralChange === undefined ||
  r157StructuralChange === undefined ||
  r159StructuralChange === undefined
) {
  throw new Error('R162 missing structural-change upstream fixture');
}

export const R162_CLASS_FIXTURE = Object.freeze({
  fixtureId: 'R162-R072-DAYUN-MEETING-CLASH-STRUCTURAL-CHANGE',
  upstreamKey: r072StructuralChange.id,
  sourceRepresentation: r072StructuralChange.sourceRepresentation,
  provenanceKind: r072StructuralChange.provenanceKind,
  paraphrasedSourceClassBound:
    r072StructuralChange.provenanceKind === 'PARAPHRASED_SOURCE_CLASS',
  directQuoteAuthorityEstablished: false as const,
  interactionMatchingDerivedByR162: false as const,
  changeSufficiencyDerivedByR162: false as const,
  automaticStructuralChangeAuthorized: false as const,
  permanentNatalMutationAuthorized: false as const,
  fixedPolarityAuthorized: false as const,
  deterministicEventAuthorized: false as const,
  productionAuthorityPromoted: false as const,
});

export const R162_RELATION_VARIANTS = Object.freeze([
  Object.freeze({
    variantId: 'R162-V01-MEETING',
    relationMode: 'MEETING_ASSERTED' as const,
    relationAssertionObserved: true as const,
    relationDerivedByR162: false as const,
    classReplayEligible: true as const,
    structuralChangeOutcomeEstablished: false as const,
  }),
  Object.freeze({
    variantId: 'R162-V02-CLASH',
    relationMode: 'CLASH_ASSERTED' as const,
    relationAssertionObserved: true as const,
    relationDerivedByR162: false as const,
    classReplayEligible: true as const,
    structuralChangeOutcomeEstablished: false as const,
  }),
]);

export const R162_REPLAY_PREDICATES: readonly R162ReplayPredicate[] =
  Object.freeze([
    predicate({
      predicateId: 'R072_PARAPHRASED_STRUCTURAL_CHANGE_CLASS_BOUND',
      meaning:
        'The replay is explicitly bound to the R072 paraphrased source class and is not relabeled as a direct quote.',
      sourceRefs: ['R072:LUCK-MEETING-CLASH-STRUCTURAL-CHANGE'],
      removalOutcome: 'PARAPHRASED_CLASS_NOT_BOUND',
    }),
    predicate({
      predicateId: 'DAYUN_TEMPORAL_CONTEXT_ASSERTED',
      meaning:
        'A Dayun temporal context is asserted for class replay; R162 does not derive the applicable temporal window.',
      sourceRefs: ['R072:LUCK-MEETING-CLASH-STRUCTURAL-CHANGE'],
      removalOutcome: 'DAYUN_CONTEXT_NOT_ASSERTED',
    }),
    predicate({
      predicateId: 'NATAL_STRUCTURE_CONTEXT_ASSERTED',
      meaning:
        'A natal structure context is asserted because the replayed class concerns 格局 change; R162 does not resolve natal pattern state.',
      sourceRefs: [
        'R072:NATAL_PATTERN_STATE',
        'R159:DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE',
      ],
      removalOutcome: 'NATAL_STRUCTURE_CONTEXT_NOT_ASSERTED',
    }),
    predicate({
      predicateId: 'RELATION_MODE_ASSERTED_AS_MEETING_OR_CLASH',
      meaning:
        'Exactly one replay mode is asserted as meeting or clash. The relation is not matched or derived by R162.',
      sourceRefs: [
        'R072:LUCK-MEETING-CLASH-STRUCTURAL-CHANGE',
        'R157:DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE',
      ],
      removalOutcome: 'RELATION_MODE_NOT_ASSERTED',
    }),
    predicate({
      predicateId: 'STRUCTURAL_CHANGE_LANGUAGE_PRESERVED',
      meaning:
        'The paraphrased possibility of structural change is retained as class language only and not emitted as a settled mutation.',
      sourceRefs: [
        'R072:LUCK-MEETING-CLASH-STRUCTURAL-CHANGE',
        'R157:DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE',
      ],
      removalOutcome: 'STRUCTURAL_CHANGE_LANGUAGE_NOT_PRESERVED',
    }),
  ]);

export interface R162RemovalVariant {
  variantId: string;
  relationMode: R162RelationMode;
  removedPredicateId: R162ReplayPredicateId;
  retainedPredicateIds: readonly R162ReplayPredicateId[];
  removalOutcome: R162RemovalOutcome;
  classReplayEligible: false;
  directQuoteAuthorityEstablished: false;
  interactionMatcherEstablished: false;
  semanticOppositeEstablished: false;
  changeSufficiencyEstablished: false;
  structuralChangeOutcomeEstablished: false;
  productionAuthorityPromoted: false;
}

export const R162_REMOVAL_VARIANTS: readonly R162RemovalVariant[] =
  Object.freeze(
    R162_RELATION_VARIANTS.flatMap((variant, variantIndex) =>
      R162_REPLAY_PREDICATES.map((removed, predicateIndex) =>
        Object.freeze({
          variantId:
            'R162-RM-' +
            String(variantIndex + 1).padStart(2, '0') +
            '-' +
            String(predicateIndex + 1).padStart(2, '0'),
          relationMode: variant.relationMode,
          removedPredicateId: removed.predicateId,
          retainedPredicateIds: Object.freeze(
            R162_REPLAY_PREDICATES.filter(
              (item) => item.predicateId !== removed.predicateId,
            ).map((item) => item.predicateId),
          ),
          removalOutcome: removed.removalOutcome,
          classReplayEligible: false as const,
          directQuoteAuthorityEstablished: false as const,
          interactionMatcherEstablished: false as const,
          semanticOppositeEstablished: false as const,
          changeSufficiencyEstablished: false as const,
          structuralChangeOutcomeEstablished: false as const,
          productionAuthorityPromoted: false as const,
        }),
      ),
    ),
  );

export const R162_CLASS_REPLAY_CONTRACT = Object.freeze({
  contractId: 'R072_DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE_CLASS_REPLAY',
  relationVariantCount: R162_RELATION_VARIANTS.length,
  requiredPredicateIds: Object.freeze(
    R162_REPLAY_PREDICATES.map((item) => item.predicateId),
  ),
  paraphrasedSourceClassReplayEstablished: true as const,
  directQuoteAuthorityEstablished: false as const,
  interactionMatcherEstablished: false as const,
  relationSufficiencyEstablished: false as const,
  changeSufficiencyEstablished: false as const,
  settledStructuralMutationAuthorized: false as const,
  permanentNatalMutationAuthorized: false as const,
  fixedPolarityAuthorized: false as const,
  deterministicEventAuthorized: false as const,
  executableStructuralChangeResolverAuthorized: false as const,
  interpretationClaimEmissionAuthorized: false as const,
  productionAuthorityPromoted: false as const,
});

export interface R162GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R072' | 'R157' | 'R159' | 'R161';
  boundary: string;
  satisfied: boolean;
  interactionMatcherAuthorized: false;
  structuralChangeResolverAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R162GovernanceGuard,
    | 'interactionMatcherAuthorized'
    | 'structuralChangeResolverAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R162GovernanceGuard =>
  Object.freeze({
    ...value,
    interactionMatcherAuthorized: false,
    structuralChangeResolverAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R162_GOVERNANCE_GUARDS: readonly R162GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R162-GUARD-R072',
      upstreamAsset: 'R072',
      boundary:
        'Natal pattern state, luck-to-natal matching, change sufficiency, and temporal effect settlement remain unresolved.',
      satisfied:
        R072_EXECUTION_GAPS.includes('NATAL_PATTERN_STATE') &&
        R072_EXECUTION_GAPS.includes('LUCK_TO_NATAL_INTERACTION_MATCHING') &&
        R072_EXECUTION_GAPS.includes('CHANGE_SUFFICIENCY') &&
        R072_EXECUTION_GAPS.includes('TEMPORAL_EFFECT_SETTLEMENT') &&
        !R072_AUTHORITY.executableDayunInteractionResolverAuthorized,
    }),
    guard({
      guardId: 'R162-GUARD-R157',
      upstreamAsset: 'R157',
      boundary:
        'The structural-change trigger class remains observed without an authorized trigger predicate, automatic change, or executable resolver.',
      satisfied:
        R157_AUTHORITY.dayunMeetingClashStructuralChangeClassObserved &&
        R157_AUTHORITY.matchingGapsPreserved &&
        !R157_AUTHORITY.triggerPredicateAuthorized &&
        !R157_AUTHORITY.automaticStructuralChangeAuthorized &&
        !R157_AUTHORITY.executableTriggerResolverAuthorized,
    }),
    guard({
      guardId: 'R162-GUARD-R159',
      upstreamAsset: 'R159',
      boundary:
        'The structural-change row has no exact minimal predicate set, matching sufficiency, or outcome sufficiency.',
      satisfied:
        !r159StructuralChange.exactMinimalPredicateSetEstablished &&
        !r159StructuralChange.matchingSufficiencyEstablished &&
        !r159StructuralChange.boundedOutcomeSufficiencyEstablished &&
        !R159_AUTHORITY.boundedTemporalTriggerOutcomeSufficiencyEstablished,
    }),
    guard({
      guardId: 'R162-GUARD-R161',
      upstreamAsset: 'R161',
      boundary:
        'Meeting assertion remains distinct from a meeting matcher and source replay remains distinct from activation sufficiency.',
      satisfied:
        R161_AUTHORITY.sourceReplayDistinctFromMeetingMatchingObserved &&
        R161_AUTHORITY.sourceReplayDistinctFromActivationSufficiencyObserved &&
        !R161_AUTHORITY.branchMeetingMatcherEstablished &&
        !R161_AUTHORITY.exactTemporalActivationSufficiencyEstablished,
    }),
  ]);

export const R162_REJECTED_SHORTCUTS = Object.freeze([
  'PARAPHRASED_SOURCE_CLASS_EQUALS_DIRECT_QUOTE',
  'MEETING_ASSERTION_EQUALS_INTERACTION_MATCH',
  'CLASH_ASSERTION_EQUALS_INTERACTION_MATCH',
  'ASSERTED_RELATION_EQUALS_CHANGE_SUFFICIENCY',
  'MEETING_ALWAYS_CHANGES_PATTERN',
  'CLASH_ALWAYS_CHANGES_PATTERN',
  'STRUCTURAL_CHANGE_LANGUAGE_EQUALS_SETTLED_PATTERN_MUTATION',
  'STRUCTURAL_CHANGE_EQUALS_PERMANENT_NATAL_MUTATION',
  'STRUCTURAL_CHANGE_EQUALS_FIXED_POLARITY',
  'STRUCTURAL_CHANGE_EQUALS_DETERMINISTIC_EVENT',
  'RELATION_VARIANT_COUNT_AS_SEVERITY',
  'NUMERIC_SCORE_TO_FILL_CHANGE_SUFFICIENCY',
  'CLASS_REPLAY_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R162_SUMMARY = Object.freeze({
  relationVariantCount: R162_RELATION_VARIANTS.length,
  replayPredicateCount: R162_REPLAY_PREDICATES.length,
  removalVariantCount: R162_REMOVAL_VARIANTS.length,
  directQuoteAuthorityEstablishedPredicateCount:
    R162_REPLAY_PREDICATES.filter(
      (item) => item.directQuoteAuthorityEstablished,
    ).length,
  interactionMatcherEstablishedPredicateCount:
    R162_REPLAY_PREDICATES.filter(
      (item) => item.interactionMatcherEstablished,
    ).length,
  changeSufficiencyEstablishedPredicateCount:
    R162_REPLAY_PREDICATES.filter(
      (item) => item.changeSufficiencyEstablished,
    ).length,
  structuralChangeOutcomeEstablishedVariantCount:
    R162_RELATION_VARIANTS.filter(
      (item) => item.structuralChangeOutcomeEstablished,
    ).length,
  governanceGuardCount: R162_GOVERNANCE_GUARDS.length,
});

export const R162_UPSTREAM_BINDINGS = Object.freeze({
  r072: {
    version: R072_DAYUN_NATAL_INTERACTION_VERSION,
    upstreamKey: r072StructuralChange.id,
    sourceRepresentation: r072StructuralChange.sourceRepresentation,
    provenanceKind: r072StructuralChange.provenanceKind,
    natalPatternStateGap: R072_EXECUTION_GAPS.includes('NATAL_PATTERN_STATE'),
    interactionMatchingGap:
      R072_EXECUTION_GAPS.includes('LUCK_TO_NATAL_INTERACTION_MATCHING'),
    changeSufficiencyGap:
      R072_EXECUTION_GAPS.includes('CHANGE_SUFFICIENCY'),
  },
  r157: {
    version: R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
    triggerSignalObserved: r157StructuralChange.triggerSignalObserved,
    triggerPredicateAuthorized: R157_AUTHORITY.triggerPredicateAuthorized,
    automaticStructuralChangeAuthorized:
      R157_AUTHORITY.automaticStructuralChangeAuthorized,
  },
  r159: {
    version: R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION,
    exactMinimalPredicateSetEstablished:
      r159StructuralChange.exactMinimalPredicateSetEstablished,
    matchingSufficiencyEstablished:
      r159StructuralChange.matchingSufficiencyEstablished,
    boundedOutcomeSufficiencyEstablished:
      r159StructuralChange.boundedOutcomeSufficiencyEstablished,
  },
  r161: {
    version: R161_NATAL_LUCK_MEETING_SOURCE_REPLAY_VERSION,
    sourceReplayDistinctFromMeetingMatchingObserved:
      R161_AUTHORITY.sourceReplayDistinctFromMeetingMatchingObserved,
    branchMeetingMatcherEstablished:
      R161_AUTHORITY.branchMeetingMatcherEstablished,
  },
});

export const R162_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_DAYUN_MEETING_CLASH_STRUCTURAL_CHANGE_CLASS_REPLAY_BOUNDARY_COMPLETE' as const,
  researchOnly: true,
  paraphrasedStructuralChangeClassBound: true,
  meetingReplayVariantEstablished: true,
  clashReplayVariantEstablished: true,
  replayPredicateSetEstablished: true,
  replayRemovalAuditEstablished: true,
  paraphraseDistinctFromDirectQuoteObserved: true,
  relationAssertionDistinctFromInteractionMatchingObserved: true,
  interactionMatchingDistinctFromChangeSufficiencyObserved: true,
  classReplayDistinctFromSettledMutationObserved: true,
  directQuoteAuthorityEstablished: false,
  interactionMatcherEstablished: false,
  relationSufficiencyEstablished: false,
  changeSufficiencyEstablished: false,
  automaticStructuralChangeAuthorized: false,
  settledStructuralMutationAuthorized: false,
  permanentNatalMutationAuthorized: false,
  fixedPolarityAuthorized: false,
  deterministicEventAuthorized: false,
  executableStructuralChangeResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
