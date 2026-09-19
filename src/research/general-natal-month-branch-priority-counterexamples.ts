export const R012_MONTH_BRANCH_PRIORITY_VERSION = '0.1.0-research' as const;

export type R012AuthorityState =
  | 'SUPPORTED_BOUNDED'
  | 'REJECTED_AS_OVERGENERALIZATION'
  | 'NOT_ESTABLISHED'
  | 'UNSUPPORTED';

export interface R012PriorityProposition {
  propositionId: string;
  sourceFamily: 'ziping_zhenquan_pingzhu' | 'yuanhai_ziping';
  sourceStratum: 'base_text' | 'later_commentary' | 'mixed_edition_surface';
  scope: string;
  state: R012AuthorityState;
  evidence: readonly string[];
}

export const R012_PRIORITY_PROPOSITIONS: readonly R012PriorityProposition[] = Object.freeze([
  {
    propositionId: 'month-branch-is-important-chart-context',
    sourceFamily: 'yuanhai_ziping',
    sourceStratum: 'mixed_edition_surface',
    scope: 'general chart examination',
    state: 'SUPPORTED_BOUNDED',
    evidence: [
      '以日為主，年為本，月為提綱，時為輔佐',
      '後看月令中金木水火土何者旺',
    ],
  },
  {
    propositionId: 'month-branch-is-heaviest-within-tonggen',
    sourceFamily: 'ziping_zhenquan_pingzhu',
    sourceStratum: 'later_commentary',
    scope: '通根之中',
    state: 'SUPPORTED_BOUNDED',
    evidence: ['通根之中，尤以月令之支為最重也'],
  },
  {
    propositionId: 'month-command-is-exclusive-chart-authority',
    sourceFamily: 'yuanhai_ziping',
    sourceStratum: 'mixed_edition_surface',
    scope: 'general chart examination',
    state: 'REJECTED_AS_OVERGENERALIZATION',
    evidence: ['此非是拘之一隅之說也', '論命者切不可泥之月令消詳'],
  },
  {
    propositionId: 'month-branch-always-overrides-every-other-root',
    sourceFamily: 'ziping_zhenquan_pingzhu',
    sourceStratum: 'later_commentary',
    scope: 'cross-context universal root comparison',
    state: 'NOT_ESTABLISHED',
    evidence: ['The selected statement is scoped to 通根之中 and supplies no exhaustive comparison algorithm.'],
  },
  {
    propositionId: 'month-branch-numeric-multiplier',
    sourceFamily: 'ziping_zhenquan_pingzhu',
    sourceStratum: 'later_commentary',
    scope: 'numeric root weighting',
    state: 'UNSUPPORTED',
    evidence: ['No numeric coefficient or multiplier is stated in the bounded passage.'],
  },
]);

export const R012_COUNTEREXAMPLE_BOUNDARY = Object.freeze({
  targetOvergeneralization: 'MONTH_BRANCH_AS_EXCLUSIVE_OR_RIGID_CHART_AUTHORITY',
  counterexampleSourceFamily: 'yuanhai_ziping' as const,
  result: 'COUNTEREXAMPLE_BOUNDARY_ESTABLISHED' as const,
  doesNotRefuteScopedTonggenPriority: true,
});

export const R012_AUTHORITY = Object.freeze({
  status: 'research' as const,
  monthBranchPriorityWithinTonggen: 'SUPPORTED_BOUNDED' as const,
  monthBranchExclusiveAuthority: false,
  monthBranchNumericMultiplierAuthorized: false,
  universalRootOrderingAuthorized: false,
  strengthClassifierAuthorized: false,
  productionAuthorityPromoted: false,
  glyphExactDirectVisualClosureComplete: false,
});
