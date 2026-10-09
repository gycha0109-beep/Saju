import { createHash } from 'node:crypto';
import { getHeavenlyStemElement } from 'manseryeok';
import {
  resolveStructuralRoleImpact,
  type ResolvedStructuralRoleImpact,
  type StructuralRoleAssignment,
  type UnavailableStructuralRoleImpact,
} from '../calculation/structural-role-impact.js';
import { getHiddenStemMembership } from '../calculation/hidden-stems.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  PillarFact,
  StemInteractionSettlementFact,
} from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import {
  buildAnnualInterpretationFacts,
  type AnnualInterpretationFacts,
} from './annual-interpretation-facts.js';
import {
  createGovernedAnnualStructuralImpactBundleV1,
  type GovernedAnnualStructuralImpactBundleV1,
} from './annual-structural-impact-bundle.js';
import {
  resolveDayunTemporalContext,
  type UnavailableDayunTemporalContext,
} from './dayun-temporal-context.js';
import { buildTemporalReadingContext } from './temporal-reading-context.js';

export const ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY = Object.freeze({
  policyId: 'myeongha/annual-structural-impact-producer-v1',
  policyVersion: '1.6.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2377',
  scope: 'ISOLATED_LIUHE_LIUCHONG_SELF_PUNISHMENT_ZIMAO_OR_DIRECTED_PUNISHMENT_PAIR_QUALIFIER_SINGLE_DAYUN_SEGMENT_STEM_OVERLAY',
  annualRule: 'RETAIN_STEM_AND_BRANCH_CONTEXT',
  dayunRule: 'REQUIRE_ONE_ACTIVE_DAYUN_SEGMENT',
  stemSourceRule: 'ANNUAL_AND_DAYUN_STEMS_COEXIST_WITHOUT_PRECEDENCE',
  directRelationRule: 'INCOMING_ELEMENT_CONTROL_OR_GENERATION_ONLY',
  sameTargetConflictRule: 'CONTROL_OVER_SUPPORT',
  natalStateRule: 'START_FROM_CANONICAL_R191_FINAL_STATE',
  branchRule:
    'ADMIT_ONE_ISOLATED_SIX_COMBINATION_SIX_CLASH_SELF_PUNISHMENT_ZIMAO_OR_DIRECTED_PUNISHMENT_PAIR_AS_QUALIFIER_OTHERWISE_FAIL_CLOSED',
  sixCombinationRule:
    'QUALIFIER_ONLY_NO_TRANSFORMATION_OR_CONFLICT_RESOLUTION',
  sixClashRule:
    'PAIR_IDENTITY_ONLY_NO_EFFECT_POLARITY_OR_CONFLICT_RESOLUTION',
  selfPunishmentRule:
    'RELATION_IDENTITY_ONLY_NO_PUNISHMENT_EFFECT_POLARITY_OR_CONFLICT_RESOLUTION',
  punishmentPairRule:
    'ZIMAO_RELATION_IDENTITY_ONLY_NO_PUNISHMENT_EFFECT_POLARITY_OR_CONFLICT_RESOLUTION',
  punishmentFamilyDetectionRule:
    'SOURCE_DIRECTED_PAIR_IDENTITY_ONLY',
  directedPunishmentPairRule:
    'SOURCE_DIRECTION_IDENTITY_ONLY_NO_PUNISHMENT_EFFECT_POLARITY_CONFLICT_RESOLUTION_OR_FAMILY_AMPLIFICATION',
  rootRule: 'OBSERVE_AS_QUALIFIER_WITHOUT_WEIGHT_OR_OVERRIDE',
  boundaryRule: 'FAIL_CLOSED_ON_MULTI_DAYUN_SEGMENT_YEAR',
  mutationRule: 'DO_NOT_MUTATE_CANONICAL_NATAL_SETTLEMENT',
  numericWeightRule: 'NONE',
  effectRule: 'REQUIRE_TEMPORAL_FUNCTION_STATE_CHANGE',
  eventRule: 'NONE',
  extendsDecisionRef: 'GH-2369',
} as const);

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;
  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

export const ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY_CONTENT_HASH =
  createHash('sha256')
    .update(JSON.stringify(canonicalize(ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY)))
    .digest('hex');

export type AnnualTemporalStemLayer = 'annual' | 'dayun';

export interface AnnualTemporalStemSourceV1 {
  layer: AnnualTemporalStemLayer;
  stem: HeavenlyStem;
  element: FiveElement;
}

