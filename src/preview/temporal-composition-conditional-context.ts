import type {
  CanonicalSajuSnapshot, EarthlyBranch, PillarSlot,
} from '../contracts/calculation.js';
import {
  isStructuralBranchClash,
  isStructuralBranchSixCombination,
  STRUCTURAL_RELATION_SOURCE_CATALOG,
} from '../calculation/structural-relations.js';
import {
  resolveDayunTemporalContext,
  DAYUN_TEMPORAL_CONTEXT_POLICY,
} from '../reading/dayun-temporal-context.js';
import type { AnnualInterpretationFacts } from '../reading/annual-interpretation-facts.js';
import type { MonthlyInterpretationFacts, MonthlySegmentId } from '../reading/monthly-interpretation-facts.js';

export const TEMPORAL_COMPOSITION_CONTEXT_VERSION =
  'myeongha-temporal-conditional-composition-evidence-v1' as const;

/** Literary method context is not an admitted modern T9 prediction. */
export const TEMPORAL_COMPOSITION_LITERATURE = Object.freeze({
  study: 'docs/research/annual-monthly-composition-literature-evidence-2026-10-27.md',
  classicWitness: 'CLASSIC-SMT-V2-DAEUN-SUIYUN',
  conditionalExample: 'CLASSIC-DTS-SUIYUN',
  publishedSourceStatus: 'historical_text_transcription_and_qualitative_modern_research',
  classicScanPageVerifiedForEachModernMeaning: false,
  medicalOrEventPredictionEstablished: false,
  temporalSemanticClaimAuthorized: false,
} as const);

const NATAL_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
export type CompositionLayer = 'natal' | 'dayun' | 'annual' | 'monthly';
export interface CompositionBranch {
  layer: CompositionLayer;
  pillar: PillarSlot | null;
  branch: EarthlyBranch;
}
export interface CompositionRelation {
  kind: 'branch_clash' | 'branch_six_combination';
  left: CompositionBranch;
  right: CompositionBranch;
  sourceIds: readonly string[];
  /** Identity match is not conversion, dominance, tension, event or luck score. */
  structuralMatchOnly: true;
  transformationEstablished: false;
  relativeStrengthEstablished: false;
  eventPredictionAuthorized: false;
}
export interface CompositionSlice {
  segmentId: MonthlySegmentId;
  startsAt: string;
  endsAtExclusive: string;
  annualBranch: EarthlyBranch;
  monthlyBranch: EarthlyBranch;
  dayunStatus: 'resolved' | 'unavailable';
  dayunBranch: EarthlyBranch | null;
  dayunContextId: string | null;
  dayunReason: string | null;
  natalUnavailableSlots: readonly PillarSlot[];
  relations: readonly CompositionRelation[];
  relationshipContext: 'coexisting_structural_matches_unranked';
  koreanExplanation: string;
}
export interface TemporalCompositionContext {
  version: typeof TEMPORAL_COMPOSITION_CONTEXT_VERSION;
  scope: 'research_structural_conditions_only';
  source: typeof TEMPORAL_COMPOSITION_LITERATURE;
  snapshotId: string;
  calculationHash: string;
  targetYear: number;
  targetMonth: number;
  timeZone: 'Asia/Seoul';
  annualCalendarPolicy: 'civil_year_only';
  dayunPolicyId: typeof DAYUN_TEMPORAL_CONTEXT_POLICY.policyId;
  jeolAt: string;
  slices: readonly CompositionSlice[];
  sourceFactPaths: readonly string[];
  blockers: readonly string[];
  interpretationAuthorityGranted: false;
  mayPublish: false;
  maySell: false;
  mayGrantOfficialAuthority: false;
}
const SOURCE_IDS = Object.freeze([
  STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan.sourceId,
  STRUCTURAL_RELATION_SOURCE_CATALOG.xuanzeYaolue.sourceId,
]);

