import {
  R060_AUTHORITY,
  R060_HIDDEN_STEM_INTERACTION_VERSION,
  R060_MECHANISMS,
} from './general-natal-hidden-stem-interaction-boundary.js';
import {
  R073_AUTHORITY,
  R073_STATE_MODEL,
  R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
} from './general-natal-temporal-latent-activation.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
  buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview,
} from './general-natal-geju-month-order-hidden-stem-selection-admission-review.js';
import {
  I53_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_ACTIVATION_PERSISTENCE_METHODOLOGY_REVIEW_VERSION,
  buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview,
} from './i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import {
  I250_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW_VERSION,
  I250_RESEARCH_QUESTION_IDS,
} from './i250-public-classic-hidden-stem-interaction-frontier-readiness-review.js';
import {
  I251_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE_VERSION,
  type I251Coverage,
} from './i251-public-classic-hidden-stem-interaction-source-evidence.js';
import {
  I252_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW_VERSION,
  I252_REQUIREMENT_IDS,
} from './i252-public-classic-hidden-stem-interaction-evidence-adequacy-methodology-review.js';
import { R144_AUTHORITY } from './general-natal-punishment-repetition-self-punishment-variant-corpus.js';
import { R145_AUTHORITY } from './general-natal-harm-break-low-evidence-boundary-audit.js';

export const R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION =
  '0.1.0-research' as const;

export type R146CaseFamily =
  | 'R060_MECHANISM_REPLAY'
  | 'R073_TEMPORAL_STATE_REPLAY'
  | 'PUBLIC_CLASSIC_FRONTIER_REPLAY'
  | 'I53_CONTEST_TOPOLOGY_REPLAY'
  | 'LOW_AUTHORITY_CONTROL';

export type R146ProvenanceState =
  | 'MEMBERSHIP_ONLY'
  | 'LATENT_STATE_ONLY'
  | 'MANIFESTATION_DISTINCT_FROM_ACTIVATION'
  | 'CONFIGURATION_INTERACTION_ONLY'
  | 'SOURCE_BOUNDED_INTERACTION'
  | 'SOURCE_BOUNDED_ACTIVATION_LANGUAGE'
  | 'SOURCE_BOUNDED_CONTEXT_MODULATION'
  | 'TEMPORARY_OPERATIVE_STATE_ONLY'
  | 'TOPOLOGY_ONLY'
  | 'EVIDENCE_GAP'
  | 'LOW_AUTHORITY_BOUNDARY';

export type R146HiddenMembershipState = 'OBSERVED' | 'NOT_ASSERTED';

export interface R146ActivationProvenanceCase {
  caseId: string;
  family: R146CaseFamily;
  upstreamKey: string;
  provenanceState: R146ProvenanceState;
  sourceRefs: readonly string[];
  hiddenMembershipState: R146HiddenMembershipState;
  interactionObserved: boolean;
  manifestationObserved: boolean;
  sourceBoundedInteractionObserved: boolean;
  sourceActivationLanguageObserved: boolean;
  boundedRoleSubstitutionObserved: boolean;
  temporaryOperativeStateObserved: boolean;
  runtimeActivationFactAuthorized: false;
  perMemberActivationResolverAuthorized: false;
  activationPersistenceVerdictAuthorized: false;
  permanentNatalMutationAuthorized: false;
  concreteEventAuthorized: false;
  effectiveForceAuthorized: false;
  fixedPolarityAuthorized: false;
  numericActivationWeightAuthorized: false;
  generalizedRoleReassignmentAuthorized: false;
  yongXiJiReassignmentAuthorized: false;
  chartRoleFactEmissionAuthorized: false;
  automaticEngineAdmissionAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  executable: false;
  productionAuthorityPromoted: false;
  notes: readonly string[];
}

