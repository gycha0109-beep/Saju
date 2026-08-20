import type {
  CanonicalSajuSnapshot,
  FiveElement,
  HeavenlyStem,
} from '../contracts/calculation.js';
import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
} from '../calculation/structural-relations.js';
import { HIDDEN_STEM_MEMBERSHIP } from '../calculation/hidden-stems.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { INTERPRETATION_METHODOLOGY_SOURCES } from './interpretation-methodology-catalog.js';

export const I18E_SPECIAL_PATTERN_ROUTER_VERSION = 'myeonghwa-special-pattern-review-router-v1';

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

const STEM_ELEMENT: Readonly<Record<HeavenlyStem, FiveElement>> = Object.freeze({
  갑: '목',
  을: '목',
  병: '화',
  정: '화',
  무: '토',
  기: '토',
  경: '금',
  신: '금',
  임: '수',
  계: '수',
});

const GENERATES: Readonly<Record<FiveElement, FiveElement>> = Object.freeze({
  목: '화',
  화: '토',
  토: '금',
  금: '수',
  수: '목',
});

export type SpecialPatternReviewSignal =
  | 'FOLLOW_STYLE_NO_SUPPORT_CANDIDATE'
  | 'DAY_STEM_COMBINATION_CANDIDATE'
  | 'THREE_COMBINATION_CANDIDATE';

export type SpecialPatternRouterStatus =
  | 'SPECIAL_PATTERN_REVIEW_REQUIRED'
  | 'NO_BASELINE_SPECIAL_SIGNAL'
  | 'INDETERMINATE_SCENARIO'
  | 'INDETERMINATE_INPUT';

