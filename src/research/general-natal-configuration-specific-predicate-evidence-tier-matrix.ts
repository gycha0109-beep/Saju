import {
  R076_AUTHORITY,
  R076_CASES,
  R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
} from './general-natal-luck-pattern-break-recovery.js';
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
  R163_AUTHORITY,
  R163_BREAK_RESCUE_PAIRED_CASE_DELTA_VERSION,
  R163_PAIRED_CASES,
  R163_PAIRED_TEXTUAL_DELTA,
} from './general-natal-break-rescue-paired-source-case-delta.js';
import {
  R164_AUTHORITY,
  R164_COUNTERFORCE_CHANNEL_GROUPS,
  R164_COUNTERFORCE_SOURCE_CASE_CHANNEL_GROUP_VERSION,
  R164_COUNTERFORCE_SOURCE_FIXTURE,
} from './general-natal-counterforce-source-case-channel-groups.js';

export const R165_CONFIGURATION_SPECIFIC_PREDICATE_EVIDENCE_TIER_VERSION =
  '0.1.0-research' as const;

export type R165MechanismId = 'BREAK' | 'NATAL_RESCUE' | 'COUNTERFORCE';

export type R165TriggerClass =
  | 'BREAK_TRIGGER'
  | 'NATAL_RESCUE_TRIGGER'
  | 'COUNTERFORCE_TRIGGER';

export type R165ReplayDecompositionKind =
  | 'PAIRED_TEXTUAL_DELTA'
  | 'GROUPED_CHANNEL_ALTERNATIVES';

export type R165EvidenceClass =
  | 'REPLAY_CONTEXT_ONLY'
  | 'SOURCE_OMISSION_ONLY'
  | 'SOURCE_EXPLICIT_FEATURE_CANDIDATE'
  | 'SOURCE_OUTCOME_LANGUAGE_ONLY';