const closedCase = (
  value: Omit<
    R146ActivationProvenanceCase,
    | 'runtimeActivationFactAuthorized'
    | 'perMemberActivationResolverAuthorized'
    | 'activationPersistenceVerdictAuthorized'
    | 'permanentNatalMutationAuthorized'
    | 'concreteEventAuthorized'
    | 'effectiveForceAuthorized'
    | 'fixedPolarityAuthorized'
    | 'numericActivationWeightAuthorized'
    | 'generalizedRoleReassignmentAuthorized'
    | 'yongXiJiReassignmentAuthorized'
    | 'chartRoleFactEmissionAuthorized'
    | 'automaticEngineAdmissionAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'executable'
    | 'productionAuthorityPromoted'
  >,
): R146ActivationProvenanceCase =>
  Object.freeze({
    ...value,
    runtimeActivationFactAuthorized: false,
    perMemberActivationResolverAuthorized: false,
    activationPersistenceVerdictAuthorized: false,
    permanentNatalMutationAuthorized: false,
    concreteEventAuthorized: false,
    effectiveForceAuthorized: false,
    fixedPolarityAuthorized: false,
    numericActivationWeightAuthorized: false,
    generalizedRoleReassignmentAuthorized: false,
    yongXiJiReassignmentAuthorized: false,
    chartRoleFactEmissionAuthorized: false,
    automaticEngineAdmissionAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    executable: false,
    productionAuthorityPromoted: false,
  });

const gejuHiddenStemReview =
  buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview();

const R060_CASES: readonly R146ActivationProvenanceCase[] = Object.freeze(
  R060_MECHANISMS.map((item, index) => {
    switch (item.mechanism) {
      case 'HIDDEN_MEMBERSHIP':
        return closedCase({
          caseId: 'R146-R060-' + String(index + 1).padStart(2, '0'),
          family: 'R060_MECHANISM_REPLAY',
          upstreamKey: item.mechanism,
          provenanceState: 'MEMBERSHIP_ONLY',
          sourceRefs: ['R060:' + item.mechanism],
          hiddenMembershipState: 'OBSERVED',
          interactionObserved: false,
          manifestationObserved: false,
          sourceBoundedInteractionObserved: false,
          sourceActivationLanguageObserved: false,
          boundedRoleSubstitutionObserved: false,
          temporaryOperativeStateObserved: false,
          notes: [
            'Hidden-stem membership is preserved as membership only.',
            'Membership does not establish activation, usable role, force, or event realization.',
          ],
        });
      case 'STEM_MANIFESTATION_TOU_GAN':
        return closedCase({
          caseId: 'R146-R060-' + String(index + 1).padStart(2, '0'),
          family: 'R060_MECHANISM_REPLAY',
          upstreamKey: item.mechanism,
          provenanceState: 'MANIFESTATION_DISTINCT_FROM_ACTIVATION',
          sourceRefs: ['R060:' + item.mechanism],
          hiddenMembershipState: 'OBSERVED',
          interactionObserved: false,
          manifestationObserved: true,
          sourceBoundedInteractionObserved: false,
          sourceActivationLanguageObserved: false,
          boundedRoleSubstitutionObserved: false,
          temporaryOperativeStateObserved: false,
          notes: [
            'Tou-gan manifestation is represented distinctly from generic activation.',
            'Visibility does not authorize a universal per-member activation resolver.',
          ],
        });
      case 'BRANCH_MEETING_CONFIGURATION':
        return closedCase({
          caseId: 'R146-R060-' + String(index + 1).padStart(2, '0'),
          family: 'R060_MECHANISM_REPLAY',
          upstreamKey: item.mechanism,
          provenanceState: 'CONFIGURATION_INTERACTION_ONLY',
          sourceRefs: ['R060:' + item.mechanism],
          hiddenMembershipState: 'OBSERVED',
          interactionObserved: true,
          manifestationObserved: false,
          sourceBoundedInteractionObserved: false,
          sourceActivationLanguageObserved: false,
          boundedRoleSubstitutionObserved: false,
          temporaryOperativeStateObserved: false,
          notes: [
            'Meeting is preserved as configuration-level interaction.',
            'Meeting does not activate every hidden member independently.',
          ],
        });
      case 'CLASH_MOVEMENT_OR_DISRUPTION':
        return closedCase({
          caseId: 'R146-R060-' + String(index + 1).padStart(2, '0'),
          family: 'R060_MECHANISM_REPLAY',
          upstreamKey: item.mechanism,
          provenanceState: 'SOURCE_BOUNDED_INTERACTION',
          sourceRefs: ['R060:' + item.mechanism],
          hiddenMembershipState: 'OBSERVED',
          interactionObserved: true,
          manifestationObserved: false,
          sourceBoundedInteractionObserved: true,
          sourceActivationLanguageObserved: false,
          boundedRoleSubstitutionObserved: false,
          temporaryOperativeStateObserved: false,
          notes: [
            'Clash movement/disruption is preserved without equating clash to tou-gan.',
            'Clash does not reveal or activate every hidden stem.',
          ],
        });
    }
  }),
);

