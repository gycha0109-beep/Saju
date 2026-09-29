import {
  R074_ANNUAL_STEM_BRANCH_PRECEDENCE_VERSION,
  R074_AUTHORITY,
  R074_EXECUTION_GAPS,
  R074_PROPOSITIONS,
} from './general-natal-annual-stem-branch-precedence.js';
import {
  GENERAL_ANNUAL_AUTHORITY_BRIDGE_REVIEW_VERSION,
  buildGeneralAnnualAuthorityBridgeReview,
} from './general-annual-authority-bridge-review.js';
import {
  R151_AUTHORITY,
  R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION,
} from './general-natal-dayun-temporal-overlay-replay-corpus.js';
import {
  R152_AUTHORITY,
  R152_DAYUN_STEM_BRANCH_METHODOLOGY_DIVERGENCE_VERSION,
} from './general-natal-dayun-stem-branch-methodology-divergence-corpus.js';

export const R153_ANNUAL_STEM_BRANCH_DAYUN_LAYERING_VERSION =
  '0.1.0-research' as const;

export type R153AnnualProposition =
  (typeof R074_PROPOSITIONS)[number]['proposition'];

export interface R153AnnualPropositionReplayRow {
  rowId: string;
  upstreamId: string;
  sourceRepresentation: string;
  proposition: R153AnnualProposition;
  annualStemEmphasisObserved: boolean;
  annualBranchParticipationObserved: boolean;
  natalCompositionObserved: boolean;
  dayunCompositionObserved: boolean;
  numericWeightAuthorized: false;
  annualStemOnlyAuthorized: false;
  annualBranchIgnoredAuthorized: false;
  fixedStemBranchPrecedenceAuthorized: false;
  executableAnnualResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const propositionFlags = (
  proposition: R153AnnualProposition,
): Pick<
  R153AnnualPropositionReplayRow,
  | 'annualStemEmphasisObserved'
  | 'annualBranchParticipationObserved'
  | 'natalCompositionObserved'
  | 'dayunCompositionObserved'
> => {
  switch (proposition) {
    case 'ANNUAL_STEM_EMPHASIS':
      return {
        annualStemEmphasisObserved: true,
        annualBranchParticipationObserved: false,
        natalCompositionObserved: false,
        dayunCompositionObserved: false,
      };
    case 'ANNUAL_BRANCH_REMAINS_OPERATIVE':
    case 'STEM_BRANCH_ROOT_SUPPORT_MODULATES_EFFECT':
      return {
        annualStemEmphasisObserved: false,
        annualBranchParticipationObserved: true,
        natalCompositionObserved: false,
        dayunCompositionObserved: false,
      };
    case 'ANNUAL_STATE_COMPOSES_WITH_DAYUN_AND_NATAL':
      return {
        annualStemEmphasisObserved: false,
        annualBranchParticipationObserved: true,
        natalCompositionObserved: true,
        dayunCompositionObserved: true,
      };
  }
};

export const R153_ANNUAL_PROPOSITION_ROWS: readonly R153AnnualPropositionReplayRow[] =
  Object.freeze(
    R074_PROPOSITIONS.map((item, index) => {
      const flags = propositionFlags(item.proposition);
      return Object.freeze({
        rowId: 'R153-R074-' + String(index + 1).padStart(2, '0'),
        upstreamId: item.id,
        sourceRepresentation: item.sourceRepresentation,
        proposition: item.proposition,
        ...flags,
        numericWeightAuthorized: false as const,
        annualStemOnlyAuthorized: false as const,
        annualBranchIgnoredAuthorized: false as const,
        fixedStemBranchPrecedenceAuthorized: false as const,
        executableAnnualResolverAuthorized: false as const,
        interpretationClaimEmissionAuthorized: false as const,
        productionAuthorityPromoted: false as const,
      });
    }),
  );

export type R153LayerRequirementId =
  | 'ANNUAL_STEM_COMPONENT_RETAINED'
  | 'ANNUAL_BRANCH_COMPONENT_RETAINED'
  | 'NATAL_DAY_STEM_CONTEXT_REQUIRED'
  | 'DAYUN_CONTEXT_REQUIRED'
  | 'MEETING_COMBINATION_CHECK_REQUIRED'
  | 'PUNISHMENT_CLASH_CHECK_REQUIRED';

export type R153LayerRequirementKind =
  | 'INTRA_ANNUAL_COMPONENT'
  | 'NATAL_COMPOSITION'
  | 'DAYUN_COMPOSITION'
  | 'CROSS_LAYER_RELATION_CHECK';

export interface R153LayerRequirementRow {
  rowId: string;
  requirementId: R153LayerRequirementId;
  requirementKind: R153LayerRequirementKind;
  sourceRefs: readonly string[];
  meaning: string;
  requiredForFaithfulR074Composition: true;
  dayunMethodVariancePreserved: boolean;
  annualFactRemainsInputEvidence: true;
  crossLayerWinnerAuthorized: false;
  fixedStemBranchPrecedenceAuthorized: false;
  numericWeightAuthorized: false;
  eventBridgeAuthorized: false;
  executableCompositionAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const layerRow = (
  value: Omit<
    R153LayerRequirementRow,
    | 'requiredForFaithfulR074Composition'
    | 'annualFactRemainsInputEvidence'
    | 'crossLayerWinnerAuthorized'
    | 'fixedStemBranchPrecedenceAuthorized'
    | 'numericWeightAuthorized'
    | 'eventBridgeAuthorized'
    | 'executableCompositionAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R153LayerRequirementRow =>
  Object.freeze({
    ...value,
    requiredForFaithfulR074Composition: true,
    annualFactRemainsInputEvidence: true,
    crossLayerWinnerAuthorized: false,
    fixedStemBranchPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    eventBridgeAuthorized: false,
    executableCompositionAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R153_LAYER_REQUIREMENT_ROWS: readonly R153LayerRequirementRow[] =
  Object.freeze([
    layerRow({
      rowId: 'R153-LAYER-01',
      requirementId: 'ANNUAL_STEM_COMPONENT_RETAINED',
      requirementKind: 'INTRA_ANNUAL_COMPONENT',
      sourceRefs: [
        'R074:YUANHAI-ANNUAL-STEM-EMPHASIS',
        'R074:LIUNIANFU-BRANCH-OPERATIVE',
      ],
      meaning:
        'Annual stem emphasis must remain representable without collapsing the annual pillar to stem-only semantics.',
      dayunMethodVariancePreserved: false,
    }),
    layerRow({
      rowId: 'R153-LAYER-02',
      requirementId: 'ANNUAL_BRANCH_COMPONENT_RETAINED',
      requirementKind: 'INTRA_ANNUAL_COMPONENT',
      sourceRefs: [
        'R074:LIUNIANFU-BRANCH-OPERATIVE',
        'R074:SUIYUN-ROOT-SUPPORT',
      ],
      meaning:
        'Annual branch participation and root/support context remain operative and cannot be discarded by stem emphasis.',
      dayunMethodVariancePreserved: false,
    }),
    layerRow({
      rowId: 'R153-LAYER-03',
      requirementId: 'NATAL_DAY_STEM_CONTEXT_REQUIRED',
      requirementKind: 'NATAL_COMPOSITION',
      sourceRefs: ['R074:SUIYUN-COMPOSITION'],
      meaning:
        'R074 composition explicitly begins with annual-state comparison against natal day-stem context before any event conclusion.',
      dayunMethodVariancePreserved: false,
    }),
    layerRow({
      rowId: 'R153-LAYER-04',
      requirementId: 'DAYUN_CONTEXT_REQUIRED',
      requirementKind: 'DAYUN_COMPOSITION',
      sourceRefs: [
        'R074:SUIYUN-COMPOSITION',
        'R151:NATAL_DAYUN_TEMPORAL_OVERLAY',
        'R152:DAYUN_METHOD_DIVERGENCE',
      ],
      meaning:
        'Annual state must be composed with Dayun context, while R152 unresolved Dayun stem/branch methodology remains unresolved rather than silently selected.',
      dayunMethodVariancePreserved: true,
    }),
    layerRow({
      rowId: 'R153-LAYER-05',
      requirementId: 'MEETING_COMBINATION_CHECK_REQUIRED',
      requirementKind: 'CROSS_LAYER_RELATION_CHECK',
      sourceRefs: ['R074:SUIYUN-COMPOSITION'],
      meaning:
        'Meeting and combination relations are explicit cross-layer checks within the R074 composition statement.',
      dayunMethodVariancePreserved: true,
    }),
    layerRow({
      rowId: 'R153-LAYER-06',
      requirementId: 'PUNISHMENT_CLASH_CHECK_REQUIRED',
      requirementKind: 'CROSS_LAYER_RELATION_CHECK',
      sourceRefs: ['R074:SUIYUN-COMPOSITION'],
      meaning:
        'Punishment and clash relations are explicit cross-layer checks but do not establish a global precedence winner or deterministic event.',
      dayunMethodVariancePreserved: true,
    }),
  ]);

const annualBridge = buildGeneralAnnualAuthorityBridgeReview();

export interface R153GovernanceGuard {
  guardId: string;
  upstreamAsset: 'R074' | 'R151' | 'R152' | 'GENERAL_ANNUAL_BRIDGE';
  boundary: string;
  satisfied: boolean;
  executableCompositionAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const guard = (
  value: Omit<
    R153GovernanceGuard,
    | 'executableCompositionAuthorized'
    | 'interpretationClaimEmissionAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R153GovernanceGuard =>
  Object.freeze({
    ...value,
    executableCompositionAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R153_GOVERNANCE_GUARDS: readonly R153GovernanceGuard[] =
  Object.freeze([
    guard({
      guardId: 'R153-GUARD-R074',
      upstreamAsset: 'R074',
      boundary:
        'Annual stem emphasis coexists with branch participation; numeric weighting and fixed precedence remain unauthorized.',
      satisfied:
        !R074_AUTHORITY.annualStemOnlyAuthorized &&
        !R074_AUTHORITY.universalNumericWeightAuthorized &&
        !R074_AUTHORITY.executableAnnualPrecedenceResolverAuthorized,
    }),
    guard({
      guardId: 'R153-GUARD-R151',
      upstreamAsset: 'R151',
      boundary:
        'Dayun remains a natal-relative temporal overlay rather than an independent score or permanent natal rewrite.',
      satisfied:
        R151_AUTHORITY.natalBaselineDistinctFromTemporalOverlayObserved &&
        R151_AUTHORITY.dayunMeaningDependsOnNatalContextObserved &&
        !R151_AUTHORITY.generalTemporalTransitionResolverAuthorized &&
        !R151_AUTHORITY.permanentNatalMutationAuthorized,
    }),
    guard({
      guardId: 'R153-GUARD-R152',
      upstreamAsset: 'R152',
      boundary:
        'Annual composition cannot silently select one Dayun stem/branch methodology while R152 method resolution remains unauthorized.',
      satisfied:
        R152_AUTHORITY.methodologyFormulationVarianceObserved &&
        !R152_AUTHORITY.fiveYearStemBranchAssignmentAuthorized &&
        !R152_AUTHORITY.methodWinnerResolverAuthorized &&
        !R152_AUTHORITY.executableDayunWeightingResolverAuthorized,
    }),
    guard({
      guardId: 'R153-GUARD-GENERAL-ANNUAL-BRIDGE',
      upstreamAsset: 'GENERAL_ANNUAL_BRIDGE',
      boundary:
        'Annual temporal facts are input evidence only; annual-specific semantic authority remains RETURN_TO_RESEARCH.',
      satisfied:
        annualBridge.decision.disposition === 'RETURN_TO_RESEARCH' &&
        annualBridge.temporalFactBoundary
          .annualPillarIsInputFactNotInterpretationAuthority &&
        annualBridge.temporalFactBoundary
          .annualStemTenGodIsInputFactNotThemeAuthority &&
        annualBridge.temporalFactBoundary
          .annualBranchRelationIsInputFactNotEventAuthority &&
        !annualBridge.authorityState.annualSpecificSourceAuthorityEstablished &&
        !annualBridge.authorityState.engineAuthorityPromotionAuthorized &&
        !annualBridge.authorityState.officialReadingAuthorityAuthorized &&
        !annualBridge.authorityState.productionAdmissionAuthority,
    }),
  ]);

export const R153_REJECTED_COLLAPSES = Object.freeze([
  'ANNUAL_STEM_ONLY',
  'ANNUAL_BRANCH_IGNORED',
  'ANNUAL_STEM_ALWAYS_WINS_BRANCH',
  'ANNUAL_STEM_70_BRANCH_30',
  'ANNUAL_BRANCH_30_STEM_70',
  'ANNUAL_ROOT_SUPPORT_AS_NUMERIC_MULTIPLIER',
  'DAYUN_METHOD_AUTO_SELECTED_DURING_ANNUAL_COMPOSITION',
  'R152_SOURCE_COUNT_AS_DAYUN_METHOD_WINNER',
  'R152_FIRST_MATCH_AS_DAYUN_METHOD_SELECTION',
  'ANNUAL_OVER_DAYUN_GLOBAL_PRECEDENCE',
  'DAYUN_OVER_ANNUAL_GLOBAL_PRECEDENCE',
  'NATAL_DAY_STEM_COMPARISON_AS_EVENT_PREDICTION',
  'MEETING_COMBINATION_CHECK_AS_EVENT_GUARANTEE',
  'PUNISHMENT_CLASH_CHECK_AS_EVENT_GUARANTEE',
  'CROSS_LAYER_RELATION_COUNT_AS_SEVERITY',
  'ANNUAL_PILLAR_AS_INTERPRETATION_AUTHORITY',
  'ANNUAL_STEM_TEN_GOD_AS_THEME_AUTHORITY',
  'ANNUAL_BRANCH_RELATION_AS_EVENT_AUTHORITY',
  'EXECUTABLE_RESEARCH_CANDIDATE_AS_ENGINE_AUTHORITY',
] as const);

const propositionFlagCount = (
  key:
    | 'annualStemEmphasisObserved'
    | 'annualBranchParticipationObserved'
    | 'natalCompositionObserved'
    | 'dayunCompositionObserved',
): number => R153_ANNUAL_PROPOSITION_ROWS.filter((item) => item[key]).length;

const layerKindCount = (kind: R153LayerRequirementKind): number =>
  R153_LAYER_REQUIREMENT_ROWS.filter((item) => item.requirementKind === kind)
    .length;

export const R153_SUMMARY = Object.freeze({
  annualPropositionReplayCount: R153_ANNUAL_PROPOSITION_ROWS.length,
  layerRequirementCount: R153_LAYER_REQUIREMENT_ROWS.length,
  totalCorpusRowCount:
    R153_ANNUAL_PROPOSITION_ROWS.length + R153_LAYER_REQUIREMENT_ROWS.length,
  annualStemEmphasisObservedCount: propositionFlagCount(
    'annualStemEmphasisObserved',
  ),
  annualBranchParticipationObservedCount: propositionFlagCount(
    'annualBranchParticipationObserved',
  ),
  natalCompositionObservedCount: propositionFlagCount(
    'natalCompositionObserved',
  ),
  dayunCompositionObservedCount: propositionFlagCount(
    'dayunCompositionObserved',
  ),
  intraAnnualComponentRequirementCount: layerKindCount(
    'INTRA_ANNUAL_COMPONENT',
  ),
  natalCompositionRequirementCount: layerKindCount('NATAL_COMPOSITION'),
  dayunCompositionRequirementCount: layerKindCount('DAYUN_COMPOSITION'),
  crossLayerRelationCheckRequirementCount: layerKindCount(
    'CROSS_LAYER_RELATION_CHECK',
  ),
  dayunMethodVariancePreservedRequirementCount:
    R153_LAYER_REQUIREMENT_ROWS.filter(
      (item) => item.dayunMethodVariancePreserved,
    ).length,
  governanceGuardCount: R153_GOVERNANCE_GUARDS.length,
  executableCompositionAuthorizedCount:
    R153_LAYER_REQUIREMENT_ROWS.filter(
      (item) => item.executableCompositionAuthorized,
    ).length,
  interpretationClaimEmissionAuthorizedCount:
    R153_LAYER_REQUIREMENT_ROWS.filter(
      (item) => item.interpretationClaimEmissionAuthorized,
    ).length,
  productionAuthorityPromotedCount:
    R153_LAYER_REQUIREMENT_ROWS.filter(
      (item) => item.productionAuthorityPromoted,
    ).length,
});

export const R153_UPSTREAM_BINDINGS = Object.freeze({
  r074: {
    version: R074_ANNUAL_STEM_BRANCH_PRECEDENCE_VERSION,
    propositionCount: R074_AUTHORITY.propositionCount,
    annualStemOnlyAuthorized: R074_AUTHORITY.annualStemOnlyAuthorized,
    universalNumericWeightAuthorized:
      R074_AUTHORITY.universalNumericWeightAuthorized,
    executableAnnualPrecedenceResolverAuthorized:
      R074_AUTHORITY.executableAnnualPrecedenceResolverAuthorized,
    executionGaps: R074_EXECUTION_GAPS,
  },
  r151: {
    version: R151_NATAL_DAYUN_TEMPORAL_OVERLAY_REPLAY_VERSION,
    natalBaselineDistinctFromTemporalOverlayObserved:
      R151_AUTHORITY.natalBaselineDistinctFromTemporalOverlayObserved,
    dayunMeaningDependsOnNatalContextObserved:
      R151_AUTHORITY.dayunMeaningDependsOnNatalContextObserved,
    generalTemporalTransitionResolverAuthorized:
      R151_AUTHORITY.generalTemporalTransitionResolverAuthorized,
    permanentNatalMutationAuthorized:
      R151_AUTHORITY.permanentNatalMutationAuthorized,
  },
  r152: {
    version: R152_DAYUN_STEM_BRANCH_METHODOLOGY_DIVERGENCE_VERSION,
    methodologyFormulationVarianceObserved:
      R152_AUTHORITY.methodologyFormulationVarianceObserved,
    fiveYearStemBranchAssignmentAuthorized:
      R152_AUTHORITY.fiveYearStemBranchAssignmentAuthorized,
    methodWinnerResolverAuthorized:
      R152_AUTHORITY.methodWinnerResolverAuthorized,
    executableDayunWeightingResolverAuthorized:
      R152_AUTHORITY.executableDayunWeightingResolverAuthorized,
  },
  generalAnnualBridge: {
    version: GENERAL_ANNUAL_AUTHORITY_BRIDGE_REVIEW_VERSION,
    disposition: annualBridge.decision.disposition,
    annualPillarIsInputFactNotInterpretationAuthority:
      annualBridge.temporalFactBoundary
        .annualPillarIsInputFactNotInterpretationAuthority,
    annualStemTenGodIsInputFactNotThemeAuthority:
      annualBridge.temporalFactBoundary
        .annualStemTenGodIsInputFactNotThemeAuthority,
    annualBranchRelationIsInputFactNotEventAuthority:
      annualBridge.temporalFactBoundary
        .annualBranchRelationIsInputFactNotEventAuthority,
    annualSpecificSourceAuthorityEstablished:
      annualBridge.authorityState.annualSpecificSourceAuthorityEstablished,
    engineAuthorityPromotionAuthorized:
      annualBridge.authorityState.engineAuthorityPromotionAuthorized,
    officialReadingAuthorityAuthorized:
      annualBridge.authorityState.officialReadingAuthorityAuthorized,
    productionAdmissionAuthority:
      annualBridge.authorityState.productionAdmissionAuthority,
  },
});

export const R153_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_ANNUAL_STEM_BRANCH_DAYUN_LAYERING_COMPOSITION_COMPLETE' as const,
  researchOnly: true,
  annualStemEmphasisWithBranchParticipationPreserved: true,
  annualStemBranchRootSupportDependencyObserved: true,
  natalAnnualCompositionRequirementObserved: true,
  dayunAnnualCompositionRequirementObserved: true,
  crossLayerMeetingCombinationCheckObserved: true,
  crossLayerPunishmentClashCheckObserved: true,
  unresolvedDayunMethodologyPropagatedObserved: true,
  annualFactsDistinctFromInterpretationAuthorityObserved: true,
  annualSpecificAuthorityReturnToResearchObserved: true,
  annualStemOnlyAuthorized: false,
  annualBranchIgnoringAuthorized: false,
  fixedAnnualStemBranchPrecedenceAuthorized: false,
  numericAnnualWeightAuthorized: false,
  automaticDayunMethodSelectionAuthorized: false,
  crossLayerPrecedenceResolverAuthorized: false,
  deterministicAnnualEventAuthorized: false,
  executableAnnualCompositionResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