export interface AnnualTemporalStemInfluenceV1 {
  influenceId: string;
  sourceLayer: AnnualTemporalStemLayer;
  sourceStem: HeavenlyStem;
  sourceElement: FiveElement;
  targetRole: 'controller' | 'controlled';
  targetStem: HeavenlyStem;
  targetElement: FiveElement;
  kind: 'control' | 'support';
}

export interface AnnualTemporalRootSupportObservationV1 {
  layer: AnnualTemporalStemLayer;
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  stemElement: FiveElement;
  hiddenStems: readonly HeavenlyStem[];
  sameElementHiddenStems: readonly HeavenlyStem[];
  rootSupportObserved: boolean;
  semantics: {
    qualifierOnly: true;
    numericWeightAssigned: false;
    functionStateOverrideAuthorized: false;
    temporalPrecedenceAuthorized: false;
  };
}

export interface AnnualTemporalSixCombinationObservationV1 {
  relationId: string;
  relationKind: 'six_combination';
  semantics: {
    qualifierOnly: true;
    bindingObserved: true;
    transformationApplied: false;
    conflictResolutionAuthorized: false;
    functionStateOverrideAuthorized: false;
    temporalPrecedenceAuthorized: false;
    numericWeightAssigned: false;
  };
}

export interface AnnualTemporalSixClashObservationV1 {
  relationId: string;
  relationKind: 'clash';
  semantics: {
    qualifierOnly: true;
    pairIdentityObserved: true;
    effectiveClashAuthorized: false;
    conflictResolutionAuthorized: false;
    favorableOrHarmfulInferenceAuthorized: false;
    functionStateOverrideAuthorized: false;
    temporalPrecedenceAuthorized: false;
    numericWeightAssigned: false;
  };
}

export interface AnnualTemporalSelfPunishmentObservationV1 {
  relationId: string;
  relationKind: 'self_punishment';
  semantics: {
    qualifierOnly: true;
    relationIdentityObserved: true;
    repeatedSameBranchObserved: true;
    punishmentEffectAuthorized: false;
    favorableOrHarmfulInferenceAuthorized: false;
    conflictResolutionAuthorized: false;
    functionStateOverrideAuthorized: false;
    temporalPrecedenceAuthorized: false;
    numericWeightAssigned: false;
  };
}

export interface AnnualTemporalPunishmentPairObservationV1 {
  relationId: string;
  relationKind: 'punishment_pair';
  semantics: {
    qualifierOnly: true;
    relationIdentityObserved: true;
    reciprocalPunishmentPairObserved: true;
    punishmentEffectAuthorized: false;
    favorableOrHarmfulInferenceAuthorized: false;
    conflictResolutionAuthorized: false;
    functionStateOverrideAuthorized: false;
    temporalPrecedenceAuthorized: false;
    numericWeightAssigned: false;
  };
}

export interface AnnualTemporalDirectedPunishmentPairObservationV1 {
  relationId: string;
  relationKind: 'punishment_directed_pair';
  punisherBranch: EarthlyBranch;
  punishedBranch: EarthlyBranch;
  semantics: {
    qualifierOnly: true;
    relationIdentityObserved: true;
    sourceDirectionObserved: true;
    punishmentEffectAuthorized: false;
    favorableOrHarmfulInferenceAuthorized: false;
    conflictResolutionAuthorized: false;
    functionStateOverrideAuthorized: false;
    temporalPrecedenceAuthorized: false;
    numericWeightAssigned: false;
    fullFamilyAmplificationAuthorized: false;
  };
}

export interface AnnualTemporalSettlementOverlayV1 {
  overlayId: string;
  baseSettlementId: string;
  targetYear: number;
  temporalSources: readonly AnnualTemporalStemSourceV1[];
  temporalInfluences: readonly AnnualTemporalStemInfluenceV1[];
  settlement: StemInteractionSettlementFact;
}