const R073_CASES: readonly R146ActivationProvenanceCase[] = Object.freeze(
  R073_STATE_MODEL.map((item, index) => {
    const base = {
      caseId: 'R146-R073-' + String(index + 1).padStart(2, '0'),
      family: 'R073_TEMPORAL_STATE_REPLAY' as const,
      upstreamKey: item.state,
      sourceRefs: ['R073:' + item.state],
      hiddenMembershipState: 'OBSERVED' as const,
    };

    switch (item.state) {
      case 'NATAL_LATENT':
        return closedCase({
          ...base,
          provenanceState: 'LATENT_STATE_ONLY',
          interactionObserved: false,
          manifestationObserved: false,
          sourceBoundedInteractionObserved: false,
          sourceActivationLanguageObserved: false,
          boundedRoleSubstitutionObserved: false,
          temporaryOperativeStateObserved: false,
          notes: [
            'Natal latent state remains distinct from active or operative state.',
          ],
        });
      case 'ACTIVATED_BY_TRANSPARENCY':
        return closedCase({
          ...base,
          provenanceState: 'SOURCE_BOUNDED_ACTIVATION_LANGUAGE',
          sourceRefs: [
            'R073:' + item.state,
            'GEJU_HIDDEN_STEM_EXACT_YIN_TRANSPARENCY_SUBSTITUTION',
          ],
          interactionObserved: false,
          manifestationObserved: true,
          sourceBoundedInteractionObserved: false,
          sourceActivationLanguageObserved: true,
          boundedRoleSubstitutionObserved:
            gejuHiddenStemReview.directSourceYinExactTransparencySubstitutionObserved,
          temporaryOperativeStateObserved: false,
          notes: [
            'Transparency activation language is preserved as bounded source provenance.',
            'The exact 寅 example may preserve role substitution evidence without becoming an all-branch selector.',
          ],
        });
      case 'ACTIVATED_BY_NATAL_LUCK_MEETING':
        return closedCase({
          ...base,
          provenanceState: 'SOURCE_BOUNDED_ACTIVATION_LANGUAGE',
          interactionObserved: true,
          manifestationObserved: false,
          sourceBoundedInteractionObserved: true,
          sourceActivationLanguageObserved: true,
          boundedRoleSubstitutionObserved: false,
          temporaryOperativeStateObserved: false,
          notes: [
            'Natal-luck meeting activation language remains source-bounded and non-executable.',
          ],
        });
      case 'TEMPORARY_OPERATIVE_STATE':
        return closedCase({
          ...base,
          provenanceState: 'TEMPORARY_OPERATIVE_STATE_ONLY',
          interactionObserved: true,
          manifestationObserved: false,
          sourceBoundedInteractionObserved: true,
          sourceActivationLanguageObserved: true,
          boundedRoleSubstitutionObserved: false,
          temporaryOperativeStateObserved: true,
          notes: [
            'Temporary operative state is preserved without permanent natal mutation.',
            'End of the bounded luck context must not leave a permanent activation mutation.',
          ],
        });
      case 'POSITION_CONTEXT_MODULATED':
        return closedCase({
          ...base,
          provenanceState: 'SOURCE_BOUNDED_CONTEXT_MODULATION',
          interactionObserved: false,
          manifestationObserved: false,
          sourceBoundedInteractionObserved: false,
          sourceActivationLanguageObserved: false,
          boundedRoleSubstitutionObserved: false,
          temporaryOperativeStateObserved: false,
          notes: [
            'Position modulation is contextual evidence only and not an activation trigger or numeric weight.',
          ],
        });
    }
  }),
);