export interface R165MechanismRow {
  mechanismId: R165MechanismId;
  triggerClass: R165TriggerClass;
  upstreamCaseId: string;
  provenanceKind: string;
  replayDecompositionKind: R165ReplayDecompositionKind;
  sourceCaseBound: true;
  configurationSpecificObserved: true;
  replayDecompositionEstablished: true;
  exactMinimalPredicateSetEstablished: false;
  matchingSufficiencyEstablished: false;
  boundedOutcomeSufficiencyEstablished: false;
  settlementSufficiencyEstablished: false;
  semanticPredicateEstablished: false;
  automaticOutcomeAuthorized: false;
  mechanismRankingAuthorized: false;
  numericWeightAuthorized: false;
  executableResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const r076Break = R076_CASES.find((item) => item.mechanism === 'BREAK_TRIGGER');
const r076Rescue = R076_CASES.find((item) => item.mechanism === 'NATAL_RESCUE');
const r076Counterforce = R076_CASES.find(
  (item) => item.mechanism === 'COUNTERFORCE_BLOCKS_CHANGE',
);

const r157Break = R157_TRIGGER_ROWS.find(
  (item) => item.triggerClass === 'BREAK_TRIGGER',
);
const r157Rescue = R157_TRIGGER_ROWS.find(
  (item) => item.triggerClass === 'NATAL_RESCUE_TRIGGER',
);
const r157Counterforce = R157_TRIGGER_ROWS.find(
  (item) => item.triggerClass === 'COUNTERFORCE_TRIGGER',
);

const r159Break = R159_TRIGGER_SUFFICIENCY_ROWS.find(
  (item) => item.triggerClass === 'BREAK_TRIGGER',
);
const r159Rescue = R159_TRIGGER_SUFFICIENCY_ROWS.find(
  (item) => item.triggerClass === 'NATAL_RESCUE_TRIGGER',
);
const r159Counterforce = R159_TRIGGER_SUFFICIENCY_ROWS.find(
  (item) => item.triggerClass === 'COUNTERFORCE_TRIGGER',
);

const r163Break = R163_PAIRED_CASES.find(
  (item) => item.mechanism === 'BREAK_TRIGGER',
);
const r163Rescue = R163_PAIRED_CASES.find(
  (item) => item.mechanism === 'NATAL_RESCUE',
);

if (
  r076Break === undefined ||
  r076Rescue === undefined ||
  r076Counterforce === undefined ||
  r157Break === undefined ||
  r157Rescue === undefined ||
  r157Counterforce === undefined ||
  r159Break === undefined ||
  r159Rescue === undefined ||
  r159Counterforce === undefined ||
  r163Break === undefined ||
  r163Rescue === undefined
) {
  throw new Error('R165 missing configuration-specific upstream fixture');
}

const mechanism = (
  value: Pick<
    R165MechanismRow,
    | 'mechanismId'
    | 'triggerClass'
    | 'upstreamCaseId'
    | 'provenanceKind'
    | 'replayDecompositionKind'
  >,
): R165MechanismRow =>
  Object.freeze({
    ...value,
    sourceCaseBound: true,
    configurationSpecificObserved: true,
    replayDecompositionEstablished: true,
    exactMinimalPredicateSetEstablished: false,
    matchingSufficiencyEstablished: false,
    boundedOutcomeSufficiencyEstablished: false,
    settlementSufficiencyEstablished: false,
    semanticPredicateEstablished: false,
    automaticOutcomeAuthorized: false,
    mechanismRankingAuthorized: false,
    numericWeightAuthorized: false,
    executableResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R165_MECHANISM_MATRIX: readonly R165MechanismRow[] = Object.freeze([
  mechanism({
    mechanismId: 'BREAK',
    triggerClass: 'BREAK_TRIGGER',
    upstreamCaseId: r076Break.id,
    provenanceKind: r076Break.provenanceKind,
    replayDecompositionKind: 'PAIRED_TEXTUAL_DELTA',
  }),
  mechanism({
    mechanismId: 'NATAL_RESCUE',
    triggerClass: 'NATAL_RESCUE_TRIGGER',
    upstreamCaseId: r076Rescue.id,
    provenanceKind: r076Rescue.provenanceKind,
    replayDecompositionKind: 'PAIRED_TEXTUAL_DELTA',
  }),
  mechanism({
    mechanismId: 'COUNTERFORCE',
    triggerClass: 'COUNTERFORCE_TRIGGER',
    upstreamCaseId: r076Counterforce.id,
    provenanceKind: r076Counterforce.provenanceKind,
    replayDecompositionKind: 'GROUPED_CHANNEL_ALTERNATIVES',
  }),
]);

export interface R165EvidenceSurface {
  surfaceId: string;
  mechanismIds: readonly R165MechanismId[];
  evidenceClass: R165EvidenceClass;
  sourceSurface: string;
  sourceRefs: readonly string[];
  followUpPredicateResearchCandidate: boolean;
  candidateMeaning: string;
  semanticPredicateEstablished: false;
  semanticMinimalityEstablished: false;
  matchingSufficiencyEstablished: false;
  outcomeSufficiencyEstablished: false;
  settlementEstablished: false;
  automaticOutcomeAuthorized: false;
  numericWeightAuthorized: false;
  executableResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const evidence = (
  value: Omit<
    R165EvidenceSurface,
    | 'semanticPredicateEstablished'
    | 'semanticMinimalityEstablished'
    | 'matchingSufficiencyEstablished'
    | 'outcomeSufficiencyEstablished'
    | 'settlementEstablished'
    | 'automaticOutcomeAuthorized'
    | 'numericWeightAuthorized'
    | 'executableResolverAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R165EvidenceSurface =>
  Object.freeze({
    ...value,
    semanticPredicateEstablished: false,
    semanticMinimalityEstablished: false,
    matchingSufficiencyEstablished: false,
    outcomeSufficiencyEstablished: false,
    settlementEstablished: false,
    automaticOutcomeAuthorized: false,
    numericWeightAuthorized: false,
    executableResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R165_EVIDENCE_SURFACES: readonly R165EvidenceSurface[] =
  Object.freeze([
    evidence({
      surfaceId: 'R165-E01-SHARED-DING-CHEN-REN-WU-CONTEXT',
      mechanismIds: Object.freeze(['BREAK', 'NATAL_RESCUE'] as const),
      evidenceClass: 'REPLAY_CONTEXT_ONLY',
      sourceSurface: '丁 / 辰 / 透壬用官 / 逢戊',
      sourceRefs: Object.freeze([
        'R163:DING_DAY_CONTEXT_PRESERVED',
        'R163:CHEN_MONTH_CONTEXT_PRESERVED',
        'R163:REN_OFFICER_TRANSPARENCY_CONTEXT_PRESERVED',
        'R163:WU_LUCK_CONTEXT_PRESERVED',
      ]),
      followUpPredicateResearchCandidate: false,
      candidateMeaning:
        'Shared paired-case context is required for faithful replay but is not isolated as a semantic predicate.',
    }),
    evidence({
      surfaceId: 'R165-E02-BREAK-JIA-OMISSION',
      mechanismIds: Object.freeze(['BREAK'] as const),
      evidenceClass: 'SOURCE_OMISSION_ONLY',
      sourceSurface: 'retained break case does not state 命有甲',
      sourceRefs: Object.freeze(['R163:NATAL_JIA_TEXTUAL_DELTA_PRESERVED']),
      followUpPredicateResearchCandidate: false,
      candidateMeaning:
        'Omission is not evidence of natal Jia absence and is not eligible for positive predicate promotion.',
    }),
    evidence({
      surfaceId: 'R165-E03-RESCUE-JIA-EXPLICIT-PRESENCE',
      mechanismIds: Object.freeze(['NATAL_RESCUE'] as const),
      evidenceClass: 'SOURCE_EXPLICIT_FEATURE_CANDIDATE',
      sourceSurface: '命有甲',
      sourceRefs: Object.freeze([
        'R076:NATAL_RESCUE',
        'R163:NATAL_JIA_TEXTUAL_DELTA_PRESERVED',
      ]),
      followUpPredicateResearchCandidate: true,
      candidateMeaning:
        'Explicit Jia presence may be investigated as a bounded source-backed predicate component; it is not rescue sufficiency.',
    }),
    evidence({
      surfaceId: 'R165-E04-COUNTERFORCE-VISIBLE-METAL-STEM-GROUP',
      mechanismIds: Object.freeze(['COUNTERFORCE'] as const),
      evidenceClass: 'SOURCE_EXPLICIT_FEATURE_CANDIDATE',
      sourceSurface: '庚辛',
      sourceRefs: Object.freeze([
        'R076:COUNTERFORCE_BLOCKS_CHANGE',
        'R164:VISIBLE_METAL_STEMS_GROUP',
      ]),
      followUpPredicateResearchCandidate: true,
      candidateMeaning:
        'The grouped stem surface may be investigated as a bounded source-backed predicate component; neither member nor group sufficiency is established.',
    }),
    evidence({
      surfaceId: 'R165-E05-COUNTERFORCE-METAL-BRANCH-GROUP',
      mechanismIds: Object.freeze(['COUNTERFORCE'] as const),
      evidenceClass: 'SOURCE_EXPLICIT_FEATURE_CANDIDATE',
      sourceSurface: '申酉',
      sourceRefs: Object.freeze([
        'R076:COUNTERFORCE_BLOCKS_CHANGE',
        'R164:METAL_BRANCHES_GROUP',
      ]),
      followUpPredicateResearchCandidate: true,
      candidateMeaning:
        'The grouped branch surface may be investigated as a bounded source-backed predicate component; neither member nor group sufficiency is established.',
    }),
    evidence({
      surfaceId: 'R165-E06-COUNTERFORCE-MAO-WEI-LUCK-CONTEXT',
      mechanismIds: Object.freeze(['COUNTERFORCE'] as const),
      evidenceClass: 'REPLAY_CONTEXT_ONLY',
      sourceSurface: '運逢卯未',
      sourceRefs: Object.freeze([
        'R076:COUNTERFORCE_BLOCKS_CHANGE',
        'R164:MAO_WEI_LUCK_CONTEXT_PRESERVED',
      ]),
      followUpPredicateResearchCandidate: false,
      candidateMeaning:
        'Mao/Wei is preserved as source-case context and is not a complete meeting matcher.',
    }),
    evidence({
      surfaceId: 'R165-E07-COUNTERFORCE-NON-COMPLETION-LANGUAGE',
      mechanismIds: Object.freeze(['COUNTERFORCE'] as const),
      evidenceClass: 'SOURCE_OUTCOME_LANGUAGE_ONLY',
      sourceSurface: '可回沖而不成會局變格',
      sourceRefs: Object.freeze([
        'R076:COUNTERFORCE_BLOCKS_CHANGE',
        'R164:NON_COMPLETION_LANGUAGE_PRESERVED',
      ]),
      followUpPredicateResearchCandidate: false,
      candidateMeaning:
        'Source-case outcome language is preserved as observed wording and is not a universal settlement predicate.',
    }),
  ]);

export const R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES = Object.freeze(
  R165_EVIDENCE_SURFACES.filter(
    (item) => item.followUpPredicateResearchCandidate,
  ),
);

export interface R165GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R076' | 'R157' | 'R159' | 'R163' | 'R164';
  boundary: string;
  satisfied: boolean;
  semanticPredicateAuthorized: false;
  sufficiencyAuthorized: false;
  settlementAuthorized: false;
  executableResolverAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R165GovernanceGuard,
    | 'semanticPredicateAuthorized'
    | 'sufficiencyAuthorized'
    | 'settlementAuthorized'
    | 'executableResolverAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R165GovernanceGuard =>
  Object.freeze({
    ...value,
    semanticPredicateAuthorized: false,
    sufficiencyAuthorized: false,
    settlementAuthorized: false,
    executableResolverAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R165_GOVERNANCE_GUARDS: readonly R165GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R165-GUARD-R076',
      upstreamAsset: 'R076',
      boundary:
        'All three mechanism cases remain configuration-specific paraphrased cases with automaticOutcome=false and no global break/recovery resolver.',
      satisfied:
        [r076Break, r076Rescue, r076Counterforce].every(
          (item) =>
            item.provenanceKind === 'PARAPHRASED_SOURCE_CASE' &&
            !item.automaticOutcome &&
            !item.executable,
        ) &&
        !R076_AUTHORITY.globalBreakRecoveryToggleAuthorized &&
        !R076_AUTHORITY.executableBreakRecoveryResolverAuthorized,
    }),
    guard({
      guardId: 'R165-GUARD-R157',
      upstreamAsset: 'R157',
      boundary:
        'Configuration-specific trigger observation remains distinct from an executable trigger predicate.',
      satisfied:
        [r157Break, r157Rescue, r157Counterforce].every(
          (item) =>
            item.triggerSignalObserved &&
            item.configurationSpecificObserved &&
            !item.triggerPredicateAuthorized &&
            !item.executableTriggerResolverAuthorized,
        ) &&
        !R157_AUTHORITY.triggerPredicateAuthorized &&
        !R157_AUTHORITY.executableTriggerResolverAuthorized,
    }),
    guard({
      guardId: 'R165-GUARD-R159',
      upstreamAsset: 'R159',
      boundary:
        'No mechanism has an exact minimal predicate set, matching sufficiency, bounded outcome sufficiency, or settlement sufficiency.',
      satisfied:
        [r159Break, r159Rescue, r159Counterforce].every(
          (item) =>
            !item.exactMinimalPredicateSetEstablished &&
            !item.matchingSufficiencyEstablished &&
            !item.boundedOutcomeSufficiencyEstablished &&
            !item.settlementSufficiencyEstablished &&
            !item.automaticOutcomeAuthorized,
        ) &&
        !R159_AUTHORITY.exactTemporalTriggerMinimalPredicateSetEstablished &&
        !R159_AUTHORITY.boundedTemporalTriggerOutcomeSufficiencyEstablished &&
        !R159_AUTHORITY.executableTemporalTriggerOutcomeResolverAuthorized,
    }),
    guard({
      guardId: 'R165-GUARD-R163',
      upstreamAsset: 'R163',
      boundary:
        'The paired break/rescue delta preserves explicit Jia presence versus omission without converting omission to absence or presence to rescue sufficiency.',
      satisfied:
        r163Break.natalJiaMentionState ===
          'NOT_STATED_IN_RETAINED_BREAK_CASE' &&
        !r163Break.natalJiaAbsenceEstablished &&
        r163Rescue.natalJiaMentionState ===
          'EXPLICITLY_STATED_PRESENT_IN_RESCUE_CASE' &&
        R163_PAIRED_TEXTUAL_DELTA.rescueCaseJiaPresenceExplicitlyObserved &&
        !R163_PAIRED_TEXTUAL_DELTA.breakCaseJiaAbsenceEstablished &&
        !R163_PAIRED_TEXTUAL_DELTA.semanticMinimalityEstablished &&
        !R163_PAIRED_TEXTUAL_DELTA.rescueSufficiencyEstablished &&
        R163_AUTHORITY.pairedTextualDeltaDistinctFromSemanticMinimalityObserved &&
        !R163_AUTHORITY.rescueSufficiencyEstablished,
    }),
    guard({
      guardId: 'R165-GUARD-R164',
      upstreamAsset: 'R164',
      boundary:
        'Counterforce grouped alternatives remain distinct from individual/group sufficiency, meeting matching, precedence, and final settlement.',
      satisfied:
        R164_COUNTERFORCE_CHANNEL_GROUPS.length === 2 &&
        R164_COUNTERFORCE_CHANNEL_GROUPS.every(
          (item) =>
            item.sourceGroupedAlternativeObserved &&
            !item.individualMemberSufficiencyEstablished &&
            !item.groupSufficiencyEstablished &&
            !item.precedenceEstablished &&
            !item.changeSettlementEstablished,
        ) &&
        R164_COUNTERFORCE_SOURCE_FIXTURE.maoWeiLuckContextObserved &&
        !R164_COUNTERFORCE_SOURCE_FIXTURE.maoWeiMeetingDerivedByR164 &&
        R164_AUTHORITY.groupedAlternativesDistinctFromIndividualSufficiencyObserved &&
        R164_AUTHORITY.maoWeiLuckContextDistinctFromMeetingMatcherObserved &&
        R164_AUTHORITY.counterforcePresenceDistinctFromSettlementObserved &&
        !R164_AUTHORITY.groupSufficiencyEstablished &&
        !R164_AUTHORITY.changeSettlementEstablished,
    }),
  ]);

export const R165_REJECTED_SHORTCUTS = Object.freeze([
  'EVIDENCE_CLASS_IS_AUTHORITY_RANK',
  'FOLLOW_UP_CANDIDATE_EQUALS_SEMANTIC_PREDICATE',
  'EXPLICIT_JIA_PRESENCE_EQUALS_RESCUE_SUFFICIENCY',
  'BREAK_CASE_JIA_OMISSION_EQUALS_JIA_ABSENCE',
  'COUNTERFORCE_GROUP_EQUALS_GROUP_SUFFICIENCY',
  'COUNTERFORCE_GROUP_MEMBER_EQUALS_INDIVIDUAL_SUFFICIENCY',
  'MAO_WEI_CONTEXT_EQUALS_COMPLETE_MEETING_MATCH',
  'SOURCE_OUTCOME_LANGUAGE_EQUALS_SETTLEMENT',
  'MORE_EXPLICIT_FEATURES_EQUALS_STRONGER_MECHANISM',
  'CANDIDATE_COUNT_AS_NUMERIC_WEIGHT',
  'MATRIX_AS_EXECUTABLE_TRIGGER_RESOLVER',
  'MATRIX_AS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R165_SUMMARY = Object.freeze({
  mechanismCount: R165_MECHANISM_MATRIX.length,
  evidenceSurfaceCount: R165_EVIDENCE_SURFACES.length,
  replayContextOnlyCount: R165_EVIDENCE_SURFACES.filter(
    (item) => item.evidenceClass === 'REPLAY_CONTEXT_ONLY',
  ).length,
  sourceOmissionOnlyCount: R165_EVIDENCE_SURFACES.filter(
    (item) => item.evidenceClass === 'SOURCE_OMISSION_ONLY',
  ).length,
  explicitFeatureCandidateCount: R165_EVIDENCE_SURFACES.filter(
    (item) => item.evidenceClass === 'SOURCE_EXPLICIT_FEATURE_CANDIDATE',
  ).length,
  sourceOutcomeLanguageOnlyCount: R165_EVIDENCE_SURFACES.filter(
    (item) => item.evidenceClass === 'SOURCE_OUTCOME_LANGUAGE_ONLY',
  ).length,
  followUpPredicateResearchCandidateCount:
    R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES.length,
  semanticPredicateEstablishedCount: R165_EVIDENCE_SURFACES.filter(
    (item) => item.semanticPredicateEstablished,
  ).length,
  governanceGuardCount: R165_GOVERNANCE_GUARDS.length,
});

export const R165_UPSTREAM_BINDINGS = Object.freeze({
  r076: {
    version: R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION,
    breakCaseId: r076Break.id,
    rescueCaseId: r076Rescue.id,
    counterforceCaseId: r076Counterforce.id,
  },
  r157: {
    version: R157_TEMPORAL_TRIGGER_MATCHING_PROVENANCE_VERSION,
    triggerPredicateAuthorized: R157_AUTHORITY.triggerPredicateAuthorized,
  },
  r159: {
    version: R159_TEMPORAL_TRIGGER_SUFFICIENCY_AUDIT_VERSION,
    exactTemporalTriggerMinimalPredicateSetEstablished:
      R159_AUTHORITY.exactTemporalTriggerMinimalPredicateSetEstablished,
  },
  r163: {
    version: R163_BREAK_RESCUE_PAIRED_CASE_DELTA_VERSION,
    pairedTextualDeltaEstablished: R163_AUTHORITY.pairedTextualDeltaEstablished,
  },
  r164: {
    version: R164_COUNTERFORCE_SOURCE_CASE_CHANNEL_GROUP_VERSION,
    groupedAlternativesDistinctFromIndividualSufficiencyObserved:
      R164_AUTHORITY.groupedAlternativesDistinctFromIndividualSufficiencyObserved,
  },
});

export const R165_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_CONFIGURATION_SPECIFIC_TEMPORAL_MECHANISM_PREDICATE_EVIDENCE_TIER_MATRIX_COMPLETE' as const,
  researchOnly: true,
  threeMechanismMatrixEstablished: true,
  replayMetadataSeparatedFromFollowUpCandidateSurfaces: true,
  sourceOmissionDistinctFromProvenAbsenceObserved: true,
  explicitFeatureCandidateDistinctFromSemanticPredicateObserved: true,
  explicitFeatureCandidateDistinctFromSufficiencyObserved: true,
  groupedAlternativeCandidateDistinctFromGroupSufficiencyObserved: true,
  sourceOutcomeLanguageDistinctFromSettlementObserved: true,
  mechanismRankingEstablished: false,
  semanticPredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  matchingSufficiencyEstablished: false,
  boundedOutcomeSufficiencyEstablished: false,
  settlementSufficiencyEstablished: false,
  automaticOutcomeAuthorized: false,
  numericWeightAuthorized: false,
  executableTriggerResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