export interface ResolvedAnnualStructuralImpactProductionV1 {
  status: 'resolved';
  producerId: string;
  snapshotId: string;
  targetYear: number;
  structureId: string;
  annualFacts: AnnualInterpretationFacts;
  dayunContextId: string;
  dayunSegmentIndex: number;
  dayunPillar: PillarFact;
  rootSupportObservations: readonly AnnualTemporalRootSupportObservationV1[];
  sixCombinationObservations: readonly AnnualTemporalSixCombinationObservationV1[];
  sixClashObservations: readonly AnnualTemporalSixClashObservationV1[];
  selfPunishmentObservations: readonly AnnualTemporalSelfPunishmentObservationV1[];
  punishmentPairObservations: readonly AnnualTemporalPunishmentPairObservationV1[];
  directedPunishmentPairObservations: readonly AnnualTemporalDirectedPunishmentPairObservationV1[];
  overlays: readonly AnnualTemporalSettlementOverlayV1[];
  assessments: readonly ResolvedStructuralRoleImpact[];
  bundle: GovernedAnnualStructuralImpactBundleV1;
}

export interface UnavailableAnnualStructuralImpactProductionV1 {
  status: 'unavailable';
  snapshotId: string;
  targetYear?: number;
  structureId: string;
  reasonCode:
    | 'annual_request_required'
    | 'annual_target_period_required'
    | 'annual_context_unavailable'
    | 'annual_facts_unavailable'
    | 'dayun_context_unavailable'
    | 'dayun_boundary_year_unsupported'
    | 'natal_settlements_unavailable'
    | 'no_natal_stem_settlements'
    | 'natal_pillar_unavailable'
    | 'branch_relation_requires_settlement'
    | 'no_temporal_stem_effect'
    | 'structural_role_impact_unavailable';
  dayunReasonCode?: UnavailableDayunTemporalContext['reasonCode'];
  structuralRoleReasonCode?: UnavailableStructuralRoleImpact['reasonCode'];
  settlementId?: string;
  branchRelationIds?: readonly string[];
}

export type AnnualStructuralImpactProductionResultV1 =
  | ResolvedAnnualStructuralImpactProductionV1
  | UnavailableAnnualStructuralImpactProductionV1;

const ELEMENT_CONTROLS = Object.freeze({
  목: '토',
  화: '금',
  토: '수',
  금: '목',
  수: '화',
} as const satisfies Readonly<Record<FiveElement, FiveElement>>);

const ELEMENT_GENERATES = Object.freeze({
  목: '화',
  화: '토',
  토: '금',
  금: '수',
  수: '목',
} as const satisfies Readonly<Record<FiveElement, FiveElement>>);

const BRANCH_SIX_COMBINATIONS = [
  ['자', '축'],
  ['인', '해'],
  ['묘', '술'],
  ['진', '유'],
  ['사', '신'],
  ['오', '미'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch])[];

const BRANCH_CLASHES = [
  ['자', '오'],
  ['축', '미'],
  ['인', '신'],
  ['묘', '유'],
  ['진', '술'],
  ['사', '해'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch])[];

const BRANCH_THREE_COMBINATIONS = [
  ['인', '오', '술'],
  ['사', '유', '축'],
  ['신', '자', '진'],
  ['해', '묘', '미'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch, EarthlyBranch])[];

const BRANCH_DIRECTED_PUNISHMENT_PAIRS = [
  ['인', '사'],
  ['사', '신'],
  ['신', '인'],
  ['축', '술'],
  ['술', '미'],
  ['미', '축'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch])[];

const BRANCH_PUNISHMENT_PAIRS = [
  ['자', '묘'],
] as const satisfies readonly (readonly [EarthlyBranch, EarthlyBranch])[];

const SELF_PUNISHMENT_BRANCHES = new Set<EarthlyBranch>(['진', '오', '유', '해']);

interface BranchLayerValue {
  key: string;
  layer: 'annual' | 'dayun' | 'natal';
  branch: EarthlyBranch;
}

function pairMatches(
  left: EarthlyBranch,
  right: EarthlyBranch,
  pairs: readonly (readonly [EarthlyBranch, EarthlyBranch])[],
): boolean {
  return pairs.some(
    ([a, b]) => (left === a && right === b) || (left === b && right === a),
  );
}

function directedPunishmentPair(
  left: BranchLayerValue,
  right: BranchLayerValue,
):
  | {
      punisher: BranchLayerValue;
      punished: BranchLayerValue;
    }
  | undefined {
  for (const [punisherBranch, punishedBranch] of BRANCH_DIRECTED_PUNISHMENT_PAIRS) {
    if (left.branch === punisherBranch && right.branch === punishedBranch) {
      return { punisher: left, punished: right };
    }
    if (right.branch === punisherBranch && left.branch === punishedBranch) {
      return { punisher: right, punished: left };
    }
  }
  return undefined;
}