const PUBLIC_CLASSIC_COVERAGE: Readonly<
  Record<(typeof I250_RESEARCH_QUESTION_IDS)[number], I251Coverage>
> = Object.freeze({
  EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION: 'DIRECT',
  VISIBLE_HIDDEN_MANIFESTATION_DISTINCTION: 'DIRECT',
  POSITION_OR_SEPARATION_QUALIFIER: 'DIRECT',
  SEASON_OR_PLURALITY_QUALIFIER: 'DIRECT',
  REMOTE_HIDDEN_RELATION_CHAIN_RESTRICTION: 'TARGETED_NOT_YET_BOUND',
  EXTERNAL_STEM_TO_HIDDEN_STEM_EFFECT_BOUNDARY: 'TARGETED_NOT_YET_BOUND',
});

const PUBLIC_CLASSIC_CASES: readonly R146ActivationProvenanceCase[] = Object.freeze(
  I250_RESEARCH_QUESTION_IDS.map((questionId, index) => {
    const coverage = PUBLIC_CLASSIC_COVERAGE[questionId];
    if (coverage === 'TARGETED_NOT_YET_BOUND') {
      return closedCase({
        caseId: 'R146-PUBLIC-' + String(index + 1).padStart(2, '0'),
        family: 'PUBLIC_CLASSIC_FRONTIER_REPLAY',
        upstreamKey: questionId,
        provenanceState: 'EVIDENCE_GAP',
        sourceRefs: ['I250:' + questionId, 'I251:' + coverage],
        hiddenMembershipState: 'NOT_ASSERTED',
        interactionObserved: false,
        manifestationObserved: false,
        sourceBoundedInteractionObserved: false,
        sourceActivationLanguageObserved: false,
        boundedRoleSubstitutionObserved: false,
        temporaryOperativeStateObserved: false,
        notes: [
          'The targeted source path is identified but exact rule-bearing authority is not bound.',
          'No activation or effect conclusion may be inferred from the gap.',
        ],
      });
    }

    if (questionId === 'VISIBLE_HIDDEN_MANIFESTATION_DISTINCTION') {
      return closedCase({
        caseId: 'R146-PUBLIC-' + String(index + 1).padStart(2, '0'),
        family: 'PUBLIC_CLASSIC_FRONTIER_REPLAY',
        upstreamKey: questionId,
        provenanceState: 'MANIFESTATION_DISTINCT_FROM_ACTIVATION',
        sourceRefs: ['I250:' + questionId, 'I251:DIRECT', 'I252:BOUNDED_SCOPE'],
        hiddenMembershipState: 'OBSERVED',
        interactionObserved: false,
        manifestationObserved: true,
        sourceBoundedInteractionObserved: false,
        sourceActivationLanguageObserved: false,
        boundedRoleSubstitutionObserved: false,
        temporaryOperativeStateObserved: false,
        notes: [
          'Visible-versus-hidden distinction is directly observed.',
          'Visibility distinction alone is not a universal activation verdict.',
        ],
      });
    }

    if (questionId === 'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION') {
      return closedCase({
        caseId: 'R146-PUBLIC-' + String(index + 1).padStart(2, '0'),
        family: 'PUBLIC_CLASSIC_FRONTIER_REPLAY',
        upstreamKey: questionId,
        provenanceState: 'SOURCE_BOUNDED_INTERACTION',
        sourceRefs: ['I250:' + questionId, 'I251:DIRECT', 'I252:BOUNDED_SCOPE'],
        hiddenMembershipState: 'OBSERVED',
        interactionObserved: true,
        manifestationObserved: false,
        sourceBoundedInteractionObserved: true,
        sourceActivationLanguageObserved: false,
        boundedRoleSubstitutionObserved: false,
        temporaryOperativeStateObserved: false,
        notes: [
          'Explicit branch-clash hidden-stem interaction is admitted only within the bounded research scope.',
          'The evidence does not authorize all-hidden activation, a clash winner, or damage magnitude.',
        ],
      });
    }

    return closedCase({
      caseId: 'R146-PUBLIC-' + String(index + 1).padStart(2, '0'),
      family: 'PUBLIC_CLASSIC_FRONTIER_REPLAY',
      upstreamKey: questionId,
      provenanceState: 'SOURCE_BOUNDED_CONTEXT_MODULATION',
      sourceRefs: ['I250:' + questionId, 'I251:DIRECT', 'I252:BOUNDED_SCOPE'],
      hiddenMembershipState: 'OBSERVED',
      interactionObserved: true,
      manifestationObserved: false,
      sourceBoundedInteractionObserved: true,
      sourceActivationLanguageObserved: false,
      boundedRoleSubstitutionObserved: false,
      temporaryOperativeStateObserved: false,
      notes: [
        'Position/separation or season/plurality is preserved as a qualitative interaction qualifier.',
        'The qualifier is not converted into numeric weight, winner, damage, or runtime activation.',
      ],
    });
  }),
);