function relation(left: CompositionBranch, right: CompositionBranch): CompositionRelation | null {
  const kind = isStructuralBranchClash(left.branch, right.branch)
    ? 'branch_clash' as const
    : isStructuralBranchSixCombination(left.branch, right.branch)
      ? 'branch_six_combination' as const : null;
  return kind === null ? null : {
    kind, left, right, sourceIds: SOURCE_IDS,
    structuralMatchOnly: true, transformationEstablished: false,
    relativeStrengthEstablished: false, eventPredictionAuthorized: false,
  };
}

function korean(slice: {
  monthlyBranch: EarthlyBranch;
  dayunStatus: 'resolved' | 'unavailable';
  relations: readonly CompositionRelation[];
  natalUnavailableSlots: readonly PillarSlot[];
}): string {
  const label = (part: CompositionBranch): string =>
    (part.layer === 'natal' ? '원국 ' + ({
      year: '연지', month: '월지', day: '일지', hour: '시지',
    }[part.pillar!] ?? '미확정 지지') :
      part.layer === 'dayun' ? '대운 지지' :
        part.layer === 'annual' ? '연운 지지' : '월운 지지') + ' ' + part.branch;
  const match = slice.relations.length
    ? slice.relations.map(item => label(item.left) + '와 ' +
      label(item.right) + (item.kind === 'branch_clash' ? ' 사이의 충' : ' 사이의 육합')
    ).join('; ') + ' 관계가 계산되었습니다.'
    : '확정된 범위에서 충·육합 관계는 관측되지 않았습니다.';
  const missing = [
    ...(slice.dayunStatus === 'unavailable' ? ['해당 구간 대운 미확정'] : []),
    ...(slice.natalUnavailableSlots.length ? [
      '원국 ' + slice.natalUnavailableSlots.join('·') + '주 미확정',
    ] : []),
  ];
  return match + (missing.length ? ' 미확정 항목: ' + missing.join(', ') + '.' : '') +
    ' 여러 관계가 동시에 존재해도 우세한 작용·합화·길흉을 결정하지 않습니다.' +
    ' 원국의 조건과 대운·세운·월운의 해석을 종합하는 직접 규칙이 확인되기 전에는 사건을 예측하지 않습니다.';
}

function localTimeToUtc(value: string): number {
  const instant = Date.parse(value + ':00+09:00');
  if (!Number.isFinite(instant)) throw new TypeError('Invalid canonical Dayun local instant');
  return instant;
}