export interface SpecialPatternReviewRouterReport {
  reportId: string;
  routerVersion: string;
  snapshotId?: string;
  status: SpecialPatternRouterStatus;
  signals: readonly SpecialPatternReviewSignal[];
  sourceIds: readonly string[];
  routingCoverage: 'baseline_follow_transform_three_combination_signals';
  finalSpecialPatternClassificationAuthorized: false;
  ordinaryStrengthClassificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

export const I18E_SPECIAL_PATTERN_ROUTING_BASIS = Object.freeze([
  {
    sourceId: INTERPRETATION_METHODOLOGY_SOURCES.ditianSuiChanwei.sourceId,
    finding:
      'Follow-style structures require strict lack of day-master support and separate examination of the force being followed; transformation likewise requires conditions beyond mere stem combination.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    finding:
      'Structural combinations are candidates only; whether transformation or a complete bureau is established requires separate conditions.',
  },
] as const);

function relationToDayMaster(dayMaster: FiveElement, other: FiveElement): 'support' | 'challenge' {
  if (dayMaster === other) return 'support';
  if (GENERATES[other] === dayMaster) return 'support';
  return 'challenge';
}

function otherVisibleStems(pillars: StructuralPillarInput): readonly HeavenlyStem[] {
  return PILLAR_SLOTS.flatMap((slot) => {
    if (slot === 'day') return [];
    const pillar = pillars[slot];
    return pillar === undefined ? [] : [pillar.stem.value];
  });
}

function hiddenElements(pillars: StructuralPillarInput): readonly FiveElement[] {
  return PILLAR_SLOTS.flatMap((slot) => {
    const pillar = pillars[slot];
    if (pillar === undefined) return [];
    return HIDDEN_STEM_MEMBERSHIP[pillar.branch.value].map((stem) => STEM_ELEMENT[stem]);
  });
}

function hasAnyChallenge(dayMaster: FiveElement, pillars: StructuralPillarInput): boolean {
  const visible = otherVisibleStems(pillars).map((stem) => STEM_ELEMENT[stem]);
  const hidden = hiddenElements(pillars);
  return [...visible, ...hidden].some((element) => relationToDayMaster(dayMaster, element) === 'challenge');
}

function hasAnyPeerResourceSupport(dayMaster: FiveElement, pillars: StructuralPillarInput): boolean {
  const visible = otherVisibleStems(pillars).map((stem) => STEM_ELEMENT[stem]);
  const hidden = hiddenElements(pillars);
  return [...visible, ...hidden].some((element) => relationToDayMaster(dayMaster, element) === 'support');
}

function resolvedPillars(snapshot: CanonicalSajuSnapshot): StructuralPillarInput | undefined {
  const result: StructuralPillarInput = {};
  for (const slot of PILLAR_SLOTS) {
    const state = snapshot.pillars[slot];
    if (state.status !== 'resolved') return undefined;
    result[slot] = state.value;
  }
  return result;
}

function signalSet(dayMaster: FiveElement, pillars: StructuralPillarInput): SpecialPatternReviewSignal[] {
  const relations = deriveStructuralRelationCandidates(pillars);
  const signals = new Set<SpecialPatternReviewSignal>();

  if (!hasAnyPeerResourceSupport(dayMaster, pillars) && hasAnyChallenge(dayMaster, pillars)) {
    signals.add('FOLLOW_STYLE_NO_SUPPORT_CANDIDATE');
  }

  if (
    relations.some(
      (candidate) =>
        candidate.kind === 'stem_five_combination' &&
        candidate.participants.some(
          (participant) => participant.pillar === 'day' && participant.component === 'stem',
        ),
    )
  ) {
    signals.add('DAY_STEM_COMBINATION_CANDIDATE');
  }

  if (relations.some((candidate) => candidate.kind === 'branch_three_combination')) {
    signals.add('THREE_COMBINATION_CANDIDATE');
  }

  return [...signals].sort();
}

function finalize(
  material: Omit<SpecialPatternReviewRouterReport, 'reportId'>,
): SpecialPatternReviewRouterReport {
  return {
    reportId: `special_pattern_router_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function reviewResolvedSpecialPatternSignals(
  dayMaster: FiveElement,
  pillars: StructuralPillarInput,
  snapshotId?: string,
): SpecialPatternReviewRouterReport {
  const signals = signalSet(dayMaster, pillars);
  return finalize({
    routerVersion: I18E_SPECIAL_PATTERN_ROUTER_VERSION,
    ...(snapshotId === undefined ? {} : { snapshotId }),
    status: signals.length === 0 ? 'NO_BASELINE_SPECIAL_SIGNAL' : 'SPECIAL_PATTERN_REVIEW_REQUIRED',
    signals,
    sourceIds: I18E_SPECIAL_PATTERN_ROUTING_BASIS.map((basis) => basis.sourceId),
    routingCoverage: 'baseline_follow_transform_three_combination_signals',
    finalSpecialPatternClassificationAuthorized: false,
    ordinaryStrengthClassificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'A signal routes the chart to further special-pattern review; it never proves follow, transform, exclusive, or other special-pattern status.',
      'NO_BASELINE_SPECIAL_SIGNAL means only that this limited router found no tracked signal; it does not prove ordinary classification eligibility.',
      'No numeric threshold is used.',
    ],
  });
}

export function buildI18ESpecialPatternReviewRouter(
  snapshot: CanonicalSajuSnapshot,
): SpecialPatternReviewRouterReport {
  const base = {
    routerVersion: I18E_SPECIAL_PATTERN_ROUTER_VERSION,
    snapshotId: snapshot.snapshotId,
    signals: [] as readonly SpecialPatternReviewSignal[],
    sourceIds: I18E_SPECIAL_PATTERN_ROUTING_BASIS.map((basis) => basis.sourceId),
    routingCoverage: 'baseline_follow_transform_three_combination_signals' as const,
    finalSpecialPatternClassificationAuthorized: false as const,
    ordinaryStrengthClassificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };

  if (snapshot.scenarios.length > 0) {
    return finalize({
      ...base,
      status: 'INDETERMINATE_SCENARIO',
      notes: [
        'Special-pattern routing is not inferred from the unresolved base snapshot when calculation scenarios exist.',
        'Each scenario must be materialized and routed independently.',
      ],
    });
  }

  if (snapshot.derivedFacts.dayMaster.status !== 'resolved') {
    return finalize({
      ...base,
      status: 'INDETERMINATE_INPUT',
      notes: ['A resolved day master is required for special-pattern signal routing.'],
    });
  }

  const pillars = resolvedPillars(snapshot);
  if (pillars === undefined) {
    return finalize({
      ...base,
      status: 'INDETERMINATE_INPUT',
      notes: ['All four pillars must be resolved for base-snapshot special-pattern routing.'],
    });
  }

  return reviewResolvedSpecialPatternSignals(
    snapshot.derivedFacts.dayMaster.value.element,
    pillars,
    snapshot.snapshotId,
  );
}