const i53 =
  buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();

const I53_CASES: readonly R146ActivationProvenanceCase[] = Object.freeze(
  i53.authorizedContestTopologyStates.map((state, index) =>
    closedCase({
      caseId: 'R146-I53-' + String(index + 1).padStart(2, '0'),
      family: 'I53_CONTEST_TOPOLOGY_REPLAY',
      upstreamKey: state,
      provenanceState: 'TOPOLOGY_ONLY',
      sourceRefs: ['I53:' + state],
      hiddenMembershipState: 'NOT_ASSERTED',
      interactionObserved: state !== 'NO_TRACKED_RELATION_TOUCH',
      manifestationObserved: false,
      sourceBoundedInteractionObserved: false,
      sourceActivationLanguageObserved: false,
      boundedRoleSubstitutionObserved: false,
      temporaryOperativeStateObserved: false,
      notes: [
        'Contest topology is preserved without direct activation or persistence settlement.',
        'Tracked touch does not imply bound, broken, neutralized, activated, or persisted.',
      ],
    }),
  ),
);

const LOW_AUTHORITY_CASES: readonly R146ActivationProvenanceCase[] = Object.freeze([
  closedCase({
    caseId: 'R146-LOW-01',
    family: 'LOW_AUTHORITY_CONTROL',
    upstreamKey: 'COMBINATION_GENERALIZATION',
    provenanceState: 'LOW_AUTHORITY_BOUNDARY',
    sourceRefs: ['R060:BRANCH_MEETING_CONFIGURATION', 'I53:CURRENT_COMBINATION_PARTICIPATION'],
    hiddenMembershipState: 'NOT_ASSERTED',
    interactionObserved: true,
    manifestationObserved: false,
    sourceBoundedInteractionObserved: false,
    sourceActivationLanguageObserved: false,
    boundedRoleSubstitutionObserved: false,
    temporaryOperativeStateObserved: false,
    notes: [
      'Combination or meeting topology does not generically activate each hidden stem.',
    ],
  }),
  closedCase({
    caseId: 'R146-LOW-02',
    family: 'LOW_AUTHORITY_CONTROL',
    upstreamKey: 'PUNISHMENT',
    provenanceState: 'LOW_AUTHORITY_BOUNDARY',
    sourceRefs: ['R144'],
    hiddenMembershipState: 'NOT_ASSERTED',
    interactionObserved: true,
    manifestationObserved: false,
    sourceBoundedInteractionObserved: false,
    sourceActivationLanguageObserved: false,
    boundedRoleSubstitutionObserved: false,
    temporaryOperativeStateObserved: false,
    notes: [
      'R144 punishment multiplicity is structural topology only and carries no hidden-stem activation authority.',
    ],
  }),
  closedCase({
    caseId: 'R146-LOW-03',
    family: 'LOW_AUTHORITY_CONTROL',
    upstreamKey: 'HARM',
    provenanceState: 'LOW_AUTHORITY_BOUNDARY',
    sourceRefs: ['R145:HARM'],
    hiddenMembershipState: 'NOT_ASSERTED',
    interactionObserved: true,
    manifestationObserved: false,
    sourceBoundedInteractionObserved: false,
    sourceActivationLanguageObserved: false,
    boundedRoleSubstitutionObserved: false,
    temporaryOperativeStateObserved: false,
    notes: [
      'R145 harm membership and modifiers do not authorize hidden-stem activation.',
    ],
  }),
  closedCase({
    caseId: 'R146-LOW-04',
    family: 'LOW_AUTHORITY_CONTROL',
    upstreamKey: 'BREAK',
    provenanceState: 'LOW_AUTHORITY_BOUNDARY',
    sourceRefs: ['R145:BREAK'],
    hiddenMembershipState: 'NOT_ASSERTED',
    interactionObserved: true,
    manifestationObserved: false,
    sourceBoundedInteractionObserved: false,
    sourceActivationLanguageObserved: false,
    boundedRoleSubstitutionObserved: false,
    temporaryOperativeStateObserved: false,
    notes: [
      'R145 selected-source break membership does not authorize hidden-stem activation.',
    ],
  }),
]);