function directInfluenceKind(
  source: FiveElement,
  target: FiveElement,
): AnnualTemporalStemInfluenceV1['kind'] | undefined {
  if (ELEMENT_CONTROLS[source] === target) return 'control';
  if (ELEMENT_GENERATES[source] === target) return 'support';
  return undefined;
}

function temporalInfluencesForSettlement(
  settlement: StemInteractionSettlementFact,
  sources: readonly AnnualTemporalStemSourceV1[],
): readonly AnnualTemporalStemInfluenceV1[] {
  const result: AnnualTemporalStemInfluenceV1[] = [];
  for (const source of sources) {
    for (const targetRole of ['controller', 'controlled'] as const) {
      const target = settlement.participants[targetRole];
      const kind = directInfluenceKind(source.element, target.element);
      if (kind === undefined) continue;
      result.push({
        influenceId:
          `${kind}:${source.layer}:${source.stem}->${targetRole}:${target.stem}`,
        sourceLayer: source.layer,
        sourceStem: source.stem,
        sourceElement: source.element,
        targetRole,
        targetStem: target.stem,
        targetElement: target.element,
        kind,
      });
    }
  }
  return result.sort((a, b) => a.influenceId.localeCompare(b.influenceId));
}

function hasControl(
  influences: readonly AnnualTemporalStemInfluenceV1[],
  targetRole: 'controller' | 'controlled',
): boolean {
  return influences.some(
    (item) => item.targetRole === targetRole && item.kind === 'control',
  );
}

function hasSupport(
  influences: readonly AnnualTemporalStemInfluenceV1[],
  targetRole: 'controller' | 'controlled',
): boolean {
  return influences.some(
    (item) => item.targetRole === targetRole && item.kind === 'support',
  );
}

export function deriveAnnualTemporalSettlementOverlayV1(
  settlement: StemInteractionSettlementFact,
  targetYear: number,
  sources: readonly AnnualTemporalStemSourceV1[],
): AnnualTemporalSettlementOverlayV1 {
  for (const source of sources) {
    if (source.element !== getHeavenlyStemElement(source.stem)) {
      throw new TypeError(
        `Temporal source element mismatch for ${source.layer}:${source.stem}.`,
      );
    }
  }
  const canonicalSources = [...sources].sort((a, b) =>
    `${a.layer}:${a.stem}`.localeCompare(`${b.layer}:${b.stem}`),
  );
  const influences = temporalInfluencesForSettlement(settlement, canonicalSources);

  const controllerBase = settlement.participants.controller.functionState;
  const controllerState =
    controllerBase === 'impaired' || hasControl(influences, 'controller')
      ? 'impaired'
      : 'constrained';
  const pairControlEffective = controllerState === 'constrained';

  const controlledBase = settlement.participants.controlled.functionState;
  const controlledState = hasControl(influences, 'controlled')
    ? 'impaired'
    : hasSupport(influences, 'controlled') || !pairControlEffective
      ? 'constrained'
      : controlledBase;

  const overlayMaterial = {
    policyContentHash: ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY_CONTENT_HASH,
    baseSettlementId: settlement.settlementId,
    targetYear,
    temporalSources: canonicalSources,
    temporalInfluences: influences,
    controllerState,
    controlledState,
    pairControlEffective,
  };
  const overlayId = `annual_settlement_overlay_${createHash('sha256')
    .update(JSON.stringify(canonicalize(overlayMaterial)))
    .digest('hex')
    .slice(0, 24)}`;

  return {
    overlayId,
    baseSettlementId: settlement.settlementId,
    targetYear,
    temporalSources: canonicalSources,
    temporalInfluences: influences,
    settlement: {
      ...settlement,
      settlementId: overlayId,
      pairControlEffective,
      participants: {
        controller: {
          ...settlement.participants.controller,
          functionState: controllerState,
        },
        controlled: {
          ...settlement.participants.controlled,
          functionState: controlledState,
        },
      },
    },
  };
}