export function buildTemporalCompositionConditionalContext(
  snapshot: CanonicalSajuSnapshot,
  annual: AnnualInterpretationFacts,
  monthly: MonthlyInterpretationFacts,
): TemporalCompositionContext {
  if (annual.targetYear !== monthly.targetYear ||
      annual.referenceDateTime !== monthly.referenceDateTime ||
      annual.scope !== 'annual' || monthly.scope !== 'monthly' ||
      annual.timeZone !== 'Asia/Seoul' || monthly.timeZone !== 'Asia/Seoul' ||
      monthly.segments.length !== 2 ||
      monthly.segments[0].segmentId !== 'before_jeol' ||
      monthly.segments[1].segmentId !== 'after_jeol') {
    throw new TypeError('Conditional composition requires one exact civil-year, Jeol-month and reference context');
  }
  const natal: CompositionBranch[] = [];
  const natalUnavailableSlots: PillarSlot[] = [];
  for (const slot of NATAL_SLOTS) {
    const state = snapshot.pillars[slot];
    if (state.status !== 'resolved') {
      natalUnavailableSlots.push(slot);
    } else {
      natal.push({layer: 'natal', pillar: slot, branch: state.value.branch.value});
    }
  }
  const dayun = resolveDayunTemporalContext(snapshot, annual.targetYear);
  if (dayun.snapshotId !== snapshot.snapshotId) {
    throw new TypeError('Daeyun must belong to exact natal snapshot');
  }
  const annualPart: CompositionBranch = {
    layer: 'annual', pillar: null, branch: annual.annualPillar.branch,
  };
  const slices: CompositionSlice[] = [];
  for (const segment of monthly.segments) {
    const start = Date.parse(segment.startsAt);
    const end = Date.parse(segment.endsAt);
    if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) {
      throw new TypeError('Jeol segment bounds must be valid half-open UTC intervals');
    }
    const overlaps = dayun.status === 'resolved'
      ? dayun.segments.map(p => ({
        start: localTimeToUtc(p.startLocalDateTime),
        end: localTimeToUtc(p.endExclusiveLocalDateTime),
        pillar: p.pillar,
      })).filter(p => p.start < end && start < p.end) : [];
    const boundaries = [...new Set([
      start, end,
      ...overlaps.flatMap(p=>[Math.max(start,p.start), Math.min(end,p.end)]),
    ])].sort((a,b) => a-b);
    for (let i=0;i<boundaries.length-1;i++) {
      const from = boundaries[i]!;
      const to = boundaries[i+1]!;
      const active = overlaps.find(p=>p.start <= from && to <= p.end);
      const monthlyPart: CompositionBranch = {
        layer: 'monthly', pillar: null, branch: segment.monthlyPillar.branch,
      };
      const operands: CompositionBranch[] = [
        ...natal,
        ...(active ? [{layer:'dayun' as const, pillar:null, branch:active.pillar.branch.value}] : []),
        annualPart,
        monthlyPart,
      ];
      // A structured pair is a fact. No relation is selected as the semantic winner.
      const relations: CompositionRelation[] = [];
      for(let j=0;j<operands.length;j++) {
        for(let k=j+1;k<operands.length;k++) {
          const left=operands[j]!, right=operands[k]!;
          if(left.layer === 'natal' && right.layer === 'natal') continue;
          const hit=relation(left,right);
          if(hit) relations.push(hit);
        }
      }
      const row = {
        segmentId: segment.segmentId,
        startsAt: new Date(from).toISOString(),
        endsAtExclusive: new Date(to).toISOString(),
        annualBranch: annualPart.branch,
        monthlyBranch: monthlyPart.branch,
        dayunStatus: active ? 'resolved' as const : 'unavailable' as const,
        dayunBranch: active?.pillar.branch.value ?? null,
        dayunContextId: dayun.status === 'resolved' ? dayun.contextId : null,
        dayunReason: active ? null : dayun.status === 'unavailable'
          ? dayun.reasonCode : 'no_dayun_segment_for_this_interval',
        natalUnavailableSlots,
        relations,
        relationshipContext: 'coexisting_structural_matches_unranked' as const,
      };
      slices.push({...row,koreanExplanation:korean(row)});
    }
  }
  return {
    version: TEMPORAL_COMPOSITION_CONTEXT_VERSION,
    scope: 'research_structural_conditions_only',
    source: TEMPORAL_COMPOSITION_LITERATURE,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    targetYear: annual.targetYear,
    targetMonth: monthly.targetMonth,
    timeZone: 'Asia/Seoul',
    annualCalendarPolicy: 'civil_year_only',
    dayunPolicyId: DAYUN_TEMPORAL_CONTEXT_POLICY.policyId,
    jeolAt: monthly.jeolBoundary.at,
    slices,
    sourceFactPaths: [
      'pillars.year.value.branch.value', 'pillars.month.value.branch.value',
      'pillars.day.value.branch.value', 'pillars.hour.value.branch.value',
      'luckCycle.value.pillars', 'temporal.annualPillar.branch',
      'temporal.segmentsById.before_jeol.monthlyPillar.branch',
      'temporal.segmentsById.after_jeol.monthlyPillar.branch',
      'temporal.jeolBoundary.at',
    ],
    blockers: [
      'No source-qualified precedence for competing annual/dayun/monthly relationships',
      'No permission to infer transformation from branch-six-combination alone',
      'No admission of event prediction, severity, life domain, or general luck',
    ],
    interpretationAuthorityGranted: false,
    mayPublish: false,
    maySell: false,
    mayGrantOfficialAuthority: false,
  };
}