export const R146_ACTIVATION_PROVENANCE_CASES: readonly R146ActivationProvenanceCase[] =
  Object.freeze([
    ...R060_CASES,
    ...R073_CASES,
    ...PUBLIC_CLASSIC_CASES,
    ...I53_CASES,
    ...LOW_AUTHORITY_CASES,
  ]);

export const R146_REJECTED_SHORTCUTS = Object.freeze([
  'HIDDEN_MEMBERSHIP_IMPLIES_ACTIVE',
  'CLASH_REVEALS_ALL_HIDDEN_STEMS',
  'CLASH_EQUALS_TOUGAN',
  'MEETING_ACTIVATES_EACH_HIDDEN_STEM',
  'COMBINATION_TOUCH_IMPLIES_ACTIVATED',
  'COMPETING_CLASH_TOUCH_IMPLIES_BROKEN_OR_INACTIVE',
  'PUNISHMENT_REPETITION_INCREASES_HIDDEN_STEM_ACTIVATION',
  'HARM_MEMBERSHIP_ACTIVATES_HIDDEN_STEMS',
  'BREAK_MEMBERSHIP_ACTIVATES_HIDDEN_STEMS',
  'SEASON_OR_PLURALITY_SELECTS_CLASH_HIDDEN_STEM_WINNER',
  'ACTIVATION_IMPLIES_PERMANENT_NATAL_MUTATION',
  'ACTIVATION_IMPLIES_CONCRETE_EVENT',
  'ACTIVATION_IMPLIES_FIXED_POLARITY',
  'ACTIVATION_IMPLIES_YONG_XI_JI_REASSIGNMENT',
  'ACTIVATION_IMPLIES_FIXED_EFFECTIVE_FORCE',
  'HIDDEN_STEM_ARRAY_ORDER_SELECTS_ACTIVATION_PRIORITY',
  'TEMPORARY_LUCK_ACTIVATION_PERSISTS_AFTER_CONTEXT',
] as const);

const countFamily = (family: R146CaseFamily): number =>
  R146_ACTIVATION_PROVENANCE_CASES.filter((item) => item.family === family).length;

const countAuthorized = (
  key:
    | 'runtimeActivationFactAuthorized'
    | 'perMemberActivationResolverAuthorized'
    | 'activationPersistenceVerdictAuthorized'
    | 'permanentNatalMutationAuthorized'
    | 'concreteEventAuthorized'
    | 'effectiveForceAuthorized'
    | 'numericActivationWeightAuthorized'
    | 'generalizedRoleReassignmentAuthorized'
    | 'yongXiJiReassignmentAuthorized'
    | 'executable'
    | 'productionAuthorityPromoted',
): number =>
  R146_ACTIVATION_PROVENANCE_CASES.filter((item) => item[key]).length;