export function deriveAnnualTemporalRootSupportObservationV1(
  layer: AnnualTemporalStemLayer,
  stem: HeavenlyStem,
  branch: EarthlyBranch,
): AnnualTemporalRootSupportObservationV1 {
  const stemElement = getHeavenlyStemElement(stem);
  const hiddenStems = [...getHiddenStemMembership(branch)];
  const sameElementHiddenStems = hiddenStems.filter(
    (hiddenStem) => getHeavenlyStemElement(hiddenStem) === stemElement,
  );
  return {
    layer,
    stem,
    branch,
    stemElement,
    hiddenStems,
    sameElementHiddenStems,
    rootSupportObserved: sameElementHiddenStems.length > 0,
    semantics: {
      qualifierOnly: true,
      numericWeightAssigned: false,
      functionStateOverrideAuthorized: false,
      temporalPrecedenceAuthorized: false,
    },
  };
}

function resolvedNatalBranches(
  snapshot: CanonicalSajuSnapshot,
): readonly BranchLayerValue[] | undefined {
  const result: BranchLayerValue[] = [];
  for (const slot of ['year', 'month', 'day', 'hour'] as const) {
    const state = snapshot.pillars[slot];
    if (state.status !== 'resolved') return undefined;
    result.push({
      key: `natal:${slot}`,
      layer: 'natal',
      branch: state.value.branch.value,
    });
  }
  return result;
}

function branchRelationIds(
  natal: readonly BranchLayerValue[],
  annualBranch: EarthlyBranch,
  dayunBranch: EarthlyBranch,
): readonly string[] {
  const values: BranchLayerValue[] = [
    ...natal,
    { key: 'annual', layer: 'annual', branch: annualBranch },
    { key: 'dayun', layer: 'dayun', branch: dayunBranch },
  ];
  const result = new Set<string>();

  for (let i = 0; i < values.length; i += 1) {
    for (let j = i + 1; j < values.length; j += 1) {
      const left = values[i];
      const right = values[j];
      if (left === undefined || right === undefined) continue;
      if (left.layer === 'natal' && right.layer === 'natal') continue;

      if (pairMatches(left.branch, right.branch, BRANCH_CLASHES)) {
        result.add(`clash:${left.key}:${left.branch}|${right.key}:${right.branch}`);
      }
      if (pairMatches(left.branch, right.branch, BRANCH_SIX_COMBINATIONS)) {
        result.add(`six_combination:${left.key}:${left.branch}|${right.key}:${right.branch}`);
      }
      if (pairMatches(left.branch, right.branch, BRANCH_PUNISHMENT_PAIRS)) {
        result.add(`punishment_pair:${left.key}:${left.branch}|${right.key}:${right.branch}`);
      }
      if (
        left.branch === right.branch &&
        SELF_PUNISHMENT_BRANCHES.has(left.branch)
      ) {
        result.add(`self_punishment:${left.key}|${right.key}:${left.branch}`);
      }
      const directedPunishment = directedPunishmentPair(left, right);
      if (directedPunishment !== undefined) {
        result.add(
          `punishment_directed_pair:punisher:${directedPunishment.punisher.key}:${directedPunishment.punisher.branch}->punished:${directedPunishment.punished.key}:${directedPunishment.punished.branch}`,
        );
      }
    }
  }

  const present = new Set(values.map((item) => item.branch));
  for (const group of BRANCH_THREE_COMBINATIONS) {
    if (!group.every((branch) => present.has(branch))) continue;
    const members = group as readonly EarthlyBranch[];
    const temporalParticipates =
      members.includes(annualBranch) || members.includes(dayunBranch);
    if (temporalParticipates) {
      result.add(`three_combination:${group.join('-')}`);
    }
  }

  return [...result].sort();
}

function isCanonicalZiMaoPunishmentPairRelationId(relationId: string): boolean {
  if (!relationId.startsWith('punishment_pair:')) return false;
  const payload = relationId.slice('punishment_pair:'.length);
  const parts = payload.split('|');
  if (parts.length !== 2) return false;
  const left = parts[0];
  const right = parts[1];
  if (left === undefined || right === undefined) return false;
  const leftBranch = left.slice(left.lastIndexOf(':') + 1);
  const rightBranch = right.slice(right.lastIndexOf(':') + 1);
  return (
    (leftBranch === '자' && rightBranch === '묘') ||
    (leftBranch === '묘' && rightBranch === '자')
  );
}