export const R146_SUMMARY = Object.freeze({
  caseCount: R146_ACTIVATION_PROVENANCE_CASES.length,
  r060CaseCount: countFamily('R060_MECHANISM_REPLAY'),
  r073CaseCount: countFamily('R073_TEMPORAL_STATE_REPLAY'),
  publicClassicCaseCount: countFamily('PUBLIC_CLASSIC_FRONTIER_REPLAY'),
  i53TopologyCaseCount: countFamily('I53_CONTEST_TOPOLOGY_REPLAY'),
  lowAuthorityControlCount: countFamily('LOW_AUTHORITY_CONTROL'),
  publicClassicDirectCoverageCount: Object.values(PUBLIC_CLASSIC_COVERAGE).filter(
    (item) => item === 'DIRECT',
  ).length,
  publicClassicTargetedGapCount: Object.values(PUBLIC_CLASSIC_COVERAGE).filter(
    (item) => item === 'TARGETED_NOT_YET_BOUND',
  ).length,
  boundedRoleSubstitutionObservedCount:
    R146_ACTIVATION_PROVENANCE_CASES.filter(
      (item) => item.boundedRoleSubstitutionObserved,
    ).length,
  temporaryOperativeStateObservedCount:
    R146_ACTIVATION_PROVENANCE_CASES.filter(
      (item) => item.temporaryOperativeStateObserved,
    ).length,
  evidenceGapCount: R146_ACTIVATION_PROVENANCE_CASES.filter(
    (item) => item.provenanceState === 'EVIDENCE_GAP',
  ).length,
  runtimeActivationFactAuthorizedCount: countAuthorized(
    'runtimeActivationFactAuthorized',
  ),
  perMemberActivationResolverAuthorizedCount: countAuthorized(
    'perMemberActivationResolverAuthorized',
  ),
  activationPersistenceVerdictAuthorizedCount: countAuthorized(
    'activationPersistenceVerdictAuthorized',
  ),
  permanentNatalMutationAuthorizedCount: countAuthorized(
    'permanentNatalMutationAuthorized',
  ),
  concreteEventAuthorizedCount: countAuthorized('concreteEventAuthorized'),
  effectiveForceAuthorizedCount: countAuthorized('effectiveForceAuthorized'),
  numericActivationWeightAuthorizedCount: countAuthorized(
    'numericActivationWeightAuthorized',
  ),
  generalizedRoleReassignmentAuthorizedCount: countAuthorized(
    'generalizedRoleReassignmentAuthorized',
  ),
  yongXiJiReassignmentAuthorizedCount: countAuthorized(
    'yongXiJiReassignmentAuthorized',
  ),
  executableCount: countAuthorized('executable'),
  productionAuthorityPromotedCount: countAuthorized(
    'productionAuthorityPromoted',
  ),
});