function parseCanonicalDirectedPunishmentPairRelationId(
  relationId: string,
):
  | {
      punisherBranch: EarthlyBranch;
      punishedBranch: EarthlyBranch;
    }
  | undefined {
  const prefix = 'punishment_directed_pair:punisher:';
  if (!relationId.startsWith(prefix)) return undefined;
  const payload = relationId.slice(prefix.length);
  const parts = payload.split('->punished:');
  if (parts.length !== 2) return undefined;
  const punisherPart = parts[0];
  const punishedPart = parts[1];
  if (punisherPart === undefined || punishedPart === undefined) return undefined;
  const punisherValue = punisherPart.slice(punisherPart.lastIndexOf(':') + 1);
  const punishedValue = punishedPart.slice(punishedPart.lastIndexOf(':') + 1);
  for (const [punisherBranch, punishedBranch] of BRANCH_DIRECTED_PUNISHMENT_PAIRS) {
    if (punisherValue === punisherBranch && punishedValue === punishedBranch) {
      return { punisherBranch, punishedBranch };
    }
  }
  return undefined;
}

function isolatedBranchQualifierObservations(
  relationIds: readonly string[],
):
  | {
      sixCombinationObservations: readonly AnnualTemporalSixCombinationObservationV1[];
      sixClashObservations: readonly AnnualTemporalSixClashObservationV1[];
      selfPunishmentObservations: readonly AnnualTemporalSelfPunishmentObservationV1[];
      punishmentPairObservations: readonly AnnualTemporalPunishmentPairObservationV1[];
      directedPunishmentPairObservations: readonly AnnualTemporalDirectedPunishmentPairObservationV1[];
    }
  | undefined {
  if (relationIds.length === 0) {
    return {
      sixCombinationObservations: [],
      sixClashObservations: [],
      selfPunishmentObservations: [],
      punishmentPairObservations: [],
      directedPunishmentPairObservations: [],
    };
  }
  if (relationIds.length !== 1 || relationIds[0] === undefined) {
    return undefined;
  }

  const relationId = relationIds[0];
  if (relationId.startsWith('six_combination:')) {
    return {
      sixCombinationObservations: [
        {
          relationId,
          relationKind: 'six_combination',
          semantics: {
            qualifierOnly: true,
            bindingObserved: true,
            transformationApplied: false,
            conflictResolutionAuthorized: false,
            functionStateOverrideAuthorized: false,
            temporalPrecedenceAuthorized: false,
            numericWeightAssigned: false,
          },
        },
      ],
      sixClashObservations: [],
      selfPunishmentObservations: [],
      punishmentPairObservations: [],
      directedPunishmentPairObservations: [],
    };
  }
  if (relationId.startsWith('clash:')) {
    return {
      sixCombinationObservations: [],
      sixClashObservations: [
        {
          relationId,
          relationKind: 'clash',
          semantics: {
            qualifierOnly: true,
            pairIdentityObserved: true,
            effectiveClashAuthorized: false,
            conflictResolutionAuthorized: false,
            favorableOrHarmfulInferenceAuthorized: false,
            functionStateOverrideAuthorized: false,
            temporalPrecedenceAuthorized: false,
            numericWeightAssigned: false,
          },
        },
      ],
      selfPunishmentObservations: [],
      punishmentPairObservations: [],
      directedPunishmentPairObservations: [],
    };
  }
  if (relationId.startsWith('self_punishment:')) {
    return {
      sixCombinationObservations: [],
      sixClashObservations: [],
      selfPunishmentObservations: [
        {
          relationId,
          relationKind: 'self_punishment',
          semantics: {
            qualifierOnly: true,
            relationIdentityObserved: true,
            repeatedSameBranchObserved: true,
            punishmentEffectAuthorized: false,
            favorableOrHarmfulInferenceAuthorized: false,
            conflictResolutionAuthorized: false,
            functionStateOverrideAuthorized: false,
            temporalPrecedenceAuthorized: false,
            numericWeightAssigned: false,
          },
        },
      ],
      punishmentPairObservations: [],
      directedPunishmentPairObservations: [],
    };
  }
  if (isCanonicalZiMaoPunishmentPairRelationId(relationId)) {
    return {
      sixCombinationObservations: [],
      sixClashObservations: [],
      selfPunishmentObservations: [],
      punishmentPairObservations: [
        {
          relationId,
          relationKind: 'punishment_pair',
          semantics: {
            qualifierOnly: true,
            relationIdentityObserved: true,
            reciprocalPunishmentPairObserved: true,
            punishmentEffectAuthorized: false,
            favorableOrHarmfulInferenceAuthorized: false,
            conflictResolutionAuthorized: false,
            functionStateOverrideAuthorized: false,
            temporalPrecedenceAuthorized: false,
            numericWeightAssigned: false,
          },
        },
      ],
      directedPunishmentPairObservations: [],
    };
  }

  const directedPunishment =
    parseCanonicalDirectedPunishmentPairRelationId(relationId);
  if (directedPunishment !== undefined) {
    return {
      sixCombinationObservations: [],
      sixClashObservations: [],
      selfPunishmentObservations: [],
      punishmentPairObservations: [],
      directedPunishmentPairObservations: [
        {
          relationId,
          relationKind: 'punishment_directed_pair',
          punisherBranch: directedPunishment.punisherBranch,
          punishedBranch: directedPunishment.punishedBranch,
          semantics: {
            qualifierOnly: true,
            relationIdentityObserved: true,
            sourceDirectionObserved: true,
            punishmentEffectAuthorized: false,
            favorableOrHarmfulInferenceAuthorized: false,
            conflictResolutionAuthorized: false,
            functionStateOverrideAuthorized: false,
            temporalPrecedenceAuthorized: false,
            numericWeightAssigned: false,
            fullFamilyAmplificationAuthorized: false,
          },
        },
      ],
    };
  }
  return undefined;
}