export const R146_UPSTREAM_BINDINGS = Object.freeze({
  r060: {
    version: R060_HIDDEN_STEM_INTERACTION_VERSION,
    mechanismCount: R060_MECHANISMS.length,
    hiddenMembershipDistinctFromManifestation:
      R060_AUTHORITY.hiddenMembershipDistinctFromManifestation,
    meetingDistinctFromTouGan: R060_AUTHORITY.meetingDistinctFromTouGan,
    clashDistinctFromManifestation: R060_AUTHORITY.clashDistinctFromManifestation,
    genericInteractionActivationAuthorized:
      R060_AUTHORITY.genericInteractionActivationAuthorized,
    executableResolverAuthorized: R060_AUTHORITY.executableResolverAuthorized,
    productionAuthorityPromoted: R060_AUTHORITY.productionAuthorityPromoted,
  },
  r073: {
    version: R073_TEMPORAL_LATENT_ACTIVATION_VERSION,
    stateCount: R073_AUTHORITY.stateCount,
    activationImpliesPermanentNatalChange:
      R073_AUTHORITY.activationImpliesPermanentNatalChange,
    activationImpliesConcreteEvent: R073_AUTHORITY.activationImpliesConcreteEvent,
    executableTimingResolverAuthorized:
      R073_AUTHORITY.executableTimingResolverAuthorized,
    productionAuthorityPromoted: R073_AUTHORITY.productionAuthorityPromoted,
  },
  gejuHiddenStem: {
    version:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
    directSourceYinExactTransparencySubstitutionObserved:
      gejuHiddenStemReview.directSourceYinExactTransparencySubstitutionObserved,
    directSourceYinRoleGeneralizedBeyondYin:
      gejuHiddenStemReview.directSourceYinRoleGeneralizedBeyondYin,
    generalizedMonthOrderHiddenStemSelectionPredicateAuthorized:
      gejuHiddenStemReview.generalizedMonthOrderHiddenStemSelectionPredicateAuthorized,
    candidateDerivationAuthorized:
      gejuHiddenStemReview.candidateDerivationAuthorized,
  },
  i53: {
    version:
      I53_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_ACTIVATION_PERSISTENCE_METHODOLOGY_REVIEW_VERSION,
    topologyStateCount: i53.authorizedContestTopologyStates.length,
    directContestTopologyToActivationVerdictAuthorized:
      i53.directContestTopologyToActivationVerdictAuthorized,
    directContestTopologyToPersistenceVerdictAuthorized:
      i53.directContestTopologyToPersistenceVerdictAuthorized,
    numericSupportWeightingAuthorized: i53.numericSupportWeightingAuthorized,
  },
  publicClassic: {
    i250Version:
      I250_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_FRONTIER_READINESS_REVIEW_VERSION,
    i251Version:
      I251_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_SOURCE_EVIDENCE_VERSION,
    i252Version:
      I252_PUBLIC_CLASSIC_HIDDEN_STEM_INTERACTION_EVIDENCE_ADEQUACY_METHODOLOGY_REVIEW_VERSION,
    researchQuestionCount: I250_RESEARCH_QUESTION_IDS.length,
    adequacyRequirementCount: I252_REQUIREMENT_IDS.length,
    boundedMethodologyScope:
      'EXPLICIT_BRANCH_CLASH_HIDDEN_STEM_INTERACTION_WITH_VISIBILITY_POSITION_SEASON_AND_PLURALITY_QUALIFIERS',
    universalHiddenStemInteractionAuthorized: false,
    arbitraryHiddenStemCoPresenceInteractionAuthorized: false,
    numericSeasonWeightAuthorized: false,
    numericPluralityWeightAuthorized: false,
    numericPositionWeightAuthorized: false,
    damageMagnitudeAuthorized: false,
    productionPromotionAuthorized: false,
  },
  lowAuthority: {
    punishmentProductionAuthorityPromoted: R144_AUTHORITY.productionAuthorityPromoted,
    harmBreakProductionAuthorityPromoted: R145_AUTHORITY.productionAuthorityPromoted,
    punishmentRelationEffectResolverAuthorized:
      R144_AUTHORITY.relationEffectResolverAuthorized,
    harmBreakConflictSettlementAuthorized:
      R145_AUTHORITY.harmBreakConflictSettlementAuthorized,
  },
});

export const R146_AUTHORITY = Object.freeze({
  status: 'RESEARCH_HIDDEN_STEM_ACTIVATION_PROVENANCE_CORPUS_COMPLETE' as const,
  researchOnly: true,
  r060MechanismsReplayed: true,
  r073TemporalStatesReplayed: true,
  publicClassicFrontierQuestionsReplayed: true,
  i53ContestTopologiesReplayed: true,
  lowAuthorityInteractionControlsReplayed: true,
  hiddenMembershipDistinctFromActivationObserved: true,
  manifestationDistinctFromActivationObserved: true,
  configurationInteractionDistinctFromPerMemberActivationObserved: true,
  sourceBoundedInteractionDistinctFromRuntimeActivationObserved: true,
  temporaryOperativeStateDistinctFromPermanentNatalMutationObserved: true,
  boundedRoleSubstitutionDistinctFromGeneralizedReassignmentObserved: true,
  runtimeActivationFactAuthorized: false,
  perMemberActivationResolverAuthorized: false,
  activationPersistenceVerdictAuthorized: false,
  permanentNatalMutationAuthorized: false,
  concreteEventAuthorized: false,
  effectiveForceAuthorized: false,
  fixedPolarityAuthorized: false,
  numericActivationWeightAuthorized: false,
  generalizedRoleReassignmentAuthorized: false,
  yongXiJiReassignmentAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