function unavailable(
  snapshot: CanonicalSajuSnapshot,
  structureId: string,
  reasonCode: UnavailableAnnualStructuralImpactProductionV1['reasonCode'],
  extras: Partial<Omit<
    UnavailableAnnualStructuralImpactProductionV1,
    'status' | 'snapshotId' | 'structureId' | 'reasonCode'
  >> = {},
): UnavailableAnnualStructuralImpactProductionV1 {
  return {
    status: 'unavailable',
    snapshotId: snapshot.snapshotId,
    structureId,
    reasonCode,
    ...extras,
  };
}

export function produceAnnualStructuralImpactBundleV1(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
  structureId: string,
  assignments: readonly StructuralRoleAssignment[],
): AnnualStructuralImpactProductionResultV1 {
  if (request.intent.temporalScope !== 'annual') {
    return unavailable(snapshot, structureId, 'annual_request_required');
  }
  if (request.targetPeriod === undefined || request.targetPeriod.scope !== 'annual') {
    return unavailable(snapshot, structureId, 'annual_target_period_required');
  }

  const targetYear = request.targetPeriod.year;
  let temporalContext;
  try {
    temporalContext = buildTemporalReadingContext(request);
  } catch {
    return unavailable(snapshot, structureId, 'annual_context_unavailable', {
      targetYear,
    });
  }
  if (temporalContext === undefined || temporalContext.scope !== 'annual') {
    return unavailable(snapshot, structureId, 'annual_context_unavailable', {
      targetYear,
    });
  }

  let annualFacts: AnnualInterpretationFacts;
  try {
    annualFacts = buildAnnualInterpretationFacts(snapshot, temporalContext);
  } catch {
    return unavailable(snapshot, structureId, 'annual_facts_unavailable', {
      targetYear,
    });
  }

  const dayun = resolveDayunTemporalContext(snapshot, targetYear);
  if (dayun.status !== 'resolved') {
    return unavailable(snapshot, structureId, 'dayun_context_unavailable', {
      targetYear,
      dayunReasonCode: dayun.reasonCode,
    });
  }
  if (dayun.segments.length !== 1) {
    return unavailable(snapshot, structureId, 'dayun_boundary_year_unsupported', {
      targetYear,
    });
  }
  const dayunSegment = dayun.segments[0];
  if (dayunSegment === undefined) {
    return unavailable(snapshot, structureId, 'dayun_context_unavailable', {
      targetYear,
    });
  }

  const settlementsState = snapshot.derivedFacts.stemInteractionSettlements;
  if (settlementsState === undefined || settlementsState.status !== 'resolved') {
    return unavailable(snapshot, structureId, 'natal_settlements_unavailable', {
      targetYear,
    });
  }
  if (settlementsState.value.length === 0) {
    return unavailable(snapshot, structureId, 'no_natal_stem_settlements', {
      targetYear,
    });
  }

  const natalBranches = resolvedNatalBranches(snapshot);
  if (natalBranches === undefined) {
    return unavailable(snapshot, structureId, 'natal_pillar_unavailable', {
      targetYear,
    });
  }

  const annualStem = annualFacts.annualPillar.stem;
  const annualBranch = annualFacts.annualPillar.branch;
  const dayunStem = dayunSegment.pillar.stem.value;
  const dayunBranch = dayunSegment.pillar.branch.value;

  const rootSupportObservations: readonly AnnualTemporalRootSupportObservationV1[] = [
    deriveAnnualTemporalRootSupportObservationV1(
      'annual',
      annualStem,
      annualBranch,
    ),
    deriveAnnualTemporalRootSupportObservationV1(
      'dayun',
      dayunStem,
      dayunBranch,
    ),
  ];

  const branchRelations = branchRelationIds(
    natalBranches,
    annualBranch,
    dayunBranch,
  );
  const branchQualifierObservations =
    isolatedBranchQualifierObservations(branchRelations);
  if (branchQualifierObservations === undefined) {
    return unavailable(snapshot, structureId, 'branch_relation_requires_settlement', {
      targetYear,
      branchRelationIds: branchRelations,
    });
  }

  const {
    sixCombinationObservations,
    sixClashObservations,
    selfPunishmentObservations,
    punishmentPairObservations,
    directedPunishmentPairObservations,
  } = branchQualifierObservations;

  const sources: readonly AnnualTemporalStemSourceV1[] = [
    {
      layer: 'annual',
      stem: annualStem,
      element: getHeavenlyStemElement(annualStem),
    },
    {
      layer: 'dayun',
      stem: dayunStem,
      element: dayunSegment.pillar.stem.element,
    },
  ];

  const overlays: AnnualTemporalSettlementOverlayV1[] = [];
  const assessments: ResolvedStructuralRoleImpact[] = [];

  for (const settlement of settlementsState.value) {
    const overlay = deriveAnnualTemporalSettlementOverlayV1(
      settlement,
      targetYear,
      sources,
    );
    const stateChanged =
      overlay.settlement.participants.controller.functionState !==
        settlement.participants.controller.functionState ||
      overlay.settlement.participants.controlled.functionState !==
        settlement.participants.controlled.functionState ||
      overlay.settlement.pairControlEffective !== settlement.pairControlEffective;
    if (!stateChanged) continue;

    const assessment = resolveStructuralRoleImpact(
      overlay.settlement,
      structureId,
      assignments,
    );
    if (assessment.status !== 'resolved') {
      return unavailable(
        snapshot,
        structureId,
        'structural_role_impact_unavailable',
        {
          targetYear,
          settlementId: settlement.settlementId,
          structuralRoleReasonCode: assessment.reasonCode,
        },
      );
    }
    overlays.push(overlay);
    assessments.push(assessment);
  }

  if (assessments.length === 0) {
    return unavailable(snapshot, structureId, 'no_temporal_stem_effect', {
      targetYear,
    });
  }

  overlays.sort((a, b) => a.overlayId.localeCompare(b.overlayId));
  assessments.sort((a, b) => a.assessmentId.localeCompare(b.assessmentId));

  const bundle = createGovernedAnnualStructuralImpactBundleV1({
    snapshotId: snapshot.snapshotId,
    targetYear,
    structureId,
    producerRef: {
      id: ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.policyId,
      version: ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY.policyVersion,
    },
    assessments,
  });

  const producerMaterial = {
    policyContentHash: ANNUAL_STRUCTURAL_IMPACT_PRODUCER_POLICY_CONTENT_HASH,
    snapshotId: snapshot.snapshotId,
    targetYear,
    structureId,
    annualPillar: annualFacts.annualPillar,
    dayunContextId: dayun.contextId,
    dayunSegmentIndex: dayunSegment.index,
    rootSupportObservations,
    sixCombinationObservations,
    sixClashObservations,
    selfPunishmentObservations,
    punishmentPairObservations,
    directedPunishmentPairObservations,
    overlayIds: overlays.map((item) => item.overlayId),
    bundleId: bundle.bundleId,
  };
  const producerId = `annual_impact_producer_${createHash('sha256')
    .update(JSON.stringify(canonicalize(producerMaterial)))
    .digest('hex')
    .slice(0, 24)}`;

  return {
    status: 'resolved',
    producerId,
    snapshotId: snapshot.snapshotId,
    targetYear,
    structureId,
    annualFacts,
    dayunContextId: dayun.contextId,
    dayunSegmentIndex: dayunSegment.index,
    dayunPillar: dayunSegment.pillar,
    rootSupportObservations,
    sixCombinationObservations,
    sixClashObservations,
    selfPunishmentObservations,
    punishmentPairObservations,
    directedPunishmentPairObservations,
    overlays,
    assessments,
    bundle,
  };
}
